"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-block-gui-main"],{

/***/ "./vendor/spryker/cms-block-gui/assets/Zed/js/modules/main.js":
/*!********************************************************************!*\
  !*** ./vendor/spryker/cms-block-gui/assets/Zed/js/modules/main.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  var validFrom = $('#cms_block_validFrom');
  var validTo = $('#cms_block_validTo');
  validFrom.datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    maxDate: validTo.val(),
    defaultData: 0,
    onClose: function (selectedDate) {
      validTo.datepicker('option', 'minDate', selectedDate);
    }
  });
  validTo.datepicker({
    defaultData: 0,
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    minDate: validFrom.val(),
    onClose: function (selectedDate) {
      validFrom.datepicker('option', 'maxDate', selectedDate);
    }
  });
  $('[name=cms_block_glossary]').on('submit', function () {
    var self = $(this);
    self.find('.html-editor').each(function (index, element) {
      var editor = $(element);
      if (editor.summernote('codeview.isActivated')) {
        editor.summernote('codeview.deactivate');
      }
      if (editor.summernote('isEmpty')) {
        editor.val(null);
      }
    });
  });
});

/***/ }),

/***/ "./vendor/spryker/cms-block-gui/assets/Zed/js/spryker-zed-cms-block-gui-main.entry.js":
/*!********************************************************************************************!*\
  !*** ./vendor/spryker/cms-block-gui/assets/Zed/js/spryker-zed-cms-block-gui-main.entry.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms-block-gui/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms-block-gui/assets/Zed/js/spryker-zed-cms-block-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jbXMtYmxvY2stZ3VpLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixJQUFJQyxTQUFTLEdBQUdILENBQUMsQ0FBQyxzQkFBc0IsQ0FBQztFQUN6QyxJQUFJSSxPQUFPLEdBQUdKLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztFQUVyQ0csU0FBUyxDQUFDRSxVQUFVLENBQUM7SUFDakJDLFVBQVUsRUFBRSxVQUFVO0lBQ3RCQyxXQUFXLEVBQUUsSUFBSTtJQUNqQkMsY0FBYyxFQUFFLENBQUM7SUFDakJDLE9BQU8sRUFBRUwsT0FBTyxDQUFDTSxHQUFHLENBQUMsQ0FBQztJQUN0QkMsV0FBVyxFQUFFLENBQUM7SUFDZEMsT0FBTyxFQUFFLFNBQUFBLENBQVVDLFlBQVksRUFBRTtNQUM3QlQsT0FBTyxDQUFDQyxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRVEsWUFBWSxDQUFDO0lBQ3pEO0VBQ0osQ0FBQyxDQUFDO0VBRUZULE9BQU8sQ0FBQ0MsVUFBVSxDQUFDO0lBQ2ZNLFdBQVcsRUFBRSxDQUFDO0lBQ2RMLFVBQVUsRUFBRSxVQUFVO0lBQ3RCQyxXQUFXLEVBQUUsSUFBSTtJQUNqQkMsY0FBYyxFQUFFLENBQUM7SUFDakJNLE9BQU8sRUFBRVgsU0FBUyxDQUFDTyxHQUFHLENBQUMsQ0FBQztJQUN4QkUsT0FBTyxFQUFFLFNBQUFBLENBQVVDLFlBQVksRUFBRTtNQUM3QlYsU0FBUyxDQUFDRSxVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRVEsWUFBWSxDQUFDO0lBQzNEO0VBQ0osQ0FBQyxDQUFDO0VBRUZiLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDZSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7SUFDcEQsSUFBSUMsSUFBSSxHQUFHaEIsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUVsQmdCLElBQUksQ0FBQ0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDQyxJQUFJLENBQUMsVUFBVUMsS0FBSyxFQUFFQyxPQUFPLEVBQUU7TUFDckQsSUFBSUMsTUFBTSxHQUFHckIsQ0FBQyxDQUFDb0IsT0FBTyxDQUFDO01BRXZCLElBQUlDLE1BQU0sQ0FBQ0MsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7UUFDM0NELE1BQU0sQ0FBQ0MsVUFBVSxDQUFDLHFCQUFxQixDQUFDO01BQzVDO01BRUEsSUFBSUQsTUFBTSxDQUFDQyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDOUJELE1BQU0sQ0FBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQztNQUNwQjtJQUNKLENBQUMsQ0FBQztFQUNOLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ2hERjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYmEsbUJBQU8sQ0FBQyxvRkFBZ0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1ibG9jay1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zLWJsb2NrLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNtcy1ibG9jay1ndWktbWFpbi5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsaWRGcm9tID0gJCgnI2Ntc19ibG9ja192YWxpZEZyb20nKTtcbiAgICB2YXIgdmFsaWRUbyA9ICQoJyNjbXNfYmxvY2tfdmFsaWRUbycpO1xuXG4gICAgdmFsaWRGcm9tLmRhdGVwaWNrZXIoe1xuICAgICAgICBkYXRlRm9ybWF0OiAneXktbW0tZGQnLFxuICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDMsXG4gICAgICAgIG1heERhdGU6IHZhbGlkVG8udmFsKCksXG4gICAgICAgIGRlZmF1bHREYXRhOiAwLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICB2YWxpZFRvLmRhdGVwaWNrZXIoJ29wdGlvbicsICdtaW5EYXRlJywgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgIHZhbGlkVG8uZGF0ZXBpY2tlcih7XG4gICAgICAgIGRlZmF1bHREYXRhOiAwLFxuICAgICAgICBkYXRlRm9ybWF0OiAneXktbW0tZGQnLFxuICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcbiAgICAgICAgbnVtYmVyT2ZNb250aHM6IDMsXG4gICAgICAgIG1pbkRhdGU6IHZhbGlkRnJvbS52YWwoKSxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24gKHNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgdmFsaWRGcm9tLmRhdGVwaWNrZXIoJ29wdGlvbicsICdtYXhEYXRlJywgc2VsZWN0ZWREYXRlKTtcbiAgICAgICAgfSxcbiAgICB9KTtcblxuICAgICQoJ1tuYW1lPWNtc19ibG9ja19nbG9zc2FyeV0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG5cbiAgICAgICAgc2VsZi5maW5kKCcuaHRtbC1lZGl0b3InKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGVkaXRvciA9ICQoZWxlbWVudCk7XG5cbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc3VtbWVybm90ZSgnY29kZXZpZXcuaXNBY3RpdmF0ZWQnKSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zdW1tZXJub3RlKCdjb2Rldmlldy5kZWFjdGl2YXRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc3VtbWVybm90ZSgnaXNFbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnZhbChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsInZhbGlkRnJvbSIsInZhbGlkVG8iLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwibnVtYmVyT2ZNb250aHMiLCJtYXhEYXRlIiwidmFsIiwiZGVmYXVsdERhdGEiLCJvbkNsb3NlIiwic2VsZWN0ZWREYXRlIiwibWluRGF0ZSIsIm9uIiwic2VsZiIsImZpbmQiLCJlYWNoIiwiaW5kZXgiLCJlbGVtZW50IiwiZWRpdG9yIiwic3VtbWVybm90ZSIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9