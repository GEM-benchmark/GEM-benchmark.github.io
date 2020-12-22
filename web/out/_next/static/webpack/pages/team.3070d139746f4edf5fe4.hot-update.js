webpackHotUpdate_N_E("pages/team",{

/***/ "./pages/team.js":
/*!***********************!*\
  !*** ./pages/team.js ***!
  \***********************/
/*! exports provided: __N_SSG, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSG\", function() { return __N_SSG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout */ \"./components/layout.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/utils.module.css */ \"./styles/utils.module.css\");\n/* harmony import */ var _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _team_module_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./team.module.css */ \"./pages/team.module.css\");\n/* harmony import */ var _team_module_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_team_module_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-brands-svg-icons */ \"./node_modules/@fortawesome/free-brands-svg-icons/index.es.js\");\n/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ \"./node_modules/@fortawesome/react-fontawesome/index.es.js\");\nvar _jsxFileName = \"/usr/local/google/home/gehrmann/Documents/GEM-benchmark.github.io/web/pages/team.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n // import Contact from \"../components/contact\";\n\n\n\n\n // import { faDribble } from '@fortawesome/free-solid-svg-icons'\n\n\nvar contacts = [{\n  id: 1,\n  name: \"Leanne Graham\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\",\n  twitter: \"@test\"\n}, {\n  id: 2,\n  name: \"Ervin Howell\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}, {\n  id: 3,\n  name: \"Clementine Bauch\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}, {\n  id: 4,\n  name: \"Clementine Bauch\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}, {\n  id: 5,\n  name: \"Clementine Bauch\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}, {\n  id: 6,\n  name: \"Clementine Bauch\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}, {\n  id: 7,\n  name: \"Patricia Lebsack\",\n  position: \"Assistant Professor\",\n  organization: \"UBC\",\n  website: \"https://test.com\"\n}];\n\nfunction ContactList(props) {\n  var _this = this;\n\n  return __jsx(\"section\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.cards,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 60,\n      columnNumber: 5\n    }\n  }, props.contacts.map(function (c) {\n    return __jsx(Contact, {\n      key: c.id,\n      name: c.name,\n      position: c.position,\n      organization: c.organization,\n      website: c.website,\n      twitter: c.twitter,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 60,\n        columnNumber: 64\n      }\n    });\n  }));\n}\n\n_c = ContactList;\n\nfunction Contact(props) {\n  // Optional Website link.\n  var website_tag = \"\";\n\n  if (props.website != undefined) {\n    console.log(\"yay\");\n    website_tag = __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      href: props.website,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 73,\n        columnNumber: 7\n      }\n    }, __jsx(\"a\", {\n      target: \"_blank\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 9\n      }\n    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__[\"FontAwesomeIcon\"], {\n      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__[\"faDribbble\"],\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 74,\n        columnNumber: 28\n      }\n    })));\n  } // Optional Twitter tag.\n\n\n  var twitter_tag = \"\";\n\n  if (props.twitter != undefined) {\n    console.log(\"yay\");\n    var twitter_href = \"https://twitter.com/\" + props.twitter;\n    twitter_tag = __jsx(next_link__WEBPACK_IMPORTED_MODULE_3___default.a, {\n      href: twitter_href,\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 85,\n        columnNumber: 7\n      }\n    }, __jsx(\"a\", {\n      target: \"_blank\",\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 86,\n        columnNumber: 9\n      }\n    }, __jsx(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_7__[\"FontAwesomeIcon\"], {\n      icon: _fortawesome_free_brands_svg_icons__WEBPACK_IMPORTED_MODULE_6__[\"faTwitter\"],\n      __self: this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 86,\n        columnNumber: 28\n      }\n    })));\n  }\n\n  return __jsx(\"article\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.card,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 92,\n      columnNumber: 5\n    }\n  }, __jsx(\"h3\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.name,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 93,\n      columnNumber: 7\n    }\n  }, props.name), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 94,\n      columnNumber: 7\n    }\n  }, props.position), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.title,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 7\n    }\n  }, props.organization), website_tag, \" \", twitter_tag);\n}\n\n_c2 = Contact;\nvar __N_SSG = true;\nfunction Home(_ref) {\n  var teamData = _ref.teamData;\n  console.log(teamData);\n  return __jsx(_components_layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    home: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 5\n    }\n  }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 105,\n      columnNumber: 7\n    }\n  }, __jsx(\"title\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 106,\n      columnNumber: 9\n    }\n  }, \"GEM Team\")), __jsx(\"article\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 108,\n      columnNumber: 7\n    }\n  }, __jsx(\"div\", {\n    className: _styles_utils_module_css__WEBPACK_IMPORTED_MODULE_4___default.a.headingXl,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 9\n    }\n  }, \"Team\"), __jsx(\"p\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.description,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 112,\n      columnNumber: 9\n    }\n  }, \"GEM is a community-driven effort with the goal to improve how progress in natural language generation is measured. It would not be possible without a large group of collaborators to take on challenging tasks. This page acts as a directory of our amazing contributors:\"), __jsx(\"div\", {\n    className: _team_module_css__WEBPACK_IMPORTED_MODULE_5___default.a.centered,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 118,\n      columnNumber: 9\n    }\n  }, __jsx(ContactList, {\n    contacts: contacts,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 119,\n      columnNumber: 11\n    }\n  }))));\n}\n_c3 = Home;\n\nvar _c, _c2, _c3;\n\n$RefreshReg$(_c, \"ContactList\");\n$RefreshReg$(_c2, \"Contact\");\n$RefreshReg$(_c3, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdGVhbS5qcz82MzI5Il0sIm5hbWVzIjpbImNvbnRhY3RzIiwiaWQiLCJuYW1lIiwicG9zaXRpb24iLCJvcmdhbml6YXRpb24iLCJ3ZWJzaXRlIiwidHdpdHRlciIsIkNvbnRhY3RMaXN0IiwicHJvcHMiLCJzdHlsZXMiLCJjYXJkcyIsIm1hcCIsImMiLCJDb250YWN0Iiwid2Vic2l0ZV90YWciLCJ1bmRlZmluZWQiLCJjb25zb2xlIiwibG9nIiwiZmFEcmliYmJsZSIsInR3aXR0ZXJfdGFnIiwidHdpdHRlcl9ocmVmIiwiZmFUd2l0dGVyIiwiY2FyZCIsInRpdGxlIiwiSG9tZSIsInRlYW1EYXRhIiwidXRpbFN0eWxlcyIsImhlYWRpbmdYbCIsImRlc2NyaXB0aW9uIiwiY2VudGVyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtDQUVBOztBQUNBO0FBQ0E7QUFDQTtDQUdBOztBQUNBO0FBRUEsSUFBTUEsUUFBUSxHQUFHLENBQ2Y7QUFDRUMsSUFBRSxFQUFFLENBRE47QUFDU0MsTUFBSSxFQUFFLGVBRGY7QUFFRUMsVUFBUSxFQUFFLHFCQUZaO0FBR0VDLGNBQVksRUFBRSxLQUhoQjtBQUlFQyxTQUFPLEVBQUUsa0JBSlg7QUFLRUMsU0FBTyxFQUFFO0FBTFgsQ0FEZSxFQVFmO0FBQ0VMLElBQUUsRUFBRSxDQUROO0FBQ1NDLE1BQUksRUFBRSxjQURmO0FBRUVDLFVBQVEsRUFBRSxxQkFGWjtBQUdFQyxjQUFZLEVBQUUsS0FIaEI7QUFJRUMsU0FBTyxFQUFFO0FBSlgsQ0FSZSxFQWNmO0FBQ0VKLElBQUUsRUFBRSxDQUROO0FBQ1NDLE1BQUksRUFBRSxrQkFEZjtBQUVFQyxVQUFRLEVBQUUscUJBRlo7QUFHRUMsY0FBWSxFQUFFLEtBSGhCO0FBSUVDLFNBQU8sRUFBRTtBQUpYLENBZGUsRUFvQmY7QUFDRUosSUFBRSxFQUFFLENBRE47QUFDU0MsTUFBSSxFQUFFLGtCQURmO0FBRUVDLFVB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QUFRLEVBQUU3QixRQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBREYsQ0FWRixDQUpGLENBREY7QUFxQkQ7TUF2QnVCd0IsSSIsImZpbGUiOiIuL3BhZ2VzL3RlYW0uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSGVhZCBmcm9tIFwibmV4dC9oZWFkXCI7XG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL2xheW91dFwiO1xuLy8gaW1wb3J0IENvbnRhY3QgZnJvbSBcIi4uL2NvbXBvbmVudHMvY29udGFjdFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHV0aWxTdHlsZXMgZnJvbSBcIi4uL3N0eWxlcy91dGlscy5tb2R1bGUuY3NzXCI7XG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL3RlYW0ubW9kdWxlLmNzc1wiO1xuaW1wb3J0IHsgZ2V0VGVhbURhdGEgfSBmcm9tIFwiLi4vbGliL3RlYW1cIjtcbmltcG9ydCB7IGZhRHJpYmJibGUsIGZhVHdpdHRlciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLWJyYW5kcy1zdmctaWNvbnMnXG4vLyBpbXBvcnQgeyBmYURyaWJibGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnXG5pbXBvcnQgeyBGb250QXdlc29tZUljb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvcmVhY3QtZm9udGF3ZXNvbWUnXG5cbmNvbnN0IGNvbnRhY3RzID0gW1xuICB7XG4gICAgaWQ6IDEsIG5hbWU6IFwiTGVhbm5lIEdyYWhhbVwiLFxuICAgIHBvc2l0aW9uOiBcIkFzc2lzdGFudCBQcm9mZXNzb3JcIixcbiAgICBvcmdhbml6YXRpb246IFwiVUJDXCIsXG4gICAgd2Vic2l0ZTogXCJodHRwczovL3Rlc3QuY29tXCIsXG4gICAgdHdpdHRlcjogXCJAdGVzdFwiXG4gIH0sXG4gIHtcbiAgICBpZDogMiwgbmFtZTogXCJFcnZpbiBIb3dlbGxcIixcbiAgICBwb3NpdGlvbjogXCJBc3Npc3RhbnQgUHJvZmVzc29yXCIsXG4gICAgb3JnYW5pemF0aW9uOiBcIlVCQ1wiLFxuICAgIHdlYnNpdGU6IFwiaHR0cHM6Ly90ZXN0LmNvbVwiXG4gIH0sXG4gIHtcbiAgICBpZDogMywgbmFtZTogXCJDbGVtZW50aW5lIEJhdWNoXCIsXG4gICAgcG9zaXRpb246IFwiQXNzaXN0YW50IFByb2Zlc3NvclwiLFxuICAgIG9yZ2FuaXphdGlvbjogXCJVQkNcIixcbiAgICB3ZWJzaXRlOiBcImh0dHBzOi8vdGVzdC5jb21cIlxuICB9LFxuICB7XG4gICAgaWQ6IDQsIG5hbWU6IFwiQ2xlbWVudGluZSBCYXVjaFwiLFxuICAgIHBvc2l0aW9uOiBcIkFzc2lzdGFudCBQcm9mZXNzb3JcIixcbiAgICBvcmdhbml6YXRpb246IFwiVUJDXCIsXG4gICAgd2Vic2l0ZTogXCJodHRwczovL3Rlc3QuY29tXCJcbiAgfSxcbiAge1xuICAgIGlkOiA1LCBuYW1lOiBcIkNsZW1lbnRpbmUgQmF1Y2hcIixcbiAgICBwb3NpdGlvbjogXCJBc3Npc3RhbnQgUHJvZmVzc29yXCIsXG4gICAgb3JnYW5pemF0aW9uOiBcIlVCQ1wiLFxuICAgIHdlYnNpdGU6IFwiaHR0cHM6Ly90ZXN0LmNvbVwiXG4gIH0sXG4gIHtcbiAgICBpZDogNiwgbmFtZTogXCJDbGVtZW50aW5lIEJhdWNoXCIsXG4gICAgcG9zaXRpb246IFwiQXNzaXN0YW50IFByb2Zlc3NvclwiLFxuICAgIG9yZ2FuaXphdGlvbjogXCJVQkNcIixcbiAgICB3ZWJzaXRlOiBcImh0dHBzOi8vdGVzdC5jb21cIlxuICB9LFxuICB7XG4gICAgaWQ6IDcsIG5hbWU6IFwiUGF0cmljaWEgTGVic2Fja1wiLFxuICAgIHBvc2l0aW9uOiBcIkFzc2lzdGFudCBQcm9mZXNzb3JcIixcbiAgICBvcmdhbml6YXRpb246IFwiVUJDXCIsXG4gICAgd2Vic2l0ZTogXCJodHRwczovL3Rlc3QuY29tXCJcbiAgfVxuXTtcblxuZnVuY3Rpb24gQ29udGFjdExpc3QocHJvcHMpIHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9e3N0eWxlcy5jYXJkc30+e3Byb3BzLmNvbnRhY3RzLm1hcChjID0+IDxDb250YWN0IGtleT17Yy5pZH1cbiAgICAgIG5hbWU9e2MubmFtZX0gcG9zaXRpb249e2MucG9zaXRpb259XG4gICAgICBvcmdhbml6YXRpb249e2Mub3JnYW5pemF0aW9ufSB3ZWJzaXRlPXtjLndlYnNpdGV9XG4gICAgICB0d2l0dGVyPXtjLnR3aXR0ZXJ9Lz4pfTwvc2VjdGlvbj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQ29udGFjdChwcm9wcykge1xuICAvLyBPcHRpb25hbCBXZWJzaXRlIGxpbmsuXG4gIHZhciB3ZWJzaXRlX3RhZyA9IFwiXCI7XG4gIGlmIChwcm9wcy53ZWJzaXRlICE9IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUubG9nKFwieWF5XCIpO1xuICAgIHdlYnNpdGVfdGFnID0gKFxuICAgICAgPExpbmsgaHJlZj17cHJvcHMud2Vic2l0ZX0+XG4gICAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiPjxGb250QXdlc29tZUljb24gaWNvbj17ZmFEcmliYmJsZX0gLz48L2E+XG4gICAgICA8L0xpbms+XG4gICAgKTtcbiAgfVxuXG4gIC8vIE9wdGlvbmFsIFR3aXR0ZXIgdGFnLlxuICB2YXIgdHdpdHRlcl90YWcgPSBcIlwiO1xuICBpZiAocHJvcHMudHdpdHRlciAhPSB1bmRlZmluZWQpIHtcbiAgICBjb25zb2xlLmxvZyhcInlheVwiKTtcbiAgICB2YXIgdHdpdHRlcl9ocmVmID0gXCJodHRwczovL3R3aXR0ZXIuY29tL1wiICsgcHJvcHMudHdpdHRlclxuICAgIHR3aXR0ZXJfdGFnID0gKFxuICAgICAgPExpbmsgaHJlZj17dHdpdHRlcl9ocmVmfT5cbiAgICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCI+PEZvbnRBd2Vzb21lSWNvbiBpY29uPXtmYVR3aXR0ZXJ9IC8+PC9hPlxuICAgICAgPC9MaW5rPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxhcnRpY2xlIGNsYXNzTmFtZT17c3R5bGVzLmNhcmR9PlxuICAgICAgPGgzIGNsYXNzTmFtZT17c3R5bGVzLm5hbWV9Pntwcm9wcy5uYW1lfTwvaDM+XG4gICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+e3Byb3BzLnBvc2l0aW9ufTwvcD5cbiAgICAgIDxwIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT57cHJvcHMub3JnYW5pemF0aW9ufTwvcD5cbiAgICAgIHt3ZWJzaXRlX3RhZ30ge3R3aXR0ZXJfdGFnfVxuICAgIDwvYXJ0aWNsZT5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSh7IHRlYW1EYXRhIH0pIHtcbiAgY29uc29sZS5sb2codGVhbURhdGEpXG4gIHJldHVybiAoXG4gICAgPExheW91dCBob21lPlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5HRU0gVGVhbTwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8YXJ0aWNsZT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3V0aWxTdHlsZXMuaGVhZGluZ1hsfT5cbiAgICAgICAgICBUZWFtXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9e3N0eWxlcy5kZXNjcmlwdGlvbn0+XG4gICAgICAgICAgR0VNIGlzIGEgY29tbXVuaXR5LWRyaXZlbiBlZmZvcnQgd2l0aCB0aGUgZ29hbCB0byBpbXByb3ZlIGhvdyBwcm9ncmVzcyBpblxuICAgICAgICAgIG5hdHVyYWwgbGFuZ3VhZ2UgZ2VuZXJhdGlvbiBpcyBtZWFzdXJlZC4gSXQgd291bGQgbm90IGJlIHBvc3NpYmxlIHdpdGhvdXRcbiAgICAgICAgICBhIGxhcmdlIGdyb3VwIG9mIGNvbGxhYm9yYXRvcnMgdG8gdGFrZSBvbiBjaGFsbGVuZ2luZyB0YXNrcy4gVGhpcyBwYWdlXG4gICAgICAgICAgYWN0cyBhcyBhIGRpcmVjdG9yeSBvZiBvdXIgYW1hemluZyBjb250cmlidXRvcnM6XG4gICAgICA8L3A+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY2VudGVyZWR9PlxuICAgICAgICAgIDxDb250YWN0TGlzdCBjb250YWN0cz17Y29udGFjdHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9hcnRpY2xlPlxuICAgIDwvTGF5b3V0PlxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U3RhdGljUHJvcHMoKSB7XG4gIGNvbnN0IHRlYW1EYXRhID0gYXdhaXQgZ2V0VGVhbURhdGEoKTtcbiAgcmV0dXJuIHtcbiAgICBwcm9wczoge1xuICAgICAgdGVhbURhdGEsXG4gICAgfSxcbiAgfTtcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/team.js\n");

/***/ })

})