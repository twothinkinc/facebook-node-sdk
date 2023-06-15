'use strict';
const {Facebook} = require('../..');
var nock = require('nock');
var expect = require('chai').expect;
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

describe('import', function() {
	/*
		describe("import FB from 'fb';", function() {
			// This shouln'd work given the way that FB is exported.
			it('should expose FB.api', function() {
				expect(FB).property('api')
					.to.be.a('function');
			});
			it('FB.api should work without `this`', function(done) {
				nock('https://graph.facebook.com:443')
					.get('/v10.0/4')
					.reply(200, {
						id: '4'
					});

				FBdefault.api.call(undefined, '/4', function(result) {
					notError(result);
					expect(result).to.have.property('id', '4');
					done();
				});
			});
		});
	*/
	describe("import {FB} from 'fb';", function() {
		it('should expose FB.api', function() {
			expect(FB).property('api')
				.to.be.a('function');
		});
		/*
				it('FB.api should work without `this`', function(done) {
					nock('https://graph.facebook.com:443')
						.get('/v10.0/4')
						.reply(200, {
							id: '4'
						});

					FB.api.call(undefined, '/4', function(result) {
						notError(result);
						expect(result).to.have.property('id', '4');
						done();
					});
				});
		*/
	});
	/*
		we can't get this far if this fails to import
		describe("import {FacebookApiException} from 'fb';", function() {
			it('should expose the FacebookApiException error type', function() {
				expect(FacebookApiExceptionImport).to.equal(FacebookApiException);
			});
		});
	*/
});
