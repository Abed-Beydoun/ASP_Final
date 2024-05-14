const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const dotenv = require('dotenv')
dotenv.config()
module.exports = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    const token = authorization.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.Secret)

        //Find user in database and return ID
        req.user = payload
        return next()
    } catch (error) {
        console.error('Error getting id:', error.message)
        return res.status(401).json({ error: 'Request not authorized' })
    }
}
