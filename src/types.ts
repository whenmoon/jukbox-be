export interface Credentials {
  client_id: string,
  client_secret: string,
  redirect_uri: string
};

export interface Token {
  access_token: string
};

export interface ClosingTimes {
  Monday: string
  Tuesday: string
  Wednesday: string
  Thursday: string
  Friday: string
  Saturday: string
  Sunday: string
};

export interface SpotifyParams {
  type: string,
  refreshToken: string,
  token: string,
  song: string,
  volume: string,
  deviceId: string,
}