"use strict";

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Hapi = require('@hapi/hapi');

_nunjucks["default"].configure('./dist');

var server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});

function getName(request) {
  // set defaults
  var name = {
    fname: "New",
    lname: "User"
  }; // split path params

  var nameParts = request.params.name ? request.params.name.split('/') : [];
  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;
  console.log(name);
  return name;
}

server.route({
  method: 'GET',
  path: '/hello/{name*}',
  handler: function handler(request, h) {
    return _nunjucks["default"].render('index.html', getName(request));
  }
});
server.start();