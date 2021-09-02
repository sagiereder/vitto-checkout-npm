"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _contextLib = require("../libs/contextLib");

var _axios = _interopRequireDefault(require("axios"));

var _core = require("@material-ui/core");

var _Loading = _interopRequireDefault(require("../utils/Loading"));

var _ai = require("react-icons/ai");

var _MicroDepositVerify = _interopRequireDefault(require("../CheckoutSegments/MicroDeposits/MicroDepositVerify"));

var _MicroDepositSuccess = _interopRequireDefault(require("../CheckoutSegments/MicroDeposits/MicroDepositSuccess"));

var _SelectAccount = _interopRequireDefault(require("../CheckoutSegments/SelectAccount"));

var _VerifyEmail = _interopRequireDefault(require("../CheckoutSegments/VerifyEmail"));

var _InvoicedSummaryScreen = _interopRequireDefault(require("../CheckoutSegments/InvoicedSummaryScreen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//steps
function VerifyBankAccount() {
  const [ownerid, setOwnerid] = useStickyState("", "id");
  const [key, setKey] = useStickyState("", "key");

  function useStickyState(defaultValue, key) {
    const [value, setValue] = (0, _react.useState)(() => {
      const stickyValue = window.sessionStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    });
    (0, _react.useEffect)(() => {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const {
    id
  } = (0, _reactRouterDom.useParams)();
  const [user, setUser] = (0, _react.useState)(false);
  const [invoice, setInvoice] = (0, _react.useState)(false);
  const [show, setShow] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(false);
  const [success, setSuccess] = (0, _react.useState)(false);
  const [step, setStep] = (0, _react.useState)(0);
  const [selectedAccount, setSelectedAccount] = (0, _react.useState)(null);
  const [accounts, setAccounts] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // X
    setSuccess(false);
    getData();
  }, []);

  async function getData() {
    console.log('get data');
    await _axios.default.get('https://api.vittopayments.com/checkout/get_checkout?id=' + id).then(res => {
      console.log(res);
      setUser(res.data.user);
      setInvoice(res.data.invoice);
      setAccounts(res.data.accounts);
      setShow(true);
    }).catch(err => setError(true));
  }

  function content() {
    switch (step) {
      case 0:
        return /*#__PURE__*/_react.default.createElement(_VerifyEmail.default, {
          setStep: setStep,
          userData: user
        });
      // => Select

      case 'select':
        return /*#__PURE__*/_react.default.createElement(_SelectAccount.default, {
          hideNew: true,
          accounts: accounts,
          setSelectedAccount: setSelectedAccount,
          setStep: setStep,
          setBankVerified: value => null
        });
      // => MDI / Summary

      case 'micro':
        return /*#__PURE__*/_react.default.createElement(_MicroDepositVerify.default, {
          selectedAccount: selectedAccount,
          setStep: setStep,
          setBankVerified: value => null
        });
      //=> Summary

      case 4:
        return /*#__PURE__*/_react.default.createElement(_InvoicedSummaryScreen.default, {
          userData: user,
          data: invoice,
          onSuccess: onSuccess,
          setShow: setShow,
          selectedAccount: selectedAccount
        });
      // => Success Screen
    }
  }

  function onSuccess() {
    setSuccess(true);
    setShow(false);
  }

  (0, _react.useEffect)(() => {
    var analytics = window.analytics = window.analytics || [];
    if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");else {
      analytics.invoked = !0;
      analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on", "addSourceMiddleware", "addIntegrationMiddleware", "setAnonymousId", "addDestinationMiddleware"];

      analytics.factory = function (e) {
        return function () {
          var t = Array.prototype.slice.call(arguments);
          t.unshift(e);
          analytics.push(t);
          return analytics;
        };
      };

      for (var e = 0; e < analytics.methods.length; e++) {
        var key = analytics.methods[e];
        analytics[key] = analytics.factory(key);
      }

      analytics.load = function (key, e) {
        var t = document.createElement("script");
        t.type = "text/javascript";
        t.async = !0;
        t.src = "https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(t, n);
        analytics._loadOptions = e;
      };

      analytics._writeKey = "5AnwWQ5uSDfWGtgdhvhGQFt4ZnMgtBRB";
      analytics.SNIPPET_VERSION = "4.13.2";
      analytics.load("5AnwWQ5uSDfWGtgdhvhGQFt4ZnMgtBRB");
      analytics.page();
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement("link", {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
  }), /*#__PURE__*/_react.default.createElement(_contextLib.AppContext.Provider, {
    value: {
      ownerid,
      setOwnerid,
      key,
      setKey
    }
  }, !success && !show && !error && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '50px 50px 50px 50px'
    }
  }, /*#__PURE__*/_react.default.createElement(_Loading.default, null)), !success && !show && error && /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: '50px 50px 50px 50px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, "Sorry, The link you used is invalid.")), success && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    style: {
      marginTop: '30px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineCheck, {
    style: {
      color: 'green'
    },
    size: 90
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    style: {
      marginTop: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: "text-center",
    variant: "h4"
  }, "Thank you for your purchase!"), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    className: "text-center",
    variant: "body1"
  }, "Thank you for your purchase, we hope to see you more in the future :)!")))), /*#__PURE__*/_react.default.createElement(_core.Dialog, {
    fullWidth: true,
    maxWidth: 'xs',
    open: show,
    onClose: () => setShow(false),
    "aria-labelledby": "form-dialog-title"
  }, content())));
}

var _default = VerifyBankAccount;
exports.default = _default;