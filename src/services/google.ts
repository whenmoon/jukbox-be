import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../config/credentials';
import User from '../models/User';

passport.use(
  new GoogleStrategy({
    callbackURL: <string> Google.redirect_uri,
    clientID: <string> Google.client_id,
    clientSecret: <string> Google.client_secret,
  }, async (accessToken: string, refreshToken: string, profile: any, done: any) => {
    try {
      let user = await User.find(profile.emails[0].value);
      if (!user) {
        user = await User.create({
          email: profile.emails[0].value,
          token: accessToken,
          name: profile.displayName,
          diamonds: 0
        });
      } else {
        user = await User.updateToken(user.email, accessToken);
      }
      done(null, user);
    } catch(e) {
      console.log(e);
    }
  })
);
