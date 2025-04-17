"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-label-dynamic-label"],{

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/dynamic-label/main.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/dynamic-label/main.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('.gui-table-data, .gui-table-data-no-search').on('draw.dt', function () {
    disableInputs();
  });
  disableInputs(this);
});
function disableInputs() {
  var $tabContent = $('#tab-content-product-assignment');
  $tabContent.find(':checkbox').attr('disabled', true);
  $tabContent.find('a.btn').attr('disabled', true);
  $tabContent.find('a.btn').css('pointer-events', 'none');
}

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-dynamic-label.entry.js":
/*!*********************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-dynamic-label.entry.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/dynamic-label/main */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/dynamic-label/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-dynamic-label.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWxhYmVsLWR5bmFtaWMtbGFiZWwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQkYsQ0FBQyxDQUFDLDRDQUE0QyxDQUFDLENBQUNHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWTtJQUN0RUMsYUFBYSxDQUFDLENBQUM7RUFDbkIsQ0FBQyxDQUFDO0VBRUZBLGFBQWEsQ0FBQyxJQUFJLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRUYsU0FBU0EsYUFBYUEsQ0FBQSxFQUFHO0VBQ3JCLElBQUlDLFdBQVcsR0FBR0wsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDO0VBRXRESyxXQUFXLENBQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7RUFDcERGLFdBQVcsQ0FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztFQUNoREYsV0FBVyxDQUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUNFLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUM7QUFDM0Q7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsb0hBQThCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvZHluYW1pYy1sYWJlbC9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtbGFiZWwtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJvZHVjdC1sYWJlbC1keW5hbWljLWxhYmVsLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJy5ndWktdGFibGUtZGF0YSwgLmd1aS10YWJsZS1kYXRhLW5vLXNlYXJjaCcpLm9uKCdkcmF3LmR0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkaXNhYmxlSW5wdXRzKCk7XG4gICAgfSk7XG5cbiAgICBkaXNhYmxlSW5wdXRzKHRoaXMpO1xufSk7XG5cbmZ1bmN0aW9uIGRpc2FibGVJbnB1dHMoKSB7XG4gICAgdmFyICR0YWJDb250ZW50ID0gJCgnI3RhYi1jb250ZW50LXByb2R1Y3QtYXNzaWdubWVudCcpO1xuXG4gICAgJHRhYkNvbnRlbnQuZmluZCgnOmNoZWNrYm94JykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAkdGFiQ29udGVudC5maW5kKCdhLmJ0bicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgJHRhYkNvbnRlbnQuZmluZCgnYS5idG4nKS5jc3MoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2R5bmFtaWMtbGFiZWwvbWFpbicpO1xuIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJkaXNhYmxlSW5wdXRzIiwiJHRhYkNvbnRlbnQiLCJmaW5kIiwiYXR0ciIsImNzcyIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9