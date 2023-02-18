const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3000;
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });
      
const candidates = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"../../frontend/dist/frontend/"));

app.get('/candidate', (req, res) => {
  res.json(candidates);
});

app.post('/candidate/add', (req, res) => {
  const candidate = req.body;
  candidates.push(candidate);
  res.json(`Application added`);
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

app.use("/candidate/resume", function(request, response, next){
  next();
});

app.post('/candidate/resume', multipartMiddleware, (req, res)=>{
  res.json({'message':req.files});
});

app.use(function(err, req, res, next) {
  res.json({'error':err.message})
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});