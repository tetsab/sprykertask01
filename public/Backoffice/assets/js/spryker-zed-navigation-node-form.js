"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-navigation-node-form"],{

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/safe-checks.js":
/*!**********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/safe-checks.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


var safeSubmitSelector = '.safe-submit';
var safeDatetimeSelector = '.safe-datetime[type=date], .safe-datetime[type=datetime], .safe-datetime[type=datetime-local]';

/* Prevent .save-submit items to be pressed twice */
function addSafeSubmitCheck() {
  $('body').on('click', safeSubmitSelector, function () {
    var $item = $(this);
    var $forms = $item.parents('form');
    var isValid = true;
    function disableTrigger() {
      $item.prop('disabled', true).addClass('disabled').off('click');
    }
    if ($forms.length > 0) {
      isValid = !!$forms[0].checkValidity ? $forms[0].checkValidity() : isValid;
    }
    if (isValid) {
      setTimeout(disableTrigger);
    } else {
      $('.ibox.collapsed').each((index, item) => {
        $(item).find('.collapse-link').trigger('click');
      });
    }
    return true;
  });
}

/* Prevent .save-datetime inputs to show native datepickers */
function addSafeDatetimeCheck() {
  $('body').on('click', safeDatetimeSelector, function (e) {
    function disableNativeWindow() {
      e.preventDefault();
    }
    setTimeout(disableNativeWindow);
    return false;
  });
}
module.exports = {
  addSafeSubmitCheck: addSafeSubmitCheck,
  addSafeDatetimeCheck: addSafeDatetimeCheck
};

/***/ }),

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation-node-form/main.js":
/*!******************************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation-node-form/main.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var safeChecks = __webpack_require__(/*! ZedGuiModules/libs/safe-checks */ "./vendor/spryker/gui/assets/Zed/js/modules/libs/safe-checks.js");
$(document).ready(function () {
  var $nodeTypeField = $('#navigation_node_node_type');
  displaySelectedNodeTypeField($nodeTypeField.val());
  $nodeTypeField.on('change', changeNodeType);
  var validFrom = $('#navigation_node_valid_from');
  var validTo = $('#navigation_node_valid_to');
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
  safeChecks.addSafeDatetimeCheck();
  $('.spryker-form-autocomplete').each(function (key, value) {
    var autoCompletedField = $(value);
    if (autoCompletedField.data('url') === 'undefined') {
      return;
    }
    if (autoCompletedField.hasClass('ui-autocomplete')) {
      autoCompletedField.autocomplete('destroy');
    }
    autoCompletedField.autocomplete({
      source: autoCompletedField.data('url'),
      minLength: 3
    });
  });
  deleteNavigationNodeHandler();
});

/**
 * @param {string} type
 *
 * @return {void}
 */
function displaySelectedNodeTypeField(type) {
  $('[data-node-type="' + type + '"]').removeClass('hidden');
}

/**
 * @return {void}
 */
function changeNodeType() {
  resetNodeTypeFields();
  displaySelectedNodeTypeField($(this).val());
  triggerResize();
}
function deleteNavigationNodeHandler() {
  var $deleteSelectedNodeButton = $('#remove-selected-node-btn');
  var $deleteNavigationNodeForm = $('form[name="delete_navigation_node_form"]');
  var message = $deleteSelectedNodeButton.data('confirm-message');
  $deleteSelectedNodeButton.on('click', function (event) {
    event.preventDefault();
    if (confirm(message)) {
      $deleteNavigationNodeForm[0].submit();
    }
  });
}

/**
 * @return {void}
 */
function resetNodeTypeFields() {
  $('.js-node-type-field').addClass('hidden').find('input[type="text"]').val('');
}

/**
 * @return {void}
 */
function triggerResize() {
  var resizeEvent = new Event('resize');
  window.dispatchEvent(resizeEvent);
}

/***/ }),

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation-node-form.entry.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation-node-form.entry.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/navigation-node-form/main */ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation-node-form/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation-node-form.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1uYXZpZ2F0aW9uLW5vZGUtZm9ybS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsSUFBSUEsa0JBQWtCLEdBQUcsY0FBYztBQUN2QyxJQUFJQyxvQkFBb0IsR0FDcEIsK0ZBQStGOztBQUVuRztBQUNBLFNBQVNDLGtCQUFrQkEsQ0FBQSxFQUFHO0VBQzFCQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUNDLEVBQUUsQ0FBQyxPQUFPLEVBQUVKLGtCQUFrQixFQUFFLFlBQVk7SUFDbEQsSUFBSUssS0FBSyxHQUFHRixDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ25CLElBQUlHLE1BQU0sR0FBR0QsS0FBSyxDQUFDRSxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2xDLElBQUlDLE9BQU8sR0FBRyxJQUFJO0lBRWxCLFNBQVNDLGNBQWNBLENBQUEsRUFBRztNQUN0QkosS0FBSyxDQUFDSyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUNDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDbEU7SUFFQSxJQUFJTixNQUFNLENBQUNPLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDbkJMLE9BQU8sR0FBRyxDQUFDLENBQUNGLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQ1EsYUFBYSxHQUFHUixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNRLGFBQWEsQ0FBQyxDQUFDLEdBQUdOLE9BQU87SUFDN0U7SUFFQSxJQUFJQSxPQUFPLEVBQUU7TUFDVE8sVUFBVSxDQUFDTixjQUFjLENBQUM7SUFDOUIsQ0FBQyxNQUFNO01BQ0hOLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDYSxJQUFJLENBQUMsQ0FBQ0MsS0FBSyxFQUFFQyxJQUFJLEtBQUs7UUFDdkNmLENBQUMsQ0FBQ2UsSUFBSSxDQUFDLENBQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxPQUFPLENBQUMsT0FBTyxDQUFDO01B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QUNBLFNBQVN5QixhQUFhQSxDQUFBLEVBQUc7RUFDckIsSUFBSU8sV0FBVyxHQUFHLElBQUlDLEtBQUssQ0FBQyxRQUFRLENBQUM7RUFDckNDLE1BQU0sQ0FBQ0MsYUFBYSxDQUFDSCxXQUFXLENBQUM7QUFDckM7Ozs7Ozs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJyQyxtQkFBTyxDQUFDLCtIQUFxQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL3NhZmUtY2hlY2tzLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL25hdmlnYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9uYXZpZ2F0aW9uLW5vZGUtZm9ybS9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL25hdmlnYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtbmF2aWdhdGlvbi1ub2RlLWZvcm0uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2FmZVN1Ym1pdFNlbGVjdG9yID0gJy5zYWZlLXN1Ym1pdCc7XG52YXIgc2FmZURhdGV0aW1lU2VsZWN0b3IgPVxuICAgICcuc2FmZS1kYXRldGltZVt0eXBlPWRhdGVdLCAuc2FmZS1kYXRldGltZVt0eXBlPWRhdGV0aW1lXSwgLnNhZmUtZGF0ZXRpbWVbdHlwZT1kYXRldGltZS1sb2NhbF0nO1xuXG4vKiBQcmV2ZW50IC5zYXZlLXN1Ym1pdCBpdGVtcyB0byBiZSBwcmVzc2VkIHR3aWNlICovXG5mdW5jdGlvbiBhZGRTYWZlU3VibWl0Q2hlY2soKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNhZmVTdWJtaXRTZWxlY3RvciwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGl0ZW0gPSAkKHRoaXMpO1xuICAgICAgICB2YXIgJGZvcm1zID0gJGl0ZW0ucGFyZW50cygnZm9ybScpO1xuICAgICAgICB2YXIgaXNWYWxpZCA9IHRydWU7XG5cbiAgICAgICAgZnVuY3Rpb24gZGlzYWJsZVRyaWdnZXIoKSB7XG4gICAgICAgICAgICAkaXRlbS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKCdkaXNhYmxlZCcpLm9mZignY2xpY2snKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkZm9ybXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgaXNWYWxpZCA9ICEhJGZvcm1zWzBdLmNoZWNrVmFsaWRpdHkgPyAkZm9ybXNbMF0uY2hlY2tWYWxpZGl0eSgpIDogaXNWYWxpZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1ZhbGlkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGRpc2FibGVUcmlnZ2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJy5pYm94LmNvbGxhcHNlZCcpLmVhY2goKGluZGV4LCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgJChpdGVtKS5maW5kKCcuY29sbGFwc2UtbGluaycpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufVxuXG4vKiBQcmV2ZW50IC5zYXZlLWRhdGV0aW1lIGlucHV0cyB0byBzaG93IG5hdGl2ZSBkYXRlcGlja2VycyAqL1xuZnVuY3Rpb24gYWRkU2FmZURhdGV0aW1lQ2hlY2soKSB7XG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsIHNhZmVEYXRldGltZVNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBmdW5jdGlvbiBkaXNhYmxlTmF0aXZlV2luZG93KCkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dChkaXNhYmxlTmF0aXZlV2luZG93KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFkZFNhZmVTdWJtaXRDaGVjazogYWRkU2FmZVN1Ym1pdENoZWNrLFxuICAgIGFkZFNhZmVEYXRldGltZUNoZWNrOiBhZGRTYWZlRGF0ZXRpbWVDaGVjayxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzYWZlQ2hlY2tzID0gcmVxdWlyZSgnWmVkR3VpTW9kdWxlcy9saWJzL3NhZmUtY2hlY2tzJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJG5vZGVUeXBlRmllbGQgPSAkKCcjbmF2aWdhdGlvbl9ub2RlX25vZGVfdHlwZScpO1xuXG4gICAgZGlzcGxheVNlbGVjdGVkTm9kZVR5cGVGaWVsZCgkbm9kZVR5cGVGaWVsZC52YWwoKSk7XG4gICAgJG5vZGVUeXBlRmllbGQub24oJ2NoYW5nZScsIGNoYW5nZU5vZGVUeXBlKTtcblxuICAgIHZhciB2YWxpZEZyb20gPSAkKCcjbmF2aWdhdGlvbl9ub2RlX3ZhbGlkX2Zyb20nKTtcbiAgICB2YXIgdmFsaWRUbyA9ICQoJyNuYXZpZ2F0aW9uX25vZGVfdmFsaWRfdG8nKTtcblxuICAgIHZhbGlkRnJvbS5kYXRlcGlja2VyKHtcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXG4gICAgICAgIG51bWJlck9mTW9udGhzOiAzLFxuICAgICAgICBtYXhEYXRlOiB2YWxpZFRvLnZhbCgpLFxuICAgICAgICBkZWZhdWx0RGF0YTogMCxcbiAgICAgICAgb25DbG9zZTogZnVuY3Rpb24gKHNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgdmFsaWRUby5kYXRlcGlja2VyKCdvcHRpb24nLCAnbWluRGF0ZScsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB2YWxpZFRvLmRhdGVwaWNrZXIoe1xuICAgICAgICBkZWZhdWx0RGF0YTogMCxcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXG4gICAgICAgIG51bWJlck9mTW9udGhzOiAzLFxuICAgICAgICBtaW5EYXRlOiB2YWxpZEZyb20udmFsKCksXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChzZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgIHZhbGlkRnJvbS5kYXRlcGlja2VyKCdvcHRpb24nLCAnbWF4RGF0ZScsIHNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBzYWZlQ2hlY2tzLmFkZFNhZmVEYXRldGltZUNoZWNrKCk7XG5cbiAgICAkKCcuc3ByeWtlci1mb3JtLWF1dG9jb21wbGV0ZScpLmVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGF1dG9Db21wbGV0ZWRGaWVsZCA9ICQodmFsdWUpO1xuICAgICAgICBpZiAoYXV0b0NvbXBsZXRlZEZpZWxkLmRhdGEoJ3VybCcpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGF1dG9Db21wbGV0ZWRGaWVsZC5oYXNDbGFzcygndWktYXV0b2NvbXBsZXRlJykpIHtcbiAgICAgICAgICAgIGF1dG9Db21wbGV0ZWRGaWVsZC5hdXRvY29tcGxldGUoJ2Rlc3Ryb3knKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF1dG9Db21wbGV0ZWRGaWVsZC5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgc291cmNlOiBhdXRvQ29tcGxldGVkRmllbGQuZGF0YSgndXJsJyksXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDMsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVsZXRlTmF2aWdhdGlvbk5vZGVIYW5kbGVyKCk7XG59KTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGRpc3BsYXlTZWxlY3RlZE5vZGVUeXBlRmllbGQodHlwZSkge1xuICAgICQoJ1tkYXRhLW5vZGUtdHlwZT1cIicgKyB0eXBlICsgJ1wiXScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBjaGFuZ2VOb2RlVHlwZSgpIHtcbiAgICByZXNldE5vZGVUeXBlRmllbGRzKCk7XG4gICAgZGlzcGxheVNlbGVjdGVkTm9kZVR5cGVGaWVsZCgkKHRoaXMpLnZhbCgpKTtcbiAgICB0cmlnZ2VyUmVzaXplKCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5hdmlnYXRpb25Ob2RlSGFuZGxlcigpIHtcbiAgICB2YXIgJGRlbGV0ZVNlbGVjdGVkTm9kZUJ1dHRvbiA9ICQoJyNyZW1vdmUtc2VsZWN0ZWQtbm9kZS1idG4nKTtcbiAgICB2YXIgJGRlbGV0ZU5hdmlnYXRpb25Ob2RlRm9ybSA9ICQoJ2Zvcm1bbmFtZT1cImRlbGV0ZV9uYXZpZ2F0aW9uX25vZGVfZm9ybVwiXScpO1xuICAgIHZhciBtZXNzYWdlID0gJGRlbGV0ZVNlbGVjdGVkTm9kZUJ1dHRvbi5kYXRhKCdjb25maXJtLW1lc3NhZ2UnKTtcblxuICAgICRkZWxldGVTZWxlY3RlZE5vZGVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICRkZWxldGVOYXZpZ2F0aW9uTm9kZUZvcm1bMF0uc3VibWl0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZXNldE5vZGVUeXBlRmllbGRzKCkge1xuICAgICQoJy5qcy1ub2RlLXR5cGUtZmllbGQnKS5hZGRDbGFzcygnaGlkZGVuJykuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0nKS52YWwoJycpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRyaWdnZXJSZXNpemUoKSB7XG4gICAgdmFyIHJlc2l6ZUV2ZW50ID0gbmV3IEV2ZW50KCdyZXNpemUnKTtcbiAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChyZXNpemVFdmVudCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9uYXZpZ2F0aW9uLW5vZGUtZm9ybS9tYWluJyk7XG4iXSwibmFtZXMiOlsic2FmZVN1Ym1pdFNlbGVjdG9yIiwic2FmZURhdGV0aW1lU2VsZWN0b3IiLCJhZGRTYWZlU3VibWl0Q2hlY2siLCIkIiwib24iLCIkaXRlbSIsIiRmb3JtcyIsInBhcmVudHMiLCJpc1ZhbGlkIiwiZGlzYWJsZVRyaWdnZXIiLCJwcm9wIiwiYWRkQ2xhc3MiLCJvZmYiLCJsZW5ndGgiLCJjaGVja1ZhbGlkaXR5Iiwic2V0VGltZW91dCIsImVhY2giLCJpbmRleCIsIml0ZW0iLCJmaW5kIiwidHJpZ2dlciIsImFkZFNhZmVEYXRldGltZUNoZWNrIiwiZSIsImRpc2FibGVOYXRpdmVXaW5kb3ciLCJwcmV2ZW50RGVmYXVsdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzYWZlQ2hlY2tzIiwicmVxdWlyZSIsImRvY3VtZW50IiwicmVhZHkiLCIkbm9kZVR5cGVGaWVsZCIsImRpc3BsYXlTZWxlY3RlZE5vZGVUeXBlRmllbGQiLCJ2YWwiLCJjaGFuZ2VOb2RlVHlwZSIsInZhbGlkRnJvbSIsInZhbGlkVG8iLCJkYXRlcGlja2VyIiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwibnVtYmVyT2ZNb250aHMiLCJtYXhEYXRlIiwiZGVmYXVsdERhdGEiLCJvbkNsb3NlIiwic2VsZWN0ZWREYXRlIiwibWluRGF0ZSIsImtleSIsInZhbHVlIiwiYXV0b0NvbXBsZXRlZEZpZWxkIiwiZGF0YSIsImhhc0NsYXNzIiwiYXV0b2NvbXBsZXRlIiwic291cmNlIiwibWluTGVuZ3RoIiwiZGVsZXRlTmF2aWdhdGlvbk5vZGVIYW5kbGVyIiwidHlwZSIsInJlbW92ZUNsYXNzIiwicmVzZXROb2RlVHlwZUZpZWxkcyIsInRyaWdnZXJSZXNpemUiLCIkZGVsZXRlU2VsZWN0ZWROb2RlQnV0dG9uIiwiJGRlbGV0ZU5hdmlnYXRpb25Ob2RlRm9ybSIsIm1lc3NhZ2UiLCJldmVudCIsImNvbmZpcm0iLCJzdWJtaXQiLCJyZXNpemVFdmVudCIsIkV2ZW50Iiwid2luZG93IiwiZGlzcGF0Y2hFdmVudCJdLCJzb3VyY2VSb290IjoiIn0=