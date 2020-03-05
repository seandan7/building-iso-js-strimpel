"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hapi = _interopRequireDefault(require("@hapi/hapi"));

var _path = _interopRequireDefault(require("path"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _inert = _interopRequireDefault(require("@hapi/inert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = new _hapi["default"].Server({
  host: 'localhost',
  port: 3000
});
var APP_FILE_PATH = '/application.js';
server.route({
  method: 'GET',
  path: APP_FILE_PATH,
  handler: function handler(request, h) {
    server.register(_inert["default"]);
    return h.file('dist/build/application.js');
  }
}); // add templates route

server.route({
  method: 'GET',
  path: '/templates/{template*}',
  handler: function handler(request, h) {
    server.register(_inert["default"]);
    return h.file(_path["default"].join('dist', request.params.template));
  }
});
var _default = {
  nunjucks: './dist',
  server: server,
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
  }
};
exports["default"] = _default;