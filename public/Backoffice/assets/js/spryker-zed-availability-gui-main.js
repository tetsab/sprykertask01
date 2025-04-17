"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-availability-gui-main"],{

/***/ "./vendor/spryker/availability-gui/assets/Zed/js/modules/bundled-products-form.js":
/*!****************************************************************************************!*\
  !*** ./vendor/spryker/availability-gui/assets/Zed/js/modules/bundled-products-form.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  var bundledProductElement = $('#table-bundled-products');
  var bundledProductTable = bundledProductElement.DataTable({
    scrollX: 'auto',
    autoWidth: false,
    destroy: true
  });
  var availabilityTable = $('#availability-table').DataTable({
    destroy: true,
    scrollX: 'auto',
    autoWidth: false,
    fnInitComplete: function (oSettings, json) {
      $('#availability-table .btn-view').each(function (index, element) {
        $(element).on('click', function (event) {
          $('#bundled-products').show();
          event.preventDefault();
          var tableDataUrl = $(element).prop('href');
          bundledProductTable.ajax.url(tableDataUrl).load();
        });
      });
    }
  });
});

/***/ }),

/***/ "./vendor/spryker/availability-gui/assets/Zed/js/spryker-zed-availability-gui-main.entry.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/spryker/availability-gui/assets/Zed/js/spryker-zed-availability-gui-main.entry.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/bundled-products-form */ "./vendor/spryker/availability-gui/assets/Zed/js/modules/bundled-products-form.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/availability-gui/assets/Zed/js/spryker-zed-availability-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1hdmFpbGFiaWxpdHktZ3VpLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixJQUFJQyxxQkFBcUIsR0FBR0gsQ0FBQyxDQUFDLHlCQUF5QixDQUFDO0VBQ3hELElBQUlJLG1CQUFtQixHQUFHRCxxQkFBcUIsQ0FBQ0UsU0FBUyxDQUFDO0lBQ3REQyxPQUFPLEVBQUUsTUFBTTtJQUNmQyxTQUFTLEVBQUUsS0FBSztJQUNoQkMsT0FBTyxFQUFFO0VBQ2IsQ0FBQyxDQUFDO0VBRUYsSUFBSUMsaUJBQWlCLEdBQUdULENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDSyxTQUFTLENBQUM7SUFDdkRHLE9BQU8sRUFBRSxJQUFJO0lBQ2JGLE9BQU8sRUFBRSxNQUFNO0lBQ2ZDLFNBQVMsRUFBRSxLQUFLO0lBQ2hCRyxjQUFjLEVBQUUsU0FBQUEsQ0FBVUMsU0FBUyxFQUFFQyxJQUFJLEVBQUU7TUFDdkNaLENBQUMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDYSxJQUFJLENBQUMsVUFBVUMsS0FBSyxFQUFFQyxPQUFPLEVBQUU7UUFDOURmLENBQUMsQ0FBQ2UsT0FBTyxDQUFDLENBQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVUMsS0FBSyxFQUFFO1VBQ3BDakIsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUNrQixJQUFJLENBQUMsQ0FBQztVQUM3QkQsS0FBSyxDQUFDRSxjQUFjLENBQUMsQ0FBQztVQUV0QixJQUFJQyxZQUFZLEdBQUdwQixDQUFDLENBQUNlLE9BQU8sQ0FBQyxDQUFDTSxJQUFJLENBQUMsTUFBTSxDQUFDO1VBQzFDakIsbUJBQW1CLENBQUNrQixJQUFJLENBQUNDLEdBQUcsQ0FBQ0gsWUFBWSxDQUFDLENBQUNJLElBQUksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztNQUNOLENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDL0JGO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQyxtQkFBTyxDQUFDLHlIQUFpQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvYXZhaWxhYmlsaXR5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYnVuZGxlZC1wcm9kdWN0cy1mb3JtLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2F2YWlsYWJpbGl0eS1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1hdmFpbGFiaWxpdHktZ3VpLW1haW4uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJ1bmRsZWRQcm9kdWN0RWxlbWVudCA9ICQoJyN0YWJsZS1idW5kbGVkLXByb2R1Y3RzJyk7XG4gICAgdmFyIGJ1bmRsZWRQcm9kdWN0VGFibGUgPSBidW5kbGVkUHJvZHVjdEVsZW1lbnQuRGF0YVRhYmxlKHtcbiAgICAgICAgc2Nyb2xsWDogJ2F1dG8nLFxuICAgICAgICBhdXRvV2lkdGg6IGZhbHNlLFxuICAgICAgICBkZXN0cm95OiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdmFyIGF2YWlsYWJpbGl0eVRhYmxlID0gJCgnI2F2YWlsYWJpbGl0eS10YWJsZScpLkRhdGFUYWJsZSh7XG4gICAgICAgIGRlc3Ryb3k6IHRydWUsXG4gICAgICAgIHNjcm9sbFg6ICdhdXRvJyxcbiAgICAgICAgYXV0b1dpZHRoOiBmYWxzZSxcbiAgICAgICAgZm5Jbml0Q29tcGxldGU6IGZ1bmN0aW9uIChvU2V0dGluZ3MsIGpzb24pIHtcbiAgICAgICAgICAgICQoJyNhdmFpbGFiaWxpdHktdGFibGUgLmJ0bi12aWV3JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAkKCcjYnVuZGxlZC1wcm9kdWN0cycpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGVEYXRhVXJsID0gJChlbGVtZW50KS5wcm9wKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1bmRsZWRQcm9kdWN0VGFibGUuYWpheC51cmwodGFibGVEYXRhVXJsKS5sb2FkKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvYnVuZGxlZC1wcm9kdWN0cy1mb3JtJyk7XG4iXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJidW5kbGVkUHJvZHVjdEVsZW1lbnQiLCJidW5kbGVkUHJvZHVjdFRhYmxlIiwiRGF0YVRhYmxlIiwic2Nyb2xsWCIsImF1dG9XaWR0aCIsImRlc3Ryb3kiLCJhdmFpbGFiaWxpdHlUYWJsZSIsImZuSW5pdENvbXBsZXRlIiwib1NldHRpbmdzIiwianNvbiIsImVhY2giLCJpbmRleCIsImVsZW1lbnQiLCJvbiIsImV2ZW50Iiwic2hvdyIsInByZXZlbnREZWZhdWx0IiwidGFibGVEYXRhVXJsIiwicHJvcCIsImFqYXgiLCJ1cmwiLCJsb2FkIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=