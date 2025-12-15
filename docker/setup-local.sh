#!/bin/bash

#===============================================================================
# LOCAL DEVELOPMENT SETUP SCRIPT
# 
# Configura tutto per lo sviluppo locale in un'unica volta
# 
# Uso: ./docker/setup-local.sh
#===============================================================================

set -e

echo ""
echo "=============================================================
🚀 LOCAL DEVELOPMENT SETUP
=============================================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$SCRIPT_DIR/.."

# ============ CHECK PREREQUISITES ============
echo "📋 Checking prerequisites..."

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "   Download from: https://www.docker.com/products/docker-desktop"
    exit 1
fi
echo "   ✓ Docker installed"

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed!"
    exit 1
fi
echo "   ✓ Docker Compose installed"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "   Download from: https://nodejs.org/"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "   ✓ Node.js $NODE_VERSION installed"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi
echo "   ✓ npm installed"

# ============ SETUP .ENV ============
echo ""
echo "⚙️  Setting up environment variables..."

if [ -f "$PROJECT_DIR/.env.local" ]; then
    echo "   ✓ .env.local already exists"
else
    cp "$PROJECT_DIR/.env.example" "$PROJECT_DIR/.env.local"
    echo "   ✓ Created .env.local from .env.example"
fi

# ============ START DATABASE ============
echo ""
echo "🐳 Starting database and Adminer..."

cd "$SCRIPT_DIR"

# Stop if already running
docker-compose -f compose.dev.yml down 2>/dev/null || true

# Start services
docker-compose -f compose.dev.yml up -d

# Wait for database to be ready
echo "   ⏳ Waiting for database to be ready..."
for i in {1..30}; do
    if docker-compose -f compose.dev.yml exec -T strapiDB pg_isready -U strapi &>/dev/null; then
        echo "   ✓ Database is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "   ⚠️  Database not responding (timeout)"
    fi
    sleep 1
done

# ============ INSTALL DEPENDENCIES ============
echo ""
echo "📦 Installing dependencies..."

# Frontend
echo "   Installing frontend dependencies..."
cd "$PROJECT_DIR/services/fe"
npm install --silent
echo "   ✓ Frontend dependencies installed"

# Strapi
echo "   Installing Strapi dependencies..."
cd "$PROJECT_DIR/services/strapi-cloud-template-blog-aecd06639e"
npm install --silent
echo "   ✓ Strapi dependencies installed"

# ============ SUMMARY ============
echo ""
echo "=========================================================="
echo "✅ SETUP COMPLETE!"
echo "=========================================================="
echo ""
echo "🚀 Start developing:"
echo ""
echo "   Terminal 1 - Frontend:"
echo "     cd services/fe"
echo "     npm start"
echo ""
echo "   Terminal 2 - Strapi CMS:"
echo "     cd services/strapi-cloud-template-blog-aecd06639e"
echo "     npm run develop"
echo ""
echo "   Then open:"
echo "     Frontend:  http://localhost:3000"
echo "     Strapi:    http://localhost:1337/admin"
echo "     Adminer:   http://localhost:9090"
echo ""
echo "📝 Database Credentials (from .env.local):"
echo "     Host:     localhost:5432"
echo "     Username: strapi"
echo "     Password: strapi_dev_password"
echo "     Database: strapi"
echo ""
echo "🛑 Stop everything:"
echo "     docker-compose -f docker/compose.dev.yml down"
echo ""
