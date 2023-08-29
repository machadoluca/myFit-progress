import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ name: 'lucas' });
});

app.listen(3000, () => console.log('server on port 3000!'));
