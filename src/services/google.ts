import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../config/credentials';
import { Token, User } from '../types';
import { postUser, findUser, updateUserToken } from '../models';
let user: any;

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      user = await findUser(profile.emails[0].value);
      user = user.rows[0];
      if (!user) {
        user = await postUser({
          email: profile.emails[0].value,
          token: accessToken,
          name: profile.displayName,
          diamonds: 0
        })
        user = user.rows[0];
      } else {
        user = await updateUserToken(user.email, accessToken);
        user = user.rows[0];
      }
      done(null, user);
    } catch(e) {
      console.log(e);
    }
  })
);

export { user };
