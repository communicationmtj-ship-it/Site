# Stage 1 : build du frontend CRA
FROM node:20-alpine AS builder
WORKDIR /app
COPY frontend/package.json ./
RUN corepack enable && corepack prepare yarn@1.22.22 --activate && yarn install
COPY frontend/ .
RUN yarn build

# Stage 2 : serve via nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx-site.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
