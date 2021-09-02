"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _io = require("react-icons/io5");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Footer() {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      padding: '0px 24px 8px 24px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    justifyContent: "center",
    container: true,
    justifyItems: "center",
    style: {
      color: 'gray',
      margin: '-5px 0 8px 0'
    }
  }, /*#__PURE__*/_react.default.createElement(_io.IoLockClosedOutline, {
    size: 20,
    style: {
      marginTop: '2px',
      marginRight: '3px'
    }
  }), " Powered by Vitto"));
}

var _default = Footer;
exports.default = _default;