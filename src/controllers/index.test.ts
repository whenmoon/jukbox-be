import 'mocha';
import VenueSong from '../models/VenueSong';
import { mockUser, mockToken, mockVenue, mockUserVenue, mockVenueSong, deleteTableContents } from '../services/test-utils';
import chai from 'chai'; 
import { lockNextSong } from './admin';

chai.should();

describe('Controllers', () => {

beforeEach(async () => {
  await deleteTableContents();
});

afterEach(async () => {
  await deleteTableContents();
})

  it('.locknextsong ', async () => {
      //const result: any = await VenueSong.create()
      // fine
      
    });


})