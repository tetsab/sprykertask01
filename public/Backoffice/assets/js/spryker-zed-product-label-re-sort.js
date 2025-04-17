"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-label-re-sort"],{

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/main.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/main.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var reSortList = __webpack_require__(/*! ./re-sort-list */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/re-sort-list.js");
$(document).ready(function () {
  reSortList.initialize('#js-re-sort-list', '#js-list-save-button');
});

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/re-sort-list.js":
/*!****************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/re-sort-list.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var $list = null;
var $button = null;

/**
 * @param {string} listSelector
 * @param {string} buttonSelector
 *
 * @return {void}
 */
function initialize(listSelector, buttonSelector) {
  $list = $(listSelector);
  $button = $(buttonSelector);
  initializeDragAndDrop();
  initializeSaveButton();
}

/**
 * @return {void}
 */
function initializeDragAndDrop() {
  $list.nestable({
    maxDepth: 1
  });
}

/**
 * @return {void}
 */
function initializeSaveButton() {
  $button.on('click', function () {
    sendListData();
    disableSaveButton(true);
  });
  disableSaveButton();
  $list.on('change', function () {
    enableSaveButton();
  });
}

/**
 * @param {bool} showLoader
 *
 * @return {void}
 */
function disableSaveButton(showLoader) {
  $button.attr('disabled', '');
  if (showLoader === true) {
    showButtonLoader();
  } else {
    hideButtonLoader();
  }
}

/**
 * @return {void}
 */
function enableSaveButton() {
  $button.removeAttr('disabled');
  hideButtonLoader();
}

/**
 * @return {void}
 */
function showButtonLoader() {
  $button.children('.js-loader').removeClass('wave-loader--hidden');
}

/**
 * @return {void}
 */
function hideButtonLoader() {
  $button.children('.js-loader').addClass('wave-loader--hidden');
}

/**
 * @return {void}
 */
function sendListData() {
  var listData = readCurrentListOrder();
  var promise = $.post('/product-label-gui/re-sort/save', {
    'sort-order-data': listData
  });
  promise.done(function (response) {
    window.sweetAlert({
      title: response.success ? 'Success' : 'Error',
      text: response.message,
      type: response.success ? 'success' : 'error'
    });
  });
  promise.always(function () {
    disableSaveButton();
  });
}

/**
 * @return {object}
 */
function readCurrentListOrder() {
  var listData = $list.nestable('serialize');
  var productLabelPositions = {};
  $.each(listData, function (index, item) {
    productLabelPositions[item.idProductLabel] = {
      idProductLabel: item.idProductLabel,
      position: index + 1
    };
  });
  return productLabelPositions;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-re-sort.entry.js":
/*!***************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-re-sort.entry.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/re-sort/main */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/re-sort/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-re-sort.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWxhYmVsLXJlLXNvcnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlBLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQyx3R0FBZ0IsQ0FBQztBQUUxQ0MsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUJKLFVBQVUsQ0FBQ0ssVUFBVSxDQUFDLGtCQUFrQixFQUFFLHNCQUFzQixDQUFDO0FBQ3JFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUNYRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQyxLQUFLLEdBQUcsSUFBSTtBQUNoQixJQUFJQyxPQUFPLEdBQUcsSUFBSTs7QUFFbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0YsVUFBVUEsQ0FBQ0csWUFBWSxFQUFFQyxjQUFjLEVBQUU7RUFDOUNILEtBQUssR0FBR0osQ0FBQyxDQUFDTSxZQUFZLENBQUM7RUFDdkJELE9BQU8sR0FBR0wsQ0FBQyxDQUFDTyxjQUFjLENBQUM7RUFFM0JDLHFCQUFxQixDQUFDLENBQUM7RUFDdkJDLG9CQUFvQixDQUFDLENBQUM7QUFDMUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0QscUJBQXFCQSxDQUFBLEVBQUc7RUFDN0JKLEtBQUssQ0FBQ00sUUFBUSxDQUFDO0lBQ1hDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQztBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVNGLG9CQUFvQkEsQ0FBQSxFQUFHO0VBQzVCSixPQUFPLENBQUNPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtJQUM1QkMsWUFBWSxDQUFDLENBQUM7SUFDZEMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0VBQzNCLENBQUMsQ0FBQztFQUVGQSxpQkFBaUIsQ0FBQyxDQUFDO0VBRW5CVixLQUFLLENBQUNRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWTtJQUMzQkcsZ0JBQWdCLENBQUMsQ0FBQztFQUN0QixDQUFDLENBQUM7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU0QsaUJBQWlCQSxDQUFDRSxVQUFVLEVBQUU7RUFDbkNYLE9BQU8sQ0FBQ1ksSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7RUFFNUIsSUFBSUQsVUFBVSxLQUFLLElBQUksRUFBRTtJQUNyQkUsZ0JBQWdCLENBQUMsQ0FBQztFQUN0QixDQUFDLE1BQU07SUFDSEMsZ0JBQWdCLENBQUMsQ0FBQztFQUN0QjtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVNKLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQ3hCVixPQUFPLENBQUNlLFVBQVUsQ0FBQyxVQUFVLENBQUM7RUFDOUJELGdCQUFnQixDQUFDLENBQUM7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0QsZ0JBQWdCQSxDQUFBLEVBQUc7RUFDeEJiLE9BQU8sQ0FBQ2dCLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLHFCQUFxQixDQUFDO0FBQ3JFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVNILGdCQUFnQkEsQ0FBQSxFQUFHO0VBQ3hCZCxPQUFPLENBQUNnQixRQUFRLENBQUMsWUFBWSxDQUFDLENBQUNFLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQztBQUNsRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTVixZQUFZQSxDQUFBLEVBQUc7RUFDcEIsSUFBSVcsUUFBUSxHQUFHQyxvQkFBb0IsQ0FBQyxDQUFDO0VBRXJDLElBQUlDLE9BQU8sR0FBRzFCLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxpQ0FBaUMsRUFBRTtJQUNwRCxpQkFBaUIsRUFBRUg7RUFDdkIsQ0FBQyxDQUFDO0VBRUZFLE9BQU8sQ0FBQ0UsSUFBSSxDQUFDLFVBQVVDLFFBQVEsRUFBRTtJQUM3QkMsTUFBTSxDQUFDQyxVQUFVLENBQUM7TUFDZEMsS0FBSyxFQUFFSCxRQUFRLENBQUNJLE9BQU8sR0FBRyxTQUFTLEdBQUcsT0FBTztNQUM3Q0MsSUFBSSxFQUFFTCxRQUFRLENBQUNNLE9BQU87TUFDdEJDLElBQUksRUFBRVAsUUFBUSxDQUFDSSxPQUFPLEdBQUcsU0FBUyxHQUFHO0lBQ3pDLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGUCxPQUFPLENBQUNXLE1BQU0sQ0FBQyxZQUFZO0lBQ3ZCdkIsaUJBQWlCLENBQUMsQ0FBQztFQUN2QixDQUFDLENBQUM7QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTVyxvQkFBb0JBLENBQUEsRUFBRztFQUM1QixJQUFJRCxRQUFRLEdBQUdwQixLQUFLLENBQUNNLFFBQVEsQ0FBQyxXQUFXLENBQUM7RUFDMUMsSUFBSTRCLHFCQUFxQixHQUFHLENBQUMsQ0FBQztFQUU5QnRDLENBQUMsQ0FBQ3VDLElBQUksQ0FBQ2YsUUFBUSxFQUFFLFVBQVVnQixLQUFLLEVBQUVDLElBQUksRUFBRTtJQUNwQ0gscUJBQXFCLENBQUNHLElBQUksQ0FBQ0MsY0FBYyxDQUFDLEdBQUc7TUFDekNBLGNBQWMsRUFBRUQsSUFBSSxDQUFDQyxjQUFjO01BQ25DQyxRQUFRLEVBQUVILEtBQUssR0FBRztJQUN0QixDQUFDO0VBQ0wsQ0FBQyxDQUFDO0VBRUYsT0FBT0YscUJBQXFCO0FBQ2hDO0FBRUFNLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2IxQyxVQUFVLEVBQUVBO0FBQ2hCLENBQUM7Ozs7Ozs7Ozs7QUNoSUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJKLG1CQUFPLENBQUMsd0dBQXdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvcmUtc29ydC9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtbGFiZWwtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9yZS1zb3J0L3JlLXNvcnQtbGlzdC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXByb2R1Y3QtbGFiZWwtcmUtc29ydC5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZVNvcnRMaXN0ID0gcmVxdWlyZSgnLi9yZS1zb3J0LWxpc3QnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHJlU29ydExpc3QuaW5pdGlhbGl6ZSgnI2pzLXJlLXNvcnQtbGlzdCcsICcjanMtbGlzdC1zYXZlLWJ1dHRvbicpO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciAkbGlzdCA9IG51bGw7XG52YXIgJGJ1dHRvbiA9IG51bGw7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IGxpc3RTZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGJ1dHRvblNlbGVjdG9yXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZShsaXN0U2VsZWN0b3IsIGJ1dHRvblNlbGVjdG9yKSB7XG4gICAgJGxpc3QgPSAkKGxpc3RTZWxlY3Rvcik7XG4gICAgJGJ1dHRvbiA9ICQoYnV0dG9uU2VsZWN0b3IpO1xuXG4gICAgaW5pdGlhbGl6ZURyYWdBbmREcm9wKCk7XG4gICAgaW5pdGlhbGl6ZVNhdmVCdXR0b24oKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRHJhZ0FuZERyb3AoKSB7XG4gICAgJGxpc3QubmVzdGFibGUoe1xuICAgICAgICBtYXhEZXB0aDogMSxcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplU2F2ZUJ1dHRvbigpIHtcbiAgICAkYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VuZExpc3REYXRhKCk7XG4gICAgICAgIGRpc2FibGVTYXZlQnV0dG9uKHRydWUpO1xuICAgIH0pO1xuXG4gICAgZGlzYWJsZVNhdmVCdXR0b24oKTtcblxuICAgICRsaXN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVuYWJsZVNhdmVCdXR0b24oKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2Jvb2x9IHNob3dMb2FkZXJcbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBkaXNhYmxlU2F2ZUJ1dHRvbihzaG93TG9hZGVyKSB7XG4gICAgJGJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsICcnKTtcblxuICAgIGlmIChzaG93TG9hZGVyID09PSB0cnVlKSB7XG4gICAgICAgIHNob3dCdXR0b25Mb2FkZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBoaWRlQnV0dG9uTG9hZGVyKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGVuYWJsZVNhdmVCdXR0b24oKSB7XG4gICAgJGJ1dHRvbi5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgIGhpZGVCdXR0b25Mb2FkZXIoKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzaG93QnV0dG9uTG9hZGVyKCkge1xuICAgICRidXR0b24uY2hpbGRyZW4oJy5qcy1sb2FkZXInKS5yZW1vdmVDbGFzcygnd2F2ZS1sb2FkZXItLWhpZGRlbicpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGhpZGVCdXR0b25Mb2FkZXIoKSB7XG4gICAgJGJ1dHRvbi5jaGlsZHJlbignLmpzLWxvYWRlcicpLmFkZENsYXNzKCd3YXZlLWxvYWRlci0taGlkZGVuJyk7XG59XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gc2VuZExpc3REYXRhKCkge1xuICAgIHZhciBsaXN0RGF0YSA9IHJlYWRDdXJyZW50TGlzdE9yZGVyKCk7XG5cbiAgICB2YXIgcHJvbWlzZSA9ICQucG9zdCgnL3Byb2R1Y3QtbGFiZWwtZ3VpL3JlLXNvcnQvc2F2ZScsIHtcbiAgICAgICAgJ3NvcnQtb3JkZXItZGF0YSc6IGxpc3REYXRhLFxuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5kb25lKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICB3aW5kb3cuc3dlZXRBbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogcmVzcG9uc2Uuc3VjY2VzcyA/ICdTdWNjZXNzJyA6ICdFcnJvcicsXG4gICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5tZXNzYWdlLFxuICAgICAgICAgICAgdHlwZTogcmVzcG9uc2Uuc3VjY2VzcyA/ICdzdWNjZXNzJyA6ICdlcnJvcicsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcHJvbWlzZS5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICBkaXNhYmxlU2F2ZUJ1dHRvbigpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gcmVhZEN1cnJlbnRMaXN0T3JkZXIoKSB7XG4gICAgdmFyIGxpc3REYXRhID0gJGxpc3QubmVzdGFibGUoJ3NlcmlhbGl6ZScpO1xuICAgIHZhciBwcm9kdWN0TGFiZWxQb3NpdGlvbnMgPSB7fTtcblxuICAgICQuZWFjaChsaXN0RGF0YSwgZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHByb2R1Y3RMYWJlbFBvc2l0aW9uc1tpdGVtLmlkUHJvZHVjdExhYmVsXSA9IHtcbiAgICAgICAgICAgIGlkUHJvZHVjdExhYmVsOiBpdGVtLmlkUHJvZHVjdExhYmVsLFxuICAgICAgICAgICAgcG9zaXRpb246IGluZGV4ICsgMSxcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9kdWN0TGFiZWxQb3NpdGlvbnM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvcmUtc29ydC9tYWluJyk7XG4iXSwibmFtZXMiOlsicmVTb3J0TGlzdCIsInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImluaXRpYWxpemUiLCIkbGlzdCIsIiRidXR0b24iLCJsaXN0U2VsZWN0b3IiLCJidXR0b25TZWxlY3RvciIsImluaXRpYWxpemVEcmFnQW5kRHJvcCIsImluaXRpYWxpemVTYXZlQnV0dG9uIiwibmVzdGFibGUiLCJtYXhEZXB0aCIsIm9uIiwic2VuZExpc3REYXRhIiwiZGlzYWJsZVNhdmVCdXR0b24iLCJlbmFibGVTYXZlQnV0dG9uIiwic2hvd0xvYWRlciIsImF0dHIiLCJzaG93QnV0dG9uTG9hZGVyIiwiaGlkZUJ1dHRvbkxvYWRlciIsInJlbW92ZUF0dHIiLCJjaGlsZHJlbiIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJsaXN0RGF0YSIsInJlYWRDdXJyZW50TGlzdE9yZGVyIiwicHJvbWlzZSIsInBvc3QiLCJkb25lIiwicmVzcG9uc2UiLCJ3aW5kb3ciLCJzd2VldEFsZXJ0IiwidGl0bGUiLCJzdWNjZXNzIiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwiYWx3YXlzIiwicHJvZHVjdExhYmVsUG9zaXRpb25zIiwiZWFjaCIsImluZGV4IiwiaXRlbSIsImlkUHJvZHVjdExhYmVsIiwicG9zaXRpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZVJvb3QiOiIifQ==