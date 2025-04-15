//imported librarires
const bcrypt = require("bcrypt");   
const {Router} = require("express");
const {z} = require("zod");
const jwt = require("jsonwebtoken");

    //requiring userModel schema from db
const {userModel} = require("../db");


userRouter.post("/signup",async function (req, res) {
    //zod validation
    const requireBody = z.object({
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100).password(),
        firstName : z.string().min(3).max(100).firstName(),
        LastName : z.string().min(3).max(100).LastName()
    })
    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if(!parseDataWithSuccess.success){
        res.json({
            message : "wrong input",
            error : parseDataWithSuccess.error
        })
        return
    }
    
    //adding bcrypt lib hash the password
    const { email, password, firstName, LastName } = parsedDataWithSuccess.data;
    const hashedPassword = await bcrypt.hash(password,5);
    console.log("code reached hashedPassword of user.js");

    await userModel.create({
        email : email,
        password : hashedPassword,
        firstName : firstName,
        LastName : LastName
    })
    res.json({
        message: "Signup Succeded"
    })
})

userRouter.post("/signin", function (req, res) {
    res.json({
        message : 'USER'
    })
})
userRouter.get("/purchases", function (req, res) {
    res.json({
        message : 'USER'
    })
})


module.exports = {
    userRouter : userRouter
}