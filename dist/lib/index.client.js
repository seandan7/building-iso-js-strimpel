"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Application = /*#__PURE__*/function () {
  function Application() {
    _classCallCheck(this, Application);
  }

  _createClass(Application, [{
    key: "navigate",
    value: function navigate(url) {
      var push = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // if browser doesnt support history API, go to url
      console.log(url);

      if (!history.pushState) {
        window.location = url;
        return;
      }

      if (push) {
        history.pushState({}, null, url);
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      // event listener for redirects
      this.popStateListener = window.addEventListener('popstate', function (e) {
        var _window$location = window.location,
            pathname = _window$location.pathname,
            search = _window$location.search;
        var url = "".concat(pathname).concat(search);

        _this.navigate(url, false);
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


          _this.navigate(identifier || href);
        }
      });
    }
  }]);

  return Application;
}();

exports["default"] = Application;
console.log("Test client lib");