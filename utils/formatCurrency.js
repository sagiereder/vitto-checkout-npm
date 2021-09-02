"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.number.to-fixed.js");

function formatCurrency(x) {
  if (typeof x === "undefined") {
    return "$0.00";
  }

  x = x.toString();
  x = x.replace("$", "").replace(",", "");
  let formattedx = parseFloat(x).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (Number.isNaN(parseFloat(x))) {
    return "$0.00";
  } else {
    return "$" + formattedx;
  }
}

var _default = formatCurrency;
exports.default = _default;