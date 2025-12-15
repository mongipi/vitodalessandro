# 📚 Documentazione Completa - Indice

Guida completa ai refactor frontend e infrastruttura del progetto Vito D'Alessandro.

---

## 🎯 Cominci da qui

### Se sei nuovo al progetto:
1. Leggi [README.md](./README.md) - Overview
2. Esegui `bash docker/setup-local.sh` - Setup automatico
3. Consulta [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Comandi essenziali

### Se devi deployare:
1. Leggi [INFRA_SETUP.md](./INFRA_SETUP.md) - Setup staging/production
2. Esegui `./docker/deploy.sh staging|production`
3. Consulta [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Troubleshooting

### Se devi modificare il codice:
1. Leggi [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) - Pattern frontend
2. Consulta [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Linee guida AI
3. Usa custom hooks invece di fetch diretti

---

## 📖 Documenti Disponibili

### Documenti Principali

| Documento | Scopo | Lettori |
|-----------|-------|---------|
| **[README.md](./README.md)** | Overview progetto, quick start | **Tutti** |
| **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** | Comandi veloci, access points | **Sviluppatori** |
| **[INFRA_SETUP.md](./INFRA_SETUP.md)** | Setup completo, deployment, troubleshooting | **DevOps, Deployment** |
| **[REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md)** | Pattern frontend, custom hooks, best practices | **Frontend devs** |
| **[INFRA_REFACTOR_SUMMARY.md](./INFRA_REFACTOR_SUMMARY.md)** | Cosa è stato refaktorizzato, metriche | **Tutti (review)** |

### Documenti Configurazione

| File | Scopo |
|------|-------|
| **[.env.example](./.env.example)** | Template variabili d'ambiente |
| **[.env.local](./.env.local)** | Ambiente sviluppo (git-ignored) |
| **[.env.staging](./.env.staging)** | Ambiente staging (git-ignored) |
| **[.env.production](./.env.production)** | Ambiente produzione (git-ignored) |
| **[.github/copilot-instructions.md](./.github/copilot-instructions.md)** | Linee guida AI agents |

### Script Automatizzati

| Script | Scopo | Uso |
|--------|-------|-----|
| **[docker/setup-local.sh](./docker/setup-local.sh)** | Setup locale automatico | `bash docker/setup-local.sh` |
| **[docker/build.sh](./docker/build.sh)** | Build images Docker | `./docker/build.sh {env}` |
| **[docker/deploy.sh](./docker/deploy.sh)** | Deploy su Swarm | `./docker/deploy.sh {env}` |

### Docker Compose Files

| File | Scopo | Uso |
|------|-------|-----|
| **[docker/compose.dev.yml](./docker/compose.dev.yml)** | Docker Compose dev | `docker-compose -f docker/compose.dev.yml up -d` |
| **[docker/compose.prod.yml](./docker/compose.prod.yml)** | Docker Compose prod/staging | Usato da `deploy.sh` |

---

## 🔄 Workflow di Sviluppo

### Setup Iniziale (Una Volta)
```
1. bash docker/setup-local.sh
   ↓
2. npm start (in services/fe)
3. npm run develop (in services/strapi)
```
**Vedi**: [QUICK_REFERENCE.md - Setup](./QUICK_REFERENCE.md#-setup--start)

### Sviluppo Giornaliero
```
1. Apri 2 terminali
2. Frontend: npm start
3. Strapi: npm run develop
4. Modifica codice (hot reload automatico)
5. Ctrl+C per fermare (oppure Ctrl+C + docker-compose down)
```
**Vedi**: [README.md - Quick Start](./README.md#quick-start)

### Deploy Staging
```
1. Aggiorna .env.staging
2. ./docker/build.sh staging
3. ./docker/deploy.sh staging
4. Configura Nginx Proxy Manager
```
**Vedi**: [INFRA_SETUP.md - Deploy Staging](./INFRA_SETUP.md#deploy-staging)

### Deploy Production
```
1. Aggiorna VERSION
2. Aggiorna .env.production
3. ./docker/build.sh production
4. ./docker/deploy.sh production
5. Configura Nginx Proxy Manager
```
**Vedi**: [INFRA_SETUP.md - Deploy Produzione](./INFRA_SETUP.md#deploy-produzione)

---

## 🎯 Casi d'Uso

### 🔨 "Ho bisogno di aggiungere una pagina"
1. Leggi: [REFACTOR_GUIDE.md - Pattern](./REFACTOR_GUIDE.md#pattern-da-seguire)
2. Usa custom hooks: `useArticoli()`, `useCategorie()`, ecc.
3. Wrappa con `LoadingContainer` per UI consistency
4. Test localmente: http://localhost:3000

### 🚀 "Devo fare il deploy in staging"
1. Leggi: [INFRA_SETUP.md - Staging](./INFRA_SETUP.md#deploy-staging)
2. Esegui: `./docker/deploy.sh staging`
3. Configura dominio/SSL in Nginx PM
4. Test: https://staging.vitodalessandro.it

### 🐛 "Il database non si connette"
1. Vedi: [QUICK_REFERENCE.md - Troubleshooting](./QUICK_REFERENCE.md#-troubleshooting)
2. Vedi: [INFRA_SETUP.md - Troubleshooting](./INFRA_SETUP.md#troubleshooting)
3. Controlla logs: `docker-compose -f docker/compose.dev.yml logs -f strapiDB`

### 🔐 "Devo aggiornare un secret in produzione"
1. Leggi: [INFRA_SETUP.md - Docker Secrets](./INFRA_SETUP.md#docker-secrets-management)
2. Vedi: [QUICK_REFERENCE.md - Secrets](./QUICK_REFERENCE.md#-secrets-production)
3. Rimuovi secret, ricrea, rideploy stack

### 📊 "Quali sono le migliorie del refactor?"
1. Vedi: [INFRA_REFACTOR_SUMMARY.md - Metriche](./INFRA_REFACTOR_SUMMARY.md#-metriche-miglioramento)
2. Vedi: [REFACTOR_GUIDE.md - Features](./REFACTOR_GUIDE.md#completato)

---

## 🏗️ Struttura Refactor

### Frontend (`src/`)
```
✅ config/config.js           - Costanti centralizzate
✅ api/client.js              - API client con error handling
✅ api/*.js                   - Endpoint refaktorizzati
✅ hooks/useFetch.js          - Custom hooks
✅ components/UIElements.jsx  - Componenti riutilizzabili
✅ components/blog.js         - Refactor con UIElements
```

### Infrastructure (`docker/`)
```
✅ .env.example               - Template env vars
✅ .env.local                 - Dev environment
✅ .env.staging               - Staging environment
✅ .env.production            - Prod environment
✅ build.sh                   - Build parametrizzato
✅ deploy.sh                  - Deploy automatizzato
✅ setup-local.sh             - Setup locale
✅ compose.dev.yml            - Docker Compose dev
✅ compose.prod.yml           - Docker Compose prod
```

### Documentation
```
✅ README.md                  - Overview
✅ QUICK_REFERENCE.md         - Comandi veloci
✅ INFRA_SETUP.md             - Setup completo
✅ REFACTOR_GUIDE.md          - Pattern frontend
✅ INFRA_REFACTOR_SUMMARY.md  - Sommario refactor
✅ DOCUMENTATION_INDEX.md     - Questo file
```

---

## 📚 Letture Consigliate per Ruolo

### 👨‍💻 Frontend Developer
1. [README.md](./README.md) - Start
2. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Comandi
3. [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) - Pattern
4. [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Linee guida

### 🏗️ DevOps / DevSecOps
1. [README.md](./README.md) - Start
2. [INFRA_SETUP.md](./INFRA_SETUP.md) - Setup completo
3. [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Comandi essenziali
4. [INFRA_REFACTOR_SUMMARY.md](./INFRA_REFACTOR_SUMMARY.md) - Architettura

### 👥 Project Manager / Tech Lead
1. [README.md](./README.md) - Overview
2. [INFRA_REFACTOR_SUMMARY.md](./INFRA_REFACTOR_SUMMARY.md) - Metriche
3. [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) - Struttura codice

### 🤖 AI Agents / LLMs
1. [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Context & linee guida
2. [REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md) - Pattern da seguire
3. [INFRA_SETUP.md](./INFRA_SETUP.md) - Architettura deployment

---

## ⚡ TL;DR (Too Long; Didn't Read)

### Setup (5 minuti)
```bash
bash docker/setup-local.sh
cd services/fe && npm start      # Terminal 1
cd services/strapi-... && npm run develop  # Terminal 2
```

### Deploy
```bash
./docker/build.sh {env}          # Build
./docker/deploy.sh {env}         # Deploy
```

### Access
- Dev Frontend: http://localhost:3000
- Dev Strapi: http://localhost:1337/admin
- Dev Database: http://localhost:9090
- Prod: https://vitodalessandro.it

### Troubleshoot
- Vedi [QUICK_REFERENCE.md](./QUICK_REFERENCE.md#-troubleshooting)
- Vedi [INFRA_SETUP.md](./INFRA_SETUP.md#troubleshooting)

---

## 🔗 Risorse Esterne

- **[Docker Swarm Docs](https://docs.docker.com/engine/swarm/)**
- **[Strapi Documentation](https://docs.strapi.io)**
- **[React Docs](https://react.dev)**
- **[Nginx Proxy Manager](https://nginxproxymanager.com/)**
- **[PostgreSQL Docs](https://www.postgresql.org/docs/)**

---

## 📞 FAQ Rapide

**D: Come aggiusto il database che non si connette?**  
R: Vedi [QUICK_REFERENCE.md - Troubleshooting](./QUICK_REFERENCE.md#-troubleshooting)

**D: Devo aggiungere una nuova variabile d'ambiente?**  
R: Aggiorna `.env.example` e i relativi `.env.{env}` files

**D: Come aggiungo un nuovo endpoint Strapi?**  
R: Crea in `services/strapi/src/api/`, poi aggiungi funzione in `services/fe/src/api/`

**D: Posso deployare in produzione senza build?**  
R: Sì: `./docker/deploy.sh production --skip-build`

**D: Come faccio il backup del database?**  
R: Vedi [INFRA_SETUP.md - Database](./INFRA_SETUP.md#backup)

**D: Come cambio il dominio?**  
R: Aggiorna `.env.production` (DOMAIN), rideploy, riconfigura Nginx PM

---

## ✅ Checklist di Completamento

- [x] Setup locale automatico
- [x] Frontend refactoring completo
- [x] API client centralizzato
- [x] Custom hooks per data fetching
- [x] Docker Swarm setup
- [x] Environment variables parametrizzati
- [x] Deploy script automatizzato
- [x] Documentazione completa
- [x] Secrets management
- [x] Database config fixed
- [ ] CI/CD pipeline (TODO)
- [ ] Monitoring & alerting (TODO)

---

**Ultima Aggiornamento**: December 15, 2025  
**Versione**: 1.0.15+  
**Status**: 🎉 PRONTO PER PRODUZIONE

---

🚀 **Buon lavoro!** Se hai domande, consulta la documentazione pertinente oppure crea un issue.
