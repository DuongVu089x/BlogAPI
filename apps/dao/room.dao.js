const mongoose = require('mongoose');
const Room = require('./../models/room');

module.exports = {
    findRoomByUsers(query, callback) {
        Room.find(query, callback);
    },

    createRoom(users, callback) {
        room = new Room({
            users: users
        });
        room.save(callback);
    }
}