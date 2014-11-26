[![Build Status](https://travis-ci.org/Orgun109uk/nsloader.svg)](https://travis-ci.org/Orgun109uk/nsloader)
[![Build Status](https://david-dm.org/orgun109uk/nsloader.png)](https://david-dm.org/orgun109uk/nsloader)
[![npm version](https://badge.fury.io/js/nsloader.svg)](http://badge.fury.io/js/nsloader)

[![NPM](https://nodei.co/npm/nsloader.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nsloader/)

# nsLoader - Node.js namespace loader

nsloader is a small utility that allows using namespaces for requires.

### Installation
```sh
$ npm install nsloader
```

### Usage
```js
var loader = require('nsloader');

loader.register('mymodule/*', function (ns) {
  var filename = path.join(__dirname, ns.substr('mymodule/'.length));
  return fs.existsSync(filename) ? filename : false;
});
```
Then the equivilant of:
```js
var something = require('./lib/something');
var something = require('../../../lib/something');
var something = require('./something');
```
would be:
```js
var something = loader.require('mymodule/lib/something');
```

A real world example would be:
```js
var path = require('path'),
    fs = require('fs'),
    loader = require('nsloader');

// Allow access to the mymodule index file.
loader.register('mymodule', function () {
  'use strict';

  return path.resolve(path.join(__dirname, '../index.js'));
});

// Allow access to anything after 'mymodule'.
loader.register('mymodule/*', function (ns) {
  'use strict';

  var filename = path.join(__dirname, ns.substring(7));
  if (fs.existsSync(filename + '.js')) {
    return filename + '.js';
  } else if (fs.existsSync(path.join(filename, 'index.js'))) {
    return path.join(filename, 'index.js');
  }

  return false;
});
```

## Testing
A mocha test suite has been provided and can be run by:
```sh
$ npm test
```
