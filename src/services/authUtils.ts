<<<<<<< HEAD
import User from '../models/User';


export const extractToken = (req: any, _: any, next: any) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, _: any, next: any) => {
  const result = await User.getVenueToken(req.user.email);
  req.token = result;
=======
import Venue from '../models/Venue';

export const extractToken = (req: any , res: any, next: any) => {
  if (req.headers.authorization) req.headers.token = req.headers.authorization.slice(7);
  else res.status(403).end();
  next();
};

export const provideTokenToUser = async (req: any , res: any, next: any) => {
  const result: any = await Venue.getVenueTokenMVP('Codeworks');
  req.token = result.token;
>>>>>>> 2f5c50426f28119f5c0b98a9c52dc44aeaac742a
  next();
}
