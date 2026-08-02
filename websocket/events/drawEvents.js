
const Canvas = require('../../models/canvasModel')

let canvasData = {};
const drawEventsHandler = (socket) => {
        socket.on('drawUpdate', async ({ canvasId, elements }) => {
            try{

                const canvas = await Canvas.findById(canvasId);
                if (!canvas) {
                    return socket.emit("unavailable", { message: "Canvas not found" });
                }
    
                const userId = socket.user.id;
                const canDraw = canvas.owner._id.toString() === userId || canvas.sharedWith.includes(userId)
    
                if (!canDraw) {
                    return socket.emit("unauthorized", { message: "Unauthorized to draw" })
                }
    
                canvasData[canvasId] = elements; // storing elements in memory too so that when a user join canvas we can load canvas using this very fast instead querying mongodb
                // Send updates to all users in this canvas room (except the sender)
                socket.to(canvasId).emit('receiveDrawUpdate', elements);
                await Canvas.findByIdAndUpdate(canvasId, { elements })
            }
            catch (err) {
                socket.emit("drawUpdateError", { detail: err.message })
            }
        })
}

module.exports = {
    drawEventsHandler,
    canvasData
}