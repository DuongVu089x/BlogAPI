var mongoose = require('mongoose');
var mongooseUniqueVaidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    rooms:[{
        type : Schema.Types.ObjectId,
        ref: 'Room'
    }]
});

schema.plugin(mongooseUniqueVaidator);

module.exports = mongoose.model('User', schema);