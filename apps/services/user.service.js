const User = require('../models/user');
const userDao = require('../dao/user.dao');
const passwordEncoder = require('../common/password.encoder');

module.exports = {
    findByUserName(firstName, callback) {
        let query = {
            firstName: firstName
        };
        userDao.findByUserName(query, callback);
    },
    findByEmail(email, callback) {
        let query = {
            email: email
        };
        userDao.findByEmail(query, callback);
    },
    createUser(params, callback) {
        let user = new User({
            email: params.email,
            password: passwordEncoder.hashPassword(params.password)
        });
        userDao.createUser(user, callback);
    }
}