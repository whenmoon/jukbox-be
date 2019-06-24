import 'mocha';
import * as models from './models';
import { mockUser, mockVenue, mockUserVenue, mockPlaylistItem } from './services/test-utils';

describe('Models', () => {

  it('.postUser should return the inserted record of the new user', async () => {
    const result = await models.postUser(mockUser);
    console.log(result);
  });

  it('.postVenue should return the inserted record of the new venue', async () => {
    const result = await models.postVenue(mockVenue);
    console.log(result);
  });

  it('.postUserVenue should return the inserted record of the new user-venue relation', async () => {
    const result = await models.postUserVenue(mockUserVenue);
    console.log(result);
  });

  it('.postSong should return the inserted record of the new song in the playlist', async () => {
    const result = await models.postSong(mockPlaylistItem);
    console.log(result);
  });
  
});