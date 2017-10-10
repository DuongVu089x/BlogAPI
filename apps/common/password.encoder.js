const bcrypt = require('bcryptjs');
const config = require('config');

module.exports = {
    hashPassword(password) {
        var saltRounds = config.get('salt');
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    comparePassword(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}