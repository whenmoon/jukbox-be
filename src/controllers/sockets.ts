import { VenueSong, UserVenue, User } from '../models';
import socketIO from 'socket.io';
import { nsp } from '../';
import { toCapitalCase, sortPlaylist } from '../services';

export const addSongToPlaylist = async (song: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      const postSong = await VenueSong.create(song, userEmail, venueName);
      if (postSong !== undefined) {
        await UserVenue.decrementTickets(userEmail, venueName);
        const result = await VenueSong.getAll(venueName);
        const sortedResult = sortPlaylist(result);
        nsp.emit('updatedPlaylist', sortedResult);
      }
    } else {
      const result = await VenueSong.getAll(venueName);
      nsp.emit('updatedPlaylist', result);
    }
  } catch (error) {
    console.log(error);
  }
};


export const updateSongDiamonds = async (song: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const user = await User.find(userEmail);
    if (user.diamonds > 0) {
      const promoteSong = await VenueSong.promote(song);
      if (promoteSong !== undefined) {
        await User.decrementDiamonds(userEmail);
        const result = await VenueSong.getAll(venueName);
        const sortedResult = sortPlaylist(result);
        nsp.emit('updatedPlaylist', sortedResult);
      }
    } else {
      const result = await VenueSong.getAll(venueName);
      nsp.emit('updatedPlaylist', result);
    }
  } catch (error) {
    console.log(error);
  }
};
