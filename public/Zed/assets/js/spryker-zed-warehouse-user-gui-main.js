"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-warehouse-user-gui-main"],{

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/assigned-warehouse-table.js":
/*!*********************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/assigned-warehouse-table.js ***!
  \*********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const {
  RelatedWarehouseTable,
  CHECKBOX_CHECKED_STATE_CHECKED
} = __webpack_require__(/*! ./related-warehouse-table/related-warehouse-table */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/related-warehouse-table.js");
function AssignedWarehouseTable() {
  const _self = this;
  this.sourceTabSelector = '#assigned-tab';
  this.sourceTableSelector = `${this.sourceTabSelector} .table`;
  this.deselectAllButtonSelector = `${this.sourceTabSelector} .js-de-select-all-button`;
  this.destinationTabSelector = '#deassigned-tab';
  this.destinationTabLabelSelector = `${this.destinationTabSelector}-label`;
  this.destinationTableSelector = `${this.destinationTabSelector}-table`;
  this.formFieldSelector = '#warehouseUser_uuidsWarehousesToDeassign';
  this.checkboxSelector = '.js-warehouse-checkbox';
  this.relatedWarehouseTable = null;
  this.init = () => {
    this.relatedWarehouseTable = new RelatedWarehouseTable({
      $sourceTable: $(this.sourceTableSelector),
      $destinationTable: $(this.destinationTableSelector),
      $label: $(this.destinationTabLabelSelector),
      $formField: $(this.formFieldSelector),
      checkboxSelector: this.checkboxSelector,
      labelCaption: $(this.destinationTabLabelSelector).text(),
      initialCheckboxCheckedState: CHECKBOX_CHECKED_STATE_CHECKED,
      onRemoveCallback: this.onRemove
    });
    $(this.deselectAllButtonSelector).on('click', () => this.relatedWarehouseTable.tableHandler.toggleCheckboxes(false));
  };
  this.onRemove = function () {
    const uuid = $(this).data('uuid');
    const tableHandler = _self.relatedWarehouseTable.tableHandler;
    $(_self.destinationTableSelector).DataTable().row($(this).parents('tr')).remove().draw();
    tableHandler.warehouseIdSelector.removeIdFromSelection(uuid);
    tableHandler.updateSelectedWarehousesLabelCount();
    $(`input[value="${uuid}"]`, $(_self.sourceTableSelector)).prop('checked', true);
  };
  this.init();
}
module.exports = AssignedWarehouseTable;

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/available-warehouse-table.js":
/*!**********************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/available-warehouse-table.js ***!
  \**********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const {
  RelatedWarehouseTable
} = __webpack_require__(/*! ./related-warehouse-table/related-warehouse-table */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/related-warehouse-table.js");
function AvailableWarehouseTable() {
  const _self = this;
  this.sourceTabSelector = '#available-tab';
  this.sourceTableSelector = `${this.sourceTabSelector} .table`;
  this.selectAllButtonSelector = `${this.sourceTabSelector} .js-select-all-button`;
  this.destinationTabSelector = '#to-be-assigned-tab';
  this.destinationTabLabelSelector = `${this.destinationTabSelector}-label`;
  this.destinationTableSelector = `${this.destinationTabSelector}-table`;
  this.formFieldSelector = '#warehouseUser_uuidsWarehousesToAssign';
  this.checkboxSelector = '.js-warehouse-checkbox';
  this.relatedWarehouseTable = null;
  this.init = () => {
    this.relatedWarehouseTable = new RelatedWarehouseTable({
      $sourceTable: $(this.sourceTableSelector),
      $destinationTable: $(this.destinationTableSelector),
      $label: $(this.destinationTabLabelSelector),
      $formField: $(this.formFieldSelector),
      checkboxSelector: this.checkboxSelector,
      labelCaption: $(this.destinationTabLabelSelector).text(),
      onRemoveCallback: this.onRemove
    });
    $(this.selectAllButtonSelector).on('click', () => this.relatedWarehouseTable.tableHandler.toggleCheckboxes(true));
  };
  this.onRemove = function () {
    const uuid = $(this).data('uuid');
    const tableHandler = _self.relatedWarehouseTable.tableHandler;
    $(_self.destinationTableSelector).DataTable().row($(this).parents('tr')).remove().draw();
    tableHandler.warehouseIdSelector.removeIdFromSelection(uuid);
    tableHandler.updateSelectedWarehousesLabelCount();
    $(`input[value="${uuid}"]`, $(_self.sourceTableSelector)).prop('checked', false);
  };
  this.init();
}
module.exports = AvailableWarehouseTable;

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/main.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/main.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const AvailableWarehouseTable = __webpack_require__(/*! ./available-warehouse-table */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/available-warehouse-table.js");
const AssignedWarehouseTable = __webpack_require__(/*! ./assigned-warehouse-table */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/assigned-warehouse-table.js");
$(document).ready(() => {
  new AvailableWarehouseTable();
  new AssignedWarehouseTable();
});

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/related-warehouse-table.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/related-warehouse-table.js ***!
  \********************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const {
  TableHandler,
  CHECKBOX_CHECKED_STATE_CHECKED
} = __webpack_require__(/*! ./table-handler */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/table-handler.js");

/**
 * @param {Object} options
 * @param {jQuery} options.$sourceTable
 * @param {jQuery} options.$destinationTable
 * @param {jQuery} options.$label
 * @param {jQuery} options.$formField
 * @param {string} options.checkboxSelector
 * @param {string} options.labelCaption
 * @param {string} [options.initialCheckboxCheckedState]
 * @param {function} options.onRemoveCallback
 */
function RelatedWarehouseTable(options) {
  const _self = this;
  this.tableHandler = null;
  $.extend(this, options);
  this.init = () => {
    this.$destinationTable.DataTable({
      destroy: true
    });
    this.tableHandler = new TableHandler({
      $sourceTable: this.$sourceTable,
      $destinationTable: this.$destinationTable,
      $label: this.$label,
      $formField: this.$formField,
      labelCaption: this.labelCaption,
      initialCheckboxCheckedState: this.initialCheckboxCheckedState,
      onRemoveCallback: this.onRemoveCallback
    });
    this.$sourceTable.DataTable().on('draw', (event, settings) => {
      $(_self.checkboxSelector, $(_self.$sourceTable)).off('change');
      $(_self.checkboxSelector, $(_self.$sourceTable)).on('change', function () {
        const info = $.parseJSON($(this).attr('data-info'));
        if (_self.tableHandler.isCheckboxActive($(this))) {
          _self.tableHandler.addSelectedWarehouse(info.idWarehouse, info.warehouseUuid, info.name, info.status);
        } else {
          _self.tableHandler.removeSelectedWarehouse(info.idWarehouse, info.warehouseUuid);
        }
      });
    });
  };
  this.init();
}
module.exports = {
  RelatedWarehouseTable,
  CHECKBOX_CHECKED_STATE_CHECKED
};

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/table-handler.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/table-handler.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const WarehouseIdSelector = __webpack_require__(/*! ./warehouse-id-selector */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/warehouse-id-selector.js");
const CHECKBOX_CHECKED_STATE_CHECKED = 'checked';
const CHECKBOX_CHECKED_STATE_UNCHECKED = 'unchecked';

/**
 * @param {Object} options
 * @param {jQuery} options.$sourceTable
 * @param {jQuery} options.$destinationTable
 * @param {jQuery} options.$label
 * @param {jQuery} options.$formField
 * @param {string} options.labelCaption
 * @param {string} [options.initialCheckboxCheckedState]
 * @param {function} options.onRemoveCallback
 */
function TableHandler(options) {
  const _self = this;
  this.warehouseIdSelector = new WarehouseIdSelector();
  this.initialCheckboxCheckedState = CHECKBOX_CHECKED_STATE_UNCHECKED;
  $.extend(this, options);
  this.addSelectedWarehouse = (idWarehouse, warehouseUuid, name, status) => {
    if (this.warehouseIdSelector.isIdSelected(warehouseUuid)) {
      return;
    }
    this.warehouseIdSelector.addIdToSelection(warehouseUuid);
    this.$destinationTable.DataTable().row.add([idWarehouse, decodeURIComponent(String(name).replace(/\+/g, '%20')), decodeURIComponent(String(status).replace(/\+/g, '%20')), `<button data-uuid="${warehouseUuid}" type="button" class="btn btn-xs remove-item">
                    ${this.$destinationTable.attr('data-remove-button-text')}
                </button>`]).draw();
    $('.remove-item').off('click');
    $('.remove-item').on('click', this.onRemoveCallback);
    this.updateSelectedWarehousesLabelCount();
  };
  this.removeSelectedWarehouse = (idWarehouse, warehouseUuid) => {
    this.$destinationTable.DataTable().rows().every(function () {
      if (!this.data() || idWarehouse !== this.data()[0]) {
        return;
      }
      _self.warehouseIdSelector.removeIdFromSelection(warehouseUuid);
      this.remove();
    }).draw();
    this.updateSelectedWarehousesLabelCount();
  };
  this.updateSelectedWarehousesLabelCount = () => {
    const warehouseIds = Object.keys(this.warehouseIdSelector.getSelectedIds());
    this.$label.text(warehouseIds.length ? `${this.labelCaption} (${warehouseIds.length})` : this.labelCaption);
    this.$formField.attr('value', warehouseIds.join(','));
  };
  this.isCheckboxActive = $checkbox => {
    if (this.initialCheckboxCheckedState === CHECKBOX_CHECKED_STATE_UNCHECKED) {
      return $checkbox.prop('checked');
    }
    return !$checkbox.prop('checked');
  };
  this.toggleCheckboxes = isChecked => {
    $('input[type="checkbox"]', this.$sourceTable).each((index, checkbox) => {
      $(checkbox).prop('checked', isChecked);
      $(checkbox).trigger('change');
    });
  };
}
module.exports = {
  TableHandler,
  CHECKBOX_CHECKED_STATE_CHECKED
};

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/warehouse-id-selector.js":
/*!******************************************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/related-warehouse-table/warehouse-id-selector.js ***!
  \******************************************************************************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function WarehouseIdSelector() {
  this.selectedIds = {};
  this.addIdToSelection = id => {
    this.selectedIds[id] = id;
  };
  this.removeIdFromSelection = id => {
    delete this.selectedIds[id];
  };
  this.isIdSelected = id => this.selectedIds.hasOwnProperty(id);
  this.getSelectedIds = () => this.selectedIds;
}
module.exports = WarehouseIdSelector;

/***/ }),

/***/ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/spryker-zed-warehouse-user-gui-main.entry.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/warehouse-user-gui/assets/Zed/js/spryker-zed-warehouse-user-gui-main.entry.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/warehouse-user-gui/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/warehouse-user-gui/assets/Zed/js/spryker-zed-warehouse-user-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC13YXJlaG91c2UtdXNlci1ndWktbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsTUFBTTtFQUNGQSxxQkFBcUI7RUFDckJDO0FBQ0osQ0FBQyxHQUFHQyxtQkFBTyxDQUFDLHVLQUFtRCxDQUFDO0FBRWhFLFNBQVNDLHNCQUFzQkEsQ0FBQSxFQUFHO0VBQzlCLE1BQU1DLEtBQUssR0FBRyxJQUFJO0VBQ2xCLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsZUFBZTtFQUN4QyxJQUFJLENBQUNDLG1CQUFtQixHQUFJLEdBQUUsSUFBSSxDQUFDRCxpQkFBa0IsU0FBUTtFQUM3RCxJQUFJLENBQUNFLHlCQUF5QixHQUFJLEdBQUUsSUFBSSxDQUFDRixpQkFBa0IsMkJBQTBCO0VBQ3JGLElBQUksQ0FBQ0csc0JBQXNCLEdBQUcsaUJBQWlCO0VBQy9DLElBQUksQ0FBQ0MsMkJBQTJCLEdBQUksR0FBRSxJQUFJLENBQUNELHNCQUF1QixRQUFPO0VBQ3pFLElBQUksQ0FBQ0Usd0JBQXdCLEdBQUksR0FBRSxJQUFJLENBQUNGLHNCQUF1QixRQUFPO0VBQ3RFLElBQUksQ0FBQ0csaUJBQWlCLEdBQUcsMENBQTBDO0VBQ25FLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQUcsd0JBQXdCO0VBQ2hELElBQUksQ0FBQ0MscUJBQXFCLEdBQUcsSUFBSTtFQUVqQyxJQUFJLENBQUNDLElBQUksR0FBRyxNQUFNO0lBQ2QsSUFBSSxDQUFDRCxxQkFBcUIsR0FBRyxJQUFJYixxQkFBcUIsQ0FBQztNQUNuRGUsWUFBWSxFQUFFQyxDQUFDLENBQUMsSUFBSSxDQUFDVixtQkFBbUIsQ0FBQztNQUN6Q1csaUJBQWlCLEVBQUVELENBQUMsQ0FBQyxJQUFJLENBQUNOLHdCQUF3QixDQUFDO01BQ25EUSxNQUFNLEVBQUVGLENBQUMsQ0FBQyxJQUFJLENBQUNQLDJCQUEyQixDQUFDO01BQzNDVSxVQUFVLEVBQUVILENB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QixJQUFJLENBQUNuQixnQkFBZ0IsR0FBSW9CLEVBQUUsSUFBSztJQUM1QixJQUFJLENBQUNELFdBQVcsQ0FBQ0MsRUFBRSxDQUFDLEdBQUdBLEVBQUU7RUFDN0IsQ0FBQztFQUVELElBQUksQ0FBQ2pELHFCQUFxQixHQUFJaUQsRUFBRSxJQUFLO0lBQ2pDLE9BQU8sSUFBSSxDQUFDRCxXQUFXLENBQUNDLEVBQUUsQ0FBQztFQUMvQixDQUFDO0VBRUQsSUFBSSxDQUFDckIsWUFBWSxHQUFJcUIsRUFBRSxJQUFLLElBQUksQ0FBQ0QsV0FBVyxDQUFDRSxjQUFjLENBQUNELEVBQUUsQ0FBQztFQUUvRCxJQUFJLENBQUNWLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQ1MsV0FBVztBQUNoRDtBQUVBN0MsTUFBTSxDQUFDQyxPQUFPLEdBQUdzQixtQkFBbUI7Ozs7Ozs7Ozs7QUN2QnBDO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViNUQsbUJBQU8sQ0FBQyx5RkFBZ0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3dhcmVob3VzZS11c2VyLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWduZWQtd2FyZWhvdXNlLXRhYmxlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3dhcmVob3VzZS11c2VyLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXZhaWxhYmxlLXdhcmVob3VzZS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci93YXJlaG91c2UtdXNlci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvd2FyZWhvdXNlLXVzZXItZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9yZWxhdGVkLXdhcmVob3VzZS10YWJsZS9yZWxhdGVkLXdhcmVob3VzZS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci93YXJlaG91c2UtdXNlci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3JlbGF0ZWQtd2FyZWhvdXNlLXRhYmxlL3RhYmxlLWhhbmRsZXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvd2FyZWhvdXNlLXVzZXItZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9yZWxhdGVkLXdhcmVob3VzZS10YWJsZS93YXJlaG91c2UtaWQtc2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvd2FyZWhvdXNlLXVzZXItZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtd2FyZWhvdXNlLXVzZXItZ3VpLW1haW4uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7XG4gICAgUmVsYXRlZFdhcmVob3VzZVRhYmxlLFxuICAgIENIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCxcbn0gPSByZXF1aXJlKCcuL3JlbGF0ZWQtd2FyZWhvdXNlLXRhYmxlL3JlbGF0ZWQtd2FyZWhvdXNlLXRhYmxlJyk7XG5cbmZ1bmN0aW9uIEFzc2lnbmVkV2FyZWhvdXNlVGFibGUoKSB7XG4gICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgIHRoaXMuc291cmNlVGFiU2VsZWN0b3IgPSAnI2Fzc2lnbmVkLXRhYic7XG4gICAgdGhpcy5zb3VyY2VUYWJsZVNlbGVjdG9yID0gYCR7dGhpcy5zb3VyY2VUYWJTZWxlY3Rvcn0gLnRhYmxlYDtcbiAgICB0aGlzLmRlc2VsZWN0QWxsQnV0dG9uU2VsZWN0b3IgPSBgJHt0aGlzLnNvdXJjZVRhYlNlbGVjdG9yfSAuanMtZGUtc2VsZWN0LWFsbC1idXR0b25gO1xuICAgIHRoaXMuZGVzdGluYXRpb25UYWJTZWxlY3RvciA9ICcjZGVhc3NpZ25lZC10YWInO1xuICAgIHRoaXMuZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yID0gYCR7dGhpcy5kZXN0aW5hdGlvblRhYlNlbGVjdG9yfS1sYWJlbGA7XG4gICAgdGhpcy5kZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IgPSBgJHt0aGlzLmRlc3RpbmF0aW9uVGFiU2VsZWN0b3J9LXRhYmxlYDtcbiAgICB0aGlzLmZvcm1GaWVsZFNlbGVjdG9yID0gJyN3YXJlaG91c2VVc2VyX3V1aWRzV2FyZWhvdXNlc1RvRGVhc3NpZ24nO1xuICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvciA9ICcuanMtd2FyZWhvdXNlLWNoZWNrYm94JztcbiAgICB0aGlzLnJlbGF0ZWRXYXJlaG91c2VUYWJsZSA9IG51bGw7XG5cbiAgICB0aGlzLmluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVsYXRlZFdhcmVob3VzZVRhYmxlID0gbmV3IFJlbGF0ZWRXYXJlaG91c2VUYWJsZSh7XG4gICAgICAgICAgICAkc291cmNlVGFibGU6ICQodGhpcy5zb3VyY2VUYWJsZVNlbGVjdG9yKSxcbiAgICAgICAgICAgICRkZXN0aW5hdGlvblRhYmxlOiAkKHRoaXMuZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yKSxcbiAgICAgICAgICAgICRsYWJlbDogJCh0aGlzLmRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciksXG4gICAgICAgICAgICAkZm9ybUZpZWxkOiAkKHRoaXMuZm9ybUZpZWxkU2VsZWN0b3IpLFxuICAgICAgICAgICAgY2hlY2tib3hTZWxlY3RvcjogdGhpcy5jaGVja2JveFNlbGVjdG9yLFxuICAgICAgICAgICAgbGFiZWxDYXB0aW9uOiAkKHRoaXMuZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yKS50ZXh0KCksXG4gICAgICAgICAgICBpbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGU6IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCxcbiAgICAgICAgICAgIG9uUmVtb3ZlQ2FsbGJhY2s6IHRoaXMub25SZW1vdmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGhpcy5kZXNlbGVjdEFsbEJ1dHRvblNlbGVjdG9yKS5vbignY2xpY2snLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5yZWxhdGVkV2FyZWhvdXNlVGFibGUudGFibGVIYW5kbGVyLnRvZ2dsZUNoZWNrYm94ZXMoZmFsc2UpLFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLm9uUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB1dWlkID0gJCh0aGlzKS5kYXRhKCd1dWlkJyk7XG4gICAgICAgIGNvbnN0IHRhYmxlSGFuZGxlciA9IF9zZWxmLnJlbGF0ZWRXYXJlaG91c2VUYWJsZS50YWJsZUhhbmRsZXI7XG5cbiAgICAgICAgJChfc2VsZi5kZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpLnJvdygkKHRoaXMpLnBhcmVudHMoJ3RyJykpLnJlbW92ZSgpLmRyYXcoKTtcbiAgICAgICAgdGFibGVIYW5kbGVyLndhcmVob3VzZUlkU2VsZWN0b3IucmVtb3ZlSWRGcm9tU2VsZWN0aW9uKHV1aWQpO1xuICAgICAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRXYXJlaG91c2VzTGFiZWxDb3VudCgpO1xuICAgICAgICAkKGBpbnB1dFt2YWx1ZT1cIiR7dXVpZH1cIl1gLCAkKF9zZWxmLnNvdXJjZVRhYmxlU2VsZWN0b3IpKS5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2lnbmVkV2FyZWhvdXNlVGFibGU7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgUmVsYXRlZFdhcmVob3VzZVRhYmxlIH0gPSByZXF1aXJlKCcuL3JlbGF0ZWQtd2FyZWhvdXNlLXRhYmxlL3JlbGF0ZWQtd2FyZWhvdXNlLXRhYmxlJyk7XG5cbmZ1bmN0aW9uIEF2YWlsYWJsZVdhcmVob3VzZVRhYmxlKCkge1xuICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICB0aGlzLnNvdXJjZVRhYlNlbGVjdG9yID0gJyNhdmFpbGFibGUtdGFiJztcbiAgICB0aGlzLnNvdXJjZVRhYmxlU2VsZWN0b3IgPSBgJHt0aGlzLnNvdXJjZVRhYlNlbGVjdG9yfSAudGFibGVgO1xuICAgIHRoaXMuc2VsZWN0QWxsQnV0dG9uU2VsZWN0b3IgPSBgJHt0aGlzLnNvdXJjZVRhYlNlbGVjdG9yfSAuanMtc2VsZWN0LWFsbC1idXR0b25gO1xuICAgIHRoaXMuZGVzdGluYXRpb25UYWJTZWxlY3RvciA9ICcjdG8tYmUtYXNzaWduZWQtdGFiJztcbiAgICB0aGlzLmRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciA9IGAke3RoaXMuZGVzdGluYXRpb25UYWJTZWxlY3Rvcn0tbGFiZWxgO1xuICAgIHRoaXMuZGVzdGluYXRpb25UYWJsZVNlbGVjdG9yID0gYCR7dGhpcy5kZXN0aW5hdGlvblRhYlNlbGVjdG9yfS10YWJsZWA7XG4gICAgdGhpcy5mb3JtRmllbGRTZWxlY3RvciA9ICcjd2FyZWhvdXNlVXNlcl91dWlkc1dhcmVob3VzZXNUb0Fzc2lnbic7XG4gICAgdGhpcy5jaGVja2JveFNlbGVjdG9yID0gJy5qcy13YXJlaG91c2UtY2hlY2tib3gnO1xuICAgIHRoaXMucmVsYXRlZFdhcmVob3VzZVRhYmxlID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZWxhdGVkV2FyZWhvdXNlVGFibGUgPSBuZXcgUmVsYXRlZFdhcmVob3VzZVRhYmxlKHtcbiAgICAgICAgICAgICRzb3VyY2VUYWJsZTogJCh0aGlzLnNvdXJjZVRhYmxlU2VsZWN0b3IpLFxuICAgICAgICAgICAgJGRlc3RpbmF0aW9uVGFibGU6ICQodGhpcy5kZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLFxuICAgICAgICAgICAgJGxhYmVsOiAkKHRoaXMuZGVzdGluYXRpb25UYWJMYWJlbFNlbGVjdG9yKSxcbiAgICAgICAgICAgICRmb3JtRmllbGQ6ICQodGhpcy5mb3JtRmllbGRTZWxlY3RvciksXG4gICAgICAgICAgICBjaGVja2JveFNlbGVjdG9yOiB0aGlzLmNoZWNrYm94U2VsZWN0b3IsXG4gICAgICAgICAgICBsYWJlbENhcHRpb246ICQodGhpcy5kZXN0aW5hdGlvblRhYkxhYmVsU2VsZWN0b3IpLnRleHQoKSxcbiAgICAgICAgICAgIG9uUmVtb3ZlQ2FsbGJhY2s6IHRoaXMub25SZW1vdmUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGhpcy5zZWxlY3RBbGxCdXR0b25TZWxlY3Rvcikub24oJ2NsaWNrJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMucmVsYXRlZFdhcmVob3VzZVRhYmxlLnRhYmxlSGFuZGxlci50b2dnbGVDaGVja2JveGVzKHRydWUpLFxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLm9uUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB1dWlkID0gJCh0aGlzKS5kYXRhKCd1dWlkJyk7XG4gICAgICAgIGNvbnN0IHRhYmxlSGFuZGxlciA9IF9zZWxmLnJlbGF0ZWRXYXJlaG91c2VUYWJsZS50YWJsZUhhbmRsZXI7XG5cbiAgICAgICAgJChfc2VsZi5kZXN0aW5hdGlvblRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpLnJvdygkKHRoaXMpLnBhcmVudHMoJ3RyJykpLnJlbW92ZSgpLmRyYXcoKTtcbiAgICAgICAgdGFibGVIYW5kbGVyLndhcmVob3VzZUlkU2VsZWN0b3IucmVtb3ZlSWRGcm9tU2VsZWN0aW9uKHV1aWQpO1xuICAgICAgICB0YWJsZUhhbmRsZXIudXBkYXRlU2VsZWN0ZWRXYXJlaG91c2VzTGFiZWxDb3VudCgpO1xuICAgICAgICAkKGBpbnB1dFt2YWx1ZT1cIiR7dXVpZH1cIl1gLCAkKF9zZWxmLnNvdXJjZVRhYmxlU2VsZWN0b3IpKS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXQoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBdmFpbGFibGVXYXJlaG91c2VUYWJsZTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgQXZhaWxhYmxlV2FyZWhvdXNlVGFibGUgPSByZXF1aXJlKCcuL2F2YWlsYWJsZS13YXJlaG91c2UtdGFibGUnKTtcbmNvbnN0IEFzc2lnbmVkV2FyZWhvdXNlVGFibGUgPSByZXF1aXJlKCcuL2Fzc2lnbmVkLXdhcmVob3VzZS10YWJsZScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XG4gICAgbmV3IEF2YWlsYWJsZVdhcmVob3VzZVRhYmxlKCk7XG4gICAgbmV3IEFzc2lnbmVkV2FyZWhvdXNlVGFibGUoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IFRhYmxlSGFuZGxlciwgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEIH0gPSByZXF1aXJlKCcuL3RhYmxlLWhhbmRsZXInKTtcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtqUXVlcnl9IG9wdGlvbnMuJHNvdXJjZVRhYmxlXG4gKiBAcGFyYW0ge2pRdWVyeX0gb3B0aW9ucy4kZGVzdGluYXRpb25UYWJsZVxuICogQHBhcmFtIHtqUXVlcnl9IG9wdGlvbnMuJGxhYmVsXG4gKiBAcGFyYW0ge2pRdWVyeX0gb3B0aW9ucy4kZm9ybUZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGVja2JveFNlbGVjdG9yXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5sYWJlbENhcHRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGVdXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uUmVtb3ZlQ2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gUmVsYXRlZFdhcmVob3VzZVRhYmxlKG9wdGlvbnMpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50YWJsZUhhbmRsZXIgPSBudWxsO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuJGRlc3RpbmF0aW9uVGFibGUuRGF0YVRhYmxlKHsgZGVzdHJveTogdHJ1ZSB9KTtcblxuICAgICAgICB0aGlzLnRhYmxlSGFuZGxlciA9IG5ldyBUYWJsZUhhbmRsZXIoe1xuICAgICAgICAgICAgJHNvdXJjZVRhYmxlOiB0aGlzLiRzb3VyY2VUYWJsZSxcbiAgICAgICAgICAgICRkZXN0aW5hdGlvblRhYmxlOiB0aGlzLiRkZXN0aW5hdGlvblRhYmxlLFxuICAgICAgICAgICAgJGxhYmVsOiB0aGlzLiRsYWJlbCxcbiAgICAgICAgICAgICRmb3JtRmllbGQ6IHRoaXMuJGZvcm1GaWVsZCxcbiAgICAgICAgICAgIGxhYmVsQ2FwdGlvbjogdGhpcy5sYWJlbENhcHRpb24sXG4gICAgICAgICAgICBpbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGU6IHRoaXMuaW5pdGlhbENoZWNrYm94Q2hlY2tlZFN0YXRlLFxuICAgICAgICAgICAgb25SZW1vdmVDYWxsYmFjazogdGhpcy5vblJlbW92ZUNhbGxiYWNrLFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRzb3VyY2VUYWJsZS5EYXRhVGFibGUoKS5vbignZHJhdycsIChldmVudCwgc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgICQoX3NlbGYuY2hlY2tib3hTZWxlY3RvciwgJChfc2VsZi4kc291cmNlVGFibGUpKS5vZmYoJ2NoYW5nZScpO1xuXG4gICAgICAgICAgICAkKF9zZWxmLmNoZWNrYm94U2VsZWN0b3IsICQoX3NlbGYuJHNvdXJjZVRhYmxlKSkub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbmZvID0gJC5wYXJzZUpTT04oJCh0aGlzKS5hdHRyKCdkYXRhLWluZm8nKSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoX3NlbGYudGFibGVIYW5kbGVyLmlzQ2hlY2tib3hBY3RpdmUoJCh0aGlzKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYudGFibGVIYW5kbGVyLmFkZFNlbGVjdGVkV2FyZWhvdXNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mby5pZFdhcmVob3VzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8ud2FyZWhvdXNlVXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLnRhYmxlSGFuZGxlci5yZW1vdmVTZWxlY3RlZFdhcmVob3VzZShpbmZvLmlkV2FyZWhvdXNlLCBpbmZvLndhcmVob3VzZVV1aWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0KCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFJlbGF0ZWRXYXJlaG91c2VUYWJsZSxcbiAgICBDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX0NIRUNLRUQsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBXYXJlaG91c2VJZFNlbGVjdG9yID0gcmVxdWlyZSgnLi93YXJlaG91c2UtaWQtc2VsZWN0b3InKTtcblxuY29uc3QgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VEID0gJ2NoZWNrZWQnO1xuY29uc3QgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9VTkNIRUNLRUQgPSAndW5jaGVja2VkJztcblxuLyoqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtqUXVlcnl9IG9wdGlvbnMuJHNvdXJjZVRhYmxlXG4gKiBAcGFyYW0ge2pRdWVyeX0gb3B0aW9ucy4kZGVzdGluYXRpb25UYWJsZVxuICogQHBhcmFtIHtqUXVlcnl9IG9wdGlvbnMuJGxhYmVsXG4gKiBAcGFyYW0ge2pRdWVyeX0gb3B0aW9ucy4kZm9ybUZpZWxkXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5sYWJlbENhcHRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0aW9ucy5pbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGVdXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLm9uUmVtb3ZlQ2FsbGJhY2tcbiAqL1xuZnVuY3Rpb24gVGFibGVIYW5kbGVyKG9wdGlvbnMpIHtcbiAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgdGhpcy53YXJlaG91c2VJZFNlbGVjdG9yID0gbmV3IFdhcmVob3VzZUlkU2VsZWN0b3IoKTtcbiAgICB0aGlzLmluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSA9IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5DSEVDS0VEO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmFkZFNlbGVjdGVkV2FyZWhvdXNlID0gKGlkV2FyZWhvdXNlLCB3YXJlaG91c2VVdWlkLCBuYW1lLCBzdGF0dXMpID0+IHtcbiAgICAgICAgaWYgKHRoaXMud2FyZWhvdXNlSWRTZWxlY3Rvci5pc0lkU2VsZWN0ZWQod2FyZWhvdXNlVXVpZCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2FyZWhvdXNlSWRTZWxlY3Rvci5hZGRJZFRvU2VsZWN0aW9uKHdhcmVob3VzZVV1aWQpO1xuXG4gICAgICAgIHRoaXMuJGRlc3RpbmF0aW9uVGFibGVcbiAgICAgICAgICAgIC5EYXRhVGFibGUoKVxuICAgICAgICAgICAgLnJvdy5hZGQoW1xuICAgICAgICAgICAgICAgIGlkV2FyZWhvdXNlLFxuICAgICAgICAgICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChTdHJpbmcobmFtZSkucmVwbGFjZSgvXFwrL2csICclMjAnKSksXG4gICAgICAgICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyhzdGF0dXMpLnJlcGxhY2UoL1xcKy9nLCAnJTIwJykpLFxuICAgICAgICAgICAgICAgIGA8YnV0dG9uIGRhdGEtdXVpZD1cIiR7d2FyZWhvdXNlVXVpZH1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLXhzIHJlbW92ZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgICR7dGhpcy4kZGVzdGluYXRpb25UYWJsZS5hdHRyKCdkYXRhLXJlbW92ZS1idXR0b24tdGV4dCcpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPmAsXG4gICAgICAgICAgICBdKVxuICAgICAgICAgICAgLmRyYXcoKTtcblxuICAgICAgICAkKCcucmVtb3ZlLWl0ZW0nKS5vZmYoJ2NsaWNrJyk7XG4gICAgICAgICQoJy5yZW1vdmUtaXRlbScpLm9uKCdjbGljaycsIHRoaXMub25SZW1vdmVDYWxsYmFjayk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFdhcmVob3VzZXNMYWJlbENvdW50KCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVtb3ZlU2VsZWN0ZWRXYXJlaG91c2UgPSAoaWRXYXJlaG91c2UsIHdhcmVob3VzZVV1aWQpID0+IHtcbiAgICAgICAgdGhpcy4kZGVzdGluYXRpb25UYWJsZVxuICAgICAgICAgICAgLkRhdGFUYWJsZSgpXG4gICAgICAgICAgICAucm93cygpXG4gICAgICAgICAgICAuZXZlcnkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5kYXRhKCkgfHwgaWRXYXJlaG91c2UgIT09IHRoaXMuZGF0YSgpWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfc2VsZi53YXJlaG91c2VJZFNlbGVjdG9yLnJlbW92ZUlkRnJvbVNlbGVjdGlvbih3YXJlaG91c2VVdWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kcmF3KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFdhcmVob3VzZXNMYWJlbENvdW50KCk7XG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRXYXJlaG91c2VzTGFiZWxDb3VudCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgd2FyZWhvdXNlSWRzID0gT2JqZWN0LmtleXModGhpcy53YXJlaG91c2VJZFNlbGVjdG9yLmdldFNlbGVjdGVkSWRzKCkpO1xuXG4gICAgICAgIHRoaXMuJGxhYmVsLnRleHQod2FyZWhvdXNlSWRzLmxlbmd0aCA/IGAke3RoaXMubGFiZWxDYXB0aW9ufSAoJHt3YXJlaG91c2VJZHMubGVuZ3RofSlgIDogdGhpcy5sYWJlbENhcHRpb24pO1xuICAgICAgICB0aGlzLiRmb3JtRmllbGQuYXR0cigndmFsdWUnLCB3YXJlaG91c2VJZHMuam9pbignLCcpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pc0NoZWNrYm94QWN0aXZlID0gKCRjaGVja2JveCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsQ2hlY2tib3hDaGVja2VkU3RhdGUgPT09IENIRUNLQk9YX0NIRUNLRURfU1RBVEVfVU5DSEVDS0VEKSB7XG4gICAgICAgICAgICByZXR1cm4gJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhJGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnKTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVDaGVja2JveGVzID0gKGlzQ2hlY2tlZCkgPT4ge1xuICAgICAgICAkKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nLCB0aGlzLiRzb3VyY2VUYWJsZSkuZWFjaCgoaW5kZXgsIGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICAkKGNoZWNrYm94KS5wcm9wKCdjaGVja2VkJywgaXNDaGVja2VkKTtcbiAgICAgICAgICAgICQoY2hlY2tib3gpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgICAgICB9KTtcbiAgICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBUYWJsZUhhbmRsZXIsXG4gICAgQ0hFQ0tCT1hfQ0hFQ0tFRF9TVEFURV9DSEVDS0VELFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gV2FyZWhvdXNlSWRTZWxlY3RvcigpIHtcbiAgICB0aGlzLnNlbGVjdGVkSWRzID0ge307XG5cbiAgICB0aGlzLmFkZElkVG9TZWxlY3Rpb24gPSAoaWQpID0+IHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZElkc1tpZF0gPSBpZDtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVJZEZyb21TZWxlY3Rpb24gPSAoaWQpID0+IHtcbiAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0ZWRJZHNbaWRdO1xuICAgIH07XG5cbiAgICB0aGlzLmlzSWRTZWxlY3RlZCA9IChpZCkgPT4gdGhpcy5zZWxlY3RlZElkcy5oYXNPd25Qcm9wZXJ0eShpZCk7XG5cbiAgICB0aGlzLmdldFNlbGVjdGVkSWRzID0gKCkgPT4gdGhpcy5zZWxlY3RlZElkcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBXYXJlaG91c2VJZFNlbGVjdG9yO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIl0sIm5hbWVzIjpbIlJlbGF0ZWRXYXJlaG91c2VUYWJsZSIsIkNIRUNLQk9YX0NIRUNLRURfU1RBVEVfQ0hFQ0tFRCIsInJlcXVpcmUiLCJBc3NpZ25lZFdhcmVob3VzZVRhYmxlIiwiX3NlbGYiLCJzb3VyY2VUYWJTZWxlY3RvciIsInNvdXJjZVRhYmxlU2VsZWN0b3IiLCJkZXNlbGVjdEFsbEJ1dHRvblNlbGVjdG9yIiwiZGVzdGluYXRpb25UYWJTZWxlY3RvciIsImRlc3RpbmF0aW9uVGFiTGFiZWxTZWxlY3RvciIsImRlc3RpbmF0aW9uVGFibGVTZWxlY3RvciIsImZvcm1GaWVsZFNlbGVjdG9yIiwiY2hlY2tib3hTZWxlY3RvciIsInJlbGF0ZWRXYXJlaG91c2VUYWJsZSIsImluaXQiLCIkc291cmNlVGFibGUiLCIkIiwiJGRlc3RpbmF0aW9uVGFibGUiLCIkbGFiZWwiLCIkZm9ybUZpZWxkIiwibGFiZWxDYXB0aW9uIiwidGV4dCIsImluaXRpYWxDaGVja2JveENoZWNrZWRTdGF0ZSIsIm9uUmVtb3ZlQ2FsbGJhY2siLCJvblJlbW92ZSIsIm9uIiwidGFibGVIYW5kbGVyIiwidG9nZ2xlQ2hlY2tib3hlcyIsInV1aWQiLCJkYXRhIiwiRGF0YVRhYmxlIiwicm93IiwicGFyZW50cyIsInJlbW92ZSIsImRyYXciLCJ3YXJlaG91c2VJZFNlbGVjdG9yIiwicmVtb3ZlSWRGcm9tU2VsZWN0aW9uIiwidXBkYXRlU2VsZWN0ZWRXYXJlaG91c2VzTGFiZWxDb3VudCIsInByb3AiLCJtb2R1bGUiLCJleHBvcnRzIiwiQXZhaWxhYmxlV2FyZWhvdXNlVGFibGUiLCJzZWxlY3RBbGxCdXR0b25TZWxlY3RvciIsImRvY3VtZW50IiwicmVhZHkiLCJUYWJsZUhhbmRsZXIiLCJvcHRpb25zIiwiZXh0ZW5kIiwiZGVzdHJveSIsImV2ZW50Iiwic2V0dGluZ3MiLCJvZmYiLCJpbmZvIiwicGFyc2VKU09OIiwiYXR0ciIsImlzQ2hlY2tib3hBY3RpdmUiLCJhZGRTZWxlY3RlZFdhcmVob3VzZSIsImlkV2FyZWhvdXNlIiwid2FyZWhvdXNlVXVpZCIsIm5hbWUiLCJzdGF0dXMiLCJyZW1vdmVTZWxlY3RlZFdhcmVob3VzZSIsIldhcmVob3VzZUlkU2VsZWN0b3IiLCJDSEVDS0JPWF9DSEVDS0VEX1NUQVRFX1VOQ0hFQ0tFRCIsImlzSWRTZWxlY3RlZCIsImFkZElkVG9TZWxlY3Rpb24iLCJhZGQiLCJkZWNvZGVVUklDb21wb25lbnQiLCJTdHJpbmciLCJyZXBsYWNlIiwicm93cyIsImV2ZXJ5Iiwid2FyZWhvdXNlSWRzIiwiT2JqZWN0Iiwia2V5cyIsImdldFNlbGVjdGVkSWRzIiwibGVuZ3RoIiwiam9pbiIsIiRjaGVja2JveCIsImlzQ2hlY2tlZCIsImVhY2giLCJpbmRleCIsImNoZWNrYm94IiwidHJpZ2dlciIsInNlbGVjdGVkSWRzIiwiaWQiLCJoYXNPd25Qcm9wZXJ0eSJdLCJzb3VyY2VSb290IjoiIn0=