import express from 'express';
import passport from 'passport';
const router = express.Router();
import './services/spotify';
import './services/google';
import './services/token-strategy';
import socketIO from 'socket.io';
import { redirectUser, getUserInfo, searchForSongs, chargeCustomer, onPayment } from './controllers/user';
import { redirectAdmin, setResume, setPlay, setPause,setVolume,lockNextSong, setTransferPlayback} from './controllers/admin';
import bodyParser from 'body-parser';
import { extractToken, provideTokenToUser } from './services/authUtils';
import * as socketControllers from './controllers/sockets'
import { User } from './models';
const scopeSpotify: string[] =['user-top-read','user-read-recently-played','user-read-currently-playing','user-library-read','user-library-modify','streaming', 'app-remote-control','user-read-email', 'user-read-private', 'user-read-birthdate','user-follow-modify','user-follow-read','user-modify-playback-state','playlist-modify-public','playlist-read-collaborative','playlist-read-private','playlist-modify-private','user-read-playback-state'];
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

router.get('/login/admin/redirect', passport.authenticate('spotify', {
  session: false
}), redirectAdmin);

router.get('/playdevice/:deviceid', extractToken, passport.authenticate('token', {
  session: false
}), setPlay);

router.get('/resumedevice/:deviceid', extractToken, passport.authenticate('token', {
  session: false
}), setResume);

router.get('/pausedevice/:deviceid', extractToken, passport.authenticate('token', {
  session: false
}), setPause);

router.get('/playdevice/:deviceid/volume/:volumepercent', extractToken, passport.authenticate('token', {
  session: false
}), setVolume);

router.get('/next', extractToken, passport.authenticate('token', {
  session: false
}), lockNextSong);

router.get('/transferplayback/:deviceid',  extractToken, passport.authenticate('token', {
  session: false
}), setTransferPlayback);

router.post('/charge', extractToken, passport.authenticate('token', {
  session: false
}), chargeCustomer);

router.post('/webhook', bodyParser.raw({type: 'application/json'}), onPayment);

export const socketRouter = (socket: socketIO.Socket) => {
  socket.on('message', async message => {
    try {
      if (message && message.route && message.data) {
        const { route, data } = message;
        const user = await User.authorize(data.userAccessToken);

        if (user) {
          switch(route) {
            case 'connectUserToVenue':
              socketControllers.connectUserToVenue(user.email, socket);
              break;
            case 'addSong':
              socketControllers.addSongToPlaylist(data.songId, user.email, socket);
              break;
            case 'updateSongDiamonds':
              socketControllers.updateSongDiamonds(data.songId, user, socket);
          }
        } else socket.emit('error', 'Invalid access token') && socket.disconnect();

      }
    } catch (error) {
      socket.emit('error', error);
    }
  });
  socket.on('error', error => console.log('socket', error));
};

export default router;
