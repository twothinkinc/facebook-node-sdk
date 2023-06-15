'use strict';
const {Facebook} = require('../..');
const expect = require('chai').expect;
const omit = require('lodash.omit');
let FB;

beforeEach(function() {
	FB = new Facebook({version: 'v10.0'});
	const defaultOptions = omit(FB.options(), 'appId');
	FB.options(defaultOptions);
});

describe('Facebook', function() {
	describe('new Facebook()', function() {
		it('should create an instance that behaves like FB', function() {
			var fb = new Facebook();
			expect(fb).property('api').to.be.a('function');
		});
	});

	describe("new Facebook({appId: '42'})", function() {
		it('should set options', function() {
			var fb = new Facebook({appId: '42'});
			expect(fb.options('appId')).to.equal('42');
		});

		it('should not share options with FB', function() {
			var fb = new Facebook({appId: '42'});

			expect(fb.options('appId')).to.not.equal(FB.options('appId'));
		});
	});
});
