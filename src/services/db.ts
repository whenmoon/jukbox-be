import { Pool } from 'pg';
const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
export const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

const pool = new Pool({host, database, port});

export default pool;
