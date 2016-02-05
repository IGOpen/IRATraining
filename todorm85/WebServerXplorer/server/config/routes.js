var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    //Admin
    app.get('/register', auth.isInRole('admin'), controllers.users.getRegister);
    app.post('/register', auth.isInRole('admin'), controllers.users.postRegister);

    app.get('/admin/users', auth.isInRole('admin'), controllers.admin.getAllUsers);

    app.post('/admin/user/edit/:id', auth.isInRole('admin'), controllers.admin.postEditUser);
    app.get('/admin/user/edit/:id', auth.isInRole('admin'), controllers.admin.getEditUser);

    app.post('/admin/user/delete/:id', auth.isInRole('admin'), controllers.admin.postDeleteUser);

    // USERS
    app.post('/login', auth.login);
    app.get('/login', controllers.users.getLogin);

    app.post('/reset-password', controllers.users.postResetPassword);
    app.get('/reset-password', controllers.users.getResetPassword);

    app.post('/change-password/:token', controllers.users.postChangePassword);
    app.get('/change-password/:token', controllers.users.getChangePassword);

    app.get('/logout', auth.isAuthenticated, auth.logout);

    // STORAGE
    app.get('/files', controllers.storage.getDir);
    app.get('/files/:id', controllers.storage.getDir);

    // FILE TRANSFER
    app.get('/upload-form', auth.isAuthenticated, controllers.fileTransfer.uploadForm);
    app.get('/upload-form/:id', auth.isAuthenticated, controllers.fileTransfer.uploadForm);
    app.post('/upload', auth.isAuthenticated, controllers.fileTransfer.upload);
    app.post('/upload/:id', auth.isAuthenticated, controllers.fileTransfer.upload);
    app.get('/download/:id', controllers.fileTransfer.download);

    //STATISTICS
    app.get('/statistics', controllers.statistics.getStatistics);
    // DEFAULT
    app.get('*', function (req, res) {
        res.render('index');
    });


};