const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    first_name: {
        type: String,
        required: [true, 'First name is required'],
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
    },
    major: {
        type: String,
        required: [true, 'Major is required'],
        default: ' ',
    },
    finished_courses: {
        type: [String],
        required: [true, 'Finished courses is required'],
        default: [],
    },
    days_of_unavailability: {
        type: [String],
        required: [true, 'Days of availability is required'],
        default: [],
    },
    campus: {
        type: String,
        required: [true, 'Campus is required'],
        default: ' ',
    },
    number_of_electives: {
        type: Number,
        required: [true, 'Number of elective credits is required'],
        default: 0,
    },
    number_of_major: {
        type: Number,
        required: [true, 'Number of major credits is required'],
        default: 0,
    },
})
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})
module.exports = mongoose.model('user', userSchema)
