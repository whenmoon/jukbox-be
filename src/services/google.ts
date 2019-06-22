import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../.env/credentials';

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, (accessToken, refreshToken, profile, done) => {

  })
);
