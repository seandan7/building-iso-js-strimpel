"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _call = _interopRequireDefault(require("call"));

var _queryString = _interopRequireDefault(require("query-string"));

var _cookie = _interopRequireDefault(require("./cookie.client"));

var _reply = _interopRequireDefault(require("./reply.client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Application = /*#__PURE__*/function () {
  function Application(routes, options) {
    _classCallCheck(this, Application);

    // save routes as lookup table
    this.routes = routes;
    this.options = options; // create call router instance

    this.router = new _call["default"].Router();
    this.registerRoutes(routes);
  }

  _createClass(Application, [{
    key: "registerRoutes",
    value: function registerRoutes(routes) {
      // loop through routes and add them to instance
      for (var path in routes) {
        this.router.add({
          path: path,
          method: 'get'
        });
      }
    }
  }, {
    key: "getURL",
    value: function getURL() {
      var _window$location = window.location,
          pathname = _window$location.pathname,
          search = _window$location.search;
      return "".concat(pathname).concat(search);
    }
  }, {
    key: "rehydrate",
    value: function rehydrate() {
      var targetEl = document.querySelector(this.options.target);
      this.controller = this.createController(this.getURL());
      this.controller.deserialize();
      this.controller.attach(targetEl);
    }
  }, {
    key: "navigate",
    value: function navigate(url) {
      var _this = this;

      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // if browser doesnt support history API, go to url
      if (!history.pushState) {
        window.location = url;
        return;
      }

      var previousController = this.controller;
      this.controller = this.createController(url); // if a controller was created then proceed with navigating

      if (this.controller) {
        // request and reply stubs
        var request = function request() {};

        var reply = (0, _reply["default"])(this);

        if (push) {
          history.pushState({}, null, url);
        } // execute controller action


        this.controller.index(this, request, reply, function (err) {
          if (err) {
            return reply(err);
          }

          var targetEl = document.querySelector(_this.options.target);

          if (previousController) {
            previousController.detatch(targetEl);
          } // render controller response


          _this.controller.render(_this.options.target, function (err, response) {
            if (err) {
              return reply(err);
            }

            reply(response);

            _this.controller.attach(targetEl);
          });
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      // event listener for redirects
      this.popStateListener = window.addEventListener('popstate', function (e) {
        var _window$location2 = window.location,
            pathname = _window$location2.pathname,
            search = _window$location2.search;
        var url = "".concat(pathname).concat(search);

        _this2.navigate(url, false);
      });
      this.clickListener = document.addEventListener('click', function (e) {
        var target = e.target;
        var identifier = target.dataset.navigate;
        var href = target.getAttribute('href');

        if (identifier !== undefined) {
          if (href) {
            e.preventDefault();
          } // if user clicked on an href, prevent default
          // navigate to href if there


          _this2.navigate(identifier || href);
        }
      });
      this.rehydrate();
    }
  }, {
    key: "createController",
    value: function createController(url) {
      // split the path and search string
      var urlParts = url.split('?'); // destructure url parts array

      var _urlParts = _slicedToArray(urlParts, 2),
          path = _urlParts[0],
          search = _urlParts[1]; // see if url path matches route in router


      var match = this.router.route('get', path); // destructure the route path and path path params

      var route = match.route,
          params = match.params; // look up controller class in routes table

      var Controller = this.routes[route];
      return Controller ? new Controller({
        // parse search string into object
        query: _queryString["default"].parse(search),
        params: params,
        cookie: _cookie["default"]
      }) : undefined;
    }
  }]);

  return Application;
}();

exports["default"] = Application;
console.log("Test client lib");