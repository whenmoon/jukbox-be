const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { authorizeUser, authorizeVenue } = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const test = await authorizeUser(token);
    if (test.rows[0]) done(null, test.rows[0]);
    else {
      const venue = await authorizeVenue(token);
      venue.rows[0] && done(null, venue.rows[0]);
      done(null, false);
    }
  })
);
