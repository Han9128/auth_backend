
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    canvas:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Canvas'
    },
    text:{
        type:String,
        required:true
    },
    position:{
        x:Number,
        y:Number
    }
},
{timestamps:true}
)


const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;