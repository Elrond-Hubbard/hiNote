const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const express = require('express')
const db = require(path.join(__dirname, '/db/db.json'))

const PORT = process.env.port || 3001
const app = express()

// MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))

// HTTP ROUTING
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// API ROUTING
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = crypto.randomUUID();
    db.push(newNote);
    const dbString = JSON.stringify(db, null, 2);
    writeToFile(path.join(__dirname, '/db/db.json'), dbString);
    console.log('POST deleted')
    res.send(`POST successful!`);
})
app.delete('/api/notes/:id', (req, res) => {
    const deleteNoteId = req.params.id;
    for (i = 0; i < db.length; i++) {
        if (db[i].id === deleteNoteId) {
            db.splice(i, 1)
        }
    }
    const dbString = JSON.stringify(db, null, 2)
    writeToFile(path.join(__dirname, '/db/db.json'), dbString)
    console.log('Note DELETED')
    res.send("DELETED")
})

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`)
)


// UTILITY
function writeToFile(path, file) {
    fs.writeFile(path, file, () => console.log('File write!'))
}