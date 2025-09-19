# Stage 1: Build
FROM node:20-alpine AS buils

WORKDIR /app

# Copia solo package.json e package-lock.json per caching layer
COPY package*.json ./

RUN npm install --production=false

# Copia il resto del progetto
COPY . .

# Variabili d'ambiente di build-time
ARG REACT_APP_STRAPI_TOKEN
ARG REACT_APP_STRAPI_API_URL
ARG REACT_APP_SANTO_DEL_GIORNO_API_TOKEN

ENV REACT_APP_STRAPI_TOKEN=$REACT_APP_STRAPI_TOKEN
ENV REACT_APP_STRAPI_API_URL=$REACT_APP_STRAPI_API_URL
ENV REACT_APP_SANTO_DEL_GIORNO_API_TOKEN=$REACT_APP_SANTO_DEL_GIORNO_API_TOKEN

# Build React in modalità produzione
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]