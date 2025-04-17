"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-sales-main"],{

/***/ "./vendor/spryker/sales/assets/Zed/js/modules/logic.js":
/*!*************************************************************!*\
  !*** ./vendor/spryker/sales/assets/Zed/js/modules/logic.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('.sales-order-item-group-element button').click(function (e) {
    e.preventDefault();
    var keyItemGroup = $(this).closest('.sales-order-item-group-element').data('group-key');
    var $groupTable = $('.order-group-items-table-' + keyItemGroup);
    var $idGroupItems = $groupTable.find('input[name="order-item"]');
    var idGroupItemsCheckedList = [];
    var idGroupItemsFullList = [];
    var $form = $(this).closest('form');
    var formAction = $form.attr('action');
    $idGroupItems.each(function () {
      idGroupItemsFullList.push($(this).val());
      if ($(this).prop('checked')) {
        idGroupItemsCheckedList.push($(this).val());
      }
    });
    if (!idGroupItemsCheckedList.length) {
      idGroupItemsCheckedList = idGroupItemsFullList;
    }
    var finalUrl = formAction + '&' + $.param({
      items: idGroupItemsCheckedList
    });
    $(this).prop('disabled', true).addClass('disabled');
    $form.attr('action', finalUrl);
    $form.submit();
  });
  $('.item-check').click(function () {
    var $table = $(this).closest('table');
    var $checkAllOrders = $table.find('#check-all-orders');
    var countChecked = $table.find('.item-check[type="checkbox"]:checked').length;
    var totalCheckboxItems = $table.find('.item-check').length;
    if (totalCheckboxItems === countChecked) {
      $checkAllOrders.prop('checked', true);
      return;
    }
    $checkAllOrders.prop('checked', false);
  });
  $('.more-attributes').click(function (e) {
    e.preventDefault();
    var idProductItem = $(this).data('id');
    var $attributes = $('#attribute_details_' + idProductItem);
    var $button = $('#attribute-details-btn-' + idProductItem);
    var isHidden = $attributes.hasClass('hidden');
    $attributes.toggleClass('hidden', !isHidden);
    $button.toggleClass('is-hidden', !isHidden);
    $button.toggleClass('is-shown', isHidden);
  });
  $('.item-split').click(function (e) {
    e.preventDefault();
    var theID = $(this).data('id');
    $('#split_form_row_' + theID).toggle();
  });
  $('#check-all-orders').click(function () {
    $(this).closest('table').find('.item-check').prop('checked', $(this).prop('checked'));
  });
});

/***/ }),

/***/ "./vendor/spryker/sales/assets/Zed/js/modules/main.js":
/*!************************************************************!*\
  !*** ./vendor/spryker/sales/assets/Zed/js/modules/main.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./logic */ "./vendor/spryker/sales/assets/Zed/js/modules/logic.js");
__webpack_require__(/*! ../../scss/main.scss */ "./vendor/spryker/sales/assets/Zed/scss/main.scss");

/***/ }),

/***/ "./vendor/spryker/sales/assets/Zed/js/spryker-zed-sales-main.entry.js":
/*!****************************************************************************!*\
  !*** ./vendor/spryker/sales/assets/Zed/js/spryker-zed-sales-main.entry.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/sales/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/sales/assets/Zed/scss/main.scss":
/*!********************************************************!*\
  !*** ./vendor/spryker/sales/assets/Zed/scss/main.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/sales/assets/Zed/js/spryker-zed-sales-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN6RixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUMxRVc7O0FBRWJtQixtQkFBTyxDQUFDLHNFQUFTLENBQUM7QUFDbEJBLG1CQUFPLENBQUMsOEVBQXNCLENBQUM7Ozs7Ozs7Ozs7QUNIbEI7O0FBRWJBLG1CQUFPLENBQUMsNEVBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FDRnpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xvZ2ljLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NhbGVzL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3NhbGVzL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtc2FsZXMtbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy9hc3NldHMvWmVkL3Njc3MvbWFpbi5zY3NzPzNiNDMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnLnNhbGVzLW9yZGVyLWl0ZW0tZ3JvdXAtZWxlbWVudCBidXR0b24nKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBrZXlJdGVtR3JvdXAgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zYWxlcy1vcmRlci1pdGVtLWdyb3VwLWVsZW1lbnQnKS5kYXRhKCdncm91cC1rZXknKTtcbiAgICAgICAgdmFyICRncm91cFRhYmxlID0gJCgnLm9yZGVyLWdyb3VwLWl0ZW1zLXRhYmxlLScgKyBrZXlJdGVtR3JvdXApO1xuICAgICAgICB2YXIgJGlkR3JvdXBJdGVtcyA9ICRncm91cFRhYmxlLmZpbmQoJ2lucHV0W25hbWU9XCJvcmRlci1pdGVtXCJdJyk7XG4gICAgICAgIHZhciBpZEdyb3VwSXRlbXNDaGVja2VkTGlzdCA9IFtdO1xuICAgICAgICB2YXIgaWRHcm91cEl0ZW1zRnVsbExpc3QgPSBbXTtcbiAgICAgICAgdmFyICRmb3JtID0gJCh0aGlzKS5jbG9zZXN0KCdmb3JtJyk7XG4gICAgICAgIHZhciBmb3JtQWN0aW9uID0gJGZvcm0uYXR0cignYWN0aW9uJyk7XG5cbiAgICAgICAgJGlkR3JvdXBJdGVtcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlkR3JvdXBJdGVtc0Z1bGxMaXN0LnB1c2goJCh0aGlzKS52YWwoKSk7XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIGlkR3JvdXBJdGVtc0NoZWNrZWRMaXN0LnB1c2goJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaWRHcm91cEl0ZW1zQ2hlY2tlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZEdyb3VwSXRlbXNDaGVja2VkTGlzdCA9IGlkR3JvdXBJdGVtc0Z1bGxMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpbmFsVXJsID0gZm9ybUFjdGlvbiArICcmJyArICQucGFyYW0oeyBpdGVtczogaWRHcm91cEl0ZW1zQ2hlY2tlZExpc3QgfSk7XG5cbiAgICAgICAgJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAkZm9ybS5hdHRyKCdhY3Rpb24nLCBmaW5hbFVybCk7XG4gICAgICAgICRmb3JtLnN1Ym1pdCgpO1xuICAgIH0pO1xuXG4gICAgJCgnLml0ZW0tY2hlY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkdGFibGUgPSAkKHRoaXMpLmNsb3Nlc3QoJ3RhYmxlJyk7XG4gICAgICAgIHZhciAkY2hlY2tBbGxPcmRlcnMgPSAkdGFibGUuZmluZCgnI2NoZWNrLWFsbC1vcmRlcnMnKTtcbiAgICAgICAgdmFyIGNvdW50Q2hlY2tlZCA9ICR0YWJsZS5maW5kKCcuaXRlbS1jaGVja1t0eXBlPVwiY2hlY2tib3hcIl06Y2hlY2tlZCcpLmxlbmd0aDtcbiAgICAgICAgdmFyIHRvdGFsQ2hlY2tib3hJdGVtcyA9ICR0YWJsZS5maW5kKCcuaXRlbS1jaGVjaycpLmxlbmd0aDtcblxuICAgICAgICBpZiAodG90YWxDaGVja2JveEl0ZW1zID09PSBjb3VudENoZWNrZWQpIHtcbiAgICAgICAgICAgICRjaGVja0FsbE9yZGVycy5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRjaGVja0FsbE9yZGVycy5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgJCgnLm1vcmUtYXR0cmlidXRlcycpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIGlkUHJvZHVjdEl0ZW0gPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XG4gICAgICAgIHZhciAkYXR0cmlidXRlcyA9ICQoJyNhdHRyaWJ1dGVfZGV0YWlsc18nICsgaWRQcm9kdWN0SXRlbSk7XG4gICAgICAgIHZhciAkYnV0dG9uID0gJCgnI2F0dHJpYnV0ZS1kZXRhaWxzLWJ0bi0nICsgaWRQcm9kdWN0SXRlbSk7XG4gICAgICAgIHZhciBpc0hpZGRlbiA9ICRhdHRyaWJ1dGVzLmhhc0NsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgICAkYXR0cmlidXRlcy50b2dnbGVDbGFzcygnaGlkZGVuJywgIWlzSGlkZGVuKTtcbiAgICAgICAgJGJ1dHRvbi50b2dnbGVDbGFzcygnaXMtaGlkZGVuJywgIWlzSGlkZGVuKTtcbiAgICAgICAgJGJ1dHRvbi50b2dnbGVDbGFzcygnaXMtc2hvd24nLCBpc0hpZGRlbik7XG4gICAgfSk7XG5cbiAgICAkKCcuaXRlbS1zcGxpdCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHRoZUlEID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xuXG4gICAgICAgICQoJyNzcGxpdF9mb3JtX3Jvd18nICsgdGhlSUQpLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gICAgJCgnI2NoZWNrLWFsbC1vcmRlcnMnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgndGFibGUnKS5maW5kKCcuaXRlbS1jaGVjaycpLnByb3AoJ2NoZWNrZWQnLCAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSk7XG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9sb2dpYycpO1xucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYWluLnNjc3MnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImNsaWNrIiwiZSIsInByZXZlbnREZWZhdWx0Iiwia2V5SXRlbUdyb3VwIiwiY2xvc2VzdCIsImRhdGEiLCIkZ3JvdXBUYWJsZSIsIiRpZEdyb3VwSXRlbXMiLCJmaW5kIiwiaWRHcm91cEl0ZW1zQ2hlY2tlZExpc3QiLCJpZEdyb3VwSXRlbXNGdWxsTGlzdCIsIiRmb3JtIiwiZm9ybUFjdGlvbiIsImF0dHIiLCJlYWNoIiwicHVzaCIsInZhbCIsInByb3AiLCJsZW5ndGgiLCJmaW5hbFVybCIsInBhcmFtIiwiaXRlbXMiLCJhZGRDbGFzcyIsInN1Ym1pdCIsIiR0YWJsZSIsIiRjaGVja0FsbE9yZGVycyIsImNvdW50Q2hlY2tlZCIsInRvdGFsQ2hlY2tib3hJdGVtcyIsImlkUHJvZHVjdEl0ZW0iLCIkYXR0cmlidXRlcyIsIiRidXR0b24iLCJpc0hpZGRlbiIsImhhc0NsYXNzIiwidG9nZ2xlQ2xhc3MiLCJ0aGVJRCIsInRvZ2dsZSIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9