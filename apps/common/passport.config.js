const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/user');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        User.authenticate()
    ));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}