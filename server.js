const path = require('path')
const express = require('express')
const PORT = process.env.port || 3001
const app = express()

app.use(express.static('public'))

// http routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// api routing
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'))
})

app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}`)
)