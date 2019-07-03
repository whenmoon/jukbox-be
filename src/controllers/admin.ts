import {transferPlayerPlayback, setPlayerToPlay, setPlayerToPause, setPlayerToResume, setPlayerVolume, renewAccessToken } from '../services/spotifyAPI';
import { VenueSong, Venue, UserVenue} from '../models';
import { setResponse } from './helpers';



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
    return setResponse(res, token);
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setResume = async(req: any, res:any ) => {
  try {
    const venue: Venue = req.user;
    const { token, request } =  await setPlayerToResume(venue)
    return setResponse(res, token);
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setPause = async(req: any, res:any ) => {
  try {
    const venue: Venue = req.user;
    const { token, request } = await setPlayerToPause(venue);
    return setResponse(res, token);
  } catch (e) {
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
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setTransferPlayback = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    venue.token = 'BQADn5fb_IWOibBMvNWP3JqSilGatWiGm70aF84ARFyJvu3BLBRS7KTEth_h4vj21i2FcBpaqW29p9MZvubZ49M2iSFmmwEKt7M2AZ6ZHyLsNkQ968qStjw8dE6DDZPVYtriICsdP0Uxv4aWojgtJbq31Jw_onj_K7ZzQXdx_ykEo3SPZG4NWisxPs0hFm2HLnovabcmHXPZSagU33xbEVDxT3OqlYEqfSjFOWIgkxqyEqKICq4kv6UYsch-fycSCUcxEeKMLYnk10nJLDN5YuJz_Ple11E8_xhVnMiUHabitk4';
    const { token, request }  = await transferPlayerPlayback(venue, req.params.deviceid);
    return setResponse(res, token);
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  };
}
