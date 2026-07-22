
const mongoose = require('mongoose');
const validator = require('validator') // for db validation at db side it validates the data before saving
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message: "Invalid Email Format"
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator: (value) => {
                const result = validator.isStrongPassword(value,{
                    minLength:8,
                    minLowercase:1,
                    minUppercase:1,
                    minNumbers:1,
                    minSymbols:1
                })
                return result
            },
            message: 'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.'
        }
    }
},{
    timestamps:true,
    collection: 'users'
})

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);

    // next(); this gives error in modern mongoose.
})

const User = mongoose.model('User',userSchema);

module.exports = User;