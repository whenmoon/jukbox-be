import  express from 'express';
import passport from 'passport';
import './services/google';
const router = express.Router();
const scope: string[] = ['profile'];

// change to '/login/user'
router.get('/login', passport.authenticate('google', {
  scope
}));

router.get('/login/user/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/login');
});

export default router;
