(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WeappRedux"] = factory();
	else
		root["WeappRedux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.connect = exports.Provider = undefined;

	var _Provider = __webpack_require__(1);

	var _Provider2 = _interopRequireDefault(_Provider);

	var _connect = __webpack_require__(4);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Provider = _Provider2.default;
	exports.connect = _connect2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _warning = __webpack_require__(2);

	var _warning2 = _interopRequireDefault(_warning);

	var _storeShape = __webpack_require__(3);

	var _storeShape2 = _interopRequireDefault(_storeShape);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function Provider(store) {
	  if (!(0, _storeShape2.default)(store)) {
	    return;
	  }

	  return function (appConfig) {
	    return Object.assign({}, appConfig, { store: store });
	  };
	}

	exports.default = Provider;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = storeShape;

	var _warning = __webpack_require__(2);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function storeShape(store) {
	  var missingMethods = ['subscribe', 'dispatch', 'getState'].filter(function (m) {
	    return !store.hasOwnProperty(m);
	  });

	  if (missingMethods.length > 0) {
	    (0, _warning2.default)('Invalid Store.' + ('Missing methods: ' + missingMethods.join(',')));

	    return false;
	  }

	  return true;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = connect;

	var _wrapActionCreators = __webpack_require__(5);

	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);

	var _shallowEqual = __webpack_require__(6);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var defaultMapStateToData = function defaultMapStateToData(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToData = function defaultMapDispatchToData(dispatch) {
	  return { dispatch: dispatch };
	};

	function connect(mapStateToData, mapDispatchToData) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  var shouldSubscribe = Boolean(mapStateToData);
	  var mapState = mapStateToData || defaultMapStateToData;

	  var mapDispatch = void 0;

	  if (typeof mapDispatchToData === 'function') {
	    mapDispatch = mapDispatchToData;
	  } else if (!mapDispatchToData) {
	    mapDispatch = defaultMapDispatchToData;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2.default)(mapDispatchToData);
	  }

	  return function wrapWithConnect(pageConfig) {
	    var app = getApp();

	    function trySubscribe() {
	      if (shouldSubscribe && !this.unsubscribe) {
	        this.unsubscribe = app.store.subscribe(handleChange.bind(this));
	        handleChange.apply(this);
	      }
	    }

	    function tryUnsubscribe() {
	      if (!!this.unsubscribe && typeof this.unsubscribe === 'function') {
	        this.unsubscribe();
	        this.unsubscribe = null;
	      }
	    }

	    function handleChange() {
	      if (!this.unsubscribe) {
	        return;
	      }

	      var state = app.store.getState();

	      var mappedState = mapState(state);

	      if ((0, _shallowEqual2.default)(this.data, mappedState)) {
	        return;
	      }

	      console.log(mappedState, _typeof(this.setData));

	      this.setData(mappedState);
	    }

	    function onLoad(options) {
	      if (!app.store) {
	        warning('Could not find store!' + 'Please wrap app.js in Provider.');
	      }

	      trySubscribe.apply(this);

	      pageConfig.onLoad.apply(this);
	    }

	    function onUnload() {
	      tryUnsubscribe.apply(this);

	      pageConfig.onUnload.apply(this);
	    }

	    return Object.assign({}, pageConfig, mapDispatch(app.store.dispatch), { onLoad: onLoad, onUnload: onUnload });
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.default = wrapActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return bindActionCreators(actionCreators, dispatch);
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

/***/ }
/******/ ])
});
;