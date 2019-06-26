const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { authorizeUser, authorizeVenue } = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const user = await authorizeUser(token);
    if (user.rows[0]) done(null, user.rows[0]);
    else {
      const venue = await authorizeVenue(token);
      venue.rows[0] && done(null, venue.rows[0]);
      done(null, false);
    }
  })
);
