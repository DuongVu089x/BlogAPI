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
    createUser(req, params, callback) {
        User.register(new User({
            password: passwordEncoder.hashPassword(params.password),
            email: params.email
        }), req.body.password, callback);
    }
}