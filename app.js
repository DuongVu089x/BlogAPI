var express = require('express');
var logger = require('morgan');
var config = require('config');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var socketio= require('socket.io');

var app = express();
mongoose.connect('localhost:27017/blog', {
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('trust proxy', 1);

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

var controllers = require(__dirname + '/apps/controllers');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', controllers);

var host = config.get('server.host');
var port = config.get('server.port');

var server = app.listen(port, host, function () {
    console.log("Server is running on port " + port);
});

var io = socketio(server);

var sockectControl = require("./apps/common/socketcontrol")(io);