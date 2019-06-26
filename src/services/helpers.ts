import Venue from '../models/Venue';

export const verifyToken = (req: any, res: any, next: any) => {
  console.log(req.headers)
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, res: any, next: any) => {
  const result: any = await Venue.getVenueToken(req.user.email);
  console.log('PROVIDE TOKEN –––––––––––––––––FUCK––––––––––>', result)
  req.token = result;
  next();
}
