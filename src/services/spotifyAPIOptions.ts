
import { Spotify } from '../config/credentials';
import { SpotifyParams } from '../types';
const btoa = require('btoa');

export const getAPIOptions = (params: SpotifyParams) => {
  switch (params.type) {
    case 'Refresh':
      createRefreshTokenOptions(params.refreshToken);
    case 'SearchSpotify':
      createSpotifyPlayerOptions(params.type, params.token, params.song);
    case 'PlayerVolume':
      createSpotifyPlayerOptions(params.type, params.token,params.volume);
    case 'PlayResume':
      createSpotifyPlayerOptions(params.type, params.token,'undefined');
    case 'TransferPlayback':
      createTransferPlaybackOptions(params.token, params.deviceId);
  }
};

const createSpotifyPlayerOptions = (paramType: string, token: string, urlParam: string) => {
  return {
    url: getUrl(paramType, urlParam),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
};

const createRefreshTokenOptions = (refreshToken: string) => {
  return {
    url: process.env.RefreshTokenUrl,
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    },
    headers: {
      'Authorization': 'Basic ' + btoa(<string>Spotify.client_id + ':' + <string>Spotify.client_secret)
    },
    json: true
  }
};

const createTransferPlaybackOptions = (token:string, deviceId:string) => {
  return {
    uri: 'https://api.spotify.com/v1/me/player',
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'device_ids': [deviceId],
      'play': false,
    })
  }
} 

const getUrl = (optionsType: string, Parameter: string) => {
  switch (optionsType) {
    case 'SearchSpotify':
      return `https://api.spotify.com/v1/search?q=${Parameter}&type=track`;
    case 'PlayerVolume':
      return `https://api.spotify.com/v1/me/player/volume?volume_percent${Parameter}`;
    case 'PlayResume':
      return `https://api.spotify.com/v1/me/player/play`;
  }
};








