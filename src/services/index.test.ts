import 'mocha';
import chai from 'chai';
chai.should();
import { toCapitalCase, sortPlaylist } from './';
import { mockNamespace, mockVenue, mockPlaylist, sortedMockPlaylist } from '../services/test-utils';

describe('Controller service functions', () => {

  it(`toCapitalCase should return a namespace ('/:namespace') in capital case (Namespace)`, () => {
    toCapitalCase(mockNamespace).should.equal(mockVenue.name);
  });

  it(`sortPlaylist should return the playlist sorted in descending order by diamonds and ascending order by submission time`, () => {
    sortPlaylist(mockPlaylist).should.deep.equal(sortedMockPlaylist);
  });

});