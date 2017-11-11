const mongoose = require('mongoose');
const User = require('./../models/user');

module.exports = {
    findById(query, callback) {
        User.findOne(query, callback);
    },
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