const express = require("express");
const mongoose = require('mongoose');

const authMiddleware = require('./../../middleware/auth.middleware');

const userService = require('../../services/user.service');
const friendService = require('../../services/friend.service');

const router = express.Router();


router.post("/get-list-friend", (req, res) => {
    let params = req.body;
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    let errors = req.validationErrors();

    if (errors) {
        res.status(500).json({
            title: "An erroroccurred",
            error: errors
        });
    } else {
        userService.findByEmail(params.email, (err, user) => {
            if (err) {
                res.status(500).json({
                    title: "An erroroccurred",
                    error: errors
                });
            }
            if (user != null) {
                friendService.findListFriends(user._id, (err, friend) => {
                    res.json(friend);
                });
            }
        })
    }
});

module.exports = router;