"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-configurable-bundle-template-slot"],{

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template-slot/slot-edit.js":
/*!*********************************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template-slot/slot-edit.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectTableAPI = __webpack_require__(/*! ../select-table-api/select-table-api */ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/select-table-api/select-table-api.js");
$(document).ready(function () {
  var availableProductsTable = new SelectTableAPI();
  var assignedProductsTable = new SelectTableAPI();
  availableProductsTable.init('#available-product-concrete-table', '#productsToBeAssigned', '.available-product-concrete-table-all-products-checkbox', 'a[href="#tab-content-assignment_product"]', '#productListAggregate_productIdsToBeAssigned');
  assignedProductsTable.init('#assigned-product-concrete-table', '#productsToBeDeassigned', '.assigned-product-concrete-table-all-products-checkbox', 'a[href="#tab-content-deassignment_product"]', '#productListAggregate_productIdsToBeDeAssigned');
});

/***/ }),

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/select-table-api/select-table-api.js":
/*!***********************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/select-table-api/select-table-api.js ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectTableAPI = function () {
  this.selectedProductsData = [];
  this.removeBtnSelector = '.js-remove-item';
  this.removeBtnTemplate = '<a href="#" class="js-remove-item btn-xs">Remove</a>';
  this.counterSelector = '.js-counter';
  this.counterTemplate = '<span class="js-counter"></span>';
  this.initialDataLoaded = false;

  /**
   * Init all table adding functionality.
   * @param {string} productTable - Current table with products.
   * @param {string} selectedProductsTable - Table where should product be added.
   * @param {string} checkboxSelector - Checkbox selector.
   * @param {string} counterLabelSelector - Tabs label where will be added count of select products.
   * @param {string} inputWithSelectedProducts - In this input will putted all selected product ids.
   */
  this.init = function (productTable, selectedProductsTable, checkboxSelector, counterLabelSelector, inputWithSelectedProducts) {
    this.$productTable = $(productTable);
    this.$selectedProductsTable = $(selectedProductsTable);
    this.$counterLabel = $(counterLabelSelector);
    this.$inputWithSelectedProducts = $(inputWithSelectedProducts);
    this.checkboxSelector = checkboxSelector;
    this.counterSelector = counterLabelSelector + ' ' + this.counterSelector;
    this.drawProductsTable();
    this.addRemoveButtonClickHandler();
    this.addCounterToLabel();
  };
  this.selectProductsOnLoad = function (initialSelectedProductsData) {
    if (this.initialDataLoaded) {
      return;
    }
    var data = initialSelectedProductsData.replace(/&quot;/g, '"').replace(/,/g, '');
    var parsedData = JSON.parse(data);
    for (var i = 0; i < parsedData.length; i++) {
      parsedData[i].push('');
      this.addRow(parsedData[i]);
    }
    this.initialDataLoaded = true;
  };

  /**
   * Draw method of DataTable. Fires every time table rerender.
   */
  this.drawProductsTable = function () {
    var self = this,
      productTableData = self.$productTable.DataTable();
    productTableData.on('draw', function (event, settings) {
      self.updateCheckboxes();
      self.mapEventsToCheckboxes(productTableData, $(self.checkboxSelector));
      if (self.$inputWithSelectedProducts && initialSelectedProductsData) {
        var initialSelectedProductsData = self.$inputWithSelectedProducts.val();
        self.selectProductsOnLoad(initialSelectedProductsData);
        self.$inputWithSelectedProducts.val('');
      }
    });
  };

  /**
   * Add change event for all checkboxes checkbox. Fires every time, when product table redraws.
   * @param {object} productTableData - DataTable options ( get by $(element).DataTable() ).
   * @param {checkboxes} checkboxes - Collection of all checkboxes in Product Table.
   */
  this.mapEventsToCheckboxes = function (productTableData, checkboxes) {
    var self = this;
    checkboxes.off('change');
    checkboxes.on('change', function () {
      var rowIndex = checkboxes.index($(this)),
        rowData = productTableData.data()[rowIndex],
        id = rowData[0];
      if ($(this).is(':checked')) {
        return self.addRow(rowData);
      }
      return self.removeRow(id);
    });
  };

  /**
   * Check for selected products in product table.
   */
  this.updateCheckboxes = function () {
    var productTable = this.$productTable.DataTable(),
      productTableData = productTable.data();
    for (var i = 0; i < productTableData.length; i++) {
      var productItemData = productTableData[i],
        productItemId = productItemData[0],
        checkBox = $(productTable.row(i).node()).find('[type="checkbox"]');
      checkBox.prop('checked', false);
      this.findSelectedProductsInTable(checkBox, productItemId);
    }
  };

  /**
   * Check for selected products in product table.
   * @param {object} checkBox - Jquery object with checkbox.
   * @param {number} productItemId - Id if product row.
   */
  this.findSelectedProductsInTable = function (checkBox, productItemId) {
    var itemEqualId = function (item) {
      return item[0] === productItemId;
    };
    if (this.selectedProductsData.some(itemEqualId)) {
      checkBox.prop('checked', true);
    }
  };

  /**
   * Update counter.
   */
  this.updateCounter = function () {
    var counterText = '';
    if (this.selectedProductsData.length) {
      counterText = ' (' + this.selectedProductsData.length + ')';
    }
    $(this.counterSelector).html(counterText);
  };

  /**
   * Update selected products input value.
   * @param {number} id - Selected product id.
   */
  this.updateSelectedProductsInputValue = function () {
    var inputValue = this.selectedProductsData.reduce(function (concat, current, index) {
      return index ? concat + ',' + current[0] : current[0];
    }, '');
    this.$inputWithSelectedProducts.val(inputValue);
  };

  /**
   * Add selected product to array with all selected items.
   * @param {array} rowData - Array of all data selected product.
   */
  this.addRow = function (rowData) {
    var productItem = rowData.slice();
    productItem[rowData.length - 1] = this.removeBtnTemplate.replace('#', productItem[0]);
    this.selectedProductsData.push(productItem);
    this.renderSelectedItemsTable(productItem);
  };

  /**
   * Remove row from array with all selected items.
   * @param {number} id - Products id which should be deleted.
   */
  this.removeRow = function (id) {
    var self = this;
    this.selectedProductsData.every(function (elem, index) {
      if (elem[0] !== Number(id)) {
        return true;
      }
      self.selectedProductsData.splice(index, 1);
      return false;
    });
    self.renderSelectedItemsTable();
  };

  /**
   * Add event for remove button to remove row from array with all selected items.
   */
  this.addRemoveButtonClickHandler = function () {
    var self = this,
      selectedTable = this.$selectedProductsTable;
    selectedTable.on('click', this.removeBtnSelector, function (e) {
      e.preventDefault();
      var id = $(e.target).attr('href');
      self.removeRow(id);
      self.updateCheckboxes();
    });
  };

  /**
   * Add counter template on init.
   */
  this.addCounterToLabel = function () {
    this.$counterLabel.append(this.counterTemplate);
  };

  /**
   * Redraw table with selected items.
   */
  this.renderSelectedItemsTable = function () {
    this.$selectedProductsTable.DataTable().clear().rows.add(this.selectedProductsData).draw();
    this.updateCounter();
    this.updateSelectedProductsInputValue();
    this.updateCheckboxes();
  };
};
module.exports = SelectTableAPI;

/***/ }),

/***/ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template-slot.entry.js":
/*!*********************************************************************************************************************!*\
  !*** ./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template-slot.entry.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/configurable-bundle-template-slot/slot-edit */ "./vendor/spryker/configurable-bundle-gui/assets/Zed/js/modules/configurable-bundle-template-slot/slot-edit.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/configurable-bundle-gui/assets/Zed/js/spryker-zed-configurable-bundle-template-slot.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jb25maWd1cmFibGUtYnVuZGxlLXRlbXBsYXRlLXNsb3QuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlBLGNBQWMsR0FBR0MsbUJBQU8sQ0FBQyxpSkFBc0MsQ0FBQztBQUVwRUMsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUIsSUFBSUMsc0JBQXNCLEdBQUcsSUFBSUwsY0FBYyxDQUFDLENBQUM7RUFDakQsSUFBSU0scUJBQXFCLEdBQUcsSUFBSU4sY0FBYyxDQUFDLENBQUM7RUFFaERLLHNCQUFzQixDQUFDRSxJQUFJLENBQ3ZCLG1DQUFtQyxFQUNuQyx1QkFBdUIsRUFDdkIseURBQXlELEVBQ3pELDJDQUEyQyxFQUMzQyw4Q0FDSixDQUFDO0VBRURELHFCQUFxQixDQUFDQyxJQUFJLENBQ3RCLGtDQUFrQyxFQUNsQyx5QkFBeUIsRUFDekIsd0RBQXdELEVBQ3hELDZDQUE2QyxFQUM3QyxnREFDSixDQUFDO0FBQ0wsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQzVCRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJUCxjQUFjLEdBQUcsU0FBQUEsQ0FBQSxFQUFZO0VBQzdCLElBQUksQ0FBQ1Esb0JBQW9CLEdBQUcsRUFBRTtFQUM5QixJQUFJLENBQUNDLGlCQUFpQixHQUFHLGlCQUFpQjtFQUMxQyxJQUFJLENBQUNDLGlCQUFpQixHQUFHLHNEQUFzRDtFQUMvRSxJQUFJLENBQUNDLGVBQWUsR0FBRyxhQUFhO0VBQ3BDLElBQUksQ0FBQ0MsZUFBZSxHQUFHLGtDQUFrQztFQUN6RCxJQUFJLENBQUNDLGlCQUFpQixHQUFHLEtBQUs7O0VBRTlCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7RUFDSSxJQUFJLENBQUNOLElBQUksR0FBRyxVQUNSTyxZQUFZLEVBQ1pDLHFCQUFxQixFQUNyQkMsZ0JBQWdCLEVB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QztNQUVsQixJQUFJL0IsRUFBRSxHQUFHakQsQ0FBQyxDQUFDK0UsQ0FBQyxDQUFDRSxNQUFNLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQztNQUVqQy9DLElBQUksQ0FBQ2dCLFNBQVMsQ0FBQ0YsRUFBRSxDQUFDO01BQ2xCZCxJQUFJLENBQUNNLGdCQUFnQixDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0VBQ04sQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNsQixpQkFBaUIsR0FBRyxZQUFZO0lBQ2pDLElBQUksQ0FBQ0osYUFBYSxDQUFDZ0UsTUFBTSxDQUFDLElBQUksQ0FBQ3pFLGVBQWUsQ0FBQztFQUNuRCxDQUFDOztFQUVEO0FBQ0o7QUFDQTtFQUNJLElBQUksQ0FBQytELHdCQUF3QixHQUFHLFlBQVk7SUFDeEMsSUFBSSxDQUFDdkQsc0JBQXNCLENBQUNtQixTQUFTLENBQUMsQ0FBQyxDQUFDK0MsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDaEYsb0JBQW9CLENBQUMsQ0FBQ2lGLElBQUksQ0FBQyxDQUFDO0lBRTFGLElBQUksQ0FBQ3hCLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ0csZ0NBQWdDLENBQUMsQ0FBQztJQUN2QyxJQUFJLENBQUN6QixnQkFBZ0IsQ0FBQyxDQUFDO0VBQzNCLENBQUM7QUFDTCxDQUFDO0FBRUQrQyxNQUFNLENBQUNDLE9BQU8sR0FBRzNGLGNBQWM7Ozs7Ozs7Ozs7QUMvTi9CO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQyxtQkFBTyxDQUFDLDRLQUF1RCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29uZmlndXJhYmxlLWJ1bmRsZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2NvbmZpZ3VyYWJsZS1idW5kbGUtdGVtcGxhdGUtc2xvdC9zbG90LWVkaXQuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29uZmlndXJhYmxlLWJ1bmRsZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3NlbGVjdC10YWJsZS1hcGkvc2VsZWN0LXRhYmxlLWFwaS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb25maWd1cmFibGUtYnVuZGxlLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNvbmZpZ3VyYWJsZS1idW5kbGUtdGVtcGxhdGUtc2xvdC5lbnRyeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTZWxlY3RUYWJsZUFQSSA9IHJlcXVpcmUoJy4uL3NlbGVjdC10YWJsZS1hcGkvc2VsZWN0LXRhYmxlLWFwaScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF2YWlsYWJsZVByb2R1Y3RzVGFibGUgPSBuZXcgU2VsZWN0VGFibGVBUEkoKTtcbiAgICB2YXIgYXNzaWduZWRQcm9kdWN0c1RhYmxlID0gbmV3IFNlbGVjdFRhYmxlQVBJKCk7XG5cbiAgICBhdmFpbGFibGVQcm9kdWN0c1RhYmxlLmluaXQoXG4gICAgICAgICcjYXZhaWxhYmxlLXByb2R1Y3QtY29uY3JldGUtdGFibGUnLFxuICAgICAgICAnI3Byb2R1Y3RzVG9CZUFzc2lnbmVkJyxcbiAgICAgICAgJy5hdmFpbGFibGUtcHJvZHVjdC1jb25jcmV0ZS10YWJsZS1hbGwtcHJvZHVjdHMtY2hlY2tib3gnLFxuICAgICAgICAnYVtocmVmPVwiI3RhYi1jb250ZW50LWFzc2lnbm1lbnRfcHJvZHVjdFwiXScsXG4gICAgICAgICcjcHJvZHVjdExpc3RBZ2dyZWdhdGVfcHJvZHVjdElkc1RvQmVBc3NpZ25lZCcsXG4gICAgKTtcblxuICAgIGFzc2lnbmVkUHJvZHVjdHNUYWJsZS5pbml0KFxuICAgICAgICAnI2Fzc2lnbmVkLXByb2R1Y3QtY29uY3JldGUtdGFibGUnLFxuICAgICAgICAnI3Byb2R1Y3RzVG9CZURlYXNzaWduZWQnLFxuICAgICAgICAnLmFzc2lnbmVkLXByb2R1Y3QtY29uY3JldGUtdGFibGUtYWxsLXByb2R1Y3RzLWNoZWNrYm94JyxcbiAgICAgICAgJ2FbaHJlZj1cIiN0YWItY29udGVudC1kZWFzc2lnbm1lbnRfcHJvZHVjdFwiXScsXG4gICAgICAgICcjcHJvZHVjdExpc3RBZ2dyZWdhdGVfcHJvZHVjdElkc1RvQmVEZUFzc2lnbmVkJyxcbiAgICApO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTZWxlY3RUYWJsZUFQSSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdHNEYXRhID0gW107XG4gICAgdGhpcy5yZW1vdmVCdG5TZWxlY3RvciA9ICcuanMtcmVtb3ZlLWl0ZW0nO1xuICAgIHRoaXMucmVtb3ZlQnRuVGVtcGxhdGUgPSAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImpzLXJlbW92ZS1pdGVtIGJ0bi14c1wiPlJlbW92ZTwvYT4nO1xuICAgIHRoaXMuY291bnRlclNlbGVjdG9yID0gJy5qcy1jb3VudGVyJztcbiAgICB0aGlzLmNvdW50ZXJUZW1wbGF0ZSA9ICc8c3BhbiBjbGFzcz1cImpzLWNvdW50ZXJcIj48L3NwYW4+JztcbiAgICB0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGFsbCB0YWJsZSBhZGRpbmcgZnVuY3Rpb25hbGl0eS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZHVjdFRhYmxlIC0gQ3VycmVudCB0YWJsZSB3aXRoIHByb2R1Y3RzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZFByb2R1Y3RzVGFibGUgLSBUYWJsZSB3aGVyZSBzaG91bGQgcHJvZHVjdCBiZSBhZGRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hlY2tib3hTZWxlY3RvciAtIENoZWNrYm94IHNlbGVjdG9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTGFiZWxTZWxlY3RvciAtIFRhYnMgbGFiZWwgd2hlcmUgd2lsbCBiZSBhZGRlZCBjb3VudCBvZiBzZWxlY3QgcHJvZHVjdHMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMgLSBJbiB0aGlzIGlucHV0IHdpbGwgcHV0dGVkIGFsbCBzZWxlY3RlZCBwcm9kdWN0IGlkcy5cbiAgICAgKi9cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoXG4gICAgICAgIHByb2R1Y3RUYWJsZSxcbiAgICAgICAgc2VsZWN0ZWRQcm9kdWN0c1RhYmxlLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICBjb3VudGVyTGFiZWxTZWxlY3RvcixcbiAgICAgICAgaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cyxcbiAgICApIHtcbiAgICAgICAgdGhpcy4kcHJvZHVjdFRhYmxlID0gJChwcm9kdWN0VGFibGUpO1xuICAgICAgICB0aGlzLiRzZWxlY3RlZFByb2R1Y3RzVGFibGUgPSAkKHNlbGVjdGVkUHJvZHVjdHNUYWJsZSk7XG4gICAgICAgIHRoaXMuJGNvdW50ZXJMYWJlbCA9ICQoY291bnRlckxhYmVsU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLiRpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzID0gJChpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzKTtcbiAgICAgICAgdGhpcy5jaGVja2JveFNlbGVjdG9yID0gY2hlY2tib3hTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5jb3VudGVyU2VsZWN0b3IgPSBjb3VudGVyTGFiZWxTZWxlY3RvciArICcgJyArIHRoaXMuY291bnRlclNlbGVjdG9yO1xuXG4gICAgICAgIHRoaXMuZHJhd1Byb2R1Y3RzVGFibGUoKTtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVCdXR0b25DbGlja0hhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCgpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdFByb2R1Y3RzT25Mb2FkID0gZnVuY3Rpb24gKGluaXRpYWxTZWxlY3RlZFByb2R1Y3RzRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSBpbml0aWFsU2VsZWN0ZWRQcm9kdWN0c0RhdGEucmVwbGFjZSgvJnF1b3Q7L2csICdcIicpLnJlcGxhY2UoLywvZywgJycpO1xuICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJzZWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJzZWREYXRhW2ldLnB1c2goJycpO1xuICAgICAgICAgICAgdGhpcy5hZGRSb3cocGFyc2VkRGF0YVtpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhdyBtZXRob2Qgb2YgRGF0YVRhYmxlLiBGaXJlcyBldmVyeSB0aW1lIHRhYmxlIHJlcmVuZGVyLlxuICAgICAqL1xuICAgIHRoaXMuZHJhd1Byb2R1Y3RzVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHByb2R1Y3RUYWJsZURhdGEgPSBzZWxmLiRwcm9kdWN0VGFibGUuRGF0YVRhYmxlKCk7XG5cbiAgICAgICAgcHJvZHVjdFRhYmxlRGF0YS5vbignZHJhdycsIGZ1bmN0aW9uIChldmVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hlY2tib3hlcygpO1xuICAgICAgICAgICAgc2VsZi5tYXBFdmVudHNUb0NoZWNrYm94ZXMocHJvZHVjdFRhYmxlRGF0YSwgJChzZWxmLmNoZWNrYm94U2VsZWN0b3IpKTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMgJiYgaW5pdGlhbFNlbGVjdGVkUHJvZHVjdHNEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxTZWxlY3RlZFByb2R1Y3RzRGF0YSA9IHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMudmFsKCk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdFByb2R1Y3RzT25Mb2FkKGluaXRpYWxTZWxlY3RlZFByb2R1Y3RzRGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cy52YWwoJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGNoYW5nZSBldmVudCBmb3IgYWxsIGNoZWNrYm94ZXMgY2hlY2tib3guIEZpcmVzIGV2ZXJ5IHRpbWUsIHdoZW4gcHJvZHVjdCB0YWJsZSByZWRyYXdzLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9kdWN0VGFibGVEYXRhIC0gRGF0YVRhYmxlIG9wdGlvbnMgKCBnZXQgYnkgJChlbGVtZW50KS5EYXRhVGFibGUoKSApLlxuICAgICAqIEBwYXJhbSB7Y2hlY2tib3hlc30gY2hlY2tib3hlcyAtIENvbGxlY3Rpb24gb2YgYWxsIGNoZWNrYm94ZXMgaW4gUHJvZHVjdCBUYWJsZS5cbiAgICAgKi9cbiAgICB0aGlzLm1hcEV2ZW50c1RvQ2hlY2tib3hlcyA9IGZ1bmN0aW9uIChwcm9kdWN0VGFibGVEYXRhLCBjaGVja2JveGVzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBjaGVja2JveGVzLm9mZignY2hhbmdlJyk7XG4gICAgICAgIGNoZWNrYm94ZXMub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IGNoZWNrYm94ZXMuaW5kZXgoJCh0aGlzKSksXG4gICAgICAgICAgICAgICAgcm93RGF0YSA9IHByb2R1Y3RUYWJsZURhdGEuZGF0YSgpW3Jvd0luZGV4XSxcbiAgICAgICAgICAgICAgICBpZCA9IHJvd0RhdGFbMF07XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuYWRkUm93KHJvd0RhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5yZW1vdmVSb3coaWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIHNlbGVjdGVkIHByb2R1Y3RzIGluIHByb2R1Y3QgdGFibGUuXG4gICAgICovXG4gICAgdGhpcy51cGRhdGVDaGVja2JveGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJvZHVjdFRhYmxlID0gdGhpcy4kcHJvZHVjdFRhYmxlLkRhdGFUYWJsZSgpLFxuICAgICAgICAgICAgcHJvZHVjdFRhYmxlRGF0YSA9IHByb2R1Y3RUYWJsZS5kYXRhKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9kdWN0VGFibGVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdEl0ZW1EYXRhID0gcHJvZHVjdFRhYmxlRGF0YVtpXSxcbiAgICAgICAgICAgICAgICBwcm9kdWN0SXRlbUlkID0gcHJvZHVjdEl0ZW1EYXRhWzBdLFxuICAgICAgICAgICAgICAgIGNoZWNrQm94ID0gJChwcm9kdWN0VGFibGUucm93KGkpLm5vZGUoKSkuZmluZCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG4gICAgICAgICAgICBjaGVja0JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZFByb2R1Y3RzSW5UYWJsZShjaGVja0JveCwgcHJvZHVjdEl0ZW1JZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIHNlbGVjdGVkIHByb2R1Y3RzIGluIHByb2R1Y3QgdGFibGUuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNoZWNrQm94IC0gSnF1ZXJ5IG9iamVjdCB3aXRoIGNoZWNrYm94LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBwcm9kdWN0SXRlbUlkIC0gSWQgaWYgcHJvZHVjdCByb3cuXG4gICAgICovXG4gICAgdGhpcy5maW5kU2VsZWN0ZWRQcm9kdWN0c0luVGFibGUgPSBmdW5jdGlvbiAoY2hlY2tCb3gsIHByb2R1Y3RJdGVtSWQpIHtcbiAgICAgICAgdmFyIGl0ZW1FcXVhbElkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdID09PSBwcm9kdWN0SXRlbUlkO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkUHJvZHVjdHNEYXRhLnNvbWUoaXRlbUVxdWFsSWQpKSB7XG4gICAgICAgICAgICBjaGVja0JveC5wcm9wKCdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvdW50ZXIuXG4gICAgICovXG4gICAgdGhpcy51cGRhdGVDb3VudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY291bnRlclRleHQgPSAnJztcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvdW50ZXJUZXh0ID0gJyAoJyArIHRoaXMuc2VsZWN0ZWRQcm9kdWN0c0RhdGEubGVuZ3RoICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLmNvdW50ZXJTZWxlY3RvcikuaHRtbChjb3VudGVyVGV4dCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzZWxlY3RlZCBwcm9kdWN0cyBpbnB1dCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBTZWxlY3RlZCBwcm9kdWN0IGlkLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRQcm9kdWN0c0lucHV0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnB1dFZhbHVlID0gdGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YS5yZWR1Y2UoZnVuY3Rpb24gKGNvbmNhdCwgY3VycmVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA/IGNvbmNhdCArICcsJyArIGN1cnJlbnRbMF0gOiBjdXJyZW50WzBdO1xuICAgICAgICB9LCAnJyk7XG5cbiAgICAgICAgdGhpcy4kaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cy52YWwoaW5wdXRWYWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBzZWxlY3RlZCBwcm9kdWN0IHRvIGFycmF5IHdpdGggYWxsIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHJvd0RhdGEgLSBBcnJheSBvZiBhbGwgZGF0YSBzZWxlY3RlZCBwcm9kdWN0LlxuICAgICAqL1xuICAgIHRoaXMuYWRkUm93ID0gZnVuY3Rpb24gKHJvd0RhdGEpIHtcbiAgICAgICAgdmFyIHByb2R1Y3RJdGVtID0gcm93RGF0YS5zbGljZSgpO1xuICAgICAgICBwcm9kdWN0SXRlbVtyb3dEYXRhLmxlbmd0aCAtIDFdID0gdGhpcy5yZW1vdmVCdG5UZW1wbGF0ZS5yZXBsYWNlKCcjJywgcHJvZHVjdEl0ZW1bMF0pO1xuICAgICAgICB0aGlzLnNlbGVjdGVkUHJvZHVjdHNEYXRhLnB1c2gocHJvZHVjdEl0ZW0pO1xuICAgICAgICB0aGlzLnJlbmRlclNlbGVjdGVkSXRlbXNUYWJsZShwcm9kdWN0SXRlbSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSByb3cgZnJvbSBhcnJheSB3aXRoIGFsbCBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaWQgLSBQcm9kdWN0cyBpZCB3aGljaCBzaG91bGQgYmUgZGVsZXRlZC5cbiAgICAgKi9cbiAgICB0aGlzLnJlbW92ZVJvdyA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YS5ldmVyeShmdW5jdGlvbiAoZWxlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbGVtWzBdICE9PSBOdW1iZXIoaWQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRQcm9kdWN0c0RhdGEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBldmVudCBmb3IgcmVtb3ZlIGJ1dHRvbiB0byByZW1vdmUgcm93IGZyb20gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgdGhpcy5hZGRSZW1vdmVCdXR0b25DbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUgPSB0aGlzLiRzZWxlY3RlZFByb2R1Y3RzVGFibGU7XG5cbiAgICAgICAgc2VsZWN0ZWRUYWJsZS5vbignY2xpY2snLCB0aGlzLnJlbW92ZUJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgaWQgPSAkKGUudGFyZ2V0KS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgICAgIHNlbGYucmVtb3ZlUm93KGlkKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hlY2tib3hlcygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGNvdW50ZXIgdGVtcGxhdGUgb24gaW5pdC5cbiAgICAgKi9cbiAgICB0aGlzLmFkZENvdW50ZXJUb0xhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRjb3VudGVyTGFiZWwuYXBwZW5kKHRoaXMuY291bnRlclRlbXBsYXRlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVkcmF3IHRhYmxlIHdpdGggc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgdGhpcy5yZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlbGVjdGVkUHJvZHVjdHNUYWJsZS5EYXRhVGFibGUoKS5jbGVhcigpLnJvd3MuYWRkKHRoaXMuc2VsZWN0ZWRQcm9kdWN0c0RhdGEpLmRyYXcoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZFByb2R1Y3RzSW5wdXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RUYWJsZUFQSTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2NvbmZpZ3VyYWJsZS1idW5kbGUtdGVtcGxhdGUtc2xvdC9zbG90LWVkaXQnKTtcbiJdLCJuYW1lcyI6WyJTZWxlY3RUYWJsZUFQSSIsInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImF2YWlsYWJsZVByb2R1Y3RzVGFibGUiLCJhc3NpZ25lZFByb2R1Y3RzVGFibGUiLCJpbml0Iiwic2VsZWN0ZWRQcm9kdWN0c0RhdGEiLCJyZW1vdmVCdG5TZWxlY3RvciIsInJlbW92ZUJ0blRlbXBsYXRlIiwiY291bnRlclNlbGVjdG9yIiwiY291bnRlclRlbXBsYXRlIiwiaW5pdGlhbERhdGFMb2FkZWQiLCJwcm9kdWN0VGFibGUiLCJzZWxlY3RlZFByb2R1Y3RzVGFibGUiLCJjaGVja2JveFNlbGVjdG9yIiwiY291bnRlckxhYmVsU2VsZWN0b3IiLCJpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzIiwiJHByb2R1Y3RUYWJsZSIsIiRzZWxlY3RlZFByb2R1Y3RzVGFibGUiLCIkY291bnRlckxhYmVsIiwiJGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMiLCJkcmF3UHJvZHVjdHNUYWJsZSIsImFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlciIsImFkZENvdW50ZXJUb0xhYmVsIiwic2VsZWN0UHJvZHVjdHNPbkxvYWQiLCJpbml0aWFsU2VsZWN0ZWRQcm9kdWN0c0RhdGEiLCJkYXRhIiwicmVwbGFjZSIsInBhcnNlZERhdGEiLCJKU09OIiwicGFyc2UiLCJpIiwibGVuZ3RoIiwicHVzaCIsImFkZFJvdyIsInNlbGYiLCJwcm9kdWN0VGFibGVEYXRhIiwiRGF0YVRhYmxlIiwib24iLCJldmVudCIsInNldHRpbmdzIiwidXBkYXRlQ2hlY2tib3hlcyIsIm1hcEV2ZW50c1RvQ2hlY2tib3hlcyIsInZhbCIsImNoZWNrYm94ZXMiLCJvZmYiLCJyb3dJbmRleCIsImluZGV4Iiwicm93RGF0YSIsImlkIiwiaXMiLCJyZW1vdmVSb3ciLCJwcm9kdWN0SXRlbURhdGEiLCJwcm9kdWN0SXRlbUlkIiwiY2hlY2tCb3giLCJyb3ciLCJub2RlIiwiZmluZCIsInByb3AiLCJmaW5kU2VsZWN0ZWRQcm9kdWN0c0luVGFibGUiLCJpdGVtRXF1YWxJZCIsIml0ZW0iLCJzb21lIiwidXBkYXRlQ291bnRlciIsImNvdW50ZXJUZXh0IiwiaHRtbCIsInVwZGF0ZVNlbGVjdGVkUHJvZHVjdHNJbnB1dFZhbHVlIiwiaW5wdXRWYWx1ZSIsInJlZHVjZSIsImNvbmNhdCIsImN1cnJlbnQiLCJwcm9kdWN0SXRlbSIsInNsaWNlIiwicmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlIiwiZXZlcnkiLCJlbGVtIiwiTnVtYmVyIiwic3BsaWNlIiwic2VsZWN0ZWRUYWJsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImF0dHIiLCJhcHBlbmQiLCJjbGVhciIsInJvd3MiLCJhZGQiLCJkcmF3IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VSb290IjoiIn0=