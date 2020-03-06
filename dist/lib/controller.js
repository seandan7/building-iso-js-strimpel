"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(context) {
    _classCallCheck(this, Controller);

    this.context = context;
  }

  _createClass(Controller, [{
    key: "index",
    value: function index(application, request, h, callback) {
      callback(null);
    }
  }, {
    key: "toString",
    value: function toString(callback) {
      callback(null, 'success');
    }
  }, {
    key: "serialize",
    value: function serialize() {
      return JSON.stringify(this.context.data || {});
    }
  }, {
    key: "deserialize",
    value: function deserialize() {
      this.context.data = JSON.parse(window.__STATE__);
    }
  }, {
    key: "attach",
    value: function attach(el) {// to be implemented by the application
    }
  }, {
    key: "detach",
    value: function detach(el) {// to be implemented by the application
    }
  }, {
    key: "render",
    value: function render(target, callback) {
      this.toString(function (err, body) {
        if (err) {
          return callback(err, null);
        }

        document.querySelector(target).innerHTML = body;
        callback(null, body);
      });
    }
  }]);

  return Controller;
}();

exports["default"] = Controller;