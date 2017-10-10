const actionDao = require('../dao/action.dao');

module.exports = {
	createAction(action, callback) {
		actionDao.createAction(action, callback);
	},
	findActionByArticle(article, callback) {
        let query = {
            article: article
        }

        actionDao.findActionByArticle(query, callback);
    },
	
	findActionByType(type, callback) {
		let = query = {
			type: type
		}
		actionDao.findActionByType(query, callback);
	},
	
	deleteAction(query, callback) {
		actionDao.deleteAction(query, callback);
	}
	
}