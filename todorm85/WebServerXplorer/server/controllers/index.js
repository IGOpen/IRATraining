var UsersController = require('./UsersController');
var StorageController = require('./StorageController');
var FileTransferController = require('./FileTransferController');
var AdminController = require('./AdminController');
var StatisticsController = require('./StatisticsController');

module.exports = {
    users: UsersController,
    storage: StorageController,
    fileTransfer: FileTransferController,
    admin: AdminController,
    statistics: StatisticsController
};