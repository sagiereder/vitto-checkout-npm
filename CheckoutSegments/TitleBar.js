"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _DialogTitle = _interopRequireDefault(require("@material-ui/core/DialogTitle"));

var _io = require("react-icons/io5");

var _makeStyles = _interopRequireDefault(require("@material-ui/styles/makeStyles"));

var _formatCurrency = _interopRequireDefault(require("../utils/formatCurrency"));

require("./style.css");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function TitleBar(_ref) {
  let {
    id,
    data,
    propUserData,
    userData,
    handleClose,
    total,
    step,
    setStep,
    showMicroDeposits,
    setShowMicroDeposits,
    accounts
  } = _ref;
  const [custom, setCustom] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    if (!custom) {
      getCustom();
    }
  }, []);

  function getCustom() {
    const config = {
      method: 'post',
      url: 'https://api.vittopayments.com/users/get_custom',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: id
      }
    };
    (0, _axios.default)(config).then(res => {
      console.log(res);
      setCustom(res.data); //get customazionions of user.
    }).catch(err => console.log(err));
  }

  function back() {
    if (typeof step === "number") {
      if (showMicroDeposits && step === 3) {
        setShowMicroDeposits(false);
        return;
      }

      if (step === 3 || step === 2 || step === 4 && accounts.length > 0) {
        setStep('select');
        return;
      }

      if (step === 1) {
        if (propUserData !== userData) {
          if (data.requireAddress) setStep('address');else setStep('info');
          return;
        } else {
          handleClose();
          return;
        }
      } else {
        setStep(step - 1);
        return;
      }
    } else {
      switch (step) {
        case 'select':
          setStep(1);

        case 'verify':
          setStep(1);
          return;

        case 'info':
          handleClose();
          return;

        case 'address':
          setStep('info');
          return;

        case 'micro':
          setStep('select');
          return;
      }
    }
  }

  function logo() {
    if (custom && custom.imageUrl) return /*#__PURE__*/_react.default.createElement("img", {
      height: "35px",
      src: custom.imageUrl
    });else if (custom) return /*#__PURE__*/_react.default.createElement(_Typography.default, {
      variant: "h6",
      style: {
        fontSize: '16px',
        marginTop: '4px'
      }
    }, custom.name);
  }

  return /*#__PURE__*/_react.default.createElement(_DialogTitle.default, {
    className: "form-dialog-title"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    alignItems: "center",
    direction: "row"
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "options-text",
    style: {
      textAlign: 'left',
      marginBottom: '0',
      marginLeft: '0'
    }
  }, /*#__PURE__*/_react.default.createElement(_Button.default, {
    style: {
      marginBottom: '-5px'
    },
    onClick: () => back()
  }, /*#__PURE__*/_react.default.createElement(_io.IoChevronBackOutline, {
    size: 20,
    style: {
      marginBottom: '1px',
      marginLeft: '-2px'
    }
  }), "Back"))), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react.default.createElement("p", {
    style: {
      textAlign: 'center',
      marginTop: '-4px',
      marginBottom: '0',
      height: '35px'
    }
  }, logo())), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    xs: 4
  }, /*#__PURE__*/_react.default.createElement("p", {
    className: "options-text",
    style: {
      textAlign: 'right',
      marginBottom: '0'
    }
  }, (0, _formatCurrency.default)(total)))));
}

var _default = TitleBar;
exports.default = _default;