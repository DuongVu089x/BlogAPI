const mongoose = require('mongoose');
const Action = require('./../models/action');

module.exports = {
    createAction(action, callback) {
        action.save(callback);
    },

    findActionByArticle(article, callback) {
        let query = {
            article: article
        }

        Action.findOne(query, callback);
    }
}