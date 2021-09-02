"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _UsStates = _interopRequireDefault(require("../utils/UsStates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CollectInformation(_ref) {
  let {
    data,
    userData,
    setUserData,
    setStep
  } = _ref;
  const [address, setAddress] = (0, _react.useState)("");
  const [address2, setAddress2] = (0, _react.useState)("");
  const [city, setCity] = (0, _react.useState)("");
  const [state, setState] = (0, _react.useState)(null);
  const [zip, setZip] = (0, _react.useState)("");
  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");

  function handleClick() {
    setAlert(false);

    if (address === "" || city === "" || zip === "" || !state) {
      setAlert(true);
      setAlertText("Please enter all required fields.");
      return;
    }

    let userAddress = {
      address: address,
      city: city,
      zip: zip,
      state: state.label
    };

    if (address2 !== "") {
      address.address2 = address2;
    }

    setUserData(_objectSpread(_objectSpread({}, userData), {}, {
      address: userAddress
    }));
    setStep(1);
  }

  return /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      marginBottom: "-2px",
      fontWeight: '400'
    }
  }, "Shipping address"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    container: true,
    justifyContent: "center",
    spacing: 2
  }, /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    required: true,
    variant: "standard",
    value: address,
    onChange: e => setAddress(e.target.value),
    fullWidth: true,
    label: "Address"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    variant: "standard",
    value: address2,
    onChange: e => setAddress2(e.target.value),
    fullWidth: true,
    label: "Aprtmant, Suite, etc. (optional)"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    required: true,
    variant: "standard",
    value: city,
    onChange: e => setCity(e.target.value),
    fullWidth: true,
    label: "City"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 6,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    required: true,
    variant: "standard",
    value: zip,
    onChange: e => setZip(e.target.value),
    fullWidth: true,
    label: "Zip Code"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 6,
    xs: 6
  }, /*#__PURE__*/_react.default.createElement(_core.Autocomplete, {
    freeSolo: true,
    options: _UsStates.default,
    value: state,
    renderInput: params => /*#__PURE__*/_react.default.createElement(_core.TextField, _extends({
      required: true,
      inputProps: {
        type: 'search'
      },
      variant: "standard"
    }, params, {
      label: "State"
    })),
    onChange: (event, newValue) => {
      console.log(newValue);
      setState(newValue);
    }
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    style: {
      marginTop: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement(_core.Button, {
    onClick: () => handleClick(),
    variant: "contained",
    fullWidth: true
  }, "Continue"))));
}

var _default = CollectInformation;
exports.default = _default;