webpackHotUpdate_N_E("pages/team",{

/***/ "./pages/team.js":
/*!***********************!*\
  !*** ./pages/team.js ***!
  \***********************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/utils.module.css */ \"./styles/utils.module.css\");\n/* harmony import */ var _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _team_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./team.module.css */ \"./pages/team.module.css\");\n/* harmony import */ var _team_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_team_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ \"./node_modules/@fortawesome/free-brands-svg-icons/index.es.js\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\nvar _jsxFileName = \"/usr/local/google/home/gehrmann/Documents/GEM-benchmark.github.io/web/pages/team.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n // import Contact from \"../components/contact\";\n\n\n\n\n\n\n\nfunction shuffleArray(array) {\n  var i = array.length - 1;\n\n  for (; i > 0; i--) {\n    var j = Math.floor(Math.random() * (i + 1));\n    var temp = array[i];\n    array[i] = array[j];\n    array[j] = temp;\n  }\n\n  return array;\n}\n\nfunction ContactList(props) {\n  var _this = this;\n\n  // First create contact cards for everyone.\n  var contact_cards = props.contacts.map(function (c, idx) {\n    return __jsx(Contact, {\n      key: idx,\n      name: c.name,\n      position: c.position,\n      organization: c.organization,\n      website: c.website,\n      twitter: c.twitter,\n      note: c.note,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 25,\n        columnNumber: 5\n      }\n    });\n  });\n  console.log(contact_cards); // Then shuffle order in which members are shown.\n\n  var shuffled_contacts = shuffleArray(contact_cards);\n  return __jsx(\"section\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.cards,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 36,\n      columnNumber: 5\n    }\n  }, shuffled_contacts);\n}\n\n_c = ContactList;\n\nfunction Contact(props) {\n  // Optional Website link.\n  var website_tag = \"\";\n\n  if (props.website != '') {\n    website_tag = __jsx(\"a\", {\n      href: props.website,\n      target: \"_blank\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 48,\n        columnNumber: 7\n      }\n    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__[\"FontAwesomeIcon\"], {\n      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__[\"faDribbble\"],\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 48,\n        columnNumber: 47\n      }\n    }), \" Web\");\n  } // Optional Twitter tag.\n\n\n  var twitter_tag = \"\";\n\n  if (props.twitter != '') {\n    var twitter_href = \"https://twitter.com/\" + props.twitter;\n    twitter_tag = __jsx(\"a\", {\n      href: twitter_href,\n      target: \"_blank\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 57,\n        columnNumber: 7\n      }\n    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__[\"FontAwesomeIcon\"], {\n      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__[\"faTwitter\"],\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 57,\n        columnNumber: 46\n      }\n    }), \" Twitter\");\n  }\n\n  return __jsx(\"article\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.card,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 62,\n      columnNumber: 5\n    }\n  }, __jsx(\"h3\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.name,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 63,\n      columnNumber: 7\n    }\n  }, props.name), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 64,\n      columnNumber: 7\n    }\n  }, props.position), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 65,\n      columnNumber: 7\n    }\n  }, props.organization), __jsx(\"p\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 7\n    }\n  }, website_tag, \" \", __jsx(\"span\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.spacer,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 67,\n      columnNumber: 23\n    }\n  }), \" \", twitter_tag), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.note,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 69,\n      columnNumber: 7\n    }\n  }, props.note));\n}\n\n_c2 = Contact;\nvar __N_SSG = true;\nfunction Home(_ref) {\n  var teamData = _ref.teamData;\n  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    home: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 76,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 77,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 78,\n      columnNumber: 9\n    }\n  }, \"GEM Team\")), __jsx(\"article\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 80,\n      columnNumber: 7\n    }\n  }, __jsx(\"div\", {\n    className: _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.headingXl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 81,\n      columnNumber: 9\n    }\n  }, \"Team\"), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 84,\n      columnNumber: 9\n    }\n  }, \"GEM is a community-driven effort with the goal to improve how progress in natural language generation is measured. It would not be possible without a large group of collaborators to take on challenging tasks. This page acts as a directory of our amazing contributors:\"), __jsx(\"div\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.centered,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 9\n    }\n  }, __jsx(ContactList, {\n    contacts: teamData.teamMembers,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 91,\n      columnNumber: 11\n    }\n  }))));\n}\n_c3 = Home;\n\nvar _c, _c2, _c3;\n\n$RefreshReg$(_c, \"ContactList\");\n$RefreshReg$(_c2, \"Contact\");\n$RefreshReg$(_c3, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdGVhbS5qcz82MzI5Il0sIm5hbWVzIjpbInNodWZmbGVBcnJheSIsImFycmF5IiwiaSIsImxlbmd0aCIsImoiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0ZW1wIiwiQ29udGFjdExpc3QiLCJwcm9wcyIsImNvbnRhY3RfY2FyZHMiLCJjb250YWN0cyIsIm1hcCIsImMiLCJpZHgiLCJuYW1lIiwicG9zaXRpb24iLCJvcmdhbml6YXRpb24iLCJ3ZWJzaXRlIiwidHdpdHRlciIsIm5vdGUiLCJjb25zb2xlIiwibG9nIiwic2h1ZmZsZWRfY29udGFjdHMiLCJzdHlsZXMiLCJjYXJkcyIsIkNvbnRhY3QiLCJ3ZWJzaXRlX3RhZyIsImZhRHJpYmJibGUiLCJ0d2l0dGVyX3RhZyIsInR3aXR0ZXJfaHJlZiIsImZhVHdpdHRlciIsImNhcmQiLCJ0aXRsZSIsInNwYWNlciIsIkhvbWUiLCJ0ZWFtRGF0YSIsInV0aWxTdHlsZXMiLCJoZWFkaW5nWGwiLCJkZXNjcmlwdGlvbiIsImNlbnRlcmVkIiwidGVhbU1lbWJlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtDQUVBOztBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUEsU0FBU0EsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkI7QUFDM0IsTUFBSUMsQ0FBQyxHQUFHRCxLQUFLLENBQUNFLE1BQU4sR0FBZSxDQUF2Qjs7QUFDQSxTQUFPRCxDQUFDLEdBQUcsQ0FBWCxFQUFjQSxDQUFDLEVBQWYsRUFBbUI7QUFDakIsUUFBTUUsQ0FBQyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLE1BQWlCTCxDQUFDLEdBQUcsQ0FBckIsQ0FBWCxDQUFWO0FBQ0EsUUFBTU0sSUFBSSxHQUFHUCxLQUFLLENBQUNDLENBQUQsQ0FBbEI7QUFDQUQsU0FBSyxDQUFDQyxDQUFELENBQUwsR0FBV0QsS0FBSyxDQUFDRyxDQUFELENBQWhC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QUFNLENBQUNVLE1BQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFEaEIsT0FDeURMLFdBRHpELENBSkYsRUFPRTtBQUFHLGFBQVMsRUFBRUwsdURBQU0sQ0FBQ0osSUFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUE0QlgsS0FBSyxDQUFDVyxJQUFsQyxDQVBGLENBREY7QUFXRDs7TUE5QlFNLE87O0FBZ0NNLFNBQVNTLElBQVQsT0FBNEI7QUFBQSxNQUFaQyxRQUFZLFFBQVpBLFFBQVk7QUFDekMsU0FDRSxNQUFDLDBEQUFEO0FBQVEsUUFBSSxNQUFaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGdCQURGLENBREYsRUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0U7QUFBSyxhQUFTLEVBQUVDLCtEQUFVLENBQUNDLFNBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERixFQUlFO0FBQUcsYUFBUyxFQUFFZCx1REFBTSxDQUFDZSxXQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1SQUpGLEVBVUU7QUFBSyxhQUFTLEVBQUVmLHVEQUFNLENBQUNnQixRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxXQUFEO0FBQWEsWUFBUSxFQUFFSixRQUFRLENBQUNLLFdBQWhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFERixDQVZGLENBSkYsQ0FERjtBQXFCRDtNQXRCdUJOLEkiLCJmaWxlIjoiLi9wYWdlcy90ZWFtLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IExheW91dCBmcm9tIFwiLi4vY29tcG9uZW50cy9sYXlvdXRcIjtcbi8vIGltcG9ydCBDb250YWN0IGZyb20gXCIuLi9jb21wb25lbnRzL2NvbnRhY3RcIjtcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcbmltcG9ydCB1dGlsU3R5bGVzIGZyb20gXCIuLi9zdHlsZXMvdXRpbHMubW9kdWxlLmNzc1wiO1xuaW1wb3J0IHN0eWxlcyBmcm9tIFwiLi90ZWFtLm1vZHVsZS5jc3NcIjtcbmltcG9ydCB7IGdldFRlYW1EYXRhIH0gZnJvbSBcIi4uL2xpYi90ZWFtXCI7XG5pbXBvcnQgeyBmYURyaWJiYmxlLCBmYVR3aXR0ZXIgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1icmFuZHMtc3ZnLWljb25zJ1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVJY29uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL3JlYWN0LWZvbnRhd2Vzb21lJ1xuXG5mdW5jdGlvbiBzaHVmZmxlQXJyYXkoYXJyYXkpIHtcbiAgbGV0IGkgPSBhcnJheS5sZW5ndGggLSAxO1xuICBmb3IgKDsgaSA+IDA7IGktLSkge1xuICAgIGNvbnN0IGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcbiAgICBjb25zdCB0ZW1wID0gYXJyYXlbaV07XG4gICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcbiAgICBhcnJheVtqXSA9IHRlbXA7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5mdW5jdGlvbiBDb250YWN0TGlzdChwcm9wcykge1xuICAvLyBGaXJzdCBjcmVhdGUgY29udGFjdCBjYXJkcyBmb3IgZXZlcnlvbmUuXG4gIGNvbnN0IGNvbnRhY3RfY2FyZHMgPSBwcm9wcy5jb250YWN0cy5tYXAoKGMsIGlkeCkgPT5cbiAgICA8Q29udGFjdFxuICAgICAga2V5PXtpZHh9XG4gICAgICBuYW1lPXtjLm5hbWV9IHBvc2l0aW9uPXtjLnBvc2l0aW9ufVxuICAgICAgb3JnYW5pemF0aW9uPXtjLm9yZ2FuaXphdGlvbn0gd2Vic2l0ZT17Yy53ZWJzaXRlfVxuICAgICAgdHdpdHRlcj17Yy50d2l0dGVyfVxuICAgICAgbm90ZT17Yy5ub3RlfSAvPlxuICApO1xuICBjb25zb2xlLmxvZyhjb250YWN0X2NhcmRzKTtcbiAgLy8gVGhlbiBzaHVmZmxlIG9yZGVyIGluIHdoaWNoIG1lbWJlcnMgYXJlIHNob3duLlxuICB2YXIgc2h1ZmZsZWRfY29udGFjdHMgPSBzaHVmZmxlQXJyYXkoY29udGFjdF9jYXJkcylcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e3N0eWxlcy5jYXJkc30+XG4gICAgICB7c2h1ZmZsZWRfY29udGFjdHN9XG4gICAgPC9zZWN0aW9uPlxuICApO1xufVxuXG5mdW5jdGlvbiBDb250YWN0KHByb3BzKSB7XG5cbiAgLy8gT3B0aW9uYWwgV2Vic2l0ZSBsaW5rLlxuICB2YXIgd2Vic2l0ZV90YWcgPSBcIlwiO1xuICBpZiAocHJvcHMud2Vic2l0ZSAhPSAnJykge1xuICAgIHdlYnNpdGVfdGFnID0gKFxuICAgICAgPGEgaHJlZj17cHJvcHMud2Vic2l0ZX0gdGFyZ2V0PVwiX2JsYW5rXCI+PEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYURyaWJiYmxlfSAvPiBXZWI8L2E+XG4gICAgKTtcbiAgfVxuXG4gIC8vIE9wdGlvbmFsIFR3aXR0ZXIgdGFnLlxuICB2YXIgdHdpdHRlcl90YWcgPSBcIlwiO1xuICBpZiAocHJvcHMudHdpdHRlciAhPSAnJykge1xuICAgIHZhciB0d2l0dGVyX2hyZWYgPSBcImh0dHBzOi8vdHdpdHRlci5jb20vXCIgKyBwcm9wcy50d2l0dGVyXG4gICAgdHdpdHRlcl90YWcgPSAoXG4gICAgICA8YSBocmVmPXt0d2l0dGVyX2hyZWZ9IHRhcmdldD1cIl9ibGFua1wiPjxGb250QXdlc29tZUljb24gaWNvbj17ZmFUd2l0dGVyfSAvPiBUd2l0dGVyPC9hPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT17c3R5bGVzLmNhcmR9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17c3R5bGVzLm5hbWV9Pntwcm9wcy5uYW1lfTwvaDM+XG4gICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+e3Byb3BzLnBvc2l0aW9ufTwvcD5cbiAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT57cHJvcHMub3JnYW5pemF0aW9ufTwvcD5cbiAgICAgIDxwPlxuICAgICAgICB7d2Vic2l0ZV90YWd9IDxzcGFuIGNsYXNzTmFtZT17c3R5bGVzLnNwYWNlcn0+PC9zcGFuPiB7dHdpdHRlcl90YWd9XG4gICAgICA8L3A+XG4gICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5ub3RlfT57cHJvcHMubm90ZX08L3A+XG4gICAgPC9hcnRpY2xlPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKHsgdGVhbURhdGEgfSkge1xuICByZXR1cm4gKFxuICAgIDxMYXlvdXQgaG9tZT5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+R0VNIFRlYW08L3RpdGxlPlxuICAgICAgPC9IZWFkPlxuICAgICAgPGFydGljbGU+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt1dGlsU3R5bGVzLmhlYWRpbmdYbH0+XG4gICAgICAgICAgVGVhbVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMuZGVzY3JpcHRpb259PlxuICAgICAgICAgIEdFTSBpcyBhIGNvbW11bml0eS1kcml2ZW4gZWZmb3J0IHdpdGggdGhlIGdvYWwgdG8gaW1wcm92ZSBob3cgcHJvZ3Jlc3MgaW5cbiAgICAgICAgICBuYXR1cmFsIGxhbmd1YWdlIGdlbmVyYXRpb24gaXMgbWVhc3VyZWQuIEl0IHdvdWxkIG5vdCBiZSBwb3NzaWJsZSB3aXRob3V0XG4gICAgICAgICAgYSBsYXJnZSBncm91cCBvZiBjb2xsYWJvcmF0b3JzIHRvIHRha2Ugb24gY2hhbGxlbmdpbmcgdGFza3MuIFRoaXMgcGFnZVxuICAgICAgICAgIGFjdHMgYXMgYSBkaXJlY3Rvcnkgb2Ygb3VyIGFtYXppbmcgY29udHJpYnV0b3JzOlxuICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNlbnRlcmVkfT5cbiAgICAgICAgICA8Q29udGFjdExpc3QgY29udGFjdHM9e3RlYW1EYXRhLnRlYW1NZW1iZXJzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYXJ0aWNsZT5cbiAgICA8L0xheW91dD5cbiAgKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpY1Byb3BzKCkge1xuICBjb25zdCB0ZWFtRGF0YSA9IGF3YWl0IGdldFRlYW1EYXRhKCk7XG4gIHJldHVybiB7XG4gICAgcHJvcHM6IHtcbiAgICAgIHRlYW1EYXRhLFxuICAgIH0sXG4gIH07XG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/team.js\n");

/***/ })

})