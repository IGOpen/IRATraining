var mongoose = require('mongoose');
var encryption = require('../services/encryption');

var User = mongoose.model('user');

    User.find({username: 'admin'}, function (err, users) {
        if (users.length >0 || err) {
            return;
        }
        
        var newSalt = encryption.generateSalt();
        User.create({
            username: 'admin',
            email: 'admin@admin.bg',
            salt: newSalt,
            hashPass: encryption.generateHashedPassword(newSalt, 'admin'),
            roles: ['Admin'],
        }, function (err, result) {
            console.log(`Created ${result}`);
        });
    });