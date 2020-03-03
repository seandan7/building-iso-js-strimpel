"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("./lib/controller"));

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

_nunjucks["default"].configure('./dist');

function getName(request) {
  // set defaults
  var name = {
    fname: "New",
    lname: "User"
  }; // split path params

  var nameParts = request.params.name ? request.params.name.split('/') : [];
  name.fname = nameParts[0] || request.query.fname || name.fname;
  name.lname = nameParts[1] || request.query.lname || name.lname;
  return name;
}

var HelloController = /*#__PURE__*/function (_Controller) {
  _inherits(HelloController, _Controller);

  function HelloController() {
    _classCallCheck(this, HelloController);

    return _possibleConstructorReturn(this, _getPrototypeOf(HelloController).apply(this, arguments));
  }

  _createClass(HelloController, [{
    key: "toString",
    value: function toString(callback) {
      _nunjucks["default"].render('hello.html', getName(this.context), function (err, res) {
        if (err) {
          return callback(err, null);
        }

        callback(null, res);
      });
    }
  }]);

  return HelloController;
}(_controller["default"]);

exports["default"] = HelloController;