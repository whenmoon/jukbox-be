import { user } from '../services/google';
import { searchSpotify } from '../services/spotifyAPI';

export const redirectUser = (req: any, res: any) => {
  try {
    // 'http://localhost:3000/authorized-user?access_token=TOKEN'
    res.redirect(`http://localhost:3000/login?token=${user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const getUserInfo = (req: any, res: any) => {
  try {
    req.user && res.status(200).json(req.user);
    res.status(403).end();
  } catch(e) {
    res.status(500).end();
  }
}

export const searchForSongs = async (req: any, res: any) => {
  try {
    const songName: string = req.query.q;
    const token: string = req.token;
    const response = await searchSpotify(token, songName);
    response && res.status(200).json(response);
  } catch(e) {
    res.status(500).end();
  }
}
