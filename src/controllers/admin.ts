import {transferPlayerPlayback, setPlayerToPlay, setPlayerVolume } from '../services/spotifyAPI';
import { VenueSong, Venue, UserVenue} from '../models';
import { setResponse, emitPlaylist } from './helpers';

export const redirectAdmin = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${venue.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlay = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    const songToPlay = await VenueSong.selectSongToPlay(venue.name);
    const { token, request } = await setPlayerToPlay(venue, songToPlay);
    await emitPlaylist(venue.name);
    return setResponse(res, token);
  } catch (e) {
    console.log('SET PLAY', e);
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    const { token, request } =  await setPlayerVolume(venue, req.params.volumepercent);
    return setResponse(res, token);
  } catch(e) {
    console.log('SET VOLUME', e);
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};


export const lockNextSong = async( req: any, res:any) => {
  try {
    const venue: Venue = req.user;
    await VenueSong.removeCurrentlyPlayingSong(venue.name)
    await VenueSong.lockInAndPlayNextSong(venue.name);
    res.status(204).send();
  } catch(e) {
    console.log('LOCK NEXT SONG' ,e);
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setTransferPlayback = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    const { token, request }  = await transferPlayerPlayback(venue, req.params.deviceid);
    return setResponse(res, token);
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  };
}
