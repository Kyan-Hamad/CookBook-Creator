import express from 'express'
import cors from 'cors'
import upload from './upload.js';

// Server for uploading files
const server = express()

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload)

server.listen(8000, () => {
  console.log('Server started!')
})










