import {transferPlayerPlayback, setPlayerToPlay, setPlayerToPause, setPlayerToResume, setPlayerVolume, renewAccessToken } from '../services/spotifyAPI';
import { VenueSong, Venue, UserVenue} from '../models';
import { emitPlaylist } from './helpers';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`https://inspiring-aryabhata-56eaac.netlify.com/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlay = async (req: any, res: any) => {
  try {
    const venueName = req.user.name;
    const songToPlay = await VenueSong.selectSongToPlay(venueName);
    if (songToPlay) await setPlayerToPlay(req.user.token, [`spotify:track:${JSON.parse(songToPlay.song).song_id}`]);
    else await setPlayerToPlay(req.user.token, ["spotify:track:5c882VwvW0mlp82KaSk99W"]);
    await emitPlaylist(venueName);
    res.status(204).send();
  } catch (e) {
    res.status(e.statusCode).send(e);
  }
};

export const setResume = async(req: any, res:any ) => {
  try {
    await setPlayerToResume(req.user.token)
    res.status(204).send();
  } catch (e) {
    res.status(e.statusCode).send(e);
  }
};

export const setPause = async(req: any, res:any ) => {
  try {
    await setPlayerToPause(req.user.token)
    res.status(204).send();
  } catch (e) {
    res.status(e.statusCode).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    await setPlayerVolume(req.user.token, req.params.volumepercent);
    res.status(204).send();
  } catch(e) {
    res.status(e.statusCode).send(e);
  }
};


export const lockNextSong = async( req: any, res:any) => {
  try {
    await VenueSong.removeCurrentlyPlayingSong(req.user.name)
    await VenueSong.lockInAndPlayNextSong(req.user.name);
    res.status(204).send();
  } catch(e) {
    res.status(500).send();
  }
};

export const setTransferPlayback = async (req: any, res: any) => {
  try {
    await transferPlayerPlayback(req.user.token, req.params.deviceid);
    res.status(204).send()
  } catch (e) {
    res.status(e.statusCode).send(e);
  };

}

