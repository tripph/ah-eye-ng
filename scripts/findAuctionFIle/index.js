const axios = require('axios');
const sleep = require('util').promisify(setTimeout);



exports.listenForNewAuctions = async (pubSubEvent, context) => {
  //fetch oauth token
  getToken().then((token) => {
    console.log(`token: ${token}`);
    getRealms(token).then((realms) => {
      console.log(`found ${realms.length} realms`);
      getAuctionUrls(realms, token).then(urls => {
        console.log(`found ${urls.length} urls`);
        callDownloadAuctionFile(urls).then(() => {}).catch((err) => console.error(err));
      }).catch(err => console.error(err));
    }).catch((err) => console.error(err));
  }).catch((err) => console.error(err));

  //get list of realms
  //submit calls to getAndCleanFile for each realm
};

exports.listenForNewAuctions().then(() => {}).catch((err) => console.error(err));
async function callDownloadAuctionFile(urls) {

  const cf = 'https://us-central1-ah-eye-242301.cloudfunctions.net/getAndCleanFile?url=';
  let requests = [];
  urls.forEach(u => console.log(cf+u));
  urls.forEach(u => requests.push(axios.get(cf+u)));
  await sleep(2000);
  console.log(`fetching auction data from ${0}-${1}`);
  for (let i = 0; i < requests.length; i += 1) {
    axios(requests[i]).then(u => {
      console.log(`loaded ${u.data.lines} lines of JSON`)
    }).catch(error => console.error(error));
    // const urls = await Promise.all(requests.slice(i, i + 1));zzz
    await sleep(40000);
  }
  // Promise.all(requests).then(() => console.log('Done!!!')).catch((err) => console.error(err));

}
async function getAuctionUrls(realms, token) {
  let requests = [];
  await sleep(2000);
  const baseurl = 'https://us.api.blizzard.com/wow/auction/data/';
  realms.forEach(realm => {
    requests.push(axios.get(baseurl + realm.slug + '?access_token=' + token, {headers: {'Accept': 'application/json'}}));
  });
  const auctionFileURLs = [];
  for (let i = 0; i < requests.length; i += 40) {
    const urls = await Promise.all(requests.slice(i, i + 40));
    console.log(`got urls from ${i}-${i+40}`);
    urls.forEach(u => auctionFileURLs.push(u.data.files[0].url));
    await sleep(2500);
  }
  return auctionFileURLs;
}
async function getToken() {
  const USERNAME = process.env.BLIZZ_API_KEY;
  const PASSWORD = process.env.BLIZZ_API_SECRET;

  const response = await axios.post('https://us.battle.net/oauth/token', "grant_type=client_credentials", {auth: {username: USERNAME, password: PASSWORD}, headers: {'Content-Type': 'application/x-www-form-urlencoded' }});
  return response.data.access_token;
}
async function getRealms(token) {
  const response = await axios.get('https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US&access_token=' + token);
  return response.data.realms;
}
