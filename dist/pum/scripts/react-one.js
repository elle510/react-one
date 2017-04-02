(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Pum = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],3:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
}).call(this,require('_process'))

},{"_process":1}],5:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
}).call(this,require('_process'))

},{"_process":1}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
}).call(this,require('_process'))

},{"./emptyFunction":3,"_process":1}],7:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;
},{}],8:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var invariant = require('fbjs/lib/invariant');

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
}).call(this,require('_process'))

},{"./reactProdInvariant":29,"_process":1,"fbjs/lib/invariant":5}],9:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactChildren = require('./ReactChildren');
var ReactComponent = require('./ReactComponent');
var ReactPureComponent = require('./ReactPureComponent');
var ReactClass = require('./ReactClass');
var ReactDOMFactories = require('./ReactDOMFactories');
var ReactElement = require('./ReactElement');
var ReactPropTypes = require('./ReactPropTypes');
var ReactVersion = require('./ReactVersion');

var onlyChild = require('./onlyChild');
var warning = require('fbjs/lib/warning');

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;
}).call(this,require('_process'))

},{"./ReactChildren":10,"./ReactClass":11,"./ReactComponent":12,"./ReactDOMFactories":15,"./ReactElement":16,"./ReactElementValidator":18,"./ReactPropTypes":21,"./ReactPureComponent":23,"./ReactVersion":24,"./onlyChild":28,"_process":1,"fbjs/lib/warning":6,"object-assign":31}],10:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var PooledClass = require('./PooledClass');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var traverseAllChildren = require('./traverseAllChildren');

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;
},{"./PooledClass":8,"./ReactElement":16,"./traverseAllChildren":30,"fbjs/lib/emptyFunction":3}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if (process.env.NODE_ENV !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      process.env.NODE_ENV !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
}).call(this,require('_process'))

},{"./ReactComponent":12,"./ReactElement":16,"./ReactNoopUpdateQueue":19,"./ReactPropTypeLocationNames":20,"./reactProdInvariant":29,"_process":1,"fbjs/lib/emptyObject":4,"fbjs/lib/invariant":5,"fbjs/lib/warning":6,"object-assign":31}],12:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var canDefineProperty = require('./canDefineProperty');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
}).call(this,require('_process'))

},{"./ReactNoopUpdateQueue":19,"./canDefineProperty":25,"./reactProdInvariant":29,"_process":1,"fbjs/lib/emptyObject":4,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],13:[function(require,module,exports){
(function (process){
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  process.env.NODE_ENV !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
}).call(this,require('_process'))

},{"./ReactCurrentOwner":14,"./reactProdInvariant":29,"_process":1,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],14:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;
},{}],15:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactElement = require('./ReactElement');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if (process.env.NODE_ENV !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
}).call(this,require('_process'))

},{"./ReactElement":16,"./ReactElementValidator":18,"_process":1}],16:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var warning = require('fbjs/lib/warning');
var canDefineProperty = require('./canDefineProperty');
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if (process.env.NODE_ENV !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if (process.env.NODE_ENV !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
}).call(this,require('_process'))

},{"./ReactCurrentOwner":14,"./ReactElementSymbol":17,"./canDefineProperty":25,"_process":1,"fbjs/lib/warning":6,"object-assign":31}],17:[function(require,module,exports){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;
},{}],18:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactComponentTreeHook = require('./ReactComponentTreeHook');
var ReactElement = require('./ReactElement');

var checkReactTypeSpec = require('./checkReactTypeSpec');

var canDefineProperty = require('./canDefineProperty');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }
        info += getDeclarationErrorAddendum();
        process.env.NODE_ENV !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":13,"./ReactCurrentOwner":14,"./ReactElement":16,"./canDefineProperty":25,"./checkReactTypeSpec":26,"./getIteratorFn":27,"_process":1,"fbjs/lib/warning":6}],19:[function(require,module,exports){
(function (process){
/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var warning = require('fbjs/lib/warning');

function warnNoop(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    var constructor = publicInstance.constructor;
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
}).call(this,require('_process'))

},{"_process":1,"fbjs/lib/warning":6}],20:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
}).call(this,require('_process'))

},{"_process":1}],21:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var emptyFunction = require('fbjs/lib/emptyFunction');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

function createChainableTypeChecker(validate) {
  if (process.env.NODE_ENV !== 'production') {
    var manualPropTypeCallCache = {};
  }
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (process.env.NODE_ENV !== 'production') {
      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
        var cacheKey = componentName + ':' + propName;
        if (!manualPropTypeCallCache[cacheKey]) {
          process.env.NODE_ENV !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
          manualPropTypeCallCache[cacheKey] = true;
        }
      }
    }
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
        }
        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!ReactElement.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;
}).call(this,require('_process'))

},{"./ReactElement":16,"./ReactPropTypeLocationNames":20,"./ReactPropTypesSecret":22,"./getIteratorFn":27,"_process":1,"fbjs/lib/emptyFunction":3,"fbjs/lib/warning":6}],22:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;
},{}],23:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;
},{"./ReactComponent":12,"./ReactNoopUpdateQueue":19,"fbjs/lib/emptyObject":4,"object-assign":31}],24:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

module.exports = '15.4.2';
},{}],25:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
}).call(this,require('_process'))

},{"_process":1}],26:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = require('./ReactComponentTreeHook');
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if (process.env.NODE_ENV !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = require('./ReactComponentTreeHook');
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":13,"./ReactPropTypeLocationNames":20,"./ReactPropTypesSecret":22,"./reactProdInvariant":29,"_process":1,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],27:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;
},{}],28:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactElement = require('./ReactElement');

var invariant = require('fbjs/lib/invariant');

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
}).call(this,require('_process'))

},{"./ReactElement":16,"./reactProdInvariant":29,"_process":1,"fbjs/lib/invariant":5}],29:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;
},{}],30:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');
var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var getIteratorFn = require('./getIteratorFn');
var invariant = require('fbjs/lib/invariant');
var KeyEscapeUtils = require('./KeyEscapeUtils');
var warning = require('fbjs/lib/warning');

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
}).call(this,require('_process'))

},{"./KeyEscapeUtils":7,"./ReactCurrentOwner":14,"./ReactElementSymbol":17,"./getIteratorFn":27,"./reactProdInvariant":29,"_process":1,"fbjs/lib/invariant":5,"fbjs/lib/warning":6}],31:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],32:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":9}],33:[function(require,module,exports){
'use strict';

module.exports = require('./src/One');

},{"./src/One":34}],34:[function(require,module,exports){
/**
 * React Pum Bundle
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:elle0510@gmail.com">Ahn Hyung-Ro</a>
 *
 */
'use strict';

// components
// Elements

var Alert = require('./components/Alert');
var Modal = require('./components/Modal').Modal;
var ModalHeader = require('./components/Modal').ModalHeader;
var ModalBody = require('./components/Modal').ModalBody;
var ModalFooter = require('./components/Modal').ModalFooter;
var Panel = require('./components/Panel').Panel;
var PanelHeader = require('./components/Panel').PanelHeader;
var PanelBody = require('./components/Panel').PanelBody;
var PanelFooter = require('./components/Panel').PanelFooter;
var HiddenContent = require('./components/HiddenContent');
var Splitter = require('./components/Splitter').Splitter;
var SplitterPane = require('./components/Splitter').SplitterPane;

// Form Elements
var Select = require('./components/Select');
var Checkbox = require('./components/Checkbox');
var RadioGroup = require('./components/radio/RadioGroup');
var Radio = require('./components/radio/Radio');
var DatePicker = require('./components/DatePicker').DatePicker;
var DateRangePicker = require('./components/DatePicker').DateRangePicker;
var DateRanges = require('./components/DateRanges');
var DateRangePicker1 = require('./components/DateRangePicker1');
var Stepper = require('./components/Stepper');
var Fieldset = require('./components/Fieldset');
var Autocomplete = require('./components/Autocomplete');
var TagsInput = require('./components/TagsInput');

// Etc Elements
var JqGrid = require('./components/JqGrid');
var JsTree = require('./components/JsTree');
var TabSet = require('./components/tabs/TabSet');
var Tabs = require('./components/tabs/Tabs');
var Tab = require('./components/tabs/Tab');
var TabContents = require('./components/tabs/TabContents');
var TabContent = require('./components/tabs/TabContent');

// var dt      = require('datatables.net');

var One = {
    JqGrid: JqGrid,
    JsTree: JsTree,
    TabSet: TabSet,
    Tabs: Tabs,
    Tab: Tab,
    TabContents: TabContents,
    TabContent: TabContent,
    HiddenContent: HiddenContent,
    Select: Select,
    Checkbox: Checkbox,
    RadioGroup: RadioGroup,
    Radio: Radio,
    DatePicker: DatePicker,
    DateRangePicker: DateRangePicker,
    DateRanges: DateRanges,
    DateRangePicker1: DateRangePicker1,
    Stepper: Stepper,
    Alert: Alert,
    Modal: Modal,
    ModalHeader: ModalHeader,
    ModalBody: ModalBody,
    ModalFooter: ModalFooter,
    Panel: Panel,
    PanelHeader: PanelHeader,
    PanelBody: PanelBody,
    PanelFooter: PanelFooter,
    Fieldset: Fieldset,
    Splitter: Splitter,
    SplitterPane: SplitterPane,
    Autocomplete: Autocomplete,
    TagsInput: TagsInput
};

module.exports = One;

},{"./components/Alert":35,"./components/Autocomplete":36,"./components/Checkbox":37,"./components/DatePicker":38,"./components/DateRangePicker1":39,"./components/DateRanges":40,"./components/Fieldset":41,"./components/HiddenContent":42,"./components/JqGrid":43,"./components/JsTree":44,"./components/Modal":45,"./components/Panel":46,"./components/Select":47,"./components/Splitter":48,"./components/Stepper":49,"./components/TagsInput":50,"./components/radio/Radio":51,"./components/radio/RadioGroup":52,"./components/tabs/Tab":53,"./components/tabs/TabContent":54,"./components/tabs/TabContents":55,"./components/tabs/TabSet":56,"./components/tabs/Tabs":57}],35:[function(require,module,exports){
/**
 * Alert component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/24
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Alert ref="alert" title="타이틀" message="메시지" onOk={this.onOk} />
 * <Pum.Alert ref="confirm" type="confirm" title="타이틀" message="메시지" onOk={this.onConfirm} onCancel={this.onCancel}/>
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Alert = React.createClass({
    displayName: 'Alert',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.string, // null/confirm (default: null)
        title: PropTypes.string,
        message: PropTypes.string,
        okLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        onOk: PropTypes.func,
        onCancel: PropTypes.func,
        width: PropTypes.string
    },
    id: '',
    show: function show(okFunc, cancelFunc) {
        var alert = $('#' + this.id);
        alert.modal('show');

        this.okFunc = okFunc;
        this.cancelFunc = cancelFunc;
    },
    hide: function hide() {
        var alert = $('#' + this.id);
        alert.modal('hide');
    },
    onOk: function onOk(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // okFunc
        if (typeof this.okFunc === 'function') {
            this.okFunc();
        }

        // onOk
        if (typeof this.props.onOk === 'function') {
            this.props.onOk();
        }
    },
    onCancel: function onCancel(event) {
        // custom event emit 에 대해서 연구 필요
        this.hide();

        // cancelFunc
        if (typeof this.cancelFunc === 'function') {
            this.cancelFunc();
        }

        // onCancel
        if (typeof this.props.onCancel === 'function') {
            this.props.onCancel();
        }
    },
    getDefaultProps: function getDefaultProps() {
        return { title: 'Title', okLabel: $ps_locale.confirm, cancelLabel: $ps_locale.cancel };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        console.log('5. componentDidMount');
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var type = _props.type;
        var title = _props.title;
        var message = _props.message;
        var okLabel = _props.okLabel;
        var cancelLabel = _props.cancelLabel;
        var width = _props.width;


        var cancelButton;
        if (type === 'confirm') {
            cancelButton = React.createElement(
                'button',
                { type: 'button', className: 'btn btn-default', onClick: this.onCancel, 'data-dismiss': 'modal' },
                cancelLabel
            );
        }

        return React.createElement(
            'div',
            { id: this.id, className: classNames('modal', 'modal-alert', className), role: 'dialog', 'aria-labelledby': '', 'aria-hidden': 'true', 'data-backdrop': 'static', 'data-keyboard': 'false' },
            React.createElement(
                'div',
                { className: 'modal-dialog modal-sm', style: { width: width } },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'h4',
                            { className: 'modal-title' },
                            title
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        message
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', onClick: this.onOk },
                            okLabel
                        ),
                        cancelButton
                    )
                )
            )
        );
    }
});

module.exports = Alert;

},{"../services/util":60,"classnames":2,"react":32}],36:[function(require,module,exports){
/**
 * Autocomplete component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/12
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Autocomplete options={options} />
 *
 * jQuery-UI 라이브러리에 종속적이다.
 * https://jqueryui.com/autocomplete/
 *
 * 참고
 * http://hellogk.tistory.com/74
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Autocomplete = React.createClass({
    displayName: 'Autocomplete',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        source: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
        disabled: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func
    },
    id: '',
    getInitialState: function getInitialState() {
        // 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        var disabled = this.props.disabled;
        if (typeof disabled !== 'boolean') {
            disabled = false;
        }

        return {
            disabled: disabled
        };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        var autoInput = $('#' + this.id);
        autoInput.autocomplete({
            source: this.props.source
        });

        if (typeof this.props.onInit === 'function') {
            var data = {};
            //data.key = value;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        if (typeof nextProps.disabled === 'boolean') {
            this.setState({ disabled: nextProps.disabled });
        }
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var name = _props.name;


        return React.createElement('input', { type: 'text', id: this.id, name: name, className: classNames(className), disabled: this.state.disabled });
    }
});

module.exports = Autocomplete;

},{"../services/util":60,"classnames":2,"react":32}],37:[function(require,module,exports){
/**
 * CheckBox component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.CheckBox name="name1" value="value1" onChange={this.onChange} checked={true}> 체크박스</Pum.CheckBox>
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');

var CheckBox = React.createClass({
    displayName: 'CheckBox',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.string,
        checked: PropTypes.bool,
        onChange: PropTypes.func
    },
    onChange: function onChange(event) {
        //console.log(event);
        var checked = !this.state.checked;
        //console.log(checked);
        this.setState({ checked: checked });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event);
        }
    },
    setStateObject: function setStateObject(props) {
        var value = props.value;
        if (typeof value === 'undefined') {
            value = null;
        }

        var checked = props.checked;
        if (typeof checked === 'undefined') {
            checked = false;
        }

        return {
            value: value,
            checked: checked
        };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //console.log('componentDidMount');
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var name = _props.name;
        var children = _props.children;

        return React.createElement(
            'div',
            { className: 'checkbox' },
            React.createElement(
                'label',
                null,
                React.createElement('input', { type: 'checkbox', className: className, name: name, value: this.state.value, checked: this.state.checked,
                    onChange: this.onChange }),
                React.createElement(
                    'span',
                    { className: 'lbl' },
                    children
                )
            )
        );
    }
});

module.exports = CheckBox;

},{"../services/Util":59,"classnames":2,"react":32}],38:[function(require,module,exports){
/**
 * DatePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/19
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.DatePicker id="datepicker" name="datepicker_name" date="2016-03-19"
 *                 disabled={true} timePicker={true} onChange={this.onChange} options={this.options} />
 *
 * Bootstrap 3 DatePicker 라이브러리에 종속적이다.
 * http://eonasdan.github.io/bootstrap-datetimepicker/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    format: 'YYYY-MM-DD',
    dayViewHeaderFormat: 'YYYY-MM',
    locale: $ps_locale.locale,
    tooltips: {
        today: 'Go to today',
        clear: 'Clear selection',
        close: 'Close the picker',
        selectMonth: 'Select Month',
        prevMonth: 'Previous Month',
        nextMonth: 'Next Month',
        selectYear: 'Select Year',
        prevYear: 'Previous Year',
        nextYear: 'Next Year',
        selectDecade: 'Select Decade',
        prevDecade: 'Previous Decade',
        nextDecade: 'Next Decade',
        prevCentury: 'Previous Century',
        nextCentury: 'Next Century'
    }
};

var DatePicker = React.createClass({
    displayName: 'DatePicker',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        date: PropTypes.string, // YYYY-MM-DD HH:mm:ss format의 string
        //minDate: PropTypes.string,          // YYYY-MM-DD HH:mm:ss format의 string
        //maxDate: PropTypes.string,          // YYYY-MM-DD HH:mm:ss format의 string
        disabled: PropTypes.bool,
        timePicker: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func,
        options: PropTypes.object,
        endDatePicker: PropTypes.bool // DateRangePicker 에서 toDate로 사용시 true(DateRangePicker 내에서만 사용)
    },
    id: '',
    getOptions: function getOptions() {
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        // timePicker 설정
        if (typeof this.props.timePicker !== 'undefined') {
            if (this.props.timePicker === true) {
                options.format = 'YYYY-MM-DD HH:mm:ss';
            }
        }

        // defaultDate 설정
        if ((typeof this.props.date === 'undefined' || !this.props.date) && (typeof options.defaultDate === 'undefined' || !options.defaultDate)) {
            options.defaultDate = moment();
        } else {
            // date 가 YYYY-MM-DD string으로 들어오면 moment() 로 변환
            options.defaultDate = moment(this.props.date, options.format); //this.props.date;
        }

        return options;
    },
    onChange: function onChange(event) {
        //console.log('datepicker onChange');
        //console.log(event);
        //console.log(DateUtil.getDateToString(event.date._d));
        //console.log(DateUtil.getDateToString(event.oldDate._d));

        var date = DateUtil.getDateToString(event.date._d),
            oldDate = DateUtil.getDateToString(event.oldDate._d);

        // name 의 value 값 설정
        if (this.props.endDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
            var arr = date.split(' '),
                oldArr = oldDate.split(' ');
            date = arr[0] + ' 23:59:59';
            oldDate = oldArr[0] + ' 23:59:59';
        }
        this.setState({ date: date });

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, date, oldDate);
            //event.stopImmediatePropagation();
        }
    },
    init: function init() {
        var datepicker = $('#' + this.id);
        datepicker.datetimepicker(this.getOptions());

        // name 의 value 값 설정
        var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
        if (this.props.endDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
            var arr = date.split(' ');
            date = arr[0] + ' 23:59:59';
        }
        this.setState({ date: date });

        // setting events
        datepicker.on('dp.change', this.onChange);
    },
    getInitialState: function getInitialState() {
        return { date: this.props.date };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
        if (typeof this.props.onInit === 'function') {
            var datepicker = $('#' + this.id),
                data = {};

            // name 의 value 값 설정
            var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
            if (this.props.endDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
                var arr = date.split(' ');
                date = arr[0] + ' 23:59:59';
            }
            data.date = date;
            data.datepicker = datepicker;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        var datepicker = $('#' + this.id);

        // setDate 처리
        if (typeof nextProps.date !== 'undefined') {
            // string 을 moment 로 변환해서 넣자
            var d = moment(nextProps.date, datepicker.data("DateTimePicker").format());
            datepicker.data("DateTimePicker").date(d);

            // name 의 value 값 설정
            var date = DateUtil.getDateToString(datepicker.data("DateTimePicker").date()._d);
            if (this.props.endDatePicker === true && (typeof this.props.timePicker === 'undefined' || !this.props.timePicker)) {
                var arr = date.split(' ');
                date = arr[0] + ' 23:59:59';
            }
            this.setState({ date: date });
        }

        // disabled 처리
        if (nextProps.disabled === true) {
            datepicker.data("DateTimePicker").disable();
        } else {
            datepicker.data("DateTimePicker").enable();
        }

        // minDate/maxDate 처리
        /*
        if(typeof nextProps.minDate !== 'undefined') {
            console.log('minDate: ' + nextProps.minDate);
            var minDate = moment(nextProps.minDate);
            datepicker.data('DateTimePicker').minDate(minDate);
        }
          if(typeof nextProps.maxDate !== 'undefined') {
            console.log('maxDate: ' + nextProps.maxDate);
            var maxDate = moment(nextProps.maxDate);
            datepicker.data('DateTimePicker').maxDate(maxDate);
        }
        */
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: classNames('input-group', 'date', this.props.className), id: this.id },
            React.createElement('input', { type: 'text', className: 'form-control' }),
            React.createElement(
                'span',
                { className: 'input-group-addon' },
                React.createElement('span', { className: 'fa fa-calendar' })
            ),
            React.createElement('input', { type: 'hidden', name: this.props.name, value: this.state.date })
        );
    }
});

var DateRangePicker = React.createClass({
    displayName: 'DateRangePicker',
    propTypes: {
        className: PropTypes.string,
        startName: PropTypes.string,
        endName: PropTypes.string,
        startDate: PropTypes.string, // YYYY-MM-DD HH:mm:ss format의 string
        endDate: PropTypes.string, // YYYY-MM-DD HH:mm:ss format의 string
        disabled: PropTypes.bool,
        timePicker: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func
    },
    startDate: '',
    endDate: '',
    startOldDate: '',
    endOldDate: '',
    startPicker: '',
    endPicker: '',
    onFromInit: function onFromInit(data) {
        this.startDate = data.date;
        this.startPicker = data.datepicker;
    },
    onToInit: function onToInit(data) {
        this.endDate = data.date;
        this.endPicker = data.datepicker;
    },
    onStartChange: function onStartChange(event, date, oldDate) {
        // minDate 설정
        var minDate = moment(date);
        //$(event.target).next().data('DateTimePicker').minDate(minDate);
        this.endPicker.data('DateTimePicker').minDate(minDate);

        if (typeof this.props.onChange === 'function') {
            this.startDate = date;
            this.startOldDate = oldDate;
            this.props.onChange(event, this.startDate, this.endDate, this.startOldDate, this.endOldDate);
            //event.stopImmediatePropagation();
        }
    },
    onEndChange: function onEndChange(event, date, oldDate) {
        // maxDate 설정
        var maxDate = moment(date);
        //$(event.target).prev().data('DateTimePicker').maxDate(maxDate);
        this.startPicker.data('DateTimePicker').maxDate(maxDate);

        if (typeof this.props.onChange === 'function') {
            this.endDate = date;
            this.endOldDate = oldDate;
            this.props.onChange(event, this.startDate, this.endDate, this.startOldDate, this.endOldDate);
            //event.stopImmediatePropagation();
        }
    },
    setStateObject: function setStateObject(props) {
        // startDate 처리
        var startDate = props.startDate;

        // endDate 처리
        var endDate = props.endDate;

        // disabled 처리
        var disabled = props.disabled;
        if (typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
            startDate: startDate,
            endDate: endDate,
            disabled: disabled
        };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)

        // minDate/maxDate 설정
        var maxDate = moment(this.endDate);
        this.startPicker.data('DateTimePicker').maxDate(maxDate);

        var minDate = moment(this.startDate);
        this.endPicker.data('DateTimePicker').minDate(minDate);

        // onInit
        if (typeof this.props.onInit === 'function') {
            var data = {};
            data.startDate = this.startDate;
            data.endDate = this.endDate;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'datepicker-group' },
            React.createElement(Pum.DatePicker, { className: this.props.className, name: this.props.startName, date: this.state.startDate,
                onInit: this.onFromInit, onChange: this.onStartChange, timePicker: this.props.timePicker, disabled: this.state.disabled }),
            React.createElement(Pum.DatePicker, { className: this.props.className, name: this.props.endName, date: this.state.endDate, endDatePicker: true,
                onInit: this.onToInit, onChange: this.onEndChange, timePicker: this.props.timePicker, disabled: this.state.disabled,
                options: { useCurrent: false } })
        );
    }
});

module.exports = {
    DatePicker: DatePicker,
    DateRangePicker: DateRangePicker
};

},{"../services/DateUtil":58,"../services/util":60,"classnames":2,"react":32}],39:[function(require,module,exports){
/**
 * DateRangePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.DateRangePicker options="{options}" />
 *
 * Date Range Picker 라이브러리에 종속적이다.
 * http://www.daterangepicker.com/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    timePicker24Hour: true,
    locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: $ps_locale.apply,
        cancelLabel: $ps_locale.cancel,
        daysOfWeek: [$ps_locale.sun, $ps_locale.mon, $ps_locale.tue, $ps_locale.wed, $ps_locale.thu, $ps_locale.fri, $ps_locale.sat],
        monthNames: [$ps_locale.jan, $ps_locale.feb, $ps_locale.mar, $ps_locale.apr, $ps_locale.may, $ps_locale.jun, $ps_locale.jul, $ps_locale.aug, $ps_locale.sep, $ps_locale.oct, $ps_locale.nov, $ps_locale.dec]
    }
};

var DateRangePicker = React.createClass({
    displayName: 'DateRangePicker',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        //options: PropTypes.object,
        startDateName: PropTypes.string,
        endDateName: PropTypes.string,
        startDate: PropTypes.string, // YYYY-MM-DD hh:mm:ss 로 전달된 값을
        endDate: PropTypes.string,
        disabled: PropTypes.bool,
        singlePicker: PropTypes.bool,
        timePicker: PropTypes.bool,
        onHide: PropTypes.func,
        onApply: PropTypes.func
    },
    id: '',
    startDate: '',
    endDate: '',
    onApply: function onApply(event, picker) {
        if (typeof this.props.onApply === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            //console.log(startDate);
            //console.log(endDate);
            this.props.onApply(event, startDate, endDate, picker);
        }
    },
    onHide: function onHide(event, picker) {
        this.setHiddenValue();
        if (typeof this.props.onHide === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            this.props.onHide(event, startDate, endDate, picker);
        }
    },
    setHiddenValue: function setHiddenValue() {
        var dateRangePicker = $('#' + this.id),
            startDate = dateRangePicker.data('daterangepicker').startDate._d,
            endDate = dateRangePicker.data('daterangepicker').endDate._d,
            startDateString,
            endDateString;

        startDateString = DateUtil.getDateToString(startDate);
        endDateString = DateUtil.getDateToString(endDate);
        //console.log(startDateString);
        //console.log(endDateString);

        $('[name="' + this.props.startDateName + '"]').val(startDateString);
        $('[name="' + this.props.endDateName + '"]').val(endDateString);

        this.startDate = startDateString;
        this.endDate = endDateString;
    },
    getOptions: function getOptions() {
        /*
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);
        */
        var optional = {};

        var startDate = this.props.startDate;
        if (typeof startDate !== 'undefined') {
            optional.startDate = startDate;
            this.startDate = startDate;
        }

        var endDate = this.props.endDate;
        if (typeof endDate !== 'undefined') {
            optional.endDate = endDate;
            this.endDate = endDate;
        }

        var singlePicker = this.props.singlePicker;
        if (typeof singlePicker !== 'undefined') {
            optional.singleDatePicker = singlePicker;
        }

        var timePicker = this.props.timePicker;
        if (typeof timePicker !== 'undefined') {
            optional.timePicker = timePicker;
        }

        var options = $.extend({}, defaultOptions, optional);

        return options;
    },
    init: function init() {
        var dateRangePicker = $('#' + this.id);
        dateRangePicker.daterangepicker(this.getOptions());

        this.setHiddenValue();

        // setting events
        dateRangePicker.on('hide.daterangepicker', this.onHide);
        dateRangePicker.on('apply.daterangepicker', this.onApply);
    },
    setStateObject: function setStateObject(props) {
        // disabled 처리
        var disabled = props.disabled;
        if (typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
            disabled: disabled
        };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log(nextProps);
        var dateRangePicker = $('#' + this.id),
            startDate = nextProps.startDate,
            endDate = nextProps.endDate;

        if (typeof dateRangePicker.data('daterangepicker') !== 'undefined') {
            if (typeof startDate !== 'undefined') {
                if (this.startDate != startDate) {
                    // startDate type: Date/moment/string
                    console.log('setStartDate');
                    dateRangePicker.data('daterangepicker').setStartDate(startDate); // '2014-03-01'
                    this.startDate = startDate;
                }
            }

            if (typeof endDate !== 'undefined') {
                if (this.endDate != endDate) {
                    // endDate type: Date/moment/string
                    console.log('setEndDate');
                    dateRangePicker.data('daterangepicker').setEndDate(endDate); // '2014-03-01'
                    this.endDate = endDate;
                }
            }
        }

        this.setState(this.setStateObject(nextProps));
    },
    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillUpdate');
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var startDateName = _props.startDateName;
        var endDateName = _props.endDateName;
        var width = _props.width;

        return React.createElement(
            'div',
            { className: classNames('input-group daterange', className) },
            React.createElement('input', { type: 'text', id: this.id, className: 'form-control', style: { width: width }, disabled: this.state.disabled }),
            React.createElement(
                'span',
                { className: 'input-group-addon' },
                React.createElement('i', { className: classNames('glyphicon', 'glyphicon-calendar', 'fa', 'fa-calendar', { disabled: this.state.disabled }) })
            ),
            React.createElement('input', { type: 'hidden', name: startDateName }),
            React.createElement('input', { type: 'hidden', name: endDateName })
        );
    }
});

module.exports = DateRangePicker;

},{"../services/DateUtil":58,"../services/Util":59,"classnames":2,"react":32}],40:[function(require,module,exports){
/**
 * DateRangePicker component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Puf.DateRanges startName="startDate" endName="endDate" ranges={predefined_ranges} />
 *
 * Date Range Picker 라이브러리에 종속적이다.
 * http://www.daterangepicker.com/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');
var DateUtil = require('../services/DateUtil');

var defaultOptions = {
    timePicker24Hour: true,
    //opens: 'right',
    locale: {
        format: "YYYY-MM-DD",
        separator: " ~ ",
        applyLabel: $ps_locale.apply,
        cancelLabel: $ps_locale.cancel,
        customRangeLabel: $ps_locale.direct_select,
        daysOfWeek: [$ps_locale.sun, $ps_locale.mon, $ps_locale.tue, $ps_locale.wed, $ps_locale.thu, $ps_locale.fri, $ps_locale.sat],
        monthNames: [$ps_locale.jan, $ps_locale.feb, $ps_locale.mar, $ps_locale.apr, $ps_locale.may, $ps_locale.jun, $ps_locale.jul, $ps_locale.aug, $ps_locale.sep, $ps_locale.oct, $ps_locale.nov, $ps_locale.dec]
    }
};

var DateRanges = React.createClass({
    displayName: 'DateRanges',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        format: PropTypes.string,
        startName: PropTypes.string,
        endName: PropTypes.string,
        startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        ranges: PropTypes.object,
        timePicker: PropTypes.bool,
        disabled: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        opens: PropTypes.string, // 'left'/'right'/'center'
        onHide: PropTypes.func,
        onApply: PropTypes.func,
        init: PropTypes.func
    },
    id: '',
    startDate: '',
    endDate: '',
    onApply: function onApply(event, picker) {
        //console.log('onApply');
        if (typeof this.props.onApply === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            //console.log(startDate);
            //console.log(endDate);
            this.props.onApply(event, startDate, endDate, picker);
        }
    },
    onHide: function onHide(event, picker) {
        //console.log('onHide'); // hide 호출되고 apply 호출됨 (날짜값 셋팅은 여기서)
        this.setHiddenValue();
        if (typeof this.props.onHide === 'function') {
            var startDate = DateUtil.getDateToString(picker.startDate._d),
                endDate = DateUtil.getDateToString(picker.endDate._d);
            this.props.onHide(event, startDate, endDate, picker);
        }
    },
    setHiddenValue: function setHiddenValue() {
        var startDate = this.$dateRangePicker.data('daterangepicker').startDate._d,
            endDate = this.$dateRangePicker.data('daterangepicker').endDate._d,
            startDateString,
            endDateString;

        startDateString = DateUtil.getDateToString(startDate);
        endDateString = DateUtil.getDateToString(endDate);
        //console.log(startDateString);
        //console.log(endDateString);

        $('[name="' + this.props.startName + '"]').val(startDateString);
        $('[name="' + this.props.endName + '"]').val(endDateString);

        this.startDate = startDateString;
        this.endDate = endDateString;
    },
    displayDate: function displayDate(start, end) {
        var format = 'YYYY-MM-DD';
        if (typeof this.props.format !== 'undefined') {
            format = this.props.format;
        }
        //$('div#' + this.id + ' span').html(start.format(format) + ' - ' + end.format(format));

        if (typeof start === 'string') {
            start = moment(start);
        }

        if (typeof end === 'string') {
            end = moment(end);
        }

        this.$dateRangePicker.find('span').html(start.format(format) + ' - ' + end.format(format));
    },
    getOptions: function getOptions() {
        /*
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);
        */
        var optional = {};

        var ranges = this.props.ranges;
        if (typeof ranges !== 'undefined') {
            optional.ranges = ranges;
        }

        // Date, moment, string
        var startDate = this.props.startDate,
            endDate = this.props.endDate;
        if (typeof startDate !== 'undefined' && typeof endDate !== 'undefined') {
            optional.startDate = startDate;
            optional.endDate = endDate;
            /*
            if(typeof startDate === 'string') {
                this.startDate = startDate;
            }else {
                if(startDate.hasOwnProperty('_d')) {
                    // moment
                    this.startDate = DateUtil.getDateToString(startDate._d);
                    console.log(this.startDate);
                }else {
                    // Date
                    this.startDate = DateUtil.getDateToString(startDate);
                }
            }
            */
        } else {
                var first;

                for (var key in ranges) {
                    if (ranges.hasOwnProperty(key) && typeof key !== 'function') {
                        first = ranges[key];
                        break;
                    }
                }

                if (first !== undefined && Array.isArray(first) && first.length > 0) {
                    optional.startDate = first[0];
                    optional.endDate = first[1];
                }
            }

        var timePicker = this.props.timePicker;
        optional.timePicker = timePicker;

        var opens = this.props.opens;
        optional.opens = opens;

        var options = $.extend({}, defaultOptions, optional);

        return options;
    },
    init: function init() {
        var options = this.getOptions();
        this.$dateRangePicker = $('#' + this.id);
        this.$dateRangePicker.daterangepicker(options, this.displayDate);

        // init display
        this.displayDate(options.startDate, options.endDate);

        this.setHiddenValue();

        // setting events
        this.$dateRangePicker.on('hide.daterangepicker', this.onHide);
        this.$dateRangePicker.on('apply.daterangepicker', this.onApply);
    },
    setStateObject: function setStateObject(props) {
        // disabled 처리
        var disabled = props.disabled;
        if (typeof disabled === 'undefined') {
            disabled = false;
        }

        return {
            disabled: disabled
        };
    },
    getDefaultProps: function getDefaultProps() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        return { timePicker: false, opens: 'right' };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();

        if (typeof this.props.init === 'function') {
            var data = {};

            // this.startDate/this.endDate 은 setHiddenValue() 에서 설정됨
            data.startDate = this.startDate;
            data.endDate = this.endDate;
            data.datepicker = this.$dateRangePicker;
            this.props.init(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log(nextProps);
        var startDate = nextProps.startDate,
            endDate = nextProps.endDate;

        if (typeof this.$dateRangePicker.data('daterangepicker') !== 'undefined') {
            if (typeof startDate !== 'undefined') {
                if (this.startDate != startDate) {
                    // startDate type: Date/moment/string
                    //console.log('setStartDate');
                    this.$dateRangePicker.data('daterangepicker').setStartDate(startDate); // '2014-03-01'
                    this.startDate = startDate;
                }
            }

            if (typeof endDate !== 'undefined') {
                if (this.endDate != endDate) {
                    // endDate type: Date/moment/string
                    //console.log('setEndDate');
                    this.$dateRangePicker.data('daterangepicker').setEndDate(endDate); // '2014-03-01'
                    this.endDate = endDate;
                }
            }

            var _startDate = this.$dateRangePicker.data('daterangepicker').startDate,
                _endDate = this.$dateRangePicker.data('daterangepicker').endDate;
            this.displayDate(_startDate, _endDate);
        }

        this.setState(this.setStateObject(nextProps));
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var startName = _props.startName;
        var endName = _props.endName;
        var width = _props.width;

        return React.createElement(
            'div',
            { id: this.id, className: classNames('daterangepicker-ranges pull-right', className), style: { width: width } },
            React.createElement(
                'i',
                { className: 'glyphicon glyphicon-calendar fa fa-calendar' },
                ' '
            ),
            React.createElement('span', null),
            React.createElement('b', { className: 'caret' }),
            React.createElement('input', { type: 'hidden', name: startName }),
            React.createElement('input', { type: 'hidden', name: endName })
        );
    }
});

module.exports = DateRanges;

},{"../services/DateUtil":58,"../services/Util":59,"classnames":2,"react":32}],41:[function(require,module,exports){
/**
 * Fieldset component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Fieldset />
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Fieldset = React.createClass({
    displayName: 'Fieldset',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        legend: PropTypes.string,
        expand: PropTypes.bool,
        collapsible: PropTypes.bool,
        onToggle: PropTypes.func,
        onInit: PropTypes.func
    },
    id: '',
    toggle: function toggle(props) {
        if (this.props.collapsible === true) {
            if (typeof props.expand !== 'undefined') {
                this.setState({ expand: props.expand });
            } else {
                this.setState({ expand: true });
            }
        }
    },
    onToggle: function onToggle(event) {
        var expand = !this.state.expand;
        this.toggle({ expand: expand });

        if (typeof this.props.onToggle === 'function') {
            this.props.onToggle(expand);
        }
    },
    getDefaultProps: function getDefaultProps() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        return { legend: 'Title', collapsible: true, expand: true };
    },
    getInitialState: function getInitialState() {
        // 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        return { expand: this.props.expand };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        if (typeof this.props.onInit === 'function') {
            var data = {};
            data.expand = this.state.expand;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.toggle(nextProps);
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var legend = _props.legend;
        var collapsible = _props.collapsible;


        var display,
            collapsed = false;
        if (this.state.expand === true) {
            display = 'block';
        } else {
            display = 'none';
            if (collapsible === true) {
                collapsed = true;
            }
        }

        return React.createElement(
            'fieldset',
            { className: classNames('fieldset', className, { collapsible: collapsible, collapsed: collapsed }) },
            React.createElement(
                'legend',
                { onClick: this.onToggle, name: this.id },
                ' ',
                legend
            ),
            React.createElement(
                'div',
                { style: { display: display } },
                React.createElement(
                    'div',
                    { id: this.id },
                    this.props.children
                )
            )
        );
    }
});

module.exports = Fieldset;

},{"../services/util":60,"classnames":2,"react":32}],42:[function(require,module,exports){
/**
 * HiddenContent component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.HiddenContent id={id} />
 *
 */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var React = require('react');
//var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');

var HiddenContent = _react2.default.createClass({
    displayName: 'HiddenContent',
    propTypes: {
        id: _react.PropTypes.string,
        className: _react.PropTypes.string,
        expandLabel: _react.PropTypes.string,
        collapseLabel: _react.PropTypes.string,
        expandIcon: _react.PropTypes.string,
        collapseIcon: _react.PropTypes.string,
        isBottom: _react.PropTypes.bool
    },
    id: '',
    onExpandCollapse: function onExpandCollapse(event) {
        //console.log(event);
        var node = event.target;
        var aTag = node.parentNode;
        if ($(aTag).next().css('display') === 'none') {
            this.setState({ label: this.props.collapseLabel, icon: this.props.collapseIcon });
            $(aTag).next().css('display', 'block');
        } else {
            this.setState({ label: this.props.expandLabel, icon: this.props.expandIcon });
            $(aTag).next().css('display', 'none');
        }
    },
    onBottomCollapse: function onBottomCollapse(event) {
        var node = event.target,
            div = node.parentNode.parentNode;
        $(div).css('display', 'none');
        this.setState({ label: this.props.expandLabel, icon: this.props.expandIcon });
    },
    getInitialState: function getInitialState() {

        var label = this.props.expandLabel;
        if (typeof label === 'undefined') {
            label = 'Expand';
        }

        var icon = this.props.expandIcon;

        return { label: label, icon: icon };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    render: function render() {
        // 필수 항목
        var Icon;
        if (typeof this.state.icon === 'string') {
            Icon = _react2.default.createElement(
                'i',
                { className: this.state.icon },
                ' '
            );
        }

        // 맨 아래 접기버튼 처리
        var BottomButton;
        if (this.props.isBottom === true) {
            var CollapseIcon = undefined;
            if (typeof this.props.collapseIcon === 'string') {
                CollapseIcon = _react2.default.createElement(
                    'i',
                    { className: this.props.collapseIcon },
                    ' '
                );
            }

            BottomButton = _react2.default.createElement(
                'a',
                { href: '#' + this.id, onClick: this.onBottomCollapse },
                CollapseIcon,
                this.props.collapseLabel
            );
        }

        return _react2.default.createElement(
            'div',
            { className: classNames('hidden-content', this.props.className) },
            _react2.default.createElement(
                'a',
                { href: 'javascript:void(0)', onClick: this.onExpandCollapse, name: this.id },
                Icon,
                this.state.label
            ),
            _react2.default.createElement(
                'div',
                { style: { display: 'none' } },
                _react2.default.createElement(
                    'div',
                    { id: this.id },
                    this.props.children
                ),
                BottomButton
            )
        );
    }
});

module.exports = HiddenContent;

},{"../services/Util":59,"classnames":2,"react":32}],43:[function(require,module,exports){
/**
 * JqGrid component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/02/29
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.JqGrid options={options} />
 *
 * jqGrid 라이브러리에 종속적이다.
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
//var classNames = require('classnames');
//var ReactDom = require('react-dom');

var Util = require('../services/Util');

function getUUID() {
	return Util.getUUID();
}

var defaultOptions = {
	mtype: 'POST',
	datatype: "json",
	styleUI: 'Bootstrap',
	jsonReader: {
		page: 'resultValue.page',
		total: 'resultValue.total',
		root: 'resultValue.list',
		records: 'resultValue.records',
		repeatitems: false,
		//id: 'id',
		cell: 'resultValue.cell'
	},
	//caption: "공지사항 목록",
	viewrecords: true,
	recordpos: 'left', // record(현재 인덱스/ 총개수) 위치
	rowNum: 20,
	rowList: [20, 40, 60, 80, 100],
	autowidth: true,
	shrinkToFit: true, // 컬럼 width가 자동조절인지(true) 지정한 값인지(false)
	height: 'auto',
	//gridview: true,
	//hidegrid: true,		// 그리드 접힘/펼침 버튼 유무
	//altRows: true,
	//autoencode: true,
	multiselect: true,
	multiboxonly: false,
	grouping: false, // grouping 할 경우 default groupText 설정 (grouping 제어는 ctrl에서 한다.)
	groupingView: {
		//    	groupField : ['invdate'],
		//    	groupColumnShow : [true],
		groupText: ['<b>{0} ({1})</b>']
		//    	groupCollapse : false,
		//    	groupOrder: ['desc'],
		//    	groupSummary: [false]
	}
};

var JqGrid = React.createClass({
	displayName: 'JqGrid',
	propTypes: {
		id: PropTypes.string,
		pagerId: PropTypes.string,
		className: PropTypes.string,
		options: PropTypes.object,
		paging: PropTypes.bool
	},
	id: getUUID(),
	pagerId: '',
	getOptions: function getOptions() {
		var propOptions = this.props.options,
		    options = $.extend({}, defaultOptions, propOptions);

		if (propOptions && propOptions.hasOwnProperty('groupingView')) {
			$.extend(options['groupingView'], defaultOptions['groupingView'], propOptions['groupingView']);
		}

		// 페이징 처리
		if (typeof this.props.paging === 'undefined') {
			options.pager = '#' + this.pagerId;
		} else {
			if (this.props.paging == true) {
				options.pager = '#' + this.pagerId;
			}
		}

		return options;
	},
	init: function init() {

		$('#' + this.id).jqGrid(this.getOptions());

		/*
  $(element).find("#eventsgrid")[0].addJSONData(this.props.eventsModel.attributes);
  $(element).find("#eventsgrid").jqGrid('setSelection', this.props.eventModel.attributes.title, false);
  */
		//$(element).find("#eventsgrid").jqGrid('sortGrid', 'title', false, context.props.gridData.order.sortorder); Bool not fired?¿?¿¿ -> Obrir cas a tirand!!!!!!
	},
	componentWillMount: function componentWillMount() {
		// 최초 렌더링이 일어나기 직전(한번 호출)
		var id = this.props.id;
		if (typeof id === 'undefined') {
			id = Util.getUUID();
		}

		this.id = id;

		var pagerId = this.props.pagerId;
		if (typeof pagerId === 'undefined') {
			pagerId = Util.getUUID();
		}

		this.pagerId = pagerId;
	},
	componentDidMount: function componentDidMount() {
		//console.log('JqGrid Component componentDidMount');
		this.init();
	},
	componentWillUpdate: function componentWillUpdate() {
		//console.log('JqGrid Component componentWillUpdate');
		//var element = this.findDOMNode();//getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		//console.log('JqGrid Component componentDidUpdate');
		//var element = this.getDOMNode();
		//this.init();
	},
	componentWillUnmount: function componentWillUnmount() {
		//console.log('JqGrid Component componentWillUnmount');
		//var element = this.getDOMNode();
		//$(element).find("#eventsgrid").GridUnload();
	},
	render: function render() {
		//console.log('JqGrid Component render');
		/*
  var _table = function() {
  	return React.DOM.table({ref: 'jqgrid'});
  };
  var _pager = function() {
  	return React.DOM.div({ref: 'jqgrid_pager'});
  };
  console.log(_table());
  console.log(_pager());
  return (
  	<div>
  		{React.DOM.table({ref: 'jqgrid'})}
  		{React.DOM.div({ref: 'jqgrid_pager'})}
  	</div>
  );
  */
		return React.createElement(
			'div',
			{ className: this.props.className },
			React.createElement('table', { id: this.id }),
			React.createElement('div', { id: this.pagerId })
		);
	}
});

module.exports = JqGrid;

},{"../services/Util":59,"react":32}],44:[function(require,module,exports){
/**
 * JsTree component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.JsTree options="{options}" />
 *
 * JsTree 라이브러리에 종속적이다.
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
//var classNames = require('classnames');

var Util = require('../services/Util');

var defaultOptions = {
    core: {
        data: {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            cache: false,
            beforeSend: function beforeSend(xhr) {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("application/json");
                }
            }
        }
    }
};

var JsTree = React.createClass({
    displayName: 'JsTree',
    propTypes: {
        className: PropTypes.string,
        options: PropTypes.object
    },
    id: '',
    getOptions: function getOptions() {

        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        if (propOptions && propOptions.hasOwnProperty('core') && propOptions['core'].hasOwnProperty('data')) {
            //$.extend(options['core']['data'], defaultOptions['core']['data'], propOptions['core']['data']);
            options['core']['data'] = $.extend({}, defaultOptions['core']['data'], propOptions['core']['data']);
        }

        return options;
    },
    onSelectNode: function onSelectNode(event, data) {
        if (typeof this.props.onSelectNode === 'function') {
            //console.log('select_node');
            //console.log(data.selected);
            //console.log(event);
            //console.log(data);
            this.props.onSelectNode(event, data);
            event.stopImmediatePropagation();
        }
    },
    onChanged: function onChanged(event, data) {
        if (typeof this.props.onChanged === 'function') {
            this.props.onChanged(event, data);
        }
    },
    onDblClick: function onDblClick(event, data) {
        if (typeof this.props.onDblClick === 'function') {
            this.props.onDblClick(event, data);
        }
    },
    init: function init() {
        var tree = $('#' + this.id);
        tree.jstree(this.getOptions());

        // setting events
        tree.on('select_node.jstree', this.onSelectNode);
        tree.on('changed.jstree', this.onChanged);
        tree.on('dblclick.jstree', this.onDblClick);
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    render: function render() {
        // 필수 항목
        return React.createElement('div', { className: this.props.className, id: this.id });
    }
});

module.exports = JsTree;

},{"../services/Util":59,"react":32}],45:[function(require,module,exports){
/**
 * Modal component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Modal ref="modal" width="700px">
 *   <Pum.ModalHeader>Modal Title</Pum.ModalHeader>
 *   <Pum.ModalBody>Modal Body</Pum.ModalBody>
 *   <Pum.ModalFooter>Modal Footer</Pum.ModalFooter>
 * </Pum.Modal>
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var ModalHeader = React.createClass({
    displayName: 'ModalHeader',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
                'button',
                { type: 'button', className: 'close', 'data-dismiss': 'modal' },
                React.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '×'
                ),
                React.createElement(
                    'span',
                    { className: 'sr-only' },
                    'Close'
                )
            ),
            React.createElement(
                'span',
                { className: 'modal-title' },
                this.props.children
            )
        );
    }
});

var ModalBody = React.createClass({
    displayName: 'ModalBody',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'modal-body' },
            this.props.children
        );
    }
});

var ModalFooter = React.createClass({
    displayName: 'ModalFooter',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'modal-footer' },
            this.props.children
        );
    }
});

var Modal = React.createClass({
    displayName: 'Modal',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        width: PropTypes.string,
        backdrop: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onInit: PropTypes.func
    },
    id: '',
    show: function show() {
        var alert = $('#' + this.id);
        alert.modal('show');
        /*
        if(this.props.backdrop === true) {
            alert.modal('show');
        }else {
            alert.modal({
                backdrop: 'static',
                keyboard: false
            });
        }
        */
    },
    hide: function hide() {
        var alert = $('#' + this.id);
        alert.modal('hide');
    },
    onShow: function onShow(event) {
        if (typeof this.props.onShow === 'function') {
            this.props.onShow(event);
            //event.stopImmediatePropagation();
        }
    },
    onHide: function onHide(event) {
        if (typeof this.props.onHide === 'function') {
            this.props.onHide(event);
            //event.stopImmediatePropagation();
        }
    },
    getChildren: function getChildren() {
        var children = this.props.children;

        return React.Children.map(children, function (child) {
            if (child === null) {
                return null;
            }

            return React.cloneElement(child, {});
        });
    },
    getDefaultProps: function getDefaultProps() {
        return { backdrop: false };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        var modal = $('#' + this.id);
        if (this.props.backdrop === false) {
            modal.attr('data-backdrop', 'static');
            modal.attr('data-keyboard', false);
        }

        modal.on('shown.bs.modal', this.onShow);
        modal.on('hidden.bs.modal', this.onHide);

        if (typeof this.props.onInit === 'function') {
            var data = {};
            data.id = this.id;
            this.props.onInit(data);
        }
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var width = _props.width;


        return React.createElement(
            'div',
            { id: this.id, className: classNames('modal', 'fade', className), role: 'dialog', 'aria-labelledby': '', 'aria-hidden': 'true' },
            React.createElement(
                'div',
                { className: 'modal-dialog', style: { width: width } },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    this.getChildren()
                )
            )
        );
    }
});

module.exports = {
    Modal: Modal,
    ModalHeader: ModalHeader,
    ModalBody: ModalBody,
    ModalFooter: ModalFooter
};

},{"../services/util":60,"classnames":2,"react":32}],46:[function(require,module,exports){
/**
 * Panel component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Panel  />
 *
 * bootstrap component
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var PanelHeader = React.createClass({
    displayName: 'PanelHeader',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'panel-heading' },
            React.createElement(
                'div',
                { className: 'panel-title' },
                this.props.children
            )
        );
    }
});

var PanelBody = React.createClass({
    displayName: 'PanelBody',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'panel-body' },
            this.props.children
        );
    }
});

var PanelFooter = React.createClass({
    displayName: 'PanelFooter',
    render: function render() {
        // 필수 항목
        return React.createElement(
            'div',
            { className: 'panel-footer' },
            this.props.children
        );
    }
});

var Panel = React.createClass({
    displayName: 'Panel',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        onInit: PropTypes.func
    },
    id: '',
    getChildren: function getChildren() {
        var children = this.props.children;

        return React.Children.map(children, function (child) {
            if (child === null) {
                return null;
            }

            return React.cloneElement(child, {});
        });
    },
    getDefaultProps: function getDefaultProps() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        return { className: 'panel-default' };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        if (typeof this.props.onInit === 'function') {
            this.props.onInit();
        }
    },
    render: function render() {
        // 필수 항목
        var className = this.props.className;


        return React.createElement(
            'div',
            { className: classNames('panel', className) },
            this.getChildren()
        );
    }
});

module.exports = {
    Panel: Panel,
    PanelHeader: PanelHeader,
    PanelBody: PanelBody,
    PanelFooter: PanelFooter
};

},{"../services/util":60,"classnames":2,"react":32}],47:[function(require,module,exports){
/**
 * Select component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/12
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Select options="{options}" />
 *
 * bootstrap-select 라이브러리에 종속적이다.
 * https://silviomoreto.github.io/bootstrap-select/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/Util');

var defaultOptions = {
    //size: 4
    width: '150px'
};

var Select = React.createClass({
    displayName: 'Select',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        name: PropTypes.string,
        labelKey: PropTypes.string,
        valueKey: PropTypes.string,
        groupKey: PropTypes.string,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        selectedValue: PropTypes.string,
        disabled: PropTypes.bool,
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        selectedItem: PropTypes.object
    },
    id: '',
    getOptions: function getOptions() {
        var propOptions = this.props.options,
            options = $.extend({}, defaultOptions, propOptions);

        return options;
    },
    setStateObject: function setStateObject(props) {
        var items = props.items;
        if (typeof items === 'undefined') {
            items = [];
        }

        var selectedIndex = props.selectedIndex;
        if (typeof selectedIndex === 'undefined') {
            if (this.state && this.state.selectedIndex) {
                selectedIndex = this.state.selectedIndex;
            } else {
                selectedIndex = 0;
            }
        }

        var disabled = props.disabled;
        if (typeof disabled === 'undefined') {
            disabled = false;
        }

        var multiple = props.multiple;
        if (typeof multiple === 'undefined') {
            multiple = false;
        }

        return {
            items: items,
            selectedIndex: selectedIndex,
            disabled: disabled,
            multiple: multiple
        };
    },
    onChange: function onChange(event, index) {
        if (typeof this.props.onChange === 'function') {
            //console.log('select onChange');
            //console.log(event);
            //console.log(index);
            this.props.onChange(event, index);
            //event.stopImmediatePropagation();
        }
    },
    init: function init() {
        var select = $('#' + this.id);
        select.selectpicker(this.getOptions());

        // setting events
        select.on('changed.bs.select', this.onChange);
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        this.init();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        //console.log('componentWillUpdate');
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        //console.log('componentDidUpdate');
        var select = $('#' + this.id);
        select.selectpicker('refresh');
    },
    render: function render() {
        // 필수 항목
        var items = [],
            labelKey = this.props.labelKey,
            valueKey = this.props.valueKey;
        $.each(this.state.items, function (index, item) {
            //items.push(React.createElement('option', {value: item[valueKey]}, item[labelKey]));
            items.push(React.createElement(
                'option',
                { value: item[valueKey] },
                item[labelKey]
            ));
        });
        {/*
            let labelKey = this.props.labelKey, valueKey = this.props.valueKey;
            let items = React.Children.map(this.state.items, (item) => {
               console.log(item);
               return React.createElement ('option', {value: item[valueKey]}, item[labelKey]);
            });
            */}
        return React.createElement(
            'select',
            { className: classNames('selectpicker', this.props.className), id: this.id, name: this.props.name,
                disabled: this.state.disabled, multiple: this.state.multiple },
            React.Children.toArray(items)
        );
    }
});

module.exports = Select;

},{"../services/Util":59,"classnames":2,"react":32}],48:[function(require,module,exports){
/**
 * Splitter component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/05
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Splitter />
 *
 * jQuery Splitter Plugin 라이브러리에 종속적이다.
 * http://methvin.com/splitter/
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var SplitterPane = React.createClass({
    displayName: 'SplitterPane',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var id = _props.id;
        var className = _props.className;
        var minWidth = _props.minWidth;
        var minHeight = _props.minHeight;


        return React.createElement(
            'div',
            { id: id, className: classNames('splitter-pane', className), style: { minWidth: minWidth, minHeight: minHeight } },
            this.props.children
        );
    }
});

var Splitter = React.createClass({
    displayName: 'Splitter',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        type: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        minWidth: PropTypes.number,
        minHeight: PropTypes.number,
        sizeLeft: PropTypes.number,
        sizeRight: PropTypes.number,
        sizeTop: PropTypes.number,
        sizeBottom: PropTypes.number,
        minLeft: PropTypes.number,
        minRight: PropTypes.number,
        minTop: PropTypes.number,
        minBottom: PropTypes.number,
        maxLeft: PropTypes.number,
        maxRight: PropTypes.number,
        maxTop: PropTypes.number,
        maxBottom: PropTypes.number,
        anchorToWindow: PropTypes.bool,
        onInit: PropTypes.func
    },
    id: '',
    getChildren: function getChildren() {
        var _this = this;

        var children = this.props.children,
            count = 0;

        return React.Children.map(children, function (child) {
            if (child === null) {
                return null;
            }

            var extraChildProps = {};
            if (count++ < 2) {
                if (child.props.type === 'h' || child.props.type === 'v') {
                    _this.childId = Util.getUUID();
                    _this.childProps = child.props;
                    _this.childOptions = _this.getOptions(child.props);

                    extraChildProps = {
                        id: _this.childId
                    };
                }

                return React.cloneElement(child, extraChildProps);
            }
        });
    },
    getOptions: function getOptions(props) {
        var type = props.type;
        var sizeLeft = props.sizeLeft;
        var sizeRight = props.sizeRight;
        var sizeTop = props.sizeTop;
        var sizeBottom = props.sizeBottom;
        var minLeft = props.minLeft;
        var minRight = props.minRight;
        var minTop = props.minTop;
        var minBottom = props.minBottom;
        var maxLeft = props.maxLeft;
        var maxRight = props.maxRight;
        var maxTop = props.maxTop;
        var maxBottom = props.maxBottom;
        var anchorToWindow = props.anchorToWindow;

        // options (getDefaultProps 에서 초기화, childOptions 인 경우는 초기화 안되어 있음)

        var options = typeof props.options === 'undefined' ? {} : props.options;

        // type
        if (type === 'v' || type === 'h') {
            options.type = type;
        } else {
            options.type = 'v';
        }

        // pane size
        if (typeof sizeLeft === 'number') {
            options.sizeLeft = sizeLeft;
        }

        if (typeof sizeRight === 'number') {
            options.sizeRight = sizeRight;
        }

        if (typeof sizeTop === 'number') {
            options.sizeTop = sizeTop;
        }

        if (typeof sizeBottom === 'number') {
            options.sizeBottom = sizeBottom;
        }

        // pane min
        if (typeof minLeft === 'number') {
            options.minLeft = minLeft;
        }

        if (typeof minRight === 'number') {
            options.minRight = minRight;
        }

        if (typeof minTop === 'number') {
            options.minTop = minTop;
        }

        if (typeof minBottom === 'number') {
            options.minBottom = minBottom;
        }

        // pane max
        if (typeof maxLeft === 'number') {
            options.maxLeft = maxLeft;
        }

        if (typeof maxRight === 'number') {
            options.maxRight = maxRight;
        }

        if (typeof maxTop === 'number') {
            options.maxTop = maxTop;
        }

        if (typeof maxBottom === 'number') {
            options.maxBottom = maxBottom;
        }

        // anchorToWindow
        if (typeof anchorToWindow === 'boolean') {
            options.anchorToWindow = anchorToWindow;
        }

        //options.resizeToWidth = true;

        return options;
    },
    getDefaultProps: function getDefaultProps() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        return { options: {}, type: 'v' };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        var sp = $('#' + this.id),
            props = this.props;

        // min-width, min-height 설정(splitter() 호출전에 설정해야 적용이 된다.)
        // 3-Column 일 경우 반드시 minHeight 설정
        if (typeof props.minWidth === 'number') {
            sp.css('min-width', props.minWidth + 'px');
        }

        if (typeof props.minHeight === 'number') {
            sp.css('min-height', props.minHeight + 'px');
        }

        // Horizontal 인 경우 splitter 호출전 height 설정 되어야 함
        var spHeight;
        if (props.type === 'h') {
            if (typeof props.height === 'number') {
                spHeight = props.height;
            } else {
                spHeight = $(window).height();
            }

            sp.css('height', spHeight + 'px');
        }

        // splitter
        sp.splitter(this.getOptions(props));

        if (typeof this.childId === 'string') {
            var spChild = $('#' + this.childId);

            // Horizontal 인 경우 splitter 호출전 height 설정 되어야 함
            var spChildHeight;
            if (this.childProps.type === 'h') {
                if (typeof this.childProps.height === 'number') {
                    spChildHeight = this.childProps.height;
                } else {
                    spChildHeight = $(window).height();
                }

                console.log(sp.height());
                spChild.css('height', sp.height() + 'px');
            }

            spChild.splitter(this.childOptions);
        }

        // window resize
        var height, paneHeight;
        $(window).bind('resize', function () {
            if (typeof props.height === 'number') {
                height = props.height;
            } else {
                height = $(window).height();
            }

            sp.css('height', height + 'px');

            if (props.type === 'v') {
                paneHeight = sp.height();
                sp.find('.splitter-pane').css('height', paneHeight + 'px');
                sp.find('.vsplitbar').css('height', paneHeight + 'px');
            } else if (props.type === 'h') {
                sp.find('.hsplitbar').css('width', sp.width() + 'px');
            }
        }).trigger('resize');

        //$("#MySplitter").css('height', height + 'px').trigger('resize');

        if (typeof this.props.onInit === 'function') {
            this.props.onInit();
        }
    },
    render: function render() {
        // 필수 항목
        var className = this.props.className;


        return React.createElement(
            'div',
            { id: this.id, className: classNames('splitter', className) },
            this.getChildren()
        );
    }
});

module.exports = {
    Splitter: Splitter,
    SplitterPane: SplitterPane
};

},{"../services/util":60,"classnames":2,"react":32}],49:[function(require,module,exports){
/**
 * Stepper component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/19
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Stepper name="name1" value={10} min={0} max={100} step={5} />
 *
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var Stepper = React.createClass({
    displayName: 'Stepper',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        value: PropTypes.number, // defaultValue 사용해서 하는 방법 생각해 보자
        direction: PropTypes.string, // horizontal/vertical (default: vertical)
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number, // default 1
        width: PropTypes.string,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    },
    id: '',
    _step: 1,
    _direction: 'input-group-btn-vertical',
    onChange: function onChange(event) {
        // input 직접입력시
        //console.log(event.target.value);
        var value = Number(event.target.value);
        if (!isNaN(value)) {
            if (!(this.isOverMin(value) || this.isOverMax(value))) {
                this.updateValue(event, value, false);
            }
        }
    },
    onIncrement: function onIncrement(event) {
        this.updateValueClick(event, this._step);
    },
    onDecrement: function onDecrement(event) {
        this.updateValueClick(event, this._step * -1);
    },
    isOverMax: function isOverMax(value) {
        var b = false;
        if (typeof this.props.max !== 'undefined') {
            if (value > this.props.max) {
                b = true;
            }
        }
        return b;
    },
    isOverMin: function isOverMin(value) {
        var b = false;
        if (typeof this.props.min !== 'undefined') {
            if (value < this.props.min) {
                b = true;
            }
        }
        return b;
    },
    updateValueClick: function updateValueClick(event, step) {
        var value = this.state.value + step;
        if (this.isOverMin(value)) {
            this.setState({ downDisabled: true });
        } else if (this.isOverMax(value)) {
            this.setState({ upDisabled: true });
        } else {
            this.updateValue(event, value, true);
        }
    },
    updateValue: function updateValue(event, value, isClick) {
        if (isClick) {
            this.setState({ value: value, upDisabled: false, downDisabled: false });
        } else {
            this.setState({ value: value });
        }

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    },
    setStateObject: function setStateObject(props) {
        var value = props.value;
        if (typeof value === 'undefined') {
            value = 0;
        }

        var disabled = props.disabled,
            upDisabled = undefined,
            downDisabled = undefined;
        if (typeof disabled === 'undefined') {
            disabled = upDisabled = downDisabled = false;
        } else {
            upDisabled = downDisabled = disabled;
        }

        return {
            value: value,
            disabled: disabled,
            upDisabled: upDisabled,
            downDisabled: downDisabled
        };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }
        this.id = id;

        // step
        if (typeof this.props.step !== 'undefined') {
            this._step = this.props.step;
        }

        // direction
        var direction = this.props.direction;
        if (direction == 'horizontal') {
            this._direction = "input-group-btn-horizontal";
        } else {
            this._direction = "input-group-btn-vertical";
        }
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var name = _props.name;
        var width = _props.width;


        return React.createElement(
            'div',
            { className: classNames('input-group', 'stepper', className), style: { width: width } },
            React.createElement('input', { type: 'text', className: 'form-control', name: name, value: this.state.value, onChange: this.onChange, style: { width: 'inherit' }, disabled: this.state.disabled }),
            React.createElement(
                'div',
                { className: classNames(this._direction) },
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.onIncrement, disabled: this.state.upDisabled },
                    React.createElement('i', { className: 'fa fa-caret-up' })
                ),
                React.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: this.onDecrement, disabled: this.state.downDisabled },
                    React.createElement('i', { className: 'fa fa-caret-down' })
                )
            )
        );
    }
});

module.exports = Stepper;

},{"../services/util":60,"classnames":2,"react":32}],50:[function(require,module,exports){
/**
 * TagsInput component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/04/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TagsInput options={options} />
 *
 * TagsInput 라이브러리에 종속적이다.
 * https://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Util = require('../services/util');

var TagsInput = React.createClass({
    displayName: 'TagsInput',
    propTypes: {
        id: PropTypes.string,
        className: PropTypes.string,
        options: PropTypes.object,
        name: PropTypes.string,
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool,
        onInit: PropTypes.func,
        onChange: PropTypes.func,
        category: PropTypes.oneOf(['News', 'Photos']).isRequired,
        //dialog: PropTypes.instanceOf(Dialog).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    },
    id: '',
    getDefaultProps: function getDefaultProps() {
        // 클래스가 생성될 때 한번 호출되고 캐시된다.
        // 부모 컴포넌트에서 prop이 넘어오지 않은 경우 (in 연산자로 확인) 매핑의 값이 this.props에 설정된다.
        console.log('1. getDefaultProps');
        return { value: 'default value' };
    },
    getInitialState: function getInitialState() {
        // 컴포넌트가 마운트되기 전 (한번 호출) / 리턴값은 this.state의 초기값으로 사용
        console.log('2. getInitialState');
        return { data: [] };
    },
    componentWillMount: function componentWillMount() {
        // 최초 렌더링이 일어나기 직전(한번 호출)
        console.log('3. componentWillMount');
        var id = this.props.id;
        if (typeof id === 'undefined') {
            id = Util.getUUID();
        }

        this.id = id;
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        console.log('5. componentDidMount');
        if (typeof this.props.onInit === 'function') {
            var data = {};
            data.key = value;
            this.props.onInit(data);
        }
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillReceiveProps');
    },
    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
        // 새로운 props나 state를 받았을 때 렌더링 직전에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentWillUpdate');
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
        // 컴포넌트의 업데이트가 DOM에 반영된 직후에 호출(최초 렌더링 시에는 호출되지 않음)
        console.log('componentDidUpdate');
    },
    componentWillUnmount: function componentWillUnmount() {
        // 컴포넌트가 DOM에서 마운트 해제 되기 직전에 호출
        console.log('componentWillUnmount');
    },
    render: function render() {
        // 필수 항목
        console.log('4. render');
        var className = this.props.className;


        return React.createElement('div', { id: this.id, className: classNames('panel', className) });
    }
});

module.exports = TagsInput;

},{"../services/util":60,"classnames":2,"react":32}],51:[function(require,module,exports){
/**
 * Radio component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Radio options="{options}" />
 *
 */
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classNames = require('classnames');

var Radio = _react2.default.createClass({
    displayName: 'Radio',
    propTypes: {
        className: _react.PropTypes.string,
        name: _react.PropTypes.string,
        selectedValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
        onChange: _react.PropTypes.func,
        value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool])
    },
    render: function render() {
        // 필수 항목
        var _props = this.props;
        var className = _props.className;
        var name = _props.name;
        var selectedValue = _props.selectedValue;
        var onChange = _props.onChange;
        var value = _props.value;

        var optional = {};
        if (selectedValue !== undefined) {
            optional.checked = this.props.value === selectedValue;
        }
        /*
        if(typeof onChange === 'function') {
            optional.onChange = onChange.bind(null, this.props.value);
        }
        */
        optional.onChange = onChange.bind(null, this.props.value);

        return _react2.default.createElement(
            'div',
            { className: 'radio' },
            _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', _extends({ type: 'radio', className: className, name: name, value: value
                }, optional)),
                _react2.default.createElement(
                    'span',
                    { className: 'lbl' },
                    this.props.children
                )
            )
        );
    }
});

module.exports = Radio;

},{"classnames":2,"react":32}],52:[function(require,module,exports){
/**
 * RadioGroup component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/17
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.RadioGroup options="{options}" />
 *
 */
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classNames = require('classnames');

var RadioGroup = _react2.default.createClass({
    displayName: 'RadioGroup',
    propTypes: {
        className: _react.PropTypes.string,
        name: _react.PropTypes.string,
        selectedValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
        onChange: _react.PropTypes.func,
        horizontal: _react.PropTypes.bool
    },
    onChange: function onChange(value, event) {
        this.setState({ selectedValue: value });
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event, value);
        }
    },
    getChildren: function getChildren() {
        var _props = this.props;
        var className = _props.className;
        var name = _props.name;
        var children = _props.children;
        var selectedValue = this.state.selectedValue;
        var onChange = this.onChange;

        return _react2.default.Children.map(children, function (radio) {
            if (radio === null) {
                return null;
            }

            return _react2.default.cloneElement(radio, {
                className: className,
                name: name,
                selectedValue: selectedValue,
                onChange: onChange
            });
        });
    },
    setStateObject: function setStateObject(props) {
        var selectedValue = props.selectedValue;
        if (typeof selectedValue === 'undefined') {
            selectedValue = null;
        }

        return {
            selectedValue: selectedValue
        };
    },
    getInitialState: function getInitialState() {
        return this.setStateObject(this.props);
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //console.log('componentDidMount');
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        // 컴포넌트가 새로운 props를 받을 때 호출(최초 렌더링 시에는 호출되지 않음)
        this.setState(this.setStateObject(nextProps));
    },
    render: function render() {
        // 필수 항목
        return _react2.default.createElement(
            'div',
            { className: classNames({ 'radio-horizontal': this.props.horizontal }) },
            this.getChildren()
        );
    }
});

module.exports = RadioGroup;

},{"classnames":2,"react":32}],53:[function(require,module,exports){
/**
 * Tab component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Tab />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var Tab = React.createClass({
    displayName: 'Tab',
    propTypes: {
        selected: PropTypes.bool,
        disabled: PropTypes.bool
    },
    render: function render() {
        // 필수 항목
        return React.createElement(
            'li',
            { className: classNames({ active: this.props.selected }, { disabled: this.props.disabled }) },
            React.createElement(
                'a',
                { role: 'tab' },
                this.props.children
            )
        );
    }
});

module.exports = Tab;

},{"classnames":2,"react":32}],54:[function(require,module,exports){
/**
 * TabContent component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabContent />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;
var classNames = require('classnames');

var TabContent = React.createClass({
    displayName: 'TabContent',
    propTypes: {
        selected: PropTypes.bool
    },
    render: function render() {
        // �ʼ� �׸�
        return React.createElement(
            'div',
            { className: classNames('tab-pane', { active: this.props.selected }) },
            this.props.children
        );
    }
});

module.exports = TabContent;

},{"classnames":2,"react":32}],55:[function(require,module,exports){
/**
 * TabContents component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabContents />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');

var TabContents = React.createClass({
    displayName: 'TabContents',
    render: function render() {
        // �ʼ� �׸�
        return React.createElement(
            'div',
            { className: 'tab-content' },
            this.props.children
        );
    }
});

module.exports = TabContents;

},{"react":32}],56:[function(require,module,exports){
/**
 * Tabs component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.TabSet className={className} selectedIndex={0} onSelect={func} />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');
var PropTypes = require('react').PropTypes;

var Util = require('../../services/Util');

function getUUID() {
    return Util.getUUID();
}

function isTabNode(node) {
    return node.nodeName === 'A' && node.getAttribute('role') === 'tab';
}

var TabSet = React.createClass({
    displayName: 'TabSet',
    propTypes: {
        className: PropTypes.string,
        selectedIndex: PropTypes.number,
        onSelect: PropTypes.func
    },
    id: getUUID(),
    getTabsCount: function getTabsCount() {
        return this.props.children && this.props.children[0] ? React.Children.count(this.props.children[0].props.children) : 0;
    },
    getChildren: function getChildren() {
        var _this = this;

        var children = this.props.children,
            count = 0,
            index = 0;

        return React.Children.map(children, function (child) {
            if (child === null) {
                return null;
            }
            var result;

            // Tabs
            if (count++ === 0) {
                result = React.cloneElement(child, {
                    children: React.Children.map(child.props.children, function (tab) {
                        if (tab === null) {
                            return null;
                        }

                        var selected = _this.state.selectedIndex === index,
                            disabled = false;

                        index++;

                        return React.cloneElement(tab, {
                            selected: selected,
                            disabled: disabled
                        });
                    })
                });

                index = 0;
            } else {
                // TabContents
                result = React.cloneElement(child, {
                    children: React.Children.map(child.props.children, function (tabContent) {
                        var selected = _this.state.selectedIndex === index;
                        index++;
                        return React.cloneElement(tabContent, {
                            selected: selected
                        });
                    })
                });
            }
            return result;
        });
    },
    onSelectTab: function onSelectTab(event) {
        var node = event.target;
        if (isTabNode(node)) {
            var ul = node.parentNode.parentNode,
                li = node.parentNode;
            var index = [].slice.call(ul.children).indexOf(li);

            this.setSelectedIndex(index);
        }
    },
    setSelectedIndex: function setSelectedIndex(index) {

        if (index === this.state.selectedIndex) return;
        if (index < 0 || index >= this.getTabsCount()) return;

        var prevIndex = this.state.selectedIndex;

        this.setState({ selectedIndex: index });

        if (typeof this.props.onSelect === 'function') {
            this.props.onSelect(index, prevIndex);
        }
    },

    getInitialState: function getInitialState() {
        var selectedIndex = this.props.selectedIndex;
        if (typeof selectedIndex === 'undefined') {
            if (this.state && this.state.selectedIndex) {
                selectedIndex = this.state.selectedIndex;
            } else {
                selectedIndex = 0;
            }
        }
        return { selectedIndex: selectedIndex };
    },
    componentDidMount: function componentDidMount() {
        // 최초 렌더링이 일어난 다음(한번 호출)
        //console.log('TabSet Component componentDidMount');
    },
    render: function render() {
        // 필수 항목
        //console.log('TabSet render');
        //console.log(this.props.children[0].type());
        return React.createElement(
            'div',
            { className: this.props.className,
                onClick: this.onSelectTab },
            this.getChildren()
        );
    }
});

module.exports = TabSet;

},{"../../services/Util":59,"react":32}],57:[function(require,module,exports){
/**
 * Tabs component
 *
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/08
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 *
 * example:
 * <Pum.Tabs />
 *
 * Bootstrap CSS
 */
'use strict';

var React = require('react');

var Util = require('../../services/Util');

function getUUID() {
    return Util.getUUID();
}

var Tabs = React.createClass({
    displayName: 'Tabs',
    id: getUUID(),
    render: function render() {
        // �ʼ� �׸�
        return React.createElement(
            'ul',
            { className: 'nav nav-tabs' },
            this.props.children
        );
    }
});

module.exports = Tabs;

},{"../../services/Util":59,"react":32}],58:[function(require,module,exports){
/**
 * ps-util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/01
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * app.controller('Ctrl', ['$scope', 'psUtil', function($scope, psUtil) {
 * 	   var rootPath = psUtil.getRootPath();
 * }]);
 * 
 */
'use strict';

function getDateToString(date) {
	var year = date.getFullYear(),
	    month = zerofill(date.getMonth() + 1, 2),
	    day = zerofill(date.getDate(), 2),
	    hours = date.getHours() < 0 ? '00' : zerofill(date.getHours(), 2),
	    // daterangepicker hours 9시간 오버표시되는 버그로 인해 빼준다.
	minutes = zerofill(date.getMinutes(), 2),
	    seconds = zerofill(date.getSeconds(), 2),
	    dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

	return dateString;
}

function zerofill(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
		for (var i = 0; i < digits - n.length; i++) {
			zero += '0';
		}
	}

	return zero + n;
}

module.exports = {
	getDateToString: getDateToString
};

},{}],59:[function(require,module,exports){
/**
 * Util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/01
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * var Util = require('../services/Util');
 * Util.getUUID();
 *
 */
'use strict';

function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
		    v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > milliseconds) {
			break;
		}
	}
}

module.exports = {
	getUUID: getUUID,
	sleep: sleep
};

//angular.module('ps.services.util', [])
//.factory('psUtil', ['$window', '$location', function($window, $location) {
//	var factory = {};
//	factory.show = function(msg) {
//        $window.alert(msg);
//    };
//
//    factory.reverse = function(name) {
//		return name.split("").reverse().join("");
//	};
//
//	// root path
//	factory.getRootPath = function() {
//		// js에서 ContextPath 를 얻을 수 없음 - Root Path를 얻어서 응용하자.
//		/*var offset=location.href.indexOf(location.host)+location.host.length;
//	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
//	    return ctxPath;*/
//
//	    var offset = $window.location.href.indexOf($window.location.host) + $window.location.host.length;
//	    var ctxPath = $window.location.href.substring(offset, $window.location.href.indexOf('/', offset + 1));
//	    return ctxPath;
//	};
//
//	// uuid
//	factory.getUUID = function() {
//		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//			return v.toString(16);
//		});
//	};
//
//	// tooltip
//	factory.tooltip = function(selector) {
//
//		if(typeof selector === 'undefined') {
//			selector = '[data-toggle="tooltip"]';
//		}
////		$(selector).bsTooltip();
//		$(selector).tooltip();
//	};
//
//    return factory;
//}]);

},{}],60:[function(require,module,exports){
/**
 * Util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/03/01
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * var Util = require('../services/Util');
 * Util.getUUID();
 *
 */
'use strict';

function getUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
		    v = c == 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > milliseconds) {
			break;
		}
	}
}

module.exports = {
	getUUID: getUUID,
	sleep: sleep
};

//angular.module('ps.services.util', [])
//.factory('psUtil', ['$window', '$location', function($window, $location) {
//	var factory = {};
//	factory.show = function(msg) {
//        $window.alert(msg);
//    };
//
//    factory.reverse = function(name) {
//		return name.split("").reverse().join("");
//	};
//
//	// root path
//	factory.getRootPath = function() {
//		// js에서 ContextPath 를 얻을 수 없음 - Root Path를 얻어서 응용하자.
//		/*var offset=location.href.indexOf(location.host)+location.host.length;
//	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
//	    return ctxPath;*/
//
//	    var offset = $window.location.href.indexOf($window.location.host) + $window.location.host.length;
//	    var ctxPath = $window.location.href.substring(offset, $window.location.href.indexOf('/', offset + 1));
//	    return ctxPath;
//	};
//
//	// uuid
//	factory.getUUID = function() {
//		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
//			return v.toString(16);
//		});
//	};
//
//	// tooltip
//	factory.tooltip = function(selector) {
//
//		if(typeof selector === 'undefined') {
//			selector = '[data-toggle="tooltip"]';
//		}
////		$(selector).bsTooltip();
//		$(selector).tooltip();
//	};
//
//    return factory;
//}]);

},{}]},{},[33])(33)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvS2V5RXNjYXBlVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50VHJlZUhvb2suanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHVyZUNvbXBvbmVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jYW5EZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY2hlY2tSZWFjdFR5cGVTcGVjLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9vbmx5Q2hpbGQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3JlYWN0UHJvZEludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyIsInJlYWN0LW9uZS5qcyIsInNyY1xcT25lLmpzIiwic3JjXFxjb21wb25lbnRzXFxBbGVydC5qcyIsInNyY1xcY29tcG9uZW50c1xcQXV0b2NvbXBsZXRlLmpzIiwic3JjXFxjb21wb25lbnRzXFxDaGVja2JveC5qcyIsInNyY1xcY29tcG9uZW50c1xcRGF0ZVBpY2tlci5qcyIsInNyY1xcY29tcG9uZW50c1xcRGF0ZVJhbmdlUGlja2VyMS5qcyIsInNyY1xcY29tcG9uZW50c1xcRGF0ZVJhbmdlcy5qcyIsInNyY1xcY29tcG9uZW50c1xcRmllbGRzZXQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEhpZGRlbkNvbnRlbnQuanMiLCJzcmNcXGNvbXBvbmVudHNcXEpxR3JpZC5qcyIsInNyY1xcY29tcG9uZW50c1xcSnNUcmVlLmpzIiwic3JjXFxjb21wb25lbnRzXFxNb2RhbC5qcyIsInNyY1xcY29tcG9uZW50c1xcUGFuZWwuanMiLCJzcmNcXGNvbXBvbmVudHNcXFNlbGVjdC5qcyIsInNyY1xcY29tcG9uZW50c1xcU3BsaXR0ZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXFN0ZXBwZXIuanMiLCJzcmNcXGNvbXBvbmVudHNcXFRhZ3NJbnB1dC5qcyIsInNyY1xcY29tcG9uZW50c1xccmFkaW9cXFJhZGlvLmpzIiwic3JjXFxjb21wb25lbnRzXFxyYWRpb1xcUmFkaW9Hcm91cC5qcyIsInNyY1xcY29tcG9uZW50c1xcdGFic1xcVGFiLmpzIiwic3JjXFxjb21wb25lbnRzXFx0YWJzXFxUYWJDb250ZW50LmpzIiwic3JjXFxjb21wb25lbnRzXFx0YWJzXFxUYWJDb250ZW50cy5qcyIsInNyY1xcY29tcG9uZW50c1xcdGFic1xcVGFiU2V0LmpzIiwic3JjXFxjb21wb25lbnRzXFx0YWJzXFxUYWJzLmpzIiwic3JjXFxzZXJ2aWNlc1xcRGF0ZVV0aWwuanMiLCJzcmNcXHNlcnZpY2VzXFxVdGlsLmpzIiwic3JjXFxzZXJ2aWNlc1xcdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMzc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ25WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNoYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QVcsT0FBWCxFQUFSLENBRHdCO0FBRTVCLE1BQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEdBQUosRUFBUyxHQUF6QixFQUE4QjtBQUM3QixNQUFJLElBQUssSUFBSixHQUFXLE9BQVgsS0FBdUIsS0FBdkIsR0FBZ0MsWUFBakMsRUFBK0M7QUFDbEQsU0FEa0Q7R0FBbkQ7RUFERDtDQUZEOztBQVNBLE9BQU8sT0FBUCxHQUFpQjtBQUNoQixVQUFTLE9BQVQ7QUFDQSxRQUFPLEtBQVA7Q0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgc2V0VGltZW91dChkcmFpblF1ZXVlLCAwKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0OyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9O1xuXG4gICAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IF9wcm9kSW52YXJpYW50KCcyNScpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICAvLyBDYXN0aW5nIGFzIGFueSBzbyB0aGF0IGZsb3cgaWdub3JlcyB0aGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGFuZCB0cnVzdHNcbiAgLy8gaXQgdG8gbWF0Y2ggdGhlIHR5cGUgd2UgZGVjbGFyZWRcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0UHVyZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RQdXJlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudDtcbiAgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xuICBjbG9uZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY2xvbmVFbGVtZW50O1xufVxuXG52YXIgX19zcHJlYWQgPSBfYXNzaWduO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZCwgJ1JlYWN0Ll9fc3ByZWFkIGlzIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBub3QgYmUgdXNlZC4gVXNlICcgKyAnT2JqZWN0LmFzc2lnbiBkaXJlY3RseSBvciBhbm90aGVyIGhlbHBlciBmdW5jdGlvbiB3aXRoIHNpbWlsYXIgJyArICdzZW1hbnRpY3MuIFlvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8geW91ciBjb21waWxlci4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcHJlYWQtZGVwcmVjYXRpb24gZm9yIG1vcmUgZGV0YWlscy4nKSA6IHZvaWQgMDtcbiAgICB3YXJuZWQgPSB0cnVlO1xuICAgIHJldHVybiBfYXNzaWduLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBSZWFjdFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gIGlzVmFsaWRFbGVtZW50OiBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gQ2xhc3NpY1xuXG4gIFByb3BUeXBlczogUmVhY3RQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICBjcmVhdGVNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgLy8gQ3VycmVudGx5IGEgbm9vcC4gV2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIGFuZCB0cmFjZSBtaXhpbnMuXG4gICAgcmV0dXJuIG1peGluO1xuICB9LFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3RvcmllcyxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgLy8gRGVwcmVjYXRlZCBob29rIGZvciBKU1ggc3ByZWFkLCBkb24ndCB1c2UgdGhpcyBmb3IgYW55dGhpbmcuXG4gIF9fc3ByZWFkOiBfX3NwcmVhZFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKSxcbiAgICBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9ICdtaXhpbnMnO1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGFub255bW91cyBmdW5jdGlvbnMgd2hpY2ggZG8gbm90XG4vLyBoYXZlIC5uYW1lIHNldCB0byB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgYmVpbmcgYXNzaWduZWQgdG8uXG5mdW5jdGlvbiBpZGVudGl0eShmbikge1xuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xuXG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBob3N0IGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6ICdERUZJTkVfT05DRScsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICdERUZJTkVfT05DRScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiAnT1ZFUlJJREVfQkFTRSdcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjaGlsZENvbnRleHRUeXBlcywgJ2NoaWxkQ29udGV4dCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzLCBjaGlsZENvbnRleHRUeXBlcyk7XG4gIH0sXG4gIGNvbnRleHRUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsICdjb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsICdwcm9wJyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0eXBlb2YgdHlwZURlZltwcm9wTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAnUmVhY3QuUHJvcFR5cGVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCBwcm9wTmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSkge1xuICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSkgPyBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdIDogbnVsbDtcblxuICAvLyBEaXNhbGxvdyBvdmVycmlkaW5nIG9mIGJhc2UgY2xhc3MgbWV0aG9kcyB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoUmVhY3RDbGFzc01peGluLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgIShzcGVjUG9saWN5ID09PSAnT1ZFUlJJREVfQkFTRScpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSBgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyBkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzMnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzQnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB0eXBlb2ZTcGVjID0gdHlwZW9mIHNwZWM7XG4gICAgICB2YXIgaXNNaXhpblZhbGlkID0gdHlwZW9mU3BlYyA9PT0gJ29iamVjdCcgJiYgc3BlYyAhPT0gbnVsbDtcblxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaXNNaXhpblZhbGlkLCAnJXM6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gaW5jbHVkZSBhIG1peGluIHRoYXQgaXMgZWl0aGVyIG51bGwgJyArICdvciBub3QgYW4gb2JqZWN0LiBDaGVjayB0aGUgbWl4aW5zIGluY2x1ZGVkIGJ5IHRoZSBjb21wb25lbnQsICcgKyAnYXMgd2VsbCBhcyBhbnkgbWl4aW5zIHRoZXkgaW5jbHVkZSB0aGVtc2VsdmVzLiAnICsgJ0V4cGVjdGVkIG9iamVjdCBidXQgZ290ICVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgc3BlYyA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2ZTcGVjKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc1JykgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gdXNlIGEgY29tcG9uZW50IGFzIGEgbWl4aW4uIEluc3RlYWQsIGp1c3QgdXNlIGEgcmVndWxhciBvYmplY3QuJykgOiBfcHJvZEludmFyaWFudCgnNzYnKSA6IHZvaWQgMDtcblxuICB2YXIgcHJvdG8gPSBDb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIHZhciBhdXRvQmluZFBhaXJzID0gcHJvdG8uX19yZWFjdEF1dG9CaW5kUGFpcnM7XG5cbiAgLy8gQnkgaGFuZGxpbmcgbWl4aW5zIGJlZm9yZSBhbnkgb3RoZXIgcHJvcGVydGllcywgd2UgZW5zdXJlIHRoZSBzYW1lXG4gIC8vIGNoYWluaW5nIG9yZGVyIGlzIGFwcGxpZWQgdG8gbWV0aG9kcyB3aXRoIERFRklORV9NQU5ZIHBvbGljeSwgd2hldGhlclxuICAvLyBtaXhpbnMgYXJlIGxpc3RlZCBiZWZvcmUgb3IgYWZ0ZXIgdGhlc2UgbWV0aG9kcyBpbiB0aGUgc3BlYy5cbiAgaWYgKHNwZWMuaGFzT3duUHJvcGVydHkoTUlYSU5TX0tFWSkpIHtcbiAgICBSRVNFUlZFRF9TUEVDX0tFWVMubWl4aW5zKENvbnN0cnVjdG9yLCBzcGVjLm1peGlucyk7XG4gIH1cblxuICBmb3IgKHZhciBuYW1lIGluIHNwZWMpIHtcbiAgICBpZiAoIXNwZWMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSBNSVhJTlNfS0VZKSB7XG4gICAgICAvLyBXZSBoYXZlIGFscmVhZHkgaGFuZGxlZCBtaXhpbnMgaW4gYSBzcGVjaWFsIGNhc2UgYWJvdmUuXG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIgcHJvcGVydHkgPSBzcGVjW25hbWVdO1xuICAgIHZhciBpc0FscmVhZHlEZWZpbmVkID0gcHJvdG8uaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKTtcblxuICAgIGlmIChSRVNFUlZFRF9TUEVDX0tFWVMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIFJFU0VSVkVEX1NQRUNfS0VZU1tuYW1lXShDb25zdHJ1Y3RvciwgcHJvcGVydHkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXR1cCBtZXRob2RzIG9uIHByb3RvdHlwZTpcbiAgICAgIC8vIFRoZSBmb2xsb3dpbmcgbWVtYmVyIG1ldGhvZHMgc2hvdWxkIG5vdCBiZSBhdXRvbWF0aWNhbGx5IGJvdW5kOlxuICAgICAgLy8gMS4gRXhwZWN0ZWQgUmVhY3RDbGFzcyBtZXRob2RzIChpbiB0aGUgXCJpbnRlcmZhY2VcIikuXG4gICAgICAvLyAyLiBPdmVycmlkZGVuIG1ldGhvZHMgKHRoYXQgd2VyZSBtaXhlZCBpbikuXG4gICAgICB2YXIgaXNSZWFjdENsYXNzTWV0aG9kID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIHByb3BlcnR5ID09PSAnZnVuY3Rpb24nO1xuICAgICAgdmFyIHNob3VsZEF1dG9CaW5kID0gaXNGdW5jdGlvbiAmJiAhaXNSZWFjdENsYXNzTWV0aG9kICYmICFpc0FscmVhZHlEZWZpbmVkICYmIHNwZWMuYXV0b2JpbmQgIT09IGZhbHNlO1xuXG4gICAgICBpZiAoc2hvdWxkQXV0b0JpbmQpIHtcbiAgICAgICAgYXV0b0JpbmRQYWlycy5wdXNoKG5hbWUsIHByb3BlcnR5KTtcbiAgICAgICAgcHJvdG9bbmFtZV0gPSBwcm9wZXJ0eTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc0FscmVhZHlEZWZpbmVkKSB7XG4gICAgICAgICAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlW25hbWVdO1xuXG4gICAgICAgICAgLy8gVGhlc2UgY2FzZXMgc2hvdWxkIGFscmVhZHkgYmUgY2F1Z2h0IGJ5IHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUuXG4gICAgICAgICAgIShpc1JlYWN0Q2xhc3NNZXRob2QgJiYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnIHx8IHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBVbmV4cGVjdGVkIHNwZWMgcG9saWN5ICVzIGZvciBrZXkgJXMgd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc3Jywgc3BlY1BvbGljeSwgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBhIHJlc2VydmVkIHByb3BlcnR5LCBgJXNgLCB0aGF0IHNob3VsZG5cXCd0IGJlIG9uIHRoZSBcInN0YXRpY3NcIiBrZXkuIERlZmluZSBpdCBhcyBhbiBpbnN0YW5jZSBwcm9wZXJ0eSBpbnN0ZWFkOyBpdCB3aWxsIHN0aWxsIGJlIGFjY2Vzc2libGUgb24gdGhlIGNvbnN0cnVjdG9yLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc4JywgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICB2YXIgaXNJbmhlcml0ZWQgPSBuYW1lIGluIENvbnN0cnVjdG9yO1xuICAgICEhaXNJbmhlcml0ZWQgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OScsIG5hbWUpIDogdm9pZCAwO1xuICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYnV0IHRocm93IGlmIGJvdGggY29udGFpbiB0aGUgc2FtZSBrZXkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHR3byBUaGUgc2Vjb25kIG9iamVjdFxuICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICovXG5mdW5jdGlvbiBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKG9uZSwgdHdvKSB7XG4gICEob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBDYW5ub3QgbWVyZ2Ugbm9uLW9iamVjdHMuJykgOiBfcHJvZEludmFyaWFudCgnODAnKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogVHJpZWQgdG8gbWVyZ2UgdHdvIG9iamVjdHMgd2l0aCB0aGUgc2FtZSBrZXk6IGAlc2AuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluOyBpbiBwYXJ0aWN1bGFyLCB0aGlzIG1heSBiZSBjYXVzZWQgYnkgdHdvIGdldEluaXRpYWxTdGF0ZSgpIG9yIGdldERlZmF1bHRQcm9wcygpIG1ldGhvZHMgcmV0dXJuaW5nIG9iamVjdHMgd2l0aCBjbGFzaGluZyBrZXlzLicsIGtleSkgOiBfcHJvZEludmFyaWFudCgnODEnLCBrZXkpIDogdm9pZCAwO1xuICAgICAgb25lW2tleV0gPSB0d29ba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9uZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIG1lcmdlcyB0aGVpciByZXR1cm4gdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkUmVzdWx0KCkge1xuICAgIHZhciBhID0gb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdmFyIGIgPSB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoYSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYjtcbiAgICB9IGVsc2UgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGE7XG4gICAgfVxuICAgIHZhciBjID0ge307XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBhKTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGIpO1xuICAgIHJldHVybiBjO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgaWdub3JlcyB0aGVpciByZXR1cm4gdmFsZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluZWRGdW5jdGlvbihvbmUsIHR3bykge1xuICByZXR1cm4gZnVuY3Rpb24gY2hhaW5lZEZ1bmN0aW9uKCkge1xuICAgIG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG4vKipcbiAqIEJpbmRzIGEgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gbWV0aG9kIE1ldGhvZCB0byBiZSBib3VuZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBUaGUgYm91bmQgbWV0aG9kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpIHtcbiAgdmFyIGJvdW5kTWV0aG9kID0gbWV0aG9kLmJpbmQoY29tcG9uZW50KTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ2JpbmQoKTogWW91IGFyZSBiaW5kaW5nIGEgY29tcG9uZW50IG1ldGhvZCB0byB0aGUgY29tcG9uZW50LiAnICsgJ1JlYWN0IGRvZXMgdGhpcyBmb3IgeW91IGF1dG9tYXRpY2FsbHkgaW4gYSBoaWdoLXBlcmZvcm1hbmNlICcgKyAnd2F5LCBzbyB5b3UgY2FuIHNhZmVseSByZW1vdmUgdGhpcyBjYWxsLiBTZWUgJXMnLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgcmV0dXJuIGJvdW5kTWV0aG9kO1xuICAgICAgfVxuICAgICAgdmFyIHJlYm91bmRNZXRob2QgPSBfYmluZC5hcHBseShib3VuZE1ldGhvZCwgYXJndW1lbnRzKTtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQ29udGV4dCA9IGNvbXBvbmVudDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBhcmdzO1xuICAgICAgcmV0dXJuIHJlYm91bmRNZXRob2Q7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gYm91bmRNZXRob2Q7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGF1dG8tYm91bmQgbWV0aG9kcyBpbiBhIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZHMoY29tcG9uZW50KSB7XG4gIHZhciBwYWlycyA9IGNvbXBvbmVudC5fX3JlYWN0QXV0b0JpbmRQYWlycztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHZhciBhdXRvQmluZEtleSA9IHBhaXJzW2ldO1xuICAgIHZhciBtZXRob2QgPSBwYWlyc1tpICsgMV07XG4gICAgY29tcG9uZW50W2F1dG9CaW5kS2V5XSA9IGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBZGQgbW9yZSB0byB0aGUgUmVhY3RDbGFzcyBiYXNlIGNsYXNzLiBUaGVzZSBhcmUgYWxsIGxlZ2FjeSBmZWF0dXJlcyBhbmRcbiAqIHRoZXJlZm9yZSBub3QgYWxyZWFkeSBwYXJ0IG9mIHRoZSBtb2Rlcm4gUmVhY3RDb21wb25lbnQuXG4gKi9cbnZhciBSZWFjdENsYXNzTWl4aW4gPSB7XG5cbiAgLyoqXG4gICAqIFRPRE86IFRoaXMgd2lsbCBiZSBkZXByZWNhdGVkIGJlY2F1c2Ugc3RhdGUgc2hvdWxkIGFsd2F5cyBrZWVwIGEgY29uc2lzdGVudFxuICAgKiB0eXBlIHNpZ25hdHVyZSBhbmQgdGhlIG9ubHkgdXNlIGNhc2UgZm9yIHRoaXMsIGlzIHRvIGF2b2lkIHRoYXQuXG4gICAqL1xuICByZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChuZXdTdGF0ZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVJlcGxhY2VTdGF0ZSh0aGlzLCBuZXdTdGF0ZSk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAncmVwbGFjZVN0YXRlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlci5pc01vdW50ZWQodGhpcyk7XG4gIH1cbn07XG5cbnZhciBSZWFjdENsYXNzQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge307XG5fYXNzaWduKFJlYWN0Q2xhc3NDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q2xhc3NNaXhpbik7XG5cbi8qKlxuICogTW9kdWxlIGZvciBjcmVhdGluZyBjb21wb3NpdGUgY29tcG9uZW50cy5cbiAqXG4gKiBAY2xhc3MgUmVhY3RDbGFzc1xuICovXG52YXIgUmVhY3RDbGFzcyA9IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbXBvc2l0ZSBjb21wb25lbnQgY2xhc3MgZ2l2ZW4gYSBjbGFzcyBzcGVjaWZpY2F0aW9uLlxuICAgKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlY2xhc3NcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHNwZWMgQ2xhc3Mgc3BlY2lmaWNhdGlvbiAod2hpY2ggbXVzdCBkZWZpbmUgYHJlbmRlcmApLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn0gQ29tcG9uZW50IGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjcmVhdGVDbGFzczogZnVuY3Rpb24gKHNwZWMpIHtcbiAgICAvLyBUbyBrZWVwIG91ciB3YXJuaW5ncyBtb3JlIHVuZGVyc3RhbmRhYmxlLCB3ZSdsbCB1c2UgYSBsaXR0bGUgaGFjayBoZXJlIHRvXG4gICAgLy8gZW5zdXJlIHRoYXQgQ29uc3RydWN0b3IubmFtZSAhPT0gJ0NvbnN0cnVjdG9yJy4gVGhpcyBtYWtlcyBzdXJlIHdlIGRvbid0XG4gICAgLy8gdW5uZWNlc3NhcmlseSBpZGVudGlmeSBhIGNsYXNzIHdpdGhvdXQgZGlzcGxheU5hbWUgYXMgJ0NvbnN0cnVjdG9yJy5cbiAgICB2YXIgQ29uc3RydWN0b3IgPSBpZGVudGl0eShmdW5jdGlvbiAocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgICAgIC8vIFRoaXMgY29uc3RydWN0b3IgZ2V0cyBvdmVycmlkZGVuIGJ5IG1vY2tzLiBUaGUgYXJndW1lbnQgaXMgdXNlZFxuICAgICAgLy8gYnkgbW9ja3MgdG8gYXNzZXJ0IG9uIHdoYXQgZ2V0cyBtb3VudGVkLlxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3IsICdTb21ldGhpbmcgaXMgY2FsbGluZyBhIFJlYWN0IGNvbXBvbmVudCBkaXJlY3RseS4gVXNlIGEgZmFjdG9yeSBvciAnICsgJ0pTWCBpbnN0ZWFkLiBTZWU6IGh0dHBzOi8vZmIubWUvcmVhY3QtbGVnYWN5ZmFjdG9yeScpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBXaXJlIHVwIGF1dG8tYmluZGluZ1xuICAgICAgaWYgKHRoaXMuX19yZWFjdEF1dG9CaW5kUGFpcnMubGVuZ3RoKSB7XG4gICAgICAgIGJpbmRBdXRvQmluZE1ldGhvZHModGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuXG4gICAgICAvLyBSZWFjdENsYXNzZXMgZG9lc24ndCBoYXZlIGNvbnN0cnVjdG9ycy4gSW5zdGVhZCwgdGhleSB1c2UgdGhlXG4gICAgICAvLyBnZXRJbml0aWFsU3RhdGUgYW5kIGNvbXBvbmVudFdpbGxNb3VudCBtZXRob2RzIGZvciBpbml0aWFsaXphdGlvbi5cblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHRoaXMuZ2V0SW5pdGlhbFN0YXRlID8gdGhpcy5nZXRJbml0aWFsU3RhdGUoKSA6IG51bGw7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAvLyBXZSBhbGxvdyBhdXRvLW1vY2tzIHRvIHByb2NlZWQgYXMgaWYgdGhleSdyZSByZXR1cm5pbmcgbnVsbC5cbiAgICAgICAgaWYgKGluaXRpYWxTdGF0ZSA9PT0gdW5kZWZpbmVkICYmIHRoaXMuZ2V0SW5pdGlhbFN0YXRlLl9pc01vY2tGdW5jdGlvbikge1xuICAgICAgICAgIC8vIFRoaXMgaXMgcHJvYmFibHkgYmFkIHByYWN0aWNlLiBDb25zaWRlciB3YXJuaW5nIGhlcmUgYW5kXG4gICAgICAgICAgLy8gZGVwcmVjYXRpbmcgdGhpcyBjb252ZW5pZW5jZS5cbiAgICAgICAgICBpbml0aWFsU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAhKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGluaXRpYWxTdGF0ZSkpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzgyJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfSk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ2NyZWF0ZUNsYXNzKC4uLik6IENsYXNzIHNwZWNpZmljYXRpb24gbXVzdCBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuJykgOiBfcHJvZEludmFyaWFudCgnODMnKSA6IHZvaWQgMDtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFNob3VsZFVwZGF0ZSwgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcygpLiBEaWQgeW91IG1lYW4gY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcygpPycsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gUmVkdWNlIHRpbWUgc3BlbnQgZG9pbmcgbG9va3VwcyBieSBzZXR0aW5nIHRoZXNlIG9uIHRoZSBwcm90b3R5cGUuXG4gICAgZm9yICh2YXIgbWV0aG9kTmFtZSBpbiBSZWFjdENsYXNzSW50ZXJmYWNlKSB7XG4gICAgICBpZiAoIUNvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSkge1xuICAgICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfSxcblxuICBpbmplY3Rpb246IHtcbiAgICBpbmplY3RNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgICBpbmplY3RlZE1peGlucy5wdXNoKG1peGluKTtcbiAgICB9XG4gIH1cblxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENsYXNzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQgPSB7fTtcblxuLyoqXG4gKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIHRvIG11dGF0ZVxuICogc3RhdGUuIFlvdSBzaG91bGQgdHJlYXQgYHRoaXMuc3RhdGVgIGFzIGltbXV0YWJsZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICogYWNjZXNzaW5nIGB0aGlzLnN0YXRlYCBhZnRlciBjYWxsaW5nIHRoaXMgbWV0aG9kIG1heSByZXR1cm4gdGhlIG9sZCB2YWx1ZS5cbiAqXG4gKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBjYWxscyB0byBgc2V0U3RhdGVgIHdpbGwgcnVuIHN5bmNocm9ub3VzbHksXG4gKiBhcyB0aGV5IG1heSBldmVudHVhbGx5IGJlIGJhdGNoZWQgdG9nZXRoZXIuICBZb3UgY2FuIHByb3ZpZGUgYW4gb3B0aW9uYWxcbiAqIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCB3aGVuIHRoZSBjYWxsIHRvIHNldFN0YXRlIGlzIGFjdHVhbGx5XG4gKiBjb21wbGV0ZWQuXG4gKlxuICogV2hlbiBhIGZ1bmN0aW9uIGlzIHByb3ZpZGVkIHRvIHNldFN0YXRlLCBpdCB3aWxsIGJlIGNhbGxlZCBhdCBzb21lIHBvaW50IGluXG4gKiB0aGUgZnV0dXJlIChub3Qgc3luY2hyb25vdXNseSkuIEl0IHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIHVwIHRvIGRhdGVcbiAqIGNvbXBvbmVudCBhcmd1bWVudHMgKHN0YXRlLCBwcm9wcywgY29udGV4dCkuIFRoZXNlIHZhbHVlcyBjYW4gYmUgZGlmZmVyZW50XG4gKiBmcm9tIHRoaXMuKiBiZWNhdXNlIHlvdXIgZnVuY3Rpb24gbWF5IGJlIGNhbGxlZCBhZnRlciByZWNlaXZlUHJvcHMgYnV0IGJlZm9yZVxuICogc2hvdWxkQ29tcG9uZW50VXBkYXRlLCBhbmQgdGhpcyBuZXcgc3RhdGUsIHByb3BzLCBhbmQgY29udGV4dCB3aWxsIG5vdCB5ZXQgYmVcbiAqIGFzc2lnbmVkIHRvIHRoaXMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R8ZnVuY3Rpb259IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgb3IgZnVuY3Rpb24gdG9cbiAqICAgICAgICBwcm9kdWNlIG5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBjdXJyZW50IHN0YXRlLlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBfcHJvZEludmFyaWFudCgnODUnKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKSA6IHZvaWQgMDtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGZvciAodmFyIGZuTmFtZSBpbiBkZXByZWNhdGVkQVBJcykge1xuICAgIGlmIChkZXByZWNhdGVkQVBJcy5oYXNPd25Qcm9wZXJ0eShmbk5hbWUpKSB7XG4gICAgICBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcoZm5OYW1lLCBkZXByZWNhdGVkQVBJc1tmbk5hbWVdKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENvbXBvbmVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE2LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGlzTmF0aXZlKGZuKSB7XG4gIC8vIEJhc2VkIG9uIGlzTmF0aXZlKCkgZnJvbSBMb2Rhc2hcbiAgdmFyIGZ1bmNUb1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbiAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICsgZnVuY1RvU3RyaW5nXG4gIC8vIFRha2UgYW4gZXhhbXBsZSBuYXRpdmUgZnVuY3Rpb24gc291cmNlIGZvciBjb21wYXJpc29uXG4gIC5jYWxsKGhhc093blByb3BlcnR5KVxuICAvLyBTdHJpcCByZWdleCBjaGFyYWN0ZXJzIHNvIHdlIGNhbiB1c2UgaXQgZm9yIHJlZ2V4XG4gIC5yZXBsYWNlKC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZywgJ1xcXFwkJicpXG4gIC8vIFJlbW92ZSBoYXNPd25Qcm9wZXJ0eSBmcm9tIHRoZSB0ZW1wbGF0ZSB0byBtYWtlIGl0IGdlbmVyaWNcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnKTtcbiAgdHJ5IHtcbiAgICB2YXIgc291cmNlID0gZnVuY1RvU3RyaW5nLmNhbGwoZm4pO1xuICAgIHJldHVybiByZUlzTmF0aXZlLnRlc3Qoc291cmNlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbnZhciBjYW5Vc2VDb2xsZWN0aW9ucyA9XG4vLyBBcnJheS5mcm9tXG50eXBlb2YgQXJyYXkuZnJvbSA9PT0gJ2Z1bmN0aW9uJyAmJlxuLy8gTWFwXG50eXBlb2YgTWFwID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcCkgJiZcbi8vIE1hcC5wcm90b3R5cGUua2V5c1xuTWFwLnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBNYXAucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwLnByb3RvdHlwZS5rZXlzKSAmJlxuLy8gU2V0XG50eXBlb2YgU2V0ID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldCkgJiZcbi8vIFNldC5wcm90b3R5cGUua2V5c1xuU2V0LnByb3RvdHlwZSAhPSBudWxsICYmIHR5cGVvZiBTZXQucHJvdG90eXBlLmtleXMgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0LnByb3RvdHlwZS5rZXlzKTtcblxudmFyIHNldEl0ZW07XG52YXIgZ2V0SXRlbTtcbnZhciByZW1vdmVJdGVtO1xudmFyIGdldEl0ZW1JRHM7XG52YXIgYWRkUm9vdDtcbnZhciByZW1vdmVSb290O1xudmFyIGdldFJvb3RJRHM7XG5cbmlmIChjYW5Vc2VDb2xsZWN0aW9ucykge1xuICB2YXIgaXRlbU1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHJvb3RJRFNldCA9IG5ldyBTZXQoKTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgaXRlbU1hcC5zZXQoaWQsIGl0ZW0pO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuIGl0ZW1NYXAuZ2V0KGlkKTtcbiAgfTtcbiAgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIGl0ZW1NYXBbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0SXRlbUlEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShpdGVtTWFwLmtleXMoKSk7XG4gIH07XG5cbiAgYWRkUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJvb3RJRFNldC5hZGQoaWQpO1xuICB9O1xuICByZW1vdmVSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0WydkZWxldGUnXShpZCk7XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20ocm9vdElEU2V0LmtleXMoKSk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgaXRlbUJ5S2V5ID0ge307XG4gIHZhciByb290QnlLZXkgPSB7fTtcblxuICAvLyBVc2Ugbm9uLW51bWVyaWMga2V5cyB0byBwcmV2ZW50IFY4IHBlcmZvcm1hbmNlIGlzc3VlczpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzIzMlxuICB2YXIgZ2V0S2V5RnJvbUlEID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcmV0dXJuICcuJyArIGlkO1xuICB9O1xuICB2YXIgZ2V0SURGcm9tS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiBwYXJzZUludChrZXkuc3Vic3RyKDEpLCAxMCk7XG4gIH07XG5cbiAgc2V0SXRlbSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGl0ZW1CeUtleVtrZXldID0gaXRlbTtcbiAgfTtcbiAgZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJldHVybiBpdGVtQnlLZXlba2V5XTtcbiAgfTtcbiAgcmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSBpdGVtQnlLZXlba2V5XTtcbiAgfTtcbiAgZ2V0SXRlbUlEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoaXRlbUJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcm9vdEJ5S2V5W2tleV0gPSB0cnVlO1xuICB9O1xuICByZW1vdmVSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIHJvb3RCeUtleVtrZXldO1xuICB9O1xuICBnZXRSb290SURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhyb290QnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xufVxuXG52YXIgdW5tb3VudGVkSURzID0gW107XG5cbmZ1bmN0aW9uIHB1cmdlRGVlcChpZCkge1xuICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICBpZiAoaXRlbSkge1xuICAgIHZhciBjaGlsZElEcyA9IGl0ZW0uY2hpbGRJRHM7XG5cbiAgICByZW1vdmVJdGVtKGlkKTtcbiAgICBjaGlsZElEcy5mb3JFYWNoKHB1cmdlRGVlcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCBzb3VyY2UsIG93bmVyTmFtZSkge1xuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIChzb3VyY2UgPyAnIChhdCAnICsgc291cmNlLmZpbGVOYW1lLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKSArICc6JyArIHNvdXJjZS5saW5lTnVtYmVyICsgJyknIDogb3duZXJOYW1lID8gJyAoY3JlYXRlZCBieSAnICsgb3duZXJOYW1lICsgJyknIDogJycpO1xufVxuXG5mdW5jdGlvbiBnZXREaXNwbGF5TmFtZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gJyNlbXB0eSc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBlbGVtZW50ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiAnI3RleHQnO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LnR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlLmRpc3BsYXlOYW1lIHx8IGVsZW1lbnQudHlwZS5uYW1lIHx8ICdVbmtub3duJztcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUlEKGlkKSB7XG4gIHZhciBuYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShpZCk7XG4gIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgdmFyIG93bmVySUQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldE93bmVySUQoaWQpO1xuICB2YXIgb3duZXJOYW1lO1xuICBpZiAob3duZXJJRCkge1xuICAgIG93bmVyTmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUob3duZXJJRCk7XG4gIH1cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCkgOiB2b2lkIDA7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5jaGlsZElEcyA9IG5leHRDaGlsZElEcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dENoaWxkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmV4dENoaWxkSUQgPSBuZXh0Q2hpbGRJRHNbaV07XG4gICAgICB2YXIgbmV4dENoaWxkID0gZ2V0SXRlbShuZXh0Q2hpbGRJRCk7XG4gICAgICAhbmV4dENoaWxkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIGhvb2sgZXZlbnRzIHRvIGZpcmUgZm9yIHRoZSBjaGlsZCBiZWZvcmUgaXRzIHBhcmVudCBpbmNsdWRlcyBpdCBpbiBvblNldENoaWxkcmVuKCkuJykgOiBfcHJvZEludmFyaWFudCgnMTQwJykgOiB2b2lkIDA7XG4gICAgICAhKG5leHRDaGlsZC5jaGlsZElEcyAhPSBudWxsIHx8IHR5cGVvZiBuZXh0Q2hpbGQuZWxlbWVudCAhPT0gJ29iamVjdCcgfHwgbmV4dENoaWxkLmVsZW1lbnQgPT0gbnVsbCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDEnKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uTW91bnRDb21wb25lbnQoKSB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzcxJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgaWQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25CZWZvcmVNb3VudENvbXBvbmVudCgpIHBhcmVudCBhbmQgb25TZXRDaGlsZHJlbigpIHRvIGJlIGNvbnNpc3RlbnQgKCVzIGhhcyBwYXJlbnRzICVzIGFuZCAlcykuJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogX3Byb2RJbnZhcmlhbnQoJzE0MicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IHZvaWQgMDtcbiAgICB9XG4gIH0sXG4gIG9uQmVmb3JlTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCwgcGFyZW50SUQpIHtcbiAgICB2YXIgaXRlbSA9IHtcbiAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICBwYXJlbnRJRDogcGFyZW50SUQsXG4gICAgICB0ZXh0OiBudWxsLFxuICAgICAgY2hpbGRJRHM6IFtdLFxuICAgICAgaXNNb3VudGVkOiBmYWxzZSxcbiAgICAgIHVwZGF0ZUNvdW50OiAwXG4gICAgfTtcbiAgICBzZXRJdGVtKGlkLCBpdGVtKTtcbiAgfSxcbiAgb25CZWZvcmVVcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCwgZWxlbWVudCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9LFxuICBvbk1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0RGlzcGxheU5hbWUodG9wRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIG93bmVyLmdldE5hbWUoKSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRPd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgdmFyIGlkID0gY3VycmVudE93bmVyICYmIGN1cnJlbnRPd25lci5fZGVidWdJRDtcblxuICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChpZCk7XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSb290SURzOiBnZXRSb290SURzLFxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRJdGVtSURzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSB7XG4gIGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2EnKSxcbiAgYWJicjogY3JlYXRlRE9NRmFjdG9yeSgnYWJicicpLFxuICBhZGRyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdhZGRyZXNzJyksXG4gIGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ2FyZWEnKSxcbiAgYXJ0aWNsZTogY3JlYXRlRE9NRmFjdG9yeSgnYXJ0aWNsZScpLFxuICBhc2lkZTogY3JlYXRlRE9NRmFjdG9yeSgnYXNpZGUnKSxcbiAgYXVkaW86IGNyZWF0ZURPTUZhY3RvcnkoJ2F1ZGlvJyksXG4gIGI6IGNyZWF0ZURPTUZhY3RvcnkoJ2InKSxcbiAgYmFzZTogY3JlYXRlRE9NRmFjdG9yeSgnYmFzZScpLFxuICBiZGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JkaScpLFxuICBiZG86IGNyZWF0ZURPTUZhY3RvcnkoJ2JkbycpLFxuICBiaWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2JpZycpLFxuICBibG9ja3F1b3RlOiBjcmVhdGVET01GYWN0b3J5KCdibG9ja3F1b3RlJyksXG4gIGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JvZHknKSxcbiAgYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2JyJyksXG4gIGJ1dHRvbjogY3JlYXRlRE9NRmFjdG9yeSgnYnV0dG9uJyksXG4gIGNhbnZhczogY3JlYXRlRE9NRmFjdG9yeSgnY2FudmFzJyksXG4gIGNhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2NhcHRpb24nKSxcbiAgY2l0ZTogY3JlYXRlRE9NRmFjdG9yeSgnY2l0ZScpLFxuICBjb2RlOiBjcmVhdGVET01GYWN0b3J5KCdjb2RlJyksXG4gIGNvbDogY3JlYXRlRE9NRmFjdG9yeSgnY29sJyksXG4gIGNvbGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdjb2xncm91cCcpLFxuICBkYXRhOiBjcmVhdGVET01GYWN0b3J5KCdkYXRhJyksXG4gIGRhdGFsaXN0OiBjcmVhdGVET01GYWN0b3J5KCdkYXRhbGlzdCcpLFxuICBkZDogY3JlYXRlRE9NRmFjdG9yeSgnZGQnKSxcbiAgZGVsOiBjcmVhdGVET01GYWN0b3J5KCdkZWwnKSxcbiAgZGV0YWlsczogY3JlYXRlRE9NRmFjdG9yeSgnZGV0YWlscycpLFxuICBkZm46IGNyZWF0ZURPTUZhY3RvcnkoJ2RmbicpLFxuICBkaWFsb2c6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpYWxvZycpLFxuICBkaXY6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpdicpLFxuICBkbDogY3JlYXRlRE9NRmFjdG9yeSgnZGwnKSxcbiAgZHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2R0JyksXG4gIGVtOiBjcmVhdGVET01GYWN0b3J5KCdlbScpLFxuICBlbWJlZDogY3JlYXRlRE9NRmFjdG9yeSgnZW1iZWQnKSxcbiAgZmllbGRzZXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZWxkc2V0JyksXG4gIGZpZ2NhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ2NhcHRpb24nKSxcbiAgZmlndXJlOiBjcmVhdGVET01GYWN0b3J5KCdmaWd1cmUnKSxcbiAgZm9vdGVyOiBjcmVhdGVET01GYWN0b3J5KCdmb290ZXInKSxcbiAgZm9ybTogY3JlYXRlRE9NRmFjdG9yeSgnZm9ybScpLFxuICBoMTogY3JlYXRlRE9NRmFjdG9yeSgnaDEnKSxcbiAgaDI6IGNyZWF0ZURPTUZhY3RvcnkoJ2gyJyksXG4gIGgzOiBjcmVhdGVET01GYWN0b3J5KCdoMycpLFxuICBoNDogY3JlYXRlRE9NRmFjdG9yeSgnaDQnKSxcbiAgaDU6IGNyZWF0ZURPTUZhY3RvcnkoJ2g1JyksXG4gIGg2OiBjcmVhdGVET01GYWN0b3J5KCdoNicpLFxuICBoZWFkOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkJyksXG4gIGhlYWRlcjogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZGVyJyksXG4gIGhncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnaGdyb3VwJyksXG4gIGhyOiBjcmVhdGVET01GYWN0b3J5KCdocicpLFxuICBodG1sOiBjcmVhdGVET01GYWN0b3J5KCdodG1sJyksXG4gIGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2knKSxcbiAgaWZyYW1lOiBjcmVhdGVET01GYWN0b3J5KCdpZnJhbWUnKSxcbiAgaW1nOiBjcmVhdGVET01GYWN0b3J5KCdpbWcnKSxcbiAgaW5wdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucHV0JyksXG4gIGluczogY3JlYXRlRE9NRmFjdG9yeSgnaW5zJyksXG4gIGtiZDogY3JlYXRlRE9NRmFjdG9yeSgna2JkJyksXG4gIGtleWdlbjogY3JlYXRlRE9NRmFjdG9yeSgna2V5Z2VuJyksXG4gIGxhYmVsOiBjcmVhdGVET01GYWN0b3J5KCdsYWJlbCcpLFxuICBsZWdlbmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xlZ2VuZCcpLFxuICBsaTogY3JlYXRlRE9NRmFjdG9yeSgnbGknKSxcbiAgbGluazogY3JlYXRlRE9NRmFjdG9yeSgnbGluaycpLFxuICBtYWluOiBjcmVhdGVET01GYWN0b3J5KCdtYWluJyksXG4gIG1hcDogY3JlYXRlRE9NRmFjdG9yeSgnbWFwJyksXG4gIG1hcms6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcmsnKSxcbiAgbWVudTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudScpLFxuICBtZW51aXRlbTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudWl0ZW0nKSxcbiAgbWV0YTogY3JlYXRlRE9NRmFjdG9yeSgnbWV0YScpLFxuICBtZXRlcjogY3JlYXRlRE9NRmFjdG9yeSgnbWV0ZXInKSxcbiAgbmF2OiBjcmVhdGVET01GYWN0b3J5KCduYXYnKSxcbiAgbm9zY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ25vc2NyaXB0JyksXG4gIG9iamVjdDogY3JlYXRlRE9NRmFjdG9yeSgnb2JqZWN0JyksXG4gIG9sOiBjcmVhdGVET01GYWN0b3J5KCdvbCcpLFxuICBvcHRncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnb3B0Z3JvdXAnKSxcbiAgb3B0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdvcHRpb24nKSxcbiAgb3V0cHV0OiBjcmVhdGVET01GYWN0b3J5KCdvdXRwdXQnKSxcbiAgcDogY3JlYXRlRE9NRmFjdG9yeSgncCcpLFxuICBwYXJhbTogY3JlYXRlRE9NRmFjdG9yeSgncGFyYW0nKSxcbiAgcGljdHVyZTogY3JlYXRlRE9NRmFjdG9yeSgncGljdHVyZScpLFxuICBwcmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3ByZScpLFxuICBwcm9ncmVzczogY3JlYXRlRE9NRmFjdG9yeSgncHJvZ3Jlc3MnKSxcbiAgcTogY3JlYXRlRE9NRmFjdG9yeSgncScpLFxuICBycDogY3JlYXRlRE9NRmFjdG9yeSgncnAnKSxcbiAgcnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3J0JyksXG4gIHJ1Ynk6IGNyZWF0ZURPTUZhY3RvcnkoJ3J1YnknKSxcbiAgczogY3JlYXRlRE9NRmFjdG9yeSgncycpLFxuICBzYW1wOiBjcmVhdGVET01GYWN0b3J5KCdzYW1wJyksXG4gIHNjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnc2NyaXB0JyksXG4gIHNlY3Rpb246IGNyZWF0ZURPTUZhY3RvcnkoJ3NlY3Rpb24nKSxcbiAgc2VsZWN0OiBjcmVhdGVET01GYWN0b3J5KCdzZWxlY3QnKSxcbiAgc21hbGw6IGNyZWF0ZURPTUZhY3RvcnkoJ3NtYWxsJyksXG4gIHNvdXJjZTogY3JlYXRlRE9NRmFjdG9yeSgnc291cmNlJyksXG4gIHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3NwYW4nKSxcbiAgc3Ryb25nOiBjcmVhdGVET01GYWN0b3J5KCdzdHJvbmcnKSxcbiAgc3R5bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0eWxlJyksXG4gIHN1YjogY3JlYXRlRE9NRmFjdG9yeSgnc3ViJyksXG4gIHN1bW1hcnk6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1bW1hcnknKSxcbiAgc3VwOiBjcmVhdGVET01GYWN0b3J5KCdzdXAnKSxcbiAgdGFibGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RhYmxlJyksXG4gIHRib2R5OiBjcmVhdGVET01GYWN0b3J5KCd0Ym9keScpLFxuICB0ZDogY3JlYXRlRE9NRmFjdG9yeSgndGQnKSxcbiAgdGV4dGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHRhcmVhJyksXG4gIHRmb290OiBjcmVhdGVET01GYWN0b3J5KCd0Zm9vdCcpLFxuICB0aDogY3JlYXRlRE9NRmFjdG9yeSgndGgnKSxcbiAgdGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoZWFkJyksXG4gIHRpbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpbWUnKSxcbiAgdGl0bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpdGxlJyksXG4gIHRyOiBjcmVhdGVET01GYWN0b3J5KCd0cicpLFxuICB0cmFjazogY3JlYXRlRE9NRmFjdG9yeSgndHJhY2snKSxcbiAgdTogY3JlYXRlRE9NRmFjdG9yeSgndScpLFxuICB1bDogY3JlYXRlRE9NRmFjdG9yeSgndWwnKSxcbiAgJ3Zhcic6IGNyZWF0ZURPTUZhY3RvcnkoJ3ZhcicpLFxuICB2aWRlbzogY3JlYXRlRE9NRmFjdG9yeSgndmlkZW8nKSxcbiAgd2JyOiBjcmVhdGVET01GYWN0b3J5KCd3YnInKSxcblxuICAvLyBTVkdcbiAgY2lyY2xlOiBjcmVhdGVET01GYWN0b3J5KCdjaXJjbGUnKSxcbiAgY2xpcFBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ2NsaXBQYXRoJyksXG4gIGRlZnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlZnMnKSxcbiAgZWxsaXBzZTogY3JlYXRlRE9NRmFjdG9yeSgnZWxsaXBzZScpLFxuICBnOiBjcmVhdGVET01GYWN0b3J5KCdnJyksXG4gIGltYWdlOiBjcmVhdGVET01GYWN0b3J5KCdpbWFnZScpLFxuICBsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdsaW5lJyksXG4gIGxpbmVhckdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdsaW5lYXJHcmFkaWVudCcpLFxuICBtYXNrOiBjcmVhdGVET01GYWN0b3J5KCdtYXNrJyksXG4gIHBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdGgnKSxcbiAgcGF0dGVybjogY3JlYXRlRE9NRmFjdG9yeSgncGF0dGVybicpLFxuICBwb2x5Z29uOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5Z29uJyksXG4gIHBvbHlsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5bGluZScpLFxuICByYWRpYWxHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgncmFkaWFsR3JhZGllbnQnKSxcbiAgcmVjdDogY3JlYXRlRE9NRmFjdG9yeSgncmVjdCcpLFxuICBzdG9wOiBjcmVhdGVET01GYWN0b3J5KCdzdG9wJyksXG4gIHN2ZzogY3JlYXRlRE9NRmFjdG9yeSgnc3ZnJyksXG4gIHRleHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHQnKSxcbiAgdHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3RzcGFuJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01GYWN0b3JpZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRTeW1ib2wnKTtcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAncmVmJykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ3JlZicpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5yZWYgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaGFzVmFsaWRLZXkoY29uZmlnKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzOiBgcmVmYCBpcyBub3QgYSBwcm9wLiBUcnlpbmcgdG8gYWNjZXNzIGl0IHdpbGwgcmVzdWx0ICcgKyAnaW4gYHVuZGVmaW5lZGAgYmVpbmcgcmV0dXJuZWQuIElmIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgc2FtZSAnICsgJ3ZhbHVlIHdpdGhpbiB0aGUgY2hpbGQgY29tcG9uZW50LCB5b3Ugc2hvdWxkIHBhc3MgaXQgYXMgYSBkaWZmZXJlbnQgJyArICdwcm9wLiAoaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcGVjaWFsLXByb3BzKScsIGRpc3BsYXlOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH07XG4gIHdhcm5BYm91dEFjY2Vzc2luZ1JlZi5pc1JlYWN0V2FybmluZyA9IHRydWU7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wcywgJ3JlZicsIHtcbiAgICBnZXQ6IHdhcm5BYm91dEFjY2Vzc2luZ1JlZixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgbmV3IFJlYWN0IGVsZW1lbnQuIFRoaXMgbm8gbG9uZ2VyIGFkaGVyZXMgdG9cbiAqIHRoZSBjbGFzcyBwYXR0ZXJuLCBzbyBkbyBub3QgdXNlIG5ldyB0byBjYWxsIGl0LiBBbHNvLCBubyBpbnN0YW5jZW9mIGNoZWNrXG4gKiB3aWxsIHdvcmsuIEluc3RlYWQgdGVzdCAkJHR5cGVvZiBmaWVsZCBhZ2FpbnN0IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSB0byBjaGVja1xuICogaWYgc29tZXRoaW5nIGlzIGEgUmVhY3QgRWxlbWVudC5cbiAqXG4gKiBAcGFyYW0geyp9IHR5cGVcbiAqIEBwYXJhbSB7Kn0ga2V5XG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHJlZlxuICogQHBhcmFtIHsqfSBzZWxmIEEgKnRlbXBvcmFyeSogaGVscGVyIHRvIGRldGVjdCBwbGFjZXMgd2hlcmUgYHRoaXNgIGlzXG4gKiBkaWZmZXJlbnQgZnJvbSB0aGUgYG93bmVyYCB3aGVuIFJlYWN0LmNyZWF0ZUVsZW1lbnQgaXMgY2FsbGVkLCBzbyB0aGF0IHdlXG4gKiBjYW4gd2Fybi4gV2Ugd2FudCB0byBnZXQgcmlkIG9mIG93bmVyIGFuZCByZXBsYWNlIHN0cmluZyBgcmVmYHMgd2l0aCBhcnJvd1xuICogZnVuY3Rpb25zLCBhbmQgYXMgbG9uZyBhcyBgdGhpc2AgYW5kIG93bmVyIGFyZSB0aGUgc2FtZSwgdGhlcmUgd2lsbCBiZSBub1xuICogY2hhbmdlIGluIGJlaGF2aW9yLlxuICogQHBhcmFtIHsqfSBzb3VyY2UgQW4gYW5ub3RhdGlvbiBvYmplY3QgKGFkZGVkIGJ5IGEgdHJhbnNwaWxlciBvciBvdGhlcndpc2UpXG4gKiBpbmRpY2F0aW5nIGZpbGVuYW1lLCBsaW5lIG51bWJlciwgYW5kL29yIG90aGVyIGluZm9ybWF0aW9uLlxuICogQHBhcmFtIHsqfSBvd25lclxuICogQHBhcmFtIHsqfSBwcm9wc1xuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdEVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKSB7XG4gIHZhciBlbGVtZW50ID0ge1xuICAgIC8vIFRoaXMgdGFnIGFsbG93IHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoa2V5IHx8IHJlZikge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wcy4kJHR5cGVvZiA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcHMuJCR0eXBlb2YgIT09IFJFQUNUX0VMRU1FTlRfVFlQRSkge1xuICAgICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG4gICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgICBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHByb2R1Y2VzIFJlYWN0RWxlbWVudHMgb2YgYSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWZhY3RvcnlcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3RvcnkgPSBmdW5jdGlvbiAodHlwZSkge1xuICB2YXIgZmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gIC8vIEV4cG9zZSB0aGUgdHlwZSBvbiB0aGUgZmFjdG9yeSBhbmQgdGhlIHByb3RvdHlwZSBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyBlYXNpbHkgYWNjZXNzZWQgb24gZWxlbWVudHMuIEUuZy4gYDxGb28gLz4udHlwZSA9PT0gRm9vYC5cbiAgLy8gVGhpcyBzaG91bGQgbm90IGJlIG5hbWVkIGBjb25zdHJ1Y3RvcmAgc2luY2UgdGhpcyBtYXkgbm90IGJlIHRoZSBmdW5jdGlvblxuICAvLyB0aGF0IGNyZWF0ZWQgdGhlIGVsZW1lbnQsIGFuZCBpdCBtYXkgbm90IGV2ZW4gYmUgYSBjb25zdHJ1Y3Rvci5cbiAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gIGZhY3RvcnkudHlwZSA9IHR5cGU7XG4gIHJldHVybiBmYWN0b3J5O1xufTtcblxuUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleSA9IGZ1bmN0aW9uIChvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn07XG5cbi8qKlxuICogQ2xvbmUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgdXNpbmcgZWxlbWVudCBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2xvbmVlbGVtZW50XG4gKi9cblJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gT3JpZ2luYWwgcHJvcHMgYXJlIGNvcGllZFxuICB2YXIgcHJvcHMgPSBfYXNzaWduKHt9LCBlbGVtZW50LnByb3BzKTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBrZXkgPSBlbGVtZW50LmtleTtcbiAgdmFyIHJlZiA9IGVsZW1lbnQucmVmO1xuICAvLyBTZWxmIGlzIHByZXNlcnZlZCBzaW5jZSB0aGUgb3duZXIgaXMgcHJlc2VydmVkLlxuICB2YXIgc2VsZiA9IGVsZW1lbnQuX3NlbGY7XG4gIC8vIFNvdXJjZSBpcyBwcmVzZXJ2ZWQgc2luY2UgY2xvbmVFbGVtZW50IGlzIHVubGlrZWx5IHRvIGJlIHRhcmdldGVkIGJ5IGFcbiAgLy8gdHJhbnNwaWxlciwgYW5kIHRoZSBvcmlnaW5hbCBzb3VyY2UgaXMgcHJvYmFibHkgYSBiZXR0ZXIgaW5kaWNhdG9yIG9mIHRoZVxuICAvLyB0cnVlIG93bmVyLlxuICB2YXIgc291cmNlID0gZWxlbWVudC5fc291cmNlO1xuXG4gIC8vIE93bmVyIHdpbGwgYmUgcHJlc2VydmVkLCB1bmxlc3MgcmVmIGlzIG92ZXJyaWRkZW5cbiAgdmFyIG93bmVyID0gZWxlbWVudC5fb3duZXI7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIC8vIFNpbGVudGx5IHN0ZWFsIHRoZSByZWYgZnJvbSB0aGUgcGFyZW50LlxuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICAgIG93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBvdmVycmlkZSBleGlzdGluZyBwcm9wc1xuICAgIHZhciBkZWZhdWx0UHJvcHM7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAmJiBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgICBkZWZhdWx0UHJvcHMgPSBlbGVtZW50LnR5cGUuZGVmYXVsdFByb3BzO1xuICAgIH1cbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBpZiAoY29uZmlnW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkICYmIGRlZmF1bHRQcm9wcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgcmV0dXJuIFJlYWN0RWxlbWVudChlbGVtZW50LnR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFZlcmlmaWVzIHRoZSBvYmplY3QgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuaXN2YWxpZGVsZW1lbnRcbiAqIEBwYXJhbSB7P29iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIGBvYmplY3RgIGlzIGEgdmFsaWQgY29tcG9uZW50LlxuICogQGZpbmFsXG4gKi9cblJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCAmJiBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gVGhlIFN5bWJvbCB1c2VkIHRvIHRhZyB0aGUgUmVhY3RFbGVtZW50IHR5cGUuIElmIHRoZXJlIGlzIG5vIG5hdGl2ZSBTeW1ib2xcbi8vIG5vciBwb2x5ZmlsbCwgdGhlbiBhIHBsYWluIG51bWJlciBpcyB1c2VkIGZvciBwZXJmb3JtYW5jZS5cblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sWydmb3InXSAmJiBTeW1ib2xbJ2ZvciddKCdyZWFjdC5lbGVtZW50JykgfHwgMHhlYWM3O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJFQUNUX0VMRU1FTlRfVFlQRTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuLyoqXG4gKiBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgcHJvdmlkZXMgYSB3cmFwcGVyIGFyb3VuZCBhIGVsZW1lbnQgZmFjdG9yeVxuICogd2hpY2ggdmFsaWRhdGVzIHRoZSBwcm9wcyBwYXNzZWQgdG8gdGhlIGVsZW1lbnQuIFRoaXMgaXMgaW50ZW5kZWQgdG8gYmVcbiAqIHVzZWQgb25seSBpbiBERVYgYW5kIGNvdWxkIGJlIHJlcGxhY2VkIGJ5IGEgc3RhdGljIHR5cGUgY2hlY2tlciBmb3IgbGFuZ3VhZ2VzXG4gKiB0aGF0IHN1cHBvcnQgaXQuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBjaGVja1JlYWN0VHlwZVNwZWMgPSByZXF1aXJlKCcuL2NoZWNrUmVhY3RUeXBlU3BlYycpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZ2V0SXRlcmF0b3JGbiA9IHJlcXVpcmUoJy4vZ2V0SXRlcmF0b3JGbicpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbmZ1bmN0aW9uIGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpIHtcbiAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG5hbWUgKyAnYC4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGVyZSdzIG5vIGtleSBleHBsaWNpdGx5IHNldCBvbiBkeW5hbWljIGFycmF5cyBvZiBjaGlsZHJlbiBvclxuICogb2JqZWN0IGtleXMgYXJlIG5vdCB2YWxpZC4gVGhpcyBhbGxvd3MgdXMgdG8ga2VlcCB0cmFjayBvZiBjaGlsZHJlbiBiZXR3ZWVuXG4gKiB1cGRhdGVzLlxuICovXG52YXIgb3duZXJIYXNLZXlVc2VXYXJuaW5nID0ge307XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSkge1xuICB2YXIgaW5mbyA9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuXG4gIGlmICghaW5mbykge1xuICAgIHZhciBwYXJlbnROYW1lID0gdHlwZW9mIHBhcmVudFR5cGUgPT09ICdzdHJpbmcnID8gcGFyZW50VHlwZSA6IHBhcmVudFR5cGUuZGlzcGxheU5hbWUgfHwgcGFyZW50VHlwZS5uYW1lO1xuICAgIGlmIChwYXJlbnROYW1lKSB7XG4gICAgICBpbmZvID0gJyBDaGVjayB0aGUgdG9wLWxldmVsIHJlbmRlciBjYWxsIHVzaW5nIDwnICsgcGFyZW50TmFtZSArICc+Lic7XG4gICAgfVxuICB9XG4gIHJldHVybiBpbmZvO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlIGVsZW1lbnQgZG9lc24ndCBoYXZlIGFuIGV4cGxpY2l0IGtleSBhc3NpZ25lZCB0byBpdC5cbiAqIFRoaXMgZWxlbWVudCBpcyBpbiBhbiBhcnJheS4gVGhlIGFycmF5IGNvdWxkIGdyb3cgYW5kIHNocmluayBvciBiZVxuICogcmVvcmRlcmVkLiBBbGwgY2hpbGRyZW4gdGhhdCBoYXZlbid0IGFscmVhZHkgYmVlbiB2YWxpZGF0ZWQgYXJlIHJlcXVpcmVkIHRvXG4gKiBoYXZlIGEgXCJrZXlcIiBwcm9wZXJ0eSBhc3NpZ25lZCB0byBpdC4gRXJyb3Igc3RhdHVzZXMgYXJlIGNhY2hlZCBzbyBhIHdhcm5pbmdcbiAqIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnQgRWxlbWVudCB0aGF0IHJlcXVpcmVzIGEga2V5LlxuICogQHBhcmFtIHsqfSBwYXJlbnRUeXBlIGVsZW1lbnQncyBwYXJlbnQncyB0eXBlLlxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZUV4cGxpY2l0S2V5KGVsZW1lbnQsIHBhcmVudFR5cGUpIHtcbiAgaWYgKCFlbGVtZW50Ll9zdG9yZSB8fCBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgfHwgZWxlbWVudC5rZXkgIT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBlbGVtZW50Ll9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuXG4gIHZhciBtZW1vaXplciA9IG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgfHwgKG93bmVySGFzS2V5VXNlV2FybmluZy51bmlxdWVLZXkgPSB7fSk7XG5cbiAgdmFyIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8gPSBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpO1xuICBpZiAobWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbWVtb2l6ZXJbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10gPSB0cnVlO1xuXG4gIC8vIFVzdWFsbHkgdGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIG9mZmVuZGVyLCBidXQgaWYgaXQgYWNjZXB0cyBjaGlsZHJlbiBhcyBhXG4gIC8vIHByb3BlcnR5LCBpdCBtYXkgYmUgdGhlIGNyZWF0b3Igb2YgdGhlIGNoaWxkIHRoYXQncyByZXNwb25zaWJsZSBmb3JcbiAgLy8gYXNzaWduaW5nIGl0IGEga2V5LlxuICB2YXIgY2hpbGRPd25lciA9ICcnO1xuICBpZiAoZWxlbWVudCAmJiBlbGVtZW50Ll9vd25lciAmJiBlbGVtZW50Ll9vd25lciAhPT0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIC8vIEdpdmUgdGhlIGNvbXBvbmVudCB0aGF0IG9yaWdpbmFsbHkgY3JlYXRlZCB0aGlzIGNoaWxkLlxuICAgIGNoaWxkT3duZXIgPSAnIEl0IHdhcyBwYXNzZWQgYSBjaGlsZCBmcm9tICcgKyBlbGVtZW50Ll9vd25lci5nZXROYW1lKCkgKyAnLic7XG4gIH1cblxuICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBpbmZvID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyAnaXRcXCdzIGRlZmluZWQgaW4uJztcbiAgICAgICAgfVxuICAgICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZSA9PSBudWxsID8gdHlwZSA6IHR5cGVvZiB0eXBlLCBpbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0RWxlbWVudC5jcmVhdGVFbGVtZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAgIC8vIFRPRE86IERyb3AgdGhpcyB3aGVuIHRoZXNlIGFyZSBubyBsb25nZXIgYWxsb3dlZCBhcyB0aGUgdHlwZSBhcmd1bWVudC5cbiAgICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZWxlbWVudDtcbiAgICB9XG5cbiAgICAvLyBTa2lwIGtleSB3YXJuaW5nIGlmIHRoZSB0eXBlIGlzbid0IHZhbGlkIHNpbmNlIG91ciBrZXkgdmFsaWRhdGlvbiBsb2dpY1xuICAgIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgICAvLyBXZSBkb24ndCB3YW50IGV4Y2VwdGlvbiBiZWhhdmlvciB0byBkaWZmZXIgYmV0d2VlbiBkZXYgYW5kIHByb2QuXG4gICAgLy8gKFJlbmRlcmluZyB3aWxsIHRocm93IHdpdGggYSBoZWxwZnVsIG1lc3NhZ2UgYW5kIGFzIHNvb24gYXMgdGhlIHR5cGUgaXNcbiAgICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gICAgaWYgKHZhbGlkVHlwZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGNyZWF0ZUZhY3Rvcnk6IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgdmFyIHZhbGlkYXRlZEZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAgIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICAgIHZhbGlkYXRlZEZhY3RvcnkudHlwZSA9IHR5cGU7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpIDogdm9pZCAwO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xuICB9LFxuXG4gIGNsb25lRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IHB1YmxpY0luc3RhbmNlLmNvbnN0cnVjdG9yO1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gKlxuICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICpcbiAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAqICAgfSk7XG4gKlxuICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICpcbiAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gKlxuICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICpcbiAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gKiAgICAgICAgICApO1xuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICogIH0pO1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5cbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbnZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuLyoqXG4gKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyIHdlIGRvbid0IHVzZSByZWFsXG4gKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLnN0YWNrID0gJyc7XG59XG4vLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG5Qcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgfVxuICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICBpZiAoIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArICdhbmQgd2lsbCBub3Qgd29yayBpbiBwcm9kdWN0aW9uIHdpdGggdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gJyArICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgKyAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJywgcHJvcEZ1bGxOYW1lLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gIH1cblxuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXhwZWN0ZWRWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdmFsdWUgYCcgKyBwcm9wVmFsdWUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgb25lIG9mICcgKyB2YWx1ZXNTdHJpbmcgKyAnLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgIH1cbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAvLyBOYXRpdmUgU3ltYm9sLlxuICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG5mdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG4gIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG4gIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbi8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHJldHVybiBBTk9OWU1PVVM7XG4gIH1cbiAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIFJlYWN0Q29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gUmVhY3RDb21wb25lbnQucHJvdG90eXBlO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlYWN0UHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihSZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQdXJlQ29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjQuMic7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHRyeSB7XG4gICAgLy8gJEZsb3dGaXhNZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgICBjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICAvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbkRlZmluZVByb3BlcnR5OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rO1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAndGVzdCcpIHtcbiAgLy8gVGVtcG9yYXJ5IGhhY2suXG4gIC8vIElubGluZSByZXF1aXJlcyBkb24ndCB3b3JrIHdlbGwgd2l0aCBKZXN0OlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzcyNDBcbiAgLy8gUmVtb3ZlIHRoZSBpbmxpbmUgcmVxdWlyZXMgd2hlbiB3ZSBkb24ndCBuZWVkIHRoZW0gYW55bW9yZTpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L3B1bGwvNzE3OFxuICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG59XG5cbnZhciBsb2dnZWRUeXBlRmFpbHVyZXMgPSB7fTtcblxuLyoqXG4gKiBBc3NlcnQgdGhhdCB0aGUgdmFsdWVzIG1hdGNoIHdpdGggdGhlIHR5cGUgc3BlY3MuXG4gKiBFcnJvciBtZXNzYWdlcyBhcmUgbWVtb3JpemVkIGFuZCB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdHlwZVNwZWNzIE1hcCBvZiBuYW1lIHRvIGEgUmVhY3RQcm9wVHlwZVxuICogQHBhcmFtIHtvYmplY3R9IHZhbHVlcyBSdW50aW1lIHZhbHVlcyB0aGF0IG5lZWQgdG8gYmUgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0ge3N0cmluZ30gbG9jYXRpb24gZS5nLiBcInByb3BcIiwgXCJjb250ZXh0XCIsIFwiY2hpbGQgY29udGV4dFwiXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50TmFtZSBOYW1lIG9mIHRoZSBjb21wb25lbnQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICogQHBhcmFtIHs/b2JqZWN0fSBlbGVtZW50IFRoZSBSZWFjdCBlbGVtZW50IHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcGFyYW0gez9udW1iZXJ9IGRlYnVnSUQgVGhlIFJlYWN0IGNvbXBvbmVudCBpbnN0YW5jZSB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tSZWFjdFR5cGVTcGVjKHR5cGVTcGVjcywgdmFsdWVzLCBsb2NhdGlvbiwgY29tcG9uZW50TmFtZSwgZWxlbWVudCwgZGVidWdJRCkge1xuICBmb3IgKHZhciB0eXBlU3BlY05hbWUgaW4gdHlwZVNwZWNzKSB7XG4gICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICB2YXIgZXJyb3I7XG4gICAgICAvLyBQcm9wIHR5cGUgdmFsaWRhdGlvbiBtYXkgdGhyb3cuIEluIGNhc2UgdGhleSBkbywgd2UgZG9uJ3Qgd2FudCB0b1xuICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgISh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicpID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzg0JywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpIDogdm9pZCAwO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudFN0YWNrSW5mbyA9ICcnO1xuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKCFSZWFjdENvbXBvbmVudFRyZWVIb29rKSB7XG4gICAgICAgICAgICBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChkZWJ1Z0lEICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGRlYnVnSUQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRDdXJyZW50U3RhY2tBZGRlbmR1bShlbGVtZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIGNvbXBvbmVudFN0YWNrSW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tSZWFjdFR5cGVTcGVjOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJdGVyYXRvckZuOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MycpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFdBUk5JTkc6IERPIE5PVCBtYW51YWxseSByZXF1aXJlIHRoaXMgbW9kdWxlLlxuICogVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBgaW52YXJpYW50KC4uLilgIHVzZWQgYnkgdGhlIGVycm9yIGNvZGUgc3lzdGVtXG4gKiBhbmQgd2lsbCBfb25seV8gYmUgcmVxdWlyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgYmFiZWwgcGFzcy5cbiAqIEl0IGFsd2F5cyB0aHJvd3MuXG4gKi9cblxuZnVuY3Rpb24gcmVhY3RQcm9kSW52YXJpYW50KGNvZGUpIHtcbiAgdmFyIGFyZ0NvdW50ID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cbiAgdmFyIG1lc3NhZ2UgPSAnTWluaWZpZWQgUmVhY3QgZXJyb3IgIycgKyBjb2RlICsgJzsgdmlzaXQgJyArICdodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD0nICsgY29kZTtcblxuICBmb3IgKHZhciBhcmdJZHggPSAwOyBhcmdJZHggPCBhcmdDb3VudDsgYXJnSWR4KyspIHtcbiAgICBtZXNzYWdlICs9ICcmYXJnc1tdPScgKyBlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW2FyZ0lkeCArIDFdKTtcbiAgfVxuXG4gIG1lc3NhZ2UgKz0gJyBmb3IgdGhlIGZ1bGwgbWVzc2FnZSBvciB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQnICsgJyBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nO1xuXG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IHJlYWN0UHJvZEludmFyaWFudCdzIG93biBmcmFtZVxuXG4gIHRocm93IGVycm9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0UHJvZEludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRTeW1ib2wnKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBLZXlFc2NhcGVVdGlscyA9IHJlcXVpcmUoJy4vS2V5RXNjYXBlVXRpbHMnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUaGlzIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQgc2luY2UgdGhpcyBmaWxlIGlzIHNoYXJlZCBiZXR3ZWVuXG4gKiBpc29tb3JwaGljIGFuZCByZW5kZXJlcnMuIFdlIGNvdWxkIGV4dHJhY3QgdGhpcyB0byBhXG4gKlxuICovXG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzLmVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHxcbiAgLy8gVGhlIGZvbGxvd2luZyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50LiBUaGlzIG1lYW5zIHdlIGNhbiBvcHRpbWl6ZVxuICAvLyBzb21lIGNoZWNrcy4gUmVhY3QgRmliZXIgYWxzbyBpbmxpbmVzIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgcHVycG9zZXMuXG4gIHR5cGUgPT09ICdvYmplY3QnICYmIGNoaWxkcmVuLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnJztcbiAgICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgICAgdmFyIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgICBpZiAobWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUpIHtcbiAgICAgICAgICAgICAgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSArICdgLic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIEtleUVzY2FwZVV0aWxzLmVzY2FwZShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnT2JqZWN0cyBhcmUgbm90IHZhbGlkIGFzIGEgUmVhY3QgY2hpbGQgKGZvdW5kOiAlcykuJXMnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IF9wcm9kSW52YXJpYW50KCczMScsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdWJ0cmVlQ291bnQ7XG59XG5cbi8qKlxuICogVHJhdmVyc2VzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCwgYnV0XG4gKiBtaWdodCBhbHNvIGJlIHNwZWNpZmllZCB0aHJvdWdoIGF0dHJpYnV0ZXM6XG4gKlxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmNoaWxkcmVuLCAuLi4pYFxuICogLSBgdHJhdmVyc2VBbGxDaGlsZHJlbih0aGlzLnByb3BzLmxlZnRQYW5lbENoaWxkcmVuLCAuLi4pYFxuICpcbiAqIFRoZSBgdHJhdmVyc2VDb250ZXh0YCBpcyBhbiBvcHRpb25hbCBhcmd1bWVudCB0aGF0IGlzIHBhc3NlZCB0aHJvdWdoIHRoZVxuICogZW50aXJlIHRyYXZlcnNhbC4gSXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgYWNjdW11bGF0aW9ucyBvciBhbnl0aGluZyBlbHNlIHRoYXRcbiAqIHRoZSBjYWxsYmFjayBtaWdodCBmaW5kIHJlbGV2YW50LlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgb2JqZWN0LlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIFRvIGludm9rZSB1cG9uIHRyYXZlcnNpbmcgZWFjaCBjaGlsZC5cbiAqIEBwYXJhbSB7Pyp9IHRyYXZlcnNlQ29udGV4dCBDb250ZXh0IGZvciB0cmF2ZXJzYWwuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkcmVuLCAnJywgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdHJhdmVyc2VBbGxDaGlsZHJlbjsiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1JlYWN0Jyk7XG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3JjL09uZScpO1xyXG4iLCIvKipcclxuICogUmVhY3QgUHVtIEJ1bmRsZVxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzA4XHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmVsbGUwNTEwQGdtYWlsLmNvbVwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbi8vIGNvbXBvbmVudHNcclxuLy8gRWxlbWVudHNcclxudmFyIEFsZXJ0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0FsZXJ0Jyk7XHJcbnZhciBNb2RhbCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Nb2RhbCcpLk1vZGFsO1xyXG52YXIgTW9kYWxIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTW9kYWwnKS5Nb2RhbEhlYWRlcjtcclxudmFyIE1vZGFsQm9keSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Nb2RhbCcpLk1vZGFsQm9keTtcclxudmFyIE1vZGFsRm9vdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL01vZGFsJykuTW9kYWxGb290ZXI7XHJcbnZhciBQYW5lbCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9QYW5lbCcpLlBhbmVsO1xyXG52YXIgUGFuZWxIZWFkZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUGFuZWwnKS5QYW5lbEhlYWRlcjtcclxudmFyIFBhbmVsQm9keSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9QYW5lbCcpLlBhbmVsQm9keTtcclxudmFyIFBhbmVsRm9vdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1BhbmVsJykuUGFuZWxGb290ZXI7XHJcbnZhciBIaWRkZW5Db250ZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0hpZGRlbkNvbnRlbnQnKTtcclxudmFyIFNwbGl0dGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1NwbGl0dGVyJykuU3BsaXR0ZXI7XHJcbnZhciBTcGxpdHRlclBhbmUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvU3BsaXR0ZXInKS5TcGxpdHRlclBhbmU7XHJcblxyXG4vLyBGb3JtIEVsZW1lbnRzXHJcbnZhciBTZWxlY3QgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvU2VsZWN0Jyk7XHJcbnZhciBDaGVja2JveCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9DaGVja2JveCcpO1xyXG52YXIgUmFkaW9Hcm91cCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9yYWRpby9SYWRpb0dyb3VwJyk7XHJcbnZhciBSYWRpbyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9yYWRpby9SYWRpbycpO1xyXG52YXIgRGF0ZVBpY2tlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9EYXRlUGlja2VyJykuRGF0ZVBpY2tlcjtcclxudmFyIERhdGVSYW5nZVBpY2tlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9EYXRlUGlja2VyJykuRGF0ZVJhbmdlUGlja2VyO1xyXG52YXIgRGF0ZVJhbmdlcyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9EYXRlUmFuZ2VzJyk7XHJcbnZhciBEYXRlUmFuZ2VQaWNrZXIxID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0RhdGVSYW5nZVBpY2tlcjEnKTtcclxudmFyIFN0ZXBwZXIgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvU3RlcHBlcicpO1xyXG52YXIgRmllbGRzZXQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvRmllbGRzZXQnKTtcclxudmFyIEF1dG9jb21wbGV0ZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9BdXRvY29tcGxldGUnKTtcclxudmFyIFRhZ3NJbnB1dCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9UYWdzSW5wdXQnKTtcclxuXHJcbi8vIEV0YyBFbGVtZW50c1xyXG52YXIgSnFHcmlkID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0pxR3JpZCcpO1xyXG52YXIgSnNUcmVlID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0pzVHJlZScpO1xyXG52YXIgVGFiU2V0ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvVGFiU2V0Jyk7XHJcbnZhciBUYWJzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvVGFicycpO1xyXG52YXIgVGFiID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvVGFiJyk7XHJcbnZhciBUYWJDb250ZW50cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90YWJzL1RhYkNvbnRlbnRzJyk7XHJcbnZhciBUYWJDb250ZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RhYnMvVGFiQ29udGVudCcpO1xyXG5cclxuLy8gdmFyIGR0ICAgICAgPSByZXF1aXJlKCdkYXRhdGFibGVzLm5ldCcpO1xyXG5cclxudmFyIE9uZSA9IHtcclxuICAgIEpxR3JpZDogSnFHcmlkLFxyXG4gICAgSnNUcmVlOiBKc1RyZWUsXHJcbiAgICBUYWJTZXQ6IFRhYlNldCxcclxuICAgIFRhYnM6IFRhYnMsXHJcbiAgICBUYWI6IFRhYixcclxuICAgIFRhYkNvbnRlbnRzOiBUYWJDb250ZW50cyxcclxuICAgIFRhYkNvbnRlbnQ6IFRhYkNvbnRlbnQsXHJcbiAgICBIaWRkZW5Db250ZW50OiBIaWRkZW5Db250ZW50LFxyXG4gICAgU2VsZWN0OiBTZWxlY3QsXHJcbiAgICBDaGVja2JveDogQ2hlY2tib3gsXHJcbiAgICBSYWRpb0dyb3VwOiBSYWRpb0dyb3VwLFxyXG4gICAgUmFkaW86IFJhZGlvLFxyXG4gICAgRGF0ZVBpY2tlcjogRGF0ZVBpY2tlcixcclxuICAgIERhdGVSYW5nZVBpY2tlcjogRGF0ZVJhbmdlUGlja2VyLFxyXG5cdERhdGVSYW5nZXM6IERhdGVSYW5nZXMsXHJcbiAgICBEYXRlUmFuZ2VQaWNrZXIxOiBEYXRlUmFuZ2VQaWNrZXIxLFxyXG4gICAgU3RlcHBlcjogU3RlcHBlcixcclxuICAgIEFsZXJ0OiBBbGVydCxcclxuICAgIE1vZGFsOiBNb2RhbCxcclxuICAgIE1vZGFsSGVhZGVyOiBNb2RhbEhlYWRlcixcclxuICAgIE1vZGFsQm9keTogTW9kYWxCb2R5LFxyXG4gICAgTW9kYWxGb290ZXI6IE1vZGFsRm9vdGVyLFxyXG4gICAgUGFuZWw6IFBhbmVsLFxyXG4gICAgUGFuZWxIZWFkZXI6IFBhbmVsSGVhZGVyLFxyXG4gICAgUGFuZWxCb2R5OiBQYW5lbEJvZHksXHJcbiAgICBQYW5lbEZvb3RlcjogUGFuZWxGb290ZXIsXHJcbiAgICBGaWVsZHNldDogRmllbGRzZXQsXHJcbiAgICBTcGxpdHRlcjogU3BsaXR0ZXIsXHJcbiAgICBTcGxpdHRlclBhbmU6IFNwbGl0dGVyUGFuZSxcclxuICAgIEF1dG9jb21wbGV0ZTogQXV0b2NvbXBsZXRlLFxyXG4gICAgVGFnc0lucHV0OiBUYWdzSW5wdXRcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gT25lO1xyXG4iLCIvKipcclxuICogQWxlcnQgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMjRcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5BbGVydCByZWY9XCJhbGVydFwiIHRpdGxlPVwi7YOA7J207YuAXCIgbWVzc2FnZT1cIuuplOyLnOyngFwiIG9uT2s9e3RoaXMub25Pa30gLz5cclxuICogPFB1bS5BbGVydCByZWY9XCJjb25maXJtXCIgdHlwZT1cImNvbmZpcm1cIiB0aXRsZT1cIu2DgOydtO2LgFwiIG1lc3NhZ2U9XCLrqZTsi5zsp4BcIiBvbk9rPXt0aGlzLm9uQ29uZmlybX0gb25DYW5jZWw9e3RoaXMub25DYW5jZWx9Lz5cclxuICpcclxuICogYm9vdHN0cmFwIGNvbXBvbmVudFxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3JlYWN0JykuUHJvcFR5cGVzO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvdXRpbCcpO1xyXG5cclxudmFyIEFsZXJ0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdBbGVydCcsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgLy8gbnVsbC9jb25maXJtIChkZWZhdWx0OiBudWxsKVxyXG4gICAgICAgIHRpdGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG1lc3NhZ2U6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgb2tMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBjYW5jZWxMYWJlbDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBvbk9rOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkNhbmNlbDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgd2lkdGg6IFByb3BUeXBlcy5zdHJpbmdcclxuICAgIH0sXHJcbiAgICBpZDogJycsXHJcbiAgICBzaG93OiBmdW5jdGlvbihva0Z1bmMsIGNhbmNlbEZ1bmMpIHtcclxuICAgICAgICB2YXIgYWxlcnQgPSAkKCcjJyt0aGlzLmlkKTtcclxuICAgICAgICBhbGVydC5tb2RhbCgnc2hvdycpO1xyXG5cclxuICAgICAgICB0aGlzLm9rRnVuYyA9IG9rRnVuYztcclxuICAgICAgICB0aGlzLmNhbmNlbEZ1bmMgPSBjYW5jZWxGdW5jO1xyXG4gICAgfSxcclxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhbGVydCA9ICQoJyMnK3RoaXMuaWQpO1xyXG4gICAgICAgIGFsZXJ0Lm1vZGFsKCdoaWRlJyk7XHJcbiAgICB9LFxyXG4gICAgb25PazogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvLyBjdXN0b20gZXZlbnQgZW1pdCDsl5Ag64yA7ZW07IScIOyXsOq1rCDtlYTsmpRcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgLy8gb2tGdW5jXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMub2tGdW5jID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2tGdW5jKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvbk9rXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25PayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uT2soKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DYW5jZWw6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy8gY3VzdG9tIGV2ZW50IGVtaXQg7JeQIOuMgO2VtOyEnCDsl7Dqtawg7ZWE7JqUXHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcblxyXG4gICAgICAgIC8vIGNhbmNlbEZ1bmNcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5jYW5jZWxGdW5jID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsRnVuYygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gb25DYW5jZWxcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkNhbmNlbCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2FuY2VsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHt0aXRsZTogJ1RpdGxlJywgb2tMYWJlbDogJHBzX2xvY2FsZS5jb25maXJtLCBjYW5jZWxMYWJlbDogJHBzX2xvY2FsZS5jYW5jZWx9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCc1LiBjb21wb25lbnREaWRNb3VudCcpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHR5cGUsIHRpdGxlLCBtZXNzYWdlLCBva0xhYmVsLCBjYW5jZWxMYWJlbCwgd2lkdGh9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgdmFyIGNhbmNlbEJ1dHRvbjtcclxuICAgICAgICBpZih0eXBlID09PSAnY29uZmlybScpIHtcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uID0gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy5vbkNhbmNlbH0gZGF0YS1kaXNtaXNzPVwibW9kYWxcIj57Y2FuY2VsTGFiZWx9PC9idXR0b24+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdtb2RhbCcsICdtb2RhbC1hbGVydCcsIGNsYXNzTmFtZSl9IHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJcIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWJhY2tkcm9wPVwic3RhdGljXCIgZGF0YS1rZXlib2FyZD1cImZhbHNlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWRpYWxvZyBtb2RhbC1zbVwiIHN0eWxlPXt7d2lkdGg6IHdpZHRofX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwibW9kYWwtdGl0bGVcIj57dGl0bGV9PC9oND5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge21lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy5vbk9rfT57b2tMYWJlbH08L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjYW5jZWxCdXR0b259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbGVydDsiLCIvKipcclxuICogQXV0b2NvbXBsZXRlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzA0LzEyXHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uQXV0b2NvbXBsZXRlIG9wdGlvbnM9e29wdGlvbnN9IC8+XHJcbiAqXHJcbiAqIGpRdWVyeS1VSSDrnbzsnbTruIzrn6zrpqzsl5Ag7KKF7IaN7KCB7J2064ukLlxyXG4gKiBodHRwczovL2pxdWVyeXVpLmNvbS9hdXRvY29tcGxldGUvXHJcbiAqXHJcbiAqIOywuOqzoFxyXG4gKiBodHRwOi8vaGVsbG9nay50aXN0b3J5LmNvbS83NFxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3JlYWN0JykuUHJvcFR5cGVzO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvdXRpbCcpO1xyXG5cclxudmFyIEF1dG9jb21wbGV0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnQXV0b2NvbXBsZXRlJyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHNvdXJjZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5hcnJheSxcclxuICAgICAgICAgICAgUHJvcFR5cGVzLmZ1bmNcclxuICAgICAgICBdKSxcclxuICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25Jbml0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0sXHJcbiAgICBpZDogJycsXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g7Lu07Y+s64SM7Yq46rCAIOuniOyatO2KuOuQmOq4sCDsoIQgKO2VnOuyiCDtmLjstpwpIC8g66as7YS06rCS7J2AIHRoaXMuc3RhdGXsnZgg7LSI6riw6rCS7Jy866GcIOyCrOyaqVxyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHRoaXMucHJvcHMuZGlzYWJsZWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGRpc2FibGVkICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIHZhciBhdXRvSW5wdXQgPSAkKCcjJyt0aGlzLmlkKTtcclxuICAgICAgICBhdXRvSW5wdXQuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB0aGlzLnByb3BzLnNvdXJjZVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkluaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgLy9kYXRhLmtleSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g7Lu07Y+s64SM7Yq46rCAIOyDiOuhnOyatCBwcm9wc+ulvCDrsJvsnYQg65WMIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxyXG4gICAgICAgIGlmKHR5cGVvZiBuZXh0UHJvcHMuZGlzYWJsZWQgPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkaXNhYmxlZDogbmV4dFByb3BzLmRpc2FibGVkfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIG5hbWV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9e3RoaXMuaWR9IG5hbWU9e25hbWV9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhjbGFzc05hbWUpfSBkaXNhYmxlZD17dGhpcy5zdGF0ZS5kaXNhYmxlZH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXV0b2NvbXBsZXRlOyIsIi8qKlxyXG4gKiBDaGVja0JveCBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8xNFxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLkNoZWNrQm94IG5hbWU9XCJuYW1lMVwiIHZhbHVlPVwidmFsdWUxXCIgb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IGNoZWNrZWQ9e3RydWV9PiDssrTtgazrsJXsiqQ8L1B1bS5DaGVja0JveD5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL1V0aWwnKTtcclxuXHJcbnZhciBDaGVja0JveCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnQ2hlY2tCb3gnLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgdmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2hlY2tlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9LFxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgbGV0IGNoZWNrZWQgPSAhdGhpcy5zdGF0ZS5jaGVja2VkO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coY2hlY2tlZCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7Y2hlY2tlZDogY2hlY2tlZH0pO1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRTdGF0ZU9iamVjdDogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICBsZXQgdmFsdWUgPSBwcm9wcy52YWx1ZTtcclxuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjaGVja2VkID0gcHJvcHMuY2hlY2tlZDtcclxuICAgICAgICBpZih0eXBlb2YgY2hlY2tlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxyXG4gICAgICAgICAgICBjaGVja2VkOiBjaGVja2VkXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlT2JqZWN0KHRoaXMucHJvcHMpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdjb21wb25lbnREaWRNb3VudCcpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc2V0U3RhdGVPYmplY3QobmV4dFByb3BzKSk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgbmFtZSwgY2hpbGRyZW59ID0gdGhpcy5wcm9wcztcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBuYW1lPXtuYW1lfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gY2hlY2tlZD17dGhpcy5zdGF0ZS5jaGVja2VkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5vbkNoYW5nZX0gLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJsYmxcIj57Y2hpbGRyZW59PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIHsvKjxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17dGhpcy5wcm9wcy5uYW1lfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0+Ki99XHJcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tCb3g7IiwiLyoqXHJcbiAqIERhdGVQaWNrZXIgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMTlcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1Zi5EYXRlUGlja2VyIGlkPVwiZGF0ZXBpY2tlclwiIG5hbWU9XCJkYXRlcGlja2VyX25hbWVcIiBkYXRlPVwiMjAxNi0wMy0xOVwiXHJcbiAqICAgICAgICAgICAgICAgICBkaXNhYmxlZD17dHJ1ZX0gdGltZVBpY2tlcj17dHJ1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IG9wdGlvbnM9e3RoaXMub3B0aW9uc30gLz5cclxuICpcclxuICogQm9vdHN0cmFwIDMgRGF0ZVBpY2tlciDrnbzsnbTruIzrn6zrpqzsl5Ag7KKF7IaN7KCB7J2064ukLlxyXG4gKiBodHRwOi8vZW9uYXNkYW4uZ2l0aHViLmlvL2Jvb3RzdHJhcC1kYXRldGltZXBpY2tlci9cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3V0aWwnKTtcclxudmFyIERhdGVVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvRGF0ZVV0aWwnKTtcclxuXHJcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIGZvcm1hdDogJ1lZWVktTU0tREQnLFxyXG4gICAgZGF5Vmlld0hlYWRlckZvcm1hdDogJ1lZWVktTU0nLFxyXG4gICAgbG9jYWxlOiAkcHNfbG9jYWxlLmxvY2FsZSxcclxuICAgIHRvb2x0aXBzOiB7XHJcbiAgICAgICAgdG9kYXk6ICdHbyB0byB0b2RheScsXHJcbiAgICAgICAgY2xlYXI6ICdDbGVhciBzZWxlY3Rpb24nLFxyXG4gICAgICAgIGNsb3NlOiAnQ2xvc2UgdGhlIHBpY2tlcicsXHJcbiAgICAgICAgc2VsZWN0TW9udGg6ICdTZWxlY3QgTW9udGgnLFxyXG4gICAgICAgIHByZXZNb250aDogJ1ByZXZpb3VzIE1vbnRoJyxcclxuICAgICAgICBuZXh0TW9udGg6ICdOZXh0IE1vbnRoJyxcclxuICAgICAgICBzZWxlY3RZZWFyOiAnU2VsZWN0IFllYXInLFxyXG4gICAgICAgIHByZXZZZWFyOiAnUHJldmlvdXMgWWVhcicsXHJcbiAgICAgICAgbmV4dFllYXI6ICdOZXh0IFllYXInLFxyXG4gICAgICAgIHNlbGVjdERlY2FkZTogJ1NlbGVjdCBEZWNhZGUnLFxyXG4gICAgICAgIHByZXZEZWNhZGU6ICdQcmV2aW91cyBEZWNhZGUnLFxyXG4gICAgICAgIG5leHREZWNhZGU6ICdOZXh0IERlY2FkZScsXHJcbiAgICAgICAgcHJldkNlbnR1cnk6ICdQcmV2aW91cyBDZW50dXJ5JyxcclxuICAgICAgICBuZXh0Q2VudHVyeTogJ05leHQgQ2VudHVyeSdcclxuICAgIH1cclxufTtcclxuXHJcbnZhciBEYXRlUGlja2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdEYXRlUGlja2VyJyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGRhdGU6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgIC8vIFlZWVktTU0tREQgSEg6bW06c3MgZm9ybWF07J2YIHN0cmluZ1xyXG4gICAgICAgIC8vbWluRGF0ZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gWVlZWS1NTS1ERCBISDptbTpzcyBmb3JtYXTsnZggc3RyaW5nXHJcbiAgICAgICAgLy9tYXhEYXRlOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAvLyBZWVlZLU1NLUREIEhIOm1tOnNzIGZvcm1hdOydmCBzdHJpbmdcclxuICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgdGltZVBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25Jbml0OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBlbmREYXRlUGlja2VyOiBQcm9wVHlwZXMuYm9vbCAgICAgICAgLy8gRGF0ZVJhbmdlUGlja2VyIOyXkOyEnCB0b0RhdGXroZwg7IKs7Jqp7IucIHRydWUoRGF0ZVJhbmdlUGlja2VyIOuCtOyXkOyEnOunjCDsgqzsmqkpXHJcbiAgICB9LFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHByb3BPcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zLFxyXG4gICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBwcm9wT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIHRpbWVQaWNrZXIg7ISk7KCVXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMudGltZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy50aW1lUGlja2VyID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvcm1hdCA9ICdZWVlZLU1NLUREIEhIOm1tOnNzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZGVmYXVsdERhdGUg7ISk7KCVXHJcbiAgICAgICAgaWYoKHR5cGVvZiB0aGlzLnByb3BzLmRhdGUgPT09ICd1bmRlZmluZWQnIHx8ICF0aGlzLnByb3BzLmRhdGUpXHJcbiAgICAgICAgICAgICYmICh0eXBlb2Ygb3B0aW9ucy5kZWZhdWx0RGF0ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgIW9wdGlvbnMuZGVmYXVsdERhdGUpKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdERhdGUgPSBtb21lbnQoKTtcclxuICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGRhdGUg6rCAIFlZWVktTU0tREQgc3RyaW5n7Jy866GcIOuTpOyWtOyYpOuptCBtb21lbnQoKSDroZwg67OA7ZmYXHJcbiAgICAgICAgICAgIG9wdGlvbnMuZGVmYXVsdERhdGUgPSBtb21lbnQodGhpcy5wcm9wcy5kYXRlLCBvcHRpb25zLmZvcm1hdCk7Ly90aGlzLnByb3BzLmRhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH0sXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdkYXRlcGlja2VyIG9uQ2hhbmdlJyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudCk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoZXZlbnQuZGF0ZS5fZCkpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKGV2ZW50Lm9sZERhdGUuX2QpKTtcclxuXHJcbiAgICAgICAgbGV0IGRhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoZXZlbnQuZGF0ZS5fZCksXHJcbiAgICAgICAgICAgIG9sZERhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoZXZlbnQub2xkRGF0ZS5fZCk7XHJcblxyXG4gICAgICAgIC8vIG5hbWUg7J2YIHZhbHVlIOqwkiDshKTsoJVcclxuICAgICAgICBpZih0aGlzLnByb3BzLmVuZERhdGVQaWNrZXIgPT09IHRydWUgJiYgKHR5cGVvZiB0aGlzLnByb3BzLnRpbWVQaWNrZXIgPT09ICd1bmRlZmluZWQnIHx8ICF0aGlzLnByb3BzLnRpbWVQaWNrZXIpKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnIgPSBkYXRlLnNwbGl0KCcgJyksIG9sZEFyciA9IG9sZERhdGUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgZGF0ZSA9IGFyclswXSArICcgMjM6NTk6NTknO1xyXG4gICAgICAgICAgICBvbGREYXRlID0gb2xkQXJyWzBdICsgJyAyMzo1OTo1OSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGU6IGRhdGV9KTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCwgZGF0ZSwgb2xkRGF0ZSk7XHJcbiAgICAgICAgICAgIC8vZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBkYXRlcGlja2VyID0gJCgnIycrdGhpcy5pZCk7XHJcbiAgICAgICAgZGF0ZXBpY2tlci5kYXRldGltZXBpY2tlcih0aGlzLmdldE9wdGlvbnMoKSk7XHJcblxyXG4gICAgICAgIC8vIG5hbWUg7J2YIHZhbHVlIOqwkiDshKTsoJVcclxuICAgICAgICB2YXIgZGF0ZSA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhkYXRlcGlja2VyLmRhdGEoXCJEYXRlVGltZVBpY2tlclwiKS5kYXRlKCkuX2QpO1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMuZW5kRGF0ZVBpY2tlciA9PT0gdHJ1ZSAmJiAodHlwZW9mIHRoaXMucHJvcHMudGltZVBpY2tlciA9PT0gJ3VuZGVmaW5lZCcgfHwgIXRoaXMucHJvcHMudGltZVBpY2tlcikpIHtcclxuICAgICAgICAgICAgdmFyIGFyciA9IGRhdGUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgZGF0ZSA9IGFyclswXSArICcgMjM6NTk6NTknO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRlOiBkYXRlfSk7XHJcblxyXG4gICAgICAgIC8vIHNldHRpbmcgZXZlbnRzXHJcbiAgICAgICAgZGF0ZXBpY2tlci5vbignZHAuY2hhbmdlJywgdGhpcy5vbkNoYW5nZSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4ge2RhdGU6IHRoaXMucHJvcHMuZGF0ZX07XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCmOq4sCDsp4HsoIQo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLnByb3BzLmlkO1xyXG4gICAgICAgIGlmKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWQgPSBVdGlsLmdldFVVSUQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpwg64uk7J2MKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlcGlja2VyID0gJCgnIycrdGhpcy5pZCksXHJcbiAgICAgICAgICAgICAgICBkYXRhID0ge307XHJcblxyXG4gICAgICAgICAgICAvLyBuYW1lIOydmCB2YWx1ZSDqsJIg7ISk7KCVXHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKGRhdGVwaWNrZXIuZGF0YShcIkRhdGVUaW1lUGlja2VyXCIpLmRhdGUoKS5fZCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucHJvcHMuZW5kRGF0ZVBpY2tlciA9PT0gdHJ1ZSAmJiAodHlwZW9mIHRoaXMucHJvcHMudGltZVBpY2tlciA9PT0gJ3VuZGVmaW5lZCcgfHwgIXRoaXMucHJvcHMudGltZVBpY2tlcikpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBkYXRlLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgICAgICAgICBkYXRlID0gYXJyWzBdICsgJyAyMzo1OTo1OSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YS5kYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgZGF0YS5kYXRlcGlja2VyID0gZGF0ZXBpY2tlcjtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICB2YXIgZGF0ZXBpY2tlciA9ICQoJyMnK3RoaXMuaWQpO1xyXG5cclxuICAgICAgICAvLyBzZXREYXRlIOyymOumrFxyXG4gICAgICAgIGlmKHR5cGVvZiBuZXh0UHJvcHMuZGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgLy8gc3RyaW5nIOydhCBtb21lbnQg66GcIOuzgO2ZmO2VtOyEnCDrhKPsnpBcclxuICAgICAgICAgICAgdmFyIGQgPSBtb21lbnQobmV4dFByb3BzLmRhdGUsIGRhdGVwaWNrZXIuZGF0YShcIkRhdGVUaW1lUGlja2VyXCIpLmZvcm1hdCgpKTtcclxuICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIikuZGF0ZShkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG5hbWUg7J2YIHZhbHVlIOqwkiDshKTsoJVcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoZGF0ZXBpY2tlci5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIikuZGF0ZSgpLl9kKTtcclxuICAgICAgICAgICAgaWYodGhpcy5wcm9wcy5lbmREYXRlUGlja2VyID09PSB0cnVlICYmICh0eXBlb2YgdGhpcy5wcm9wcy50aW1lUGlja2VyID09PSAndW5kZWZpbmVkJyB8fCAhdGhpcy5wcm9wcy50aW1lUGlja2VyKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IGRhdGUuc3BsaXQoJyAnKTtcclxuICAgICAgICAgICAgICAgIGRhdGUgPSBhcnJbMF0gKyAnIDIzOjU5OjU5JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRlOiBkYXRlfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBkaXNhYmxlZCDsspjrpqxcclxuICAgICAgICBpZihuZXh0UHJvcHMuZGlzYWJsZWQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIikuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgZGF0ZXBpY2tlci5kYXRhKFwiRGF0ZVRpbWVQaWNrZXJcIikuZW5hYmxlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtaW5EYXRlL21heERhdGUg7LKY66asXHJcbiAgICAgICAgLypcclxuICAgICAgICBpZih0eXBlb2YgbmV4dFByb3BzLm1pbkRhdGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtaW5EYXRlOiAnICsgbmV4dFByb3BzLm1pbkRhdGUpO1xyXG4gICAgICAgICAgICB2YXIgbWluRGF0ZSA9IG1vbWVudChuZXh0UHJvcHMubWluRGF0ZSk7XHJcbiAgICAgICAgICAgIGRhdGVwaWNrZXIuZGF0YSgnRGF0ZVRpbWVQaWNrZXInKS5taW5EYXRlKG1pbkRhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIG5leHRQcm9wcy5tYXhEYXRlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbWF4RGF0ZTogJyArIG5leHRQcm9wcy5tYXhEYXRlKTtcclxuICAgICAgICAgICAgdmFyIG1heERhdGUgPSBtb21lbnQobmV4dFByb3BzLm1heERhdGUpO1xyXG4gICAgICAgICAgICBkYXRlcGlja2VyLmRhdGEoJ0RhdGVUaW1lUGlja2VyJykubWF4RGF0ZShtYXhEYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKi9cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnaW5wdXQtZ3JvdXAnLCAnZGF0ZScsIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gaWQ9e3RoaXMuaWR9PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbnB1dC1ncm91cC1hZGRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWNhbGVuZGFyXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgey8qIGlucHV0IHRleHQg7JeQ7IScIHZhbHVlIOuKlCBwbHVnaW7sl5DshJwg7Luo7Yq466GkIO2VtOyEnCDstqnrj4zrsKnsp4Drpbwg7JyE7ZW0IGhpZGRlbuycvOuhnCDsspjrpqwgKi99XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9e3RoaXMucHJvcHMubmFtZX0gdmFsdWU9e3RoaXMuc3RhdGUuZGF0ZX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgRGF0ZVJhbmdlUGlja2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdEYXRlUmFuZ2VQaWNrZXInLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHN0YXJ0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBlbmROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAvLyBZWVlZLU1NLUREIEhIOm1tOnNzIGZvcm1hdOydmCBzdHJpbmdcclxuICAgICAgICBlbmREYXRlOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAgICAgICAgLy8gWVlZWS1NTS1ERCBISDptbTpzcyBmb3JtYXTsnZggc3RyaW5nXHJcbiAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIHRpbWVQaWNrZXI6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIG9uSW5pdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jXHJcbiAgICB9LFxyXG4gICAgc3RhcnREYXRlOiAnJyxcclxuICAgIGVuZERhdGU6ICcnLFxyXG4gICAgc3RhcnRPbGREYXRlOiAnJyxcclxuICAgIGVuZE9sZERhdGU6ICcnLFxyXG4gICAgc3RhcnRQaWNrZXI6ICcnLFxyXG4gICAgZW5kUGlja2VyOiAnJyxcclxuICAgIG9uRnJvbUluaXQ6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IGRhdGEuZGF0ZTtcclxuICAgICAgICB0aGlzLnN0YXJ0UGlja2VyID0gZGF0YS5kYXRlcGlja2VyO1xyXG4gICAgfSxcclxuICAgIG9uVG9Jbml0OiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gZGF0YS5kYXRlO1xyXG4gICAgICAgIHRoaXMuZW5kUGlja2VyID0gZGF0YS5kYXRlcGlja2VyO1xyXG4gICAgfSxcclxuICAgIG9uU3RhcnRDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBkYXRlLCBvbGREYXRlKSB7XHJcbiAgICAgICAgLy8gbWluRGF0ZSDshKTsoJVcclxuICAgICAgICB2YXIgbWluRGF0ZSA9IG1vbWVudChkYXRlKTtcclxuICAgICAgICAvLyQoZXZlbnQudGFyZ2V0KS5uZXh0KCkuZGF0YSgnRGF0ZVRpbWVQaWNrZXInKS5taW5EYXRlKG1pbkRhdGUpO1xyXG4gICAgICAgIHRoaXMuZW5kUGlja2VyLmRhdGEoJ0RhdGVUaW1lUGlja2VyJykubWluRGF0ZShtaW5EYXRlKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0T2xkRGF0ZSA9IG9sZERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUsIHRoaXMuc3RhcnRPbGREYXRlLCB0aGlzLmVuZE9sZERhdGUpO1xyXG4gICAgICAgICAgICAvL2V2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkVuZENoYW5nZTogZnVuY3Rpb24oZXZlbnQsIGRhdGUsIG9sZERhdGUpIHtcclxuICAgICAgICAvLyBtYXhEYXRlIOyEpOyglVxyXG4gICAgICAgIHZhciBtYXhEYXRlID0gbW9tZW50KGRhdGUpO1xyXG4gICAgICAgIC8vJChldmVudC50YXJnZXQpLnByZXYoKS5kYXRhKCdEYXRlVGltZVBpY2tlcicpLm1heERhdGUobWF4RGF0ZSk7XHJcbiAgICAgICAgdGhpcy5zdGFydFBpY2tlci5kYXRhKCdEYXRlVGltZVBpY2tlcicpLm1heERhdGUobWF4RGF0ZSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kT2xkRGF0ZSA9IG9sZERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHRoaXMuc3RhcnREYXRlLCB0aGlzLmVuZERhdGUsIHRoaXMuc3RhcnRPbGREYXRlLCB0aGlzLmVuZE9sZERhdGUpO1xyXG4gICAgICAgICAgICAvL2V2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRTdGF0ZU9iamVjdDogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICAvLyBzdGFydERhdGUg7LKY66asXHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IHByb3BzLnN0YXJ0RGF0ZTtcclxuXHJcbiAgICAgICAgLy8gZW5kRGF0ZSDsspjrpqxcclxuICAgICAgICBsZXQgZW5kRGF0ZSA9IHByb3BzLmVuZERhdGU7XHJcblxyXG4gICAgICAgIC8vIGRpc2FibGVkIOyymOumrFxyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkO1xyXG4gICAgICAgIGlmKHR5cGVvZiBkaXNhYmxlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxyXG4gICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWRcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVPYmplY3QodGhpcy5wcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG5cclxuICAgICAgICAvLyBtaW5EYXRlL21heERhdGUg7ISk7KCVXHJcbiAgICAgICAgdmFyIG1heERhdGUgPSBtb21lbnQodGhpcy5lbmREYXRlKTtcclxuICAgICAgICB0aGlzLnN0YXJ0UGlja2VyLmRhdGEoJ0RhdGVUaW1lUGlja2VyJykubWF4RGF0ZShtYXhEYXRlKTtcclxuXHJcbiAgICAgICAgdmFyIG1pbkRhdGUgPSBtb21lbnQodGhpcy5zdGFydERhdGUpO1xyXG4gICAgICAgIHRoaXMuZW5kUGlja2VyLmRhdGEoJ0RhdGVUaW1lUGlja2VyJykubWluRGF0ZShtaW5EYXRlKTtcclxuXHJcbiAgICAgICAgLy8gb25Jbml0XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgIGRhdGEuc3RhcnREYXRlID0gdGhpcy5zdGFydERhdGU7XHJcbiAgICAgICAgICAgIGRhdGEuZW5kRGF0ZSA9IHRoaXMuZW5kRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc2V0U3RhdGVPYmplY3QobmV4dFByb3BzKSk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlcGlja2VyLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8UHVtLkRhdGVQaWNrZXIgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0gbmFtZT17dGhpcy5wcm9wcy5zdGFydE5hbWV9IGRhdGU9e3RoaXMuc3RhdGUuc3RhcnREYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5pdD17dGhpcy5vbkZyb21Jbml0fSBvbkNoYW5nZT17dGhpcy5vblN0YXJ0Q2hhbmdlfSB0aW1lUGlja2VyPXt0aGlzLnByb3BzLnRpbWVQaWNrZXJ9IGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSAvPlxyXG4gICAgICAgICAgICAgICAgPFB1bS5EYXRlUGlja2VyIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IG5hbWU9e3RoaXMucHJvcHMuZW5kTmFtZX0gZGF0ZT17dGhpcy5zdGF0ZS5lbmREYXRlfSBlbmREYXRlUGlja2VyPXt0cnVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5pdD17dGhpcy5vblRvSW5pdH0gb25DaGFuZ2U9e3RoaXMub25FbmRDaGFuZ2V9IHRpbWVQaWNrZXI9e3RoaXMucHJvcHMudGltZVBpY2tlcn0gZGlzYWJsZWQ9e3RoaXMuc3RhdGUuZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucz17e3VzZUN1cnJlbnQ6IGZhbHNlfX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIERhdGVQaWNrZXI6IERhdGVQaWNrZXIsXHJcbiAgICBEYXRlUmFuZ2VQaWNrZXI6IERhdGVSYW5nZVBpY2tlclxyXG59OyIsIi8qKlxyXG4gKiBEYXRlUmFuZ2VQaWNrZXIgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMTdcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5EYXRlUmFuZ2VQaWNrZXIgb3B0aW9ucz1cIntvcHRpb25zfVwiIC8+XHJcbiAqXHJcbiAqIERhdGUgUmFuZ2UgUGlja2VyIOudvOydtOu4jOufrOumrOyXkCDsooXsho3soIHsnbTri6QuXHJcbiAqIGh0dHA6Ly93d3cuZGF0ZXJhbmdlcGlja2VyLmNvbS9cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL1V0aWwnKTtcclxudmFyIERhdGVVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvRGF0ZVV0aWwnKTtcclxuXHJcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIHRpbWVQaWNrZXIyNEhvdXI6IHRydWUsXHJcbiAgICBsb2NhbGU6IHtcclxuICAgICAgICBmb3JtYXQ6IFwiWVlZWS1NTS1ERFwiLFxyXG4gICAgICAgIHNlcGFyYXRvcjogXCIgfiBcIixcclxuICAgICAgICBhcHBseUxhYmVsOiAkcHNfbG9jYWxlLmFwcGx5LFxyXG4gICAgICAgIGNhbmNlbExhYmVsOiAkcHNfbG9jYWxlLmNhbmNlbCxcclxuICAgICAgICBkYXlzT2ZXZWVrOiBbXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuc3VuLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm1vbixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS50dWUsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUud2VkLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLnRodSxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5mcmksXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuc2F0XHJcbiAgICAgICAgXSxcclxuICAgICAgICBtb250aE5hbWVzOiBbXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuamFuLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLmZlYixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5tYXIsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuYXByLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm1heSxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5qdW4sXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuanVsLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLmF1ZyxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5zZXAsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUub2N0LFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm5vdixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5kZWNcclxuICAgICAgICBdXHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgRGF0ZVJhbmdlUGlja2VyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdEYXRlUmFuZ2VQaWNrZXInLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIC8vb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBzdGFydERhdGVOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGVuZERhdGVOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLnN0cmluZywgICAgLy8gWVlZWS1NTS1ERCBoaDptbTpzcyDroZwg7KCE64us65CcIOqwkuydhFxyXG4gICAgICAgIGVuZERhdGU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIHNpbmdsZVBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgdGltZVBpY2tlcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25IaWRlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkFwcGx5OiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSxcclxuICAgIGlkOiAnJyxcclxuICAgIHN0YXJ0RGF0ZTogJycsXHJcbiAgICBlbmREYXRlOiAnJyxcclxuICAgIG9uQXBwbHk6IGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkFwcGx5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydERhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcocGlja2VyLnN0YXJ0RGF0ZS5fZCksXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKHBpY2tlci5lbmREYXRlLl9kKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzdGFydERhdGUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGVuZERhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQXBwbHkoZXZlbnQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcGlja2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25IaWRlOiBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRIaWRkZW5WYWx1ZSgpO1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uSGlkZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnREYXRlID0gRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKHBpY2tlci5zdGFydERhdGUuX2QpLFxyXG4gICAgICAgICAgICAgICAgZW5kRGF0ZSA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhwaWNrZXIuZW5kRGF0ZS5fZCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25IaWRlKGV2ZW50LCBzdGFydERhdGUsIGVuZERhdGUsIHBpY2tlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNldEhpZGRlblZhbHVlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGF0ZVJhbmdlUGlja2VyID0gJCgnIycgKyB0aGlzLmlkKSxcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gZGF0ZVJhbmdlUGlja2VyLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpLnN0YXJ0RGF0ZS5fZCxcclxuICAgICAgICAgICAgZW5kRGF0ZSA9IGRhdGVSYW5nZVBpY2tlci5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKS5lbmREYXRlLl9kLFxyXG4gICAgICAgICAgICBzdGFydERhdGVTdHJpbmcsIGVuZERhdGVTdHJpbmc7XHJcblxyXG4gICAgICAgIHN0YXJ0RGF0ZVN0cmluZyA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhzdGFydERhdGUpO1xyXG4gICAgICAgIGVuZERhdGVTdHJpbmcgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoZW5kRGF0ZSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhzdGFydERhdGVTdHJpbmcpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coZW5kRGF0ZVN0cmluZyk7XHJcblxyXG4gICAgICAgICQoJ1tuYW1lPVwiJyArIHRoaXMucHJvcHMuc3RhcnREYXRlTmFtZSArICdcIl0nKS52YWwoc3RhcnREYXRlU3RyaW5nKTtcclxuICAgICAgICAkKCdbbmFtZT1cIicgKyB0aGlzLnByb3BzLmVuZERhdGVOYW1lICsgJ1wiXScpLnZhbChlbmREYXRlU3RyaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBzdGFydERhdGVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZVN0cmluZztcclxuICAgIH0sXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBwcm9wT3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyxcclxuICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgcHJvcE9wdGlvbnMpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IG9wdGlvbmFsID0ge307XHJcblxyXG4gICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnByb3BzLnN0YXJ0RGF0ZTtcclxuICAgICAgICBpZih0eXBlb2Ygc3RhcnREYXRlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvcHRpb25hbC5zdGFydERhdGUgPSBzdGFydERhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnByb3BzLmVuZERhdGU7XHJcbiAgICAgICAgaWYodHlwZW9mIGVuZERhdGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbmFsLmVuZERhdGUgPSBlbmREYXRlO1xyXG4gICAgICAgICAgICB0aGlzLmVuZERhdGUgPSBlbmREYXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHNpbmdsZVBpY2tlciA9IHRoaXMucHJvcHMuc2luZ2xlUGlja2VyO1xyXG4gICAgICAgIGlmKHR5cGVvZiBzaW5nbGVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbmFsLnNpbmdsZURhdGVQaWNrZXIgPSBzaW5nbGVQaWNrZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGltZVBpY2tlciA9IHRoaXMucHJvcHMudGltZVBpY2tlcjtcclxuICAgICAgICBpZih0eXBlb2YgdGltZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgb3B0aW9uYWwudGltZVBpY2tlciA9IHRpbWVQaWNrZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9uYWwpO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZGF0ZVJhbmdlUGlja2VyID0gJCgnIycgKyB0aGlzLmlkKTtcclxuICAgICAgICBkYXRlUmFuZ2VQaWNrZXIuZGF0ZXJhbmdlcGlja2VyKHRoaXMuZ2V0T3B0aW9ucygpKTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRIaWRkZW5WYWx1ZSgpO1xyXG5cclxuICAgICAgICAvLyBzZXR0aW5nIGV2ZW50c1xyXG4gICAgICAgIGRhdGVSYW5nZVBpY2tlci5vbignaGlkZS5kYXRlcmFuZ2VwaWNrZXInLCB0aGlzLm9uSGlkZSk7XHJcbiAgICAgICAgZGF0ZVJhbmdlUGlja2VyLm9uKCdhcHBseS5kYXRlcmFuZ2VwaWNrZXInLCB0aGlzLm9uQXBwbHkpO1xyXG4gICAgfSxcclxuICAgIHNldFN0YXRlT2JqZWN0OiBmdW5jdGlvbihwcm9wcykge1xyXG4gICAgICAgIC8vIGRpc2FibGVkIOyymOumrFxyXG4gICAgICAgIGxldCBkaXNhYmxlZCA9IHByb3BzLmRpc2FibGVkO1xyXG4gICAgICAgIGlmKHR5cGVvZiBkaXNhYmxlZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZFxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZU9iamVjdCh0aGlzLnByb3BzKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KY6riwIOyngeyghCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcclxuICAgICAgICAvLyDsu7Ttj6zrhIztirjqsIAg7IOI66Gc7Jq0IHByb3Bz66W8IOuwm+ydhCDrlYwg7Zi47LacKOy1nOy0iCDroIzrjZTrp4Eg7Iuc7JeQ64qUIO2YuOy2nOuQmOyngCDslYrsnYwpXHJcbiAgICAgICAgY29uc29sZS5sb2cobmV4dFByb3BzKTtcclxuICAgICAgICBsZXQgZGF0ZVJhbmdlUGlja2VyID0gJCgnIycgKyB0aGlzLmlkKSxcclxuICAgICAgICAgICAgc3RhcnREYXRlID0gbmV4dFByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgZW5kRGF0ZSA9IG5leHRQcm9wcy5lbmREYXRlO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgZGF0ZVJhbmdlUGlja2VyLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZih0eXBlb2Ygc3RhcnREYXRlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGFydERhdGUgIT0gc3RhcnREYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnREYXRlIHR5cGU6IERhdGUvbW9tZW50L3N0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXRTdGFydERhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuc2V0U3RhcnREYXRlKHN0YXJ0RGF0ZSk7XHQvLyAnMjAxNC0wMy0wMSdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mIGVuZERhdGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVuZERhdGUgIT0gZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuZERhdGUgdHlwZTogRGF0ZS9tb21lbnQvc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NldEVuZERhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuc2V0RW5kRGF0ZShlbmREYXRlKTtcdC8vICcyMDE0LTAzLTAxJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kRGF0ZSA9IGVuZERhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zZXRTdGF0ZU9iamVjdChuZXh0UHJvcHMpKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSl7XHJcbiAgICAgICAgLy8g7IOI66Gc7Jq0IHByb3Bz64KYIHN0YXRl66W8IOuwm+yVmOydhCDrlYwg66CM642U66eBIOyngeyghOyXkCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFVwZGF0ZScpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIHN0YXJ0RGF0ZU5hbWUsIGVuZERhdGVOYW1lLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpbnB1dC1ncm91cCBkYXRlcmFuZ2UnLCBjbGFzc05hbWUpfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPXt0aGlzLmlkfSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBzdHlsZT17e3dpZHRoOiB3aWR0aH19IGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSAvPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5wdXQtZ3JvdXAtYWRkb25cIj48aSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2dseXBoaWNvbicsICdnbHlwaGljb24tY2FsZW5kYXInLCAnZmEnLCAnZmEtY2FsZW5kYXInLCB7ZGlzYWJsZWQ6IHRoaXMuc3RhdGUuZGlzYWJsZWR9KX0+PC9pPjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17c3RhcnREYXRlTmFtZX0gLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17ZW5kRGF0ZU5hbWV9IC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRlUmFuZ2VQaWNrZXI7IiwiLyoqXHJcbiAqIERhdGVSYW5nZVBpY2tlciBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8xN1xyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVmLkRhdGVSYW5nZXMgc3RhcnROYW1lPVwic3RhcnREYXRlXCIgZW5kTmFtZT1cImVuZERhdGVcIiByYW5nZXM9e3ByZWRlZmluZWRfcmFuZ2VzfSAvPlxyXG4gKlxyXG4gKiBEYXRlIFJhbmdlIFBpY2tlciDrnbzsnbTruIzrn6zrpqzsl5Ag7KKF7IaN7KCB7J2064ukLlxyXG4gKiBodHRwOi8vd3d3LmRhdGVyYW5nZXBpY2tlci5jb20vXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XHJcbnZhciBjbGFzc05hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5cclxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9VdGlsJyk7XHJcbnZhciBEYXRlVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL0RhdGVVdGlsJyk7XHJcblxyXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgICB0aW1lUGlja2VyMjRIb3VyOiB0cnVlLFxyXG4gICAgLy9vcGVuczogJ3JpZ2h0JyxcclxuICAgIGxvY2FsZToge1xyXG4gICAgICAgIGZvcm1hdDogXCJZWVlZLU1NLUREXCIsXHJcbiAgICAgICAgc2VwYXJhdG9yOiBcIiB+IFwiLFxyXG4gICAgICAgIGFwcGx5TGFiZWw6ICRwc19sb2NhbGUuYXBwbHksXHJcbiAgICAgICAgY2FuY2VsTGFiZWw6ICRwc19sb2NhbGUuY2FuY2VsLFxyXG4gICAgICAgIGN1c3RvbVJhbmdlTGFiZWw6ICRwc19sb2NhbGUuZGlyZWN0X3NlbGVjdCxcclxuICAgICAgICBkYXlzT2ZXZWVrOiBbXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuc3VuLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm1vbixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS50dWUsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUud2VkLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLnRodSxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5mcmksXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuc2F0XHJcbiAgICAgICAgXSxcclxuICAgICAgICBtb250aE5hbWVzOiBbXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuamFuLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLmZlYixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5tYXIsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuYXByLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm1heSxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5qdW4sXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUuanVsLFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLmF1ZyxcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5zZXAsXHJcbiAgICAgICAgICAgICRwc19sb2NhbGUub2N0LFxyXG4gICAgICAgICAgICAkcHNfbG9jYWxlLm5vdixcclxuICAgICAgICAgICAgJHBzX2xvY2FsZS5kZWNcclxuICAgICAgICBdXHJcbiAgICB9XHJcbn07XHJcblxyXG52YXIgRGF0ZVJhbmdlcyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnRGF0ZVJhbmdlcycsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgZm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHN0YXJ0TmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBlbmROYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHN0YXJ0RGF0ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5vYmplY3RcclxuICAgICAgICBdKSxcclxuICAgICAgICBlbmREYXRlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIHJhbmdlczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICB0aW1lUGlja2VyOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgd2lkdGg6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyXHJcbiAgICAgICAgXSksXHJcbiAgICAgICAgb3BlbnM6IFByb3BUeXBlcy5zdHJpbmcsICAgICAgICAvLyAnbGVmdCcvJ3JpZ2h0Jy8nY2VudGVyJ1xyXG4gICAgICAgIG9uSGlkZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb25BcHBseTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgaW5pdDogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0sXHJcbiAgICBpZDogJycsXHJcbiAgICBzdGFydERhdGU6ICcnLFxyXG4gICAgZW5kRGF0ZTogJycsXHJcbiAgICBvbkFwcGx5OiBmdW5jdGlvbihldmVudCwgcGlja2VyKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnb25BcHBseScpO1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uQXBwbHkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0RGF0ZSA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhwaWNrZXIuc3RhcnREYXRlLl9kKSxcclxuICAgICAgICAgICAgICAgIGVuZERhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcocGlja2VyLmVuZERhdGUuX2QpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZW5kRGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BcHBseShldmVudCwgc3RhcnREYXRlLCBlbmREYXRlLCBwaWNrZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvbkhpZGU6IGZ1bmN0aW9uKGV2ZW50LCBwaWNrZXIpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKCdvbkhpZGUnKTsgLy8gaGlkZSDtmLjstpzrkJjqs6AgYXBwbHkg7Zi47Lac65CoICjrgqDsp5zqsJIg7IWL7YyF7J2AIOyXrOq4sOyEnClcclxuICAgICAgICB0aGlzLnNldEhpZGRlblZhbHVlKCk7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25IaWRlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydERhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcocGlja2VyLnN0YXJ0RGF0ZS5fZCksXHJcbiAgICAgICAgICAgICAgICBlbmREYXRlID0gRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKHBpY2tlci5lbmREYXRlLl9kKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkhpZGUoZXZlbnQsIHN0YXJ0RGF0ZSwgZW5kRGF0ZSwgcGlja2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0SGlkZGVuVmFsdWU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBzdGFydERhdGUgPSB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuc3RhcnREYXRlLl9kLFxyXG4gICAgICAgICAgICBlbmREYXRlID0gdGhpcy4kZGF0ZVJhbmdlUGlja2VyLmRhdGEoJ2RhdGVyYW5nZXBpY2tlcicpLmVuZERhdGUuX2QsXHJcbiAgICAgICAgICAgIHN0YXJ0RGF0ZVN0cmluZywgZW5kRGF0ZVN0cmluZztcclxuXHJcbiAgICAgICAgc3RhcnREYXRlU3RyaW5nID0gRGF0ZVV0aWwuZ2V0RGF0ZVRvU3RyaW5nKHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgZW5kRGF0ZVN0cmluZyA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhlbmREYXRlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHN0YXJ0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhlbmREYXRlU3RyaW5nKTtcclxuXHJcbiAgICAgICAgJCgnW25hbWU9XCInICsgdGhpcy5wcm9wcy5zdGFydE5hbWUgKyAnXCJdJykudmFsKHN0YXJ0RGF0ZVN0cmluZyk7XHJcbiAgICAgICAgJCgnW25hbWU9XCInICsgdGhpcy5wcm9wcy5lbmROYW1lICsgJ1wiXScpLnZhbChlbmREYXRlU3RyaW5nKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGFydERhdGUgPSBzdGFydERhdGVTdHJpbmc7XHJcbiAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZVN0cmluZztcclxuICAgIH0sXHJcbiAgICBkaXNwbGF5RGF0ZTogZnVuY3Rpb24oc3RhcnQsIGVuZCkge1xyXG4gICAgICAgIHZhciBmb3JtYXQgPSAnWVlZWS1NTS1ERCc7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBmb3JtYXQgPSB0aGlzLnByb3BzLmZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8kKCdkaXYjJyArIHRoaXMuaWQgKyAnIHNwYW4nKS5odG1sKHN0YXJ0LmZvcm1hdChmb3JtYXQpICsgJyAtICcgKyBlbmQuZm9ybWF0KGZvcm1hdCkpO1xyXG5cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBzdGFydCA9IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBlbmQgPSBtb21lbnQoZW5kKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuJGRhdGVSYW5nZVBpY2tlci5maW5kKCdzcGFuJykuaHRtbChzdGFydC5mb3JtYXQoZm9ybWF0KSArICcgLSAnICsgZW5kLmZvcm1hdChmb3JtYXQpKTtcclxuICAgIH0sXHJcbiAgICBnZXRPcHRpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBwcm9wT3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyxcclxuICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgcHJvcE9wdGlvbnMpO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgbGV0IG9wdGlvbmFsID0ge307XHJcblxyXG4gICAgICAgIGxldCByYW5nZXMgPSB0aGlzLnByb3BzLnJhbmdlcztcclxuICAgICAgICBpZih0eXBlb2YgcmFuZ2VzICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBvcHRpb25hbC5yYW5nZXMgPSByYW5nZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEYXRlLCBtb21lbnQsIHN0cmluZ1xyXG4gICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnByb3BzLnN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgZW5kRGF0ZSA9IHRoaXMucHJvcHMuZW5kRGF0ZTtcclxuICAgICAgICBpZih0eXBlb2Ygc3RhcnREYXRlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZW5kRGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgb3B0aW9uYWwuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgICBvcHRpb25hbC5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYodHlwZW9mIHN0YXJ0RGF0ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREYXRlID0gc3RhcnREYXRlO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihzdGFydERhdGUuaGFzT3duUHJvcGVydHkoJ19kJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBtb21lbnRcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IERhdGVVdGlsLmdldERhdGVUb1N0cmluZyhzdGFydERhdGUuX2QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydERhdGUgPSBEYXRlVXRpbC5nZXREYXRlVG9TdHJpbmcoc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdmFyIGZpcnN0O1xyXG5cclxuICAgICAgICAgICAgZm9yKHZhciBrZXkgaW4gcmFuZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VzLmhhc093blByb3BlcnR5KGtleSkgJiYgdHlwZW9mIGtleSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gcmFuZ2VzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGZpcnN0ICE9PSB1bmRlZmluZWQgJiYgQXJyYXkuaXNBcnJheShmaXJzdCkgJiYgZmlyc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uYWwuc3RhcnREYXRlID0gZmlyc3RbMF07XHJcbiAgICAgICAgICAgICAgICBvcHRpb25hbC5lbmREYXRlID0gZmlyc3RbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aW1lUGlja2VyID0gdGhpcy5wcm9wcy50aW1lUGlja2VyO1xyXG4gICAgICAgIG9wdGlvbmFsLnRpbWVQaWNrZXIgPSB0aW1lUGlja2VyO1xyXG5cclxuICAgICAgICBsZXQgb3BlbnMgPSB0aGlzLnByb3BzLm9wZW5zO1xyXG4gICAgICAgIG9wdGlvbmFsLm9wZW5zID0gb3BlbnM7XHJcblxyXG4gICAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRPcHRpb25zLCBvcHRpb25hbCk7XHJcblxyXG4gICAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfSxcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy5nZXRPcHRpb25zKCk7XHJcbiAgICAgICAgdGhpcy4kZGF0ZVJhbmdlUGlja2VyID0gJCgnIycgKyB0aGlzLmlkKTtcclxuICAgICAgICB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIuZGF0ZXJhbmdlcGlja2VyKG9wdGlvbnMsIHRoaXMuZGlzcGxheURhdGUpO1xyXG5cclxuICAgICAgICAvLyBpbml0IGRpc3BsYXlcclxuICAgICAgICB0aGlzLmRpc3BsYXlEYXRlKG9wdGlvbnMuc3RhcnREYXRlLCBvcHRpb25zLmVuZERhdGUpO1xyXG5cclxuICAgICAgICB0aGlzLnNldEhpZGRlblZhbHVlKCk7XHJcblxyXG4gICAgICAgIC8vIHNldHRpbmcgZXZlbnRzXHJcbiAgICAgICAgdGhpcy4kZGF0ZVJhbmdlUGlja2VyLm9uKCdoaWRlLmRhdGVyYW5nZXBpY2tlcicsIHRoaXMub25IaWRlKTtcclxuICAgICAgICB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIub24oJ2FwcGx5LmRhdGVyYW5nZXBpY2tlcicsIHRoaXMub25BcHBseSk7XHJcbiAgICB9LFxyXG4gICAgc2V0U3RhdGVPYmplY3Q6IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICAgICAgLy8gZGlzYWJsZWQg7LKY66asXHJcbiAgICAgICAgbGV0IGRpc2FibGVkID0gcHJvcHMuZGlzYWJsZWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGRpc2FibGVkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2BtOuemOyKpOqwgCDsg53shLHrkKAg65WMIO2VnOuyiCDtmLjstpzrkJjqs6Ag7LqQ7Iuc65Cc64ukLlxyXG4gICAgICAgIC8vIOu2gOuqqCDsu7Ttj6zrhIztirjsl5DshJwgcHJvcOydtCDrhJjslrTsmKTsp4Ag7JWK7J2AIOqyveyasCAoaW4g7Jew7IKw7J6Q66GcIO2ZleyduCkg66ek7ZWR7J2YIOqwkuydtCB0aGlzLnByb3Bz7JeQIOyEpOygleuQnOuLpC5cclxuICAgICAgICByZXR1cm4ge3RpbWVQaWNrZXI6IGZhbHNlLCBvcGVuczogJ3JpZ2h0J307XHJcbiAgICB9LFxyXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZU9iamVjdCh0aGlzLnByb3BzKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KY6riwIOyngeyghCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMuaW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5zdGFydERhdGUvdGhpcy5lbmREYXRlIOydgCBzZXRIaWRkZW5WYWx1ZSgpIOyXkOyEnCDshKTsoJXrkKhcclxuICAgICAgICAgICAgZGF0YS5zdGFydERhdGUgPSB0aGlzLnN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgZGF0YS5lbmREYXRlID0gdGhpcy5lbmREYXRlO1xyXG4gICAgICAgICAgICBkYXRhLmRhdGVwaWNrZXIgPSB0aGlzLiRkYXRlUmFuZ2VQaWNrZXI7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g7Lu07Y+s64SM7Yq46rCAIOyDiOuhnOyatCBwcm9wc+ulvCDrsJvsnYQg65WMIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5leHRQcm9wcyk7XHJcbiAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5leHRQcm9wcy5zdGFydERhdGUsXHJcbiAgICAgICAgICAgIGVuZERhdGUgPSBuZXh0UHJvcHMuZW5kRGF0ZTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMuJGRhdGVSYW5nZVBpY2tlci5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHN0YXJ0RGF0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc3RhcnREYXRlICE9IHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0YXJ0RGF0ZSB0eXBlOiBEYXRlL21vbWVudC9zdHJpbmdcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzZXRTdGFydERhdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuc2V0U3RhcnREYXRlKHN0YXJ0RGF0ZSk7XHQvLyAnMjAxNC0wMy0wMSdcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGF0ZSA9IHN0YXJ0RGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYodHlwZW9mIGVuZERhdGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVuZERhdGUgIT0gZW5kRGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuZERhdGUgdHlwZTogRGF0ZS9tb21lbnQvc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnc2V0RW5kRGF0ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGRhdGVSYW5nZVBpY2tlci5kYXRhKCdkYXRlcmFuZ2VwaWNrZXInKS5zZXRFbmREYXRlKGVuZERhdGUpO1x0Ly8gJzIwMTQtMDMtMDEnXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmREYXRlID0gZW5kRGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIF9zdGFydERhdGUgPSB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgICAgX2VuZERhdGUgPSB0aGlzLiRkYXRlUmFuZ2VQaWNrZXIuZGF0YSgnZGF0ZXJhbmdlcGlja2VyJykuZW5kRGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5RGF0ZShfc3RhcnREYXRlLCBfZW5kRGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc2V0U3RhdGVPYmplY3QobmV4dFByb3BzKSk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgc3RhcnROYW1lLCBlbmROYW1lLCB3aWR0aH0gPSB0aGlzLnByb3BzO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuaWR9IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnZGF0ZXJhbmdlcGlja2VyLXJhbmdlcyBwdWxsLXJpZ2h0JywgY2xhc3NOYW1lKX0gc3R5bGU9e3t3aWR0aDogd2lkdGh9fT5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT0nZ2x5cGhpY29uIGdseXBoaWNvbi1jYWxlbmRhciBmYSBmYS1jYWxlbmRhcic+eydcXHUwMEEwJ308L2k+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj48L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8YiBjbGFzc05hbWU9J2NhcmV0Jz48L2I+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIG5hbWU9e3N0YXJ0TmFtZX0gLz5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT17ZW5kTmFtZX0gLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVSYW5nZXM7IiwiLyoqXHJcbiAqIEZpZWxkc2V0IGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzMwXHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uRmllbGRzZXQgLz5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL3V0aWwnKTtcclxuXHJcbnZhciBGaWVsZHNldCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnRmllbGRzZXQnLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGxlZ2VuZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBleHBhbmQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIGNvbGxhcHNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBvblRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgb25Jbml0OiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSxcclxuICAgIGlkOiAnJyxcclxuICAgIHRvZ2dsZTogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICBpZih0aGlzLnByb3BzLmNvbGxhcHNpYmxlID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwcm9wcy5leHBhbmQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmQ6IHByb3BzLmV4cGFuZH0pO1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtleHBhbmQ6IHRydWV9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblRvZ2dsZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgZXhwYW5kID0gIXRoaXMuc3RhdGUuZXhwYW5kO1xyXG4gICAgICAgIHRoaXMudG9nZ2xlKHtleHBhbmQ6IGV4cGFuZH0pO1xyXG5cclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vblRvZ2dsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVG9nZ2xlKGV4cGFuZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8g7YG0656Y7Iqk6rCAIOyDneyEseuQoCDrlYwg7ZWc67KIIO2YuOy2nOuQmOqzoCDsupDsi5zrkJzri6QuXHJcblx0XHQvLyDrtoDrqqgg7Lu07Y+s64SM7Yq47JeQ7IScIHByb3DsnbQg64SY7Ja07Jik7KeAIOyViuydgCDqsr3smrAgKGluIOyXsOyCsOyekOuhnCDtmZXsnbgpIOunpO2VkeydmCDqsJLsnbQgdGhpcy5wcm9wc+yXkCDshKTsoJXrkJzri6QuXHJcblx0XHRyZXR1cm4ge2xlZ2VuZDogJ1RpdGxlJywgY29sbGFwc2libGU6IHRydWUsIGV4cGFuZDogdHJ1ZX07XHJcblx0fSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDsu7Ttj6zrhIztirjqsIAg66eI7Jq07Yq465CY6riwIOyghCAo7ZWc67KIIO2YuOy2nCkgLyDrpqzthLTqsJLsnYAgdGhpcy5zdGF0ZeydmCDstIjquLDqsJLsnLzroZwg7IKs7JqpXHJcbiAgICAgICAgcmV0dXJuIHtleHBhbmQ6IHRoaXMucHJvcHMuZXhwYW5kfTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KY6riwIOyngeyghCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkluaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgZGF0YS5leHBhbmQgPSB0aGlzLnN0YXRlLmV4cGFuZDtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICB0aGlzLnRvZ2dsZShuZXh0UHJvcHMpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIGxlZ2VuZCwgY29sbGFwc2libGV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgdmFyIGRpc3BsYXksIGNvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuc3RhdGUuZXhwYW5kID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgaWYoY29sbGFwc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxmaWVsZHNldCBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2ZpZWxkc2V0JywgY2xhc3NOYW1lLCB7Y29sbGFwc2libGU6IGNvbGxhcHNpYmxlLCBjb2xsYXBzZWQ6IGNvbGxhcHNlZH0pfT5cclxuICAgICAgICAgICAgICAgIDxsZWdlbmQgb25DbGljaz17dGhpcy5vblRvZ2dsZX0gbmFtZT17dGhpcy5pZH0+IHtsZWdlbmR9PC9sZWdlbmQ+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7ZGlzcGxheTogZGlzcGxheX19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMuaWR9ID57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRmllbGRzZXQ7IiwiLyoqXHJcbiAqIEhpZGRlbkNvbnRlbnQgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMTBcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5IaWRkZW5Db250ZW50IGlkPXtpZH0gLz5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG4vL3ZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbi8vdmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3JlYWN0JykuUHJvcFR5cGVzO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvVXRpbCcpO1xyXG5cclxudmFyIEhpZGRlbkNvbnRlbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ0hpZGRlbkNvbnRlbnQnLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGV4cGFuZExhYmVsOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGNvbGxhcHNlTGFiZWw6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgZXhwYW5kSWNvbjogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBjb2xsYXBzZUljb246IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgaXNCb3R0b206IFByb3BUeXBlcy5ib29sXHJcbiAgICB9LFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgb25FeHBhbmRDb2xsYXBzZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICBsZXQgYVRhZyA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICBpZigkKGFUYWcpLm5leHQoKS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe2xhYmVsOiB0aGlzLnByb3BzLmNvbGxhcHNlTGFiZWwsIGljb246IHRoaXMucHJvcHMuY29sbGFwc2VJY29ufSk7XHJcbiAgICAgICAgICAgICQoYVRhZykubmV4dCgpLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGFiZWw6IHRoaXMucHJvcHMuZXhwYW5kTGFiZWwsIGljb246IHRoaXMucHJvcHMuZXhwYW5kSWNvbn0pO1xyXG4gICAgICAgICAgICAkKGFUYWcpLm5leHQoKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgb25Cb3R0b21Db2xsYXBzZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldCxcclxuICAgICAgICAgICAgZGl2ID0gbm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XHJcbiAgICAgICAgJChkaXYpLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7bGFiZWw6IHRoaXMucHJvcHMuZXhwYW5kTGFiZWwsIGljb246IHRoaXMucHJvcHMuZXhwYW5kSWNvbn0pO1xyXG4gICAgfSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGxldCBsYWJlbCA9IHRoaXMucHJvcHMuZXhwYW5kTGFiZWw7XHJcbiAgICAgICAgaWYodHlwZW9mIGxhYmVsID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBsYWJlbCA9ICdFeHBhbmQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGljb24gPSB0aGlzLnByb3BzLmV4cGFuZEljb247XHJcblxyXG4gICAgICAgIHJldHVybiB7bGFiZWw6IGxhYmVsLCBpY29uOiBpY29ufTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KY6riwIOyngeyghCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIHZhciBJY29uO1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnN0YXRlLmljb24gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIEljb24gPSA8aSBjbGFzc05hbWU9e3RoaXMuc3RhdGUuaWNvbn0+eydcXHUwMEEwJ308L2k+O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g66eoIOyVhOuemCDsoJHquLDrsoTtirwg7LKY66asXHJcbiAgICAgICAgdmFyIEJvdHRvbUJ1dHRvbjtcclxuICAgICAgICBpZih0aGlzLnByb3BzLmlzQm90dG9tID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGxldCBDb2xsYXBzZUljb247XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLmNvbGxhcHNlSWNvbiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIENvbGxhcHNlSWNvbiA9IDxpIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jb2xsYXBzZUljb259PnsnXFx1MDBBMCd9PC9pPjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgQm90dG9tQnV0dG9uID0gPGEgaHJlZj17JyMnICsgdGhpcy5pZH0gb25DbGljaz17dGhpcy5vbkJvdHRvbUNvbGxhcHNlfT57Q29sbGFwc2VJY29ufXt0aGlzLnByb3BzLmNvbGxhcHNlTGFiZWx9PC9hPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ2hpZGRlbi1jb250ZW50JywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfT5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBvbkNsaWNrPXt0aGlzLm9uRXhwYW5kQ29sbGFwc2V9IG5hbWU9e3RoaXMuaWR9PntJY29ufXt0aGlzLnN0YXRlLmxhYmVsfTwvYT5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tkaXNwbGF5OiAnbm9uZSd9fT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLmlkfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICB7Qm90dG9tQnV0dG9ufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIaWRkZW5Db250ZW50OyIsIi8qKlxyXG4gKiBKcUdyaWQgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDIvMjlcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5KcUdyaWQgb3B0aW9ucz17b3B0aW9uc30gLz5cclxuICpcclxuICoganFHcmlkIOudvOydtOu4jOufrOumrOyXkCDsooXsho3soIHsnbTri6QuXHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XHJcbi8vdmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcbi8vdmFyIFJlYWN0RG9tID0gcmVxdWlyZSgncmVhY3QtZG9tJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL1V0aWwnKTtcclxuXHJcbmZ1bmN0aW9uIGdldFVVSUQoKSB7XHJcblx0cmV0dXJuIFV0aWwuZ2V0VVVJRCgpO1xyXG59XHJcblxyXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XHJcblx0bXR5cGU6ICdQT1NUJyxcclxuXHRkYXRhdHlwZTogXCJqc29uXCIsXHJcblx0c3R5bGVVSSA6ICdCb290c3RyYXAnLFxyXG5cdGpzb25SZWFkZXI6IHtcclxuXHRcdHBhZ2U6ICdyZXN1bHRWYWx1ZS5wYWdlJyxcclxuXHRcdHRvdGFsOiAncmVzdWx0VmFsdWUudG90YWwnLFxyXG5cdFx0cm9vdDogJ3Jlc3VsdFZhbHVlLmxpc3QnLFxyXG5cdFx0cmVjb3JkczogJ3Jlc3VsdFZhbHVlLnJlY29yZHMnLFxyXG5cdFx0cmVwZWF0aXRlbXM6IGZhbHNlLFxyXG5cdFx0Ly9pZDogJ2lkJyxcclxuXHRcdGNlbGw6ICdyZXN1bHRWYWx1ZS5jZWxsJ1xyXG5cdH0sXHJcblx0Ly9jYXB0aW9uOiBcIuqzteyngOyCrO2VrSDrqqnroZ1cIixcclxuXHR2aWV3cmVjb3JkczogdHJ1ZSxcclxuXHRyZWNvcmRwb3M6ICdsZWZ0JyxcdFx0Ly8gcmVjb3JkKO2YhOyerCDsnbjrjbHsiqQvIOy0neqwnOyImCkg7JyE7LmYXHJcblx0cm93TnVtOiAyMCxcclxuXHRyb3dMaXN0OiBbMjAsIDQwLCA2MCwgODAsIDEwMF0sXHJcblx0YXV0b3dpZHRoOiB0cnVlLFxyXG5cdHNocmlua1RvRml0OiB0cnVlLFx0XHQvLyDsu6zrn7wgd2lkdGjqsIAg7J6Q64+Z7KGw7KCI7J247KeAKHRydWUpIOyngOygle2VnCDqsJLsnbjsp4AoZmFsc2UpXHJcblx0aGVpZ2h0OiAnYXV0bycsXHJcblx0Ly9ncmlkdmlldzogdHJ1ZSxcclxuXHQvL2hpZGVncmlkOiB0cnVlLFx0XHQvLyDqt7jrpqzrk5wg7KCR7Z6YL+2OvOy5qCDrsoTtirwg7Jyg66y0XHJcblx0Ly9hbHRSb3dzOiB0cnVlLFxyXG5cdC8vYXV0b2VuY29kZTogdHJ1ZSxcclxuXHRtdWx0aXNlbGVjdDogdHJ1ZSxcclxuXHRtdWx0aWJveG9ubHk6IGZhbHNlLFxyXG5cdGdyb3VwaW5nOiBmYWxzZSxcdFx0Ly8gZ3JvdXBpbmcg7ZWgIOqyveyasCBkZWZhdWx0IGdyb3VwVGV4dCDshKTsoJUgKGdyb3VwaW5nIOygnOyWtOuKlCBjdHJs7JeQ7IScIO2VnOuLpC4pXHJcblx0Z3JvdXBpbmdWaWV3OiB7XHJcbi8vICAgIFx0Z3JvdXBGaWVsZCA6IFsnaW52ZGF0ZSddLFxyXG4vLyAgICBcdGdyb3VwQ29sdW1uU2hvdyA6IFt0cnVlXSxcclxuXHRcdGdyb3VwVGV4dCA6IFsnPGI+ezB9ICh7MX0pPC9iPiddXHJcbi8vICAgIFx0Z3JvdXBDb2xsYXBzZSA6IGZhbHNlLFxyXG4vLyAgICBcdGdyb3VwT3JkZXI6IFsnZGVzYyddLFxyXG4vLyAgICBcdGdyb3VwU3VtbWFyeTogW2ZhbHNlXVxyXG5cdH1cclxufTtcclxuXHJcbnZhciBKcUdyaWQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblx0ZGlzcGxheU5hbWU6ICdKcUdyaWQnLFxyXG5cdHByb3BUeXBlczoge1xyXG5cdFx0aWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcblx0XHRwYWdlcklkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0Y2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG5cdFx0b3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcclxuXHRcdHBhZ2luZzogUHJvcFR5cGVzLmJvb2xcclxuXHR9LFxyXG5cdGlkOiBnZXRVVUlEKCksXHJcblx0cGFnZXJJZDogJycsXHJcblx0Z2V0T3B0aW9uczogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgcHJvcE9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnMsXHJcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHByb3BPcHRpb25zKTtcclxuXHJcblx0XHRpZihwcm9wT3B0aW9ucyAmJiBwcm9wT3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnZ3JvdXBpbmdWaWV3JykpIHtcclxuXHRcdFx0JC5leHRlbmQob3B0aW9uc1snZ3JvdXBpbmdWaWV3J10sIGRlZmF1bHRPcHRpb25zWydncm91cGluZ1ZpZXcnXSwgcHJvcE9wdGlvbnNbJ2dyb3VwaW5nVmlldyddKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyDtjpjsnbTsp5Ug7LKY66asXHJcblx0XHRpZih0eXBlb2YgdGhpcy5wcm9wcy5wYWdpbmcgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdG9wdGlvbnMucGFnZXIgPSAnIycgKyB0aGlzLnBhZ2VySWQ7XHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdGlmKHRoaXMucHJvcHMucGFnaW5nID09IHRydWUpIHtcclxuXHRcdFx0XHRvcHRpb25zLnBhZ2VyID0gJyMnICsgdGhpcy5wYWdlcklkO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG9wdGlvbnM7XHJcblx0fSxcclxuXHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHQkKCcjJyArIHRoaXMuaWQpLmpxR3JpZCh0aGlzLmdldE9wdGlvbnMoKSk7XHJcblxyXG5cdFx0LypcclxuXHRcdCQoZWxlbWVudCkuZmluZChcIiNldmVudHNncmlkXCIpWzBdLmFkZEpTT05EYXRhKHRoaXMucHJvcHMuZXZlbnRzTW9kZWwuYXR0cmlidXRlcyk7XHJcblx0XHQkKGVsZW1lbnQpLmZpbmQoXCIjZXZlbnRzZ3JpZFwiKS5qcUdyaWQoJ3NldFNlbGVjdGlvbicsIHRoaXMucHJvcHMuZXZlbnRNb2RlbC5hdHRyaWJ1dGVzLnRpdGxlLCBmYWxzZSk7XHJcblx0XHQqL1xyXG5cdFx0Ly8kKGVsZW1lbnQpLmZpbmQoXCIjZXZlbnRzZ3JpZFwiKS5qcUdyaWQoJ3NvcnRHcmlkJywgJ3RpdGxlJywgZmFsc2UsIGNvbnRleHQucHJvcHMuZ3JpZERhdGEub3JkZXIuc29ydG9yZGVyKTsgQm9vbCBub3QgZmlyZWQ/wr8/wr/CvyAtPiBPYnJpciBjYXMgYSB0aXJhbmQhISEhISFcclxuXHR9LFxyXG5cdGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCmOq4sCDsp4HsoIQo7ZWc67KIIO2YuOy2nClcclxuXHRcdGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcblx0XHRpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5pZCA9IGlkO1xyXG5cclxuXHRcdGxldCBwYWdlcklkID0gdGhpcy5wcm9wcy5wYWdlcklkO1xyXG5cdFx0aWYodHlwZW9mIHBhZ2VySWQgPT09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHBhZ2VySWQgPSBVdGlsLmdldFVVSUQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBhZ2VySWQgPSBwYWdlcklkO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZygnSnFHcmlkIENvbXBvbmVudCBjb21wb25lbnREaWRNb3VudCcpO1xyXG5cdFx0dGhpcy5pbml0KCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vY29uc29sZS5sb2coJ0pxR3JpZCBDb21wb25lbnQgY29tcG9uZW50V2lsbFVwZGF0ZScpO1xyXG5cdFx0Ly92YXIgZWxlbWVudCA9IHRoaXMuZmluZERPTU5vZGUoKTsvL2dldERPTU5vZGUoKTtcclxuXHRcdC8vJChlbGVtZW50KS5maW5kKFwiI2V2ZW50c2dyaWRcIikuR3JpZFVubG9hZCgpO1xyXG5cdH0sXHJcblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbihwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZygnSnFHcmlkIENvbXBvbmVudCBjb21wb25lbnREaWRVcGRhdGUnKTtcclxuXHRcdC8vdmFyIGVsZW1lbnQgPSB0aGlzLmdldERPTU5vZGUoKTtcclxuXHRcdC8vdGhpcy5pbml0KCk7XHJcblx0fSxcclxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XHJcblx0XHQvL2NvbnNvbGUubG9nKCdKcUdyaWQgQ29tcG9uZW50IGNvbXBvbmVudFdpbGxVbm1vdW50Jyk7XHJcblx0XHQvL3ZhciBlbGVtZW50ID0gdGhpcy5nZXRET01Ob2RlKCk7XHJcblx0XHQvLyQoZWxlbWVudCkuZmluZChcIiNldmVudHNncmlkXCIpLkdyaWRVbmxvYWQoKTtcclxuXHR9LFxyXG5cdHJlbmRlciA6IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly9jb25zb2xlLmxvZygnSnFHcmlkIENvbXBvbmVudCByZW5kZXInKTtcclxuXHRcdC8qXHJcblx0XHR2YXIgX3RhYmxlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBSZWFjdC5ET00udGFibGUoe3JlZjogJ2pxZ3JpZCd9KTtcclxuXHRcdH07XHJcblx0XHR2YXIgX3BhZ2VyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHtyZWY6ICdqcWdyaWRfcGFnZXInfSk7XHJcblx0XHR9O1xyXG5cdFx0Y29uc29sZS5sb2coX3RhYmxlKCkpO1xyXG5cdFx0Y29uc29sZS5sb2coX3BhZ2VyKCkpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHR7UmVhY3QuRE9NLnRhYmxlKHtyZWY6ICdqcWdyaWQnfSl9XHJcblx0XHRcdFx0e1JlYWN0LkRPTS5kaXYoe3JlZjogJ2pxZ3JpZF9wYWdlcid9KX1cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdFx0Ki9cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XHJcblx0XHRcdFx0PHRhYmxlIGlkPXt0aGlzLmlkfSAvPlxyXG5cdFx0XHRcdDxkaXYgaWQ9e3RoaXMucGFnZXJJZH0gLz5cclxuXHRcdFx0PC9kaXY+XHJcblx0XHQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEpxR3JpZDsiLCIvKipcclxuICogSnNUcmVlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzAzXHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uSnNUcmVlIG9wdGlvbnM9XCJ7b3B0aW9uc31cIiAvPlxyXG4gKlxyXG4gKiBKc1RyZWUg65287J2067iM65+s66as7JeQIOyiheyGjeyggeydtOuLpC5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxuLy92YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvVXRpbCcpO1xyXG5cclxudmFyIGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgY29yZToge1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxyXG4gICAgICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICh4aHIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIub3ZlcnJpZGVNaW1lVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKFwiYXBwbGljYXRpb24vanNvblwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbnZhciBKc1RyZWUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ0pzVHJlZScsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgfSxcclxuICAgIGlkOiAnJyxcclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICB2YXIgcHJvcE9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnMsXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIHByb3BPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYocHJvcE9wdGlvbnMgJiYgcHJvcE9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2NvcmUnKSAmJiBwcm9wT3B0aW9uc1snY29yZSddLmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcclxuICAgICAgICAgICAgLy8kLmV4dGVuZChvcHRpb25zWydjb3JlJ11bJ2RhdGEnXSwgZGVmYXVsdE9wdGlvbnNbJ2NvcmUnXVsnZGF0YSddLCBwcm9wT3B0aW9uc1snY29yZSddWydkYXRhJ10pO1xyXG4gICAgICAgICAgICBvcHRpb25zWydjb3JlJ11bJ2RhdGEnXSA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9uc1snY29yZSddWydkYXRhJ10sIHByb3BPcHRpb25zWydjb3JlJ11bJ2RhdGEnXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuXHJcbiAgICB9LFxyXG4gICAgb25TZWxlY3ROb2RlOiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uU2VsZWN0Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzZWxlY3Rfbm9kZScpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEuc2VsZWN0ZWQpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdE5vZGUoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgb25DaGFuZ2VkOiBmdW5jdGlvbihldmVudCwgZGF0YSkge1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2hhbmdlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlZChldmVudCwgZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uRGJsQ2xpY2s6IGZ1bmN0aW9uKGV2ZW50LCBkYXRhKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25EYmxDbGljayA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uRGJsQ2xpY2soZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgdHJlZSA9ICQoJyMnK3RoaXMuaWQpO1xyXG4gICAgICAgIHRyZWUuanN0cmVlKHRoaXMuZ2V0T3B0aW9ucygpKTtcclxuXHJcbiAgICAgICAgLy8gc2V0dGluZyBldmVudHNcclxuICAgICAgICB0cmVlLm9uKCdzZWxlY3Rfbm9kZS5qc3RyZWUnLCB0aGlzLm9uU2VsZWN0Tm9kZSk7XHJcbiAgICAgICAgdHJlZS5vbignY2hhbmdlZC5qc3RyZWUnLCB0aGlzLm9uQ2hhbmdlZCk7XHJcbiAgICAgICAgdHJlZS5vbignZGJsY2xpY2suanN0cmVlJywgdGhpcy5vbkRibENsaWNrKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KY6riwIOyngeyghCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IGlkPXt0aGlzLmlkfT48L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSnNUcmVlOyIsIi8qKlxyXG4gKiBNb2RhbCBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8yNVxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLk1vZGFsIHJlZj1cIm1vZGFsXCIgd2lkdGg9XCI3MDBweFwiPlxyXG4gKiAgIDxQdW0uTW9kYWxIZWFkZXI+TW9kYWwgVGl0bGU8L1B1bS5Nb2RhbEhlYWRlcj5cclxuICogICA8UHVtLk1vZGFsQm9keT5Nb2RhbCBCb2R5PC9QdW0uTW9kYWxCb2R5PlxyXG4gKiAgIDxQdW0uTW9kYWxGb290ZXI+TW9kYWwgRm9vdGVyPC9QdW0uTW9kYWxGb290ZXI+XHJcbiAqIDwvUHVtLk1vZGFsPlxyXG4gKlxyXG4gKiBib290c3RyYXAgY29tcG9uZW50XHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XHJcbnZhciBjbGFzc05hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5cclxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy91dGlsJyk7XHJcblxyXG52YXIgTW9kYWxIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ01vZGFsSGVhZGVyJyxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cIm1vZGFsXCI+PHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+JnRpbWVzOzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9XCJzci1vbmx5XCI+Q2xvc2U8L3NwYW4+PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2RhbC10aXRsZVwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgTW9kYWxCb2R5ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdNb2RhbEJvZHknLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1ib2R5XCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgTW9kYWxGb290ZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ01vZGFsRm9vdGVyJyxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtZm9vdGVyXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG52YXIgTW9kYWwgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ01vZGFsJyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICB3aWR0aDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBiYWNrZHJvcDogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25TaG93OiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICBvbkhpZGU6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIG9uSW5pdDogUHJvcFR5cGVzLmZ1bmNcclxuICAgIH0sXHJcbiAgICBpZDogJycsXHJcbiAgICBzaG93OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgYWxlcnQgPSAkKCcjJyt0aGlzLmlkKTtcclxuICAgICAgICBhbGVydC5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYodGhpcy5wcm9wcy5iYWNrZHJvcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBhbGVydC5tb2RhbCgnc2hvdycpO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQubW9kYWwoe1xyXG4gICAgICAgICAgICAgICAgYmFja2Ryb3A6ICdzdGF0aWMnLFxyXG4gICAgICAgICAgICAgICAga2V5Ym9hcmQ6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgfSxcclxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBhbGVydCA9ICQoJyMnK3RoaXMuaWQpO1xyXG4gICAgICAgIGFsZXJ0Lm1vZGFsKCdoaWRlJyk7XHJcbiAgICB9LFxyXG4gICAgb25TaG93OiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uU2hvdyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uU2hvdyhldmVudCk7XHJcbiAgICAgICAgICAgIC8vZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uSGlkZTogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkhpZGUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkhpZGUoZXZlbnQpO1xyXG4gICAgICAgICAgICAvL2V2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGNoaWxkcmVuID0gdGhpcy5wcm9wcy5jaGlsZHJlbjtcclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGNoaWxkID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge30pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtiYWNrZHJvcDogZmFsc2V9O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIHZhciBtb2RhbCA9ICQoJyMnK3RoaXMuaWQpO1xyXG4gICAgICAgIGlmKHRoaXMucHJvcHMuYmFja2Ryb3AgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIG1vZGFsLmF0dHIoJ2RhdGEtYmFja2Ryb3AnLCAnc3RhdGljJyk7XHJcbiAgICAgICAgICAgIG1vZGFsLmF0dHIoJ2RhdGEta2V5Ym9hcmQnLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbC5vbignc2hvd24uYnMubW9kYWwnLCB0aGlzLm9uU2hvdyk7XHJcbiAgICAgICAgbW9kYWwub24oJ2hpZGRlbi5icy5tb2RhbCcsIHRoaXMub25IaWRlKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0ge307XHJcbiAgICAgICAgICAgIGRhdGEuaWQgPSB0aGlzLmlkO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5pdChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgd2lkdGh9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdtb2RhbCcsICdmYWRlJywgY2xhc3NOYW1lKX0gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbGFiZWxsZWRieT1cIlwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2RhbC1kaWFsb2dcIiBzdHlsZT17e3dpZHRoOiB3aWR0aH19PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRDaGlsZHJlbigpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBNb2RhbDogTW9kYWwsXHJcbiAgICBNb2RhbEhlYWRlcjogTW9kYWxIZWFkZXIsXHJcbiAgICBNb2RhbEJvZHk6IE1vZGFsQm9keSxcclxuICAgIE1vZGFsRm9vdGVyOiBNb2RhbEZvb3RlclxyXG59OyIsIi8qKlxyXG4gKiBQYW5lbCBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8zMFxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLlBhbmVsICAvPlxyXG4gKlxyXG4gKiBib290c3RyYXAgY29tcG9uZW50XHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XHJcbnZhciBjbGFzc05hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5cclxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy91dGlsJyk7XHJcblxyXG52YXIgUGFuZWxIZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BhbmVsSGVhZGVyJyxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFuZWwtaGVhZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC10aXRsZVwiPnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBQYW5lbEJvZHkgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BhbmVsQm9keScsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhbmVsLWJvZHlcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBQYW5lbEZvb3RlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGFuZWxGb290ZXInLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYW5lbC1mb290ZXJcIj57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBQYW5lbCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGFuZWwnLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG9uSW5pdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICB9LFxyXG4gICAgaWQ6ICcnLFxyXG4gICAgZ2V0Q2hpbGRyZW46IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW47XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZihjaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHt9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcclxuXHRcdC8vIO2BtOuemOyKpOqwgCDsg53shLHrkKAg65WMIO2VnOuyiCDtmLjstpzrkJjqs6Ag7LqQ7Iuc65Cc64ukLlxyXG5cdFx0Ly8g67aA66qoIOy7tO2PrOuEjO2KuOyXkOyEnCBwcm9w7J20IOuEmOyWtOyYpOyngCDslYrsnYAg6rK97JqwIChpbiDsl7DsgrDsnpDroZwg7ZmV7J24KSDrp6TtlZHsnZgg6rCS7J20IHRoaXMucHJvcHPsl5Ag7ISk7KCV65Cc64ukLlxyXG5cdFx0cmV0dXJuIHtjbGFzc05hbWU6ICdwYW5lbC1kZWZhdWx0J307XHJcblx0fSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uSW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uSW5pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lfSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdwYW5lbCcsIGNsYXNzTmFtZSl9Pnt0aGlzLmdldENoaWxkcmVuKCl9PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFBhbmVsOiBQYW5lbCxcclxuICAgIFBhbmVsSGVhZGVyOiBQYW5lbEhlYWRlcixcclxuICAgIFBhbmVsQm9keTogUGFuZWxCb2R5LFxyXG4gICAgUGFuZWxGb290ZXI6IFBhbmVsRm9vdGVyXHJcbn07IiwiLyoqXHJcbiAqIFNlbGVjdCBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8xMlxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLlNlbGVjdCBvcHRpb25zPVwie29wdGlvbnN9XCIgLz5cclxuICpcclxuICogYm9vdHN0cmFwLXNlbGVjdCDrnbzsnbTruIzrn6zrpqzsl5Ag7KKF7IaN7KCB7J2064ukLlxyXG4gKiBodHRwczovL3NpbHZpb21vcmV0by5naXRodWIuaW8vYm9vdHN0cmFwLXNlbGVjdC9cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL1V0aWwnKTtcclxuXHJcbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcclxuICAgIC8vc2l6ZTogNFxyXG4gICAgd2lkdGg6ICcxNTBweCdcclxufTtcclxuXHJcbnZhciBTZWxlY3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1NlbGVjdCcsXHJcbiAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgb3B0aW9uczogUHJvcFR5cGVzLm9iamVjdCxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGxhYmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHZhbHVlS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGdyb3VwS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgc2VsZWN0ZWRJbmRleDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBzZWxlY3RlZFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBtdWx0aXBsZTogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIHNlbGVjdGVkSXRlbTogUHJvcFR5cGVzLm9iamVjdFxyXG4gICAgfSxcclxuICAgIGlkOiAnJyxcclxuICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBwcm9wT3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucyxcclxuICAgICAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgcHJvcE9wdGlvbnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH0sXHJcbiAgICBzZXRTdGF0ZU9iamVjdDogZnVuY3Rpb24ocHJvcHMpIHtcclxuICAgICAgICBsZXQgaXRlbXMgPSBwcm9wcy5pdGVtcztcclxuICAgICAgICBpZih0eXBlb2YgaXRlbXMgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGl0ZW1zID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgc2VsZWN0ZWRJbmRleCA9IHByb3BzLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgaWYodHlwZW9mIHNlbGVjdGVkSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUgJiYgdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGRpc2FibGVkID0gcHJvcHMuZGlzYWJsZWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGRpc2FibGVkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBkaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG11bHRpcGxlID0gcHJvcHMubXVsdGlwbGU7XHJcbiAgICAgICAgaWYodHlwZW9mIG11bHRpcGxlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBtdWx0aXBsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXRlbXM6IGl0ZW1zLFxyXG4gICAgICAgICAgICBzZWxlY3RlZEluZGV4OiBzZWxlY3RlZEluZGV4LFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXHJcbiAgICAgICAgICAgIG11bHRpcGxlOiBtdWx0aXBsZVxyXG4gICAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50LCBpbmRleCkge1xyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLnByb3BzLm9uQ2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3NlbGVjdCBvbkNoYW5nZScpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIGluZGV4KTtcclxuICAgICAgICAgICAgLy9ldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHNlbGVjdCA9ICQoJyMnK3RoaXMuaWQpO1xyXG4gICAgICAgIHNlbGVjdC5zZWxlY3RwaWNrZXIodGhpcy5nZXRPcHRpb25zKCkpO1xyXG5cclxuICAgICAgICAvLyBzZXR0aW5nIGV2ZW50c1xyXG4gICAgICAgIHNlbGVjdC5vbignY2hhbmdlZC5icy5zZWxlY3QnLCB0aGlzLm9uQ2hhbmdlKTtcclxuICAgIH0sXHJcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlT2JqZWN0KHRoaXMucHJvcHMpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc2V0U3RhdGVPYmplY3QobmV4dFByb3BzKSk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpe1xyXG4gICAgICAgIC8vIOyDiOuhnOyatCBwcm9wc+uCmCBzdGF0ZeulvCDrsJvslZjsnYQg65WMIOugjOuNlOungSDsp4HsoITsl5Ag7Zi47LacKOy1nOy0iCDroIzrjZTrp4Eg7Iuc7JeQ64qUIO2YuOy2nOuQmOyngCDslYrsnYwpXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFVwZGF0ZScpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgICAgICAvLyDsu7Ttj6zrhIztirjsnZgg7JeF642w7J207Yq46rCAIERPTeyXkCDrsJjsmIHrkJwg7KeB7ZuE7JeQIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NvbXBvbmVudERpZFVwZGF0ZScpO1xyXG4gICAgICAgIHZhciBzZWxlY3QgPSAkKCcjJyt0aGlzLmlkKTtcclxuICAgICAgICBzZWxlY3Quc2VsZWN0cGlja2VyKCdyZWZyZXNoJyk7XHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgbGV0IGl0ZW1zID0gW10sIGxhYmVsS2V5ID0gdGhpcy5wcm9wcy5sYWJlbEtleSwgdmFsdWVLZXkgPSB0aGlzLnByb3BzLnZhbHVlS2V5O1xyXG4gICAgICAgICQuZWFjaCh0aGlzLnN0YXRlLml0ZW1zLCBmdW5jdGlvbihpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICAvL2l0ZW1zLnB1c2goUmVhY3QuY3JlYXRlRWxlbWVudCgnb3B0aW9uJywge3ZhbHVlOiBpdGVtW3ZhbHVlS2V5XX0sIGl0ZW1bbGFiZWxLZXldKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2goPG9wdGlvbiB2YWx1ZT17aXRlbVt2YWx1ZUtleV19PntpdGVtW2xhYmVsS2V5XX08L29wdGlvbj4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHsvKlxyXG4gICAgICAgIGxldCBsYWJlbEtleSA9IHRoaXMucHJvcHMubGFiZWxLZXksIHZhbHVlS2V5ID0gdGhpcy5wcm9wcy52YWx1ZUtleTtcclxuICAgICAgICBsZXQgaXRlbXMgPSBSZWFjdC5DaGlsZHJlbi5tYXAodGhpcy5zdGF0ZS5pdGVtcywgKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50ICgnb3B0aW9uJywge3ZhbHVlOiBpdGVtW3ZhbHVlS2V5XX0sIGl0ZW1bbGFiZWxLZXldKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAqL31cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnc2VsZWN0cGlja2VyJywgdGhpcy5wcm9wcy5jbGFzc05hbWUpfSBpZD17dGhpcy5pZH0gbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSBtdWx0aXBsZT17dGhpcy5zdGF0ZS5tdWx0aXBsZX0+XHJcbiAgICAgICAgICAgICAgICB7UmVhY3QuQ2hpbGRyZW4udG9BcnJheShpdGVtcyl9XHJcbiAgICAgICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7IiwiLyoqXHJcbiAqIFNwbGl0dGVyIGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzA0LzA1XHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uU3BsaXR0ZXIgLz5cclxuICpcclxuICogalF1ZXJ5IFNwbGl0dGVyIFBsdWdpbiDrnbzsnbTruIzrn6zrpqzsl5Ag7KKF7IaN7KCB7J2064ukLlxyXG4gKiBodHRwOi8vbWV0aHZpbi5jb20vc3BsaXR0ZXIvXHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XHJcbnZhciBjbGFzc05hbWVzID0gcmVxdWlyZSgnY2xhc3NuYW1lcycpO1xyXG5cclxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy91dGlsJyk7XHJcblxyXG52YXIgU3BsaXR0ZXJQYW5lID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdTcGxpdHRlclBhbmUnLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG1pbldpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIG1pbkhlaWdodDogUHJvcFR5cGVzLm51bWJlclxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtpZCwgY2xhc3NOYW1lLCBtaW5XaWR0aCwgbWluSGVpZ2h0fSA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9e2lkfSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3NwbGl0dGVyLXBhbmUnLCBjbGFzc05hbWUpfSBzdHlsZT17e21pbldpZHRoOiBtaW5XaWR0aCwgbWluSGVpZ2h0OiBtaW5IZWlnaHR9fT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbnZhciBTcGxpdHRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnU3BsaXR0ZXInLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG9wdGlvbnM6IFByb3BUeXBlcy5vYmplY3QsXHJcbiAgICAgICAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWluV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWluSGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIHNpemVMZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIHNpemVSaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBzaXplVG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIHNpemVCb3R0b206IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWluTGVmdDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBtaW5SaWdodDogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBtaW5Ub3A6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWluQm90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIG1heExlZnQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWF4UmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgbWF4VG9wOiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIG1heEJvdHRvbTogUHJvcFR5cGVzLm51bWJlcixcclxuICAgICAgICBhbmNob3JUb1dpbmRvdzogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgb25Jbml0OiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgfSxcclxuICAgIGlkOiAnJyxcclxuICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLnByb3BzLmNoaWxkcmVuLFxyXG4gICAgICAgICAgICBjb3VudCA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICBpZihjaGlsZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBleHRyYUNoaWxkUHJvcHMgPSB7fTtcclxuICAgICAgICAgICAgaWYoY291bnQrKyA8IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmKGNoaWxkLnByb3BzLnR5cGUgPT09ICdoJyB8fCBjaGlsZC5wcm9wcy50eXBlID09PSAndicpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkSWQgPSBVdGlsLmdldFVVSUQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkUHJvcHMgPSBjaGlsZC5wcm9wcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoaWxkT3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucyhjaGlsZC5wcm9wcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGV4dHJhQ2hpbGRQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuY2hpbGRJZFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCBleHRyYUNoaWxkUHJvcHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0T3B0aW9uczogZnVuY3Rpb24ocHJvcHMpIHtcclxuXHJcbiAgICAgICAgY29uc3Qge3R5cGUsIHNpemVMZWZ0LCBzaXplUmlnaHQsIHNpemVUb3AsIHNpemVCb3R0b20sIG1pbkxlZnQsIG1pblJpZ2h0LCBtaW5Ub3AsIG1pbkJvdHRvbSwgbWF4TGVmdCwgbWF4UmlnaHQsIG1heFRvcCwgbWF4Qm90dG9tLCBhbmNob3JUb1dpbmRvd30gPSBwcm9wcztcclxuXHJcbiAgICAgICAgLy8gb3B0aW9ucyAoZ2V0RGVmYXVsdFByb3BzIOyXkOyEnCDstIjquLDtmZQsIGNoaWxkT3B0aW9ucyDsnbgg6rK97Jqw64qUIOy0iOq4sO2ZlCDslYjrkJjslrQg7J6I7J2MKVxyXG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHByb3BzLm9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8ge30gOiBwcm9wcy5vcHRpb25zO1xyXG5cclxuICAgICAgICAvLyB0eXBlXHJcbiAgICAgICAgaWYodHlwZSA9PT0gJ3YnIHx8IHR5cGUgPT09ICdoJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgb3B0aW9ucy50eXBlID0gJ3YnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcGFuZSBzaXplXHJcbiAgICAgICAgaWYodHlwZW9mIHNpemVMZWZ0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnNpemVMZWZ0ID0gc2l6ZUxlZnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2Ygc2l6ZVJpZ2h0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnNpemVSaWdodCA9IHNpemVSaWdodDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBzaXplVG9wID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLnNpemVUb3AgPSBzaXplVG9wO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHNpemVCb3R0b20gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuc2l6ZUJvdHRvbSA9IHNpemVCb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwYW5lIG1pblxyXG4gICAgICAgIGlmKHR5cGVvZiBtaW5MZWZ0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1pbkxlZnQgPSBtaW5MZWZ0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIG1pblJpZ2h0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1pblJpZ2h0ID0gbWluUmlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YgbWluVG9wID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1pblRvcCA9IG1pblRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBtaW5Cb3R0b20gPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubWluQm90dG9tID0gbWluQm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcGFuZSBtYXhcclxuICAgICAgICBpZih0eXBlb2YgbWF4TGVmdCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXhMZWZ0ID0gbWF4TGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBtYXhSaWdodCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXhSaWdodCA9IG1heFJpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodHlwZW9mIG1heFRvcCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5tYXhUb3AgPSBtYXhUb3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0eXBlb2YgbWF4Qm90dG9tID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvcHRpb25zLm1heEJvdHRvbSA9IG1heEJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFuY2hvclRvV2luZG93XHJcbiAgICAgICAgaWYodHlwZW9mIGFuY2hvclRvV2luZG93ID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5hbmNob3JUb1dpbmRvdyA9IGFuY2hvclRvV2luZG93O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9vcHRpb25zLnJlc2l6ZVRvV2lkdGggPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gb3B0aW9ucztcclxuXHJcbiAgICB9LFxyXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDtgbTrnpjsiqTqsIAg7IOd7ISx65CgIOuVjCDtlZzrsogg7Zi47Lac65CY6rOgIOy6kOyLnOuQnOuLpC5cclxuXHRcdC8vIOu2gOuqqCDsu7Ttj6zrhIztirjsl5DshJwgcHJvcOydtCDrhJjslrTsmKTsp4Ag7JWK7J2AIOqyveyasCAoaW4g7Jew7IKw7J6Q66GcIO2ZleyduCkg66ek7ZWR7J2YIOqwkuydtCB0aGlzLnByb3Bz7JeQIOyEpOygleuQnOuLpC5cclxuXHRcdHJldHVybiB7b3B0aW9uczoge30sIHR5cGU6ICd2J307XHJcblx0fSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5wcm9wcy5pZDtcclxuICAgICAgICBpZih0eXBlb2YgaWQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIHZhciBzcCA9ICQoJyMnK3RoaXMuaWQpLCBwcm9wcyA9IHRoaXMucHJvcHM7XHJcblxyXG4gICAgICAgIC8vIG1pbi13aWR0aCwgbWluLWhlaWdodCDshKTsoJUoc3BsaXR0ZXIoKSDtmLjstpzsoITsl5Ag7ISk7KCV7ZW07JW8IOyggeyaqeydtCDrkJzri6QuKVxyXG4gICAgICAgIC8vIDMtQ29sdW1uIOydvCDqsr3smrAg67CY65Oc7IucIG1pbkhlaWdodCDshKTsoJVcclxuICAgICAgICBpZih0eXBlb2YgcHJvcHMubWluV2lkdGggPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHNwLmNzcygnbWluLXdpZHRoJywgcHJvcHMubWluV2lkdGggKyAncHgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiBwcm9wcy5taW5IZWlnaHQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHNwLmNzcygnbWluLWhlaWdodCcsIHByb3BzLm1pbkhlaWdodCArICdweCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSG9yaXpvbnRhbCDsnbgg6rK97JqwIHNwbGl0dGVyIO2YuOy2nOyghCBoZWlnaHQg7ISk7KCVIOuQmOyWtOyVvCDtlahcclxuICAgICAgICB2YXIgc3BIZWlnaHQ7XHJcbiAgICAgICAgaWYocHJvcHMudHlwZSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBwcm9wcy5oZWlnaHQgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBzcEhlaWdodCA9IHByb3BzLmhlaWdodDtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3BIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNwLmNzcygnaGVpZ2h0Jywgc3BIZWlnaHQgKyAncHgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNwbGl0dGVyXHJcbiAgICAgICAgc3Auc3BsaXR0ZXIodGhpcy5nZXRPcHRpb25zKHByb3BzKSk7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZiB0aGlzLmNoaWxkSWQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciBzcENoaWxkID0gJCgnIycrdGhpcy5jaGlsZElkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEhvcml6b250YWwg7J24IOqyveyasCBzcGxpdHRlciDtmLjstpzsoIQgaGVpZ2h0IOyEpOyglSDrkJjslrTslbwg7ZWoXHJcbiAgICAgICAgICAgIHZhciBzcENoaWxkSGVpZ2h0O1xyXG4gICAgICAgICAgICBpZih0aGlzLmNoaWxkUHJvcHMudHlwZSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5jaGlsZFByb3BzLmhlaWdodCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcENoaWxkSGVpZ2h0ID0gdGhpcy5jaGlsZFByb3BzLmhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzcENoaWxkSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNwLmhlaWdodCgpKTtcclxuICAgICAgICAgICAgICAgIHNwQ2hpbGQuY3NzKCdoZWlnaHQnLCBzcC5oZWlnaHQoKSArICdweCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzcENoaWxkLnNwbGl0dGVyKHRoaXMuY2hpbGRPcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdyByZXNpemVcclxuICAgICAgICB2YXIgaGVpZ2h0LCBwYW5lSGVpZ2h0O1xyXG4gICAgICAgICQod2luZG93KS5iaW5kKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYodHlwZW9mIHByb3BzLmhlaWdodCA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IHByb3BzLmhlaWdodDtcclxuICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzcC5jc3MoJ2hlaWdodCcsIGhlaWdodCArICdweCcpO1xyXG5cclxuICAgICAgICAgICAgaWYocHJvcHMudHlwZSA9PT0gJ3YnKSB7XHJcbiAgICAgICAgICAgICAgICBwYW5lSGVpZ2h0ID0gc3AuaGVpZ2h0KCk7XHJcbiAgICAgICAgICAgICAgICBzcC5maW5kKCcuc3BsaXR0ZXItcGFuZScpLmNzcygnaGVpZ2h0JywgcGFuZUhlaWdodCArICdweCcpO1xyXG4gICAgICAgICAgICAgICAgc3AuZmluZCgnLnZzcGxpdGJhcicpLmNzcygnaGVpZ2h0JywgcGFuZUhlaWdodCArICdweCcpO1xyXG5cclxuICAgICAgICAgICAgfWVsc2UgaWYocHJvcHMudHlwZSA9PT0gJ2gnKSB7XHJcbiAgICAgICAgICAgICAgICBzcC5maW5kKCcuaHNwbGl0YmFyJykuY3NzKCd3aWR0aCcsIHNwLndpZHRoKCkgKyAncHgnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KS50cmlnZ2VyKCdyZXNpemUnKTtcclxuXHJcbiAgICAgICAgLy8kKFwiI015U3BsaXR0ZXJcIikuY3NzKCdoZWlnaHQnLCBoZWlnaHQgKyAncHgnKS50cmlnZ2VyKCdyZXNpemUnKTtcclxuXHJcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25Jbml0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Jbml0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7ZWE7IiYIO2VreuqqVxyXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWV9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBpZD17dGhpcy5pZH0gY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdzcGxpdHRlcicsIGNsYXNzTmFtZSl9Pnt0aGlzLmdldENoaWxkcmVuKCl9PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIFNwbGl0dGVyOiBTcGxpdHRlcixcclxuICAgIFNwbGl0dGVyUGFuZTogU3BsaXR0ZXJQYW5lXHJcbn07IiwiLyoqXG4gKiBTdGVwcGVyIGNvbXBvbmVudFxuICpcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMTlcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XG4gKlxuICogZXhhbXBsZTpcbiAqIDxQdW0uU3RlcHBlciBuYW1lPVwibmFtZTFcIiB2YWx1ZT17MTB9IG1pbj17MH0gbWF4PXsxMDB9IHN0ZXA9ezV9IC8+XG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUHJvcFR5cGVzID0gcmVxdWlyZSgncmVhY3QnKS5Qcm9wVHlwZXM7XG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcblxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy91dGlsJyk7XG5cbnZhciBTdGVwcGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnU3RlcHBlcicsXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIHZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLCAgICAgICAgLy8gZGVmYXVsdFZhbHVlIOyCrOyaqe2VtOyEnCDtlZjripQg67Cp67KVIOyDneqwge2VtCDrs7TsnpBcbiAgICAgICAgZGlyZWN0aW9uOiBQcm9wVHlwZXMuc3RyaW5nLCAgICAvLyBob3Jpem9udGFsL3ZlcnRpY2FsIChkZWZhdWx0OiB2ZXJ0aWNhbClcbiAgICAgICAgbWluOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBtYXg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHN0ZXA6IFByb3BUeXBlcy5udW1iZXIsICAgICAgICAgLy8gZGVmYXVsdCAxXG4gICAgICAgIHdpZHRoOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuY1xuICAgIH0sXG4gICAgaWQ6ICcnLFxuICAgIF9zdGVwOiAxLFxuICAgIF9kaXJlY3Rpb246ICdpbnB1dC1ncm91cC1idG4tdmVydGljYWwnLFxuICAgIG9uQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBpbnB1dCDsp4HsoJHsnoXroKXsi5xcbiAgICAgICAgLy9jb25zb2xlLmxvZyhldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICBsZXQgdmFsdWUgPSBOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgaWYoIWlzTmFOKHZhbHVlKSkge1xuICAgICAgICAgICAgaWYoISh0aGlzLmlzT3Zlck1pbih2YWx1ZSkgfHwgdGhpcy5pc092ZXJNYXgodmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIHZhbHVlLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG9uSW5jcmVtZW50OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZhbHVlQ2xpY2soZXZlbnQsIHRoaXMuX3N0ZXApO1xuICAgIH0sXG4gICAgb25EZWNyZW1lbnQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudXBkYXRlVmFsdWVDbGljayhldmVudCwgdGhpcy5fc3RlcCAqIC0xKTtcbiAgICB9LFxuICAgIGlzT3Zlck1heDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgbGV0IGIgPSBmYWxzZTtcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMubWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYodmFsdWUgPiB0aGlzLnByb3BzLm1heCkge1xuICAgICAgICAgICAgICAgIGIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiO1xuICAgIH0sXG4gICAgaXNPdmVyTWluOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBsZXQgYiA9IGZhbHNlO1xuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5taW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZih2YWx1ZSA8IHRoaXMucHJvcHMubWluKSB7XG4gICAgICAgICAgICAgICAgYiA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGI7XG4gICAgfSxcbiAgICB1cGRhdGVWYWx1ZUNsaWNrOiBmdW5jdGlvbihldmVudCwgc3RlcCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnN0YXRlLnZhbHVlICsgc3RlcDtcbiAgICAgICAgaWYodGhpcy5pc092ZXJNaW4odmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtkb3duRGlzYWJsZWQ6IHRydWV9KTtcbiAgICAgICAgfWVsc2UgaWYodGhpcy5pc092ZXJNYXgodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt1cERpc2FibGVkOiB0cnVlfSk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsdWUoZXZlbnQsIHZhbHVlLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCB2YWx1ZSwgaXNDbGljaykge1xuICAgICAgICBpZihpc0NsaWNrKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHt2YWx1ZTogdmFsdWUsIHVwRGlzYWJsZWQ6IGZhbHNlLCBkb3duRGlzYWJsZWQ6IGZhbHNlfSk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3ZhbHVlOiB2YWx1ZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMub25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UoZXZlbnQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0U3RhdGVPYmplY3Q6IGZ1bmN0aW9uKHByb3BzKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IHByb3BzLnZhbHVlO1xuICAgICAgICBpZih0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGlzYWJsZWQgPSBwcm9wcy5kaXNhYmxlZCxcbiAgICAgICAgICAgIHVwRGlzYWJsZWQsIGRvd25EaXNhYmxlZDtcbiAgICAgICAgaWYodHlwZW9mIGRpc2FibGVkID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZGlzYWJsZWQgPSB1cERpc2FibGVkID0gZG93bkRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHVwRGlzYWJsZWQgPSBkb3duRGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWQsXG4gICAgICAgICAgICB1cERpc2FibGVkOiB1cERpc2FibGVkLFxuICAgICAgICAgICAgZG93bkRpc2FibGVkOiBkb3duRGlzYWJsZWRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlT2JqZWN0KHRoaXMucHJvcHMpO1xuICAgIH0sXG4gICAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XG4gICAgICAgIGlmKHR5cGVvZiBpZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlkID0gVXRpbC5nZXRVVUlEKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuXG4gICAgICAgIC8vIHN0ZXBcbiAgICAgICAgaWYodHlwZW9mIHRoaXMucHJvcHMuc3RlcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB0aGlzLnByb3BzLnN0ZXA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkaXJlY3Rpb25cbiAgICAgICAgbGV0IGRpcmVjdGlvbiA9IHRoaXMucHJvcHMuZGlyZWN0aW9uO1xuICAgICAgICBpZihkaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXJlY3Rpb24gPSBcImlucHV0LWdyb3VwLWJ0bi1ob3Jpem9udGFsXCI7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IFwiaW5wdXQtZ3JvdXAtYnRuLXZlcnRpY2FsXCI7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpwg64uk7J2MKO2VnOuyiCDtmLjstpwpXG4gICAgfSxcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcbiAgICAgICAgLy8g7Lu07Y+s64SM7Yq46rCAIOyDiOuhnOyatCBwcm9wc+ulvCDrsJvsnYQg65WMIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc2V0U3RhdGVPYmplY3QobmV4dFByb3BzKSk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXG4gICAgICAgIGNvbnN0IHtjbGFzc05hbWUsIG5hbWUsIHdpZHRofSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdpbnB1dC1ncm91cCcsICdzdGVwcGVyJywgY2xhc3NOYW1lKX0gc3R5bGU9e3t3aWR0aDogd2lkdGh9fT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPXtuYW1lfSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMub25DaGFuZ2V9IHN0eWxlPXt7d2lkdGg6ICdpbmhlcml0J319IGRpc2FibGVkPXt0aGlzLnN0YXRlLmRpc2FibGVkfSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHRoaXMuX2RpcmVjdGlvbil9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMub25JbmNyZW1lbnR9IGRpc2FibGVkPXt0aGlzLnN0YXRlLnVwRGlzYWJsZWR9PjxpIGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LXVwXCI+PC9pPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdFwiIG9uQ2xpY2s9e3RoaXMub25EZWNyZW1lbnR9IGRpc2FibGVkPXt0aGlzLnN0YXRlLmRvd25EaXNhYmxlZH0+PGkgY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93blwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0ZXBwZXI7IiwiLyoqXHJcbiAqIFRhZ3NJbnB1dCBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wNC8xNFxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLlRhZ3NJbnB1dCBvcHRpb25zPXtvcHRpb25zfSAvPlxyXG4gKlxyXG4gKiBUYWdzSW5wdXQg65287J2067iM65+s66as7JeQIOyiheyGjeyggeydtOuLpC5cclxuICogaHR0cHM6Ly9ib290c3RyYXAtdGFnc2lucHV0LmdpdGh1Yi5pby9ib290c3RyYXAtdGFnc2lucHV0L2V4YW1wbGVzL1xyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxudmFyIFByb3BUeXBlcyA9IHJlcXVpcmUoJ3JlYWN0JykuUHJvcFR5cGVzO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vc2VydmljZXMvdXRpbCcpO1xyXG5cclxudmFyIFRhZ3NJbnB1dCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnVGFnc0lucHV0JyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBvcHRpb25zOiBQcm9wVHlwZXMub2JqZWN0LFxyXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheSxcclxuICAgICAgICBzZWxlY3RlZEluZGV4OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBvbkluaXQ6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuXHRcdGNhdGVnb3J5OiBQcm9wVHlwZXMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXHJcblx0XHQvL2RpYWxvZzogUHJvcFR5cGVzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkLFxyXG5cdFx0dmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMuYm9vbFxyXG4gICAgICAgIF0pXHJcbiAgICB9LFxyXG4gICAgaWQ6ICcnLFxyXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDtgbTrnpjsiqTqsIAg7IOd7ISx65CgIOuVjCDtlZzrsogg7Zi47Lac65CY6rOgIOy6kOyLnOuQnOuLpC5cclxuXHRcdC8vIOu2gOuqqCDsu7Ttj6zrhIztirjsl5DshJwgcHJvcOydtCDrhJjslrTsmKTsp4Ag7JWK7J2AIOqyveyasCAoaW4g7Jew7IKw7J6Q66GcIO2ZleyduCkg66ek7ZWR7J2YIOqwkuydtCB0aGlzLnByb3Bz7JeQIOyEpOygleuQnOuLpC5cclxuXHRcdGNvbnNvbGUubG9nKCcxLiBnZXREZWZhdWx0UHJvcHMnKTtcclxuXHRcdHJldHVybiB7dmFsdWU6ICdkZWZhdWx0IHZhbHVlJ307XHJcblx0fSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHQvLyDsu7Ttj6zrhIztirjqsIAg66eI7Jq07Yq465CY6riwIOyghCAo7ZWc67KIIO2YuOy2nCkgLyDrpqzthLTqsJLsnYAgdGhpcy5zdGF0ZeydmCDstIjquLDqsJLsnLzroZwg7IKs7JqpXHJcbiAgICAgICAgY29uc29sZS5sb2coJzIuIGdldEluaXRpYWxTdGF0ZScpO1xyXG4gICAgICAgIHJldHVybiB7ZGF0YTogW119O1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8g7LWc7LSIIOugjOuNlOungeydtCDsnbzslrTrgpjquLAg7KeB7KCEKO2VnOuyiCDtmLjstpwpXHJcbiAgICAgICAgY29uc29sZS5sb2coJzMuIGNvbXBvbmVudFdpbGxNb3VudCcpO1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMucHJvcHMuaWQ7XHJcbiAgICAgICAgaWYodHlwZW9mIGlkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBpZCA9IFV0aWwuZ2V0VVVJRCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDstZzstIgg66CM642U66eB7J20IOydvOyWtOuCnCDri6TsnYwo7ZWc67KIIO2YuOy2nClcclxuICAgICAgICBjb25zb2xlLmxvZygnNS4gY29tcG9uZW50RGlkTW91bnQnKTtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkluaXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgZGF0YS5rZXkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkluaXQoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xyXG4gICAgICAgIC8vIOy7tO2PrOuEjO2KuOqwgCDsg4jroZzsmrQgcHJvcHPrpbwg67Cb7J2EIOuVjCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcycpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XHJcbiAgICAgICAgLy8g7IOI66Gc7Jq0IHByb3Bz64KYIHN0YXRl66W8IOuwm+yVmOydhCDrlYwg66CM642U66eBIOyngeyghOyXkCDtmLjstpwo7LWc7LSIIOugjOuNlOungSDsi5zsl5DripQg7Zi47Lac65CY7KeAIOyViuydjClcclxuICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFVwZGF0ZScpO1xyXG4gICAgfSxcclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24ocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcclxuICAgICAgICAvLyDsu7Ttj6zrhIztirjsnZgg7JeF642w7J207Yq46rCAIERPTeyXkCDrsJjsmIHrkJwg7KeB7ZuE7JeQIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjb21wb25lbnREaWRVcGRhdGUnKTtcclxuICAgIH0sXHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyDsu7Ttj6zrhIztirjqsIAgRE9N7JeQ7IScIOuniOyatO2KuCDtlbTsoJwg65CY6riwIOyngeyghOyXkCDtmLjstpxcclxuICAgICAgICBjb25zb2xlLmxvZygnY29tcG9uZW50V2lsbFVubW91bnQnKTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICBjb25zb2xlLmxvZygnNC4gcmVuZGVyJyk7XHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZX0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGlkPXt0aGlzLmlkfSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ3BhbmVsJywgY2xhc3NOYW1lKX0+PC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhZ3NJbnB1dDsiLCIvKipcclxuICogUmFkaW8gY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMTdcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5SYWRpbyBvcHRpb25zPVwie29wdGlvbnN9XCIgLz5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBSYWRpbyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUmFkaW8nLFxyXG4gICAgcHJvcFR5cGVzOiB7XHJcbiAgICAgICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgc2VsZWN0ZWRWYWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIF0pLFxyXG4gICAgICAgIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcclxuICAgICAgICB2YWx1ZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIF0pXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgY29uc3Qge2NsYXNzTmFtZSwgbmFtZSwgc2VsZWN0ZWRWYWx1ZSwgb25DaGFuZ2UsIHZhbHVlfSA9IHRoaXMucHJvcHM7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uYWwgPSB7fTtcclxuICAgICAgICBpZihzZWxlY3RlZFZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgb3B0aW9uYWwuY2hlY2tlZCA9ICh0aGlzLnByb3BzLnZhbHVlID09PSBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZih0eXBlb2Ygb25DaGFuZ2UgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgb3B0aW9uYWwub25DaGFuZ2UgPSBvbkNoYW5nZS5iaW5kKG51bGwsIHRoaXMucHJvcHMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAqL1xyXG4gICAgICAgIG9wdGlvbmFsLm9uQ2hhbmdlID0gb25DaGFuZ2UuYmluZChudWxsLCB0aGlzLnByb3BzLnZhbHVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyYWRpb1wiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwicmFkaW9cIiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gbmFtZT17bmFtZX0gdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub3B0aW9uYWx9IC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibGJsXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFJhZGlvOyIsIi8qKlxyXG4gKiBSYWRpb0dyb3VwIGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzE3XHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uUmFkaW9Hcm91cCBvcHRpb25zPVwie29wdGlvbnN9XCIgLz5cclxuICpcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlc30gZnJvbSAncmVhY3QnO1xyXG52YXIgY2xhc3NOYW1lcyA9IHJlcXVpcmUoJ2NsYXNzbmFtZXMnKTtcclxuXHJcbnZhciBSYWRpb0dyb3VwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgZGlzcGxheU5hbWU6ICdSYWRpb0dyb3VwJyxcclxuICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICBuYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgIHNlbGVjdGVkVmFsdWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBQcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICBdKSxcclxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgICAgICAgaG9yaXpvbnRhbDogUHJvcFR5cGVzLmJvb2xcclxuICAgIH0sXHJcbiAgICBvbkNoYW5nZTogZnVuY3Rpb24odmFsdWUsIGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7c2VsZWN0ZWRWYWx1ZTogdmFsdWV9KTtcclxuICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vbkNoYW5nZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50LCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldENoaWxkcmVuOiBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCB7Y2xhc3NOYW1lLCBuYW1lLCBjaGlsZHJlbn0gPSB0aGlzLnByb3BzLFxyXG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlID0gdGhpcy5zdGF0ZS5zZWxlY3RlZFZhbHVlLFxyXG4gICAgICAgICAgICBvbkNoYW5nZSA9IHRoaXMub25DaGFuZ2U7XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChyYWRpbykgPT4ge1xyXG4gICAgICAgICAgICBpZihyYWRpbyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQocmFkaW8sIHtcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlLFxyXG4gICAgICAgICAgICAgICAgb25DaGFuZ2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgc2V0U3RhdGVPYmplY3Q6IGZ1bmN0aW9uKHByb3BzKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkVmFsdWUgPSBwcm9wcy5zZWxlY3RlZFZhbHVlO1xyXG4gICAgICAgIGlmKHR5cGVvZiBzZWxlY3RlZFZhbHVlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkVmFsdWU6IHNlbGVjdGVkVmFsdWVcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGVPYmplY3QodGhpcy5wcm9wcyk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NvbXBvbmVudERpZE1vdW50Jyk7XHJcbiAgICB9LFxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XHJcbiAgICAgICAgLy8g7Lu07Y+s64SM7Yq46rCAIOyDiOuhnOyatCBwcm9wc+ulvCDrsJvsnYQg65WMIO2YuOy2nCjstZzstIgg66CM642U66eBIOyLnOyXkOuKlCDtmLjstpzrkJjsp4Ag7JWK7J2MKVxyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zZXRTdGF0ZU9iamVjdChuZXh0UHJvcHMpKTtcclxuICAgIH0sXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7J3JhZGlvLWhvcml6b250YWwnOiB0aGlzLnByb3BzLmhvcml6b250YWx9KX0+XHJcbiAgICAgICAgICAgICAgICB7dGhpcy5nZXRDaGlsZHJlbigpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUmFkaW9Hcm91cDsiLCIvKipcclxuICogVGFiIGNvbXBvbmVudFxyXG4gKlxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzA4XHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqXHJcbiAqIGV4YW1wbGU6XHJcbiAqIDxQdW0uVGFiIC8+XHJcbiAqXHJcbiAqIEJvb3RzdHJhcCBDU1NcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVGFiID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnVGFiJyxcclxuICAgICAgICBwcm9wVHlwZXM6IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgICAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2xcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIO2VhOyImCDtla3rqqlcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe2FjdGl2ZTogdGhpcy5wcm9wcy5zZWxlY3RlZH0sIHtkaXNhYmxlZDogdGhpcy5wcm9wcy5kaXNhYmxlZH0pfT5cclxuICAgICAgICAgICAgICAgICAgICA8YSByb2xlPVwidGFiXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9hPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWI7IiwiLyoqXHJcbiAqIFRhYkNvbnRlbnQgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMDhcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5UYWJDb250ZW50IC8+XHJcbiAqXHJcbiAqIEJvb3RzdHJhcCBDU1NcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxudmFyIGNsYXNzTmFtZXMgPSByZXF1aXJlKCdjbGFzc25hbWVzJyk7XHJcblxyXG52YXIgVGFiQ29udGVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgICAgICBkaXNwbGF5TmFtZTogJ1RhYkNvbnRlbnQnLFxyXG4gICAgICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgICAgICBzZWxlY3RlZDogUHJvcFR5cGVzLmJvb2xcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIO+/vcq877+9IO+/vde477+9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcygndGFiLXBhbmUnLCB7YWN0aXZlOiB0aGlzLnByb3BzLnNlbGVjdGVkfSl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVGFiQ29udGVudDsiLCIvKipcclxuICogVGFiQ29udGVudHMgY29tcG9uZW50XHJcbiAqXHJcbiAqIHZlcnNpb24gPHR0PiQgVmVyc2lvbjogMS4wICQ8L3R0PiBkYXRlOjIwMTYvMDMvMDhcclxuICogYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86aHJhaG5AbmtpYS5jby5rclwiPkFobiBIeXVuZy1SbzwvYT5cclxuICpcclxuICogZXhhbXBsZTpcclxuICogPFB1bS5UYWJDb250ZW50cyAvPlxyXG4gKlxyXG4gKiBCb290c3RyYXAgQ1NTXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xyXG5cclxudmFyIFRhYkNvbnRlbnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xyXG4gICAgICAgIGRpc3BsYXlOYW1lOiAnVGFiQ29udGVudHMnLFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIO+/vcq877+9IO+/vde477+9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRhYi1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJDb250ZW50czsiLCIvKipcclxuICogVGFicyBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8wOFxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLlRhYlNldCBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc2VsZWN0ZWRJbmRleD17MH0gb25TZWxlY3Q9e2Z1bmN9IC8+XHJcbiAqXHJcbiAqIEJvb3RzdHJhcCBDU1NcclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XHJcbnZhciBQcm9wVHlwZXMgPSByZXF1aXJlKCdyZWFjdCcpLlByb3BUeXBlcztcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvVXRpbCcpO1xyXG5cclxuZnVuY3Rpb24gZ2V0VVVJRCgpIHtcclxuICAgIHJldHVybiBVdGlsLmdldFVVSUQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNUYWJOb2RlKG5vZGUpIHtcclxuICAgIHJldHVybiBub2RlLm5vZGVOYW1lID09PSAnQScgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3RhYic7XHJcbn1cclxuXHJcbnZhciBUYWJTZXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6ICdUYWJTZXQnLFxyXG4gICAgICAgIHByb3BUeXBlczoge1xyXG4gICAgICAgICAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHNlbGVjdGVkSW5kZXg6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuY1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaWQ6IGdldFVVSUQoKSxcclxuICAgICAgICBnZXRUYWJzQ291bnQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbiAmJiB0aGlzLnByb3BzLmNoaWxkcmVuWzBdID9cclxuICAgICAgICAgICAgICAgIFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW5bMF0ucHJvcHMuY2hpbGRyZW4pIDpcclxuICAgICAgICAgICAgICAgIDA7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRDaGlsZHJlbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJvcHMuY2hpbGRyZW4sXHJcbiAgICAgICAgICAgICAgICBjb3VudCA9IDAsIGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYoY2hpbGQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gVGFic1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQrKyA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkLnByb3BzLmNoaWxkcmVuLCAodGFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YWIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWQgPSB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXggPT09IGluZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRhYiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgIH1lbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUYWJDb250ZW50c1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkLnByb3BzLmNoaWxkcmVuLCAodGFiQ29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4ID09PSBpbmRleDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KHRhYkNvbnRlbnQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9uU2VsZWN0VGFiOiBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgICAgICAgaWYoaXNUYWJOb2RlKG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdWwgPSBub2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZSxcclxuICAgICAgICAgICAgICAgICAgICBsaSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IFtdLnNsaWNlLmNhbGwodWwuY2hpbGRyZW4pLmluZGV4T2YobGkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U2VsZWN0ZWRJbmRleChpbmRleCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldFNlbGVjdGVkSW5kZXgoaW5kZXgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4KSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5nZXRUYWJzQ291bnQoKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgbGV0IHByZXZJbmRleCA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe3NlbGVjdGVkSW5kZXg6IGluZGV4fSk7XHJcblxyXG4gICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5wcm9wcy5vblNlbGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChpbmRleCwgcHJldkluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkSW5kZXggPSB0aGlzLnByb3BzLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBzZWxlY3RlZEluZGV4ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5zdGF0ZSAmJiB0aGlzLnN0YXRlLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7c2VsZWN0ZWRJbmRleDogc2VsZWN0ZWRJbmRleH07XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIOy1nOy0iCDroIzrjZTrp4HsnbQg7J287Ja064KcIOuLpOydjCjtlZzrsogg7Zi47LacKVxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdUYWJTZXQgQ29tcG9uZW50IGNvbXBvbmVudERpZE1vdW50Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyDtlYTsiJgg7ZWt66qpXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ1RhYlNldCByZW5kZXInKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0aGlzLnByb3BzLmNoaWxkcmVuWzBdLnR5cGUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5vblNlbGVjdFRhYn0+XHJcbiAgICAgICAgICAgICAgICAgICAge3RoaXMuZ2V0Q2hpbGRyZW4oKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFRhYlNldDsiLCIvKipcclxuICogVGFicyBjb21wb25lbnRcclxuICpcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8wOFxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKlxyXG4gKiBleGFtcGxlOlxyXG4gKiA8UHVtLlRhYnMgLz5cclxuICpcclxuICogQm9vdHN0cmFwIENTU1xyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcclxuXHJcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vLi4vc2VydmljZXMvVXRpbCcpO1xyXG5cclxuZnVuY3Rpb24gZ2V0VVVJRCgpIHtcclxuICAgIHJldHVybiBVdGlsLmdldFVVSUQoKTtcclxufVxyXG5cclxudmFyIFRhYnMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6ICdUYWJzJyxcclxuICAgICAgICBpZDogZ2V0VVVJRCgpLFxyXG4gICAgICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIO+/vcq877+9IO+/vde477+9XHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwibmF2IG5hdi10YWJzXCI+e3RoaXMucHJvcHMuY2hpbGRyZW59PC91bD5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBUYWJzOyIsIi8qKlxyXG4gKiBwcy11dGlsIHNlcnZpY2VzXHJcbiAqIFxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzAxXHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqIFxyXG4gKiBleGFtcGxlOlxyXG4gKiBhcHAuY29udHJvbGxlcignQ3RybCcsIFsnJHNjb3BlJywgJ3BzVXRpbCcsIGZ1bmN0aW9uKCRzY29wZSwgcHNVdGlsKSB7XHJcbiAqIFx0ICAgdmFyIHJvb3RQYXRoID0gcHNVdGlsLmdldFJvb3RQYXRoKCk7XHJcbiAqIH1dKTtcclxuICogXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiBnZXREYXRlVG9TdHJpbmcoZGF0ZSkge1xyXG5cdHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxyXG5cdFx0bW9udGggPSB6ZXJvZmlsbChkYXRlLmdldE1vbnRoKCkgKyAxLCAyKSxcclxuXHRcdGRheSA9IHplcm9maWxsKGRhdGUuZ2V0RGF0ZSgpLCAyKSxcclxuXHRcdGhvdXJzID0gKGRhdGUuZ2V0SG91cnMoKSA8IDApID8gJzAwJyA6IHplcm9maWxsKGRhdGUuZ2V0SG91cnMoKSwgMiksXHQvLyBkYXRlcmFuZ2VwaWNrZXIgaG91cnMgOeyLnOqwhCDsmKTrsoTtkZzsi5zrkJjripQg67KE6re466GcIOyduO2VtCDrubzspIDri6QuXHJcblx0XHRtaW51dGVzID0gemVyb2ZpbGwoZGF0ZS5nZXRNaW51dGVzKCksIDIpLFxyXG5cdFx0c2Vjb25kcyA9IHplcm9maWxsKGRhdGUuZ2V0U2Vjb25kcygpLCAyKSxcclxuXHRcdGRhdGVTdHJpbmcgPSB5ZWFyICsgJy0nICsgbW9udGggKyAnLScgKyBkYXkgKyAnICcgKyBob3VycyArICc6JyArIG1pbnV0ZXMgKyAnOicgKyBzZWNvbmRzO1xyXG5cclxuXHRyZXR1cm4gZGF0ZVN0cmluZztcclxufVxyXG5cclxuZnVuY3Rpb24gemVyb2ZpbGwobiwgZGlnaXRzKSB7XHJcblx0dmFyIHplcm8gPSAnJztcclxuXHRuID0gbi50b1N0cmluZygpO1xyXG5cclxuXHRpZiAobi5sZW5ndGggPCBkaWdpdHMpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGlnaXRzIC0gbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR6ZXJvICs9ICcwJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJldHVybiB6ZXJvICsgbjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Z2V0RGF0ZVRvU3RyaW5nOiBnZXREYXRlVG9TdHJpbmdcclxufTsiLCIvKipcclxuICogVXRpbCBzZXJ2aWNlc1xyXG4gKiBcclxuICogdmVyc2lvbiA8dHQ+JCBWZXJzaW9uOiAxLjAgJDwvdHQ+IGRhdGU6MjAxNi8wMy8wMVxyXG4gKiBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzpocmFobkBua2lhLmNvLmtyXCI+QWhuIEh5dW5nLVJvPC9hPlxyXG4gKiBcclxuICogZXhhbXBsZTpcclxuICogdmFyIFV0aWwgPSByZXF1aXJlKCcuLi9zZXJ2aWNlcy9VdGlsJyk7XHJcbiAqIFV0aWwuZ2V0VVVJRCgpO1xyXG4gKlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuZnVuY3Rpb24gZ2V0VVVJRCgpIHtcclxuXHRyZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcblx0XHR2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCwgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xyXG5cdFx0cmV0dXJuIHYudG9TdHJpbmcoMTYpO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzbGVlcChtaWxsaXNlY29uZHMpIHtcclxuXHR2YXIgc3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IDFlNzsgaSsrKSB7XHJcblx0XHRpZiAoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnQpID4gbWlsbGlzZWNvbmRzKSB7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0Z2V0VVVJRDogZ2V0VVVJRCxcclxuXHRzbGVlcDogc2xlZXBcclxufTtcclxuXHJcbi8vYW5ndWxhci5tb2R1bGUoJ3BzLnNlcnZpY2VzLnV0aWwnLCBbXSlcclxuLy8uZmFjdG9yeSgncHNVdGlsJywgWyckd2luZG93JywgJyRsb2NhdGlvbicsIGZ1bmN0aW9uKCR3aW5kb3csICRsb2NhdGlvbikge1xyXG4vL1x0dmFyIGZhY3RvcnkgPSB7fTtcclxuLy9cdGZhY3Rvcnkuc2hvdyA9IGZ1bmN0aW9uKG1zZykge1xyXG4vLyAgICAgICAgJHdpbmRvdy5hbGVydChtc2cpO1xyXG4vLyAgICB9O1xyXG4vL1xyXG4vLyAgICBmYWN0b3J5LnJldmVyc2UgPSBmdW5jdGlvbihuYW1lKSB7XHJcbi8vXHRcdHJldHVybiBuYW1lLnNwbGl0KFwiXCIpLnJldmVyc2UoKS5qb2luKFwiXCIpO1xyXG4vL1x0fTtcclxuLy9cclxuLy9cdC8vIHJvb3QgcGF0aFxyXG4vL1x0ZmFjdG9yeS5nZXRSb290UGF0aCA9IGZ1bmN0aW9uKCkge1xyXG4vL1x0XHQvLyBqc+yXkOyEnCBDb250ZXh0UGF0aCDrpbwg7Ja77J2EIOyImCDsl4bsnYwgLSBSb290IFBhdGjrpbwg7Ja77Ja07IScIOydkeyaqe2VmOyekC5cclxuLy9cdFx0Lyp2YXIgb2Zmc2V0PWxvY2F0aW9uLmhyZWYuaW5kZXhPZihsb2NhdGlvbi5ob3N0KStsb2NhdGlvbi5ob3N0Lmxlbmd0aDtcclxuLy9cdCAgICB2YXIgY3R4UGF0aD1sb2NhdGlvbi5ocmVmLnN1YnN0cmluZyhvZmZzZXQsbG9jYXRpb24uaHJlZi5pbmRleE9mKCcvJyxvZmZzZXQrMSkpO1xyXG4vL1x0ICAgIHJldHVybiBjdHhQYXRoOyovXHJcbi8vXHJcbi8vXHQgICAgdmFyIG9mZnNldCA9ICR3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCR3aW5kb3cubG9jYXRpb24uaG9zdCkgKyAkd2luZG93LmxvY2F0aW9uLmhvc3QubGVuZ3RoO1xyXG4vL1x0ICAgIHZhciBjdHhQYXRoID0gJHdpbmRvdy5sb2NhdGlvbi5ocmVmLnN1YnN0cmluZyhvZmZzZXQsICR3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcvJywgb2Zmc2V0ICsgMSkpO1xyXG4vL1x0ICAgIHJldHVybiBjdHhQYXRoO1xyXG4vL1x0fTtcclxuLy9cclxuLy9cdC8vIHV1aWRcclxuLy9cdGZhY3RvcnkuZ2V0VVVJRCA9IGZ1bmN0aW9uKCkge1xyXG4vL1x0XHRyZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcbi8vXHRcdFx0dmFyIHIgPSBNYXRoLnJhbmRvbSgpKjE2fDAsIHYgPSBjID09ICd4JyA/IHIgOiAociYweDN8MHg4KTtcclxuLy9cdFx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcbi8vXHRcdH0pO1xyXG4vL1x0fTtcclxuLy9cclxuLy9cdC8vIHRvb2x0aXBcclxuLy9cdGZhY3RvcnkudG9vbHRpcCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XHJcbi8vXHJcbi8vXHRcdGlmKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuLy9cdFx0XHRzZWxlY3RvciA9ICdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJztcclxuLy9cdFx0fVxyXG4vLy8vXHRcdCQoc2VsZWN0b3IpLmJzVG9vbHRpcCgpO1xyXG4vL1x0XHQkKHNlbGVjdG9yKS50b29sdGlwKCk7XHJcbi8vXHR9O1xyXG4vL1xyXG4vLyAgICByZXR1cm4gZmFjdG9yeTtcclxuLy99XSk7XHJcbiIsIi8qKlxyXG4gKiBVdGlsIHNlcnZpY2VzXHJcbiAqIFxyXG4gKiB2ZXJzaW9uIDx0dD4kIFZlcnNpb246IDEuMCAkPC90dD4gZGF0ZToyMDE2LzAzLzAxXHJcbiAqIGF1dGhvciA8YSBocmVmPVwibWFpbHRvOmhyYWhuQG5raWEuY28ua3JcIj5BaG4gSHl1bmctUm88L2E+XHJcbiAqIFxyXG4gKiBleGFtcGxlOlxyXG4gKiB2YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3NlcnZpY2VzL1V0aWwnKTtcclxuICogVXRpbC5nZXRVVUlEKCk7XHJcbiAqXHJcbiAqL1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5mdW5jdGlvbiBnZXRVVUlEKCkge1xyXG5cdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuXHRcdHZhciByID0gTWF0aC5yYW5kb20oKSoxNnwwLCB2ID0gYyA9PSAneCcgPyByIDogKHImMHgzfDB4OCk7XHJcblx0XHRyZXR1cm4gdi50b1N0cmluZygxNik7XHJcblx0fSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNsZWVwKG1pbGxpc2Vjb25kcykge1xyXG5cdHZhciBzdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgMWU3OyBpKyspIHtcclxuXHRcdGlmICgobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBzdGFydCkgPiBtaWxsaXNlY29uZHMpIHtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRnZXRVVUlEOiBnZXRVVUlELFxyXG5cdHNsZWVwOiBzbGVlcFxyXG59O1xyXG5cclxuLy9hbmd1bGFyLm1vZHVsZSgncHMuc2VydmljZXMudXRpbCcsIFtdKVxyXG4vLy5mYWN0b3J5KCdwc1V0aWwnLCBbJyR3aW5kb3cnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oJHdpbmRvdywgJGxvY2F0aW9uKSB7XHJcbi8vXHR2YXIgZmFjdG9yeSA9IHt9O1xyXG4vL1x0ZmFjdG9yeS5zaG93ID0gZnVuY3Rpb24obXNnKSB7XHJcbi8vICAgICAgICAkd2luZG93LmFsZXJ0KG1zZyk7XHJcbi8vICAgIH07XHJcbi8vXHJcbi8vICAgIGZhY3RvcnkucmV2ZXJzZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuLy9cdFx0cmV0dXJuIG5hbWUuc3BsaXQoXCJcIikucmV2ZXJzZSgpLmpvaW4oXCJcIik7XHJcbi8vXHR9O1xyXG4vL1xyXG4vL1x0Ly8gcm9vdCBwYXRoXHJcbi8vXHRmYWN0b3J5LmdldFJvb3RQYXRoID0gZnVuY3Rpb24oKSB7XHJcbi8vXHRcdC8vIGpz7JeQ7IScIENvbnRleHRQYXRoIOulvCDslrvsnYQg7IiYIOyXhuydjCAtIFJvb3QgUGF0aOulvCDslrvslrTshJwg7J2R7Jqp7ZWY7J6QLlxyXG4vL1x0XHQvKnZhciBvZmZzZXQ9bG9jYXRpb24uaHJlZi5pbmRleE9mKGxvY2F0aW9uLmhvc3QpK2xvY2F0aW9uLmhvc3QubGVuZ3RoO1xyXG4vL1x0ICAgIHZhciBjdHhQYXRoPWxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKG9mZnNldCxsb2NhdGlvbi5ocmVmLmluZGV4T2YoJy8nLG9mZnNldCsxKSk7XHJcbi8vXHQgICAgcmV0dXJuIGN0eFBhdGg7Ki9cclxuLy9cclxuLy9cdCAgICB2YXIgb2Zmc2V0ID0gJHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJHdpbmRvdy5sb2NhdGlvbi5ob3N0KSArICR3aW5kb3cubG9jYXRpb24uaG9zdC5sZW5ndGg7XHJcbi8vXHQgICAgdmFyIGN0eFBhdGggPSAkd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKG9mZnNldCwgJHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJy8nLCBvZmZzZXQgKyAxKSk7XHJcbi8vXHQgICAgcmV0dXJuIGN0eFBhdGg7XHJcbi8vXHR9O1xyXG4vL1xyXG4vL1x0Ly8gdXVpZFxyXG4vL1x0ZmFjdG9yeS5nZXRVVUlEID0gZnVuY3Rpb24oKSB7XHJcbi8vXHRcdHJldHVybiAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIGZ1bmN0aW9uKGMpIHtcclxuLy9cdFx0XHR2YXIgciA9IE1hdGgucmFuZG9tKCkqMTZ8MCwgdiA9IGMgPT0gJ3gnID8gciA6IChyJjB4M3wweDgpO1xyXG4vL1x0XHRcdHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuLy9cdFx0fSk7XHJcbi8vXHR9O1xyXG4vL1xyXG4vL1x0Ly8gdG9vbHRpcFxyXG4vL1x0ZmFjdG9yeS50b29sdGlwID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuLy9cclxuLy9cdFx0aWYodHlwZW9mIHNlbGVjdG9yID09PSAndW5kZWZpbmVkJykge1xyXG4vL1x0XHRcdHNlbGVjdG9yID0gJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nO1xyXG4vL1x0XHR9XHJcbi8vLy9cdFx0JChzZWxlY3RvcikuYnNUb29sdGlwKCk7XHJcbi8vXHRcdCQoc2VsZWN0b3IpLnRvb2x0aXAoKTtcclxuLy9cdH07XHJcbi8vXHJcbi8vICAgIHJldHVybiBmYWN0b3J5O1xyXG4vL31dKTtcclxuIl19
