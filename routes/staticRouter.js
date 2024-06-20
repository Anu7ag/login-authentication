const express = require('express')
const router = express.Router()
// const { signup } = require("../controller/user")
router.get("/", (req, res) => {
    return res.render("home")
})
router.get("/signup", (req, res) => {
    return res.render("signup")
})
router.get("/login", (req, res) => {
    return res.render("login1")
})



// router.route('/signup').get(signup)
module.exports = router