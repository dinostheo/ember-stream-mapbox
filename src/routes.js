/**
 * @module  Routes.
 *
 * Setup application routes.
 */

// Dependencies.
var express = require('express'),
	debug = require('debug')('ember-stream-mapbox:routes');

/**
 * Initialize application routes.
 *
 * @param  {Function} app - main application
 */
module.exports.init = function (app) {
	debug('Initializing routes.');

	/**
	 * Express serve static middleware.
	 * This middleware serves out the public 'www' directory.
	 */
	app.use(express.static(__dirname + '/www'));

	/**
	 * Route not found error middleware.
	 *
	 * @param  {Object}   req  - http request object
	 * @param  {Object}   res  - http response object
	 * @param  {Function} next - calls next middleware tier
	 */
	app.use(function (req, res, next) {
		res.status(404).json({
			error: 'Route not found.',
			details: 'The requested route was not found.'
		});
	});

	/**
	 * Catch-all error middleware.
	 *
	 * @param  {Object||String} err  - error object (or error string)
	 * @param  {Object}         req  - http request object
	 * @param  {Object}         res  - http response object
	 * @param  {Function}       next - calls next middleware tier
	 */
	app.use(function (err, req, res, next) {
		debug('Catch-all middleware error: ', err);

		res.status(500).json({
			error: 'Error',
			details: err.message || err
		});
	});
};