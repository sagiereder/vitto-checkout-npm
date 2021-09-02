"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _List = _interopRequireDefault(require("@material-ui/core/List"));

var _ListItem = _interopRequireDefault(require("@material-ui/core/ListItem"));

var _ListItemIcon = _interopRequireDefault(require("@material-ui/core/ListItemIcon"));

var _ListItemText = _interopRequireDefault(require("@material-ui/core/ListItemText"));

var _core = require("@material-ui/core");

var _io = require("react-icons/io5");

var _axios = _interopRequireDefault(require("axios"));

var _contextLib = require("../libs/contextLib");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function OptionsScreen(_ref) {
  let {
    setStep,
    accounts,
    total,
    subtotal,
    tax,
    id,
    data,
    userData
  } = _ref;
  const {
    ownerid
  } = (0, _contextLib.useAppContext)();
  const [show, setShow] = (0, _react.useState)(false);

  const nextStep = () => {
    if (accounts.length > 0) setStep('verify');else setStep(2);
  };

  async function handleInvoice() {
    let invoiceData = {
      ownerid: id,
      billtoid: ownerid,
      items: data.items,
      subtotal: subtotal,
      total: total
    };
    if (data.shipping) invoiceData.shipping = data.shipping;
    if (tax !== 0) invoiceData.tax = tax;
    console.log(invoiceData);
    await _axios.default.post('https://api.vittopayments.com/invoices/create', invoiceData).then(res => {
      console.log(res);
      setShow(true);
    }, err => console.log(err));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, show && /*#__PURE__*/_react.default.createElement(_core.Alert, null, "We Just sent you an invoice to ", userData.email, "!"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5",
    style: {
      marginLeft: '9px'
    }
  }, "How would you like to pay?"), /*#__PURE__*/_react.default.createElement(_List.default, {
    component: "nav",
    "aria-label": "payment options"
  }, /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    button: true,
    onClick: () => nextStep()
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, /*#__PURE__*/_react.default.createElement(_io.IoCashOutline, {
    size: 20
  })), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: "Bank Transfer"
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Link, {
    onClick: () => handleInvoice(),
    style: {
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center'
    }
  }, "Do you need an invoice?")))));
}

var _default = OptionsScreen;
exports.default = _default;