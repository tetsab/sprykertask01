"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-locale-assign"],{

/***/ "./vendor/spryker/locale-gui/assets/Zed/js/modules/assign/assign.js":
/*!**************************************************************************!*\
  !*** ./vendor/spryker/locale-gui/assets/Zed/js/modules/assign/assign.js ***!
  \**************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectLocaleTableAPI = __webpack_require__(/*! ../select-locale-table-api/select-locale-table-api */ "./vendor/spryker/locale-gui/assets/Zed/js/modules/select-locale-table-api/select-locale-table-api.js");
$(document).ready(function () {
  var availableLocalesTable = new SelectLocaleTableAPI();
  var assignedLocalesTable = new SelectLocaleTableAPI();
  availableLocalesTable.init('#available-locale-table', '#localesToBeAssigned', '.js-locale-checkbox', 'a[href="#tab-content-assignment_locale"]', '#store_localeCodesToBeAssigned');
  assignedLocalesTable.init('#assigned-locale-table', '#localesToBeUnassigned', '.js-locale-checkbox', 'a[href="#tab-content-deassignment_locale"]', '#store_localeCodesToBeDeAssigned');
});
module.exports = SelectLocaleTableAPI;

/***/ }),

/***/ "./vendor/spryker/locale-gui/assets/Zed/js/modules/select-locale-table-api/select-locale-table-api.js":
/*!************************************************************************************************************!*\
  !*** ./vendor/spryker/locale-gui/assets/Zed/js/modules/select-locale-table-api/select-locale-table-api.js ***!
  \************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SelectLocaleTableAPI = function () {
  this.selectedLocalesData = [];
  this.removeBtnSelector = '.js-remove-item';
  this.removeBtnTemplate = '<a href="#" class="js-remove-item btn-xs">Remove</a>';
  this.counterSelector = '.js-counter';
  this.counterTemplate = '<span class="js-counter"></span>';
  this.initialDataLoaded = false;

  /**
   * Init all table adding functionality.
   * @param {string} localeTable - Current table with locales.
   * @param {string} selectedLocalesTable - Table where should locale be added.
   * @param {string} checkboxSelector - Checkbox selector.
   * @param {string} counterLabelSelector - Tabs label where will be added count of select locales.
   * @param {string} inputWithSelectedLocales - In this input will putted all selected locale ids.
   */
  this.init = function (localeTable, selectedLocalesTable, checkboxSelector, counterLabelSelector, inputWithSelectedLocales) {
    this.$localeTable = $(localeTable);
    this.$selectedLocalesTable = $(selectedLocalesTable);
    this.$counterLabel = $(counterLabelSelector);
    this.$inputWithSelectedLocales = $(inputWithSelectedLocales);
    this.checkboxSelector = checkboxSelector;
    this.counterSelector = counterLabelSelector + ' ' + this.counterSelector;
    this.drawLocalesTable();
    this.addRemoveButtonClickHandler();
    this.addCounterToLabel();
  };
  this.selectLocalesOnLoad = function (initialSelectedLocalesData) {
    if (this.initialDataLoaded) {
      return;
    }
    var data = initialSelectedLocalesData.replace(/&quot;/g, '"').replace(/,/g, '');
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
  this.drawLocalesTable = function () {
    var self = this;
    var localeTableData = self.$localeTable.DataTable();
    localeTableData.on('draw', function (event, settings) {
      self.updateCheckboxes();
      self.mapEventsToCheckboxes(localeTableData, $('#' + self.$localeTable.attr('id') + ' ' + self.checkboxSelector));
      if (self.$inputWithSelectedLocales && initialSelectedLocalesData) {
        var initialSelectedLocalesData = self.$inputWithSelectedLocales.val();
        self.selectLocalesOnLoad(initialSelectedLocalesData);
        self.$inputWithSelectedLocales.val('');
      }
    });
  };

  /**
   * Add change event for all checkboxes checkbox. Fires every time, when locale table redraws.
   * @param {object} localeTableData - DataTable options ( get by $(element).DataTable() ).
   * @param {checkboxes} checkboxes - Collection of all checkboxes in Locale Table.
   */
  this.mapEventsToCheckboxes = function (localeTableData, checkboxes) {
    var self = this;
    checkboxes.off('change');
    checkboxes.on('change', function () {
      var rowIndex = checkboxes.index($(this)),
        rowData = localeTableData.data()[rowIndex],
        id = rowData[0];
      if ($(this).is(':checked')) {
        return self.addRow(rowData);
      }
      return self.removeRow(id);
    });
  };

  /**
   * Check for selected locales in locale table.
   */
  this.updateCheckboxes = function () {
    var localeTable = this.$localeTable.DataTable(),
      localeTableData = localeTable.data();
    for (var i = 0; i < localeTableData.length; i++) {
      var localeItemData = localeTableData[i],
        localeItemId = localeItemData[0],
        checkBox = $(localeTable.row(i).node()).find('[type="checkbox"]');
      checkBox.prop('checked', false);
      this.findSelectedLocalesInTable(checkBox, localeItemId);
    }
  };

  /**
   * Check for selected locales in locale table.
   * @param {object} checkBox - Jquery object with checkbox.
   * @param {number} localeItemId - Id if locale row.
   */
  this.findSelectedLocalesInTable = function (checkBox, localeItemId) {
    var itemEqualId = function (item) {
      return item[0] === localeItemId;
    };
    if (this.selectedLocalesData.some(itemEqualId)) {
      checkBox.prop('checked', true);
    }
  };

  /**
   * Update counter.
   */
  this.updateCounter = function () {
    var counterText = '';
    if (this.selectedLocalesData.length) {
      counterText = ' (' + this.selectedLocalesData.length + ')';
    }
    $(this.counterSelector).html(counterText);
  };

  /**
   * Update selected locales input value.
   */
  this.updateSelectedLocalesInputValue = function () {
    var inputValue = this.selectedLocalesData.reduce(function (concat, current, index) {
      return index ? concat + ',' + current[0] : current[0];
    }, '');
    this.$inputWithSelectedLocales.val(inputValue);
  };

  /**
   * Add selected locale to array with all selected items.
   * @param {array} rowData - Array of all data selected locale.
   */
  this.addRow = function (rowData) {
    var localeItem = rowData.slice();
    localeItem[rowData.length - 1] = this.removeBtnTemplate.replace('#', localeItem[0]);
    this.selectedLocalesData.push(localeItem);
    this.renderSelectedItemsTable(localeItem);
  };

  /**
   * Remove row from array with all selected items.
   * @param {string} code - Locales code which should be deleted.
   */
  this.removeRow = function (code) {
    var self = this;
    this.selectedLocalesData.every(function (elem, index) {
      if (elem[0] !== code) {
        return true;
      }
      self.selectedLocalesData.splice(index, 1);
      return false;
    });
    self.renderSelectedItemsTable();
  };

  /**
   * Add event for remove button to remove row from array with all selected items.
   */
  this.addRemoveButtonClickHandler = function () {
    var self = this,
      selectedTable = this.$selectedLocalesTable;
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
    this.$selectedLocalesTable.DataTable().clear().rows.add(this.selectedLocalesData).draw();
    this.updateCounter();
    this.updateSelectedLocalesInputValue();
    this.updateCheckboxes();
  };
};
module.exports = SelectLocaleTableAPI;

/***/ }),

/***/ "./vendor/spryker/locale-gui/assets/Zed/js/spryker-zed-locale-assign.entry.js":
/*!************************************************************************************!*\
  !*** ./vendor/spryker/locale-gui/assets/Zed/js/spryker-zed-locale-assign.entry.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/assign/assign */ "./vendor/spryker/locale-gui/assets/Zed/js/modules/assign/assign.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/locale-gui/assets/Zed/js/spryker-zed-locale-assign.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQy9CLGlCQUFpQixFQUFFLFVBQVV5RSxDQUFDLEVBQUU7TUFDM0RBLENBQUMsQ0FBQ0MsY0FBYyxDQUFDLENBQUM7TUFFbEIsSUFBSS9CLEVBQUUsR0FBR3BELENBQUMsQ0FBQ2tGLENBQUMsQ0FBQ0UsTUFBTSxDQUFDLENBQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDO01BRWpDUixJQUFJLENBQUNpQixTQUFTLENBQUNGLEVBQUUsQ0FBQztNQUNsQmYsSUFBSSxDQUFDTSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzNCLENBQUMsQ0FBQztFQUNOLENBQUM7O0VBRUQ7QUFDSjtBQUNBO0VBQ0ksSUFBSSxDQUFDbEIsaUJBQWlCLEdBQUcsWUFBWTtJQUNqQyxJQUFJLENBQUNKLGFBQWEsQ0FBQ2dFLE1BQU0sQ0FBQyxJQUFJLENBQUN6RSxlQUFlLENBQUM7RUFDbkQsQ0FBQzs7RUFFRDtBQUNKO0FBQ0E7RUFDSSxJQUFJLENBQUNnRSx3QkFBd0IsR0FBRyxZQUFZO0lBQ3hDLElBQUksQ0FBQ3hELHFCQUFxQixDQUFDbUIsU0FBUyxDQUFDLENBQUMsQ0FBQytDLEtBQUssQ0FBQyxDQUFDLENBQUNDLElBQUksQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQ2hGLG1CQUFtQixDQUFDLENBQUNpRixJQUFJLENBQUMsQ0FBQztJQUV4RixJQUFJLENBQUN2QixhQUFhLENBQUMsQ0FBQztJQUNwQixJQUFJLENBQUNHLCtCQUErQixDQUFDLENBQUM7SUFDdEMsSUFBSSxDQUFDMUIsZ0JBQWdCLENBQUMsQ0FBQztFQUMzQixDQUFDO0FBQ0wsQ0FBQztBQUVEckMsTUFBTSxDQUFDQyxPQUFPLEdBQUdULG9CQUFvQjs7Ozs7Ozs7OztBQy9OckM7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsbUdBQXlCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9sb2NhbGUtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9hc3NpZ24vYXNzaWduLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2xvY2FsZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3NlbGVjdC1sb2NhbGUtdGFibGUtYXBpL3NlbGVjdC1sb2NhbGUtdGFibGUtYXBpLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2xvY2FsZS1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1sb2NhbGUtYXNzaWduLmVudHJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNlbGVjdExvY2FsZVRhYmxlQVBJID0gcmVxdWlyZSgnLi4vc2VsZWN0LWxvY2FsZS10YWJsZS1hcGkvc2VsZWN0LWxvY2FsZS10YWJsZS1hcGknKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhdmFpbGFibGVMb2NhbGVzVGFibGUgPSBuZXcgU2VsZWN0TG9jYWxlVGFibGVBUEkoKTtcbiAgICB2YXIgYXNzaWduZWRMb2NhbGVzVGFibGUgPSBuZXcgU2VsZWN0TG9jYWxlVGFibGVBUEkoKTtcblxuICAgIGF2YWlsYWJsZUxvY2FsZXNUYWJsZS5pbml0KFxuICAgICAgICAnI2F2YWlsYWJsZS1sb2NhbGUtdGFibGUnLFxuICAgICAgICAnI2xvY2FsZXNUb0JlQXNzaWduZWQnLFxuICAgICAgICAnLmpzLWxvY2FsZS1jaGVja2JveCcsXG4gICAgICAgICdhW2hyZWY9XCIjdGFiLWNvbnRlbnQtYXNzaWdubWVudF9sb2NhbGVcIl0nLFxuICAgICAgICAnI3N0b3JlX2xvY2FsZUNvZGVzVG9CZUFzc2lnbmVkJyxcbiAgICApO1xuXG4gICAgYXNzaWduZWRMb2NhbGVzVGFibGUuaW5pdChcbiAgICAgICAgJyNhc3NpZ25lZC1sb2NhbGUtdGFibGUnLFxuICAgICAgICAnI2xvY2FsZXNUb0JlVW5hc3NpZ25lZCcsXG4gICAgICAgICcuanMtbG9jYWxlLWNoZWNrYm94JyxcbiAgICAgICAgJ2FbaHJlZj1cIiN0YWItY29udGVudC1kZWFzc2lnbm1lbnRfbG9jYWxlXCJdJyxcbiAgICAgICAgJyNzdG9yZV9sb2NhbGVDb2Rlc1RvQmVEZUFzc2lnbmVkJyxcbiAgICApO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0TG9jYWxlVGFibGVBUEk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTZWxlY3RMb2NhbGVUYWJsZUFQSSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkTG9jYWxlc0RhdGEgPSBbXTtcbiAgICB0aGlzLnJlbW92ZUJ0blNlbGVjdG9yID0gJy5qcy1yZW1vdmUtaXRlbSc7XG4gICAgdGhpcy5yZW1vdmVCdG5UZW1wbGF0ZSA9ICc8YSBocmVmPVwiI1wiIGNsYXNzPVwianMtcmVtb3ZlLWl0ZW0gYnRuLXhzXCI+UmVtb3ZlPC9hPic7XG4gICAgdGhpcy5jb3VudGVyU2VsZWN0b3IgPSAnLmpzLWNvdW50ZXInO1xuICAgIHRoaXMuY291bnRlclRlbXBsYXRlID0gJzxzcGFuIGNsYXNzPVwianMtY291bnRlclwiPjwvc3Bhbj4nO1xuICAgIHRoaXMuaW5pdGlhbERhdGFMb2FkZWQgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgYWxsIHRhYmxlIGFkZGluZyBmdW5jdGlvbmFsaXR5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhbGVUYWJsZSAtIEN1cnJlbnQgdGFibGUgd2l0aCBsb2NhbGVzLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RlZExvY2FsZXNUYWJsZSAtIFRhYmxlIHdoZXJlIHNob3VsZCBsb2NhbGUgYmUgYWRkZWQuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNoZWNrYm94U2VsZWN0b3IgLSBDaGVja2JveCBzZWxlY3Rvci5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY291bnRlckxhYmVsU2VsZWN0b3IgLSBUYWJzIGxhYmVsIHdoZXJlIHdpbGwgYmUgYWRkZWQgY291bnQgb2Ygc2VsZWN0IGxvY2FsZXMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlucHV0V2l0aFNlbGVjdGVkTG9jYWxlcyAtIEluIHRoaXMgaW5wdXQgd2lsbCBwdXR0ZWQgYWxsIHNlbGVjdGVkIGxvY2FsZSBpZHMuXG4gICAgICovXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKFxuICAgICAgICBsb2NhbGVUYWJsZSxcbiAgICAgICAgc2VsZWN0ZWRMb2NhbGVzVGFibGUsXG4gICAgICAgIGNoZWNrYm94U2VsZWN0b3IsXG4gICAgICAgIGNvdW50ZXJMYWJlbFNlbGVjdG9yLFxuICAgICAgICBpbnB1dFdpdGhTZWxlY3RlZExvY2FsZXMsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuJGxvY2FsZVRhYmxlID0gJChsb2NhbGVUYWJsZSk7XG4gICAgICAgIHRoaXMuJHNlbGVjdGVkTG9jYWxlc1RhYmxlID0gJChzZWxlY3RlZExvY2FsZXNUYWJsZSk7XG4gICAgICAgIHRoaXMuJGNvdW50ZXJMYWJlbCA9ICQoY291bnRlckxhYmVsU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLiRpbnB1dFdpdGhTZWxlY3RlZExvY2FsZXMgPSAkKGlucHV0V2l0aFNlbGVjdGVkTG9jYWxlcyk7XG4gICAgICAgIHRoaXMuY2hlY2tib3hTZWxlY3RvciA9IGNoZWNrYm94U2VsZWN0b3I7XG4gICAgICAgIHRoaXMuY291bnRlclNlbGVjdG9yID0gY291bnRlckxhYmVsU2VsZWN0b3IgKyAnICcgKyB0aGlzLmNvdW50ZXJTZWxlY3RvcjtcblxuICAgICAgICB0aGlzLmRyYXdMb2NhbGVzVGFibGUoKTtcbiAgICAgICAgdGhpcy5hZGRSZW1vdmVCdXR0b25DbGlja0hhbmRsZXIoKTtcbiAgICAgICAgdGhpcy5hZGRDb3VudGVyVG9MYWJlbCgpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdExvY2FsZXNPbkxvYWQgPSBmdW5jdGlvbiAoaW5pdGlhbFNlbGVjdGVkTG9jYWxlc0RhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbERhdGFMb2FkZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0gaW5pdGlhbFNlbGVjdGVkTG9jYWxlc0RhdGEucmVwbGFjZSgvJnF1b3Q7L2csICdcIicpLnJlcGxhY2UoLywvZywgJycpO1xuICAgICAgICB2YXIgcGFyc2VkRGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJzZWREYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJzZWREYXRhW2ldLnB1c2goJycpO1xuICAgICAgICAgICAgdGhpcy5hZGRSb3cocGFyc2VkRGF0YVtpXSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmluaXRpYWxEYXRhTG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRHJhdyBtZXRob2Qgb2YgRGF0YVRhYmxlLiBGaXJlcyBldmVyeSB0aW1lIHRhYmxlIHJlcmVuZGVyLlxuICAgICAqL1xuICAgIHRoaXMuZHJhd0xvY2FsZXNUYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbG9jYWxlVGFibGVEYXRhID0gc2VsZi4kbG9jYWxlVGFibGUuRGF0YVRhYmxlKCk7XG4gICAgICAgIGxvY2FsZVRhYmxlRGF0YS5vbignZHJhdycsIGZ1bmN0aW9uIChldmVudCwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hlY2tib3hlcygpO1xuICAgICAgICAgICAgc2VsZi5tYXBFdmVudHNUb0NoZWNrYm94ZXMoXG4gICAgICAgICAgICAgICAgbG9jYWxlVGFibGVEYXRhLFxuICAgICAgICAgICAgICAgICQoJyMnICsgc2VsZi4kbG9jYWxlVGFibGUuYXR0cignaWQnKSArICcgJyArIHNlbGYuY2hlY2tib3hTZWxlY3RvciksXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRMb2NhbGVzICYmIGluaXRpYWxTZWxlY3RlZExvY2FsZXNEYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxTZWxlY3RlZExvY2FsZXNEYXRhID0gc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRMb2NhbGVzLnZhbCgpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0TG9jYWxlc09uTG9hZChpbml0aWFsU2VsZWN0ZWRMb2NhbGVzRGF0YSk7XG4gICAgICAgICAgICAgICAgc2VsZi4kaW5wdXRXaXRoU2VsZWN0ZWRMb2NhbGVzLnZhbCgnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgY2hhbmdlIGV2ZW50IGZvciBhbGwgY2hlY2tib3hlcyBjaGVja2JveC4gRmlyZXMgZXZlcnkgdGltZSwgd2hlbiBsb2NhbGUgdGFibGUgcmVkcmF3cy5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbG9jYWxlVGFibGVEYXRhIC0gRGF0YVRhYmxlIG9wdGlvbnMgKCBnZXQgYnkgJChlbGVtZW50KS5EYXRhVGFibGUoKSApLlxuICAgICAqIEBwYXJhbSB7Y2hlY2tib3hlc30gY2hlY2tib3hlcyAtIENvbGxlY3Rpb24gb2YgYWxsIGNoZWNrYm94ZXMgaW4gTG9jYWxlIFRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMubWFwRXZlbnRzVG9DaGVja2JveGVzID0gZnVuY3Rpb24gKGxvY2FsZVRhYmxlRGF0YSwgY2hlY2tib3hlcykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgY2hlY2tib3hlcy5vZmYoJ2NoYW5nZScpO1xuICAgICAgICBjaGVja2JveGVzLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBjaGVja2JveGVzLmluZGV4KCQodGhpcykpLFxuICAgICAgICAgICAgICAgIHJvd0RhdGEgPSBsb2NhbGVUYWJsZURhdGEuZGF0YSgpW3Jvd0luZGV4XSxcbiAgICAgICAgICAgICAgICBpZCA9IHJvd0RhdGFbMF07XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYuYWRkUm93KHJvd0RhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5yZW1vdmVSb3coaWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIHNlbGVjdGVkIGxvY2FsZXMgaW4gbG9jYWxlIHRhYmxlLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlQ2hlY2tib3hlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxvY2FsZVRhYmxlID0gdGhpcy4kbG9jYWxlVGFibGUuRGF0YVRhYmxlKCksXG4gICAgICAgICAgICBsb2NhbGVUYWJsZURhdGEgPSBsb2NhbGVUYWJsZS5kYXRhKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhbGVUYWJsZURhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsb2NhbGVJdGVtRGF0YSA9IGxvY2FsZVRhYmxlRGF0YVtpXSxcbiAgICAgICAgICAgICAgICBsb2NhbGVJdGVtSWQgPSBsb2NhbGVJdGVtRGF0YVswXSxcbiAgICAgICAgICAgICAgICBjaGVja0JveCA9ICQobG9jYWxlVGFibGUucm93KGkpLm5vZGUoKSkuZmluZCgnW3R5cGU9XCJjaGVja2JveFwiXScpO1xuXG4gICAgICAgICAgICBjaGVja0JveC5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZExvY2FsZXNJblRhYmxlKGNoZWNrQm94LCBsb2NhbGVJdGVtSWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGZvciBzZWxlY3RlZCBsb2NhbGVzIGluIGxvY2FsZSB0YWJsZS5cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY2hlY2tCb3ggLSBKcXVlcnkgb2JqZWN0IHdpdGggY2hlY2tib3guXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxvY2FsZUl0ZW1JZCAtIElkIGlmIGxvY2FsZSByb3cuXG4gICAgICovXG4gICAgdGhpcy5maW5kU2VsZWN0ZWRMb2NhbGVzSW5UYWJsZSA9IGZ1bmN0aW9uIChjaGVja0JveCwgbG9jYWxlSXRlbUlkKSB7XG4gICAgICAgIHZhciBpdGVtRXF1YWxJZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXSA9PT0gbG9jYWxlSXRlbUlkO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTG9jYWxlc0RhdGEuc29tZShpdGVtRXF1YWxJZCkpIHtcbiAgICAgICAgICAgIGNoZWNrQm94LnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgY291bnRlci5cbiAgICAgKi9cbiAgICB0aGlzLnVwZGF0ZUNvdW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb3VudGVyVGV4dCA9ICcnO1xuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkTG9jYWxlc0RhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb3VudGVyVGV4dCA9ICcgKCcgKyB0aGlzLnNlbGVjdGVkTG9jYWxlc0RhdGEubGVuZ3RoICsgJyknO1xuICAgICAgICB9XG5cbiAgICAgICAgJCh0aGlzLmNvdW50ZXJTZWxlY3RvcikuaHRtbChjb3VudGVyVGV4dCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSBzZWxlY3RlZCBsb2NhbGVzIGlucHV0IHZhbHVlLlxuICAgICAqL1xuICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRMb2NhbGVzSW5wdXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlucHV0VmFsdWUgPSB0aGlzLnNlbGVjdGVkTG9jYWxlc0RhdGEucmVkdWNlKGZ1bmN0aW9uIChjb25jYXQsIGN1cnJlbnQsIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXggPyBjb25jYXQgKyAnLCcgKyBjdXJyZW50WzBdIDogY3VycmVudFswXTtcbiAgICAgICAgfSwgJycpO1xuXG4gICAgICAgIHRoaXMuJGlucHV0V2l0aFNlbGVjdGVkTG9jYWxlcy52YWwoaW5wdXRWYWx1ZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBzZWxlY3RlZCBsb2NhbGUgdG8gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICogQHBhcmFtIHthcnJheX0gcm93RGF0YSAtIEFycmF5IG9mIGFsbCBkYXRhIHNlbGVjdGVkIGxvY2FsZS5cbiAgICAgKi9cbiAgICB0aGlzLmFkZFJvdyA9IGZ1bmN0aW9uIChyb3dEYXRhKSB7XG4gICAgICAgIHZhciBsb2NhbGVJdGVtID0gcm93RGF0YS5zbGljZSgpO1xuICAgICAgICBsb2NhbGVJdGVtW3Jvd0RhdGEubGVuZ3RoIC0gMV0gPSB0aGlzLnJlbW92ZUJ0blRlbXBsYXRlLnJlcGxhY2UoJyMnLCBsb2NhbGVJdGVtWzBdKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZExvY2FsZXNEYXRhLnB1c2gobG9jYWxlSXRlbSk7XG4gICAgICAgIHRoaXMucmVuZGVyU2VsZWN0ZWRJdGVtc1RhYmxlKGxvY2FsZUl0ZW0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgcm93IGZyb20gYXJyYXkgd2l0aCBhbGwgc2VsZWN0ZWQgaXRlbXMuXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgLSBMb2NhbGVzIGNvZGUgd2hpY2ggc2hvdWxkIGJlIGRlbGV0ZWQuXG4gICAgICovXG4gICAgdGhpcy5yZW1vdmVSb3cgPSBmdW5jdGlvbiAoY29kZSkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RlZExvY2FsZXNEYXRhLmV2ZXJ5KGZ1bmN0aW9uIChlbGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGVsZW1bMF0gIT09IGNvZGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZExvY2FsZXNEYXRhLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLnJlbmRlclNlbGVjdGVkSXRlbXNUYWJsZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgZXZlbnQgZm9yIHJlbW92ZSBidXR0b24gdG8gcmVtb3ZlIHJvdyBmcm9tIGFycmF5IHdpdGggYWxsIHNlbGVjdGVkIGl0ZW1zLlxuICAgICAqL1xuICAgIHRoaXMuYWRkUmVtb3ZlQnV0dG9uQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBzZWxlY3RlZFRhYmxlID0gdGhpcy4kc2VsZWN0ZWRMb2NhbGVzVGFibGU7XG5cbiAgICAgICAgc2VsZWN0ZWRUYWJsZS5vbignY2xpY2snLCB0aGlzLnJlbW92ZUJ0blNlbGVjdG9yLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICB2YXIgaWQgPSAkKGUudGFyZ2V0KS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgICAgIHNlbGYucmVtb3ZlUm93KGlkKTtcbiAgICAgICAgICAgIHNlbGYudXBkYXRlQ2hlY2tib3hlcygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkIGNvdW50ZXIgdGVtcGxhdGUgb24gaW5pdC5cbiAgICAgKi9cbiAgICB0aGlzLmFkZENvdW50ZXJUb0xhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRjb3VudGVyTGFiZWwuYXBwZW5kKHRoaXMuY291bnRlclRlbXBsYXRlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVkcmF3IHRhYmxlIHdpdGggc2VsZWN0ZWQgaXRlbXMuXG4gICAgICovXG4gICAgdGhpcy5yZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHNlbGVjdGVkTG9jYWxlc1RhYmxlLkRhdGFUYWJsZSgpLmNsZWFyKCkucm93cy5hZGQodGhpcy5zZWxlY3RlZExvY2FsZXNEYXRhKS5kcmF3KCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0ZWRMb2NhbGVzSW5wdXRWYWx1ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNoZWNrYm94ZXMoKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3RMb2NhbGVUYWJsZUFQSTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL2Fzc2lnbi9hc3NpZ24nKTtcbiJdLCJuYW1lcyI6WyJTZWxlY3RMb2NhbGVUYWJsZUFQSSIsInJlcXVpcmUiLCIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsImF2YWlsYWJsZUxvY2FsZXNUYWJsZSIsImFzc2lnbmVkTG9jYWxlc1RhYmxlIiwiaW5pdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3RlZExvY2FsZXNEYXRhIiwicmVtb3ZlQnRuU2VsZWN0b3IiLCJyZW1vdmVCdG5UZW1wbGF0ZSIsImNvdW50ZXJTZWxlY3RvciIsImNvdW50ZXJUZW1wbGF0ZSIsImluaXRpYWxEYXRhTG9hZGVkIiwibG9jYWxlVGFibGUiLCJzZWxlY3RlZExvY2FsZXNUYWJsZSIsImNoZWNrYm94U2VsZWN0b3IiLCJjb3VudGVyTGFiZWxTZWxlY3RvciIsImlucHV0V2l0aFNlbGVjdGVkTG9jYWxlcyIsIiRsb2NhbGVUYWJsZSIsIiRzZWxlY3RlZExvY2FsZXNUYWJsZSIsIiRjb3VudGVyTGFiZWwiLCIkaW5wdXRXaXRoU2VsZWN0ZWRMb2NhbGVzIiwiZHJhd0xvY2FsZXNUYWJsZSIsImFkZFJlbW92ZUJ1dHRvbkNsaWNrSGFuZGxlciIsImFkZENvdW50ZXJUb0xhYmVsIiwic2VsZWN0TG9jYWxlc09uTG9hZCIsImluaXRpYWxTZWxlY3RlZExvY2FsZXNEYXRhIiwiZGF0YSIsInJlcGxhY2UiLCJwYXJzZWREYXRhIiwiSlNPTiIsInBhcnNlIiwiaSIsImxlbmd0aCIsInB1c2giLCJhZGRSb3ciLCJzZWxmIiwibG9jYWxlVGFibGVEYXRhIiwiRGF0YVRhYmxlIiwib24iLCJldmVudCIsInNldHRpbmdzIiwidXBkYXRlQ2hlY2tib3hlcyIsIm1hcEV2ZW50c1RvQ2hlY2tib3hlcyIsImF0dHIiLCJ2YWwiLCJjaGVja2JveGVzIiwib2ZmIiwicm93SW5kZXgiLCJpbmRleCIsInJvd0RhdGEiLCJpZCIsImlzIiwicmVtb3ZlUm93IiwibG9jYWxlSXRlbURhdGEiLCJsb2NhbGVJdGVtSWQiLCJjaGVja0JveCIsInJvdyIsIm5vZGUiLCJmaW5kIiwicHJvcCIsImZpbmRTZWxlY3RlZExvY2FsZXNJblRhYmxlIiwiaXRlbUVxdWFsSWQiLCJpdGVtIiwic29tZSIsInVwZGF0ZUNvdW50ZXIiLCJjb3VudGVyVGV4dCIsImh0bWwiLCJ1cGRhdGVTZWxlY3RlZExvY2FsZXNJbnB1dFZhbHVlIiwiaW5wdXRWYWx1ZSIsInJlZHVjZSIsImNvbmNhdCIsImN1cnJlbnQiLCJsb2NhbGVJdGVtIiwic2xpY2UiLCJyZW5kZXJTZWxlY3RlZEl0ZW1zVGFibGUiLCJjb2RlIiwiZXZlcnkiLCJlbGVtIiwic3BsaWNlIiwic2VsZWN0ZWRUYWJsZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRhcmdldCIsImFwcGVuZCIsImNsZWFyIiwicm93cyIsImFkZCIsImRyYXciXSwic291cmNlUm9vdCI6IiJ9