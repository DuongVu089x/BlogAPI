const articleDao = require('../dao/article.dao');

module.exports = {
	createArticle(article, callback) {
		articleDao.createArticle(article, callback);
	},
	findArticleById(query, callback) {
        let query = {
            _id: id
        }

        articleDao.findArticleById(query, callback);
    },
	findArticleByHashTag(query, callback) {
		let query = {
			hashtags : hashTag
		}
		
		articleDao.findArticleByHashTag(query, callback);
	}
}