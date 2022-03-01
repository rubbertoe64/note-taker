const express = require('express');
const path = require('path');
const {v4 : uuidv4} = require('uuid')

// const noteData = require('./db/db.json')

const fs = require('fs');
const { response } = require('express');


const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => {
   
  JSON.stringify(res.sendFile(path.join(__dirname, '/db/db.json')))
}
);


app.post('/api/notes', (req, res) => {
  const createNote = req.body;
  createNote.id = uuidv4();

  let noteInfo = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))

  noteInfo.push(createNote)
  fs.writeFileSync('./db/db.json', JSON.stringify(noteInfo))
  

  
  res.json(noteInfo)

}

);


app.delete('/api/notes/:id', (req, res) => {
  let noteInfo = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'))
  let noteId = req.params.id;

  const noteIndex= noteInfo.map(note => note.id).indexOf(noteId)
  console.log(noteIndex);
  if (noteIndex >= 0) {
    noteInfo.splice(noteIndex, 1)
    console.log(noteInfo)
    fs.writeFileSync('./db/db.json', JSON.stringify(noteInfo))
    res.json(noteInfo)
  }else{
    res.status(404).send({
      message: 'Note Not Found'
    })
  }

  


});


app.listen(PORT, () =>
  console.log(`Serving static asset routes on http://localhost:${PORT}`)
);