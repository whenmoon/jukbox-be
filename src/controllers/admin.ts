import { Venue } from '../types';


export const redirectAdmin = async (req: any, res: any) => {
  try {
    // 'http://localhost:3000/authorized-admin?access_token=TOKEN'
    res.redirect(`http://localhost:3000/login/admin?access_token=${token.rows[0]}`);
  } catch(e) {
    res.status(500).end();
  }
};
