const mongoose = require('mongoose');
const Friend = require('./../models/friend');

module.exports = {

    findFriendByName(query, callback) {
        Friend.findOne(query, callback);
    },

    createFriend(friend, callback) {
        friend.save(callback);
    },

    deleteFriend(query, callback) {
        Friend.deleteOne(query, callback);
    },

    findListFriend(query, callback) {
        Friend.find(query, {
                _id: 0,
                ids: 1
            })
            .populate({
                path: 'ids',
                select: '_id email avatar'
            }).exec(callback);
        // .populate({
        //     path: 'myId',
        //     select: '_id'
        // })
        // .populate({
        //     path: 'theirId',
        //     select: 'email _id avatar'
        // }).exec(callback);
    }
}