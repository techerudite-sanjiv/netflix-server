const jwt = require("jsonwebtoken");
const User=require("../models/User");

const checkUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(" ")[1]
   
            //verify token
            const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)

            //get user from token
            req.user = await User.findByPk(userId);
            next();
        } catch (error) {
            res.status(401).send({ "status": "failed", "message": "Unauthorized user" })
        }
    }
    if(!token){
        res.status(401).send({"status":"failed","Message":"unauthorized access"})
    }
}

module.exports= checkUserAuth;