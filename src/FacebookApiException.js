'use strict';

class FacebookApiException extends Error {
	constructor(res) {
		super(res); // (1)
		this.name = 'FacebookApiException'; // (2)
		this.message = JSON.stringify(res || {});
		this.response = res;
	}
}

module.exports = FacebookApiException;
