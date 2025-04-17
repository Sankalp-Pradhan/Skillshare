const jwt = require("jsonwebtoken");
require('dotenv').config();

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_admin_SECRET)

    if(decoded){
        req.adminId = decoded.id;
        next()
    }else{
        res.status(403).json({
            message : "you are signed in"
        })
    }
}

module.exports = {
    adminMiddleware
}