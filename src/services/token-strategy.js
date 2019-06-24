const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { user } = require('./google');
const { findUser } = require('../models');


// this part is used to create user session with access token
passport.use(
  new UniqueTokenStrategy(async (token, done) => {
    const user = await findUser(token);
    if (user.rows[0]) done(null, user.rows[0]);
    else done(null, false);

  })
);
