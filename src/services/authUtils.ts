import { Venue, User } from '../models';

export const extractToken = (req: any , res: any, next: any) => {
  if (req.headers.authorization) req.headers.token = req.headers.authorization.slice(7);
  else return res.status(403).end();
  next();
};

export const provideTokenToUser = async (req: any , res: any, next: any) => {
  const temp: string = 'BQBCzLyO662h76J4iEsVLpWNMRFFt70Mstsa_3CHh_ID8k4-uVfoKYBxrjDJHhNwaSWfrUhuO_sQlusqhXSyb1HGph48stnnxQnD5Zc7WGltZt4SQfFgyJxleGIF9uvms9rUSEXSf4SIWu3Hzekg8qgb-EFIGGRoy8IDsDbn3h3xQI-bWaSvoBWYVqIlqdpWJIfZoLxByrr7JQ_55MaLgx1pCq0cKSczPPEaWon0-pkcTfDaKVMOeBeYUsarhNGQSEj2eZY6RWJ23XdjaamH0KAvtocbgFavJDKiGOC3yOQ'
  const result: any = await Venue.getVenueTokenMVP('Codeworks');
  req.token = temp;
  next();
};
