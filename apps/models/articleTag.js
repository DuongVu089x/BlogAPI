var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    hashtag: {
        type: Schema.Types.ObjectId,
        ref: 'Hashtag'
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

module.exports = mongoose.model('ArticleTag', schema);