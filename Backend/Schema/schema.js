const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true
    },
    location: {
        type : String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
})

const User = new mongoose.model("user", userSchema)
module.exports = User;