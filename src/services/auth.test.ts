import 'mocha';
import chai from 'chai';
chai.should();
import { User, Venue, VenueSong, UserVenue } from '../models';
const expect  = chai.expect;
import { createTables, existingUser, newUser, existingVenue, newVenue, newToken} from './auth-test-utils';

describe('Saving/Updating records in DB', () => {

  before(async () => {
    await createTables();
    await User.create(existingUser);
    await Venue.create(existingVenue);
    await UserVenue.create(existingUser.email, existingVenue.name, 1);
  });

  after((done) => {
    done();
  });

  it('should create user record in the DB' , async () => {
    const user = await User.create(newUser);
    expect(user).to.be.an('object');
    expect(user.email).to.equal(newUser.email);
    expect(user.token).to.equal(newUser.token);
    expect(user.diamonds).to.equal(newUser.diamonds);
  });

  it('should update the user token record', async () => {
    await User.updateToken(existingUser.email, newToken);
    const user = await User.find(existingUser.email);
    expect(user.token).to.be.a('string');
    expect(user.token).to.equal(newToken);
  });

  it('should create venue record in the DB' , async () => {
    const venue = await Venue.create(newVenue);
    expect(venue).to.be.an('object');
    expect(venue.name).to.equal(newVenue.name);
    expect(venue.spotify_id).to.equal(newVenue.spotify_id);
    expect(venue.token).to.equal(newVenue.token);
  });

  it('should update venue token record', async () => {
    await Venue.updateToken(existingVenue.spotify_id, newToken);
    const venue = await Venue.find(existingVenue.name);
    expect(venue.token).to.be.a('string');
    expect(venue.token).to.equal(newToken);
  });

  it('should find venue associated with token', async () => {
    const venueRecord = await Venue.find(existingVenue.name);
    const venue = await Venue.getVenue(venueRecord.token);
    expect(venue.spotify_id).to.equal(existingVenue.spotify_id);
    expect(venue.name).to.equal(existingVenue.name);
  });

  it('should find user associated with token', async () => {
    const userRecord = await User.find(existingUser.email);
    const user = await User.authorize(userRecord.token);
    expect(user.email).to.equal(existingUser.email);
    expect(user.diamonds).to.equal(existingUser.diamonds);
  });

  it('should find a user current venue', async () => {
    const venueInfo: any = await Venue.getVenueToken(existingUser.email);
    const venue: any = await Venue.find(venueInfo.venue_id);
    expect(venue.token).to.equal(newToken);
  })
});
