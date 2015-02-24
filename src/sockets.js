/**
 * @module Sockets.
 *
 * Creates a socket.io server.
 */

// Dependencies.
var debug = require('debug')('ember-stream-mapbox:sockets'),
	redis = require('redis').createClient(),
	twitter = require('./twitter.js');

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
		var socketId = socket.id;

		//Fetches the ranked set members of global and pushes them to the client
		redis.zrevrange(['global', 0, -1], function (err, mems) {
			//TODO: send the keywords sorted to the frontend
			io.sockets.emit('keywordsTop10', mems);
		});

		// Emit data to a connected client.
		socket.emit('connected', {
			event: 'connected.',
			details: 'Successfully connected to socket.io server.'
		});

		// Listen to when a client emits a custom event.
		socket.on('query', function (data) {
			debug('Sockets on **query**: ', data);

			//We assume that a query property with a value is passed via socket.
			redis.sadd(socketId, data.query, function (err, res) {
				if (err) { /* Handle the error or whatever */ }

				if (res === 1) {
					redis.zincrby('global', 1, data.query);
					twitter.stream(io);
				}
			});

			socket.emit('push', {
				event: 'push',
				data: [ 'daniel', 'is', 'cool' ]
			});
		});

		// Listen to when a client disconnects with the socket.io server.
		socket.on('disconnect', function () {
			debug('Client disconnected from socket.io server.');

			//Removes the members of the open socket connection from the global set
			//as well as removes the complete socket connection set.
			redis.smembers(socketId, function (err, members) {
				members.forEach(function (member) {
					redis.zincrby('global', -1, member);
				});

				redis.del(socketId);
			});
		});
	});
};
