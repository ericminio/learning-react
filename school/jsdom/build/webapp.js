(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = App;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function cov_e71ianx1z() {
  var path = "/Users/ericmignot/work/github.com/ericminio/learning-react/school/jsdom/app/client/App.tsx";
  var hash = "e57e75b21308a1dc258587188a88a212d65524df";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ericmignot/work/github.com/ericminio/learning-react/school/jsdom/app/client/App.tsx",
    statementMap: {
      "0": {
        start: {
          line: 8,
          column: 28
        },
        end: {
          line: 8,
          column: 44
        }
      },
      "1": {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 16,
          column: 11
        }
      },
      "2": {
        start: {
          line: 11,
          column: 8
        },
        end: {
          line: 15,
          column: 15
        }
      },
      "3": {
        start: {
          line: 12,
          column: 32
        },
        end: {
          line: 12,
          column: 47
        }
      },
      "4": {
        start: {
          line: 14,
          column: 16
        },
        end: {
          line: 14,
          column: 34
        }
      },
      "5": {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 48
        }
      }
    },
    fnMap: {
      "0": {
        name: "App",
        decl: {
          start: {
            line: 7,
            column: 16
          },
          end: {
            line: 7,
            column: 19
          }
        },
        loc: {
          start: {
            line: 7,
            column: 41
          },
          end: {
            line: 19,
            column: 1
          }
        },
        line: 7
      },
      "1": {
        name: "(anonymous_1)",
        decl: {
          start: {
            line: 10,
            column: 14
          },
          end: {
            line: 10,
            column: 15
          }
        },
        loc: {
          start: {
            line: 10,
            column: 20
          },
          end: {
            line: 16,
            column: 5
          }
        },
        line: 10
      },
      "2": {
        name: "(anonymous_2)",
        decl: {
          start: {
            line: 12,
            column: 18
          },
          end: {
            line: 12,
            column: 19
          }
        },
        loc: {
          start: {
            line: 12,
            column: 32
          },
          end: {
            line: 12,
            column: 47
          }
        },
        line: 12
      },
      "3": {
        name: "(anonymous_3)",
        decl: {
          start: {
            line: 13,
            column: 18
          },
          end: {
            line: 13,
            column: 19
          }
        },
        loc: {
          start: {
            line: 13,
            column: 38
          },
          end: {
            line: 15,
            column: 13
          }
        },
        line: 13
      }
    },
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0
    },
    f: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e57e75b21308a1dc258587188a88a212d65524df"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_e71ianx1z = function cov_e71ianx1z() {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_e71ianx1z();
function App() {
  cov_e71ianx1z().f[0]++;
  var _ref = (cov_e71ianx1z().s[0]++, (0, _react.useState)()),
    _ref2 = _slicedToArray(_ref, 2),
    data = _ref2[0],
    setData = _ref2[1];
  cov_e71ianx1z().s[1]++;
  (0, _react.useEffect)(function () {
    cov_e71ianx1z().f[1]++;
    cov_e71ianx1z().s[2]++;
    fetch('/data').then(function (response) {
      cov_e71ianx1z().f[2]++;
      cov_e71ianx1z().s[3]++;
      return response.json();
    }).then(function (incoming) {
      cov_e71ianx1z().f[3]++;
      cov_e71ianx1z().s[4]++;
      setData(incoming);
    });
  }, []);
  cov_e71ianx1z().s[5]++;
  return /*#__PURE__*/_react["default"].createElement("div", null, "Received: ", data === null || data === void 0 ? void 0 : data.message);
}

},{"react":"react"}],2:[function(require,module,exports){
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _App = require("./App");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function cov_299xl11l09() {
  var path = "/Users/ericmignot/work/github.com/ericminio/learning-react/school/jsdom/app/client/index.tsx";
  var hash = "0bee74ae75854ae1e0a5db664262889450e98645";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/Users/ericmignot/work/github.com/ericminio/learning-react/school/jsdom/app/client/index.tsx",
    statementMap: {
      "0": {
        start: {
          line: 5,
          column: 18
        },
        end: {
          line: 5,
          column: 49
        }
      },
      "1": {
        start: {
          line: 6,
          column: 13
        },
        end: {
          line: 6,
          column: 44
        }
      },
      "2": {
        start: {
          line: 7,
          column: 0
        },
        end: {
          line: 7,
          column: 21
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0,
      "1": 0,
      "2": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "0bee74ae75854ae1e0a5db664262889450e98645"
  };
  var coverage = global[gcv] || (global[gcv] = {});
  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }
  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_299xl11l09 = function cov_299xl11l09() {
      return actualCoverage;
    };
  }
  return actualCoverage;
}
cov_299xl11l09();
var container = (cov_299xl11l09().s[0]++, document.getElementById('root'));
var root = (cov_299xl11l09().s[1]++, _client["default"].createRoot(container));
cov_299xl11l09().s[2]++;
root.render( /*#__PURE__*/_react["default"].createElement(_App.App, null));

},{"./App":1,"react":"react","react-dom/client":"react-dom/client"}]},{},[2]);
