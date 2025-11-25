#!/bin/sh

# Leggi i secret se esistono
if [ -f "/run/secrets/strapi_token" ]; then
  export REACT_APP_STRAPI_TOKEN=$(cat /run/secrets/strapi_token)
fi

if [ -f "/run/secrets/santo_token" ]; then
  export REACT_APP_SANTO_DEL_GIORNO_API_TOKEN=$(cat /run/secrets/santo_token)
fi

# Avvia il comando passato al container
exec "$@"
