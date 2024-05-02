const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentInfoSchema = new Schema({
    major: {
        type: String,
        required: true
    },
    finished_courses: {
        type: [String],
        required:true
    },
    days_of_unavailability: {
        type: [String],
        required:true
    },
    campus: {
        type: String,
        required: true
    },
    number_of_electives: {
        type: Number,
        required: true
    },
    number_of_major: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('studentInfo',studentInfoSchema);