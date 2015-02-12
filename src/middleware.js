/**
 * @module  Middleware.
 *
 * Setup application middleware.
 */

// Dependencies.
var express = require('express'),
	debug = require('debug')('ember-stream-mapbox:middleware');

/**
 * Initialize application middleware.
 *
 * @param {Function} app - main application
 */
module.exports.init = function (app) {
	/**
	 * Express serve static middleware.
	 * This middleware serves out the public 'www' directory.
	 */
	app.use(express.static(__dirname + '/www'));
};