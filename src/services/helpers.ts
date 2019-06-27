import Venue from '../models/Venue';
import express from 'express';

export const verifyToken = (req: express.Request , res: express.Response, next: express.NextFunction) => {
  req.headers.token = req.headers.authorization.slice(7);
  next();
};

export const provideTokenToUser = async (req: express.Request , res: express.Response, next: express.NextFunction) => {
  const result: any = await Venue.getVenueTokenMVP('Codeworks');
  req.token = result.token;
  next();
}
