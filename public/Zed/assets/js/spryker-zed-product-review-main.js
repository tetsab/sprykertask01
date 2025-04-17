"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-review-main"],{

/***/ "./vendor/spryker/product-review-gui/assets/Zed/js/modules/main.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/product-review-gui/assets/Zed/js/modules/main.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./product-review-table */ "./vendor/spryker/product-review-gui/assets/Zed/js/modules/product-review-table.js");

/***/ }),

/***/ "./vendor/spryker/product-review-gui/assets/Zed/js/modules/product-review-table.js":
/*!*****************************************************************************************!*\
  !*** ./vendor/spryker/product-review-gui/assets/Zed/js/modules/product-review-table.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  var productReviewTable = $('#product-review-table').DataTable();
  $('#product-review-table tbody').on('click', 'tr', function (e) {
    var arrow = $(e.target);
    if (!arrow.is('i.fa-chevron-down') && !arrow.is('i.fa-chevron-up')) {
      return;
    }
    var tr = $(this).closest('tr');
    var row = productReviewTable.row(tr);
    if (row.child.isShown()) {
      row.child.hide();
      tr.removeClass('shown');
    } else {
      row.child(row.data().details).show();
      tr.addClass('shown');
    }
    arrow.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
  });
});

/***/ }),

/***/ "./vendor/spryker/product-review-gui/assets/Zed/js/spryker-zed-product-review-main.entry.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/spryker/product-review-gui/assets/Zed/js/spryker-zed-product-review-main.entry.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/product-review-gui/assets/Zed/js/modules/main.js");
__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/product-review-gui/assets/Zed/sass/main.scss");

/***/ }),

/***/ "./vendor/spryker/product-review-gui/assets/Zed/sass/main.scss":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/product-review-gui/assets/Zed/sass/main.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-review-gui/assets/Zed/js/spryker-zed-product-review-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LXJldmlldy1tYWluLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxtQkFBTyxDQUFDLGlIQUF3QixDQUFDOzs7Ozs7Ozs7OztBQ1BqQztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUIsSUFBSUMsa0JBQWtCLEdBQUdILENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDSSxTQUFTLENBQUMsQ0FBQztFQUUvREosQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUNLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVVDLENBQUMsRUFBRTtJQUM1RCxJQUFJQyxLQUFLLEdBQUdQLENBQUMsQ0FBQ00sQ0FBQyxDQUFDRSxNQUFNLENBQUM7SUFDdkIsSUFBSSxDQUFDRCxLQUFLLENBQUNFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUNGLEtBQUssQ0FBQ0UsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7TUFDaEU7SUFDSjtJQUVBLElBQUlDLEVBQUUsR0FBR1YsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDVyxPQUFPLENBQUMsSUFBSSxDQUFDO0lBQzlCLElBQUlDLEdBQUcsR0FBR1Qsa0JBQWtCLENBQUNTLEdBQUcsQ0FBQ0YsRUFBRSxDQUFDO0lBRXBDLElBQUlFLEdBQUcsQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLENBQUMsQ0FBQyxFQUFFO01BQ3JCRixHQUFHLENBQUNDLEtBQUssQ0FBQ0UsSUFBSSxDQUFDLENBQUM7TUFDaEJMLEVBQUUsQ0FBQ00sV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDLE1BQU07TUFDSEosR0FBRyxDQUFDQyxLQUFLLENBQUNELEdBQUcsQ0FBQ0ssSUFBSSxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDO01BQ3BDVCxFQUFFLENBQUNVLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDeEI7SUFFQWIsS0FBSyxDQUFDYyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUNBLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztFQUNyRSxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUM3QkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJ0QixtQkFBTyxDQUFDLHlGQUFnQixDQUFDO0FBQ3pCQSxtQkFBTyxDQUFDLHdGQUFtQixDQUFDOzs7Ozs7Ozs7OztBQ1I1QiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtcmV2aWV3LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LXJldmlldy1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3Byb2R1Y3QtcmV2aWV3LXRhYmxlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtcmV2aWV3LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXByb2R1Y3QtcmV2aWV3LW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1yZXZpZXctZ3VpL2Fzc2V0cy9aZWQvc2Fzcy9tYWluLnNjc3M/YzNiZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vcHJvZHVjdC1yZXZpZXctdGFibGUnKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9kdWN0UmV2aWV3VGFibGUgPSAkKCcjcHJvZHVjdC1yZXZpZXctdGFibGUnKS5EYXRhVGFibGUoKTtcblxuICAgICQoJyNwcm9kdWN0LXJldmlldy10YWJsZSB0Ym9keScpLm9uKCdjbGljaycsICd0cicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBhcnJvdyA9ICQoZS50YXJnZXQpO1xuICAgICAgICBpZiAoIWFycm93LmlzKCdpLmZhLWNoZXZyb24tZG93bicpICYmICFhcnJvdy5pcygnaS5mYS1jaGV2cm9uLXVwJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0ciA9ICQodGhpcykuY2xvc2VzdCgndHInKTtcbiAgICAgICAgdmFyIHJvdyA9IHByb2R1Y3RSZXZpZXdUYWJsZS5yb3codHIpO1xuXG4gICAgICAgIGlmIChyb3cuY2hpbGQuaXNTaG93bigpKSB7XG4gICAgICAgICAgICByb3cuY2hpbGQuaGlkZSgpO1xuICAgICAgICAgICAgdHIucmVtb3ZlQ2xhc3MoJ3Nob3duJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3cuY2hpbGQocm93LmRhdGEoKS5kZXRhaWxzKS5zaG93KCk7XG4gICAgICAgICAgICB0ci5hZGRDbGFzcygnc2hvd24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFycm93LnRvZ2dsZUNsYXNzKCdmYS1jaGV2cm9uLXVwJykudG9nZ2xlQ2xhc3MoJ2ZhLWNoZXZyb24tZG93bicpO1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG5yZXF1aXJlKCcuLi9zYXNzL21haW4uc2NzcycpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb2R1Y3RSZXZpZXdUYWJsZSIsIkRhdGFUYWJsZSIsIm9uIiwiZSIsImFycm93IiwidGFyZ2V0IiwiaXMiLCJ0ciIsImNsb3Nlc3QiLCJyb3ciLCJjaGlsZCIsImlzU2hvd24iLCJoaWRlIiwicmVtb3ZlQ2xhc3MiLCJkYXRhIiwiZGV0YWlscyIsInNob3ciLCJhZGRDbGFzcyIsInRvZ2dsZUNsYXNzIl0sInNvdXJjZVJvb3QiOiIifQ==