var usersSvc = require('../services/users');
var fsSvc = require('../services/fileSystem');

var CONTROLLER_NAME = 'storage';

module.exports = {
    getDir: function (req, res, next) {
        var path = req.params.id || '/';
        if (path === '/' && !req.user) {
            path = '/public';
        }

        // var path = urlSafePath.replace(/%2F/g, '/');
        // path = path.replace(/%20/g, ' ');
        fsSvc.readDir(path)
            .then(function (filesAndFolders) {
                res.render(`${CONTROLLER_NAME}/dir-list`, filesAndFolders);
            }, function (err) {
                 req.session.error = err.toString();
                 res.redirect('/');
            });
    },
    getFile: function (req, res, next) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`<html><head></head><body>
               <h1>File download functionality not added yet!</h1>
            </body></html>`);
    }
};