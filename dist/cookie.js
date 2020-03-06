"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Cookie = /*#__PURE__*/function () {
  // name (s): cookie name
  // value (S): cookie val
  // options.secure (b): https only?
  // options.expires (num): expiration time in ms
  // options.path (s): strict cookie to a specific path
  // options.domain (s): restrict cookie to specific domain
  // Returns: undefined
  function Cookie(context) {
    _classCallCheck(this, Cookie);

    this.context = context;
  }

  _createClass(Cookie, [{
    key: "set",
    value: function set(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    }
  }, {
    key: "get",
    value: function get(name) {}
  }]);

  return Cookie;
}();