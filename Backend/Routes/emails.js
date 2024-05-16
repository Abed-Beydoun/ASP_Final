const express = require('express')
const router = express.Router()
const { sendContactUsEmail } = require('../Controllers/sendContactUsEmail')

router.post('/contact', sendContactUsEmail)

module.exports = router
