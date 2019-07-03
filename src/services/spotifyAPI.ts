import { createBearerHeaderOptions } from './spotifyAPIUtils'
import { Venue } from '../models';

const request = require('request-promise');
const btoa = require('btoa');

export const renewAccessToken = async (venue: Venue) => {
  const newAccessToken = await getRefreshToken(venue.refresh);
  const newVenue = await Venue.updateTokens(venue.spotify_id, newAccessToken.access_token, venue.refresh);
  return newVenue.token;
};

const sendRequest = async (options: any, venue: Venue) => {
  try {
    return {
      token: null,
      request: await request.put(options)
    }
  } catch(err) {
    if (err.statusCode === 401) {
      const token: string = await renewAccessToken(venue);
      options.headers = createBearerHeaderOptions(token);
      return {
        token,
        request: await request.put(options)
      }
    } else {
      throw err;
    }
  }
};

export const getRefreshToken = (refreshToken: string) => {
  const options = {
    url: `https://accounts.spotify.com/api/token`,
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Authorization': 'Basic ' + btoa(<string>process.env.SPOTIFY_CLIENT_ID + ':' + <string>process.env.SPOTIFY_CLIENT_SECRET)
    },
    json: true
  };
  return request.post(options);
};

export const transferPlayerPlayback = (venue: Venue, deviceId: string) => {
  const options = {
    uri: 'https://api.spotify.com/v1/me/player',
    headers: createBearerHeaderOptions(venue.token),
    body: {
      'device_ids': [deviceId],
      'play': false,
    },
    json: true
  };
  return sendRequest(options, venue);
};


export const setPlayerToPlay = (venue: Venue, songToPlay: any) => {
  songToPlay = songToPlay ? '5c882VwvW0mlp82KaSk99W' : songToPlay;
  const options = {
    url: "https://api.spotify.com/v1/me/player/play",
    headers: createBearerHeaderOptions(venue.token),
    json: {
      "uris": [`spotify:track:${songToPlay}`]
    }
  };
  return sendRequest(options, venue);
};

export const searchSpotify = (token: string, songName: string) => {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
    headers: createBearerHeaderOptions(token),
    json: true
  }
  return songName && request.get(options);

};

export const setPlayerVolume = (venue: Venue, volume: string) => {
  const options = {
    url: `https://api.spotify.com/v1/me/player/volume?volume_percent${volume}`,
    headers: createBearerHeaderOptions(venue.token)
  };
  return sendRequest(options, venue);
};
