const request = require('request-promise');

export const searchSpotify = (token: string, songName: string) => {
  const options: any = {
    url: `https://api.spotify.com/v1/search?q=${songName}type=track`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };
  return request.get(options);
}
