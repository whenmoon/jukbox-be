import 'mocha';
import { createClient } from './services/test-utils';
import server from './';
import chai from 'chai';
chai.should();
import { mockUser, mockVenue, mockVenueSong, deleteTableContents } from './services/test-utils';
import { User, Venue, VenueSong } from './models';
const PORT = 4000;
import pool from './config/db';

const ClientsReceivedMessage = (time: number) => new Promise((resolve, reject) => setTimeout(() => {
  resolve();
}, time));


describe('Sockets', () => {

  before(done => {
    server.listen(PORT);
    User.create(mockUser);
    Venue.create(mockVenue);
    done();
  });

  after(done => {
    deleteTableContents();
    // pool.disconnect();
    server.close(done);
  });

  it('broadcasts the updatedPlaylist on addSong to mulitple clients', async () => {
    const client1: any = await createClient(PORT);
    const client2: any = await createClient(PORT);
    const client3: any = await createClient(PORT);

    let countReceived = 0;
    let client1Received = false;

    client1.on('updatedPlaylist', (data: Array<VenueSong>) => {
      client1Received=true;
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

    await ClientsReceivedMessage(200);

    countReceived.should.equal(2);
    client1Received.should.equal(false);
    client1.disconnect() && client2.disconnect() && client3.disconnect();
  });

  it('broadcasts the updatedPlaylist on updateSongDiamonds to mulitple clients', async () => {
    const client1: any = await createClient(PORT);
    const client2: any = await createClient(PORT);
    const client3: any = await createClient(PORT);
    const diamonds = 5;
    let countReceived = 0;
    let client1Received = false;

    client1.on('updatedPlaylist', (data: Array<VenueSong>) => {
      client1Received=true;
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

    client1.emit('updateSongDiamonds', mockVenueSong);

    await ClientsReceivedMessage(200);

    countReceived.should.equal(2);
    client1Received.should.equal(false);
    client1.disconnect() && client2.disconnect() && client3.disconnect();

  });


  
});