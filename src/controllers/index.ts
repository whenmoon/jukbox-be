import { tokens } from '../services/google';

export const redirecting = (req: any, res: any) => {
  try {
    console.log('here')
    res.redirect(`http://localhost:3000/login?token=${tokens.access_token}`);
  } catch(e) {
    res.status(500).end();
  }
}
