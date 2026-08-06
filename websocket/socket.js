
const { Server } = require('socket.io');
const canvasEventHandler = require('./events/canvasEvents');
const {drawEventsHandler} = require('./events/drawEvents')
const {commentEventsHandler} = require('./events/commentEvents')
const socketAuth = require('./middleware/socketAuth')

// create http serve

//attach socket.io to the server


const setUpSocket = (server) => {
    const io = new Server(server, { cors: { origin: '*' } });

    io.use(socketAuth)
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        canvasEventHandler(socket);
        drawEventsHandler(socket);
        commentEventsHandler(socket);

        socket.on('disconnect', (reason) => {
            console.log('user disconnected', socket.id, reason)
        });
    });
}


module.exports = {
    setUpSocket
}







