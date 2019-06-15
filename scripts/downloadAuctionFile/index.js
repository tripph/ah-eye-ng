  const fs = require('fs');
const axios = require('axios');
//entrypoint
exports.getAndCleanFile = (req, res) => {
  //todo: sanitize input queryparams
  downloadFile(req.query.url).then(async () => {
    const rows = await cleanup();
    importIntoBQ();
    res.json(rows);
  }).catch((err) => {
    console.error(err);
  });


};


async function importIntoBQ() {
  const {BigQuery} = require('@google-cloud/bigquery');
  const bq = new BigQuery({projectId:'ah-eye-242301'});
  const metadata = {
    sourceFormat: 'NEWLINE_DELIMITED_JSON',
    autodetect: true
  };
  const [job] = await bq
    .dataset('auctions')
    .table('auctionsnow_20190607')
    .load('/tmp/auctions_newly_fixed.json', metadata);
  console.log(`Job ${job.id} completed.`);

  // Check the job's status for errors
  const errors = job.status.errors;
  if (errors && errors.length > 0) {
    throw errors;
  }
}

async function downloadFile(url) {
  const file = fs.createWriteStream('/tmp/auction-data.json');
  const response = await axios({url, method: 'GET', responseType: 'stream'});
  response.data.pipe(file);
  return new Promise((resolve, reject) => {
    file.on('finish', resolve);
    file.on('error', reject);
  })

}

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

  return {"lines": lines.length};
}
