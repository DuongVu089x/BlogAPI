var express = require("express");
var url = require("url");
var mongoose = require('mongoose');
var User = require('../../models/user');
var Message = require('../../models/message');
var Room = require('../../models/room');

var router = express.Router();

// router.get("/:room", function (req, res, next) {
//     console.log(req.params.room);
//     Message.find(function (err, listMessage) {
//         if (err) {
//             return res.status(500).json({
//                 title: 'An error occurred',
//                 error: err
//             });
//         }
//         res.json({
//             listMessage: listMessage
//         });
//     });
// });

router.get("/", function (req, res, next) {
    Message.find(function (err, listMessage) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.json({
            listMessage: listMessage
        });
    });
});

router.get("/list-message-by-user", function (req, res) {
    Message.find({
        user: mongoose.Types.ObjectId(req.query.id)
    }, function (err, listMessage) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.json({
            listMessage: listMessage
        });
    });
});

router.get("/list-user", function (req, res) {
    User.find(function (err, listUser) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.json({
            listUser: listUser
        })
    });
});

router.post("/get-list-message-by-room", function (req, res) {
    var roomId = req.body.roomId;
    if (roomId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        Message.find({
            room: mongoose.Types.ObjectId(roomId)
        }, function (err, listMessage) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.json({
                listMessage: listMessage
            });
        });
    }
})

router.post("/get-room", function (req, res) {
    var params = req.body;
    console.log(params);
    if (params.myId.trim().length === 0 || params.theirId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        Room.find({
            users: [params.myId, params.theirId]
        }, function (err, room) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log(room);
            if (room.length > 0) {
                res.json({
                    roomId: room[0]._id
                });
            } else {
                res.json({
                    roomId: -1
                })
            }
        });
    }
});

router.post("/create-room", function (req, res) {
    var params = req.body;
    console.log(params);
    if (params.myId.trim().length === 0 || params.theirId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        var room = new Room({
            users: [params.myId, params.theirId]
        });
        room.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                roomId: room._id
            });
        });
    }
})

router.post("/create-message", function (req, res) {
    var params = req.body;
    console.log(params);
    if (params.content.trim().length === 0 || params.user.trim().length === 0 || params.room.trim().length == 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        var message = new Message({
            content: params.content,
            user: params.user,
            room: params.room
        });
        message.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
        });
        res.status(200).json({
            title: 'success'
        });
    }
})

router.post("/", function (req, res) {
    var params = req.body;
    if (params.message.trim().length == 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
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
                content: params.message,
                user: user
            });
            message.save(function (err, reuslt) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200);
            });
        });
    }
});

module.exports = router;