
const bcrypt = require('bcrypt');

const User = require('../models/authModel');


// when we hash password here then one issue happens that to validator defined in model hashed password is passed
//  which pass the password validator becaused hashed password satisfy all constraints always. To avoid that 
// if we use model validate function here then it solves the issue but now validate called twice once on plain password 
// when we do data.validate() and next when we do data.save() which is ineffecient. So we use mongoose.pre('save') hook
// const register = async (req,res) => {
//     try{
//         const data = new User(req.body)
//         // validate the password
//         await data.validate();
//         // generate 10 rounds of salt
//         const salt = await bcrypt.genSalt(10);
//         console.log(salt);
//         // hash the password with the generated salt
//         const hashedPassword = await bcrypt.hash(data.password,salt);
//         data.password = hashedPassword;
//         console.log(data);
//         const registeredUser = await data.save();
//         res.status(201).json(registeredUser);
//     } catch(err){
//         console.error(`Error in registration ${err}`);
//         res.status(400).json(`Error registering user ${err.message}`);
//     }
// }


const register = async (req, res) => {
    try {
        const user = new User(req.body);

        const registeredUser = await user.save();

        res.status(201).json(registeredUser);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
};

module.exports = {
    register
}