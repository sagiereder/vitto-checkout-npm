"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _core = require("@material-ui/core");

var _contextLib = require("../libs/contextLib");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function CollectInformation(_ref) {
  let {
    data,
    userData,
    setUserData,
    setStep,
    open
  } = _ref;
  const [firstName, setFirstName] = (0, _react.useState)("");
  const [lastName, setLastName] = (0, _react.useState)("");
  const [email, setEmail] = (0, _react.useState)("");
  const [alert, setAlert] = (0, _react.useState)(false);
  const [alertText, setAlertText] = (0, _react.useState)("");
  const {
    ownerid
  } = (0, _contextLib.useAppContext)();
  (0, _react.useEffect)(() => {
    if (userData.firstName) setFirstName(userData.firstName);
    if (userData.lastName) setLastName(userData.lastName);
    if (userData.email) setEmail(userData.email);
  }, [userData]);

  async function handleClick() {
    if (email === "" || lastName === "" || firstName === "") {
      setAlert(true);
      setAlertText("Please enter all required fields.");
      return;
    }

    console.log(email); // leave it here! for some reason?

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(email).toLowerCase())) {
      setAlert(true);
      setAlertText("Please enter a valid Email Address.");
      return;
    }

    window.analytics.identify(ownerid, {
      email: email
    });
    window.analytics.track('personalInformationAdded', {
      source: 'checkout'
    });
    let user_data = userData;

    if (email) {
      user_data.email = email.toLowerCase();
    }

    if (firstName) {
      user_data.firstName = firstName;
    }

    if (lastName) {
      user_data.lastName = lastName;
    }

    setUserData(user_data);
    await open();
    if (data.requireAddress) setStep('address');else setStep(1);
  }

  return /*#__PURE__*/_react.default.createElement(_core.DialogContent, null, alert && /*#__PURE__*/_react.default.createElement(_core.Alert, {
    severity: "error"
  }, alertText), /*#__PURE__*/_react.default.createElement(_core.Typography, {
    variant: "h6",
    style: {
      marginBottom: "-2px",
      fontWeight: '400'
    }
  }, "Personal Information"), /*#__PURE__*/_react.default.createElement(_core.Grid, {
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
    value: firstName,
    onChange: e => setFirstName(e.target.value),
    fullWidth: true,
    label: "First Name"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    required: true,
    variant: "standard",
    value: lastName,
    onChange: e => setLastName(e.target.value),
    fullWidth: true,
    label: "Last Name"
  })), /*#__PURE__*/_react.default.createElement(_core.Grid, {
    item: true,
    md: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement(_core.TextField, {
    required: true,
    variant: "standard",
    value: email,
    onChange: e => setEmail(e.target.value),
    fullWidth: true,
    label: "Email"
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