import Venue from '../models/Venue';

export const extractToken = (req: any , res: any, next: any) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any , res: any, next: any) => {
  const result: any = await Venue.getVenueTokenMVP('Codeworks');
  req.token = result.token;
  next();
}
