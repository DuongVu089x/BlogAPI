const mongoose = require('mongoose');
const Comment = require('./../models/comment');

module.exports = {
    createComment(comment, callback) {
        comment.save(callback);
    },

    deleteComment(query, callback) {
        Comment.deleteOne(query, callback);
    },

    updateComment(comment, callback) {
        comment.update(callback);
    }
}