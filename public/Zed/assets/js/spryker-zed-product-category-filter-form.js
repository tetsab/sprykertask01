"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-product-category-filter-form"],{

/***/ "./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/filters.js":
/*!******************************************************************************************************************!*\
  !*** ./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/filters.js ***!
  \******************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var filters = $('#product_category_filter_filters');
var activeFiltersContainer = $('#filters-container');
var activeFilters = $('#filters-container ol');
var inactiveFiltersContainer = $('#inactive-filters-container');
var inactiveFilters = $('#inactive-filters-container ol');
var removeAllButton = $('#remove-all-filters');
$(document).ready(function () {
  activeFiltersContainer.nestable({
    group: 1,
    maxDepth: 1
  }).on('change', function () {
    filters.val(JSON.stringify(getAllFilters()));
    if (inactiveFiltersContainer.find('li').length === 0) {
      inactiveFiltersContainer.closest('.row').addClass('hidden');
    } else {
      inactiveFiltersContainer.closest('.row').removeClass('hidden');
    }
  });
  activeFiltersContainer.trigger('change');
  activeFiltersContainer.on('click', '.remove-product-category-filter', function (e) {
    var filter = e.currentTarget.closest('.filter-item');
    inactiveFilters.append(createInactiveFilter(filter.dataset['filterKey'], filter.dataset['filterLabel'], filter.classList.contains('non-filter-attribute')));
    removeFilter(filter.dataset['filterKey'], true);
    activeFiltersContainer.trigger('change');
  });
  inactiveFiltersContainer.on('click', '.re-add-product-category-filter', function (e) {
    var filter = e.currentTarget.closest('.filter-item');
    activeFilters.append(createActiveFilter(filter.dataset['filterKey'], filter.dataset['filterLabel'], filter.classList.contains('non-filter-attribute')));
    removeFilter(filter.dataset['filterKey'], false);
    activeFiltersContainer.trigger('change');
  });
  removeAllButton.on('click', function () {
    activeFiltersContainer.find('.remove-product-category-filter').each(function (index, el) {
      el.click();
    });
  });
});
function getAllFilters() {
  return {
    filters: getFilters(activeFilters, true).concat(getFilters(inactiveFilters, false))
  };
}

/**
 *
 * @param selector
 * @param isActive
 * @returns {Array}
 */
function getFilters(selector, isActive) {
  var filters = [];
  selector.find('li').each(function (index, el) {
    filters.push({
      key: el.dataset['filterKey'],
      label: el.dataset['filterLabel'],
      isActive: isActive
    });
  });
  return filters;
}
function addToActiveList(filterToAdd) {
  activeFilters.append(createActiveFilter(filterToAdd, filterToAdd, true));
  activeFiltersContainer.trigger('change');
}
function removeFromInactiveList(filterKey) {
  removeFilter(filterKey, false);
  activeFiltersContainer.trigger('change');
}
function createActiveFilter(filterKey, filterLabel, nonFilterAttribute) {
  return createFilter(filterKey, filterLabel, nonFilterAttribute, 'btn-danger remove-product-category-filter', 'Remove Filter', 'fa-trash');
}
function createInactiveFilter(filterKey, filterLabel, nonFilterAttribute) {
  return createFilter(filterKey, filterLabel, nonFilterAttribute, 'btn-info re-add-product-category-filter', 'Re-add Filter', 'fa-plus-circle');
}
function createFilter(filterKey, filterLabel, nonFilterAttribute, anchorClass, anchorTitle, iconClass) {
  return '<li data-filter-key="' + filterKey + '"  data-filter-label="' + filterLabel + '" class="filter-item dd-item ' + (nonFilterAttribute ? 'non-filter-attribute' : '') + '">\n' + '    <a class="btn btn-xs btn-outline ' + anchorClass + '" title="' + anchorTitle + '">\n' + '        <i class="fa fa-fw ' + iconClass + '"></i>\n' + '    </a>\n' + '    <div class="dd-handle">\n' + $('<div/>').text(filterLabel).html() + '    </div>\n' + '</li>';
}
function removeFilter(filterKey, active) {
  var selector = activeFilters;
  if (!active) {
    selector = inactiveFilters;
  }
  selector.find('li').each(function (index, el) {
    if (filterKey === el.dataset['filterKey']) {
      el.remove();
    }
  });
}
module.exports = {
  getAllFilters: getAllFilters,
  addToActiveList: addToActiveList,
  removeFromInactiveList: removeFromInactiveList
};

/***/ }),

/***/ "./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/main.js":
/*!***************************************************************************************************************!*\
  !*** ./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/main.js ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var filters = __webpack_require__(/*! ./filters */ "./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/filters.js");
var idCategory = $('#idCategory').val();
var addButton = $('#addButton');
var saveButton = $('#product-category-filter-save-btn');
var resetButton = $('#reset-filters');
var filterTextField = $('#product_category_filter_filter-autocomplete');
$(document).ready(function () {
  addButton.on('click', function () {
    var filterToAdd = filterTextField.val();
    var filterObject = filters.getAllFilters().filters.find(function (element) {
      return element.key === filterToAdd;
    });
    if (filterObject) {
      if (filterObject.isActive === true) {
        return window.sweetAlert({
          title: 'Error',
          text: 'Filter "' + filterToAdd + '" already defined',
          html: false,
          type: 'error'
        });
      }
      filters.removeFromInactiveList(filterToAdd);
    }
    filters.addToActiveList(filterToAdd);
    filterTextField.val('');
    toggleDisableOnAddButton();
  });
  saveButton.on('click', function () {
    var event = new CustomEvent('categoryChanged', {
      detail: {
        idCategory: idCategory
      }
    });
    window.parent.document.dispatchEvent(event);
  });
  resetButton.one('click', function (e) {
    e.preventDefault();
    $(this).addClass('disabled');
    var event = new CustomEvent('resetCategory', {
      detail: {
        idCategory: idCategory
      }
    });
    window.parent.document.dispatchEvent(event);
    window.location.href = e.target.href;
  });
  $('.spryker-form-autocomplete').each(function (key, value) {
    var obj = $(value);
    if (obj.data('url') === 'undefined') {
      return;
    }
    if (obj.hasClass('ui-autocomplete')) {
      obj.autocomplete('destroy');
    }
    obj.autocomplete({
      source: function (request, response) {
        $.get(obj.data('url'), {
          term: request.term,
          category: idCategory
        }, function (data) {
          return response(data);
        });
      },
      minLength: 3,
      select: function () {
        toggleDisableOnAddButton();
      }
    });
  });
});
function toggleDisableOnAddButton() {
  addButton.prop('disabled', function () {
    return !$(this).prop('disabled');
  });
}

/***/ }),

/***/ "./vendor/spryker/product-category-filter-gui/assets/Zed/js/spryker-zed-product-category-filter-form.entry.js":
/*!********************************************************************************************************************!*\
  !*** ./vendor/spryker/product-category-filter-gui/assets/Zed/js/spryker-zed-product-category-filter-form.entry.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/product-category-filter-form/main */ "./vendor/spryker/product-category-filter-gui/assets/Zed/js/modules/product-category-filter-form/main.js");
__webpack_require__(/*! ../sass/filters.scss */ "./vendor/spryker/product-category-filter-gui/assets/Zed/sass/filters.scss");

/***/ }),

/***/ "./vendor/spryker/product-category-filter-gui/assets/Zed/sass/filters.scss":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/product-category-filter-gui/assets/Zed/sass/filters.scss ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-category-filter-gui/assets/Zed/js/spryker-zed-product-category-filter-form.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWNhdGVnb3J5LWZpbHRlci1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJQSxPQUFPLEdBQUdDLENBQUMsQ0FBQyxrQ0FBa0MsQ0FBQztBQUNuRCxJQUFJQyxzQkFBc0IsR0FBR0QsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0FBQ3BELElBQUlFLGFBQWEsR0FBR0YsQ0FBQyxDQUFDLHVCQUF1QixDQUFDO0FBQzlDLElBQUlHLHdCQUF3QixHQUFHSCxDQUFDLENBQUMsNkJBQTZCLENBQUM7QUFDL0QsSUFBSUksZUFBZSxHQUFHSixDQUFDLENBQUMsZ0NBQWdDLENBQUM7QUFDekQsSUFBSUssZUFBZSxHQUFHTCxDQUFDLENBQUMscUJBQXFCLENBQUM7QUFFOUNBLENBQUMsQ0FBQ00sUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCTixzQkFBc0IsQ0FDakJPLFFBQVEsQ0FBQztJQUNOQyxLQUFLLEVBQUUsQ0FBQztJQUNSQyxRQUFRLEVBQUU7RUFDZCxDQUFDLENBQUMsQ0FDREMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO0lBQ3RCWixPQUFPLENBQUNhLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1QyxJQUFJWix3QkFBd0IsQ0FBQ2EsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDQyxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ2xEZCx3QkFBd0IsQ0FBQ2UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQy9ELENBQUMsTUFBTTtNQUNIaEIsd0JBQXdCLENBQUNlLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ0UsV0FBVyxDQUFDLFFBQVEsQ0FBQztJQUNsRTtFQUNKLENBQUMsQ0FBQztFQUVObkIsc0JBQXNCLENBQUNvQixPQUFPLENB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Q04sQ0FBQyxDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBRUYsU0FBU0Esd0JBQXdCQSxDQUFBLEVBQUc7RUFDaENWLFNBQVMsQ0FBQ2tDLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWTtJQUNuQyxPQUFPLENBQUMvRixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMrRixJQUFJLENBQUMsVUFBVSxDQUFDO0VBQ3BDLENBQUMsQ0FBQztBQUNOOzs7Ozs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUVicEMsbUJBQU8sQ0FBQyw0SkFBNkMsQ0FBQztBQUN0REEsbUJBQU8sQ0FBQyx1R0FBc0IsQ0FBQzs7Ozs7Ozs7Ozs7QUNSL0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWNhdGVnb3J5LWZpbHRlci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3Byb2R1Y3QtY2F0ZWdvcnktZmlsdGVyLWZvcm0vZmlsdGVycy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWNhdGVnb3J5LWZpbHRlci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3Byb2R1Y3QtY2F0ZWdvcnktZmlsdGVyLWZvcm0vbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWNhdGVnb3J5LWZpbHRlci1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0LWNhdGVnb3J5LWZpbHRlci1mb3JtLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtY2F0ZWdvcnktZmlsdGVyLWd1aS9hc3NldHMvWmVkL3Nhc3MvZmlsdGVycy5zY3NzPzQ3YTUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZmlsdGVycyA9ICQoJyNwcm9kdWN0X2NhdGVnb3J5X2ZpbHRlcl9maWx0ZXJzJyk7XG52YXIgYWN0aXZlRmlsdGVyc0NvbnRhaW5lciA9ICQoJyNmaWx0ZXJzLWNvbnRhaW5lcicpO1xudmFyIGFjdGl2ZUZpbHRlcnMgPSAkKCcjZmlsdGVycy1jb250YWluZXIgb2wnKTtcbnZhciBpbmFjdGl2ZUZpbHRlcnNDb250YWluZXIgPSAkKCcjaW5hY3RpdmUtZmlsdGVycy1jb250YWluZXInKTtcbnZhciBpbmFjdGl2ZUZpbHRlcnMgPSAkKCcjaW5hY3RpdmUtZmlsdGVycy1jb250YWluZXIgb2wnKTtcbnZhciByZW1vdmVBbGxCdXR0b24gPSAkKCcjcmVtb3ZlLWFsbC1maWx0ZXJzJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICBhY3RpdmVGaWx0ZXJzQ29udGFpbmVyXG4gICAgICAgIC5uZXN0YWJsZSh7XG4gICAgICAgICAgICBncm91cDogMSxcbiAgICAgICAgICAgIG1heERlcHRoOiAxLFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZpbHRlcnMudmFsKEpTT04uc3RyaW5naWZ5KGdldEFsbEZpbHRlcnMoKSkpO1xuXG4gICAgICAgICAgICBpZiAoaW5hY3RpdmVGaWx0ZXJzQ29udGFpbmVyLmZpbmQoJ2xpJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW5hY3RpdmVGaWx0ZXJzQ29udGFpbmVyLmNsb3Nlc3QoJy5yb3cnKS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGluYWN0aXZlRmlsdGVyc0NvbnRhaW5lci5jbG9zZXN0KCcucm93JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIGFjdGl2ZUZpbHRlcnNDb250YWluZXIudHJpZ2dlcignY2hhbmdlJyk7XG5cbiAgICBhY3RpdmVGaWx0ZXJzQ29udGFpbmVyLm9uKCdjbGljaycsICcucmVtb3ZlLXByb2R1Y3QtY2F0ZWdvcnktZmlsdGVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGZpbHRlciA9IGUuY3VycmVudFRhcmdldC5jbG9zZXN0KCcuZmlsdGVyLWl0ZW0nKTtcbiAgICAgICAgaW5hY3RpdmVGaWx0ZXJzLmFwcGVuZChcbiAgICAgICAgICAgIGNyZWF0ZUluYWN0aXZlRmlsdGVyKFxuICAgICAgICAgICAgICAgIGZpbHRlci5kYXRhc2V0WydmaWx0ZXJLZXknXSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZGF0YXNldFsnZmlsdGVyTGFiZWwnXSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdub24tZmlsdGVyLWF0dHJpYnV0ZScpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICByZW1vdmVGaWx0ZXIoZmlsdGVyLmRhdGFzZXRbJ2ZpbHRlcktleSddLCB0cnVlKTtcbiAgICAgICAgYWN0aXZlRmlsdGVyc0NvbnRhaW5lci50cmlnZ2VyKCdjaGFuZ2UnKTtcbiAgICB9KTtcblxuICAgIGluYWN0aXZlRmlsdGVyc0NvbnRhaW5lci5vbignY2xpY2snLCAnLnJlLWFkZC1wcm9kdWN0LWNhdGVnb3J5LWZpbHRlcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSBlLmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnLmZpbHRlci1pdGVtJyk7XG4gICAgICAgIGFjdGl2ZUZpbHRlcnMuYXBwZW5kKFxuICAgICAgICAgICAgY3JlYXRlQWN0aXZlRmlsdGVyKFxuICAgICAgICAgICAgICAgIGZpbHRlci5kYXRhc2V0WydmaWx0ZXJLZXknXSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIuZGF0YXNldFsnZmlsdGVyTGFiZWwnXSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdub24tZmlsdGVyLWF0dHJpYnV0ZScpLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICByZW1vdmVGaWx0ZXIoZmlsdGVyLmRhdGFzZXRbJ2ZpbHRlcktleSddLCBmYWxzZSk7XG4gICAgICAgIGFjdGl2ZUZpbHRlcnNDb250YWluZXIudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgfSk7XG5cbiAgICByZW1vdmVBbGxCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBhY3RpdmVGaWx0ZXJzQ29udGFpbmVyLmZpbmQoJy5yZW1vdmUtcHJvZHVjdC1jYXRlZ29yeS1maWx0ZXInKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgICAgIGVsLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIGdldEFsbEZpbHRlcnMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmlsdGVyczogZ2V0RmlsdGVycyhhY3RpdmVGaWx0ZXJzLCB0cnVlKS5jb25jYXQoZ2V0RmlsdGVycyhpbmFjdGl2ZUZpbHRlcnMsIGZhbHNlKSksXG4gICAgfTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yXG4gKiBAcGFyYW0gaXNBY3RpdmVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZ2V0RmlsdGVycyhzZWxlY3RvciwgaXNBY3RpdmUpIHtcbiAgICB2YXIgZmlsdGVycyA9IFtdO1xuICAgIHNlbGVjdG9yLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgICAgIGZpbHRlcnMucHVzaCh7XG4gICAgICAgICAgICBrZXk6IGVsLmRhdGFzZXRbJ2ZpbHRlcktleSddLFxuICAgICAgICAgICAgbGFiZWw6IGVsLmRhdGFzZXRbJ2ZpbHRlckxhYmVsJ10sXG4gICAgICAgICAgICBpc0FjdGl2ZTogaXNBY3RpdmUsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbHRlcnM7XG59XG5cbmZ1bmN0aW9uIGFkZFRvQWN0aXZlTGlzdChmaWx0ZXJUb0FkZCkge1xuICAgIGFjdGl2ZUZpbHRlcnMuYXBwZW5kKGNyZWF0ZUFjdGl2ZUZpbHRlcihmaWx0ZXJUb0FkZCwgZmlsdGVyVG9BZGQsIHRydWUpKTtcbiAgICBhY3RpdmVGaWx0ZXJzQ29udGFpbmVyLnRyaWdnZXIoJ2NoYW5nZScpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVGcm9tSW5hY3RpdmVMaXN0KGZpbHRlcktleSkge1xuICAgIHJlbW92ZUZpbHRlcihmaWx0ZXJLZXksIGZhbHNlKTtcbiAgICBhY3RpdmVGaWx0ZXJzQ29udGFpbmVyLnRyaWdnZXIoJ2NoYW5nZScpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBY3RpdmVGaWx0ZXIoZmlsdGVyS2V5LCBmaWx0ZXJMYWJlbCwgbm9uRmlsdGVyQXR0cmlidXRlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZpbHRlcihcbiAgICAgICAgZmlsdGVyS2V5LFxuICAgICAgICBmaWx0ZXJMYWJlbCxcbiAgICAgICAgbm9uRmlsdGVyQXR0cmlidXRlLFxuICAgICAgICAnYnRuLWRhbmdlciByZW1vdmUtcHJvZHVjdC1jYXRlZ29yeS1maWx0ZXInLFxuICAgICAgICAnUmVtb3ZlIEZpbHRlcicsXG4gICAgICAgICdmYS10cmFzaCcsXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5hY3RpdmVGaWx0ZXIoZmlsdGVyS2V5LCBmaWx0ZXJMYWJlbCwgbm9uRmlsdGVyQXR0cmlidXRlKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZpbHRlcihcbiAgICAgICAgZmlsdGVyS2V5LFxuICAgICAgICBmaWx0ZXJMYWJlbCxcbiAgICAgICAgbm9uRmlsdGVyQXR0cmlidXRlLFxuICAgICAgICAnYnRuLWluZm8gcmUtYWRkLXByb2R1Y3QtY2F0ZWdvcnktZmlsdGVyJyxcbiAgICAgICAgJ1JlLWFkZCBGaWx0ZXInLFxuICAgICAgICAnZmEtcGx1cy1jaXJjbGUnLFxuICAgICk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZpbHRlcihmaWx0ZXJLZXksIGZpbHRlckxhYmVsLCBub25GaWx0ZXJBdHRyaWJ1dGUsIGFuY2hvckNsYXNzLCBhbmNob3JUaXRsZSwgaWNvbkNsYXNzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgJzxsaSBkYXRhLWZpbHRlci1rZXk9XCInICtcbiAgICAgICAgZmlsdGVyS2V5ICtcbiAgICAgICAgJ1wiICBkYXRhLWZpbHRlci1sYWJlbD1cIicgK1xuICAgICAgICBmaWx0ZXJMYWJlbCArXG4gICAgICAgICdcIiBjbGFzcz1cImZpbHRlci1pdGVtIGRkLWl0ZW0gJyArXG4gICAgICAgIChub25GaWx0ZXJBdHRyaWJ1dGUgPyAnbm9uLWZpbHRlci1hdHRyaWJ1dGUnIDogJycpICtcbiAgICAgICAgJ1wiPlxcbicgK1xuICAgICAgICAnICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tb3V0bGluZSAnICtcbiAgICAgICAgYW5jaG9yQ2xhc3MgK1xuICAgICAgICAnXCIgdGl0bGU9XCInICtcbiAgICAgICAgYW5jaG9yVGl0bGUgK1xuICAgICAgICAnXCI+XFxuJyArXG4gICAgICAgICcgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZncgJyArXG4gICAgICAgIGljb25DbGFzcyArXG4gICAgICAgICdcIj48L2k+XFxuJyArXG4gICAgICAgICcgICAgPC9hPlxcbicgK1xuICAgICAgICAnICAgIDxkaXYgY2xhc3M9XCJkZC1oYW5kbGVcIj5cXG4nICtcbiAgICAgICAgJCgnPGRpdi8+JykudGV4dChmaWx0ZXJMYWJlbCkuaHRtbCgpICtcbiAgICAgICAgJyAgICA8L2Rpdj5cXG4nICtcbiAgICAgICAgJzwvbGk+J1xuICAgICk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUZpbHRlcihmaWx0ZXJLZXksIGFjdGl2ZSkge1xuICAgIHZhciBzZWxlY3RvciA9IGFjdGl2ZUZpbHRlcnM7XG4gICAgaWYgKCFhY3RpdmUpIHtcbiAgICAgICAgc2VsZWN0b3IgPSBpbmFjdGl2ZUZpbHRlcnM7XG4gICAgfVxuXG4gICAgc2VsZWN0b3IuZmluZCgnbGknKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgaWYgKGZpbHRlcktleSA9PT0gZWwuZGF0YXNldFsnZmlsdGVyS2V5J10pIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEFsbEZpbHRlcnM6IGdldEFsbEZpbHRlcnMsXG4gICAgYWRkVG9BY3RpdmVMaXN0OiBhZGRUb0FjdGl2ZUxpc3QsXG4gICAgcmVtb3ZlRnJvbUluYWN0aXZlTGlzdDogcmVtb3ZlRnJvbUluYWN0aXZlTGlzdCxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmaWx0ZXJzID0gcmVxdWlyZSgnLi9maWx0ZXJzJyk7XG52YXIgaWRDYXRlZ29yeSA9ICQoJyNpZENhdGVnb3J5JykudmFsKCk7XG52YXIgYWRkQnV0dG9uID0gJCgnI2FkZEJ1dHRvbicpO1xudmFyIHNhdmVCdXR0b24gPSAkKCcjcHJvZHVjdC1jYXRlZ29yeS1maWx0ZXItc2F2ZS1idG4nKTtcbnZhciByZXNldEJ1dHRvbiA9ICQoJyNyZXNldC1maWx0ZXJzJyk7XG52YXIgZmlsdGVyVGV4dEZpZWxkID0gJCgnI3Byb2R1Y3RfY2F0ZWdvcnlfZmlsdGVyX2ZpbHRlci1hdXRvY29tcGxldGUnKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGFkZEJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBmaWx0ZXJUb0FkZCA9IGZpbHRlclRleHRGaWVsZC52YWwoKTtcbiAgICAgICAgdmFyIGZpbHRlck9iamVjdCA9IGZpbHRlcnMuZ2V0QWxsRmlsdGVycygpLmZpbHRlcnMuZmluZChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQua2V5ID09PSBmaWx0ZXJUb0FkZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaWx0ZXJPYmplY3QpIHtcbiAgICAgICAgICAgIGlmIChmaWx0ZXJPYmplY3QuaXNBY3RpdmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ZpbHRlciBcIicgKyBmaWx0ZXJUb0FkZCArICdcIiBhbHJlYWR5IGRlZmluZWQnLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbHRlcnMucmVtb3ZlRnJvbUluYWN0aXZlTGlzdChmaWx0ZXJUb0FkZCk7XG4gICAgICAgIH1cbiAgICAgICAgZmlsdGVycy5hZGRUb0FjdGl2ZUxpc3QoZmlsdGVyVG9BZGQpO1xuXG4gICAgICAgIGZpbHRlclRleHRGaWVsZC52YWwoJycpO1xuICAgICAgICB0b2dnbGVEaXNhYmxlT25BZGRCdXR0b24oKTtcbiAgICB9KTtcblxuICAgIHNhdmVCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2NhdGVnb3J5Q2hhbmdlZCcsIHsgZGV0YWlsOiB7IGlkQ2F0ZWdvcnk6IGlkQ2F0ZWdvcnkgfSB9KTtcbiAgICAgICAgd2luZG93LnBhcmVudC5kb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICB9KTtcblxuICAgIHJlc2V0QnV0dG9uLm9uZSgnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgdmFyIGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdyZXNldENhdGVnb3J5JywgeyBkZXRhaWw6IHsgaWRDYXRlZ29yeTogaWRDYXRlZ29yeSB9IH0pO1xuXG4gICAgICAgIHdpbmRvdy5wYXJlbnQuZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZS50YXJnZXQuaHJlZjtcbiAgICB9KTtcblxuICAgICQoJy5zcHJ5a2VyLWZvcm0tYXV0b2NvbXBsZXRlJykuZWFjaChmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgb2JqID0gJCh2YWx1ZSk7XG4gICAgICAgIGlmIChvYmouZGF0YSgndXJsJykgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2JqLmhhc0NsYXNzKCd1aS1hdXRvY29tcGxldGUnKSkge1xuICAgICAgICAgICAgb2JqLmF1dG9jb21wbGV0ZSgnZGVzdHJveScpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICBzb3VyY2U6IGZ1bmN0aW9uIChyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICQuZ2V0KG9iai5kYXRhKCd1cmwnKSwgeyB0ZXJtOiByZXF1ZXN0LnRlcm0sIGNhdGVnb3J5OiBpZENhdGVnb3J5IH0sIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZShkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDMsXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0b2dnbGVEaXNhYmxlT25BZGRCdXR0b24oKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZURpc2FibGVPbkFkZEJ1dHRvbigpIHtcbiAgICBhZGRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAhJCh0aGlzKS5wcm9wKCdkaXNhYmxlZCcpO1xuICAgIH0pO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvcHJvZHVjdC1jYXRlZ29yeS1maWx0ZXItZm9ybS9tYWluJyk7XG5yZXF1aXJlKCcuLi9zYXNzL2ZpbHRlcnMuc2NzcycpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImZpbHRlcnMiLCIkIiwiYWN0aXZlRmlsdGVyc0NvbnRhaW5lciIsImFjdGl2ZUZpbHRlcnMiLCJpbmFjdGl2ZUZpbHRlcnNDb250YWluZXIiLCJpbmFjdGl2ZUZpbHRlcnMiLCJyZW1vdmVBbGxCdXR0b24iLCJkb2N1bWVudCIsInJlYWR5IiwibmVzdGFibGUiLCJncm91cCIsIm1heERlcHRoIiwib24iLCJ2YWwiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0QWxsRmlsdGVycyIsImZpbmQiLCJsZW5ndGgiLCJjbG9zZXN0IiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRyaWdnZXIiLCJlIiwiZmlsdGVyIiwiY3VycmVudFRhcmdldCIsImFwcGVuZCIsImNyZWF0ZUluYWN0aXZlRmlsdGVyIiwiZGF0YXNldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVtb3ZlRmlsdGVyIiwiY3JlYXRlQWN0aXZlRmlsdGVyIiwiZWFjaCIsImluZGV4IiwiZWwiLCJjbGljayIsImdldEZpbHRlcnMiLCJjb25jYXQiLCJzZWxlY3RvciIsImlzQWN0aXZlIiwicHVzaCIsImtleSIsImxhYmVsIiwiYWRkVG9BY3RpdmVMaXN0IiwiZmlsdGVyVG9BZGQiLCJyZW1vdmVGcm9tSW5hY3RpdmVMaXN0IiwiZmlsdGVyS2V5IiwiZmlsdGVyTGFiZWwiLCJub25GaWx0ZXJBdHRyaWJ1dGUiLCJjcmVhdGVGaWx0ZXIiLCJhbmNob3JDbGFzcyIsImFuY2hvclRpdGxlIiwiaWNvbkNsYXNzIiwidGV4dCIsImh0bWwiLCJhY3RpdmUiLCJyZW1vdmUiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsImlkQ2F0ZWdvcnkiLCJhZGRCdXR0b24iLCJzYXZlQnV0dG9uIiwicmVzZXRCdXR0b24iLCJmaWx0ZXJUZXh0RmllbGQiLCJmaWx0ZXJPYmplY3QiLCJlbGVtZW50Iiwid2luZG93Iiwic3dlZXRBbGVydCIsInRpdGxlIiwidHlwZSIsInRvZ2dsZURpc2FibGVPbkFkZEJ1dHRvbiIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkZXRhaWwiLCJwYXJlbnQiLCJkaXNwYXRjaEV2ZW50Iiwib25lIiwicHJldmVudERlZmF1bHQiLCJsb2NhdGlvbiIsImhyZWYiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm9iaiIsImRhdGEiLCJoYXNDbGFzcyIsImF1dG9jb21wbGV0ZSIsInNvdXJjZSIsInJlcXVlc3QiLCJyZXNwb25zZSIsImdldCIsInRlcm0iLCJjYXRlZ29yeSIsIm1pbkxlbmd0aCIsInNlbGVjdCIsInByb3AiXSwic291cmNlUm9vdCI6IiJ9