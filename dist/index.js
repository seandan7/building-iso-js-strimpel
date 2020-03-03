"use strict";

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _lib = _interopRequireDefault(require("./lib"));

var _HelloController = _interopRequireDefault(require("./HelloController"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _controller = _interopRequireDefault(require("./lib/controller"));

var _inert = _interopRequireDefault(require("@hapi/inert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_nunjucks["default"].configure('./dist');

var server = new _hapi["default"].Server({
  host: 'localhost',
  port: 3000
});
var APP_FILE_PATH = '/application.js'; // register inert obj

server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: function handler(request, h) {
    server.register(_inert["default"]);
    return h.file('dist/build/application.js');
  }
});
var application = new _lib["default"]({
  // respond to localhost:30000
  '/': _HelloController["default"],
  '/hello/{name*}': _HelloController["default"]
}, {
  document: function document(application, controller, request, body, callback) {
    _nunjucks["default"].render('./index.html', {
      body: body,
      application: APP_FILE_PATH
    }, function (err, html) {
      if (err) {
        return callback(err, null);
      }

      callback(null, html);
    });
  },
  server: server
});
application.start();