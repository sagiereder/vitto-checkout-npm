"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _axios = _interopRequireDefault(require("axios"));

var _contextLib = require("../libs/contextLib");

var _core = require("@material-ui/core");

var _Loading = _interopRequireDefault(require("../utils/Loading"));

var _MicroDepositInfo = _interopRequireDefault(require("./MicroDeposits/MicroDepositInfo"));

var _ConnectionTypes = _interopRequireDefault(require("./ConnectionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ConnectBank(_ref) {
  let {
    refresh,
    setStep,
    accounts,
    showMicroDeposits,
    setShowMicroDeposits,
    setBankVerified
  } = _ref;
  const {
    key,
    ownerid,
    setKey
  } = (0, _contextLib.useAppContext)(); //general

  const [token, setToken] = (0, _react.useState)(""); //visual

  const [loading, setLoading] = (0, _react.useState)(false);
  const [success, setSuccess] = (0, _react.useState)(false); //alert

  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");

  async function sendToken(token, metadata) {
    console.log(token);
    let config = {
      method: 'post',
      url: 'https://api.vittopayments.com/bank/post_token_checkout',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: ownerid,
        token: token,
        plaidAccountId: metadata.accounts[0].id
      }
    };
    await (0, _axios.default)(config).then(res => {
      console.log(res);
      createCheckout('plaid');
    }).catch(function (error) {
      console.log(error);
    });
  }

  async function createCheckout(type, routingNumber, accountNumber) {
    setLoading(true);
    let config = {
      method: 'post',
      url: 'https://api.vittopayments.com/transfer/create_checkout',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: ownerid,
        type: type
      }
    };

    if (type !== "plaid") {
      config.data.routingNumber = routingNumber;
      config.data.accountNumber = accountNumber;
    }

    console.log(config.data);
    await (0, _axios.default)(config).then(res => {
      console.log(res);

      if (res.data.status === 201) {
        setLoading(false);
        refresh();
        window.analytics.track('bankAccountCreated', {
          type: type,
          source: 'checkout'
        });

        if (type === "plaid") {
          setStep(4);
          window.analytics.track('bankAccountVerified', {
            type: 'plaid',
            source: 'checkout'
          });
          setBankVerified(true);
          if (res.token.key) setKey(res.data.token);
        } else setSuccess(true);
      } else {
        setLoading(false);

        if (type !== "plaid") {
          setSuccess(null);
          setShowMicroDeposits(false);
        }

        if (res.data.status === 400 && accounts.length > 0) {
          setAlert(true);
          setAlertText('This bank account is already connected.');
        } else if (res.data.status === 400 && accounts.length === 0) {
          setAlert(true);
          setAlertText('Bank account is invalid.');
        } else {
          setAlert(true);
          setAlertText('An unexpected error has occurred, please try again later.');
        }
      }
    }).catch(function (error) {
      setLoading(false);
      console.log(error);
    });
  }

  function getLink() {
    let config = {
      method: 'post',
      url: 'https://api.vittopayments.com/bank/get_link_token',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: ownerid
      }
    };
    console.log(ownerid);
    (0, _axios.default)(config).then(res => {
      console.log(res);
      console.log(res.data.link_token);
      setToken(res.data.link_token);
      setLoading(false); // Send the public_token to your app server.
      //$.post('/get_access_token', {
      //    public_token: public_token,
      //});
    }).catch(function (error) {
      console.log(error);
    });
  } //onload


  (0, _react.useEffect)(() => {
    setLoading(true);
    getLink();
  }, []); //plaid link handler

  const onSuccess = (0, _react.useCallback)((token, metadata) => {
    // send token to server
    sendToken(token, metadata);
  }, []);
  return loading ? /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, /*#__PURE__*/_react.default.createElement(_Loading.default, null)) : showMicroDeposits ? /*#__PURE__*/_react.default.createElement(_MicroDepositInfo.default, {
    setStep: setStep,
    success: success,
    onClick: createCheckout
  }) : /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), token !== "" && /*#__PURE__*/_react.default.createElement(_ConnectionTypes.default, {
    token: token,
    onSuccess: onSuccess,
    setShowMicroDeposits: setShowMicroDeposits
  }));
}

var _default = ConnectBank;
exports.default = _default;