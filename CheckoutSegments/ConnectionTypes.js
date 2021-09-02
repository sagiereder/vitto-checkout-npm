"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _core = require("@material-ui/core");

var _io = require("react-icons/io5");

var _ai = require("react-icons/ai");

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _reactPlaidLink = require("react-plaid-link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConnectionTypes(_ref) {
  let {
    token,
    setShowMicroDeposits,
    onSuccess
  } = _ref;
  const link_config = {
    token: token,
    onSuccess: onSuccess
  };
  const {
    open,
    ready,
    error
  } = (0, _reactPlaidLink.usePlaidLink)(link_config);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5",
    style: {
      marginLeft: '9px'
    }
  }, "How would you like to verify?"), /*#__PURE__*/_react.default.createElement(_List.default, {
    component: "nav",
    "aria-label": "main mailbox folders"
  }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true,
    onClick: () => open(),
    disabled: !ready
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_io.IoLogInOutline, {
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Instantly",
    secondary: "Verify using your online bank login credentials"
  })), /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true,
    onClick: () => setShowMicroDeposits(true)
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineBank, {
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Manually",
    secondary: "We'll send you 2 small deposits and ask you to verify the amounts"
  }))));
}

var _default = ConnectionTypes;
exports.default = _default;