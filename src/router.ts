import express from 'express';
import passport from 'passport';
import './services/spotify';

const router = express.Router();

router.get('/spotify/login', passport.authenticate('spotify'), ()=> {
  // ctrl
  // services
  console.log('hello world')
})

router.get( '/spotify/login/callback', passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);




export default router