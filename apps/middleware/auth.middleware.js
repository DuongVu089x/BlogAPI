const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('config');

const TOKENTIME = 60 * 60 * 24 * 30;

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id,
    }, config.get('secret_key'), {
        expiresIn: TOKENTIME // 30 days
    });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        email: req.user.email,
        _id: req.user.id,
        token: req.token
    });
}

module.exports = {
    generateAccessToken,
    respond
};