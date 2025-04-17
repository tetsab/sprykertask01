"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-configurable-bundle-template"],{

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/slot-products-table.js":
/*!**************************************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/slot-products-table.js ***!
  \**************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var config = {
  slotTableColumnsMapping: {
    idSlot: 0,
    slotName: 1
  }
};
var isInitialDraw = true,
  selectedIdSlot = 0,
  $slotTableWrapper = $('#slot-table-wrapper'),
  $slotProductsTableWrapper = $('#slot-products-table-wrapper'),
  $slotProductsTableName = $('#slot-products-table-name');
function init() {
  addSlotTableRowClickHandler();
  addSlotTableDrawHandler();
}
function addSlotTableRowClickHandler() {
  var $slotTable = $slotTableWrapper.find('.dataTables_scrollBody table').first().DataTable();
  $slotTable.on('click', 'tbody > tr', function () {
    updateSlotProductsTable(this, $slotTable);
  });
}
function addSlotTableDrawHandler() {
  var $slotTable = $slotTableWrapper.find('.dataTables_scrollBody table').first().DataTable();
  $slotTable.on('draw', function () {
    var $rows = $(this).find('tbody > tr');
    if (isInitialDraw) {
      performInitialDraw($slotTable, $rows);
    }
    $.each($rows, function (index, row) {
      if ($slotTable.row(row).data()[config.slotTableColumnsMapping.idSlot] === selectedIdSlot) {
        markSelectedRow($(row));
      }
    });
  });
}
function loadSlotProductsTable() {
  var $slotProductsTable = $slotProductsTableWrapper.find('.dataTables_scrollBody table').first(),
    slotProductsTableLoadUrl = '/configurable-bundle-gui/template/slot-products-table?id-configurable-bundle-template-slot=';
  $slotProductsTable.DataTable().ajax.url(slotProductsTableLoadUrl + selectedIdSlot).load();
}
function markSelectedRow($row) {
  $row.siblings().removeClass('selected');
  $row.addClass('selected');
}
function getInitialSelectedIdSlot() {
  var selectedIdSlot = $('#selected-id-configurable-bundle-template-slot').val();
  return selectedIdSlot.length ? parseInt(selectedIdSlot) : 0;
}
function performInitialDraw($slotTable, $rows) {
  isInitialDraw = false;
  $slotProductsTableWrapper.removeClass('hidden');
  if (!$rows.length) {
    return;
  }
  var initialSelectedIdSlot = getInitialSelectedIdSlot();
  if (!initialSelectedIdSlot) {
    updateSlotProductsTable($rows.first(), $slotTable);
    return;
  }
  $.each($rows, function (index, row) {
    if ($slotTable.row(row).data()[config.slotTableColumnsMapping.idSlot] === initialSelectedIdSlot) {
      updateSlotProductsTable(row, $slotTable);
    }
  });
}
function updateSlotProductsTable(row, $slotTable) {
  var rowData = $slotTable.row(row).data();
  var idSlot = rowData[config.slotTableColumnsMapping.idSlot];
  if (idSlot === selectedIdSlot) {
    return;
  }
  selectedIdSlot = idSlot;
  loadSlotProductsTable();
  markSelectedRow($(row));
  $slotProductsTableName.text(rowData[config.slotTableColumnsMapping.slotName]);
}
module.exports = {
  init: init
};

/***/ }),

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/template-edit.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/template-edit.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var slotProductsTable = __webpack_require__(/*! ./slot-products-table */ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/slot-products-table.js");
var $selectedForm = null;
$(document).ready(function () {
  slotProductsTable.init();
  $('#slot-table-wrapper').on('submit', 'form[name="delete_form"]', slotDeleteButtonHandler);
  $('.js-btn-confirm').on('click', deleteConfirmButtonHandler);
  $('.js-btn-cancel').on('click', deleteCancelButtonHandler);
});

/**
 * @param event
 *
 * @return {void}
 */
function slotDeleteButtonHandler(event) {
  event.preventDefault();
  $('#slot-delete-confirmation-modal').modal('show');
  $selectedForm = event.target;
}

/**
 * @return {void}
 */
function deleteConfirmButtonHandler() {
  if ($selectedForm) {
    $selectedForm.submit();
  }
}

/**
 * @return {void}
 */
function deleteCancelButtonHandler() {
  if (!$selectedForm) {
    return;
  }
  $($selectedForm).find('button[type="submit"]').prop('disabled', false).removeClass('disabled');
}

/***/ }),

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template.entry.js":
/*!****************************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template.entry.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/configurable-bundle-template/template-edit */ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template/template-edit.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jb25maWd1cmFibGUtYnVuZGxlLXRlbXBsYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxNQUFNLEdBQUc7RUFDVEMsdUJBQXVCLEVBQUU7SUFDckJDLE1BQU0sRUFBRSxDQUFDO0lBQ1RDLFFBQVEsRUFBRTtFQUNkO0FBQ0osQ0FBQztBQUVELElBQUlDLGFBQWEsR0FBRyxJQUFJO0VBQ3BCQyxjQUFjLEdBQUcsQ0FBQztFQUNsQkMsaUJBQWlCLEdBQUdDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQztFQUM1Q0MseUJBQXlCLEdBQUdELENBQUMsQ0FBQyw4QkFBOEIsQ0FBQztFQUM3REUsc0JBQXNCLEdBQUdGLENBQUMsQ0FBQywyQkFBMkIsQ0FBQztBQUUzRCxTQUFTRyxJQUFJQSxDQUFBLEVBQUc7RUFDWkMsMkJBQTJCLENBQUMsQ0FBQztFQUM3QkMsdUJBQXVCLENBQUMsQ0FBQztBQUM3QjtBQUVBLFNBQVNELDJCQUEyQkEsQ0FBQSxFQUFHO0VBQ25DLElBQUlFLFVBQVUsR0FBR1AsaUJBQWlCLENBQUNRLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUUzRkgsVUFBVSxDQUFDSSxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxZQUFZO0lBQzdDQyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUVMLFVBQVUsQ0FBQztFQUM3QyxDQUFDLENBQUM7QUFDTjtBQUVBLFNBQVNELHVCQUF1QkEsQ0FBQSxFQUFHO0VBQy9CLElBQUlDLFVBQVUsR0FBR1AsaUJBQWlCLENBQUNRLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUUzRkgsVUFBVSxDQUFDSSxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQVk7SUFDOUIsSUFBSUUsS0FBSyxH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QUNVLE1BQU0sQ0FBQyxDQUFDO0VBQzFCO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0wseUJBQXlCQSxDQUFBLEVBQUc7RUFDakMsSUFBSSxDQUFDTCxhQUFhLEVBQUU7SUFDaEI7RUFDSjtFQUVBeEMsQ0FBQyxDQUFDd0MsYUFBYSxDQUFDLENBQUNqQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQzRDLElBQUksQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUN4QixXQUFXLENBQUMsVUFBVSxDQUFDO0FBQ2xHOzs7Ozs7Ozs7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViWSxtQkFBTyxDQUFDLDBLQUFzRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29uZmlndXJhYmxlLWJ1bmRsZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2NvbmZpZ3VyYWJsZS1idW5kbGUtdGVtcGxhdGUvc2xvdC1wcm9kdWN0cy10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb25maWd1cmFibGUtYnVuZGxlLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvY29uZmlndXJhYmxlLWJ1bmRsZS10ZW1wbGF0ZS90ZW1wbGF0ZS1lZGl0LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NvbmZpZ3VyYWJsZS1idW5kbGUtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtY29uZmlndXJhYmxlLWJ1bmRsZS10ZW1wbGF0ZS5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb25maWcgPSB7XG4gICAgc2xvdFRhYmxlQ29sdW1uc01hcHBpbmc6IHtcbiAgICAgICAgaWRTbG90OiAwLFxuICAgICAgICBzbG90TmFtZTogMSxcbiAgICB9LFxufTtcblxudmFyIGlzSW5pdGlhbERyYXcgPSB0cnVlLFxuICAgIHNlbGVjdGVkSWRTbG90ID0gMCxcbiAgICAkc2xvdFRhYmxlV3JhcHBlciA9ICQoJyNzbG90LXRhYmxlLXdyYXBwZXInKSxcbiAgICAkc2xvdFByb2R1Y3RzVGFibGVXcmFwcGVyID0gJCgnI3Nsb3QtcHJvZHVjdHMtdGFibGUtd3JhcHBlcicpLFxuICAgICRzbG90UHJvZHVjdHNUYWJsZU5hbWUgPSAkKCcjc2xvdC1wcm9kdWN0cy10YWJsZS1uYW1lJyk7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgYWRkU2xvdFRhYmxlUm93Q2xpY2tIYW5kbGVyKCk7XG4gICAgYWRkU2xvdFRhYmxlRHJhd0hhbmRsZXIoKTtcbn1cblxuZnVuY3Rpb24gYWRkU2xvdFRhYmxlUm93Q2xpY2tIYW5kbGVyKCkge1xuICAgIHZhciAkc2xvdFRhYmxlID0gJHNsb3RUYWJsZVdyYXBwZXIuZmluZCgnLmRhdGFUYWJsZXNfc2Nyb2xsQm9keSB0YWJsZScpLmZpcnN0KCkuRGF0YVRhYmxlKCk7XG5cbiAgICAkc2xvdFRhYmxlLm9uKCdjbGljaycsICd0Ym9keSA+IHRyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB1cGRhdGVTbG90UHJvZHVjdHNUYWJsZSh0aGlzLCAkc2xvdFRhYmxlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkU2xvdFRhYmxlRHJhd0hhbmRsZXIoKSB7XG4gICAgdmFyICRzbG90VGFibGUgPSAkc2xvdFRhYmxlV3JhcHBlci5maW5kKCcuZGF0YVRhYmxlc19zY3JvbGxCb2R5IHRhYmxlJykuZmlyc3QoKS5EYXRhVGFibGUoKTtcblxuICAgICRzbG90VGFibGUub24oJ2RyYXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciAkcm93cyA9ICQodGhpcykuZmluZCgndGJvZHkgPiB0cicpO1xuXG4gICAgICAgIGlmIChpc0luaXRpYWxEcmF3KSB7XG4gICAgICAgICAgICBwZXJmb3JtSW5pdGlhbERyYXcoJHNsb3RUYWJsZSwgJHJvd3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgJC5lYWNoKCRyb3dzLCBmdW5jdGlvbiAoaW5kZXgsIHJvdykge1xuICAgICAgICAgICAgaWYgKCRzbG90VGFibGUucm93KHJvdykuZGF0YSgpW2NvbmZpZy5zbG90VGFibGVDb2x1bW5zTWFwcGluZy5pZFNsb3RdID09PSBzZWxlY3RlZElkU2xvdCkge1xuICAgICAgICAgICAgICAgIG1hcmtTZWxlY3RlZFJvdygkKHJvdykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFNsb3RQcm9kdWN0c1RhYmxlKCkge1xuICAgIHZhciAkc2xvdFByb2R1Y3RzVGFibGUgPSAkc2xvdFByb2R1Y3RzVGFibGVXcmFwcGVyLmZpbmQoJy5kYXRhVGFibGVzX3Njcm9sbEJvZHkgdGFibGUnKS5maXJzdCgpLFxuICAgICAgICBzbG90UHJvZHVjdHNUYWJsZUxvYWRVcmwgPVxuICAgICAgICAgICAgJy9jb25maWd1cmFibGUtYnVuZGxlLWd1aS90ZW1wbGF0ZS9zbG90LXByb2R1Y3RzLXRhYmxlP2lkLWNvbmZpZ3VyYWJsZS1idW5kbGUtdGVtcGxhdGUtc2xvdD0nO1xuXG4gICAgJHNsb3RQcm9kdWN0c1RhYmxlXG4gICAgICAgIC5EYXRhVGFibGUoKVxuICAgICAgICAuYWpheC51cmwoc2xvdFByb2R1Y3RzVGFibGVMb2FkVXJsICsgc2VsZWN0ZWRJZFNsb3QpXG4gICAgICAgIC5sb2FkKCk7XG59XG5cbmZ1bmN0aW9uIG1hcmtTZWxlY3RlZFJvdygkcm93KSB7XG4gICAgJHJvdy5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICRyb3cuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG59XG5cbmZ1bmN0aW9uIGdldEluaXRpYWxTZWxlY3RlZElkU2xvdCgpIHtcbiAgICB2YXIgc2VsZWN0ZWRJZFNsb3QgPSAkKCcjc2VsZWN0ZWQtaWQtY29uZmlndXJhYmxlLWJ1bmRsZS10ZW1wbGF0ZS1zbG90JykudmFsKCk7XG5cbiAgICByZXR1cm4gc2VsZWN0ZWRJZFNsb3QubGVuZ3RoID8gcGFyc2VJbnQoc2VsZWN0ZWRJZFNsb3QpIDogMDtcbn1cblxuZnVuY3Rpb24gcGVyZm9ybUluaXRpYWxEcmF3KCRzbG90VGFibGUsICRyb3dzKSB7XG4gICAgaXNJbml0aWFsRHJhdyA9IGZhbHNlO1xuICAgICRzbG90UHJvZHVjdHNUYWJsZVdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgaWYgKCEkcm93cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBpbml0aWFsU2VsZWN0ZWRJZFNsb3QgPSBnZXRJbml0aWFsU2VsZWN0ZWRJZFNsb3QoKTtcblxuICAgIGlmICghaW5pdGlhbFNlbGVjdGVkSWRTbG90KSB7XG4gICAgICAgIHVwZGF0ZVNsb3RQcm9kdWN0c1RhYmxlKCRyb3dzLmZpcnN0KCksICRzbG90VGFibGUpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkLmVhY2goJHJvd3MsIGZ1bmN0aW9uIChpbmRleCwgcm93KSB7XG4gICAgICAgIGlmICgkc2xvdFRhYmxlLnJvdyhyb3cpLmRhdGEoKVtjb25maWcuc2xvdFRhYmxlQ29sdW1uc01hcHBpbmcuaWRTbG90XSA9PT0gaW5pdGlhbFNlbGVjdGVkSWRTbG90KSB7XG4gICAgICAgICAgICB1cGRhdGVTbG90UHJvZHVjdHNUYWJsZShyb3csICRzbG90VGFibGUpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNsb3RQcm9kdWN0c1RhYmxlKHJvdywgJHNsb3RUYWJsZSkge1xuICAgIHZhciByb3dEYXRhID0gJHNsb3RUYWJsZS5yb3cocm93KS5kYXRhKCk7XG4gICAgdmFyIGlkU2xvdCA9IHJvd0RhdGFbY29uZmlnLnNsb3RUYWJsZUNvbHVtbnNNYXBwaW5nLmlkU2xvdF07XG5cbiAgICBpZiAoaWRTbG90ID09PSBzZWxlY3RlZElkU2xvdCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2VsZWN0ZWRJZFNsb3QgPSBpZFNsb3Q7XG4gICAgbG9hZFNsb3RQcm9kdWN0c1RhYmxlKCk7XG4gICAgbWFya1NlbGVjdGVkUm93KCQocm93KSk7XG4gICAgJHNsb3RQcm9kdWN0c1RhYmxlTmFtZS50ZXh0KHJvd0RhdGFbY29uZmlnLnNsb3RUYWJsZUNvbHVtbnNNYXBwaW5nLnNsb3ROYW1lXSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXQ6IGluaXQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xvdFByb2R1Y3RzVGFibGUgPSByZXF1aXJlKCcuL3Nsb3QtcHJvZHVjdHMtdGFibGUnKTtcbnZhciAkc2VsZWN0ZWRGb3JtID0gbnVsbDtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHNsb3RQcm9kdWN0c1RhYmxlLmluaXQoKTtcbiAgICAkKCcjc2xvdC10YWJsZS13cmFwcGVyJykub24oJ3N1Ym1pdCcsICdmb3JtW25hbWU9XCJkZWxldGVfZm9ybVwiXScsIHNsb3REZWxldGVCdXR0b25IYW5kbGVyKTtcbiAgICAkKCcuanMtYnRuLWNvbmZpcm0nKS5vbignY2xpY2snLCBkZWxldGVDb25maXJtQnV0dG9uSGFuZGxlcik7XG4gICAgJCgnLmpzLWJ0bi1jYW5jZWwnKS5vbignY2xpY2snLCBkZWxldGVDYW5jZWxCdXR0b25IYW5kbGVyKTtcbn0pO1xuXG4vKipcbiAqIEBwYXJhbSBldmVudFxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHNsb3REZWxldGVCdXR0b25IYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAkKCcjc2xvdC1kZWxldGUtY29uZmlybWF0aW9uLW1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAkc2VsZWN0ZWRGb3JtID0gZXZlbnQudGFyZ2V0O1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUNvbmZpcm1CdXR0b25IYW5kbGVyKCkge1xuICAgIGlmICgkc2VsZWN0ZWRGb3JtKSB7XG4gICAgICAgICRzZWxlY3RlZEZvcm0uc3VibWl0KCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUNhbmNlbEJ1dHRvbkhhbmRsZXIoKSB7XG4gICAgaWYgKCEkc2VsZWN0ZWRGb3JtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAkKCRzZWxlY3RlZEZvcm0pLmZpbmQoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9jb25maWd1cmFibGUtYnVuZGxlLXRlbXBsYXRlL3RlbXBsYXRlLWVkaXQnKTtcbiJdLCJuYW1lcyI6WyJjb25maWciLCJzbG90VGFibGVDb2x1bW5zTWFwcGluZyIsImlkU2xvdCIsInNsb3ROYW1lIiwiaXNJbml0aWFsRHJhdyIsInNlbGVjdGVkSWRTbG90IiwiJHNsb3RUYWJsZVdyYXBwZXIiLCIkIiwiJHNsb3RQcm9kdWN0c1RhYmxlV3JhcHBlciIsIiRzbG90UHJvZHVjdHNUYWJsZU5hbWUiLCJpbml0IiwiYWRkU2xvdFRhYmxlUm93Q2xpY2tIYW5kbGVyIiwiYWRkU2xvdFRhYmxlRHJhd0hhbmRsZXIiLCIkc2xvdFRhYmxlIiwiZmluZCIsImZpcnN0IiwiRGF0YVRhYmxlIiwib24iLCJ1cGRhdGVTbG90UHJvZHVjdHNUYWJsZSIsIiRyb3dzIiwicGVyZm9ybUluaXRpYWxEcmF3IiwiZWFjaCIsImluZGV4Iiwicm93IiwiZGF0YSIsIm1hcmtTZWxlY3RlZFJvdyIsImxvYWRTbG90UHJvZHVjdHNUYWJsZSIsIiRzbG90UHJvZHVjdHNUYWJsZSIsInNsb3RQcm9kdWN0c1RhYmxlTG9hZFVybCIsImFqYXgiLCJ1cmwiLCJsb2FkIiwiJHJvdyIsInNpYmxpbmdzIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImdldEluaXRpYWxTZWxlY3RlZElkU2xvdCIsInZhbCIsImxlbmd0aCIsInBhcnNlSW50IiwiaW5pdGlhbFNlbGVjdGVkSWRTbG90Iiwicm93RGF0YSIsInRleHQiLCJtb2R1bGUiLCJleHBvcnRzIiwic2xvdFByb2R1Y3RzVGFibGUiLCJyZXF1aXJlIiwiJHNlbGVjdGVkRm9ybSIsImRvY3VtZW50IiwicmVhZHkiLCJzbG90RGVsZXRlQnV0dG9uSGFuZGxlciIsImRlbGV0ZUNvbmZpcm1CdXR0b25IYW5kbGVyIiwiZGVsZXRlQ2FuY2VsQnV0dG9uSGFuZGxlciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJtb2RhbCIsInRhcmdldCIsInN1Ym1pdCIsInByb3AiXSwic291cmNlUm9vdCI6IiJ9