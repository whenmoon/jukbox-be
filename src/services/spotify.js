const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const {postVenue} = require('../models')

require('dotenv').config()

passport.use(new SpotifyStrategy({
    clientID: process.env.SpotifyClientID,
    clientSecret: process.env.SpotifyClientSecret,
    callbackURL: process.env.SpotifyRedirectURI
  },
  // we may want to include refresh Token and profile
  async (accessToken, refreshToken, profile,_, done) => {
    try {
      console.log(accessToken)
      const newVenue  = await postVenue(
        { name: 'Codeworks',
        token: accessToken,
        ticket_default_no: 1
        })
      // Jozef was rather frustrated when he wrote this
      done(null, {fuck: 'fuck',id: 123});
    } catch (e) {
      console.log(e);
    }
      
  }))


