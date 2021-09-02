"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _core = require("@material-ui/core");

var _react = _interopRequireDefault(require("react"));

var _ai = require("react-icons/ai");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MicroDepositFinished(_ref) {
  let {
    setStep
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineCheck, {
    size: 80,
    style: {
      marginBottom: '4px',
      color: "#2eab3f"
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
  }, "Connection Successful"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
  }, "You have successfully verified you bank account! You can now use it to complete payment."))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
  }, "Continue"))));
}

var _default = MicroDepositFinished;
exports.default = _default;