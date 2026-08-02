const Canvas = require("../../models/canvasModel");
const {canvasData} = require('./drawEvents');

const canvasEventHandler =  (socket) => {
    socket.on('joinCanvas',async ({canvasId})=>{
        try{
            const canvas = await Canvas.findById(canvasId);
    
            if(!canvas){
                return socket.emit("unavailable",{message:"The requested canvas not found"})
            }
            const userId = socket.user.id;
            const canJoinCanvas = canvas.owner._id.toString() === userId || canvas.sharedWith.includes(userId); 
            if(!canJoinCanvas){
                return socket.emit("unauthorized",{message:"Not authorized"});
            }
            socket.join(canvasId);
            console.log(`User with socket id ${socket.id} joined canvas ${canvasId}`);
            socket.emit("loadCanvas",{elements:canvasData[canvasId] || canvas.elements})
            
        }catch(err){
            socket.emit("joinCanvasError",{detail:err.message}) // emitting "error" event just drops the socket connection without emitting this error while if we use any other even name like "joinCanvasError" it does not drop the socket conneciton
        }

    })
}

module.exports = canvasEventHandler;