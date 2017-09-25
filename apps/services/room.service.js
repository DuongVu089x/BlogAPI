const roomDao = require('../dao/room.dao');

module.exports = {
    findRoomByUsers(users, callback) {
        let query = {
            users: users
        };
        roomDao.findRoomByUsers(query, callback);
    },

    createRoom(room, callback) {
        roomDao.createRoom(room, callback);
    }
}