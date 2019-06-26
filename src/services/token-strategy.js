const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { Venue, User } = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const user = await User.authorize(token);
    if (user) done(null, user);
    else {
      const venue = await Venue.authorize(token);
      venue && done(null, venue);
      done(Error(), false);
    }
  })
);
