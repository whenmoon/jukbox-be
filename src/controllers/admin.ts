import {transferPlayerPlayback, setPlayerToPlay, setPlayerVolume } from '../services/spotifyAPI';
import { VenueSong} from '../models';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlayResume = async (req: any, res: any) => {
  try {
    console.log(req.params.deviceid, 'device id');
    //await transferPlayerPlayback(req.user.token, req.params.deviceid);
    const songToPlay = await VenueSong.getSongToPlay();
    if (songToPlay) await setPlayerToPlay(req.user.token,[songToPlay]); 
    else await setPlayerToPlay(req.user.token,["spotify:track:5c882VwvW0mlp82KaSk99W"]);
    res.status(204).send();
  } catch (e) {
    console.log(e)
    res.status(e.error.error.status).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    //const transferPlayRes = await transferPlayerPlayback(req.user.token, req.params.deviceid);
    const volumeRes = await setPlayerVolume(req.user.token, req.params.volumepercent);
    res.status(204).send();
  } catch(e) {
    res.status(e.error.error.status).send(e);
  }
};

export const lockNextSong = async( req: any, res:any) => {
  try {
    await VenueSong.deleteLastPlayedSong()
    let nextSong = await VenueSong.getNextSong() 
    if (nextSong) nextSong = await VenueSong.lockSong(nextSong.song)
    res.status(204).send(nextSong);
  } catch(e) {
    res.status(500).send(e);
  }
};


export const setTransferPlayback = async (req: any, res: any) => {
  try {
    console.log(req.user.token, 'transfer playback 1');
    console.log(req.params.deviceid, 'transfer playback 2');
    await transferPlayerPlayback(req.user.token, req.params.deviceid);
    res.status(204).send();
  } catch (e) {
    console.log(e)
    res.status(e.error.error.status).send(e);
  }
};

