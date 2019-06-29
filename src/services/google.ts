import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
require('dotenv').config()
export const saveGoogleToken = async (accessToken: string, _: string, profile: any, done: any) => {
  try {
    let user = await User.find(profile.emails[0].value);
    if (!user) {
      user = await User.create({
        email: profile.emails[0].value,
        token: accessToken,
        name: profile.displayName,
        diamonds: 0
      });
      console.log(user);
    } else {
      user = await User.updateToken(user.email, accessToken);
    }
    done(null, user);
  } catch (e) {
    console.log(e);
  }
}

passport.use(
  new GoogleStrategy({
    callbackURL: <string>process.env.GOOGLE_REDIRECT_URI,
    clientID: <string>process.env.GOOGLE_CLIENT_ID,
    clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
  }, saveGoogleToken)
);
