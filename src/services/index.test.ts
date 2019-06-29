import 'mocha';
import chai from 'chai';
chai.should();
//import { toCapitalCase} from './';
import { mockNamespace, mockDone, token, mockVenue, mockPlaylist, sortedMockPlaylist, deleteTableContents, mockUserVenue } from '../services/test-utils';
import { extractToken, provideTokenToUser } from './authUtils';
import Venue from '../models/Venue';
import { mockUser, mockRequest, mockNext, mockVenueSong, mockProfile } from './test-utils';
import { UserVenue, User, VenueSong } from '../models';
import { saveGoogleToken } from './google';


describe('Controller service functions', () => {

  it(`toCapitalCase should return a namespace ('/:namespace') in capital case (Namespace)`, () => {
    //toCapitalCase(mockNamespace).should.equal(mockVenue.name);
  });
});


beforeEach(async () => {
  await deleteTableContents();
  mockRequest.headers.token = '';
});

afterEach(async () => {
  await deleteTableContents();
})

describe('Authentication Testing', () => {

  describe('Token header extraction and provision middleware tests', () => {

    it(`authUtils.extractToken should properly extract the token`, () => {
      extractToken(mockRequest, '', mockNext);
      (mockRequest.headers.token).should.equal('blabla')
    })

    it(`authUtils.providetoken to user should provide a user with venue token `, async () => {
      await Venue.create(mockVenue);
      await User.create(mockUser);
      //await UserVenue.create(mockUserVenue);
      await provideTokenToUser(mockRequest, '', mockNext);
      (mockRequest.token.token).should.equal('123456');
    })
    
  })



  describe('OAUTH strategy callback testing', () => {

    it(`google.saveGoogleToken saves a new token when there is no user`, async () => {
      await saveGoogleToken(token, '', mockProfile, mockDone);
      const user = await User.find('test@codeworks.me');
      (user.token).should.equal(token);
    });

    it(`google.saveGoogleToken updates the token when a user already exists`, async () => {
      await User.create(mockUser);
      await saveGoogleToken(token, '', mockProfile, mockDone);
      const user = await User.find('test@codeworks.me');
      (user.token).should.equal(token);
    });

    // it(`spotify.saveSpotifyToken`, async () => {

    // });

  });


});


