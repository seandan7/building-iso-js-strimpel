"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Application = /*#__PURE__*/function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    this.server = options.server;
    this.registerRoutes(routes);
  }

  _createClass(Application, [{
    key: "registerRoutes",
    value: function registerRoutes(routes) {
      for (var path in routes) {
        this.addRoute(path, routes[path]);
      }
    }
  }, {
    key: "addRoute",
    value: function addRoute(path, Controller) {
      var _this = this;

      this.server.route({
        path: path,
        method: 'GET',
        handler: function handler(request, h) {
          var controller = new Controller({
            query: request.query,
            params: request.params
          });
          var returnStatement = null;
          controller.index(_this, request, h.response, function (err) {
            if (err) {
              returnStatement = err;
            }

            controller.toString(function (err, html) {
              if (err) {
                returnStatement = err;
              }

              returnStatement = html;
            });
          });
          return returnStatement;
        }
      });
    }
  }, {
    key: "start",
    value: function start() {
      this.server.start();
    }
  }]);

  return Application;
}();

exports["default"] = Application;