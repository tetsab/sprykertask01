"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-currency-assign"],{

/***/ "./vendor/spryker/currency-gui/assets/Zed/js/modules/assign/assign.js":
/*!****************************************************************************!*\
  !*** ./vendor/spryker/currency-gui/assets/Zed/js/modules/assign/assign.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectCurrencyTableAPI = __webpack_require__(/*! ../select-currency-table-api/select-currency-table-api */ "./vendor/spryker/currency-gui/assets/Zed/js/modules/select-currency-table-api/select-currency-table-api.js");
$(document).ready(function () {
  var availableCurrenciesTable = new SelectCurrencyTableAPI();
  var assignedCurrenciesTable = new SelectCurrencyTableAPI();
  availableCurrenciesTable.init('#available-currency-table', '#currenciesToBeAssigned', '.js-currency-checkbox', 'a[href="#tab-content-assignment_currency"]', '#store_currencyCodesToBeAssigned');
  assignedCurrenciesTable.init('#assigned-currency-table', '#currenciesToBeUnassigned', '.js-currency-checkbox', 'a[href="#tab-content-deassignment_currency"]', '#store_currencyCodesToBeDeAssigned');
});
module.exports = SelectCurrencyTableAPI;

/***/ }),

/***/ "./vendor/spryker/currency-gui/assets/Zed/js/modules/select-currency-table-api/select-currency-table-api.js":
/*!******************************************************************************************************************!*\
  !*** ./vendor/spryker/currency-gui/assets/Zed/js/modules/select-currency-table-api/select-currency-table-api.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectCurrencyTableAPI = function () {
  this.selectedCurrenciesData = [];
  this.removeBtnSelector = '.js-remove-item';
  this.removeBtnTemplate = '<a href="#" class="js-remove-item btn-xs">Remove</a>';
  this.counterSelector = '.js-counter';
  this.counterTemplate = '<span class="js-counter"></span>';
  this.initialDataLoaded = false;

  /**
   * Init all table adding functionality.
   * @param {string} currencyTable - Current table with currencies.
   * @param {string} selectedCurrenciesTable - Table where should currency be added.
   * @param {string} checkboxSelector - Checkbox selector.
   * @param {string} counterLabelSelector - Tabs label where will be added count of select currencies.
   * @param {string} inputWithSelectedCurrencies - In this input will putted all selected currency ids.
   */
  this.init = function (currencyTable, selectedCurrenciesTable, checkboxSelector, counterLabelSelector, inputWithSelectedCurrencies) {
    this.$currencyTable = $(currencyTable);
    this.$selectedCurrenciesTable = $(selectedCurrenciesTable);
    this.$counterLabel = $(counterLabelSelector);
    this.$inputWithSelectedCurrencies = $(inputWithSelectedCurrencies);
    this.checkboxSelector = checkboxSelector;
    this.counterSelector = counterLabelSelector + ' ' + this.counterSelector;
    this.drawCurrenciesTable();
    this.addRemoveButtonClickHandler();
    this.addCounterToLabel();
  };
  this.selectCurrenciesOnLoad = function (initialSelectedCurrenciesData) {
    if (this.initialDataLoaded) {
      return;
    }
    var data = initialSelectedCurrenciesData.replace(/&quot;/g, '"').replace(/,/g, '');
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
  this.drawCurrenciesTable = function () {
    var self = this;
    var currencyTableData = self.$currencyTable.DataTable();
    currencyTableData.on('draw', function (event, settings) {
      self.updateCheckboxes();
      self.mapEventsToCheckboxes(currencyTableData, $('#' + self.$currencyTable.attr('id') + ' ' + self.checkboxSelector));
      if (self.$inputWithSelectedCurrencies && initialSelectedCurrenciesData) {
        var initialSelectedCurrenciesData = self.$inputWithSelectedCurrencies.val();
        self.selectCurrenciesOnLoad(initialSelectedCurrenciesData);
        self.$inputWithSelectedCurrencies.val('');
      }
    });
  };

  /**
   * Add change event for all checkboxes checkbox. Fires every time, when currency table redraws.
   * @param {object} currencyTableData - DataTable options ( get by $(element).DataTable() ).
   * @param {checkboxes} checkboxes - Collection of all checkboxes in Currency Table.
   */
  this.mapEventsToCheckboxes = function (currencyTableData, checkboxes) {
    var self = this;
    checkboxes.off('change');
    checkboxes.on('change', function () {
      var rowIndex = checkboxes.index($(this)),
        rowData = currencyTableData.data()[rowIndex],
        id = rowData[0];
      if ($(this).is(':checked')) {
        return self.addRow(rowData);
      }
      return self.removeRow(id);
    });
  };

  /**
   * Check for selected currencies in currency table.
   */
  this.updateCheckboxes = function () {
    var currencyTable = this.$currencyTable.DataTable(),
      currencyTableData = currencyTable.data();
    for (var i = 0; i < currencyTableData.length; i++) {
      var currencyItemData = currencyTableData[i],
        currencyItemId = currencyItemData[0],
        checkBox = $(currencyTable.row(i).node()).find('[type="checkbox"]');
      checkBox.prop('checked', false);
      this.findSelectedCurrenciesInTable(checkBox, currencyItemId);
    }
  };

  /**
   * Check for selected currencies in currency table.
   * @param {object} checkBox - Jquery object with checkbox.
   * @param {number} currencyItemId - Id if currency row.
   */
  this.findSelectedCurrenciesInTable = function (checkBox, currencyItemId) {
    var itemEqualId = function (item) {
      return item[0] === currencyItemId;
    };
    if (this.selectedCurrenciesData.some(itemEqualId)) {
      checkBox.prop('checked', true);
    }
  };

  /**
   * Update counter.
   */
  this.updateCounter = function () {
    var counterText = '';
    if (this.selectedCurrenciesData.length) {
      counterText = ' (' + this.selectedCurrenciesData.length + ')';
    }
    $(this.counterSelector).html(counterText);
  };

  /**
   * Update selected currencies input value.
   */
  this.updateSelectedCurrenciesInputValue = function () {
    var inputValue = this.selectedCurrenciesData.reduce(function (concat, current, index) {
      return index ? concat + ',' + current[1] : current[1];
    }, '');
    this.$inputWithSelectedCurrencies.val(inputValue);
  };

  /**
   * Add selected currency to array with all selected items.
   * @param {array} rowData - Array of all data selected currency.
   */
  this.addRow = function (rowData) {
    var currencyItem = rowData.slice();
    currencyItem[rowData.length - 1] = this.removeBtnTemplate.replace('#', currencyItem[1]);
    this.selectedCurrenciesData.push(currencyItem);
    this.renderSelectedItemsTable(currencyItem);
  };

  /**
   * Remove row from array with all selected items.
   * @param {string} code - Currencies code which should be deleted.
   */
  this.removeRow = function (code) {
    var self = this;
    this.selectedCurrenciesData.every(function (elem, index) {
      if (elem[1] !== code) {
        return true;
      }
      self.selectedCurrenciesData.splice(index, 1);
      return false;
    });
    self.renderSelectedItemsTable();
  };

  /**
   * Add event for remove button to remove row from array with all selected items.
   */
  this.addRemoveButtonClickHandler = function () {
    var self = this,
      selectedTable = this.$selectedCurrenciesTable;
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
    this.$selectedCurrenciesTable.DataTable().clear().rows.add(this.selectedCurrenciesData).draw();
    this.updateCounter();
    this.updateSelectedCurrenciesInputValue();
    this.updateCheckboxes();
  };
};
module.exports = SelectCurrencyTableAPI;

/***/ }),

/***/ "./vendor/spryker/currency-gui/assets/Zed/js/spryker-zed-currency-assign.entry.js":
/*!****************************************************************************************!*\
  !*** ./vendor/spryker/currency-gui/assets/Zed/js/spryker-zed-currency-assign.entry.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/assign/assign */ "./vendor/spryker/currency-gui/assets/Zed/js/modules/assign/assign.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/currency-gui/assets/Zed/js/spryker-zed-currency-assign.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jdXJyZW5jeS1hc3NpZ24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLElBQUlBLHNCQUFzQixHQUFHQyxtQkFBTyxDQUFDLDBLQUF3RCxDQUFDO0FBRTlGQyxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixJQUFJQyx3QkFBd0IsR0FBRyxJQUFJTCxzQkFBc0IsQ0FBQyxDQUFDO0VBQzNELElBQUlNLHVCQUF1QixHQUFHLElBQUlOLHNCQUFzQixDQUFDLENBQUM7RUFFMURLLHdCQUF3QixDQUFDRSxJQUFJLENBQ3pCLDJCQUEyQixFQUMzQix5QkFBeUIsRUFDekIsdUJBQXVCLEVBQ3ZCLDRDQUE0QyxFQUM1QyxrQ0FDSixDQUFDO0VBRURELHVCQUF1QixDQUFDQyxJQUFJLENBQ3hCLDBCQUEwQixFQUMxQiwyQkFBMkIsRUFDM0IsdUJBQXVCLEVBQ3ZCLDhDQUE4QyxFQUM5QyxvQ0FDSixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUZDLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHVCxzQkFBc0I7Ozs7Ozs7Ozs7O0FDOUJ2QztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxzQkFBc0IsR0FBRyxTQUFBQSxDQUFBLEVBQVk7RUFDckMsSUFBSSxDQUFDVSxzQkFBc0IsR0FBRyxFQUFFO0VBQ2hDLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsaUJBQWlCO0VBQzFDLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsc0RBQXNEO0VBQy9FLElBQUksQ0FBQ0MsZUFBZSxHQUFHLGFBQWE7RUFDcEMsSUFBSSxDQUFDQyxlQUFlLEdBQUcsa0NBQWtDO0VBQ3pELElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsS0FBSzs7RUFFOUI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJLElBQUksQ0FBQ1IsSUFBSSxHQUFHLFVBQ1JTLGFBQWEsRUFDYkMsdUJBQXVCLEVBQ3ZCQyxnQkFBZ0IsRUFDaEJDLG9CQUFvQixFQUNwQkMsMkJBQTJCLEVBQzdCO0lBQ0UsSUFBSSxDQUFDQyxjQUFjLEdBQUduQixDQUFDLENBQUNjLGFBQWEsQ0FBQztJQUN0QyxJQUFJLENBQUNNLHdCQUF3QixHQUFHcEIsQ0FBQyxDQUFDZSx1QkFBdUIsQ0FBQztJQUMxRCxJQUFJLENBQUNNLGFBQWEsR0FBR3JCLENBQUMsQ0FBQ2lCLG9CQUFvQixDQUFDO0lBQzVDLElBQUksQ0FBQ0ssNEJBQTRCLEdBQUd0QixDQUFDLENBQUNrQiwyQkFBMkIsQ0FBQztJQUNsRSxJQUFJLENBQUNGLGdCQUFnQixHQUFHQSxnQkFBZ0I7SUFDeEMsSUFBSSxDQUFDTCxlQUFlLEdBQUdNLG9CQUFvQixHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUNOLGVBQWU7SUFFeEUsSUFBSSxDQUFDWSxtQkFBbUIsQ0FBQyxDQUFDO0lBQzFCLElBQUksQ0FBQ0MsMkJBQTJCLENBQUMsQ0FBQztJQUNsQyxJQUFJLENBQUNDLGlCQUFpQixDQUFDLENBQUM7RUFDNUIsQ0FBQztFQUVELElBQUksQ0FBQ0Msc0JBQXNCLEdBQUcsVUFBVUMsNkJBQTZCLEVBQUU7SUFDbkUsSUFBSSxJQUFJLENBQUNkLGlCQUFpQixFQUFFO01BQ3hCO0lBQ0o7SUFFQSxJQUFJZSxJQUFJLEdBQUdELDZCQUE2QixDQUFDRSxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDQSxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNsRixJQUFJQyxVQUFVLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDSixJQUFJLENBQUM7SUFFakMsS0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdILFVBQVUsQ0FBQ0ksTUFBTSxFQUFFRCxDQUFDLEVBQUUsRUFBRTtNQUN4Q0gsVUFBVSxDQUFDRyxDQUFDLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLEVBQUUsQ0FBQztNQUN0QixJQUFJLENBQUNDLE1BQU0sQ0FBQ04sVUFBVSxDQUFDRyxDQUFDLENBQUMsQ0FBQztJQUM5QjtJQUVBLElBQUksQ0FBQ3BCLGlCQUFpQixHQUFHLElBQUk7RUFDakMsQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNVLG1CQUFtQixHQUFHLFlBQVk7SUFDbkMsSUFBSWMsSUFBSSxHQUFHLElBQUk7SUFDZixJQUFJQyxpQkFBaUIsR0FBR0QsSUFBSSxDQUFDbEIsY0FBYyxDQUFDb0IsU0FBUyxDQUFDLENBQUM7SUFDdkRELGlCQUFpQixDQUFDRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVVDLEtBQUssRUFBRUMsUUFBUSxFQUFFO01BQ3BETCxJQUFJLENBQUNNLGdCQUFnQixDQUFDLENBQUM7TUFDdkJOLElBQUksQ0FBQ08scUJBQXFCLENBQ3RCTixpQkFBaUIsRUFDakJ0QyxDQUFDLENBQUMsR0FBRyxHQUFHcUMsSUFBSSxDQUFDbEIsY0FBYyxDQUFDMEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBR1IsSUFBSSxDQUFDckIsZ0JBQWdCLENBQ3hFLENBQUM7TUFFRCxJQUFJcUIsSUFBSSxDQUFDZiw0QkFBNEIsSUFBSUssNkJBQTZCLEVBQUU7UUFDcEUsSUFBSUEsNkJBQTZCLEdBQUdVLElBQUksQ0FBQ2YsNEJBQTRCLENBQUN3QixHQUFHLENBQUMsQ0FBQztRQUMzRVQsSUFBSSxDQUFDWCxzQkFBc0IsQ0FBQ0MsNkJBQTZCLENBQUM7UUFDMURVLElBQUksQ0FBQ2YsNEJBQTRCLENBQUN3QixHQUFHLENBQUMsRUFBRSxDQUFDO01BQzdDO0lBQ0osQ0FBQyxDQUFDO0VBQ04sQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSSxDQUFDRixxQkFBcUIsR0FBRyxVQUFVTixpQkFBaUIsRUFBRVMsVUFBVSxFQUFFO0lBQ2xFLElBQUlWLElBQUksR0FBRyxJQUFJO0lBRWZVLFVBQVUsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUN4QkQsVUFBVSxDQUFDUCxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7TUFDaEMsSUFBSVMsUUFBUSxHQUFHRixVQUFVLENBQUNHLEtBQUssQ0FBQ2xELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQ21ELE9BQU8sR0FBR2IsaUJBQWlCLENBQUNWLElBQUksQ0FBQyxDQUFDLENBQUNxQixRQUFRLENBQUM7UUFDNUNHLEVBQUUsR0FBR0QsT0FBTyxDQUFDLENBQUMsQ0FBQztNQUVuQixJQUFJbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDcUQsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3hCLE9BQU9oQixJQUFJLENBQUNELE1BQU0sQ0FBQ2UsT0FBTyxDQUFDO01BQy9CO01BRUEsT0FBT2QsSUFBSSxDQUFDaUIsU0FBUyxDQUFDRixFQUFFLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0VBQ04sQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNULGdCQUFnQixHQUFHLFlBQVk7SUFDaEMsSUFBSTdCLGFBQWEsR0FBRyxJQUFJLENBQUNLLGNBQWMsQ0FBQ29CLFNBQVMsQ0FBQyxDQUFDO01BQy9DRCxpQkFBaUIsR0FBR3hCLGFBQWEsQ0FBQ2MsSUFBSSxDQUFDLENBQUM7SUFFNUMsS0FBSyxJQUFJSyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdLLGlCQUFpQixDQUFDSixNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQy9DLElBQUlzQixnQkFBZ0IsR0FBR2pCLGlCQUFpQixDQUFDTCxDQUFDLENBQUM7UUFDdkN1QixjQUFjLEdBQUdELGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUNwQ0UsUUFBUSxHQUFHekQsQ0FBQyxDQUFDYyxhQUFhLENBQUM0QyxHQUFHLENBQUN6QixDQUFDLENBQUMsQ0FBQzBCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDO01BRXZFSCxRQUFRLENBQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO01BRS9CLElBQUksQ0FBQ0MsNkJBQTZCLENBQUNMLFFBQVEsRUFBRUQsY0FBYyxDQUFDO0lBQ2hFO0VBQ0osQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSSxDQUFDTSw2QkFBNkIsR0FBRyxVQUFVTCxRQUFRLEVBQUVELGNBQWMsRUFBRTtJQUNyRSxJQUFJTyxXQUFXLEdBQUcsU0FBQUEsQ0FBVUMsSUFBSSxFQUFFO01BQzlCLE9BQU9BLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBS1IsY0FBYztJQUNyQyxDQUFDO0lBRUQsSUFBSSxJQUFJLENBQUNoRCxzQkFBc0IsQ0FBQ3lELElBQUksQ0FBQ0YsV0FBVyxDQUFDLEVBQUU7TUFDL0NOLFFBQVEsQ0FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUM7SUFDbEM7RUFDSixDQUFDOztFQUVEO0FBQ0o7QUFDQTtFQUNJLElBQUksQ0FBQ0ssYUFBYSxHQUFHLFlBQVk7SUFDN0IsSUFBSUMsV0FBVyxHQUFHLEVBQUU7SUFFcEIsSUFBSSxJQUFJLENBQUMzRCxzQkFBc0IsQ0FBQzBCLE1BQU0sRUFBRTtNQUNwQ2lDLFdBQVcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDM0Qsc0JBQXNCLENBQUMwQixNQUFNLEdBQUcsR0FBRztJQUNqRTtJQUVBbEMsQ0FBQyxDQUFDLElBQUksQ0FBQ1csZUFBZSxDQUFDLENBQUN5RCxJQUFJLENBQUNELFdBQVcsQ0FBQztFQUM3QyxDQUFDOztFQUVEO0FBQ0o7QUFDQTtFQUNJLElBQUksQ0FBQ0Usa0NBQWtDLEdBQUcsWUFBWTtJQUNsRCxJQUFJQyxVQUFVLEdBQUcsSUFBSSxDQUFDOUQsc0JBQXNCLENBQUMrRCxNQUFNLENBQUMsVUFBVUMsTUFBTSxFQUFFQyxPQUFPLEVBQUV2QixLQUFLLEVBQUU7TUFDbEYsT0FBT0EsS0FBSyxHQUFHc0IsTUFBTSxHQUFHLEdBQUcsR0FBR0MsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHQSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUMsRUFBRSxFQUFFLENBQUM7SUFFTixJQUFJLENBQUNuRCw0QkFBNEIsQ0FBQ3dCLEdBQUcsQ0FBQ3dCLFVBQVUsQ0FBQztFQUNyRCxDQUFDOztFQUVEO0FBQ0o7QUFDQTtBQUNBO0VBQ0ksSUFBSSxDQUFDbEMsTUFBTSxHQUFHLFVBQVVlLE9BQU8sRUFBRTtJQUM3QixJQUFJdUIsWUFBWSxHQUFHdkIsT0FBTyxDQUFDd0IsS0FBSyxDQUFDLENBQUM7SUFDbENELFlBQVksQ0FBQ3ZCLE9BQU8sQ0FBQ2pCLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUN4QixpQkFBaUIsQ0FBQ21CLE9BQU8sQ0FBQyxHQUFHLEVBQUU2QyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBSSxDQUFDbEUsc0JBQXNCLENBQUMyQixJQUFJLENBQUN1QyxZQUFZLENBQUM7SUFDOUMsSUFBSSxDQUFDRSx3QkFBd0IsQ0FBQ0YsWUFBWSxDQUFDO0VBQy9DLENBQUM7O0VBRUQ7QUFDSjtBQUNBO0FBQ0E7RUFDSSxJQUFJLENBQUNwQixTQUFTLEdBQUcsVUFBVXVCLElBQUksRUFBRTtJQUM3QixJQUFJeEMsSUFBSSxHQUFHLElBQUk7SUFFZixJQUFJLENBQUM3QixzQkFBc0IsQ0FBQ3NFLEtBQUssQ0FBQyxVQUFVQyxJQUFJLEVBQUU3QixLQUFLLEVBQUU7TUFDckQsSUFBSTZCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBS0YsSUFBSSxFQUFFO1FBQ2xCLE9BQU8sSUFBSTtNQUNmO01BRUF4QyxJQUFJLENBQUM3QixzQkFBc0IsQ0FBQ3dFLE1BQU0sQ0FBQzlCLEtBQUssRUFBRSxDQUFDLENBQUM7TUFDNUMsT0FBTyxLQUFLO0lBQ2hCLENBQUMsQ0FBQztJQUNGYixJQUFJLENBQUN1Qyx3QkFBd0IsQ0FBQyxDQUFDO0VBQ25DLENBQUM7O0VBRUQ7QUFDSjtBQUNBO0VBQ0ksSUFBSSxDQUFDcEQsMkJBQTJCLEdBQUcsWUFBWTtJQUMzQyxJQUFJYSxJQUFJLEdBQUcsSUFBSTtNQUNYNEMsYUFBYSxHQUFHLElBQUksQ0FBQzdELHdCQUF3QjtJQUVqRDZELGFBQWEsQ0FBQ3pDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDL0IsaUJBQWlCLEVBQUUsVUFBVXlFLENBQUMsRUFBRTtNQUMzREEsQ0FBQyxDQUFDQyxjQUFjLENBQUMsQ0FBQztNQUVsQixJQUFJL0IsRUFBRSxHQUFHcEQsQ0FBQyxDQUFDa0YsQ0FBQyxDQUFDRSxNQUFNLENBQUMsQ0FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUM7TUFFakNSLElBQUksQ0FBQ2lCLFNBQVMsQ0FBQ0YsRUFBRSxDQUFDO01BQ2xCZixJQUFJLENBQUNNLGdCQUFnQixDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0VBQ04sQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNsQixpQkFBaUIsR0FBRyxZQUFZO0lBQ2pDLElBQUksQ0FBQ0osYUFBYSxDQUFDZ0UsTUFBTSxDQUFDLElBQUksQ0FBQ3pFLGVBQWUsQ0FBQztFQUNuRCxDQUFDOztFQUVEO0FBQ0o7QUFDQTtFQUNJLElBQUksQ0FBQ2dFLHdCQUF3QixHQUFHLFlBQVk7SUFDeEMsSUFBSSxDQUFDeEQsd0JBQXdCLENBQUNtQixTQUFTLENBQUMsQ0FBQyxDQUFDK0MsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDaEYsc0JBQXNCLENBQUMsQ0FBQ2lGLElBQUksQ0FBQyxDQUFDO0lBRTlGLElBQUksQ0FBQ3ZCLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ0csa0NBQWtDLENBQUMsQ0FBQztJQUN6QyxJQUFJLENBQUMxQixnQkFBZ0IsQ0FBQyxDQUFDO0VBQzNCLENBQUM7QUFDTCxDQUFDO0FBRURyQyxNQUFNLENBQUNDLE9BQU8sR0FBR1Qsc0JBQXNCOzs7Ozs7Ozs7O0FDL052QztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkMsbUJBQU8sQ0FBQyxxR0FBeUIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2N1cnJlbmN5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWduL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXJyZW5jeS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3NlbGVjdC1jdXJyZW5jeS10YWJsZS1hcGkvc2VsZWN0LWN1cnJlbmN5LXRhYmxlLWFwaS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jdXJyZW5jeS1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jdXJyZW5jeS1hc3NpZ24uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2VsZWN0Q3VycmVuY3lUYWJsZUFQSSA9IHJlcXVpcmUoJy4uL3NlbGVjdC1jdXJyZW5jeS10YWJsZS1hcGkvc2VsZWN0LWN1cnJlbmN5LXRhYmxlLWFwaScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF2YWlsYWJsZUN1cnJlbmNpZXNUYWJsZSA9IG5ldyBTZWxlY3RDdXJyZW5jeVRhYmxlQVBJKCk7XG4gICAgdmFyIGFzc2lnbmVkQ3VycmVuY2llc1RhYmxlID0gbmV3IFNlbGVjdEN1cnJlbmN5VGFibGVBUEkoKTtcblxuICAgIGF2YWlsYWJsZUN1cnJlbmNpZXNUYWJsZS5pbml0KFxuICAgICAgICAnI2F2YWlsYWJsZS1jdXJyZW5jeS10YWJsZScsXG4gICAgICAgICcjY3VycmVuY2llc1RvQmVBc3NpZ25lZCcsXG4gICAgICAgICcuanMtY3VycmVuY3ktY2hlY2tib3gnLFxuICAgICAgICAnYVtocmVmPVwiI3RhYi1jb250ZW50LWFzc2lnbm1lbnRfY3VycmVuY3lcIl0nLFxuICAgICAgICAnI3N0b3JlX2N1cnJlbmN5Q29kZXNUb0JlQXNzaWduZWQnLFxuICAgICk7XG5cbiAgICBhc3NpZ25lZEN1cnJlbmNpZXNUYWJsZS5pbml0KFxuICAgICAgICAnI2Fzc2lnbmVkLWN1cnJlbmN5LXRhYmxlJyxcbiAgICAgICAgJyNjdXJyZW5jaWVzVG9CZVVuYXNzaWduZWQnLFxuICAgICAgICAnLmpzLWN1cnJlbmN5LWNoZWNrYm94JyxcbiAgICAgICAgJ2FbaHJlZj1cIiN0YWItY29udGVudC1kZWFzc2lnbm1lbnRfY3VycmVuY3lcIl0nLFxuICAgICAgICAnI3N0b3JlX2N1cnJlbmN5Q29kZXNUb0JlRGVBc3NpZ25lZCcsXG4gICAgKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdEN1cnJlbmN5VGFibGVBUEk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTZWxlY3RDdXJyZW5jeVRhYmxlQVBJID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YSA9IFtdO1xuICAgIHRoaXMucmVtb3ZlQnRuU2VsZWN0b3IgPSAnLmpzLXJlbW92ZS1pdGVtJztcbiAgICB0aGlzLnJlbW92ZUJ0blRlbXBsYXRlID0gJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJqcy1yZW1vdmUtaXRlbSBidG4teHNcIj5SZW1vdmU8L2E+JztcbiAgICB0aGlzLmNvdW50ZXJTZWxlY3RvciA9ICcuanMtY291bnRlcic7XG4gICAgdGhpcy5jb3VudGVyVGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJqcy1jb3VudGVyXCI+PC9zcGFuPic7XG4gICAgdGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBhbGwgdGFibGUgYWRkaW5nIGZ1bmN0aW9uYWxpdHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGN1cnJlbmN5VGFibGUgLSBDdXJyZW50IHRhYmxlIHdpdGggY3VycmVuY2llcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0ZWRDdXJyZW5jaWVzVGFibGUgLSBUYWJsZSB3aGVyZSBzaG91bGQgY3VycmVuY3kgYmUgYWRkZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoZWNrYm94U2VsZWN0b3IgLSBDaGVja2JveCBzZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY291bnRlckxhYmVsU2VsZWN0b3IgLSBUYWJzIGxhYmVsIHdoZXJlIHdpbGwgYmUgYWRkZWQgY291bnQgb2Ygc2VsZWN0IGN1cnJlbmNpZXMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0V2l0aFNlbGVjdGVkQ3VycmVuY2llcyAtIEluIHRoaXMgaW5wdXQgd2lsbCBwdXR0ZWQgYWxsIHNlbGVjdGVkIGN1cnJlbmN5IGlkcy5cbiAgICAgKi9cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoXG4gICAgICAgIGN1cnJlbmN5VGFibGUsXG4gICAgICAgIHNlbGVjdGVkQ3VycmVuY2llc1RhYmxlLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICBjb3VudGVyTGFiZWxTZWxlY3RvcixcbiAgICAgICAgaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzLFxuICAgICkge1xuICAgICAgICB0aGlzLiRjdXJyZW5jeVRhYmxlID0gJChjdXJyZW5jeVRhYmxlKTtcbiAgICAgICAgdGhpcy4kc2VsZWN0ZWRDdXJyZW5jaWVzVGFibGUgPSAkKHNlbGVjdGVkQ3VycmVuY2llc1RhYmxlKTtcbiAgICAgICAgdGhpcy4kY291bnRlckxhYmVsID0gJChjb3VudGVyTGFiZWxTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuJGlucHV0V2l0aFNlbGVjdGVkQ3VycmVuY2llcyA9ICQoaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzKTtcbiAgICAgICAgdGhpcy5jaGVja2JveFNlbGVjdG9yID0gY2hlY2tib3hTZWxlY3RvcjtcbiAgICAgICAgdGhpcy5jb3VudGVyU2VsZWN0b3IgPSBjb3VudGVyTGFiZWxTZWxlY3RvciArICcgJyArIHRoaXMuY291bnRlclNlbGVjdG9yO1xuXG4gICAgICAgIHRoaXMuZHJhd0N1cnJlbmNpZXNUYWJsZSgpO1xuICAgICAgICB0aGlzLmFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlcigpO1xuICAgICAgICB0aGlzLmFkZENvdW50ZXJUb0xhYmVsKCk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0Q3VycmVuY2llc09uTG9hZCA9IGZ1bmN0aW9uIChpbml0aWFsU2VsZWN0ZWRDdXJyZW5jaWVzRGF0YSkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsRGF0YUxvYWRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGEgPSBpbml0aWFsU2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5yZXBsYWNlKC8mcXVvdDsvZywgJ1wiJykucmVwbGFjZSgvLC9nLCAnJyk7XG4gICAgICAgIHZhciBwYXJzZWREYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnNlZERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHBhcnNlZERhdGFbaV0ucHVzaCgnJyk7XG4gICAgICAgICAgICB0aGlzLmFkZFJvdyhwYXJzZWREYXRhW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5pdGlhbERhdGFMb2FkZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEcmF3IG1ldGhvZCBvZiBEYXRhVGFibGUuIEZpcmVzIGV2ZXJ5IHRpbWUgdGFibGUgcmVyZW5kZXIuXG4gICAgICovXG4gICAgdGhpcy5kcmF3Q3VycmVuY2llc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjdXJyZW5jeVRhYmxlRGF0YSA9IHNlbGYuJGN1cnJlbmN5VGFibGUuRGF0YVRhYmxlKCk7XG4gICAgICAgIGN1cnJlbmN5VGFibGVEYXRhLm9uKCdkcmF3JywgZnVuY3Rpb24gKGV2ZW50LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDaGVja2JveGVzKCk7XG4gICAgICAgICAgICBzZWxmLm1hcEV2ZW50c1RvQ2hlY2tib3hlcyhcbiAgICAgICAgICAgICAgICBjdXJyZW5jeVRhYmxlRGF0YSxcbiAgICAgICAgICAgICAgICAkKCcjJyArIHNlbGYuJGN1cnJlbmN5VGFibGUuYXR0cignaWQnKSArICcgJyArIHNlbGYuY2hlY2tib3hTZWxlY3RvciksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzICYmIGluaXRpYWxTZWxlY3RlZEN1cnJlbmNpZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxTZWxlY3RlZEN1cnJlbmNpZXNEYXRhID0gc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzLnZhbCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0Q3VycmVuY2llc09uTG9hZChpbml0aWFsU2VsZWN0ZWRDdXJyZW5jaWVzRGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgY2hhbmdlIGV2ZW50IGZvciBhbGwgY2hlY2tib3hlcyBjaGVja2JveC4gRmlyZXMgZXZlcnkgdGltZSwgd2hlbiBjdXJyZW5jeSB0YWJsZSByZWRyYXdzLlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW5jeVRhYmxlRGF0YSAtIERhdGFUYWJsZSBvcHRpb25zICggZ2V0IGJ5ICQoZWxlbWVudCkuRGF0YVRhYmxlKCkgKS5cbiAgICAgKiBAcGFyYW0ge2NoZWNrYm94ZXN9IGNoZWNrYm94ZXMgLSBDb2xsZWN0aW9uIG9mIGFsbCBjaGVja2JveGVzIGluIEN1cnJlbmN5IFRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMubWFwRXZlbnRzVG9DaGVja2JveGVzID0gZnVuY3Rpb24gKGN1cnJlbmN5VGFibGVEYXRhLCBjaGVja2JveGVzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICBjaGVja2JveGVzLm9mZignY2hhbmdlJyk7XG4gICAgICAgIGNoZWNrYm94ZXMub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IGNoZWNrYm94ZXMuaW5kZXgoJCh0aGlzKSksXG4gICAgICAgICAgICAgICAgcm93RGF0YSA9IGN1cnJlbmN5VGFibGVEYXRhLmRhdGEoKVtyb3dJbmRleF0sXG4gICAgICAgICAgICAgICAgaWQgPSByb3dEYXRhWzBdO1xuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmFkZFJvdyhyb3dEYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVtb3ZlUm93KGlkKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RlZCBjdXJyZW5jaWVzIGluIGN1cnJlbmN5IHRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ2hlY2tib3hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN1cnJlbmN5VGFibGUgPSB0aGlzLiRjdXJyZW5jeVRhYmxlLkRhdGFUYWJsZSgpLFxuICAgICAgICAgICAgY3VycmVuY3lUYWJsZURhdGEgPSBjdXJyZW5jeVRhYmxlLmRhdGEoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbmN5VGFibGVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVuY3lJdGVtRGF0YSA9IGN1cnJlbmN5VGFibGVEYXRhW2ldLFxuICAgICAgICAgICAgICAgIGN1cnJlbmN5SXRlbUlkID0gY3VycmVuY3lJdGVtRGF0YVswXSxcbiAgICAgICAgICAgICAgICBjaGVja0JveCA9ICQoY3VycmVuY3lUYWJsZS5yb3coaSkubm9kZSgpKS5maW5kKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XG5cbiAgICAgICAgICAgIGNoZWNrQm94LnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZmluZFNlbGVjdGVkQ3VycmVuY2llc0luVGFibGUoY2hlY2tCb3gsIGN1cnJlbmN5SXRlbUlkKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3Igc2VsZWN0ZWQgY3VycmVuY2llcyBpbiBjdXJyZW5jeSB0YWJsZS5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2hlY2tCb3ggLSBKcXVlcnkgb2JqZWN0IHdpdGggY2hlY2tib3guXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGN1cnJlbmN5SXRlbUlkIC0gSWQgaWYgY3VycmVuY3kgcm93LlxuICAgICAqL1xuICAgIHRoaXMuZmluZFNlbGVjdGVkQ3VycmVuY2llc0luVGFibGUgPSBmdW5jdGlvbiAoY2hlY2tCb3gsIGN1cnJlbmN5SXRlbUlkKSB7XG4gICAgICAgIHZhciBpdGVtRXF1YWxJZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXSA9PT0gY3VycmVuY3lJdGVtSWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5zb21lKGl0ZW1FcXVhbElkKSkge1xuICAgICAgICAgICAgY2hlY2tCb3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb3VudGVyLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ZXJUZXh0ID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvdW50ZXJUZXh0ID0gJyAoJyArIHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5sZW5ndGggKyAnKSc7XG4gICAgICAgIH1cblxuICAgICAgICAkKHRoaXMuY291bnRlclNlbGVjdG9yKS5odG1sKGNvdW50ZXJUZXh0KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHNlbGVjdGVkIGN1cnJlbmNpZXMgaW5wdXQgdmFsdWUuXG4gICAgICovXG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZEN1cnJlbmNpZXNJbnB1dFZhbHVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW5wdXRWYWx1ZSA9IHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5yZWR1Y2UoZnVuY3Rpb24gKGNvbmNhdCwgY3VycmVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRleCA/IGNvbmNhdCArICcsJyArIGN1cnJlbnRbMV0gOiBjdXJyZW50WzFdO1xuICAgICAgICB9LCAnJyk7XG5cbiAgICAgICAgdGhpcy4kaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzLnZhbChpbnB1dFZhbHVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNlbGVjdGVkIGN1cnJlbmN5IHRvIGFycmF5IHdpdGggYWxsIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHJvd0RhdGEgLSBBcnJheSBvZiBhbGwgZGF0YSBzZWxlY3RlZCBjdXJyZW5jeS5cbiAgICAgKi9cbiAgICB0aGlzLmFkZFJvdyA9IGZ1bmN0aW9uIChyb3dEYXRhKSB7XG4gICAgICAgIHZhciBjdXJyZW5jeUl0ZW0gPSByb3dEYXRhLnNsaWNlKCk7XG4gICAgICAgIGN1cnJlbmN5SXRlbVtyb3dEYXRhLmxlbmd0aCAtIDFdID0gdGhpcy5yZW1vdmVCdG5UZW1wbGF0ZS5yZXBsYWNlKCcjJywgY3VycmVuY3lJdGVtWzFdKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEN1cnJlbmNpZXNEYXRhLnB1c2goY3VycmVuY3lJdGVtKTtcbiAgICAgICAgdGhpcy5yZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUoY3VycmVuY3lJdGVtKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHJvdyBmcm9tIGFycmF5IHdpdGggYWxsIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb2RlIC0gQ3VycmVuY2llcyBjb2RlIHdoaWNoIHNob3VsZCBiZSBkZWxldGVkLlxuICAgICAqL1xuICAgIHRoaXMucmVtb3ZlUm93ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5ldmVyeShmdW5jdGlvbiAoZWxlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChlbGVtWzFdICE9PSBjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5yZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGV2ZW50IGZvciByZW1vdmUgYnV0dG9uIHRvIHJlbW92ZSByb3cgZnJvbSBhcnJheSB3aXRoIGFsbCBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKi9cbiAgICB0aGlzLmFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgc2VsZWN0ZWRUYWJsZSA9IHRoaXMuJHNlbGVjdGVkQ3VycmVuY2llc1RhYmxlO1xuXG4gICAgICAgIHNlbGVjdGVkVGFibGUub24oJ2NsaWNrJywgdGhpcy5yZW1vdmVCdG5TZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyIGlkID0gJChlLnRhcmdldCkuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICBzZWxmLnJlbW92ZVJvdyhpZCk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBjb3VudGVyIHRlbXBsYXRlIG9uIGluaXQuXG4gICAgICovXG4gICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kY291bnRlckxhYmVsLmFwcGVuZCh0aGlzLmNvdW50ZXJUZW1wbGF0ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZHJhdyB0YWJsZSB3aXRoIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHRoaXMucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzZWxlY3RlZEN1cnJlbmNpZXNUYWJsZS5EYXRhVGFibGUoKS5jbGVhcigpLnJvd3MuYWRkKHRoaXMuc2VsZWN0ZWRDdXJyZW5jaWVzRGF0YSkuZHJhdygpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ291bnRlcigpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGVkQ3VycmVuY2llc0lucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja2JveGVzKCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0Q3VycmVuY3lUYWJsZUFQSTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2Fzc2lnbi9hc3NpZ24nKTtcbiJdLCJuYW1lcyI6WyJTZWxlY3RDdXJyZW5jeVRhYmxlQVBJIiwicmVxdWlyZSIsIiQiLCJkb2N1bWVudCIsInJlYWR5IiwiYXZhaWxhYmxlQ3VycmVuY2llc1RhYmxlIiwiYXNzaWduZWRDdXJyZW5jaWVzVGFibGUiLCJpbml0IiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGVjdGVkQ3VycmVuY2llc0RhdGEiLCJyZW1vdmVCdG5TZWxlY3RvciIsInJlbW92ZUJ0blRlbXBsYXRlIiwiY291bnRlclNlbGVjdG9yIiwiY291bnRlclRlbXBsYXRlIiwiaW5pdGlhbERhdGFMb2FkZWQiLCJjdXJyZW5jeVRhYmxlIiwic2VsZWN0ZWRDdXJyZW5jaWVzVGFibGUiLCJjaGVja2JveFNlbGVjdG9yIiwiY291bnRlckxhYmVsU2VsZWN0b3IiLCJpbnB1dFdpdGhTZWxlY3RlZEN1cnJlbmNpZXMiLCIkY3VycmVuY3lUYWJsZSIsIiRzZWxlY3RlZEN1cnJlbmNpZXNUYWJsZSIsIiRjb3VudGVyTGFiZWwiLCIkaW5wdXRXaXRoU2VsZWN0ZWRDdXJyZW5jaWVzIiwiZHJhd0N1cnJlbmNpZXNUYWJsZSIsImFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlciIsImFkZENvdW50ZXJUb0xhYmVsIiwic2VsZWN0Q3VycmVuY2llc09uTG9hZCIsImluaXRpYWxTZWxlY3RlZEN1cnJlbmNpZXNEYXRhIiwiZGF0YSIsInJlcGxhY2UiLCJwYXJzZWREYXRhIiwiSlNPTiIsInBhcnNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJhZGRSb3ciLCJzZWxmIiwiY3VycmVuY3lUYWJsZURhdGEiLCJEYXRhVGFibGUiLCJvbiIsImV2ZW50Iiwic2V0dGluZ3MiLCJ1cGRhdGVDaGVja2JveGVzIiwibWFwRXZlbnRzVG9DaGVja2JveGVzIiwiYXR0ciIsInZhbCIsImNoZWNrYm94ZXMiLCJvZmYiLCJyb3dJbmRleCIsImluZGV4Iiwicm93RGF0YSIsImlkIiwiaXMiLCJyZW1vdmVSb3ciLCJjdXJyZW5jeUl0ZW1EYXRhIiwiY3VycmVuY3lJdGVtSWQiLCJjaGVja0JveCIsInJvdyIsIm5vZGUiLCJmaW5kIiwicHJvcCIsImZpbmRTZWxlY3RlZEN1cnJlbmNpZXNJblRhYmxlIiwiaXRlbUVxdWFsSWQiLCJpdGVtIiwic29tZSIsInVwZGF0ZUNvdW50ZXIiLCJjb3VudGVyVGV4dCIsImh0bWwiLCJ1cGRhdGVTZWxlY3RlZEN1cnJlbmNpZXNJbnB1dFZhbHVlIiwiaW5wdXRWYWx1ZSIsInJlZHVjZSIsImNvbmNhdCIsImN1cnJlbnQiLCJjdXJyZW5jeUl0ZW0iLCJzbGljZSIsInJlbmRlclNlbGVjdGVkSXRlbXNUYWJsZSIsImNvZGUiLCJldmVyeSIsImVsZW0iLCJzcGxpY2UiLCJzZWxlY3RlZFRhYmxlIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwiYXBwZW5kIiwiY2xlYXIiLCJyb3dzIiwiYWRkIiwiZHJhdyJdLCJzb3VyY2VSb290IjoiIn0=