#!/bin/bash

curl $1 > data/items.png
docker run --rm -e "TESSDATA_PREFIX=/app" -v "$PWD/data":/app -w /app clearlinux/tesseract-ocr tesseract items.png stdout