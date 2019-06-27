import { createBearerHeaderOptions} from './spotifyAPIUtils'
const request = require('request-promise');
const btoa = require('btoa');
import { Spotify } from '../config/credentials';

export const getRefreshToken = (refreshToken: string) => {
  const options = {
    url: `https://accounts.spotify.com/api/token`,
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Authorization': 'Basic ' + btoa(<string>Spotify.client_id + ':' + <string>Spotify.client_secret)
    },
    json: true
  }
  return request.post(options);
}

export const transferPlayerPlayback = (token: string, deviceId: string) => {
  const options = {
    uri: 'https://api.spotify.com/v1/me/player',
    headers: createBearerHeaderOptions(token),
    body: {
      'device_ids': [deviceId],
      'play': false,
    },
    json: true
  }
  return request.put(options);
}


export const setPlayerPlay = (token: string, playlist: [string]) => {
  const options = {
    url: "https://api.spotify.com/v1/me/player/play",
    headers: createBearerHeaderOptions(token), 
    json: {
      "uris": playlist
    }
  }
  return request.put(options);
}


export const searchSpotify = (token: string, songName: string) => {
  const options = {
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
    headers: createBearerHeaderOptions(token)
  }
  return request.get(options);
};

export const setPlayerVolume = (token: string, volume: string) => {
  const options = {
    url: `https://api.spotify.com/v1/me/player/volume?volume_percent${volume}`,
    headers: createBearerHeaderOptions(token)
  }
  return request.put(options);
}













