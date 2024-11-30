# syntax=docker/dockerfile:1.4

# 1. For build React app
FROM node:lts AS development

# Set working directory
WORKDIR /app

# INSTALL PNPM
RUN npm install -g pnpm

# 
COPY package.json /app/package.json
COPY pnpm-lock.yaml /app/pnpm-lock.yaml

# Install dependencies
RUN pnpm install


COPY . /app

ENV CI=true
ENV PORT=3000

CMD [ "pnpm", "start" ]

FROM development AS build

# RUN npm run build
RUN pnpm run build


FROM development as dev-envs
RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)

COPY --from=gloursdocker/docker / /
CMD [ "pnpm", "start" ]

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

