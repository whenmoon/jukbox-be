const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { User} = require('../models');
const {Venue} = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const user = await User.authorize(token);
    if (user) done(null, user);
    else {
      const venue = await Venue.authorize(token);
      if (venue) done(null, venue);
      else done(Error(), false);
    }
  })
);
