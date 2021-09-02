"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppContext = useAppContext;
exports.AppContext = void 0;

var _react = require("react");

const AppContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.AppContext = AppContext;

function useAppContext() {
  return (0, _react.useContext)(AppContext);
}