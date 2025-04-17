"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-sales-order-threshold-gui-main"],{

/***/ "./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/modules/main.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/modules/main.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../../scss/main.scss */ "./vendor/spryker/sales-order-threshold-gui/assets/Zed/scss/main.scss");
var thresholdStrategyToggle = function (thresholdGroup) {
  var strategyKey = $('input[name="global-threshold[' + thresholdGroup + 'Threshold][strategy]"]:checked').val();
  $('.threshold-key-' + strategyKey).removeClass('hidden');
  $('.threshold_group_' + thresholdGroup + ':not(.threshold-key-' + strategyKey + ')').addClass('hidden');
};
$(document).ready(function () {
  thresholdStrategyToggle('hard');
  thresholdStrategyToggle('soft');
  $('input[name="global-threshold[hardThreshold][strategy]"]').click(function () {
    thresholdStrategyToggle('hard');
  });
  $('input[name="global-threshold[softThreshold][strategy]"]').click(function () {
    thresholdStrategyToggle('soft');
  });
  $('input[name="global-threshold[hardMaximumThreshold][strategy]"]').click(function () {
    thresholdStrategyToggle('hardMaximumThreshold');
  });
  if ($('input[name="global-threshold[hardThreshold][strategy]"][value!=""]').length === 1) {
    $('input[name="global-threshold[hardThreshold][strategy]"]').parents('.form-group').addClass('hidden');
  }
  if ($('input[name="global-threshold[softThreshold][strategy]"][value!=""]').length === 1) {
    $('input[name="global-threshold[softThreshold][strategy]"]').parents('.form-group').addClass('hidden');
  }
  if ($('input[name="global-threshold[hardMaximumThreshold][strategy]"][value!=""]').length === 1) {
    $('input[name="global-threshold[hardMaximumThreshold][strategy]"]').parents('.form-group').addClass('hidden');
  }
  $('#global-threshold_storeCurrency').change(function () {
    window.location.href = '/sales-order-threshold-gui/global?store_currency=' + $(this).val();
  });
});

/***/ }),

/***/ "./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/spryker-zed-sales-order-threshold-gui-main.entry.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/spryker-zed-sales-order-threshold-gui-main.entry.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/sales-order-threshold-gui/assets/Zed/scss/main.scss":
/*!****************************************************************************!*\
  !*** ./vendor/spryker/sales-order-threshold-gui/assets/Zed/scss/main.scss ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/sales-order-threshold-gui/assets/Zed/js/spryker-zed-sales-order-threshold-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zYWxlcy1vcmRlci10aHJlc2hvbGQtZ3VpLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxtQkFBTyxDQUFDLGtHQUFzQixDQUFDO0FBRS9CLElBQUlDLHVCQUF1QixHQUFHLFNBQUFBLENBQVVDLGNBQWMsRUFBRTtFQUNwRCxJQUFJQyxXQUFXLEdBQUdDLENBQUMsQ0FBQywrQkFBK0IsR0FBR0YsY0FBYyxHQUFHLGdDQUFnQyxDQUFDLENBQUNHLEdBQUcsQ0FBQyxDQUFDO0VBRTlHRCxDQUFDLENBQUMsaUJBQWlCLEdBQUdELFdBQVcsQ0FBQyxDQUFDRyxXQUFXLENBQUMsUUFBUSxDQUFDO0VBQ3hERixDQUFDLENBQUMsbUJBQW1CLEdBQUdGLGNBQWMsR0FBRyxzQkFBc0IsR0FBR0MsV0FBVyxHQUFHLEdBQUcsQ0FBQyxDQUFDSSxRQUFRLENBQUMsUUFBUSxDQUFDO0FBQzNHLENBQUM7QUFFREgsQ0FBQyxDQUFDSSxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUJSLHVCQUF1QixDQUFDLE1BQU0sQ0FBQztFQUMvQkEsdUJBQXVCLENBQUMsTUFBTSxDQUFDO0VBRS9CRyxDQUFDLENBQUMseURBQXlELENBQUMsQ0FBQ00sS0FBSyxDQUFDLFlBQVk7SUFDM0VULHVCQUF1QixDQUFDLE1BQU0sQ0FBQztFQUNuQyxDQUFDLENBQUM7RUFFRkcsQ0FBQyxDQUFDLHlEQUF5RCxDQUFDLENBQUNNLEtBQUssQ0FBQyxZQUFZO0lBQzNFVCx1QkFBdUIsQ0FBQyxNQUFNLENBQUM7RUFDbkMsQ0FBQyxDQUFDO0VBRUZHLENBQUMsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDTSxLQUFLLENBQUMsWUFBWTtJQUNsRlQsdUJBQXVCLENBQUMsc0JBQXNCLENBQUM7RUFDbkQsQ0FBQyxDQUFDO0VBRUYsSUFBSUcsQ0FBQyxDQUFDLG9FQUFvRSxDQUFDLENBQUNPLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDdEZQLENBQUMsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDUSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUM7RUFDMUc7RUFFQSxJQUFJSCxDQUFDLENBQUMsb0VBQW9FLENBQUMsQ0FBQ08sTUFBTSxLQUFLLENBQUMsRUFBRTtJQUN0RlAsQ0FBQyxDQUFDLHlEQUF5RCxDQUFDLENBQUNRLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQ0wsUUFBUSxDQUFDLFFBQVEsQ0FBQztFQUMxRztFQUVBLElBQUlILENBQUMsQ0FBQywyRUFBMkUsQ0FBQyxDQUFDTyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQzdGUCxDQUFDLENBQUMsZ0VBQWdFLENBQUMsQ0FBQ1EsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDO0VBQ2pIO0VBRUFILENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDUyxNQUFNLENBQUMsWUFBWTtJQUNwREMsTUFBTSxDQUFDQyxRQUFRLENBQUNDLElBQUksR0FBRyxtREFBbUQsR0FBR1osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDQyxHQUFHLENBQUMsQ0FBQztFQUM5RixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUMvQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJMLG1CQUFPLENBQUMsZ0dBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FDUHpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtb3JkZXItdGhyZXNob2xkLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy1vcmRlci10aHJlc2hvbGQtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtc2FsZXMtb3JkZXItdGhyZXNob2xkLWd1aS1tYWluLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NhbGVzLW9yZGVyLXRocmVzaG9sZC1ndWkvYXNzZXRzL1plZC9zY3NzL21haW4uc2Nzcz9kMTE2Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYWluLnNjc3MnKTtcblxudmFyIHRocmVzaG9sZFN0cmF0ZWd5VG9nZ2xlID0gZnVuY3Rpb24gKHRocmVzaG9sZEdyb3VwKSB7XG4gICAgdmFyIHN0cmF0ZWd5S2V5ID0gJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbJyArIHRocmVzaG9sZEdyb3VwICsgJ1RocmVzaG9sZF1bc3RyYXRlZ3ldXCJdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICQoJy50aHJlc2hvbGQta2V5LScgKyBzdHJhdGVneUtleSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICQoJy50aHJlc2hvbGRfZ3JvdXBfJyArIHRocmVzaG9sZEdyb3VwICsgJzpub3QoLnRocmVzaG9sZC1rZXktJyArIHN0cmF0ZWd5S2V5ICsgJyknKS5hZGRDbGFzcygnaGlkZGVuJyk7XG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdGhyZXNob2xkU3RyYXRlZ3lUb2dnbGUoJ2hhcmQnKTtcbiAgICB0aHJlc2hvbGRTdHJhdGVneVRvZ2dsZSgnc29mdCcpO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbaGFyZFRocmVzaG9sZF1bc3RyYXRlZ3ldXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJlc2hvbGRTdHJhdGVneVRvZ2dsZSgnaGFyZCcpO1xuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbc29mdFRocmVzaG9sZF1bc3RyYXRlZ3ldXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICB0aHJlc2hvbGRTdHJhdGVneVRvZ2dsZSgnc29mdCcpO1xuICAgIH0pO1xuXG4gICAgJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbaGFyZE1heGltdW1UaHJlc2hvbGRdW3N0cmF0ZWd5XVwiXScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhyZXNob2xkU3RyYXRlZ3lUb2dnbGUoJ2hhcmRNYXhpbXVtVGhyZXNob2xkJyk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbaGFyZFRocmVzaG9sZF1bc3RyYXRlZ3ldXCJdW3ZhbHVlIT1cIlwiXScpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZ2xvYmFsLXRocmVzaG9sZFtoYXJkVGhyZXNob2xkXVtzdHJhdGVneV1cIl0nKS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbc29mdFRocmVzaG9sZF1bc3RyYXRlZ3ldXCJdW3ZhbHVlIT1cIlwiXScpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiZ2xvYmFsLXRocmVzaG9sZFtzb2Z0VGhyZXNob2xkXVtzdHJhdGVneV1cIl0nKS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbaGFyZE1heGltdW1UaHJlc2hvbGRdW3N0cmF0ZWd5XVwiXVt2YWx1ZSE9XCJcIl0nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cImdsb2JhbC10aHJlc2hvbGRbaGFyZE1heGltdW1UaHJlc2hvbGRdW3N0cmF0ZWd5XVwiXScpLnBhcmVudHMoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH1cblxuICAgICQoJyNnbG9iYWwtdGhyZXNob2xkX3N0b3JlQ3VycmVuY3knKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvc2FsZXMtb3JkZXItdGhyZXNob2xkLWd1aS9nbG9iYWw/c3RvcmVfY3VycmVuY3k9JyArICQodGhpcykudmFsKCk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwidGhyZXNob2xkU3RyYXRlZ3lUb2dnbGUiLCJ0aHJlc2hvbGRHcm91cCIsInN0cmF0ZWd5S2V5IiwiJCIsInZhbCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJkb2N1bWVudCIsInJlYWR5IiwiY2xpY2siLCJsZW5ndGgiLCJwYXJlbnRzIiwiY2hhbmdlIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==