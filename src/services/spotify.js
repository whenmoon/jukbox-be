const SpotifyStrategy = require('passport-spotify').Strategy;
const UniqueTokenStrategy =  require('passport-unique-token').Strategy
const passport = require('passport');
const { getRefreshToken } = require('./spotifyAPI')
require('dotenv').config()

passport.use(new SpotifyStrategy({
    clientID: process.env.SpotifyClientID,
    clientSecret: process.env.SpotifyClientSecret,
    callbackURL: process.env.SpotifyRedirectURI
  },
  async (accessToken, refreshToken, profile, _, done) => {
    try {
      // save access token and refresh token in db
      console.log(_);
    } catch (e) {
      console.log(e);
    }
    // Jozef was rather frustrated when he wrote this
    done(null, {
      fuck: 'fuck',
      id: 123
    });
  }))
