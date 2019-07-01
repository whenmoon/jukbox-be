import { VenueSong, UserVenue, User, Venue } from '../models';
import socketIO from 'socket.io';
import { nsp } from '../';
import { toCapitalCase } from '../services';

export const connectUserToVenue = async (userAccessToken: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const user = await User.authorize(userAccessToken);
    if (! user) throw Error('user not authorized');
    const userEmail = user.email;
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (! userAtCurrentVenue) {
      const { ticket_default_no } = await Venue.find(venueName);
      await UserVenue.create(userEmail, venueName, ticket_default_no);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    console.log(error);
  }
};

export const addSongToPlaylist = async (song: string, userAccessToken: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const user = await User.authorize(userAccessToken);
    if (! user) throw Error('user not authorized');
    const userEmail = user.email;
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      await VenueSong.create(song, userEmail, venueName);
      await UserVenue.decrementTickets(userEmail, venueName);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    console.log(error);
  }
};

export const updateSongDiamonds = async (song: string, userAccessToken: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const user = await User.authorize(userAccessToken);
    if (! user) throw Error('user not authorized');
    if (user.diamonds > 0) {
      await VenueSong.promote(song);
      const userEmail = user.email;
      await User.decrementDiamonds(userEmail);
    }
    await emitSortedPlaylist(venueName);
  } catch (error) {
    console.log(error);
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
