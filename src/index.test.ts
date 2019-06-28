require('dotenv').config();
import 'mocha';
import { createClient, forClientsToReceiveMessage, mockUserVenue } from './services/test-utils';
import server from './';
import chai from 'chai';
chai.should();
import { mockUser, mockVenue, mockVenueSong, deleteTableContents } from './services/test-utils';
import { User, Venue, VenueSong, UserVenue } from './models';
const PORT = 4000;

describe('Sockets', () => {
  let client1: any, client2: any, client3: any, countReceived: number;

  before(done => {
    User.create(mockUser);
    Venue.create(mockVenue);
    UserVenue.create(mockUserVenue.userEmail, mockUserVenue.venueName, mockUserVenue.tickets);
    done();
  });

  beforeEach(async () => {
    client1 = await createClient(PORT);
    client2 = await createClient(PORT);
    client3 = await createClient(PORT);
    countReceived = 0;
  })

  afterEach(async () => {
    countReceived = 0;
    await client1.disconnect()
    await client2.disconnect()
    await client3.disconnect();
  })

  after(done => {
    deleteTableContents();
    server.close(done);
  });

  it('broadcasts the updatedPlaylist on addSong to mulitple clients', async () => {
    client1.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client2.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client3.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client1.emit('addSong', mockVenueSong.song, mockVenueSong.userEmail);

    await forClientsToReceiveMessage(200);
    countReceived.should.equal(3);
  });

  it('broadcasts the updatedPlaylist on updateSongDiamonds to mulitple clients', async () => {
    const diamonds = 5;
    
    client1.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.diamonds.should.eql(diamonds);
      countReceived++;
    });

    client2.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.diamonds.should.eql(diamonds);
      countReceived++;
    });

    client3.on('updatedPlaylist', (data: Array<VenueSong>) => {
      const result = data[0];
      result.diamonds.should.eql(diamonds);
      countReceived++;
    });

    client1.emit('updateSongDiamonds', mockVenueSong.song, mockVenueSong.userEmail);

    await forClientsToReceiveMessage(200);
    countReceived.should.equal(3);
  });

});