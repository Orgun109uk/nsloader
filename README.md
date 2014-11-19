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

## Testing
A mocha test suite has been provided and can be run by:
```sh
$ npm test
```
