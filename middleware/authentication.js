
const jwt = require('jsonwebtoken');

const authenticateRoute = (req,res,next) => {
    const authHeaders = req.headers.authorization;
    const token = authHeaders && authHeaders.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:"invalid token"});
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET);

        if(!decoded){
            return res.status(401).json({message:'invalid token'});
        }

        req.user = decoded // user is not the key present in req object but we are creating a user key in req and assigning this the value retunred in decoded payload 
        next();
    }catch(error){
        return res.status(401).json({message:"invalid token"})
    }
}

module.exports = authenticateRoute;