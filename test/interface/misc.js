'use strict';
var {Facebook, FacebookApiException: FacebookApiExceptionImport, version} = require('../..'),
	FacebookApiException = require('../../lib/FacebookApiException').default,
	expect = require('chai').expect;

describe('exports.FacebookApiException', function() {
	it('should be a function', function() {
		expect(Facebook.FacebookApiException)
			.to.exist
			.and.to.be.a('function');
	});

	it('should create a FacebookApiException instance that derives from Error', function() {
		var obj = {};

		expect(FacebookApiExceptionImport(obj))
			.to.be.an.instanceof(FacebookApiException)
			.and.to.be.an.instanceof(Error)
			.and.to.include({
				name: 'FacebookApiException',
				message: '{}',
				response: obj
			});
	});
});

describe('exports.version', function() {
	it("should be a string with this package's current version", function() {
		var FB = new Facebook();
		console.log(FB.version);

		expect(FB.version)
			.to.be.a('string')
			.and.to.equal(version);
	});
});
