const userDao = require('../dao/user.dao');

module.exports = {
    findByUserName(firstName, callback) {
        let query = {
            firstName: firstName
        };
        userDao.findByUserName(query, callback);
    }
}