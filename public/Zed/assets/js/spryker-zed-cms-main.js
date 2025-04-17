"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-main"],{

/***/ "./vendor/spryker/cms/assets/Zed/js/modules/logic.js":
/*!***********************************************************!*\
  !*** ./vendor/spryker/cms/assets/Zed/js/modules/logic.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var summernote = __webpack_require__(/*! ZedGuiEditorConfiguration */ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js");
const GLOSSARY_SELECT_MARGIN_TOP = 159;
const GLOSSARY_SELECT_MARGIN_LEFT = 230;
const GLOSSARY_SELECT_MARGIN_WIDTH = 25;
var xhr = null;
var keyList = null;
var keyContainer = null;
var itemList = null;
var itemContainer = null;
var successResponseCount = 0;
String.prototype.formatString = function () {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function (match, index) {
    return args[index];
  });
};
function postForm($form, id, successCallback) {
  var values = {};
  $.each($form.serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });
  if (!/\S/.test(values['form[glossary_key]']) && values['form[search_option]'] != 0) {
    id++;
    $('.error_' + id).text('The glossary key cannot be empty!');
    $('.waiting_' + id).text('');
    return;
  }
  $.ajax({
    type: $form.attr('method'),
    url: '?id-page={0}&id-form={1}'.formatString($('#idPage').val(), id),
    data: values,
    success: function (data) {
      successCallback(data);
    }
  });
}
var ajaxifySubmmit = function (formId) {
  $('.form_class_' + formId).submit(function (e) {
    e.preventDefault();
    $('.waiting_' + formId).text('Waiting ...');
    $('.success_' + formId).text('');
    $('.error_' + formId).text('');
    postForm($(this), formId - 1, function (response) {
      $('.waiting_' + formId).text('');
      if (response.success != 'false') {
        var form = $('.form_class_' + formId);
        var keyInput = form.find('#cms_glossary_glossary_key');
        var keyType = form.find('#cms_glossary_search_option');
        if (keyType.val() == 0) {
          keyInput.removeAttr('disabled');
          keyInput.val(response.glossaryKeyName);
          keyType.val(1);
        }
        $('.success_' + formId).text('Successfully added.');
        successResponseCount++;
      } else {
        $('.error_' + formId).text(response.errorMessages);
      }
    });
    return false;
  });
};
function showAutoComplete(formId, searchType) {
  var searchTypeGlossaryKey = 2;
  var searchTypeFullText = 3;
  var listElement = '<div id="foundKeyListContainer" class="key-container"><select id="foundKeyList" size="10" class="key-list"></select></div>';
  $('.keyListCanvas').empty();
  $('.keyListCanvas').append(listElement);
  keyList = $('#foundKeyList');
  keyContainer = $('#foundKeyListContainer');
  var form = $('.form_class_' + formId);
  var keyInput = form.find('#cms_glossary_glossary_key');
  var keyTranslation = form.find('#cms_glossary_translation');
  var keyFkLocale = form.find('#cms_glossary_fk_locale');
  var ajaxUrl = 'glossary/search?{0}={1}&localeId={2}';
  if (searchType == searchTypeGlossaryKey) {
    ajaxUrl = ajaxUrl.formatString('key', keyInput.val(), keyFkLocale.val());
  } else if (searchType == searchTypeFullText) {
    ajaxUrl = ajaxUrl.formatString('value', keyInput.val(), keyFkLocale.val());
  } else {
    ajaxUrl = '';
  }
  keyList.find('option').remove();
  $('.loading-' + formId).show();
  xhr = $.ajax({
    type: 'GET',
    url: ajaxUrl,
    success: function (data) {
      $('.loading-' + formId).hide();
      $.each(data, function (i, item) {
        keyList.append($('<option>', {
          value: i,
          text: item.key
        }));
        keyContainer.css({
          top: keyInput.offset().top - GLOSSARY_SELECT_MARGIN_TOP
        });
        keyContainer.css({
          left: keyInput.offset().left - GLOSSARY_SELECT_MARGIN_LEFT
        });
        keyContainer.css({
          width: keyInput.width() + GLOSSARY_SELECT_MARGIN_WIDTH
        });
        keyContainer.show();
      });
      keyList.css({
        height: data.length * 17
      });
      keyList.on('change', function () {
        var keyContent = data[this.value].value;
        keyTranslation.val(keyContent);
        keyInput.val(data[this.value].key);
        $(keyInput.closest('.row').find('#cms_glossary_translation')).summernote('destroy');
        $(keyInput.closest('.row').find('#cms_glossary_translation')).summernote(summernote.getConfig(keyContent));
      });
      keyList.on('keydown', function (e) {
        var key = e.keyCode;
        if (key == 13 || key == 9) {
          keyList.blur();
          return false;
        }
      });
      keyList.on('blur', function () {
        keyInput.val(data[this.value].key);
        keyContainer.hide();
        keyInput.focus();
        return false;
      });
    }
  });
}
var addKeySearchEvent = function (formId) {
  var form = $('.form_class_' + formId);
  var keyInput = form.find('#cms_glossary_glossary_key');
  var keyType = form.find('#cms_glossary_search_option');
  keyInput.on('input', function () {
    if ($(this).val().length > 3) {
      delay(function () {
        if (xhr && xhr.readystate != 4) {
          xhr.abort();
        }
        if (keyType.val() == 2 || keyType.val() == 3) {
          showAutoComplete(formId, keyType.val());
        }
      }, 500);
    }
  });
  if (keyType.val() == 0 && keyInput.val() == '') {
    keyInput.attr('disabled', 'disabled');
  } else {
    keyType.val(1);
  }
  keyType.on('change', function () {
    if (this.value == 0) {
      keyInput.attr('disabled', 'disabled');
    } else {
      keyInput.removeAttr('disabled');
    }
  });
  keyInput.on('keyup', function (e) {
    var key = e.keyCode;
    if (key == 40) {
      keyList.first().focus();
      keyList.val(0).change();
    }
  });
};
function showBlockAutoComplete(elementId, type) {
  var listElement = '<div id="foundItemListContainer" class="key-container"><select id="foundItemList" size="10" class="key-list"></select></div>';
  $('.itemListCanvas').empty();
  $('.itemListCanvas').append(listElement);
  itemList = $('#foundItemList');
  itemContainer = $('#foundItemListContainer');
  var elementInput = $(elementId);
  var blockValue = $('#cms_block_value');
  var ajaxUrl = type == 'category' ? '/cms/block/search-category?term={0}' : '/cms/block/search-product?term={0}';
  itemList.find('option').remove();
  var loadingBlock = $('.block-loading');
  loadingBlock.css({
    top: elementInput.offset().top - 108,
    left: elementInput.offset().left - 235,
    position: 'absolute'
  });
  loadingBlock.show();
  xhr = $.ajax({
    type: 'GET',
    url: ajaxUrl.formatString(elementInput.val()),
    success: function (data) {
      $('.block-loading').hide();
      $.each(data, function (i, item) {
        itemList.append($('<option>', {
          value: i,
          text: '{0} -> {1}'.formatString(item.name, item.url)
        }));
        itemContainer.css({
          top: elementInput.offset().top - 108
        });
        itemContainer.css({
          left: elementInput.offset().left - 235
        });
        itemContainer.css({
          width: elementInput.width() + 25
        });
        itemContainer.show();
      });
      itemList.css({
        height: data.length * 17
      });
      itemList.on('keydown', function (e) {
        var key = e.keyCode;
        if (key == 13 || key == 9) {
          itemList.blur();
          return false;
        }
      });
      itemList.on('blur', function () {
        elementInput.val(data[this.value].name);
        blockValue.val(data[this.value].id);
        itemContainer.hide();
        elementInput.focus();
        return false;
      });
    }
  });
}
var addAutoCompleteSearchEvent = function (elementId) {
  var elementInput = $(elementId);
  var elementType = $('#cms_block_type');
  elementInput.attr('autocomplete', 'off');
  elementInput.on('input', function () {
    if ($(this).val().length > 3) {
      delay(function () {
        if (xhr && xhr.readystate != 4) {
          xhr.abort();
        }
        if (elementType.val() != 0) {
          showBlockAutoComplete(elementId, elementType.val());
        }
      }, 500);
    }
  });
  elementInput.on('keyup', function (e) {
    var key = e.keyCode;
    if (key == 40) {
      itemList.first().focus();
      itemList.val(0).change();
    }
  });
  if (elementType.val() == 'static') {
    $('#cms_block_selectValue').attr('disabled', 'disabled');
    $('#cms_block_value').val(0);
  }
  elementType.on('change', function () {
    if (this.value == 'static') {
      $('#cms_block_selectValue').attr('disabled', 'disabled');
      $('#cms_block_value').attr('value', 0);
    } else {
      $('#cms_block_selectValue').removeAttr('disabled');
    }
  });
};
var delay = function () {
  var timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
}();
$(document).ready(function () {
  addAutoCompleteSearchEvent('#cms_block_selectValue');
  $('.cms_form').each(function (index, item) {
    var formId = $(item).attr('data-index');
    ajaxifySubmmit(formId);
    addKeySearchEvent(formId);
  });
  $('#saveAll').on('click', function () {
    $('.save-all-message').text('');
    $('.save-all-loading').show();
    var formCount = 0;
    successResponseCount = 0;
    $('.cms_form').each(function (index, item) {
      var formId = $(item).attr('data-index');
      $('.form_class_' + formId).submit();
      formCount++;
    });
    $(document).ajaxStop(function () {
      $('.save-all-loading').hide();
      $('.save-all-message').text(successResponseCount + ' of ' + formCount + ' is done.');
      if (formCount == successResponseCount) {
        $('.save-all-message').css('color', 'green');
      } else if (formCount > successResponseCount && successResponseCount != 0) {
        $('.save-all-message').css('color', 'orange');
      } else {
        $('.save-all-message').css('color', 'red');
      }
      $(this).unbind('ajaxStop');
    });
  });
});
$(document).on('click', function (e) {
  if (keyContainer !== null && !$(e.target).is('option')) {
    keyContainer.hide();
  }
  if (itemContainer !== null && !$(e.target).is('option')) {
    itemContainer.hide();
  }
});

/***/ }),

/***/ "./vendor/spryker/cms/assets/Zed/js/modules/main.js":
/*!**********************************************************!*\
  !*** ./vendor/spryker/cms/assets/Zed/js/modules/main.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./logic */ "./vendor/spryker/cms/assets/Zed/js/modules/logic.js");
__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/cms/assets/Zed/sass/main.scss");
__webpack_require__(/*! ../../img/cms-loader.gif */ "./vendor/spryker/cms/assets/Zed/img/cms-loader.gif");

/***/ }),

/***/ "./vendor/spryker/cms/assets/Zed/js/spryker-zed-cms-main.entry.js":
/*!************************************************************************!*\
  !*** ./vendor/spryker/cms/assets/Zed/js/spryker-zed-cms-main.entry.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms/assets/Zed/js/modules/main.js");

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

/***/ "./vendor/spryker/cms/assets/Zed/sass/main.scss":
/*!******************************************************!*\
  !*** ./vendor/spryker/cms/assets/Zed/sass/main.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./vendor/spryker/cms/assets/Zed/img/cms-loader.gif":
/*!**********************************************************!*\
  !*** ./vendor/spryker/cms/assets/Zed/img/cms-loader.gif ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "img/cms-loader.gif";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms/assets/Zed/js/spryker-zed-cms-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztNQUUvQ0MsbUJBQW1CLENBQUNDLElBQUksQ0FBQ0osc0JBQXNCLENBQUM7TUFDaEQ7SUFDSjtJQUVBM0IsVUFBVSxDQUFDYyxPQUFPLENBQUNpQixJQUFJLENBQUNQLGdCQUFnQixDQUFDO0VBQzdDLENBQUMsQ0FBQztBQUNOLENBQUM7Ozs7Ozs7Ozs7O0FDdEdEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9sb2dpYy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMvYXNzZXRzL1plZC9qcy9tb2R1bGVzL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zL2Fzc2V0cy9aZWQvanMvc3ByeWtlci16ZWQtY21zLW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zL2Fzc2V0cy9aZWQvc2Fzcy9tYWluLnNjc3M/NzI0NSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdW1tZXJub3RlID0gcmVxdWlyZSgnWmVkR3VpRWRpdG9yQ29uZmlndXJhdGlvbicpO1xuXG5jb25zdCBHTE9TU0FSWV9TRUxFQ1RfTUFSR0lOX1RPUCA9IDE1OTtcbmNvbnN0IEdMT1NTQVJZX1NFTEVDVF9NQVJHSU5fTEVGVCA9IDIzMDtcbmNvbnN0IEdMT1NTQVJZX1NFTEVDVF9NQVJHSU5fV0lEVEggPSAyNTtcblxudmFyIHhociA9IG51bGw7XG52YXIga2V5TGlzdCA9IG51bGw7XG52YXIga2V5Q29udGFpbmVyID0gbnVsbDtcbnZhciBpdGVtTGlzdCA9IG51bGw7XG52YXIgaXRlbUNvbnRhaW5lciA9IG51bGw7XG52YXIgc3VjY2Vzc1Jlc3BvbnNlQ291bnQgPSAwO1xuXG5TdHJpbmcucHJvdG90eXBlLmZvcm1hdFN0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC97KFxcZCspfS9nLCBmdW5jdGlvbiAobWF0Y2gsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBhcmdzW2luZGV4XTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHBvc3RGb3JtKCRmb3JtLCBpZCwgc3VjY2Vzc0NhbGxiYWNrKSB7XG4gICAgdmFyIHZhbHVlcyA9IHt9O1xuICAgICQuZWFjaCgkZm9ybS5zZXJpYWxpemVBcnJheSgpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcbiAgICAgICAgdmFsdWVzW2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIS9cXFMvLnRlc3QodmFsdWVzWydmb3JtW2dsb3NzYXJ5X2tleV0nXSkgJiYgdmFsdWVzWydmb3JtW3NlYXJjaF9vcHRpb25dJ10gIT0gMCkge1xuICAgICAgICBpZCsrO1xuICAgICAgICAkKCcuZXJyb3JfJyArIGlkKS50ZXh0KCdUaGUgZ2xvc3Nhcnkga2V5IGNhbm5vdCBiZSBlbXB0eSEnKTtcbiAgICAgICAgJCgnLndhaXRpbmdfJyArIGlkKS50ZXh0KCcnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgICQuYWpheCh7XG4gICAgICAgIHR5cGU6ICRmb3JtLmF0dHIoJ21ldGhvZCcpLFxuICAgICAgICB1cmw6ICc/aWQtcGFnZT17MH0maWQtZm9ybT17MX0nLmZvcm1hdFN0cmluZygkKCcjaWRQYWdlJykudmFsKCksIGlkKSxcbiAgICAgICAgZGF0YTogdmFsdWVzLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgc3VjY2Vzc0NhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9LFxuICAgIH0pO1xufVxuXG52YXIgYWpheGlmeVN1Ym1taXQgPSBmdW5jdGlvbiAoZm9ybUlkKSB7XG4gICAgJCgnLmZvcm1fY2xhc3NfJyArIGZvcm1JZCkuc3VibWl0KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAkKCcud2FpdGluZ18nICsgZm9ybUlkKS50ZXh0KCdXYWl0aW5nIC4uLicpO1xuICAgICAgICAkKCcuc3VjY2Vzc18nICsgZm9ybUlkKS50ZXh0KCcnKTtcbiAgICAgICAgJCgnLmVycm9yXycgKyBmb3JtSWQpLnRleHQoJycpO1xuXG4gICAgICAgIHBvc3RGb3JtKCQodGhpcyksIGZvcm1JZCAtIDEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgJCgnLndhaXRpbmdfJyArIGZvcm1JZCkudGV4dCgnJyk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm0gPSAkKCcuZm9ybV9jbGFzc18nICsgZm9ybUlkKTtcbiAgICAgICAgICAgICAgICB2YXIga2V5SW5wdXQgPSBmb3JtLmZpbmQoJyNjbXNfZ2xvc3NhcnlfZ2xvc3Nhcnlfa2V5Jyk7XG4gICAgICAgICAgICAgICAgdmFyIGtleVR5cGUgPSBmb3JtLmZpbmQoJyNjbXNfZ2xvc3Nhcnlfc2VhcmNoX29wdGlvbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGtleVR5cGUudmFsKCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBrZXlJbnB1dC5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICBrZXlJbnB1dC52YWwocmVzcG9uc2UuZ2xvc3NhcnlLZXlOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAga2V5VHlwZS52YWwoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQoJy5zdWNjZXNzXycgKyBmb3JtSWQpLnRleHQoJ1N1Y2Nlc3NmdWxseSBhZGRlZC4nKTtcbiAgICAgICAgICAgICAgICBzdWNjZXNzUmVzcG9uc2VDb3VudCsrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcuZXJyb3JfJyArIGZvcm1JZCkudGV4dChyZXNwb25zZS5lcnJvck1lc3NhZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gc2hvd0F1dG9Db21wbGV0ZShmb3JtSWQsIHNlYXJjaFR5cGUpIHtcbiAgICB2YXIgc2VhcmNoVHlwZUdsb3NzYXJ5S2V5ID0gMjtcbiAgICB2YXIgc2VhcmNoVHlwZUZ1bGxUZXh0ID0gMztcbiAgICB2YXIgbGlzdEVsZW1lbnQgPVxuICAgICAgICAnPGRpdiBpZD1cImZvdW5kS2V5TGlzdENvbnRhaW5lclwiIGNsYXNzPVwia2V5LWNvbnRhaW5lclwiPjxzZWxlY3QgaWQ9XCJmb3VuZEtleUxpc3RcIiBzaXplPVwiMTBcIiBjbGFzcz1cImtleS1saXN0XCI+PC9zZWxlY3Q+PC9kaXY+JztcbiAgICAkKCcua2V5TGlzdENhbnZhcycpLmVtcHR5KCk7XG4gICAgJCgnLmtleUxpc3RDYW52YXMnKS5hcHBlbmQobGlzdEVsZW1lbnQpO1xuXG4gICAga2V5TGlzdCA9ICQoJyNmb3VuZEtleUxpc3QnKTtcbiAgICBrZXlDb250YWluZXIgPSAkKCcjZm91bmRLZXlMaXN0Q29udGFpbmVyJyk7XG5cbiAgICB2YXIgZm9ybSA9ICQoJy5mb3JtX2NsYXNzXycgKyBmb3JtSWQpO1xuXG4gICAgdmFyIGtleUlucHV0ID0gZm9ybS5maW5kKCcjY21zX2dsb3NzYXJ5X2dsb3NzYXJ5X2tleScpO1xuICAgIHZhciBrZXlUcmFuc2xhdGlvbiA9IGZvcm0uZmluZCgnI2Ntc19nbG9zc2FyeV90cmFuc2xhdGlvbicpO1xuICAgIHZhciBrZXlGa0xvY2FsZSA9IGZvcm0uZmluZCgnI2Ntc19nbG9zc2FyeV9ma19sb2NhbGUnKTtcblxuICAgIHZhciBhamF4VXJsID0gJ2dsb3NzYXJ5L3NlYXJjaD97MH09ezF9JmxvY2FsZUlkPXsyfSc7XG5cbiAgICBpZiAoc2VhcmNoVHlwZSA9PSBzZWFyY2hUeXBlR2xvc3NhcnlLZXkpIHtcbiAgICAgICAgYWpheFVybCA9IGFqYXhVcmwuZm9ybWF0U3RyaW5nKCdrZXknLCBrZXlJbnB1dC52YWwoKSwga2V5RmtMb2NhbGUudmFsKCkpO1xuICAgIH0gZWxzZSBpZiAoc2VhcmNoVHlwZSA9PSBzZWFyY2hUeXBlRnVsbFRleHQpIHtcbiAgICAgICAgYWpheFVybCA9IGFqYXhVcmwuZm9ybWF0U3RyaW5nKCd2YWx1ZScsIGtleUlucHV0LnZhbCgpLCBrZXlGa0xvY2FsZS52YWwoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWpheFVybCA9ICcnO1xuICAgIH1cblxuICAgIGtleUxpc3QuZmluZCgnb3B0aW9uJykucmVtb3ZlKCk7XG4gICAgJCgnLmxvYWRpbmctJyArIGZvcm1JZCkuc2hvdygpO1xuXG4gICAgeGhyID0gJC5hamF4KHtcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHVybDogYWpheFVybCxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICQoJy5sb2FkaW5nLScgKyBmb3JtSWQpLmhpZGUoKTtcblxuICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAga2V5TGlzdC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgICQoJzxvcHRpb24+Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtLmtleSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGtleUNvbnRhaW5lci5jc3MoeyB0b3A6IGtleUlucHV0Lm9mZnNldCgpLnRvcCAtIEdMT1NTQVJZX1NFTEVDVF9NQVJHSU5fVE9QIH0pO1xuICAgICAgICAgICAgICAgIGtleUNvbnRhaW5lci5jc3MoeyBsZWZ0OiBrZXlJbnB1dC5vZmZzZXQoKS5sZWZ0IC0gR0xPU1NBUllfU0VMRUNUX01BUkdJTl9MRUZUIH0pO1xuICAgICAgICAgICAgICAgIGtleUNvbnRhaW5lci5jc3MoeyB3aWR0aDoga2V5SW5wdXQud2lkdGgoKSArIEdMT1NTQVJZX1NFTEVDVF9NQVJHSU5fV0lEVEggfSk7XG4gICAgICAgICAgICAgICAga2V5Q29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBrZXlMaXN0LmNzcyh7IGhlaWdodDogZGF0YS5sZW5ndGggKiAxNyB9KTtcbiAgICAgICAgICAgIGtleUxpc3Qub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5Q29udGVudCA9IGRhdGFbdGhpcy52YWx1ZV0udmFsdWU7XG4gICAgICAgICAgICAgICAga2V5VHJhbnNsYXRpb24udmFsKGtleUNvbnRlbnQpO1xuXG4gICAgICAgICAgICAgICAga2V5SW5wdXQudmFsKGRhdGFbdGhpcy52YWx1ZV0ua2V5KTtcbiAgICAgICAgICAgICAgICAkKGtleUlucHV0LmNsb3Nlc3QoJy5yb3cnKS5maW5kKCcjY21zX2dsb3NzYXJ5X3RyYW5zbGF0aW9uJykpLnN1bW1lcm5vdGUoJ2Rlc3Ryb3knKTtcbiAgICAgICAgICAgICAgICAkKGtleUlucHV0LmNsb3Nlc3QoJy5yb3cnKS5maW5kKCcjY21zX2dsb3NzYXJ5X3RyYW5zbGF0aW9uJykpLnN1bW1lcm5vdGUoXG4gICAgICAgICAgICAgICAgICAgIHN1bW1lcm5vdGUuZ2V0Q29uZmlnKGtleUNvbnRlbnQpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAga2V5TGlzdC5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGUua2V5Q29kZTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IDEzIHx8IGtleSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgIGtleUxpc3QuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGtleUxpc3Qub24oJ2JsdXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAga2V5SW5wdXQudmFsKGRhdGFbdGhpcy52YWx1ZV0ua2V5KTtcbiAgICAgICAgICAgICAgICBrZXlDb250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIGtleUlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5cbnZhciBhZGRLZXlTZWFyY2hFdmVudCA9IGZ1bmN0aW9uIChmb3JtSWQpIHtcbiAgICB2YXIgZm9ybSA9ICQoJy5mb3JtX2NsYXNzXycgKyBmb3JtSWQpO1xuICAgIHZhciBrZXlJbnB1dCA9IGZvcm0uZmluZCgnI2Ntc19nbG9zc2FyeV9nbG9zc2FyeV9rZXknKTtcbiAgICB2YXIga2V5VHlwZSA9IGZvcm0uZmluZCgnI2Ntc19nbG9zc2FyeV9zZWFyY2hfb3B0aW9uJyk7XG5cbiAgICBrZXlJbnB1dC5vbignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIGRlbGF5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyICYmIHhoci5yZWFkeXN0YXRlICE9IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrZXlUeXBlLnZhbCgpID09IDIgfHwga2V5VHlwZS52YWwoKSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dBdXRvQ29tcGxldGUoZm9ybUlkLCBrZXlUeXBlLnZhbCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoa2V5VHlwZS52YWwoKSA9PSAwICYmIGtleUlucHV0LnZhbCgpID09ICcnKSB7XG4gICAgICAgIGtleUlucHV0LmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAga2V5VHlwZS52YWwoMSk7XG4gICAgfVxuXG4gICAga2V5VHlwZS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PSAwKSB7XG4gICAgICAgICAgICBrZXlJbnB1dC5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5SW5wdXQucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAga2V5SW5wdXQub24oJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IGUua2V5Q29kZTtcblxuICAgICAgICBpZiAoa2V5ID09IDQwKSB7XG4gICAgICAgICAgICBrZXlMaXN0LmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIGtleUxpc3QudmFsKDApLmNoYW5nZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5mdW5jdGlvbiBzaG93QmxvY2tBdXRvQ29tcGxldGUoZWxlbWVudElkLCB0eXBlKSB7XG4gICAgdmFyIGxpc3RFbGVtZW50ID1cbiAgICAgICAgJzxkaXYgaWQ9XCJmb3VuZEl0ZW1MaXN0Q29udGFpbmVyXCIgY2xhc3M9XCJrZXktY29udGFpbmVyXCI+PHNlbGVjdCBpZD1cImZvdW5kSXRlbUxpc3RcIiBzaXplPVwiMTBcIiBjbGFzcz1cImtleS1saXN0XCI+PC9zZWxlY3Q+PC9kaXY+JztcbiAgICAkKCcuaXRlbUxpc3RDYW52YXMnKS5lbXB0eSgpO1xuICAgICQoJy5pdGVtTGlzdENhbnZhcycpLmFwcGVuZChsaXN0RWxlbWVudCk7XG5cbiAgICBpdGVtTGlzdCA9ICQoJyNmb3VuZEl0ZW1MaXN0Jyk7XG4gICAgaXRlbUNvbnRhaW5lciA9ICQoJyNmb3VuZEl0ZW1MaXN0Q29udGFpbmVyJyk7XG5cbiAgICB2YXIgZWxlbWVudElucHV0ID0gJChlbGVtZW50SWQpO1xuXG4gICAgdmFyIGJsb2NrVmFsdWUgPSAkKCcjY21zX2Jsb2NrX3ZhbHVlJyk7XG4gICAgdmFyIGFqYXhVcmwgPSB0eXBlID09ICdjYXRlZ29yeScgPyAnL2Ntcy9ibG9jay9zZWFyY2gtY2F0ZWdvcnk/dGVybT17MH0nIDogJy9jbXMvYmxvY2svc2VhcmNoLXByb2R1Y3Q/dGVybT17MH0nO1xuXG4gICAgaXRlbUxpc3QuZmluZCgnb3B0aW9uJykucmVtb3ZlKCk7XG5cbiAgICB2YXIgbG9hZGluZ0Jsb2NrID0gJCgnLmJsb2NrLWxvYWRpbmcnKTtcbiAgICBsb2FkaW5nQmxvY2suY3NzKHtcbiAgICAgICAgdG9wOiBlbGVtZW50SW5wdXQub2Zmc2V0KCkudG9wIC0gMTA4LFxuICAgICAgICBsZWZ0OiBlbGVtZW50SW5wdXQub2Zmc2V0KCkubGVmdCAtIDIzNSxcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgfSk7XG4gICAgbG9hZGluZ0Jsb2NrLnNob3coKTtcblxuICAgIHhociA9ICQuYWpheCh7XG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICB1cmw6IGFqYXhVcmwuZm9ybWF0U3RyaW5nKGVsZW1lbnRJbnB1dC52YWwoKSksXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAkKCcuYmxvY2stbG9hZGluZycpLmhpZGUoKTtcblxuICAgICAgICAgICAgJC5lYWNoKGRhdGEsIGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgaXRlbUxpc3QuYXBwZW5kKFxuICAgICAgICAgICAgICAgICAgICAkKCc8b3B0aW9uPicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3swfSAtPiB7MX0nLmZvcm1hdFN0cmluZyhpdGVtLm5hbWUsIGl0ZW0udXJsKSxcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGl0ZW1Db250YWluZXIuY3NzKHsgdG9wOiBlbGVtZW50SW5wdXQub2Zmc2V0KCkudG9wIC0gMTA4IH0pO1xuICAgICAgICAgICAgICAgIGl0ZW1Db250YWluZXIuY3NzKHsgbGVmdDogZWxlbWVudElucHV0Lm9mZnNldCgpLmxlZnQgLSAyMzUgfSk7XG4gICAgICAgICAgICAgICAgaXRlbUNvbnRhaW5lci5jc3MoeyB3aWR0aDogZWxlbWVudElucHV0LndpZHRoKCkgKyAyNSB9KTtcbiAgICAgICAgICAgICAgICBpdGVtQ29udGFpbmVyLnNob3coKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpdGVtTGlzdC5jc3MoeyBoZWlnaHQ6IGRhdGEubGVuZ3RoICogMTcgfSk7XG5cbiAgICAgICAgICAgIGl0ZW1MaXN0Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZS5rZXlDb2RlO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gMTMgfHwga2V5ID09IDkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbUxpc3QuYmx1cigpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGl0ZW1MaXN0Lm9uKCdibHVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRJbnB1dC52YWwoZGF0YVt0aGlzLnZhbHVlXS5uYW1lKTtcbiAgICAgICAgICAgICAgICBibG9ja1ZhbHVlLnZhbChkYXRhW3RoaXMudmFsdWVdLmlkKTtcbiAgICAgICAgICAgICAgICBpdGVtQ29udGFpbmVyLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxudmFyIGFkZEF1dG9Db21wbGV0ZVNlYXJjaEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICAgIHZhciBlbGVtZW50SW5wdXQgPSAkKGVsZW1lbnRJZCk7XG4gICAgdmFyIGVsZW1lbnRUeXBlID0gJCgnI2Ntc19ibG9ja190eXBlJyk7XG5cbiAgICBlbGVtZW50SW5wdXQuYXR0cignYXV0b2NvbXBsZXRlJywgJ29mZicpO1xuXG4gICAgZWxlbWVudElucHV0Lm9uKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgZGVsYXkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh4aHIgJiYgeGhyLnJlYWR5c3RhdGUgIT0gNCkge1xuICAgICAgICAgICAgICAgICAgICB4aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRUeXBlLnZhbCgpICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0Jsb2NrQXV0b0NvbXBsZXRlKGVsZW1lbnRJZCwgZWxlbWVudFR5cGUudmFsKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGVsZW1lbnRJbnB1dC5vbigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIga2V5ID0gZS5rZXlDb2RlO1xuXG4gICAgICAgIGlmIChrZXkgPT0gNDApIHtcbiAgICAgICAgICAgIGl0ZW1MaXN0LmZpcnN0KCkuZm9jdXMoKTtcbiAgICAgICAgICAgIGl0ZW1MaXN0LnZhbCgwKS5jaGFuZ2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGVsZW1lbnRUeXBlLnZhbCgpID09ICdzdGF0aWMnKSB7XG4gICAgICAgICQoJyNjbXNfYmxvY2tfc2VsZWN0VmFsdWUnKS5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAkKCcjY21zX2Jsb2NrX3ZhbHVlJykudmFsKDApO1xuICAgIH1cblxuICAgIGVsZW1lbnRUeXBlLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09ICdzdGF0aWMnKSB7XG4gICAgICAgICAgICAkKCcjY21zX2Jsb2NrX3NlbGVjdFZhbHVlJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICQoJyNjbXNfYmxvY2tfdmFsdWUnKS5hdHRyKCd2YWx1ZScsIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI2Ntc19ibG9ja19zZWxlY3RWYWx1ZScpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnZhciBkZWxheSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRpbWVyID0gMDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGNhbGxiYWNrLCBtcykge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoY2FsbGJhY2ssIG1zKTtcbiAgICB9O1xufSkoKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGFkZEF1dG9Db21wbGV0ZVNlYXJjaEV2ZW50KCcjY21zX2Jsb2NrX3NlbGVjdFZhbHVlJyk7XG5cbiAgICAkKCcuY21zX2Zvcm0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICB2YXIgZm9ybUlkID0gJChpdGVtKS5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgIGFqYXhpZnlTdWJtbWl0KGZvcm1JZCk7XG4gICAgICAgIGFkZEtleVNlYXJjaEV2ZW50KGZvcm1JZCk7XG4gICAgfSk7XG5cbiAgICAkKCcjc2F2ZUFsbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLnNhdmUtYWxsLW1lc3NhZ2UnKS50ZXh0KCcnKTtcbiAgICAgICAgJCgnLnNhdmUtYWxsLWxvYWRpbmcnKS5zaG93KCk7XG4gICAgICAgIHZhciBmb3JtQ291bnQgPSAwO1xuICAgICAgICBzdWNjZXNzUmVzcG9uc2VDb3VudCA9IDA7XG4gICAgICAgICQoJy5jbXNfZm9ybScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgICAgICB2YXIgZm9ybUlkID0gJChpdGVtKS5hdHRyKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgICAkKCcuZm9ybV9jbGFzc18nICsgZm9ybUlkKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIGZvcm1Db3VudCsrO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5hamF4U3RvcChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuc2F2ZS1hbGwtbG9hZGluZycpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5zYXZlLWFsbC1tZXNzYWdlJykudGV4dChzdWNjZXNzUmVzcG9uc2VDb3VudCArICcgb2YgJyArIGZvcm1Db3VudCArICcgaXMgZG9uZS4nKTtcbiAgICAgICAgICAgIGlmIChmb3JtQ291bnQgPT0gc3VjY2Vzc1Jlc3BvbnNlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAkKCcuc2F2ZS1hbGwtbWVzc2FnZScpLmNzcygnY29sb3InLCAnZ3JlZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybUNvdW50ID4gc3VjY2Vzc1Jlc3BvbnNlQ291bnQgJiYgc3VjY2Vzc1Jlc3BvbnNlQ291bnQgIT0gMCkge1xuICAgICAgICAgICAgICAgICQoJy5zYXZlLWFsbC1tZXNzYWdlJykuY3NzKCdjb2xvcicsICdvcmFuZ2UnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnLnNhdmUtYWxsLW1lc3NhZ2UnKS5jc3MoJ2NvbG9yJywgJ3JlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJCh0aGlzKS51bmJpbmQoJ2FqYXhTdG9wJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG5cbiQoZG9jdW1lbnQpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGtleUNvbnRhaW5lciAhPT0gbnVsbCAmJiAhJChlLnRhcmdldCkuaXMoJ29wdGlvbicpKSB7XG4gICAgICAgIGtleUNvbnRhaW5lci5oaWRlKCk7XG4gICAgfVxuICAgIGlmIChpdGVtQ29udGFpbmVyICE9PSBudWxsICYmICEkKGUudGFyZ2V0KS5pcygnb3B0aW9uJykpIHtcbiAgICAgICAgaXRlbUNvbnRhaW5lci5oaWRlKCk7XG4gICAgfVxufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbG9naWMnKTtcbnJlcXVpcmUoJy4uLy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG5yZXF1aXJlKCcuLi8uLi9pbWcvY21zLWxvYWRlci5naWYnKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0R2xvYmFsQ29uZmlnOiBmdW5jdGlvbiAoY29uZmlnTmFtZSkge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihjb25maWdOYW1lICYmIHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uICYmIHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdKVxuICAgICAgICAgICAgPyB3aW5kb3cuZWRpdG9yQ29uZmlndXJhdGlvbltjb25maWdOYW1lXVxuICAgICAgICAgICAgOiBudWxsO1xuICAgIH0sXG4gICAgbWVyZ2VDb25maWdzOiBmdW5jdGlvbiAoYmFzZUNvbmZpZywgbmV3Q29uZmlnKSB7XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIG5ld0NvbmZpZykge1xuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3Rvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUb29sYmFyT3B0aW9ucyhiYXNlQ29uZmlnLCBuZXdDb25maWcpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdidXR0b25zJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJhc2VDb25maWcuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSAmJiBuZXdDb25maWcuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgJC5leHRlbmQoYmFzZUNvbmZpZy5idXR0b25zLCBuZXdDb25maWcuYnV0dG9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFiYXNlQ29uZmlnLmhhc093blByb3BlcnR5KCdidXR0b25zJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhc2VDb25maWcuYnV0dG9ucyA9IG5ld0NvbmZpZy5idXR0b25zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BvcG92ZXInOlxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdFBvcG92ZXJPcHRpb25zID0gJC5zdW1tZXJub3RlLm9wdGlvbnMucG9wb3ZlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV4dGVuZGVkT3B0aW9ucyA9ICQuZXh0ZW5kKGRlZmF1bHRQb3BvdmVyT3B0aW9ucywgbmV3Q29uZmlnLnBvcG92ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGJhc2VDb25maWcucG9wb3ZlciA9IGV4dGVuZGVkT3B0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbmZpZ1twcm9wZXJ0eV0gPSBuZXdDb25maWdbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJhc2VDb25maWc7XG4gICAgfSxcbiAgICBnZXRDb25maWc6IGZ1bmN0aW9uIChjb250ZW50KSB7XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50IHx8ICcnO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgICAgIG1heEhlaWdodDogNjAwLFxuICAgICAgICAgICAgaW5wdXRUZXh0OiBjb250ZW50LFxuICAgICAgICAgICAgZm9jdXM6IHRydWUsXG4gICAgICAgICAgICB0b29sYmFyOiBbXG4gICAgICAgICAgICAgICAgWydzdHlsZScsIFsnYm9sZCcsICdpdGFsaWMnLCAndW5kZXJsaW5lJywgJ2NsZWFyJ11dLFxuICAgICAgICAgICAgICAgIFsnZm9udCcsIFsnc3RyaWtldGhyb3VnaCcsICdzdXBlcnNjcmlwdCcsICdzdWJzY3JpcHQnXV0sXG4gICAgICAgICAgICAgICAgWydmb250c2l6ZScsIFsnZm9udHNpemUnXV0sXG4gICAgICAgICAgICAgICAgWydjb2xvcicsIFsnY29sb3InXV0sXG4gICAgICAgICAgICAgICAgWydwYXJhJywgWyd1bCcsICdvbCcsICdwYXJhZ3JhcGgnXV0sXG4gICAgICAgICAgICAgICAgWydpbnNlcnQnLCBbJ3BpY3R1cmUnLCAnbGluaycsICd2aWRlbycsICd0YWJsZScsICdociddXSxcbiAgICAgICAgICAgICAgICBbJ21pc2MnLCBbJ3VuZG8nLCAncmVkbycsICdjb2RldmlldyddXSxcbiAgICAgICAgICAgICAgICBbJ2N1c3RvbScsIFtdXSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH07XG4gICAgfSxcbn07XG5cbmlmICghQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXggPSBmdW5jdGlvbiAocHJlZGljYXRlKSB7XG4gICAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUuZmluZEluZGV4IGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3QgPSBPYmplY3QodGhpcyk7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICAgICAgdmFyIHRoaXNBcmcgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3RbaV07XG4gICAgICAgICAgICBpZiAocHJlZGljYXRlLmNhbGwodGhpc0FyZywgdmFsdWUsIGksIGxpc3QpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG59XG5cbnZhciB1cGRhdGVUb29sYmFyT3B0aW9ucyA9IGZ1bmN0aW9uIChiYXNlQ29uZmlnLCBuZXdDb25maWcpIHtcbiAgICBuZXdDb25maWcudG9vbGJhci5mb3JFYWNoKGZ1bmN0aW9uIChuZXdUb29sYmFyT3B0aW9uKSB7XG4gICAgICAgIHZhciBleGlzdGluZ09wdGlvbkluZGV4ID0gYmFzZUNvbmZpZy50b29sYmFyLmZpbmRJbmRleChmdW5jdGlvbiAoZGVmYXVsdFRvb2xiYXJPcHRpb24pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXdUb29sYmFyT3B0aW9uWzBdID09PSBkZWZhdWx0VG9vbGJhck9wdGlvblswXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGV4aXN0aW5nT3B0aW9uSW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBuZXdUb29sYmFyT3B0aW9uc0FycmF5ID0gbmV3VG9vbGJhck9wdGlvblsxXS5zbGljZSgwKTtcbiAgICAgICAgICAgIHZhciB0b29sYmFyT3B0aW9uR3JvdXAgPSBiYXNlQ29uZmlnLnRvb2xiYXJbZXhpc3RpbmdPcHRpb25JbmRleF07XG4gICAgICAgICAgICB2YXIgdG9vbGJhck9wdGlvbnNBcnJheSA9IHRvb2xiYXJPcHRpb25Hcm91cFsxXTtcblxuICAgICAgICAgICAgdG9vbGJhck9wdGlvbnNBcnJheS5wdXNoKG5ld1Rvb2xiYXJPcHRpb25zQXJyYXkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYmFzZUNvbmZpZy50b29sYmFyLnB1c2gobmV3VG9vbGJhck9wdGlvbik7XG4gICAgfSk7XG59O1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInN1bW1lcm5vdGUiLCJyZXF1aXJlIiwiR0xPU1NBUllfU0VMRUNUX01BUkdJTl9UT1AiLCJHTE9TU0FSWV9TRUxFQ1RfTUFSR0lOX0xFRlQiLCJHTE9TU0FSWV9TRUxFQ1RfTUFSR0lOX1dJRFRIIiwieGhyIiwia2V5TGlzdCIsImtleUNvbnRhaW5lciIsIml0ZW1MaXN0IiwiaXRlbUNvbnRhaW5lciIsInN1Y2Nlc3NSZXNwb25zZUNvdW50IiwiU3RyaW5nIiwicHJvdG90eXBlIiwiZm9ybWF0U3RyaW5nIiwiYXJncyIsImFyZ3VtZW50cyIsInJlcGxhY2UiLCJtYXRjaCIsImluZGV4IiwicG9zdEZvcm0iLCIkZm9ybSIsImlkIiwic3VjY2Vzc0NhbGxiYWNrIiwidmFsdWVzIiwiJCIsImVhY2giLCJzZXJpYWxpemVBcnJheSIsImkiLCJmaWVsZCIsIm5hbWUiLCJ2YWx1ZSIsInRlc3QiLCJ0ZXh0IiwiYWpheCIsInR5cGUiLCJhdHRyIiwidXJsIiwidmFsIiwiZGF0YSIsInN1Y2Nlc3MiLCJhamF4aWZ5U3VibW1pdCIsImZvcm1JZCIsInN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInJlc3BvbnNlIiwiZm9ybSIsImtleUlucHV0IiwiZmluZCIsImtleVR5cGUiLCJyZW1vdmVBdHRyIiwiZ2xvc3NhcnlLZXlOYW1lIiwiZXJyb3JNZXNzYWdlcyIsInNob3dBdXRvQ29tcGxldGUiLCJzZWFyY2hUeXBlIiwic2VhcmNoVHlwZUdsb3NzYXJ5S2V5Iiwic2VhcmNoVHlwZUZ1bGxUZXh0IiwibGlzdEVsZW1lbnQiLCJlbXB0eSIsImFwcGVuZCIsImtleVRyYW5zbGF0aW9uIiwia2V5RmtMb2NhbGUiLCJhamF4VXJsIiwicmVtb3ZlIiwic2hvdyIsImhpZGUiLCJpdGVtIiwia2V5IiwiY3NzIiwidG9wIiwib2Zmc2V0IiwibGVmdCIsIndpZHRoIiwiaGVpZ2h0IiwibGVuZ3RoIiwib24iLCJrZXlDb250ZW50IiwiY2xvc2VzdCIsImdldENvbmZpZyIsImtleUNvZGUiLCJibHVyIiwiZm9jdXMiLCJhZGRLZXlTZWFyY2hFdmVudCIsImRlbGF5IiwicmVhZHlzdGF0ZSIsImFib3J0IiwiZmlyc3QiLCJjaGFuZ2UiLCJzaG93QmxvY2tBdXRvQ29tcGxldGUiLCJlbGVtZW50SWQiLCJlbGVtZW50SW5wdXQiLCJibG9ja1ZhbHVlIiwibG9hZGluZ0Jsb2NrIiwicG9zaXRpb24iLCJhZGRBdXRvQ29tcGxldGVTZWFyY2hFdmVudCIsImVsZW1lbnRUeXBlIiwidGltZXIiLCJjYWxsYmFjayIsIm1zIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImRvY3VtZW50IiwicmVhZHkiLCJmb3JtQ291bnQiLCJhamF4U3RvcCIsInVuYmluZCIsInRhcmdldCIsImlzIiwibW9kdWxlIiwiZXhwb3J0cyIsImdldEdsb2JhbENvbmZpZyIsImNvbmZpZ05hbWUiLCJCb29sZWFuIiwid2luZG93IiwiZWRpdG9yQ29uZmlndXJhdGlvbiIsIm1lcmdlQ29uZmlncyIsImJhc2VDb25maWciLCJuZXdDb25maWciLCJwcm9wZXJ0eSIsInVwZGF0ZVRvb2xiYXJPcHRpb25zIiwiaGFzT3duUHJvcGVydHkiLCJleHRlbmQiLCJidXR0b25zIiwiZGVmYXVsdFBvcG92ZXJPcHRpb25zIiwib3B0aW9ucyIsInBvcG92ZXIiLCJleHRlbmRlZE9wdGlvbnMiLCJjb250ZW50IiwibWF4SGVpZ2h0IiwiaW5wdXRUZXh0IiwidG9vbGJhciIsIkFycmF5IiwiZmluZEluZGV4IiwicHJlZGljYXRlIiwiVHlwZUVycm9yIiwibGlzdCIsIk9iamVjdCIsInRoaXNBcmciLCJjYWxsIiwiZm9yRWFjaCIsIm5ld1Rvb2xiYXJPcHRpb24iLCJleGlzdGluZ09wdGlvbkluZGV4IiwiZGVmYXVsdFRvb2xiYXJPcHRpb24iLCJuZXdUb29sYmFyT3B0aW9uc0FycmF5Iiwic2xpY2UiLCJ0b29sYmFyT3B0aW9uR3JvdXAiLCJ0b29sYmFyT3B0aW9uc0FycmF5IiwicHVzaCJdLCJzb3VyY2VSb290IjoiIn0=