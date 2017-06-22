'use strict';

var config = require('./config');
var mongoose = require('mongoose');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);


var express = require('express');
var app = express();
var server = require('http').createServer(app);
/*var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});*/

//require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

app.listen(config.port, config.ip, function () {
    console.log('Express server listening ip %s on %d, in %s mode',config.ip, config.port, app.get('env'));
});

exports = module.exports = app;