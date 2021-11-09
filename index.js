const util = require('util');
const exec = util.promisify(require('child_process').exec);
const request = require('request');

async function run() {
    const { stdout, stderr } = await exec('docker run --rm -e "TESSDATA_PREFIX=/app" -v "$PWD/data":/app -w /app clearlinux/tesseract-ocr tesseract items.png stdout');
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    var items = results.filter(x => x !== '');
    getItemId(items[0]);
    console.log(items);
}

async function getItemId(item) {
    request(`https://xivapi.com/search?indexes=Item&string=${item}`, { json: true}, (err, res, body) => {
        if (err) { throw err; }
        console.log(body.Results[0].ID);
    });
}

run();