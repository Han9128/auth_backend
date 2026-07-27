
const Canvas = require('../models/canvasModel')

const getCanvases = async (req,res)=>{
    try{
        const userId = req.user.id;
        const canvases = await Canvas.find({
            $or:[
                {owner:userId},
                {sharedWith:userId}
            ]
        });

        return res.status(200).json({canvases});
    } catch(error){
        return res.status(500).json({error:error.message})
    }
}



module.exports = {
    getCanvases
}