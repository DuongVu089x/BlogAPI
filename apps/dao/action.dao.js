const mongoose = require('mongoose');
const Action = require('./../models/action');

module.exports = {
    createAction(action, callback) {
        action.save(callback);
    },

    findActionByArticle(article, callback) {
        Action.findOne(article, callback);
    },
	
	findActionByType(type, callback) {
		Action.findOne(type, callback);
	},
	
	deleteAction(query, callback) {
		Action.deleteOne(query, callback);
	}
}