"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-label-form"],{

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/assigned-product-table.js":
/*!***********************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/assigned-product-table.js ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var RelatedProductTable = __webpack_require__(/*! ./related-product-table/table */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table.js");
var sourceTabSelector = '#assigned-products-source-tab';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabSelector = '#assigned-products-destination-tab';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var checkboxSelector = '.js-abstract-product-checkbox';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = RelatedProductTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, 'js-abstract-products-to-de-assign-ids-csv-field', onRemove);
  tableHandler.getInitialCheckboxCheckedState = function () {
    return RelatedProductTable.CHECKBOX_CHECKED_STATE_CHECKED;
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
  tableHandler.getSelector().removeProductFromSelection(id);
  tableHandler.updateSelectedProductsLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', true);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/available-product-table.js":
/*!************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/available-product-table.js ***!
  \************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var RelatedProductTable = __webpack_require__(/*! ./related-product-table/table */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table.js");
var sourceTabSelector = '#available-products-source-tab';
var sourceTableSelector = sourceTabSelector + ' table.table';
var destinationTabSelector = '#available-products-destination-tab';
var destinationTabLabelSelector = destinationTabSelector + '-label';
var destinationTableSelector = destinationTabSelector + '-table';
var checkboxSelector = '.js-abstract-product-checkbox';
var tableHandler;

/**
 * @return {void}
 */
function initialize() {
  tableHandler = RelatedProductTable.create(sourceTableSelector, destinationTableSelector, checkboxSelector, $(destinationTabLabelSelector).text(), destinationTabLabelSelector, 'js-abstract-products-to-assign-ids-csv-field', onRemove);
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
  tableHandler.getSelector().removeProductFromSelection(id);
  tableHandler.updateSelectedProductsLabelCount();
  $('input[value="' + id + '"]', $(sourceTableSelector)).prop('checked', false);
  return false;
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/date-picker.js":
/*!************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/date-picker.js ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



/**
 * @param {string} validFromSelector
 * @param {string} validToSelector
 *
 * @return {void}
 */
function initialize(validFromSelector, validToSelector) {
  initDatePicker(validFromSelector, function (e) {
    var selectedDate = $(validFromSelector).datepicker('getDate');
    if (!selectedDate) {
      return;
    }
    selectedDate.setDate(selectedDate.getDate() + 1);
    $(validToSelector).datepicker('option', 'minDate', selectedDate);
  });
  initDatePicker(validToSelector, function () {
    var selectedDate = $(validToSelector).datepicker('getDate');
    if (!selectedDate) {
      return;
    }
    selectedDate.setDate(selectedDate.getDate() - 1);
    $(validFromSelector).datepicker('option', 'maxDate', selectedDate);
  });
}

/**
 * @param {string} nodeSelector
 * @param {function} onCloseCallback
 *
 * @return {void}
 */
function initDatePicker(nodeSelector, onCloseCallback) {
  $(nodeSelector).datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    numberOfMonths: 2,
    defaultDate: 0,
    onClose: onCloseCallback
  });
}
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/main.js":
/*!*****************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/main.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var datePicker = __webpack_require__(/*! ./date-picker */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/date-picker.js");
var availableProductTable = __webpack_require__(/*! ./available-product-table */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/available-product-table.js");
var assignedProductTable = __webpack_require__(/*! ./assigned-product-table */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/assigned-product-table.js");
$(document).ready(function () {
  datePicker.initialize('.js-valid-from-date-picker', '.js-valid-to-date-picker');
  availableProductTable.initialize();
  assignedProductTable.initialize();
});

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/product-selector.js":
/*!***************************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/product-selector.js ***!
  \***************************************************************************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function ProductSelector() {
  var productSelector = {};
  var selectedProducts = {};
  var idKey = 'id';
  productSelector.addProductToSelection = function (idProduct) {
    selectedProducts[idProduct] = idProduct;
  };
  productSelector.removeProductFromSelection = function (idProduct) {
    delete selectedProducts[idProduct];
  };
  productSelector.isProductSelected = function (idProduct) {
    return selectedProducts.hasOwnProperty(idProduct);
  };
  productSelector.clearAllSelections = function () {
    selectedProducts = {};
  };
  productSelector.addAllToSelection = function (data) {
    for (var i = 0; i < data.length; i++) {
      var id = data[i][idKey];
      selectedProducts[id] = id;
    }
  };
  productSelector.getSelected = function () {
    return selectedProducts;
  };
  return productSelector;
}
module.exports = {
  /**
   * @return {ProductSelector}
   */
  create: function () {
    return new ProductSelector();
  }
};

/***/ }),

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table-handler.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table-handler.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ProductSelector = __webpack_require__(/*! ./product-selector */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/product-selector.js");
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
  var destinationTableProductSelector = ProductSelector.create();
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
  tableHandler.addSelectedProduct = function (idProduct, sku, name) {
    idProduct = parseInt(idProduct, 10);
    if (destinationTableProductSelector.isProductSelected(idProduct)) {
      return;
    }
    destinationTableProductSelector.addProductToSelection(idProduct);
    destinationTable.DataTable().row.add([idProduct, decodeURIComponent(String(sku).replace(/\+/g, '%20')), String(name), '<div><a data-id="' + idProduct + '" href="#" class="btn btn-xs remove-item">Remove</a></div>']).draw();
    $('.remove-item').off('click');
    $('.remove-item').on('click', onRemoveCallback);
    tableHandler.updateSelectedProductsLabelCount();
  };
  tableHandler.removeSelectedProduct = function (idProduct) {
    idProduct = parseInt(idProduct, 10);
    destinationTable.DataTable().rows().every(function (rowIndex, tableLoop, rowLoop) {
      if (!this.data()) {
        return;
      }
      var rowProductId = parseInt(this.data()[0], 10);
      if (idProduct !== rowProductId) {
        return;
      }
      destinationTableProductSelector.removeProductFromSelection(idProduct);
      this.remove();
      var $checkbox = $('input[value="' + idProduct + '"]', sourceTable);
      tableHandler.unCheckCheckbox($checkbox);
    });
    destinationTable.DataTable().draw();
    tableHandler.updateSelectedProductsLabelCount();
  };
  tableHandler.getSelector = function () {
    return destinationTableProductSelector;
  };
  tableHandler.updateSelectedProductsLabelCount = function () {
    $(tableHandler.getLabelId()).text(labelCaption + ' (' + Object.keys(this.getSelector().getSelected()).length + ')');
    var productIds = Object.keys(this.getSelector().getSelected());
    var s = productIds.join(',');
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

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table.js":
/*!****************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table.js ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var TableHandler = __webpack_require__(/*! ./table-handler */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/related-product-table/table-handler.js");

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
        tableHandler.addSelectedProduct(info.id, info.sku, info.name);
      } else {
        tableHandler.removeSelectedProduct(info.id);
      }
    });
    for (var i = 0; i < settings.json.data.length; i++) {
      var product = settings.json.data[i];
      var idProduct = parseInt(product[1], 10);
      var selector = tableHandler.getSelector();
      if (selector.isProductSelected(idProduct)) {
        tableHandler.checkCheckbox($('input[value="' + idProduct + '"]', $(sourceTableSelector)));
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

/***/ "./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-form.entry.js":
/*!************************************************************************************************!*\
  !*** ./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-form.entry.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/form/main */ "./vendor/spryker/product-label-gui/assets/Zed/js/modules/form/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-label-gui/assets/Zed/js/spryker-zed-product-label-form.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU07RUFDZEssOEJBQThCLEVBQUV1RCxZQUFZLENBQUN2RCw4QkFBOEI7RUFDM0VzRCxpQ0FBaUMsRUFBRUMsWUFBWSxDQUFDRDtBQUNwRCxDQUFDOzs7Ozs7Ozs7O0FDekVEO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUVicEUsbUJBQU8sQ0FBQyxrR0FBcUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtbGFiZWwtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9mb3JtL2Fzc2lnbmVkLXByb2R1Y3QtdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1sYWJlbC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Zvcm0vYXZhaWxhYmxlLXByb2R1Y3QtdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1sYWJlbC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Zvcm0vZGF0ZS1waWNrZXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1sYWJlbC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Zvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvZm9ybS9yZWxhdGVkLXByb2R1Y3QtdGFibGUvcHJvZHVjdC1zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvZm9ybS9yZWxhdGVkLXByb2R1Y3QtdGFibGUvdGFibGUtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxhYmVsLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvZm9ybS9yZWxhdGVkLXByb2R1Y3QtdGFibGUvdGFibGUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1sYWJlbC1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWxhYmVsLWZvcm0uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVsYXRlZFByb2R1Y3RUYWJsZSA9IHJlcXVpcmUoJy4vcmVsYXRlZC1wcm9kdWN0LXRhYmxlL3RhYmxlJyk7XG5cbnZhciBzb3VyY2VUYWJTZWxlY3RvciA9ICcjYXNzaWduZWQtcHJvZHVjdHMtc291cmNlLXRhYic7XG52YXIgc291cmNlVGFibGVTZWxlY3RvciA9IHNvdXJjZVRhYlNlbGVjdG9yICsgJyB0YWJsZS50YWJsZSc7XG5cbnZhciBkZXN0aW5hdGlvblRhYlNlbGVjdG9yID0gJyNhc3NpZ25lZC1wcm9kdWN0cy1kZXN0aW5hdGlvbi10YWInO1xudmFyIGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciA9IGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgKyAnLWxhYmVsJztcbnZhciBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IgPSBkZXN0aW5hdGlvblRhYlNlbGVjdG9yICsgJy10YWJsZSc7XG5cbnZhciBjaGVja2JveFNlbGVjdG9yID0gJy5qcy1hYnN0cmFjdC1wcm9kdWN0LWNoZWNrYm94JztcbnZhciB0YWJsZUhhbmRsZXI7XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB0YWJsZUhhbmRsZXIgPSBSZWxhdGVkUHJvZHVjdFRhYmxlLmNyZWF0ZShcbiAgICAgICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICAgICAgZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICAkKGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvcikudGV4dCgpLFxuICAgICAgICBkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IsXG4gICAgICAgICdqcy1hYnN0cmFjdC1wcm9kdWN0cy10by1kZS1hc3NpZ24taWRzLWNzdi1maWVsZCcsXG4gICAgICAgIG9uUmVtb3ZlLFxuICAgICk7XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gUmVsYXRlZFByb2R1Y3RUYWJsZS5DSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQ7XG4gICAgfTtcblxuICAgICQoc291cmNlVGFiU2VsZWN0b3IgKyAnIC5qcy1kZS1zZWxlY3QtYWxsLWJ1dHRvbiBhJykub24oJ2NsaWNrJywgdGFibGVIYW5kbGVyLmRlU2VsZWN0QWxsKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gb25SZW1vdmUoKSB7XG4gICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICB2YXIgaWQgPSAkbGluay5kYXRhKCdpZCcpO1xuICAgIHZhciBhY3Rpb24gPSAkbGluay5kYXRhKCdhY3Rpb24nKTtcblxuICAgIHZhciBkYXRhVGFibGUgPSAkKGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvcikuRGF0YVRhYmxlKCk7XG4gICAgZGF0YVRhYmxlLnJvdygkbGluay5wYXJlbnRzKCd0cicpKS5yZW1vdmUoKS5kcmF3KCk7XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0U2VsZWN0b3IoKS5yZW1vdmVQcm9kdWN0RnJvbVNlbGVjdGlvbihpZCk7XG4gICAgdGFibGVIYW5kbGVyLnVwZGF0ZVNlbGVjdGVkUHJvZHVjdHNMYWJlbENvdW50KCk7XG4gICAgJCgnaW5wdXRbdmFsdWU9XCInICsgaWQgKyAnXCJdJywgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSkucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuXG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlbGF0ZWRQcm9kdWN0VGFibGUgPSByZXF1aXJlKCcuL3JlbGF0ZWQtcHJvZHVjdC10YWJsZS90YWJsZScpO1xuXG52YXIgc291cmNlVGFiU2VsZWN0b3IgPSAnI2F2YWlsYWJsZS1wcm9kdWN0cy1zb3VyY2UtdGFiJztcbnZhciBzb3VyY2VUYWJsZVNlbGVjdG9yID0gc291cmNlVGFiU2VsZWN0b3IgKyAnIHRhYmxlLnRhYmxlJztcblxudmFyIGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgPSAnI2F2YWlsYWJsZS1wcm9kdWN0cy1kZXN0aW5hdGlvbi10YWInO1xudmFyIGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciA9IGRlc3RpbmF0aW9uVGFiU2VsZWN0b3IgKyAnLWxhYmVsJztcbnZhciBkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IgPSBkZXN0aW5hdGlvblRhYlNlbGVjdG9yICsgJy10YWJsZSc7XG5cbnZhciBjaGVja2JveFNlbGVjdG9yID0gJy5qcy1hYnN0cmFjdC1wcm9kdWN0LWNoZWNrYm94JztcbnZhciB0YWJsZUhhbmRsZXI7XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICB0YWJsZUhhbmRsZXIgPSBSZWxhdGVkUHJvZHVjdFRhYmxlLmNyZWF0ZShcbiAgICAgICAgc291cmNlVGFibGVTZWxlY3RvcixcbiAgICAgICAgZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICAkKGRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvcikudGV4dCgpLFxuICAgICAgICBkZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IsXG4gICAgICAgICdqcy1hYnN0cmFjdC1wcm9kdWN0cy10by1hc3NpZ24taWRzLWNzdi1maWVsZCcsXG4gICAgICAgIG9uUmVtb3ZlLFxuICAgICk7XG5cbiAgICAkKHNvdXJjZVRhYlNlbGVjdG9yICsgJyAuanMtc2VsZWN0LWFsbC1idXR0b24gYScpLm9uKCdjbGljaycsIHRhYmxlSGFuZGxlci5zZWxlY3RBbGwpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIG9uUmVtb3ZlKCkge1xuICAgIHZhciAkbGluayA9ICQodGhpcyk7XG4gICAgdmFyIGlkID0gJGxpbmsuZGF0YSgnaWQnKTtcbiAgICB2YXIgYWN0aW9uID0gJGxpbmsuZGF0YSgnYWN0aW9uJyk7XG5cbiAgICB2YXIgZGF0YVRhYmxlID0gJChkZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpO1xuICAgIGRhdGFUYWJsZS5yb3coJGxpbmsucGFyZW50cygndHInKSkucmVtb3ZlKCkuZHJhdygpO1xuXG4gICAgdGFibGVIYW5kbGVyLmdldFNlbGVjdG9yKCkucmVtb3ZlUHJvZHVjdEZyb21TZWxlY3Rpb24oaWQpO1xuICAgIHRhYmxlSGFuZGxlci51cGRhdGVTZWxlY3RlZFByb2R1Y3RzTGFiZWxDb3VudCgpO1xuICAgICQoJ2lucHV0W3ZhbHVlPVwiJyArIGlkICsgJ1wiXScsICQoc291cmNlVGFibGVTZWxlY3RvcikpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWxpZEZyb21TZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbGlkVG9TZWxlY3RvclxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemUodmFsaWRGcm9tU2VsZWN0b3IsIHZhbGlkVG9TZWxlY3Rvcikge1xuICAgIGluaXREYXRlUGlja2VyKHZhbGlkRnJvbVNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWREYXRlID0gJCh2YWxpZEZyb21TZWxlY3RvcikuZGF0ZXBpY2tlcignZ2V0RGF0ZScpO1xuICAgICAgICBpZiAoIXNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWREYXRlLnNldERhdGUoc2VsZWN0ZWREYXRlLmdldERhdGUoKSArIDEpO1xuICAgICAgICAkKHZhbGlkVG9TZWxlY3RvcikuZGF0ZXBpY2tlcignb3B0aW9uJywgJ21pbkRhdGUnLCBzZWxlY3RlZERhdGUpO1xuICAgIH0pO1xuXG4gICAgaW5pdERhdGVQaWNrZXIodmFsaWRUb1NlbGVjdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZERhdGUgPSAkKHZhbGlkVG9TZWxlY3RvcikuZGF0ZXBpY2tlcignZ2V0RGF0ZScpO1xuICAgICAgICBpZiAoIXNlbGVjdGVkRGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWREYXRlLnNldERhdGUoc2VsZWN0ZWREYXRlLmdldERhdGUoKSAtIDEpO1xuICAgICAgICAkKHZhbGlkRnJvbVNlbGVjdG9yKS5kYXRlcGlja2VyKCdvcHRpb24nLCAnbWF4RGF0ZScsIHNlbGVjdGVkRGF0ZSk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IG5vZGVTZWxlY3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25DbG9zZUNhbGxiYWNrXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gaW5pdERhdGVQaWNrZXIobm9kZVNlbGVjdG9yLCBvbkNsb3NlQ2FsbGJhY2spIHtcbiAgICAkKG5vZGVTZWxlY3RvcikuZGF0ZXBpY2tlcih7XG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxuICAgICAgICBjaGFuZ2VZZWFyOiB0cnVlLFxuICAgICAgICBudW1iZXJPZk1vbnRoczogMixcbiAgICAgICAgZGVmYXVsdERhdGU6IDAsXG4gICAgICAgIG9uQ2xvc2U6IG9uQ2xvc2VDYWxsYmFjayxcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkYXRlUGlja2VyID0gcmVxdWlyZSgnLi9kYXRlLXBpY2tlcicpO1xudmFyIGF2YWlsYWJsZVByb2R1Y3RUYWJsZSA9IHJlcXVpcmUoJy4vYXZhaWxhYmxlLXByb2R1Y3QtdGFibGUnKTtcbnZhciBhc3NpZ25lZFByb2R1Y3RUYWJsZSA9IHJlcXVpcmUoJy4vYXNzaWduZWQtcHJvZHVjdC10YWJsZScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgZGF0ZVBpY2tlci5pbml0aWFsaXplKCcuanMtdmFsaWQtZnJvbS1kYXRlLXBpY2tlcicsICcuanMtdmFsaWQtdG8tZGF0ZS1waWNrZXInKTtcbiAgICBhdmFpbGFibGVQcm9kdWN0VGFibGUuaW5pdGlhbGl6ZSgpO1xuICAgIGFzc2lnbmVkUHJvZHVjdFRhYmxlLmluaXRpYWxpemUoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBQcm9kdWN0U2VsZWN0b3IoKSB7XG4gICAgdmFyIHByb2R1Y3RTZWxlY3RvciA9IHt9O1xuICAgIHZhciBzZWxlY3RlZFByb2R1Y3RzID0ge307XG4gICAgdmFyIGlkS2V5ID0gJ2lkJztcblxuICAgIHByb2R1Y3RTZWxlY3Rvci5hZGRQcm9kdWN0VG9TZWxlY3Rpb24gPSBmdW5jdGlvbiAoaWRQcm9kdWN0KSB7XG4gICAgICAgIHNlbGVjdGVkUHJvZHVjdHNbaWRQcm9kdWN0XSA9IGlkUHJvZHVjdDtcbiAgICB9O1xuXG4gICAgcHJvZHVjdFNlbGVjdG9yLnJlbW92ZVByb2R1Y3RGcm9tU2VsZWN0aW9uID0gZnVuY3Rpb24gKGlkUHJvZHVjdCkge1xuICAgICAgICBkZWxldGUgc2VsZWN0ZWRQcm9kdWN0c1tpZFByb2R1Y3RdO1xuICAgIH07XG5cbiAgICBwcm9kdWN0U2VsZWN0b3IuaXNQcm9kdWN0U2VsZWN0ZWQgPSBmdW5jdGlvbiAoaWRQcm9kdWN0KSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFByb2R1Y3RzLmhhc093blByb3BlcnR5KGlkUHJvZHVjdCk7XG4gICAgfTtcblxuICAgIHByb2R1Y3RTZWxlY3Rvci5jbGVhckFsbFNlbGVjdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGVjdGVkUHJvZHVjdHMgPSB7fTtcbiAgICB9O1xuXG4gICAgcHJvZHVjdFNlbGVjdG9yLmFkZEFsbFRvU2VsZWN0aW9uID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaWQgPSBkYXRhW2ldW2lkS2V5XTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvZHVjdHNbaWRdID0gaWQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJvZHVjdFNlbGVjdG9yLmdldFNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0ZWRQcm9kdWN0cztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHByb2R1Y3RTZWxlY3Rvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybiB7UHJvZHVjdFNlbGVjdG9yfVxuICAgICAqL1xuICAgIGNyZWF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb2R1Y3RTZWxlY3RvcigpO1xuICAgIH0sXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJvZHVjdFNlbGVjdG9yID0gcmVxdWlyZSgnLi9wcm9kdWN0LXNlbGVjdG9yJyk7XG5cbnZhciBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQgPSAnY2hlY2tlZCc7XG52YXIgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEID0gJ3VuX2NoZWNrZWQnO1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBzb3VyY2VUYWJsZVxuICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uVGFibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbENhcHRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbElkXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkSWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uUmVtb3ZlQ2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbmZ1bmN0aW9uIFRhYmxlSGFuZGxlcihzb3VyY2VUYWJsZSwgZGVzdGluYXRpb25UYWJsZSwgbGFiZWxDYXB0aW9uLCBsYWJlbElkLCBmb3JtRmllbGRJZCwgb25SZW1vdmVDYWxsYmFjaykge1xuICAgIHZhciB0YWJsZUhhbmRsZXIgPSB7XG4gICAgICAgIGxhYmVsSWQ6IGxhYmVsSWQsXG4gICAgICAgIGxhYmVsQ2FwdGlvbjogbGFiZWxDYXB0aW9uLFxuICAgICAgICBmb3JtRmllbGRJZDogZm9ybUZpZWxkSWQsXG4gICAgICAgIHNvdXJjZVRhYmxlOiBzb3VyY2VUYWJsZSxcbiAgICAgICAgZGVzdGluYXRpb25UYWJsZTogZGVzdGluYXRpb25UYWJsZSxcbiAgICB9O1xuXG4gICAgdmFyIGRlc3RpbmF0aW9uVGFibGVQcm9kdWN0U2VsZWN0b3IgPSBQcm9kdWN0U2VsZWN0b3IuY3JlYXRlKCk7XG5cbiAgICB0YWJsZUhhbmRsZXIudG9nZ2xlU2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCBzb3VyY2VUYWJsZSkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGNoZWNrYm94Tm9kZSkge1xuICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoY2hlY2tib3hOb2RlKTtcbiAgICAgICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgISRjaGVja2JveC5wcm9wKCdjaGVja2VkJykpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5zZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNvdXJjZVRhYmxlKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgY2hlY2tib3hOb2RlKSB7XG4gICAgICAgICAgICB2YXIgJGNoZWNrYm94ID0gJChjaGVja2JveE5vZGUpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICRjaGVja2JveC50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZGVTZWxlY3RBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScsIHNvdXJjZVRhYmxlKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgY2hlY2tib3hOb2RlKSB7XG4gICAgICAgICAgICB2YXIgJGNoZWNrYm94ID0gJChjaGVja2JveE5vZGUpO1xuICAgICAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkY2hlY2tib3gudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmFkZFNlbGVjdGVkUHJvZHVjdCA9IGZ1bmN0aW9uIChpZFByb2R1Y3QsIHNrdSwgbmFtZSkge1xuICAgICAgICBpZFByb2R1Y3QgPSBwYXJzZUludChpZFByb2R1Y3QsIDEwKTtcbiAgICAgICAgaWYgKGRlc3RpbmF0aW9uVGFibGVQcm9kdWN0U2VsZWN0b3IuaXNQcm9kdWN0U2VsZWN0ZWQoaWRQcm9kdWN0KSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGVQcm9kdWN0U2VsZWN0b3IuYWRkUHJvZHVjdFRvU2VsZWN0aW9uKGlkUHJvZHVjdCk7XG5cbiAgICAgICAgZGVzdGluYXRpb25UYWJsZVxuICAgICAgICAgICAgLkRhdGFUYWJsZSgpXG4gICAgICAgICAgICAucm93LmFkZChbXG4gICAgICAgICAgICAgICAgaWRQcm9kdWN0LFxuICAgICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChTdHJpbmcoc2t1KS5yZXBsYWNlKC9cXCsvZywgJyUyMCcpKSxcbiAgICAgICAgICAgICAgICBTdHJpbmcobmFtZSksXG4gICAgICAgICAgICAgICAgJzxkaXY+PGEgZGF0YS1pZD1cIicgKyBpZFByb2R1Y3QgKyAnXCIgaHJlZj1cIiNcIiBjbGFzcz1cImJ0biBidG4teHMgcmVtb3ZlLWl0ZW1cIj5SZW1vdmU8L2E+PC9kaXY+JyxcbiAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAuZHJhdygpO1xuXG4gICAgICAgICQoJy5yZW1vdmUtaXRlbScpLm9mZignY2xpY2snKTtcbiAgICAgICAgJCgnLnJlbW92ZS1pdGVtJykub24oJ2NsaWNrJywgb25SZW1vdmVDYWxsYmFjayk7XG5cbiAgICAgICAgdGFibGVIYW5kbGVyLnVwZGF0ZVNlbGVjdGVkUHJvZHVjdHNMYWJlbENvdW50KCk7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5yZW1vdmVTZWxlY3RlZFByb2R1Y3QgPSBmdW5jdGlvbiAoaWRQcm9kdWN0KSB7XG4gICAgICAgIGlkUHJvZHVjdCA9IHBhcnNlSW50KGlkUHJvZHVjdCwgMTApO1xuXG4gICAgICAgIGRlc3RpbmF0aW9uVGFibGVcbiAgICAgICAgICAgIC5EYXRhVGFibGUoKVxuICAgICAgICAgICAgLnJvd3MoKVxuICAgICAgICAgICAgLmV2ZXJ5KGZ1bmN0aW9uIChyb3dJbmRleCwgdGFibGVMb29wLCByb3dMb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGEoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJvd1Byb2R1Y3RJZCA9IHBhcnNlSW50KHRoaXMuZGF0YSgpWzBdLCAxMCk7XG4gICAgICAgICAgICAgICAgaWYgKGlkUHJvZHVjdCAhPT0gcm93UHJvZHVjdElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblRhYmxlUHJvZHVjdFNlbGVjdG9yLnJlbW92ZVByb2R1Y3RGcm9tU2VsZWN0aW9uKGlkUHJvZHVjdCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgdmFyICRjaGVja2JveCA9ICQoJ2lucHV0W3ZhbHVlPVwiJyArIGlkUHJvZHVjdCArICdcIl0nLCBzb3VyY2VUYWJsZSk7XG4gICAgICAgICAgICAgICAgdGFibGVIYW5kbGVyLnVuQ2hlY2tDaGVja2JveCgkY2hlY2tib3gpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZGVzdGluYXRpb25UYWJsZS5EYXRhVGFibGUoKS5kcmF3KCk7XG4gICAgICAgIHRhYmxlSGFuZGxlci51cGRhdGVTZWxlY3RlZFByb2R1Y3RzTGFiZWxDb3VudCgpO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0U2VsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBkZXN0aW5hdGlvblRhYmxlUHJvZHVjdFNlbGVjdG9yO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRQcm9kdWN0c0xhYmVsQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGFibGVIYW5kbGVyLmdldExhYmVsSWQoKSkudGV4dChcbiAgICAgICAgICAgIGxhYmVsQ2FwdGlvbiArICcgKCcgKyBPYmplY3Qua2V5cyh0aGlzLmdldFNlbGVjdG9yKCkuZ2V0U2VsZWN0ZWQoKSkubGVuZ3RoICsgJyknLFxuICAgICAgICApO1xuICAgICAgICB2YXIgcHJvZHVjdElkcyA9IE9iamVjdC5rZXlzKHRoaXMuZ2V0U2VsZWN0b3IoKS5nZXRTZWxlY3RlZCgpKTtcbiAgICAgICAgdmFyIHMgPSBwcm9kdWN0SWRzLmpvaW4oJywnKTtcbiAgICAgICAgdmFyIGZpZWxkID0gJCgnIycgKyB0YWJsZUhhbmRsZXIuZ2V0Rm9ybUZpZWxkSWQoKSk7XG4gICAgICAgIGZpZWxkLmF0dHIoJ3ZhbHVlJywgcyk7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXRMYWJlbElkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGFibGVIYW5kbGVyLmxhYmVsSWQ7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXRMYWJlbENhcHRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWJsZUhhbmRsZXIubGFiZWxDYXB0aW9uO1xuICAgIH07XG5cbiAgICB0YWJsZUhhbmRsZXIuZ2V0Rm9ybUZpZWxkSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWJsZUhhbmRsZXIuZm9ybUZpZWxkSWQ7XG4gICAgfTtcblxuICAgIHRhYmxlSGFuZGxlci5nZXRTb3VyY2VUYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRhYmxlSGFuZGxlci5zb3VyY2VUYWJsZTtcbiAgICB9O1xuXG4gICAgdGFibGVIYW5kbGVyLmdldERlc3RpbmF0aW9uVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0YWJsZUhhbmRsZXIuZGVzdGluYXRpb25UYWJsZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2pRdWVyeX0gJGNoZWNrYm94XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB0YWJsZUhhbmRsZXIuaXNDaGVja2JveEFjdGl2ZSA9IGZ1bmN0aW9uICgkY2hlY2tib3gpIHtcbiAgICAgICAgaWYgKHRhYmxlSGFuZGxlci5nZXRJbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUoKSA9PT0gQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTl9DSEVDS0VEKSB7XG4gICAgICAgICAgICByZXR1cm4gJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqUXVlcnl9ICRjaGVja2JveFxuICAgICAqL1xuICAgIHRhYmxlSGFuZGxlci5jaGVja0NoZWNrYm94ID0gZnVuY3Rpb24gKCRjaGVja2JveCkge1xuICAgICAgICB2YXIgY2hlY2tlZFN0YXRlID0gdGFibGVIYW5kbGVyLmdldEluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSgpID09PSBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ7XG4gICAgICAgICRjaGVja2JveC5wcm9wKCdjaGVja2VkJywgY2hlY2tlZFN0YXRlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtqUXVlcnl9ICRjaGVja2JveFxuICAgICAqL1xuICAgIHRhYmxlSGFuZGxlci51bkNoZWNrQ2hlY2tib3ggPSBmdW5jdGlvbiAoJGNoZWNrYm94KSB7XG4gICAgICAgIHZhciBjaGVja2VkU3RhdGUgPSB0YWJsZUhhbmRsZXIuZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlKCkgIT09IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRDtcbiAgICAgICAgJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCBjaGVja2VkU3RhdGUpO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGFibGVIYW5kbGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc291cmNlVGFibGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25UYWJsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbENhcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGFiZWxJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtRmllbGRJZFxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uUmVtb3ZlQ2FsbGJhY2tcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1RhYmxlSGFuZGxlcn1cbiAgICAgKi9cbiAgICBjcmVhdGU6IGZ1bmN0aW9uIChzb3VyY2VUYWJsZSwgZGVzdGluYXRpb25UYWJsZSwgbGFiZWxDYXB0aW9uLCBsYWJlbElkLCBmb3JtRmllbGRJZCwgb25SZW1vdmVDYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gbmV3IFRhYmxlSGFuZGxlcihzb3VyY2VUYWJsZSwgZGVzdGluYXRpb25UYWJsZSwgbGFiZWxDYXB0aW9uLCBsYWJlbElkLCBmb3JtRmllbGRJZCwgb25SZW1vdmVDYWxsYmFjayk7XG4gICAgfSxcbiAgICBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQ6IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCxcbiAgICBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ6IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNy1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBUYWJsZUhhbmRsZXIgPSByZXF1aXJlKCcuL3RhYmxlLWhhbmRsZXInKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlVGFibGVTZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvclxuICogQHBhcmFtIHtzdHJpbmd9IGNoZWNrYm94U2VsZWN0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbENhcHRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBsYWJlbElkXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybUZpZWxkSWRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uUmVtb3ZlQ2FsbGJhY2tcbiAqXG4gKiBAcmV0dXJuIHtUYWJsZUhhbmRsZXJ9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZShcbiAgICBzb3VyY2VUYWJsZVNlbGVjdG9yLFxuICAgIGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvcixcbiAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgIGxhYmVsQ2FwdGlvbixcbiAgICBsYWJlbElkLFxuICAgIGZvcm1GaWVsZElkLFxuICAgIG9uUmVtb3ZlQ2FsbGJhY2ssXG4pIHtcbiAgICAkKGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvcikuRGF0YVRhYmxlKHsgZGVzdHJveTogdHJ1ZSB9KTtcblxuICAgIHZhciB0YWJsZUhhbmRsZXIgPSBUYWJsZUhhbmRsZXIuY3JlYXRlKFxuICAgICAgICAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpLFxuICAgICAgICAkKGRlc3RpbmF0aW9uVGFibGVTZWxlY3RvciksXG4gICAgICAgIGxhYmVsQ2FwdGlvbixcbiAgICAgICAgbGFiZWxJZCxcbiAgICAgICAgZm9ybUZpZWxkSWQsXG4gICAgICAgIG9uUmVtb3ZlQ2FsbGJhY2ssXG4gICAgKTtcblxuICAgICQoc291cmNlVGFibGVTZWxlY3RvcilcbiAgICAgICAgLkRhdGFUYWJsZSgpXG4gICAgICAgIC5vbignZHJhdycsIGZ1bmN0aW9uIChldmVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgICQoY2hlY2tib3hTZWxlY3RvciwgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSkub2ZmKCdjaGFuZ2UnKTtcbiAgICAgICAgICAgICQoY2hlY2tib3hTZWxlY3RvciwgJChzb3VyY2VUYWJsZVNlbGVjdG9yKSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGNoZWNrYm94ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9ICQucGFyc2VKU09OKCRjaGVja2JveC5hdHRyKCdkYXRhLWluZm8nKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFibGVIYW5kbGVyLmlzQ2hlY2tib3hBY3RpdmUoJGNoZWNrYm94KSkge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZUhhbmRsZXIuYWRkU2VsZWN0ZWRQcm9kdWN0KGluZm8uaWQsIGluZm8uc2t1LCBpbmZvLm5hbWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSGFuZGxlci5yZW1vdmVTZWxlY3RlZFByb2R1Y3QoaW5mby5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0dGluZ3MuanNvbi5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSBzZXR0aW5ncy5qc29uLmRhdGFbaV07XG4gICAgICAgICAgICAgICAgdmFyIGlkUHJvZHVjdCA9IHBhcnNlSW50KHByb2R1Y3RbMV0sIDEwKTtcblxuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9IHRhYmxlSGFuZGxlci5nZXRTZWxlY3RvcigpO1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5pc1Byb2R1Y3RTZWxlY3RlZChpZFByb2R1Y3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlSGFuZGxlci5jaGVja0NoZWNrYm94KCQoJ2lucHV0W3ZhbHVlPVwiJyArIGlkUHJvZHVjdCArICdcIl0nLCAkKHNvdXJjZVRhYmxlU2VsZWN0b3IpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHJldHVybiB0YWJsZUhhbmRsZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNyZWF0ZTogY3JlYXRlLFxuICAgIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRDogVGFibGVIYW5kbGVyLkNIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCxcbiAgICBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQ6IFRhYmxlSGFuZGxlci5DSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOX0NIRUNLRUQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvZm9ybS9tYWluJyk7XG4iXSwibmFtZXMiOlsiUmVsYXRlZFByb2R1Y3RUYWJsZSIsInJlcXVpcmUiLCJzb3VyY2VUYWJTZWxlY3RvciIsInNvdXJjZVRhYmxlU2VsZWN0b3IiLCJkZXN0aW5hdGlvblRhYlNlbGVjdG9yIiwiZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yIiwiZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yIiwiY2hlY2tib3hTZWxlY3RvciIsInRhYmxlSGFuZGxlciIsImluaXRpYWxpemUiLCJjcmVhdGUiLCIkIiwidGV4dCIsIm9uUmVtb3ZlIiwiZ2V0SW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlIiwiQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEIiwib24iLCJkZVNlbGVjdEFsbCIsIiRsaW5rIiwiaWQiLCJkYXRhIiwiYWN0aW9uIiwiZGF0YVRhYmxlIiwiRGF0YVRhYmxlIiwicm93IiwicGFyZW50cyIsInJlbW92ZSIsImRyYXciLCJnZXRTZWxlY3RvciIsInJlbW92ZVByb2R1Y3RGcm9tU2VsZWN0aW9uIiwidXBkYXRlU2VsZWN0ZWRQcm9kdWN0c0xhYmVsQ291bnQiLCJwcm9wIiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGVjdEFsbCIsInZhbGlkRnJvbVNlbGVjdG9yIiwidmFsaWRUb1NlbGVjdG9yIiwiaW5pdERhdGVQaWNrZXIiLCJlIiwic2VsZWN0ZWREYXRlIiwiZGF0ZXBpY2tlciIsInNldERhdGUiLCJnZXREYXRlIiwibm9kZVNlbGVjdG9yIiwib25DbG9zZUNhbGxiYWNrIiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwiY2hhbmdlWWVhciIsIm51bWJlck9mTW9udGhzIiwiZGVmYXVsdERhdGUiLCJvbkNsb3NlIiwiZGF0ZVBpY2tlciIsImF2YWlsYWJsZVByb2R1Y3RUYWJsZSIsImFzc2lnbmVkUHJvZHVjdFRhYmxlIiwiZG9jdW1lbnQiLCJyZWFkeSIsIlByb2R1Y3RTZWxlY3RvciIsInByb2R1Y3RTZWxlY3RvciIsInNlbGVjdGVkUHJvZHVjdHMiLCJpZEtleSIsImFkZFByb2R1Y3RUb1NlbGVjdGlvbiIsImlkUHJvZHVjdCIsImlzUHJvZHVjdFNlbGVjdGVkIiwiaGFzT3duUHJvcGVydHkiLCJjbGVhckFsbFNlbGVjdGlvbnMiLCJhZGRBbGxUb1NlbGVjdGlvbiIsImkiLCJsZW5ndGgiLCJnZXRTZWxlY3RlZCIsIkNIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5fQ0hFQ0tFRCIsIlRhYmxlSGFuZGxlciIsInNvdXJjZVRhYmxlIiwiZGVzdGluYXRpb25UYWJsZSIsImxhYmVsQ2FwdGlvbiIsImxhYmVsSWQiLCJmb3JtRmllbGRJZCIsIm9uUmVtb3ZlQ2FsbGJhY2siLCJkZXN0aW5hdGlvblRhYmxlUHJvZHVjdFNlbGVjdG9yIiwidG9nZ2xlU2VsZWN0aW9uIiwiZWFjaCIsImluZGV4IiwiY2hlY2tib3hOb2RlIiwiJGNoZWNrYm94IiwidHJpZ2dlciIsImFkZFNlbGVjdGVkUHJvZHVjdCIsInNrdSIsIm5hbWUiLCJwYXJzZUludCIsImFkZCIsImRlY29kZVVSSUNvbXBvbmVudCIsIlN0cmluZyIsInJlcGxhY2UiLCJvZmYiLCJyZW1vdmVTZWxlY3RlZFByb2R1Y3QiLCJyb3dzIiwiZXZlcnkiLCJyb3dJbmRleCIsInRhYmxlTG9vcCIsInJvd0xvb3AiLCJyb3dQcm9kdWN0SWQiLCJ1bkNoZWNrQ2hlY2tib3giLCJnZXRMYWJlbElkIiwiT2JqZWN0Iiwia2V5cyIsInByb2R1Y3RJZHMiLCJzIiwiam9pbiIsImZpZWxkIiwiZ2V0Rm9ybUZpZWxkSWQiLCJhdHRyIiwiZ2V0TGFiZWxDYXB0aW9uIiwiZ2V0U291cmNlVGFibGUiLCJnZXREZXN0aW5hdGlvblRhYmxlIiwiaXNDaGVja2JveEFjdGl2ZSIsImNoZWNrQ2hlY2tib3giLCJjaGVja2VkU3RhdGUiLCJkZXN0cm95IiwiZXZlbnQiLCJzZXR0aW5ncyIsImluZm8iLCJwYXJzZUpTT04iLCJqc29uIiwicHJvZHVjdCIsInNlbGVjdG9yIl0sInNvdXJjZVJvb3QiOiIifQ==