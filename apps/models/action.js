const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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