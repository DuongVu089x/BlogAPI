const friendDao = require('../dao/friend.dao');

module.exports = {
    findListFriends(userId, callback) {
        let query = {
            _id: userId
        };
        friendDao.findListFriend(query, callback);
    }

}