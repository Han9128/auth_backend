
const User = require('../models/authModel');

const register = (req,res) => {
    try{
        const data = req.body;
        const user = new User(data);
        const registeredUser = user.save();
        res.status(201).json(registeredUser);
    } catch(err){
        console.error(`Error in registration ${err}`);
        res.status(400).json(`Error registering user ${err.message}`);
    }
}


module.exports = {
    register
}