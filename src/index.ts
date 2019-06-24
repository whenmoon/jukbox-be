import express from 'express';
import router from './router';
require('dotenv').config()
const { PORT} = process.env;
const app: express.Application = express();

app.use(router);

app.listen(PORT, () => console.log('Server running'));
