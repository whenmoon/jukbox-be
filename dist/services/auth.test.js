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
require("mocha");
const chai_1 = __importDefault(require("chai"));
chai_1.default.should();
const models_1 = require("../models");
const expect = chai_1.default.expect;
const auth_test_utils_1 = require("./auth-test-utils");
describe('Saving/Updating records in DB', () => {
    before(() => __awaiter(this, void 0, void 0, function* () {
        yield auth_test_utils_1.createTables();
        yield models_1.User.create(auth_test_utils_1.existingUser);
        yield models_1.Venue.create(auth_test_utils_1.existingVenue);
        yield models_1.UserVenue.create(auth_test_utils_1.existingUser.email, auth_test_utils_1.existingVenue.name, 1);
    }));
    after((done) => {
        done();
    });
    it('should create user record in the DB', () => __awaiter(this, void 0, void 0, function* () {
        const user = yield models_1.User.create(auth_test_utils_1.newUser);
        expect(user).to.be.an('object');
        expect(user.email).to.equal(auth_test_utils_1.newUser.email);
        expect(user.token).to.equal(auth_test_utils_1.newUser.token);
        expect(user.diamonds).to.equal(auth_test_utils_1.newUser.diamonds);
    }));
    it('should update the user token record', () => __awaiter(this, void 0, void 0, function* () {
        yield models_1.User.updateToken(auth_test_utils_1.existingUser.email, auth_test_utils_1.newToken);
        const user = yield models_1.User.find(auth_test_utils_1.existingUser.email);
        expect(user.token).to.be.a('string');
        expect(user.token).to.equal(auth_test_utils_1.newToken);
    }));
    it('should create venue record in the DB', () => __awaiter(this, void 0, void 0, function* () {
        const venue = yield models_1.Venue.create(auth_test_utils_1.newVenue);
        expect(venue).to.be.an('object');
        expect(venue.name).to.equal(auth_test_utils_1.newVenue.name);
        expect(venue.spotify_id).to.equal(auth_test_utils_1.newVenue.spotify_id);
        expect(venue.token).to.equal(auth_test_utils_1.newVenue.token);
    }));
    it('should update venue token record', () => __awaiter(this, void 0, void 0, function* () {
        yield models_1.Venue.updateToken(auth_test_utils_1.existingVenue.spotify_id, auth_test_utils_1.newToken);
        const venue = yield models_1.Venue.find(auth_test_utils_1.existingVenue.name);
        expect(venue.token).to.be.a('string');
        expect(venue.token).to.equal(auth_test_utils_1.newToken);
    }));
    it('should find venue associated with token', () => __awaiter(this, void 0, void 0, function* () {
        const venueRecord = yield models_1.Venue.find(auth_test_utils_1.existingVenue.name);
        const venue = yield models_1.Venue.authorize(venueRecord.token);
        expect(venue.spotify_id).to.equal(auth_test_utils_1.existingVenue.spotify_id);
        expect(venue.name).to.equal(auth_test_utils_1.existingVenue.name);
    }));
    it('should find user associated with token', () => __awaiter(this, void 0, void 0, function* () {
        const userRecord = yield models_1.User.find(auth_test_utils_1.existingUser.email);
        const user = yield models_1.User.authorize(userRecord.token);
        expect(user.email).to.equal(auth_test_utils_1.existingUser.email);
        expect(user.diamonds).to.equal(auth_test_utils_1.existingUser.diamonds);
    }));
    it('should find a user current venue', () => __awaiter(this, void 0, void 0, function* () {
        const venueInfo = yield models_1.Venue.getVenueToken(auth_test_utils_1.existingUser.email);
        const venue = yield models_1.Venue.find(venueInfo.venue_id);
        expect(venue.token).to.equal(auth_test_utils_1.newToken);
    }));
});
