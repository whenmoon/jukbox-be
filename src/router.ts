import  express from 'express';
import passport from 'passport';
import { tokens } from './services/google';
import './services/google';
import './services/token-strategy';
import { redirectBack, getUserInfo } from './controllers';
const router = express.Router();
const scope: string[] = ['profile', 'email'];

const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.split(' ')[1];
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

export default router;
