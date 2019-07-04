"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
exports.extractToken = (req, res, next) => {
    if (req.headers.authorization)
        req.headers.token = req.headers.authorization.slice(7);
    else
        return res.status(403).end();
    next();
};
exports.provideTokenToUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const result = yield models_1.Venue.getVenueTokenMVP('Codeworks');
    req.token = result.token;
    next();
});
