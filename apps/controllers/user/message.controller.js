const express = require("express");
const url = require("url");
const mongoose = require('mongoose');
const passport = require('passport');
const Message = require('../../models/message');
const messageService = require('../../services/message.service');

const router = express.Router();

router.post("/create-message", (req, res) => {
    let params = req.body;
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
});

module.exports = router;