var express = require("express");
var User = require('../models/user');
var Message = require('../models/message');

var router = express.Router();

router.use("/api/user", require(__dirname + "/user/user.controller"));
router.use('/api/message', require(__dirname + "/user/message.controller"));

module.exports = router;