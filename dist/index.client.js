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