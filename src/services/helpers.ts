import  { getVenueToken } from '../models';

export const verifyToken = (req: any, res: any, next: any) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, res: any, next: any) => {
  const token: any = await getVenueToken();
  req.token = token.rows[0].token;
  next();
}
