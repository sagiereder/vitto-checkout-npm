"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _randomcolor = _interopRequireDefault(require("randomcolor"));

var _md = require("react-icons/md");

var _fi = require("react-icons/fi");

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function SelectAccount(_ref) {
  let {
    hideNew,
    accounts,
    setSelectedAccount,
    setStep,
    setBankVerified
  } = _ref;
  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");

  function secondary(b) {
    if (b) return 'Verified';
    return 'Pending';
  }

  function handleClick(account) {
    setSelectedAccount(account.id);

    if (account.bankVerified) {
      setBankVerified(true);
      setStep(4);
    } else {
      setStep('micro');
    }
  }

  const alertMaxAccounts = () => {
    setAlert(true);
    setAlertText("You have reached the maximum amount of bank account. To add a new bank account, use a different email address.");
  };

  return /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      marginLeft: '5px'
    }
  }, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "warning"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5"
  }, "Select Account"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body2"
  }, "choose how you'd like to pay"), /*#__PURE__*/_react.default.createElement(_core.List, {
    component: "nav",
    "aria-label": "bank accounts"
  }, !hideNew && (accounts.length >= 2 ? /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    onClick: () => alertMaxAccounts(),
    button: true
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_fi.FiPlus, {
    style: {
      color: '#2e2e2e'
    },
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: "Add a new bank account"
  })) : /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    onClick: () => setStep(2),
    button: true
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_fi.FiPlus, {
    style: {
      color: '#2e2e2e'
    },
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: "Add a new bank account"
  }))), accounts.map((account, index) => /*#__PURE__*/_react.default.createElement(_core.ListItem, {
    onClick: () => handleClick(account),
    button: true,
    key: index
  }, /*#__PURE__*/_react.default.createElement(_core.ListItemIcon, null, /*#__PURE__*/_react.default.createElement(_md.MdAccountBalance, {
    style: {
      color: (0, _randomcolor.default)()
    },
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_core.ListItemText, {
    primary: account.name,
    secondary: secondary(account.bankVerified)
  }))))));
}

var _default = SelectAccount;
exports.default = _default;