const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { User} = require('../models');
const {Venue} = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    token = (token.slice(-1) === '#') ? token.slice(0, -1) : token;
    const user = await User.authorize(token);
    if (user) done(null, user);
    else {
      const venue = await Venue.authorize(token);
      if(venue) {
        done(null, venue);
      } else {
        done({ message: ' not found'}, false);
      }
    }
  })
);
