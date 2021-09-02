"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _CheckoutContent = _interopRequireDefault(require("../CheckoutSegments/CheckoutContent"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Dialog = _interopRequireDefault(require("@material-ui/core/Dialog"));

var _axios = _interopRequireDefault(require("axios"));

var _contextLib = require("../libs/contextLib");

var _io = require("react-icons/io5");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Checkout(_ref) {
  let {
    id,
    data,
    userData,
    onSuccess,
    onExit
  } = _ref;
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

  const [successful, setSuccessful] = (0, _react.useState)(false);
  const [show, setShow] = (0, _react.useState)(false);
  const [step, setStep] = (0, _react.useState)(null);
  const [bankVerified, setBankVerified] = (0, _react.useState)(false);
  const [accounts, setAccounts] = (0, _react.useState)([]);
  const [subtotal, setSubtotal] = (0, _react.useState)(0);
  const [tax, setTax] = (0, _react.useState)(0);
  const [total, setTotal] = (0, _react.useState)(0);
  const [stateUserData, setStateUserData] = (0, _react.useState)(null);

  async function calcTax(subtotalCalc) {
    //calcalute precentage based tax with the subtotal
    await _axios.default.post('https://api.vittopayments.com/users/get_tax_rate', {
      id: id
    }).then(res => {
      setTax(parseFloat(res.data) * subtotalCalc);
      setTotal(subtotalCalc + parseFloat(res.data) * subtotalCalc);
    }).catch(err => console.log(err));
  }

  (0, _react.useEffect)(() => {
    if (!userData.email) setStep('info');else {
      if (!userData.address && data.requireAddress === true) setStep(3);else setStep(1);
    }
  }, [userData]);
  (0, _react.useEffect)(() => {
    console.log(data);
    setStateUserData(userData);
    let subtotalCalc = 0;

    if (data.shipping) {
      subtotalCalc += parseFloat(data.shipping);
    }

    for (let i = 0; i < data.items.length; i++) {
      subtotalCalc += parseFloat(data.items[i].total);
    }

    setSubtotal(subtotalCalc);

    if (data.tax && parseFloat(data.tax) !== 0) {
      setTax(data.tax);
      setTotal(subtotalCalc + data.tax);
    } else {
      calcTax(subtotalCalc);
    }
  }, [data, userData]);

  const open = () => {
    window.analytics.track('onLoad', {
      source: 'checkout'
    });
    onOpen();
    setShow(true);
  };

  async function onOpen() {
    await _axios.default.post('https://api.vittopayments.com/checkout/create', stateUserData).then(res => {
      console.log(res);
      setOwnerid(res.data[1]);

      if (res.data[0] === "exists" && res.data[3].length > 0) {
        setAccounts(res.data[3]);
      }
    }).catch(err => {
      console.log(err.message, err); //setcollectInformation(true);
    });
  }

  const handleClose = () => {
    setShow(false);

    if (successful) {
      if (typeof onSuccess === "function") {
        onSuccess();
      }
    } else {
      if (typeof onExit === "function") {
        onExit();
      }
    }
  };

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
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    startIcon: /*#__PURE__*/_react.default.createElement(_io.IoBagCheckOutline, null),
    size: "large",
    variant: "contained",
    onClick: () => open()
  }, "Checkout"), /*#__PURE__*/_react.default.createElement(_Dialog.default, {
    fullWidth: true,
    maxWidth: 'xs',
    open: show,
    onClose: handleClose,
    "aria-labelledby": "form-dialog-title"
  }, /*#__PURE__*/_react.default.createElement(_CheckoutContent.default, {
    open: onOpen,
    onSuccess: onSuccess,
    setShow: setShow,
    id: id,
    subtotal: subtotal,
    total: total,
    tax: tax,
    setBankVerified: setBankVerified,
    accounts: accounts,
    bankVerified: bankVerified,
    step: step,
    setStep: setStep,
    data: data,
    propUserData: userData,
    userData: stateUserData,
    setUserData: setStateUserData,
    handleClose: handleClose
  }))));
}

var _default = Checkout;
exports.default = _default;