import 'mocha';
import chai from 'chai';
chai.should();
import { toCapitalCase } from './';
import { mockNamespace, mockVenue, mockPlaylist, sortedMockPlaylist } from '../services/test-utils';

describe('Controller service functions', () => {

  it(`toCapitalCase should return a namespace ('/:namespace') in capital case (Namespace)`, () => {
    toCapitalCase(mockNamespace).should.equal(mockVenue.name);
  });
});
