const User = require('../Models/userModel');
const StudentInfo = require('../Models/studentInfoModel.js');
const jwt = require('jsonwebtoken');

/*Function that creates a token based on the id from mongodb,
  a secret key, and expires after 1 day.*/
const createToken = (_id) =>{
  return jwt.sign({_id},process.env.Secret,{expiresIn:'1d'});
};

//User login 
const userLogin = async(req,res)=>{
    //Get email and password
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        //Create token
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

//User signup
const userSignup = async(req,res)=>{
    //Get email and password from req body
    const {email, password} = req.body
    try{
        const user = await User.signup(email,password);
        //Create token
        const token = createToken(user._id);
        res.status(200).json({email,token});
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

//Add user info
const addUserInfo = async (req, res) => {
    // Take input data from the request body
    const {
        major,
        finished_courses,
        days_of_unavailability,
        campus,
        number_of_electives,
        number_of_major
    } = req.body;
    try {
        //Get user id from the request
        const user_id = req.user._id;
        //Add student info
        const studentInfo = await StudentInfo.create({major,
                                                      finished_courses,
                                                      days_of_unavailability,
                                                      campus,
                                                      number_of_electives,
                                                      number_of_major,
                                                      user_id});
        res.status(200).json(studentInfo);
    } catch (error) {
        console.error('Error adding student information:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {userSignup,userLogin,addUserInfo};