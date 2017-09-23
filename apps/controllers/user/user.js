const express = require("express");
const url = require("url");
const mongoose = require('mongoose');
const User = require('../../models/user');
const Message = require('../../models/message');
const Room = require('../../models/room');

const router = express.Router();

router.get("/", (req, res, next) => {
    Message.find((err, listMessage) => {
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

router.get("/list-message-by-user", (req, res) => {
    Message.find({
        user: mongoose.Types.ObjectId(req.query.id)
    }, (err, listMessage) => {
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

router.get("/list-user", (req, res) => {
    User.find((err, listUser) => {
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

router.post("/get-list-message-by-room", (req, res) => {
    let roomId = req.body.roomId;
    if (roomId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        Message.find({
            room: mongoose.Types.ObjectId(roomId)
        }, (err, listMessage) => {
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

router.post("/get-room", (req, res) => {
    let params = req.body;
    console.log(params);
    if (params.myId.trim().length === 0 || params.theirId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        Room.find({
            users: [params.myId, params.theirId]
        }, (err, room) => {
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

router.post("/create-room", (req, res) => {
    let params = req.body;
    console.log(params);
    if (params.myId.trim().length === 0 || params.theirId.trim().length === 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        let room = new Room({
            users: [params.myId, params.theirId]
        });
        room.save((err, result) => {
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

router.post("/create-message", (req, res) => {
    let params = req.body;
    console.log(params);
    if (params.content.trim().length === 0 || params.user.trim().length === 0 || params.room.trim().length == 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        let message = new Message({
            content: params.content,
            user: params.user,
            room: params.room
        });
        message.save((err, result) => {
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

router.post("/", (req, res) => {
    let params = req.body;
    if (params.message.trim().length == 0) {
        res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        User.findOne({
            email: '1234@gmail.com'
        }, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            let message = new Message({
                content: params.message,
                user: user
            });
            message.save((err, reuslt) => {
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