const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const { userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const {adminRouter} = require("./routes/admin"); 
const app = express()


app.use("api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("api/v1/course",courseRouter );


/* 
async function main() {
       I kept the mongoose.connect on await cause if it isnt then users surely will send request succesfully but it may or may not reach the database so it ensures pls await below functions firstly let it connect to databse then only start the server
    

storing this string here is bad cause it contains some password store it into dotenv File

    await mongoose.connect("mongodb+srv://sankalppradhan1906:USZHtZewleRWUll0@cluster0.ked4nml.mongodb.net/skillshare")
    console.log("listening")
    
}
main()
 */

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        app.listen(3000)
    }    catch(error){
        console.error("MongoDB connected error :",error)
    }
}
connectDB();