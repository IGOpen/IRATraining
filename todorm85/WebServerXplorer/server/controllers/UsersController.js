var users = require('../services/users');

var CONTROLLER_NAME = 'users';

module.exports = {
    getLogin: function (req, res) {
        res.render(`${CONTROLLER_NAME}/login`);
    },
    getRegister: function (req, res) {
        res.render(`${CONTROLLER_NAME}/register`);
    },
    postRegister: function (req, res) {
        var newUserData = req.body;

        users.create(newUserData)
            .then(function (message) {
                req.session.success = message;
                res.redirect('/');
            })
            .catch(function (err) {
                req.session.error = 'Failed to register new user.' +
                    ' Perhaps already registered.' +
                    '\r\nerror: ' + err.errmsg;
                res.redirect('/');
            })
    },
    getResetPassword: function (req, res) {
        res.render(`${CONTROLLER_NAME}/reset-password`);
    },
    postResetPassword: function (req, res) {
        var email = req.body.email;
        var link = req.headers.host + '/change-password/';

        users.setResetPasswordToken(email, link)
            .then(function () {
                req.session.success = 'Mail have been send to your mailbox';
                res.redirect('/');
            })
            .catch(function () {
                req.session.error = 'E-mail don\'t exist';
                res.redirect('/');
            });
    },
    getChangePassword: function (req, res) {
        var userToken = req.params.token;

        users.getUserByToken(userToken)
            .then(function (user) {
                res.render(`${CONTROLLER_NAME}/change-password`, {id: user._id});
            })
            .catch(function (err) {
                req.session.error = 'Something bad happen.' +
                    '\r\nerror: ' + err;
                res.redirect('/login');
            });
    },
    postChangePassword: function (req, res) {
        var userData = req.body;

        if (userData.password != userData.confirmPassword) {
            req.session.error = 'Passwords do not match';
            return res.redirect('/change-password/' + req.params.token);
        }

        users.changePassword(userData)
            .then(function () {
                req.session.success = 'Password changed!';
                res.redirect('/login');
            })
            .catch(function (err) {
                req.session.error = 'Failed to change password.' +
                    '\r\nerror: ' + err;
                res.redirect('/');
            });
    }
};
