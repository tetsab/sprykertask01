"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-dynamic-entity-gui-main"],{

/***/ "./vendor/spryker/dynamic-entity-gui/assets/Zed/js/modules/main.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/dynamic-entity-gui/assets/Zed/js/modules/main.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('[name=dynamic-entity]').submit(function (event) {
    var isDeletableChecked = $('#dynamic-entity_is_deletable').is(':checked');
    var deletionAllowMessage = $('#dynamic-entity_is_deletable').attr('data-deletion-allow-message');
    if (isDeletableChecked && !confirm(deletionAllowMessage)) {
      event.preventDefault();
    }
  });
});

/***/ }),

/***/ "./vendor/spryker/dynamic-entity-gui/assets/Zed/js/spryker-zed-dynamic-entity-gui-main.entry.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/dynamic-entity-gui/assets/Zed/js/spryker-zed-dynamic-entity-gui-main.entry.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../scss/main.scss */ "./vendor/spryker/dynamic-entity-gui/assets/Zed/scss/main.scss");
__webpack_require__(/*! ./modules/main */ "./vendor/spryker/dynamic-entity-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/dynamic-entity-gui/assets/Zed/scss/main.scss":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/dynamic-entity-gui/assets/Zed/scss/main.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/dynamic-entity-gui/assets/Zed/js/spryker-zed-dynamic-entity-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1keW5hbWljLWVudGl0eS1ndWktbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJBLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCRixDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQ0csTUFBTSxDQUFDLFVBQVVDLEtBQUssRUFBRTtJQUMvQyxJQUFJQyxrQkFBa0IsR0FBR0wsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUNNLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDekUsSUFBSUMsb0JBQW9CLEdBQUdQLENBQUMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDUSxJQUFJLENBQUMsNkJBQTZCLENBQUM7SUFDaEcsSUFBSUgsa0JBQWtCLElBQUksQ0FBQ0ksT0FBTyxDQUFDRixvQkFBb0IsQ0FBQyxFQUFFO01BQ3RESCxLQUFLLENBQUNNLGNBQWMsQ0FBQyxDQUFDO0lBQzFCO0VBQ0osQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDZkY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsd0ZBQW1CLENBQUM7QUFDNUJBLG1CQUFPLENBQUMseUZBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FDUnpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZHluYW1pYy1lbnRpdHktZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2R5bmFtaWMtZW50aXR5LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWR5bmFtaWMtZW50aXR5LWd1aS1tYWluLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2R5bmFtaWMtZW50aXR5LWd1aS9hc3NldHMvWmVkL3Njc3MvbWFpbi5zY3NzP2RmZWIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnW25hbWU9ZHluYW1pYy1lbnRpdHldJykuc3VibWl0KGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgaXNEZWxldGFibGVDaGVja2VkID0gJCgnI2R5bmFtaWMtZW50aXR5X2lzX2RlbGV0YWJsZScpLmlzKCc6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgZGVsZXRpb25BbGxvd01lc3NhZ2UgPSAkKCcjZHluYW1pYy1lbnRpdHlfaXNfZGVsZXRhYmxlJykuYXR0cignZGF0YS1kZWxldGlvbi1hbGxvdy1tZXNzYWdlJyk7XG4gICAgICAgIGlmIChpc0RlbGV0YWJsZUNoZWNrZWQgJiYgIWNvbmZpcm0oZGVsZXRpb25BbGxvd01lc3NhZ2UpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vc2Nzcy9tYWluLnNjc3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzdWJtaXQiLCJldmVudCIsImlzRGVsZXRhYmxlQ2hlY2tlZCIsImlzIiwiZGVsZXRpb25BbGxvd01lc3NhZ2UiLCJhdHRyIiwiY29uZmlybSIsInByZXZlbnREZWZhdWx0IiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=