const mongoose = require('mongoose');
const User = require('./../models/user');

module.exports = {
    findByUserName(query, callback) {
        User.findOne(query, callback);
    },
    findByEmail(query, callback) {
        User.findOne(query, callback);
    },
    createUser(user, callback) {
        user.save(callback);
    }
}