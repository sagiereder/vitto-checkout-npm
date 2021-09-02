"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _BankIconBg = _interopRequireDefault(require("../media/BankIcon-bg.png"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function BankInfoScreen(_ref) {
  let {
    setStep
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement("p", {
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement("img", {
    width: "100px",
    src: _BankIconBg.default
  })), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "text-center",
    variant: "h5",
    style: {
      marginTop: '15px'
    }
  }, "Connect your bank account"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "text-center",
    variant: "body2"
  }, "We need to verify your banking information to process the payment."), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    className: "text-center",
    variant: "body2"
  }, "By continuing you are agreeing to our ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://vittopayments.com/privacy_policy"
  }, "Privacy Policy"), " and ", /*#__PURE__*/_react.default.createElement("a", {
    href: "https://vittopayments.com/terms_of_service"
  }, "Terms of Service"), "."), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-center"
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    variant: "outlined",
    onClick: () => setStep(3),
    style: {
      textTransform: 'none',
      color: '#2D6FE1',
      marginTop: '10px'
    }
  }, "Let's go")));
}

var _default = BankInfoScreen;
exports.default = _default;