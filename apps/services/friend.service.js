const friendDao = require('../dao/friend.dao');

module.exports = {
    findListFriends(userId, callback) {
        let query = {
            ids: userId
        };
        friendDao.findListFriend(query, callback);
    }

}