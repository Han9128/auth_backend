
const Canvas = require('../models/canvasModel')

const getCanvases = async (req,res)=>{
    try{
        const userId = req.user.id;
        const canvases = await Canvas.find({
            $or:[
                {owner:userId},
                {sharedWith:userId}
            ]
        }).populate('owner','-password'); // without populte this retunres only owner id, with populate it returns the entire user info and '-password' avoid password being returned

        return res.status(200).json({canvases});
    } catch(error){
        return res.status(500).json({error:error.message})
    }
}


const createCanvas = async (req,res)=>{
    try{
        const userId = req.user.id;
        const canvas = new Canvas({
            owner:userId,
            sharedWith:[],
            elements:[]
        })

        await canvas.save();
        return res.status(201).json({message:"Canvas creates sucessfully",canvasId:canvas._id})
    }catch(error){
        return res.status(500).json({error:"Failed to create canvas",detail:error.message})
    }
}



module.exports = {
    getCanvases,
    createCanvas
}