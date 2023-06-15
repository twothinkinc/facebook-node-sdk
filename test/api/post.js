'use strict';
var nock = require('nock');
var	expect = require('chai').expect;
var notError = require('../_supports/notError');
const {Facebook} = require('../..');
var omit = require('lodash.omit');
var fs = require('fs');
var path = require('path');
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

describe('FB.api', function() {
	describe('POST', function() {
		describe("FB.api('me/feed', 'post', { message: 'My first post using facebook-node-sdk' }, cb)", function() {
			beforeEach(function() {
				nock('https://graph.facebook.com:443')
					.post('/v10.0/me/feed')
					.reply(200, function() {
						return {
							contentType: this.req.headers['content-type'],
							id: '4_14'
						};
					});
			});

			it('should have id 4_14', function(done) {
				FB.api('me/feed', 'post', {message: 'My first post using facebook-node-sdk'}, function(result) {
					notError(result);
					expect(result.contentType).to.equal('application/json');
					expect(result).to.have.property('id', '4_14');
					done();
				});
			});
		});

		describe("FB.api('path', 'post', { file: { value: Buffer.alloc(3,'...', 'utf8'), options: { contentType: 'text/plain' } }, cb)", function() {
			beforeEach(function() {
				nock('https://graph.facebook.com:443')
					.post('/v10.0/path')
					.reply(200, function(uri, body) {
						return {
							contentType: this.req.headers['content-type'],
							body: body
						};
					});
			});

			it("should upload a file containing '...'", function(done) {
				FB.api('path', 'post', {file: {value: Buffer.alloc(3, '...', 'utf8'), options: {contentType: 'text/plain'}}}, function(result) {
					notError(result);
					expect(result.contentType).to.match(/^multipart\/form-data; boundary=/);
					let [, boundary] = result.contentType.match(/boundary=(.+)/);
					expect(result.body).to.equal(`--${boundary}\r\nContent-Disposition: form-data; name="file"\r\nContent-Type: text/plain\r\n\r\n...\r\n--${boundary}--\r\n`);
					done();
				});
			});
		});

		describe("FB.api('path', 'post', { file: fs.createReadStream('./ellipsis.txt') }, cb)", function() {
			beforeEach(function() {
				nock('https://graph.facebook.com:443')
					.post('/v10.0/path')
					.reply(200, function(uri, body) {
						return {
							contentType: this.req.headers['content-type'],
							body: body
						};
					});
			});

			it("should upload a file containing '...'", function(done) {
				FB.api('path', 'post', {file: fs.createReadStream(path.join(__dirname, '../_fixtures/ellipsis.txt'))}, function(result) {
					notError(result);
					expect(result.contentType).to.match(/^multipart\/form-data; boundary=/);
					let [, boundary] = result.contentType.match(/boundary=(.+)/);
					expect(result.body).to.equal(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="ellipsis.txt"\r\nContent-Type: text/plain\r\n\r\n...\n\r\n--${boundary}--\r\n`);
					done();
				});
			});
		});
	});
});
