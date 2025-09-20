FROM node:22-alpine

# Installo librerie native necessarie (sharp ecc.)
RUN apk add --no-cache build-base vips-dev bash git

# Creo la cartella di lavoro
WORKDIR /opt/app

# Copio package.json e lock file
COPY package*.json ./

# Installo dipendenze come root
RUN npm ci

# Copio il resto del codice
COPY . .

# Build di Strapi come root (nessun problema di permessi)
RUN npm run build

# Espongo la porta
EXPOSE 1337

# Cambio utente solo ora per eseguire in sicurezza
USER node

# Avvio l'applicazione
CMD ["npm", "run", "develop"]
