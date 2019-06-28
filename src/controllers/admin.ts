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
    const songToPlay = await VenueSong.getSongToPlay();
    const transferPlayRes = await transferPlayerPlayback(req.user.token, req.params.device_id);
    const resumePlayRes = await setPlayerToPlay(req.user.token,[songToPlay]);
    res.status(204).send();
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    const transferPlayRes = await transferPlayerPlayback(req.user.token, req.params.device_id);
    const volumeRes = await setPlayerVolume(req.user.token, req.params.volumepercent);
    res.status(204).send();
  } catch(e) {
    res.status(e.error.error.status).send(e);
  }
};

export const lockNextSong = async( req: any, res:any) => {
  try {
    await VenueSong.deleteLastPlayedSong()
    const nextSong = await VenueSong.getNextSong() 
    const savedSong = await VenueSong.lockSong(nextSong.song)
    res.status(204).send(savedSong);
  } catch(e) {
    res.status(500).send(e);
  }
};

