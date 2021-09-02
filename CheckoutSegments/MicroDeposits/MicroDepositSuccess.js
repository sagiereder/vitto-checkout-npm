"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _ai = require("react-icons/ai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MicroDepositSuccess(_ref) {
  let {
    setStep
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineClockCircle, {
    size: 80,
    style: {
      marginBottom: '4px',
      color: "#3173e5"
    }
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5",
    style: {
      marginBottom: '6px'
    }
  }, "Connection Pending"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 9
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    style: {
      textAlign: 'center'
    },
    variant: "body2"
  }, "In the next 1-2 business days you'll get two small deposits. Once delivered, we'll email you instructions on how to finish verifying your bank account."))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: () => setStep(4),
    variant: "outlined",
    style: {
      marginTop: '20px'
    }
  }, "Got it"))));
}

var _default = MicroDepositSuccess;
exports.default = _default;