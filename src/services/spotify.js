const SpotifyStrategy = require('passport-spotify').Strategy;
const UniqueTokenStrategy =  require('passport-unique-token').Strategy
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { getRefreshToken } = require('./spotifyAPI')

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  },
  async (_, refreshToken, profile, __, done) => {
    try {
      // save access token in db
      console.log( 'HERE -----------–> ', _);

    } catch (e) {
      console.log(e);
    }
    done(null, {
      fuck: 'fuck',
      id: 123
    });
  }))
