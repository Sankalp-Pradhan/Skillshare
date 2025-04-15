const {Router} = require("express");
const adminRouter = Router();
const {adminModel, userModel} = require("../db")

// adminRouter.use(adminMiddleware)({

// })

adminRouter.post("/signup", function (req, res) {
    
})

adminRouter.post("/signin", function (req, res) {
    res.json({
        message : 'USER'
    })
})

adminRouter.post("/courses", function (req, res) {
    res.json({
        message : 'USER'
    })
})

adminRouter.put("/courses", function (req, res) {
    res.json({
        message : 'USER'
    })
})
adminRouter.get("/bulk", function (req, res) {
    res.json({
        message : 'USER'
    })
})

module.exports = {
    adminRouter : adminRouter
}