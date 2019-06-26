const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { Spotify } = require('../config/credentials');
const { getRefreshToken } = require('./spotifyAPI')
const { Venue } = require('../models');

passport.use(new SpotifyStrategy({
    clientID: Spotify.client_id,
    clientSecret: Spotify.client_secret,
    callbackURL: Spotify.redirect_uri
  }, async (accessToken, _, __, profile, done) => {
    try {
      let newVenue = await Venue.find('Codeworks');
      if (!newVenue) {
        newVenue = await Venue.create({
          name: 'Codeworks',
          spotify_id: profile.id,
          token: accessToken,
          ticket_default_no: 1
        });
      } else {
        newVenue = await Venue.updateToken(newVenue.spotify_id, accessToken);
      }
      done(null, newVenue);
    } catch (e) {
      console.log(e);
    }
}));
