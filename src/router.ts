import express from 'express';
import passport from 'passport';
const router = express.Router();
import './services/spotify';
import './services/google';
import './services/token-strategy';
import socketIO from 'socket.io';
import { redirectUser, getUserInfo, searchForSongs } from './controllers/user';
import { redirectAdmin, setPlayResume, setVolume,lockNextSong, setTransferPlayback} from './controllers/admin';
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
}), setPlayResume);

router.get('/playdevice/:deviceid/volume/:volumepercent', extractToken, passport.authenticate('token', {
  session: false
}), setVolume);

router.get('/next', extractToken, passport.authenticate('token', {
  session: false
}), lockNextSong);

router.get('/transferplayback/:deviceid', extractToken, passport.authenticate('token', {
  session: false
}), setTransferPlayback)

export const socketRouter = (socket: socketIO.Socket) => {
  socket.on('message', async message => {
    if (message && message.route && message.data) {
      const { route, data } = message;
      const user = await User.authorize(data.userAccessToken);

      if (user) {
        switch(route) {
          case 'connectUserToVenue':
            socketControllers.connectUserToVenue(user.email, socket);
            break;
          case 'addSong':
            socketControllers.addSongToPlaylist(data.song, user.email, socket);
            break;
          case 'updateSongDiamonds':
            socketControllers.updateSongDiamonds(data.song, user, socket);
        }
      } else socket.disconnect();

    }
  });
  socket.on('error', error => socket.emit('message', error));
};

export default router;
