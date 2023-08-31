import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({
    name: 'dread',
    age: 24,
    practiceTime: '5 years',
    devTechs: ['node', 'python', 'reactjs']
  });
});

app.listen(3000, () => console.log('server on port 3000!\n'));
