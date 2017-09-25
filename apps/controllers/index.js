var express = require("express");
var User = require('../models/user');
var Message = require('../models/message');

var router = express.Router();

router.use("/api/user", require(__dirname + "/user/user"));

router.get('/', function (req, res) {
    Message.findById({
        _id: '59bff5f1be5bcc0a601f6576'
    }, function (err, message) {
        if (err) {
            res.json({
                'message': 'errr'
            });
        }
        console.log(message.user);
        User.findById({
            _id: message.user
        }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.json({
                email: user.email
            });
        });
    });
});


router.get('/insertUser', function (req, res) {
    User.findOne({
        email: '1234@gmail.com'
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: 'test111',
            user: user
        });
        message.save(function (err, reuslt) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.redirect('/');
        });
    });
});

module.exports = router;