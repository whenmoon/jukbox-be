import express from 'express';

const app: express.Application = express();

const add = (a: number, b: number): number => a + b;

app.get('/', (req, res, next) => {
  console.log(add(5, 5));
  res.send('Hello');
});

app.listen(5000, () => console.log('Server running'));
