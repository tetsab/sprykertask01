"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-gui-main"],{

/***/ "./vendor/spryker/cms-gui/assets/Zed/js/modules/cms-glossary-autocomplete.js":
/*!***********************************************************************************!*\
  !*** ./vendor/spryker/cms-gui/assets/Zed/js/modules/cms-glossary-autocomplete.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var summernote = __webpack_require__(/*! ZedGuiEditorConfiguration */ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js");
const GLOSSARY_SELECT_MARGIN_WIDTH = 25;
function CmsGlossaryAutocomplete(options) {
  var self = this;
  this.xhr = null;
  this.keyList = null;
  this.keyContainer = null;
  this.itemContainer = null;
  this.autocompleteElement = options.autocompleteElement;
  this.placeholderTranslationContainer = $(this.autocompleteElement.parent().parent());
  this.autocompleteUrl = '/cms-gui/create-glossary/search?{0}={1}';
  this.loadingSpinner = $(this.placeholderTranslationContainer.find('.loading'));
  this.keyInput = this.placeholderTranslationContainer.find("input[id$='translationKey']");
  this.listElement = '<div id="foundKeyListContainer" class="key-container"><select id="foundKeyList" size="10" class="key-list"></select></div>';
  this.addKeySearchEvent(this.autocompleteElement);
  $(document).on('click', function (e) {
    if (self.keyContainer !== null && !$(e.target).is('option')) {
      self.keyContainer.hide();
    }
    if (self.itemContainer !== null && !$(e.target).is('option')) {
      self.itemContainer.hide();
    }
  });
}
CmsGlossaryAutocomplete.prototype.showAutoComplete = function (placeholderTranslationContainer, searchType) {
  var keyListCanvas = $(this.placeholderTranslationContainer.find('.keyListCanvas'));
  keyListCanvas.empty();
  keyListCanvas.append(this.listElement);
  this.keyList = $(keyListCanvas.find('#foundKeyList'));
  this.keyContainer = $(keyListCanvas.find('#foundKeyListContainer'));
  this.keyList.find('option').remove();
  this.loadingSpinner.show();
  self.xhr = $.ajax({
    type: 'GET',
    url: this.buildAutocompleteUrl(searchType, this.keyInput.val()),
    context: this,
    success: this.handleAjaxResponse
  });
};
CmsGlossaryAutocomplete.prototype.handleAjaxResponse = function (response) {
  var self = this;
  this.loadingSpinner.hide();
  $.each(response, function (i, item) {
    self.keyList.append($('<option>', {
      value: i,
      text: item.key
    }));
    self.keyContainer.css({
      width: self.keyInput.width() + GLOSSARY_SELECT_MARGIN_WIDTH
    });
    self.keyContainer.show();
  });
  self.keyList.css({
    height: response.length * 20
  });
  self.keyList.on('change', function () {
    self.setSelectedTranslationValueFromResponse(response, this);
  });
  self.keyList.on('keydown', function (e) {
    var key = e.keyCode;
    if (key == 13 || key == 9) {
      self.keyList.blur();
      return false;
    }
  });
  self.keyList.on('blur', function () {
    self.keyInput.val(response[this.value].key);
    self.keyContainer.hide();
    self.keyInput.focus();
    return false;
  });
};
CmsGlossaryAutocomplete.prototype.setSelectedTranslationValueFromResponse = function (response, selectChange) {
  var self = this;
  this.keyInput.val(response[selectChange.value].key);
  var translations = response[selectChange.value].translations;
  $.each(translations, function (idLocale, translation) {
    var translationElements = self.placeholderTranslationContainer.find("textarea[id$='translation']");
    $.each(translationElements, function (translationElementIndex, translationElement) {
      var translationIdLocale = $(translationElement).parent().parent().find("input[id$='fkLocale']").val();
      if (translationIdLocale == idLocale) {
        $(translationElement).summernote('reset');
        $(translationElement).summernote('pasteHTML', translation.value);
      }
    });
  });
};
CmsGlossaryAutocomplete.prototype.buildAutocompleteUrl = function (searchType, value) {
  var searchTypeGlossaryKey = 2;
  var searchTypeFullText = 3;
  if (searchType == searchTypeGlossaryKey) {
    return this.autocompleteUrl.formatString('key', value);
  } else if (searchType == searchTypeFullText) {
    return this.autocompleteUrl.formatString('value', value);
  }
};
CmsGlossaryAutocomplete.prototype.addKeySearchEvent = function (autocompleteElement) {
  var searchOption = $(this.placeholderTranslationContainer.find("select[id$='searchOption']"));
  var delay = function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  }();
  var self = this;
  autocompleteElement.on('input', function () {
    if ($(this).val().length > 3) {
      delay(function () {
        if (self.xhr && self.xhr.readystate != 4) {
          self.xhr.abort();
        }
        if (searchOption.val() == 2 || searchOption.val() == 3) {
          self.showAutoComplete(self.placeholderTranslationContainer, searchOption.val());
        }
      }, 500);
    }
  });
  if (searchOption.val() == 0 && autocompleteElement.val() == '') {
    autocompleteElement.attr('readonly', 'readonly');
  } else {
    searchOption.val(1);
  }
  searchOption.on('change', function () {
    if (this.value == 0) {
      autocompleteElement.attr('readonly', 'readonly');
    } else {
      autocompleteElement.removeAttr('readonly');
    }
  });
  autocompleteElement.on('keyup', function (e) {
    var key = e.keyCode;
    if (key == 40) {
      self.keyList.first().focus();
      self.keyList.val(0).change();
    }
  });
};
String.prototype.formatString = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, index) {
    return args[index];
  });
};
module.exports = CmsGlossaryAutocomplete;

/***/ }),

/***/ "./vendor/spryker/cms-gui/assets/Zed/js/modules/main.js":
/*!**************************************************************!*\
  !*** ./vendor/spryker/cms-gui/assets/Zed/js/modules/main.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var CmsGlossaryAutocomplete = __webpack_require__(/*! ./cms-glossary-autocomplete */ "./vendor/spryker/cms-gui/assets/Zed/js/modules/cms-glossary-autocomplete.js");
__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/cms-gui/assets/Zed/sass/main.scss");
__webpack_require__(/*! ../../img/cms-loader.gif */ "./vendor/spryker/cms-gui/assets/Zed/img/cms-loader.gif");
$(document).ready(function () {
  var validFrom = $('#cms_page_validFrom');
  var validTo = $('#cms_page_validTo');
  validFrom.datepicker({
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    maxDate: validTo.val(),
    defaultData: 0,
    onClose: function (selectedDate) {
      validTo.datepicker('option', 'minDate', selectedDate);
    }
  });
  validTo.datepicker({
    defaultData: 0,
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    numberOfMonths: 3,
    minDate: validFrom.val(),
    onClose: function (selectedDate) {
      validFrom.datepicker('option', 'maxDate', selectedDate);
    }
  });
  $("input[id$='translationKey']").each(function (index, element) {
    new CmsGlossaryAutocomplete({
      autocompleteElement: $(element)
    });
  });
  var originalText = $('#version-diff .has-original .original');
  originalText.each(function (index, element) {
    var targets = $('#version-diff .has-diff .original');
    if (typeof targets[index] !== 'undefined') {
      var targetsDiff = $('#version-diff .has-diff .diff');
      targets[index].innerText = element.innerText;
      if (element.innerText !== targetsDiff[index].innerText) {
        $(targetsDiff[index]).css('background-color', '#fbd6c4');
      }
    }
  });
  $('[name=cms_glossary]').on('submit', function () {
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

/***/ "./vendor/spryker/cms-gui/assets/Zed/js/spryker-zed-cms-gui-main.entry.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/cms-gui/assets/Zed/js/spryker-zed-cms-gui-main.entry.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms-gui/assets/Zed/js/modules/main.js");

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

/***/ }),

/***/ "./vendor/spryker/cms-gui/assets/Zed/sass/main.scss":
/*!**********************************************************!*\
  !*** ./vendor/spryker/cms-gui/assets/Zed/sass/main.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./vendor/spryker/cms-gui/assets/Zed/img/cms-loader.gif":
/*!**************************************************************!*\
  !*** ./vendor/spryker/cms-gui/assets/Zed/img/cms-loader.gif ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/cms-loader.gif";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms-gui/assets/Zed/js/spryker-zed-cms-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNsRCxJQUFJQyxtQkFBbUIsR0FBR3pCLFVBQVUsQ0FBQ2MsT0FBTyxDQUFDRSxTQUFTLENBQUMsVUFBVVUsb0JBQW9CLEVBQUU7TUFDbkYsT0FBT0YsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEtBQUtFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUM7SUFFRixJQUFJRCxtQkFBbUIsRUFBRTtNQUNyQixJQUFJRSxzQkFBc0IsR0FBR0gsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUNJLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDekQsSUFBSUMsa0JBQWtCLEdBQUc3QixVQUFVLENBQUNjLE9BQU8sQ0FBQ1csbUJBQW1CLENBQUM7TUFDaEUsSUFBSUssbUJBQW1CLEdBQUdELGtCQUFrQixDQUFDLENBQUMsQ0FBQztNQUUvQ0MsbUJBQW1CLENBQUNDLElBQUksQ0FBQ0osc0JBQXNCLENBQUM7TUFDaEQ7SUFDSjtJQUVBM0IsVUFBVSxDQUFDYyxPQUFPLENBQUNpQixJQUFJLENBQUNQLGdCQUFnQixDQUFDO0VBQzdDLENBQUMsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7Ozs7O0FDdEdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvY21zLWdsb3NzYXJ5LWF1dG9jb21wbGV0ZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jbXMtZ3VpLW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zLWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzP2NiYmEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VtbWVybm90ZSA9IHJlcXVpcmUoJ1plZEd1aUVkaXRvckNvbmZpZ3VyYXRpb24nKTtcblxuY29uc3QgR0xPU1NBUllfU0VMRUNUX01BUkdJTl9XSURUSCA9IDI1O1xuXG5mdW5jdGlvbiBDbXNHbG9zc2FyeUF1dG9jb21wbGV0ZShvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy54aHIgPSBudWxsO1xuICAgIHRoaXMua2V5TGlzdCA9IG51bGw7XG4gICAgdGhpcy5rZXlDb250YWluZXIgPSBudWxsO1xuICAgIHRoaXMuaXRlbUNvbnRhaW5lciA9IG51bGw7XG5cbiAgICB0aGlzLmF1dG9jb21wbGV0ZUVsZW1lbnQgPSBvcHRpb25zLmF1dG9jb21wbGV0ZUVsZW1lbnQ7XG4gICAgdGhpcy5wbGFjZWhvbGRlclRyYW5zbGF0aW9uQ29udGFpbmVyID0gJCh0aGlzLmF1dG9jb21wbGV0ZUVsZW1lbnQucGFyZW50KCkucGFyZW50KCkpO1xuICAgIHRoaXMuYXV0b2NvbXBsZXRlVXJsID0gJy9jbXMtZ3VpL2NyZWF0ZS1nbG9zc2FyeS9zZWFyY2g/ezB9PXsxfSc7XG4gICAgdGhpcy5sb2FkaW5nU3Bpbm5lciA9ICQodGhpcy5wbGFjZWhvbGRlclRyYW5zbGF0aW9uQ29udGFpbmVyLmZpbmQoJy5sb2FkaW5nJykpO1xuICAgIHRoaXMua2V5SW5wdXQgPSB0aGlzLnBsYWNlaG9sZGVyVHJhbnNsYXRpb25Db250YWluZXIuZmluZChcImlucHV0W2lkJD0ndHJhbnNsYXRpb25LZXknXVwiKTtcbiAgICB0aGlzLmxpc3RFbGVtZW50ID1cbiAgICAgICAgJzxkaXYgaWQ9XCJmb3VuZEtleUxpc3RDb250YWluZXJcIiBjbGFzcz1cImtleS1jb250YWluZXJcIj48c2VsZWN0IGlkPVwiZm91bmRLZXlMaXN0XCIgc2l6ZT1cIjEwXCIgY2xhc3M9XCJrZXktbGlzdFwiPjwvc2VsZWN0PjwvZGl2Pic7XG5cbiAgICB0aGlzLmFkZEtleVNlYXJjaEV2ZW50KHRoaXMuYXV0b2NvbXBsZXRlRWxlbWVudCk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoc2VsZi5rZXlDb250YWluZXIgIT09IG51bGwgJiYgISQoZS50YXJnZXQpLmlzKCdvcHRpb24nKSkge1xuICAgICAgICAgICAgc2VsZi5rZXlDb250YWluZXIuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLml0ZW1Db250YWluZXIgIT09IG51bGwgJiYgISQoZS50YXJnZXQpLmlzKCdvcHRpb24nKSkge1xuICAgICAgICAgICAgc2VsZi5pdGVtQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5DbXNHbG9zc2FyeUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuc2hvd0F1dG9Db21wbGV0ZSA9IGZ1bmN0aW9uIChwbGFjZWhvbGRlclRyYW5zbGF0aW9uQ29udGFpbmVyLCBzZWFyY2hUeXBlKSB7XG4gICAgdmFyIGtleUxpc3RDYW52YXMgPSAkKHRoaXMucGxhY2Vob2xkZXJUcmFuc2xhdGlvbkNvbnRhaW5lci5maW5kKCcua2V5TGlzdENhbnZhcycpKTtcbiAgICBrZXlMaXN0Q2FudmFzLmVtcHR5KCk7XG4gICAga2V5TGlzdENhbnZhcy5hcHBlbmQodGhpcy5saXN0RWxlbWVudCk7XG5cbiAgICB0aGlzLmtleUxpc3QgPSAkKGtleUxpc3RDYW52YXMuZmluZCgnI2ZvdW5kS2V5TGlzdCcpKTtcbiAgICB0aGlzLmtleUNvbnRhaW5lciA9ICQoa2V5TGlzdENhbnZhcy5maW5kKCcjZm91bmRLZXlMaXN0Q29udGFpbmVyJykpO1xuXG4gICAgdGhpcy5rZXlMaXN0LmZpbmQoJ29wdGlvbicpLnJlbW92ZSgpO1xuICAgIHRoaXMubG9hZGluZ1NwaW5uZXIuc2hvdygpO1xuXG4gICAgc2VsZi54aHIgPSAkLmFqYXgoe1xuICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgdXJsOiB0aGlzLmJ1aWxkQXV0b2NvbXBsZXRlVXJsKHNlYXJjaFR5cGUsIHRoaXMua2V5SW5wdXQudmFsKCkpLFxuICAgICAgICBjb250ZXh0OiB0aGlzLFxuICAgICAgICBzdWNjZXNzOiB0aGlzLmhhbmRsZUFqYXhSZXNwb25zZSxcbiAgICB9KTtcbn07XG5cbkNtc0dsb3NzYXJ5QXV0b2NvbXBsZXRlLnByb3RvdHlwZS5oYW5kbGVBamF4UmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5sb2FkaW5nU3Bpbm5lci5oaWRlKCk7XG5cbiAgICAkLmVhY2gocmVzcG9uc2UsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgIHNlbGYua2V5TGlzdC5hcHBlbmQoXG4gICAgICAgICAgICAkKCc8b3B0aW9uPicsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogaSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLmtleSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIHNlbGYua2V5Q29udGFpbmVyLmNzcyh7IHdpZHRoOiBzZWxmLmtleUlucHV0LndpZHRoKCkgKyBHTE9TU0FSWV9TRUxFQ1RfTUFSR0lOX1dJRFRIIH0pO1xuICAgICAgICBzZWxmLmtleUNvbnRhaW5lci5zaG93KCk7XG4gICAgfSk7XG5cbiAgICBzZWxmLmtleUxpc3QuY3NzKHsgaGVpZ2h0OiByZXNwb25zZS5sZW5ndGggKiAyMCB9KTtcbiAgICBzZWxmLmtleUxpc3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZFRyYW5zbGF0aW9uVmFsdWVGcm9tUmVzcG9uc2UocmVzcG9uc2UsIHRoaXMpO1xuICAgIH0pO1xuXG4gICAgc2VsZi5rZXlMaXN0Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IGUua2V5Q29kZTtcbiAgICAgICAgaWYgKGtleSA9PSAxMyB8fCBrZXkgPT0gOSkge1xuICAgICAgICAgICAgc2VsZi5rZXlMaXN0LmJsdXIoKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VsZi5rZXlMaXN0Lm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLmtleUlucHV0LnZhbChyZXNwb25zZVt0aGlzLnZhbHVlXS5rZXkpO1xuICAgICAgICBzZWxmLmtleUNvbnRhaW5lci5oaWRlKCk7XG4gICAgICAgIHNlbGYua2V5SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcblxuQ21zR2xvc3NhcnlBdXRvY29tcGxldGUucHJvdG90eXBlLnNldFNlbGVjdGVkVHJhbnNsYXRpb25WYWx1ZUZyb21SZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSwgc2VsZWN0Q2hhbmdlKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMua2V5SW5wdXQudmFsKHJlc3BvbnNlW3NlbGVjdENoYW5nZS52YWx1ZV0ua2V5KTtcbiAgICB2YXIgdHJhbnNsYXRpb25zID0gcmVzcG9uc2Vbc2VsZWN0Q2hhbmdlLnZhbHVlXS50cmFuc2xhdGlvbnM7XG4gICAgJC5lYWNoKHRyYW5zbGF0aW9ucywgZnVuY3Rpb24gKGlkTG9jYWxlLCB0cmFuc2xhdGlvbikge1xuICAgICAgICB2YXIgdHJhbnNsYXRpb25FbGVtZW50cyA9IHNlbGYucGxhY2Vob2xkZXJUcmFuc2xhdGlvbkNvbnRhaW5lci5maW5kKFwidGV4dGFyZWFbaWQkPSd0cmFuc2xhdGlvbiddXCIpO1xuICAgICAgICAkLmVhY2godHJhbnNsYXRpb25FbGVtZW50cywgZnVuY3Rpb24gKHRyYW5zbGF0aW9uRWxlbWVudEluZGV4LCB0cmFuc2xhdGlvbkVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGlvbklkTG9jYWxlID0gJCh0cmFuc2xhdGlvbkVsZW1lbnQpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCJpbnB1dFtpZCQ9J2ZrTG9jYWxlJ11cIikudmFsKCk7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRpb25JZExvY2FsZSA9PSBpZExvY2FsZSkge1xuICAgICAgICAgICAgICAgICQodHJhbnNsYXRpb25FbGVtZW50KS5zdW1tZXJub3RlKCdyZXNldCcpO1xuICAgICAgICAgICAgICAgICQodHJhbnNsYXRpb25FbGVtZW50KS5zdW1tZXJub3RlKCdwYXN0ZUhUTUwnLCB0cmFuc2xhdGlvbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxuQ21zR2xvc3NhcnlBdXRvY29tcGxldGUucHJvdG90eXBlLmJ1aWxkQXV0b2NvbXBsZXRlVXJsID0gZnVuY3Rpb24gKHNlYXJjaFR5cGUsIHZhbHVlKSB7XG4gICAgdmFyIHNlYXJjaFR5cGVHbG9zc2FyeUtleSA9IDI7XG4gICAgdmFyIHNlYXJjaFR5cGVGdWxsVGV4dCA9IDM7XG5cbiAgICBpZiAoc2VhcmNoVHlwZSA9PSBzZWFyY2hUeXBlR2xvc3NhcnlLZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlVXJsLmZvcm1hdFN0cmluZygna2V5JywgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoVHlwZSA9PSBzZWFyY2hUeXBlRnVsbFRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0b2NvbXBsZXRlVXJsLmZvcm1hdFN0cmluZygndmFsdWUnLCB2YWx1ZSk7XG4gICAgfVxufTtcblxuQ21zR2xvc3NhcnlBdXRvY29tcGxldGUucHJvdG90eXBlLmFkZEtleVNlYXJjaEV2ZW50ID0gZnVuY3Rpb24gKGF1dG9jb21wbGV0ZUVsZW1lbnQpIHtcbiAgICB2YXIgc2VhcmNoT3B0aW9uID0gJCh0aGlzLnBsYWNlaG9sZGVyVHJhbnNsYXRpb25Db250YWluZXIuZmluZChcInNlbGVjdFtpZCQ9J3NlYXJjaE9wdGlvbiddXCIpKTtcblxuICAgIHZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0aW1lciA9IDA7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGNhbGxiYWNrLCBtcyk7XG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBhdXRvY29tcGxldGVFbGVtZW50Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgZGVsYXkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnhociAmJiBzZWxmLnhoci5yZWFkeXN0YXRlICE9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi54aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaE9wdGlvbi52YWwoKSA9PSAyIHx8IHNlYXJjaE9wdGlvbi52YWwoKSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0F1dG9Db21wbGV0ZShzZWxmLnBsYWNlaG9sZGVyVHJhbnNsYXRpb25Db250YWluZXIsIHNlYXJjaE9wdGlvbi52YWwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHNlYXJjaE9wdGlvbi52YWwoKSA9PSAwICYmIGF1dG9jb21wbGV0ZUVsZW1lbnQudmFsKCkgPT0gJycpIHtcbiAgICAgICAgYXV0b2NvbXBsZXRlRWxlbWVudC5hdHRyKCdyZWFkb25seScsICdyZWFkb25seScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlYXJjaE9wdGlvbi52YWwoMSk7XG4gICAgfVxuXG4gICAgc2VhcmNoT3B0aW9uLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09IDApIHtcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZUVsZW1lbnQuYXR0cigncmVhZG9ubHknLCAncmVhZG9ubHknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF1dG9jb21wbGV0ZUVsZW1lbnQucmVtb3ZlQXR0cigncmVhZG9ubHknKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgYXV0b2NvbXBsZXRlRWxlbWVudC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIga2V5ID0gZS5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChrZXkgPT0gNDApIHtcbiAgICAgICAgICAgIHNlbGYua2V5TGlzdC5maXJzdCgpLmZvY3VzKCk7XG4gICAgICAgICAgICBzZWxmLmtleUxpc3QudmFsKDApLmNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC97KFxcZCspfS9nLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBhcmdzW2luZGV4XTtcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ21zR2xvc3NhcnlBdXRvY29tcGxldGU7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBDbXNHbG9zc2FyeUF1dG9jb21wbGV0ZSA9IHJlcXVpcmUoJy4vY21zLWdsb3NzYXJ5LWF1dG9jb21wbGV0ZScpO1xucmVxdWlyZSgnLi4vLi4vc2Fzcy9tYWluLnNjc3MnKTtcbnJlcXVpcmUoJy4uLy4uL2ltZy9jbXMtbG9hZGVyLmdpZicpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbGlkRnJvbSA9ICQoJyNjbXNfcGFnZV92YWxpZEZyb20nKTtcbiAgICB2YXIgdmFsaWRUbyA9ICQoJyNjbXNfcGFnZV92YWxpZFRvJyk7XG5cbiAgICB2YWxpZEZyb20uZGF0ZXBpY2tlcih7XG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxuICAgICAgICBudW1iZXJPZk1vbnRoczogMyxcbiAgICAgICAgbWF4RGF0ZTogdmFsaWRUby52YWwoKSxcbiAgICAgICAgZGVmYXVsdERhdGE6IDAsXG4gICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uIChzZWxlY3RlZERhdGUpIHtcbiAgICAgICAgICAgIHZhbGlkVG8uZGF0ZXBpY2tlcignb3B0aW9uJywgJ21pbkRhdGUnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgdmFsaWRUby5kYXRlcGlja2VyKHtcbiAgICAgICAgZGVmYXVsdERhdGE6IDAsXG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXG4gICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxuICAgICAgICBudW1iZXJPZk1vbnRoczogMyxcbiAgICAgICAgbWluRGF0ZTogdmFsaWRGcm9tLnZhbCgpLFxuICAgICAgICBvbkNsb3NlOiBmdW5jdGlvbiAoc2VsZWN0ZWREYXRlKSB7XG4gICAgICAgICAgICB2YWxpZEZyb20uZGF0ZXBpY2tlcignb3B0aW9uJywgJ21heERhdGUnLCBzZWxlY3RlZERhdGUpO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgJChcImlucHV0W2lkJD0ndHJhbnNsYXRpb25LZXknXVwiKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICBuZXcgQ21zR2xvc3NhcnlBdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgYXV0b2NvbXBsZXRlRWxlbWVudDogJChlbGVtZW50KSxcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB2YXIgb3JpZ2luYWxUZXh0ID0gJCgnI3ZlcnNpb24tZGlmZiAuaGFzLW9yaWdpbmFsIC5vcmlnaW5hbCcpO1xuICAgIG9yaWdpbmFsVGV4dC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWxlbWVudCkge1xuICAgICAgICB2YXIgdGFyZ2V0cyA9ICQoJyN2ZXJzaW9uLWRpZmYgLmhhcy1kaWZmIC5vcmlnaW5hbCcpO1xuICAgICAgICBpZiAodHlwZW9mIHRhcmdldHNbaW5kZXhdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdmFyIHRhcmdldHNEaWZmID0gJCgnI3ZlcnNpb24tZGlmZiAuaGFzLWRpZmYgLmRpZmYnKTtcbiAgICAgICAgICAgIHRhcmdldHNbaW5kZXhdLmlubmVyVGV4dCA9IGVsZW1lbnQuaW5uZXJUZXh0O1xuXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5pbm5lclRleHQgIT09IHRhcmdldHNEaWZmW2luZGV4XS5pbm5lclRleHQpIHtcbiAgICAgICAgICAgICAgICAkKHRhcmdldHNEaWZmW2luZGV4XSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNmYmQ2YzQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnW25hbWU9Y21zX2dsb3NzYXJ5XScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcblxuICAgICAgICBzZWxmLmZpbmQoJy5odG1sLWVkaXRvcicpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgZWRpdG9yID0gJChlbGVtZW50KTtcbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc3VtbWVybm90ZSgnY29kZXZpZXcuaXNBY3RpdmF0ZWQnKSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zdW1tZXJub3RlKCdjb2Rldmlldy5kZWFjdGl2YXRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc3VtbWVybm90ZSgnaXNFbXB0eScpKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnZhbChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0R2xvYmFsQ29uZmlnOiBmdW5jdGlvbiAoY29uZmlnTmFtZSkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihjb25maWdOYW1lICYmIHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uICYmIHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdKVxuICAgICAgICAgICAgPyB3aW5kb3cuZWRpdG9yQ29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgbWVyZ2VDb25maWdzOiBmdW5jdGlvbiAoYmFzZUNvbmZpZywgbmV3Q29uZmlnKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIG5ld0NvbmZpZykge1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Rvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUb29sYmFyT3B0aW9ucyhiYXNlQ29uZmlnLCBuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdidXR0b25zJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VDb25maWcuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSAmJiBuZXdDb25maWcuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoYmFzZUNvbmZpZy5idXR0b25zLCBuZXdDb25maWcuYnV0dG9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXNlQ29uZmlnLmhhc093blByb3BlcnR5KCdidXR0b25zJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VDb25maWcuYnV0dG9ucyA9IG5ld0NvbmZpZy5idXR0b25zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BvcG92ZXInOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFBvcG92ZXJPcHRpb25zID0gJC5zdW1tZXJub3RlLm9wdGlvbnMucG9wb3ZlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dGVuZGVkT3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRQb3BvdmVyT3B0aW9ucywgbmV3Q29uZmlnLnBvcG92ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb25maWcucG9wb3ZlciA9IGV4dGVuZGVkT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbmZpZ1twcm9wZXJ0eV0gPSBuZXdDb25maWdbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhc2VDb25maWc7XG4gICAgfSxcbiAgICBnZXRDb25maWc6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50IHx8ICcnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgIG1heEhlaWdodDogNjAwLFxuICAgICAgICAgICAgaW5wdXRUZXh0OiBjb250ZW50LFxuICAgICAgICAgICAgZm9jdXM6IHRydWUsXG4gICAgICAgICAgICB0b29sYmFyOiBbXG4gICAgICAgICAgICAgICAgWydzdHlsZScsIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ2NsZWFyJ11dLFxuICAgICAgICAgICAgICAgIFsnZm9udCcsIFsnc3RyaWtldGhyb3VnaCcsICdzdXBlcnNjcmlwdCcsICdzdWJzY3JpcHQnXV0sXG4gICAgICAgICAgICAgICAgWydmb250c2l6ZScsIFsnZm9udHNpemUnXV0sXG4gICAgICAgICAgICAgICAgWydjb2xvcicsIFsnY29sb3InXV0sXG4gICAgICAgICAgICAgICAgWydwYXJhJywgWyd1bCcsICdvbCcsICdwYXJhZ3JhcGgnXV0sXG4gICAgICAgICAgICAgICAgWydpbnNlcnQnLCBbJ3BpY3R1cmUnLCAnbGluaycsICd2aWRlbycsICd0YWJsZScsICdociddXSxcbiAgICAgICAgICAgICAgICBbJ21pc2MnLCBbJ3VuZG8nLCAncmVkbycsICdjb2RldmlldyddXSxcbiAgICAgICAgICAgICAgICBbJ2N1c3RvbScsIFtdXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXggPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG59XG5cbnZhciB1cGRhdGVUb29sYmFyT3B0aW9ucyA9IGZ1bmN0aW9uIChiYXNlQ29uZmlnLCBuZXdDb25maWcpIHtcbiAgICBuZXdDb25maWcudG9vbGJhci5mb3JFYWNoKGZ1bmN0aW9uIChuZXdUb29sYmFyT3B0aW9uKSB7XG4gICAgICAgIHZhciBleGlzdGluZ09wdGlvbkluZGV4ID0gYmFzZUNvbmZpZy50b29sYmFyLmZpbmRJbmRleChmdW5jdGlvbiAoZGVmYXVsdFRvb2xiYXJPcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdUb29sYmFyT3B0aW9uWzBdID09PSBkZWZhdWx0VG9vbGJhck9wdGlvblswXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nT3B0aW9uSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBuZXdUb29sYmFyT3B0aW9uc0FycmF5ID0gbmV3VG9vbGJhck9wdGlvblsxXS5zbGljZSgwKTtcbiAgICAgICAgICAgIHZhciB0b29sYmFyT3B0aW9uR3JvdXAgPSBiYXNlQ29uZmlnLnRvb2xiYXJbZXhpc3RpbmdPcHRpb25JbmRleF07XG4gICAgICAgICAgICB2YXIgdG9vbGJhck9wdGlvbnNBcnJheSA9IHRvb2xiYXJPcHRpb25Hcm91cFsxXTtcblxuICAgICAgICAgICAgdG9vbGJhck9wdGlvbnNBcnJheS5wdXNoKG5ld1Rvb2xiYXJPcHRpb25zQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFzZUNvbmZpZy50b29sYmFyLnB1c2gobmV3VG9vbGJhck9wdGlvbik7XG4gICAgfSk7XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInN1bW1lcm5vdGUiLCJyZXF1aXJlIiwiR0xPU1NBUllfU0VMRUNUX01BUkdJTl9XSURUSCIsIkNtc0dsb3NzYXJ5QXV0b2NvbXBsZXRlIiwib3B0aW9ucyIsInNlbGYiLCJ4aHIiLCJrZXlMaXN0Iiwia2V5Q29udGFpbmVyIiwiaXRlbUNvbnRhaW5lciIsImF1dG9jb21wbGV0ZUVsZW1lbnQiLCJwbGFjZWhvbGRlclRyYW5zbGF0aW9uQ29udGFpbmVyIiwiJCIsInBhcmVudCIsImF1dG9jb21wbGV0ZVVybCIsImxvYWRpbmdTcGlubmVyIiwiZmluZCIsImtleUlucHV0IiwibGlzdEVsZW1lbnQiLCJhZGRLZXlTZWFyY2hFdmVudCIsImRvY3VtZW50Iiwib24iLCJlIiwidGFyZ2V0IiwiaXMiLCJoaWRlIiwicHJvdG90eXBlIiwic2hvd0F1dG9Db21wbGV0ZSIsInNlYXJjaFR5cGUiLCJrZXlMaXN0Q2FudmFzIiwiZW1wdHkiLCJhcHBlbmQiLCJyZW1vdmUiLCJzaG93IiwiYWpheCIsInR5cGUiLCJ1cmwiLCJidWlsZEF1dG9jb21wbGV0ZVVybCIsInZhbCIsImNvbnRleHQiLCJzdWNjZXNzIiwiaGFuZGxlQWpheFJlc3BvbnNlIiwicmVzcG9uc2UiLCJlYWNoIiwiaSIsIml0ZW0iLCJ2YWx1ZSIsInRleHQiLCJrZXkiLCJjc3MiLCJ3aWR0aCIsImhlaWdodCIsImxlbmd0aCIsInNldFNlbGVjdGVkVHJhbnNsYXRpb25WYWx1ZUZyb21SZXNwb25zZSIsImtleUNvZGUiLCJibHVyIiwiZm9jdXMiLCJzZWxlY3RDaGFuZ2UiLCJ0cmFuc2xhdGlvbnMiLCJpZExvY2FsZSIsInRyYW5zbGF0aW9uIiwidHJhbnNsYXRpb25FbGVtZW50cyIsInRyYW5zbGF0aW9uRWxlbWVudEluZGV4IiwidHJhbnNsYXRpb25FbGVtZW50IiwidHJhbnNsYXRpb25JZExvY2FsZSIsInNlYXJjaFR5cGVHbG9zc2FyeUtleSIsInNlYXJjaFR5cGVGdWxsVGV4dCIsImZvcm1hdFN0cmluZyIsInNlYXJjaE9wdGlvbiIsImRlbGF5IiwidGltZXIiLCJjYWxsYmFjayIsIm1zIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInJlYWR5c3RhdGUiLCJhYm9ydCIsImF0dHIiLCJyZW1vdmVBdHRyIiwiZmlyc3QiLCJjaGFuZ2UiLCJTdHJpbmciLCJhcmdzIiwiYXJndW1lbnRzIiwicmVwbGFjZSIsIm1hdGNoIiwiaW5kZXgiLCJtb2R1bGUiLCJleHBvcnRzIiwicmVhZHkiLCJ2YWxpZEZyb20iLCJ2YWxpZFRvIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJjaGFuZ2VNb250aCIsIm51bWJlck9mTW9udGhzIiwibWF4RGF0ZSIsImRlZmF1bHREYXRhIiwib25DbG9zZSIsInNlbGVjdGVkRGF0ZSIsIm1pbkRhdGUiLCJlbGVtZW50Iiwib3JpZ2luYWxUZXh0IiwidGFyZ2V0cyIsInRhcmdldHNEaWZmIiwiaW5uZXJUZXh0IiwiZWRpdG9yIiwiZ2V0R2xvYmFsQ29uZmlnIiwiY29uZmlnTmFtZSIsIkJvb2xlYW4iLCJ3aW5kb3ciLCJlZGl0b3JDb25maWd1cmF0aW9uIiwibWVyZ2VDb25maWdzIiwiYmFzZUNvbmZpZyIsIm5ld0NvbmZpZyIsInByb3BlcnR5IiwidXBkYXRlVG9vbGJhck9wdGlvbnMiLCJoYXNPd25Qcm9wZXJ0eSIsImV4dGVuZCIsImJ1dHRvbnMiLCJkZWZhdWx0UG9wb3Zlck9wdGlvbnMiLCJwb3BvdmVyIiwiZXh0ZW5kZWRPcHRpb25zIiwiZ2V0Q29uZmlnIiwiY29udGVudCIsIm1heEhlaWdodCIsImlucHV0VGV4dCIsInRvb2xiYXIiLCJBcnJheSIsImZpbmRJbmRleCIsInByZWRpY2F0ZSIsIlR5cGVFcnJvciIsImxpc3QiLCJPYmplY3QiLCJ0aGlzQXJnIiwiY2FsbCIsImZvckVhY2giLCJuZXdUb29sYmFyT3B0aW9uIiwiZXhpc3RpbmdPcHRpb25JbmRleCIsImRlZmF1bHRUb29sYmFyT3B0aW9uIiwibmV3VG9vbGJhck9wdGlvbnNBcnJheSIsInNsaWNlIiwidG9vbGJhck9wdGlvbkdyb3VwIiwidG9vbGJhck9wdGlvbnNBcnJheSIsInB1c2giXSwic291cmNlUm9vdCI6IiJ9