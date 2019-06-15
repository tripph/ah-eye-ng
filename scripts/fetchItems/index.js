const axios = require('axios');
const sleep = require('util').promisify(setTimeout);
const fs = require('fs');
main().then(() =>{});
async function main() {
  const baseURL = 'https://us.api.blizzard.com/wow/item/';
  getToken().then(async token => {
    console.log(`token: ${token}`);
    for (let i = 0; i < 250000; i++) {
      await sleep(300);
      axios.get(baseURL + i + '?locale=en_US&access_token=' + token).then(resp => {
        // console.log(resp);
        if (resp.status === 200) {
          // console.log(resp.data);
          fs.appendFile('items.json', JSON.stringify(resp.data)+'\n', 'utf8',function(err) {
            if(err) throw err;
            console.log(`saved item ${resp.data.id}`);
          })
        }
        if (resp.status === 404) {
          console.log(`item ${i} not found`)
        }
      }).catch((err) => {
        if(err.response.status == 404) {
          // console.log('item not found');
        }
        if(err.response.status == 500) {
          console.log('over quota!!');
        }
      });
    }
  });
}
async function getToken() {
  const USERNAME = process.env.BLIZZ_API_KEY;
  const PASSWORD = process.env.BLIZZ_API_SECRET;

  const response = await axios.post('https://us.battle.net/oauth/token', "grant_type=client_credentials", {auth: {username: USERNAME, password: PASSWORD}, headers: {'Content-Type': 'application/x-www-form-urlencoded' }});
  return response.data.access_token;
}
