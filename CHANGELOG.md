Changelog
=========

## Alembic-3.0.0

* Update all dependencies for 2023. This library was very, very old
* New minimum api version `v10.0`
* Remove neddle for Axios

## 3.0.0

* Added `getAppUsage` API
* New minimum API version `v2.5` (v2.4 is no longer available)
* Debug headers are now logged with DEBUG=fb:fbdebug
* Log messages to stderr using console.warn instead of console.log
* **BREAKING CHANGE**: Switched from the `request` library to `needle`
* **BREAKING CHANGE**: Passing invalid methods or arguments to `FB.api` now throws a TypeError instead of logging and returning undefined
* Use of the [function-bind operator](https://github.com/tc39/proposal-bind-operator) has been removed
* **BREAKING CHANGE**: Raised the minimum supported version of Node to `6.x`
* **BREAKING CHANGE**: `any-promise` has been removed, native promises are now returned by default. If you wish to use a 3rd party promise library like `bluebird` you must explicitly set the `Promise` option instead of relying on `any-promise`'s behaviour
* * **BREAKING CHANGE**: CommonJS `require('fb')` must now use the `.default` or `.FB` export

## 2.0.0

* **BREAKING CHANGE**: Dropped support for FQL and Legacy REST Api
* **BREAKING CHANGE**: New minimum API version `v2.3`
* **BREAKING CHANGE**: `FacebookApiException` and `version` are no longer available on `Facebook` instances.
    * This means `FB.FacebookApiException` cannot be used when doing `import FB from 'fb';` or `var {FB} = require('fb');` you must import `FacebookApiException` separately.
* **BREAKING CHANGE**: Drop support for node `0.10` and `0.12`, node `4` is the new minimum
* **BREAKING CHANGE**: The old broken samples/ directory has been removed
* `FB.api` now supports usage with promises
* Update deps
* Migrate to babel-preset-env

## 1.1.1

* Fix #54: FB methods should be bound

## 1.1.0

* Update deps:
    * `request`: `^2.62.0` -> `^2.67.0`
    * `chai`: `^3.2.0` -> `^3.4.1`
    * `lodash.omit`: `^3.1.0` -> `^4.0.1`
    * `mocha`: `^2.3.2` -> `^2.3.4`
    * `nock`: `^2.12.0` -> `^5.2.1`
* Explicitly support ES2015 `import` in Babel
* Add `new Facebook(options)` for library usage
* Add `FB.extend` for multi-app usage
* Add `FB.withAccessToken` for alternate multi-user usage
* Support file uploads using Buffers and read streams

## 1.0.2

* #22 Fix accidental global / strict mode bug

## 1.0.1

* `1.0.0` was accidentally tagged as `next` instead of `latest`, making `1.0.1` the first official `1.0.x` version.

## 1.0.0

* Add `beta` option
* Update dep: `request`
* Remove unused dependency on `crypto` package
* **BREAKING CHANGE**: Drop support for node `0.6` and `0.8`
* Fix __dirname relative required that breaks browserify builds
* Add `userAgent` option
* Add `version` option
* Fix incorrect merging of string and object query params
* Add `DEBUG=fb:req,fb:sig` support
* `pingFacebook` removed

## 0.7.3 and before

Versions before 1.0.0 were maintained by Thuzi and were never given an official changelog.
