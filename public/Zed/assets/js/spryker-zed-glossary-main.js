"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-glossary-main"],{

/***/ "./vendor/spryker/glossary/assets/Zed/js/modules/legacy/logic.js":
/*!***********************************************************************!*\
  !*** ./vendor/spryker/glossary/assets/Zed/js/modules/legacy/logic.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var SprykerAjax = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjax */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



SprykerAjax.glossaryKeyUniqueCheck = function () {
  var obj = $('#form_glossary_key').val();
  this.setUrl('/glossary/key/ajax').ajaxSubmit({
    term: obj
  }, function (ajaxResponse) {
    var changed = false;
    $.each(ajaxResponse, function (i, item) {
      var key = '#form_locale_' + i;
      var value = $(key).val();
      if (!value.length) {
        $(key).val(item);
        changed = true;
      }
    });
    if (changed) {
      $('#form_submit').text('Save');
    }
  });
};
$(document).ready(function () {
  $('#form_glossary_key').blur(function () {
    SprykerAjax.glossaryKeyUniqueCheck();
  });
});

/***/ }),

/***/ "./vendor/spryker/glossary/assets/Zed/js/modules/main.js":
/*!***************************************************************!*\
  !*** ./vendor/spryker/glossary/assets/Zed/js/modules/main.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./legacy/logic */ "./vendor/spryker/glossary/assets/Zed/js/modules/legacy/logic.js");
$(document).ready(function () {
  $('[name=translation]').on('submit', function () {
    var self = $(this);
    self.find('.html-editor').each(function (index, element) {
      var editor = $(element);
      if (editor.summernote('codeview.isActivated')) {
        editor.summernote('codeview.deactivate');
      }
      if (editor.summernote('isEmpty')) {
        editor.val(null);
      }
    });
  });
});

/***/ }),

/***/ "./vendor/spryker/glossary/assets/Zed/js/spryker-zed-glossary-main.entry.js":
/*!**********************************************************************************!*\
  !*** ./vendor/spryker/glossary/assets/Zed/js/spryker-zed-glossary-main.entry.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/glossary/assets/Zed/js/modules/main.js");

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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/glossary/assets/Zed/js/spryker-zed-glossary-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRSxFQUFFRDtJQUNSLENBQUM7SUFDRHpCLElBQUksQ0FBQ2hCLFVBQVUsQ0FBQzhCLE9BQU8sRUFBRSx3QkFBd0IsQ0FBQztFQUN0RCxDQUFDO0FBQ0wsQ0FBQyxDQUFFLENBQUM7Ozs7Ozs7Ozs7O0FDNURKO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViUCxNQUFNLENBQUNDLE9BQU8sR0FBRyxJQUFLLFlBQVk7RUFDOUIsSUFBSVIsSUFBSSxHQUFHLElBQUk7O0VBRWY7RUFDQUEsSUFBSSxDQUFDMkIsV0FBVyxHQUFHLEdBQUc7O0VBRXRCO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNJM0IsSUFBSSxDQUFDNEIsc0JBQXNCLEdBQUcsVUFBVTFDLFlBQVksRUFBRTtJQUNsRCxJQUFJQSxZQUFZLENBQUMyQyxJQUFJLElBQUk3QixJQUFJLENBQUMyQixXQUFXLEVBQUU7TUFDdkM5QyxDQUFDLENBQUMsVUFBVSxHQUFHSyxZQUFZLENBQUN3QyxFQUFFLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRTVDLFlBQVksQ0FBQzZDLFNBQVMsQ0FBQztJQUMzRSxDQUFDLE1BQU07TUFDSC9CLElBQUksQ0FBQ2dDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDL0MsWUFBWSxDQUFDZ0QsT0FBTyxDQUFDO0lBQzVDO0VBQ0osQ0FBQztBQUNMLENBQUMsQ0FBRSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ2xvc3NhcnkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xlZ2FjeS9sb2dpYy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9nbG9zc2FyeS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9nbG9zc2FyeS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWdsb3NzYXJ5LW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9sZWdhY3kvU3ByeWtlckFqYXguanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9sZWdhY3kvU3ByeWtlckFqYXhDYWxsYmFja3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5TcHJ5a2VyQWpheC5nbG9zc2FyeUtleVVuaXF1ZUNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYmogPSAkKCcjZm9ybV9nbG9zc2FyeV9rZXknKS52YWwoKTtcbiAgICB0aGlzLnNldFVybCgnL2dsb3NzYXJ5L2tleS9hamF4JykuYWpheFN1Ym1pdCh7IHRlcm06IG9iaiB9LCBmdW5jdGlvbiAoYWpheFJlc3BvbnNlKSB7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICQuZWFjaChhamF4UmVzcG9uc2UsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gJyNmb3JtX2xvY2FsZV8nICsgaTtcblxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJChrZXkpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkKGtleSkudmFsKGl0ZW0pO1xuICAgICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgJCgnI2Zvcm1fc3VibWl0JykudGV4dCgnU2F2ZScpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnI2Zvcm1fZ2xvc3Nhcnlfa2V5JykuYmx1cihmdW5jdGlvbiAoKSB7XG4gICAgICAgIFNwcnlrZXJBamF4Lmdsb3NzYXJ5S2V5VW5pcXVlQ2hlY2soKTtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL2xlZ2FjeS9sb2dpYycpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgJCgnW25hbWU9dHJhbnNsYXRpb25dJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuXG4gICAgICAgIHNlbGYuZmluZCgnLmh0bWwtZWRpdG9yJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBlZGl0b3IgPSAkKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICBpZiAoZWRpdG9yLnN1bW1lcm5vdGUoJ2NvZGV2aWV3LmlzQWN0aXZhdGVkJykpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc3VtbWVybm90ZSgnY29kZXZpZXcuZGVhY3RpdmF0ZScpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZWRpdG9yLnN1bW1lcm5vdGUoJ2lzRW1wdHknKSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci52YWwobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTcHJ5a2VyQWpheENhbGxiYWNrcyA9IHJlcXVpcmUoJy4vU3ByeWtlckFqYXhDYWxsYmFja3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiogaWYgYWpheCB1cmwgaXMgbnVsbCwgdGhlIGFjdGlvbiB3aWxsIGJlIGluIHRoZSBzYW1lIHBhZ2UgKi9cbiAgICBzZWxmLnVybCA9IG51bGw7XG5cbiAgICBzZWxmLmRhdGFUeXBlID0gJ2pzb24nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5ld1VybFxuICAgICAqIEByZXR1cm5zIHtTcHJ5a2VyQWpheH1cbiAgICAgKi9cbiAgICBzZWxmLnNldFVybCA9IGZ1bmN0aW9uIChuZXdVcmwpIHtcbiAgICAgICAgc2VsZi51cmwgPSBuZXdVcmw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmV3RGF0YVR5cGVcbiAgICAgKiBAcmV0dXJucyB7U3ByeWtlckFqYXh9XG4gICAgICovXG4gICAgc2VsZi5zZXREYXRhVHlwZSA9IGZ1bmN0aW9uIChuZXdEYXRhVHlwZSkge1xuICAgICAgICBzZWxmLmRhdGFUeXBlID0gbmV3RGF0YVR5cGU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFqYXhTdWJtaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2tGdW5jdGlvbiwgcGFyYW1ldGVycywgaXNHZXQpIHtcbiAgICAgICAgdmFyIGNhbGxUeXBlID0gISFpc0dldCA/ICdnZXQnIDogJ3Bvc3QnO1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICB0eXBlOiBjYWxsVHlwZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiB0aGlzLmRhdGFUeXBlLFxuICAgICAgICAgICAgZGF0YTogb3B0aW9ucyxcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFja0Z1bmN0aW9uKHJlc3BvbnNlLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrRnVuY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNwcnlrZXJBamF4Q2FsbGJhY2tzW2NhbGxiYWNrRnVuY3Rpb25dKHJlc3BvbnNlLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyogY2hhbmdlIGFjdGl2ZSAgKi9cbiAgICBzZWxmLmNoYW5nZUFjdGl2ZVN0YXR1cyA9IGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogZWxlbWVudElkLFxuICAgICAgICB9O1xuICAgICAgICBzZWxmLmFqYXhTdWJtaXQob3B0aW9ucywgJ2NoYW5nZVN0YXR1c01hcmtJbkdyaWQnKTtcbiAgICB9O1xufSkoKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiBIVE1MIHN1Y2Nlc3MgY29kZSAqL1xuICAgIHNlbGYuY29kZVN1Y2Nlc3MgPSAyMDA7XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zZTpcbiAgICAgKiA8Y29kZT5cbiAgICAgKiAge1xuICAgICAqICAgICAgXCJjb2RlXCI6IDIwMCxcbiAgICAgKiAgICAgIFwibmV3U3RhdHVzXCI6IHRydWV8ZmFsc2UsXG4gICAgICogICAgICBcImlkXCI6IDEsXG4gICAgICogICAgICBcIm1lc3NhZ2VcIjogXCJtZXNzYWdlIGlmIHNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAgKiAgfVxuICAgICAqIDwvY29kZT5cbiAgICAgKiBAcGFyYW0gYWpheFJlc3BvbnNlXG4gICAgICovXG4gICAgc2VsZi5jaGFuZ2VTdGF0dXNNYXJrSW5HcmlkID0gZnVuY3Rpb24gKGFqYXhSZXNwb25zZSkge1xuICAgICAgICBpZiAoYWpheFJlc3BvbnNlLmNvZGUgPT0gc2VsZi5jb2RlU3VjY2Vzcykge1xuICAgICAgICAgICAgJCgnI2FjdGl2ZS0nICsgYWpheFJlc3BvbnNlLmlkKS5wcm9wKCdjaGVja2VkJywgYWpheFJlc3BvbnNlLm5ld1N0YXR1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFsZXJ0ZXIuZXJyb3IoYWpheFJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iXSwibmFtZXMiOlsiU3ByeWtlckFqYXgiLCJnbG9zc2FyeUtleVVuaXF1ZUNoZWNrIiwib2JqIiwiJCIsInZhbCIsInNldFVybCIsImFqYXhTdWJtaXQiLCJ0ZXJtIiwiYWpheFJlc3BvbnNlIiwiY2hhbmdlZCIsImVhY2giLCJpIiwiaXRlbSIsImtleSIsInZhbHVlIiwibGVuZ3RoIiwidGV4dCIsImRvY3VtZW50IiwicmVhZHkiLCJibHVyIiwicmVxdWlyZSIsIm9uIiwic2VsZiIsImZpbmQiLCJpbmRleCIsImVsZW1lbnQiLCJlZGl0b3IiLCJzdW1tZXJub3RlIiwiU3ByeWtlckFqYXhDYWxsYmFja3MiLCJtb2R1bGUiLCJleHBvcnRzIiwidXJsIiwiZGF0YVR5cGUiLCJuZXdVcmwiLCJzZXREYXRhVHlwZSIsIm5ld0RhdGFUeXBlIiwib3B0aW9ucyIsImNhbGxiYWNrRnVuY3Rpb24iLCJwYXJhbWV0ZXJzIiwiaXNHZXQiLCJjYWxsVHlwZSIsImFqYXgiLCJ0eXBlIiwiZGF0YSIsImRvbmUiLCJyZXNwb25zZSIsImNoYW5nZUFjdGl2ZVN0YXR1cyIsImVsZW1lbnRJZCIsImlkIiwiY29kZVN1Y2Nlc3MiLCJjaGFuZ2VTdGF0dXNNYXJrSW5HcmlkIiwiY29kZSIsInByb3AiLCJuZXdTdGF0dXMiLCJhbGVydGVyIiwiZXJyb3IiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==