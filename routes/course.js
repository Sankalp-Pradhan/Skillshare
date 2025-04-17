const {Router} = require("express");
const courseRouter = Router();
const { purchaseModel, courseModel } = require("../db")
const { userMiddleware } = require("../middlewares/user")

courseRouter.post("/purchase",async function(req,res){
    const userId = req.userId;
    const courseId =req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    },res.json({
        message : "succesfully purchased the course"
    }))
    
})

courseRouter.get("/preview", async function(req,res){
    const course = await courseModel.find({});
    res.json({
        message : "courses"
    })
})

module.exports = {
    courseRouter : courseRouter
}