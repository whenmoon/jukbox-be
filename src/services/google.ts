import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../config/credentials';
import { Token, User } from '../types';
import { postUser, findUser } from '../models';
let tokens: Token = {access_token: ''};

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    tokens.access_token = accessToken;
    const user: any = await findUser(profile.emails[0].value);
  })
);

export { tokens };
