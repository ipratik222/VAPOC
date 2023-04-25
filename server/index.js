const http=require("http");
const express =require("express");
const cors = require("cors");
const socket = require("socket.io");

const app=express();
const PORT=4500 || process.env.PORT ;


app.use(cors({origin:'http://localhost:3000/'}));
app.get("/test",(req,res)=>{
    res.send("HELL ITS WORKING");
})

const server=app.listen(PORT,()=>{
    console.log('server start at '+PORT);
}) 

const io=socket(server,{
    cors:{
        origin:'*'
    }
});

io.on('connection',(socket)=>{
    console.log(" user is connected");

    socket.on('selectedName',(name)=>{
        
        io.emit('updateChatBody',name);
    })
    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('receive_message',data);
    })    

    socket.on('disconnect',()=>{
        console.log('disconnect');
    })
})