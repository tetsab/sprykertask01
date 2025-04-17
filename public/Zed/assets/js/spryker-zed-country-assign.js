"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-country-assign"],{

/***/ "./vendor/spryker/country-gui/assets/Zed/js/modules/assign/assign.js":
/*!***************************************************************************!*\
  !*** ./vendor/spryker/country-gui/assets/Zed/js/modules/assign/assign.js ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectCountryTableAPI = __webpack_require__(/*! ../select-country-table-api/select-country-table-api */ "./vendor/spryker/country-gui/assets/Zed/js/modules/select-country-table-api/select-country-table-api.js");
$(document).ready(function () {
  var availableCountriesTable = new SelectCountryTableAPI();
  var assignedCountriesTable = new SelectCountryTableAPI();
  availableCountriesTable.init('#available-country-table', '#countriesToBeAssigned', '.js-country-checkbox', 'a[href="#tab-content-assignment_country"]', '#store_countryCodesToBeAssigned');
  assignedCountriesTable.init('#assigned-country-table', '#countriesToBeUnassigned', '.js-country-checkbox', 'a[href="#tab-content-deassignment_country"]', '#store_countryCodesToBeDeAssigned');
});
module.exports = SelectCountryTableAPI;

/***/ }),

/***/ "./vendor/spryker/country-gui/assets/Zed/js/modules/select-country-table-api/select-country-table-api.js":
/*!***************************************************************************************************************!*\
  !*** ./vendor/spryker/country-gui/assets/Zed/js/modules/select-country-table-api/select-country-table-api.js ***!
  \***************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectCountryTableAPI = function () {
  this.selectedCountriesData = [];
  this.removeBtnSelector = '.js-remove-item';
  this.removeBtnTemplate = '<a href="#" class="js-remove-item btn-xs">Remove</a>';
  this.counterSelector = '.js-counter';
  this.counterTemplate = '<span class="js-counter"></span>';
  this.initialDataLoaded = false;

  /**
   * Init all table adding functionality.
   * @param {string} countryTable - Current table with countries.
   * @param {string} selectedCountriesTable - Table where should country be added.
   * @param {string} checkboxSelector - Checkbox selector.
   * @param {string} counterLabelSelector - Tabs label where will be added count of select countries.
   * @param {string} inputWithSelectedCountries - In this input will putted all selected country ids.
   */
  this.init = function (countryTable, selectedCountriesTable, checkboxSelector, counterLabelSelector, inputWithSelectedCountries) {
    this.$countryTable = $(countryTable);
    this.$selectedCountriesTable = $(selectedCountriesTable);
    this.$counterLabel = $(counterLabelSelector);
    this.$inputWithSelectedCountries = $(inputWithSelectedCountries);
    this.checkboxSelector = checkboxSelector;
    this.counterSelector = counterLabelSelector + ' ' + this.counterSelector;
    this.drawCountriesTable();
    this.addRemoveButtonClickHandler();
    this.addCounterToLabel();
  };
  this.selectCountriesOnLoad = function (initialSelectedCountriesData) {
    if (this.initialDataLoaded) {
      return;
    }
    var data = initialSelectedCountriesData.replace(/&quot;/g, '"').replace(/,/g, '');
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
  this.drawCountriesTable = function () {
    var self = this;
    var countryTableData = self.$countryTable.DataTable();
    countryTableData.on('draw', function (event, settings) {
      self.updateCheckboxes();
      self.mapEventsToCheckboxes(countryTableData, $('#' + self.$countryTable.attr('id') + ' ' + self.checkboxSelector));
      if (self.$inputWithSelectedCountries && initialSelectedCountriesData) {
        var initialSelectedCountriesData = self.$inputWithSelectedCountries.val();
        self.selectCountriesOnLoad(initialSelectedCountriesData);
        self.$inputWithSelectedCountries.val('');
      }
    });
  };

  /**
   * Add change event for all checkboxes checkbox. Fires every time, when country table redraws.
   * @param {object} countryTableData - DataTable options ( get by $(element).DataTable() ).
   * @param {checkboxes} checkboxes - Collection of all checkboxes in Country Table.
   */
  this.mapEventsToCheckboxes = function (countryTableData, checkboxes) {
    var self = this;
    checkboxes.off('change');
    checkboxes.on('change', function () {
      var rowIndex = checkboxes.index($(this)),
        rowData = countryTableData.data()[rowIndex],
        id = rowData[0];
      if ($(this).is(':checked')) {
        return self.addRow(rowData);
      }
      return self.removeRow(id);
    });
  };

  /**
   * Check for selected countries in country table.
   */
  this.updateCheckboxes = function () {
    var countryTable = this.$countryTable.DataTable(),
      countryTableData = countryTable.data();
    for (var i = 0; i < countryTableData.length; i++) {
      var countryItemData = countryTableData[i],
        countryItemId = countryItemData[0],
        checkBox = $(countryTable.row(i).node()).find('[type="checkbox"]');
      checkBox.prop('checked', false);
      this.findSelectedCountriesInTable(checkBox, countryItemId);
    }
  };

  /**
   * Check for selected countries in country table.
   * @param {object} checkBox - Jquery object with checkbox.
   * @param {number} countryItemId - Id if country row.
   */
  this.findSelectedCountriesInTable = function (checkBox, countryItemId) {
    var itemEqualId = function (item) {
      return item[0] === countryItemId;
    };
    if (this.selectedCountriesData.some(itemEqualId)) {
      checkBox.prop('checked', true);
    }
  };

  /**
   * Update counter.
   */
  this.updateCounter = function () {
    var counterText = '';
    if (this.selectedCountriesData.length) {
      counterText = ' (' + this.selectedCountriesData.length + ')';
    }
    $(this.counterSelector).html(counterText);
  };

  /**
   * Update selected countries input value.
   */
  this.updateSelectedCountriesInputValue = function () {
    var inputValue = this.selectedCountriesData.reduce(function (concat, current, index) {
      return index ? concat + ',' + current[1] : current[1];
    }, '');
    this.$inputWithSelectedCountries.val(inputValue);
  };

  /**
   * Add selected country to array with all selected items.
   * @param {array} rowData - Array of all data selected country.
   */
  this.addRow = function (rowData) {
    var countryItem = rowData.slice();
    countryItem[rowData.length - 1] = this.removeBtnTemplate.replace('#', countryItem[1]);
    this.selectedCountriesData.push(countryItem);
    this.renderSelectedItemsTable(countryItem);
  };

  /**
   * Remove row from array with all selected items.
   * @param {string} code - Countries code which should be deleted.
   */
  this.removeRow = function (code) {
    var self = this;
    this.selectedCountriesData.every(function (elem, index) {
      if (elem[1] !== code) {
        return true;
      }
      self.selectedCountriesData.splice(index, 1);
      return false;
    });
    self.renderSelectedItemsTable();
  };

  /**
   * Add event for remove button to remove row from array with all selected items.
   */
  this.addRemoveButtonClickHandler = function () {
    var self = this,
      selectedTable = this.$selectedCountriesTable;
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
    this.$selectedCountriesTable.DataTable().clear().rows.add(this.selectedCountriesData).draw();
    this.updateCounter();
    this.updateSelectedCountriesInputValue();
    this.updateCheckboxes();
  };
};
module.exports = SelectCountryTableAPI;

/***/ }),

/***/ "./vendor/spryker/country-gui/assets/Zed/js/spryker-zed-country-assign.entry.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/country-gui/assets/Zed/js/spryker-zed-country-assign.entry.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/assign/assign */ "./vendor/spryker/country-gui/assets/Zed/js/modules/assign/assign.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/country-gui/assets/Zed/js/spryker-zed-country-assign.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsT0FBTyxFQUFFLElBQUksQ0FBQy9CLGlCQUFpQixFQUFFLFVBQVV5RSxDQUFDLEVBQUU7TUFDM0RBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFFbEIsSUFBSS9CLEVBQUUsR0FBR3BELENBQUMsQ0FBQ2tGLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLENBQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDO01BRWpDUixJQUFJLENBQUNpQixTQUFTLENBQUNGLEVBQUUsQ0FBQztNQUNsQmYsSUFBSSxDQUFDTSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOLENBQUM7O0VBRUQ7QUFDSjtBQUNBO0VBQ0ksSUFBSSxDQUFDbEIsaUJBQWlCLEdBQUcsWUFBWTtJQUNqQyxJQUFJLENBQUNKLGFBQWEsQ0FBQ2dFLE1BQU0sQ0FBQyxJQUFJLENBQUN6RSxlQUFlLENBQUM7RUFDbkQsQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNnRSx3QkFBd0IsR0FBRyxZQUFZO0lBQ3hDLElBQUksQ0FBQ3hELHVCQUF1QixDQUFDbUIsU0FBUyxDQUFDLENBQUMsQ0FBQytDLEtBQUssQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQ2hGLHFCQUFxQixDQUFDLENBQUNpRixJQUFJLENBQUMsQ0FBQztJQUU1RixJQUFJLENBQUN2QixhQUFhLENBQUMsQ0FBQztJQUNwQixJQUFJLENBQUNHLGlDQUFpQyxDQUFDLENBQUM7SUFDeEMsSUFBSSxDQUFDMUIsZ0JBQWdCLENBQUMsQ0FBQztFQUMzQixDQUFDO0FBQ0wsQ0FBQztBQUVEckMsTUFBTSxDQUFDQyxPQUFPLEdBQUdULHFCQUFxQjs7Ozs7Ozs7OztBQy9OdEM7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsb0dBQXlCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb3VudHJ5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYXNzaWduL2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb3VudHJ5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvc2VsZWN0LWNvdW50cnktdGFibGUtYXBpL3NlbGVjdC1jb3VudHJ5LXRhYmxlLWFwaS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb3VudHJ5LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNvdW50cnktYXNzaWduLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdENvdW50cnlUYWJsZUFQSSA9IHJlcXVpcmUoJy4uL3NlbGVjdC1jb3VudHJ5LXRhYmxlLWFwaS9zZWxlY3QtY291bnRyeS10YWJsZS1hcGknKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGVDb3VudHJpZXNUYWJsZSA9IG5ldyBTZWxlY3RDb3VudHJ5VGFibGVBUEkoKTtcbiAgICB2YXIgYXNzaWduZWRDb3VudHJpZXNUYWJsZSA9IG5ldyBTZWxlY3RDb3VudHJ5VGFibGVBUEkoKTtcblxuICAgIGF2YWlsYWJsZUNvdW50cmllc1RhYmxlLmluaXQoXG4gICAgICAgICcjYXZhaWxhYmxlLWNvdW50cnktdGFibGUnLFxuICAgICAgICAnI2NvdW50cmllc1RvQmVBc3NpZ25lZCcsXG4gICAgICAgICcuanMtY291bnRyeS1jaGVja2JveCcsXG4gICAgICAgICdhW2hyZWY9XCIjdGFiLWNvbnRlbnQtYXNzaWdubWVudF9jb3VudHJ5XCJdJyxcbiAgICAgICAgJyNzdG9yZV9jb3VudHJ5Q29kZXNUb0JlQXNzaWduZWQnLFxuICAgICk7XG5cbiAgICBhc3NpZ25lZENvdW50cmllc1RhYmxlLmluaXQoXG4gICAgICAgICcjYXNzaWduZWQtY291bnRyeS10YWJsZScsXG4gICAgICAgICcjY291bnRyaWVzVG9CZVVuYXNzaWduZWQnLFxuICAgICAgICAnLmpzLWNvdW50cnktY2hlY2tib3gnLFxuICAgICAgICAnYVtocmVmPVwiI3RhYi1jb250ZW50LWRlYXNzaWdubWVudF9jb3VudHJ5XCJdJyxcbiAgICAgICAgJyNzdG9yZV9jb3VudHJ5Q29kZXNUb0JlRGVBc3NpZ25lZCcsXG4gICAgKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdENvdW50cnlUYWJsZUFQSTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdENvdW50cnlUYWJsZUFQSSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkQ291bnRyaWVzRGF0YSA9IFtdO1xuICAgIHRoaXMucmVtb3ZlQnRuU2VsZWN0b3IgPSAnLmpzLXJlbW92ZS1pdGVtJztcbiAgICB0aGlzLnJlbW92ZUJ0blRlbXBsYXRlID0gJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJqcy1yZW1vdmUtaXRlbSBidG4teHNcIj5SZW1vdmU8L2E+JztcbiAgICB0aGlzLmNvdW50ZXJTZWxlY3RvciA9ICcuanMtY291bnRlcic7XG4gICAgdGhpcy5jb3VudGVyVGVtcGxhdGUgPSAnPHNwYW4gY2xhc3M9XCJqcy1jb3VudGVyXCI+PC9zcGFuPic7XG4gICAgdGhpcy5pbml0aWFsRGF0YUxvYWRlZCA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBhbGwgdGFibGUgYWRkaW5nIGZ1bmN0aW9uYWxpdHkuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvdW50cnlUYWJsZSAtIEN1cnJlbnQgdGFibGUgd2l0aCBjb3VudHJpZXMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdGVkQ291bnRyaWVzVGFibGUgLSBUYWJsZSB3aGVyZSBzaG91bGQgY291bnRyeSBiZSBhZGRlZC5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2hlY2tib3hTZWxlY3RvciAtIENoZWNrYm94IHNlbGVjdG9yLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb3VudGVyTGFiZWxTZWxlY3RvciAtIFRhYnMgbGFiZWwgd2hlcmUgd2lsbCBiZSBhZGRlZCBjb3VudCBvZiBzZWxlY3QgY291bnRyaWVzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFdpdGhTZWxlY3RlZENvdW50cmllcyAtIEluIHRoaXMgaW5wdXQgd2lsbCBwdXR0ZWQgYWxsIHNlbGVjdGVkIGNvdW50cnkgaWRzLlxuICAgICAqL1xuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChcbiAgICAgICAgY291bnRyeVRhYmxlLFxuICAgICAgICBzZWxlY3RlZENvdW50cmllc1RhYmxlLFxuICAgICAgICBjaGVja2JveFNlbGVjdG9yLFxuICAgICAgICBjb3VudGVyTGFiZWxTZWxlY3RvcixcbiAgICAgICAgaW5wdXRXaXRoU2VsZWN0ZWRDb3VudHJpZXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuJGNvdW50cnlUYWJsZSA9ICQoY291bnRyeVRhYmxlKTtcbiAgICAgICAgdGhpcy4kc2VsZWN0ZWRDb3VudHJpZXNUYWJsZSA9ICQoc2VsZWN0ZWRDb3VudHJpZXNUYWJsZSk7XG4gICAgICAgIHRoaXMuJGNvdW50ZXJMYWJlbCA9ICQoY291bnRlckxhYmVsU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLiRpbnB1dFdpdGhTZWxlY3RlZENvdW50cmllcyA9ICQoaW5wdXRXaXRoU2VsZWN0ZWRDb3VudHJpZXMpO1xuICAgICAgICB0aGlzLmNoZWNrYm94U2VsZWN0b3IgPSBjaGVja2JveFNlbGVjdG9yO1xuICAgICAgICB0aGlzLmNvdW50ZXJTZWxlY3RvciA9IGNvdW50ZXJMYWJlbFNlbGVjdG9yICsgJyAnICsgdGhpcy5jb3VudGVyU2VsZWN0b3I7XG5cbiAgICAgICAgdGhpcy5kcmF3Q291bnRyaWVzVGFibGUoKTtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVCdXR0b25DbGlja0hhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCgpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdENvdW50cmllc09uTG9hZCA9IGZ1bmN0aW9uIChpbml0aWFsU2VsZWN0ZWRDb3VudHJpZXNEYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxEYXRhTG9hZGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0YSA9IGluaXRpYWxTZWxlY3RlZENvdW50cmllc0RhdGEucmVwbGFjZSgvJnF1b3Q7L2csICdcIicpLnJlcGxhY2UoLywvZywgJycpO1xuICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJzZWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJzZWREYXRhW2ldLnB1c2goJycpO1xuICAgICAgICAgICAgdGhpcy5hZGRSb3cocGFyc2VkRGF0YVtpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhdyBtZXRob2Qgb2YgRGF0YVRhYmxlLiBGaXJlcyBldmVyeSB0aW1lIHRhYmxlIHJlcmVuZGVyLlxuICAgICAqL1xuICAgIHRoaXMuZHJhd0NvdW50cmllc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjb3VudHJ5VGFibGVEYXRhID0gc2VsZi4kY291bnRyeVRhYmxlLkRhdGFUYWJsZSgpO1xuICAgICAgICBjb3VudHJ5VGFibGVEYXRhLm9uKCdkcmF3JywgZnVuY3Rpb24gKGV2ZW50LCBzZXR0aW5ncykge1xuICAgICAgICAgICAgc2VsZi51cGRhdGVDaGVja2JveGVzKCk7XG4gICAgICAgICAgICBzZWxmLm1hcEV2ZW50c1RvQ2hlY2tib3hlcyhcbiAgICAgICAgICAgICAgICBjb3VudHJ5VGFibGVEYXRhLFxuICAgICAgICAgICAgICAgICQoJyMnICsgc2VsZi4kY291bnRyeVRhYmxlLmF0dHIoJ2lkJykgKyAnICcgKyBzZWxmLmNoZWNrYm94U2VsZWN0b3IpLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkQ291bnRyaWVzICYmIGluaXRpYWxTZWxlY3RlZENvdW50cmllc0RhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5pdGlhbFNlbGVjdGVkQ291bnRyaWVzRGF0YSA9IHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkQ291bnRyaWVzLnZhbCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0Q291bnRyaWVzT25Mb2FkKGluaXRpYWxTZWxlY3RlZENvdW50cmllc0RhdGEpO1xuICAgICAgICAgICAgICAgIHNlbGYuJGlucHV0V2l0aFNlbGVjdGVkQ291bnRyaWVzLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgY2hhbmdlIGV2ZW50IGZvciBhbGwgY2hlY2tib3hlcyBjaGVja2JveC4gRmlyZXMgZXZlcnkgdGltZSwgd2hlbiBjb3VudHJ5IHRhYmxlIHJlZHJhd3MuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvdW50cnlUYWJsZURhdGEgLSBEYXRhVGFibGUgb3B0aW9ucyAoIGdldCBieSAkKGVsZW1lbnQpLkRhdGFUYWJsZSgpICkuXG4gICAgICogQHBhcmFtIHtjaGVja2JveGVzfSBjaGVja2JveGVzIC0gQ29sbGVjdGlvbiBvZiBhbGwgY2hlY2tib3hlcyBpbiBDb3VudHJ5IFRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMubWFwRXZlbnRzVG9DaGVja2JveGVzID0gZnVuY3Rpb24gKGNvdW50cnlUYWJsZURhdGEsIGNoZWNrYm94ZXMpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGNoZWNrYm94ZXMub2ZmKCdjaGFuZ2UnKTtcbiAgICAgICAgY2hlY2tib3hlcy5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHJvd0luZGV4ID0gY2hlY2tib3hlcy5pbmRleCgkKHRoaXMpKSxcbiAgICAgICAgICAgICAgICByb3dEYXRhID0gY291bnRyeVRhYmxlRGF0YS5kYXRhKClbcm93SW5kZXhdLFxuICAgICAgICAgICAgICAgIGlkID0gcm93RGF0YVswXTtcblxuICAgICAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5hZGRSb3cocm93RGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBzZWxmLnJlbW92ZVJvdyhpZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBmb3Igc2VsZWN0ZWQgY291bnRyaWVzIGluIGNvdW50cnkgdGFibGUuXG4gICAgICovXG4gICAgdGhpcy51cGRhdGVDaGVja2JveGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY291bnRyeVRhYmxlID0gdGhpcy4kY291bnRyeVRhYmxlLkRhdGFUYWJsZSgpLFxuICAgICAgICAgICAgY291bnRyeVRhYmxlRGF0YSA9IGNvdW50cnlUYWJsZS5kYXRhKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudHJ5VGFibGVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY291bnRyeUl0ZW1EYXRhID0gY291bnRyeVRhYmxlRGF0YVtpXSxcbiAgICAgICAgICAgICAgICBjb3VudHJ5SXRlbUlkID0gY291bnRyeUl0ZW1EYXRhWzBdLFxuICAgICAgICAgICAgICAgIGNoZWNrQm94ID0gJChjb3VudHJ5VGFibGUucm93KGkpLm5vZGUoKSkuZmluZCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG4gICAgICAgICAgICBjaGVja0JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZENvdW50cmllc0luVGFibGUoY2hlY2tCb3gsIGNvdW50cnlJdGVtSWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RlZCBjb3VudHJpZXMgaW4gY291bnRyeSB0YWJsZS5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2hlY2tCb3ggLSBKcXVlcnkgb2JqZWN0IHdpdGggY2hlY2tib3guXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNvdW50cnlJdGVtSWQgLSBJZCBpZiBjb3VudHJ5IHJvdy5cbiAgICAgKi9cbiAgICB0aGlzLmZpbmRTZWxlY3RlZENvdW50cmllc0luVGFibGUgPSBmdW5jdGlvbiAoY2hlY2tCb3gsIGNvdW50cnlJdGVtSWQpIHtcbiAgICAgICAgdmFyIGl0ZW1FcXVhbElkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdID09PSBjb3VudHJ5SXRlbUlkO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ291bnRyaWVzRGF0YS5zb21lKGl0ZW1FcXVhbElkKSkge1xuICAgICAgICAgICAgY2hlY2tCb3gucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBjb3VudGVyLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ291bnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvdW50ZXJUZXh0ID0gJyc7XG5cbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDb3VudHJpZXNEYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgY291bnRlclRleHQgPSAnICgnICsgdGhpcy5zZWxlY3RlZENvdW50cmllc0RhdGEubGVuZ3RoICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLmNvdW50ZXJTZWxlY3RvcikuaHRtbChjb3VudGVyVGV4dCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzZWxlY3RlZCBjb3VudHJpZXMgaW5wdXQgdmFsdWUuXG4gICAgICovXG4gICAgdGhpcy51cGRhdGVTZWxlY3RlZENvdW50cmllc0lucHV0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbnB1dFZhbHVlID0gdGhpcy5zZWxlY3RlZENvdW50cmllc0RhdGEucmVkdWNlKGZ1bmN0aW9uIChjb25jYXQsIGN1cnJlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPyBjb25jYXQgKyAnLCcgKyBjdXJyZW50WzFdIDogY3VycmVudFsxXTtcbiAgICAgICAgfSwgJycpO1xuXG4gICAgICAgIHRoaXMuJGlucHV0V2l0aFNlbGVjdGVkQ291bnRyaWVzLnZhbChpbnB1dFZhbHVlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIHNlbGVjdGVkIGNvdW50cnkgdG8gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICogQHBhcmFtIHthcnJheX0gcm93RGF0YSAtIEFycmF5IG9mIGFsbCBkYXRhIHNlbGVjdGVkIGNvdW50cnkuXG4gICAgICovXG4gICAgdGhpcy5hZGRSb3cgPSBmdW5jdGlvbiAocm93RGF0YSkge1xuICAgICAgICB2YXIgY291bnRyeUl0ZW0gPSByb3dEYXRhLnNsaWNlKCk7XG4gICAgICAgIGNvdW50cnlJdGVtW3Jvd0RhdGEubGVuZ3RoIC0gMV0gPSB0aGlzLnJlbW92ZUJ0blRlbXBsYXRlLnJlcGxhY2UoJyMnLCBjb3VudHJ5SXRlbVsxXSk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJpZXNEYXRhLnB1c2goY291bnRyeUl0ZW0pO1xuICAgICAgICB0aGlzLnJlbmRlclNlbGVjdGVkSXRlbXNUYWJsZShjb3VudHJ5SXRlbSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSByb3cgZnJvbSBhcnJheSB3aXRoIGFsbCBzZWxlY3RlZCBpdGVtcy5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29kZSAtIENvdW50cmllcyBjb2RlIHdoaWNoIHNob3VsZCBiZSBkZWxldGVkLlxuICAgICAqL1xuICAgIHRoaXMucmVtb3ZlUm93ID0gZnVuY3Rpb24gKGNvZGUpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJpZXNEYXRhLmV2ZXJ5KGZ1bmN0aW9uIChlbGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGVsZW1bMV0gIT09IGNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZENvdW50cmllc0RhdGEuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBldmVudCBmb3IgcmVtb3ZlIGJ1dHRvbiB0byByZW1vdmUgcm93IGZyb20gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgdGhpcy5hZGRSZW1vdmVCdXR0b25DbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHNlbGVjdGVkVGFibGUgPSB0aGlzLiRzZWxlY3RlZENvdW50cmllc1RhYmxlO1xuXG4gICAgICAgIHNlbGVjdGVkVGFibGUub24oJ2NsaWNrJywgdGhpcy5yZW1vdmVCdG5TZWxlY3RvciwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdmFyIGlkID0gJChlLnRhcmdldCkuYXR0cignaHJlZicpO1xuXG4gICAgICAgICAgICBzZWxmLnJlbW92ZVJvdyhpZCk7XG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBjb3VudGVyIHRlbXBsYXRlIG9uIGluaXQuXG4gICAgICovXG4gICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy4kY291bnRlckxhYmVsLmFwcGVuZCh0aGlzLmNvdW50ZXJUZW1wbGF0ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlZHJhdyB0YWJsZSB3aXRoIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHRoaXMucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRzZWxlY3RlZENvdW50cmllc1RhYmxlLkRhdGFUYWJsZSgpLmNsZWFyKCkucm93cy5hZGQodGhpcy5zZWxlY3RlZENvdW50cmllc0RhdGEpLmRyYXcoKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoKTtcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZENvdW50cmllc0lucHV0VmFsdWUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDaGVja2JveGVzKCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0Q291bnRyeVRhYmxlQVBJO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvYXNzaWduL2Fzc2lnbicpO1xuIl0sIm5hbWVzIjpbIlNlbGVjdENvdW50cnlUYWJsZUFQSSIsInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImF2YWlsYWJsZUNvdW50cmllc1RhYmxlIiwiYXNzaWduZWRDb3VudHJpZXNUYWJsZSIsImluaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwic2VsZWN0ZWRDb3VudHJpZXNEYXRhIiwicmVtb3ZlQnRuU2VsZWN0b3IiLCJyZW1vdmVCdG5UZW1wbGF0ZSIsImNvdW50ZXJTZWxlY3RvciIsImNvdW50ZXJUZW1wbGF0ZSIsImluaXRpYWxEYXRhTG9hZGVkIiwiY291bnRyeVRhYmxlIiwic2VsZWN0ZWRDb3VudHJpZXNUYWJsZSIsImNoZWNrYm94U2VsZWN0b3IiLCJjb3VudGVyTGFiZWxTZWxlY3RvciIsImlucHV0V2l0aFNlbGVjdGVkQ291bnRyaWVzIiwiJGNvdW50cnlUYWJsZSIsIiRzZWxlY3RlZENvdW50cmllc1RhYmxlIiwiJGNvdW50ZXJMYWJlbCIsIiRpbnB1dFdpdGhTZWxlY3RlZENvdW50cmllcyIsImRyYXdDb3VudHJpZXNUYWJsZSIsImFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlciIsImFkZENvdW50ZXJUb0xhYmVsIiwic2VsZWN0Q291bnRyaWVzT25Mb2FkIiwiaW5pdGlhbFNlbGVjdGVkQ291bnRyaWVzRGF0YSIsImRhdGEiLCJyZXBsYWNlIiwicGFyc2VkRGF0YSIsIkpTT04iLCJwYXJzZSIsImkiLCJsZW5ndGgiLCJwdXNoIiwiYWRkUm93Iiwic2VsZiIsImNvdW50cnlUYWJsZURhdGEiLCJEYXRhVGFibGUiLCJvbiIsImV2ZW50Iiwic2V0dGluZ3MiLCJ1cGRhdGVDaGVja2JveGVzIiwibWFwRXZlbnRzVG9DaGVja2JveGVzIiwiYXR0ciIsInZhbCIsImNoZWNrYm94ZXMiLCJvZmYiLCJyb3dJbmRleCIsImluZGV4Iiwicm93RGF0YSIsImlkIiwiaXMiLCJyZW1vdmVSb3ciLCJjb3VudHJ5SXRlbURhdGEiLCJjb3VudHJ5SXRlbUlkIiwiY2hlY2tCb3giLCJyb3ciLCJub2RlIiwiZmluZCIsInByb3AiLCJmaW5kU2VsZWN0ZWRDb3VudHJpZXNJblRhYmxlIiwiaXRlbUVxdWFsSWQiLCJpdGVtIiwic29tZSIsInVwZGF0ZUNvdW50ZXIiLCJjb3VudGVyVGV4dCIsImh0bWwiLCJ1cGRhdGVTZWxlY3RlZENvdW50cmllc0lucHV0VmFsdWUiLCJpbnB1dFZhbHVlIiwicmVkdWNlIiwiY29uY2F0IiwiY3VycmVudCIsImNvdW50cnlJdGVtIiwic2xpY2UiLCJyZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUiLCJjb2RlIiwiZXZlcnkiLCJlbGVtIiwic3BsaWNlIiwic2VsZWN0ZWRUYWJsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImFwcGVuZCIsImNsZWFyIiwicm93cyIsImFkZCIsImRyYXciXSwic291cmNlUm9vdCI6IiJ9