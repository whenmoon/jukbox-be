import { Pool } from 'pg';
import { User } from '../types';

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432
});

exports.getPlaylist = async () => {
  return await pool.query(`SELECT * FROM playlist`);
};

exports.postUser = (user: User) => pool.query(`
  INSERT INTO users (email, name, diamonds)
  VALUES (${user.email}, ${user.name}, ${user.diamonds});
`);
