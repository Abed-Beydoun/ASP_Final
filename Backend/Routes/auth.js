const express = require('express')
const router = express.Router()
const { userLogin, userSignup } = require('../Controllers/userController')

router.post('/login', userLogin)

router.post('/signup', userSignup)
module.exports = router

/*
Response 
1xx - Server config
2xx - All is good (Green), 200 (OK), 203 ,204 (No Content)
3xx - All is good with some modifications (Blue), 302 ,304
4xx - Bad Your fault (yellow), 400 (Bad request), 401 (Unauthorized), 402 (IDK), 403 (forbidden), 404 (Not found)
5xx - Bad Server's fault (red), 500 (Bad gateway)
*/
