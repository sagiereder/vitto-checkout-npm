"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Checkout = _interopRequireDefault(require("./Components/Checkout"));

var _core = require("@material-ui/core");

var _xps = _interopRequireDefault(require("./media/xps.webp"));

var _ai = require("react-icons/ai");

var _reactPlaidLink = require("react-plaid-link");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function MyCheckout() {
  const [success, setSuccess] = (0, _react.useState)(false);
  const [amount, setAmount] = (0, _react.useState)(1200);
  const [token, setToken] = (0, _react.useState)("");
  const [show, setShow] = (0, _react.useState)(false);

  const onSuccess = () => {
    setSuccess(true);
  };

  return success ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
  }, "Thank you for your purchase, we hope to see you more in the future :)!")))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    style: {
      marginTop: '40px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _xps.default,
    width: "350px"
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "left"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h4"
  }, "Dell XPS 13")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "left"
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body1",
    style: {
      fontSize: '19px',
      marginBottom: '10px'
    }
  }, "Stunningly small. Masterfully designed.")), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "left"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 10
  }, /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "body2"
  }, "13-inch laptop designed with precision engineered details, from stunning materials to minimal footprint, with true unrivaled performance and 11th Gen Intel\xAE Core\u2122 processors."), /*#__PURE__*/_react.default.createElement(_core.TextField, {
    style: {
      marginTop: '15px',
      marginBottom: '15px'
    },
    variant: "standard",
    label: "Total",
    value: amount,
    onChange: e => setAmount(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    spacing: 2,
    style: {
      marginTop: '10px'
    },
    justifyContent: "left"
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true
  }, /*#__PURE__*/_react.default.createElement(_Checkout.default, {
    onSuccess: onSuccess,
    id: "605ce88c9871186495f5e70a",
    data: {
      requireAddress: true,
      items: [{
        item: 'Dell XPS 13',
        price: amount,
        quantity: 1,
        total: amount
      }],
      shipping: 19.99
    },
    userData: {
      firstName: 'Sagie',
      lastName: 'Reder',
      email: ''
    }
  }))))));
}

var _default = MyCheckout;
exports.default = _default;