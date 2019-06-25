const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { user } = require('./google');
const { authorize } = require('../models');

passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const user = await authorize(token);
    if (user.rows[0]) done(null, user.rows[0]);
    else done(null, false);
  })
);
