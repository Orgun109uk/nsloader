/**
 * Namespace loader
 *
 * Copyright (c) 2014 Orgun109uk
 */

var nsloaderRegisterdNamespaces = {},
    nsloaderLoadedNamespaces = {};

/**
 * Determines if a namespace has been registered.
 *
 * @param string ns
 *   The namespace.
 *
 * @return boolean
 *   Returns TRUE or FALSE.
 */
function nsloaderRegistered (ns) {
  'use strict';

  return nsloaderRegisterdNamespaces[ns] !== undefined;
}

/**
 * Register a new namespace.
 *
 * @param string ns
 *   The namespace.
 * @param string|closure target
 *   Either a filename, or a callback.
 *
 * @return void
 */
function nsloaderRegister (ns, target) {
  'use strict';

  if (typeof target === 'function' || typeof target === 'string') {
    nsloaderRegisterdNamespaces[ns] = target;
  }
}

/**
 * Unregister an existing namespace.
 *
 * @param string ns
 *   The namespace.
 *
 * @return void
 */
function nsloaderUnregister (ns) {
  'use strict';

  if (nsloaderRegisterdNamespaces[ns] !== undefined) {
    delete nsloaderRegisterdNamespaces[ns];
  }
}

/**
 * Attempt to convert namespace to a matching /* namespace.
 *
 * @param string ns
 *   The namespace.
 *
 * @return boolean|string
 *   The converted namespace or FALSE.
 */
function nsloaderFindNamespace (ns) {
  'use strict';

  var newNs = '', found = false, nsp, i, len;
  if (nsloaderRegisterdNamespaces[ns] === undefined) {
    nsp = ns.split('/');
    len = nsp.length;
    for (i = 0; i < len; i++) {
      newNs += nsp[i] + '/';

      if (nsloaderRegisterdNamespaces[newNs + '*'] !== undefined) {
        found = newNs + '*';
        break;
      }
    }
  }

  return found;
}

/**
 * Run a namespace callback.
 *
 * @param string ns
 *   The namespace.
 *
 * @return boolean|string
 *   Returns either the filename of the namespace or FALSE.
 */
function nsloaderNamespace (ns) {
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
 * @param string ns
 *   The namespace.
 *
 * @return mixed
 *   Returns the result of the require.
 *
 * @throws Error Throws an error if the namespace couldn't be loaded.
 */
function nsloaderRequire (ns) {
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
 * @param string ns
 *   The namespace.
 *
 * @return boolean
 *   Returns TRUE or FALSE.
 */
function nsloaderLoaded (ns) {
  'use strict';

  return nsloaderLoadedNamespaces[ns] !== undefined;
}

exports = module.exports = {
  registered: nsloaderRegistered,
  register: nsloaderRegister,
  unregister: nsloaderUnregister,
  namespace: nsloaderNamespace,
  require: nsloaderRequire,
  loaded: nsloaderLoaded
};
