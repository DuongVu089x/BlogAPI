var mongoose = require('mongoose');
var mongooseUniqueVaidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var schema = new Schema({
	myId: {
		type: Schema.Types.ObjectId,
        ref: 'User'
	},
	theirId: {
		type: Schema.Types.ObjectId,
        ref: 'User'
	}
});

module.exports = mongoose.model('Friend', schema);