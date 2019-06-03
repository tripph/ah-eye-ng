const axios = require('axios');
getToken().then((token) => {
  getRealms(token).then((realms) => {
    getAuctionUrls(realms, token);
  }).catch((err) => console.error(err));
}).catch((err) => console.error(err));

exports.helloPubSub = async (pubSubEvent, context) => {
  //fetch oauth token


  //get list of realms
  //submit calls to getAndCleanFile for each realm
};
async function getAuctionUrls(realms, token) {
  let requests = [];
  const baseurl = 'https://us.api.blizzard.com/wow/auction/data/';
  realms.forEach(realm => {
    requests.push(axios.get(baseurl + realm.slug + '?access_token=' + token, {headers: {'Accept': 'application/json'}}));
  });
  for (let i = 0; i < requests.length; i += 25) {
    await Promise.all(requests.slice(i, i + 24)).then(urls => {
      urls.forEach(u => console.log(u.data.files[0].url));
      setTimeout(() => 750);
    }).catch(errs => {
      console.error(errs);
    })
  }
}
async function getToken() {
  const USERNAME = env.process.BLIZZAPIKEY;
  const PASSWORD = env.process.BLIZZAPISECRET;

  const response = await axios.post('https://us.battle.net/oauth/token', "grant_type=client_credentials", {auth: {username: USERNAME, password: PASSWORD}, headers: {'Content-Type': 'application/x-www-form-urlencoded' }});
  return response.data.access_token;
}
async function getRealms(token) {
  const response = await axios.get('https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US&access_token=' + token);
  return response.data.realms;
}
