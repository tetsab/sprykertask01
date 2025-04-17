"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-productattributegui-attribute"],{

/***/ "./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/attribute.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/attribute.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function toggleValueTranslations() {
  if ($('.translate_values_checkbox').is(':checked')) {
    $('.value_translation_container').show();
  } else {
    $('.value_translation_container').hide();
  }
}
$(document).ready(function () {
  $('.spryker-form-select2combobox').select2({
    tags: true
  });

  /**
   * Toggle predefined value translation
   */
  $('.translate_values_checkbox').on('change', function () {
    $('.translate_values_checkbox').prop('checked', $(this).prop('checked'));
    toggleValueTranslations();
  });
  toggleValueTranslations();
  var isSuperCheckBox = $('#attributeForm_is_super');
  isSuperCheckBox.off('click').on('click', function () {
    var checkboxIsChecked = isSuperCheckBox.prop('checked');
    var allowInputCheckbox = $('#attributeForm_allow_input');
    allowInputCheckbox.prop('checked', false);
    allowInputCheckbox.prop('disabled', checkboxIsChecked);
  });
});

/***/ }),

/***/ "./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-attribute.entry.js":
/*!***************************************************************************************************************!*\
  !*** ./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-attribute.entry.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/attribute */ "./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/attribute.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-attribute.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0YXR0cmlidXRlZ3VpLWF0dHJpYnV0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBU0EsdUJBQXVCQSxDQUFBLEVBQUc7RUFDL0IsSUFBSUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDLENBQUNDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtJQUNoREQsQ0FBQyxDQUFDLDhCQUE4QixDQUFDLENBQUNFLElBQUksQ0FBQyxDQUFDO0VBQzVDLENBQUMsTUFBTTtJQUNIRixDQUFDLENBQUMsOEJBQThCLENBQUMsQ0FBQ0csSUFBSSxDQUFDLENBQUM7RUFDNUM7QUFDSjtBQUVBSCxDQUFDLENBQUNJLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQkwsQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUNNLE9BQU8sQ0FBQztJQUN2Q0MsSUFBSSxFQUFFO0VBQ1YsQ0FBQyxDQUFDOztFQUVGO0FBQ0o7QUFDQTtFQUNJUCxDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ1EsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO0lBQ3JEUixDQUFDLENBQUMsNEJBQTRCLENBQUMsQ0FBQ1MsSUFBSSxDQUFDLFNBQVMsRUFBRVQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDUyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEVWLHVCQUF1QixDQUFDLENBQUM7RUFDN0IsQ0FBQyxDQUFDO0VBRUZBLHVCQUF1QixDQUFDLENBQUM7RUFFekIsSUFBSVcsZUFBZSxHQUFHVixDQUFDLENBQUMseUJBQXlCLENBQUM7RUFFbERVLGVBQWUsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDSCxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDakQsSUFBSUksaUJBQWlCLEdBQUdGLGVBQWUsQ0FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2RCxJQUFJSSxrQkFBa0IsR0FBR2IsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO0lBQ3hEYSxrQkFBa0IsQ0FBQ0osSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7SUFDekNJLGtCQUFrQixDQUFDSixJQUFJLENBQUMsVUFBVSxFQUFFRyxpQkFBaUIsQ0FBQztFQUMxRCxDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUN0Q0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJFLG1CQUFPLENBQUMsc0dBQXFCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWF0dHJpYnV0ZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2F0dHJpYnV0ZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWF0dHJpYnV0ZS1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0YXR0cmlidXRlZ3VpLWF0dHJpYnV0ZS5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHRvZ2dsZVZhbHVlVHJhbnNsYXRpb25zKCkge1xuICAgIGlmICgkKCcudHJhbnNsYXRlX3ZhbHVlc19jaGVja2JveCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy52YWx1ZV90cmFuc2xhdGlvbl9jb250YWluZXInKS5zaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnZhbHVlX3RyYW5zbGF0aW9uX2NvbnRhaW5lcicpLmhpZGUoKTtcbiAgICB9XG59XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuc3ByeWtlci1mb3JtLXNlbGVjdDJjb21ib2JveCcpLnNlbGVjdDIoe1xuICAgICAgICB0YWdzOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHByZWRlZmluZWQgdmFsdWUgdHJhbnNsYXRpb25cbiAgICAgKi9cbiAgICAkKCcudHJhbnNsYXRlX3ZhbHVlc19jaGVja2JveCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy50cmFuc2xhdGVfdmFsdWVzX2NoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsICQodGhpcykucHJvcCgnY2hlY2tlZCcpKTtcbiAgICAgICAgdG9nZ2xlVmFsdWVUcmFuc2xhdGlvbnMoKTtcbiAgICB9KTtcblxuICAgIHRvZ2dsZVZhbHVlVHJhbnNsYXRpb25zKCk7XG5cbiAgICB2YXIgaXNTdXBlckNoZWNrQm94ID0gJCgnI2F0dHJpYnV0ZUZvcm1faXNfc3VwZXInKTtcblxuICAgIGlzU3VwZXJDaGVja0JveC5vZmYoJ2NsaWNrJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hlY2tib3hJc0NoZWNrZWQgPSBpc1N1cGVyQ2hlY2tCb3gucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgICB2YXIgYWxsb3dJbnB1dENoZWNrYm94ID0gJCgnI2F0dHJpYnV0ZUZvcm1fYWxsb3dfaW5wdXQnKTtcbiAgICAgICAgYWxsb3dJbnB1dENoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgIGFsbG93SW5wdXRDaGVja2JveC5wcm9wKCdkaXNhYmxlZCcsIGNoZWNrYm94SXNDaGVja2VkKTtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXR0cmlidXRlJyk7XG4iXSwibmFtZXMiOlsidG9nZ2xlVmFsdWVUcmFuc2xhdGlvbnMiLCIkIiwiaXMiLCJzaG93IiwiaGlkZSIsImRvY3VtZW50IiwicmVhZHkiLCJzZWxlY3QyIiwidGFncyIsIm9uIiwicHJvcCIsImlzU3VwZXJDaGVja0JveCIsIm9mZiIsImNoZWNrYm94SXNDaGVja2VkIiwiYWxsb3dJbnB1dENoZWNrYm94IiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=