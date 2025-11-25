#!/bin/sh
set -e

# Legge la password dal secret
if [ -f "/run/secrets/postgress-password" ]; then
  export DATABASE_PASSWORD=$(cat /run/secrets/postgress-password)
fi

# Legge app keys dal secret
if [ -f "/run/secrets/app-keys" ]; then
  export APP_KEYS=$(cat /run/secrets/app-keys)
fi

# Avvia Strapi
exec strapi start
