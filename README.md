# ember-stream-mapbox
Playing around with ember.js, socket.io, redis, twitter stream and mapbox.

## application configuration
The application configuration is considered private and therefore not included in version control.
The configuration file must be named 'config.js' and located in '/src/config/'.
Use the following template:
```javascript

/**
 * @module Config
 *
 * @private
 *
 * Contains all application configurations.
 */
module.exports = {
	port: 8888,

	twitter_credentials: {
		consumer_key: '<CONSUMER KEY>',
		consumer_secret: '<CONSUMER SECRET>',
		access_token_key: '<ACCESS TOKEN KEY>',
		access_token_secret: 'ACCESS TOKEN SECRET'
	}
};
```

## dependencies
It requires a running redis instance.

To install all node modules, run the 'npm install' command in the project root:
```bash
npm install
```

## running the application
To run the application, run the 'npm start' command in the project root:
```bash
npm start
```
## TODO
The currect version is missing the frontend code that will handle the sockets.
