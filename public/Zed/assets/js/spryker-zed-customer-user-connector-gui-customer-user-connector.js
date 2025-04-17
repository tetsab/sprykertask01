"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-customer-user-connector-gui-customer-user-connector"],{

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/assigned-customer-table.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/assigned-customer-table.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var RelatedCustomerTable = __webpack_require__(/*! ./related-customer-table/table */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table.js");
var sourceTabSelector = '#assigned-tab';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabSelector = '#deassigned-tab';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var checkboxSelector = '.js-customer-checkbox';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = RelatedCustomerTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, 'customerUserConnection_idCustomersToDeAssign', onRemove);
  tableHandler.getInitialCheckboxCheckedState = function () {
    return RelatedCustomerTable.CHECKBOX_CHECKED_STATE_CHECKED;
  };
  $(sourceTabSelector + ' .js-de-select-all-button a').on('click', tableHandler.deSelectAll);
}

/**
 * @returns {boolean}
 */
function onRemove() {
  var $link = $(this);
  var id = $link.data('id');
  var action = $link.data('action');
  var dataTable = $(destinationTableSelector).DataTable();
  dataTable.row($link.parents('tr')).remove().draw();
  tableHandler.getSelector().removeIdFromSelection(id);
  tableHandler.updateSelectedCustomersLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', true);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/available-customer-table.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/available-customer-table.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var RelatedCustomerTable = __webpack_require__(/*! ./related-customer-table/table */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table.js");
var sourceTabSelector = '#available-tab';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabSelector = '#to-be-assigned-tab';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var checkboxSelector = '.js-customer-checkbox';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = RelatedCustomerTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, 'customerUserConnection_idCustomersToAssign', onRemove);
  $(sourceTabSelector + ' .js-select-all-button a').on('click', tableHandler.selectAll);
}

/**
 * @return {boolean}
 */
function onRemove() {
  var $link = $(this);
  var id = $link.data('id');
  var action = $link.data('action');
  var dataTable = $(destinationTableSelector).DataTable();
  dataTable.row($link.parents('tr')).remove().draw();
  tableHandler.getSelector().removeIdFromSelection(id);
  tableHandler.updateSelectedCustomersLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', false);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/main.js":
/*!**********************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/main.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var availableCustomerTable = __webpack_require__(/*! ./available-customer-table */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/available-customer-table.js");
var assignedCustomerTable = __webpack_require__(/*! ./assigned-customer-table */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/assigned-customer-table.js");
$(document).ready(function () {
  availableCustomerTable.initialize();
  assignedCustomerTable.initialize();
});

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/customer-id-selector.js":
/*!*************************************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/customer-id-selector.js ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function CustomerIdSelector() {
  var selector = {};
  var selectedIds = {};
  var idKey = 'id';
  selector.addIdToSelection = function (id) {
    selectedIds[id] = id;
  };
  selector.removeIdFromSelection = function (id) {
    delete selectedIds[id];
  };
  selector.isIdSelected = function (id) {
    return selectedIds.hasOwnProperty(id);
  };
  selector.clearAllSelections = function () {
    selectedIds = {};
  };
  selector.addAllToSelection = function (data) {
    for (var i = 0; i < data.length; i++) {
      var id = data[i][idKey];
      selectedIds[id] = id;
    }
  };
  selector.getSelected = function () {
    return selectedIds;
  };
  return selector;
}
module.exports = {
  /**
   * @return {CustomerIdSelector}
   */
  create: function () {
    return new CustomerIdSelector();
  }
};

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table-handler.js":
/*!******************************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table-handler.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var CustomerIdSelector = __webpack_require__(/*! ./customer-id-selector */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/customer-id-selector.js");
var CHECKBOX_CHECKED_STATE_CHECKED = 'checked';
var CHECKBOX_CHECKED_STATE_UN_CHECKED = 'un_checked';

/**
 * @param {string} sourceTable
 * @param {string} destinationTable
 * @param {string} labelCaption
 * @param {string} labelId
 * @param {string} formFieldId
 * @param {function} onRemoveCallback
 *
 * @return {object}
 */
function TableHandler(sourceTable, destinationTable, labelCaption, labelId, formFieldId, onRemoveCallback) {
  var tableHandler = {
    labelId: labelId,
    labelCaption: labelCaption,
    formFieldId: formFieldId,
    sourceTable: sourceTable,
    destinationTable: destinationTable
  };
  var destinationTableIdSelector = CustomerIdSelector.create();
  tableHandler.toggleSelection = function () {
    $('input[type="checkbox"]', sourceTable).each(function (index, checkboxNode) {
      var $checkbox = $(checkboxNode);
      $checkbox.prop('checked', !$checkbox.prop('checked'));
      $checkbox.trigger('change');
    });
    return false;
  };
  tableHandler.selectAll = function () {
    $('input[type="checkbox"]', sourceTable).each(function (index, checkboxNode) {
      var $checkbox = $(checkboxNode);
      $checkbox.prop('checked', true);
      $checkbox.trigger('change');
    });
    return false;
  };
  tableHandler.deSelectAll = function () {
    $('input[type="checkbox"]', sourceTable).each(function (index, checkboxNode) {
      var $checkbox = $(checkboxNode);
      $checkbox.prop('checked', false);
      $checkbox.trigger('change');
    });
    return false;
  };
  tableHandler.addSelectedCustomer = function (idCustomer, firstname, lastname, gender) {
    idCustomer = parseInt(idCustomer, 10);
    if (destinationTableIdSelector.isIdSelected(idCustomer)) {
      return;
    }
    destinationTableIdSelector.addIdToSelection(idCustomer);
    var $removeLinkTextInput = $('#remove-link-text');
    destinationTable.DataTable().row.add([idCustomer, decodeURIComponent((firstname + '').replace(/\+/g, '%20')), decodeURIComponent((lastname + '').replace(/\+/g, '%20')), decodeURIComponent((gender + '').replace(/\+/g, '%20')), '<div><a data-id="' + idCustomer + '" href="#" class="btn btn-xs remove-item">' + ($removeLinkTextInput ? $removeLinkTextInput.val() : 'Remove') + '</a></div>']).draw();
    $('.remove-item').off('click');
    $('.remove-item').on('click', onRemoveCallback);
    tableHandler.updateSelectedCustomersLabelCount();
  };
  tableHandler.removeSelectedCustomer = function (idCustomer) {
    idCustomer = parseInt(idCustomer, 10);
    destinationTable.DataTable().rows().every(function (rowIndex, tableLoop, rowLoop) {
      if (!this.data()) {
        return;
      }
      var rowCustomerId = parseInt(this.data()[0], 10);
      if (idCustomer !== rowCustomerId) {
        return;
      }
      destinationTableIdSelector.removeIdFromSelection(idCustomer);
      this.remove();
      var $checkbox = $('input[value="' + idCustomer + '"]', sourceTable);
      tableHandler.unCheckCheckbox($checkbox);
    });
    destinationTable.DataTable().draw();
    tableHandler.updateSelectedCustomersLabelCount();
  };
  tableHandler.getSelector = function () {
    return destinationTableIdSelector;
  };
  tableHandler.updateSelectedCustomersLabelCount = function () {
    $(tableHandler.getLabelId()).text(labelCaption + ' (' + Object.keys(this.getSelector().getSelected()).length + ')');
    var customerIds = Object.keys(this.getSelector().getSelected());
    var s = customerIds.join(',');
    var field = $('#' + tableHandler.getFormFieldId());
    field.attr('value', s);
  };
  tableHandler.getLabelId = function () {
    return tableHandler.labelId;
  };
  tableHandler.getLabelCaption = function () {
    return tableHandler.labelCaption;
  };
  tableHandler.getFormFieldId = function () {
    return tableHandler.formFieldId;
  };
  tableHandler.getSourceTable = function () {
    return tableHandler.sourceTable;
  };
  tableHandler.getDestinationTable = function () {
    return tableHandler.destinationTable;
  };

  /**
   * @returns {string}
   */
  tableHandler.getInitialCheckboxCheckedState = function () {
    return CHECKBOX_CHECKED_STATE_UN_CHECKED;
  };

  /**
   * @param {jQuery} $checkbox
   * @return {boolean}
   */
  tableHandler.isCheckboxActive = function ($checkbox) {
    if (tableHandler.getInitialCheckboxCheckedState() === CHECKBOX_CHECKED_STATE_UN_CHECKED) {
      return $checkbox.prop('checked');
    }
    return !$checkbox.prop('checked');
  };

  /**
   * @param {jQuery} $checkbox
   */
  tableHandler.checkCheckbox = function ($checkbox) {
    var checkedState = tableHandler.getInitialCheckboxCheckedState() === CHECKBOX_CHECKED_STATE_UN_CHECKED;
    $checkbox.prop('checked', checkedState);
  };

  /**
   * @param {jQuery} $checkbox
   */
  tableHandler.unCheckCheckbox = function ($checkbox) {
    var checkedState = tableHandler.getInitialCheckboxCheckedState() !== CHECKBOX_CHECKED_STATE_UN_CHECKED;
    $checkbox.prop('checked', checkedState);
  };
  return tableHandler;
}
module.exports = {
  /**
   * @param {string} sourceTable
   * @param {string} destinationTable
   * @param {string} labelCaption
   * @param {string} labelId
   * @param {string} formFieldId
   * @param {function} onRemoveCallback
   *
   * @return {TableHandler}
   */
  create: function (sourceTable, destinationTable, labelCaption, labelId, formFieldId, onRemoveCallback) {
    return new TableHandler(sourceTable, destinationTable, labelCaption, labelId, formFieldId, onRemoveCallback);
  },
  CHECKBOX_CHECKED_STATE_CHECKED: CHECKBOX_CHECKED_STATE_CHECKED,
  CHECKBOX_CHECKED_STATE_UN_CHECKED: CHECKBOX_CHECKED_STATE_UN_CHECKED
};

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var TableHandler = __webpack_require__(/*! ./table-handler */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/related-customer-table/table-handler.js");

/**
 * @param {string} sourceTableSelector
 * @param {string} destinationTableSelector
 * @param {string} checkboxSelector
 * @param {string} labelCaption
 * @param {string} labelId
 * @param {string} formFieldId
 * @param {function} onRemoveCallback
 *
 * @return {TableHandler}
 */
function create(sourceTableSelector, destinationTableSelector, checkboxSelector, labelCaption, labelId, formFieldId, onRemoveCallback) {
  $(destinationTableSelector).DataTable({
    destroy: true
  });
  var tableHandler = TableHandler.create($(sourceTableSelector), $(destinationTableSelector), labelCaption, labelId, formFieldId, onRemoveCallback);
  $(sourceTableSelector).DataTable().on('draw', function (event, settings) {
    $(checkboxSelector, $(sourceTableSelector)).off('change');
    $(checkboxSelector, $(sourceTableSelector)).on('change', function () {
      var $checkbox = $(this);
      var info = $.parseJSON($checkbox.attr('data-info'));
      if (tableHandler.isCheckboxActive($checkbox)) {
        tableHandler.addSelectedCustomer(info.idCustomer, info.firstname, info.lastname, info.gender);
      } else {
        tableHandler.removeSelectedCustomer(info.idCustomer);
      }
    });
    for (var i = 0; i < settings.json.data.length; i++) {
      var customer = settings.json.data[i];
      var idCustomer = parseInt(customer[1], 10);
      var selector = tableHandler.getSelector();
      if (selector.isIdSelected(idCustomer)) {
        tableHandler.checkCheckbox($('input[value="' + idCustomer + '"]', $(sourceTableSelector)));
      }
    }
  });
  return tableHandler;
}
module.exports = {
  create: create,
  CHECKBOX_CHECKED_STATE_CHECKED: TableHandler.CHECKBOX_CHECKED_STATE_CHECKED,
  CHECKBOX_CHECKED_STATE_UN_CHECKED: TableHandler.CHECKBOX_CHECKED_STATE_UN_CHECKED
};

/***/ }),

/***/ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/spryker-zed-customer-user-connector-gui-customer-user-connector.entry.js":
/*!*******************************************************************************************************************************************!*\
  !*** ./vendor/spryker/customer-user-connector-gui/assets/Zed/js/spryker-zed-customer-user-connector-gui-customer-user-connector.entry.js ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/customer-user-connector-gui/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/customer-user-connector-gui/assets/Zed/js/spryker-zed-customer-user-connector-gui-customer-user-connector.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jdXN0b21lci11c2VyLWNvbm5lY3Rvci1ndWktY3VzdG9tZXItdXNlci1jb25uZWN0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlBLG9CQUFvQixHQUFHQyxtQkFBTyxDQUFDLDBJQUFnQyxDQUFDO0FBRXBFLElBQUlDLGlCQUFpQixHQUFHLGVBQWU7QUFDdkMsSUFBSUMsbUJBQW1CLEdBQUdELGlCQUFpQixHQUFHLGNBQWM7QUFFNUQsSUFBSUUsc0JBQXNCLEdBQUcsaUJBQWlCO0FBQzlDLElBQUlDLDJCQUEyQixHQUFHRCxzQkFBc0IsR0FBRyxRQUFRO0FBQ25FLElBQUlFLHdCQUF3QixHQUFHRixzQkFBc0IsR0FBRyxRQUFRO0FBRWhFLElBQUlHLGdCQUFnQixHQUFHLHVCQUF1QjtBQUM5QyxJQUFJQyxZQUFZOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxVQUFVQSxDQUFBLEVBQUc7RUFDbEJELFlBQVksR0FBR1Isb0JBQW9CLENBQUNVLE1BQU0sQ0FDdENQLG1CQUFtQixFQUNuQkcsd0JBQXdCLEVBQ3hCQyxnQkFBZ0IsRUFDaEJJLENBQUMsQ0FBQ04sMkJBQTJCLENBQUMsQ0FBQ08sSUFBSSxDQUFDLENBQUMsRUFDckNQLDJCQUEyQixFQUMzQiw4Q0FBOEMsRUFDOUNRLFFBQ0osQ0FBQztFQUVETCxZQUFZLENBQUNNLDhCQUE4QixHQUFHLFlBQVk7SUFDdEQsT0FBT2Qsb0JBQW9CLENBQUNlLDhCQUE4QjtFQUM5RCxDQUFDO0VBRURKLENBQUMsQ0FBQ1QsaUJBQWlCLEdBQUcsNkJBQTZCLENBQUMsQ0FBQ2MsRUFBRSxDQUFDLE9BQU8sRUFBRVIsWUFBWSxDQUFDUyxXQUFXLENBQUM7QUFDOUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBU0osUUFBUUEsQ0FBQSxFQUFHO0VBQ2hCLElBQUlLLEtBQUssR0FBR1AsQ0FBQyxDQUFDLElBQUksQ0FBQztF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LE1BQU0sQ0FBQ0MsT0FBTyxHQUFHO0VBQ2J2QixNQUFNLEVBQUVBLE1BQU07RUFDZEssOEJBQThCLEVBQUVxQyxZQUFZLENBQUNyQyw4QkFBOEI7RUFDM0VvQyxpQ0FBaUMsRUFBRUMsWUFBWSxDQUFDRDtBQUNwRCxDQUFDOzs7Ozs7Ozs7O0FDekVEO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUVibEQsbUJBQU8sQ0FBQyxrR0FBZ0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2N1c3RvbWVyLXVzZXItY29ubmVjdG9yLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWduZWQtY3VzdG9tZXItdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItdXNlci1jb25uZWN0b3ItZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9hdmFpbGFibGUtY3VzdG9tZXItdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItdXNlci1jb25uZWN0b3ItZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2N1c3RvbWVyLXVzZXItY29ubmVjdG9yLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvcmVsYXRlZC1jdXN0b21lci10YWJsZS9jdXN0b21lci1pZC1zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci11c2VyLWNvbm5lY3Rvci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3JlbGF0ZWQtY3VzdG9tZXItdGFibGUvdGFibGUtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci11c2VyLWNvbm5lY3Rvci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3JlbGF0ZWQtY3VzdG9tZXItdGFibGUvdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItdXNlci1jb25uZWN0b3ItZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtY3VzdG9tZXItdXNlci1jb25uZWN0b3ItZ3VpLWN1c3RvbWVyLXVzZXItY29ubmVjdG9yLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlbGF0ZWRDdXN0b21lclRhYmxlID0gcmVxdWlyZSgnLi9yZWxhdGVkLWN1c3RvbWVyLXRhYmxlL3RhYmxlJyk7XG5cbnZhciBzb3VyY2VUYWJTZWxlY3RvciA9ICcjYXNzaWduZWQtdGFiJztcbnZhciBzb3VyY2VUYWJsZVNlbGVjdG9yID0gc291cmNlVGFiU2VsZWN0b3IgKyAnIHRhYmxlLnRhYmxlJztcblxudmFyIGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgPSAnI2RlYXNzaWduZWQtdGFiJztcbnZhciBkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IgPSBkZXN0aW5hdGlvblRhYlNlbGVjdG9yICsgJy1sYWJlbCc7XG52YXIgZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yID0gZGVzdGluYXRpb25UYWJTZWxlY3RvciArICctdGFibGUnO1xuXG52YXIgY2hlY2tib3hTZWxlY3RvciA9ICcuanMtY3VzdG9tZXItY2hlY2tib3gnO1xudmFyIHRhYmxlSGFuZGxlcjtcblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHRhYmxlSGFuZGxlciA9IFJlbGF0ZWRDdXN0b21lclRhYmxlLmNyZWF0ZShcbiAgICAgICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICAgICAgZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICAkKGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvcikudGV4dCgpLFxuICAgICAgICBkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IsXG4gICAgICAgICdjdXN0b21lclVzZXJDb25uZWN0aW9uX2lkQ3VzdG9tZXJzVG9EZUFzc2lnbicsXG4gICAgICAgIG9uUmVtb3ZlLFxuICAgICk7XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmVsYXRlZEN1c3RvbWVyVGFibGUuQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEO1xuICAgIH07XG5cbiAgICAkKHNvdXJjZVRhYlNlbGVjdG9yICsgJyAuanMtZGUtc2VsZWN0LWFsbC1idXR0b24gYScpLm9uKCdjbGljaycsIHRhYmxlSGFuZGxlci5kZVNlbGVjdEFsbCk7XG59XG5cbi8qKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIG9uUmVtb3ZlKCkge1xuICAgIHZhciAkbGluayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gJGxpbmsuZGF0YSgnaWQnKTtcbiAgICB2YXIgYWN0aW9uID0gJGxpbmsuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICB2YXIgZGF0YVRhYmxlID0gJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpO1xuICAgIGRhdGFUYWJsZS5yb3coJGxpbmsucGFyZW50cygndHInKSkucmVtb3ZlKCkuZHJhdygpO1xuXG4gICAgdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yKCkucmVtb3ZlSWRGcm9tU2VsZWN0aW9uKGlkKTtcbiAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRDdXN0b21lcnNMYWJlbENvdW50KCk7XG4gICAgJCgnaW5wdXRbdmFsdWU9XCInICsgaWQgKyAnXCJdJywgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlbGF0ZWRDdXN0b21lclRhYmxlID0gcmVxdWlyZSgnLi9yZWxhdGVkLWN1c3RvbWVyLXRhYmxlL3RhYmxlJyk7XG5cbnZhciBzb3VyY2VUYWJTZWxlY3RvciA9ICcjYXZhaWxhYmxlLXRhYic7XG52YXIgc291cmNlVGFibGVTZWxlY3RvciA9IHNvdXJjZVRhYlNlbGVjdG9yICsgJyB0YWJsZS50YWJsZSc7XG5cbnZhciBkZXN0aW5hdGlvblRhYlNlbGVjdG9yID0gJyN0by1iZS1hc3NpZ25lZC10YWInO1xudmFyIGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciA9IGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgKyAnLWxhYmVsJztcbnZhciBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IgPSBkZXN0aW5hdGlvblRhYlNlbGVjdG9yICsgJy10YWJsZSc7XG5cbnZhciBjaGVja2JveFNlbGVjdG9yID0gJy5qcy1jdXN0b21lci1jaGVja2JveCc7XG52YXIgdGFibGVIYW5kbGVyO1xuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgdGFibGVIYW5kbGVyID0gUmVsYXRlZEN1c3RvbWVyVGFibGUuY3JlYXRlKFxuICAgICAgICBzb3VyY2VUYWJsZVNlbGVjdG9yLFxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IsXG4gICAgICAgIGNoZWNrYm94U2VsZWN0b3IsXG4gICAgICAgICQoZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yKS50ZXh0KCksXG4gICAgICAgIGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvcixcbiAgICAgICAgJ2N1c3RvbWVyVXNlckNvbm5lY3Rpb25faWRDdXN0b21lcnNUb0Fzc2lnbicsXG4gICAgICAgIG9uUmVtb3ZlLFxuICAgICk7XG5cbiAgICAkKHNvdXJjZVRhYlNlbGVjdG9yICsgJyAuanMtc2VsZWN0LWFsbC1idXR0b24gYScpLm9uKCdjbGljaycsIHRhYmxlSGFuZGxlci5zZWxlY3RBbGwpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIG9uUmVtb3ZlKCkge1xuICAgIHZhciAkbGluayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gJGxpbmsuZGF0YSgnaWQnKTtcbiAgICB2YXIgYWN0aW9uID0gJGxpbmsuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICB2YXIgZGF0YVRhYmxlID0gJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpO1xuICAgIGRhdGFUYWJsZS5yb3coJGxpbmsucGFyZW50cygndHInKSkucmVtb3ZlKCkuZHJhdygpO1xuXG4gICAgdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yKCkucmVtb3ZlSWRGcm9tU2VsZWN0aW9uKGlkKTtcbiAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRDdXN0b21lcnNMYWJlbENvdW50KCk7XG4gICAgJCgnaW5wdXRbdmFsdWU9XCInICsgaWQgKyAnXCJdJywgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhdmFpbGFibGVDdXN0b21lclRhYmxlID0gcmVxdWlyZSgnLi9hdmFpbGFibGUtY3VzdG9tZXItdGFibGUnKTtcbnZhciBhc3NpZ25lZEN1c3RvbWVyVGFibGUgPSByZXF1aXJlKCcuL2Fzc2lnbmVkLWN1c3RvbWVyLXRhYmxlJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBhdmFpbGFibGVDdXN0b21lclRhYmxlLmluaXRpYWxpemUoKTtcbiAgICBhc3NpZ25lZEN1c3RvbWVyVGFibGUuaW5pdGlhbGl6ZSgpO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIEN1c3RvbWVySWRTZWxlY3RvcigpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSB7fTtcbiAgICB2YXIgc2VsZWN0ZWRJZHMgPSB7fTtcbiAgICB2YXIgaWRLZXkgPSAnaWQnO1xuXG4gICAgc2VsZWN0b3IuYWRkSWRUb1NlbGVjdGlvbiA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBzZWxlY3RlZElkc1tpZF0gPSBpZDtcbiAgICB9O1xuXG4gICAgc2VsZWN0b3IucmVtb3ZlSWRGcm9tU2VsZWN0aW9uID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGRlbGV0ZSBzZWxlY3RlZElkc1tpZF07XG4gICAgfTtcblxuICAgIHNlbGVjdG9yLmlzSWRTZWxlY3RlZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJZHMuaGFzT3duUHJvcGVydHkoaWQpO1xuICAgIH07XG5cbiAgICBzZWxlY3Rvci5jbGVhckFsbFNlbGVjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGVjdGVkSWRzID0ge307XG4gICAgfTtcblxuICAgIHNlbGVjdG9yLmFkZEFsbFRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBkYXRhW2ldW2lkS2V5XTtcbiAgICAgICAgICAgIHNlbGVjdGVkSWRzW2lkXSA9IGlkO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHNlbGVjdG9yLmdldFNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJZHM7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxlY3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7Q3VzdG9tZXJJZFNlbGVjdG9yfVxuICAgICAqL1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEN1c3RvbWVySWRTZWxlY3RvcigpO1xuICAgIH0sXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ3VzdG9tZXJJZFNlbGVjdG9yID0gcmVxdWlyZSgnLi9jdXN0b21lci1pZC1zZWxlY3RvcicpO1xuXG52YXIgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEID0gJ2NoZWNrZWQnO1xudmFyIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCA9ICd1bl9jaGVja2VkJztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlVGFibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblRhYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxJZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZElkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gKlxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5mdW5jdGlvbiBUYWJsZUhhbmRsZXIoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spIHtcbiAgICB2YXIgdGFibGVIYW5kbGVyID0ge1xuICAgICAgICBsYWJlbElkOiBsYWJlbElkLFxuICAgICAgICBsYWJlbENhcHRpb246IGxhYmVsQ2FwdGlvbixcbiAgICAgICAgZm9ybUZpZWxkSWQ6IGZvcm1GaWVsZElkLFxuICAgICAgICBzb3VyY2VUYWJsZTogc291cmNlVGFibGUsXG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGU6IGRlc3RpbmF0aW9uVGFibGUsXG4gICAgfTtcblxuICAgIHZhciBkZXN0aW5hdGlvblRhYmxlSWRTZWxlY3RvciA9IEN1c3RvbWVySWRTZWxlY3Rvci5jcmVhdGUoKTtcblxuICAgIHRhYmxlSGFuZGxlci50b2dnbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNvdXJjZVRhYmxlKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgY2hlY2tib3hOb2RlKSB7XG4gICAgICAgICAgICB2YXIgJGNoZWNrYm94ID0gJChjaGVja2JveE5vZGUpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCAhJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKSk7XG4gICAgICAgICAgICAkY2hlY2tib3gudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLnNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgc291cmNlVGFibGUpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBjaGVja2JveE5vZGUpIHtcbiAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKGNoZWNrYm94Tm9kZSk7XG4gICAgICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5kZVNlbGVjdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgc291cmNlVGFibGUpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBjaGVja2JveE5vZGUpIHtcbiAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKGNoZWNrYm94Tm9kZSk7XG4gICAgICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICRjaGVja2JveC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuYWRkU2VsZWN0ZWRDdXN0b21lciA9IGZ1bmN0aW9uIChpZEN1c3RvbWVyLCBmaXJzdG5hbWUsIGxhc3RuYW1lLCBnZW5kZXIpIHtcbiAgICAgICAgaWRDdXN0b21lciA9IHBhcnNlSW50KGlkQ3VzdG9tZXIsIDEwKTtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uVGFibGVJZFNlbGVjdG9yLmlzSWRTZWxlY3RlZChpZEN1c3RvbWVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGVJZFNlbGVjdG9yLmFkZElkVG9TZWxlY3Rpb24oaWRDdXN0b21lcik7XG5cbiAgICAgICAgdmFyICRyZW1vdmVMaW5rVGV4dElucHV0ID0gJCgnI3JlbW92ZS1saW5rLXRleHQnKTtcblxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlXG4gICAgICAgICAgICAuRGF0YVRhYmxlKClcbiAgICAgICAgICAgIC5yb3cuYWRkKFtcbiAgICAgICAgICAgICAgICBpZEN1c3RvbWVyLFxuICAgICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudCgoZmlyc3RuYW1lICsgJycpLnJlcGxhY2UoL1xcKy9nLCAnJTIwJykpLFxuICAgICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudCgobGFzdG5hbWUgKyAnJykucmVwbGFjZSgvXFwrL2csICclMjAnKSksXG4gICAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KChnZW5kZXIgKyAnJykucmVwbGFjZSgvXFwrL2csICclMjAnKSksXG4gICAgICAgICAgICAgICAgJzxkaXY+PGEgZGF0YS1pZD1cIicgK1xuICAgICAgICAgICAgICAgICAgICBpZEN1c3RvbWVyICtcbiAgICAgICAgICAgICAgICAgICAgJ1wiIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXhzIHJlbW92ZS1pdGVtXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICgkcmVtb3ZlTGlua1RleHRJbnB1dCA/ICRyZW1vdmVMaW5rVGV4dElucHV0LnZhbCgpIDogJ1JlbW92ZScpICtcbiAgICAgICAgICAgICAgICAgICAgJzwvYT48L2Rpdj4nLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICAgIC5kcmF3KCk7XG5cbiAgICAgICAgJCgnLnJlbW92ZS1pdGVtJykub2ZmKCdjbGljaycpO1xuICAgICAgICAkKCcucmVtb3ZlLWl0ZW0nKS5vbignY2xpY2snLCBvblJlbW92ZUNhbGxiYWNrKTtcblxuICAgICAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRDdXN0b21lcnNMYWJlbENvdW50KCk7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5yZW1vdmVTZWxlY3RlZEN1c3RvbWVyID0gZnVuY3Rpb24gKGlkQ3VzdG9tZXIpIHtcbiAgICAgICAgaWRDdXN0b21lciA9IHBhcnNlSW50KGlkQ3VzdG9tZXIsIDEwKTtcblxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlXG4gICAgICAgICAgICAuRGF0YVRhYmxlKClcbiAgICAgICAgICAgIC5yb3dzKClcbiAgICAgICAgICAgIC5ldmVyeShmdW5jdGlvbiAocm93SW5kZXgsIHRhYmxlTG9vcCwgcm93TG9vcCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb3dDdXN0b21lcklkID0gcGFyc2VJbnQodGhpcy5kYXRhKClbMF0sIDEwKTtcbiAgICAgICAgICAgICAgICBpZiAoaWRDdXN0b21lciAhPT0gcm93Q3VzdG9tZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25UYWJsZUlkU2VsZWN0b3IucmVtb3ZlSWRGcm9tU2VsZWN0aW9uKGlkQ3VzdG9tZXIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKCdpbnB1dFt2YWx1ZT1cIicgKyBpZEN1c3RvbWVyICsgJ1wiXScsIHNvdXJjZVRhYmxlKTtcbiAgICAgICAgICAgICAgICB0YWJsZUhhbmRsZXIudW5DaGVja0NoZWNrYm94KCRjaGVja2JveCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlLkRhdGFUYWJsZSgpLmRyYXcoKTtcbiAgICAgICAgdGFibGVIYW5kbGVyLnVwZGF0ZVNlbGVjdGVkQ3VzdG9tZXJzTGFiZWxDb3VudCgpO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0U2VsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvblRhYmxlSWRTZWxlY3RvcjtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLnVwZGF0ZVNlbGVjdGVkQ3VzdG9tZXJzTGFiZWxDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0YWJsZUhhbmRsZXIuZ2V0TGFiZWxJZCgpKS50ZXh0KFxuICAgICAgICAgICAgbGFiZWxDYXB0aW9uICsgJyAoJyArIE9iamVjdC5rZXlzKHRoaXMuZ2V0U2VsZWN0b3IoKS5nZXRTZWxlY3RlZCgpKS5sZW5ndGggKyAnKScsXG4gICAgICAgICk7XG4gICAgICAgIHZhciBjdXN0b21lcklkcyA9IE9iamVjdC5rZXlzKHRoaXMuZ2V0U2VsZWN0b3IoKS5nZXRTZWxlY3RlZCgpKTtcbiAgICAgICAgdmFyIHMgPSBjdXN0b21lcklkcy5qb2luKCcsJyk7XG4gICAgICAgIHZhciBmaWVsZCA9ICQoJyMnICsgdGFibGVIYW5kbGVyLmdldEZvcm1GaWVsZElkKCkpO1xuICAgICAgICBmaWVsZC5hdHRyKCd2YWx1ZScsIHMpO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0TGFiZWxJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRhYmxlSGFuZGxlci5sYWJlbElkO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0TGFiZWxDYXB0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmxhYmVsQ2FwdGlvbjtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmdldEZvcm1GaWVsZElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmZvcm1GaWVsZElkO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0U291cmNlVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWJsZUhhbmRsZXIuc291cmNlVGFibGU7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXREZXN0aW5hdGlvblRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmRlc3RpbmF0aW9uVGFibGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGFibGVIYW5kbGVyLmdldEluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqUXVlcnl9ICRjaGVja2JveFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGFibGVIYW5kbGVyLmlzQ2hlY2tib3hBY3RpdmUgPSBmdW5jdGlvbiAoJGNoZWNrYm94KSB7XG4gICAgICAgIGlmICh0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlKCkgPT09IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCkge1xuICAgICAgICAgICAgcmV0dXJuICRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkY2hlY2tib3hcbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIuY2hlY2tDaGVja2JveCA9IGZ1bmN0aW9uICgkY2hlY2tib3gpIHtcbiAgICAgICAgdmFyIGNoZWNrZWRTdGF0ZSA9IHRhYmxlSGFuZGxlci5nZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUoKSA9PT0gQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEO1xuICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWRTdGF0ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkY2hlY2tib3hcbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIudW5DaGVja0NoZWNrYm94ID0gZnVuY3Rpb24gKCRjaGVja2JveCkge1xuICAgICAgICB2YXIgY2hlY2tlZFN0YXRlID0gdGFibGVIYW5kbGVyLmdldEluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSgpICE9PSBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ7XG4gICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgY2hlY2tlZFN0YXRlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRhYmxlSGFuZGxlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVRhYmxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uVGFibGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkSWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtUYWJsZUhhbmRsZXJ9XG4gICAgICovXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYWJsZUhhbmRsZXIoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spO1xuICAgIH0sXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEOiBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQsXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEOiBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVGFibGVIYW5kbGVyID0gcmVxdWlyZSgnLi90YWJsZS1oYW5kbGVyJyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVRhYmxlU2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGVja2JveFNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxJZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZElkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gKlxuICogQHJldHVybiB7VGFibGVIYW5kbGVyfVxuICovXG5mdW5jdGlvbiBjcmVhdGUoXG4gICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IsXG4gICAgY2hlY2tib3hTZWxlY3RvcixcbiAgICBsYWJlbENhcHRpb24sXG4gICAgbGFiZWxJZCxcbiAgICBmb3JtRmllbGRJZCxcbiAgICBvblJlbW92ZUNhbGxiYWNrLFxuKSB7XG4gICAgJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSh7IGRlc3Ryb3k6IHRydWUgfSk7XG5cbiAgICB2YXIgdGFibGVIYW5kbGVyID0gVGFibGVIYW5kbGVyLmNyZWF0ZShcbiAgICAgICAgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSxcbiAgICAgICAgJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLFxuICAgICAgICBsYWJlbENhcHRpb24sXG4gICAgICAgIGxhYmVsSWQsXG4gICAgICAgIGZvcm1GaWVsZElkLFxuICAgICAgICBvblJlbW92ZUNhbGxiYWNrLFxuICAgICk7XG5cbiAgICAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpXG4gICAgICAgIC5EYXRhVGFibGUoKVxuICAgICAgICAub24oJ2RyYXcnLCBmdW5jdGlvbiAoZXZlbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAkKGNoZWNrYm94U2VsZWN0b3IsICQoc291cmNlVGFibGVTZWxlY3RvcikpLm9mZignY2hhbmdlJyk7XG4gICAgICAgICAgICAkKGNoZWNrYm94U2VsZWN0b3IsICQoc291cmNlVGFibGVTZWxlY3RvcikpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSAkLnBhcnNlSlNPTigkY2hlY2tib3guYXR0cignZGF0YS1pbmZvJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhYmxlSGFuZGxlci5pc0NoZWNrYm94QWN0aXZlKCRjaGVja2JveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLmFkZFNlbGVjdGVkQ3VzdG9tZXIoaW5mby5pZEN1c3RvbWVyLCBpbmZvLmZpcnN0bmFtZSwgaW5mby5sYXN0bmFtZSwgaW5mby5nZW5kZXIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSGFuZGxlci5yZW1vdmVTZWxlY3RlZEN1c3RvbWVyKGluZm8uaWRDdXN0b21lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MuanNvbi5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1c3RvbWVyID0gc2V0dGluZ3MuanNvbi5kYXRhW2ldO1xuICAgICAgICAgICAgICAgIHZhciBpZEN1c3RvbWVyID0gcGFyc2VJbnQoY3VzdG9tZXJbMV0sIDEwKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IHRhYmxlSGFuZGxlci5nZXRTZWxlY3RvcigpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5pc0lkU2VsZWN0ZWQoaWRDdXN0b21lcikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLmNoZWNrQ2hlY2tib3goJCgnaW5wdXRbdmFsdWU9XCInICsgaWRDdXN0b21lciArICdcIl0nLCAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHJldHVybiB0YWJsZUhhbmRsZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRDogVGFibGVIYW5kbGVyLkNIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCxcbiAgICBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ6IFRhYmxlSGFuZGxlci5DSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIl0sIm5hbWVzIjpbIlJlbGF0ZWRDdXN0b21lclRhYmxlIiwicmVxdWlyZSIsInNvdXJjZVRhYlNlbGVjdG9yIiwic291cmNlVGFibGVTZWxlY3RvciIsImRlc3RpbmF0aW9uVGFiU2VsZWN0b3IiLCJkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IiLCJkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IiLCJjaGVja2JveFNlbGVjdG9yIiwidGFibGVIYW5kbGVyIiwiaW5pdGlhbGl6ZSIsImNyZWF0ZSIsIiQiLCJ0ZXh0Iiwib25SZW1vdmUiLCJnZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUiLCJDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQiLCJvbiIsImRlU2VsZWN0QWxsIiwiJGxpbmsiLCJpZCIsImRhdGEiLCJhY3Rpb24iLCJkYXRhVGFibGUiLCJEYXRhVGFibGUiLCJyb3ciLCJwYXJlbnRzIiwicmVtb3ZlIiwiZHJhdyIsImdldFNlbGVjdG9yIiwicmVtb3ZlSWRGcm9tU2VsZWN0aW9uIiwidXBkYXRlU2VsZWN0ZWRDdXN0b21lcnNMYWJlbENvdW50IiwicHJvcCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3RBbGwiLCJhdmFpbGFibGVDdXN0b21lclRhYmxlIiwiYXNzaWduZWRDdXN0b21lclRhYmxlIiwiZG9jdW1lbnQiLCJyZWFkeSIsIkN1c3RvbWVySWRTZWxlY3RvciIsInNlbGVjdG9yIiwic2VsZWN0ZWRJZHMiLCJpZEtleSIsImFkZElkVG9TZWxlY3Rpb24iLCJpc0lkU2VsZWN0ZWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNsZWFyQWxsU2VsZWN0aW9ucyIsImFkZEFsbFRvU2VsZWN0aW9uIiwiaSIsImxlbmd0aCIsImdldFNlbGVjdGVkIiwiQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEIiwiVGFibGVIYW5kbGVyIiwic291cmNlVGFibGUiLCJkZXN0aW5hdGlvblRhYmxlIiwibGFiZWxDYXB0aW9uIiwibGFiZWxJZCIsImZvcm1GaWVsZElkIiwib25SZW1vdmVDYWxsYmFjayIsImRlc3RpbmF0aW9uVGFibGVJZFNlbGVjdG9yIiwidG9nZ2xlU2VsZWN0aW9uIiwiZWFjaCIsImluZGV4IiwiY2hlY2tib3hOb2RlIiwiJGNoZWNrYm94IiwidHJpZ2dlciIsImFkZFNlbGVjdGVkQ3VzdG9tZXIiLCJpZEN1c3RvbWVyIiwiZmlyc3RuYW1lIiwibGFzdG5hbWUiLCJnZW5kZXIiLCJwYXJzZUludCIsIiRyZW1vdmVMaW5rVGV4dElucHV0IiwiYWRkIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsInZhbCIsIm9mZiIsInJlbW92ZVNlbGVjdGVkQ3VzdG9tZXIiLCJyb3dzIiwiZXZlcnkiLCJyb3dJbmRleCIsInRhYmxlTG9vcCIsInJvd0xvb3AiLCJyb3dDdXN0b21lcklkIiwidW5DaGVja0NoZWNrYm94IiwiZ2V0TGFiZWxJZCIsIk9iamVjdCIsImtleXMiLCJjdXN0b21lcklkcyIsInMiLCJqb2luIiwiZmllbGQiLCJnZXRGb3JtRmllbGRJZCIsImF0dHIiLCJnZXRMYWJlbENhcHRpb24iLCJnZXRTb3VyY2VUYWJsZSIsImdldERlc3RpbmF0aW9uVGFibGUiLCJpc0NoZWNrYm94QWN0aXZlIiwiY2hlY2tDaGVja2JveCIsImNoZWNrZWRTdGF0ZSIsImRlc3Ryb3kiLCJldmVudCIsInNldHRpbmdzIiwiaW5mbyIsInBhcnNlSlNPTiIsImpzb24iLCJjdXN0b21lciJdLCJzb3VyY2VSb290IjoiIn0=