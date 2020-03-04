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

var _indexClient = _interopRequireDefault(require("./lib/index.client.js"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var application = new _indexClient["default"]({
  '/hello/{name*}': _HelloController["default"]
}, {
  // query selector for element to inject response into
  target: 'body'
});
application.start();
console.log("test client index");

},{"./HelloController":4,"./lib/index.client.js":7}],6:[function(require,module,exports){
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
        console.log("Clicked");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbnVuanVja3MvYnJvd3Nlci9udW5qdWNrcy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsInNyYy9IZWxsb0NvbnRyb2xsZXIuanMiLCJzcmMvaW5kZXguY2xpZW50LmpzIiwic3JjL2xpYi9jb250cm9sbGVyLmpzIiwic3JjL2xpYi9pbmRleC5jbGllbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzNFQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLHFCQUFTLFNBQVQsQ0FBbUIsUUFBbkI7O0FBRUEsU0FBUyxPQUFULENBQWlCLE9BQWpCLEVBQTBCO0FBQ3RCO0FBQ0EsTUFBSSxJQUFJLEdBQUc7QUFDUCxJQUFBLEtBQUssRUFBRSxLQURBO0FBRVAsSUFBQSxLQUFLLEVBQUU7QUFGQSxHQUFYLENBRnNCLENBTXRCOztBQUNBLE1BQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFSLENBQWUsSUFBZixHQUFzQixPQUFPLENBQUMsTUFBUixDQUFlLElBQWYsQ0FBb0IsS0FBcEIsQ0FBMEIsR0FBMUIsQ0FBdEIsR0FBdUQsRUFBdkU7QUFDQSxFQUFBLElBQUksQ0FBQyxLQUFMLEdBQWMsU0FBUyxDQUFDLENBQUQsQ0FBVCxJQUFnQixPQUFPLENBQUMsS0FBUixDQUFjLEtBQS9CLElBQXlDLElBQUksQ0FBQyxLQUEzRDtBQUNBLEVBQUEsSUFBSSxDQUFDLEtBQUwsR0FBYyxTQUFTLENBQUMsQ0FBRCxDQUFULElBQWdCLE9BQU8sQ0FBQyxLQUFSLENBQWMsS0FBL0IsSUFBeUMsSUFBSSxDQUFDLEtBQTNEO0FBQ0EsU0FBTyxJQUFQO0FBQ0g7O0lBQ29CLGU7Ozs7Ozs7Ozs7OzZCQUNSLFEsRUFBVTtBQUNmLDJCQUFTLE1BQVQsQ0FBZ0IsWUFBaEIsRUFBOEIsT0FBTyxDQUFDLEtBQUssT0FBTixDQUFyQyxFQUFxRCxVQUFDLEdBQUQsRUFBTSxHQUFOLEVBQWM7QUFDL0QsWUFBSSxHQUFKLEVBQVM7QUFDTCxpQkFBTyxRQUFRLENBQUMsR0FBRCxFQUFNLElBQU4sQ0FBZjtBQUNIOztBQUNELFFBQUEsUUFBUSxDQUFDLElBQUQsRUFBTyxHQUFQLENBQVI7QUFDSCxPQUxEO0FBTUg7Ozs7RUFSd0Msc0I7Ozs7Ozs7QUNqQjdDOztBQUNBOzs7O0FBRUMsSUFBTSxXQUFXLEdBQUcsSUFBSSx1QkFBSixDQUFnQjtBQUNoQyxvQkFBa0I7QUFEYyxDQUFoQixFQUVqQjtBQUNDO0FBQ0EsRUFBQSxNQUFNLEVBQUU7QUFGVCxDQUZpQixDQUFwQjtBQU9BLFdBQVcsQ0FBQyxLQUFaO0FBQ0QsT0FBTyxDQUFDLEdBQVIsQ0FBWSxtQkFBWjs7Ozs7Ozs7Ozs7Ozs7OztJQ1hxQixVO0FBRWpCLHNCQUFZLE9BQVosRUFBcUI7QUFBQTs7QUFDakIsU0FBSyxPQUFMLEdBQWUsT0FBZjtBQUNIOzs7OzBCQUdLLFcsRUFBYSxPLEVBQVMsQyxFQUFHLFEsRUFBVTtBQUNyQyxNQUFBLFFBQVEsQ0FBQyxJQUFELENBQVI7QUFDSDs7OzZCQUVRLFEsRUFBVTtBQUNmLE1BQUEsUUFBUSxDQUFDLElBQUQsRUFBTyxTQUFQLENBQVI7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2JnQixXOzs7Ozs7OzZCQUNSLEcsRUFBZ0I7QUFBQSxVQUFYLElBQVcsdUVBQU4sSUFBTTs7QUFDckI7QUFDQSxVQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsRUFBd0I7QUFDcEIsUUFBQSxNQUFNLENBQUMsUUFBUCxHQUFrQixHQUFsQjtBQUNBO0FBQ0g7O0FBQ0QsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLEdBQVo7O0FBQ0EsVUFBRyxJQUFILEVBQVM7QUFDTCxRQUFBLE9BQU8sQ0FBQyxTQUFSLENBQWtCLEVBQWxCLEVBQXNCLElBQXRCLEVBQTRCLEdBQTVCO0FBQ0g7QUFDSjs7OzRCQUNPO0FBQUE7O0FBQ0o7QUFDQSxXQUFLLGdCQUFMLEdBQXdCLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixVQUF4QixFQUFvQyxVQUFDLENBQUQsRUFBTztBQUFBLCtCQUN0QyxNQUFNLENBQUMsUUFEK0I7QUFBQSxZQUMxRCxRQUQwRCxvQkFDMUQsUUFEMEQ7QUFBQSxZQUNoRCxNQURnRCxvQkFDaEQsTUFEZ0Q7QUFFL0QsWUFBSSxHQUFHLGFBQU0sUUFBTixTQUFpQixNQUFqQixDQUFQOztBQUNBLFFBQUEsS0FBSSxDQUFDLFFBQUwsQ0FBYyxHQUFkLEVBQW1CLEtBQW5CO0FBQ0gsT0FKdUIsQ0FBeEI7QUFLQSxXQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGdCQUFULENBQTBCLE9BQTFCLEVBQWtDLFVBQUMsQ0FBRCxFQUFPO0FBQzFELFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO0FBRDBELFlBRXJELE1BRnFELEdBRTNDLENBRjJDLENBRXJELE1BRnFEO0FBRzFELFlBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxPQUFQLENBQWUsUUFBaEM7QUFDQSxZQUFJLElBQUksR0FBRyxNQUFNLENBQUMsWUFBUCxDQUFvQixNQUFwQixDQUFYOztBQUVBLFlBQUksVUFBVSxLQUFLLFNBQW5CLEVBQThCO0FBQzFCO0FBQ0EsY0FBSSxJQUFKLEVBQVU7QUFDTixZQUFBLENBQUMsQ0FBQyxjQUFGO0FBQ0gsV0FKeUIsQ0FLMUI7OztBQUNBLFVBQUEsS0FBSSxDQUFDLFFBQUwsQ0FBYyxVQUFVLElBQUksSUFBNUI7QUFDSDtBQUNKLE9BZG9CLENBQXJCO0FBZUg7Ozs7Ozs7QUFFTCxPQUFPLENBQUMsR0FBUixDQUFZLGlCQUFaIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyohIEJyb3dzZXIgYnVuZGxlIG9mIG51bmp1Y2tzIDMuMi4wICAqL1xuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibnVuanVja3NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wibnVuanVja3NcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gLyoqKioqKi8gKGZ1bmN0aW9uKG1vZHVsZXMpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuLyoqKioqKi8gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovIFx0XHR9XG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRpOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGw6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovXG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4vKioqKioqLyBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4vKioqKioqLyBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4vKioqKioqLyBcdFx0cmV0dXJuIGdldHRlcjtcbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG52YXIgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xudmFyIGVzY2FwZU1hcCA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnXCInOiAnJnF1b3Q7JyxcbiAgJ1xcJyc6ICcmIzM5OycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7J1xufTtcbnZhciBlc2NhcGVSZWdleCA9IC9bJlwiJzw+XS9nO1xudmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5mdW5jdGlvbiBoYXNPd25Qcm9wKG9iaiwgaykge1xuICByZXR1cm4gT2JqUHJvdG8uaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGspO1xufVxuXG5leHBvcnRzLmhhc093blByb3AgPSBoYXNPd25Qcm9wO1xuXG5mdW5jdGlvbiBsb29rdXBFc2NhcGUoY2gpIHtcbiAgcmV0dXJuIGVzY2FwZU1hcFtjaF07XG59XG5cbmZ1bmN0aW9uIF9wcmV0dGlmeUVycm9yKHBhdGgsIHdpdGhJbnRlcm5hbHMsIGVycikge1xuICBpZiAoIWVyci5VcGRhdGUpIHtcbiAgICAvLyBub3Qgb25lIG9mIG91cnMsIGNhc3QgaXRcbiAgICBlcnIgPSBuZXcgZXhwb3J0cy5UZW1wbGF0ZUVycm9yKGVycik7XG4gIH1cblxuICBlcnIuVXBkYXRlKHBhdGgpOyAvLyBVbmxlc3MgdGhleSBtYXJrZWQgdGhlIGRldiBmbGFnLCBzaG93IHRoZW0gYSB0cmFjZSBmcm9tIGhlcmVcblxuICBpZiAoIXdpdGhJbnRlcm5hbHMpIHtcbiAgICB2YXIgb2xkID0gZXJyO1xuICAgIGVyciA9IG5ldyBFcnJvcihvbGQubWVzc2FnZSk7XG4gICAgZXJyLm5hbWUgPSBvbGQubmFtZTtcbiAgfVxuXG4gIHJldHVybiBlcnI7XG59XG5cbmV4cG9ydHMuX3ByZXR0aWZ5RXJyb3IgPSBfcHJldHRpZnlFcnJvcjtcblxuZnVuY3Rpb24gVGVtcGxhdGVFcnJvcihtZXNzYWdlLCBsaW5lbm8sIGNvbG5vKSB7XG4gIHZhciBlcnI7XG4gIHZhciBjYXVzZTtcblxuICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgY2F1c2UgPSBtZXNzYWdlO1xuICAgIG1lc3NhZ2UgPSBjYXVzZS5uYW1lICsgXCI6IFwiICsgY2F1c2UubWVzc2FnZTtcbiAgfVxuXG4gIGlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgICBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGVyciwgVGVtcGxhdGVFcnJvci5wcm90b3R5cGUpO1xuICB9IGVsc2Uge1xuICAgIGVyciA9IHRoaXM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgJ21lc3NhZ2UnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgdmFsdWU6IG1lc3NhZ2VcbiAgICB9KTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsICduYW1lJywge1xuICAgIHZhbHVlOiAnVGVtcGxhdGUgcmVuZGVyIGVycm9yJ1xuICB9KTtcblxuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIHRoaXMuY29uc3RydWN0b3IpO1xuICB9XG5cbiAgdmFyIGdldFN0YWNrO1xuXG4gIGlmIChjYXVzZSkge1xuICAgIHZhciBzdGFja0Rlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNhdXNlLCAnc3RhY2snKTtcblxuICAgIGdldFN0YWNrID0gc3RhY2tEZXNjcmlwdG9yICYmIChzdGFja0Rlc2NyaXB0b3IuZ2V0IHx8IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBzdGFja0Rlc2NyaXB0b3IudmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWdldFN0YWNrKSB7XG4gICAgICBnZXRTdGFjayA9IGZ1bmN0aW9uIGdldFN0YWNrKCkge1xuICAgICAgICByZXR1cm4gY2F1c2Uuc3RhY2s7XG4gICAgICB9O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgc3RhY2sgPSBuZXcgRXJyb3IobWVzc2FnZSkuc3RhY2s7XG5cbiAgICBnZXRTdGFjayA9IGZ1bmN0aW9uIGdldFN0YWNrKCkge1xuICAgICAgcmV0dXJuIHN0YWNrO1xuICAgIH07XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCAnc3RhY2snLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gZ2V0U3RhY2suY2FsbChlcnIpO1xuICAgIH1cbiAgfSk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcnIsICdjYXVzZScsIHtcbiAgICB2YWx1ZTogY2F1c2VcbiAgfSk7XG4gIGVyci5saW5lbm8gPSBsaW5lbm87XG4gIGVyci5jb2xubyA9IGNvbG5vO1xuICBlcnIuZmlyc3RVcGRhdGUgPSB0cnVlO1xuXG4gIGVyci5VcGRhdGUgPSBmdW5jdGlvbiBVcGRhdGUocGF0aCkge1xuICAgIHZhciBtc2cgPSAnKCcgKyAocGF0aCB8fCAndW5rbm93biBwYXRoJykgKyAnKSc7IC8vIG9ubHkgc2hvdyBsaW5lbm8gKyBjb2xubyBuZXh0IHRvIHBhdGggb2YgdGVtcGxhdGVcbiAgICAvLyB3aGVyZSBlcnJvciBvY2N1cnJlZFxuXG4gICAgaWYgKHRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIGlmICh0aGlzLmxpbmVubyAmJiB0aGlzLmNvbG5vKSB7XG4gICAgICAgIG1zZyArPSBcIiBbTGluZSBcIiArIHRoaXMubGluZW5vICsgXCIsIENvbHVtbiBcIiArIHRoaXMuY29sbm8gKyBcIl1cIjtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5saW5lbm8pIHtcbiAgICAgICAgbXNnICs9IFwiIFtMaW5lIFwiICsgdGhpcy5saW5lbm8gKyBcIl1cIjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtc2cgKz0gJ1xcbiAnO1xuXG4gICAgaWYgKHRoaXMuZmlyc3RVcGRhdGUpIHtcbiAgICAgIG1zZyArPSAnICc7XG4gICAgfVxuXG4gICAgdGhpcy5tZXNzYWdlID0gbXNnICsgKHRoaXMubWVzc2FnZSB8fCAnJyk7XG4gICAgdGhpcy5maXJzdFVwZGF0ZSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHJldHVybiBlcnI7XG59XG5cbmlmIChPYmplY3Quc2V0UHJvdG90eXBlT2YpIHtcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKFRlbXBsYXRlRXJyb3IucHJvdG90eXBlLCBFcnJvci5wcm90b3R5cGUpO1xufSBlbHNlIHtcbiAgVGVtcGxhdGVFcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogVGVtcGxhdGVFcnJvclxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydHMuVGVtcGxhdGVFcnJvciA9IFRlbXBsYXRlRXJyb3I7XG5cbmZ1bmN0aW9uIGVzY2FwZSh2YWwpIHtcbiAgcmV0dXJuIHZhbC5yZXBsYWNlKGVzY2FwZVJlZ2V4LCBsb29rdXBFc2NhcGUpO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGVzY2FwZTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihvYmopIHtcbiAgcmV0dXJuIE9ialByb3RvLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHtcbiAgcmV0dXJuIE9ialByb3RvLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuZnVuY3Rpb24gaXNTdHJpbmcob2JqKSB7XG4gIHJldHVybiBPYmpQcm90by50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xufVxuXG5leHBvcnRzLmlzU3RyaW5nID0gaXNTdHJpbmc7XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gT2JqUHJvdG8udG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZXhwb3J0cy5pc09iamVjdCA9IGlzT2JqZWN0O1xuXG5mdW5jdGlvbiBncm91cEJ5KG9iaiwgdmFsKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgdmFyIGl0ZXJhdG9yID0gaXNGdW5jdGlvbih2YWwpID8gdmFsIDogZnVuY3Rpb24gKG8pIHtcbiAgICByZXR1cm4gb1t2YWxdO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHZhbHVlID0gb2JqW2ldO1xuICAgIHZhciBrZXkgPSBpdGVyYXRvcih2YWx1ZSwgaSk7XG4gICAgKHJlc3VsdFtrZXldIHx8IChyZXN1bHRba2V5XSA9IFtdKSkucHVzaCh2YWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnRzLmdyb3VwQnkgPSBncm91cEJ5O1xuXG5mdW5jdGlvbiB0b0FycmF5KG9iaikge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwob2JqKTtcbn1cblxuZXhwb3J0cy50b0FycmF5ID0gdG9BcnJheTtcblxuZnVuY3Rpb24gd2l0aG91dChhcnJheSkge1xuICB2YXIgcmVzdWx0ID0gW107XG5cbiAgaWYgKCFhcnJheSkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgY29udGFpbnMgPSB0b0FycmF5KGFyZ3VtZW50cykuc2xpY2UoMSk7XG4gIHZhciBpbmRleCA9IC0xO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGluZGV4T2YoY29udGFpbnMsIGFycmF5W2luZGV4XSkgPT09IC0xKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJheVtpbmRleF0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydHMud2l0aG91dCA9IHdpdGhvdXQ7XG5cbmZ1bmN0aW9uIHJlcGVhdChjaGFyXywgbikge1xuICB2YXIgc3RyID0gJyc7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICBzdHIgKz0gY2hhcl87XG4gIH1cblxuICByZXR1cm4gc3RyO1xufVxuXG5leHBvcnRzLnJlcGVhdCA9IHJlcGVhdDtcblxuZnVuY3Rpb24gZWFjaChvYmosIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKEFycmF5UHJvdG8uZm9yRWFjaCAmJiBvYmouZm9yRWFjaCA9PT0gQXJyYXlQcm90by5mb3JFYWNoKSB7XG4gICAgb2JqLmZvckVhY2goZnVuYywgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZ1bmMuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydHMuZWFjaCA9IGVhY2g7XG5cbmZ1bmN0aW9uIG1hcChvYmosIGZ1bmMpIHtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcblxuICBpZiAob2JqID09IG51bGwpIHtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIGlmIChBcnJheVByb3RvLm1hcCAmJiBvYmoubWFwID09PSBBcnJheVByb3RvLm1hcCkge1xuICAgIHJldHVybiBvYmoubWFwKGZ1bmMpO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHRzW3Jlc3VsdHMubGVuZ3RoXSA9IGZ1bmMob2JqW2ldLCBpKTtcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xuICAgIHJlc3VsdHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHRzO1xufVxuXG5leHBvcnRzLm1hcCA9IG1hcDtcblxuZnVuY3Rpb24gYXN5bmNJdGVyKGFyciwgaXRlciwgY2IpIHtcbiAgdmFyIGkgPSAtMTtcblxuICBmdW5jdGlvbiBuZXh0KCkge1xuICAgIGkrKztcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCkge1xuICAgICAgaXRlcihhcnJbaV0sIGksIG5leHQsIGNiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk7XG59XG5cbmV4cG9ydHMuYXN5bmNJdGVyID0gYXN5bmNJdGVyO1xuXG5mdW5jdGlvbiBhc3luY0ZvcihvYmosIGl0ZXIsIGNiKSB7XG4gIHZhciBrZXlzID0ga2V5c18ob2JqIHx8IHt9KTtcbiAgdmFyIGxlbiA9IGtleXMubGVuZ3RoO1xuICB2YXIgaSA9IC0xO1xuXG4gIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgaSsrO1xuICAgIHZhciBrID0ga2V5c1tpXTtcblxuICAgIGlmIChpIDwgbGVuKSB7XG4gICAgICBpdGVyKGssIG9ialtrXSwgaSwgbGVuLCBuZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2IoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0KCk7XG59XG5cbmV4cG9ydHMuYXN5bmNGb3IgPSBhc3luY0ZvcjtcblxuZnVuY3Rpb24gaW5kZXhPZihhcnIsIHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCkge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChhcnIgfHwgW10sIHNlYXJjaEVsZW1lbnQsIGZyb21JbmRleCk7XG59XG5cbmV4cG9ydHMuaW5kZXhPZiA9IGluZGV4T2Y7XG5cbmZ1bmN0aW9uIGtleXNfKG9iaikge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1yZXN0cmljdGVkLXN5bnRheCAqL1xuICB2YXIgYXJyID0gW107XG5cbiAgZm9yICh2YXIgayBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duUHJvcChvYmosIGspKSB7XG4gICAgICBhcnIucHVzaChrKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG5leHBvcnRzLmtleXMgPSBrZXlzXztcblxuZnVuY3Rpb24gX2VudHJpZXMob2JqKSB7XG4gIHJldHVybiBrZXlzXyhvYmopLm1hcChmdW5jdGlvbiAoaykge1xuICAgIHJldHVybiBbaywgb2JqW2tdXTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuX2VudHJpZXMgPSBfZW50cmllcztcblxuZnVuY3Rpb24gX3ZhbHVlcyhvYmopIHtcbiAgcmV0dXJuIGtleXNfKG9iaikubWFwKGZ1bmN0aW9uIChrKSB7XG4gICAgcmV0dXJuIG9ialtrXTtcbiAgfSk7XG59XG5cbmV4cG9ydHMuX3ZhbHVlcyA9IF92YWx1ZXM7XG5cbmZ1bmN0aW9uIGV4dGVuZChvYmoxLCBvYmoyKSB7XG4gIG9iajEgPSBvYmoxIHx8IHt9O1xuICBrZXlzXyhvYmoyKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgb2JqMVtrXSA9IG9iajJba107XG4gIH0pO1xuICByZXR1cm4gb2JqMTtcbn1cblxuZXhwb3J0cy5fYXNzaWduID0gZXhwb3J0cy5leHRlbmQgPSBleHRlbmQ7XG5cbmZ1bmN0aW9uIGluT3BlcmF0b3Ioa2V5LCB2YWwpIHtcbiAgaWYgKGlzQXJyYXkodmFsKSB8fCBpc1N0cmluZyh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbC5pbmRleE9mKGtleSkgIT09IC0xO1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICByZXR1cm4ga2V5IGluIHZhbDtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHVzZSBcImluXCIgb3BlcmF0b3IgdG8gc2VhcmNoIGZvciBcIicgKyBrZXkgKyAnXCIgaW4gdW5leHBlY3RlZCB0eXBlcy4nKTtcbn1cblxuZXhwb3J0cy5pbk9wZXJhdG9yID0gaW5PcGVyYXRvcjtcblxuLyoqKi8gfSksXG4vKiAxICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuIC8vIEEgc2ltcGxlIGNsYXNzIHN5c3RlbSwgbW9yZSBkb2N1bWVudGF0aW9uIHRvIGNvbWVcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIEV2ZW50RW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpO1xuXG52YXIgbGliID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuZnVuY3Rpb24gcGFyZW50V3JhcChwYXJlbnQsIHByb3ApIHtcbiAgaWYgKHR5cGVvZiBwYXJlbnQgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHByb3AgIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gcHJvcDtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIC8vIFNhdmUgdGhlIGN1cnJlbnQgcGFyZW50IG1ldGhvZFxuICAgIHZhciB0bXAgPSB0aGlzLnBhcmVudDsgLy8gU2V0IHBhcmVudCB0byB0aGUgcHJldmlvdXMgbWV0aG9kLCBjYWxsLCBhbmQgcmVzdG9yZVxuXG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdmFyIHJlcyA9IHByb3AuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0aGlzLnBhcmVudCA9IHRtcDtcbiAgICByZXR1cm4gcmVzO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHRlbmRDbGFzcyhjbHMsIG5hbWUsIHByb3BzKSB7XG4gIHByb3BzID0gcHJvcHMgfHwge307XG4gIGxpYi5rZXlzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgcHJvcHNba10gPSBwYXJlbnRXcmFwKGNscy5wcm90b3R5cGVba10sIHByb3BzW2tdKTtcbiAgfSk7XG5cbiAgdmFyIHN1YmNsYXNzID1cbiAgLyojX19QVVJFX18qL1xuICBmdW5jdGlvbiAoX2Nscykge1xuICAgIF9pbmhlcml0c0xvb3NlKHN1YmNsYXNzLCBfY2xzKTtcblxuICAgIGZ1bmN0aW9uIHN1YmNsYXNzKCkge1xuICAgICAgcmV0dXJuIF9jbHMuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhzdWJjbGFzcywgW3tcbiAgICAgIGtleTogXCJ0eXBlbmFtZVwiLFxuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBzdWJjbGFzcztcbiAgfShjbHMpO1xuXG4gIGxpYi5fYXNzaWduKHN1YmNsYXNzLnByb3RvdHlwZSwgcHJvcHMpO1xuXG4gIHJldHVybiBzdWJjbGFzcztcbn1cblxudmFyIE9iaiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE9iaigpIHtcbiAgICAvLyBVbmZvcnR1bmF0ZWx5IG5lY2Vzc2FyeSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgICB0aGlzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBPYmoucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCgpIHt9O1xuXG4gIE9iai5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQobmFtZSwgcHJvcHMpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9wcyA9IG5hbWU7XG4gICAgICBuYW1lID0gJ2Fub255bW91cyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuZENsYXNzKHRoaXMsIG5hbWUsIHByb3BzKTtcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoT2JqLCBbe1xuICAgIGtleTogXCJ0eXBlbmFtZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gT2JqO1xufSgpO1xuXG52YXIgRW1pdHRlck9iaiA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX0V2ZW50RW1pdHRlcikge1xuICBfaW5oZXJpdHNMb29zZShFbWl0dGVyT2JqLCBfRXZlbnRFbWl0dGVyKTtcblxuICBmdW5jdGlvbiBFbWl0dGVyT2JqKCkge1xuICAgIHZhciBfdGhpczI7XG5cbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9FdmVudEVtaXR0ZXIuY2FsbCh0aGlzKSB8fCB0aGlzOyAvLyBVbmZvcnR1bmF0ZWx5IG5lY2Vzc2FyeSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblxuICAgIChfdGhpczIgPSBfdGhpcykuaW5pdC5hcHBseShfdGhpczIsIGFyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IEVtaXR0ZXJPYmoucHJvdG90eXBlO1xuXG4gIF9wcm90bzIuaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7fTtcblxuICBFbWl0dGVyT2JqLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZChuYW1lLCBwcm9wcykge1xuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHByb3BzID0gbmFtZTtcbiAgICAgIG5hbWUgPSAnYW5vbnltb3VzJztcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5kQ2xhc3ModGhpcywgbmFtZSwgcHJvcHMpO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhFbWl0dGVyT2JqLCBbe1xuICAgIGtleTogXCJ0eXBlbmFtZVwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRW1pdHRlck9iajtcbn0oRXZlbnRFbWl0dGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE9iajogT2JqLFxuICBFbWl0dGVyT2JqOiBFbWl0dGVyT2JqXG59O1xuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBhcnJheUZyb20gPSBBcnJheS5mcm9tO1xudmFyIHN1cHBvcnRzSXRlcmF0b3JzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3IgJiYgdHlwZW9mIGFycmF5RnJvbSA9PT0gJ2Z1bmN0aW9uJzsgLy8gRnJhbWVzIGtlZXAgdHJhY2sgb2Ygc2NvcGluZyBib3RoIGF0IGNvbXBpbGUtdGltZSBhbmQgcnVuLXRpbWUgc29cbi8vIHdlIGtub3cgaG93IHRvIGFjY2VzcyB2YXJpYWJsZXMuIEJsb2NrIHRhZ3MgY2FuIGludHJvZHVjZSBzcGVjaWFsXG4vLyB2YXJpYWJsZXMsIGZvciBleGFtcGxlLlxuXG52YXIgRnJhbWUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGcmFtZShwYXJlbnQsIGlzb2xhdGVXcml0ZXMpIHtcbiAgICB0aGlzLnZhcmlhYmxlcyA9IHt9O1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMudG9wTGV2ZWwgPSBmYWxzZTsgLy8gaWYgdGhpcyBpcyB0cnVlLCB3cml0ZXMgKHNldCkgc2hvdWxkIG5ldmVyIHByb3BhZ2F0ZSB1cHdhcmRzIHBhc3RcbiAgICAvLyB0aGlzIGZyYW1lIHRvIGl0cyBwYXJlbnQgKHRob3VnaCByZWFkcyBtYXkpLlxuXG4gICAgdGhpcy5pc29sYXRlV3JpdGVzID0gaXNvbGF0ZVdyaXRlcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBGcmFtZS5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLnNldCA9IGZ1bmN0aW9uIHNldChuYW1lLCB2YWwsIHJlc29sdmVVcCkge1xuICAgIC8vIEFsbG93IHZhcmlhYmxlcyB3aXRoIGRvdHMgYnkgYXV0b21hdGljYWxseSBjcmVhdGluZyB0aGVcbiAgICAvLyBuZXN0ZWQgc3RydWN0dXJlXG4gICAgdmFyIHBhcnRzID0gbmFtZS5zcGxpdCgnLicpO1xuICAgIHZhciBvYmogPSB0aGlzLnZhcmlhYmxlcztcbiAgICB2YXIgZnJhbWUgPSB0aGlzO1xuXG4gICAgaWYgKHJlc29sdmVVcCkge1xuICAgICAgaWYgKGZyYW1lID0gdGhpcy5yZXNvbHZlKHBhcnRzWzBdLCB0cnVlKSkge1xuICAgICAgICBmcmFtZS5zZXQobmFtZSwgdmFsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSBwYXJ0c1tpXTtcblxuICAgICAgaWYgKCFvYmpbaWRdKSB7XG4gICAgICAgIG9ialtpZF0gPSB7fTtcbiAgICAgIH1cblxuICAgICAgb2JqID0gb2JqW2lkXTtcbiAgICB9XG5cbiAgICBvYmpbcGFydHNbcGFydHMubGVuZ3RoIC0gMV1dID0gdmFsO1xuICB9O1xuXG4gIF9wcm90by5nZXQgPSBmdW5jdGlvbiBnZXQobmFtZSkge1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8ubG9va3VwID0gZnVuY3Rpb24gbG9va3VwKG5hbWUpIHtcbiAgICB2YXIgcCA9IHRoaXMucGFyZW50O1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcCAmJiBwLmxvb2t1cChuYW1lKTtcbiAgfTtcblxuICBfcHJvdG8ucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUobmFtZSwgZm9yV3JpdGUpIHtcbiAgICB2YXIgcCA9IGZvcldyaXRlICYmIHRoaXMuaXNvbGF0ZVdyaXRlcyA/IHVuZGVmaW5lZCA6IHRoaXMucGFyZW50O1xuICAgIHZhciB2YWwgPSB0aGlzLnZhcmlhYmxlc1tuYW1lXTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHAgJiYgcC5yZXNvbHZlKG5hbWUpO1xuICB9O1xuXG4gIF9wcm90by5wdXNoID0gZnVuY3Rpb24gcHVzaChpc29sYXRlV3JpdGVzKSB7XG4gICAgcmV0dXJuIG5ldyBGcmFtZSh0aGlzLCBpc29sYXRlV3JpdGVzKTtcbiAgfTtcblxuICBfcHJvdG8ucG9wID0gZnVuY3Rpb24gcG9wKCkge1xuICAgIHJldHVybiB0aGlzLnBhcmVudDtcbiAgfTtcblxuICByZXR1cm4gRnJhbWU7XG59KCk7XG5cbmZ1bmN0aW9uIG1ha2VNYWNybyhhcmdOYW1lcywga3dhcmdOYW1lcywgZnVuYykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG1hY3JvQXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIG1hY3JvQXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnQ291bnQgPSBudW1BcmdzKG1hY3JvQXJncyk7XG4gICAgdmFyIGFyZ3M7XG4gICAgdmFyIGt3YXJncyA9IGdldEtleXdvcmRBcmdzKG1hY3JvQXJncyk7XG5cbiAgICBpZiAoYXJnQ291bnQgPiBhcmdOYW1lcy5sZW5ndGgpIHtcbiAgICAgIGFyZ3MgPSBtYWNyb0FyZ3Muc2xpY2UoMCwgYXJnTmFtZXMubGVuZ3RoKTsgLy8gUG9zaXRpb25hbCBhcmd1bWVudHMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIGluIGFzXG4gICAgICAvLyBrZXl3b3JkIGFyZ3VtZW50cyAoZXNzZW50aWFsbHkgZGVmYXVsdCB2YWx1ZXMpXG5cbiAgICAgIG1hY3JvQXJncy5zbGljZShhcmdzLmxlbmd0aCwgYXJnQ291bnQpLmZvckVhY2goZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgICBpZiAoaSA8IGt3YXJnTmFtZXMubGVuZ3RoKSB7XG4gICAgICAgICAga3dhcmdzW2t3YXJnTmFtZXNbaV1dID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGFyZ3MucHVzaChrd2FyZ3MpO1xuICAgIH0gZWxzZSBpZiAoYXJnQ291bnQgPCBhcmdOYW1lcy5sZW5ndGgpIHtcbiAgICAgIGFyZ3MgPSBtYWNyb0FyZ3Muc2xpY2UoMCwgYXJnQ291bnQpO1xuXG4gICAgICBmb3IgKHZhciBpID0gYXJnQ291bnQ7IGkgPCBhcmdOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXJnID0gYXJnTmFtZXNbaV07IC8vIEtleXdvcmQgYXJndW1lbnRzIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCBhc1xuICAgICAgICAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50cywgaS5lLiB0aGUgY2FsbGVyIGV4cGxpY2l0bHlcbiAgICAgICAgLy8gdXNlZCB0aGUgbmFtZSBvZiBhIHBvc2l0aW9uYWwgYXJnXG5cbiAgICAgICAgYXJncy5wdXNoKGt3YXJnc1thcmddKTtcbiAgICAgICAgZGVsZXRlIGt3YXJnc1thcmddO1xuICAgICAgfVxuXG4gICAgICBhcmdzLnB1c2goa3dhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJncyA9IG1hY3JvQXJncztcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuYy5hcHBseShfdGhpcywgYXJncyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VLZXl3b3JkQXJncyhvYmopIHtcbiAgb2JqLl9fa2V5d29yZHMgPSB0cnVlO1xuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc0tleXdvcmRBcmdzKG9iaikge1xuICByZXR1cm4gb2JqICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosICdfX2tleXdvcmRzJyk7XG59XG5cbmZ1bmN0aW9uIGdldEtleXdvcmRBcmdzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXG4gIGlmIChsZW4pIHtcbiAgICB2YXIgbGFzdEFyZyA9IGFyZ3NbbGVuIC0gMV07XG5cbiAgICBpZiAoaXNLZXl3b3JkQXJncyhsYXN0QXJnKSkge1xuICAgICAgcmV0dXJuIGxhc3RBcmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBudW1BcmdzKGFyZ3MpIHtcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXG4gIGlmIChsZW4gPT09IDApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBsYXN0QXJnID0gYXJnc1tsZW4gLSAxXTtcblxuICBpZiAoaXNLZXl3b3JkQXJncyhsYXN0QXJnKSkge1xuICAgIHJldHVybiBsZW4gLSAxO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsZW47XG4gIH1cbn0gLy8gQSBTYWZlU3RyaW5nIG9iamVjdCBpbmRpY2F0ZXMgdGhhdCB0aGUgc3RyaW5nIHNob3VsZCBub3QgYmVcbi8vIGF1dG9lc2NhcGVkLiBUaGlzIGhhcHBlbnMgbWFnaWNhbGx5IGJlY2F1c2UgYXV0b2VzY2FwaW5nIG9ubHlcbi8vIG9jY3VycyBvbiBwcmltaXRpdmUgc3RyaW5nIG9iamVjdHMuXG5cblxuZnVuY3Rpb24gU2FmZVN0cmluZyh2YWwpIHtcbiAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxuXG4gIHRoaXMudmFsID0gdmFsO1xuICB0aGlzLmxlbmd0aCA9IHZhbC5sZW5ndGg7XG59XG5cblNhZmVTdHJpbmcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShTdHJpbmcucHJvdG90eXBlLCB7XG4gIGxlbmd0aDoge1xuICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICB2YWx1ZTogMFxuICB9XG59KTtcblxuU2FmZVN0cmluZy5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoKSB7XG4gIHJldHVybiB0aGlzLnZhbDtcbn07XG5cblNhZmVTdHJpbmcucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0aGlzLnZhbDtcbn07XG5cbmZ1bmN0aW9uIGNvcHlTYWZlbmVzcyhkZXN0LCB0YXJnZXQpIHtcbiAgaWYgKGRlc3QgaW5zdGFuY2VvZiBTYWZlU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBTYWZlU3RyaW5nKHRhcmdldCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0LnRvU3RyaW5nKCk7XG59XG5cbmZ1bmN0aW9uIG1hcmtTYWZlKHZhbCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG5cbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG5ldyBTYWZlU3RyaW5nKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBTYWZlKGFyZ3MpIHtcbiAgICAgIHZhciByZXQgPSB2YWwuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKHR5cGVvZiByZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2FmZVN0cmluZyhyZXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gc3VwcHJlc3NWYWx1ZSh2YWwsIGF1dG9lc2NhcGUpIHtcbiAgdmFsID0gdmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSBudWxsID8gdmFsIDogJyc7XG5cbiAgaWYgKGF1dG9lc2NhcGUgJiYgISh2YWwgaW5zdGFuY2VvZiBTYWZlU3RyaW5nKSkge1xuICAgIHZhbCA9IGxpYi5lc2NhcGUodmFsLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgcmV0dXJuIHZhbDtcbn1cblxuZnVuY3Rpb24gZW5zdXJlRGVmaW5lZCh2YWwsIGxpbmVubywgY29sbm8pIHtcbiAgaWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBsaWIuVGVtcGxhdGVFcnJvcignYXR0ZW1wdGVkIHRvIG91dHB1dCBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZScsIGxpbmVubyArIDEsIGNvbG5vICsgMSk7XG4gIH1cblxuICByZXR1cm4gdmFsO1xufVxuXG5mdW5jdGlvbiBtZW1iZXJMb29rdXAob2JqLCB2YWwpIHtcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9ialt2YWxdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmpbdmFsXS5hcHBseShvYmosIGFyZ3MpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gb2JqW3ZhbF07XG59XG5cbmZ1bmN0aW9uIGNhbGxXcmFwKG9iaiwgbmFtZSwgY29udGV4dCwgYXJncykge1xuICBpZiAoIW9iaikge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGNhbGwgYCcgKyBuYW1lICsgJ2AsIHdoaWNoIGlzIHVuZGVmaW5lZCBvciBmYWxzZXknKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gY2FsbCBgJyArIG5hbWUgKyAnYCwgd2hpY2ggaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHJldHVybiBvYmouYXBwbHkoY29udGV4dCwgYXJncyk7XG59XG5cbmZ1bmN0aW9uIGNvbnRleHRPckZyYW1lTG9va3VwKGNvbnRleHQsIGZyYW1lLCBuYW1lKSB7XG4gIHZhciB2YWwgPSBmcmFtZS5sb29rdXAobmFtZSk7XG4gIHJldHVybiB2YWwgIT09IHVuZGVmaW5lZCA/IHZhbCA6IGNvbnRleHQubG9va3VwKG5hbWUpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvciwgbGluZW5vLCBjb2xubykge1xuICBpZiAoZXJyb3IubGluZW5vKSB7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgbGliLlRlbXBsYXRlRXJyb3IoZXJyb3IsIGxpbmVubywgY29sbm8pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzeW5jRWFjaChhcnIsIGRpbWVuLCBpdGVyLCBjYikge1xuICBpZiAobGliLmlzQXJyYXkoYXJyKSkge1xuICAgIHZhciBsZW4gPSBhcnIubGVuZ3RoO1xuICAgIGxpYi5hc3luY0l0ZXIoYXJyLCBmdW5jdGlvbiBpdGVyQ2FsbGJhY2soaXRlbSwgaSwgbmV4dCkge1xuICAgICAgc3dpdGNoIChkaW1lbikge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaXRlcihpdGVtLCBpLCBsZW4sIG5leHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBpdGVyKGl0ZW1bMF0sIGl0ZW1bMV0sIGksIGxlbiwgbmV4dCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIGl0ZXIoaXRlbVswXSwgaXRlbVsxXSwgaXRlbVsyXSwgaSwgbGVuLCBuZXh0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGl0ZW0ucHVzaChpLCBsZW4sIG5leHQpO1xuICAgICAgICAgIGl0ZXIuYXBwbHkodGhpcywgaXRlbSk7XG4gICAgICB9XG4gICAgfSwgY2IpO1xuICB9IGVsc2Uge1xuICAgIGxpYi5hc3luY0ZvcihhcnIsIGZ1bmN0aW9uIGl0ZXJDYWxsYmFjayhrZXksIHZhbCwgaSwgbGVuLCBuZXh0KSB7XG4gICAgICBpdGVyKGtleSwgdmFsLCBpLCBsZW4sIG5leHQpO1xuICAgIH0sIGNiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3luY0FsbChhcnIsIGRpbWVuLCBmdW5jLCBjYikge1xuICB2YXIgZmluaXNoZWQgPSAwO1xuICB2YXIgbGVuO1xuICB2YXIgb3V0cHV0QXJyO1xuXG4gIGZ1bmN0aW9uIGRvbmUoaSwgb3V0cHV0KSB7XG4gICAgZmluaXNoZWQrKztcbiAgICBvdXRwdXRBcnJbaV0gPSBvdXRwdXQ7XG5cbiAgICBpZiAoZmluaXNoZWQgPT09IGxlbikge1xuICAgICAgY2IobnVsbCwgb3V0cHV0QXJyLmpvaW4oJycpKTtcbiAgICB9XG4gIH1cblxuICBpZiAobGliLmlzQXJyYXkoYXJyKSkge1xuICAgIGxlbiA9IGFyci5sZW5ndGg7XG4gICAgb3V0cHV0QXJyID0gbmV3IEFycmF5KGxlbik7XG5cbiAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICBjYihudWxsLCAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gYXJyW2ldO1xuXG4gICAgICAgIHN3aXRjaCAoZGltZW4pIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBmdW5jKGl0ZW0sIGksIGxlbiwgZG9uZSk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGZ1bmMoaXRlbVswXSwgaXRlbVsxXSwgaSwgbGVuLCBkb25lKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZnVuYyhpdGVtWzBdLCBpdGVtWzFdLCBpdGVtWzJdLCBpLCBsZW4sIGRvbmUpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaXRlbS5wdXNoKGksIGxlbiwgZG9uZSk7XG4gICAgICAgICAgICBmdW5jLmFwcGx5KHRoaXMsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBrZXlzID0gbGliLmtleXMoYXJyIHx8IHt9KTtcbiAgICBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICBvdXRwdXRBcnIgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIGlmIChsZW4gPT09IDApIHtcbiAgICAgIGNiKG51bGwsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGtleXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1tfaV07XG4gICAgICAgIGZ1bmMoaywgYXJyW2tdLCBfaSwgbGVuLCBkb25lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZnJvbUl0ZXJhdG9yKGFycikge1xuICBpZiAodHlwZW9mIGFyciAhPT0gJ29iamVjdCcgfHwgYXJyID09PSBudWxsIHx8IGxpYi5pc0FycmF5KGFycikpIHtcbiAgICByZXR1cm4gYXJyO1xuICB9IGVsc2UgaWYgKHN1cHBvcnRzSXRlcmF0b3JzICYmIFN5bWJvbC5pdGVyYXRvciBpbiBhcnIpIHtcbiAgICByZXR1cm4gYXJyYXlGcm9tKGFycik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRnJhbWU6IEZyYW1lLFxuICBtYWtlTWFjcm86IG1ha2VNYWNybyxcbiAgbWFrZUtleXdvcmRBcmdzOiBtYWtlS2V5d29yZEFyZ3MsXG4gIG51bUFyZ3M6IG51bUFyZ3MsXG4gIHN1cHByZXNzVmFsdWU6IHN1cHByZXNzVmFsdWUsXG4gIGVuc3VyZURlZmluZWQ6IGVuc3VyZURlZmluZWQsXG4gIG1lbWJlckxvb2t1cDogbWVtYmVyTG9va3VwLFxuICBjb250ZXh0T3JGcmFtZUxvb2t1cDogY29udGV4dE9yRnJhbWVMb29rdXAsXG4gIGNhbGxXcmFwOiBjYWxsV3JhcCxcbiAgaGFuZGxlRXJyb3I6IGhhbmRsZUVycm9yLFxuICBpc0FycmF5OiBsaWIuaXNBcnJheSxcbiAga2V5czogbGliLmtleXMsXG4gIFNhZmVTdHJpbmc6IFNhZmVTdHJpbmcsXG4gIGNvcHlTYWZlbmVzczogY29weVNhZmVuZXNzLFxuICBtYXJrU2FmZTogbWFya1NhZmUsXG4gIGFzeW5jRWFjaDogYXN5bmNFYWNoLFxuICBhc3luY0FsbDogYXN5bmNBbGwsXG4gIGluT3BlcmF0b3I6IGxpYi5pbk9wZXJhdG9yLFxuICBmcm9tSXRlcmF0b3I6IGZyb21JdGVyYXRvclxufTtcblxuLyoqKi8gfSksXG4vKiAzICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gICAgT2JqID0gX3JlcXVpcmUuT2JqO1xuXG5mdW5jdGlvbiB0cmF2ZXJzZUFuZENoZWNrKG9iaiwgdHlwZSwgcmVzdWx0cykge1xuICBpZiAob2JqIGluc3RhbmNlb2YgdHlwZSkge1xuICAgIHJlc3VsdHMucHVzaChvYmopO1xuICB9XG5cbiAgaWYgKG9iaiBpbnN0YW5jZW9mIE5vZGUpIHtcbiAgICBvYmouZmluZEFsbCh0eXBlLCByZXN1bHRzKTtcbiAgfVxufVxuXG52YXIgTm9kZSA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX09iaikge1xuICBfaW5oZXJpdHNMb29zZShOb2RlLCBfT2JqKTtcblxuICBmdW5jdGlvbiBOb2RlKCkge1xuICAgIHJldHVybiBfT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBOb2RlLnByb3RvdHlwZTtcblxuICBfcHJvdG8uaW5pdCA9IGZ1bmN0aW9uIGluaXQobGluZW5vLCBjb2xubykge1xuICAgIHZhciBfdGhpcyA9IHRoaXMsXG4gICAgICAgIF9hcmd1bWVudHMgPSBhcmd1bWVudHM7XG5cbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgICB0aGlzLmNvbG5vID0gY29sbm87XG4gICAgdGhpcy5maWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgIC8vIFRoZSBmaXJzdCB0d28gYXJncyBhcmUgbGluZS9jb2wgbnVtYmVycywgc28gb2Zmc2V0IGJ5IDJcbiAgICAgIHZhciB2YWwgPSBfYXJndW1lbnRzW2kgKyAyXTsgLy8gRmllbGRzIHNob3VsZCBuZXZlciBiZSB1bmRlZmluZWQsIGJ1dCBudWxsLiBJdCBtYWtlc1xuICAgICAgLy8gdGVzdGluZyBlYXNpZXIgdG8gbm9ybWFsaXplIHZhbHVlcy5cblxuICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhbCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIF90aGlzW2ZpZWxkXSA9IHZhbDtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uZmluZEFsbCA9IGZ1bmN0aW9uIGZpbmRBbGwodHlwZSwgcmVzdWx0cykge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgcmVzdWx0cyA9IHJlc3VsdHMgfHwgW107XG5cbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIE5vZGVMaXN0KSB7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgICAgIHJldHVybiB0cmF2ZXJzZUFuZENoZWNrKGNoaWxkLCB0eXBlLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICByZXR1cm4gdHJhdmVyc2VBbmRDaGVjayhfdGhpczJbZmllbGRdLCB0eXBlLCByZXN1bHRzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIF9wcm90by5pdGVyRmllbGRzID0gZnVuY3Rpb24gaXRlckZpZWxkcyhmdW5jKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB0aGlzLmZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgZnVuYyhfdGhpczNbZmllbGRdLCBmaWVsZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIE5vZGU7XG59KE9iaik7IC8vIEFic3RyYWN0IG5vZGVzXG5cblxudmFyIFZhbHVlID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTm9kZSkge1xuICBfaW5oZXJpdHNMb29zZShWYWx1ZSwgX05vZGUpO1xuXG4gIGZ1bmN0aW9uIFZhbHVlKCkge1xuICAgIHJldHVybiBfTm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoVmFsdWUsIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ1ZhbHVlJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiZmllbGRzXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gWyd2YWx1ZSddO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBWYWx1ZTtcbn0oTm9kZSk7IC8vIENvbmNyZXRlIG5vZGVzXG5cblxudmFyIE5vZGVMaXN0ID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTm9kZTIpIHtcbiAgX2luaGVyaXRzTG9vc2UoTm9kZUxpc3QsIF9Ob2RlMik7XG5cbiAgZnVuY3Rpb24gTm9kZUxpc3QoKSB7XG4gICAgcmV0dXJuIF9Ob2RlMi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IE5vZGVMaXN0LnByb3RvdHlwZTtcblxuICBfcHJvdG8yLmluaXQgPSBmdW5jdGlvbiBpbml0KGxpbmVubywgY29sbm8sIG5vZGVzKSB7XG4gICAgX05vZGUyLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcywgbGluZW5vLCBjb2xubywgbm9kZXMgfHwgW10pO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkQ2hpbGQgPSBmdW5jdGlvbiBhZGRDaGlsZChub2RlKSB7XG4gICAgdGhpcy5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuICB9O1xuXG4gIF9jcmVhdGVDbGFzcyhOb2RlTGlzdCwgW3tcbiAgICBrZXk6IFwidHlwZW5hbWVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiAnTm9kZUxpc3QnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaWVsZHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBbJ2NoaWxkcmVuJ107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE5vZGVMaXN0O1xufShOb2RlKTtcblxudmFyIFJvb3QgPSBOb2RlTGlzdC5leHRlbmQoJ1Jvb3QnKTtcbnZhciBMaXRlcmFsID0gVmFsdWUuZXh0ZW5kKCdMaXRlcmFsJyk7XG52YXIgU3ltYm9sID0gVmFsdWUuZXh0ZW5kKCdTeW1ib2wnKTtcbnZhciBHcm91cCA9IE5vZGVMaXN0LmV4dGVuZCgnR3JvdXAnKTtcbnZhciBBcnJheU5vZGUgPSBOb2RlTGlzdC5leHRlbmQoJ0FycmF5Jyk7XG52YXIgUGFpciA9IE5vZGUuZXh0ZW5kKCdQYWlyJywge1xuICBmaWVsZHM6IFsna2V5JywgJ3ZhbHVlJ11cbn0pO1xudmFyIERpY3QgPSBOb2RlTGlzdC5leHRlbmQoJ0RpY3QnKTtcbnZhciBMb29rdXBWYWwgPSBOb2RlLmV4dGVuZCgnTG9va3VwVmFsJywge1xuICBmaWVsZHM6IFsndGFyZ2V0JywgJ3ZhbCddXG59KTtcbnZhciBJZiA9IE5vZGUuZXh0ZW5kKCdJZicsIHtcbiAgZmllbGRzOiBbJ2NvbmQnLCAnYm9keScsICdlbHNlXyddXG59KTtcbnZhciBJZkFzeW5jID0gSWYuZXh0ZW5kKCdJZkFzeW5jJyk7XG52YXIgSW5saW5lSWYgPSBOb2RlLmV4dGVuZCgnSW5saW5lSWYnLCB7XG4gIGZpZWxkczogWydjb25kJywgJ2JvZHknLCAnZWxzZV8nXVxufSk7XG52YXIgRm9yID0gTm9kZS5leHRlbmQoJ0ZvcicsIHtcbiAgZmllbGRzOiBbJ2FycicsICduYW1lJywgJ2JvZHknLCAnZWxzZV8nXVxufSk7XG52YXIgQXN5bmNFYWNoID0gRm9yLmV4dGVuZCgnQXN5bmNFYWNoJyk7XG52YXIgQXN5bmNBbGwgPSBGb3IuZXh0ZW5kKCdBc3luY0FsbCcpO1xudmFyIE1hY3JvID0gTm9kZS5leHRlbmQoJ01hY3JvJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJywgJ2JvZHknXVxufSk7XG52YXIgQ2FsbGVyID0gTWFjcm8uZXh0ZW5kKCdDYWxsZXInKTtcbnZhciBJbXBvcnQgPSBOb2RlLmV4dGVuZCgnSW1wb3J0Jywge1xuICBmaWVsZHM6IFsndGVtcGxhdGUnLCAndGFyZ2V0JywgJ3dpdGhDb250ZXh0J11cbn0pO1xuXG52YXIgRnJvbUltcG9ydCA9XG4vKiNfX1BVUkVfXyovXG5mdW5jdGlvbiAoX05vZGUzKSB7XG4gIF9pbmhlcml0c0xvb3NlKEZyb21JbXBvcnQsIF9Ob2RlMyk7XG5cbiAgZnVuY3Rpb24gRnJvbUltcG9ydCgpIHtcbiAgICByZXR1cm4gX05vZGUzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gRnJvbUltcG9ydC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvMy5pbml0ID0gZnVuY3Rpb24gaW5pdChsaW5lbm8sIGNvbG5vLCB0ZW1wbGF0ZSwgbmFtZXMsIHdpdGhDb250ZXh0KSB7XG4gICAgX05vZGUzLnByb3RvdHlwZS5pbml0LmNhbGwodGhpcywgbGluZW5vLCBjb2xubywgdGVtcGxhdGUsIG5hbWVzIHx8IG5ldyBOb2RlTGlzdCgpLCB3aXRoQ29udGV4dCk7XG4gIH07XG5cbiAgX2NyZWF0ZUNsYXNzKEZyb21JbXBvcnQsIFt7XG4gICAga2V5OiBcInR5cGVuYW1lXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gJ0Zyb21JbXBvcnQnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJmaWVsZHNcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBbJ3RlbXBsYXRlJywgJ25hbWVzJywgJ3dpdGhDb250ZXh0J107XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZyb21JbXBvcnQ7XG59KE5vZGUpO1xuXG52YXIgRnVuQ2FsbCA9IE5vZGUuZXh0ZW5kKCdGdW5DYWxsJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJ11cbn0pO1xudmFyIEZpbHRlciA9IEZ1bkNhbGwuZXh0ZW5kKCdGaWx0ZXInKTtcbnZhciBGaWx0ZXJBc3luYyA9IEZpbHRlci5leHRlbmQoJ0ZpbHRlckFzeW5jJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdhcmdzJywgJ3N5bWJvbCddXG59KTtcbnZhciBLZXl3b3JkQXJncyA9IERpY3QuZXh0ZW5kKCdLZXl3b3JkQXJncycpO1xudmFyIEJsb2NrID0gTm9kZS5leHRlbmQoJ0Jsb2NrJywge1xuICBmaWVsZHM6IFsnbmFtZScsICdib2R5J11cbn0pO1xudmFyIFN1cGVyID0gTm9kZS5leHRlbmQoJ1N1cGVyJywge1xuICBmaWVsZHM6IFsnYmxvY2tOYW1lJywgJ3N5bWJvbCddXG59KTtcbnZhciBUZW1wbGF0ZVJlZiA9IE5vZGUuZXh0ZW5kKCdUZW1wbGF0ZVJlZicsIHtcbiAgZmllbGRzOiBbJ3RlbXBsYXRlJ11cbn0pO1xudmFyIEV4dGVuZHMgPSBUZW1wbGF0ZVJlZi5leHRlbmQoJ0V4dGVuZHMnKTtcbnZhciBJbmNsdWRlID0gTm9kZS5leHRlbmQoJ0luY2x1ZGUnLCB7XG4gIGZpZWxkczogWyd0ZW1wbGF0ZScsICdpZ25vcmVNaXNzaW5nJ11cbn0pO1xudmFyIFNldCA9IE5vZGUuZXh0ZW5kKCdTZXQnLCB7XG4gIGZpZWxkczogWyd0YXJnZXRzJywgJ3ZhbHVlJ11cbn0pO1xudmFyIFN3aXRjaCA9IE5vZGUuZXh0ZW5kKCdTd2l0Y2gnLCB7XG4gIGZpZWxkczogWydleHByJywgJ2Nhc2VzJywgJ2RlZmF1bHQnXVxufSk7XG52YXIgQ2FzZSA9IE5vZGUuZXh0ZW5kKCdDYXNlJywge1xuICBmaWVsZHM6IFsnY29uZCcsICdib2R5J11cbn0pO1xudmFyIE91dHB1dCA9IE5vZGVMaXN0LmV4dGVuZCgnT3V0cHV0Jyk7XG52YXIgQ2FwdHVyZSA9IE5vZGUuZXh0ZW5kKCdDYXB0dXJlJywge1xuICBmaWVsZHM6IFsnYm9keSddXG59KTtcbnZhciBUZW1wbGF0ZURhdGEgPSBMaXRlcmFsLmV4dGVuZCgnVGVtcGxhdGVEYXRhJyk7XG52YXIgVW5hcnlPcCA9IE5vZGUuZXh0ZW5kKCdVbmFyeU9wJywge1xuICBmaWVsZHM6IFsndGFyZ2V0J11cbn0pO1xudmFyIEJpbk9wID0gTm9kZS5leHRlbmQoJ0Jpbk9wJywge1xuICBmaWVsZHM6IFsnbGVmdCcsICdyaWdodCddXG59KTtcbnZhciBJbiA9IEJpbk9wLmV4dGVuZCgnSW4nKTtcbnZhciBJcyA9IEJpbk9wLmV4dGVuZCgnSXMnKTtcbnZhciBPciA9IEJpbk9wLmV4dGVuZCgnT3InKTtcbnZhciBBbmQgPSBCaW5PcC5leHRlbmQoJ0FuZCcpO1xudmFyIE5vdCA9IFVuYXJ5T3AuZXh0ZW5kKCdOb3QnKTtcbnZhciBBZGQgPSBCaW5PcC5leHRlbmQoJ0FkZCcpO1xudmFyIENvbmNhdCA9IEJpbk9wLmV4dGVuZCgnQ29uY2F0Jyk7XG52YXIgU3ViID0gQmluT3AuZXh0ZW5kKCdTdWInKTtcbnZhciBNdWwgPSBCaW5PcC5leHRlbmQoJ011bCcpO1xudmFyIERpdiA9IEJpbk9wLmV4dGVuZCgnRGl2Jyk7XG52YXIgRmxvb3JEaXYgPSBCaW5PcC5leHRlbmQoJ0Zsb29yRGl2Jyk7XG52YXIgTW9kID0gQmluT3AuZXh0ZW5kKCdNb2QnKTtcbnZhciBQb3cgPSBCaW5PcC5leHRlbmQoJ1BvdycpO1xudmFyIE5lZyA9IFVuYXJ5T3AuZXh0ZW5kKCdOZWcnKTtcbnZhciBQb3MgPSBVbmFyeU9wLmV4dGVuZCgnUG9zJyk7XG52YXIgQ29tcGFyZSA9IE5vZGUuZXh0ZW5kKCdDb21wYXJlJywge1xuICBmaWVsZHM6IFsnZXhwcicsICdvcHMnXVxufSk7XG52YXIgQ29tcGFyZU9wZXJhbmQgPSBOb2RlLmV4dGVuZCgnQ29tcGFyZU9wZXJhbmQnLCB7XG4gIGZpZWxkczogWydleHByJywgJ3R5cGUnXVxufSk7XG52YXIgQ2FsbEV4dGVuc2lvbiA9IE5vZGUuZXh0ZW5kKCdDYWxsRXh0ZW5zaW9uJywge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGV4dCwgcHJvcCwgYXJncywgY29udGVudEFyZ3MpIHtcbiAgICB0aGlzLnBhcmVudCgpO1xuICAgIHRoaXMuZXh0TmFtZSA9IGV4dC5fX25hbWUgfHwgZXh0O1xuICAgIHRoaXMucHJvcCA9IHByb3A7XG4gICAgdGhpcy5hcmdzID0gYXJncyB8fCBuZXcgTm9kZUxpc3QoKTtcbiAgICB0aGlzLmNvbnRlbnRBcmdzID0gY29udGVudEFyZ3MgfHwgW107XG4gICAgdGhpcy5hdXRvZXNjYXBlID0gZXh0LmF1dG9lc2NhcGU7XG4gIH0sXG4gIGZpZWxkczogWydleHROYW1lJywgJ3Byb3AnLCAnYXJncycsICdjb250ZW50QXJncyddXG59KTtcbnZhciBDYWxsRXh0ZW5zaW9uQXN5bmMgPSBDYWxsRXh0ZW5zaW9uLmV4dGVuZCgnQ2FsbEV4dGVuc2lvbkFzeW5jJyk7IC8vIFRoaXMgaXMgaGFja3ksIGJ1dCB0aGlzIGlzIGp1c3QgYSBkZWJ1Z2dpbmcgZnVuY3Rpb24gYW55d2F5XG5cbmZ1bmN0aW9uIHByaW50KHN0ciwgaW5kZW50LCBpbmxpbmUpIHtcbiAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKTtcbiAgbGluZXMuZm9yRWFjaChmdW5jdGlvbiAobGluZSwgaSkge1xuICAgIGlmIChsaW5lICYmIChpbmxpbmUgJiYgaSA+IDAgfHwgIWlubGluZSkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCcgJy5yZXBlYXQoaW5kZW50KSk7XG4gICAgfVxuXG4gICAgdmFyIG5sID0gaSA9PT0gbGluZXMubGVuZ3RoIC0gMSA/ICcnIDogJ1xcbic7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoXCJcIiArIGxpbmUgKyBubCk7XG4gIH0pO1xufSAvLyBQcmludCB0aGUgQVNUIGluIGEgbmljZWx5IGZvcm1hdHRlZCB0cmVlIGZvcm1hdCBmb3IgZGVidWdnaW5cblxuXG5mdW5jdGlvbiBwcmludE5vZGVzKG5vZGUsIGluZGVudCkge1xuICBpbmRlbnQgPSBpbmRlbnQgfHwgMDtcbiAgcHJpbnQobm9kZS50eXBlbmFtZSArICc6ICcsIGluZGVudCk7XG5cbiAgaWYgKG5vZGUgaW5zdGFuY2VvZiBOb2RlTGlzdCkge1xuICAgIHByaW50KCdcXG4nKTtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgIHByaW50Tm9kZXMobiwgaW5kZW50ICsgMik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIENhbGxFeHRlbnNpb24pIHtcbiAgICBwcmludChub2RlLmV4dE5hbWUgKyBcIi5cIiArIG5vZGUucHJvcCArIFwiXFxuXCIpO1xuXG4gICAgaWYgKG5vZGUuYXJncykge1xuICAgICAgcHJpbnROb2Rlcyhub2RlLmFyZ3MsIGluZGVudCArIDIpO1xuICAgIH1cblxuICAgIGlmIChub2RlLmNvbnRlbnRBcmdzKSB7XG4gICAgICBub2RlLmNvbnRlbnRBcmdzLmZvckVhY2goZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgcHJpbnROb2RlcyhuLCBpbmRlbnQgKyAyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgcHJvcHMgPSBudWxsO1xuICAgIG5vZGUuaXRlckZpZWxkcyhmdW5jdGlvbiAodmFsLCBmaWVsZE5hbWUpIHtcbiAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBOb2RlKSB7XG4gICAgICAgIG5vZGVzLnB1c2goW2ZpZWxkTmFtZSwgdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAgICAgICBwcm9wc1tmaWVsZE5hbWVdID0gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBwcmludChKU09OLnN0cmluZ2lmeShwcm9wcywgbnVsbCwgMikgKyAnXFxuJywgbnVsbCwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByaW50KCdcXG4nKTtcbiAgICB9XG5cbiAgICBub2Rlcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgZmllbGROYW1lID0gX3JlZlswXSxcbiAgICAgICAgICBuID0gX3JlZlsxXTtcbiAgICAgIHByaW50KFwiW1wiICsgZmllbGROYW1lICsgXCJdID0+XCIsIGluZGVudCArIDIpO1xuICAgICAgcHJpbnROb2RlcyhuLCBpbmRlbnQgKyA0KTtcbiAgICB9KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgTm9kZTogTm9kZSxcbiAgUm9vdDogUm9vdCxcbiAgTm9kZUxpc3Q6IE5vZGVMaXN0LFxuICBWYWx1ZTogVmFsdWUsXG4gIExpdGVyYWw6IExpdGVyYWwsXG4gIFN5bWJvbDogU3ltYm9sLFxuICBHcm91cDogR3JvdXAsXG4gIEFycmF5OiBBcnJheU5vZGUsXG4gIFBhaXI6IFBhaXIsXG4gIERpY3Q6IERpY3QsXG4gIE91dHB1dDogT3V0cHV0LFxuICBDYXB0dXJlOiBDYXB0dXJlLFxuICBUZW1wbGF0ZURhdGE6IFRlbXBsYXRlRGF0YSxcbiAgSWY6IElmLFxuICBJZkFzeW5jOiBJZkFzeW5jLFxuICBJbmxpbmVJZjogSW5saW5lSWYsXG4gIEZvcjogRm9yLFxuICBBc3luY0VhY2g6IEFzeW5jRWFjaCxcbiAgQXN5bmNBbGw6IEFzeW5jQWxsLFxuICBNYWNybzogTWFjcm8sXG4gIENhbGxlcjogQ2FsbGVyLFxuICBJbXBvcnQ6IEltcG9ydCxcbiAgRnJvbUltcG9ydDogRnJvbUltcG9ydCxcbiAgRnVuQ2FsbDogRnVuQ2FsbCxcbiAgRmlsdGVyOiBGaWx0ZXIsXG4gIEZpbHRlckFzeW5jOiBGaWx0ZXJBc3luYyxcbiAgS2V5d29yZEFyZ3M6IEtleXdvcmRBcmdzLFxuICBCbG9jazogQmxvY2ssXG4gIFN1cGVyOiBTdXBlcixcbiAgRXh0ZW5kczogRXh0ZW5kcyxcbiAgSW5jbHVkZTogSW5jbHVkZSxcbiAgU2V0OiBTZXQsXG4gIFN3aXRjaDogU3dpdGNoLFxuICBDYXNlOiBDYXNlLFxuICBMb29rdXBWYWw6IExvb2t1cFZhbCxcbiAgQmluT3A6IEJpbk9wLFxuICBJbjogSW4sXG4gIElzOiBJcyxcbiAgT3I6IE9yLFxuICBBbmQ6IEFuZCxcbiAgTm90OiBOb3QsXG4gIEFkZDogQWRkLFxuICBDb25jYXQ6IENvbmNhdCxcbiAgU3ViOiBTdWIsXG4gIE11bDogTXVsLFxuICBEaXY6IERpdixcbiAgRmxvb3JEaXY6IEZsb29yRGl2LFxuICBNb2Q6IE1vZCxcbiAgUG93OiBQb3csXG4gIE5lZzogTmVnLFxuICBQb3M6IFBvcyxcbiAgQ29tcGFyZTogQ29tcGFyZSxcbiAgQ29tcGFyZU9wZXJhbmQ6IENvbXBhcmVPcGVyYW5kLFxuICBDYWxsRXh0ZW5zaW9uOiBDYWxsRXh0ZW5zaW9uLFxuICBDYWxsRXh0ZW5zaW9uQXN5bmM6IENhbGxFeHRlbnNpb25Bc3luYyxcbiAgcHJpbnROb2RlczogcHJpbnROb2Rlc1xufTtcblxuLyoqKi8gfSksXG4vKiA0ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBwYXJzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXG52YXIgdHJhbnNmb3JtZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblxudmFyIG5vZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgICBUZW1wbGF0ZUVycm9yID0gX3JlcXVpcmUuVGVtcGxhdGVFcnJvcjtcblxudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMiksXG4gICAgRnJhbWUgPSBfcmVxdWlyZTIuRnJhbWU7XG5cbnZhciBfcmVxdWlyZTMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLFxuICAgIE9iaiA9IF9yZXF1aXJlMy5PYmo7IC8vIFRoZXNlIGFyZSBhbGwgdGhlIHNhbWUgZm9yIG5vdywgYnV0IHNob3VsZG4ndCBiZSBwYXNzZWQgc3RyYWlnaHRcbi8vIHRocm91Z2hcblxuXG52YXIgY29tcGFyZU9wcyA9IHtcbiAgJz09JzogJz09JyxcbiAgJz09PSc6ICc9PT0nLFxuICAnIT0nOiAnIT0nLFxuICAnIT09JzogJyE9PScsXG4gICc8JzogJzwnLFxuICAnPic6ICc+JyxcbiAgJzw9JzogJzw9JyxcbiAgJz49JzogJz49J1xufTtcblxudmFyIENvbXBpbGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfT2JqKSB7XG4gIF9pbmhlcml0c0xvb3NlKENvbXBpbGVyLCBfT2JqKTtcblxuICBmdW5jdGlvbiBDb21waWxlcigpIHtcbiAgICByZXR1cm4gX09iai5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gQ29tcGlsZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5pbml0ID0gZnVuY3Rpb24gaW5pdCh0ZW1wbGF0ZU5hbWUsIHRocm93T25VbmRlZmluZWQpIHtcbiAgICB0aGlzLnRlbXBsYXRlTmFtZSA9IHRlbXBsYXRlTmFtZTtcbiAgICB0aGlzLmNvZGVidWYgPSBbXTtcbiAgICB0aGlzLmxhc3RJZCA9IDA7XG4gICAgdGhpcy5idWZmZXIgPSBudWxsO1xuICAgIHRoaXMuYnVmZmVyU3RhY2sgPSBbXTtcbiAgICB0aGlzLl9zY29wZUNsb3NlcnMgPSAnJztcbiAgICB0aGlzLmluQmxvY2sgPSBmYWxzZTtcbiAgICB0aGlzLnRocm93T25VbmRlZmluZWQgPSB0aHJvd09uVW5kZWZpbmVkO1xuICB9O1xuXG4gIF9wcm90by5mYWlsID0gZnVuY3Rpb24gZmFpbChtc2csIGxpbmVubywgY29sbm8pIHtcbiAgICBpZiAobGluZW5vICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxpbmVubyArPSAxO1xuICAgIH1cblxuICAgIGlmIChjb2xubyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb2xubyArPSAxO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBUZW1wbGF0ZUVycm9yKG1zZywgbGluZW5vLCBjb2xubyk7XG4gIH07XG5cbiAgX3Byb3RvLl9wdXNoQnVmZmVyID0gZnVuY3Rpb24gX3B1c2hCdWZmZXIoKSB7XG4gICAgdmFyIGlkID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHRoaXMuYnVmZmVyU3RhY2sucHVzaCh0aGlzLmJ1ZmZlcik7XG4gICAgdGhpcy5idWZmZXIgPSBpZDtcblxuICAgIHRoaXMuX2VtaXQoXCJ2YXIgXCIgKyB0aGlzLmJ1ZmZlciArIFwiID0gXFxcIlxcXCI7XCIpO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9O1xuXG4gIF9wcm90by5fcG9wQnVmZmVyID0gZnVuY3Rpb24gX3BvcEJ1ZmZlcigpIHtcbiAgICB0aGlzLmJ1ZmZlciA9IHRoaXMuYnVmZmVyU3RhY2sucG9wKCk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0ID0gZnVuY3Rpb24gX2VtaXQoY29kZSkge1xuICAgIHRoaXMuY29kZWJ1Zi5wdXNoKGNvZGUpO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdExpbmUgPSBmdW5jdGlvbiBfZW1pdExpbmUoY29kZSkge1xuICAgIHRoaXMuX2VtaXQoY29kZSArICdcXG4nKTtcbiAgfTtcblxuICBfcHJvdG8uX2VtaXRMaW5lcyA9IGZ1bmN0aW9uIF9lbWl0TGluZXMoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBsaW5lcyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGxpbmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIGxpbmVzLmZvckVhY2goZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgIHJldHVybiBfdGhpcy5fZW1pdExpbmUobGluZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0RnVuY0JlZ2luID0gZnVuY3Rpb24gX2VtaXRGdW5jQmVnaW4obm9kZSwgbmFtZSkge1xuICAgIHRoaXMuYnVmZmVyID0gJ291dHB1dCc7XG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzID0gJyc7XG5cbiAgICB0aGlzLl9lbWl0TGluZShcImZ1bmN0aW9uIFwiICsgbmFtZSArIFwiKGVudiwgY29udGV4dCwgZnJhbWUsIHJ1bnRpbWUsIGNiKSB7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgbGluZW5vID0gXCIgKyBub2RlLmxpbmVubyArIFwiO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIGNvbG5vID0gXCIgKyBub2RlLmNvbG5vICsgXCI7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyB0aGlzLmJ1ZmZlciArIFwiID0gXFxcIlxcXCI7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3RyeSB7Jyk7XG4gIH07XG5cbiAgX3Byb3RvLl9lbWl0RnVuY0VuZCA9IGZ1bmN0aW9uIF9lbWl0RnVuY0VuZChub1JldHVybikge1xuICAgIGlmICghbm9SZXR1cm4pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdjYihudWxsLCAnICsgdGhpcy5idWZmZXIgKyAnKTsnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jbG9zZVNjb3BlTGV2ZWxzKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSBjYXRjaCAoZSkgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJyAgY2IocnVudGltZS5oYW5kbGVFcnJvcihlLCBsaW5lbm8sIGNvbG5vKSk7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgIHRoaXMuYnVmZmVyID0gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8uX2FkZFNjb3BlTGV2ZWwgPSBmdW5jdGlvbiBfYWRkU2NvcGVMZXZlbCgpIHtcbiAgICB0aGlzLl9zY29wZUNsb3NlcnMgKz0gJ30pJztcbiAgfTtcblxuICBfcHJvdG8uX2Nsb3NlU2NvcGVMZXZlbHMgPSBmdW5jdGlvbiBfY2xvc2VTY29wZUxldmVscygpIHtcbiAgICB0aGlzLl9lbWl0TGluZSh0aGlzLl9zY29wZUNsb3NlcnMgKyAnOycpO1xuXG4gICAgdGhpcy5fc2NvcGVDbG9zZXJzID0gJyc7XG4gIH07XG5cbiAgX3Byb3RvLl93aXRoU2NvcGVkU3ludGF4ID0gZnVuY3Rpb24gX3dpdGhTY29wZWRTeW50YXgoZnVuYykge1xuICAgIHZhciBfc2NvcGVDbG9zZXJzID0gdGhpcy5fc2NvcGVDbG9zZXJzO1xuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9ICcnO1xuICAgIGZ1bmMuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuX2Nsb3NlU2NvcGVMZXZlbHMoKTtcblxuICAgIHRoaXMuX3Njb3BlQ2xvc2VycyA9IF9zY29wZUNsb3NlcnM7XG4gIH07XG5cbiAgX3Byb3RvLl9tYWtlQ2FsbGJhY2sgPSBmdW5jdGlvbiBfbWFrZUNhbGxiYWNrKHJlcykge1xuICAgIHZhciBlcnIgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgcmV0dXJuICdmdW5jdGlvbignICsgZXJyICsgKHJlcyA/ICcsJyArIHJlcyA6ICcnKSArICcpIHtcXG4nICsgJ2lmKCcgKyBlcnIgKyAnKSB7IGNiKCcgKyBlcnIgKyAnKTsgcmV0dXJuOyB9JztcbiAgfTtcblxuICBfcHJvdG8uX3RtcGlkID0gZnVuY3Rpb24gX3RtcGlkKCkge1xuICAgIHRoaXMubGFzdElkKys7XG4gICAgcmV0dXJuICd0XycgKyB0aGlzLmxhc3RJZDtcbiAgfTtcblxuICBfcHJvdG8uX3RlbXBsYXRlTmFtZSA9IGZ1bmN0aW9uIF90ZW1wbGF0ZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVtcGxhdGVOYW1lID09IG51bGwgPyAndW5kZWZpbmVkJyA6IEpTT04uc3RyaW5naWZ5KHRoaXMudGVtcGxhdGVOYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVDaGlsZHJlbiA9IGZ1bmN0aW9uIF9jb21waWxlQ2hpbGRyZW4obm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIF90aGlzMi5jb21waWxlKGNoaWxkLCBmcmFtZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlQWdncmVnYXRlID0gZnVuY3Rpb24gX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsIHN0YXJ0Q2hhciwgZW5kQ2hhcikge1xuICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgaWYgKHN0YXJ0Q2hhcikge1xuICAgICAgdGhpcy5fZW1pdChzdGFydENoYXIpO1xuICAgIH1cblxuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQsIGkpIHtcbiAgICAgIGlmIChpID4gMCkge1xuICAgICAgICBfdGhpczMuX2VtaXQoJywnKTtcbiAgICAgIH1cblxuICAgICAgX3RoaXMzLmNvbXBpbGUoY2hpbGQsIGZyYW1lKTtcbiAgICB9KTtcblxuICAgIGlmIChlbmRDaGFyKSB7XG4gICAgICB0aGlzLl9lbWl0KGVuZENoYXIpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVFeHByZXNzaW9uID0gZnVuY3Rpb24gX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gVE9ETzogSSdtIG5vdCByZWFsbHkgc3VyZSBpZiB0aGlzIHR5cGUgY2hlY2sgaXMgd29ydGggaXQgb3JcbiAgICAvLyBub3QuXG4gICAgdGhpcy5hc3NlcnRUeXBlKG5vZGUsIG5vZGVzLkxpdGVyYWwsIG5vZGVzLlN5bWJvbCwgbm9kZXMuR3JvdXAsIG5vZGVzLkFycmF5LCBub2Rlcy5EaWN0LCBub2Rlcy5GdW5DYWxsLCBub2Rlcy5DYWxsZXIsIG5vZGVzLkZpbHRlciwgbm9kZXMuTG9va3VwVmFsLCBub2Rlcy5Db21wYXJlLCBub2Rlcy5JbmxpbmVJZiwgbm9kZXMuSW4sIG5vZGVzLklzLCBub2Rlcy5BbmQsIG5vZGVzLk9yLCBub2Rlcy5Ob3QsIG5vZGVzLkFkZCwgbm9kZXMuQ29uY2F0LCBub2Rlcy5TdWIsIG5vZGVzLk11bCwgbm9kZXMuRGl2LCBub2Rlcy5GbG9vckRpdiwgbm9kZXMuTW9kLCBub2Rlcy5Qb3csIG5vZGVzLk5lZywgbm9kZXMuUG9zLCBub2Rlcy5Db21wYXJlLCBub2Rlcy5Ob2RlTGlzdCk7XG4gICAgdGhpcy5jb21waWxlKG5vZGUsIGZyYW1lKTtcbiAgfTtcblxuICBfcHJvdG8uYXNzZXJ0VHlwZSA9IGZ1bmN0aW9uIGFzc2VydFR5cGUobm9kZSkge1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgdHlwZXMgPSBuZXcgQXJyYXkoX2xlbjIgPiAxID8gX2xlbjIgLSAxIDogMCksIF9rZXkyID0gMTsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgdHlwZXNbX2tleTIgLSAxXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuXG4gICAgaWYgKCF0eXBlcy5zb21lKGZ1bmN0aW9uICh0KSB7XG4gICAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIHQ7XG4gICAgfSkpIHtcbiAgICAgIHRoaXMuZmFpbChcImFzc2VydFR5cGU6IGludmFsaWQgdHlwZTogXCIgKyBub2RlLnR5cGVuYW1lLCBub2RlLmxpbmVubywgbm9kZS5jb2xubyk7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ2FsbEV4dGVuc2lvbiA9IGZ1bmN0aW9uIGNvbXBpbGVDYWxsRXh0ZW5zaW9uKG5vZGUsIGZyYW1lLCBhc3luYykge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgdmFyIGFyZ3MgPSBub2RlLmFyZ3M7XG4gICAgdmFyIGNvbnRlbnRBcmdzID0gbm9kZS5jb250ZW50QXJncztcbiAgICB2YXIgYXV0b2VzY2FwZSA9IHR5cGVvZiBub2RlLmF1dG9lc2NhcGUgPT09ICdib29sZWFuJyA/IG5vZGUuYXV0b2VzY2FwZSA6IHRydWU7XG5cbiAgICBpZiAoIWFzeW5jKSB7XG4gICAgICB0aGlzLl9lbWl0KHRoaXMuYnVmZmVyICsgXCIgKz0gcnVudGltZS5zdXBwcmVzc1ZhbHVlKFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0KFwiZW52LmdldEV4dGVuc2lvbihcXFwiXCIgKyBub2RlLmV4dE5hbWUgKyBcIlxcXCIpW1xcXCJcIiArIG5vZGUucHJvcCArIFwiXFxcIl0oXCIpO1xuXG4gICAgdGhpcy5fZW1pdCgnY29udGV4dCcpO1xuXG4gICAgaWYgKGFyZ3MgfHwgY29udGVudEFyZ3MpIHtcbiAgICAgIHRoaXMuX2VtaXQoJywnKTtcbiAgICB9XG5cbiAgICBpZiAoYXJncykge1xuICAgICAgaWYgKCEoYXJncyBpbnN0YW5jZW9mIG5vZGVzLk5vZGVMaXN0KSkge1xuICAgICAgICB0aGlzLmZhaWwoJ2NvbXBpbGVDYWxsRXh0ZW5zaW9uOiBhcmd1bWVudHMgbXVzdCBiZSBhIE5vZGVMaXN0LCAnICsgJ3VzZSBgcGFyc2VyLnBhcnNlU2lnbmF0dXJlYCcpO1xuICAgICAgfVxuXG4gICAgICBhcmdzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGFyZywgaSkge1xuICAgICAgICAvLyBUYWcgYXJndW1lbnRzIGFyZSBwYXNzZWQgbm9ybWFsbHkgdG8gdGhlIGNhbGwuIE5vdGVcbiAgICAgICAgLy8gdGhhdCBrZXl3b3JkIGFyZ3VtZW50cyBhcmUgdHVybmVkIGludG8gYSBzaW5nbGUganNcbiAgICAgICAgLy8gb2JqZWN0IGFzIHRoZSBsYXN0IGFyZ3VtZW50LCBpZiB0aGV5IGV4aXN0LlxuICAgICAgICBfdGhpczQuX2NvbXBpbGVFeHByZXNzaW9uKGFyZywgZnJhbWUpO1xuXG4gICAgICAgIGlmIChpICE9PSBhcmdzLmNoaWxkcmVuLmxlbmd0aCAtIDEgfHwgY29udGVudEFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgX3RoaXM0Ll9lbWl0KCcsJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChjb250ZW50QXJncy5sZW5ndGgpIHtcbiAgICAgIGNvbnRlbnRBcmdzLmZvckVhY2goZnVuY3Rpb24gKGFyZywgaSkge1xuICAgICAgICBpZiAoaSA+IDApIHtcbiAgICAgICAgICBfdGhpczQuX2VtaXQoJywnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmcpIHtcbiAgICAgICAgICBfdGhpczQuX2VtaXRMaW5lKCdmdW5jdGlvbihjYikgeycpO1xuXG4gICAgICAgICAgX3RoaXM0Ll9lbWl0TGluZSgnaWYoIWNiKSB7IGNiID0gZnVuY3Rpb24oZXJyKSB7IGlmKGVycikgeyB0aHJvdyBlcnI7IH19fScpO1xuXG4gICAgICAgICAgdmFyIGlkID0gX3RoaXM0Ll9wdXNoQnVmZmVyKCk7XG5cbiAgICAgICAgICBfdGhpczQuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXM0LmNvbXBpbGUoYXJnLCBmcmFtZSk7XG5cbiAgICAgICAgICAgIF90aGlzNC5fZW1pdExpbmUoXCJjYihudWxsLCBcIiArIGlkICsgXCIpO1wiKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIF90aGlzNC5fcG9wQnVmZmVyKCk7XG5cbiAgICAgICAgICBfdGhpczQuX2VtaXRMaW5lKFwicmV0dXJuIFwiICsgaWQgKyBcIjtcIik7XG5cbiAgICAgICAgICBfdGhpczQuX2VtaXRMaW5lKCd9Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgX3RoaXM0Ll9lbWl0KCdudWxsJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChhc3luYykge1xuICAgICAgdmFyIHJlcyA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCcsICcgKyB0aGlzLl9tYWtlQ2FsbGJhY2socmVzKSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKHRoaXMuYnVmZmVyICsgXCIgKz0gcnVudGltZS5zdXBwcmVzc1ZhbHVlKFwiICsgcmVzICsgXCIsIFwiICsgYXV0b2VzY2FwZSArIFwiICYmIGVudi5vcHRzLmF1dG9lc2NhcGUpO1wiKTtcblxuICAgICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbWl0KCcpJyk7XG5cbiAgICAgIHRoaXMuX2VtaXQoXCIsIFwiICsgYXV0b2VzY2FwZSArIFwiICYmIGVudi5vcHRzLmF1dG9lc2NhcGUpO1xcblwiKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYWxsRXh0ZW5zaW9uQXN5bmMgPSBmdW5jdGlvbiBjb21waWxlQ2FsbEV4dGVuc2lvbkFzeW5jKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5jb21waWxlQ2FsbEV4dGVuc2lvbihub2RlLCBmcmFtZSwgdHJ1ZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVOb2RlTGlzdCA9IGZ1bmN0aW9uIGNvbXBpbGVOb2RlTGlzdChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVDaGlsZHJlbihub2RlLCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVMaXRlcmFsID0gZnVuY3Rpb24gY29tcGlsZUxpdGVyYWwobm9kZSkge1xuICAgIGlmICh0eXBlb2Ygbm9kZS52YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhciB2YWwgPSBub2RlLnZhbHVlLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJyk7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpO1xuICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKTtcbiAgICAgIHZhbCA9IHZhbC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJyk7XG4gICAgICB2YWwgPSB2YWwucmVwbGFjZSgvXFx0L2csICdcXFxcdCcpO1xuICAgICAgdmFsID0gdmFsLnJlcGxhY2UoL1xcdTIwMjgvZywgXCJcXFxcdTIwMjhcIik7XG5cbiAgICAgIHRoaXMuX2VtaXQoXCJcXFwiXCIgKyB2YWwgKyBcIlxcXCJcIik7XG4gICAgfSBlbHNlIGlmIChub2RlLnZhbHVlID09PSBudWxsKSB7XG4gICAgICB0aGlzLl9lbWl0KCdudWxsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQobm9kZS52YWx1ZS50b1N0cmluZygpKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVTeW1ib2wgPSBmdW5jdGlvbiBjb21waWxlU3ltYm9sKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBub2RlLnZhbHVlO1xuICAgIHZhciB2ID0gZnJhbWUubG9va3VwKG5hbWUpO1xuXG4gICAgaWYgKHYpIHtcbiAgICAgIHRoaXMuX2VtaXQodik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUuY29udGV4dE9yRnJhbWVMb29rdXAoJyArICdjb250ZXh0LCBmcmFtZSwgXCInICsgbmFtZSArICdcIiknKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVHcm91cCA9IGZ1bmN0aW9uIGNvbXBpbGVHcm91cChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVBZ2dyZWdhdGUobm9kZSwgZnJhbWUsICcoJywgJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUFycmF5ID0gZnVuY3Rpb24gY29tcGlsZUFycmF5KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLCBmcmFtZSwgJ1snLCAnXScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRGljdCA9IGZ1bmN0aW9uIGNvbXBpbGVEaWN0KG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fY29tcGlsZUFnZ3JlZ2F0ZShub2RlLCBmcmFtZSwgJ3snLCAnfScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUGFpciA9IGZ1bmN0aW9uIGNvbXBpbGVQYWlyKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIGtleSA9IG5vZGUua2V5O1xuICAgIHZhciB2YWwgPSBub2RlLnZhbHVlO1xuXG4gICAgaWYgKGtleSBpbnN0YW5jZW9mIG5vZGVzLlN5bWJvbCkge1xuICAgICAga2V5ID0gbmV3IG5vZGVzLkxpdGVyYWwoa2V5LmxpbmVubywga2V5LmNvbG5vLCBrZXkudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoIShrZXkgaW5zdGFuY2VvZiBub2Rlcy5MaXRlcmFsICYmIHR5cGVvZiBrZXkudmFsdWUgPT09ICdzdHJpbmcnKSkge1xuICAgICAgdGhpcy5mYWlsKCdjb21waWxlUGFpcjogRGljdCBrZXlzIG11c3QgYmUgc3RyaW5ncyBvciBuYW1lcycsIGtleS5saW5lbm8sIGtleS5jb2xubyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21waWxlKGtleSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnOiAnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKHZhbCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlSW5saW5lSWYgPSBmdW5jdGlvbiBjb21waWxlSW5saW5lSWYobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCcoJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5jb25kLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCc/Jyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCc6Jyk7XG5cbiAgICBpZiAobm9kZS5lbHNlXyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZWxzZV8sIGZyYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdCgnXCJcIicpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUluID0gZnVuY3Rpb24gY29tcGlsZUluKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgncnVudGltZS5pbk9wZXJhdG9yKCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUubGVmdCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnLCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUlzID0gZnVuY3Rpb24gY29tcGlsZUlzKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gZmlyc3QsIHdlIG5lZWQgdG8gdHJ5IHRvIGdldCB0aGUgbmFtZSBvZiB0aGUgdGVzdCBmdW5jdGlvbiwgaWYgaXQncyBhXG4gICAgLy8gY2FsbGFibGUgKGkuZS4sIGhhcyBhcmdzKSBhbmQgbm90IGEgc3ltYm9sLlxuICAgIHZhciByaWdodCA9IG5vZGUucmlnaHQubmFtZSA/IG5vZGUucmlnaHQubmFtZS52YWx1ZSAvLyBvdGhlcndpc2UgZ28gd2l0aCB0aGUgc3ltYm9sIHZhbHVlXG4gICAgOiBub2RlLnJpZ2h0LnZhbHVlO1xuXG4gICAgdGhpcy5fZW1pdCgnZW52LmdldFRlc3QoXCInICsgcmlnaHQgKyAnXCIpLmNhbGwoY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5sZWZ0LCBmcmFtZSk7IC8vIGNvbXBpbGUgdGhlIGFyZ3VtZW50cyBmb3IgdGhlIGNhbGxhYmxlIGlmIHRoZXkgZXhpc3RcblxuICAgIGlmIChub2RlLnJpZ2h0LmFyZ3MpIHtcbiAgICAgIHRoaXMuX2VtaXQoJywnKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUucmlnaHQuYXJncywgZnJhbWUpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXQoJykgPT09IHRydWUnKTtcbiAgfTtcblxuICBfcHJvdG8uX2Jpbk9wRW1pdHRlciA9IGZ1bmN0aW9uIF9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsIHN0cikge1xuICAgIHRoaXMuY29tcGlsZShub2RlLmxlZnQsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoc3RyKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnJpZ2h0LCBmcmFtZSk7XG4gIH0gLy8gZW5zdXJlIGNvbmNhdGVuYXRpb24gaW5zdGVhZCBvZiBhZGRpdGlvblxuICAvLyBieSBhZGRpbmcgZW1wdHkgc3RyaW5nIGluIGJldHdlZW5cbiAgO1xuXG4gIF9wcm90by5jb21waWxlT3IgPSBmdW5jdGlvbiBjb21waWxlT3Iobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnIHx8ICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQW5kID0gZnVuY3Rpb24gY29tcGlsZUFuZChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgJiYgJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVBZGQgPSBmdW5jdGlvbiBjb21waWxlQWRkKG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyArICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQ29uY2F0ID0gZnVuY3Rpb24gY29tcGlsZUNvbmNhdChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgKyBcIlwiICsgJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVTdWIgPSBmdW5jdGlvbiBjb21waWxlU3ViKG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyAtICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTXVsID0gZnVuY3Rpb24gY29tcGlsZU11bChub2RlLCBmcmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9iaW5PcEVtaXR0ZXIobm9kZSwgZnJhbWUsICcgKiAnKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZURpdiA9IGZ1bmN0aW9uIGNvbXBpbGVEaXYobm9kZSwgZnJhbWUpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluT3BFbWl0dGVyKG5vZGUsIGZyYW1lLCAnIC8gJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVNb2QgPSBmdW5jdGlvbiBjb21waWxlTW9kKG5vZGUsIGZyYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Jpbk9wRW1pdHRlcihub2RlLCBmcmFtZSwgJyAlICcpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTm90ID0gZnVuY3Rpb24gY29tcGlsZU5vdChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJyEnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnRhcmdldCwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRmxvb3JEaXYgPSBmdW5jdGlvbiBjb21waWxlRmxvb3JEaXYobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdNYXRoLmZsb29yKCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUubGVmdCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnIC8gJyk7XG5cbiAgICB0aGlzLmNvbXBpbGUobm9kZS5yaWdodCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUG93ID0gZnVuY3Rpb24gY29tcGlsZVBvdyhub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJ01hdGgucG93KCcpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUubGVmdCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnLCAnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLnJpZ2h0LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVOZWcgPSBmdW5jdGlvbiBjb21waWxlTmVnKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnLScpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUudGFyZ2V0LCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVQb3MgPSBmdW5jdGlvbiBjb21waWxlUG9zKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnKycpO1xuXG4gICAgdGhpcy5jb21waWxlKG5vZGUudGFyZ2V0LCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDb21wYXJlID0gZnVuY3Rpb24gY29tcGlsZUNvbXBhcmUobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmV4cHIsIGZyYW1lKTtcbiAgICBub2RlLm9wcy5mb3JFYWNoKGZ1bmN0aW9uIChvcCkge1xuICAgICAgX3RoaXM1Ll9lbWl0KFwiIFwiICsgY29tcGFyZU9wc1tvcC50eXBlXSArIFwiIFwiKTtcblxuICAgICAgX3RoaXM1LmNvbXBpbGUob3AuZXhwciwgZnJhbWUpO1xuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlTG9va3VwVmFsID0gZnVuY3Rpb24gY29tcGlsZUxvb2t1cFZhbChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXQoJ3J1bnRpbWUubWVtYmVyTG9va3VwKCgnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudGFyZ2V0LCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0KCcpLCcpO1xuXG4gICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS52YWwsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJyknKTtcbiAgfTtcblxuICBfcHJvdG8uX2dldE5vZGVOYW1lID0gZnVuY3Rpb24gX2dldE5vZGVOYW1lKG5vZGUpIHtcbiAgICBzd2l0Y2ggKG5vZGUudHlwZW5hbWUpIHtcbiAgICAgIGNhc2UgJ1N5bWJvbCc6XG4gICAgICAgIHJldHVybiBub2RlLnZhbHVlO1xuXG4gICAgICBjYXNlICdGdW5DYWxsJzpcbiAgICAgICAgcmV0dXJuICd0aGUgcmV0dXJuIHZhbHVlIG9mICgnICsgdGhpcy5fZ2V0Tm9kZU5hbWUobm9kZS5uYW1lKSArICcpJztcblxuICAgICAgY2FzZSAnTG9va3VwVmFsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldE5vZGVOYW1lKG5vZGUudGFyZ2V0KSArICdbXCInICsgdGhpcy5fZ2V0Tm9kZU5hbWUobm9kZS52YWwpICsgJ1wiXSc7XG5cbiAgICAgIGNhc2UgJ0xpdGVyYWwnOlxuICAgICAgICByZXR1cm4gbm9kZS52YWx1ZS50b1N0cmluZygpO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJy0tZXhwcmVzc2lvbi0tJztcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVGdW5DYWxsID0gZnVuY3Rpb24gY29tcGlsZUZ1bkNhbGwobm9kZSwgZnJhbWUpIHtcbiAgICAvLyBLZWVwIHRyYWNrIG9mIGxpbmUvY29sIGluZm8gYXQgcnVudGltZSBieSBzZXR0aW5nc1xuICAgIC8vIHZhcmlhYmxlcyB3aXRoaW4gYW4gZXhwcmVzc2lvbi4gQW4gZXhwcmVzc2lvbiBpbiBqYXZhc2NyaXB0XG4gICAgLy8gbGlrZSAoeCwgeSwgeikgcmV0dXJucyB0aGUgbGFzdCB2YWx1ZSwgYW5kIHggYW5kIHkgY2FuIGJlXG4gICAgLy8gYW55dGhpbmdcbiAgICB0aGlzLl9lbWl0KCcobGluZW5vID0gJyArIG5vZGUubGluZW5vICsgJywgY29sbm8gPSAnICsgbm9kZS5jb2xubyArICcsICcpO1xuXG4gICAgdGhpcy5fZW1pdCgncnVudGltZS5jYWxsV3JhcCgnKTsgLy8gQ29tcGlsZSBpdCBhcyBub3JtYWwuXG5cblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUubmFtZSwgZnJhbWUpOyAvLyBPdXRwdXQgdGhlIG5hbWUgb2Ygd2hhdCB3ZSdyZSBjYWxsaW5nIHNvIHdlIGNhbiBnZXQgZnJpZW5kbHkgZXJyb3JzXG4gICAgLy8gaWYgdGhlIGxvb2t1cCBmYWlscy5cblxuXG4gICAgdGhpcy5fZW1pdCgnLCBcIicgKyB0aGlzLl9nZXROb2RlTmFtZShub2RlLm5hbWUpLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArICdcIiwgY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLl9jb21waWxlQWdncmVnYXRlKG5vZGUuYXJncywgZnJhbWUsICdbJywgJ10pJyk7XG5cbiAgICB0aGlzLl9lbWl0KCcpJyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVGaWx0ZXIgPSBmdW5jdGlvbiBjb21waWxlRmlsdGVyKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIG5hbWUgPSBub2RlLm5hbWU7XG4gICAgdGhpcy5hc3NlcnRUeXBlKG5hbWUsIG5vZGVzLlN5bWJvbCk7XG5cbiAgICB0aGlzLl9lbWl0KCdlbnYuZ2V0RmlsdGVyKFwiJyArIG5hbWUudmFsdWUgKyAnXCIpLmNhbGwoY29udGV4dCwgJyk7XG5cbiAgICB0aGlzLl9jb21waWxlQWdncmVnYXRlKG5vZGUuYXJncywgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlRmlsdGVyQXN5bmMgPSBmdW5jdGlvbiBjb21waWxlRmlsdGVyQXN5bmMobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgbmFtZSA9IG5vZGUubmFtZTtcbiAgICB2YXIgc3ltYm9sID0gbm9kZS5zeW1ib2wudmFsdWU7XG4gICAgdGhpcy5hc3NlcnRUeXBlKG5hbWUsIG5vZGVzLlN5bWJvbCk7XG4gICAgZnJhbWUuc2V0KHN5bWJvbCwgc3ltYm9sKTtcblxuICAgIHRoaXMuX2VtaXQoJ2Vudi5nZXRGaWx0ZXIoXCInICsgbmFtZS52YWx1ZSArICdcIikuY2FsbChjb250ZXh0LCAnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVBZ2dyZWdhdGUobm9kZS5hcmdzLCBmcmFtZSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnLCAnICsgdGhpcy5fbWFrZUNhbGxiYWNrKHN5bWJvbCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlS2V5d29yZEFyZ3MgPSBmdW5jdGlvbiBjb21waWxlS2V5d29yZEFyZ3Mobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9lbWl0KCdydW50aW1lLm1ha2VLZXl3b3JkQXJncygnKTtcblxuICAgIHRoaXMuY29tcGlsZURpY3Qobm9kZSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdCgnKScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlU2V0ID0gZnVuY3Rpb24gY29tcGlsZVNldChub2RlLCBmcmFtZSkge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgdmFyIGlkcyA9IFtdOyAvLyBMb29rdXAgdGhlIHZhcmlhYmxlIG5hbWVzIGZvciBlYWNoIGlkZW50aWZpZXIgYW5kIGNyZWF0ZVxuICAgIC8vIG5ldyBvbmVzIGlmIG5lY2Vzc2FyeVxuXG4gICAgbm9kZS50YXJnZXRzLmZvckVhY2goZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIG5hbWUgPSB0YXJnZXQudmFsdWU7XG4gICAgICB2YXIgaWQgPSBmcmFtZS5sb29rdXAobmFtZSk7XG5cbiAgICAgIGlmIChpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlkID0gX3RoaXM2Ll90bXBpZCgpOyAvLyBOb3RlOiBUaGlzIHJlbGllcyBvbiBqcyBhbGxvd2luZyBzY29wZSBhY3Jvc3NcbiAgICAgICAgLy8gYmxvY2tzLCBpbiBjYXNlIHRoaXMgaXMgY3JlYXRlZCBpbnNpZGUgYW4gYGlmYFxuXG4gICAgICAgIF90aGlzNi5fZW1pdExpbmUoJ3ZhciAnICsgaWQgKyAnOycpO1xuICAgICAgfVxuXG4gICAgICBpZHMucHVzaChpZCk7XG4gICAgfSk7XG5cbiAgICBpZiAobm9kZS52YWx1ZSkge1xuICAgICAgdGhpcy5fZW1pdChpZHMuam9pbignID0gJykgKyAnID0gJyk7XG5cbiAgICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudmFsdWUsIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJzsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdChpZHMuam9pbignID0gJykgKyAnID0gJyk7XG5cbiAgICAgIHRoaXMuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJzsnKTtcbiAgICB9XG5cbiAgICBub2RlLnRhcmdldHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0LCBpKSB7XG4gICAgICB2YXIgaWQgPSBpZHNbaV07XG4gICAgICB2YXIgbmFtZSA9IHRhcmdldC52YWx1ZTsgLy8gV2UgYXJlIHJ1bm5pbmcgdGhpcyBmb3IgZXZlcnkgdmFyLCBidXQgaXQncyB2ZXJ5XG4gICAgICAvLyB1bmNvbW1vbiB0byBhc3NpZ24gdG8gbXVsdGlwbGUgdmFycyBhbnl3YXlcblxuICAgICAgX3RoaXM2Ll9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBuYW1lICsgXCJcXFwiLCBcIiArIGlkICsgXCIsIHRydWUpO1wiKTtcblxuICAgICAgX3RoaXM2Ll9lbWl0TGluZSgnaWYoZnJhbWUudG9wTGV2ZWwpIHsnKTtcblxuICAgICAgX3RoaXM2Ll9lbWl0TGluZShcImNvbnRleHQuc2V0VmFyaWFibGUoXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG5cbiAgICAgIF90aGlzNi5fZW1pdExpbmUoJ30nKTtcblxuICAgICAgaWYgKG5hbWUuY2hhckF0KDApICE9PSAnXycpIHtcbiAgICAgICAgX3RoaXM2Ll9lbWl0TGluZSgnaWYoZnJhbWUudG9wTGV2ZWwpIHsnKTtcblxuICAgICAgICBfdGhpczYuX2VtaXRMaW5lKFwiY29udGV4dC5hZGRFeHBvcnQoXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG5cbiAgICAgICAgX3RoaXM2Ll9lbWl0TGluZSgnfScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlU3dpdGNoID0gZnVuY3Rpb24gY29tcGlsZVN3aXRjaChub2RlLCBmcmFtZSkge1xuICAgIHZhciBfdGhpczcgPSB0aGlzO1xuXG4gICAgdGhpcy5fZW1pdCgnc3dpdGNoICgnKTtcblxuICAgIHRoaXMuY29tcGlsZShub2RlLmV4cHIsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXQoJykgeycpO1xuXG4gICAgbm9kZS5jYXNlcy5mb3JFYWNoKGZ1bmN0aW9uIChjLCBpKSB7XG4gICAgICBfdGhpczcuX2VtaXQoJ2Nhc2UgJyk7XG5cbiAgICAgIF90aGlzNy5jb21waWxlKGMuY29uZCwgZnJhbWUpO1xuXG4gICAgICBfdGhpczcuX2VtaXQoJzogJyk7XG5cbiAgICAgIF90aGlzNy5jb21waWxlKGMuYm9keSwgZnJhbWUpOyAvLyBwcmVzZXJ2ZSBmYWxsLXRocm91Z2hzXG5cblxuICAgICAgaWYgKGMuYm9keS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgX3RoaXM3Ll9lbWl0TGluZSgnYnJlYWs7Jyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobm9kZS5kZWZhdWx0KSB7XG4gICAgICB0aGlzLl9lbWl0KCdkZWZhdWx0OicpO1xuXG4gICAgICB0aGlzLmNvbXBpbGUobm9kZS5kZWZhdWx0LCBmcmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdCgnfScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlSWYgPSBmdW5jdGlvbiBjb21waWxlSWYobm9kZSwgZnJhbWUsIGFzeW5jKSB7XG4gICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICB0aGlzLl9lbWl0KCdpZignKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUuY29uZCwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJykgeycpO1xuXG4gICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpczguY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcblxuICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgIF90aGlzOC5fZW1pdCgnY2IoKScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vZGUuZWxzZV8pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9XFxuZWxzZSB7Jyk7XG5cbiAgICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczguY29tcGlsZShub2RlLmVsc2VfLCBmcmFtZSk7XG5cbiAgICAgICAgaWYgKGFzeW5jKSB7XG4gICAgICAgICAgX3RoaXM4Ll9lbWl0KCdjYigpJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoYXN5bmMpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9XFxuZWxzZSB7Jyk7XG5cbiAgICAgIHRoaXMuX2VtaXQoJ2NiKCknKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlSWZBc3luYyA9IGZ1bmN0aW9uIGNvbXBpbGVJZkFzeW5jKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5fZW1pdCgnKGZ1bmN0aW9uKGNiKSB7Jyk7XG5cbiAgICB0aGlzLmNvbXBpbGVJZihub2RlLCBmcmFtZSwgdHJ1ZSk7XG5cbiAgICB0aGlzLl9lbWl0KCd9KSgnICsgdGhpcy5fbWFrZUNhbGxiYWNrKCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuICB9O1xuXG4gIF9wcm90by5fZW1pdExvb3BCaW5kaW5ncyA9IGZ1bmN0aW9uIF9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKSB7XG4gICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICB2YXIgYmluZGluZ3MgPSBbe1xuICAgICAgbmFtZTogJ2luZGV4JyxcbiAgICAgIHZhbDogaSArIFwiICsgMVwiXG4gICAgfSwge1xuICAgICAgbmFtZTogJ2luZGV4MCcsXG4gICAgICB2YWw6IGlcbiAgICB9LCB7XG4gICAgICBuYW1lOiAncmV2aW5kZXgnLFxuICAgICAgdmFsOiBsZW4gKyBcIiAtIFwiICsgaVxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdyZXZpbmRleDAnLFxuICAgICAgdmFsOiBsZW4gKyBcIiAtIFwiICsgaSArIFwiIC0gMVwiXG4gICAgfSwge1xuICAgICAgbmFtZTogJ2ZpcnN0JyxcbiAgICAgIHZhbDogaSArIFwiID09PSAwXCJcbiAgICB9LCB7XG4gICAgICBuYW1lOiAnbGFzdCcsXG4gICAgICB2YWw6IGkgKyBcIiA9PT0gXCIgKyBsZW4gKyBcIiAtIDFcIlxuICAgIH0sIHtcbiAgICAgIG5hbWU6ICdsZW5ndGgnLFxuICAgICAgdmFsOiBsZW5cbiAgICB9XTtcbiAgICBiaW5kaW5ncy5mb3JFYWNoKGZ1bmN0aW9uIChiKSB7XG4gICAgICBfdGhpczkuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJsb29wLlwiICsgYi5uYW1lICsgXCJcXFwiLCBcIiArIGIudmFsICsgXCIpO1wiKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUZvciA9IGZ1bmN0aW9uIGNvbXBpbGVGb3Iobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICAvLyBTb21lIG9mIHRoaXMgY29kZSBpcyB1Z2x5LCBidXQgaXQga2VlcHMgdGhlIGdlbmVyYXRlZCBjb2RlXG4gICAgLy8gYXMgZmFzdCBhcyBwb3NzaWJsZS4gRm9yQXN5bmMgYWxzbyBzaGFyZXMgc29tZSBvZiB0aGlzLCBidXRcbiAgICAvLyBub3QgbXVjaC5cbiAgICB2YXIgaSA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgbGVuID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBhcnIgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgZnJhbWUgPSBmcmFtZS5wdXNoKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSBmcmFtZS5wdXNoKCk7Jyk7XG5cbiAgICB0aGlzLl9lbWl0KFwidmFyIFwiICsgYXJyICsgXCIgPSBcIik7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLmFyciwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJzsnKTtcblxuICAgIHRoaXMuX2VtaXQoXCJpZihcIiArIGFyciArIFwiKSB7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoYXJyICsgJyA9IHJ1bnRpbWUuZnJvbUl0ZXJhdG9yKCcgKyBhcnIgKyAnKTsnKTsgLy8gSWYgbXVsdGlwbGUgbmFtZXMgYXJlIHBhc3NlZCwgd2UgbmVlZCB0byBiaW5kIHRoZW1cbiAgICAvLyBhcHByb3ByaWF0ZWx5XG5cblxuICAgIGlmIChub2RlLm5hbWUgaW5zdGFuY2VvZiBub2Rlcy5BcnJheSkge1xuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBpICsgXCI7XCIpOyAvLyBUaGUgb2JqZWN0IGNvdWxkIGJlIGFuIGFycm95IG9yIG9iamVjdC4gTm90ZSB0aGF0IHRoZVxuICAgICAgLy8gYm9keSBvZiB0aGUgbG9vcCBpcyBkdXBsaWNhdGVkIGZvciBlYWNoIGNvbmRpdGlvbiwgYnV0XG4gICAgICAvLyB3ZSBhcmUgb3B0aW1pemluZyBmb3Igc3BlZWQgb3ZlciBzaXplLlxuXG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiaWYocnVudGltZS5pc0FycmF5KFwiICsgYXJyICsgXCIpKSB7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInZhciBcIiArIGxlbiArIFwiID0gXCIgKyBhcnIgKyBcIi5sZW5ndGg7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZvcihcIiArIGkgKyBcIj0wOyBcIiArIGkgKyBcIiA8IFwiICsgYXJyICsgXCIubGVuZ3RoOyBcIiArIGkgKyBcIisrKSB7XCIpOyAvLyBCaW5kIGVhY2ggZGVjbGFyZWQgdmFyXG5cblxuICAgICAgbm9kZS5uYW1lLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkLCB1KSB7XG4gICAgICAgIHZhciB0aWQgPSBfdGhpczEwLl90bXBpZCgpO1xuXG4gICAgICAgIF90aGlzMTAuX2VtaXRMaW5lKFwidmFyIFwiICsgdGlkICsgXCIgPSBcIiArIGFyciArIFwiW1wiICsgaSArIFwiXVtcIiArIHUgKyBcIl07XCIpO1xuXG4gICAgICAgIF90aGlzMTAuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIGNoaWxkICsgXCJcXFwiLCBcIiArIGFyciArIFwiW1wiICsgaSArIFwiXVtcIiArIHUgKyBcIl0pO1wiKTtcblxuICAgICAgICBmcmFtZS5zZXQobm9kZS5uYW1lLmNoaWxkcmVuW3VdLnZhbHVlLCB0aWQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMb29wQmluZGluZ3Mobm9kZSwgYXJyLCBpLCBsZW4pO1xuXG4gICAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMxMC5jb21waWxlKG5vZGUuYm9keSwgZnJhbWUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKCd9IGVsc2UgeycpOyAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleS92YWx1ZXMgb2YgYW4gb2JqZWN0XG5cblxuICAgICAgdmFyIF9ub2RlJG5hbWUkY2hpbGRyZW4gPSBub2RlLm5hbWUuY2hpbGRyZW4sXG4gICAgICAgICAga2V5ID0gX25vZGUkbmFtZSRjaGlsZHJlblswXSxcbiAgICAgICAgICB2YWwgPSBfbm9kZSRuYW1lJGNoaWxkcmVuWzFdO1xuXG4gICAgICB2YXIgayA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICAgIHZhciB2ID0gdGhpcy5fdG1waWQoKTtcblxuICAgICAgZnJhbWUuc2V0KGtleS52YWx1ZSwgayk7XG4gICAgICBmcmFtZS5zZXQodmFsLnZhbHVlLCB2KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoaSArIFwiID0gLTE7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInZhciBcIiArIGxlbiArIFwiID0gcnVudGltZS5rZXlzKFwiICsgYXJyICsgXCIpLmxlbmd0aDtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiZm9yKHZhciBcIiArIGsgKyBcIiBpbiBcIiArIGFyciArIFwiKSB7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShpICsgXCIrKztcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwidmFyIFwiICsgdiArIFwiID0gXCIgKyBhcnIgKyBcIltcIiArIGsgKyBcIl07XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBrZXkudmFsdWUgKyBcIlxcXCIsIFwiICsgayArIFwiKTtcIik7XG5cbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIHZhbC52YWx1ZSArIFwiXFxcIiwgXCIgKyB2ICsgXCIpO1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExvb3BCaW5kaW5ncyhub2RlLCBhcnIsIGksIGxlbik7XG5cbiAgICAgIHRoaXMuX3dpdGhTY29wZWRTeW50YXgoZnVuY3Rpb24gKCkge1xuICAgICAgICBfdGhpczEwLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gR2VuZXJhdGUgYSB0eXBpY2FsIGFycmF5IGl0ZXJhdGlvblxuICAgICAgdmFyIF92ID0gdGhpcy5fdG1waWQoKTtcblxuICAgICAgZnJhbWUuc2V0KG5vZGUubmFtZS52YWx1ZSwgX3YpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInZhciBcIiArIGxlbiArIFwiID0gXCIgKyBhcnIgKyBcIi5sZW5ndGg7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZvcih2YXIgXCIgKyBpICsgXCI9MDsgXCIgKyBpICsgXCIgPCBcIiArIGFyciArIFwiLmxlbmd0aDsgXCIgKyBpICsgXCIrKykge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJ2YXIgXCIgKyBfdiArIFwiID0gXCIgKyBhcnIgKyBcIltcIiArIGkgKyBcIl07XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBub2RlLm5hbWUudmFsdWUgKyBcIlxcXCIsIFwiICsgX3YgKyBcIik7XCIpO1xuXG4gICAgICB0aGlzLl9lbWl0TG9vcEJpbmRpbmdzKG5vZGUsIGFyciwgaSwgbGVuKTtcblxuICAgICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMTAuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICBpZiAobm9kZS5lbHNlXykge1xuICAgICAgdGhpcy5fZW1pdExpbmUoJ2lmICghJyArIGxlbiArICcpIHsnKTtcblxuICAgICAgdGhpcy5jb21waWxlKG5vZGUuZWxzZV8sIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSBmcmFtZS5wb3AoKTsnKTtcbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVBc3luY0xvb3AgPSBmdW5jdGlvbiBfY29tcGlsZUFzeW5jTG9vcChub2RlLCBmcmFtZSwgcGFyYWxsZWwpIHtcbiAgICB2YXIgX3RoaXMxMSA9IHRoaXM7XG5cbiAgICAvLyBUaGlzIHNoYXJlcyBzb21lIGNvZGUgd2l0aCB0aGUgRm9yIHRhZywgYnV0IG5vdCBlbm91Z2ggdG9cbiAgICAvLyB3b3JyeSBhYm91dC4gVGhpcyBpdGVyYXRlcyBhY3Jvc3MgYW4gb2JqZWN0IGFzeW5jaHJvbm91c2x5LFxuICAgIC8vIGJ1dCBub3QgaW4gcGFyYWxsZWwuXG4gICAgdmFyIGkgPSB0aGlzLl90bXBpZCgpO1xuXG4gICAgdmFyIGxlbiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgYXJyID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBhc3luY01ldGhvZCA9IHBhcmFsbGVsID8gJ2FzeW5jQWxsJyA6ICdhc3luY0VhY2gnO1xuICAgIGZyYW1lID0gZnJhbWUucHVzaCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lID0gZnJhbWUucHVzaCgpOycpO1xuXG4gICAgdGhpcy5fZW1pdCgndmFyICcgKyBhcnIgKyAnID0gcnVudGltZS5mcm9tSXRlcmF0b3IoJyk7XG5cbiAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLmFyciwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJyk7Jyk7XG5cbiAgICBpZiAobm9kZS5uYW1lIGluc3RhbmNlb2Ygbm9kZXMuQXJyYXkpIHtcbiAgICAgIHZhciBhcnJheUxlbiA9IG5vZGUubmFtZS5jaGlsZHJlbi5sZW5ndGg7XG5cbiAgICAgIHRoaXMuX2VtaXQoXCJydW50aW1lLlwiICsgYXN5bmNNZXRob2QgKyBcIihcIiArIGFyciArIFwiLCBcIiArIGFycmF5TGVuICsgXCIsIGZ1bmN0aW9uKFwiKTtcblxuICAgICAgbm9kZS5uYW1lLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgX3RoaXMxMS5fZW1pdChuYW1lLnZhbHVlICsgXCIsXCIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtaXQoaSArICcsJyArIGxlbiArICcsbmV4dCkgeycpO1xuXG4gICAgICBub2RlLm5hbWUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgaWQgPSBuYW1lLnZhbHVlO1xuICAgICAgICBmcmFtZS5zZXQoaWQsIGlkKTtcblxuICAgICAgICBfdGhpczExLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBpZCArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGlkID0gbm9kZS5uYW1lLnZhbHVlO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZShcInJ1bnRpbWUuXCIgKyBhc3luY01ldGhvZCArIFwiKFwiICsgYXJyICsgXCIsIDEsIGZ1bmN0aW9uKFwiICsgaWQgKyBcIiwgXCIgKyBpICsgXCIsIFwiICsgbGVuICsgXCIsbmV4dCkge1wiKTtcblxuICAgICAgdGhpcy5fZW1pdExpbmUoJ2ZyYW1lLnNldChcIicgKyBpZCArICdcIiwgJyArIGlkICsgJyk7Jyk7XG5cbiAgICAgIGZyYW1lLnNldChpZCwgaWQpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMb29wQmluZGluZ3Mobm9kZSwgYXJyLCBpLCBsZW4pO1xuXG4gICAgdGhpcy5fd2l0aFNjb3BlZFN5bnRheChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYnVmO1xuXG4gICAgICBpZiAocGFyYWxsZWwpIHtcbiAgICAgICAgYnVmID0gX3RoaXMxMS5fcHVzaEJ1ZmZlcigpO1xuICAgICAgfVxuXG4gICAgICBfdGhpczExLmNvbXBpbGUobm9kZS5ib2R5LCBmcmFtZSk7XG5cbiAgICAgIF90aGlzMTEuX2VtaXRMaW5lKCduZXh0KCcgKyBpICsgKGJ1ZiA/ICcsJyArIGJ1ZiA6ICcnKSArICcpOycpO1xuXG4gICAgICBpZiAocGFyYWxsZWwpIHtcbiAgICAgICAgX3RoaXMxMS5fcG9wQnVmZmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgb3V0cHV0ID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9LCAnICsgdGhpcy5fbWFrZUNhbGxiYWNrKG91dHB1dCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgaWYgKHBhcmFsbGVsKSB7XG4gICAgICB0aGlzLl9lbWl0TGluZSh0aGlzLmJ1ZmZlciArICcgKz0gJyArIG91dHB1dCArICc7Jyk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuZWxzZV8pIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKCdpZiAoIScgKyBhcnIgKyAnLmxlbmd0aCkgeycpO1xuXG4gICAgICB0aGlzLmNvbXBpbGUobm9kZS5lbHNlXywgZnJhbWUpO1xuXG4gICAgICB0aGlzLl9lbWl0TGluZSgnfScpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmcmFtZSA9IGZyYW1lLnBvcCgpOycpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQXN5bmNFYWNoID0gZnVuY3Rpb24gY29tcGlsZUFzeW5jRWFjaChub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2NvbXBpbGVBc3luY0xvb3Aobm9kZSwgZnJhbWUpO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlQXN5bmNBbGwgPSBmdW5jdGlvbiBjb21waWxlQXN5bmNBbGwobm9kZSwgZnJhbWUpIHtcbiAgICB0aGlzLl9jb21waWxlQXN5bmNMb29wKG5vZGUsIGZyYW1lLCB0cnVlKTtcbiAgfTtcblxuICBfcHJvdG8uX2NvbXBpbGVNYWNybyA9IGZ1bmN0aW9uIF9jb21waWxlTWFjcm8obm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMxMiA9IHRoaXM7XG5cbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIHZhciBrd2FyZ3MgPSBudWxsO1xuXG4gICAgdmFyIGZ1bmNJZCA9ICdtYWNyb18nICsgdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBrZWVwRnJhbWUgPSBmcmFtZSAhPT0gdW5kZWZpbmVkOyAvLyBUeXBlIGNoZWNrIHRoZSBkZWZpbml0aW9uIG9mIHRoZSBhcmdzXG5cbiAgICBub2RlLmFyZ3MuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYXJnLCBpKSB7XG4gICAgICBpZiAoaSA9PT0gbm9kZS5hcmdzLmNoaWxkcmVuLmxlbmd0aCAtIDEgJiYgYXJnIGluc3RhbmNlb2Ygbm9kZXMuRGljdCkge1xuICAgICAgICBrd2FyZ3MgPSBhcmc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpczEyLmFzc2VydFR5cGUoYXJnLCBub2Rlcy5TeW1ib2wpO1xuXG4gICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciByZWFsTmFtZXMgPSBbXS5jb25jYXQoYXJncy5tYXAoZnVuY3Rpb24gKG4pIHtcbiAgICAgIHJldHVybiBcImxfXCIgKyBuLnZhbHVlO1xuICAgIH0pLCBbJ2t3YXJncyddKTsgLy8gUXVvdGVkIGFyZ3VtZW50IG5hbWVzXG5cbiAgICB2YXIgYXJnTmFtZXMgPSBhcmdzLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIFwiXFxcIlwiICsgbi52YWx1ZSArIFwiXFxcIlwiO1xuICAgIH0pO1xuICAgIHZhciBrd2FyZ05hbWVzID0gKGt3YXJncyAmJiBrd2FyZ3MuY2hpbGRyZW4gfHwgW10pLm1hcChmdW5jdGlvbiAobikge1xuICAgICAgcmV0dXJuIFwiXFxcIlwiICsgbi5rZXkudmFsdWUgKyBcIlxcXCJcIjtcbiAgICB9KTsgLy8gV2UgcGFzcyBhIGZ1bmN0aW9uIHRvIG1ha2VNYWNybyB3aGljaCBkZXN0cnVjdHVyZXMgdGhlXG4gICAgLy8gYXJndW1lbnRzIHNvIHN1cHBvcnQgc2V0dGluZyBwb3NpdGlvbmFsIGFyZ3Mgd2l0aCBrZXl3b3Jkc1xuICAgIC8vIGFyZ3MgYW5kIHBhc3Npbmcga2V5d29yZCBhcmdzIGFzIHBvc2l0aW9uYWwgYXJnc1xuICAgIC8vIChlc3NlbnRpYWxseSBkZWZhdWx0IHZhbHVlcykuIFNlZSBydW50aW1lLmpzLlxuXG4gICAgdmFyIGN1cnJGcmFtZTtcblxuICAgIGlmIChrZWVwRnJhbWUpIHtcbiAgICAgIGN1cnJGcmFtZSA9IGZyYW1lLnB1c2godHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJGcmFtZSA9IG5ldyBGcmFtZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2VtaXRMaW5lcyhcInZhciBcIiArIGZ1bmNJZCArIFwiID0gcnVudGltZS5tYWtlTWFjcm8oXCIsIFwiW1wiICsgYXJnTmFtZXMuam9pbignLCAnKSArIFwiXSwgXCIsIFwiW1wiICsga3dhcmdOYW1lcy5qb2luKCcsICcpICsgXCJdLCBcIiwgXCJmdW5jdGlvbiAoXCIgKyByZWFsTmFtZXMuam9pbignLCAnKSArIFwiKSB7XCIsICd2YXIgY2FsbGVyRnJhbWUgPSBmcmFtZTsnLCAnZnJhbWUgPSAnICsgKGtlZXBGcmFtZSA/ICdmcmFtZS5wdXNoKHRydWUpOycgOiAnbmV3IHJ1bnRpbWUuRnJhbWUoKTsnKSwgJ2t3YXJncyA9IGt3YXJncyB8fCB7fTsnLCAnaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChrd2FyZ3MsIFwiY2FsbGVyXCIpKSB7JywgJ2ZyYW1lLnNldChcImNhbGxlclwiLCBrd2FyZ3MuY2FsbGVyKTsgfScpOyAvLyBFeHBvc2UgdGhlIGFyZ3VtZW50cyB0byB0aGUgdGVtcGxhdGUuIERvbid0IG5lZWQgdG8gdXNlXG4gICAgLy8gcmFuZG9tIG5hbWVzIGJlY2F1c2UgdGhlIGZ1bmN0aW9uXG4gICAgLy8gd2lsbCBjcmVhdGUgYSBuZXcgcnVuLXRpbWUgc2NvcGUgZm9yIHVzXG5cblxuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICBfdGhpczEyLl9lbWl0TGluZShcImZyYW1lLnNldChcXFwiXCIgKyBhcmcudmFsdWUgKyBcIlxcXCIsIGxfXCIgKyBhcmcudmFsdWUgKyBcIik7XCIpO1xuXG4gICAgICBjdXJyRnJhbWUuc2V0KGFyZy52YWx1ZSwgXCJsX1wiICsgYXJnLnZhbHVlKTtcbiAgICB9KTsgLy8gRXhwb3NlIHRoZSBrZXl3b3JkIGFyZ3VtZW50c1xuXG4gICAgaWYgKGt3YXJncykge1xuICAgICAga3dhcmdzLmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKHBhaXIpIHtcbiAgICAgICAgdmFyIG5hbWUgPSBwYWlyLmtleS52YWx1ZTtcblxuICAgICAgICBfdGhpczEyLl9lbWl0KFwiZnJhbWUuc2V0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiKTtcblxuICAgICAgICBfdGhpczEyLl9lbWl0KFwiT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGt3YXJncywgXFxcIlwiICsgbmFtZSArIFwiXFxcIilcIik7XG5cbiAgICAgICAgX3RoaXMxMi5fZW1pdChcIiA/IGt3YXJnc1tcXFwiXCIgKyBuYW1lICsgXCJcXFwiXSA6IFwiKTtcblxuICAgICAgICBfdGhpczEyLl9jb21waWxlRXhwcmVzc2lvbihwYWlyLnZhbHVlLCBjdXJyRnJhbWUpO1xuXG4gICAgICAgIF90aGlzMTIuX2VtaXQoJyk7Jyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgYnVmZmVySWQgPSB0aGlzLl9wdXNoQnVmZmVyKCk7XG5cbiAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMTIuY29tcGlsZShub2RlLmJvZHksIGN1cnJGcmFtZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnZnJhbWUgPSAnICsgKGtlZXBGcmFtZSA/ICdmcmFtZS5wb3AoKTsnIDogJ2NhbGxlckZyYW1lOycpKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwicmV0dXJuIG5ldyBydW50aW1lLlNhZmVTdHJpbmcoXCIgKyBidWZmZXJJZCArIFwiKTtcIik7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgnfSk7Jyk7XG5cbiAgICB0aGlzLl9wb3BCdWZmZXIoKTtcblxuICAgIHJldHVybiBmdW5jSWQ7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVNYWNybyA9IGZ1bmN0aW9uIGNvbXBpbGVNYWNybyhub2RlLCBmcmFtZSkge1xuICAgIHZhciBmdW5jSWQgPSB0aGlzLl9jb21waWxlTWFjcm8obm9kZSk7IC8vIEV4cG9zZSB0aGUgbWFjcm8gdG8gdGhlIHRlbXBsYXRlc1xuXG5cbiAgICB2YXIgbmFtZSA9IG5vZGUubmFtZS52YWx1ZTtcbiAgICBmcmFtZS5zZXQobmFtZSwgZnVuY0lkKTtcblxuICAgIGlmIChmcmFtZS5wYXJlbnQpIHtcbiAgICAgIHRoaXMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgZnVuY0lkICsgXCIpO1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKG5vZGUubmFtZS52YWx1ZS5jaGFyQXQoMCkgIT09ICdfJykge1xuICAgICAgICB0aGlzLl9lbWl0TGluZShcImNvbnRleHQuYWRkRXhwb3J0KFxcXCJcIiArIG5hbWUgKyBcIlxcXCIpO1wiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIFwiICsgZnVuY0lkICsgXCIpO1wiKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYWxsZXIgPSBmdW5jdGlvbiBjb21waWxlQ2FsbGVyKG5vZGUsIGZyYW1lKSB7XG4gICAgLy8gYmFzaWNhbGx5IGFuIGFub255bW91cyBcIm1hY3JvIGV4cHJlc3Npb25cIlxuICAgIHRoaXMuX2VtaXQoJyhmdW5jdGlvbiAoKXsnKTtcblxuICAgIHZhciBmdW5jSWQgPSB0aGlzLl9jb21waWxlTWFjcm8obm9kZSwgZnJhbWUpO1xuXG4gICAgdGhpcy5fZW1pdChcInJldHVybiBcIiArIGZ1bmNJZCArIFwiO30pKClcIik7XG4gIH07XG5cbiAgX3Byb3RvLl9jb21waWxlR2V0VGVtcGxhdGUgPSBmdW5jdGlvbiBfY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBlYWdlckNvbXBpbGUsIGlnbm9yZU1pc3NpbmcpIHtcbiAgICB2YXIgcGFyZW50VGVtcGxhdGVJZCA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB2YXIgcGFyZW50TmFtZSA9IHRoaXMuX3RlbXBsYXRlTmFtZSgpO1xuXG4gICAgdmFyIGNiID0gdGhpcy5fbWFrZUNhbGxiYWNrKHBhcmVudFRlbXBsYXRlSWQpO1xuXG4gICAgdmFyIGVhZ2VyQ29tcGlsZUFyZyA9IGVhZ2VyQ29tcGlsZSA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgdmFyIGlnbm9yZU1pc3NpbmdBcmcgPSBpZ25vcmVNaXNzaW5nID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIHRoaXMuX2VtaXQoJ2Vudi5nZXRUZW1wbGF0ZSgnKTtcblxuICAgIHRoaXMuX2NvbXBpbGVFeHByZXNzaW9uKG5vZGUudGVtcGxhdGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiLCBcIiArIGVhZ2VyQ29tcGlsZUFyZyArIFwiLCBcIiArIHBhcmVudE5hbWUgKyBcIiwgXCIgKyBpZ25vcmVNaXNzaW5nQXJnICsgXCIsIFwiICsgY2IpO1xuXG4gICAgcmV0dXJuIHBhcmVudFRlbXBsYXRlSWQ7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVJbXBvcnQgPSBmdW5jdGlvbiBjb21waWxlSW1wb3J0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIHRhcmdldCA9IG5vZGUudGFyZ2V0LnZhbHVlO1xuXG4gICAgdmFyIGlkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCBmYWxzZSwgZmFsc2UpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoaWQgKyAnLmdldEV4cG9ydGVkKCcgKyAobm9kZS53aXRoQ29udGV4dCA/ICdjb250ZXh0LmdldFZhcmlhYmxlcygpLCBmcmFtZSwgJyA6ICcnKSArIHRoaXMuX21ha2VDYWxsYmFjayhpZCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgZnJhbWUuc2V0KHRhcmdldCwgaWQpO1xuXG4gICAgaWYgKGZyYW1lLnBhcmVudCkge1xuICAgICAgdGhpcy5fZW1pdExpbmUoXCJmcmFtZS5zZXQoXFxcIlwiICsgdGFyZ2V0ICsgXCJcXFwiLCBcIiArIGlkICsgXCIpO1wiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LnNldFZhcmlhYmxlKFxcXCJcIiArIHRhcmdldCArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5jb21waWxlRnJvbUltcG9ydCA9IGZ1bmN0aW9uIGNvbXBpbGVGcm9tSW1wb3J0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTMgPSB0aGlzO1xuXG4gICAgdmFyIGltcG9ydGVkSWQgPSB0aGlzLl9jb21waWxlR2V0VGVtcGxhdGUobm9kZSwgZnJhbWUsIGZhbHNlLCBmYWxzZSk7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZShpbXBvcnRlZElkICsgJy5nZXRFeHBvcnRlZCgnICsgKG5vZGUud2l0aENvbnRleHQgPyAnY29udGV4dC5nZXRWYXJpYWJsZXMoKSwgZnJhbWUsICcgOiAnJykgKyB0aGlzLl9tYWtlQ2FsbGJhY2soaW1wb3J0ZWRJZCkpO1xuXG4gICAgdGhpcy5fYWRkU2NvcGVMZXZlbCgpO1xuXG4gICAgbm9kZS5uYW1lcy5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lTm9kZSkge1xuICAgICAgdmFyIG5hbWU7XG4gICAgICB2YXIgYWxpYXM7XG5cbiAgICAgIHZhciBpZCA9IF90aGlzMTMuX3RtcGlkKCk7XG5cbiAgICAgIGlmIChuYW1lTm9kZSBpbnN0YW5jZW9mIG5vZGVzLlBhaXIpIHtcbiAgICAgICAgbmFtZSA9IG5hbWVOb2RlLmtleS52YWx1ZTtcbiAgICAgICAgYWxpYXMgPSBuYW1lTm9kZS52YWx1ZS52YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5hbWUgPSBuYW1lTm9kZS52YWx1ZTtcbiAgICAgICAgYWxpYXMgPSBuYW1lO1xuICAgICAgfVxuXG4gICAgICBfdGhpczEzLl9lbWl0TGluZShcImlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcIiArIGltcG9ydGVkSWQgKyBcIiwgXFxcIlwiICsgbmFtZSArIFwiXFxcIikpIHtcIik7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwidmFyIFwiICsgaWQgKyBcIiA9IFwiICsgaW1wb3J0ZWRJZCArIFwiLlwiICsgbmFtZSArIFwiO1wiKTtcblxuICAgICAgX3RoaXMxMy5fZW1pdExpbmUoJ30gZWxzZSB7Jyk7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiY2IobmV3IEVycm9yKFxcXCJjYW5ub3QgaW1wb3J0ICdcIiArIG5hbWUgKyBcIidcXFwiKSk7IHJldHVybjtcIik7XG5cbiAgICAgIF90aGlzMTMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICAgIGZyYW1lLnNldChhbGlhcywgaWQpO1xuXG4gICAgICBpZiAoZnJhbWUucGFyZW50KSB7XG4gICAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiZnJhbWUuc2V0KFxcXCJcIiArIGFsaWFzICsgXCJcXFwiLCBcIiArIGlkICsgXCIpO1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzMTMuX2VtaXRMaW5lKFwiY29udGV4dC5zZXRWYXJpYWJsZShcXFwiXCIgKyBhbGlhcyArIFwiXFxcIiwgXCIgKyBpZCArIFwiKTtcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVCbG9jayA9IGZ1bmN0aW9uIGNvbXBpbGVCbG9jayhub2RlKSB7XG4gICAgdmFyIGlkID0gdGhpcy5fdG1waWQoKTsgLy8gSWYgd2UgYXJlIGV4ZWN1dGluZyBvdXRzaWRlIGEgYmxvY2sgKGNyZWF0aW5nIGEgdG9wLWxldmVsXG4gICAgLy8gYmxvY2spLCB3ZSByZWFsbHkgZG9uJ3Qgd2FudCB0byBleGVjdXRlIGl0cyBjb2RlIGJlY2F1c2UgaXRcbiAgICAvLyB3aWxsIGV4ZWN1dGUgdHdpY2U6IG9uY2Ugd2hlbiB0aGUgY2hpbGQgdGVtcGxhdGUgcnVucyBhbmRcbiAgICAvLyBhZ2FpbiB3aGVuIHRoZSBwYXJlbnQgdGVtcGxhdGUgcnVucy4gTm90ZSB0aGF0IGJsb2Nrc1xuICAgIC8vIHdpdGhpbiBibG9ja3Mgd2lsbCAqYWx3YXlzKiBleGVjdXRlIGltbWVkaWF0ZWx5ICphbmQqXG4gICAgLy8gd2hlcmV2ZXIgZWxzZSB0aGV5IGFyZSBpbnZva2VkIChsaWtlIHVzZWQgaW4gYSBwYXJlbnRcbiAgICAvLyB0ZW1wbGF0ZSkuIFRoaXMgbWF5IGhhdmUgYmVoYXZpb3JhbCBkaWZmZXJlbmNlcyBmcm9tIGppbmphXG4gICAgLy8gYmVjYXVzZSBibG9ja3MgY2FuIGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgaXQgc2VlbXMgbGlrZSBhXG4gICAgLy8gd2FzdGUgb2YgcGVyZm9ybWFuY2UgdG8gYWx3YXlzIGV4ZWN1dGUgaHVnZSB0b3AtbGV2ZWxcbiAgICAvLyBibG9ja3MgdHdpY2VcblxuXG4gICAgaWYgKCF0aGlzLmluQmxvY2spIHtcbiAgICAgIHRoaXMuX2VtaXQoJyhwYXJlbnRUZW1wbGF0ZSA/IGZ1bmN0aW9uKGUsIGMsIGYsIHIsIGNiKSB7IGNiKFwiXCIpOyB9IDogJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdChcImNvbnRleHQuZ2V0QmxvY2soXFxcIlwiICsgbm9kZS5uYW1lLnZhbHVlICsgXCJcXFwiKVwiKTtcblxuICAgIGlmICghdGhpcy5pbkJsb2NrKSB7XG4gICAgICB0aGlzLl9lbWl0KCcpJyk7XG4gICAgfVxuXG4gICAgdGhpcy5fZW1pdExpbmUoJyhlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCAnICsgdGhpcy5fbWFrZUNhbGxiYWNrKGlkKSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSh0aGlzLmJ1ZmZlciArIFwiICs9IFwiICsgaWQgKyBcIjtcIik7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVTdXBlciA9IGZ1bmN0aW9uIGNvbXBpbGVTdXBlcihub2RlLCBmcmFtZSkge1xuICAgIHZhciBuYW1lID0gbm9kZS5ibG9ja05hbWUudmFsdWU7XG4gICAgdmFyIGlkID0gbm9kZS5zeW1ib2wudmFsdWU7XG5cbiAgICB2YXIgY2IgPSB0aGlzLl9tYWtlQ2FsbGJhY2soaWQpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjb250ZXh0LmdldFN1cGVyKGVudiwgXFxcIlwiICsgbmFtZSArIFwiXFxcIiwgYl9cIiArIG5hbWUgKyBcIiwgZnJhbWUsIHJ1bnRpbWUsIFwiICsgY2IpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoaWQgKyBcIiA9IHJ1bnRpbWUubWFya1NhZmUoXCIgKyBpZCArIFwiKTtcIik7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG5cbiAgICBmcmFtZS5zZXQoaWQsIGlkKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUV4dGVuZHMgPSBmdW5jdGlvbiBjb21waWxlRXh0ZW5kcyhub2RlLCBmcmFtZSkge1xuICAgIHZhciBrID0gdGhpcy5fdG1waWQoKTtcblxuICAgIHZhciBwYXJlbnRUZW1wbGF0ZUlkID0gdGhpcy5fY29tcGlsZUdldFRlbXBsYXRlKG5vZGUsIGZyYW1lLCB0cnVlLCBmYWxzZSk7IC8vIGV4dGVuZHMgaXMgYSBkeW5hbWljIHRhZyBhbmQgY2FuIG9jY3VyIHdpdGhpbiBhIGJsb2NrIGxpa2VcbiAgICAvLyBgaWZgLCBzbyBpZiB0aGlzIGhhcHBlbnMgd2UgbmVlZCB0byBjYXB0dXJlIHRoZSBwYXJlbnRcbiAgICAvLyB0ZW1wbGF0ZSBpbiB0aGUgdG9wLWxldmVsIHNjb3BlXG5cblxuICAgIHRoaXMuX2VtaXRMaW5lKFwicGFyZW50VGVtcGxhdGUgPSBcIiArIHBhcmVudFRlbXBsYXRlSWQpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJmb3IodmFyIFwiICsgayArIFwiIGluIHBhcmVudFRlbXBsYXRlLmJsb2Nrcykge1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKFwiY29udGV4dC5hZGRCbG9jayhcIiArIGsgKyBcIiwgcGFyZW50VGVtcGxhdGUuYmxvY2tzW1wiICsgayArIFwiXSk7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30nKTtcblxuICAgIHRoaXMuX2FkZFNjb3BlTGV2ZWwoKTtcbiAgfTtcblxuICBfcHJvdG8uY29tcGlsZUluY2x1ZGUgPSBmdW5jdGlvbiBjb21waWxlSW5jbHVkZShub2RlLCBmcmFtZSkge1xuICAgIHRoaXMuX2VtaXRMaW5lKCd2YXIgdGFza3MgPSBbXTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0YXNrcy5wdXNoKCcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Z1bmN0aW9uKGNhbGxiYWNrKSB7Jyk7XG5cbiAgICB2YXIgaWQgPSB0aGlzLl9jb21waWxlR2V0VGVtcGxhdGUobm9kZSwgZnJhbWUsIGZhbHNlLCBub2RlLmlnbm9yZU1pc3NpbmcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjYWxsYmFjayhudWxsLFwiICsgaWQgKyBcIik7fSk7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pOycpO1xuXG4gICAgdmFyIGlkMiA9IHRoaXMuX3RtcGlkKCk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndGFza3MucHVzaCgnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdmdW5jdGlvbih0ZW1wbGF0ZSwgY2FsbGJhY2speycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3RlbXBsYXRlLnJlbmRlcihjb250ZXh0LmdldFZhcmlhYmxlcygpLCBmcmFtZSwgJyArIHRoaXMuX21ha2VDYWxsYmFjayhpZDIpKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdjYWxsYmFjayhudWxsLCcgKyBpZDIgKyAnKTt9KTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9KTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd0YXNrcy5wdXNoKCcpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Z1bmN0aW9uKHJlc3VsdCwgY2FsbGJhY2speycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUodGhpcy5idWZmZXIgKyBcIiArPSByZXN1bHQ7XCIpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2NhbGxiYWNrKG51bGwpOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pOycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ2Vudi53YXRlcmZhbGwodGFza3MsIGZ1bmN0aW9uKCl7Jyk7XG5cbiAgICB0aGlzLl9hZGRTY29wZUxldmVsKCk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVUZW1wbGF0ZURhdGEgPSBmdW5jdGlvbiBjb21waWxlVGVtcGxhdGVEYXRhKG5vZGUsIGZyYW1lKSB7XG4gICAgdGhpcy5jb21waWxlTGl0ZXJhbChub2RlLCBmcmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVDYXB0dXJlID0gZnVuY3Rpb24gY29tcGlsZUNhcHR1cmUobm9kZSwgZnJhbWUpIHtcbiAgICB2YXIgX3RoaXMxNCA9IHRoaXM7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIHRlbXBvcmFyaWx5IG92ZXJyaWRlIHRoZSBjdXJyZW50IGJ1ZmZlciBpZCBhcyAnb3V0cHV0J1xuICAgIC8vIHNvIHRoZSBzZXQgYmxvY2sgd3JpdGVzIHRvIHRoZSBjYXB0dXJlIG91dHB1dCBpbnN0ZWFkIG9mIHRoZSBidWZmZXJcbiAgICB2YXIgYnVmZmVyID0gdGhpcy5idWZmZXI7XG4gICAgdGhpcy5idWZmZXIgPSAnb3V0cHV0JztcblxuICAgIHRoaXMuX2VtaXRMaW5lKCcoZnVuY3Rpb24oKSB7Jyk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgndmFyIG91dHB1dCA9IFwiXCI7Jyk7XG5cbiAgICB0aGlzLl93aXRoU2NvcGVkU3ludGF4KGZ1bmN0aW9uICgpIHtcbiAgICAgIF90aGlzMTQuY29tcGlsZShub2RlLmJvZHksIGZyYW1lKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdyZXR1cm4gb3V0cHV0OycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ30pKCknKTsgLy8gYW5kIG9mIGNvdXJzZSwgcmV2ZXJ0IGJhY2sgdG8gdGhlIG9sZCBidWZmZXIgaWRcblxuXG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGVPdXRwdXQgPSBmdW5jdGlvbiBjb21waWxlT3V0cHV0KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTUgPSB0aGlzO1xuXG4gICAgdmFyIGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgLy8gVGVtcGxhdGVEYXRhIGlzIGEgc3BlY2lhbCBjYXNlIGJlY2F1c2UgaXQgaXMgbmV2ZXJcbiAgICAgIC8vIGF1dG9lc2NhcGVkLCBzbyBzaW1wbHkgb3V0cHV0IGl0IGZvciBvcHRpbWl6YXRpb25cbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLlRlbXBsYXRlRGF0YSkge1xuICAgICAgICBpZiAoY2hpbGQudmFsdWUpIHtcbiAgICAgICAgICBfdGhpczE1Ll9lbWl0KF90aGlzMTUuYnVmZmVyICsgXCIgKz0gXCIpO1xuXG4gICAgICAgICAgX3RoaXMxNS5jb21waWxlTGl0ZXJhbChjaGlsZCwgZnJhbWUpO1xuXG4gICAgICAgICAgX3RoaXMxNS5fZW1pdExpbmUoJzsnKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMxNS5fZW1pdChfdGhpczE1LmJ1ZmZlciArIFwiICs9IHJ1bnRpbWUuc3VwcHJlc3NWYWx1ZShcIik7XG5cbiAgICAgICAgaWYgKF90aGlzMTUudGhyb3dPblVuZGVmaW5lZCkge1xuICAgICAgICAgIF90aGlzMTUuX2VtaXQoJ3J1bnRpbWUuZW5zdXJlRGVmaW5lZCgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF90aGlzMTUuY29tcGlsZShjaGlsZCwgZnJhbWUpO1xuXG4gICAgICAgIGlmIChfdGhpczE1LnRocm93T25VbmRlZmluZWQpIHtcbiAgICAgICAgICBfdGhpczE1Ll9lbWl0KFwiLFwiICsgbm9kZS5saW5lbm8gKyBcIixcIiArIG5vZGUuY29sbm8gKyBcIilcIik7XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczE1Ll9lbWl0KCcsIGVudi5vcHRzLmF1dG9lc2NhcGUpO1xcbicpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5jb21waWxlUm9vdCA9IGZ1bmN0aW9uIGNvbXBpbGVSb290KG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF90aGlzMTYgPSB0aGlzO1xuXG4gICAgaWYgKGZyYW1lKSB7XG4gICAgICB0aGlzLmZhaWwoJ2NvbXBpbGVSb290OiByb290IG5vZGUgY2FuXFwndCBoYXZlIGZyYW1lJyk7XG4gICAgfVxuXG4gICAgZnJhbWUgPSBuZXcgRnJhbWUoKTtcblxuICAgIHRoaXMuX2VtaXRGdW5jQmVnaW4obm9kZSwgJ3Jvb3QnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd2YXIgcGFyZW50VGVtcGxhdGUgPSBudWxsOycpO1xuXG4gICAgdGhpcy5fY29tcGlsZUNoaWxkcmVuKG5vZGUsIGZyYW1lKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCdpZihwYXJlbnRUZW1wbGF0ZSkgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3BhcmVudFRlbXBsYXRlLnJvb3RSZW5kZXJGdW5jKGVudiwgY29udGV4dCwgZnJhbWUsIHJ1bnRpbWUsIGNiKTsnKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9IGVsc2UgeycpO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoXCJjYihudWxsLCBcIiArIHRoaXMuYnVmZmVyICsgXCIpO1wiKTtcblxuICAgIHRoaXMuX2VtaXRMaW5lKCd9Jyk7XG5cbiAgICB0aGlzLl9lbWl0RnVuY0VuZCh0cnVlKTtcblxuICAgIHRoaXMuaW5CbG9jayA9IHRydWU7XG4gICAgdmFyIGJsb2NrTmFtZXMgPSBbXTtcbiAgICB2YXIgYmxvY2tzID0gbm9kZS5maW5kQWxsKG5vZGVzLkJsb2NrKTtcbiAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2ssIGkpIHtcbiAgICAgIHZhciBuYW1lID0gYmxvY2submFtZS52YWx1ZTtcblxuICAgICAgaWYgKGJsb2NrTmFtZXMuaW5kZXhPZihuYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmxvY2sgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLlwiKTtcbiAgICAgIH1cblxuICAgICAgYmxvY2tOYW1lcy5wdXNoKG5hbWUpO1xuXG4gICAgICBfdGhpczE2Ll9lbWl0RnVuY0JlZ2luKGJsb2NrLCBcImJfXCIgKyBuYW1lKTtcblxuICAgICAgdmFyIHRtcEZyYW1lID0gbmV3IEZyYW1lKCk7XG5cbiAgICAgIF90aGlzMTYuX2VtaXRMaW5lKCd2YXIgZnJhbWUgPSBmcmFtZS5wdXNoKHRydWUpOycpO1xuXG4gICAgICBfdGhpczE2LmNvbXBpbGUoYmxvY2suYm9keSwgdG1wRnJhbWUpO1xuXG4gICAgICBfdGhpczE2Ll9lbWl0RnVuY0VuZCgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZW1pdExpbmUoJ3JldHVybiB7Jyk7XG5cbiAgICBibG9ja3MuZm9yRWFjaChmdW5jdGlvbiAoYmxvY2ssIGkpIHtcbiAgICAgIHZhciBibG9ja05hbWUgPSBcImJfXCIgKyBibG9jay5uYW1lLnZhbHVlO1xuXG4gICAgICBfdGhpczE2Ll9lbWl0TGluZShibG9ja05hbWUgKyBcIjogXCIgKyBibG9ja05hbWUgKyBcIixcIik7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9lbWl0TGluZSgncm9vdDogcm9vdFxcbn07Jyk7XG4gIH07XG5cbiAgX3Byb3RvLmNvbXBpbGUgPSBmdW5jdGlvbiBjb21waWxlKG5vZGUsIGZyYW1lKSB7XG4gICAgdmFyIF9jb21waWxlID0gdGhpc1snY29tcGlsZScgKyBub2RlLnR5cGVuYW1lXTtcblxuICAgIGlmIChfY29tcGlsZSkge1xuICAgICAgX2NvbXBpbGUuY2FsbCh0aGlzLCBub2RlLCBmcmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbChcImNvbXBpbGU6IENhbm5vdCBjb21waWxlIG5vZGU6IFwiICsgbm9kZS50eXBlbmFtZSwgbm9kZS5saW5lbm8sIG5vZGUuY29sbm8pO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8uZ2V0Q29kZSA9IGZ1bmN0aW9uIGdldENvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29kZWJ1Zi5qb2luKCcnKTtcbiAgfTtcblxuICByZXR1cm4gQ29tcGlsZXI7XG59KE9iaik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBjb21waWxlOiBmdW5jdGlvbiBjb21waWxlKHNyYywgYXN5bmNGaWx0ZXJzLCBleHRlbnNpb25zLCBuYW1lLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0cyA9IHt9O1xuICAgIH1cblxuICAgIHZhciBjID0gbmV3IENvbXBpbGVyKG5hbWUsIG9wdHMudGhyb3dPblVuZGVmaW5lZCk7IC8vIFJ1biB0aGUgZXh0ZW5zaW9uIHByZXByb2Nlc3NvcnMgYWdhaW5zdCB0aGUgc291cmNlLlxuXG4gICAgdmFyIHByZXByb2Nlc3NvcnMgPSAoZXh0ZW5zaW9ucyB8fCBbXSkubWFwKGZ1bmN0aW9uIChleHQpIHtcbiAgICAgIHJldHVybiBleHQucHJlcHJvY2VzcztcbiAgICB9KS5maWx0ZXIoZnVuY3Rpb24gKGYpIHtcbiAgICAgIHJldHVybiAhIWY7XG4gICAgfSk7XG4gICAgdmFyIHByb2Nlc3NlZFNyYyA9IHByZXByb2Nlc3NvcnMucmVkdWNlKGZ1bmN0aW9uIChzLCBwcm9jZXNzb3IpIHtcbiAgICAgIHJldHVybiBwcm9jZXNzb3Iocyk7XG4gICAgfSwgc3JjKTtcbiAgICBjLmNvbXBpbGUodHJhbnNmb3JtZXIudHJhbnNmb3JtKHBhcnNlci5wYXJzZShwcm9jZXNzZWRTcmMsIGV4dGVuc2lvbnMsIG9wdHMpLCBhc3luY0ZpbHRlcnMsIG5hbWUpKTtcbiAgICByZXR1cm4gYy5nZXRDb2RlKCk7XG4gIH0sXG4gIENvbXBpbGVyOiBDb21waWxlclxufTtcblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgcGF0aCA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gICAgRW1pdHRlck9iaiA9IF9yZXF1aXJlLkVtaXR0ZXJPYmo7XG5cbm1vZHVsZS5leHBvcnRzID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfRW1pdHRlck9iaikge1xuICBfaW5oZXJpdHNMb29zZShMb2FkZXIsIF9FbWl0dGVyT2JqKTtcblxuICBmdW5jdGlvbiBMb2FkZXIoKSB7XG4gICAgcmV0dXJuIF9FbWl0dGVyT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBMb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShmcm9tLCB0bykge1xuICAgIHJldHVybiBwYXRoLnJlc29sdmUocGF0aC5kaXJuYW1lKGZyb20pLCB0byk7XG4gIH07XG5cbiAgX3Byb3RvLmlzUmVsYXRpdmUgPSBmdW5jdGlvbiBpc1JlbGF0aXZlKGZpbGVuYW1lKSB7XG4gICAgcmV0dXJuIGZpbGVuYW1lLmluZGV4T2YoJy4vJykgPT09IDAgfHwgZmlsZW5hbWUuaW5kZXhPZignLi4vJykgPT09IDA7XG4gIH07XG5cbiAgcmV0dXJuIExvYWRlcjtcbn0oRW1pdHRlck9iaik7XG5cbi8qKiovIH0pLFxuLyogNyAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfaW5oZXJpdHNMb29zZShzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTsgc3ViQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViQ2xhc3M7IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxudmFyIGFzYXAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKTtcblxudmFyIF93YXRlcmZhbGwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBjb21waWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBmaWx0ZXJzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oMTApLFxuICAgIEZpbGVTeXN0ZW1Mb2FkZXIgPSBfcmVxdWlyZS5GaWxlU3lzdGVtTG9hZGVyLFxuICAgIFdlYkxvYWRlciA9IF9yZXF1aXJlLldlYkxvYWRlcixcbiAgICBQcmVjb21waWxlZExvYWRlciA9IF9yZXF1aXJlLlByZWNvbXBpbGVkTG9hZGVyO1xuXG52YXIgdGVzdHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblxudmFyIGdsb2JhbHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblxudmFyIF9yZXF1aXJlMiA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gICAgT2JqID0gX3JlcXVpcmUyLk9iaixcbiAgICBFbWl0dGVyT2JqID0gX3JlcXVpcmUyLkVtaXR0ZXJPYmo7XG5cbnZhciBnbG9iYWxSdW50aW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIGhhbmRsZUVycm9yID0gZ2xvYmFsUnVudGltZS5oYW5kbGVFcnJvcixcbiAgICBGcmFtZSA9IGdsb2JhbFJ1bnRpbWUuRnJhbWU7XG5cbnZhciBleHByZXNzQXBwID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMik7IC8vIElmIHRoZSB1c2VyIGlzIHVzaW5nIHRoZSBhc3luYyBBUEksICphbHdheXMqIGNhbGwgaXRcbi8vIGFzeW5jaHJvbm91c2x5IGV2ZW4gaWYgdGhlIHRlbXBsYXRlIHdhcyBzeW5jaHJvbm91cy5cblxuXG5mdW5jdGlvbiBjYWxsYmFja0FzYXAoY2IsIGVyciwgcmVzKSB7XG4gIGFzYXAoZnVuY3Rpb24gKCkge1xuICAgIGNiKGVyciwgcmVzKTtcbiAgfSk7XG59XG4vKipcbiAqIEEgbm8tb3AgdGVtcGxhdGUsIGZvciB1c2Ugd2l0aCB7JSBpbmNsdWRlIGlnbm9yZSBtaXNzaW5nICV9XG4gKi9cblxuXG52YXIgbm9vcFRtcGxTcmMgPSB7XG4gIHR5cGU6ICdjb2RlJyxcbiAgb2JqOiB7XG4gICAgcm9vdDogZnVuY3Rpb24gcm9vdChlbnYsIGNvbnRleHQsIGZyYW1lLCBydW50aW1lLCBjYikge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2IobnVsbCwgJycpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYihoYW5kbGVFcnJvcihlLCBudWxsLCBudWxsKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG52YXIgRW52aXJvbm1lbnQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9FbWl0dGVyT2JqKSB7XG4gIF9pbmhlcml0c0xvb3NlKEVudmlyb25tZW50LCBfRW1pdHRlck9iaik7XG5cbiAgZnVuY3Rpb24gRW52aXJvbm1lbnQoKSB7XG4gICAgcmV0dXJuIF9FbWl0dGVyT2JqLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBFbnZpcm9ubWVudC5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KGxvYWRlcnMsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgLy8gVGhlIGRldiBmbGFnIGRldGVybWluZXMgdGhlIHRyYWNlIHRoYXQnbGwgYmUgc2hvd24gb24gZXJyb3JzLlxuICAgIC8vIElmIHNldCB0byB0cnVlLCByZXR1cm5zIHRoZSBmdWxsIHRyYWNlIGZyb20gdGhlIGVycm9yIHBvaW50LFxuICAgIC8vIG90aGVyd2lzZSB3aWxsIHJldHVybiB0cmFjZSBzdGFydGluZyBmcm9tIFRlbXBsYXRlLnJlbmRlclxuICAgIC8vICh0aGUgZnVsbCB0cmFjZSBmcm9tIHdpdGhpbiBudW5qdWNrcyBtYXkgY29uZnVzZSBkZXZlbG9wZXJzIHVzaW5nXG4gICAgLy8gIHRoZSBsaWJyYXJ5KVxuICAgIC8vIGRlZmF1bHRzIHRvIGZhbHNlXG4gICAgb3B0cyA9IHRoaXMub3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5vcHRzLmRldiA9ICEhb3B0cy5kZXY7IC8vIFRoZSBhdXRvZXNjYXBlIGZsYWcgc2V0cyBnbG9iYWwgYXV0b2VzY2FwaW5nLiBJZiB0cnVlLFxuICAgIC8vIGV2ZXJ5IHN0cmluZyB2YXJpYWJsZSB3aWxsIGJlIGVzY2FwZWQgYnkgZGVmYXVsdC5cbiAgICAvLyBJZiBmYWxzZSwgc3RyaW5ncyBjYW4gYmUgbWFudWFsbHkgZXNjYXBlZCB1c2luZyB0aGUgYGVzY2FwZWAgZmlsdGVyLlxuICAgIC8vIGRlZmF1bHRzIHRvIHRydWVcblxuICAgIHRoaXMub3B0cy5hdXRvZXNjYXBlID0gb3B0cy5hdXRvZXNjYXBlICE9IG51bGwgPyBvcHRzLmF1dG9lc2NhcGUgOiB0cnVlOyAvLyBJZiB0cnVlLCB0aGlzIHdpbGwgbWFrZSB0aGUgc3lzdGVtIHRocm93IGVycm9ycyBpZiB0cnlpbmdcbiAgICAvLyB0byBvdXRwdXQgYSBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZVxuXG4gICAgdGhpcy5vcHRzLnRocm93T25VbmRlZmluZWQgPSAhIW9wdHMudGhyb3dPblVuZGVmaW5lZDtcbiAgICB0aGlzLm9wdHMudHJpbUJsb2NrcyA9ICEhb3B0cy50cmltQmxvY2tzO1xuICAgIHRoaXMub3B0cy5sc3RyaXBCbG9ja3MgPSAhIW9wdHMubHN0cmlwQmxvY2tzO1xuICAgIHRoaXMubG9hZGVycyA9IFtdO1xuXG4gICAgaWYgKCFsb2FkZXJzKSB7XG4gICAgICAvLyBUaGUgZmlsZXN5c3RlbSBsb2FkZXIgaXMgb25seSBhdmFpbGFibGUgc2VydmVyLXNpZGVcbiAgICAgIGlmIChGaWxlU3lzdGVtTG9hZGVyKSB7XG4gICAgICAgIHRoaXMubG9hZGVycyA9IFtuZXcgRmlsZVN5c3RlbUxvYWRlcigndmlld3MnKV07XG4gICAgICB9IGVsc2UgaWYgKFdlYkxvYWRlcikge1xuICAgICAgICB0aGlzLmxvYWRlcnMgPSBbbmV3IFdlYkxvYWRlcignL3ZpZXdzJyldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvYWRlcnMgPSBsaWIuaXNBcnJheShsb2FkZXJzKSA/IGxvYWRlcnMgOiBbbG9hZGVyc107XG4gICAgfSAvLyBJdCdzIGVhc3kgdG8gdXNlIHByZWNvbXBpbGVkIHRlbXBsYXRlczoganVzdCBpbmNsdWRlIHRoZW1cbiAgICAvLyBiZWZvcmUgeW91IGNvbmZpZ3VyZSBudW5qdWNrcyBhbmQgdGhpcyB3aWxsIGF1dG9tYXRpY2FsbHlcbiAgICAvLyBwaWNrIGl0IHVwIGFuZCB1c2UgaXRcblxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5udW5qdWNrc1ByZWNvbXBpbGVkKSB7XG4gICAgICB0aGlzLmxvYWRlcnMudW5zaGlmdChuZXcgUHJlY29tcGlsZWRMb2FkZXIod2luZG93Lm51bmp1Y2tzUHJlY29tcGlsZWQpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0TG9hZGVycygpO1xuXG4gICAgdGhpcy5nbG9iYWxzID0gZ2xvYmFscygpO1xuICAgIHRoaXMuZmlsdGVycyA9IHt9O1xuICAgIHRoaXMudGVzdHMgPSB7fTtcbiAgICB0aGlzLmFzeW5jRmlsdGVycyA9IFtdO1xuICAgIHRoaXMuZXh0ZW5zaW9ucyA9IHt9O1xuICAgIHRoaXMuZXh0ZW5zaW9uc0xpc3QgPSBbXTtcblxuICAgIGxpYi5fZW50cmllcyhmaWx0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgbmFtZSA9IF9yZWZbMF0sXG4gICAgICAgICAgZmlsdGVyID0gX3JlZlsxXTtcbiAgICAgIHJldHVybiBfdGhpcy5hZGRGaWx0ZXIobmFtZSwgZmlsdGVyKTtcbiAgICB9KTtcblxuICAgIGxpYi5fZW50cmllcyh0ZXN0cykuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciBuYW1lID0gX3JlZjJbMF0sXG4gICAgICAgICAgdGVzdCA9IF9yZWYyWzFdO1xuICAgICAgcmV0dXJuIF90aGlzLmFkZFRlc3QobmFtZSwgdGVzdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLl9pbml0TG9hZGVycyA9IGZ1bmN0aW9uIF9pbml0TG9hZGVycygpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHRoaXMubG9hZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChsb2FkZXIpIHtcbiAgICAgIC8vIENhY2hpbmcgYW5kIGNhY2hlIGJ1c3RpbmdcbiAgICAgIGxvYWRlci5jYWNoZSA9IHt9O1xuXG4gICAgICBpZiAodHlwZW9mIGxvYWRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsb2FkZXIub24oJ3VwZGF0ZScsIGZ1bmN0aW9uIChuYW1lLCBmdWxsbmFtZSkge1xuICAgICAgICAgIGxvYWRlci5jYWNoZVtuYW1lXSA9IG51bGw7XG5cbiAgICAgICAgICBfdGhpczIuZW1pdCgndXBkYXRlJywgbmFtZSwgZnVsbG5hbWUsIGxvYWRlcik7XG4gICAgICAgIH0pO1xuICAgICAgICBsb2FkZXIub24oJ2xvYWQnLCBmdW5jdGlvbiAobmFtZSwgc291cmNlKSB7XG4gICAgICAgICAgX3RoaXMyLmVtaXQoJ2xvYWQnLCBuYW1lLCBzb3VyY2UsIGxvYWRlcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIF9wcm90by5pbnZhbGlkYXRlQ2FjaGUgPSBmdW5jdGlvbiBpbnZhbGlkYXRlQ2FjaGUoKSB7XG4gICAgdGhpcy5sb2FkZXJzLmZvckVhY2goZnVuY3Rpb24gKGxvYWRlcikge1xuICAgICAgbG9hZGVyLmNhY2hlID0ge307XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvLmFkZEV4dGVuc2lvbiA9IGZ1bmN0aW9uIGFkZEV4dGVuc2lvbihuYW1lLCBleHRlbnNpb24pIHtcbiAgICBleHRlbnNpb24uX19uYW1lID0gbmFtZTtcbiAgICB0aGlzLmV4dGVuc2lvbnNbbmFtZV0gPSBleHRlbnNpb247XG4gICAgdGhpcy5leHRlbnNpb25zTGlzdC5wdXNoKGV4dGVuc2lvbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZUV4dGVuc2lvbiA9IGZ1bmN0aW9uIHJlbW92ZUV4dGVuc2lvbihuYW1lKSB7XG4gICAgdmFyIGV4dGVuc2lvbiA9IHRoaXMuZ2V0RXh0ZW5zaW9uKG5hbWUpO1xuXG4gICAgaWYgKCFleHRlbnNpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVuc2lvbnNMaXN0ID0gbGliLndpdGhvdXQodGhpcy5leHRlbnNpb25zTGlzdCwgZXh0ZW5zaW9uKTtcbiAgICBkZWxldGUgdGhpcy5leHRlbnNpb25zW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5nZXRFeHRlbnNpb24gPSBmdW5jdGlvbiBnZXRFeHRlbnNpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLmV4dGVuc2lvbnNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLmhhc0V4dGVuc2lvbiA9IGZ1bmN0aW9uIGhhc0V4dGVuc2lvbihuYW1lKSB7XG4gICAgcmV0dXJuICEhdGhpcy5leHRlbnNpb25zW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5hZGRHbG9iYWwgPSBmdW5jdGlvbiBhZGRHbG9iYWwobmFtZSwgdmFsdWUpIHtcbiAgICB0aGlzLmdsb2JhbHNbbmFtZV0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZ2V0R2xvYmFsID0gZnVuY3Rpb24gZ2V0R2xvYmFsKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZ2xvYmFsc1tuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ2xvYmFsIG5vdCBmb3VuZDogJyArIG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdsb2JhbHNbbmFtZV07XG4gIH07XG5cbiAgX3Byb3RvLmFkZEZpbHRlciA9IGZ1bmN0aW9uIGFkZEZpbHRlcihuYW1lLCBmdW5jLCBhc3luYykge1xuICAgIHZhciB3cmFwcGVkID0gZnVuYztcblxuICAgIGlmIChhc3luYykge1xuICAgICAgdGhpcy5hc3luY0ZpbHRlcnMucHVzaChuYW1lKTtcbiAgICB9XG5cbiAgICB0aGlzLmZpbHRlcnNbbmFtZV0gPSB3cmFwcGVkO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5nZXRGaWx0ZXIgPSBmdW5jdGlvbiBnZXRGaWx0ZXIobmFtZSkge1xuICAgIGlmICghdGhpcy5maWx0ZXJzW25hbWVdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZpbHRlciBub3QgZm91bmQ6ICcgKyBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5maWx0ZXJzW25hbWVdO1xuICB9O1xuXG4gIF9wcm90by5hZGRUZXN0ID0gZnVuY3Rpb24gYWRkVGVzdChuYW1lLCBmdW5jKSB7XG4gICAgdGhpcy50ZXN0c1tuYW1lXSA9IGZ1bmM7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmdldFRlc3QgPSBmdW5jdGlvbiBnZXRUZXN0KG5hbWUpIHtcbiAgICBpZiAoIXRoaXMudGVzdHNbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndGVzdCBub3QgZm91bmQ6ICcgKyBuYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy50ZXN0c1tuYW1lXTtcbiAgfTtcblxuICBfcHJvdG8ucmVzb2x2ZVRlbXBsYXRlID0gZnVuY3Rpb24gcmVzb2x2ZVRlbXBsYXRlKGxvYWRlciwgcGFyZW50TmFtZSwgZmlsZW5hbWUpIHtcbiAgICB2YXIgaXNSZWxhdGl2ZSA9IGxvYWRlci5pc1JlbGF0aXZlICYmIHBhcmVudE5hbWUgPyBsb2FkZXIuaXNSZWxhdGl2ZShmaWxlbmFtZSkgOiBmYWxzZTtcbiAgICByZXR1cm4gaXNSZWxhdGl2ZSAmJiBsb2FkZXIucmVzb2x2ZSA/IGxvYWRlci5yZXNvbHZlKHBhcmVudE5hbWUsIGZpbGVuYW1lKSA6IGZpbGVuYW1lO1xuICB9O1xuXG4gIF9wcm90by5nZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uIGdldFRlbXBsYXRlKG5hbWUsIGVhZ2VyQ29tcGlsZSwgcGFyZW50TmFtZSwgaWdub3JlTWlzc2luZywgY2IpIHtcbiAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgdG1wbCA9IG51bGw7XG5cbiAgICBpZiAobmFtZSAmJiBuYW1lLnJhdykge1xuICAgICAgLy8gdGhpcyBmaXhlcyBhdXRvZXNjYXBlIGZvciB0ZW1wbGF0ZXMgcmVmZXJlbmNlZCBpbiBzeW1ib2xzXG4gICAgICBuYW1lID0gbmFtZS5yYXc7XG4gICAgfVxuXG4gICAgaWYgKGxpYi5pc0Z1bmN0aW9uKHBhcmVudE5hbWUpKSB7XG4gICAgICBjYiA9IHBhcmVudE5hbWU7XG4gICAgICBwYXJlbnROYW1lID0gbnVsbDtcbiAgICAgIGVhZ2VyQ29tcGlsZSA9IGVhZ2VyQ29tcGlsZSB8fCBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobGliLmlzRnVuY3Rpb24oZWFnZXJDb21waWxlKSkge1xuICAgICAgY2IgPSBlYWdlckNvbXBpbGU7XG4gICAgICBlYWdlckNvbXBpbGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSBpbnN0YW5jZW9mIFRlbXBsYXRlKSB7XG4gICAgICB0bXBsID0gbmFtZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0ZW1wbGF0ZSBuYW1lcyBtdXN0IGJlIGEgc3RyaW5nOiAnICsgbmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sb2FkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcnNbaV07XG4gICAgICAgIHRtcGwgPSBsb2FkZXIuY2FjaGVbdGhpcy5yZXNvbHZlVGVtcGxhdGUobG9hZGVyLCBwYXJlbnROYW1lLCBuYW1lKV07XG5cbiAgICAgICAgaWYgKHRtcGwpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0bXBsKSB7XG4gICAgICBpZiAoZWFnZXJDb21waWxlKSB7XG4gICAgICAgIHRtcGwuY29tcGlsZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgY2IobnVsbCwgdG1wbCk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdG1wbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3luY1Jlc3VsdDtcblxuICAgIHZhciBjcmVhdGVUZW1wbGF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZVRlbXBsYXRlKGVyciwgaW5mbykge1xuICAgICAgaWYgKCFpbmZvICYmICFlcnIgJiYgIWlnbm9yZU1pc3NpbmcpIHtcbiAgICAgICAgZXJyID0gbmV3IEVycm9yKCd0ZW1wbGF0ZSBub3QgZm91bmQ6ICcgKyBuYW1lKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYihlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIG5ld1RtcGw7XG5cbiAgICAgIGlmICghaW5mbykge1xuICAgICAgICBuZXdUbXBsID0gbmV3IFRlbXBsYXRlKG5vb3BUbXBsU3JjLCBfdGhpczMsICcnLCBlYWdlckNvbXBpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3VG1wbCA9IG5ldyBUZW1wbGF0ZShpbmZvLnNyYywgX3RoaXMzLCBpbmZvLnBhdGgsIGVhZ2VyQ29tcGlsZSk7XG5cbiAgICAgICAgaWYgKCFpbmZvLm5vQ2FjaGUpIHtcbiAgICAgICAgICBpbmZvLmxvYWRlci5jYWNoZVtuYW1lXSA9IG5ld1RtcGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIGNiKG51bGwsIG5ld1RtcGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3luY1Jlc3VsdCA9IG5ld1RtcGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxpYi5hc3luY0l0ZXIodGhpcy5sb2FkZXJzLCBmdW5jdGlvbiAobG9hZGVyLCBpLCBuZXh0LCBkb25lKSB7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUoZXJyLCBzcmMpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGRvbmUoZXJyKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcmMpIHtcbiAgICAgICAgICBzcmMubG9hZGVyID0gbG9hZGVyO1xuICAgICAgICAgIGRvbmUobnVsbCwgc3JjKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0KCk7XG4gICAgICAgIH1cbiAgICAgIH0gLy8gUmVzb2x2ZSBuYW1lIHJlbGF0aXZlIHRvIHBhcmVudE5hbWVcblxuXG4gICAgICBuYW1lID0gdGhhdC5yZXNvbHZlVGVtcGxhdGUobG9hZGVyLCBwYXJlbnROYW1lLCBuYW1lKTtcblxuICAgICAgaWYgKGxvYWRlci5hc3luYykge1xuICAgICAgICBsb2FkZXIuZ2V0U291cmNlKG5hbWUsIGhhbmRsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYW5kbGUobnVsbCwgbG9hZGVyLmdldFNvdXJjZShuYW1lKSk7XG4gICAgICB9XG4gICAgfSwgY3JlYXRlVGVtcGxhdGUpO1xuICAgIHJldHVybiBzeW5jUmVzdWx0O1xuICB9O1xuXG4gIF9wcm90by5leHByZXNzID0gZnVuY3Rpb24gZXhwcmVzcyhhcHApIHtcbiAgICByZXR1cm4gZXhwcmVzc0FwcCh0aGlzLCBhcHApO1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIobmFtZSwgY3R4LCBjYikge1xuICAgIGlmIChsaWIuaXNGdW5jdGlvbihjdHgpKSB7XG4gICAgICBjYiA9IGN0eDtcbiAgICAgIGN0eCA9IG51bGw7XG4gICAgfSAvLyBXZSBzdXBwb3J0IGEgc3luY2hyb25vdXMgQVBJIHRvIG1ha2UgaXQgZWFzaWVyIHRvIG1pZ3JhdGVcbiAgICAvLyBleGlzdGluZyBjb2RlIHRvIGFzeW5jLiBUaGlzIHdvcmtzIGJlY2F1c2UgaWYgeW91IGRvbid0IGRvXG4gICAgLy8gYW55dGhpbmcgYXN5bmMgd29yaywgdGhlIHdob2xlIHRoaW5nIGlzIGFjdHVhbGx5IHJ1blxuICAgIC8vIHN5bmNocm9ub3VzbHkuXG5cblxuICAgIHZhciBzeW5jUmVzdWx0ID0gbnVsbDtcbiAgICB0aGlzLmdldFRlbXBsYXRlKG5hbWUsIGZ1bmN0aW9uIChlcnIsIHRtcGwpIHtcbiAgICAgIGlmIChlcnIgJiYgY2IpIHtcbiAgICAgICAgY2FsbGJhY2tBc2FwKGNiLCBlcnIpO1xuICAgICAgfSBlbHNlIGlmIChlcnIpIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3luY1Jlc3VsdCA9IHRtcGwucmVuZGVyKGN0eCwgY2IpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzeW5jUmVzdWx0O1xuICB9O1xuXG4gIF9wcm90by5yZW5kZXJTdHJpbmcgPSBmdW5jdGlvbiByZW5kZXJTdHJpbmcoc3JjLCBjdHgsIG9wdHMsIGNiKSB7XG4gICAgaWYgKGxpYi5pc0Z1bmN0aW9uKG9wdHMpKSB7XG4gICAgICBjYiA9IG9wdHM7XG4gICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdmFyIHRtcGwgPSBuZXcgVGVtcGxhdGUoc3JjLCB0aGlzLCBvcHRzLnBhdGgpO1xuICAgIHJldHVybiB0bXBsLnJlbmRlcihjdHgsIGNiKTtcbiAgfTtcblxuICBfcHJvdG8ud2F0ZXJmYWxsID0gZnVuY3Rpb24gd2F0ZXJmYWxsKHRhc2tzLCBjYWxsYmFjaywgZm9yY2VBc3luYykge1xuICAgIHJldHVybiBfd2F0ZXJmYWxsKHRhc2tzLCBjYWxsYmFjaywgZm9yY2VBc3luYyk7XG4gIH07XG5cbiAgcmV0dXJuIEVudmlyb25tZW50O1xufShFbWl0dGVyT2JqKTtcblxudmFyIENvbnRleHQgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoQ29udGV4dCwgX09iaik7XG5cbiAgZnVuY3Rpb24gQ29udGV4dCgpIHtcbiAgICByZXR1cm4gX09iai5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IENvbnRleHQucHJvdG90eXBlO1xuXG4gIF9wcm90bzIuaW5pdCA9IGZ1bmN0aW9uIGluaXQoY3R4LCBibG9ja3MsIGVudikge1xuICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgLy8gSGFzIHRvIGJlIHRpZWQgdG8gYW4gZW52aXJvbm1lbnQgc28gd2UgY2FuIHRhcCBpbnRvIGl0cyBnbG9iYWxzLlxuICAgIHRoaXMuZW52ID0gZW52IHx8IG5ldyBFbnZpcm9ubWVudCgpOyAvLyBNYWtlIGEgZHVwbGljYXRlIG9mIGN0eFxuXG4gICAgdGhpcy5jdHggPSBsaWIuZXh0ZW5kKHt9LCBjdHgpO1xuICAgIHRoaXMuYmxvY2tzID0ge307XG4gICAgdGhpcy5leHBvcnRlZCA9IFtdO1xuICAgIGxpYi5rZXlzKGJsb2NrcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgX3RoaXM0LmFkZEJsb2NrKG5hbWUsIGJsb2Nrc1tuYW1lXSk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMi5sb29rdXAgPSBmdW5jdGlvbiBsb29rdXAobmFtZSkge1xuICAgIC8vIFRoaXMgaXMgb25lIG9mIHRoZSBtb3N0IGNhbGxlZCBmdW5jdGlvbnMsIHNvIG9wdGltaXplIGZvclxuICAgIC8vIHRoZSB0eXBpY2FsIGNhc2Ugd2hlcmUgdGhlIG5hbWUgaXNuJ3QgaW4gdGhlIGdsb2JhbHNcbiAgICBpZiAobmFtZSBpbiB0aGlzLmVudi5nbG9iYWxzICYmICEobmFtZSBpbiB0aGlzLmN0eCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmVudi5nbG9iYWxzW25hbWVdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jdHhbbmFtZV07XG4gICAgfVxuICB9O1xuXG4gIF9wcm90bzIuc2V0VmFyaWFibGUgPSBmdW5jdGlvbiBzZXRWYXJpYWJsZShuYW1lLCB2YWwpIHtcbiAgICB0aGlzLmN0eFtuYW1lXSA9IHZhbDtcbiAgfTtcblxuICBfcHJvdG8yLmdldFZhcmlhYmxlcyA9IGZ1bmN0aW9uIGdldFZhcmlhYmxlcygpIHtcbiAgICByZXR1cm4gdGhpcy5jdHg7XG4gIH07XG5cbiAgX3Byb3RvMi5hZGRCbG9jayA9IGZ1bmN0aW9uIGFkZEJsb2NrKG5hbWUsIGJsb2NrKSB7XG4gICAgdGhpcy5ibG9ja3NbbmFtZV0gPSB0aGlzLmJsb2Nrc1tuYW1lXSB8fCBbXTtcbiAgICB0aGlzLmJsb2Nrc1tuYW1lXS5wdXNoKGJsb2NrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8yLmdldEJsb2NrID0gZnVuY3Rpb24gZ2V0QmxvY2sobmFtZSkge1xuICAgIGlmICghdGhpcy5ibG9ja3NbbmFtZV0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigndW5rbm93biBibG9jayBcIicgKyBuYW1lICsgJ1wiJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYmxvY2tzW25hbWVdWzBdO1xuICB9O1xuXG4gIF9wcm90bzIuZ2V0U3VwZXIgPSBmdW5jdGlvbiBnZXRTdXBlcihlbnYsIG5hbWUsIGJsb2NrLCBmcmFtZSwgcnVudGltZSwgY2IpIHtcbiAgICB2YXIgaWR4ID0gbGliLmluZGV4T2YodGhpcy5ibG9ja3NbbmFtZV0gfHwgW10sIGJsb2NrKTtcbiAgICB2YXIgYmxrID0gdGhpcy5ibG9ja3NbbmFtZV1baWR4ICsgMV07XG4gICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuXG4gICAgaWYgKGlkeCA9PT0gLTEgfHwgIWJsaykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdubyBzdXBlciBibG9jayBhdmFpbGFibGUgZm9yIFwiJyArIG5hbWUgKyAnXCInKTtcbiAgICB9XG5cbiAgICBibGsoZW52LCBjb250ZXh0LCBmcmFtZSwgcnVudGltZSwgY2IpO1xuICB9O1xuXG4gIF9wcm90bzIuYWRkRXhwb3J0ID0gZnVuY3Rpb24gYWRkRXhwb3J0KG5hbWUpIHtcbiAgICB0aGlzLmV4cG9ydGVkLnB1c2gobmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvMi5nZXRFeHBvcnRlZCA9IGZ1bmN0aW9uIGdldEV4cG9ydGVkKCkge1xuICAgIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gICAgdmFyIGV4cG9ydGVkID0ge307XG4gICAgdGhpcy5leHBvcnRlZC5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBleHBvcnRlZFtuYW1lXSA9IF90aGlzNS5jdHhbbmFtZV07XG4gICAgfSk7XG4gICAgcmV0dXJuIGV4cG9ydGVkO1xuICB9O1xuXG4gIHJldHVybiBDb250ZXh0O1xufShPYmopO1xuXG52YXIgVGVtcGxhdGUgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmoyKSB7XG4gIF9pbmhlcml0c0xvb3NlKFRlbXBsYXRlLCBfT2JqMik7XG5cbiAgZnVuY3Rpb24gVGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIF9PYmoyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8zID0gVGVtcGxhdGUucHJvdG90eXBlO1xuXG4gIF9wcm90bzMuaW5pdCA9IGZ1bmN0aW9uIGluaXQoc3JjLCBlbnYsIHBhdGgsIGVhZ2VyQ29tcGlsZSkge1xuICAgIHRoaXMuZW52ID0gZW52IHx8IG5ldyBFbnZpcm9ubWVudCgpO1xuXG4gICAgaWYgKGxpYi5pc09iamVjdChzcmMpKSB7XG4gICAgICBzd2l0Y2ggKHNyYy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICAgIHRoaXMudG1wbFByb3BzID0gc3JjLm9iajtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgIHRoaXMudG1wbFN0ciA9IHNyYy5vYmo7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIHRlbXBsYXRlIG9iamVjdCB0eXBlIFwiICsgc3JjLnR5cGUgKyBcIjsgZXhwZWN0ZWQgJ2NvZGUnLCBvciAnc3RyaW5nJ1wiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxpYi5pc1N0cmluZyhzcmMpKSB7XG4gICAgICB0aGlzLnRtcGxTdHIgPSBzcmM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3JjIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gb2JqZWN0IGRlc2NyaWJpbmcgdGhlIHNvdXJjZScpO1xuICAgIH1cblxuICAgIHRoaXMucGF0aCA9IHBhdGg7XG5cbiAgICBpZiAoZWFnZXJDb21waWxlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLl9jb21waWxlKCk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhyb3cgbGliLl9wcmV0dGlmeUVycm9yKHRoaXMucGF0aCwgdGhpcy5lbnYub3B0cy5kZXYsIGVycik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcGlsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXIoY3R4LCBwYXJlbnRGcmFtZSwgY2IpIHtcbiAgICB2YXIgX3RoaXM2ID0gdGhpcztcblxuICAgIGlmICh0eXBlb2YgY3R4ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IGN0eDtcbiAgICAgIGN0eCA9IHt9O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhcmVudEZyYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IHBhcmVudEZyYW1lO1xuICAgICAgcGFyZW50RnJhbWUgPSBudWxsO1xuICAgIH0gLy8gSWYgdGhlcmUgaXMgYSBwYXJlbnQgZnJhbWUsIHdlIGFyZSBiZWluZyBjYWxsZWQgZnJvbSBpbnRlcm5hbFxuICAgIC8vIGNvZGUgb2YgYW5vdGhlciB0ZW1wbGF0ZSwgYW5kIHRoZSBpbnRlcm5hbCBzeXN0ZW1cbiAgICAvLyBkZXBlbmRzIG9uIHRoZSBzeW5jL2FzeW5jIG5hdHVyZSBvZiB0aGUgcGFyZW50IHRlbXBsYXRlXG4gICAgLy8gdG8gYmUgaW5oZXJpdGVkLCBzbyBmb3JjZSBhbiBhc3luYyBjYWxsYmFja1xuXG5cbiAgICB2YXIgZm9yY2VBc3luYyA9ICFwYXJlbnRGcmFtZTsgLy8gQ2F0Y2ggY29tcGlsZSBlcnJvcnMgZm9yIGFzeW5jIHJlbmRlcmluZ1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuY29tcGlsZSgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHZhciBlcnIgPSBsaWIuX3ByZXR0aWZ5RXJyb3IodGhpcy5wYXRoLCB0aGlzLmVudi5vcHRzLmRldiwgZSk7XG5cbiAgICAgIGlmIChjYikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2tBc2FwKGNiLCBlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQoY3R4IHx8IHt9LCB0aGlzLmJsb2NrcywgdGhpcy5lbnYpO1xuICAgIHZhciBmcmFtZSA9IHBhcmVudEZyYW1lID8gcGFyZW50RnJhbWUucHVzaCh0cnVlKSA6IG5ldyBGcmFtZSgpO1xuICAgIGZyYW1lLnRvcExldmVsID0gdHJ1ZTtcbiAgICB2YXIgc3luY1Jlc3VsdCA9IG51bGw7XG4gICAgdmFyIGRpZEVycm9yID0gZmFsc2U7XG4gICAgdGhpcy5yb290UmVuZGVyRnVuYyh0aGlzLmVudiwgY29udGV4dCwgZnJhbWUsIGdsb2JhbFJ1bnRpbWUsIGZ1bmN0aW9uIChlcnIsIHJlcykge1xuICAgICAgaWYgKGRpZEVycm9yKSB7XG4gICAgICAgIC8vIHByZXZlbnQgbXVsdGlwbGUgY2FsbHMgdG8gY2JcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGVyciA9IGxpYi5fcHJldHRpZnlFcnJvcihfdGhpczYucGF0aCwgX3RoaXM2LmVudi5vcHRzLmRldiwgZXJyKTtcbiAgICAgICAgZGlkRXJyb3IgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgaWYgKGZvcmNlQXN5bmMpIHtcbiAgICAgICAgICBjYWxsYmFja0FzYXAoY2IsIGVyciwgcmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYihlcnIsIHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICBzeW5jUmVzdWx0ID0gcmVzO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzeW5jUmVzdWx0O1xuICB9O1xuXG4gIF9wcm90bzMuZ2V0RXhwb3J0ZWQgPSBmdW5jdGlvbiBnZXRFeHBvcnRlZChjdHgsIHBhcmVudEZyYW1lLCBjYikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICBpZiAodHlwZW9mIGN0eCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBjdHg7XG4gICAgICBjdHggPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHBhcmVudEZyYW1lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IHBhcmVudEZyYW1lO1xuICAgICAgcGFyZW50RnJhbWUgPSBudWxsO1xuICAgIH0gLy8gQ2F0Y2ggY29tcGlsZSBlcnJvcnMgZm9yIGFzeW5jIHJlbmRlcmluZ1xuXG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5jb21waWxlKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHJldHVybiBjYihlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGZyYW1lID0gcGFyZW50RnJhbWUgPyBwYXJlbnRGcmFtZS5wdXNoKCkgOiBuZXcgRnJhbWUoKTtcbiAgICBmcmFtZS50b3BMZXZlbCA9IHRydWU7IC8vIFJ1biB0aGUgcm9vdFJlbmRlckZ1bmMgdG8gcG9wdWxhdGUgdGhlIGNvbnRleHQgd2l0aCBleHBvcnRlZCB2YXJzXG5cbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KGN0eCB8fCB7fSwgdGhpcy5ibG9ja3MsIHRoaXMuZW52KTtcbiAgICB0aGlzLnJvb3RSZW5kZXJGdW5jKHRoaXMuZW52LCBjb250ZXh0LCBmcmFtZSwgZ2xvYmFsUnVudGltZSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBjYihlcnIsIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2IobnVsbCwgY29udGV4dC5nZXRFeHBvcnRlZCgpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLmNvbXBpbGUgPSBmdW5jdGlvbiBjb21waWxlKCkge1xuICAgIGlmICghdGhpcy5jb21waWxlZCkge1xuICAgICAgdGhpcy5fY29tcGlsZSgpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLl9jb21waWxlID0gZnVuY3Rpb24gX2NvbXBpbGUoKSB7XG4gICAgdmFyIHByb3BzO1xuXG4gICAgaWYgKHRoaXMudG1wbFByb3BzKSB7XG4gICAgICBwcm9wcyA9IHRoaXMudG1wbFByb3BzO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc291cmNlID0gY29tcGlsZXIuY29tcGlsZSh0aGlzLnRtcGxTdHIsIHRoaXMuZW52LmFzeW5jRmlsdGVycywgdGhpcy5lbnYuZXh0ZW5zaW9uc0xpc3QsIHRoaXMucGF0aCwgdGhpcy5lbnYub3B0cyk7XG4gICAgICB2YXIgZnVuYyA9IG5ldyBGdW5jdGlvbihzb3VyY2UpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy1mdW5jXG5cbiAgICAgIHByb3BzID0gZnVuYygpO1xuICAgIH1cblxuICAgIHRoaXMuYmxvY2tzID0gdGhpcy5fZ2V0QmxvY2tzKHByb3BzKTtcbiAgICB0aGlzLnJvb3RSZW5kZXJGdW5jID0gcHJvcHMucm9vdDtcbiAgICB0aGlzLmNvbXBpbGVkID0gdHJ1ZTtcbiAgfTtcblxuICBfcHJvdG8zLl9nZXRCbG9ja3MgPSBmdW5jdGlvbiBfZ2V0QmxvY2tzKHByb3BzKSB7XG4gICAgdmFyIGJsb2NrcyA9IHt9O1xuICAgIGxpYi5rZXlzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICBpZiAoay5zbGljZSgwLCAyKSA9PT0gJ2JfJykge1xuICAgICAgICBibG9ja3Nbay5zbGljZSgyKV0gPSBwcm9wc1trXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYmxvY2tzO1xuICB9O1xuXG4gIHJldHVybiBUZW1wbGF0ZTtcbn0oT2JqKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVudmlyb25tZW50OiBFbnZpcm9ubWVudCxcbiAgVGVtcGxhdGU6IFRlbXBsYXRlXG59O1xuXG4vKioqLyB9KSxcbi8qIDggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBsZXhlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cbnZhciBub2RlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBPYmogPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEpLk9iajtcblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBQYXJzZXIgPVxuLyojX19QVVJFX18qL1xuZnVuY3Rpb24gKF9PYmopIHtcbiAgX2luaGVyaXRzTG9vc2UoUGFyc2VyLCBfT2JqKTtcblxuICBmdW5jdGlvbiBQYXJzZXIoKSB7XG4gICAgcmV0dXJuIF9PYmouYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICB9XG5cbiAgdmFyIF9wcm90byA9IFBhcnNlci5wcm90b3R5cGU7XG5cbiAgX3Byb3RvLmluaXQgPSBmdW5jdGlvbiBpbml0KHRva2Vucykge1xuICAgIHRoaXMudG9rZW5zID0gdG9rZW5zO1xuICAgIHRoaXMucGVla2VkID0gbnVsbDtcbiAgICB0aGlzLmJyZWFrT25CbG9ja3MgPSBudWxsO1xuICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gZmFsc2U7XG4gICAgdGhpcy5leHRlbnNpb25zID0gW107XG4gIH07XG5cbiAgX3Byb3RvLm5leHRUb2tlbiA9IGZ1bmN0aW9uIG5leHRUb2tlbih3aXRoV2hpdGVzcGFjZSkge1xuICAgIHZhciB0b2s7XG5cbiAgICBpZiAodGhpcy5wZWVrZWQpIHtcbiAgICAgIGlmICghd2l0aFdoaXRlc3BhY2UgJiYgdGhpcy5wZWVrZWQudHlwZSA9PT0gbGV4ZXIuVE9LRU5fV0hJVEVTUEFDRSkge1xuICAgICAgICB0aGlzLnBlZWtlZCA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b2sgPSB0aGlzLnBlZWtlZDtcbiAgICAgICAgdGhpcy5wZWVrZWQgPSBudWxsO1xuICAgICAgICByZXR1cm4gdG9rO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRvayA9IHRoaXMudG9rZW5zLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKCF3aXRoV2hpdGVzcGFjZSkge1xuICAgICAgd2hpbGUgKHRvayAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fV0hJVEVTUEFDRSkge1xuICAgICAgICB0b2sgPSB0aGlzLnRva2Vucy5uZXh0VG9rZW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9rO1xuICB9O1xuXG4gIF9wcm90by5wZWVrVG9rZW4gPSBmdW5jdGlvbiBwZWVrVG9rZW4oKSB7XG4gICAgdGhpcy5wZWVrZWQgPSB0aGlzLnBlZWtlZCB8fCB0aGlzLm5leHRUb2tlbigpO1xuICAgIHJldHVybiB0aGlzLnBlZWtlZDtcbiAgfTtcblxuICBfcHJvdG8ucHVzaFRva2VuID0gZnVuY3Rpb24gcHVzaFRva2VuKHRvaykge1xuICAgIGlmICh0aGlzLnBlZWtlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwdXNoVG9rZW46IGNhbiBvbmx5IHB1c2ggb25lIHRva2VuIG9uIGJldHdlZW4gcmVhZHMnKTtcbiAgICB9XG5cbiAgICB0aGlzLnBlZWtlZCA9IHRvaztcbiAgfTtcblxuICBfcHJvdG8uZXJyb3IgPSBmdW5jdGlvbiBlcnJvcihtc2csIGxpbmVubywgY29sbm8pIHtcbiAgICBpZiAobGluZW5vID09PSB1bmRlZmluZWQgfHwgY29sbm8gPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCkgfHwge307XG4gICAgICBsaW5lbm8gPSB0b2subGluZW5vO1xuICAgICAgY29sbm8gPSB0b2suY29sbm87XG4gICAgfVxuXG4gICAgaWYgKGxpbmVubyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsaW5lbm8gKz0gMTtcbiAgICB9XG5cbiAgICBpZiAoY29sbm8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29sbm8gKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IGxpYi5UZW1wbGF0ZUVycm9yKG1zZywgbGluZW5vLCBjb2xubyk7XG4gIH07XG5cbiAgX3Byb3RvLmZhaWwgPSBmdW5jdGlvbiBmYWlsKG1zZywgbGluZW5vLCBjb2xubykge1xuICAgIHRocm93IHRoaXMuZXJyb3IobXNnLCBsaW5lbm8sIGNvbG5vKTtcbiAgfTtcblxuICBfcHJvdG8uc2tpcCA9IGZ1bmN0aW9uIHNraXAodHlwZSkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKCF0b2sgfHwgdG9rLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgX3Byb3RvLmV4cGVjdCA9IGZ1bmN0aW9uIGV4cGVjdCh0eXBlKSB7XG4gICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG5cbiAgICBpZiAodG9rLnR5cGUgIT09IHR5cGUpIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgJyArIHR5cGUgKyAnLCBnb3QgJyArIHRvay50eXBlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgIH1cblxuICAgIHJldHVybiB0b2s7XG4gIH07XG5cbiAgX3Byb3RvLnNraXBWYWx1ZSA9IGZ1bmN0aW9uIHNraXBWYWx1ZSh0eXBlLCB2YWwpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICghdG9rIHx8IHRvay50eXBlICE9PSB0eXBlIHx8IHRvay52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIF9wcm90by5za2lwU3ltYm9sID0gZnVuY3Rpb24gc2tpcFN5bWJvbCh2YWwpIHtcbiAgICByZXR1cm4gdGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fU1lNQk9MLCB2YWwpO1xuICB9O1xuXG4gIF9wcm90by5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCA9IGZ1bmN0aW9uIGFkdmFuY2VBZnRlckJsb2NrRW5kKG5hbWUpIHtcbiAgICB2YXIgdG9rO1xuXG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgICBpZiAoIXRvaykge1xuICAgICAgICB0aGlzLmZhaWwoJ3VuZXhwZWN0ZWQgZW5kIG9mIGZpbGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRvay50eXBlICE9PSBsZXhlci5UT0tFTl9TWU1CT0wpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdhZHZhbmNlQWZ0ZXJCbG9ja0VuZDogZXhwZWN0ZWQgc3ltYm9sIHRva2VuIG9yICcgKyAnZXhwbGljaXQgbmFtZSB0byBiZSBwYXNzZWQnKTtcbiAgICAgIH1cblxuICAgICAgbmFtZSA9IHRoaXMubmV4dFRva2VuKCkudmFsdWU7XG4gICAgfVxuXG4gICAgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgIGlmICh0b2sgJiYgdG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX0VORCkge1xuICAgICAgaWYgKHRvay52YWx1ZS5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgYmxvY2sgZW5kIGluICcgKyBuYW1lICsgJyBzdGF0ZW1lbnQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rO1xuICB9O1xuXG4gIF9wcm90by5hZHZhbmNlQWZ0ZXJWYXJpYWJsZUVuZCA9IGZ1bmN0aW9uIGFkdmFuY2VBZnRlclZhcmlhYmxlRW5kKCkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuXG4gICAgaWYgKHRvayAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fVkFSSUFCTEVfRU5EKSB7XG4gICAgICB0aGlzLmRyb3BMZWFkaW5nV2hpdGVzcGFjZSA9IHRvay52YWx1ZS5jaGFyQXQodG9rLnZhbHVlLmxlbmd0aCAtIHRoaXMudG9rZW5zLnRhZ3MuVkFSSUFCTEVfRU5ELmxlbmd0aCAtIDEpID09PSAnLSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaFRva2VuKHRvayk7XG4gICAgICB0aGlzLmZhaWwoJ2V4cGVjdGVkIHZhcmlhYmxlIGVuZCcpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGb3IgPSBmdW5jdGlvbiBwYXJzZUZvcigpIHtcbiAgICB2YXIgZm9yVG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcbiAgICB2YXIgZW5kQmxvY2s7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdmb3InKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Gb3IoZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICAgIGVuZEJsb2NrID0gJ2VuZGZvcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzeW5jRWFjaCcpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFzeW5jRWFjaChmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgICAgZW5kQmxvY2sgPSAnZW5kZWFjaCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzeW5jQWxsJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuQXN5bmNBbGwoZm9yVG9rLmxpbmVubywgZm9yVG9rLmNvbG5vKTtcbiAgICAgIGVuZEJsb2NrID0gJ2VuZGFsbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGb3I6IGV4cGVjdGVkIGZvcntBc3luY30nLCBmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgIH1cblxuICAgIG5vZGUubmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG5cbiAgICBpZiAoIShub2RlLm5hbWUgaW5zdGFuY2VvZiBub2Rlcy5TeW1ib2wpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRm9yOiB2YXJpYWJsZSBuYW1lIGV4cGVjdGVkIGZvciBsb29wJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0aGlzLnBlZWtUb2tlbigpLnR5cGU7XG5cbiAgICBpZiAodHlwZSA9PT0gbGV4ZXIuVE9LRU5fQ09NTUEpIHtcbiAgICAgIC8vIGtleS92YWx1ZSBpdGVyYXRpb25cbiAgICAgIHZhciBrZXkgPSBub2RlLm5hbWU7XG4gICAgICBub2RlLm5hbWUgPSBuZXcgbm9kZXMuQXJyYXkoa2V5LmxpbmVubywga2V5LmNvbG5vKTtcbiAgICAgIG5vZGUubmFtZS5hZGRDaGlsZChrZXkpO1xuXG4gICAgICB3aGlsZSAodGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICB2YXIgcHJpbSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG4gICAgICAgIG5vZGUubmFtZS5hZGRDaGlsZChwcmltKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnaW4nKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUZvcjogZXhwZWN0ZWQgXCJpblwiIGtleXdvcmQgZm9yIGxvb3AnLCBmb3JUb2subGluZW5vLCBmb3JUb2suY29sbm8pO1xuICAgIH1cblxuICAgIG5vZGUuYXJyID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGZvclRvay52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKGVuZEJsb2NrLCAnZWxzZScpO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnZWxzZScpKSB7XG4gICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCdlbHNlJyk7XG4gICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKGVuZEJsb2NrKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlTWFjcm8gPSBmdW5jdGlvbiBwYXJzZU1hY3JvKCkge1xuICAgIHZhciBtYWNyb1RvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnbWFjcm8nKSkge1xuICAgICAgdGhpcy5mYWlsKCdleHBlY3RlZCBtYWNybycpO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZVByaW1hcnkodHJ1ZSk7XG4gICAgdmFyIGFyZ3MgPSB0aGlzLnBhcnNlU2lnbmF0dXJlKCk7XG4gICAgdmFyIG5vZGUgPSBuZXcgbm9kZXMuTWFjcm8obWFjcm9Ub2subGluZW5vLCBtYWNyb1Rvay5jb2xubywgbmFtZSwgYXJncyk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChtYWNyb1Rvay52YWx1ZSk7XG4gICAgbm9kZS5ib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRtYWNybycpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VDYWxsID0gZnVuY3Rpb24gcGFyc2VDYWxsKCkge1xuICAgIC8vIGEgY2FsbCBibG9jayBpcyBwYXJzZWQgYXMgYSBub3JtYWwgRnVuQ2FsbCwgYnV0IHdpdGggYW4gYWRkZWRcbiAgICAvLyAnY2FsbGVyJyBrd2FyZyB3aGljaCBpcyBhIENhbGxlciBub2RlLlxuICAgIHZhciBjYWxsVG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdjYWxsJykpIHtcbiAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgY2FsbCcpO1xuICAgIH1cblxuICAgIHZhciBjYWxsZXJBcmdzID0gdGhpcy5wYXJzZVNpZ25hdHVyZSh0cnVlKSB8fCBuZXcgbm9kZXMuTm9kZUxpc3QoKTtcbiAgICB2YXIgbWFjcm9DYWxsID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGNhbGxUb2sudmFsdWUpO1xuICAgIHZhciBib2R5ID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRjYWxsJyk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgIHZhciBjYWxsZXJOYW1lID0gbmV3IG5vZGVzLlN5bWJvbChjYWxsVG9rLmxpbmVubywgY2FsbFRvay5jb2xubywgJ2NhbGxlcicpO1xuICAgIHZhciBjYWxsZXJOb2RlID0gbmV3IG5vZGVzLkNhbGxlcihjYWxsVG9rLmxpbmVubywgY2FsbFRvay5jb2xubywgY2FsbGVyTmFtZSwgY2FsbGVyQXJncywgYm9keSk7IC8vIGFkZCB0aGUgYWRkaXRpb25hbCBjYWxsZXIga3dhcmcsIGFkZGluZyBrd2FyZ3MgaWYgbmVjZXNzYXJ5XG5cbiAgICB2YXIgYXJncyA9IG1hY3JvQ2FsbC5hcmdzLmNoaWxkcmVuO1xuXG4gICAgaWYgKCEoYXJnc1thcmdzLmxlbmd0aCAtIDFdIGluc3RhbmNlb2Ygbm9kZXMuS2V5d29yZEFyZ3MpKSB7XG4gICAgICBhcmdzLnB1c2gobmV3IG5vZGVzLktleXdvcmRBcmdzKCkpO1xuICAgIH1cblxuICAgIHZhciBrd2FyZ3MgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAga3dhcmdzLmFkZENoaWxkKG5ldyBub2Rlcy5QYWlyKGNhbGxUb2subGluZW5vLCBjYWxsVG9rLmNvbG5vLCBjYWxsZXJOYW1lLCBjYWxsZXJOb2RlKSk7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5PdXRwdXQoY2FsbFRvay5saW5lbm8sIGNhbGxUb2suY29sbm8sIFttYWNyb0NhbGxdKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VXaXRoQ29udGV4dCA9IGZ1bmN0aW9uIHBhcnNlV2l0aENvbnRleHQoKSB7XG4gICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIHdpdGhDb250ZXh0ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ3dpdGgnKSkge1xuICAgICAgd2l0aENvbnRleHQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5za2lwU3ltYm9sKCd3aXRob3V0JykpIHtcbiAgICAgIHdpdGhDb250ZXh0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHdpdGhDb250ZXh0ICE9PSBudWxsKSB7XG4gICAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnY29udGV4dCcpKSB7XG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBleHBlY3RlZCBjb250ZXh0IGFmdGVyIHdpdGgvd2l0aG91dCcsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpdGhDb250ZXh0O1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUltcG9ydCA9IGZ1bmN0aW9uIHBhcnNlSW1wb3J0KCkge1xuICAgIHZhciBpbXBvcnRUb2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woJ2ltcG9ydCcpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlSW1wb3J0OiBleHBlY3RlZCBpbXBvcnQnLCBpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8pO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnYXMnKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUltcG9ydDogZXhwZWN0ZWQgXCJhc1wiIGtleXdvcmQnLCBpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8pO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgIHZhciB3aXRoQ29udGV4dCA9IHRoaXMucGFyc2VXaXRoQ29udGV4dCgpO1xuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkltcG9ydChpbXBvcnRUb2subGluZW5vLCBpbXBvcnRUb2suY29sbm8sIHRlbXBsYXRlLCB0YXJnZXQsIHdpdGhDb250ZXh0KTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKGltcG9ydFRvay52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRnJvbSA9IGZ1bmN0aW9uIHBhcnNlRnJvbSgpIHtcbiAgICB2YXIgZnJvbVRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnZnJvbScpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgZnJvbScpO1xuICAgIH1cblxuICAgIHZhciB0ZW1wbGF0ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICBpZiAoIXRoaXMuc2tpcFN5bWJvbCgnaW1wb3J0JykpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBleHBlY3RlZCBpbXBvcnQnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgfVxuXG4gICAgdmFyIG5hbWVzID0gbmV3IG5vZGVzLk5vZGVMaXN0KCk7XG4gICAgdmFyIHdpdGhDb250ZXh0O1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB2YXIgbmV4dFRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICAgIGlmIChuZXh0VG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0JMT0NLX0VORCkge1xuICAgICAgICBpZiAoIW5hbWVzLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuZmFpbCgncGFyc2VGcm9tOiBFeHBlY3RlZCBhdCBsZWFzdCBvbmUgaW1wb3J0IG5hbWUnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgICAgIH0gLy8gU2luY2Ugd2UgYXJlIG1hbnVhbGx5IGFkdmFuY2luZyBwYXN0IHRoZSBibG9jayBlbmQsXG4gICAgICAgIC8vIG5lZWQgdG8ga2VlcCB0cmFjayBvZiB3aGl0ZXNwYWNlIGNvbnRyb2wgKG5vcm1hbGx5XG4gICAgICAgIC8vIHRoaXMgaXMgZG9uZSBpbiBgYWR2YW5jZUFmdGVyQmxvY2tFbmRgXG5cblxuICAgICAgICBpZiAobmV4dFRvay52YWx1ZS5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAobmFtZXMuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAhdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlRnJvbTogZXhwZWN0ZWQgY29tbWEnLCBmcm9tVG9rLmxpbmVubywgZnJvbVRvay5jb2xubyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBuYW1lID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcblxuICAgICAgaWYgKG5hbWUudmFsdWUuY2hhckF0KDApID09PSAnXycpIHtcbiAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUZyb206IG5hbWVzIHN0YXJ0aW5nIHdpdGggYW4gdW5kZXJzY29yZSBjYW5ub3QgYmUgaW1wb3J0ZWQnLCBuYW1lLmxpbmVubywgbmFtZS5jb2xubyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2FzJykpIHtcbiAgICAgICAgdmFyIGFsaWFzID0gdGhpcy5wYXJzZVByaW1hcnkoKTtcbiAgICAgICAgbmFtZXMuYWRkQ2hpbGQobmV3IG5vZGVzLlBhaXIobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIG5hbWUsIGFsaWFzKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYW1lcy5hZGRDaGlsZChuYW1lKTtcbiAgICAgIH1cblxuICAgICAgd2l0aENvbnRleHQgPSB0aGlzLnBhcnNlV2l0aENvbnRleHQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLkZyb21JbXBvcnQoZnJvbVRvay5saW5lbm8sIGZyb21Ub2suY29sbm8sIHRlbXBsYXRlLCBuYW1lcywgd2l0aENvbnRleHQpO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUJsb2NrID0gZnVuY3Rpb24gcGFyc2VCbG9jaygpIHtcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdibG9jaycpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlQmxvY2s6IGV4cGVjdGVkIGJsb2NrJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5CbG9jayh0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIG5vZGUubmFtZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG5cbiAgICBpZiAoIShub2RlLm5hbWUgaW5zdGFuY2VvZiBub2Rlcy5TeW1ib2wpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlQmxvY2s6IHZhcmlhYmxlIG5hbWUgZXhwZWN0ZWQnLCB0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICBub2RlLmJvZHkgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3MoJ2VuZGJsb2NrJyk7XG4gICAgdGhpcy5za2lwU3ltYm9sKCdlbmRibG9jaycpO1xuICAgIHRoaXMuc2tpcFN5bWJvbChub2RlLm5hbWUudmFsdWUpO1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0b2spIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VCbG9jazogZXhwZWN0ZWQgZW5kYmxvY2ssIGdvdCBlbmQgb2YgZmlsZScpO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodG9rLnZhbHVlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VFeHRlbmRzID0gZnVuY3Rpb24gcGFyc2VFeHRlbmRzKCkge1xuICAgIHZhciB0YWdOYW1lID0gJ2V4dGVuZHMnO1xuICAgIHZhciB0YWcgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2wodGFnTmFtZSkpIHtcbiAgICAgIHRoaXMuZmFpbCgncGFyc2VUZW1wbGF0ZVJlZjogZXhwZWN0ZWQgJyArIHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkV4dGVuZHModGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICBub2RlLnRlbXBsYXRlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKHRhZy52YWx1ZSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSW5jbHVkZSA9IGZ1bmN0aW9uIHBhcnNlSW5jbHVkZSgpIHtcbiAgICB2YXIgdGFnTmFtZSA9ICdpbmNsdWRlJztcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKHRhZ05hbWUpKSB7XG4gICAgICB0aGlzLmZhaWwoJ3BhcnNlSW5jbHVkZTogZXhwZWN0ZWQgJyArIHRhZ05hbWUpO1xuICAgIH1cblxuICAgIHZhciBub2RlID0gbmV3IG5vZGVzLkluY2x1ZGUodGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICBub2RlLnRlbXBsYXRlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2lnbm9yZScpICYmIHRoaXMuc2tpcFN5bWJvbCgnbWlzc2luZycpKSB7XG4gICAgICBub2RlLmlnbm9yZU1pc3NpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VJZiA9IGZ1bmN0aW9uIHBhcnNlSWYoKSB7XG4gICAgdmFyIHRhZyA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgdmFyIG5vZGU7XG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdpZicpIHx8IHRoaXMuc2tpcFN5bWJvbCgnZWxpZicpIHx8IHRoaXMuc2tpcFN5bWJvbCgnZWxzZWlmJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSWYodGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaWZBc3luYycpKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLklmQXN5bmModGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUlmOiBleHBlY3RlZCBpZiwgZWxpZiwgb3IgZWxzZWlmJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICBub2RlLmNvbmQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQodGFnLnZhbHVlKTtcbiAgICBub2RlLmJvZHkgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3MoJ2VsaWYnLCAnZWxzZWlmJywgJ2Vsc2UnLCAnZW5kaWYnKTtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIHN3aXRjaCAodG9rICYmIHRvay52YWx1ZSkge1xuICAgICAgY2FzZSAnZWxzZWlmJzpcbiAgICAgIGNhc2UgJ2VsaWYnOlxuICAgICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZUlmKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlbHNlJzpcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBub2RlLmVsc2VfID0gdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRpZicpO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlbmRpZic6XG4gICAgICAgIG5vZGUuZWxzZV8gPSBudWxsO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlSWY6IGV4cGVjdGVkIGVsaWYsIGVsc2UsIG9yIGVuZGlmLCBnb3QgZW5kIG9mIGZpbGUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTZXQgPSBmdW5jdGlvbiBwYXJzZVNldCgpIHtcbiAgICB2YXIgdGFnID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdzZXQnKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZVNldDogZXhwZWN0ZWQgc2V0JywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICB9XG5cbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5TZXQodGFnLmxpbmVubywgdGFnLmNvbG5vLCBbXSk7XG4gICAgdmFyIHRhcmdldDtcblxuICAgIHdoaWxlICh0YXJnZXQgPSB0aGlzLnBhcnNlUHJpbWFyeSgpKSB7XG4gICAgICBub2RlLnRhcmdldHMucHVzaCh0YXJnZXQpO1xuXG4gICAgICBpZiAoIXRoaXMuc2tpcChsZXhlci5UT0tFTl9DT01NQSkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJz0nKSkge1xuICAgICAgaWYgKCF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQkxPQ0tfRU5EKSkge1xuICAgICAgICB0aGlzLmZhaWwoJ3BhcnNlU2V0OiBleHBlY3RlZCA9IG9yIGJsb2NrIGVuZCBpbiBzZXQgdGFnJywgdGFnLmxpbmVubywgdGFnLmNvbG5vKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuYm9keSA9IG5ldyBub2Rlcy5DYXB0dXJlKHRhZy5saW5lbm8sIHRhZy5jb2xubywgdGhpcy5wYXJzZVVudGlsQmxvY2tzKCdlbmRzZXQnKSk7XG4gICAgICAgIG5vZGUudmFsdWUgPSBudWxsO1xuICAgICAgICB0aGlzLmFkdmFuY2VBZnRlckJsb2NrRW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUudmFsdWUgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCh0YWcudmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVN3aXRjaCA9IGZ1bmN0aW9uIHBhcnNlU3dpdGNoKCkge1xuICAgIC8qXG4gICAgICogU3RvcmUgdGhlIHRhZyBuYW1lcyBpbiB2YXJpYWJsZXMgaW4gY2FzZSBzb21lb25lIGV2ZXIgd2FudHMgdG9cbiAgICAgKiBjdXN0b21pemUgdGhpcy5cbiAgICAgKi9cbiAgICB2YXIgc3dpdGNoU3RhcnQgPSAnc3dpdGNoJztcbiAgICB2YXIgc3dpdGNoRW5kID0gJ2VuZHN3aXRjaCc7XG4gICAgdmFyIGNhc2VTdGFydCA9ICdjYXNlJztcbiAgICB2YXIgY2FzZURlZmF1bHQgPSAnZGVmYXVsdCc7IC8vIEdldCB0aGUgc3dpdGNoIHRhZy5cblxuICAgIHZhciB0YWcgPSB0aGlzLnBlZWtUb2tlbigpOyAvLyBmYWlsIGVhcmx5IGlmIHdlIGdldCBzb21lIHVuZXhwZWN0ZWQgdGFnLlxuXG4gICAgaWYgKCF0aGlzLnNraXBTeW1ib2woc3dpdGNoU3RhcnQpICYmICF0aGlzLnNraXBTeW1ib2woY2FzZVN0YXJ0KSAmJiAhdGhpcy5za2lwU3ltYm9sKGNhc2VEZWZhdWx0KSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZVN3aXRjaDogZXhwZWN0ZWQgXCJzd2l0Y2gsXCIgXCJjYXNlXCIgb3IgXCJkZWZhdWx0XCInLCB0YWcubGluZW5vLCB0YWcuY29sbm8pO1xuICAgIH0gLy8gcGFyc2UgdGhlIHN3aXRjaCBleHByZXNzaW9uXG5cblxuICAgIHZhciBleHByID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTsgLy8gYWR2YW5jZSB1bnRpbCBhIHN0YXJ0IG9mIGEgY2FzZSwgYSBkZWZhdWx0IGNhc2Ugb3IgYW4gZW5kc3dpdGNoLlxuXG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChzd2l0Y2hTdGFydCk7XG4gICAgdGhpcy5wYXJzZVVudGlsQmxvY2tzKGNhc2VTdGFydCwgY2FzZURlZmF1bHQsIHN3aXRjaEVuZCk7IC8vIHRoaXMgaXMgdGhlIGZpcnN0IGNhc2UuIGl0IGNvdWxkIGFsc28gYmUgYW4gZW5kc3dpdGNoLCB3ZSdsbCBjaGVjay5cblxuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpOyAvLyBjcmVhdGUgbmV3IHZhcmlhYmxlcyBmb3Igb3VyIGNhc2VzIGFuZCBkZWZhdWx0IGNhc2UuXG5cbiAgICB2YXIgY2FzZXMgPSBbXTtcbiAgICB2YXIgZGVmYXVsdENhc2U7IC8vIHdoaWxlIHdlJ3JlIGRlYWxpbmcgd2l0aCBuZXcgY2FzZXMgbm9kZXMuLi5cblxuICAgIGRvIHtcbiAgICAgIC8vIHNraXAgdGhlIHN0YXJ0IHN5bWJvbCBhbmQgZ2V0IHRoZSBjYXNlIGV4cHJlc3Npb25cbiAgICAgIHRoaXMuc2tpcFN5bWJvbChjYXNlU3RhcnQpO1xuICAgICAgdmFyIGNvbmQgPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChzd2l0Y2hTdGFydCk7IC8vIGdldCB0aGUgYm9keSBvZiB0aGUgY2FzZSBub2RlIGFuZCBhZGQgaXQgdG8gdGhlIGFycmF5IG9mIGNhc2VzLlxuXG4gICAgICB2YXIgYm9keSA9IHRoaXMucGFyc2VVbnRpbEJsb2NrcyhjYXNlU3RhcnQsIGNhc2VEZWZhdWx0LCBzd2l0Y2hFbmQpO1xuICAgICAgY2FzZXMucHVzaChuZXcgbm9kZXMuQ2FzZSh0b2subGluZSwgdG9rLmNvbCwgY29uZCwgYm9keSkpOyAvLyBnZXQgb3VyIG5leHQgY2FzZVxuXG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIH0gd2hpbGUgKHRvayAmJiB0b2sudmFsdWUgPT09IGNhc2VTdGFydCk7IC8vIHdlIGVpdGhlciBoYXZlIGEgZGVmYXVsdCBjYXNlIG9yIGEgc3dpdGNoIGVuZC5cblxuXG4gICAgc3dpdGNoICh0b2sudmFsdWUpIHtcbiAgICAgIGNhc2UgY2FzZURlZmF1bHQ6XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgZGVmYXVsdENhc2UgPSB0aGlzLnBhcnNlVW50aWxCbG9ja3Moc3dpdGNoRW5kKTtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZCgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBzd2l0Y2hFbmQ6XG4gICAgICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIG90aGVyd2lzZSBiYWlsIGJlY2F1c2UgRU9GXG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VTd2l0Y2g6IGV4cGVjdGVkIFwiY2FzZSxcIiBcImRlZmF1bHRcIiBvciBcImVuZHN3aXRjaCxcIiBnb3QgRU9GLicpO1xuICAgIH0gLy8gYW5kIHJldHVybiB0aGUgc3dpdGNoIG5vZGUuXG5cblxuICAgIHJldHVybiBuZXcgbm9kZXMuU3dpdGNoKHRhZy5saW5lbm8sIHRhZy5jb2xubywgZXhwciwgY2FzZXMsIGRlZmF1bHRDYXNlKTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTdGF0ZW1lbnQgPSBmdW5jdGlvbiBwYXJzZVN0YXRlbWVudCgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcblxuICAgIGlmICh0b2sudHlwZSAhPT0gbGV4ZXIuVE9LRU5fU1lNQk9MKSB7XG4gICAgICB0aGlzLmZhaWwoJ3RhZyBuYW1lIGV4cGVjdGVkJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5icmVha09uQmxvY2tzICYmIGxpYi5pbmRleE9mKHRoaXMuYnJlYWtPbkJsb2NrcywgdG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHN3aXRjaCAodG9rLnZhbHVlKSB7XG4gICAgICBjYXNlICdyYXcnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVJhdygpO1xuXG4gICAgICBjYXNlICd2ZXJiYXRpbSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlUmF3KCd2ZXJiYXRpbScpO1xuXG4gICAgICBjYXNlICdpZic6XG4gICAgICBjYXNlICdpZkFzeW5jJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VJZigpO1xuXG4gICAgICBjYXNlICdmb3InOlxuICAgICAgY2FzZSAnYXN5bmNFYWNoJzpcbiAgICAgIGNhc2UgJ2FzeW5jQWxsJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VGb3IoKTtcblxuICAgICAgY2FzZSAnYmxvY2snOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUJsb2NrKCk7XG5cbiAgICAgIGNhc2UgJ2V4dGVuZHMnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUV4dGVuZHMoKTtcblxuICAgICAgY2FzZSAnaW5jbHVkZSc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlSW5jbHVkZSgpO1xuXG4gICAgICBjYXNlICdzZXQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZVNldCgpO1xuXG4gICAgICBjYXNlICdtYWNybyc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlTWFjcm8oKTtcblxuICAgICAgY2FzZSAnY2FsbCc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlQ2FsbCgpO1xuXG4gICAgICBjYXNlICdpbXBvcnQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUltcG9ydCgpO1xuXG4gICAgICBjYXNlICdmcm9tJzpcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VGcm9tKCk7XG5cbiAgICAgIGNhc2UgJ2ZpbHRlcic6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlRmlsdGVyU3RhdGVtZW50KCk7XG5cbiAgICAgIGNhc2UgJ3N3aXRjaCc6XG4gICAgICAgIHJldHVybiB0aGlzLnBhcnNlU3dpdGNoKCk7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0aGlzLmV4dGVuc2lvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV4dGVuc2lvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBleHQgPSB0aGlzLmV4dGVuc2lvbnNbaV07XG5cbiAgICAgICAgICAgIGlmIChsaWIuaW5kZXhPZihleHQudGFncyB8fCBbXSwgdG9rLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4dC5wYXJzZSh0aGlzLCBub2RlcywgbGV4ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmFpbCgndW5rbm93biBibG9jayB0YWc6ICcgKyB0b2sudmFsdWUsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUmF3ID0gZnVuY3Rpb24gcGFyc2VSYXcodGFnTmFtZSkge1xuICAgIHRhZ05hbWUgPSB0YWdOYW1lIHx8ICdyYXcnO1xuICAgIHZhciBlbmRUYWdOYW1lID0gJ2VuZCcgKyB0YWdOYW1lOyAvLyBMb29rIGZvciB1cGNvbWluZyByYXcgYmxvY2tzIChpZ25vcmUgYWxsIG90aGVyIGtpbmRzIG9mIGJsb2NrcylcblxuICAgIHZhciByYXdCbG9ja1JlZ2V4ID0gbmV3IFJlZ0V4cCgnKFtcXFxcc1xcXFxTXSo/KXslXFxcXHMqKCcgKyB0YWdOYW1lICsgJ3wnICsgZW5kVGFnTmFtZSArICcpXFxcXHMqKD89JX0pJX0nKTtcbiAgICB2YXIgcmF3TGV2ZWwgPSAxO1xuICAgIHZhciBzdHIgPSAnJztcbiAgICB2YXIgbWF0Y2hlcyA9IG51bGw7IC8vIFNraXAgb3BlbmluZyByYXcgdG9rZW5cbiAgICAvLyBLZWVwIHRoaXMgdG9rZW4gdG8gdHJhY2sgbGluZSBhbmQgY29sdW1uIG51bWJlcnNcblxuICAgIHZhciBiZWd1biA9IHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTsgLy8gRXhpdCB3aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBtYXRjaFxuICAgIC8vIG9yIHdoZW4gd2UndmUgZm91bmQgdGhlIG1hdGNoaW5nIFwiZW5kcmF3XCIgYmxvY2tcblxuICAgIHdoaWxlICgobWF0Y2hlcyA9IHRoaXMudG9rZW5zLl9leHRyYWN0UmVnZXgocmF3QmxvY2tSZWdleCkpICYmIHJhd0xldmVsID4gMCkge1xuICAgICAgdmFyIGFsbCA9IG1hdGNoZXNbMF07XG4gICAgICB2YXIgcHJlID0gbWF0Y2hlc1sxXTtcbiAgICAgIHZhciBibG9ja05hbWUgPSBtYXRjaGVzWzJdOyAvLyBBZGp1c3QgcmF3bGV2ZWxcblxuICAgICAgaWYgKGJsb2NrTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgICAgICByYXdMZXZlbCArPSAxO1xuICAgICAgfSBlbHNlIGlmIChibG9ja05hbWUgPT09IGVuZFRhZ05hbWUpIHtcbiAgICAgICAgcmF3TGV2ZWwgLT0gMTtcbiAgICAgIH0gLy8gQWRkIHRvIHN0clxuXG5cbiAgICAgIGlmIChyYXdMZXZlbCA9PT0gMCkge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGV4Y2x1ZGUgdGhlIGxhc3QgXCJlbmRyYXdcIlxuICAgICAgICBzdHIgKz0gcHJlOyAvLyBNb3ZlIHRva2VuaXplciB0byBiZWdpbm5pbmcgb2YgZW5kcmF3IGJsb2NrXG5cbiAgICAgICAgdGhpcy50b2tlbnMuYmFja04oYWxsLmxlbmd0aCAtIHByZS5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGFsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IG5vZGVzLk91dHB1dChiZWd1bi5saW5lbm8sIGJlZ3VuLmNvbG5vLCBbbmV3IG5vZGVzLlRlbXBsYXRlRGF0YShiZWd1bi5saW5lbm8sIGJlZ3VuLmNvbG5vLCBzdHIpXSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlUG9zdGZpeCA9IGZ1bmN0aW9uIHBhcnNlUG9zdGZpeChub2RlKSB7XG4gICAgdmFyIGxvb2t1cDtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIHdoaWxlICh0b2spIHtcbiAgICAgIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTikge1xuICAgICAgICAvLyBGdW5jdGlvbiBjYWxsXG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRnVuQ2FsbCh0b2subGluZW5vLCB0b2suY29sbm8sIG5vZGUsIHRoaXMucGFyc2VTaWduYXR1cmUoKSk7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9MRUZUX0JSQUNLRVQpIHtcbiAgICAgICAgLy8gUmVmZXJlbmNlXG4gICAgICAgIGxvb2t1cCA9IHRoaXMucGFyc2VBZ2dyZWdhdGUoKTtcblxuICAgICAgICBpZiAobG9va3VwLmNoaWxkcmVuLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aGlzLmZhaWwoJ2ludmFsaWQgaW5kZXgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTG9va3VwVmFsKHRvay5saW5lbm8sIHRvay5jb2xubywgbm9kZSwgbG9va3VwLmNoaWxkcmVuWzBdKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX09QRVJBVE9SICYmIHRvay52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIC8vIFJlZmVyZW5jZVxuICAgICAgICB0aGlzLm5leHRUb2tlbigpO1xuICAgICAgICB2YXIgdmFsID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgICAgICBpZiAodmFsLnR5cGUgIT09IGxleGVyLlRPS0VOX1NZTUJPTCkge1xuICAgICAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgbmFtZSBhcyBsb29rdXAgdmFsdWUsIGdvdCAnICsgdmFsLnZhbHVlLCB2YWwubGluZW5vLCB2YWwuY29sbm8pO1xuICAgICAgICB9IC8vIE1ha2UgYSBsaXRlcmFsIHN0cmluZyBiZWNhdXNlIGl0J3Mgbm90IGEgdmFyaWFibGVcbiAgICAgICAgLy8gcmVmZXJlbmNlXG5cblxuICAgICAgICBsb29rdXAgPSBuZXcgbm9kZXMuTGl0ZXJhbCh2YWwubGluZW5vLCB2YWwuY29sbm8sIHZhbC52YWx1ZSk7XG4gICAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTG9va3VwVmFsKHRvay5saW5lbm8sIHRvay5jb2xubywgbm9kZSwgbG9va3VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUV4cHJlc3Npb24gPSBmdW5jdGlvbiBwYXJzZUV4cHJlc3Npb24oKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlSW5saW5lSWYoKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VJbmxpbmVJZiA9IGZ1bmN0aW9uIHBhcnNlSW5saW5lSWYoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlT3IoKTtcblxuICAgIGlmICh0aGlzLnNraXBTeW1ib2woJ2lmJykpIHtcbiAgICAgIHZhciBjb25kTm9kZSA9IHRoaXMucGFyc2VPcigpO1xuICAgICAgdmFyIGJvZHlOb2RlID0gbm9kZTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSW5saW5lSWYobm9kZS5saW5lbm8sIG5vZGUuY29sbm8pO1xuICAgICAgbm9kZS5ib2R5ID0gYm9keU5vZGU7XG4gICAgICBub2RlLmNvbmQgPSBjb25kTm9kZTtcblxuICAgICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnZWxzZScpKSB7XG4gICAgICAgIG5vZGUuZWxzZV8gPSB0aGlzLnBhcnNlT3IoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUuZWxzZV8gPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU9yID0gZnVuY3Rpb24gcGFyc2VPcigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VBbmQoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBTeW1ib2woJ29yJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VBbmQoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuT3Iobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VBbmQgPSBmdW5jdGlvbiBwYXJzZUFuZCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VOb3QoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBTeW1ib2woJ2FuZCcpKSB7XG4gICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlTm90KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkFuZChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZU5vdCA9IGZ1bmN0aW9uIHBhcnNlTm90KCkge1xuICAgIHZhciB0b2sgPSB0aGlzLnBlZWtUb2tlbigpO1xuXG4gICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnbm90JykpIHtcbiAgICAgIHJldHVybiBuZXcgbm9kZXMuTm90KHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZU5vdCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYXJzZUluKCk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlSW4gPSBmdW5jdGlvbiBwYXJzZUluKCkge1xuICAgIHZhciBub2RlID0gdGhpcy5wYXJzZUlzKCk7XG5cbiAgICB3aGlsZSAoMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zdGFudC1jb25kaXRpb25cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBuZXh0IHRva2VuIGlzICdub3QnXG4gICAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgICAgaWYgKCF0b2spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnZlcnQgPSB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fU1lNQk9MICYmIHRvay52YWx1ZSA9PT0gJ25vdCc7IC8vIGlmIGl0IHdhc24ndCAnbm90JywgcHV0IGl0IGJhY2tcblxuICAgICAgaWYgKCFpbnZlcnQpIHtcbiAgICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuc2tpcFN5bWJvbCgnaW4nKSkge1xuICAgICAgICB2YXIgbm9kZTIgPSB0aGlzLnBhcnNlSXMoKTtcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Jbihub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuXG4gICAgICAgIGlmIChpbnZlcnQpIHtcbiAgICAgICAgICBub2RlID0gbmV3IG5vZGVzLk5vdChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIHdlJ2QgZm91bmQgYSAnbm90JyBidXQgdGhpcyB3YXNuJ3QgYW4gJ2luJywgcHV0IGJhY2sgdGhlICdub3QnXG4gICAgICAgIGlmIChpbnZlcnQpIHtcbiAgICAgICAgICB0aGlzLnB1c2hUb2tlbih0b2spO1xuICAgICAgICB9XG5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH0gLy8gSSBwdXQgdGhpcyByaWdodCBhZnRlciBcImluXCIgaW4gdGhlIG9wZXJhdG9yIHByZWNlZGVuY2Ugc3RhY2suIFRoYXQgY2FuXG4gIC8vIG9idmlvdXNseSBiZSBjaGFuZ2VkIHRvIGJlIGNsb3NlciB0byBKaW5qYS5cbiAgO1xuXG4gIF9wcm90by5wYXJzZUlzID0gZnVuY3Rpb24gcGFyc2VJcygpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VDb21wYXJlKCk7IC8vIGxvb2sgZm9yIGFuIGlzXG5cbiAgICBpZiAodGhpcy5za2lwU3ltYm9sKCdpcycpKSB7XG4gICAgICAvLyBsb29rIGZvciBhIG5vdFxuICAgICAgdmFyIG5vdCA9IHRoaXMuc2tpcFN5bWJvbCgnbm90Jyk7IC8vIGdldCB0aGUgbmV4dCBub2RlXG5cbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VDb21wYXJlKCk7IC8vIGNyZWF0ZSBhbiBJcyBub2RlIHVzaW5nIHRoZSBuZXh0IG5vZGUgYW5kIHRoZSBpbmZvIGZyb20gb3VyIElzIG5vZGUuXG5cbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuSXMobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTsgLy8gaWYgd2UgaGF2ZSBhIE5vdCwgY3JlYXRlIGEgTm90IG5vZGUgZnJvbSBvdXIgSXMgbm9kZS5cblxuICAgICAgaWYgKG5vdCkge1xuICAgICAgICBub2RlID0gbmV3IG5vZGVzLk5vdChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSk7XG4gICAgICB9XG4gICAgfSAvLyByZXR1cm4gdGhlIG5vZGUuXG5cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUNvbXBhcmUgPSBmdW5jdGlvbiBwYXJzZUNvbXBhcmUoKSB7XG4gICAgdmFyIGNvbXBhcmVPcHMgPSBbJz09JywgJz09PScsICchPScsICchPT0nLCAnPCcsICc+JywgJzw9JywgJz49J107XG4gICAgdmFyIGV4cHIgPSB0aGlzLnBhcnNlQ29uY2F0KCk7XG4gICAgdmFyIG9wcyA9IFtdO1xuXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc3RhbnQtY29uZGl0aW9uXG4gICAgICB2YXIgdG9rID0gdGhpcy5uZXh0VG9rZW4oKTtcblxuICAgICAgaWYgKCF0b2spIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKGNvbXBhcmVPcHMuaW5kZXhPZih0b2sudmFsdWUpICE9PSAtMSkge1xuICAgICAgICBvcHMucHVzaChuZXcgbm9kZXMuQ29tcGFyZU9wZXJhbmQodG9rLmxpbmVubywgdG9rLmNvbG5vLCB0aGlzLnBhcnNlQ29uY2F0KCksIHRvay52YWx1ZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBuZXcgbm9kZXMuQ29tcGFyZShvcHNbMF0ubGluZW5vLCBvcHNbMF0uY29sbm8sIGV4cHIsIG9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBleHByO1xuICAgIH1cbiAgfSAvLyBmaW5kcyB0aGUgJ34nIGZvciBzdHJpbmcgY29uY2F0ZW5hdGlvblxuICA7XG5cbiAgX3Byb3RvLnBhcnNlQ29uY2F0ID0gZnVuY3Rpb24gcGFyc2VDb25jYXQoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlQWRkKCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fVElMREUsICd+JykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VBZGQoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuQ29uY2F0KG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlQWRkID0gZnVuY3Rpb24gcGFyc2VBZGQoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlU3ViKCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcrJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VTdWIoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuQWRkKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlU3ViID0gZnVuY3Rpb24gcGFyc2VTdWIoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlTXVsKCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICctJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VNdWwoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuU3ViKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlTXVsID0gZnVuY3Rpb24gcGFyc2VNdWwoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlRGl2KCk7XG5cbiAgICB3aGlsZSAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcqJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VEaXYoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuTXVsKG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBub2RlLCBub2RlMik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRGl2ID0gZnVuY3Rpb24gcGFyc2VEaXYoKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLnBhcnNlRmxvb3JEaXYoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJy8nKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZUZsb29yRGl2KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkRpdihub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUZsb29yRGl2ID0gZnVuY3Rpb24gcGFyc2VGbG9vckRpdigpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VNb2QoKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJy8vJykpIHtcbiAgICAgIHZhciBub2RlMiA9IHRoaXMucGFyc2VNb2QoKTtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuRmxvb3JEaXYobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VNb2QgPSBmdW5jdGlvbiBwYXJzZU1vZCgpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VQb3coKTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJyUnKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZVBvdygpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5Nb2Qobm9kZS5saW5lbm8sIG5vZGUuY29sbm8sIG5vZGUsIG5vZGUyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VQb3cgPSBmdW5jdGlvbiBwYXJzZVBvdygpIHtcbiAgICB2YXIgbm9kZSA9IHRoaXMucGFyc2VVbmFyeSgpO1xuXG4gICAgd2hpbGUgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnKionKSkge1xuICAgICAgdmFyIG5vZGUyID0gdGhpcy5wYXJzZVVuYXJ5KCk7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLlBvdyhub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZSwgbm9kZTIpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVVuYXJ5ID0gZnVuY3Rpb24gcGFyc2VVbmFyeShub0ZpbHRlcnMpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcbiAgICB2YXIgbm9kZTtcblxuICAgIGlmICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJy0nKSkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5OZWcodG9rLmxpbmVubywgdG9rLmNvbG5vLCB0aGlzLnBhcnNlVW5hcnkodHJ1ZSkpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5za2lwVmFsdWUobGV4ZXIuVE9LRU5fT1BFUkFUT1IsICcrJykpIHtcbiAgICAgIG5vZGUgPSBuZXcgbm9kZXMuUG9zKHRvay5saW5lbm8sIHRvay5jb2xubywgdGhpcy5wYXJzZVVuYXJ5KHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHRoaXMucGFyc2VQcmltYXJ5KCk7XG4gICAgfVxuXG4gICAgaWYgKCFub0ZpbHRlcnMpIHtcbiAgICAgIG5vZGUgPSB0aGlzLnBhcnNlRmlsdGVyKG5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZVByaW1hcnkgPSBmdW5jdGlvbiBwYXJzZVByaW1hcnkobm9Qb3N0Zml4KSB7XG4gICAgdmFyIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG4gICAgdmFyIHZhbDtcbiAgICB2YXIgbm9kZSA9IG51bGw7XG5cbiAgICBpZiAoIXRvaykge1xuICAgICAgdGhpcy5mYWlsKCdleHBlY3RlZCBleHByZXNzaW9uLCBnb3QgZW5kIG9mIGZpbGUnKTtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9TVFJJTkcpIHtcbiAgICAgIHZhbCA9IHRvay52YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9JTlQpIHtcbiAgICAgIHZhbCA9IHBhcnNlSW50KHRvay52YWx1ZSwgMTApO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0ZMT0FUKSB7XG4gICAgICB2YWwgPSBwYXJzZUZsb2F0KHRvay52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fQk9PTEVBTikge1xuICAgICAgaWYgKHRvay52YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgIHZhbCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRvay52YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICB2YWwgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmFpbCgnaW52YWxpZCBib29sZWFuOiAnICsgdG9rLnZhbHVlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX05PTkUpIHtcbiAgICAgIHZhbCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fUkVHRVgpIHtcbiAgICAgIHZhbCA9IG5ldyBSZWdFeHAodG9rLnZhbHVlLmJvZHksIHRvay52YWx1ZS5mbGFncyk7XG4gICAgfVxuXG4gICAgaWYgKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBub2RlID0gbmV3IG5vZGVzLkxpdGVyYWwodG9rLmxpbmVubywgdG9rLmNvbG5vLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1NZTUJPTCkge1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5TeW1ib2wodG9rLmxpbmVubywgdG9rLmNvbG5vLCB0b2sudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZWUgaWYgaXQncyBhbiBhZ2dyZWdhdGUgdHlwZSwgd2UgbmVlZCB0byBwdXNoIHRoZVxuICAgICAgLy8gY3VycmVudCBkZWxpbWl0ZXIgdG9rZW4gYmFjayBvblxuICAgICAgdGhpcy5wdXNoVG9rZW4odG9rKTtcbiAgICAgIG5vZGUgPSB0aGlzLnBhcnNlQWdncmVnYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKCFub1Bvc3RmaXgpIHtcbiAgICAgIG5vZGUgPSB0aGlzLnBhcnNlUG9zdGZpeChub2RlKTtcbiAgICB9XG5cbiAgICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IHRoaXMuZXJyb3IoXCJ1bmV4cGVjdGVkIHRva2VuOiBcIiArIHRvay52YWx1ZSwgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRmlsdGVyTmFtZSA9IGZ1bmN0aW9uIHBhcnNlRmlsdGVyTmFtZSgpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5leHBlY3QobGV4ZXIuVE9LRU5fU1lNQk9MKTtcbiAgICB2YXIgbmFtZSA9IHRvay52YWx1ZTtcblxuICAgIHdoaWxlICh0aGlzLnNraXBWYWx1ZShsZXhlci5UT0tFTl9PUEVSQVRPUiwgJy4nKSkge1xuICAgICAgbmFtZSArPSAnLicgKyB0aGlzLmV4cGVjdChsZXhlci5UT0tFTl9TWU1CT0wpLnZhbHVlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgbm9kZXMuU3ltYm9sKHRvay5saW5lbm8sIHRvay5jb2xubywgbmFtZSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlRmlsdGVyQXJncyA9IGZ1bmN0aW9uIHBhcnNlRmlsdGVyQXJncyhub2RlKSB7XG4gICAgaWYgKHRoaXMucGVla1Rva2VuKCkudHlwZSA9PT0gbGV4ZXIuVE9LRU5fTEVGVF9QQVJFTikge1xuICAgICAgLy8gR2V0IGEgRnVuQ2FsbCBub2RlIGFuZCBhZGQgdGhlIHBhcmFtZXRlcnMgdG8gdGhlXG4gICAgICAvLyBmaWx0ZXJcbiAgICAgIHZhciBjYWxsID0gdGhpcy5wYXJzZVBvc3RmaXgobm9kZSk7XG4gICAgICByZXR1cm4gY2FsbC5hcmdzLmNoaWxkcmVuO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGaWx0ZXIgPSBmdW5jdGlvbiBwYXJzZUZpbHRlcihub2RlKSB7XG4gICAgd2hpbGUgKHRoaXMuc2tpcChsZXhlci5UT0tFTl9QSVBFKSkge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLnBhcnNlRmlsdGVyTmFtZSgpO1xuICAgICAgbm9kZSA9IG5ldyBub2Rlcy5GaWx0ZXIobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIG5hbWUsIG5ldyBub2Rlcy5Ob2RlTGlzdChuYW1lLmxpbmVubywgbmFtZS5jb2xubywgW25vZGVdLmNvbmNhdCh0aGlzLnBhcnNlRmlsdGVyQXJncyhub2RlKSkpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VGaWx0ZXJTdGF0ZW1lbnQgPSBmdW5jdGlvbiBwYXJzZUZpbHRlclN0YXRlbWVudCgpIHtcbiAgICB2YXIgZmlsdGVyVG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghdGhpcy5za2lwU3ltYm9sKCdmaWx0ZXInKSkge1xuICAgICAgdGhpcy5mYWlsKCdwYXJzZUZpbHRlclN0YXRlbWVudDogZXhwZWN0ZWQgZmlsdGVyJyk7XG4gICAgfVxuXG4gICAgdmFyIG5hbWUgPSB0aGlzLnBhcnNlRmlsdGVyTmFtZSgpO1xuICAgIHZhciBhcmdzID0gdGhpcy5wYXJzZUZpbHRlckFyZ3MobmFtZSk7XG4gICAgdGhpcy5hZHZhbmNlQWZ0ZXJCbG9ja0VuZChmaWx0ZXJUb2sudmFsdWUpO1xuICAgIHZhciBib2R5ID0gbmV3IG5vZGVzLkNhcHR1cmUobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIHRoaXMucGFyc2VVbnRpbEJsb2NrcygnZW5kZmlsdGVyJykpO1xuICAgIHRoaXMuYWR2YW5jZUFmdGVyQmxvY2tFbmQoKTtcbiAgICB2YXIgbm9kZSA9IG5ldyBub2Rlcy5GaWx0ZXIobmFtZS5saW5lbm8sIG5hbWUuY29sbm8sIG5hbWUsIG5ldyBub2Rlcy5Ob2RlTGlzdChuYW1lLmxpbmVubywgbmFtZS5jb2xubywgW2JvZHldLmNvbmNhdChhcmdzKSkpO1xuICAgIHJldHVybiBuZXcgbm9kZXMuT3V0cHV0KG5hbWUubGluZW5vLCBuYW1lLmNvbG5vLCBbbm9kZV0pO1xuICB9O1xuXG4gIF9wcm90by5wYXJzZUFnZ3JlZ2F0ZSA9IGZ1bmN0aW9uIHBhcnNlQWdncmVnYXRlKCkge1xuICAgIHZhciB0b2sgPSB0aGlzLm5leHRUb2tlbigpO1xuICAgIHZhciBub2RlO1xuXG4gICAgc3dpdGNoICh0b2sudHlwZSkge1xuICAgICAgY2FzZSBsZXhlci5UT0tFTl9MRUZUX1BBUkVOOlxuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkdyb3VwKHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIGxleGVyLlRPS0VOX0xFRlRfQlJBQ0tFVDpcbiAgICAgICAgbm9kZSA9IG5ldyBub2Rlcy5BcnJheSh0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBsZXhlci5UT0tFTl9MRUZUX0NVUkxZOlxuICAgICAgICBub2RlID0gbmV3IG5vZGVzLkRpY3QodG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHdoaWxlICgxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgdmFyIHR5cGUgPSB0aGlzLnBlZWtUb2tlbigpLnR5cGU7XG5cbiAgICAgIGlmICh0eXBlID09PSBsZXhlci5UT0tFTl9SSUdIVF9QQVJFTiB8fCB0eXBlID09PSBsZXhlci5UT0tFTl9SSUdIVF9CUkFDS0VUIHx8IHR5cGUgPT09IGxleGVyLlRPS0VOX1JJR0hUX0NVUkxZKSB7XG4gICAgICAgIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICghdGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTU1BKSkge1xuICAgICAgICAgIHRoaXMuZmFpbCgncGFyc2VBZ2dyZWdhdGU6IGV4cGVjdGVkIGNvbW1hIGFmdGVyIGV4cHJlc3Npb24nLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuRGljdCkge1xuICAgICAgICAvLyBUT0RPOiBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgIHZhciBrZXkgPSB0aGlzLnBhcnNlUHJpbWFyeSgpOyAvLyBXZSBleHBlY3QgYSBrZXkvdmFsdWUgcGFpciBmb3IgZGljdHMsIHNlcGFyYXRlZCBieSBhXG4gICAgICAgIC8vIGNvbG9uXG5cbiAgICAgICAgaWYgKCF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09MT04pKSB7XG4gICAgICAgICAgdGhpcy5mYWlsKCdwYXJzZUFnZ3JlZ2F0ZTogZXhwZWN0ZWQgY29sb24gYWZ0ZXIgZGljdCBrZXknLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgICB9IC8vIFRPRE86IGNoZWNrIGZvciBlcnJvcnNcblxuXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG4gICAgICAgIG5vZGUuYWRkQ2hpbGQobmV3IG5vZGVzLlBhaXIoa2V5LmxpbmVubywga2V5LmNvbG5vLCBrZXksIHZhbHVlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUT0RPOiBjaGVjayBmb3IgZXJyb3JzXG4gICAgICAgIHZhciBleHByID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgICAgbm9kZS5hZGRDaGlsZChleHByKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZTtcbiAgfTtcblxuICBfcHJvdG8ucGFyc2VTaWduYXR1cmUgPSBmdW5jdGlvbiBwYXJzZVNpZ25hdHVyZSh0b2xlcmFudCwgbm9QYXJlbnMpIHtcbiAgICB2YXIgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgIGlmICghbm9QYXJlbnMgJiYgdG9rLnR5cGUgIT09IGxleGVyLlRPS0VOX0xFRlRfUEFSRU4pIHtcbiAgICAgIGlmICh0b2xlcmFudCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmFpbCgnZXhwZWN0ZWQgYXJndW1lbnRzJywgdG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX0xFRlRfUEFSRU4pIHtcbiAgICAgIHRvayA9IHRoaXMubmV4dFRva2VuKCk7XG4gICAgfVxuXG4gICAgdmFyIGFyZ3MgPSBuZXcgbm9kZXMuTm9kZUxpc3QodG9rLmxpbmVubywgdG9rLmNvbG5vKTtcbiAgICB2YXIga3dhcmdzID0gbmV3IG5vZGVzLktleXdvcmRBcmdzKHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgdmFyIGNoZWNrQ29tbWEgPSBmYWxzZTtcblxuICAgIHdoaWxlICgxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICAgICAgdG9rID0gdGhpcy5wZWVrVG9rZW4oKTtcblxuICAgICAgaWYgKCFub1BhcmVucyAmJiB0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fUklHSFRfUEFSRU4pIHtcbiAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9IGVsc2UgaWYgKG5vUGFyZW5zICYmIHRvay50eXBlID09PSBsZXhlci5UT0tFTl9CTE9DS19FTkQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmIChjaGVja0NvbW1hICYmICF0aGlzLnNraXAobGV4ZXIuVE9LRU5fQ09NTUEpKSB7XG4gICAgICAgIHRoaXMuZmFpbCgncGFyc2VTaWduYXR1cmU6IGV4cGVjdGVkIGNvbW1hIGFmdGVyIGV4cHJlc3Npb24nLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGFyZyA9IHRoaXMucGFyc2VFeHByZXNzaW9uKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2tpcFZhbHVlKGxleGVyLlRPS0VOX09QRVJBVE9SLCAnPScpKSB7XG4gICAgICAgICAga3dhcmdzLmFkZENoaWxkKG5ldyBub2Rlcy5QYWlyKGFyZy5saW5lbm8sIGFyZy5jb2xubywgYXJnLCB0aGlzLnBhcnNlRXhwcmVzc2lvbigpKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJncy5hZGRDaGlsZChhcmcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNoZWNrQ29tbWEgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChrd2FyZ3MuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICBhcmdzLmFkZENoaWxkKGt3YXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFyZ3M7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlVW50aWxCbG9ja3MgPSBmdW5jdGlvbiBwYXJzZVVudGlsQmxvY2tzKCkge1xuICAgIHZhciBwcmV2ID0gdGhpcy5icmVha09uQmxvY2tzO1xuXG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGJsb2NrTmFtZXMgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBibG9ja05hbWVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHRoaXMuYnJlYWtPbkJsb2NrcyA9IGJsb2NrTmFtZXM7XG4gICAgdmFyIHJldCA9IHRoaXMucGFyc2UoKTtcbiAgICB0aGlzLmJyZWFrT25CbG9ja3MgPSBwcmV2O1xuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlTm9kZXMgPSBmdW5jdGlvbiBwYXJzZU5vZGVzKCkge1xuICAgIHZhciB0b2s7XG4gICAgdmFyIGJ1ZiA9IFtdO1xuXG4gICAgd2hpbGUgKHRvayA9IHRoaXMubmV4dFRva2VuKCkpIHtcbiAgICAgIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fREFUQSkge1xuICAgICAgICB2YXIgZGF0YSA9IHRvay52YWx1ZTtcbiAgICAgICAgdmFyIG5leHRUb2tlbiA9IHRoaXMucGVla1Rva2VuKCk7XG4gICAgICAgIHZhciBuZXh0VmFsID0gbmV4dFRva2VuICYmIG5leHRUb2tlbi52YWx1ZTsgLy8gSWYgdGhlIGxhc3QgdG9rZW4gaGFzIFwiLVwiIHdlIG5lZWQgdG8gdHJpbSB0aGVcbiAgICAgICAgLy8gbGVhZGluZyB3aGl0ZXNwYWNlIG9mIHRoZSBkYXRhLiBUaGlzIGlzIG1hcmtlZCB3aXRoXG4gICAgICAgIC8vIHRoZSBgZHJvcExlYWRpbmdXaGl0ZXNwYWNlYCB2YXJpYWJsZS5cblxuICAgICAgICBpZiAodGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UpIHtcbiAgICAgICAgICAvLyBUT0RPOiB0aGlzIGNvdWxkIGJlIG9wdGltaXplZCAoZG9uJ3QgdXNlIHJlZ2V4KVxuICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL15cXHMqLywgJycpO1xuICAgICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gZmFsc2U7XG4gICAgICAgIH0gLy8gU2FtZSBmb3IgdGhlIHN1Y2NlZWRpbmcgYmxvY2sgc3RhcnQgdG9rZW5cblxuXG4gICAgICAgIGlmIChuZXh0VG9rZW4gJiYgKG5leHRUb2tlbi50eXBlID09PSBsZXhlci5UT0tFTl9CTE9DS19TVEFSVCAmJiBuZXh0VmFsLmNoYXJBdChuZXh0VmFsLmxlbmd0aCAtIDEpID09PSAnLScgfHwgbmV4dFRva2VuLnR5cGUgPT09IGxleGVyLlRPS0VOX1ZBUklBQkxFX1NUQVJUICYmIG5leHRWYWwuY2hhckF0KHRoaXMudG9rZW5zLnRhZ3MuVkFSSUFCTEVfU1RBUlQubGVuZ3RoKSA9PT0gJy0nIHx8IG5leHRUb2tlbi50eXBlID09PSBsZXhlci5UT0tFTl9DT01NRU5UICYmIG5leHRWYWwuY2hhckF0KHRoaXMudG9rZW5zLnRhZ3MuQ09NTUVOVF9TVEFSVC5sZW5ndGgpID09PSAnLScpKSB7XG4gICAgICAgICAgLy8gVE9ETzogdGhpcyBjb3VsZCBiZSBvcHRpbWl6ZWQgKGRvbid0IHVzZSByZWdleClcbiAgICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ1Zi5wdXNoKG5ldyBub2Rlcy5PdXRwdXQodG9rLmxpbmVubywgdG9rLmNvbG5vLCBbbmV3IG5vZGVzLlRlbXBsYXRlRGF0YSh0b2subGluZW5vLCB0b2suY29sbm8sIGRhdGEpXSkpO1xuICAgICAgfSBlbHNlIGlmICh0b2sudHlwZSA9PT0gbGV4ZXIuVE9LRU5fQkxPQ0tfU1RBUlQpIHtcbiAgICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdmFyIG4gPSB0aGlzLnBhcnNlU3RhdGVtZW50KCk7XG5cbiAgICAgICAgaWYgKCFuKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBidWYucHVzaChuKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rLnR5cGUgPT09IGxleGVyLlRPS0VOX1ZBUklBQkxFX1NUQVJUKSB7XG4gICAgICAgIHZhciBlID0gdGhpcy5wYXJzZUV4cHJlc3Npb24oKTtcbiAgICAgICAgdGhpcy5kcm9wTGVhZGluZ1doaXRlc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hZHZhbmNlQWZ0ZXJWYXJpYWJsZUVuZCgpO1xuICAgICAgICBidWYucHVzaChuZXcgbm9kZXMuT3V0cHV0KHRvay5saW5lbm8sIHRvay5jb2xubywgW2VdKSk7XG4gICAgICB9IGVsc2UgaWYgKHRvay50eXBlID09PSBsZXhlci5UT0tFTl9DT01NRU5UKSB7XG4gICAgICAgIHRoaXMuZHJvcExlYWRpbmdXaGl0ZXNwYWNlID0gdG9rLnZhbHVlLmNoYXJBdCh0b2sudmFsdWUubGVuZ3RoIC0gdGhpcy50b2tlbnMudGFncy5DT01NRU5UX0VORC5sZW5ndGggLSAxKSA9PT0gJy0nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWdub3JlIGNvbW1lbnRzLCBvdGhlcndpc2UgdGhpcyBzaG91bGQgYmUgYW4gZXJyb3JcbiAgICAgICAgdGhpcy5mYWlsKCdVbmV4cGVjdGVkIHRva2VuIGF0IHRvcC1sZXZlbDogJyArIHRvay50eXBlLCB0b2subGluZW5vLCB0b2suY29sbm8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoKSB7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5Ob2RlTGlzdCgwLCAwLCB0aGlzLnBhcnNlTm9kZXMoKSk7XG4gIH07XG5cbiAgX3Byb3RvLnBhcnNlQXNSb290ID0gZnVuY3Rpb24gcGFyc2VBc1Jvb3QoKSB7XG4gICAgcmV0dXJuIG5ldyBub2Rlcy5Sb290KDAsIDAsIHRoaXMucGFyc2VOb2RlcygpKTtcbiAgfTtcblxuICByZXR1cm4gUGFyc2VyO1xufShPYmopOyAvLyB2YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbi8vIHZhciBsID0gbGV4ZXIubGV4KCd7JS0gaWYgeCAtJX1cXG4gaGVsbG8geyUgZW5kaWYgJX0nKTtcbi8vIHZhciB0O1xuLy8gd2hpbGUoKHQgPSBsLm5leHRUb2tlbigpKSkge1xuLy8gICAgIGNvbnNvbGUubG9nKHV0aWwuaW5zcGVjdCh0KSk7XG4vLyB9XG4vLyB2YXIgcCA9IG5ldyBQYXJzZXIobGV4ZXIubGV4KCdoZWxsbyB7JSBmaWx0ZXIgdGl0bGUgJX0nICtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hlbGxvIG1hZGFtIGhvdyBhcmUgeW91JyArXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd7JSBlbmRmaWx0ZXIgJX0nKSk7XG4vLyB2YXIgbiA9IHAucGFyc2VBc1Jvb3QoKTtcbi8vIG5vZGVzLnByaW50Tm9kZXMobik7XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHBhcnNlOiBmdW5jdGlvbiBwYXJzZShzcmMsIGV4dGVuc2lvbnMsIG9wdHMpIHtcbiAgICB2YXIgcCA9IG5ldyBQYXJzZXIobGV4ZXIubGV4KHNyYywgb3B0cykpO1xuXG4gICAgaWYgKGV4dGVuc2lvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcC5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICB9XG5cbiAgICByZXR1cm4gcC5wYXJzZUFzUm9vdCgpO1xuICB9LFxuICBQYXJzZXI6IFBhcnNlclxufTtcblxuLyoqKi8gfSksXG4vKiA5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgd2hpdGVzcGFjZUNoYXJzID0gXCIgXFxuXFx0XFxyXFx4QTBcIjtcbnZhciBkZWxpbUNoYXJzID0gJygpW117fSUqLSt+LyMsOnwuPD49ISc7XG52YXIgaW50Q2hhcnMgPSAnMDEyMzQ1Njc4OSc7XG52YXIgQkxPQ0tfU1RBUlQgPSAneyUnO1xudmFyIEJMT0NLX0VORCA9ICclfSc7XG52YXIgVkFSSUFCTEVfU1RBUlQgPSAne3snO1xudmFyIFZBUklBQkxFX0VORCA9ICd9fSc7XG52YXIgQ09NTUVOVF9TVEFSVCA9ICd7Iyc7XG52YXIgQ09NTUVOVF9FTkQgPSAnI30nO1xudmFyIFRPS0VOX1NUUklORyA9ICdzdHJpbmcnO1xudmFyIFRPS0VOX1dISVRFU1BBQ0UgPSAnd2hpdGVzcGFjZSc7XG52YXIgVE9LRU5fREFUQSA9ICdkYXRhJztcbnZhciBUT0tFTl9CTE9DS19TVEFSVCA9ICdibG9jay1zdGFydCc7XG52YXIgVE9LRU5fQkxPQ0tfRU5EID0gJ2Jsb2NrLWVuZCc7XG52YXIgVE9LRU5fVkFSSUFCTEVfU1RBUlQgPSAndmFyaWFibGUtc3RhcnQnO1xudmFyIFRPS0VOX1ZBUklBQkxFX0VORCA9ICd2YXJpYWJsZS1lbmQnO1xudmFyIFRPS0VOX0NPTU1FTlQgPSAnY29tbWVudCc7XG52YXIgVE9LRU5fTEVGVF9QQVJFTiA9ICdsZWZ0LXBhcmVuJztcbnZhciBUT0tFTl9SSUdIVF9QQVJFTiA9ICdyaWdodC1wYXJlbic7XG52YXIgVE9LRU5fTEVGVF9CUkFDS0VUID0gJ2xlZnQtYnJhY2tldCc7XG52YXIgVE9LRU5fUklHSFRfQlJBQ0tFVCA9ICdyaWdodC1icmFja2V0JztcbnZhciBUT0tFTl9MRUZUX0NVUkxZID0gJ2xlZnQtY3VybHknO1xudmFyIFRPS0VOX1JJR0hUX0NVUkxZID0gJ3JpZ2h0LWN1cmx5JztcbnZhciBUT0tFTl9PUEVSQVRPUiA9ICdvcGVyYXRvcic7XG52YXIgVE9LRU5fQ09NTUEgPSAnY29tbWEnO1xudmFyIFRPS0VOX0NPTE9OID0gJ2NvbG9uJztcbnZhciBUT0tFTl9USUxERSA9ICd0aWxkZSc7XG52YXIgVE9LRU5fUElQRSA9ICdwaXBlJztcbnZhciBUT0tFTl9JTlQgPSAnaW50JztcbnZhciBUT0tFTl9GTE9BVCA9ICdmbG9hdCc7XG52YXIgVE9LRU5fQk9PTEVBTiA9ICdib29sZWFuJztcbnZhciBUT0tFTl9OT05FID0gJ25vbmUnO1xudmFyIFRPS0VOX1NZTUJPTCA9ICdzeW1ib2wnO1xudmFyIFRPS0VOX1NQRUNJQUwgPSAnc3BlY2lhbCc7XG52YXIgVE9LRU5fUkVHRVggPSAncmVnZXgnO1xuXG5mdW5jdGlvbiB0b2tlbih0eXBlLCB2YWx1ZSwgbGluZW5vLCBjb2xubykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGxpbmVubzogbGluZW5vLFxuICAgIGNvbG5vOiBjb2xub1xuICB9O1xufVxuXG52YXIgVG9rZW5pemVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVG9rZW5pemVyKHN0ciwgb3B0cykge1xuICAgIHRoaXMuc3RyID0gc3RyO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICAgIHRoaXMubGVuID0gc3RyLmxlbmd0aDtcbiAgICB0aGlzLmxpbmVubyA9IDA7XG4gICAgdGhpcy5jb2xubyA9IDA7XG4gICAgdGhpcy5pbl9jb2RlID0gZmFsc2U7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdmFyIHRhZ3MgPSBvcHRzLnRhZ3MgfHwge307XG4gICAgdGhpcy50YWdzID0ge1xuICAgICAgQkxPQ0tfU1RBUlQ6IHRhZ3MuYmxvY2tTdGFydCB8fCBCTE9DS19TVEFSVCxcbiAgICAgIEJMT0NLX0VORDogdGFncy5ibG9ja0VuZCB8fCBCTE9DS19FTkQsXG4gICAgICBWQVJJQUJMRV9TVEFSVDogdGFncy52YXJpYWJsZVN0YXJ0IHx8IFZBUklBQkxFX1NUQVJULFxuICAgICAgVkFSSUFCTEVfRU5EOiB0YWdzLnZhcmlhYmxlRW5kIHx8IFZBUklBQkxFX0VORCxcbiAgICAgIENPTU1FTlRfU1RBUlQ6IHRhZ3MuY29tbWVudFN0YXJ0IHx8IENPTU1FTlRfU1RBUlQsXG4gICAgICBDT01NRU5UX0VORDogdGFncy5jb21tZW50RW5kIHx8IENPTU1FTlRfRU5EXG4gICAgfTtcbiAgICB0aGlzLnRyaW1CbG9ja3MgPSAhIW9wdHMudHJpbUJsb2NrcztcbiAgICB0aGlzLmxzdHJpcEJsb2NrcyA9ICEhb3B0cy5sc3RyaXBCbG9ja3M7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gVG9rZW5pemVyLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubmV4dFRva2VuID0gZnVuY3Rpb24gbmV4dFRva2VuKCkge1xuICAgIHZhciBsaW5lbm8gPSB0aGlzLmxpbmVubztcbiAgICB2YXIgY29sbm8gPSB0aGlzLmNvbG5vO1xuICAgIHZhciB0b2s7XG5cbiAgICBpZiAodGhpcy5pbl9jb2RlKSB7XG4gICAgICAvLyBPdGhlcndpc2UsIGlmIHdlIGFyZSBpbiBhIGJsb2NrIHBhcnNlIGl0IGFzIGNvZGVcbiAgICAgIHZhciBjdXIgPSB0aGlzLmN1cnJlbnQoKTtcblxuICAgICAgaWYgKHRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgbm90aGluZyBlbHNlIHRvIHBhcnNlXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIGlmIChjdXIgPT09ICdcIicgfHwgY3VyID09PSAnXFwnJykge1xuICAgICAgICAvLyBXZSd2ZSBoaXQgYSBzdHJpbmdcbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1NUUklORywgdGhpcy5fcGFyc2VTdHJpbmcoY3VyKSwgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKHRvayA9IHRoaXMuX2V4dHJhY3Qod2hpdGVzcGFjZUNoYXJzKSkge1xuICAgICAgICAvLyBXZSBoaXQgc29tZSB3aGl0ZXNwYWNlXG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9XSElURVNQQUNFLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmICgodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZyh0aGlzLnRhZ3MuQkxPQ0tfRU5EKSkgfHwgKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcoJy0nICsgdGhpcy50YWdzLkJMT0NLX0VORCkpKSB7XG4gICAgICAgIC8vIFNwZWNpYWwgY2hlY2sgZm9yIHRoZSBibG9jayBlbmQgdGFnXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEl0IGlzIGEgcmVxdWlyZW1lbnQgdGhhdCBzdGFydCBhbmQgZW5kIHRhZ3MgYXJlIGNvbXBvc2VkIG9mXG4gICAgICAgIC8vIGRlbGltaXRlciBjaGFyYWN0ZXJzICgle31bXSBldGMpLCBhbmQgb3VyIGNvZGUgYWx3YXlzXG4gICAgICAgIC8vIGJyZWFrcyBvbiBkZWxpbWl0ZXJzIHNvIHdlIGNhbiBhc3N1bWUgdGhlIHRva2VuIHBhcnNpbmdcbiAgICAgICAgLy8gZG9lc24ndCBjb25zdW1lIHRoZXNlIGVsc2V3aGVyZVxuICAgICAgICB0aGlzLmluX2NvZGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAodGhpcy50cmltQmxvY2tzKSB7XG4gICAgICAgICAgY3VyID0gdGhpcy5jdXJyZW50KCk7XG5cbiAgICAgICAgICBpZiAoY3VyID09PSAnXFxuJykge1xuICAgICAgICAgICAgLy8gU2tpcCBuZXdsaW5lXG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1ciA9PT0gJ1xccicpIHtcbiAgICAgICAgICAgIC8vIFNraXAgQ1JMRiBuZXdsaW5lXG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICAgIGN1ciA9IHRoaXMuY3VycmVudCgpO1xuXG4gICAgICAgICAgICBpZiAoY3VyID09PSAnXFxuJykge1xuICAgICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdhcyBub3QgYSBDUkxGLCBzbyBnbyBiYWNrXG4gICAgICAgICAgICAgIHRoaXMuYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9CTE9DS19FTkQsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9IGVsc2UgaWYgKCh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5WQVJJQUJMRV9FTkQpKSB8fCAodG9rID0gdGhpcy5fZXh0cmFjdFN0cmluZygnLScgKyB0aGlzLnRhZ3MuVkFSSUFCTEVfRU5EKSkpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBjaGVjayBmb3IgdmFyaWFibGUgZW5kIHRhZyAoc2VlIGFib3ZlKVxuICAgICAgICB0aGlzLmluX2NvZGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1ZBUklBQkxFX0VORCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAoY3VyID09PSAncicgJiYgdGhpcy5zdHIuY2hhckF0KHRoaXMuaW5kZXggKyAxKSA9PT0gJy8nKSB7XG4gICAgICAgIC8vIFNraXAgcGFzdCAnci8nLlxuICAgICAgICB0aGlzLmZvcndhcmROKDIpOyAvLyBFeHRyYWN0IHVudGlsIHRoZSBlbmQgb2YgdGhlIHJlZ2V4IC0tIC8gZW5kcyBpdCwgXFwvIGRvZXMgbm90LlxuXG4gICAgICAgIHZhciByZWdleEJvZHkgPSAnJztcblxuICAgICAgICB3aGlsZSAoIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudCgpID09PSAnLycgJiYgdGhpcy5wcmV2aW91cygpICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlZ2V4Qm9keSArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBDaGVjayBmb3IgZmxhZ3MuXG4gICAgICAgIC8vIFRoZSBwb3NzaWJsZSBmbGFncyBhcmUgYWNjb3JkaW5nIHRvIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL1JlZ0V4cClcblxuXG4gICAgICAgIHZhciBQT1NTSUJMRV9GTEFHUyA9IFsnZycsICdpJywgJ20nLCAneSddO1xuICAgICAgICB2YXIgcmVnZXhGbGFncyA9ICcnO1xuXG4gICAgICAgIHdoaWxlICghdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgICB2YXIgaXNDdXJyZW50QUZsYWcgPSBQT1NTSUJMRV9GTEFHUy5pbmRleE9mKHRoaXMuY3VycmVudCgpKSAhPT0gLTE7XG5cbiAgICAgICAgICBpZiAoaXNDdXJyZW50QUZsYWcpIHtcbiAgICAgICAgICAgIHJlZ2V4RmxhZ3MgKz0gdGhpcy5jdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1JFR0VYLCB7XG4gICAgICAgICAgYm9keTogcmVnZXhCb2R5LFxuICAgICAgICAgIGZsYWdzOiByZWdleEZsYWdzXG4gICAgICAgIH0sIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIGlmIChkZWxpbUNoYXJzLmluZGV4T2YoY3VyKSAhPT0gLTEpIHtcbiAgICAgICAgLy8gV2UndmUgaGl0IGEgZGVsaW1pdGVyIChhIHNwZWNpYWwgY2hhciBsaWtlIGEgYnJhY2tldClcbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgIHZhciBjb21wbGV4T3BzID0gWyc9PScsICc9PT0nLCAnIT0nLCAnIT09JywgJzw9JywgJz49JywgJy8vJywgJyoqJ107XG4gICAgICAgIHZhciBjdXJDb21wbGV4ID0gY3VyICsgdGhpcy5jdXJyZW50KCk7XG4gICAgICAgIHZhciB0eXBlO1xuXG4gICAgICAgIGlmIChsaWIuaW5kZXhPZihjb21wbGV4T3BzLCBjdXJDb21wbGV4KSAhPT0gLTEpIHtcbiAgICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgICBjdXIgPSBjdXJDb21wbGV4OyAvLyBTZWUgaWYgdGhpcyBpcyBhIHN0cmljdCBlcXVhbGl0eS9pbmVxdWFsaXR5IGNvbXBhcmF0b3JcblxuICAgICAgICAgIGlmIChsaWIuaW5kZXhPZihjb21wbGV4T3BzLCBjdXJDb21wbGV4ICsgdGhpcy5jdXJyZW50KCkpICE9PSAtMSkge1xuICAgICAgICAgICAgY3VyID0gY3VyQ29tcGxleCArIHRoaXMuY3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoIChjdXIpIHtcbiAgICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9MRUZUX1BBUkVOO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9SSUdIVF9QQVJFTjtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnWyc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fTEVGVF9CUkFDS0VUO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICddJzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9SSUdIVF9CUkFDS0VUO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd7JzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9MRUZUX0NVUkxZO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd9JzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9SSUdIVF9DVVJMWTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fQ09NTUE7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJzonOlxuICAgICAgICAgICAgdHlwZSA9IFRPS0VOX0NPTE9OO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICd+JzpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9USUxERTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgY2FzZSAnfCc6XG4gICAgICAgICAgICB0eXBlID0gVE9LRU5fUElQRTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHR5cGUgPSBUT0tFTl9PUEVSQVRPUjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0b2tlbih0eXBlLCBjdXIsIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UgYXJlIG5vdCBhdCB3aGl0ZXNwYWNlIG9yIGEgZGVsaW1pdGVyLCBzbyBleHRyYWN0IHRoZVxuICAgICAgICAvLyB0ZXh0IGFuZCBwYXJzZSBpdFxuICAgICAgICB0b2sgPSB0aGlzLl9leHRyYWN0VW50aWwod2hpdGVzcGFjZUNoYXJzICsgZGVsaW1DaGFycyk7XG5cbiAgICAgICAgaWYgKHRvay5tYXRjaCgvXlstK10/WzAtOV0rJC8pKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY3VycmVudCgpID09PSAnLicpIHtcbiAgICAgICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuXG4gICAgICAgICAgICB2YXIgZGVjID0gdGhpcy5fZXh0cmFjdChpbnRDaGFycyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9GTE9BVCwgdG9rICsgJy4nICsgZGVjLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX0lOVCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodG9rLm1hdGNoKC9eKHRydWV8ZmFsc2UpJC8pKSB7XG4gICAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX0JPT0xFQU4sIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9rID09PSAnbm9uZScpIHtcbiAgICAgICAgICByZXR1cm4gdG9rZW4oVE9LRU5fTk9ORSwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIEFkZGVkIHRvIG1ha2UgdGhlIHRlc3QgYG51bGwgaXMgbnVsbGAgZXZhbHVhdGUgdHJ1dGhpbHkuXG4gICAgICAgICAgICogT3RoZXJ3aXNlLCBOdW5qdWNrcyB3aWxsIGxvb2sgdXAgbnVsbCBpbiB0aGUgY29udGV4dCBhbmRcbiAgICAgICAgICAgKiByZXR1cm4gYHVuZGVmaW5lZGAsIHdoaWNoIGlzIG5vdCB3aGF0IHdlIHdhbnQuIFRoaXMgKm1heSogaGF2ZVxuICAgICAgICAgICAqIGNvbnNlcXVlbmNlcyBpcyBzb21lb25lIGlzIHVzaW5nIG51bGwgaW4gdGhlaXIgdGVtcGxhdGVzIGFzIGFcbiAgICAgICAgICAgKiB2YXJpYWJsZS5cbiAgICAgICAgICAgKi9cbiAgICAgICAgfSBlbHNlIGlmICh0b2sgPT09ICdudWxsJykge1xuICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9OT05FLCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgICB9IGVsc2UgaWYgKHRvaykge1xuICAgICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9TWU1CT0wsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHZhbHVlIHdoaWxlIHBhcnNpbmc6ICcgKyB0b2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFBhcnNlIG91dCB0aGUgdGVtcGxhdGUgdGV4dCwgYnJlYWtpbmcgb24gdGFnXG4gICAgICAvLyBkZWxpbWl0ZXJzIGJlY2F1c2Ugd2UgbmVlZCB0byBsb29rIGZvciBibG9jay92YXJpYWJsZSBzdGFydFxuICAgICAgLy8gdGFncyAoZG9uJ3QgdXNlIHRoZSBmdWxsIGRlbGltQ2hhcnMgZm9yIG9wdGltaXphdGlvbilcbiAgICAgIHZhciBiZWdpbkNoYXJzID0gdGhpcy50YWdzLkJMT0NLX1NUQVJULmNoYXJBdCgwKSArIHRoaXMudGFncy5WQVJJQUJMRV9TVEFSVC5jaGFyQXQoMCkgKyB0aGlzLnRhZ3MuQ09NTUVOVF9TVEFSVC5jaGFyQXQoMCkgKyB0aGlzLnRhZ3MuQ09NTUVOVF9FTkQuY2hhckF0KDApO1xuXG4gICAgICBpZiAodGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2UgaWYgKCh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5CTE9DS19TVEFSVCArICctJykpIHx8ICh0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5CTE9DS19TVEFSVCkpKSB7XG4gICAgICAgIHRoaXMuaW5fY29kZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0b2tlbihUT0tFTl9CTE9DS19TVEFSVCwgdG9rLCBsaW5lbm8sIGNvbG5vKTtcbiAgICAgIH0gZWxzZSBpZiAoKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLlZBUklBQkxFX1NUQVJUICsgJy0nKSkgfHwgKHRvayA9IHRoaXMuX2V4dHJhY3RTdHJpbmcodGhpcy50YWdzLlZBUklBQkxFX1NUQVJUKSkpIHtcbiAgICAgICAgdGhpcy5pbl9jb2RlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRva2VuKFRPS0VOX1ZBUklBQkxFX1NUQVJULCB0b2ssIGxpbmVubywgY29sbm8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9rID0gJyc7XG4gICAgICAgIHZhciBkYXRhO1xuICAgICAgICB2YXIgaW5Db21tZW50ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hdGNoZXModGhpcy50YWdzLkNPTU1FTlRfU1RBUlQpKSB7XG4gICAgICAgICAgaW5Db21tZW50ID0gdHJ1ZTtcbiAgICAgICAgICB0b2sgPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5DT01NRU5UX1NUQVJUKTtcbiAgICAgICAgfSAvLyBDb250aW51YWxseSBjb25zdW1lIHRleHQsIGJyZWFraW5nIG9uIHRoZSB0YWcgZGVsaW1pdGVyXG4gICAgICAgIC8vIGNoYXJhY3RlcnMgYW5kIGNoZWNraW5nIHRvIHNlZSBpZiBpdCdzIGEgc3RhcnQgdGFnLlxuICAgICAgICAvL1xuICAgICAgICAvLyBXZSBjb3VsZCBoaXQgdGhlIGVuZCBvZiB0aGUgdGVtcGxhdGUgaW4gdGhlIG1pZGRsZSBvZlxuICAgICAgICAvLyBvdXIgbG9vcGluZywgc28gY2hlY2sgZm9yIHRoZSBudWxsIHJldHVybiB2YWx1ZSBmcm9tXG4gICAgICAgIC8vIF9leHRyYWN0VW50aWxcblxuXG4gICAgICAgIHdoaWxlICgoZGF0YSA9IHRoaXMuX2V4dHJhY3RVbnRpbChiZWdpbkNoYXJzKSkgIT09IG51bGwpIHtcbiAgICAgICAgICB0b2sgKz0gZGF0YTtcblxuICAgICAgICAgIGlmICgodGhpcy5fbWF0Y2hlcyh0aGlzLnRhZ3MuQkxPQ0tfU1RBUlQpIHx8IHRoaXMuX21hdGNoZXModGhpcy50YWdzLlZBUklBQkxFX1NUQVJUKSB8fCB0aGlzLl9tYXRjaGVzKHRoaXMudGFncy5DT01NRU5UX1NUQVJUKSkgJiYgIWluQ29tbWVudCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubHN0cmlwQmxvY2tzICYmIHRoaXMuX21hdGNoZXModGhpcy50YWdzLkJMT0NLX1NUQVJUKSAmJiB0aGlzLmNvbG5vID4gMCAmJiB0aGlzLmNvbG5vIDw9IHRvay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdmFyIGxhc3RMaW5lID0gdG9rLnNsaWNlKC10aGlzLmNvbG5vKTtcblxuICAgICAgICAgICAgICBpZiAoL15cXHMrJC8udGVzdChsYXN0TGluZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgYmxvY2sgbGVhZGluZyB3aGl0ZXNwYWNlIGZyb20gYmVnaW5uaW5nIG9mIHRoZSBzdHJpbmdcbiAgICAgICAgICAgICAgICB0b2sgPSB0b2suc2xpY2UoMCwgLXRoaXMuY29sbm8pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0b2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAvLyBBbGwgZGF0YSByZW1vdmVkLCBjb2xsYXBzZSB0byBhdm9pZCB1bm5lY2Vzc2FyeSBub2Rlc1xuICAgICAgICAgICAgICAgICAgLy8gYnkgcmV0dXJuaW5nIG5leHQgdG9rZW4gKGJsb2NrIHN0YXJ0KVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dFRva2VuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IC8vIElmIGl0IGlzIGEgc3RhcnQgdGFnLCBzdG9wIGxvb3BpbmdcblxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX21hdGNoZXModGhpcy50YWdzLkNPTU1FTlRfRU5EKSkge1xuICAgICAgICAgICAgaWYgKCFpbkNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkIGVuZCBvZiBjb21tZW50Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvayArPSB0aGlzLl9leHRyYWN0U3RyaW5nKHRoaXMudGFncy5DT01NRU5UX0VORCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXQgZG9lcyBub3QgbWF0Y2ggYW55IHRhZywgc28gYWRkIHRoZSBjaGFyYWN0ZXIgYW5kXG4gICAgICAgICAgICAvLyBjYXJyeSBvblxuICAgICAgICAgICAgdG9rICs9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGEgPT09IG51bGwgJiYgaW5Db21tZW50KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdleHBlY3RlZCBlbmQgb2YgY29tbWVudCwgZ290IGVuZCBvZiBmaWxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdG9rZW4oaW5Db21tZW50ID8gVE9LRU5fQ09NTUVOVCA6IFRPS0VOX0RBVEEsIHRvaywgbGluZW5vLCBjb2xubyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF9wcm90by5fcGFyc2VTdHJpbmcgPSBmdW5jdGlvbiBfcGFyc2VTdHJpbmcoZGVsaW1pdGVyKSB7XG4gICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgd2hpbGUgKCF0aGlzLmlzRmluaXNoZWQoKSAmJiB0aGlzLmN1cnJlbnQoKSAhPT0gZGVsaW1pdGVyKSB7XG4gICAgICB2YXIgY3VyID0gdGhpcy5jdXJyZW50KCk7XG5cbiAgICAgIGlmIChjdXIgPT09ICdcXFxcJykge1xuICAgICAgICB0aGlzLmZvcndhcmQoKTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMuY3VycmVudCgpKSB7XG4gICAgICAgICAgY2FzZSAnbic6XG4gICAgICAgICAgICBzdHIgKz0gJ1xcbic7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgc3RyICs9ICdcXHQnO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICAgIHN0ciArPSAnXFxyJztcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0ciArPSB0aGlzLmN1cnJlbnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZm9yd2FyZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyICs9IGN1cjtcbiAgICAgICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5mb3J3YXJkKCk7XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxuICBfcHJvdG8uX21hdGNoZXMgPSBmdW5jdGlvbiBfbWF0Y2hlcyhzdHIpIHtcbiAgICBpZiAodGhpcy5pbmRleCArIHN0ci5sZW5ndGggPiB0aGlzLmxlbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIG0gPSB0aGlzLnN0ci5zbGljZSh0aGlzLmluZGV4LCB0aGlzLmluZGV4ICsgc3RyLmxlbmd0aCk7XG4gICAgcmV0dXJuIG0gPT09IHN0cjtcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RTdHJpbmcgPSBmdW5jdGlvbiBfZXh0cmFjdFN0cmluZyhzdHIpIHtcbiAgICBpZiAodGhpcy5fbWF0Y2hlcyhzdHIpKSB7XG4gICAgICB0aGlzLmZvcndhcmROKHN0ci5sZW5ndGgpO1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3RVbnRpbCA9IGZ1bmN0aW9uIF9leHRyYWN0VW50aWwoY2hhclN0cmluZykge1xuICAgIC8vIEV4dHJhY3QgYWxsIG5vbi1tYXRjaGluZyBjaGFycywgd2l0aCB0aGUgZGVmYXVsdCBtYXRjaGluZyBzZXRcbiAgICAvLyB0byBldmVyeXRoaW5nXG4gICAgcmV0dXJuIHRoaXMuX2V4dHJhY3RNYXRjaGluZyh0cnVlLCBjaGFyU3RyaW5nIHx8ICcnKTtcbiAgfTtcblxuICBfcHJvdG8uX2V4dHJhY3QgPSBmdW5jdGlvbiBfZXh0cmFjdChjaGFyU3RyaW5nKSB7XG4gICAgLy8gRXh0cmFjdCBhbGwgbWF0Y2hpbmcgY2hhcnMgKG5vIGRlZmF1bHQsIHNvIGNoYXJTdHJpbmcgbXVzdCBiZVxuICAgIC8vIGV4cGxpY2l0KVxuICAgIHJldHVybiB0aGlzLl9leHRyYWN0TWF0Y2hpbmcoZmFsc2UsIGNoYXJTdHJpbmcpO1xuICB9O1xuXG4gIF9wcm90by5fZXh0cmFjdE1hdGNoaW5nID0gZnVuY3Rpb24gX2V4dHJhY3RNYXRjaGluZyhicmVha09uTWF0Y2gsIGNoYXJTdHJpbmcpIHtcbiAgICAvLyBQdWxsIG91dCBjaGFyYWN0ZXJzIHVudGlsIGEgYnJlYWtpbmcgY2hhciBpcyBoaXQuXG4gICAgLy8gSWYgYnJlYWtPbk1hdGNoIGlzIGZhbHNlLCBhIG5vbi1tYXRjaGluZyBjaGFyIHN0b3BzIGl0LlxuICAgIC8vIElmIGJyZWFrT25NYXRjaCBpcyB0cnVlLCBhIG1hdGNoaW5nIGNoYXIgc3RvcHMgaXQuXG4gICAgaWYgKHRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZmlyc3QgPSBjaGFyU3RyaW5nLmluZGV4T2YodGhpcy5jdXJyZW50KCkpOyAvLyBPbmx5IHByb2NlZWQgaWYgdGhlIGZpcnN0IGNoYXJhY3RlciBkb2Vzbid0IG1lZXQgb3VyIGNvbmRpdGlvblxuXG4gICAgaWYgKGJyZWFrT25NYXRjaCAmJiBmaXJzdCA9PT0gLTEgfHwgIWJyZWFrT25NYXRjaCAmJiBmaXJzdCAhPT0gLTEpIHtcbiAgICAgIHZhciB0ID0gdGhpcy5jdXJyZW50KCk7XG4gICAgICB0aGlzLmZvcndhcmQoKTsgLy8gQW5kIHB1bGwgb3V0IGFsbCB0aGUgY2hhcnMgb25lIGF0IGEgdGltZSB1bnRpbCB3ZSBoaXQgYVxuICAgICAgLy8gYnJlYWtpbmcgY2hhclxuXG4gICAgICB2YXIgaWR4ID0gY2hhclN0cmluZy5pbmRleE9mKHRoaXMuY3VycmVudCgpKTtcblxuICAgICAgd2hpbGUgKChicmVha09uTWF0Y2ggJiYgaWR4ID09PSAtMSB8fCAhYnJlYWtPbk1hdGNoICYmIGlkeCAhPT0gLTEpICYmICF0aGlzLmlzRmluaXNoZWQoKSkge1xuICAgICAgICB0ICs9IHRoaXMuY3VycmVudCgpO1xuICAgICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICAgICAgaWR4ID0gY2hhclN0cmluZy5pbmRleE9mKHRoaXMuY3VycmVudCgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIF9wcm90by5fZXh0cmFjdFJlZ2V4ID0gZnVuY3Rpb24gX2V4dHJhY3RSZWdleChyZWdleCkge1xuICAgIHZhciBtYXRjaGVzID0gdGhpcy5jdXJyZW50U3RyKCkubWF0Y2gocmVnZXgpO1xuXG4gICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IC8vIE1vdmUgZm9yd2FyZCB3aGF0ZXZlciB3YXMgbWF0Y2hlZFxuXG5cbiAgICB0aGlzLmZvcndhcmROKG1hdGNoZXNbMF0ubGVuZ3RoKTtcbiAgICByZXR1cm4gbWF0Y2hlcztcbiAgfTtcblxuICBfcHJvdG8uaXNGaW5pc2hlZCA9IGZ1bmN0aW9uIGlzRmluaXNoZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5kZXggPj0gdGhpcy5sZW47XG4gIH07XG5cbiAgX3Byb3RvLmZvcndhcmROID0gZnVuY3Rpb24gZm9yd2FyZE4obikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICB0aGlzLmZvcndhcmQoKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmZvcndhcmQgPSBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgIHRoaXMuaW5kZXgrKztcblxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkgPT09ICdcXG4nKSB7XG4gICAgICB0aGlzLmxpbmVubysrO1xuICAgICAgdGhpcy5jb2xubyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29sbm8rKztcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmJhY2tOID0gZnVuY3Rpb24gYmFja04obikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICB0aGlzLmJhY2soKTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvLmJhY2sgPSBmdW5jdGlvbiBiYWNrKCkge1xuICAgIHRoaXMuaW5kZXgtLTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnQoKSA9PT0gJ1xcbicpIHtcbiAgICAgIHRoaXMubGluZW5vLS07XG4gICAgICB2YXIgaWR4ID0gdGhpcy5zcmMubGFzdEluZGV4T2YoJ1xcbicsIHRoaXMuaW5kZXggLSAxKTtcblxuICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5jb2xubyA9IHRoaXMuaW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbG5vID0gdGhpcy5pbmRleCAtIGlkeDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb2xuby0tO1xuICAgIH1cbiAgfSAvLyBjdXJyZW50IHJldHVybnMgY3VycmVudCBjaGFyYWN0ZXJcbiAgO1xuXG4gIF9wcm90by5jdXJyZW50ID0gZnVuY3Rpb24gY3VycmVudCgpIHtcbiAgICBpZiAoIXRoaXMuaXNGaW5pc2hlZCgpKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdHIuY2hhckF0KHRoaXMuaW5kZXgpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfSAvLyBjdXJyZW50U3RyIHJldHVybnMgd2hhdCdzIGxlZnQgb2YgdGhlIHVucGFyc2VkIHN0cmluZ1xuICA7XG5cbiAgX3Byb3RvLmN1cnJlbnRTdHIgPSBmdW5jdGlvbiBjdXJyZW50U3RyKCkge1xuICAgIGlmICghdGhpcy5pc0ZpbmlzaGVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0ci5zdWJzdHIodGhpcy5pbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICcnO1xuICB9O1xuXG4gIF9wcm90by5wcmV2aW91cyA9IGZ1bmN0aW9uIHByZXZpb3VzKCkge1xuICAgIHJldHVybiB0aGlzLnN0ci5jaGFyQXQodGhpcy5pbmRleCAtIDEpO1xuICB9O1xuXG4gIHJldHVybiBUb2tlbml6ZXI7XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsZXg6IGZ1bmN0aW9uIGxleChzcmMsIG9wdHMpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcihzcmMsIG9wdHMpO1xuICB9LFxuICBUT0tFTl9TVFJJTkc6IFRPS0VOX1NUUklORyxcbiAgVE9LRU5fV0hJVEVTUEFDRTogVE9LRU5fV0hJVEVTUEFDRSxcbiAgVE9LRU5fREFUQTogVE9LRU5fREFUQSxcbiAgVE9LRU5fQkxPQ0tfU1RBUlQ6IFRPS0VOX0JMT0NLX1NUQVJULFxuICBUT0tFTl9CTE9DS19FTkQ6IFRPS0VOX0JMT0NLX0VORCxcbiAgVE9LRU5fVkFSSUFCTEVfU1RBUlQ6IFRPS0VOX1ZBUklBQkxFX1NUQVJULFxuICBUT0tFTl9WQVJJQUJMRV9FTkQ6IFRPS0VOX1ZBUklBQkxFX0VORCxcbiAgVE9LRU5fQ09NTUVOVDogVE9LRU5fQ09NTUVOVCxcbiAgVE9LRU5fTEVGVF9QQVJFTjogVE9LRU5fTEVGVF9QQVJFTixcbiAgVE9LRU5fUklHSFRfUEFSRU46IFRPS0VOX1JJR0hUX1BBUkVOLFxuICBUT0tFTl9MRUZUX0JSQUNLRVQ6IFRPS0VOX0xFRlRfQlJBQ0tFVCxcbiAgVE9LRU5fUklHSFRfQlJBQ0tFVDogVE9LRU5fUklHSFRfQlJBQ0tFVCxcbiAgVE9LRU5fTEVGVF9DVVJMWTogVE9LRU5fTEVGVF9DVVJMWSxcbiAgVE9LRU5fUklHSFRfQ1VSTFk6IFRPS0VOX1JJR0hUX0NVUkxZLFxuICBUT0tFTl9PUEVSQVRPUjogVE9LRU5fT1BFUkFUT1IsXG4gIFRPS0VOX0NPTU1BOiBUT0tFTl9DT01NQSxcbiAgVE9LRU5fQ09MT046IFRPS0VOX0NPTE9OLFxuICBUT0tFTl9USUxERTogVE9LRU5fVElMREUsXG4gIFRPS0VOX1BJUEU6IFRPS0VOX1BJUEUsXG4gIFRPS0VOX0lOVDogVE9LRU5fSU5ULFxuICBUT0tFTl9GTE9BVDogVE9LRU5fRkxPQVQsXG4gIFRPS0VOX0JPT0xFQU46IFRPS0VOX0JPT0xFQU4sXG4gIFRPS0VOX05PTkU6IFRPS0VOX05PTkUsXG4gIFRPS0VOX1NZTUJPTDogVE9LRU5fU1lNQk9MLFxuICBUT0tFTl9TUEVDSUFMOiBUT0tFTl9TUEVDSUFMLFxuICBUT0tFTl9SRUdFWDogVE9LRU5fUkVHRVhcbn07XG5cbi8qKiovIH0pLFxuLyogMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gX2luaGVyaXRzTG9vc2Uoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7IHN1YkNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1YkNsYXNzOyBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBMb2FkZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE5KSxcbiAgICBQcmVjb21waWxlZExvYWRlciA9IF9yZXF1aXJlLlByZWNvbXBpbGVkTG9hZGVyO1xuXG52YXIgV2ViTG9hZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTG9hZGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKFdlYkxvYWRlciwgX0xvYWRlcik7XG5cbiAgZnVuY3Rpb24gV2ViTG9hZGVyKGJhc2VVUkwsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXM7XG5cbiAgICBfdGhpcyA9IF9Mb2FkZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgIF90aGlzLmJhc2VVUkwgPSBiYXNlVVJMIHx8ICcuJztcbiAgICBvcHRzID0gb3B0cyB8fCB7fTsgLy8gQnkgZGVmYXVsdCwgdGhlIGNhY2hlIGlzIHR1cm5lZCBvZmYgYmVjYXVzZSB0aGVyZSdzIG5vIHdheVxuICAgIC8vIHRvIFwid2F0Y2hcIiB0ZW1wbGF0ZXMgb3ZlciBIVFRQLCBzbyB0aGV5IGFyZSByZS1kb3dubG9hZGVkXG4gICAgLy8gYW5kIGNvbXBpbGVkIGVhY2ggdGltZS4gKFJlbWVtYmVyLCBQUkVDT01QSUxFIFlPVVJcbiAgICAvLyBURU1QTEFURVMgaW4gcHJvZHVjdGlvbiEpXG5cbiAgICBfdGhpcy51c2VDYWNoZSA9ICEhb3B0cy51c2VDYWNoZTsgLy8gV2UgZGVmYXVsdCBgYXN5bmNgIHRvIGZhbHNlIHNvIHRoYXQgdGhlIHNpbXBsZSBzeW5jaHJvbm91c1xuICAgIC8vIEFQSSBjYW4gYmUgdXNlZCB3aGVuIHlvdSBhcmVuJ3QgZG9pbmcgYW55dGhpbmcgYXN5bmMgaW5cbiAgICAvLyB5b3VyIHRlbXBsYXRlcyAod2hpY2ggaXMgbW9zdCBvZiB0aGUgdGltZSkuIFRoaXMgcGVyZm9ybXMgYVxuICAgIC8vIHN5bmMgYWpheCByZXF1ZXN0LCBidXQgdGhhdCdzIG9rIGJlY2F1c2UgaXQgc2hvdWxkICpvbmx5KlxuICAgIC8vIGhhcHBlbiBpbiBkZXZlbG9wbWVudC4gUFJFQ09NUElMRSBZT1VSIFRFTVBMQVRFUy5cblxuICAgIF90aGlzLmFzeW5jID0gISFvcHRzLmFzeW5jO1xuICAgIHJldHVybiBfdGhpcztcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBXZWJMb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZShmcm9tLCB0bykge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVsYXRpdmUgdGVtcGxhdGVzIG5vdCBzdXBwb3J0IGluIHRoZSBicm93c2VyIHlldCcpO1xuICB9O1xuXG4gIF9wcm90by5nZXRTb3VyY2UgPSBmdW5jdGlvbiBnZXRTb3VyY2UobmFtZSwgY2IpIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciB1c2VDYWNoZSA9IHRoaXMudXNlQ2FjaGU7XG4gICAgdmFyIHJlc3VsdDtcbiAgICB0aGlzLmZldGNoKHRoaXMuYmFzZVVSTCArICcvJyArIG5hbWUsIGZ1bmN0aW9uIChlcnIsIHNyYykge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBpZiAoY2IpIHtcbiAgICAgICAgICBjYihlcnIuY29udGVudCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXJyLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlcnIuY29udGVudDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgIHBhdGg6IG5hbWUsXG4gICAgICAgICAgbm9DYWNoZTogIXVzZUNhY2hlXG4gICAgICAgIH07XG5cbiAgICAgICAgX3RoaXMyLmVtaXQoJ2xvYWQnLCBuYW1lLCByZXN1bHQpO1xuXG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKG51bGwsIHJlc3VsdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTsgLy8gaWYgdGhpcyBXZWJMb2FkZXIgaXNuJ3QgcnVubmluZyBhc3luY2hyb25vdXNseSwgdGhlXG4gICAgLy8gZmV0Y2ggYWJvdmUgd291bGQgYWN0dWFsbHkgcnVuIHN5bmMgYW5kIHdlJ2xsIGhhdmUgYVxuICAgIC8vIHJlc3VsdCBoZXJlXG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIF9wcm90by5mZXRjaCA9IGZ1bmN0aW9uIGZldGNoKHVybCwgY2IpIHtcbiAgICAvLyBPbmx5IGluIHRoZSBicm93c2VyIHBsZWFzZVxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJMb2FkZXIgY2FuIG9ubHkgYnkgdXNlZCBpbiBhIGJyb3dzZXInKTtcbiAgICB9XG5cbiAgICB2YXIgYWpheCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkaW5nID0gdHJ1ZTtcblxuICAgIGFqYXgub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKGFqYXgucmVhZHlTdGF0ZSA9PT0gNCAmJiBsb2FkaW5nKSB7XG4gICAgICAgIGxvYWRpbmcgPSBmYWxzZTtcblxuICAgICAgICBpZiAoYWpheC5zdGF0dXMgPT09IDAgfHwgYWpheC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgIGNiKG51bGwsIGFqYXgucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYih7XG4gICAgICAgICAgICBzdGF0dXM6IGFqYXguc3RhdHVzLFxuICAgICAgICAgICAgY29udGVudDogYWpheC5yZXNwb25zZVRleHRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdzPScgKyBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBhamF4Lm9wZW4oJ0dFVCcsIHVybCwgdGhpcy5hc3luYyk7XG4gICAgYWpheC5zZW5kKCk7XG4gIH07XG5cbiAgcmV0dXJuIFdlYkxvYWRlcjtcbn0oTG9hZGVyKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFdlYkxvYWRlcjogV2ViTG9hZGVyLFxuICBQcmVjb21waWxlZExvYWRlcjogUHJlY29tcGlsZWRMb2FkZXJcbn07XG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGxpYiA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cbnZhciBfcmVxdWlyZSA9IF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gICAgRW52aXJvbm1lbnQgPSBfcmVxdWlyZS5FbnZpcm9ubWVudCxcbiAgICBUZW1wbGF0ZSA9IF9yZXF1aXJlLlRlbXBsYXRlO1xuXG52YXIgTG9hZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxudmFyIGxvYWRlcnMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblxudmFyIHByZWNvbXBpbGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIzKTtcblxudmFyIGNvbXBpbGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxudmFyIHBhcnNlciA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG5cbnZhciBsZXhlciA9IF9fd2VicGFja19yZXF1aXJlX18oOSk7XG5cbnZhciBydW50aW1lID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKTtcblxudmFyIG5vZGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXygzKTtcblxudmFyIGluc3RhbGxKaW5qYUNvbXBhdCA9IF9fd2VicGFja19yZXF1aXJlX18oMjUpOyAvLyBBIHNpbmdsZSBpbnN0YW5jZSBvZiBhbiBlbnZpcm9ubWVudCwgc2luY2UgdGhpcyBpcyBzbyBjb21tb25seSB1c2VkXG5cblxudmFyIGU7XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZSh0ZW1wbGF0ZXNQYXRoLCBvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIGlmIChsaWIuaXNPYmplY3QodGVtcGxhdGVzUGF0aCkpIHtcbiAgICBvcHRzID0gdGVtcGxhdGVzUGF0aDtcbiAgICB0ZW1wbGF0ZXNQYXRoID0gbnVsbDtcbiAgfVxuXG4gIHZhciBUZW1wbGF0ZUxvYWRlcjtcblxuICBpZiAobG9hZGVycy5GaWxlU3lzdGVtTG9hZGVyKSB7XG4gICAgVGVtcGxhdGVMb2FkZXIgPSBuZXcgbG9hZGVycy5GaWxlU3lzdGVtTG9hZGVyKHRlbXBsYXRlc1BhdGgsIHtcbiAgICAgIHdhdGNoOiBvcHRzLndhdGNoLFxuICAgICAgbm9DYWNoZTogb3B0cy5ub0NhY2hlXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobG9hZGVycy5XZWJMb2FkZXIpIHtcbiAgICBUZW1wbGF0ZUxvYWRlciA9IG5ldyBsb2FkZXJzLldlYkxvYWRlcih0ZW1wbGF0ZXNQYXRoLCB7XG4gICAgICB1c2VDYWNoZTogb3B0cy53ZWIgJiYgb3B0cy53ZWIudXNlQ2FjaGUsXG4gICAgICBhc3luYzogb3B0cy53ZWIgJiYgb3B0cy53ZWIuYXN5bmNcbiAgICB9KTtcbiAgfVxuXG4gIGUgPSBuZXcgRW52aXJvbm1lbnQoVGVtcGxhdGVMb2FkZXIsIG9wdHMpO1xuXG4gIGlmIChvcHRzICYmIG9wdHMuZXhwcmVzcykge1xuICAgIGUuZXhwcmVzcyhvcHRzLmV4cHJlc3MpO1xuICB9XG5cbiAgcmV0dXJuIGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFbnZpcm9ubWVudDogRW52aXJvbm1lbnQsXG4gIFRlbXBsYXRlOiBUZW1wbGF0ZSxcbiAgTG9hZGVyOiBMb2FkZXIsXG4gIEZpbGVTeXN0ZW1Mb2FkZXI6IGxvYWRlcnMuRmlsZVN5c3RlbUxvYWRlcixcbiAgTm9kZVJlc29sdmVMb2FkZXI6IGxvYWRlcnMuTm9kZVJlc29sdmVMb2FkZXIsXG4gIFByZWNvbXBpbGVkTG9hZGVyOiBsb2FkZXJzLlByZWNvbXBpbGVkTG9hZGVyLFxuICBXZWJMb2FkZXI6IGxvYWRlcnMuV2ViTG9hZGVyLFxuICBjb21waWxlcjogY29tcGlsZXIsXG4gIHBhcnNlcjogcGFyc2VyLFxuICBsZXhlcjogbGV4ZXIsXG4gIHJ1bnRpbWU6IHJ1bnRpbWUsXG4gIGxpYjogbGliLFxuICBub2Rlczogbm9kZXMsXG4gIGluc3RhbGxKaW5qYUNvbXBhdDogaW5zdGFsbEppbmphQ29tcGF0LFxuICBjb25maWd1cmU6IGNvbmZpZ3VyZSxcbiAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGUgPSB1bmRlZmluZWQ7XG4gIH0sXG4gIGNvbXBpbGU6IGZ1bmN0aW9uIGNvbXBpbGUoc3JjLCBlbnYsIHBhdGgsIGVhZ2VyQ29tcGlsZSkge1xuICAgIGlmICghZSkge1xuICAgICAgY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBUZW1wbGF0ZShzcmMsIGVudiwgcGF0aCwgZWFnZXJDb21waWxlKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIobmFtZSwgY3R4LCBjYikge1xuICAgIGlmICghZSkge1xuICAgICAgY29uZmlndXJlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGUucmVuZGVyKG5hbWUsIGN0eCwgY2IpO1xuICB9LFxuICByZW5kZXJTdHJpbmc6IGZ1bmN0aW9uIHJlbmRlclN0cmluZyhzcmMsIGN0eCwgY2IpIHtcbiAgICBpZiAoIWUpIHtcbiAgICAgIGNvbmZpZ3VyZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBlLnJlbmRlclN0cmluZyhzcmMsIGN0eCwgY2IpO1xuICB9LFxuICBwcmVjb21waWxlOiBwcmVjb21waWxlID8gcHJlY29tcGlsZS5wcmVjb21waWxlIDogdW5kZWZpbmVkLFxuICBwcmVjb21waWxlU3RyaW5nOiBwcmVjb21waWxlID8gcHJlY29tcGlsZS5wcmVjb21waWxlU3RyaW5nIDogdW5kZWZpbmVkXG59O1xuXG4vKioqLyB9KSxcbi8qIDEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbi8vIHJhd0FzYXAgcHJvdmlkZXMgZXZlcnl0aGluZyB3ZSBuZWVkIGV4Y2VwdCBleGNlcHRpb24gbWFuYWdlbWVudC5cbnZhciByYXdBc2FwID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG4vLyBSYXdUYXNrcyBhcmUgcmVjeWNsZWQgdG8gcmVkdWNlIEdDIGNodXJuLlxudmFyIGZyZWVUYXNrcyA9IFtdO1xuLy8gV2UgcXVldWUgZXJyb3JzIHRvIGVuc3VyZSB0aGV5IGFyZSB0aHJvd24gaW4gcmlnaHQgb3JkZXIgKEZJRk8pLlxuLy8gQXJyYXktYXMtcXVldWUgaXMgZ29vZCBlbm91Z2ggaGVyZSwgc2luY2Ugd2UgYXJlIGp1c3QgZGVhbGluZyB3aXRoIGV4Y2VwdGlvbnMuXG52YXIgcGVuZGluZ0Vycm9ycyA9IFtdO1xudmFyIHJlcXVlc3RFcnJvclRocm93ID0gcmF3QXNhcC5tYWtlUmVxdWVzdENhbGxGcm9tVGltZXIodGhyb3dGaXJzdEVycm9yKTtcblxuZnVuY3Rpb24gdGhyb3dGaXJzdEVycm9yKCkge1xuICAgIGlmIChwZW5kaW5nRXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBwZW5kaW5nRXJyb3JzLnNoaWZ0KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIENhbGxzIGEgdGFzayBhcyBzb29uIGFzIHBvc3NpYmxlIGFmdGVyIHJldHVybmluZywgaW4gaXRzIG93biBldmVudCwgd2l0aCBwcmlvcml0eVxuICogb3ZlciBvdGhlciBldmVudHMgbGlrZSBhbmltYXRpb24sIHJlZmxvdywgYW5kIHJlcGFpbnQuIEFuIGVycm9yIHRocm93biBmcm9tIGFuXG4gKiBldmVudCB3aWxsIG5vdCBpbnRlcnJ1cHQsIG5vciBldmVuIHN1YnN0YW50aWFsbHkgc2xvdyBkb3duIHRoZSBwcm9jZXNzaW5nIG9mXG4gKiBvdGhlciBldmVudHMsIGJ1dCB3aWxsIGJlIHJhdGhlciBwb3N0cG9uZWQgdG8gYSBsb3dlciBwcmlvcml0eSBldmVudC5cbiAqIEBwYXJhbSB7e2NhbGx9fSB0YXNrIEEgY2FsbGFibGUgb2JqZWN0LCB0eXBpY2FsbHkgYSBmdW5jdGlvbiB0aGF0IHRha2VzIG5vXG4gKiBhcmd1bWVudHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXNhcDtcbmZ1bmN0aW9uIGFzYXAodGFzaykge1xuICAgIHZhciByYXdUYXNrO1xuICAgIGlmIChmcmVlVGFza3MubGVuZ3RoKSB7XG4gICAgICAgIHJhd1Rhc2sgPSBmcmVlVGFza3MucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmF3VGFzayA9IG5ldyBSYXdUYXNrKCk7XG4gICAgfVxuICAgIHJhd1Rhc2sudGFzayA9IHRhc2s7XG4gICAgcmF3QXNhcChyYXdUYXNrKTtcbn1cblxuLy8gV2Ugd3JhcCB0YXNrcyB3aXRoIHJlY3ljbGFibGUgdGFzayBvYmplY3RzLiAgQSB0YXNrIG9iamVjdCBpbXBsZW1lbnRzXG4vLyBgY2FsbGAsIGp1c3QgbGlrZSBhIGZ1bmN0aW9uLlxuZnVuY3Rpb24gUmF3VGFzaygpIHtcbiAgICB0aGlzLnRhc2sgPSBudWxsO1xufVxuXG4vLyBUaGUgc29sZSBwdXJwb3NlIG9mIHdyYXBwaW5nIHRoZSB0YXNrIGlzIHRvIGNhdGNoIHRoZSBleGNlcHRpb24gYW5kIHJlY3ljbGVcbi8vIHRoZSB0YXNrIG9iamVjdCBhZnRlciBpdHMgc2luZ2xlIHVzZS5cblJhd1Rhc2sucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgdGhpcy50YXNrLmNhbGwoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoYXNhcC5vbmVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGlzIGhvb2sgZXhpc3RzIHB1cmVseSBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAgICAgICAgICAgIC8vIEl0cyBuYW1lIHdpbGwgYmUgcGVyaW9kaWNhbGx5IHJhbmRvbWl6ZWQgdG8gYnJlYWsgYW55IGNvZGUgdGhhdFxuICAgICAgICAgICAgLy8gZGVwZW5kcyBvbiBpdHMgZXhpc3RlbmNlLlxuICAgICAgICAgICAgYXNhcC5vbmVycm9yKGVycm9yKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEluIGEgd2ViIGJyb3dzZXIsIGV4Y2VwdGlvbnMgYXJlIG5vdCBmYXRhbC4gSG93ZXZlciwgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNsb3dpbmcgZG93biB0aGUgcXVldWUgb2YgcGVuZGluZyB0YXNrcywgd2UgcmV0aHJvdyB0aGUgZXJyb3IgaW4gYVxuICAgICAgICAgICAgLy8gbG93ZXIgcHJpb3JpdHkgdHVybi5cbiAgICAgICAgICAgIHBlbmRpbmdFcnJvcnMucHVzaChlcnJvcik7XG4gICAgICAgICAgICByZXF1ZXN0RXJyb3JUaHJvdygpO1xuICAgICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy50YXNrID0gbnVsbDtcbiAgICAgICAgZnJlZVRhc2tzW2ZyZWVUYXNrcy5sZW5ndGhdID0gdGhpcztcbiAgICB9XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG4vKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24oZ2xvYmFsKSB7XG5cbi8vIFVzZSB0aGUgZmFzdGVzdCBtZWFucyBwb3NzaWJsZSB0byBleGVjdXRlIGEgdGFzayBpbiBpdHMgb3duIHR1cm4sIHdpdGhcbi8vIHByaW9yaXR5IG92ZXIgb3RoZXIgZXZlbnRzIGluY2x1ZGluZyBJTywgYW5pbWF0aW9uLCByZWZsb3csIGFuZCByZWRyYXdcbi8vIGV2ZW50cyBpbiBicm93c2Vycy5cbi8vXG4vLyBBbiBleGNlcHRpb24gdGhyb3duIGJ5IGEgdGFzayB3aWxsIHBlcm1hbmVudGx5IGludGVycnVwdCB0aGUgcHJvY2Vzc2luZyBvZlxuLy8gc3Vic2VxdWVudCB0YXNrcy4gVGhlIGhpZ2hlciBsZXZlbCBgYXNhcGAgZnVuY3Rpb24gZW5zdXJlcyB0aGF0IGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duIGJ5IGEgdGFzaywgdGhhdCB0aGUgdGFzayBxdWV1ZSB3aWxsIGNvbnRpbnVlIGZsdXNoaW5nIGFzXG4vLyBzb29uIGFzIHBvc3NpYmxlLCBidXQgaWYgeW91IHVzZSBgcmF3QXNhcGAgZGlyZWN0bHksIHlvdSBhcmUgcmVzcG9uc2libGUgdG9cbi8vIGVpdGhlciBlbnN1cmUgdGhhdCBubyBleGNlcHRpb25zIGFyZSB0aHJvd24gZnJvbSB5b3VyIHRhc2ssIG9yIHRvIG1hbnVhbGx5XG4vLyBjYWxsIGByYXdBc2FwLnJlcXVlc3RGbHVzaGAgaWYgYW4gZXhjZXB0aW9uIGlzIHRocm93bi5cbm1vZHVsZS5leHBvcnRzID0gcmF3QXNhcDtcbmZ1bmN0aW9uIHJhd0FzYXAodGFzaykge1xuICAgIGlmICghcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHJlcXVlc3RGbHVzaCgpO1xuICAgICAgICBmbHVzaGluZyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEVxdWl2YWxlbnQgdG8gcHVzaCwgYnV0IGF2b2lkcyBhIGZ1bmN0aW9uIGNhbGwuXG4gICAgcXVldWVbcXVldWUubGVuZ3RoXSA9IHRhc2s7XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xuLy8gT25jZSBhIGZsdXNoIGhhcyBiZWVuIHJlcXVlc3RlZCwgbm8gZnVydGhlciBjYWxscyB0byBgcmVxdWVzdEZsdXNoYCBhcmVcbi8vIG5lY2Vzc2FyeSB1bnRpbCB0aGUgbmV4dCBgZmx1c2hgIGNvbXBsZXRlcy5cbnZhciBmbHVzaGluZyA9IGZhbHNlO1xuLy8gYHJlcXVlc3RGbHVzaGAgaXMgYW4gaW1wbGVtZW50YXRpb24tc3BlY2lmaWMgbWV0aG9kIHRoYXQgYXR0ZW1wdHMgdG8ga2lja1xuLy8gb2ZmIGEgYGZsdXNoYCBldmVudCBhcyBxdWlja2x5IGFzIHBvc3NpYmxlLiBgZmx1c2hgIHdpbGwgYXR0ZW1wdCB0byBleGhhdXN0XG4vLyB0aGUgZXZlbnQgcXVldWUgYmVmb3JlIHlpZWxkaW5nIHRvIHRoZSBicm93c2VyJ3Mgb3duIGV2ZW50IGxvb3AuXG52YXIgcmVxdWVzdEZsdXNoO1xuLy8gVGhlIHBvc2l0aW9uIG9mIHRoZSBuZXh0IHRhc2sgdG8gZXhlY3V0ZSBpbiB0aGUgdGFzayBxdWV1ZS4gVGhpcyBpc1xuLy8gcHJlc2VydmVkIGJldHdlZW4gY2FsbHMgdG8gYGZsdXNoYCBzbyB0aGF0IGl0IGNhbiBiZSByZXN1bWVkIGlmXG4vLyBhIHRhc2sgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbnZhciBpbmRleCA9IDA7XG4vLyBJZiBhIHRhc2sgc2NoZWR1bGVzIGFkZGl0aW9uYWwgdGFza3MgcmVjdXJzaXZlbHksIHRoZSB0YXNrIHF1ZXVlIGNhbiBncm93XG4vLyB1bmJvdW5kZWQuIFRvIHByZXZlbnQgbWVtb3J5IGV4aGF1c3Rpb24sIHRoZSB0YXNrIHF1ZXVlIHdpbGwgcGVyaW9kaWNhbGx5XG4vLyB0cnVuY2F0ZSBhbHJlYWR5LWNvbXBsZXRlZCB0YXNrcy5cbnZhciBjYXBhY2l0eSA9IDEwMjQ7XG5cbi8vIFRoZSBmbHVzaCBmdW5jdGlvbiBwcm9jZXNzZXMgYWxsIHRhc2tzIHRoYXQgaGF2ZSBiZWVuIHNjaGVkdWxlZCB3aXRoXG4vLyBgcmF3QXNhcGAgdW5sZXNzIGFuZCB1bnRpbCBvbmUgb2YgdGhvc2UgdGFza3MgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cbi8vIElmIGEgdGFzayB0aHJvd3MgYW4gZXhjZXB0aW9uLCBgZmx1c2hgIGVuc3VyZXMgdGhhdCBpdHMgc3RhdGUgd2lsbCByZW1haW5cbi8vIGNvbnNpc3RlbnQgYW5kIHdpbGwgcmVzdW1lIHdoZXJlIGl0IGxlZnQgb2ZmIHdoZW4gY2FsbGVkIGFnYWluLlxuLy8gSG93ZXZlciwgYGZsdXNoYCBkb2VzIG5vdCBtYWtlIGFueSBhcnJhbmdlbWVudHMgdG8gYmUgY2FsbGVkIGFnYWluIGlmIGFuXG4vLyBleGNlcHRpb24gaXMgdGhyb3duLlxuZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgd2hpbGUgKGluZGV4IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBpbmRleDtcbiAgICAgICAgLy8gQWR2YW5jZSB0aGUgaW5kZXggYmVmb3JlIGNhbGxpbmcgdGhlIHRhc2suIFRoaXMgZW5zdXJlcyB0aGF0IHdlIHdpbGxcbiAgICAgICAgLy8gYmVnaW4gZmx1c2hpbmcgb24gdGhlIG5leHQgdGFzayB0aGUgdGFzayB0aHJvd3MgYW4gZXJyb3IuXG4gICAgICAgIGluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICBxdWV1ZVtjdXJyZW50SW5kZXhdLmNhbGwoKTtcbiAgICAgICAgLy8gUHJldmVudCBsZWFraW5nIG1lbW9yeSBmb3IgbG9uZyBjaGFpbnMgb2YgcmVjdXJzaXZlIGNhbGxzIHRvIGBhc2FwYC5cbiAgICAgICAgLy8gSWYgd2UgY2FsbCBgYXNhcGAgd2l0aGluIHRhc2tzIHNjaGVkdWxlZCBieSBgYXNhcGAsIHRoZSBxdWV1ZSB3aWxsXG4gICAgICAgIC8vIGdyb3csIGJ1dCB0byBhdm9pZCBhbiBPKG4pIHdhbGsgZm9yIGV2ZXJ5IHRhc2sgd2UgZXhlY3V0ZSwgd2UgZG9uJ3RcbiAgICAgICAgLy8gc2hpZnQgdGFza3Mgb2ZmIHRoZSBxdWV1ZSBhZnRlciB0aGV5IGhhdmUgYmVlbiBleGVjdXRlZC5cbiAgICAgICAgLy8gSW5zdGVhZCwgd2UgcGVyaW9kaWNhbGx5IHNoaWZ0IDEwMjQgdGFza3Mgb2ZmIHRoZSBxdWV1ZS5cbiAgICAgICAgaWYgKGluZGV4ID4gY2FwYWNpdHkpIHtcbiAgICAgICAgICAgIC8vIE1hbnVhbGx5IHNoaWZ0IGFsbCB2YWx1ZXMgc3RhcnRpbmcgYXQgdGhlIGluZGV4IGJhY2sgdG8gdGhlXG4gICAgICAgICAgICAvLyBiZWdpbm5pbmcgb2YgdGhlIHF1ZXVlLlxuICAgICAgICAgICAgZm9yICh2YXIgc2NhbiA9IDAsIG5ld0xlbmd0aCA9IHF1ZXVlLmxlbmd0aCAtIGluZGV4OyBzY2FuIDwgbmV3TGVuZ3RoOyBzY2FuKyspIHtcbiAgICAgICAgICAgICAgICBxdWV1ZVtzY2FuXSA9IHF1ZXVlW3NjYW4gKyBpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWV1ZS5sZW5ndGggLT0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUubGVuZ3RoID0gMDtcbiAgICBpbmRleCA9IDA7XG4gICAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gYHJlcXVlc3RGbHVzaGAgaXMgaW1wbGVtZW50ZWQgdXNpbmcgYSBzdHJhdGVneSBiYXNlZCBvbiBkYXRhIGNvbGxlY3RlZCBmcm9tXG4vLyBldmVyeSBhdmFpbGFibGUgU2F1Y2VMYWJzIFNlbGVuaXVtIHdlYiBkcml2ZXIgd29ya2VyIGF0IHRpbWUgb2Ygd3JpdGluZy5cbi8vIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL3NwcmVhZHNoZWV0cy9kLzFtRy01VVlHdXA1cXhHZEVNV2toUDZCV0N6MDUzTlViMkUxUW9VVFUxNnVBL2VkaXQjZ2lkPTc4MzcyNDU5M1xuXG4vLyBTYWZhcmkgNiBhbmQgNi4xIGZvciBkZXNrdG9wLCBpUGFkLCBhbmQgaVBob25lIGFyZSB0aGUgb25seSBicm93c2VycyB0aGF0XG4vLyBoYXZlIFdlYktpdE11dGF0aW9uT2JzZXJ2ZXIgYnV0IG5vdCB1bi1wcmVmaXhlZCBNdXRhdGlvbk9ic2VydmVyLlxuLy8gTXVzdCB1c2UgYGdsb2JhbGAgb3IgYHNlbGZgIGluc3RlYWQgb2YgYHdpbmRvd2AgdG8gd29yayBpbiBib3RoIGZyYW1lcyBhbmQgd2ViXG4vLyB3b3JrZXJzLiBgZ2xvYmFsYCBpcyBhIHByb3Zpc2lvbiBvZiBCcm93c2VyaWZ5LCBNciwgTXJzLCBvciBNb3AuXG5cbi8qIGdsb2JhbHMgc2VsZiAqL1xudmFyIHNjb3BlID0gdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHNlbGY7XG52YXIgQnJvd3Nlck11dGF0aW9uT2JzZXJ2ZXIgPSBzY29wZS5NdXRhdGlvbk9ic2VydmVyIHx8IHNjb3BlLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG5cbi8vIE11dGF0aW9uT2JzZXJ2ZXJzIGFyZSBkZXNpcmFibGUgYmVjYXVzZSB0aGV5IGhhdmUgaGlnaCBwcmlvcml0eSBhbmQgd29ya1xuLy8gcmVsaWFibHkgZXZlcnl3aGVyZSB0aGV5IGFyZSBpbXBsZW1lbnRlZC5cbi8vIFRoZXkgYXJlIGltcGxlbWVudGVkIGluIGFsbCBtb2Rlcm4gYnJvd3NlcnMuXG4vL1xuLy8gLSBBbmRyb2lkIDQtNC4zXG4vLyAtIENocm9tZSAyNi0zNFxuLy8gLSBGaXJlZm94IDE0LTI5XG4vLyAtIEludGVybmV0IEV4cGxvcmVyIDExXG4vLyAtIGlQYWQgU2FmYXJpIDYtNy4xXG4vLyAtIGlQaG9uZSBTYWZhcmkgNy03LjFcbi8vIC0gU2FmYXJpIDYtN1xuaWYgKHR5cGVvZiBCcm93c2VyTXV0YXRpb25PYnNlcnZlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmVxdWVzdEZsdXNoID0gbWFrZVJlcXVlc3RDYWxsRnJvbU11dGF0aW9uT2JzZXJ2ZXIoZmx1c2gpO1xuXG4vLyBNZXNzYWdlQ2hhbm5lbHMgYXJlIGRlc2lyYWJsZSBiZWNhdXNlIHRoZXkgZ2l2ZSBkaXJlY3QgYWNjZXNzIHRvIHRoZSBIVE1MXG4vLyB0YXNrIHF1ZXVlLCBhcmUgaW1wbGVtZW50ZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAsIFNhZmFyaSA1LjAtMSwgYW5kIE9wZXJhXG4vLyAxMS0xMiwgYW5kIGluIHdlYiB3b3JrZXJzIGluIG1hbnkgZW5naW5lcy5cbi8vIEFsdGhvdWdoIG1lc3NhZ2UgY2hhbm5lbHMgeWllbGQgdG8gYW55IHF1ZXVlZCByZW5kZXJpbmcgYW5kIElPIHRhc2tzLCB0aGV5XG4vLyB3b3VsZCBiZSBiZXR0ZXIgdGhhbiBpbXBvc2luZyB0aGUgNG1zIGRlbGF5IG9mIHRpbWVycy5cbi8vIEhvd2V2ZXIsIHRoZXkgZG8gbm90IHdvcmsgcmVsaWFibHkgaW4gSW50ZXJuZXQgRXhwbG9yZXIgb3IgU2FmYXJpLlxuXG4vLyBJbnRlcm5ldCBFeHBsb3JlciAxMCBpcyB0aGUgb25seSBicm93c2VyIHRoYXQgaGFzIHNldEltbWVkaWF0ZSBidXQgZG9lc1xuLy8gbm90IGhhdmUgTXV0YXRpb25PYnNlcnZlcnMuXG4vLyBBbHRob3VnaCBzZXRJbW1lZGlhdGUgeWllbGRzIHRvIHRoZSBicm93c2VyJ3MgcmVuZGVyZXIsIGl0IHdvdWxkIGJlXG4vLyBwcmVmZXJyYWJsZSB0byBmYWxsaW5nIGJhY2sgdG8gc2V0VGltZW91dCBzaW5jZSBpdCBkb2VzIG5vdCBoYXZlXG4vLyB0aGUgbWluaW11bSA0bXMgcGVuYWx0eS5cbi8vIFVuZm9ydHVuYXRlbHkgdGhlcmUgYXBwZWFycyB0byBiZSBhIGJ1ZyBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMCBNb2JpbGUgKGFuZFxuLy8gRGVza3RvcCB0byBhIGxlc3NlciBleHRlbnQpIHRoYXQgcmVuZGVycyBib3RoIHNldEltbWVkaWF0ZSBhbmRcbi8vIE1lc3NhZ2VDaGFubmVsIHVzZWxlc3MgZm9yIHRoZSBwdXJwb3NlcyBvZiBBU0FQLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tyaXNrb3dhbC9xL2lzc3Vlcy8zOTZcblxuLy8gVGltZXJzIGFyZSBpbXBsZW1lbnRlZCB1bml2ZXJzYWxseS5cbi8vIFdlIGZhbGwgYmFjayB0byB0aW1lcnMgaW4gd29ya2VycyBpbiBtb3N0IGVuZ2luZXMsIGFuZCBpbiBmb3JlZ3JvdW5kXG4vLyBjb250ZXh0cyBpbiB0aGUgZm9sbG93aW5nIGJyb3dzZXJzLlxuLy8gSG93ZXZlciwgbm90ZSB0aGF0IGV2ZW4gdGhpcyBzaW1wbGUgY2FzZSByZXF1aXJlcyBudWFuY2VzIHRvIG9wZXJhdGUgaW4gYVxuLy8gYnJvYWQgc3BlY3RydW0gb2YgYnJvd3NlcnMuXG4vL1xuLy8gLSBGaXJlZm94IDMtMTNcbi8vIC0gSW50ZXJuZXQgRXhwbG9yZXIgNi05XG4vLyAtIGlQYWQgU2FmYXJpIDQuM1xuLy8gLSBMeW54IDIuOC43XG59IGVsc2Uge1xuICAgIHJlcXVlc3RGbHVzaCA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcihmbHVzaCk7XG59XG5cbi8vIGByZXF1ZXN0Rmx1c2hgIHJlcXVlc3RzIHRoYXQgdGhlIGhpZ2ggcHJpb3JpdHkgZXZlbnQgcXVldWUgYmUgZmx1c2hlZCBhc1xuLy8gc29vbiBhcyBwb3NzaWJsZS5cbi8vIFRoaXMgaXMgdXNlZnVsIHRvIHByZXZlbnQgYW4gZXJyb3IgdGhyb3duIGluIGEgdGFzayBmcm9tIHN0YWxsaW5nIHRoZSBldmVudFxuLy8gcXVldWUgaWYgdGhlIGV4Y2VwdGlvbiBoYW5kbGVkIGJ5IE5vZGUuanPigJlzXG4vLyBgcHJvY2Vzcy5vbihcInVuY2F1Z2h0RXhjZXB0aW9uXCIpYCBvciBieSBhIGRvbWFpbi5cbnJhd0FzYXAucmVxdWVzdEZsdXNoID0gcmVxdWVzdEZsdXNoO1xuXG4vLyBUbyByZXF1ZXN0IGEgaGlnaCBwcmlvcml0eSBldmVudCwgd2UgaW5kdWNlIGEgbXV0YXRpb24gb2JzZXJ2ZXIgYnkgdG9nZ2xpbmdcbi8vIHRoZSB0ZXh0IG9mIGEgdGV4dCBub2RlIGJldHdlZW4gXCIxXCIgYW5kIFwiLTFcIi5cbmZ1bmN0aW9uIG1ha2VSZXF1ZXN0Q2FsbEZyb21NdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRvZ2dsZSA9IDE7XG4gICAgdmFyIG9ic2VydmVyID0gbmV3IEJyb3dzZXJNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICB2YXIgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwiXCIpO1xuICAgIG9ic2VydmVyLm9ic2VydmUobm9kZSwge2NoYXJhY3RlckRhdGE6IHRydWV9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIHRvZ2dsZSA9IC10b2dnbGU7XG4gICAgICAgIG5vZGUuZGF0YSA9IHRvZ2dsZTtcbiAgICB9O1xufVxuXG4vLyBUaGUgbWVzc2FnZSBjaGFubmVsIHRlY2huaXF1ZSB3YXMgZGlzY292ZXJlZCBieSBNYWx0ZSBVYmwgYW5kIHdhcyB0aGVcbi8vIG9yaWdpbmFsIGZvdW5kYXRpb24gZm9yIHRoaXMgbGlicmFyeS5cbi8vIGh0dHA6Ly93d3cubm9uYmxvY2tpbmcuaW8vMjAxMS8wNi93aW5kb3duZXh0dGljay5odG1sXG5cbi8vIFNhZmFyaSA2LjAuNSAoYXQgbGVhc3QpIGludGVybWl0dGVudGx5IGZhaWxzIHRvIGNyZWF0ZSBtZXNzYWdlIHBvcnRzIG9uIGFcbi8vIHBhZ2UncyBmaXJzdCBsb2FkLiBUaGFua2Z1bGx5LCB0aGlzIHZlcnNpb24gb2YgU2FmYXJpIHN1cHBvcnRzXG4vLyBNdXRhdGlvbk9ic2VydmVycywgc28gd2UgZG9uJ3QgbmVlZCB0byBmYWxsIGJhY2sgaW4gdGhhdCBjYXNlLlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tTWVzc2FnZUNoYW5uZWwoY2FsbGJhY2spIHtcbi8vICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuLy8gICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gY2FsbGJhY2s7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKDApO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIEZvciByZWFzb25zIGV4cGxhaW5lZCBhYm92ZSwgd2UgYXJlIGFsc28gdW5hYmxlIHRvIHVzZSBgc2V0SW1tZWRpYXRlYFxuLy8gdW5kZXIgYW55IGNpcmN1bXN0YW5jZXMuXG4vLyBFdmVuIGlmIHdlIHdlcmUsIHRoZXJlIGlzIGFub3RoZXIgYnVnIGluIEludGVybmV0IEV4cGxvcmVyIDEwLlxuLy8gSXQgaXMgbm90IHN1ZmZpY2llbnQgdG8gYXNzaWduIGBzZXRJbW1lZGlhdGVgIHRvIGByZXF1ZXN0Rmx1c2hgIGJlY2F1c2Vcbi8vIGBzZXRJbW1lZGlhdGVgIG11c3QgYmUgY2FsbGVkICpieSBuYW1lKiBhbmQgdGhlcmVmb3JlIG11c3QgYmUgd3JhcHBlZCBpbiBhXG4vLyBjbG9zdXJlLlxuLy8gTmV2ZXIgZm9yZ2V0LlxuXG4vLyBmdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tU2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uIHJlcXVlc3RDYWxsKCkge1xuLy8gICAgICAgICBzZXRJbW1lZGlhdGUoY2FsbGJhY2spO1xuLy8gICAgIH07XG4vLyB9XG5cbi8vIFNhZmFyaSA2LjAgaGFzIGEgcHJvYmxlbSB3aGVyZSB0aW1lcnMgd2lsbCBnZXQgbG9zdCB3aGlsZSB0aGUgdXNlciBpc1xuLy8gc2Nyb2xsaW5nLiBUaGlzIHByb2JsZW0gZG9lcyBub3QgaW1wYWN0IEFTQVAgYmVjYXVzZSBTYWZhcmkgNi4wIHN1cHBvcnRzXG4vLyBtdXRhdGlvbiBvYnNlcnZlcnMsIHNvIHRoYXQgaW1wbGVtZW50YXRpb24gaXMgdXNlZCBpbnN0ZWFkLlxuLy8gSG93ZXZlciwgaWYgd2UgZXZlciBlbGVjdCB0byB1c2UgdGltZXJzIGluIFNhZmFyaSwgdGhlIHByZXZhbGVudCB3b3JrLWFyb3VuZFxuLy8gaXMgdG8gYWRkIGEgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIHRoYXQgY2FsbHMgZm9yIGEgZmx1c2guXG5cbi8vIGBzZXRUaW1lb3V0YCBkb2VzIG5vdCBjYWxsIHRoZSBwYXNzZWQgY2FsbGJhY2sgaWYgdGhlIGRlbGF5IGlzIGxlc3MgdGhhblxuLy8gYXBwcm94aW1hdGVseSA3IGluIHdlYiB3b3JrZXJzIGluIEZpcmVmb3ggOCB0aHJvdWdoIDE4LCBhbmQgc29tZXRpbWVzIG5vdFxuLy8gZXZlbiB0aGVuLlxuXG5mdW5jdGlvbiBtYWtlUmVxdWVzdENhbGxGcm9tVGltZXIoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdENhbGwoKSB7XG4gICAgICAgIC8vIFdlIGRpc3BhdGNoIGEgdGltZW91dCB3aXRoIGEgc3BlY2lmaWVkIGRlbGF5IG9mIDAgZm9yIGVuZ2luZXMgdGhhdFxuICAgICAgICAvLyBjYW4gcmVsaWFibHkgYWNjb21tb2RhdGUgdGhhdCByZXF1ZXN0LiBUaGlzIHdpbGwgdXN1YWxseSBiZSBzbmFwcGVkXG4gICAgICAgIC8vIHRvIGEgNCBtaWxpc2Vjb25kIGRlbGF5LCBidXQgb25jZSB3ZSdyZSBmbHVzaGluZywgdGhlcmUncyBubyBkZWxheVxuICAgICAgICAvLyBiZXR3ZWVuIGV2ZW50cy5cbiAgICAgICAgdmFyIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGhhbmRsZVRpbWVyLCAwKTtcbiAgICAgICAgLy8gSG93ZXZlciwgc2luY2UgdGhpcyB0aW1lciBnZXRzIGZyZXF1ZW50bHkgZHJvcHBlZCBpbiBGaXJlZm94XG4gICAgICAgIC8vIHdvcmtlcnMsIHdlIGVubGlzdCBhbiBpbnRlcnZhbCBoYW5kbGUgdGhhdCB3aWxsIHRyeSB0byBmaXJlXG4gICAgICAgIC8vIGFuIGV2ZW50IDIwIHRpbWVzIHBlciBzZWNvbmQgdW50aWwgaXQgc3VjY2VlZHMuXG4gICAgICAgIHZhciBpbnRlcnZhbEhhbmRsZSA9IHNldEludGVydmFsKGhhbmRsZVRpbWVyLCA1MCk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlVGltZXIoKSB7XG4gICAgICAgICAgICAvLyBXaGljaGV2ZXIgdGltZXIgc3VjY2VlZHMgd2lsbCBjYW5jZWwgYm90aCB0aW1lcnMgYW5kXG4gICAgICAgICAgICAvLyBleGVjdXRlIHRoZSBjYWxsYmFjay5cbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxIYW5kbGUpO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIFRoaXMgaXMgZm9yIGBhc2FwLmpzYCBvbmx5LlxuLy8gSXRzIG5hbWUgd2lsbCBiZSBwZXJpb2RpY2FsbHkgcmFuZG9taXplZCB0byBicmVhayBhbnkgY29kZSB0aGF0IGRlcGVuZHMgb25cbi8vIGl0cyBleGlzdGVuY2UuXG5yYXdBc2FwLm1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lciA9IG1ha2VSZXF1ZXN0Q2FsbEZyb21UaW1lcjtcblxuLy8gQVNBUCB3YXMgb3JpZ2luYWxseSBhIG5leHRUaWNrIHNoaW0gaW5jbHVkZWQgaW4gUS4gVGhpcyB3YXMgZmFjdG9yZWQgb3V0XG4vLyBpbnRvIHRoaXMgQVNBUCBwYWNrYWdlLiBJdCB3YXMgbGF0ZXIgYWRhcHRlZCB0byBSU1ZQIHdoaWNoIG1hZGUgZnVydGhlclxuLy8gYW1lbmRtZW50cy4gVGhlc2UgZGVjaXNpb25zLCBwYXJ0aWN1bGFybHkgdG8gbWFyZ2luYWxpemUgTWVzc2FnZUNoYW5uZWwgYW5kXG4vLyB0byBjYXB0dXJlIHRoZSBNdXRhdGlvbk9ic2VydmVyIGltcGxlbWVudGF0aW9uIGluIGEgY2xvc3VyZSwgd2VyZSBpbnRlZ3JhdGVkXG4vLyBiYWNrIGludG8gQVNBUCBwcm9wZXIuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGlsZGVpby9yc3ZwLmpzL2Jsb2IvY2RkZjcyMzI1NDZhOWNmODU4NTI0Yjc1Y2RlNmY5ZWRmNzI2MjBhNy9saWIvcnN2cC9hc2FwLmpzXG5cbi8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KSkpXG5cbi8qKiovIH0pLFxuLyogMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxudmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cbi8qKiovIH0pLFxuLyogMTUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18sIF9fV0VCUEFDS19BTURfREVGSU5FX1JFU1VMVF9fOy8vIE1JVCBsaWNlbnNlIChieSBFbGFuIFNoYW5rZXIpLlxuKGZ1bmN0aW9uKGdsb2JhbHMpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBleGVjdXRlU3luYyA9IGZ1bmN0aW9uKCl7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ2Z1bmN0aW9uJyl7XG4gICAgICBhcmdzWzBdLmFwcGx5KG51bGwsIGFyZ3Muc3BsaWNlKDEpKTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGV4ZWN1dGVBc3luYyA9IGZ1bmN0aW9uKGZuKXtcbiAgICBpZiAodHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgc2V0SW1tZWRpYXRlKGZuKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLm5leHRUaWNrKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfVxuICB9O1xuXG4gIHZhciBtYWtlSXRlcmF0b3IgPSBmdW5jdGlvbiAodGFza3MpIHtcbiAgICB2YXIgbWFrZUNhbGxiYWNrID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICB2YXIgZm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0YXNrcy5sZW5ndGgpIHtcbiAgICAgICAgICB0YXNrc1tpbmRleF0uYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm4ubmV4dCgpO1xuICAgICAgfTtcbiAgICAgIGZuLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoaW5kZXggPCB0YXNrcy5sZW5ndGggLSAxKSA/IG1ha2VDYWxsYmFjayhpbmRleCArIDEpOiBudWxsO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBmbjtcbiAgICB9O1xuICAgIHJldHVybiBtYWtlQ2FsbGJhY2soMCk7XG4gIH07XG4gIFxuICB2YXIgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG1heWJlQXJyYXkpe1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobWF5YmVBcnJheSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgdmFyIHdhdGVyZmFsbCA9IGZ1bmN0aW9uICh0YXNrcywgY2FsbGJhY2ssIGZvcmNlQXN5bmMpIHtcbiAgICB2YXIgbmV4dFRpY2sgPSBmb3JjZUFzeW5jID8gZXhlY3V0ZUFzeW5jIDogZXhlY3V0ZVN5bmM7XG4gICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcbiAgICBpZiAoIV9pc0FycmF5KHRhc2tzKSkge1xuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gd2F0ZXJmYWxsIG11c3QgYmUgYW4gYXJyYXkgb2YgZnVuY3Rpb25zJyk7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyKTtcbiAgICB9XG4gICAgaWYgKCF0YXNrcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjaygpO1xuICAgIH1cbiAgICB2YXIgd3JhcEl0ZXJhdG9yID0gZnVuY3Rpb24gKGl0ZXJhdG9yKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgICBjYWxsYmFjayA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgICB2YXIgbmV4dCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgYXJncy5wdXNoKHdyYXBJdGVyYXRvcihuZXh0KSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgd3JhcEl0ZXJhdG9yKG1ha2VJdGVyYXRvcih0YXNrcykpKCk7XG4gIH07XG5cbiAgaWYgKHRydWUpIHtcbiAgICAhKF9fV0VCUEFDS19BTURfREVGSU5FX0FSUkFZX18gPSBbXSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHdhdGVyZmFsbDtcbiAgICB9KS5hcHBseShleHBvcnRzLCBfX1dFQlBBQ0tfQU1EX0RFRklORV9BUlJBWV9fKSxcblx0XHRcdFx0X19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gIT09IHVuZGVmaW5lZCAmJiAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXykpOyAvLyBSZXF1aXJlSlNcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2F0ZXJmYWxsOyAvLyBDb21tb25KU1xuICB9IGVsc2Uge1xuICAgIGdsb2JhbHMud2F0ZXJmYWxsID0gd2F0ZXJmYWxsOyAvLyA8c2NyaXB0PlxuICB9XG59KSh0aGlzKTtcblxuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cblxuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBSZWZsZWN0QXBwbHkodGhpcy5saXN0ZW5lciwgdGhpcy50YXJnZXQsIGFyZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuXG4vKioqLyB9KSxcbi8qIDE3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBub2RlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMyk7XG5cbnZhciBsaWIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG52YXIgc3ltID0gMDtcblxuZnVuY3Rpb24gZ2Vuc3ltKCkge1xuICByZXR1cm4gJ2hvbGVfJyArIHN5bSsrO1xufSAvLyBjb3B5LW9uLXdyaXRlIHZlcnNpb24gb2YgbWFwXG5cblxuZnVuY3Rpb24gbWFwQ09XKGFyciwgZnVuYykge1xuICB2YXIgcmVzID0gbnVsbDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gZnVuYyhhcnJbaV0pO1xuXG4gICAgaWYgKGl0ZW0gIT09IGFycltpXSkge1xuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmVzID0gYXJyLnNsaWNlKCk7XG4gICAgICB9XG5cbiAgICAgIHJlc1tpXSA9IGl0ZW07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyB8fCBhcnI7XG59XG5cbmZ1bmN0aW9uIHdhbGsoYXN0LCBmdW5jLCBkZXB0aEZpcnN0KSB7XG4gIGlmICghKGFzdCBpbnN0YW5jZW9mIG5vZGVzLk5vZGUpKSB7XG4gICAgcmV0dXJuIGFzdDtcbiAgfVxuXG4gIGlmICghZGVwdGhGaXJzdCkge1xuICAgIHZhciBhc3RUID0gZnVuYyhhc3QpO1xuXG4gICAgaWYgKGFzdFQgJiYgYXN0VCAhPT0gYXN0KSB7XG4gICAgICByZXR1cm4gYXN0VDtcbiAgICB9XG4gIH1cblxuICBpZiAoYXN0IGluc3RhbmNlb2Ygbm9kZXMuTm9kZUxpc3QpIHtcbiAgICB2YXIgY2hpbGRyZW4gPSBtYXBDT1coYXN0LmNoaWxkcmVuLCBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgcmV0dXJuIHdhbGsobm9kZSwgZnVuYywgZGVwdGhGaXJzdCk7XG4gICAgfSk7XG5cbiAgICBpZiAoY2hpbGRyZW4gIT09IGFzdC5jaGlsZHJlbikge1xuICAgICAgYXN0ID0gbmV3IG5vZGVzW2FzdC50eXBlbmFtZV0oYXN0LmxpbmVubywgYXN0LmNvbG5vLCBjaGlsZHJlbik7XG4gICAgfVxuICB9IGVsc2UgaWYgKGFzdCBpbnN0YW5jZW9mIG5vZGVzLkNhbGxFeHRlbnNpb24pIHtcbiAgICB2YXIgYXJncyA9IHdhbGsoYXN0LmFyZ3MsIGZ1bmMsIGRlcHRoRmlyc3QpO1xuICAgIHZhciBjb250ZW50QXJncyA9IG1hcENPVyhhc3QuY29udGVudEFyZ3MsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICByZXR1cm4gd2Fsayhub2RlLCBmdW5jLCBkZXB0aEZpcnN0KTtcbiAgICB9KTtcblxuICAgIGlmIChhcmdzICE9PSBhc3QuYXJncyB8fCBjb250ZW50QXJncyAhPT0gYXN0LmNvbnRlbnRBcmdzKSB7XG4gICAgICBhc3QgPSBuZXcgbm9kZXNbYXN0LnR5cGVuYW1lXShhc3QuZXh0TmFtZSwgYXN0LnByb3AsIGFyZ3MsIGNvbnRlbnRBcmdzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHByb3BzID0gYXN0LmZpZWxkcy5tYXAoZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICByZXR1cm4gYXN0W2ZpZWxkXTtcbiAgICB9KTtcbiAgICB2YXIgcHJvcHNUID0gbWFwQ09XKHByb3BzLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgcmV0dXJuIHdhbGsocHJvcCwgZnVuYywgZGVwdGhGaXJzdCk7XG4gICAgfSk7XG5cbiAgICBpZiAocHJvcHNUICE9PSBwcm9wcykge1xuICAgICAgYXN0ID0gbmV3IG5vZGVzW2FzdC50eXBlbmFtZV0oYXN0LmxpbmVubywgYXN0LmNvbG5vKTtcbiAgICAgIHByb3BzVC5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wLCBpKSB7XG4gICAgICAgIGFzdFthc3QuZmllbGRzW2ldXSA9IHByb3A7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGVwdGhGaXJzdCA/IGZ1bmMoYXN0KSB8fCBhc3QgOiBhc3Q7XG59XG5cbmZ1bmN0aW9uIGRlcHRoV2Fsayhhc3QsIGZ1bmMpIHtcbiAgcmV0dXJuIHdhbGsoYXN0LCBmdW5jLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gX2xpZnRGaWx0ZXJzKG5vZGUsIGFzeW5jRmlsdGVycywgcHJvcCkge1xuICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgdmFyIHdhbGtlZCA9IGRlcHRoV2Fsayhwcm9wID8gbm9kZVtwcm9wXSA6IG5vZGUsIGZ1bmN0aW9uIChkZXNjTm9kZSkge1xuICAgIHZhciBzeW1ib2w7XG5cbiAgICBpZiAoZGVzY05vZGUgaW5zdGFuY2VvZiBub2Rlcy5CbG9jaykge1xuICAgICAgcmV0dXJuIGRlc2NOb2RlO1xuICAgIH0gZWxzZSBpZiAoZGVzY05vZGUgaW5zdGFuY2VvZiBub2Rlcy5GaWx0ZXIgJiYgbGliLmluZGV4T2YoYXN5bmNGaWx0ZXJzLCBkZXNjTm9kZS5uYW1lLnZhbHVlKSAhPT0gLTEgfHwgZGVzY05vZGUgaW5zdGFuY2VvZiBub2Rlcy5DYWxsRXh0ZW5zaW9uQXN5bmMpIHtcbiAgICAgIHN5bWJvbCA9IG5ldyBub2Rlcy5TeW1ib2woZGVzY05vZGUubGluZW5vLCBkZXNjTm9kZS5jb2xubywgZ2Vuc3ltKCkpO1xuICAgICAgY2hpbGRyZW4ucHVzaChuZXcgbm9kZXMuRmlsdGVyQXN5bmMoZGVzY05vZGUubGluZW5vLCBkZXNjTm9kZS5jb2xubywgZGVzY05vZGUubmFtZSwgZGVzY05vZGUuYXJncywgc3ltYm9sKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN5bWJvbDtcbiAgfSk7XG5cbiAgaWYgKHByb3ApIHtcbiAgICBub2RlW3Byb3BdID0gd2Fsa2VkO1xuICB9IGVsc2Uge1xuICAgIG5vZGUgPSB3YWxrZWQ7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgY2hpbGRyZW4ucHVzaChub2RlKTtcbiAgICByZXR1cm4gbmV3IG5vZGVzLk5vZGVMaXN0KG5vZGUubGluZW5vLCBub2RlLmNvbG5vLCBjaGlsZHJlbik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cbn1cblxuZnVuY3Rpb24gbGlmdEZpbHRlcnMoYXN0LCBhc3luY0ZpbHRlcnMpIHtcbiAgcmV0dXJuIGRlcHRoV2Fsayhhc3QsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5PdXRwdXQpIHtcbiAgICAgIHJldHVybiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5TZXQpIHtcbiAgICAgIHJldHVybiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzLCAndmFsdWUnKTtcbiAgICB9IGVsc2UgaWYgKG5vZGUgaW5zdGFuY2VvZiBub2Rlcy5Gb3IpIHtcbiAgICAgIHJldHVybiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzLCAnYXJyJyk7XG4gICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuSWYpIHtcbiAgICAgIHJldHVybiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzLCAnY29uZCcpO1xuICAgIH0gZWxzZSBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkNhbGxFeHRlbnNpb24pIHtcbiAgICAgIHJldHVybiBfbGlmdEZpbHRlcnMobm9kZSwgYXN5bmNGaWx0ZXJzLCAnYXJncycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxpZnRTdXBlcihhc3QpIHtcbiAgcmV0dXJuIHdhbGsoYXN0LCBmdW5jdGlvbiAoYmxvY2tOb2RlKSB7XG4gICAgaWYgKCEoYmxvY2tOb2RlIGluc3RhbmNlb2Ygbm9kZXMuQmxvY2spKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGhhc1N1cGVyID0gZmFsc2U7XG4gICAgdmFyIHN5bWJvbCA9IGdlbnN5bSgpO1xuICAgIGJsb2NrTm9kZS5ib2R5ID0gd2FsayhibG9ja05vZGUuYm9keSwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuRnVuQ2FsbCAmJiBub2RlLm5hbWUudmFsdWUgPT09ICdzdXBlcicpIHtcbiAgICAgICAgaGFzU3VwZXIgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbmV3IG5vZGVzLlN5bWJvbChub2RlLmxpbmVubywgbm9kZS5jb2xubywgc3ltYm9sKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChoYXNTdXBlcikge1xuICAgICAgYmxvY2tOb2RlLmJvZHkuY2hpbGRyZW4udW5zaGlmdChuZXcgbm9kZXMuU3VwZXIoMCwgMCwgYmxvY2tOb2RlLm5hbWUsIG5ldyBub2Rlcy5TeW1ib2woMCwgMCwgc3ltYm9sKSkpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRTdGF0ZW1lbnRzKGFzdCkge1xuICByZXR1cm4gZGVwdGhXYWxrKGFzdCwgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAoIShub2RlIGluc3RhbmNlb2Ygbm9kZXMuSWYpICYmICEobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkZvcikpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgdmFyIGFzeW5jID0gZmFsc2U7XG4gICAgd2Fsayhub2RlLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLkZpbHRlckFzeW5jIHx8IGNoaWxkIGluc3RhbmNlb2Ygbm9kZXMuSWZBc3luYyB8fCBjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLkFzeW5jRWFjaCB8fCBjaGlsZCBpbnN0YW5jZW9mIG5vZGVzLkFzeW5jQWxsIHx8IGNoaWxkIGluc3RhbmNlb2Ygbm9kZXMuQ2FsbEV4dGVuc2lvbkFzeW5jKSB7XG4gICAgICAgIGFzeW5jID0gdHJ1ZTsgLy8gU3RvcCBpdGVyYXRpbmcgYnkgcmV0dXJuaW5nIHRoZSBub2RlXG5cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0pO1xuXG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIG5vZGVzLklmKSB7XG4gICAgICAgIHJldHVybiBuZXcgbm9kZXMuSWZBc3luYyhub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZS5jb25kLCBub2RlLmJvZHksIG5vZGUuZWxzZV8pO1xuICAgICAgfSBlbHNlIGlmIChub2RlIGluc3RhbmNlb2Ygbm9kZXMuRm9yICYmICEobm9kZSBpbnN0YW5jZW9mIG5vZGVzLkFzeW5jQWxsKSkge1xuICAgICAgICByZXR1cm4gbmV3IG5vZGVzLkFzeW5jRWFjaChub2RlLmxpbmVubywgbm9kZS5jb2xubywgbm9kZS5hcnIsIG5vZGUubmFtZSwgbm9kZS5ib2R5LCBub2RlLmVsc2VfKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3BzKGFzdCwgYXN5bmNGaWx0ZXJzKSB7XG4gIHJldHVybiBjb252ZXJ0U3RhdGVtZW50cyhsaWZ0U3VwZXIobGlmdEZpbHRlcnMoYXN0LCBhc3luY0ZpbHRlcnMpKSk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybShhc3QsIGFzeW5jRmlsdGVycykge1xuICByZXR1cm4gY3BzKGFzdCwgYXN5bmNGaWx0ZXJzIHx8IFtdKTtcbn0gLy8gdmFyIHBhcnNlciA9IHJlcXVpcmUoJy4vcGFyc2VyJyk7XG4vLyB2YXIgc3JjID0gJ2hlbGxvIHslIGZvbyAlfXslIGVuZGZvbyAlfSBlbmQnO1xuLy8gdmFyIGFzdCA9IHRyYW5zZm9ybShwYXJzZXIucGFyc2Uoc3JjLCBbbmV3IEZvb0V4dGVuc2lvbigpXSksIFsnYmFyJ10pO1xuLy8gbm9kZXMucHJpbnROb2Rlcyhhc3QpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0cmFuc2Zvcm06IHRyYW5zZm9ybVxufTtcblxuLyoqKi8gfSksXG4vKiAxOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG52YXIgbGliID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxudmFyIHIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydHMuYWJzID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIGlzTmFOKG51bSkge1xuICByZXR1cm4gbnVtICE9PSBudW07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cbmZ1bmN0aW9uIGJhdGNoKGFyciwgbGluZWNvdW50LCBmaWxsV2l0aCkge1xuICB2YXIgaTtcbiAgdmFyIHJlcyA9IFtdO1xuICB2YXIgdG1wID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChpICUgbGluZWNvdW50ID09PSAwICYmIHRtcC5sZW5ndGgpIHtcbiAgICAgIHJlcy5wdXNoKHRtcCk7XG4gICAgICB0bXAgPSBbXTtcbiAgICB9XG5cbiAgICB0bXAucHVzaChhcnJbaV0pO1xuICB9XG5cbiAgaWYgKHRtcC5sZW5ndGgpIHtcbiAgICBpZiAoZmlsbFdpdGgpIHtcbiAgICAgIGZvciAoaSA9IHRtcC5sZW5ndGg7IGkgPCBsaW5lY291bnQ7IGkrKykge1xuICAgICAgICB0bXAucHVzaChmaWxsV2l0aCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzLnB1c2godG1wKTtcbiAgfVxuXG4gIHJldHVybiByZXM7XG59XG5cbmV4cG9ydHMuYmF0Y2ggPSBiYXRjaDtcblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICB2YXIgcmV0ID0gc3RyLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHJldC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJldC5zbGljZSgxKSk7XG59XG5cbmV4cG9ydHMuY2FwaXRhbGl6ZSA9IGNhcGl0YWxpemU7XG5cbmZ1bmN0aW9uIGNlbnRlcihzdHIsIHdpZHRoKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgd2lkdGggPSB3aWR0aCB8fCA4MDtcblxuICBpZiAoc3RyLmxlbmd0aCA+PSB3aWR0aCkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2YXIgc3BhY2VzID0gd2lkdGggLSBzdHIubGVuZ3RoO1xuICB2YXIgcHJlID0gbGliLnJlcGVhdCgnICcsIHNwYWNlcyAvIDIgLSBzcGFjZXMgJSAyKTtcbiAgdmFyIHBvc3QgPSBsaWIucmVwZWF0KCcgJywgc3BhY2VzIC8gMik7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHByZSArIHN0ciArIHBvc3QpO1xufVxuXG5leHBvcnRzLmNlbnRlciA9IGNlbnRlcjtcblxuZnVuY3Rpb24gZGVmYXVsdF8odmFsLCBkZWYsIGJvb2wpIHtcbiAgaWYgKGJvb2wpIHtcbiAgICByZXR1cm4gdmFsIHx8IGRlZjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsICE9PSB1bmRlZmluZWQgPyB2YWwgOiBkZWY7XG4gIH1cbn0gLy8gVE9ETzogaXQgaXMgY29uZnVzaW5nIHRvIGV4cG9ydCBzb21ldGhpbmcgY2FsbGVkICdkZWZhdWx0J1xuXG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGRlZmF1bHRfOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuXG5mdW5jdGlvbiBkaWN0c29ydCh2YWwsIGNhc2VTZW5zaXRpdmUsIGJ5KSB7XG4gIGlmICghbGliLmlzT2JqZWN0KHZhbCkpIHtcbiAgICB0aHJvdyBuZXcgbGliLlRlbXBsYXRlRXJyb3IoJ2RpY3Rzb3J0IGZpbHRlcjogdmFsIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gIH1cblxuICB2YXIgYXJyYXkgPSBbXTsgLy8gZGVsaWJlcmF0ZWx5IGluY2x1ZGUgcHJvcGVydGllcyBmcm9tIHRoZSBvYmplY3QncyBwcm90b3R5cGVcblxuICBmb3IgKHZhciBrIGluIHZhbCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZ3VhcmQtZm9yLWluLCBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgIGFycmF5LnB1c2goW2ssIHZhbFtrXV0pO1xuICB9XG5cbiAgdmFyIHNpO1xuXG4gIGlmIChieSA9PT0gdW5kZWZpbmVkIHx8IGJ5ID09PSAna2V5Jykge1xuICAgIHNpID0gMDtcbiAgfSBlbHNlIGlmIChieSA9PT0gJ3ZhbHVlJykge1xuICAgIHNpID0gMTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgbGliLlRlbXBsYXRlRXJyb3IoJ2RpY3Rzb3J0IGZpbHRlcjogWW91IGNhbiBvbmx5IHNvcnQgYnkgZWl0aGVyIGtleSBvciB2YWx1ZScpO1xuICB9XG5cbiAgYXJyYXkuc29ydChmdW5jdGlvbiAodDEsIHQyKSB7XG4gICAgdmFyIGEgPSB0MVtzaV07XG4gICAgdmFyIGIgPSB0MltzaV07XG5cbiAgICBpZiAoIWNhc2VTZW5zaXRpdmUpIHtcbiAgICAgIGlmIChsaWIuaXNTdHJpbmcoYSkpIHtcbiAgICAgICAgYSA9IGEudG9VcHBlckNhc2UoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxpYi5pc1N0cmluZyhiKSkge1xuICAgICAgICBiID0gYi50b1VwcGVyQ2FzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhID4gYiA/IDEgOiBhID09PSBiID8gMCA6IC0xOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gIH0pO1xuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydHMuZGljdHNvcnQgPSBkaWN0c29ydDtcblxuZnVuY3Rpb24gZHVtcChvYmosIHNwYWNlcykge1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCBzcGFjZXMpO1xufVxuXG5leHBvcnRzLmR1bXAgPSBkdW1wO1xuXG5mdW5jdGlvbiBlc2NhcGUoc3RyKSB7XG4gIGlmIChzdHIgaW5zdGFuY2VvZiByLlNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgc3RyID0gc3RyID09PSBudWxsIHx8IHN0ciA9PT0gdW5kZWZpbmVkID8gJycgOiBzdHI7XG4gIHJldHVybiByLm1hcmtTYWZlKGxpYi5lc2NhcGUoc3RyLnRvU3RyaW5nKCkpKTtcbn1cblxuZXhwb3J0cy5lc2NhcGUgPSBlc2NhcGU7XG5cbmZ1bmN0aW9uIHNhZmUoc3RyKSB7XG4gIGlmIChzdHIgaW5zdGFuY2VvZiByLlNhZmVTdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgc3RyID0gc3RyID09PSBudWxsIHx8IHN0ciA9PT0gdW5kZWZpbmVkID8gJycgOiBzdHI7XG4gIHJldHVybiByLm1hcmtTYWZlKHN0ci50b1N0cmluZygpKTtcbn1cblxuZXhwb3J0cy5zYWZlID0gc2FmZTtcblxuZnVuY3Rpb24gZmlyc3QoYXJyKSB7XG4gIHJldHVybiBhcnJbMF07XG59XG5cbmV4cG9ydHMuZmlyc3QgPSBmaXJzdDtcblxuZnVuY3Rpb24gZm9yY2Vlc2NhcGUoc3RyKSB7XG4gIHN0ciA9IHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHVuZGVmaW5lZCA/ICcnIDogc3RyO1xuICByZXR1cm4gci5tYXJrU2FmZShsaWIuZXNjYXBlKHN0ci50b1N0cmluZygpKSk7XG59XG5cbmV4cG9ydHMuZm9yY2Vlc2NhcGUgPSBmb3JjZWVzY2FwZTtcblxuZnVuY3Rpb24gZ3JvdXBieShhcnIsIGF0dHIpIHtcbiAgcmV0dXJuIGxpYi5ncm91cEJ5KGFyciwgYXR0cik7XG59XG5cbmV4cG9ydHMuZ3JvdXBieSA9IGdyb3VwYnk7XG5cbmZ1bmN0aW9uIGluZGVudChzdHIsIHdpZHRoLCBpbmRlbnRmaXJzdCkge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG5cbiAgaWYgKHN0ciA9PT0gJycpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICB3aWR0aCA9IHdpZHRoIHx8IDQ7IC8vIGxldCByZXMgPSAnJztcblxuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoJ1xcbicpO1xuICB2YXIgc3AgPSBsaWIucmVwZWF0KCcgJywgd2lkdGgpO1xuICB2YXIgcmVzID0gbGluZXMubWFwKGZ1bmN0aW9uIChsLCBpKSB7XG4gICAgcmV0dXJuIGkgPT09IDAgJiYgIWluZGVudGZpcnN0ID8gbCArIFwiXFxuXCIgOiBcIlwiICsgc3AgKyBsICsgXCJcXG5cIjtcbiAgfSkuam9pbignJyk7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHJlcyk7XG59XG5cbmV4cG9ydHMuaW5kZW50ID0gaW5kZW50O1xuXG5mdW5jdGlvbiBqb2luKGFyciwgZGVsLCBhdHRyKSB7XG4gIGRlbCA9IGRlbCB8fCAnJztcblxuICBpZiAoYXR0cikge1xuICAgIGFyciA9IGxpYi5tYXAoYXJyLCBmdW5jdGlvbiAodikge1xuICAgICAgcmV0dXJuIHZbYXR0cl07XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gYXJyLmpvaW4oZGVsKTtcbn1cblxuZXhwb3J0cy5qb2luID0gam9pbjtcblxuZnVuY3Rpb24gbGFzdChhcnIpIHtcbiAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG59XG5cbmV4cG9ydHMubGFzdCA9IGxhc3Q7XG5cbmZ1bmN0aW9uIGxlbmd0aEZpbHRlcih2YWwpIHtcbiAgdmFyIHZhbHVlID0gbm9ybWFsaXplKHZhbCwgJycpO1xuXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgdmFsdWUgaW5zdGFuY2VvZiBNYXAgfHwgdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIFNldCkge1xuICAgICAgLy8gRUNNQVNjcmlwdCAyMDE1IE1hcHMgYW5kIFNldHNcbiAgICAgIHJldHVybiB2YWx1ZS5zaXplO1xuICAgIH1cblxuICAgIGlmIChsaWIuaXNPYmplY3QodmFsdWUpICYmICEodmFsdWUgaW5zdGFuY2VvZiByLlNhZmVTdHJpbmcpKSB7XG4gICAgICAvLyBPYmplY3RzIChiZXNpZGVzIFNhZmVTdHJpbmdzKSwgbm9uLXByaW1hdGl2ZSBBcnJheXNcbiAgICAgIHJldHVybiBsaWIua2V5cyh2YWx1ZSkubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZS5sZW5ndGg7XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuZXhwb3J0cy5sZW5ndGggPSBsZW5ndGhGaWx0ZXI7XG5cbmZ1bmN0aW9uIGxpc3QodmFsKSB7XG4gIGlmIChsaWIuaXNTdHJpbmcodmFsKSkge1xuICAgIHJldHVybiB2YWwuc3BsaXQoJycpO1xuICB9IGVsc2UgaWYgKGxpYi5pc09iamVjdCh2YWwpKSB7XG4gICAgcmV0dXJuIGxpYi5fZW50cmllcyh2YWwgfHwge30pLm1hcChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgdmFyIGtleSA9IF9yZWZbMF0sXG4gICAgICAgICAgdmFsdWUgPSBfcmVmWzFdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5OiBrZXksXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChsaWIuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgbGliLlRlbXBsYXRlRXJyb3IoJ2xpc3QgZmlsdGVyOiB0eXBlIG5vdCBpdGVyYWJsZScpO1xuICB9XG59XG5cbmV4cG9ydHMubGlzdCA9IGxpc3Q7XG5cbmZ1bmN0aW9uIGxvd2VyKHN0cikge1xuICBzdHIgPSBub3JtYWxpemUoc3RyLCAnJyk7XG4gIHJldHVybiBzdHIudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0cy5sb3dlciA9IGxvd2VyO1xuXG5mdW5jdGlvbiBubDJicihzdHIpIHtcbiAgaWYgKHN0ciA9PT0gbnVsbCB8fCBzdHIgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHN0ci5yZXBsYWNlKC9cXHJcXG58XFxuL2csICc8YnIgLz5cXG4nKSk7XG59XG5cbmV4cG9ydHMubmwyYnIgPSBubDJicjtcblxuZnVuY3Rpb24gcmFuZG9tKGFycikge1xuICByZXR1cm4gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcbn1cblxuZXhwb3J0cy5yYW5kb20gPSByYW5kb207XG5cbmZ1bmN0aW9uIHJlamVjdGF0dHIoYXJyLCBhdHRyKSB7XG4gIHJldHVybiBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgcmV0dXJuICFpdGVtW2F0dHJdO1xuICB9KTtcbn1cblxuZXhwb3J0cy5yZWplY3RhdHRyID0gcmVqZWN0YXR0cjtcblxuZnVuY3Rpb24gc2VsZWN0YXR0cihhcnIsIGF0dHIpIHtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICByZXR1cm4gISFpdGVtW2F0dHJdO1xuICB9KTtcbn1cblxuZXhwb3J0cy5zZWxlY3RhdHRyID0gc2VsZWN0YXR0cjtcblxuZnVuY3Rpb24gcmVwbGFjZShzdHIsIG9sZCwgbmV3XywgbWF4Q291bnQpIHtcbiAgdmFyIG9yaWdpbmFsU3RyID0gc3RyO1xuXG4gIGlmIChvbGQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2Uob2xkLCBuZXdfKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbWF4Q291bnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbWF4Q291bnQgPSAtMTtcbiAgfVxuXG4gIHZhciByZXMgPSAnJzsgLy8gT3V0cHV0XG4gIC8vIENhc3QgTnVtYmVycyBpbiB0aGUgc2VhcmNoIHRlcm0gdG8gc3RyaW5nXG5cbiAgaWYgKHR5cGVvZiBvbGQgPT09ICdudW1iZXInKSB7XG4gICAgb2xkID0gJycgKyBvbGQ7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9sZCAhPT0gJ3N0cmluZycpIHtcbiAgICAvLyBJZiBpdCBpcyBzb21ldGhpbmcgb3RoZXIgdGhhbiBudW1iZXIgb3Igc3RyaW5nLFxuICAgIC8vIHJldHVybiB0aGUgb3JpZ2luYWwgc3RyaW5nXG4gICAgcmV0dXJuIHN0cjtcbiAgfSAvLyBDYXN0IG51bWJlcnMgaW4gdGhlIHJlcGxhY2VtZW50IHRvIHN0cmluZ1xuXG5cbiAgaWYgKHR5cGVvZiBzdHIgPT09ICdudW1iZXInKSB7XG4gICAgc3RyID0gJycgKyBzdHI7XG4gIH0gLy8gSWYgYnkgbm93LCB3ZSBkb24ndCBoYXZlIGEgc3RyaW5nLCB0aHJvdyBpdCBiYWNrXG5cblxuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycgJiYgIShzdHIgaW5zdGFuY2VvZiByLlNhZmVTdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfSAvLyBTaG9ydENpcmN1aXRzXG5cblxuICBpZiAob2xkID09PSAnJykge1xuICAgIC8vIE1pbWljIHRoZSBweXRob24gYmVoYXZpb3VyOiBlbXB0eSBzdHJpbmcgaXMgcmVwbGFjZWRcbiAgICAvLyBieSByZXBsYWNlbWVudCBlLmcuIFwiYWJjXCJ8cmVwbGFjZShcIlwiLCBcIi5cIikgLT4gLmEuYi5jLlxuICAgIHJlcyA9IG5ld18gKyBzdHIuc3BsaXQoJycpLmpvaW4obmV3XykgKyBuZXdfO1xuICAgIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHJlcyk7XG4gIH1cblxuICB2YXIgbmV4dEluZGV4ID0gc3RyLmluZGV4T2Yob2xkKTsgLy8gaWYgIyBvZiByZXBsYWNlbWVudHMgdG8gcGVyZm9ybSBpcyAwLCBvciB0aGUgc3RyaW5nIHRvIGRvZXNcbiAgLy8gbm90IGNvbnRhaW4gdGhlIG9sZCB2YWx1ZSwgcmV0dXJuIHRoZSBzdHJpbmdcblxuICBpZiAobWF4Q291bnQgPT09IDAgfHwgbmV4dEluZGV4ID09PSAtMSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICB2YXIgcG9zID0gMDtcbiAgdmFyIGNvdW50ID0gMDsgLy8gIyBvZiByZXBsYWNlbWVudHMgbWFkZVxuXG4gIHdoaWxlIChuZXh0SW5kZXggPiAtMSAmJiAobWF4Q291bnQgPT09IC0xIHx8IGNvdW50IDwgbWF4Q291bnQpKSB7XG4gICAgLy8gR3JhYiB0aGUgbmV4dCBjaHVuayBvZiBzcmMgc3RyaW5nIGFuZCBhZGQgaXQgd2l0aCB0aGVcbiAgICAvLyByZXBsYWNlbWVudCwgdG8gdGhlIHJlc3VsdFxuICAgIHJlcyArPSBzdHIuc3Vic3RyaW5nKHBvcywgbmV4dEluZGV4KSArIG5ld187IC8vIEluY3JlbWVudCBvdXIgcG9pbnRlciBpbiB0aGUgc3JjIHN0cmluZ1xuXG4gICAgcG9zID0gbmV4dEluZGV4ICsgb2xkLmxlbmd0aDtcbiAgICBjb3VudCsrOyAvLyBTZWUgaWYgdGhlcmUgYXJlIGFueSBtb3JlIHJlcGxhY2VtZW50cyB0byBiZSBtYWRlXG5cbiAgICBuZXh0SW5kZXggPSBzdHIuaW5kZXhPZihvbGQsIHBvcyk7XG4gIH0gLy8gV2UndmUgZWl0aGVyIHJlYWNoZWQgdGhlIGVuZCwgb3IgZG9uZSB0aGUgbWF4ICMgb2ZcbiAgLy8gcmVwbGFjZW1lbnRzLCB0YWNrIG9uIGFueSByZW1haW5pbmcgc3RyaW5nXG5cblxuICBpZiAocG9zIDwgc3RyLmxlbmd0aCkge1xuICAgIHJlcyArPSBzdHIuc3Vic3RyaW5nKHBvcyk7XG4gIH1cblxuICByZXR1cm4gci5jb3B5U2FmZW5lc3Mob3JpZ2luYWxTdHIsIHJlcyk7XG59XG5cbmV4cG9ydHMucmVwbGFjZSA9IHJlcGxhY2U7XG5cbmZ1bmN0aW9uIHJldmVyc2UodmFsKSB7XG4gIHZhciBhcnI7XG5cbiAgaWYgKGxpYi5pc1N0cmluZyh2YWwpKSB7XG4gICAgYXJyID0gbGlzdCh2YWwpO1xuICB9IGVsc2Uge1xuICAgIC8vIENvcHkgaXRcbiAgICBhcnIgPSBsaWIubWFwKHZhbCwgZnVuY3Rpb24gKHYpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0pO1xuICB9XG5cbiAgYXJyLnJldmVyc2UoKTtcblxuICBpZiAobGliLmlzU3RyaW5nKHZhbCkpIHtcbiAgICByZXR1cm4gci5jb3B5U2FmZW5lc3ModmFsLCBhcnIuam9pbignJykpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuZXhwb3J0cy5yZXZlcnNlID0gcmV2ZXJzZTtcblxuZnVuY3Rpb24gcm91bmQodmFsLCBwcmVjaXNpb24sIG1ldGhvZCkge1xuICBwcmVjaXNpb24gPSBwcmVjaXNpb24gfHwgMDtcbiAgdmFyIGZhY3RvciA9IE1hdGgucG93KDEwLCBwcmVjaXNpb24pO1xuICB2YXIgcm91bmRlcjtcblxuICBpZiAobWV0aG9kID09PSAnY2VpbCcpIHtcbiAgICByb3VuZGVyID0gTWF0aC5jZWlsO1xuICB9IGVsc2UgaWYgKG1ldGhvZCA9PT0gJ2Zsb29yJykge1xuICAgIHJvdW5kZXIgPSBNYXRoLmZsb29yO1xuICB9IGVsc2Uge1xuICAgIHJvdW5kZXIgPSBNYXRoLnJvdW5kO1xuICB9XG5cbiAgcmV0dXJuIHJvdW5kZXIodmFsICogZmFjdG9yKSAvIGZhY3Rvcjtcbn1cblxuZXhwb3J0cy5yb3VuZCA9IHJvdW5kO1xuXG5mdW5jdGlvbiBzbGljZShhcnIsIHNsaWNlcywgZmlsbFdpdGgpIHtcbiAgdmFyIHNsaWNlTGVuZ3RoID0gTWF0aC5mbG9vcihhcnIubGVuZ3RoIC8gc2xpY2VzKTtcbiAgdmFyIGV4dHJhID0gYXJyLmxlbmd0aCAlIHNsaWNlcztcbiAgdmFyIHJlcyA9IFtdO1xuICB2YXIgb2Zmc2V0ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlczsgaSsrKSB7XG4gICAgdmFyIHN0YXJ0ID0gb2Zmc2V0ICsgaSAqIHNsaWNlTGVuZ3RoO1xuXG4gICAgaWYgKGkgPCBleHRyYSkge1xuICAgICAgb2Zmc2V0Kys7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IG9mZnNldCArIChpICsgMSkgKiBzbGljZUxlbmd0aDtcbiAgICB2YXIgY3VyclNsaWNlID0gYXJyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgaWYgKGZpbGxXaXRoICYmIGkgPj0gZXh0cmEpIHtcbiAgICAgIGN1cnJTbGljZS5wdXNoKGZpbGxXaXRoKTtcbiAgICB9XG5cbiAgICByZXMucHVzaChjdXJyU2xpY2UpO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZXhwb3J0cy5zbGljZSA9IHNsaWNlO1xuXG5mdW5jdGlvbiBzdW0oYXJyLCBhdHRyLCBzdGFydCkge1xuICBpZiAoc3RhcnQgPT09IHZvaWQgMCkge1xuICAgIHN0YXJ0ID0gMDtcbiAgfVxuXG4gIGlmIChhdHRyKSB7XG4gICAgYXJyID0gbGliLm1hcChhcnIsIGZ1bmN0aW9uICh2KSB7XG4gICAgICByZXR1cm4gdlthdHRyXTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBzdGFydCArIGFyci5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYSArIGI7XG4gIH0sIDApO1xufVxuXG5leHBvcnRzLnN1bSA9IHN1bTtcbmV4cG9ydHMuc29ydCA9IHIubWFrZU1hY3JvKFsndmFsdWUnLCAncmV2ZXJzZScsICdjYXNlX3NlbnNpdGl2ZScsICdhdHRyaWJ1dGUnXSwgW10sIGZ1bmN0aW9uIChhcnIsIHJldmVyc2VkLCBjYXNlU2VucywgYXR0cikge1xuICAvLyBDb3B5IGl0XG4gIHZhciBhcnJheSA9IGxpYi5tYXAoYXJyLCBmdW5jdGlvbiAodikge1xuICAgIHJldHVybiB2O1xuICB9KTtcbiAgYXJyYXkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciB4ID0gYXR0ciA/IGFbYXR0cl0gOiBhO1xuICAgIHZhciB5ID0gYXR0ciA/IGJbYXR0cl0gOiBiO1xuXG4gICAgaWYgKCFjYXNlU2VucyAmJiBsaWIuaXNTdHJpbmcoeCkgJiYgbGliLmlzU3RyaW5nKHkpKSB7XG4gICAgICB4ID0geC50b0xvd2VyQ2FzZSgpO1xuICAgICAgeSA9IHkudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoeCA8IHkpIHtcbiAgICAgIHJldHVybiByZXZlcnNlZCA/IDEgOiAtMTtcbiAgICB9IGVsc2UgaWYgKHggPiB5KSB7XG4gICAgICByZXR1cm4gcmV2ZXJzZWQgPyAtMSA6IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhcnJheTtcbn0pO1xuXG5mdW5jdGlvbiBzdHJpbmcob2JqKSB7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhvYmosIG9iaik7XG59XG5cbmV4cG9ydHMuc3RyaW5nID0gc3RyaW5nO1xuXG5mdW5jdGlvbiBzdHJpcHRhZ3MoaW5wdXQsIHByZXNlcnZlTGluZWJyZWFrcykge1xuICBpbnB1dCA9IG5vcm1hbGl6ZShpbnB1dCwgJycpO1xuICB2YXIgdGFncyA9IC88XFwvPyhbYS16XVthLXowLTldKilcXGJbXj5dKj58PCEtLVtcXHNcXFNdKj8tLT4vZ2k7XG4gIHZhciB0cmltbWVkSW5wdXQgPSB0cmltKGlucHV0LnJlcGxhY2UodGFncywgJycpKTtcbiAgdmFyIHJlcyA9ICcnO1xuXG4gIGlmIChwcmVzZXJ2ZUxpbmVicmVha3MpIHtcbiAgICByZXMgPSB0cmltbWVkSW5wdXQucmVwbGFjZSgvXiArfCArJC9nbSwgJycpIC8vIHJlbW92ZSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzcGFjZXNcbiAgICAucmVwbGFjZSgvICsvZywgJyAnKSAvLyBzcXVhc2ggYWRqYWNlbnQgc3BhY2VzXG4gICAgLnJlcGxhY2UoLyhcXHJcXG4pL2csICdcXG4nKSAvLyBub3JtYWxpemUgbGluZWJyZWFrcyAoQ1JMRiAtPiBMRilcbiAgICAucmVwbGFjZSgvXFxuXFxuXFxuKy9nLCAnXFxuXFxuJyk7IC8vIHNxdWFzaCBhYm5vcm1hbCBhZGphY2VudCBsaW5lYnJlYWtzXG4gIH0gZWxzZSB7XG4gICAgcmVzID0gdHJpbW1lZElucHV0LnJlcGxhY2UoL1xccysvZ2ksICcgJyk7XG4gIH1cblxuICByZXR1cm4gci5jb3B5U2FmZW5lc3MoaW5wdXQsIHJlcyk7XG59XG5cbmV4cG9ydHMuc3RyaXB0YWdzID0gc3RyaXB0YWdzO1xuXG5mdW5jdGlvbiB0aXRsZShzdHIpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICB2YXIgd29yZHMgPSBzdHIuc3BsaXQoJyAnKS5tYXAoZnVuY3Rpb24gKHdvcmQpIHtcbiAgICByZXR1cm4gY2FwaXRhbGl6ZSh3b3JkKTtcbiAgfSk7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhzdHIsIHdvcmRzLmpvaW4oJyAnKSk7XG59XG5cbmV4cG9ydHMudGl0bGUgPSB0aXRsZTtcblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHIuY29weVNhZmVuZXNzKHN0ciwgc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKSk7XG59XG5cbmV4cG9ydHMudHJpbSA9IHRyaW07XG5cbmZ1bmN0aW9uIHRydW5jYXRlKGlucHV0LCBsZW5ndGgsIGtpbGx3b3JkcywgZW5kKSB7XG4gIHZhciBvcmlnID0gaW5wdXQ7XG4gIGlucHV0ID0gbm9ybWFsaXplKGlucHV0LCAnJyk7XG4gIGxlbmd0aCA9IGxlbmd0aCB8fCAyNTU7XG5cbiAgaWYgKGlucHV0Lmxlbmd0aCA8PSBsZW5ndGgpIHtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBpZiAoa2lsbHdvcmRzKSB7XG4gICAgaW5wdXQgPSBpbnB1dC5zdWJzdHJpbmcoMCwgbGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaWR4ID0gaW5wdXQubGFzdEluZGV4T2YoJyAnLCBsZW5ndGgpO1xuXG4gICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgIGlkeCA9IGxlbmd0aDtcbiAgICB9XG5cbiAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZygwLCBpZHgpO1xuICB9XG5cbiAgaW5wdXQgKz0gZW5kICE9PSB1bmRlZmluZWQgJiYgZW5kICE9PSBudWxsID8gZW5kIDogJy4uLic7XG4gIHJldHVybiByLmNvcHlTYWZlbmVzcyhvcmlnLCBpbnB1dCk7XG59XG5cbmV4cG9ydHMudHJ1bmNhdGUgPSB0cnVuY2F0ZTtcblxuZnVuY3Rpb24gdXBwZXIoc3RyKSB7XG4gIHN0ciA9IG5vcm1hbGl6ZShzdHIsICcnKTtcbiAgcmV0dXJuIHN0ci50b1VwcGVyQ2FzZSgpO1xufVxuXG5leHBvcnRzLnVwcGVyID0gdXBwZXI7XG5cbmZ1bmN0aW9uIHVybGVuY29kZShvYmopIHtcbiAgdmFyIGVuYyA9IGVuY29kZVVSSUNvbXBvbmVudDtcblxuICBpZiAobGliLmlzU3RyaW5nKG9iaikpIHtcbiAgICByZXR1cm4gZW5jKG9iaik7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGtleXZhbHMgPSBsaWIuaXNBcnJheShvYmopID8gb2JqIDogbGliLl9lbnRyaWVzKG9iaik7XG4gICAgcmV0dXJuIGtleXZhbHMubWFwKGZ1bmN0aW9uIChfcmVmMikge1xuICAgICAgdmFyIGsgPSBfcmVmMlswXSxcbiAgICAgICAgICB2ID0gX3JlZjJbMV07XG4gICAgICByZXR1cm4gZW5jKGspICsgXCI9XCIgKyBlbmModik7XG4gICAgfSkuam9pbignJicpO1xuICB9XG59XG5cbmV4cG9ydHMudXJsZW5jb2RlID0gdXJsZW5jb2RlOyAvLyBGb3IgdGhlIGppbmphIHJlZ2V4cCwgc2VlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWl0c3VoaWtvL2ppbmphMi9ibG9iL2YxNWI4MTRkY2JhNmFhMTJiYzc0ZDFmN2QwYzg4MWQ1NWY3MTI2YmUvamluamEyL3V0aWxzLnB5I0wyMC1MMjNcblxudmFyIHB1bmNSZSA9IC9eKD86XFwofDx8Jmx0Oyk/KC4qPykoPzpcXC58LHxcXCl8XFxufCZndDspPyQvOyAvLyBmcm9tIGh0dHA6Ly9ibG9nLmdlcnYubmV0LzIwMTEvMDUvaHRtbDVfZW1haWxfYWRkcmVzc19yZWdleHAvXG5cbnZhciBlbWFpbFJlID0gL15bXFx3LiEjJCUmJyorXFwtXFwvPT9cXF5ge3x9fl0rQFthLXpcXGRcXC1dKyhcXC5bYS16XFxkXFwtXSspKyQvaTtcbnZhciBodHRwSHR0cHNSZSA9IC9eaHR0cHM/OlxcL1xcLy4qJC87XG52YXIgd3d3UmUgPSAvXnd3d1xcLi87XG52YXIgdGxkUmUgPSAvXFwuKD86b3JnfG5ldHxjb20pKD86XFw6fFxcL3wkKS87XG5cbmZ1bmN0aW9uIHVybGl6ZShzdHIsIGxlbmd0aCwgbm9mb2xsb3cpIHtcbiAgaWYgKGlzTmFOKGxlbmd0aCkpIHtcbiAgICBsZW5ndGggPSBJbmZpbml0eTtcbiAgfVxuXG4gIHZhciBub0ZvbGxvd0F0dHIgPSBub2ZvbGxvdyA9PT0gdHJ1ZSA/ICcgcmVsPVwibm9mb2xsb3dcIicgOiAnJztcbiAgdmFyIHdvcmRzID0gc3RyLnNwbGl0KC8oXFxzKykvKS5maWx0ZXIoZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAvLyBJZiB0aGUgd29yZCBoYXMgbm8gbGVuZ3RoLCBiYWlsLiBUaGlzIGNhbiBoYXBwZW4gZm9yIHN0ciB3aXRoXG4gICAgLy8gdHJhaWxpbmcgd2hpdGVzcGFjZS5cbiAgICByZXR1cm4gd29yZCAmJiB3b3JkLmxlbmd0aDtcbiAgfSkubWFwKGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgdmFyIG1hdGNoZXMgPSB3b3JkLm1hdGNoKHB1bmNSZSk7XG4gICAgdmFyIHBvc3NpYmxlVXJsID0gbWF0Y2hlcyA/IG1hdGNoZXNbMV0gOiB3b3JkO1xuICAgIHZhciBzaG9ydFVybCA9IHBvc3NpYmxlVXJsLnN1YnN0cigwLCBsZW5ndGgpOyAvLyB1cmwgdGhhdCBzdGFydHMgd2l0aCBodHRwIG9yIGh0dHBzXG5cbiAgICBpZiAoaHR0cEh0dHBzUmUudGVzdChwb3NzaWJsZVVybCkpIHtcbiAgICAgIHJldHVybiBcIjxhIGhyZWY9XFxcIlwiICsgcG9zc2libGVVcmwgKyBcIlxcXCJcIiArIG5vRm9sbG93QXR0ciArIFwiPlwiICsgc2hvcnRVcmwgKyBcIjwvYT5cIjtcbiAgICB9IC8vIHVybCB0aGF0IHN0YXJ0cyB3aXRoIHd3dy5cblxuXG4gICAgaWYgKHd3d1JlLnRlc3QocG9zc2libGVVcmwpKSB7XG4gICAgICByZXR1cm4gXCI8YSBocmVmPVxcXCJodHRwOi8vXCIgKyBwb3NzaWJsZVVybCArIFwiXFxcIlwiICsgbm9Gb2xsb3dBdHRyICsgXCI+XCIgKyBzaG9ydFVybCArIFwiPC9hPlwiO1xuICAgIH0gLy8gYW4gZW1haWwgYWRkcmVzcyBvZiB0aGUgZm9ybSB1c2VybmFtZUBkb21haW4udGxkXG5cblxuICAgIGlmIChlbWFpbFJlLnRlc3QocG9zc2libGVVcmwpKSB7XG4gICAgICByZXR1cm4gXCI8YSBocmVmPVxcXCJtYWlsdG86XCIgKyBwb3NzaWJsZVVybCArIFwiXFxcIj5cIiArIHBvc3NpYmxlVXJsICsgXCI8L2E+XCI7XG4gICAgfSAvLyB1cmwgdGhhdCBlbmRzIGluIC5jb20sIC5vcmcgb3IgLm5ldCB0aGF0IGlzIG5vdCBhbiBlbWFpbCBhZGRyZXNzXG5cblxuICAgIGlmICh0bGRSZS50ZXN0KHBvc3NpYmxlVXJsKSkge1xuICAgICAgcmV0dXJuIFwiPGEgaHJlZj1cXFwiaHR0cDovL1wiICsgcG9zc2libGVVcmwgKyBcIlxcXCJcIiArIG5vRm9sbG93QXR0ciArIFwiPlwiICsgc2hvcnRVcmwgKyBcIjwvYT5cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gd29yZDtcbiAgfSk7XG4gIHJldHVybiB3b3Jkcy5qb2luKCcnKTtcbn1cblxuZXhwb3J0cy51cmxpemUgPSB1cmxpemU7XG5cbmZ1bmN0aW9uIHdvcmRjb3VudChzdHIpIHtcbiAgc3RyID0gbm9ybWFsaXplKHN0ciwgJycpO1xuICB2YXIgd29yZHMgPSBzdHIgPyBzdHIubWF0Y2goL1xcdysvZykgOiBudWxsO1xuICByZXR1cm4gd29yZHMgPyB3b3Jkcy5sZW5ndGggOiBudWxsO1xufVxuXG5leHBvcnRzLndvcmRjb3VudCA9IHdvcmRjb3VudDtcblxuZnVuY3Rpb24gZmxvYXQodmFsLCBkZWYpIHtcbiAgdmFyIHJlcyA9IHBhcnNlRmxvYXQodmFsKTtcbiAgcmV0dXJuIGlzTmFOKHJlcykgPyBkZWYgOiByZXM7XG59XG5cbmV4cG9ydHMuZmxvYXQgPSBmbG9hdDtcblxuZnVuY3Rpb24gaW50KHZhbCwgZGVmKSB7XG4gIHZhciByZXMgPSBwYXJzZUludCh2YWwsIDEwKTtcbiAgcmV0dXJuIGlzTmFOKHJlcykgPyBkZWYgOiByZXM7XG59XG5cbmV4cG9ydHMuaW50ID0gaW50OyAvLyBBbGlhc2VzXG5cbmV4cG9ydHMuZCA9IGV4cG9ydHMuZGVmYXVsdDtcbmV4cG9ydHMuZSA9IGV4cG9ydHMuZXNjYXBlO1xuXG4vKioqLyB9KSxcbi8qIDE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbmZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpOyBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzczsgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgTG9hZGVyID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblxudmFyIFByZWNvbXBpbGVkTG9hZGVyID1cbi8qI19fUFVSRV9fKi9cbmZ1bmN0aW9uIChfTG9hZGVyKSB7XG4gIF9pbmhlcml0c0xvb3NlKFByZWNvbXBpbGVkTG9hZGVyLCBfTG9hZGVyKTtcblxuICBmdW5jdGlvbiBQcmVjb21waWxlZExvYWRlcihjb21waWxlZFRlbXBsYXRlcykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF90aGlzID0gX0xvYWRlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgX3RoaXMucHJlY29tcGlsZWQgPSBjb21waWxlZFRlbXBsYXRlcyB8fCB7fTtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cblxuICB2YXIgX3Byb3RvID0gUHJlY29tcGlsZWRMb2FkZXIucHJvdG90eXBlO1xuXG4gIF9wcm90by5nZXRTb3VyY2UgPSBmdW5jdGlvbiBnZXRTb3VyY2UobmFtZSkge1xuICAgIGlmICh0aGlzLnByZWNvbXBpbGVkW25hbWVdKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzcmM6IHtcbiAgICAgICAgICB0eXBlOiAnY29kZScsXG4gICAgICAgICAgb2JqOiB0aGlzLnByZWNvbXBpbGVkW25hbWVdXG4gICAgICAgIH0sXG4gICAgICAgIHBhdGg6IG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgcmV0dXJuIFByZWNvbXBpbGVkTG9hZGVyO1xufShMb2FkZXIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgUHJlY29tcGlsZWRMb2FkZXI6IFByZWNvbXBpbGVkTG9hZGVyXG59O1xuXG4vKioqLyB9KSxcbi8qIDIwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5cbnZhciBTYWZlU3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKS5TYWZlU3RyaW5nO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0IGlzIGEgZnVuY3Rpb24sIG90aGVyd2lzZSBgZmFsc2VgLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuXG5mdW5jdGlvbiBjYWxsYWJsZSh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnRzLmNhbGxhYmxlID0gY2FsbGFibGU7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3QgaXMgc3RyaWN0bHkgbm90IGB1bmRlZmluZWRgLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0cy5kZWZpbmVkID0gZGVmaW5lZDtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgZGl2aXNibGUgYnkgdGhlIHRlc3QncyBhcmd1bWVudFxuICogKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBkaXZpc2libGVieShvbmUsIHR3bykge1xuICByZXR1cm4gb25lICUgdHdvID09PSAwO1xufVxuXG5leHBvcnRzLmRpdmlzaWJsZWJ5ID0gZGl2aXNpYmxlYnk7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3RyaW5nIGhhcyBiZWVuIGVzY2FwZWQgKGkuZS4sIGlzIGEgU2FmZVN0cmluZykuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFNhZmVTdHJpbmc7XG59XG5cbmV4cG9ydHMuZXNjYXBlZCA9IGVzY2FwZWQ7XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIHN0cmljdGx5IGVxdWFsLlxuICogQHBhcmFtIHsgYW55IH0gb25lXG4gKiBAcGFyYW0geyBhbnkgfSB0d29cbiAqL1xuXG5mdW5jdGlvbiBlcXVhbHRvKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgPT09IHR3bztcbn1cblxuZXhwb3J0cy5lcXVhbHRvID0gZXF1YWx0bzsgLy8gQWxpYXNlc1xuXG5leHBvcnRzLmVxID0gZXhwb3J0cy5lcXVhbHRvO1xuZXhwb3J0cy5zYW1lYXMgPSBleHBvcnRzLmVxdWFsdG87XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBldmVubHkgZGl2aXNpYmxlIGJ5IDIuXG4gKiBAcGFyYW0geyBudW1iZXIgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBldmVuKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAlIDIgPT09IDA7XG59XG5cbmV4cG9ydHMuZXZlbiA9IGV2ZW47XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpcyBmYWxzeSAtIGlmIEkgcmVjYWxsIGNvcnJlY3RseSwgJycsIDAsIGZhbHNlLFxuICogdW5kZWZpbmVkLCBOYU4gb3IgbnVsbC4gSSBkb24ndCBrbm93IGlmIHdlIHNob3VsZCBzdGljayB0byB0aGUgZGVmYXVsdCBKU1xuICogYmVoYXZpb3Igb3IgYXR0ZW1wdCB0byByZXBsaWNhdGUgd2hhdCBQeXRob24gYmVsaWV2ZXMgc2hvdWxkIGJlIGZhbHN5IChpLmUuLFxuICogZW1wdHkgYXJyYXlzLCBlbXB0eSBkaWN0cywgbm90IDAuLi4pLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZmFsc3kodmFsdWUpIHtcbiAgcmV0dXJuICF2YWx1ZTtcbn1cblxuZXhwb3J0cy5mYWxzeSA9IGZhbHN5O1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBncmVhdGVyIG9yIGVxdWFsIHRvIHRoZSB0ZXN0J3NcbiAqIGFyZ3VtZW50ICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZ2Uob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSA+PSB0d287XG59XG5cbmV4cG9ydHMuZ2UgPSBnZTtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgZ3JlYXRlciB0aGFuIHRoZSB0ZXN0J3MgYXJndW1lbnRcbiAqICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gZ3JlYXRlcnRoYW4ob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSA+IHR3bztcbn1cblxuZXhwb3J0cy5ncmVhdGVydGhhbiA9IGdyZWF0ZXJ0aGFuOyAvLyBhbGlhc1xuXG5leHBvcnRzLmd0ID0gZXhwb3J0cy5ncmVhdGVydGhhbjtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSB0ZXN0J3NcbiAqIGFyZ3VtZW50ICh0d28pLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gb25lXG4gKiBAcGFyYW0geyBudW1iZXIgfSB0d29cbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gbGUob25lLCB0d28pIHtcbiAgcmV0dXJuIG9uZSA8PSB0d287XG59XG5cbmV4cG9ydHMubGUgPSBsZTtcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9wZXJhbmQgKG9uZSkgaXMgbGVzcyB0aGFuIHRoZSB0ZXN0J3MgcGFzc2VkIGFyZ3VtZW50XG4gKiAodHdvKS5cbiAqIEBwYXJhbSB7IG51bWJlciB9IG9uZVxuICogQHBhcmFtIHsgbnVtYmVyIH0gdHdvXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGxlc3N0aGFuKG9uZSwgdHdvKSB7XG4gIHJldHVybiBvbmUgPCB0d287XG59XG5cbmV4cG9ydHMubGVzc3RoYW4gPSBsZXNzdGhhbjsgLy8gYWxpYXNcblxuZXhwb3J0cy5sdCA9IGV4cG9ydHMubGVzc3RoYW47XG4vKipcbiAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzdHJpbmcgaXMgbG93ZXJjYXNlZC5cbiAqIEBwYXJhbSB7IHN0cmluZyB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGxvd2VyKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZTtcbn1cblxuZXhwb3J0cy5sb3dlciA9IGxvd2VyO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb3BlcmFuZCAob25lKSBpcyBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gdGhlIHRlc3Qnc1xuICogYXJndW1lbnQgKHR3bykuXG4gKiBAcGFyYW0geyBudW1iZXIgfSBvbmVcbiAqIEBwYXJhbSB7IG51bWJlciB9IHR3b1xuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBuZShvbmUsIHR3bykge1xuICByZXR1cm4gb25lICE9PSB0d287XG59XG5cbmV4cG9ydHMubmUgPSBuZTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSB2YWx1ZSBpcyBzdHJpY3RseSBlcXVhbCB0byBgbnVsbGAuXG4gKiBAcGFyYW0geyBhbnkgfVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBudWxsVGVzdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGw7XG59XG5cbmV4cG9ydHMubnVsbCA9IG51bGxUZXN0O1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBAcGFyYW0geyBhbnkgfVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiBudW1iZXIodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcic7XG59XG5cbmV4cG9ydHMubnVtYmVyID0gbnVtYmVyO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgKm5vdCogZXZlbmx5IGRpdmlzaWJsZSBieSAyLlxuICogQHBhcmFtIHsgbnVtYmVyIH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gb2RkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAlIDIgPT09IDE7XG59XG5cbmV4cG9ydHMub2RkID0gb2RkO1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgYSBzdHJpbmcsIGBmYWxzZWAgaWYgbm90LlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gc3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuXG5leHBvcnRzLnN0cmluZyA9IHN0cmluZztcbi8qKlxuICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIG5vdCBpbiB0aGUgbGlzdCBvZiB0aGluZ3MgY29uc2lkZXJlZCBmYWxzeTpcbiAqICcnLCBudWxsLCB1bmRlZmluZWQsIDAsIE5hTiBhbmQgZmFsc2UuXG4gKiBAcGFyYW0geyBhbnkgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiB0cnV0aHkodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWU7XG59XG5cbmV4cG9ydHMudHJ1dGh5ID0gdHJ1dGh5O1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLlxuICogQHBhcmFtIHsgYW55IH0gdmFsdWVcbiAqIEByZXR1cm5zIHsgYm9vbGVhbiB9XG4gKi9cblxuZnVuY3Rpb24gdW5kZWZpbmVkVGVzdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0cy51bmRlZmluZWQgPSB1bmRlZmluZWRUZXN0O1xuLyoqXG4gKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3RyaW5nIGlzIHVwcGVyY2FzZWQuXG4gKiBAcGFyYW0geyBzdHJpbmcgfSB2YWx1ZVxuICogQHJldHVybnMgeyBib29sZWFuIH1cbiAqL1xuXG5mdW5jdGlvbiB1cHBlcih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUudG9VcHBlckNhc2UoKSA9PT0gdmFsdWU7XG59XG5cbmV4cG9ydHMudXBwZXIgPSB1cHBlcjtcbi8qKlxuICogSWYgRVM2IGZlYXR1cmVzIGFyZSBhdmFpbGFibGUsIHJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZSBpbXBsZW1lbnRzIHRoZVxuICogYFN5bWJvbC5pdGVyYXRvcmAgbWV0aG9kLiBJZiBub3QsIGl0J3MgYSBzdHJpbmcgb3IgQXJyYXkuXG4gKlxuICogQ291bGQgcG90ZW50aWFsbHkgY2F1c2UgaXNzdWVzIGlmIGEgYnJvd3NlciBleGlzdHMgdGhhdCBoYXMgU2V0IGFuZCBNYXAgYnV0XG4gKiBub3QgU3ltYm9sLlxuICpcbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIGl0ZXJhYmxlKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiAhIXZhbHVlW1N5bWJvbC5pdGVyYXRvcl07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZyc7XG4gIH1cbn1cblxuZXhwb3J0cy5pdGVyYWJsZSA9IGl0ZXJhYmxlO1xuLyoqXG4gKiBJZiBFUzYgZmVhdHVyZXMgYXJlIGF2YWlsYWJsZSwgcmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlIGlzIGFuIG9iamVjdCBoYXNoXG4gKiBvciBhbiBFUzYgTWFwLiBPdGhlcndpc2UganVzdCByZXR1cm4gaWYgaXQncyBhbiBvYmplY3QgaGFzaC5cbiAqIEBwYXJhbSB7IGFueSB9IHZhbHVlXG4gKiBAcmV0dXJucyB7IGJvb2xlYW4gfVxuICovXG5cbmZ1bmN0aW9uIG1hcHBpbmcodmFsdWUpIHtcbiAgLy8gb25seSBtYXBzIGFuZCBvYmplY3QgaGFzaGVzXG4gIHZhciBib29sID0gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuICBpZiAoU2V0KSB7XG4gICAgcmV0dXJuIGJvb2wgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFNldCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJvb2w7XG4gIH1cbn1cblxuZXhwb3J0cy5tYXBwaW5nID0gbWFwcGluZztcblxuLyoqKi8gfSksXG4vKiAyMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuXG5mdW5jdGlvbiBfY3ljbGVyKGl0ZW1zKSB7XG4gIHZhciBpbmRleCA9IC0xO1xuICByZXR1cm4ge1xuICAgIGN1cnJlbnQ6IG51bGwsXG4gICAgcmVzZXQ6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgaW5kZXggPSAtMTtcbiAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG4gICAgfSxcbiAgICBuZXh0OiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgaW5kZXgrKztcblxuICAgICAgaWYgKGluZGV4ID49IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY3VycmVudCA9IGl0ZW1zW2luZGV4XTtcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnQ7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBfam9pbmVyKHNlcCkge1xuICBzZXAgPSBzZXAgfHwgJywnO1xuICB2YXIgZmlyc3QgPSB0cnVlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWwgPSBmaXJzdCA/ICcnIDogc2VwO1xuICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgcmV0dXJuIHZhbDtcbiAgfTtcbn0gLy8gTWFraW5nIHRoaXMgYSBmdW5jdGlvbiBpbnN0ZWFkIHNvIGl0IHJldHVybnMgYSBuZXcgb2JqZWN0XG4vLyBlYWNoIHRpbWUgaXQncyBjYWxsZWQuIFRoYXQgd2F5LCBpZiBzb21ldGhpbmcgbGlrZSBhbiBlbnZpcm9ubWVudFxuLy8gdXNlcyBpdCwgdGhleSB3aWxsIGVhY2ggaGF2ZSB0aGVpciBvd24gY29weS5cblxuXG5mdW5jdGlvbiBnbG9iYWxzKCkge1xuICByZXR1cm4ge1xuICAgIHJhbmdlOiBmdW5jdGlvbiByYW5nZShzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgaWYgKHR5cGVvZiBzdG9wID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzdG9wID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gMDtcbiAgICAgICAgc3RlcCA9IDE7XG4gICAgICB9IGVsc2UgaWYgKCFzdGVwKSB7XG4gICAgICAgIHN0ZXAgPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJyID0gW107XG5cbiAgICAgIGlmIChzdGVwID4gMCkge1xuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBzdG9wOyBpICs9IHN0ZXApIHtcbiAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSBzdGFydDsgX2kgPiBzdG9wOyBfaSArPSBzdGVwKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmb3ItZGlyZWN0aW9uXG4gICAgICAgICAgYXJyLnB1c2goX2kpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSxcbiAgICBjeWNsZXI6IGZ1bmN0aW9uIGN5Y2xlcigpIHtcbiAgICAgIHJldHVybiBfY3ljbGVyKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH0sXG4gICAgam9pbmVyOiBmdW5jdGlvbiBqb2luZXIoc2VwKSB7XG4gICAgICByZXR1cm4gX2pvaW5lcihzZXApO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWxzO1xuXG4vKioqLyB9KSxcbi8qIDIyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBwYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHByZXNzKGVudiwgYXBwKSB7XG4gIGZ1bmN0aW9uIE51bmp1Y2tzVmlldyhuYW1lLCBvcHRzKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnBhdGggPSBuYW1lO1xuICAgIHRoaXMuZGVmYXVsdEVuZ2luZSA9IG9wdHMuZGVmYXVsdEVuZ2luZTtcbiAgICB0aGlzLmV4dCA9IHBhdGguZXh0bmFtZShuYW1lKTtcblxuICAgIGlmICghdGhpcy5leHQgJiYgIXRoaXMuZGVmYXVsdEVuZ2luZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBkZWZhdWx0IGVuZ2luZSB3YXMgc3BlY2lmaWVkIGFuZCBubyBleHRlbnNpb24gd2FzIHByb3ZpZGVkLicpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5leHQpIHtcbiAgICAgIHRoaXMubmFtZSArPSB0aGlzLmV4dCA9ICh0aGlzLmRlZmF1bHRFbmdpbmVbMF0gIT09ICcuJyA/ICcuJyA6ICcnKSArIHRoaXMuZGVmYXVsdEVuZ2luZTtcbiAgICB9XG4gIH1cblxuICBOdW5qdWNrc1ZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcihvcHRzLCBjYikge1xuICAgIGVudi5yZW5kZXIodGhpcy5uYW1lLCBvcHRzLCBjYik7XG4gIH07XG5cbiAgYXBwLnNldCgndmlldycsIE51bmp1Y2tzVmlldyk7XG4gIGFwcC5zZXQoJ251bmp1Y2tzRW52JywgZW52KTtcbiAgcmV0dXJuIGVudjtcbn07XG5cbi8qKiovIH0pLFxuLyogMjMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGZzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KTtcblxudmFyIHBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG52YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApLFxuICAgIF9wcmV0dGlmeUVycm9yID0gX3JlcXVpcmUuX3ByZXR0aWZ5RXJyb3I7XG5cbnZhciBjb21waWxlciA9IF9fd2VicGFja19yZXF1aXJlX18oNSk7XG5cbnZhciBfcmVxdWlyZTIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLFxuICAgIEVudmlyb25tZW50ID0gX3JlcXVpcmUyLkVudmlyb25tZW50O1xuXG52YXIgcHJlY29tcGlsZUdsb2JhbCA9IF9fd2VicGFja19yZXF1aXJlX18oMjQpO1xuXG5mdW5jdGlvbiBtYXRjaChmaWxlbmFtZSwgcGF0dGVybnMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHBhdHRlcm5zKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwYXR0ZXJucy5zb21lKGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgcmV0dXJuIGZpbGVuYW1lLm1hdGNoKHBhdHRlcm4pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcHJlY29tcGlsZVN0cmluZyhzdHIsIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIG9wdHMuaXNTdHJpbmcgPSB0cnVlO1xuICB2YXIgZW52ID0gb3B0cy5lbnYgfHwgbmV3IEVudmlyb25tZW50KFtdKTtcbiAgdmFyIHdyYXBwZXIgPSBvcHRzLndyYXBwZXIgfHwgcHJlY29tcGlsZUdsb2JhbDtcblxuICBpZiAoIW9wdHMubmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigndGhlIFwibmFtZVwiIG9wdGlvbiBpcyByZXF1aXJlZCB3aGVuIGNvbXBpbGluZyBhIHN0cmluZycpO1xuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXIoW19wcmVjb21waWxlKHN0ciwgb3B0cy5uYW1lLCBlbnYpXSwgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIHByZWNvbXBpbGUoaW5wdXQsIG9wdHMpIHtcbiAgLy8gVGhlIGZvbGxvd2luZyBvcHRpb25zIGFyZSBhdmFpbGFibGU6XG4gIC8vXG4gIC8vICogbmFtZTogbmFtZSBvZiB0aGUgdGVtcGxhdGUgKGF1dG8tZ2VuZXJhdGVkIHdoZW4gY29tcGlsaW5nIGEgZGlyZWN0b3J5KVxuICAvLyAqIGlzU3RyaW5nOiBpbnB1dCBpcyBhIHN0cmluZywgbm90IGEgZmlsZSBwYXRoXG4gIC8vICogYXNGdW5jdGlvbjogZ2VuZXJhdGUgYSBjYWxsYWJsZSBmdW5jdGlvblxuICAvLyAqIGZvcmNlOiBrZWVwIGNvbXBpbGluZyBvbiBlcnJvclxuICAvLyAqIGVudjogdGhlIEVudmlyb25tZW50IHRvIHVzZSAoZ2V0cyBleHRlbnNpb25zIGFuZCBhc3luYyBmaWx0ZXJzIGZyb20gaXQpXG4gIC8vICogaW5jbHVkZTogd2hpY2ggZmlsZS9mb2xkZXJzIHRvIGluY2x1ZGUgKGZvbGRlcnMgYXJlIGF1dG8taW5jbHVkZWQsIGZpbGVzIGFyZSBhdXRvLWV4Y2x1ZGVkKVxuICAvLyAqIGV4Y2x1ZGU6IHdoaWNoIGZpbGUvZm9sZGVycyB0byBleGNsdWRlIChmb2xkZXJzIGFyZSBhdXRvLWluY2x1ZGVkLCBmaWxlcyBhcmUgYXV0by1leGNsdWRlZClcbiAgLy8gKiB3cmFwcGVyOiBmdW5jdGlvbih0ZW1wbGF0ZXMsIG9wdHMpIHsuLi59XG4gIC8vICAgICAgIEN1c3RvbWl6ZSB0aGUgb3V0cHV0IGZvcm1hdCB0byBzdG9yZSB0aGUgY29tcGlsZWQgdGVtcGxhdGUuXG4gIC8vICAgICAgIEJ5IGRlZmF1bHQsIHRlbXBsYXRlcyBhcmUgc3RvcmVkIGluIGEgZ2xvYmFsIHZhcmlhYmxlIHVzZWQgYnkgdGhlIHJ1bnRpbWUuXG4gIC8vICAgICAgIEEgY3VzdG9tIGxvYWRlciB3aWxsIGJlIG5lY2Vzc2FyeSB0byBsb2FkIHlvdXIgY3VzdG9tIHdyYXBwZXIuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB2YXIgZW52ID0gb3B0cy5lbnYgfHwgbmV3IEVudmlyb25tZW50KFtdKTtcbiAgdmFyIHdyYXBwZXIgPSBvcHRzLndyYXBwZXIgfHwgcHJlY29tcGlsZUdsb2JhbDtcblxuICBpZiAob3B0cy5pc1N0cmluZykge1xuICAgIHJldHVybiBwcmVjb21waWxlU3RyaW5nKGlucHV0LCBvcHRzKTtcbiAgfVxuXG4gIHZhciBwYXRoU3RhdHMgPSBmcy5leGlzdHNTeW5jKGlucHV0KSAmJiBmcy5zdGF0U3luYyhpbnB1dCk7XG4gIHZhciBwcmVjb21waWxlZCA9IFtdO1xuICB2YXIgdGVtcGxhdGVzID0gW107XG5cbiAgZnVuY3Rpb24gYWRkVGVtcGxhdGVzKGRpcikge1xuICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaChmdW5jdGlvbiAoZmlsZSkge1xuICAgICAgdmFyIGZpbGVwYXRoID0gcGF0aC5qb2luKGRpciwgZmlsZSk7XG4gICAgICB2YXIgc3VicGF0aCA9IGZpbGVwYXRoLnN1YnN0cihwYXRoLmpvaW4oaW5wdXQsICcvJykubGVuZ3RoKTtcbiAgICAgIHZhciBzdGF0ID0gZnMuc3RhdFN5bmMoZmlsZXBhdGgpO1xuXG4gICAgICBpZiAoc3RhdCAmJiBzdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgc3VicGF0aCArPSAnLyc7XG5cbiAgICAgICAgaWYgKCFtYXRjaChzdWJwYXRoLCBvcHRzLmV4Y2x1ZGUpKSB7XG4gICAgICAgICAgYWRkVGVtcGxhdGVzKGZpbGVwYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtYXRjaChzdWJwYXRoLCBvcHRzLmluY2x1ZGUpKSB7XG4gICAgICAgIHRlbXBsYXRlcy5wdXNoKGZpbGVwYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChwYXRoU3RhdHMuaXNGaWxlKCkpIHtcbiAgICBwcmVjb21waWxlZC5wdXNoKF9wcmVjb21waWxlKGZzLnJlYWRGaWxlU3luYyhpbnB1dCwgJ3V0Zi04JyksIG9wdHMubmFtZSB8fCBpbnB1dCwgZW52KSk7XG4gIH0gZWxzZSBpZiAocGF0aFN0YXRzLmlzRGlyZWN0b3J5KCkpIHtcbiAgICBhZGRUZW1wbGF0ZXMoaW5wdXQpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZW1wbGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBuYW1lID0gdGVtcGxhdGVzW2ldLnJlcGxhY2UocGF0aC5qb2luKGlucHV0LCAnLycpLCAnJyk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHByZWNvbXBpbGVkLnB1c2goX3ByZWNvbXBpbGUoZnMucmVhZEZpbGVTeW5jKHRlbXBsYXRlc1tpXSwgJ3V0Zi04JyksIG5hbWUsIGVudikpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAob3B0cy5mb3JjZSkge1xuICAgICAgICAgIC8vIERvbid0IHN0b3AgZ2VuZXJhdGluZyB0aGUgb3V0cHV0IGlmIHdlJ3JlXG4gICAgICAgICAgLy8gZm9yY2luZyBjb21waWxhdGlvbi5cbiAgICAgICAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHdyYXBwZXIocHJlY29tcGlsZWQsIG9wdHMpO1xufVxuXG5mdW5jdGlvbiBfcHJlY29tcGlsZShzdHIsIG5hbWUsIGVudikge1xuICBlbnYgPSBlbnYgfHwgbmV3IEVudmlyb25tZW50KFtdKTtcbiAgdmFyIGFzeW5jRmlsdGVycyA9IGVudi5hc3luY0ZpbHRlcnM7XG4gIHZhciBleHRlbnNpb25zID0gZW52LmV4dGVuc2lvbnNMaXN0O1xuICB2YXIgdGVtcGxhdGU7XG4gIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcblxuICB0cnkge1xuICAgIHRlbXBsYXRlID0gY29tcGlsZXIuY29tcGlsZShzdHIsIGFzeW5jRmlsdGVycywgZXh0ZW5zaW9ucywgbmFtZSwgZW52Lm9wdHMpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aHJvdyBfcHJldHRpZnlFcnJvcihuYW1lLCBmYWxzZSwgZXJyKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHByZWNvbXBpbGU6IHByZWNvbXBpbGUsXG4gIHByZWNvbXBpbGVTdHJpbmc6IHByZWNvbXBpbGVTdHJpbmdcbn07XG5cbi8qKiovIH0pLFxuLyogMjQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxuZnVuY3Rpb24gcHJlY29tcGlsZUdsb2JhbCh0ZW1wbGF0ZXMsIG9wdHMpIHtcbiAgdmFyIG91dCA9ICcnO1xuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRlbXBsYXRlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBuYW1lID0gSlNPTi5zdHJpbmdpZnkodGVtcGxhdGVzW2ldLm5hbWUpO1xuICAgIHZhciB0ZW1wbGF0ZSA9IHRlbXBsYXRlc1tpXS50ZW1wbGF0ZTtcbiAgICBvdXQgKz0gJyhmdW5jdGlvbigpIHsnICsgJyh3aW5kb3cubnVuanVja3NQcmVjb21waWxlZCA9IHdpbmRvdy5udW5qdWNrc1ByZWNvbXBpbGVkIHx8IHt9KScgKyAnWycgKyBuYW1lICsgJ10gPSAoZnVuY3Rpb24oKSB7XFxuJyArIHRlbXBsYXRlICsgJ1xcbn0pKCk7XFxuJztcblxuICAgIGlmIChvcHRzLmFzRnVuY3Rpb24pIHtcbiAgICAgIG91dCArPSAncmV0dXJuIGZ1bmN0aW9uKGN0eCwgY2IpIHsgcmV0dXJuIG51bmp1Y2tzLnJlbmRlcignICsgbmFtZSArICcsIGN0eCwgY2IpOyB9XFxuJztcbiAgICB9XG5cbiAgICBvdXQgKz0gJ30pKCk7XFxuJztcbiAgfVxuXG4gIHJldHVybiBvdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlY29tcGlsZUdsb2JhbDtcblxuLyoqKi8gfSksXG4vKiAyNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5mdW5jdGlvbiBpbnN0YWxsQ29tcGF0KCkge1xuICAndXNlIHN0cmljdCc7XG4gIC8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuICAvLyBUaGlzIG11c3QgYmUgY2FsbGVkIGxpa2UgYG51bmp1Y2tzLmluc3RhbGxDb21wYXRgIHNvIHRoYXQgYHRoaXNgXG4gIC8vIHJlZmVyZW5jZXMgdGhlIG51bmp1Y2tzIGluc3RhbmNlXG5cbiAgdmFyIHJ1bnRpbWUgPSB0aGlzLnJ1bnRpbWU7XG4gIHZhciBsaWIgPSB0aGlzLmxpYjsgLy8gSGFuZGxlIHNsaW0gY2FzZSB3aGVyZSB0aGVzZSAnbW9kdWxlcycgYXJlIGV4Y2x1ZGVkIGZyb20gdGhlIGJ1aWx0IHNvdXJjZVxuXG4gIHZhciBDb21waWxlciA9IHRoaXMuY29tcGlsZXIuQ29tcGlsZXI7XG4gIHZhciBQYXJzZXIgPSB0aGlzLnBhcnNlci5QYXJzZXI7XG4gIHZhciBub2RlcyA9IHRoaXMubm9kZXM7XG4gIHZhciBsZXhlciA9IHRoaXMubGV4ZXI7XG4gIHZhciBvcmlnX2NvbnRleHRPckZyYW1lTG9va3VwID0gcnVudGltZS5jb250ZXh0T3JGcmFtZUxvb2t1cDtcbiAgdmFyIG9yaWdfbWVtYmVyTG9va3VwID0gcnVudGltZS5tZW1iZXJMb29rdXA7XG4gIHZhciBvcmlnX0NvbXBpbGVyX2Fzc2VydFR5cGU7XG4gIHZhciBvcmlnX1BhcnNlcl9wYXJzZUFnZ3JlZ2F0ZTtcblxuICBpZiAoQ29tcGlsZXIpIHtcbiAgICBvcmlnX0NvbXBpbGVyX2Fzc2VydFR5cGUgPSBDb21waWxlci5wcm90b3R5cGUuYXNzZXJ0VHlwZTtcbiAgfVxuXG4gIGlmIChQYXJzZXIpIHtcbiAgICBvcmlnX1BhcnNlcl9wYXJzZUFnZ3JlZ2F0ZSA9IFBhcnNlci5wcm90b3R5cGUucGFyc2VBZ2dyZWdhdGU7XG4gIH1cblxuICBmdW5jdGlvbiB1bmluc3RhbGwoKSB7XG4gICAgcnVudGltZS5jb250ZXh0T3JGcmFtZUxvb2t1cCA9IG9yaWdfY29udGV4dE9yRnJhbWVMb29rdXA7XG4gICAgcnVudGltZS5tZW1iZXJMb29rdXAgPSBvcmlnX21lbWJlckxvb2t1cDtcblxuICAgIGlmIChDb21waWxlcikge1xuICAgICAgQ29tcGlsZXIucHJvdG90eXBlLmFzc2VydFR5cGUgPSBvcmlnX0NvbXBpbGVyX2Fzc2VydFR5cGU7XG4gICAgfVxuXG4gICAgaWYgKFBhcnNlcikge1xuICAgICAgUGFyc2VyLnByb3RvdHlwZS5wYXJzZUFnZ3JlZ2F0ZSA9IG9yaWdfUGFyc2VyX3BhcnNlQWdncmVnYXRlO1xuICAgIH1cbiAgfVxuXG4gIHJ1bnRpbWUuY29udGV4dE9yRnJhbWVMb29rdXAgPSBmdW5jdGlvbiBjb250ZXh0T3JGcmFtZUxvb2t1cChjb250ZXh0LCBmcmFtZSwga2V5KSB7XG4gICAgdmFyIHZhbCA9IG9yaWdfY29udGV4dE9yRnJhbWVMb29rdXAuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIGlmICh2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHZhbDtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAnVHJ1ZSc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlICdGYWxzZSc6XG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgY2FzZSAnTm9uZSc6XG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBnZXRUb2tlbnNTdGF0ZSh0b2tlbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5kZXg6IHRva2Vucy5pbmRleCxcbiAgICAgIGxpbmVubzogdG9rZW5zLmxpbmVubyxcbiAgICAgIGNvbG5vOiB0b2tlbnMuY29sbm9cbiAgICB9O1xuICB9XG5cbiAgaWYgKFwiU1REXCIgIT09ICdTTElNJyAmJiBub2RlcyAmJiBDb21waWxlciAmJiBQYXJzZXIpIHtcbiAgICAvLyBpLmUuLCBub3Qgc2xpbSBtb2RlXG4gICAgdmFyIFNsaWNlID0gbm9kZXMuTm9kZS5leHRlbmQoJ1NsaWNlJywge1xuICAgICAgZmllbGRzOiBbJ3N0YXJ0JywgJ3N0b3AnLCAnc3RlcCddLFxuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdChsaW5lbm8sIGNvbG5vLCBzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgICAgICBzdGFydCA9IHN0YXJ0IHx8IG5ldyBub2Rlcy5MaXRlcmFsKGxpbmVubywgY29sbm8sIG51bGwpO1xuICAgICAgICBzdG9wID0gc3RvcCB8fCBuZXcgbm9kZXMuTGl0ZXJhbChsaW5lbm8sIGNvbG5vLCBudWxsKTtcbiAgICAgICAgc3RlcCA9IHN0ZXAgfHwgbmV3IG5vZGVzLkxpdGVyYWwobGluZW5vLCBjb2xubywgMSk7XG4gICAgICAgIHRoaXMucGFyZW50KGxpbmVubywgY29sbm8sIHN0YXJ0LCBzdG9wLCBzdGVwKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIENvbXBpbGVyLnByb3RvdHlwZS5hc3NlcnRUeXBlID0gZnVuY3Rpb24gYXNzZXJ0VHlwZShub2RlKSB7XG4gICAgICBpZiAobm9kZSBpbnN0YW5jZW9mIFNsaWNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgb3JpZ19Db21waWxlcl9hc3NlcnRUeXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIENvbXBpbGVyLnByb3RvdHlwZS5jb21waWxlU2xpY2UgPSBmdW5jdGlvbiBjb21waWxlU2xpY2Uobm9kZSwgZnJhbWUpIHtcbiAgICAgIHRoaXMuX2VtaXQoJygnKTtcblxuICAgICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5zdGFydCwgZnJhbWUpO1xuXG4gICAgICB0aGlzLl9lbWl0KCcpLCgnKTtcblxuICAgICAgdGhpcy5fY29tcGlsZUV4cHJlc3Npb24obm9kZS5zdG9wLCBmcmFtZSk7XG5cbiAgICAgIHRoaXMuX2VtaXQoJyksKCcpO1xuXG4gICAgICB0aGlzLl9jb21waWxlRXhwcmVzc2lvbihub2RlLnN0ZXAsIGZyYW1lKTtcblxuICAgICAgdGhpcy5fZW1pdCgnKScpO1xuICAgIH07XG5cbiAgICBQYXJzZXIucHJvdG90eXBlLnBhcnNlQWdncmVnYXRlID0gZnVuY3Rpb24gcGFyc2VBZ2dyZWdhdGUoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICB2YXIgb3JpZ1N0YXRlID0gZ2V0VG9rZW5zU3RhdGUodGhpcy50b2tlbnMpOyAvLyBTZXQgYmFjayBvbmUgYWNjb3VudGluZyBmb3Igb3BlbmluZyBicmFja2V0L3BhcmVuc1xuXG4gICAgICBvcmlnU3RhdGUuY29sbm8tLTtcbiAgICAgIG9yaWdTdGF0ZS5pbmRleC0tO1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gb3JpZ19QYXJzZXJfcGFyc2VBZ2dyZWdhdGUuYXBwbHkodGhpcyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHZhciBlcnJTdGF0ZSA9IGdldFRva2Vuc1N0YXRlKHRoaXMudG9rZW5zKTtcblxuICAgICAgICB2YXIgcmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coKSB7XG4gICAgICAgICAgbGliLl9hc3NpZ24oX3RoaXMudG9rZW5zLCBlcnJTdGF0ZSk7XG5cbiAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfTsgLy8gUmVzZXQgdG8gc3RhdGUgYmVmb3JlIG9yaWdpbmFsIHBhcnNlQWdncmVnYXRlIGNhbGxlZFxuXG5cbiAgICAgICAgbGliLl9hc3NpZ24odGhpcy50b2tlbnMsIG9yaWdTdGF0ZSk7XG5cbiAgICAgICAgdGhpcy5wZWVrZWQgPSBmYWxzZTtcbiAgICAgICAgdmFyIHRvayA9IHRoaXMucGVla1Rva2VuKCk7XG5cbiAgICAgICAgaWYgKHRvay50eXBlICE9PSBsZXhlci5UT0tFTl9MRUZUX0JSQUNLRVQpIHtcbiAgICAgICAgICB0aHJvdyByZXRocm93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5uZXh0VG9rZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBub2RlID0gbmV3IFNsaWNlKHRvay5saW5lbm8sIHRvay5jb2xubyk7IC8vIElmIHdlIGRvbid0IGVuY291bnRlciBhIGNvbG9uIHdoaWxlIHBhcnNpbmcsIHRoaXMgaXMgbm90IGEgc2xpY2UsXG4gICAgICAgIC8vIHNvIHJlLXJhaXNlIHRoZSBvcmlnaW5hbCBleGNlcHRpb24uXG5cbiAgICAgICAgdmFyIGlzU2xpY2UgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBub2RlLmZpZWxkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLnNraXAobGV4ZXIuVE9LRU5fUklHSFRfQlJBQ0tFVCkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpID09PSBub2RlLmZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpc1NsaWNlKSB7XG4gICAgICAgICAgICAgIHRoaXMuZmFpbCgncGFyc2VTbGljZTogdG9vIG1hbnkgc2xpY2UgY29tcG9uZW50cycsIHRvay5saW5lbm8sIHRvay5jb2xubyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5za2lwKGxleGVyLlRPS0VOX0NPTE9OKSkge1xuICAgICAgICAgICAgaXNTbGljZSA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IG5vZGUuZmllbGRzW2ldO1xuICAgICAgICAgICAgbm9kZVtmaWVsZF0gPSB0aGlzLnBhcnNlRXhwcmVzc2lvbigpO1xuICAgICAgICAgICAgaXNTbGljZSA9IHRoaXMuc2tpcChsZXhlci5UT0tFTl9DT0xPTikgfHwgaXNTbGljZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzU2xpY2UpIHtcbiAgICAgICAgICB0aHJvdyByZXRocm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IG5vZGVzLkFycmF5KHRvay5saW5lbm8sIHRvay5jb2xubywgW25vZGVdKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2xpY2VMb29rdXAob2JqLCBzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIG9iaiA9IG9iaiB8fCBbXTtcblxuICAgIGlmIChzdGFydCA9PT0gbnVsbCkge1xuICAgICAgc3RhcnQgPSBzdGVwIDwgMCA/IG9iai5sZW5ndGggLSAxIDogMDtcbiAgICB9XG5cbiAgICBpZiAoc3RvcCA9PT0gbnVsbCkge1xuICAgICAgc3RvcCA9IHN0ZXAgPCAwID8gLTEgOiBvYmoubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoc3RvcCA8IDApIHtcbiAgICAgIHN0b3AgKz0gb2JqLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICBzdGFydCArPSBvYmoubGVuZ3RoO1xuICAgIH1cblxuICAgIHZhciByZXN1bHRzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gc3RhcnQ7OyBpICs9IHN0ZXApIHtcbiAgICAgIGlmIChpIDwgMCB8fCBpID4gb2JqLmxlbmd0aCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPiAwICYmIGkgPj0gc3RvcCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPCAwICYmIGkgPD0gc3RvcCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVzdWx0cy5wdXNoKHJ1bnRpbWUubWVtYmVyTG9va3VwKG9iaiwgaSkpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFzT3duUHJvcChvYmosIGtleSkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xuICB9XG5cbiAgdmFyIEFSUkFZX01FTUJFUlMgPSB7XG4gICAgcG9wOiBmdW5jdGlvbiBwb3AoaW5kZXgpIHtcbiAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5kZXggPj0gdGhpcy5sZW5ndGggfHwgaW5kZXggPCAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5RXJyb3InKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9LFxuICAgIGFwcGVuZDogZnVuY3Rpb24gYXBwZW5kKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZWxlbWVudCk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShlbGVtZW50KSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXNbaV0gPT09IGVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZUVycm9yJyk7XG4gICAgfSxcbiAgICBjb3VudDogZnVuY3Rpb24gY291bnQoZWxlbWVudCkge1xuICAgICAgdmFyIGNvdW50ID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzW2ldID09PSBlbGVtZW50KSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY291bnQ7XG4gICAgfSxcbiAgICBpbmRleDogZnVuY3Rpb24gaW5kZXgoZWxlbWVudCkge1xuICAgICAgdmFyIGk7XG5cbiAgICAgIGlmICgoaSA9IHRoaXMuaW5kZXhPZihlbGVtZW50KSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsdWVFcnJvcicpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaTtcbiAgICB9LFxuICAgIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoZWxlbWVudCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5kZXhPZihlbGVtZW50KTtcbiAgICB9LFxuICAgIGluc2VydDogZnVuY3Rpb24gaW5zZXJ0KGluZGV4LCBlbGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5zcGxpY2UoaW5kZXgsIDAsIGVsZW0pO1xuICAgIH1cbiAgfTtcbiAgdmFyIE9CSkVDVF9NRU1CRVJTID0ge1xuICAgIGl0ZW1zOiBmdW5jdGlvbiBpdGVtcygpIHtcbiAgICAgIHJldHVybiBsaWIuX2VudHJpZXModGhpcyk7XG4gICAgfSxcbiAgICB2YWx1ZXM6IGZ1bmN0aW9uIHZhbHVlcygpIHtcbiAgICAgIHJldHVybiBsaWIuX3ZhbHVlcyh0aGlzKTtcbiAgICB9LFxuICAgIGtleXM6IGZ1bmN0aW9uIGtleXMoKSB7XG4gICAgICByZXR1cm4gbGliLmtleXModGhpcyk7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldChrZXksIGRlZikge1xuICAgICAgdmFyIG91dHB1dCA9IHRoaXNba2V5XTtcblxuICAgICAgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG91dHB1dCA9IGRlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICB9LFxuICAgIGhhc19rZXk6IGZ1bmN0aW9uIGhhc19rZXkoa2V5KSB7XG4gICAgICByZXR1cm4gaGFzT3duUHJvcCh0aGlzLCBrZXkpO1xuICAgIH0sXG4gICAgcG9wOiBmdW5jdGlvbiBwb3Aoa2V5LCBkZWYpIHtcbiAgICAgIHZhciBvdXRwdXQgPSB0aGlzW2tleV07XG5cbiAgICAgIGlmIChvdXRwdXQgPT09IHVuZGVmaW5lZCAmJiBkZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvdXRwdXQgPSBkZWY7XG4gICAgICB9IGVsc2UgaWYgKG91dHB1dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignS2V5RXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzW2tleV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgfSxcbiAgICBwb3BpdGVtOiBmdW5jdGlvbiBwb3BpdGVtKCkge1xuICAgICAgdmFyIGtleXMgPSBsaWIua2V5cyh0aGlzKTtcblxuICAgICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0tleUVycm9yJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBrID0ga2V5c1swXTtcbiAgICAgIHZhciB2YWwgPSB0aGlzW2tdO1xuICAgICAgZGVsZXRlIHRoaXNba107XG4gICAgICByZXR1cm4gW2ssIHZhbF07XG4gICAgfSxcbiAgICBzZXRkZWZhdWx0OiBmdW5jdGlvbiBzZXRkZWZhdWx0KGtleSwgZGVmKSB7XG4gICAgICBpZiAoZGVmID09PSB2b2lkIDApIHtcbiAgICAgICAgZGVmID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKCEoa2V5IGluIHRoaXMpKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IGRlZjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXNba2V5XTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGt3YXJncykge1xuICAgICAgbGliLl9hc3NpZ24odGhpcywga3dhcmdzKTtcblxuICAgICAgcmV0dXJuIG51bGw7IC8vIEFsd2F5cyByZXR1cm5zIE5vbmVcbiAgICB9XG4gIH07XG4gIE9CSkVDVF9NRU1CRVJTLml0ZXJpdGVtcyA9IE9CSkVDVF9NRU1CRVJTLml0ZW1zO1xuICBPQkpFQ1RfTUVNQkVSUy5pdGVydmFsdWVzID0gT0JKRUNUX01FTUJFUlMudmFsdWVzO1xuICBPQkpFQ1RfTUVNQkVSUy5pdGVya2V5cyA9IE9CSkVDVF9NRU1CRVJTLmtleXM7XG5cbiAgcnVudGltZS5tZW1iZXJMb29rdXAgPSBmdW5jdGlvbiBtZW1iZXJMb29rdXAob2JqLCB2YWwsIGF1dG9lc2NhcGUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgcmV0dXJuIHNsaWNlTG9va3VwLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgb2JqID0gb2JqIHx8IHt9OyAvLyBJZiB0aGUgb2JqZWN0IGlzIGFuIG9iamVjdCwgcmV0dXJuIGFueSBvZiB0aGUgbWV0aG9kcyB0aGF0IFB5dGhvbiB3b3VsZFxuICAgIC8vIG90aGVyd2lzZSBwcm92aWRlLlxuXG4gICAgaWYgKGxpYi5pc0FycmF5KG9iaikgJiYgaGFzT3duUHJvcChBUlJBWV9NRU1CRVJTLCB2YWwpKSB7XG4gICAgICByZXR1cm4gQVJSQVlfTUVNQkVSU1t2YWxdLmJpbmQob2JqKTtcbiAgICB9XG5cbiAgICBpZiAobGliLmlzT2JqZWN0KG9iaikgJiYgaGFzT3duUHJvcChPQkpFQ1RfTUVNQkVSUywgdmFsKSkge1xuICAgICAgcmV0dXJuIE9CSkVDVF9NRU1CRVJTW3ZhbF0uYmluZChvYmopO1xuICAgIH1cblxuICAgIHJldHVybiBvcmlnX21lbWJlckxvb2t1cC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHJldHVybiB1bmluc3RhbGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zdGFsbENvbXBhdDtcblxuLyoqKi8gfSlcbi8qKioqKiovIF0pO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1udW5qdWNrcy5qcy5tYXAiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07IiwiaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9saWIvY29udHJvbGxlcic7XHJcbmltcG9ydCBudW5qdWNrcyBmcm9tICdudW5qdWNrcyc7XHJcblxyXG5udW5qdWNrcy5jb25maWd1cmUoJy4vZGlzdCcpO1xyXG5cclxuZnVuY3Rpb24gZ2V0TmFtZShyZXF1ZXN0KSB7XHJcbiAgICAvLyBzZXQgZGVmYXVsdHNcclxuICAgIGxldCBuYW1lID0ge1xyXG4gICAgICAgIGZuYW1lOiBcIk5ld1wiLFxyXG4gICAgICAgIGxuYW1lOiBcIlVzZXJcIlxyXG4gICAgfTtcclxuICAgIC8vIHNwbGl0IHBhdGggcGFyYW1zXHJcbiAgICBsZXQgbmFtZVBhcnRzID0gcmVxdWVzdC5wYXJhbXMubmFtZSA/IHJlcXVlc3QucGFyYW1zLm5hbWUuc3BsaXQoJy8nKSA6IFtdO1xyXG4gICAgbmFtZS5mbmFtZSA9IChuYW1lUGFydHNbMF0gfHwgcmVxdWVzdC5xdWVyeS5mbmFtZSkgfHwgbmFtZS5mbmFtZTtcclxuICAgIG5hbWUubG5hbWUgPSAobmFtZVBhcnRzWzFdIHx8IHJlcXVlc3QucXVlcnkubG5hbWUpIHx8IG5hbWUubG5hbWU7XHJcbiAgICByZXR1cm4gbmFtZTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWxsb0NvbnRyb2xsZXIgZXh0ZW5kcyBDb250cm9sbGVyIHtcclxuICAgIHRvU3RyaW5nKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgbnVuanVja3MucmVuZGVyKCdoZWxsby5odG1sJywgZ2V0TmFtZSh0aGlzLmNvbnRleHQpLCAoZXJyLCByZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSAgIiwiaW1wb3J0IEFwcGxpY2F0aW9uIGZyb20gJy4vbGliL2luZGV4LmNsaWVudC5qcyc7XHJcbmltcG9ydCBIZWxsb0NvbnRyb2xsZXIgZnJvbSAnLi9IZWxsb0NvbnRyb2xsZXInO1xyXG5cclxuIGNvbnN0IGFwcGxpY2F0aW9uID0gbmV3IEFwcGxpY2F0aW9uKHtcclxuICAgICAnL2hlbGxvL3tuYW1lKn0nOiBIZWxsb0NvbnRyb2xsZXJcclxuIH0sIHtcclxuICAgICAvLyBxdWVyeSBzZWxlY3RvciBmb3IgZWxlbWVudCB0byBpbmplY3QgcmVzcG9uc2UgaW50b1xyXG4gICAgIHRhcmdldDogJ2JvZHknXHJcbiB9KTtcclxuXHJcbiBhcHBsaWNhdGlvbi5zdGFydCgpO1xyXG5jb25zb2xlLmxvZyhcInRlc3QgY2xpZW50IGluZGV4XCIpOyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xsZXIge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaW5kZXgoYXBwbGljYXRpb24sIHJlcXVlc3QsIGgsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9TdHJpbmcoY2FsbGJhY2spIHtcclxuICAgICAgICBjYWxsYmFjayhudWxsLCAnc3VjY2VzcycpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwbGljYXRpb24ge1xyXG4gICAgbmF2aWdhdGUodXJsLCBwdXNoPXRydWUpIHtcclxuICAgICAgICAvLyBpZiBicm93c2VyIGRvZXNudCBzdXBwb3J0IGhpc3RvcnkgQVBJLCBnbyB0byB1cmxcclxuICAgICAgICBpZiAoIWhpc3RvcnkucHVzaFN0YXRlKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHVybDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgICAgIGlmKHB1c2gpIHtcclxuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIHVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgLy8gZXZlbnQgbGlzdGVuZXIgZm9yIHJlZGlyZWN0c1xyXG4gICAgICAgIHRoaXMucG9wU3RhdGVMaXN0ZW5lciA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB3aW5kb3cubG9jYXRpb247XHJcbiAgICAgICAgICAgIGxldCB1cmwgPSBgJHtwYXRobmFtZX0ke3NlYXJjaH1gO1xyXG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlKHVybCwgZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNsaWNrZWRcIik7XHJcbiAgICAgICAgICAgIGxldCB7dGFyZ2V0fSA9IGU7XHJcbiAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gdGFyZ2V0LmRhdGFzZXQubmF2aWdhdGU7XHJcbiAgICAgICAgICAgIGxldCBocmVmID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlkZW50aWZpZXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gaWYgdXNlciBjbGlja2VkIG9uIGFuIGhyZWYsIHByZXZlbnQgZGVmYXVsdFxyXG4gICAgICAgICAgICAgICAgaWYgKGhyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBuYXZpZ2F0ZSB0byBocmVmIGlmIHRoZXJlXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlKGlkZW50aWZpZXIgfHwgaHJlZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jb25zb2xlLmxvZyhcIlRlc3QgY2xpZW50IGxpYlwiKTsiXX0=
