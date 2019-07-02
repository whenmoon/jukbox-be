import {transferPlayerPlayback, setPlayerToPlay, setPlayerToPause, setPlayerToResume, setPlayerVolume, renewAccessToken } from '../services/spotifyAPI';
import { VenueSong, Venue, UserVenue} from '../models';


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
    if (songToPlay) await setPlayerToPlay(venue.token, [`spotify:track:${JSON.parse(songToPlay.song).song_id}`]);
    else await setPlayerToPlay(venue.token, ["spotify:track:5c882VwvW0mlp82KaSk99W"]);
    res.status(204).send();
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setResume = async(req: any, res:any ) => {
  try {
    const venue: Venue = req.user;
    await setPlayerToResume(venue.token)
    res.status(204).send();
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setPause = async(req: any, res:any ) => {
  try {
    const venue: Venue = req.user;
    await setPlayerToPause(venue.token)
    res.status(204).send();
  } catch (e) {
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    const venue: Venue = req.user;
    await setPlayerVolume(venue.token, req.params.volumepercent);
    res.status(204).send();
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
    const temp: string = 'BQBCzLyO662h76J4iEsVLpWNMRFFt70Mstsa_3CHh_ID8k4-uVfoKYBxrjDJHhNwaSWfrUhuO_sQlusqhXSyb1HGph48stnnxQnD5Zc7WGltZt4SQfFgyJxleGIF9uvms9rUSEXSf4SIWu3Hzekg8qgb-EFIGGRoy8IDsDbn3h3xQI-bWaSvoBWYVqIlqdpWJIfZoLxByrr7JQ_55MaLgx1pCq0cKSczPPEaWon0-pkcTfDaKVMOeBeYUsarhNGQSEj2eZY6RWJ23XdjaamH0KAvtocbgFavJDKiGOC3yOQ'
    const venue: Venue = req.user;
    await transferPlayerPlayback(temp, req.params.deviceid);
    res.status(204).send()
  } catch (e) {
    console.log(e)
    if (e.statusCode === 403) res.status(e.statusCode).send(e);
    else res.status(500).send(e);
  };
}
