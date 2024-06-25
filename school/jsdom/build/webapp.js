(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function App() {
  const [data, setData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    fetch('/data').then(response => response.json()).then(incoming => {
      setData(incoming);
    });
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: ["Received: ", data.message]
  });
}

},{"react":"react","react/jsx-runtime":"react/jsx-runtime"}],2:[function(require,module,exports){
"use strict";

var _client = _interopRequireDefault(require("react-dom/client"));
var _App = require("./App");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const container = document.getElementById('root');
_client.default.createRoot(container).render( /*#__PURE__*/(0, _jsxRuntime.jsx)(_App.App, {}));

},{"./App":1,"react-dom/client":"react-dom/client","react/jsx-runtime":"react/jsx-runtime"}]},{},[2]);
