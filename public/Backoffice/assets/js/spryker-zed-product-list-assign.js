"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-list-assign"],{

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/assign.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/modules/assign.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectTableAPI = __webpack_require__(/*! ./select-table-api */ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/select-table-api.js");
$(document).ready(function () {
  var availableProductsTable = new SelectTableAPI();
  var assignedProductsTable = new SelectTableAPI();
  availableProductsTable.init('#available-product-concrete-table', '#productsToBeAssigned', '.available-product-concrete-table-all-products-checkbox', 'a[href="#tab-content-assignment_product"]', '#productListAggregate_productIdsToBeAssigned');
  assignedProductsTable.init('#assigned-product-concrete-table', '#productsToBeDeassigned', '.assigned-product-concrete-table-all-products-checkbox', 'a[href="#tab-content-deassignment_product"]', '#productListAggregate_productIdsToBeDeAssigned');
});
module.exports = SelectTableAPI;

/***/ }),

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/file-input.js":
/*!*****************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/modules/file-input.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var inputFileRemoveFile = {
  removeBtnClasses: 'btn btn-sm btn-outline safe-submit btn-remove btn-remove-file js-remove-file',
  removeBtnInner: '<i class="fa fa-times"></i> Remove file',
  init: function () {
    this.$inputs = $('[type="file"]');
    this.mapEvents();
  },
  mapEvents: function () {
    var self = this;
    this.$inputs.on('change', function () {
      if (!$(this).next().length && !$(this).next().hasClass(self.removeBtnClasses)) {
        var $btn = self.createBtn();
        $(this).after($btn);
      }
    });
  },
  createBtn: function () {
    var $btn = $('<span>');
    $btn.addClass(this.removeBtnClasses).append(this.removeBtnInner).on('click', $.proxy(function (e) {
      this.removeFile($(e.currentTarget));
    }, this));
    return $btn;
  },
  removeFile: function ($clickedBtn) {
    $clickedBtn.prev().val('');
    $clickedBtn.remove();
  }
};
$(document).ready(function () {
  inputFileRemoveFile.init();
});

/***/ }),

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/select-table-api.js":
/*!***********************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/modules/select-table-api.js ***!
  \***********************************************************************************/
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

/***/ "./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-assign.entry.js":
/*!************************************************************************************************!*\
  !*** ./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-assign.entry.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/assign */ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/assign.js");
__webpack_require__(/*! ./modules/file-input */ "./vendor/spryker/product-list-gui/assets/Zed/js/modules/file-input.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-list-gui/assets/Zed/js/spryker-zed-product-list-assign.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWxpc3QtYXNzaWduLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxjQUFjLEdBQUdDLG1CQUFPLENBQUMsdUdBQW9CLENBQUM7QUFFbERDLENBQUMsQ0FBQ0MsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCLElBQUlDLHNCQUFzQixHQUFHLElBQUlMLGNBQWMsQ0FBQyxDQUFDO0VBQ2pELElBQUlNLHFCQUFxQixHQUFHLElBQUlOLGNBQWMsQ0FBQyxDQUFDO0VBRWhESyxzQkFBc0IsQ0FBQ0UsSUFBSSxDQUN2QixtQ0FBbUMsRUFDbkMsdUJBQXVCLEVBQ3ZCLHlEQUF5RCxFQUN6RCwyQ0FBMkMsRUFDM0MsOENBQ0osQ0FBQztFQUVERCxxQkFBcUIsQ0FBQ0MsSUFBSSxDQUN0QixrQ0FBa0MsRUFDbEMseUJBQXlCLEVBQ3pCLHdEQUF3RCxFQUN4RCw2Q0FBNkMsRUFDN0MsZ0RBQ0osQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGQyxNQUFNLENBQUNDLE9BQU8sR0FBR1QsY0FBYzs7Ozs7Ozs7Ozs7QUM5Qi9CO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlVLG1CQUFtQixHQUFHO0VBQ3RCQyxnQkFBZ0IsRUFBRSw4RUFBOEU7RUFDaEdDLGNBQWMsRUFBRSx5Q0FBeUM7RUFFekRMLElBQUksRUFBRSxTQUFBQSxDQUFBLEVBQVk7SUFDZCxJQUFJLENBQUNNLE9BQU8sR0FBR1gsQ0FBQyxDQUFDLGVBQWUsQ0FBQztJQUNqQyxJQUFJLENBQUNZLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCLENBQUM7RUFFREEsU0FBUyxFQUFFLFNBQUFBLENBQUEsRUFBWTtJQUNuQixJQUFJQyxJQUFJLEdBQUcsSUFBSTtJQUVmLElBQUksQ0FBQ0YsT0FBTyxDQUFDRyxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7TUFDbEMsSUFBSSxDQUFDZCxDQUFDLENB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QUFDLENBQUM7SUFFMUYsSUFBSSxDQUFDdEIsYUFBYSxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDRyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQ3ZDLElBQUksQ0FBQ3hCLGdCQUFnQixDQUFDLENBQUM7RUFDM0IsQ0FBQztBQUNMLENBQUM7QUFFRHpELE1BQU0sQ0FBQ0MsT0FBTyxHQUFHVCxjQUFjOzs7Ozs7Ozs7O0FDL04vQjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkMsbUJBQU8sQ0FBQywyRkFBa0IsQ0FBQztBQUMzQkEsbUJBQU8sQ0FBQyxtR0FBc0IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtbGlzdC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWxpc3QtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9maWxlLWlucHV0LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtbGlzdC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3NlbGVjdC10YWJsZS1hcGkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJvZHVjdC1saXN0LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXByb2R1Y3QtbGlzdC1hc3NpZ24uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2VsZWN0VGFibGVBUEkgPSByZXF1aXJlKCcuL3NlbGVjdC10YWJsZS1hcGknKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGVQcm9kdWN0c1RhYmxlID0gbmV3IFNlbGVjdFRhYmxlQVBJKCk7XG4gICAgdmFyIGFzc2lnbmVkUHJvZHVjdHNUYWJsZSA9IG5ldyBTZWxlY3RUYWJsZUFQSSgpO1xuXG4gICAgYXZhaWxhYmxlUHJvZHVjdHNUYWJsZS5pbml0KFxuICAgICAgICAnI2F2YWlsYWJsZS1wcm9kdWN0LWNvbmNyZXRlLXRhYmxlJyxcbiAgICAgICAgJyNwcm9kdWN0c1RvQmVBc3NpZ25lZCcsXG4gICAgICAgICcuYXZhaWxhYmxlLXByb2R1Y3QtY29uY3JldGUtdGFibGUtYWxsLXByb2R1Y3RzLWNoZWNrYm94JyxcbiAgICAgICAgJ2FbaHJlZj1cIiN0YWItY29udGVudC1hc3NpZ25tZW50X3Byb2R1Y3RcIl0nLFxuICAgICAgICAnI3Byb2R1Y3RMaXN0QWdncmVnYXRlX3Byb2R1Y3RJZHNUb0JlQXNzaWduZWQnLFxuICAgICk7XG5cbiAgICBhc3NpZ25lZFByb2R1Y3RzVGFibGUuaW5pdChcbiAgICAgICAgJyNhc3NpZ25lZC1wcm9kdWN0LWNvbmNyZXRlLXRhYmxlJyxcbiAgICAgICAgJyNwcm9kdWN0c1RvQmVEZWFzc2lnbmVkJyxcbiAgICAgICAgJy5hc3NpZ25lZC1wcm9kdWN0LWNvbmNyZXRlLXRhYmxlLWFsbC1wcm9kdWN0cy1jaGVja2JveCcsXG4gICAgICAgICdhW2hyZWY9XCIjdGFiLWNvbnRlbnQtZGVhc3NpZ25tZW50X3Byb2R1Y3RcIl0nLFxuICAgICAgICAnI3Byb2R1Y3RMaXN0QWdncmVnYXRlX3Byb2R1Y3RJZHNUb0JlRGVBc3NpZ25lZCcsXG4gICAgKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdFRhYmxlQVBJO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5wdXRGaWxlUmVtb3ZlRmlsZSA9IHtcbiAgICByZW1vdmVCdG5DbGFzc2VzOiAnYnRuIGJ0bi1zbSBidG4tb3V0bGluZSBzYWZlLXN1Ym1pdCBidG4tcmVtb3ZlIGJ0bi1yZW1vdmUtZmlsZSBqcy1yZW1vdmUtZmlsZScsXG4gICAgcmVtb3ZlQnRuSW5uZXI6ICc8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPiBSZW1vdmUgZmlsZScsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGlucHV0cyA9ICQoJ1t0eXBlPVwiZmlsZVwiXScpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH0sXG5cbiAgICBtYXBFdmVudHM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuJGlucHV0cy5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCEkKHRoaXMpLm5leHQoKS5sZW5ndGggJiYgISQodGhpcykubmV4dCgpLmhhc0NsYXNzKHNlbGYucmVtb3ZlQnRuQ2xhc3NlcykpIHtcbiAgICAgICAgICAgICAgICB2YXIgJGJ0biA9IHNlbGYuY3JlYXRlQnRuKCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZnRlcigkYnRuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZUJ0bjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGJ0biA9ICQoJzxzcGFuPicpO1xuXG4gICAgICAgICRidG4uYWRkQ2xhc3ModGhpcy5yZW1vdmVCdG5DbGFzc2VzKVxuICAgICAgICAgICAgLmFwcGVuZCh0aGlzLnJlbW92ZUJ0bklubmVyKVxuICAgICAgICAgICAgLm9uKFxuICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUZpbGUoJChlLmN1cnJlbnRUYXJnZXQpKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuICRidG47XG4gICAgfSxcblxuICAgIHJlbW92ZUZpbGU6IGZ1bmN0aW9uICgkY2xpY2tlZEJ0bikge1xuICAgICAgICAkY2xpY2tlZEJ0bi5wcmV2KCkudmFsKCcnKTtcbiAgICAgICAgJGNsaWNrZWRCdG4ucmVtb3ZlKCk7XG4gICAgfSxcbn07XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBpbnB1dEZpbGVSZW1vdmVGaWxlLmluaXQoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2VsZWN0VGFibGVBUEkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YSA9IFtdO1xuICAgIHRoaXMucmVtb3ZlQnRuU2VsZWN0b3IgPSAnLmpzLXJlbW92ZS1pdGVtJztcbiAgICB0aGlzLnJlbW92ZUJ0blRlbXBsYXRlID0gJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJqcy1yZW1vdmUtaXRlbSBidG4teHNcIj5SZW1vdmU8L2E+JztcbiAgICB0aGlzLmNvdW50ZXJTZWxlY3RvciA9ICcuanMtY291bnRlcic7XG4gICAgdGhpcy5jb3VudGVyVGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJqcy1jb3VudGVyXCI+PC9zcGFuPic7XG4gICAgdGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBhbGwgdGFibGUgYWRkaW5nIGZ1bmN0aW9uYWxpdHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2R1Y3RUYWJsZSAtIEN1cnJlbnQgdGFibGUgd2l0aCBwcm9kdWN0cy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRQcm9kdWN0c1RhYmxlIC0gVGFibGUgd2hlcmUgc2hvdWxkIHByb2R1Y3QgYmUgYWRkZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoZWNrYm94U2VsZWN0b3IgLSBDaGVja2JveCBzZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY291bnRlckxhYmVsU2VsZWN0b3IgLSBUYWJzIGxhYmVsIHdoZXJlIHdpbGwgYmUgYWRkZWQgY291bnQgb2Ygc2VsZWN0IHByb2R1Y3RzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzIC0gSW4gdGhpcyBpbnB1dCB3aWxsIHB1dHRlZCBhbGwgc2VsZWN0ZWQgcHJvZHVjdCBpZHMuXG4gICAgICovXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKFxuICAgICAgICBwcm9kdWN0VGFibGUsXG4gICAgICAgIHNlbGVjdGVkUHJvZHVjdHNUYWJsZSxcbiAgICAgICAgY2hlY2tib3hTZWxlY3RvcixcbiAgICAgICAgY291bnRlckxhYmVsU2VsZWN0b3IsXG4gICAgICAgIGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuJHByb2R1Y3RUYWJsZSA9ICQocHJvZHVjdFRhYmxlKTtcbiAgICAgICAgdGhpcy4kc2VsZWN0ZWRQcm9kdWN0c1RhYmxlID0gJChzZWxlY3RlZFByb2R1Y3RzVGFibGUpO1xuICAgICAgICB0aGlzLiRjb3VudGVyTGFiZWwgPSAkKGNvdW50ZXJMYWJlbFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy4kaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cyA9ICQoaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cyk7XG4gICAgICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvciA9IGNoZWNrYm94U2VsZWN0b3I7XG4gICAgICAgIHRoaXMuY291bnRlclNlbGVjdG9yID0gY291bnRlckxhYmVsU2VsZWN0b3IgKyAnICcgKyB0aGlzLmNvdW50ZXJTZWxlY3RvcjtcblxuICAgICAgICB0aGlzLmRyYXdQcm9kdWN0c1RhYmxlKCk7XG4gICAgICAgIHRoaXMuYWRkUmVtb3ZlQnV0dG9uQ2xpY2tIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMuYWRkQ291bnRlclRvTGFiZWwoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZWxlY3RQcm9kdWN0c09uTG9hZCA9IGZ1bmN0aW9uIChpbml0aWFsU2VsZWN0ZWRQcm9kdWN0c0RhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbERhdGFMb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0gaW5pdGlhbFNlbGVjdGVkUHJvZHVjdHNEYXRhLnJlcGxhY2UoLyZxdW90Oy9nLCAnXCInKS5yZXBsYWNlKC8sL2csICcnKTtcbiAgICAgICAgdmFyIHBhcnNlZERhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyc2VkRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGFyc2VkRGF0YVtpXS5wdXNoKCcnKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUm93KHBhcnNlZERhdGFbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERyYXcgbWV0aG9kIG9mIERhdGFUYWJsZS4gRmlyZXMgZXZlcnkgdGltZSB0YWJsZSByZXJlbmRlci5cbiAgICAgKi9cbiAgICB0aGlzLmRyYXdQcm9kdWN0c1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBwcm9kdWN0VGFibGVEYXRhID0gc2VsZi4kcHJvZHVjdFRhYmxlLkRhdGFUYWJsZSgpO1xuXG4gICAgICAgIHByb2R1Y3RUYWJsZURhdGEub24oJ2RyYXcnLCBmdW5jdGlvbiAoZXZlbnQsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICAgICAgICAgIHNlbGYubWFwRXZlbnRzVG9DaGVja2JveGVzKHByb2R1Y3RUYWJsZURhdGEsICQoc2VsZi5jaGVja2JveFNlbGVjdG9yKSk7XG5cbiAgICAgICAgICAgIGlmIChzZWxmLiRpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzICYmIGluaXRpYWxTZWxlY3RlZFByb2R1Y3RzRGF0YSkge1xuICAgICAgICAgICAgICAgIHZhciBpbml0aWFsU2VsZWN0ZWRQcm9kdWN0c0RhdGEgPSBzZWxmLiRpbnB1dFdpdGhTZWxlY3RlZFByb2R1Y3RzLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RQcm9kdWN0c09uTG9hZChpbml0aWFsU2VsZWN0ZWRQcm9kdWN0c0RhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMudmFsKCcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBjaGFuZ2UgZXZlbnQgZm9yIGFsbCBjaGVja2JveGVzIGNoZWNrYm94LiBGaXJlcyBldmVyeSB0aW1lLCB3aGVuIHByb2R1Y3QgdGFibGUgcmVkcmF3cy5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvZHVjdFRhYmxlRGF0YSAtIERhdGFUYWJsZSBvcHRpb25zICggZ2V0IGJ5ICQoZWxlbWVudCkuRGF0YVRhYmxlKCkgKS5cbiAgICAgKiBAcGFyYW0ge2NoZWNrYm94ZXN9IGNoZWNrYm94ZXMgLSBDb2xsZWN0aW9uIG9mIGFsbCBjaGVja2JveGVzIGluIFByb2R1Y3QgVGFibGUuXG4gICAgICovXG4gICAgdGhpcy5tYXBFdmVudHNUb0NoZWNrYm94ZXMgPSBmdW5jdGlvbiAocHJvZHVjdFRhYmxlRGF0YSwgY2hlY2tib3hlcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY2hlY2tib3hlcy5vZmYoJ2NoYW5nZScpO1xuICAgICAgICBjaGVja2JveGVzLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBjaGVja2JveGVzLmluZGV4KCQodGhpcykpLFxuICAgICAgICAgICAgICAgIHJvd0RhdGEgPSBwcm9kdWN0VGFibGVEYXRhLmRhdGEoKVtyb3dJbmRleF0sXG4gICAgICAgICAgICAgICAgaWQgPSByb3dEYXRhWzBdO1xuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmFkZFJvdyhyb3dEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVtb3ZlUm93KGlkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RlZCBwcm9kdWN0cyBpbiBwcm9kdWN0IHRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ2hlY2tib3hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByb2R1Y3RUYWJsZSA9IHRoaXMuJHByb2R1Y3RUYWJsZS5EYXRhVGFibGUoKSxcbiAgICAgICAgICAgIHByb2R1Y3RUYWJsZURhdGEgPSBwcm9kdWN0VGFibGUuZGF0YSgpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvZHVjdFRhYmxlRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb2R1Y3RJdGVtRGF0YSA9IHByb2R1Y3RUYWJsZURhdGFbaV0sXG4gICAgICAgICAgICAgICAgcHJvZHVjdEl0ZW1JZCA9IHByb2R1Y3RJdGVtRGF0YVswXSxcbiAgICAgICAgICAgICAgICBjaGVja0JveCA9ICQocHJvZHVjdFRhYmxlLnJvdyhpKS5ub2RlKCkpLmZpbmQoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKTtcblxuICAgICAgICAgICAgY2hlY2tCb3gucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcblxuICAgICAgICAgICAgdGhpcy5maW5kU2VsZWN0ZWRQcm9kdWN0c0luVGFibGUoY2hlY2tCb3gsIHByb2R1Y3RJdGVtSWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RlZCBwcm9kdWN0cyBpbiBwcm9kdWN0IHRhYmxlLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjaGVja0JveCAtIEpxdWVyeSBvYmplY3Qgd2l0aCBjaGVja2JveC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcHJvZHVjdEl0ZW1JZCAtIElkIGlmIHByb2R1Y3Qgcm93LlxuICAgICAqL1xuICAgIHRoaXMuZmluZFNlbGVjdGVkUHJvZHVjdHNJblRhYmxlID0gZnVuY3Rpb24gKGNoZWNrQm94LCBwcm9kdWN0SXRlbUlkKSB7XG4gICAgICAgIHZhciBpdGVtRXF1YWxJZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXSA9PT0gcHJvZHVjdEl0ZW1JZDtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YS5zb21lKGl0ZW1FcXVhbElkKSkge1xuICAgICAgICAgICAgY2hlY2tCb3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb3VudGVyLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ZXJUZXh0ID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQcm9kdWN0c0RhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb3VudGVyVGV4dCA9ICcgKCcgKyB0aGlzLnNlbGVjdGVkUHJvZHVjdHNEYXRhLmxlbmd0aCArICcpJztcbiAgICAgICAgfVxuXG4gICAgICAgICQodGhpcy5jb3VudGVyU2VsZWN0b3IpLmh0bWwoY291bnRlclRleHQpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgc2VsZWN0ZWQgcHJvZHVjdHMgaW5wdXQgdmFsdWUuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gU2VsZWN0ZWQgcHJvZHVjdCBpZC5cbiAgICAgKi9cbiAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkUHJvZHVjdHNJbnB1dFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRQcm9kdWN0c0RhdGEucmVkdWNlKGZ1bmN0aW9uIChjb25jYXQsIGN1cnJlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPyBjb25jYXQgKyAnLCcgKyBjdXJyZW50WzBdIDogY3VycmVudFswXTtcbiAgICAgICAgfSwgJycpO1xuXG4gICAgICAgIHRoaXMuJGlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMudmFsKGlucHV0VmFsdWUpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgc2VsZWN0ZWQgcHJvZHVjdCB0byBhcnJheSB3aXRoIGFsbCBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge2FycmF5fSByb3dEYXRhIC0gQXJyYXkgb2YgYWxsIGRhdGEgc2VsZWN0ZWQgcHJvZHVjdC5cbiAgICAgKi9cbiAgICB0aGlzLmFkZFJvdyA9IGZ1bmN0aW9uIChyb3dEYXRhKSB7XG4gICAgICAgIHZhciBwcm9kdWN0SXRlbSA9IHJvd0RhdGEuc2xpY2UoKTtcbiAgICAgICAgcHJvZHVjdEl0ZW1bcm93RGF0YS5sZW5ndGggLSAxXSA9IHRoaXMucmVtb3ZlQnRuVGVtcGxhdGUucmVwbGFjZSgnIycsIHByb2R1Y3RJdGVtWzBdKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFByb2R1Y3RzRGF0YS5wdXNoKHByb2R1Y3RJdGVtKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUocHJvZHVjdEl0ZW0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgcm93IGZyb20gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkIC0gUHJvZHVjdHMgaWQgd2hpY2ggc2hvdWxkIGJlIGRlbGV0ZWQuXG4gICAgICovXG4gICAgdGhpcy5yZW1vdmVSb3cgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRQcm9kdWN0c0RhdGEuZXZlcnkoZnVuY3Rpb24gKGVsZW0sIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZWxlbVswXSAhPT0gTnVtYmVyKGlkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkUHJvZHVjdHNEYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnJlbmRlclNlbGVjdGVkSXRlbXNUYWJsZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgZXZlbnQgZm9yIHJlbW92ZSBidXR0b24gdG8gcmVtb3ZlIHJvdyBmcm9tIGFycmF5IHdpdGggYWxsIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHRoaXMuYWRkUmVtb3ZlQnV0dG9uQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlID0gdGhpcy4kc2VsZWN0ZWRQcm9kdWN0c1RhYmxlO1xuXG4gICAgICAgIHNlbGVjdGVkVGFibGUub24oJ2NsaWNrJywgdGhpcy5yZW1vdmVCdG5TZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyIGlkID0gJChlLnRhcmdldCkuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICBzZWxmLnJlbW92ZVJvdyhpZCk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBjb3VudGVyIHRlbXBsYXRlIG9uIGluaXQuXG4gICAgICovXG4gICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kY291bnRlckxhYmVsLmFwcGVuZCh0aGlzLmNvdW50ZXJUZW1wbGF0ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZHJhdyB0YWJsZSB3aXRoIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHRoaXMucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzZWxlY3RlZFByb2R1Y3RzVGFibGUuRGF0YVRhYmxlKCkuY2xlYXIoKS5yb3dzLmFkZCh0aGlzLnNlbGVjdGVkUHJvZHVjdHNEYXRhKS5kcmF3KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRQcm9kdWN0c0lucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja2JveGVzKCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0VGFibGVBUEk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9hc3NpZ24nKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9maWxlLWlucHV0Jyk7XG4iXSwibmFtZXMiOlsiU2VsZWN0VGFibGVBUEkiLCJyZXF1aXJlIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJhdmFpbGFibGVQcm9kdWN0c1RhYmxlIiwiYXNzaWduZWRQcm9kdWN0c1RhYmxlIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJpbnB1dEZpbGVSZW1vdmVGaWxlIiwicmVtb3ZlQnRuQ2xhc3NlcyIsInJlbW92ZUJ0bklubmVyIiwiJGlucHV0cyIsIm1hcEV2ZW50cyIsInNlbGYiLCJvbiIsIm5leHQiLCJsZW5ndGgiLCJoYXNDbGFzcyIsIiRidG4iLCJjcmVhdGVCdG4iLCJhZnRlciIsImFkZENsYXNzIiwiYXBwZW5kIiwicHJveHkiLCJlIiwicmVtb3ZlRmlsZSIsImN1cnJlbnRUYXJnZXQiLCIkY2xpY2tlZEJ0biIsInByZXYiLCJ2YWwiLCJyZW1vdmUiLCJzZWxlY3RlZFByb2R1Y3RzRGF0YSIsInJlbW92ZUJ0blNlbGVjdG9yIiwicmVtb3ZlQnRuVGVtcGxhdGUiLCJjb3VudGVyU2VsZWN0b3IiLCJjb3VudGVyVGVtcGxhdGUiLCJpbml0aWFsRGF0YUxvYWRlZCIsInByb2R1Y3RUYWJsZSIsInNlbGVjdGVkUHJvZHVjdHNUYWJsZSIsImNoZWNrYm94U2VsZWN0b3IiLCJjb3VudGVyTGFiZWxTZWxlY3RvciIsImlucHV0V2l0aFNlbGVjdGVkUHJvZHVjdHMiLCIkcHJvZHVjdFRhYmxlIiwiJHNlbGVjdGVkUHJvZHVjdHNUYWJsZSIsIiRjb3VudGVyTGFiZWwiLCIkaW5wdXRXaXRoU2VsZWN0ZWRQcm9kdWN0cyIsImRyYXdQcm9kdWN0c1RhYmxlIiwiYWRkUmVtb3ZlQnV0dG9uQ2xpY2tIYW5kbGVyIiwiYWRkQ291bnRlclRvTGFiZWwiLCJzZWxlY3RQcm9kdWN0c09uTG9hZCIsImluaXRpYWxTZWxlY3RlZFByb2R1Y3RzRGF0YSIsImRhdGEiLCJyZXBsYWNlIiwicGFyc2VkRGF0YSIsIkpTT04iLCJwYXJzZSIsImkiLCJwdXNoIiwiYWRkUm93IiwicHJvZHVjdFRhYmxlRGF0YSIsIkRhdGFUYWJsZSIsImV2ZW50Iiwic2V0dGluZ3MiLCJ1cGRhdGVDaGVja2JveGVzIiwibWFwRXZlbnRzVG9DaGVja2JveGVzIiwiY2hlY2tib3hlcyIsIm9mZiIsInJvd0luZGV4IiwiaW5kZXgiLCJyb3dEYXRhIiwiaWQiLCJpcyIsInJlbW92ZVJvdyIsInByb2R1Y3RJdGVtRGF0YSIsInByb2R1Y3RJdGVtSWQiLCJjaGVja0JveCIsInJvdyIsIm5vZGUiLCJmaW5kIiwicHJvcCIsImZpbmRTZWxlY3RlZFByb2R1Y3RzSW5UYWJsZSIsIml0ZW1FcXVhbElkIiwiaXRlbSIsInNvbWUiLCJ1cGRhdGVDb3VudGVyIiwiY291bnRlclRleHQiLCJodG1sIiwidXBkYXRlU2VsZWN0ZWRQcm9kdWN0c0lucHV0VmFsdWUiLCJpbnB1dFZhbHVlIiwicmVkdWNlIiwiY29uY2F0IiwiY3VycmVudCIsInByb2R1Y3RJdGVtIiwic2xpY2UiLCJyZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUiLCJldmVyeSIsImVsZW0iLCJOdW1iZXIiLCJzcGxpY2UiLCJzZWxlY3RlZFRhYmxlIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJhdHRyIiwiY2xlYXIiLCJyb3dzIiwiYWRkIiwiZHJhdyJdLCJzb3VyY2VSb290IjoiIn0=