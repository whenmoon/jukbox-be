import * as models from '../models';
import { PlaylistItem } from '../types';
import socketIO from 'socket.io';

export const addSongToPlaylist = async (data: PlaylistItem, socket: socketIO.Socket) => {
  try {
    const postSong: any = await models.postSong(data);
    if (postSong === data) {
      const result = await models.getPlaylist();
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