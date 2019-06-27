import { getAPIOptions} from './spotifyAPIOptions'
const request = require('request-promise');

// only called when access token expires and 403 error on admin
export const getRefreshToken = (refreshToken: string) => {
  const options = getAPIOptions({
    type: 'Refresh',
    refreshToken,
    token: '',
    song: '',
    volume: '',
    deviceId: '',
    playlist: [''],
  })
  return request.post(options);
}

export const searchSpotify = (token: string, songName: string) => {
  const options = getAPIOptions({
    type: 'SearchSpotify',
    refreshToken: '',
    token,
    song: songName,
    volume: '',
    deviceId: '',
    playlist: [''],
  })
  return request.get(options);
};

export const setPlayerVolume = (token: string, volume: string) => {
  const options = getAPIOptions({
    type: 'PlayerVolume',
    refreshToken: '',
    token,
    song: '',
    volume,
    deviceId: '',
    playlist: [''],
  })
  return request.put(options);
}

export const resumePlayerPlayback = (token: string, playlist:[string]) => {
  const options = getAPIOptions({
    type: 'PlayResume',
    refreshToken: '',
    token,
    song: '',
    volume: '',
    deviceId: '',
    playlist: playlist,
  })
  return request.put(options);
}

export const pausePlayer = (token: string) => {
  const options = getAPIOptions({
    type: 'Pause',
    refreshToken: '',
    token,
    song: '',
    volume: '',
    deviceId: '',
    playlist: [''],
  })
  return request.put(options);
}

export const transferPlayerPlayback = (token: string, deviceId: string) => {
  const options = getAPIOptions({
    type: 'TransferPlayback',
    refreshToken: '',
    token,
    song: '',
    volume: '',
    deviceId,
    playlist: [''],
  })
  return request.put(options);
}











