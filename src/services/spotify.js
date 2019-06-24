const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
require('dotenv').config();
const rp = require('request-promise');
const { SpotifyClientID, SpotifyClientSecret, RedirectURI} = process.env;

const tokens = {
  accessToken: '',
  refreshToken: '',
}


passport.use(new SpotifyStrategy({
    clientID: SpotifyClientID,
    clientSecret: SpotifyClientSecret,
    callbackURL: RedirectURI
  },
  async (accessToken, refreshToken, expires_in, profile, done) => {
    tokens.accessToken = accessToken;
    tokens.refreshToken = refreshToken;
    // get refreshToken
    var options = {
      uri: 'https://api.github.com/user/repos',
      qs: {
          access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
      },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };

    done()
  }))




