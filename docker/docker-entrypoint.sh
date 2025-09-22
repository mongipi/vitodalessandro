#!/usr/bin/env sh
set -eu

load_from_file () {
  var="$1"
  file_var="${var}_FILE"
  eval file_path="\${$file_var:-}"
  if [ -n "${file_path}" ]; then
    if [ ! -f "${file_path}" ]; then
      echo ">> ERRORE: file per ${file_var} non trovato: ${file_path}" >&2
      exit 1
    fi
    export "$var"="$(cat "${file_path}")"
  fi
}

# Variabili sensibili di Strapi/DB che vogliamo caricare dai secrets
for v in APP_KEYS API_TOKEN_SALT ADMIN_JWT_SECRET TRANSFER_TOKEN_SALT JWT_SECRET DATABASE_PASSWORD; do
  load_from_file "$v"
done

exec "$@"
