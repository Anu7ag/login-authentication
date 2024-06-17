const express = require('express')
const router = express.Router()
const { handleURLGenerator, handleRedirect } = require("../controllers/url")


router.route('/').post(handleURLGenerator)
router.route('/:shortId').get(handleRedirect)

module.exports = router
