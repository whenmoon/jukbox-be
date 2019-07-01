import { VenueSong, UserVenue, User, Venue } from '../models';
import socketIO from 'socket.io';
import { nsp } from '../';
import { toCapitalCase } from '../services';

export const connectUserToVenue = async (userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (! userAtCurrentVenue) {
      const { ticket_default_no } = await Venue.find(venueName);
      await UserVenue.create(userEmail, venueName, ticket_default_no);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    socket.emit('message', error);
  }
};

export const addSongToPlaylist = async (song: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      await VenueSong.create(song, userEmail, venueName);
      await UserVenue.decrementTickets(userEmail, venueName);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    socket.emit('message', error);
  }
};

export const updateSongDiamonds = async (song: string, user: User, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    if (user.diamonds > 0) {
      await VenueSong.promote(song);
      await User.decrementDiamonds(user.email);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    socket.emit('message', error);
  }
};

const emitSortedPlaylist = async (venueName: string) => {
  const playlist = await VenueSong.getAll(venueName);
  const sortedPlaylist = VenueSong.sortPlaylist(playlist);
  const message = {
    route: 'updatedPlaylist',
    data: {
      updatedPlaylist: sortedPlaylist
    }
  };
  nsp.emit('message', message);
};
