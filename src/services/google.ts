import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../config/credentials';
import { Token, User } from '../types';
import { postUser, findUser, updateUserToken } from '../models';

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await findUser(profile.emails[0].value);
      if (!user.rows[0]) {
        user = await postUser({
          email: profile.emails[0].value,
          token: accessToken,
          name: profile.displayName,
          diamonds: 0
        })
      } else {
        user = await updateUserToken(user.rows[0].email, accessToken);
      }
      done(null, user.rows[0]);
    } catch(e) {
      console.log(e);
    }
  })
);
