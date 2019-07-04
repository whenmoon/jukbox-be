"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const spotifyAPI_1 = require("../services/spotifyAPI");
const helpers_1 = require("./helpers");
const models_1 = require("../models");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(String(process.env.STRIPE_SECRET_KEY));
exports.redirectUser = (req, res) => {
    try {
        res.redirect(`http://localhost:3000/authorized-user?token=${req.user.token}`);
    }
    catch (e) {
        res.status(500).end();
    }
};
exports.getUserInfo = (req, res) => {
    try {
        if (req.user)
            res.status(200).json(req.user);
        else
            res.status(403).end();
    }
    catch (e) {
        res.status(500).end();
    }
};
exports.searchForSongs = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const songName = req.query.q;
        const token = req.token;
        const response = yield spotifyAPI_1.searchSpotify(token, songName);
        if (response)
            res.status(200).send(helpers_1.parseArray(response.tracks.items));
        else
            res.status(403).end();
    }
    catch (e) {
        res.status(500).end();
    }
});
exports.chargeCustomer = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userEmail = req.user.email;
        const session = yield stripe.checkout.sessions.create({
            customer_email: userEmail,
            payment_method_types: ['card'],
            line_items: [{
                    name: 'diamonds',
                    amount: 100,
                    currency: 'eur',
                    quantity: 1,
                }],
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/failure',
        });
        res.status(200).json(session.id);
    }
    catch (e) {
        res.status(500).end();
    }
});
exports.onPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, String(process.env.STRIPE_WEB_KEY));
    }
    catch (e) {
        return res.status(400).send(`Webhook Error: ${e.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const eventObject = event.data.object;
        const userEmail = eventObject.customer_email;
        yield models_1.User.incrementDiamonds(userEmail, 5);
    }
    res.status(200).json({ received: true });
});
