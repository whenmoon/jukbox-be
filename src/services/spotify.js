const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { postVenue, findVenue, updateVenueToken} = require('../models');

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  }, async (accessToken, _, __, profile, done) => {
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
