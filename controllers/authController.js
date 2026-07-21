
const bcrypt = require('bcrypt');

const User = require('../models/authModel');

const register = async (req,res) => {
    try{
        const data = req.body;
        // generate 10 rounds of salt
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        // hash the password with the generated salt
        const hashedPassword = await bcrypt.hash(data.password,salt);
        data.password = hashedPassword;
        console.log(data);
        const user = new User(data);
        const registeredUser = await user.save();
        res.status(201).json(registeredUser);
    } catch(err){
        console.error(`Error in registration ${err}`);
        res.status(400).json(`Error registering user ${err.message}`);
    }
}


module.exports = {
    register
}