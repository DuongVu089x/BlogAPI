const mongoose = require('mongoose');
const Article = require('./../models/article');

module.exports = {
    findArticleById(query, callback) {
        Article.find(query, callback);
    },
    createArticle(article, callback) {
        article.save(callback);
    },
    findArticleByHashTag(query, callback) {
        Article.find({}, {
            hashtags: {
                $elemMatch: query
            }
        }, callback);
    }
}