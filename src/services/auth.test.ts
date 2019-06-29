import 'mocha';
import chai from 'chai';
chai.should();
import { mockUser, mockVenue, mockUserVenue, mockVenueSong, deleteTableContents } from '../services/test-utils';

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