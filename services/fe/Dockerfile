
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build-time environment variables
ARG REACT_APP_STRAPI_API_URL
ARG REACT_APP_STRAPI_TOKEN
ARG REACT_APP_SANTO_DEL_GIORNO_API_TOKEN

# Set environment variables
ENV REACT_APP_STRAPI_API_URL=$REACT_APP_STRAPI_API_URL
ENV REACT_APP_STRAPI_TOKEN=$REACT_APP_STRAPI_TOKEN
ENV REACT_APP_SANTO_DEL_GIORNO_API_TOKEN=$REACT_APP_SANTO_DEL_GIORNO_API_TOKEN

# Build app senza token
# ARG REACT_APP_STRAPI_API_URL
# ENV REACT_APP_STRAPI_API_URL=$REACT_APP_STRAPI_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

# Entry point per leggere secret runtime
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh
# ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
