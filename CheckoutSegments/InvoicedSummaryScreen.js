"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _formatCurrency = _interopRequireDefault(require("../utils/formatCurrency"));

require("./summaryStyle.css");

var _core = require("@material-ui/core");

var _Loading = _interopRequireDefault(require("../utils/Loading"));

var _contextLib = require("../libs/contextLib");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function InvoicedSummaryScreen(_ref) {
  let {
    userData,
    data,
    onSuccess,
    setShow,
    selectedAccount
  } = _ref;
  const [loading, setLoading] = (0, _react.useState)(false);
  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");
  const {
    key
  } = (0, _contextLib.useAppContext)();

  function formatName(name) {
    let firstLetter = name.slice(0, 1).toUpperCase();
    let restOfName = name.slice(1).toLowerCase();
    return firstLetter.concat(restOfName);
  }

  async function createTransaction() {
    setLoading(true);
    let config = {
      "billToId": data.billtoid,
      "ownerId": data.ownerid,
      "bankAccountId": selectedAccount,
      "invoiceId": data.id,
      "token": key
    };
    console.log(config);
    await _axios.default.post('https://api.vittopayments.com/transfer/pay_existing_invoice', config).then(res => {
      console.log(res);
      setLoading(false);
      setShow(false);
      onSuccess();
    }).catch(err => {
      handleError(parseInt(err.toString().split(" ")[6]));
      setLoading(false);
    });
  }

  function handleError(status) {
    console.log(status);

    if (status !== 200 && status !== 201) {
      setAlert(true);

      if (status === 400) {
        if (data.total >= 5000) setAlertText('This transaction excceds your account limit of $5000 per transaction.');else setAlertText('This transaction excceds your weekly payment limit.');
      } else {
        setAlertText('An unexpected error has occured, please try again later.');
      }
    }
  }

  return loading ? /*#__PURE__*/_react.default.createElement(_Loading.default, null) : /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2
  }, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    style: {
      marginTop: '20px',
      marginLeft: '14px'
    },
    severity: "error"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Card, {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: "card-content-summary"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '17.5px',
      fontWeight: '500'
    }
  }, "Personal Information"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '5px'
    }
  }, formatName(userData.firstName), " ", formatName(userData.lastName), userData.address && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, userData.address.address1 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), " ", userData.address.address1), userData.address.address2 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), " ", userData.address.address2), /*#__PURE__*/_react.default.createElement("br", null), userData.address.city, " ", userData.address.state, " ", userData.address.zipCode))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Card, {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: "card-content-summary"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '17.5px'
    }
  }, "Summary"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-left"
  }, "Subtotal")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-right"
  }, (0, _formatCurrency.default)(data.subtotal)))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-left"
  }, "Shipping")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-right"
  }, (0, _formatCurrency.default)(data.shipping)))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-left"
  }, "Est. Tax")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-right"
  }, (0, _formatCurrency.default)(data.tax)))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-left"
  }, "Total")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "summary-text-right"
  }, (0, _formatCurrency.default)(data.total))))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Card, null, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: "card-content-summary"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '17.5px'
    }
  }, "Payment"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline",
    style: {
      marginBottom: '0px',
      marginTop: '-2px'
    }
  }, "Payment Method"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginBottom: '5px',
      marginTop: '-5px'
    }
  }, "Bank Transfer "), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline",
    style: {
      marginBottom: '0px'
    }
  }, "Receipt"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginBottom: '0px',
      marginTop: '-5px'
    }
  }, "We'll send a receipt to ", userData.email))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    size: "medium",
    onClick: () => createTransaction(),
    style: {
      marginTop: '12px'
    },
    variant: "contained"
  }, "Confirm"))));
}

var _default = InvoicedSummaryScreen;
exports.default = _default;