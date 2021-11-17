* Docker container with tesseract
* Volume with screenshot of items
* Return list of item names
* Get prices from universalis

Set the correct environment variables first.

`docker run --rm dewinterjack/item-provision -e DISCORD_TOKEN=$DISCORD_TOKEN -e CLIENT_ID=$CLIENT_ID`
