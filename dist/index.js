"use strict";

var _lib = _interopRequireDefault(require("./lib"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _options = _interopRequireDefault(require("./options"));

var _HomeController = _interopRequireDefault(require("./HomeController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_nunjucks["default"].configure(_options["default"].nunjucks);

var application = new _lib["default"]({
  // respond to localhost:30000
  '/': _HomeController["default"],
  '/hello/{name*}': _HelloController["default"]
}, _options["default"]);
application.start();