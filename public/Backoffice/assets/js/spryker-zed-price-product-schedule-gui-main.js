"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-price-product-schedule-gui-main"],{

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/dependent-select-box.js":
/*!*******************************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/dependent-select-box.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function DependentSelectBox(options) {
  var _self = this;
  this.data = {};
  this.requestMethod = 'POST';
  $.extend(this, options);
  this.init = function () {
    this.mapEvents();
  };
  this.mapEvents = function () {
    this.$trigger.on('change', function () {
      _self.getData($(this));
      _self.requestData();
    });
  };
  this.getData = function (trigger) {
    if (this.dataKey.length) {
      this.data[this.dataKey] = trigger.val();
      return;
    }
    this.data = trigger.val();
  };
  this.requestData = function () {
    this.$target.attr('disabled', true);
    $.ajax({
      url: this.requestUrl,
      type: this.requestMethod,
      data: this.data,
      success: function (data) {
        _self.updateTargetSelectBox(data);
        _self.successCallback ? _self.successCallback(data) : null;
      }
    });
  };
  this.updateTargetSelectBox = function (data) {
    if (data.length === 0) {
      this.clearTargetSelectBox(true);
      return;
    }
    this.clearTargetSelectBox(false);
    this.fillTargetSelectBox(data);
  };
  this.clearTargetSelectBox = function (isDisabled) {
    this.$target.attr('disabled', isDisabled);
    this.$target.find('option:gt(0)').remove();
  };
  this.fillTargetSelectBox = function (data) {
    $.each(data[this.responseData.response], function (index, element) {
      _self.$target.append($('<option value="' + element[_self.responseData.value] + '">' + element[_self.responseData.text] + '</option>'));
    });
  };
  this.init();
}
module.exports = DependentSelectBox;

/***/ }),

/***/ "./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/price-product-schedule-create.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/price-product-schedule-create.js ***!
  \**********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var DependentSelectBox = __webpack_require__(/*! ZedGuiModules/libs/dependent-select-box */ "./vendor/spryker/gui/assets/Zed/js/modules/libs/dependent-select-box.js");
function PriceProductScheduleCreate(options) {
  $.extend(this, options);
  var self = this;
  this.init = function () {
    this.initActiveFromDatepicker();
    this.initActiveToDatepicker();
    this.hideTimezoneMessage();
    this.initDependentSelectBox();
    this.preventDoubleSubmission();
  };
  this.initActiveFromDatepicker = function () {
    this.$activeFrom.click(function (event) {
      event.preventDefault();
    });
    this.$activeFrom.datepicker({
      altFormat: 'yy-mm-dd',
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      defaultData: 0
    });
  };
  this.initActiveToDatepicker = function () {
    this.$activeTo.click(function (event) {
      event.preventDefault();
    });
    this.$activeTo.datepicker({
      dateFormat: 'yy-mm-dd',
      changeMonth: true,
      defaultData: 0
    });
  };
  this.toggleVisibility = function (display) {
    this.$activeFromTimezoneText.toggle(display);
    this.$activeToTimezoneText.toggle(display);
  };
  this.hideTimezoneMessage = function () {
    if (!this.$store.val()) {
      this.toggleVisibility(false);
    }
  };
  this.fillTimezoneMessage = function (data) {
    this.$timezone.each(function (index, element) {
      $(element).text(data.store.timezone);
    });
  };
  this.successCallback = function (data) {
    if (!data.store) {
      self.toggleVisibility(false);
      return;
    }
    self.fillTimezoneMessage(data);
    self.toggleVisibility(true);
  };
  this.preventDoubleSubmission = function () {
    this.form.submit(function () {
      self.submit.prop('disabled', true);
    });
  };
  this.initDependentSelectBox = function () {
    new DependentSelectBox({
      $trigger: this.$store,
      $target: this.$currency,
      requestUrl: this.requestUrl,
      dataKey: this.dataKey,
      responseData: this.currencies,
      successCallback: this.successCallback
    });
  };
  this.init();
}
module.exports = PriceProductScheduleCreate;

/***/ }),

/***/ "./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/scheduled-prices-errors-form.js":
/*!*********************************************************************************************************!*\
  !*** ./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/scheduled-prices-errors-form.js ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('#scheduled-prices-errors-form').DataTable();
});

/***/ }),

/***/ "./vendor/spryker/price-product-schedule-gui/assets/Zed/js/spryker-zed-price-product-schedule-gui-main.entry.js":
/*!**********************************************************************************************************************!*\
  !*** ./vendor/spryker/price-product-schedule-gui/assets/Zed/js/spryker-zed-price-product-schedule-gui-main.entry.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2017-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var PriceProductScheduleCreate = __webpack_require__(/*! ./modules/price-product-schedule-create */ "./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/price-product-schedule-create.js");
__webpack_require__(/*! ./modules/scheduled-prices-errors-form */ "./vendor/spryker/price-product-schedule-gui/assets/Zed/js/modules/scheduled-prices-errors-form.js");
__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/price-product-schedule-gui/assets/Zed/sass/main.scss");
$(document).ready(function () {
  new PriceProductScheduleCreate({
    $activeFrom: $('#price_product_schedule_activeFrom_date'),
    $activeTo: $('#price_product_schedule_activeTo_date'),
    $store: $('#price_product_schedule_priceProduct_moneyValue_store_idStore'),
    $currency: $('#price_product_schedule_priceProduct_moneyValue_currency_idCurrency'),
    $activeFromTimezoneText: $('#active_to_timezone_text'),
    $activeToTimezoneText: $('#active_from_timezone_text'),
    $timezone: $('.timezone'),
    requestUrl: '/currency/currencies-for-store',
    dataKey: 'idStore',
    currencies: {
      response: 'currencies',
      value: 'id_currency',
      text: 'code'
    },
    submit: $('#price_product_schedule_submit'),
    form: $('#price_product_schedule_form')
  });
});

/***/ }),

/***/ "./vendor/spryker/price-product-schedule-gui/assets/Zed/sass/main.scss":
/*!*****************************************************************************!*\
  !*** ./vendor/spryker/price-product-schedule-gui/assets/Zed/sass/main.scss ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/price-product-schedule-gui/assets/Zed/js/spryker-zed-price-product-schedule-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcmljZS1wcm9kdWN0LXNjaGVkdWxlLWd1aS1tYWluLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTQSxrQkFBa0JBLENBQUNDLE9BQU8sRUFBRTtFQUNqQyxJQUFJQyxLQUFLLEdBQUcsSUFBSTtFQUNoQixJQUFJLENBQUNDLElBQUksR0FBRyxDQUFDLENBQUM7RUFDZCxJQUFJLENBQUNDLGFBQWEsR0FBRyxNQUFNO0VBRTNCQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxJQUFJLEVBQUVMLE9BQU8sQ0FBQztFQUV2QixJQUFJLENBQUNNLElBQUksR0FBRyxZQUFZO0lBQ3BCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEIsQ0FBQztFQUVELElBQUksQ0FBQ0EsU0FBUyxHQUFHLFlBQVk7SUFDekIsSUFBSSxDQUFDQyxRQUFRLENBQUNDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsWUFBWTtNQUNuQ1IsS0FBSyxDQUFDUyxPQUFPLENBQUNOLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUN0QkgsS0FBSyxDQUFDVSxXQUFXLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsSUFBSSxDQUFDRCxPQUFPLEdBQUcsVUFBVUUsT0FBTyxFQUFFO0lBQzlCLElBQUksSUFBSSxDQUFDQyxPQUFPLENBQUNDLE1BQU0sRUFBRTtNQUNyQixJQUFJLENBQUNaLElBQUksQ0FBQyxJQUFJLENBQUNXLE9BQU8sQ0FBQyxHQUFHRCxPQUFPLENBQUNHLEdBQUcsQ0FBQyxDQUFDO01BRXZDO0lBQ0o7SUFFQSxJQUFJLENBQUNiLElBQUksR0FBR1UsT0FBTyxDQUFDRyxHQUFHLENBQUMsQ0FBQztFQUM3QixDQUFDO0VBRUQsSUFBSSxDQUFDSixXQUFXLEdBQUcsWUFBWTtJQUMzQixJQUFJLENBQUNLLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENB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O0FBRWE7O0FBRWIsSUFBSWxDLDBCQUEwQixHQUFHRCxtQkFBTyxDQUFDLG1KQUF5QyxDQUFDO0FBQ25GQSxtQkFBTyxDQUFDLGlKQUF3QyxDQUFDO0FBQ2pEQSxtQkFBTyxDQUFDLGdHQUFtQixDQUFDO0FBRTVCcEMsQ0FBQyxDQUFDcUUsUUFBUSxDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFZO0VBQzFCLElBQUlqQywwQkFBMEIsQ0FBQztJQUMzQk8sV0FBVyxFQUFFNUMsQ0FBQyxDQUFDLHlDQUF5QyxDQUFDO0lBQ3pEcUQsU0FBUyxFQUFFckQsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDO0lBQ3JEMkQsTUFBTSxFQUFFM0QsQ0FBQyxDQUFDLCtEQUErRCxDQUFDO0lBQzFFbUUsU0FBUyxFQUFFbkUsQ0FBQyxDQUFDLHFFQUFxRSxDQUFDO0lBQ25Gd0QsdUJBQXVCLEVBQUV4RCxDQUFDLENBQUMsMEJBQTBCLENBQUM7SUFDdEQwRCxxQkFBcUIsRUFBRTFELENBQUMsQ0FBQyw0QkFBNEIsQ0FBQztJQUN0RDZELFNBQVMsRUFBRTdELENBQUMsQ0FBQyxXQUFXLENBQUM7SUFDekJnQixVQUFVLEVBQUUsZ0NBQWdDO0lBQzVDUCxPQUFPLEVBQUUsU0FBUztJQUNsQjJELFVBQVUsRUFBRTtNQUNSeEMsUUFBUSxFQUFFLFlBQVk7TUFDdEJJLEtBQUssRUFBRSxhQUFhO01BQ3BCQyxJQUFJLEVBQUU7SUFDVixDQUFDO0lBQ0RnQyxNQUFNLEVBQUVqRSxDQUFDLENBQUMsZ0NBQWdDLENBQUM7SUFDM0NnRSxJQUFJLEVBQUVoRSxDQUFDLENBQUMsOEJBQThCO0VBQzFDLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7QUM5QkYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvZGVwZW5kZW50LXNlbGVjdC1ib3guanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvcHJpY2UtcHJvZHVjdC1zY2hlZHVsZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3ByaWNlLXByb2R1Y3Qtc2NoZWR1bGUtY3JlYXRlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3ByaWNlLXByb2R1Y3Qtc2NoZWR1bGUtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9zY2hlZHVsZWQtcHJpY2VzLWVycm9ycy1mb3JtLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3ByaWNlLXByb2R1Y3Qtc2NoZWR1bGUtZ3VpL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtcHJpY2UtcHJvZHVjdC1zY2hlZHVsZS1ndWktbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcmljZS1wcm9kdWN0LXNjaGVkdWxlLWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzPzI0NTEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBEZXBlbmRlbnRTZWxlY3RCb3gob3B0aW9ucykge1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5kYXRhID0ge307XG4gICAgdGhpcy5yZXF1ZXN0TWV0aG9kID0gJ1BPU1QnO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfTtcblxuICAgIHRoaXMubWFwRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiR0cmlnZ2VyLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfc2VsZi5nZXREYXRhKCQodGhpcykpO1xuICAgICAgICAgICAgX3NlbGYucmVxdWVzdERhdGEoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0RGF0YSA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGFLZXkubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGFbdGhpcy5kYXRhS2V5XSA9IHRyaWdnZXIudmFsKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YSA9IHRyaWdnZXIudmFsKCk7XG4gICAgfTtcblxuICAgIHRoaXMucmVxdWVzdERhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJHRhcmdldC5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IHRoaXMucmVxdWVzdFVybCxcbiAgICAgICAgICAgIHR5cGU6IHRoaXMucmVxdWVzdE1ldGhvZCxcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYudXBkYXRlVGFyZ2V0U2VsZWN0Qm94KGRhdGEpO1xuICAgICAgICAgICAgICAgIF9zZWxmLnN1Y2Nlc3NDYWxsYmFjayA/IF9zZWxmLnN1Y2Nlc3NDYWxsYmFjayhkYXRhKSA6IG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy51cGRhdGVUYXJnZXRTZWxlY3RCb3ggPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUYXJnZXRTZWxlY3RCb3godHJ1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xlYXJUYXJnZXRTZWxlY3RCb3goZmFsc2UpO1xuICAgICAgICB0aGlzLmZpbGxUYXJnZXRTZWxlY3RCb3goZGF0YSk7XG4gICAgfTtcblxuICAgIHRoaXMuY2xlYXJUYXJnZXRTZWxlY3RCb3ggPSBmdW5jdGlvbiAoaXNEaXNhYmxlZCkge1xuICAgICAgICB0aGlzLiR0YXJnZXQuYXR0cignZGlzYWJsZWQnLCBpc0Rpc2FibGVkKTtcbiAgICAgICAgdGhpcy4kdGFyZ2V0LmZpbmQoJ29wdGlvbjpndCgwKScpLnJlbW92ZSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmZpbGxUYXJnZXRTZWxlY3RCb3ggPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAkLmVhY2goZGF0YVt0aGlzLnJlc3BvbnNlRGF0YS5yZXNwb25zZV0sIGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICAgICAgX3NlbGYuJHRhcmdldC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgJChcbiAgICAgICAgICAgICAgICAgICAgJzxvcHRpb24gdmFsdWU9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbX3NlbGYucmVzcG9uc2VEYXRhLnZhbHVlXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50W19zZWxmLnJlc3BvbnNlRGF0YS50ZXh0XSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnPC9vcHRpb24+JyxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlcGVuZGVudFNlbGVjdEJveDtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIERlcGVuZGVudFNlbGVjdEJveCA9IHJlcXVpcmUoJ1plZEd1aU1vZHVsZXMvbGlicy9kZXBlbmRlbnQtc2VsZWN0LWJveCcpO1xuXG5mdW5jdGlvbiBQcmljZVByb2R1Y3RTY2hlZHVsZUNyZWF0ZShvcHRpb25zKSB7XG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaW5pdEFjdGl2ZUZyb21EYXRlcGlja2VyKCk7XG4gICAgICAgIHRoaXMuaW5pdEFjdGl2ZVRvRGF0ZXBpY2tlcigpO1xuICAgICAgICB0aGlzLmhpZGVUaW1lem9uZU1lc3NhZ2UoKTtcbiAgICAgICAgdGhpcy5pbml0RGVwZW5kZW50U2VsZWN0Qm94KCk7XG4gICAgICAgIHRoaXMucHJldmVudERvdWJsZVN1Ym1pc3Npb24oKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0QWN0aXZlRnJvbURhdGVwaWNrZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUZyb20uY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYWN0aXZlRnJvbS5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGFsdEZvcm1hdDogJ3l5LW1tLWRkJyxcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcbiAgICAgICAgICAgIGRlZmF1bHREYXRhOiAwLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0QWN0aXZlVG9EYXRlcGlja2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLiRhY3RpdmVUby5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhY3RpdmVUby5kYXRlcGlja2VyKHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcbiAgICAgICAgICAgIGRlZmF1bHREYXRhOiAwLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVWaXNpYmlsaXR5ID0gZnVuY3Rpb24gKGRpc3BsYXkpIHtcbiAgICAgICAgdGhpcy4kYWN0aXZlRnJvbVRpbWV6b25lVGV4dC50b2dnbGUoZGlzcGxheSk7XG4gICAgICAgIHRoaXMuJGFjdGl2ZVRvVGltZXpvbmVUZXh0LnRvZ2dsZShkaXNwbGF5KTtcbiAgICB9O1xuXG4gICAgdGhpcy5oaWRlVGltZXpvbmVNZXNzYWdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuJHN0b3JlLnZhbCgpKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZmlsbFRpbWV6b25lTWVzc2FnZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuJHRpbWV6b25lLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICAkKGVsZW1lbnQpLnRleHQoZGF0YS5zdG9yZS50aW1lem9uZSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICghZGF0YS5zdG9yZSkge1xuICAgICAgICAgICAgc2VsZi50b2dnbGVWaXNpYmlsaXR5KGZhbHNlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5maWxsVGltZXpvbmVNZXNzYWdlKGRhdGEpO1xuICAgICAgICBzZWxmLnRvZ2dsZVZpc2liaWxpdHkodHJ1ZSk7XG4gICAgfTtcblxuICAgIHRoaXMucHJldmVudERvdWJsZVN1Ym1pc3Npb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZm9ybS5zdWJtaXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdERlcGVuZGVudFNlbGVjdEJveCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbmV3IERlcGVuZGVudFNlbGVjdEJveCh7XG4gICAgICAgICAgICAkdHJpZ2dlcjogdGhpcy4kc3RvcmUsXG4gICAgICAgICAgICAkdGFyZ2V0OiB0aGlzLiRjdXJyZW5jeSxcbiAgICAgICAgICAgIHJlcXVlc3RVcmw6IHRoaXMucmVxdWVzdFVybCxcbiAgICAgICAgICAgIGRhdGFLZXk6IHRoaXMuZGF0YUtleSxcbiAgICAgICAgICAgIHJlc3BvbnNlRGF0YTogdGhpcy5jdXJyZW5jaWVzLFxuICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrOiB0aGlzLnN1Y2Nlc3NDYWxsYmFjayxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuaW5pdCgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByaWNlUHJvZHVjdFNjaGVkdWxlQ3JlYXRlO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnI3NjaGVkdWxlZC1wcmljZXMtZXJyb3JzLWZvcm0nKS5EYXRhVGFibGUoKTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTctcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUHJpY2VQcm9kdWN0U2NoZWR1bGVDcmVhdGUgPSByZXF1aXJlKCcuL21vZHVsZXMvcHJpY2UtcHJvZHVjdC1zY2hlZHVsZS1jcmVhdGUnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9zY2hlZHVsZWQtcHJpY2VzLWVycm9ycy1mb3JtJyk7XG5yZXF1aXJlKCcuLi9zYXNzL21haW4uc2NzcycpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgbmV3IFByaWNlUHJvZHVjdFNjaGVkdWxlQ3JlYXRlKHtcbiAgICAgICAgJGFjdGl2ZUZyb206ICQoJyNwcmljZV9wcm9kdWN0X3NjaGVkdWxlX2FjdGl2ZUZyb21fZGF0ZScpLFxuICAgICAgICAkYWN0aXZlVG86ICQoJyNwcmljZV9wcm9kdWN0X3NjaGVkdWxlX2FjdGl2ZVRvX2RhdGUnKSxcbiAgICAgICAgJHN0b3JlOiAkKCcjcHJpY2VfcHJvZHVjdF9zY2hlZHVsZV9wcmljZVByb2R1Y3RfbW9uZXlWYWx1ZV9zdG9yZV9pZFN0b3JlJyksXG4gICAgICAgICRjdXJyZW5jeTogJCgnI3ByaWNlX3Byb2R1Y3Rfc2NoZWR1bGVfcHJpY2VQcm9kdWN0X21vbmV5VmFsdWVfY3VycmVuY3lfaWRDdXJyZW5jeScpLFxuICAgICAgICAkYWN0aXZlRnJvbVRpbWV6b25lVGV4dDogJCgnI2FjdGl2ZV90b190aW1lem9uZV90ZXh0JyksXG4gICAgICAgICRhY3RpdmVUb1RpbWV6b25lVGV4dDogJCgnI2FjdGl2ZV9mcm9tX3RpbWV6b25lX3RleHQnKSxcbiAgICAgICAgJHRpbWV6b25lOiAkKCcudGltZXpvbmUnKSxcbiAgICAgICAgcmVxdWVzdFVybDogJy9jdXJyZW5jeS9jdXJyZW5jaWVzLWZvci1zdG9yZScsXG4gICAgICAgIGRhdGFLZXk6ICdpZFN0b3JlJyxcbiAgICAgICAgY3VycmVuY2llczoge1xuICAgICAgICAgICAgcmVzcG9uc2U6ICdjdXJyZW5jaWVzJyxcbiAgICAgICAgICAgIHZhbHVlOiAnaWRfY3VycmVuY3knLFxuICAgICAgICAgICAgdGV4dDogJ2NvZGUnLFxuICAgICAgICB9LFxuICAgICAgICBzdWJtaXQ6ICQoJyNwcmljZV9wcm9kdWN0X3NjaGVkdWxlX3N1Ym1pdCcpLFxuICAgICAgICBmb3JtOiAkKCcjcHJpY2VfcHJvZHVjdF9zY2hlZHVsZV9mb3JtJyksXG4gICAgfSk7XG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJEZXBlbmRlbnRTZWxlY3RCb3giLCJvcHRpb25zIiwiX3NlbGYiLCJkYXRhIiwicmVxdWVzdE1ldGhvZCIsIiQiLCJleHRlbmQiLCJpbml0IiwibWFwRXZlbnRzIiwiJHRyaWdnZXIiLCJvbiIsImdldERhdGEiLCJyZXF1ZXN0RGF0YSIsInRyaWdnZXIiLCJkYXRhS2V5IiwibGVuZ3RoIiwidmFsIiwiJHRhcmdldCIsImF0dHIiLCJhamF4IiwidXJsIiwicmVxdWVzdFVybCIsInR5cGUiLCJzdWNjZXNzIiwidXBkYXRlVGFyZ2V0U2VsZWN0Qm94Iiwic3VjY2Vzc0NhbGxiYWNrIiwiY2xlYXJUYXJnZXRTZWxlY3RCb3giLCJmaWxsVGFyZ2V0U2VsZWN0Qm94IiwiaXNEaXNhYmxlZCIsImZpbmQiLCJyZW1vdmUiLCJlYWNoIiwicmVzcG9uc2VEYXRhIiwicmVzcG9uc2UiLCJpbmRleCIsImVsZW1lbnQiLCJhcHBlbmQiLCJ2YWx1ZSIsInRleHQiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVxdWlyZSIsIlByaWNlUHJvZHVjdFNjaGVkdWxlQ3JlYXRlIiwic2VsZiIsImluaXRBY3RpdmVGcm9tRGF0ZXBpY2tlciIsImluaXRBY3RpdmVUb0RhdGVwaWNrZXIiLCJoaWRlVGltZXpvbmVNZXNzYWdlIiwiaW5pdERlcGVuZGVudFNlbGVjdEJveCIsInByZXZlbnREb3VibGVTdWJtaXNzaW9uIiwiJGFjdGl2ZUZyb20iLCJjbGljayIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJkYXRlcGlja2VyIiwiYWx0Rm9ybWF0IiwiZGF0ZUZvcm1hdCIsImNoYW5nZU1vbnRoIiwiZGVmYXVsdERhdGEiLCIkYWN0aXZlVG8iLCJ0b2dnbGVWaXNpYmlsaXR5IiwiZGlzcGxheSIsIiRhY3RpdmVGcm9tVGltZXpvbmVUZXh0IiwidG9nZ2xlIiwiJGFjdGl2ZVRvVGltZXpvbmVUZXh0IiwiJHN0b3JlIiwiZmlsbFRpbWV6b25lTWVzc2FnZSIsIiR0aW1lem9uZSIsInN0b3JlIiwidGltZXpvbmUiLCJmb3JtIiwic3VibWl0IiwicHJvcCIsIiRjdXJyZW5jeSIsImN1cnJlbmNpZXMiLCJkb2N1bWVudCIsInJlYWR5IiwiRGF0YVRhYmxlIl0sInNvdXJjZVJvb3QiOiIifQ==