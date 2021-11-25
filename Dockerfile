FROM node:16.13.0-alpine

WORKDIR /app
COPY . .

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:16.13.0-alpine

WORKDIR /app

RUN mkdir -p /usr/share/tessdata
ADD https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata /usr/share/tessdata/eng.traineddata

RUN apk update && apk add --no-cache tesseract-ocr curl

COPY tesseract.sh .
RUN mkdir data

RUN npm install pm2 -g

COPY --from=0 /app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

CMD pm2-runtime dist/index.js