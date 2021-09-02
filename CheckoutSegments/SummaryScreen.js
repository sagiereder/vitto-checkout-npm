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

var _core = require("@material-ui/core");

var _styles = require("@material-ui/styles");

var _Loading = _interopRequireDefault(require("../utils/Loading"));

var _contextLib = require("../libs/contextLib");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function SummaryScreen(_ref) {
  let {
    userData,
    data,
    bankVerified,
    total,
    subtotal,
    tax,
    onSuccess,
    setShow,
    id,
    selectedAccount
  } = _ref;
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    key,
    ownerid
  } = (0, _contextLib.useAppContext)(); //alert

  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");
  const useStyles = (0, _styles.makeStyles)({
    summaryTextLeft: {
      textAlign: 'left',
      marginBottom: '5px',
      marginTop: '0'
    },
    summaryTextRight: {
      textAlign: 'right',
      marginBottom: '5px',
      marginTop: '0'
    },
    cardContentSummary: {
      padding: '8px 11px 8px 11px !important'
    }
  });
  const {
    summaryTextLeft,
    summaryTextRight,
    cardContentSummary
  } = useStyles();

  function formatName(name) {
    if (!name) {
      return "";
    }

    let firstLetter = name.slice(0, 1).toUpperCase();
    let restOfName = name.slice(1).toLowerCase();
    return firstLetter.concat(restOfName);
  }

  async function createTransaction() {
    setLoading(true);
    let invoiceData = data;
    invoiceData.total = total;
    invoiceData.shippingAddress = userData.address;
    invoiceData.shipping = data.shipping;
    invoiceData.subtotal = calcSubtotal();
    invoiceData.tax = tax;

    if (!bankVerified) {
      let config = _objectSpread({
        "billToId": ownerid,
        "ownerId": id
      }, invoiceData);

      console.log(config);
      await _axios.default.post('https://api.vittopayments.com/invoices/create', config).then(res => {
        console.log(res);
        setLoading(false);
        setShow(false);
        onSuccess();
      }).catch(err => {
        console.log(err);
        setLoading(false);
        setAlert(true);
        setAlertText('An unexpected error has occured, please try again later.');
      });
      return;
    }

    let config = {
      "billToId": ownerid,
      "ownerId": id,
      "bankAccountId": selectedAccount,
      "data": invoiceData,
      "token": key
    };
    console.log(config);
    await _axios.default.post('https://api.vittopayments.com/transfer/create_transaction', config).then(res => {
      console.log(res);
      window.analytics.track('onPayment', {
        amount: total,
        source: 'checkout'
      });
      setLoading(false);
      setShow(false);
      onSuccess();
    }).catch(err => {
      console.log(err);
      setLoading(false);
      handleError(parseInt(err.toString().split(" ")[6]));
    });
  }

  function handleError(status) {
    console.log(status);

    if (status !== 200 && status !== 201) {
      setAlert(true);

      if (status === 400) {
        if (total >= 5000) setAlertText('This transaction exceeds your account limit of $5000 per transaction.');else setAlertText('This transaction exceeds your weekly payment limit.');
      } else {
        setAlertText('An unexpected error has occurred, please try again later.');
      }
    }
  }

  const calcSubtotal = () => {
    if (data.shipping && !isNaN(data.shipping)) return parseFloat(subtotal) - parseFloat(data.shipping);
    return subtotal;
  };

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
    className: cardContentSummary
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '18.5px'
    }
  }, "Shipping"), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '2.5px'
    }
  }, formatName(userData.firstName), " ", formatName(userData.lastName)), userData.address && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '0'
    }
  }, userData.address.address), userData.address.address2 && /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '0'
    }
  }, userData.address.address2), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '0'
    }
  }, userData.address.city), /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginTop: '0',
      marginBottom: '0'
    }
  }, " ", userData.address.state, " ", userData.address.zipCode))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Card, {
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: cardContentSummary
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '18.5px'
    }
  }, "Summary"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextLeft
  }, "Subtotal")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextRight
  }, (0, _formatCurrency.default)(calcSubtotal())))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextLeft
  }, "Shipping")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextRight
  }, (0, _formatCurrency.default)(data.shipping)))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextLeft
  }, "Est. Tax")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextRight
  }, (0, _formatCurrency.default)(tax)))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextLeft
  }, "Total")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: summaryTextRight
  }, (0, _formatCurrency.default)(total))))))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Card, null, /*#__PURE__*/_react.default.createElement(_core.CardContent, {
    className: cardContentSummary
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      fontSize: '18.5px'
    }
  }, "Payment"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "overline",
    style: {
      marginBottom: '0px',
      marginTop: '-2px'
    }
  }, "Payment Method"), !bankVerified ? /*#__PURE__*/_react.default.createElement("p", {
    style: {
      marginBottom: '5px',
      marginTop: '-5px'
    }
  }, "Bank Transfer - we'll bill you when you verify your account ") : /*#__PURE__*/_react.default.createElement("p", {
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

var _default = SummaryScreen;
exports.default = _default;