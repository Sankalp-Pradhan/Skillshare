const express = require("express");
// const mongoose = require("mongoose");
const {createUserRoutes, userRouter} = require("./routes/user")
const {createCourseRoutes} = require("./routes/course");
const { courseRouter } = require("./routes/course");
const app = express()
// mongoose.connect('')

app.use("api/v1/user", userRouter);
app.use("api/v1/course",courseRouter );


    
app.listen(3000)
