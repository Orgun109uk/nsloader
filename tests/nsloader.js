var assert = require('assert'),
    loader = require('../lib/nsloader');

describe('nsLoader', function () {

    describe('#registered()', function () {

        it('registered should return false', function () {
            assert.equal(false, loader.registered('test'));
        });

    });

    describe('#register()', function () {

        it('there should be a single registered namespace', function () {
            loader.register('test', function () {
                //
            });

            assert.equal(true, loader.registered('test'));
        });

    });

    describe('#unregister()', function () {

        it('there shouldnt be any registered namespaces', function () {
            assert.equal(true, loader.registered('test'));
            loader.unregister('test');
            assert.equal(false, loader.registered('test'));
        });

    });

    describe('#namespace()', function () {

        it('false if the namespace doesnt exist', function () {
            assert.equal(false, loader.namespace('test'));
        });

        it('false if the namespace doesnt match in the callback', function () {
            loader.register('test', function (ns) {
                if (ns === 'test/success') {
                    return './tests/nsloader.js';
                }

                return false;
            });

            assert.equal(false, loader.namespace('test/fail'));
        });

        it('filename if the namespace mathces in the callback', function () {
            assert.equal(
                './tests/nsloader.js',
                loader.namespace('test/success')
            );
        });
    });

});
