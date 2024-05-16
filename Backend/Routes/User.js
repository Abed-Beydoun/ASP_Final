const express = require('express')
const auth = require('../Middleware/Authentication')

const router = express.Router()

//Controller Functions
const {
    userLogin,
    userSignup,
    editUserInfo,
    getUserInfo,
} = require('../Controllers/userController')

//Add student info
router.route('/user-info').put(auth, editUserInfo).get(auth, getUserInfo)

module.exports = router

/*
HTTP- Requests 
1- Method: GET|PUT|POST|DELETE|OPTION|PATCH|HEAD
2- Url: /login /signup
3- Body: data (heavy data / except for GET requests)
4- Query: data (small amount)
5- Headers: For example here lies our authorization, Authorization: Bearer token
*/
