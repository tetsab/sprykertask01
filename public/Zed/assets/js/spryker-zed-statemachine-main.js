"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-statemachine-main"],{

/***/ "./vendor/spryker/state-machine/assets/Zed/js/modules/logic.js":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/state-machine/assets/Zed/js/modules/logic.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var drift_zoom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! drift-zoom */ "./node_modules/drift-zoom/es/Drift.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */




$(document).ready(function () {
  var imagePreview = document.getElementsByClassName('preview-image')[0];
  var zoomContainer = document.getElementsByClassName('zoom-container')[0];
  new drift_zoom__WEBPACK_IMPORTED_MODULE_0__["default"](imagePreview, {
    containInline: true,
    sourceAttribute: 'src',
    hoverBoundingBox: true,
    paneContainer: zoomContainer,
    inlinePane: 900,
    inlineOffsetY: -85
  });
});

/***/ }),

/***/ "./vendor/spryker/state-machine/assets/Zed/js/modules/main.js":
/*!********************************************************************!*\
  !*** ./vendor/spryker/state-machine/assets/Zed/js/modules/main.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./logic */ "./vendor/spryker/state-machine/assets/Zed/js/modules/logic.js");
__webpack_require__(/*! ../../scss/main.scss */ "./vendor/spryker/state-machine/assets/Zed/scss/main.scss");

/***/ }),

/***/ "./vendor/spryker/state-machine/assets/Zed/js/spryker-zed-statemachine-main.entry.js":
/*!*******************************************************************************************!*\
  !*** ./vendor/spryker/state-machine/assets/Zed/js/spryker-zed-statemachine-main.entry.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/state-machine/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./node_modules/drift-zoom/es/BoundingBox.js":
/*!***************************************************!*\
  !*** ./node_modules/drift-zoom/es/BoundingBox.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoundingBox)
/* harmony export */ });
/* harmony import */ var _util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/throwIfMissing */ "./node_modules/drift-zoom/es/util/throwIfMissing.js");
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/dom */ "./node_modules/drift-zoom/es/util/dom.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var BoundingBox = /*#__PURE__*/function () {
  function BoundingBox(options) {
    _classCallCheck(this, BoundingBox);

    this.isShowing = false;
    var _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? null : _options$namespace,
        _options$zoomFactor = options.zoomFactor,
        zoomFactor = _options$zoomFactor === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$zoomFactor,
        _options$containerEl = options.containerEl,
        containerEl = _options$containerEl === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$containerEl;
    this.settings = {
      namespace: namespace,
      zoomFactor: zoomFactor,
      containerEl: containerEl
    };
    this.openClasses = this._buildClasses("open");

    this._buildElement();
  }

  _createClass(BoundingBox, [{
    key: "_buildClasses",
    value: function _buildClasses(suffix) {
      var classes = ["drift-".concat(suffix)];
      var ns = this.settings.namespace;

      if (ns) {
        classes.push("".concat(ns, "-").concat(suffix));
      }

      return classes;
    }
  }, {
    key: "_buildElement",
    value: function _buildElement() {
      this.el = document.createElement("div");
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this._buildClasses("bounding-box"));
    }
  }, {
    key: "show",
    value: function show(zoomPaneWidth, zoomPaneHeight) {
      this.isShowing = true;
      this.settings.containerEl.appendChild(this.el);
      var style = this.el.style;
      style.width = "".concat(Math.round(zoomPaneWidth / this.settings.zoomFactor), "px");
      style.height = "".concat(Math.round(zoomPaneHeight / this.settings.zoomFactor), "px");
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.openClasses);
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.isShowing) {
        this.settings.containerEl.removeChild(this.el);
      }

      this.isShowing = false;
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.openClasses);
    }
  }, {
    key: "setPosition",
    value: function setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
      var pageXOffset = window.pageXOffset;
      var pageYOffset = window.pageYOffset;
      var inlineLeft = triggerRect.left + percentageOffsetX * triggerRect.width - this.el.clientWidth / 2 + pageXOffset;
      var inlineTop = triggerRect.top + percentageOffsetY * triggerRect.height - this.el.clientHeight / 2 + pageYOffset;

      if (inlineLeft < triggerRect.left + pageXOffset) {
        inlineLeft = triggerRect.left + pageXOffset;
      } else if (inlineLeft + this.el.clientWidth > triggerRect.left + triggerRect.width + pageXOffset) {
        inlineLeft = triggerRect.left + triggerRect.width - this.el.clientWidth + pageXOffset;
      }

      if (inlineTop < triggerRect.top + pageYOffset) {
        inlineTop = triggerRect.top + pageYOffset;
      } else if (inlineTop + this.el.clientHeight > triggerRect.top + triggerRect.height + pageYOffset) {
        inlineTop = triggerRect.top + triggerRect.height - this.el.clientHeight + pageYOffset;
      }

      this.el.style.left = "".concat(inlineLeft, "px");
      this.el.style.top = "".concat(inlineTop, "px");
    }
  }]);

  return BoundingBox;
}();


//# sourceMappingURL=BoundingBox.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/Drift.js":
/*!*********************************************!*\
  !*** ./node_modules/drift-zoom/es/Drift.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Drift)
/* harmony export */ });
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/dom */ "./node_modules/drift-zoom/es/util/dom.js");
/* harmony import */ var _injectBaseStylesheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./injectBaseStylesheet */ "./node_modules/drift-zoom/es/injectBaseStylesheet.js");
/* harmony import */ var _Trigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Trigger */ "./node_modules/drift-zoom/es/Trigger.js");
/* harmony import */ var _ZoomPane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ZoomPane */ "./node_modules/drift-zoom/es/ZoomPane.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var Drift = /*#__PURE__*/function () {
  function Drift(triggerEl) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Drift);

    this.VERSION = "1.4.4";
    this.triggerEl = triggerEl;
    this.destroy = this.destroy.bind(this);

    if (!(0,_util_dom__WEBPACK_IMPORTED_MODULE_0__.isDOMElement)(this.triggerEl)) {
      throw new TypeError("`new Drift` requires a DOM element as its first argument.");
    } // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-pane`. Default `drift-`
    // prefixed classes will always be added as well.


    var namespace = options["namespace"] || null; // Whether the ZoomPane should show whitespace when near the edges.

    var showWhitespaceAtEdges = options["showWhitespaceAtEdges"] || false; // Whether the inline ZoomPane should stay inside
    // the bounds of its image.

    var containInline = options["containInline"] || false; // How much to offset the ZoomPane from the
    // interaction point when inline.

    var inlineOffsetX = options["inlineOffsetX"] || 0;
    var inlineOffsetY = options["inlineOffsetY"] || 0; // A DOM element to append the inline ZoomPane to

    var inlineContainer = options["inlineContainer"] || document.body; // Which trigger attribute to pull the ZoomPane image source from.

    var sourceAttribute = options["sourceAttribute"] || "data-zoom"; // How much to magnify the trigger by in the ZoomPane.
    // (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane imag
    // if the trigger is displayed at 300 px wide)

    var zoomFactor = options["zoomFactor"] || 3; // A DOM element to append the non-inline ZoomPane to.
    // Required if `inlinePane !== true`.

    var paneContainer = options["paneContainer"] === undefined ? document.body : options["paneContainer"]; // When to switch to an inline ZoomPane. This can be a boolean or
    // an integer. If `true`, the ZoomPane will always be inline,
    // if `false`, it will switch to inline when `windowWidth <= inlinePane`

    var inlinePane = options["inlinePane"] || 375; // If `true`, touch events will trigger the zoom, like mouse events.

    var handleTouch = "handleTouch" in options ? !!options["handleTouch"] : true; // If present (and a function), this will be called
    // whenever the ZoomPane is shown.

    var onShow = options["onShow"] || null; // If present (and a function), this will be called
    // whenever the ZoomPane is hidden.

    var onHide = options["onHide"] || null; // Add base styles to the page. See the "Theming"
    // section of README.md for more information.

    var injectBaseStyles = "injectBaseStyles" in options ? !!options["injectBaseStyles"] : true; // An optional number that determines how long to wait before
    // showing the ZoomPane because of a `mouseenter` event.

    var hoverDelay = options["hoverDelay"] || 0; // An optional number that determines how long to wait before
    // showing the ZoomPane because of a `touchstart` event.
    // It's unlikely that you would want to use this option, since
    // "tap and hold" is much more intentional than a hover event.

    var touchDelay = options["touchDelay"] || 0; // If true, a bounding box will show the area currently being previewed
    // during mouse hover

    var hoverBoundingBox = options["hoverBoundingBox"] || false; // If true, a bounding box will show the area currently being previewed
    // during touch events

    var touchBoundingBox = options["touchBoundingBox"] || false; // A DOM element to append the bounding box to.

    var boundingBoxContainer = options["boundingBoxContainer"] || document.body;

    if (inlinePane !== true && !(0,_util_dom__WEBPACK_IMPORTED_MODULE_0__.isDOMElement)(paneContainer)) {
      throw new TypeError("`paneContainer` must be a DOM element when `inlinePane !== true`");
    }

    if (!(0,_util_dom__WEBPACK_IMPORTED_MODULE_0__.isDOMElement)(inlineContainer)) {
      throw new TypeError("`inlineContainer` must be a DOM element");
    }

    this.settings = {
      namespace: namespace,
      showWhitespaceAtEdges: showWhitespaceAtEdges,
      containInline: containInline,
      inlineOffsetX: inlineOffsetX,
      inlineOffsetY: inlineOffsetY,
      inlineContainer: inlineContainer,
      sourceAttribute: sourceAttribute,
      zoomFactor: zoomFactor,
      paneContainer: paneContainer,
      inlinePane: inlinePane,
      handleTouch: handleTouch,
      onShow: onShow,
      onHide: onHide,
      injectBaseStyles: injectBaseStyles,
      hoverDelay: hoverDelay,
      touchDelay: touchDelay,
      hoverBoundingBox: hoverBoundingBox,
      touchBoundingBox: touchBoundingBox,
      boundingBoxContainer: boundingBoxContainer
    };

    if (this.settings.injectBaseStyles) {
      (0,_injectBaseStylesheet__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }

    this._buildZoomPane();

    this._buildTrigger();
  }

  _createClass(Drift, [{
    key: "_buildZoomPane",
    value: function _buildZoomPane() {
      this.zoomPane = new _ZoomPane__WEBPACK_IMPORTED_MODULE_3__["default"]({
        container: this.settings.paneContainer,
        zoomFactor: this.settings.zoomFactor,
        showWhitespaceAtEdges: this.settings.showWhitespaceAtEdges,
        containInline: this.settings.containInline,
        inline: this.settings.inlinePane,
        namespace: this.settings.namespace,
        inlineOffsetX: this.settings.inlineOffsetX,
        inlineOffsetY: this.settings.inlineOffsetY,
        inlineContainer: this.settings.inlineContainer
      });
    }
  }, {
    key: "_buildTrigger",
    value: function _buildTrigger() {
      this.trigger = new _Trigger__WEBPACK_IMPORTED_MODULE_2__["default"]({
        el: this.triggerEl,
        zoomPane: this.zoomPane,
        handleTouch: this.settings.handleTouch,
        onShow: this.settings.onShow,
        onHide: this.settings.onHide,
        sourceAttribute: this.settings.sourceAttribute,
        hoverDelay: this.settings.hoverDelay,
        touchDelay: this.settings.touchDelay,
        hoverBoundingBox: this.settings.hoverBoundingBox,
        touchBoundingBox: this.settings.touchBoundingBox,
        namespace: this.settings.namespace,
        zoomFactor: this.settings.zoomFactor,
        boundingBoxContainer: this.settings.boundingBoxContainer
      });
    }
  }, {
    key: "setZoomImageURL",
    value: function setZoomImageURL(imageURL) {
      this.zoomPane._setImageURL(imageURL);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.trigger.enabled = false;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.trigger.enabled = true;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.trigger._hide();

      this.trigger._unbindEvents();
    }
  }, {
    key: "isShowing",
    get: function get() {
      return this.zoomPane.isShowing;
    }
  }, {
    key: "zoomFactor",
    get: function get() {
      return this.settings.zoomFactor;
    },
    set: function set(zf) {
      this.settings.zoomFactor = zf;
      this.zoomPane.settings.zoomFactor = zf;
      this.trigger.settings.zoomFactor = zf;
      this.boundingBox.settings.zoomFactor = zf;
    }
  }]);

  return Drift;
}(); // Public API

/* eslint-disable no-self-assign */



Object.defineProperty(Drift.prototype, "isShowing", {
  get: function get() {
    return this.isShowing;
  }
});
Object.defineProperty(Drift.prototype, "zoomFactor", {
  get: function get() {
    return this.zoomFactor;
  },
  set: function set(value) {
    this.zoomFactor = value;
  }
});
Drift.prototype["setZoomImageURL"] = Drift.prototype.setZoomImageURL;
Drift.prototype["disable"] = Drift.prototype.disable;
Drift.prototype["enable"] = Drift.prototype.enable;
Drift.prototype["destroy"] = Drift.prototype.destroy;
/* eslint-enable no-self-assign */
//# sourceMappingURL=Drift.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/Trigger.js":
/*!***********************************************!*\
  !*** ./node_modules/drift-zoom/es/Trigger.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Trigger)
/* harmony export */ });
/* harmony import */ var _util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/throwIfMissing */ "./node_modules/drift-zoom/es/util/throwIfMissing.js");
/* harmony import */ var _BoundingBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoundingBox */ "./node_modules/drift-zoom/es/BoundingBox.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var Trigger = /*#__PURE__*/function () {
  function Trigger() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Trigger);

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
    this._handleEntry = this._handleEntry.bind(this);
    this._handleMovement = this._handleMovement.bind(this);
    var _options$el = options.el,
        el = _options$el === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$el,
        _options$zoomPane = options.zoomPane,
        zoomPane = _options$zoomPane === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$zoomPane,
        _options$sourceAttrib = options.sourceAttribute,
        sourceAttribute = _options$sourceAttrib === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$sourceAttrib,
        _options$handleTouch = options.handleTouch,
        handleTouch = _options$handleTouch === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$handleTouch,
        _options$onShow = options.onShow,
        onShow = _options$onShow === void 0 ? null : _options$onShow,
        _options$onHide = options.onHide,
        onHide = _options$onHide === void 0 ? null : _options$onHide,
        _options$hoverDelay = options.hoverDelay,
        hoverDelay = _options$hoverDelay === void 0 ? 0 : _options$hoverDelay,
        _options$touchDelay = options.touchDelay,
        touchDelay = _options$touchDelay === void 0 ? 0 : _options$touchDelay,
        _options$hoverBoundin = options.hoverBoundingBox,
        hoverBoundingBox = _options$hoverBoundin === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$hoverBoundin,
        _options$touchBoundin = options.touchBoundingBox,
        touchBoundingBox = _options$touchBoundin === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$touchBoundin,
        _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? null : _options$namespace,
        _options$zoomFactor = options.zoomFactor,
        zoomFactor = _options$zoomFactor === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$zoomFactor,
        _options$boundingBoxC = options.boundingBoxContainer,
        boundingBoxContainer = _options$boundingBoxC === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$boundingBoxC;
    this.settings = {
      el: el,
      zoomPane: zoomPane,
      sourceAttribute: sourceAttribute,
      handleTouch: handleTouch,
      onShow: onShow,
      onHide: onHide,
      hoverDelay: hoverDelay,
      touchDelay: touchDelay,
      hoverBoundingBox: hoverBoundingBox,
      touchBoundingBox: touchBoundingBox,
      namespace: namespace,
      zoomFactor: zoomFactor,
      boundingBoxContainer: boundingBoxContainer
    };

    if (this.settings.hoverBoundingBox || this.settings.touchBoundingBox) {
      this.boundingBox = new _BoundingBox__WEBPACK_IMPORTED_MODULE_1__["default"]({
        namespace: this.settings.namespace,
        zoomFactor: this.settings.zoomFactor,
        containerEl: this.settings.boundingBoxContainer
      });
    }

    this.enabled = true;

    this._bindEvents();
  }

  _createClass(Trigger, [{
    key: "_preventDefault",
    value: function _preventDefault(event) {
      event.preventDefault();
    }
  }, {
    key: "_preventDefaultAllowTouchScroll",
    value: function _preventDefaultAllowTouchScroll(event) {
      if (!this.settings.touchDelay || !this._isTouchEvent(event) || this.isShowing) {
        event.preventDefault();
      }
    }
  }, {
    key: "_isTouchEvent",
    value: function _isTouchEvent(event) {
      return !!event.touches;
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      this.settings.el.addEventListener("mouseenter", this._handleEntry, false);
      this.settings.el.addEventListener("mouseleave", this._hide, false);
      this.settings.el.addEventListener("mousemove", this._handleMovement, false);

      if (this.settings.handleTouch) {
        this.settings.el.addEventListener("touchstart", this._handleEntry, false);
        this.settings.el.addEventListener("touchend", this._hide, false);
        this.settings.el.addEventListener("touchmove", this._handleMovement, false);
      } else {
        this.settings.el.addEventListener("touchstart", this._preventDefault, false);
        this.settings.el.addEventListener("touchend", this._preventDefault, false);
        this.settings.el.addEventListener("touchmove", this._preventDefault, false);
      }
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      this.settings.el.removeEventListener("mouseenter", this._handleEntry, false);
      this.settings.el.removeEventListener("mouseleave", this._hide, false);
      this.settings.el.removeEventListener("mousemove", this._handleMovement, false);

      if (this.settings.handleTouch) {
        this.settings.el.removeEventListener("touchstart", this._handleEntry, false);
        this.settings.el.removeEventListener("touchend", this._hide, false);
        this.settings.el.removeEventListener("touchmove", this._handleMovement, false);
      } else {
        this.settings.el.removeEventListener("touchstart", this._preventDefault, false);
        this.settings.el.removeEventListener("touchend", this._preventDefault, false);
        this.settings.el.removeEventListener("touchmove", this._preventDefault, false);
      }
    }
  }, {
    key: "_handleEntry",
    value: function _handleEntry(e) {
      this._preventDefaultAllowTouchScroll(e);

      this._lastMovement = e;

      if (e.type == "mouseenter" && this.settings.hoverDelay) {
        this.entryTimeout = setTimeout(this._show, this.settings.hoverDelay);
      } else if (this.settings.touchDelay) {
        this.entryTimeout = setTimeout(this._show, this.settings.touchDelay);
      } else {
        this._show();
      }
    }
  }, {
    key: "_show",
    value: function _show() {
      if (!this.enabled) {
        return;
      }

      var onShow = this.settings.onShow;

      if (onShow && typeof onShow === "function") {
        onShow();
      }

      this.settings.zoomPane.show(this.settings.el.getAttribute(this.settings.sourceAttribute), this.settings.el.clientWidth, this.settings.el.clientHeight);

      if (this._lastMovement) {
        var touchActivated = this._lastMovement.touches;

        if (touchActivated && this.settings.touchBoundingBox || !touchActivated && this.settings.hoverBoundingBox) {
          this.boundingBox.show(this.settings.zoomPane.el.clientWidth, this.settings.zoomPane.el.clientHeight);
        }
      }

      this._handleMovement();
    }
  }, {
    key: "_hide",
    value: function _hide(e) {
      if (e) {
        this._preventDefaultAllowTouchScroll(e);
      }

      this._lastMovement = null;

      if (this.entryTimeout) {
        clearTimeout(this.entryTimeout);
      }

      if (this.boundingBox) {
        this.boundingBox.hide();
      }

      var onHide = this.settings.onHide;

      if (onHide && typeof onHide === "function") {
        onHide();
      }

      this.settings.zoomPane.hide();
    }
  }, {
    key: "_handleMovement",
    value: function _handleMovement(e) {
      if (e) {
        this._preventDefaultAllowTouchScroll(e);

        this._lastMovement = e;
      } else if (this._lastMovement) {
        e = this._lastMovement;
      } else {
        return;
      }

      var movementX;
      var movementY;

      if (e.touches) {
        var firstTouch = e.touches[0];
        movementX = firstTouch.clientX;
        movementY = firstTouch.clientY;
      } else {
        movementX = e.clientX;
        movementY = e.clientY;
      }

      var el = this.settings.el;
      var rect = el.getBoundingClientRect();
      var offsetX = movementX - rect.left;
      var offsetY = movementY - rect.top;
      var percentageOffsetX = offsetX / this.settings.el.clientWidth;
      var percentageOffsetY = offsetY / this.settings.el.clientHeight;

      if (this.boundingBox) {
        this.boundingBox.setPosition(percentageOffsetX, percentageOffsetY, rect);
      }

      this.settings.zoomPane.setPosition(percentageOffsetX, percentageOffsetY, rect);
    }
  }, {
    key: "isShowing",
    get: function get() {
      return this.settings.zoomPane.isShowing;
    }
  }]);

  return Trigger;
}();


//# sourceMappingURL=Trigger.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/ZoomPane.js":
/*!************************************************!*\
  !*** ./node_modules/drift-zoom/es/ZoomPane.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ZoomPane)
/* harmony export */ });
/* harmony import */ var _util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/throwIfMissing */ "./node_modules/drift-zoom/es/util/throwIfMissing.js");
/* harmony import */ var _util_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/dom */ "./node_modules/drift-zoom/es/util/dom.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var ZoomPane = /*#__PURE__*/function () {
  function ZoomPane() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ZoomPane);

    // All officially-supported browsers have this, but it's easy to
    // account for, just in case.
    this.HAS_ANIMATION = false;

    if (typeof document !== "undefined") {
      var divStyle = document.createElement("div").style;
      this.HAS_ANIMATION = "animation" in divStyle || "webkitAnimation" in divStyle;
    }

    this._completeShow = this._completeShow.bind(this);
    this._completeHide = this._completeHide.bind(this);
    this._handleLoad = this._handleLoad.bind(this);
    this.isShowing = false;
    var _options$container = options.container,
        container = _options$container === void 0 ? null : _options$container,
        _options$zoomFactor = options.zoomFactor,
        zoomFactor = _options$zoomFactor === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$zoomFactor,
        _options$inline = options.inline,
        inline = _options$inline === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$inline,
        _options$namespace = options.namespace,
        namespace = _options$namespace === void 0 ? null : _options$namespace,
        _options$showWhitespa = options.showWhitespaceAtEdges,
        showWhitespaceAtEdges = _options$showWhitespa === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$showWhitespa,
        _options$containInlin = options.containInline,
        containInline = _options$containInlin === void 0 ? (0,_util_throwIfMissing__WEBPACK_IMPORTED_MODULE_0__["default"])() : _options$containInlin,
        _options$inlineOffset = options.inlineOffsetX,
        inlineOffsetX = _options$inlineOffset === void 0 ? 0 : _options$inlineOffset,
        _options$inlineOffset2 = options.inlineOffsetY,
        inlineOffsetY = _options$inlineOffset2 === void 0 ? 0 : _options$inlineOffset2,
        _options$inlineContai = options.inlineContainer,
        inlineContainer = _options$inlineContai === void 0 ? document.body : _options$inlineContai;
    this.settings = {
      container: container,
      zoomFactor: zoomFactor,
      inline: inline,
      namespace: namespace,
      showWhitespaceAtEdges: showWhitespaceAtEdges,
      containInline: containInline,
      inlineOffsetX: inlineOffsetX,
      inlineOffsetY: inlineOffsetY,
      inlineContainer: inlineContainer
    };
    this.openClasses = this._buildClasses("open");
    this.openingClasses = this._buildClasses("opening");
    this.closingClasses = this._buildClasses("closing");
    this.inlineClasses = this._buildClasses("inline");
    this.loadingClasses = this._buildClasses("loading");

    this._buildElement();
  }

  _createClass(ZoomPane, [{
    key: "_buildClasses",
    value: function _buildClasses(suffix) {
      var classes = ["drift-".concat(suffix)];
      var ns = this.settings.namespace;

      if (ns) {
        classes.push("".concat(ns, "-").concat(suffix));
      }

      return classes;
    }
  }, {
    key: "_buildElement",
    value: function _buildElement() {
      this.el = document.createElement("div");
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this._buildClasses("zoom-pane"));
      var loaderEl = document.createElement("div");
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(loaderEl, this._buildClasses("zoom-pane-loader"));
      this.el.appendChild(loaderEl);
      this.imgEl = document.createElement("img");
      this.el.appendChild(this.imgEl);
    }
  }, {
    key: "_setImageURL",
    value: function _setImageURL(imageURL) {
      this.imgEl.setAttribute("src", imageURL);
    }
  }, {
    key: "_setImageSize",
    value: function _setImageSize(triggerWidth, triggerHeight) {
      this.imgEl.style.width = "".concat(triggerWidth * this.settings.zoomFactor, "px");
      this.imgEl.style.height = "".concat(triggerHeight * this.settings.zoomFactor, "px");
    } // `percentageOffsetX` and `percentageOffsetY` must be percentages
    // expressed as floats between `0' and `1`.

  }, {
    key: "setPosition",
    value: function setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
      var imgElWidth = this.imgEl.offsetWidth;
      var imgElHeight = this.imgEl.offsetHeight;
      var elWidth = this.el.offsetWidth;
      var elHeight = this.el.offsetHeight;
      var centreOfContainerX = elWidth / 2;
      var centreOfContainerY = elHeight / 2;
      var targetImgXToBeCentre = imgElWidth * percentageOffsetX;
      var targetImgYToBeCentre = imgElHeight * percentageOffsetY;
      var left = centreOfContainerX - targetImgXToBeCentre;
      var top = centreOfContainerY - targetImgYToBeCentre;
      var differenceBetweenContainerWidthAndImgWidth = elWidth - imgElWidth;
      var differenceBetweenContainerHeightAndImgHeight = elHeight - imgElHeight;
      var isContainerLargerThanImgX = differenceBetweenContainerWidthAndImgWidth > 0;
      var isContainerLargerThanImgY = differenceBetweenContainerHeightAndImgHeight > 0;
      var minLeft = isContainerLargerThanImgX ? differenceBetweenContainerWidthAndImgWidth / 2 : 0;
      var minTop = isContainerLargerThanImgY ? differenceBetweenContainerHeightAndImgHeight / 2 : 0;
      var maxLeft = isContainerLargerThanImgX ? differenceBetweenContainerWidthAndImgWidth / 2 : differenceBetweenContainerWidthAndImgWidth;
      var maxTop = isContainerLargerThanImgY ? differenceBetweenContainerHeightAndImgHeight / 2 : differenceBetweenContainerHeightAndImgHeight;

      if (this.el.parentElement === this.settings.inlineContainer) {
        // This may be needed in the future to deal with browser event
        // inconsistencies, but it's difficult to tell for sure.
        // let scrollX = isTouch ? 0 : window.scrollX;
        // let scrollY = isTouch ? 0 : window.scrollY;
        var scrollX = window.pageXOffset;
        var scrollY = window.pageYOffset;
        var inlineLeft = triggerRect.left + percentageOffsetX * triggerRect.width - elWidth / 2 + this.settings.inlineOffsetX + scrollX;
        var inlineTop = triggerRect.top + percentageOffsetY * triggerRect.height - elHeight / 2 + this.settings.inlineOffsetY + scrollY;

        if (this.settings.containInline) {
          if (inlineLeft < triggerRect.left + scrollX) {
            inlineLeft = triggerRect.left + scrollX;
          } else if (inlineLeft + elWidth > triggerRect.left + triggerRect.width + scrollX) {
            inlineLeft = triggerRect.left + triggerRect.width - elWidth + scrollX;
          }

          if (inlineTop < triggerRect.top + scrollY) {
            inlineTop = triggerRect.top + scrollY;
          } else if (inlineTop + elHeight > triggerRect.top + triggerRect.height + scrollY) {
            inlineTop = triggerRect.top + triggerRect.height - elHeight + scrollY;
          }
        }

        this.el.style.left = "".concat(inlineLeft, "px");
        this.el.style.top = "".concat(inlineTop, "px");
      }

      if (!this.settings.showWhitespaceAtEdges) {
        if (left > minLeft) {
          left = minLeft;
        } else if (left < maxLeft) {
          left = maxLeft;
        }

        if (top > minTop) {
          top = minTop;
        } else if (top < maxTop) {
          top = maxTop;
        }
      }

      this.imgEl.style.transform = "translate(".concat(left, "px, ").concat(top, "px)");
      this.imgEl.style.webkitTransform = "translate(".concat(left, "px, ").concat(top, "px)");
    }
  }, {
    key: "_removeListenersAndResetClasses",
    value: function _removeListenersAndResetClasses() {
      this.el.removeEventListener("animationend", this._completeShow, false);
      this.el.removeEventListener("animationend", this._completeHide, false);
      this.el.removeEventListener("webkitAnimationEnd", this._completeShow, false);
      this.el.removeEventListener("webkitAnimationEnd", this._completeHide, false);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.openClasses);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.closingClasses);
    }
  }, {
    key: "show",
    value: function show(imageURL, triggerWidth, triggerHeight) {
      this._removeListenersAndResetClasses();

      this.isShowing = true;
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.openClasses);

      if (this.imgEl.getAttribute("src") != imageURL) {
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.loadingClasses);
        this.imgEl.addEventListener("load", this._handleLoad, false);

        this._setImageURL(imageURL);
      }

      this._setImageSize(triggerWidth, triggerHeight);

      if (this._isInline) {
        this._showInline();
      } else {
        this._showInContainer();
      }

      if (this.HAS_ANIMATION) {
        this.el.addEventListener("animationend", this._completeShow, false);
        this.el.addEventListener("webkitAnimationEnd", this._completeShow, false);
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.openingClasses);
      }
    }
  }, {
    key: "_showInline",
    value: function _showInline() {
      this.settings.inlineContainer.appendChild(this.el);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.inlineClasses);
    }
  }, {
    key: "_showInContainer",
    value: function _showInContainer() {
      this.settings.container.appendChild(this.el);
    }
  }, {
    key: "hide",
    value: function hide() {
      this._removeListenersAndResetClasses();

      this.isShowing = false;

      if (this.HAS_ANIMATION) {
        this.el.addEventListener("animationend", this._completeHide, false);
        this.el.addEventListener("webkitAnimationEnd", this._completeHide, false);
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.addClasses)(this.el, this.closingClasses);
      } else {
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.openClasses);
        (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.inlineClasses);
      }
    }
  }, {
    key: "_completeShow",
    value: function _completeShow() {
      this.el.removeEventListener("animationend", this._completeShow, false);
      this.el.removeEventListener("webkitAnimationEnd", this._completeShow, false);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.openingClasses);
    }
  }, {
    key: "_completeHide",
    value: function _completeHide() {
      this.el.removeEventListener("animationend", this._completeHide, false);
      this.el.removeEventListener("webkitAnimationEnd", this._completeHide, false);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.openClasses);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.closingClasses);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.inlineClasses);
      this.el.style.left = "";
      this.el.style.top = ""; // The window could have been resized above or below `inline`
      // limits since the ZoomPane was shown. Because of this, we
      // can't rely on `this._isInline` here.

      if (this.el.parentElement === this.settings.container) {
        this.settings.container.removeChild(this.el);
      } else if (this.el.parentElement === this.settings.inlineContainer) {
        this.settings.inlineContainer.removeChild(this.el);
      }
    }
  }, {
    key: "_handleLoad",
    value: function _handleLoad() {
      this.imgEl.removeEventListener("load", this._handleLoad, false);
      (0,_util_dom__WEBPACK_IMPORTED_MODULE_1__.removeClasses)(this.el, this.loadingClasses);
    }
  }, {
    key: "_isInline",
    get: function get() {
      var inline = this.settings.inline;
      return inline === true || typeof inline === "number" && window.innerWidth <= inline;
    }
  }]);

  return ZoomPane;
}();


//# sourceMappingURL=ZoomPane.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/injectBaseStylesheet.js":
/*!************************************************************!*\
  !*** ./node_modules/drift-zoom/es/injectBaseStylesheet.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ injectBaseStylesheet)
/* harmony export */ });
/* UNMINIFIED RULES

const RULES = `
@keyframes noop {
  0% { zoom: 1; }
}

@-webkit-keyframes noop {
  0% { zoom: 1; }
}

.drift-zoom-pane.drift-open {
  display: block;
}

.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {
  animation: noop 1ms;
  -webkit-animation: noop 1ms;
}

.drift-zoom-pane {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.drift-zoom-pane-loader {
  display: none;
}

.drift-zoom-pane img {
  position: absolute;
  display: block;
  max-width: none;
  max-height: none;
}

.drift-bounding-box {
  position: absolute;
  pointer-events: none;
}
`;

*/
var RULES = ".drift-bounding-box,.drift-zoom-pane{position:absolute;pointer-events:none}@keyframes noop{0%{zoom:1}}@-webkit-keyframes noop{0%{zoom:1}}.drift-zoom-pane.drift-open{display:block}.drift-zoom-pane.drift-closing,.drift-zoom-pane.drift-opening{animation:noop 1ms;-webkit-animation:noop 1ms}.drift-zoom-pane{overflow:hidden;width:100%;height:100%;top:0;left:0}.drift-zoom-pane-loader{display:none}.drift-zoom-pane img{position:absolute;display:block;max-width:none;max-height:none}";
function injectBaseStylesheet() {
  if (document.querySelector(".drift-base-styles")) {
    return;
  }

  var styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.classList.add("drift-base-styles");
  styleEl.appendChild(document.createTextNode(RULES));
  var head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}
//# sourceMappingURL=injectBaseStylesheet.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/util/dom.js":
/*!************************************************!*\
  !*** ./node_modules/drift-zoom/es/util/dom.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addClasses: () => (/* binding */ addClasses),
/* harmony export */   isDOMElement: () => (/* binding */ isDOMElement),
/* harmony export */   removeClasses: () => (/* binding */ removeClasses)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var HAS_DOM_2 = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object";
function isDOMElement(obj) {
  return HAS_DOM_2 ? obj instanceof HTMLElement : obj && _typeof(obj) === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string";
}
function addClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.add(className);
  });
}
function removeClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.remove(className);
  });
}
//# sourceMappingURL=dom.js.map

/***/ }),

/***/ "./node_modules/drift-zoom/es/util/throwIfMissing.js":
/*!***********************************************************!*\
  !*** ./node_modules/drift-zoom/es/util/throwIfMissing.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ throwIfMissing)
/* harmony export */ });
function throwIfMissing() {
  throw new Error("Missing parameter");
}
//# sourceMappingURL=throwIfMissing.js.map

/***/ }),

/***/ "./vendor/spryker/state-machine/assets/Zed/scss/main.scss":
/*!****************************************************************!*\
  !*** ./vendor/spryker/state-machine/assets/Zed/scss/main.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/state-machine/assets/Zed/js/spryker-zed-statemachine-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zdGF0ZW1hY2hpbmUtbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFa0I7QUFFL0JDLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCLElBQUlDLFlBQVksR0FBR0YsUUFBUSxDQUFDRyxzQkFBc0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEUsSUFBSUMsYUFBYSxHQUFHSixRQUFRLENBQUNHLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0VBRXhFLElBQUlMLGtEQUFLLENBQUNJLFlBQVksRUFBRTtJQUNwQkcsYUFBYSxFQUFFLElBQUk7SUFDbkJDLGVBQWUsRUFBRSxLQUFLO0lBQ3RCQyxnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCQyxhQUFhLEVBQUVKLGFBQWE7SUFDNUJLLFVBQVUsRUFBRSxHQUFHO0lBQ2ZDLGFBQWEsRUFBRSxDQUFDO0VBQ3BCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3JCVzs7QUFFYkMsbUJBQU8sQ0FBQyw4RUFBUyxDQUFDO0FBQ2xCQSxtQkFBTyxDQUFDLHNGQUFzQixDQUFDOzs7Ozs7Ozs7O0FDSGxCOztBQUViQSxtQkFBTyxDQUFDLG9GQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRnpCLGtEQUFrRCwwQ0FBMEM7O0FBRTVGLDRDQUE0QyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVEOztBQUUvUCw4REFBOEQsc0VBQXNFLDhEQUE4RDs7QUFFL0k7QUFDSTs7QUFFdkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELGdFQUFjO0FBQ3BFO0FBQ0Esd0RBQXdELGdFQUFjO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QkFBd0IsT0FBTyxrQ0FBa0MsbUlBQW1JOztBQUVwVztBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsQmU7QUFDZjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDSEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zdGF0ZS1tYWNoaW5lL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zdGF0ZS1tYWNoaW5lL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3N0YXRlLW1hY2hpbmUvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1zdGF0ZW1hY2hpbmUtbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvZHJpZnQtem9vbS9lcy9Cb3VuZGluZ0JveC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvZHJpZnQtem9vbS9lcy9EcmlmdC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvZHJpZnQtem9vbS9lcy9UcmlnZ2VyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9kcmlmdC16b29tL2VzL1pvb21QYW5lLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9kcmlmdC16b29tL2VzL2luamVjdEJhc2VTdHlsZXNoZWV0LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9kcmlmdC16b29tL2VzL3V0aWwvZG9tLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9kcmlmdC16b29tL2VzL3V0aWwvdGhyb3dJZk1pc3NpbmcuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc3RhdGUtbWFjaGluZS9hc3NldHMvWmVkL3Njc3MvbWFpbi5zY3NzPzZlMzEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgRHJpZnQgZnJvbSAnZHJpZnQtem9vbSc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1hZ2VQcmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHJldmlldy1pbWFnZScpWzBdO1xuICAgIHZhciB6b29tQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnem9vbS1jb250YWluZXInKVswXTtcblxuICAgIG5ldyBEcmlmdChpbWFnZVByZXZpZXcsIHtcbiAgICAgICAgY29udGFpbklubGluZTogdHJ1ZSxcbiAgICAgICAgc291cmNlQXR0cmlidXRlOiAnc3JjJyxcbiAgICAgICAgaG92ZXJCb3VuZGluZ0JveDogdHJ1ZSxcbiAgICAgICAgcGFuZUNvbnRhaW5lcjogem9vbUNvbnRhaW5lcixcbiAgICAgICAgaW5saW5lUGFuZTogOTAwLFxuICAgICAgICBpbmxpbmVPZmZzZXRZOiAtODUsXG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9sb2dpYycpO1xucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYWluLnNjc3MnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuaW1wb3J0IHRocm93SWZNaXNzaW5nIGZyb20gXCIuL3V0aWwvdGhyb3dJZk1pc3NpbmdcIjtcbmltcG9ydCB7IGFkZENsYXNzZXMsIHJlbW92ZUNsYXNzZXMgfSBmcm9tIFwiLi91dGlsL2RvbVwiO1xuXG52YXIgQm91bmRpbmdCb3ggPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCb3VuZGluZ0JveChvcHRpb25zKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJvdW5kaW5nQm94KTtcblxuICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XG4gICAgdmFyIF9vcHRpb25zJG5hbWVzcGFjZSA9IG9wdGlvbnMubmFtZXNwYWNlLFxuICAgICAgICBuYW1lc3BhY2UgPSBfb3B0aW9ucyRuYW1lc3BhY2UgPT09IHZvaWQgMCA/IG51bGwgOiBfb3B0aW9ucyRuYW1lc3BhY2UsXG4gICAgICAgIF9vcHRpb25zJHpvb21GYWN0b3IgPSBvcHRpb25zLnpvb21GYWN0b3IsXG4gICAgICAgIHpvb21GYWN0b3IgPSBfb3B0aW9ucyR6b29tRmFjdG9yID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkem9vbUZhY3RvcixcbiAgICAgICAgX29wdGlvbnMkY29udGFpbmVyRWwgPSBvcHRpb25zLmNvbnRhaW5lckVsLFxuICAgICAgICBjb250YWluZXJFbCA9IF9vcHRpb25zJGNvbnRhaW5lckVsID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkY29udGFpbmVyRWw7XG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlLFxuICAgICAgem9vbUZhY3Rvcjogem9vbUZhY3RvcixcbiAgICAgIGNvbnRhaW5lckVsOiBjb250YWluZXJFbFxuICAgIH07XG4gICAgdGhpcy5vcGVuQ2xhc3NlcyA9IHRoaXMuX2J1aWxkQ2xhc3NlcyhcIm9wZW5cIik7XG5cbiAgICB0aGlzLl9idWlsZEVsZW1lbnQoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhCb3VuZGluZ0JveCwgW3tcbiAgICBrZXk6IFwiX2J1aWxkQ2xhc3Nlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYnVpbGRDbGFzc2VzKHN1ZmZpeCkge1xuICAgICAgdmFyIGNsYXNzZXMgPSBbXCJkcmlmdC1cIi5jb25jYXQoc3VmZml4KV07XG4gICAgICB2YXIgbnMgPSB0aGlzLnNldHRpbmdzLm5hbWVzcGFjZTtcblxuICAgICAgaWYgKG5zKSB7XG4gICAgICAgIGNsYXNzZXMucHVzaChcIlwiLmNvbmNhdChucywgXCItXCIpLmNvbmNhdChzdWZmaXgpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9idWlsZEVsZW1lbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2J1aWxkRWxlbWVudCgpIHtcbiAgICAgIHRoaXMuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLl9idWlsZENsYXNzZXMoXCJib3VuZGluZy1ib3hcIikpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJzaG93XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coem9vbVBhbmVXaWR0aCwgem9vbVBhbmVIZWlnaHQpIHtcbiAgICAgIHRoaXMuaXNTaG93aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgICB2YXIgc3R5bGUgPSB0aGlzLmVsLnN0eWxlO1xuICAgICAgc3R5bGUud2lkdGggPSBcIlwiLmNvbmNhdChNYXRoLnJvdW5kKHpvb21QYW5lV2lkdGggLyB0aGlzLnNldHRpbmdzLnpvb21GYWN0b3IpLCBcInB4XCIpO1xuICAgICAgc3R5bGUuaGVpZ2h0ID0gXCJcIi5jb25jYXQoTWF0aC5yb3VuZCh6b29tUGFuZUhlaWdodCAvIHRoaXMuc2V0dGluZ3Muem9vbUZhY3RvciksIFwicHhcIik7XG4gICAgICBhZGRDbGFzc2VzKHRoaXMuZWwsIHRoaXMub3BlbkNsYXNzZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJoaWRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLmVsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcbiAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5lbCwgdGhpcy5vcGVuQ2xhc3Nlcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNldFBvc2l0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFBvc2l0aW9uKHBlcmNlbnRhZ2VPZmZzZXRYLCBwZXJjZW50YWdlT2Zmc2V0WSwgdHJpZ2dlclJlY3QpIHtcbiAgICAgIHZhciBwYWdlWE9mZnNldCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgIHZhciBwYWdlWU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgIHZhciBpbmxpbmVMZWZ0ID0gdHJpZ2dlclJlY3QubGVmdCArIHBlcmNlbnRhZ2VPZmZzZXRYICogdHJpZ2dlclJlY3Qud2lkdGggLSB0aGlzLmVsLmNsaWVudFdpZHRoIC8gMiArIHBhZ2VYT2Zmc2V0O1xuICAgICAgdmFyIGlubGluZVRvcCA9IHRyaWdnZXJSZWN0LnRvcCArIHBlcmNlbnRhZ2VPZmZzZXRZICogdHJpZ2dlclJlY3QuaGVpZ2h0IC0gdGhpcy5lbC5jbGllbnRIZWlnaHQgLyAyICsgcGFnZVlPZmZzZXQ7XG5cbiAgICAgIGlmIChpbmxpbmVMZWZ0IDwgdHJpZ2dlclJlY3QubGVmdCArIHBhZ2VYT2Zmc2V0KSB7XG4gICAgICAgIGlubGluZUxlZnQgPSB0cmlnZ2VyUmVjdC5sZWZ0ICsgcGFnZVhPZmZzZXQ7XG4gICAgICB9IGVsc2UgaWYgKGlubGluZUxlZnQgKyB0aGlzLmVsLmNsaWVudFdpZHRoID4gdHJpZ2dlclJlY3QubGVmdCArIHRyaWdnZXJSZWN0LndpZHRoICsgcGFnZVhPZmZzZXQpIHtcbiAgICAgICAgaW5saW5lTGVmdCA9IHRyaWdnZXJSZWN0LmxlZnQgKyB0cmlnZ2VyUmVjdC53aWR0aCAtIHRoaXMuZWwuY2xpZW50V2lkdGggKyBwYWdlWE9mZnNldDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlubGluZVRvcCA8IHRyaWdnZXJSZWN0LnRvcCArIHBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgIGlubGluZVRvcCA9IHRyaWdnZXJSZWN0LnRvcCArIHBhZ2VZT2Zmc2V0O1xuICAgICAgfSBlbHNlIGlmIChpbmxpbmVUb3AgKyB0aGlzLmVsLmNsaWVudEhlaWdodCA+IHRyaWdnZXJSZWN0LnRvcCArIHRyaWdnZXJSZWN0LmhlaWdodCArIHBhZ2VZT2Zmc2V0KSB7XG4gICAgICAgIGlubGluZVRvcCA9IHRyaWdnZXJSZWN0LnRvcCArIHRyaWdnZXJSZWN0LmhlaWdodCAtIHRoaXMuZWwuY2xpZW50SGVpZ2h0ICsgcGFnZVlPZmZzZXQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IFwiXCIuY29uY2F0KGlubGluZUxlZnQsIFwicHhcIik7XG4gICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IFwiXCIuY29uY2F0KGlubGluZVRvcCwgXCJweFwiKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQm91bmRpbmdCb3g7XG59KCk7XG5cbmV4cG9ydCB7IEJvdW5kaW5nQm94IGFzIGRlZmF1bHQgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJvdW5kaW5nQm94LmpzLm1hcCIsImZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH1cblxuaW1wb3J0IHsgaXNET01FbGVtZW50IH0gZnJvbSBcIi4vdXRpbC9kb21cIjtcbmltcG9ydCBpbmplY3RCYXNlU3R5bGVzaGVldCBmcm9tIFwiLi9pbmplY3RCYXNlU3R5bGVzaGVldFwiO1xuaW1wb3J0IFRyaWdnZXIgZnJvbSBcIi4vVHJpZ2dlclwiO1xuaW1wb3J0IFpvb21QYW5lIGZyb20gXCIuL1pvb21QYW5lXCI7XG5cbnZhciBEcmlmdCA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIERyaWZ0KHRyaWdnZXJFbCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEcmlmdCk7XG5cbiAgICB0aGlzLlZFUlNJT04gPSBcIjEuNC40XCI7XG4gICAgdGhpcy50cmlnZ2VyRWwgPSB0cmlnZ2VyRWw7XG4gICAgdGhpcy5kZXN0cm95ID0gdGhpcy5kZXN0cm95LmJpbmQodGhpcyk7XG5cbiAgICBpZiAoIWlzRE9NRWxlbWVudCh0aGlzLnRyaWdnZXJFbCkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJgbmV3IERyaWZ0YCByZXF1aXJlcyBhIERPTSBlbGVtZW50IGFzIGl0cyBmaXJzdCBhcmd1bWVudC5cIik7XG4gICAgfSAvLyBQcmVmaXggZm9yIGdlbmVyYXRlZCBlbGVtZW50IGNsYXNzIG5hbWVzIChlLmcuIGBteS1uc2Agd2lsbFxuICAgIC8vIHJlc3VsdCBpbiBjbGFzc2VzIHN1Y2ggYXMgYG15LW5zLXBhbmVgLiBEZWZhdWx0IGBkcmlmdC1gXG4gICAgLy8gcHJlZml4ZWQgY2xhc3NlcyB3aWxsIGFsd2F5cyBiZSBhZGRlZCBhcyB3ZWxsLlxuXG5cbiAgICB2YXIgbmFtZXNwYWNlID0gb3B0aW9uc1tcIm5hbWVzcGFjZVwiXSB8fCBudWxsOyAvLyBXaGV0aGVyIHRoZSBab29tUGFuZSBzaG91bGQgc2hvdyB3aGl0ZXNwYWNlIHdoZW4gbmVhciB0aGUgZWRnZXMuXG5cbiAgICB2YXIgc2hvd1doaXRlc3BhY2VBdEVkZ2VzID0gb3B0aW9uc1tcInNob3dXaGl0ZXNwYWNlQXRFZGdlc1wiXSB8fCBmYWxzZTsgLy8gV2hldGhlciB0aGUgaW5saW5lIFpvb21QYW5lIHNob3VsZCBzdGF5IGluc2lkZVxuICAgIC8vIHRoZSBib3VuZHMgb2YgaXRzIGltYWdlLlxuXG4gICAgdmFyIGNvbnRhaW5JbmxpbmUgPSBvcHRpb25zW1wiY29udGFpbklubGluZVwiXSB8fCBmYWxzZTsgLy8gSG93IG11Y2ggdG8gb2Zmc2V0IHRoZSBab29tUGFuZSBmcm9tIHRoZVxuICAgIC8vIGludGVyYWN0aW9uIHBvaW50IHdoZW4gaW5saW5lLlxuXG4gICAgdmFyIGlubGluZU9mZnNldFggPSBvcHRpb25zW1wiaW5saW5lT2Zmc2V0WFwiXSB8fCAwO1xuICAgIHZhciBpbmxpbmVPZmZzZXRZID0gb3B0aW9uc1tcImlubGluZU9mZnNldFlcIl0gfHwgMDsgLy8gQSBET00gZWxlbWVudCB0byBhcHBlbmQgdGhlIGlubGluZSBab29tUGFuZSB0b1xuXG4gICAgdmFyIGlubGluZUNvbnRhaW5lciA9IG9wdGlvbnNbXCJpbmxpbmVDb250YWluZXJcIl0gfHwgZG9jdW1lbnQuYm9keTsgLy8gV2hpY2ggdHJpZ2dlciBhdHRyaWJ1dGUgdG8gcHVsbCB0aGUgWm9vbVBhbmUgaW1hZ2Ugc291cmNlIGZyb20uXG5cbiAgICB2YXIgc291cmNlQXR0cmlidXRlID0gb3B0aW9uc1tcInNvdXJjZUF0dHJpYnV0ZVwiXSB8fCBcImRhdGEtem9vbVwiOyAvLyBIb3cgbXVjaCB0byBtYWduaWZ5IHRoZSB0cmlnZ2VyIGJ5IGluIHRoZSBab29tUGFuZS5cbiAgICAvLyAoZS5nLiwgYHpvb21GYWN0b3I6IDNgIHdpbGwgcmVzdWx0IGluIGEgOTAwIHB4IHdpZGUgWm9vbVBhbmUgaW1hZ1xuICAgIC8vIGlmIHRoZSB0cmlnZ2VyIGlzIGRpc3BsYXllZCBhdCAzMDAgcHggd2lkZSlcblxuICAgIHZhciB6b29tRmFjdG9yID0gb3B0aW9uc1tcInpvb21GYWN0b3JcIl0gfHwgMzsgLy8gQSBET00gZWxlbWVudCB0byBhcHBlbmQgdGhlIG5vbi1pbmxpbmUgWm9vbVBhbmUgdG8uXG4gICAgLy8gUmVxdWlyZWQgaWYgYGlubGluZVBhbmUgIT09IHRydWVgLlxuXG4gICAgdmFyIHBhbmVDb250YWluZXIgPSBvcHRpb25zW1wicGFuZUNvbnRhaW5lclwiXSA9PT0gdW5kZWZpbmVkID8gZG9jdW1lbnQuYm9keSA6IG9wdGlvbnNbXCJwYW5lQ29udGFpbmVyXCJdOyAvLyBXaGVuIHRvIHN3aXRjaCB0byBhbiBpbmxpbmUgWm9vbVBhbmUuIFRoaXMgY2FuIGJlIGEgYm9vbGVhbiBvclxuICAgIC8vIGFuIGludGVnZXIuIElmIGB0cnVlYCwgdGhlIFpvb21QYW5lIHdpbGwgYWx3YXlzIGJlIGlubGluZSxcbiAgICAvLyBpZiBgZmFsc2VgLCBpdCB3aWxsIHN3aXRjaCB0byBpbmxpbmUgd2hlbiBgd2luZG93V2lkdGggPD0gaW5saW5lUGFuZWBcblxuICAgIHZhciBpbmxpbmVQYW5lID0gb3B0aW9uc1tcImlubGluZVBhbmVcIl0gfHwgMzc1OyAvLyBJZiBgdHJ1ZWAsIHRvdWNoIGV2ZW50cyB3aWxsIHRyaWdnZXIgdGhlIHpvb20sIGxpa2UgbW91c2UgZXZlbnRzLlxuXG4gICAgdmFyIGhhbmRsZVRvdWNoID0gXCJoYW5kbGVUb3VjaFwiIGluIG9wdGlvbnMgPyAhIW9wdGlvbnNbXCJoYW5kbGVUb3VjaFwiXSA6IHRydWU7IC8vIElmIHByZXNlbnQgKGFuZCBhIGZ1bmN0aW9uKSwgdGhpcyB3aWxsIGJlIGNhbGxlZFxuICAgIC8vIHdoZW5ldmVyIHRoZSBab29tUGFuZSBpcyBzaG93bi5cblxuICAgIHZhciBvblNob3cgPSBvcHRpb25zW1wib25TaG93XCJdIHx8IG51bGw7IC8vIElmIHByZXNlbnQgKGFuZCBhIGZ1bmN0aW9uKSwgdGhpcyB3aWxsIGJlIGNhbGxlZFxuICAgIC8vIHdoZW5ldmVyIHRoZSBab29tUGFuZSBpcyBoaWRkZW4uXG5cbiAgICB2YXIgb25IaWRlID0gb3B0aW9uc1tcIm9uSGlkZVwiXSB8fCBudWxsOyAvLyBBZGQgYmFzZSBzdHlsZXMgdG8gdGhlIHBhZ2UuIFNlZSB0aGUgXCJUaGVtaW5nXCJcbiAgICAvLyBzZWN0aW9uIG9mIFJFQURNRS5tZCBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cblxuICAgIHZhciBpbmplY3RCYXNlU3R5bGVzID0gXCJpbmplY3RCYXNlU3R5bGVzXCIgaW4gb3B0aW9ucyA/ICEhb3B0aW9uc1tcImluamVjdEJhc2VTdHlsZXNcIl0gOiB0cnVlOyAvLyBBbiBvcHRpb25hbCBudW1iZXIgdGhhdCBkZXRlcm1pbmVzIGhvdyBsb25nIHRvIHdhaXQgYmVmb3JlXG4gICAgLy8gc2hvd2luZyB0aGUgWm9vbVBhbmUgYmVjYXVzZSBvZiBhIGBtb3VzZWVudGVyYCBldmVudC5cblxuICAgIHZhciBob3ZlckRlbGF5ID0gb3B0aW9uc1tcImhvdmVyRGVsYXlcIl0gfHwgMDsgLy8gQW4gb3B0aW9uYWwgbnVtYmVyIHRoYXQgZGV0ZXJtaW5lcyBob3cgbG9uZyB0byB3YWl0IGJlZm9yZVxuICAgIC8vIHNob3dpbmcgdGhlIFpvb21QYW5lIGJlY2F1c2Ugb2YgYSBgdG91Y2hzdGFydGAgZXZlbnQuXG4gICAgLy8gSXQncyB1bmxpa2VseSB0aGF0IHlvdSB3b3VsZCB3YW50IHRvIHVzZSB0aGlzIG9wdGlvbiwgc2luY2VcbiAgICAvLyBcInRhcCBhbmQgaG9sZFwiIGlzIG11Y2ggbW9yZSBpbnRlbnRpb25hbCB0aGFuIGEgaG92ZXIgZXZlbnQuXG5cbiAgICB2YXIgdG91Y2hEZWxheSA9IG9wdGlvbnNbXCJ0b3VjaERlbGF5XCJdIHx8IDA7IC8vIElmIHRydWUsIGEgYm91bmRpbmcgYm94IHdpbGwgc2hvdyB0aGUgYXJlYSBjdXJyZW50bHkgYmVpbmcgcHJldmlld2VkXG4gICAgLy8gZHVyaW5nIG1vdXNlIGhvdmVyXG5cbiAgICB2YXIgaG92ZXJCb3VuZGluZ0JveCA9IG9wdGlvbnNbXCJob3ZlckJvdW5kaW5nQm94XCJdIHx8IGZhbHNlOyAvLyBJZiB0cnVlLCBhIGJvdW5kaW5nIGJveCB3aWxsIHNob3cgdGhlIGFyZWEgY3VycmVudGx5IGJlaW5nIHByZXZpZXdlZFxuICAgIC8vIGR1cmluZyB0b3VjaCBldmVudHNcblxuICAgIHZhciB0b3VjaEJvdW5kaW5nQm94ID0gb3B0aW9uc1tcInRvdWNoQm91bmRpbmdCb3hcIl0gfHwgZmFsc2U7IC8vIEEgRE9NIGVsZW1lbnQgdG8gYXBwZW5kIHRoZSBib3VuZGluZyBib3ggdG8uXG5cbiAgICB2YXIgYm91bmRpbmdCb3hDb250YWluZXIgPSBvcHRpb25zW1wiYm91bmRpbmdCb3hDb250YWluZXJcIl0gfHwgZG9jdW1lbnQuYm9keTtcblxuICAgIGlmIChpbmxpbmVQYW5lICE9PSB0cnVlICYmICFpc0RPTUVsZW1lbnQocGFuZUNvbnRhaW5lcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJgcGFuZUNvbnRhaW5lcmAgbXVzdCBiZSBhIERPTSBlbGVtZW50IHdoZW4gYGlubGluZVBhbmUgIT09IHRydWVgXCIpO1xuICAgIH1cblxuICAgIGlmICghaXNET01FbGVtZW50KGlubGluZUNvbnRhaW5lcikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJgaW5saW5lQ29udGFpbmVyYCBtdXN0IGJlIGEgRE9NIGVsZW1lbnRcIik7XG4gICAgfVxuXG4gICAgdGhpcy5zZXR0aW5ncyA9IHtcbiAgICAgIG5hbWVzcGFjZTogbmFtZXNwYWNlLFxuICAgICAgc2hvd1doaXRlc3BhY2VBdEVkZ2VzOiBzaG93V2hpdGVzcGFjZUF0RWRnZXMsXG4gICAgICBjb250YWluSW5saW5lOiBjb250YWluSW5saW5lLFxuICAgICAgaW5saW5lT2Zmc2V0WDogaW5saW5lT2Zmc2V0WCxcbiAgICAgIGlubGluZU9mZnNldFk6IGlubGluZU9mZnNldFksXG4gICAgICBpbmxpbmVDb250YWluZXI6IGlubGluZUNvbnRhaW5lcixcbiAgICAgIHNvdXJjZUF0dHJpYnV0ZTogc291cmNlQXR0cmlidXRlLFxuICAgICAgem9vbUZhY3Rvcjogem9vbUZhY3RvcixcbiAgICAgIHBhbmVDb250YWluZXI6IHBhbmVDb250YWluZXIsXG4gICAgICBpbmxpbmVQYW5lOiBpbmxpbmVQYW5lLFxuICAgICAgaGFuZGxlVG91Y2g6IGhhbmRsZVRvdWNoLFxuICAgICAgb25TaG93OiBvblNob3csXG4gICAgICBvbkhpZGU6IG9uSGlkZSxcbiAgICAgIGluamVjdEJhc2VTdHlsZXM6IGluamVjdEJhc2VTdHlsZXMsXG4gICAgICBob3ZlckRlbGF5OiBob3ZlckRlbGF5LFxuICAgICAgdG91Y2hEZWxheTogdG91Y2hEZWxheSxcbiAgICAgIGhvdmVyQm91bmRpbmdCb3g6IGhvdmVyQm91bmRpbmdCb3gsXG4gICAgICB0b3VjaEJvdW5kaW5nQm94OiB0b3VjaEJvdW5kaW5nQm94LFxuICAgICAgYm91bmRpbmdCb3hDb250YWluZXI6IGJvdW5kaW5nQm94Q29udGFpbmVyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmluamVjdEJhc2VTdHlsZXMpIHtcbiAgICAgIGluamVjdEJhc2VTdHlsZXNoZWV0KCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYnVpbGRab29tUGFuZSgpO1xuXG4gICAgdGhpcy5fYnVpbGRUcmlnZ2VyKCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRHJpZnQsIFt7XG4gICAga2V5OiBcIl9idWlsZFpvb21QYW5lXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9idWlsZFpvb21QYW5lKCkge1xuICAgICAgdGhpcy56b29tUGFuZSA9IG5ldyBab29tUGFuZSh7XG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5zZXR0aW5ncy5wYW5lQ29udGFpbmVyLFxuICAgICAgICB6b29tRmFjdG9yOiB0aGlzLnNldHRpbmdzLnpvb21GYWN0b3IsXG4gICAgICAgIHNob3dXaGl0ZXNwYWNlQXRFZGdlczogdGhpcy5zZXR0aW5ncy5zaG93V2hpdGVzcGFjZUF0RWRnZXMsXG4gICAgICAgIGNvbnRhaW5JbmxpbmU6IHRoaXMuc2V0dGluZ3MuY29udGFpbklubGluZSxcbiAgICAgICAgaW5saW5lOiB0aGlzLnNldHRpbmdzLmlubGluZVBhbmUsXG4gICAgICAgIG5hbWVzcGFjZTogdGhpcy5zZXR0aW5ncy5uYW1lc3BhY2UsXG4gICAgICAgIGlubGluZU9mZnNldFg6IHRoaXMuc2V0dGluZ3MuaW5saW5lT2Zmc2V0WCxcbiAgICAgICAgaW5saW5lT2Zmc2V0WTogdGhpcy5zZXR0aW5ncy5pbmxpbmVPZmZzZXRZLFxuICAgICAgICBpbmxpbmVDb250YWluZXI6IHRoaXMuc2V0dGluZ3MuaW5saW5lQ29udGFpbmVyXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2J1aWxkVHJpZ2dlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYnVpbGRUcmlnZ2VyKCkge1xuICAgICAgdGhpcy50cmlnZ2VyID0gbmV3IFRyaWdnZXIoe1xuICAgICAgICBlbDogdGhpcy50cmlnZ2VyRWwsXG4gICAgICAgIHpvb21QYW5lOiB0aGlzLnpvb21QYW5lLFxuICAgICAgICBoYW5kbGVUb3VjaDogdGhpcy5zZXR0aW5ncy5oYW5kbGVUb3VjaCxcbiAgICAgICAgb25TaG93OiB0aGlzLnNldHRpbmdzLm9uU2hvdyxcbiAgICAgICAgb25IaWRlOiB0aGlzLnNldHRpbmdzLm9uSGlkZSxcbiAgICAgICAgc291cmNlQXR0cmlidXRlOiB0aGlzLnNldHRpbmdzLnNvdXJjZUF0dHJpYnV0ZSxcbiAgICAgICAgaG92ZXJEZWxheTogdGhpcy5zZXR0aW5ncy5ob3ZlckRlbGF5LFxuICAgICAgICB0b3VjaERlbGF5OiB0aGlzLnNldHRpbmdzLnRvdWNoRGVsYXksXG4gICAgICAgIGhvdmVyQm91bmRpbmdCb3g6IHRoaXMuc2V0dGluZ3MuaG92ZXJCb3VuZGluZ0JveCxcbiAgICAgICAgdG91Y2hCb3VuZGluZ0JveDogdGhpcy5zZXR0aW5ncy50b3VjaEJvdW5kaW5nQm94LFxuICAgICAgICBuYW1lc3BhY2U6IHRoaXMuc2V0dGluZ3MubmFtZXNwYWNlLFxuICAgICAgICB6b29tRmFjdG9yOiB0aGlzLnNldHRpbmdzLnpvb21GYWN0b3IsXG4gICAgICAgIGJvdW5kaW5nQm94Q29udGFpbmVyOiB0aGlzLnNldHRpbmdzLmJvdW5kaW5nQm94Q29udGFpbmVyXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwic2V0Wm9vbUltYWdlVVJMXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNldFpvb21JbWFnZVVSTChpbWFnZVVSTCkge1xuICAgICAgdGhpcy56b29tUGFuZS5fc2V0SW1hZ2VVUkwoaW1hZ2VVUkwpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkaXNhYmxlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB0aGlzLnRyaWdnZXIuZW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJlbmFibGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5hYmxlKCkge1xuICAgICAgdGhpcy50cmlnZ2VyLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJkZXN0cm95XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB0aGlzLnRyaWdnZXIuX2hpZGUoKTtcblxuICAgICAgdGhpcy50cmlnZ2VyLl91bmJpbmRFdmVudHMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNTaG93aW5nXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy56b29tUGFuZS5pc1Nob3dpbmc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInpvb21GYWN0b3JcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzLnpvb21GYWN0b3I7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh6Zikge1xuICAgICAgdGhpcy5zZXR0aW5ncy56b29tRmFjdG9yID0gemY7XG4gICAgICB0aGlzLnpvb21QYW5lLnNldHRpbmdzLnpvb21GYWN0b3IgPSB6ZjtcbiAgICAgIHRoaXMudHJpZ2dlci5zZXR0aW5ncy56b29tRmFjdG9yID0gemY7XG4gICAgICB0aGlzLmJvdW5kaW5nQm94LnNldHRpbmdzLnpvb21GYWN0b3IgPSB6ZjtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRHJpZnQ7XG59KCk7IC8vIFB1YmxpYyBBUElcblxuLyogZXNsaW50LWRpc2FibGUgbm8tc2VsZi1hc3NpZ24gKi9cblxuXG5leHBvcnQgeyBEcmlmdCBhcyBkZWZhdWx0IH07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHJpZnQucHJvdG90eXBlLCBcImlzU2hvd2luZ1wiLCB7XG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd2luZztcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRHJpZnQucHJvdG90eXBlLCBcInpvb21GYWN0b3JcIiwge1xuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gdGhpcy56b29tRmFjdG9yO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgIHRoaXMuem9vbUZhY3RvciA9IHZhbHVlO1xuICB9XG59KTtcbkRyaWZ0LnByb3RvdHlwZVtcInNldFpvb21JbWFnZVVSTFwiXSA9IERyaWZ0LnByb3RvdHlwZS5zZXRab29tSW1hZ2VVUkw7XG5EcmlmdC5wcm90b3R5cGVbXCJkaXNhYmxlXCJdID0gRHJpZnQucHJvdG90eXBlLmRpc2FibGU7XG5EcmlmdC5wcm90b3R5cGVbXCJlbmFibGVcIl0gPSBEcmlmdC5wcm90b3R5cGUuZW5hYmxlO1xuRHJpZnQucHJvdG90eXBlW1wiZGVzdHJveVwiXSA9IERyaWZ0LnByb3RvdHlwZS5kZXN0cm95O1xuLyogZXNsaW50LWVuYWJsZSBuby1zZWxmLWFzc2lnbiAqL1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RHJpZnQuanMubWFwIiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5pbXBvcnQgdGhyb3dJZk1pc3NpbmcgZnJvbSBcIi4vdXRpbC90aHJvd0lmTWlzc2luZ1wiO1xuaW1wb3J0IEJvdW5kaW5nQm94IGZyb20gXCIuL0JvdW5kaW5nQm94XCI7XG5cbnZhciBUcmlnZ2VyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gVHJpZ2dlcigpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVHJpZ2dlcik7XG5cbiAgICB0aGlzLl9zaG93ID0gdGhpcy5fc2hvdy5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hpZGUgPSB0aGlzLl9oaWRlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5faGFuZGxlRW50cnkgPSB0aGlzLl9oYW5kbGVFbnRyeS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuX2hhbmRsZU1vdmVtZW50ID0gdGhpcy5faGFuZGxlTW92ZW1lbnQuYmluZCh0aGlzKTtcbiAgICB2YXIgX29wdGlvbnMkZWwgPSBvcHRpb25zLmVsLFxuICAgICAgICBlbCA9IF9vcHRpb25zJGVsID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkZWwsXG4gICAgICAgIF9vcHRpb25zJHpvb21QYW5lID0gb3B0aW9ucy56b29tUGFuZSxcbiAgICAgICAgem9vbVBhbmUgPSBfb3B0aW9ucyR6b29tUGFuZSA9PT0gdm9pZCAwID8gdGhyb3dJZk1pc3NpbmcoKSA6IF9vcHRpb25zJHpvb21QYW5lLFxuICAgICAgICBfb3B0aW9ucyRzb3VyY2VBdHRyaWIgPSBvcHRpb25zLnNvdXJjZUF0dHJpYnV0ZSxcbiAgICAgICAgc291cmNlQXR0cmlidXRlID0gX29wdGlvbnMkc291cmNlQXR0cmliID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkc291cmNlQXR0cmliLFxuICAgICAgICBfb3B0aW9ucyRoYW5kbGVUb3VjaCA9IG9wdGlvbnMuaGFuZGxlVG91Y2gsXG4gICAgICAgIGhhbmRsZVRvdWNoID0gX29wdGlvbnMkaGFuZGxlVG91Y2ggPT09IHZvaWQgMCA/IHRocm93SWZNaXNzaW5nKCkgOiBfb3B0aW9ucyRoYW5kbGVUb3VjaCxcbiAgICAgICAgX29wdGlvbnMkb25TaG93ID0gb3B0aW9ucy5vblNob3csXG4gICAgICAgIG9uU2hvdyA9IF9vcHRpb25zJG9uU2hvdyA9PT0gdm9pZCAwID8gbnVsbCA6IF9vcHRpb25zJG9uU2hvdyxcbiAgICAgICAgX29wdGlvbnMkb25IaWRlID0gb3B0aW9ucy5vbkhpZGUsXG4gICAgICAgIG9uSGlkZSA9IF9vcHRpb25zJG9uSGlkZSA9PT0gdm9pZCAwID8gbnVsbCA6IF9vcHRpb25zJG9uSGlkZSxcbiAgICAgICAgX29wdGlvbnMkaG92ZXJEZWxheSA9IG9wdGlvbnMuaG92ZXJEZWxheSxcbiAgICAgICAgaG92ZXJEZWxheSA9IF9vcHRpb25zJGhvdmVyRGVsYXkgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyRob3ZlckRlbGF5LFxuICAgICAgICBfb3B0aW9ucyR0b3VjaERlbGF5ID0gb3B0aW9ucy50b3VjaERlbGF5LFxuICAgICAgICB0b3VjaERlbGF5ID0gX29wdGlvbnMkdG91Y2hEZWxheSA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHRvdWNoRGVsYXksXG4gICAgICAgIF9vcHRpb25zJGhvdmVyQm91bmRpbiA9IG9wdGlvbnMuaG92ZXJCb3VuZGluZ0JveCxcbiAgICAgICAgaG92ZXJCb3VuZGluZ0JveCA9IF9vcHRpb25zJGhvdmVyQm91bmRpbiA9PT0gdm9pZCAwID8gdGhyb3dJZk1pc3NpbmcoKSA6IF9vcHRpb25zJGhvdmVyQm91bmRpbixcbiAgICAgICAgX29wdGlvbnMkdG91Y2hCb3VuZGluID0gb3B0aW9ucy50b3VjaEJvdW5kaW5nQm94LFxuICAgICAgICB0b3VjaEJvdW5kaW5nQm94ID0gX29wdGlvbnMkdG91Y2hCb3VuZGluID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkdG91Y2hCb3VuZGluLFxuICAgICAgICBfb3B0aW9ucyRuYW1lc3BhY2UgPSBvcHRpb25zLm5hbWVzcGFjZSxcbiAgICAgICAgbmFtZXNwYWNlID0gX29wdGlvbnMkbmFtZXNwYWNlID09PSB2b2lkIDAgPyBudWxsIDogX29wdGlvbnMkbmFtZXNwYWNlLFxuICAgICAgICBfb3B0aW9ucyR6b29tRmFjdG9yID0gb3B0aW9ucy56b29tRmFjdG9yLFxuICAgICAgICB6b29tRmFjdG9yID0gX29wdGlvbnMkem9vbUZhY3RvciA9PT0gdm9pZCAwID8gdGhyb3dJZk1pc3NpbmcoKSA6IF9vcHRpb25zJHpvb21GYWN0b3IsXG4gICAgICAgIF9vcHRpb25zJGJvdW5kaW5nQm94QyA9IG9wdGlvbnMuYm91bmRpbmdCb3hDb250YWluZXIsXG4gICAgICAgIGJvdW5kaW5nQm94Q29udGFpbmVyID0gX29wdGlvbnMkYm91bmRpbmdCb3hDID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkYm91bmRpbmdCb3hDO1xuICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICBlbDogZWwsXG4gICAgICB6b29tUGFuZTogem9vbVBhbmUsXG4gICAgICBzb3VyY2VBdHRyaWJ1dGU6IHNvdXJjZUF0dHJpYnV0ZSxcbiAgICAgIGhhbmRsZVRvdWNoOiBoYW5kbGVUb3VjaCxcbiAgICAgIG9uU2hvdzogb25TaG93LFxuICAgICAgb25IaWRlOiBvbkhpZGUsXG4gICAgICBob3ZlckRlbGF5OiBob3ZlckRlbGF5LFxuICAgICAgdG91Y2hEZWxheTogdG91Y2hEZWxheSxcbiAgICAgIGhvdmVyQm91bmRpbmdCb3g6IGhvdmVyQm91bmRpbmdCb3gsXG4gICAgICB0b3VjaEJvdW5kaW5nQm94OiB0b3VjaEJvdW5kaW5nQm94LFxuICAgICAgbmFtZXNwYWNlOiBuYW1lc3BhY2UsXG4gICAgICB6b29tRmFjdG9yOiB6b29tRmFjdG9yLFxuICAgICAgYm91bmRpbmdCb3hDb250YWluZXI6IGJvdW5kaW5nQm94Q29udGFpbmVyXG4gICAgfTtcblxuICAgIGlmICh0aGlzLnNldHRpbmdzLmhvdmVyQm91bmRpbmdCb3ggfHwgdGhpcy5zZXR0aW5ncy50b3VjaEJvdW5kaW5nQm94KSB7XG4gICAgICB0aGlzLmJvdW5kaW5nQm94ID0gbmV3IEJvdW5kaW5nQm94KHtcbiAgICAgICAgbmFtZXNwYWNlOiB0aGlzLnNldHRpbmdzLm5hbWVzcGFjZSxcbiAgICAgICAgem9vbUZhY3RvcjogdGhpcy5zZXR0aW5ncy56b29tRmFjdG9yLFxuICAgICAgICBjb250YWluZXJFbDogdGhpcy5zZXR0aW5ncy5ib3VuZGluZ0JveENvbnRhaW5lclxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuICAgIHRoaXMuX2JpbmRFdmVudHMoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhUcmlnZ2VyLCBbe1xuICAgIGtleTogXCJfcHJldmVudERlZmF1bHRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3ByZXZlbnREZWZhdWx0KGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfcHJldmVudERlZmF1bHRBbGxvd1RvdWNoU2Nyb2xsXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9wcmV2ZW50RGVmYXVsdEFsbG93VG91Y2hTY3JvbGwoZXZlbnQpIHtcbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy50b3VjaERlbGF5IHx8ICF0aGlzLl9pc1RvdWNoRXZlbnQoZXZlbnQpIHx8IHRoaXMuaXNTaG93aW5nKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9pc1RvdWNoRXZlbnRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2lzVG91Y2hFdmVudChldmVudCkge1xuICAgICAgcmV0dXJuICEhZXZlbnQudG91Y2hlcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2JpbmRFdmVudHNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2JpbmRFdmVudHMoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuX2hhbmRsZUVudHJ5LCBmYWxzZSk7XG4gICAgICB0aGlzLnNldHRpbmdzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuX2hpZGUsIGZhbHNlKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9oYW5kbGVNb3ZlbWVudCwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5oYW5kbGVUb3VjaCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX2hhbmRsZUVudHJ5LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX2hpZGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5lbC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX2hhbmRsZU1vdmVtZW50LCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX3ByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3ByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9wcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfdW5iaW5kRXZlbnRzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF91bmJpbmRFdmVudHMoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIHRoaXMuX2hhbmRsZUVudHJ5LCBmYWxzZSk7XG4gICAgICB0aGlzLnNldHRpbmdzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRoaXMuX2hpZGUsIGZhbHNlKTtcbiAgICAgIHRoaXMuc2V0dGluZ3MuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9oYW5kbGVNb3ZlbWVudCwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5oYW5kbGVUb3VjaCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX2hhbmRsZUVudHJ5LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX2hpZGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRoaXMuX2hhbmRsZU1vdmVtZW50LCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldHRpbmdzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX3ByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3ByZXZlbnREZWZhdWx0LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9wcmV2ZW50RGVmYXVsdCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaGFuZGxlRW50cnlcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hhbmRsZUVudHJ5KGUpIHtcbiAgICAgIHRoaXMuX3ByZXZlbnREZWZhdWx0QWxsb3dUb3VjaFNjcm9sbChlKTtcblxuICAgICAgdGhpcy5fbGFzdE1vdmVtZW50ID0gZTtcblxuICAgICAgaWYgKGUudHlwZSA9PSBcIm1vdXNlZW50ZXJcIiAmJiB0aGlzLnNldHRpbmdzLmhvdmVyRGVsYXkpIHtcbiAgICAgICAgdGhpcy5lbnRyeVRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX3Nob3csIHRoaXMuc2V0dGluZ3MuaG92ZXJEZWxheSk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuc2V0dGluZ3MudG91Y2hEZWxheSkge1xuICAgICAgICB0aGlzLmVudHJ5VGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5fc2hvdywgdGhpcy5zZXR0aW5ncy50b3VjaERlbGF5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Nob3coKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3Nob3dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3coKSB7XG4gICAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBvblNob3cgPSB0aGlzLnNldHRpbmdzLm9uU2hvdztcblxuICAgICAgaWYgKG9uU2hvdyAmJiB0eXBlb2Ygb25TaG93ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgb25TaG93KCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0dGluZ3Muem9vbVBhbmUuc2hvdyh0aGlzLnNldHRpbmdzLmVsLmdldEF0dHJpYnV0ZSh0aGlzLnNldHRpbmdzLnNvdXJjZUF0dHJpYnV0ZSksIHRoaXMuc2V0dGluZ3MuZWwuY2xpZW50V2lkdGgsIHRoaXMuc2V0dGluZ3MuZWwuY2xpZW50SGVpZ2h0KTtcblxuICAgICAgaWYgKHRoaXMuX2xhc3RNb3ZlbWVudCkge1xuICAgICAgICB2YXIgdG91Y2hBY3RpdmF0ZWQgPSB0aGlzLl9sYXN0TW92ZW1lbnQudG91Y2hlcztcblxuICAgICAgICBpZiAodG91Y2hBY3RpdmF0ZWQgJiYgdGhpcy5zZXR0aW5ncy50b3VjaEJvdW5kaW5nQm94IHx8ICF0b3VjaEFjdGl2YXRlZCAmJiB0aGlzLnNldHRpbmdzLmhvdmVyQm91bmRpbmdCb3gpIHtcbiAgICAgICAgICB0aGlzLmJvdW5kaW5nQm94LnNob3codGhpcy5zZXR0aW5ncy56b29tUGFuZS5lbC5jbGllbnRXaWR0aCwgdGhpcy5zZXR0aW5ncy56b29tUGFuZS5lbC5jbGllbnRIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hhbmRsZU1vdmVtZW50KCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oaWRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oaWRlKGUpIHtcbiAgICAgIGlmIChlKSB7XG4gICAgICAgIHRoaXMuX3ByZXZlbnREZWZhdWx0QWxsb3dUb3VjaFNjcm9sbChlKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fbGFzdE1vdmVtZW50ID0gbnVsbDtcblxuICAgICAgaWYgKHRoaXMuZW50cnlUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmVudHJ5VGltZW91dCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJvdW5kaW5nQm94KSB7XG4gICAgICAgIHRoaXMuYm91bmRpbmdCb3guaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICB2YXIgb25IaWRlID0gdGhpcy5zZXR0aW5ncy5vbkhpZGU7XG5cbiAgICAgIGlmIChvbkhpZGUgJiYgdHlwZW9mIG9uSGlkZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG9uSGlkZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldHRpbmdzLnpvb21QYW5lLmhpZGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2hhbmRsZU1vdmVtZW50XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVNb3ZlbWVudChlKSB7XG4gICAgICBpZiAoZSkge1xuICAgICAgICB0aGlzLl9wcmV2ZW50RGVmYXVsdEFsbG93VG91Y2hTY3JvbGwoZSk7XG5cbiAgICAgICAgdGhpcy5fbGFzdE1vdmVtZW50ID0gZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fbGFzdE1vdmVtZW50KSB7XG4gICAgICAgIGUgPSB0aGlzLl9sYXN0TW92ZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBtb3ZlbWVudFg7XG4gICAgICB2YXIgbW92ZW1lbnRZO1xuXG4gICAgICBpZiAoZS50b3VjaGVzKSB7XG4gICAgICAgIHZhciBmaXJzdFRvdWNoID0gZS50b3VjaGVzWzBdO1xuICAgICAgICBtb3ZlbWVudFggPSBmaXJzdFRvdWNoLmNsaWVudFg7XG4gICAgICAgIG1vdmVtZW50WSA9IGZpcnN0VG91Y2guY2xpZW50WTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vdmVtZW50WCA9IGUuY2xpZW50WDtcbiAgICAgICAgbW92ZW1lbnRZID0gZS5jbGllbnRZO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWwgPSB0aGlzLnNldHRpbmdzLmVsO1xuICAgICAgdmFyIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBvZmZzZXRYID0gbW92ZW1lbnRYIC0gcmVjdC5sZWZ0O1xuICAgICAgdmFyIG9mZnNldFkgPSBtb3ZlbWVudFkgLSByZWN0LnRvcDtcbiAgICAgIHZhciBwZXJjZW50YWdlT2Zmc2V0WCA9IG9mZnNldFggLyB0aGlzLnNldHRpbmdzLmVsLmNsaWVudFdpZHRoO1xuICAgICAgdmFyIHBlcmNlbnRhZ2VPZmZzZXRZID0gb2Zmc2V0WSAvIHRoaXMuc2V0dGluZ3MuZWwuY2xpZW50SGVpZ2h0O1xuXG4gICAgICBpZiAodGhpcy5ib3VuZGluZ0JveCkge1xuICAgICAgICB0aGlzLmJvdW5kaW5nQm94LnNldFBvc2l0aW9uKHBlcmNlbnRhZ2VPZmZzZXRYLCBwZXJjZW50YWdlT2Zmc2V0WSwgcmVjdCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0dGluZ3Muem9vbVBhbmUuc2V0UG9zaXRpb24ocGVyY2VudGFnZU9mZnNldFgsIHBlcmNlbnRhZ2VPZmZzZXRZLCByZWN0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiaXNTaG93aW5nXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXR0aW5ncy56b29tUGFuZS5pc1Nob3dpbmc7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRyaWdnZXI7XG59KCk7XG5cbmV4cG9ydCB7IFRyaWdnZXIgYXMgZGVmYXVsdCB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHJpZ2dlci5qcy5tYXAiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9XG5cbmltcG9ydCB0aHJvd0lmTWlzc2luZyBmcm9tIFwiLi91dGlsL3Rocm93SWZNaXNzaW5nXCI7XG5pbXBvcnQgeyBhZGRDbGFzc2VzLCByZW1vdmVDbGFzc2VzIH0gZnJvbSBcIi4vdXRpbC9kb21cIjtcblxudmFyIFpvb21QYW5lID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gWm9vbVBhbmUoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFpvb21QYW5lKTtcblxuICAgIC8vIEFsbCBvZmZpY2lhbGx5LXN1cHBvcnRlZCBicm93c2VycyBoYXZlIHRoaXMsIGJ1dCBpdCdzIGVhc3kgdG9cbiAgICAvLyBhY2NvdW50IGZvciwganVzdCBpbiBjYXNlLlxuICAgIHRoaXMuSEFTX0FOSU1BVElPTiA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdmFyIGRpdlN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS5zdHlsZTtcbiAgICAgIHRoaXMuSEFTX0FOSU1BVElPTiA9IFwiYW5pbWF0aW9uXCIgaW4gZGl2U3R5bGUgfHwgXCJ3ZWJraXRBbmltYXRpb25cIiBpbiBkaXZTdHlsZTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb21wbGV0ZVNob3cgPSB0aGlzLl9jb21wbGV0ZVNob3cuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9jb21wbGV0ZUhpZGUgPSB0aGlzLl9jb21wbGV0ZUhpZGUuYmluZCh0aGlzKTtcbiAgICB0aGlzLl9oYW5kbGVMb2FkID0gdGhpcy5faGFuZGxlTG9hZC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaXNTaG93aW5nID0gZmFsc2U7XG4gICAgdmFyIF9vcHRpb25zJGNvbnRhaW5lciA9IG9wdGlvbnMuY29udGFpbmVyLFxuICAgICAgICBjb250YWluZXIgPSBfb3B0aW9ucyRjb250YWluZXIgPT09IHZvaWQgMCA/IG51bGwgOiBfb3B0aW9ucyRjb250YWluZXIsXG4gICAgICAgIF9vcHRpb25zJHpvb21GYWN0b3IgPSBvcHRpb25zLnpvb21GYWN0b3IsXG4gICAgICAgIHpvb21GYWN0b3IgPSBfb3B0aW9ucyR6b29tRmFjdG9yID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkem9vbUZhY3RvcixcbiAgICAgICAgX29wdGlvbnMkaW5saW5lID0gb3B0aW9ucy5pbmxpbmUsXG4gICAgICAgIGlubGluZSA9IF9vcHRpb25zJGlubGluZSA9PT0gdm9pZCAwID8gdGhyb3dJZk1pc3NpbmcoKSA6IF9vcHRpb25zJGlubGluZSxcbiAgICAgICAgX29wdGlvbnMkbmFtZXNwYWNlID0gb3B0aW9ucy5uYW1lc3BhY2UsXG4gICAgICAgIG5hbWVzcGFjZSA9IF9vcHRpb25zJG5hbWVzcGFjZSA9PT0gdm9pZCAwID8gbnVsbCA6IF9vcHRpb25zJG5hbWVzcGFjZSxcbiAgICAgICAgX29wdGlvbnMkc2hvd1doaXRlc3BhID0gb3B0aW9ucy5zaG93V2hpdGVzcGFjZUF0RWRnZXMsXG4gICAgICAgIHNob3dXaGl0ZXNwYWNlQXRFZGdlcyA9IF9vcHRpb25zJHNob3dXaGl0ZXNwYSA9PT0gdm9pZCAwID8gdGhyb3dJZk1pc3NpbmcoKSA6IF9vcHRpb25zJHNob3dXaGl0ZXNwYSxcbiAgICAgICAgX29wdGlvbnMkY29udGFpbklubGluID0gb3B0aW9ucy5jb250YWluSW5saW5lLFxuICAgICAgICBjb250YWluSW5saW5lID0gX29wdGlvbnMkY29udGFpbklubGluID09PSB2b2lkIDAgPyB0aHJvd0lmTWlzc2luZygpIDogX29wdGlvbnMkY29udGFpbklubGluLFxuICAgICAgICBfb3B0aW9ucyRpbmxpbmVPZmZzZXQgPSBvcHRpb25zLmlubGluZU9mZnNldFgsXG4gICAgICAgIGlubGluZU9mZnNldFggPSBfb3B0aW9ucyRpbmxpbmVPZmZzZXQgPT09IHZvaWQgMCA/IDAgOiBfb3B0aW9ucyRpbmxpbmVPZmZzZXQsXG4gICAgICAgIF9vcHRpb25zJGlubGluZU9mZnNldDIgPSBvcHRpb25zLmlubGluZU9mZnNldFksXG4gICAgICAgIGlubGluZU9mZnNldFkgPSBfb3B0aW9ucyRpbmxpbmVPZmZzZXQyID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkaW5saW5lT2Zmc2V0MixcbiAgICAgICAgX29wdGlvbnMkaW5saW5lQ29udGFpID0gb3B0aW9ucy5pbmxpbmVDb250YWluZXIsXG4gICAgICAgIGlubGluZUNvbnRhaW5lciA9IF9vcHRpb25zJGlubGluZUNvbnRhaSA9PT0gdm9pZCAwID8gZG9jdW1lbnQuYm9keSA6IF9vcHRpb25zJGlubGluZUNvbnRhaTtcbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgY29udGFpbmVyOiBjb250YWluZXIsXG4gICAgICB6b29tRmFjdG9yOiB6b29tRmFjdG9yLFxuICAgICAgaW5saW5lOiBpbmxpbmUsXG4gICAgICBuYW1lc3BhY2U6IG5hbWVzcGFjZSxcbiAgICAgIHNob3dXaGl0ZXNwYWNlQXRFZGdlczogc2hvd1doaXRlc3BhY2VBdEVkZ2VzLFxuICAgICAgY29udGFpbklubGluZTogY29udGFpbklubGluZSxcbiAgICAgIGlubGluZU9mZnNldFg6IGlubGluZU9mZnNldFgsXG4gICAgICBpbmxpbmVPZmZzZXRZOiBpbmxpbmVPZmZzZXRZLFxuICAgICAgaW5saW5lQ29udGFpbmVyOiBpbmxpbmVDb250YWluZXJcbiAgICB9O1xuICAgIHRoaXMub3BlbkNsYXNzZXMgPSB0aGlzLl9idWlsZENsYXNzZXMoXCJvcGVuXCIpO1xuICAgIHRoaXMub3BlbmluZ0NsYXNzZXMgPSB0aGlzLl9idWlsZENsYXNzZXMoXCJvcGVuaW5nXCIpO1xuICAgIHRoaXMuY2xvc2luZ0NsYXNzZXMgPSB0aGlzLl9idWlsZENsYXNzZXMoXCJjbG9zaW5nXCIpO1xuICAgIHRoaXMuaW5saW5lQ2xhc3NlcyA9IHRoaXMuX2J1aWxkQ2xhc3NlcyhcImlubGluZVwiKTtcbiAgICB0aGlzLmxvYWRpbmdDbGFzc2VzID0gdGhpcy5fYnVpbGRDbGFzc2VzKFwibG9hZGluZ1wiKTtcblxuICAgIHRoaXMuX2J1aWxkRWxlbWVudCgpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFpvb21QYW5lLCBbe1xuICAgIGtleTogXCJfYnVpbGRDbGFzc2VzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9idWlsZENsYXNzZXMoc3VmZml4KSB7XG4gICAgICB2YXIgY2xhc3NlcyA9IFtcImRyaWZ0LVwiLmNvbmNhdChzdWZmaXgpXTtcbiAgICAgIHZhciBucyA9IHRoaXMuc2V0dGluZ3MubmFtZXNwYWNlO1xuXG4gICAgICBpZiAobnMpIHtcbiAgICAgICAgY2xhc3Nlcy5wdXNoKFwiXCIuY29uY2F0KG5zLCBcIi1cIikuY29uY2F0KHN1ZmZpeCkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2xhc3NlcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX2J1aWxkRWxlbWVudFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYnVpbGRFbGVtZW50KCkge1xuICAgICAgdGhpcy5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBhZGRDbGFzc2VzKHRoaXMuZWwsIHRoaXMuX2J1aWxkQ2xhc3NlcyhcInpvb20tcGFuZVwiKSk7XG4gICAgICB2YXIgbG9hZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgYWRkQ2xhc3Nlcyhsb2FkZXJFbCwgdGhpcy5fYnVpbGRDbGFzc2VzKFwiem9vbS1wYW5lLWxvYWRlclwiKSk7XG4gICAgICB0aGlzLmVsLmFwcGVuZENoaWxkKGxvYWRlckVsKTtcbiAgICAgIHRoaXMuaW1nRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgdGhpcy5lbC5hcHBlbmRDaGlsZCh0aGlzLmltZ0VsKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3NldEltYWdlVVJMXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRJbWFnZVVSTChpbWFnZVVSTCkge1xuICAgICAgdGhpcy5pbWdFbC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaW1hZ2VVUkwpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfc2V0SW1hZ2VTaXplXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRJbWFnZVNpemUodHJpZ2dlcldpZHRoLCB0cmlnZ2VySGVpZ2h0KSB7XG4gICAgICB0aGlzLmltZ0VsLnN0eWxlLndpZHRoID0gXCJcIi5jb25jYXQodHJpZ2dlcldpZHRoICogdGhpcy5zZXR0aW5ncy56b29tRmFjdG9yLCBcInB4XCIpO1xuICAgICAgdGhpcy5pbWdFbC5zdHlsZS5oZWlnaHQgPSBcIlwiLmNvbmNhdCh0cmlnZ2VySGVpZ2h0ICogdGhpcy5zZXR0aW5ncy56b29tRmFjdG9yLCBcInB4XCIpO1xuICAgIH0gLy8gYHBlcmNlbnRhZ2VPZmZzZXRYYCBhbmQgYHBlcmNlbnRhZ2VPZmZzZXRZYCBtdXN0IGJlIHBlcmNlbnRhZ2VzXG4gICAgLy8gZXhwcmVzc2VkIGFzIGZsb2F0cyBiZXR3ZWVuIGAwJyBhbmQgYDFgLlxuXG4gIH0sIHtcbiAgICBrZXk6IFwic2V0UG9zaXRpb25cIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2V0UG9zaXRpb24ocGVyY2VudGFnZU9mZnNldFgsIHBlcmNlbnRhZ2VPZmZzZXRZLCB0cmlnZ2VyUmVjdCkge1xuICAgICAgdmFyIGltZ0VsV2lkdGggPSB0aGlzLmltZ0VsLm9mZnNldFdpZHRoO1xuICAgICAgdmFyIGltZ0VsSGVpZ2h0ID0gdGhpcy5pbWdFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICB2YXIgZWxXaWR0aCA9IHRoaXMuZWwub2Zmc2V0V2lkdGg7XG4gICAgICB2YXIgZWxIZWlnaHQgPSB0aGlzLmVsLm9mZnNldEhlaWdodDtcbiAgICAgIHZhciBjZW50cmVPZkNvbnRhaW5lclggPSBlbFdpZHRoIC8gMjtcbiAgICAgIHZhciBjZW50cmVPZkNvbnRhaW5lclkgPSBlbEhlaWdodCAvIDI7XG4gICAgICB2YXIgdGFyZ2V0SW1nWFRvQmVDZW50cmUgPSBpbWdFbFdpZHRoICogcGVyY2VudGFnZU9mZnNldFg7XG4gICAgICB2YXIgdGFyZ2V0SW1nWVRvQmVDZW50cmUgPSBpbWdFbEhlaWdodCAqIHBlcmNlbnRhZ2VPZmZzZXRZO1xuICAgICAgdmFyIGxlZnQgPSBjZW50cmVPZkNvbnRhaW5lclggLSB0YXJnZXRJbWdYVG9CZUNlbnRyZTtcbiAgICAgIHZhciB0b3AgPSBjZW50cmVPZkNvbnRhaW5lclkgLSB0YXJnZXRJbWdZVG9CZUNlbnRyZTtcbiAgICAgIHZhciBkaWZmZXJlbmNlQmV0d2VlbkNvbnRhaW5lcldpZHRoQW5kSW1nV2lkdGggPSBlbFdpZHRoIC0gaW1nRWxXaWR0aDtcbiAgICAgIHZhciBkaWZmZXJlbmNlQmV0d2VlbkNvbnRhaW5lckhlaWdodEFuZEltZ0hlaWdodCA9IGVsSGVpZ2h0IC0gaW1nRWxIZWlnaHQ7XG4gICAgICB2YXIgaXNDb250YWluZXJMYXJnZXJUaGFuSW1nWCA9IGRpZmZlcmVuY2VCZXR3ZWVuQ29udGFpbmVyV2lkdGhBbmRJbWdXaWR0aCA+IDA7XG4gICAgICB2YXIgaXNDb250YWluZXJMYXJnZXJUaGFuSW1nWSA9IGRpZmZlcmVuY2VCZXR3ZWVuQ29udGFpbmVySGVpZ2h0QW5kSW1nSGVpZ2h0ID4gMDtcbiAgICAgIHZhciBtaW5MZWZ0ID0gaXNDb250YWluZXJMYXJnZXJUaGFuSW1nWCA/IGRpZmZlcmVuY2VCZXR3ZWVuQ29udGFpbmVyV2lkdGhBbmRJbWdXaWR0aCAvIDIgOiAwO1xuICAgICAgdmFyIG1pblRvcCA9IGlzQ29udGFpbmVyTGFyZ2VyVGhhbkltZ1kgPyBkaWZmZXJlbmNlQmV0d2VlbkNvbnRhaW5lckhlaWdodEFuZEltZ0hlaWdodCAvIDIgOiAwO1xuICAgICAgdmFyIG1heExlZnQgPSBpc0NvbnRhaW5lckxhcmdlclRoYW5JbWdYID8gZGlmZmVyZW5jZUJldHdlZW5Db250YWluZXJXaWR0aEFuZEltZ1dpZHRoIC8gMiA6IGRpZmZlcmVuY2VCZXR3ZWVuQ29udGFpbmVyV2lkdGhBbmRJbWdXaWR0aDtcbiAgICAgIHZhciBtYXhUb3AgPSBpc0NvbnRhaW5lckxhcmdlclRoYW5JbWdZID8gZGlmZmVyZW5jZUJldHdlZW5Db250YWluZXJIZWlnaHRBbmRJbWdIZWlnaHQgLyAyIDogZGlmZmVyZW5jZUJldHdlZW5Db250YWluZXJIZWlnaHRBbmRJbWdIZWlnaHQ7XG5cbiAgICAgIGlmICh0aGlzLmVsLnBhcmVudEVsZW1lbnQgPT09IHRoaXMuc2V0dGluZ3MuaW5saW5lQ29udGFpbmVyKSB7XG4gICAgICAgIC8vIFRoaXMgbWF5IGJlIG5lZWRlZCBpbiB0aGUgZnV0dXJlIHRvIGRlYWwgd2l0aCBicm93c2VyIGV2ZW50XG4gICAgICAgIC8vIGluY29uc2lzdGVuY2llcywgYnV0IGl0J3MgZGlmZmljdWx0IHRvIHRlbGwgZm9yIHN1cmUuXG4gICAgICAgIC8vIGxldCBzY3JvbGxYID0gaXNUb3VjaCA/IDAgOiB3aW5kb3cuc2Nyb2xsWDtcbiAgICAgICAgLy8gbGV0IHNjcm9sbFkgPSBpc1RvdWNoID8gMCA6IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICB2YXIgc2Nyb2xsWCA9IHdpbmRvdy5wYWdlWE9mZnNldDtcbiAgICAgICAgdmFyIHNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgICAgIHZhciBpbmxpbmVMZWZ0ID0gdHJpZ2dlclJlY3QubGVmdCArIHBlcmNlbnRhZ2VPZmZzZXRYICogdHJpZ2dlclJlY3Qud2lkdGggLSBlbFdpZHRoIC8gMiArIHRoaXMuc2V0dGluZ3MuaW5saW5lT2Zmc2V0WCArIHNjcm9sbFg7XG4gICAgICAgIHZhciBpbmxpbmVUb3AgPSB0cmlnZ2VyUmVjdC50b3AgKyBwZXJjZW50YWdlT2Zmc2V0WSAqIHRyaWdnZXJSZWN0LmhlaWdodCAtIGVsSGVpZ2h0IC8gMiArIHRoaXMuc2V0dGluZ3MuaW5saW5lT2Zmc2V0WSArIHNjcm9sbFk7XG5cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY29udGFpbklubGluZSkge1xuICAgICAgICAgIGlmIChpbmxpbmVMZWZ0IDwgdHJpZ2dlclJlY3QubGVmdCArIHNjcm9sbFgpIHtcbiAgICAgICAgICAgIGlubGluZUxlZnQgPSB0cmlnZ2VyUmVjdC5sZWZ0ICsgc2Nyb2xsWDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGlubGluZUxlZnQgKyBlbFdpZHRoID4gdHJpZ2dlclJlY3QubGVmdCArIHRyaWdnZXJSZWN0LndpZHRoICsgc2Nyb2xsWCkge1xuICAgICAgICAgICAgaW5saW5lTGVmdCA9IHRyaWdnZXJSZWN0LmxlZnQgKyB0cmlnZ2VyUmVjdC53aWR0aCAtIGVsV2lkdGggKyBzY3JvbGxYO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbmxpbmVUb3AgPCB0cmlnZ2VyUmVjdC50b3AgKyBzY3JvbGxZKSB7XG4gICAgICAgICAgICBpbmxpbmVUb3AgPSB0cmlnZ2VyUmVjdC50b3AgKyBzY3JvbGxZO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaW5saW5lVG9wICsgZWxIZWlnaHQgPiB0cmlnZ2VyUmVjdC50b3AgKyB0cmlnZ2VyUmVjdC5oZWlnaHQgKyBzY3JvbGxZKSB7XG4gICAgICAgICAgICBpbmxpbmVUb3AgPSB0cmlnZ2VyUmVjdC50b3AgKyB0cmlnZ2VyUmVjdC5oZWlnaHQgLSBlbEhlaWdodCArIHNjcm9sbFk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbC5zdHlsZS5sZWZ0ID0gXCJcIi5jb25jYXQoaW5saW5lTGVmdCwgXCJweFwiKTtcbiAgICAgICAgdGhpcy5lbC5zdHlsZS50b3AgPSBcIlwiLmNvbmNhdChpbmxpbmVUb3AsIFwicHhcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5zZXR0aW5ncy5zaG93V2hpdGVzcGFjZUF0RWRnZXMpIHtcbiAgICAgICAgaWYgKGxlZnQgPiBtaW5MZWZ0KSB7XG4gICAgICAgICAgbGVmdCA9IG1pbkxlZnQ7XG4gICAgICAgIH0gZWxzZSBpZiAobGVmdCA8IG1heExlZnQpIHtcbiAgICAgICAgICBsZWZ0ID0gbWF4TGVmdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b3AgPiBtaW5Ub3ApIHtcbiAgICAgICAgICB0b3AgPSBtaW5Ub3A7XG4gICAgICAgIH0gZWxzZSBpZiAodG9wIDwgbWF4VG9wKSB7XG4gICAgICAgICAgdG9wID0gbWF4VG9wO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaW1nRWwuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIuY29uY2F0KGxlZnQsIFwicHgsIFwiKS5jb25jYXQodG9wLCBcInB4KVwiKTtcbiAgICAgIHRoaXMuaW1nRWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIuY29uY2F0KGxlZnQsIFwicHgsIFwiKS5jb25jYXQodG9wLCBcInB4KVwiKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3JlbW92ZUxpc3RlbmVyc0FuZFJlc2V0Q2xhc3Nlc1wiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfcmVtb3ZlTGlzdGVuZXJzQW5kUmVzZXRDbGFzc2VzKCkge1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIHRoaXMuX2NvbXBsZXRlU2hvdywgZmFsc2UpO1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIHRoaXMuX2NvbXBsZXRlSGlkZSwgZmFsc2UpO1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIHRoaXMuX2NvbXBsZXRlU2hvdywgZmFsc2UpO1xuICAgICAgdGhpcy5lbC5yZW1vdmVFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIHRoaXMuX2NvbXBsZXRlSGlkZSwgZmFsc2UpO1xuICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLm9wZW5DbGFzc2VzKTtcbiAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5lbCwgdGhpcy5jbG9zaW5nQ2xhc3Nlcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInNob3dcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gc2hvdyhpbWFnZVVSTCwgdHJpZ2dlcldpZHRoLCB0cmlnZ2VySGVpZ2h0KSB7XG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnNBbmRSZXNldENsYXNzZXMoKTtcblxuICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xuICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLm9wZW5DbGFzc2VzKTtcblxuICAgICAgaWYgKHRoaXMuaW1nRWwuZ2V0QXR0cmlidXRlKFwic3JjXCIpICE9IGltYWdlVVJMKSB7XG4gICAgICAgIGFkZENsYXNzZXModGhpcy5lbCwgdGhpcy5sb2FkaW5nQ2xhc3Nlcyk7XG4gICAgICAgIHRoaXMuaW1nRWwuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgdGhpcy5faGFuZGxlTG9hZCwgZmFsc2UpO1xuXG4gICAgICAgIHRoaXMuX3NldEltYWdlVVJMKGltYWdlVVJMKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2V0SW1hZ2VTaXplKHRyaWdnZXJXaWR0aCwgdHJpZ2dlckhlaWdodCk7XG5cbiAgICAgIGlmICh0aGlzLl9pc0lubGluZSkge1xuICAgICAgICB0aGlzLl9zaG93SW5saW5lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zaG93SW5Db250YWluZXIoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuSEFTX0FOSU1BVElPTikge1xuICAgICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgdGhpcy5fY29tcGxldGVTaG93LCBmYWxzZSk7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdEFuaW1hdGlvbkVuZFwiLCB0aGlzLl9jb21wbGV0ZVNob3csIGZhbHNlKTtcbiAgICAgICAgYWRkQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLm9wZW5pbmdDbGFzc2VzKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3Nob3dJbmxpbmVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3dJbmxpbmUoKSB7XG4gICAgICB0aGlzLnNldHRpbmdzLmlubGluZUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcbiAgICAgIGFkZENsYXNzZXModGhpcy5lbCwgdGhpcy5pbmxpbmVDbGFzc2VzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwiX3Nob3dJbkNvbnRhaW5lclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2hvd0luQ29udGFpbmVyKCkge1xuICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImhpZGVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGlkZSgpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVyc0FuZFJlc2V0Q2xhc3NlcygpO1xuXG4gICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xuXG4gICAgICBpZiAodGhpcy5IQVNfQU5JTUFUSU9OKSB7XG4gICAgICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCB0aGlzLl9jb21wbGV0ZUhpZGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0QW5pbWF0aW9uRW5kXCIsIHRoaXMuX2NvbXBsZXRlSGlkZSwgZmFsc2UpO1xuICAgICAgICBhZGRDbGFzc2VzKHRoaXMuZWwsIHRoaXMuY2xvc2luZ0NsYXNzZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLm9wZW5DbGFzc2VzKTtcbiAgICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLmlubGluZUNsYXNzZXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfY29tcGxldGVTaG93XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wbGV0ZVNob3coKSB7XG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgdGhpcy5fY29tcGxldGVTaG93LCBmYWxzZSk7XG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgdGhpcy5fY29tcGxldGVTaG93LCBmYWxzZSk7XG4gICAgICByZW1vdmVDbGFzc2VzKHRoaXMuZWwsIHRoaXMub3BlbmluZ0NsYXNzZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfY29tcGxldGVIaWRlXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jb21wbGV0ZUhpZGUoKSB7XG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgdGhpcy5fY29tcGxldGVIaWRlLCBmYWxzZSk7XG4gICAgICB0aGlzLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRBbmltYXRpb25FbmRcIiwgdGhpcy5fY29tcGxldGVIaWRlLCBmYWxzZSk7XG4gICAgICByZW1vdmVDbGFzc2VzKHRoaXMuZWwsIHRoaXMub3BlbkNsYXNzZXMpO1xuICAgICAgcmVtb3ZlQ2xhc3Nlcyh0aGlzLmVsLCB0aGlzLmNsb3NpbmdDbGFzc2VzKTtcbiAgICAgIHJlbW92ZUNsYXNzZXModGhpcy5lbCwgdGhpcy5pbmxpbmVDbGFzc2VzKTtcbiAgICAgIHRoaXMuZWwuc3R5bGUubGVmdCA9IFwiXCI7XG4gICAgICB0aGlzLmVsLnN0eWxlLnRvcCA9IFwiXCI7IC8vIFRoZSB3aW5kb3cgY291bGQgaGF2ZSBiZWVuIHJlc2l6ZWQgYWJvdmUgb3IgYmVsb3cgYGlubGluZWBcbiAgICAgIC8vIGxpbWl0cyBzaW5jZSB0aGUgWm9vbVBhbmUgd2FzIHNob3duLiBCZWNhdXNlIG9mIHRoaXMsIHdlXG4gICAgICAvLyBjYW4ndCByZWx5IG9uIGB0aGlzLl9pc0lubGluZWAgaGVyZS5cblxuICAgICAgaWYgKHRoaXMuZWwucGFyZW50RWxlbWVudCA9PT0gdGhpcy5zZXR0aW5ncy5jb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZWwucGFyZW50RWxlbWVudCA9PT0gdGhpcy5zZXR0aW5ncy5pbmxpbmVDb250YWluZXIpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5pbmxpbmVDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5lbCk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIl9oYW5kbGVMb2FkXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9oYW5kbGVMb2FkKCkge1xuICAgICAgdGhpcy5pbWdFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLCB0aGlzLl9oYW5kbGVMb2FkLCBmYWxzZSk7XG4gICAgICByZW1vdmVDbGFzc2VzKHRoaXMuZWwsIHRoaXMubG9hZGluZ0NsYXNzZXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJfaXNJbmxpbmVcIixcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBpbmxpbmUgPSB0aGlzLnNldHRpbmdzLmlubGluZTtcbiAgICAgIHJldHVybiBpbmxpbmUgPT09IHRydWUgfHwgdHlwZW9mIGlubGluZSA9PT0gXCJudW1iZXJcIiAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8PSBpbmxpbmU7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFpvb21QYW5lO1xufSgpO1xuXG5leHBvcnQgeyBab29tUGFuZSBhcyBkZWZhdWx0IH07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ab29tUGFuZS5qcy5tYXAiLCIvKiBVTk1JTklGSUVEIFJVTEVTXG5cbmNvbnN0IFJVTEVTID0gYFxuQGtleWZyYW1lcyBub29wIHtcbiAgMCUgeyB6b29tOiAxOyB9XG59XG5cbkAtd2Via2l0LWtleWZyYW1lcyBub29wIHtcbiAgMCUgeyB6b29tOiAxOyB9XG59XG5cbi5kcmlmdC16b29tLXBhbmUuZHJpZnQtb3BlbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4uZHJpZnQtem9vbS1wYW5lLmRyaWZ0LW9wZW5pbmcsIC5kcmlmdC16b29tLXBhbmUuZHJpZnQtY2xvc2luZyB7XG4gIGFuaW1hdGlvbjogbm9vcCAxbXM7XG4gIC13ZWJraXQtYW5pbWF0aW9uOiBub29wIDFtcztcbn1cblxuLmRyaWZ0LXpvb20tcGFuZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLmRyaWZ0LXpvb20tcGFuZS1sb2FkZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4uZHJpZnQtem9vbS1wYW5lIGltZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1heC13aWR0aDogbm9uZTtcbiAgbWF4LWhlaWdodDogbm9uZTtcbn1cblxuLmRyaWZ0LWJvdW5kaW5nLWJveCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5gO1xuXG4qL1xudmFyIFJVTEVTID0gXCIuZHJpZnQtYm91bmRpbmctYm94LC5kcmlmdC16b29tLXBhbmV7cG9zaXRpb246YWJzb2x1dGU7cG9pbnRlci1ldmVudHM6bm9uZX1Aa2V5ZnJhbWVzIG5vb3B7MCV7em9vbToxfX1ALXdlYmtpdC1rZXlmcmFtZXMgbm9vcHswJXt6b29tOjF9fS5kcmlmdC16b29tLXBhbmUuZHJpZnQtb3BlbntkaXNwbGF5OmJsb2NrfS5kcmlmdC16b29tLXBhbmUuZHJpZnQtY2xvc2luZywuZHJpZnQtem9vbS1wYW5lLmRyaWZ0LW9wZW5pbmd7YW5pbWF0aW9uOm5vb3AgMW1zOy13ZWJraXQtYW5pbWF0aW9uOm5vb3AgMW1zfS5kcmlmdC16b29tLXBhbmV7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowfS5kcmlmdC16b29tLXBhbmUtbG9hZGVye2Rpc3BsYXk6bm9uZX0uZHJpZnQtem9vbS1wYW5lIGltZ3twb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmJsb2NrO21heC13aWR0aDpub25lO21heC1oZWlnaHQ6bm9uZX1cIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluamVjdEJhc2VTdHlsZXNoZWV0KCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcmlmdC1iYXNlLXN0eWxlc1wiKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdHlsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBzdHlsZUVsLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gIHN0eWxlRWwuY2xhc3NMaXN0LmFkZChcImRyaWZ0LWJhc2Utc3R5bGVzXCIpO1xuICBzdHlsZUVsLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFJVTEVTKSk7XG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZDtcbiAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbCwgaGVhZC5maXJzdENoaWxkKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluamVjdEJhc2VTdHlsZXNoZWV0LmpzLm1hcCIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuLy8gVGhpcyBpcyBub3QgcmVhbGx5IGEgcGVyZmVjdCBjaGVjaywgYnV0IHdvcmtzIGZpbmUuXG4vLyBGcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzg0Mjg2XG52YXIgSEFTX0RPTV8yID0gKHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKEhUTUxFbGVtZW50KSkgPT09IFwib2JqZWN0XCI7XG5leHBvcnQgZnVuY3Rpb24gaXNET01FbGVtZW50KG9iaikge1xuICByZXR1cm4gSEFTX0RPTV8yID8gb2JqIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgOiBvYmogJiYgX3R5cGVvZihvYmopID09PSBcIm9iamVjdFwiICYmIG9iaiAhPT0gbnVsbCAmJiBvYmoubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIG9iai5ub2RlTmFtZSA9PT0gXCJzdHJpbmdcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzc2VzKGVsLCBjbGFzc05hbWVzKSB7XG4gIGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzc2VzKGVsLCBjbGFzc05hbWVzKSB7XG4gIGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbS5qcy5tYXAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aHJvd0lmTWlzc2luZygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXJcIik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10aHJvd0lmTWlzc2luZy5qcy5tYXAiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiRHJpZnQiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImltYWdlUHJldmlldyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ6b29tQ29udGFpbmVyIiwiY29udGFpbklubGluZSIsInNvdXJjZUF0dHJpYnV0ZSIsImhvdmVyQm91bmRpbmdCb3giLCJwYW5lQ29udGFpbmVyIiwiaW5saW5lUGFuZSIsImlubGluZU9mZnNldFkiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==