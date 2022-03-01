const express = require('express');
const path = require('path');
// const noteData = require('./db/db.json')

const fs = require('fs');
const res = require('express/lib/response');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
   console.info(`did a thing`),
  res.sendFile(path.join(__dirname, '/db/db.json'))
}
);


app.post('/api/notes', (req, res) => {
  console.log(req)
}

);


// app.delete('/api/notes/:id', (req, res) => {
  
// }


app.listen(PORT, () =>
  console.log(`Serving static asset routes on http://localhost:${PORT}`)
);