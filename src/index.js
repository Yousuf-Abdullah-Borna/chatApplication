const express = require('express')
const path = require('path')
const app = express();

const port = process.env.PORT || 8000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

app.listen( port, ()=>{

    console.log("server is ready")
})


