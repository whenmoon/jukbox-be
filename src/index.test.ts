import 'mocha';
import server from './';
import { createClient, forClientsToReceiveMessage, mockUserVenue } from './services/test-utils';
import chai from 'chai';
chai.should();
import { mockUser, mockVenue, mockVenueSong, deleteTableContents } from './services/test-utils';
import { User, Venue, VenueSong, UserVenue } from './models';
import { socketServerResponse } from './types';
const PORT = 4000;

describe('Sockets', () => {
  let client1: any, client2: any, client3: any, countReceived: number;

  before(async () => {
    await User.create(mockUser);
    await Venue.create(mockVenue);
    await UserVenue.create(mockUserVenue.userEmail, mockUserVenue.venueName, mockUserVenue.tickets);
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

  after(async () => {
    await deleteTableContents();
    await server.close();
  });

  it('broadcasts the updatedPlaylist on addSong to mulitple clients', async () => {
    client1.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client2.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client3.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].song.should.eql(mockVenueSong.song);
      countReceived++;
    });

    client1.emit('message', {
      route: 'addSong',
      data: {
        song: mockVenueSong.song,
        userEmail: mockVenueSong.userEmail
      }
    });

    await forClientsToReceiveMessage(200);
    countReceived.should.equal(3);
  });

  it('broadcasts the updatedPlaylist on updateSongDiamonds to mulitple clients', async () => {
    const diamonds = 5;

    client1.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].diamonds.should.eql(diamonds);
      countReceived++;
    });

    client2.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].diamonds.should.eql(diamonds);
      countReceived++;
    });

    client3.on('message', (message: socketServerResponse) => {
      const { route, data } = message;
      route.should.eql('updatedPlaylist');
      data.updatedPlaylist[0].diamonds.should.eql(diamonds);
      countReceived++;
    });

    client1.emit('message', {
      route: 'updateSongDiamonds',
      data: {
        song: mockVenueSong.song,
        userEmail: mockVenueSong.userEmail
      }
    });

    await forClientsToReceiveMessage(200);
    countReceived.should.equal(3);
  });

});
