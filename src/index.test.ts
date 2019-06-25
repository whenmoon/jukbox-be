import 'mocha';
import { createClient } from './services/test-utils';
import server from './';
import chai from 'chai';
chai.should();
import { mockUser, mockVenue, mockPlaylistItem } from './services/test-utils';
import { PlaylistItem } from './types';
const PORT = 4000;
import * as models from './models/';

const wait = (time: number) => new Promise((resolve, reject) => setTimeout(() => {
  resolve();
}, time));


describe('Sockets', () => {

  before(done => {
    server.listen(PORT);
    models.postUser(mockUser);
    models.postVenue(mockVenue);
    done();
  });

  after(done => {
    models.deleteFromTables();
    server.close(done);
  });

  it('broadcasts the updatedPlaylist on addSong to mulitple clients', async () => {
    const client1: any = await createClient(PORT);
    const client2: any = await createClient(PORT);
    const client3: any = await createClient(PORT);

    let countReceived = 0;
    let client1Received = false;

    // if true, then client1 unintentionally received the emit
    client1.on('updatedPlaylist', (data: number) => {
      client1Received=true;
    });

    client2.on('updatedPlaylist', (data: Array<PlaylistItem>) => {
      const result = data[0];
      result.song.should.eql(mockPlaylistItem.song);
      countReceived++;
    });

    client3.on('updatedPlaylist', (data: Array<PlaylistItem>) => {
      const result = data[0];
      result.song.should.eql(mockPlaylistItem.song);
      countReceived++;
    });

    client1.emit('addSong', mockPlaylistItem);

    // We wait 200ms to ensure both clients received the message
    await wait(200);

    countReceived.should.equal(2);
    client1Received.should.equal(false);
    client1.disconnect() && client2.disconnect() && client3.disconnect();
  });

  // it('broadcasts the updatedPlaylist on updateSongDiamonds to mulitple clients', async () => {
  //   const client1: any = await createClient(PORT);
  //   const client2: any = await createClient(PORT);
  //   const client3: any = await createClient(PORT);
  //   const diamonds = 5;
  //   let countReceived = 0;
  //   let client1Received = false;

  //   client1.on('updatedPlaylist', (data: number) => {
  //     client1Received=true;
  //   });

  //   client2.on('updatedPlaylist', (data: number) => {
  //     data.should.eql(diamonds);
  //     countReceived++;
  //   });

  //   client3.on('updatedPlaylist', (data: number) => {
  //     data.should.eql(diamonds);
  //     countReceived++;
  //   });

  //   client1.emit('updateSongDiamonds', diamonds);

  //   await wait(200);

  //   countReceived.should.equal(2);
  //   client1Received.should.equal(false);
  //   client1.disconnect() && client2.disconnect() && client3.disconnect();

  // });


  
});