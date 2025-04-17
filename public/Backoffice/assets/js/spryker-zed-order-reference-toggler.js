"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-order-reference-toggler"],{

/***/ "./vendor/spryker/order-custom-reference-gui/assets/Zed/js/modules/main.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/order-custom-reference-gui/assets/Zed/js/modules/main.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  var $wrapper = $('.js-customer-order-reference');
  var $target = $('.js-toggle-target');
  var triggerSelector = '.js-toggle-trigger';
  $wrapper.on('click', triggerSelector, function () {
    $target.each(function () {
      $(this).toggleClass('hide');
    });
  });
});

/***/ }),

/***/ "./vendor/spryker/order-custom-reference-gui/assets/Zed/js/spryker-zed-order-reference-toggler.entry.js":
/*!**************************************************************************************************************!*\
  !*** ./vendor/spryker/order-custom-reference-gui/assets/Zed/js/spryker-zed-order-reference-toggler.entry.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/order-custom-reference-gui/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/order-custom-reference-gui/assets/Zed/js/spryker-zed-order-reference-toggler.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1vcmRlci1yZWZlcmVuY2UtdG9nZ2xlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCLElBQUlDLFFBQVEsR0FBR0gsQ0FBQyxDQUFDLDhCQUE4QixDQUFDO0VBQ2hELElBQUlJLE9BQU8sR0FBR0osQ0FBQyxDQUFDLG1CQUFtQixDQUFDO0VBQ3BDLElBQUlLLGVBQWUsR0FBRyxvQkFBb0I7RUFFMUNGLFFBQVEsQ0FBQ0csRUFBRSxDQUFDLE9BQU8sRUFBRUQsZUFBZSxFQUFFLFlBQVc7SUFDN0NELE9BQU8sQ0FBQ0csSUFBSSxDQUFDLFlBQVc7TUFDcEJQLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ1EsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNqQkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsaUdBQWdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9vcmRlci1jdXN0b20tcmVmZXJlbmNlLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9vcmRlci1jdXN0b20tcmVmZXJlbmNlLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLW9yZGVyLXJlZmVyZW5jZS10b2dnbGVyLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkd3JhcHBlciA9ICQoJy5qcy1jdXN0b21lci1vcmRlci1yZWZlcmVuY2UnKTtcbiAgICB2YXIgJHRhcmdldCA9ICQoJy5qcy10b2dnbGUtdGFyZ2V0Jyk7XG4gICAgdmFyIHRyaWdnZXJTZWxlY3RvciA9ICcuanMtdG9nZ2xlLXRyaWdnZXInO1xuXG4gICAgJHdyYXBwZXIub24oJ2NsaWNrJywgdHJpZ2dlclNlbGVjdG9yLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJHRhcmdldC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnaGlkZScpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiJHdyYXBwZXIiLCIkdGFyZ2V0IiwidHJpZ2dlclNlbGVjdG9yIiwib24iLCJlYWNoIiwidG9nZ2xlQ2xhc3MiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==