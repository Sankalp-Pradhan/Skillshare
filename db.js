const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect("mongodb+srv://sankalppradhan1906:6a1knfMr6xBTQLNN<@cluster0.ked4nml.mongodb.net/Skillshare")


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

const userModel = moongoose.model("user", userSchema);
const adminModel = moongoose.model("user", adminSchema);
const courseModel = moongoose.model("user", courseSchema);
const purchaseModel = moongoose.model("user", purchaseSchema);


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}