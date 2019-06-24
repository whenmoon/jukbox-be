const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;

passport.use(
  new UniqueTokenStrategy((token, done) => {
    // find user in database and verify
    return done(null, {user: 'me', id: 1234});
  })
);
