var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Room', schema)