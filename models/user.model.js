const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
        trim: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
        trim: true,
    },
    Age: {
        type: Number,
        required: true,
    },
}, { timestamps: true, })

module.exports = User = mongoose.model('user', UserSchema, 'users')