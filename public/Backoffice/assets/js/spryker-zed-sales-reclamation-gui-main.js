"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-sales-reclamation-gui-main"],{

/***/ "./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/logic.js":
/*!*****************************************************************************!*\
  !*** ./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/logic.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


function getSelectedItems(idOrderItem) {
  var selectedItems = [];
  if (parseInt(idOrderItem) > 0) {
    selectedItems.push(idOrderItem);
    return selectedItems;
  }
  $('.item-check').each(function () {
    if ($(this).prop('checked') === true) {
      selectedItems.push($(this).val());
    }
  });
  return selectedItems;
}

/**
 * @deprecated not used any more
 */
function createTriggerUrl(idOrder, idReclamation, eventName) {
  var url = '/oms/trigger/trigger-event-for-order';
  var parameters = {
    event: eventName,
    'id-sales-order': idOrder,
    redirect: '/sales-reclamation-gui/detail?id-reclamation=' + idReclamation
  };
  parameters.items = getSelectedItems();
  if (!isSpecificItemsSelected(parameters)) {
    parameters = expandParametersWithClaimedOrderItems(parameters);
  }
  var finalUrl = url + '?' + $.param(parameters);
  return decodeURIComponent(finalUrl);
}
function isSpecificItemsSelected(parameters) {
  return parameters.items.length > 0;
}
function expandParametersWithClaimedOrderItems(parameters) {
  $('.item-check').each(function () {
    parameters.items.push($(this).val());
  });
  return parameters;
}

/**
 * @deprecated not used any more
 */
function createTriggerItemUrl(idOrder, idOrderItem, idReclamation, eventName) {
  var url = '/oms/trigger/trigger-event-for-order-items';
  var parameters = {
    event: eventName,
    'id-sales-order-item': idOrderItem,
    redirect: '/sales-reclamation-gui/detail?id-reclamation=' + idReclamation
  };
  parameters.items = getSelectedItems();
  var finalUrl = url + '?' + $.param(parameters);
  return decodeURIComponent(finalUrl);
}
function disableTrigger($item) {
  $item.prop('disabled', true).addClass('disabled');
}
$(document).ready(function () {
  $('.trigger-event').click(function (e) {
    e.preventDefault();
    $(this).prop('disabled', true).addClass('disabled');
    var $form = $(this).closest('form');
    var formAction = $form.attr('action');
    var finalUrl = formAction + '&' + $.param({
      items: getSelectedItems()
    });
    $form.attr('action', finalUrl);
    $(this).parents('form').first().submit();
  });
  $('.item-check').click(function () {
    var countChecked = $(".item-check[type='checkbox']:checked").length;
    var totalCheckboxItems = $('.item-check').length;
    if (totalCheckboxItems === countChecked) {
      $('#check-all-orders').prop('checked', true);
      return true;
    }
    $('#check-all-orders').prop('checked', false);
    return true;
  });
  $('#check-all-orders').click(function () {
    if ($(this).prop('checked') === true) {
      var checked = true;
    } else {
      var checked = false;
    }
    $('.item-check').each(function () {
      $(this).prop('checked', checked);
    });
  });
});

/***/ }),

/***/ "./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/main.js":
/*!****************************************************************************!*\
  !*** ./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/main.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./logic */ "./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/logic.js");
__webpack_require__(/*! ../../scss/main.scss */ "./vendor/spryker/sales-reclamation-gui/assets/Zed/scss/main.scss");

/***/ }),

/***/ "./vendor/spryker/sales-reclamation-gui/assets/Zed/js/spryker-zed-sales-reclamation-gui-main.entry.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/spryker/sales-reclamation-gui/assets/Zed/js/spryker-zed-sales-reclamation-gui-main.entry.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/sales-reclamation-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/sales-reclamation-gui/assets/Zed/scss/main.scss":
/*!************************************************************************!*\
  !*** ./vendor/spryker/sales-reclamation-gui/assets/Zed/scss/main.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/sales-reclamation-gui/assets/Zed/js/spryker-zed-sales-reclamation-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zYWxlcy1yZWNsYW1hdGlvbi1ndWktbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWIsU0FBU0EsZ0JBQWdCQSxDQUFDQyxXQUFXLEVBQUU7RUFDbkMsSUFBSUMsYUFBYSxHQUFHLEVBQUU7RUFFdEIsSUFBSUMsUUFBUSxDQUFDRixXQUFXLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDM0JDLGFBQWEsQ0FBQ0UsSUFBSSxDQUFDSCxXQUFXLENBQUM7SUFFL0IsT0FBT0MsYUFBYTtFQUN4QjtFQUVBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNDLElBQUksQ0FBQyxZQUFZO0lBQzlCLElBQUlELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtNQUNsQ0wsYUFBYSxDQUFDRSxJQUFJLENBQUNDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ0csR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQztFQUNKLENBQUMsQ0FBQztFQUVGLE9BQU9OLGFBQWE7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU08sZ0JBQWdCQSxDQUFDQyxPQUFPLEVBQUVDLGFBQWEsRUFBRUMsU0FBUyxFQUFFO0VBQ3pELElBQUlDLEdBQUcsR0FBRyxzQ0FBc0M7RUFDaEQsSUFBSUMsVUFBVSxHQUFHO0lBQ2JDLEtBQUssRUFBRUgsU0FBUztJQUNoQixnQkFBZ0IsRUFBRUYsT0FBTztJQUN6Qk0sUUFBUSxFQUFFLCtDQUErQyxHQUFHTDtFQUNoRSxDQUFDO0VBRURHLFVBQVUsQ0FBQ0csS0FBSyxHQUFHakIsZ0JBQWdCLENBQUMsQ0FBQztFQUVyQyxJQUFJLENBQUNrQix1QkFBdUIsQ0FBQ0osVUFBVSxDQUFDLEVBQUU7SUFDdENBLFVBQVUsR0FBR0sscUNBQXFDLENBQUNMLFVBQVUsQ0FBQztFQUNsRTtFQUVBLElBQUlNLFFBQVEsR0FBR1AsR0FBRyxHQUFHLEdBQUcsR0FBR1Is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SUFFQUYsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUNFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO0lBRTdDLE9BQU8sSUFBSTtFQUNmLENBQUMsQ0FBQztFQUVGRixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQ3lCLEtBQUssQ0FBQyxZQUFZO0lBQ3JDLElBQUl6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLEVBQUU7TUFDbEMsSUFBSW1DLE9BQU8sR0FBRyxJQUFJO0lBQ3RCLENBQUMsTUFBTTtNQUNILElBQUlBLE9BQU8sR0FBRyxLQUFLO0lBQ3ZCO0lBRUFyQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNDLElBQUksQ0FBQyxZQUFZO01BQzlCRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNFLElBQUksQ0FBQyxTQUFTLEVBQUVtQyxPQUFPLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FDckhXOztBQUViQyxtQkFBTyxDQUFDLHNGQUFTLENBQUM7QUFDbEJBLG1CQUFPLENBQUMsOEZBQXNCLENBQUM7Ozs7Ozs7Ozs7QUNIbEI7O0FBRWJBLG1CQUFPLENBQUMsNEZBQWdCLENBQUM7Ozs7Ozs7Ozs7O0FDRnpCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtcmVjbGFtYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9zYWxlcy1yZWNsYW1hdGlvbi1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtcmVjbGFtYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtc2FsZXMtcmVjbGFtYXRpb24tZ3VpLW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc2FsZXMtcmVjbGFtYXRpb24tZ3VpL2Fzc2V0cy9aZWQvc2Nzcy9tYWluLnNjc3M/NzM0NiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGVkSXRlbXMoaWRPcmRlckl0ZW0pIHtcbiAgICB2YXIgc2VsZWN0ZWRJdGVtcyA9IFtdO1xuXG4gICAgaWYgKHBhcnNlSW50KGlkT3JkZXJJdGVtKSA+IDApIHtcbiAgICAgICAgc2VsZWN0ZWRJdGVtcy5wdXNoKGlkT3JkZXJJdGVtKTtcblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICB9XG5cbiAgICAkKCcuaXRlbS1jaGVjaycpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5wcm9wKCdjaGVja2VkJykgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHNlbGVjdGVkSXRlbXM7XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgbm90IHVzZWQgYW55IG1vcmVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlVHJpZ2dlclVybChpZE9yZGVyLCBpZFJlY2xhbWF0aW9uLCBldmVudE5hbWUpIHtcbiAgICB2YXIgdXJsID0gJy9vbXMvdHJpZ2dlci90cmlnZ2VyLWV2ZW50LWZvci1vcmRlcic7XG4gICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGV2ZW50OiBldmVudE5hbWUsXG4gICAgICAgICdpZC1zYWxlcy1vcmRlcic6IGlkT3JkZXIsXG4gICAgICAgIHJlZGlyZWN0OiAnL3NhbGVzLXJlY2xhbWF0aW9uLWd1aS9kZXRhaWw/aWQtcmVjbGFtYXRpb249JyArIGlkUmVjbGFtYXRpb24sXG4gICAgfTtcblxuICAgIHBhcmFtZXRlcnMuaXRlbXMgPSBnZXRTZWxlY3RlZEl0ZW1zKCk7XG5cbiAgICBpZiAoIWlzU3BlY2lmaWNJdGVtc1NlbGVjdGVkKHBhcmFtZXRlcnMpKSB7XG4gICAgICAgIHBhcmFtZXRlcnMgPSBleHBhbmRQYXJhbWV0ZXJzV2l0aENsYWltZWRPcmRlckl0ZW1zKHBhcmFtZXRlcnMpO1xuICAgIH1cblxuICAgIHZhciBmaW5hbFVybCA9IHVybCArICc/JyArICQucGFyYW0ocGFyYW1ldGVycyk7XG5cbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGZpbmFsVXJsKTtcbn1cblxuZnVuY3Rpb24gaXNTcGVjaWZpY0l0ZW1zU2VsZWN0ZWQocGFyYW1ldGVycykge1xuICAgIHJldHVybiBwYXJhbWV0ZXJzLml0ZW1zLmxlbmd0aCA+IDA7XG59XG5cbmZ1bmN0aW9uIGV4cGFuZFBhcmFtZXRlcnNXaXRoQ2xhaW1lZE9yZGVySXRlbXMocGFyYW1ldGVycykge1xuICAgICQoJy5pdGVtLWNoZWNrJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcmFtZXRlcnMuaXRlbXMucHVzaCgkKHRoaXMpLnZhbCgpKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXJhbWV0ZXJzO1xufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIG5vdCB1c2VkIGFueSBtb3JlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVRyaWdnZXJJdGVtVXJsKGlkT3JkZXIsIGlkT3JkZXJJdGVtLCBpZFJlY2xhbWF0aW9uLCBldmVudE5hbWUpIHtcbiAgICB2YXIgdXJsID0gJy9vbXMvdHJpZ2dlci90cmlnZ2VyLWV2ZW50LWZvci1vcmRlci1pdGVtcyc7XG4gICAgdmFyIHBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGV2ZW50OiBldmVudE5hbWUsXG4gICAgICAgICdpZC1zYWxlcy1vcmRlci1pdGVtJzogaWRPcmRlckl0ZW0sXG4gICAgICAgIHJlZGlyZWN0OiAnL3NhbGVzLXJlY2xhbWF0aW9uLWd1aS9kZXRhaWw/aWQtcmVjbGFtYXRpb249JyArIGlkUmVjbGFtYXRpb24sXG4gICAgfTtcblxuICAgIHBhcmFtZXRlcnMuaXRlbXMgPSBnZXRTZWxlY3RlZEl0ZW1zKCk7XG5cbiAgICB2YXIgZmluYWxVcmwgPSB1cmwgKyAnPycgKyAkLnBhcmFtKHBhcmFtZXRlcnMpO1xuXG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChmaW5hbFVybCk7XG59XG5cbmZ1bmN0aW9uIGRpc2FibGVUcmlnZ2VyKCRpdGVtKSB7XG4gICAgJGl0ZW0ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbn1cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgICQoJy50cmlnZ2VyLWV2ZW50JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICQodGhpcykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgICAgICB2YXIgJGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIGZvcm1BY3Rpb24gPSAkZm9ybS5hdHRyKCdhY3Rpb24nKTtcbiAgICAgICAgdmFyIGZpbmFsVXJsID0gZm9ybUFjdGlvbiArICcmJyArICQucGFyYW0oeyBpdGVtczogZ2V0U2VsZWN0ZWRJdGVtcygpIH0pO1xuXG4gICAgICAgICRmb3JtLmF0dHIoJ2FjdGlvbicsIGZpbmFsVXJsKTtcblxuICAgICAgICAkKHRoaXMpLnBhcmVudHMoJ2Zvcm0nKS5maXJzdCgpLnN1Ym1pdCgpO1xuICAgIH0pO1xuXG4gICAgJCgnLml0ZW0tY2hlY2snKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3VudENoZWNrZWQgPSAkKFwiLml0ZW0tY2hlY2tbdHlwZT0nY2hlY2tib3gnXTpjaGVja2VkXCIpLmxlbmd0aDtcbiAgICAgICAgdmFyIHRvdGFsQ2hlY2tib3hJdGVtcyA9ICQoJy5pdGVtLWNoZWNrJykubGVuZ3RoO1xuXG4gICAgICAgIGlmICh0b3RhbENoZWNrYm94SXRlbXMgPT09IGNvdW50Q2hlY2tlZCkge1xuICAgICAgICAgICAgJCgnI2NoZWNrLWFsbC1vcmRlcnMnKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgJCgnI2NoZWNrLWFsbC1vcmRlcnMnKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgJCgnI2NoZWNrLWFsbC1vcmRlcnMnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2NoZWNrZWQnKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJy5pdGVtLWNoZWNrJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9sb2dpYycpO1xucmVxdWlyZSgnLi4vLi4vc2Nzcy9tYWluLnNjc3MnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJnZXRTZWxlY3RlZEl0ZW1zIiwiaWRPcmRlckl0ZW0iLCJzZWxlY3RlZEl0ZW1zIiwicGFyc2VJbnQiLCJwdXNoIiwiJCIsImVhY2giLCJwcm9wIiwidmFsIiwiY3JlYXRlVHJpZ2dlclVybCIsImlkT3JkZXIiLCJpZFJlY2xhbWF0aW9uIiwiZXZlbnROYW1lIiwidXJsIiwicGFyYW1ldGVycyIsImV2ZW50IiwicmVkaXJlY3QiLCJpdGVtcyIsImlzU3BlY2lmaWNJdGVtc1NlbGVjdGVkIiwiZXhwYW5kUGFyYW1ldGVyc1dpdGhDbGFpbWVkT3JkZXJJdGVtcyIsImZpbmFsVXJsIiwicGFyYW0iLCJkZWNvZGVVUklDb21wb25lbnQiLCJsZW5ndGgiLCJjcmVhdGVUcmlnZ2VySXRlbVVybCIsImRpc2FibGVUcmlnZ2VyIiwiJGl0ZW0iLCJhZGRDbGFzcyIsImRvY3VtZW50IiwicmVhZHkiLCJjbGljayIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIiRmb3JtIiwiY2xvc2VzdCIsImZvcm1BY3Rpb24iLCJhdHRyIiwicGFyZW50cyIsImZpcnN0Iiwic3VibWl0IiwiY291bnRDaGVja2VkIiwidG90YWxDaGVja2JveEl0ZW1zIiwiY2hlY2tlZCIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9