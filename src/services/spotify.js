const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { getRefreshToken } = require('./spotifyAPI')
const { Venue } = require('../models');

passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
  }, async (accessToken, refreshToken, expires_in, profile, done) => {
    try {
      let newVenue = await Venue.find('Codeworks');
      if (!newVenue) {
        newVenue = await Venue.create({
          name: 'Codeworks',
          spotify_id: profile.id,
          token: accessToken,
          ticket_default_no: 1,
          refresh: refreshToken,
        });
      } else {
        newVenue = await Venue.updateTokens(newVenue.spotify_id, accessToken, refreshToken);
      }
      done(null, newVenue);
    } catch (e) {
      console.log('spotify strategy', e);
    }
}));
