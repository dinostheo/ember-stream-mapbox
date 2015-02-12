(function (window) {
	/**
	 * Tweetmap.
	 */

	// Dependencies.
	var App = window.E.App,
		Mapbox = window.L.mapbox,
		Socket = window.E.Socket;

	// Tweetmap View.
	App.TweetmapView = Ember.View.extend({
		initMapbox: function () {
			Mapbox.accessToken = 'pk.eyJ1IjoiZGFuaWxsb3V6IiwiYSI6ImNHT3IxdW8ifQ.1MQGyGzQEqG9eD0q6e6YcQ';
			Mapbox.map('map', 'danillouz.l4hjjhde');
		}.on('didInsertElement'),

		fetchData: function () {
			Socket.emit('query', {
				query: 'stuff'
			});

			Socket.on('push', function (data) {
				console.log('socket **push**', data);
			});
		}.on('init')
	});
})(window);