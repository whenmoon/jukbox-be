import User from '../models/User';


export const extractToken = (req: any, _: any, next: any) => {
  console.log(req.headers)
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: any, _: any, next: any) => {
  const result = await User.getVenueToken(req.user.email);
  req.token = result;
  next();
}
