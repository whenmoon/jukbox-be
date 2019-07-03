import { searchSpotify } from '../services/spotifyAPI';
import { parseArray } from './helpers';
import { User } from '../models';
import Stripe from 'stripe';
const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

export const redirectUser = (req: any, res: any) => {
  try {
    res.redirect(`http://localhost:3000/authorized-user?token=${req.user.token}`);
  } catch(e) {
    res.status(500).end();
  }
};

export const getUserInfo = (req: any, res: any) => {
  try {
    if (req.user) res.status(200).json(req.user);
    else res.status(403).end();
  } catch(e) {
    res.status(500).end();
  }
}

export const searchForSongs = async (req: any, res: any) => {
  try {
    const songName: string = req.query.q;
    const token: string = req.token;
    const response = await searchSpotify(token, songName);
    if (response) res.status(200).send(parseArray(response.tracks.items));
    else res.status(204).end();
  } catch(e) {
    if (e.statusCode === 401) res.status(e.statusCode).end();
    else res.status(500).end();
  }
}

export const chargeCustomer = async (req: any, res: any) => {
  try {
    const userEmail: string = req.user.email;
    const session: any = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      payment_method_types: ['card'],
      line_items: [{
        name: 'diamonds',
        amount: 100,
        currency: 'eur',
        quantity: 1,
      }],
      success_url: 'http://localhost:3000/dashboard',
      cancel_url: 'http://localhost:3000/failure',
    });
    res.status(200).json(session.id);
  } catch (e) {
    res.status(500).end();
  }
}

export const onPayment = async (req: any, res: any) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, String(process.env.STRIPE_WEB_KEY));
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const eventObject: any = event.data.object;
    const userEmail: string = eventObject.customer_email;
    await User.incrementDiamonds(userEmail, 5);
  }
  res.status(200).json({received: true});
};
