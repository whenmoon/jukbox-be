import  express from 'express';
import passport from 'passport';
import tokens from './services/google';
import './services/google';
import * as controllers from './controllers';
const router = express.Router();
const scope: string[] = ['profile', 'email'];

// change to '/login/user'
router.get('/login', passport.authenticate('google', {
  scope
}));

router.get('/login/user/redirect', passport.authenticate('google'), (req, res) => {
  
  res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`);
});

export default router;
