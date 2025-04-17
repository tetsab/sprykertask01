"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-productsearch-filter-preferences"],{

/***/ "./vendor/spryker/product-search/assets/Zed/js/modules/filter-preferences.js":
/*!***********************************************************************************!*\
  !*** ./vendor/spryker/product-search/assets/Zed/js/modules/filter-preferences.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  /**
   * Copy translations to other languages on click
   */
  $('.copy-to-other-languages').on('click', function () {
    var sourceTab = $(this).data('sourceTab');
    var sourceInputClass = $(this).data('sourceInputClass');
    $('#' + sourceTab).find('.' + sourceInputClass).each(function (i, input) {
      var valueToCopy = $(input).val();
      $('.tab-translation').not('#' + sourceTab).find('.' + sourceInputClass).eq(i).val(valueToCopy);
    });
  });
});

/***/ }),

/***/ "./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-preferences.entry.js":
/*!***********************************************************************************************************!*\
  !*** ./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-preferences.entry.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/filter-preferences */ "./vendor/spryker/product-search/assets/Zed/js/modules/filter-preferences.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-preferences.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0c2VhcmNoLWZpbHRlci1wcmVmZXJlbmNlcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCO0FBQ0o7QUFDQTtFQUNJRixDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQ0csRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZO0lBQ2xELElBQUlDLFNBQVMsR0FBR0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDSyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3pDLElBQUlDLGdCQUFnQixHQUFHTixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNLLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztJQUV2REwsQ0FBQyxDQUFDLEdBQUcsR0FBR0ksU0FBUyxDQUFDLENBQ2JHLElBQUksQ0FBQyxHQUFHLEdBQUdELGdCQUFnQixDQUFDLENBQzVCRSxJQUFJLENBQUMsVUFBVUMsQ0FBQyxFQUFFQyxLQUFLLEVBQUU7TUFDdEIsSUFBSUMsV0FBVyxHQUFHWCxDQUFDLENBQUNVLEtBQUssQ0FBQyxDQUFDRSxHQUFHLENBQUMsQ0FBQztNQUVoQ1osQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQ2hCYSxHQUFHLENBQUMsR0FBRyxHQUFHVCxTQUFTLENBQUMsQ0FDcEJHLElBQUksQ0FBQyxHQUFHLEdBQUdELGdCQUFnQixDQUFDLENBQzVCUSxFQUFFLENBQUNMLENBQUMsQ0FBQyxDQUNMRyxHQUFHLENBQUNELFdBQVcsQ0FBQztJQUN6QixDQUFDLENBQUM7RUFDVixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUMzQkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJJLG1CQUFPLENBQUMsaUhBQThCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LXNlYXJjaC9hc3NldHMvWmVkL2pzL21vZHVsZXMvZmlsdGVyLXByZWZlcmVuY2VzLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3Qtc2VhcmNoL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJvZHVjdHNlYXJjaC1maWx0ZXItcHJlZmVyZW5jZXMuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ29weSB0cmFuc2xhdGlvbnMgdG8gb3RoZXIgbGFuZ3VhZ2VzIG9uIGNsaWNrXG4gICAgICovXG4gICAgJCgnLmNvcHktdG8tb3RoZXItbGFuZ3VhZ2VzJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc291cmNlVGFiID0gJCh0aGlzKS5kYXRhKCdzb3VyY2VUYWInKTtcbiAgICAgICAgdmFyIHNvdXJjZUlucHV0Q2xhc3MgPSAkKHRoaXMpLmRhdGEoJ3NvdXJjZUlucHV0Q2xhc3MnKTtcblxuICAgICAgICAkKCcjJyArIHNvdXJjZVRhYilcbiAgICAgICAgICAgIC5maW5kKCcuJyArIHNvdXJjZUlucHV0Q2xhc3MpXG4gICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoaSwgaW5wdXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWVUb0NvcHkgPSAkKGlucHV0KS52YWwoKTtcblxuICAgICAgICAgICAgICAgICQoJy50YWItdHJhbnNsYXRpb24nKVxuICAgICAgICAgICAgICAgICAgICAubm90KCcjJyArIHNvdXJjZVRhYilcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy4nICsgc291cmNlSW5wdXRDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgLmVxKGkpXG4gICAgICAgICAgICAgICAgICAgIC52YWwodmFsdWVUb0NvcHkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2ZpbHRlci1wcmVmZXJlbmNlcycpO1xuIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJzb3VyY2VUYWIiLCJkYXRhIiwic291cmNlSW5wdXRDbGFzcyIsImZpbmQiLCJlYWNoIiwiaSIsImlucHV0IiwidmFsdWVUb0NvcHkiLCJ2YWwiLCJub3QiLCJlcSIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9