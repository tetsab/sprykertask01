"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-customer-group-form"],{

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/assigned-item-table.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/assigned-item-table.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ItemTable = __webpack_require__(/*! ./parts/table */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table.js");
var sourceTabSelector = '#assigned-items-source-tab';
var destinationTabSelector = '#assigned-items-destination-tab';
var fieldToBeDeassignedItemIds = '#js-item-to-de-assign-ids-csv-field';
var checkboxSelector = '.js-item-checkbox';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var buttonSelectAllSelector = sourceTabSelector + ' .js-de-select-all-button a';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = ItemTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, fieldToBeDeassignedItemIds, onRemove);
  tableHandler.getInitialCheckboxCheckedState = function () {
    return ItemTable.CHECKBOX_CHECKED_STATE_CHECKED;
  };
  $(buttonSelectAllSelector).on('click', tableHandler.deSelectAll);
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
  tableHandler.getSelector().removeItemFromSelection(id);
  tableHandler.updateSelectedItemsLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', true);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/available-item-table.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/available-item-table.js ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ItemTable = __webpack_require__(/*! ./parts/table */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table.js");
var sourceTabSelector = '#available-items-source-tab';
var destinationTabSelector = '#available-items-destination-tab';
var fieldToBeAssignedItemIds = '#js-item-to-assign-ids-csv-field';
var checkboxSelector = '.js-item-checkbox';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var buttonSelectAllSelector = sourceTabSelector + ' .js-select-all-button a';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = ItemTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, fieldToBeAssignedItemIds, onRemove);
  $(buttonSelectAllSelector).on('click', tableHandler.selectAll);
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
  tableHandler.getSelector().removeItemFromSelection(id);
  tableHandler.updateSelectedItemsLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', false);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/main.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/main.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var availableItemTable = __webpack_require__(/*! ./available-item-table */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/available-item-table.js");
var assignedItemTable = __webpack_require__(/*! ./assigned-item-table */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/assigned-item-table.js");
$(document).ready(function () {
  availableItemTable.initialize();
  assignedItemTable.initialize();
});

/***/ }),

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/selector.js":
/*!************************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/selector.js ***!
  \************************************************************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function ItemSelector() {
  var itemSelector = {};
  var selectedItems = {};
  var idKey = 'id';
  itemSelector.addItemToSelection = function (idItem) {
    selectedItems[idItem] = idItem;
  };
  itemSelector.removeItemFromSelection = function (idItem) {
    delete selectedItems[idItem];
  };
  itemSelector.isItemSelected = function (idItem) {
    return selectedItems.hasOwnProperty(idItem);
  };
  itemSelector.clearAllSelections = function () {
    selectedItems = {};
  };
  itemSelector.addAllToSelection = function (data) {
    for (var i = 0; i < data.length; i++) {
      var id = data[i][idKey];
      selectedItems[id] = id;
    }
  };
  itemSelector.getSelected = function () {
    return selectedItems;
  };
  return itemSelector;
}
module.exports = {
  /**
   * @return {ItemSelector}
   */
  create: function () {
    return new ItemSelector();
  }
};

/***/ }),

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table-handler.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table-handler.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ItemSelector = __webpack_require__(/*! ./selector */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/selector.js");
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
  var destinationTableItemSelector = ItemSelector.create();
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
  tableHandler.addSelectedItem = function (idItem, email, firstName, lastName) {
    idItem = parseInt(idItem, 10);
    if (destinationTableItemSelector.isItemSelected(idItem)) {
      return;
    }
    destinationTableItemSelector.addItemToSelection(idItem);
    destinationTable.DataTable().row.add([idItem, decodeURIComponent((email + '').replace(/\+/g, '%20')), decodeURIComponent((firstName + '').replace(/\+/g, '%20')), decodeURIComponent((lastName + '').replace(/\+/g, '%20')), '<div><a data-id="' + idItem + '" href="#" class="btn btn-xs remove-item">Remove</a></div>']).draw();
    $('.remove-item').off('click');
    $('.remove-item').on('click', onRemoveCallback);
    tableHandler.updateSelectedItemsLabelCount();
  };
  tableHandler.removeSelectedItem = function (idItem) {
    idItem = parseInt(idItem, 10);
    destinationTable.DataTable().rows().every(function (rowIndex, tableLoop, rowLoop) {
      if (!this.data()) {
        return;
      }
      var rowItemId = parseInt(this.data()[0], 10);
      if (idItem !== rowItemId) {
        return;
      }
      destinationTableItemSelector.removeItemFromSelection(idItem);
      this.remove();
      var $checkbox = $('input[value="' + idItem + '"]', sourceTable);
      tableHandler.unCheckCheckbox($checkbox);
    });
    destinationTable.DataTable().draw();
    tableHandler.updateSelectedItemsLabelCount();
  };
  tableHandler.getSelector = function () {
    return destinationTableItemSelector;
  };
  tableHandler.updateSelectedItemsLabelCount = function () {
    $(tableHandler.getLabelId()).text(labelCaption + ' (' + Object.keys(this.getSelector().getSelected()).length + ')');
    var itemIds = Object.keys(this.getSelector().getSelected());
    var s = itemIds.join(',');
    var field = $(tableHandler.getFormFieldId());
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

/***/ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table.js":
/*!*********************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var TableHandler = __webpack_require__(/*! ./table-handler */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/parts/table-handler.js");

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
        tableHandler.addSelectedItem(info.id, info.email, info.firstName, info.lastName);
      } else {
        tableHandler.removeSelectedItem(info.id);
      }
    });
    for (var i = 0; i < settings.json.data.length; i++) {
      var item = settings.json.data[i];
      var idItem = parseInt(item[1], 10);
      var selector = tableHandler.getSelector();
      if (selector.isItemSelected(idItem)) {
        tableHandler.checkCheckbox($('input[value="' + idItem + '"]', $(sourceTableSelector)));
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

/***/ "./vendor/spryker/customer-group/assets/Zed/js/spryker-zed-customer-group-form.entry.js":
/*!**********************************************************************************************!*\
  !*** ./vendor/spryker/customer-group/assets/Zed/js/spryker-zed-customer-group-form.entry.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/assignment-table/main */ "./vendor/spryker/customer-group/assets/Zed/js/modules/assignment-table/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/customer-group/assets/Zed/js/spryker-zed-customer-group-form.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jdXN0b21lci1ncm91cC1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxTQUFTLEdBQUdDLG1CQUFPLENBQUMsNEdBQWUsQ0FBQztBQUV4QyxJQUFJQyxpQkFBaUIsR0FBRyw0QkFBNEI7QUFDcEQsSUFBSUMsc0JBQXNCLEdBQUcsaUNBQWlDO0FBQzlELElBQUlDLDBCQUEwQixHQUFHLHFDQUFxQztBQUN0RSxJQUFJQyxnQkFBZ0IsR0FBRyxtQkFBbUI7QUFFMUMsSUFBSUMsbUJBQW1CLEdBQUdKLGlCQUFpQixHQUFHLGNBQWM7QUFDNUQsSUFBSUssMkJBQTJCLEdBQUdKLHNCQUFzQixHQUFHLFFBQVE7QUFDbkUsSUFBSUssd0JBQXdCLEdBQUdMLHNCQUFzQixHQUFHLFFBQVE7QUFDaEUsSUFBSU0sdUJBQXVCLEdBQUdQLGlCQUFpQixHQUFHLDZCQUE2QjtBQUMvRSxJQUFJUSxZQUFZOztBQUVoQjtBQUNBO0FBQ0E7QUFDQSxTQUFTQyxVQUFVQSxDQUFBLEVBQUc7RUFDbEJELFlBQVksR0FBR1YsU0FBUyxDQUFDWSxNQUFNLENBQzNCTixtQkFBbUIsRUFDbkJFLHdCQUF3QixFQUN4QkgsZ0JBQWdCLEVBQ2hCUSxDQUFDLENBQUNOLDJCQUEyQixDQUFDLENBQUNPLElBQUksQ0FBQyxDQUFDLEVBQ3JDUCwyQkFBMkIsRUFDM0JILDBCQUEwQixFQUMxQlcsUUFDSixDQUFDO0VBRURMLFlBQVksQ0FBQ00sOEJBQThCLEdBQUcsWUFBWTtJQUN0RCxPQUFPaEIsU0FBUyxDQUFDaUIsOEJBQThCO0VBQ25ELENBQUM7RUFFREosQ0FBQyxDQUFDSix1QkFBdUIsQ0FBQyxDQUFDUyxFQUFFLENBQUMsT0FBTyxFQUFFUixZQUFZLENBQUNTLFdBQVcsQ0FBQztBQUNwRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTSixRQUFRQSxDQUFBLEVBQUc7RUFDaEIsSUFBSUssS0FB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QkFBOEIsRUFBRXVDLFlBQVksQ0FBQ3ZDLDhCQUE4QjtFQUMzRXNDLGlDQUFpQyxFQUFFQyxZQUFZLENBQUNEO0FBQ3BELENBQUM7Ozs7Ozs7Ozs7QUN6RUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJ0RCxtQkFBTyxDQUFDLHVIQUFpQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItZ3JvdXAvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Fzc2lnbm1lbnQtdGFibGUvYXNzaWduZWQtaXRlbS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci1ncm91cC9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWdubWVudC10YWJsZS9hdmFpbGFibGUtaXRlbS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXN0b21lci1ncm91cC9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWdubWVudC10YWJsZS9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2N1c3RvbWVyLWdyb3VwL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9hc3NpZ25tZW50LXRhYmxlL3BhcnRzL3NlbGVjdG9yLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2N1c3RvbWVyLWdyb3VwL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9hc3NpZ25tZW50LXRhYmxlL3BhcnRzL3RhYmxlLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItZ3JvdXAvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Fzc2lnbm1lbnQtdGFibGUvcGFydHMvdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY3VzdG9tZXItZ3JvdXAvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jdXN0b21lci1ncm91cC1mb3JtLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEl0ZW1UYWJsZSA9IHJlcXVpcmUoJy4vcGFydHMvdGFibGUnKTtcblxudmFyIHNvdXJjZVRhYlNlbGVjdG9yID0gJyNhc3NpZ25lZC1pdGVtcy1zb3VyY2UtdGFiJztcbnZhciBkZXN0aW5hdGlvblRhYlNlbGVjdG9yID0gJyNhc3NpZ25lZC1pdGVtcy1kZXN0aW5hdGlvbi10YWInO1xudmFyIGZpZWxkVG9CZURlYXNzaWduZWRJdGVtSWRzID0gJyNqcy1pdGVtLXRvLWRlLWFzc2lnbi1pZHMtY3N2LWZpZWxkJztcbnZhciBjaGVja2JveFNlbGVjdG9yID0gJy5qcy1pdGVtLWNoZWNrYm94JztcblxudmFyIHNvdXJjZVRhYmxlU2VsZWN0b3IgPSBzb3VyY2VUYWJTZWxlY3RvciArICcgdGFibGUudGFibGUnO1xudmFyIGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciA9IGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgKyAnLWxhYmVsJztcbnZhciBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IgPSBkZXN0aW5hdGlvblRhYlNlbGVjdG9yICsgJy10YWJsZSc7XG52YXIgYnV0dG9uU2VsZWN0QWxsU2VsZWN0b3IgPSBzb3VyY2VUYWJTZWxlY3RvciArICcgLmpzLWRlLXNlbGVjdC1hbGwtYnV0dG9uIGEnO1xudmFyIHRhYmxlSGFuZGxlcjtcblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIHRhYmxlSGFuZGxlciA9IEl0ZW1UYWJsZS5jcmVhdGUoXG4gICAgICAgIHNvdXJjZVRhYmxlU2VsZWN0b3IsXG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvcixcbiAgICAgICAgY2hlY2tib3hTZWxlY3RvcixcbiAgICAgICAgJChkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IpLnRleHQoKSxcbiAgICAgICAgZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yLFxuICAgICAgICBmaWVsZFRvQmVEZWFzc2lnbmVkSXRlbUlkcyxcbiAgICAgICAgb25SZW1vdmUsXG4gICAgKTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBJdGVtVGFibGUuQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEO1xuICAgIH07XG5cbiAgICAkKGJ1dHRvblNlbGVjdEFsbFNlbGVjdG9yKS5vbignY2xpY2snLCB0YWJsZUhhbmRsZXIuZGVTZWxlY3RBbGwpO1xufVxuXG4vKipcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBvblJlbW92ZSgpIHtcbiAgICB2YXIgJGxpbmsgPSAkKHRoaXMpO1xuICAgIHZhciBpZCA9ICRsaW5rLmRhdGEoJ2lkJyk7XG4gICAgdmFyIGFjdGlvbiA9ICRsaW5rLmRhdGEoJ2FjdGlvbicpO1xuXG4gICAgdmFyIGRhdGFUYWJsZSA9ICQoZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yKS5EYXRhVGFibGUoKTtcbiAgICBkYXRhVGFibGUucm93KCRsaW5rLnBhcmVudHMoJ3RyJykpLnJlbW92ZSgpLmRyYXcoKTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXRTZWxlY3RvcigpLnJlbW92ZUl0ZW1Gcm9tU2VsZWN0aW9uKGlkKTtcbiAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRJdGVtc0xhYmVsQ291bnQoKTtcbiAgICAkKCdpbnB1dFt2YWx1ZT1cIicgKyBpZCArICdcIl0nLCAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSXRlbVRhYmxlID0gcmVxdWlyZSgnLi9wYXJ0cy90YWJsZScpO1xuXG52YXIgc291cmNlVGFiU2VsZWN0b3IgPSAnI2F2YWlsYWJsZS1pdGVtcy1zb3VyY2UtdGFiJztcbnZhciBkZXN0aW5hdGlvblRhYlNlbGVjdG9yID0gJyNhdmFpbGFibGUtaXRlbXMtZGVzdGluYXRpb24tdGFiJztcbnZhciBmaWVsZFRvQmVBc3NpZ25lZEl0ZW1JZHMgPSAnI2pzLWl0ZW0tdG8tYXNzaWduLWlkcy1jc3YtZmllbGQnO1xudmFyIGNoZWNrYm94U2VsZWN0b3IgPSAnLmpzLWl0ZW0tY2hlY2tib3gnO1xuXG52YXIgc291cmNlVGFibGVTZWxlY3RvciA9IHNvdXJjZVRhYlNlbGVjdG9yICsgJyB0YWJsZS50YWJsZSc7XG52YXIgZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yID0gZGVzdGluYXRpb25UYWJTZWxlY3RvciArICctbGFiZWwnO1xudmFyIGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvciA9IGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgKyAnLXRhYmxlJztcbnZhciBidXR0b25TZWxlY3RBbGxTZWxlY3RvciA9IHNvdXJjZVRhYlNlbGVjdG9yICsgJyAuanMtc2VsZWN0LWFsbC1idXR0b24gYSc7XG52YXIgdGFibGVIYW5kbGVyO1xuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgdGFibGVIYW5kbGVyID0gSXRlbVRhYmxlLmNyZWF0ZShcbiAgICAgICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICAgICAgZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICAkKGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvcikudGV4dCgpLFxuICAgICAgICBkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IsXG4gICAgICAgIGZpZWxkVG9CZUFzc2lnbmVkSXRlbUlkcyxcbiAgICAgICAgb25SZW1vdmUsXG4gICAgKTtcblxuICAgICQoYnV0dG9uU2VsZWN0QWxsU2VsZWN0b3IpLm9uKCdjbGljaycsIHRhYmxlSGFuZGxlci5zZWxlY3RBbGwpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIG9uUmVtb3ZlKCkge1xuICAgIHZhciAkbGluayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gJGxpbmsuZGF0YSgnaWQnKTtcbiAgICB2YXIgYWN0aW9uID0gJGxpbmsuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICB2YXIgZGF0YVRhYmxlID0gJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpO1xuICAgIGRhdGFUYWJsZS5yb3coJGxpbmsucGFyZW50cygndHInKSkucmVtb3ZlKCkuZHJhdygpO1xuXG4gICAgdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yKCkucmVtb3ZlSXRlbUZyb21TZWxlY3Rpb24oaWQpO1xuICAgIHRhYmxlSGFuZGxlci51cGRhdGVTZWxlY3RlZEl0ZW1zTGFiZWxDb3VudCgpO1xuICAgICQoJ2lucHV0W3ZhbHVlPVwiJyArIGlkICsgJ1wiXScsICQoc291cmNlVGFibGVTZWxlY3RvcikpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXZhaWxhYmxlSXRlbVRhYmxlID0gcmVxdWlyZSgnLi9hdmFpbGFibGUtaXRlbS10YWJsZScpO1xudmFyIGFzc2lnbmVkSXRlbVRhYmxlID0gcmVxdWlyZSgnLi9hc3NpZ25lZC1pdGVtLXRhYmxlJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBhdmFpbGFibGVJdGVtVGFibGUuaW5pdGlhbGl6ZSgpO1xuICAgIGFzc2lnbmVkSXRlbVRhYmxlLmluaXRpYWxpemUoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBJdGVtU2VsZWN0b3IoKSB7XG4gICAgdmFyIGl0ZW1TZWxlY3RvciA9IHt9O1xuICAgIHZhciBzZWxlY3RlZEl0ZW1zID0ge307XG4gICAgdmFyIGlkS2V5ID0gJ2lkJztcblxuICAgIGl0ZW1TZWxlY3Rvci5hZGRJdGVtVG9TZWxlY3Rpb24gPSBmdW5jdGlvbiAoaWRJdGVtKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbXNbaWRJdGVtXSA9IGlkSXRlbTtcbiAgICB9O1xuXG4gICAgaXRlbVNlbGVjdG9yLnJlbW92ZUl0ZW1Gcm9tU2VsZWN0aW9uID0gZnVuY3Rpb24gKGlkSXRlbSkge1xuICAgICAgICBkZWxldGUgc2VsZWN0ZWRJdGVtc1tpZEl0ZW1dO1xuICAgIH07XG5cbiAgICBpdGVtU2VsZWN0b3IuaXNJdGVtU2VsZWN0ZWQgPSBmdW5jdGlvbiAoaWRJdGVtKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZEl0ZW1zLmhhc093blByb3BlcnR5KGlkSXRlbSk7XG4gICAgfTtcblxuICAgIGl0ZW1TZWxlY3Rvci5jbGVhckFsbFNlbGVjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGVjdGVkSXRlbXMgPSB7fTtcbiAgICB9O1xuXG4gICAgaXRlbVNlbGVjdG9yLmFkZEFsbFRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBkYXRhW2ldW2lkS2V5XTtcbiAgICAgICAgICAgIHNlbGVjdGVkSXRlbXNbaWRdID0gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaXRlbVNlbGVjdG9yLmdldFNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRJdGVtcztcbiAgICB9O1xuXG4gICAgcmV0dXJuIGl0ZW1TZWxlY3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7SXRlbVNlbGVjdG9yfVxuICAgICAqL1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IEl0ZW1TZWxlY3RvcigpO1xuICAgIH0sXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSXRlbVNlbGVjdG9yID0gcmVxdWlyZSgnLi9zZWxlY3RvcicpO1xuXG52YXIgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEID0gJ2NoZWNrZWQnO1xudmFyIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCA9ICd1bl9jaGVja2VkJztcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlVGFibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblRhYmxlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxJZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZElkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gKlxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG5mdW5jdGlvbiBUYWJsZUhhbmRsZXIoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spIHtcbiAgICB2YXIgdGFibGVIYW5kbGVyID0ge1xuICAgICAgICBsYWJlbElkOiBsYWJlbElkLFxuICAgICAgICBsYWJlbENhcHRpb246IGxhYmVsQ2FwdGlvbixcbiAgICAgICAgZm9ybUZpZWxkSWQ6IGZvcm1GaWVsZElkLFxuICAgICAgICBzb3VyY2VUYWJsZTogc291cmNlVGFibGUsXG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGU6IGRlc3RpbmF0aW9uVGFibGUsXG4gICAgfTtcblxuICAgIHZhciBkZXN0aW5hdGlvblRhYmxlSXRlbVNlbGVjdG9yID0gSXRlbVNlbGVjdG9yLmNyZWF0ZSgpO1xuXG4gICAgdGFibGVIYW5kbGVyLnRvZ2dsZVNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJywgc291cmNlVGFibGUpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBjaGVja2JveE5vZGUpIHtcbiAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKGNoZWNrYm94Tm9kZSk7XG4gICAgICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsICEkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcpKTtcbiAgICAgICAgICAgICRjaGVja2JveC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuc2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCBzb3VyY2VUYWJsZSkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGNoZWNrYm94Tm9kZSkge1xuICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoY2hlY2tib3hOb2RlKTtcbiAgICAgICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkY2hlY2tib3gudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmRlU2VsZWN0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCBzb3VyY2VUYWJsZSkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGNoZWNrYm94Tm9kZSkge1xuICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoY2hlY2tib3hOb2RlKTtcbiAgICAgICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5hZGRTZWxlY3RlZEl0ZW0gPSBmdW5jdGlvbiAoaWRJdGVtLCBlbWFpbCwgZmlyc3ROYW1lLCBsYXN0TmFtZSkge1xuICAgICAgICBpZEl0ZW0gPSBwYXJzZUludChpZEl0ZW0sIDEwKTtcblxuICAgICAgICBpZiAoZGVzdGluYXRpb25UYWJsZUl0ZW1TZWxlY3Rvci5pc0l0ZW1TZWxlY3RlZChpZEl0ZW0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZGVzdGluYXRpb25UYWJsZUl0ZW1TZWxlY3Rvci5hZGRJdGVtVG9TZWxlY3Rpb24oaWRJdGVtKTtcblxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlXG4gICAgICAgICAgICAuRGF0YVRhYmxlKClcbiAgICAgICAgICAgIC5yb3cuYWRkKFtcbiAgICAgICAgICAgICAgICBpZEl0ZW0sXG4gICAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KChlbWFpbCArICcnKS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKSxcbiAgICAgICAgICAgICAgICBkZWNvZGVVUklDb21wb25lbnQoKGZpcnN0TmFtZSArICcnKS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKSxcbiAgICAgICAgICAgICAgICBkZWNvZGVVUklDb21wb25lbnQoKGxhc3ROYW1lICsgJycpLnJlcGxhY2UoL1xcKy9nLCAnJTIwJykpLFxuICAgICAgICAgICAgICAgICc8ZGl2PjxhIGRhdGEtaWQ9XCInICsgaWRJdGVtICsgJ1wiIGhyZWY9XCIjXCIgY2xhc3M9XCJidG4gYnRuLXhzIHJlbW92ZS1pdGVtXCI+UmVtb3ZlPC9hPjwvZGl2PicsXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLmRyYXcoKTtcblxuICAgICAgICAkKCcucmVtb3ZlLWl0ZW0nKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgICQoJy5yZW1vdmUtaXRlbScpLm9uKCdjbGljaycsIG9uUmVtb3ZlQ2FsbGJhY2spO1xuXG4gICAgICAgIHRhYmxlSGFuZGxlci51cGRhdGVTZWxlY3RlZEl0ZW1zTGFiZWxDb3VudCgpO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIucmVtb3ZlU2VsZWN0ZWRJdGVtID0gZnVuY3Rpb24gKGlkSXRlbSkge1xuICAgICAgICBpZEl0ZW0gPSBwYXJzZUludChpZEl0ZW0sIDEwKTtcblxuICAgICAgICBkZXN0aW5hdGlvblRhYmxlXG4gICAgICAgICAgICAuRGF0YVRhYmxlKClcbiAgICAgICAgICAgIC5yb3dzKClcbiAgICAgICAgICAgIC5ldmVyeShmdW5jdGlvbiAocm93SW5kZXgsIHRhYmxlTG9vcCwgcm93TG9vcCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciByb3dJdGVtSWQgPSBwYXJzZUludCh0aGlzLmRhdGEoKVswXSwgMTApO1xuICAgICAgICAgICAgICAgIGlmIChpZEl0ZW0gIT09IHJvd0l0ZW1JZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25UYWJsZUl0ZW1TZWxlY3Rvci5yZW1vdmVJdGVtRnJvbVNlbGVjdGlvbihpZEl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgIHZhciAkY2hlY2tib3ggPSAkKCdpbnB1dFt2YWx1ZT1cIicgKyBpZEl0ZW0gKyAnXCJdJywgc291cmNlVGFibGUpO1xuICAgICAgICAgICAgICAgIHRhYmxlSGFuZGxlci51bkNoZWNrQ2hlY2tib3goJGNoZWNrYm94KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGUuRGF0YVRhYmxlKCkuZHJhdygpO1xuICAgICAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRJdGVtc0xhYmVsQ291bnQoKTtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZGVzdGluYXRpb25UYWJsZUl0ZW1TZWxlY3RvcjtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLnVwZGF0ZVNlbGVjdGVkSXRlbXNMYWJlbENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRhYmxlSGFuZGxlci5nZXRMYWJlbElkKCkpLnRleHQoXG4gICAgICAgICAgICBsYWJlbENhcHRpb24gKyAnICgnICsgT2JqZWN0LmtleXModGhpcy5nZXRTZWxlY3RvcigpLmdldFNlbGVjdGVkKCkpLmxlbmd0aCArICcpJyxcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIGl0ZW1JZHMgPSBPYmplY3Qua2V5cyh0aGlzLmdldFNlbGVjdG9yKCkuZ2V0U2VsZWN0ZWQoKSk7XG4gICAgICAgIHZhciBzID0gaXRlbUlkcy5qb2luKCcsJyk7XG4gICAgICAgIHZhciBmaWVsZCA9ICQodGFibGVIYW5kbGVyLmdldEZvcm1GaWVsZElkKCkpO1xuICAgICAgICBmaWVsZC5hdHRyKCd2YWx1ZScsIHMpO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0TGFiZWxJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRhYmxlSGFuZGxlci5sYWJlbElkO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0TGFiZWxDYXB0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmxhYmVsQ2FwdGlvbjtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmdldEZvcm1GaWVsZElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmZvcm1GaWVsZElkO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0U291cmNlVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWJsZUhhbmRsZXIuc291cmNlVGFibGU7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXREZXN0aW5hdGlvblRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmRlc3RpbmF0aW9uVGFibGU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdGFibGVIYW5kbGVyLmdldEluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqUXVlcnl9ICRjaGVja2JveFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGFibGVIYW5kbGVyLmlzQ2hlY2tib3hBY3RpdmUgPSBmdW5jdGlvbiAoJGNoZWNrYm94KSB7XG4gICAgICAgIGlmICh0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlKCkgPT09IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCkge1xuICAgICAgICAgICAgcmV0dXJuICRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISRjaGVja2JveC5wcm9wKCdjaGVja2VkJyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkY2hlY2tib3hcbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIuY2hlY2tDaGVja2JveCA9IGZ1bmN0aW9uICgkY2hlY2tib3gpIHtcbiAgICAgICAgdmFyIGNoZWNrZWRTdGF0ZSA9IHRhYmxlSGFuZGxlci5nZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUoKSA9PT0gQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEO1xuICAgICAgICAkY2hlY2tib3gucHJvcCgnY2hlY2tlZCcsIGNoZWNrZWRTdGF0ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7alF1ZXJ5fSAkY2hlY2tib3hcbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIudW5DaGVja0NoZWNrYm94ID0gZnVuY3Rpb24gKCRjaGVja2JveCkge1xuICAgICAgICB2YXIgY2hlY2tlZFN0YXRlID0gdGFibGVIYW5kbGVyLmdldEluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSgpICE9PSBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ7XG4gICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgY2hlY2tlZFN0YXRlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRhYmxlSGFuZGxlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVRhYmxlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uVGFibGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxhYmVsSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkSWRcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtUYWJsZUhhbmRsZXJ9XG4gICAgICovXG4gICAgY3JlYXRlOiBmdW5jdGlvbiAoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUYWJsZUhhbmRsZXIoc291cmNlVGFibGUsIGRlc3RpbmF0aW9uVGFibGUsIGxhYmVsQ2FwdGlvbiwgbGFiZWxJZCwgZm9ybUZpZWxkSWQsIG9uUmVtb3ZlQ2FsbGJhY2spO1xuICAgIH0sXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEOiBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQsXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEOiBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgVGFibGVIYW5kbGVyID0gcmVxdWlyZSgnLi90YWJsZS1oYW5kbGVyJyk7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNvdXJjZVRhYmxlU2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBjaGVja2JveFNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxDYXB0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxJZFxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1GaWVsZElkXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvblJlbW92ZUNhbGxiYWNrXG4gKlxuICogQHJldHVybiB7VGFibGVIYW5kbGVyfVxuICovXG5mdW5jdGlvbiBjcmVhdGUoXG4gICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IsXG4gICAgY2hlY2tib3hTZWxlY3RvcixcbiAgICBsYWJlbENhcHRpb24sXG4gICAgbGFiZWxJZCxcbiAgICBmb3JtRmllbGRJZCxcbiAgICBvblJlbW92ZUNhbGxiYWNrLFxuKSB7XG4gICAgJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSh7IGRlc3Ryb3k6IHRydWUgfSk7XG5cbiAgICB2YXIgdGFibGVIYW5kbGVyID0gVGFibGVIYW5kbGVyLmNyZWF0ZShcbiAgICAgICAgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSxcbiAgICAgICAgJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLFxuICAgICAgICBsYWJlbENhcHRpb24sXG4gICAgICAgIGxhYmVsSWQsXG4gICAgICAgIGZvcm1GaWVsZElkLFxuICAgICAgICBvblJlbW92ZUNhbGxiYWNrLFxuICAgICk7XG5cbiAgICAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpXG4gICAgICAgIC5EYXRhVGFibGUoKVxuICAgICAgICAub24oJ2RyYXcnLCBmdW5jdGlvbiAoZXZlbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICAkKGNoZWNrYm94U2VsZWN0b3IsICQoc291cmNlVGFibGVTZWxlY3RvcikpLm9mZignY2hhbmdlJyk7XG4gICAgICAgICAgICAkKGNoZWNrYm94U2VsZWN0b3IsICQoc291cmNlVGFibGVTZWxlY3RvcikpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSAkLnBhcnNlSlNPTigkY2hlY2tib3guYXR0cignZGF0YS1pbmZvJykpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRhYmxlSGFuZGxlci5pc0NoZWNrYm94QWN0aXZlKCRjaGVja2JveCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLmFkZFNlbGVjdGVkSXRlbShpbmZvLmlkLCBpbmZvLmVtYWlsLCBpbmZvLmZpcnN0TmFtZSwgaW5mby5sYXN0TmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLnJlbW92ZVNlbGVjdGVkSXRlbShpbmZvLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXR0aW5ncy5qc29uLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHNldHRpbmdzLmpzb24uZGF0YVtpXTtcbiAgICAgICAgICAgICAgICB2YXIgaWRJdGVtID0gcGFyc2VJbnQoaXRlbVsxXSwgMTApO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdG9yID0gdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLmlzSXRlbVNlbGVjdGVkKGlkSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLmNoZWNrQ2hlY2tib3goJCgnaW5wdXRbdmFsdWU9XCInICsgaWRJdGVtICsgJ1wiXScsICQoc291cmNlVGFibGVTZWxlY3RvcikpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhYmxlSGFuZGxlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEOiBUYWJsZUhhbmRsZXIuQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VELFxuICAgIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRDogVGFibGVIYW5kbGVyLkNIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9hc3NpZ25tZW50LXRhYmxlL21haW4nKTtcbiJdLCJuYW1lcyI6WyJJdGVtVGFibGUiLCJyZXF1aXJlIiwic291cmNlVGFiU2VsZWN0b3IiLCJkZXN0aW5hdGlvblRhYlNlbGVjdG9yIiwiZmllbGRUb0JlRGVhc3NpZ25lZEl0ZW1JZHMiLCJjaGVja2JveFNlbGVjdG9yIiwic291cmNlVGFibGVTZWxlY3RvciIsImRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciIsImRlc3RpbmF0aW9uVGFibGVTZWxlY3RvciIsImJ1dHRvblNlbGVjdEFsbFNlbGVjdG9yIiwidGFibGVIYW5kbGVyIiwiaW5pdGlhbGl6ZSIsImNyZWF0ZSIsIiQiLCJ0ZXh0Iiwib25SZW1vdmUiLCJnZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUiLCJDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQiLCJvbiIsImRlU2VsZWN0QWxsIiwiJGxpbmsiLCJpZCIsImRhdGEiLCJhY3Rpb24iLCJkYXRhVGFibGUiLCJEYXRhVGFibGUiLCJyb3ciLCJwYXJlbnRzIiwicmVtb3ZlIiwiZHJhdyIsImdldFNlbGVjdG9yIiwicmVtb3ZlSXRlbUZyb21TZWxlY3Rpb24iLCJ1cGRhdGVTZWxlY3RlZEl0ZW1zTGFiZWxDb3VudCIsInByb3AiLCJtb2R1bGUiLCJleHBvcnRzIiwiZmllbGRUb0JlQXNzaWduZWRJdGVtSWRzIiwic2VsZWN0QWxsIiwiYXZhaWxhYmxlSXRlbVRhYmxlIiwiYXNzaWduZWRJdGVtVGFibGUiLCJkb2N1bWVudCIsInJlYWR5IiwiSXRlbVNlbGVjdG9yIiwiaXRlbVNlbGVjdG9yIiwic2VsZWN0ZWRJdGVtcyIsImlkS2V5IiwiYWRkSXRlbVRvU2VsZWN0aW9uIiwiaWRJdGVtIiwiaXNJdGVtU2VsZWN0ZWQiLCJoYXNPd25Qcm9wZXJ0eSIsImNsZWFyQWxsU2VsZWN0aW9ucyIsImFkZEFsbFRvU2VsZWN0aW9uIiwiaSIsImxlbmd0aCIsImdldFNlbGVjdGVkIiwiQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEIiwiVGFibGVIYW5kbGVyIiwic291cmNlVGFibGUiLCJkZXN0aW5hdGlvblRhYmxlIiwibGFiZWxDYXB0aW9uIiwibGFiZWxJZCIsImZvcm1GaWVsZElkIiwib25SZW1vdmVDYWxsYmFjayIsImRlc3RpbmF0aW9uVGFibGVJdGVtU2VsZWN0b3IiLCJ0b2dnbGVTZWxlY3Rpb24iLCJlYWNoIiwiaW5kZXgiLCJjaGVja2JveE5vZGUiLCIkY2hlY2tib3giLCJ0cmlnZ2VyIiwiYWRkU2VsZWN0ZWRJdGVtIiwiZW1haWwiLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBhcnNlSW50IiwiYWRkIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsIm9mZiIsInJlbW92ZVNlbGVjdGVkSXRlbSIsInJvd3MiLCJldmVyeSIsInJvd0luZGV4IiwidGFibGVMb29wIiwicm93TG9vcCIsInJvd0l0ZW1JZCIsInVuQ2hlY2tDaGVja2JveCIsImdldExhYmVsSWQiLCJPYmplY3QiLCJrZXlzIiwiaXRlbUlkcyIsInMiLCJqb2luIiwiZmllbGQiLCJnZXRGb3JtRmllbGRJZCIsImF0dHIiLCJnZXRMYWJlbENhcHRpb24iLCJnZXRTb3VyY2VUYWJsZSIsImdldERlc3RpbmF0aW9uVGFibGUiLCJpc0NoZWNrYm94QWN0aXZlIiwiY2hlY2tDaGVja2JveCIsImNoZWNrZWRTdGF0ZSIsImRlc3Ryb3kiLCJldmVudCIsInNldHRpbmdzIiwiaW5mbyIsInBhcnNlSlNPTiIsImpzb24iLCJpdGVtIiwic2VsZWN0b3IiXSwic291cmNlUm9vdCI6IiJ9