var assert = require('assert'),
    path = require('path'),
    loader = require('../index');

describe('nsLoader', function () {

  describe('#registered()', function () {

    it('registered should return false', function () {

      assert.equal(false, loader.registered('test'));

    });

  });

  describe('#register()', function () {

    it('there should be a single registered namespace', function () {

      loader.register('test', function () {});
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

      loader.register('test/*', function (ns) {
        if (ns === 'test/success') {
          return path.resolve('./tests/nsloader.js');
        }

        return false;
      });

      assert.equal(false, loader.namespace('test/fail'));

    });

    it('filename if the namespace matches in the callback', function () {

      assert.equal(
        path.resolve('./tests/nsloader.js'),
        loader.namespace('test/success')
      );

    });

  });

  describe('#require()', function () {

    it('false when require invalid namespace', function () {

      assert.throws(function () {
        loader.require('test/fail');
      });

    });

    it('not false when require valid namespace', function () {

      assert.doesNotThrow(function () {
        loader.require('test/success');
      });

    });

    it('calling module calls require', function () {

      assert.equal(true, typeof loader === 'function');
      assert.doesNotThrow(function () {
        loader('test/success');
      });

    });

  });

  describe('#loaded()', function () {

    it('false if namespace not included', function () {

      assert.equal(false, loader.loaded('test/fail'));

    });

    it('true if namespace included', function () {

      loader.require('test/success');
      assert.equal(true, loader.loaded('test/success'));

    });

  });

});
