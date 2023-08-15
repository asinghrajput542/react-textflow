import {Server} from 'socket.io'

const port=9000
const io=new Server(port,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','PoST'],
    }
});

io.on('connection',socket=>{
    socket.on('send-changes',delta=>{
        socket.broadcast.emit('receive-changes',delta);
    console.log(delta)
})
});