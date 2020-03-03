(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process,setImmediate){
/*! Browser bundle of nunjucks 3.2.0  */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["nunjucks"] = factory();
	else
		root["nunjucks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var escapeMap = {
  '&': '&amp;',
  '"': '&quot;',
  '\'': '&#39;',
  '<': '&lt;',
  '>': '&gt;'
};
var escapeRegex = /[&"'<>]/g;
var exports = module.exports = {};

function hasOwnProp(obj, k) {
  return ObjProto.hasOwnProperty.call(obj, k);
}

exports.hasOwnProp = hasOwnProp;

function lookupEscape(ch) {
  return escapeMap[ch];
}

function _prettifyError(path, withInternals, err) {
  if (!err.Update) {
    // not one of ours, cast it
    err = new exports.TemplateError(err);
  }

  err.Update(path); // Unless they marked the dev flag, show them a trace from here

  if (!withInternals) {
    var old = err;
    err = new Error(old.message);
    err.name = old.name;
  }

  return err;
}

exports._prettifyError = _prettifyError;

function TemplateError(message, lineno, colno) {
  var err;
  var cause;

  if (message instanceof Error) {
    cause = message;
    message = cause.name + ": " + cause.message;
  }

  if (Object.setPrototypeOf) {
    err = new Error(message);
    Object.setPrototypeOf(err, TemplateError.prototype);
  } else {
    err = this;
    Object.defineProperty(err, 'message', {
      enumerable: false,
      writable: true,
      value: message
    });
  }

  Object.defineProperty(err, 'name', {
    value: 'Template render error'
  });

  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, this.constructor);
  }

  var getStack;

  if (cause) {
    var stackDescriptor = Object.getOwnPropertyDescriptor(cause, 'stack');

    getStack = stackDescriptor && (stackDescriptor.get || function () {
      return stackDescriptor.value;
    });

    if (!getStack) {
      getStack = function getStack() {
        return cause.stack;
      };
    }
  } else {
    var stack = new Error(message).stack;

    getStack = function getStack() {
      return stack;
    };
  }

  Object.defineProperty(err, 'stack', {
    get: function get() {
      return getStack.call(err);
    }
  });
  Object.defineProperty(err, 'cause', {
    value: cause
  });
  err.lineno = lineno;
  err.colno = colno;
  err.firstUpdate = true;

  err.Update = function Update(path) {
    var msg = '(' + (path || 'unknown path') + ')'; // only show lineno + colno next to path of template
    // where error occurred

    if (this.firstUpdate) {
      if (this.lineno && this.colno) {
        msg += " [Line " + this.lineno + ", Column " + this.colno + "]";
      } else if (this.lineno) {
        msg += " [Line " + this.lineno + "]";
      }
    }

    msg += '\n ';

    if (this.firstUpdate) {
      msg += ' ';
    }

    this.message = msg + (this.message || '');
    this.firstUpdate = false;
    return this;
  };

  return err;
}

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(TemplateError.prototype, Error.prototype);
} else {
  TemplateError.prototype = Object.create(Error.prototype, {
    constructor: {
      value: TemplateError
    }
  });
}

exports.TemplateError = TemplateError;

function escape(val) {
  return val.replace(escapeRegex, lookupEscape);
}

exports.escape = escape;

function isFunction(obj) {
  return ObjProto.toString.call(obj) === '[object Function]';
}

exports.isFunction = isFunction;

function isArray(obj) {
  return ObjProto.toString.call(obj) === '[object Array]';
}

exports.isArray = isArray;

function isString(obj) {
  return ObjProto.toString.call(obj) === '[object String]';
}

exports.isString = isString;

function isObject(obj) {
  return ObjProto.toString.call(obj) === '[object Object]';
}

exports.isObject = isObject;

function groupBy(obj, val) {
  var result = {};
  var iterator = isFunction(val) ? val : function (o) {
    return o[val];
  };

  for (var i = 0; i < obj.length; i++) {
    var value = obj[i];
    var key = iterator(value, i);
    (result[key] || (result[key] = [])).push(value);
  }

  return result;
}

exports.groupBy = groupBy;

function toArray(obj) {
  return Array.prototype.slice.call(obj);
}

exports.toArray = toArray;

function without(array) {
  var result = [];

  if (!array) {
    return result;
  }

  var length = array.length;
  var contains = toArray(arguments).slice(1);
  var index = -1;

  while (++index < length) {
    if (indexOf(contains, array[index]) === -1) {
      result.push(array[index]);
    }
  }

  return result;
}

exports.without = without;

function repeat(char_, n) {
  var str = '';

  for (var i = 0; i < n; i++) {
    str += char_;
  }

  return str;
}

exports.repeat = repeat;

function each(obj, func, context) {
  if (obj == null) {
    return;
  }

  if (ArrayProto.forEach && obj.forEach === ArrayProto.forEach) {
    obj.forEach(func, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      func.call(context, obj[i], i, obj);
    }
  }
}

exports.each = each;

function map(obj, func) {
  var results = [];

  if (obj == null) {
    return results;
  }

  if (ArrayProto.map && obj.map === ArrayProto.map) {
    return obj.map(func);
  }

  for (var i = 0; i < obj.length; i++) {
    results[results.length] = func(obj[i], i);
  }

  if (obj.length === +obj.length) {
    results.length = obj.length;
  }

  return results;
}

exports.map = map;

function asyncIter(arr, iter, cb) {
  var i = -1;

  function next() {
    i++;

    if (i < arr.length) {
      iter(arr[i], i, next, cb);
    } else {
      cb();
    }
  }

  next();
}

exports.asyncIter = asyncIter;

function asyncFor(obj, iter, cb) {
  var keys = keys_(obj || {});
  var len = keys.length;
  var i = -1;

  function next() {
    i++;
    var k = keys[i];

    if (i < len) {
      iter(k, obj[k], i, len, next);
    } else {
      cb();
    }
  }

  next();
}

exports.asyncFor = asyncFor;

function indexOf(arr, searchElement, fromIndex) {
  return Array.prototype.indexOf.call(arr || [], searchElement, fromIndex);
}

exports.indexOf = indexOf;

function keys_(obj) {
  /* eslint-disable no-restricted-syntax */
  var arr = [];

  for (var k in obj) {
    if (hasOwnProp(obj, k)) {
      arr.push(k);
    }
  }

  return arr;
}

exports.keys = keys_;

function _entries(obj) {
  return keys_(obj).map(function (k) {
    return [k, obj[k]];
  });
}

exports._entries = _entries;

function _values(obj) {
  return keys_(obj).map(function (k) {
    return obj[k];
  });
}

exports._values = _values;

function extend(obj1, obj2) {
  obj1 = obj1 || {};
  keys_(obj2).forEach(function (k) {
    obj1[k] = obj2[k];
  });
  return obj1;
}

exports._assign = exports.extend = extend;

function inOperator(key, val) {
  if (isArray(val) || isString(val)) {
    return val.indexOf(key) !== -1;
  } else if (isObject(val)) {
    return key in val;
  }

  throw new Error('Cannot use "in" operator to search for "' + key + '" in unexpected types.');
}

exports.inOperator = inOperator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // A simple class system, more documentation to come

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var EventEmitter = __webpack_require__(16);

var lib = __webpack_require__(0);

function parentWrap(parent, prop) {
  if (typeof parent !== 'function' || typeof prop !== 'function') {
    return prop;
  }

  return function wrap() {
    // Save the current parent method
    var tmp = this.parent; // Set parent to the previous method, call, and restore

    this.parent = parent;
    var res = prop.apply(this, arguments);
    this.parent = tmp;
    return res;
  };
}

function extendClass(cls, name, props) {
  props = props || {};
  lib.keys(props).forEach(function (k) {
    props[k] = parentWrap(cls.prototype[k], props[k]);
  });

  var subclass =
  /*#__PURE__*/
  function (_cls) {
    _inheritsLoose(subclass, _cls);

    function subclass() {
      return _cls.apply(this, arguments) || this;
    }

    _createClass(subclass, [{
      key: "typename",
      get: function get() {
        return name;
      }
    }]);

    return subclass;
  }(cls);

  lib._assign(subclass.prototype, props);

  return subclass;
}

var Obj =
/*#__PURE__*/
function () {
  function Obj() {
    // Unfortunately necessary for backwards compatibility
    this.init.apply(this, arguments);
  }

  var _proto = Obj.prototype;

  _proto.init = function init() {};

  Obj.extend = function extend(name, props) {
    if (typeof name === 'object') {
      props = name;
      name = 'anonymous';
    }

    return extendClass(this, name, props);
  };

  _createClass(Obj, [{
    key: "typename",
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return Obj;
}();

var EmitterObj =
/*#__PURE__*/
function (_EventEmitter) {
  _inheritsLoose(EmitterObj, _EventEmitter);

  function EmitterObj() {
    var _this2;

    var _this;

    _this = _EventEmitter.call(this) || this; // Unfortunately necessary for backwards compatibility

    (_this2 = _this).init.apply(_this2, arguments);

    return _this;
  }

  var _proto2 = EmitterObj.prototype;

  _proto2.init = function init() {};

  EmitterObj.extend = function extend(name, props) {
    if (typeof name === 'object') {
      props = name;
      name = 'anonymous';
    }

    return extendClass(this, name, props);
  };

  _createClass(EmitterObj, [{
    key: "typename",
    get: function get() {
      return this.constructor.name;
    }
  }]);

  return EmitterObj;
}(EventEmitter);

module.exports = {
  Obj: Obj,
  EmitterObj: EmitterObj
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var arrayFrom = Array.from;
var supportsIterators = typeof Symbol === 'function' && Symbol.iterator && typeof arrayFrom === 'function'; // Frames keep track of scoping both at compile-time and run-time so
// we know how to access variables. Block tags can introduce special
// variables, for example.

var Frame =
/*#__PURE__*/
function () {
  function Frame(parent, isolateWrites) {
    this.variables = {};
    this.parent = parent;
    this.topLevel = false; // if this is true, writes (set) should never propagate upwards past
    // this frame to its parent (though reads may).

    this.isolateWrites = isolateWrites;
  }

  var _proto = Frame.prototype;

  _proto.set = function set(name, val, resolveUp) {
    // Allow variables with dots by automatically creating the
    // nested structure
    var parts = name.split('.');
    var obj = this.variables;
    var frame = this;

    if (resolveUp) {
      if (frame = this.resolve(parts[0], true)) {
        frame.set(name, val);
        return;
      }
    }

    for (var i = 0; i < parts.length - 1; i++) {
      var id = parts[i];

      if (!obj[id]) {
        obj[id] = {};
      }

      obj = obj[id];
    }

    obj[parts[parts.length - 1]] = val;
  };

  _proto.get = function get(name) {
    var val = this.variables[name];

    if (val !== undefined) {
      return val;
    }

    return null;
  };

  _proto.lookup = function lookup(name) {
    var p = this.parent;
    var val = this.variables[name];

    if (val !== undefined) {
      return val;
    }

    return p && p.lookup(name);
  };

  _proto.resolve = function resolve(name, forWrite) {
    var p = forWrite && this.isolateWrites ? undefined : this.parent;
    var val = this.variables[name];

    if (val !== undefined) {
      return this;
    }

    return p && p.resolve(name);
  };

  _proto.push = function push(isolateWrites) {
    return new Frame(this, isolateWrites);
  };

  _proto.pop = function pop() {
    return this.parent;
  };

  return Frame;
}();

function makeMacro(argNames, kwargNames, func) {
  var _this = this;

  return function () {
    for (var _len = arguments.length, macroArgs = new Array(_len), _key = 0; _key < _len; _key++) {
      macroArgs[_key] = arguments[_key];
    }

    var argCount = numArgs(macroArgs);
    var args;
    var kwargs = getKeywordArgs(macroArgs);

    if (argCount > argNames.length) {
      args = macroArgs.slice(0, argNames.length); // Positional arguments that should be passed in as
      // keyword arguments (essentially default values)

      macroArgs.slice(args.length, argCount).forEach(function (val, i) {
        if (i < kwargNames.length) {
          kwargs[kwargNames[i]] = val;
        }
      });
      args.push(kwargs);
    } else if (argCount < argNames.length) {
      args = macroArgs.slice(0, argCount);

      for (var i = argCount; i < argNames.length; i++) {
        var arg = argNames[i]; // Keyword arguments that should be passed as
        // positional arguments, i.e. the caller explicitly
        // used the name of a positional arg

        args.push(kwargs[arg]);
        delete kwargs[arg];
      }

      args.push(kwargs);
    } else {
      args = macroArgs;
    }

    return func.apply(_this, args);
  };
}

function makeKeywordArgs(obj) {
  obj.__keywords = true;
  return obj;
}

function isKeywordArgs(obj) {
  return obj && Object.prototype.hasOwnProperty.call(obj, '__keywords');
}

function getKeywordArgs(args) {
  var len = args.length;

  if (len) {
    var lastArg = args[len - 1];

    if (isKeywordArgs(lastArg)) {
      return lastArg;
    }
  }

  return {};
}

function numArgs(args) {
  var len = args.length;

  if (len === 0) {
    return 0;
  }

  var lastArg = args[len - 1];

  if (isKeywordArgs(lastArg)) {
    return len - 1;
  } else {
    return len;
  }
} // A SafeString object indicates that the string should not be
// autoescaped. This happens magically because autoescaping only
// occurs on primitive string objects.


function SafeString(val) {
  if (typeof val !== 'string') {
    return val;
  }

  this.val = val;
  this.length = val.length;
}

SafeString.prototype = Object.create(String.prototype, {
  length: {
    writable: true,
    configurable: true,
    value: 0
  }
});

SafeString.prototype.valueOf = function valueOf() {
  return this.val;
};

SafeString.prototype.toString = function toString() {
  return this.val;
};

function copySafeness(dest, target) {
  if (dest instanceof SafeString) {
    return new SafeString(target);
  }

  return target.toString();
}

function markSafe(val) {
  var type = typeof val;

  if (type === 'string') {
    return new SafeString(val);
  } else if (type !== 'function') {
    return val;
  } else {
    return function wrapSafe(args) {
      var ret = val.apply(this, arguments);

      if (typeof ret === 'string') {
        return new SafeString(ret);
      }

      return ret;
    };
  }
}

function suppressValue(val, autoescape) {
  val = val !== undefined && val !== null ? val : '';

  if (autoescape && !(val instanceof SafeString)) {
    val = lib.escape(val.toString());
  }

  return val;
}

function ensureDefined(val, lineno, colno) {
  if (val === null || val === undefined) {
    throw new lib.TemplateError('attempted to output null or undefined value', lineno + 1, colno + 1);
  }

  return val;
}

function memberLookup(obj, val) {
  if (obj === undefined || obj === null) {
    return undefined;
  }

  if (typeof obj[val] === 'function') {
    return function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return obj[val].apply(obj, args);
    };
  }

  return obj[val];
}

function callWrap(obj, name, context, args) {
  if (!obj) {
    throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
  } else if (typeof obj !== 'function') {
    throw new Error('Unable to call `' + name + '`, which is not a function');
  }

  return obj.apply(context, args);
}

function contextOrFrameLookup(context, frame, name) {
  var val = frame.lookup(name);
  return val !== undefined ? val : context.lookup(name);
}

function handleError(error, lineno, colno) {
  if (error.lineno) {
    return error;
  } else {
    return new lib.TemplateError(error, lineno, colno);
  }
}

function asyncEach(arr, dimen, iter, cb) {
  if (lib.isArray(arr)) {
    var len = arr.length;
    lib.asyncIter(arr, function iterCallback(item, i, next) {
      switch (dimen) {
        case 1:
          iter(item, i, len, next);
          break;

        case 2:
          iter(item[0], item[1], i, len, next);
          break;

        case 3:
          iter(item[0], item[1], item[2], i, len, next);
          break;

        default:
          item.push(i, len, next);
          iter.apply(this, item);
      }
    }, cb);
  } else {
    lib.asyncFor(arr, function iterCallback(key, val, i, len, next) {
      iter(key, val, i, len, next);
    }, cb);
  }
}

function asyncAll(arr, dimen, func, cb) {
  var finished = 0;
  var len;
  var outputArr;

  function done(i, output) {
    finished++;
    outputArr[i] = output;

    if (finished === len) {
      cb(null, outputArr.join(''));
    }
  }

  if (lib.isArray(arr)) {
    len = arr.length;
    outputArr = new Array(len);

    if (len === 0) {
      cb(null, '');
    } else {
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];

        switch (dimen) {
          case 1:
            func(item, i, len, done);
            break;

          case 2:
            func(item[0], item[1], i, len, done);
            break;

          case 3:
            func(item[0], item[1], item[2], i, len, done);
            break;

          default:
            item.push(i, len, done);
            func.apply(this, item);
        }
      }
    }
  } else {
    var keys = lib.keys(arr || {});
    len = keys.length;
    outputArr = new Array(len);

    if (len === 0) {
      cb(null, '');
    } else {
      for (var _i = 0; _i < keys.length; _i++) {
        var k = keys[_i];
        func(k, arr[k], _i, len, done);
      }
    }
  }
}

function fromIterator(arr) {
  if (typeof arr !== 'object' || arr === null || lib.isArray(arr)) {
    return arr;
  } else if (supportsIterators && Symbol.iterator in arr) {
    return arrayFrom(arr);
  } else {
    return arr;
  }
}

module.exports = {
  Frame: Frame,
  makeMacro: makeMacro,
  makeKeywordArgs: makeKeywordArgs,
  numArgs: numArgs,
  suppressValue: suppressValue,
  ensureDefined: ensureDefined,
  memberLookup: memberLookup,
  contextOrFrameLookup: contextOrFrameLookup,
  callWrap: callWrap,
  handleError: handleError,
  isArray: lib.isArray,
  keys: lib.keys,
  SafeString: SafeString,
  copySafeness: copySafeness,
  markSafe: markSafe,
  asyncEach: asyncEach,
  asyncAll: asyncAll,
  inOperator: lib.inOperator,
  fromIterator: fromIterator
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _require = __webpack_require__(1),
    Obj = _require.Obj;

function traverseAndCheck(obj, type, results) {
  if (obj instanceof type) {
    results.push(obj);
  }

  if (obj instanceof Node) {
    obj.findAll(type, results);
  }
}

var Node =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Node, _Obj);

  function Node() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Node.prototype;

  _proto.init = function init(lineno, colno) {
    var _this = this,
        _arguments = arguments;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.lineno = lineno;
    this.colno = colno;
    this.fields.forEach(function (field, i) {
      // The first two args are line/col numbers, so offset by 2
      var val = _arguments[i + 2]; // Fields should never be undefined, but null. It makes
      // testing easier to normalize values.

      if (val === undefined) {
        val = null;
      }

      _this[field] = val;
    });
  };

  _proto.findAll = function findAll(type, results) {
    var _this2 = this;

    results = results || [];

    if (this instanceof NodeList) {
      this.children.forEach(function (child) {
        return traverseAndCheck(child, type, results);
      });
    } else {
      this.fields.forEach(function (field) {
        return traverseAndCheck(_this2[field], type, results);
      });
    }

    return results;
  };

  _proto.iterFields = function iterFields(func) {
    var _this3 = this;

    this.fields.forEach(function (field) {
      func(_this3[field], field);
    });
  };

  return Node;
}(Obj); // Abstract nodes


var Value =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Value, _Node);

  function Value() {
    return _Node.apply(this, arguments) || this;
  }

  _createClass(Value, [{
    key: "typename",
    get: function get() {
      return 'Value';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['value'];
    }
  }]);

  return Value;
}(Node); // Concrete nodes


var NodeList =
/*#__PURE__*/
function (_Node2) {
  _inheritsLoose(NodeList, _Node2);

  function NodeList() {
    return _Node2.apply(this, arguments) || this;
  }

  var _proto2 = NodeList.prototype;

  _proto2.init = function init(lineno, colno, nodes) {
    _Node2.prototype.init.call(this, lineno, colno, nodes || []);
  };

  _proto2.addChild = function addChild(node) {
    this.children.push(node);
  };

  _createClass(NodeList, [{
    key: "typename",
    get: function get() {
      return 'NodeList';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['children'];
    }
  }]);

  return NodeList;
}(Node);

var Root = NodeList.extend('Root');
var Literal = Value.extend('Literal');
var Symbol = Value.extend('Symbol');
var Group = NodeList.extend('Group');
var ArrayNode = NodeList.extend('Array');
var Pair = Node.extend('Pair', {
  fields: ['key', 'value']
});
var Dict = NodeList.extend('Dict');
var LookupVal = Node.extend('LookupVal', {
  fields: ['target', 'val']
});
var If = Node.extend('If', {
  fields: ['cond', 'body', 'else_']
});
var IfAsync = If.extend('IfAsync');
var InlineIf = Node.extend('InlineIf', {
  fields: ['cond', 'body', 'else_']
});
var For = Node.extend('For', {
  fields: ['arr', 'name', 'body', 'else_']
});
var AsyncEach = For.extend('AsyncEach');
var AsyncAll = For.extend('AsyncAll');
var Macro = Node.extend('Macro', {
  fields: ['name', 'args', 'body']
});
var Caller = Macro.extend('Caller');
var Import = Node.extend('Import', {
  fields: ['template', 'target', 'withContext']
});

var FromImport =
/*#__PURE__*/
function (_Node3) {
  _inheritsLoose(FromImport, _Node3);

  function FromImport() {
    return _Node3.apply(this, arguments) || this;
  }

  var _proto3 = FromImport.prototype;

  _proto3.init = function init(lineno, colno, template, names, withContext) {
    _Node3.prototype.init.call(this, lineno, colno, template, names || new NodeList(), withContext);
  };

  _createClass(FromImport, [{
    key: "typename",
    get: function get() {
      return 'FromImport';
    }
  }, {
    key: "fields",
    get: function get() {
      return ['template', 'names', 'withContext'];
    }
  }]);

  return FromImport;
}(Node);

var FunCall = Node.extend('FunCall', {
  fields: ['name', 'args']
});
var Filter = FunCall.extend('Filter');
var FilterAsync = Filter.extend('FilterAsync', {
  fields: ['name', 'args', 'symbol']
});
var KeywordArgs = Dict.extend('KeywordArgs');
var Block = Node.extend('Block', {
  fields: ['name', 'body']
});
var Super = Node.extend('Super', {
  fields: ['blockName', 'symbol']
});
var TemplateRef = Node.extend('TemplateRef', {
  fields: ['template']
});
var Extends = TemplateRef.extend('Extends');
var Include = Node.extend('Include', {
  fields: ['template', 'ignoreMissing']
});
var Set = Node.extend('Set', {
  fields: ['targets', 'value']
});
var Switch = Node.extend('Switch', {
  fields: ['expr', 'cases', 'default']
});
var Case = Node.extend('Case', {
  fields: ['cond', 'body']
});
var Output = NodeList.extend('Output');
var Capture = Node.extend('Capture', {
  fields: ['body']
});
var TemplateData = Literal.extend('TemplateData');
var UnaryOp = Node.extend('UnaryOp', {
  fields: ['target']
});
var BinOp = Node.extend('BinOp', {
  fields: ['left', 'right']
});
var In = BinOp.extend('In');
var Is = BinOp.extend('Is');
var Or = BinOp.extend('Or');
var And = BinOp.extend('And');
var Not = UnaryOp.extend('Not');
var Add = BinOp.extend('Add');
var Concat = BinOp.extend('Concat');
var Sub = BinOp.extend('Sub');
var Mul = BinOp.extend('Mul');
var Div = BinOp.extend('Div');
var FloorDiv = BinOp.extend('FloorDiv');
var Mod = BinOp.extend('Mod');
var Pow = BinOp.extend('Pow');
var Neg = UnaryOp.extend('Neg');
var Pos = UnaryOp.extend('Pos');
var Compare = Node.extend('Compare', {
  fields: ['expr', 'ops']
});
var CompareOperand = Node.extend('CompareOperand', {
  fields: ['expr', 'type']
});
var CallExtension = Node.extend('CallExtension', {
  init: function init(ext, prop, args, contentArgs) {
    this.parent();
    this.extName = ext.__name || ext;
    this.prop = prop;
    this.args = args || new NodeList();
    this.contentArgs = contentArgs || [];
    this.autoescape = ext.autoescape;
  },
  fields: ['extName', 'prop', 'args', 'contentArgs']
});
var CallExtensionAsync = CallExtension.extend('CallExtensionAsync'); // This is hacky, but this is just a debugging function anyway

function print(str, indent, inline) {
  var lines = str.split('\n');
  lines.forEach(function (line, i) {
    if (line && (inline && i > 0 || !inline)) {
      process.stdout.write(' '.repeat(indent));
    }

    var nl = i === lines.length - 1 ? '' : '\n';
    process.stdout.write("" + line + nl);
  });
} // Print the AST in a nicely formatted tree format for debuggin


function printNodes(node, indent) {
  indent = indent || 0;
  print(node.typename + ': ', indent);

  if (node instanceof NodeList) {
    print('\n');
    node.children.forEach(function (n) {
      printNodes(n, indent + 2);
    });
  } else if (node instanceof CallExtension) {
    print(node.extName + "." + node.prop + "\n");

    if (node.args) {
      printNodes(node.args, indent + 2);
    }

    if (node.contentArgs) {
      node.contentArgs.forEach(function (n) {
        printNodes(n, indent + 2);
      });
    }
  } else {
    var nodes = [];
    var props = null;
    node.iterFields(function (val, fieldName) {
      if (val instanceof Node) {
        nodes.push([fieldName, val]);
      } else {
        props = props || {};
        props[fieldName] = val;
      }
    });

    if (props) {
      print(JSON.stringify(props, null, 2) + '\n', null, true);
    } else {
      print('\n');
    }

    nodes.forEach(function (_ref) {
      var fieldName = _ref[0],
          n = _ref[1];
      print("[" + fieldName + "] =>", indent + 2);
      printNodes(n, indent + 4);
    });
  }
}

module.exports = {
  Node: Node,
  Root: Root,
  NodeList: NodeList,
  Value: Value,
  Literal: Literal,
  Symbol: Symbol,
  Group: Group,
  Array: ArrayNode,
  Pair: Pair,
  Dict: Dict,
  Output: Output,
  Capture: Capture,
  TemplateData: TemplateData,
  If: If,
  IfAsync: IfAsync,
  InlineIf: InlineIf,
  For: For,
  AsyncEach: AsyncEach,
  AsyncAll: AsyncAll,
  Macro: Macro,
  Caller: Caller,
  Import: Import,
  FromImport: FromImport,
  FunCall: FunCall,
  Filter: Filter,
  FilterAsync: FilterAsync,
  KeywordArgs: KeywordArgs,
  Block: Block,
  Super: Super,
  Extends: Extends,
  Include: Include,
  Set: Set,
  Switch: Switch,
  Case: Case,
  LookupVal: LookupVal,
  BinOp: BinOp,
  In: In,
  Is: Is,
  Or: Or,
  And: And,
  Not: Not,
  Add: Add,
  Concat: Concat,
  Sub: Sub,
  Mul: Mul,
  Div: Div,
  FloorDiv: FloorDiv,
  Mod: Mod,
  Pow: Pow,
  Neg: Neg,
  Pos: Pos,
  Compare: Compare,
  CompareOperand: CompareOperand,
  CallExtension: CallExtension,
  CallExtensionAsync: CallExtensionAsync,
  printNodes: printNodes
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var parser = __webpack_require__(8);

var transformer = __webpack_require__(17);

var nodes = __webpack_require__(3);

var _require = __webpack_require__(0),
    TemplateError = _require.TemplateError;

var _require2 = __webpack_require__(2),
    Frame = _require2.Frame;

var _require3 = __webpack_require__(1),
    Obj = _require3.Obj; // These are all the same for now, but shouldn't be passed straight
// through


var compareOps = {
  '==': '==',
  '===': '===',
  '!=': '!=',
  '!==': '!==',
  '<': '<',
  '>': '>',
  '<=': '<=',
  '>=': '>='
};

var Compiler =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Compiler, _Obj);

  function Compiler() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Compiler.prototype;

  _proto.init = function init(templateName, throwOnUndefined) {
    this.templateName = templateName;
    this.codebuf = [];
    this.lastId = 0;
    this.buffer = null;
    this.bufferStack = [];
    this._scopeClosers = '';
    this.inBlock = false;
    this.throwOnUndefined = throwOnUndefined;
  };

  _proto.fail = function fail(msg, lineno, colno) {
    if (lineno !== undefined) {
      lineno += 1;
    }

    if (colno !== undefined) {
      colno += 1;
    }

    throw new TemplateError(msg, lineno, colno);
  };

  _proto._pushBuffer = function _pushBuffer() {
    var id = this._tmpid();

    this.bufferStack.push(this.buffer);
    this.buffer = id;

    this._emit("var " + this.buffer + " = \"\";");

    return id;
  };

  _proto._popBuffer = function _popBuffer() {
    this.buffer = this.bufferStack.pop();
  };

  _proto._emit = function _emit(code) {
    this.codebuf.push(code);
  };

  _proto._emitLine = function _emitLine(code) {
    this._emit(code + '\n');
  };

  _proto._emitLines = function _emitLines() {
    var _this = this;

    for (var _len = arguments.length, lines = new Array(_len), _key = 0; _key < _len; _key++) {
      lines[_key] = arguments[_key];
    }

    lines.forEach(function (line) {
      return _this._emitLine(line);
    });
  };

  _proto._emitFuncBegin = function _emitFuncBegin(node, name) {
    this.buffer = 'output';
    this._scopeClosers = '';

    this._emitLine("function " + name + "(env, context, frame, runtime, cb) {");

    this._emitLine("var lineno = " + node.lineno + ";");

    this._emitLine("var colno = " + node.colno + ";");

    this._emitLine("var " + this.buffer + " = \"\";");

    this._emitLine('try {');
  };

  _proto._emitFuncEnd = function _emitFuncEnd(noReturn) {
    if (!noReturn) {
      this._emitLine('cb(null, ' + this.buffer + ');');
    }

    this._closeScopeLevels();

    this._emitLine('} catch (e) {');

    this._emitLine('  cb(runtime.handleError(e, lineno, colno));');

    this._emitLine('}');

    this._emitLine('}');

    this.buffer = null;
  };

  _proto._addScopeLevel = function _addScopeLevel() {
    this._scopeClosers += '})';
  };

  _proto._closeScopeLevels = function _closeScopeLevels() {
    this._emitLine(this._scopeClosers + ';');

    this._scopeClosers = '';
  };

  _proto._withScopedSyntax = function _withScopedSyntax(func) {
    var _scopeClosers = this._scopeClosers;
    this._scopeClosers = '';
    func.call(this);

    this._closeScopeLevels();

    this._scopeClosers = _scopeClosers;
  };

  _proto._makeCallback = function _makeCallback(res) {
    var err = this._tmpid();

    return 'function(' + err + (res ? ',' + res : '') + ') {\n' + 'if(' + err + ') { cb(' + err + '); return; }';
  };

  _proto._tmpid = function _tmpid() {
    this.lastId++;
    return 't_' + this.lastId;
  };

  _proto._templateName = function _templateName() {
    return this.templateName == null ? 'undefined' : JSON.stringify(this.templateName);
  };

  _proto._compileChildren = function _compileChildren(node, frame) {
    var _this2 = this;

    node.children.forEach(function (child) {
      _this2.compile(child, frame);
    });
  };

  _proto._compileAggregate = function _compileAggregate(node, frame, startChar, endChar) {
    var _this3 = this;

    if (startChar) {
      this._emit(startChar);
    }

    node.children.forEach(function (child, i) {
      if (i > 0) {
        _this3._emit(',');
      }

      _this3.compile(child, frame);
    });

    if (endChar) {
      this._emit(endChar);
    }
  };

  _proto._compileExpression = function _compileExpression(node, frame) {
    // TODO: I'm not really sure if this type check is worth it or
    // not.
    this.assertType(node, nodes.Literal, nodes.Symbol, nodes.Group, nodes.Array, nodes.Dict, nodes.FunCall, nodes.Caller, nodes.Filter, nodes.LookupVal, nodes.Compare, nodes.InlineIf, nodes.In, nodes.Is, nodes.And, nodes.Or, nodes.Not, nodes.Add, nodes.Concat, nodes.Sub, nodes.Mul, nodes.Div, nodes.FloorDiv, nodes.Mod, nodes.Pow, nodes.Neg, nodes.Pos, nodes.Compare, nodes.NodeList);
    this.compile(node, frame);
  };

  _proto.assertType = function assertType(node) {
    for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      types[_key2 - 1] = arguments[_key2];
    }

    if (!types.some(function (t) {
      return node instanceof t;
    })) {
      this.fail("assertType: invalid type: " + node.typename, node.lineno, node.colno);
    }
  };

  _proto.compileCallExtension = function compileCallExtension(node, frame, async) {
    var _this4 = this;

    var args = node.args;
    var contentArgs = node.contentArgs;
    var autoescape = typeof node.autoescape === 'boolean' ? node.autoescape : true;

    if (!async) {
      this._emit(this.buffer + " += runtime.suppressValue(");
    }

    this._emit("env.getExtension(\"" + node.extName + "\")[\"" + node.prop + "\"](");

    this._emit('context');

    if (args || contentArgs) {
      this._emit(',');
    }

    if (args) {
      if (!(args instanceof nodes.NodeList)) {
        this.fail('compileCallExtension: arguments must be a NodeList, ' + 'use `parser.parseSignature`');
      }

      args.children.forEach(function (arg, i) {
        // Tag arguments are passed normally to the call. Note
        // that keyword arguments are turned into a single js
        // object as the last argument, if they exist.
        _this4._compileExpression(arg, frame);

        if (i !== args.children.length - 1 || contentArgs.length) {
          _this4._emit(',');
        }
      });
    }

    if (contentArgs.length) {
      contentArgs.forEach(function (arg, i) {
        if (i > 0) {
          _this4._emit(',');
        }

        if (arg) {
          _this4._emitLine('function(cb) {');

          _this4._emitLine('if(!cb) { cb = function(err) { if(err) { throw err; }}}');

          var id = _this4._pushBuffer();

          _this4._withScopedSyntax(function () {
            _this4.compile(arg, frame);

            _this4._emitLine("cb(null, " + id + ");");
          });

          _this4._popBuffer();

          _this4._emitLine("return " + id + ";");

          _this4._emitLine('}');
        } else {
          _this4._emit('null');
        }
      });
    }

    if (async) {
      var res = this._tmpid();

      this._emitLine(', ' + this._makeCallback(res));

      this._emitLine(this.buffer + " += runtime.suppressValue(" + res + ", " + autoescape + " && env.opts.autoescape);");

      this._addScopeLevel();
    } else {
      this._emit(')');

      this._emit(", " + autoescape + " && env.opts.autoescape);\n");
    }
  };

  _proto.compileCallExtensionAsync = function compileCallExtensionAsync(node, frame) {
    this.compileCallExtension(node, frame, true);
  };

  _proto.compileNodeList = function compileNodeList(node, frame) {
    this._compileChildren(node, frame);
  };

  _proto.compileLiteral = function compileLiteral(node) {
    if (typeof node.value === 'string') {
      var val = node.value.replace(/\\/g, '\\\\');
      val = val.replace(/"/g, '\\"');
      val = val.replace(/\n/g, '\\n');
      val = val.replace(/\r/g, '\\r');
      val = val.replace(/\t/g, '\\t');
      val = val.replace(/\u2028/g, "\\u2028");

      this._emit("\"" + val + "\"");
    } else if (node.value === null) {
      this._emit('null');
    } else {
      this._emit(node.value.toString());
    }
  };

  _proto.compileSymbol = function compileSymbol(node, frame) {
    var name = node.value;
    var v = frame.lookup(name);

    if (v) {
      this._emit(v);
    } else {
      this._emit('runtime.contextOrFrameLookup(' + 'context, frame, "' + name + '")');
    }
  };

  _proto.compileGroup = function compileGroup(node, frame) {
    this._compileAggregate(node, frame, '(', ')');
  };

  _proto.compileArray = function compileArray(node, frame) {
    this._compileAggregate(node, frame, '[', ']');
  };

  _proto.compileDict = function compileDict(node, frame) {
    this._compileAggregate(node, frame, '{', '}');
  };

  _proto.compilePair = function compilePair(node, frame) {
    var key = node.key;
    var val = node.value;

    if (key instanceof nodes.Symbol) {
      key = new nodes.Literal(key.lineno, key.colno, key.value);
    } else if (!(key instanceof nodes.Literal && typeof key.value === 'string')) {
      this.fail('compilePair: Dict keys must be strings or names', key.lineno, key.colno);
    }

    this.compile(key, frame);

    this._emit(': ');

    this._compileExpression(val, frame);
  };

  _proto.compileInlineIf = function compileInlineIf(node, frame) {
    this._emit('(');

    this.compile(node.cond, frame);

    this._emit('?');

    this.compile(node.body, frame);

    this._emit(':');

    if (node.else_ !== null) {
      this.compile(node.else_, frame);
    } else {
      this._emit('""');
    }

    this._emit(')');
  };

  _proto.compileIn = function compileIn(node, frame) {
    this._emit('runtime.inOperator(');

    this.compile(node.left, frame);

    this._emit(',');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compileIs = function compileIs(node, frame) {
    // first, we need to try to get the name of the test function, if it's a
    // callable (i.e., has args) and not a symbol.
    var right = node.right.name ? node.right.name.value // otherwise go with the symbol value
    : node.right.value;

    this._emit('env.getTest("' + right + '").call(context, ');

    this.compile(node.left, frame); // compile the arguments for the callable if they exist

    if (node.right.args) {
      this._emit(',');

      this.compile(node.right.args, frame);
    }

    this._emit(') === true');
  };

  _proto._binOpEmitter = function _binOpEmitter(node, frame, str) {
    this.compile(node.left, frame);

    this._emit(str);

    this.compile(node.right, frame);
  } // ensure concatenation instead of addition
  // by adding empty string in between
  ;

  _proto.compileOr = function compileOr(node, frame) {
    return this._binOpEmitter(node, frame, ' || ');
  };

  _proto.compileAnd = function compileAnd(node, frame) {
    return this._binOpEmitter(node, frame, ' && ');
  };

  _proto.compileAdd = function compileAdd(node, frame) {
    return this._binOpEmitter(node, frame, ' + ');
  };

  _proto.compileConcat = function compileConcat(node, frame) {
    return this._binOpEmitter(node, frame, ' + "" + ');
  };

  _proto.compileSub = function compileSub(node, frame) {
    return this._binOpEmitter(node, frame, ' - ');
  };

  _proto.compileMul = function compileMul(node, frame) {
    return this._binOpEmitter(node, frame, ' * ');
  };

  _proto.compileDiv = function compileDiv(node, frame) {
    return this._binOpEmitter(node, frame, ' / ');
  };

  _proto.compileMod = function compileMod(node, frame) {
    return this._binOpEmitter(node, frame, ' % ');
  };

  _proto.compileNot = function compileNot(node, frame) {
    this._emit('!');

    this.compile(node.target, frame);
  };

  _proto.compileFloorDiv = function compileFloorDiv(node, frame) {
    this._emit('Math.floor(');

    this.compile(node.left, frame);

    this._emit(' / ');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compilePow = function compilePow(node, frame) {
    this._emit('Math.pow(');

    this.compile(node.left, frame);

    this._emit(', ');

    this.compile(node.right, frame);

    this._emit(')');
  };

  _proto.compileNeg = function compileNeg(node, frame) {
    this._emit('-');

    this.compile(node.target, frame);
  };

  _proto.compilePos = function compilePos(node, frame) {
    this._emit('+');

    this.compile(node.target, frame);
  };

  _proto.compileCompare = function compileCompare(node, frame) {
    var _this5 = this;

    this.compile(node.expr, frame);
    node.ops.forEach(function (op) {
      _this5._emit(" " + compareOps[op.type] + " ");

      _this5.compile(op.expr, frame);
    });
  };

  _proto.compileLookupVal = function compileLookupVal(node, frame) {
    this._emit('runtime.memberLookup((');

    this._compileExpression(node.target, frame);

    this._emit('),');

    this._compileExpression(node.val, frame);

    this._emit(')');
  };

  _proto._getNodeName = function _getNodeName(node) {
    switch (node.typename) {
      case 'Symbol':
        return node.value;

      case 'FunCall':
        return 'the return value of (' + this._getNodeName(node.name) + ')';

      case 'LookupVal':
        return this._getNodeName(node.target) + '["' + this._getNodeName(node.val) + '"]';

      case 'Literal':
        return node.value.toString();

      default:
        return '--expression--';
    }
  };

  _proto.compileFunCall = function compileFunCall(node, frame) {
    // Keep track of line/col info at runtime by settings
    // variables within an expression. An expression in javascript
    // like (x, y, z) returns the last value, and x and y can be
    // anything
    this._emit('(lineno = ' + node.lineno + ', colno = ' + node.colno + ', ');

    this._emit('runtime.callWrap('); // Compile it as normal.


    this._compileExpression(node.name, frame); // Output the name of what we're calling so we can get friendly errors
    // if the lookup fails.


    this._emit(', "' + this._getNodeName(node.name).replace(/"/g, '\\"') + '", context, ');

    this._compileAggregate(node.args, frame, '[', '])');

    this._emit(')');
  };

  _proto.compileFilter = function compileFilter(node, frame) {
    var name = node.name;
    this.assertType(name, nodes.Symbol);

    this._emit('env.getFilter("' + name.value + '").call(context, ');

    this._compileAggregate(node.args, frame);

    this._emit(')');
  };

  _proto.compileFilterAsync = function compileFilterAsync(node, frame) {
    var name = node.name;
    var symbol = node.symbol.value;
    this.assertType(name, nodes.Symbol);
    frame.set(symbol, symbol);

    this._emit('env.getFilter("' + name.value + '").call(context, ');

    this._compileAggregate(node.args, frame);

    this._emitLine(', ' + this._makeCallback(symbol));

    this._addScopeLevel();
  };

  _proto.compileKeywordArgs = function compileKeywordArgs(node, frame) {
    this._emit('runtime.makeKeywordArgs(');

    this.compileDict(node, frame);

    this._emit(')');
  };

  _proto.compileSet = function compileSet(node, frame) {
    var _this6 = this;

    var ids = []; // Lookup the variable names for each identifier and create
    // new ones if necessary

    node.targets.forEach(function (target) {
      var name = target.value;
      var id = frame.lookup(name);

      if (id === null || id === undefined) {
        id = _this6._tmpid(); // Note: This relies on js allowing scope across
        // blocks, in case this is created inside an `if`

        _this6._emitLine('var ' + id + ';');
      }

      ids.push(id);
    });

    if (node.value) {
      this._emit(ids.join(' = ') + ' = ');

      this._compileExpression(node.value, frame);

      this._emitLine(';');
    } else {
      this._emit(ids.join(' = ') + ' = ');

      this.compile(node.body, frame);

      this._emitLine(';');
    }

    node.targets.forEach(function (target, i) {
      var id = ids[i];
      var name = target.value; // We are running this for every var, but it's very
      // uncommon to assign to multiple vars anyway

      _this6._emitLine("frame.set(\"" + name + "\", " + id + ", true);");

      _this6._emitLine('if(frame.topLevel) {');

      _this6._emitLine("context.setVariable(\"" + name + "\", " + id + ");");

      _this6._emitLine('}');

      if (name.charAt(0) !== '_') {
        _this6._emitLine('if(frame.topLevel) {');

        _this6._emitLine("context.addExport(\"" + name + "\", " + id + ");");

        _this6._emitLine('}');
      }
    });
  };

  _proto.compileSwitch = function compileSwitch(node, frame) {
    var _this7 = this;

    this._emit('switch (');

    this.compile(node.expr, frame);

    this._emit(') {');

    node.cases.forEach(function (c, i) {
      _this7._emit('case ');

      _this7.compile(c.cond, frame);

      _this7._emit(': ');

      _this7.compile(c.body, frame); // preserve fall-throughs


      if (c.body.children.length) {
        _this7._emitLine('break;');
      }
    });

    if (node.default) {
      this._emit('default:');

      this.compile(node.default, frame);
    }

    this._emit('}');
  };

  _proto.compileIf = function compileIf(node, frame, async) {
    var _this8 = this;

    this._emit('if(');

    this._compileExpression(node.cond, frame);

    this._emitLine(') {');

    this._withScopedSyntax(function () {
      _this8.compile(node.body, frame);

      if (async) {
        _this8._emit('cb()');
      }
    });

    if (node.else_) {
      this._emitLine('}\nelse {');

      this._withScopedSyntax(function () {
        _this8.compile(node.else_, frame);

        if (async) {
          _this8._emit('cb()');
        }
      });
    } else if (async) {
      this._emitLine('}\nelse {');

      this._emit('cb()');
    }

    this._emitLine('}');
  };

  _proto.compileIfAsync = function compileIfAsync(node, frame) {
    this._emit('(function(cb) {');

    this.compileIf(node, frame, true);

    this._emit('})(' + this._makeCallback());

    this._addScopeLevel();
  };

  _proto._emitLoopBindings = function _emitLoopBindings(node, arr, i, len) {
    var _this9 = this;

    var bindings = [{
      name: 'index',
      val: i + " + 1"
    }, {
      name: 'index0',
      val: i
    }, {
      name: 'revindex',
      val: len + " - " + i
    }, {
      name: 'revindex0',
      val: len + " - " + i + " - 1"
    }, {
      name: 'first',
      val: i + " === 0"
    }, {
      name: 'last',
      val: i + " === " + len + " - 1"
    }, {
      name: 'length',
      val: len
    }];
    bindings.forEach(function (b) {
      _this9._emitLine("frame.set(\"loop." + b.name + "\", " + b.val + ");");
    });
  };

  _proto.compileFor = function compileFor(node, frame) {
    var _this10 = this;

    // Some of this code is ugly, but it keeps the generated code
    // as fast as possible. ForAsync also shares some of this, but
    // not much.
    var i = this._tmpid();

    var len = this._tmpid();

    var arr = this._tmpid();

    frame = frame.push();

    this._emitLine('frame = frame.push();');

    this._emit("var " + arr + " = ");

    this._compileExpression(node.arr, frame);

    this._emitLine(';');

    this._emit("if(" + arr + ") {");

    this._emitLine(arr + ' = runtime.fromIterator(' + arr + ');'); // If multiple names are passed, we need to bind them
    // appropriately


    if (node.name instanceof nodes.Array) {
      this._emitLine("var " + i + ";"); // The object could be an arroy or object. Note that the
      // body of the loop is duplicated for each condition, but
      // we are optimizing for speed over size.


      this._emitLine("if(runtime.isArray(" + arr + ")) {");

      this._emitLine("var " + len + " = " + arr + ".length;");

      this._emitLine("for(" + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {"); // Bind each declared var


      node.name.children.forEach(function (child, u) {
        var tid = _this10._tmpid();

        _this10._emitLine("var " + tid + " = " + arr + "[" + i + "][" + u + "];");

        _this10._emitLine("frame.set(\"" + child + "\", " + arr + "[" + i + "][" + u + "]);");

        frame.set(node.name.children[u].value, tid);
      });

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');

      this._emitLine('} else {'); // Iterate over the key/values of an object


      var _node$name$children = node.name.children,
          key = _node$name$children[0],
          val = _node$name$children[1];

      var k = this._tmpid();

      var v = this._tmpid();

      frame.set(key.value, k);
      frame.set(val.value, v);

      this._emitLine(i + " = -1;");

      this._emitLine("var " + len + " = runtime.keys(" + arr + ").length;");

      this._emitLine("for(var " + k + " in " + arr + ") {");

      this._emitLine(i + "++;");

      this._emitLine("var " + v + " = " + arr + "[" + k + "];");

      this._emitLine("frame.set(\"" + key.value + "\", " + k + ");");

      this._emitLine("frame.set(\"" + val.value + "\", " + v + ");");

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');

      this._emitLine('}');
    } else {
      // Generate a typical array iteration
      var _v = this._tmpid();

      frame.set(node.name.value, _v);

      this._emitLine("var " + len + " = " + arr + ".length;");

      this._emitLine("for(var " + i + "=0; " + i + " < " + arr + ".length; " + i + "++) {");

      this._emitLine("var " + _v + " = " + arr + "[" + i + "];");

      this._emitLine("frame.set(\"" + node.name.value + "\", " + _v + ");");

      this._emitLoopBindings(node, arr, i, len);

      this._withScopedSyntax(function () {
        _this10.compile(node.body, frame);
      });

      this._emitLine('}');
    }

    this._emitLine('}');

    if (node.else_) {
      this._emitLine('if (!' + len + ') {');

      this.compile(node.else_, frame);

      this._emitLine('}');
    }

    this._emitLine('frame = frame.pop();');
  };

  _proto._compileAsyncLoop = function _compileAsyncLoop(node, frame, parallel) {
    var _this11 = this;

    // This shares some code with the For tag, but not enough to
    // worry about. This iterates across an object asynchronously,
    // but not in parallel.
    var i = this._tmpid();

    var len = this._tmpid();

    var arr = this._tmpid();

    var asyncMethod = parallel ? 'asyncAll' : 'asyncEach';
    frame = frame.push();

    this._emitLine('frame = frame.push();');

    this._emit('var ' + arr + ' = runtime.fromIterator(');

    this._compileExpression(node.arr, frame);

    this._emitLine(');');

    if (node.name instanceof nodes.Array) {
      var arrayLen = node.name.children.length;

      this._emit("runtime." + asyncMethod + "(" + arr + ", " + arrayLen + ", function(");

      node.name.children.forEach(function (name) {
        _this11._emit(name.value + ",");
      });

      this._emit(i + ',' + len + ',next) {');

      node.name.children.forEach(function (name) {
        var id = name.value;
        frame.set(id, id);

        _this11._emitLine("frame.set(\"" + id + "\", " + id + ");");
      });
    } else {
      var id = node.name.value;

      this._emitLine("runtime." + asyncMethod + "(" + arr + ", 1, function(" + id + ", " + i + ", " + len + ",next) {");

      this._emitLine('frame.set("' + id + '", ' + id + ');');

      frame.set(id, id);
    }

    this._emitLoopBindings(node, arr, i, len);

    this._withScopedSyntax(function () {
      var buf;

      if (parallel) {
        buf = _this11._pushBuffer();
      }

      _this11.compile(node.body, frame);

      _this11._emitLine('next(' + i + (buf ? ',' + buf : '') + ');');

      if (parallel) {
        _this11._popBuffer();
      }
    });

    var output = this._tmpid();

    this._emitLine('}, ' + this._makeCallback(output));

    this._addScopeLevel();

    if (parallel) {
      this._emitLine(this.buffer + ' += ' + output + ';');
    }

    if (node.else_) {
      this._emitLine('if (!' + arr + '.length) {');

      this.compile(node.else_, frame);

      this._emitLine('}');
    }

    this._emitLine('frame = frame.pop();');
  };

  _proto.compileAsyncEach = function compileAsyncEach(node, frame) {
    this._compileAsyncLoop(node, frame);
  };

  _proto.compileAsyncAll = function compileAsyncAll(node, frame) {
    this._compileAsyncLoop(node, frame, true);
  };

  _proto._compileMacro = function _compileMacro(node, frame) {
    var _this12 = this;

    var args = [];
    var kwargs = null;

    var funcId = 'macro_' + this._tmpid();

    var keepFrame = frame !== undefined; // Type check the definition of the args

    node.args.children.forEach(function (arg, i) {
      if (i === node.args.children.length - 1 && arg instanceof nodes.Dict) {
        kwargs = arg;
      } else {
        _this12.assertType(arg, nodes.Symbol);

        args.push(arg);
      }
    });
    var realNames = [].concat(args.map(function (n) {
      return "l_" + n.value;
    }), ['kwargs']); // Quoted argument names

    var argNames = args.map(function (n) {
      return "\"" + n.value + "\"";
    });
    var kwargNames = (kwargs && kwargs.children || []).map(function (n) {
      return "\"" + n.key.value + "\"";
    }); // We pass a function to makeMacro which destructures the
    // arguments so support setting positional args with keywords
    // args and passing keyword args as positional args
    // (essentially default values). See runtime.js.

    var currFrame;

    if (keepFrame) {
      currFrame = frame.push(true);
    } else {
      currFrame = new Frame();
    }

    this._emitLines("var " + funcId + " = runtime.makeMacro(", "[" + argNames.join(', ') + "], ", "[" + kwargNames.join(', ') + "], ", "function (" + realNames.join(', ') + ") {", 'var callerFrame = frame;', 'frame = ' + (keepFrame ? 'frame.push(true);' : 'new runtime.Frame();'), 'kwargs = kwargs || {};', 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }'); // Expose the arguments to the template. Don't need to use
    // random names because the function
    // will create a new run-time scope for us


    args.forEach(function (arg) {
      _this12._emitLine("frame.set(\"" + arg.value + "\", l_" + arg.value + ");");

      currFrame.set(arg.value, "l_" + arg.value);
    }); // Expose the keyword arguments

    if (kwargs) {
      kwargs.children.forEach(function (pair) {
        var name = pair.key.value;

        _this12._emit("frame.set(\"" + name + "\", ");

        _this12._emit("Object.prototype.hasOwnProperty.call(kwargs, \"" + name + "\")");

        _this12._emit(" ? kwargs[\"" + name + "\"] : ");

        _this12._compileExpression(pair.value, currFrame);

        _this12._emit(');');
      });
    }

    var bufferId = this._pushBuffer();

    this._withScopedSyntax(function () {
      _this12.compile(node.body, currFrame);
    });

    this._emitLine('frame = ' + (keepFrame ? 'frame.pop();' : 'callerFrame;'));

    this._emitLine("return new runtime.SafeString(" + bufferId + ");");

    this._emitLine('});');

    this._popBuffer();

    return funcId;
  };

  _proto.compileMacro = function compileMacro(node, frame) {
    var funcId = this._compileMacro(node); // Expose the macro to the templates


    var name = node.name.value;
    frame.set(name, funcId);

    if (frame.parent) {
      this._emitLine("frame.set(\"" + name + "\", " + funcId + ");");
    } else {
      if (node.name.value.charAt(0) !== '_') {
        this._emitLine("context.addExport(\"" + name + "\");");
      }

      this._emitLine("context.setVariable(\"" + name + "\", " + funcId + ");");
    }
  };

  _proto.compileCaller = function compileCaller(node, frame) {
    // basically an anonymous "macro expression"
    this._emit('(function (){');

    var funcId = this._compileMacro(node, frame);

    this._emit("return " + funcId + ";})()");
  };

  _proto._compileGetTemplate = function _compileGetTemplate(node, frame, eagerCompile, ignoreMissing) {
    var parentTemplateId = this._tmpid();

    var parentName = this._templateName();

    var cb = this._makeCallback(parentTemplateId);

    var eagerCompileArg = eagerCompile ? 'true' : 'false';
    var ignoreMissingArg = ignoreMissing ? 'true' : 'false';

    this._emit('env.getTemplate(');

    this._compileExpression(node.template, frame);

    this._emitLine(", " + eagerCompileArg + ", " + parentName + ", " + ignoreMissingArg + ", " + cb);

    return parentTemplateId;
  };

  _proto.compileImport = function compileImport(node, frame) {
    var target = node.target.value;

    var id = this._compileGetTemplate(node, frame, false, false);

    this._addScopeLevel();

    this._emitLine(id + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(id));

    this._addScopeLevel();

    frame.set(target, id);

    if (frame.parent) {
      this._emitLine("frame.set(\"" + target + "\", " + id + ");");
    } else {
      this._emitLine("context.setVariable(\"" + target + "\", " + id + ");");
    }
  };

  _proto.compileFromImport = function compileFromImport(node, frame) {
    var _this13 = this;

    var importedId = this._compileGetTemplate(node, frame, false, false);

    this._addScopeLevel();

    this._emitLine(importedId + '.getExported(' + (node.withContext ? 'context.getVariables(), frame, ' : '') + this._makeCallback(importedId));

    this._addScopeLevel();

    node.names.children.forEach(function (nameNode) {
      var name;
      var alias;

      var id = _this13._tmpid();

      if (nameNode instanceof nodes.Pair) {
        name = nameNode.key.value;
        alias = nameNode.value.value;
      } else {
        name = nameNode.value;
        alias = name;
      }

      _this13._emitLine("if(Object.prototype.hasOwnProperty.call(" + importedId + ", \"" + name + "\")) {");

      _this13._emitLine("var " + id + " = " + importedId + "." + name + ";");

      _this13._emitLine('} else {');

      _this13._emitLine("cb(new Error(\"cannot import '" + name + "'\")); return;");

      _this13._emitLine('}');

      frame.set(alias, id);

      if (frame.parent) {
        _this13._emitLine("frame.set(\"" + alias + "\", " + id + ");");
      } else {
        _this13._emitLine("context.setVariable(\"" + alias + "\", " + id + ");");
      }
    });
  };

  _proto.compileBlock = function compileBlock(node) {
    var id = this._tmpid(); // If we are executing outside a block (creating a top-level
    // block), we really don't want to execute its code because it
    // will execute twice: once when the child template runs and
    // again when the parent template runs. Note that blocks
    // within blocks will *always* execute immediately *and*
    // wherever else they are invoked (like used in a parent
    // template). This may have behavioral differences from jinja
    // because blocks can have side effects, but it seems like a
    // waste of performance to always execute huge top-level
    // blocks twice


    if (!this.inBlock) {
      this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : ');
    }

    this._emit("context.getBlock(\"" + node.name.value + "\")");

    if (!this.inBlock) {
      this._emit(')');
    }

    this._emitLine('(env, context, frame, runtime, ' + this._makeCallback(id));

    this._emitLine(this.buffer + " += " + id + ";");

    this._addScopeLevel();
  };

  _proto.compileSuper = function compileSuper(node, frame) {
    var name = node.blockName.value;
    var id = node.symbol.value;

    var cb = this._makeCallback(id);

    this._emitLine("context.getSuper(env, \"" + name + "\", b_" + name + ", frame, runtime, " + cb);

    this._emitLine(id + " = runtime.markSafe(" + id + ");");

    this._addScopeLevel();

    frame.set(id, id);
  };

  _proto.compileExtends = function compileExtends(node, frame) {
    var k = this._tmpid();

    var parentTemplateId = this._compileGetTemplate(node, frame, true, false); // extends is a dynamic tag and can occur within a block like
    // `if`, so if this happens we need to capture the parent
    // template in the top-level scope


    this._emitLine("parentTemplate = " + parentTemplateId);

    this._emitLine("for(var " + k + " in parentTemplate.blocks) {");

    this._emitLine("context.addBlock(" + k + ", parentTemplate.blocks[" + k + "]);");

    this._emitLine('}');

    this._addScopeLevel();
  };

  _proto.compileInclude = function compileInclude(node, frame) {
    this._emitLine('var tasks = [];');

    this._emitLine('tasks.push(');

    this._emitLine('function(callback) {');

    var id = this._compileGetTemplate(node, frame, false, node.ignoreMissing);

    this._emitLine("callback(null," + id + ");});");

    this._emitLine('});');

    var id2 = this._tmpid();

    this._emitLine('tasks.push(');

    this._emitLine('function(template, callback){');

    this._emitLine('template.render(context.getVariables(), frame, ' + this._makeCallback(id2));

    this._emitLine('callback(null,' + id2 + ');});');

    this._emitLine('});');

    this._emitLine('tasks.push(');

    this._emitLine('function(result, callback){');

    this._emitLine(this.buffer + " += result;");

    this._emitLine('callback(null);');

    this._emitLine('});');

    this._emitLine('env.waterfall(tasks, function(){');

    this._addScopeLevel();
  };

  _proto.compileTemplateData = function compileTemplateData(node, frame) {
    this.compileLiteral(node, frame);
  };

  _proto.compileCapture = function compileCapture(node, frame) {
    var _this14 = this;

    // we need to temporarily override the current buffer id as 'output'
    // so the set block writes to the capture output instead of the buffer
    var buffer = this.buffer;
    this.buffer = 'output';

    this._emitLine('(function() {');

    this._emitLine('var output = "";');

    this._withScopedSyntax(function () {
      _this14.compile(node.body, frame);
    });

    this._emitLine('return output;');

    this._emitLine('})()'); // and of course, revert back to the old buffer id


    this.buffer = buffer;
  };

  _proto.compileOutput = function compileOutput(node, frame) {
    var _this15 = this;

    var children = node.children;
    children.forEach(function (child) {
      // TemplateData is a special case because it is never
      // autoescaped, so simply output it for optimization
      if (child instanceof nodes.TemplateData) {
        if (child.value) {
          _this15._emit(_this15.buffer + " += ");

          _this15.compileLiteral(child, frame);

          _this15._emitLine(';');
        }
      } else {
        _this15._emit(_this15.buffer + " += runtime.suppressValue(");

        if (_this15.throwOnUndefined) {
          _this15._emit('runtime.ensureDefined(');
        }

        _this15.compile(child, frame);

        if (_this15.throwOnUndefined) {
          _this15._emit("," + node.lineno + "," + node.colno + ")");
        }

        _this15._emit(', env.opts.autoescape);\n');
      }
    });
  };

  _proto.compileRoot = function compileRoot(node, frame) {
    var _this16 = this;

    if (frame) {
      this.fail('compileRoot: root node can\'t have frame');
    }

    frame = new Frame();

    this._emitFuncBegin(node, 'root');

    this._emitLine('var parentTemplate = null;');

    this._compileChildren(node, frame);

    this._emitLine('if(parentTemplate) {');

    this._emitLine('parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);');

    this._emitLine('} else {');

    this._emitLine("cb(null, " + this.buffer + ");");

    this._emitLine('}');

    this._emitFuncEnd(true);

    this.inBlock = true;
    var blockNames = [];
    var blocks = node.findAll(nodes.Block);
    blocks.forEach(function (block, i) {
      var name = block.name.value;

      if (blockNames.indexOf(name) !== -1) {
        throw new Error("Block \"" + name + "\" defined more than once.");
      }

      blockNames.push(name);

      _this16._emitFuncBegin(block, "b_" + name);

      var tmpFrame = new Frame();

      _this16._emitLine('var frame = frame.push(true);');

      _this16.compile(block.body, tmpFrame);

      _this16._emitFuncEnd();
    });

    this._emitLine('return {');

    blocks.forEach(function (block, i) {
      var blockName = "b_" + block.name.value;

      _this16._emitLine(blockName + ": " + blockName + ",");
    });

    this._emitLine('root: root\n};');
  };

  _proto.compile = function compile(node, frame) {
    var _compile = this['compile' + node.typename];

    if (_compile) {
      _compile.call(this, node, frame);
    } else {
      this.fail("compile: Cannot compile node: " + node.typename, node.lineno, node.colno);
    }
  };

  _proto.getCode = function getCode() {
    return this.codebuf.join('');
  };

  return Compiler;
}(Obj);

module.exports = {
  compile: function compile(src, asyncFilters, extensions, name, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var c = new Compiler(name, opts.throwOnUndefined); // Run the extension preprocessors against the source.

    var preprocessors = (extensions || []).map(function (ext) {
      return ext.preprocess;
    }).filter(function (f) {
      return !!f;
    });
    var processedSrc = preprocessors.reduce(function (s, processor) {
      return processor(s);
    }, src);
    c.compile(transformer.transform(parser.parse(processedSrc, extensions, opts), asyncFilters, name));
    return c.getCode();
  },
  Compiler: Compiler
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var path = __webpack_require__(4);

var _require = __webpack_require__(1),
    EmitterObj = _require.EmitterObj;

module.exports =
/*#__PURE__*/
function (_EmitterObj) {
  _inheritsLoose(Loader, _EmitterObj);

  function Loader() {
    return _EmitterObj.apply(this, arguments) || this;
  }

  var _proto = Loader.prototype;

  _proto.resolve = function resolve(from, to) {
    return path.resolve(path.dirname(from), to);
  };

  _proto.isRelative = function isRelative(filename) {
    return filename.indexOf('./') === 0 || filename.indexOf('../') === 0;
  };

  return Loader;
}(EmitterObj);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var asap = __webpack_require__(12);

var _waterfall = __webpack_require__(15);

var lib = __webpack_require__(0);

var compiler = __webpack_require__(5);

var filters = __webpack_require__(18);

var _require = __webpack_require__(10),
    FileSystemLoader = _require.FileSystemLoader,
    WebLoader = _require.WebLoader,
    PrecompiledLoader = _require.PrecompiledLoader;

var tests = __webpack_require__(20);

var globals = __webpack_require__(21);

var _require2 = __webpack_require__(1),
    Obj = _require2.Obj,
    EmitterObj = _require2.EmitterObj;

var globalRuntime = __webpack_require__(2);

var handleError = globalRuntime.handleError,
    Frame = globalRuntime.Frame;

var expressApp = __webpack_require__(22); // If the user is using the async API, *always* call it
// asynchronously even if the template was synchronous.


function callbackAsap(cb, err, res) {
  asap(function () {
    cb(err, res);
  });
}
/**
 * A no-op template, for use with {% include ignore missing %}
 */


var noopTmplSrc = {
  type: 'code',
  obj: {
    root: function root(env, context, frame, runtime, cb) {
      try {
        cb(null, '');
      } catch (e) {
        cb(handleError(e, null, null));
      }
    }
  }
};

var Environment =
/*#__PURE__*/
function (_EmitterObj) {
  _inheritsLoose(Environment, _EmitterObj);

  function Environment() {
    return _EmitterObj.apply(this, arguments) || this;
  }

  var _proto = Environment.prototype;

  _proto.init = function init(loaders, opts) {
    var _this = this;

    // The dev flag determines the trace that'll be shown on errors.
    // If set to true, returns the full trace from the error point,
    // otherwise will return trace starting from Template.render
    // (the full trace from within nunjucks may confuse developers using
    //  the library)
    // defaults to false
    opts = this.opts = opts || {};
    this.opts.dev = !!opts.dev; // The autoescape flag sets global autoescaping. If true,
    // every string variable will be escaped by default.
    // If false, strings can be manually escaped using the `escape` filter.
    // defaults to true

    this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true; // If true, this will make the system throw errors if trying
    // to output a null or undefined value

    this.opts.throwOnUndefined = !!opts.throwOnUndefined;
    this.opts.trimBlocks = !!opts.trimBlocks;
    this.opts.lstripBlocks = !!opts.lstripBlocks;
    this.loaders = [];

    if (!loaders) {
      // The filesystem loader is only available server-side
      if (FileSystemLoader) {
        this.loaders = [new FileSystemLoader('views')];
      } else if (WebLoader) {
        this.loaders = [new WebLoader('/views')];
      }
    } else {
      this.loaders = lib.isArray(loaders) ? loaders : [loaders];
    } // It's easy to use precompiled templates: just include them
    // before you configure nunjucks and this will automatically
    // pick it up and use it


    if (typeof window !== 'undefined' && window.nunjucksPrecompiled) {
      this.loaders.unshift(new PrecompiledLoader(window.nunjucksPrecompiled));
    }

    this._initLoaders();

    this.globals = globals();
    this.filters = {};
    this.tests = {};
    this.asyncFilters = [];
    this.extensions = {};
    this.extensionsList = [];

    lib._entries(filters).forEach(function (_ref) {
      var name = _ref[0],
          filter = _ref[1];
      return _this.addFilter(name, filter);
    });

    lib._entries(tests).forEach(function (_ref2) {
      var name = _ref2[0],
          test = _ref2[1];
      return _this.addTest(name, test);
    });
  };

  _proto._initLoaders = function _initLoaders() {
    var _this2 = this;

    this.loaders.forEach(function (loader) {
      // Caching and cache busting
      loader.cache = {};

      if (typeof loader.on === 'function') {
        loader.on('update', function (name, fullname) {
          loader.cache[name] = null;

          _this2.emit('update', name, fullname, loader);
        });
        loader.on('load', function (name, source) {
          _this2.emit('load', name, source, loader);
        });
      }
    });
  };

  _proto.invalidateCache = function invalidateCache() {
    this.loaders.forEach(function (loader) {
      loader.cache = {};
    });
  };

  _proto.addExtension = function addExtension(name, extension) {
    extension.__name = name;
    this.extensions[name] = extension;
    this.extensionsList.push(extension);
    return this;
  };

  _proto.removeExtension = function removeExtension(name) {
    var extension = this.getExtension(name);

    if (!extension) {
      return;
    }

    this.extensionsList = lib.without(this.extensionsList, extension);
    delete this.extensions[name];
  };

  _proto.getExtension = function getExtension(name) {
    return this.extensions[name];
  };

  _proto.hasExtension = function hasExtension(name) {
    return !!this.extensions[name];
  };

  _proto.addGlobal = function addGlobal(name, value) {
    this.globals[name] = value;
    return this;
  };

  _proto.getGlobal = function getGlobal(name) {
    if (typeof this.globals[name] === 'undefined') {
      throw new Error('global not found: ' + name);
    }

    return this.globals[name];
  };

  _proto.addFilter = function addFilter(name, func, async) {
    var wrapped = func;

    if (async) {
      this.asyncFilters.push(name);
    }

    this.filters[name] = wrapped;
    return this;
  };

  _proto.getFilter = function getFilter(name) {
    if (!this.filters[name]) {
      throw new Error('filter not found: ' + name);
    }

    return this.filters[name];
  };

  _proto.addTest = function addTest(name, func) {
    this.tests[name] = func;
    return this;
  };

  _proto.getTest = function getTest(name) {
    if (!this.tests[name]) {
      throw new Error('test not found: ' + name);
    }

    return this.tests[name];
  };

  _proto.resolveTemplate = function resolveTemplate(loader, parentName, filename) {
    var isRelative = loader.isRelative && parentName ? loader.isRelative(filename) : false;
    return isRelative && loader.resolve ? loader.resolve(parentName, filename) : filename;
  };

  _proto.getTemplate = function getTemplate(name, eagerCompile, parentName, ignoreMissing, cb) {
    var _this3 = this;

    var that = this;
    var tmpl = null;

    if (name && name.raw) {
      // this fixes autoescape for templates referenced in symbols
      name = name.raw;
    }

    if (lib.isFunction(parentName)) {
      cb = parentName;
      parentName = null;
      eagerCompile = eagerCompile || false;
    }

    if (lib.isFunction(eagerCompile)) {
      cb = eagerCompile;
      eagerCompile = false;
    }

    if (name instanceof Template) {
      tmpl = name;
    } else if (typeof name !== 'string') {
      throw new Error('template names must be a string: ' + name);
    } else {
      for (var i = 0; i < this.loaders.length; i++) {
        var loader = this.loaders[i];
        tmpl = loader.cache[this.resolveTemplate(loader, parentName, name)];

        if (tmpl) {
          break;
        }
      }
    }

    if (tmpl) {
      if (eagerCompile) {
        tmpl.compile();
      }

      if (cb) {
        cb(null, tmpl);
        return undefined;
      } else {
        return tmpl;
      }
    }

    var syncResult;

    var createTemplate = function createTemplate(err, info) {
      if (!info && !err && !ignoreMissing) {
        err = new Error('template not found: ' + name);
      }

      if (err) {
        if (cb) {
          cb(err);
          return;
        } else {
          throw err;
        }
      }

      var newTmpl;

      if (!info) {
        newTmpl = new Template(noopTmplSrc, _this3, '', eagerCompile);
      } else {
        newTmpl = new Template(info.src, _this3, info.path, eagerCompile);

        if (!info.noCache) {
          info.loader.cache[name] = newTmpl;
        }
      }

      if (cb) {
        cb(null, newTmpl);
      } else {
        syncResult = newTmpl;
      }
    };

    lib.asyncIter(this.loaders, function (loader, i, next, done) {
      function handle(err, src) {
        if (err) {
          done(err);
        } else if (src) {
          src.loader = loader;
          done(null, src);
        } else {
          next();
        }
      } // Resolve name relative to parentName


      name = that.resolveTemplate(loader, parentName, name);

      if (loader.async) {
        loader.getSource(name, handle);
      } else {
        handle(null, loader.getSource(name));
      }
    }, createTemplate);
    return syncResult;
  };

  _proto.express = function express(app) {
    return expressApp(this, app);
  };

  _proto.render = function render(name, ctx, cb) {
    if (lib.isFunction(ctx)) {
      cb = ctx;
      ctx = null;
    } // We support a synchronous API to make it easier to migrate
    // existing code to async. This works because if you don't do
    // anything async work, the whole thing is actually run
    // synchronously.


    var syncResult = null;
    this.getTemplate(name, function (err, tmpl) {
      if (err && cb) {
        callbackAsap(cb, err);
      } else if (err) {
        throw err;
      } else {
        syncResult = tmpl.render(ctx, cb);
      }
    });
    return syncResult;
  };

  _proto.renderString = function renderString(src, ctx, opts, cb) {
    if (lib.isFunction(opts)) {
      cb = opts;
      opts = {};
    }

    opts = opts || {};
    var tmpl = new Template(src, this, opts.path);
    return tmpl.render(ctx, cb);
  };

  _proto.waterfall = function waterfall(tasks, callback, forceAsync) {
    return _waterfall(tasks, callback, forceAsync);
  };

  return Environment;
}(EmitterObj);

var Context =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Context, _Obj);

  function Context() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto2 = Context.prototype;

  _proto2.init = function init(ctx, blocks, env) {
    var _this4 = this;

    // Has to be tied to an environment so we can tap into its globals.
    this.env = env || new Environment(); // Make a duplicate of ctx

    this.ctx = lib.extend({}, ctx);
    this.blocks = {};
    this.exported = [];
    lib.keys(blocks).forEach(function (name) {
      _this4.addBlock(name, blocks[name]);
    });
  };

  _proto2.lookup = function lookup(name) {
    // This is one of the most called functions, so optimize for
    // the typical case where the name isn't in the globals
    if (name in this.env.globals && !(name in this.ctx)) {
      return this.env.globals[name];
    } else {
      return this.ctx[name];
    }
  };

  _proto2.setVariable = function setVariable(name, val) {
    this.ctx[name] = val;
  };

  _proto2.getVariables = function getVariables() {
    return this.ctx;
  };

  _proto2.addBlock = function addBlock(name, block) {
    this.blocks[name] = this.blocks[name] || [];
    this.blocks[name].push(block);
    return this;
  };

  _proto2.getBlock = function getBlock(name) {
    if (!this.blocks[name]) {
      throw new Error('unknown block "' + name + '"');
    }

    return this.blocks[name][0];
  };

  _proto2.getSuper = function getSuper(env, name, block, frame, runtime, cb) {
    var idx = lib.indexOf(this.blocks[name] || [], block);
    var blk = this.blocks[name][idx + 1];
    var context = this;

    if (idx === -1 || !blk) {
      throw new Error('no super block available for "' + name + '"');
    }

    blk(env, context, frame, runtime, cb);
  };

  _proto2.addExport = function addExport(name) {
    this.exported.push(name);
  };

  _proto2.getExported = function getExported() {
    var _this5 = this;

    var exported = {};
    this.exported.forEach(function (name) {
      exported[name] = _this5.ctx[name];
    });
    return exported;
  };

  return Context;
}(Obj);

var Template =
/*#__PURE__*/
function (_Obj2) {
  _inheritsLoose(Template, _Obj2);

  function Template() {
    return _Obj2.apply(this, arguments) || this;
  }

  var _proto3 = Template.prototype;

  _proto3.init = function init(src, env, path, eagerCompile) {
    this.env = env || new Environment();

    if (lib.isObject(src)) {
      switch (src.type) {
        case 'code':
          this.tmplProps = src.obj;
          break;

        case 'string':
          this.tmplStr = src.obj;
          break;

        default:
          throw new Error("Unexpected template object type " + src.type + "; expected 'code', or 'string'");
      }
    } else if (lib.isString(src)) {
      this.tmplStr = src;
    } else {
      throw new Error('src must be a string or an object describing the source');
    }

    this.path = path;

    if (eagerCompile) {
      try {
        this._compile();
      } catch (err) {
        throw lib._prettifyError(this.path, this.env.opts.dev, err);
      }
    } else {
      this.compiled = false;
    }
  };

  _proto3.render = function render(ctx, parentFrame, cb) {
    var _this6 = this;

    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    } else if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    } // If there is a parent frame, we are being called from internal
    // code of another template, and the internal system
    // depends on the sync/async nature of the parent template
    // to be inherited, so force an async callback


    var forceAsync = !parentFrame; // Catch compile errors for async rendering

    try {
      this.compile();
    } catch (e) {
      var err = lib._prettifyError(this.path, this.env.opts.dev, e);

      if (cb) {
        return callbackAsap(cb, err);
      } else {
        throw err;
      }
    }

    var context = new Context(ctx || {}, this.blocks, this.env);
    var frame = parentFrame ? parentFrame.push(true) : new Frame();
    frame.topLevel = true;
    var syncResult = null;
    var didError = false;
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err, res) {
      if (didError) {
        // prevent multiple calls to cb
        if (cb) {
          return;
        } else {
          throw err;
        }
      }

      if (err) {
        err = lib._prettifyError(_this6.path, _this6.env.opts.dev, err);
        didError = true;
      }

      if (cb) {
        if (forceAsync) {
          callbackAsap(cb, err, res);
        } else {
          cb(err, res);
        }
      } else {
        if (err) {
          throw err;
        }

        syncResult = res;
      }
    });
    return syncResult;
  };

  _proto3.getExported = function getExported(ctx, parentFrame, cb) {
    // eslint-disable-line consistent-return
    if (typeof ctx === 'function') {
      cb = ctx;
      ctx = {};
    }

    if (typeof parentFrame === 'function') {
      cb = parentFrame;
      parentFrame = null;
    } // Catch compile errors for async rendering


    try {
      this.compile();
    } catch (e) {
      if (cb) {
        return cb(e);
      } else {
        throw e;
      }
    }

    var frame = parentFrame ? parentFrame.push() : new Frame();
    frame.topLevel = true; // Run the rootRenderFunc to populate the context with exported vars

    var context = new Context(ctx || {}, this.blocks, this.env);
    this.rootRenderFunc(this.env, context, frame, globalRuntime, function (err) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, context.getExported());
      }
    });
  };

  _proto3.compile = function compile() {
    if (!this.compiled) {
      this._compile();
    }
  };

  _proto3._compile = function _compile() {
    var props;

    if (this.tmplProps) {
      props = this.tmplProps;
    } else {
      var source = compiler.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
      var func = new Function(source); // eslint-disable-line no-new-func

      props = func();
    }

    this.blocks = this._getBlocks(props);
    this.rootRenderFunc = props.root;
    this.compiled = true;
  };

  _proto3._getBlocks = function _getBlocks(props) {
    var blocks = {};
    lib.keys(props).forEach(function (k) {
      if (k.slice(0, 2) === 'b_') {
        blocks[k.slice(2)] = props[k];
      }
    });
    return blocks;
  };

  return Template;
}(Obj);

module.exports = {
  Environment: Environment,
  Template: Template
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var lexer = __webpack_require__(9);

var nodes = __webpack_require__(3);

var Obj = __webpack_require__(1).Obj;

var lib = __webpack_require__(0);

var Parser =
/*#__PURE__*/
function (_Obj) {
  _inheritsLoose(Parser, _Obj);

  function Parser() {
    return _Obj.apply(this, arguments) || this;
  }

  var _proto = Parser.prototype;

  _proto.init = function init(tokens) {
    this.tokens = tokens;
    this.peeked = null;
    this.breakOnBlocks = null;
    this.dropLeadingWhitespace = false;
    this.extensions = [];
  };

  _proto.nextToken = function nextToken(withWhitespace) {
    var tok;

    if (this.peeked) {
      if (!withWhitespace && this.peeked.type === lexer.TOKEN_WHITESPACE) {
        this.peeked = null;
      } else {
        tok = this.peeked;
        this.peeked = null;
        return tok;
      }
    }

    tok = this.tokens.nextToken();

    if (!withWhitespace) {
      while (tok && tok.type === lexer.TOKEN_WHITESPACE) {
        tok = this.tokens.nextToken();
      }
    }

    return tok;
  };

  _proto.peekToken = function peekToken() {
    this.peeked = this.peeked || this.nextToken();
    return this.peeked;
  };

  _proto.pushToken = function pushToken(tok) {
    if (this.peeked) {
      throw new Error('pushToken: can only push one token on between reads');
    }

    this.peeked = tok;
  };

  _proto.error = function error(msg, lineno, colno) {
    if (lineno === undefined || colno === undefined) {
      var tok = this.peekToken() || {};
      lineno = tok.lineno;
      colno = tok.colno;
    }

    if (lineno !== undefined) {
      lineno += 1;
    }

    if (colno !== undefined) {
      colno += 1;
    }

    return new lib.TemplateError(msg, lineno, colno);
  };

  _proto.fail = function fail(msg, lineno, colno) {
    throw this.error(msg, lineno, colno);
  };

  _proto.skip = function skip(type) {
    var tok = this.nextToken();

    if (!tok || tok.type !== type) {
      this.pushToken(tok);
      return false;
    }

    return true;
  };

  _proto.expect = function expect(type) {
    var tok = this.nextToken();

    if (tok.type !== type) {
      this.fail('expected ' + type + ', got ' + tok.type, tok.lineno, tok.colno);
    }

    return tok;
  };

  _proto.skipValue = function skipValue(type, val) {
    var tok = this.nextToken();

    if (!tok || tok.type !== type || tok.value !== val) {
      this.pushToken(tok);
      return false;
    }

    return true;
  };

  _proto.skipSymbol = function skipSymbol(val) {
    return this.skipValue(lexer.TOKEN_SYMBOL, val);
  };

  _proto.advanceAfterBlockEnd = function advanceAfterBlockEnd(name) {
    var tok;

    if (!name) {
      tok = this.peekToken();

      if (!tok) {
        this.fail('unexpected end of file');
      }

      if (tok.type !== lexer.TOKEN_SYMBOL) {
        this.fail('advanceAfterBlockEnd: expected symbol token or ' + 'explicit name to be passed');
      }

      name = this.nextToken().value;
    }

    tok = this.nextToken();

    if (tok && tok.type === lexer.TOKEN_BLOCK_END) {
      if (tok.value.charAt(0) === '-') {
        this.dropLeadingWhitespace = true;
      }
    } else {
      this.fail('expected block end in ' + name + ' statement');
    }

    return tok;
  };

  _proto.advanceAfterVariableEnd = function advanceAfterVariableEnd() {
    var tok = this.nextToken();

    if (tok && tok.type === lexer.TOKEN_VARIABLE_END) {
      this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.VARIABLE_END.length - 1) === '-';
    } else {
      this.pushToken(tok);
      this.fail('expected variable end');
    }
  };

  _proto.parseFor = function parseFor() {
    var forTok = this.peekToken();
    var node;
    var endBlock;

    if (this.skipSymbol('for')) {
      node = new nodes.For(forTok.lineno, forTok.colno);
      endBlock = 'endfor';
    } else if (this.skipSymbol('asyncEach')) {
      node = new nodes.AsyncEach(forTok.lineno, forTok.colno);
      endBlock = 'endeach';
    } else if (this.skipSymbol('asyncAll')) {
      node = new nodes.AsyncAll(forTok.lineno, forTok.colno);
      endBlock = 'endall';
    } else {
      this.fail('parseFor: expected for{Async}', forTok.lineno, forTok.colno);
    }

    node.name = this.parsePrimary();

    if (!(node.name instanceof nodes.Symbol)) {
      this.fail('parseFor: variable name expected for loop');
    }

    var type = this.peekToken().type;

    if (type === lexer.TOKEN_COMMA) {
      // key/value iteration
      var key = node.name;
      node.name = new nodes.Array(key.lineno, key.colno);
      node.name.addChild(key);

      while (this.skip(lexer.TOKEN_COMMA)) {
        var prim = this.parsePrimary();
        node.name.addChild(prim);
      }
    }

    if (!this.skipSymbol('in')) {
      this.fail('parseFor: expected "in" keyword for loop', forTok.lineno, forTok.colno);
    }

    node.arr = this.parseExpression();
    this.advanceAfterBlockEnd(forTok.value);
    node.body = this.parseUntilBlocks(endBlock, 'else');

    if (this.skipSymbol('else')) {
      this.advanceAfterBlockEnd('else');
      node.else_ = this.parseUntilBlocks(endBlock);
    }

    this.advanceAfterBlockEnd();
    return node;
  };

  _proto.parseMacro = function parseMacro() {
    var macroTok = this.peekToken();

    if (!this.skipSymbol('macro')) {
      this.fail('expected macro');
    }

    var name = this.parsePrimary(true);
    var args = this.parseSignature();
    var node = new nodes.Macro(macroTok.lineno, macroTok.colno, name, args);
    this.advanceAfterBlockEnd(macroTok.value);
    node.body = this.parseUntilBlocks('endmacro');
    this.advanceAfterBlockEnd();
    return node;
  };

  _proto.parseCall = function parseCall() {
    // a call block is parsed as a normal FunCall, but with an added
    // 'caller' kwarg which is a Caller node.
    var callTok = this.peekToken();

    if (!this.skipSymbol('call')) {
      this.fail('expected call');
    }

    var callerArgs = this.parseSignature(true) || new nodes.NodeList();
    var macroCall = this.parsePrimary();
    this.advanceAfterBlockEnd(callTok.value);
    var body = this.parseUntilBlocks('endcall');
    this.advanceAfterBlockEnd();
    var callerName = new nodes.Symbol(callTok.lineno, callTok.colno, 'caller');
    var callerNode = new nodes.Caller(callTok.lineno, callTok.colno, callerName, callerArgs, body); // add the additional caller kwarg, adding kwargs if necessary

    var args = macroCall.args.children;

    if (!(args[args.length - 1] instanceof nodes.KeywordArgs)) {
      args.push(new nodes.KeywordArgs());
    }

    var kwargs = args[args.length - 1];
    kwargs.addChild(new nodes.Pair(callTok.lineno, callTok.colno, callerName, callerNode));
    return new nodes.Output(callTok.lineno, callTok.colno, [macroCall]);
  };

  _proto.parseWithContext = function parseWithContext() {
    var tok = this.peekToken();
    var withContext = null;

    if (this.skipSymbol('with')) {
      withContext = true;
    } else if (this.skipSymbol('without')) {
      withContext = false;
    }

    if (withContext !== null) {
      if (!this.skipSymbol('context')) {
        this.fail('parseFrom: expected context after with/without', tok.lineno, tok.colno);
      }
    }

    return withContext;
  };

  _proto.parseImport = function parseImport() {
    var importTok = this.peekToken();

    if (!this.skipSymbol('import')) {
      this.fail('parseImport: expected import', importTok.lineno, importTok.colno);
    }

    var template = this.parseExpression();

    if (!this.skipSymbol('as')) {
      this.fail('parseImport: expected "as" keyword', importTok.lineno, importTok.colno);
    }

    var target = this.parseExpression();
    var withContext = this.parseWithContext();
    var node = new nodes.Import(importTok.lineno, importTok.colno, template, target, withContext);
    this.advanceAfterBlockEnd(importTok.value);
    return node;
  };

  _proto.parseFrom = function parseFrom() {
    var fromTok = this.peekToken();

    if (!this.skipSymbol('from')) {
      this.fail('parseFrom: expected from');
    }

    var template = this.parseExpression();

    if (!this.skipSymbol('import')) {
      this.fail('parseFrom: expected import', fromTok.lineno, fromTok.colno);
    }

    var names = new nodes.NodeList();
    var withContext;

    while (1) {
      // eslint-disable-line no-constant-condition
      var nextTok = this.peekToken();

      if (nextTok.type === lexer.TOKEN_BLOCK_END) {
        if (!names.children.length) {
          this.fail('parseFrom: Expected at least one import name', fromTok.lineno, fromTok.colno);
        } // Since we are manually advancing past the block end,
        // need to keep track of whitespace control (normally
        // this is done in `advanceAfterBlockEnd`


        if (nextTok.value.charAt(0) === '-') {
          this.dropLeadingWhitespace = true;
        }

        this.nextToken();
        break;
      }

      if (names.children.length > 0 && !this.skip(lexer.TOKEN_COMMA)) {
        this.fail('parseFrom: expected comma', fromTok.lineno, fromTok.colno);
      }

      var name = this.parsePrimary();

      if (name.value.charAt(0) === '_') {
        this.fail('parseFrom: names starting with an underscore cannot be imported', name.lineno, name.colno);
      }

      if (this.skipSymbol('as')) {
        var alias = this.parsePrimary();
        names.addChild(new nodes.Pair(name.lineno, name.colno, name, alias));
      } else {
        names.addChild(name);
      }

      withContext = this.parseWithContext();
    }

    return new nodes.FromImport(fromTok.lineno, fromTok.colno, template, names, withContext);
  };

  _proto.parseBlock = function parseBlock() {
    var tag = this.peekToken();

    if (!this.skipSymbol('block')) {
      this.fail('parseBlock: expected block', tag.lineno, tag.colno);
    }

    var node = new nodes.Block(tag.lineno, tag.colno);
    node.name = this.parsePrimary();

    if (!(node.name instanceof nodes.Symbol)) {
      this.fail('parseBlock: variable name expected', tag.lineno, tag.colno);
    }

    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('endblock');
    this.skipSymbol('endblock');
    this.skipSymbol(node.name.value);
    var tok = this.peekToken();

    if (!tok) {
      this.fail('parseBlock: expected endblock, got end of file');
    }

    this.advanceAfterBlockEnd(tok.value);
    return node;
  };

  _proto.parseExtends = function parseExtends() {
    var tagName = 'extends';
    var tag = this.peekToken();

    if (!this.skipSymbol(tagName)) {
      this.fail('parseTemplateRef: expected ' + tagName);
    }

    var node = new nodes.Extends(tag.lineno, tag.colno);
    node.template = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    return node;
  };

  _proto.parseInclude = function parseInclude() {
    var tagName = 'include';
    var tag = this.peekToken();

    if (!this.skipSymbol(tagName)) {
      this.fail('parseInclude: expected ' + tagName);
    }

    var node = new nodes.Include(tag.lineno, tag.colno);
    node.template = this.parseExpression();

    if (this.skipSymbol('ignore') && this.skipSymbol('missing')) {
      node.ignoreMissing = true;
    }

    this.advanceAfterBlockEnd(tag.value);
    return node;
  };

  _proto.parseIf = function parseIf() {
    var tag = this.peekToken();
    var node;

    if (this.skipSymbol('if') || this.skipSymbol('elif') || this.skipSymbol('elseif')) {
      node = new nodes.If(tag.lineno, tag.colno);
    } else if (this.skipSymbol('ifAsync')) {
      node = new nodes.IfAsync(tag.lineno, tag.colno);
    } else {
      this.fail('parseIf: expected if, elif, or elseif', tag.lineno, tag.colno);
    }

    node.cond = this.parseExpression();
    this.advanceAfterBlockEnd(tag.value);
    node.body = this.parseUntilBlocks('elif', 'elseif', 'else', 'endif');
    var tok = this.peekToken();

    switch (tok && tok.value) {
      case 'elseif':
      case 'elif':
        node.else_ = this.parseIf();
        break;

      case 'else':
        this.advanceAfterBlockEnd();
        node.else_ = this.parseUntilBlocks('endif');
        this.advanceAfterBlockEnd();
        break;

      case 'endif':
        node.else_ = null;
        this.advanceAfterBlockEnd();
        break;

      default:
        this.fail('parseIf: expected elif, else, or endif, got end of file');
    }

    return node;
  };

  _proto.parseSet = function parseSet() {
    var tag = this.peekToken();

    if (!this.skipSymbol('set')) {
      this.fail('parseSet: expected set', tag.lineno, tag.colno);
    }

    var node = new nodes.Set(tag.lineno, tag.colno, []);
    var target;

    while (target = this.parsePrimary()) {
      node.targets.push(target);

      if (!this.skip(lexer.TOKEN_COMMA)) {
        break;
      }
    }

    if (!this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
      if (!this.skip(lexer.TOKEN_BLOCK_END)) {
        this.fail('parseSet: expected = or block end in set tag', tag.lineno, tag.colno);
      } else {
        node.body = new nodes.Capture(tag.lineno, tag.colno, this.parseUntilBlocks('endset'));
        node.value = null;
        this.advanceAfterBlockEnd();
      }
    } else {
      node.value = this.parseExpression();
      this.advanceAfterBlockEnd(tag.value);
    }

    return node;
  };

  _proto.parseSwitch = function parseSwitch() {
    /*
     * Store the tag names in variables in case someone ever wants to
     * customize this.
     */
    var switchStart = 'switch';
    var switchEnd = 'endswitch';
    var caseStart = 'case';
    var caseDefault = 'default'; // Get the switch tag.

    var tag = this.peekToken(); // fail early if we get some unexpected tag.

    if (!this.skipSymbol(switchStart) && !this.skipSymbol(caseStart) && !this.skipSymbol(caseDefault)) {
      this.fail('parseSwitch: expected "switch," "case" or "default"', tag.lineno, tag.colno);
    } // parse the switch expression


    var expr = this.parseExpression(); // advance until a start of a case, a default case or an endswitch.

    this.advanceAfterBlockEnd(switchStart);
    this.parseUntilBlocks(caseStart, caseDefault, switchEnd); // this is the first case. it could also be an endswitch, we'll check.

    var tok = this.peekToken(); // create new variables for our cases and default case.

    var cases = [];
    var defaultCase; // while we're dealing with new cases nodes...

    do {
      // skip the start symbol and get the case expression
      this.skipSymbol(caseStart);
      var cond = this.parseExpression();
      this.advanceAfterBlockEnd(switchStart); // get the body of the case node and add it to the array of cases.

      var body = this.parseUntilBlocks(caseStart, caseDefault, switchEnd);
      cases.push(new nodes.Case(tok.line, tok.col, cond, body)); // get our next case

      tok = this.peekToken();
    } while (tok && tok.value === caseStart); // we either have a default case or a switch end.


    switch (tok.value) {
      case caseDefault:
        this.advanceAfterBlockEnd();
        defaultCase = this.parseUntilBlocks(switchEnd);
        this.advanceAfterBlockEnd();
        break;

      case switchEnd:
        this.advanceAfterBlockEnd();
        break;

      default:
        // otherwise bail because EOF
        this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.');
    } // and return the switch node.


    return new nodes.Switch(tag.lineno, tag.colno, expr, cases, defaultCase);
  };

  _proto.parseStatement = function parseStatement() {
    var tok = this.peekToken();
    var node;

    if (tok.type !== lexer.TOKEN_SYMBOL) {
      this.fail('tag name expected', tok.lineno, tok.colno);
    }

    if (this.breakOnBlocks && lib.indexOf(this.breakOnBlocks, tok.value) !== -1) {
      return null;
    }

    switch (tok.value) {
      case 'raw':
        return this.parseRaw();

      case 'verbatim':
        return this.parseRaw('verbatim');

      case 'if':
      case 'ifAsync':
        return this.parseIf();

      case 'for':
      case 'asyncEach':
      case 'asyncAll':
        return this.parseFor();

      case 'block':
        return this.parseBlock();

      case 'extends':
        return this.parseExtends();

      case 'include':
        return this.parseInclude();

      case 'set':
        return this.parseSet();

      case 'macro':
        return this.parseMacro();

      case 'call':
        return this.parseCall();

      case 'import':
        return this.parseImport();

      case 'from':
        return this.parseFrom();

      case 'filter':
        return this.parseFilterStatement();

      case 'switch':
        return this.parseSwitch();

      default:
        if (this.extensions.length) {
          for (var i = 0; i < this.extensions.length; i++) {
            var ext = this.extensions[i];

            if (lib.indexOf(ext.tags || [], tok.value) !== -1) {
              return ext.parse(this, nodes, lexer);
            }
          }
        }

        this.fail('unknown block tag: ' + tok.value, tok.lineno, tok.colno);
    }

    return node;
  };

  _proto.parseRaw = function parseRaw(tagName) {
    tagName = tagName || 'raw';
    var endTagName = 'end' + tagName; // Look for upcoming raw blocks (ignore all other kinds of blocks)

    var rawBlockRegex = new RegExp('([\\s\\S]*?){%\\s*(' + tagName + '|' + endTagName + ')\\s*(?=%})%}');
    var rawLevel = 1;
    var str = '';
    var matches = null; // Skip opening raw token
    // Keep this token to track line and column numbers

    var begun = this.advanceAfterBlockEnd(); // Exit when there's nothing to match
    // or when we've found the matching "endraw" block

    while ((matches = this.tokens._extractRegex(rawBlockRegex)) && rawLevel > 0) {
      var all = matches[0];
      var pre = matches[1];
      var blockName = matches[2]; // Adjust rawlevel

      if (blockName === tagName) {
        rawLevel += 1;
      } else if (blockName === endTagName) {
        rawLevel -= 1;
      } // Add to str


      if (rawLevel === 0) {
        // We want to exclude the last "endraw"
        str += pre; // Move tokenizer to beginning of endraw block

        this.tokens.backN(all.length - pre.length);
      } else {
        str += all;
      }
    }

    return new nodes.Output(begun.lineno, begun.colno, [new nodes.TemplateData(begun.lineno, begun.colno, str)]);
  };

  _proto.parsePostfix = function parsePostfix(node) {
    var lookup;
    var tok = this.peekToken();

    while (tok) {
      if (tok.type === lexer.TOKEN_LEFT_PAREN) {
        // Function call
        node = new nodes.FunCall(tok.lineno, tok.colno, node, this.parseSignature());
      } else if (tok.type === lexer.TOKEN_LEFT_BRACKET) {
        // Reference
        lookup = this.parseAggregate();

        if (lookup.children.length > 1) {
          this.fail('invalid index');
        }

        node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup.children[0]);
      } else if (tok.type === lexer.TOKEN_OPERATOR && tok.value === '.') {
        // Reference
        this.nextToken();
        var val = this.nextToken();

        if (val.type !== lexer.TOKEN_SYMBOL) {
          this.fail('expected name as lookup value, got ' + val.value, val.lineno, val.colno);
        } // Make a literal string because it's not a variable
        // reference


        lookup = new nodes.Literal(val.lineno, val.colno, val.value);
        node = new nodes.LookupVal(tok.lineno, tok.colno, node, lookup);
      } else {
        break;
      }

      tok = this.peekToken();
    }

    return node;
  };

  _proto.parseExpression = function parseExpression() {
    var node = this.parseInlineIf();
    return node;
  };

  _proto.parseInlineIf = function parseInlineIf() {
    var node = this.parseOr();

    if (this.skipSymbol('if')) {
      var condNode = this.parseOr();
      var bodyNode = node;
      node = new nodes.InlineIf(node.lineno, node.colno);
      node.body = bodyNode;
      node.cond = condNode;

      if (this.skipSymbol('else')) {
        node.else_ = this.parseOr();
      } else {
        node.else_ = null;
      }
    }

    return node;
  };

  _proto.parseOr = function parseOr() {
    var node = this.parseAnd();

    while (this.skipSymbol('or')) {
      var node2 = this.parseAnd();
      node = new nodes.Or(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseAnd = function parseAnd() {
    var node = this.parseNot();

    while (this.skipSymbol('and')) {
      var node2 = this.parseNot();
      node = new nodes.And(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseNot = function parseNot() {
    var tok = this.peekToken();

    if (this.skipSymbol('not')) {
      return new nodes.Not(tok.lineno, tok.colno, this.parseNot());
    }

    return this.parseIn();
  };

  _proto.parseIn = function parseIn() {
    var node = this.parseIs();

    while (1) {
      // eslint-disable-line no-constant-condition
      // check if the next token is 'not'
      var tok = this.nextToken();

      if (!tok) {
        break;
      }

      var invert = tok.type === lexer.TOKEN_SYMBOL && tok.value === 'not'; // if it wasn't 'not', put it back

      if (!invert) {
        this.pushToken(tok);
      }

      if (this.skipSymbol('in')) {
        var node2 = this.parseIs();
        node = new nodes.In(node.lineno, node.colno, node, node2);

        if (invert) {
          node = new nodes.Not(node.lineno, node.colno, node);
        }
      } else {
        // if we'd found a 'not' but this wasn't an 'in', put back the 'not'
        if (invert) {
          this.pushToken(tok);
        }

        break;
      }
    }

    return node;
  } // I put this right after "in" in the operator precedence stack. That can
  // obviously be changed to be closer to Jinja.
  ;

  _proto.parseIs = function parseIs() {
    var node = this.parseCompare(); // look for an is

    if (this.skipSymbol('is')) {
      // look for a not
      var not = this.skipSymbol('not'); // get the next node

      var node2 = this.parseCompare(); // create an Is node using the next node and the info from our Is node.

      node = new nodes.Is(node.lineno, node.colno, node, node2); // if we have a Not, create a Not node from our Is node.

      if (not) {
        node = new nodes.Not(node.lineno, node.colno, node);
      }
    } // return the node.


    return node;
  };

  _proto.parseCompare = function parseCompare() {
    var compareOps = ['==', '===', '!=', '!==', '<', '>', '<=', '>='];
    var expr = this.parseConcat();
    var ops = [];

    while (1) {
      // eslint-disable-line no-constant-condition
      var tok = this.nextToken();

      if (!tok) {
        break;
      } else if (compareOps.indexOf(tok.value) !== -1) {
        ops.push(new nodes.CompareOperand(tok.lineno, tok.colno, this.parseConcat(), tok.value));
      } else {
        this.pushToken(tok);
        break;
      }
    }

    if (ops.length) {
      return new nodes.Compare(ops[0].lineno, ops[0].colno, expr, ops);
    } else {
      return expr;
    }
  } // finds the '~' for string concatenation
  ;

  _proto.parseConcat = function parseConcat() {
    var node = this.parseAdd();

    while (this.skipValue(lexer.TOKEN_TILDE, '~')) {
      var node2 = this.parseAdd();
      node = new nodes.Concat(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseAdd = function parseAdd() {
    var node = this.parseSub();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
      var node2 = this.parseSub();
      node = new nodes.Add(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseSub = function parseSub() {
    var node = this.parseMul();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
      var node2 = this.parseMul();
      node = new nodes.Sub(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseMul = function parseMul() {
    var node = this.parseDiv();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '*')) {
      var node2 = this.parseDiv();
      node = new nodes.Mul(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseDiv = function parseDiv() {
    var node = this.parseFloorDiv();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '/')) {
      var node2 = this.parseFloorDiv();
      node = new nodes.Div(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseFloorDiv = function parseFloorDiv() {
    var node = this.parseMod();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '//')) {
      var node2 = this.parseMod();
      node = new nodes.FloorDiv(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseMod = function parseMod() {
    var node = this.parsePow();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '%')) {
      var node2 = this.parsePow();
      node = new nodes.Mod(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parsePow = function parsePow() {
    var node = this.parseUnary();

    while (this.skipValue(lexer.TOKEN_OPERATOR, '**')) {
      var node2 = this.parseUnary();
      node = new nodes.Pow(node.lineno, node.colno, node, node2);
    }

    return node;
  };

  _proto.parseUnary = function parseUnary(noFilters) {
    var tok = this.peekToken();
    var node;

    if (this.skipValue(lexer.TOKEN_OPERATOR, '-')) {
      node = new nodes.Neg(tok.lineno, tok.colno, this.parseUnary(true));
    } else if (this.skipValue(lexer.TOKEN_OPERATOR, '+')) {
      node = new nodes.Pos(tok.lineno, tok.colno, this.parseUnary(true));
    } else {
      node = this.parsePrimary();
    }

    if (!noFilters) {
      node = this.parseFilter(node);
    }

    return node;
  };

  _proto.parsePrimary = function parsePrimary(noPostfix) {
    var tok = this.nextToken();
    var val;
    var node = null;

    if (!tok) {
      this.fail('expected expression, got end of file');
    } else if (tok.type === lexer.TOKEN_STRING) {
      val = tok.value;
    } else if (tok.type === lexer.TOKEN_INT) {
      val = parseInt(tok.value, 10);
    } else if (tok.type === lexer.TOKEN_FLOAT) {
      val = parseFloat(tok.value);
    } else if (tok.type === lexer.TOKEN_BOOLEAN) {
      if (tok.value === 'true') {
        val = true;
      } else if (tok.value === 'false') {
        val = false;
      } else {
        this.fail('invalid boolean: ' + tok.value, tok.lineno, tok.colno);
      }
    } else if (tok.type === lexer.TOKEN_NONE) {
      val = null;
    } else if (tok.type === lexer.TOKEN_REGEX) {
      val = new RegExp(tok.value.body, tok.value.flags);
    }

    if (val !== undefined) {
      node = new nodes.Literal(tok.lineno, tok.colno, val);
    } else if (tok.type === lexer.TOKEN_SYMBOL) {
      node = new nodes.Symbol(tok.lineno, tok.colno, tok.value);
    } else {
      // See if it's an aggregate type, we need to push the
      // current delimiter token back on
      this.pushToken(tok);
      node = this.parseAggregate();
    }

    if (!noPostfix) {
      node = this.parsePostfix(node);
    }

    if (node) {
      return node;
    } else {
      throw this.error("unexpected token: " + tok.value, tok.lineno, tok.colno);
    }
  };

  _proto.parseFilterName = function parseFilterName() {
    var tok = this.expect(lexer.TOKEN_SYMBOL);
    var name = tok.value;

    while (this.skipValue(lexer.TOKEN_OPERATOR, '.')) {
      name += '.' + this.expect(lexer.TOKEN_SYMBOL).value;
    }

    return new nodes.Symbol(tok.lineno, tok.colno, name);
  };

  _proto.parseFilterArgs = function parseFilterArgs(node) {
    if (this.peekToken().type === lexer.TOKEN_LEFT_PAREN) {
      // Get a FunCall node and add the parameters to the
      // filter
      var call = this.parsePostfix(node);
      return call.args.children;
    }

    return [];
  };

  _proto.parseFilter = function parseFilter(node) {
    while (this.skip(lexer.TOKEN_PIPE)) {
      var name = this.parseFilterName();
      node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [node].concat(this.parseFilterArgs(node))));
    }

    return node;
  };

  _proto.parseFilterStatement = function parseFilterStatement() {
    var filterTok = this.peekToken();

    if (!this.skipSymbol('filter')) {
      this.fail('parseFilterStatement: expected filter');
    }

    var name = this.parseFilterName();
    var args = this.parseFilterArgs(name);
    this.advanceAfterBlockEnd(filterTok.value);
    var body = new nodes.Capture(name.lineno, name.colno, this.parseUntilBlocks('endfilter'));
    this.advanceAfterBlockEnd();
    var node = new nodes.Filter(name.lineno, name.colno, name, new nodes.NodeList(name.lineno, name.colno, [body].concat(args)));
    return new nodes.Output(name.lineno, name.colno, [node]);
  };

  _proto.parseAggregate = function parseAggregate() {
    var tok = this.nextToken();
    var node;

    switch (tok.type) {
      case lexer.TOKEN_LEFT_PAREN:
        node = new nodes.Group(tok.lineno, tok.colno);
        break;

      case lexer.TOKEN_LEFT_BRACKET:
        node = new nodes.Array(tok.lineno, tok.colno);
        break;

      case lexer.TOKEN_LEFT_CURLY:
        node = new nodes.Dict(tok.lineno, tok.colno);
        break;

      default:
        return null;
    }

    while (1) {
      // eslint-disable-line no-constant-condition
      var type = this.peekToken().type;

      if (type === lexer.TOKEN_RIGHT_PAREN || type === lexer.TOKEN_RIGHT_BRACKET || type === lexer.TOKEN_RIGHT_CURLY) {
        this.nextToken();
        break;
      }

      if (node.children.length > 0) {
        if (!this.skip(lexer.TOKEN_COMMA)) {
          this.fail('parseAggregate: expected comma after expression', tok.lineno, tok.colno);
        }
      }

      if (node instanceof nodes.Dict) {
        // TODO: check for errors
        var key = this.parsePrimary(); // We expect a key/value pair for dicts, separated by a
        // colon

        if (!this.skip(lexer.TOKEN_COLON)) {
          this.fail('parseAggregate: expected colon after dict key', tok.lineno, tok.colno);
        } // TODO: check for errors


        var value = this.parseExpression();
        node.addChild(new nodes.Pair(key.lineno, key.colno, key, value));
      } else {
        // TODO: check for errors
        var expr = this.parseExpression();
        node.addChild(expr);
      }
    }

    return node;
  };

  _proto.parseSignature = function parseSignature(tolerant, noParens) {
    var tok = this.peekToken();

    if (!noParens && tok.type !== lexer.TOKEN_LEFT_PAREN) {
      if (tolerant) {
        return null;
      } else {
        this.fail('expected arguments', tok.lineno, tok.colno);
      }
    }

    if (tok.type === lexer.TOKEN_LEFT_PAREN) {
      tok = this.nextToken();
    }

    var args = new nodes.NodeList(tok.lineno, tok.colno);
    var kwargs = new nodes.KeywordArgs(tok.lineno, tok.colno);
    var checkComma = false;

    while (1) {
      // eslint-disable-line no-constant-condition
      tok = this.peekToken();

      if (!noParens && tok.type === lexer.TOKEN_RIGHT_PAREN) {
        this.nextToken();
        break;
      } else if (noParens && tok.type === lexer.TOKEN_BLOCK_END) {
        break;
      }

      if (checkComma && !this.skip(lexer.TOKEN_COMMA)) {
        this.fail('parseSignature: expected comma after expression', tok.lineno, tok.colno);
      } else {
        var arg = this.parseExpression();

        if (this.skipValue(lexer.TOKEN_OPERATOR, '=')) {
          kwargs.addChild(new nodes.Pair(arg.lineno, arg.colno, arg, this.parseExpression()));
        } else {
          args.addChild(arg);
        }
      }

      checkComma = true;
    }

    if (kwargs.children.length) {
      args.addChild(kwargs);
    }

    return args;
  };

  _proto.parseUntilBlocks = function parseUntilBlocks() {
    var prev = this.breakOnBlocks;

    for (var _len = arguments.length, blockNames = new Array(_len), _key = 0; _key < _len; _key++) {
      blockNames[_key] = arguments[_key];
    }

    this.breakOnBlocks = blockNames;
    var ret = this.parse();
    this.breakOnBlocks = prev;
    return ret;
  };

  _proto.parseNodes = function parseNodes() {
    var tok;
    var buf = [];

    while (tok = this.nextToken()) {
      if (tok.type === lexer.TOKEN_DATA) {
        var data = tok.value;
        var nextToken = this.peekToken();
        var nextVal = nextToken && nextToken.value; // If the last token has "-" we need to trim the
        // leading whitespace of the data. This is marked with
        // the `dropLeadingWhitespace` variable.

        if (this.dropLeadingWhitespace) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/^\s*/, '');
          this.dropLeadingWhitespace = false;
        } // Same for the succeeding block start token


        if (nextToken && (nextToken.type === lexer.TOKEN_BLOCK_START && nextVal.charAt(nextVal.length - 1) === '-' || nextToken.type === lexer.TOKEN_VARIABLE_START && nextVal.charAt(this.tokens.tags.VARIABLE_START.length) === '-' || nextToken.type === lexer.TOKEN_COMMENT && nextVal.charAt(this.tokens.tags.COMMENT_START.length) === '-')) {
          // TODO: this could be optimized (don't use regex)
          data = data.replace(/\s*$/, '');
        }

        buf.push(new nodes.Output(tok.lineno, tok.colno, [new nodes.TemplateData(tok.lineno, tok.colno, data)]));
      } else if (tok.type === lexer.TOKEN_BLOCK_START) {
        this.dropLeadingWhitespace = false;
        var n = this.parseStatement();

        if (!n) {
          break;
        }

        buf.push(n);
      } else if (tok.type === lexer.TOKEN_VARIABLE_START) {
        var e = this.parseExpression();
        this.dropLeadingWhitespace = false;
        this.advanceAfterVariableEnd();
        buf.push(new nodes.Output(tok.lineno, tok.colno, [e]));
      } else if (tok.type === lexer.TOKEN_COMMENT) {
        this.dropLeadingWhitespace = tok.value.charAt(tok.value.length - this.tokens.tags.COMMENT_END.length - 1) === '-';
      } else {
        // Ignore comments, otherwise this should be an error
        this.fail('Unexpected token at top-level: ' + tok.type, tok.lineno, tok.colno);
      }
    }

    return buf;
  };

  _proto.parse = function parse() {
    return new nodes.NodeList(0, 0, this.parseNodes());
  };

  _proto.parseAsRoot = function parseAsRoot() {
    return new nodes.Root(0, 0, this.parseNodes());
  };

  return Parser;
}(Obj); // var util = require('util');
// var l = lexer.lex('{%- if x -%}\n hello {% endif %}');
// var t;
// while((t = l.nextToken())) {
//     console.log(util.inspect(t));
// }
// var p = new Parser(lexer.lex('hello {% filter title %}' +
//                              'Hello madam how are you' +
//                              '{% endfilter %}'));
// var n = p.parseAsRoot();
// nodes.printNodes(n);


module.exports = {
  parse: function parse(src, extensions, opts) {
    var p = new Parser(lexer.lex(src, opts));

    if (extensions !== undefined) {
      p.extensions = extensions;
    }

    return p.parseAsRoot();
  },
  Parser: Parser
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var whitespaceChars = " \n\t\r\xA0";
var delimChars = '()[]{}%*-+~/#,:|.<>=!';
var intChars = '0123456789';
var BLOCK_START = '{%';
var BLOCK_END = '%}';
var VARIABLE_START = '{{';
var VARIABLE_END = '}}';
var COMMENT_START = '{#';
var COMMENT_END = '#}';
var TOKEN_STRING = 'string';
var TOKEN_WHITESPACE = 'whitespace';
var TOKEN_DATA = 'data';
var TOKEN_BLOCK_START = 'block-start';
var TOKEN_BLOCK_END = 'block-end';
var TOKEN_VARIABLE_START = 'variable-start';
var TOKEN_VARIABLE_END = 'variable-end';
var TOKEN_COMMENT = 'comment';
var TOKEN_LEFT_PAREN = 'left-paren';
var TOKEN_RIGHT_PAREN = 'right-paren';
var TOKEN_LEFT_BRACKET = 'left-bracket';
var TOKEN_RIGHT_BRACKET = 'right-bracket';
var TOKEN_LEFT_CURLY = 'left-curly';
var TOKEN_RIGHT_CURLY = 'right-curly';
var TOKEN_OPERATOR = 'operator';
var TOKEN_COMMA = 'comma';
var TOKEN_COLON = 'colon';
var TOKEN_TILDE = 'tilde';
var TOKEN_PIPE = 'pipe';
var TOKEN_INT = 'int';
var TOKEN_FLOAT = 'float';
var TOKEN_BOOLEAN = 'boolean';
var TOKEN_NONE = 'none';
var TOKEN_SYMBOL = 'symbol';
var TOKEN_SPECIAL = 'special';
var TOKEN_REGEX = 'regex';

function token(type, value, lineno, colno) {
  return {
    type: type,
    value: value,
    lineno: lineno,
    colno: colno
  };
}

var Tokenizer =
/*#__PURE__*/
function () {
  function Tokenizer(str, opts) {
    this.str = str;
    this.index = 0;
    this.len = str.length;
    this.lineno = 0;
    this.colno = 0;
    this.in_code = false;
    opts = opts || {};
    var tags = opts.tags || {};
    this.tags = {
      BLOCK_START: tags.blockStart || BLOCK_START,
      BLOCK_END: tags.blockEnd || BLOCK_END,
      VARIABLE_START: tags.variableStart || VARIABLE_START,
      VARIABLE_END: tags.variableEnd || VARIABLE_END,
      COMMENT_START: tags.commentStart || COMMENT_START,
      COMMENT_END: tags.commentEnd || COMMENT_END
    };
    this.trimBlocks = !!opts.trimBlocks;
    this.lstripBlocks = !!opts.lstripBlocks;
  }

  var _proto = Tokenizer.prototype;

  _proto.nextToken = function nextToken() {
    var lineno = this.lineno;
    var colno = this.colno;
    var tok;

    if (this.in_code) {
      // Otherwise, if we are in a block parse it as code
      var cur = this.current();

      if (this.isFinished()) {
        // We have nothing else to parse
        return null;
      } else if (cur === '"' || cur === '\'') {
        // We've hit a string
        return token(TOKEN_STRING, this._parseString(cur), lineno, colno);
      } else if (tok = this._extract(whitespaceChars)) {
        // We hit some whitespace
        return token(TOKEN_WHITESPACE, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.BLOCK_END)) || (tok = this._extractString('-' + this.tags.BLOCK_END))) {
        // Special check for the block end tag
        //
        // It is a requirement that start and end tags are composed of
        // delimiter characters (%{}[] etc), and our code always
        // breaks on delimiters so we can assume the token parsing
        // doesn't consume these elsewhere
        this.in_code = false;

        if (this.trimBlocks) {
          cur = this.current();

          if (cur === '\n') {
            // Skip newline
            this.forward();
          } else if (cur === '\r') {
            // Skip CRLF newline
            this.forward();
            cur = this.current();

            if (cur === '\n') {
              this.forward();
            } else {
              // Was not a CRLF, so go back
              this.back();
            }
          }
        }

        return token(TOKEN_BLOCK_END, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_END)) || (tok = this._extractString('-' + this.tags.VARIABLE_END))) {
        // Special check for variable end tag (see above)
        this.in_code = false;
        return token(TOKEN_VARIABLE_END, tok, lineno, colno);
      } else if (cur === 'r' && this.str.charAt(this.index + 1) === '/') {
        // Skip past 'r/'.
        this.forwardN(2); // Extract until the end of the regex -- / ends it, \/ does not.

        var regexBody = '';

        while (!this.isFinished()) {
          if (this.current() === '/' && this.previous() !== '\\') {
            this.forward();
            break;
          } else {
            regexBody += this.current();
            this.forward();
          }
        } // Check for flags.
        // The possible flags are according to https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp)


        var POSSIBLE_FLAGS = ['g', 'i', 'm', 'y'];
        var regexFlags = '';

        while (!this.isFinished()) {
          var isCurrentAFlag = POSSIBLE_FLAGS.indexOf(this.current()) !== -1;

          if (isCurrentAFlag) {
            regexFlags += this.current();
            this.forward();
          } else {
            break;
          }
        }

        return token(TOKEN_REGEX, {
          body: regexBody,
          flags: regexFlags
        }, lineno, colno);
      } else if (delimChars.indexOf(cur) !== -1) {
        // We've hit a delimiter (a special char like a bracket)
        this.forward();
        var complexOps = ['==', '===', '!=', '!==', '<=', '>=', '//', '**'];
        var curComplex = cur + this.current();
        var type;

        if (lib.indexOf(complexOps, curComplex) !== -1) {
          this.forward();
          cur = curComplex; // See if this is a strict equality/inequality comparator

          if (lib.indexOf(complexOps, curComplex + this.current()) !== -1) {
            cur = curComplex + this.current();
            this.forward();
          }
        }

        switch (cur) {
          case '(':
            type = TOKEN_LEFT_PAREN;
            break;

          case ')':
            type = TOKEN_RIGHT_PAREN;
            break;

          case '[':
            type = TOKEN_LEFT_BRACKET;
            break;

          case ']':
            type = TOKEN_RIGHT_BRACKET;
            break;

          case '{':
            type = TOKEN_LEFT_CURLY;
            break;

          case '}':
            type = TOKEN_RIGHT_CURLY;
            break;

          case ',':
            type = TOKEN_COMMA;
            break;

          case ':':
            type = TOKEN_COLON;
            break;

          case '~':
            type = TOKEN_TILDE;
            break;

          case '|':
            type = TOKEN_PIPE;
            break;

          default:
            type = TOKEN_OPERATOR;
        }

        return token(type, cur, lineno, colno);
      } else {
        // We are not at whitespace or a delimiter, so extract the
        // text and parse it
        tok = this._extractUntil(whitespaceChars + delimChars);

        if (tok.match(/^[-+]?[0-9]+$/)) {
          if (this.current() === '.') {
            this.forward();

            var dec = this._extract(intChars);

            return token(TOKEN_FLOAT, tok + '.' + dec, lineno, colno);
          } else {
            return token(TOKEN_INT, tok, lineno, colno);
          }
        } else if (tok.match(/^(true|false)$/)) {
          return token(TOKEN_BOOLEAN, tok, lineno, colno);
        } else if (tok === 'none') {
          return token(TOKEN_NONE, tok, lineno, colno);
          /*
           * Added to make the test `null is null` evaluate truthily.
           * Otherwise, Nunjucks will look up null in the context and
           * return `undefined`, which is not what we want. This *may* have
           * consequences is someone is using null in their templates as a
           * variable.
           */
        } else if (tok === 'null') {
          return token(TOKEN_NONE, tok, lineno, colno);
        } else if (tok) {
          return token(TOKEN_SYMBOL, tok, lineno, colno);
        } else {
          throw new Error('Unexpected value while parsing: ' + tok);
        }
      }
    } else {
      // Parse out the template text, breaking on tag
      // delimiters because we need to look for block/variable start
      // tags (don't use the full delimChars for optimization)
      var beginChars = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);

      if (this.isFinished()) {
        return null;
      } else if ((tok = this._extractString(this.tags.BLOCK_START + '-')) || (tok = this._extractString(this.tags.BLOCK_START))) {
        this.in_code = true;
        return token(TOKEN_BLOCK_START, tok, lineno, colno);
      } else if ((tok = this._extractString(this.tags.VARIABLE_START + '-')) || (tok = this._extractString(this.tags.VARIABLE_START))) {
        this.in_code = true;
        return token(TOKEN_VARIABLE_START, tok, lineno, colno);
      } else {
        tok = '';
        var data;
        var inComment = false;

        if (this._matches(this.tags.COMMENT_START)) {
          inComment = true;
          tok = this._extractString(this.tags.COMMENT_START);
        } // Continually consume text, breaking on the tag delimiter
        // characters and checking to see if it's a start tag.
        //
        // We could hit the end of the template in the middle of
        // our looping, so check for the null return value from
        // _extractUntil


        while ((data = this._extractUntil(beginChars)) !== null) {
          tok += data;

          if ((this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !inComment) {
            if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= tok.length) {
              var lastLine = tok.slice(-this.colno);

              if (/^\s+$/.test(lastLine)) {
                // Remove block leading whitespace from beginning of the string
                tok = tok.slice(0, -this.colno);

                if (!tok.length) {
                  // All data removed, collapse to avoid unnecessary nodes
                  // by returning next token (block start)
                  return this.nextToken();
                }
              }
            } // If it is a start tag, stop looping


            break;
          } else if (this._matches(this.tags.COMMENT_END)) {
            if (!inComment) {
              throw new Error('unexpected end of comment');
            }

            tok += this._extractString(this.tags.COMMENT_END);
            break;
          } else {
            // It does not match any tag, so add the character and
            // carry on
            tok += this.current();
            this.forward();
          }
        }

        if (data === null && inComment) {
          throw new Error('expected end of comment, got end of file');
        }

        return token(inComment ? TOKEN_COMMENT : TOKEN_DATA, tok, lineno, colno);
      }
    }
  };

  _proto._parseString = function _parseString(delimiter) {
    this.forward();
    var str = '';

    while (!this.isFinished() && this.current() !== delimiter) {
      var cur = this.current();

      if (cur === '\\') {
        this.forward();

        switch (this.current()) {
          case 'n':
            str += '\n';
            break;

          case 't':
            str += '\t';
            break;

          case 'r':
            str += '\r';
            break;

          default:
            str += this.current();
        }

        this.forward();
      } else {
        str += cur;
        this.forward();
      }
    }

    this.forward();
    return str;
  };

  _proto._matches = function _matches(str) {
    if (this.index + str.length > this.len) {
      return null;
    }

    var m = this.str.slice(this.index, this.index + str.length);
    return m === str;
  };

  _proto._extractString = function _extractString(str) {
    if (this._matches(str)) {
      this.forwardN(str.length);
      return str;
    }

    return null;
  };

  _proto._extractUntil = function _extractUntil(charString) {
    // Extract all non-matching chars, with the default matching set
    // to everything
    return this._extractMatching(true, charString || '');
  };

  _proto._extract = function _extract(charString) {
    // Extract all matching chars (no default, so charString must be
    // explicit)
    return this._extractMatching(false, charString);
  };

  _proto._extractMatching = function _extractMatching(breakOnMatch, charString) {
    // Pull out characters until a breaking char is hit.
    // If breakOnMatch is false, a non-matching char stops it.
    // If breakOnMatch is true, a matching char stops it.
    if (this.isFinished()) {
      return null;
    }

    var first = charString.indexOf(this.current()); // Only proceed if the first character doesn't meet our condition

    if (breakOnMatch && first === -1 || !breakOnMatch && first !== -1) {
      var t = this.current();
      this.forward(); // And pull out all the chars one at a time until we hit a
      // breaking char

      var idx = charString.indexOf(this.current());

      while ((breakOnMatch && idx === -1 || !breakOnMatch && idx !== -1) && !this.isFinished()) {
        t += this.current();
        this.forward();
        idx = charString.indexOf(this.current());
      }

      return t;
    }

    return '';
  };

  _proto._extractRegex = function _extractRegex(regex) {
    var matches = this.currentStr().match(regex);

    if (!matches) {
      return null;
    } // Move forward whatever was matched


    this.forwardN(matches[0].length);
    return matches;
  };

  _proto.isFinished = function isFinished() {
    return this.index >= this.len;
  };

  _proto.forwardN = function forwardN(n) {
    for (var i = 0; i < n; i++) {
      this.forward();
    }
  };

  _proto.forward = function forward() {
    this.index++;

    if (this.previous() === '\n') {
      this.lineno++;
      this.colno = 0;
    } else {
      this.colno++;
    }
  };

  _proto.backN = function backN(n) {
    for (var i = 0; i < n; i++) {
      this.back();
    }
  };

  _proto.back = function back() {
    this.index--;

    if (this.current() === '\n') {
      this.lineno--;
      var idx = this.src.lastIndexOf('\n', this.index - 1);

      if (idx === -1) {
        this.colno = this.index;
      } else {
        this.colno = this.index - idx;
      }
    } else {
      this.colno--;
    }
  } // current returns current character
  ;

  _proto.current = function current() {
    if (!this.isFinished()) {
      return this.str.charAt(this.index);
    }

    return '';
  } // currentStr returns what's left of the unparsed string
  ;

  _proto.currentStr = function currentStr() {
    if (!this.isFinished()) {
      return this.str.substr(this.index);
    }

    return '';
  };

  _proto.previous = function previous() {
    return this.str.charAt(this.index - 1);
  };

  return Tokenizer;
}();

module.exports = {
  lex: function lex(src, opts) {
    return new Tokenizer(src, opts);
  },
  TOKEN_STRING: TOKEN_STRING,
  TOKEN_WHITESPACE: TOKEN_WHITESPACE,
  TOKEN_DATA: TOKEN_DATA,
  TOKEN_BLOCK_START: TOKEN_BLOCK_START,
  TOKEN_BLOCK_END: TOKEN_BLOCK_END,
  TOKEN_VARIABLE_START: TOKEN_VARIABLE_START,
  TOKEN_VARIABLE_END: TOKEN_VARIABLE_END,
  TOKEN_COMMENT: TOKEN_COMMENT,
  TOKEN_LEFT_PAREN: TOKEN_LEFT_PAREN,
  TOKEN_RIGHT_PAREN: TOKEN_RIGHT_PAREN,
  TOKEN_LEFT_BRACKET: TOKEN_LEFT_BRACKET,
  TOKEN_RIGHT_BRACKET: TOKEN_RIGHT_BRACKET,
  TOKEN_LEFT_CURLY: TOKEN_LEFT_CURLY,
  TOKEN_RIGHT_CURLY: TOKEN_RIGHT_CURLY,
  TOKEN_OPERATOR: TOKEN_OPERATOR,
  TOKEN_COMMA: TOKEN_COMMA,
  TOKEN_COLON: TOKEN_COLON,
  TOKEN_TILDE: TOKEN_TILDE,
  TOKEN_PIPE: TOKEN_PIPE,
  TOKEN_INT: TOKEN_INT,
  TOKEN_FLOAT: TOKEN_FLOAT,
  TOKEN_BOOLEAN: TOKEN_BOOLEAN,
  TOKEN_NONE: TOKEN_NONE,
  TOKEN_SYMBOL: TOKEN_SYMBOL,
  TOKEN_SPECIAL: TOKEN_SPECIAL,
  TOKEN_REGEX: TOKEN_REGEX
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loader = __webpack_require__(6);

var _require = __webpack_require__(19),
    PrecompiledLoader = _require.PrecompiledLoader;

var WebLoader =
/*#__PURE__*/
function (_Loader) {
  _inheritsLoose(WebLoader, _Loader);

  function WebLoader(baseURL, opts) {
    var _this;

    _this = _Loader.call(this) || this;
    _this.baseURL = baseURL || '.';
    opts = opts || {}; // By default, the cache is turned off because there's no way
    // to "watch" templates over HTTP, so they are re-downloaded
    // and compiled each time. (Remember, PRECOMPILE YOUR
    // TEMPLATES in production!)

    _this.useCache = !!opts.useCache; // We default `async` to false so that the simple synchronous
    // API can be used when you aren't doing anything async in
    // your templates (which is most of the time). This performs a
    // sync ajax request, but that's ok because it should *only*
    // happen in development. PRECOMPILE YOUR TEMPLATES.

    _this.async = !!opts.async;
    return _this;
  }

  var _proto = WebLoader.prototype;

  _proto.resolve = function resolve(from, to) {
    throw new Error('relative templates not support in the browser yet');
  };

  _proto.getSource = function getSource(name, cb) {
    var _this2 = this;

    var useCache = this.useCache;
    var result;
    this.fetch(this.baseURL + '/' + name, function (err, src) {
      if (err) {
        if (cb) {
          cb(err.content);
        } else if (err.status === 404) {
          result = null;
        } else {
          throw err.content;
        }
      } else {
        result = {
          src: src,
          path: name,
          noCache: !useCache
        };

        _this2.emit('load', name, result);

        if (cb) {
          cb(null, result);
        }
      }
    }); // if this WebLoader isn't running asynchronously, the
    // fetch above would actually run sync and we'll have a
    // result here

    return result;
  };

  _proto.fetch = function fetch(url, cb) {
    // Only in the browser please
    if (typeof window === 'undefined') {
      throw new Error('WebLoader can only by used in a browser');
    }

    var ajax = new XMLHttpRequest();
    var loading = true;

    ajax.onreadystatechange = function () {
      if (ajax.readyState === 4 && loading) {
        loading = false;

        if (ajax.status === 0 || ajax.status === 200) {
          cb(null, ajax.responseText);
        } else {
          cb({
            status: ajax.status,
            content: ajax.responseText
          });
        }
      }
    };

    url += (url.indexOf('?') === -1 ? '?' : '&') + 's=' + new Date().getTime();
    ajax.open('GET', url, this.async);
    ajax.send();
  };

  return WebLoader;
}(Loader);

module.exports = {
  WebLoader: WebLoader,
  PrecompiledLoader: PrecompiledLoader
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var _require = __webpack_require__(7),
    Environment = _require.Environment,
    Template = _require.Template;

var Loader = __webpack_require__(6);

var loaders = __webpack_require__(10);

var precompile = __webpack_require__(23);

var compiler = __webpack_require__(5);

var parser = __webpack_require__(8);

var lexer = __webpack_require__(9);

var runtime = __webpack_require__(2);

var nodes = __webpack_require__(3);

var installJinjaCompat = __webpack_require__(25); // A single instance of an environment, since this is so commonly used


var e;

function configure(templatesPath, opts) {
  opts = opts || {};

  if (lib.isObject(templatesPath)) {
    opts = templatesPath;
    templatesPath = null;
  }

  var TemplateLoader;

  if (loaders.FileSystemLoader) {
    TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
      watch: opts.watch,
      noCache: opts.noCache
    });
  } else if (loaders.WebLoader) {
    TemplateLoader = new loaders.WebLoader(templatesPath, {
      useCache: opts.web && opts.web.useCache,
      async: opts.web && opts.web.async
    });
  }

  e = new Environment(TemplateLoader, opts);

  if (opts && opts.express) {
    e.express(opts.express);
  }

  return e;
}

module.exports = {
  Environment: Environment,
  Template: Template,
  Loader: Loader,
  FileSystemLoader: loaders.FileSystemLoader,
  NodeResolveLoader: loaders.NodeResolveLoader,
  PrecompiledLoader: loaders.PrecompiledLoader,
  WebLoader: loaders.WebLoader,
  compiler: compiler,
  parser: parser,
  lexer: lexer,
  runtime: runtime,
  lib: lib,
  nodes: nodes,
  installJinjaCompat: installJinjaCompat,
  configure: configure,
  reset: function reset() {
    e = undefined;
  },
  compile: function compile(src, env, path, eagerCompile) {
    if (!e) {
      configure();
    }

    return new Template(src, env, path, eagerCompile);
  },
  render: function render(name, ctx, cb) {
    if (!e) {
      configure();
    }

    return e.render(name, ctx, cb);
  },
  renderString: function renderString(src, ctx, cb) {
    if (!e) {
      configure();
    }

    return e.renderString(src, ctx, cb);
  },
  precompile: precompile ? precompile.precompile : undefined,
  precompileString: precompile ? precompile.precompileString : undefined
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// rawAsap provides everything we need except exception management.
var rawAsap = __webpack_require__(13);
// RawTasks are recycled to reduce GC churn.
var freeTasks = [];
// We queue errors to ensure they are thrown in right order (FIFO).
// Array-as-queue is good enough here, since we are just dealing with exceptions.
var pendingErrors = [];
var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

function throwFirstError() {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

/**
 * Calls a task as soon as possible after returning, in its own event, with priority
 * over other events like animation, reflow, and repaint. An error thrown from an
 * event will not interrupt, nor even substantially slow down the processing of
 * other events, but will be rather postponed to a lower priority event.
 * @param {{call}} task A callable object, typically a function that takes no
 * arguments.
 */
module.exports = asap;
function asap(task) {
    var rawTask;
    if (freeTasks.length) {
        rawTask = freeTasks.pop();
    } else {
        rawTask = new RawTask();
    }
    rawTask.task = task;
    rawAsap(rawTask);
}

// We wrap tasks with recyclable task objects.  A task object implements
// `call`, just like a function.
function RawTask() {
    this.task = null;
}

// The sole purpose of wrapping the task is to catch the exception and recycle
// the task object after its single use.
RawTask.prototype.call = function () {
    try {
        this.task.call();
    } catch (error) {
        if (asap.onerror) {
            // This hook exists purely for testing purposes.
            // Its name will be periodically randomized to break any code that
            // depends on its existence.
            asap.onerror(error);
        } else {
            // In a web browser, exceptions are not fatal. However, to avoid
            // slowing down the queue of pending tasks, we rethrow the error in a
            // lower priority turn.
            pendingErrors.push(error);
            requestErrorThrow();
        }
    } finally {
        this.task = null;
        freeTasks[freeTasks.length] = this;
    }
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

// Use the fastest means possible to execute a task in its own turn, with
// priority over other events including IO, animation, reflow, and redraw
// events in browsers.
//
// An exception thrown by a task will permanently interrupt the processing of
// subsequent tasks. The higher level `asap` function ensures that if an
// exception is thrown by a task, that the task queue will continue flushing as
// soon as possible, but if you use `rawAsap` directly, you are responsible to
// either ensure that no exceptions are thrown from your task, or to manually
// call `rawAsap.requestFlush` if an exception is thrown.
module.exports = rawAsap;
function rawAsap(task) {
    if (!queue.length) {
        requestFlush();
        flushing = true;
    }
    // Equivalent to push, but avoids a function call.
    queue[queue.length] = task;
}

var queue = [];
// Once a flush has been requested, no further calls to `requestFlush` are
// necessary until the next `flush` completes.
var flushing = false;
// `requestFlush` is an implementation-specific method that attempts to kick
// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
// the event queue before yielding to the browser's own event loop.
var requestFlush;
// The position of the next task to execute in the task queue. This is
// preserved between calls to `flush` so that it can be resumed if
// a task throws an exception.
var index = 0;
// If a task schedules additional tasks recursively, the task queue can grow
// unbounded. To prevent memory exhaustion, the task queue will periodically
// truncate already-completed tasks.
var capacity = 1024;

// The flush function processes all tasks that have been scheduled with
// `rawAsap` unless and until one of those tasks throws an exception.
// If a task throws an exception, `flush` ensures that its state will remain
// consistent and will resume where it left off when called again.
// However, `flush` does not make any arrangements to be called again if an
// exception is thrown.
function flush() {
    while (index < queue.length) {
        var currentIndex = index;
        // Advance the index before calling the task. This ensures that we will
        // begin flushing on the next task the task throws an error.
        index = index + 1;
        queue[currentIndex].call();
        // Prevent leaking memory for long chains of recursive calls to `asap`.
        // If we call `asap` within tasks scheduled by `asap`, the queue will
        // grow, but to avoid an O(n) walk for every task we execute, we don't
        // shift tasks off the queue after they have been executed.
        // Instead, we periodically shift 1024 tasks off the queue.
        if (index > capacity) {
            // Manually shift all values starting at the index back to the
            // beginning of the queue.
            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
                queue[scan] = queue[scan + index];
            }
            queue.length -= index;
            index = 0;
        }
    }
    queue.length = 0;
    index = 0;
    flushing = false;
}

// `requestFlush` is implemented using a strategy based on data collected from
// every available SauceLabs Selenium web driver worker at time of writing.
// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
// have WebKitMutationObserver but not un-prefixed MutationObserver.
// Must use `global` or `self` instead of `window` to work in both frames and web
// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.

/* globals self */
var scope = typeof global !== "undefined" ? global : self;
var BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;

// MutationObservers are desirable because they have high priority and work
// reliably everywhere they are implemented.
// They are implemented in all modern browsers.
//
// - Android 4-4.3
// - Chrome 26-34
// - Firefox 14-29
// - Internet Explorer 11
// - iPad Safari 6-7.1
// - iPhone Safari 7-7.1
// - Safari 6-7
if (typeof BrowserMutationObserver === "function") {
    requestFlush = makeRequestCallFromMutationObserver(flush);

// MessageChannels are desirable because they give direct access to the HTML
// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
// 11-12, and in web workers in many engines.
// Although message channels yield to any queued rendering and IO tasks, they
// would be better than imposing the 4ms delay of timers.
// However, they do not work reliably in Internet Explorer or Safari.

// Internet Explorer 10 is the only browser that has setImmediate but does
// not have MutationObservers.
// Although setImmediate yields to the browser's renderer, it would be
// preferrable to falling back to setTimeout since it does not have
// the minimum 4ms penalty.
// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
// Desktop to a lesser extent) that renders both setImmediate and
// MessageChannel useless for the purposes of ASAP.
// https://github.com/kriskowal/q/issues/396

// Timers are implemented universally.
// We fall back to timers in workers in most engines, and in foreground
// contexts in the following browsers.
// However, note that even this simple case requires nuances to operate in a
// broad spectrum of browsers.
//
// - Firefox 3-13
// - Internet Explorer 6-9
// - iPad Safari 4.3
// - Lynx 2.8.7
} else {
    requestFlush = makeRequestCallFromTimer(flush);
}

// `requestFlush` requests that the high priority event queue be flushed as
// soon as possible.
// This is useful to prevent an error thrown in a task from stalling the event
// queue if the exception handled by Node.js’s
// `process.on("uncaughtException")` or by a domain.
rawAsap.requestFlush = requestFlush;

// To request a high priority event, we induce a mutation observer by toggling
// the text of a text node between "1" and "-1".
function makeRequestCallFromMutationObserver(callback) {
    var toggle = 1;
    var observer = new BrowserMutationObserver(callback);
    var node = document.createTextNode("");
    observer.observe(node, {characterData: true});
    return function requestCall() {
        toggle = -toggle;
        node.data = toggle;
    };
}

// The message channel technique was discovered by Malte Ubl and was the
// original foundation for this library.
// http://www.nonblocking.io/2011/06/windownexttick.html

// Safari 6.0.5 (at least) intermittently fails to create message ports on a
// page's first load. Thankfully, this version of Safari supports
// MutationObservers, so we don't need to fall back in that case.

// function makeRequestCallFromMessageChannel(callback) {
//     var channel = new MessageChannel();
//     channel.port1.onmessage = callback;
//     return function requestCall() {
//         channel.port2.postMessage(0);
//     };
// }

// For reasons explained above, we are also unable to use `setImmediate`
// under any circumstances.
// Even if we were, there is another bug in Internet Explorer 10.
// It is not sufficient to assign `setImmediate` to `requestFlush` because
// `setImmediate` must be called *by name* and therefore must be wrapped in a
// closure.
// Never forget.

// function makeRequestCallFromSetImmediate(callback) {
//     return function requestCall() {
//         setImmediate(callback);
//     };
// }

// Safari 6.0 has a problem where timers will get lost while the user is
// scrolling. This problem does not impact ASAP because Safari 6.0 supports
// mutation observers, so that implementation is used instead.
// However, if we ever elect to use timers in Safari, the prevalent work-around
// is to add a scroll event listener that calls for a flush.

// `setTimeout` does not call the passed callback if the delay is less than
// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
// even then.

function makeRequestCallFromTimer(callback) {
    return function requestCall() {
        // We dispatch a timeout with a specified delay of 0 for engines that
        // can reliably accommodate that request. This will usually be snapped
        // to a 4 milisecond delay, but once we're flushing, there's no delay
        // between events.
        var timeoutHandle = setTimeout(handleTimer, 0);
        // However, since this timer gets frequently dropped in Firefox
        // workers, we enlist an interval handle that will try to fire
        // an event 20 times per second until it succeeds.
        var intervalHandle = setInterval(handleTimer, 50);

        function handleTimer() {
            // Whichever timer succeeds will cancel both timers and
            // execute the callback.
            clearTimeout(timeoutHandle);
            clearInterval(intervalHandle);
            callback();
        }
    };
}

// This is for `asap.js` only.
// Its name will be periodically randomized to break any code that depends on
// its existence.
rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

// ASAP was originally a nextTick shim included in Q. This was factored out
// into this ASAP package. It was later adapted to RSVP which made further
// amendments. These decisions, particularly to marginalize MessageChannel and
// to capture the MutationObserver implementation in a closure, were integrated
// back into ASAP proper.
// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)))

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// MIT license (by Elan Shanker).
(function(globals) {
  'use strict';

  var executeSync = function(){
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'function'){
      args[0].apply(null, args.splice(1));
    }
  };

  var executeAsync = function(fn){
    if (typeof setImmediate === 'function') {
      setImmediate(fn);
    } else if (typeof process !== 'undefined' && process.nextTick) {
      process.nextTick(fn);
    } else {
      setTimeout(fn, 0);
    }
  };

  var makeIterator = function (tasks) {
    var makeCallback = function (index) {
      var fn = function () {
        if (tasks.length) {
          tasks[index].apply(null, arguments);
        }
        return fn.next();
      };
      fn.next = function () {
        return (index < tasks.length - 1) ? makeCallback(index + 1): null;
      };
      return fn;
    };
    return makeCallback(0);
  };
  
  var _isArray = Array.isArray || function(maybeArray){
    return Object.prototype.toString.call(maybeArray) === '[object Array]';
  };

  var waterfall = function (tasks, callback, forceAsync) {
    var nextTick = forceAsync ? executeAsync : executeSync;
    callback = callback || function () {};
    if (!_isArray(tasks)) {
      var err = new Error('First argument to waterfall must be an array of functions');
      return callback(err);
    }
    if (!tasks.length) {
      return callback();
    }
    var wrapIterator = function (iterator) {
      return function (err) {
        if (err) {
          callback.apply(null, arguments);
          callback = function () {};
        } else {
          var args = Array.prototype.slice.call(arguments, 1);
          var next = iterator.next();
          if (next) {
            args.push(wrapIterator(next));
          } else {
            args.push(callback);
          }
          nextTick(function () {
            iterator.apply(null, args);
          });
        }
      };
    };
    wrapIterator(makeIterator(tasks))();
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return waterfall;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // RequireJS
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = waterfall; // CommonJS
  } else {
    globals.waterfall = waterfall; // <script>
  }
})(this);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nodes = __webpack_require__(3);

var lib = __webpack_require__(0);

var sym = 0;

function gensym() {
  return 'hole_' + sym++;
} // copy-on-write version of map


function mapCOW(arr, func) {
  var res = null;

  for (var i = 0; i < arr.length; i++) {
    var item = func(arr[i]);

    if (item !== arr[i]) {
      if (!res) {
        res = arr.slice();
      }

      res[i] = item;
    }
  }

  return res || arr;
}

function walk(ast, func, depthFirst) {
  if (!(ast instanceof nodes.Node)) {
    return ast;
  }

  if (!depthFirst) {
    var astT = func(ast);

    if (astT && astT !== ast) {
      return astT;
    }
  }

  if (ast instanceof nodes.NodeList) {
    var children = mapCOW(ast.children, function (node) {
      return walk(node, func, depthFirst);
    });

    if (children !== ast.children) {
      ast = new nodes[ast.typename](ast.lineno, ast.colno, children);
    }
  } else if (ast instanceof nodes.CallExtension) {
    var args = walk(ast.args, func, depthFirst);
    var contentArgs = mapCOW(ast.contentArgs, function (node) {
      return walk(node, func, depthFirst);
    });

    if (args !== ast.args || contentArgs !== ast.contentArgs) {
      ast = new nodes[ast.typename](ast.extName, ast.prop, args, contentArgs);
    }
  } else {
    var props = ast.fields.map(function (field) {
      return ast[field];
    });
    var propsT = mapCOW(props, function (prop) {
      return walk(prop, func, depthFirst);
    });

    if (propsT !== props) {
      ast = new nodes[ast.typename](ast.lineno, ast.colno);
      propsT.forEach(function (prop, i) {
        ast[ast.fields[i]] = prop;
      });
    }
  }

  return depthFirst ? func(ast) || ast : ast;
}

function depthWalk(ast, func) {
  return walk(ast, func, true);
}

function _liftFilters(node, asyncFilters, prop) {
  var children = [];
  var walked = depthWalk(prop ? node[prop] : node, function (descNode) {
    var symbol;

    if (descNode instanceof nodes.Block) {
      return descNode;
    } else if (descNode instanceof nodes.Filter && lib.indexOf(asyncFilters, descNode.name.value) !== -1 || descNode instanceof nodes.CallExtensionAsync) {
      symbol = new nodes.Symbol(descNode.lineno, descNode.colno, gensym());
      children.push(new nodes.FilterAsync(descNode.lineno, descNode.colno, descNode.name, descNode.args, symbol));
    }

    return symbol;
  });

  if (prop) {
    node[prop] = walked;
  } else {
    node = walked;
  }

  if (children.length) {
    children.push(node);
    return new nodes.NodeList(node.lineno, node.colno, children);
  } else {
    return node;
  }
}

function liftFilters(ast, asyncFilters) {
  return depthWalk(ast, function (node) {
    if (node instanceof nodes.Output) {
      return _liftFilters(node, asyncFilters);
    } else if (node instanceof nodes.Set) {
      return _liftFilters(node, asyncFilters, 'value');
    } else if (node instanceof nodes.For) {
      return _liftFilters(node, asyncFilters, 'arr');
    } else if (node instanceof nodes.If) {
      return _liftFilters(node, asyncFilters, 'cond');
    } else if (node instanceof nodes.CallExtension) {
      return _liftFilters(node, asyncFilters, 'args');
    } else {
      return undefined;
    }
  });
}

function liftSuper(ast) {
  return walk(ast, function (blockNode) {
    if (!(blockNode instanceof nodes.Block)) {
      return;
    }

    var hasSuper = false;
    var symbol = gensym();
    blockNode.body = walk(blockNode.body, function (node) {
      // eslint-disable-line consistent-return
      if (node instanceof nodes.FunCall && node.name.value === 'super') {
        hasSuper = true;
        return new nodes.Symbol(node.lineno, node.colno, symbol);
      }
    });

    if (hasSuper) {
      blockNode.body.children.unshift(new nodes.Super(0, 0, blockNode.name, new nodes.Symbol(0, 0, symbol)));
    }
  });
}

function convertStatements(ast) {
  return depthWalk(ast, function (node) {
    if (!(node instanceof nodes.If) && !(node instanceof nodes.For)) {
      return undefined;
    }

    var async = false;
    walk(node, function (child) {
      if (child instanceof nodes.FilterAsync || child instanceof nodes.IfAsync || child instanceof nodes.AsyncEach || child instanceof nodes.AsyncAll || child instanceof nodes.CallExtensionAsync) {
        async = true; // Stop iterating by returning the node

        return child;
      }

      return undefined;
    });

    if (async) {
      if (node instanceof nodes.If) {
        return new nodes.IfAsync(node.lineno, node.colno, node.cond, node.body, node.else_);
      } else if (node instanceof nodes.For && !(node instanceof nodes.AsyncAll)) {
        return new nodes.AsyncEach(node.lineno, node.colno, node.arr, node.name, node.body, node.else_);
      }
    }

    return undefined;
  });
}

function cps(ast, asyncFilters) {
  return convertStatements(liftSuper(liftFilters(ast, asyncFilters)));
}

function transform(ast, asyncFilters) {
  return cps(ast, asyncFilters || []);
} // var parser = require('./parser');
// var src = 'hello {% foo %}{% endfoo %} end';
// var ast = transform(parser.parse(src, [new FooExtension()]), ['bar']);
// nodes.printNodes(ast);


module.exports = {
  transform: transform
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lib = __webpack_require__(0);

var r = __webpack_require__(2);

var exports = module.exports = {};

function normalize(value, defaultValue) {
  if (value === null || value === undefined || value === false) {
    return defaultValue;
  }

  return value;
}

exports.abs = Math.abs;

function isNaN(num) {
  return num !== num; // eslint-disable-line no-self-compare
}

function batch(arr, linecount, fillWith) {
  var i;
  var res = [];
  var tmp = [];

  for (i = 0; i < arr.length; i++) {
    if (i % linecount === 0 && tmp.length) {
      res.push(tmp);
      tmp = [];
    }

    tmp.push(arr[i]);
  }

  if (tmp.length) {
    if (fillWith) {
      for (i = tmp.length; i < linecount; i++) {
        tmp.push(fillWith);
      }
    }

    res.push(tmp);
  }

  return res;
}

exports.batch = batch;

function capitalize(str) {
  str = normalize(str, '');
  var ret = str.toLowerCase();
  return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
}

exports.capitalize = capitalize;

function center(str, width) {
  str = normalize(str, '');
  width = width || 80;

  if (str.length >= width) {
    return str;
  }

  var spaces = width - str.length;
  var pre = lib.repeat(' ', spaces / 2 - spaces % 2);
  var post = lib.repeat(' ', spaces / 2);
  return r.copySafeness(str, pre + str + post);
}

exports.center = center;

function default_(val, def, bool) {
  if (bool) {
    return val || def;
  } else {
    return val !== undefined ? val : def;
  }
} // TODO: it is confusing to export something called 'default'


exports['default'] = default_; // eslint-disable-line dot-notation

function dictsort(val, caseSensitive, by) {
  if (!lib.isObject(val)) {
    throw new lib.TemplateError('dictsort filter: val must be an object');
  }

  var array = []; // deliberately include properties from the object's prototype

  for (var k in val) {
    // eslint-disable-line guard-for-in, no-restricted-syntax
    array.push([k, val[k]]);
  }

  var si;

  if (by === undefined || by === 'key') {
    si = 0;
  } else if (by === 'value') {
    si = 1;
  } else {
    throw new lib.TemplateError('dictsort filter: You can only sort by either key or value');
  }

  array.sort(function (t1, t2) {
    var a = t1[si];
    var b = t2[si];

    if (!caseSensitive) {
      if (lib.isString(a)) {
        a = a.toUpperCase();
      }

      if (lib.isString(b)) {
        b = b.toUpperCase();
      }
    }

    return a > b ? 1 : a === b ? 0 : -1; // eslint-disable-line no-nested-ternary
  });
  return array;
}

exports.dictsort = dictsort;

function dump(obj, spaces) {
  return JSON.stringify(obj, null, spaces);
}

exports.dump = dump;

function escape(str) {
  if (str instanceof r.SafeString) {
    return str;
  }

  str = str === null || str === undefined ? '' : str;
  return r.markSafe(lib.escape(str.toString()));
}

exports.escape = escape;

function safe(str) {
  if (str instanceof r.SafeString) {
    return str;
  }

  str = str === null || str === undefined ? '' : str;
  return r.markSafe(str.toString());
}

exports.safe = safe;

function first(arr) {
  return arr[0];
}

exports.first = first;

function forceescape(str) {
  str = str === null || str === undefined ? '' : str;
  return r.markSafe(lib.escape(str.toString()));
}

exports.forceescape = forceescape;

function groupby(arr, attr) {
  return lib.groupBy(arr, attr);
}

exports.groupby = groupby;

function indent(str, width, indentfirst) {
  str = normalize(str, '');

  if (str === '') {
    return '';
  }

  width = width || 4; // let res = '';

  var lines = str.split('\n');
  var sp = lib.repeat(' ', width);
  var res = lines.map(function (l, i) {
    return i === 0 && !indentfirst ? l + "\n" : "" + sp + l + "\n";
  }).join('');
  return r.copySafeness(str, res);
}

exports.indent = indent;

function join(arr, del, attr) {
  del = del || '';

  if (attr) {
    arr = lib.map(arr, function (v) {
      return v[attr];
    });
  }

  return arr.join(del);
}

exports.join = join;

function last(arr) {
  return arr[arr.length - 1];
}

exports.last = last;

function lengthFilter(val) {
  var value = normalize(val, '');

  if (value !== undefined) {
    if (typeof Map === 'function' && value instanceof Map || typeof Set === 'function' && value instanceof Set) {
      // ECMAScript 2015 Maps and Sets
      return value.size;
    }

    if (lib.isObject(value) && !(value instanceof r.SafeString)) {
      // Objects (besides SafeStrings), non-primative Arrays
      return lib.keys(value).length;
    }

    return value.length;
  }

  return 0;
}

exports.length = lengthFilter;

function list(val) {
  if (lib.isString(val)) {
    return val.split('');
  } else if (lib.isObject(val)) {
    return lib._entries(val || {}).map(function (_ref) {
      var key = _ref[0],
          value = _ref[1];
      return {
        key: key,
        value: value
      };
    });
  } else if (lib.isArray(val)) {
    return val;
  } else {
    throw new lib.TemplateError('list filter: type not iterable');
  }
}

exports.list = list;

function lower(str) {
  str = normalize(str, '');
  return str.toLowerCase();
}

exports.lower = lower;

function nl2br(str) {
  if (str === null || str === undefined) {
    return '';
  }

  return r.copySafeness(str, str.replace(/\r\n|\n/g, '<br />\n'));
}

exports.nl2br = nl2br;

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

exports.random = random;

function rejectattr(arr, attr) {
  return arr.filter(function (item) {
    return !item[attr];
  });
}

exports.rejectattr = rejectattr;

function selectattr(arr, attr) {
  return arr.filter(function (item) {
    return !!item[attr];
  });
}

exports.selectattr = selectattr;

function replace(str, old, new_, maxCount) {
  var originalStr = str;

  if (old instanceof RegExp) {
    return str.replace(old, new_);
  }

  if (typeof maxCount === 'undefined') {
    maxCount = -1;
  }

  var res = ''; // Output
  // Cast Numbers in the search term to string

  if (typeof old === 'number') {
    old = '' + old;
  } else if (typeof old !== 'string') {
    // If it is something other than number or string,
    // return the original string
    return str;
  } // Cast numbers in the replacement to string


  if (typeof str === 'number') {
    str = '' + str;
  } // If by now, we don't have a string, throw it back


  if (typeof str !== 'string' && !(str instanceof r.SafeString)) {
    return str;
  } // ShortCircuits


  if (old === '') {
    // Mimic the python behaviour: empty string is replaced
    // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
    res = new_ + str.split('').join(new_) + new_;
    return r.copySafeness(str, res);
  }

  var nextIndex = str.indexOf(old); // if # of replacements to perform is 0, or the string to does
  // not contain the old value, return the string

  if (maxCount === 0 || nextIndex === -1) {
    return str;
  }

  var pos = 0;
  var count = 0; // # of replacements made

  while (nextIndex > -1 && (maxCount === -1 || count < maxCount)) {
    // Grab the next chunk of src string and add it with the
    // replacement, to the result
    res += str.substring(pos, nextIndex) + new_; // Increment our pointer in the src string

    pos = nextIndex + old.length;
    count++; // See if there are any more replacements to be made

    nextIndex = str.indexOf(old, pos);
  } // We've either reached the end, or done the max # of
  // replacements, tack on any remaining string


  if (pos < str.length) {
    res += str.substring(pos);
  }

  return r.copySafeness(originalStr, res);
}

exports.replace = replace;

function reverse(val) {
  var arr;

  if (lib.isString(val)) {
    arr = list(val);
  } else {
    // Copy it
    arr = lib.map(val, function (v) {
      return v;
    });
  }

  arr.reverse();

  if (lib.isString(val)) {
    return r.copySafeness(val, arr.join(''));
  }

  return arr;
}

exports.reverse = reverse;

function round(val, precision, method) {
  precision = precision || 0;
  var factor = Math.pow(10, precision);
  var rounder;

  if (method === 'ceil') {
    rounder = Math.ceil;
  } else if (method === 'floor') {
    rounder = Math.floor;
  } else {
    rounder = Math.round;
  }

  return rounder(val * factor) / factor;
}

exports.round = round;

function slice(arr, slices, fillWith) {
  var sliceLength = Math.floor(arr.length / slices);
  var extra = arr.length % slices;
  var res = [];
  var offset = 0;

  for (var i = 0; i < slices; i++) {
    var start = offset + i * sliceLength;

    if (i < extra) {
      offset++;
    }

    var end = offset + (i + 1) * sliceLength;
    var currSlice = arr.slice(start, end);

    if (fillWith && i >= extra) {
      currSlice.push(fillWith);
    }

    res.push(currSlice);
  }

  return res;
}

exports.slice = slice;

function sum(arr, attr, start) {
  if (start === void 0) {
    start = 0;
  }

  if (attr) {
    arr = lib.map(arr, function (v) {
      return v[attr];
    });
  }

  return start + arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

exports.sum = sum;
exports.sort = r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function (arr, reversed, caseSens, attr) {
  // Copy it
  var array = lib.map(arr, function (v) {
    return v;
  });
  array.sort(function (a, b) {
    var x = attr ? a[attr] : a;
    var y = attr ? b[attr] : b;

    if (!caseSens && lib.isString(x) && lib.isString(y)) {
      x = x.toLowerCase();
      y = y.toLowerCase();
    }

    if (x < y) {
      return reversed ? 1 : -1;
    } else if (x > y) {
      return reversed ? -1 : 1;
    } else {
      return 0;
    }
  });
  return array;
});

function string(obj) {
  return r.copySafeness(obj, obj);
}

exports.string = string;

function striptags(input, preserveLinebreaks) {
  input = normalize(input, '');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
  var trimmedInput = trim(input.replace(tags, ''));
  var res = '';

  if (preserveLinebreaks) {
    res = trimmedInput.replace(/^ +| +$/gm, '') // remove leading and trailing spaces
    .replace(/ +/g, ' ') // squash adjacent spaces
    .replace(/(\r\n)/g, '\n') // normalize linebreaks (CRLF -> LF)
    .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
  } else {
    res = trimmedInput.replace(/\s+/gi, ' ');
  }

  return r.copySafeness(input, res);
}

exports.striptags = striptags;

function title(str) {
  str = normalize(str, '');
  var words = str.split(' ').map(function (word) {
    return capitalize(word);
  });
  return r.copySafeness(str, words.join(' '));
}

exports.title = title;

function trim(str) {
  return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
}

exports.trim = trim;

function truncate(input, length, killwords, end) {
  var orig = input;
  input = normalize(input, '');
  length = length || 255;

  if (input.length <= length) {
    return input;
  }

  if (killwords) {
    input = input.substring(0, length);
  } else {
    var idx = input.lastIndexOf(' ', length);

    if (idx === -1) {
      idx = length;
    }

    input = input.substring(0, idx);
  }

  input += end !== undefined && end !== null ? end : '...';
  return r.copySafeness(orig, input);
}

exports.truncate = truncate;

function upper(str) {
  str = normalize(str, '');
  return str.toUpperCase();
}

exports.upper = upper;

function urlencode(obj) {
  var enc = encodeURIComponent;

  if (lib.isString(obj)) {
    return enc(obj);
  } else {
    var keyvals = lib.isArray(obj) ? obj : lib._entries(obj);
    return keyvals.map(function (_ref2) {
      var k = _ref2[0],
          v = _ref2[1];
      return enc(k) + "=" + enc(v);
    }).join('&');
  }
}

exports.urlencode = urlencode; // For the jinja regexp, see
// https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23

var puncRe = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/; // from http://blog.gerv.net/2011/05/html5_email_address_regexp/

var emailRe = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
var httpHttpsRe = /^https?:\/\/.*$/;
var wwwRe = /^www\./;
var tldRe = /\.(?:org|net|com)(?:\:|\/|$)/;

function urlize(str, length, nofollow) {
  if (isNaN(length)) {
    length = Infinity;
  }

  var noFollowAttr = nofollow === true ? ' rel="nofollow"' : '';
  var words = str.split(/(\s+)/).filter(function (word) {
    // If the word has no length, bail. This can happen for str with
    // trailing whitespace.
    return word && word.length;
  }).map(function (word) {
    var matches = word.match(puncRe);
    var possibleUrl = matches ? matches[1] : word;
    var shortUrl = possibleUrl.substr(0, length); // url that starts with http or https

    if (httpHttpsRe.test(possibleUrl)) {
      return "<a href=\"" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    } // url that starts with www.


    if (wwwRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    } // an email address of the form username@domain.tld


    if (emailRe.test(possibleUrl)) {
      return "<a href=\"mailto:" + possibleUrl + "\">" + possibleUrl + "</a>";
    } // url that ends in .com, .org or .net that is not an email address


    if (tldRe.test(possibleUrl)) {
      return "<a href=\"http://" + possibleUrl + "\"" + noFollowAttr + ">" + shortUrl + "</a>";
    }

    return word;
  });
  return words.join('');
}

exports.urlize = urlize;

function wordcount(str) {
  str = normalize(str, '');
  var words = str ? str.match(/\w+/g) : null;
  return words ? words.length : null;
}

exports.wordcount = wordcount;

function float(val, def) {
  var res = parseFloat(val);
  return isNaN(res) ? def : res;
}

exports.float = float;

function int(val, def) {
  var res = parseInt(val, 10);
  return isNaN(res) ? def : res;
}

exports.int = int; // Aliases

exports.d = exports.default;
exports.e = exports.escape;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Loader = __webpack_require__(6);

var PrecompiledLoader =
/*#__PURE__*/
function (_Loader) {
  _inheritsLoose(PrecompiledLoader, _Loader);

  function PrecompiledLoader(compiledTemplates) {
    var _this;

    _this = _Loader.call(this) || this;
    _this.precompiled = compiledTemplates || {};
    return _this;
  }

  var _proto = PrecompiledLoader.prototype;

  _proto.getSource = function getSource(name) {
    if (this.precompiled[name]) {
      return {
        src: {
          type: 'code',
          obj: this.precompiled[name]
        },
        path: name
      };
    }

    return null;
  };

  return PrecompiledLoader;
}(Loader);

module.exports = {
  PrecompiledLoader: PrecompiledLoader
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SafeString = __webpack_require__(2).SafeString;
/**
 * Returns `true` if the object is a function, otherwise `false`.
 * @param { any } value
 * @returns { boolean }
 */


function callable(value) {
  return typeof value === 'function';
}

exports.callable = callable;
/**
 * Returns `true` if the object is strictly not `undefined`.
 * @param { any } value
 * @returns { boolean }
 */

function defined(value) {
  return value !== undefined;
}

exports.defined = defined;
/**
 * Returns `true` if the operand (one) is divisble by the test's argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function divisibleby(one, two) {
  return one % two === 0;
}

exports.divisibleby = divisibleby;
/**
 * Returns true if the string has been escaped (i.e., is a SafeString).
 * @param { any } value
 * @returns { boolean }
 */

function escaped(value) {
  return value instanceof SafeString;
}

exports.escaped = escaped;
/**
 * Returns `true` if the arguments are strictly equal.
 * @param { any } one
 * @param { any } two
 */

function equalto(one, two) {
  return one === two;
}

exports.equalto = equalto; // Aliases

exports.eq = exports.equalto;
exports.sameas = exports.equalto;
/**
 * Returns `true` if the value is evenly divisible by 2.
 * @param { number } value
 * @returns { boolean }
 */

function even(value) {
  return value % 2 === 0;
}

exports.even = even;
/**
 * Returns `true` if the value is falsy - if I recall correctly, '', 0, false,
 * undefined, NaN or null. I don't know if we should stick to the default JS
 * behavior or attempt to replicate what Python believes should be falsy (i.e.,
 * empty arrays, empty dicts, not 0...).
 * @param { any } value
 * @returns { boolean }
 */

function falsy(value) {
  return !value;
}

exports.falsy = falsy;
/**
 * Returns `true` if the operand (one) is greater or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function ge(one, two) {
  return one >= two;
}

exports.ge = ge;
/**
 * Returns `true` if the operand (one) is greater than the test's argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function greaterthan(one, two) {
  return one > two;
}

exports.greaterthan = greaterthan; // alias

exports.gt = exports.greaterthan;
/**
 * Returns `true` if the operand (one) is less than or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function le(one, two) {
  return one <= two;
}

exports.le = le;
/**
 * Returns `true` if the operand (one) is less than the test's passed argument
 * (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function lessthan(one, two) {
  return one < two;
}

exports.lessthan = lessthan; // alias

exports.lt = exports.lessthan;
/**
 * Returns `true` if the string is lowercased.
 * @param { string } value
 * @returns { boolean }
 */

function lower(value) {
  return value.toLowerCase() === value;
}

exports.lower = lower;
/**
 * Returns `true` if the operand (one) is less than or equal to the test's
 * argument (two).
 * @param { number } one
 * @param { number } two
 * @returns { boolean }
 */

function ne(one, two) {
  return one !== two;
}

exports.ne = ne;
/**
 * Returns true if the value is strictly equal to `null`.
 * @param { any }
 * @returns { boolean }
 */

function nullTest(value) {
  return value === null;
}

exports.null = nullTest;
/**
 * Returns true if value is a number.
 * @param { any }
 * @returns { boolean }
 */

function number(value) {
  return typeof value === 'number';
}

exports.number = number;
/**
 * Returns `true` if the value is *not* evenly divisible by 2.
 * @param { number } value
 * @returns { boolean }
 */

function odd(value) {
  return value % 2 === 1;
}

exports.odd = odd;
/**
 * Returns `true` if the value is a string, `false` if not.
 * @param { any } value
 * @returns { boolean }
 */

function string(value) {
  return typeof value === 'string';
}

exports.string = string;
/**
 * Returns `true` if the value is not in the list of things considered falsy:
 * '', null, undefined, 0, NaN and false.
 * @param { any } value
 * @returns { boolean }
 */

function truthy(value) {
  return !!value;
}

exports.truthy = truthy;
/**
 * Returns `true` if the value is undefined.
 * @param { any } value
 * @returns { boolean }
 */

function undefinedTest(value) {
  return value === undefined;
}

exports.undefined = undefinedTest;
/**
 * Returns `true` if the string is uppercased.
 * @param { string } value
 * @returns { boolean }
 */

function upper(value) {
  return value.toUpperCase() === value;
}

exports.upper = upper;
/**
 * If ES6 features are available, returns `true` if the value implements the
 * `Symbol.iterator` method. If not, it's a string or Array.
 *
 * Could potentially cause issues if a browser exists that has Set and Map but
 * not Symbol.
 *
 * @param { any } value
 * @returns { boolean }
 */

function iterable(value) {
  if (typeof Symbol !== 'undefined') {
    return !!value[Symbol.iterator];
  } else {
    return Array.isArray(value) || typeof value === 'string';
  }
}

exports.iterable = iterable;
/**
 * If ES6 features are available, returns `true` if the value is an object hash
 * or an ES6 Map. Otherwise just return if it's an object hash.
 * @param { any } value
 * @returns { boolean }
 */

function mapping(value) {
  // only maps and object hashes
  var bool = value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value);

  if (Set) {
    return bool && !(value instanceof Set);
  } else {
    return bool;
  }
}

exports.mapping = mapping;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _cycler(items) {
  var index = -1;
  return {
    current: null,
    reset: function reset() {
      index = -1;
      this.current = null;
    },
    next: function next() {
      index++;

      if (index >= items.length) {
        index = 0;
      }

      this.current = items[index];
      return this.current;
    }
  };
}

function _joiner(sep) {
  sep = sep || ',';
  var first = true;
  return function () {
    var val = first ? '' : sep;
    first = false;
    return val;
  };
} // Making this a function instead so it returns a new object
// each time it's called. That way, if something like an environment
// uses it, they will each have their own copy.


function globals() {
  return {
    range: function range(start, stop, step) {
      if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
        step = 1;
      } else if (!step) {
        step = 1;
      }

      var arr = [];

      if (step > 0) {
        for (var i = start; i < stop; i += step) {
          arr.push(i);
        }
      } else {
        for (var _i = start; _i > stop; _i += step) {
          // eslint-disable-line for-direction
          arr.push(_i);
        }
      }

      return arr;
    },
    cycler: function cycler() {
      return _cycler(Array.prototype.slice.call(arguments));
    },
    joiner: function joiner(sep) {
      return _joiner(sep);
    }
  };
}

module.exports = globals;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(4);

module.exports = function express(env, app) {
  function NunjucksView(name, opts) {
    this.name = name;
    this.path = name;
    this.defaultEngine = opts.defaultEngine;
    this.ext = path.extname(name);

    if (!this.ext && !this.defaultEngine) {
      throw new Error('No default engine was specified and no extension was provided.');
    }

    if (!this.ext) {
      this.name += this.ext = (this.defaultEngine[0] !== '.' ? '.' : '') + this.defaultEngine;
    }
  }

  NunjucksView.prototype.render = function render(opts, cb) {
    env.render(this.name, opts, cb);
  };

  app.set('view', NunjucksView);
  app.set('nunjucksEnv', env);
  return env;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);

var path = __webpack_require__(4);

var _require = __webpack_require__(0),
    _prettifyError = _require._prettifyError;

var compiler = __webpack_require__(5);

var _require2 = __webpack_require__(7),
    Environment = _require2.Environment;

var precompileGlobal = __webpack_require__(24);

function match(filename, patterns) {
  if (!Array.isArray(patterns)) {
    return false;
  }

  return patterns.some(function (pattern) {
    return filename.match(pattern);
  });
}

function precompileString(str, opts) {
  opts = opts || {};
  opts.isString = true;
  var env = opts.env || new Environment([]);
  var wrapper = opts.wrapper || precompileGlobal;

  if (!opts.name) {
    throw new Error('the "name" option is required when compiling a string');
  }

  return wrapper([_precompile(str, opts.name, env)], opts);
}

function precompile(input, opts) {
  // The following options are available:
  //
  // * name: name of the template (auto-generated when compiling a directory)
  // * isString: input is a string, not a file path
  // * asFunction: generate a callable function
  // * force: keep compiling on error
  // * env: the Environment to use (gets extensions and async filters from it)
  // * include: which file/folders to include (folders are auto-included, files are auto-excluded)
  // * exclude: which file/folders to exclude (folders are auto-included, files are auto-excluded)
  // * wrapper: function(templates, opts) {...}
  //       Customize the output format to store the compiled template.
  //       By default, templates are stored in a global variable used by the runtime.
  //       A custom loader will be necessary to load your custom wrapper.
  opts = opts || {};
  var env = opts.env || new Environment([]);
  var wrapper = opts.wrapper || precompileGlobal;

  if (opts.isString) {
    return precompileString(input, opts);
  }

  var pathStats = fs.existsSync(input) && fs.statSync(input);
  var precompiled = [];
  var templates = [];

  function addTemplates(dir) {
    fs.readdirSync(dir).forEach(function (file) {
      var filepath = path.join(dir, file);
      var subpath = filepath.substr(path.join(input, '/').length);
      var stat = fs.statSync(filepath);

      if (stat && stat.isDirectory()) {
        subpath += '/';

        if (!match(subpath, opts.exclude)) {
          addTemplates(filepath);
        }
      } else if (match(subpath, opts.include)) {
        templates.push(filepath);
      }
    });
  }

  if (pathStats.isFile()) {
    precompiled.push(_precompile(fs.readFileSync(input, 'utf-8'), opts.name || input, env));
  } else if (pathStats.isDirectory()) {
    addTemplates(input);

    for (var i = 0; i < templates.length; i++) {
      var name = templates[i].replace(path.join(input, '/'), '');

      try {
        precompiled.push(_precompile(fs.readFileSync(templates[i], 'utf-8'), name, env));
      } catch (e) {
        if (opts.force) {
          // Don't stop generating the output if we're
          // forcing compilation.
          console.error(e); // eslint-disable-line no-console
        } else {
          throw e;
        }
      }
    }
  }

  return wrapper(precompiled, opts);
}

function _precompile(str, name, env) {
  env = env || new Environment([]);
  var asyncFilters = env.asyncFilters;
  var extensions = env.extensionsList;
  var template;
  name = name.replace(/\\/g, '/');

  try {
    template = compiler.compile(str, asyncFilters, extensions, name, env.opts);
  } catch (err) {
    throw _prettifyError(name, false, err);
  }

  return {
    name: name,
    template: template
  };
}

module.exports = {
  precompile: precompile,
  precompileString: precompileString
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function precompileGlobal(templates, opts) {
  var out = '';
  opts = opts || {};

  for (var i = 0; i < templates.length; i++) {
    var name = JSON.stringify(templates[i].name);
    var template = templates[i].template;
    out += '(function() {' + '(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})' + '[' + name + '] = (function() {\n' + template + '\n})();\n';

    if (opts.asFunction) {
      out += 'return function(ctx, cb) { return nunjucks.render(' + name + ', ctx, cb); }\n';
    }

    out += '})();\n';
  }

  return out;
}

module.exports = precompileGlobal;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

function installCompat() {
  'use strict';
  /* eslint-disable camelcase */
  // This must be called like `nunjucks.installCompat` so that `this`
  // references the nunjucks instance

  var runtime = this.runtime;
  var lib = this.lib; // Handle slim case where these 'modules' are excluded from the built source

  var Compiler = this.compiler.Compiler;
  var Parser = this.parser.Parser;
  var nodes = this.nodes;
  var lexer = this.lexer;
  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
  var orig_memberLookup = runtime.memberLookup;
  var orig_Compiler_assertType;
  var orig_Parser_parseAggregate;

  if (Compiler) {
    orig_Compiler_assertType = Compiler.prototype.assertType;
  }

  if (Parser) {
    orig_Parser_parseAggregate = Parser.prototype.parseAggregate;
  }

  function uninstall() {
    runtime.contextOrFrameLookup = orig_contextOrFrameLookup;
    runtime.memberLookup = orig_memberLookup;

    if (Compiler) {
      Compiler.prototype.assertType = orig_Compiler_assertType;
    }

    if (Parser) {
      Parser.prototype.parseAggregate = orig_Parser_parseAggregate;
    }
  }

  runtime.contextOrFrameLookup = function contextOrFrameLookup(context, frame, key) {
    var val = orig_contextOrFrameLookup.apply(this, arguments);

    if (val !== undefined) {
      return val;
    }

    switch (key) {
      case 'True':
        return true;

      case 'False':
        return false;

      case 'None':
        return null;

      default:
        return undefined;
    }
  };

  function getTokensState(tokens) {
    return {
      index: tokens.index,
      lineno: tokens.lineno,
      colno: tokens.colno
    };
  }

  if ("STD" !== 'SLIM' && nodes && Compiler && Parser) {
    // i.e., not slim mode
    var Slice = nodes.Node.extend('Slice', {
      fields: ['start', 'stop', 'step'],
      init: function init(lineno, colno, start, stop, step) {
        start = start || new nodes.Literal(lineno, colno, null);
        stop = stop || new nodes.Literal(lineno, colno, null);
        step = step || new nodes.Literal(lineno, colno, 1);
        this.parent(lineno, colno, start, stop, step);
      }
    });

    Compiler.prototype.assertType = function assertType(node) {
      if (node instanceof Slice) {
        return;
      }

      orig_Compiler_assertType.apply(this, arguments);
    };

    Compiler.prototype.compileSlice = function compileSlice(node, frame) {
      this._emit('(');

      this._compileExpression(node.start, frame);

      this._emit('),(');

      this._compileExpression(node.stop, frame);

      this._emit('),(');

      this._compileExpression(node.step, frame);

      this._emit(')');
    };

    Parser.prototype.parseAggregate = function parseAggregate() {
      var _this = this;

      var origState = getTokensState(this.tokens); // Set back one accounting for opening bracket/parens

      origState.colno--;
      origState.index--;

      try {
        return orig_Parser_parseAggregate.apply(this);
      } catch (e) {
        var errState = getTokensState(this.tokens);

        var rethrow = function rethrow() {
          lib._assign(_this.tokens, errState);

          return e;
        }; // Reset to state before original parseAggregate called


        lib._assign(this.tokens, origState);

        this.peeked = false;
        var tok = this.peekToken();

        if (tok.type !== lexer.TOKEN_LEFT_BRACKET) {
          throw rethrow();
        } else {
          this.nextToken();
        }

        var node = new Slice(tok.lineno, tok.colno); // If we don't encounter a colon while parsing, this is not a slice,
        // so re-raise the original exception.

        var isSlice = false;

        for (var i = 0; i <= node.fields.length; i++) {
          if (this.skip(lexer.TOKEN_RIGHT_BRACKET)) {
            break;
          }

          if (i === node.fields.length) {
            if (isSlice) {
              this.fail('parseSlice: too many slice components', tok.lineno, tok.colno);
            } else {
              break;
            }
          }

          if (this.skip(lexer.TOKEN_COLON)) {
            isSlice = true;
          } else {
            var field = node.fields[i];
            node[field] = this.parseExpression();
            isSlice = this.skip(lexer.TOKEN_COLON) || isSlice;
          }
        }

        if (!isSlice) {
          throw rethrow();
        }

        return new nodes.Array(tok.lineno, tok.colno, [node]);
      }
    };
  }

  function sliceLookup(obj, start, stop, step) {
    obj = obj || [];

    if (start === null) {
      start = step < 0 ? obj.length - 1 : 0;
    }

    if (stop === null) {
      stop = step < 0 ? -1 : obj.length;
    } else if (stop < 0) {
      stop += obj.length;
    }

    if (start < 0) {
      start += obj.length;
    }

    var results = [];

    for (var i = start;; i += step) {
      if (i < 0 || i > obj.length) {
        break;
      }

      if (step > 0 && i >= stop) {
        break;
      }

      if (step < 0 && i <= stop) {
        break;
      }

      results.push(runtime.memberLookup(obj, i));
    }

    return results;
  }

  function hasOwnProp(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  var ARRAY_MEMBERS = {
    pop: function pop(index) {
      if (index === undefined) {
        return this.pop();
      }

      if (index >= this.length || index < 0) {
        throw new Error('KeyError');
      }

      return this.splice(index, 1);
    },
    append: function append(element) {
      return this.push(element);
    },
    remove: function remove(element) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          return this.splice(i, 1);
        }
      }

      throw new Error('ValueError');
    },
    count: function count(element) {
      var count = 0;

      for (var i = 0; i < this.length; i++) {
        if (this[i] === element) {
          count++;
        }
      }

      return count;
    },
    index: function index(element) {
      var i;

      if ((i = this.indexOf(element)) === -1) {
        throw new Error('ValueError');
      }

      return i;
    },
    find: function find(element) {
      return this.indexOf(element);
    },
    insert: function insert(index, elem) {
      return this.splice(index, 0, elem);
    }
  };
  var OBJECT_MEMBERS = {
    items: function items() {
      return lib._entries(this);
    },
    values: function values() {
      return lib._values(this);
    },
    keys: function keys() {
      return lib.keys(this);
    },
    get: function get(key, def) {
      var output = this[key];

      if (output === undefined) {
        output = def;
      }

      return output;
    },
    has_key: function has_key(key) {
      return hasOwnProp(this, key);
    },
    pop: function pop(key, def) {
      var output = this[key];

      if (output === undefined && def !== undefined) {
        output = def;
      } else if (output === undefined) {
        throw new Error('KeyError');
      } else {
        delete this[key];
      }

      return output;
    },
    popitem: function popitem() {
      var keys = lib.keys(this);

      if (!keys.length) {
        throw new Error('KeyError');
      }

      var k = keys[0];
      var val = this[k];
      delete this[k];
      return [k, val];
    },
    setdefault: function setdefault(key, def) {
      if (def === void 0) {
        def = null;
      }

      if (!(key in this)) {
        this[key] = def;
      }

      return this[key];
    },
    update: function update(kwargs) {
      lib._assign(this, kwargs);

      return null; // Always returns None
    }
  };
  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;

  runtime.memberLookup = function memberLookup(obj, val, autoescape) {
    if (arguments.length === 4) {
      return sliceLookup.apply(this, arguments);
    }

    obj = obj || {}; // If the object is an object, return any of the methods that Python would
    // otherwise provide.

    if (lib.isArray(obj) && hasOwnProp(ARRAY_MEMBERS, val)) {
      return ARRAY_MEMBERS[val].bind(obj);
    }

    if (lib.isObject(obj) && hasOwnProp(OBJECT_MEMBERS, val)) {
      return OBJECT_MEMBERS[val].bind(obj);
    }

    return orig_memberLookup.apply(this, arguments);
  };

  return uninstall;
}

module.exports = installCompat;

/***/ })
/******/ ]);
});

}).call(this,require('_process'),require("timers").setImmediate)

},{"_process":2,"timers":3}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":2,"timers":3}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("./lib/controller"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

_nunjucks["default"].configure('./dist');

function getName(request) {
  // set defaults
  var name = {
    fname: "New",
    lname: "User"
  }; // split path params

  var nameParts = request.params.name ? request.params.name.split('/') : [];
  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;
  return name;
}

var HelloController = /*#__PURE__*/function (_Controller) {
  _inherits(HelloController, _Controller);

  function HelloController() {
    _classCallCheck(this, HelloController);

    return _possibleConstructorReturn(this, _getPrototypeOf(HelloController).apply(this, arguments));
  }

  _createClass(HelloController, [{
    key: "toString",
    value: function toString(callback) {
      _nunjucks["default"].render('hello.html', getName(this.context), function (err, res) {
        if (err) {
          return callback(err, null);
        }

        callback(null, res);
      });
    }
  }]);

  return HelloController;
}(_controller["default"]);

exports["default"] = HelloController;

},{"./lib/controller":6,"nunjucks":1}],5:[function(require,module,exports){
"use strict";

var _lib = _interopRequireDefault(require("./lib"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var application = new _lib["default"]({
  '/hello/{name*}': _HelloController["default"]
}, {
  // query selector for element to inject response into
  target: 'body'
});
application.start();
console.log("test client index");

},{"./HelloController":4,"./lib":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(context) {
    _classCallCheck(this, Controller);

    this.context = context;
  }

  _createClass(Controller, [{
    key: "index",
    value: function index(application, request, h, callback) {
      callback(null);
    }
  }, {
    key: "toString",
    value: function toString(callback) {
      callback(null, 'success');
    }
  }]);

  return Controller;
}();

exports["default"] = Controller;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Application = /*#__PURE__*/function () {
  function Application() {
    _classCallCheck(this, Application);
  }

  _createClass(Application, [{
    key: "navigate",
    value: function navigate(url) {
      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // if browser doesnt support history API, go to url
      if (!history.pushState) {
        window.location = url;
        return;
      }

      console.log(url);

      if (push) {
        history.pushState({}, null, url);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      // event listener for redirects
      this.popStateListener = window.addEventListener('popstate', function (e) {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;
        var url = "".concat(pathname).concat(search);

        _this.navigate(url, false);
      });
      this.clickListener = document.addEventListener('click', function (e) {
        var target = e.target;
        var identifier = target.dataset.navigate;
        var href = target.getAttribute('href');

        if (identifier !== undefined) {
          // if user clicked on an href, prevent default
          if (href) {
            e.preventDefault();
          } // navigate to href if there


          _this.navigate(identifier || href);
        }
      });
    }
  }]);

  return Application;
}();

exports["default"] = Application;
console.log("Test client lib");

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnVuanVja3MvYnJvd3Nlci9udW5qdWNrcy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsInNyYy9IZWxsb0NvbnRyb2xsZXIuanMiLCJzcmMvaW5kZXguY2xpZW50LmpzIiwic3JjL2xpYi9jb250cm9sbGVyLmpzIiwic3JjL2xpYi9pbmRleC5jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHFCQUFTLFNBQVQsQ0FBbUIsUUFBbkI7O0FBRUEsU0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCO0FBQ3RCO0FBQ0EsTUFBSSxJQUFJLEdBQUc7QUFDUCxJQUFBLEtBQUssRUFBRSxLQURBO0FBRVAsSUFBQSxLQUFLLEVBQUU7QUFGQSxHQUFYLENBRnNCLENBTXRCOztBQUNBLE1BQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixHQUFzQixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsQ0FBb0IsS0FBcEIsQ0FBMEIsR0FBMUIsQ0FBdEIsR0FBdUQsRUFBdkU7QUFDQSxFQUFBLElBQUksQ0FBQyxLQUFMLEdBQWMsU0FBUyxDQUFDLENBQUQsQ0FBVCxJQUFnQixPQUFPLENBQUMsS0FBUixDQUFjLEtBQS9CLElBQXlDLElBQUksQ0FBQyxLQUEzRDtBQUNBLEVBQUEsSUFBSSxDQUFDLEtBQUwsR0FBYyxTQUFTLENBQUMsQ0FBRCxDQUFULElBQWdCLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBL0IsSUFBeUMsSUFBSSxDQUFDLEtBQTNEO0FBQ0EsU0FBTyxJQUFQO0FBQ0g7O0lBQ29CLGU7Ozs7Ozs7Ozs7OzZCQUNSLFEsRUFBVTtBQUNmLDJCQUFTLE1BQVQsQ0FBZ0IsWUFBaEIsRUFBOEIsT0FBTyxDQUFDLEtBQUssT0FBTixDQUFyQyxFQUFxRCxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDL0QsWUFBSSxHQUFKLEVBQVM7QUFDTCxpQkFBTyxRQUFRLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FBZjtBQUNIOztBQUNELFFBQUEsUUFBUSxDQUFDLElBQUQsRUFBTyxHQUFQLENBQVI7QUFFSCxPQU5EO0FBT0g7Ozs7RUFUd0Msc0I7Ozs7Ozs7QUNqQjdDOztBQUNBOzs7O0FBRUMsSUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFKLENBQWdCO0FBQ2hDLG9CQUFrQjtBQURjLENBQWhCLEVBRWpCO0FBQ0M7QUFDQSxFQUFBLE1BQU0sRUFBRTtBQUZULENBRmlCLENBQXBCO0FBT0EsV0FBVyxDQUFDLEtBQVo7QUFDRCxPQUFPLENBQUMsR0FBUixDQUFZLG1CQUFaOzs7Ozs7Ozs7Ozs7Ozs7O0lDWHFCLFU7QUFFakIsc0JBQVksT0FBWixFQUFxQjtBQUFBOztBQUNqQixTQUFLLE9BQUwsR0FBZSxPQUFmO0FBQ0g7Ozs7MEJBR0ssVyxFQUFhLE8sRUFBUyxDLEVBQUcsUSxFQUFVO0FBQ3JDLE1BQUEsUUFBUSxDQUFDLElBQUQsQ0FBUjtBQUNIOzs7NkJBRVEsUSxFQUFVO0FBQ2YsTUFBQSxRQUFRLENBQUMsSUFBRCxFQUFPLFNBQVAsQ0FBUjtBQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDYmdCLFc7Ozs7Ozs7NkJBQ1IsRyxFQUFnQjtBQUFBLFVBQVgsSUFBVyx1RUFBTixJQUFNOztBQUNyQjtBQUNBLFVBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixFQUF3QjtBQUNwQixRQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLEdBQWxCO0FBQ0E7QUFDSDs7QUFDRCxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksR0FBWjs7QUFDQSxVQUFHLElBQUgsRUFBUztBQUNMLFFBQUEsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsRUFBbEIsRUFBc0IsSUFBdEIsRUFBNEIsR0FBNUI7QUFDSDtBQUNKOzs7NEJBQ087QUFBQTs7QUFDSjtBQUNBLFdBQUssZ0JBQUwsR0FBd0IsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFVBQXhCLEVBQW9DLFVBQUMsQ0FBRCxFQUFPO0FBQUEsK0JBQ3RDLE1BQU0sQ0FBQyxRQUQrQjtBQUFBLFlBQzFELFFBRDBELG9CQUMxRCxRQUQwRDtBQUFBLFlBQ2hELE1BRGdELG9CQUNoRCxNQURnRDtBQUUvRCxZQUFJLEdBQUcsYUFBTSxRQUFOLFNBQWlCLE1BQWpCLENBQVA7O0FBQ0EsUUFBQSxLQUFJLENBQUMsUUFBTCxDQUFjLEdBQWQsRUFBbUIsS0FBbkI7QUFDSCxPQUp1QixDQUF4QjtBQUtBLFdBQUssYUFBTCxHQUFxQixRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBa0MsVUFBQyxDQUFELEVBQU87QUFBQSxZQUNyRCxNQURxRCxHQUMzQyxDQUQyQyxDQUNyRCxNQURxRDtBQUUxRCxZQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBUCxDQUFlLFFBQWhDO0FBQ0EsWUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFlBQVAsQ0FBb0IsTUFBcEIsQ0FBWDs7QUFFQSxZQUFJLFVBQVUsS0FBSyxTQUFuQixFQUE4QjtBQUMxQjtBQUNBLGNBQUksSUFBSixFQUFVO0FBQ04sWUFBQSxDQUFDLENBQUMsY0FBRjtBQUNILFdBSnlCLENBSzFCOzs7QUFDQSxVQUFBLEtBQUksQ0FBQyxRQUFMLENBQWMsVUFBVSxJQUFJLElBQTVCO0FBQ0g7QUFDSixPQWJvQixDQUFyQjtBQWNIOzs7Ozs7O0FBRUwsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQkFBWiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qISBCcm93c2VyIGJ1bmRsZSBvZiBudW5qdWNrcyAzLjIuMCAgKi9cbihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm51bmp1Y2tzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm51bmp1Y2tzXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xudmFyIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcbnZhciBlc2NhcGVNYXAgPSB7XG4gICcmJzogJyZhbXA7JyxcbiAgJ1wiJzogJyZxdW90OycsXG4gICdcXCcnOiAnJiMzOTsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0Oydcbn07XG52YXIgZXNjYXBlUmVnZXggPSAvWyZcIic8Pl0vZztcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuZnVuY3Rpb24gaGFzT3duUHJvcChvYmosIGspIHtcbiAgcmV0dXJuIE9ialByb3RvLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrKTtcbn1cblxuZXhwb3J0cy5oYXNPd25Qcm9wID0gaGFzT3duUHJvcDtcblxuZnVuY3Rpb24gbG9va3VwRXNjYXBlKGNoKSB7XG4gIHJldHVybiBlc2NhcGVNYXBbY2hdO1xufVxuXG5mdW5jdGlvbiBfcHJldHRpZnlFcnJvcihwYXRoLCB3aXRoSW50ZXJuYWxzLCBlcnIpIHtcbiAgaWYgKCFlcnIuVXBkYXRlKSB7XG4gICAgLy8gbm90IG9uZSBvZiBvdXJzLCBjYXN0IGl0XG4gICAgZXJyID0gbmV3IGV4cG9ydHMuVGVtcGxhdGVFcnJvcihlcnIpO1xuICB9XG5cbiAgZXJyLlVwZGF0ZShwYXRoKTsgLy8gVW5sZXNzIHRoZXkgbWFya2VkIHRoZSBkZXYgZmxhZywgc2hvdyB0aGVtIGEgdHJhY2UgZnJvbSBoZXJlXG5cbiAgaWYgKCF3aXRoSW50ZXJuYWxzKSB7XG4gICAgdmFyIG9sZCA9IGVycjtcbiAgICBlcnIgPSBuZXcgRXJyb3Iob2xkLm1lc3NhZ2UpO1xuICAgIGVyci5uYW1lID0gb2xkLm5hbWU7XG4gIH1cblxuICByZXR1cm4gZXJyO1xufVxuXG5leHBvcnRzLl9wcmV0dGlmeUVycm9yID0gX3ByZXR0aWZ5RXJyb3I7XG5cbmZ1bmN0aW9uIFRlbXBsYXRlRXJyb3IobWVzc2FnZSwgbGluZW5vLCBjb2xubykge1xuICB2YXIgZXJyO1xuICB2YXIgY2F1c2U7XG5cbiAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGNhdXNlID0gbWVzc2FnZTtcbiAgICBtZXNzYWdlID0gY2F1c2UubmFtZSArIFwiOiBcIiArIGNhdXNlLm1lc3NhZ2U7XG4gIH1cblxuICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihlcnIsIFRlbXBsYXRlRXJyb3IucHJvdG90eXBlKTtcbiAgfSBlbHNlIHtcbiAgICBlcnIgPSB0aGlzO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsICdtZXNzYWdlJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBtZXNzYWdlXG4gICAgfSk7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnbmFtZScsIHtcbiAgICB2YWx1ZTogJ1RlbXBsYXRlIHJlbmRlciBlcnJvcidcbiAgfSk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZXJyLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgfVxuXG4gIHZhciBnZXRTdGFjaztcblxuICBpZiAoY2F1c2UpIHtcbiAgICB2YXIgc3RhY2tEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjYXVzZSwgJ3N0YWNrJyk7XG5cbiAgICBnZXRTdGFjayA9IHN0YWNrRGVzY3JpcHRvciAmJiAoc3RhY2tEZXNjcmlwdG9yLmdldCB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RhY2tEZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFnZXRTdGFjaykge1xuICAgICAgZ2V0U3RhY2sgPSBmdW5jdGlvbiBnZXRTdGFjaygpIHtcbiAgICAgICAgcmV0dXJuIGNhdXNlLnN0YWNrO1xuICAgICAgfTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHN0YWNrID0gbmV3IEVycm9yKG1lc3NhZ2UpLnN0YWNrO1xuXG4gICAgZ2V0U3RhY2sgPSBmdW5jdGlvbiBnZXRTdGFjaygpIHtcbiAgICAgIHJldHVybiBzdGFjaztcbiAgICB9O1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgJ3N0YWNrJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIGdldFN0YWNrLmNhbGwoZXJyKTtcbiAgICB9XG4gIH0pO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnY2F1c2UnLCB7XG4gICAgdmFsdWU6IGNhdXNlXG4gIH0pO1xuICBlcnIubGluZW5vID0gbGluZW5vO1xuICBlcnIuY29sbm8gPSBjb2xubztcbiAgZXJyLmZpcnN0VXBkYXRlID0gdHJ1ZTtcblxuICBlcnIuVXBkYXRlID0gZnVuY3Rpb24gVXBkYXRlKHBhdGgpIHtcbiAgICB2YXIgbXNnID0gJygnICsgKHBhdGggfHwgJ3Vua25vd24gcGF0aCcpICsgJyknOyAvLyBvbmx5IHNob3cgbGluZW5vICsgY29sbm8gbmV4dCB0byBwYXRoIG9mIHRlbXBsYXRlXG4gICAgLy8gd2hlcmUgZXJyb3Igb2NjdXJyZWRcblxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICBpZiAodGhpcy5saW5lbm8gJiYgdGhpcy5jb2xubykge1xuICAgICAgICBtc2cgKz0gXCIgW0xpbmUgXCIgKyB0aGlzLmxpbmVubyArIFwiLCBDb2x1bW4gXCIgKyB0aGlzLmNvbG5vICsgXCJdXCI7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMubGluZW5vKSB7XG4gICAgICAgIG1zZyArPSBcIiBbTGluZSBcIiArIHRoaXMubGluZW5vICsgXCJdXCI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbXNnICs9ICdcXG4gJztcblxuICAgIGlmICh0aGlzLmZpcnN0VXBkYXRlKSB7XG4gICAgICBtc2cgKz0gJyAnO1xuICAgIH1cblxuICAgIHRoaXMubWVzc2FnZSA9IG1zZyArICh0aGlzLm1lc3NhZ2UgfHwgJycpO1xuICAgIHRoaXMuZmlyc3RVcGRhdGUgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICByZXR1cm4gZXJyO1xufVxuXG5pZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihUZW1wbGF0ZUVycm9yLnByb3RvdHlwZSwgRXJyb3IucHJvdG90eXBlKTtcbn0gZWxzZSB7XG4gIFRlbXBsYXRlRXJyb3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IFRlbXBsYXRlRXJyb3JcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnRzLlRlbXBsYXRlRXJyb3IgPSBUZW1wbGF0ZUVycm9yO1xuXG5mdW5jdGlvbiBlc2NhcGUodmFsKSB7XG4gIHJldHVybiB2YWwucmVwbGFjZShlc2NhcGVSZWdleCwgbG9va3VwRXNjYXBlKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGU7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gIHJldHVybiBPYmpQcm90by50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGlzRnVuY3Rpb247XG5cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gIHJldHVybiBPYmpQcm90by50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICByZXR1cm4gT2JqUHJvdG8udG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBTdHJpbmddJztcbn1cblxuZXhwb3J0cy5pc1N0cmluZyA9IGlzU3RyaW5nO1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIE9ialByb3RvLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG59XG5cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gZ3JvdXBCeShvYmosIHZhbCkge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIHZhciBpdGVyYXRvciA9IGlzRnVuY3Rpb24odmFsKSA/IHZhbCA6IGZ1bmN0aW9uIChvKSB7XG4gICAgcmV0dXJuIG9bdmFsXTtcbiAgfTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWx1ZSA9IG9ialtpXTtcbiAgICB2YXIga2V5ID0gaXRlcmF0b3IodmFsdWUsIGkpO1xuICAgIChyZXN1bHRba2V5XSB8fCAocmVzdWx0W2tleV0gPSBbXSkpLnB1c2godmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0cy5ncm91cEJ5ID0gZ3JvdXBCeTtcblxuZnVuY3Rpb24gdG9BcnJheShvYmopIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG9iaik7XG59XG5cbmV4cG9ydHMudG9BcnJheSA9IHRvQXJyYXk7XG5cbmZ1bmN0aW9uIHdpdGhvdXQoYXJyYXkpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gIGlmICghYXJyYXkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgdmFyIGNvbnRhaW5zID0gdG9BcnJheShhcmd1bWVudHMpLnNsaWNlKDEpO1xuICB2YXIgaW5kZXggPSAtMTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpbmRleE9mKGNvbnRhaW5zLCBhcnJheVtpbmRleF0pID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyYXlbaW5kZXhdKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnRzLndpdGhvdXQgPSB3aXRob3V0O1xuXG5mdW5jdGlvbiByZXBlYXQoY2hhcl8sIG4pIHtcbiAgdmFyIHN0ciA9ICcnO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgc3RyICs9IGNoYXJfO1xuICB9XG5cbiAgcmV0dXJuIHN0cjtcbn1cblxuZXhwb3J0cy5yZXBlYXQgPSByZXBlYXQ7XG5cbmZ1bmN0aW9uIGVhY2gob2JqLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChvYmogPT0gbnVsbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChBcnJheVByb3RvLmZvckVhY2ggJiYgb2JqLmZvckVhY2ggPT09IEFycmF5UHJvdG8uZm9yRWFjaCkge1xuICAgIG9iai5mb3JFYWNoKGZ1bmMsIGNvbnRleHQpO1xuICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmdW5jLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLmVhY2ggPSBlYWNoO1xuXG5mdW5jdGlvbiBtYXAob2JqLCBmdW5jKSB7XG4gIHZhciByZXN1bHRzID0gW107XG5cbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBpZiAoQXJyYXlQcm90by5tYXAgJiYgb2JqLm1hcCA9PT0gQXJyYXlQcm90by5tYXApIHtcbiAgICByZXR1cm4gb2JqLm1hcChmdW5jKTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0c1tyZXN1bHRzLmxlbmd0aF0gPSBmdW5jKG9ialtpXSwgaSk7XG4gIH1cblxuICBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICByZXN1bHRzLmxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuZXhwb3J0cy5tYXAgPSBtYXA7XG5cbmZ1bmN0aW9uIGFzeW5jSXRlcihhcnIsIGl0ZXIsIGNiKSB7XG4gIHZhciBpID0gLTE7XG5cbiAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICBpKys7XG5cbiAgICBpZiAoaSA8IGFyci5sZW5ndGgpIHtcbiAgICAgIGl0ZXIoYXJyW2ldLCBpLCBuZXh0LCBjYik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5leHBvcnRzLmFzeW5jSXRlciA9IGFzeW5jSXRlcjtcblxuZnVuY3Rpb24gYXN5bmNGb3Iob2JqLCBpdGVyLCBjYikge1xuICB2YXIga2V5cyA9IGtleXNfKG9iaiB8fCB7fSk7XG4gIHZhciBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAtMTtcblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGkrKztcbiAgICB2YXIgayA9IGtleXNbaV07XG5cbiAgICBpZiAoaSA8IGxlbikge1xuICAgICAgaXRlcihrLCBvYmpba10sIGksIGxlbiwgbmV4dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dCgpO1xufVxuXG5leHBvcnRzLmFzeW5jRm9yID0gYXN5bmNGb3I7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpIHtcbiAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYXJyIHx8IFtdLCBzZWFyY2hFbGVtZW50LCBmcm9tSW5kZXgpO1xufVxuXG5leHBvcnRzLmluZGV4T2YgPSBpbmRleE9mO1xuXG5mdW5jdGlvbiBrZXlzXyhvYmopIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbiAgdmFyIGFyciA9IFtdO1xuXG4gIGZvciAodmFyIGsgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093blByb3Aob2JqLCBrKSkge1xuICAgICAgYXJyLnB1c2goayk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0cy5rZXlzID0ga2V5c187XG5cbmZ1bmN0aW9uIF9lbnRyaWVzKG9iaikge1xuICByZXR1cm4ga2V5c18ob2JqKS5tYXAoZnVuY3Rpb24gKGspIHtcbiAgICByZXR1cm4gW2ssIG9ialtrXV07XG4gIH0pO1xufVxuXG5leHBvcnRzLl9lbnRyaWVzID0gX2VudHJpZXM7XG5cbmZ1bmN0aW9uIF92YWx1ZXMob2JqKSB7XG4gIHJldHVybiBrZXlzXyhvYmopLm1hcChmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBvYmpba107XG4gIH0pO1xufVxuXG5leHBvcnRzLl92YWx1ZXMgPSBfdmFsdWVzO1xuXG5mdW5jdGlvbiBleHRlbmQob2JqMSwgb2JqMikge1xuICBvYmoxID0gb2JqMSB8fCB7fTtcbiAga2V5c18ob2JqMikuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIG9iajFba10gPSBvYmoyW2tdO1xuICB9KTtcbiAgcmV0dXJuIG9iajE7XG59XG5cbmV4cG9ydHMuX2Fzc2lnbiA9IGV4cG9ydHMuZXh0ZW5kID0gZXh0ZW5kO1xuXG5mdW5jdGlvbiBpbk9wZXJhdG9yKGtleSwgdmFsKSB7XG4gIGlmIChpc0FycmF5KHZhbCkgfHwgaXNTdHJpbmcodmFsKSkge1xuICAgIHJldHVybiB2YWwuaW5kZXhPZihrZXkpICE9PSAtMTtcbiAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJuIGtleSBpbiB2YWw7XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgXCJpblwiIG9wZXJhdG9yIHRvIHNlYXJjaCBmb3IgXCInICsga2V5ICsgJ1wiIGluIHVuZXhwZWN0ZWQgdHlwZXMuJyk7XG59XG5cbmV4cG9ydHMuaW5PcGVyYXRvciA9IGluT3BlcmF0b3I7XG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbiAvLyBBIHNpbXBsZSBjbGFzcyBzeXN0ZW0sIG1vcmUgZG9jdW1lbnRhdGlvbiB0byBjb21lXG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBFdmVudEVtaXR0ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbmZ1bmN0aW9uIHBhcmVudFdyYXAocGFyZW50LCBwcm9wKSB7XG4gIGlmICh0eXBlb2YgcGFyZW50ICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBwcm9wICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHByb3A7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICAvLyBTYXZlIHRoZSBjdXJyZW50IHBhcmVudCBtZXRob2RcbiAgICB2YXIgdG1wID0gdGhpcy5wYXJlbnQ7IC8vIFNldCBwYXJlbnQgdG8gdGhlIHByZXZpb3VzIG1ldGhvZCwgY2FsbCwgYW5kIHJlc3RvcmVcblxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHZhciByZXMgPSBwcm9wLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5wYXJlbnQgPSB0bXA7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kQ2xhc3MoY2xzLCBuYW1lLCBwcm9wcykge1xuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICBsaWIua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgIHByb3BzW2tdID0gcGFyZW50V3JhcChjbHMucHJvdG90eXBlW2tdLCBwcm9wc1trXSk7XG4gIH0pO1xuXG4gIHZhciBzdWJjbGFzcyA9XG4gIC8qI19fUFVSRV9fKi9cbiAgZnVuY3Rpb24gKF9jbHMpIHtcbiAgICBfaW5oZXJpdHNMb29zZShzdWJjbGFzcywgX2Nscyk7XG5cbiAgICBmdW5jdGlvbiBzdWJjbGFzcygpIHtcbiAgICAgIHJldHVybiBfY2xzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3Moc3ViY2xhc3MsIFt7XG4gICAgICBrZXk6IFwidHlwZW5hbWVcIixcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gc3ViY2xhc3M7XG4gIH0oY2xzKTtcblxuICBsaWIuX2Fzc2lnbihzdWJjbGFzcy5wcm90b3R5cGUsIHByb3BzKTtcblxuICByZXR1cm4gc3ViY2xhc3M7XG59XG5cbnZhciBPYmogPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBPYmooKSB7XG4gICAgLy8gVW5mb3J0dW5hdGVseSBuZWNlc3NhcnkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gICAgdGhpcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gT2JqLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7fTtcblxuICBPYmouZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKG5hbWUsIHByb3BzKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnb2JqZWN0Jykge1xuICAgICAgcHJvcHMgPSBuYW1lO1xuICAgICAgbmFtZSA9ICdhbm9ueW1vdXMnO1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbmRDbGFzcyh0aGlzLCBuYW1lLCBwcm9wcyk7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKE9iaiwgW3tcbiAgICBrZXk6IFwidHlwZW5hbWVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE9iajtcbn0oKTtcblxudmFyIEVtaXR0ZXJPYmogPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FdmVudEVtaXR0ZXIpIHtcbiAgX2luaGVyaXRzTG9vc2UoRW1pdHRlck9iaiwgX0V2ZW50RW1pdHRlcik7XG5cbiAgZnVuY3Rpb24gRW1pdHRlck9iaigpIHtcbiAgICB2YXIgX3RoaXMyO1xuXG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfRXZlbnRFbWl0dGVyLmNhbGwodGhpcykgfHwgdGhpczsgLy8gVW5mb3J0dW5hdGVseSBuZWNlc3NhcnkgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5cbiAgICAoX3RoaXMyID0gX3RoaXMpLmluaXQuYXBwbHkoX3RoaXMyLCBhcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBFbWl0dGVyT2JqLnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmluaXQgPSBmdW5jdGlvbiBpbml0KCkge307XG5cbiAgRW1pdHRlck9iai5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQobmFtZSwgcHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9wcyA9IG5hbWU7XG4gICAgICBuYW1lID0gJ2Fub255bW91cyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZENsYXNzKHRoaXMsIG5hbWUsIHByb3BzKTtcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoRW1pdHRlck9iaiwgW3tcbiAgICBrZXk6IFwidHlwZW5hbWVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEVtaXR0ZXJPYmo7XG59KEV2ZW50RW1pdHRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBPYmo6IE9iaixcbiAgRW1pdHRlck9iajogRW1pdHRlck9ialxufTtcblxuLyoqKi8gfSksXG4vKiAyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgYXJyYXlGcm9tID0gQXJyYXkuZnJvbTtcbnZhciBzdXBwb3J0c0l0ZXJhdG9ycyA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yICYmIHR5cGVvZiBhcnJheUZyb20gPT09ICdmdW5jdGlvbic7IC8vIEZyYW1lcyBrZWVwIHRyYWNrIG9mIHNjb3BpbmcgYm90aCBhdCBjb21waWxlLXRpbWUgYW5kIHJ1bi10aW1lIHNvXG4vLyB3ZSBrbm93IGhvdyB0byBhY2Nlc3MgdmFyaWFibGVzLiBCbG9jayB0YWdzIGNhbiBpbnRyb2R1Y2Ugc3BlY2lhbFxuLy8gdmFyaWFibGVzLCBmb3IgZXhhbXBsZS5cblxudmFyIEZyYW1lID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRnJhbWUocGFyZW50LCBpc29sYXRlV3JpdGVzKSB7XG4gICAgdGhpcy52YXJpYWJsZXMgPSB7fTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLnRvcExldmVsID0gZmFsc2U7IC8vIGlmIHRoaXMgaXMgdHJ1ZSwgd3JpdGVzIChzZXQpIHNob3VsZCBuZXZlciBwcm9wYWdhdGUgdXB3YXJkcyBwYXN0XG4gICAgLy8gdGhpcyBmcmFtZSB0byBpdHMgcGFyZW50ICh0aG91Z2ggcmVhZHMgbWF5KS5cblxuICAgIHRoaXMuaXNvbGF0ZVdyaXRlcyA9IGlzb2xhdGVXcml0ZXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gRnJhbWUucHJvdG90eXBlO1xuXG4gIF9wcm90by5zZXQgPSBmdW5jdGlvbiBzZXQobmFtZSwgdmFsLCByZXNvbHZlVXApIHtcbiAgICAvLyBBbGxvdyB2YXJpYWJsZXMgd2l0aCBkb3RzIGJ5IGF1dG9tYXRpY2FsbHkgY3JlYXRpbmcgdGhlXG4gICAgLy8gbmVzdGVkIHN0cnVjdHVyZVxuICAgIHZhciBwYXJ0cyA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICB2YXIgb2JqID0gdGhpcy52YXJpYWJsZXM7XG4gICAgdmFyIGZyYW1lID0gdGhpcztcblxuICAgIGlmIChyZXNvbHZlVXApIHtcbiAgICAgIGlmIChmcmFtZSA9IHRoaXMucmVzb2x2ZShwYXJ0c1swXSwgdHJ1ZSkpIHtcbiAgICAgICAgZnJhbWUuc2V0KG5hbWUsIHZhbCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgdmFyIGlkID0gcGFydHNbaV07XG5cbiAgICAgIGlmICghb2JqW2lkXSkge1xuICAgICAgICBvYmpbaWRdID0ge307XG4gICAgICB9XG5cbiAgICAgIG9iaiA9IG9ialtpZF07XG4gICAgfVxuXG4gICAgb2JqW3BhcnRzW3BhcnRzLmxlbmd0aCAtIDFdXSA9IHZhbDtcbiAgfTtcblxuICBfcHJvdG8uZ2V0ID0gZnVuY3Rpb24gZ2V0KG5hbWUpIHtcbiAgICB2YXIgdmFsID0gdGhpcy52YXJpYWJsZXNbbmFtZV07XG5cbiAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLmxvb2t1cCA9IGZ1bmN0aW9uIGxvb2t1cChuYW1lKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhcmVudDtcbiAgICB2YXIgdmFsID0gdGhpcy52YXJpYWJsZXNbbmFtZV07XG5cbiAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHAgJiYgcC5sb29rdXAobmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLnJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKG5hbWUsIGZvcldyaXRlKSB7XG4gICAgdmFyIHAgPSBmb3JXcml0ZSAmJiB0aGlzLmlzb2xhdGVXcml0ZXMgPyB1bmRlZmluZWQgOiB0aGlzLnBhcmVudDtcbiAgICB2YXIgdmFsID0gdGhpcy52YXJpYWJsZXNbbmFtZV07XG5cbiAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiBwICYmIHAucmVzb2x2ZShuYW1lKTtcbiAgfTtcblxuICBfcHJvdG8ucHVzaCA9IGZ1bmN0aW9uIHB1c2goaXNvbGF0ZVdyaXRlcykge1xuICAgIHJldHVybiBuZXcgRnJhbWUodGhpcywgaXNvbGF0ZVdyaXRlcyk7XG4gIH07XG5cbiAgX3Byb3RvLnBvcCA9IGZ1bmN0aW9uIHBvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQ7XG4gIH07XG5cbiAgcmV0dXJuIEZyYW1lO1xufSgpO1xuXG5mdW5jdGlvbiBtYWtlTWFjcm8oYXJnTmFtZXMsIGt3YXJnTmFtZXMsIGZ1bmMpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtYWNyb0FyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBtYWNyb0FyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0NvdW50ID0gbnVtQXJncyhtYWNyb0FyZ3MpO1xuICAgIHZhciBhcmdzO1xuICAgIHZhciBrd2FyZ3MgPSBnZXRLZXl3b3JkQXJncyhtYWNyb0FyZ3MpO1xuXG4gICAgaWYgKGFyZ0NvdW50ID4gYXJnTmFtZXMubGVuZ3RoKSB7XG4gICAgICBhcmdzID0gbWFjcm9BcmdzLnNsaWNlKDAsIGFyZ05hbWVzLmxlbmd0aCk7IC8vIFBvc2l0aW9uYWwgYXJndW1lbnRzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCBpbiBhc1xuICAgICAgLy8ga2V5d29yZCBhcmd1bWVudHMgKGVzc2VudGlhbGx5IGRlZmF1bHQgdmFsdWVzKVxuXG4gICAgICBtYWNyb0FyZ3Muc2xpY2UoYXJncy5sZW5ndGgsIGFyZ0NvdW50KS5mb3JFYWNoKGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgICAgaWYgKGkgPCBrd2FyZ05hbWVzLmxlbmd0aCkge1xuICAgICAgICAgIGt3YXJnc1trd2FyZ05hbWVzW2ldXSA9IHZhbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBhcmdzLnB1c2goa3dhcmdzKTtcbiAgICB9IGVsc2UgaWYgKGFyZ0NvdW50IDwgYXJnTmFtZXMubGVuZ3RoKSB7XG4gICAgICBhcmdzID0gbWFjcm9BcmdzLnNsaWNlKDAsIGFyZ0NvdW50KTtcblxuICAgICAgZm9yICh2YXIgaSA9IGFyZ0NvdW50OyBpIDwgYXJnTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFyZyA9IGFyZ05hbWVzW2ldOyAvLyBLZXl3b3JkIGFyZ3VtZW50cyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgYXNcbiAgICAgICAgLy8gcG9zaXRpb25hbCBhcmd1bWVudHMsIGkuZS4gdGhlIGNhbGxlciBleHBsaWNpdGx5XG4gICAgICAgIC8vIHVzZWQgdGhlIG5hbWUgb2YgYSBwb3NpdGlvbmFsIGFyZ1xuXG4gICAgICAgIGFyZ3MucHVzaChrd2FyZ3NbYXJnXSk7XG4gICAgICAgIGRlbGV0ZSBrd2FyZ3NbYXJnXTtcbiAgICAgIH1cblxuICAgICAgYXJncy5wdXNoKGt3YXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MgPSBtYWNyb0FyZ3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkoX3RoaXMsIGFyZ3MpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlS2V5d29yZEFyZ3Mob2JqKSB7XG4gIG9iai5fX2tleXdvcmRzID0gdHJ1ZTtcbiAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gaXNLZXl3b3JkQXJncyhvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCAnX19rZXl3b3JkcycpO1xufVxuXG5mdW5jdGlvbiBnZXRLZXl3b3JkQXJncyhhcmdzKSB7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAobGVuKSB7XG4gICAgdmFyIGxhc3RBcmcgPSBhcmdzW2xlbiAtIDFdO1xuXG4gICAgaWYgKGlzS2V5d29yZEFyZ3MobGFzdEFyZykpIHtcbiAgICAgIHJldHVybiBsYXN0QXJnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7fTtcbn1cblxuZnVuY3Rpb24gbnVtQXJncyhhcmdzKSB7XG4gIHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblxuICBpZiAobGVuID09PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgbGFzdEFyZyA9IGFyZ3NbbGVuIC0gMV07XG5cbiAgaWYgKGlzS2V5d29yZEFyZ3MobGFzdEFyZykpIHtcbiAgICByZXR1cm4gbGVuIC0gMTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGVuO1xuICB9XG59IC8vIEEgU2FmZVN0cmluZyBvYmplY3QgaW5kaWNhdGVzIHRoYXQgdGhlIHN0cmluZyBzaG91bGQgbm90IGJlXG4vLyBhdXRvZXNjYXBlZC4gVGhpcyBoYXBwZW5zIG1hZ2ljYWxseSBiZWNhdXNlIGF1dG9lc2NhcGluZyBvbmx5XG4vLyBvY2N1cnMgb24gcHJpbWl0aXZlIHN0cmluZyBvYmplY3RzLlxuXG5cbmZ1bmN0aW9uIFNhZmVTdHJpbmcodmFsKSB7XG4gIGlmICh0eXBlb2YgdmFsICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICB0aGlzLnZhbCA9IHZhbDtcbiAgdGhpcy5sZW5ndGggPSB2YWwubGVuZ3RoO1xufVxuXG5TYWZlU3RyaW5nLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3RyaW5nLnByb3RvdHlwZSwge1xuICBsZW5ndGg6IHtcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgdmFsdWU6IDBcbiAgfVxufSk7XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiB2YWx1ZU9mKCkge1xuICByZXR1cm4gdGhpcy52YWw7XG59O1xuXG5TYWZlU3RyaW5nLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gdGhpcy52YWw7XG59O1xuXG5mdW5jdGlvbiBjb3B5U2FmZW5lc3MoZGVzdCwgdGFyZ2V0KSB7XG4gIGlmIChkZXN0IGluc3RhbmNlb2YgU2FmZVN0cmluZykge1xuICAgIHJldHVybiBuZXcgU2FmZVN0cmluZyh0YXJnZXQpO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldC50b1N0cmluZygpO1xufVxuXG5mdW5jdGlvbiBtYXJrU2FmZSh2YWwpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBuZXcgU2FmZVN0cmluZyh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmdW5jdGlvbiB3cmFwU2FmZShhcmdzKSB7XG4gICAgICB2YXIgcmV0ID0gdmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgIGlmICh0eXBlb2YgcmV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbmV3IFNhZmVTdHJpbmcocmV0KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHN1cHByZXNzVmFsdWUodmFsLCBhdXRvZXNjYXBlKSB7XG4gIHZhbCA9IHZhbCAhPT0gdW5kZWZpbmVkICYmIHZhbCAhPT0gbnVsbCA/IHZhbCA6ICcnO1xuXG4gIGlmIChhdXRvZXNjYXBlICYmICEodmFsIGluc3RhbmNlb2YgU2FmZVN0cmluZykpIHtcbiAgICB2YWwgPSBsaWIuZXNjYXBlKHZhbC50b1N0cmluZygpKTtcbiAgfVxuXG4gIHJldHVybiB2YWw7XG59XG5cbmZ1bmN0aW9uIGVuc3VyZURlZmluZWQodmFsLCBsaW5lbm8sIGNvbG5vKSB7XG4gIGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgbGliLlRlbXBsYXRlRXJyb3IoJ2F0dGVtcHRlZCB0byBvdXRwdXQgbnVsbCBvciB1bmRlZmluZWQgdmFsdWUnLCBsaW5lbm8gKyAxLCBjb2xubyArIDEpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gbWVtYmVyTG9va3VwKG9iaiwgdmFsKSB7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpbdmFsXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqW3ZhbF0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIG9ialt2YWxdO1xufVxuXG5mdW5jdGlvbiBjYWxsV3JhcChvYmosIG5hbWUsIGNvbnRleHQsIGFyZ3MpIHtcbiAgaWYgKCFvYmopIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBjYWxsIGAnICsgbmFtZSArICdgLCB3aGljaCBpcyB1bmRlZmluZWQgb3IgZmFsc2V5Jyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNhbGwgYCcgKyBuYW1lICsgJ2AsIHdoaWNoIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICByZXR1cm4gb2JqLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xufVxuXG5mdW5jdGlvbiBjb250ZXh0T3JGcmFtZUxvb2t1cChjb250ZXh0LCBmcmFtZSwgbmFtZSkge1xuICB2YXIgdmFsID0gZnJhbWUubG9va3VwKG5hbWUpO1xuICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgPyB2YWwgOiBjb250ZXh0Lmxvb2t1cChuYW1lKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3IsIGxpbmVubywgY29sbm8pIHtcbiAgaWYgKGVycm9yLmxpbmVubykge1xuICAgIHJldHVybiBlcnJvcjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IGxpYi5UZW1wbGF0ZUVycm9yKGVycm9yLCBsaW5lbm8sIGNvbG5vKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3luY0VhY2goYXJyLCBkaW1lbiwgaXRlciwgY2IpIHtcbiAgaWYgKGxpYi5pc0FycmF5KGFycikpIHtcbiAgICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgICBsaWIuYXN5bmNJdGVyKGFyciwgZnVuY3Rpb24gaXRlckNhbGxiYWNrKGl0ZW0sIGksIG5leHQpIHtcbiAgICAgIHN3aXRjaCAoZGltZW4pIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGl0ZXIoaXRlbSwgaSwgbGVuLCBuZXh0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgaXRlcihpdGVtWzBdLCBpdGVtWzFdLCBpLCBsZW4sIG5leHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBpdGVyKGl0ZW1bMF0sIGl0ZW1bMV0sIGl0ZW1bMl0sIGksIGxlbiwgbmV4dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpdGVtLnB1c2goaSwgbGVuLCBuZXh0KTtcbiAgICAgICAgICBpdGVyLmFwcGx5KHRoaXMsIGl0ZW0pO1xuICAgICAgfVxuICAgIH0sIGNiKTtcbiAgfSBlbHNlIHtcbiAgICBsaWIuYXN5bmNGb3IoYXJyLCBmdW5jdGlvbiBpdGVyQ2FsbGJhY2soa2V5LCB2YWwsIGksIGxlbiwgbmV4dCkge1xuICAgICAgaXRlcihrZXksIHZhbCwgaSwgbGVuLCBuZXh0KTtcbiAgICB9LCBjYik7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXN5bmNBbGwoYXJyLCBkaW1lbiwgZnVuYywgY2IpIHtcbiAgdmFyIGZpbmlzaGVkID0gMDtcbiAgdmFyIGxlbjtcbiAgdmFyIG91dHB1dEFycjtcblxuICBmdW5jdGlvbiBkb25lKGksIG91dHB1dCkge1xuICAgIGZpbmlzaGVkKys7XG4gICAgb3V0cHV0QXJyW2ldID0gb3V0cHV0O1xuXG4gICAgaWYgKGZpbmlzaGVkID09PSBsZW4pIHtcbiAgICAgIGNiKG51bGwsIG91dHB1dEFyci5qb2luKCcnKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGxpYi5pc0FycmF5KGFycikpIHtcbiAgICBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIG91dHB1dEFyciA9IG5ldyBBcnJheShsZW4pO1xuXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgY2IobnVsbCwgJycpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGFycltpXTtcblxuICAgICAgICBzd2l0Y2ggKGRpbWVuKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZnVuYyhpdGVtLCBpLCBsZW4sIGRvbmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBmdW5jKGl0ZW1bMF0sIGl0ZW1bMV0sIGksIGxlbiwgZG9uZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGZ1bmMoaXRlbVswXSwgaXRlbVsxXSwgaXRlbVsyXSwgaSwgbGVuLCBkb25lKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGl0ZW0ucHVzaChpLCBsZW4sIGRvbmUpO1xuICAgICAgICAgICAgZnVuYy5hcHBseSh0aGlzLCBpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5cyA9IGxpYi5rZXlzKGFyciB8fCB7fSk7XG4gICAgbGVuID0ga2V5cy5sZW5ndGg7XG4gICAgb3V0cHV0QXJyID0gbmV3IEFycmF5KGxlbik7XG5cbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICBjYihudWxsLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBrZXlzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgayA9IGtleXNbX2ldO1xuICAgICAgICBmdW5jKGssIGFycltrXSwgX2ksIGxlbiwgZG9uZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZyb21JdGVyYXRvcihhcnIpIHtcbiAgaWYgKHR5cGVvZiBhcnIgIT09ICdvYmplY3QnIHx8IGFyciA9PT0gbnVsbCB8fCBsaWIuaXNBcnJheShhcnIpKSB7XG4gICAgcmV0dXJuIGFycjtcbiAgfSBlbHNlIGlmIChzdXBwb3J0c0l0ZXJhdG9ycyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJyKSB7XG4gICAgcmV0dXJuIGFycmF5RnJvbShhcnIpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhcnI7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEZyYW1lOiBGcmFtZSxcbiAgbWFrZU1hY3JvOiBtYWtlTWFjcm8sXG4gIG1ha2VLZXl3b3JkQXJnczogbWFrZUtleXdvcmRBcmdzLFxuICBudW1BcmdzOiBudW1BcmdzLFxuICBzdXBwcmVzc1ZhbHVlOiBzdXBwcmVzc1ZhbHVlLFxuICBlbnN1cmVEZWZpbmVkOiBlbnN1cmVEZWZpbmVkLFxuICBtZW1iZXJMb29rdXA6IG1lbWJlckxvb2t1cCxcbiAgY29udGV4dE9yRnJhbWVMb29rdXA6IGNvbnRleHRPckZyYW1lTG9va3VwLFxuICBjYWxsV3JhcDogY2FsbFdyYXAsXG4gIGhhbmRsZUVycm9yOiBoYW5kbGVFcnJvcixcbiAgaXNBcnJheTogbGliLmlzQXJyYXksXG4gIGtleXM6IGxpYi5rZXlzLFxuICBTYWZlU3RyaW5nOiBTYWZlU3RyaW5nLFxuICBjb3B5U2FmZW5lc3M6IGNvcHlTYWZlbmVzcyxcbiAgbWFya1NhZmU6IG1hcmtTYWZlLFxuICBhc3luY0VhY2g6IGFzeW5jRWFjaCxcbiAgYXN5bmNBbGw6IGFzeW5jQWxsLFxuICBpbk9wZXJhdG9yOiBsaWIuaW5PcGVyYXRvcixcbiAgZnJvbUl0ZXJhdG9yOiBmcm9tSXRlcmF0b3Jcbn07XG5cbi8qKiovIH0pLFxuLyogMyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIE9iaiA9IF9yZXF1aXJlLk9iajtcblxuZnVuY3Rpb24gdHJhdmVyc2VBbmRDaGVjayhvYmosIHR5cGUsIHJlc3VsdHMpIHtcbiAgaWYgKG9iaiBpbnN0YW5jZW9mIHR5cGUpIHtcbiAgICByZXN1bHRzLnB1c2gob2JqKTtcbiAgfVxuXG4gIGlmIChvYmogaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgb2JqLmZpbmRBbGwodHlwZSwgcmVzdWx0cyk7XG4gIH1cbn1cblxudmFyIE5vZGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoTm9kZSwgX09iaik7XG5cbiAgZnVuY3Rpb24gTm9kZSgpIHtcbiAgICByZXR1cm4gX09iai5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTm9kZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KGxpbmVubywgY29sbm8pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzLFxuICAgICAgICBfYXJndW1lbnRzID0gYXJndW1lbnRzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gICAgdGhpcy5jb2xubyA9IGNvbG5vO1xuICAgIHRoaXMuZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGZpZWxkLCBpKSB7XG4gICAgICAvLyBUaGUgZmlyc3QgdHdvIGFyZ3MgYXJlIGxpbmUvY29sIG51bWJlcnMsIHNvIG9mZnNldCBieSAyXG4gICAgICB2YXIgdmFsID0gX2FyZ3VtZW50c1tpICsgMl07IC8vIEZpZWxkcyBzaG91bGQgbmV2ZXIgYmUgdW5kZWZpbmVkLCBidXQgbnVsbC4gSXQgbWFrZXNcbiAgICAgIC8vIHRlc3RpbmcgZWFzaWVyIHRvIG5vcm1hbGl6ZSB2YWx1ZXMuXG5cbiAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWwgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBfdGhpc1tmaWVsZF0gPSB2YWw7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmZpbmRBbGwgPSBmdW5jdGlvbiBmaW5kQWxsKHR5cGUsIHJlc3VsdHMpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHJlc3VsdHMgPSByZXN1bHRzIHx8IFtdO1xuXG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICByZXR1cm4gdHJhdmVyc2VBbmRDaGVjayhjaGlsZCwgdHlwZSwgcmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIHRyYXZlcnNlQW5kQ2hlY2soX3RoaXMyW2ZpZWxkXSwgdHlwZSwgcmVzdWx0cyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICBfcHJvdG8uaXRlckZpZWxkcyA9IGZ1bmN0aW9uIGl0ZXJGaWVsZHMoZnVuYykge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQpIHtcbiAgICAgIGZ1bmMoX3RoaXMzW2ZpZWxkXSwgZmllbGQpO1xuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBOb2RlO1xufShPYmopOyAvLyBBYnN0cmFjdCBub2Rlc1xuXG5cbnZhciBWYWx1ZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX05vZGUpIHtcbiAgX2luaGVyaXRzTG9vc2UoVmFsdWUsIF9Ob2RlKTtcblxuICBmdW5jdGlvbiBWYWx1ZSgpIHtcbiAgICByZXR1cm4gX05vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFZhbHVlLCBbe1xuICAgIGtleTogXCJ0eXBlbmFtZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICdWYWx1ZSc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImZpZWxkc1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIFsndmFsdWUnXTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gVmFsdWU7XG59KE5vZGUpOyAvLyBDb25jcmV0ZSBub2Rlc1xuXG5cbnZhciBOb2RlTGlzdCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX05vZGUyKSB7XG4gIF9pbmhlcml0c0xvb3NlKE5vZGVMaXN0LCBfTm9kZTIpO1xuXG4gIGZ1bmN0aW9uIE5vZGVMaXN0KCkge1xuICAgIHJldHVybiBfTm9kZTIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBOb2RlTGlzdC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMi5pbml0ID0gZnVuY3Rpb24gaW5pdChsaW5lbm8sIGNvbG5vLCBub2Rlcykge1xuICAgIF9Ob2RlMi5wcm90b3R5cGUuaW5pdC5jYWxsKHRoaXMsIGxpbmVubywgY29sbm8sIG5vZGVzIHx8IFtdKTtcbiAgfTtcblxuICBfcHJvdG8yLmFkZENoaWxkID0gZnVuY3Rpb24gYWRkQ2hpbGQobm9kZSkge1xuICAgIHRoaXMuY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoTm9kZUxpc3QsIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ05vZGVMaXN0JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmllbGRzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gWydjaGlsZHJlbiddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBOb2RlTGlzdDtcbn0oTm9kZSk7XG5cbnZhciBSb290ID0gTm9kZUxpc3QuZXh0ZW5kKCdSb290Jyk7XG52YXIgTGl0ZXJhbCA9IFZhbHVlLmV4dGVuZCgnTGl0ZXJhbCcpO1xudmFyIFN5bWJvbCA9IFZhbHVlLmV4dGVuZCgnU3ltYm9sJyk7XG52YXIgR3JvdXAgPSBOb2RlTGlzdC5leHRlbmQoJ0dyb3VwJyk7XG52YXIgQXJyYXlOb2RlID0gTm9kZUxpc3QuZXh0ZW5kKCdBcnJheScpO1xudmFyIFBhaXIgPSBOb2RlLmV4dGVuZCgnUGFpcicsIHtcbiAgZmllbGRzOiBbJ2tleScsICd2YWx1ZSddXG59KTtcbnZhciBEaWN0ID0gTm9kZUxpc3QuZXh0ZW5kKCdEaWN0Jyk7XG52YXIgTG9va3VwVmFsID0gTm9kZS5leHRlbmQoJ0xvb2t1cFZhbCcsIHtcbiAgZmllbGRzOiBbJ3RhcmdldCcsICd2YWwnXVxufSk7XG52YXIgSWYgPSBOb2RlLmV4dGVuZCgnSWYnLCB7XG4gIGZpZWxkczogWydjb25kJywgJ2JvZHknLCAnZWxzZV8nXVxufSk7XG52YXIgSWZBc3luYyA9IElmLmV4dGVuZCgnSWZBc3luYycpO1xudmFyIElubGluZUlmID0gTm9kZS5leHRlbmQoJ0lubGluZUlmJywge1xuICBmaWVsZHM6IFsnY29uZCcsICdib2R5JywgJ2Vsc2VfJ11cbn0pO1xudmFyIEZvciA9IE5vZGUuZXh0ZW5kKCdGb3InLCB7XG4gIGZpZWxkczogWydhcnInLCAnbmFtZScsICdib2R5JywgJ2Vsc2VfJ11cbn0pO1xudmFyIEFzeW5jRWFjaCA9IEZvci5leHRlbmQoJ0FzeW5jRWFjaCcpO1xudmFyIEFzeW5jQWxsID0gRm9yLmV4dGVuZCgnQXN5bmNBbGwnKTtcbnZhciBNYWNybyA9IE5vZGUuZXh0ZW5kKCdNYWNybycsIHtcbiAgZmllbGRzOiBbJ25hbWUnLCAnYXJncycsICdib2R5J11cbn0pO1xudmFyIENhbGxlciA9IE1hY3JvLmV4dGVuZCgnQ2FsbGVyJyk7XG52YXIgSW1wb3J0ID0gTm9kZS5leHRlbmQoJ0ltcG9ydCcsIHtcbiAgZmllbGRzOiBbJ3RlbXBsYXRlJywgJ3RhcmdldCcsICd3aXRoQ29udGV4dCddXG59KTtcblxudmFyIEZyb21JbXBvcnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9Ob2RlMykge1xuICBfaW5oZXJpdHNMb29zZShGcm9tSW1wb3J0LCBfTm9kZTMpO1xuXG4gIGZ1bmN0aW9uIEZyb21JbXBvcnQoKSB7XG4gICAgcmV0dXJuIF9Ob2RlMy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMyA9IEZyb21JbXBvcnQucHJvdG90eXBlO1xuXG4gIF9wcm90bzMuaW5pdCA9IGZ1bmN0aW9uIGluaXQobGluZW5vLCBjb2xubywgdGVtcGxhdGUsIG5hbWVzLCB3aXRoQ29udGV4dCkge1xuICAgIF9Ob2RlMy5wcm90b3R5cGUuaW5pdC5jYWxsKHRoaXMsIGxpbmVubywgY29sbm8sIHRlbXBsYXRlLCBuYW1lcyB8fCBuZXcgTm9kZUxpc3QoKSwgd2l0aENvbnRleHQpO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhGcm9tSW1wb3J0LCBbe1xuICAgIGtleTogXCJ0eXBlbmFtZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuICdGcm9tSW1wb3J0JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmllbGRzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gWyd0ZW1wbGF0ZScsICduYW1lcycsICd3aXRoQ29udGV4dCddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGcm9tSW1wb3J0O1xufShOb2RlKTtcblxudmFyIEZ1bkNhbGwgPSBOb2RlLmV4dGVuZCgnRnVuQ2FsbCcsIHtcbiAgZmllbGRzOiBbJ25hbWUnLCAnYXJncyddXG59KTtcbnZhciBGaWx0ZXIgPSBGdW5DYWxsLmV4dGVuZCgnRmlsdGVyJyk7XG52YXIgRmlsdGVyQXN5bmMgPSBGaWx0ZXIuZXh0ZW5kKCdGaWx0ZXJBc3luYycsIHtcbiAgZmllbGRzOiBbJ25hbWUnLCAnYXJncycsICdzeW1ib2wnXVxufSk7XG52YXIgS2V5d29yZEFyZ3MgPSBEaWN0LmV4dGVuZCgnS2V5d29yZEFyZ3MnKTtcbnZhciBCbG9jayA9IE5vZGUuZXh0ZW5kKCdCbG9jaycsIHtcbiAgZmllbGRzOiBbJ25hbWUnLCAnYm9keSddXG59KTtcbnZhciBTdXBlciA9IE5vZGUuZXh0ZW5kKCdTdXBlcicsIHtcbiAgZmllbGRzOiBbJ2Jsb2NrTmFtZScsICdzeW1ib2wnXVxufSk7XG52YXIgVGVtcGxhdGVSZWYgPSBOb2RlLmV4dGVuZCgnVGVtcGxhdGVSZWYnLCB7XG4gIGZpZWxkczogWyd0ZW1wbGF0ZSddXG59KTtcbnZhciBFeHRlbmRzID0gVGVtcGxhdGVSZWYuZXh0ZW5kKCdFeHRlbmRzJyk7XG52YXIgSW5jbHVkZSA9IE5vZGUuZXh0ZW5kKCdJbmNsdWRlJywge1xuICBmaWVsZHM6IFsndGVtcGxhdGUnLCAnaWdub3JlTWlzc2luZyddXG59KTtcbnZhciBTZXQgPSBOb2RlLmV4dGVuZCgnU2V0Jywge1xuICBmaWVsZHM6IFsndGFyZ2V0cycsICd2YWx1ZSddXG59KTtcbnZhciBTd2l0Y2ggPSBOb2RlLmV4dGVuZCgnU3dpdGNoJywge1xuICBmaWVsZHM6IFsnZXhwcicsICdjYXNlcycsICdkZWZhdWx0J11cbn0pO1xudmFyIENhc2UgPSBOb2RlLmV4dGVuZCgnQ2FzZScsIHtcbiAgZmllbGRzOiBbJ2NvbmQnLCAnYm9keSddXG59KTtcbnZhciBPdXRwdXQgPSBOb2RlTGlzdC5leHRlbmQoJ091dHB1dCcpO1xudmFyIENhcHR1cmUgPSBOb2RlLmV4dGVuZCgnQ2FwdHVyZScsIHtcbiAgZmllbGRzOiBbJ2JvZHknXVxufSk7XG52YXIgVGVtcGxhdGVEYXRhID0gTGl0ZXJhbC5leHRlbmQoJ1RlbXBsYXRlRGF0YScpO1xudmFyIFVuYXJ5T3AgPSBOb2RlLmV4dGVuZCgnVW5hcnlPcCcsIHtcbiAgZmllbGRzOiBbJ3RhcmdldCddXG59KTtcbnZhciBCaW5PcCA9IE5vZGUuZXh0ZW5kKCdCaW5PcCcsIHtcbiAgZmllbGRzOiBbJ2xlZnQnLCAncmlnaHQnXVxufSk7XG52YXIgSW4gPSBCaW5PcC5leHRlbmQoJ0luJyk7XG52YXIgSXMgPSBCaW5PcC5leHRlbmQoJ0lzJyk7XG52YXIgT3IgPSBCaW5PcC5leHRlbmQoJ09yJyk7XG52YXIgQW5kID0gQmluT3AuZXh0ZW5kKCdBbmQnKTtcbnZhciBOb3QgPSBVbmFyeU9wLmV4dGVuZCgnTm90Jyk7XG52YXIgQWRkID0gQmluT3AuZXh0ZW5kKCdBZGQnKTtcbnZhciBDb25jYXQgPSBCaW5PcC5leHRlbmQoJ0NvbmNhdCcpO1xudmFyIFN1YiA9IEJpbk9wLmV4dGVuZCgnU3ViJyk7XG52YXIgTXVsID0gQmluT3AuZXh0ZW5kKCdNdWwnKTtcbnZhciBEaXYgPSBCaW5PcC5leHRlbmQoJ0RpdicpO1xudmFyIEZsb29yRGl2ID0gQmluT3AuZXh0ZW5kKCdGbG9vckRpdicpO1xudmFyIE1vZCA9IEJpbk9wLmV4dGVuZCgnTW9kJyk7XG52YXIgUG93ID0gQmluT3AuZXh0ZW5kKCdQb3cnKTtcbnZhciBOZWcgPSBVbmFyeU9wLmV4dGVuZCgnTmVnJyk7XG52YXIgUG9zID0gVW5hcnlPcC5leHRlbmQoJ1BvcycpO1xudmFyIENvbXBhcmUgPSBOb2RlLmV4dGVuZCgnQ29tcGFyZScsIHtcbiAgZmllbGRzOiBbJ2V4cHInLCAnb3BzJ11cbn0pO1xudmFyIENvbXBhcmVPcGVyYW5kID0gTm9kZS5leHRlbmQoJ0NvbXBhcmVPcGVyYW5kJywge1xuICBmaWVsZHM6IFsnZXhwcicsICd0eXBlJ11cbn0pO1xudmFyIENhbGxFeHRlbnNpb24gPSBOb2RlLmV4dGVuZCgnQ2FsbEV4dGVuc2lvbicsIHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChleHQsIHByb3AsIGFyZ3MsIGNvbnRlbnRBcmdzKSB7XG4gICAgdGhpcy5wYXJlbnQoKTtcbiAgICB0aGlzLmV4dE5hbWUgPSBleHQuX19uYW1lIHx8IGV4dDtcbiAgICB0aGlzLnByb3AgPSBwcm9wO1xuICAgIHRoaXMuYXJncyA9IGFyZ3MgfHwgbmV3IE5vZGVMaXN0KCk7XG4gICAgdGhpcy5jb250ZW50QXJncyA9IGNvbnRlbnRBcmdzIHx8IFtdO1xuICAgIHRoaXMuYXV0b2VzY2FwZSA9IGV4dC5hdXRvZXNjYXBlO1xuICB9LFxuICBmaWVsZHM6IFsnZXh0TmFtZScsICdwcm9wJywgJ2FyZ3MnLCAnY29udGVudEFyZ3MnXVxufSk7XG52YXIgQ2FsbEV4dGVuc2lvbkFzeW5jID0gQ2FsbEV4dGVuc2lvbi5leHRlbmQoJ0NhbGxFeHRlbnNpb25Bc3luYycpOyAvLyBUaGlzIGlzIGhhY2t5LCBidXQgdGhpcyBpcyBqdXN0IGEgZGVidWdnaW5nIGZ1bmN0aW9uIGFueXdheVxuXG5mdW5jdGlvbiBwcmludChzdHIsIGluZGVudCwgaW5saW5lKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJyk7XG4gIGxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUsIGkpIHtcbiAgICBpZiAobGluZSAmJiAoaW5saW5lICYmIGkgPiAwIHx8ICFpbmxpbmUpKSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSgnICcucmVwZWF0KGluZGVudCkpO1xuICAgIH1cblxuICAgIHZhciBubCA9IGkgPT09IGxpbmVzLmxlbmd0aCAtIDEgPyAnJyA6ICdcXG4nO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXCIgKyBsaW5lICsgbmwpO1xuICB9KTtcbn0gLy8gUHJpbnQgdGhlIEFTVCBpbiBhIG5pY2VseSBmb3JtYXR0ZWQgdHJlZSBmb3JtYXQgZm9yIGRlYnVnZ2luXG5cblxuZnVuY3Rpb24gcHJpbnROb2Rlcyhub2RlLCBpbmRlbnQpIHtcbiAgaW5kZW50ID0gaW5kZW50IHx8IDA7XG4gIHByaW50KG5vZGUudHlwZW5hbWUgKyAnOiAnLCBpbmRlbnQpO1xuXG4gIGlmIChub2RlIGluc3RhbmNlb2YgTm9kZUxpc3QpIHtcbiAgICBwcmludCgnXFxuJyk7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICBwcmludE5vZGVzKG4sIGluZGVudCArIDIpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBDYWxsRXh0ZW5zaW9uKSB7XG4gICAgcHJpbnQobm9kZS5leHROYW1lICsgXCIuXCIgKyBub2RlLnByb3AgKyBcIlxcblwiKTtcblxuICAgIGlmIChub2RlLmFyZ3MpIHtcbiAgICAgIHByaW50Tm9kZXMobm9kZS5hcmdzLCBpbmRlbnQgKyAyKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZS5jb250ZW50QXJncykge1xuICAgICAgbm9kZS5jb250ZW50QXJncy5mb3JFYWNoKGZ1bmN0aW9uIChuKSB7XG4gICAgICAgIHByaW50Tm9kZXMobiwgaW5kZW50ICsgMik7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIHByb3BzID0gbnVsbDtcbiAgICBub2RlLml0ZXJGaWVsZHMoZnVuY3Rpb24gKHZhbCwgZmllbGROYW1lKSB7XG4gICAgICBpZiAodmFsIGluc3RhbmNlb2YgTm9kZSkge1xuICAgICAgICBub2Rlcy5wdXNoKFtmaWVsZE5hbWUsIHZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICAgICAgcHJvcHNbZmllbGROYW1lXSA9IHZhbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcm9wcykge1xuICAgICAgcHJpbnQoSlNPTi5zdHJpbmdpZnkocHJvcHMsIG51bGwsIDIpICsgJ1xcbicsIG51bGwsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmludCgnXFxuJyk7XG4gICAgfVxuXG4gICAgbm9kZXMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGZpZWxkTmFtZSA9IF9yZWZbMF0sXG4gICAgICAgICAgbiA9IF9yZWZbMV07XG4gICAgICBwcmludChcIltcIiArIGZpZWxkTmFtZSArIFwiXSA9PlwiLCBpbmRlbnQgKyAyKTtcbiAgICAgIHByaW50Tm9kZXMobiwgaW5kZW50ICsgNCk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE5vZGU6IE5vZGUsXG4gIFJvb3Q6IFJvb3QsXG4gIE5vZGVMaXN0OiBOb2RlTGlzdCxcbiAgVmFsdWU6IFZhbHVlLFxuICBMaXRlcmFsOiBMaXRlcmFsLFxuICBTeW1ib2w6IFN5bWJvbCxcbiAgR3JvdXA6IEdyb3VwLFxuICBBcnJheTogQXJyYXlOb2RlLFxuICBQYWlyOiBQYWlyLFxuICBEaWN0OiBEaWN0LFxuICBPdXRwdXQ6IE91dHB1dCxcbiAgQ2FwdHVyZTogQ2FwdHVyZSxcbiAgVGVtcGxhdGVEYXRhOiBUZW1wbGF0ZURhdGEsXG4gIElmOiBJZixcbiAgSWZBc3luYzogSWZBc3luYyxcbiAgSW5saW5lSWY6IElubGluZUlmLFxuICBGb3I6IEZvcixcbiAgQXN5bmNFYWNoOiBBc3luY0VhY2gsXG4gIEFzeW5jQWxsOiBBc3luY0FsbCxcbiAgTWFjcm86IE1hY3JvLFxuICBDYWxsZXI6IENhbGxlcixcbiAgSW1wb3J0OiBJbXBvcnQsXG4gIEZyb21JbXBvcnQ6IEZyb21JbXBvcnQsXG4gIEZ1bkNhbGw6IEZ1bkNhbGwsXG4gIEZpbHRlcjogRmlsdGVyLFxuICBGaWx0ZXJBc3luYzogRmlsdGVyQXN5bmMsXG4gIEtleXdvcmRBcmdzOiBLZXl3b3JkQXJncyxcbiAgQmxvY2s6IEJsb2NrLFxuICBTdXBlcjogU3VwZXIsXG4gIEV4dGVuZHM6IEV4dGVuZHMsXG4gIEluY2x1ZGU6IEluY2x1ZGUsXG4gIFNldDogU2V0LFxuICBTd2l0Y2g6IFN3aXRjaCxcbiAgQ2FzZTogQ2FzZSxcbiAgTG9va3VwVmFsOiBMb29rdXBWYWwsXG4gIEJpbk9wOiBCaW5PcCxcbiAgSW46IEluLFxuICBJczogSXMsXG4gIE9yOiBPcixcbiAgQW5kOiBBbmQsXG4gIE5vdDogTm90LFxuICBBZGQ6IEFkZCxcbiAgQ29uY2F0OiBDb25jYXQsXG4gIFN1YjogU3ViLFxuICBNdWw6IE11bCxcbiAgRGl2OiBEaXYsXG4gIEZsb29yRGl2OiBGbG9vckRpdixcbiAgTW9kOiBNb2QsXG4gIFBvdzogUG93LFxuICBOZWc6IE5lZyxcbiAgUG9zOiBQb3MsXG4gIENvbXBhcmU6IENvbXBhcmUsXG4gIENvbXBhcmVPcGVyYW5kOiBDb21wYXJlT3BlcmFuZCxcbiAgQ2FsbEV4dGVuc2lvbjogQ2FsbEV4dGVuc2lvbixcbiAgQ2FsbEV4dGVuc2lvbkFzeW5jOiBDYWxsRXh0ZW5zaW9uQXN5bmMsXG4gIHByaW50Tm9kZXM6IHByaW50Tm9kZXNcbn07XG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cblxuLyoqKi8gfSksXG4vKiA1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgcGFyc2VyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4KTtcblxudmFyIHRyYW5zZm9ybWVyID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cbnZhciBub2RlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMCksXG4gICAgVGVtcGxhdGVFcnJvciA9IF9yZXF1aXJlLlRlbXBsYXRlRXJyb3I7XG5cbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpLFxuICAgIEZyYW1lID0gX3JlcXVpcmUyLkZyYW1lO1xuXG52YXIgX3JlcXVpcmUzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKSxcbiAgICBPYmogPSBfcmVxdWlyZTMuT2JqOyAvLyBUaGVzZSBhcmUgYWxsIHRoZSBzYW1lIGZvciBub3csIGJ1dCBzaG91bGRuJ3QgYmUgcGFzc2VkIHN0cmFpZ2h0XG4vLyB0aHJvdWdoXG5cblxudmFyIGNvbXBhcmVPcHMgPSB7XG4gICc9PSc6ICc9PScsXG4gICc9PT0nOiAnPT09JyxcbiAgJyE9JzogJyE9JyxcbiAgJyE9PSc6ICchPT0nLFxuICAnPCc6ICc8JyxcbiAgJz4nOiAnPicsXG4gICc8PSc6ICc8PScsXG4gICc+PSc6ICc+PSdcbn07XG5cbnZhciBDb21waWxlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX09iaikge1xuICBfaW5oZXJpdHNMb29zZShDb21waWxlciwgX09iaik7XG5cbiAgZnVuY3Rpb24gQ29tcGlsZXIoKSB7XG4gICAgcmV0dXJuIF9PYmouYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IENvbXBpbGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQodGVtcGxhdGVOYW1lLCB0aHJvd09uVW5kZWZpbmVkKSB7XG4gICAgdGhpcy50ZW1wbGF0ZU5hbWUgPSB0ZW1wbGF0ZU5hbWU7XG4gICAgdGhpcy5jb2RlYnVmID0gW107XG4gICAgdGhpcy5sYXN0SWQgPSAwO1xuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgICB0aGlzLmJ1ZmZlclN0YWNrID0gW107XG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzID0gJyc7XG4gICAgdGhpcy5pbkJsb2NrID0gZmFsc2U7XG4gICAgdGhpcy50aHJvd09uVW5kZWZpbmVkID0gdGhyb3dPblVuZGVmaW5lZDtcbiAgfTtcblxuICBfcHJvdG8uZmFpbCA9IGZ1bmN0aW9uIGZhaWwobXNnLCBsaW5lbm8sIGNvbG5vKSB7XG4gICAgaWYgKGxpbmVubyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaW5lbm8gKz0gMTtcbiAgICB9XG5cbiAgICBpZiAoY29sbm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29sbm8gKz0gMTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVGVtcGxhdGVFcnJvcihtc2csIGxpbmVubywgY29sbm8pO1xuICB9O1xuXG4gIF9wcm90by5fcHVzaEJ1ZmZlciA9IGZ1bmN0aW9uIF9wdXNoQnVmZmVyKCkge1xuICAgIHZhciBpZCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLmJ1ZmZlclN0YWNrLnB1c2godGhpcy5idWZmZXIpO1xuICAgIHRoaXMuYnVmZmVyID0gaWQ7XG5cbiAgICB0aGlzLl9lbWl0KFwidmFyIFwiICsgdGhpcy5idWZmZXIgKyBcIiA9IFxcXCJcXFwiO1wiKTtcblxuICAgIHJldHVybiBpZDtcbiAgfTtcblxuICBfcHJvdG8uX3BvcEJ1ZmZlciA9IGZ1bmN0aW9uIF9wb3BCdWZmZXIoKSB7XG4gICAgdGhpcy5idWZmZXIgPSB0aGlzLmJ1ZmZlclN0YWNrLnBvcCgpO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdCA9IGZ1bmN0aW9uIF9lbWl0KGNvZGUpIHtcbiAgICB0aGlzLmNvZGVidWYucHVzaChjb2RlKTtcbiAgfTtcblxuICBfcHJvdG8uX2VtaXRMaW5lID0gZnVuY3Rpb24gX2VtaXRMaW5lKGNvZGUpIHtcbiAgICB0aGlzLl9lbWl0KGNvZGUgKyAnXFxuJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0TGluZXMgPSBmdW5jdGlvbiBfZW1pdExpbmVzKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbGluZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBsaW5lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICByZXR1cm4gX3RoaXMuX2VtaXRMaW5lKGxpbmUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdEZ1bmNCZWdpbiA9IGZ1bmN0aW9uIF9lbWl0RnVuY0JlZ2luKG5vZGUsIG5hbWUpIHtcbiAgICB0aGlzLmJ1ZmZlciA9ICdvdXRwdXQnO1xuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9ICcnO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJmdW5jdGlvbiBcIiArIG5hbWUgKyBcIihlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCBjYikge1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIGxpbmVubyA9IFwiICsgbm9kZS5saW5lbm8gKyBcIjtcIik7XG5cbiAgICB0aGlzLl9lbWl0TGluZShcInZhciBjb2xubyA9IFwiICsgbm9kZS5jb2xubyArIFwiO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgdGhpcy5idWZmZXIgKyBcIiA9IFxcXCJcXFwiO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0cnkgeycpO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdEZ1bmNFbmQgPSBmdW5jdGlvbiBfZW1pdEZ1bmNFbmQobm9SZXR1cm4pIHtcbiAgICBpZiAoIW5vUmV0dXJuKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnY2IobnVsbCwgJyArIHRoaXMuYnVmZmVyICsgJyk7Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2xvc2VTY29wZUxldmVscygpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30gY2F0Y2ggKGUpIHsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcgIGNiKHJ1bnRpbWUuaGFuZGxlRXJyb3IoZSwgbGluZW5vLCBjb2xubykpOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICB0aGlzLmJ1ZmZlciA9IG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLl9hZGRTY29wZUxldmVsID0gZnVuY3Rpb24gX2FkZFNjb3BlTGV2ZWwoKSB7XG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzICs9ICd9KSc7XG4gIH07XG5cbiAgX3Byb3RvLl9jbG9zZVNjb3BlTGV2ZWxzID0gZnVuY3Rpb24gX2Nsb3NlU2NvcGVMZXZlbHMoKSB7XG4gICAgdGhpcy5fZW1pdExpbmUodGhpcy5fc2NvcGVDbG9zZXJzICsgJzsnKTtcblxuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9ICcnO1xuICB9O1xuXG4gIF9wcm90by5fd2l0aFNjb3BlZFN5bnRheCA9IGZ1bmN0aW9uIF93aXRoU2NvcGVkU3ludGF4KGZ1bmMpIHtcbiAgICB2YXIgX3Njb3BlQ2xvc2VycyA9IHRoaXMuX3Njb3BlQ2xvc2VycztcbiAgICB0aGlzLl9zY29wZUNsb3NlcnMgPSAnJztcbiAgICBmdW5jLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLl9jbG9zZVNjb3BlTGV2ZWxzKCk7XG5cbiAgICB0aGlzLl9zY29wZUNsb3NlcnMgPSBfc2NvcGVDbG9zZXJzO1xuICB9O1xuXG4gIF9wcm90by5fbWFrZUNhbGxiYWNrID0gZnVuY3Rpb24gX21ha2VDYWxsYmFjayhyZXMpIHtcbiAgICB2YXIgZXJyID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHJldHVybiAnZnVuY3Rpb24oJyArIGVyciArIChyZXMgPyAnLCcgKyByZXMgOiAnJykgKyAnKSB7XFxuJyArICdpZignICsgZXJyICsgJykgeyBjYignICsgZXJyICsgJyk7IHJldHVybjsgfSc7XG4gIH07XG5cbiAgX3Byb3RvLl90bXBpZCA9IGZ1bmN0aW9uIF90bXBpZCgpIHtcbiAgICB0aGlzLmxhc3RJZCsrO1xuICAgIHJldHVybiAndF8nICsgdGhpcy5sYXN0SWQ7XG4gIH07XG5cbiAgX3Byb3RvLl90ZW1wbGF0ZU5hbWUgPSBmdW5jdGlvbiBfdGVtcGxhdGVOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLnRlbXBsYXRlTmFtZSA9PSBudWxsID8gJ3VuZGVmaW5lZCcgOiBKU09OLnN0cmluZ2lmeSh0aGlzLnRlbXBsYXRlTmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlQ2hpbGRyZW4gPSBmdW5jdGlvbiBfY29tcGlsZUNoaWxkcmVuKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICBfdGhpczIuY29tcGlsZShjaGlsZCwgZnJhbWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5fY29tcGlsZUFnZ3JlZ2F0ZSA9IGZ1bmN0aW9uIF9jb21waWxlQWdncmVnYXRlKG5vZGUsIGZyYW1lLCBzdGFydENoYXIsIGVuZENoYXIpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIGlmIChzdGFydENoYXIpIHtcbiAgICAgIHRoaXMuX2VtaXQoc3RhcnRDaGFyKTtcbiAgICB9XG5cbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkLCBpKSB7XG4gICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgX3RoaXMzLl9lbWl0KCcsJyk7XG4gICAgICB9XG5cbiAgICAgIF90aGlzMy5jb21waWxlKGNoaWxkLCBmcmFtZSk7XG4gICAgfSk7XG5cbiAgICBpZiAoZW5kQ2hhcikge1xuICAgICAgdGhpcy5fZW1pdChlbmRDaGFyKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIF9jb21waWxlRXhwcmVzc2lvbihub2RlLCBmcmFtZSkge1xuICAgIC8vIFRPRE86IEknbSBub3QgcmVhbGx5IHN1cmUgaWYgdGhpcyB0eXBlIGNoZWNrIGlzIHdvcnRoIGl0IG9yXG4gICAgLy8gbm90LlxuICAgIHRoaXMuYXNzZXJ0VHlwZShub2RlLCBub2Rlcy5MaXRlcmFsLCBub2Rlcy5TeW1ib2wsIG5vZGVzLkdyb3VwLCBub2Rlcy5BcnJheSwgbm9kZXMuRGljdCwgbm9kZXMuRnVuQ2FsbCwgbm9kZXMuQ2FsbGVyLCBub2Rlcy5GaWx0ZXIsIG5vZGVzLkxvb2t1cFZhbCwgbm9kZXMuQ29tcGFyZSwgbm9kZXMuSW5saW5lSWYsIG5vZGVzLkluLCBub2Rlcy5Jcywgbm9kZXMuQW5kLCBub2Rlcy5Pciwgbm9kZXMuTm90LCBub2Rlcy5BZGQsIG5vZGVzLkNvbmNhdCwgbm9kZXMuU3ViLCBub2Rlcy5NdWwsIG5vZGVzLkRpdiwgbm9kZXMuRmxvb3JEaXYsIG5vZGVzLk1vZCwgbm9kZXMuUG93LCBub2Rlcy5OZWcsIG5vZGVzLlBvcywgbm9kZXMuQ29tcGFyZSwgbm9kZXMuTm9kZUxpc3QpO1xuICAgIHRoaXMuY29tcGlsZShub2RlLCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmFzc2VydFR5cGUgPSBmdW5jdGlvbiBhc3NlcnRUeXBlKG5vZGUpIHtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHR5cGVzID0gbmV3IEFycmF5KF9sZW4yID4gMSA/IF9sZW4yIC0gMSA6IDApLCBfa2V5MiA9IDE7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIHR5cGVzW19rZXkyIC0gMV0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cblxuICAgIGlmICghdHlwZXMuc29tZShmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiB0O1xuICAgIH0pKSB7XG4gICAgICB0aGlzLmZhaWwoXCJhc3NlcnRUeXBlOiBpbnZhbGlkIHR5cGU6IFwiICsgbm9kZS50eXBlbmFtZSwgbm9kZS5saW5lbm8sIG5vZGUuY29sbm8pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUNhbGxFeHRlbnNpb24gPSBmdW5jdGlvbiBjb21waWxlQ2FsbEV4dGVuc2lvbihub2RlLCBmcmFtZSwgYXN5bmMpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIHZhciBhcmdzID0gbm9kZS5hcmdzO1xuICAgIHZhciBjb250ZW50QXJncyA9IG5vZGUuY29udGVudEFyZ3M7XG4gICAgdmFyIGF1dG9lc2NhcGUgPSB0eXBlb2Ygbm9kZS5hdXRvZXNjYXBlID09PSAnYm9vbGVhbicgPyBub2RlLmF1dG9lc2NhcGUgOiB0cnVlO1xuXG4gICAgaWYgKCFhc3luYykge1xuICAgICAgdGhpcy5fZW1pdCh0aGlzLmJ1ZmZlciArIFwiICs9IHJ1bnRpbWUuc3VwcHJlc3NWYWx1ZShcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdChcImVudi5nZXRFeHRlbnNpb24oXFxcIlwiICsgbm9kZS5leHROYW1lICsgXCJcXFwiKVtcXFwiXCIgKyBub2RlLnByb3AgKyBcIlxcXCJdKFwiKTtcblxuICAgIHRoaXMuX2VtaXQoJ2NvbnRleHQnKTtcblxuICAgIGlmIChhcmdzIHx8IGNvbnRlbnRBcmdzKSB7XG4gICAgICB0aGlzLl9lbWl0KCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3MpIHtcbiAgICAgIGlmICghKGFyZ3MgaW5zdGFuY2VvZiBub2Rlcy5Ob2RlTGlzdCkpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdjb21waWxlQ2FsbEV4dGVuc2lvbjogYXJndW1lbnRzIG11c3QgYmUgYSBOb2RlTGlzdCwgJyArICd1c2UgYHBhcnNlci5wYXJzZVNpZ25hdHVyZWAnKTtcbiAgICAgIH1cblxuICAgICAgYXJncy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChhcmcsIGkpIHtcbiAgICAgICAgLy8gVGFnIGFyZ3VtZW50cyBhcmUgcGFzc2VkIG5vcm1hbGx5IHRvIHRoZSBjYWxsLiBOb3RlXG4gICAgICAgIC8vIHRoYXQga2V5d29yZCBhcmd1bWVudHMgYXJlIHR1cm5lZCBpbnRvIGEgc2luZ2xlIGpzXG4gICAgICAgIC8vIG9iamVjdCBhcyB0aGUgbGFzdCBhcmd1bWVudCwgaWYgdGhleSBleGlzdC5cbiAgICAgICAgX3RoaXM0Ll9jb21waWxlRXhwcmVzc2lvbihhcmcsIGZyYW1lKTtcblxuICAgICAgICBpZiAoaSAhPT0gYXJncy5jaGlsZHJlbi5sZW5ndGggLSAxIHx8IGNvbnRlbnRBcmdzLmxlbmd0aCkge1xuICAgICAgICAgIF90aGlzNC5fZW1pdCgnLCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY29udGVudEFyZ3MubGVuZ3RoKSB7XG4gICAgICBjb250ZW50QXJncy5mb3JFYWNoKGZ1bmN0aW9uIChhcmcsIGkpIHtcbiAgICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgICAgX3RoaXM0Ll9lbWl0KCcsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJnKSB7XG4gICAgICAgICAgX3RoaXM0Ll9lbWl0TGluZSgnZnVuY3Rpb24oY2IpIHsnKTtcblxuICAgICAgICAgIF90aGlzNC5fZW1pdExpbmUoJ2lmKCFjYikgeyBjYiA9IGZ1bmN0aW9uKGVycikgeyBpZihlcnIpIHsgdGhyb3cgZXJyOyB9fX0nKTtcblxuICAgICAgICAgIHZhciBpZCA9IF90aGlzNC5fcHVzaEJ1ZmZlcigpO1xuXG4gICAgICAgICAgX3RoaXM0Ll93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzNC5jb21waWxlKGFyZywgZnJhbWUpO1xuXG4gICAgICAgICAgICBfdGhpczQuX2VtaXRMaW5lKFwiY2IobnVsbCwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBfdGhpczQuX3BvcEJ1ZmZlcigpO1xuXG4gICAgICAgICAgX3RoaXM0Ll9lbWl0TGluZShcInJldHVybiBcIiArIGlkICsgXCI7XCIpO1xuXG4gICAgICAgICAgX3RoaXM0Ll9lbWl0TGluZSgnfScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF90aGlzNC5fZW1pdCgnbnVsbCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIHZhciByZXMgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnLCAnICsgdGhpcy5fbWFrZUNhbGxiYWNrKHJlcykpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSh0aGlzLmJ1ZmZlciArIFwiICs9IHJ1bnRpbWUuc3VwcHJlc3NWYWx1ZShcIiArIHJlcyArIFwiLCBcIiArIGF1dG9lc2NhcGUgKyBcIiAmJiBlbnYub3B0cy5hdXRvZXNjYXBlKTtcIik7XG5cbiAgICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdCgnKScpO1xuXG4gICAgICB0aGlzLl9lbWl0KFwiLCBcIiArIGF1dG9lc2NhcGUgKyBcIiAmJiBlbnYub3B0cy5hdXRvZXNjYXBlKTtcXG5cIik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ2FsbEV4dGVuc2lvbkFzeW5jID0gZnVuY3Rpb24gY29tcGlsZUNhbGxFeHRlbnNpb25Bc3luYyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuY29tcGlsZUNhbGxFeHRlbnNpb24obm9kZSwgZnJhbWUsIHRydWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTm9kZUxpc3QgPSBmdW5jdGlvbiBjb21waWxlTm9kZUxpc3Qobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9jb21waWxlQ2hpbGRyZW4obm9kZSwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTGl0ZXJhbCA9IGZ1bmN0aW9uIGNvbXBpbGVMaXRlcmFsKG5vZGUpIHtcbiAgICBpZiAodHlwZW9mIG5vZGUudmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YXIgdmFsID0gbm9kZS52YWx1ZS5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpO1xuICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKTtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJyk7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFxyL2csICdcXFxccicpO1xuICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKTtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHUyMDI4L2csIFwiXFxcXHUyMDI4XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0KFwiXFxcIlwiICsgdmFsICsgXCJcXFwiXCIpO1xuICAgIH0gZWxzZSBpZiAobm9kZS52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5fZW1pdCgnbnVsbCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbWl0KG5vZGUudmFsdWUudG9TdHJpbmcoKSk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlU3ltYm9sID0gZnVuY3Rpb24gY29tcGlsZVN5bWJvbChub2RlLCBmcmFtZSkge1xuICAgIHZhciBuYW1lID0gbm9kZS52YWx1ZTtcbiAgICB2YXIgdiA9IGZyYW1lLmxvb2t1cChuYW1lKTtcblxuICAgIGlmICh2KSB7XG4gICAgICB0aGlzLl9lbWl0KHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbWl0KCdydW50aW1lLmNvbnRleHRPckZyYW1lTG9va3VwKCcgKyAnY29udGV4dCwgZnJhbWUsIFwiJyArIG5hbWUgKyAnXCIpJyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlR3JvdXAgPSBmdW5jdGlvbiBjb21waWxlR3JvdXAobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9jb21waWxlQWdncmVnYXRlKG5vZGUsIGZyYW1lLCAnKCcsICcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVBcnJheSA9IGZ1bmN0aW9uIGNvbXBpbGVBcnJheShub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsICdbJywgJ10nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZURpY3QgPSBmdW5jdGlvbiBjb21waWxlRGljdChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsICd7JywgJ30nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVBhaXIgPSBmdW5jdGlvbiBjb21waWxlUGFpcihub2RlLCBmcmFtZSkge1xuICAgIHZhciBrZXkgPSBub2RlLmtleTtcbiAgICB2YXIgdmFsID0gbm9kZS52YWx1ZTtcblxuICAgIGlmIChrZXkgaW5zdGFuY2VvZiBub2Rlcy5TeW1ib2wpIHtcbiAgICAgIGtleSA9IG5ldyBub2Rlcy5MaXRlcmFsKGtleS5saW5lbm8sIGtleS5jb2xubywga2V5LnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKCEoa2V5IGluc3RhbmNlb2Ygbm9kZXMuTGl0ZXJhbCAmJiB0eXBlb2Yga2V5LnZhbHVlID09PSAnc3RyaW5nJykpIHtcbiAgICAgIHRoaXMuZmFpbCgnY29tcGlsZVBhaXI6IERpY3Qga2V5cyBtdXN0IGJlIHN0cmluZ3Mgb3IgbmFtZXMnLCBrZXkubGluZW5vLCBrZXkuY29sbm8pO1xuICAgIH1cblxuICAgIHRoaXMuY29tcGlsZShrZXksIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJzogJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbih2YWwsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlubGluZUlmID0gZnVuY3Rpb24gY29tcGlsZUlubGluZUlmKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnKCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUuY29uZCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnPycpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnOicpO1xuXG4gICAgaWYgKG5vZGUuZWxzZV8gIT09IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcGlsZShub2RlLmVsc2VfLCBmcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoJ1wiXCInKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVJbiA9IGZ1bmN0aW9uIGNvbXBpbGVJbihub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUuaW5PcGVyYXRvcignKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJywnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnJpZ2h0LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVJcyA9IGZ1bmN0aW9uIGNvbXBpbGVJcyhub2RlLCBmcmFtZSkge1xuICAgIC8vIGZpcnN0LCB3ZSBuZWVkIHRvIHRyeSB0byBnZXQgdGhlIG5hbWUgb2YgdGhlIHRlc3QgZnVuY3Rpb24sIGlmIGl0J3MgYVxuICAgIC8vIGNhbGxhYmxlIChpLmUuLCBoYXMgYXJncykgYW5kIG5vdCBhIHN5bWJvbC5cbiAgICB2YXIgcmlnaHQgPSBub2RlLnJpZ2h0Lm5hbWUgPyBub2RlLnJpZ2h0Lm5hbWUudmFsdWUgLy8gb3RoZXJ3aXNlIGdvIHdpdGggdGhlIHN5bWJvbCB2YWx1ZVxuICAgIDogbm9kZS5yaWdodC52YWx1ZTtcblxuICAgIHRoaXMuX2VtaXQoJ2Vudi5nZXRUZXN0KFwiJyArIHJpZ2h0ICsgJ1wiKS5jYWxsKGNvbnRleHQsICcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUubGVmdCwgZnJhbWUpOyAvLyBjb21waWxlIHRoZSBhcmd1bWVudHMgZm9yIHRoZSBjYWxsYWJsZSBpZiB0aGV5IGV4aXN0XG5cbiAgICBpZiAobm9kZS5yaWdodC5hcmdzKSB7XG4gICAgICB0aGlzLl9lbWl0KCcsJyk7XG5cbiAgICAgIHRoaXMuY29tcGlsZShub2RlLnJpZ2h0LmFyZ3MsIGZyYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0KCcpID09PSB0cnVlJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9iaW5PcEVtaXR0ZXIgPSBmdW5jdGlvbiBfYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCBzdHIpIHtcbiAgICB0aGlzLmNvbXBpbGUobm9kZS5sZWZ0LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KHN0cik7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5yaWdodCwgZnJhbWUpO1xuICB9IC8vIGVuc3VyZSBjb25jYXRlbmF0aW9uIGluc3RlYWQgb2YgYWRkaXRpb25cbiAgLy8gYnkgYWRkaW5nIGVtcHR5IHN0cmluZyBpbiBiZXR3ZWVuXG4gIDtcblxuICBfcHJvdG8uY29tcGlsZU9yID0gZnVuY3Rpb24gY29tcGlsZU9yKG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyB8fCAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFuZCA9IGZ1bmN0aW9uIGNvbXBpbGVBbmQobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICYmICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQWRkID0gZnVuY3Rpb24gY29tcGlsZUFkZChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgKyAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUNvbmNhdCA9IGZ1bmN0aW9uIGNvbXBpbGVDb25jYXQobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICsgXCJcIiArICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlU3ViID0gZnVuY3Rpb24gY29tcGlsZVN1Yihub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgLSAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZU11bCA9IGZ1bmN0aW9uIGNvbXBpbGVNdWwobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnICogJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVEaXYgPSBmdW5jdGlvbiBjb21waWxlRGl2KG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyAvICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTW9kID0gZnVuY3Rpb24gY29tcGlsZU1vZChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgJSAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZU5vdCA9IGZ1bmN0aW9uIGNvbXBpbGVOb3Qobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCchJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS50YXJnZXQsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZsb29yRGl2ID0gZnVuY3Rpb24gY29tcGlsZUZsb29yRGl2KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnTWF0aC5mbG9vcignKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyAvICcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVBvdyA9IGZ1bmN0aW9uIGNvbXBpbGVQb3cobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdNYXRoLnBvdygnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJywgJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5yaWdodCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTmVnID0gZnVuY3Rpb24gY29tcGlsZU5lZyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJy0nKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnRhcmdldCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUG9zID0gZnVuY3Rpb24gY29tcGlsZVBvcyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJysnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnRhcmdldCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBpbGVDb21wYXJlKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5leHByLCBmcmFtZSk7XG4gICAgbm9kZS5vcHMuZm9yRWFjaChmdW5jdGlvbiAob3ApIHtcbiAgICAgIF90aGlzNS5fZW1pdChcIiBcIiArIGNvbXBhcmVPcHNbb3AudHlwZV0gKyBcIiBcIik7XG5cbiAgICAgIF90aGlzNS5jb21waWxlKG9wLmV4cHIsIGZyYW1lKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUxvb2t1cFZhbCA9IGZ1bmN0aW9uIGNvbXBpbGVMb29rdXBWYWwobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdydW50aW1lLm1lbWJlckxvb2t1cCgoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnRhcmdldCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKSwnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudmFsLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9nZXROb2RlTmFtZSA9IGZ1bmN0aW9uIF9nZXROb2RlTmFtZShub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLnR5cGVuYW1lKSB7XG4gICAgICBjYXNlICdTeW1ib2wnOlxuICAgICAgICByZXR1cm4gbm9kZS52YWx1ZTtcblxuICAgICAgY2FzZSAnRnVuQ2FsbCc6XG4gICAgICAgIHJldHVybiAndGhlIHJldHVybiB2YWx1ZSBvZiAoJyArIHRoaXMuX2dldE5vZGVOYW1lKG5vZGUubmFtZSkgKyAnKSc7XG5cbiAgICAgIGNhc2UgJ0xvb2t1cFZhbCc6XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXROb2RlTmFtZShub2RlLnRhcmdldCkgKyAnW1wiJyArIHRoaXMuX2dldE5vZGVOYW1lKG5vZGUudmFsKSArICdcIl0nO1xuXG4gICAgICBjYXNlICdMaXRlcmFsJzpcbiAgICAgICAgcmV0dXJuIG5vZGUudmFsdWUudG9TdHJpbmcoKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICctLWV4cHJlc3Npb24tLSc7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlRnVuQ2FsbCA9IGZ1bmN0aW9uIGNvbXBpbGVGdW5DYWxsKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gS2VlcCB0cmFjayBvZiBsaW5lL2NvbCBpbmZvIGF0IHJ1bnRpbWUgYnkgc2V0dGluZ3NcbiAgICAvLyB2YXJpYWJsZXMgd2l0aGluIGFuIGV4cHJlc3Npb24uIEFuIGV4cHJlc3Npb24gaW4gamF2YXNjcmlwdFxuICAgIC8vIGxpa2UgKHgsIHksIHopIHJldHVybnMgdGhlIGxhc3QgdmFsdWUsIGFuZCB4IGFuZCB5IGNhbiBiZVxuICAgIC8vIGFueXRoaW5nXG4gICAgdGhpcy5fZW1pdCgnKGxpbmVubyA9ICcgKyBub2RlLmxpbmVubyArICcsIGNvbG5vID0gJyArIG5vZGUuY29sbm8gKyAnLCAnKTtcblxuICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUuY2FsbFdyYXAoJyk7IC8vIENvbXBpbGUgaXQgYXMgbm9ybWFsLlxuXG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLm5hbWUsIGZyYW1lKTsgLy8gT3V0cHV0IHRoZSBuYW1lIG9mIHdoYXQgd2UncmUgY2FsbGluZyBzbyB3ZSBjYW4gZ2V0IGZyaWVuZGx5IGVycm9yc1xuICAgIC8vIGlmIHRoZSBsb29rdXAgZmFpbHMuXG5cblxuICAgIHRoaXMuX2VtaXQoJywgXCInICsgdGhpcy5fZ2V0Tm9kZU5hbWUobm9kZS5uYW1lKS5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgKyAnXCIsIGNvbnRleHQsICcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLmFyZ3MsIGZyYW1lLCAnWycsICddKScpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRmlsdGVyID0gZnVuY3Rpb24gY29tcGlsZUZpbHRlcihub2RlLCBmcmFtZSkge1xuICAgIHZhciBuYW1lID0gbm9kZS5uYW1lO1xuICAgIHRoaXMuYXNzZXJ0VHlwZShuYW1lLCBub2Rlcy5TeW1ib2wpO1xuXG4gICAgdGhpcy5fZW1pdCgnZW52LmdldEZpbHRlcihcIicgKyBuYW1lLnZhbHVlICsgJ1wiKS5jYWxsKGNvbnRleHQsICcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLmFyZ3MsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZpbHRlckFzeW5jID0gZnVuY3Rpb24gY29tcGlsZUZpbHRlckFzeW5jKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgdmFyIHN5bWJvbCA9IG5vZGUuc3ltYm9sLnZhbHVlO1xuICAgIHRoaXMuYXNzZXJ0VHlwZShuYW1lLCBub2Rlcy5TeW1ib2wpO1xuICAgIGZyYW1lLnNldChzeW1ib2wsIHN5bWJvbCk7XG5cbiAgICB0aGlzLl9lbWl0KCdlbnYuZ2V0RmlsdGVyKFwiJyArIG5hbWUudmFsdWUgKyAnXCIpLmNhbGwoY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLl9jb21waWxlQWdncmVnYXRlKG5vZGUuYXJncywgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJywgJyArIHRoaXMuX21ha2VDYWxsYmFjayhzeW1ib2wpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUtleXdvcmRBcmdzID0gZnVuY3Rpb24gY29tcGlsZUtleXdvcmRBcmdzKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgncnVudGltZS5tYWtlS2V5d29yZEFyZ3MoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGVEaWN0KG5vZGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVNldCA9IGZ1bmN0aW9uIGNvbXBpbGVTZXQobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIHZhciBpZHMgPSBbXTsgLy8gTG9va3VwIHRoZSB2YXJpYWJsZSBuYW1lcyBmb3IgZWFjaCBpZGVudGlmaWVyIGFuZCBjcmVhdGVcbiAgICAvLyBuZXcgb25lcyBpZiBuZWNlc3NhcnlcblxuICAgIG5vZGUudGFyZ2V0cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgIHZhciBuYW1lID0gdGFyZ2V0LnZhbHVlO1xuICAgICAgdmFyIGlkID0gZnJhbWUubG9va3VwKG5hbWUpO1xuXG4gICAgICBpZiAoaWQgPT09IG51bGwgfHwgaWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZCA9IF90aGlzNi5fdG1waWQoKTsgLy8gTm90ZTogVGhpcyByZWxpZXMgb24ganMgYWxsb3dpbmcgc2NvcGUgYWNyb3NzXG4gICAgICAgIC8vIGJsb2NrcywgaW4gY2FzZSB0aGlzIGlzIGNyZWF0ZWQgaW5zaWRlIGFuIGBpZmBcblxuICAgICAgICBfdGhpczYuX2VtaXRMaW5lKCd2YXIgJyArIGlkICsgJzsnKTtcbiAgICAgIH1cblxuICAgICAgaWRzLnB1c2goaWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKG5vZGUudmFsdWUpIHtcbiAgICAgIHRoaXMuX2VtaXQoaWRzLmpvaW4oJyA9ICcpICsgJyA9ICcpO1xuXG4gICAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnZhbHVlLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoaWRzLmpvaW4oJyA9ICcpICsgJyA9ICcpO1xuXG4gICAgICB0aGlzLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG4gICAgfVxuXG4gICAgbm9kZS50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCwgaSkge1xuICAgICAgdmFyIGlkID0gaWRzW2ldO1xuICAgICAgdmFyIG5hbWUgPSB0YXJnZXQudmFsdWU7IC8vIFdlIGFyZSBydW5uaW5nIHRoaXMgZm9yIGV2ZXJ5IHZhciwgYnV0IGl0J3MgdmVyeVxuICAgICAgLy8gdW5jb21tb24gdG8gYXNzaWduIHRvIG11bHRpcGxlIHZhcnMgYW55d2F5XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgXCIgKyBpZCArIFwiLCB0cnVlKTtcIik7XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoJ2lmKGZyYW1lLnRvcExldmVsKSB7Jyk7XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuXG4gICAgICBfdGhpczYuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSAhPT0gJ18nKSB7XG4gICAgICAgIF90aGlzNi5fZW1pdExpbmUoJ2lmKGZyYW1lLnRvcExldmVsKSB7Jyk7XG5cbiAgICAgICAgX3RoaXM2Ll9lbWl0TGluZShcImNvbnRleHQuYWRkRXhwb3J0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuXG4gICAgICAgIF90aGlzNi5fZW1pdExpbmUoJ30nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVN3aXRjaCA9IGZ1bmN0aW9uIGNvbXBpbGVTd2l0Y2gobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXM3ID0gdGhpcztcblxuICAgIHRoaXMuX2VtaXQoJ3N3aXRjaCAoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5leHByLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpIHsnKTtcblxuICAgIG5vZGUuY2FzZXMuZm9yRWFjaChmdW5jdGlvbiAoYywgaSkge1xuICAgICAgX3RoaXM3Ll9lbWl0KCdjYXNlICcpO1xuXG4gICAgICBfdGhpczcuY29tcGlsZShjLmNvbmQsIGZyYW1lKTtcblxuICAgICAgX3RoaXM3Ll9lbWl0KCc6ICcpO1xuXG4gICAgICBfdGhpczcuY29tcGlsZShjLmJvZHksIGZyYW1lKTsgLy8gcHJlc2VydmUgZmFsbC10aHJvdWdoc1xuXG5cbiAgICAgIGlmIChjLmJvZHkuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIF90aGlzNy5fZW1pdExpbmUoJ2JyZWFrOycpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vZGUuZGVmYXVsdCkge1xuICAgICAgdGhpcy5fZW1pdCgnZGVmYXVsdDonKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZGVmYXVsdCwgZnJhbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJ30nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlmID0gZnVuY3Rpb24gY29tcGlsZUlmKG5vZGUsIGZyYW1lLCBhc3luYykge1xuICAgIHZhciBfdGhpczggPSB0aGlzO1xuXG4gICAgdGhpcy5fZW1pdCgnaWYoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLmNvbmQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcpIHsnKTtcblxuICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXM4LmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICAgIGlmIChhc3luYykge1xuICAgICAgICBfdGhpczguX2VtaXQoJ2NiKCknKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub2RlLmVsc2VfKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnfVxcbmVsc2UgeycpO1xuXG4gICAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXM4LmNvbXBpbGUobm9kZS5lbHNlXywgZnJhbWUpO1xuXG4gICAgICAgIGlmIChhc3luYykge1xuICAgICAgICAgIF90aGlzOC5fZW1pdCgnY2IoKScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGFzeW5jKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnfVxcbmVsc2UgeycpO1xuXG4gICAgICB0aGlzLl9lbWl0KCdjYigpJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlmQXN5bmMgPSBmdW5jdGlvbiBjb21waWxlSWZBc3luYyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJyhmdW5jdGlvbihjYikgeycpO1xuXG4gICAgdGhpcy5jb21waWxlSWYobm9kZSwgZnJhbWUsIHRydWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnfSkoJyArIHRoaXMuX21ha2VDYWxsYmFjaygpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uX2VtaXRMb29wQmluZGluZ3MgPSBmdW5jdGlvbiBfZW1pdExvb3BCaW5kaW5ncyhub2RlLCBhcnIsIGksIGxlbikge1xuICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgdmFyIGJpbmRpbmdzID0gW3tcbiAgICAgIG5hbWU6ICdpbmRleCcsXG4gICAgICB2YWw6IGkgKyBcIiArIDFcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdpbmRleDAnLFxuICAgICAgdmFsOiBpXG4gICAgfSwge1xuICAgICAgbmFtZTogJ3JldmluZGV4JyxcbiAgICAgIHZhbDogbGVuICsgXCIgLSBcIiArIGlcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncmV2aW5kZXgwJyxcbiAgICAgIHZhbDogbGVuICsgXCIgLSBcIiArIGkgKyBcIiAtIDFcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdmaXJzdCcsXG4gICAgICB2YWw6IGkgKyBcIiA9PT0gMFwiXG4gICAgfSwge1xuICAgICAgbmFtZTogJ2xhc3QnLFxuICAgICAgdmFsOiBpICsgXCIgPT09IFwiICsgbGVuICsgXCIgLSAxXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiAnbGVuZ3RoJyxcbiAgICAgIHZhbDogbGVuXG4gICAgfV07XG4gICAgYmluZGluZ3MuZm9yRWFjaChmdW5jdGlvbiAoYikge1xuICAgICAgX3RoaXM5Ll9lbWl0TGluZShcImZyYW1lLnNldChcXFwibG9vcC5cIiArIGIubmFtZSArIFwiXFxcIiwgXCIgKyBiLnZhbCArIFwiKTtcIik7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVGb3IgPSBmdW5jdGlvbiBjb21waWxlRm9yKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgLy8gU29tZSBvZiB0aGlzIGNvZGUgaXMgdWdseSwgYnV0IGl0IGtlZXBzIHRoZSBnZW5lcmF0ZWQgY29kZVxuICAgIC8vIGFzIGZhc3QgYXMgcG9zc2libGUuIEZvckFzeW5jIGFsc28gc2hhcmVzIHNvbWUgb2YgdGhpcywgYnV0XG4gICAgLy8gbm90IG11Y2guXG4gICAgdmFyIGkgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIGxlbiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgYXJyID0gdGhpcy5fdG1waWQoKTtcblxuICAgIGZyYW1lID0gZnJhbWUucHVzaCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gZnJhbWUucHVzaCgpOycpO1xuXG4gICAgdGhpcy5fZW1pdChcInZhciBcIiArIGFyciArIFwiID0gXCIpO1xuXG4gICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5hcnIsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCc7Jyk7XG5cbiAgICB0aGlzLl9lbWl0KFwiaWYoXCIgKyBhcnIgKyBcIikge1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKGFyciArICcgPSBydW50aW1lLmZyb21JdGVyYXRvcignICsgYXJyICsgJyk7Jyk7IC8vIElmIG11bHRpcGxlIG5hbWVzIGFyZSBwYXNzZWQsIHdlIG5lZWQgdG8gYmluZCB0aGVtXG4gICAgLy8gYXBwcm9wcmlhdGVseVxuXG5cbiAgICBpZiAobm9kZS5uYW1lIGluc3RhbmNlb2Ygbm9kZXMuQXJyYXkpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgaSArIFwiO1wiKTsgLy8gVGhlIG9iamVjdCBjb3VsZCBiZSBhbiBhcnJveSBvciBvYmplY3QuIE5vdGUgdGhhdCB0aGVcbiAgICAgIC8vIGJvZHkgb2YgdGhlIGxvb3AgaXMgZHVwbGljYXRlZCBmb3IgZWFjaCBjb25kaXRpb24sIGJ1dFxuICAgICAgLy8gd2UgYXJlIG9wdGltaXppbmcgZm9yIHNwZWVkIG92ZXIgc2l6ZS5cblxuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImlmKHJ1bnRpbWUuaXNBcnJheShcIiArIGFyciArIFwiKSkge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IFwiICsgYXJyICsgXCIubGVuZ3RoO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmb3IoXCIgKyBpICsgXCI9MDsgXCIgKyBpICsgXCIgPCBcIiArIGFyciArIFwiLmxlbmd0aDsgXCIgKyBpICsgXCIrKykge1wiKTsgLy8gQmluZCBlYWNoIGRlY2xhcmVkIHZhclxuXG5cbiAgICAgIG5vZGUubmFtZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCwgdSkge1xuICAgICAgICB2YXIgdGlkID0gX3RoaXMxMC5fdG1waWQoKTtcblxuICAgICAgICBfdGhpczEwLl9lbWl0TGluZShcInZhciBcIiArIHRpZCArIFwiID0gXCIgKyBhcnIgKyBcIltcIiArIGkgKyBcIl1bXCIgKyB1ICsgXCJdO1wiKTtcblxuICAgICAgICBfdGhpczEwLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBjaGlsZCArIFwiXFxcIiwgXCIgKyBhcnIgKyBcIltcIiArIGkgKyBcIl1bXCIgKyB1ICsgXCJdKTtcIik7XG5cbiAgICAgICAgZnJhbWUuc2V0KG5vZGUubmFtZS5jaGlsZHJlblt1XS52YWx1ZSwgdGlkKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKTtcblxuICAgICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMTAuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfSBlbHNlIHsnKTsgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXkvdmFsdWVzIG9mIGFuIG9iamVjdFxuXG5cbiAgICAgIHZhciBfbm9kZSRuYW1lJGNoaWxkcmVuID0gbm9kZS5uYW1lLmNoaWxkcmVuLFxuICAgICAgICAgIGtleSA9IF9ub2RlJG5hbWUkY2hpbGRyZW5bMF0sXG4gICAgICAgICAgdmFsID0gX25vZGUkbmFtZSRjaGlsZHJlblsxXTtcblxuICAgICAgdmFyIGsgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgICB2YXIgdiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIGZyYW1lLnNldChrZXkudmFsdWUsIGspO1xuICAgICAgZnJhbWUuc2V0KHZhbC52YWx1ZSwgdik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKGkgKyBcIiA9IC0xO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IHJ1bnRpbWUua2V5cyhcIiArIGFyciArIFwiKS5sZW5ndGg7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZvcih2YXIgXCIgKyBrICsgXCIgaW4gXCIgKyBhcnIgKyBcIikge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoaSArIFwiKys7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInZhciBcIiArIHYgKyBcIiA9IFwiICsgYXJyICsgXCJbXCIgKyBrICsgXCJdO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsga2V5LnZhbHVlICsgXCJcXFwiLCBcIiArIGsgKyBcIik7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyB2YWwudmFsdWUgKyBcIlxcXCIsIFwiICsgdiArIFwiKTtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMb29wQmluZGluZ3Mobm9kZSwgYXJyLCBpLCBsZW4pO1xuXG4gICAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMxMC5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEdlbmVyYXRlIGEgdHlwaWNhbCBhcnJheSBpdGVyYXRpb25cbiAgICAgIHZhciBfdiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIGZyYW1lLnNldChub2RlLm5hbWUudmFsdWUsIF92KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBsZW4gKyBcIiA9IFwiICsgYXJyICsgXCIubGVuZ3RoO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmb3IodmFyIFwiICsgaSArIFwiPTA7IFwiICsgaSArIFwiIDwgXCIgKyBhcnIgKyBcIi5sZW5ndGg7IFwiICsgaSArIFwiKyspIHtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgX3YgKyBcIiA9IFwiICsgYXJyICsgXCJbXCIgKyBpICsgXCJdO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgbm9kZS5uYW1lLnZhbHVlICsgXCJcXFwiLCBcIiArIF92ICsgXCIpO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExvb3BCaW5kaW5ncyhub2RlLCBhcnIsIGksIGxlbik7XG5cbiAgICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczEwLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgaWYgKG5vZGUuZWxzZV8pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdpZiAoIScgKyBsZW4gKyAnKSB7Jyk7XG5cbiAgICAgIHRoaXMuY29tcGlsZShub2RlLmVsc2VfLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gZnJhbWUucG9wKCk7Jyk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlQXN5bmNMb29wID0gZnVuY3Rpb24gX2NvbXBpbGVBc3luY0xvb3Aobm9kZSwgZnJhbWUsIHBhcmFsbGVsKSB7XG4gICAgdmFyIF90aGlzMTEgPSB0aGlzO1xuXG4gICAgLy8gVGhpcyBzaGFyZXMgc29tZSBjb2RlIHdpdGggdGhlIEZvciB0YWcsIGJ1dCBub3QgZW5vdWdoIHRvXG4gICAgLy8gd29ycnkgYWJvdXQuIFRoaXMgaXRlcmF0ZXMgYWNyb3NzIGFuIG9iamVjdCBhc3luY2hyb25vdXNseSxcbiAgICAvLyBidXQgbm90IGluIHBhcmFsbGVsLlxuICAgIHZhciBpID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBsZW4gPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIGFyciA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgYXN5bmNNZXRob2QgPSBwYXJhbGxlbCA/ICdhc3luY0FsbCcgOiAnYXN5bmNFYWNoJztcbiAgICBmcmFtZSA9IGZyYW1lLnB1c2goKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmcmFtZSA9IGZyYW1lLnB1c2goKTsnKTtcblxuICAgIHRoaXMuX2VtaXQoJ3ZhciAnICsgYXJyICsgJyA9IHJ1bnRpbWUuZnJvbUl0ZXJhdG9yKCcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5hcnIsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcpOycpO1xuXG4gICAgaWYgKG5vZGUubmFtZSBpbnN0YW5jZW9mIG5vZGVzLkFycmF5KSB7XG4gICAgICB2YXIgYXJyYXlMZW4gPSBub2RlLm5hbWUuY2hpbGRyZW4ubGVuZ3RoO1xuXG4gICAgICB0aGlzLl9lbWl0KFwicnVudGltZS5cIiArIGFzeW5jTWV0aG9kICsgXCIoXCIgKyBhcnIgKyBcIiwgXCIgKyBhcnJheUxlbiArIFwiLCBmdW5jdGlvbihcIik7XG5cbiAgICAgIG5vZGUubmFtZS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIF90aGlzMTEuX2VtaXQobmFtZS52YWx1ZSArIFwiLFwiKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0KGkgKyAnLCcgKyBsZW4gKyAnLG5leHQpIHsnKTtcblxuICAgICAgbm9kZS5uYW1lLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgdmFyIGlkID0gbmFtZS52YWx1ZTtcbiAgICAgICAgZnJhbWUuc2V0KGlkLCBpZCk7XG5cbiAgICAgICAgX3RoaXMxMS5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgaWQgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpZCA9IG5vZGUubmFtZS52YWx1ZTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJydW50aW1lLlwiICsgYXN5bmNNZXRob2QgKyBcIihcIiArIGFyciArIFwiLCAxLCBmdW5jdGlvbihcIiArIGlkICsgXCIsIFwiICsgaSArIFwiLCBcIiArIGxlbiArIFwiLG5leHQpIHtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdmcmFtZS5zZXQoXCInICsgaWQgKyAnXCIsICcgKyBpZCArICcpOycpO1xuXG4gICAgICBmcmFtZS5zZXQoaWQsIGlkKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKTtcblxuICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJ1ZjtcblxuICAgICAgaWYgKHBhcmFsbGVsKSB7XG4gICAgICAgIGJ1ZiA9IF90aGlzMTEuX3B1c2hCdWZmZXIoKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxMS5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuXG4gICAgICBfdGhpczExLl9lbWl0TGluZSgnbmV4dCgnICsgaSArIChidWYgPyAnLCcgKyBidWYgOiAnJykgKyAnKTsnKTtcblxuICAgICAgaWYgKHBhcmFsbGVsKSB7XG4gICAgICAgIF90aGlzMTEuX3BvcEJ1ZmZlcigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIG91dHB1dCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSwgJyArIHRoaXMuX21ha2VDYWxsYmFjayhvdXRwdXQpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcblxuICAgIGlmIChwYXJhbGxlbCkge1xuICAgICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyAnICs9ICcgKyBvdXRwdXQgKyAnOycpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmVsc2VfKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSgnaWYgKCEnICsgYXJyICsgJy5sZW5ndGgpIHsnKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZWxzZV8sIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSBmcmFtZS5wb3AoKTsnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFzeW5jRWFjaCA9IGZ1bmN0aW9uIGNvbXBpbGVBc3luY0VhY2gobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9jb21waWxlQXN5bmNMb29wKG5vZGUsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFzeW5jQWxsID0gZnVuY3Rpb24gY29tcGlsZUFzeW5jQWxsKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFzeW5jTG9vcChub2RlLCBmcmFtZSwgdHJ1ZSk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlTWFjcm8gPSBmdW5jdGlvbiBfY29tcGlsZU1hY3JvKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTIgPSB0aGlzO1xuXG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIga3dhcmdzID0gbnVsbDtcblxuICAgIHZhciBmdW5jSWQgPSAnbWFjcm9fJyArIHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIga2VlcEZyYW1lID0gZnJhbWUgIT09IHVuZGVmaW5lZDsgLy8gVHlwZSBjaGVjayB0aGUgZGVmaW5pdGlvbiBvZiB0aGUgYXJnc1xuXG4gICAgbm9kZS5hcmdzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGFyZywgaSkge1xuICAgICAgaWYgKGkgPT09IG5vZGUuYXJncy5jaGlsZHJlbi5sZW5ndGggLSAxICYmIGFyZyBpbnN0YW5jZW9mIG5vZGVzLkRpY3QpIHtcbiAgICAgICAga3dhcmdzID0gYXJnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMxMi5hc3NlcnRUeXBlKGFyZywgbm9kZXMuU3ltYm9sKTtcblxuICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgcmVhbE5hbWVzID0gW10uY29uY2F0KGFyZ3MubWFwKGZ1bmN0aW9uIChuKSB7XG4gICAgICByZXR1cm4gXCJsX1wiICsgbi52YWx1ZTtcbiAgICB9KSwgWydrd2FyZ3MnXSk7IC8vIFF1b3RlZCBhcmd1bWVudCBuYW1lc1xuXG4gICAgdmFyIGFyZ05hbWVzID0gYXJncy5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiBcIlxcXCJcIiArIG4udmFsdWUgKyBcIlxcXCJcIjtcbiAgICB9KTtcbiAgICB2YXIga3dhcmdOYW1lcyA9IChrd2FyZ3MgJiYga3dhcmdzLmNoaWxkcmVuIHx8IFtdKS5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiBcIlxcXCJcIiArIG4ua2V5LnZhbHVlICsgXCJcXFwiXCI7XG4gICAgfSk7IC8vIFdlIHBhc3MgYSBmdW5jdGlvbiB0byBtYWtlTWFjcm8gd2hpY2ggZGVzdHJ1Y3R1cmVzIHRoZVxuICAgIC8vIGFyZ3VtZW50cyBzbyBzdXBwb3J0IHNldHRpbmcgcG9zaXRpb25hbCBhcmdzIHdpdGgga2V5d29yZHNcbiAgICAvLyBhcmdzIGFuZCBwYXNzaW5nIGtleXdvcmQgYXJncyBhcyBwb3NpdGlvbmFsIGFyZ3NcbiAgICAvLyAoZXNzZW50aWFsbHkgZGVmYXVsdCB2YWx1ZXMpLiBTZWUgcnVudGltZS5qcy5cblxuICAgIHZhciBjdXJyRnJhbWU7XG5cbiAgICBpZiAoa2VlcEZyYW1lKSB7XG4gICAgICBjdXJyRnJhbWUgPSBmcmFtZS5wdXNoKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyRnJhbWUgPSBuZXcgRnJhbWUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZXMoXCJ2YXIgXCIgKyBmdW5jSWQgKyBcIiA9IHJ1bnRpbWUubWFrZU1hY3JvKFwiLCBcIltcIiArIGFyZ05hbWVzLmpvaW4oJywgJykgKyBcIl0sIFwiLCBcIltcIiArIGt3YXJnTmFtZXMuam9pbignLCAnKSArIFwiXSwgXCIsIFwiZnVuY3Rpb24gKFwiICsgcmVhbE5hbWVzLmpvaW4oJywgJykgKyBcIikge1wiLCAndmFyIGNhbGxlckZyYW1lID0gZnJhbWU7JywgJ2ZyYW1lID0gJyArIChrZWVwRnJhbWUgPyAnZnJhbWUucHVzaCh0cnVlKTsnIDogJ25ldyBydW50aW1lLkZyYW1lKCk7JyksICdrd2FyZ3MgPSBrd2FyZ3MgfHwge307JywgJ2lmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoa3dhcmdzLCBcImNhbGxlclwiKSkgeycsICdmcmFtZS5zZXQoXCJjYWxsZXJcIiwga3dhcmdzLmNhbGxlcik7IH0nKTsgLy8gRXhwb3NlIHRoZSBhcmd1bWVudHMgdG8gdGhlIHRlbXBsYXRlLiBEb24ndCBuZWVkIHRvIHVzZVxuICAgIC8vIHJhbmRvbSBuYW1lcyBiZWNhdXNlIHRoZSBmdW5jdGlvblxuICAgIC8vIHdpbGwgY3JlYXRlIGEgbmV3IHJ1bi10aW1lIHNjb3BlIGZvciB1c1xuXG5cbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZykge1xuICAgICAgX3RoaXMxMi5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgYXJnLnZhbHVlICsgXCJcXFwiLCBsX1wiICsgYXJnLnZhbHVlICsgXCIpO1wiKTtcblxuICAgICAgY3VyckZyYW1lLnNldChhcmcudmFsdWUsIFwibF9cIiArIGFyZy52YWx1ZSk7XG4gICAgfSk7IC8vIEV4cG9zZSB0aGUga2V5d29yZCBhcmd1bWVudHNcblxuICAgIGlmIChrd2FyZ3MpIHtcbiAgICAgIGt3YXJncy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChwYWlyKSB7XG4gICAgICAgIHZhciBuYW1lID0gcGFpci5rZXkudmFsdWU7XG5cbiAgICAgICAgX3RoaXMxMi5fZW1pdChcImZyYW1lLnNldChcXFwiXCIgKyBuYW1lICsgXCJcXFwiLCBcIik7XG5cbiAgICAgICAgX3RoaXMxMi5fZW1pdChcIk9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChrd2FyZ3MsIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIpXCIpO1xuXG4gICAgICAgIF90aGlzMTIuX2VtaXQoXCIgPyBrd2FyZ3NbXFxcIlwiICsgbmFtZSArIFwiXFxcIl0gOiBcIik7XG5cbiAgICAgICAgX3RoaXMxMi5fY29tcGlsZUV4cHJlc3Npb24ocGFpci52YWx1ZSwgY3VyckZyYW1lKTtcblxuICAgICAgICBfdGhpczEyLl9lbWl0KCcpOycpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGJ1ZmZlcklkID0gdGhpcy5fcHVzaEJ1ZmZlcigpO1xuXG4gICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpczEyLmNvbXBpbGUobm9kZS5ib2R5LCBjdXJyRnJhbWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gJyArIChrZWVwRnJhbWUgPyAnZnJhbWUucG9wKCk7JyA6ICdjYWxsZXJGcmFtZTsnKSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZShcInJldHVybiBuZXcgcnVudGltZS5TYWZlU3RyaW5nKFwiICsgYnVmZmVySWQgKyBcIik7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pOycpO1xuXG4gICAgdGhpcy5fcG9wQnVmZmVyKCk7XG5cbiAgICByZXR1cm4gZnVuY0lkO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTWFjcm8gPSBmdW5jdGlvbiBjb21waWxlTWFjcm8obm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgZnVuY0lkID0gdGhpcy5fY29tcGlsZU1hY3JvKG5vZGUpOyAvLyBFeHBvc2UgdGhlIG1hY3JvIHRvIHRoZSB0ZW1wbGF0ZXNcblxuXG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWUudmFsdWU7XG4gICAgZnJhbWUuc2V0KG5hbWUsIGZ1bmNJZCk7XG5cbiAgICBpZiAoZnJhbWUucGFyZW50KSB7XG4gICAgICB0aGlzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBuYW1lICsgXCJcXFwiLCBcIiArIGZ1bmNJZCArIFwiKTtcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChub2RlLm5hbWUudmFsdWUuY2hhckF0KDApICE9PSAnXycpIHtcbiAgICAgICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LmFkZEV4cG9ydChcXFwiXCIgKyBuYW1lICsgXCJcXFwiKTtcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiY29udGV4dC5zZXRWYXJpYWJsZShcXFwiXCIgKyBuYW1lICsgXCJcXFwiLCBcIiArIGZ1bmNJZCArIFwiKTtcIik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ2FsbGVyID0gZnVuY3Rpb24gY29tcGlsZUNhbGxlcihub2RlLCBmcmFtZSkge1xuICAgIC8vIGJhc2ljYWxseSBhbiBhbm9ueW1vdXMgXCJtYWNybyBleHByZXNzaW9uXCJcbiAgICB0aGlzLl9lbWl0KCcoZnVuY3Rpb24gKCl7Jyk7XG5cbiAgICB2YXIgZnVuY0lkID0gdGhpcy5fY29tcGlsZU1hY3JvKG5vZGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoXCJyZXR1cm4gXCIgKyBmdW5jSWQgKyBcIjt9KSgpXCIpO1xuICB9O1xuXG4gIF9wcm90by5fY29tcGlsZUdldFRlbXBsYXRlID0gZnVuY3Rpb24gX2NvbXBpbGVHZXRUZW1wbGF0ZShub2RlLCBmcmFtZSwgZWFnZXJDb21waWxlLCBpZ25vcmVNaXNzaW5nKSB7XG4gICAgdmFyIHBhcmVudFRlbXBsYXRlSWQgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIHBhcmVudE5hbWUgPSB0aGlzLl90ZW1wbGF0ZU5hbWUoKTtcblxuICAgIHZhciBjYiA9IHRoaXMuX21ha2VDYWxsYmFjayhwYXJlbnRUZW1wbGF0ZUlkKTtcblxuICAgIHZhciBlYWdlckNvbXBpbGVBcmcgPSBlYWdlckNvbXBpbGUgPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIHZhciBpZ25vcmVNaXNzaW5nQXJnID0gaWdub3JlTWlzc2luZyA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICB0aGlzLl9lbWl0KCdlbnYuZ2V0VGVtcGxhdGUoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnRlbXBsYXRlLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZShcIiwgXCIgKyBlYWdlckNvbXBpbGVBcmcgKyBcIiwgXCIgKyBwYXJlbnROYW1lICsgXCIsIFwiICsgaWdub3JlTWlzc2luZ0FyZyArIFwiLCBcIiArIGNiKTtcblxuICAgIHJldHVybiBwYXJlbnRUZW1wbGF0ZUlkO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlSW1wb3J0ID0gZnVuY3Rpb24gY29tcGlsZUltcG9ydChub2RlLCBmcmFtZSkge1xuICAgIHZhciB0YXJnZXQgPSBub2RlLnRhcmdldC52YWx1ZTtcblxuICAgIHZhciBpZCA9IHRoaXMuX2NvbXBpbGVHZXRUZW1wbGF0ZShub2RlLCBmcmFtZSwgZmFsc2UsIGZhbHNlKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKGlkICsgJy5nZXRFeHBvcnRlZCgnICsgKG5vZGUud2l0aENvbnRleHQgPyAnY29udGV4dC5nZXRWYXJpYWJsZXMoKSwgZnJhbWUsICcgOiAnJykgKyB0aGlzLl9tYWtlQ2FsbGJhY2soaWQpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcblxuICAgIGZyYW1lLnNldCh0YXJnZXQsIGlkKTtcblxuICAgIGlmIChmcmFtZS5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIHRhcmdldCArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiY29udGV4dC5zZXRWYXJpYWJsZShcXFwiXCIgKyB0YXJnZXQgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZyb21JbXBvcnQgPSBmdW5jdGlvbiBjb21waWxlRnJvbUltcG9ydChub2RlLCBmcmFtZSkge1xuICAgIHZhciBfdGhpczEzID0gdGhpcztcblxuICAgIHZhciBpbXBvcnRlZElkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoaW1wb3J0ZWRJZCArICcuZ2V0RXhwb3J0ZWQoJyArIChub2RlLndpdGhDb250ZXh0ID8gJ2NvbnRleHQuZ2V0VmFyaWFibGVzKCksIGZyYW1lLCAnIDogJycpICsgdGhpcy5fbWFrZUNhbGxiYWNrKGltcG9ydGVkSWQpKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcblxuICAgIG5vZGUubmFtZXMuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAobmFtZU5vZGUpIHtcbiAgICAgIHZhciBuYW1lO1xuICAgICAgdmFyIGFsaWFzO1xuXG4gICAgICB2YXIgaWQgPSBfdGhpczEzLl90bXBpZCgpO1xuXG4gICAgICBpZiAobmFtZU5vZGUgaW5zdGFuY2VvZiBub2Rlcy5QYWlyKSB7XG4gICAgICAgIG5hbWUgPSBuYW1lTm9kZS5rZXkudmFsdWU7XG4gICAgICAgIGFsaWFzID0gbmFtZU5vZGUudmFsdWUudmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lID0gbmFtZU5vZGUudmFsdWU7XG4gICAgICAgIGFsaWFzID0gbmFtZTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMxMy5fZW1pdExpbmUoXCJpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXCIgKyBpbXBvcnRlZElkICsgXCIsIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIpKSB7XCIpO1xuXG4gICAgICBfdGhpczEzLl9lbWl0TGluZShcInZhciBcIiArIGlkICsgXCIgPSBcIiArIGltcG9ydGVkSWQgKyBcIi5cIiArIG5hbWUgKyBcIjtcIik7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKCd9IGVsc2UgeycpO1xuXG4gICAgICBfdGhpczEzLl9lbWl0TGluZShcImNiKG5ldyBFcnJvcihcXFwiY2Fubm90IGltcG9ydCAnXCIgKyBuYW1lICsgXCInXFxcIikpOyByZXR1cm47XCIpO1xuXG4gICAgICBfdGhpczEzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgICBmcmFtZS5zZXQoYWxpYXMsIGlkKTtcblxuICAgICAgaWYgKGZyYW1lLnBhcmVudCkge1xuICAgICAgICBfdGhpczEzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBhbGlhcyArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczEzLl9lbWl0TGluZShcImNvbnRleHQuc2V0VmFyaWFibGUoXFxcIlwiICsgYWxpYXMgKyBcIlxcXCIsIFwiICsgaWQgKyBcIik7XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQmxvY2sgPSBmdW5jdGlvbiBjb21waWxlQmxvY2sobm9kZSkge1xuICAgIHZhciBpZCA9IHRoaXMuX3RtcGlkKCk7IC8vIElmIHdlIGFyZSBleGVjdXRpbmcgb3V0c2lkZSBhIGJsb2NrIChjcmVhdGluZyBhIHRvcC1sZXZlbFxuICAgIC8vIGJsb2NrKSwgd2UgcmVhbGx5IGRvbid0IHdhbnQgdG8gZXhlY3V0ZSBpdHMgY29kZSBiZWNhdXNlIGl0XG4gICAgLy8gd2lsbCBleGVjdXRlIHR3aWNlOiBvbmNlIHdoZW4gdGhlIGNoaWxkIHRlbXBsYXRlIHJ1bnMgYW5kXG4gICAgLy8gYWdhaW4gd2hlbiB0aGUgcGFyZW50IHRlbXBsYXRlIHJ1bnMuIE5vdGUgdGhhdCBibG9ja3NcbiAgICAvLyB3aXRoaW4gYmxvY2tzIHdpbGwgKmFsd2F5cyogZXhlY3V0ZSBpbW1lZGlhdGVseSAqYW5kKlxuICAgIC8vIHdoZXJldmVyIGVsc2UgdGhleSBhcmUgaW52b2tlZCAobGlrZSB1c2VkIGluIGEgcGFyZW50XG4gICAgLy8gdGVtcGxhdGUpLiBUaGlzIG1heSBoYXZlIGJlaGF2aW9yYWwgZGlmZmVyZW5jZXMgZnJvbSBqaW5qYVxuICAgIC8vIGJlY2F1c2UgYmxvY2tzIGNhbiBoYXZlIHNpZGUgZWZmZWN0cywgYnV0IGl0IHNlZW1zIGxpa2UgYVxuICAgIC8vIHdhc3RlIG9mIHBlcmZvcm1hbmNlIHRvIGFsd2F5cyBleGVjdXRlIGh1Z2UgdG9wLWxldmVsXG4gICAgLy8gYmxvY2tzIHR3aWNlXG5cblxuICAgIGlmICghdGhpcy5pbkJsb2NrKSB7XG4gICAgICB0aGlzLl9lbWl0KCcocGFyZW50VGVtcGxhdGUgPyBmdW5jdGlvbihlLCBjLCBmLCByLCBjYikgeyBjYihcIlwiKTsgfSA6ICcpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoXCJjb250ZXh0LmdldEJsb2NrKFxcXCJcIiArIG5vZGUubmFtZS52YWx1ZSArIFwiXFxcIilcIik7XG5cbiAgICBpZiAoIXRoaXMuaW5CbG9jaykge1xuICAgICAgdGhpcy5fZW1pdCgnKScpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMaW5lKCcoZW52LCBjb250ZXh0LCBmcmFtZSwgcnVudGltZSwgJyArIHRoaXMuX21ha2VDYWxsYmFjayhpZCkpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyBcIiArPSBcIiArIGlkICsgXCI7XCIpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlU3VwZXIgPSBmdW5jdGlvbiBjb21waWxlU3VwZXIobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgbmFtZSA9IG5vZGUuYmxvY2tOYW1lLnZhbHVlO1xuICAgIHZhciBpZCA9IG5vZGUuc3ltYm9sLnZhbHVlO1xuXG4gICAgdmFyIGNiID0gdGhpcy5fbWFrZUNhbGxiYWNrKGlkKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiY29udGV4dC5nZXRTdXBlcihlbnYsIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIGJfXCIgKyBuYW1lICsgXCIsIGZyYW1lLCBydW50aW1lLCBcIiArIGNiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKGlkICsgXCIgPSBydW50aW1lLm1hcmtTYWZlKFwiICsgaWQgKyBcIik7XCIpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgZnJhbWUuc2V0KGlkLCBpZCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVFeHRlbmRzID0gZnVuY3Rpb24gY29tcGlsZUV4dGVuZHMobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgayA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgcGFyZW50VGVtcGxhdGVJZCA9IHRoaXMuX2NvbXBpbGVHZXRUZW1wbGF0ZShub2RlLCBmcmFtZSwgdHJ1ZSwgZmFsc2UpOyAvLyBleHRlbmRzIGlzIGEgZHluYW1pYyB0YWcgYW5kIGNhbiBvY2N1ciB3aXRoaW4gYSBibG9jayBsaWtlXG4gICAgLy8gYGlmYCwgc28gaWYgdGhpcyBoYXBwZW5zIHdlIG5lZWQgdG8gY2FwdHVyZSB0aGUgcGFyZW50XG4gICAgLy8gdGVtcGxhdGUgaW4gdGhlIHRvcC1sZXZlbCBzY29wZVxuXG5cbiAgICB0aGlzLl9lbWl0TGluZShcInBhcmVudFRlbXBsYXRlID0gXCIgKyBwYXJlbnRUZW1wbGF0ZUlkKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiZm9yKHZhciBcIiArIGsgKyBcIiBpbiBwYXJlbnRUZW1wbGF0ZS5ibG9ja3MpIHtcIik7XG5cbiAgICB0aGlzLl9lbWl0TGluZShcImNvbnRleHQuYWRkQmxvY2soXCIgKyBrICsgXCIsIHBhcmVudFRlbXBsYXRlLmJsb2Nrc1tcIiArIGsgKyBcIl0pO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVJbmNsdWRlID0gZnVuY3Rpb24gY29tcGlsZUluY2x1ZGUobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0TGluZSgndmFyIHRhc2tzID0gW107Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndGFza3MucHVzaCgnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmdW5jdGlvbihjYWxsYmFjaykgeycpO1xuXG4gICAgdmFyIGlkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBmYWxzZSwgbm9kZS5pZ25vcmVNaXNzaW5nKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiY2FsbGJhY2sobnVsbCxcIiArIGlkICsgXCIpO30pO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9KTsnKTtcblxuICAgIHZhciBpZDIgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3Rhc2tzLnB1c2goJyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnVuY3Rpb24odGVtcGxhdGUsIGNhbGxiYWNrKXsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0ZW1wbGF0ZS5yZW5kZXIoY29udGV4dC5nZXRWYXJpYWJsZXMoKSwgZnJhbWUsICcgKyB0aGlzLl9tYWtlQ2FsbGJhY2soaWQyKSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnY2FsbGJhY2sobnVsbCwnICsgaWQyICsgJyk7fSk7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSk7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndGFza3MucHVzaCgnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmdW5jdGlvbihyZXN1bHQsIGNhbGxiYWNrKXsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKHRoaXMuYnVmZmVyICsgXCIgKz0gcmVzdWx0O1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdjYWxsYmFjayhudWxsKTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9KTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdlbnYud2F0ZXJmYWxsKHRhc2tzLCBmdW5jdGlvbigpeycpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlVGVtcGxhdGVEYXRhID0gZnVuY3Rpb24gY29tcGlsZVRlbXBsYXRlRGF0YShub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuY29tcGlsZUxpdGVyYWwobm9kZSwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ2FwdHVyZSA9IGZ1bmN0aW9uIGNvbXBpbGVDYXB0dXJlKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTQgPSB0aGlzO1xuXG4gICAgLy8gd2UgbmVlZCB0byB0ZW1wb3JhcmlseSBvdmVycmlkZSB0aGUgY3VycmVudCBidWZmZXIgaWQgYXMgJ291dHB1dCdcbiAgICAvLyBzbyB0aGUgc2V0IGJsb2NrIHdyaXRlcyB0byB0aGUgY2FwdHVyZSBvdXRwdXQgaW5zdGVhZCBvZiB0aGUgYnVmZmVyXG4gICAgdmFyIGJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xuICAgIHRoaXMuYnVmZmVyID0gJ291dHB1dCc7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnKGZ1bmN0aW9uKCkgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3ZhciBvdXRwdXQgPSBcIlwiOycpO1xuXG4gICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpczE0LmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgncmV0dXJuIG91dHB1dDsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9KSgpJyk7IC8vIGFuZCBvZiBjb3Vyc2UsIHJldmVydCBiYWNrIHRvIHRoZSBvbGQgYnVmZmVyIGlkXG5cblxuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlT3V0cHV0ID0gZnVuY3Rpb24gY29tcGlsZU91dHB1dChub2RlLCBmcmFtZSkge1xuICAgIHZhciBfdGhpczE1ID0gdGhpcztcblxuICAgIHZhciBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIC8vIFRlbXBsYXRlRGF0YSBpcyBhIHNwZWNpYWwgY2FzZSBiZWNhdXNlIGl0IGlzIG5ldmVyXG4gICAgICAvLyBhdXRvZXNjYXBlZCwgc28gc2ltcGx5IG91dHB1dCBpdCBmb3Igb3B0aW1pemF0aW9uXG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5UZW1wbGF0ZURhdGEpIHtcbiAgICAgICAgaWYgKGNoaWxkLnZhbHVlKSB7XG4gICAgICAgICAgX3RoaXMxNS5fZW1pdChfdGhpczE1LmJ1ZmZlciArIFwiICs9IFwiKTtcblxuICAgICAgICAgIF90aGlzMTUuY29tcGlsZUxpdGVyYWwoY2hpbGQsIGZyYW1lKTtcblxuICAgICAgICAgIF90aGlzMTUuX2VtaXRMaW5lKCc7Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMTUuX2VtaXQoX3RoaXMxNS5idWZmZXIgKyBcIiArPSBydW50aW1lLnN1cHByZXNzVmFsdWUoXCIpO1xuXG4gICAgICAgIGlmIChfdGhpczE1LnRocm93T25VbmRlZmluZWQpIHtcbiAgICAgICAgICBfdGhpczE1Ll9lbWl0KCdydW50aW1lLmVuc3VyZURlZmluZWQoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczE1LmNvbXBpbGUoY2hpbGQsIGZyYW1lKTtcblxuICAgICAgICBpZiAoX3RoaXMxNS50aHJvd09uVW5kZWZpbmVkKSB7XG4gICAgICAgICAgX3RoaXMxNS5fZW1pdChcIixcIiArIG5vZGUubGluZW5vICsgXCIsXCIgKyBub2RlLmNvbG5vICsgXCIpXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMxNS5fZW1pdCgnLCBlbnYub3B0cy5hdXRvZXNjYXBlKTtcXG4nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZVJvb3QgPSBmdW5jdGlvbiBjb21waWxlUm9vdChub2RlLCBmcmFtZSkge1xuICAgIHZhciBfdGhpczE2ID0gdGhpcztcblxuICAgIGlmIChmcmFtZSkge1xuICAgICAgdGhpcy5mYWlsKCdjb21waWxlUm9vdDogcm9vdCBub2RlIGNhblxcJ3QgaGF2ZSBmcmFtZScpO1xuICAgIH1cblxuICAgIGZyYW1lID0gbmV3IEZyYW1lKCk7XG5cbiAgICB0aGlzLl9lbWl0RnVuY0JlZ2luKG5vZGUsICdyb290Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndmFyIHBhcmVudFRlbXBsYXRlID0gbnVsbDsnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVDaGlsZHJlbihub2RlLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnaWYocGFyZW50VGVtcGxhdGUpIHsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdwYXJlbnRUZW1wbGF0ZS5yb290UmVuZGVyRnVuYyhlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCBjYik7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSBlbHNlIHsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiY2IobnVsbCwgXCIgKyB0aGlzLmJ1ZmZlciArIFwiKTtcIik7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgdGhpcy5fZW1pdEZ1bmNFbmQodHJ1ZSk7XG5cbiAgICB0aGlzLmluQmxvY2sgPSB0cnVlO1xuICAgIHZhciBibG9ja05hbWVzID0gW107XG4gICAgdmFyIGJsb2NrcyA9IG5vZGUuZmluZEFsbChub2Rlcy5CbG9jayk7XG4gICAgYmxvY2tzLmZvckVhY2goZnVuY3Rpb24gKGJsb2NrLCBpKSB7XG4gICAgICB2YXIgbmFtZSA9IGJsb2NrLm5hbWUudmFsdWU7XG5cbiAgICAgIGlmIChibG9ja05hbWVzLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJsb2NrIFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgZGVmaW5lZCBtb3JlIHRoYW4gb25jZS5cIik7XG4gICAgICB9XG5cbiAgICAgIGJsb2NrTmFtZXMucHVzaChuYW1lKTtcblxuICAgICAgX3RoaXMxNi5fZW1pdEZ1bmNCZWdpbihibG9jaywgXCJiX1wiICsgbmFtZSk7XG5cbiAgICAgIHZhciB0bXBGcmFtZSA9IG5ldyBGcmFtZSgpO1xuXG4gICAgICBfdGhpczE2Ll9lbWl0TGluZSgndmFyIGZyYW1lID0gZnJhbWUucHVzaCh0cnVlKTsnKTtcblxuICAgICAgX3RoaXMxNi5jb21waWxlKGJsb2NrLmJvZHksIHRtcEZyYW1lKTtcblxuICAgICAgX3RoaXMxNi5fZW1pdEZ1bmNFbmQoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdyZXR1cm4geycpO1xuXG4gICAgYmxvY2tzLmZvckVhY2goZnVuY3Rpb24gKGJsb2NrLCBpKSB7XG4gICAgICB2YXIgYmxvY2tOYW1lID0gXCJiX1wiICsgYmxvY2submFtZS52YWx1ZTtcblxuICAgICAgX3RoaXMxNi5fZW1pdExpbmUoYmxvY2tOYW1lICsgXCI6IFwiICsgYmxvY2tOYW1lICsgXCIsXCIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3Jvb3Q6IHJvb3RcXG59OycpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlID0gZnVuY3Rpb24gY29tcGlsZShub2RlLCBmcmFtZSkge1xuICAgIHZhciBfY29tcGlsZSA9IHRoaXNbJ2NvbXBpbGUnICsgbm9kZS50eXBlbmFtZV07XG5cbiAgICBpZiAoX2NvbXBpbGUpIHtcbiAgICAgIF9jb21waWxlLmNhbGwodGhpcywgbm9kZSwgZnJhbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZhaWwoXCJjb21waWxlOiBDYW5ub3QgY29tcGlsZSBub2RlOiBcIiArIG5vZGUudHlwZW5hbWUsIG5vZGUubGluZW5vLCBub2RlLmNvbG5vKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmdldENvZGUgPSBmdW5jdGlvbiBnZXRDb2RlKCkge1xuICAgIHJldHVybiB0aGlzLmNvZGVidWYuam9pbignJyk7XG4gIH07XG5cbiAgcmV0dXJuIENvbXBpbGVyO1xufShPYmopO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29tcGlsZTogZnVuY3Rpb24gY29tcGlsZShzcmMsIGFzeW5jRmlsdGVycywgZXh0ZW5zaW9ucywgbmFtZSwgb3B0cykge1xuICAgIGlmIChvcHRzID09PSB2b2lkIDApIHtcbiAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgYyA9IG5ldyBDb21waWxlcihuYW1lLCBvcHRzLnRocm93T25VbmRlZmluZWQpOyAvLyBSdW4gdGhlIGV4dGVuc2lvbiBwcmVwcm9jZXNzb3JzIGFnYWluc3QgdGhlIHNvdXJjZS5cblxuICAgIHZhciBwcmVwcm9jZXNzb3JzID0gKGV4dGVuc2lvbnMgfHwgW10pLm1hcChmdW5jdGlvbiAoZXh0KSB7XG4gICAgICByZXR1cm4gZXh0LnByZXByb2Nlc3M7XG4gICAgfSkuZmlsdGVyKGZ1bmN0aW9uIChmKSB7XG4gICAgICByZXR1cm4gISFmO1xuICAgIH0pO1xuICAgIHZhciBwcm9jZXNzZWRTcmMgPSBwcmVwcm9jZXNzb3JzLnJlZHVjZShmdW5jdGlvbiAocywgcHJvY2Vzc29yKSB7XG4gICAgICByZXR1cm4gcHJvY2Vzc29yKHMpO1xuICAgIH0sIHNyYyk7XG4gICAgYy5jb21waWxlKHRyYW5zZm9ybWVyLnRyYW5zZm9ybShwYXJzZXIucGFyc2UocHJvY2Vzc2VkU3JjLCBleHRlbnNpb25zLCBvcHRzKSwgYXN5bmNGaWx0ZXJzLCBuYW1lKSk7XG4gICAgcmV0dXJuIGMuZ2V0Q29kZSgpO1xuICB9LFxuICBDb21waWxlcjogQ29tcGlsZXJcbn07XG5cbi8qKiovIH0pLFxuLyogNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIHBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIEVtaXR0ZXJPYmogPSBfcmVxdWlyZS5FbWl0dGVyT2JqO1xuXG5tb2R1bGUuZXhwb3J0cyA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0VtaXR0ZXJPYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoTG9hZGVyLCBfRW1pdHRlck9iaik7XG5cbiAgZnVuY3Rpb24gTG9hZGVyKCkge1xuICAgIHJldHVybiBfRW1pdHRlck9iai5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gTG9hZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoZnJvbSwgdG8pIHtcbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShmcm9tKSwgdG8pO1xuICB9O1xuXG4gIF9wcm90by5pc1JlbGF0aXZlID0gZnVuY3Rpb24gaXNSZWxhdGl2ZShmaWxlbmFtZSkge1xuICAgIHJldHVybiBmaWxlbmFtZS5pbmRleE9mKCcuLycpID09PSAwIHx8IGZpbGVuYW1lLmluZGV4T2YoJy4uLycpID09PSAwO1xuICB9O1xuXG4gIHJldHVybiBMb2FkZXI7XG59KEVtaXR0ZXJPYmopO1xuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBhc2FwID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMik7XG5cbnZhciBfd2F0ZXJmYWxsID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSk7XG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgY29tcGlsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgZmlsdGVycyA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKSxcbiAgICBGaWxlU3lzdGVtTG9hZGVyID0gX3JlcXVpcmUuRmlsZVN5c3RlbUxvYWRlcixcbiAgICBXZWJMb2FkZXIgPSBfcmVxdWlyZS5XZWJMb2FkZXIsXG4gICAgUHJlY29tcGlsZWRMb2FkZXIgPSBfcmVxdWlyZS5QcmVjb21waWxlZExvYWRlcjtcblxudmFyIHRlc3RzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5cbnZhciBnbG9iYWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMSk7XG5cbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIE9iaiA9IF9yZXF1aXJlMi5PYmosXG4gICAgRW1pdHRlck9iaiA9IF9yZXF1aXJlMi5FbWl0dGVyT2JqO1xuXG52YXIgZ2xvYmFsUnVudGltZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBoYW5kbGVFcnJvciA9IGdsb2JhbFJ1bnRpbWUuaGFuZGxlRXJyb3IsXG4gICAgRnJhbWUgPSBnbG9iYWxSdW50aW1lLkZyYW1lO1xuXG52YXIgZXhwcmVzc0FwcCA9IF9fd2VicGFja19yZXF1aXJlX18oMjIpOyAvLyBJZiB0aGUgdXNlciBpcyB1c2luZyB0aGUgYXN5bmMgQVBJLCAqYWx3YXlzKiBjYWxsIGl0XG4vLyBhc3luY2hyb25vdXNseSBldmVuIGlmIHRoZSB0ZW1wbGF0ZSB3YXMgc3luY2hyb25vdXMuXG5cblxuZnVuY3Rpb24gY2FsbGJhY2tBc2FwKGNiLCBlcnIsIHJlcykge1xuICBhc2FwKGZ1bmN0aW9uICgpIHtcbiAgICBjYihlcnIsIHJlcyk7XG4gIH0pO1xufVxuLyoqXG4gKiBBIG5vLW9wIHRlbXBsYXRlLCBmb3IgdXNlIHdpdGggeyUgaW5jbHVkZSBpZ25vcmUgbWlzc2luZyAlfVxuICovXG5cblxudmFyIG5vb3BUbXBsU3JjID0ge1xuICB0eXBlOiAnY29kZScsXG4gIG9iajoge1xuICAgIHJvb3Q6IGZ1bmN0aW9uIHJvb3QoZW52LCBjb250ZXh0LCBmcmFtZSwgcnVudGltZSwgY2IpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNiKG51bGwsICcnKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2IoaGFuZGxlRXJyb3IoZSwgbnVsbCwgbnVsbCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxudmFyIEVudmlyb25tZW50ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRW1pdHRlck9iaikge1xuICBfaW5oZXJpdHNMb29zZShFbnZpcm9ubWVudCwgX0VtaXR0ZXJPYmopO1xuXG4gIGZ1bmN0aW9uIEVudmlyb25tZW50KCkge1xuICAgIHJldHVybiBfRW1pdHRlck9iai5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gRW52aXJvbm1lbnQucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdChsb2FkZXJzLCBvcHRzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIC8vIFRoZSBkZXYgZmxhZyBkZXRlcm1pbmVzIHRoZSB0cmFjZSB0aGF0J2xsIGJlIHNob3duIG9uIGVycm9ycy5cbiAgICAvLyBJZiBzZXQgdG8gdHJ1ZSwgcmV0dXJucyB0aGUgZnVsbCB0cmFjZSBmcm9tIHRoZSBlcnJvciBwb2ludCxcbiAgICAvLyBvdGhlcndpc2Ugd2lsbCByZXR1cm4gdHJhY2Ugc3RhcnRpbmcgZnJvbSBUZW1wbGF0ZS5yZW5kZXJcbiAgICAvLyAodGhlIGZ1bGwgdHJhY2UgZnJvbSB3aXRoaW4gbnVuanVja3MgbWF5IGNvbmZ1c2UgZGV2ZWxvcGVycyB1c2luZ1xuICAgIC8vICB0aGUgbGlicmFyeSlcbiAgICAvLyBkZWZhdWx0cyB0byBmYWxzZVxuICAgIG9wdHMgPSB0aGlzLm9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHRoaXMub3B0cy5kZXYgPSAhIW9wdHMuZGV2OyAvLyBUaGUgYXV0b2VzY2FwZSBmbGFnIHNldHMgZ2xvYmFsIGF1dG9lc2NhcGluZy4gSWYgdHJ1ZSxcbiAgICAvLyBldmVyeSBzdHJpbmcgdmFyaWFibGUgd2lsbCBiZSBlc2NhcGVkIGJ5IGRlZmF1bHQuXG4gICAgLy8gSWYgZmFsc2UsIHN0cmluZ3MgY2FuIGJlIG1hbnVhbGx5IGVzY2FwZWQgdXNpbmcgdGhlIGBlc2NhcGVgIGZpbHRlci5cbiAgICAvLyBkZWZhdWx0cyB0byB0cnVlXG5cbiAgICB0aGlzLm9wdHMuYXV0b2VzY2FwZSA9IG9wdHMuYXV0b2VzY2FwZSAhPSBudWxsID8gb3B0cy5hdXRvZXNjYXBlIDogdHJ1ZTsgLy8gSWYgdHJ1ZSwgdGhpcyB3aWxsIG1ha2UgdGhlIHN5c3RlbSB0aHJvdyBlcnJvcnMgaWYgdHJ5aW5nXG4gICAgLy8gdG8gb3V0cHV0IGEgbnVsbCBvciB1bmRlZmluZWQgdmFsdWVcblxuICAgIHRoaXMub3B0cy50aHJvd09uVW5kZWZpbmVkID0gISFvcHRzLnRocm93T25VbmRlZmluZWQ7XG4gICAgdGhpcy5vcHRzLnRyaW1CbG9ja3MgPSAhIW9wdHMudHJpbUJsb2NrcztcbiAgICB0aGlzLm9wdHMubHN0cmlwQmxvY2tzID0gISFvcHRzLmxzdHJpcEJsb2NrcztcbiAgICB0aGlzLmxvYWRlcnMgPSBbXTtcblxuICAgIGlmICghbG9hZGVycykge1xuICAgICAgLy8gVGhlIGZpbGVzeXN0ZW0gbG9hZGVyIGlzIG9ubHkgYXZhaWxhYmxlIHNlcnZlci1zaWRlXG4gICAgICBpZiAoRmlsZVN5c3RlbUxvYWRlcikge1xuICAgICAgICB0aGlzLmxvYWRlcnMgPSBbbmV3IEZpbGVTeXN0ZW1Mb2FkZXIoJ3ZpZXdzJyldO1xuICAgICAgfSBlbHNlIGlmIChXZWJMb2FkZXIpIHtcbiAgICAgICAgdGhpcy5sb2FkZXJzID0gW25ldyBXZWJMb2FkZXIoJy92aWV3cycpXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkZXJzID0gbGliLmlzQXJyYXkobG9hZGVycykgPyBsb2FkZXJzIDogW2xvYWRlcnNdO1xuICAgIH0gLy8gSXQncyBlYXN5IHRvIHVzZSBwcmVjb21waWxlZCB0ZW1wbGF0ZXM6IGp1c3QgaW5jbHVkZSB0aGVtXG4gICAgLy8gYmVmb3JlIHlvdSBjb25maWd1cmUgbnVuanVja3MgYW5kIHRoaXMgd2lsbCBhdXRvbWF0aWNhbGx5XG4gICAgLy8gcGljayBpdCB1cCBhbmQgdXNlIGl0XG5cblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubnVuanVja3NQcmVjb21waWxlZCkge1xuICAgICAgdGhpcy5sb2FkZXJzLnVuc2hpZnQobmV3IFByZWNvbXBpbGVkTG9hZGVyKHdpbmRvdy5udW5qdWNrc1ByZWNvbXBpbGVkKSk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdExvYWRlcnMoKTtcblxuICAgIHRoaXMuZ2xvYmFscyA9IGdsb2JhbHMoKTtcbiAgICB0aGlzLmZpbHRlcnMgPSB7fTtcbiAgICB0aGlzLnRlc3RzID0ge307XG4gICAgdGhpcy5hc3luY0ZpbHRlcnMgPSBbXTtcbiAgICB0aGlzLmV4dGVuc2lvbnMgPSB7fTtcbiAgICB0aGlzLmV4dGVuc2lvbnNMaXN0ID0gW107XG5cbiAgICBsaWIuX2VudHJpZXMoZmlsdGVycykuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIG5hbWUgPSBfcmVmWzBdLFxuICAgICAgICAgIGZpbHRlciA9IF9yZWZbMV07XG4gICAgICByZXR1cm4gX3RoaXMuYWRkRmlsdGVyKG5hbWUsIGZpbHRlcik7XG4gICAgfSk7XG5cbiAgICBsaWIuX2VudHJpZXModGVzdHMpLmZvckVhY2goZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICB2YXIgbmFtZSA9IF9yZWYyWzBdLFxuICAgICAgICAgIHRlc3QgPSBfcmVmMlsxXTtcbiAgICAgIHJldHVybiBfdGhpcy5hZGRUZXN0KG5hbWUsIHRlc3QpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5faW5pdExvYWRlcnMgPSBmdW5jdGlvbiBfaW5pdExvYWRlcnMoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB0aGlzLmxvYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAobG9hZGVyKSB7XG4gICAgICAvLyBDYWNoaW5nIGFuZCBjYWNoZSBidXN0aW5nXG4gICAgICBsb2FkZXIuY2FjaGUgPSB7fTtcblxuICAgICAgaWYgKHR5cGVvZiBsb2FkZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbG9hZGVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAobmFtZSwgZnVsbG5hbWUpIHtcbiAgICAgICAgICBsb2FkZXIuY2FjaGVbbmFtZV0gPSBudWxsO1xuXG4gICAgICAgICAgX3RoaXMyLmVtaXQoJ3VwZGF0ZScsIG5hbWUsIGZ1bGxuYW1lLCBsb2FkZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgbG9hZGVyLm9uKCdsb2FkJywgZnVuY3Rpb24gKG5hbWUsIHNvdXJjZSkge1xuICAgICAgICAgIF90aGlzMi5lbWl0KCdsb2FkJywgbmFtZSwgc291cmNlLCBsb2FkZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uaW52YWxpZGF0ZUNhY2hlID0gZnVuY3Rpb24gaW52YWxpZGF0ZUNhY2hlKCkge1xuICAgIHRoaXMubG9hZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChsb2FkZXIpIHtcbiAgICAgIGxvYWRlci5jYWNoZSA9IHt9O1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5hZGRFeHRlbnNpb24gPSBmdW5jdGlvbiBhZGRFeHRlbnNpb24obmFtZSwgZXh0ZW5zaW9uKSB7XG4gICAgZXh0ZW5zaW9uLl9fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5leHRlbnNpb25zW25hbWVdID0gZXh0ZW5zaW9uO1xuICAgIHRoaXMuZXh0ZW5zaW9uc0xpc3QucHVzaChleHRlbnNpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5yZW1vdmVFeHRlbnNpb24gPSBmdW5jdGlvbiByZW1vdmVFeHRlbnNpb24obmFtZSkge1xuICAgIHZhciBleHRlbnNpb24gPSB0aGlzLmdldEV4dGVuc2lvbihuYW1lKTtcblxuICAgIGlmICghZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5leHRlbnNpb25zTGlzdCA9IGxpYi53aXRob3V0KHRoaXMuZXh0ZW5zaW9uc0xpc3QsIGV4dGVuc2lvbik7XG4gICAgZGVsZXRlIHRoaXMuZXh0ZW5zaW9uc1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0RXh0ZW5zaW9uID0gZnVuY3Rpb24gZ2V0RXh0ZW5zaW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5leHRlbnNpb25zW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5oYXNFeHRlbnNpb24gPSBmdW5jdGlvbiBoYXNFeHRlbnNpb24obmFtZSkge1xuICAgIHJldHVybiAhIXRoaXMuZXh0ZW5zaW9uc1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8uYWRkR2xvYmFsID0gZnVuY3Rpb24gYWRkR2xvYmFsKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5nbG9iYWxzW25hbWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdldEdsb2JhbCA9IGZ1bmN0aW9uIGdldEdsb2JhbChuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLmdsb2JhbHNbbmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dsb2JhbCBub3QgZm91bmQ6ICcgKyBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nbG9iYWxzW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5hZGRGaWx0ZXIgPSBmdW5jdGlvbiBhZGRGaWx0ZXIobmFtZSwgZnVuYywgYXN5bmMpIHtcbiAgICB2YXIgd3JhcHBlZCA9IGZ1bmM7XG5cbiAgICBpZiAoYXN5bmMpIHtcbiAgICAgIHRoaXMuYXN5bmNGaWx0ZXJzLnB1c2gobmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5maWx0ZXJzW25hbWVdID0gd3JhcHBlZDtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2V0RmlsdGVyID0gZnVuY3Rpb24gZ2V0RmlsdGVyKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuZmlsdGVyc1tuYW1lXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXIgbm90IGZvdW5kOiAnICsgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyc1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8uYWRkVGVzdCA9IGZ1bmN0aW9uIGFkZFRlc3QobmFtZSwgZnVuYykge1xuICAgIHRoaXMudGVzdHNbbmFtZV0gPSBmdW5jO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5nZXRUZXN0ID0gZnVuY3Rpb24gZ2V0VGVzdChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rlc3Qgbm90IGZvdW5kOiAnICsgbmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMudGVzdHNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLnJlc29sdmVUZW1wbGF0ZSA9IGZ1bmN0aW9uIHJlc29sdmVUZW1wbGF0ZShsb2FkZXIsIHBhcmVudE5hbWUsIGZpbGVuYW1lKSB7XG4gICAgdmFyIGlzUmVsYXRpdmUgPSBsb2FkZXIuaXNSZWxhdGl2ZSAmJiBwYXJlbnROYW1lID8gbG9hZGVyLmlzUmVsYXRpdmUoZmlsZW5hbWUpIDogZmFsc2U7XG4gICAgcmV0dXJuIGlzUmVsYXRpdmUgJiYgbG9hZGVyLnJlc29sdmUgPyBsb2FkZXIucmVzb2x2ZShwYXJlbnROYW1lLCBmaWxlbmFtZSkgOiBmaWxlbmFtZTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0VGVtcGxhdGUgPSBmdW5jdGlvbiBnZXRUZW1wbGF0ZShuYW1lLCBlYWdlckNvbXBpbGUsIHBhcmVudE5hbWUsIGlnbm9yZU1pc3NpbmcsIGNiKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHRtcGwgPSBudWxsO1xuXG4gICAgaWYgKG5hbWUgJiYgbmFtZS5yYXcpIHtcbiAgICAgIC8vIHRoaXMgZml4ZXMgYXV0b2VzY2FwZSBmb3IgdGVtcGxhdGVzIHJlZmVyZW5jZWQgaW4gc3ltYm9sc1xuICAgICAgbmFtZSA9IG5hbWUucmF3O1xuICAgIH1cblxuICAgIGlmIChsaWIuaXNGdW5jdGlvbihwYXJlbnROYW1lKSkge1xuICAgICAgY2IgPSBwYXJlbnROYW1lO1xuICAgICAgcGFyZW50TmFtZSA9IG51bGw7XG4gICAgICBlYWdlckNvbXBpbGUgPSBlYWdlckNvbXBpbGUgfHwgZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGxpYi5pc0Z1bmN0aW9uKGVhZ2VyQ29tcGlsZSkpIHtcbiAgICAgIGNiID0gZWFnZXJDb21waWxlO1xuICAgICAgZWFnZXJDb21waWxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBUZW1wbGF0ZSkge1xuICAgICAgdG1wbCA9IG5hbWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndGVtcGxhdGUgbmFtZXMgbXVzdCBiZSBhIHN0cmluZzogJyArIG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubG9hZGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbG9hZGVyID0gdGhpcy5sb2FkZXJzW2ldO1xuICAgICAgICB0bXBsID0gbG9hZGVyLmNhY2hlW3RoaXMucmVzb2x2ZVRlbXBsYXRlKGxvYWRlciwgcGFyZW50TmFtZSwgbmFtZSldO1xuXG4gICAgICAgIGlmICh0bXBsKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG1wbCkge1xuICAgICAgaWYgKGVhZ2VyQ29tcGlsZSkge1xuICAgICAgICB0bXBsLmNvbXBpbGUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIGNiKG51bGwsIHRtcGwpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRtcGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN5bmNSZXN1bHQ7XG5cbiAgICB2YXIgY3JlYXRlVGVtcGxhdGUgPSBmdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZShlcnIsIGluZm8pIHtcbiAgICAgIGlmICghaW5mbyAmJiAhZXJyICYmICFpZ25vcmVNaXNzaW5nKSB7XG4gICAgICAgIGVyciA9IG5ldyBFcnJvcigndGVtcGxhdGUgbm90IGZvdW5kOiAnICsgbmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBuZXdUbXBsO1xuXG4gICAgICBpZiAoIWluZm8pIHtcbiAgICAgICAgbmV3VG1wbCA9IG5ldyBUZW1wbGF0ZShub29wVG1wbFNyYywgX3RoaXMzLCAnJywgZWFnZXJDb21waWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld1RtcGwgPSBuZXcgVGVtcGxhdGUoaW5mby5zcmMsIF90aGlzMywgaW5mby5wYXRoLCBlYWdlckNvbXBpbGUpO1xuXG4gICAgICAgIGlmICghaW5mby5ub0NhY2hlKSB7XG4gICAgICAgICAgaW5mby5sb2FkZXIuY2FjaGVbbmFtZV0gPSBuZXdUbXBsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICBjYihudWxsLCBuZXdUbXBsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN5bmNSZXN1bHQgPSBuZXdUbXBsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBsaWIuYXN5bmNJdGVyKHRoaXMubG9hZGVycywgZnVuY3Rpb24gKGxvYWRlciwgaSwgbmV4dCwgZG9uZSkge1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGVyciwgc3JjKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBkb25lKGVycik7XG4gICAgICAgIH0gZWxzZSBpZiAoc3JjKSB7XG4gICAgICAgICAgc3JjLmxvYWRlciA9IGxvYWRlcjtcbiAgICAgICAgICBkb25lKG51bGwsIHNyYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IC8vIFJlc29sdmUgbmFtZSByZWxhdGl2ZSB0byBwYXJlbnROYW1lXG5cblxuICAgICAgbmFtZSA9IHRoYXQucmVzb2x2ZVRlbXBsYXRlKGxvYWRlciwgcGFyZW50TmFtZSwgbmFtZSk7XG5cbiAgICAgIGlmIChsb2FkZXIuYXN5bmMpIHtcbiAgICAgICAgbG9hZGVyLmdldFNvdXJjZShuYW1lLCBoYW5kbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGFuZGxlKG51bGwsIGxvYWRlci5nZXRTb3VyY2UobmFtZSkpO1xuICAgICAgfVxuICAgIH0sIGNyZWF0ZVRlbXBsYXRlKTtcbiAgICByZXR1cm4gc3luY1Jlc3VsdDtcbiAgfTtcblxuICBfcHJvdG8uZXhwcmVzcyA9IGZ1bmN0aW9uIGV4cHJlc3MoYXBwKSB7XG4gICAgcmV0dXJuIGV4cHJlc3NBcHAodGhpcywgYXBwKTtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKG5hbWUsIGN0eCwgY2IpIHtcbiAgICBpZiAobGliLmlzRnVuY3Rpb24oY3R4KSkge1xuICAgICAgY2IgPSBjdHg7XG4gICAgICBjdHggPSBudWxsO1xuICAgIH0gLy8gV2Ugc3VwcG9ydCBhIHN5bmNocm9ub3VzIEFQSSB0byBtYWtlIGl0IGVhc2llciB0byBtaWdyYXRlXG4gICAgLy8gZXhpc3RpbmcgY29kZSB0byBhc3luYy4gVGhpcyB3b3JrcyBiZWNhdXNlIGlmIHlvdSBkb24ndCBkb1xuICAgIC8vIGFueXRoaW5nIGFzeW5jIHdvcmssIHRoZSB3aG9sZSB0aGluZyBpcyBhY3R1YWxseSBydW5cbiAgICAvLyBzeW5jaHJvbm91c2x5LlxuXG5cbiAgICB2YXIgc3luY1Jlc3VsdCA9IG51bGw7XG4gICAgdGhpcy5nZXRUZW1wbGF0ZShuYW1lLCBmdW5jdGlvbiAoZXJyLCB0bXBsKSB7XG4gICAgICBpZiAoZXJyICYmIGNiKSB7XG4gICAgICAgIGNhbGxiYWNrQXNhcChjYiwgZXJyKTtcbiAgICAgIH0gZWxzZSBpZiAoZXJyKSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN5bmNSZXN1bHQgPSB0bXBsLnJlbmRlcihjdHgsIGNiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3luY1Jlc3VsdDtcbiAgfTtcblxuICBfcHJvdG8ucmVuZGVyU3RyaW5nID0gZnVuY3Rpb24gcmVuZGVyU3RyaW5nKHNyYywgY3R4LCBvcHRzLCBjYikge1xuICAgIGlmIChsaWIuaXNGdW5jdGlvbihvcHRzKSkge1xuICAgICAgY2IgPSBvcHRzO1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cblxuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciB0bXBsID0gbmV3IFRlbXBsYXRlKHNyYywgdGhpcywgb3B0cy5wYXRoKTtcbiAgICByZXR1cm4gdG1wbC5yZW5kZXIoY3R4LCBjYik7XG4gIH07XG5cbiAgX3Byb3RvLndhdGVyZmFsbCA9IGZ1bmN0aW9uIHdhdGVyZmFsbCh0YXNrcywgY2FsbGJhY2ssIGZvcmNlQXN5bmMpIHtcbiAgICByZXR1cm4gX3dhdGVyZmFsbCh0YXNrcywgY2FsbGJhY2ssIGZvcmNlQXN5bmMpO1xuICB9O1xuXG4gIHJldHVybiBFbnZpcm9ubWVudDtcbn0oRW1pdHRlck9iaik7XG5cbnZhciBDb250ZXh0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqKSB7XG4gIF9pbmhlcml0c0xvb3NlKENvbnRleHQsIF9PYmopO1xuXG4gIGZ1bmN0aW9uIENvbnRleHQoKSB7XG4gICAgcmV0dXJuIF9PYmouYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90bzIgPSBDb250ZXh0LnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmluaXQgPSBmdW5jdGlvbiBpbml0KGN0eCwgYmxvY2tzLCBlbnYpIHtcbiAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgIC8vIEhhcyB0byBiZSB0aWVkIHRvIGFuIGVudmlyb25tZW50IHNvIHdlIGNhbiB0YXAgaW50byBpdHMgZ2xvYmFscy5cbiAgICB0aGlzLmVudiA9IGVudiB8fCBuZXcgRW52aXJvbm1lbnQoKTsgLy8gTWFrZSBhIGR1cGxpY2F0ZSBvZiBjdHhcblxuICAgIHRoaXMuY3R4ID0gbGliLmV4dGVuZCh7fSwgY3R4KTtcbiAgICB0aGlzLmJsb2NrcyA9IHt9O1xuICAgIHRoaXMuZXhwb3J0ZWQgPSBbXTtcbiAgICBsaWIua2V5cyhibG9ja3MpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIF90aGlzNC5hZGRCbG9jayhuYW1lLCBibG9ja3NbbmFtZV0pO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90bzIubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICAvLyBUaGlzIGlzIG9uZSBvZiB0aGUgbW9zdCBjYWxsZWQgZnVuY3Rpb25zLCBzbyBvcHRpbWl6ZSBmb3JcbiAgICAvLyB0aGUgdHlwaWNhbCBjYXNlIHdoZXJlIHRoZSBuYW1lIGlzbid0IGluIHRoZSBnbG9iYWxzXG4gICAgaWYgKG5hbWUgaW4gdGhpcy5lbnYuZ2xvYmFscyAmJiAhKG5hbWUgaW4gdGhpcy5jdHgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbnYuZ2xvYmFsc1tuYW1lXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuY3R4W25hbWVdO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8yLnNldFZhcmlhYmxlID0gZnVuY3Rpb24gc2V0VmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgdGhpcy5jdHhbbmFtZV0gPSB2YWw7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRWYXJpYWJsZXMgPSBmdW5jdGlvbiBnZXRWYXJpYWJsZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3R4O1xuICB9O1xuXG4gIF9wcm90bzIuYWRkQmxvY2sgPSBmdW5jdGlvbiBhZGRCbG9jayhuYW1lLCBibG9jaykge1xuICAgIHRoaXMuYmxvY2tzW25hbWVdID0gdGhpcy5ibG9ja3NbbmFtZV0gfHwgW107XG4gICAgdGhpcy5ibG9ja3NbbmFtZV0ucHVzaChibG9jayk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRCbG9jayA9IGZ1bmN0aW9uIGdldEJsb2NrKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuYmxvY2tzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vua25vd24gYmxvY2sgXCInICsgbmFtZSArICdcIicpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmJsb2Nrc1tuYW1lXVswXTtcbiAgfTtcblxuICBfcHJvdG8yLmdldFN1cGVyID0gZnVuY3Rpb24gZ2V0U3VwZXIoZW52LCBuYW1lLCBibG9jaywgZnJhbWUsIHJ1bnRpbWUsIGNiKSB7XG4gICAgdmFyIGlkeCA9IGxpYi5pbmRleE9mKHRoaXMuYmxvY2tzW25hbWVdIHx8IFtdLCBibG9jayk7XG4gICAgdmFyIGJsayA9IHRoaXMuYmxvY2tzW25hbWVdW2lkeCArIDFdO1xuICAgIHZhciBjb250ZXh0ID0gdGhpcztcblxuICAgIGlmIChpZHggPT09IC0xIHx8ICFibGspIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gc3VwZXIgYmxvY2sgYXZhaWxhYmxlIGZvciBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgfVxuXG4gICAgYmxrKGVudiwgY29udGV4dCwgZnJhbWUsIHJ1bnRpbWUsIGNiKTtcbiAgfTtcblxuICBfcHJvdG8yLmFkZEV4cG9ydCA9IGZ1bmN0aW9uIGFkZEV4cG9ydChuYW1lKSB7XG4gICAgdGhpcy5leHBvcnRlZC5wdXNoKG5hbWUpO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0RXhwb3J0ZWQgPSBmdW5jdGlvbiBnZXRFeHBvcnRlZCgpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHZhciBleHBvcnRlZCA9IHt9O1xuICAgIHRoaXMuZXhwb3J0ZWQuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgZXhwb3J0ZWRbbmFtZV0gPSBfdGhpczUuY3R4W25hbWVdO1xuICAgIH0pO1xuICAgIHJldHVybiBleHBvcnRlZDtcbiAgfTtcblxuICByZXR1cm4gQ29udGV4dDtcbn0oT2JqKTtcblxudmFyIFRlbXBsYXRlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqMikge1xuICBfaW5oZXJpdHNMb29zZShUZW1wbGF0ZSwgX09iajIpO1xuXG4gIGZ1bmN0aW9uIFRlbXBsYXRlKCkge1xuICAgIHJldHVybiBfT2JqMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMyA9IFRlbXBsYXRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8zLmluaXQgPSBmdW5jdGlvbiBpbml0KHNyYywgZW52LCBwYXRoLCBlYWdlckNvbXBpbGUpIHtcbiAgICB0aGlzLmVudiA9IGVudiB8fCBuZXcgRW52aXJvbm1lbnQoKTtcblxuICAgIGlmIChsaWIuaXNPYmplY3Qoc3JjKSkge1xuICAgICAgc3dpdGNoIChzcmMudHlwZSkge1xuICAgICAgICBjYXNlICdjb2RlJzpcbiAgICAgICAgICB0aGlzLnRtcGxQcm9wcyA9IHNyYy5vYmo7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICB0aGlzLnRtcGxTdHIgPSBzcmMub2JqO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5leHBlY3RlZCB0ZW1wbGF0ZSBvYmplY3QgdHlwZSBcIiArIHNyYy50eXBlICsgXCI7IGV4cGVjdGVkICdjb2RlJywgb3IgJ3N0cmluZydcIik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaWIuaXNTdHJpbmcoc3JjKSkge1xuICAgICAgdGhpcy50bXBsU3RyID0gc3JjO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NyYyBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIG9iamVjdCBkZXNjcmliaW5nIHRoZSBzb3VyY2UnKTtcbiAgICB9XG5cbiAgICB0aGlzLnBhdGggPSBwYXRoO1xuXG4gICAgaWYgKGVhZ2VyQ29tcGlsZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5fY29tcGlsZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRocm93IGxpYi5fcHJldHRpZnlFcnJvcih0aGlzLnBhdGgsIHRoaXMuZW52Lm9wdHMuZGV2LCBlcnIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBpbGVkID0gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyID0gZnVuY3Rpb24gcmVuZGVyKGN0eCwgcGFyZW50RnJhbWUsIGNiKSB7XG4gICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIGN0eCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBjdHg7XG4gICAgICBjdHggPSB7fTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnRGcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBwYXJlbnRGcmFtZTtcbiAgICAgIHBhcmVudEZyYW1lID0gbnVsbDtcbiAgICB9IC8vIElmIHRoZXJlIGlzIGEgcGFyZW50IGZyYW1lLCB3ZSBhcmUgYmVpbmcgY2FsbGVkIGZyb20gaW50ZXJuYWxcbiAgICAvLyBjb2RlIG9mIGFub3RoZXIgdGVtcGxhdGUsIGFuZCB0aGUgaW50ZXJuYWwgc3lzdGVtXG4gICAgLy8gZGVwZW5kcyBvbiB0aGUgc3luYy9hc3luYyBuYXR1cmUgb2YgdGhlIHBhcmVudCB0ZW1wbGF0ZVxuICAgIC8vIHRvIGJlIGluaGVyaXRlZCwgc28gZm9yY2UgYW4gYXN5bmMgY2FsbGJhY2tcblxuXG4gICAgdmFyIGZvcmNlQXN5bmMgPSAhcGFyZW50RnJhbWU7IC8vIENhdGNoIGNvbXBpbGUgZXJyb3JzIGZvciBhc3luYyByZW5kZXJpbmdcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmNvbXBpbGUoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB2YXIgZXJyID0gbGliLl9wcmV0dGlmeUVycm9yKHRoaXMucGF0aCwgdGhpcy5lbnYub3B0cy5kZXYsIGUpO1xuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrQXNhcChjYiwgZXJyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KGN0eCB8fCB7fSwgdGhpcy5ibG9ja3MsIHRoaXMuZW52KTtcbiAgICB2YXIgZnJhbWUgPSBwYXJlbnRGcmFtZSA/IHBhcmVudEZyYW1lLnB1c2godHJ1ZSkgOiBuZXcgRnJhbWUoKTtcbiAgICBmcmFtZS50b3BMZXZlbCA9IHRydWU7XG4gICAgdmFyIHN5bmNSZXN1bHQgPSBudWxsO1xuICAgIHZhciBkaWRFcnJvciA9IGZhbHNlO1xuICAgIHRoaXMucm9vdFJlbmRlckZ1bmModGhpcy5lbnYsIGNvbnRleHQsIGZyYW1lLCBnbG9iYWxSdW50aW1lLCBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgICAvLyBwcmV2ZW50IG11bHRpcGxlIGNhbGxzIHRvIGNiXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGVycikge1xuICAgICAgICBlcnIgPSBsaWIuX3ByZXR0aWZ5RXJyb3IoX3RoaXM2LnBhdGgsIF90aGlzNi5lbnYub3B0cy5kZXYsIGVycik7XG4gICAgICAgIGRpZEVycm9yID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIGlmIChmb3JjZUFzeW5jKSB7XG4gICAgICAgICAgY2FsbGJhY2tBc2FwKGNiLCBlcnIsIHJlcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2IoZXJyLCByZXMpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG5cbiAgICAgICAgc3luY1Jlc3VsdCA9IHJlcztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc3luY1Jlc3VsdDtcbiAgfTtcblxuICBfcHJvdG8zLmdldEV4cG9ydGVkID0gZnVuY3Rpb24gZ2V0RXhwb3J0ZWQoY3R4LCBwYXJlbnRGcmFtZSwgY2IpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgaWYgKHR5cGVvZiBjdHggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gY3R4O1xuICAgICAgY3R4ID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBwYXJlbnRGcmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBwYXJlbnRGcmFtZTtcbiAgICAgIHBhcmVudEZyYW1lID0gbnVsbDtcbiAgICB9IC8vIENhdGNoIGNvbXBpbGUgZXJyb3JzIGZvciBhc3luYyByZW5kZXJpbmdcblxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29tcGlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChjYikge1xuICAgICAgICByZXR1cm4gY2IoZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBmcmFtZSA9IHBhcmVudEZyYW1lID8gcGFyZW50RnJhbWUucHVzaCgpIDogbmV3IEZyYW1lKCk7XG4gICAgZnJhbWUudG9wTGV2ZWwgPSB0cnVlOyAvLyBSdW4gdGhlIHJvb3RSZW5kZXJGdW5jIHRvIHBvcHVsYXRlIHRoZSBjb250ZXh0IHdpdGggZXhwb3J0ZWQgdmFyc1xuXG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dChjdHggfHwge30sIHRoaXMuYmxvY2tzLCB0aGlzLmVudik7XG4gICAgdGhpcy5yb290UmVuZGVyRnVuYyh0aGlzLmVudiwgY29udGV4dCwgZnJhbWUsIGdsb2JhbFJ1bnRpbWUsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgY2IoZXJyLCBudWxsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNiKG51bGwsIGNvbnRleHQuZ2V0RXhwb3J0ZWQoKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jb21waWxlID0gZnVuY3Rpb24gY29tcGlsZSgpIHtcbiAgICBpZiAoIXRoaXMuY29tcGlsZWQpIHtcbiAgICAgIHRoaXMuX2NvbXBpbGUoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5fY29tcGlsZSA9IGZ1bmN0aW9uIF9jb21waWxlKCkge1xuICAgIHZhciBwcm9wcztcblxuICAgIGlmICh0aGlzLnRtcGxQcm9wcykge1xuICAgICAgcHJvcHMgPSB0aGlzLnRtcGxQcm9wcztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNvdXJjZSA9IGNvbXBpbGVyLmNvbXBpbGUodGhpcy50bXBsU3RyLCB0aGlzLmVudi5hc3luY0ZpbHRlcnMsIHRoaXMuZW52LmV4dGVuc2lvbnNMaXN0LCB0aGlzLnBhdGgsIHRoaXMuZW52Lm9wdHMpO1xuICAgICAgdmFyIGZ1bmMgPSBuZXcgRnVuY3Rpb24oc291cmNlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuXG4gICAgICBwcm9wcyA9IGZ1bmMoKTtcbiAgICB9XG5cbiAgICB0aGlzLmJsb2NrcyA9IHRoaXMuX2dldEJsb2Nrcyhwcm9wcyk7XG4gICAgdGhpcy5yb290UmVuZGVyRnVuYyA9IHByb3BzLnJvb3Q7XG4gICAgdGhpcy5jb21waWxlZCA9IHRydWU7XG4gIH07XG5cbiAgX3Byb3RvMy5fZ2V0QmxvY2tzID0gZnVuY3Rpb24gX2dldEJsb2Nrcyhwcm9wcykge1xuICAgIHZhciBibG9ja3MgPSB7fTtcbiAgICBsaWIua2V5cyhwcm9wcykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgaWYgKGsuc2xpY2UoMCwgMikgPT09ICdiXycpIHtcbiAgICAgICAgYmxvY2tzW2suc2xpY2UoMildID0gcHJvcHNba107XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGJsb2NrcztcbiAgfTtcblxuICByZXR1cm4gVGVtcGxhdGU7XG59KE9iaik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFbnZpcm9ubWVudDogRW52aXJvbm1lbnQsXG4gIFRlbXBsYXRlOiBUZW1wbGF0ZVxufTtcblxuLyoqKi8gfSksXG4vKiA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgbGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG52YXIgbm9kZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgT2JqID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKS5PYmo7XG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgUGFyc2VyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqKSB7XG4gIF9pbmhlcml0c0xvb3NlKFBhcnNlciwgX09iaik7XG5cbiAgZnVuY3Rpb24gUGFyc2VyKCkge1xuICAgIHJldHVybiBfT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBQYXJzZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCh0b2tlbnMpIHtcbiAgICB0aGlzLnRva2VucyA9IHRva2VucztcbiAgICB0aGlzLnBlZWtlZCA9IG51bGw7XG4gICAgdGhpcy5icmVha09uQmxvY2tzID0gbnVsbDtcbiAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IGZhbHNlO1xuICAgIHRoaXMuZXh0ZW5zaW9ucyA9IFtdO1xuICB9O1xuXG4gIF9wcm90by5uZXh0VG9rZW4gPSBmdW5jdGlvbiBuZXh0VG9rZW4od2l0aFdoaXRlc3BhY2UpIHtcbiAgICB2YXIgdG9rO1xuXG4gICAgaWYgKHRoaXMucGVla2VkKSB7XG4gICAgICBpZiAoIXdpdGhXaGl0ZXNwYWNlICYmIHRoaXMucGVla2VkLnR5cGUgPT09IGxleGVyLlRPS0VOX1dISVRFU1BBQ0UpIHtcbiAgICAgICAgdGhpcy5wZWVrZWQgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rID0gdGhpcy5wZWVrZWQ7XG4gICAgICAgIHRoaXMucGVla2VkID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRvaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0b2sgPSB0aGlzLnRva2Vucy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICghd2l0aFdoaXRlc3BhY2UpIHtcbiAgICAgIHdoaWxlICh0b2sgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1dISVRFU1BBQ0UpIHtcbiAgICAgICAgdG9rID0gdGhpcy50b2tlbnMubmV4dFRva2VuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvaztcbiAgfTtcblxuICBfcHJvdG8ucGVla1Rva2VuID0gZnVuY3Rpb24gcGVla1Rva2VuKCkge1xuICAgIHRoaXMucGVla2VkID0gdGhpcy5wZWVrZWQgfHwgdGhpcy5uZXh0VG9rZW4oKTtcbiAgICByZXR1cm4gdGhpcy5wZWVrZWQ7XG4gIH07XG5cbiAgX3Byb3RvLnB1c2hUb2tlbiA9IGZ1bmN0aW9uIHB1c2hUb2tlbih0b2spIHtcbiAgICBpZiAodGhpcy5wZWVrZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncHVzaFRva2VuOiBjYW4gb25seSBwdXNoIG9uZSB0b2tlbiBvbiBiZXR3ZWVuIHJlYWRzJyk7XG4gICAgfVxuXG4gICAgdGhpcy5wZWVrZWQgPSB0b2s7XG4gIH07XG5cbiAgX3Byb3RvLmVycm9yID0gZnVuY3Rpb24gZXJyb3IobXNnLCBsaW5lbm8sIGNvbG5vKSB7XG4gICAgaWYgKGxpbmVubyA9PT0gdW5kZWZpbmVkIHx8IGNvbG5vID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpIHx8IHt9O1xuICAgICAgbGluZW5vID0gdG9rLmxpbmVubztcbiAgICAgIGNvbG5vID0gdG9rLmNvbG5vO1xuICAgIH1cblxuICAgIGlmIChsaW5lbm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgbGluZW5vICs9IDE7XG4gICAgfVxuXG4gICAgaWYgKGNvbG5vICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbG5vICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBsaWIuVGVtcGxhdGVFcnJvcihtc2csIGxpbmVubywgY29sbm8pO1xuICB9O1xuXG4gIF9wcm90by5mYWlsID0gZnVuY3Rpb24gZmFpbChtc2csIGxpbmVubywgY29sbm8pIHtcbiAgICB0aHJvdyB0aGlzLmVycm9yKG1zZywgbGluZW5vLCBjb2xubyk7XG4gIH07XG5cbiAgX3Byb3RvLnNraXAgPSBmdW5jdGlvbiBza2lwKHR5cGUpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICghdG9rIHx8IHRvay50eXBlICE9PSB0eXBlKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5leHBlY3QgPSBmdW5jdGlvbiBleHBlY3QodHlwZSkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKHRvay50eXBlICE9PSB0eXBlKSB7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkICcgKyB0eXBlICsgJywgZ290ICcgKyB0b2sudHlwZSwgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rO1xuICB9O1xuXG4gIF9wcm90by5za2lwVmFsdWUgPSBmdW5jdGlvbiBza2lwVmFsdWUodHlwZSwgdmFsKSB7XG4gICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICBpZiAoIXRvayB8fCB0b2sudHlwZSAhPT0gdHlwZSB8fCB0b2sudmFsdWUgIT09IHZhbCkge1xuICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8uc2tpcFN5bWJvbCA9IGZ1bmN0aW9uIHNraXBTeW1ib2wodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX1NZTUJPTCwgdmFsKTtcbiAgfTtcblxuICBfcHJvdG8uYWR2YW5jZUFmdGVyQmxvY2tFbmQgPSBmdW5jdGlvbiBhZHZhbmNlQWZ0ZXJCbG9ja0VuZChuYW1lKSB7XG4gICAgdmFyIHRvaztcblxuICAgIGlmICghbmFtZSkge1xuICAgICAgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgICAgaWYgKCF0b2spIHtcbiAgICAgICAgdGhpcy5mYWlsKCd1bmV4cGVjdGVkIGVuZCBvZiBmaWxlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2sudHlwZSAhPT0gbGV4ZXIuVE9LRU5fU1lNQk9MKSB7XG4gICAgICAgIHRoaXMuZmFpbCgnYWR2YW5jZUFmdGVyQmxvY2tFbmQ6IGV4cGVjdGVkIHN5bWJvbCB0b2tlbiBvciAnICsgJ2V4cGxpY2l0IG5hbWUgdG8gYmUgcGFzc2VkJyk7XG4gICAgICB9XG5cbiAgICAgIG5hbWUgPSB0aGlzLm5leHRUb2tlbigpLnZhbHVlO1xuICAgIH1cblxuICAgIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICBpZiAodG9rICYmIHRvay50eXBlID09PSBsZXhlci5UT0tFTl9CTE9DS19FTkQpIHtcbiAgICAgIGlmICh0b2sudmFsdWUuY2hhckF0KDApID09PSAnLScpIHtcbiAgICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIGJsb2NrIGVuZCBpbiAnICsgbmFtZSArICcgc3RhdGVtZW50Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvaztcbiAgfTtcblxuICBfcHJvdG8uYWR2YW5jZUFmdGVyVmFyaWFibGVFbmQgPSBmdW5jdGlvbiBhZHZhbmNlQWZ0ZXJWYXJpYWJsZUVuZCgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICh0b2sgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1ZBUklBQkxFX0VORCkge1xuICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSB0b2sudmFsdWUuY2hhckF0KHRvay52YWx1ZS5sZW5ndGggLSB0aGlzLnRva2Vucy50YWdzLlZBUklBQkxFX0VORC5sZW5ndGggLSAxKSA9PT0gJy0nO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgdGhpcy5mYWlsKCdleHBlY3RlZCB2YXJpYWJsZSBlbmQnKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRm9yID0gZnVuY3Rpb24gcGFyc2VGb3IoKSB7XG4gICAgdmFyIGZvclRvayA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIG5vZGU7XG4gICAgdmFyIGVuZEJsb2NrO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnZm9yJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRm9yKGZvclRvay5saW5lbm8sIGZvclRvay5jb2xubyk7XG4gICAgICBlbmRCbG9jayA9ICdlbmRmb3InO1xuICAgIH0gZWxzZSBpZiAodGhpcy5za2lwU3ltYm9sKCdhc3luY0VhY2gnKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Bc3luY0VhY2goZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICAgIGVuZEJsb2NrID0gJ2VuZGVhY2gnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5za2lwU3ltYm9sKCdhc3luY0FsbCcpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFzeW5jQWxsKGZvclRvay5saW5lbm8sIGZvclRvay5jb2xubyk7XG4gICAgICBlbmRCbG9jayA9ICdlbmRhbGwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRm9yOiBleHBlY3RlZCBmb3J7QXN5bmN9JywgZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICBub2RlLm5hbWUgPSB0aGlzLnBhcnNlUHJpbWFyeSgpO1xuXG4gICAgaWYgKCEobm9kZS5uYW1lIGluc3RhbmNlb2Ygbm9kZXMuU3ltYm9sKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUZvcjogdmFyaWFibGUgbmFtZSBleHBlY3RlZCBmb3IgbG9vcCcpO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5wZWVrVG9rZW4oKS50eXBlO1xuXG4gICAgaWYgKHR5cGUgPT09IGxleGVyLlRPS0VOX0NPTU1BKSB7XG4gICAgICAvLyBrZXkvdmFsdWUgaXRlcmF0aW9uXG4gICAgICB2YXIga2V5ID0gbm9kZS5uYW1lO1xuICAgICAgbm9kZS5uYW1lID0gbmV3IG5vZGVzLkFycmF5KGtleS5saW5lbm8sIGtleS5jb2xubyk7XG4gICAgICBub2RlLm5hbWUuYWRkQ2hpbGQoa2V5KTtcblxuICAgICAgd2hpbGUgKHRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgdmFyIHByaW0gPSB0aGlzLnBhcnNlUHJpbWFyeSgpO1xuICAgICAgICBub2RlLm5hbWUuYWRkQ2hpbGQocHJpbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2luJykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGb3I6IGV4cGVjdGVkIFwiaW5cIiBrZXl3b3JkIGZvciBsb29wJywgZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICBub2RlLmFyciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChmb3JUb2sudmFsdWUpO1xuICAgIG5vZGUuYm9keSA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcyhlbmRCbG9jaywgJ2Vsc2UnKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2Vsc2UnKSkge1xuICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgnZWxzZScpO1xuICAgICAgbm9kZS5lbHNlXyA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcyhlbmRCbG9jayk7XG4gICAgfVxuXG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU1hY3JvID0gZnVuY3Rpb24gcGFyc2VNYWNybygpIHtcbiAgICB2YXIgbWFjcm9Ub2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ21hY3JvJykpIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgbWFjcm8nKTtcbiAgICB9XG5cbiAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KHRydWUpO1xuICAgIHZhciBhcmdzID0gdGhpcy5wYXJzZVNpZ25hdHVyZSgpO1xuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLk1hY3JvKG1hY3JvVG9rLmxpbmVubywgbWFjcm9Ub2suY29sbm8sIG5hbWUsIGFyZ3MpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQobWFjcm9Ub2sudmFsdWUpO1xuICAgIG5vZGUuYm9keSA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcygnZW5kbWFjcm8nKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlQ2FsbCA9IGZ1bmN0aW9uIHBhcnNlQ2FsbCgpIHtcbiAgICAvLyBhIGNhbGwgYmxvY2sgaXMgcGFyc2VkIGFzIGEgbm9ybWFsIEZ1bkNhbGwsIGJ1dCB3aXRoIGFuIGFkZGVkXG4gICAgLy8gJ2NhbGxlcicga3dhcmcgd2hpY2ggaXMgYSBDYWxsZXIgbm9kZS5cbiAgICB2YXIgY2FsbFRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnY2FsbCcpKSB7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIGNhbGwnKTtcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVyQXJncyA9IHRoaXMucGFyc2VTaWduYXR1cmUodHJ1ZSkgfHwgbmV3IG5vZGVzLk5vZGVMaXN0KCk7XG4gICAgdmFyIG1hY3JvQ2FsbCA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChjYWxsVG9rLnZhbHVlKTtcbiAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcygnZW5kY2FsbCcpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICB2YXIgY2FsbGVyTmFtZSA9IG5ldyBub2Rlcy5TeW1ib2woY2FsbFRvay5saW5lbm8sIGNhbGxUb2suY29sbm8sICdjYWxsZXInKTtcbiAgICB2YXIgY2FsbGVyTm9kZSA9IG5ldyBub2Rlcy5DYWxsZXIoY2FsbFRvay5saW5lbm8sIGNhbGxUb2suY29sbm8sIGNhbGxlck5hbWUsIGNhbGxlckFyZ3MsIGJvZHkpOyAvLyBhZGQgdGhlIGFkZGl0aW9uYWwgY2FsbGVyIGt3YXJnLCBhZGRpbmcga3dhcmdzIGlmIG5lY2Vzc2FyeVxuXG4gICAgdmFyIGFyZ3MgPSBtYWNyb0NhbGwuYXJncy5jaGlsZHJlbjtcblxuICAgIGlmICghKGFyZ3NbYXJncy5sZW5ndGggLSAxXSBpbnN0YW5jZW9mIG5vZGVzLktleXdvcmRBcmdzKSkge1xuICAgICAgYXJncy5wdXNoKG5ldyBub2Rlcy5LZXl3b3JkQXJncygpKTtcbiAgICB9XG5cbiAgICB2YXIga3dhcmdzID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgIGt3YXJncy5hZGRDaGlsZChuZXcgbm9kZXMuUGFpcihjYWxsVG9rLmxpbmVubywgY2FsbFRvay5jb2xubywgY2FsbGVyTmFtZSwgY2FsbGVyTm9kZSkpO1xuICAgIHJldHVybiBuZXcgbm9kZXMuT3V0cHV0KGNhbGxUb2subGluZW5vLCBjYWxsVG9rLmNvbG5vLCBbbWFjcm9DYWxsXSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlV2l0aENvbnRleHQgPSBmdW5jdGlvbiBwYXJzZVdpdGhDb250ZXh0KCkge1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIHZhciB3aXRoQ29udGV4dCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCd3aXRoJykpIHtcbiAgICAgIHdpdGhDb250ZXh0ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2tpcFN5bWJvbCgnd2l0aG91dCcpKSB7XG4gICAgICB3aXRoQ29udGV4dCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh3aXRoQ29udGV4dCAhPT0gbnVsbCkge1xuICAgICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2NvbnRleHQnKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgY29udGV4dCBhZnRlciB3aXRoL3dpdGhvdXQnLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3aXRoQ29udGV4dDtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VJbXBvcnQgPSBmdW5jdGlvbiBwYXJzZUltcG9ydCgpIHtcbiAgICB2YXIgaW1wb3J0VG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdpbXBvcnQnKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUltcG9ydDogZXhwZWN0ZWQgaW1wb3J0JywgaW1wb3J0VG9rLmxpbmVubywgaW1wb3J0VG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2FzJykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VJbXBvcnQ6IGV4cGVjdGVkIFwiYXNcIiBrZXl3b3JkJywgaW1wb3J0VG9rLmxpbmVubywgaW1wb3J0VG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0ID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB2YXIgd2l0aENvbnRleHQgPSB0aGlzLnBhcnNlV2l0aENvbnRleHQoKTtcbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5JbXBvcnQoaW1wb3J0VG9rLmxpbmVubywgaW1wb3J0VG9rLmNvbG5vLCB0ZW1wbGF0ZSwgdGFyZ2V0LCB3aXRoQ29udGV4dCk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChpbXBvcnRUb2sudmFsdWUpO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUZyb20gPSBmdW5jdGlvbiBwYXJzZUZyb20oKSB7XG4gICAgdmFyIGZyb21Ub2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2Zyb20nKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUZyb206IGV4cGVjdGVkIGZyb20nKTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcGxhdGUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2ltcG9ydCcpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgaW1wb3J0JywgZnJvbVRvay5saW5lbm8sIGZyb21Ub2suY29sbm8pO1xuICAgIH1cblxuICAgIHZhciBuYW1lcyA9IG5ldyBub2Rlcy5Ob2RlTGlzdCgpO1xuICAgIHZhciB3aXRoQ29udGV4dDtcblxuICAgIHdoaWxlICgxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgdmFyIG5leHRUb2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgICBpZiAobmV4dFRvay50eXBlID09PSBsZXhlci5UT0tFTl9CTE9DS19FTkQpIHtcbiAgICAgICAgaWYgKCFuYW1lcy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogRXhwZWN0ZWQgYXQgbGVhc3Qgb25lIGltcG9ydCBuYW1lJywgZnJvbVRvay5saW5lbm8sIGZyb21Ub2suY29sbm8pO1xuICAgICAgICB9IC8vIFNpbmNlIHdlIGFyZSBtYW51YWxseSBhZHZhbmNpbmcgcGFzdCB0aGUgYmxvY2sgZW5kLFxuICAgICAgICAvLyBuZWVkIHRvIGtlZXAgdHJhY2sgb2Ygd2hpdGVzcGFjZSBjb250cm9sIChub3JtYWxseVxuICAgICAgICAvLyB0aGlzIGlzIGRvbmUgaW4gYGFkdmFuY2VBZnRlckJsb2NrRW5kYFxuXG5cbiAgICAgICAgaWYgKG5leHRUb2sudmFsdWUuY2hhckF0KDApID09PSAnLScpIHtcbiAgICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKG5hbWVzLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUZyb206IGV4cGVjdGVkIGNvbW1hJywgZnJvbVRvay5saW5lbm8sIGZyb21Ub2suY29sbm8pO1xuICAgICAgfVxuXG4gICAgICB2YXIgbmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG5cbiAgICAgIGlmIChuYW1lLnZhbHVlLmNoYXJBdCgwKSA9PT0gJ18nKSB7XG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBuYW1lcyBzdGFydGluZyB3aXRoIGFuIHVuZGVyc2NvcmUgY2Fubm90IGJlIGltcG9ydGVkJywgbmFtZS5saW5lbm8sIG5hbWUuY29sbm8pO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdhcycpKSB7XG4gICAgICAgIHZhciBhbGlhcyA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG4gICAgICAgIG5hbWVzLmFkZENoaWxkKG5ldyBub2Rlcy5QYWlyKG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBuYW1lLCBhbGlhcykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmFtZXMuYWRkQ2hpbGQobmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHdpdGhDb250ZXh0ID0gdGhpcy5wYXJzZVdpdGhDb250ZXh0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBub2Rlcy5Gcm9tSW1wb3J0KGZyb21Ub2subGluZW5vLCBmcm9tVG9rLmNvbG5vLCB0ZW1wbGF0ZSwgbmFtZXMsIHdpdGhDb250ZXh0KTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VCbG9jayA9IGZ1bmN0aW9uIHBhcnNlQmxvY2soKSB7XG4gICAgdmFyIHRhZyA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnYmxvY2snKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUJsb2NrOiBleHBlY3RlZCBibG9jaycsIHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBuZXcgbm9kZXMuQmxvY2sodGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICBub2RlLm5hbWUgPSB0aGlzLnBhcnNlUHJpbWFyeSgpO1xuXG4gICAgaWYgKCEobm9kZS5uYW1lIGluc3RhbmNlb2Ygbm9kZXMuU3ltYm9sKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUJsb2NrOiB2YXJpYWJsZSBuYW1lIGV4cGVjdGVkJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRhZy52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRibG9jaycpO1xuICAgIHRoaXMuc2tpcFN5bWJvbCgnZW5kYmxvY2snKTtcbiAgICB0aGlzLnNraXBTeW1ib2wobm9kZS5uYW1lLnZhbHVlKTtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdG9rKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlQmxvY2s6IGV4cGVjdGVkIGVuZGJsb2NrLCBnb3QgZW5kIG9mIGZpbGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRvay52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRXh0ZW5kcyA9IGZ1bmN0aW9uIHBhcnNlRXh0ZW5kcygpIHtcbiAgICB2YXIgdGFnTmFtZSA9ICdleHRlbmRzJztcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKHRhZ05hbWUpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlVGVtcGxhdGVSZWY6IGV4cGVjdGVkICcgKyB0YWdOYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5FeHRlbmRzKHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgbm9kZS50ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCh0YWcudmFsdWUpO1xuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUluY2x1ZGUgPSBmdW5jdGlvbiBwYXJzZUluY2x1ZGUoKSB7XG4gICAgdmFyIHRhZ05hbWUgPSAnaW5jbHVkZSc7XG4gICAgdmFyIHRhZyA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCh0YWdOYW1lKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUluY2x1ZGU6IGV4cGVjdGVkICcgKyB0YWdOYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5JbmNsdWRlKHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgbm9kZS50ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdpZ25vcmUnKSAmJiB0aGlzLnNraXBTeW1ib2woJ21pc3NpbmcnKSkge1xuICAgICAgbm9kZS5pZ25vcmVNaXNzaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRhZy52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSWYgPSBmdW5jdGlvbiBwYXJzZUlmKCkge1xuICAgIHZhciB0YWcgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIHZhciBub2RlO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaWYnKSB8fCB0aGlzLnNraXBTeW1ib2woJ2VsaWYnKSB8fCB0aGlzLnNraXBTeW1ib2woJ2Vsc2VpZicpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLklmKHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBTeW1ib2woJ2lmQXN5bmMnKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5JZkFzeW5jKHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VJZjogZXhwZWN0ZWQgaWYsIGVsaWYsIG9yIGVsc2VpZicsIHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgfVxuXG4gICAgbm9kZS5jb25kID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRhZy52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbGlmJywgJ2Vsc2VpZicsICdlbHNlJywgJ2VuZGlmJyk7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBzd2l0Y2ggKHRvayAmJiB0b2sudmFsdWUpIHtcbiAgICAgIGNhc2UgJ2Vsc2VpZic6XG4gICAgICBjYXNlICdlbGlmJzpcbiAgICAgICAgbm9kZS5lbHNlXyA9IHRoaXMucGFyc2VJZigpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZWxzZSc6XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgbm9kZS5lbHNlXyA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcygnZW5kaWYnKTtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZW5kaWYnOlxuICAgICAgICBub2RlLmVsc2VfID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUlmOiBleHBlY3RlZCBlbGlmLCBlbHNlLCBvciBlbmRpZiwgZ290IGVuZCBvZiBmaWxlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlU2V0ID0gZnVuY3Rpb24gcGFyc2VTZXQoKSB7XG4gICAgdmFyIHRhZyA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnc2V0JykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VTZXQ6IGV4cGVjdGVkIHNldCcsIHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgfVxuXG4gICAgdmFyIG5vZGUgPSBuZXcgbm9kZXMuU2V0KHRhZy5saW5lbm8sIHRhZy5jb2xubywgW10pO1xuICAgIHZhciB0YXJnZXQ7XG5cbiAgICB3aGlsZSAodGFyZ2V0ID0gdGhpcy5wYXJzZVByaW1hcnkoKSkge1xuICAgICAgbm9kZS50YXJnZXRzLnB1c2godGFyZ2V0KTtcblxuICAgICAgaWYgKCF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09NTUEpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICc9JykpIHtcbiAgICAgIGlmICghdGhpcy5za2lwKGxleGVyLlRPS0VOX0JMT0NLX0VORCkpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZVNldDogZXhwZWN0ZWQgPSBvciBibG9jayBlbmQgaW4gc2V0IHRhZycsIHRhZy5saW5lbm8sIHRhZy5jb2xubyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLmJvZHkgPSBuZXcgbm9kZXMuQ2FwdHVyZSh0YWcubGluZW5vLCB0YWcuY29sbm8sIHRoaXMucGFyc2VVbnRpbEJsb2NrcygnZW5kc2V0JykpO1xuICAgICAgICBub2RlLnZhbHVlID0gbnVsbDtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlLnZhbHVlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTd2l0Y2ggPSBmdW5jdGlvbiBwYXJzZVN3aXRjaCgpIHtcbiAgICAvKlxuICAgICAqIFN0b3JlIHRoZSB0YWcgbmFtZXMgaW4gdmFyaWFibGVzIGluIGNhc2Ugc29tZW9uZSBldmVyIHdhbnRzIHRvXG4gICAgICogY3VzdG9taXplIHRoaXMuXG4gICAgICovXG4gICAgdmFyIHN3aXRjaFN0YXJ0ID0gJ3N3aXRjaCc7XG4gICAgdmFyIHN3aXRjaEVuZCA9ICdlbmRzd2l0Y2gnO1xuICAgIHZhciBjYXNlU3RhcnQgPSAnY2FzZSc7XG4gICAgdmFyIGNhc2VEZWZhdWx0ID0gJ2RlZmF1bHQnOyAvLyBHZXQgdGhlIHN3aXRjaCB0YWcuXG5cbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTsgLy8gZmFpbCBlYXJseSBpZiB3ZSBnZXQgc29tZSB1bmV4cGVjdGVkIHRhZy5cblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKHN3aXRjaFN0YXJ0KSAmJiAhdGhpcy5za2lwU3ltYm9sKGNhc2VTdGFydCkgJiYgIXRoaXMuc2tpcFN5bWJvbChjYXNlRGVmYXVsdCkpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VTd2l0Y2g6IGV4cGVjdGVkIFwic3dpdGNoLFwiIFwiY2FzZVwiIG9yIFwiZGVmYXVsdFwiJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9IC8vIHBhcnNlIHRoZSBzd2l0Y2ggZXhwcmVzc2lvblxuXG5cbiAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7IC8vIGFkdmFuY2UgdW50aWwgYSBzdGFydCBvZiBhIGNhc2UsIGEgZGVmYXVsdCBjYXNlIG9yIGFuIGVuZHN3aXRjaC5cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoc3dpdGNoU3RhcnQpO1xuICAgIHRoaXMucGFyc2VVbnRpbEJsb2NrcyhjYXNlU3RhcnQsIGNhc2VEZWZhdWx0LCBzd2l0Y2hFbmQpOyAvLyB0aGlzIGlzIHRoZSBmaXJzdCBjYXNlLiBpdCBjb3VsZCBhbHNvIGJlIGFuIGVuZHN3aXRjaCwgd2UnbGwgY2hlY2suXG5cbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTsgLy8gY3JlYXRlIG5ldyB2YXJpYWJsZXMgZm9yIG91ciBjYXNlcyBhbmQgZGVmYXVsdCBjYXNlLlxuXG4gICAgdmFyIGNhc2VzID0gW107XG4gICAgdmFyIGRlZmF1bHRDYXNlOyAvLyB3aGlsZSB3ZSdyZSBkZWFsaW5nIHdpdGggbmV3IGNhc2VzIG5vZGVzLi4uXG5cbiAgICBkbyB7XG4gICAgICAvLyBza2lwIHRoZSBzdGFydCBzeW1ib2wgYW5kIGdldCB0aGUgY2FzZSBleHByZXNzaW9uXG4gICAgICB0aGlzLnNraXBTeW1ib2woY2FzZVN0YXJ0KTtcbiAgICAgIHZhciBjb25kID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoc3dpdGNoU3RhcnQpOyAvLyBnZXQgdGhlIGJvZHkgb2YgdGhlIGNhc2Ugbm9kZSBhbmQgYWRkIGl0IHRvIHRoZSBhcnJheSBvZiBjYXNlcy5cblxuICAgICAgdmFyIGJvZHkgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3MoY2FzZVN0YXJ0LCBjYXNlRGVmYXVsdCwgc3dpdGNoRW5kKTtcbiAgICAgIGNhc2VzLnB1c2gobmV3IG5vZGVzLkNhc2UodG9rLmxpbmUsIHRvay5jb2wsIGNvbmQsIGJvZHkpKTsgLy8gZ2V0IG91ciBuZXh0IGNhc2VcblxuICAgICAgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB9IHdoaWxlICh0b2sgJiYgdG9rLnZhbHVlID09PSBjYXNlU3RhcnQpOyAvLyB3ZSBlaXRoZXIgaGF2ZSBhIGRlZmF1bHQgY2FzZSBvciBhIHN3aXRjaCBlbmQuXG5cblxuICAgIHN3aXRjaCAodG9rLnZhbHVlKSB7XG4gICAgICBjYXNlIGNhc2VEZWZhdWx0OlxuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGRlZmF1bHRDYXNlID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKHN3aXRjaEVuZCk7XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2Ugc3dpdGNoRW5kOlxuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBvdGhlcndpc2UgYmFpbCBiZWNhdXNlIEVPRlxuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlU3dpdGNoOiBleHBlY3RlZCBcImNhc2UsXCIgXCJkZWZhdWx0XCIgb3IgXCJlbmRzd2l0Y2gsXCIgZ290IEVPRi4nKTtcbiAgICB9IC8vIGFuZCByZXR1cm4gdGhlIHN3aXRjaCBub2RlLlxuXG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLlN3aXRjaCh0YWcubGluZW5vLCB0YWcuY29sbm8sIGV4cHIsIGNhc2VzLCBkZWZhdWx0Q2FzZSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlU3RhdGVtZW50ID0gZnVuY3Rpb24gcGFyc2VTdGF0ZW1lbnQoKSB7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAodG9rLnR5cGUgIT09IGxleGVyLlRPS0VOX1NZTUJPTCkge1xuICAgICAgdGhpcy5mYWlsKCd0YWcgbmFtZSBleHBlY3RlZCcsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYnJlYWtPbkJsb2NrcyAmJiBsaWIuaW5kZXhPZih0aGlzLmJyZWFrT25CbG9ja3MsIHRvay52YWx1ZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHRvay52YWx1ZSkge1xuICAgICAgY2FzZSAncmF3JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VSYXcoKTtcblxuICAgICAgY2FzZSAndmVyYmF0aW0nOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJhdygndmVyYmF0aW0nKTtcblxuICAgICAgY2FzZSAnaWYnOlxuICAgICAgY2FzZSAnaWZBc3luYyc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlSWYoKTtcblxuICAgICAgY2FzZSAnZm9yJzpcbiAgICAgIGNhc2UgJ2FzeW5jRWFjaCc6XG4gICAgICBjYXNlICdhc3luY0FsbCc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRm9yKCk7XG5cbiAgICAgIGNhc2UgJ2Jsb2NrJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VCbG9jaygpO1xuXG4gICAgICBjYXNlICdleHRlbmRzJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VFeHRlbmRzKCk7XG5cbiAgICAgIGNhc2UgJ2luY2x1ZGUnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUluY2x1ZGUoKTtcblxuICAgICAgY2FzZSAnc2V0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VTZXQoKTtcblxuICAgICAgY2FzZSAnbWFjcm8nOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZU1hY3JvKCk7XG5cbiAgICAgIGNhc2UgJ2NhbGwnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUNhbGwoKTtcblxuICAgICAgY2FzZSAnaW1wb3J0JzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VJbXBvcnQoKTtcblxuICAgICAgY2FzZSAnZnJvbSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRnJvbSgpO1xuXG4gICAgICBjYXNlICdmaWx0ZXInOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUZpbHRlclN0YXRlbWVudCgpO1xuXG4gICAgICBjYXNlICdzd2l0Y2gnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVN3aXRjaCgpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAodGhpcy5leHRlbnNpb25zLmxlbmd0aCkge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5leHRlbnNpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZXh0ID0gdGhpcy5leHRlbnNpb25zW2ldO1xuXG4gICAgICAgICAgICBpZiAobGliLmluZGV4T2YoZXh0LnRhZ3MgfHwgW10sIHRvay52YWx1ZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiBleHQucGFyc2UodGhpcywgbm9kZXMsIGxleGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZhaWwoJ3Vua25vd24gYmxvY2sgdGFnOiAnICsgdG9rLnZhbHVlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVJhdyA9IGZ1bmN0aW9uIHBhcnNlUmF3KHRhZ05hbWUpIHtcbiAgICB0YWdOYW1lID0gdGFnTmFtZSB8fCAncmF3JztcbiAgICB2YXIgZW5kVGFnTmFtZSA9ICdlbmQnICsgdGFnTmFtZTsgLy8gTG9vayBmb3IgdXBjb21pbmcgcmF3IGJsb2NrcyAoaWdub3JlIGFsbCBvdGhlciBraW5kcyBvZiBibG9ja3MpXG5cbiAgICB2YXIgcmF3QmxvY2tSZWdleCA9IG5ldyBSZWdFeHAoJyhbXFxcXHNcXFxcU10qPyl7JVxcXFxzKignICsgdGFnTmFtZSArICd8JyArIGVuZFRhZ05hbWUgKyAnKVxcXFxzKig/PSV9KSV9Jyk7XG4gICAgdmFyIHJhd0xldmVsID0gMTtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgdmFyIG1hdGNoZXMgPSBudWxsOyAvLyBTa2lwIG9wZW5pbmcgcmF3IHRva2VuXG4gICAgLy8gS2VlcCB0aGlzIHRva2VuIHRvIHRyYWNrIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzXG5cbiAgICB2YXIgYmVndW4gPSB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7IC8vIEV4aXQgd2hlbiB0aGVyZSdzIG5vdGhpbmcgdG8gbWF0Y2hcbiAgICAvLyBvciB3aGVuIHdlJ3ZlIGZvdW5kIHRoZSBtYXRjaGluZyBcImVuZHJhd1wiIGJsb2NrXG5cbiAgICB3aGlsZSAoKG1hdGNoZXMgPSB0aGlzLnRva2Vucy5fZXh0cmFjdFJlZ2V4KHJhd0Jsb2NrUmVnZXgpKSAmJiByYXdMZXZlbCA+IDApIHtcbiAgICAgIHZhciBhbGwgPSBtYXRjaGVzWzBdO1xuICAgICAgdmFyIHByZSA9IG1hdGNoZXNbMV07XG4gICAgICB2YXIgYmxvY2tOYW1lID0gbWF0Y2hlc1syXTsgLy8gQWRqdXN0IHJhd2xldmVsXG5cbiAgICAgIGlmIChibG9ja05hbWUgPT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmF3TGV2ZWwgKz0gMTtcbiAgICAgIH0gZWxzZSBpZiAoYmxvY2tOYW1lID09PSBlbmRUYWdOYW1lKSB7XG4gICAgICAgIHJhd0xldmVsIC09IDE7XG4gICAgICB9IC8vIEFkZCB0byBzdHJcblxuXG4gICAgICBpZiAocmF3TGV2ZWwgPT09IDApIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBleGNsdWRlIHRoZSBsYXN0IFwiZW5kcmF3XCJcbiAgICAgICAgc3RyICs9IHByZTsgLy8gTW92ZSB0b2tlbml6ZXIgdG8gYmVnaW5uaW5nIG9mIGVuZHJhdyBibG9ja1xuXG4gICAgICAgIHRoaXMudG9rZW5zLmJhY2tOKGFsbC5sZW5ndGggLSBwcmUubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBhbGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBub2Rlcy5PdXRwdXQoYmVndW4ubGluZW5vLCBiZWd1bi5jb2xubywgW25ldyBub2Rlcy5UZW1wbGF0ZURhdGEoYmVndW4ubGluZW5vLCBiZWd1bi5jb2xubywgc3RyKV0pO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVBvc3RmaXggPSBmdW5jdGlvbiBwYXJzZVBvc3RmaXgobm9kZSkge1xuICAgIHZhciBsb29rdXA7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICB3aGlsZSAodG9rKSB7XG4gICAgICBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0xFRlRfUEFSRU4pIHtcbiAgICAgICAgLy8gRnVuY3Rpb24gY2FsbFxuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkZ1bkNhbGwodG9rLmxpbmVubywgdG9rLmNvbG5vLCBub2RlLCB0aGlzLnBhcnNlU2lnbmF0dXJlKCkpO1xuICAgICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTEVGVF9CUkFDS0VUKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZVxuICAgICAgICBsb29rdXAgPSB0aGlzLnBhcnNlQWdncmVnYXRlKCk7XG5cbiAgICAgICAgaWYgKGxvb2t1cC5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhpcy5mYWlsKCdpbnZhbGlkIGluZGV4Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkxvb2t1cFZhbCh0b2subGluZW5vLCB0b2suY29sbm8sIG5vZGUsIGxvb2t1cC5jaGlsZHJlblswXSk7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9PUEVSQVRPUiAmJiB0b2sudmFsdWUgPT09ICcuJykge1xuICAgICAgICAvLyBSZWZlcmVuY2VcbiAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICAgICAgaWYgKHZhbC50eXBlICE9PSBsZXhlci5UT0tFTl9TWU1CT0wpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIG5hbWUgYXMgbG9va3VwIHZhbHVlLCBnb3QgJyArIHZhbC52YWx1ZSwgdmFsLmxpbmVubywgdmFsLmNvbG5vKTtcbiAgICAgICAgfSAvLyBNYWtlIGEgbGl0ZXJhbCBzdHJpbmcgYmVjYXVzZSBpdCdzIG5vdCBhIHZhcmlhYmxlXG4gICAgICAgIC8vIHJlZmVyZW5jZVxuXG5cbiAgICAgICAgbG9va3VwID0gbmV3IG5vZGVzLkxpdGVyYWwodmFsLmxpbmVubywgdmFsLmNvbG5vLCB2YWwudmFsdWUpO1xuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkxvb2t1cFZhbCh0b2subGluZW5vLCB0b2suY29sbm8sIG5vZGUsIGxvb2t1cCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VFeHByZXNzaW9uID0gZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9uKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZUlubGluZUlmKCk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSW5saW5lSWYgPSBmdW5jdGlvbiBwYXJzZUlubGluZUlmKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZU9yKCk7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdpZicpKSB7XG4gICAgICB2YXIgY29uZE5vZGUgPSB0aGlzLnBhcnNlT3IoKTtcbiAgICAgIHZhciBib2R5Tm9kZSA9IG5vZGU7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLklubGluZUlmKG5vZGUubGluZW5vLCBub2RlLmNvbG5vKTtcbiAgICAgIG5vZGUuYm9keSA9IGJvZHlOb2RlO1xuICAgICAgbm9kZS5jb25kID0gY29uZE5vZGU7XG5cbiAgICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2Vsc2UnKSkge1xuICAgICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZU9yKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlLmVsc2VfID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VPciA9IGZ1bmN0aW9uIHBhcnNlT3IoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlQW5kKCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwU3ltYm9sKCdvcicpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlQW5kKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLk9yKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlQW5kID0gZnVuY3Rpb24gcGFyc2VBbmQoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlTm90KCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwU3ltYm9sKCdhbmQnKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZU5vdCgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5BbmQobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VOb3QgPSBmdW5jdGlvbiBwYXJzZU5vdCgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ25vdCcpKSB7XG4gICAgICByZXR1cm4gbmV3IG5vZGVzLk5vdCh0b2subGluZW5vLCB0b2suY29sbm8sIHRoaXMucGFyc2VOb3QoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucGFyc2VJbigpO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUluID0gZnVuY3Rpb24gcGFyc2VJbigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VJcygpO1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICAvLyBjaGVjayBpZiB0aGUgbmV4dCB0b2tlbiBpcyAnbm90J1xuICAgICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICAgIGlmICghdG9rKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB2YXIgaW52ZXJ0ID0gdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1NZTUJPTCAmJiB0b2sudmFsdWUgPT09ICdub3QnOyAvLyBpZiBpdCB3YXNuJ3QgJ25vdCcsIHB1dCBpdCBiYWNrXG5cbiAgICAgIGlmICghaW52ZXJ0KSB7XG4gICAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2luJykpIHtcbiAgICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZUlzKCk7XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSW4obm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcblxuICAgICAgICBpZiAoaW52ZXJ0KSB7XG4gICAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Ob3Qobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpZiB3ZSdkIGZvdW5kIGEgJ25vdCcgYnV0IHRoaXMgd2Fzbid0IGFuICdpbicsIHB1dCBiYWNrIHRoZSAnbm90J1xuICAgICAgICBpZiAoaW52ZXJ0KSB7XG4gICAgICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9IC8vIEkgcHV0IHRoaXMgcmlnaHQgYWZ0ZXIgXCJpblwiIGluIHRoZSBvcGVyYXRvciBwcmVjZWRlbmNlIHN0YWNrLiBUaGF0IGNhblxuICAvLyBvYnZpb3VzbHkgYmUgY2hhbmdlZCB0byBiZSBjbG9zZXIgdG8gSmluamEuXG4gIDtcblxuICBfcHJvdG8ucGFyc2VJcyA9IGZ1bmN0aW9uIHBhcnNlSXMoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlQ29tcGFyZSgpOyAvLyBsb29rIGZvciBhbiBpc1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaXMnKSkge1xuICAgICAgLy8gbG9vayBmb3IgYSBub3RcbiAgICAgIHZhciBub3QgPSB0aGlzLnNraXBTeW1ib2woJ25vdCcpOyAvLyBnZXQgdGhlIG5leHQgbm9kZVxuXG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlQ29tcGFyZSgpOyAvLyBjcmVhdGUgYW4gSXMgbm9kZSB1c2luZyB0aGUgbmV4dCBub2RlIGFuZCB0aGUgaW5mbyBmcm9tIG91ciBJcyBub2RlLlxuXG4gICAgICBub2RlID0gbmV3IG5vZGVzLklzKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7IC8vIGlmIHdlIGhhdmUgYSBOb3QsIGNyZWF0ZSBhIE5vdCBub2RlIGZyb20gb3VyIElzIG5vZGUuXG5cbiAgICAgIGlmIChub3QpIHtcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Ob3Qobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUpO1xuICAgICAgfVxuICAgIH0gLy8gcmV0dXJuIHRoZSBub2RlLlxuXG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VDb21wYXJlID0gZnVuY3Rpb24gcGFyc2VDb21wYXJlKCkge1xuICAgIHZhciBjb21wYXJlT3BzID0gWyc9PScsICc9PT0nLCAnIT0nLCAnIT09JywgJzwnLCAnPicsICc8PScsICc+PSddO1xuICAgIHZhciBleHByID0gdGhpcy5wYXJzZUNvbmNhdCgpO1xuICAgIHZhciBvcHMgPSBbXTtcblxuICAgIHdoaWxlICgxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICAgIGlmICghdG9rKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChjb21wYXJlT3BzLmluZGV4T2YodG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgb3BzLnB1c2gobmV3IG5vZGVzLkNvbXBhcmVPcGVyYW5kKHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZUNvbmNhdCgpLCB0b2sudmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbmV3IG5vZGVzLkNvbXBhcmUob3BzWzBdLmxpbmVubywgb3BzWzBdLmNvbG5vLCBleHByLCBvcHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXhwcjtcbiAgICB9XG4gIH0gLy8gZmluZHMgdGhlICd+JyBmb3Igc3RyaW5nIGNvbmNhdGVuYXRpb25cbiAgO1xuXG4gIF9wcm90by5wYXJzZUNvbmNhdCA9IGZ1bmN0aW9uIHBhcnNlQ29uY2F0KCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZUFkZCgpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX1RJTERFLCAnficpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlQWRkKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkNvbmNhdChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUFkZCA9IGZ1bmN0aW9uIHBhcnNlQWRkKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZVN1YigpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnKycpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlU3ViKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFkZChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVN1YiA9IGZ1bmN0aW9uIHBhcnNlU3ViKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZU11bCgpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnLScpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlTXVsKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLlN1Yihub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU11bCA9IGZ1bmN0aW9uIHBhcnNlTXVsKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZURpdigpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnKicpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlRGl2KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLk11bChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZURpdiA9IGZ1bmN0aW9uIHBhcnNlRGl2KCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZUZsb29yRGl2KCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcvJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VGbG9vckRpdigpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5EaXYobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGbG9vckRpdiA9IGZ1bmN0aW9uIHBhcnNlRmxvb3JEaXYoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlTW9kKCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcvLycpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlTW9kKCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkZsb29yRGl2KG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlTW9kID0gZnVuY3Rpb24gcGFyc2VNb2QoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlUG93KCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICclJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VQb3coKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTW9kKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUG93ID0gZnVuY3Rpb24gcGFyc2VQb3coKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlVW5hcnkoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJyoqJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VVbmFyeSgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Qb3cobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VVbmFyeSA9IGZ1bmN0aW9uIHBhcnNlVW5hcnkobm9GaWx0ZXJzKSB7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICctJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTmVnKHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZVVuYXJ5KHRydWUpKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnKycpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLlBvcyh0b2subGluZW5vLCB0b2suY29sbm8sIHRoaXMucGFyc2VVbmFyeSh0cnVlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSB0aGlzLnBhcnNlUHJpbWFyeSgpO1xuICAgIH1cblxuICAgIGlmICghbm9GaWx0ZXJzKSB7XG4gICAgICBub2RlID0gdGhpcy5wYXJzZUZpbHRlcihub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VQcmltYXJ5ID0gZnVuY3Rpb24gcGFyc2VQcmltYXJ5KG5vUG9zdGZpeCkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuICAgIHZhciB2YWw7XG4gICAgdmFyIG5vZGUgPSBudWxsO1xuXG4gICAgaWYgKCF0b2spIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgZXhwcmVzc2lvbiwgZ290IGVuZCBvZiBmaWxlJyk7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fU1RSSU5HKSB7XG4gICAgICB2YWwgPSB0b2sudmFsdWU7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fSU5UKSB7XG4gICAgICB2YWwgPSBwYXJzZUludCh0b2sudmFsdWUsIDEwKTtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9GTE9BVCkge1xuICAgICAgdmFsID0gcGFyc2VGbG9hdCh0b2sudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JPT0xFQU4pIHtcbiAgICAgIGlmICh0b2sudmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgICB2YWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0b2sudmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgdmFsID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZhaWwoJ2ludmFsaWQgYm9vbGVhbjogJyArIHRvay52YWx1ZSwgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9OT05FKSB7XG4gICAgICB2YWwgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1JFR0VYKSB7XG4gICAgICB2YWwgPSBuZXcgUmVnRXhwKHRvay52YWx1ZS5ib2R5LCB0b2sudmFsdWUuZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5MaXRlcmFsKHRvay5saW5lbm8sIHRvay5jb2xubywgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9TWU1CT0wpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuU3ltYm9sKHRvay5saW5lbm8sIHRvay5jb2xubywgdG9rLnZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2VlIGlmIGl0J3MgYW4gYWdncmVnYXRlIHR5cGUsIHdlIG5lZWQgdG8gcHVzaCB0aGVcbiAgICAgIC8vIGN1cnJlbnQgZGVsaW1pdGVyIHRva2VuIGJhY2sgb25cbiAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICBub2RlID0gdGhpcy5wYXJzZUFnZ3JlZ2F0ZSgpO1xuICAgIH1cblxuICAgIGlmICghbm9Qb3N0Zml4KSB7XG4gICAgICBub2RlID0gdGhpcy5wYXJzZVBvc3RmaXgobm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyB0aGlzLmVycm9yKFwidW5leHBlY3RlZCB0b2tlbjogXCIgKyB0b2sudmFsdWUsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5wYXJzZUZpbHRlck5hbWUgPSBmdW5jdGlvbiBwYXJzZUZpbHRlck5hbWUoKSB7XG4gICAgdmFyIHRvayA9IHRoaXMuZXhwZWN0KGxleGVyLlRPS0VOX1NZTUJPTCk7XG4gICAgdmFyIG5hbWUgPSB0b2sudmFsdWU7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcuJykpIHtcbiAgICAgIG5hbWUgKz0gJy4nICsgdGhpcy5leHBlY3QobGV4ZXIuVE9LRU5fU1lNQk9MKS52YWx1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLlN5bWJvbCh0b2subGluZW5vLCB0b2suY29sbm8sIG5hbWUpO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUZpbHRlckFyZ3MgPSBmdW5jdGlvbiBwYXJzZUZpbHRlckFyZ3Mobm9kZSkge1xuICAgIGlmICh0aGlzLnBlZWtUb2tlbigpLnR5cGUgPT09IGxleGVyLlRPS0VOX0xFRlRfUEFSRU4pIHtcbiAgICAgIC8vIEdldCBhIEZ1bkNhbGwgbm9kZSBhbmQgYWRkIHRoZSBwYXJhbWV0ZXJzIHRvIHRoZVxuICAgICAgLy8gZmlsdGVyXG4gICAgICB2YXIgY2FsbCA9IHRoaXMucGFyc2VQb3N0Zml4KG5vZGUpO1xuICAgICAgcmV0dXJuIGNhbGwuYXJncy5jaGlsZHJlbjtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRmlsdGVyID0gZnVuY3Rpb24gcGFyc2VGaWx0ZXIobm9kZSkge1xuICAgIHdoaWxlICh0aGlzLnNraXAobGV4ZXIuVE9LRU5fUElQRSkpIHtcbiAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZUZpbHRlck5hbWUoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRmlsdGVyKG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBuYW1lLCBuZXcgbm9kZXMuTm9kZUxpc3QobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIFtub2RlXS5jb25jYXQodGhpcy5wYXJzZUZpbHRlckFyZ3Mobm9kZSkpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRmlsdGVyU3RhdGVtZW50ID0gZnVuY3Rpb24gcGFyc2VGaWx0ZXJTdGF0ZW1lbnQoKSB7XG4gICAgdmFyIGZpbHRlclRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnZmlsdGVyJykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGaWx0ZXJTdGF0ZW1lbnQ6IGV4cGVjdGVkIGZpbHRlcicpO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZUZpbHRlck5hbWUoKTtcbiAgICB2YXIgYXJncyA9IHRoaXMucGFyc2VGaWx0ZXJBcmdzKG5hbWUpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoZmlsdGVyVG9rLnZhbHVlKTtcbiAgICB2YXIgYm9keSA9IG5ldyBub2Rlcy5DYXB0dXJlKG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCB0aGlzLnBhcnNlVW50aWxCbG9ja3MoJ2VuZGZpbHRlcicpKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgdmFyIG5vZGUgPSBuZXcgbm9kZXMuRmlsdGVyKG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBuYW1lLCBuZXcgbm9kZXMuTm9kZUxpc3QobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIFtib2R5XS5jb25jYXQoYXJncykpKTtcbiAgICByZXR1cm4gbmV3IG5vZGVzLk91dHB1dChuYW1lLmxpbmVubywgbmFtZS5jb2xubywgW25vZGVdKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VBZ2dyZWdhdGUgPSBmdW5jdGlvbiBwYXJzZUFnZ3JlZ2F0ZSgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcblxuICAgIHN3aXRjaCAodG9rLnR5cGUpIHtcbiAgICAgIGNhc2UgbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTjpcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Hcm91cCh0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBsZXhlci5UT0tFTl9MRUZUX0JSQUNLRVQ6XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuQXJyYXkodG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbGV4ZXIuVE9LRU5fTEVGVF9DVVJMWTpcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5EaWN0KHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB3aGlsZSAoMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHZhciB0eXBlID0gdGhpcy5wZWVrVG9rZW4oKS50eXBlO1xuXG4gICAgICBpZiAodHlwZSA9PT0gbGV4ZXIuVE9LRU5fUklHSFRfUEFSRU4gfHwgdHlwZSA9PT0gbGV4ZXIuVE9LRU5fUklHSFRfQlJBQ0tFVCB8fCB0eXBlID09PSBsZXhlci5UT0tFTl9SSUdIVF9DVVJMWSkge1xuICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlQWdncmVnYXRlOiBleHBlY3RlZCBjb21tYSBhZnRlciBleHByZXNzaW9uJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkRpY3QpIHtcbiAgICAgICAgLy8gVE9ETzogY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICB2YXIga2V5ID0gdGhpcy5wYXJzZVByaW1hcnkoKTsgLy8gV2UgZXhwZWN0IGEga2V5L3ZhbHVlIHBhaXIgZm9yIGRpY3RzLCBzZXBhcmF0ZWQgYnkgYVxuICAgICAgICAvLyBjb2xvblxuXG4gICAgICAgIGlmICghdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTE9OKSkge1xuICAgICAgICAgIHRoaXMuZmFpbCgncGFyc2VBZ2dyZWdhdGU6IGV4cGVjdGVkIGNvbG9uIGFmdGVyIGRpY3Qga2V5JywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgfSAvLyBUT0RPOiBjaGVjayBmb3IgZXJyb3JzXG5cblxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgICBub2RlLmFkZENoaWxkKG5ldyBub2Rlcy5QYWlyKGtleS5saW5lbm8sIGtleS5jb2xubywga2V5LCB2YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVE9ETzogY2hlY2sgZm9yIGVycm9yc1xuICAgICAgICB2YXIgZXhwciA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgIG5vZGUuYWRkQ2hpbGQoZXhwcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlU2lnbmF0dXJlID0gZnVuY3Rpb24gcGFyc2VTaWduYXR1cmUodG9sZXJhbnQsIG5vUGFyZW5zKSB7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIW5vUGFyZW5zICYmIHRvay50eXBlICE9PSBsZXhlci5UT0tFTl9MRUZUX1BBUkVOKSB7XG4gICAgICBpZiAodG9sZXJhbnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIGFyZ3VtZW50cycsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9MRUZUX1BBUkVOKSB7XG4gICAgICB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gbmV3IG5vZGVzLk5vZGVMaXN0KHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgdmFyIGt3YXJncyA9IG5ldyBub2Rlcy5LZXl3b3JkQXJncyh0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIHZhciBjaGVja0NvbW1hID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICAgIGlmICghbm9QYXJlbnMgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1JJR0hUX1BBUkVOKSB7XG4gICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmIChub1BhcmVucyAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fQkxPQ0tfRU5EKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hlY2tDb21tYSAmJiAhdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlU2lnbmF0dXJlOiBleHBlY3RlZCBjb21tYSBhZnRlciBleHByZXNzaW9uJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBhcmcgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuXG4gICAgICAgIGlmICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJz0nKSkge1xuICAgICAgICAgIGt3YXJncy5hZGRDaGlsZChuZXcgbm9kZXMuUGFpcihhcmcubGluZW5vLCBhcmcuY29sbm8sIGFyZywgdGhpcy5wYXJzZUV4cHJlc3Npb24oKSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFyZ3MuYWRkQ2hpbGQoYXJnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjaGVja0NvbW1hID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoa3dhcmdzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgYXJncy5hZGRDaGlsZChrd2FyZ3MpO1xuICAgIH1cblxuICAgIHJldHVybiBhcmdzO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVVudGlsQmxvY2tzID0gZnVuY3Rpb24gcGFyc2VVbnRpbEJsb2NrcygpIHtcbiAgICB2YXIgcHJldiA9IHRoaXMuYnJlYWtPbkJsb2NrcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBibG9ja05hbWVzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYmxvY2tOYW1lc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLmJyZWFrT25CbG9ja3MgPSBibG9ja05hbWVzO1xuICAgIHZhciByZXQgPSB0aGlzLnBhcnNlKCk7XG4gICAgdGhpcy5icmVha09uQmxvY2tzID0gcHJldjtcbiAgICByZXR1cm4gcmV0O1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU5vZGVzID0gZnVuY3Rpb24gcGFyc2VOb2RlcygpIHtcbiAgICB2YXIgdG9rO1xuICAgIHZhciBidWYgPSBbXTtcblxuICAgIHdoaWxlICh0b2sgPSB0aGlzLm5leHRUb2tlbigpKSB7XG4gICAgICBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0RBVEEpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB0b2sudmFsdWU7XG4gICAgICAgIHZhciBuZXh0VG9rZW4gPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgICAgICB2YXIgbmV4dFZhbCA9IG5leHRUb2tlbiAmJiBuZXh0VG9rZW4udmFsdWU7IC8vIElmIHRoZSBsYXN0IHRva2VuIGhhcyBcIi1cIiB3ZSBuZWVkIHRvIHRyaW0gdGhlXG4gICAgICAgIC8vIGxlYWRpbmcgd2hpdGVzcGFjZSBvZiB0aGUgZGF0YS4gVGhpcyBpcyBtYXJrZWQgd2l0aFxuICAgICAgICAvLyB0aGUgYGRyb3BMZWFkaW5nV2hpdGVzcGFjZWAgdmFyaWFibGUuXG5cbiAgICAgICAgaWYgKHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgKGRvbid0IHVzZSByZWdleClcbiAgICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbiAgICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IGZhbHNlO1xuICAgICAgICB9IC8vIFNhbWUgZm9yIHRoZSBzdWNjZWVkaW5nIGJsb2NrIHN0YXJ0IHRva2VuXG5cblxuICAgICAgICBpZiAobmV4dFRva2VuICYmIChuZXh0VG9rZW4udHlwZSA9PT0gbGV4ZXIuVE9LRU5fQkxPQ0tfU1RBUlQgJiYgbmV4dFZhbC5jaGFyQXQobmV4dFZhbC5sZW5ndGggLSAxKSA9PT0gJy0nIHx8IG5leHRUb2tlbi50eXBlID09PSBsZXhlci5UT0tFTl9WQVJJQUJMRV9TVEFSVCAmJiBuZXh0VmFsLmNoYXJBdCh0aGlzLnRva2Vucy50YWdzLlZBUklBQkxFX1NUQVJULmxlbmd0aCkgPT09ICctJyB8fCBuZXh0VG9rZW4udHlwZSA9PT0gbGV4ZXIuVE9LRU5fQ09NTUVOVCAmJiBuZXh0VmFsLmNoYXJBdCh0aGlzLnRva2Vucy50YWdzLkNPTU1FTlRfU1RBUlQubGVuZ3RoKSA9PT0gJy0nKSkge1xuICAgICAgICAgIC8vIFRPRE86IHRoaXMgY291bGQgYmUgb3B0aW1pemVkIChkb24ndCB1c2UgcmVnZXgpXG4gICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBidWYucHVzaChuZXcgbm9kZXMuT3V0cHV0KHRvay5saW5lbm8sIHRvay5jb2xubywgW25ldyBub2Rlcy5UZW1wbGF0ZURhdGEodG9rLmxpbmVubywgdG9rLmNvbG5vLCBkYXRhKV0pKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX1NUQVJUKSB7XG4gICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gZmFsc2U7XG4gICAgICAgIHZhciBuID0gdGhpcy5wYXJzZVN0YXRlbWVudCgpO1xuXG4gICAgICAgIGlmICghbikge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYnVmLnB1c2gobik7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9WQVJJQUJMRV9TVEFSVCkge1xuICAgICAgICB2YXIgZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyVmFyaWFibGVFbmQoKTtcbiAgICAgICAgYnVmLnB1c2gobmV3IG5vZGVzLk91dHB1dCh0b2subGluZW5vLCB0b2suY29sbm8sIFtlXSkpO1xuICAgICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fQ09NTUVOVCkge1xuICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRvay52YWx1ZS5jaGFyQXQodG9rLnZhbHVlLmxlbmd0aCAtIHRoaXMudG9rZW5zLnRhZ3MuQ09NTUVOVF9FTkQubGVuZ3RoIC0gMSkgPT09ICctJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIElnbm9yZSBjb21tZW50cywgb3RoZXJ3aXNlIHRoaXMgc2hvdWxkIGJlIGFuIGVycm9yXG4gICAgICAgIHRoaXMuZmFpbCgnVW5leHBlY3RlZCB0b2tlbiBhdCB0b3AtbGV2ZWw6ICcgKyB0b2sudHlwZSwgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKCkge1xuICAgIHJldHVybiBuZXcgbm9kZXMuTm9kZUxpc3QoMCwgMCwgdGhpcy5wYXJzZU5vZGVzKCkpO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUFzUm9vdCA9IGZ1bmN0aW9uIHBhcnNlQXNSb290KCkge1xuICAgIHJldHVybiBuZXcgbm9kZXMuUm9vdCgwLCAwLCB0aGlzLnBhcnNlTm9kZXMoKSk7XG4gIH07XG5cbiAgcmV0dXJuIFBhcnNlcjtcbn0oT2JqKTsgLy8gdmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsJyk7XG4vLyB2YXIgbCA9IGxleGVyLmxleCgneyUtIGlmIHggLSV9XFxuIGhlbGxvIHslIGVuZGlmICV9Jyk7XG4vLyB2YXIgdDtcbi8vIHdoaWxlKCh0ID0gbC5uZXh0VG9rZW4oKSkpIHtcbi8vICAgICBjb25zb2xlLmxvZyh1dGlsLmluc3BlY3QodCkpO1xuLy8gfVxuLy8gdmFyIHAgPSBuZXcgUGFyc2VyKGxleGVyLmxleCgnaGVsbG8geyUgZmlsdGVyIHRpdGxlICV9JyArXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIZWxsbyBtYWRhbSBob3cgYXJlIHlvdScgK1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAneyUgZW5kZmlsdGVyICV9JykpO1xuLy8gdmFyIG4gPSBwLnBhcnNlQXNSb290KCk7XG4vLyBub2Rlcy5wcmludE5vZGVzKG4pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXJzZTogZnVuY3Rpb24gcGFyc2Uoc3JjLCBleHRlbnNpb25zLCBvcHRzKSB7XG4gICAgdmFyIHAgPSBuZXcgUGFyc2VyKGxleGVyLmxleChzcmMsIG9wdHMpKTtcblxuICAgIGlmIChleHRlbnNpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHAuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHAucGFyc2VBc1Jvb3QoKTtcbiAgfSxcbiAgUGFyc2VyOiBQYXJzZXJcbn07XG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgbGliID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIHdoaXRlc3BhY2VDaGFycyA9IFwiIFxcblxcdFxcclxceEEwXCI7XG52YXIgZGVsaW1DaGFycyA9ICcoKVtde30lKi0rfi8jLDp8Ljw+PSEnO1xudmFyIGludENoYXJzID0gJzAxMjM0NTY3ODknO1xudmFyIEJMT0NLX1NUQVJUID0gJ3slJztcbnZhciBCTE9DS19FTkQgPSAnJX0nO1xudmFyIFZBUklBQkxFX1NUQVJUID0gJ3t7JztcbnZhciBWQVJJQUJMRV9FTkQgPSAnfX0nO1xudmFyIENPTU1FTlRfU1RBUlQgPSAneyMnO1xudmFyIENPTU1FTlRfRU5EID0gJyN9JztcbnZhciBUT0tFTl9TVFJJTkcgPSAnc3RyaW5nJztcbnZhciBUT0tFTl9XSElURVNQQUNFID0gJ3doaXRlc3BhY2UnO1xudmFyIFRPS0VOX0RBVEEgPSAnZGF0YSc7XG52YXIgVE9LRU5fQkxPQ0tfU1RBUlQgPSAnYmxvY2stc3RhcnQnO1xudmFyIFRPS0VOX0JMT0NLX0VORCA9ICdibG9jay1lbmQnO1xudmFyIFRPS0VOX1ZBUklBQkxFX1NUQVJUID0gJ3ZhcmlhYmxlLXN0YXJ0JztcbnZhciBUT0tFTl9WQVJJQUJMRV9FTkQgPSAndmFyaWFibGUtZW5kJztcbnZhciBUT0tFTl9DT01NRU5UID0gJ2NvbW1lbnQnO1xudmFyIFRPS0VOX0xFRlRfUEFSRU4gPSAnbGVmdC1wYXJlbic7XG52YXIgVE9LRU5fUklHSFRfUEFSRU4gPSAncmlnaHQtcGFyZW4nO1xudmFyIFRPS0VOX0xFRlRfQlJBQ0tFVCA9ICdsZWZ0LWJyYWNrZXQnO1xudmFyIFRPS0VOX1JJR0hUX0JSQUNLRVQgPSAncmlnaHQtYnJhY2tldCc7XG52YXIgVE9LRU5fTEVGVF9DVVJMWSA9ICdsZWZ0LWN1cmx5JztcbnZhciBUT0tFTl9SSUdIVF9DVVJMWSA9ICdyaWdodC1jdXJseSc7XG52YXIgVE9LRU5fT1BFUkFUT1IgPSAnb3BlcmF0b3InO1xudmFyIFRPS0VOX0NPTU1BID0gJ2NvbW1hJztcbnZhciBUT0tFTl9DT0xPTiA9ICdjb2xvbic7XG52YXIgVE9LRU5fVElMREUgPSAndGlsZGUnO1xudmFyIFRPS0VOX1BJUEUgPSAncGlwZSc7XG52YXIgVE9LRU5fSU5UID0gJ2ludCc7XG52YXIgVE9LRU5fRkxPQVQgPSAnZmxvYXQnO1xudmFyIFRPS0VOX0JPT0xFQU4gPSAnYm9vbGVhbic7XG52YXIgVE9LRU5fTk9ORSA9ICdub25lJztcbnZhciBUT0tFTl9TWU1CT0wgPSAnc3ltYm9sJztcbnZhciBUT0tFTl9TUEVDSUFMID0gJ3NwZWNpYWwnO1xudmFyIFRPS0VOX1JFR0VYID0gJ3JlZ2V4JztcblxuZnVuY3Rpb24gdG9rZW4odHlwZSwgdmFsdWUsIGxpbmVubywgY29sbm8pIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiB0eXBlLFxuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBsaW5lbm86IGxpbmVubyxcbiAgICBjb2xubzogY29sbm9cbiAgfTtcbn1cblxudmFyIFRva2VuaXplciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRva2VuaXplcihzdHIsIG9wdHMpIHtcbiAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICB0aGlzLmluZGV4ID0gMDtcbiAgICB0aGlzLmxlbiA9IHN0ci5sZW5ndGg7XG4gICAgdGhpcy5saW5lbm8gPSAwO1xuICAgIHRoaXMuY29sbm8gPSAwO1xuICAgIHRoaXMuaW5fY29kZSA9IGZhbHNlO1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIHZhciB0YWdzID0gb3B0cy50YWdzIHx8IHt9O1xuICAgIHRoaXMudGFncyA9IHtcbiAgICAgIEJMT0NLX1NUQVJUOiB0YWdzLmJsb2NrU3RhcnQgfHwgQkxPQ0tfU1RBUlQsXG4gICAgICBCTE9DS19FTkQ6IHRhZ3MuYmxvY2tFbmQgfHwgQkxPQ0tfRU5ELFxuICAgICAgVkFSSUFCTEVfU1RBUlQ6IHRhZ3MudmFyaWFibGVTdGFydCB8fCBWQVJJQUJMRV9TVEFSVCxcbiAgICAgIFZBUklBQkxFX0VORDogdGFncy52YXJpYWJsZUVuZCB8fCBWQVJJQUJMRV9FTkQsXG4gICAgICBDT01NRU5UX1NUQVJUOiB0YWdzLmNvbW1lbnRTdGFydCB8fCBDT01NRU5UX1NUQVJULFxuICAgICAgQ09NTUVOVF9FTkQ6IHRhZ3MuY29tbWVudEVuZCB8fCBDT01NRU5UX0VORFxuICAgIH07XG4gICAgdGhpcy50cmltQmxvY2tzID0gISFvcHRzLnRyaW1CbG9ja3M7XG4gICAgdGhpcy5sc3RyaXBCbG9ja3MgPSAhIW9wdHMubHN0cmlwQmxvY2tzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFRva2VuaXplci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLm5leHRUb2tlbiA9IGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcbiAgICB2YXIgbGluZW5vID0gdGhpcy5saW5lbm87XG4gICAgdmFyIGNvbG5vID0gdGhpcy5jb2xubztcbiAgICB2YXIgdG9rO1xuXG4gICAgaWYgKHRoaXMuaW5fY29kZSkge1xuICAgICAgLy8gT3RoZXJ3aXNlLCBpZiB3ZSBhcmUgaW4gYSBibG9jayBwYXJzZSBpdCBhcyBjb2RlXG4gICAgICB2YXIgY3VyID0gdGhpcy5jdXJyZW50KCk7XG5cbiAgICAgIGlmICh0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAvLyBXZSBoYXZlIG5vdGhpbmcgZWxzZSB0byBwYXJzZVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSBpZiAoY3VyID09PSAnXCInIHx8IGN1ciA9PT0gJ1xcJycpIHtcbiAgICAgICAgLy8gV2UndmUgaGl0IGEgc3RyaW5nXG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9TVFJJTkcsIHRoaXMuX3BhcnNlU3RyaW5nKGN1ciksIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmICh0b2sgPSB0aGlzLl9leHRyYWN0KHdoaXRlc3BhY2VDaGFycykpIHtcbiAgICAgICAgLy8gV2UgaGl0IHNvbWUgd2hpdGVzcGFjZVxuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fV0hJVEVTUEFDRSwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAoKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLkJMT0NLX0VORCkpIHx8ICh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKCctJyArIHRoaXMudGFncy5CTE9DS19FTkQpKSkge1xuICAgICAgICAvLyBTcGVjaWFsIGNoZWNrIGZvciB0aGUgYmxvY2sgZW5kIHRhZ1xuICAgICAgICAvL1xuICAgICAgICAvLyBJdCBpcyBhIHJlcXVpcmVtZW50IHRoYXQgc3RhcnQgYW5kIGVuZCB0YWdzIGFyZSBjb21wb3NlZCBvZlxuICAgICAgICAvLyBkZWxpbWl0ZXIgY2hhcmFjdGVycyAoJXt9W10gZXRjKSwgYW5kIG91ciBjb2RlIGFsd2F5c1xuICAgICAgICAvLyBicmVha3Mgb24gZGVsaW1pdGVycyBzbyB3ZSBjYW4gYXNzdW1lIHRoZSB0b2tlbiBwYXJzaW5nXG4gICAgICAgIC8vIGRvZXNuJ3QgY29uc3VtZSB0aGVzZSBlbHNld2hlcmVcbiAgICAgICAgdGhpcy5pbl9jb2RlID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpbUJsb2Nrcykge1xuICAgICAgICAgIGN1ciA9IHRoaXMuY3VycmVudCgpO1xuXG4gICAgICAgICAgaWYgKGN1ciA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgIC8vIFNraXAgbmV3bGluZVxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXIgPT09ICdcXHInKSB7XG4gICAgICAgICAgICAvLyBTa2lwIENSTEYgbmV3bGluZVxuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgICBjdXIgPSB0aGlzLmN1cnJlbnQoKTtcblxuICAgICAgICAgICAgaWYgKGN1ciA9PT0gJ1xcbicpIHtcbiAgICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBXYXMgbm90IGEgQ1JMRiwgc28gZ28gYmFja1xuICAgICAgICAgICAgICB0aGlzLmJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fQkxPQ0tfRU5ELCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmICgodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuVkFSSUFCTEVfRU5EKSkgfHwgKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcoJy0nICsgdGhpcy50YWdzLlZBUklBQkxFX0VORCkpKSB7XG4gICAgICAgIC8vIFNwZWNpYWwgY2hlY2sgZm9yIHZhcmlhYmxlIGVuZCB0YWcgKHNlZSBhYm92ZSlcbiAgICAgICAgdGhpcy5pbl9jb2RlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9WQVJJQUJMRV9FTkQsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKGN1ciA9PT0gJ3InICYmIHRoaXMuc3RyLmNoYXJBdCh0aGlzLmluZGV4ICsgMSkgPT09ICcvJykge1xuICAgICAgICAvLyBTa2lwIHBhc3QgJ3IvJy5cbiAgICAgICAgdGhpcy5mb3J3YXJkTigyKTsgLy8gRXh0cmFjdCB1bnRpbCB0aGUgZW5kIG9mIHRoZSByZWdleCAtLSAvIGVuZHMgaXQsIFxcLyBkb2VzIG5vdC5cblxuICAgICAgICB2YXIgcmVnZXhCb2R5ID0gJyc7XG5cbiAgICAgICAgd2hpbGUgKCF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQoKSA9PT0gJy8nICYmIHRoaXMucHJldmlvdXMoKSAhPT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZWdleEJvZHkgKz0gdGhpcy5jdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gLy8gQ2hlY2sgZm9yIGZsYWdzLlxuICAgICAgICAvLyBUaGUgcG9zc2libGUgZmxhZ3MgYXJlIGFjY29yZGluZyB0byBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9SZWdFeHApXG5cblxuICAgICAgICB2YXIgUE9TU0lCTEVfRkxBR1MgPSBbJ2cnLCAnaScsICdtJywgJ3knXTtcbiAgICAgICAgdmFyIHJlZ2V4RmxhZ3MgPSAnJztcblxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgdmFyIGlzQ3VycmVudEFGbGFnID0gUE9TU0lCTEVfRkxBR1MuaW5kZXhPZih0aGlzLmN1cnJlbnQoKSkgIT09IC0xO1xuXG4gICAgICAgICAgaWYgKGlzQ3VycmVudEFGbGFnKSB7XG4gICAgICAgICAgICByZWdleEZsYWdzICs9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9SRUdFWCwge1xuICAgICAgICAgIGJvZHk6IHJlZ2V4Qm9keSxcbiAgICAgICAgICBmbGFnczogcmVnZXhGbGFnc1xuICAgICAgICB9LCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVsaW1DaGFycy5pbmRleE9mKGN1cikgIT09IC0xKSB7XG4gICAgICAgIC8vIFdlJ3ZlIGhpdCBhIGRlbGltaXRlciAoYSBzcGVjaWFsIGNoYXIgbGlrZSBhIGJyYWNrZXQpXG4gICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICB2YXIgY29tcGxleE9wcyA9IFsnPT0nLCAnPT09JywgJyE9JywgJyE9PScsICc8PScsICc+PScsICcvLycsICcqKiddO1xuICAgICAgICB2YXIgY3VyQ29tcGxleCA9IGN1ciArIHRoaXMuY3VycmVudCgpO1xuICAgICAgICB2YXIgdHlwZTtcblxuICAgICAgICBpZiAobGliLmluZGV4T2YoY29tcGxleE9wcywgY3VyQ29tcGxleCkgIT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgY3VyID0gY3VyQ29tcGxleDsgLy8gU2VlIGlmIHRoaXMgaXMgYSBzdHJpY3QgZXF1YWxpdHkvaW5lcXVhbGl0eSBjb21wYXJhdG9yXG5cbiAgICAgICAgICBpZiAobGliLmluZGV4T2YoY29tcGxleE9wcywgY3VyQ29tcGxleCArIHRoaXMuY3VycmVudCgpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGN1ciA9IGN1ckNvbXBsZXggKyB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoY3VyKSB7XG4gICAgICAgICAgY2FzZSAnKCc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fTEVGVF9QQVJFTjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fUklHSFRfUEFSRU47XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ1snOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0xFRlRfQlJBQ0tFVDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnXSc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fUklHSFRfQlJBQ0tFVDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAneyc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fTEVGVF9DVVJMWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnfSc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fUklHSFRfQ1VSTFk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJywnOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0NPTU1BO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICc6JzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9DT0xPTjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnfic6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fVElMREU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3wnOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX1BJUEU7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fT1BFUkFUT1I7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4odHlwZSwgY3VyLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlIGFyZSBub3QgYXQgd2hpdGVzcGFjZSBvciBhIGRlbGltaXRlciwgc28gZXh0cmFjdCB0aGVcbiAgICAgICAgLy8gdGV4dCBhbmQgcGFyc2UgaXRcbiAgICAgICAgdG9rID0gdGhpcy5fZXh0cmFjdFVudGlsKHdoaXRlc3BhY2VDaGFycyArIGRlbGltQ2hhcnMpO1xuXG4gICAgICAgIGlmICh0b2subWF0Y2goL15bLStdP1swLTldKyQvKSkge1xuICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnQoKSA9PT0gJy4nKSB7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcblxuICAgICAgICAgICAgdmFyIGRlYyA9IHRoaXMuX2V4dHJhY3QoaW50Q2hhcnMpO1xuXG4gICAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fRkxPQVQsIHRvayArICcuJyArIGRlYywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9JTlQsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRvay5tYXRjaCgvXih0cnVlfGZhbHNlKSQvKSkge1xuICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9CT09MRUFOLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgICB9IGVsc2UgaWYgKHRvayA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX05PTkUsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiBBZGRlZCB0byBtYWtlIHRoZSB0ZXN0IGBudWxsIGlzIG51bGxgIGV2YWx1YXRlIHRydXRoaWx5LlxuICAgICAgICAgICAqIE90aGVyd2lzZSwgTnVuanVja3Mgd2lsbCBsb29rIHVwIG51bGwgaW4gdGhlIGNvbnRleHQgYW5kXG4gICAgICAgICAgICogcmV0dXJuIGB1bmRlZmluZWRgLCB3aGljaCBpcyBub3Qgd2hhdCB3ZSB3YW50LiBUaGlzICptYXkqIGhhdmVcbiAgICAgICAgICAgKiBjb25zZXF1ZW5jZXMgaXMgc29tZW9uZSBpcyB1c2luZyBudWxsIGluIHRoZWlyIHRlbXBsYXRlcyBhcyBhXG4gICAgICAgICAgICogdmFyaWFibGUuXG4gICAgICAgICAgICovXG4gICAgICAgIH0gZWxzZSBpZiAodG9rID09PSAnbnVsbCcpIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fTk9ORSwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgfSBlbHNlIGlmICh0b2spIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fU1lNQk9MLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCB2YWx1ZSB3aGlsZSBwYXJzaW5nOiAnICsgdG9rKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBQYXJzZSBvdXQgdGhlIHRlbXBsYXRlIHRleHQsIGJyZWFraW5nIG9uIHRhZ1xuICAgICAgLy8gZGVsaW1pdGVycyBiZWNhdXNlIHdlIG5lZWQgdG8gbG9vayBmb3IgYmxvY2svdmFyaWFibGUgc3RhcnRcbiAgICAgIC8vIHRhZ3MgKGRvbid0IHVzZSB0aGUgZnVsbCBkZWxpbUNoYXJzIGZvciBvcHRpbWl6YXRpb24pXG4gICAgICB2YXIgYmVnaW5DaGFycyA9IHRoaXMudGFncy5CTE9DS19TVEFSVC5jaGFyQXQoMCkgKyB0aGlzLnRhZ3MuVkFSSUFCTEVfU1RBUlQuY2hhckF0KDApICsgdGhpcy50YWdzLkNPTU1FTlRfU1RBUlQuY2hhckF0KDApICsgdGhpcy50YWdzLkNPTU1FTlRfRU5ELmNoYXJBdCgwKTtcblxuICAgICAgaWYgKHRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmICgodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuQkxPQ0tfU1RBUlQgKyAnLScpKSB8fCAodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuQkxPQ0tfU1RBUlQpKSkge1xuICAgICAgICB0aGlzLmluX2NvZGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fQkxPQ0tfU1RBUlQsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKCh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5WQVJJQUJMRV9TVEFSVCArICctJykpIHx8ICh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5WQVJJQUJMRV9TVEFSVCkpKSB7XG4gICAgICAgIHRoaXMuaW5fY29kZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9WQVJJQUJMRV9TVEFSVCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRvayA9ICcnO1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdmFyIGluQ29tbWVudCA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5DT01NRU5UX1NUQVJUKSkge1xuICAgICAgICAgIGluQ29tbWVudCA9IHRydWU7XG4gICAgICAgICAgdG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuQ09NTUVOVF9TVEFSVCk7XG4gICAgICAgIH0gLy8gQ29udGludWFsbHkgY29uc3VtZSB0ZXh0LCBicmVha2luZyBvbiB0aGUgdGFnIGRlbGltaXRlclxuICAgICAgICAvLyBjaGFyYWN0ZXJzIGFuZCBjaGVja2luZyB0byBzZWUgaWYgaXQncyBhIHN0YXJ0IHRhZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gV2UgY291bGQgaGl0IHRoZSBlbmQgb2YgdGhlIHRlbXBsYXRlIGluIHRoZSBtaWRkbGUgb2ZcbiAgICAgICAgLy8gb3VyIGxvb3BpbmcsIHNvIGNoZWNrIGZvciB0aGUgbnVsbCByZXR1cm4gdmFsdWUgZnJvbVxuICAgICAgICAvLyBfZXh0cmFjdFVudGlsXG5cblxuICAgICAgICB3aGlsZSAoKGRhdGEgPSB0aGlzLl9leHRyYWN0VW50aWwoYmVnaW5DaGFycykpICE9PSBudWxsKSB7XG4gICAgICAgICAgdG9rICs9IGRhdGE7XG5cbiAgICAgICAgICBpZiAoKHRoaXMuX21hdGNoZXModGhpcy50YWdzLkJMT0NLX1NUQVJUKSB8fCB0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5WQVJJQUJMRV9TVEFSVCkgfHwgdGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuQ09NTUVOVF9TVEFSVCkpICYmICFpbkNvbW1lbnQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxzdHJpcEJsb2NrcyAmJiB0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5CTE9DS19TVEFSVCkgJiYgdGhpcy5jb2xubyA+IDAgJiYgdGhpcy5jb2xubyA8PSB0b2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHZhciBsYXN0TGluZSA9IHRvay5zbGljZSgtdGhpcy5jb2xubyk7XG5cbiAgICAgICAgICAgICAgaWYgKC9eXFxzKyQvLnRlc3QobGFzdExpbmUpKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGJsb2NrIGxlYWRpbmcgd2hpdGVzcGFjZSBmcm9tIGJlZ2lubmluZyBvZiB0aGUgc3RyaW5nXG4gICAgICAgICAgICAgICAgdG9rID0gdG9rLnNsaWNlKDAsIC10aGlzLmNvbG5vKTtcblxuICAgICAgICAgICAgICAgIGlmICghdG9rLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgLy8gQWxsIGRhdGEgcmVtb3ZlZCwgY29sbGFwc2UgdG8gYXZvaWQgdW5uZWNlc3Nhcnkgbm9kZXNcbiAgICAgICAgICAgICAgICAgIC8vIGJ5IHJldHVybmluZyBuZXh0IHRva2VuIChibG9jayBzdGFydClcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLyBJZiBpdCBpcyBhIHN0YXJ0IHRhZywgc3RvcCBsb29waW5nXG5cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5DT01NRU5UX0VORCkpIHtcbiAgICAgICAgICAgIGlmICghaW5Db21tZW50KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCBlbmQgb2YgY29tbWVudCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b2sgKz0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuQ09NTUVOVF9FTkQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0IGRvZXMgbm90IG1hdGNoIGFueSB0YWcsIHNvIGFkZCB0aGUgY2hhcmFjdGVyIGFuZFxuICAgICAgICAgICAgLy8gY2Fycnkgb25cbiAgICAgICAgICAgIHRvayArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkYXRhID09PSBudWxsICYmIGluQ29tbWVudCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZXhwZWN0ZWQgZW5kIG9mIGNvbW1lbnQsIGdvdCBlbmQgb2YgZmlsZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuKGluQ29tbWVudCA/IFRPS0VOX0NPTU1FTlQgOiBUT0tFTl9EQVRBLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uX3BhcnNlU3RyaW5nID0gZnVuY3Rpb24gX3BhcnNlU3RyaW5nKGRlbGltaXRlcikge1xuICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgIHZhciBzdHIgPSAnJztcblxuICAgIHdoaWxlICghdGhpcy5pc0ZpbmlzaGVkKCkgJiYgdGhpcy5jdXJyZW50KCkgIT09IGRlbGltaXRlcikge1xuICAgICAgdmFyIGN1ciA9IHRoaXMuY3VycmVudCgpO1xuXG4gICAgICBpZiAoY3VyID09PSAnXFxcXCcpIHtcbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmN1cnJlbnQoKSkge1xuICAgICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgc3RyICs9ICdcXG4nO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgIHN0ciArPSAnXFx0JztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAncic6XG4gICAgICAgICAgICBzdHIgKz0gJ1xccic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzdHIgKz0gdGhpcy5jdXJyZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ciArPSBjdXI7XG4gICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgIHJldHVybiBzdHI7XG4gIH07XG5cbiAgX3Byb3RvLl9tYXRjaGVzID0gZnVuY3Rpb24gX21hdGNoZXMoc3RyKSB7XG4gICAgaWYgKHRoaXMuaW5kZXggKyBzdHIubGVuZ3RoID4gdGhpcy5sZW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBtID0gdGhpcy5zdHIuc2xpY2UodGhpcy5pbmRleCwgdGhpcy5pbmRleCArIHN0ci5sZW5ndGgpO1xuICAgIHJldHVybiBtID09PSBzdHI7XG4gIH07XG5cbiAgX3Byb3RvLl9leHRyYWN0U3RyaW5nID0gZnVuY3Rpb24gX2V4dHJhY3RTdHJpbmcoc3RyKSB7XG4gICAgaWYgKHRoaXMuX21hdGNoZXMoc3RyKSkge1xuICAgICAgdGhpcy5mb3J3YXJkTihzdHIubGVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgX3Byb3RvLl9leHRyYWN0VW50aWwgPSBmdW5jdGlvbiBfZXh0cmFjdFVudGlsKGNoYXJTdHJpbmcpIHtcbiAgICAvLyBFeHRyYWN0IGFsbCBub24tbWF0Y2hpbmcgY2hhcnMsIHdpdGggdGhlIGRlZmF1bHQgbWF0Y2hpbmcgc2V0XG4gICAgLy8gdG8gZXZlcnl0aGluZ1xuICAgIHJldHVybiB0aGlzLl9leHRyYWN0TWF0Y2hpbmcodHJ1ZSwgY2hhclN0cmluZyB8fCAnJyk7XG4gIH07XG5cbiAgX3Byb3RvLl9leHRyYWN0ID0gZnVuY3Rpb24gX2V4dHJhY3QoY2hhclN0cmluZykge1xuICAgIC8vIEV4dHJhY3QgYWxsIG1hdGNoaW5nIGNoYXJzIChubyBkZWZhdWx0LCBzbyBjaGFyU3RyaW5nIG11c3QgYmVcbiAgICAvLyBleHBsaWNpdClcbiAgICByZXR1cm4gdGhpcy5fZXh0cmFjdE1hdGNoaW5nKGZhbHNlLCBjaGFyU3RyaW5nKTtcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RNYXRjaGluZyA9IGZ1bmN0aW9uIF9leHRyYWN0TWF0Y2hpbmcoYnJlYWtPbk1hdGNoLCBjaGFyU3RyaW5nKSB7XG4gICAgLy8gUHVsbCBvdXQgY2hhcmFjdGVycyB1bnRpbCBhIGJyZWFraW5nIGNoYXIgaXMgaGl0LlxuICAgIC8vIElmIGJyZWFrT25NYXRjaCBpcyBmYWxzZSwgYSBub24tbWF0Y2hpbmcgY2hhciBzdG9wcyBpdC5cbiAgICAvLyBJZiBicmVha09uTWF0Y2ggaXMgdHJ1ZSwgYSBtYXRjaGluZyBjaGFyIHN0b3BzIGl0LlxuICAgIGlmICh0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIGZpcnN0ID0gY2hhclN0cmluZy5pbmRleE9mKHRoaXMuY3VycmVudCgpKTsgLy8gT25seSBwcm9jZWVkIGlmIHRoZSBmaXJzdCBjaGFyYWN0ZXIgZG9lc24ndCBtZWV0IG91ciBjb25kaXRpb25cblxuICAgIGlmIChicmVha09uTWF0Y2ggJiYgZmlyc3QgPT09IC0xIHx8ICFicmVha09uTWF0Y2ggJiYgZmlyc3QgIT09IC0xKSB7XG4gICAgICB2YXIgdCA9IHRoaXMuY3VycmVudCgpO1xuICAgICAgdGhpcy5mb3J3YXJkKCk7IC8vIEFuZCBwdWxsIG91dCBhbGwgdGhlIGNoYXJzIG9uZSBhdCBhIHRpbWUgdW50aWwgd2UgaGl0IGFcbiAgICAgIC8vIGJyZWFraW5nIGNoYXJcblxuICAgICAgdmFyIGlkeCA9IGNoYXJTdHJpbmcuaW5kZXhPZih0aGlzLmN1cnJlbnQoKSk7XG5cbiAgICAgIHdoaWxlICgoYnJlYWtPbk1hdGNoICYmIGlkeCA9PT0gLTEgfHwgIWJyZWFrT25NYXRjaCAmJiBpZHggIT09IC0xKSAmJiAhdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgdCArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgIGlkeCA9IGNoYXJTdHJpbmcuaW5kZXhPZih0aGlzLmN1cnJlbnQoKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0O1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RSZWdleCA9IGZ1bmN0aW9uIF9leHRyYWN0UmVnZXgocmVnZXgpIHtcbiAgICB2YXIgbWF0Y2hlcyA9IHRoaXMuY3VycmVudFN0cigpLm1hdGNoKHJlZ2V4KTtcblxuICAgIGlmICghbWF0Y2hlcykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSAvLyBNb3ZlIGZvcndhcmQgd2hhdGV2ZXIgd2FzIG1hdGNoZWRcblxuXG4gICAgdGhpcy5mb3J3YXJkTihtYXRjaGVzWzBdLmxlbmd0aCk7XG4gICAgcmV0dXJuIG1hdGNoZXM7XG4gIH07XG5cbiAgX3Byb3RvLmlzRmluaXNoZWQgPSBmdW5jdGlvbiBpc0ZpbmlzaGVkKCkge1xuICAgIHJldHVybiB0aGlzLmluZGV4ID49IHRoaXMubGVuO1xuICB9O1xuXG4gIF9wcm90by5mb3J3YXJkTiA9IGZ1bmN0aW9uIGZvcndhcmROKG4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5mb3J3YXJkID0gZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICB0aGlzLmluZGV4Kys7XG5cbiAgICBpZiAodGhpcy5wcmV2aW91cygpID09PSAnXFxuJykge1xuICAgICAgdGhpcy5saW5lbm8rKztcbiAgICAgIHRoaXMuY29sbm8gPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbG5vKys7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5iYWNrTiA9IGZ1bmN0aW9uIGJhY2tOKG4pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgdGhpcy5iYWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5iYWNrID0gZnVuY3Rpb24gYmFjaygpIHtcbiAgICB0aGlzLmluZGV4LS07XG5cbiAgICBpZiAodGhpcy5jdXJyZW50KCkgPT09ICdcXG4nKSB7XG4gICAgICB0aGlzLmxpbmVuby0tO1xuICAgICAgdmFyIGlkeCA9IHRoaXMuc3JjLmxhc3RJbmRleE9mKCdcXG4nLCB0aGlzLmluZGV4IC0gMSk7XG5cbiAgICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICAgIHRoaXMuY29sbm8gPSB0aGlzLmluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb2xubyA9IHRoaXMuaW5kZXggLSBpZHg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbm8tLTtcbiAgICB9XG4gIH0gLy8gY3VycmVudCByZXR1cm5zIGN1cnJlbnQgY2hhcmFjdGVyXG4gIDtcblxuICBfcHJvdG8uY3VycmVudCA9IGZ1bmN0aW9uIGN1cnJlbnQoKSB7XG4gICAgaWYgKCF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RyLmNoYXJBdCh0aGlzLmluZGV4KTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH0gLy8gY3VycmVudFN0ciByZXR1cm5zIHdoYXQncyBsZWZ0IG9mIHRoZSB1bnBhcnNlZCBzdHJpbmdcbiAgO1xuXG4gIF9wcm90by5jdXJyZW50U3RyID0gZnVuY3Rpb24gY3VycmVudFN0cigpIHtcbiAgICBpZiAoIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHIuc3Vic3RyKHRoaXMuaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfTtcblxuICBfcHJvdG8ucHJldmlvdXMgPSBmdW5jdGlvbiBwcmV2aW91cygpIHtcbiAgICByZXR1cm4gdGhpcy5zdHIuY2hhckF0KHRoaXMuaW5kZXggLSAxKTtcbiAgfTtcblxuICByZXR1cm4gVG9rZW5pemVyO1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGV4OiBmdW5jdGlvbiBsZXgoc3JjLCBvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoc3JjLCBvcHRzKTtcbiAgfSxcbiAgVE9LRU5fU1RSSU5HOiBUT0tFTl9TVFJJTkcsXG4gIFRPS0VOX1dISVRFU1BBQ0U6IFRPS0VOX1dISVRFU1BBQ0UsXG4gIFRPS0VOX0RBVEE6IFRPS0VOX0RBVEEsXG4gIFRPS0VOX0JMT0NLX1NUQVJUOiBUT0tFTl9CTE9DS19TVEFSVCxcbiAgVE9LRU5fQkxPQ0tfRU5EOiBUT0tFTl9CTE9DS19FTkQsXG4gIFRPS0VOX1ZBUklBQkxFX1NUQVJUOiBUT0tFTl9WQVJJQUJMRV9TVEFSVCxcbiAgVE9LRU5fVkFSSUFCTEVfRU5EOiBUT0tFTl9WQVJJQUJMRV9FTkQsXG4gIFRPS0VOX0NPTU1FTlQ6IFRPS0VOX0NPTU1FTlQsXG4gIFRPS0VOX0xFRlRfUEFSRU46IFRPS0VOX0xFRlRfUEFSRU4sXG4gIFRPS0VOX1JJR0hUX1BBUkVOOiBUT0tFTl9SSUdIVF9QQVJFTixcbiAgVE9LRU5fTEVGVF9CUkFDS0VUOiBUT0tFTl9MRUZUX0JSQUNLRVQsXG4gIFRPS0VOX1JJR0hUX0JSQUNLRVQ6IFRPS0VOX1JJR0hUX0JSQUNLRVQsXG4gIFRPS0VOX0xFRlRfQ1VSTFk6IFRPS0VOX0xFRlRfQ1VSTFksXG4gIFRPS0VOX1JJR0hUX0NVUkxZOiBUT0tFTl9SSUdIVF9DVVJMWSxcbiAgVE9LRU5fT1BFUkFUT1I6IFRPS0VOX09QRVJBVE9SLFxuICBUT0tFTl9DT01NQTogVE9LRU5fQ09NTUEsXG4gIFRPS0VOX0NPTE9OOiBUT0tFTl9DT0xPTixcbiAgVE9LRU5fVElMREU6IFRPS0VOX1RJTERFLFxuICBUT0tFTl9QSVBFOiBUT0tFTl9QSVBFLFxuICBUT0tFTl9JTlQ6IFRPS0VOX0lOVCxcbiAgVE9LRU5fRkxPQVQ6IFRPS0VOX0ZMT0FULFxuICBUT0tFTl9CT09MRUFOOiBUT0tFTl9CT09MRUFOLFxuICBUT0tFTl9OT05FOiBUT0tFTl9OT05FLFxuICBUT0tFTl9TWU1CT0w6IFRPS0VOX1NZTUJPTCxcbiAgVE9LRU5fU1BFQ0lBTDogVE9LRU5fU1BFQ0lBTCxcbiAgVE9LRU5fUkVHRVg6IFRPS0VOX1JFR0VYXG59O1xuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgTG9hZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSksXG4gICAgUHJlY29tcGlsZWRMb2FkZXIgPSBfcmVxdWlyZS5QcmVjb21waWxlZExvYWRlcjtcblxudmFyIFdlYkxvYWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xvYWRlcikge1xuICBfaW5oZXJpdHNMb29zZShXZWJMb2FkZXIsIF9Mb2FkZXIpO1xuXG4gIGZ1bmN0aW9uIFdlYkxvYWRlcihiYXNlVVJMLCBvcHRzKSB7XG4gICAgdmFyIF90aGlzO1xuXG4gICAgX3RoaXMgPSBfTG9hZGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICBfdGhpcy5iYXNlVVJMID0gYmFzZVVSTCB8fCAnLic7XG4gICAgb3B0cyA9IG9wdHMgfHwge307IC8vIEJ5IGRlZmF1bHQsIHRoZSBjYWNoZSBpcyB0dXJuZWQgb2ZmIGJlY2F1c2UgdGhlcmUncyBubyB3YXlcbiAgICAvLyB0byBcIndhdGNoXCIgdGVtcGxhdGVzIG92ZXIgSFRUUCwgc28gdGhleSBhcmUgcmUtZG93bmxvYWRlZFxuICAgIC8vIGFuZCBjb21waWxlZCBlYWNoIHRpbWUuIChSZW1lbWJlciwgUFJFQ09NUElMRSBZT1VSXG4gICAgLy8gVEVNUExBVEVTIGluIHByb2R1Y3Rpb24hKVxuXG4gICAgX3RoaXMudXNlQ2FjaGUgPSAhIW9wdHMudXNlQ2FjaGU7IC8vIFdlIGRlZmF1bHQgYGFzeW5jYCB0byBmYWxzZSBzbyB0aGF0IHRoZSBzaW1wbGUgc3luY2hyb25vdXNcbiAgICAvLyBBUEkgY2FuIGJlIHVzZWQgd2hlbiB5b3UgYXJlbid0IGRvaW5nIGFueXRoaW5nIGFzeW5jIGluXG4gICAgLy8geW91ciB0ZW1wbGF0ZXMgKHdoaWNoIGlzIG1vc3Qgb2YgdGhlIHRpbWUpLiBUaGlzIHBlcmZvcm1zIGFcbiAgICAvLyBzeW5jIGFqYXggcmVxdWVzdCwgYnV0IHRoYXQncyBvayBiZWNhdXNlIGl0IHNob3VsZCAqb25seSpcbiAgICAvLyBoYXBwZW4gaW4gZGV2ZWxvcG1lbnQuIFBSRUNPTVBJTEUgWU9VUiBURU1QTEFURVMuXG5cbiAgICBfdGhpcy5hc3luYyA9ICEhb3B0cy5hc3luYztcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gV2ViTG9hZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUoZnJvbSwgdG8pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbGF0aXZlIHRlbXBsYXRlcyBub3Qgc3VwcG9ydCBpbiB0aGUgYnJvd3NlciB5ZXQnKTtcbiAgfTtcblxuICBfcHJvdG8uZ2V0U291cmNlID0gZnVuY3Rpb24gZ2V0U291cmNlKG5hbWUsIGNiKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgdXNlQ2FjaGUgPSB0aGlzLnVzZUNhY2hlO1xuICAgIHZhciByZXN1bHQ7XG4gICAgdGhpcy5mZXRjaCh0aGlzLmJhc2VVUkwgKyAnLycgKyBuYW1lLCBmdW5jdGlvbiAoZXJyLCBzcmMpIHtcbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgY2IoZXJyLmNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKGVyci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZXJyLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICBwYXRoOiBuYW1lLFxuICAgICAgICAgIG5vQ2FjaGU6ICF1c2VDYWNoZVxuICAgICAgICB9O1xuXG4gICAgICAgIF90aGlzMi5lbWl0KCdsb2FkJywgbmFtZSwgcmVzdWx0KTtcblxuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYihudWxsLCByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7IC8vIGlmIHRoaXMgV2ViTG9hZGVyIGlzbid0IHJ1bm5pbmcgYXN5bmNocm9ub3VzbHksIHRoZVxuICAgIC8vIGZldGNoIGFib3ZlIHdvdWxkIGFjdHVhbGx5IHJ1biBzeW5jIGFuZCB3ZSdsbCBoYXZlIGFcbiAgICAvLyByZXN1bHQgaGVyZVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICBfcHJvdG8uZmV0Y2ggPSBmdW5jdGlvbiBmZXRjaCh1cmwsIGNiKSB7XG4gICAgLy8gT25seSBpbiB0aGUgYnJvd3NlciBwbGVhc2VcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViTG9hZGVyIGNhbiBvbmx5IGJ5IHVzZWQgaW4gYSBicm93c2VyJyk7XG4gICAgfVxuXG4gICAgdmFyIGFqYXggPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZGluZyA9IHRydWU7XG5cbiAgICBhamF4Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChhamF4LnJlYWR5U3RhdGUgPT09IDQgJiYgbG9hZGluZykge1xuICAgICAgICBsb2FkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGFqYXguc3RhdHVzID09PSAwIHx8IGFqYXguc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICBjYihudWxsLCBhamF4LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2Ioe1xuICAgICAgICAgICAgc3RhdHVzOiBhamF4LnN0YXR1cyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGFqYXgucmVzcG9uc2VUZXh0XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyAncz0nICsgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgYWpheC5vcGVuKCdHRVQnLCB1cmwsIHRoaXMuYXN5bmMpO1xuICAgIGFqYXguc2VuZCgpO1xuICB9O1xuXG4gIHJldHVybiBXZWJMb2FkZXI7XG59KExvYWRlcik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBXZWJMb2FkZXI6IFdlYkxvYWRlcixcbiAgUHJlY29tcGlsZWRMb2FkZXI6IFByZWNvbXBpbGVkTG9hZGVyXG59O1xuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLFxuICAgIEVudmlyb25tZW50ID0gX3JlcXVpcmUuRW52aXJvbm1lbnQsXG4gICAgVGVtcGxhdGUgPSBfcmVxdWlyZS5UZW1wbGF0ZTtcblxudmFyIExvYWRlciA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cbnZhciBsb2FkZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMCk7XG5cbnZhciBwcmVjb21waWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMyk7XG5cbnZhciBjb21waWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBwYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG52YXIgbGV4ZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXG52YXIgcnVudGltZSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5cbnZhciBub2RlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBpbnN0YWxsSmluamFDb21wYXQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI1KTsgLy8gQSBzaW5nbGUgaW5zdGFuY2Ugb2YgYW4gZW52aXJvbm1lbnQsIHNpbmNlIHRoaXMgaXMgc28gY29tbW9ubHkgdXNlZFxuXG5cbnZhciBlO1xuXG5mdW5jdGlvbiBjb25maWd1cmUodGVtcGxhdGVzUGF0aCwgb3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAobGliLmlzT2JqZWN0KHRlbXBsYXRlc1BhdGgpKSB7XG4gICAgb3B0cyA9IHRlbXBsYXRlc1BhdGg7XG4gICAgdGVtcGxhdGVzUGF0aCA9IG51bGw7XG4gIH1cblxuICB2YXIgVGVtcGxhdGVMb2FkZXI7XG5cbiAgaWYgKGxvYWRlcnMuRmlsZVN5c3RlbUxvYWRlcikge1xuICAgIFRlbXBsYXRlTG9hZGVyID0gbmV3IGxvYWRlcnMuRmlsZVN5c3RlbUxvYWRlcih0ZW1wbGF0ZXNQYXRoLCB7XG4gICAgICB3YXRjaDogb3B0cy53YXRjaCxcbiAgICAgIG5vQ2FjaGU6IG9wdHMubm9DYWNoZVxuICAgIH0pO1xuICB9IGVsc2UgaWYgKGxvYWRlcnMuV2ViTG9hZGVyKSB7XG4gICAgVGVtcGxhdGVMb2FkZXIgPSBuZXcgbG9hZGVycy5XZWJMb2FkZXIodGVtcGxhdGVzUGF0aCwge1xuICAgICAgdXNlQ2FjaGU6IG9wdHMud2ViICYmIG9wdHMud2ViLnVzZUNhY2hlLFxuICAgICAgYXN5bmM6IG9wdHMud2ViICYmIG9wdHMud2ViLmFzeW5jXG4gICAgfSk7XG4gIH1cblxuICBlID0gbmV3IEVudmlyb25tZW50KFRlbXBsYXRlTG9hZGVyLCBvcHRzKTtcblxuICBpZiAob3B0cyAmJiBvcHRzLmV4cHJlc3MpIHtcbiAgICBlLmV4cHJlc3Mob3B0cy5leHByZXNzKTtcbiAgfVxuXG4gIHJldHVybiBlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRW52aXJvbm1lbnQ6IEVudmlyb25tZW50LFxuICBUZW1wbGF0ZTogVGVtcGxhdGUsXG4gIExvYWRlcjogTG9hZGVyLFxuICBGaWxlU3lzdGVtTG9hZGVyOiBsb2FkZXJzLkZpbGVTeXN0ZW1Mb2FkZXIsXG4gIE5vZGVSZXNvbHZlTG9hZGVyOiBsb2FkZXJzLk5vZGVSZXNvbHZlTG9hZGVyLFxuICBQcmVjb21waWxlZExvYWRlcjogbG9hZGVycy5QcmVjb21waWxlZExvYWRlcixcbiAgV2ViTG9hZGVyOiBsb2FkZXJzLldlYkxvYWRlcixcbiAgY29tcGlsZXI6IGNvbXBpbGVyLFxuICBwYXJzZXI6IHBhcnNlcixcbiAgbGV4ZXI6IGxleGVyLFxuICBydW50aW1lOiBydW50aW1lLFxuICBsaWI6IGxpYixcbiAgbm9kZXM6IG5vZGVzLFxuICBpbnN0YWxsSmluamFDb21wYXQ6IGluc3RhbGxKaW5qYUNvbXBhdCxcbiAgY29uZmlndXJlOiBjb25maWd1cmUsXG4gIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBlID0gdW5kZWZpbmVkO1xuICB9LFxuICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKHNyYywgZW52LCBwYXRoLCBlYWdlckNvbXBpbGUpIHtcbiAgICBpZiAoIWUpIHtcbiAgICAgIGNvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgVGVtcGxhdGUoc3JjLCBlbnYsIHBhdGgsIGVhZ2VyQ29tcGlsZSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKG5hbWUsIGN0eCwgY2IpIHtcbiAgICBpZiAoIWUpIHtcbiAgICAgIGNvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBlLnJlbmRlcihuYW1lLCBjdHgsIGNiKTtcbiAgfSxcbiAgcmVuZGVyU3RyaW5nOiBmdW5jdGlvbiByZW5kZXJTdHJpbmcoc3JjLCBjdHgsIGNiKSB7XG4gICAgaWYgKCFlKSB7XG4gICAgICBjb25maWd1cmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZS5yZW5kZXJTdHJpbmcoc3JjLCBjdHgsIGNiKTtcbiAgfSxcbiAgcHJlY29tcGlsZTogcHJlY29tcGlsZSA/IHByZWNvbXBpbGUucHJlY29tcGlsZSA6IHVuZGVmaW5lZCxcbiAgcHJlY29tcGlsZVN0cmluZzogcHJlY29tcGlsZSA/IHByZWNvbXBpbGUucHJlY29tcGlsZVN0cmluZyA6IHVuZGVmaW5lZFxufTtcblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG4vLyByYXdBc2FwIHByb3ZpZGVzIGV2ZXJ5dGhpbmcgd2UgbmVlZCBleGNlcHQgZXhjZXB0aW9uIG1hbmFnZW1lbnQuXG52YXIgcmF3QXNhcCA9IF9fd2VicGFja19yZXF1aXJlX18oMTMpO1xuLy8gUmF3VGFza3MgYXJlIHJlY3ljbGVkIHRvIHJlZHVjZSBHQyBjaHVybi5cbnZhciBmcmVlVGFza3MgPSBbXTtcbi8vIFdlIHF1ZXVlIGVycm9ycyB0byBlbnN1cmUgdGhleSBhcmUgdGhyb3duIGluIHJpZ2h0IG9yZGVyIChGSUZPKS5cbi8vIEFycmF5LWFzLXF1ZXVlIGlzIGdvb2QgZW5vdWdoIGhlcmUsIHNpbmNlIHdlIGFyZSBqdXN0IGRlYWxpbmcgd2l0aCBleGNlcHRpb25zLlxudmFyIHBlbmRpbmdFcnJvcnMgPSBbXTtcbnZhciByZXF1ZXN0RXJyb3JUaHJvdyA9IHJhd0FzYXAubWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKHRocm93Rmlyc3RFcnJvcik7XG5cbmZ1bmN0aW9uIHRocm93Rmlyc3RFcnJvcigpIHtcbiAgICBpZiAocGVuZGluZ0Vycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgcGVuZGluZ0Vycm9ycy5zaGlmdCgpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDYWxscyBhIHRhc2sgYXMgc29vbiBhcyBwb3NzaWJsZSBhZnRlciByZXR1cm5pbmcsIGluIGl0cyBvd24gZXZlbnQsIHdpdGggcHJpb3JpdHlcbiAqIG92ZXIgb3RoZXIgZXZlbnRzIGxpa2UgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZXBhaW50LiBBbiBlcnJvciB0aHJvd24gZnJvbSBhblxuICogZXZlbnQgd2lsbCBub3QgaW50ZXJydXB0LCBub3IgZXZlbiBzdWJzdGFudGlhbGx5IHNsb3cgZG93biB0aGUgcHJvY2Vzc2luZyBvZlxuICogb3RoZXIgZXZlbnRzLCBidXQgd2lsbCBiZSByYXRoZXIgcG9zdHBvbmVkIHRvIGEgbG93ZXIgcHJpb3JpdHkgZXZlbnQuXG4gKiBAcGFyYW0ge3tjYWxsfX0gdGFzayBBIGNhbGxhYmxlIG9iamVjdCwgdHlwaWNhbGx5IGEgZnVuY3Rpb24gdGhhdCB0YWtlcyBub1xuICogYXJndW1lbnRzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFzYXA7XG5mdW5jdGlvbiBhc2FwKHRhc2spIHtcbiAgICB2YXIgcmF3VGFzaztcbiAgICBpZiAoZnJlZVRhc2tzLmxlbmd0aCkge1xuICAgICAgICByYXdUYXNrID0gZnJlZVRhc2tzLnBvcCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJhd1Rhc2sgPSBuZXcgUmF3VGFzaygpO1xuICAgIH1cbiAgICByYXdUYXNrLnRhc2sgPSB0YXNrO1xuICAgIHJhd0FzYXAocmF3VGFzayk7XG59XG5cbi8vIFdlIHdyYXAgdGFza3Mgd2l0aCByZWN5Y2xhYmxlIHRhc2sgb2JqZWN0cy4gIEEgdGFzayBvYmplY3QgaW1wbGVtZW50c1xuLy8gYGNhbGxgLCBqdXN0IGxpa2UgYSBmdW5jdGlvbi5cbmZ1bmN0aW9uIFJhd1Rhc2soKSB7XG4gICAgdGhpcy50YXNrID0gbnVsbDtcbn1cblxuLy8gVGhlIHNvbGUgcHVycG9zZSBvZiB3cmFwcGluZyB0aGUgdGFzayBpcyB0byBjYXRjaCB0aGUgZXhjZXB0aW9uIGFuZCByZWN5Y2xlXG4vLyB0aGUgdGFzayBvYmplY3QgYWZ0ZXIgaXRzIHNpbmdsZSB1c2UuXG5SYXdUYXNrLnByb3RvdHlwZS5jYWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIHRoaXMudGFzay5jYWxsKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGFzYXAub25lcnJvcikge1xuICAgICAgICAgICAgLy8gVGhpcyBob29rIGV4aXN0cyBwdXJlbHkgZm9yIHRlc3RpbmcgcHVycG9zZXMuXG4gICAgICAgICAgICAvLyBJdHMgbmFtZSB3aWxsIGJlIHBlcmlvZGljYWxseSByYW5kb21pemVkIHRvIGJyZWFrIGFueSBjb2RlIHRoYXRcbiAgICAgICAgICAgIC8vIGRlcGVuZHMgb24gaXRzIGV4aXN0ZW5jZS5cbiAgICAgICAgICAgIGFzYXAub25lcnJvcihlcnJvcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbiBhIHdlYiBicm93c2VyLCBleGNlcHRpb25zIGFyZSBub3QgZmF0YWwuIEhvd2V2ZXIsIHRvIGF2b2lkXG4gICAgICAgICAgICAvLyBzbG93aW5nIGRvd24gdGhlIHF1ZXVlIG9mIHBlbmRpbmcgdGFza3MsIHdlIHJldGhyb3cgdGhlIGVycm9yIGluIGFcbiAgICAgICAgICAgIC8vIGxvd2VyIHByaW9yaXR5IHR1cm4uXG4gICAgICAgICAgICBwZW5kaW5nRXJyb3JzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgcmVxdWVzdEVycm9yVGhyb3coKTtcbiAgICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMudGFzayA9IG51bGw7XG4gICAgICAgIGZyZWVUYXNrc1tmcmVlVGFza3MubGVuZ3RoXSA9IHRoaXM7XG4gICAgfVxufTtcblxuXG4vKioqLyB9KSxcbi8qIDEzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuLyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkge1xuXG4vLyBVc2UgdGhlIGZhc3Rlc3QgbWVhbnMgcG9zc2libGUgdG8gZXhlY3V0ZSBhIHRhc2sgaW4gaXRzIG93biB0dXJuLCB3aXRoXG4vLyBwcmlvcml0eSBvdmVyIG90aGVyIGV2ZW50cyBpbmNsdWRpbmcgSU8sIGFuaW1hdGlvbiwgcmVmbG93LCBhbmQgcmVkcmF3XG4vLyBldmVudHMgaW4gYnJvd3NlcnMuXG4vL1xuLy8gQW4gZXhjZXB0aW9uIHRocm93biBieSBhIHRhc2sgd2lsbCBwZXJtYW5lbnRseSBpbnRlcnJ1cHQgdGhlIHByb2Nlc3Npbmcgb2Zcbi8vIHN1YnNlcXVlbnQgdGFza3MuIFRoZSBoaWdoZXIgbGV2ZWwgYGFzYXBgIGZ1bmN0aW9uIGVuc3VyZXMgdGhhdCBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93biBieSBhIHRhc2ssIHRoYXQgdGhlIHRhc2sgcXVldWUgd2lsbCBjb250aW51ZSBmbHVzaGluZyBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZSwgYnV0IGlmIHlvdSB1c2UgYHJhd0FzYXBgIGRpcmVjdGx5LCB5b3UgYXJlIHJlc3BvbnNpYmxlIHRvXG4vLyBlaXRoZXIgZW5zdXJlIHRoYXQgbm8gZXhjZXB0aW9ucyBhcmUgdGhyb3duIGZyb20geW91ciB0YXNrLCBvciB0byBtYW51YWxseVxuLy8gY2FsbCBgcmF3QXNhcC5yZXF1ZXN0Rmx1c2hgIGlmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24uXG5tb2R1bGUuZXhwb3J0cyA9IHJhd0FzYXA7XG5mdW5jdGlvbiByYXdBc2FwKHRhc2spIHtcbiAgICBpZiAoIXF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXF1ZXN0Rmx1c2goKTtcbiAgICAgICAgZmx1c2hpbmcgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBFcXVpdmFsZW50IHRvIHB1c2gsIGJ1dCBhdm9pZHMgYSBmdW5jdGlvbiBjYWxsLlxuICAgIHF1ZXVlW3F1ZXVlLmxlbmd0aF0gPSB0YXNrO1xufVxuXG52YXIgcXVldWUgPSBbXTtcbi8vIE9uY2UgYSBmbHVzaCBoYXMgYmVlbiByZXF1ZXN0ZWQsIG5vIGZ1cnRoZXIgY2FsbHMgdG8gYHJlcXVlc3RGbHVzaGAgYXJlXG4vLyBuZWNlc3NhcnkgdW50aWwgdGhlIG5leHQgYGZsdXNoYCBjb21wbGV0ZXMuXG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGFuIGltcGxlbWVudGF0aW9uLXNwZWNpZmljIG1ldGhvZCB0aGF0IGF0dGVtcHRzIHRvIGtpY2tcbi8vIG9mZiBhIGBmbHVzaGAgZXZlbnQgYXMgcXVpY2tseSBhcyBwb3NzaWJsZS4gYGZsdXNoYCB3aWxsIGF0dGVtcHQgdG8gZXhoYXVzdFxuLy8gdGhlIGV2ZW50IHF1ZXVlIGJlZm9yZSB5aWVsZGluZyB0byB0aGUgYnJvd3NlcidzIG93biBldmVudCBsb29wLlxudmFyIHJlcXVlc3RGbHVzaDtcbi8vIFRoZSBwb3NpdGlvbiBvZiB0aGUgbmV4dCB0YXNrIHRvIGV4ZWN1dGUgaW4gdGhlIHRhc2sgcXVldWUuIFRoaXMgaXNcbi8vIHByZXNlcnZlZCBiZXR3ZWVuIGNhbGxzIHRvIGBmbHVzaGAgc28gdGhhdCBpdCBjYW4gYmUgcmVzdW1lZCBpZlxuLy8gYSB0YXNrIHRocm93cyBhbiBleGNlcHRpb24uXG52YXIgaW5kZXggPSAwO1xuLy8gSWYgYSB0YXNrIHNjaGVkdWxlcyBhZGRpdGlvbmFsIHRhc2tzIHJlY3Vyc2l2ZWx5LCB0aGUgdGFzayBxdWV1ZSBjYW4gZ3Jvd1xuLy8gdW5ib3VuZGVkLiBUbyBwcmV2ZW50IG1lbW9yeSBleGhhdXN0aW9uLCB0aGUgdGFzayBxdWV1ZSB3aWxsIHBlcmlvZGljYWxseVxuLy8gdHJ1bmNhdGUgYWxyZWFkeS1jb21wbGV0ZWQgdGFza3MuXG52YXIgY2FwYWNpdHkgPSAxMDI0O1xuXG4vLyBUaGUgZmx1c2ggZnVuY3Rpb24gcHJvY2Vzc2VzIGFsbCB0YXNrcyB0aGF0IGhhdmUgYmVlbiBzY2hlZHVsZWQgd2l0aFxuLy8gYHJhd0FzYXBgIHVubGVzcyBhbmQgdW50aWwgb25lIG9mIHRob3NlIHRhc2tzIHRocm93cyBhbiBleGNlcHRpb24uXG4vLyBJZiBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbiwgYGZsdXNoYCBlbnN1cmVzIHRoYXQgaXRzIHN0YXRlIHdpbGwgcmVtYWluXG4vLyBjb25zaXN0ZW50IGFuZCB3aWxsIHJlc3VtZSB3aGVyZSBpdCBsZWZ0IG9mZiB3aGVuIGNhbGxlZCBhZ2Fpbi5cbi8vIEhvd2V2ZXIsIGBmbHVzaGAgZG9lcyBub3QgbWFrZSBhbnkgYXJyYW5nZW1lbnRzIHRvIGJlIGNhbGxlZCBhZ2FpbiBpZiBhblxuLy8gZXhjZXB0aW9uIGlzIHRocm93bi5cbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHdoaWxlIChpbmRleCA8IHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgY3VycmVudEluZGV4ID0gaW5kZXg7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIGluZGV4IGJlZm9yZSBjYWxsaW5nIHRoZSB0YXNrLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSB3aWxsXG4gICAgICAgIC8vIGJlZ2luIGZsdXNoaW5nIG9uIHRoZSBuZXh0IHRhc2sgdGhlIHRhc2sgdGhyb3dzIGFuIGVycm9yLlxuICAgICAgICBpbmRleCA9IGluZGV4ICsgMTtcbiAgICAgICAgcXVldWVbY3VycmVudEluZGV4XS5jYWxsKCk7XG4gICAgICAgIC8vIFByZXZlbnQgbGVha2luZyBtZW1vcnkgZm9yIGxvbmcgY2hhaW5zIG9mIHJlY3Vyc2l2ZSBjYWxscyB0byBgYXNhcGAuXG4gICAgICAgIC8vIElmIHdlIGNhbGwgYGFzYXBgIHdpdGhpbiB0YXNrcyBzY2hlZHVsZWQgYnkgYGFzYXBgLCB0aGUgcXVldWUgd2lsbFxuICAgICAgICAvLyBncm93LCBidXQgdG8gYXZvaWQgYW4gTyhuKSB3YWxrIGZvciBldmVyeSB0YXNrIHdlIGV4ZWN1dGUsIHdlIGRvbid0XG4gICAgICAgIC8vIHNoaWZ0IHRhc2tzIG9mZiB0aGUgcXVldWUgYWZ0ZXIgdGhleSBoYXZlIGJlZW4gZXhlY3V0ZWQuXG4gICAgICAgIC8vIEluc3RlYWQsIHdlIHBlcmlvZGljYWxseSBzaGlmdCAxMDI0IHRhc2tzIG9mZiB0aGUgcXVldWUuXG4gICAgICAgIGlmIChpbmRleCA+IGNhcGFjaXR5KSB7XG4gICAgICAgICAgICAvLyBNYW51YWxseSBzaGlmdCBhbGwgdmFsdWVzIHN0YXJ0aW5nIGF0IHRoZSBpbmRleCBiYWNrIHRvIHRoZVxuICAgICAgICAgICAgLy8gYmVnaW5uaW5nIG9mIHRoZSBxdWV1ZS5cbiAgICAgICAgICAgIGZvciAodmFyIHNjYW4gPSAwLCBuZXdMZW5ndGggPSBxdWV1ZS5sZW5ndGggLSBpbmRleDsgc2NhbiA8IG5ld0xlbmd0aDsgc2NhbisrKSB7XG4gICAgICAgICAgICAgICAgcXVldWVbc2Nhbl0gPSBxdWV1ZVtzY2FuICsgaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVldWUubGVuZ3RoIC09IGluZGV4O1xuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLmxlbmd0aCA9IDA7XG4gICAgaW5kZXggPSAwO1xuICAgIGZsdXNoaW5nID0gZmFsc2U7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIGlzIGltcGxlbWVudGVkIHVzaW5nIGEgc3RyYXRlZ3kgYmFzZWQgb24gZGF0YSBjb2xsZWN0ZWQgZnJvbVxuLy8gZXZlcnkgYXZhaWxhYmxlIFNhdWNlTGFicyBTZWxlbml1bSB3ZWIgZHJpdmVyIHdvcmtlciBhdCB0aW1lIG9mIHdyaXRpbmcuXG4vLyBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9zcHJlYWRzaGVldHMvZC8xbUctNVVZR3VwNXF4R2RFTVdraFA2QldDejA1M05VYjJFMVFvVVRVMTZ1QS9lZGl0I2dpZD03ODM3MjQ1OTNcblxuLy8gU2FmYXJpIDYgYW5kIDYuMSBmb3IgZGVza3RvcCwgaVBhZCwgYW5kIGlQaG9uZSBhcmUgdGhlIG9ubHkgYnJvd3NlcnMgdGhhdFxuLy8gaGF2ZSBXZWJLaXRNdXRhdGlvbk9ic2VydmVyIGJ1dCBub3QgdW4tcHJlZml4ZWQgTXV0YXRpb25PYnNlcnZlci5cbi8vIE11c3QgdXNlIGBnbG9iYWxgIG9yIGBzZWxmYCBpbnN0ZWFkIG9mIGB3aW5kb3dgIHRvIHdvcmsgaW4gYm90aCBmcmFtZXMgYW5kIHdlYlxuLy8gd29ya2Vycy4gYGdsb2JhbGAgaXMgYSBwcm92aXNpb24gb2YgQnJvd3NlcmlmeSwgTXIsIE1ycywgb3IgTW9wLlxuXG4vKiBnbG9iYWxzIHNlbGYgKi9cbnZhciBzY29wZSA9IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiBzZWxmO1xudmFyIEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyID0gc2NvcGUuTXV0YXRpb25PYnNlcnZlciB8fCBzY29wZS5XZWJLaXRNdXRhdGlvbk9ic2VydmVyO1xuXG4vLyBNdXRhdGlvbk9ic2VydmVycyBhcmUgZGVzaXJhYmxlIGJlY2F1c2UgdGhleSBoYXZlIGhpZ2ggcHJpb3JpdHkgYW5kIHdvcmtcbi8vIHJlbGlhYmx5IGV2ZXJ5d2hlcmUgdGhleSBhcmUgaW1wbGVtZW50ZWQuXG4vLyBUaGV5IGFyZSBpbXBsZW1lbnRlZCBpbiBhbGwgbW9kZXJuIGJyb3dzZXJzLlxuLy9cbi8vIC0gQW5kcm9pZCA0LTQuM1xuLy8gLSBDaHJvbWUgMjYtMzRcbi8vIC0gRmlyZWZveCAxNC0yOVxuLy8gLSBJbnRlcm5ldCBFeHBsb3JlciAxMVxuLy8gLSBpUGFkIFNhZmFyaSA2LTcuMVxuLy8gLSBpUGhvbmUgU2FmYXJpIDctNy4xXG4vLyAtIFNhZmFyaSA2LTdcbmlmICh0eXBlb2YgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGZsdXNoKTtcblxuLy8gTWVzc2FnZUNoYW5uZWxzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGdpdmUgZGlyZWN0IGFjY2VzcyB0byB0aGUgSFRNTFxuLy8gdGFzayBxdWV1ZSwgYXJlIGltcGxlbWVudGVkIGluIEludGVybmV0IEV4cGxvcmVyIDEwLCBTYWZhcmkgNS4wLTEsIGFuZCBPcGVyYVxuLy8gMTEtMTIsIGFuZCBpbiB3ZWIgd29ya2VycyBpbiBtYW55IGVuZ2luZXMuXG4vLyBBbHRob3VnaCBtZXNzYWdlIGNoYW5uZWxzIHlpZWxkIHRvIGFueSBxdWV1ZWQgcmVuZGVyaW5nIGFuZCBJTyB0YXNrcywgdGhleVxuLy8gd291bGQgYmUgYmV0dGVyIHRoYW4gaW1wb3NpbmcgdGhlIDRtcyBkZWxheSBvZiB0aW1lcnMuXG4vLyBIb3dldmVyLCB0aGV5IGRvIG5vdCB3b3JrIHJlbGlhYmx5IGluIEludGVybmV0IEV4cGxvcmVyIG9yIFNhZmFyaS5cblxuLy8gSW50ZXJuZXQgRXhwbG9yZXIgMTAgaXMgdGhlIG9ubHkgYnJvd3NlciB0aGF0IGhhcyBzZXRJbW1lZGlhdGUgYnV0IGRvZXNcbi8vIG5vdCBoYXZlIE11dGF0aW9uT2JzZXJ2ZXJzLlxuLy8gQWx0aG91Z2ggc2V0SW1tZWRpYXRlIHlpZWxkcyB0byB0aGUgYnJvd3NlcidzIHJlbmRlcmVyLCBpdCB3b3VsZCBiZVxuLy8gcHJlZmVycmFibGUgdG8gZmFsbGluZyBiYWNrIHRvIHNldFRpbWVvdXQgc2luY2UgaXQgZG9lcyBub3QgaGF2ZVxuLy8gdGhlIG1pbmltdW0gNG1zIHBlbmFsdHkuXG4vLyBVbmZvcnR1bmF0ZWx5IHRoZXJlIGFwcGVhcnMgdG8gYmUgYSBidWcgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAgTW9iaWxlIChhbmRcbi8vIERlc2t0b3AgdG8gYSBsZXNzZXIgZXh0ZW50KSB0aGF0IHJlbmRlcnMgYm90aCBzZXRJbW1lZGlhdGUgYW5kXG4vLyBNZXNzYWdlQ2hhbm5lbCB1c2VsZXNzIGZvciB0aGUgcHVycG9zZXMgb2YgQVNBUC5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9rcmlza293YWwvcS9pc3N1ZXMvMzk2XG5cbi8vIFRpbWVycyBhcmUgaW1wbGVtZW50ZWQgdW5pdmVyc2FsbHkuXG4vLyBXZSBmYWxsIGJhY2sgdG8gdGltZXJzIGluIHdvcmtlcnMgaW4gbW9zdCBlbmdpbmVzLCBhbmQgaW4gZm9yZWdyb3VuZFxuLy8gY29udGV4dHMgaW4gdGhlIGZvbGxvd2luZyBicm93c2Vycy5cbi8vIEhvd2V2ZXIsIG5vdGUgdGhhdCBldmVuIHRoaXMgc2ltcGxlIGNhc2UgcmVxdWlyZXMgbnVhbmNlcyB0byBvcGVyYXRlIGluIGFcbi8vIGJyb2FkIHNwZWN0cnVtIG9mIGJyb3dzZXJzLlxuLy9cbi8vIC0gRmlyZWZveCAzLTEzXG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDYtOVxuLy8gLSBpUGFkIFNhZmFyaSA0LjNcbi8vIC0gTHlueCAyLjguN1xufSBlbHNlIHtcbiAgICByZXF1ZXN0Rmx1c2ggPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoZmx1c2gpO1xufVxuXG4vLyBgcmVxdWVzdEZsdXNoYCByZXF1ZXN0cyB0aGF0IHRoZSBoaWdoIHByaW9yaXR5IGV2ZW50IHF1ZXVlIGJlIGZsdXNoZWQgYXNcbi8vIHNvb24gYXMgcG9zc2libGUuXG4vLyBUaGlzIGlzIHVzZWZ1bCB0byBwcmV2ZW50IGFuIGVycm9yIHRocm93biBpbiBhIHRhc2sgZnJvbSBzdGFsbGluZyB0aGUgZXZlbnRcbi8vIHF1ZXVlIGlmIHRoZSBleGNlcHRpb24gaGFuZGxlZCBieSBOb2RlLmpz4oCZc1xuLy8gYHByb2Nlc3Mub24oXCJ1bmNhdWdodEV4Y2VwdGlvblwiKWAgb3IgYnkgYSBkb21haW4uXG5yYXdBc2FwLnJlcXVlc3RGbHVzaCA9IHJlcXVlc3RGbHVzaDtcblxuLy8gVG8gcmVxdWVzdCBhIGhpZ2ggcHJpb3JpdHkgZXZlbnQsIHdlIGluZHVjZSBhIG11dGF0aW9uIG9ic2VydmVyIGJ5IHRvZ2dsaW5nXG4vLyB0aGUgdGV4dCBvZiBhIHRleHQgbm9kZSBiZXR3ZWVuIFwiMVwiIGFuZCBcIi0xXCIuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjaykge1xuICAgIHZhciB0b2dnbGUgPSAxO1xuICAgIHZhciBvYnNlcnZlciA9IG5ldyBCcm93c2VyTXV0YXRpb25PYnNlcnZlcihjYWxsYmFjayk7XG4gICAgdmFyIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcIlwiKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKG5vZGUsIHtjaGFyYWN0ZXJEYXRhOiB0cnVlfSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICB0b2dnbGUgPSAtdG9nZ2xlO1xuICAgICAgICBub2RlLmRhdGEgPSB0b2dnbGU7XG4gICAgfTtcbn1cblxuLy8gVGhlIG1lc3NhZ2UgY2hhbm5lbCB0ZWNobmlxdWUgd2FzIGRpc2NvdmVyZWQgYnkgTWFsdGUgVWJsIGFuZCB3YXMgdGhlXG4vLyBvcmlnaW5hbCBmb3VuZGF0aW9uIGZvciB0aGlzIGxpYnJhcnkuXG4vLyBodHRwOi8vd3d3Lm5vbmJsb2NraW5nLmlvLzIwMTEvMDYvd2luZG93bmV4dHRpY2suaHRtbFxuXG4vLyBTYWZhcmkgNi4wLjUgKGF0IGxlYXN0KSBpbnRlcm1pdHRlbnRseSBmYWlscyB0byBjcmVhdGUgbWVzc2FnZSBwb3J0cyBvbiBhXG4vLyBwYWdlJ3MgZmlyc3QgbG9hZC4gVGhhbmtmdWxseSwgdGhpcyB2ZXJzaW9uIG9mIFNhZmFyaSBzdXBwb3J0c1xuLy8gTXV0YXRpb25PYnNlcnZlcnMsIHNvIHdlIGRvbid0IG5lZWQgdG8gZmFsbCBiYWNrIGluIHRoYXQgY2FzZS5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbU1lc3NhZ2VDaGFubmVsKGNhbGxiYWNrKSB7XG4vLyAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbi8vICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGNhbGxiYWNrO1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZSgwKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBGb3IgcmVhc29ucyBleHBsYWluZWQgYWJvdmUsIHdlIGFyZSBhbHNvIHVuYWJsZSB0byB1c2UgYHNldEltbWVkaWF0ZWBcbi8vIHVuZGVyIGFueSBjaXJjdW1zdGFuY2VzLlxuLy8gRXZlbiBpZiB3ZSB3ZXJlLCB0aGVyZSBpcyBhbm90aGVyIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbi8vIEl0IGlzIG5vdCBzdWZmaWNpZW50IHRvIGFzc2lnbiBgc2V0SW1tZWRpYXRlYCB0byBgcmVxdWVzdEZsdXNoYCBiZWNhdXNlXG4vLyBgc2V0SW1tZWRpYXRlYCBtdXN0IGJlIGNhbGxlZCAqYnkgbmFtZSogYW5kIHRoZXJlZm9yZSBtdXN0IGJlIHdyYXBwZWQgaW4gYVxuLy8gY2xvc3VyZS5cbi8vIE5ldmVyIGZvcmdldC5cblxuLy8gZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuLy8gICAgIHJldHVybiBmdW5jdGlvbiByZXF1ZXN0Q2FsbCgpIHtcbi8vICAgICAgICAgc2V0SW1tZWRpYXRlKGNhbGxiYWNrKTtcbi8vICAgICB9O1xuLy8gfVxuXG4vLyBTYWZhcmkgNi4wIGhhcyBhIHByb2JsZW0gd2hlcmUgdGltZXJzIHdpbGwgZ2V0IGxvc3Qgd2hpbGUgdGhlIHVzZXIgaXNcbi8vIHNjcm9sbGluZy4gVGhpcyBwcm9ibGVtIGRvZXMgbm90IGltcGFjdCBBU0FQIGJlY2F1c2UgU2FmYXJpIDYuMCBzdXBwb3J0c1xuLy8gbXV0YXRpb24gb2JzZXJ2ZXJzLCBzbyB0aGF0IGltcGxlbWVudGF0aW9uIGlzIHVzZWQgaW5zdGVhZC5cbi8vIEhvd2V2ZXIsIGlmIHdlIGV2ZXIgZWxlY3QgdG8gdXNlIHRpbWVycyBpbiBTYWZhcmksIHRoZSBwcmV2YWxlbnQgd29yay1hcm91bmRcbi8vIGlzIHRvIGFkZCBhIHNjcm9sbCBldmVudCBsaXN0ZW5lciB0aGF0IGNhbGxzIGZvciBhIGZsdXNoLlxuXG4vLyBgc2V0VGltZW91dGAgZG9lcyBub3QgY2FsbCB0aGUgcGFzc2VkIGNhbGxiYWNrIGlmIHRoZSBkZWxheSBpcyBsZXNzIHRoYW5cbi8vIGFwcHJveGltYXRlbHkgNyBpbiB3ZWIgd29ya2VycyBpbiBGaXJlZm94IDggdGhyb3VnaCAxOCwgYW5kIHNvbWV0aW1lcyBub3Rcbi8vIGV2ZW4gdGhlbi5cblxuZnVuY3Rpb24gbWFrZVJlcXVlc3RDYWxsRnJvbVRpbWVyKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuICAgICAgICAvLyBXZSBkaXNwYXRjaCBhIHRpbWVvdXQgd2l0aCBhIHNwZWNpZmllZCBkZWxheSBvZiAwIGZvciBlbmdpbmVzIHRoYXRcbiAgICAgICAgLy8gY2FuIHJlbGlhYmx5IGFjY29tbW9kYXRlIHRoYXQgcmVxdWVzdC4gVGhpcyB3aWxsIHVzdWFsbHkgYmUgc25hcHBlZFxuICAgICAgICAvLyB0byBhIDQgbWlsaXNlY29uZCBkZWxheSwgYnV0IG9uY2Ugd2UncmUgZmx1c2hpbmcsIHRoZXJlJ3Mgbm8gZGVsYXlcbiAgICAgICAgLy8gYmV0d2VlbiBldmVudHMuXG4gICAgICAgIHZhciB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChoYW5kbGVUaW1lciwgMCk7XG4gICAgICAgIC8vIEhvd2V2ZXIsIHNpbmNlIHRoaXMgdGltZXIgZ2V0cyBmcmVxdWVudGx5IGRyb3BwZWQgaW4gRmlyZWZveFxuICAgICAgICAvLyB3b3JrZXJzLCB3ZSBlbmxpc3QgYW4gaW50ZXJ2YWwgaGFuZGxlIHRoYXQgd2lsbCB0cnkgdG8gZmlyZVxuICAgICAgICAvLyBhbiBldmVudCAyMCB0aW1lcyBwZXIgc2Vjb25kIHVudGlsIGl0IHN1Y2NlZWRzLlxuICAgICAgICB2YXIgaW50ZXJ2YWxIYW5kbGUgPSBzZXRJbnRlcnZhbChoYW5kbGVUaW1lciwgNTApO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVRpbWVyKCkge1xuICAgICAgICAgICAgLy8gV2hpY2hldmVyIHRpbWVyIHN1Y2NlZWRzIHdpbGwgY2FuY2VsIGJvdGggdGltZXJzIGFuZFxuICAgICAgICAgICAgLy8gZXhlY3V0ZSB0aGUgY2FsbGJhY2suXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsSGFuZGxlKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyBUaGlzIGlzIGZvciBgYXNhcC5qc2Agb25seS5cbi8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdCBkZXBlbmRzIG9uXG4vLyBpdHMgZXhpc3RlbmNlLlxucmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIgPSBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXI7XG5cbi8vIEFTQVAgd2FzIG9yaWdpbmFsbHkgYSBuZXh0VGljayBzaGltIGluY2x1ZGVkIGluIFEuIFRoaXMgd2FzIGZhY3RvcmVkIG91dFxuLy8gaW50byB0aGlzIEFTQVAgcGFja2FnZS4gSXQgd2FzIGxhdGVyIGFkYXB0ZWQgdG8gUlNWUCB3aGljaCBtYWRlIGZ1cnRoZXJcbi8vIGFtZW5kbWVudHMuIFRoZXNlIGRlY2lzaW9ucywgcGFydGljdWxhcmx5IHRvIG1hcmdpbmFsaXplIE1lc3NhZ2VDaGFubmVsIGFuZFxuLy8gdG8gY2FwdHVyZSB0aGUgTXV0YXRpb25PYnNlcnZlciBpbXBsZW1lbnRhdGlvbiBpbiBhIGNsb3N1cmUsIHdlcmUgaW50ZWdyYXRlZFxuLy8gYmFjayBpbnRvIEFTQVAgcHJvcGVyLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RpbGRlaW8vcnN2cC5qcy9ibG9iL2NkZGY3MjMyNTQ2YTljZjg1ODUyNGI3NWNkZTZmOWVkZjcyNjIwYTcvbGliL3JzdnAvYXNhcC5qc1xuXG4vKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygxNCkpKVxuXG4vKioqLyB9KSxcbi8qIDE0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG4vKioqLyB9KSxcbi8qIDE1ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXzsvLyBNSVQgbGljZW5zZSAoYnkgRWxhbiBTaGFua2VyKS5cbihmdW5jdGlvbihnbG9iYWxzKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgZXhlY3V0ZVN5bmMgPSBmdW5jdGlvbigpe1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdmdW5jdGlvbicpe1xuICAgICAgYXJnc1swXS5hcHBseShudWxsLCBhcmdzLnNwbGljZSgxKSk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBleGVjdXRlQXN5bmMgPSBmdW5jdGlvbihmbil7XG4gICAgaWYgKHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHNldEltbWVkaWF0ZShmbik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgcHJvY2Vzcy5uZXh0VGljaykge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH1cbiAgfTtcblxuICB2YXIgbWFrZUl0ZXJhdG9yID0gZnVuY3Rpb24gKHRhc2tzKSB7XG4gICAgdmFyIG1ha2VDYWxsYmFjayA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGFza3MubGVuZ3RoKSB7XG4gICAgICAgICAgdGFza3NbaW5kZXhdLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZuLm5leHQoKTtcbiAgICAgIH07XG4gICAgICBmbi5uZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKGluZGV4IDwgdGFza3MubGVuZ3RoIC0gMSkgPyBtYWtlQ2FsbGJhY2soaW5kZXggKyAxKTogbnVsbDtcbiAgICAgIH07XG4gICAgICByZXR1cm4gZm47XG4gICAgfTtcbiAgICByZXR1cm4gbWFrZUNhbGxiYWNrKDApO1xuICB9O1xuICBcbiAgdmFyIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihtYXliZUFycmF5KXtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG1heWJlQXJyYXkpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIHZhciB3YXRlcmZhbGwgPSBmdW5jdGlvbiAodGFza3MsIGNhbGxiYWNrLCBmb3JjZUFzeW5jKSB7XG4gICAgdmFyIG5leHRUaWNrID0gZm9yY2VBc3luYyA/IGV4ZWN1dGVBc3luYyA6IGV4ZWN1dGVTeW5jO1xuICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG4gICAgaWYgKCFfaXNBcnJheSh0YXNrcykpIHtcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIHdhdGVyZmFsbCBtdXN0IGJlIGFuIGFycmF5IG9mIGZ1bmN0aW9ucycpO1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgfVxuICAgIGlmICghdGFza3MubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soKTtcbiAgICB9XG4gICAgdmFyIHdyYXBJdGVyYXRvciA9IGZ1bmN0aW9uIChpdGVyYXRvcikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7fTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgICAgdmFyIG5leHQgPSBpdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh3cmFwSXRlcmF0b3IobmV4dCkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9O1xuICAgIHdyYXBJdGVyYXRvcihtYWtlSXRlcmF0b3IodGFza3MpKSgpO1xuICB9O1xuXG4gIGlmICh0cnVlKSB7XG4gICAgIShfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fID0gW10sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB3YXRlcmZhbGw7XG4gICAgfSkuYXBwbHkoZXhwb3J0cywgX19XRUJQQUNLX0FNRF9ERUZJTkVfQVJSQVlfXyksXG5cdFx0XHRcdF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fICE9PSB1bmRlZmluZWQgJiYgKG1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18pKTsgLy8gUmVxdWlyZUpTXG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdhdGVyZmFsbDsgLy8gQ29tbW9uSlNcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxzLndhdGVyZmFsbCA9IHdhdGVyZmFsbDsgLy8gPHNjcmlwdD5cbiAgfVxufSkodGhpcyk7XG5cblxuLyoqKi8gfSksXG4vKiAxNiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5cblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uICRnZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuICRnZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSAkZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgUmVmbGVjdEFwcGx5KHRoaXMubGlzdGVuZXIsIHRoaXMudGFyZ2V0LCBhcmdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cblxuLyoqKi8gfSksXG4vKiAxNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgbm9kZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpO1xuXG52YXIgbGliID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIHN5bSA9IDA7XG5cbmZ1bmN0aW9uIGdlbnN5bSgpIHtcbiAgcmV0dXJuICdob2xlXycgKyBzeW0rKztcbn0gLy8gY29weS1vbi13cml0ZSB2ZXJzaW9uIG9mIG1hcFxuXG5cbmZ1bmN0aW9uIG1hcENPVyhhcnIsIGZ1bmMpIHtcbiAgdmFyIHJlcyA9IG51bGw7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGZ1bmMoYXJyW2ldKTtcblxuICAgIGlmIChpdGVtICE9PSBhcnJbaV0pIHtcbiAgICAgIGlmICghcmVzKSB7XG4gICAgICAgIHJlcyA9IGFyci5zbGljZSgpO1xuICAgICAgfVxuXG4gICAgICByZXNbaV0gPSBpdGVtO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgfHwgYXJyO1xufVxuXG5mdW5jdGlvbiB3YWxrKGFzdCwgZnVuYywgZGVwdGhGaXJzdCkge1xuICBpZiAoIShhc3QgaW5zdGFuY2VvZiBub2Rlcy5Ob2RlKSkge1xuICAgIHJldHVybiBhc3Q7XG4gIH1cblxuICBpZiAoIWRlcHRoRmlyc3QpIHtcbiAgICB2YXIgYXN0VCA9IGZ1bmMoYXN0KTtcblxuICAgIGlmIChhc3RUICYmIGFzdFQgIT09IGFzdCkge1xuICAgICAgcmV0dXJuIGFzdFQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFzdCBpbnN0YW5jZW9mIG5vZGVzLk5vZGVMaXN0KSB7XG4gICAgdmFyIGNoaWxkcmVuID0gbWFwQ09XKGFzdC5jaGlsZHJlbiwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIHJldHVybiB3YWxrKG5vZGUsIGZ1bmMsIGRlcHRoRmlyc3QpO1xuICAgIH0pO1xuXG4gICAgaWYgKGNoaWxkcmVuICE9PSBhc3QuY2hpbGRyZW4pIHtcbiAgICAgIGFzdCA9IG5ldyBub2Rlc1thc3QudHlwZW5hbWVdKGFzdC5saW5lbm8sIGFzdC5jb2xubywgY2hpbGRyZW4pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChhc3QgaW5zdGFuY2VvZiBub2Rlcy5DYWxsRXh0ZW5zaW9uKSB7XG4gICAgdmFyIGFyZ3MgPSB3YWxrKGFzdC5hcmdzLCBmdW5jLCBkZXB0aEZpcnN0KTtcbiAgICB2YXIgY29udGVudEFyZ3MgPSBtYXBDT1coYXN0LmNvbnRlbnRBcmdzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIHdhbGsobm9kZSwgZnVuYywgZGVwdGhGaXJzdCk7XG4gICAgfSk7XG5cbiAgICBpZiAoYXJncyAhPT0gYXN0LmFyZ3MgfHwgY29udGVudEFyZ3MgIT09IGFzdC5jb250ZW50QXJncykge1xuICAgICAgYXN0ID0gbmV3IG5vZGVzW2FzdC50eXBlbmFtZV0oYXN0LmV4dE5hbWUsIGFzdC5wcm9wLCBhcmdzLCBjb250ZW50QXJncyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBwcm9wcyA9IGFzdC5maWVsZHMubWFwKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgcmV0dXJuIGFzdFtmaWVsZF07XG4gICAgfSk7XG4gICAgdmFyIHByb3BzVCA9IG1hcENPVyhwcm9wcywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHJldHVybiB3YWxrKHByb3AsIGZ1bmMsIGRlcHRoRmlyc3QpO1xuICAgIH0pO1xuXG4gICAgaWYgKHByb3BzVCAhPT0gcHJvcHMpIHtcbiAgICAgIGFzdCA9IG5ldyBub2Rlc1thc3QudHlwZW5hbWVdKGFzdC5saW5lbm8sIGFzdC5jb2xubyk7XG4gICAgICBwcm9wc1QuZm9yRWFjaChmdW5jdGlvbiAocHJvcCwgaSkge1xuICAgICAgICBhc3RbYXN0LmZpZWxkc1tpXV0gPSBwcm9wO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlcHRoRmlyc3QgPyBmdW5jKGFzdCkgfHwgYXN0IDogYXN0O1xufVxuXG5mdW5jdGlvbiBkZXB0aFdhbGsoYXN0LCBmdW5jKSB7XG4gIHJldHVybiB3YWxrKGFzdCwgZnVuYywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIF9saWZ0RmlsdGVycyhub2RlLCBhc3luY0ZpbHRlcnMsIHByb3ApIHtcbiAgdmFyIGNoaWxkcmVuID0gW107XG4gIHZhciB3YWxrZWQgPSBkZXB0aFdhbGsocHJvcCA/IG5vZGVbcHJvcF0gOiBub2RlLCBmdW5jdGlvbiAoZGVzY05vZGUpIHtcbiAgICB2YXIgc3ltYm9sO1xuXG4gICAgaWYgKGRlc2NOb2RlIGluc3RhbmNlb2Ygbm9kZXMuQmxvY2spIHtcbiAgICAgIHJldHVybiBkZXNjTm9kZTtcbiAgICB9IGVsc2UgaWYgKGRlc2NOb2RlIGluc3RhbmNlb2Ygbm9kZXMuRmlsdGVyICYmIGxpYi5pbmRleE9mKGFzeW5jRmlsdGVycywgZGVzY05vZGUubmFtZS52YWx1ZSkgIT09IC0xIHx8IGRlc2NOb2RlIGluc3RhbmNlb2Ygbm9kZXMuQ2FsbEV4dGVuc2lvbkFzeW5jKSB7XG4gICAgICBzeW1ib2wgPSBuZXcgbm9kZXMuU3ltYm9sKGRlc2NOb2RlLmxpbmVubywgZGVzY05vZGUuY29sbm8sIGdlbnN5bSgpKTtcbiAgICAgIGNoaWxkcmVuLnB1c2gobmV3IG5vZGVzLkZpbHRlckFzeW5jKGRlc2NOb2RlLmxpbmVubywgZGVzY05vZGUuY29sbm8sIGRlc2NOb2RlLm5hbWUsIGRlc2NOb2RlLmFyZ3MsIHN5bWJvbCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzeW1ib2w7XG4gIH0pO1xuXG4gIGlmIChwcm9wKSB7XG4gICAgbm9kZVtwcm9wXSA9IHdhbGtlZDtcbiAgfSBlbHNlIHtcbiAgICBub2RlID0gd2Fsa2VkO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuLmxlbmd0aCkge1xuICAgIGNoaWxkcmVuLnB1c2gobm9kZSk7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5Ob2RlTGlzdChub2RlLmxpbmVubywgbm9kZS5jb2xubywgY2hpbGRyZW4pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBub2RlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxpZnRGaWx0ZXJzKGFzdCwgYXN5bmNGaWx0ZXJzKSB7XG4gIHJldHVybiBkZXB0aFdhbGsoYXN0LCBmdW5jdGlvbiAobm9kZSkge1xuICAgIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuT3V0cHV0KSB7XG4gICAgICByZXR1cm4gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycyk7XG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuU2V0KSB7XG4gICAgICByZXR1cm4gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycywgJ3ZhbHVlJyk7XG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuRm9yKSB7XG4gICAgICByZXR1cm4gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycywgJ2FycicpO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLklmKSB7XG4gICAgICByZXR1cm4gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycywgJ2NvbmQnKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5DYWxsRXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycywgJ2FyZ3MnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsaWZ0U3VwZXIoYXN0KSB7XG4gIHJldHVybiB3YWxrKGFzdCwgZnVuY3Rpb24gKGJsb2NrTm9kZSkge1xuICAgIGlmICghKGJsb2NrTm9kZSBpbnN0YW5jZW9mIG5vZGVzLkJsb2NrKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBoYXNTdXBlciA9IGZhbHNlO1xuICAgIHZhciBzeW1ib2wgPSBnZW5zeW0oKTtcbiAgICBibG9ja05vZGUuYm9keSA9IHdhbGsoYmxvY2tOb2RlLmJvZHksIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkZ1bkNhbGwgJiYgbm9kZS5uYW1lLnZhbHVlID09PSAnc3VwZXInKSB7XG4gICAgICAgIGhhc1N1cGVyID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIG5ldyBub2Rlcy5TeW1ib2wobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIHN5bWJvbCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGFzU3VwZXIpIHtcbiAgICAgIGJsb2NrTm9kZS5ib2R5LmNoaWxkcmVuLnVuc2hpZnQobmV3IG5vZGVzLlN1cGVyKDAsIDAsIGJsb2NrTm9kZS5uYW1lLCBuZXcgbm9kZXMuU3ltYm9sKDAsIDAsIHN5bWJvbCkpKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0U3RhdGVtZW50cyhhc3QpIHtcbiAgcmV0dXJuIGRlcHRoV2Fsayhhc3QsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKCEobm9kZSBpbnN0YW5jZW9mIG5vZGVzLklmKSAmJiAhKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5Gb3IpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHZhciBhc3luYyA9IGZhbHNlO1xuICAgIHdhbGsobm9kZSwgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5GaWx0ZXJBc3luYyB8fCBjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLklmQXN5bmMgfHwgY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5Bc3luY0VhY2ggfHwgY2hpbGQgaW5zdGFuY2VvZiBub2Rlcy5Bc3luY0FsbCB8fCBjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLkNhbGxFeHRlbnNpb25Bc3luYykge1xuICAgICAgICBhc3luYyA9IHRydWU7IC8vIFN0b3AgaXRlcmF0aW5nIGJ5IHJldHVybmluZyB0aGUgbm9kZVxuXG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9KTtcblxuICAgIGlmIChhc3luYykge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5JZikge1xuICAgICAgICByZXR1cm4gbmV3IG5vZGVzLklmQXN5bmMobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUuY29uZCwgbm9kZS5ib2R5LCBub2RlLmVsc2VfKTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkZvciAmJiAhKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5Bc3luY0FsbCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBub2Rlcy5Bc3luY0VhY2gobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUuYXJyLCBub2RlLm5hbWUsIG5vZGUuYm9keSwgbm9kZS5lbHNlXyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNwcyhhc3QsIGFzeW5jRmlsdGVycykge1xuICByZXR1cm4gY29udmVydFN0YXRlbWVudHMobGlmdFN1cGVyKGxpZnRGaWx0ZXJzKGFzdCwgYXN5bmNGaWx0ZXJzKSkpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm0oYXN0LCBhc3luY0ZpbHRlcnMpIHtcbiAgcmV0dXJuIGNwcyhhc3QsIGFzeW5jRmlsdGVycyB8fCBbXSk7XG59IC8vIHZhciBwYXJzZXIgPSByZXF1aXJlKCcuL3BhcnNlcicpO1xuLy8gdmFyIHNyYyA9ICdoZWxsbyB7JSBmb28gJX17JSBlbmRmb28gJX0gZW5kJztcbi8vIHZhciBhc3QgPSB0cmFuc2Zvcm0ocGFyc2VyLnBhcnNlKHNyYywgW25ldyBGb29FeHRlbnNpb24oKV0pLCBbJ2JhciddKTtcbi8vIG5vZGVzLnByaW50Tm9kZXMoYXN0KTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgdHJhbnNmb3JtOiB0cmFuc2Zvcm1cbn07XG5cbi8qKiovIH0pLFxuLyogMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciByID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5mdW5jdGlvbiBub3JtYWxpemUodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnRzLmFicyA9IE1hdGguYWJzO1xuXG5mdW5jdGlvbiBpc05hTihudW0pIHtcbiAgcmV0dXJuIG51bSAhPT0gbnVtOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5mdW5jdGlvbiBiYXRjaChhcnIsIGxpbmVjb3VudCwgZmlsbFdpdGgpIHtcbiAgdmFyIGk7XG4gIHZhciByZXMgPSBbXTtcbiAgdmFyIHRtcCA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSAlIGxpbmVjb3VudCA9PT0gMCAmJiB0bXAubGVuZ3RoKSB7XG4gICAgICByZXMucHVzaCh0bXApO1xuICAgICAgdG1wID0gW107XG4gICAgfVxuXG4gICAgdG1wLnB1c2goYXJyW2ldKTtcbiAgfVxuXG4gIGlmICh0bXAubGVuZ3RoKSB7XG4gICAgaWYgKGZpbGxXaXRoKSB7XG4gICAgICBmb3IgKGkgPSB0bXAubGVuZ3RoOyBpIDwgbGluZWNvdW50OyBpKyspIHtcbiAgICAgICAgdG1wLnB1c2goZmlsbFdpdGgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlcy5wdXNoKHRtcCk7XG4gIH1cblxuICByZXR1cm4gcmVzO1xufVxuXG5leHBvcnRzLmJhdGNoID0gYmF0Y2g7XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgdmFyIHJldCA9IHN0ci50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCByZXQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZXQuc2xpY2UoMSkpO1xufVxuXG5leHBvcnRzLmNhcGl0YWxpemUgPSBjYXBpdGFsaXplO1xuXG5mdW5jdGlvbiBjZW50ZXIoc3RyLCB3aWR0aCkge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHdpZHRoID0gd2lkdGggfHwgODA7XG5cbiAgaWYgKHN0ci5sZW5ndGggPj0gd2lkdGgpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmFyIHNwYWNlcyA9IHdpZHRoIC0gc3RyLmxlbmd0aDtcbiAgdmFyIHByZSA9IGxpYi5yZXBlYXQoJyAnLCBzcGFjZXMgLyAyIC0gc3BhY2VzICUgMik7XG4gIHZhciBwb3N0ID0gbGliLnJlcGVhdCgnICcsIHNwYWNlcyAvIDIpO1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCBwcmUgKyBzdHIgKyBwb3N0KTtcbn1cblxuZXhwb3J0cy5jZW50ZXIgPSBjZW50ZXI7XG5cbmZ1bmN0aW9uIGRlZmF1bHRfKHZhbCwgZGVmLCBib29sKSB7XG4gIGlmIChib29sKSB7XG4gICAgcmV0dXJuIHZhbCB8fCBkZWY7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCAhPT0gdW5kZWZpbmVkID8gdmFsIDogZGVmO1xuICB9XG59IC8vIFRPRE86IGl0IGlzIGNvbmZ1c2luZyB0byBleHBvcnQgc29tZXRoaW5nIGNhbGxlZCAnZGVmYXVsdCdcblxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBkZWZhdWx0XzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cblxuZnVuY3Rpb24gZGljdHNvcnQodmFsLCBjYXNlU2Vuc2l0aXZlLCBieSkge1xuICBpZiAoIWxpYi5pc09iamVjdCh2YWwpKSB7XG4gICAgdGhyb3cgbmV3IGxpYi5UZW1wbGF0ZUVycm9yKCdkaWN0c29ydCBmaWx0ZXI6IHZhbCBtdXN0IGJlIGFuIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIGFycmF5ID0gW107IC8vIGRlbGliZXJhdGVseSBpbmNsdWRlIHByb3BlcnRpZXMgZnJvbSB0aGUgb2JqZWN0J3MgcHJvdG90eXBlXG5cbiAgZm9yICh2YXIgayBpbiB2YWwpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGd1YXJkLWZvci1pbiwgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBhcnJheS5wdXNoKFtrLCB2YWxba11dKTtcbiAgfVxuXG4gIHZhciBzaTtcblxuICBpZiAoYnkgPT09IHVuZGVmaW5lZCB8fCBieSA9PT0gJ2tleScpIHtcbiAgICBzaSA9IDA7XG4gIH0gZWxzZSBpZiAoYnkgPT09ICd2YWx1ZScpIHtcbiAgICBzaSA9IDE7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IGxpYi5UZW1wbGF0ZUVycm9yKCdkaWN0c29ydCBmaWx0ZXI6IFlvdSBjYW4gb25seSBzb3J0IGJ5IGVpdGhlciBrZXkgb3IgdmFsdWUnKTtcbiAgfVxuXG4gIGFycmF5LnNvcnQoZnVuY3Rpb24gKHQxLCB0Mikge1xuICAgIHZhciBhID0gdDFbc2ldO1xuICAgIHZhciBiID0gdDJbc2ldO1xuXG4gICAgaWYgKCFjYXNlU2Vuc2l0aXZlKSB7XG4gICAgICBpZiAobGliLmlzU3RyaW5nKGEpKSB7XG4gICAgICAgIGEgPSBhLnRvVXBwZXJDYXNlKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsaWIuaXNTdHJpbmcoYikpIHtcbiAgICAgICAgYiA9IGIudG9VcHBlckNhc2UoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYSA+IGIgPyAxIDogYSA9PT0gYiA/IDAgOiAtMTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICB9KTtcbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnRzLmRpY3Rzb3J0ID0gZGljdHNvcnQ7XG5cbmZ1bmN0aW9uIGR1bXAob2JqLCBzcGFjZXMpIHtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgc3BhY2VzKTtcbn1cblxuZXhwb3J0cy5kdW1wID0gZHVtcDtcblxuZnVuY3Rpb24gZXNjYXBlKHN0cikge1xuICBpZiAoc3RyIGluc3RhbmNlb2Ygci5TYWZlU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHN0ciA9IHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHVuZGVmaW5lZCA/ICcnIDogc3RyO1xuICByZXR1cm4gci5tYXJrU2FmZShsaWIuZXNjYXBlKHN0ci50b1N0cmluZygpKSk7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gZXNjYXBlO1xuXG5mdW5jdGlvbiBzYWZlKHN0cikge1xuICBpZiAoc3RyIGluc3RhbmNlb2Ygci5TYWZlU3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHN0ciA9IHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHVuZGVmaW5lZCA/ICcnIDogc3RyO1xuICByZXR1cm4gci5tYXJrU2FmZShzdHIudG9TdHJpbmcoKSk7XG59XG5cbmV4cG9ydHMuc2FmZSA9IHNhZmU7XG5cbmZ1bmN0aW9uIGZpcnN0KGFycikge1xuICByZXR1cm4gYXJyWzBdO1xufVxuXG5leHBvcnRzLmZpcnN0ID0gZmlyc3Q7XG5cbmZ1bmN0aW9uIGZvcmNlZXNjYXBlKHN0cikge1xuICBzdHIgPSBzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQgPyAnJyA6IHN0cjtcbiAgcmV0dXJuIHIubWFya1NhZmUobGliLmVzY2FwZShzdHIudG9TdHJpbmcoKSkpO1xufVxuXG5leHBvcnRzLmZvcmNlZXNjYXBlID0gZm9yY2Vlc2NhcGU7XG5cbmZ1bmN0aW9uIGdyb3VwYnkoYXJyLCBhdHRyKSB7XG4gIHJldHVybiBsaWIuZ3JvdXBCeShhcnIsIGF0dHIpO1xufVxuXG5leHBvcnRzLmdyb3VwYnkgPSBncm91cGJ5O1xuXG5mdW5jdGlvbiBpbmRlbnQoc3RyLCB3aWR0aCwgaW5kZW50Zmlyc3QpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuXG4gIGlmIChzdHIgPT09ICcnKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgd2lkdGggPSB3aWR0aCB8fCA0OyAvLyBsZXQgcmVzID0gJyc7XG5cbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKTtcbiAgdmFyIHNwID0gbGliLnJlcGVhdCgnICcsIHdpZHRoKTtcbiAgdmFyIHJlcyA9IGxpbmVzLm1hcChmdW5jdGlvbiAobCwgaSkge1xuICAgIHJldHVybiBpID09PSAwICYmICFpbmRlbnRmaXJzdCA/IGwgKyBcIlxcblwiIDogXCJcIiArIHNwICsgbCArIFwiXFxuXCI7XG4gIH0pLmpvaW4oJycpO1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCByZXMpO1xufVxuXG5leHBvcnRzLmluZGVudCA9IGluZGVudDtcblxuZnVuY3Rpb24gam9pbihhcnIsIGRlbCwgYXR0cikge1xuICBkZWwgPSBkZWwgfHwgJyc7XG5cbiAgaWYgKGF0dHIpIHtcbiAgICBhcnIgPSBsaWIubWFwKGFyciwgZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2W2F0dHJdO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGFyci5qb2luKGRlbCk7XG59XG5cbmV4cG9ydHMuam9pbiA9IGpvaW47XG5cbmZ1bmN0aW9uIGxhc3QoYXJyKSB7XG4gIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xufVxuXG5leHBvcnRzLmxhc3QgPSBsYXN0O1xuXG5mdW5jdGlvbiBsZW5ndGhGaWx0ZXIodmFsKSB7XG4gIHZhciB2YWx1ZSA9IG5vcm1hbGl6ZSh2YWwsICcnKTtcblxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0eXBlb2YgTWFwID09PSAnZnVuY3Rpb24nICYmIHZhbHVlIGluc3RhbmNlb2YgTWFwIHx8IHR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgdmFsdWUgaW5zdGFuY2VvZiBTZXQpIHtcbiAgICAgIC8vIEVDTUFTY3JpcHQgMjAxNSBNYXBzIGFuZCBTZXRzXG4gICAgICByZXR1cm4gdmFsdWUuc2l6ZTtcbiAgICB9XG5cbiAgICBpZiAobGliLmlzT2JqZWN0KHZhbHVlKSAmJiAhKHZhbHVlIGluc3RhbmNlb2Ygci5TYWZlU3RyaW5nKSkge1xuICAgICAgLy8gT2JqZWN0cyAoYmVzaWRlcyBTYWZlU3RyaW5ncyksIG5vbi1wcmltYXRpdmUgQXJyYXlzXG4gICAgICByZXR1cm4gbGliLmtleXModmFsdWUpLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydHMubGVuZ3RoID0gbGVuZ3RoRmlsdGVyO1xuXG5mdW5jdGlvbiBsaXN0KHZhbCkge1xuICBpZiAobGliLmlzU3RyaW5nKHZhbCkpIHtcbiAgICByZXR1cm4gdmFsLnNwbGl0KCcnKTtcbiAgfSBlbHNlIGlmIChsaWIuaXNPYmplY3QodmFsKSkge1xuICAgIHJldHVybiBsaWIuX2VudHJpZXModmFsIHx8IHt9KS5tYXAoZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgIHZhciBrZXkgPSBfcmVmWzBdLFxuICAgICAgICAgIHZhbHVlID0gX3JlZlsxXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleToga2V5LFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgIH07XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobGliLmlzQXJyYXkodmFsKSkge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IGxpYi5UZW1wbGF0ZUVycm9yKCdsaXN0IGZpbHRlcjogdHlwZSBub3QgaXRlcmFibGUnKTtcbiAgfVxufVxuXG5leHBvcnRzLmxpc3QgPSBsaXN0O1xuXG5mdW5jdGlvbiBsb3dlcihzdHIpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydHMubG93ZXIgPSBsb3dlcjtcblxuZnVuY3Rpb24gbmwyYnIoc3RyKSB7XG4gIGlmIChzdHIgPT09IG51bGwgfHwgc3RyID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCBzdHIucmVwbGFjZSgvXFxyXFxufFxcbi9nLCAnPGJyIC8+XFxuJykpO1xufVxuXG5leHBvcnRzLm5sMmJyID0gbmwyYnI7XG5cbmZ1bmN0aW9uIHJhbmRvbShhcnIpIHtcbiAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG59XG5cbmV4cG9ydHMucmFuZG9tID0gcmFuZG9tO1xuXG5mdW5jdGlvbiByZWplY3RhdHRyKGFyciwgYXR0cikge1xuICByZXR1cm4gYXJyLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgIHJldHVybiAhaXRlbVthdHRyXTtcbiAgfSk7XG59XG5cbmV4cG9ydHMucmVqZWN0YXR0ciA9IHJlamVjdGF0dHI7XG5cbmZ1bmN0aW9uIHNlbGVjdGF0dHIoYXJyLCBhdHRyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuICEhaXRlbVthdHRyXTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuc2VsZWN0YXR0ciA9IHNlbGVjdGF0dHI7XG5cbmZ1bmN0aW9uIHJlcGxhY2Uoc3RyLCBvbGQsIG5ld18sIG1heENvdW50KSB7XG4gIHZhciBvcmlnaW5hbFN0ciA9IHN0cjtcblxuICBpZiAob2xkIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKG9sZCwgbmV3Xyk7XG4gIH1cblxuICBpZiAodHlwZW9mIG1heENvdW50ID09PSAndW5kZWZpbmVkJykge1xuICAgIG1heENvdW50ID0gLTE7XG4gIH1cblxuICB2YXIgcmVzID0gJyc7IC8vIE91dHB1dFxuICAvLyBDYXN0IE51bWJlcnMgaW4gdGhlIHNlYXJjaCB0ZXJtIHRvIHN0cmluZ1xuXG4gIGlmICh0eXBlb2Ygb2xkID09PSAnbnVtYmVyJykge1xuICAgIG9sZCA9ICcnICsgb2xkO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBvbGQgIT09ICdzdHJpbmcnKSB7XG4gICAgLy8gSWYgaXQgaXMgc29tZXRoaW5nIG90aGVyIHRoYW4gbnVtYmVyIG9yIHN0cmluZyxcbiAgICAvLyByZXR1cm4gdGhlIG9yaWdpbmFsIHN0cmluZ1xuICAgIHJldHVybiBzdHI7XG4gIH0gLy8gQ2FzdCBudW1iZXJzIGluIHRoZSByZXBsYWNlbWVudCB0byBzdHJpbmdcblxuXG4gIGlmICh0eXBlb2Ygc3RyID09PSAnbnVtYmVyJykge1xuICAgIHN0ciA9ICcnICsgc3RyO1xuICB9IC8vIElmIGJ5IG5vdywgd2UgZG9uJ3QgaGF2ZSBhIHN0cmluZywgdGhyb3cgaXQgYmFja1xuXG5cbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnICYmICEoc3RyIGluc3RhbmNlb2Ygci5TYWZlU3RyaW5nKSkge1xuICAgIHJldHVybiBzdHI7XG4gIH0gLy8gU2hvcnRDaXJjdWl0c1xuXG5cbiAgaWYgKG9sZCA9PT0gJycpIHtcbiAgICAvLyBNaW1pYyB0aGUgcHl0aG9uIGJlaGF2aW91cjogZW1wdHkgc3RyaW5nIGlzIHJlcGxhY2VkXG4gICAgLy8gYnkgcmVwbGFjZW1lbnQgZS5nLiBcImFiY1wifHJlcGxhY2UoXCJcIiwgXCIuXCIpIC0+IC5hLmIuYy5cbiAgICByZXMgPSBuZXdfICsgc3RyLnNwbGl0KCcnKS5qb2luKG5ld18pICsgbmV3XztcbiAgICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCByZXMpO1xuICB9XG5cbiAgdmFyIG5leHRJbmRleCA9IHN0ci5pbmRleE9mKG9sZCk7IC8vIGlmICMgb2YgcmVwbGFjZW1lbnRzIHRvIHBlcmZvcm0gaXMgMCwgb3IgdGhlIHN0cmluZyB0byBkb2VzXG4gIC8vIG5vdCBjb250YWluIHRoZSBvbGQgdmFsdWUsIHJldHVybiB0aGUgc3RyaW5nXG5cbiAgaWYgKG1heENvdW50ID09PSAwIHx8IG5leHRJbmRleCA9PT0gLTEpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgdmFyIHBvcyA9IDA7XG4gIHZhciBjb3VudCA9IDA7IC8vICMgb2YgcmVwbGFjZW1lbnRzIG1hZGVcblxuICB3aGlsZSAobmV4dEluZGV4ID4gLTEgJiYgKG1heENvdW50ID09PSAtMSB8fCBjb3VudCA8IG1heENvdW50KSkge1xuICAgIC8vIEdyYWIgdGhlIG5leHQgY2h1bmsgb2Ygc3JjIHN0cmluZyBhbmQgYWRkIGl0IHdpdGggdGhlXG4gICAgLy8gcmVwbGFjZW1lbnQsIHRvIHRoZSByZXN1bHRcbiAgICByZXMgKz0gc3RyLnN1YnN0cmluZyhwb3MsIG5leHRJbmRleCkgKyBuZXdfOyAvLyBJbmNyZW1lbnQgb3VyIHBvaW50ZXIgaW4gdGhlIHNyYyBzdHJpbmdcblxuICAgIHBvcyA9IG5leHRJbmRleCArIG9sZC5sZW5ndGg7XG4gICAgY291bnQrKzsgLy8gU2VlIGlmIHRoZXJlIGFyZSBhbnkgbW9yZSByZXBsYWNlbWVudHMgdG8gYmUgbWFkZVxuXG4gICAgbmV4dEluZGV4ID0gc3RyLmluZGV4T2Yob2xkLCBwb3MpO1xuICB9IC8vIFdlJ3ZlIGVpdGhlciByZWFjaGVkIHRoZSBlbmQsIG9yIGRvbmUgdGhlIG1heCAjIG9mXG4gIC8vIHJlcGxhY2VtZW50cywgdGFjayBvbiBhbnkgcmVtYWluaW5nIHN0cmluZ1xuXG5cbiAgaWYgKHBvcyA8IHN0ci5sZW5ndGgpIHtcbiAgICByZXMgKz0gc3RyLnN1YnN0cmluZyhwb3MpO1xuICB9XG5cbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKG9yaWdpbmFsU3RyLCByZXMpO1xufVxuXG5leHBvcnRzLnJlcGxhY2UgPSByZXBsYWNlO1xuXG5mdW5jdGlvbiByZXZlcnNlKHZhbCkge1xuICB2YXIgYXJyO1xuXG4gIGlmIChsaWIuaXNTdHJpbmcodmFsKSkge1xuICAgIGFyciA9IGxpc3QodmFsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBDb3B5IGl0XG4gICAgYXJyID0gbGliLm1hcCh2YWwsIGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9KTtcbiAgfVxuXG4gIGFyci5yZXZlcnNlKCk7XG5cbiAgaWYgKGxpYi5pc1N0cmluZyh2YWwpKSB7XG4gICAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHZhbCwgYXJyLmpvaW4oJycpKTtcbiAgfVxuXG4gIHJldHVybiBhcnI7XG59XG5cbmV4cG9ydHMucmV2ZXJzZSA9IHJldmVyc2U7XG5cbmZ1bmN0aW9uIHJvdW5kKHZhbCwgcHJlY2lzaW9uLCBtZXRob2QpIHtcbiAgcHJlY2lzaW9uID0gcHJlY2lzaW9uIHx8IDA7XG4gIHZhciBmYWN0b3IgPSBNYXRoLnBvdygxMCwgcHJlY2lzaW9uKTtcbiAgdmFyIHJvdW5kZXI7XG5cbiAgaWYgKG1ldGhvZCA9PT0gJ2NlaWwnKSB7XG4gICAgcm91bmRlciA9IE1hdGguY2VpbDtcbiAgfSBlbHNlIGlmIChtZXRob2QgPT09ICdmbG9vcicpIHtcbiAgICByb3VuZGVyID0gTWF0aC5mbG9vcjtcbiAgfSBlbHNlIHtcbiAgICByb3VuZGVyID0gTWF0aC5yb3VuZDtcbiAgfVxuXG4gIHJldHVybiByb3VuZGVyKHZhbCAqIGZhY3RvcikgLyBmYWN0b3I7XG59XG5cbmV4cG9ydHMucm91bmQgPSByb3VuZDtcblxuZnVuY3Rpb24gc2xpY2UoYXJyLCBzbGljZXMsIGZpbGxXaXRoKSB7XG4gIHZhciBzbGljZUxlbmd0aCA9IE1hdGguZmxvb3IoYXJyLmxlbmd0aCAvIHNsaWNlcyk7XG4gIHZhciBleHRyYSA9IGFyci5sZW5ndGggJSBzbGljZXM7XG4gIHZhciByZXMgPSBbXTtcbiAgdmFyIG9mZnNldCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZXM7IGkrKykge1xuICAgIHZhciBzdGFydCA9IG9mZnNldCArIGkgKiBzbGljZUxlbmd0aDtcblxuICAgIGlmIChpIDwgZXh0cmEpIHtcbiAgICAgIG9mZnNldCsrO1xuICAgIH1cblxuICAgIHZhciBlbmQgPSBvZmZzZXQgKyAoaSArIDEpICogc2xpY2VMZW5ndGg7XG4gICAgdmFyIGN1cnJTbGljZSA9IGFyci5zbGljZShzdGFydCwgZW5kKTtcblxuICAgIGlmIChmaWxsV2l0aCAmJiBpID49IGV4dHJhKSB7XG4gICAgICBjdXJyU2xpY2UucHVzaChmaWxsV2l0aCk7XG4gICAgfVxuXG4gICAgcmVzLnB1c2goY3VyclNsaWNlKTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydHMuc2xpY2UgPSBzbGljZTtcblxuZnVuY3Rpb24gc3VtKGFyciwgYXR0ciwgc3RhcnQpIHtcbiAgaWYgKHN0YXJ0ID09PSB2b2lkIDApIHtcbiAgICBzdGFydCA9IDA7XG4gIH1cblxuICBpZiAoYXR0cikge1xuICAgIGFyciA9IGxpYi5tYXAoYXJyLCBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHZbYXR0cl07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gc3RhcnQgKyBhcnIucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgKyBiO1xuICB9LCAwKTtcbn1cblxuZXhwb3J0cy5zdW0gPSBzdW07XG5leHBvcnRzLnNvcnQgPSByLm1ha2VNYWNybyhbJ3ZhbHVlJywgJ3JldmVyc2UnLCAnY2FzZV9zZW5zaXRpdmUnLCAnYXR0cmlidXRlJ10sIFtdLCBmdW5jdGlvbiAoYXJyLCByZXZlcnNlZCwgY2FzZVNlbnMsIGF0dHIpIHtcbiAgLy8gQ29weSBpdFxuICB2YXIgYXJyYXkgPSBsaWIubWFwKGFyciwgZnVuY3Rpb24gKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfSk7XG4gIGFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgeCA9IGF0dHIgPyBhW2F0dHJdIDogYTtcbiAgICB2YXIgeSA9IGF0dHIgPyBiW2F0dHJdIDogYjtcblxuICAgIGlmICghY2FzZVNlbnMgJiYgbGliLmlzU3RyaW5nKHgpICYmIGxpYi5pc1N0cmluZyh5KSkge1xuICAgICAgeCA9IHgudG9Mb3dlckNhc2UoKTtcbiAgICAgIHkgPSB5LnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgaWYgKHggPCB5KSB7XG4gICAgICByZXR1cm4gcmV2ZXJzZWQgPyAxIDogLTE7XG4gICAgfSBlbHNlIGlmICh4ID4geSkge1xuICAgICAgcmV0dXJuIHJldmVyc2VkID8gLTEgOiAxO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59KTtcblxuZnVuY3Rpb24gc3RyaW5nKG9iaikge1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Mob2JqLCBvYmopO1xufVxuXG5leHBvcnRzLnN0cmluZyA9IHN0cmluZztcblxuZnVuY3Rpb24gc3RyaXB0YWdzKGlucHV0LCBwcmVzZXJ2ZUxpbmVicmVha3MpIHtcbiAgaW5wdXQgPSBub3JtYWxpemUoaW5wdXQsICcnKTtcbiAgdmFyIHRhZ3MgPSAvPFxcLz8oW2Etel1bYS16MC05XSopXFxiW14+XSo+fDwhLS1bXFxzXFxTXSo/LS0+L2dpO1xuICB2YXIgdHJpbW1lZElucHV0ID0gdHJpbShpbnB1dC5yZXBsYWNlKHRhZ3MsICcnKSk7XG4gIHZhciByZXMgPSAnJztcblxuICBpZiAocHJlc2VydmVMaW5lYnJlYWtzKSB7XG4gICAgcmVzID0gdHJpbW1lZElucHV0LnJlcGxhY2UoL14gK3wgKyQvZ20sICcnKSAvLyByZW1vdmUgbGVhZGluZyBhbmQgdHJhaWxpbmcgc3BhY2VzXG4gICAgLnJlcGxhY2UoLyArL2csICcgJykgLy8gc3F1YXNoIGFkamFjZW50IHNwYWNlc1xuICAgIC5yZXBsYWNlKC8oXFxyXFxuKS9nLCAnXFxuJykgLy8gbm9ybWFsaXplIGxpbmVicmVha3MgKENSTEYgLT4gTEYpXG4gICAgLnJlcGxhY2UoL1xcblxcblxcbisvZywgJ1xcblxcbicpOyAvLyBzcXVhc2ggYWJub3JtYWwgYWRqYWNlbnQgbGluZWJyZWFrc1xuICB9IGVsc2Uge1xuICAgIHJlcyA9IHRyaW1tZWRJbnB1dC5yZXBsYWNlKC9cXHMrL2dpLCAnICcpO1xuICB9XG5cbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKGlucHV0LCByZXMpO1xufVxuXG5leHBvcnRzLnN0cmlwdGFncyA9IHN0cmlwdGFncztcblxuZnVuY3Rpb24gdGl0bGUoc3RyKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgdmFyIHdvcmRzID0gc3RyLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgcmV0dXJuIGNhcGl0YWxpemUod29yZCk7XG4gIH0pO1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Moc3RyLCB3b3Jkcy5qb2luKCcgJykpO1xufVxuXG5leHBvcnRzLnRpdGxlID0gdGl0bGU7XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJykpO1xufVxuXG5leHBvcnRzLnRyaW0gPSB0cmltO1xuXG5mdW5jdGlvbiB0cnVuY2F0ZShpbnB1dCwgbGVuZ3RoLCBraWxsd29yZHMsIGVuZCkge1xuICB2YXIgb3JpZyA9IGlucHV0O1xuICBpbnB1dCA9IG5vcm1hbGl6ZShpbnB1dCwgJycpO1xuICBsZW5ndGggPSBsZW5ndGggfHwgMjU1O1xuXG4gIGlmIChpbnB1dC5sZW5ndGggPD0gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgaWYgKGtpbGx3b3Jkcykge1xuICAgIGlucHV0ID0gaW5wdXQuc3Vic3RyaW5nKDAsIGxlbmd0aCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGlkeCA9IGlucHV0Lmxhc3RJbmRleE9mKCcgJywgbGVuZ3RoKTtcblxuICAgIGlmIChpZHggPT09IC0xKSB7XG4gICAgICBpZHggPSBsZW5ndGg7XG4gICAgfVxuXG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgaWR4KTtcbiAgfVxuXG4gIGlucHV0ICs9IGVuZCAhPT0gdW5kZWZpbmVkICYmIGVuZCAhPT0gbnVsbCA/IGVuZCA6ICcuLi4nO1xuICByZXR1cm4gci5jb3B5U2FmZW5lc3Mob3JpZywgaW5wdXQpO1xufVxuXG5leHBvcnRzLnRydW5jYXRlID0gdHJ1bmNhdGU7XG5cbmZ1bmN0aW9uIHVwcGVyKHN0cikge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHJldHVybiBzdHIudG9VcHBlckNhc2UoKTtcbn1cblxuZXhwb3J0cy51cHBlciA9IHVwcGVyO1xuXG5mdW5jdGlvbiB1cmxlbmNvZGUob2JqKSB7XG4gIHZhciBlbmMgPSBlbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgaWYgKGxpYi5pc1N0cmluZyhvYmopKSB7XG4gICAgcmV0dXJuIGVuYyhvYmopO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXl2YWxzID0gbGliLmlzQXJyYXkob2JqKSA/IG9iaiA6IGxpYi5fZW50cmllcyhvYmopO1xuICAgIHJldHVybiBrZXl2YWxzLm1hcChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBrID0gX3JlZjJbMF0sXG4gICAgICAgICAgdiA9IF9yZWYyWzFdO1xuICAgICAgcmV0dXJuIGVuYyhrKSArIFwiPVwiICsgZW5jKHYpO1xuICAgIH0pLmpvaW4oJyYnKTtcbiAgfVxufVxuXG5leHBvcnRzLnVybGVuY29kZSA9IHVybGVuY29kZTsgLy8gRm9yIHRoZSBqaW5qYSByZWdleHAsIHNlZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21pdHN1aGlrby9qaW5qYTIvYmxvYi9mMTViODE0ZGNiYTZhYTEyYmM3NGQxZjdkMGM4ODFkNTVmNzEyNmJlL2ppbmphMi91dGlscy5weSNMMjAtTDIzXG5cbnZhciBwdW5jUmUgPSAvXig/OlxcKHw8fCZsdDspPyguKj8pKD86XFwufCx8XFwpfFxcbnwmZ3Q7KT8kLzsgLy8gZnJvbSBodHRwOi8vYmxvZy5nZXJ2Lm5ldC8yMDExLzA1L2h0bWw1X2VtYWlsX2FkZHJlc3NfcmVnZXhwL1xuXG52YXIgZW1haWxSZSA9IC9eW1xcdy4hIyQlJicqK1xcLVxcLz0/XFxeYHt8fX5dK0BbYS16XFxkXFwtXSsoXFwuW2EtelxcZFxcLV0rKSskL2k7XG52YXIgaHR0cEh0dHBzUmUgPSAvXmh0dHBzPzpcXC9cXC8uKiQvO1xudmFyIHd3d1JlID0gL153d3dcXC4vO1xudmFyIHRsZFJlID0gL1xcLig/Om9yZ3xuZXR8Y29tKSg/OlxcOnxcXC98JCkvO1xuXG5mdW5jdGlvbiB1cmxpemUoc3RyLCBsZW5ndGgsIG5vZm9sbG93KSB7XG4gIGlmIChpc05hTihsZW5ndGgpKSB7XG4gICAgbGVuZ3RoID0gSW5maW5pdHk7XG4gIH1cblxuICB2YXIgbm9Gb2xsb3dBdHRyID0gbm9mb2xsb3cgPT09IHRydWUgPyAnIHJlbD1cIm5vZm9sbG93XCInIDogJyc7XG4gIHZhciB3b3JkcyA9IHN0ci5zcGxpdCgvKFxccyspLykuZmlsdGVyKGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgLy8gSWYgdGhlIHdvcmQgaGFzIG5vIGxlbmd0aCwgYmFpbC4gVGhpcyBjYW4gaGFwcGVuIGZvciBzdHIgd2l0aFxuICAgIC8vIHRyYWlsaW5nIHdoaXRlc3BhY2UuXG4gICAgcmV0dXJuIHdvcmQgJiYgd29yZC5sZW5ndGg7XG4gIH0pLm1hcChmdW5jdGlvbiAod29yZCkge1xuICAgIHZhciBtYXRjaGVzID0gd29yZC5tYXRjaChwdW5jUmUpO1xuICAgIHZhciBwb3NzaWJsZVVybCA9IG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogd29yZDtcbiAgICB2YXIgc2hvcnRVcmwgPSBwb3NzaWJsZVVybC5zdWJzdHIoMCwgbGVuZ3RoKTsgLy8gdXJsIHRoYXQgc3RhcnRzIHdpdGggaHR0cCBvciBodHRwc1xuXG4gICAgaWYgKGh0dHBIdHRwc1JlLnRlc3QocG9zc2libGVVcmwpKSB7XG4gICAgICByZXR1cm4gXCI8YSBocmVmPVxcXCJcIiArIHBvc3NpYmxlVXJsICsgXCJcXFwiXCIgKyBub0ZvbGxvd0F0dHIgKyBcIj5cIiArIHNob3J0VXJsICsgXCI8L2E+XCI7XG4gICAgfSAvLyB1cmwgdGhhdCBzdGFydHMgd2l0aCB3d3cuXG5cblxuICAgIGlmICh3d3dSZS50ZXN0KHBvc3NpYmxlVXJsKSkge1xuICAgICAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiaHR0cDovL1wiICsgcG9zc2libGVVcmwgKyBcIlxcXCJcIiArIG5vRm9sbG93QXR0ciArIFwiPlwiICsgc2hvcnRVcmwgKyBcIjwvYT5cIjtcbiAgICB9IC8vIGFuIGVtYWlsIGFkZHJlc3Mgb2YgdGhlIGZvcm0gdXNlcm5hbWVAZG9tYWluLnRsZFxuXG5cbiAgICBpZiAoZW1haWxSZS50ZXN0KHBvc3NpYmxlVXJsKSkge1xuICAgICAgcmV0dXJuIFwiPGEgaHJlZj1cXFwibWFpbHRvOlwiICsgcG9zc2libGVVcmwgKyBcIlxcXCI+XCIgKyBwb3NzaWJsZVVybCArIFwiPC9hPlwiO1xuICAgIH0gLy8gdXJsIHRoYXQgZW5kcyBpbiAuY29tLCAub3JnIG9yIC5uZXQgdGhhdCBpcyBub3QgYW4gZW1haWwgYWRkcmVzc1xuXG5cbiAgICBpZiAodGxkUmUudGVzdChwb3NzaWJsZVVybCkpIHtcbiAgICAgIHJldHVybiBcIjxhIGhyZWY9XFxcImh0dHA6Ly9cIiArIHBvc3NpYmxlVXJsICsgXCJcXFwiXCIgKyBub0ZvbGxvd0F0dHIgKyBcIj5cIiArIHNob3J0VXJsICsgXCI8L2E+XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdvcmQ7XG4gIH0pO1xuICByZXR1cm4gd29yZHMuam9pbignJyk7XG59XG5cbmV4cG9ydHMudXJsaXplID0gdXJsaXplO1xuXG5mdW5jdGlvbiB3b3JkY291bnQoc3RyKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgdmFyIHdvcmRzID0gc3RyID8gc3RyLm1hdGNoKC9cXHcrL2cpIDogbnVsbDtcbiAgcmV0dXJuIHdvcmRzID8gd29yZHMubGVuZ3RoIDogbnVsbDtcbn1cblxuZXhwb3J0cy53b3JkY291bnQgPSB3b3JkY291bnQ7XG5cbmZ1bmN0aW9uIGZsb2F0KHZhbCwgZGVmKSB7XG4gIHZhciByZXMgPSBwYXJzZUZsb2F0KHZhbCk7XG4gIHJldHVybiBpc05hTihyZXMpID8gZGVmIDogcmVzO1xufVxuXG5leHBvcnRzLmZsb2F0ID0gZmxvYXQ7XG5cbmZ1bmN0aW9uIGludCh2YWwsIGRlZikge1xuICB2YXIgcmVzID0gcGFyc2VJbnQodmFsLCAxMCk7XG4gIHJldHVybiBpc05hTihyZXMpID8gZGVmIDogcmVzO1xufVxuXG5leHBvcnRzLmludCA9IGludDsgLy8gQWxpYXNlc1xuXG5leHBvcnRzLmQgPSBleHBvcnRzLmRlZmF1bHQ7XG5leHBvcnRzLmUgPSBleHBvcnRzLmVzY2FwZTtcblxuLyoqKi8gfSksXG4vKiAxOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIExvYWRlciA9IF9fd2VicGFja19yZXF1aXJlX18oNik7XG5cbnZhciBQcmVjb21waWxlZExvYWRlciA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0xvYWRlcikge1xuICBfaW5oZXJpdHNMb29zZShQcmVjb21waWxlZExvYWRlciwgX0xvYWRlcik7XG5cbiAgZnVuY3Rpb24gUHJlY29tcGlsZWRMb2FkZXIoY29tcGlsZWRUZW1wbGF0ZXMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9Mb2FkZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLnByZWNvbXBpbGVkID0gY29tcGlsZWRUZW1wbGF0ZXMgfHwge307XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFByZWNvbXBpbGVkTG9hZGVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8uZ2V0U291cmNlID0gZnVuY3Rpb24gZ2V0U291cmNlKG5hbWUpIHtcbiAgICBpZiAodGhpcy5wcmVjb21waWxlZFtuYW1lXSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3JjOiB7XG4gICAgICAgICAgdHlwZTogJ2NvZGUnLFxuICAgICAgICAgIG9iajogdGhpcy5wcmVjb21waWxlZFtuYW1lXVxuICAgICAgICB9LFxuICAgICAgICBwYXRoOiBuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIHJldHVybiBQcmVjb21waWxlZExvYWRlcjtcbn0oTG9hZGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFByZWNvbXBpbGVkTG9hZGVyOiBQcmVjb21waWxlZExvYWRlclxufTtcblxuLyoqKi8gfSksXG4vKiAyMCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgU2FmZVN0cmluZyA9IF9fd2VicGFja19yZXF1aXJlX18oMikuU2FmZVN0cmluZztcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBpcyBhIGZ1bmN0aW9uLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cblxuZnVuY3Rpb24gY2FsbGFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZXhwb3J0cy5jYWxsYWJsZSA9IGNhbGxhYmxlO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0IGlzIHN0cmljdGx5IG5vdCBgdW5kZWZpbmVkYC5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydHMuZGVmaW5lZCA9IGRlZmluZWQ7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGRpdmlzYmxlIGJ5IHRoZSB0ZXN0J3MgYXJndW1lbnRcbiAqICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZGl2aXNpYmxlYnkob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSAlIHR3byA9PT0gMDtcbn1cblxuZXhwb3J0cy5kaXZpc2libGVieSA9IGRpdmlzaWJsZWJ5O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBoYXMgYmVlbiBlc2NhcGVkIChpLmUuLCBpcyBhIFNhZmVTdHJpbmcpLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZXNjYXBlZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBTYWZlU3RyaW5nO1xufVxuXG5leHBvcnRzLmVzY2FwZWQgPSBlc2NhcGVkO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqIEBwYXJhbSB7IGFueSB9IG9uZVxuICogQHBhcmFtIHsgYW55IH0gdHdvXG4gKi9cblxuZnVuY3Rpb24gZXF1YWx0byhvbmUsIHR3bykge1xuICByZXR1cm4gb25lID09PSB0d287XG59XG5cbmV4cG9ydHMuZXF1YWx0byA9IGVxdWFsdG87IC8vIEFsaWFzZXNcblxuZXhwb3J0cy5lcSA9IGV4cG9ydHMuZXF1YWx0bztcbmV4cG9ydHMuc2FtZWFzID0gZXhwb3J0cy5lcXVhbHRvO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgZXZlbmx5IGRpdmlzaWJsZSBieSAyLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZXZlbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJSAyID09PSAwO1xufVxuXG5leHBvcnRzLmV2ZW4gPSBldmVuO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgZmFsc3kgLSBpZiBJIHJlY2FsbCBjb3JyZWN0bHksICcnLCAwLCBmYWxzZSxcbiAqIHVuZGVmaW5lZCwgTmFOIG9yIG51bGwuIEkgZG9uJ3Qga25vdyBpZiB3ZSBzaG91bGQgc3RpY2sgdG8gdGhlIGRlZmF1bHQgSlNcbiAqIGJlaGF2aW9yIG9yIGF0dGVtcHQgdG8gcmVwbGljYXRlIHdoYXQgUHl0aG9uIGJlbGlldmVzIHNob3VsZCBiZSBmYWxzeSAoaS5lLixcbiAqIGVtcHR5IGFycmF5cywgZW1wdHkgZGljdHMsIG5vdCAwLi4uKS5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGZhbHN5KHZhbHVlKSB7XG4gIHJldHVybiAhdmFsdWU7XG59XG5cbmV4cG9ydHMuZmFsc3kgPSBmYWxzeTtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgZ3JlYXRlciBvciBlcXVhbCB0byB0aGUgdGVzdCdzXG4gKiBhcmd1bWVudCAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGdlKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgPj0gdHdvO1xufVxuXG5leHBvcnRzLmdlID0gZ2U7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGdyZWF0ZXIgdGhhbiB0aGUgdGVzdCdzIGFyZ3VtZW50XG4gKiAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGdyZWF0ZXJ0aGFuKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgPiB0d287XG59XG5cbmV4cG9ydHMuZ3JlYXRlcnRoYW4gPSBncmVhdGVydGhhbjsgLy8gYWxpYXNcblxuZXhwb3J0cy5ndCA9IGV4cG9ydHMuZ3JlYXRlcnRoYW47XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGxlc3MgdGhhbiBvciBlcXVhbCB0byB0aGUgdGVzdCdzXG4gKiBhcmd1bWVudCAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGxlKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgPD0gdHdvO1xufVxuXG5leHBvcnRzLmxlID0gbGU7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvcGVyYW5kIChvbmUpIGlzIGxlc3MgdGhhbiB0aGUgdGVzdCdzIHBhc3NlZCBhcmd1bWVudFxuICogKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBsZXNzdGhhbihvbmUsIHR3bykge1xuICByZXR1cm4gb25lIDwgdHdvO1xufVxuXG5leHBvcnRzLmxlc3N0aGFuID0gbGVzc3RoYW47IC8vIGFsaWFzXG5cbmV4cG9ydHMubHQgPSBleHBvcnRzLmxlc3N0aGFuO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3RyaW5nIGlzIGxvd2VyY2FzZWQuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBsb3dlcih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUudG9Mb3dlckNhc2UoKSA9PT0gdmFsdWU7XG59XG5cbmV4cG9ydHMubG93ZXIgPSBsb3dlcjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB0ZXN0J3NcbiAqIGFyZ3VtZW50ICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbmUob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSAhPT0gdHdvO1xufVxuXG5leHBvcnRzLm5lID0gbmU7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdmFsdWUgaXMgc3RyaWN0bHkgZXF1YWwgdG8gYG51bGxgLlxuICogQHBhcmFtIHsgYW55IH1cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbnVsbFRlc3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsO1xufVxuXG5leHBvcnRzLm51bGwgPSBudWxsVGVzdDtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQHBhcmFtIHsgYW55IH1cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbnVtYmVyKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInO1xufVxuXG5leHBvcnRzLm51bWJlciA9IG51bWJlcjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzICpub3QqIGV2ZW5seSBkaXZpc2libGUgYnkgMi5cbiAqIEBwYXJhbSB7IG51bWJlciB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIG9kZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJSAyID09PSAxO1xufVxuXG5leHBvcnRzLm9kZCA9IG9kZDtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGEgc3RyaW5nLCBgZmFsc2VgIGlmIG5vdC5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIHN0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbn1cblxuZXhwb3J0cy5zdHJpbmcgPSBzdHJpbmc7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBub3QgaW4gdGhlIGxpc3Qgb2YgdGhpbmdzIGNvbnNpZGVyZWQgZmFsc3k6XG4gKiAnJywgbnVsbCwgdW5kZWZpbmVkLCAwLCBOYU4gYW5kIGZhbHNlLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gdHJ1dGh5KHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlO1xufVxuXG5leHBvcnRzLnRydXRoeSA9IHRydXRoeTtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZC5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIHVuZGVmaW5lZFRlc3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydHMudW5kZWZpbmVkID0gdW5kZWZpbmVkVGVzdDtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHN0cmluZyBpcyB1cHBlcmNhc2VkLlxuICogQHBhcmFtIHsgc3RyaW5nIH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gdXBwZXIodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnRvVXBwZXJDYXNlKCkgPT09IHZhbHVlO1xufVxuXG5leHBvcnRzLnVwcGVyID0gdXBwZXI7XG4vKipcbiAqIElmIEVTNiBmZWF0dXJlcyBhcmUgYXZhaWxhYmxlLCByZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaW1wbGVtZW50cyB0aGVcbiAqIGBTeW1ib2wuaXRlcmF0b3JgIG1ldGhvZC4gSWYgbm90LCBpdCdzIGEgc3RyaW5nIG9yIEFycmF5LlxuICpcbiAqIENvdWxkIHBvdGVudGlhbGx5IGNhdXNlIGlzc3VlcyBpZiBhIGJyb3dzZXIgZXhpc3RzIHRoYXQgaGFzIFNldCBhbmQgTWFwIGJ1dFxuICogbm90IFN5bWJvbC5cbiAqXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBpdGVyYWJsZSh2YWx1ZSkge1xuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gISF2YWx1ZVtTeW1ib2wuaXRlcmF0b3JdO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuICB9XG59XG5cbmV4cG9ydHMuaXRlcmFibGUgPSBpdGVyYWJsZTtcbi8qKlxuICogSWYgRVM2IGZlYXR1cmVzIGFyZSBhdmFpbGFibGUsIHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QgaGFzaFxuICogb3IgYW4gRVM2IE1hcC4gT3RoZXJ3aXNlIGp1c3QgcmV0dXJuIGlmIGl0J3MgYW4gb2JqZWN0IGhhc2guXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBtYXBwaW5nKHZhbHVlKSB7XG4gIC8vIG9ubHkgbWFwcyBhbmQgb2JqZWN0IGhhc2hlc1xuICB2YXIgYm9vbCA9IHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cbiAgaWYgKFNldCkge1xuICAgIHJldHVybiBib29sICYmICEodmFsdWUgaW5zdGFuY2VvZiBTZXQpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBib29sO1xuICB9XG59XG5cbmV4cG9ydHMubWFwcGluZyA9IG1hcHBpbmc7XG5cbi8qKiovIH0pLFxuLyogMjEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2N5Y2xlcihpdGVtcykge1xuICB2YXIgaW5kZXggPSAtMTtcbiAgcmV0dXJuIHtcbiAgICBjdXJyZW50OiBudWxsLFxuICAgIHJlc2V0OiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICAgIGluZGV4ID0gLTE7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgIH0sXG4gICAgbmV4dDogZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIGluZGV4Kys7XG5cbiAgICAgIGlmIChpbmRleCA+PSBpdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmN1cnJlbnQgPSBpdGVtc1tpbmRleF07XG4gICAgICByZXR1cm4gdGhpcy5jdXJyZW50O1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gX2pvaW5lcihzZXApIHtcbiAgc2VwID0gc2VwIHx8ICcsJztcbiAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsID0gZmlyc3QgPyAnJyA6IHNlcDtcbiAgICBmaXJzdCA9IGZhbHNlO1xuICAgIHJldHVybiB2YWw7XG4gIH07XG59IC8vIE1ha2luZyB0aGlzIGEgZnVuY3Rpb24gaW5zdGVhZCBzbyBpdCByZXR1cm5zIGEgbmV3IG9iamVjdFxuLy8gZWFjaCB0aW1lIGl0J3MgY2FsbGVkLiBUaGF0IHdheSwgaWYgc29tZXRoaW5nIGxpa2UgYW4gZW52aXJvbm1lbnRcbi8vIHVzZXMgaXQsIHRoZXkgd2lsbCBlYWNoIGhhdmUgdGhlaXIgb3duIGNvcHkuXG5cblxuZnVuY3Rpb24gZ2xvYmFscygpIHtcbiAgcmV0dXJuIHtcbiAgICByYW5nZTogZnVuY3Rpb24gcmFuZ2Uoc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgIGlmICh0eXBlb2Ygc3RvcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc3RvcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IDA7XG4gICAgICAgIHN0ZXAgPSAxO1xuICAgICAgfSBlbHNlIGlmICghc3RlcCkge1xuICAgICAgICBzdGVwID0gMTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyciA9IFtdO1xuXG4gICAgICBpZiAoc3RlcCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgc3RvcDsgaSArPSBzdGVwKSB7XG4gICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gc3RhcnQ7IF9pID4gc3RvcDsgX2kgKz0gc3RlcCkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZm9yLWRpcmVjdGlvblxuICAgICAgICAgIGFyci5wdXNoKF9pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0sXG4gICAgY3ljbGVyOiBmdW5jdGlvbiBjeWNsZXIoKSB7XG4gICAgICByZXR1cm4gX2N5Y2xlcihBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9LFxuICAgIGpvaW5lcjogZnVuY3Rpb24gam9pbmVyKHNlcCkge1xuICAgICAgcmV0dXJuIF9qb2luZXIoc2VwKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFscztcblxuLyoqKi8gfSksXG4vKiAyMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgcGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXhwcmVzcyhlbnYsIGFwcCkge1xuICBmdW5jdGlvbiBOdW5qdWNrc1ZpZXcobmFtZSwgb3B0cykge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5wYXRoID0gbmFtZTtcbiAgICB0aGlzLmRlZmF1bHRFbmdpbmUgPSBvcHRzLmRlZmF1bHRFbmdpbmU7XG4gICAgdGhpcy5leHQgPSBwYXRoLmV4dG5hbWUobmFtZSk7XG5cbiAgICBpZiAoIXRoaXMuZXh0ICYmICF0aGlzLmRlZmF1bHRFbmdpbmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZGVmYXVsdCBlbmdpbmUgd2FzIHNwZWNpZmllZCBhbmQgbm8gZXh0ZW5zaW9uIHdhcyBwcm92aWRlZC4nKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZXh0KSB7XG4gICAgICB0aGlzLm5hbWUgKz0gdGhpcy5leHQgPSAodGhpcy5kZWZhdWx0RW5naW5lWzBdICE9PSAnLicgPyAnLicgOiAnJykgKyB0aGlzLmRlZmF1bHRFbmdpbmU7XG4gICAgfVxuICB9XG5cbiAgTnVuanVja3NWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIob3B0cywgY2IpIHtcbiAgICBlbnYucmVuZGVyKHRoaXMubmFtZSwgb3B0cywgY2IpO1xuICB9O1xuXG4gIGFwcC5zZXQoJ3ZpZXcnLCBOdW5qdWNrc1ZpZXcpO1xuICBhcHAuc2V0KCdudW5qdWNrc0VudicsIGVudik7XG4gIHJldHVybiBlbnY7XG59O1xuXG4vKioqLyB9KSxcbi8qIDIzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBmcyA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBwYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgICBfcHJldHRpZnlFcnJvciA9IF9yZXF1aXJlLl9wcmV0dGlmeUVycm9yO1xuXG52YXIgY29tcGlsZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG52YXIgX3JlcXVpcmUyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg3KSxcbiAgICBFbnZpcm9ubWVudCA9IF9yZXF1aXJlMi5FbnZpcm9ubWVudDtcblxudmFyIHByZWNvbXBpbGVHbG9iYWwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDI0KTtcblxuZnVuY3Rpb24gbWF0Y2goZmlsZW5hbWUsIHBhdHRlcm5zKSB7XG4gIGlmICghQXJyYXkuaXNBcnJheShwYXR0ZXJucykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcGF0dGVybnMuc29tZShmdW5jdGlvbiAocGF0dGVybikge1xuICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaChwYXR0ZXJuKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByZWNvbXBpbGVTdHJpbmcoc3RyLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBvcHRzLmlzU3RyaW5nID0gdHJ1ZTtcbiAgdmFyIGVudiA9IG9wdHMuZW52IHx8IG5ldyBFbnZpcm9ubWVudChbXSk7XG4gIHZhciB3cmFwcGVyID0gb3B0cy53cmFwcGVyIHx8IHByZWNvbXBpbGVHbG9iYWw7XG5cbiAgaWYgKCFvcHRzLm5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3RoZSBcIm5hbWVcIiBvcHRpb24gaXMgcmVxdWlyZWQgd2hlbiBjb21waWxpbmcgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyKFtfcHJlY29tcGlsZShzdHIsIG9wdHMubmFtZSwgZW52KV0sIG9wdHMpO1xufVxuXG5mdW5jdGlvbiBwcmVjb21waWxlKGlucHV0LCBvcHRzKSB7XG4gIC8vIFRoZSBmb2xsb3dpbmcgb3B0aW9ucyBhcmUgYXZhaWxhYmxlOlxuICAvL1xuICAvLyAqIG5hbWU6IG5hbWUgb2YgdGhlIHRlbXBsYXRlIChhdXRvLWdlbmVyYXRlZCB3aGVuIGNvbXBpbGluZyBhIGRpcmVjdG9yeSlcbiAgLy8gKiBpc1N0cmluZzogaW5wdXQgaXMgYSBzdHJpbmcsIG5vdCBhIGZpbGUgcGF0aFxuICAvLyAqIGFzRnVuY3Rpb246IGdlbmVyYXRlIGEgY2FsbGFibGUgZnVuY3Rpb25cbiAgLy8gKiBmb3JjZToga2VlcCBjb21waWxpbmcgb24gZXJyb3JcbiAgLy8gKiBlbnY6IHRoZSBFbnZpcm9ubWVudCB0byB1c2UgKGdldHMgZXh0ZW5zaW9ucyBhbmQgYXN5bmMgZmlsdGVycyBmcm9tIGl0KVxuICAvLyAqIGluY2x1ZGU6IHdoaWNoIGZpbGUvZm9sZGVycyB0byBpbmNsdWRlIChmb2xkZXJzIGFyZSBhdXRvLWluY2x1ZGVkLCBmaWxlcyBhcmUgYXV0by1leGNsdWRlZClcbiAgLy8gKiBleGNsdWRlOiB3aGljaCBmaWxlL2ZvbGRlcnMgdG8gZXhjbHVkZSAoZm9sZGVycyBhcmUgYXV0by1pbmNsdWRlZCwgZmlsZXMgYXJlIGF1dG8tZXhjbHVkZWQpXG4gIC8vICogd3JhcHBlcjogZnVuY3Rpb24odGVtcGxhdGVzLCBvcHRzKSB7Li4ufVxuICAvLyAgICAgICBDdXN0b21pemUgdGhlIG91dHB1dCBmb3JtYXQgdG8gc3RvcmUgdGhlIGNvbXBpbGVkIHRlbXBsYXRlLlxuICAvLyAgICAgICBCeSBkZWZhdWx0LCB0ZW1wbGF0ZXMgYXJlIHN0b3JlZCBpbiBhIGdsb2JhbCB2YXJpYWJsZSB1c2VkIGJ5IHRoZSBydW50aW1lLlxuICAvLyAgICAgICBBIGN1c3RvbSBsb2FkZXIgd2lsbCBiZSBuZWNlc3NhcnkgdG8gbG9hZCB5b3VyIGN1c3RvbSB3cmFwcGVyLlxuICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgdmFyIGVudiA9IG9wdHMuZW52IHx8IG5ldyBFbnZpcm9ubWVudChbXSk7XG4gIHZhciB3cmFwcGVyID0gb3B0cy53cmFwcGVyIHx8IHByZWNvbXBpbGVHbG9iYWw7XG5cbiAgaWYgKG9wdHMuaXNTdHJpbmcpIHtcbiAgICByZXR1cm4gcHJlY29tcGlsZVN0cmluZyhpbnB1dCwgb3B0cyk7XG4gIH1cblxuICB2YXIgcGF0aFN0YXRzID0gZnMuZXhpc3RzU3luYyhpbnB1dCkgJiYgZnMuc3RhdFN5bmMoaW5wdXQpO1xuICB2YXIgcHJlY29tcGlsZWQgPSBbXTtcbiAgdmFyIHRlbXBsYXRlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFkZFRlbXBsYXRlcyhkaXIpIHtcbiAgICBmcy5yZWFkZGlyU3luYyhkaXIpLmZvckVhY2goZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgIHZhciBmaWxlcGF0aCA9IHBhdGguam9pbihkaXIsIGZpbGUpO1xuICAgICAgdmFyIHN1YnBhdGggPSBmaWxlcGF0aC5zdWJzdHIocGF0aC5qb2luKGlucHV0LCAnLycpLmxlbmd0aCk7XG4gICAgICB2YXIgc3RhdCA9IGZzLnN0YXRTeW5jKGZpbGVwYXRoKTtcblxuICAgICAgaWYgKHN0YXQgJiYgc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIHN1YnBhdGggKz0gJy8nO1xuXG4gICAgICAgIGlmICghbWF0Y2goc3VicGF0aCwgb3B0cy5leGNsdWRlKSkge1xuICAgICAgICAgIGFkZFRlbXBsYXRlcyhmaWxlcGF0aCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobWF0Y2goc3VicGF0aCwgb3B0cy5pbmNsdWRlKSkge1xuICAgICAgICB0ZW1wbGF0ZXMucHVzaChmaWxlcGF0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAocGF0aFN0YXRzLmlzRmlsZSgpKSB7XG4gICAgcHJlY29tcGlsZWQucHVzaChfcHJlY29tcGlsZShmcy5yZWFkRmlsZVN5bmMoaW5wdXQsICd1dGYtOCcpLCBvcHRzLm5hbWUgfHwgaW5wdXQsIGVudikpO1xuICB9IGVsc2UgaWYgKHBhdGhTdGF0cy5pc0RpcmVjdG9yeSgpKSB7XG4gICAgYWRkVGVtcGxhdGVzKGlucHV0KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGVtcGxhdGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmFtZSA9IHRlbXBsYXRlc1tpXS5yZXBsYWNlKHBhdGguam9pbihpbnB1dCwgJy8nKSwgJycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBwcmVjb21waWxlZC5wdXNoKF9wcmVjb21waWxlKGZzLnJlYWRGaWxlU3luYyh0ZW1wbGF0ZXNbaV0sICd1dGYtOCcpLCBuYW1lLCBlbnYpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWYgKG9wdHMuZm9yY2UpIHtcbiAgICAgICAgICAvLyBEb24ndCBzdG9wIGdlbmVyYXRpbmcgdGhlIG91dHB1dCBpZiB3ZSdyZVxuICAgICAgICAgIC8vIGZvcmNpbmcgY29tcGlsYXRpb24uXG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB3cmFwcGVyKHByZWNvbXBpbGVkLCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gX3ByZWNvbXBpbGUoc3RyLCBuYW1lLCBlbnYpIHtcbiAgZW52ID0gZW52IHx8IG5ldyBFbnZpcm9ubWVudChbXSk7XG4gIHZhciBhc3luY0ZpbHRlcnMgPSBlbnYuYXN5bmNGaWx0ZXJzO1xuICB2YXIgZXh0ZW5zaW9ucyA9IGVudi5leHRlbnNpb25zTGlzdDtcbiAgdmFyIHRlbXBsYXRlO1xuICBuYW1lID0gbmFtZS5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG5cbiAgdHJ5IHtcbiAgICB0ZW1wbGF0ZSA9IGNvbXBpbGVyLmNvbXBpbGUoc3RyLCBhc3luY0ZpbHRlcnMsIGV4dGVuc2lvbnMsIG5hbWUsIGVudi5vcHRzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhyb3cgX3ByZXR0aWZ5RXJyb3IobmFtZSwgZmFsc2UsIGVycik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgdGVtcGxhdGU6IHRlbXBsYXRlXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwcmVjb21waWxlOiBwcmVjb21waWxlLFxuICBwcmVjb21waWxlU3RyaW5nOiBwcmVjb21waWxlU3RyaW5nXG59O1xuXG4vKioqLyB9KSxcbi8qIDI0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIHByZWNvbXBpbGVHbG9iYWwodGVtcGxhdGVzLCBvcHRzKSB7XG4gIHZhciBvdXQgPSAnJztcbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmFtZSA9IEpTT04uc3RyaW5naWZ5KHRlbXBsYXRlc1tpXS5uYW1lKTtcbiAgICB2YXIgdGVtcGxhdGUgPSB0ZW1wbGF0ZXNbaV0udGVtcGxhdGU7XG4gICAgb3V0ICs9ICcoZnVuY3Rpb24oKSB7JyArICcod2luZG93Lm51bmp1Y2tzUHJlY29tcGlsZWQgPSB3aW5kb3cubnVuanVja3NQcmVjb21waWxlZCB8fCB7fSknICsgJ1snICsgbmFtZSArICddID0gKGZ1bmN0aW9uKCkge1xcbicgKyB0ZW1wbGF0ZSArICdcXG59KSgpO1xcbic7XG5cbiAgICBpZiAob3B0cy5hc0Z1bmN0aW9uKSB7XG4gICAgICBvdXQgKz0gJ3JldHVybiBmdW5jdGlvbihjdHgsIGNiKSB7IHJldHVybiBudW5qdWNrcy5yZW5kZXIoJyArIG5hbWUgKyAnLCBjdHgsIGNiKTsgfVxcbic7XG4gICAgfVxuXG4gICAgb3V0ICs9ICd9KSgpO1xcbic7XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHByZWNvbXBpbGVHbG9iYWw7XG5cbi8qKiovIH0pLFxuLyogMjUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuZnVuY3Rpb24gaW5zdGFsbENvbXBhdCgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgLy8gVGhpcyBtdXN0IGJlIGNhbGxlZCBsaWtlIGBudW5qdWNrcy5pbnN0YWxsQ29tcGF0YCBzbyB0aGF0IGB0aGlzYFxuICAvLyByZWZlcmVuY2VzIHRoZSBudW5qdWNrcyBpbnN0YW5jZVxuXG4gIHZhciBydW50aW1lID0gdGhpcy5ydW50aW1lO1xuICB2YXIgbGliID0gdGhpcy5saWI7IC8vIEhhbmRsZSBzbGltIGNhc2Ugd2hlcmUgdGhlc2UgJ21vZHVsZXMnIGFyZSBleGNsdWRlZCBmcm9tIHRoZSBidWlsdCBzb3VyY2VcblxuICB2YXIgQ29tcGlsZXIgPSB0aGlzLmNvbXBpbGVyLkNvbXBpbGVyO1xuICB2YXIgUGFyc2VyID0gdGhpcy5wYXJzZXIuUGFyc2VyO1xuICB2YXIgbm9kZXMgPSB0aGlzLm5vZGVzO1xuICB2YXIgbGV4ZXIgPSB0aGlzLmxleGVyO1xuICB2YXIgb3JpZ19jb250ZXh0T3JGcmFtZUxvb2t1cCA9IHJ1bnRpbWUuY29udGV4dE9yRnJhbWVMb29rdXA7XG4gIHZhciBvcmlnX21lbWJlckxvb2t1cCA9IHJ1bnRpbWUubWVtYmVyTG9va3VwO1xuICB2YXIgb3JpZ19Db21waWxlcl9hc3NlcnRUeXBlO1xuICB2YXIgb3JpZ19QYXJzZXJfcGFyc2VBZ2dyZWdhdGU7XG5cbiAgaWYgKENvbXBpbGVyKSB7XG4gICAgb3JpZ19Db21waWxlcl9hc3NlcnRUeXBlID0gQ29tcGlsZXIucHJvdG90eXBlLmFzc2VydFR5cGU7XG4gIH1cblxuICBpZiAoUGFyc2VyKSB7XG4gICAgb3JpZ19QYXJzZXJfcGFyc2VBZ2dyZWdhdGUgPSBQYXJzZXIucHJvdG90eXBlLnBhcnNlQWdncmVnYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5pbnN0YWxsKCkge1xuICAgIHJ1bnRpbWUuY29udGV4dE9yRnJhbWVMb29rdXAgPSBvcmlnX2NvbnRleHRPckZyYW1lTG9va3VwO1xuICAgIHJ1bnRpbWUubWVtYmVyTG9va3VwID0gb3JpZ19tZW1iZXJMb29rdXA7XG5cbiAgICBpZiAoQ29tcGlsZXIpIHtcbiAgICAgIENvbXBpbGVyLnByb3RvdHlwZS5hc3NlcnRUeXBlID0gb3JpZ19Db21waWxlcl9hc3NlcnRUeXBlO1xuICAgIH1cblxuICAgIGlmIChQYXJzZXIpIHtcbiAgICAgIFBhcnNlci5wcm90b3R5cGUucGFyc2VBZ2dyZWdhdGUgPSBvcmlnX1BhcnNlcl9wYXJzZUFnZ3JlZ2F0ZTtcbiAgICB9XG4gIH1cblxuICBydW50aW1lLmNvbnRleHRPckZyYW1lTG9va3VwID0gZnVuY3Rpb24gY29udGV4dE9yRnJhbWVMb29rdXAoY29udGV4dCwgZnJhbWUsIGtleSkge1xuICAgIHZhciB2YWwgPSBvcmlnX2NvbnRleHRPckZyYW1lTG9va3VwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodmFsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuXG4gICAgc3dpdGNoIChrZXkpIHtcbiAgICAgIGNhc2UgJ1RydWUnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSAnRmFsc2UnOlxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGNhc2UgJ05vbmUnOlxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gZ2V0VG9rZW5zU3RhdGUodG9rZW5zKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluZGV4OiB0b2tlbnMuaW5kZXgsXG4gICAgICBsaW5lbm86IHRva2Vucy5saW5lbm8sXG4gICAgICBjb2xubzogdG9rZW5zLmNvbG5vXG4gICAgfTtcbiAgfVxuXG4gIGlmIChcIlNURFwiICE9PSAnU0xJTScgJiYgbm9kZXMgJiYgQ29tcGlsZXIgJiYgUGFyc2VyKSB7XG4gICAgLy8gaS5lLiwgbm90IHNsaW0gbW9kZVxuICAgIHZhciBTbGljZSA9IG5vZGVzLk5vZGUuZXh0ZW5kKCdTbGljZScsIHtcbiAgICAgIGZpZWxkczogWydzdGFydCcsICdzdG9wJywgJ3N0ZXAnXSxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQobGluZW5vLCBjb2xubywgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICAgICAgc3RhcnQgPSBzdGFydCB8fCBuZXcgbm9kZXMuTGl0ZXJhbChsaW5lbm8sIGNvbG5vLCBudWxsKTtcbiAgICAgICAgc3RvcCA9IHN0b3AgfHwgbmV3IG5vZGVzLkxpdGVyYWwobGluZW5vLCBjb2xubywgbnVsbCk7XG4gICAgICAgIHN0ZXAgPSBzdGVwIHx8IG5ldyBub2Rlcy5MaXRlcmFsKGxpbmVubywgY29sbm8sIDEpO1xuICAgICAgICB0aGlzLnBhcmVudChsaW5lbm8sIGNvbG5vLCBzdGFydCwgc3RvcCwgc3RlcCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBDb21waWxlci5wcm90b3R5cGUuYXNzZXJ0VHlwZSA9IGZ1bmN0aW9uIGFzc2VydFR5cGUobm9kZSkge1xuICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBTbGljZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG9yaWdfQ29tcGlsZXJfYXNzZXJ0VHlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBDb21waWxlci5wcm90b3R5cGUuY29tcGlsZVNsaWNlID0gZnVuY3Rpb24gY29tcGlsZVNsaWNlKG5vZGUsIGZyYW1lKSB7XG4gICAgICB0aGlzLl9lbWl0KCcoJyk7XG5cbiAgICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUuc3RhcnQsIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdCgnKSwoJyk7XG5cbiAgICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUuc3RvcCwgZnJhbWUpO1xuXG4gICAgICB0aGlzLl9lbWl0KCcpLCgnKTtcblxuICAgICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5zdGVwLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgICB9O1xuXG4gICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFnZ3JlZ2F0ZSA9IGZ1bmN0aW9uIHBhcnNlQWdncmVnYXRlKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdmFyIG9yaWdTdGF0ZSA9IGdldFRva2Vuc1N0YXRlKHRoaXMudG9rZW5zKTsgLy8gU2V0IGJhY2sgb25lIGFjY291bnRpbmcgZm9yIG9wZW5pbmcgYnJhY2tldC9wYXJlbnNcblxuICAgICAgb3JpZ1N0YXRlLmNvbG5vLS07XG4gICAgICBvcmlnU3RhdGUuaW5kZXgtLTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG9yaWdfUGFyc2VyX3BhcnNlQWdncmVnYXRlLmFwcGx5KHRoaXMpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB2YXIgZXJyU3RhdGUgPSBnZXRUb2tlbnNTdGF0ZSh0aGlzLnRva2Vucyk7XG5cbiAgICAgICAgdmFyIHJldGhyb3cgPSBmdW5jdGlvbiByZXRocm93KCkge1xuICAgICAgICAgIGxpYi5fYXNzaWduKF90aGlzLnRva2VucywgZXJyU3RhdGUpO1xuXG4gICAgICAgICAgcmV0dXJuIGU7XG4gICAgICAgIH07IC8vIFJlc2V0IHRvIHN0YXRlIGJlZm9yZSBvcmlnaW5hbCBwYXJzZUFnZ3JlZ2F0ZSBjYWxsZWRcblxuXG4gICAgICAgIGxpYi5fYXNzaWduKHRoaXMudG9rZW5zLCBvcmlnU3RhdGUpO1xuXG4gICAgICAgIHRoaXMucGVla2VkID0gZmFsc2U7XG4gICAgICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgICAgIGlmICh0b2sudHlwZSAhPT0gbGV4ZXIuVE9LRU5fTEVGVF9CUkFDS0VUKSB7XG4gICAgICAgICAgdGhyb3cgcmV0aHJvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbm9kZSA9IG5ldyBTbGljZSh0b2subGluZW5vLCB0b2suY29sbm8pOyAvLyBJZiB3ZSBkb24ndCBlbmNvdW50ZXIgYSBjb2xvbiB3aGlsZSBwYXJzaW5nLCB0aGlzIGlzIG5vdCBhIHNsaWNlLFxuICAgICAgICAvLyBzbyByZS1yYWlzZSB0aGUgb3JpZ2luYWwgZXhjZXB0aW9uLlxuXG4gICAgICAgIHZhciBpc1NsaWNlID0gZmFsc2U7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbm9kZS5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodGhpcy5za2lwKGxleGVyLlRPS0VOX1JJR0hUX0JSQUNLRVQpKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaSA9PT0gbm9kZS5maWVsZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaXNTbGljZSkge1xuICAgICAgICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlU2xpY2U6IHRvbyBtYW55IHNsaWNlIGNvbXBvbmVudHMnLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuc2tpcChsZXhlci5UT0tFTl9DT0xPTikpIHtcbiAgICAgICAgICAgIGlzU2xpY2UgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBub2RlLmZpZWxkc1tpXTtcbiAgICAgICAgICAgIG5vZGVbZmllbGRdID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgICAgICAgIGlzU2xpY2UgPSB0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09MT04pIHx8IGlzU2xpY2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1NsaWNlKSB7XG4gICAgICAgICAgdGhyb3cgcmV0aHJvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBub2Rlcy5BcnJheSh0b2subGluZW5vLCB0b2suY29sbm8sIFtub2RlXSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWNlTG9va3VwKG9iaiwgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBvYmogPSBvYmogfHwgW107XG5cbiAgICBpZiAoc3RhcnQgPT09IG51bGwpIHtcbiAgICAgIHN0YXJ0ID0gc3RlcCA8IDAgPyBvYmoubGVuZ3RoIC0gMSA6IDA7XG4gICAgfVxuXG4gICAgaWYgKHN0b3AgPT09IG51bGwpIHtcbiAgICAgIHN0b3AgPSBzdGVwIDwgMCA/IC0xIDogb2JqLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHN0b3AgPCAwKSB7XG4gICAgICBzdG9wICs9IG9iai5sZW5ndGg7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0IDwgMCkge1xuICAgICAgc3RhcnQgKz0gb2JqLmxlbmd0aDtcbiAgICB9XG5cbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IHN0YXJ0OzsgaSArPSBzdGVwKSB7XG4gICAgICBpZiAoaSA8IDAgfHwgaSA+IG9iai5sZW5ndGgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID4gMCAmJiBpID49IHN0b3ApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwIDwgMCAmJiBpIDw9IHN0b3ApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaChydW50aW1lLm1lbWJlckxvb2t1cChvYmosIGkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc093blByb3Aob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfVxuXG4gIHZhciBBUlJBWV9NRU1CRVJTID0ge1xuICAgIHBvcDogZnVuY3Rpb24gcG9wKGluZGV4KSB7XG4gICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wb3AoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluZGV4ID49IHRoaXMubGVuZ3RoIHx8IGluZGV4IDwgMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleUVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfSxcbiAgICBhcHBlbmQ6IGZ1bmN0aW9uIGFwcGVuZChlbGVtZW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGVsZW1lbnQpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWVFcnJvcicpO1xuICAgIH0sXG4gICAgY291bnQ6IGZ1bmN0aW9uIGNvdW50KGVsZW1lbnQpIHtcbiAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpc1tpXSA9PT0gZWxlbWVudCkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH0sXG4gICAgaW5kZXg6IGZ1bmN0aW9uIGluZGV4KGVsZW1lbnQpIHtcbiAgICAgIHZhciBpO1xuXG4gICAgICBpZiAoKGkgPSB0aGlzLmluZGV4T2YoZWxlbWVudCkpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlRXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGk7XG4gICAgfSxcbiAgICBmaW5kOiBmdW5jdGlvbiBmaW5kKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLmluZGV4T2YoZWxlbWVudCk7XG4gICAgfSxcbiAgICBpbnNlcnQ6IGZ1bmN0aW9uIGluc2VydChpbmRleCwgZWxlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAwLCBlbGVtKTtcbiAgICB9XG4gIH07XG4gIHZhciBPQkpFQ1RfTUVNQkVSUyA9IHtcbiAgICBpdGVtczogZnVuY3Rpb24gaXRlbXMoKSB7XG4gICAgICByZXR1cm4gbGliLl9lbnRyaWVzKHRoaXMpO1xuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoKSB7XG4gICAgICByZXR1cm4gbGliLl92YWx1ZXModGhpcyk7XG4gICAgfSxcbiAgICBrZXlzOiBmdW5jdGlvbiBrZXlzKCkge1xuICAgICAgcmV0dXJuIGxpYi5rZXlzKHRoaXMpO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoa2V5LCBkZWYpIHtcbiAgICAgIHZhciBvdXRwdXQgPSB0aGlzW2tleV07XG5cbiAgICAgIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRwdXQgPSBkZWY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfSxcbiAgICBoYXNfa2V5OiBmdW5jdGlvbiBoYXNfa2V5KGtleSkge1xuICAgICAgcmV0dXJuIGhhc093blByb3AodGhpcywga2V5KTtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24gcG9wKGtleSwgZGVmKSB7XG4gICAgICB2YXIgb3V0cHV0ID0gdGhpc1trZXldO1xuXG4gICAgICBpZiAob3V0cHV0ID09PSB1bmRlZmluZWQgJiYgZGVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgb3V0cHV0ID0gZGVmO1xuICAgICAgfSBlbHNlIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleUVycm9yJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb3V0cHV0O1xuICAgIH0sXG4gICAgcG9waXRlbTogZnVuY3Rpb24gcG9waXRlbSgpIHtcbiAgICAgIHZhciBrZXlzID0gbGliLmtleXModGhpcyk7XG5cbiAgICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdLZXlFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICB2YXIgayA9IGtleXNbMF07XG4gICAgICB2YXIgdmFsID0gdGhpc1trXTtcbiAgICAgIGRlbGV0ZSB0aGlzW2tdO1xuICAgICAgcmV0dXJuIFtrLCB2YWxdO1xuICAgIH0sXG4gICAgc2V0ZGVmYXVsdDogZnVuY3Rpb24gc2V0ZGVmYXVsdChrZXksIGRlZikge1xuICAgICAgaWYgKGRlZiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGRlZiA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghKGtleSBpbiB0aGlzKSkge1xuICAgICAgICB0aGlzW2tleV0gPSBkZWY7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShrd2FyZ3MpIHtcbiAgICAgIGxpYi5fYXNzaWduKHRoaXMsIGt3YXJncyk7XG5cbiAgICAgIHJldHVybiBudWxsOyAvLyBBbHdheXMgcmV0dXJucyBOb25lXG4gICAgfVxuICB9O1xuICBPQkpFQ1RfTUVNQkVSUy5pdGVyaXRlbXMgPSBPQkpFQ1RfTUVNQkVSUy5pdGVtcztcbiAgT0JKRUNUX01FTUJFUlMuaXRlcnZhbHVlcyA9IE9CSkVDVF9NRU1CRVJTLnZhbHVlcztcbiAgT0JKRUNUX01FTUJFUlMuaXRlcmtleXMgPSBPQkpFQ1RfTUVNQkVSUy5rZXlzO1xuXG4gIHJ1bnRpbWUubWVtYmVyTG9va3VwID0gZnVuY3Rpb24gbWVtYmVyTG9va3VwKG9iaiwgdmFsLCBhdXRvZXNjYXBlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgIHJldHVybiBzbGljZUxvb2t1cC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIG9iaiA9IG9iaiB8fCB7fTsgLy8gSWYgdGhlIG9iamVjdCBpcyBhbiBvYmplY3QsIHJldHVybiBhbnkgb2YgdGhlIG1ldGhvZHMgdGhhdCBQeXRob24gd291bGRcbiAgICAvLyBvdGhlcndpc2UgcHJvdmlkZS5cblxuICAgIGlmIChsaWIuaXNBcnJheShvYmopICYmIGhhc093blByb3AoQVJSQVlfTUVNQkVSUywgdmFsKSkge1xuICAgICAgcmV0dXJuIEFSUkFZX01FTUJFUlNbdmFsXS5iaW5kKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKGxpYi5pc09iamVjdChvYmopICYmIGhhc093blByb3AoT0JKRUNUX01FTUJFUlMsIHZhbCkpIHtcbiAgICAgIHJldHVybiBPQkpFQ1RfTUVNQkVSU1t2YWxdLmJpbmQob2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3JpZ19tZW1iZXJMb29rdXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICByZXR1cm4gdW5pbnN0YWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3RhbGxDb21wYXQ7XG5cbi8qKiovIH0pXG4vKioqKioqLyBdKTtcbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bnVuanVja3MuanMubWFwIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBuZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MvYnJvd3Nlci5qcycpLm5leHRUaWNrO1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGltbWVkaWF0ZUlkcyA9IHt9O1xudmFyIG5leHRJbW1lZGlhdGVJZCA9IDA7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7IHRpbWVvdXQuY2xvc2UoKTsgfTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogZnVuY3Rpb24oZm4pIHtcbiAgdmFyIGlkID0gbmV4dEltbWVkaWF0ZUlkKys7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBpbW1lZGlhdGVJZHNbaWRdID0gdHJ1ZTtcblxuICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xuICAgIGlmIChpbW1lZGlhdGVJZHNbaWRdKSB7XG4gICAgICAvLyBmbi5jYWxsKCkgaXMgZmFzdGVyIHNvIHdlIG9wdGltaXplIGZvciB0aGUgY29tbW9uIHVzZS1jYXNlXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5jYWxsKG51bGwpO1xuICAgICAgfVxuICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXG4gICAgICBleHBvcnRzLmNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSB0eXBlb2YgY2xlYXJJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IGNsZWFySW1tZWRpYXRlIDogZnVuY3Rpb24oaWQpIHtcbiAgZGVsZXRlIGltbWVkaWF0ZUlkc1tpZF07XG59OyIsImltcG9ydCBDb250cm9sbGVyIGZyb20gJy4vbGliL2NvbnRyb2xsZXInO1xyXG5pbXBvcnQgbnVuanVja3MgZnJvbSAnbnVuanVja3MnO1xyXG5cclxubnVuanVja3MuY29uZmlndXJlKCcuL2Rpc3QnKTtcclxuXHJcbmZ1bmN0aW9uIGdldE5hbWUocmVxdWVzdCkge1xyXG4gICAgLy8gc2V0IGRlZmF1bHRzXHJcbiAgICBsZXQgbmFtZSA9IHtcclxuICAgICAgICBmbmFtZTogXCJOZXdcIixcclxuICAgICAgICBsbmFtZTogXCJVc2VyXCJcclxuICAgIH07XHJcbiAgICAvLyBzcGxpdCBwYXRoIHBhcmFtc1xyXG4gICAgbGV0IG5hbWVQYXJ0cyA9IHJlcXVlc3QucGFyYW1zLm5hbWUgPyByZXF1ZXN0LnBhcmFtcy5uYW1lLnNwbGl0KCcvJykgOiBbXTtcclxuICAgIG5hbWUuZm5hbWUgPSAobmFtZVBhcnRzWzBdIHx8IHJlcXVlc3QucXVlcnkuZm5hbWUpIHx8IG5hbWUuZm5hbWU7XHJcbiAgICBuYW1lLmxuYW1lID0gKG5hbWVQYXJ0c1sxXSB8fCByZXF1ZXN0LnF1ZXJ5LmxuYW1lKSB8fCBuYW1lLmxuYW1lO1xyXG4gICAgcmV0dXJuIG5hbWU7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVsbG9Db250cm9sbGVyIGV4dGVuZHMgQ29udHJvbGxlciB7XHJcbiAgICB0b1N0cmluZyhjYWxsYmFjaykge1xyXG4gICAgICAgIG51bmp1Y2tzLnJlbmRlcignaGVsbG8uaHRtbCcsIGdldE5hbWUodGhpcy5jb250ZXh0KSwgKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlcyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59ICAiLCJpbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9saWInO1xyXG5pbXBvcnQgSGVsbG9Db250cm9sbGVyIGZyb20gJy4vSGVsbG9Db250cm9sbGVyJztcclxuXHJcbiBjb25zdCBhcHBsaWNhdGlvbiA9IG5ldyBBcHBsaWNhdGlvbih7XHJcbiAgICAgJy9oZWxsby97bmFtZSp9JzogSGVsbG9Db250cm9sbGVyXHJcbiB9LCB7XHJcbiAgICAgLy8gcXVlcnkgc2VsZWN0b3IgZm9yIGVsZW1lbnQgdG8gaW5qZWN0IHJlc3BvbnNlIGludG9cclxuICAgICB0YXJnZXQ6ICdib2R5J1xyXG4gfSk7XHJcblxyXG4gYXBwbGljYXRpb24uc3RhcnQoKTtcclxuY29uc29sZS5sb2coXCJ0ZXN0IGNsaWVudCBpbmRleFwiKTsiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sbGVyIHtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoY29udGV4dCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGluZGV4KGFwcGxpY2F0aW9uLCByZXF1ZXN0LCBoLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvU3RyaW5nKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgJ3N1Y2Nlc3MnKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcGxpY2F0aW9uIHtcclxuICAgIG5hdmlnYXRlKHVybCwgcHVzaD10cnVlKSB7XHJcbiAgICAgICAgLy8gaWYgYnJvd3NlciBkb2VzbnQgc3VwcG9ydCBoaXN0b3J5IEFQSSwgZ28gdG8gdXJsXHJcbiAgICAgICAgaWYgKCFoaXN0b3J5LnB1c2hTdGF0ZSkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB1cmw7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcclxuICAgICAgICBpZihwdXNoKSB7XHJcbiAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCB1cmwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVyIGZvciByZWRpcmVjdHNcclxuICAgICAgICB0aGlzLnBvcFN0YXRlTGlzdGVuZXIgPSB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQge3BhdGhuYW1lLCBzZWFyY2h9ID0gd2luZG93LmxvY2F0aW9uO1xyXG4gICAgICAgICAgICBsZXQgdXJsID0gYCR7cGF0aG5hbWV9JHtzZWFyY2h9YDtcclxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZSh1cmwsIGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHtcclxuICAgICAgICAgICAgbGV0IHt0YXJnZXR9ID0gZTtcclxuICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSB0YXJnZXQuZGF0YXNldC5uYXZpZ2F0ZTtcclxuICAgICAgICAgICAgbGV0IGhyZWYgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaWRlbnRpZmllciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB1c2VyIGNsaWNrZWQgb24gYW4gaHJlZiwgcHJldmVudCBkZWZhdWx0XHJcbiAgICAgICAgICAgICAgICBpZiAoaHJlZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIG5hdmlnYXRlIHRvIGhyZWYgaWYgdGhlcmVcclxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGUoaWRlbnRpZmllciB8fCBocmVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmNvbnNvbGUubG9nKFwiVGVzdCBjbGllbnQgbGliXCIpOyJdfQ==
