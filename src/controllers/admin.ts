import {transferPlayerPlayback, setPlayerToPlay, setPlayerToPause, setPlayerToResume, setPlayerVolume, getRefreshToken } from '../services/spotifyAPI';
import { VenueSong, Venue, UserVenue} from '../models';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlay = async (req: any, res: any) => {
  try {
    const venue = await Venue.authorize(req.user.token)
    const songToPlay = await VenueSong.getSongToPlay(venue.name);
    if (songToPlay) await setPlayerToPlay(req.user.token, [`spotify:track:${songToPlay}`]);
    else await setPlayerToPlay(req.user.token, ["spotify:track:5c882VwvW0mlp82KaSk99W"]);
    res.status(204).send();
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
};

export const setResume = async(req: any, res:any ) => {
  try {
    await setPlayerToResume(req.user.token)
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
}

export const setPause = async(req: any, res:any ) => {
  try {
    await setPlayerToPause(req.user.token)
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
}




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
    const venue = await Venue.authorize(req.user.token)
    console.log(venue)
    await VenueSong.deleteLastPlayedSong(venue.name)
    let nextSong = await VenueSong.getNextSong(venue.name) 
    console.log(nextSong)
    if (nextSong) nextSong = await VenueSong.lockSong(nextSong.song, venue.name);
    res.status(201).json(nextSong);
  } catch(e) {
    res.status(500).send(e);
  }
};




export const setTransferPlayback = async (req: any, res: any) => {
  try {
    await transferPlayerPlayback(req.user.token, req.params.deviceid);
    res.status(204).send()
  } catch (e) {
    console.error(e);
    // check refreshToken
    res.status(e.error.error.status).send(e);
  }
};

export const refreshToken = async (req:any, res:any)=> {
  try {
    const venue = await Venue.authorize(req.user.token)
    const response = await getRefreshToken(venue.refresh);
    console.log(response)
    //newVenue = await Venue.updateToken(venue.spotify_id, response.)
  } catch (e) {

  }
}

