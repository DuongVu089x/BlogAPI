const mongoose = require('mongoose');
const Room = require('./../models/room');

module.exports = {
    findRoomByUsers(query, callback) {
        Room.find(query, callback);
    },

    createRoom(room, callback) {
        room.save(callback);
    }
}