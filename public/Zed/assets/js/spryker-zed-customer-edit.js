"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-customer-edit"],{

/***/ "./vendor/spryker/customer/assets/Zed/js/modules/edit.js":
/*!***************************************************************!*\
  !*** ./vendor/spryker/customer/assets/Zed/js/modules/edit.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  let customerStoreFormGroup = $('#customer_store_name_form_group');
  let customerSendPasswordTokenCheckbox = $('#customer_send_password_token');
  let customerStoreNameDropDown = $('#customer_store_name');

  // Handle elements status on page load. If backed validation fails and we get
  // redirected back with send customer password checkbox selected,
  // the store dropdown and its validation error are still shown.
  if (customerSendPasswordTokenCheckbox.is(':checked')) {
    enableCustomerStoreSelection();
  } else {
    disableCustomerStoreSelection();
  }
  customerSendPasswordTokenCheckbox.change(function () {
    if (this.checked) {
      enableCustomerStoreSelection();
    } else {
      disableCustomerStoreSelection();
    }
  });
  function enableCustomerStoreSelection() {
    customerStoreNameDropDown.attr('disabled', false);
    customerStoreFormGroup.show();
  }
  function disableCustomerStoreSelection() {
    customerStoreNameDropDown.attr('disabled', true);
    customerStoreFormGroup.hide();
  }
});

/***/ }),

/***/ "./vendor/spryker/customer/assets/Zed/js/modules/main.js":
/*!***************************************************************!*\
  !*** ./vendor/spryker/customer/assets/Zed/js/modules/main.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('#customer_date_of_birth').datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    maxDate: 0,
    defaultData: 0
  });
});

/***/ }),

/***/ "./vendor/spryker/customer/assets/Zed/js/spryker-zed-customer-edit.entry.js":
/*!**********************************************************************************!*\
  !*** ./vendor/spryker/customer/assets/Zed/js/spryker-zed-customer-edit.entry.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/customer/assets/Zed/js/modules/main.js");
__webpack_require__(/*! ./modules/edit */ "./vendor/spryker/customer/assets/Zed/js/modules/edit.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/customer/assets/Zed/js/spryker-zed-customer-edit.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jdXN0b21lci1lZGl0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUIsSUFBSUMsc0JBQXNCLEdBQUdILENBQUMsQ0FBQyxpQ0FBaUMsQ0FBQztFQUNqRSxJQUFJSSxpQ0FBaUMsR0FBR0osQ0FBQyxDQUFDLCtCQUErQixDQUFDO0VBQzFFLElBQUlLLHlCQUF5QixHQUFHTCxDQUFDLENBQUMsc0JBQXNCLENBQUM7O0VBRXpEO0VBQ0E7RUFDQTtFQUNBLElBQUlJLGlDQUFpQyxDQUFDRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7SUFDbERDLDRCQUE0QixDQUFDLENBQUM7RUFDbEMsQ0FBQyxNQUFNO0lBQ0hDLDZCQUE2QixDQUFDLENBQUM7RUFDbkM7RUFFQUosaUNBQWlDLENBQUNLLE1BQU0sQ0FBQyxZQUFZO0lBQ2pELElBQUksSUFBSSxDQUFDQyxPQUFPLEVBQUU7TUFDZEgsNEJBQTRCLENBQUMsQ0FBQztJQUNsQyxDQUFDLE1BQU07TUFDSEMsNkJBQTZCLENBQUMsQ0FBQztJQUNuQztFQUNKLENBQUMsQ0FBQztFQUVGLFNBQVNELDRCQUE0QkEsQ0FBQSxFQUFHO0lBQ3BDRix5QkFBeUIsQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUM7SUFDakRSLHNCQUFzQixDQUFDUyxJQUFJLENBQUMsQ0FBQztFQUNqQztFQUVBLFNBQVNKLDZCQUE2QkEsQ0FBQSxFQUFHO0lBQ3JDSCx5QkFBeUIsQ0FBQ00sSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7SUFDaERSLHNCQUFzQixDQUFDVSxJQUFJLENBQUMsQ0FBQztFQUNqQztBQUNKLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUN0Q0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJiLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCRixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQ2MsVUFBVSxDQUFDO0lBQ3BDQyxVQUFVLEVBQUUsVUFBVTtJQUN0QkMsV0FBVyxFQUFFLElBQUk7SUFDakJDLGNBQWMsRUFBRSxDQUFDO0lBQ2pCQyxPQUFPLEVBQUUsQ0FBQztJQUNWQyxXQUFXLEVBQUU7RUFDakIsQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDZkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsK0VBQWdCLENBQUM7QUFDekJBLG1CQUFPLENBQUMsK0VBQWdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci9hc3NldHMvWmVkL2pzL21vZHVsZXMvZWRpdC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWN1c3RvbWVyLWVkaXQuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGN1c3RvbWVyU3RvcmVGb3JtR3JvdXAgPSAkKCcjY3VzdG9tZXJfc3RvcmVfbmFtZV9mb3JtX2dyb3VwJyk7XG4gICAgbGV0IGN1c3RvbWVyU2VuZFBhc3N3b3JkVG9rZW5DaGVja2JveCA9ICQoJyNjdXN0b21lcl9zZW5kX3Bhc3N3b3JkX3Rva2VuJyk7XG4gICAgbGV0IGN1c3RvbWVyU3RvcmVOYW1lRHJvcERvd24gPSAkKCcjY3VzdG9tZXJfc3RvcmVfbmFtZScpO1xuXG4gICAgLy8gSGFuZGxlIGVsZW1lbnRzIHN0YXR1cyBvbiBwYWdlIGxvYWQuIElmIGJhY2tlZCB2YWxpZGF0aW9uIGZhaWxzIGFuZCB3ZSBnZXRcbiAgICAvLyByZWRpcmVjdGVkIGJhY2sgd2l0aCBzZW5kIGN1c3RvbWVyIHBhc3N3b3JkIGNoZWNrYm94IHNlbGVjdGVkLFxuICAgIC8vIHRoZSBzdG9yZSBkcm9wZG93biBhbmQgaXRzIHZhbGlkYXRpb24gZXJyb3IgYXJlIHN0aWxsIHNob3duLlxuICAgIGlmIChjdXN0b21lclNlbmRQYXNzd29yZFRva2VuQ2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgZW5hYmxlQ3VzdG9tZXJTdG9yZVNlbGVjdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRpc2FibGVDdXN0b21lclN0b3JlU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgY3VzdG9tZXJTZW5kUGFzc3dvcmRUb2tlbkNoZWNrYm94LmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIGVuYWJsZUN1c3RvbWVyU3RvcmVTZWxlY3Rpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpc2FibGVDdXN0b21lclN0b3JlU2VsZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGVuYWJsZUN1c3RvbWVyU3RvcmVTZWxlY3Rpb24oKSB7XG4gICAgICAgIGN1c3RvbWVyU3RvcmVOYW1lRHJvcERvd24uYXR0cignZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgIGN1c3RvbWVyU3RvcmVGb3JtR3JvdXAuc2hvdygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRpc2FibGVDdXN0b21lclN0b3JlU2VsZWN0aW9uKCkge1xuICAgICAgICBjdXN0b21lclN0b3JlTmFtZURyb3BEb3duLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgIGN1c3RvbWVyU3RvcmVGb3JtR3JvdXAuaGlkZSgpO1xuICAgIH1cbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2N1c3RvbWVyX2RhdGVfb2ZfYmlydGgnKS5kYXRlcGlja2VyKHtcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXG4gICAgICAgIG51bWJlck9mTW9udGhzOiAzLFxuICAgICAgICBtYXhEYXRlOiAwLFxuICAgICAgICBkZWZhdWx0RGF0YTogMCxcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xucmVxdWlyZSgnLi9tb2R1bGVzL2VkaXQnKTtcbiJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImN1c3RvbWVyU3RvcmVGb3JtR3JvdXAiLCJjdXN0b21lclNlbmRQYXNzd29yZFRva2VuQ2hlY2tib3giLCJjdXN0b21lclN0b3JlTmFtZURyb3BEb3duIiwiaXMiLCJlbmFibGVDdXN0b21lclN0b3JlU2VsZWN0aW9uIiwiZGlzYWJsZUN1c3RvbWVyU3RvcmVTZWxlY3Rpb24iLCJjaGFuZ2UiLCJjaGVja2VkIiwiYXR0ciIsInNob3ciLCJoaWRlIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJjaGFuZ2VNb250aCIsIm51bWJlck9mTW9udGhzIiwibWF4RGF0ZSIsImRlZmF1bHREYXRhIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=