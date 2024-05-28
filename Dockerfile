FROM node:20.10.0-alpine as install
WORKDIR /src
RUN npm i -g pnpm@9.0.4
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM install as build
COPY . .
RUN pnpm build

FROM build as run

LABEL org.opencontainers.image.source=https://github.com/moby-it/gaming-grids

EXPOSE 3000
CMD exec node .output/server/index.mjs