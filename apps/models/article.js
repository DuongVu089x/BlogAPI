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
    hashtags: [{
        type: Schema.Types.ObjectId,
        ref: 'Hashtag'
    }],
    images: [{
        type: Schema.Types.String
    }]
});

module.exports = mongoose.model('Article', schema);