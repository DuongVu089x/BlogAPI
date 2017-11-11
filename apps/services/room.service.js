const roomDao = require('../dao/room.dao');

module.exports = {
    findRoomByUsers(users, callback) {
        let query = {
            users: {
                $all: users
            }
        };
        roomDao.findRoomByUsers(query, callback);
    },

    createRoom(users, callback) {
        roomDao.createRoom(users, callback);
    }
}