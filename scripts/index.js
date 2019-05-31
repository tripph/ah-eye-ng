const fs = require('fs');
const axios = require('axios');

exports.getAndCleanFile = (req, res) => {
    downloadFile(req.query.url).then(() => {
        res.json(cleanup());
    }).catch((err) => {
        console.error(err);
    });



};


async function downloadFile(url) {
    const file = fs.createWriteStream('/tmp/auction-data.json');
    const response = await axios({url, method: 'GET', responseType: 'stream'});
    response.data.pipe(file);
    return new Promise((resolve, reject) => {
        file.on('finish', resolve);
        file.on('error', reject);
    })

}
/*
    TODO: write function to import the cleaned up file into a bigquery table
 */

function cleanup() {
    let fileData = fs.readFileSync('/tmp/auction-data.json', 'utf8');
    fs.unlinkSync('/tmp/auction-data.json');
    let lines = fileData.split('\n');
    // remove lines up to and including the line with "auctions": [
    let auctionsStringIndex = 0;
    for (; !lines[auctionsStringIndex].includes("auctions"); auctionsStringIndex++) {
    }
    console.log('auctions string index found at: ' + auctionsStringIndex);
    //remove the last line
    lines = lines.slice(auctionsStringIndex + 1, lines.length - 1);
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].substr(0, lines[i].length - 2);
    }
    let output = lines.join('\n');

    output = output.replace(/\t/g, '');
    fs.writeFileSync('/tmp/auctions_newly_fixed.json', output);

    return {"lines":lines.length};
}
