import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../config/credentials';
import { Token, User } from '../types';
import { postUser, findUser, updateToken } from '../models';
let user: any;

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    user = await findUser(profile.emails[0].value);
    if (!user.rows.length) {
      user = {
        email: profile.emails[0].value,
        token: accessToken,
        name: profile.displayName,
        diamonds: 0
      }
      await postUser(user);
    } else {
      user = user.rows[0];
      user.token = accessToken;
      await updateToken(user.email, accessToken);
    }
    done(null, user);
  })
);

export { user };
