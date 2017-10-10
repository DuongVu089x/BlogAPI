const mongoose = require('mongoose');
const Reply = require('./../models/reply');

module.exports = {
    createReply(reply, callback) {
        reply.save(callback);
    },

    deleteReply(query, callback) {
        Reply.deleteOne(query, callback);
    },

    updateReply(reply, callback) {
        reply.update(callback);
    }
}