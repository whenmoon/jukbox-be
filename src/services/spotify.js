const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { getRefreshToken } = require('./spotifyAPI')
const { postVenue, findVenue, updateVenueToken, storeVenueToken } = require('../models');
let newVenue;

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  }, async (accessToken, refreshToken, expires_in, profile, done) => {
    const test = await storeVenueToken(accessToken);
    try {
      newVenue = await findVenue(profile.id);
      newVenue = newVenue.rows[0];
      if (!newVenue) {
        newVenue = await postVenue({
          name: 'Codeworks',
          spotify_id: profile.id,
          token: accessToken,
          ticket_default_no: 1
        });
        newVenue = newVenue.rows[0];
      } else {
        newVenue = await updateVenueToken(newVenue.spotify_id, accessToken);
        newVenue = newVenue.rows[0];
      }
      done(null, newVenue);
    } catch (e) {
      console.log(e);
    }
}));
