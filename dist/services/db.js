"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// const host = process.env.DB_HOST;
// const database = process.env.DB_DATABASE;
// export const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const connectionString = process.env.DATABASE_URL;
//const pool = new Pool({host, database, port});
const pool = new pg_1.Pool({
    connectionString: connectionString,
});
exports.default = pool;
