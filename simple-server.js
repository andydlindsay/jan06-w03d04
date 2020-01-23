const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.path);
  if (req.path !== '/hidden') {
    res.redirect('/hidden');
  }

  next();
  // return true;
});

app.use((req, res, next) => {
  const method = req.query._method;
  req.method = method;
});

app.get('/soups', (req, res) => {
  res.send('hello soup');
});

app.get('/hidden', (req, res) => {
  if (req.cookies.userId) {
    res.send('hidden resource');
  }
  res.redirect('/login');
});

app.listen(3300, () => {
  console.log('app running');
});
