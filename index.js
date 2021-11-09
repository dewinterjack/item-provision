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
    return Promise.all(items.map(getItemId)).then((searchResults) => {
        const ids = searchResults.map(result => getFirstItemId(result.data.Results));
        return ids;
    }, (reason) => {
        throw `Failed to retrieve item from XIV API: ${reason}`
    })
}

function getFirstItemId(results) {
    if(results.length === 0)
    {
        throw "No results found from XIV API";
    }
    if(results.length > 1) {
        console.log(`More than one result found, using first result: ${results[0].Name}`);
    }

    return results[0].ID;
}

function getItemId(item) {
    return axios.get(`https://xivapi.com/search?indexes=Item&string=${item}`);
}

run();