const {Router} = require("express");
const userRouter = Router();


userRouter.post("/user/signup", function (req, res) {
    res.json({
        message : 'USER'
    })

})

userRouter.post("/user/signin", function (req, res) {
    res.json({
        message : 'USER'
    })
})
userRouter.get("/user/purchases", function (req, res) {
    res.json({
        message : 'USER'
    })
})


module.exports = {
    userRouter : userRouter
}