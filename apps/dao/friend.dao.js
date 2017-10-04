const mongoose = require('mongoose');
const Friend = require('./../models/friend');

module.export = {
    findFriendByName(query, callback) {
        Friend.findOne(query, callback);
    },

    createFriend(friend, callback) {
        friend.save(callback);
    },

    deleteFriend(query, callback) {
        Friend.deleteOne(query, callback);
    }
}