var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

module.exports = mongoose.model('Comment', schema);