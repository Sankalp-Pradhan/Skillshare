const mongoose = require('mongoose');
console.log("connected to")
const {Schema} = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const userSchema = new  Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    LastName : String, 
});

const adminSchema = new Schema({
    email : {type : String, unique : true},
    password : String,
    firstName : String,
    LastName : String, 
});

const courseSchema = new Schema({
    tittle : String,
    description : String,
    Price : Number,
    ImageUrl : String,
    creatorId : ObjectId
})

const purchaseSchema = new  Schema({
    userId : ObjectId,
    courseId : ObjectId
})

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}