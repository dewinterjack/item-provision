FROM alpine

# discord requires a high version of node for latest packages
RUN apk add nodejs=16.13.0-r0 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main

RUN apk add npm && npm install -g yarn
WORKDIR /app
COPY src src/
COPY package.json \
    yarn.lock \
    .
RUN yarn install --frozen-lockfile

CMD yarn start