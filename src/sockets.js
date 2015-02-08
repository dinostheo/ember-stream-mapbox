/**
 * @module Sockets.
 *
 * Creates a socket.io server.
 */

// Dependencies.
var debug = require('debug')('ember-stream-mapbox:sockets');


/**
 * Initialize socket.io server.
 *
 * @param  {Object} server - http server
 */
module.exports.init = function (server) {
	// Integrate http server with the socket.io server.
	var io = require('socket.io')(server);

	debug('Initialize socket.io server.');

	// Listen to when a client connects with the socket.io server.
	io.on('connection', function (socket) {
		debug('Client connected to socket.io server.');

		// Emit data to a connected client.
		socket.emit('connected', {
			status: 'Connected.',
			details: 'Successfully connected to socket.io server.'
		});

		// Listen to when a client emits a custom event.
		socket.on('test', function (data) {
			debug('Socket.io on **test** data: ', data);
		});

		// Listen to when a client disconnects with the socket.io server.
		socket.on('disconnect', function () {
			debug('Client disconnected from socket.io server.');
		});
	});
};