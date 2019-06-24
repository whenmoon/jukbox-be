import express from 'express';
import passport from 'passport';
import './services/spotify';
const router = express.Router();
const scope: string[] =['user-read-email', 'user-read-private'];

router
  .get('/login/admin', passport.authenticate('spotify', {scope}))
  .get('/login/admin/redirect', passport.authenticate('spotify', {}), () =>console.log('hello'));
  


export default router;