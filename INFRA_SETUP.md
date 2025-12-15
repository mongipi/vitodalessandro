# 🚀 Infrastructure Setup Guide - Vito D'Alessandro

Complete guide per setupare e deployare il progetto in locale, staging, e produzione.

---

## 📋 Indice

1. [Struttura Infrastruttura](#struttura-infrastruttura)
2. [Sviluppo Locale](#sviluppo-locale)
3. [Deploy Staging](#deploy-staging)
4. [Deploy Produzione](#deploy-produzione)
5. [Docker Secrets Management](#docker-secrets-management)
6. [Troubleshooting](#troubleshooting)

---

## Struttura Infrastruttura

### File Principali

```
docker/
  build.sh              ← Build script parametrizzato
  deploy.sh             ← Deploy script per Swarm
  compose.dev.yml       ← Docker Compose per dev
  compose.prod.yml      ← Docker Compose per prod/staging
  secrets/              ← Tokens e secrets (git-ignored)
    strapi_token.txt
    santo_token.txt
    app-keys.txt

.env.example           ← Modello per .env files
.env.local             ← Dev environment variables
.env.staging           ← Staging environment variables
.env.production        ← Production environment variables

VERSION                ← Versione attuale (1.0.15)
```

### Ambienti

| Ambiente | Database | Frontend | Strapi | Dominio |
|----------|----------|----------|--------|---------|
| **Local** | PostgreSQL (Docker) | npm start | npm run develop | localhost:3000 |
| **Staging** | PostgreSQL (Container) | Docker image | Docker image | staging.vitodalessandro.it |
| **Prod** | PostgreSQL (Container) | Docker image (2 replicas) | Docker image | vitodalessandro.it |

---

## Sviluppo Locale

### 1. Setup Iniziale

```bash
# Clona repo
git clone <repo> vitodalessandro
cd vitodalessandro

# Copia .env per dev
cp .env.example .env.local
# Modifica se necessario (default è OK per dev)

# Avvia database e Adminer
docker-compose -f docker/compose.dev.yml up -d

# Verifica che DB sia pronto
docker-compose -f docker/compose.dev.yml logs strapiDB
```

### 2. Frontend Development

```bash
# In una finestra di terminale
cd services/fe
npm install
npm start
# ✓ Accessibile su http://localhost:3000
```

### 3. Strapi Development

```bash
# In un'altra finestra di terminale
cd services/strapi-cloud-template-blog-aecd06639e
npm install
npm run develop
# ✓ Accessibile su http://localhost:1337
# ✓ Admin panel su http://localhost:1337/admin
```

### 4. Database Browser

```bash
# Adminer è accessibile su http://localhost:9090
# Server: strapiDB
# Username: strapi
# Password: strapi_dev_password (da .env.local)
```

### 5. Fermare i Servizi

```bash
# Frontend e Strapi: Ctrl+C nei loro terminali
# Database e Adminer:
docker-compose -f docker/compose.dev.yml down
# Opzionale: remove volumes
docker-compose -f docker/compose.dev.yml down -v
```

---

## Deploy Staging

### 1. Prepare Environment

```bash
# Aggiorna .env.staging con i valori reali
nano .env.staging
# - DOMAIN=staging.vitodalessandro.it
# - STRAPI_API_TOKEN=<token>
# - DATABASE_PASSWORD=<password>
# - Etc.

# Aggiorna VERSION se necessario
echo "1.0.16" > VERSION
```

### 2. Build Images

```bash
# Build per staging
./docker/build.sh staging

# Opzionale: testa localmente prima di pushare
docker run -e REACT_APP_STRAPI_API_URL=http://localhost:1337 \
  my-frontend:staging-1.0.16
```

### 3. Setup Docker Secrets sul Server Staging

```bash
# SSH nel server staging
ssh user@staging.vitodalessandro.it

# Crea i secrets (una volta sola)
echo "your_jwt_secret" | docker secret create strapi_jwt_secret -
echo "your_admin_jwt_secret" | docker secret create strapi_admin_jwt_secret -
echo "your_api_token_salt" | docker secret create strapi_api_token_salt -
echo "your_transfer_token_salt" | docker secret create strapi_transfer_token_salt -
echo "$(cat /path/to/app-keys.txt)" | docker secret create strapi_app_keys -
echo "your_strapi_token" | docker secret create strapi_api_token -
echo "your_santo_token" | docker secret create santo_api_token -
echo "strapi" | docker secret create db_username -
echo "your_db_password" | docker secret create db_password -
echo "strapi" | docker secret create db_name -
```

### 4. Deploy Stack

```bash
# Nel repository locale
./docker/deploy.sh staging --skip-build

# Oppure con build incluso
./docker/deploy.sh staging
```

### 5. Configure Nginx Proxy Manager

```bash
# Accedi a http://staging.vitodalessandro.it:81
# Default: admin@example.com / changeme

# Configura proxy host:
# - Domain: staging.vitodalessandro.it
# - Forward To: http://frontend:3000
# - Enable SSL: true (Let's Encrypt)
```

### 6. Verify Deployment

```bash
# Verifica i servizi
docker stack ps vitodalessandro-staging

# Guarda i log
docker service logs vitodalessandro-staging_frontend
docker service logs vitodalessandro-staging_strapi

# Test health
curl -I https://staging.vitodalessandro.it
curl -I https://staging.vitodalessandro.it/api/health
```

---

## Deploy Produzione

### 1. Production Preparation

```bash
# Aggiorna VERSION (semantic versioning)
echo "1.0.16" > VERSION

# Aggiorna .env.production
nano .env.production
# - DOMAIN=vitodalessandro.it
# - Usa VERI tokens e password
# - DATABASE_SSL=true
# - LOG_LEVEL=warn
```

### 2. Build & Push to Docker Hub

```bash
# Build per produzione
./docker/build.sh production

# Verrà chiesto se pushare su Docker Hub
# Rispondere 'y' per pushare
# (Verifica di essere loggato: docker login)
```

### 3. Setup Docker Swarm su VPS

```bash
# Se non già inizializzato
docker swarm init

# Oppure, se hai più nodi
docker swarm init --advertise-addr <manager-ip>

# Per aggiungere worker nodes
docker swarm join-token worker
# (da eseguire su ogni worker)
```

### 4. Create Docker Secrets

```bash
# Leggi dai file e crea secrets
for secret in strapi_jwt_secret strapi_admin_jwt_secret \
              strapi_api_token_salt strapi_transfer_token_salt \
              strapi_app_keys strapi_api_token santo_api_token \
              db_username db_password db_name; do
  
  # Se il secret esiste, rimuovi (attenzione: non può essere aggiornato direttamente)
  docker secret rm $secret 2>/dev/null || true
  
  # Crea nuovo secret
  # Nota: in produzione, leggere da file sicuro
  read -s "Enter value for $secret: " value
  echo "$value" | docker secret create $secret -
done
```

### 5. Deploy Stack

```bash
# Deploy su swarm
./docker/deploy.sh production --skip-build

# Oppure con build
./docker/deploy.sh production
```

### 6. Configure Nginx Proxy Manager

```bash
# Accedi a http://vitodalessandro.it:81
# 
# Configura:
# 1. Proxy Host for Frontend:
#    - Domain: vitodalessandro.it
#    - Forward To: http://frontend:3000
#    - Enable SSL (Let's Encrypt)
#
# 2. Proxy Host for Strapi API:
#    - Domain: api.vitodalessandro.it (opzionale)
#    - Forward To: http://strapi:1337
#    - Enable SSL

# Accesso al Strapi admin remoto (di solito):
# https://vitodalessandro.it/admin (rewrite via NPM)
# oppure su subdomain se configurato
```

### 7. Verify Production Deployment

```bash
# Verifica i servizi (2 frontend replicas)
docker stack ps vitodalessandro-production

# Guarda i log
docker service logs vitodalessandro-production_frontend -f
docker service logs vitodalessandro-production_strapi -f

# Test endpoints
curl -I https://vitodalessandro.it
curl -H "Authorization: Bearer <token>" \
  https://vitodalessandro.it/api/articolis
```

### 8. Production Monitoring

```bash
# Scala il numero di frontend replicas se necessario
docker service scale vitodalessandro-production_frontend=3

# Guarda l'utilizzo delle risorse
docker stats

# Verifica i volumi
docker volume ls | grep strapi

# Backup database (importante!)
docker exec vitodalessandro-production_strapiDB-* \
  pg_dump -U strapi strapi > backup_$(date +%Y%m%d).sql
```

---

## Docker Secrets Management

### Cosa sono i Secrets?

Docker Secrets sono credenziali sensibili memorizzate in modo sicuro in Swarm. Non sono mai visibili in plain text negli environment variables.

### Creare un Secret

```bash
# Da stdin
echo "my_secret_value" | docker secret create my_secret -

# Da file
docker secret create my_secret /path/to/secret/file

# Da variabile (NON RACCOMANDATO, usa file!)
SECRET_VALUE="..." docker secret create my_secret -
```

### Usare un Secret nel Compose

```yaml
services:
  app:
    environment:
      JWT_SECRET_FILE: /run/secrets/jwt_secret
    secrets:
      - jwt_secret

secrets:
  jwt_secret:
    external: true  # Creato manualmente tramite docker secret create
```

### Nel Codice Node.js

```javascript
const fs = require('fs');

// Leggi da file secret
const secret = fs.readFileSync('/run/secrets/jwt_secret', 'utf8').trim();
process.env.JWT_SECRET = secret;
```

### Best Practices

1. **NON** committare secrets nel repo
2. **SEMPRE** usa `external: true` in production
3. Rigenera secrets regolarmente
4. Usa una gestione secret sicura (HashiCorp Vault, AWS Secrets Manager, ecc.)

---

## Troubleshooting

### Database non si connette

```bash
# Verifica che il container sia running
docker ps | grep strapiDB

# Controlla i log
docker logs strapiDB

# Verifica le credenziali in .env
echo $DATABASE_PASSWORD

# Test connessione manualmente
docker exec -it strapiDB psql -U strapi -d strapi -c "SELECT 1;"
```

### Frontend non carica immagini da Strapi

```bash
# Verifica che REACT_APP_STRAPI_API_URL sia corretto
# In dev: http://localhost:1337/api
# In prod: https://vitodalessandro.it/api

# Controlla CORS in Strapi
# config/middlewares.js deve permettere l'origine
```

### Strapi admin non carica

```bash
# Verifica che admin URL sia corretta
# Controlla i log di Strapi
docker service logs vitodalessandro-production_strapi

# Se in prod, verifica che Nginx PM forwardia correttamente
```

### Deploy stack fallisce

```bash
# Verifica lo stato
docker stack ps vitodalessandro-production

# Guarda gli errori
docker service logs vitodalessandro-production_strapi

# Verifica le immagini siano pullabili
docker pull pietromongiello/vitodalessandro:frontend-production-1.0.16

# Se è un problema di secrets, verifica che esistano
docker secret ls
```

### Rollback a versione precedente

```bash
# Update stack con immagine precedente
docker service update \
  --image pietromongiello/vitodalessandro:frontend-production-1.0.15 \
  vitodalessandro-production_frontend

# Oppure rimuovi lo stack e redeploy
docker stack rm vitodalessandro-production
./docker/deploy.sh production --skip-build
```

---

## Checklists

### Pre-Production Checklist

- [ ] VERSION aggiornato
- [ ] .env.production compilato correttamente
- [ ] Secrets creati su Docker Swarm
- [ ] Database backed up
- [ ] SSL certificates ready
- [ ] Dominio punta al server
- [ ] Firewall consente 80/443/81
- [ ] Docker Swarm inizializzato
- [ ] Docker Hub token disponibile

### Post-Deployment Checklist

- [ ] Frontend carica su dominio
- [ ] API rispondono correttamente
- [ ] Strapi admin accessibile
- [ ] SSL certificates valid
- [ ] Database persistence funziona
- [ ] Logs sono puliti (no major errors)
- [ ] Scaling works (se necessario)
- [ ] Backup policy attiva
- [ ] Monitoring/alerting configurato

---

## Recursos

- [Docker Swarm Docs](https://docs.docker.com/engine/swarm/)
- [Nginx Proxy Manager](https://nginxproxymanager.com/)
- [Strapi Deployment](https://docs.strapi.io/dev-docs/deployment)
- [PostgreSQL Backups](https://www.postgresql.org/docs/current/backup.html)

---

**Last Updated**: December 2025  
**Version**: 1.0.15+
