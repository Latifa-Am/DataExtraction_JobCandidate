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

app.post('/candidate/add', (req, res) => {
  const candidate = req.body;
  candidates.push(candidate);
  res.json(`Application added ${candidate}`);
});

/*app.get('/', (req,res) => {
    res.send('Welcome to the backend!!!');
});*/

/**
 * In the production mode, we need to build angular project 
 * then, we can load the static assets with the node server
 */
app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"../../frontend/dist/frontend/index.html")
});


app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});