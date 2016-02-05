var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/express')(app, config);
require('./server/config/routes')(app);

require('./server/config/seedUsers');

app.listen(config.port);
console.log("Server running on port: " + config.port);