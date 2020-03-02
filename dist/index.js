"use strict";

var _lib = _interopRequireDefault(require("./lib"));

var _controller = _interopRequireDefault(require("./lib/controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Hapi = require('@hapi/hapi');

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

var application = new _lib["default"]({
  // respond to localhost:30000
  '/': _controller["default"]
}, {
  server: server
});
application.start();