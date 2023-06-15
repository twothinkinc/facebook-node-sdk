'use strict';
var nock = require('nock');
var expect = require('chai').expect;
var notError = require('../_supports/notError');
const {Facebook} = require('../..');
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

describe('FB.api', function() {
	describe('batch', function() {
		describe("FB.api('', 'POST', { batch: [ { method: 'GET', relative_url: '4' }, { method: 'GET', relative_url: 'me/friends?limit=50' } ], cb)", function() {
			beforeEach(function() {
				nock('https://graph.facebook.com:443')
					.post('/v10.0/')
					.reply(200, [
						{
							code: 200,
							headers: [
								{
									name: 'Access-Control-Allow-Origin',
									value: '*'
								},
								{
									name: 'Content-Type',
									value: 'text/javascript; charset=UTF-8'
								},
								{
									name: 'Facebook-API-Version',
									value: 'v10.0'
								}
							],
							body: JSON.stringify({
								id: '4',
								name: 'Mark Zuckerberg'
							})
						},
						{
							code: 200,
							headers: [
								{
									name: 'Access-Control-Allow-Origin',
									value: '*'
								},
								{
									name: 'Content-Type',
									value: 'text/javascript; charset=UTF-8'
								},
								{
									name: 'Facebook-API-Version',
									value: 'v10.0'
								}
							],
							body: JSON.stringify({
								data: [],
								summary: {
									total_count: 0
								}
							})
						}
					]);
			});

			it('should return batch results', function(done) {
				FB.api('/', 'post', {
					batch: [
						{method: 'get', relative_url: '4'},
						{method: 'get', relative_url: 'me/friends?limit=50'}
					]
				}, function(result) {
					notError(result);
					expect(result).to.be.a('array');
					expect(result[0]).to.have.property('code', 200);
					expect(result[1]).to.have.property('code', 200);
					done();
				});
			});
		});

	});
});
