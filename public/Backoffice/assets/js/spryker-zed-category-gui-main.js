"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-category-gui-main"],{

/***/ "./vendor/spryker/category-gui/assets/Zed/js/modules/logic.js":
/*!********************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/modules/logic.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var SprykerAjax = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjax */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



window.serializedList = {};
var categoryRequestHelper = __webpack_require__(/*! ./request-helper.js */ "./vendor/spryker/category-gui/assets/Zed/js/modules/request-helper.js");
var STORE_SELECTOR_ID = '#category_store_relation_id_stores';
var STORE_FORM_NAME = 'category';
var STORE_SELECTOR_LOADER_CLASS_NAME = '.relation-selector-loader';
var STORE_SELECTOR_ACTION_URL_ATTRIBUTE = 'action-url';
var STORE_SELECTOR_ACTION_EVENT_ATTRIBUTE = 'action-event';
var STORE_SELECTOR_ACTION_FIELD_ATTRIBUTE = 'action-field';
var SELECTOR_ROOT_NODE_TABLE = '#root-node-table';
var SELECTOR_CATEGORY_NODE_TREE = '#category-node-tree';
var SELECTOR_GUI_TABLE_DATA_CATEGORY = '.gui-table-data-category';
var SELECTOR_NESTABLE = '#nestable';
var SELECTOR_SAVE_CATEGORIES_ORDER = '.save-categories-order';

/**
 * @return {void}
 */
var handleStoreSelector = function () {
  var storeSelector = $(STORE_SELECTOR_ID);
  var storeSelectorActionFieldName = storeSelector.attr(STORE_SELECTOR_ACTION_FIELD_ATTRIBUTE);
  var parentCategorySelector = $("[name='" + STORE_FORM_NAME + '[' + storeSelectorActionFieldName + "]']");
  var parentCategoryData = parentCategorySelector.select2('data');
  if (!parentCategoryData) {
    return;
  }
  var storeSelectorLoader = storeSelector.parent().find(STORE_SELECTOR_LOADER_CLASS_NAME);
  var storeSelectorActionUrl = storeSelector.attr(STORE_SELECTOR_ACTION_URL_ATTRIBUTE);
  var storeSelectorActionEvent = storeSelector.attr(STORE_SELECTOR_ACTION_EVENT_ATTRIBUTE);
  var parentCategoryId = parentCategoryData[0].id;
  if (!parentCategoryId) {
    storeSelector.prop('disabled', true);
  }
  parentCategorySelector.on(storeSelectorActionEvent, function (event) {
    var selectedCategoryId = $(this).select2('data')[0].id;
    if (selectedCategoryId) {
      $.ajax({
        url: storeSelectorActionUrl + '?id-category-node=' + selectedCategoryId,
        success: function (data) {
          storeSelector.empty();
          data.forEach(function (item) {
            var optionItem = $('<option></option>').prop('value', item.id_store).prop('disabled', !item.is_active).text(item.name);
            storeSelector.append(optionItem);
          });
          storeSelector.prop('disabled', false);
        },
        beforeSend: function () {
          storeSelectorLoader.addClass('active');
        },
        complete: function () {
          storeSelectorLoader.removeClass('active');
        }
      });
      return;
    }
    storeSelector.prop('disabled', true);
  });
};
$(document).ready(function () {
  var isFirstEventTriggered = false;
  var selectorRootNodeTable = $(SELECTOR_ROOT_NODE_TABLE);
  var selectorCategoryNodeTree = $(SELECTOR_CATEGORY_NODE_TREE);
  var selectorCategoryGuiTableDataCategory = $(SELECTOR_GUI_TABLE_DATA_CATEGORY);
  var selectorNestable = $(SELECTOR_NESTABLE);
  var selectorSaveCategoriesOrder = $(SELECTOR_SAVE_CATEGORIES_ORDER);
  selectorRootNodeTable.on('click', 'tbody tr', function () {
    categoryHelper.showLoaderBar();
    var idCategoryNode = $(this).children('td:first').text();
    SprykerAjax.getCategoryTreeByIdCategoryNode(idCategoryNode);
  });
  selectorCategoryNodeTree.on('click', '.category-tree', function (event) {
    event.preventDefault();
    categoryHelper.showLoaderBar();
    var idCategoryNode = $(this).attr('id').replace('node-', '');
    SprykerAjax.getCategoryTreeByIdCategoryNode(idCategoryNode);
  });
  selectorCategoryGuiTableDataCategory.dataTable({
    bFilter: false,
    createdRow: function (row, data, index) {
      if (isFirstEventTriggered !== false) {
        return;
      }
      categoryHelper.showLoaderBar();
      var idCategoryNode = data[0];
      SprykerAjax.getCategoryTreeByIdCategoryNode(idCategoryNode);
      isFirstEventTriggered = true;
    }
  });
  var updateOutput = function (e) {
    var list = e.length ? e : $(e.target);
    window.serializedList = window.JSON.stringify(list.nestable('serialize'));
  };
  selectorNestable.nestable({
    group: 1,
    maxDepth: 1
  }).on('change', updateOutput);
  selectorSaveCategoriesOrder.click(function () {
    SprykerAjax.updateCategoryNodesOrder(serializedList);
  });
  handleStoreSelector();
});

/***/ }),

/***/ "./vendor/spryker/category-gui/assets/Zed/js/modules/main.js":
/*!*******************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/modules/main.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./logic */ "./vendor/spryker/category-gui/assets/Zed/js/modules/logic.js");
__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/category-gui/assets/Zed/sass/main.scss");

/***/ }),

/***/ "./vendor/spryker/category-gui/assets/Zed/js/modules/request-helper.js":
/*!*****************************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/modules/request-helper.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var SprykerAjax = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjax */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js");
/* provided dependency */ var SprykerAjaxCallbacks = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SELECTOR_CATEGORY_LOADER = '#category-loader';
var SELECTOR_CATEGORY_NODE_TREE = '#category-node-tree';
var SELECTOT_CATEGORY_LIST = '#categories-list';
var showLoaderBar = function () {
  $(SELECTOR_CATEGORY_LOADER).removeClass('hidden');
};
var closeLoaderBar = function () {
  $(SELECTOR_CATEGORY_LOADER).addClass('hidden');
};

/**
 * @param idCategoryNode
 *
 * @return {void}
 */
SprykerAjax.getCategoryTreeByIdCategoryNode = function (idCategoryNode) {
  var options = {
    'id-category-node': idCategoryNode
  };
  this.setUrl('/category/index/node').setDataType('html').ajaxSubmit(options, 'displayCategoryNodesTree');
};

/**
 * @param serializedCategoryNodes
 *
 * @return {void}
 */
SprykerAjax.updateCategoryNodesOrder = function (serializedCategoryNodes) {
  showLoaderBar();
  this.setUrl('/category/node/reorder').ajaxSubmit({
    nodes: serializedCategoryNodes
  }, 'updateCategoryNodesOrder');
};

/**
 * @param ajaxResponse
 *
 * @return {void}
 */
SprykerAjaxCallbacks.displayCategoryNodesTree = function (ajaxResponse) {
  $(SELECTOR_CATEGORY_NODE_TREE).removeClass('hidden');
  $(SELECTOT_CATEGORY_LIST).html(ajaxResponse);
  closeLoaderBar();
};

/**
 * @param ajaxResponse
 *
 * @return {boolean}
 */
SprykerAjaxCallbacks.updateCategoryNodesOrder = function (ajaxResponse) {
  closeLoaderBar();
  var isSuccessResponse = ajaxResponse.code === this.codeSuccess;
  var alertTitle = isSuccessResponse ? 'Success' : 'Error';
  var alertType = isSuccessResponse ? 'success' : 'error';
  swal({
    title: alertTitle,
    text: ajaxResponse.message,
    type: alertType
  });
  return isSuccessResponse;
};
module.exports = {
  showLoaderBar: showLoaderBar,
  closeLoaderBar: closeLoaderBar
};

/***/ }),

/***/ "./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-main.entry.js":
/*!******************************************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-main.entry.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/category-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js":
/*!************************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SprykerAjaxCallbacks = __webpack_require__(/*! ./SprykerAjaxCallbacks */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks.js");
module.exports = new function () {
  var self = this;

  /** if ajax url is null, the action will be in the same page */
  self.url = null;
  self.dataType = 'json';

  /**
   * @param newUrl
   * @returns {SprykerAjax}
   */
  self.setUrl = function (newUrl) {
    self.url = newUrl;
    return self;
  };

  /**
   * @param newDataType
   * @returns {SprykerAjax}
   */
  self.setDataType = function (newDataType) {
    self.dataType = newDataType;
    return self;
  };
  self.ajaxSubmit = function (options, callbackFunction, parameters, isGet) {
    var callType = !!isGet ? 'get' : 'post';
    return $.ajax({
      url: this.url,
      type: callType,
      dataType: this.dataType,
      data: options
    }).done(function (response) {
      if (typeof callbackFunction === 'function') {
        return callbackFunction(response, parameters);
      } else if (typeof callbackFunction === 'string') {
        return SprykerAjaxCallbacks[callbackFunction](response, parameters);
      } else {
        return response;
      }
    });
  };

  /* change active  */
  self.changeActiveStatus = function (elementId) {
    var options = {
      id: elementId
    };
    self.ajaxSubmit(options, 'changeStatusMarkInGrid');
  };
}();

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



module.exports = new function () {
  var self = this;

  /* HTML success code */
  self.codeSuccess = 200;

  /**
   * Response:
   * <code>
   *  {
   *      "code": 200,
   *      "newStatus": true|false,
   *      "id": 1,
   *      "message": "message if something went wrong"
   *  }
   * </code>
   * @param ajaxResponse
   */
  self.changeStatusMarkInGrid = function (ajaxResponse) {
    if (ajaxResponse.code == self.codeSuccess) {
      $('#active-' + ajaxResponse.id).prop('checked', ajaxResponse.newStatus);
    } else {
      self.alerter.error(ajaxResponse.message);
    }
  };
}();

/***/ }),

/***/ "./vendor/spryker/category-gui/assets/Zed/sass/main.scss":
/*!***************************************************************!*\
  !*** ./vendor/spryker/category-gui/assets/Zed/sass/main.scss ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/category-gui/assets/Zed/js/spryker-zed-category-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ2MsT0FBTyxDQUFDQyxLQUFLLENBQUM1QixZQUFZLENBQUNTLE9BQU8sQ0FBQztJQUM1QztFQUNKLENBQUM7QUFDTCxDQUFDLENBQUUsQ0FBQzs7Ozs7Ozs7Ozs7QUNoQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jYXRlZ29yeS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xvZ2ljLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NhdGVnb3J5LWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jYXRlZ29yeS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3JlcXVlc3QtaGVscGVyLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NhdGVnb3J5LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNhdGVnb3J5LWd1aS1tYWluLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGVnYWN5L1NwcnlrZXJBamF4LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGVnYWN5L1NwcnlrZXJBamF4Q2FsbGJhY2tzLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NhdGVnb3J5LWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzP2E3ZWIiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG53aW5kb3cuc2VyaWFsaXplZExpc3QgPSB7fTtcblxudmFyIGNhdGVnb3J5UmVxdWVzdEhlbHBlciA9IHJlcXVpcmUoJy4vcmVxdWVzdC1oZWxwZXIuanMnKTtcbnZhciBTVE9SRV9TRUxFQ1RPUl9JRCA9ICcjY2F0ZWdvcnlfc3RvcmVfcmVsYXRpb25faWRfc3RvcmVzJztcbnZhciBTVE9SRV9GT1JNX05BTUUgPSAnY2F0ZWdvcnknO1xudmFyIFNUT1JFX1NFTEVDVE9SX0xPQURFUl9DTEFTU19OQU1FID0gJy5yZWxhdGlvbi1zZWxlY3Rvci1sb2FkZXInO1xudmFyIFNUT1JFX1NFTEVDVE9SX0FDVElPTl9VUkxfQVRUUklCVVRFID0gJ2FjdGlvbi11cmwnO1xudmFyIFNUT1JFX1NFTEVDVE9SX0FDVElPTl9FVkVOVF9BVFRSSUJVVEUgPSAnYWN0aW9uLWV2ZW50JztcbnZhciBTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fRklFTERfQVRUUklCVVRFID0gJ2FjdGlvbi1maWVsZCc7XG5cbnZhciBTRUxFQ1RPUl9ST09UX05PREVfVEFCTEUgPSAnI3Jvb3Qtbm9kZS10YWJsZSc7XG52YXIgU0VMRUNUT1JfQ0FURUdPUllfTk9ERV9UUkVFID0gJyNjYXRlZ29yeS1ub2RlLXRyZWUnO1xudmFyIFNFTEVDVE9SX0dVSV9UQUJMRV9EQVRBX0NBVEVHT1JZID0gJy5ndWktdGFibGUtZGF0YS1jYXRlZ29yeSc7XG52YXIgU0VMRUNUT1JfTkVTVEFCTEUgPSAnI25lc3RhYmxlJztcbnZhciBTRUxFQ1RPUl9TQVZFX0NBVEVHT1JJRVNfT1JERVIgPSAnLnNhdmUtY2F0ZWdvcmllcy1vcmRlcic7XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xudmFyIGhhbmRsZVN0b3JlU2VsZWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0b3JlU2VsZWN0b3IgPSAkKFNUT1JFX1NFTEVDVE9SX0lEKTtcbiAgICB2YXIgc3RvcmVTZWxlY3RvckFjdGlvbkZpZWxkTmFtZSA9IHN0b3JlU2VsZWN0b3IuYXR0cihTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fRklFTERfQVRUUklCVVRFKTtcbiAgICB2YXIgcGFyZW50Q2F0ZWdvcnlTZWxlY3RvciA9ICQoXCJbbmFtZT0nXCIgKyBTVE9SRV9GT1JNX05BTUUgKyAnWycgKyBzdG9yZVNlbGVjdG9yQWN0aW9uRmllbGROYW1lICsgXCJdJ11cIik7XG5cbiAgICB2YXIgcGFyZW50Q2F0ZWdvcnlEYXRhID0gcGFyZW50Q2F0ZWdvcnlTZWxlY3Rvci5zZWxlY3QyKCdkYXRhJyk7XG4gICAgaWYgKCFwYXJlbnRDYXRlZ29yeURhdGEpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzdG9yZVNlbGVjdG9yTG9hZGVyID0gc3RvcmVTZWxlY3Rvci5wYXJlbnQoKS5maW5kKFNUT1JFX1NFTEVDVE9SX0xPQURFUl9DTEFTU19OQU1FKTtcbiAgICB2YXIgc3RvcmVTZWxlY3RvckFjdGlvblVybCA9IHN0b3JlU2VsZWN0b3IuYXR0cihTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fVVJMX0FUVFJJQlVURSk7XG4gICAgdmFyIHN0b3JlU2VsZWN0b3JBY3Rpb25FdmVudCA9IHN0b3JlU2VsZWN0b3IuYXR0cihTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fRVZFTlRfQVRUUklCVVRFKTtcbiAgICB2YXIgcGFyZW50Q2F0ZWdvcnlJZCA9IHBhcmVudENhdGVnb3J5RGF0YVswXS5pZDtcbiAgICBpZiAoIXBhcmVudENhdGVnb3J5SWQpIHtcbiAgICAgICAgc3RvcmVTZWxlY3Rvci5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgIH1cblxuICAgIHBhcmVudENhdGVnb3J5U2VsZWN0b3Iub24oc3RvcmVTZWxlY3RvckFjdGlvbkV2ZW50LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2F0ZWdvcnlJZCA9ICQodGhpcykuc2VsZWN0MignZGF0YScpWzBdLmlkO1xuXG4gICAgICAgIGlmIChzZWxlY3RlZENhdGVnb3J5SWQpIHtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiBzdG9yZVNlbGVjdG9yQWN0aW9uVXJsICsgJz9pZC1jYXRlZ29yeS1ub2RlPScgKyBzZWxlY3RlZENhdGVnb3J5SWQsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3Rvci5lbXB0eSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wdGlvbkl0ZW0gPSAkKCc8b3B0aW9uPjwvb3B0aW9uPicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnByb3AoJ3ZhbHVlJywgaXRlbS5pZF9zdG9yZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCAhaXRlbS5pc19hY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRleHQoaXRlbS5uYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3Rvci5hcHBlbmQob3B0aW9uSXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0b3IucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0b3JlU2VsZWN0b3JMb2FkZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVTZWxlY3RvckxvYWRlci5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzdG9yZVNlbGVjdG9yLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgfSk7XG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlzRmlyc3RFdmVudFRyaWdnZXJlZCA9IGZhbHNlO1xuXG4gICAgdmFyIHNlbGVjdG9yUm9vdE5vZGVUYWJsZSA9ICQoU0VMRUNUT1JfUk9PVF9OT0RFX1RBQkxFKTtcbiAgICB2YXIgc2VsZWN0b3JDYXRlZ29yeU5vZGVUcmVlID0gJChTRUxFQ1RPUl9DQVRFR09SWV9OT0RFX1RSRUUpO1xuICAgIHZhciBzZWxlY3RvckNhdGVnb3J5R3VpVGFibGVEYXRhQ2F0ZWdvcnkgPSAkKFNFTEVDVE9SX0dVSV9UQUJMRV9EQVRBX0NBVEVHT1JZKTtcbiAgICB2YXIgc2VsZWN0b3JOZXN0YWJsZSA9ICQoU0VMRUNUT1JfTkVTVEFCTEUpO1xuICAgIHZhciBzZWxlY3RvclNhdmVDYXRlZ29yaWVzT3JkZXIgPSAkKFNFTEVDVE9SX1NBVkVfQ0FURUdPUklFU19PUkRFUik7XG5cbiAgICBzZWxlY3RvclJvb3ROb2RlVGFibGUub24oJ2NsaWNrJywgJ3Rib2R5IHRyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBjYXRlZ29yeUhlbHBlci5zaG93TG9hZGVyQmFyKCk7XG4gICAgICAgIHZhciBpZENhdGVnb3J5Tm9kZSA9ICQodGhpcykuY2hpbGRyZW4oJ3RkOmZpcnN0JykudGV4dCgpO1xuICAgICAgICBTcHJ5a2VyQWpheC5nZXRDYXRlZ29yeVRyZWVCeUlkQ2F0ZWdvcnlOb2RlKGlkQ2F0ZWdvcnlOb2RlKTtcbiAgICB9KTtcblxuICAgIHNlbGVjdG9yQ2F0ZWdvcnlOb2RlVHJlZS5vbignY2xpY2snLCAnLmNhdGVnb3J5LXRyZWUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2F0ZWdvcnlIZWxwZXIuc2hvd0xvYWRlckJhcigpO1xuICAgICAgICB2YXIgaWRDYXRlZ29yeU5vZGUgPSAkKHRoaXMpLmF0dHIoJ2lkJykucmVwbGFjZSgnbm9kZS0nLCAnJyk7XG4gICAgICAgIFNwcnlrZXJBamF4LmdldENhdGVnb3J5VHJlZUJ5SWRDYXRlZ29yeU5vZGUoaWRDYXRlZ29yeU5vZGUpO1xuICAgIH0pO1xuXG4gICAgc2VsZWN0b3JDYXRlZ29yeUd1aVRhYmxlRGF0YUNhdGVnb3J5LmRhdGFUYWJsZSh7XG4gICAgICAgIGJGaWx0ZXI6IGZhbHNlLFxuICAgICAgICBjcmVhdGVkUm93OiBmdW5jdGlvbiAocm93LCBkYXRhLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGlzRmlyc3RFdmVudFRyaWdnZXJlZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhdGVnb3J5SGVscGVyLnNob3dMb2FkZXJCYXIoKTtcbiAgICAgICAgICAgIHZhciBpZENhdGVnb3J5Tm9kZSA9IGRhdGFbMF07XG4gICAgICAgICAgICBTcHJ5a2VyQWpheC5nZXRDYXRlZ29yeVRyZWVCeUlkQ2F0ZWdvcnlOb2RlKGlkQ2F0ZWdvcnlOb2RlKTtcbiAgICAgICAgICAgIGlzRmlyc3RFdmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIH0sXG4gICAgfSk7XG5cbiAgICB2YXIgdXBkYXRlT3V0cHV0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGxpc3QgPSBlLmxlbmd0aCA/IGUgOiAkKGUudGFyZ2V0KTtcbiAgICAgICAgd2luZG93LnNlcmlhbGl6ZWRMaXN0ID0gd2luZG93LkpTT04uc3RyaW5naWZ5KGxpc3QubmVzdGFibGUoJ3NlcmlhbGl6ZScpKTtcbiAgICB9O1xuXG4gICAgc2VsZWN0b3JOZXN0YWJsZVxuICAgICAgICAubmVzdGFibGUoe1xuICAgICAgICAgICAgZ3JvdXA6IDEsXG4gICAgICAgICAgICBtYXhEZXB0aDogMSxcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdjaGFuZ2UnLCB1cGRhdGVPdXRwdXQpO1xuXG4gICAgc2VsZWN0b3JTYXZlQ2F0ZWdvcmllc09yZGVyLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgU3ByeWtlckFqYXgudXBkYXRlQ2F0ZWdvcnlOb2Rlc09yZGVyKHNlcmlhbGl6ZWRMaXN0KTtcbiAgICB9KTtcblxuICAgIGhhbmRsZVN0b3JlU2VsZWN0b3IoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL2xvZ2ljJyk7XG5yZXF1aXJlKCcuLi8uLi9zYXNzL21haW4uc2NzcycpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU0VMRUNUT1JfQ0FURUdPUllfTE9BREVSID0gJyNjYXRlZ29yeS1sb2FkZXInO1xudmFyIFNFTEVDVE9SX0NBVEVHT1JZX05PREVfVFJFRSA9ICcjY2F0ZWdvcnktbm9kZS10cmVlJztcbnZhciBTRUxFQ1RPVF9DQVRFR09SWV9MSVNUID0gJyNjYXRlZ29yaWVzLWxpc3QnO1xuXG52YXIgc2hvd0xvYWRlckJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKFNFTEVDVE9SX0NBVEVHT1JZX0xPQURFUikucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xufTtcblxudmFyIGNsb3NlTG9hZGVyQmFyID0gZnVuY3Rpb24gKCkge1xuICAgICQoU0VMRUNUT1JfQ0FURUdPUllfTE9BREVSKS5hZGRDbGFzcygnaGlkZGVuJyk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBpZENhdGVnb3J5Tm9kZVxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cblNwcnlrZXJBamF4LmdldENhdGVnb3J5VHJlZUJ5SWRDYXRlZ29yeU5vZGUgPSBmdW5jdGlvbiAoaWRDYXRlZ29yeU5vZGUpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgJ2lkLWNhdGVnb3J5LW5vZGUnOiBpZENhdGVnb3J5Tm9kZSxcbiAgICB9O1xuICAgIHRoaXMuc2V0VXJsKCcvY2F0ZWdvcnkvaW5kZXgvbm9kZScpLnNldERhdGFUeXBlKCdodG1sJykuYWpheFN1Ym1pdChvcHRpb25zLCAnZGlzcGxheUNhdGVnb3J5Tm9kZXNUcmVlJyk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBzZXJpYWxpemVkQ2F0ZWdvcnlOb2Rlc1xuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cblNwcnlrZXJBamF4LnVwZGF0ZUNhdGVnb3J5Tm9kZXNPcmRlciA9IGZ1bmN0aW9uIChzZXJpYWxpemVkQ2F0ZWdvcnlOb2Rlcykge1xuICAgIHNob3dMb2FkZXJCYXIoKTtcbiAgICB0aGlzLnNldFVybCgnL2NhdGVnb3J5L25vZGUvcmVvcmRlcicpLmFqYXhTdWJtaXQoXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5vZGVzOiBzZXJpYWxpemVkQ2F0ZWdvcnlOb2RlcyxcbiAgICAgICAgfSxcbiAgICAgICAgJ3VwZGF0ZUNhdGVnb3J5Tm9kZXNPcmRlcicsXG4gICAgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIGFqYXhSZXNwb25zZVxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cblNwcnlrZXJBamF4Q2FsbGJhY2tzLmRpc3BsYXlDYXRlZ29yeU5vZGVzVHJlZSA9IGZ1bmN0aW9uIChhamF4UmVzcG9uc2UpIHtcbiAgICAkKFNFTEVDVE9SX0NBVEVHT1JZX05PREVfVFJFRSkucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICQoU0VMRUNUT1RfQ0FURUdPUllfTElTVCkuaHRtbChhamF4UmVzcG9uc2UpO1xuICAgIGNsb3NlTG9hZGVyQmFyKCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBhamF4UmVzcG9uc2VcbiAqXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5TcHJ5a2VyQWpheENhbGxiYWNrcy51cGRhdGVDYXRlZ29yeU5vZGVzT3JkZXIgPSBmdW5jdGlvbiAoYWpheFJlc3BvbnNlKSB7XG4gICAgY2xvc2VMb2FkZXJCYXIoKTtcblxuICAgIHZhciBpc1N1Y2Nlc3NSZXNwb25zZSA9IGFqYXhSZXNwb25zZS5jb2RlID09PSB0aGlzLmNvZGVTdWNjZXNzO1xuICAgIHZhciBhbGVydFRpdGxlID0gaXNTdWNjZXNzUmVzcG9uc2UgPyAnU3VjY2VzcycgOiAnRXJyb3InO1xuICAgIHZhciBhbGVydFR5cGUgPSBpc1N1Y2Nlc3NSZXNwb25zZSA/ICdzdWNjZXNzJyA6ICdlcnJvcic7XG4gICAgc3dhbCh7XG4gICAgICAgIHRpdGxlOiBhbGVydFRpdGxlLFxuICAgICAgICB0ZXh0OiBhamF4UmVzcG9uc2UubWVzc2FnZSxcbiAgICAgICAgdHlwZTogYWxlcnRUeXBlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzU3VjY2Vzc1Jlc3BvbnNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc2hvd0xvYWRlckJhcjogc2hvd0xvYWRlckJhcixcbiAgICBjbG9zZUxvYWRlckJhcjogY2xvc2VMb2FkZXJCYXIsXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU3ByeWtlckFqYXhDYWxsYmFja3MgPSByZXF1aXJlKCcuL1NwcnlrZXJBamF4Q2FsbGJhY2tzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLyoqIGlmIGFqYXggdXJsIGlzIG51bGwsIHRoZSBhY3Rpb24gd2lsbCBiZSBpbiB0aGUgc2FtZSBwYWdlICovXG4gICAgc2VsZi51cmwgPSBudWxsO1xuXG4gICAgc2VsZi5kYXRhVHlwZSA9ICdqc29uJztcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuZXdVcmxcbiAgICAgKiBAcmV0dXJucyB7U3ByeWtlckFqYXh9XG4gICAgICovXG4gICAgc2VsZi5zZXRVcmwgPSBmdW5jdGlvbiAobmV3VXJsKSB7XG4gICAgICAgIHNlbGYudXJsID0gbmV3VXJsO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5ld0RhdGFUeXBlXG4gICAgICogQHJldHVybnMge1NwcnlrZXJBamF4fVxuICAgICAqL1xuICAgIHNlbGYuc2V0RGF0YVR5cGUgPSBmdW5jdGlvbiAobmV3RGF0YVR5cGUpIHtcbiAgICAgICAgc2VsZi5kYXRhVHlwZSA9IG5ld0RhdGFUeXBlO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hamF4U3VibWl0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrRnVuY3Rpb24sIHBhcmFtZXRlcnMsIGlzR2V0KSB7XG4gICAgICAgIHZhciBjYWxsVHlwZSA9ICEhaXNHZXQgPyAnZ2V0JyA6ICdwb3N0JztcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMudXJsLFxuICAgICAgICAgICAgdHlwZTogY2FsbFR5cGUsXG4gICAgICAgICAgICBkYXRhVHlwZTogdGhpcy5kYXRhVHlwZSxcbiAgICAgICAgICAgIGRhdGE6IG9wdGlvbnMsXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrRnVuY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2tGdW5jdGlvbihyZXNwb25zZSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYWxsYmFja0Z1bmN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBTcHJ5a2VyQWpheENhbGxiYWNrc1tjYWxsYmFja0Z1bmN0aW9uXShyZXNwb25zZSwgcGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qIGNoYW5nZSBhY3RpdmUgICovXG4gICAgc2VsZi5jaGFuZ2VBY3RpdmVTdGF0dXMgPSBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgaWQ6IGVsZW1lbnRJZCxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5hamF4U3VibWl0KG9wdGlvbnMsICdjaGFuZ2VTdGF0dXNNYXJrSW5HcmlkJyk7XG4gICAgfTtcbn0pKCk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLyogSFRNTCBzdWNjZXNzIGNvZGUgKi9cbiAgICBzZWxmLmNvZGVTdWNjZXNzID0gMjAwO1xuXG4gICAgLyoqXG4gICAgICogUmVzcG9uc2U6XG4gICAgICogPGNvZGU+XG4gICAgICogIHtcbiAgICAgKiAgICAgIFwiY29kZVwiOiAyMDAsXG4gICAgICogICAgICBcIm5ld1N0YXR1c1wiOiB0cnVlfGZhbHNlLFxuICAgICAqICAgICAgXCJpZFwiOiAxLFxuICAgICAqICAgICAgXCJtZXNzYWdlXCI6IFwibWVzc2FnZSBpZiBzb21ldGhpbmcgd2VudCB3cm9uZ1wiXG4gICAgICogIH1cbiAgICAgKiA8L2NvZGU+XG4gICAgICogQHBhcmFtIGFqYXhSZXNwb25zZVxuICAgICAqL1xuICAgIHNlbGYuY2hhbmdlU3RhdHVzTWFya0luR3JpZCA9IGZ1bmN0aW9uIChhamF4UmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKGFqYXhSZXNwb25zZS5jb2RlID09IHNlbGYuY29kZVN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICQoJyNhY3RpdmUtJyArIGFqYXhSZXNwb25zZS5pZCkucHJvcCgnY2hlY2tlZCcsIGFqYXhSZXNwb25zZS5uZXdTdGF0dXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5hbGVydGVyLmVycm9yKGFqYXhSZXNwb25zZS5tZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbIndpbmRvdyIsInNlcmlhbGl6ZWRMaXN0IiwiY2F0ZWdvcnlSZXF1ZXN0SGVscGVyIiwicmVxdWlyZSIsIlNUT1JFX1NFTEVDVE9SX0lEIiwiU1RPUkVfRk9STV9OQU1FIiwiU1RPUkVfU0VMRUNUT1JfTE9BREVSX0NMQVNTX05BTUUiLCJTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fVVJMX0FUVFJJQlVURSIsIlNUT1JFX1NFTEVDVE9SX0FDVElPTl9FVkVOVF9BVFRSSUJVVEUiLCJTVE9SRV9TRUxFQ1RPUl9BQ1RJT05fRklFTERfQVRUUklCVVRFIiwiU0VMRUNUT1JfUk9PVF9OT0RFX1RBQkxFIiwiU0VMRUNUT1JfQ0FURUdPUllfTk9ERV9UUkVFIiwiU0VMRUNUT1JfR1VJX1RBQkxFX0RBVEFfQ0FURUdPUlkiLCJTRUxFQ1RPUl9ORVNUQUJMRSIsIlNFTEVDVE9SX1NBVkVfQ0FURUdPUklFU19PUkRFUiIsImhhbmRsZVN0b3JlU2VsZWN0b3IiLCJzdG9yZVNlbGVjdG9yIiwiJCIsInN0b3JlU2VsZWN0b3JBY3Rpb25GaWVsZE5hbWUiLCJhdHRyIiwicGFyZW50Q2F0ZWdvcnlTZWxlY3RvciIsInBhcmVudENhdGVnb3J5RGF0YSIsInNlbGVjdDIiLCJzdG9yZVNlbGVjdG9yTG9hZGVyIiwicGFyZW50IiwiZmluZCIsInN0b3JlU2VsZWN0b3JBY3Rpb25VcmwiLCJzdG9yZVNlbGVjdG9yQWN0aW9uRXZlbnQiLCJwYXJlbnRDYXRlZ29yeUlkIiwiaWQiLCJwcm9wIiwib24iLCJldmVudCIsInNlbGVjdGVkQ2F0ZWdvcnlJZCIsImFqYXgiLCJ1cmwiLCJzdWNjZXNzIiwiZGF0YSIsImVtcHR5IiwiZm9yRWFjaCIsIml0ZW0iLCJvcHRpb25JdGVtIiwiaWRfc3RvcmUiLCJpc19hY3RpdmUiLCJ0ZXh0IiwibmFtZSIsImFwcGVuZCIsImJlZm9yZVNlbmQiLCJhZGRDbGFzcyIsImNvbXBsZXRlIiwicmVtb3ZlQ2xhc3MiLCJkb2N1bWVudCIsInJlYWR5IiwiaXNGaXJzdEV2ZW50VHJpZ2dlcmVkIiwic2VsZWN0b3JSb290Tm9kZVRhYmxlIiwic2VsZWN0b3JDYXRlZ29yeU5vZGVUcmVlIiwic2VsZWN0b3JDYXRlZ29yeUd1aVRhYmxlRGF0YUNhdGVnb3J5Iiwic2VsZWN0b3JOZXN0YWJsZSIsInNlbGVjdG9yU2F2ZUNhdGVnb3JpZXNPcmRlciIsImNhdGVnb3J5SGVscGVyIiwic2hvd0xvYWRlckJhciIsImlkQ2F0ZWdvcnlOb2RlIiwiY2hpbGRyZW4iLCJTcHJ5a2VyQWpheCIsImdldENhdGVnb3J5VHJlZUJ5SWRDYXRlZ29yeU5vZGUiLCJwcmV2ZW50RGVmYXVsdCIsInJlcGxhY2UiLCJkYXRhVGFibGUiLCJiRmlsdGVyIiwiY3JlYXRlZFJvdyIsInJvdyIsImluZGV4IiwidXBkYXRlT3V0cHV0IiwiZSIsImxpc3QiLCJsZW5ndGgiLCJ0YXJnZXQiLCJKU09OIiwic3RyaW5naWZ5IiwibmVzdGFibGUiLCJncm91cCIsIm1heERlcHRoIiwiY2xpY2siLCJ1cGRhdGVDYXRlZ29yeU5vZGVzT3JkZXIiLCJTRUxFQ1RPUl9DQVRFR09SWV9MT0FERVIiLCJTRUxFQ1RPVF9DQVRFR09SWV9MSVNUIiwiY2xvc2VMb2FkZXJCYXIiLCJvcHRpb25zIiwic2V0VXJsIiwic2V0RGF0YVR5cGUiLCJhamF4U3VibWl0Iiwic2VyaWFsaXplZENhdGVnb3J5Tm9kZXMiLCJub2RlcyIsIlNwcnlrZXJBamF4Q2FsbGJhY2tzIiwiZGlzcGxheUNhdGVnb3J5Tm9kZXNUcmVlIiwiYWpheFJlc3BvbnNlIiwiaHRtbCIsImlzU3VjY2Vzc1Jlc3BvbnNlIiwiY29kZSIsImNvZGVTdWNjZXNzIiwiYWxlcnRUaXRsZSIsImFsZXJ0VHlwZSIsInN3YWwiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJ0eXBlIiwibW9kdWxlIiwiZXhwb3J0cyIsInNlbGYiLCJkYXRhVHlwZSIsIm5ld1VybCIsIm5ld0RhdGFUeXBlIiwiY2FsbGJhY2tGdW5jdGlvbiIsInBhcmFtZXRlcnMiLCJpc0dldCIsImNhbGxUeXBlIiwiZG9uZSIsInJlc3BvbnNlIiwiY2hhbmdlQWN0aXZlU3RhdHVzIiwiZWxlbWVudElkIiwiY2hhbmdlU3RhdHVzTWFya0luR3JpZCIsIm5ld1N0YXR1cyIsImFsZXJ0ZXIiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=