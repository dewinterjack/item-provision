* Docker container with tesseract
* Volume with screenshot of items
* Return list of item names
* Get prices from universalis

Set the correct environment variables first.

`docker run --rm -e DISCORD_TOKEN=$DISCORD_TOKEN -e CLIENT_ID=$CLIENT_ID` dewinterjack/item-provision

To deploy new commands
`cd deploy && yarn deploy`