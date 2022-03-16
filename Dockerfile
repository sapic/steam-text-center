FROM node:16 as build

WORKDIR /usr/src/app
COPY package.json yarn.lock ./

RUN yarn set version berry && yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM nginx

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/
