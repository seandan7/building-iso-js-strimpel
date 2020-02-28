"use strict";

var Hapi = require('@hapi/hapi');

var server = new Hapi.Server({
  host: 'localhost',
  port: 3000
});
server.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(reqest, h) {
    return 'hello worlds test 22';
  }
});
server.start();

(function () {
  console.log("YEST");
  console.log("TEST 2");
});