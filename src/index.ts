import express from 'express';
import router from './router';
import passport from 'passport';

const app: express.Application = express();


app.use(passport.initialize());
app.use(router);
app.listen(4000, () => console.log('Server running'));
