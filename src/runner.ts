import util from 'util';
const exec = util.promisify(require('child_process').exec);
import { getItemIds, getCustomData } from './itemDetails';

async function run(url): Promise<any[]> {
    const items = await getItemNames(url);
    const itemIds = await getItemIds(items);
    const discordData = await getCustomData(itemIds);
    return discordData;
}

async function getItemNames(url) {
    const { stdout, stderr } = await exec(`./tesseract.sh ${url}`);
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    return results.filter(x => x !== '');
}

export {
    run
}