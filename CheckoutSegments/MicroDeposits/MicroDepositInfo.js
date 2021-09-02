"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _ai = require("react-icons/ai");

var _core = require("@material-ui/core");

var _MicroDepositSuccess = _interopRequireDefault(require("./MicroDepositSuccess"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MicroDepositInfo(_ref) {
  let {
    onClick,
    success,
    setStep
  } = _ref;
  //data
  const [routingNumber, setRoutingNumber] = (0, _react.useState)("");
  const [accountNumber, setAccountNumber] = (0, _react.useState)(""); //alert

  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");

  function handleClick() {
    if (routingNumber === "" || accountNumber === "") {
      setAlert(true);
      setAlertText('Please enter the Routing and Account number');
      return;
    }

    console.log(routingNumber, accountNumber);

    if (isNaN(routingNumber) || routingNumber.length !== 9) {
      setAlert(true);
      setAlertText('Please enter a valid Routing Number');
      return;
    }

    if (isNaN(accountNumber)) {
      setAlert(true);
      setAlertText('Please enter a valid Account Number');
      return;
    }

    onClick('microDeposits', routingNumber, accountNumber);
  }

  function updateRoutingNumber(e) {
    if (!isNaN(e.target.value)) setRoutingNumber(e.target.value);
  }

  function updateAccountNumber(e) {
    if (!isNaN(e.target.value)) setAccountNumber(e.target.value);
  }

  return /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: '5px'
    }
  }, success ? /*#__PURE__*/_react.default.createElement(_MicroDepositSuccess.default, {
    setStep: setStep
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5"
  }, "Manual Verification"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body2",
    style: {
      fontSize: '12px'
    }
  }, "2 small deposits will be made into your account in 1-2 business days"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "left",
    style: {
      marginTop: '-5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    margin: "dense",
    value: routingNumber,
    onChange: updateRoutingNumber,
    fullWidth: true,
    label: "Routing Number",
    variant: "standard"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    margin: "dense",
    value: accountNumber,
    onChange: updateAccountNumber,
    fullWidth: true,
    label: "Account Number",
    variant: "standard"
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: () => handleClick(),
    variant: "outlined",
    style: {
      marginTop: '20px'
    },
    startIcon: /*#__PURE__*/_react.default.createElement(_ai.AiOutlineSafety, null)
  }, "Verify Account"))))));
}

var _default = MicroDepositInfo;
exports.default = _default;