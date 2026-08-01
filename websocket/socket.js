
const { Server } = require('socket.io');
const canvasEventHandler = require('./events/canvasEvents');
const socketAuth = require('./middleware/socketAuth')

// create http serve

//attach socket.io to the server


const setUpSocket = (server) => {
    const io = new Server(server, { cors: { origin: '*' } });

    io.use(socketAuth)
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        canvasEventHandler(socket);

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
        });
    });
}


module.exports = {
    setUpSocket
}



