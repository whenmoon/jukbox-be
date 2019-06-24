import 'mocha';
import * as models from './models';
import { mockUser, mockVenue, mockUserVenue, mockPlaylistItem } from './services/test-utils';

describe('Models', () => {

  it('.postUser should return the inserted record of the new user', async () => {
    await models.postUser(mockUser)
      .then((result: any) => {
        console.log(result);
        result.command.should.equal('INSERT');
        result.rows[0].email.should.equal(mockUser.email);
        result.rows[0].name.should.equal(mockUser.name);
        result.rows[0].diamonds.should.equal(mockUser.diamonds);
      });
  });

  it('.postVenue should return the inserted record of the new venue', async () => {
    const result: any = await models.postVenue(mockVenue);
    result.Result.command.should.eql('INSERT');
    result.Result.rows[0].name.should.eql(mockVenue.name);
    result.Result.rows[0].ticket_default_no.should.eql(mockVenue.ticket_default_no);
    result.Result.rows[0].closing_times.should.eql(null);
  });

  it('.postUserVenue should return the inserted record of the new user-venue relation', async () => {
    const result: any = await models.postUserVenue(mockUserVenue);
    result.Result.command.should.eql('INSERT');
    result.Result.rows[0].id.should.eql(1);
    result.Result.rows[0].user_id.should.eql(mockUserVenue.userEmail);
    result.Result.rows[0].venue_id.should.eql(mockUserVenue.venueName);
    result.Result.rows[0].tickets.should.eql(mockUserVenue.tickets);
    result.Result.rows[0].diamonds.should.eql(mockUserVenue.diamonds);
  });

  it('.postSong should return the inserted record of the new song in the playlist', async () => {
    const result: any = await models.postSong(mockPlaylistItem);
    result.Result.command.should.eql('INSERT');
    result.Result.rows[0].id.should.eql(1);
    result.Result.rows[0].user_id.should.eql(mockPlaylistItem.userEmail);
    result.Result.rows[0].venue_id.should.eql(mockPlaylistItem.venueName);
    result.Result.rows[0].song.should.eql(mockPlaylistItem.song);
    result.Result.rows[0].diamonds.should.eql(mockPlaylistItem.diamonds);
    result.Result.rows[0].submissions_time.should.eql(String(new Date(Date.now())));
  });
  
});