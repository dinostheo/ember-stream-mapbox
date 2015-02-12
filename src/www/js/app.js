(function (window) {
	/**
	 * Application.
	 */

	// Dependencies.
	var Socket = window.io('http://localhost:8888');

	// Application Root.
	var App = Ember.Application.create({
		LOG_TRANSITIONS: true
	});

	// Application Router.
	App.Router.map(function () {
		this.resource('dashboard', { path: '/' });
		this.resource('tweetmap');
	});

	// Application Route.
	App.ApplicationRoute = Ember.Route.extend({
		initSocket: function () {
			Socket.on('connected', function (data) {
				console.log('socket **connected**', data);
			});
		}.on('init')
	});

	// Export the Application.
	window.E = {
		App: App,
		Socket: Socket
	};

})(window);