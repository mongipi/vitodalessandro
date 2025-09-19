# Stage 1: build React
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_STRAPI_TOKEN
ARG REACT_APP_STRAPI_API_URL
ARG REACT_APP_SANTO_DEL_GIORNO_API_TOKEN
ENV REACT_APP_STRAPI_TOKEN=$REACT_APP_STRAPI_TOKEN
ENV REACT_APP_STRAPI_API_URL=$REACT_APP_STRAPI_API_URL
ENV REACT_APP_SANTO_DEL_GIORNO_API_TOKEN=$REACT_APP_SANTO_DEL_GIORNO_API_TOKEN
RUN npm run build

# Stage 2: serve con Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
