
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

const loadCanvas = async (req,res)=>{
    try{
        const canvasId = req.params.id;
        const userId = req.user.id;
        
        const canvas = await Canvas.findById(canvasId);
        if(!canvas){
            return res.status(404).json({error:"Canvas not found"})
        };
        if(canvas.owner._id.toString() !== userId && !canvas.sharedWith.includes(userId)){
            return res.status(401).json({error:"Unauthorized to access this canvas"})
        }

        return res.status(200).json({canvas,message:"canvas found"})
    }catch(error){
        return res.status(500).json({error:"Failed to load canvas",detail:error.message})
    }
}

const updateCanvas = async (req,res)=>{
    const userId = req.user.id;

    try{
        const canvasId = req.params.id;
        const canvas = await Canvas.findById(canvasId);

        if(!canvas){
            return res.status(404).json({error:"Canvas not found"})
        }

        const canEdit = canvas.owner._id.toString() === userId || canvas.sharedWith.some(id=>id.equals(userId))

        if(!canEdit){
            return res.status(403).json({error:"Unauthorized to access"})
        }

        canvas.elements = req.body.elements;
        await canvas.save();

        return res.status(200).json({message:"Canvas Updated"})
    } catch(error){
        return res.status(500).json({error:"Failed to update canvas",detail:error.message})
    }
}

module.exports = {
    getCanvases,
    createCanvas,
    loadCanvas,
    updateCanvas
}