import { pausePlayer,transferPlayerPlayback, setPlayerPlay, setPlayerVolume } from '../services/spotifyAPI';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};


export const setPlayResume = async (req: any, res: any) => {
  try {
    const device_id = req.params.device_id; 
    //to add - getcurrenttrack, this a placeholder for returning the current track 
    await transferPlayerPlayback(req.user.token, device_id)
   // await setPlayerPlay(play, playlist)
   res.status(204).send()
  } catch(e) {
    console.log(e);
  }
};

export const setVolume = async (req: any, res: any) => {
  try {
    const device_id = req.params.device_id; 
    const volume = req.params.volume; 
    await transferPlayerPlayback(req.user.token, device_id);
    await setPlayerVolume(req.user.token, volume);
    res.status(204).send()
  } catch(e) {
  }
};

export const setPause = async (req:any, res: any) => {
  try {
    await pausePlayer(req.user.token);
    res.status(204).send()
  } catch(e) {
  }
}