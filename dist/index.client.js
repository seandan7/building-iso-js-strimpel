"use strict";

var _indexClient = _interopRequireDefault(require("./lib/index.client.js"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_nunjucks["default"].configure('/templates');

var application = new _indexClient["default"]({
  '/': _HelloController["default"],
  '/hello/{name*}': _HelloController["default"]
}, {
  // query selector for element to inject response into
  target: 'body'
});
application.start();