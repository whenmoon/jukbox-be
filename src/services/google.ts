import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserType, Token } from '../types';
let tokens: Token = {access_token: ''};
require('dotenv').config()


passport.use(
  new GoogleStrategy({
    callbackURL: <string> process.env.GoogleRedirectURI,
    clientID: <string> process.env.GoogleClientID,
    clientSecret: <string> process.env.GoogleClientSecret,
  }, (accessToken: string, _: string, profile: any, done: any) => {
    tokens.access_token = accessToken;
    done(null, profile.id);
  })
);

export { tokens };
