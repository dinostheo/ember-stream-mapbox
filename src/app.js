/**
 * @module  App
 *
 * Main application.
 */

// Dependencies.
var express = require('express'),
	io = require('socket.io'),
	middleware = require('./middleware.js'),
	routes = require('./routes.js'),
	debug = require('debug')('ember-stream-mapbox:app');

/**
 * Create a new application instance.
 *
 * @param  {Function} done - callback which exposes the application
 */
module.exports.create = function (done) {
	var app = express(),
		server = null;

	/**
	 * Initialize the application.
	 *
	 * @method
	 *
	 * @param  {object} config - application configuration
	 */
	app.init = function (config) {
		debug('Initializing app with config: ', config);

		app.set('port', config.port);
		middleware.init(app);
		routes.init(app);
	};

	/**
	 * Start the application.
	 *
	 * @param  {Function} next - callback that exposes the http server
	 */
	app.start = function (next) {
		debug('Starting app.');

		server = app.listen(app.get('port'));

		// todo init socket.io

		next(null, server);
	};

	/**
	 * Stop the application.
	 *
	 * @param  {Function} next - callback that handles closing of the http server
	 */
	app.stop = function (next) {
		debug('Stopping app.');

		server.close(next);
	};

	done(app);
};