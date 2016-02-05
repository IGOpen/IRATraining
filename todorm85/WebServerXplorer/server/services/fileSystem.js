var fs = require('fs');
var pathSvc = require('path');

var BASE_DIR = './files';

module.exports = {

    createDir: function (path, dirName) {
        dirName = dirName || '';

        try {
            fs.mkdirSync(BASE_DIR + path + dirName);
        } catch (e) {
            console.log(e);
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }
    },

    saveFile: function (file, path, filename) {var fullPath = pathSvc.join(BASE_DIR, path);
        fullPath = pathSvc.join(fullPath, filename);

        return new Promise(function (resolve, reject) {
            fs.stat(fullPath, function (err, stats) {

                if (stats) {
                    reject(`File ${filename} exists! This file was not uploaded!`);
                }

                var fstream = fs.createWriteStream(fullPath);
                file.pipe(fstream);

                file.on('end', function () {
                    resolve(`File ${filename} saved!`);
                });

                fstream.on('error', function (err) {
                    reject(err);
                });
            });

        });
    },

    // returns a list of dirs and files
    readDir: function (path) {

        path = path || '';
        if (path === '/') {
            path = '';
        }

        var fullPath = BASE_DIR + path;
        var urlSafePath = path.replace(/[/]/g, '%2F');

        return new Promise(function (resolve, reject) {

            fs.readdir(fullPath, function (err, fileFolders) {
                if (err) {
                    reject(err);
                    return;
                }

                fileFolders = fileFolders
                    .map(function (itemName) {
                        return pathSvc.join(fullPath, itemName);
                    });

                var files = fileFolders
                    .filter(function (item) {
                        return fs.statSync(item).isFile();
                    })
                    .map(function (file) {
                        var fileName = pathSvc.basename(file);
                        return {
                            name: fileName,
                            path: `${urlSafePath}%2F${fileName}`
                        };
                    });
                files = files || [];

                var dirs = fileFolders
                    .filter(function (item) {
                        return !fs.statSync(item).isFile();
                    })
                    .map(function (dir) {
                        var dirName = pathSvc.basename(dir);
                        return {
                            name: dirName,
                            path: `${urlSafePath}%2F${dirName}`
                        };
                    });
                dirs = dirs || [];

                resolve({
                    urlSafeParentPath: pathSvc.dirname(path).replace(/[/]/g, '%2F'),
                    urlSafePath,
                    path: path || '/',
                    dirs,
                    files
                });
            });
        });
    }
};
