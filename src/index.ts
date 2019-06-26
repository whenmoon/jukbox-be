import express from 'express';
import router from './router';
import passport from 'passport';
import cors from 'cors';
import { PORT } from './config/credentials';
const app: express.Application = express();

app
  .use(cors())
  .use(router);

app.listen(PORT, () => console.log('Server listening on port 4000'));
