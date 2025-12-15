#!/bin/bash

#===============================================================================
# DEPLOY SCRIPT - Vito D'Alessandro Project
# 
# Automatizza il deploy in produzione su Docker Swarm
# 
# Uso:
#   ./docker/deploy.sh production              # Deploy versione prod
#   ./docker/deploy.sh staging                 # Deploy versione staging
#   ./docker/deploy.sh production --skip-build # Salta build e usa immagini esistenti
#===============================================================================

set -e

# ============ CONFIGURATION ============
ENVIRONMENT="${1:-production}"
SKIP_BUILD="${2:-}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."
ENV_FILE="$PROJECT_DIR/.env.${ENVIRONMENT}"
STACK_NAME="vitodalessandro-${ENVIRONMENT}"

echo ""
echo "=============================================================
🚀 DEPLOY SCRIPT - Environment: $ENVIRONMENT
=============================================================="
echo ""

# ============ VALIDATION ============
if [ ! -f "$ENV_FILE" ]; then
    echo "❌ File non trovato: $ENV_FILE"
    exit 1
fi

# Carica variabili
export $(cat "$ENV_FILE" | grep -v '^#' | grep -v '^$' | xargs)

APP_VERSION=$(cat "$PROJECT_DIR/VERSION")
DOCKER_USERNAME="${DOCKER_USERNAME}"

# ============ PRE-FLIGHT CHECKS ============
echo "📋 Pre-flight checks..."
echo "   ✓ Stack name: $STACK_NAME"
echo "   ✓ Version: $APP_VERSION"
echo "   ✓ Domain: $DOMAIN"
echo "   ✓ Environment: $ENVIRONMENT"
echo ""

# Verifica che Docker Swarm sia attivo
if ! docker info | grep -q "Swarm: active"; then
    echo "❌ Docker Swarm non è attivo!"
    echo "   Inizializza con: docker swarm init"
    exit 1
fi

echo "✓ Docker Swarm: active"

# ============ BUILD IMAGES ============
if [ "$SKIP_BUILD" != "--skip-build" ]; then
    echo ""
    echo "📦 Building Docker images..."
    bash "$SCRIPT_DIR/build.sh" "$ENVIRONMENT" || {
        echo "❌ Build failed!"
        exit 1
    }
fi

# ============ CREATE SECRETS ============
echo ""
echo "🔐 Setting up Docker Secrets..."

# Funzione helper per creare secret
create_secret() {
    local secret_name=$1
    local secret_value=$2
    
    if docker secret ls | grep -q "^$secret_name"; then
        echo "   ℹ️  Secret '$secret_name' already exists (skipping)"
    else
        echo "$secret_value" | docker secret create "$secret_name" - > /dev/null
        echo "   ✓ Created secret: $secret_name"
    fi
}

# Leggi dai file se esistono
STRAPI_JWT_SECRET="${JWT_SECRET}"
STRAPI_ADMIN_JWT_SECRET="${ADMIN_JWT_SECRET}"
STRAPI_API_TOKEN_SALT="${API_TOKEN_SALT}"
STRAPI_TRANSFER_TOKEN_SALT="${TRANSFER_TOKEN_SALT}"

if [ -f "$SCRIPT_DIR/secrets/app-keys.txt" ]; then
    STRAPI_APP_KEYS=$(cat "$SCRIPT_DIR/secrets/app-keys.txt")
else
    STRAPI_APP_KEYS="${JWT_SECRET}"  # Fallback
fi

STRAPI_API_TOKEN="${REACT_APP_STRAPI_TOKEN}"
SANTO_API_TOKEN="${REACT_APP_SANTO_DEL_GIORNO_API_TOKEN}"
DB_USERNAME="${DATABASE_USERNAME}"
DB_PASSWORD="${DATABASE_PASSWORD}"
DB_NAME="${DATABASE_NAME}"

# Crea secrets
create_secret "strapi_jwt_secret" "$STRAPI_JWT_SECRET"
create_secret "strapi_admin_jwt_secret" "$STRAPI_ADMIN_JWT_SECRET"
create_secret "strapi_api_token_salt" "$STRAPI_API_TOKEN_SALT"
create_secret "strapi_transfer_token_salt" "$STRAPI_TRANSFER_TOKEN_SALT"
create_secret "strapi_app_keys" "$STRAPI_APP_KEYS"
create_secret "strapi_api_token" "$STRAPI_API_TOKEN"
create_secret "santo_api_token" "$SANTO_API_TOKEN"
create_secret "db_username" "$DB_USERNAME"
create_secret "db_password" "$DB_PASSWORD"
create_secret "db_name" "$DB_NAME"

echo "✓ Secrets configured"

# ============ DEPLOY STACK ============
echo ""
echo "🚀 Deploying stack '$STACK_NAME'..."

docker stack deploy \
    -c "$SCRIPT_DIR/compose.prod.yml" \
    --with-registry-auth \
    "$STACK_NAME"

# ============ WAIT FOR DEPLOYMENT ============
echo ""
echo "⏳ Waiting for services to stabilize..."
sleep 10

# Mostra status
docker stack ps "$STACK_NAME"

# ============ NGINX PROXY MANAGER SETUP ============
echo ""
echo "📡 Next steps for Nginx Proxy Manager:"
echo ""
echo "   1. Open: http://${DOMAIN}:81"
echo "   2. Default credentials:"
echo "      Email: admin@example.com"
echo "      Password: changeme"
echo ""
echo "   3. Configure proxy hosts:"
echo "      - Domain: ${DOMAIN}"
echo "      - Forward To: http://frontend"
echo "      - Enable SSL"
echo "      - Obtain SSL certificate"
echo ""
echo "   4. Configure Strapi reverse proxy (optional):"
echo "      - Domain: strapi.${DOMAIN}"
echo "      - Forward To: http://strapi:1337"
echo ""

# ============ VERIFY DEPLOYMENT ============
echo ""
echo "✓ Stack deployed successfully!"
echo ""
echo "📊 Service Status:"
echo "   Frontend (2 replicas): docker service logs ${STACK_NAME}_frontend"
echo "   Strapi:                docker service logs ${STACK_NAME}_strapi"
echo "   Database:              docker service logs ${STACK_NAME}_strapiDB"
echo ""
echo "🌐 Access:"
echo "   Frontend:  https://${DOMAIN}"
echo "   Strapi CMS: https://${DOMAIN}/strapi"
echo "   Admin Panel: http://${DOMAIN}:81"
echo ""
echo "📝 Scale services:"
echo "   docker service scale ${STACK_NAME}_frontend=3"
echo ""
echo "🛑 Rollback (if needed):"
echo "   docker stack rm ${STACK_NAME}"
echo ""
