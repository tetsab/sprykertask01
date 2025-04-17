"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-productattributegui-main"],{

/***/ "./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/product-attribute.js":
/*!*****************************************************************************************!*\
  !*** ./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/product-attribute.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/product-attribute-gui/assets/Zed/sass/main.scss");
function castToBoolean($value) {
  return $value === 'true' || $value === '1' || $value === 1 || $value == 'true' || $value == true;
}
function AttributeManager() {
  var _attributeManager = {
    attributesValues: {},
    metaAttributes: {},
    locales: {},
    removedKeys: []
  };
  var jsonLoader = {};
  jsonLoader.load = function (input) {
    var json = $(input).html();
    return JSON.parse(json);
  };
  _attributeManager.init = function () {
    _attributeManager.attributesValues = jsonLoader.load($('#productAttributesJson'));
    _attributeManager.metaAttributes = jsonLoader.load($('#metaAttributesJson'));
    _attributeManager.locales = jsonLoader.load($('#localesJson'));
  };
  _attributeManager.getLocaleCollection = function () {
    return _attributeManager.locales;
  };
  _attributeManager.extractKeysFromTable = function () {
    var keys = [];
    $('#productAttributesTable tr').each(function () {
      keys.push($(this).find('td:first').text().trim());
    });
    return keys;
  };
  _attributeManager.validateKey = function (key) {
    var currentKeys = _attributeManager.extractKeysFromTable();
    if ($.inArray(key, currentKeys) > -1) {
      alert('Attribute "' + key + '" already defined');
      return false;
    }
    var hasAttribute = false;
    $.ajax({
      url: '/product-attribute-gui/suggest/keys',
      dataType: 'json',
      async: false,
      data: {
        q: key
      },
      success: function (data) {
        data = data.filter(function (value) {
          return value.key == key;
        });
        if (data.length > 0) {
          hasAttribute = true;
        }
      }
    });
    if (!hasAttribute) {
      alert('Attribute "' + key + '" doesn\'t exist.');
      return false;
    }
    return true;
  };
  _attributeManager.hasKeyBeenUsed = function (key) {
    var currentKeys = _attributeManager.extractKeysFromTable();
    return $.inArray(key, currentKeys) > 0;
  };
  _attributeManager.generateDataToAdd = function (key, idAttribute, attributeMetadata) {
    var dataToAdd = [];
    var locales = _attributeManager.getLocaleCollection();
    dataToAdd.push(key);
    for (var i in locales) {
      var localeData = locales[i];
      var readOnly = '';
      if (castToBoolean(attributeMetadata.is_super)) {
        readOnly = ' readonly="true" ';
      }
      var item = '<input type="' + attributeMetadata.input_type + '"' + ' class="spryker-form-autocomplete form-control ui-autocomplete-input kv_attribute_autocomplete" ' + ' data-allow_input="' + attributeMetadata.allow_input + '"' + ' data-is_super="' + attributeMetadata.is_super + '"' + ' data-is_attribute_input ' + ' data-attribute_key="' + key + '" ' + ' value="" ' + ' data-id_attribute="' + idAttribute + '" ' + ' data-locale_code="' + localeData['locale_name'] + '" ' + ' data-input_type="' + attributeMetadata.input_type + '"' + readOnly + '>' + '<span style="display: none"></span>';
      dataToAdd.push(item);
    }
    var removeButtonHtml = '<div style="text-align: left;"><a data-key="' + key + '" href="#" class="btn btn-xs btn-outline btn-danger remove-item">Remove</a>';
    if (attributeMetadata.input_type === 'multiselect') {
      removeButtonHtml += '<span class="has-error help-block">Use comma separator.</span>';
    }
    dataToAdd.push(removeButtonHtml + '</div>');
    return dataToAdd;
  };
  _attributeManager.addKey = function (key, idAttribute, dataTable) {
    key = key.replace(/([^a-z0-9\_\-\:]+)/gi, '').toLowerCase();
    if (key === '' || !idAttribute) {
      var $messageInput = $('#empty-attribute-key-message');
      alert($messageInput ? $messageInput.val() : 'Please select attribute key first');
      return false;
    }
    if (!_attributeManager.validateKey(key)) {
      return false;
    }
    var keyInput = $('#attribute_form_key');
    var attributeMetadata = {
      key: keyInput.attr('data-key'),
      id: keyInput.attr('data-value'),
      allow_input: castToBoolean(keyInput.attr('data-allow_input')),
      is_super: castToBoolean(keyInput.attr('data-is_super')),
      input_type: keyInput.attr('data-input_type')
    };
    _attributeManager.resetRemovedKey(key);
    var dataToAdd = _attributeManager.generateDataToAdd(key, idAttribute, attributeMetadata);
    dataTable.DataTable().row.add(dataToAdd).draw(true);
    updateAttributeInputsWithAutoComplete();
  };
  _attributeManager.addRemovedKey = function (key) {
    _attributeManager.removedKeys.push(key);
  };
  _attributeManager.resetRemovedKey = function (key) {
    _attributeManager.removedKeys = _attributeManager.removedKeys.filter(function (removedKey) {
      return removedKey !== key;
    });
  };
  _attributeManager.resetRemovedKeysCache = function () {
    _attributeManager.removedKeys = [];
  };
  _attributeManager.save = function () {
    var locales = _attributeManager.getLocaleCollection();
    var form = $('form#attribute_values_form');
    var idProductAbstract = $('#attribute_values_form_hidden_product_abstract_id').val();
    var idProduct = $('#attribute_values_form_hidden_product_id').val();
    var csrfToken = $('#csrf-token').val();
    var formData = [];
    $('[data-is_attribute_input]').each(function (index, value) {
      var input = $(value);
      var attributeValue = input.val();
      var idAttribute = input.attr('data-id_attribute') || null;
      var locale_code = input.attr('data-locale_code') || null;
      var key = input.attr('data-attribute_key') || null;
      var inputType = input.attr('data-input_type') || null;
      formData.push({
        key: key,
        id: idAttribute,
        locale_code: locale_code,
        value: attributeValue,
        input_type: inputType
      });
    });
    $(_attributeManager.removedKeys).each(function (index, removedKey) {
      for (var i in locales) {
        var locale = locales[i];
        var localeName = locale['locale_name'];
        formData.push({
          key: removedKey,
          id: null,
          locale_code: localeName,
          value: ''
        });
      }
    });
    var formDataJson = JSON.stringify(formData);
    var actionUrl = form.attr('action');
    var actionData = {
      json: formDataJson,
      'id-product-abstract': idProductAbstract,
      'id-product': idProduct,
      'csrf-token': csrfToken
    };
    $.ajax({
      url: actionUrl,
      type: 'POST',
      dataType: 'application/json',
      data: $.param(actionData),
      complete: function (jqXHR) {
        if (jqXHR.readyState === 4) {
          _attributeManager.resetRemovedKeysCache();
          $('#saveButton').prop('disabled', false).val('Save');
          var message = 'An error has occurred';
          var responseData = JSON.parse(jqXHR.responseText);
          if (responseData.hasOwnProperty('message')) {
            message = responseData.message;
          }
          window.sweetAlert({
            title: jqXHR.status === 200 ? 'Success' : 'Error',
            text: message,
            type: jqXHR.status === 200 ? 'success' : 'error'
          });
          if (jqXHR.status === 200) {
            setTimeout(function () {
              location.reload();
            }, 2000);
          }
        }
      },
      beforeSend: function () {
        $('#saveButton').prop('disabled', true).val('Saving');
      }
    });
  };
  _attributeManager.init();
  return _attributeManager;
}

/**
 * @param data
 * @param params
 * @returns {{results: *, pagination: {more: (boolean|number)}}}
 */
function processAjaxResult(data, params) {
  //{"id_attribute":1,"values":[{"id_product_management_attribute_value":1,"fk_locale":66,"value":"intel-atom-quad-core","translation":"Intel Atom Z3560 Quad-Core US"}]}
  // parse the results into the format expected by Select2
  // since we are using custom formatting functions we do not need to
  // alter the remote JSON data, except to indicate that infinite
  // scrolling can be used
  params.page = params.page || 1;
  return {
    results: data.values,
    pagination: {
      more: params.page * 30 < data.total || 0
    }
  };
}
function removeActionHandler() {
  var $link = $(this);
  var dataTable = $('#productAttributesTable').DataTable();

  /*$link.parents('tr').find("td input").each(function(index, input) {
      $(input).val('');
  });
  $link.parents('tr').hide();*/

  dataTable.row($link.parents('tr')).remove().draw();
  return false;
}
function updateAttributeInputsWithAutoComplete() {
  $('[data-allow_input=""],[data-allow_input="false"],[data-allow_input="0"]').each(function (key, value) {
    var input = $(value);
    var is_super = castToBoolean(input.attr('data-is_super'));
    var is_read_only = castToBoolean(input.attr('data-is_read_only'));
    if (!is_super && !is_read_only) {
      input.on('focus click', function (event, ui) {
        $(this).autocomplete('search', '');
      });
    }
  });
  $('[data-is_attribute_input]').each(function (key, value) {
    var input = $(value);
    var id = input.attr('data-id_attribute') || null;
    var locale_code = input.attr('data-locale_code') || null;
    var is_read_only = castToBoolean(input.attr('data-is_read_only'));
    if (!is_read_only) {
      input.on('dblclick', function (event, ui) {
        $(this).autocomplete('search', '');
      });
    }
    input.autocomplete({
      minLength: 0,
      source: function (request, response) {
        $.ajax({
          url: '/product-attribute-gui/attribute/suggest/',
          dataType: 'json',
          data: {
            q: request.term,
            id: id,
            locale_code: locale_code
          },
          success: function (data) {
            response($.map(data.values, function (item) {
              return {
                label: item.text,
                value: item.id
              };
            }));
          }
        });
      },
      change: function (event, ui) {
        var input = $(this);
        var value = input.val().trim();
        var selectedValue = ui.item ? ui.item.label : '';
        var inputType = input.attr('data-input_type');
        var allowInput = castToBoolean(input.attr('data-allow_input')) || inputType === 'multiselect';
        if (value === '') {
          input.attr('data-value', '');
          value = '';
        } else if (!allowInput) {
          value = selectedValue;
          input.attr('data-value', selectedValue);
        }
        input.val(value);
        input.attr('value', value);
        var span = input.parents('td').find('span');
        if (span) {
          span.text(value);
        }
      },
      select: function (event, ui) {
        var input = $(this);
        input.val(ui.item.label);
        input.attr('data-value', ui.item.value);
        return false;
      },
      focus: function (event, ui) {
        var input = $(this);
        input.val(ui.item.label);
        input.attr('data-value', ui.item.value);
        return false;
      }
    });
  });
}
$(document).ready(function () {
  var attributeManager = new AttributeManager();
  $('#addButton').on('click', function () {
    var input = $('#attribute_form_key');
    var dataTable = $('#productAttributesTable');
    var idAttribute = input.attr('data-value');
    var key = input.val().trim();
    attributeManager.addKey(key, idAttribute, dataTable);
    $('.remove-item').off('click').on('click', function (event, element) {
      var key = $(this).attr('data-key');
      attributeManager.addRemovedKey(key);
      removeActionHandler.call($(this));
    });
    return false;
  });
  $('.remove-item').off('click').on('click', function (event, element) {
    var key = $(this).attr('data-key');
    attributeManager.addRemovedKey(key);
    removeActionHandler.call($(this));
  });
  updateAttributeInputsWithAutoComplete();
  $('#attribute_form_key').autocomplete({
    minLength: 0,
    source: function (request, response) {
      $.ajax({
        url: '/product-attribute-gui/suggest/keys',
        dataType: 'json',
        data: {
          q: request.term
        },
        success: function (data) {
          response($.map(data, function (item) {
            return {
              label: item.key,
              value: item.attribute_id,
              allow_input: item.allow_input,
              is_super: item.is_super,
              input_type: item.input_type
            };
          }));
        }
      });
    },
    select: function (event, ui) {
      var input = $(this);
      input.val(ui.item.label);
      input.attr('data-key', ui.item.label);
      input.attr('data-value', ui.item.value);
      input.attr('data-allow_input', ui.item.allow_input);
      input.attr('data-is_super', ui.item.is_super);
      input.attr('data-input_type', ui.item.input_type);
      return false;
    },
    focus: function (event, ui) {
      var input = $(this);
      input.val(ui.item.label);
      input.attr('data-key', ui.item.label);
      input.attr('data-value', ui.item.value);
      input.attr('data-allow_input', ui.item.allow_input);
      input.attr('data-is_super', ui.item.is_super);
      input.attr('data-input_type', ui.item.input_type);
      return false;
    }
  });
  $('#attribute_values_form').submit(function (e) {
    e.preventDefault();
    return false;
  });
  var productAttributesTable = $('#productAttributesTable').DataTable({
    columnDefs: [{
      targets: -1,
      orderable: false
    }],
    destroy: true
  });
  $('#saveButton').on('click', function () {
    productAttributesTable.search('').draw(false);
    attributeManager.save();
  });
  $('#attribute_form').on('keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
      e.preventDefault();
      $('#addButton').trigger('click');
      return false;
    }
  });
});

/***/ }),

/***/ "./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-main.entry.js":
/*!**********************************************************************************************************!*\
  !*** ./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-main.entry.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/product-attribute */ "./vendor/spryker/product-attribute-gui/assets/Zed/js/modules/product-attribute.js");

/***/ }),

/***/ "./vendor/spryker/product-attribute-gui/assets/Zed/sass/main.scss":
/*!************************************************************************!*\
  !*** ./vendor/spryker/product-attribute-gui/assets/Zed/sass/main.scss ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/product-attribute-gui/assets/Zed/js/spryker-zed-productattributegui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1wcm9kdWN0YXR0cmlidXRlZ3VpLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxtQkFBTyxDQUFDLDhGQUFzQixDQUFDO0FBRS9CLFNBQVNDLGFBQWFBLENBQUNDLE1BQU0sRUFBRTtFQUMzQixPQUFPQSxNQUFNLEtBQUssTUFBTSxJQUFJQSxNQUFNLEtBQUssR0FBRyxJQUFJQSxNQUFNLEtBQUssQ0FBQyxJQUFJQSxNQUFNLElBQUksTUFBTSxJQUFJQSxNQUFNLElBQUksSUFBSTtBQUNwRztBQUVBLFNBQVNDLGdCQUFnQkEsQ0FBQSxFQUFHO0VBQ3hCLElBQUlDLGlCQUFpQixHQUFHO0lBQ3BCQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDcEJDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDbEJDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDWEMsV0FBVyxFQUFFO0VBQ2pCLENBQUM7RUFFRCxJQUFJQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0VBRW5CQSxVQUFVLENBQUNDLElBQUksR0FBRyxVQUFVQyxLQUFLLEVBQUU7SUFDL0IsSUFBSUMsSUFBSSxHQUFHQyxDQUFDLENBQUNGLEtBQUssQ0FBQyxDQUFDRyxJQUFJLENBQUMsQ0FBQztJQUMxQixPQUFPQyxJQUFJLENBQUNDLEtBQUssQ0FBQ0osSUFBSSxDQUFDO0VBQzNCLENBQUM7RUFFRFIsaUJBQWlCLENBQUNhLElBQUksR0FBRyxZQUFZO0lBQ2pDYixpQkFBaUIsQ0FBQ0MsZ0JBQWdCLEdBQUdJLFVBQVUsQ0FBQ0MsSUFBSSxDQUFDRyxDQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUNqRlQsaUJBQWlCLENBQUNFLGNBQWMsR0FBR0csVUFBVSxDQUFDQyxJQUFJLENBQUNHLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVFVCxpQkFBaUIsQ0FBQ0csT0FBTyxHQUFHRSxVQUFVLENBQUNDLElBQUksQ0FB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QVUsRUFBRSxVQUFVeUIsQ0FBQyxFQUFFO0lBQzdDLElBQUlRLE9BQU8sR0FBR1IsQ0FBQyxDQUFDUSxPQUFPLElBQUlSLENBQUMsQ0FBQ1MsS0FBSztJQUNsQyxJQUFJRCxPQUFPLEtBQUssRUFBRSxFQUFFO01BQ2hCUixDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO01BQ2xCckksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDOEksT0FBTyxDQUFDLE9BQU8sQ0FBQztNQUNoQyxPQUFPLEtBQUs7SUFDaEI7RUFDSixDQUFDLENBQUM7QUFDTixDQUFDLENBQUM7Ozs7Ozs7Ozs7QUNuZ0JGO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViM0osbUJBQU8sQ0FBQyxzSEFBNkIsQ0FBQzs7Ozs7Ozs7Ozs7QUNQdEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWF0dHJpYnV0ZS1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3Byb2R1Y3QtYXR0cmlidXRlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL3Byb2R1Y3QtYXR0cmlidXRlLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLXByb2R1Y3RhdHRyaWJ1dGVndWktbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9wcm9kdWN0LWF0dHJpYnV0ZS1ndWkvYXNzZXRzL1plZC9zYXNzL21haW4uc2Nzcz8yZTUxIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vLi4vc2Fzcy9tYWluLnNjc3MnKTtcblxuZnVuY3Rpb24gY2FzdFRvQm9vbGVhbigkdmFsdWUpIHtcbiAgICByZXR1cm4gJHZhbHVlID09PSAndHJ1ZScgfHwgJHZhbHVlID09PSAnMScgfHwgJHZhbHVlID09PSAxIHx8ICR2YWx1ZSA9PSAndHJ1ZScgfHwgJHZhbHVlID09IHRydWU7XG59XG5cbmZ1bmN0aW9uIEF0dHJpYnV0ZU1hbmFnZXIoKSB7XG4gICAgdmFyIF9hdHRyaWJ1dGVNYW5hZ2VyID0ge1xuICAgICAgICBhdHRyaWJ1dGVzVmFsdWVzOiB7fSxcbiAgICAgICAgbWV0YUF0dHJpYnV0ZXM6IHt9LFxuICAgICAgICBsb2NhbGVzOiB7fSxcbiAgICAgICAgcmVtb3ZlZEtleXM6IFtdLFxuICAgIH07XG5cbiAgICB2YXIganNvbkxvYWRlciA9IHt9O1xuXG4gICAganNvbkxvYWRlci5sb2FkID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBqc29uID0gJChpbnB1dCkuaHRtbCgpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShqc29uKTtcbiAgICB9O1xuXG4gICAgX2F0dHJpYnV0ZU1hbmFnZXIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX2F0dHJpYnV0ZU1hbmFnZXIuYXR0cmlidXRlc1ZhbHVlcyA9IGpzb25Mb2FkZXIubG9hZCgkKCcjcHJvZHVjdEF0dHJpYnV0ZXNKc29uJykpO1xuICAgICAgICBfYXR0cmlidXRlTWFuYWdlci5tZXRhQXR0cmlidXRlcyA9IGpzb25Mb2FkZXIubG9hZCgkKCcjbWV0YUF0dHJpYnV0ZXNKc29uJykpO1xuICAgICAgICBfYXR0cmlidXRlTWFuYWdlci5sb2NhbGVzID0ganNvbkxvYWRlci5sb2FkKCQoJyNsb2NhbGVzSnNvbicpKTtcbiAgICB9O1xuXG4gICAgX2F0dHJpYnV0ZU1hbmFnZXIuZ2V0TG9jYWxlQ29sbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9hdHRyaWJ1dGVNYW5hZ2VyLmxvY2FsZXM7XG4gICAgfTtcblxuICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLmV4dHJhY3RLZXlzRnJvbVRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgICAkKCcjcHJvZHVjdEF0dHJpYnV0ZXNUYWJsZSB0cicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAga2V5cy5wdXNoKCQodGhpcykuZmluZCgndGQ6Zmlyc3QnKS50ZXh0KCkudHJpbSgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfTtcblxuICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLnZhbGlkYXRlS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgY3VycmVudEtleXMgPSBfYXR0cmlidXRlTWFuYWdlci5leHRyYWN0S2V5c0Zyb21UYWJsZSgpO1xuXG4gICAgICAgIGlmICgkLmluQXJyYXkoa2V5LCBjdXJyZW50S2V5cykgPiAtMSkge1xuICAgICAgICAgICAgYWxlcnQoJ0F0dHJpYnV0ZSBcIicgKyBrZXkgKyAnXCIgYWxyZWFkeSBkZWZpbmVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0F0dHJpYnV0ZSA9IGZhbHNlO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QtYXR0cmlidXRlLWd1aS9zdWdnZXN0L2tleXMnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBxOiBrZXksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5rZXkgPT0ga2V5O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaGFzQXR0cmlidXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdBdHRyaWJ1dGUgXCInICsga2V5ICsgJ1wiIGRvZXNuXFwndCBleGlzdC4nKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLmhhc0tleUJlZW5Vc2VkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgY3VycmVudEtleXMgPSBfYXR0cmlidXRlTWFuYWdlci5leHRyYWN0S2V5c0Zyb21UYWJsZSgpO1xuXG4gICAgICAgIHJldHVybiAkLmluQXJyYXkoa2V5LCBjdXJyZW50S2V5cykgPiAwO1xuICAgIH07XG5cbiAgICBfYXR0cmlidXRlTWFuYWdlci5nZW5lcmF0ZURhdGFUb0FkZCA9IGZ1bmN0aW9uIChrZXksIGlkQXR0cmlidXRlLCBhdHRyaWJ1dGVNZXRhZGF0YSkge1xuICAgICAgICB2YXIgZGF0YVRvQWRkID0gW107XG4gICAgICAgIHZhciBsb2NhbGVzID0gX2F0dHJpYnV0ZU1hbmFnZXIuZ2V0TG9jYWxlQ29sbGVjdGlvbigpO1xuXG4gICAgICAgIGRhdGFUb0FkZC5wdXNoKGtleSk7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiBsb2NhbGVzKSB7XG4gICAgICAgICAgICB2YXIgbG9jYWxlRGF0YSA9IGxvY2FsZXNbaV07XG4gICAgICAgICAgICB2YXIgcmVhZE9ubHkgPSAnJztcblxuICAgICAgICAgICAgaWYgKGNhc3RUb0Jvb2xlYW4oYXR0cmlidXRlTWV0YWRhdGEuaXNfc3VwZXIpKSB7XG4gICAgICAgICAgICAgICAgcmVhZE9ubHkgPSAnIHJlYWRvbmx5PVwidHJ1ZVwiICc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpdGVtID1cbiAgICAgICAgICAgICAgICAnPGlucHV0IHR5cGU9XCInICtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVNZXRhZGF0YS5pbnB1dF90eXBlICtcbiAgICAgICAgICAgICAgICAnXCInICtcbiAgICAgICAgICAgICAgICAnIGNsYXNzPVwic3ByeWtlci1mb3JtLWF1dG9jb21wbGV0ZSBmb3JtLWNvbnRyb2wgdWktYXV0b2NvbXBsZXRlLWlucHV0IGt2X2F0dHJpYnV0ZV9hdXRvY29tcGxldGVcIiAnICtcbiAgICAgICAgICAgICAgICAnIGRhdGEtYWxsb3dfaW5wdXQ9XCInICtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVNZXRhZGF0YS5hbGxvd19pbnB1dCArXG4gICAgICAgICAgICAgICAgJ1wiJyArXG4gICAgICAgICAgICAgICAgJyBkYXRhLWlzX3N1cGVyPVwiJyArXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlTWV0YWRhdGEuaXNfc3VwZXIgK1xuICAgICAgICAgICAgICAgICdcIicgK1xuICAgICAgICAgICAgICAgICcgZGF0YS1pc19hdHRyaWJ1dGVfaW5wdXQgJyArXG4gICAgICAgICAgICAgICAgJyBkYXRhLWF0dHJpYnV0ZV9rZXk9XCInICtcbiAgICAgICAgICAgICAgICBrZXkgK1xuICAgICAgICAgICAgICAgICdcIiAnICtcbiAgICAgICAgICAgICAgICAnIHZhbHVlPVwiXCIgJyArXG4gICAgICAgICAgICAgICAgJyBkYXRhLWlkX2F0dHJpYnV0ZT1cIicgK1xuICAgICAgICAgICAgICAgIGlkQXR0cmlidXRlICtcbiAgICAgICAgICAgICAgICAnXCIgJyArXG4gICAgICAgICAgICAgICAgJyBkYXRhLWxvY2FsZV9jb2RlPVwiJyArXG4gICAgICAgICAgICAgICAgbG9jYWxlRGF0YVsnbG9jYWxlX25hbWUnXSArXG4gICAgICAgICAgICAgICAgJ1wiICcgK1xuICAgICAgICAgICAgICAgICcgZGF0YS1pbnB1dF90eXBlPVwiJyArXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlTWV0YWRhdGEuaW5wdXRfdHlwZSArXG4gICAgICAgICAgICAgICAgJ1wiJyArXG4gICAgICAgICAgICAgICAgcmVhZE9ubHkgK1xuICAgICAgICAgICAgICAgICc+JyArXG4gICAgICAgICAgICAgICAgJzxzcGFuIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPjwvc3Bhbj4nO1xuXG4gICAgICAgICAgICBkYXRhVG9BZGQucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZW1vdmVCdXR0b25IdG1sID1cbiAgICAgICAgICAgICc8ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjogbGVmdDtcIj48YSBkYXRhLWtleT1cIicgK1xuICAgICAgICAgICAga2V5ICtcbiAgICAgICAgICAgICdcIiBocmVmPVwiI1wiIGNsYXNzPVwiYnRuIGJ0bi14cyBidG4tb3V0bGluZSBidG4tZGFuZ2VyIHJlbW92ZS1pdGVtXCI+UmVtb3ZlPC9hPic7XG5cbiAgICAgICAgaWYgKGF0dHJpYnV0ZU1ldGFkYXRhLmlucHV0X3R5cGUgPT09ICdtdWx0aXNlbGVjdCcpIHtcbiAgICAgICAgICAgIHJlbW92ZUJ1dHRvbkh0bWwgKz0gJzxzcGFuIGNsYXNzPVwiaGFzLWVycm9yIGhlbHAtYmxvY2tcIj5Vc2UgY29tbWEgc2VwYXJhdG9yLjwvc3Bhbj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YVRvQWRkLnB1c2gocmVtb3ZlQnV0dG9uSHRtbCArICc8L2Rpdj4nKTtcblxuICAgICAgICByZXR1cm4gZGF0YVRvQWRkO1xuICAgIH07XG5cbiAgICBfYXR0cmlidXRlTWFuYWdlci5hZGRLZXkgPSBmdW5jdGlvbiAoa2V5LCBpZEF0dHJpYnV0ZSwgZGF0YVRhYmxlKSB7XG4gICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC8oW15hLXowLTlcXF9cXC1cXDpdKykvZ2ksICcnKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICcnIHx8ICFpZEF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgdmFyICRtZXNzYWdlSW5wdXQgPSAkKCcjZW1wdHktYXR0cmlidXRlLWtleS1tZXNzYWdlJyk7XG5cbiAgICAgICAgICAgIGFsZXJ0KCRtZXNzYWdlSW5wdXQgPyAkbWVzc2FnZUlucHV0LnZhbCgpIDogJ1BsZWFzZSBzZWxlY3QgYXR0cmlidXRlIGtleSBmaXJzdCcpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIV9hdHRyaWJ1dGVNYW5hZ2VyLnZhbGlkYXRlS2V5KGtleSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBrZXlJbnB1dCA9ICQoJyNhdHRyaWJ1dGVfZm9ybV9rZXknKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU1ldGFkYXRhID0ge1xuICAgICAgICAgICAga2V5OiBrZXlJbnB1dC5hdHRyKCdkYXRhLWtleScpLFxuICAgICAgICAgICAgaWQ6IGtleUlucHV0LmF0dHIoJ2RhdGEtdmFsdWUnKSxcbiAgICAgICAgICAgIGFsbG93X2lucHV0OiBjYXN0VG9Cb29sZWFuKGtleUlucHV0LmF0dHIoJ2RhdGEtYWxsb3dfaW5wdXQnKSksXG4gICAgICAgICAgICBpc19zdXBlcjogY2FzdFRvQm9vbGVhbihrZXlJbnB1dC5hdHRyKCdkYXRhLWlzX3N1cGVyJykpLFxuICAgICAgICAgICAgaW5wdXRfdHlwZToga2V5SW5wdXQuYXR0cignZGF0YS1pbnB1dF90eXBlJyksXG4gICAgICAgIH07XG5cbiAgICAgICAgX2F0dHJpYnV0ZU1hbmFnZXIucmVzZXRSZW1vdmVkS2V5KGtleSk7XG5cbiAgICAgICAgdmFyIGRhdGFUb0FkZCA9IF9hdHRyaWJ1dGVNYW5hZ2VyLmdlbmVyYXRlRGF0YVRvQWRkKGtleSwgaWRBdHRyaWJ1dGUsIGF0dHJpYnV0ZU1ldGFkYXRhKTtcblxuICAgICAgICBkYXRhVGFibGUuRGF0YVRhYmxlKCkucm93LmFkZChkYXRhVG9BZGQpLmRyYXcodHJ1ZSk7XG5cbiAgICAgICAgdXBkYXRlQXR0cmlidXRlSW5wdXRzV2l0aEF1dG9Db21wbGV0ZSgpO1xuICAgIH07XG5cbiAgICBfYXR0cmlidXRlTWFuYWdlci5hZGRSZW1vdmVkS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBfYXR0cmlidXRlTWFuYWdlci5yZW1vdmVkS2V5cy5wdXNoKGtleSk7XG4gICAgfTtcblxuICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLnJlc2V0UmVtb3ZlZEtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgX2F0dHJpYnV0ZU1hbmFnZXIucmVtb3ZlZEtleXMgPSBfYXR0cmlidXRlTWFuYWdlci5yZW1vdmVkS2V5cy5maWx0ZXIoZnVuY3Rpb24gKHJlbW92ZWRLZXkpIHtcbiAgICAgICAgICAgIHJldHVybiByZW1vdmVkS2V5ICE9PSBrZXk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBfYXR0cmlidXRlTWFuYWdlci5yZXNldFJlbW92ZWRLZXlzQ2FjaGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLnJlbW92ZWRLZXlzID0gW107XG4gICAgfTtcblxuICAgIF9hdHRyaWJ1dGVNYW5hZ2VyLnNhdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsb2NhbGVzID0gX2F0dHJpYnV0ZU1hbmFnZXIuZ2V0TG9jYWxlQ29sbGVjdGlvbigpO1xuICAgICAgICB2YXIgZm9ybSA9ICQoJ2Zvcm0jYXR0cmlidXRlX3ZhbHVlc19mb3JtJyk7XG4gICAgICAgIHZhciBpZFByb2R1Y3RBYnN0cmFjdCA9ICQoJyNhdHRyaWJ1dGVfdmFsdWVzX2Zvcm1faGlkZGVuX3Byb2R1Y3RfYWJzdHJhY3RfaWQnKS52YWwoKTtcbiAgICAgICAgdmFyIGlkUHJvZHVjdCA9ICQoJyNhdHRyaWJ1dGVfdmFsdWVzX2Zvcm1faGlkZGVuX3Byb2R1Y3RfaWQnKS52YWwoKTtcbiAgICAgICAgdmFyIGNzcmZUb2tlbiA9ICQoJyNjc3JmLXRva2VuJykudmFsKCk7XG4gICAgICAgIHZhciBmb3JtRGF0YSA9IFtdO1xuXG4gICAgICAgICQoJ1tkYXRhLWlzX2F0dHJpYnV0ZV9pbnB1dF0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodmFsdWUpO1xuICAgICAgICAgICAgdmFyIGF0dHJpYnV0ZVZhbHVlID0gaW5wdXQudmFsKCk7XG4gICAgICAgICAgICB2YXIgaWRBdHRyaWJ1dGUgPSBpbnB1dC5hdHRyKCdkYXRhLWlkX2F0dHJpYnV0ZScpIHx8IG51bGw7XG4gICAgICAgICAgICB2YXIgbG9jYWxlX2NvZGUgPSBpbnB1dC5hdHRyKCdkYXRhLWxvY2FsZV9jb2RlJykgfHwgbnVsbDtcbiAgICAgICAgICAgIHZhciBrZXkgPSBpbnB1dC5hdHRyKCdkYXRhLWF0dHJpYnV0ZV9rZXknKSB8fCBudWxsO1xuICAgICAgICAgICAgdmFyIGlucHV0VHlwZSA9IGlucHV0LmF0dHIoJ2RhdGEtaW5wdXRfdHlwZScpIHx8IG51bGw7XG5cbiAgICAgICAgICAgIGZvcm1EYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGtleToga2V5LFxuICAgICAgICAgICAgICAgIGlkOiBpZEF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBsb2NhbGVfY29kZTogbG9jYWxlX2NvZGUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IGF0dHJpYnV0ZVZhbHVlLFxuICAgICAgICAgICAgICAgIGlucHV0X3R5cGU6IGlucHV0VHlwZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKF9hdHRyaWJ1dGVNYW5hZ2VyLnJlbW92ZWRLZXlzKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgcmVtb3ZlZEtleSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBsb2NhbGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsZSA9IGxvY2FsZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGxvY2FsZU5hbWUgPSBsb2NhbGVbJ2xvY2FsZV9uYW1lJ107XG5cbiAgICAgICAgICAgICAgICBmb3JtRGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiByZW1vdmVkS2V5LFxuICAgICAgICAgICAgICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlX2NvZGU6IGxvY2FsZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIGZvcm1EYXRhSnNvbiA9IEpTT04uc3RyaW5naWZ5KGZvcm1EYXRhKTtcbiAgICAgICAgdmFyIGFjdGlvblVybCA9IGZvcm0uYXR0cignYWN0aW9uJyk7XG5cbiAgICAgICAgdmFyIGFjdGlvbkRhdGEgPSB7XG4gICAgICAgICAgICBqc29uOiBmb3JtRGF0YUpzb24sXG4gICAgICAgICAgICAnaWQtcHJvZHVjdC1hYnN0cmFjdCc6IGlkUHJvZHVjdEFic3RyYWN0LFxuICAgICAgICAgICAgJ2lkLXByb2R1Y3QnOiBpZFByb2R1Y3QsXG4gICAgICAgICAgICAnY3NyZi10b2tlbic6IGNzcmZUb2tlbixcbiAgICAgICAgfTtcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBhY3Rpb25VcmwsXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgZGF0YTogJC5wYXJhbShhY3Rpb25EYXRhKSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoanFYSFIpIHtcbiAgICAgICAgICAgICAgICBpZiAoanFYSFIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBfYXR0cmlidXRlTWFuYWdlci5yZXNldFJlbW92ZWRLZXlzQ2FjaGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAkKCcjc2F2ZUJ1dHRvbicpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpLnZhbCgnU2F2ZScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJ0FuIGVycm9yIGhhcyBvY2N1cnJlZCc7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXNwb25zZURhdGEgPSBKU09OLnBhcnNlKGpxWEhSLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZURhdGEuaGFzT3duUHJvcGVydHkoJ21lc3NhZ2UnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3BvbnNlRGF0YS5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGpxWEhSLnN0YXR1cyA9PT0gMjAwID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBqcVhIUi5zdGF0dXMgPT09IDIwMCA/ICdzdWNjZXNzJyA6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChqcVhIUi5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgnI3NhdmVCdXR0b24nKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpLnZhbCgnU2F2aW5nJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgX2F0dHJpYnV0ZU1hbmFnZXIuaW5pdCgpO1xuXG4gICAgcmV0dXJuIF9hdHRyaWJ1dGVNYW5hZ2VyO1xufVxuXG4vKipcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcGFyYW0gcGFyYW1zXG4gKiBAcmV0dXJucyB7e3Jlc3VsdHM6ICosIHBhZ2luYXRpb246IHttb3JlOiAoYm9vbGVhbnxudW1iZXIpfX19XG4gKi9cbmZ1bmN0aW9uIHByb2Nlc3NBamF4UmVzdWx0KGRhdGEsIHBhcmFtcykge1xuICAgIC8ve1wiaWRfYXR0cmlidXRlXCI6MSxcInZhbHVlc1wiOlt7XCJpZF9wcm9kdWN0X21hbmFnZW1lbnRfYXR0cmlidXRlX3ZhbHVlXCI6MSxcImZrX2xvY2FsZVwiOjY2LFwidmFsdWVcIjpcImludGVsLWF0b20tcXVhZC1jb3JlXCIsXCJ0cmFuc2xhdGlvblwiOlwiSW50ZWwgQXRvbSBaMzU2MCBRdWFkLUNvcmUgVVNcIn1dfVxuICAgIC8vIHBhcnNlIHRoZSByZXN1bHRzIGludG8gdGhlIGZvcm1hdCBleHBlY3RlZCBieSBTZWxlY3QyXG4gICAgLy8gc2luY2Ugd2UgYXJlIHVzaW5nIGN1c3RvbSBmb3JtYXR0aW5nIGZ1bmN0aW9ucyB3ZSBkbyBub3QgbmVlZCB0b1xuICAgIC8vIGFsdGVyIHRoZSByZW1vdGUgSlNPTiBkYXRhLCBleGNlcHQgdG8gaW5kaWNhdGUgdGhhdCBpbmZpbml0ZVxuICAgIC8vIHNjcm9sbGluZyBjYW4gYmUgdXNlZFxuICAgIHBhcmFtcy5wYWdlID0gcGFyYW1zLnBhZ2UgfHwgMTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlc3VsdHM6IGRhdGEudmFsdWVzLFxuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICBtb3JlOiBwYXJhbXMucGFnZSAqIDMwIDwgZGF0YS50b3RhbCB8fCAwLFxuICAgICAgICB9LFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUFjdGlvbkhhbmRsZXIoKSB7XG4gICAgdmFyICRsaW5rID0gJCh0aGlzKTtcbiAgICB2YXIgZGF0YVRhYmxlID0gJCgnI3Byb2R1Y3RBdHRyaWJ1dGVzVGFibGUnKS5EYXRhVGFibGUoKTtcblxuICAgIC8qJGxpbmsucGFyZW50cygndHInKS5maW5kKFwidGQgaW5wdXRcIikuZWFjaChmdW5jdGlvbihpbmRleCwgaW5wdXQpIHtcbiAgICAgICAgJChpbnB1dCkudmFsKCcnKTtcbiAgICB9KTtcbiAgICAkbGluay5wYXJlbnRzKCd0cicpLmhpZGUoKTsqL1xuXG4gICAgZGF0YVRhYmxlLnJvdygkbGluay5wYXJlbnRzKCd0cicpKS5yZW1vdmUoKS5kcmF3KCk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF0dHJpYnV0ZUlucHV0c1dpdGhBdXRvQ29tcGxldGUoKSB7XG4gICAgJCgnW2RhdGEtYWxsb3dfaW5wdXQ9XCJcIl0sW2RhdGEtYWxsb3dfaW5wdXQ9XCJmYWxzZVwiXSxbZGF0YS1hbGxvd19pbnB1dD1cIjBcIl0nKS5lYWNoKGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBpbnB1dCA9ICQodmFsdWUpO1xuICAgICAgICB2YXIgaXNfc3VwZXIgPSBjYXN0VG9Cb29sZWFuKGlucHV0LmF0dHIoJ2RhdGEtaXNfc3VwZXInKSk7XG4gICAgICAgIHZhciBpc19yZWFkX29ubHkgPSBjYXN0VG9Cb29sZWFuKGlucHV0LmF0dHIoJ2RhdGEtaXNfcmVhZF9vbmx5JykpO1xuXG4gICAgICAgIGlmICghaXNfc3VwZXIgJiYgIWlzX3JlYWRfb25seSkge1xuICAgICAgICAgICAgaW5wdXQub24oJ2ZvY3VzIGNsaWNrJywgZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKCdzZWFyY2gnLCAnJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtaXNfYXR0cmlidXRlX2lucHV0XScpLmVhY2goZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gJCh2YWx1ZSk7XG4gICAgICAgIHZhciBpZCA9IGlucHV0LmF0dHIoJ2RhdGEtaWRfYXR0cmlidXRlJykgfHwgbnVsbDtcbiAgICAgICAgdmFyIGxvY2FsZV9jb2RlID0gaW5wdXQuYXR0cignZGF0YS1sb2NhbGVfY29kZScpIHx8IG51bGw7XG4gICAgICAgIHZhciBpc19yZWFkX29ubHkgPSBjYXN0VG9Cb29sZWFuKGlucHV0LmF0dHIoJ2RhdGEtaXNfcmVhZF9vbmx5JykpO1xuXG4gICAgICAgIGlmICghaXNfcmVhZF9vbmx5KSB7XG4gICAgICAgICAgICBpbnB1dC5vbignZGJsY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoJ3NlYXJjaCcsICcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQuYXV0b2NvbXBsZXRlKHtcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMCxcbiAgICAgICAgICAgIHNvdXJjZTogZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QtYXR0cmlidXRlLWd1aS9hdHRyaWJ1dGUvc3VnZ2VzdC8nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBxOiByZXF1ZXN0LnRlcm0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGVfY29kZTogbG9jYWxlX2NvZGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLm1hcChkYXRhLnZhbHVlcywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpdGVtLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBpbnB1dC52YWwoKS50cmltKCk7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB1aS5pdGVtID8gdWkuaXRlbS5sYWJlbCA6ICcnO1xuICAgICAgICAgICAgICAgIHZhciBpbnB1dFR5cGUgPSBpbnB1dC5hdHRyKCdkYXRhLWlucHV0X3R5cGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWxsb3dJbnB1dCA9IGNhc3RUb0Jvb2xlYW4oaW5wdXQuYXR0cignZGF0YS1hbGxvd19pbnB1dCcpKSB8fCBpbnB1dFR5cGUgPT09ICdtdWx0aXNlbGVjdCc7XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoJ2RhdGEtdmFsdWUnLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghYWxsb3dJbnB1dCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoJ2RhdGEtdmFsdWUnLCBzZWxlY3RlZFZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodmFsdWUpO1xuICAgICAgICAgICAgICAgIGlucHV0LmF0dHIoJ3ZhbHVlJywgdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwYW4gPSBpbnB1dC5wYXJlbnRzKCd0ZCcpLmZpbmQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICBpZiAoc3Bhbikge1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnRleHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbCh1aS5pdGVtLmxhYmVsKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLXZhbHVlJywgdWkuaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBpbnB1dC52YWwodWkuaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICAgICAgaW5wdXQuYXR0cignZGF0YS12YWx1ZScsIHVpLml0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGF0dHJpYnV0ZU1hbmFnZXIgPSBuZXcgQXR0cmlidXRlTWFuYWdlcigpO1xuXG4gICAgJCgnI2FkZEJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gJCgnI2F0dHJpYnV0ZV9mb3JtX2tleScpO1xuICAgICAgICB2YXIgZGF0YVRhYmxlID0gJCgnI3Byb2R1Y3RBdHRyaWJ1dGVzVGFibGUnKTtcbiAgICAgICAgdmFyIGlkQXR0cmlidXRlID0gaW5wdXQuYXR0cignZGF0YS12YWx1ZScpO1xuICAgICAgICB2YXIga2V5ID0gaW5wdXQudmFsKCkudHJpbSgpO1xuXG4gICAgICAgIGF0dHJpYnV0ZU1hbmFnZXIuYWRkS2V5KGtleSwgaWRBdHRyaWJ1dGUsIGRhdGFUYWJsZSk7XG5cbiAgICAgICAgJCgnLnJlbW92ZS1pdGVtJylcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJylcbiAgICAgICAgICAgIC5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gJCh0aGlzKS5hdHRyKCdkYXRhLWtleScpO1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZU1hbmFnZXIuYWRkUmVtb3ZlZEtleShrZXkpO1xuICAgICAgICAgICAgICAgIHJlbW92ZUFjdGlvbkhhbmRsZXIuY2FsbCgkKHRoaXMpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgICQoJy5yZW1vdmUtaXRlbScpXG4gICAgICAgIC5vZmYoJ2NsaWNrJylcbiAgICAgICAgLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCwgZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGtleSA9ICQodGhpcykuYXR0cignZGF0YS1rZXknKTtcbiAgICAgICAgICAgIGF0dHJpYnV0ZU1hbmFnZXIuYWRkUmVtb3ZlZEtleShrZXkpO1xuICAgICAgICAgICAgcmVtb3ZlQWN0aW9uSGFuZGxlci5jYWxsKCQodGhpcykpO1xuICAgICAgICB9KTtcblxuICAgIHVwZGF0ZUF0dHJpYnV0ZUlucHV0c1dpdGhBdXRvQ29tcGxldGUoKTtcblxuICAgICQoJyNhdHRyaWJ1dGVfZm9ybV9rZXknKS5hdXRvY29tcGxldGUoe1xuICAgICAgICBtaW5MZW5ndGg6IDAsXG4gICAgICAgIHNvdXJjZTogZnVuY3Rpb24gKHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0LWF0dHJpYnV0ZS1ndWkvc3VnZ2VzdC9rZXlzJyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgcTogcmVxdWVzdC50ZXJtLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAkLm1hcChkYXRhLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpdGVtLmtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0uYXR0cmlidXRlX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd19pbnB1dDogaXRlbS5hbGxvd19pbnB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNfc3VwZXI6IGl0ZW0uaXNfc3VwZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0X3R5cGU6IGl0ZW0uaW5wdXRfdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBzZWxlY3Q6IGZ1bmN0aW9uIChldmVudCwgdWkpIHtcbiAgICAgICAgICAgIHZhciBpbnB1dCA9ICQodGhpcyk7XG4gICAgICAgICAgICBpbnB1dC52YWwodWkuaXRlbS5sYWJlbCk7XG5cbiAgICAgICAgICAgIGlucHV0LmF0dHIoJ2RhdGEta2V5JywgdWkuaXRlbS5sYWJlbCk7XG4gICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLXZhbHVlJywgdWkuaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLWFsbG93X2lucHV0JywgdWkuaXRlbS5hbGxvd19pbnB1dCk7XG4gICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLWlzX3N1cGVyJywgdWkuaXRlbS5pc19zdXBlcik7XG4gICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLWlucHV0X3R5cGUnLCB1aS5pdGVtLmlucHV0X3R5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGZvY3VzOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XG4gICAgICAgICAgICB2YXIgaW5wdXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgaW5wdXQudmFsKHVpLml0ZW0ubGFiZWwpO1xuXG4gICAgICAgICAgICBpbnB1dC5hdHRyKCdkYXRhLWtleScsIHVpLml0ZW0ubGFiZWwpO1xuICAgICAgICAgICAgaW5wdXQuYXR0cignZGF0YS12YWx1ZScsIHVpLml0ZW0udmFsdWUpO1xuICAgICAgICAgICAgaW5wdXQuYXR0cignZGF0YS1hbGxvd19pbnB1dCcsIHVpLml0ZW0uYWxsb3dfaW5wdXQpO1xuICAgICAgICAgICAgaW5wdXQuYXR0cignZGF0YS1pc19zdXBlcicsIHVpLml0ZW0uaXNfc3VwZXIpO1xuICAgICAgICAgICAgaW5wdXQuYXR0cignZGF0YS1pbnB1dF90eXBlJywgdWkuaXRlbS5pbnB1dF90eXBlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9LFxuICAgIH0pO1xuXG4gICAgJCgnI2F0dHJpYnV0ZV92YWx1ZXNfZm9ybScpLnN1Ym1pdChmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIHZhciBwcm9kdWN0QXR0cmlidXRlc1RhYmxlID0gJCgnI3Byb2R1Y3RBdHRyaWJ1dGVzVGFibGUnKS5EYXRhVGFibGUoe1xuICAgICAgICBjb2x1bW5EZWZzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0czogLTEsXG4gICAgICAgICAgICAgICAgb3JkZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGRlc3Ryb3k6IHRydWUsXG4gICAgfSk7XG5cbiAgICAkKCcjc2F2ZUJ1dHRvbicpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvZHVjdEF0dHJpYnV0ZXNUYWJsZS5zZWFyY2goJycpLmRyYXcoZmFsc2UpO1xuICAgICAgICBhdHRyaWJ1dGVNYW5hZ2VyLnNhdmUoKTtcbiAgICB9KTtcblxuICAgICQoJyNhdHRyaWJ1dGVfZm9ybScpLm9uKCdrZXlwcmVzcycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBrZXlDb2RlID0gZS5rZXlDb2RlIHx8IGUud2hpY2g7XG4gICAgICAgIGlmIChrZXlDb2RlID09PSAxMykge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnI2FkZEJ1dHRvbicpLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCcuL21vZHVsZXMvcHJvZHVjdC1hdHRyaWJ1dGUnKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiY2FzdFRvQm9vbGVhbiIsIiR2YWx1ZSIsIkF0dHJpYnV0ZU1hbmFnZXIiLCJfYXR0cmlidXRlTWFuYWdlciIsImF0dHJpYnV0ZXNWYWx1ZXMiLCJtZXRhQXR0cmlidXRlcyIsImxvY2FsZXMiLCJyZW1vdmVkS2V5cyIsImpzb25Mb2FkZXIiLCJsb2FkIiwiaW5wdXQiLCJqc29uIiwiJCIsImh0bWwiLCJKU09OIiwicGFyc2UiLCJpbml0IiwiZ2V0TG9jYWxlQ29sbGVjdGlvbiIsImV4dHJhY3RLZXlzRnJvbVRhYmxlIiwia2V5cyIsImVhY2giLCJwdXNoIiwiZmluZCIsInRleHQiLCJ0cmltIiwidmFsaWRhdGVLZXkiLCJrZXkiLCJjdXJyZW50S2V5cyIsImluQXJyYXkiLCJhbGVydCIsImhhc0F0dHJpYnV0ZSIsImFqYXgiLCJ1cmwiLCJkYXRhVHlwZSIsImFzeW5jIiwiZGF0YSIsInEiLCJzdWNjZXNzIiwiZmlsdGVyIiwidmFsdWUiLCJsZW5ndGgiLCJoYXNLZXlCZWVuVXNlZCIsImdlbmVyYXRlRGF0YVRvQWRkIiwiaWRBdHRyaWJ1dGUiLCJhdHRyaWJ1dGVNZXRhZGF0YSIsImRhdGFUb0FkZCIsImkiLCJsb2NhbGVEYXRhIiwicmVhZE9ubHkiLCJpc19zdXBlciIsIml0ZW0iLCJpbnB1dF90eXBlIiwiYWxsb3dfaW5wdXQiLCJyZW1vdmVCdXR0b25IdG1sIiwiYWRkS2V5IiwiZGF0YVRhYmxlIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiJG1lc3NhZ2VJbnB1dCIsInZhbCIsImtleUlucHV0IiwiYXR0ciIsImlkIiwicmVzZXRSZW1vdmVkS2V5IiwiRGF0YVRhYmxlIiwicm93IiwiYWRkIiwiZHJhdyIsInVwZGF0ZUF0dHJpYnV0ZUlucHV0c1dpdGhBdXRvQ29tcGxldGUiLCJhZGRSZW1vdmVkS2V5IiwicmVtb3ZlZEtleSIsInJlc2V0UmVtb3ZlZEtleXNDYWNoZSIsInNhdmUiLCJmb3JtIiwiaWRQcm9kdWN0QWJzdHJhY3QiLCJpZFByb2R1Y3QiLCJjc3JmVG9rZW4iLCJmb3JtRGF0YSIsImluZGV4IiwiYXR0cmlidXRlVmFsdWUiLCJsb2NhbGVfY29kZSIsImlucHV0VHlwZSIsImxvY2FsZSIsImxvY2FsZU5hbWUiLCJmb3JtRGF0YUpzb24iLCJzdHJpbmdpZnkiLCJhY3Rpb25VcmwiLCJhY3Rpb25EYXRhIiwidHlwZSIsInBhcmFtIiwiY29tcGxldGUiLCJqcVhIUiIsInJlYWR5U3RhdGUiLCJwcm9wIiwibWVzc2FnZSIsInJlc3BvbnNlRGF0YSIsInJlc3BvbnNlVGV4dCIsImhhc093blByb3BlcnR5Iiwid2luZG93Iiwic3dlZXRBbGVydCIsInRpdGxlIiwic3RhdHVzIiwic2V0VGltZW91dCIsImxvY2F0aW9uIiwicmVsb2FkIiwiYmVmb3JlU2VuZCIsInByb2Nlc3NBamF4UmVzdWx0IiwicGFyYW1zIiwicGFnZSIsInJlc3VsdHMiLCJ2YWx1ZXMiLCJwYWdpbmF0aW9uIiwibW9yZSIsInRvdGFsIiwicmVtb3ZlQWN0aW9uSGFuZGxlciIsIiRsaW5rIiwicGFyZW50cyIsInJlbW92ZSIsImlzX3JlYWRfb25seSIsIm9uIiwiZXZlbnQiLCJ1aSIsImF1dG9jb21wbGV0ZSIsIm1pbkxlbmd0aCIsInNvdXJjZSIsInJlcXVlc3QiLCJyZXNwb25zZSIsInRlcm0iLCJtYXAiLCJsYWJlbCIsImNoYW5nZSIsInNlbGVjdGVkVmFsdWUiLCJhbGxvd0lucHV0Iiwic3BhbiIsInNlbGVjdCIsImZvY3VzIiwiZG9jdW1lbnQiLCJyZWFkeSIsImF0dHJpYnV0ZU1hbmFnZXIiLCJvZmYiLCJlbGVtZW50IiwiY2FsbCIsImF0dHJpYnV0ZV9pZCIsInN1Ym1pdCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInByb2R1Y3RBdHRyaWJ1dGVzVGFibGUiLCJjb2x1bW5EZWZzIiwidGFyZ2V0cyIsIm9yZGVyYWJsZSIsImRlc3Ryb3kiLCJzZWFyY2giLCJrZXlDb2RlIiwid2hpY2giLCJ0cmlnZ2VyIl0sInNvdXJjZVJvb3QiOiIifQ==