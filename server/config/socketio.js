/**
 * Socket.io configuration
 */

'use strict';

var people = [];
// When the user disconnects.. perform this
function onDisconnect(socket) {
  console.log('onDisconnect');

  people.splice(people.indexOf(socket.id), 1);
  console.info('[%s - %d] DISCONNECTED', socket.address, people.length);

  socket.emit('info', 'exit jest ludzi: ' + people.length);
  socket.broadcast.emit('info', 'exit [brod] jest ludzi: ' + people.length);
}

// When the user connects.. perform this
function onConnect(socket) {
  people.push(socket.id);
  socket.emit('info', 'jest ludzi: ' + people.length);
  socket.broadcast.emit('info', '[brod] jest ludzi: ' + people.length);
  console.info('[%s - %d] CONNECTED1', socket.address, people.length);

  // Insert sockets below
  require('../api/translate/translate.socket').register(socket);
}
module.exports = function (socketio) {

  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
   /*socketio.use(require('socketio-jwt').authorize({
     secret: config.secrets.session,
     handshake: true
   }));*/

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress +
        ':' + socket.request.connection.remotePort;
    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);

    });

    // Call onConnect.
    onConnect(socket);

  });

};
