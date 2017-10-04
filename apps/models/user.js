const mongoose = require('mongoose');
const mongooseUniqueVaidator = require('mongoose-unique-validator');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

let schema = new Schema({
    firstName: {
        type: String,
        //required: true
    },
    lastName: {
        type: String,
        //required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

schema.plugin(mongooseUniqueVaidator);
schema.plugin(passportLocalMongoose, {
    usernameField: 'email',
    errorMessages: {
        MissingPasswordError: "No message",
        MissingUsernameError: "No username"
    }
});

module.exports = mongoose.model('User', schema);