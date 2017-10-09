const friendDao = require('../dao/friend.dao');

module.exports = {
    findListFriends(userId, callback) {
        let query = {
            myId: userId
        };
        friendDao.findListFriend(query, callback);
    }

}