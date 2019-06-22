import express from 'express';
import router from './router';

const app: express.Application = express();
console.log(router)
app.use(router);

app.listen(4000, () => console.log('Server running'));
