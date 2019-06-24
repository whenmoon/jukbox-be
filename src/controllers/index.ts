import express from 'express';
import tokens from '../services/google';
import * as models from '../models';
import { mockUser } from '../services/test-utils';

export const redirecting = (req: express.Request, res: express.Response) => {
  try {
    console.log('here');
    res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const postUser = (req: express.Request, res: express.Response) => {
  try {
    models.postUser(mockUser);
    res.status(201).end();
  } catch (error) {
    res.status(500).end();
  }
};
