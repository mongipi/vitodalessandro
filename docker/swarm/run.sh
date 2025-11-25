#!/bin/bash
set -e

echo "=== Pulling and Running Services ==="

# ?? Directory dello script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"


APP_VERSION=1.0.0

# ?? Configura il tuo username Docker Hub
DOCKER_USERNAME="pietromongiello"
REPO="vitodalessandro"

# ?? Pull delle immagini dal repository Docker Hub
echo "?? Pulling frontend image..."
docker pull $DOCKER_USERNAME/$REPO:frontend-$APP_VERSION

echo "?? Pulling strapi image..."
docker pull $DOCKER_USERNAME/$REPO:strapi-$APP_VERSION

# ?? Esporta la variabile APP_VERSION per docker-compose
export APP_VERSION

# ?? Lancia i servizi con docker-compose
docker compose up -d

echo "? All services are up and running!"
