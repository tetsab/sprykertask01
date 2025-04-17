"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-shipment-gui-main"],{

/***/ "./vendor/spryker/shipment-gui/assets/Zed/js/modules/main.js":
/*!*******************************************************************!*\
  !*** ./vendor/spryker/shipment-gui/assets/Zed/js/modules/main.js ***!
  \*******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



module.exports = function (trigger, target, inputDate) {
  $(inputDate).datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    minDate: 0,
    defaultData: 0
  }).keyup(function (event) {
    var backspaceButton = 8;
    var deleteButton = 46;
    if (event.keyCode === backspaceButton || event.keyCode === deleteButton) {
      $.datepicker._clearDate(this);
    }
  });
  function toggleForm() {
    var selectedOptionValue = $(trigger).val();
    if (!selectedOptionValue) {
      $(target).show();
      return;
    }
    $(target).hide();
  }
  function setDisableFields() {
    var selectedOptionValue = $(trigger).val();
    var $requiredFields = $(target).find('select[required], input[required]');
    $requiredFields.each(function () {
      $(this).attr('disabled', !!selectedOptionValue);
    });
  }
  function init() {
    toggleForm();
    setDisableFields();
  }
  init();
  $(trigger).on('change', init);
};

/***/ }),

/***/ "./vendor/spryker/shipment-gui/assets/Zed/js/spryker-zed-shipment-gui-main.entry.js":
/*!******************************************************************************************!*\
  !*** ./vendor/spryker/shipment-gui/assets/Zed/js/spryker-zed-shipment-gui-main.entry.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var init = __webpack_require__(/*! ./modules/main */ "./vendor/spryker/shipment-gui/assets/Zed/js/modules/main.js");
$(document).ready(function () {
  init('#shipment_group_form_shipment_shippingAddress_idCustomerAddress', '#shipment_group_form_shipment_shippingAddress', '#shipment_group_form_shipment_requestedDeliveryDate');
});

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/shipment-gui/assets/Zed/js/spryker-zed-shipment-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zaGlwbWVudC1ndWktbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJBLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHLFVBQVVDLE9BQU8sRUFBRUMsTUFBTSxFQUFFQyxTQUFTLEVBQUU7RUFDbkRDLENBQUMsQ0FBQ0QsU0FBUyxDQUFDLENBQ1BFLFVBQVUsQ0FBQztJQUNSQyxVQUFVLEVBQUUsVUFBVTtJQUN0QkMsV0FBVyxFQUFFLElBQUk7SUFDakJDLGNBQWMsRUFBRSxDQUFDO0lBQ2pCQyxPQUFPLEVBQUUsQ0FBQztJQUNWQyxXQUFXLEVBQUU7RUFDakIsQ0FBQyxDQUFDLENBQ0RDLEtBQUssQ0FBQyxVQUFVQyxLQUFLLEVBQUU7SUFDcEIsSUFBSUMsZUFBZSxHQUFHLENBQUM7SUFDdkIsSUFBSUMsWUFBWSxHQUFHLEVBQUU7SUFFckIsSUFBSUYsS0FBSyxDQUFDRyxPQUFPLEtBQUtGLGVBQWUsSUFBSUQsS0FBSyxDQUFDRyxPQUFPLEtBQUtELFlBQVksRUFBRTtNQUNyRVYsQ0FBQyxDQUFDQyxVQUFVLENBQUNXLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDakM7RUFDSixDQUFDLENBQUM7RUFFTixTQUFTQyxVQUFVQSxDQUFBLEVBQUc7SUFDbEIsSUFBSUMsbUJBQW1CLEdBQUdkLENBQUMsQ0FBQ0gsT0FBTyxDQUFDLENBQUNrQixHQUFHLENBQUMsQ0FBQztJQUUxQyxJQUFJLENBQUNELG1CQUFtQixFQUFFO01BQ3RCZCxDQUFDLENBQUNGLE1BQU0sQ0FBQyxDQUFDa0IsSUFBSSxDQUFDLENBQUM7TUFFaEI7SUFDSjtJQUVBaEIsQ0FBQyxDQUFDRixNQUFNLENBQUMsQ0FBQ21CLElBQUksQ0FBQyxDQUFDO0VBQ3BCO0VBRUEsU0FBU0MsZ0JBQWdCQSxDQUFBLEVBQUc7SUFDeEIsSUFBSUosbUJBQW1CLEdBQUdkLENBQUMsQ0FBQ0gsT0FBTyxDQUFDLENBQUNrQixHQUFHLENBQUMsQ0FBQztJQUMxQyxJQUFJSSxlQUFlLEdBQUduQixDQUFDLENBQUNGLE1BQU0sQ0FBQyxDQUFDc0IsSUFBSSxDQUFDLG1DQUFtQyxDQUFDO0lBRXpFRCxlQUFlLENBQUNFLElBQUksQ0FBQyxZQUFZO01BQzdCckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDc0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUNSLG1CQUFtQixDQUFDO0lBQ25ELENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU1MsSUFBSUEsQ0FBQSxFQUFHO0lBQ1pWLFVBQVUsQ0FBQyxDQUFDO0lBQ1pLLGdCQUFnQixDQUFDLENBQUM7RUFDdEI7RUFFQUssSUFBSSxDQUFDLENBQUM7RUFFTnZCLENBQUMsQ0FBQ0gsT0FBTyxDQUFDLENBQUMyQixFQUFFLENBQUMsUUFBUSxFQUFFRCxJQUFJLENBQUM7QUFDakMsQ0FBQzs7Ozs7Ozs7Ozs7QUN0REQ7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsSUFBSUEsSUFBSSxHQUFHRSxtQkFBTyxDQUFDLG1GQUFnQixDQUFDO0FBRXBDekIsQ0FBQyxDQUFDMEIsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCSixJQUFJLENBQ0EsaUVBQWlFLEVBQ2pFLCtDQUErQyxFQUMvQyxxREFDSixDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2hpcG1lbnQtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NoaXBtZW50LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXNoaXBtZW50LWd1aS1tYWluLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodHJpZ2dlciwgdGFyZ2V0LCBpbnB1dERhdGUpIHtcbiAgICAkKGlucHV0RGF0ZSlcbiAgICAgICAgLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxuICAgICAgICAgICAgbnVtYmVyT2ZNb250aHM6IDMsXG4gICAgICAgICAgICBtaW5EYXRlOiAwLFxuICAgICAgICAgICAgZGVmYXVsdERhdGE6IDAsXG4gICAgICAgIH0pXG4gICAgICAgIC5rZXl1cChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBiYWNrc3BhY2VCdXR0b24gPSA4O1xuICAgICAgICAgICAgdmFyIGRlbGV0ZUJ1dHRvbiA9IDQ2O1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gYmFja3NwYWNlQnV0dG9uIHx8IGV2ZW50LmtleUNvZGUgPT09IGRlbGV0ZUJ1dHRvbikge1xuICAgICAgICAgICAgICAgICQuZGF0ZXBpY2tlci5fY2xlYXJEYXRlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUZvcm0oKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZE9wdGlvblZhbHVlID0gJCh0cmlnZ2VyKS52YWwoKTtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcbiAgICAgICAgICAgICQodGFyZ2V0KS5zaG93KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICQodGFyZ2V0KS5oaWRlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RGlzYWJsZUZpZWxkcygpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSAkKHRyaWdnZXIpLnZhbCgpO1xuICAgICAgICB2YXIgJHJlcXVpcmVkRmllbGRzID0gJCh0YXJnZXQpLmZpbmQoJ3NlbGVjdFtyZXF1aXJlZF0sIGlucHV0W3JlcXVpcmVkXScpO1xuXG4gICAgICAgICRyZXF1aXJlZEZpZWxkcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuYXR0cignZGlzYWJsZWQnLCAhIXNlbGVjdGVkT3B0aW9uVmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB0b2dnbGVGb3JtKCk7XG4gICAgICAgIHNldERpc2FibGVGaWVsZHMoKTtcbiAgICB9XG5cbiAgICBpbml0KCk7XG5cbiAgICAkKHRyaWdnZXIpLm9uKCdjaGFuZ2UnLCBpbml0KTtcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpbml0ID0gcmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGluaXQoXG4gICAgICAgICcjc2hpcG1lbnRfZ3JvdXBfZm9ybV9zaGlwbWVudF9zaGlwcGluZ0FkZHJlc3NfaWRDdXN0b21lckFkZHJlc3MnLFxuICAgICAgICAnI3NoaXBtZW50X2dyb3VwX2Zvcm1fc2hpcG1lbnRfc2hpcHBpbmdBZGRyZXNzJyxcbiAgICAgICAgJyNzaGlwbWVudF9ncm91cF9mb3JtX3NoaXBtZW50X3JlcXVlc3RlZERlbGl2ZXJ5RGF0ZScsXG4gICAgKTtcbn0pO1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJ0cmlnZ2VyIiwidGFyZ2V0IiwiaW5wdXREYXRlIiwiJCIsImRhdGVwaWNrZXIiLCJkYXRlRm9ybWF0IiwiY2hhbmdlTW9udGgiLCJudW1iZXJPZk1vbnRocyIsIm1pbkRhdGUiLCJkZWZhdWx0RGF0YSIsImtleXVwIiwiZXZlbnQiLCJiYWNrc3BhY2VCdXR0b24iLCJkZWxldGVCdXR0b24iLCJrZXlDb2RlIiwiX2NsZWFyRGF0ZSIsInRvZ2dsZUZvcm0iLCJzZWxlY3RlZE9wdGlvblZhbHVlIiwidmFsIiwic2hvdyIsImhpZGUiLCJzZXREaXNhYmxlRmllbGRzIiwiJHJlcXVpcmVkRmllbGRzIiwiZmluZCIsImVhY2giLCJhdHRyIiwiaW5pdCIsIm9uIiwicmVxdWlyZSIsImRvY3VtZW50IiwicmVhZHkiXSwic291cmNlUm9vdCI6IiJ9