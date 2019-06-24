const SpotifyStrategy = require('passport-spotify').Strategy;
const UniqueTokenStrategy =  require('passport-unique-token').Strategy
const passport = require('passport');
require('dotenv').config();
const spotifyAPI = require('./spotifyAPI')
const {
  SpotifyClientID,
  SpotifyClientSecret,
  RedirectURI
} = process.env;

passport.use(new SpotifyStrategy({
    clientID: SpotifyClientID,
    clientSecret: SpotifyClientSecret,
    callbackURL: RedirectURI
  },
  async (_, refreshToken, __, ___, done) => {
    try {
      const result = await spotifyAPI.getRefreshToken(refreshToken)
      console.log(result)
    } catch (e) {
      console.log(e);
    }
    done();
  }))






