# Stage di build
FROM node:18-alpine AS build

# Install dependencies necessarie per sharp/libvips
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev bash > /dev/null 2>&1

# Ambiente di build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production

ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .

# Copia la cartella data con uploads e data.json
COPY ./data ./data

ENV NODE_OPTIONS=--max-old-space-size=2048

RUN npm run build

# Stage finale (produzione)
FROM node:18-alpine

RUN apk add --no-cache vips-dev bash

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules

WORKDIR /opt/app
COPY --from=build /opt/app ./

ENV PATH /opt/node_modules/.bin:$PATH

# Permessi per l'utente node
RUN chown -R node:node /opt/app

USER node

EXPOSE 1337

# Entrypoint
COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
