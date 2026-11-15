# Stage 1 : build du frontend CRA
FROM node:20-alpine AS builder
ARG REACT_APP_BACKEND_URL=""
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
# Pas de carte du code source (.map) dans le site public
ENV GENERATE_SOURCEMAP=false
WORKDIR /app
COPY frontend/package.json ./
RUN corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install
COPY frontend/ .
# « yarn build » enchaîne : plan du site (prebuild, scripts/generate-public-files.js), construction
# (craco build), puis pré-rendu des pages publiques (postbuild, scripts/prerender.js ; choix de Théo
# du 13/11/2026, « pré-rendu Google »). Une page qui ne se pré-rend pas arrête la construction :
# l'image en ligne n'est pas remplacée.
RUN yarn build
# Garde : le pré-rendu a bien tourné (son rapport existe) et aucune carte de code n'est publiée.
RUN test -s build/prerendu/rapport.json && test -s build/prerendu/index.html \
    && test -z "$(find build -name '*.map')"

# Stage 2 : serve via nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
# Garde : un réglage nginx illisible arrête la construction (l'ancien conteneur reste en ligne)
# au lieu de lancer un conteneur qui ne démarre pas.
RUN nginx -t
EXPOSE 80
