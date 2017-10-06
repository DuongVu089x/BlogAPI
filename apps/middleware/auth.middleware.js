const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const TOKENTIME = 60 * 60 * 24 * 30;
const SECRET = "|)/\\/ |3|_()G";


module.exports = {
    authenticate() {
        return expressJwt({
            secret: SECRET
        });
    },

    generateAccessToken(req, res, next) {
        req.token = req.token || {};
        req.token = jwt.sign({
            id: req.user.id
        }, SECRET, {
            expiresIn: TOKENTIME
        });
        next();
    },

    respond(req, res) {
        res.status(200).json({
            user: req.user.email,
            token: req.token
        });
    }
}