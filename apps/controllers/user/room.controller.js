const express = require("express");
const mongoose = require('mongoose');

const roomService = require('../../services/room.service');

const router = express.Router();

router.post("/get-room", (req, res) => {
    let params = req.body;
    req.checkBody('myId', 'Id field is required').notEmpty();
    req.checkBody('theirId', 'Id field is required').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        return res.status(500).json({
            title: "An erroroccurred",
            error: errors
        });
    } else {
        let users = [params.myId, params.theirId];
        roomService.findRoomByUsers(users, (err, room) => {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if (room.length > 0) {
                res.json({
                    roomId: room[0]._id
                });
            } else {
                res.json({
                    roomId: '-1'
                })
            }
        });
    }
});

router.post("/create-room", (req, res) => {
    let params = req.body;

    req.checkBody('myId', 'Id field is required').notEmpty();
    req.checkBody('theirId', 'Id field is required').notEmpty();
    let errors = req.validationErrors();

    if (errors || mongoose.Types.ObjectId.isValid(params.myId) == false || mongoose.Types.ObjectId.isValid(params.theirId) == false) {
        return res.status(500).json({
            title: "An erroroccurred",
            error: "Length must greater than 0"
        });
    } else {
        let users = [params.myId, params.theirId];
        roomService.createRoom(users, (err, room) => {
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
});

module.exports = router;