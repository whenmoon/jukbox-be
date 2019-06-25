import { Pool } from 'pg';
const host = 'localhost';
const database = 'jukbox';
export const port = 5432;

const pool = new Pool({host, database, port});

export default pool;