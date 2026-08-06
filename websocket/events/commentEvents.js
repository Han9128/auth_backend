
const Comment = require('../../models/commentModel');
const Canvas = require('../../models/canvasModel');

let commentData = {};

const commentEventsHandler = (socket) => {
    socket.on("writeComment", async ({ canvasId, comment }) => {
        try {
            const canvas = await Canvas.findById(canvasId);

            if (!canvas) {
                return socket.emit('unavailable', { message: "Canvas not found" });
            }

            const userId = socket.user.id;

            const canComment = canvas.owner._id.toString() === userId || canvas.sharedWith.some(id => id.equals(userId));

            if (!canComment) {
                return socket.emit("unauthorized", { message: "Not authorized to comment" })
            }

            const newComment = new Comment({author:userId,canvas:canvasId,text:comment.text,position:comment.position});
            await newComment.save();
            commentData[canvasId] = [...(commentData[canvasId] || []), newComment]
            socket.to(canvasId).emit("receiveComment", newComment);

        } catch (err) {
            socket.emit("commentError", { detail: err.message })
        }
    })
}

module.exports = {
    commentEventsHandler,
    commentData
}