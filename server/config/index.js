'use strict';

var path = require('path');

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
   // Server port
  port: process.env.PORT || 8080,

  // Server IP
  ip: process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',

  casperPath: process.env.OPENSHIFT_CASPERJS_BIN_DIR || '',

  root: path.normalize(__dirname + '/../..'),

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'angular-fullstack-secret'
  },
  mongo: {
        uri: 'mongodb://lolo267:lolo267@ds021994.mlab.com:21994/translate'
        //process.env.OPENSHIFT_MONGODB_DB_URL ||
    }

};
