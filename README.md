* Docker container with tesseract
* Volume with screenshot of items
* Return list of item names
* Get prices from universalis

Set the correct environment variables first.
`docker build . -t item-provision`
`docker run --rm item-provision -e DISCORD_TOKEN=$DISCORD_TOKEN`