const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3000;

const candidates = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"../../frontend/dist/frontend/"));

app.get('/candidate', (req, res) => {
  res.json(candidates);
});

app.post('/candidate', (req, res) => {
  const candidate = req.body.candidate;
  candidates.push(candidate);
  res.json("Application added");
});

/*app.get('/', (req,res) => {
    res.send('Welcome to the backend!!!');
});*/

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"../../frontend/dist/frontend/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});