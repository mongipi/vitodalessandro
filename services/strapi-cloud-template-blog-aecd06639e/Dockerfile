# FROM node:18-alpine
# # Installing libvips-dev for sharp Compatibility
# RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev
# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}
# ENV NODE_OPTIONS=--max-old-space-size=1040

# WORKDIR /opt/
# COPY package.json package-lock.json ./
# RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

# WORKDIR /opt/app
# COPY . .
# ENV PATH /opt/node_modules/.bin:$PATH
# RUN chown -R node:node /opt/app && \
#     mkdir -p /opt/app/public/uploads && \
#     chown -R node:node /opt/app/public/uploads

# USER node
# ENV NODE_OPTIONS=--max-old-space-size=2048
# RUN ["npm", "run", "build"]
# EXPOSE 1337
# CMD ["npm", "run", "develop"]


# Creating multi-stage build for production
FROM node:18-alpine as build
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install --only=production
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=2048
RUN npm run build

# Creating final production image
FROM node:18-alpine
RUN apk add --no-cache vips-dev
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

COPY docker-entrypoint.sh /opt/app/docker-entrypoint.sh
RUN chmod +x /opt/app/docker-entrypoint.sh
RUN chown -R node:node /opt/app

USER node
EXPOSE 1337
ENTRYPOINT ["/opt/app/docker-entrypoint.sh"]  

CMD ["npm", "run", "start"]