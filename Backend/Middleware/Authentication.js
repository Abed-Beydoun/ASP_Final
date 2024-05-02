const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');


const auth = async(req,res,next) =>{
    //verify authentication
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'});
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, hellothisisthesecretkeyforasp);

        //Find user in database and return ID
        req.user = await User.findById(_id).select('_id');
        next();
    } catch (error) {
        console.error('Error getting id:', error.message);
        res.status(401).json({ error: 'Request not authorized' });
    }
};

module.exports = auth;