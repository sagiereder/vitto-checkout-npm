"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _DialogContent = _interopRequireDefault(require("@material-ui/core/DialogContent"));

var _SendVerifyEmail = _interopRequireDefault(require("../utils/SendVerifyEmail"));

var _core = require("@material-ui/core");

var _reactInputMask = _interopRequireDefault(require("react-input-mask"));

var _axios = _interopRequireDefault(require("axios"));

var _contextLib = require("../libs/contextLib");

require("./verify.css");

var _io = require("react-icons/io5");

var _Loading = _interopRequireDefault(require("../utils/Loading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function VerifyEmail(_ref) {
  let {
    setStep,
    userData
  } = _ref;
  let {
    ownerid,
    setKey
  } = (0, _contextLib.useAppContext)(); //alert

  const [loading, setLoading] = (0, _react.useState)(false);
  const [err, setErr] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)(""); //data 

  const [code, setCode] = (0, _react.useState)("");
  const [retry, setRetry] = (0, _react.useState)(true);

  const errorColor = () => {
    if (err) return 'red';
    return 'black';
  };

  (0, _react.useLayoutEffect)(() => {
    setAlertText("");
    (0, _SendVerifyEmail.default)(ownerid, userData.email, setErr, setAlertText);
  }, []);

  async function handleConfirm() {
    setAlertText("");
    setLoading(true);

    if (code === "") {
      setErr(true);
      setAlertText("Please enter the code your received.");
    }

    var payload = {
      "id": ownerid,
      "code": code,
      "checkout": true
    };
    var config = {
      method: 'post',
      url: 'https://api.vittopayments.com/users/verify_email',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };
    console.log(payload);
    await (0, _axios.default)(config).then(function (response) {
      console.log(response);
      setLoading(false);

      if (response.status === 200) {
        setKey(response.data);
        window.analytics.track('emailVerified', {
          source: 'checkout',
          id: ownerid
        });
        setStep('select');
      } else {
        setErr(true);
        setAlertText("The code you entered is incorrect.");
      }
    }).catch(function (e) {
      setLoading(false);
      console.log(e);
      setErr(true);
      setAlertText("The code you entered is incorrect.");
    });
  }

  function resendCode() {
    (0, _SendVerifyEmail.default)(ownerid, userData.email, setErr, setAlertText);
    setRetry(false);
  }

  return loading ? /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, /*#__PURE__*/_react.default.createElement(_Loading.default, null)) : /*#__PURE__*/_react.default.createElement(_DialogContent.default, null, err && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), !retry && !err && /*#__PURE__*/_react.default.createElement(_core.Alert, null, "We sent you a new code"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_io.IoMailOutline, {
    size: 40
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    xs: 12,
    md: 12
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h5",
    className: "text-center"
  }, "Welcome Back, ", userData.firstName), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body2",
    className: "text-center",
    style: {
      marginBottom: '10px'
    }
  }, "Enter the code you received at ", userData.email, " ", /*#__PURE__*/_react.default.createElement("br", null), " to use your saved payment methods"))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_reactInputMask.default, {
    mask: "999999",
    value: code,
    onChange: e => setCode(e.target.value),
    maskPlaceholder: "_",
    alwaysShowMask: true
  }, () => /*#__PURE__*/_react.default.createElement(_core.InputBase, {
    style: {
      color: errorColor()
    },
    className: "code-input"
  })))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    size: "medium",
    onClick: handleConfirm,
    style: {
      marginTop: '10px'
    },
    variant: "contained"
  }, "Confirm"))), retry && /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    style: {
      marginTop: '7px',
      marginBottom: '-8px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Link, {
    onClick: resendCode,
    style: {
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center'
    }
  }, "Didn't receive a code?"))));
}

var _default = VerifyEmail;
exports.default = _default;