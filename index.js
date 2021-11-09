const util = require('util');
const exec = util.promisify(require('child_process').exec);
const axios = require('axios');

async function run() {
    const items = await getItemNames();
    const itemIds = await getItemIds(items);
    console.log(itemIds);
}

async function getItemNames() {
    const { stdout, stderr } = await exec('docker run --rm -e "TESSDATA_PREFIX=/app" -v "$PWD/data":/app -w /app clearlinux/tesseract-ocr tesseract items.png stdout');
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    return results.filter(x => x !== '');
}

function getItemIds(items) {
    return Promise.all(items.map(getItemId)).then((results) => {
        const ids = results.map(result => result.data.Results[0].ID);
        return ids;
    })
}

function getItemId(item) {
    return axios.get(`https://xivapi.com/search?indexes=Item&string=${item}`);
}

run();