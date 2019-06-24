import express from 'express';
import passport from 'passport';
const router = express.Router();
import tokens from './services/google';
import './services/spotify';
import './services/google';
import './services/token-strategy';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin } from './controllers/admin';
const scopeGoogle: string[] = ['profile', 'email'];
const scopeSpotify: string[] =['user-read-email', 'user-read-private'];

const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.split(' ')[1];
  next();
};

const provideTokenToUser = (req: any, res: any, next: any) => {
  // req.token = // get token from postgres and put it in request object
  next();
}
// /login/user/Codeworks
router.get('/login/user/Codeworks', passport.authenticate('google', {
  scope: scopeGoogle
}));

router.get('/login/user/redirect', passport.authenticate('google', {
  session: false
}), redirectUser);

router.get('/me', verifyToken, passport.authenticate('token', {
  session: false
}), getUserInfo);

// api-client needed for searching songs in spotify
router.get('/search', provideTokenToUser, searchForSongs);

// /login/admin
router.get('/login/admin', passport.authenticate('spotify', {
  scope: scopeSpotify
}));

router.get('/login/admin/redirect', passport.authenticate('spotify',{
  session: false
}), redirectAdmin);


export default router;
