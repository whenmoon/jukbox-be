import express from 'express';
import router from './router';
import passport from 'passport';
import cors from 'cors';

const app: express.Application = express();

app
  .use(cors())
  .use(router);

app.listen(4000, () => console.log('Server listening on port 4000'));
