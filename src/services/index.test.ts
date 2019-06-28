import 'mocha';
import chai from 'chai';
chai.should();
import { toCapitalCase, sortPlaylist } from './';
import { mockNamespace, mockDone, token, mockVenue, mockPlaylist, sortedMockPlaylist, deleteTableContents, mockUserVenue } from '../services/test-utils';
import {extractToken, provideTokenToUser} from './authUtils';
import Venue from '../models/Venue';
import {mockUser, mockRequest, mockNext, mockVenueSong} from './test-utils';
import { UserVenue, User, VenueSong } from '../models';
import {saveGoogleToken} from './google';
//import {saveSpotifyToken as saveSpotifyToken} from './spotify.js';




describe('Controller service functions', () => {

  it(`toCapitalCase should return a namespace ('/:namespace') in capital case`, () => {
    toCapitalCase(mockNamespace).should.equal(mockVenue.name);
  });

  it(`sortPlaylist should return the playlist sorted in descending order by diamonds and ascending order by submission time`, () => {
    sortPlaylist(mockPlaylist).should.deep.equal(sortedMockPlaylist);
  });

});


before(async()=> {
  await Venue.create(mockVenue);
  await User.create(mockUser);
  await UserVenue.create(mockUserVenue);
  await VenueSong.create('hello' ,'test@codeworks.me','Codeworks');
})

beforeEach(async() => {
  //await deleteTableContents();
  // await Venue.create(mockVenue);
  // await User.create(mockUser);
  // await UserVenue.create(mockUserVenue);
  // await VenueSong.create('hello' ,'test@codeworks.me','Codeworks');

  // mockRequest.headers.token ='';

});

afterEach(async() => {
  //await deleteTableContents();
})

describe('Authentication Testing', () => {

  describe('Token header extraction and provision middleware tests', () => {

    it(`authUtils.extractToken should properly extract the token`, () => {
      extractToken(mockRequest, '', mockNext);
      (mockRequest.headers.token).should.equal('blabla')
    })

    it(`authUtils.providetoken to user should provide a user with venue token `, async () => {
      await provideTokenToUser(mockRequest, '', mockNext);
      (mockRequest.token.token).should.equal('123456')
    })

  })

  describe('OAUTH strategy callback testing', () => {

    // it(`google.saveGoogleToken`, async () => {
    //   await saveGoogleToken(token, '', '', mockDone)
    // });

});


});


