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
    const playlist = await VenueSong.getAll(venueName);
    const sortedPlaylist = await VenueSong.sortPlaylist(playlist);
    nsp.emit('updatedPlaylist', sortedPlaylist);
  } catch (error) {
    console.log(error);
  }
};

export const addSongToPlaylist = async (song: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      await VenueSong.create(song, userEmail, venueName);
      await UserVenue.decrementTickets(userEmail, venueName);
      const playlist = await VenueSong.getAll(venueName);
      const sortedPlaylist = await VenueSong.sortPlaylist(playlist);
      nsp.emit('updatedPlaylist', sortedPlaylist);
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
      await VenueSong.promote(song);
      await User.decrementDiamonds(userEmail);
      const playlist = await VenueSong.getAll(venueName);
      const sortedPlaylist = await VenueSong.sortPlaylist(playlist);
      nsp.emit('updatedPlaylist', sortedPlaylist);
    } else {
      const result = await VenueSong.getAll(venueName);
      nsp.emit('updatedPlaylist', result);
    }
  } catch (error) {
    console.log(error);
  }
};

