const commentDao = require('../dao/comment.dao');

module.exports = {
	createComment(comment, callback) {
		commentDao.createComment(comment, callback);
	},
	
	deleteComment(query, callback) {
		commentDao.deleteComment(query, callback);
	},
	
	updateComment(comment, callback) {
		commentDao.updateComment(query, callback);
	}
}