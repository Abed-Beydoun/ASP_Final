const UserModel = require('../Models/userModel')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

/*Function that creates a token based on the id from mongodb,
  a secret key, and expires after 1 day.*/
const createToken = (payload) => {
    return jwt.sign(payload, process.env.Secret, { expiresIn: '1d' })
}

//User login
const userLogin = async (req, res) => {
    //Get email and password
    const { email, password } = req.body
    try {
        const doesExist = await UserModel.findOne({
            email,
        })
        if (!doesExist) {
            return res.status(404).json({
                message: 'User does not exist',
            })
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            doesExist.password,
        )
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Wrong email or password!',
            })
        }
        const payload = {
            _id: doesExist._id,
            email: doesExist.email,
            first_name: doesExist.first_name,
            last_name: doesExist.last_name,
        }
        const token = createToken(payload)
        return res.status(200).json({ email, token })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//User signup
const userSignup = async (req, res) => {
    //Get email and password from req body
    const { email, password, first_name, last_name } = req.body
    try {
        const doesExist = await UserModel.findOne({ email })
        if (doesExist) {
            return res.status(400).json({
                message: 'Email already exist!',
            })
        }
        const createdUser = await UserModel.create({
            email,
            password,
            first_name,
            last_name,
        })
        const payload = {
            _id: createdUser._id,
            email: createdUser.email,
            first_name: createdUser.first_name,
            last_name: createdUser.last_name,
        }
        const token = createToken(payload)
        return res.status(200).json({ email, token })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Edit user info
const editUserInfo = async (req, res) => {
    // Take input data from the request body
    const {
        major,
        finished_courses,
        days_of_unavailability,
        campus,
        number_of_electives,
        number_of_major,
    } = req.body
    try {
        return res.status(204).json({})
    } catch (error) {
        console.error('Error adding student information:', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

module.exports = { userSignup, userLogin, editUserInfo }
