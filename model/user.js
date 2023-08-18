const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true,
        maxLength: 20,
    },
    phone: {
        required: true,
        type: String,
        unique: true,
        maxLength: 10,
        minLength: 10,
    },
    isAdmin: {
        required: true,
        type: Boolean,
    },
    password: {
        required: true,
        type: String,
        minLength: 6,
    },
});

const user = mongoose.model("user", usersSchema);

module.exports = user;