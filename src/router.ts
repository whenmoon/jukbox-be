import express from 'express';
import passport from 'passport';
import { tokens } from './services/google';
import './services/google';
import './services/token-strategy';
import { redirectBack, getUserInfo, searchForSongs } from './controllers';
const router = express.Router();
const scope: string[] = ['profile', 'email'];

const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.split(' ')[1];
  next();
};

const provideTokenToUser = (req: any, res: any, next: any) => {
  // req.token = // get token from postgres and put it in request object
  next();
}
// /login/user/Codeworks
router.get('/login', passport.authenticate('google', {
  scope
}));

router.get('/login/user/redirect', passport.authenticate('google', {
  session: false
}), redirectBack);

router.get('/me', verifyToken, passport.authenticate('token', {
  session: false
}), getUserInfo);

// api-client needed for searching songs in spotify
router.get('/search', provideTokenToUser, searchForSongs);

export default router;
