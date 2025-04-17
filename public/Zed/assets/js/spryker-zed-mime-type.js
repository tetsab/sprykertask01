"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-mime-type"],{

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/main.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/main.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./mime-type */ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/mime-type.js");

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/mime-type.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/mime-type.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var mimeType = {
  storage: [],
  $storageInput: $('#mime_type_settings_form_mimeTypes'),
  updateStorage: function (idMimeType, isAllowed) {
    let index = this.getStorageElementIndexByIdMimeType(idMimeType);
    index === -1 ? this.storage.push({
      idMimeType,
      isAllowed
    }) : this.storage[index].isAllowed = isAllowed;
    this.$storageInput.val(JSON.stringify(this.storage));
  },
  getStorageElementIndexByIdMimeType: function (idMimeType) {
    var filtered = this.storage.filter(function (object) {
      return object.idMimeType === idMimeType;
    });
    return filtered.length === 1 ? this.storage.indexOf(filtered[0]) : -1;
  },
  syncWithStorage: function ($tableBody) {
    if (!this.storage.length) {
      return;
    }
    this.storage.map(function (mimeType) {
      var $checkbox = $('#mime_type_is_allowed_' + mimeType.idMimeType);
      if ($checkbox) {
        $checkbox.prop('checked', mimeType.isAllowed);
      }
    });
  }
};
$(document).ready(function () {
  var $dataTableBody = $('.dataTable > tbody');
  $dataTableBody.on('DOMSubtreeModified', function () {
    mimeType.syncWithStorage($(this));
  });
  $dataTableBody.on('change', 'input.mime_type_is_allowed', function () {
    mimeType.updateStorage($(this).attr('data-id'), $(this).is(':checked'));
  });
});

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-mime-type.entry.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-mime-type.entry.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/mime-type/main */ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/mime-type/main.js");
__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss");

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss":
/*!*******************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-mime-type.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZmlsZS1tYW5hZ2VyLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWltZS10eXBlL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZmlsZS1tYW5hZ2VyLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWltZS10eXBlL21pbWUtdHlwZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9maWxlLW1hbmFnZXItZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtbWltZS10eXBlLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2ZpbGUtbWFuYWdlci1ndWkvYXNzZXRzL1plZC9zYXNzL21haW4uc2Nzcz9hZDEzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9taW1lLXR5cGUnKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG1pbWVUeXBlID0ge1xuICAgIHN0b3JhZ2U6IFtdLFxuICAgICRzdG9yYWdlSW5wdXQ6ICQoJyNtaW1lX3R5cGVfc2V0dGluZ3NfZm9ybV9taW1lVHlwZXMnKSxcblxuICAgIHVwZGF0ZVN0b3JhZ2U6IGZ1bmN0aW9uIChpZE1pbWVUeXBlLCBpc0FsbG93ZWQpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRTdG9yYWdlRWxlbWVudEluZGV4QnlJZE1pbWVUeXBlKGlkTWltZVR5cGUpO1xuXG4gICAgICAgIGluZGV4ID09PSAtMSA/IHRoaXMuc3RvcmFnZS5wdXNoKHsgaWRNaW1lVHlwZSwgaXNBbGxvd2VkIH0pIDogKHRoaXMuc3RvcmFnZVtpbmRleF0uaXNBbGxvd2VkID0gaXNBbGxvd2VkKTtcblxuICAgICAgICB0aGlzLiRzdG9yYWdlSW5wdXQudmFsKEpTT04uc3RyaW5naWZ5KHRoaXMuc3RvcmFnZSkpO1xuICAgIH0sXG5cbiAgICBnZXRTdG9yYWdlRWxlbWVudEluZGV4QnlJZE1pbWVUeXBlOiBmdW5jdGlvbiAoaWRNaW1lVHlwZSkge1xuICAgICAgICB2YXIgZmlsdGVyZWQgPSB0aGlzLnN0b3JhZ2UuZmlsdGVyKGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3QuaWRNaW1lVHlwZSA9PT0gaWRNaW1lVHlwZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkLmxlbmd0aCA9PT0gMSA/IHRoaXMuc3RvcmFnZS5pbmRleE9mKGZpbHRlcmVkWzBdKSA6IC0xO1xuICAgIH0sXG5cbiAgICBzeW5jV2l0aFN0b3JhZ2U6IGZ1bmN0aW9uICgkdGFibGVCb2R5KSB7XG4gICAgICAgIGlmICghdGhpcy5zdG9yYWdlLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdG9yYWdlLm1hcChmdW5jdGlvbiAobWltZVR5cGUpIHtcbiAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKCcjbWltZV90eXBlX2lzX2FsbG93ZWRfJyArIG1pbWVUeXBlLmlkTWltZVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAoJGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBtaW1lVHlwZS5pc0FsbG93ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9LFxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciAkZGF0YVRhYmxlQm9keSA9ICQoJy5kYXRhVGFibGUgPiB0Ym9keScpO1xuXG4gICAgJGRhdGFUYWJsZUJvZHkub24oJ0RPTVN1YnRyZWVNb2RpZmllZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWltZVR5cGUuc3luY1dpdGhTdG9yYWdlKCQodGhpcykpO1xuICAgIH0pO1xuXG4gICAgJGRhdGFUYWJsZUJvZHkub24oJ2NoYW5nZScsICdpbnB1dC5taW1lX3R5cGVfaXNfYWxsb3dlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbWltZVR5cGUudXBkYXRlU3RvcmFnZSgkKHRoaXMpLmF0dHIoJ2RhdGEtaWQnKSwgJCh0aGlzKS5pcygnOmNoZWNrZWQnKSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21pbWUtdHlwZS9tYWluJyk7XG5yZXF1aXJlKCcuLi9zYXNzL21haW4uc2NzcycpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJtaW1lVHlwZSIsInN0b3JhZ2UiLCIkc3RvcmFnZUlucHV0IiwiJCIsInVwZGF0ZVN0b3JhZ2UiLCJpZE1pbWVUeXBlIiwiaXNBbGxvd2VkIiwiaW5kZXgiLCJnZXRTdG9yYWdlRWxlbWVudEluZGV4QnlJZE1pbWVUeXBlIiwicHVzaCIsInZhbCIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXJlZCIsImZpbHRlciIsIm9iamVjdCIsImxlbmd0aCIsImluZGV4T2YiLCJzeW5jV2l0aFN0b3JhZ2UiLCIkdGFibGVCb2R5IiwibWFwIiwiJGNoZWNrYm94IiwicHJvcCIsImRvY3VtZW50IiwicmVhZHkiLCIkZGF0YVRhYmxlQm9keSIsIm9uIiwiYXR0ciIsImlzIl0sInNvdXJjZVJvb3QiOiIifQ==