"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-alternative-assign"],{

/***/ "./vendor/spryker/product-alternative-gui/assets/Zed/js/modules/main.js":
/*!******************************************************************************!*\
  !*** ./vendor/spryker/product-alternative-gui/assets/Zed/js/modules/main.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  jQuery('#product_concrete_form_edit_alternative_products').select2({
    ajax: {
      url: '/product-alternative-gui/suggest',
      delay: 250,
      dataType: 'json',
      cache: true
    },
    minimumInputLength: 3
  });
});

/***/ }),

/***/ "./vendor/spryker/product-alternative-gui/assets/Zed/js/spryker-zed-product-alternative-assign.entry.js":
/*!**************************************************************************************************************!*\
  !*** ./vendor/spryker/product-alternative-gui/assets/Zed/js/spryker-zed-product-alternative-assign.entry.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/product-alternative-gui/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-alternative-gui/assets/Zed/js/spryker-zed-product-alternative-assign.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWFsdGVybmF0aXZlLWFzc2lnbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQkMsTUFBTSxDQUFDLGtEQUFrRCxDQUFDLENBQUNDLE9BQU8sQ0FBQztJQUMvREMsSUFBSSxFQUFFO01BQ0ZDLEdBQUcsRUFBRSxrQ0FBa0M7TUFDdkNDLEtBQUssRUFBRSxHQUFHO01BQ1ZDLFFBQVEsRUFBRSxNQUFNO01BQ2hCQyxLQUFLLEVBQUU7SUFDWCxDQUFDO0lBQ0RDLGtCQUFrQixFQUFFO0VBQ3hCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ2pCRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkMsbUJBQU8sQ0FBQyw4RkFBZ0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtYWx0ZXJuYXRpdmUtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtYWx0ZXJuYXRpdmUtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJvZHVjdC1hbHRlcm5hdGl2ZS1hc3NpZ24uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgalF1ZXJ5KCcjcHJvZHVjdF9jb25jcmV0ZV9mb3JtX2VkaXRfYWx0ZXJuYXRpdmVfcHJvZHVjdHMnKS5zZWxlY3QyKHtcbiAgICAgICAgYWpheDoge1xuICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QtYWx0ZXJuYXRpdmUtZ3VpL3N1Z2dlc3QnLFxuICAgICAgICAgICAgZGVsYXk6IDI1MCxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAzLFxuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJqUXVlcnkiLCJzZWxlY3QyIiwiYWpheCIsInVybCIsImRlbGF5IiwiZGF0YVR5cGUiLCJjYWNoZSIsIm1pbmltdW1JbnB1dExlbmd0aCIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9