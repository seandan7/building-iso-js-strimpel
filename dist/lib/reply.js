"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(application) {
  var reply = function reply() {};

  reply.redirect = function (url) {
    application.navigate(url);
    return this;
  };

  reply.temporary = function () {
    return this;
  };

  reply.rewritable = function () {
    return this;
  };

  reply.permanent = function () {
    return this;
  };

  reply.state = function () {
    return this;
  };

  return reply;
}