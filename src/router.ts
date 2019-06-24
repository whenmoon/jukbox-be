import express from 'express';
import passport from 'passport';
import './services/spotify';
import './services/token-strategy';
const router = express.Router();
const scope: string[] =['user-read-email', 'user-read-private'];

router
  .get('/login/admin', passport.authenticate('spotify', {scope}))
  .get('/login/admin/redirect', passport.authenticate('spotify',{session:false}), ()=> console.log('hello') )
  .get('/songs', passport.authenticate('token',{session:false}),(request:any,response:any) => console.log(request.body));

export default router;