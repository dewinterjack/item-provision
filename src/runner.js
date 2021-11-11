const util = require('util');
const exec = util.promisify(require('child_process').exec);
const itemDetails = require('./itemDetails');

async function run(url) {
    const items = await getItemNames(url);
    const itemIds = await itemDetails.getItemIds(items);
    const discordData = await itemDetails.getCustomData(itemIds);
    return discordData;
}

async function getItemNames(url) {
    const { stdout, stderr } = await exec(`./tesseract.sh ${url}`);
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    return results.filter(x => x !== '');
}

module.exports = {
    run
}