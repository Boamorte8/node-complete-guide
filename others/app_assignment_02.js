const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('In the first middleware!');
  next();
});

app.use('/users', (req, res, next) => {
  console.log('In the users middleware!');
  res.send('<h1>The "Users" page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('In the last middleware!');
  res.send('<h1>The main page</h1>');
});

app.listen(3000);