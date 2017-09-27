var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    image: {
        type: String,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }
});

module.exports = mongoose.model('Image', schema);