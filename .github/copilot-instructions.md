# AI Coding Agent Instructions for Vito D'Alessandro Project

## Architecture Overview

This is a **Node.js + React + Strapi** monorepo deployed on Docker Swarm. The project has two main services:

- **Frontend (FE)**: React 18 SPA at `services/fe/` with content fetched from Strapi CMS
- **Strapi CMS**: Headless CMS at `services/strapi-cloud-template-blog-aecd06639e/` managing content (articoli, categorie, farmacie, iniziative)

Database: PostgreSQL (in Docker Swarm) managed via Adminer on port 9090.

## Build & Deployment Workflow

**Build process** (`docker/build.sh`):
1. Reads version from `VERSION` file (semantic versioning: 1.0.15)
2. Reads API tokens from `docker/secrets/` (strapi_token.txt, santo_token.txt)
3. Builds frontend image with React build args: `REACT_APP_STRAPI_API_URL`, `REACT_APP_STRAPI_TOKEN`, `REACT_APP_SANTO_DEL_GIORNO_API_TOKEN`
4. Builds Strapi image
5. Tags both images with version and pushes to Docker Hub (`pietromongiello/vitodalessandro:*`)

**Important**: Build arguments are injected at image build time into React env vars. Update `VERSION` file to bump release version.

## Frontend Architecture (React)

**Entry point**: `services/fe/src/App.js` — defines routes for main pages (blog, portfolio, initiatives, info).

**API client** (`services/fe/src/api/client.js`):
- Uses fetch with Bearer token auth
- Connects to Strapi at `REACT_APP_STRAPI_API_URL` (default: `https://strapi.vps.cloud-ip.cc/api`)
- Token injected as env var at build time

**Data flows**: 
- Blog articles from `articoli` endpoint
- Categories from `categorie`
- Farmacie (pharmacies) from `farmacie`
- Iniziative (initiatives) from `iniziative`
- Santo del giorno (daily saint) from external API with separate token

**Styling**: Bootstrap 5 + SCSS (in `src/assets/scss/`). Component-level CSS alongside JS.

## Strapi Configuration

**Content types** (auto-generated): Located at `src/api/{articoli,category,farmacia,iniziative,orari}/`

**Database config**: `config/database.js` points to Postgres on swarm.

**Key plugins**:
- `@strapi/plugin-users-permissions` (v5.15.0)
- `strapi-5-plugin-responsive-backend` (media handling)

**Seed script**: `scripts/seed.js` populates example data.

## Docker & Secrets

**Secrets management** (`docker/swarm/docker-compose.yml`):
- Secrets stored as files in `docker/secrets/`: `app-keys.txt`, `postgress-password.txt`, `strapi_token.txt`, `santo_token.txt`
- Passed to containers via Docker Swarm secrets, not env vars (security best practice)

**Network topology**:
- `strapi-network`: Internal network for Strapi ↔ Postgres
- `reverse-proxy`: External overlay network (nginx-pm gateway at `https://strapi.vps.cloud-ip.cc/`)

## Project Conventions

1. **Version bumping**: Edit `VERSION` file, run `docker/build.sh` to rebuild and push
2. **Token rotation**: Update secrets files in `docker/secrets/`, rebuild images
3. **Locale comments**: Code includes Italian comments (e.g., "se hai un Dockerfile per Strapi") — preserve these
4. **Error handling**: Build script uses `set -e` (fail fast) and checks `$?` status codes
5. **Image tagging**: Format is `{username}/vitodalessandro:{service}-{version}`

## When Modifying Code

- **Frontend changes**: Edit under `services/fe/src/`. React app rebuilds into `/build` (served by nginx in prod)
- **Strapi content types**: Add to `services/strapi-cloud-template-blog-aecd06639e/src/api/`
- **Build args**: Update `docker/build.sh` and rebuild images; also update `docker/fe/docker-compose.yml` if adding new env vars
- **Secrets**: Never commit secrets files; they're git-ignored and environment-specific

## Testing & Local Dev

- **Frontend**: `npm start` in `services/fe/` for hot reload (uses `react-scripts`)
- **Strapi**: `npm run develop` for Strapi dev server with auto-reload
- **Docker**: Use `docker/fe/docker-compose.yml` or swarm compose for local container testing
- **Adminer**: DB browser available at `localhost:9090` after services start

## Key Dependencies

**Frontend**: React 18, React Router 6, Bootstrap 5, EmailJS, Framer Motion, react-parallax
**Strapi**: Strapi 5.15.0, PostgreSQL 14, better-sqlite3, styled-components
**Infra**: Docker, Docker Compose, Nginx, Nginx Proxy Manager

---

*Last updated: Dec 2025. Refer to package.json files for complete dependency versions.*
