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