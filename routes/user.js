//imported librarires
const bcrypt = require("bcrypt");
const {Router}  = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
require('dotenv').config();

//requiring userModel schema from db
const { userModel } = require("../db");
const userRouter = Router();

userRouter.post("/signup", async function (req, res) {
 
    //zod validation
    const StringField = z.string().min(3).max(100);
    const requireBody = z.object({
        email: StringField.email(),
        password: StringField,
        firstName: StringField,
        LastName: StringField
    })

    const parseDataWithSuccess = requireBody.safeParse(req.body);
    if (!parseDataWithSuccess.success) {
        res.json({
            message: "wrong input",
            error: parseDataWithSuccess.error
        })
        return
    }

    //adding bcrypt lib hash the password
    const { email, password, firstName, LastName } = parseDataWithSuccess.data;
    const hashedPassword = await bcrypt.hash(password, 5);
    console.log("code reached hashedPassword of user.js");

    const existingUser = await userModel.findOne({email : email });
    if(existingUser){
        return res.status(409).json({
            message : "user already exist"
        })
    }
    //harkirat told to put this is in try catch
    try {
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            LastName: LastName
        })
        res.json({
            message: "Signup Succeded"
        })

    } catch (error) {
        console.log("error during singup", error);
        return
    }


})

userRouter.post("/signin", function (req, res) {
    const {email,password} = req.body;

    const user = userModel.findOne({
        email : email,
        password : password,
    })

    if(user){
        const token = jwt.sign({
            id : user._id
        },process.env.JWT_SECRET)
    }
})
userRouter.get("/purchases", function (req, res) {
    res.json({
        message: 'USER'
    })
})


module.exports = {
    userRouter: userRouter
}