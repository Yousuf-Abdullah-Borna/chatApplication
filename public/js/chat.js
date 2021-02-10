const socket = io()


socket.on('welcome', ()=>{

    console.log("welcome to my browser")
})


socket.on('allMessage', (data)=>{

    console.log(data)
})



document.querySelector("#message-form").addEventListener('submit', (e)=>{

    //console.log("message form works")
    //const messages = document.querySelector('input').value;
    const messages = e.target.elements.message.value;
    //console.log(messages)

    socket.emit('sendMessage',messages)

    e.preventDefault();

})





