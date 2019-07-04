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
const test_utils_1 = require("../services/test-utils");
const authUtils_1 = require("./authUtils");
const Venue_1 = __importDefault(require("../models/Venue"));
const test_utils_2 = require("./test-utils");
const models_1 = require("../models");
const google_1 = require("./google");
describe('Controller service functions', () => {
    it(`toCapitalCase should return a namespace ('/:namespace') in capital case (Namespace)`, () => {
        //toCapitalCase(mockNamespace).should.equal(mockVenue.name);
    });
});
beforeEach(() => __awaiter(this, void 0, void 0, function* () {
    yield test_utils_1.deleteTableContents();
    test_utils_2.mockRequest.headers.token = '';
}));
afterEach(() => __awaiter(this, void 0, void 0, function* () {
    yield test_utils_1.deleteTableContents();
}));
describe('Authentication Testing', () => {
    describe('Token header extraction and provision middleware tests', () => {
        it(`authUtils.extractToken should properly extract the token`, () => {
            authUtils_1.extractToken(test_utils_2.mockRequest, '', test_utils_2.mockNext);
            (test_utils_2.mockRequest.headers.token).should.equal('blabla');
        });
        it(`authUtils.providetoken to user should provide a user with venue token `, () => __awaiter(this, void 0, void 0, function* () {
            yield Venue_1.default.create(test_utils_1.mockVenue);
            yield models_1.User.create(test_utils_2.mockUser);
            //await UserVenue.create(mockUserVenue);
            yield authUtils_1.provideTokenToUser(test_utils_2.mockRequest, '', test_utils_2.mockNext);
            (test_utils_2.mockRequest.token.token).should.equal('123456');
        }));
    });
    describe('OAUTH strategy callback testing', () => {
        it(`google.saveGoogleToken saves a new token when there is no user`, () => __awaiter(this, void 0, void 0, function* () {
            yield google_1.saveGoogleToken(test_utils_1.mockToken, '', test_utils_2.mockProfile, test_utils_1.mockDone);
            const user = yield models_1.User.find('test@codeworks.me');
            (user.token).should.equal(test_utils_1.mockToken);
        }));
        it(`google.saveGoogleToken updates the token when a user already exists`, () => __awaiter(this, void 0, void 0, function* () {
            yield models_1.User.create(test_utils_2.mockUser);
            yield google_1.saveGoogleToken(test_utils_1.mockToken, '', test_utils_2.mockProfile, test_utils_1.mockDone);
            const user = yield models_1.User.find('test@codeworks.me');
            (user.token).should.equal(test_utils_1.mockToken);
        }));
        // it(`spotify.saveSpotifyToken`, async () => {
        // });
    });
});
