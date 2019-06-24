
import { Spotify } from '../config/credentials';
const request = require('request-promise');
const btoa = require('btoa');

export const getRefreshToken = (refreshToken: string) => {
  const options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    headers: {
      'Authorization': 'Basic ' + btoa(<string>Spotify.client_id + ':' + <string>Spotify.client_secret)
    },
    json: true
  }
  return request.post(options);
}

export const searchSpotify = (token: string, songName: string) => {
  const options: any = {
    // this url has to be formatted, because now it sucks
    url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return request.get(options);
};
