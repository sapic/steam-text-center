FROM node:24-alpine AS build

WORKDIR /usr/src/app

RUN npm install -g pnpm@12.16.1

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable-alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/
