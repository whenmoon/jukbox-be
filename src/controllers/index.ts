import express from 'express';
import tokens from '../services/google';
import * as models from '../models';

export const redirecting = (req: express.Request, res: express.Response) => {
  try {
    res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`);
  } catch(e) {
    res.status(500).end();
  }
};
