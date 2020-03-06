"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cookiesJs = _interopRequireDefault(require("cookies-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  get: function get(name) {
    return _cookiesJs["default"].get(name) || undefined;
  },
  set: function set(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // convert milliseconds to seconds for cookies-js api
    if (options.expires) {
      options.expires / 1000;
    }

    _cookiesJs["default"].set(name, value, options);
  }
};
exports["default"] = _default;