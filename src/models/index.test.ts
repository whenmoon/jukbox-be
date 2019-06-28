import 'mocha';
import Venue from './Venue';
import { mockUser, token, mockVenue, mockUserVenue, mockVenueSong, deleteTableContents } from '../services/test-utils';
import chai from 'chai'; 
chai.should();

describe('Models', () => {

  // before ((done) => {
  //   deleteTable();
  //   done();
  // })

  // it('.postUser ', async () => {
  //     const result: any = await Venue.authorize(token)
  //     result.command.should.equal('INSERT');
  //     result.rows[0].email.should.equal(mockUser.email);
  //     result.rows[0].name.should.equal(mockUser.name);
  //     result.rows[0].diamonds.should.equal(mockUser.diamonds);
  //   });
     
  // });

  // it('.postVenue should return the inserted record of the new venue', async () => {
  //   const result: any = await models.postVenue(mockVenue);
  //   result.command.should.eql('INSERT');
  //   result.rows[0].name.should.eql(mockVenue.name);
  //   result.rows[0].ticket_default_no.should.eql(mockVenue.ticket_default_no);
  // });

  // it('.postUserVenue should return the inserted record of the new user-venue relation', async () => {
  //   const result: any = await models.postUserVenue(mockUserVenue);
  //   result.command.should.eql('INSERT');
  //   result.rows[0].user_id.should.eql(mockUserVenue.userEmail);
  //   result.rows[0].venue_id.should.eql(mockUserVenue.venueName);
  //   result.rows[0].tickets.should.eql(mockUserVenue.tickets);
  //   result.rows[0].diamonds.should.eql(mockUserVenue.diamonds);
  // });

  // it('.postSong should return the inserted record of the new song in the playlist', async () => {
  //   const result: any = await models.postSong(mockPlaylistItem);
  //   result.command.should.eql('INSERT');
  //   result.rows[0].user_id.should.eql(mockPlaylistItem.userEmail);
  //   result.rows[0].venue_id.should.eql(mockPlaylistItem.venueName);
  //   result.rows[0].song.should.eql(mockPlaylistItem.song);
  //   result.rows[0].diamonds.should.eql(mockPlaylistItem.diamonds);
  // });
  
});