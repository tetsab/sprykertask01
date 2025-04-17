"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-category-gui-delete"],{

/***/ "./vendor/spryker/category-gui/assets/Zed/js/modules/delete.js":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/modules/delete.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SELECTOR_DELETE_CONFIRM = '#delete_confirm';
var SELECTOR_SUBMIT_DELETE = '#submit_delete';
$(document).ready(function () {
  var confirmCheckboxElement = $(SELECTOR_DELETE_CONFIRM);
  confirmCheckboxElement.on('click', function () {
    var checkboxIsChecked = confirmCheckboxElement.prop('checked');
    var submitDeleteElement = $(SELECTOR_SUBMIT_DELETE);
    submitDeleteElement.prop('disabled', !checkboxIsChecked);
  });
});

/***/ }),

/***/ "./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-delete.entry.js":
/*!********************************************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-delete.entry.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/delete */ "./vendor/spryker/category-gui/assets/Zed/js/modules/delete.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-delete.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jYXRlZ29yeS1ndWktZGVsZXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSx1QkFBdUIsR0FBRyxpQkFBaUI7QUFDL0MsSUFBSUMsc0JBQXNCLEdBQUcsZ0JBQWdCO0FBRTdDQyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixJQUFJQyxzQkFBc0IsR0FBR0gsQ0FBQyxDQUFDRix1QkFBdUIsQ0FBQztFQUV2REssc0JBQXNCLENBQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWTtJQUMzQyxJQUFJQyxpQkFBaUIsR0FBR0Ysc0JBQXNCLENBQUNHLElBQUksQ0FBQyxTQUFTLENBQUM7SUFFOUQsSUFBSUMsbUJBQW1CLEdBQUdQLENBQUMsQ0FBQ0Qsc0JBQXNCLENBQUM7SUFDbkRRLG1CQUFtQixDQUFDRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUNELGlCQUFpQixDQUFDO0VBQzVELENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ25CRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkcsbUJBQU8sQ0FBQyx1RkFBa0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NhdGVnb3J5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvZGVsZXRlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NhdGVnb3J5LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNhdGVnb3J5LWd1aS1kZWxldGUuZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0VMRUNUT1JfREVMRVRFX0NPTkZJUk0gPSAnI2RlbGV0ZV9jb25maXJtJztcbnZhciBTRUxFQ1RPUl9TVUJNSVRfREVMRVRFID0gJyNzdWJtaXRfZGVsZXRlJztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb25maXJtQ2hlY2tib3hFbGVtZW50ID0gJChTRUxFQ1RPUl9ERUxFVEVfQ09ORklSTSk7XG5cbiAgICBjb25maXJtQ2hlY2tib3hFbGVtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNoZWNrYm94SXNDaGVja2VkID0gY29uZmlybUNoZWNrYm94RWxlbWVudC5wcm9wKCdjaGVja2VkJyk7XG5cbiAgICAgICAgdmFyIHN1Ym1pdERlbGV0ZUVsZW1lbnQgPSAkKFNFTEVDVE9SX1NVQk1JVF9ERUxFVEUpO1xuICAgICAgICBzdWJtaXREZWxldGVFbGVtZW50LnByb3AoJ2Rpc2FibGVkJywgIWNoZWNrYm94SXNDaGVja2VkKTtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZGVsZXRlJyk7XG4iXSwibmFtZXMiOlsiU0VMRUNUT1JfREVMRVRFX0NPTkZJUk0iLCJTRUxFQ1RPUl9TVUJNSVRfREVMRVRFIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJjb25maXJtQ2hlY2tib3hFbGVtZW50Iiwib24iLCJjaGVja2JveElzQ2hlY2tlZCIsInByb3AiLCJzdWJtaXREZWxldGVFbGVtZW50IiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=