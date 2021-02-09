const express = require('express')
const http = require('http')
const path = require('path')
const app = express();
const socketio = require('socket.io')

const server= http.createServer(app)

const io = socketio(server);


const port = process.env.PORT || 8000

const publicDirectoryPath = path.join(__dirname, '../public')

//helps to serve the static files
app.use(express.static(publicDirectoryPath))


io.on('connection',()=>{

    console.log("connection is alive")

})

server.listen( port, ()=>{

    console.log("server is ready")
})


