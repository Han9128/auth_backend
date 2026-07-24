
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/authRoute');
// this must be before importng db otherwiser it is does not provide .env variable to db.js file
const connectDb = require('./config/db')

const PORT = process.env.PORT || 3000;



const app = express();

connectDb();

app.use(cors());
app.use(express.json());


app.use('/api',router);

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`)
});

