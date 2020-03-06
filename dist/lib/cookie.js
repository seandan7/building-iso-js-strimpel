"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(request, reply) {
  // encoding functions follows cookie-js pattern
  function cleanName(name) {
    name = name.replace(/[^#$&+\^`|]/g, encodeURIComponent);
    return name.replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  function cleanValue(value) {
    return (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
  }

  return {
    get: function get(name) {
      return request.state[name] && decodeURIComponent(request.state[name]) || undefined;
    },
    set: function set(name, value) {// TODO: FIX
      // reply.state(cleanName(name), cleanValue(value), {
      //     // use hapi defaults if values are falsy
      //     isSecure: options.secure || false,
      //     path: options.path || null,
      //     ttl: options.expires || null,
      //     domain: options.domain || null
      //   });

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    }
  };
}