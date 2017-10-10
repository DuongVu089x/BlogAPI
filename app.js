const http = require('http');
const express = require('express');
const expressValidator = require('express-validator');
const logger = require('morgan');
const config = require('config');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const socketio = require('socket.io');
const passport = require('passport');
const expressJwt = require('express-jwt');

const mongoose = require('./apps/db/mongoose');

const app = express();
app.server = http.createServer(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('trust proxy', 1);

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

const controllers = require(__dirname + '/apps/controllers');

// Init passport
app.use(passport.initialize());
require('./apps/common/passport.config')(passport);

app.use(expressJwt({
    secret: config.get('secret_key'),
}).unless({
    path: ['/api/user/login', '/api/user/register']
}));

app.use((req, res, next) => {

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

// Error handler middleware
app.use(function (err, req, res, next) {
    return res.status(401).json({
        status: 'error',
        code: 'unauthorized'
    });
});

// Express Validator
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use('/', controllers);

const host = config.get('server.host');
const port = config.get('server.port');

const server = app.listen(port, host, () => {
    console.log("Server is running on port " + port);
});

const io = socketio(server);

const sockectControl = require("./apps/common/socketcontrol")(io);