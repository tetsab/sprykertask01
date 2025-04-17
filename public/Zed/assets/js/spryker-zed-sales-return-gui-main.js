"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-sales-return-gui-main"],{

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/form-action.js":
/*!******************************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/modules/form-action.js ***!
  \******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function FormAction(options) {
  $.extend(this, options);
  this.$table = $(this.tableSelector);
  this.$item = this.$table.find(this.itemSelector).not(':disabled');
  this.$actionButton = $(this.actionButtonSelector);
  this.checkedItemIds = [];
  this.init = function () {
    this.mapEvents();
  };
  this.mapEvents = function () {
    var self = this;
    this.$actionButton.on('click', function (event) {
      event.preventDefault();
      self.updateFormAction($(this));
    });
  };
  this.updateFormAction = function ($actionButton) {
    var $form = $actionButton.closest('form');
    var formUrl = decodeURI($form.attr('action'));
    this.setCheckedItemIds();
    if (this.checkedItemIds.length) {
      formUrl = formUrl.replace(/&items\[(\d+)?\]=\d+/g, '') + '&' + $.param({
        items: this.checkedItemIds
      });
    }
    this.formSubmit($actionButton, $form, formUrl);
  };
  this.setCheckedItemIds = function () {
    var self = this;
    this.$item.each(function () {
      if (!$(this).prop('checked')) {
        return;
      }
      self.checkedItemIds.push($(this).val());
    });
  };
  this.formSubmit = function ($button, $form, formUrl) {
    $button.prop('disabled', true).addClass('disabled');
    $form.attr('action', formUrl);
    $form.submit();
  };
  this.init();
}
module.exports = FormAction;

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-counter.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-counter.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function ItemsCounter(options) {
  $.extend(this, options);
  this.$table = $(this.tableSelector);
  this.$allItems = this.$table.find(this.allItemsSelector);
  this.$item = this.$table.find(this.itemSelector);
  this.$counterWrapper = $(this.counterWrapperSelector);
  this.$counter = $(this.counterSelector);
  this.init = function () {
    this.mapEvents();
  };
  this.mapEvents = function () {
    var self = this;
    this.$item.on('change', function () {
      self.updateItemCounter();
    });
    this.$allItems.on('change', function () {
      setTimeout(function () {
        self.updateItemCounter();
      }, 0);
    });
  };
  this.updateItemCounter = function () {
    var checkedItems = this.$table.find(this.checkedItemSelector).length;
    if (checkedItems) {
      this.$counter.text(checkedItems);
      this.$counterWrapper.removeClass('hidden');
      return;
    }
    this.$counterWrapper.addClass('hidden');
  };
  this.init();
}
module.exports = ItemsCounter;

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-toggler.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-toggler.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function ItemsToggler(options) {
  $.extend(this, options);
  this.$table = $(this.tableSelector);
  this.$allItems = this.$table.find(this.allItemsSelector);
  this.$item = this.$table.find(this.itemSelector);
  this.$submitButton = $(this.submitButtonSelector);
  this.init = function () {
    this.toggleSubmitDisabledAttribute();
    this.mapEvents();
  };
  this.mapEvents = function () {
    var self = this;
    this.$item.on('change', function () {
      self.toggleAllItemsCheckbox();
      self.toggleSubmitDisabledAttribute();
    });
    this.$allItems.on('change', function () {
      self.toggleItemCheckbox($(this));
      self.toggleSubmitDisabledAttribute();
    });
  };
  this.toggleAllItemsCheckbox = function () {
    var checkedItems = this.$table.find(this.checkedItemSelector).length;
    if (this.$item.length === checkedItems) {
      this.$allItems.prop('checked', true);
      return;
    }
    this.$allItems.prop('checked', false);
  };
  this.toggleItemCheckbox = function ($item) {
    this.$item.not(':disabled').prop('checked', $item.prop('checked'));
  };
  this.toggleSubmitDisabledAttribute = function () {
    if (!this.$submitButton) {
      return;
    }
    var checkedItems = this.$table.find(this.checkedItemSelector).length;
    if (checkedItems) {
      this.$submitButton.prop('disabled', false);
      return;
    }
    this.$submitButton.prop('disabled', true);
  };
  this.init();
}
module.exports = ItemsToggler;

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/main.js":
/*!***********************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/modules/main.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../../scss/main.scss */ "./vendor/spryker/sales-return-gui/assets/Zed/scss/main.scss");
var FormAction = __webpack_require__(/*! ./form-action */ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/form-action.js");
var ItemsCounter = __webpack_require__(/*! ./items-counter */ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-counter.js");
var ItemsToggler = __webpack_require__(/*! ./items-toggler */ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/items-toggler.js");
var ReasonMessageToggler = __webpack_require__(/*! ./reason-message-toggler */ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/reason-message-toggler.js");
$(document).ready(function () {
  new FormAction({
    tableSelector: '.js-return-items-table',
    itemSelector: '.js-check-item',
    actionButtonSelector: '.js-return-bulk-trigger-buttons button'
  });
  new ItemsCounter({
    tableSelector: '.js-return-items-table',
    allItemsSelector: '.js-check-all-items',
    itemSelector: '.js-check-item',
    checkedItemSelector: '.js-check-item:checked',
    counterWrapperSelector: '.js-item-counter-wrapper',
    counterSelector: '.js-item-counter'
  });
  new ItemsToggler({
    tableSelector: '.js-return-items-table',
    allItemsSelector: '.js-check-all-items',
    itemSelector: '.js-check-item',
    checkedItemSelector: '.js-check-item:checked',
    submitButtonSelector: '.js-create-return-submit'
  });
  new ReasonMessageToggler({
    selectSelector: '.js-select-reason',
    toggleValue: 'custom_reason'
  });
});

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/reason-message-toggler.js":
/*!*****************************************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/modules/reason-message-toggler.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function ReasonMessageToggler(options) {
  $.extend(this, options);
  this.$select = $(this.selectSelector);
  this.init = function () {
    this.mapEvents();
  };
  this.mapEvents = function () {
    var self = this;
    this.$select.on('change', function () {
      self.toggleMessageBlock($(this));
    });
  };
  this.toggleMessageBlock = function ($select) {
    var targetClassName = $select.data('target');
    var $target = $('.' + targetClassName);
    var isToggleValueSelected = this.toggleValue === $select.val();
    if (isToggleValueSelected) {
      $target.removeClass('hidden');
      return;
    }
    $target.addClass('hidden');
  };
  this.init();
}
module.exports = ReasonMessageToggler;

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/js/spryker-zed-sales-return-gui-main.entry.js":
/*!**************************************************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/js/spryker-zed-sales-return-gui-main.entry.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/sales-return-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/sales-return-gui/assets/Zed/scss/main.scss":
/*!*******************************************************************!*\
  !*** ./vendor/spryker/sales-return-gui/assets/Zed/scss/main.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/sales-return-gui/assets/Zed/js/spryker-zed-sales-return-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zYWxlcy1yZXR1cm4tZ3VpLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVNBLFVBQVVBLENBQUNDLE9BQU8sRUFBRTtFQUN6QkMsQ0FBQyxDQUFDQyxNQUFNLENBQUMsSUFBSSxFQUFFRixPQUFPLENBQUM7RUFFdkIsSUFBSSxDQUFDRyxNQUFNLEdBQUdGLENBQUMsQ0FBQyxJQUFJLENBQUNHLGFBQWEsQ0FBQztFQUNuQyxJQUFJLENBQUNDLEtBQUssR0FBRyxJQUFJLENBQUNGLE1BQU0sQ0FBQ0csSUFBSSxDQUFDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7RUFDakUsSUFBSSxDQUFDQyxhQUFhLEdBQUdSLENBQUMsQ0FBQyxJQUFJLENBQUNTLG9CQUFvQixDQUFDO0VBQ2pELElBQUksQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7RUFFeEIsSUFBSSxDQUFDQyxJQUFJLEdBQUcsWUFBWTtJQUNwQixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFRCxJQUFJLENBQUNBLFNBQVMsR0FBRyxZQUFZO0lBQ3pCLElBQUlDLElBQUksR0FBRyxJQUFJO0lBRWYsSUFBSSxDQUFDTCxhQUFhLENBQUNNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBVUMsS0FBSyxFQUFFO01BQzVDQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ3RCSCxJQUFJLENBQUNJLGdCQUFnQixDQUFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRCxJQUFJLENBQUNpQixnQkFBZ0IsR0FBRyxVQUFVVCxhQUFhLEVBQUU7SUFDN0MsSUFBSVUsS0FBSyxHQUFHVixhQUFhLENBQUNXLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDekMsSUFBSUMsT0FBTyxHQUFHQyxTQUFTLENBQUNILEtB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SUMsT0FBTyxHQUFHbkUsQ0FBQyxDQUFDLEdBQUcsR0FBR2lFLGVBQWUsQ0FBQztJQUN0QyxJQUFJRyxxQkFBcUIsR0FBRyxJQUFJLENBQUNOLFdBQVcsS0FBS0MsT0FBTyxDQUFDL0IsR0FBRyxDQUFDLENBQUM7SUFFOUQsSUFBSW9DLHFCQUFxQixFQUFFO01BQ3ZCRCxPQUFPLENBQUNqQixXQUFXLENBQUMsUUFBUSxDQUFDO01BRTdCO0lBQ0o7SUFFQWlCLE9BQU8sQ0FBQ2pDLFFBQVEsQ0FBQyxRQUFRLENBQUM7RUFDOUIsQ0FBQztFQUVELElBQUksQ0FBQ3ZCLElBQUksQ0FBQyxDQUFDO0FBQ2Y7QUFFQXlCLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHcUIsb0JBQW9COzs7Ozs7Ozs7O0FDekNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkQsbUJBQU8sQ0FBQyx1RkFBZ0IsQ0FBQzs7Ozs7Ozs7Ozs7QUNQekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy1yZXR1cm4tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9mb3JtLWFjdGlvbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy1yZXR1cm4tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9pdGVtcy1jb3VudGVyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NhbGVzLXJldHVybi1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2l0ZW1zLXRvZ2dsZXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtcmV0dXJuLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy1yZXR1cm4tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9yZWFzb24tbWVzc2FnZS10b2dnbGVyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NhbGVzLXJldHVybi1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1zYWxlcy1yZXR1cm4tZ3VpLW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtcmV0dXJuLWd1aS9hc3NldHMvWmVkL3Njc3MvbWFpbi5zY3NzPzg4MDgiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBGb3JtQWN0aW9uKG9wdGlvbnMpIHtcbiAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuJHRhYmxlID0gJCh0aGlzLnRhYmxlU2VsZWN0b3IpO1xuICAgIHRoaXMuJGl0ZW0gPSB0aGlzLiR0YWJsZS5maW5kKHRoaXMuaXRlbVNlbGVjdG9yKS5ub3QoJzpkaXNhYmxlZCcpO1xuICAgIHRoaXMuJGFjdGlvbkJ1dHRvbiA9ICQodGhpcy5hY3Rpb25CdXR0b25TZWxlY3Rvcik7XG4gICAgdGhpcy5jaGVja2VkSXRlbUlkcyA9IFtdO1xuXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH07XG5cbiAgICB0aGlzLm1hcEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGFjdGlvbkJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUZvcm1BY3Rpb24oJCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUZvcm1BY3Rpb24gPSBmdW5jdGlvbiAoJGFjdGlvbkJ1dHRvbikge1xuICAgICAgICB2YXIgJGZvcm0gPSAkYWN0aW9uQnV0dG9uLmNsb3Nlc3QoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGZvcm1VcmwgPSBkZWNvZGVVUkkoJGZvcm0uYXR0cignYWN0aW9uJykpO1xuXG4gICAgICAgIHRoaXMuc2V0Q2hlY2tlZEl0ZW1JZHMoKTtcblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkSXRlbUlkcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcm1VcmwgPVxuICAgICAgICAgICAgICAgIGZvcm1VcmwucmVwbGFjZSgvJml0ZW1zXFxbKFxcZCspP1xcXT1cXGQrL2csICcnKSArXG4gICAgICAgICAgICAgICAgJyYnICtcbiAgICAgICAgICAgICAgICAkLnBhcmFtKHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IHRoaXMuY2hlY2tlZEl0ZW1JZHMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1TdWJtaXQoJGFjdGlvbkJ1dHRvbiwgJGZvcm0sIGZvcm1VcmwpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldENoZWNrZWRJdGVtSWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy4kaXRlbS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghJCh0aGlzKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuY2hlY2tlZEl0ZW1JZHMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZm9ybVN1Ym1pdCA9IGZ1bmN0aW9uICgkYnV0dG9uLCAkZm9ybSwgZm9ybVVybCkge1xuICAgICAgICAkYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICRmb3JtLmF0dHIoJ2FjdGlvbicsIGZvcm1VcmwpO1xuICAgICAgICAkZm9ybS5zdWJtaXQoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybUFjdGlvbjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gSXRlbXNDb3VudGVyKG9wdGlvbnMpIHtcbiAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuJHRhYmxlID0gJCh0aGlzLnRhYmxlU2VsZWN0b3IpO1xuICAgIHRoaXMuJGFsbEl0ZW1zID0gdGhpcy4kdGFibGUuZmluZCh0aGlzLmFsbEl0ZW1zU2VsZWN0b3IpO1xuICAgIHRoaXMuJGl0ZW0gPSB0aGlzLiR0YWJsZS5maW5kKHRoaXMuaXRlbVNlbGVjdG9yKTtcbiAgICB0aGlzLiRjb3VudGVyV3JhcHBlciA9ICQodGhpcy5jb3VudGVyV3JhcHBlclNlbGVjdG9yKTtcbiAgICB0aGlzLiRjb3VudGVyID0gJCh0aGlzLmNvdW50ZXJTZWxlY3Rvcik7XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfTtcblxuICAgIHRoaXMubWFwRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy4kaXRlbS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVJdGVtQ291bnRlcigpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRhbGxJdGVtcy5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi51cGRhdGVJdGVtQ291bnRlcigpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUl0ZW1Db3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY2hlY2tlZEl0ZW1zID0gdGhpcy4kdGFibGUuZmluZCh0aGlzLmNoZWNrZWRJdGVtU2VsZWN0b3IpLmxlbmd0aDtcblxuICAgICAgICBpZiAoY2hlY2tlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRjb3VudGVyLnRleHQoY2hlY2tlZEl0ZW1zKTtcbiAgICAgICAgICAgIHRoaXMuJGNvdW50ZXJXcmFwcGVyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kY291bnRlcldyYXBwZXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJdGVtc0NvdW50ZXI7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEl0ZW1zVG9nZ2xlcihvcHRpb25zKSB7XG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLiR0YWJsZSA9ICQodGhpcy50YWJsZVNlbGVjdG9yKTtcbiAgICB0aGlzLiRhbGxJdGVtcyA9IHRoaXMuJHRhYmxlLmZpbmQodGhpcy5hbGxJdGVtc1NlbGVjdG9yKTtcbiAgICB0aGlzLiRpdGVtID0gdGhpcy4kdGFibGUuZmluZCh0aGlzLml0ZW1TZWxlY3Rvcik7XG4gICAgdGhpcy4kc3VibWl0QnV0dG9uID0gJCh0aGlzLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcblxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50b2dnbGVTdWJtaXREaXNhYmxlZEF0dHJpYnV0ZSgpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH07XG5cbiAgICB0aGlzLm1hcEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGl0ZW0ub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYudG9nZ2xlQWxsSXRlbXNDaGVja2JveCgpO1xuICAgICAgICAgICAgc2VsZi50b2dnbGVTdWJtaXREaXNhYmxlZEF0dHJpYnV0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRhbGxJdGVtcy5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi50b2dnbGVJdGVtQ2hlY2tib3goJCh0aGlzKSk7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZVN1Ym1pdERpc2FibGVkQXR0cmlidXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZUFsbEl0ZW1zQ2hlY2tib3ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjaGVja2VkSXRlbXMgPSB0aGlzLiR0YWJsZS5maW5kKHRoaXMuY2hlY2tlZEl0ZW1TZWxlY3RvcikubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0aGlzLiRpdGVtLmxlbmd0aCA9PT0gY2hlY2tlZEl0ZW1zKSB7XG4gICAgICAgICAgICB0aGlzLiRhbGxJdGVtcy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGFsbEl0ZW1zLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgfTtcblxuICAgIHRoaXMudG9nZ2xlSXRlbUNoZWNrYm94ID0gZnVuY3Rpb24gKCRpdGVtKSB7XG4gICAgICAgIHRoaXMuJGl0ZW0ubm90KCc6ZGlzYWJsZWQnKS5wcm9wKCdjaGVja2VkJywgJGl0ZW0ucHJvcCgnY2hlY2tlZCcpKTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVTdWJtaXREaXNhYmxlZEF0dHJpYnV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRzdWJtaXRCdXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaGVja2VkSXRlbXMgPSB0aGlzLiR0YWJsZS5maW5kKHRoaXMuY2hlY2tlZEl0ZW1TZWxlY3RvcikubGVuZ3RoO1xuXG4gICAgICAgIGlmIChjaGVja2VkSXRlbXMpIHtcbiAgICAgICAgICAgIHRoaXMuJHN1Ym1pdEJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEl0ZW1zVG9nZ2xlcjtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYWluLnNjc3MnKTtcbnZhciBGb3JtQWN0aW9uID0gcmVxdWlyZSgnLi9mb3JtLWFjdGlvbicpO1xudmFyIEl0ZW1zQ291bnRlciA9IHJlcXVpcmUoJy4vaXRlbXMtY291bnRlcicpO1xudmFyIEl0ZW1zVG9nZ2xlciA9IHJlcXVpcmUoJy4vaXRlbXMtdG9nZ2xlcicpO1xudmFyIFJlYXNvbk1lc3NhZ2VUb2dnbGVyID0gcmVxdWlyZSgnLi9yZWFzb24tbWVzc2FnZS10b2dnbGVyJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBuZXcgRm9ybUFjdGlvbih7XG4gICAgICAgIHRhYmxlU2VsZWN0b3I6ICcuanMtcmV0dXJuLWl0ZW1zLXRhYmxlJyxcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmpzLWNoZWNrLWl0ZW0nLFxuICAgICAgICBhY3Rpb25CdXR0b25TZWxlY3RvcjogJy5qcy1yZXR1cm4tYnVsay10cmlnZ2VyLWJ1dHRvbnMgYnV0dG9uJyxcbiAgICB9KTtcblxuICAgIG5ldyBJdGVtc0NvdW50ZXIoe1xuICAgICAgICB0YWJsZVNlbGVjdG9yOiAnLmpzLXJldHVybi1pdGVtcy10YWJsZScsXG4gICAgICAgIGFsbEl0ZW1zU2VsZWN0b3I6ICcuanMtY2hlY2stYWxsLWl0ZW1zJyxcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmpzLWNoZWNrLWl0ZW0nLFxuICAgICAgICBjaGVja2VkSXRlbVNlbGVjdG9yOiAnLmpzLWNoZWNrLWl0ZW06Y2hlY2tlZCcsXG4gICAgICAgIGNvdW50ZXJXcmFwcGVyU2VsZWN0b3I6ICcuanMtaXRlbS1jb3VudGVyLXdyYXBwZXInLFxuICAgICAgICBjb3VudGVyU2VsZWN0b3I6ICcuanMtaXRlbS1jb3VudGVyJyxcbiAgICB9KTtcblxuICAgIG5ldyBJdGVtc1RvZ2dsZXIoe1xuICAgICAgICB0YWJsZVNlbGVjdG9yOiAnLmpzLXJldHVybi1pdGVtcy10YWJsZScsXG4gICAgICAgIGFsbEl0ZW1zU2VsZWN0b3I6ICcuanMtY2hlY2stYWxsLWl0ZW1zJyxcbiAgICAgICAgaXRlbVNlbGVjdG9yOiAnLmpzLWNoZWNrLWl0ZW0nLFxuICAgICAgICBjaGVja2VkSXRlbVNlbGVjdG9yOiAnLmpzLWNoZWNrLWl0ZW06Y2hlY2tlZCcsXG4gICAgICAgIHN1Ym1pdEJ1dHRvblNlbGVjdG9yOiAnLmpzLWNyZWF0ZS1yZXR1cm4tc3VibWl0JyxcbiAgICB9KTtcblxuICAgIG5ldyBSZWFzb25NZXNzYWdlVG9nZ2xlcih7XG4gICAgICAgIHNlbGVjdFNlbGVjdG9yOiAnLmpzLXNlbGVjdC1yZWFzb24nLFxuICAgICAgICB0b2dnbGVWYWx1ZTogJ2N1c3RvbV9yZWFzb24nLFxuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFJlYXNvbk1lc3NhZ2VUb2dnbGVyKG9wdGlvbnMpIHtcbiAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuJHNlbGVjdCA9ICQodGhpcy5zZWxlY3RTZWxlY3Rvcik7XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfTtcblxuICAgIHRoaXMubWFwRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy4kc2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZU1lc3NhZ2VCbG9jaygkKHRoaXMpKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMudG9nZ2xlTWVzc2FnZUJsb2NrID0gZnVuY3Rpb24gKCRzZWxlY3QpIHtcbiAgICAgICAgdmFyIHRhcmdldENsYXNzTmFtZSA9ICRzZWxlY3QuZGF0YSgndGFyZ2V0Jyk7XG4gICAgICAgIHZhciAkdGFyZ2V0ID0gJCgnLicgKyB0YXJnZXRDbGFzc05hbWUpO1xuICAgICAgICB2YXIgaXNUb2dnbGVWYWx1ZVNlbGVjdGVkID0gdGhpcy50b2dnbGVWYWx1ZSA9PT0gJHNlbGVjdC52YWwoKTtcblxuICAgICAgICBpZiAoaXNUb2dnbGVWYWx1ZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICAkdGFyZ2V0LnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYXNvbk1lc3NhZ2VUb2dnbGVyO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIkZvcm1BY3Rpb24iLCJvcHRpb25zIiwiJCIsImV4dGVuZCIsIiR0YWJsZSIsInRhYmxlU2VsZWN0b3IiLCIkaXRlbSIsImZpbmQiLCJpdGVtU2VsZWN0b3IiLCJub3QiLCIkYWN0aW9uQnV0dG9uIiwiYWN0aW9uQnV0dG9uU2VsZWN0b3IiLCJjaGVja2VkSXRlbUlkcyIsImluaXQiLCJtYXBFdmVudHMiLCJzZWxmIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidXBkYXRlRm9ybUFjdGlvbiIsIiRmb3JtIiwiY2xvc2VzdCIsImZvcm1VcmwiLCJkZWNvZGVVUkkiLCJhdHRyIiwic2V0Q2hlY2tlZEl0ZW1JZHMiLCJsZW5ndGgiLCJyZXBsYWNlIiwicGFyYW0iLCJpdGVtcyIsImZvcm1TdWJtaXQiLCJlYWNoIiwicHJvcCIsInB1c2giLCJ2YWwiLCIkYnV0dG9uIiwiYWRkQ2xhc3MiLCJzdWJtaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiSXRlbXNDb3VudGVyIiwiJGFsbEl0ZW1zIiwiYWxsSXRlbXNTZWxlY3RvciIsIiRjb3VudGVyV3JhcHBlciIsImNvdW50ZXJXcmFwcGVyU2VsZWN0b3IiLCIkY291bnRlciIsImNvdW50ZXJTZWxlY3RvciIsInVwZGF0ZUl0ZW1Db3VudGVyIiwic2V0VGltZW91dCIsImNoZWNrZWRJdGVtcyIsImNoZWNrZWRJdGVtU2VsZWN0b3IiLCJ0ZXh0IiwicmVtb3ZlQ2xhc3MiLCJJdGVtc1RvZ2dsZXIiLCIkc3VibWl0QnV0dG9uIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJ0b2dnbGVTdWJtaXREaXNhYmxlZEF0dHJpYnV0ZSIsInRvZ2dsZUFsbEl0ZW1zQ2hlY2tib3giLCJ0b2dnbGVJdGVtQ2hlY2tib3giLCJyZXF1aXJlIiwiUmVhc29uTWVzc2FnZVRvZ2dsZXIiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VsZWN0U2VsZWN0b3IiLCJ0b2dnbGVWYWx1ZSIsIiRzZWxlY3QiLCJ0b2dnbGVNZXNzYWdlQmxvY2siLCJ0YXJnZXRDbGFzc05hbWUiLCJkYXRhIiwiJHRhcmdldCIsImlzVG9nZ2xlVmFsdWVTZWxlY3RlZCJdLCJzb3VyY2VSb290IjoiIn0=