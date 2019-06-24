
const rp = require('request-promise');
const { SpotifyClientID, SpotifyClientSecret, RedirectURI} = process.env;
const btoa = require('btoa');

const getRefreshToken = async (refreshToken: string) => {
  const options = createOptions(refreshToken);
  return await rp.post(options);
}

const createOptions = (refreshToken: string) => ({
  url: 'https://accounts.spotify.com/api/token',
  form: {
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  },
  headers: {
    'Authorization': 'Basic ' + btoa(<string>SpotifyClientID + ':' + <string>SpotifyClientSecret)
  },
  json: true // Automatically parses the JSON string in the response
});

module.exports = {
  getRefreshToken
};




