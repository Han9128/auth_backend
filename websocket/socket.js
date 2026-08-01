
const { Server } = require('socket.io');

// create http serve

//attach socket.io to the server


const setUpSocket = (server) => {
    const io = new Server(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('hello',(data)=>{
            console.log(data);
            const obj = JSON.parse(data);
            socket.emit(`welcome`,{
                message:`Welcome,${obj.name}`
            })
        })

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
        });
    });
}


module.exports = {
    setUpSocket
}



