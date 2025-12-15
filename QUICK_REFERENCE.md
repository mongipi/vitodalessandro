# ⚡ Quick Reference - Comandi Essenziali

## 🚀 Setup & Start

### Prima Volta (Setup Locale)
```bash
bash docker/setup-local.sh
```

### Sviluppo Giornaliero
```bash
# Terminal 1: Frontend
cd services/fe && npm start

# Terminal 2: Strapi CMS
cd services/strapi-cloud-template-blog-aecd06639e && npm run develop
```

### Fermare
```bash
# Strapi/Frontend: Ctrl+C
# Database: 
docker-compose -f docker/compose.dev.yml down
```

---

## 🐳 Docker Commands

### Dev Environment
```bash
# Avvia DB e Adminer
docker-compose -f docker/compose.dev.yml up -d

# Log
docker-compose -f docker/compose.dev.yml logs -f

# Arresta
docker-compose -f docker/compose.dev.yml down
```

### Build
```bash
./docker/build.sh local              # Development
./docker/build.sh staging            # Staging
./docker/build.sh production         # Production
```

### Deploy
```bash
./docker/deploy.sh staging
./docker/deploy.sh production
```

---

## 🌐 Access Points

### Development
| Servizio | URL |
|----------|-----|
| Frontend | http://localhost:3000 |
| Strapi Admin | http://localhost:1337/admin |
| Strapi API | http://localhost:1337/api |
| Database UI | http://localhost:9090 |

### Production
| Servizio | URL |
|----------|-----|
| Frontend | https://vitodalessandro.it |
| Strapi Admin | https://vitodalessandro.it/admin |
| Nginx Admin | https://vitodalessandro.it:81 |

---

## 📝 Environment Files

```bash
# Vedi/modifica variabili
nano .env.local              # Dev
nano .env.staging            # Staging
nano .env.production         # Production
```

**Non committare .env* files!**

---

## 💾 Database

### Adminer (GUI)
```
URL: http://localhost:9090
Server: strapiDB
Username: strapi
Password: strapi_dev_password
```

### CLI
```bash
# Accedi a PostgreSQL
docker exec -it strapi-db psql -U strapi -d strapi

# Query
SELECT * FROM articles;
```

### Backup
```bash
docker exec strapi-db pg_dump -U strapi strapi > backup.sql
```

---

## 🔍 Logs & Debugging

### Frontend
```bash
# Dev mode: apri console del browser (F12)
# Prod: docker service logs vitodalessandro-production_frontend
```

### Strapi
```bash
# Dev: output nel terminale dove hai fatto npm run develop
# Prod: docker service logs vitodalessandro-production_strapi
```

### Database
```bash
docker-compose -f docker/compose.dev.yml logs -f strapiDB
# oppure in prod:
docker service logs vitodalessandro-production_strapiDB
```

---

## 🔐 Secrets (Production)

### Verifica secrets
```bash
docker secret ls
```

### Crea secret
```bash
echo "value" | docker secret create secret_name -
```

### Aggiorna secret
```bash
# Rimuovi e ricrea (non si può aggiornare direttamente)
docker secret rm old_secret
echo "new_value" | docker secret create old_secret -

# Rideploy lo stack
docker stack deploy -c docker/compose.prod.yml vitodalessandro-production
```

---

## 🔄 Deployment Pipeline

### Staging
```bash
# 1. Aggiorna .env.staging
nano .env.staging

# 2. Build
./docker/build.sh staging

# 3. Deploy
./docker/deploy.sh staging
```

### Production
```bash
# 1. Bump version
echo "1.0.16" > VERSION

# 2. Aggiorna .env.production
nano .env.production

# 3. Build & push
./docker/build.sh production

# 4. Deploy
./docker/deploy.sh production
```

---

## 🛠️ Troubleshooting

### Frontend non carica
```bash
# Verifica REACT_APP_STRAPI_API_URL in .env
grep REACT_APP_STRAPI_API_URL .env.local

# Ricompila
cd services/fe && npm run build
```

### Strapi non si connette al DB
```bash
# Verifica DB è running
docker-compose -f docker/compose.dev.yml ps strapiDB

# Test connessione
docker exec strapi-db psql -U strapi -d strapi -c "SELECT 1;"
```

### Deploy fallisce
```bash
# Verifica images
docker images | grep vitodalessandro

# Verifica secrets
docker secret ls

# Log dello stack
docker stack ps vitodalessandro-production
```

---

## 📊 Useful Stats

```bash
# Resource usage
docker stats

# Disk usage
docker system df

# Networks
docker network ls

# Volumes
docker volume ls
```

---

## 🔗 Links Importanti

- [INFRA_SETUP.md](./INFRA_SETUP.md) - Setup completo
- [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) - Frontend refactor
- [README.md](./README.md) - Overview progetto
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - AI agents

---

## 💡 Tips

1. **Sempre usare `docker-compose` per dev**: Più facile che installare PostgreSQL
2. **Script `setup-local.sh`**: Usa per primo setup, sarà più veloce
3. **Check `.env.example`**: Se non sai un valore, guarda lì
4. **Use Adminer per DB**: Più facile che psql CLI
5. **Leggi INFRA_SETUP.md**: Risponde a quasi tutte le domande

---

**Last Updated**: December 2025
