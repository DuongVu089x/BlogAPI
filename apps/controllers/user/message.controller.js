const express = require("express");
const url = require("url");
const mongoose = require('mongoose');
const passport = require('passport');

const messageService = require('../../services/message.service');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "Hello"
    });
})

module.exports = router;