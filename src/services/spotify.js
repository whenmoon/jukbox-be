const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
<<<<<<< HEAD
const { Venue } = require('../models');
require('dotenv').config()
const saveSpotifyToken = async (accessToken, _, __, profile, done) => {
  try {
    console.log(accessToken)
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

}

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: process.env.SPOTIFY_REDIRECT_URI
}, saveSpotifyToken));

=======
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
>>>>>>> 2f5c50426f28119f5c0b98a9c52dc44aeaac742a
