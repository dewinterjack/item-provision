FROM alpine

RUN mkdir -p /usr/share/tessdata
ADD https://github.com/tesseract-ocr/tessdata/raw/main/eng.traineddata /usr/share/tessdata/eng.traineddata

RUN apk update  && apk add --no-cache tesseract-ocr

# discord requires a high version of node for latest packages
RUN apk add nodejs=16.13.0-r0 --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main
RUN apk add curl npm && npm install -g yarn
WORKDIR /app

COPY src src/
COPY tesseract.sh .

COPY package.json \
     yarn.lock \
     .

RUN yarn install --frozen-lockfile

CMD yarn start