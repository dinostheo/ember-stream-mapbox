(function (window) {
	/**
	 * Application.
	 */

	// Application Root.
	var App = Ember.Application.create({
		LOG_TRANSITIONS: true
	});

	// Application Router.
	App.Router.map(function () {
		this.resource('dashboard', { path: '/' });
		this.resource('tweetmap');
	});

	// Export the Application.
	window.E = {
		App: App
	};

})(window);