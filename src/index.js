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

let count = 0;



io.on('connection',(socket)=>{

   console.log("connected to the server")

    socket.emit('welcome')
    /*
    console.log("connection is alive")

    socket.emit('countUpdated',count)

    socket.on("increment",()=>{

        count++

        io.emit('countUpdated',count)
    })
    */

    socket.on('sendMessage', (messages)=>{
        
        io.emit('allMessage',messages)
         
    })

})

server.listen( port, ()=>{

    console.log("server is ready")
})


