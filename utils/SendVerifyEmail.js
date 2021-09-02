"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleVerify;

require("core-js/modules/es.promise.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function handleVerify(userId, username, setAlert, setAlertText) {
  setAlert(false);
  console.log('send email');
  var payload = {
    "id": userId,
    "username": username.toLowerCase()
  };
  var config = {
    method: 'post',
    url: 'https://api.vittopayments.com/checkout/send_verify_email',
    headers: {
      'Content-Type': 'application/json'
    },
    data: payload
  };
  console.log(payload);
  await (0, _axios.default)(config).then(function (response) {
    console.log(response);

    if (response.status === 200) {//setSuccessfull(true);
    }
  }).catch(function (e) {
    setAlert(true);
    setAlertText("Unexpected error has occured, please try again later.");
  });
}