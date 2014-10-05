var __namespaces = {},
    __loaded = {};

/**
 * Determines if a namespace has been registered.
 *
 * @param string ns
 *   The namespace.
 *
 * @return boolean
 *   Returns TRUE or FALSE.
 */
function registered (ns) {
    return __namespaces[ns] !== undefined;
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
function register (ns, target) {
    if (typeof target === 'function' || typeof target === 'string') {
        __namespaces[ns] = target;
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
function unregister (ns) {
    if (__namespaces[ns] !== undefined) {
        delete __namespaces[ns];
    }
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
function namespace (ns) {
    if (__namespaces[ns] !== undefined) {
        if (typeof __namespaces[ns] === 'function') {
            return __namespaces[ns].call();
        }
        else if (typeof __namespaces[ns] === 'string') {
            return __namespaces[ns];
        }
    }

    return false;
}

function require (ns) {
    //
}

function loaded (ns) {
    //return __loaded[ns] !== undefined;
}

exports = module.exports ={
    register: register,
    unregister: unregister,
    registered: registered,
    namespace: namespace,
    require: require,
    loaded: loaded
};