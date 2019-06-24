import { Pool } from 'pg';
import { User } from '../types';
import * as db from '../.env/db';

const pool = new Pool({
  user: db.USER,
  host: db.HOST,
  database: db.DATABASE,
  password: db.PASSWORD,
  port: db.PORT
});

exports.getPlaylist = async () => {
  return await pool.query(`SELECT * FROM playlist`);
};

exports.postUser = (user: User) => pool.query(`
  INSERT INTO users (email, name, diamonds)
  VALUES (${user.email}, ${user.name}, ${user.diamonds});
`);
