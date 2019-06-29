import 'mocha';
import { mockUserVenue } from '../services/test-utils';
import chai from 'chai';
chai.should();
import { mockVenue, mockPlaylist, sortedMockPlaylist } from '../services/test-utils';
import { Venue, VenueSong } from './';

describe('Models', () => {

  describe('VenueSong', () => {

    it('should sort songs for a given venue', async () => {
      const sortedPlaylist = await VenueSong.sortPlaylist(mockPlaylist);
      sortedPlaylist.should.deep.equal(sortedMockPlaylist);
    })
  });
})
