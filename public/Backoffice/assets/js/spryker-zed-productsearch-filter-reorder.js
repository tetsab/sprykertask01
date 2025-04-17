"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-productsearch-filter-reorder"],{

/***/ "./vendor/spryker/product-search/assets/Zed/js/modules/filter-reorder.js":
/*!*******************************************************************************!*\
  !*** ./vendor/spryker/product-search/assets/Zed/js/modules/filter-reorder.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var filterList = {};
var showLoaderBar = function (btn) {
  $('.progress').removeClass('hidden');
  $(btn).addClass('hidden');
};
var closeLoaderBar = function (btn) {
  $('.progress').addClass('hidden');
  $(btn).removeClass('hidden');
};
$(document).ready(function () {
  /**
   * Save filter order on click
   */
  $('#save-filter-order').on('click', function () {
    var button = this;
    showLoaderBar(button);
    $.ajax('/product-search/filter-reorder/save', {
      method: 'POST',
      data: {
        filter_list: filterList
      },
      complete: function () {
        closeLoaderBar(button);
      },
      success: function (response) {
        swal({
          title: 'Success',
          text: response.message,
          type: 'success'
        });
      },
      error: function (response) {
        swal({
          title: 'Error',
          text: response.message,
          type: 'error'
        });
      }
    });
  });
  $('#filter-container').nestable({
    group: 1,
    maxDepth: 1
  }).on('change', function (e) {
    var list = e.length ? e : $(e.target);
    filterList = list.nestable('serialize');
  });
});

/***/ }),

/***/ "./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-reorder.entry.js":
/*!*******************************************************************************************************!*\
  !*** ./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-reorder.entry.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/filter-reorder */ "./vendor/spryker/product-search/assets/Zed/js/modules/filter-reorder.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-search/assets/Zed/js/spryker-zed-productsearch-filter-reorder.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0c2VhcmNoLWZpbHRlci1yZW9yZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBRW5CLElBQUlDLGFBQWEsR0FBRyxTQUFBQSxDQUFVQyxHQUFHLEVBQUU7RUFDL0JDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLFFBQVEsQ0FBQztFQUNwQ0QsQ0FBQyxDQUFDRCxHQUFHLENBQUMsQ0FBQ0csUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUM3QixDQUFDO0FBRUQsSUFBSUMsY0FBYyxHQUFHLFNBQUFBLENBQVVKLEdBQUcsRUFBRTtFQUNoQ0MsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDRSxRQUFRLENBQUMsUUFBUSxDQUFDO0VBQ2pDRixDQUFDLENBQUNELEdBQUcsQ0FBQyxDQUFDRSxXQUFXLENBQUMsUUFBUSxDQUFDO0FBQ2hDLENBQUM7QUFFREQsQ0FBQyxDQUFDSSxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUI7QUFDSjtBQUNBO0VBQ0lMLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDTSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDNUMsSUFBSUMsTUFBTSxHQUFHLElBQUk7SUFDakJULGFBQWEsQ0FBQ1MsTUFBTSxDQUFDO0lBRXJCUCxDQUFDLENBQUNRLElBQUksQ0FBQyxxQ0FBcUMsRUFBRTtNQUMxQ0MsTUFBTSxFQUFFLE1BQU07TUFDZEMsSUFBSSxFQUFFO1FBQ0ZDLFdBQVcsRUFBRWQ7TUFDakIsQ0FBQztNQUNEZSxRQUFRLEVBQUUsU0FBQUEsQ0FBQSxFQUFZO1FBQ2xCVCxjQUFjLENBQUNJLE1BQU0sQ0FBQztNQUMxQixDQUFDO01BQ0RNLE9BQU8sRUFBRSxTQUFBQSxDQUFVQyxRQUFRLEVBQUU7UUFDekJDLElBQUksQ0FBQztVQUNEQyxLQUFLLEVBQUUsU0FBUztVQUNoQkMsSUFBSSxFQUFFSCxRQUFRLENBQUNJLE9BQU87VUFDdEJDLElBQUksRUFBRTtRQUNWLENBQUMsQ0FBQztNQUNOLENBQUM7TUFDREMsS0FBSyxFQUFFLFNBQUFBLENBQVVOLFFBQVEsRUFBRTtRQUN2QkMsSUFBSSxDQUFDO1VBQ0RDLEtBQUssRUFBRSxPQUFPO1VBQ2RDLElBQUksRUFBRUgsUUFBUSxDQUFDSSxPQUFPO1VBQ3RCQyxJQUFJLEVBQUU7UUFDVixDQUFDLENBQUM7TUFDTjtJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztFQUVGbkIsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQ2pCcUIsUUFBUSxDQUFDO0lBQ05DLEtBQUssRUFBRSxDQUFDO0lBQ1JDLFFBQVEsRUFBRTtFQUNkLENBQUMsQ0FBQyxDQUNEakIsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVa0IsQ0FBQyxFQUFFO0lBQ3ZCLElBQUlDLElBQUksR0FBR0QsQ0FBQyxDQUFDRSxNQUFNLEdBQUdGLENBQUMsR0FBR3hCLENBQUMsQ0FBQ3dCLENBQUMsQ0FBQ0csTUFBTSxDQUFDO0lBQ3JDOUIsVUFBVSxHQUFHNEIsSUFBSSxDQUFDSixRQUFRLENBQUMsV0FBVyxDQUFDO0VBQzNDLENBQUMsQ0FBQztBQUNWLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQzdERjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYk8sbUJBQU8sQ0FBQyx5R0FBMEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3Qtc2VhcmNoL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9maWx0ZXItcmVvcmRlci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LXNlYXJjaC9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXByb2R1Y3RzZWFyY2gtZmlsdGVyLXJlb3JkZXIuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVyTGlzdCA9IHt9O1xuXG52YXIgc2hvd0xvYWRlckJhciA9IGZ1bmN0aW9uIChidG4pIHtcbiAgICAkKCcucHJvZ3Jlc3MnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgJChidG4pLmFkZENsYXNzKCdoaWRkZW4nKTtcbn07XG5cbnZhciBjbG9zZUxvYWRlckJhciA9IGZ1bmN0aW9uIChidG4pIHtcbiAgICAkKCcucHJvZ3Jlc3MnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgJChidG4pLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBTYXZlIGZpbHRlciBvcmRlciBvbiBjbGlja1xuICAgICAqL1xuICAgICQoJyNzYXZlLWZpbHRlci1vcmRlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IHRoaXM7XG4gICAgICAgIHNob3dMb2FkZXJCYXIoYnV0dG9uKTtcblxuICAgICAgICAkLmFqYXgoJy9wcm9kdWN0LXNlYXJjaC9maWx0ZXItcmVvcmRlci9zYXZlJywge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZmlsdGVyX2xpc3Q6IGZpbHRlckxpc3QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjbG9zZUxvYWRlckJhcihidXR0b24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5tZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UubWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgJCgnI2ZpbHRlci1jb250YWluZXInKVxuICAgICAgICAubmVzdGFibGUoe1xuICAgICAgICAgICAgZ3JvdXA6IDEsXG4gICAgICAgICAgICBtYXhEZXB0aDogMSxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBlLmxlbmd0aCA/IGUgOiAkKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIGZpbHRlckxpc3QgPSBsaXN0Lm5lc3RhYmxlKCdzZXJpYWxpemUnKTtcbiAgICAgICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2ZpbHRlci1yZW9yZGVyJyk7XG4iXSwibmFtZXMiOlsiZmlsdGVyTGlzdCIsInNob3dMb2FkZXJCYXIiLCJidG4iLCIkIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNsb3NlTG9hZGVyQmFyIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm9uIiwiYnV0dG9uIiwiYWpheCIsIm1ldGhvZCIsImRhdGEiLCJmaWx0ZXJfbGlzdCIsImNvbXBsZXRlIiwic3VjY2VzcyIsInJlc3BvbnNlIiwic3dhbCIsInRpdGxlIiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwiZXJyb3IiLCJuZXN0YWJsZSIsImdyb3VwIiwibWF4RGVwdGgiLCJlIiwibGlzdCIsImxlbmd0aCIsInRhcmdldCIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9