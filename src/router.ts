import express from 'express';
import passport from 'passport';
const router = express.Router();
import './services/spotify';
import './services/google';
import './services/token-strategy';
import socketIO from 'socket.io';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin, setPlayResume, setVolume} from './controllers/admin';
import { extractToken, provideTokenToUser } from './services/helpers';
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

router.get('/playdevice/:deviceid', extractToken,passport.authenticate('token',{
  session: false 
 }), setPlayResume)

router.get('/playdevice/:deviceid/volume/:volumepercent', extractToken,passport.authenticate('token',{
  session: false 
 }),setVolume )

router.get('/next', extractToken, passport.authenticate('token',{
  session: false 
 }), )


export const socketRouter = (socket: socketIO.Socket) => {
  socket.on('addSong', (song:string, userEmail:string) => socketControllers.addSongToPlaylist(song, userEmail, socket));
  socket.on('updateSongDiamonds', (song:string, userEmail:string) => socketControllers.updateSongDiamonds(song, userEmail, socket));;
  socket.on('error', (err:string) => console.log(err));
};

export default router;