"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactLoaderSpinner = _interopRequireDefault(require("react-loader-spinner"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loading() {
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    style: {
      marginTop: '15vh',
      marginBottom: '15vh'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactLoaderSpinner.default, {
    type: "TailSpin",
    color: "#0d2c40",
    height: 100,
    width: 100
  })));
}

var _default = Loading;
exports.default = _default;