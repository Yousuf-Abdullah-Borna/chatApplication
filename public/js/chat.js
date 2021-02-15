const socket = io()


//Elements
const $messageForm       =document.querySelector("#message-form")
const $messageFormInput  =$messageForm.querySelector('input')
const $messageFormButton =$messageForm.querySelector('button')
const $sendLocationButton=document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//Template
let messageTemplate = document.querySelector('#message-template').innerHTML
let locationMessageTemplate = document.querySelector("#location-message-template").innerHTML

socket.on('messages', (data)=>{

    console.log(data.text)
    
    const html = Mustache.render(messageTemplate,{

         message:data.text,
         time: moment(data.createdAt).format('h:mm A')
    })
    $messages.insertAdjacentHTML('beforeend', html)

})


//locationMessage

socket.on('locationMessage', (url) =>{

    console.log(url)
   let newUrl = "https://www.google.com/maps?q="+url.lat+","+url.long

    const html = Mustache.render(locationMessageTemplate,{

        url:newUrl
   })
   $messages.insertAdjacentHTML('beforeend', html)

   
})


socket.on('allMessage', (data)=>{

    console.log(data.lat)
})



$messageForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled')
    

    //console.log("message form works")
    //const messages = document.querySelector('input').value;
    const messages = e.target.elements.message.value;
    //console.log(messages)

    socket.emit('sendMessage',messages, (error)=>{

        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value= ""
        $messageFormInput.focus()
        if(error){
            return console.log(error)
        }

        console.log('message delivered!')
    })

   

})

document.querySelector('#send-location').addEventListener('click',()=>{

   
    if(!navigator.geolocation){

          return alert("Geolocation is not supported by your browser")
    }

    $sendLocationButton.setAttribute('disabled','disabled' )

    navigator.geolocation.getCurrentPosition( (position)=>{

    console.log(position)

         socket.emit('sendLocation',{
             
            lat: position.coords.latitude,
            long: position.coords.longitude},()=>{
                $sendLocationButton.removeAttribute('disabled','disabled' )
                console.log('location shared!')
           })
    })

})




