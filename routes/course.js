const {Router} = require("express");
const courseRouter = Router();


courseRouter.post("/purchases", function(req,res){
    res.json({
        message : 'COURSE'
    })
})

courseRouter.get("/preview", function(req,res){
    res.json({
        message : "preview"
    })
})

module.exports = {
    courseRouter : courseRouter
}