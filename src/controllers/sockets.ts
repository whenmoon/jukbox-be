import { VenueSong } from '../models';
import socketIO from 'socket.io';
const PORT = 4000;

function toCapitalCase (namespace: string) {
  return namespace.slice(1, 2).toUpperCase() + namespace.slice(2);
};

export const addSongToPlaylist = async (spotifySong: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const postSong = await VenueSong.create(spotifySong, userEmail, toCapitalCase(socket.nsp.name));
    if (postSong !== undefined) {
      const result = await VenueSong.getAll(toCapitalCase(socket.nsp.name));
      result
        ? socket.broadcast.emit('updatedPlaylist', result)
        : console.log('could not get playlist');
    } else {
      console.log('no result from models');
    }
  } catch (error) {
    console.log(error);
  }
};


export const updateSongDiamonds = async (venueSong: VenueSong, socket: socketIO.Socket) => {
  try {
    const promoteSong = await VenueSong.promote(venueSong);
    if (promoteSong !== undefined) {
      const result = await VenueSong.getAll(toCapitalCase(socket.nsp.name));
      result
        ? socket.broadcast.emit('updatedPlaylist', result)
        : console.log('could not get playlist');
    } else {
      console.log('no result from models');
    }
  } catch (error) {
    console.log(error);
  }
};

