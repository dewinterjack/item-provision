const util = require('util');
const exec = util.promisify(require('child_process').exec);
const itemDetails = require('./itemDetails');

async function run() {
    const items = await getItemNames();
    const itemIds = await itemDetails.getItemIds(items);
    console.log(itemIds);
}

async function getItemNames() {
    const { stdout, stderr } = await exec('docker run --rm -e "TESSDATA_PREFIX=/app" -v "$PWD/data":/app -w /app clearlinux/tesseract-ocr tesseract items.png stdout');
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    return results.filter(x => x !== '');
}

run();