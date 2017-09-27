var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        equired: true
    },
});

module.exports = mongoose.model('Article', schema);