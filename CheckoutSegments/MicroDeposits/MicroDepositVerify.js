"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _md = require("react-icons/md");

var _formatCurrency = _interopRequireDefault(require("../../utils/formatCurrency"));

var _Loading = _interopRequireDefault(require("../../utils/Loading"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MicroDepositVerify(_ref) {
  let {
    selectedAccount,
    setStep,
    setBankVerified,
    nextStep,
    refresh
  } = _ref;
  const [amount1, setAmount1] = (0, _react.useState)("");
  const [amount2, setAmount2] = (0, _react.useState)("");
  const [loading, setLoading] = (0, _react.useState)(false); //alert

  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");
  const [disabled, setDisabled] = (0, _react.useState)(false);

  async function handleClick() {
    setLoading(true);

    if (amount1 === "" || amount2 === "" || amount1 === "$0.00" || amount2 === "$0.00") {
      setAlert(true);
      setAlertText('Please enter the deposit amounts.');
      setLoading(false);
      return;
    }

    _axios.default.post('https://api.vittopayments.com/transfer/verify_bank_account', {
      accountId: selectedAccount,
      amount1: parseFloat(amount1.replace("$", "").replace(",", "")),
      amount2: parseFloat(amount2.replace("$", "").replace(",", ""))
    }).then(async function (res) {
      console.log(res);
      setLoading(false);

      if (res.data === 'verified') {
        window.analytics.track('bankAccountVerified', {
          type: 'microDeposits',
          source: 'checkout'
        });
        refresh();
        if (nextStep) setStep(nextStep);else setStep(4);
        setBankVerified(true);
      } else if (res.data && res.data.status === 202) {
        setAlert(true);
        setAlertText("Your deposits haven't been proccessed yet, please try again later.");
      } else if (res.data && res.data.status === 400) {
        setAlert(true);
        setAlertText("The deposit amounts you entered are incorrect.");
      } else if (res.data && res.data.status === 403) {
        setAlert(true);
        setAlertText("Too many incorrect tries, this bank account will be removed.");
        setDisabled(true);
        await setTimeout(() => {
          console.log("");
        }, 5000);
        setStep('select');
      } else {
        setAlert(true);
        setAlertText('An unexpected error has occured, please try again later.');
      }
    }).catch(function (err) {
      console.log(err);
      setLoading(false);
    });
  }

  return loading ? /*#__PURE__*/_react.default.createElement(_Loading.default, null) : /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: '5px'
    }
  }, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: "text-center",
    variant: "h5"
  }, "Verify Account")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: "text-center",
    variant: "body2"
  }, "Enter the two micro-deposit amounts you received to verify your account")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    style: {
      marginTop: '3px'
    },
    container: true,
    spacing: 2,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 5,
    xs: 10
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    placeholder: "$0.00",
    value: amount1,
    onChange: e => setAmount1(e.target.value),
    onBlur: e => setAmount1((0, _formatCurrency.default)(e.target.value)),
    InputLabelProps: {
      shrink: true
    },
    fullWidth: true,
    label: "Amount #1",
    variant: "standard"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 5,
    xs: 10
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    placeholder: "$0.00",
    value: amount2,
    onChange: e => setAmount2(e.target.value),
    onBlur: e => setAmount2((0, _formatCurrency.default)(e.target.value)),
    InputLabelProps: {
      shrink: true
    },
    fullWidth: true,
    label: "Amount #2",
    variant: "standard"
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    disabled: disabled,
    variant: "contained",
    onClick: handleClick,
    style: {
      marginTop: '20px',
      marginBottom: '4px'
    }
  }, "Verify Account")))));
}

var _default = MicroDepositVerify;
exports.default = _default;