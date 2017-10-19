var express = require("express");

var router = express.Router();

router.use("/api/user", require(__dirname + "/user/user.controller"));
router.use('/api/message', require(__dirname + "/user/message.controller"));
router.use('/api/friend', require(__dirname + "/user/friend.controller"));
router.use('/api/room', require(__dirname + "/user/room.controller"));

module.exports = router;