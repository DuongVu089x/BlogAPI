var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    type: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

module.exports = mongoose.model('Action', schema);