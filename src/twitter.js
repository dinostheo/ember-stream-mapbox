/**
 * @module Twitter.
 *
 * It starts a twitter stream.
 */

// Dependencies.
var Twitter = require('twitter'),
	config = require('./config/config.js'),
	redis = require('redis').createClient(),
	debug = require('debug')('ember-stream-mapbox:twitter');

/**
 * Initialize twitter stream and passes the socket object.
 *
 * @param  {Object} io - Socket object
 */
module.exports.stream = function (io) {
	debug('Initialize the twitter client.');
	var twitterCli = new Twitter(config.twitter_credentials);

	//Fetches all the members from the 'global' set and starts the stream with those.
	redis.zrevrange(['global', 0, -1], function (err, mems) {
		debug('Start a stream with the global members.');

		twitterCli.stream(
			'statuses/filter',

			{ track: mems.toString() },

			function(stream) {
				stream.on('data', function (tweet) {
					var coords = tweet.coordinates;

					if (coords) {
						//push coordinates to the frontEnd
						io.sockets.emit('glTweet', { tweet: tweet });
					}
				});

				stream.on('error', function (error) {
					debug('Twitter stream error: ', error);
				});
			}
		);
	});
};
