import { Credentials } from '../types';

export const Google: Credentials = {
  client_id: '670283342299-nqdeklnghobvuq349kuj6fk6do8259ku.apps.googleusercontent.com',
  client_secret: 'PEjg93xiOWEcPscxte4O-lk4',
  redirect_uri: 'http://localhost:4000/login/user/redirect'
};

export const Spotify: Credentials = {
  client_id: "9cfd15b389034fb09af0f1eca99613e8",
  client_secret: "d086e0f316a6403c92bec5f0c3624690",
  redirect_uri: "http://localhost:4000/login/admin/redirect"
}

export const PORT: number = 4000;
