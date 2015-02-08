/**
 * @module Start
 *
 * Start the application.
 */

// Dependencies.
var App = require('./app.js'),
	config = require('./config/config.js'),
	debug = require('debug')('ember-stream-mapbox:start');

// Create application instance.
App.create(function (app) {
	app.init(config);
	app.start(function (err, server) {
		if (err) {
			debug('Start app error: ', err);

			process.exit(1);
		} else {
			var address = server.address();

			debug('Server running on %s:%s', address.address, address.port);
		}
	});
});