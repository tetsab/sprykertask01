(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-list-used-by-tab"],{

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/used-by-tab.js":
/*!******************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/modules/used-by-tab.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var clickedButtonUrl = null;
$(document).ready(function () {
  $('#used-by-table').on('click', 'td.actions a.btn', function (e) {
    e.preventDefault();
    clickedButtonUrl = $(this).attr('href');
    $('#confirmation-modal-window').modal('show');
  });
  $('.js-btn-confirm').on('click', function () {
    window.location.href = clickedButtonUrl;
  });
});

/***/ }),

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-used-by-tab.entry.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-used-by-tab.entry.js ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/used-by-tab */ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/used-by-tab.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-used-by-tab.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWxpc3QtdXNlZC1ieS10YWIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBSUEsZ0JBQWdCLEdBQUcsSUFBSTtBQUUzQkMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUJGLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFVBQVVDLENBQUMsRUFBRTtJQUM3REEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUVsQk4sZ0JBQWdCLEdBQUdDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ00sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2Q04sQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNPLEtBQUssQ0FBQyxNQUFNLENBQUM7RUFDakQsQ0FBQyxDQUFDO0VBRUZQLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDRyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDekNLLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEdBQUdYLGdCQUFnQjtFQUMzQyxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7O0FDYkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJZLG1CQUFPLENBQUMscUdBQXVCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxpc3QtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy91c2VkLWJ5LXRhYi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxpc3QtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJvZHVjdC1saXN0LXVzZWQtYnktdGFiLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjbGlja2VkQnV0dG9uVXJsID0gbnVsbDtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJyN1c2VkLWJ5LXRhYmxlJykub24oJ2NsaWNrJywgJ3RkLmFjdGlvbnMgYS5idG4nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY2xpY2tlZEJ1dHRvblVybCA9ICQodGhpcykuYXR0cignaHJlZicpO1xuICAgICAgICAkKCcjY29uZmlybWF0aW9uLW1vZGFsLXdpbmRvdycpLm1vZGFsKCdzaG93Jyk7XG4gICAgfSk7XG5cbiAgICAkKCcuanMtYnRuLWNvbmZpcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY2xpY2tlZEJ1dHRvblVybDtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvdXNlZC1ieS10YWInKTtcbiJdLCJuYW1lcyI6WyJjbGlja2VkQnV0dG9uVXJsIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJvbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImF0dHIiLCJtb2RhbCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9