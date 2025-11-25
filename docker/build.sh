#!/bin/bash

echo "=== Building All Services ==="

set -e
DOCKER_USERNAME="pietromongiello"


SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 🔹 File secrets e versione
STRAPI_TOKEN_FILE="$SCRIPT_DIR/secrets/strapi_token.txt"
SANTO_TOKEN_FILE="$SCRIPT_DIR/secrets/santo_token.txt"
VERSION_FILE="$SCRIPT_DIR/../version"

STRAPI_TOKEN=$(<"$STRAPI_TOKEN_FILE")
SANTO_TOKEN=$(<"$SANTO_TOKEN_FILE")
APP_VERSION=$(<"$VERSION_FILE")

docker build \
  --build-arg REACT_APP_STRAPI_API_URL="https://strapi.vps.cloud-ip.cc/api" \
  --build-arg REACT_APP_STRAPI_TOKEN="$STRAPI_TOKEN" \
  --build-arg REACT_APP_SANTO_DEL_GIORNO_API_TOKEN="$SANTO_TOKEN" \
  -t my-frontend:$APP_VERSION\
  "$SCRIPT_DIR/../services/fe"


if [ $? -eq 0 ]; then
    echo "✅ Frontend build completed successfully"
else
    echo "❌ Frontend build failed"
    exit 1
fi

# Build Strapi (se hai un Dockerfile per Strapi)
echo "Building Strapi..."
docker build -t my-strapi:$APP_VERSION   "$SCRIPT_DIR/../services/strapi-cloud-template-blog-aecd06639e"


# List all built images
echo ""
echo "=== Built Images ==="


echo ""
echo "✅ All services built successfully!"
echo "Run 'docker-compose up -d' to start the services"


# 🔹 Tag per Docker Hub (repository vitodalessandro)
docker tag my-frontend:$APP_VERSION $DOCKER_USERNAME/vitodalessandro:frontend-$APP_VERSION
docker tag my-strapi:$APP_VERSION $DOCKER_USERNAME/vitodalessandro:strapi-$APP_VERSION

# echo "📌 Tagged images for Docker Hub"

# # 🔹 Login Docker Hub (solo se non sei già loggato)
docker login

# # 🔹 Push delle immagini
docker push $DOCKER_USERNAME/vitodalessandro:frontend-$APP_VERSION
docker push $DOCKER_USERNAME/vitodalessandro:strapi-$APP_VERSION

echo "✅ Images pushed to Docker Hub"
echo "🎉 All done! Your images are available at https://hub.docker.com/u/$DOCKER_USERNAME"