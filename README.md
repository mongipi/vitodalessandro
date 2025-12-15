# 🇮🇹 Vito D'Alessandro - Un Cittadino in Comune

**Website**: https://vitodalessandro.it  
**GitHub**: [pietromongiello/vitodalessandro](https://github.com/pietromongiello/vitodalessandro)  
**Author**: Vito D'Alessandro | **Maintainer**: Pietro Mongiello

---

## 📋 Indice

- [Che cos'è?](#che-cosè)
- [Stack Tecnologico](#stack-tecnologico)
- [Quick Start](#quick-start)
- [Documentazione](#documentazione)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Che cos'è?

**Vito D'Alessandro - Un Cittadino in Comune** è una piattaforma web personalizzata per un candidato amministrativo che vuole mantenere un contatto diretto con la comunità di Bitonto.

### Features
- 📝 **Blog** - Articoli e aggiornamenti
- 🎯 **Iniziative** - Progetti e proposte
- 📚 **Portfolio** - Competenze e esperienze
- ⛪ **Info Utili** - Santo del giorno, farmacie di turno
- 📱 **Responsive** - Funziona perfettamente su mobile
- 🎨 **Modern UI** - Design pulito con Bootstrap 5 + Sass

---

## Stack Tecnologico

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Bootstrap 5 + Sass** - Styling
- **Framer Motion** - Animazioni
- **EmailJS** - Contact form

### Backend (CMS)
- **Strapi 5.15** - Headless CMS
- **PostgreSQL 14** - Database
- **Node.js 18+** - Runtime

### Infrastruttura
- **Docker** - Containerization
- **Docker Swarm** - Orchestration (prod)
- **Nginx Proxy Manager** - Reverse proxy + SSL
- **GitHub Actions** - CI/CD (opzionale)

---

## Quick Start

### Opzione A: Con Script (Consigliato)

```bash
# Setup completo in un comando
bash docker/setup-local.sh

# Poi in due terminali:
# Terminal 1
cd services/fe && npm start

# Terminal 2
cd services/strapi-cloud-template-blog-aecd06639e && npm run develop
```

### Opzione B: Manuale

```bash
# 1. Setup environment
cp .env.example .env.local

# 2. Start database
docker-compose -f docker/compose.dev.yml up -d

# 3. Install dependencies
cd services/fe && npm install
cd ../strapi-cloud-template-blog-aecd06639e && npm install

# 4. Run services
# Terminal 1: npm start (in services/fe)
# Terminal 2: npm run develop (in services/strapi)
```

### Accesso ai Servizi

| Servizio | URL | Credenziali |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Strapi Admin | http://localhost:1337/admin | Setup durante primo accesso |
| Adminer (DB) | http://localhost:9090 | strapi / strapi_dev_password |

---

## 📚 Documentazione

### Setup & Deployment
- **[INFRA_SETUP.md](./INFRA_SETUP.md)** - Guida completa per dev/staging/prod

### Refactor Frontend
- **[REFACTOR_GUIDE.md](./REFACTOR_GUIDE.md)** - Custom hooks, API client, componenti riutilizzabili

### AI Agent Setup
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Linee guida per AI agents

---

## 🚀 Deployment

### Sviluppo Locale
```bash
bash docker/setup-local.sh
npm start  # in services/fe
npm run develop  # in services/strapi
```

### Staging
```bash
./docker/build.sh staging
./docker/deploy.sh staging
```

### Produzione
```bash
# Update VERSION
echo "1.0.16" > VERSION

# Build & push to Docker Hub
./docker/build.sh production

# Deploy su Swarm
./docker/deploy.sh production
```

**Per dettagli**: Vedi [INFRA_SETUP.md](./INFRA_SETUP.md)

---

## 📁 Struttura Progetto

```
.
├── docker/                          # Scripts e configurazioni Docker
│   ├── build.sh                    # Build images parametrizzato
│   ├── deploy.sh                   # Deploy script per Swarm
│   ├── setup-local.sh              # Setup locale automatico
│   ├── compose.dev.yml             # Docker Compose dev
│   ├── compose.prod.yml            # Docker Compose prod
│   └── secrets/                    # Tokens e secrets (git-ignored)
│
├── services/
│   ├── fe/                         # React Frontend
│   │   ├── public/
│   │   └── src/
│   │       ├── api/                # API client centralizzato
│   │       ├── components/         # Componenti riutilizzabili
│   │       ├── hooks/              # Custom hooks (useFetch, ecc)
│   │       ├── config/             # Configurazioni centralizzate
│   │       ├── pages/              # Page components
│   │       └── utils/              # Utility functions
│   │
│   └── strapi-cloud-template.../   # Strapi CMS
│       ├── config/                 # Strapi config (database, server, ecc)
│       ├── src/api/                # Content types (articoli, categorie, ecc)
│       └── scripts/                # Seed data, utils
│
├── .env.example                    # Template per .env files
├── .env.local                      # Dev environment (git-ignored)
├── .env.staging                    # Staging environment (git-ignored)
├── .env.production                 # Prod environment (git-ignored)
│
├── VERSION                         # Versione attuale (semantic versioning)
├── INFRA_SETUP.md                 # Documentazione infrastruttura
├── REFACTOR_GUIDE.md              # Guida refactor frontend
└── README.md                       # Questo file
```

---

## 🔧 Commands Principali

### Frontend
```bash
cd services/fe
npm start              # Dev server
npm run build          # Production build
npm test               # Run tests
npm run lint           # ESLint
```

### Strapi
```bash
cd services/strapi-cloud-template-blog-aecd06639e
npm run develop        # Dev server
npm run build          # Build
npm run start          # Production start
npm run seed:example   # Seed data
```

### Docker
```bash
# Dev
docker-compose -f docker/compose.dev.yml up -d
docker-compose -f docker/compose.dev.yml logs -f

# Build
./docker/build.sh local        # Local
./docker/build.sh staging      # Staging
./docker/build.sh production   # Production

# Deploy
./docker/deploy.sh production
```

---

## 🔐 Secrets & Environment Variables

### .env Files
I file `.env.*` contengono configurazioni sensibili e NON devono essere committati.

```bash
# Crea i tuoi file da .env.example
cp .env.example .env.local
cp .env.example .env.staging
cp .env.example .env.production

# Modifica con i tuoi valori reali
nano .env.local
```

### Docker Secrets (Prod)
In produzione, i secrets sono gestiti da Docker Swarm:

```bash
# Crea secrets
echo "value" | docker secret create secret_name -

# Usa nei compose file
secrets:
  my_secret:
    external: true
```

---

## 🌐 Domain & HTTPS

In produzione, il dominio viene associato via **Nginx Proxy Manager**.

1. **Accedi**: http://yourdomain.com:81
2. **Configura proxy host**:
   - Domain: yourdomain.com
   - Forward To: http://frontend:3000
   - Enable SSL (Let's Encrypt automatico)

Per dettagli: [INFRA_SETUP.md → Nginx Proxy Manager](./INFRA_SETUP.md#nginx-proxy-manager-setup)

---

## 📊 Database

### Sviluppo
```bash
# Adminer (browser UI)
http://localhost:9090

# Connection:
- Server: strapiDB
- Username: strapi
- Password: strapi_dev_password
```

### Produzione
PostgreSQL in container Docker Swarm con volume persistence.

**Backup**:
```bash
docker exec <container_id> pg_dump -U strapi strapi > backup.sql
```

---

## 🤝 Contributing

Se vuoi contribuire:

1. Fork il repository
2. Crea un branch (`git checkout -b feature/amazing-feature`)
3. Commit i cambiamenti (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

---

## 📝 License

Questo progetto è proprietario. Copyright © 2025 Vito D'Alessandro.

Per uso commerciale o modifiche, contatta l'autore.

---

## 📧 Contatti

- **Website**: https://vitodalessandro.it
- **Facebook**: [@vitodalessandrobitonto](https://www.facebook.com/vitodalessandrobitonto)
- **Instagram**: [@vito_dalessandro_](https://www.instagram.com/vito_dalessandro_/)
- **Email**: [disponibile sul sito]

---

## 📚 Risorse

- [React Docs](https://react.dev)
- [Strapi Docs](https://docs.strapi.io)
- [Docker Docs](https://docs.docker.com)
- [Docker Swarm Guide](https://docs.docker.com/engine/swarm/)
- [Nginx Proxy Manager](https://nginxproxymanager.com/)

---

**Last Updated**: December 2025  
**Current Version**: 1.0.15  
**Node**: 18+  
**Docker**: 20.10+
