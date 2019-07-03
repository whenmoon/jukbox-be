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
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(userEmail, venueName, socket);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const addSongToPlaylist = async (songId: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      await VenueSong.create(songId, userEmail, venueName);
      await UserVenue.decrementTickets(userEmail, venueName);
    }
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(userEmail, venueName, socket);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const updateSongDiamonds = async (songId: string, user: User, socket: socketIO.Socket) => {
  try {
    const userEmail = user.email;
    const venueName = toCapitalCase(socket.nsp.name);
    if (user.diamonds > 0) {
      await VenueSong.promote(songId);
      await User.decrementDiamonds(userEmail);
    }
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(userEmail, venueName, socket);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const emitPlaylist = async (userEmail: string, venueName: string, socket: any) => {
  try {
    const playlist = await VenueSong.getAll(venueName);
    const sortedPlaylist = VenueSong.sortPlaylist(playlist);
    const message = {
      data: {
        updatedPlaylist: sortedPlaylist
      }
    };
    nsp.emit('message', message);
  }
  catch (error) {
    socket.emit('error', error);
  }
}

const emitTickets = async (userEmail: string, venueName: string, socket: socketIO.Socket) => {
  try {
    const { tickets } = await UserVenue.find(userEmail, venueName);
    const message = {
      data: {
        tickets: tickets
      }
    };
    socket.emit('message', message);
  }
  catch (error) {
    socket.emit('error', error);
  }
}