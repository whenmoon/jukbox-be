import express from 'express';
import passport from 'passport';
const router = express.Router();
import './services/spotify';
import './services/google';
import './services/token-strategy';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin } from './controllers/admin';
import { verifyToken, provideTokenToUser } from './services/helpers';
const scopeSpotify: string[] =['user-read-email', 'user-read-private'];
const scopeGoogle: string[] = ['profile', 'email'];

router.get('/login/login/Codeworks', passport.authenticate('google', {
  scope: scopeGoogle
}));

router.get('/login/user/redirect', passport.authenticate('google', {
  session: false
}), redirectUser);

router.get('/me', verifyToken, passport.authenticate('token', {
  session: false
}), getUserInfo);

router.get('/search', provideTokenToUser, searchForSongs);

router.get('/login/admin', passport.authenticate('spotify', {
  scope: scopeSpotify
}));

router.get('/login/admin/redirect', passport.authenticate('spotify',{
  session: false
}), redirectAdmin);

export default router;
