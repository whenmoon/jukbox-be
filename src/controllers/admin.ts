import {transferPlayerPlayback, setPlayerToPlay, setPlayerVolume } from '../services/spotifyAPI';
import { VenueSong, Venue} from '../models';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlayResume = async (req: any, res: any) => {
  try {
    const venue = await Venue.getVenue(req.user.token)
    const songToPlay = await VenueSong.getSongToPlay(venue.name);
    if (songToPlay) await setPlayerToPlay(req.user.token,[songToPlay]); 
    else await setPlayerToPlay(req.user.token,["spotify:track:5c882VwvW0mlp82KaSk99W"]);
    res.status(204).send();
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    await setPlayerVolume(req.user.token, req.params.volumepercent);
    res.status(204).send();
  } catch(e) {
    res.status(e.error.error.status).send(e);
  }
};

export const lockNextSong = async( req: any, res:any) => {
  try {
    const venue = await Venue.getVenue(req.user.token)
    await VenueSong.deleteLastPlayedSong(venue.name)
    let nextSong = await VenueSong.getNextSong(venue.name) 
    if (nextSong) nextSong = await VenueSong.lockSong(nextSong.song, nextSong.venueName)
    res.status(204).send(nextSong);
  } catch(e) {
    res.status(500).send(e);
  }
};


export const setTransferPlayback = async (req: any, res: any) => {
  try {
    await transferPlayerPlayback(req.user.token, req.params.deviceid);
    res.status(204).send();
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
};

