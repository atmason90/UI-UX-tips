const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');
const notFound = require('./public/pages/404.html');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/feedback', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/pages/feedback.html'))
);

// GET route for returning diagnostics.json contents
app.get('/api/diagnostics', (req, res) => {
  fs.readFile('./db/diagnostics.json', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(data));
    }
  })
})

// POST route for api/diagnositcs -store info on invalid form submissions
app.post('/api/diagnostics', (req, res) => {

})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/pages/404.html')) 
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
