
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

const connectDb = async ()=>{
    try{
        await mongoose.connect(url)
        console.log(`Connected the Db succesfully!`)
    } catch(err){
        console.log(`Error occured in db connection ${err}`);
    }
}

module.exports = connectDb;