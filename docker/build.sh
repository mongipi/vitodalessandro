#!/bin/bash

#===============================================================================
# BUILD SCRIPT - Vito D'Alessandro Project
# 
# Uso:
#   ./docker/build.sh                    # Build versione locale (.env.local)
#   ./docker/build.sh staging            # Build versione staging
#   ./docker/build.sh production         # Build versione produzione
#
# Legge variabili da .env.{environment} e costruisce immagini Docker
#===============================================================================

set -e  # Fail fast su errori

# ============ CONFIGURATION ============
DOCKER_USERNAME="pietromongiello"
ENVIRONMENT="${1:-.local}"  # Default: .local
ENV_FILE=".env.${ENVIRONMENT}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."

# ============ VALIDATION ============
if [ ! -f "$PROJECT_DIR/$ENV_FILE" ]; then
    echo "❌ File non trovato: $ENV_FILE"
    echo "   Crea il file con: cp .env.example $ENV_FILE"
    echo "   Poi modifica i valori per il tuo ambiente"
    exit 1
fi

# Carica variabili d'ambiente
echo "📋 Caricando variabili da $ENV_FILE..."
export $(cat "$PROJECT_DIR/$ENV_FILE" | grep -v '^#' | grep -v '^$' | xargs)

# Leggi versione
if [ ! -f "$PROJECT_DIR/VERSION" ]; then
    echo "❌ File VERSION non trovato in $PROJECT_DIR/"
    exit 1
fi

APP_VERSION=$(cat "$PROJECT_DIR/VERSION")

echo ""
echo "=============================================================
🚀 BUILDING: Environment=$ENVIRONMENT | Version=$APP_VERSION
=============================================================="
echo ""

# ============ VALIDATE SECRETS ============
for secret_file in strapi_token.txt santo_token.txt; do
    if [ ! -f "$SCRIPT_DIR/secrets/$secret_file" ]; then
        echo "⚠️  AVVISO: $SCRIPT_DIR/secrets/$secret_file non trovato"
        echo "   Per $ENVIRONMENT, assicurati che i secret siano impostati"
    fi
done

# ============ BUILD FRONTEND ============
echo ""
echo "📦 Building Frontend..."

# Leggi tokens dai secret files se esistono, altrimenti usa .env
STRAPI_TOKEN="${REACT_APP_STRAPI_TOKEN}"
SANTO_TOKEN="${REACT_APP_SANTO_DEL_GIORNO_API_TOKEN}"

if [ -f "$SCRIPT_DIR/secrets/strapi_token.txt" ]; then
    STRAPI_TOKEN=$(cat "$SCRIPT_DIR/secrets/strapi_token.txt")
fi

if [ -f "$SCRIPT_DIR/secrets/santo_token.txt" ]; then
    SANTO_TOKEN=$(cat "$SCRIPT_DIR/secrets/santo_token.txt")
fi

docker build \
  --build-arg REACT_APP_STRAPI_API_URL="$REACT_APP_STRAPI_API_URL" \
  --build-arg REACT_APP_STRAPI_TOKEN="$STRAPI_TOKEN" \
  --build-arg REACT_APP_SANTO_DEL_GIORNO_API_TOKEN="$SANTO_TOKEN" \
  --build-arg NODE_ENV="$NODE_ENV" \
  -t "my-frontend:${ENVIRONMENT}-${APP_VERSION}" \
  "$PROJECT_DIR/services/fe" \
  || { echo "❌ Frontend build failed"; exit 1; }

echo "✅ Frontend build OK: my-frontend:${ENVIRONMENT}-${APP_VERSION}"

# ============ BUILD STRAPI ============
echo ""
echo "📦 Building Strapi..."

docker build \
  --build-arg NODE_ENV="$NODE_ENV" \
  -t "my-strapi:${ENVIRONMENT}-${APP_VERSION}" \
  "$PROJECT_DIR/services/strapi-cloud-template-blog-aecd06639e" \
  || { echo "❌ Strapi build failed"; exit 1; }

echo "✅ Strapi build OK: my-strapi:${ENVIRONMENT}-${APP_VERSION}"

# ============ TAG FOR DOCKER HUB ============
echo ""
echo "🏷️  Tagging images for Docker Hub..."

docker tag "my-frontend:${ENVIRONMENT}-${APP_VERSION}" \
  "$DOCKER_USERNAME/vitodalessandro:frontend-${ENVIRONMENT}-${APP_VERSION}"

docker tag "my-strapi:${ENVIRONMENT}-${APP_VERSION}" \
  "$DOCKER_USERNAME/vitodalessandro:strapi-${ENVIRONMENT}-${APP_VERSION}"

# Also tag as 'latest' for prod
if [ "$ENVIRONMENT" = "production" ]; then
    docker tag "my-frontend:${ENVIRONMENT}-${APP_VERSION}" \
      "$DOCKER_USERNAME/vitodalessandro:frontend-latest"
    docker tag "my-strapi:${ENVIRONMENT}-${APP_VERSION}" \
      "$DOCKER_USERNAME/vitodalessandro:strapi-latest"
    echo "✅ Tagged as latest (production)"
fi

# ============ PUSH TO DOCKER HUB ============
echo ""
echo "🚀 Push to Docker Hub? (y/N)"
read -r push_response

if [[ "$push_response" =~ ^[Yy]$ ]]; then
    echo "🔐 Logging in to Docker Hub..."
    docker login
    
    echo "📤 Pushing images..."
    docker push "$DOCKER_USERNAME/vitodalessandro:frontend-${ENVIRONMENT}-${APP_VERSION}"
    docker push "$DOCKER_USERNAME/vitodalessandro:strapi-${ENVIRONMENT}-${APP_VERSION}"
    
    if [ "$ENVIRONMENT" = "production" ]; then
        docker push "$DOCKER_USERNAME/vitodalessandro:frontend-latest"
        docker push "$DOCKER_USERNAME/vitodalessandro:strapi-latest"
    fi
    
    echo "✅ Images pushed successfully!"
else
    echo "⏭️  Skipped Docker Hub push"
fi

# ============ SUMMARY ============
echo ""
echo "=========================================================="
echo "✅ BUILD COMPLETE!"
echo "=========================================================="
echo ""
echo "📝 Built images:"
echo "   - my-frontend:${ENVIRONMENT}-${APP_VERSION}"
echo "   - my-strapi:${ENVIRONMENT}-${APP_VERSION}"
echo ""
echo "🐳 Docker Hub tags:"
echo "   - $DOCKER_USERNAME/vitodalessandro:frontend-${ENVIRONMENT}-${APP_VERSION}"
echo "   - $DOCKER_USERNAME/vitodalessandro:strapi-${ENVIRONMENT}-${APP_VERSION}"
echo ""
echo "📦 Next steps:"
echo "   1. Deploy locally: docker-compose -f docker/compose.dev.yml up -d"
echo "   2. Deploy to swarm: ./docker/deploy.sh $ENVIRONMENT"
echo ""
