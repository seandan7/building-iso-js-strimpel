"use strict";

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Hapi = require('@hapi/hapi');

_nunjucks["default"].configure('./dist');

var server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});
server.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(request, h) {
    return _nunjucks["default"].render('index.html', {
      fname: 'Rick',
      lname: 'Sanchez'
    });
  }
});
server.start();