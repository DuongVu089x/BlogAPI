const mongoose = require('mongoose');
const config = require('config');

mongoose.Promise = global.Promise;

const host = config.get('mongoose.host');
const port = config.get('mongoose.port');
const database = config.get('mongoose.database');

mongoose.connect('mongodb://' + host + ':' + port + '/' + database, {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
    useMongoClient: true
});

module.exports = mongoose;