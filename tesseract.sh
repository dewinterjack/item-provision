#!/bin/sh
curl "$1" > data/items.png
tesseract data/items.png stdout