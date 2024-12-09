const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req,res,next)=>{
    console.log('req body>>>>>>',req.headers['authorization']);
    const auth = req.headers[ 'authorization' ];
    if(!auth){
        return res.status(401).
        json( {message:"Unauthorized, JWT token is required!!"})
    }

    try {
        // const token = auth.split(' ')[1];
       const decoded = jwt.verify(auth, process.env.JWT_SECRET);
       console.log("+++++",decoded);
       req.user = decoded;
       next();
    } catch (error) {
        return res.status(403).
        json({message:"Unauthorized, JWT token is wrong or expired!!"});
    }
}

module.exports = {ensureAuthenticated}