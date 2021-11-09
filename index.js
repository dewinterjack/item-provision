const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run() {
    const { stdout, stderr } = await exec('docker run --rm -e "TESSDATA_PREFIX=/app" -v "$PWD/data":/app -w /app clearlinux/tesseract-ocr tesseract items.png stdout');
    var results = stdout.substring(0, stdout.length - 2).split('\n');
    var items = results.filter(x => x !== '');
    console.log(items);
}

run();