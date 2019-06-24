export interface GoogleCredentials {
  client_id: string,
  client_secret: string,
  redirect_uri: string
};

export interface UserType {
  id: string,
  name: string,
  email: string,
  tickets: number,
  diamonds: number
};

export interface Token {
  access_token: string
};
