//imported librarires
const bcrypt = require("bcrypt");
const { Router } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { adminMiddleware } = require("../middlewares/admin")

//requiring routers
const adminRouter = Router();
const { adminModel, userModel, courseModel } = require("../db");
const course = require("./course");

// adminRouter.use(adminMiddleware)({

// })

adminRouter.post("/signup", async function (req, res) {
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
    console.log("code reached hashedPassword of admin.js");

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return res.status(409).json({
            message: "user already exist"
        })
    }
    //harkirat told to put this is in try catch
    try {
        await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;


    const admin = await adminModel.findOne({//findone retuns either user or undefined
        //i was using find before but it returns a document and find returns an array hope my future julie would get it easily.
        email: email,
    })

    if (!admin) {
        res.status(403).json({
            message: "admin does not exist"
        })
        return
    }
    // password is hashed stored so we cant store directy
    const passowrdMatch = await bcrypt.compare(password, admin.password);

    //using bcrypt library to match the hashedpassword 
    if (passowrdMatch) {
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_admin_SECRET)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
})

adminRouter.post("/courses", adminMiddleware, function (req, res) {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body;

    courseModel.create({
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
        creatorId : adminId 
    })
    res.json({
        message : "course is created",
        courseId : course._id
    })

})

adminRouter.put("/courses" ,adminMiddleware, function (req, res) {
    res.json({
        message: 'USER'
    })
})
adminRouter.get("/bulk", function (req, res) {
    res.json({
        message: 'USER'
    })
})

module.exports = {
    adminRouter: adminRouter
}