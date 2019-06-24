export interface Credentials {
  client_id: string,
  client_secret: string,
  redirect_uri: string
};

export interface Token {
  access_token: string
};

export interface User {
  email: string
  token?: string
  name: string
  diamonds: number
};

export interface UserVenue {
  id?: string
  userEmail: string
  venueName: string
  tickets: number
  diamonds: number
};

export interface Venue {
  name: string
  token?: string
  ticket_default_no: number
  closing_times?: ClosingTimes
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

export interface PlaylistItem {
  song: string
  userEmail: string
  venueName: string
  diamonds?: number
  submission?: string
};
