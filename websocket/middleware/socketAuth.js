
const jwt = require('jsonwebtoken');

const socketAuth = (socket,next)=>{

    try{
        const header = socket.handshake.headers.authorization;
    
        if(!header || !header.startsWith("Bearer ")){
            return next(new Error("Unauthorized,token not found"));
        };
    
        const token = header.split(" ")[1];
        const decoded = jwt.verify(token,process.env.SECRET);
    
        socket.user = decoded;
        next();
    }catch(error){
        return next(new Error("Unauthorized"))
    }

}

module.exports = socketAuth;