/**
 * Namespace loader.
 *
 * @module nsloader
 * @copyright Copyright (c) 2014 Orgun109uk
 */

var nsloaderRegisterdNamespaces = {},
    nsloaderLoadedNamespaces = {};

/**
 * Determines if a namespace has been registered.
 *
 * @param {String} ns The namespace.
 * @return {Boolean} Returns TRUE or FALSE.
 */
function nsloaderRegistered(ns) {
  'use strict';

  return nsloaderRegisterdNamespaces[ns] !== undefined;
}

/**
 * Register a new namespace.
 *
 * @param {String} ns The namespace.
 * @param {String|Function} target Either a filename, or a callback.
 */
function nsloaderRegister(ns, target) {
  'use strict';

  if (typeof target === 'function' || typeof target === 'string') {
    nsloaderRegisterdNamespaces[ns] = target;
  }
}

/**
 * Unregister an existing namespace.
 *
 * @param {String} ns The namespace.
 */
function nsloaderUnregister(ns) {
  'use strict';

  if (nsloaderRegisterdNamespaces[ns] !== undefined) {
    delete nsloaderRegisterdNamespaces[ns];
  }
}

/**
 * Attempt to convert namespace to a matching /* namespace.
 *
 * @param {String} ns The namespace.
 * @return {Boolean|String} The converted namespace or FALSE.
 */
function nsloaderFindNamespace(ns) {
  'use strict';

  var newNs = '', found = false, nsp = ns.split('/'), i, len;
  if (nsloaderRegisterdNamespaces[ns] === undefined) {
    len = nsp.length;
    for (i = 0; i < len; i++) {
      newNs = nsp.join('/');
      if (nsloaderRegisterdNamespaces[newNs] !== undefined) {
        found = newNs;
        break;
      } else if (nsloaderRegisterdNamespaces[newNs + '/*'] !== undefined) {
        found = newNs + '/*';
        break;
      }

      nsp.pop();
    }
  }

  return found;
}

/**
 * Run a namespace callback.
 *
 * @param {String} ns The namespace.
 * @return {Boolean|String} Returns either the filename of the namespace or
 *   FALSE.
 */
function nsloaderNamespace(ns) {
  'use strict';

  var newNs = nsloaderRegisterdNamespaces[ns] !== undefined ?
    ns :
    nsloaderFindNamespace(ns);

  if (
    nsloaderRegisterdNamespaces[newNs] !== undefined &&
    typeof nsloaderRegisterdNamespaces[newNs] === 'function'
  ) {
    return nsloaderRegisterdNamespaces[newNs](ns);
  } else if (
    nsloaderRegisterdNamespaces[newNs] !== undefined &&
    typeof nsloaderRegisterdNamespaces[newNs] === 'string'
  ) {
    return nsloaderRegisterdNamespaces[newNs];
  }

  return false;
}

/**
 * Attempt to load the namespace.
 *
 * @param {String} ns The namespace.
 * @return {Mixed} Returns the result of the require.
 * @throws {Error} Throws an error if the namespace couldn't be loaded.
 */
function nsloaderRequire(ns) {
  'use strict';

  if (nsloaderLoadedNamespaces[ns] === undefined) {
    var filename = nsloaderNamespace(ns);
    if (filename) {
      nsloaderLoadedNamespaces[ns] = require(filename);
    }
  }

  if (nsloaderLoadedNamespaces[ns] !== undefined) {
    return nsloaderLoadedNamespaces[ns];
  }

  throw new Error('Unable to require "' + ns + '".');
}

/**
 * Determine if a given namespace has been loaded.
 *
 * @param {String} ns The namespace.
 * @return {Boolean} Returns TRUE or FALSE.
 */
function nsloaderLoaded(ns) {
  'use strict';

  return nsloaderLoadedNamespaces[ns] !== undefined;
}

exports = module.exports = nsloaderRequire;
module.exports.registered = nsloaderRegistered;
module.exports.register = nsloaderRegister;
module.exports.unregister = nsloaderUnregister;
module.exports.namespace = nsloaderNamespace;
module.exports.require = nsloaderRequire;
module.exports.loaded = nsloaderLoaded;
