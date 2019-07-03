import { searchSpotify } from '../services/spotifyAPI';
import { parseArray } from './helpers';

export const redirectUser = (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-user?token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const getUserInfo = (req: any, res: any) => {
  try {
    req.user && res.status(200).json(req.user);
    res.status(403).end();
  } catch(e) {
    res.status(500).end();
  }
}

export const searchForSongs = async (req: any, res: any) => {
  try {
    const songName: string = req.query.q;
    const token: string = req.token;
    const response = await searchSpotify(token, songName);
    if (response) res.status(200).send(parseArray(response.tracks.items));
    else res.status(403).end()
  } catch(e) {
    res.status(500).end();
  }
}