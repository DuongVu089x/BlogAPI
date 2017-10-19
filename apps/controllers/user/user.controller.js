const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');

const authMiddleware = require('./../../middleware/auth.middleware');

const User = require('../../models/user');
const Room = require('../../models/room');
const userService = require('../../services/user.service');
const roomService = require('../../services/room.service');


const router = express.Router();

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

router.post("/register", (req, res) => {
    let params = req.body;
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'Email must be a valid email address').isEmail();
    req.checkBody('password', 'Password field is required').notEmpty();
    req.checkBody('confirmPassword', 'ConfirmPassword field is required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(params.password);
    let errors = req.validationErrors();

    if (errors) {
        res.status(500).json({
            title: "An erroroccurred",
            error: errors
        });
    } else {
        userService.findByEmail(params.email, (err, user) => {
            if (err) {
                return res.status(500).json({
                    title: "An erroroccurred",
                    error: err
                });
            }
            if (user == null) {
                userService.createUser(req, params, (err, account) => {
                    if (err) {
                        return res.status(500).send('An error occurred: ' + err);
                    }
                    passport.authenticate(
                        'local', {
                            session: false
                        })(req, res, () => {
                        res.status(200).json({
                            message: 'Successfully created new account'
                        });
                    });
                });
            } else {
                res.status(409).json({
                    title: "An erroroccurred",
                    message: 'Email is already exists'
                });
            }
        });

    }
});

router.post("/login", passport.authenticate('local', {
    session: false,
    scope: [],
    failureRedirect: 'error',
}), authMiddleware.generateAccessToken, authMiddleware.respond);

router.get('/error', (req, res) => {
    res.status(401).json({
        message: 'Invalid email or password'
    })
})

module.exports = router;