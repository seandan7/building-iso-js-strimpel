"use strict";

var _lib = _interopRequireDefault(require("./lib"));

var _controller = _interopRequireDefault(require("./lib/controller"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Hapi = require('@hapi/hapi');

var server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});
var application = new _lib["default"]({
  // respond to localhost:30000
  '/': _controller["default"],
  '/hello/{name*}': _HelloController["default"]
}, {
  server: server
});
application.start();