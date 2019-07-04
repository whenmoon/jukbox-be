import { createBearerHeaderOptions} from './spotifyAPIUtils'
import {  Venue} from '../models';

const request = require('request-promise');
const btoa = require('btoa');

export const renewAccessToken = async (venue: Venue) => {
  const newAccessToken = await getRefreshToken(venue.refresh);
  const newVenue = await Venue.updateToken(venue.spotify_id, newAccessToken)
  return newVenue;
}

export const getRefreshToken = (refreshToken: string) => {
  const options = {
    url: process.env.SPOTIFY_GET_REFRESH,
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Authorization': 'Basic ' + btoa(<string>process.env.SPOTIFY_client_id + ':' + <string>process.env.SPOTIFY_client_secret)
    },
    json: true
  };
  return request.post(options);
};

export const transferPlayerPlayback = (token: string, deviceId: string) => {
  const options = {
    uri: process.env.SPOTIFY_TRANSFER_PLAYBACK,
    headers: createBearerHeaderOptions(token),
    body: {
      'device_ids': [deviceId],
      'play': false,
    },
    json: true
  };
  return request.put(options);
};

export const setPlayerToPlay = (token: string, playlist: [any]) => {
  const options = {
    url: process.env.SPOTIFY_PLAY,
    headers: createBearerHeaderOptions(token),
    json: {
      "uris": playlist
    }
  };
  return request.put(options);
};

export const setPlayerToResume = (token:string) => {
  const options = {
    url: process.env.SPOTIFY_PLAY,
    headers: createBearerHeaderOptions(token),
  };
  return request.put(options);
}

export const setPlayerToPause = (token:string) => {
  const options = {
    url: process.env.SPOTIFY_PAUSE,
    headers: createBearerHeaderOptions(token),
  };
  return request.put(options);
}


export const searchSpotify = (token: string, songName: string) => {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
    headers: createBearerHeaderOptions(token),
    json: true
  }
  return request.get(options);
};

export const setPlayerVolume = (token: string, volume: string) => {
  const options = {
    url: process.env.SPOTIFY_VOLUME,
    headers: createBearerHeaderOptions(token)
  };
  return request.put(options);
};









