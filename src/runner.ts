import util from 'util';
const exec = util.promisify(require('child_process').exec);
import { getItemIds, getCustomData, Item } from './itemDetails';

async function run(url: string): Promise<Item[]> {
    const items = await getItemNames(url);
    const itemIds = await getItemIds(items);
    const discordData = await getCustomData(itemIds);
    return discordData;
}

async function getItemNames(url: string) {
    const { stdout, stderr } = await exec(`./tesseract.sh ${url}`);
    var results: string[] = stdout.substring(0, stdout.length - 2).split('\n');
    return results.filter(x => x !== '');
}

export {
    run
}