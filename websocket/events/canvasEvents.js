const Canvas = require("../../models/canvasModel");


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
            console.log(`User with socket id ${socket.id} joined canvas ${canvasId}`)
            socket.emit("loadCanvas",{elements:canvas.elements})
        }catch(err){
            socket.emit("error",{detail:err.message})
        }
    })
}

module.exports = canvasEventHandler;