import { transferPlayerPlayback, setPlayerPlay, setPlayerVolume } from '../services/spotifyAPI';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const setPlayResume = async (req: any, res: any) => {
  try {
    //to add - getcurrenttrack, this a placeholder for returning the current track 
    const transferPlayRes = await transferPlayerPlayback(req.user.token, req.params);
    const resumePlayRes = await setPlayerPlay(req.user.token, ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]);
    res.status(204).send();
  } catch (e) {
    res.status(e.error.error.status).send(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    const device_id = req.params.deviceid; 
    const volume = req.params.volumepercent; 
    const transferPlayRes = await transferPlayerPlayback(req.user.token, device_id);
    const volumeRes = await setPlayerVolume(req.user.token, volume);
    res.status(204).send();
  } catch(e) {
    res.status(e.error.error.status).send(e);
  }
};


