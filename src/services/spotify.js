const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { getRefreshToken } = require('./spotifyAPI')
const { postVenue, findVenue, updateVenueToken, storeVenueToken } = require('../models');

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  }, async (accessToken, refreshToken, expires_in, profile, done) => {
    const test = await storeVenueToken(accessToken);
    try {
      let newVenue = await findVenue(profile.id);
      if (!newVenue.rows[0]) {
        newVenue = await postVenue({
          name: 'Codeworks',
          spotify_id: profile.id,
          token: accessToken,
          ticket_default_no: 1
        });
      } else {
        newVenue = await updateVenueToken(newVenue.rows[0].spotify_id, accessToken);
      }
      done(null, newVenue.rows[0]);
    } catch (e) {
      console.log(e);
    }
}));
