const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3000;

const users = [];

app.use(bodyParser.json());

app.get('/candidate', (req, res) => {
  res.json(users);
});

app.post('/candidate', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("Application added");
});

app.get('/', (req,res) => {
    res.send('Welcome to the backend!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});