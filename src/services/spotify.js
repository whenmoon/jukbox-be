const SpotifyStrategy = require('passport-spotify').Strategy;
const UniqueTokenStrategy =  require('passport-unique-token').Strategy
const passport = require('passport');
const { Spotify } = require('../.env/credentials');
const { getRefreshToken } = require('./spotifyAPI')

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  },
  async (_, refreshToken, profile, __, done) => {
    try {
      // const result = await getRefreshToken(refreshToken);
      // save access token in db
      console.log(_);
      console.log(result);

    } catch (e) {
      console.log(e);
    }
    done(null, {
      fuck: 'fuck',
      id: 123
    });
  }))
