import express from 'express';
import passport from 'passport';
const router = express.Router();
import socketIO from 'socket.io';
import './services/spotify';
import './services/google';
import './services/token-strategy';
import * as socketControllers from './controllers/sockets';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin, setPlayResume} from './controllers/admin';
import { verifyToken, provideTokenToUser } from './services/helpers';
const scopeSpotify: string[] =['user-read-email', 'user-read-private'];
const scopeGoogle: string[] = ['profile', 'email'];

// /login/login/Codeworks
router.get('/login', passport.authenticate('google', {
  scope: scopeGoogle
}));

router.get('/login/user/redirect', passport.authenticate('google', {
  session: false
}), redirectUser);

router.get('/me', verifyToken, passport.authenticate('token', {
  session: false
}), getUserInfo);

router.get('/search', verifyToken, passport.authenticate('token', {
  session: false
}), provideTokenToUser, searchForSongs);

router.get('/login/admin', passport.authenticate('spotify', {
  scope: scopeSpotify
}));

router.get('/login/admin/redirect', passport.authenticate('spotify',{
  session: false
}), redirectAdmin);

router.get('/playdevice/:deviceid/', verifyToken , passport.authenticate('token',{
 session: false 
}), setPlayResume)

// router.get('/playdevice/:deviceid/volume/:volumepercent',passport.authenticate('token',{
//   session: false 
//  }), )

export default router;

export const socketRouter = (socket: socketIO.Socket) => {
  socket.on('addSong', (spotifySong, userEmail) => socketControllers.addSongToPlaylist(spotifySong, userEmail, socket));
  socket.on('updateSongDiamonds', venueSong => socketControllers.updateSongDiamonds(venueSong, socket));;
  socket.on('error', (err) => console.log(err));
};
