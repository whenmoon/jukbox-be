import path from 'path';
import 'mocha';
import chai from 'chai';
chai.should();
import { User, Venue, VenueSong, UserVenue } from '../models';
const expect  = chai.expect;
import pool, { port } from './db';
import { createTables, existingUser, newUser, existingVenue, newVenue, newToken} from './auth-test-utils';

const request = require('supertest');
const server = request.agent('http://localhost:4000');
const SpotifyStrategy = require('passport-spotify').Strategy;
const MockStrategy = require('passport-mock-strategy');


const strategyCallback = (accessToken:string, refreshToken:string, profile:string, done:any) => { 
  const venue = {
    id: 1,
    name: 'Codeworks',
    spotify_id: 1170537226,
    token:'BQDOoBxcfhThYHsfSYtG_uWlhr3bYlntXIxQJ0n2FNsVhlf8egcuLiHopWM62zW3xo8bFudSC7uU9qQ4QLfPSv9WvXXbBRjPi4hopb0-6ugscKmqqRDW34JILtvZFTqPyObej7Q9Q_MyKPFCF1TLi6GXgEz0I7zE',
    ticket_def: 1
  }
  done(null,venue);
}

beforeEach(() => {
const strategy = new MockStrategy('spotify', strategyCallback)});


describe('Spotify passport authentication', () => {

  // it(`should redirect when finished`, () => {
  //   server
  //     .get('/login/admin/redirect')
  //     .redirects(1)
  //     .expect((res:any) => {
  //       console.log(res.headers);
  //     })
  // });


})


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
    const venue = await Venue.authorize(venueRecord.token);
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
