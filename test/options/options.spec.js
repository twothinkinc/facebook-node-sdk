'use strict';
var nock = require('nock');
var	expect = require('chai').expect;
var notError = require('../_supports/notError');
const {Facebook, version} = require('../..');
var omit = require('lodash.omit');

nock.disableNetConnect();

let FB;

beforeEach(function() {
	FB = new Facebook({version: 'v10.0'});
	const defaultOptions = omit(FB.options(), 'appId');
	FB.options(defaultOptions);
});

afterEach(function() {
	nock.cleanAll();
	const defaultOptions = omit(FB.options(), 'appId');
	FB.options(defaultOptions);
});

describe('FB.options', function() {
	describe('beta', function() {
		it('Should default beta to false', function() {
			expect(FB.options('beta')).to.be.false;
		});

		it('Should allow beta option to be set', function() {
			FB.options({beta: true});

			expect(FB.options('beta')).to.be.true;

			FB.options({beta: false});

			expect(FB.options('beta')).to.be.false;
		});

		it('Should make use graph.facebook when beta is false', function(done) {
			var expectedRequest = nock('https://graph.facebook.com:443').get('/v10.0/4').reply(200, {});

			FB.options({beta: false});

			FB.api('/4', function(result) {
				notError(result);
				expectedRequest.done(); // verify non-beta request was made

				done();
			});
		});

		it('Should make use graph.beta.facebook when beta is true', function(done) {
			var expectedRequest = nock('https://graph.beta.facebook.com:443').get('/v10.0/4').reply(200, {});

			FB.options({beta: true});

			FB.api('/4', function(result) {
				notError(result);
				expectedRequest.done(); // verify beta request was made

				done();
			});
		});
	});

	describe('userAgent', function() {
		beforeEach(function() {
			nock('https://graph.facebook.com:443')
				.get('/4')
				.reply(function() {
					return {
						userAgent: this.req.headers['user-agent']
					};
				});
		});

		it('Should default to thuzi_nodejssdk/' + version, function(done) {
			expect(FB.options('userAgent')).to.equal('thuzi_nodejssdk/' + version);
			done();
		});
		// axios is not returning the full request back to the caller, so this won't work
		/*
		it('Should default the userAgent for FB.api requests to thuzi_nodejssdk/' + version, function(done) {
			FB.api('/4', function(result) {
				notError(result);
				console.log(result);
				expect(result.userAgent).to.equal('thuzi_nodejssdk/' + version);
				done();
			});
		});

		it('Should be used as the userAgent for FB.api requests', function(done) {
			FB.options({userAgent: 'faux/0.0.1'});

			FB.api('/4', function(result) {
				notError(result);
				expect(result.userAgent).to.equal('faux/0.0.1');

				done();
			});

		});
		*/
	});

	describe('version', function() {
		it('Should default version to v10.0', function() {
			expect(FB.options('version')).to.equal('v10.0');
		});

		it('Should change the version used in FB.api requests', function(done) {
			FB.options({version: 'v2.9'});

			var expectedRequest = nock('https://graph.facebook.com:443')
				.get('/v2.9/4')
				.reply(200, {
					id: '4',
					name: 'Mark Zuckerberg',
					first_name: 'Mark',
					last_name: 'Zuckerberg',
					link: 'http://www.facebook.com/zuck',
					gender: 'male',
					locale: 'en_US'
				});

			FB.api('4', function(result) {
				notError(result);
				expectedRequest.done();
				done();
			});
		});

		it("Should not prepend a version to FB.api('/v2.12/4', cb) style requests", function(done) {
			FB.options({version: 'v2.9'});

			var expectedRequest = nock('https://graph.facebook.com:443')
				.get('/v2.12/4')
				.reply(200, {
					id: '4',
					name: 'Mark Zuckerberg',
					first_name: 'Mark',
					last_name: 'Zuckerberg',
					link: 'http://www.facebook.com/zuck',
					gender: 'male',
					locale: 'en_US'
				});

			FB.api('/v2.12/4', function(result) {
				notError(result);
				expectedRequest.done();
				done();
			});
		});

		it('Should change the version used in FB.getLoginUrl', function(done) {
			FB.options({version: 'v2.9'});
			expect(FB.getLoginUrl({appId: 'app_id'}))
				.to.equal('https://www.facebook.com/v2.9/dialog/oauth?response_type=code&redirect_uri=https%3A%2F%2Fwww.facebook.com%2Fconnect%2Flogin_success.html&client_id=app_id');
			done();
		});
	});
});
