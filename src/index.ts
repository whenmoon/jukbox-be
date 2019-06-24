import express from 'express';
import router from './router';
import cors from 'cors';

const app: express.Application = express();
app.use(cors());
app.use(router);
app.listen(4000, () => console.log('Server running'));
