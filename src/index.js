const express = require('express')
const http = require('http')
const path = require('path')
const app = express();
const socketio = require('socket.io')
const filter = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {generateLocationMessage} = require('./utils/messages')

const server= http.createServer(app)

const io = socketio(server);


const port = process.env.PORT || 8000

const publicDirectoryPath = path.join(__dirname, '../public')

//helps to serve the static files
app.use(express.static(publicDirectoryPath))

let count = 0;



io.on('connection',(socket)=>{

   console.log("connected to the server")


    socket.emit('welcome',generateMessage('Welcome!'))

    socket.broadcast.emit('messages', generateMessage('A new user has joined'))
    /*
    console.log("connection is alive")

    socket.emit('countUpdated',count)

    socket.on("increment",()=>{

        count++

        io.emit('countUpdated',count)
    })
    */

    socket.on('sendMessage', (messages,callback)=>{
        
        const filtering = new filter()
     
         if(filtering.isProfane(messages)){

                 return callback('Profanity is not allowed!')
         }

        io.emit('messages',generateMessage(messages))
        callback()
        
         
    })


    socket.on('disconnect', ()=>{
  
        io.emit('messages', generateMessage('left the connection'))

    })

    socket.on('sendLocation',(data,callback)=>{

   
        socket.broadcast.emit('locationMessage',data)
        callback()

    })

})

server.listen( port, ()=>{

    console.log("server is ready")
})


