import { Venue, User } from '../models';

export const extractToken = (req: any , res: any, next: any) => {
  if (req.headers.authorization) req.headers.token = req.headers.authorization.slice(7);
  else return res.status(403).end();
  next();
};

export const provideTokenToUser = async (req: any , res: any, next: any) => {
  const result: any = await Venue.getVenueTokenMVP('Codeworks');
  req.token = result.token;
  next();
};
