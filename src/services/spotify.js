const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { getRefreshToken } = require('./spotifyAPI')
const { postVenue } = require('../models')

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  }, async (accessToken, refreshToken, profile,_, done) => {
    try {
      console.log(accessToken)
      const newVenue  = await postVenue({
        name: 'Codeworks',
        token: accessToken,
        ticket_default_no: 1
      });
      done(null, newVenue);
    } catch (e) {
      console.log(e);
    }
}))
