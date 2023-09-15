FROM node:16.15.0-alpine3.15 AS BUILD_IMAGE

RUN apk add --no-cache git bash curl --virtual .builds-deps build-base python3

# RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package.json yarn.lock ./


# install dependencies
RUN yarn install --frozen-lockfile

COPY . .

# build application
RUN yarn run build

# remove development dependencies
RUN npm prune --production

# # run node prune
# RUN /usr/local/bin/node-prune

FROM node:16.15.0-alpine3.15

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/favicon.png ./favicon.png
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD [ "node", "dist" ]