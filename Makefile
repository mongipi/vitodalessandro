define docker_rebuild
	docker compose -p $(1) -f $(2)/docker-compose.yml down && \
	docker compose -p $(1) -f $(2)/docker-compose.yml rm -f && \
	docker compose -p $(1) -f $(2)/docker-compose.yml pull && \
	docker compose -p $(1) -f $(2)/docker-compose.yml build --no-cache && \
	docker compose -p $(1) -f $(2)/docker-compose.yml up -d
endef


init:
	docker network create --driver bridge reverse-proxy

portainer:
	docker volume create portainer_data
	$(call docker_rebuild, "portainer", "docker/portainer")

nginxpm:
	docker volume create nginxpm_data
	docker volume create nginxpm_letsencrypt
	$(call docker_rebuild, "nginxpm", "docker/nginxpm")

fe:
	$(call docker_rebuild, "fe", "docker/fe")

strapi:
	docker compose -p strapi -f services/strapi-cloud-template-blog-aecd06639e/docker-compose.yml down && \
	docker compose -p strapi -f services/strapi-cloud-template-blog-aecd06639e/docker-compose.yml rm -f && \
	docker compose -p strapi -f services/strapi-cloud-template-blog-aecd06639e/docker-compose.yml pull && \
	docker compose -p strapi -f services/strapi-cloud-template-blog-aecd06639e/docker-compose.yml build  --build-arg NODE_ENV=production --file Dockerfile.prod && \
	docker compose -p strapi -f services/strapi-cloud-template-blog-aecd06639e/docker-compose.yml up -d
