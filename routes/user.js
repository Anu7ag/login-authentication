const express = require('express')
const router = express.Router()
const { handleUserSignUp, handleUserLogin } = require('../controllers/user')
router.use(express.urlencoded({ extended: true }));

router.post("/", handleUserSignUp);
router.post("/login", handleUserLogin);


module.exports = router