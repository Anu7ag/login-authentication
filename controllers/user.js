const User = require('../models/User')
const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body
    await User.create({
        name,
        email,
        password,
    })
    return res.render("newuser")
}


const handleUserLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("relogin", { error: "Invalid Username or Password" })
    }
    res.render('shortid')
    //return res.redirect("/")
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
}
