var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
var passport = require('passport');

module.exports = function (app, config) {

    app.locals.baseUrl = `http://localhost:${config.port}`;

    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(session({
        secret: 'magic unicorns',
        resave: true,
        saveUninitialized: true
    }));

    app.use(busboy({
        immediate: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public'));

    // CUSTOM MIDDLEWARE

    app.use(function (req, res, next) {
        var msg;
        
        if (req.session.error) {
            msg = req.session.error;
            req.session.error = undefined;
            res.locals.errorMessage = msg;
        }

        if (req.session.success) {
            msg = req.session.success;
       
            console.log(msg);

            req.session.success = undefined;
            res.locals.successMessage = msg;
        }

        next();
    });

    app.use(function (req, res, next) {
        if (req.user) {
            var user = req.user;
            user.isAdmin = user.roles.indexOf('admin') > -1;
            res.locals.currentUser = user;
        }

        next();
    });
};
