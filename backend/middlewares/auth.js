const jwt = require('jsonwebtoken');
const {jwt_secret} = require('../config');

const auth = (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(403).json({msg:`no token or it does not starts with "Bearer "`});
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, jwt_secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Authentication error" });
            }
            req.user = decoded; // Attach decoded data to `req.user`
            next();
        });
        
    }catch(err){
        console.log(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports=auth;