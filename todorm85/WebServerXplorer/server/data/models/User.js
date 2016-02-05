var mongoose = require('mongoose');
var encryption = require('../../services/encryption');

module.exports.init = function () {
    var userSchema = mongoose.Schema({
        username: {
            type: String,
            require: '{PATH} is required',
            unique: true
        },
        email: {
            type: String,
            require: '{PATH} is required',
            unique: true
        },
        salt: String,
        hashPass: String,
        roles: [String],
        token: String
    });

    userSchema.method({
        authenticate: function (password) {
            if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
                return true;
            } else {
                return false;
            }
        }
    });

    mongoose.model('user', userSchema);
};
