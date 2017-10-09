const mongoose = require('mongoose');
const Article = require('./../models/article');

module.exports = {
    createArticle(article, callback) {
        article.save(callback);
    },

    deleteArticle(query, callback) {
        Article.deleteOne(query, callback);
    }
}