import express from 'express';
import passport from 'passport';
const router = express.Router();
import './services/spotify';
import './services/google';
import './services/token-strategy';
import socketIO from 'socket.io';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin, setPlayResume, setVolume} from './controllers/admin';
import { extractToken, provideTokenToUser } from './services/authUtils';
import * as socketControllers from './controllers/sockets'
const scopeSpotify: string[] =['user-read-email', 'user-read-private'];
const scopeGoogle: string[] = ['profile', 'email'];

router.get('/login/user/Codeworks', passport.authenticate('google', {
  scope: scopeGoogle
}));

router.get('/login/user/redirect', passport.authenticate('google', {
  session: false
}), redirectUser);

router.get('/me', extractToken, passport.authenticate('token', {
  session: false
}), getUserInfo);

router.get('/search', extractToken, passport.authenticate('token', {
  session: false
}), provideTokenToUser, searchForSongs);

router.get('/login/admin', passport.authenticate('spotify', {
  scope: scopeSpotify
}));

router.get('/login/admin/redirect', passport.authenticate('spotify',{
  session: false
}), redirectAdmin);

router.get('/playdevice/:deviceid', extractToken, passport.authenticate('token',{
  session: false
 }), setPlayResume)

router.get('/playdevice/:deviceid/volume/:volumepercent', extractToken, passport.authenticate('token',{
  session: false
 }),setVolume )

router.get('/next', extractToken, passport.authenticate('token',{
  session: false
 }), )


export const socketRouter = (socket: socketIO.Socket) => {
  socket.on('message', message => {
    if (message) {
      const { route, data } = message;
      switch(route) {
        case 'connectUserToVenue':
          socketControllers.connectUserToVenue(data.userEmail, socket);
          break;
        case 'addSong':
          socketControllers.addSongToPlaylist(data.song, data.userEmail, socket);
          break;
        case 'updateSongDiamonds':
          socketControllers.updateSongDiamonds(data.song, data.userEmail, socket);
      }
    }
  });
  socket.on('error', error => console.log(error));
};

export default router;
