import express from 'express';
import passport from 'passport';
const router = express.Router();
import { tokens } from './services/google';
import './services/spotify';
import './services/google';
import './services/token-strategy';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin } from './controllers/admin';
import { verifyToken, provideTokenToUser } from './services/helpers';
const scopeSpotify: string[] =['user-read-email', 'user-read-private'];
const scopeGoogle: string[] = ['profile', 'email'];

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
router.get('/login', passport.authenticate('spotify', {
  scope: scopeSpotify
}));

router.get('/login/admin/redirect', passport.authenticate('spotify',{
  session: false
}), redirectAdmin);

export default router;
