import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../.env/credentials';
import { Token } from '../types';
let tokens: Token = {access_token: ''};

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, (accessToken: string, refreshToken: string, profile: any, done) => {
    tokens.access_token = accessToken;
    done(null, profile.id);
  })
);

export default tokens ;
