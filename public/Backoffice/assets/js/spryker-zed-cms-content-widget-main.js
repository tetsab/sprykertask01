"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-content-widget-main"],{

/***/ "./vendor/spryker/cms-content-widget/assets/Zed/js/modules/cms-content-editor.js":
/*!***************************************************************************************!*\
  !*** ./vendor/spryker/cms-content-widget/assets/Zed/js/modules/cms-content-editor.js ***!
  \***************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const editorConfig = __webpack_require__(/*! ZedGuiEditorConfiguration */ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js");

/**
 * @param {string} options
 *
 * @constructor
 */
var CmsContentEditor = function CmsContentEditor(options) {
  this.dropdownItems = [];
  $.extend(this, options);
};

/**
 * @param {string} baseConfig
 *
 * @returns array
 */
CmsContentEditor.prototype.getEditorConfig = function () {
  let baseConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  baseConfig = editorConfig.getGlobalConfig(baseConfig);
  if (!baseConfig) {
    baseConfig = editorConfig.getConfig();
  }
  const cmsContentWidgetConfig = {
    toolbar: [['insert', ['cmsContentWidget']]],
    buttons: {
      cmsContentWidget: this.createCmsContentWidgetButton(this.dropdownItems)
    }
  };
  return editorConfig.mergeConfigs(baseConfig, cmsContentWidgetConfig);
};

/**
 * @param {array} cmsContentWidgetDropDownItems
 *
 * @returns {Function}
 */
CmsContentEditor.prototype.createCmsContentWidgetButton = function (cmsContentWidgetDropDownItems) {
  return function (context) {
    var ui = $.summernote.ui;
    var button = ui.buttonGroup([ui.button({
      contents: 'content widget <i class="fa fa-caret-down" aria-hidden="true"></i>',
      data: {
        toggle: 'dropdown'
      }
    }), ui.dropdown({
      items: cmsContentWidgetDropDownItems,
      callback: function (items) {
        $(items).find('li a').on('click', function (event) {
          context.invoke('editor.insertText', ' {{ ' + $(this).html() + "(['identifier']) }} ");
          event.preventDefault();
        });
      }
    })]);
    return button.render();
  };
};
module.exports = CmsContentEditor;

/***/ }),

/***/ "./vendor/spryker/cms-content-widget/assets/Zed/js/modules/main.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/cms-content-widget/assets/Zed/js/modules/main.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



const CmsContentEditor = __webpack_require__(/*! ./cms-content-editor */ "./vendor/spryker/cms-content-widget/assets/Zed/js/modules/cms-content-editor.js");
const editor = new CmsContentEditor(window.editorConfiguration.cmsContentWidgetConfigData);
window.editorConfiguration.cms = editor.getEditorConfig('cms');

/***/ }),

/***/ "./vendor/spryker/cms-content-widget/assets/Zed/js/spryker-zed-cms-content-widget-main.entry.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/cms-content-widget/assets/Zed/js/spryker-zed-cms-content-widget-main.entry.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms-content-widget/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js":
/*!************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/editor.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



module.exports = {
  getGlobalConfig: function (configName) {
    return Boolean(configName && window.editorConfiguration && window.editorConfiguration[configName]) ? window.editorConfiguration[configName] : null;
  },
  mergeConfigs: function (baseConfig, newConfig) {
    for (var property in newConfig) {
      switch (property) {
        case 'toolbar':
          updateToolbarOptions(baseConfig, newConfig);
          break;
        case 'buttons':
          if (baseConfig.hasOwnProperty('buttons') && newConfig.hasOwnProperty('buttons')) {
            $.extend(baseConfig.buttons, newConfig.buttons);
          }
          if (!baseConfig.hasOwnProperty('buttons')) {
            baseConfig.buttons = newConfig.buttons;
          }
          break;
        case 'popover':
          var defaultPopoverOptions = $.summernote.options.popover;
          var extendedOptions = $.extend(defaultPopoverOptions, newConfig.popover);
          baseConfig.popover = extendedOptions;
          break;
        default:
          baseConfig[property] = newConfig[property];
      }
    }
    return baseConfig;
  },
  getConfig: function (content) {
    content = content || '';
    return {
      height: 300,
      maxHeight: 600,
      inputText: content,
      focus: true,
      toolbar: [['style', ['bold', 'italic', 'underline', 'clear']], ['font', ['strikethrough', 'superscript', 'subscript']], ['fontsize', ['fontsize']], ['color', ['color']], ['para', ['ul', 'ol', 'paragraph']], ['insert', ['picture', 'link', 'video', 'table', 'hr']], ['misc', ['undo', 'redo', 'codeview']], ['custom', []]]
    };
  }
};
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}
var updateToolbarOptions = function (baseConfig, newConfig) {
  newConfig.toolbar.forEach(function (newToolbarOption) {
    var existingOptionIndex = baseConfig.toolbar.findIndex(function (defaultToolbarOption) {
      return newToolbarOption[0] === defaultToolbarOption[0];
    });
    if (existingOptionIndex) {
      var newToolbarOptionsArray = newToolbarOption[1].slice(0);
      var toolbarOptionGroup = baseConfig.toolbar[existingOptionIndex];
      var toolbarOptionsArray = toolbarOptionGroup[1];
      toolbarOptionsArray.push(newToolbarOptionsArray);
      return;
    }
    baseConfig.toolbar.push(newToolbarOption);
  });
};

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms-content-widget/assets/Zed/js/spryker-zed-cms-content-widget-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jbXMtY29udGVudC13aWRnZXQtbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsTUFBTUEsWUFBWSxHQUFHQyxtQkFBTyxDQUFDLHVGQUEyQixDQUFDOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSUMsZ0JBQWdCLEdBQUcsU0FBU0EsZ0JBQWdCQSxDQUFDQyxPQUFPLEVBQUU7RUFDdEQsSUFBSSxDQUFDQyxhQUFhLEdBQUcsRUFBRTtFQUV2QkMsQ0FBQyxDQUFDQyxNQUFNLENBQUMsSUFBSSxFQUFFSCxPQUFPLENBQUM7QUFDM0IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FELGdCQUFnQixDQUFDSyxTQUFTLENBQUNDLGVBQWUsR0FBRyxZQUEyQjtFQUFBLElBQWpCQyxVQUFVLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLEVBQUU7RUFDbEVELFVBQVUsR0FBR1QsWUFBWSxDQUFDYSxlQUFlLENBQUNKLFVBQVUsQ0FBQztFQUVyRCxJQUFJLENBQUNBLFVBQVUsRUFBRTtJQUNiQSxVQUFVLEdBQUdULFlBQVksQ0FBQ2MsU0FBUyxDQUFDLENBQUM7RUFDekM7RUFFQSxNQUFNQyxzQkFBc0IsR0FBRztJQUMzQkMsT0FBTyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDM0NDLE9BQU8sRUFBRTtNQUNMQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUNDLDRCQUE0QixDQUFDLElBQUksQ0FBQ2YsYUFBYTtJQUMxRTtFQUNKLENBQUM7RUFFRCxPQUFPSixZQUFZLENBQUNvQixZQUFZLENBQUNYLFVBQVUsRUFBRU0sc0JBQXNCLENBQUM7QUFDeEUsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FiLGdCQUFnQixDQUFD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LG9CQUFvQixFQUFFO01BQ25GLE9BQU9GLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxLQUFLRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQyxDQUFDO0lBRUYsSUFBSUQsbUJBQW1CLEVBQUU7TUFDckIsSUFBSUUsc0JBQXNCLEdBQUdILGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQ3pELElBQUlDLGtCQUFrQixHQUFHcEUsVUFBVSxDQUFDTyxPQUFPLENBQUN5RCxtQkFBbUIsQ0FBQztNQUNoRSxJQUFJSyxtQkFBbUIsR0FBR0Qsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO01BRS9DQyxtQkFBbUIsQ0FBQ0MsSUFBSSxDQUFDSixzQkFBc0IsQ0FBQztNQUNoRDtJQUNKO0lBRUFsRSxVQUFVLENBQUNPLE9BQU8sQ0FBQytELElBQUksQ0FBQ1AsZ0JBQWdCLENBQUM7RUFDN0MsQ0FBQyxDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1jb250ZW50LXdpZGdldC9hc3NldHMvWmVkL2pzL21vZHVsZXMvY21zLWNvbnRlbnQtZWRpdG9yLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1jb250ZW50LXdpZGdldC9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtY29udGVudC13aWRnZXQvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jbXMtY29udGVudC13aWRnZXQtbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2VkaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVkaXRvckNvbmZpZyA9IHJlcXVpcmUoJ1plZEd1aUVkaXRvckNvbmZpZ3VyYXRpb24nKTtcblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52YXIgQ21zQ29udGVudEVkaXRvciA9IGZ1bmN0aW9uIENtc0NvbnRlbnRFZGl0b3Iob3B0aW9ucykge1xuICAgIHRoaXMuZHJvcGRvd25JdGVtcyA9IFtdO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlQ29uZmlnXG4gKlxuICogQHJldHVybnMgYXJyYXlcbiAqL1xuQ21zQ29udGVudEVkaXRvci5wcm90b3R5cGUuZ2V0RWRpdG9yQ29uZmlnID0gZnVuY3Rpb24gKGJhc2VDb25maWcgPSAnJykge1xuICAgIGJhc2VDb25maWcgPSBlZGl0b3JDb25maWcuZ2V0R2xvYmFsQ29uZmlnKGJhc2VDb25maWcpO1xuXG4gICAgaWYgKCFiYXNlQ29uZmlnKSB7XG4gICAgICAgIGJhc2VDb25maWcgPSBlZGl0b3JDb25maWcuZ2V0Q29uZmlnKCk7XG4gICAgfVxuXG4gICAgY29uc3QgY21zQ29udGVudFdpZGdldENvbmZpZyA9IHtcbiAgICAgICAgdG9vbGJhcjogW1snaW5zZXJ0JywgWydjbXNDb250ZW50V2lkZ2V0J11dXSxcbiAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgY21zQ29udGVudFdpZGdldDogdGhpcy5jcmVhdGVDbXNDb250ZW50V2lkZ2V0QnV0dG9uKHRoaXMuZHJvcGRvd25JdGVtcyksXG4gICAgICAgIH0sXG4gICAgfTtcblxuICAgIHJldHVybiBlZGl0b3JDb25maWcubWVyZ2VDb25maWdzKGJhc2VDb25maWcsIGNtc0NvbnRlbnRXaWRnZXRDb25maWcpO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2FycmF5fSBjbXNDb250ZW50V2lkZ2V0RHJvcERvd25JdGVtc1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuQ21zQ29udGVudEVkaXRvci5wcm90b3R5cGUuY3JlYXRlQ21zQ29udGVudFdpZGdldEJ1dHRvbiA9IGZ1bmN0aW9uIChjbXNDb250ZW50V2lkZ2V0RHJvcERvd25JdGVtcykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB2YXIgdWkgPSAkLnN1bW1lcm5vdGUudWk7XG5cbiAgICAgICAgdmFyIGJ1dHRvbiA9IHVpLmJ1dHRvbkdyb3VwKFtcbiAgICAgICAgICAgIHVpLmJ1dHRvbih7XG4gICAgICAgICAgICAgICAgY29udGVudHM6ICdjb250ZW50IHdpZGdldCA8aSBjbGFzcz1cImZhIGZhLWNhcmV0LWRvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+JyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZTogJ2Ryb3Bkb3duJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB1aS5kcm9wZG93bih7XG4gICAgICAgICAgICAgICAgaXRlbXM6IGNtc0NvbnRlbnRXaWRnZXREcm9wRG93bkl0ZW1zLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICAgICAgJChpdGVtcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5maW5kKCdsaSBhJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0Lmludm9rZSgnZWRpdG9yLmluc2VydFRleHQnLCAnIHt7ICcgKyAkKHRoaXMpLmh0bWwoKSArIFwiKFsnaWRlbnRpZmllciddKSB9fSBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbi5yZW5kZXIoKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDbXNDb250ZW50RWRpdG9yO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBDbXNDb250ZW50RWRpdG9yID0gcmVxdWlyZSgnLi9jbXMtY29udGVudC1lZGl0b3InKTtcblxuY29uc3QgZWRpdG9yID0gbmV3IENtc0NvbnRlbnRFZGl0b3Iod2luZG93LmVkaXRvckNvbmZpZ3VyYXRpb24uY21zQ29udGVudFdpZGdldENvbmZpZ0RhdGEpO1xud2luZG93LmVkaXRvckNvbmZpZ3VyYXRpb24uY21zID0gZWRpdG9yLmdldEVkaXRvckNvbmZpZygnY21zJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldEdsb2JhbENvbmZpZzogZnVuY3Rpb24gKGNvbmZpZ05hbWUpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oY29uZmlnTmFtZSAmJiB3aW5kb3cuZWRpdG9yQ29uZmlndXJhdGlvbiAmJiB3aW5kb3cuZWRpdG9yQ29uZmlndXJhdGlvbltjb25maWdOYW1lXSlcbiAgICAgICAgICAgID8gd2luZG93LmVkaXRvckNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9LFxuICAgIG1lcmdlQ29uZmlnczogZnVuY3Rpb24gKGJhc2VDb25maWcsIG5ld0NvbmZpZykge1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBuZXdDb25maWcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b29sYmFyJzpcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVG9vbGJhck9wdGlvbnMoYmFzZUNvbmZpZywgbmV3Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYnV0dG9ucyc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYXNlQ29uZmlnLmhhc093blByb3BlcnR5KCdidXR0b25zJykgJiYgbmV3Q29uZmlnLmhhc093blByb3BlcnR5KCdidXR0b25zJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQuZXh0ZW5kKGJhc2VDb25maWcuYnV0dG9ucywgbmV3Q29uZmlnLmJ1dHRvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghYmFzZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnYnV0dG9ucycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYXNlQ29uZmlnLmJ1dHRvbnMgPSBuZXdDb25maWcuYnV0dG9ucztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwb3BvdmVyJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmF1bHRQb3BvdmVyT3B0aW9ucyA9ICQuc3VtbWVybm90ZS5vcHRpb25zLnBvcG92ZXI7XG4gICAgICAgICAgICAgICAgICAgIHZhciBleHRlbmRlZE9wdGlvbnMgPSAkLmV4dGVuZChkZWZhdWx0UG9wb3Zlck9wdGlvbnMsIG5ld0NvbmZpZy5wb3BvdmVyKTtcblxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29uZmlnLnBvcG92ZXIgPSBleHRlbmRlZE9wdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb25maWdbcHJvcGVydHldID0gbmV3Q29uZmlnW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBiYXNlQ29uZmlnO1xuICAgIH0sXG4gICAgZ2V0Q29uZmlnOiBmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgICBjb250ZW50ID0gY29udGVudCB8fCAnJztcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICAgICAgICBtYXhIZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIGlucHV0VGV4dDogY29udGVudCxcbiAgICAgICAgICAgIGZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgdG9vbGJhcjogW1xuICAgICAgICAgICAgICAgIFsnc3R5bGUnLCBbJ2JvbGQnLCAnaXRhbGljJywgJ3VuZGVybGluZScsICdjbGVhciddXSxcbiAgICAgICAgICAgICAgICBbJ2ZvbnQnLCBbJ3N0cmlrZXRocm91Z2gnLCAnc3VwZXJzY3JpcHQnLCAnc3Vic2NyaXB0J11dLFxuICAgICAgICAgICAgICAgIFsnZm9udHNpemUnLCBbJ2ZvbnRzaXplJ11dLFxuICAgICAgICAgICAgICAgIFsnY29sb3InLCBbJ2NvbG9yJ11dLFxuICAgICAgICAgICAgICAgIFsncGFyYScsIFsndWwnLCAnb2wnLCAncGFyYWdyYXBoJ11dLFxuICAgICAgICAgICAgICAgIFsnaW5zZXJ0JywgWydwaWN0dXJlJywgJ2xpbmsnLCAndmlkZW8nLCAndGFibGUnLCAnaHInXV0sXG4gICAgICAgICAgICAgICAgWydtaXNjJywgWyd1bmRvJywgJ3JlZG8nLCAnY29kZXZpZXcnXV0sXG4gICAgICAgICAgICAgICAgWydjdXN0b20nLCBbXV0sXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgIH0sXG59O1xuXG5pZiAoIUFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZmluZEluZGV4ID0gZnVuY3Rpb24gKHByZWRpY2F0ZSkge1xuICAgICAgICBpZiAodGhpcyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCBjYWxsZWQgb24gbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncHJlZGljYXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ID0gT2JqZWN0KHRoaXMpO1xuICAgICAgICB2YXIgbGVuZ3RoID0gbGlzdC5sZW5ndGggPj4+IDA7XG4gICAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0W2ldO1xuICAgICAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xufVxuXG52YXIgdXBkYXRlVG9vbGJhck9wdGlvbnMgPSBmdW5jdGlvbiAoYmFzZUNvbmZpZywgbmV3Q29uZmlnKSB7XG4gICAgbmV3Q29uZmlnLnRvb2xiYXIuZm9yRWFjaChmdW5jdGlvbiAobmV3VG9vbGJhck9wdGlvbikge1xuICAgICAgICB2YXIgZXhpc3RpbmdPcHRpb25JbmRleCA9IGJhc2VDb25maWcudG9vbGJhci5maW5kSW5kZXgoZnVuY3Rpb24gKGRlZmF1bHRUb29sYmFyT3B0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3VG9vbGJhck9wdGlvblswXSA9PT0gZGVmYXVsdFRvb2xiYXJPcHRpb25bMF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChleGlzdGluZ09wdGlvbkluZGV4KSB7XG4gICAgICAgICAgICB2YXIgbmV3VG9vbGJhck9wdGlvbnNBcnJheSA9IG5ld1Rvb2xiYXJPcHRpb25bMV0uc2xpY2UoMCk7XG4gICAgICAgICAgICB2YXIgdG9vbGJhck9wdGlvbkdyb3VwID0gYmFzZUNvbmZpZy50b29sYmFyW2V4aXN0aW5nT3B0aW9uSW5kZXhdO1xuICAgICAgICAgICAgdmFyIHRvb2xiYXJPcHRpb25zQXJyYXkgPSB0b29sYmFyT3B0aW9uR3JvdXBbMV07XG5cbiAgICAgICAgICAgIHRvb2xiYXJPcHRpb25zQXJyYXkucHVzaChuZXdUb29sYmFyT3B0aW9uc0FycmF5KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJhc2VDb25maWcudG9vbGJhci5wdXNoKG5ld1Rvb2xiYXJPcHRpb24pO1xuICAgIH0pO1xufTtcbiJdLCJuYW1lcyI6WyJlZGl0b3JDb25maWciLCJyZXF1aXJlIiwiQ21zQ29udGVudEVkaXRvciIsIm9wdGlvbnMiLCJkcm9wZG93bkl0ZW1zIiwiJCIsImV4dGVuZCIsInByb3RvdHlwZSIsImdldEVkaXRvckNvbmZpZyIsImJhc2VDb25maWciLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJnZXRHbG9iYWxDb25maWciLCJnZXRDb25maWciLCJjbXNDb250ZW50V2lkZ2V0Q29uZmlnIiwidG9vbGJhciIsImJ1dHRvbnMiLCJjbXNDb250ZW50V2lkZ2V0IiwiY3JlYXRlQ21zQ29udGVudFdpZGdldEJ1dHRvbiIsIm1lcmdlQ29uZmlncyIsImNtc0NvbnRlbnRXaWRnZXREcm9wRG93bkl0ZW1zIiwiY29udGV4dCIsInVpIiwic3VtbWVybm90ZSIsImJ1dHRvbiIsImJ1dHRvbkdyb3VwIiwiY29udGVudHMiLCJkYXRhIiwidG9nZ2xlIiwiZHJvcGRvd24iLCJpdGVtcyIsImNhbGxiYWNrIiwiZmluZCIsIm9uIiwiZXZlbnQiLCJpbnZva2UiLCJodG1sIiwicHJldmVudERlZmF1bHQiLCJyZW5kZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwiZWRpdG9yIiwid2luZG93IiwiZWRpdG9yQ29uZmlndXJhdGlvbiIsImNtc0NvbnRlbnRXaWRnZXRDb25maWdEYXRhIiwiY21zIiwiY29uZmlnTmFtZSIsIkJvb2xlYW4iLCJuZXdDb25maWciLCJwcm9wZXJ0eSIsInVwZGF0ZVRvb2xiYXJPcHRpb25zIiwiaGFzT3duUHJvcGVydHkiLCJkZWZhdWx0UG9wb3Zlck9wdGlvbnMiLCJwb3BvdmVyIiwiZXh0ZW5kZWRPcHRpb25zIiwiY29udGVudCIsImhlaWdodCIsIm1heEhlaWdodCIsImlucHV0VGV4dCIsImZvY3VzIiwiQXJyYXkiLCJmaW5kSW5kZXgiLCJwcmVkaWNhdGUiLCJUeXBlRXJyb3IiLCJsaXN0IiwiT2JqZWN0IiwidGhpc0FyZyIsInZhbHVlIiwiaSIsImNhbGwiLCJmb3JFYWNoIiwibmV3VG9vbGJhck9wdGlvbiIsImV4aXN0aW5nT3B0aW9uSW5kZXgiLCJkZWZhdWx0VG9vbGJhck9wdGlvbiIsIm5ld1Rvb2xiYXJPcHRpb25zQXJyYXkiLCJzbGljZSIsInRvb2xiYXJPcHRpb25Hcm91cCIsInRvb2xiYXJPcHRpb25zQXJyYXkiLCJwdXNoIl0sInNvdXJjZVJvb3QiOiIifQ==