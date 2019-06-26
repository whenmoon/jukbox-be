import { VenueSong } from '../models';
import socketIO from 'socket.io';


function findNameSpace (url: string) {
  const regex = /http:\/\/.*\/(.*)/gi;
  const result = regex.exec(url);
  return result ? result[1] : '/';
};

export const addSongToPlaylist = async (spotifySong: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const postSong = await VenueSong.create(spotifySong, userEmail, findNameSpace(String(socket.nsp)));
    if (postSong !== undefined) {
      const result = await VenueSong.getAll(socket.nsp);
      result
        ? socket.broadcast.emit('updatedPlaylist', result)
        : console.log('could not get playlist');
    } else {
      console.log('no result from models');
    }
  } catch (error) {
    console.log(error.detail);
  }
};


export const updateSongDiamonds = async (venueSong: VenueSong, socket: socketIO.Socket) => {
  try {
    const promoteSong: any = await VenueSong.promote(venueSong);
    console.log(promoteSong);
    if (promoteSong !== undefined) {
      const result = await VenueSong.getAll(socket.nsp);
      result
        ? socket.broadcast.emit('updatedPlaylist', result)
        : console.log('could not get playlist');
    } else {
      console.log('no result from models');
    }
  } catch (error) {
    console.log(error.detail);
  }
};

