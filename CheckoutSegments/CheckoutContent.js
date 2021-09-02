"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _OptionsScreen = _interopRequireDefault(require("./OptionsScreen"));

var _ConnectBank = _interopRequireDefault(require("./ConnectBank"));

var _SummaryScreen = _interopRequireDefault(require("./SummaryScreen"));

var _TitleBar = _interopRequireDefault(require("./TitleBar"));

var _BankInfoScreen = _interopRequireDefault(require("./BankInfoScreen"));

var _Footer = _interopRequireDefault(require("./Footer"));

var _CollectInformation = _interopRequireDefault(require("./CollectInformation"));

var _VerifyEmail = _interopRequireDefault(require("./VerifyEmail"));

var _MicroDepositVerify = _interopRequireDefault(require("./MicroDeposits/MicroDepositVerify"));

var _SelectAccount = _interopRequireDefault(require("./SelectAccount"));

var _CollectAddress = _interopRequireDefault(require("./CollectAddress"));

var _MicroDepositFinished = _interopRequireDefault(require("./MicroDeposits/MicroDepositFinished"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CheckoutContent(_ref) {
  let {
    open,
    propUserData,
    onSuccess,
    setShow,
    id,
    subtotal,
    total,
    tax,
    data,
    userData,
    setUserData,
    step,
    setStep,
    handleClose,
    bankVerified,
    setBankVerified,
    accounts
  } = _ref;
  const [showMicroDeposits, setShowMicroDeposits] = (0, _react.useState)(false); //

  const [selectedAccount, setSelectedAccount] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    setShowMicroDeposits(false);
  }, [step]);

  function content() {
    switch (step) {
      case 'info':
        return /*#__PURE__*/_react.default.createElement(_CollectInformation.default, {
          open: open,
          data: data,
          userData: userData,
          setStep: setStep,
          setUserData: setUserData
        });

      case 'address':
        return /*#__PURE__*/_react.default.createElement(_CollectAddress.default, {
          userData: userData,
          setStep: setStep,
          setUserData: setUserData
        });

      case 1:
        return /*#__PURE__*/_react.default.createElement(_OptionsScreen.default, {
          total: total,
          tax: tax,
          subtotal: subtotal,
          data: data,
          userData: userData,
          id: id,
          accounts: accounts,
          setStep: setStep
        });

      case 'verify':
        return /*#__PURE__*/_react.default.createElement(_VerifyEmail.default, {
          userData: userData,
          setStep: setStep
        });

      case 'select':
        return /*#__PURE__*/_react.default.createElement(_SelectAccount.default, {
          hideNew: false,
          setBankVerified: setBankVerified,
          setStep: setStep,
          setSelectedAccount: setSelectedAccount,
          accounts: accounts,
          setStep: setStep
        });

      case 2:
        return /*#__PURE__*/_react.default.createElement(_BankInfoScreen.default, {
          setStep: setStep
        });

      case 3:
        return /*#__PURE__*/_react.default.createElement(_ConnectBank.default, {
          accounts: accounts,
          refresh: open,
          setBankVerified: setBankVerified,
          userData: userData,
          setStep: setStep,
          showMicroDeposits: showMicroDeposits,
          setShowMicroDeposits: setShowMicroDeposits
        });

      case 4:
        return /*#__PURE__*/_react.default.createElement(_SummaryScreen.default, {
          selectedAccount: selectedAccount,
          onSuccess: onSuccess,
          setShow: setShow,
          id: id,
          subtotal: subtotal,
          total: total,
          tax: tax,
          bankVerified: bankVerified,
          userData: userData,
          data: data
        });

      case 'micro':
        return /*#__PURE__*/_react.default.createElement(_MicroDepositVerify.default, {
          refresh: open,
          nextStep: 'micro_finished',
          setBankVerified: setBankVerified,
          selectedAccount: selectedAccount,
          setStep: setStep
        });

      case 'micro_finished':
        return /*#__PURE__*/_react.default.createElement(_MicroDepositFinished.default, {
          setStep: setStep
        });
    }
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TitleBar.default, {
    propUserData: propUserData,
    userData: userData,
    id: id,
    total: total,
    accounts: accounts,
    setStep: setStep,
    step: step,
    data: data,
    handleClose: handleClose,
    showMicroDeposits: showMicroDeposits,
    setShowMicroDeposits: setShowMicroDeposits
  }), content(), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
}

var _default = CheckoutContent;
exports.default = _default;