const express = require('express');
const auth = require('../Middleware/Authentication');

const router = express.Router();

//Controller Functions
const {userLogin,userSignup,addUserInfo} = require('../Controllers/userController');

//Login route
router.post('/login',userLogin);

//Signup route
router.post('/signup',userSignup);

//Check authentication for routes
router.use(auth);

//Add student info
router.post('/addUserInfo',addUserInfo);

module.exports = router;
