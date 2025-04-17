(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-slot-block-gui-main"],{

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-choice.js":
/*!**********************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-choice.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var BlocksChoice = function (options) {
  var _self = this;
  this.blocksChoiceFormSelector = {};
  this.$blocksChoiceForm = {};
  this.$blocksChoiceDropDown = {};
  this.blocksTable = {};
  this.blocksChoiceAddSelector = '[type=button]';
  $.extend(this, options);
  this.init = function () {
    _self.$blocksChoiceForm = $(_self.blocksChoiceFormSelector);
    _self.$blocksChoiceDropDown = _self.$blocksChoiceForm.find('select');
    _self.initSelect();
    _self.$blocksChoiceDropDown.on('change', _self.selectBlockChoice);
    _self.$blocksChoiceForm.on('click', _self.blocksChoiceAddSelector, _self.addBlock);
  };
  this.initSelect = function () {
    _self.blocksTable.resetModifiedBlocks();
    _self.$blocksChoiceDropDown.select2({
      ajax: {
        url: _self.baseUrl,
        dataType: 'json',
        data: function (params) {
          var paramsCollection = {};
          paramsCollection[_self.paramTerm] = params.term;
          paramsCollection[_self.paramPage] = params.page || 1;
          paramsCollection[_self.paramIdCmsSlotTemplate] = _self.blocksTable.idCmsSlotTemplate;
          paramsCollection[_self.paramIdCmsSlot] = _self.blocksTable.idCmsSlot;
          return paramsCollection;
        },
        processResults: function (data) {
          return {
            results: $.map(data.results, function (item) {
              item.disabled = item.disabled !== _self.blocksTable.isBlockModified(item.id);
              return item;
            }),
            pagination: data.pagination
          };
        },
        delay: 250,
        cache: true
      },
      templateSelection: function (container) {
        $(container.element).data('is-active', container.isActive).data('valid-from', container.validFrom).data('valid-to', container.validFrom).data('stores', container.stores);
        return container.text;
      }
    });
  };
  this.resetSelect = function () {
    _self.$blocksChoiceDropDown.val('').trigger('change');
  };
  this.selectBlockChoice = function () {
    var isSelected = _self.$blocksChoiceDropDown.val() !== '';
    $(_self.blocksChoiceAddSelector).toggleClass('btn-back', !isSelected).toggleClass('btn-primary', isSelected);
  };
  this.addBlock = function (event) {
    event.preventDefault();
    var $selectedBlock = _self.$blocksChoiceDropDown.find('option:selected');
    if (!$selectedBlock.val()) {
      return;
    }
    var blockData = {
      blockId: $selectedBlock.val(),
      blockName: $selectedBlock.text(),
      validFrom: $selectedBlock.data('valid-from'),
      validTo: $selectedBlock.data('valid-to'),
      isActive: $selectedBlock.data('is-active'),
      stores: $selectedBlock.data('stores')
    };
    _self.blocksTable.addRow(blockData);
    _self.resetSelect();
  };
};
module.exports = BlocksChoice;

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-table.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-table.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var dataTable = __webpack_require__(/*! ZedGuiModules/libs/data-table */ "./vendor/spryker/gui/assets/Zed/js/modules/libs/data-table.js");
var BlocksTable = function (options) {
  var _self = this;
  this.tableBaseUrl = '';
  this.blocksTableSelector = '';
  this.cmsSlotBlocksSelector = '';
  this.cmsSlotBlocksOverlaySelector = '';
  this.cmsSlotBlocksOverlayTogglerClass = '';
  this.viewBlockUrl = '';
  this.$cmsSlotBlocks = {};
  this.$blocksTable = {};
  this.slotBlocksForm = {};
  this.blocksChoiceFormSelector = '';
  this.$blocksChoiceDropDown = '';
  this.initOptionsState = [];
  this.initTableState = [];
  this.isFirstInit = true;
  this.isFirstTableRender = true;
  this.changeOrderButtonSelector = '.btn[data-direction]';
  this.removeButtonSelector = '.js-slot-block-remove-button';
  this.resetButtonSelector = '.js-slot-block-reset-button';
  this.rowUnsavedOverlaySelector = '.js-row-unsaved-overlay .ibox-content';
  this.selectedRowIndex = 0;
  this.tableIsUnsaved = false;
  this.modifiedBlocks = [];
  $.extend(this, options);
  this.init = function () {
    _self.$blocksTable = $(_self.blocksTableSelector);
    _self.initTableState = [];
    _self.$cmsSlotBlocks = $(_self.cmsSlotBlocksSelector);
    _self.$blocksChoiceDropDown = $(_self.blocksChoiceFormSelector).find('select');
    _self.isFirstTableRender = true;
    _self.slotBlocksForm.resolveIsUnsavedCallback = _self.resolveIsUnsaved;
    if (!_self.isFirstInit) {
      return;
    }
    $(document).on('savedBlocksForm', function () {
      _self.setInitTableState();
      _self.tableRowSelect();
      _self.resetModifiedBlocks();
    });
    _self.isFirstInit = false;
    _self.setInitOptionsState();
  };
  this.loadBlocksTable = function (params, idCmsSlotTemplate, idCmsSlot) {
    _self.idCmsSlotTemplate = idCmsSlotTemplate;
    _self.idCmsSlot = idCmsSlot;
    var ajaxUrl = _self.tableBaseUrl + '?' + params;
    _self.$blocksTable.data('ajax', ajaxUrl);
    _self.$blocksTable.DataTable({
      destroy: true,
      ajax: {
        cache: false
      },
      autoWidth: false,
      language: dataTable.defaultConfiguration.language,
      searching: false,
      info: false
    });
    _self.$blocksTable.DataTable().on('draw', function () {
      if (_self.isFirstTableRender === true) {
        _self.setInitTableState();
      }
      _self.resolveIsUnsaved(_self.isUnsaved());
      _self.initDataTableListeners(idCmsSlotTemplate, idCmsSlot);
      _self.tableRowSelect();
    });
    _self.$blocksTable.DataTable().on('preInit', function () {
      _self.isFirstTableRender = true;
    });
    _self.$blocksTable.DataTable().on('init', function () {
      _self.isFirstTableRender = false;
    });
  };
  this.initDataTableListeners = function (idCmsSlotTemplate, idCmsSlot) {
    _self.$blocksTable.on('processing.dt', function () {
      _self.overlayToggler(true);
    });
    _self.slotBlocksForm.rebuildForm(idCmsSlotTemplate, idCmsSlot, _self.$blocksTable.DataTable().rows().data(), _self.isUnsaved());
    _self.isFirstTableRender = false;
    _self.initActionButtonsListeners();
    $(_self.$blocksTable).find('tbody').on('click', 'tr', _self.tableRowSelect);
  };
  this.initActionButtonsListeners = function () {
    _self.$blocksTable.find(_self.changeOrderButtonSelector).on('click', _self.changeOrderButtonsHandler);
    _self.$blocksTable.find(_self.removeButtonSelector).on('click', _self.removeButtonsHandler);
    _self.$cmsSlotBlocks.find(_self.resetButtonSelector).off('click.resetSlotBlocks').on('click.resetSlotBlocks', _self.resetButtonsHandler);
  };
  this.updateTable = function (tableApi, tableData) {
    tableApi.rows().remove();
    tableApi.rows.add(tableData).draw();
    tableApi.rows({
      selected: true
    }).deselect();
    tableApi.row(_self.selectedRowIndex).select();
  };
  this.setInitTableState = function () {
    _self.initTableState = _self.getTable().data;
  };
  this.isBlockModified = function (id) {
    return _self.modifiedBlocks.includes(id);
  };
  this.resetModifiedBlocks = function () {
    _self.modifiedBlocks = [];
  };
  this.toggleIsModified = function (id) {
    var blockIndex = _self.modifiedBlocks.indexOf(id);
    if (blockIndex > -1) {
      _self.modifiedBlocks.splice(blockIndex, 1);
    } else {
      _self.modifiedBlocks.push(id);
    }
  };
  this.addRow = function () {
    let rowData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var blockId = Number(rowData.blockId);
    rowData = [blockId, rowData.blockName, rowData.validFrom, rowData.validTo, _self.getStatusLabel(rowData.isActive), _self.getStoresLabels(rowData.stores), _self.getActionButtons(rowData.blockId)];
    var table = _self.getTable();
    table.data.unshift(rowData);
    _self.updateTable(table.api, table.data);
    _self.toggleIsModified(blockId);
  };
  this.getActionButtons = function (blockId) {
    var $buttons = $(_self.$cmsSlotBlocks.data('actions-buttons-template'));
    var buttonsTemplate = '';
    $buttons.each(function () {
      var $button = $(this);
      if (!$button.is('a')) {
        return;
      }
      if ($button.hasClass('btn-view')) {
        $button.attr('href', _self.viewBlockUrl + '?id-cms-block=' + blockId);
      }
      buttonsTemplate += $button[0].outerHTML + ' ';
    });
    return buttonsTemplate;
  };
  this.getStatusLabel = function (isActive) {
    var statusLabel = isActive ? 'active-label-template' : 'inactive-label-template';
    return _self.$cmsSlotBlocks.data(statusLabel);
  };
  this.getStoresLabels = function (stores) {
    var $storeTemplate = $(_self.$cmsSlotBlocks.data('active-label-template'));
    var storesArray = stores.split(',');
    return storesArray.reduce(function (storesTemplate, store) {
      return storesTemplate + $storeTemplate.html(store)[0].outerHTML + ' ';
    }, '');
  };
  this.getTable = function () {
    return {
      api: _self.$blocksTable.dataTable().api(),
      data: _self.$blocksTable.dataTable().api().data().toArray()
    };
  };
  this.changeOrderButtonsHandler = function (event) {
    var clickInfo = _self.getClickInfo(event);
    var direction = clickInfo.$button.data('direction');
    var isRowFirst = clickInfo.$clickedTableRow === 0;
    var isRowLast = clickInfo.$clickedTableRow === clickInfo.$tableLength - 1;
    if (isRowFirst && direction === 'up' || isRowLast && direction === 'down') {
      return;
    }
    _self.changeOrderRow(clickInfo.$clickedTableRow, direction);
  };
  this.changeOrderRow = function (rowIndex, direction) {
    var table = _self.getTable();
    var newRowIndex = null;
    switch (direction) {
      case 'up':
        newRowIndex = rowIndex - 1;
        var tempRow = table.data[newRowIndex];
        table.data[newRowIndex] = table.data[rowIndex];
        table.data[rowIndex] = tempRow;
        break;
      case 'down':
        newRowIndex = rowIndex + 1;
        var tempRow = table.data[newRowIndex];
        table.data[newRowIndex] = table.data[rowIndex];
        table.data[rowIndex] = tempRow;
        break;
    }
    _self.updateTable(table.api, table.data);
  };
  this.removeButtonsHandler = function (event) {
    var clickInfo = _self.getClickInfo(event);
    var table = _self.getTable();
    var rowId = table.data[clickInfo.$clickedTableRow][0];
    _self.updateChoiceDropdown(rowId);
    table.data.splice(clickInfo.$clickedTableRow, 1);
    _self.updateTable(table.api, table.data);
  };
  this.setInitOptionsState = function () {
    _self.$blocksChoiceDropDown.find('option').each(function () {
      _self.initOptionsState.push($(this).prop('disabled'));
    });
  };
  this.updateChoiceDropdown = function (blockId) {
    _self.toggleIsModified(Number(blockId));
  };
  this.resetChoiceDropdown = function () {
    _self.$blocksChoiceDropDown.children('option').each(function (index) {
      $(this).prop('disabled', _self.initOptionsState[index]);
    });
    _self.$blocksChoiceDropDown.select2();
  };
  this.resetHandlerCallback = function () {};
  this.resetButtonsHandler = function () {
    if (!_self.isUnsaved()) {
      return;
    }
    _self.tableIsUnsaved = false;
    _self.slotBlocksForm.isStateChanged = false;
    _self.toggleRowOverlay(false);
    _self.toggleResetButton(false);
    _self.resetHandlerCallback();
  };
  this.toggleRowOverlay = function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _self.isUnsaved();
    var $rowUnsavedOverlay = $(_self.rowUnsavedOverlaySelector);
    state = state === undefined ? true : !!state;
    $rowUnsavedOverlay.each(function (i, element) {
      var $element = $(element);
      if (state && $element.find('.js-row-overlay').length === 0) {
        var $overlay = $('<div/>').addClass('js-row-overlay');
        $element.append($overlay).addClass('js-row-overlayed');
        $overlay.on('click', function () {
          _self.showAlert();
        });
        $overlay.show();
      } else if (!state) {
        $element.removeClass('js-row-overlayed').find('.js-row-overlay').remove();
      }
    });
  };
  this.toggleResetButton = function () {
    let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _self.isUnsaved();
    $(_self.resetButtonSelector).toggleClass('hidden', !state);
  };
  this.getClickInfo = function (event) {
    return {
      $button: $(event.currentTarget),
      $clickedTableRow: $(event.currentTarget).parents('tr').index(),
      $tableLength: $(event.currentTarget).parents('tbody').children('tr').length
    };
  };
  this.isUnsaved = function () {
    return _self.tableIsUnsaved;
  };
  this.resolveIsUnsaved = function (isUnsaved) {
    if (!isUnsaved) {
      isUnsaved = _self.checkTableState();
    }
    if (isUnsaved !== _self.tableIsUnsaved) {
      _self.toggleRowOverlay(isUnsaved);
      _self.toggleResetButton(isUnsaved);
    }
    _self.tableIsUnsaved = isUnsaved;
    return _self.tableIsUnsaved;
  };
  this.checkTableState = function () {
    var initTableState = _self.initTableState;
    var currentTableState = _self.getTable().data;
    if (initTableState.length !== currentTableState.length) {
      return true;
    }
    return initTableState.some(function (item, index) {
      return item[0] !== currentTableState[index][0];
    });
  };
  this.overlayToggler = function (state) {
    $(_self.cmsSlotBlocksOverlaySelector).toggleClass(_self.cmsSlotBlocksOverlayTogglerClass, state);
  };
  this.tableRowSelect = function (element) {
    var rowIndex = _self.selectedRowIndex;
    if ($(_self.$blocksTable).DataTable().rows().count() < 1) {
      return;
    }
    if (element !== undefined && $(element.target).is('td')) {
      rowIndex = $(this).index();
      _self.selectedRowIndex = rowIndex;
    }
    var row = _self.$blocksTable.DataTable().row(rowIndex);
    _self.$blocksTable.DataTable().rows().deselect();
    row.select();
    var idCmsBlock = row.data()[0];
    $('.js-cms-slot-block-form-item').hide();
    var cmsSlotBlockFormItem = $('#js-cms-slot-block-form-item-' + idCmsBlock);
    _self.slotBlocksForm.toggleEnablementFromBlocksTable(cmsSlotBlockFormItem);
    cmsSlotBlockFormItem.show();
  };
  this.showAlert = function () {
    var $cmsSlotBlock = _self.$cmsSlotBlocks;
    window.sweetAlert({
      title: $cmsSlotBlock.data('alert-title'),
      html: false,
      showCloseButton: true,
      customClass: 'cms-slot-blocks-alert',
      confirmButtonColor: '#1ab394',
      confirmButtonText: $cmsSlotBlock.data('alert-go-back-button')
    });
  };
  this.toggleTableRow = function (state) {
    var $blocksTable = $(_self.blocksTableSelector);
    if (!state) {
      $blocksTable.closest('.wrapper > .row').hide();
      _self.toggleRowOverlay(false);
      _self.toggleResetButton(false);
      return;
    }
    $blocksTable.closest('.wrapper > .row').show();
  };
};
module.exports = BlocksTable;

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/main.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/main.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SlotBlocks = __webpack_require__(/*! ./slot-blocks */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks.js");
var BlocksTable = __webpack_require__(/*! ./blocks-table */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-table.js");
var BlocksChoice = __webpack_require__(/*! ./blocks-choice */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/blocks-choice.js");
var SlotBlocksForm = __webpack_require__(/*! ./slot-blocks-form */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks-form.js");
$(document).ready(function () {
  var blocksChoiceFormSelector = '[name=block-choice]';
  var cmsSlotBlocksSelector = '.js-cms-slot-blocks';
  var slotBlocksForm = new SlotBlocksForm({
    cmsSlotBlocksSelector: cmsSlotBlocksSelector,
    slotBlockFormItemClass: '.js-cms-slot-block-form-item',
    slotBlockFormItemIdPrefix: '#js-cms-slot-block-form-item-',
    slotBlockFormWrapperId: '#js-cms-slot-block-form-inner-wrapper'
  });
  var blocksTable = new BlocksTable({
    tableBaseUrl: '/cms-slot-block-gui/slot-block/table',
    blocksTableSelector: '.js-cms-slot-block-table',
    cmsSlotBlocksSelector: cmsSlotBlocksSelector,
    cmsSlotBlocksOverlaySelector: '.js-cms-slot-blocks__overlay',
    cmsSlotBlocksOverlayTogglerClass: 'cms-slot-blocks__overlay--hidden',
    slotBlocksForm: slotBlocksForm,
    viewBlockUrl: '/cms-block-gui/view-block',
    blocksChoiceFormSelector: blocksChoiceFormSelector
  });
  var blocksChoice = new BlocksChoice({
    blocksChoiceFormSelector: blocksChoiceFormSelector,
    blocksTable: blocksTable,
    blocksChoiceAddSelector: '#block-choice_add',
    baseUrl: '/cms-slot-block-gui/cms-block-suggest',
    paramTerm: 'q',
    paramPage: 'page',
    paramIdCmsSlotTemplate: 'id-cms-slot-template',
    paramIdCmsSlot: 'id-cms-slot'
  });
  var slotBlocks = new SlotBlocks({
    slotSelector: '.js-row-list-of-slots',
    slotTableSelector: '.js-row-list-of-slots table',
    blockContainerSelector: '.js-row-list-of-blocks-container',
    cmsSlotBlockContentProviderSelector: '#cms-slot-block-content-provider',
    baseUrl: '/cms-slot-block-gui/slot-block/index',
    paramIdCmsSlotTemplate: 'id-cms-slot-template',
    paramIdCmsSlot: 'id-cms-slot',
    blocksTable: blocksTable,
    blocksChoice: blocksChoice,
    slotBlocksForm: slotBlocksForm,
    contentProviderAttribute: 'data-content-provider'
  });
  __webpack_require__.g.CmsSlotGui_SlotTable.dataTableInitCallback = function () {
    slotBlocks.init();
  };
});

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks-form.js":
/*!*************************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks-form.js ***!
  \*************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SlotBlocksForm = function (options) {
  var _self = this;
  this.$formWrapper = {};
  this.form = {};
  this.saveButton = {};
  this.formItemsCount = 0;
  this.formTemplate = '';
  this.cmsSlotBlocksSelector = '';
  this.formInitialState = '';
  this.isStateChanged = false;
  this.slotBlockFormItemClass = '';
  this.slotBlockFormItemIdPrefix = '';
  this.slotBlockFormWrapperId = '';
  this.resolveIsUnsavedCallback = function (state) {
    return state;
  };
  $.extend(this, options);
  this.init = function () {
    _self.$formWrapper = $(_self.cmsSlotBlocksSelector);
    _self.form = _self.$formWrapper.find('form[name=slot_blocks]');
    _self.saveButton = _self.form.find('input[type=submit]');
    _self.formItemsCount = parseInt(_self.$formWrapper.data('slot-block-item-count'));
    _self.formTemplate = _self.$formWrapper.data('slot-block-item-form-template');
    _self.form.on('submit', _self.save);
    _self.form.on('change', 'input[data-disable]:visible', _self.toggleEnablementFromRadioInput);
  };
  this.rebuildForm = function (idCmsSlotTemplate, idCmsSlot, tableData, isChanged) {
    if (isChanged && $(tableData).length < 1) {
      $(_self.slotBlockFormWrapperId).empty();
      _self.setStateChanged();
      return;
    }
    _self.formItemsCount = $(_self.slotBlockFormItemClass).length;
    var prevCmsBlockId = 0;
    $(tableData).each(function (index, item) {
      var $formItem = $(_self.slotBlockFormItemIdPrefix + item[0]);
      if ($formItem.length < 1) {
        $formItem = _self.createNewFormElement(idCmsSlotTemplate, idCmsSlot, item[0]);
      }
      $formItem.find('input[name*=\\[position\\]]').val(index + 1);
      $(_self.slotBlockFormWrapperId).prepend($formItem);
      if (prevCmsBlockId > 0) {
        $formItem.insertAfter($(_self.slotBlockFormItemIdPrefix + prevCmsBlockId));
      }
      prevCmsBlockId = item[0];
    });
    $(_self.slotBlockFormItemIdPrefix + prevCmsBlockId).nextAll().remove();
    _self.initFormItems();
    if (!isChanged) {
      _self.formInitialState = _self.form.serialize();
    }
    _self.setStateChanged();
  };
  this.save = function (event) {
    event.preventDefault();
    var url = $(this).attr('action');
    var formSerialize = $(this).serialize();
    $.post(url, formSerialize).done(function (response) {
      if (!_self.isStateChanged) {
        return;
      }
      window.sweetAlert({
        title: 'Success',
        html: true,
        type: 'success'
      });
      $(_self.slotBlockFormWrapperId).html(response);
      _self.initFormItems();
      _self.formInitialState = _self.form.serialize();
      $(document).trigger('savedBlocksForm');
      _self.setStateChanged();
    }).fail(function () {
      window.sweetAlert({
        title: 'Error',
        html: true,
        type: 'error'
      });
    }).always(function () {
      _self.activateButton();
    });
  };
  this.activateButton = function () {
    _self.saveButton.removeAttr('disabled');
    _self.saveButton.removeClass('disabled');
  };
  this.createNewFormElement = function (idCmsSlotTemplate, idCmsSlot, idCmsBlock) {
    var formTemplate = '<div class="js-cms-slot-block-form-item" ' + 'id="js-cms-slot-block-form-item-' + idCmsBlock + '">' + _self.formTemplate + '</div>';
    var formItem = formTemplate.replace(/__name__/g, _self.formItemsCount);
    formItem = $($.parseHTML(formItem));
    formItem.find('input[name*=\\[idSlotTemplate\\]]').val(idCmsSlotTemplate);
    formItem.find('input[name*=\\[idSlot\\]]').val(idCmsSlot);
    formItem.find('input[name*=\\[idCmsBlock\\]]').val(idCmsBlock);
    return formItem;
  };
  this.initFormItems = function () {
    _self.form.find('select').each(function (index, element) {
      var select2InitOptions = {};
      var selectElement = $(element);
      if (selectElement.data('autocomplete-url')) {
        select2InitOptions = {
          ajax: {
            url: selectElement.data('autocomplete-url'),
            dataType: 'json',
            delay: 500,
            cache: true
          },
          minimumInputLength: 3
        };
      }
      selectElement.select2(select2InitOptions);
    });
    _self.form.find(':input').off('change.changedState').on('change.changedState', _self.setStateChanged);
  };
  this.setStateChanged = function () {
    var isChanged = _self.formInitialState !== _self.form.serialize();
    isChanged = _self.resolveIsUnsavedCallback(isChanged);
    _self.isStateChanged = isChanged;
  };
  this.toggleEnablementFromRadioInput = function () {
    _self.toggleEnablement($(this));
  };
  this.toggleEnablementFromBlocksTable = function (cmsSlotBlockFormItem) {
    $('input[data-disable]', cmsSlotBlockFormItem).each(function (index) {
      _self.toggleEnablement($(this));
    });
  };
  this.toggleEnablement = function (radioInput) {
    if (!radioInput.is(':checked')) {
      return;
    }
    var inputs = radioInput.data('inputs');
    var disabled = radioInput.data('disable');
    $.each(inputs, function (index, value) {
      radioInput.closest(_self.slotBlockFormItemClass).find("select[name*='" + value + "']").prop('disabled', disabled);
    });
  };
};
module.exports = SlotBlocksForm;

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/slot-blocks.js ***!
  \********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var SlotBlocks = function (options) {
  var _self = this;
  this.slotSelector = '';
  this.slotTableSelector = '';
  this.blockContainerSelector = '';
  this.baseUrl = '';
  this.$slotTable = {};
  this.blocksTable = {};
  this.blocksChoice = {};
  this.slotBlocksForm = {};
  this.cmsSlotBlockContentProviderSelector = '';
  this.cmsSlotBlockContentProvider = '';
  this.contentProviderAttribute = '';
  this.paramIdCmsSlotTemplate = '';
  this.paramIdCmsSlot = '';
  this.isFirstInit = true;
  $.extend(this, options);
  this.init = function () {
    _self.cmsSlotBlockContentProvider = $.trim($(_self.cmsSlotBlockContentProviderSelector).val());
    _self.$slotTable = $(_self.slotTableSelector).DataTable();
    $(_self.slotTableSelector).find('tbody').on('click', 'tr', _self.tableRowSelect);
    _self.$slotTable.on('draw', _self.selectFirstRow);
    _self.$slotTable.on('select', _self.loadBlocksTable);
  };
  this.tableRowSelect = function (element) {
    if (!$(element.target).is('td')) {
      return;
    }
    var cellIndex = $(this).index();
    _self.updateRow(cellIndex);
  };
  this.updateRow = function (index) {
    _self.$slotTable.rows().deselect();
    _self.$slotTable.row(index).select();
  };
  this.selectFirstRow = function () {
    var isSlotTableEnabled = _self.$slotTable.rows().count() !== 0 && $(_self.slotTableSelector).is(':visible');
    _self.blocksTable.toggleTableRow(isSlotTableEnabled);
    _self.$slotTable.row(0).select();
  };
  this.loadBlocksTable = function (element, api, type, indexes) {
    var templateTableApi = $('#template-list-table').dataTable().api();
    if (templateTableApi.rows({
      selected: true
    }).count() === 0) {
      return;
    }
    if (!_self.isCmsSlotBlockContentProvider(api, indexes)) {
      _self.blocksTable.toggleTableRow(false);
      return;
    }
    var idCmsSlotTemplate = templateTableApi.rows({
      selected: true
    }).data()[0][0];
    var idCmsSlot = api.row(indexes[0]).data()[0];
    var paramsCollection = {};
    paramsCollection[_self.paramIdCmsSlotTemplate] = idCmsSlotTemplate;
    paramsCollection[_self.paramIdCmsSlot] = idCmsSlot;
    var params = $.param(paramsCollection);
    $.get(_self.baseUrl + '?' + params).done(function (html) {
      $(_self.blockContainerSelector).remove();
      $(html).insertAfter($(_self.slotSelector));
      _self.blocksTable.init();
      _self.blocksTable.overlayToggler(false);
      _self.blocksChoice.init();
      _self.slotBlocksForm.init();
      _self.blocksTable.loadBlocksTable(params, idCmsSlotTemplate, idCmsSlot);
      _self.blocksTable.resetHandlerCallback = function () {
        _self.loadBlocksTable(element, api, type, indexes);
      };
    });
    if (!_self.isFirstInit) {
      return;
    }
    _self.isFirstInit = false;
  };
  this.getDataTableApi = function () {
    return _self.$slotTable;
  };
  this.isCmsSlotBlockContentProvider = function (api, indexes) {
    return api.row(indexes[0]).nodes().to$().find('[' + _self.contentProviderAttribute + "='" + _self.cmsSlotBlockContentProvider + "']").length;
  };
};
module.exports = SlotBlocks;

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/spryker-zed-cms-slot-block-gui-main.entry.js":
/*!******************************************************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/js/spryker-zed-cms-slot-block-gui-main.entry.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/sass/main.scss");
__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms-slot-block-gui/assets/Zed/js/modules/main.js");

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/data-table.js":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/data-table.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");


function getLocale() {
  var locale = document.documentElement.dataset.applicationLocale;
  if (typeof locale === 'string') {
    return locale.split('_')[0].split('-')[0];
  }
  return 'en';
}
function getTranslation(locale) {
  return __webpack_require__("./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n sync recursive ^\\.\\/.*\\.json$")("./" + locale + ".json");
}
var locale = getLocale();
var translationObj = getTranslation(locale);
if (translationObj.sSearch) {
  translationObj.searchPlaceholder = translationObj.sSearch.replace(/\&nbsp;|:/gi, '');
}
var defaultConfiguration = {
  scrollX: 'auto',
  language: translationObj,
  dom: "<'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'f>>" + "<'row'<'col-sm-12'tr>>" + "<'alt-row'<'alt-row__left'l><'alt-row__center'p>>"
};
var noSearchConfiguration = {
  bFilter: false,
  bInfo: false,
  scrollX: 'auto'
};
function setTableErrorMode(errorMode) {
  $.fn.dataTable.ext.errMode = errorMode || 'none';
}
function onTabChange(tabId) {
  var $tab = $(tabId);
  var $dataTables = $tab.find('.gui-table-data, .gui-table-data-no-search');
  if (!$dataTables.data('initialized')) {
    $dataTables.data('initialized', true).DataTable().draw();
  }
}
function onError(e, settings, techNote, message) {
  var debugMessage = '';
  if (true) {
    debugMessage = '<br/><br/><small><u>Debug message:</u><br/> ' + message + '</small>';
  }
  window.sweetAlert({
    title: 'Error',
    text: 'Something went wrong. Please <a href="javascript:window.location.reload()">refresh</a> the page or try again later.' + debugMessage,
    html: true,
    type: 'error'
  });
}
module.exports = {
  defaultConfiguration: defaultConfiguration,
  noSearchConfiguration: noSearchConfiguration,
  setTableErrorMode: setTableErrorMode,
  onTabChange: onTabChange,
  onError: onError
};

/***/ }),

/***/ "./vendor/spryker/cms-slot-block-gui/assets/Zed/sass/main.scss":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/cms-slot-block-gui/assets/Zed/sass/main.scss ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n sync recursive ^\\.\\/.*\\.json$":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ sync ^\.\/.*\.json$ ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./af.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/af.json",
	"./am.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/am.json",
	"./ar.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ar.json",
	"./be.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/be.json",
	"./bg.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/bg.json",
	"./ca.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ca.json",
	"./cs.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cs.json",
	"./cy.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cy.json",
	"./da.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/da.json",
	"./de.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/de.json",
	"./el.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/el.json",
	"./en.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/en.json",
	"./eo.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eo.json",
	"./es.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/es.json",
	"./et.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/et.json",
	"./eu.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eu.json",
	"./fa.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fa.json",
	"./fi.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fi.json",
	"./fil.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fil.json",
	"./fr.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fr.json",
	"./ga.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ga.json",
	"./gl.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gl.json",
	"./gu.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gu.json",
	"./hi.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hi.json",
	"./hr.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hr.json",
	"./hu.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hu.json",
	"./hy.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hy.json",
	"./id.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/id.json",
	"./is.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/is.json",
	"./it.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/it.json",
	"./iw.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/iw.json",
	"./ja.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ja.json",
	"./ka.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ka.json",
	"./kk.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/kk.json",
	"./km.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/km.json",
	"./ko.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ko.json",
	"./lt.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lt.json",
	"./lv.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lv.json",
	"./mk.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mk.json",
	"./mn.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mn.json",
	"./ms.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ms.json",
	"./ne.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ne.json",
	"./nl.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/nl.json",
	"./pl.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pl.json",
	"./ps.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ps.json",
	"./pt.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pt.json",
	"./ro.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ro.json",
	"./ru.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ru.json",
	"./si.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/si.json",
	"./sk.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sk.json",
	"./sl.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sl.json",
	"./sq.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sq.json",
	"./sr.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sr.json",
	"./sv.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sv.json",
	"./sw.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sw.json",
	"./ta.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ta.json",
	"./th.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/th.json",
	"./tr.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/tr.json",
	"./uk.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uk.json",
	"./ur.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ur.json",
	"./uz.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uz.json",
	"./vi.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/vi.json",
	"./zh.json": "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/zh.json"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n sync recursive ^\\.\\/.*\\.json$";

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/af.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/af.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Geen data beskikbaar in tabel","sInfo":"uitstalling _START_ to _END_ of _TOTAL_ inskrywings","sInfoEmpty":"uitstalling 0 to 0 of 0 inskrywings","sInfoFiltered":"(gefiltreer uit _MAX_ totaal inskrywings)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"uitstal _MENU_ inskrywings","sLoadingRecords":"laai...","sProcessing":"verwerking...","sSearch":"soektog:","sZeroRecords":"Geen treffers gevind","oPaginate":{"sFirst":"eerste","sLast":"laaste","sNext":"volgende","sPrevious":"vorige"},"oAria":{"sSortAscending":": aktiveer kolom stygende te sorteer","sSortDescending":": aktiveer kolom orde te sorteer"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/am.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/am.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"ባዶ ሰንጠረዥ","sInfo":"ከጠቅላላው _TOTAL_ ዝርዝሮች ውስጥ ከ _START_ እስከ _END_ ያሉት ዝርዝር","sInfoEmpty":"ከጠቅላላው 0 ዝርዝሮች ውስጥ ከ 0 እስከ 0 ያሉት ዝርዝር","sInfoFiltered":"(ከጠቅላላው _MAX_ የተመረጡ ዝርዝሮች)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"የዝርዝሮች ብዛት _MENU_","sLoadingRecords":"በማቅረብ ላይ...","sProcessing":"በማቀናበር ላይ...","sSearch":"ፈልግ:","sZeroRecords":"ከሚፈለገው ጋር የሚሚሳሰል ዝርዝር አልተገኘም","oPaginate":{"sFirst":"መጀመሪያ","sLast":"መጨረሻ","sNext":"ቀጣዩ","sPrevious":"የበፊቱ"},"oAria":{"sSortAscending":": ከመጀመሪያ ወደ መጨረሻ(ወጪ) አደራደር","sSortDescending":": ከመጨረሻ ወደ መጀመሪያ(ወራጅ) አደራደር"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ar.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ar.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"ليست هناك بيانات متاحة في الجدول","sLoadingRecords":"جارٍ التحميل...","sProcessing":"جارٍ التحميل...","sLengthMenu":"أظهر _MENU_ مدخلات","sZeroRecords":"لم يعثر على أية سجلات","sInfo":"إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل","sInfoEmpty":"يعرض 0 إلى 0 من أصل 0 سجل","sInfoFiltered":"(منتقاة من مجموع _MAX_ مُدخل)","sInfoPostFix":"","sSearch":"ابحث:","sUrl":"","oPaginate":{"sFirst":"الأول","sPrevious":"السابق","sNext":"التالي","sLast":"الأخير"},"oAria":{"sSortAscending":": تفعيل لترتيب العمود تصاعدياً","sSortDescending":": تفعيل لترتيب العمود تنازلياً"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/be.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/be.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Пачакайце...","sLengthMenu":"Паказваць _MENU_ запісаў","sZeroRecords":"Запісы адсутнічаюць.","sInfo":"Запісы з _START_ па _END_ з _TOTAL_ запісаў","sInfoEmpty":"Запісы з 0 па 0 з 0 запісаў","sInfoFiltered":"(адфільтравана з _MAX_ запісаў)","sInfoPostFix":"","sSearch":"Пошук:","sUrl":"","oPaginate":{"sFirst":"Першая","sPrevious":"Папярэдняя","sNext":"Наступная","sLast":"Апошняя"},"oAria":{"sSortAscending":": актываваць для сартавання слупка па ўзрастанні","sSortDescending":": актываваць для сартавання слупка па змяншэнні"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/bg.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/bg.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Обработка на резултатите...","sLengthMenu":"Показване на _MENU_ резултата","sZeroRecords":"Няма намерени резултати","sInfo":"Показване на резултати от _START_ до _END_ от общо _TOTAL_","sInfoEmpty":"Показване на резултати от 0 до 0 от общо 0","sInfoFiltered":"(филтрирани от общо _MAX_ резултата)","sInfoPostFix":"","sSearch":"Търсене:","sUrl":"","oPaginate":{"sFirst":"Първа","sPrevious":"Предишна","sNext":"Следваща","sLast":"Последна"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ca.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ca.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Processant...","sLengthMenu":"Mostra _MENU_ registres","sZeroRecords":"No s\'han trobat registres.","sInfo":"Mostrant de _START_ a _END_ de _TOTAL_ registres","sInfoEmpty":"Mostrant de 0 a 0 de 0 registres","sInfoFiltered":"(filtrat de _MAX_ total registres)","sInfoPostFix":"","sSearch":"Filtrar:","sUrl":"","oPaginate":{"sFirst":"Primer","sPrevious":"Anterior","sNext":"Següent","sLast":"Últim"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cs.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cs.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Tabulka neobsahuje žádná data","sInfo":"Zobrazuji _START_ až _END_ z celkem _TOTAL_ záznamů","sInfoEmpty":"Zobrazuji 0 až 0 z 0 záznamů","sInfoFiltered":"(filtrováno z celkem _MAX_ záznamů)","sInfoPostFix":"","sInfoThousands":" ","sLengthMenu":"Zobraz záznamů _MENU_","sLoadingRecords":"Načítám...","sProcessing":"Provádím...","sSearch":"Hledat:","sZeroRecords":"Žádné záznamy nebyly nalezeny","oPaginate":{"sFirst":"První","sLast":"Poslední","sNext":"Další","sPrevious":"Předchozí"},"oAria":{"sSortAscending":": aktivujte pro řazení sloupce vzestupně","sSortDescending":": aktivujte pro řazení sloupce sestupně"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cy.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/cy.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Dim data ar gael yn y tabl","sInfo":"Dangos _START_ i _END_ o _TOTAL_ cofnod","sInfoEmpty":"Dangos 0 i 0 o 0 cofnod","sInfoFiltered":"(wedi hidlo o gyfanswm o _MAX_ cofnod)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Dangos _MENU_ cofnod","sLoadingRecords":"Wrthi\'n llwytho...","sProcessing":"Wrthi\'n prosesu...","sSearch":"Chwilio:","sZeroRecords":"Heb ddod o hyd i gofnodion sy\'n cyfateb","oPaginate":{"sFirst":"Cyntaf","sLast":"Olaf","sNext":"Nesaf","sPrevious":"Blaenorol"},"oAria":{"sSortAscending":": rhoi ar waith i drefnu colofnau o\'r lleiaf i\'r mwyaf","sSortDescending":": rhoi ar waith i drefnu colofnau o\'r mwyaf i\'r lleiaf"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/da.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/da.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Henter...","sLengthMenu":"Vis _MENU_ linjer","sZeroRecords":"Ingen linjer matcher s&oslash;gningen","sInfo":"Viser _START_ til _END_ af _TOTAL_ linjer","sInfoEmpty":"Viser 0 til 0 af 0 linjer","sInfoFiltered":"(filtreret fra _MAX_ linjer)","sInfoPostFix":"","sSearch":"S&oslash;g:","sUrl":"","oPaginate":{"sFirst":"F&oslash;rste","sPrevious":"Forrige","sNext":"N&aelig;ste","sLast":"Sidste"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/de.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/de.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Keine Daten in der Tabelle vorhanden","sInfo":"_START_ bis _END_ von _TOTAL_ Einträgen","sInfoEmpty":"Keine Daten vorhanden","sInfoFiltered":"(gefiltert von _MAX_ Einträgen)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"_MENU_ Einträge anzeigen","sLoadingRecords":"Wird geladen ..","sProcessing":"Bitte warten ..","sSearch":"Suchen","sZeroRecords":"Keine Einträge vorhanden","oPaginate":{"sFirst":"Erste","sPrevious":"Zurück","sNext":"Nächste","sLast":"Letzte"},"oAria":{"sSortAscending":": aktivieren, um Spalte aufsteigend zu sortieren","sSortDescending":": aktivieren, um Spalte absteigend zu sortieren"},"select":{"rows":{"0":"","1":"1 Zeile ausgewählt","_":"%d Zeilen ausgewählt"}},"buttons":{"print":"Drucken","colvis":"Spalten","copy":"Kopieren","copyTitle":"In Zwischenablage kopieren","copyKeys":"Taste <i>ctrl</i> oder <i>⌘</i> + <i>C</i> um Tabelle<br>in Zwischenspeicher zu kopieren.<br><br>Um abzubrechen die Nachricht anklicken oder Escape drücken.","copySuccess":{"1":"1 Zeile kopiert","_":"%d Zeilen kopiert"}}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/el.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/el.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sDecimal":",","sEmptyTable":"Δεν υπάρχουν δεδομένα στον πίνακα","sInfo":"Εμφανίζονται _START_ έως _END_ από _TOTAL_ εγγραφές","sInfoEmpty":"Εμφανίζονται 0 έως 0 από 0 εγγραφές","sInfoFiltered":"(φιλτραρισμένες από _MAX_ συνολικά εγγραφές)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Δείξε _MENU_ εγγραφές","sLoadingRecords":"Φόρτωση...","sProcessing":"Επεξεργασία...","sSearch":"Αναζήτηση:","sSearchPlaceholder":"Αναζήτηση","sThousands":".","sUrl":"","sZeroRecords":"Δεν βρέθηκαν εγγραφές που να ταιριάζουν","oPaginate":{"sFirst":"Πρώτη","sPrevious":"Προηγούμενη","sNext":"Επόμενη","sLast":"Τελευταία"},"oAria":{"sSortAscending":": ενεργοποιήστε για αύξουσα ταξινόμηση της στήλης","sSortDescending":": ενεργοποιήστε για φθίνουσα ταξινόμηση της στήλης"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/en.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/en.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"No data available in table","sInfo":"Showing _START_ to _END_ of _TOTAL_ entries","sInfoEmpty":"Showing 0 to 0 of 0 entries","sInfoFiltered":"(filtered from _MAX_ total entries)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Show _MENU_ entries","sLoadingRecords":"Loading...","sProcessing":"Processing...","sSearch":"Search:","sZeroRecords":"No matching records found","oPaginate":{"sFirst":"First","sLast":"Last","sNext":"Next","sPrevious":"Previous"},"oAria":{"sSortAscending":": activate to sort column ascending","sSortDescending":": activate to sort column descending"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eo.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eo.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Neniuj datumoj en tabelo","sInfo":"Montras _START_ ĝis _END_ el _TOTAL_ vicoj","sInfoEmpty":"Montras 0 ĝis 0 el 0 vicoj","sInfoFiltered":"(filtrita el entute _MAX_ vicoj)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Montri _MENU_ vicojn","sLoadingRecords":"Ŝarĝas ...","sProcessing":"Pretigas ...","sSearch":"Serĉi:","sZeroRecords":"Neniuj rezultoj trovitaj","oPaginate":{"sFirst":"Unua","sLast":"Lasta","sNext":"Venonta","sPrevious":"Antaŭa"},"oAria":{"sSortAscending":": aktivigi por filtri kolumnon kreskante","sSortDescending":": aktivigi por filtri kolumnon malkreskante"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/es.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/es.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Procesando...","sLengthMenu":"Mostrar _MENU_ registros","sZeroRecords":"No se encontraron resultados","sEmptyTable":"Ningún dato disponible en esta tabla =(","sInfo":"Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros","sInfoEmpty":"Mostrando registros del 0 al 0 de un total de 0 registros","sInfoFiltered":"(filtrado de un total de _MAX_ registros)","sInfoPostFix":"","sSearch":"Buscar:","sUrl":"","sInfoThousands":",","sLoadingRecords":"Cargando...","oPaginate":{"sFirst":"Primero","sLast":"Último","sNext":"Siguiente","sPrevious":"Anterior"},"oAria":{"sSortAscending":": Activar para ordenar la columna de manera ascendente","sSortDescending":": Activar para ordenar la columna de manera descendente"},"buttons":{"copy":"Copiar","colvis":"Visibilidad"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/et.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/et.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Palun oodake, koostan kuvamiseks nimekirja!","sLengthMenu":"N&auml;ita kirjeid _MENU_ kaupa","sZeroRecords":"Otsitavat vastet ei leitud.","sInfo":"Kuvatud: _TOTAL_ kirjet (_START_-_END_)","sInfoEmpty":"Otsinguvasteid ei leitud","sInfoFiltered":" - filteeritud _MAX_ kirje seast.","sInfoPostFix":"K&otilde;ik kuvatud kirjed p&otilde;hinevad reaalsetel tulemustel.","sSearch":"Otsi k&otilde;ikide tulemuste seast:","oPaginate":{"sFirst":"Algus","sPrevious":"Eelmine","sNext":"J&auml;rgmine","sLast":"Viimane"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eu.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/eu.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Prozesatzen...","sLengthMenu":"Erakutsi _MENU_ erregistro","sZeroRecords":"Ez da emaitzarik aurkitu","sEmptyTable":"Taula hontan ez dago inongo datu erabilgarririk","sInfo":"_START_ -etik _END_ -erako erregistroak erakusten, guztira _TOTAL_ erregistro","sInfoEmpty":"0tik 0rako erregistroak erakusten, guztira 0 erregistro","sInfoFiltered":"(guztira _MAX_ erregistro iragazten)","sInfoPostFix":"","sSearch":"Aurkitu:","sUrl":"","sInfoThousands":",","sLoadingRecords":"Abiarazten...","oPaginate":{"sFirst":"Lehena","sLast":"Azkena","sNext":"Hurrengoa","sPrevious":"Aurrekoa"},"oAria":{"sSortAscending":": Zutabea goranzko eran ordenatzeko aktibatu ","sSortDescending":": Zutabea beheranzko eran ordenatzeko aktibatu"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fa.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fa.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"هیچ داده ای در جدول وجود ندارد","sInfo":"نمایش _START_ تا _END_ از _TOTAL_ رکورد","sInfoEmpty":"نمایش 0 تا 0 از 0 رکورد","sInfoFiltered":"(فیلتر شده از _MAX_ رکورد)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"نمایش _MENU_ رکورد","sLoadingRecords":"در حال بارگزاری...","sProcessing":"در حال پردازش...","sSearch":"جستجو:","sZeroRecords":"رکوردی با این مشخصات پیدا نشد","oPaginate":{"sFirst":"ابتدا","sLast":"انتها","sNext":"بعدی","sPrevious":"قبلی"},"oAria":{"sSortAscending":": فعال سازی نمایش به صورت صعودی","sSortDescending":": فعال سازی نمایش به صورت نزولی"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fi.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fi.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Ei näytettäviä tuloksia.","sInfo":"Näytetään rivit _START_ - _END_ (yhteensä _TOTAL_ )","sInfoEmpty":"Näytetään 0 - 0 (yhteensä 0)","sInfoFiltered":"(suodatettu _MAX_ tuloksen joukosta)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Näytä kerralla _MENU_ riviä","sLoadingRecords":"Ladataan...","sProcessing":"Hetkinen...","sSearch":"Etsi:","sZeroRecords":"Tietoja ei löytynyt","oPaginate":{"sFirst":"Ensimmäinen","sLast":"Viimeinen","sNext":"Seuraava","sPrevious":"Edellinen"},"oAria":{"sSortAscending":": lajittele sarake nousevasti","sSortDescending":": lajittele sarake laskevasti"},"select":{"rows":{"0":"Klikkaa riviä valitaksesi sen","1":"Valittuna vain yksi rivi","_":"Valittuna %d riviä"}},"buttons":{"copy":"Kopioi","copySuccess":{"1":"Yksi rivi kopioitu leikepöydälle","_":"%d riviä kopioitu leikepöydälle"},"copyTitle":"Kopioi leikepöydälle","copyKeys":"Paina <i>ctrl</i> tai <i>⌘</i> + <i>C</i> kopioidaksesi taulukon arvot<br> leikepöydälle. <br><br>Peruuttaaksesi klikkaa tähän tai Esc."}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fil.json":
/*!*********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fil.json ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Pagproseso...","sLengthMenu":"Ipakita _MENU_ entries","sZeroRecords":"Walang katugmang  mga talaan  na natagpuan","sInfo":"Ipinapakita ang  _START_  sa _END_ ng _TOTAL_ entries","sInfoEmpty":"Ipinapakita ang 0-0 ng 0 entries","sInfoFiltered":"(na-filter mula _MAX_ kabuuang entries)","sInfoPostFix":"","sSearch":"Paghahanap:","sUrl":"","oPaginate":{"sFirst":"Unang","sPrevious":"Nakaraan","sNext":"Susunod","sLast":"Huli"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fr.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/fr.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Traitement en cours...","sSearch":"Rechercher&nbsp;:","sLengthMenu":"Afficher _MENU_ &eacute;l&eacute;ments","sInfo":"Affichage de l\'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments","sInfoEmpty":"Affichage de l\'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment","sInfoFiltered":"(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)","sInfoPostFix":"","sLoadingRecords":"Chargement en cours...","sZeroRecords":"Aucun &eacute;l&eacute;ment &agrave; afficher","sEmptyTable":"Aucune donn&eacute;e disponible dans le tableau","oPaginate":{"sFirst":"Premier","sPrevious":"Pr&eacute;c&eacute;dent","sNext":"Suivant","sLast":"Dernier"},"oAria":{"sSortAscending":": activer pour trier la colonne par ordre croissant","sSortDescending":": activer pour trier la colonne par ordre d&eacute;croissant"},"select":{"rows":{"0":"Aucune ligne s&eacute;lectionn&eacute;e","1":"1 ligne s&eacute;lectionn&eacute;e","_":"%d lignes s&eacute;lectionn&eacute;es"}}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ga.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ga.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Próiseáil...","sLengthMenu":"Taispeáin iontrálacha _MENU_","sZeroRecords":"Gan aon taifead meaitseáil aimsithe","sInfo":"_START_ Showing a _END_ na n-iontrálacha  _TOTAL_","sInfoEmpty":"Showing 0-0 na n-iontrálacha  0","sInfoFiltered":"(scagtha ó _MAX_ iontrálacha iomlán)","sInfoPostFix":"","sSearch":"Cuardaigh:","sUrl":"","oPaginate":{"sFirst":"An Chéad","sPrevious":"Roimhe Seo","sNext":"Ar Aghaidh","sLast":"Last"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gl.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gl.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Procesando...","sLengthMenu":"Mostrar _MENU_ rexistros","sZeroRecords":"Non se atoparon resultados","sEmptyTable":"Ningún dato dispoñible nesta táboa","sInfo":"Mostrando rexistros do _START_ ao _END_ dun total de _TOTAL_ rexistros","sInfoEmpty":"Mostrando rexistros do 0 ao 0 dun total de 0 rexistros","sInfoFiltered":"(filtrado dun total de _MAX_ rexistros)","sInfoPostFix":"","sSearch":"Buscar:","sUrl":"","sInfoThousands":",","sLoadingRecords":"Cargando...","oPaginate":{"sFirst":"Primeiro","sLast":"Último","sNext":"Seguinte","sPrevious":"Anterior"},"oAria":{"sSortAscending":": Activar para ordenar a columna de maneira ascendente","sSortDescending":": Activar para ordenar a columna de maneira descendente"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gu.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/gu.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"કોષ્ટકમાં કોઈ ડેટા ઉપલબ્ધ નથી","sInfo":"કુલ_પ્રવેશો_અંત_પ્રારંભ_દર્શાવે_છે","sInfoEmpty":"0 પ્રવેશો 0 0 બતાવી રહ્યું છે","sInfoFiltered":"(_MAX_ કુલ પ્રવેશો માંથી ફિલ્ટર)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"બતાવો _MENU_ પ્રવેશો","sLoadingRecords":"લોડ કરી રહ્યું છે ...","sProcessing":"પ્રક્રિયા ...","sSearch":"શોધો:","sZeroRecords":"કોઈ મેળ ખાતા રેકોર્ડ મળી","oPaginate":{"sFirst":"પ્રથમ","sLast":"અંતિમ","sNext":"આગામી","sPrevious":"ગત"},"oAria":{"sSortAscending":": સ્તંભ ચડતા ક્રમમાં ગોઠવવા માટે સક્રિય","sSortDescending":": કૉલમ ઉતરતા ક્રમમાં ગોઠવવા માટે સક્રિય"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hi.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hi.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"प्रगति पे हैं ...","sLengthMenu":" _MENU_ प्रविष्टियां दिखाएं ","sZeroRecords":"रिकॉर्ड्स का मेल नहीं मिला","sInfo":"_START_ to _END_ of _TOTAL_ प्रविष्टियां दिखा रहे हैं","sInfoEmpty":"0 में से 0 से 0 प्रविष्टियां दिखा रहे हैं","sInfoFiltered":"(_MAX_ कुल प्रविष्टियों में से छठा हुआ)","sInfoPostFix":"","sSearch":"खोजें:","sUrl":"","oPaginate":{"sFirst":"प्रथम","sPrevious":"पिछला","sNext":"अगला","sLast":"अंतिम"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hr.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hr.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nema podataka u tablici","sInfo":"Prikazano _START_ do _END_ od _TOTAL_ rezultata","sInfoEmpty":"Prikazano 0 do 0 od 0 rezultata","sInfoFiltered":"(filtrirano iz _MAX_ ukupnih rezultata)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Prikaži _MENU_ rezultata po stranici","sLoadingRecords":"Dohvaćam...","sProcessing":"Obrađujem...","sSearch":"Pretraži:","sZeroRecords":"Ništa nije pronađeno","oPaginate":{"sFirst":"Prva","sPrevious":"Nazad","sNext":"Naprijed","sLast":"Zadnja"},"oAria":{"sSortAscending":": aktiviraj za rastući poredak","sSortDescending":": aktiviraj za padajući poredak"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hu.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hu.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nincs rendelkezésre álló adat","sInfo":"Találatok: _START_ - _END_ Összesen: _TOTAL_","sInfoEmpty":"Nulla találat","sInfoFiltered":"(_MAX_ összes rekord közül szűrve)","sInfoPostFix":"","sInfoThousands":" ","sLengthMenu":"_MENU_ találat oldalanként","sLoadingRecords":"Betöltés...","sProcessing":"Feldolgozás...","sSearch":"Keresés:","sZeroRecords":"Nincs a keresésnek megfelelő találat","oPaginate":{"sFirst":"Első","sPrevious":"Előző","sNext":"Következő","sLast":"Utolsó"},"oAria":{"sSortAscending":": aktiválja a növekvő rendezéshez","sSortDescending":": aktiválja a csökkenő rendezéshez"},"select":{"rows":{"0":"","1":"1 sor kiválasztva","_":"%d sor kiválasztva"}},"buttons":{"print":"Nyomtatás","colvis":"Oszlopok","copy":"Másolás","copyTitle":"Vágólapra másolás","copySuccess":{"1":"1 sor másolva","_":"%d sor másolva"}}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hy.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/hy.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Տվյալները բացակայում են","sProcessing":"Կատարվում է...","sInfoThousands":",","sLengthMenu":"Ցուցադրել _MENU_ արդյունքներ մեկ էջում","sLoadingRecords":"Բեռնվում է ...","sZeroRecords":"Հարցմանը համապատասխանող արդյունքներ չկան","sInfo":"Ցուցադրված են _START_-ից _END_ արդյունքները ընդհանուր _TOTAL_-ից","sInfoEmpty":"Արդյունքներ գտնված չեն","sInfoFiltered":"(ֆիլտրվել է ընդհանուր _MAX_ արդյունքներից)","sInfoPostFix":"","sSearch":"Փնտրել","oPaginate":{"sFirst":"Առաջին էջ","sPrevious":"Նախորդ էջ","sNext":"Հաջորդ էջ","sLast":"Վերջին էջ"},"oAria":{"sSortAscending":": ակտիվացրեք աճման կարգով դասավորելու համար","sSortDescending":": ակտիվացրեք նվազման կարգով դասավորելու համար"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/id.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/id.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Tidak ada data yang tersedia pada tabel ini","sProcessing":"Sedang memproses...","sLengthMenu":"Tampilkan _MENU_ entri","sZeroRecords":"Tidak ditemukan data yang sesuai","sInfo":"Menampilkan _START_ sampai _END_ dari _TOTAL_ entri","sInfoEmpty":"Menampilkan 0 sampai 0 dari 0 entri","sInfoFiltered":"(disaring dari _MAX_ entri keseluruhan)","sInfoPostFix":"","sSearch":"Cari:","sUrl":"","oPaginate":{"sFirst":"Pertama","sPrevious":"Sebelumnya","sNext":"Selanjutnya","sLast":"Terakhir"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/is.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/is.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Engin gögn eru í þessari töflu","sInfo":"Sýni _START_ til _END_ af _TOTAL_ færslum","sInfoEmpty":"Sýni 0 til 0 af 0 færslum","sInfoFiltered":"(síað út frá _MAX_ færslum)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Sýna _MENU_ færslur","sLoadingRecords":"Hleð...","sProcessing":"Úrvinnsla...","sSearch":"Leita:","sZeroRecords":"Engar færslur fundust","oPaginate":{"sFirst":"Fyrsta","sLast":"Síðasta","sNext":"Næsta","sPrevious":"Fyrri"},"oAria":{"sSortAscending":": virkja til að raða dálki í hækkandi röð","sSortDescending":": virkja til að raða dálki lækkandi í röð"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/it.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/it.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nessun dato presente nella tabella","sInfo":"Vista da _START_ a _END_ di _TOTAL_ elementi","sInfoEmpty":"Vista da 0 a 0 di 0 elementi","sInfoFiltered":"(filtrati da _MAX_ elementi totali)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Visualizza _MENU_ elementi","sLoadingRecords":"Caricamento...","sProcessing":"Elaborazione...","sSearch":"Cerca:","sZeroRecords":"La ricerca non ha portato alcun risultato.","oPaginate":{"sFirst":"Inizio","sPrevious":"Precedente","sNext":"Successivo","sLast":"Fine"},"oAria":{"sSortAscending":": attiva per ordinare la colonna in ordine crescente","sSortDescending":": attiva per ordinare la colonna in ordine decrescente"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/iw.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/iw.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"processing":"מעבד...","lengthMenu":"הצג _MENU_ פריטים","zeroRecords":"לא נמצאו רשומות מתאימות","emptyTable":"לא נמצאו רשומות מתאימות","info":"_START_ עד _END_ מתוך _TOTAL_ רשומות","infoEmpty":"0 עד 0 מתוך 0 רשומות","infoFiltered":"(מסונן מסך _MAX_  רשומות)","infoPostFix":"","search":"חפש:","url":"","paginate":{"first":"ראשון","previous":"קודם","next":"הבא","last":"אחרון"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ja.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ja.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"テーブルにデータがありません","sInfo":" _TOTAL_ 件中 _START_ から _END_ まで表示","sInfoEmpty":" 0 件中 0 から 0 まで表示","sInfoFiltered":"（全 _MAX_ 件より抽出）","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"_MENU_ 件表示","sLoadingRecords":"読み込み中...","sProcessing":"処理中...","sSearch":"検索:","sZeroRecords":"一致するレコードがありません","oPaginate":{"sFirst":"先頭","sLast":"最終","sNext":"次","sPrevious":"前"},"oAria":{"sSortAscending":": 列を昇順に並べ替えるにはアクティブにする","sSortDescending":": 列を降順に並べ替えるにはアクティブにする"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ka.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ka.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"ცხრილში არ არის მონაცემები","sInfo":"ნაჩვენებია ჩანაწერები _START_–დან _END_–მდე, _TOTAL_ ჩანაწერიდან","sInfoEmpty":"ნაჩვენებია ჩანაწერები 0–დან 0–მდე, 0 ჩანაწერიდან","sInfoFiltered":"(გაფილტრული შედეგი _MAX_ ჩანაწერიდან)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"აჩვენე _MENU_ ჩანაწერი","sLoadingRecords":"იტვირთება...","sProcessing":"მუშავდება...","sSearch":"ძიება:","sZeroRecords":"არაფერი მოიძებნა","oPaginate":{"sFirst":"პირველი","sLast":"ბოლო","sNext":"შემდეგი","sPrevious":"წინა"},"oAria":{"sSortAscending":": სვეტის დალაგება ზრდის მიხედვით","sSortDescending":": სვეტის დალაგება კლების მიხედვით"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/kk.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/kk.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"processing":"Күте тұрыңыз...","search":"Іздеу:","lengthMenu":"Жазбалар  _MENU_ көрсету","info":"_TOTAL_ жазбалары бойынша _START_ бастап _END_ дейінгі жазбалар","infoEmpty":"0 жазбалары бойынша 0 бастап 0 дейінгі жазбалар","infoFiltered":"(_MAX_ жазбасынан сұрыпталды)","infoPostFix":"","loadingRecords":"Жазбалар жүктемесі...","zeroRecords":"Жазбалар жоқ","emptyTable":"Кестеде деректер жоқ","paginate":{"first":"Бірінші","previous":"Алдыңғысы","next":"Келесі","last":"Соңғы"},"aria":{"sortAscending":": өсімі бойынша бағанды сұрыптау үшін активациялау","sortDescending":": кемуі бойынша бағанды сұрыптау үшін активациялау"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/km.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/km.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"មិនមានទិន្នន័យក្នុងតារាងនេះទេ","sInfo":"បង្ហាញជួរទី _START_ ដល់ទី _END_ ក្នុងចំណោម _TOTAL_ ជួរ","sInfoEmpty":"បង្ហាញជួរទី 0 ដល់ទី 0 ក្នុងចំណោម 0 ជួរ","sInfoFiltered":"(បានចម្រាញ់ចេញពីទិន្នន័យសរុប _MAX_ ជួរ)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"បង្ហាញ _MENU_ ជួរ","sLoadingRecords":"កំពុងផ្ទុក...","sProcessing":"កំពុងដំណើរការ...","sSearch":"ស្វែងរក:","sZeroRecords":"មិនមានទិន្នន័យត្រូវតាមលក្ខខណ្ឌស្វែងរកទេ","oPaginate":{"sFirst":"ដំបូងគេ","sLast":"ចុងក្រោយ","sNext":"បន្ទាប់","sPrevious":"ក្រោយ"},"oAria":{"sSortAscending":": ចុចដើម្បីរៀបជួរឈរនេះតាមលំដាប់ឡើង","sSortDescending":": ចុចដើម្បីរៀបជួរឈរនេះតាមលំដាប់ចុះ"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ko.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ko.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"데이터가 없습니다","sInfo":"_START_ - _END_ / _TOTAL_","sInfoEmpty":"0 - 0 / 0","sInfoFiltered":"(총 _MAX_ 개)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"페이지당 줄수 _MENU_","sLoadingRecords":"읽는중...","sProcessing":"처리중...","sSearch":"검색:","sZeroRecords":"검색 결과가 없습니다","oPaginate":{"sFirst":"처음","sLast":"마지막","sNext":"다음","sPrevious":"이전"},"oAria":{"sSortAscending":": 오름차순 정렬","sSortDescending":": 내림차순 정렬"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lt.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lt.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Lentelėje nėra duomenų","sInfo":"Rodomi įrašai nuo _START_ iki _END_ iš _TOTAL_ įrašų","sInfoEmpty":"Rodomi įrašai nuo 0 iki 0 iš 0","sInfoFiltered":"(atrinkta iš _MAX_ įrašų)","sInfoPostFix":"","sInfoThousands":" ","sLengthMenu":"Rodyti _MENU_ įrašus","sLoadingRecords":"Įkeliama...","sProcessing":"Apdorojama...","sSearch":"Ieškoti:","sThousands":" ","sUrl":"","sZeroRecords":"Įrašų nerasta","oPaginate":{"sFirst":"Pirmas","sPrevious":"Ankstesnis","sNext":"Tolimesnis","sLast":"Paskutinis"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lv.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/lv.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"processing":"Uzgaidiet ...","search":"Meklēt:","lengthMenu":"Rādīt _MENU_ ierakstus","info":"Parādīti _START_ līdz _END_ no _TOTAL_ ierakstiem","infoEmpty":"Nav ierakstu","infoFiltered":"(atlasīts no pavisam _MAX_ ierakstiem)","infoPostFix":"","loadingRecords":"Notiek ielāde ...","zeroRecords":"Nav atrasti vaicājumam atbilstoši ieraksti","emptyTable":"Tabulā nav datu","paginate":{"first":"Pirmā","previous":"Iepriekšējā","next":"Nākošā","last":"Pēdējā"},"aria":{"sortAscending":": aktivizēt kolonnu, lai kārtotu augoši","sortDescending":": aktivizēt kolonnu, lai kārtotu dilstoši"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mk.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mk.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Процесирање...","sLengthMenu":"Прикажи _MENU_ записи","sZeroRecords":"Не се пронајдени записи","sEmptyTable":"Нема податоци во табелата","sLoadingRecords":"Вчитување...","sInfo":"Прикажани _START_ до _END_ од _TOTAL_ записи","sInfoEmpty":"Прикажани 0 до 0 од 0 записи","sInfoFiltered":"(филтрирано од вкупно _MAX_ записи)","sInfoPostFix":"","sSearch":"Барај","sUrl":"","oPaginate":{"sFirst":"Почетна","sPrevious":"Претходна","sNext":"Следна","sLast":"Последна"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mn.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/mn.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Хүснэгт хоосон байна","sInfo":"Нийт _TOTAL_ бичлэгээс _START_ - _END_ харуулж байна","sInfoEmpty":"Тохирох үр дүн алга","sInfoFiltered":"(нийт _MAX_ бичлэгээс шүүв)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Дэлгэцэд _MENU_ бичлэг харуулна","sLoadingRecords":"Ачааллаж байна...","sProcessing":"Боловсруулж байна...","sSearch":"Хайлт:","sZeroRecords":"Тохирох бичлэг олдсонгүй","oPaginate":{"sFirst":"Эхнийх","sLast":"Сүүлийнх","sNext":"Өмнөх","sPrevious":"Дараах"},"oAria":{"sSortAscending":": цагаан толгойн дарааллаар эрэмбэлэх","sSortDescending":": цагаан толгойн эсрэг дарааллаар эрэмбэлэх"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ms.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ms.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Tiada data","sInfo":"Paparan dari _START_ hingga _END_ dari _TOTAL_ rekod","sInfoEmpty":"Paparan 0 hingga 0 dari 0 rekod","sInfoFiltered":"(Ditapis dari jumlah _MAX_ rekod)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Papar _MENU_ rekod","sLoadingRecords":"Diproses...","sProcessing":"Sedang diproses...","sSearch":"Carian:","sZeroRecords":"Tiada padanan rekod yang dijumpai.","oPaginate":{"sFirst":"Pertama","sPrevious":"Sebelum","sNext":"Kemudian","sLast":"Akhir"},"oAria":{"sSortAscending":": diaktifkan kepada susunan lajur menaik","sSortDescending":": diaktifkan kepada susunan lajur menurun"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ne.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ne.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"टेबलमा डाटा उपलब्ध भएन","sInfo":"_TOTAL_ रेकर्ड मध्य _START_ देखि _END_ रेकर्ड देखाउंदै","sInfoEmpty":"0 मध्य 0 देखि 0 रेकर्ड देखाउंदै","sInfoFiltered":"(_MAX_ कुल रेकर्डबाट छनौट गरिएको)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":" _MENU_ रेकर्ड देखाउने ","sLoadingRecords":"लोड हुँदैछ...","sProcessing":"प्रगति हुदैंछ ...","sSearch":"खोजी:","sUrl":"","sZeroRecords":"कुनै मिल्ने रेकर्ड फेला परेन","oPaginate":{"sFirst":"प्रथम","sPrevious":"पछिल्लो","sNext":"अघिल्लो","sLast":"अन्तिम"},"oAria":{"sSortAscending":": अगाडिबाट अक्षरात्मक रूपमा क्रमबद्ध गराउने","sSortDescending":": पछाडिबाट अक्षरात्मक रूपमा क्रमबद्ध गराउने"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/nl.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/nl.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Bezig...","sLengthMenu":"_MENU_ resultaten weergeven","sZeroRecords":"Geen resultaten gevonden","sInfo":"_START_ tot _END_ van _TOTAL_ resultaten","sInfoEmpty":"Geen resultaten om weer te geven","sInfoFiltered":" (gefilterd uit _MAX_ resultaten)","sInfoPostFix":"","sSearch":"Zoeken:","sEmptyTable":"Geen resultaten aanwezig in de tabel","sInfoThousands":".","sLoadingRecords":"Een moment geduld aub - bezig met laden...","oPaginate":{"sFirst":"Eerste","sLast":"Laatste","sNext":"Volgende","sPrevious":"Vorige"},"oAria":{"sSortAscending":": activeer om kolom oplopend te sorteren","sSortDescending":": activeer om kolom aflopend te sorteren"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pl.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pl.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"processing":"Przetwarzanie...","search":"Szukaj:","lengthMenu":"Pokaż _MENU_ pozycji","info":"Pozycje od _START_ do _END_ z _TOTAL_ łącznie","infoEmpty":"Pozycji 0 z 0 dostępnych","infoFiltered":"(filtrowanie spośród _MAX_ dostępnych pozycji)","infoPostFix":"","loadingRecords":"Wczytywanie...","zeroRecords":"Nie znaleziono pasujących pozycji","emptyTable":"Brak danych","paginate":{"first":"Pierwsza","previous":"Poprzednia","next":"Następna","last":"Ostatnia"},"aria":{"sortAscending":": aktywuj, by posortować kolumnę rosnąco","sortDescending":": aktywuj, by posortować kolumnę malejąco"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ps.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ps.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"جدول خالي دی","sInfo":"د _START_ څخه تر _END_ پوري، له ټولو _TOTAL_ څخه","sInfoEmpty":"د 0 څخه تر 0 پوري، له ټولو 0 څخه","sInfoFiltered":"(لټول سوي له ټولو _MAX_ څخه)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"_MENU_ کتاره وښايه","sLoadingRecords":"منتظر اوسئ...","sProcessing":"منتظر اوسئ...","sSearch":"لټون:","sZeroRecords":"د لټون مطابق معلومات و نه موندل سول","oPaginate":{"sFirst":"لومړۍ","sLast":"وروستۍ","sNext":"بله","sPrevious":"شاته"},"oAria":{"sSortAscending":": په صعودي ډول مرتبول","sSortDescending":": په نزولي ډول مرتبول"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pt.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/pt.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Não foi encontrado nenhum registo","sProcessing":"A carregar...","sLengthMenu":"Mostrar _MENU_ registos","sZeroRecords":"Não foram encontrados resultados","sInfo":"Mostrando de _START_ até _END_ de _TOTAL_ registos","sInfoEmpty":"Mostrando de 0 até 0 de 0 registos","sInfoFiltered":"(filtrado de _MAX_ registos no total)","sInfoPostFix":"","sSearch":"Procurar:","sUrl":"","oPaginate":{"sFirst":"Primeiro","sPrevious":"Anterior","sNext":"Seguinte","sLast":"Último"},"oAria":{"sSortAscending":": Ordenar colunas de forma ascendente","sSortDescending":": Ordenar colunas de forma descendente"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ro.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ro.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Procesează...","sLengthMenu":"Afișează _MENU_ înregistrări pe pagină","sZeroRecords":"Nu am găsit nimic - ne pare rău","sInfo":"Afișate de la _START_ la _END_ din _TOTAL_ înregistrări","sInfoEmpty":"Afișate de la 0 la 0 din 0 înregistrări","sInfoFiltered":"(filtrate dintr-un total de _MAX_ înregistrări)","sInfoPostFix":"","sSearch":"Caută:","sUrl":"","oPaginate":{"sFirst":"Prima","sPrevious":"Precedenta","sNext":"Următoarea","sLast":"Ultima"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ru.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ru.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"processing":"Подождите...","search":"Поиск:","lengthMenu":"Показать _MENU_ записей","info":"Записи с _START_ до _END_ из _TOTAL_ записей","infoEmpty":"Записи с 0 до 0 из 0 записей","infoFiltered":"(отфильтровано из _MAX_ записей)","infoPostFix":"","loadingRecords":"Загрузка записей...","zeroRecords":"Записи отсутствуют.","emptyTable":"В таблице отсутствуют данные","paginate":{"first":"Первая","previous":"Предыдущая","next":"Следующая","last":"Последняя"},"aria":{"sortAscending":": активировать для сортировки столбца по возрастанию","sortDescending":": активировать для сортировки столбца по убыванию"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/si.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/si.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"වගුවේ දත්ත කිසිවක් නොමැත","sInfo":"_TOTAL_ න් _START_ සිට _END_ දක්වා","sInfoEmpty":"0 න් 0 සිට 0 දක්වා","sInfoFiltered":"(_MAX_ න් තෝරාගත් )","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"_MENU_ ක් පෙන්වන්න","sLoadingRecords":"පූරණය වෙමින් පවතී...","sProcessing":"සැකසෙමින් පවතී...","sSearch":"සොයන්න :","sZeroRecords":"ගැලපෙන වාර්තා නොමැත.","oPaginate":{"sFirst":"පළමු","sLast":"අන්තිම","sNext":"ඊළග","sPrevious":"පසුගිය"},"oAria":{"sSortAscending":": තීරුව ආරෝහනව තෝරන්න","sSortDescending":": තීරුව අවරෝහනව තෝරන්න"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sk.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sk.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nie sú k dispozícii žiadne dáta","sInfo":"Záznamy _START_ až _END_ z celkom _TOTAL_","sInfoEmpty":"Záznamy 0 až 0 z celkom 0 ","sInfoFiltered":"(vyfiltrované spomedzi _MAX_ záznamov)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Zobraz _MENU_ záznamov","sLoadingRecords":"Načítavam...","sProcessing":"Spracúvam...","sSearch":"Hľadať:","sZeroRecords":"Nenašli sa žiadne vyhovujúce záznamy","oPaginate":{"sFirst":"Prvá","sLast":"Posledná","sNext":"Nasledujúca","sPrevious":"Predchádzajúca"},"oAria":{"sSortAscending":": aktivujte na zoradenie stĺpca vzostupne","sSortDescending":": aktivujte na zoradenie stĺpca zostupne"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sl.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sl.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nobenih podatkov ni na voljo","sInfo":"Prikazujem _START_ do _END_ od _TOTAL_ zapisov","sInfoEmpty":"Prikazujem 0 do 0 od 0 zapisov","sInfoFiltered":"(filtrirano od _MAX_ vseh zapisov)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Prikaži _MENU_ zapisov","sLoadingRecords":"Nalagam...","sProcessing":"Obdelujem...","sSearch":"Išči:","sZeroRecords":"Nobeden zapis ne ustreza","oPaginate":{"sFirst":"Prvi","sLast":"Zadnji","sNext":"Nasl.","sPrevious":"Pred."},"oAria":{"sSortAscending":": vključite za naraščujoči sort","sSortDescending":": vključite za padajoči sort"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sq.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sq.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Nuk ka asnjë të dhënë në tabele","sInfo":"Duke treguar _START_ deri _END_ prej _TOTAL_ reshtave","sInfoEmpty":"Duke treguar 0 deri 0 prej 0 reshtave","sInfoFiltered":"(të filtruara nga gjithësej _MAX_  reshtave)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Shiko _MENU_ reshta","sLoadingRecords":"Duke punuar...","sProcessing":"Duke procesuar...","sSearch":"Kërkoni:","sZeroRecords":"Asnjë e dhënë nuk u gjet","oPaginate":{"sFirst":"E para","sLast":"E Fundit","sNext":"Tjetra","sPrevious":"E Kaluara"},"oAria":{"sSortAscending":": aktivizo për të sortuar kolumnin me vlera në ngritje","sSortDescending":": aktivizo për të sortuar kolumnin me vlera në zbritje"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sr.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sr.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Нема података у табели","sInfo":"Приказ _START_ до _END_ од укупно _TOTAL_ записа","sInfoEmpty":"Приказ 0 до 0 од укупно 0 записа","sInfoFiltered":"(филтрирано од укупно _MAX_ записа)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Прикажи _MENU_ записа","sLoadingRecords":"Учитавање...","sProcessing":"Обрада...","sSearch":"Претрага:","sZeroRecords":"Нису пронађени одговарајући записи","oPaginate":{"sFirst":"Почетна","sLast":"Последња","sNext":"Следећа","sPrevious":"Предходна"},"oAria":{"sSortAscending":": активирајте да сортирате колону узлазно","sSortDescending":": активирајте да сортирате колону силазно"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sv.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sv.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Tabellen innehåller ingen data","sInfo":"Visar _START_ till _END_ av totalt _TOTAL_ rader","sInfoEmpty":"Visar 0 till 0 av totalt 0 rader","sInfoFiltered":"(filtrerade från totalt _MAX_ rader)","sInfoPostFix":"","sInfoThousands":" ","sLengthMenu":"Visa _MENU_ rader","sLoadingRecords":"Laddar...","sProcessing":"Bearbetar...","sSearch":"Sök:","sZeroRecords":"Hittade inga matchande resultat","oPaginate":{"sFirst":"Första","sLast":"Sista","sNext":"Nästa","sPrevious":"Föregående"},"oAria":{"sSortAscending":": aktivera för att sortera kolumnen i stigande ordning","sSortDescending":": aktivera för att sortera kolumnen i fallande ordning"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sw.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/sw.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Hakuna data iliyo patikana","sInfo":"Inaonyesha _START_ mpaka _END_ ya matokeo _TOTAL_","sInfoEmpty":"Inaonyesha 0 hadi 0 ya matokeo 0","sInfoFiltered":"(uschujo kutoka matokeo idadi _MAX_)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"Onyesha _MENU_ matokeo","sLoadingRecords":"Inapakia...","sProcessing":"Processing...","sSearch":"Tafuta:","sZeroRecords":"Rekodi vinavyolingana haziku patikana","oPaginate":{"sFirst":"Mwanzo","sLast":"Mwisho","sNext":"Ijayo","sPrevious":"Kabla"},"oAria":{"sSortAscending":": seti kulainisha sanjari kwa mtindo wa upandaji","sSortDescending":": seti kulainisha sanjari kwa mtindo wa mteremko"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ta.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ta.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"அட்டவணையில் தரவு கிடைக்கவில்லை","sInfo":"உள்ளீடுகளை் _START_ முதல _END_ உள்ள _TOTAL_ காட்டும்","sInfoEmpty":"0 உள்ளீடுகளை 0 0 காட்டும்","sInfoFiltered":"(_MAX_ மொத்த உள்ளீடுகளை இருந்து வடிகட்டி)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"_MENU_ காண்பி","sLoadingRecords":"ஏற்றுகிறது ...","sProcessing":"செயலாக்க ...","sSearch":"தேடல்:","sZeroRecords":"பொருத்தமான பதிவுகள் இல்லை","oPaginate":{"sFirst":"முதல்","sLast":"இறுதி","sNext":"அடுத்து","sPrevious":"முந்தைய"},"oAria":{"sSortAscending":": நிரலை ஏறுவரிசையில் வரிசைப்படுத்த செயல்படுத்த","sSortDescending":": நிரலை இறங்கு வரிசைப்படுத்த செயல்படுத்த"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/th.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/th.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"ไม่มีข้อมูลในตาราง","sInfo":"แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว","sInfoEmpty":"แสดง 0 ถึง 0 จาก 0 แถว","sInfoFiltered":"(กรองข้อมูล _MAX_ ทุกแถว)","sInfoPostFix":"","sInfoThousands":",","sLengthMenu":"แสดง _MENU_ แถว","sLoadingRecords":"กำลังโหลดข้อมูล...","sProcessing":"กำลังดำเนินการ...","sSearch":"ค้นหา: ","sZeroRecords":"ไม่พบข้อมูล","oPaginate":{"sFirst":"หน้าแรก","sPrevious":"ก่อนหน้า","sNext":"ถัดไป","sLast":"หน้าสุดท้าย"},"oAria":{"sSortAscending":": เปิดใช้งานการเรียงข้อมูลจากน้อยไปมาก","sSortDescending":": เปิดใช้งานการเรียงข้อมูลจากมากไปน้อย"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/tr.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/tr.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sDecimal":",","sEmptyTable":"Tabloda herhangi bir veri mevcut değil","sInfo":"_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor","sInfoEmpty":"Kayıt yok","sInfoFiltered":"(_MAX_ kayıt içerisinden bulunan)","sInfoPostFix":"","sInfoThousands":".","sLengthMenu":"Sayfada _MENU_ kayıt göster","sLoadingRecords":"Yükleniyor...","sProcessing":"İşleniyor...","sSearch":"Ara:","sZeroRecords":"Eşleşen kayıt bulunamadı","oPaginate":{"sFirst":"İlk","sLast":"Son","sNext":"Sonraki","sPrevious":"Önceki"},"oAria":{"sSortAscending":": artan sütun sıralamasını aktifleştir","sSortDescending":": azalan sütun sıralamasını aktifleştir"},"select":{"rows":{"0":"","1":"1 kayıt seçildi","_":"%d kayıt seçildi"}}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uk.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uk.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Зачекайте...","sLengthMenu":"Показати _MENU_ записів","sZeroRecords":"Записи відсутні.","sInfo":"Записи з _START_ по _END_ із _TOTAL_ записів","sInfoEmpty":"Записи з 0 по 0 із 0 записів","sInfoFiltered":"(відфільтровано з _MAX_ записів)","sInfoPostFix":"","sSearch":"Пошук:","sUrl":"","oPaginate":{"sFirst":"Перша","sPrevious":"Попередня","sNext":"Наступна","sLast":"Остання"},"oAria":{"sSortAscending":": активувати для сортування стовпців за зростанням","sSortDescending":": активувати для сортування стовпців за спаданням"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ur.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/ur.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"ہے جاري عملدرامد...","sLengthMenu":"دکہائين شقيں کي (_MENU_) فہرست","sZeroRecords":"ملے نہيں مفروضات جلتے ملتے کوئ","sInfo":"فہرست کي تک _END_ سے _START_ سے ميں _TOTAL_ فہرست پوري ہے نظر پيش","sInfoEmpty":"فہرست کي تک 0 سے 0 سے ميں 0 قل ہے نظر پيشّ","sInfoFiltered":"(فہرست ہوئ چھني سے ميں _MAX_ قل)","sInfoPostFix":"","sSearch":"کرو تلاش:","sUrl":"","oPaginate":{"sFirst":"پہلا","sPrevious":"پچہلا","sNext":"اگلا","sLast":"آخري"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uz.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/uz.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sEmptyTable":"Ma\'lumot yo\'q","sInfo":"Umumiy _TOTAL_ yozuvlarlardan _START_ dan _END_ gachasi ko\'rsatilmoqda","sInfoEmpty":"Umumiy 0 yozuvlardan 0 dan 0 gachasi ko\'rsatilmoqda","sInfoFiltered":"(_MAX_ yozuvlardan filtrlandi)","sInfoPostFix":"","sLengthMenu":"_MENU_ ta yozuvlarni ko\'rsat","sLoadingRecords":"Yozuvlar yuklanmoqda...","sProcessing":"Ishlayapman...","sSearch":"Izlash:","sZeroRecords":"Ma\'lumot yo\'q.","oPaginate":{"sFirst":"Birinchi","sPrevious":"Avvalgi","sNext":"Keyingi","sLast":"Son\'ggi"},"oAria":{"sSortAscending":": to\'g\'ri tartiblash","sSortDescending":": teskari tartiblash"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/vi.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/vi.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"Đang xử lý...","sLengthMenu":"Xem _MENU_ mục","sZeroRecords":"Không tìm thấy dòng nào phù hợp","sInfo":"Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục","sInfoEmpty":"Đang xem 0 đến 0 trong tổng số 0 mục","sInfoFiltered":"(được lọc từ _MAX_ mục)","sInfoPostFix":"","sSearch":"Tìm:","sUrl":"","oPaginate":{"sFirst":"Đầu","sPrevious":"Trước","sNext":"Tiếp","sLast":"Cuối"}}');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/zh.json":
/*!********************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/libs/i18n/zh.json ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sProcessing":"处理中...","sLengthMenu":"显示 _MENU_ 项结果","sZeroRecords":"没有匹配结果","sInfo":"显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项","sInfoEmpty":"显示第 0 至 0 项结果，共 0 项","sInfoFiltered":"(由 _MAX_ 项结果过滤)","sInfoPostFix":"","sSearch":"搜索:","sUrl":"","sEmptyTable":"表中数据为空","sLoadingRecords":"载入中...","sInfoThousands":",","oPaginate":{"sFirst":"首页","sPrevious":"上页","sNext":"下页","sLast":"末页"},"oAria":{"sSortAscending":": 以升序排列此列","sSortDescending":": 以降序排列此列"}}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms-slot-block-gui/assets/Zed/js/spryker-zed-cms-slot-block-gui-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jbXMtc2xvdC1ibG9jay1ndWktbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsSUFBSUEsWUFBWSxHQUFHLFNBQUFBLENBQVVDLE9BQU8sRUFBRTtFQUNsQyxJQUFJQyxLQUFLLEdBQUcsSUFBSTtFQUNoQixJQUFJLENBQUNDLHdCQUF3QixHQUFHLENBQUMsQ0FBQztFQUNsQyxJQUFJLENBQUNDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztFQUMzQixJQUFJLENBQUNDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztFQUMvQixJQUFJLENBQUNDLFdBQVcsR0FBRyxDQUFDLENBQUM7RUFDckIsSUFBSSxDQUFDQyx1QkFBdUIsR0FBRyxlQUFlO0VBRTlDQyxDQUFDLENBQUNDLE1BQU0sQ0FBQyxJQUFJLEVBQUVSLE9BQU8sQ0FBQztFQUV2QixJQUFJLENBQUNTLElBQUksR0FBRyxZQUFZO0lBQ3BCUixLQUFLLENBQUNFLGlCQUFpQixHQUFHSSxDQUFDLENBQUNOLEtBQUssQ0FBQ0Msd0JBQXdCLENBQUM7SUFDM0RELEtBQUssQ0FBQ0cscUJBQXFCLEdBQUdILEtBQUssQ0FBQ0UsaUJBQWlCLENBQUNPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDcEVULEtBQUssQ0FBQ1UsVUFBVSxDQUFDLENBQUM7SUFDbEJWLEtBQUssQ0FBQ0cscUJBQXFCLENBQUNRLEVBQUUsQ0FBQyxRQUFRLEVBQUVYLEtBQUssQ0FBQ1ksaUJBQWlCLENBQUM7SUFDakVaLEtBQUssQ0FBQ0UsaUJBQWlCLENBQUNTLEVBQUUsQ0FBQyxPQUFPLEVBQUVYLEtBQUssQ0FBQ0ssdUJBQXVCLEVBQUVMLEtBQUssQ0FBQ2EsUUFBUSxDQUFDO0VBQ3RGLENBQUM7RUFFRCxJQUFJLENBQUNILFVBQVUsR0FBRyxZQUFZO0lBQzFCVixLQUFLLENBQUNJLFdBQVcsQ0FBQ1UsbUJBQW1CLENBQUMsQ0FBQztJQUN2Q2QsS0FBSyxD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QVc7RUFDeEJJLE9BQU8sRUFBRUE7QUFDYixDQUFDOzs7Ozs7Ozs7Ozs7QUN6RUQ7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zLXNsb3QtYmxvY2stZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9ibG9ja3MtY2hvaWNlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1zbG90LWJsb2NrLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvYmxvY2tzLXRhYmxlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1zbG90LWJsb2NrLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtc2xvdC1ibG9jay1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3Nsb3QtYmxvY2tzLWZvcm0uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY21zLXNsb3QtYmxvY2stZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9zbG90LWJsb2Nrcy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtc2xvdC1ibG9jay1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jbXMtc2xvdC1ibG9jay1ndWktbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvZGF0YS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtc2xvdC1ibG9jay1ndWkvYXNzZXRzL1plZC9zYXNzL21haW4uc2Nzcz8zYjk2Iiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuLyBzeW5jIF5cXC5cXC8uKlxcLmpzb24kIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEJsb2Nrc0Nob2ljZSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICB0aGlzLmJsb2Nrc0Nob2ljZUZvcm1TZWxlY3RvciA9IHt9O1xuICAgIHRoaXMuJGJsb2Nrc0Nob2ljZUZvcm0gPSB7fTtcbiAgICB0aGlzLiRibG9ja3NDaG9pY2VEcm9wRG93biA9IHt9O1xuICAgIHRoaXMuYmxvY2tzVGFibGUgPSB7fTtcbiAgICB0aGlzLmJsb2Nrc0Nob2ljZUFkZFNlbGVjdG9yID0gJ1t0eXBlPWJ1dHRvbl0nO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zZWxmLiRibG9ja3NDaG9pY2VGb3JtID0gJChfc2VsZi5ibG9ja3NDaG9pY2VGb3JtU2VsZWN0b3IpO1xuICAgICAgICBfc2VsZi4kYmxvY2tzQ2hvaWNlRHJvcERvd24gPSBfc2VsZi4kYmxvY2tzQ2hvaWNlRm9ybS5maW5kKCdzZWxlY3QnKTtcbiAgICAgICAgX3NlbGYuaW5pdFNlbGVjdCgpO1xuICAgICAgICBfc2VsZi4kYmxvY2tzQ2hvaWNlRHJvcERvd24ub24oJ2NoYW5nZScsIF9zZWxmLnNlbGVjdEJsb2NrQ2hvaWNlKTtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc0Nob2ljZUZvcm0ub24oJ2NsaWNrJywgX3NlbGYuYmxvY2tzQ2hvaWNlQWRkU2VsZWN0b3IsIF9zZWxmLmFkZEJsb2NrKTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0U2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi5ibG9ja3NUYWJsZS5yZXNldE1vZGlmaWVkQmxvY2tzKCk7XG4gICAgICAgIF9zZWxmLiRibG9ja3NDaG9pY2VEcm9wRG93bi5zZWxlY3QyKHtcbiAgICAgICAgICAgIGFqYXg6IHtcbiAgICAgICAgICAgICAgICB1cmw6IF9zZWxmLmJhc2VVcmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiBmdW5jdGlvbiAocGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbXNDb2xsZWN0aW9uID0ge307XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc0NvbGxlY3Rpb25bX3NlbGYucGFyYW1UZXJtXSA9IHBhcmFtcy50ZXJtO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNDb2xsZWN0aW9uW19zZWxmLnBhcmFtUGFnZV0gPSBwYXJhbXMucGFnZSB8fCAxO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbXNDb2xsZWN0aW9uW19zZWxmLnBhcmFtSWRDbXNTbG90VGVtcGxhdGVdID0gX3NlbGYuYmxvY2tzVGFibGUuaWRDbXNTbG90VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc0NvbGxlY3Rpb25bX3NlbGYucGFyYW1JZENtc1Nsb3RdID0gX3NlbGYuYmxvY2tzVGFibGUuaWRDbXNTbG90O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXNDb2xsZWN0aW9uO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvY2Vzc1Jlc3VsdHM6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiAkLm1hcChkYXRhLnJlc3VsdHMsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kaXNhYmxlZCA9IGl0ZW0uZGlzYWJsZWQgIT09IF9zZWxmLmJsb2Nrc1RhYmxlLmlzQmxvY2tNb2RpZmllZChpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbjogZGF0YS5wYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGVsYXk6IDI1MCxcbiAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZW1wbGF0ZVNlbGVjdGlvbjogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgICQoY29udGFpbmVyLmVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCdpcy1hY3RpdmUnLCBjb250YWluZXIuaXNBY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgIC5kYXRhKCd2YWxpZC1mcm9tJywgY29udGFpbmVyLnZhbGlkRnJvbSlcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3ZhbGlkLXRvJywgY29udGFpbmVyLnZhbGlkRnJvbSlcbiAgICAgICAgICAgICAgICAgICAgLmRhdGEoJ3N0b3JlcycsIGNvbnRhaW5lci5zdG9yZXMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci50ZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMucmVzZXRTZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zZWxmLiRibG9ja3NDaG9pY2VEcm9wRG93bi52YWwoJycpLnRyaWdnZXIoJ2NoYW5nZScpO1xuICAgIH07XG5cbiAgICB0aGlzLnNlbGVjdEJsb2NrQ2hvaWNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXNTZWxlY3RlZCA9IF9zZWxmLiRibG9ja3NDaG9pY2VEcm9wRG93bi52YWwoKSAhPT0gJyc7XG4gICAgICAgICQoX3NlbGYuYmxvY2tzQ2hvaWNlQWRkU2VsZWN0b3IpLnRvZ2dsZUNsYXNzKCdidG4tYmFjaycsICFpc1NlbGVjdGVkKS50b2dnbGVDbGFzcygnYnRuLXByaW1hcnknLCBpc1NlbGVjdGVkKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hZGRCbG9jayA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgJHNlbGVjdGVkQmxvY2sgPSBfc2VsZi4kYmxvY2tzQ2hvaWNlRHJvcERvd24uZmluZCgnb3B0aW9uOnNlbGVjdGVkJyk7XG4gICAgICAgIGlmICghJHNlbGVjdGVkQmxvY2sudmFsKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBibG9ja0RhdGEgPSB7XG4gICAgICAgICAgICBibG9ja0lkOiAkc2VsZWN0ZWRCbG9jay52YWwoKSxcbiAgICAgICAgICAgIGJsb2NrTmFtZTogJHNlbGVjdGVkQmxvY2sudGV4dCgpLFxuICAgICAgICAgICAgdmFsaWRGcm9tOiAkc2VsZWN0ZWRCbG9jay5kYXRhKCd2YWxpZC1mcm9tJyksXG4gICAgICAgICAgICB2YWxpZFRvOiAkc2VsZWN0ZWRCbG9jay5kYXRhKCd2YWxpZC10bycpLFxuICAgICAgICAgICAgaXNBY3RpdmU6ICRzZWxlY3RlZEJsb2NrLmRhdGEoJ2lzLWFjdGl2ZScpLFxuICAgICAgICAgICAgc3RvcmVzOiAkc2VsZWN0ZWRCbG9jay5kYXRhKCdzdG9yZXMnKSxcbiAgICAgICAgfTtcblxuICAgICAgICBfc2VsZi5ibG9ja3NUYWJsZS5hZGRSb3coYmxvY2tEYXRhKTtcbiAgICAgICAgX3NlbGYucmVzZXRTZWxlY3QoKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCbG9ja3NDaG9pY2U7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkYXRhVGFibGUgPSByZXF1aXJlKCdaZWRHdWlNb2R1bGVzL2xpYnMvZGF0YS10YWJsZScpO1xuXG52YXIgQmxvY2tzVGFibGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBfc2VsZiA9IHRoaXM7XG4gICAgdGhpcy50YWJsZUJhc2VVcmwgPSAnJztcbiAgICB0aGlzLmJsb2Nrc1RhYmxlU2VsZWN0b3IgPSAnJztcbiAgICB0aGlzLmNtc1Nsb3RCbG9ja3NTZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuY21zU2xvdEJsb2Nrc092ZXJsYXlTZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuY21zU2xvdEJsb2Nrc092ZXJsYXlUb2dnbGVyQ2xhc3MgPSAnJztcbiAgICB0aGlzLnZpZXdCbG9ja1VybCA9ICcnO1xuICAgIHRoaXMuJGNtc1Nsb3RCbG9ja3MgPSB7fTtcbiAgICB0aGlzLiRibG9ja3NUYWJsZSA9IHt9O1xuICAgIHRoaXMuc2xvdEJsb2Nrc0Zvcm0gPSB7fTtcbiAgICB0aGlzLmJsb2Nrc0Nob2ljZUZvcm1TZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuJGJsb2Nrc0Nob2ljZURyb3BEb3duID0gJyc7XG4gICAgdGhpcy5pbml0T3B0aW9uc1N0YXRlID0gW107XG4gICAgdGhpcy5pbml0VGFibGVTdGF0ZSA9IFtdO1xuICAgIHRoaXMuaXNGaXJzdEluaXQgPSB0cnVlO1xuICAgIHRoaXMuaXNGaXJzdFRhYmxlUmVuZGVyID0gdHJ1ZTtcbiAgICB0aGlzLmNoYW5nZU9yZGVyQnV0dG9uU2VsZWN0b3IgPSAnLmJ0bltkYXRhLWRpcmVjdGlvbl0nO1xuICAgIHRoaXMucmVtb3ZlQnV0dG9uU2VsZWN0b3IgPSAnLmpzLXNsb3QtYmxvY2stcmVtb3ZlLWJ1dHRvbic7XG4gICAgdGhpcy5yZXNldEJ1dHRvblNlbGVjdG9yID0gJy5qcy1zbG90LWJsb2NrLXJlc2V0LWJ1dHRvbic7XG4gICAgdGhpcy5yb3dVbnNhdmVkT3ZlcmxheVNlbGVjdG9yID0gJy5qcy1yb3ctdW5zYXZlZC1vdmVybGF5IC5pYm94LWNvbnRlbnQnO1xuICAgIHRoaXMuc2VsZWN0ZWRSb3dJbmRleCA9IDA7XG4gICAgdGhpcy50YWJsZUlzVW5zYXZlZCA9IGZhbHNlO1xuICAgIHRoaXMubW9kaWZpZWRCbG9ja3MgPSBbXTtcblxuICAgICQuZXh0ZW5kKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi4kYmxvY2tzVGFibGUgPSAkKF9zZWxmLmJsb2Nrc1RhYmxlU2VsZWN0b3IpO1xuICAgICAgICBfc2VsZi5pbml0VGFibGVTdGF0ZSA9IFtdO1xuICAgICAgICBfc2VsZi4kY21zU2xvdEJsb2NrcyA9ICQoX3NlbGYuY21zU2xvdEJsb2Nrc1NlbGVjdG9yKTtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc0Nob2ljZURyb3BEb3duID0gJChfc2VsZi5ibG9ja3NDaG9pY2VGb3JtU2VsZWN0b3IpLmZpbmQoJ3NlbGVjdCcpO1xuICAgICAgICBfc2VsZi5pc0ZpcnN0VGFibGVSZW5kZXIgPSB0cnVlO1xuICAgICAgICBfc2VsZi5zbG90QmxvY2tzRm9ybS5yZXNvbHZlSXNVbnNhdmVkQ2FsbGJhY2sgPSBfc2VsZi5yZXNvbHZlSXNVbnNhdmVkO1xuICAgICAgICBpZiAoIV9zZWxmLmlzRmlyc3RJbml0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3NhdmVkQmxvY2tzRm9ybScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF9zZWxmLnNldEluaXRUYWJsZVN0YXRlKCk7XG4gICAgICAgICAgICBfc2VsZi50YWJsZVJvd1NlbGVjdCgpO1xuICAgICAgICAgICAgX3NlbGYucmVzZXRNb2RpZmllZEJsb2NrcygpO1xuICAgICAgICB9KTtcbiAgICAgICAgX3NlbGYuaXNGaXJzdEluaXQgPSBmYWxzZTtcbiAgICAgICAgX3NlbGYuc2V0SW5pdE9wdGlvbnNTdGF0ZSgpO1xuICAgIH07XG5cbiAgICB0aGlzLmxvYWRCbG9ja3NUYWJsZSA9IGZ1bmN0aW9uIChwYXJhbXMsIGlkQ21zU2xvdFRlbXBsYXRlLCBpZENtc1Nsb3QpIHtcbiAgICAgICAgX3NlbGYuaWRDbXNTbG90VGVtcGxhdGUgPSBpZENtc1Nsb3RUZW1wbGF0ZTtcbiAgICAgICAgX3NlbGYuaWRDbXNTbG90ID0gaWRDbXNTbG90O1xuXG4gICAgICAgIHZhciBhamF4VXJsID0gX3NlbGYudGFibGVCYXNlVXJsICsgJz8nICsgcGFyYW1zO1xuICAgICAgICBfc2VsZi4kYmxvY2tzVGFibGUuZGF0YSgnYWpheCcsIGFqYXhVcmwpO1xuICAgICAgICBfc2VsZi4kYmxvY2tzVGFibGUuRGF0YVRhYmxlKHtcbiAgICAgICAgICAgIGRlc3Ryb3k6IHRydWUsXG4gICAgICAgICAgICBhamF4OiB7XG4gICAgICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dG9XaWR0aDogZmFsc2UsXG4gICAgICAgICAgICBsYW5ndWFnZTogZGF0YVRhYmxlLmRlZmF1bHRDb25maWd1cmF0aW9uLmxhbmd1YWdlLFxuICAgICAgICAgICAgc2VhcmNoaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGluZm86IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLkRhdGFUYWJsZSgpLm9uKCdkcmF3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKF9zZWxmLmlzRmlyc3RUYWJsZVJlbmRlciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF9zZWxmLnNldEluaXRUYWJsZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfc2VsZi5yZXNvbHZlSXNVbnNhdmVkKF9zZWxmLmlzVW5zYXZlZCgpKTtcbiAgICAgICAgICAgIF9zZWxmLmluaXREYXRhVGFibGVMaXN0ZW5lcnMoaWRDbXNTbG90VGVtcGxhdGUsIGlkQ21zU2xvdCk7XG4gICAgICAgICAgICBfc2VsZi50YWJsZVJvd1NlbGVjdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLkRhdGFUYWJsZSgpLm9uKCdwcmVJbml0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3NlbGYuaXNGaXJzdFRhYmxlUmVuZGVyID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIF9zZWxmLiRibG9ja3NUYWJsZS5EYXRhVGFibGUoKS5vbignaW5pdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF9zZWxmLmlzRmlyc3RUYWJsZVJlbmRlciA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0RGF0YVRhYmxlTGlzdGVuZXJzID0gZnVuY3Rpb24gKGlkQ21zU2xvdFRlbXBsYXRlLCBpZENtc1Nsb3QpIHtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLm9uKCdwcm9jZXNzaW5nLmR0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3NlbGYub3ZlcmxheVRvZ2dsZXIodHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfc2VsZi5zbG90QmxvY2tzRm9ybS5yZWJ1aWxkRm9ybShcbiAgICAgICAgICAgIGlkQ21zU2xvdFRlbXBsYXRlLFxuICAgICAgICAgICAgaWRDbXNTbG90LFxuICAgICAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLkRhdGFUYWJsZSgpLnJvd3MoKS5kYXRhKCksXG4gICAgICAgICAgICBfc2VsZi5pc1Vuc2F2ZWQoKSxcbiAgICAgICAgKTtcbiAgICAgICAgX3NlbGYuaXNGaXJzdFRhYmxlUmVuZGVyID0gZmFsc2U7XG4gICAgICAgIF9zZWxmLmluaXRBY3Rpb25CdXR0b25zTGlzdGVuZXJzKCk7XG4gICAgICAgICQoX3NlbGYuJGJsb2Nrc1RhYmxlKS5maW5kKCd0Ym9keScpLm9uKCdjbGljaycsICd0cicsIF9zZWxmLnRhYmxlUm93U2VsZWN0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5pbml0QWN0aW9uQnV0dG9uc0xpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLmZpbmQoX3NlbGYuY2hhbmdlT3JkZXJCdXR0b25TZWxlY3Rvcikub24oJ2NsaWNrJywgX3NlbGYuY2hhbmdlT3JkZXJCdXR0b25zSGFuZGxlcik7XG4gICAgICAgIF9zZWxmLiRibG9ja3NUYWJsZS5maW5kKF9zZWxmLnJlbW92ZUJ1dHRvblNlbGVjdG9yKS5vbignY2xpY2snLCBfc2VsZi5yZW1vdmVCdXR0b25zSGFuZGxlcik7XG4gICAgICAgIF9zZWxmLiRjbXNTbG90QmxvY2tzXG4gICAgICAgICAgICAuZmluZChfc2VsZi5yZXNldEJ1dHRvblNlbGVjdG9yKVxuICAgICAgICAgICAgLm9mZignY2xpY2sucmVzZXRTbG90QmxvY2tzJylcbiAgICAgICAgICAgIC5vbignY2xpY2sucmVzZXRTbG90QmxvY2tzJywgX3NlbGYucmVzZXRCdXR0b25zSGFuZGxlcik7XG4gICAgfTtcblxuICAgIHRoaXMudXBkYXRlVGFibGUgPSBmdW5jdGlvbiAodGFibGVBcGksIHRhYmxlRGF0YSkge1xuICAgICAgICB0YWJsZUFwaS5yb3dzKCkucmVtb3ZlKCk7XG4gICAgICAgIHRhYmxlQXBpLnJvd3MuYWRkKHRhYmxlRGF0YSkuZHJhdygpO1xuICAgICAgICB0YWJsZUFwaS5yb3dzKHsgc2VsZWN0ZWQ6IHRydWUgfSkuZGVzZWxlY3QoKTtcbiAgICAgICAgdGFibGVBcGkucm93KF9zZWxmLnNlbGVjdGVkUm93SW5kZXgpLnNlbGVjdCgpO1xuICAgIH07XG5cbiAgICB0aGlzLnNldEluaXRUYWJsZVN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi5pbml0VGFibGVTdGF0ZSA9IF9zZWxmLmdldFRhYmxlKCkuZGF0YTtcbiAgICB9O1xuXG4gICAgdGhpcy5pc0Jsb2NrTW9kaWZpZWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgcmV0dXJuIF9zZWxmLm1vZGlmaWVkQmxvY2tzLmluY2x1ZGVzKGlkKTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNldE1vZGlmaWVkQmxvY2tzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi5tb2RpZmllZEJsb2NrcyA9IFtdO1xuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZUlzTW9kaWZpZWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgdmFyIGJsb2NrSW5kZXggPSBfc2VsZi5tb2RpZmllZEJsb2Nrcy5pbmRleE9mKGlkKTtcbiAgICAgICAgaWYgKGJsb2NrSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgX3NlbGYubW9kaWZpZWRCbG9ja3Muc3BsaWNlKGJsb2NrSW5kZXgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3NlbGYubW9kaWZpZWRCbG9ja3MucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5hZGRSb3cgPSBmdW5jdGlvbiAocm93RGF0YSA9IHt9KSB7XG4gICAgICAgIHZhciBibG9ja0lkID0gTnVtYmVyKHJvd0RhdGEuYmxvY2tJZCk7XG4gICAgICAgIHJvd0RhdGEgPSBbXG4gICAgICAgICAgICBibG9ja0lkLFxuICAgICAgICAgICAgcm93RGF0YS5ibG9ja05hbWUsXG4gICAgICAgICAgICByb3dEYXRhLnZhbGlkRnJvbSxcbiAgICAgICAgICAgIHJvd0RhdGEudmFsaWRUbyxcbiAgICAgICAgICAgIF9zZWxmLmdldFN0YXR1c0xhYmVsKHJvd0RhdGEuaXNBY3RpdmUpLFxuICAgICAgICAgICAgX3NlbGYuZ2V0U3RvcmVzTGFiZWxzKHJvd0RhdGEuc3RvcmVzKSxcbiAgICAgICAgICAgIF9zZWxmLmdldEFjdGlvbkJ1dHRvbnMocm93RGF0YS5ibG9ja0lkKSxcbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgdGFibGUgPSBfc2VsZi5nZXRUYWJsZSgpO1xuICAgICAgICB0YWJsZS5kYXRhLnVuc2hpZnQocm93RGF0YSk7XG4gICAgICAgIF9zZWxmLnVwZGF0ZVRhYmxlKHRhYmxlLmFwaSwgdGFibGUuZGF0YSk7XG4gICAgICAgIF9zZWxmLnRvZ2dsZUlzTW9kaWZpZWQoYmxvY2tJZCk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QWN0aW9uQnV0dG9ucyA9IGZ1bmN0aW9uIChibG9ja0lkKSB7XG4gICAgICAgIHZhciAkYnV0dG9ucyA9ICQoX3NlbGYuJGNtc1Nsb3RCbG9ja3MuZGF0YSgnYWN0aW9ucy1idXR0b25zLXRlbXBsYXRlJykpO1xuICAgICAgICB2YXIgYnV0dG9uc1RlbXBsYXRlID0gJyc7XG5cbiAgICAgICAgJGJ1dHRvbnMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgJGJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghJGJ1dHRvbi5pcygnYScpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGJ1dHRvbi5oYXNDbGFzcygnYnRuLXZpZXcnKSkge1xuICAgICAgICAgICAgICAgICRidXR0b24uYXR0cignaHJlZicsIF9zZWxmLnZpZXdCbG9ja1VybCArICc/aWQtY21zLWJsb2NrPScgKyBibG9ja0lkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnV0dG9uc1RlbXBsYXRlICs9ICRidXR0b25bMF0ub3V0ZXJIVE1MICsgJyAnO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnV0dG9uc1RlbXBsYXRlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFN0YXR1c0xhYmVsID0gZnVuY3Rpb24gKGlzQWN0aXZlKSB7XG4gICAgICAgIHZhciBzdGF0dXNMYWJlbCA9IGlzQWN0aXZlID8gJ2FjdGl2ZS1sYWJlbC10ZW1wbGF0ZScgOiAnaW5hY3RpdmUtbGFiZWwtdGVtcGxhdGUnO1xuXG4gICAgICAgIHJldHVybiBfc2VsZi4kY21zU2xvdEJsb2Nrcy5kYXRhKHN0YXR1c0xhYmVsKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRTdG9yZXNMYWJlbHMgPSBmdW5jdGlvbiAoc3RvcmVzKSB7XG4gICAgICAgIHZhciAkc3RvcmVUZW1wbGF0ZSA9ICQoX3NlbGYuJGNtc1Nsb3RCbG9ja3MuZGF0YSgnYWN0aXZlLWxhYmVsLXRlbXBsYXRlJykpO1xuICAgICAgICB2YXIgc3RvcmVzQXJyYXkgPSBzdG9yZXMuc3BsaXQoJywnKTtcblxuICAgICAgICByZXR1cm4gc3RvcmVzQXJyYXkucmVkdWNlKGZ1bmN0aW9uIChzdG9yZXNUZW1wbGF0ZSwgc3RvcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBzdG9yZXNUZW1wbGF0ZSArICRzdG9yZVRlbXBsYXRlLmh0bWwoc3RvcmUpWzBdLm91dGVySFRNTCArICcgJztcbiAgICAgICAgfSwgJycpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFRhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXBpOiBfc2VsZi4kYmxvY2tzVGFibGUuZGF0YVRhYmxlKCkuYXBpKCksXG4gICAgICAgICAgICBkYXRhOiBfc2VsZi4kYmxvY2tzVGFibGUuZGF0YVRhYmxlKCkuYXBpKCkuZGF0YSgpLnRvQXJyYXkoKSxcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGFuZ2VPcmRlckJ1dHRvbnNIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjbGlja0luZm8gPSBfc2VsZi5nZXRDbGlja0luZm8oZXZlbnQpO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gY2xpY2tJbmZvLiRidXR0b24uZGF0YSgnZGlyZWN0aW9uJyk7XG4gICAgICAgIHZhciBpc1Jvd0ZpcnN0ID0gY2xpY2tJbmZvLiRjbGlja2VkVGFibGVSb3cgPT09IDA7XG4gICAgICAgIHZhciBpc1Jvd0xhc3QgPSBjbGlja0luZm8uJGNsaWNrZWRUYWJsZVJvdyA9PT0gY2xpY2tJbmZvLiR0YWJsZUxlbmd0aCAtIDE7XG5cbiAgICAgICAgaWYgKChpc1Jvd0ZpcnN0ICYmIGRpcmVjdGlvbiA9PT0gJ3VwJykgfHwgKGlzUm93TGFzdCAmJiBkaXJlY3Rpb24gPT09ICdkb3duJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9zZWxmLmNoYW5nZU9yZGVyUm93KGNsaWNrSW5mby4kY2xpY2tlZFRhYmxlUm93LCBkaXJlY3Rpb24pO1xuICAgIH07XG5cbiAgICB0aGlzLmNoYW5nZU9yZGVyUm93ID0gZnVuY3Rpb24gKHJvd0luZGV4LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIHRhYmxlID0gX3NlbGYuZ2V0VGFibGUoKTtcbiAgICAgICAgdmFyIG5ld1Jvd0luZGV4ID0gbnVsbDtcblxuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAndXAnOlxuICAgICAgICAgICAgICAgIG5ld1Jvd0luZGV4ID0gcm93SW5kZXggLSAxO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wUm93ID0gdGFibGUuZGF0YVtuZXdSb3dJbmRleF07XG4gICAgICAgICAgICAgICAgdGFibGUuZGF0YVtuZXdSb3dJbmRleF0gPSB0YWJsZS5kYXRhW3Jvd0luZGV4XTtcbiAgICAgICAgICAgICAgICB0YWJsZS5kYXRhW3Jvd0luZGV4XSA9IHRlbXBSb3c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgICAgIG5ld1Jvd0luZGV4ID0gcm93SW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wUm93ID0gdGFibGUuZGF0YVtuZXdSb3dJbmRleF07XG4gICAgICAgICAgICAgICAgdGFibGUuZGF0YVtuZXdSb3dJbmRleF0gPSB0YWJsZS5kYXRhW3Jvd0luZGV4XTtcbiAgICAgICAgICAgICAgICB0YWJsZS5kYXRhW3Jvd0luZGV4XSA9IHRlbXBSb3c7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBfc2VsZi51cGRhdGVUYWJsZSh0YWJsZS5hcGksIHRhYmxlLmRhdGEpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlbW92ZUJ1dHRvbnNIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBjbGlja0luZm8gPSBfc2VsZi5nZXRDbGlja0luZm8oZXZlbnQpO1xuICAgICAgICB2YXIgdGFibGUgPSBfc2VsZi5nZXRUYWJsZSgpO1xuICAgICAgICB2YXIgcm93SWQgPSB0YWJsZS5kYXRhW2NsaWNrSW5mby4kY2xpY2tlZFRhYmxlUm93XVswXTtcbiAgICAgICAgX3NlbGYudXBkYXRlQ2hvaWNlRHJvcGRvd24ocm93SWQpO1xuICAgICAgICB0YWJsZS5kYXRhLnNwbGljZShjbGlja0luZm8uJGNsaWNrZWRUYWJsZVJvdywgMSk7XG4gICAgICAgIF9zZWxmLnVwZGF0ZVRhYmxlKHRhYmxlLmFwaSwgdGFibGUuZGF0YSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0SW5pdE9wdGlvbnNTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc0Nob2ljZURyb3BEb3duLmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3NlbGYuaW5pdE9wdGlvbnNTdGF0ZS5wdXNoKCQodGhpcykucHJvcCgnZGlzYWJsZWQnKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZUNob2ljZURyb3Bkb3duID0gZnVuY3Rpb24gKGJsb2NrSWQpIHtcbiAgICAgICAgX3NlbGYudG9nZ2xlSXNNb2RpZmllZChOdW1iZXIoYmxvY2tJZCkpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0Q2hvaWNlRHJvcGRvd24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zZWxmLiRibG9ja3NDaG9pY2VEcm9wRG93bi5jaGlsZHJlbignb3B0aW9uJykuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICQodGhpcykucHJvcCgnZGlzYWJsZWQnLCBfc2VsZi5pbml0T3B0aW9uc1N0YXRlW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICBfc2VsZi4kYmxvY2tzQ2hvaWNlRHJvcERvd24uc2VsZWN0MigpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlc2V0SGFuZGxlckNhbGxiYWNrID0gZnVuY3Rpb24gKCkge307XG5cbiAgICB0aGlzLnJlc2V0QnV0dG9uc0hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghX3NlbGYuaXNVbnNhdmVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIF9zZWxmLnRhYmxlSXNVbnNhdmVkID0gZmFsc2U7XG4gICAgICAgIF9zZWxmLnNsb3RCbG9ja3NGb3JtLmlzU3RhdGVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIF9zZWxmLnRvZ2dsZVJvd092ZXJsYXkoZmFsc2UpO1xuICAgICAgICBfc2VsZi50b2dnbGVSZXNldEJ1dHRvbihmYWxzZSk7XG4gICAgICAgIF9zZWxmLnJlc2V0SGFuZGxlckNhbGxiYWNrKCk7XG4gICAgfTtcblxuICAgIHRoaXMudG9nZ2xlUm93T3ZlcmxheSA9IGZ1bmN0aW9uIChzdGF0ZSA9IF9zZWxmLmlzVW5zYXZlZCgpKSB7XG4gICAgICAgIHZhciAkcm93VW5zYXZlZE92ZXJsYXkgPSAkKF9zZWxmLnJvd1Vuc2F2ZWRPdmVybGF5U2VsZWN0b3IpO1xuICAgICAgICBzdGF0ZSA9IHN0YXRlID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFzdGF0ZTtcbiAgICAgICAgJHJvd1Vuc2F2ZWRPdmVybGF5LmVhY2goZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciAkZWxlbWVudCA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAoc3RhdGUgJiYgJGVsZW1lbnQuZmluZCgnLmpzLXJvdy1vdmVybGF5JykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdmFyICRvdmVybGF5ID0gJCgnPGRpdi8+JykuYWRkQ2xhc3MoJ2pzLXJvdy1vdmVybGF5Jyk7XG4gICAgICAgICAgICAgICAgJGVsZW1lbnQuYXBwZW5kKCRvdmVybGF5KS5hZGRDbGFzcygnanMtcm93LW92ZXJsYXllZCcpO1xuICAgICAgICAgICAgICAgICRvdmVybGF5Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuc2hvd0FsZXJ0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJG92ZXJsYXkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnanMtcm93LW92ZXJsYXllZCcpLmZpbmQoJy5qcy1yb3ctb3ZlcmxheScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVSZXNldEJ1dHRvbiA9IGZ1bmN0aW9uIChzdGF0ZSA9IF9zZWxmLmlzVW5zYXZlZCgpKSB7XG4gICAgICAgICQoX3NlbGYucmVzZXRCdXR0b25TZWxlY3RvcikudG9nZ2xlQ2xhc3MoJ2hpZGRlbicsICFzdGF0ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q2xpY2tJbmZvID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAkYnV0dG9uOiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgJGNsaWNrZWRUYWJsZVJvdzogJChldmVudC5jdXJyZW50VGFyZ2V0KS5wYXJlbnRzKCd0cicpLmluZGV4KCksXG4gICAgICAgICAgICAkdGFibGVMZW5ndGg6ICQoZXZlbnQuY3VycmVudFRhcmdldCkucGFyZW50cygndGJvZHknKS5jaGlsZHJlbigndHInKS5sZW5ndGgsXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRoaXMuaXNVbnNhdmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3NlbGYudGFibGVJc1Vuc2F2ZWQ7XG4gICAgfTtcblxuICAgIHRoaXMucmVzb2x2ZUlzVW5zYXZlZCA9IGZ1bmN0aW9uIChpc1Vuc2F2ZWQpIHtcbiAgICAgICAgaWYgKCFpc1Vuc2F2ZWQpIHtcbiAgICAgICAgICAgIGlzVW5zYXZlZCA9IF9zZWxmLmNoZWNrVGFibGVTdGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVW5zYXZlZCAhPT0gX3NlbGYudGFibGVJc1Vuc2F2ZWQpIHtcbiAgICAgICAgICAgIF9zZWxmLnRvZ2dsZVJvd092ZXJsYXkoaXNVbnNhdmVkKTtcbiAgICAgICAgICAgIF9zZWxmLnRvZ2dsZVJlc2V0QnV0dG9uKGlzVW5zYXZlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBfc2VsZi50YWJsZUlzVW5zYXZlZCA9IGlzVW5zYXZlZDtcbiAgICAgICAgcmV0dXJuIF9zZWxmLnRhYmxlSXNVbnNhdmVkO1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrVGFibGVTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGluaXRUYWJsZVN0YXRlID0gX3NlbGYuaW5pdFRhYmxlU3RhdGU7XG4gICAgICAgIHZhciBjdXJyZW50VGFibGVTdGF0ZSA9IF9zZWxmLmdldFRhYmxlKCkuZGF0YTtcblxuICAgICAgICBpZiAoaW5pdFRhYmxlU3RhdGUubGVuZ3RoICE9PSBjdXJyZW50VGFibGVTdGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluaXRUYWJsZVN0YXRlLnNvbWUoZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXSAhPT0gY3VycmVudFRhYmxlU3RhdGVbaW5kZXhdWzBdO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5vdmVybGF5VG9nZ2xlciA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICAkKF9zZWxmLmNtc1Nsb3RCbG9ja3NPdmVybGF5U2VsZWN0b3IpLnRvZ2dsZUNsYXNzKF9zZWxmLmNtc1Nsb3RCbG9ja3NPdmVybGF5VG9nZ2xlckNsYXNzLCBzdGF0ZSk7XG4gICAgfTtcblxuICAgIHRoaXMudGFibGVSb3dTZWxlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB2YXIgcm93SW5kZXggPSBfc2VsZi5zZWxlY3RlZFJvd0luZGV4O1xuXG4gICAgICAgIGlmICgkKF9zZWxmLiRibG9ja3NUYWJsZSkuRGF0YVRhYmxlKCkucm93cygpLmNvdW50KCkgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkICYmICQoZWxlbWVudC50YXJnZXQpLmlzKCd0ZCcpKSB7XG4gICAgICAgICAgICByb3dJbmRleCA9ICQodGhpcykuaW5kZXgoKTtcbiAgICAgICAgICAgIF9zZWxmLnNlbGVjdGVkUm93SW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBfc2VsZi4kYmxvY2tzVGFibGUuRGF0YVRhYmxlKCkucm93KHJvd0luZGV4KTtcbiAgICAgICAgX3NlbGYuJGJsb2Nrc1RhYmxlLkRhdGFUYWJsZSgpLnJvd3MoKS5kZXNlbGVjdCgpO1xuICAgICAgICByb3cuc2VsZWN0KCk7XG4gICAgICAgIHZhciBpZENtc0Jsb2NrID0gcm93LmRhdGEoKVswXTtcblxuICAgICAgICAkKCcuanMtY21zLXNsb3QtYmxvY2stZm9ybS1pdGVtJykuaGlkZSgpO1xuXG4gICAgICAgIHZhciBjbXNTbG90QmxvY2tGb3JtSXRlbSA9ICQoJyNqcy1jbXMtc2xvdC1ibG9jay1mb3JtLWl0ZW0tJyArIGlkQ21zQmxvY2spO1xuICAgICAgICBfc2VsZi5zbG90QmxvY2tzRm9ybS50b2dnbGVFbmFibGVtZW50RnJvbUJsb2Nrc1RhYmxlKGNtc1Nsb3RCbG9ja0Zvcm1JdGVtKTtcbiAgICAgICAgY21zU2xvdEJsb2NrRm9ybUl0ZW0uc2hvdygpO1xuICAgIH07XG5cbiAgICB0aGlzLnNob3dBbGVydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyICRjbXNTbG90QmxvY2sgPSBfc2VsZi4kY21zU2xvdEJsb2NrcztcbiAgICAgICAgd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6ICRjbXNTbG90QmxvY2suZGF0YSgnYWxlcnQtdGl0bGUnKSxcbiAgICAgICAgICAgIGh0bWw6IGZhbHNlLFxuICAgICAgICAgICAgc2hvd0Nsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6ICdjbXMtc2xvdC1ibG9ja3MtYWxlcnQnLFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzFhYjM5NCcsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJGNtc1Nsb3RCbG9jay5kYXRhKCdhbGVydC1nby1iYWNrLWJ1dHRvbicpLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVUYWJsZVJvdyA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB2YXIgJGJsb2Nrc1RhYmxlID0gJChfc2VsZi5ibG9ja3NUYWJsZVNlbGVjdG9yKTtcblxuICAgICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgICAgICAkYmxvY2tzVGFibGUuY2xvc2VzdCgnLndyYXBwZXIgPiAucm93JykuaGlkZSgpO1xuICAgICAgICAgICAgX3NlbGYudG9nZ2xlUm93T3ZlcmxheShmYWxzZSk7XG4gICAgICAgICAgICBfc2VsZi50b2dnbGVSZXNldEJ1dHRvbihmYWxzZSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgICRibG9ja3NUYWJsZS5jbG9zZXN0KCcud3JhcHBlciA+IC5yb3cnKS5zaG93KCk7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmxvY2tzVGFibGU7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTbG90QmxvY2tzID0gcmVxdWlyZSgnLi9zbG90LWJsb2NrcycpO1xudmFyIEJsb2Nrc1RhYmxlID0gcmVxdWlyZSgnLi9ibG9ja3MtdGFibGUnKTtcbnZhciBCbG9ja3NDaG9pY2UgPSByZXF1aXJlKCcuL2Jsb2Nrcy1jaG9pY2UnKTtcbnZhciBTbG90QmxvY2tzRm9ybSA9IHJlcXVpcmUoJy4vc2xvdC1ibG9ja3MtZm9ybScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGJsb2Nrc0Nob2ljZUZvcm1TZWxlY3RvciA9ICdbbmFtZT1ibG9jay1jaG9pY2VdJztcbiAgICB2YXIgY21zU2xvdEJsb2Nrc1NlbGVjdG9yID0gJy5qcy1jbXMtc2xvdC1ibG9ja3MnO1xuXG4gICAgdmFyIHNsb3RCbG9ja3NGb3JtID0gbmV3IFNsb3RCbG9ja3NGb3JtKHtcbiAgICAgICAgY21zU2xvdEJsb2Nrc1NlbGVjdG9yOiBjbXNTbG90QmxvY2tzU2VsZWN0b3IsXG4gICAgICAgIHNsb3RCbG9ja0Zvcm1JdGVtQ2xhc3M6ICcuanMtY21zLXNsb3QtYmxvY2stZm9ybS1pdGVtJyxcbiAgICAgICAgc2xvdEJsb2NrRm9ybUl0ZW1JZFByZWZpeDogJyNqcy1jbXMtc2xvdC1ibG9jay1mb3JtLWl0ZW0tJyxcbiAgICAgICAgc2xvdEJsb2NrRm9ybVdyYXBwZXJJZDogJyNqcy1jbXMtc2xvdC1ibG9jay1mb3JtLWlubmVyLXdyYXBwZXInLFxuICAgIH0pO1xuXG4gICAgdmFyIGJsb2Nrc1RhYmxlID0gbmV3IEJsb2Nrc1RhYmxlKHtcbiAgICAgICAgdGFibGVCYXNlVXJsOiAnL2Ntcy1zbG90LWJsb2NrLWd1aS9zbG90LWJsb2NrL3RhYmxlJyxcbiAgICAgICAgYmxvY2tzVGFibGVTZWxlY3RvcjogJy5qcy1jbXMtc2xvdC1ibG9jay10YWJsZScsXG4gICAgICAgIGNtc1Nsb3RCbG9ja3NTZWxlY3RvcjogY21zU2xvdEJsb2Nrc1NlbGVjdG9yLFxuICAgICAgICBjbXNTbG90QmxvY2tzT3ZlcmxheVNlbGVjdG9yOiAnLmpzLWNtcy1zbG90LWJsb2Nrc19fb3ZlcmxheScsXG4gICAgICAgIGNtc1Nsb3RCbG9ja3NPdmVybGF5VG9nZ2xlckNsYXNzOiAnY21zLXNsb3QtYmxvY2tzX19vdmVybGF5LS1oaWRkZW4nLFxuICAgICAgICBzbG90QmxvY2tzRm9ybTogc2xvdEJsb2Nrc0Zvcm0sXG4gICAgICAgIHZpZXdCbG9ja1VybDogJy9jbXMtYmxvY2stZ3VpL3ZpZXctYmxvY2snLFxuICAgICAgICBibG9ja3NDaG9pY2VGb3JtU2VsZWN0b3I6IGJsb2Nrc0Nob2ljZUZvcm1TZWxlY3RvcixcbiAgICB9KTtcblxuICAgIHZhciBibG9ja3NDaG9pY2UgPSBuZXcgQmxvY2tzQ2hvaWNlKHtcbiAgICAgICAgYmxvY2tzQ2hvaWNlRm9ybVNlbGVjdG9yOiBibG9ja3NDaG9pY2VGb3JtU2VsZWN0b3IsXG4gICAgICAgIGJsb2Nrc1RhYmxlOiBibG9ja3NUYWJsZSxcbiAgICAgICAgYmxvY2tzQ2hvaWNlQWRkU2VsZWN0b3I6ICcjYmxvY2stY2hvaWNlX2FkZCcsXG4gICAgICAgIGJhc2VVcmw6ICcvY21zLXNsb3QtYmxvY2stZ3VpL2Ntcy1ibG9jay1zdWdnZXN0JyxcbiAgICAgICAgcGFyYW1UZXJtOiAncScsXG4gICAgICAgIHBhcmFtUGFnZTogJ3BhZ2UnLFxuICAgICAgICBwYXJhbUlkQ21zU2xvdFRlbXBsYXRlOiAnaWQtY21zLXNsb3QtdGVtcGxhdGUnLFxuICAgICAgICBwYXJhbUlkQ21zU2xvdDogJ2lkLWNtcy1zbG90JyxcbiAgICB9KTtcblxuICAgIHZhciBzbG90QmxvY2tzID0gbmV3IFNsb3RCbG9ja3Moe1xuICAgICAgICBzbG90U2VsZWN0b3I6ICcuanMtcm93LWxpc3Qtb2Ytc2xvdHMnLFxuICAgICAgICBzbG90VGFibGVTZWxlY3RvcjogJy5qcy1yb3ctbGlzdC1vZi1zbG90cyB0YWJsZScsXG4gICAgICAgIGJsb2NrQ29udGFpbmVyU2VsZWN0b3I6ICcuanMtcm93LWxpc3Qtb2YtYmxvY2tzLWNvbnRhaW5lcicsXG4gICAgICAgIGNtc1Nsb3RCbG9ja0NvbnRlbnRQcm92aWRlclNlbGVjdG9yOiAnI2Ntcy1zbG90LWJsb2NrLWNvbnRlbnQtcHJvdmlkZXInLFxuICAgICAgICBiYXNlVXJsOiAnL2Ntcy1zbG90LWJsb2NrLWd1aS9zbG90LWJsb2NrL2luZGV4JyxcbiAgICAgICAgcGFyYW1JZENtc1Nsb3RUZW1wbGF0ZTogJ2lkLWNtcy1zbG90LXRlbXBsYXRlJyxcbiAgICAgICAgcGFyYW1JZENtc1Nsb3Q6ICdpZC1jbXMtc2xvdCcsXG4gICAgICAgIGJsb2Nrc1RhYmxlOiBibG9ja3NUYWJsZSxcbiAgICAgICAgYmxvY2tzQ2hvaWNlOiBibG9ja3NDaG9pY2UsXG4gICAgICAgIHNsb3RCbG9ja3NGb3JtOiBzbG90QmxvY2tzRm9ybSxcbiAgICAgICAgY29udGVudFByb3ZpZGVyQXR0cmlidXRlOiAnZGF0YS1jb250ZW50LXByb3ZpZGVyJyxcbiAgICB9KTtcblxuICAgIGdsb2JhbC5DbXNTbG90R3VpX1Nsb3RUYWJsZS5kYXRhVGFibGVJbml0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNsb3RCbG9ja3MuaW5pdCgpO1xuICAgIH07XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFNsb3RCbG9ja3NGb3JtID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICB2YXIgX3NlbGYgPSB0aGlzO1xuICAgIHRoaXMuJGZvcm1XcmFwcGVyID0ge307XG4gICAgdGhpcy5mb3JtID0ge307XG4gICAgdGhpcy5zYXZlQnV0dG9uID0ge307XG4gICAgdGhpcy5mb3JtSXRlbXNDb3VudCA9IDA7XG4gICAgdGhpcy5mb3JtVGVtcGxhdGUgPSAnJztcbiAgICB0aGlzLmNtc1Nsb3RCbG9ja3NTZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuZm9ybUluaXRpYWxTdGF0ZSA9ICcnO1xuICAgIHRoaXMuaXNTdGF0ZUNoYW5nZWQgPSBmYWxzZTtcbiAgICB0aGlzLnNsb3RCbG9ja0Zvcm1JdGVtQ2xhc3MgPSAnJztcbiAgICB0aGlzLnNsb3RCbG9ja0Zvcm1JdGVtSWRQcmVmaXggPSAnJztcbiAgICB0aGlzLnNsb3RCbG9ja0Zvcm1XcmFwcGVySWQgPSAnJztcbiAgICB0aGlzLnJlc29sdmVJc1Vuc2F2ZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfTtcblxuICAgICQuZXh0ZW5kKHRoaXMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi4kZm9ybVdyYXBwZXIgPSAkKF9zZWxmLmNtc1Nsb3RCbG9ja3NTZWxlY3Rvcik7XG4gICAgICAgIF9zZWxmLmZvcm0gPSBfc2VsZi4kZm9ybVdyYXBwZXIuZmluZCgnZm9ybVtuYW1lPXNsb3RfYmxvY2tzXScpO1xuICAgICAgICBfc2VsZi5zYXZlQnV0dG9uID0gX3NlbGYuZm9ybS5maW5kKCdpbnB1dFt0eXBlPXN1Ym1pdF0nKTtcbiAgICAgICAgX3NlbGYuZm9ybUl0ZW1zQ291bnQgPSBwYXJzZUludChfc2VsZi4kZm9ybVdyYXBwZXIuZGF0YSgnc2xvdC1ibG9jay1pdGVtLWNvdW50JykpO1xuICAgICAgICBfc2VsZi5mb3JtVGVtcGxhdGUgPSBfc2VsZi4kZm9ybVdyYXBwZXIuZGF0YSgnc2xvdC1ibG9jay1pdGVtLWZvcm0tdGVtcGxhdGUnKTtcbiAgICAgICAgX3NlbGYuZm9ybS5vbignc3VibWl0JywgX3NlbGYuc2F2ZSk7XG4gICAgICAgIF9zZWxmLmZvcm0ub24oJ2NoYW5nZScsICdpbnB1dFtkYXRhLWRpc2FibGVdOnZpc2libGUnLCBfc2VsZi50b2dnbGVFbmFibGVtZW50RnJvbVJhZGlvSW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLnJlYnVpbGRGb3JtID0gZnVuY3Rpb24gKGlkQ21zU2xvdFRlbXBsYXRlLCBpZENtc1Nsb3QsIHRhYmxlRGF0YSwgaXNDaGFuZ2VkKSB7XG4gICAgICAgIGlmIChpc0NoYW5nZWQgJiYgJCh0YWJsZURhdGEpLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICQoX3NlbGYuc2xvdEJsb2NrRm9ybVdyYXBwZXJJZCkuZW1wdHkoKTtcbiAgICAgICAgICAgIF9zZWxmLnNldFN0YXRlQ2hhbmdlZCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfc2VsZi5mb3JtSXRlbXNDb3VudCA9ICQoX3NlbGYuc2xvdEJsb2NrRm9ybUl0ZW1DbGFzcykubGVuZ3RoO1xuICAgICAgICB2YXIgcHJldkNtc0Jsb2NrSWQgPSAwO1xuXG4gICAgICAgICQodGFibGVEYXRhKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xuICAgICAgICAgICAgdmFyICRmb3JtSXRlbSA9ICQoX3NlbGYuc2xvdEJsb2NrRm9ybUl0ZW1JZFByZWZpeCArIGl0ZW1bMF0pO1xuXG4gICAgICAgICAgICBpZiAoJGZvcm1JdGVtLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgICAgICAkZm9ybUl0ZW0gPSBfc2VsZi5jcmVhdGVOZXdGb3JtRWxlbWVudChpZENtc1Nsb3RUZW1wbGF0ZSwgaWRDbXNTbG90LCBpdGVtWzBdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJGZvcm1JdGVtLmZpbmQoJ2lucHV0W25hbWUqPVxcXFxbcG9zaXRpb25cXFxcXV0nKS52YWwoaW5kZXggKyAxKTtcbiAgICAgICAgICAgICQoX3NlbGYuc2xvdEJsb2NrRm9ybVdyYXBwZXJJZCkucHJlcGVuZCgkZm9ybUl0ZW0pO1xuXG4gICAgICAgICAgICBpZiAocHJldkNtc0Jsb2NrSWQgPiAwKSB7XG4gICAgICAgICAgICAgICAgJGZvcm1JdGVtLmluc2VydEFmdGVyKCQoX3NlbGYuc2xvdEJsb2NrRm9ybUl0ZW1JZFByZWZpeCArIHByZXZDbXNCbG9ja0lkKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXZDbXNCbG9ja0lkID0gaXRlbVswXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChfc2VsZi5zbG90QmxvY2tGb3JtSXRlbUlkUHJlZml4ICsgcHJldkNtc0Jsb2NrSWQpXG4gICAgICAgICAgICAubmV4dEFsbCgpXG4gICAgICAgICAgICAucmVtb3ZlKCk7XG4gICAgICAgIF9zZWxmLmluaXRGb3JtSXRlbXMoKTtcbiAgICAgICAgaWYgKCFpc0NoYW5nZWQpIHtcbiAgICAgICAgICAgIF9zZWxmLmZvcm1Jbml0aWFsU3RhdGUgPSBfc2VsZi5mb3JtLnNlcmlhbGl6ZSgpO1xuICAgICAgICB9XG4gICAgICAgIF9zZWxmLnNldFN0YXRlQ2hhbmdlZCgpO1xuICAgIH07XG5cbiAgICB0aGlzLnNhdmUgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgdXJsID0gJCh0aGlzKS5hdHRyKCdhY3Rpb24nKTtcbiAgICAgICAgdmFyIGZvcm1TZXJpYWxpemUgPSAkKHRoaXMpLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgICQucG9zdCh1cmwsIGZvcm1TZXJpYWxpemUpXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9zZWxmLmlzU3RhdGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgJChfc2VsZi5zbG90QmxvY2tGb3JtV3JhcHBlcklkKS5odG1sKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5pbml0Rm9ybUl0ZW1zKCk7XG4gICAgICAgICAgICAgICAgX3NlbGYuZm9ybUluaXRpYWxTdGF0ZSA9IF9zZWxmLmZvcm0uc2VyaWFsaXplKCk7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2F2ZWRCbG9ja3NGb3JtJyk7XG4gICAgICAgICAgICAgICAgX3NlbGYuc2V0U3RhdGVDaGFuZ2VkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zd2VldEFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuYWN0aXZhdGVCdXR0b24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmFjdGl2YXRlQnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfc2VsZi5zYXZlQnV0dG9uLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgIF9zZWxmLnNhdmVCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlTmV3Rm9ybUVsZW1lbnQgPSBmdW5jdGlvbiAoaWRDbXNTbG90VGVtcGxhdGUsIGlkQ21zU2xvdCwgaWRDbXNCbG9jaykge1xuICAgICAgICB2YXIgZm9ybVRlbXBsYXRlID1cbiAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwianMtY21zLXNsb3QtYmxvY2stZm9ybS1pdGVtXCIgJyArXG4gICAgICAgICAgICAnaWQ9XCJqcy1jbXMtc2xvdC1ibG9jay1mb3JtLWl0ZW0tJyArXG4gICAgICAgICAgICBpZENtc0Jsb2NrICtcbiAgICAgICAgICAgICdcIj4nICtcbiAgICAgICAgICAgIF9zZWxmLmZvcm1UZW1wbGF0ZSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgdmFyIGZvcm1JdGVtID0gZm9ybVRlbXBsYXRlLnJlcGxhY2UoL19fbmFtZV9fL2csIF9zZWxmLmZvcm1JdGVtc0NvdW50KTtcbiAgICAgICAgZm9ybUl0ZW0gPSAkKCQucGFyc2VIVE1MKGZvcm1JdGVtKSk7XG4gICAgICAgIGZvcm1JdGVtLmZpbmQoJ2lucHV0W25hbWUqPVxcXFxbaWRTbG90VGVtcGxhdGVcXFxcXV0nKS52YWwoaWRDbXNTbG90VGVtcGxhdGUpO1xuICAgICAgICBmb3JtSXRlbS5maW5kKCdpbnB1dFtuYW1lKj1cXFxcW2lkU2xvdFxcXFxdXScpLnZhbChpZENtc1Nsb3QpO1xuICAgICAgICBmb3JtSXRlbS5maW5kKCdpbnB1dFtuYW1lKj1cXFxcW2lkQ21zQmxvY2tcXFxcXV0nKS52YWwoaWRDbXNCbG9jayk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1JdGVtO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXRGb3JtSXRlbXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zZWxmLmZvcm0uZmluZCgnc2VsZWN0JykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3QySW5pdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICAgIHZhciBzZWxlY3RFbGVtZW50ID0gJChlbGVtZW50KTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdEVsZW1lbnQuZGF0YSgnYXV0b2NvbXBsZXRlLXVybCcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0MkluaXRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBhamF4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHNlbGVjdEVsZW1lbnQuZGF0YSgnYXV0b2NvbXBsZXRlLXVybCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWluaW11bUlucHV0TGVuZ3RoOiAzLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RFbGVtZW50LnNlbGVjdDIoc2VsZWN0MkluaXRPcHRpb25zKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3NlbGYuZm9ybS5maW5kKCc6aW5wdXQnKS5vZmYoJ2NoYW5nZS5jaGFuZ2VkU3RhdGUnKS5vbignY2hhbmdlLmNoYW5nZWRTdGF0ZScsIF9zZWxmLnNldFN0YXRlQ2hhbmdlZCk7XG4gICAgfTtcblxuICAgIHRoaXMuc2V0U3RhdGVDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXNDaGFuZ2VkID0gX3NlbGYuZm9ybUluaXRpYWxTdGF0ZSAhPT0gX3NlbGYuZm9ybS5zZXJpYWxpemUoKTtcbiAgICAgICAgaXNDaGFuZ2VkID0gX3NlbGYucmVzb2x2ZUlzVW5zYXZlZENhbGxiYWNrKGlzQ2hhbmdlZCk7XG4gICAgICAgIF9zZWxmLmlzU3RhdGVDaGFuZ2VkID0gaXNDaGFuZ2VkO1xuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZUVuYWJsZW1lbnRGcm9tUmFkaW9JbnB1dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3NlbGYudG9nZ2xlRW5hYmxlbWVudCgkKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgdGhpcy50b2dnbGVFbmFibGVtZW50RnJvbUJsb2Nrc1RhYmxlID0gZnVuY3Rpb24gKGNtc1Nsb3RCbG9ja0Zvcm1JdGVtKSB7XG4gICAgICAgICQoJ2lucHV0W2RhdGEtZGlzYWJsZV0nLCBjbXNTbG90QmxvY2tGb3JtSXRlbSkuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIF9zZWxmLnRvZ2dsZUVuYWJsZW1lbnQoJCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnRvZ2dsZUVuYWJsZW1lbnQgPSBmdW5jdGlvbiAocmFkaW9JbnB1dCkge1xuICAgICAgICBpZiAoIXJhZGlvSW5wdXQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnB1dHMgPSByYWRpb0lucHV0LmRhdGEoJ2lucHV0cycpO1xuICAgICAgICB2YXIgZGlzYWJsZWQgPSByYWRpb0lucHV0LmRhdGEoJ2Rpc2FibGUnKTtcblxuICAgICAgICAkLmVhY2goaW5wdXRzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICByYWRpb0lucHV0XG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoX3NlbGYuc2xvdEJsb2NrRm9ybUl0ZW1DbGFzcylcbiAgICAgICAgICAgICAgICAuZmluZChcInNlbGVjdFtuYW1lKj0nXCIgKyB2YWx1ZSArIFwiJ11cIilcbiAgICAgICAgICAgICAgICAucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsb3RCbG9ja3NGb3JtO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2xvdEJsb2NrcyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIF9zZWxmID0gdGhpcztcbiAgICB0aGlzLnNsb3RTZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuc2xvdFRhYmxlU2VsZWN0b3IgPSAnJztcbiAgICB0aGlzLmJsb2NrQ29udGFpbmVyU2VsZWN0b3IgPSAnJztcbiAgICB0aGlzLmJhc2VVcmwgPSAnJztcbiAgICB0aGlzLiRzbG90VGFibGUgPSB7fTtcbiAgICB0aGlzLmJsb2Nrc1RhYmxlID0ge307XG4gICAgdGhpcy5ibG9ja3NDaG9pY2UgPSB7fTtcbiAgICB0aGlzLnNsb3RCbG9ja3NGb3JtID0ge307XG4gICAgdGhpcy5jbXNTbG90QmxvY2tDb250ZW50UHJvdmlkZXJTZWxlY3RvciA9ICcnO1xuICAgIHRoaXMuY21zU2xvdEJsb2NrQ29udGVudFByb3ZpZGVyID0gJyc7XG4gICAgdGhpcy5jb250ZW50UHJvdmlkZXJBdHRyaWJ1dGUgPSAnJztcbiAgICB0aGlzLnBhcmFtSWRDbXNTbG90VGVtcGxhdGUgPSAnJztcbiAgICB0aGlzLnBhcmFtSWRDbXNTbG90ID0gJyc7XG4gICAgdGhpcy5pc0ZpcnN0SW5pdCA9IHRydWU7XG5cbiAgICAkLmV4dGVuZCh0aGlzLCBvcHRpb25zKTtcblxuICAgIHRoaXMuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3NlbGYuY21zU2xvdEJsb2NrQ29udGVudFByb3ZpZGVyID0gJC50cmltKCQoX3NlbGYuY21zU2xvdEJsb2NrQ29udGVudFByb3ZpZGVyU2VsZWN0b3IpLnZhbCgpKTtcbiAgICAgICAgX3NlbGYuJHNsb3RUYWJsZSA9ICQoX3NlbGYuc2xvdFRhYmxlU2VsZWN0b3IpLkRhdGFUYWJsZSgpO1xuICAgICAgICAkKF9zZWxmLnNsb3RUYWJsZVNlbGVjdG9yKS5maW5kKCd0Ym9keScpLm9uKCdjbGljaycsICd0cicsIF9zZWxmLnRhYmxlUm93U2VsZWN0KTtcbiAgICAgICAgX3NlbGYuJHNsb3RUYWJsZS5vbignZHJhdycsIF9zZWxmLnNlbGVjdEZpcnN0Um93KTtcbiAgICAgICAgX3NlbGYuJHNsb3RUYWJsZS5vbignc2VsZWN0JywgX3NlbGYubG9hZEJsb2Nrc1RhYmxlKTtcbiAgICB9O1xuXG4gICAgdGhpcy50YWJsZVJvd1NlbGVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIGlmICghJChlbGVtZW50LnRhcmdldCkuaXMoJ3RkJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjZWxsSW5kZXggPSAkKHRoaXMpLmluZGV4KCk7XG4gICAgICAgIF9zZWxmLnVwZGF0ZVJvdyhjZWxsSW5kZXgpO1xuICAgIH07XG5cbiAgICB0aGlzLnVwZGF0ZVJvdyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBfc2VsZi4kc2xvdFRhYmxlLnJvd3MoKS5kZXNlbGVjdCgpO1xuICAgICAgICBfc2VsZi4kc2xvdFRhYmxlLnJvdyhpbmRleCkuc2VsZWN0KCk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VsZWN0Rmlyc3RSb3cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpc1Nsb3RUYWJsZUVuYWJsZWQgPSBfc2VsZi4kc2xvdFRhYmxlLnJvd3MoKS5jb3VudCgpICE9PSAwICYmICQoX3NlbGYuc2xvdFRhYmxlU2VsZWN0b3IpLmlzKCc6dmlzaWJsZScpO1xuICAgICAgICBfc2VsZi5ibG9ja3NUYWJsZS50b2dnbGVUYWJsZVJvdyhpc1Nsb3RUYWJsZUVuYWJsZWQpO1xuICAgICAgICBfc2VsZi4kc2xvdFRhYmxlLnJvdygwKS5zZWxlY3QoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5sb2FkQmxvY2tzVGFibGUgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXBpLCB0eXBlLCBpbmRleGVzKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZVRhYmxlQXBpID0gJCgnI3RlbXBsYXRlLWxpc3QtdGFibGUnKS5kYXRhVGFibGUoKS5hcGkoKTtcblxuICAgICAgICBpZiAodGVtcGxhdGVUYWJsZUFwaS5yb3dzKHsgc2VsZWN0ZWQ6IHRydWUgfSkuY291bnQoKSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFfc2VsZi5pc0Ntc1Nsb3RCbG9ja0NvbnRlbnRQcm92aWRlcihhcGksIGluZGV4ZXMpKSB7XG4gICAgICAgICAgICBfc2VsZi5ibG9ja3NUYWJsZS50b2dnbGVUYWJsZVJvdyhmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaWRDbXNTbG90VGVtcGxhdGUgPSB0ZW1wbGF0ZVRhYmxlQXBpLnJvd3MoeyBzZWxlY3RlZDogdHJ1ZSB9KS5kYXRhKClbMF1bMF07XG4gICAgICAgIHZhciBpZENtc1Nsb3QgPSBhcGkucm93KGluZGV4ZXNbMF0pLmRhdGEoKVswXTtcbiAgICAgICAgdmFyIHBhcmFtc0NvbGxlY3Rpb24gPSB7fTtcbiAgICAgICAgcGFyYW1zQ29sbGVjdGlvbltfc2VsZi5wYXJhbUlkQ21zU2xvdFRlbXBsYXRlXSA9IGlkQ21zU2xvdFRlbXBsYXRlO1xuICAgICAgICBwYXJhbXNDb2xsZWN0aW9uW19zZWxmLnBhcmFtSWRDbXNTbG90XSA9IGlkQ21zU2xvdDtcbiAgICAgICAgdmFyIHBhcmFtcyA9ICQucGFyYW0ocGFyYW1zQ29sbGVjdGlvbik7XG4gICAgICAgICQuZ2V0KF9zZWxmLmJhc2VVcmwgKyAnPycgKyBwYXJhbXMpLmRvbmUoZnVuY3Rpb24gKGh0bWwpIHtcbiAgICAgICAgICAgICQoX3NlbGYuYmxvY2tDb250YWluZXJTZWxlY3RvcikucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKGh0bWwpLmluc2VydEFmdGVyKCQoX3NlbGYuc2xvdFNlbGVjdG9yKSk7XG5cbiAgICAgICAgICAgIF9zZWxmLmJsb2Nrc1RhYmxlLmluaXQoKTtcbiAgICAgICAgICAgIF9zZWxmLmJsb2Nrc1RhYmxlLm92ZXJsYXlUb2dnbGVyKGZhbHNlKTtcbiAgICAgICAgICAgIF9zZWxmLmJsb2Nrc0Nob2ljZS5pbml0KCk7XG4gICAgICAgICAgICBfc2VsZi5zbG90QmxvY2tzRm9ybS5pbml0KCk7XG4gICAgICAgICAgICBfc2VsZi5ibG9ja3NUYWJsZS5sb2FkQmxvY2tzVGFibGUocGFyYW1zLCBpZENtc1Nsb3RUZW1wbGF0ZSwgaWRDbXNTbG90KTtcbiAgICAgICAgICAgIF9zZWxmLmJsb2Nrc1RhYmxlLnJlc2V0SGFuZGxlckNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmxvYWRCbG9ja3NUYWJsZShlbGVtZW50LCBhcGksIHR5cGUsIGluZGV4ZXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghX3NlbGYuaXNGaXJzdEluaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfc2VsZi5pc0ZpcnN0SW5pdCA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldERhdGFUYWJsZUFwaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9zZWxmLiRzbG90VGFibGU7XG4gICAgfTtcblxuICAgIHRoaXMuaXNDbXNTbG90QmxvY2tDb250ZW50UHJvdmlkZXIgPSBmdW5jdGlvbiAoYXBpLCBpbmRleGVzKSB7XG4gICAgICAgIHJldHVybiBhcGlcbiAgICAgICAgICAgIC5yb3coaW5kZXhlc1swXSlcbiAgICAgICAgICAgIC5ub2RlcygpXG4gICAgICAgICAgICAudG8kKClcbiAgICAgICAgICAgIC5maW5kKCdbJyArIF9zZWxmLmNvbnRlbnRQcm92aWRlckF0dHJpYnV0ZSArIFwiPSdcIiArIF9zZWxmLmNtc1Nsb3RCbG9ja0NvbnRlbnRQcm92aWRlciArIFwiJ11cIikubGVuZ3RoO1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNsb3RCbG9ja3M7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG5yZXF1aXJlKCcuL21vZHVsZXMvbWFpbicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBnZXRMb2NhbGUoKSB7XG4gICAgdmFyIGxvY2FsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LmFwcGxpY2F0aW9uTG9jYWxlO1xuICAgIGlmICh0eXBlb2YgbG9jYWxlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gbG9jYWxlLnNwbGl0KCdfJylbMF0uc3BsaXQoJy0nKVswXTtcbiAgICB9XG4gICAgcmV0dXJuICdlbic7XG59XG5cbmZ1bmN0aW9uIGdldFRyYW5zbGF0aW9uKGxvY2FsZSkge1xuICAgIHJldHVybiByZXF1aXJlKCcuL2kxOG4vJyArIGxvY2FsZSArICcuanNvbicpO1xufVxuXG52YXIgbG9jYWxlID0gZ2V0TG9jYWxlKCk7XG5cbnZhciB0cmFuc2xhdGlvbk9iaiA9IGdldFRyYW5zbGF0aW9uKGxvY2FsZSk7XG5cbmlmICh0cmFuc2xhdGlvbk9iai5zU2VhcmNoKSB7XG4gICAgdHJhbnNsYXRpb25PYmouc2VhcmNoUGxhY2Vob2xkZXIgPSB0cmFuc2xhdGlvbk9iai5zU2VhcmNoLnJlcGxhY2UoL1xcJm5ic3A7fDovZ2ksICcnKTtcbn1cblxudmFyIGRlZmF1bHRDb25maWd1cmF0aW9uID0ge1xuICAgIHNjcm9sbFg6ICdhdXRvJyxcbiAgICBsYW5ndWFnZTogdHJhbnNsYXRpb25PYmosXG4gICAgZG9tOlxuICAgICAgICBcIjwncm93JzwnY29sLXNtLTEyIGNvbC1tZC02J2k+PCdjb2wtc20tMTIgY29sLW1kLTYnZj4+XCIgK1xuICAgICAgICBcIjwncm93JzwnY29sLXNtLTEyJ3RyPj5cIiArXG4gICAgICAgIFwiPCdhbHQtcm93JzwnYWx0LXJvd19fbGVmdCdsPjwnYWx0LXJvd19fY2VudGVyJ3A+PlwiLFxufTtcblxudmFyIG5vU2VhcmNoQ29uZmlndXJhdGlvbiA9IHtcbiAgICBiRmlsdGVyOiBmYWxzZSxcbiAgICBiSW5mbzogZmFsc2UsXG4gICAgc2Nyb2xsWDogJ2F1dG8nLFxufTtcblxuZnVuY3Rpb24gc2V0VGFibGVFcnJvck1vZGUoZXJyb3JNb2RlKSB7XG4gICAgJC5mbi5kYXRhVGFibGUuZXh0LmVyck1vZGUgPSBlcnJvck1vZGUgfHwgJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBvblRhYkNoYW5nZSh0YWJJZCkge1xuICAgIHZhciAkdGFiID0gJCh0YWJJZCk7XG4gICAgdmFyICRkYXRhVGFibGVzID0gJHRhYi5maW5kKCcuZ3VpLXRhYmxlLWRhdGEsIC5ndWktdGFibGUtZGF0YS1uby1zZWFyY2gnKTtcblxuICAgIGlmICghJGRhdGFUYWJsZXMuZGF0YSgnaW5pdGlhbGl6ZWQnKSkge1xuICAgICAgICAkZGF0YVRhYmxlcy5kYXRhKCdpbml0aWFsaXplZCcsIHRydWUpLkRhdGFUYWJsZSgpLmRyYXcoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9uRXJyb3IoZSwgc2V0dGluZ3MsIHRlY2hOb3RlLCBtZXNzYWdlKSB7XG4gICAgdmFyIGRlYnVnTWVzc2FnZSA9ICcnO1xuXG4gICAgaWYgKERFVikge1xuICAgICAgICBkZWJ1Z01lc3NhZ2UgPSAnPGJyLz48YnIvPjxzbWFsbD48dT5EZWJ1ZyBtZXNzYWdlOjwvdT48YnIvPiAnICsgbWVzc2FnZSArICc8L3NtYWxsPic7XG4gICAgfVxuXG4gICAgd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgdGV4dDpcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZy4gUGxlYXNlIDxhIGhyZWY9XCJqYXZhc2NyaXB0OndpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVwiPnJlZnJlc2g8L2E+IHRoZSBwYWdlIG9yIHRyeSBhZ2FpbiBsYXRlci4nICtcbiAgICAgICAgICAgIGRlYnVnTWVzc2FnZSxcbiAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZGVmYXVsdENvbmZpZ3VyYXRpb246IGRlZmF1bHRDb25maWd1cmF0aW9uLFxuICAgIG5vU2VhcmNoQ29uZmlndXJhdGlvbjogbm9TZWFyY2hDb25maWd1cmF0aW9uLFxuICAgIHNldFRhYmxlRXJyb3JNb2RlOiBzZXRUYWJsZUVycm9yTW9kZSxcbiAgICBvblRhYkNoYW5nZTogb25UYWJDaGFuZ2UsXG4gICAgb25FcnJvcjogb25FcnJvcixcbn07XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWYuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vYWYuanNvblwiLFxuXHRcIi4vYW0uanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vYW0uanNvblwiLFxuXHRcIi4vYXIuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vYXIuanNvblwiLFxuXHRcIi4vYmUuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vYmUuanNvblwiLFxuXHRcIi4vYmcuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vYmcuanNvblwiLFxuXHRcIi4vY2EuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vY2EuanNvblwiLFxuXHRcIi4vY3MuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vY3MuanNvblwiLFxuXHRcIi4vY3kuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vY3kuanNvblwiLFxuXHRcIi4vZGEuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZGEuanNvblwiLFxuXHRcIi4vZGUuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZGUuanNvblwiLFxuXHRcIi4vZWwuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZWwuanNvblwiLFxuXHRcIi4vZW4uanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZW4uanNvblwiLFxuXHRcIi4vZW8uanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZW8uanNvblwiLFxuXHRcIi4vZXMuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZXMuanNvblwiLFxuXHRcIi4vZXQuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZXQuanNvblwiLFxuXHRcIi4vZXUuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZXUuanNvblwiLFxuXHRcIi4vZmEuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZmEuanNvblwiLFxuXHRcIi4vZmkuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZmkuanNvblwiLFxuXHRcIi4vZmlsLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2ZpbC5qc29uXCIsXG5cdFwiLi9mci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9mci5qc29uXCIsXG5cdFwiLi9nYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9nYS5qc29uXCIsXG5cdFwiLi9nbC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9nbC5qc29uXCIsXG5cdFwiLi9ndS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ndS5qc29uXCIsXG5cdFwiLi9oaS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9oaS5qc29uXCIsXG5cdFwiLi9oci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9oci5qc29uXCIsXG5cdFwiLi9odS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9odS5qc29uXCIsXG5cdFwiLi9oeS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9oeS5qc29uXCIsXG5cdFwiLi9pZC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9pZC5qc29uXCIsXG5cdFwiLi9pcy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9pcy5qc29uXCIsXG5cdFwiLi9pdC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9pdC5qc29uXCIsXG5cdFwiLi9pdy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9pdy5qc29uXCIsXG5cdFwiLi9qYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9qYS5qc29uXCIsXG5cdFwiLi9rYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9rYS5qc29uXCIsXG5cdFwiLi9ray5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ray5qc29uXCIsXG5cdFwiLi9rbS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9rbS5qc29uXCIsXG5cdFwiLi9rby5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9rby5qc29uXCIsXG5cdFwiLi9sdC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9sdC5qc29uXCIsXG5cdFwiLi9sdi5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9sdi5qc29uXCIsXG5cdFwiLi9tay5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9tay5qc29uXCIsXG5cdFwiLi9tbi5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9tbi5qc29uXCIsXG5cdFwiLi9tcy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9tcy5qc29uXCIsXG5cdFwiLi9uZS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9uZS5qc29uXCIsXG5cdFwiLi9ubC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ubC5qc29uXCIsXG5cdFwiLi9wbC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9wbC5qc29uXCIsXG5cdFwiLi9wcy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9wcy5qc29uXCIsXG5cdFwiLi9wdC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9wdC5qc29uXCIsXG5cdFwiLi9yby5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9yby5qc29uXCIsXG5cdFwiLi9ydS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ydS5qc29uXCIsXG5cdFwiLi9zaS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zaS5qc29uXCIsXG5cdFwiLi9zay5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zay5qc29uXCIsXG5cdFwiLi9zbC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zbC5qc29uXCIsXG5cdFwiLi9zcS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zcS5qc29uXCIsXG5cdFwiLi9zci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zci5qc29uXCIsXG5cdFwiLi9zdi5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zdi5qc29uXCIsXG5cdFwiLi9zdy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9zdy5qc29uXCIsXG5cdFwiLi90YS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi90YS5qc29uXCIsXG5cdFwiLi90aC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi90aC5qc29uXCIsXG5cdFwiLi90ci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi90ci5qc29uXCIsXG5cdFwiLi91ay5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi91ay5qc29uXCIsXG5cdFwiLi91ci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi91ci5qc29uXCIsXG5cdFwiLi91ei5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi91ei5qc29uXCIsXG5cdFwiLi92aS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi92aS5qc29uXCIsXG5cdFwiLi96aC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi96aC5qc29uXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4gc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKlxcXFwuanNvbiRcIjsiXSwibmFtZXMiOlsiQmxvY2tzQ2hvaWNlIiwib3B0aW9ucyIsIl9zZWxmIiwiYmxvY2tzQ2hvaWNlRm9ybVNlbGVjdG9yIiwiJGJsb2Nrc0Nob2ljZUZvcm0iLCIkYmxvY2tzQ2hvaWNlRHJvcERvd24iLCJibG9ja3NUYWJsZSIsImJsb2Nrc0Nob2ljZUFkZFNlbGVjdG9yIiwiJCIsImV4dGVuZCIsImluaXQiLCJmaW5kIiwiaW5pdFNlbGVjdCIsIm9uIiwic2VsZWN0QmxvY2tDaG9pY2UiLCJhZGRCbG9jayIsInJlc2V0TW9kaWZpZWRCbG9ja3MiLCJzZWxlY3QyIiwiYWpheCIsInVybCIsImJhc2VVcmwiLCJkYXRhVHlwZSIsImRhdGEiLCJwYXJhbXMiLCJwYXJhbXNDb2xsZWN0aW9uIiwicGFyYW1UZXJtIiwidGVybSIsInBhcmFtUGFnZSIsInBhZ2UiLCJwYXJhbUlkQ21zU2xvdFRlbXBsYXRlIiwiaWRDbXNTbG90VGVtcGxhdGUiLCJwYXJhbUlkQ21zU2xvdCIsImlkQ21zU2xvdCIsInByb2Nlc3NSZXN1bHRzIiwicmVzdWx0cyIsIm1hcCIsIml0ZW0iLCJkaXNhYmxlZCIsImlzQmxvY2tNb2RpZmllZCIsImlkIiwicGFnaW5hdGlvbiIsImRlbGF5IiwiY2FjaGUiLCJ0ZW1wbGF0ZVNlbGVjdGlvbiIsImNvbnRhaW5lciIsImVsZW1lbnQiLCJpc0FjdGl2ZSIsInZhbGlkRnJvbSIsInN0b3JlcyIsInRleHQiLCJyZXNldFNlbGVjdCIsInZhbCIsInRyaWdnZXIiLCJpc1NlbGVjdGVkIiwidG9nZ2xlQ2xhc3MiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiJHNlbGVjdGVkQmxvY2siLCJibG9ja0RhdGEiLCJibG9ja0lkIiwiYmxvY2tOYW1lIiwidmFsaWRUbyIsImFkZFJvdyIsIm1vZHVsZSIsImV4cG9ydHMiLCJkYXRhVGFibGUiLCJyZXF1aXJlIiwiQmxvY2tzVGFibGUiLCJ0YWJsZUJhc2VVcmwiLCJibG9ja3NUYWJsZVNlbGVjdG9yIiwiY21zU2xvdEJsb2Nrc1NlbGVjdG9yIiwiY21zU2xvdEJsb2Nrc092ZXJsYXlTZWxlY3RvciIsImNtc1Nsb3RCbG9ja3NPdmVybGF5VG9nZ2xlckNsYXNzIiwidmlld0Jsb2NrVXJsIiwiJGNtc1Nsb3RCbG9ja3MiLCIkYmxvY2tzVGFibGUiLCJzbG90QmxvY2tzRm9ybSIsImluaXRPcHRpb25zU3RhdGUiLCJpbml0VGFibGVTdGF0ZSIsImlzRmlyc3RJbml0IiwiaXNGaXJzdFRhYmxlUmVuZGVyIiwiY2hhbmdlT3JkZXJCdXR0b25TZWxlY3RvciIsInJlbW92ZUJ1dHRvblNlbGVjdG9yIiwicmVzZXRCdXR0b25TZWxlY3RvciIsInJvd1Vuc2F2ZWRPdmVybGF5U2VsZWN0b3IiLCJzZWxlY3RlZFJvd0luZGV4IiwidGFibGVJc1Vuc2F2ZWQiLCJtb2RpZmllZEJsb2NrcyIsInJlc29sdmVJc1Vuc2F2ZWRDYWxsYmFjayIsInJlc29sdmVJc1Vuc2F2ZWQiLCJkb2N1bWVudCIsInNldEluaXRUYWJsZVN0YXRlIiwidGFibGVSb3dTZWxlY3QiLCJzZXRJbml0T3B0aW9uc1N0YXRlIiwibG9hZEJsb2Nrc1RhYmxlIiwiYWpheFVybCIsIkRhdGFUYWJsZSIsImRlc3Ryb3kiLCJhdXRvV2lkdGgiLCJsYW5ndWFnZSIsImRlZmF1bHRDb25maWd1cmF0aW9uIiwic2VhcmNoaW5nIiwiaW5mbyIsImlzVW5zYXZlZCIsImluaXREYXRhVGFibGVMaXN0ZW5lcnMiLCJvdmVybGF5VG9nZ2xlciIsInJlYnVpbGRGb3JtIiwicm93cyIsImluaXRBY3Rpb25CdXR0b25zTGlzdGVuZXJzIiwiY2hhbmdlT3JkZXJCdXR0b25zSGFuZGxlciIsInJlbW92ZUJ1dHRvbnNIYW5kbGVyIiwib2ZmIiwicmVzZXRCdXR0b25zSGFuZGxlciIsInVwZGF0ZVRhYmxlIiwidGFibGVBcGkiLCJ0YWJsZURhdGEiLCJyZW1vdmUiLCJhZGQiLCJkcmF3Iiwic2VsZWN0ZWQiLCJkZXNlbGVjdCIsInJvdyIsInNlbGVjdCIsImdldFRhYmxlIiwiaW5jbHVkZXMiLCJ0b2dnbGVJc01vZGlmaWVkIiwiYmxvY2tJbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJwdXNoIiwicm93RGF0YSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsIk51bWJlciIsImdldFN0YXR1c0xhYmVsIiwiZ2V0U3RvcmVzTGFiZWxzIiwiZ2V0QWN0aW9uQnV0dG9ucyIsInRhYmxlIiwidW5zaGlmdCIsImFwaSIsIiRidXR0b25zIiwiYnV0dG9uc1RlbXBsYXRlIiwiZWFjaCIsIiRidXR0b24iLCJpcyIsImhhc0NsYXNzIiwiYXR0ciIsIm91dGVySFRNTCIsInN0YXR1c0xhYmVsIiwiJHN0b3JlVGVtcGxhdGUiLCJzdG9yZXNBcnJheSIsInNwbGl0IiwicmVkdWNlIiwic3RvcmVzVGVtcGxhdGUiLCJzdG9yZSIsImh0bWwiLCJ0b0FycmF5IiwiY2xpY2tJbmZvIiwiZ2V0Q2xpY2tJbmZvIiwiZGlyZWN0aW9uIiwiaXNSb3dGaXJzdCIsIiRjbGlja2VkVGFibGVSb3ciLCJpc1Jvd0xhc3QiLCIkdGFibGVMZW5ndGgiLCJjaGFuZ2VPcmRlclJvdyIsInJvd0luZGV4IiwibmV3Um93SW5kZXgiLCJ0ZW1wUm93Iiwicm93SWQiLCJ1cGRhdGVDaG9pY2VEcm9wZG93biIsInByb3AiLCJyZXNldENob2ljZURyb3Bkb3duIiwiY2hpbGRyZW4iLCJpbmRleCIsInJlc2V0SGFuZGxlckNhbGxiYWNrIiwiaXNTdGF0ZUNoYW5nZWQiLCJ0b2dnbGVSb3dPdmVybGF5IiwidG9nZ2xlUmVzZXRCdXR0b24iLCJzdGF0ZSIsIiRyb3dVbnNhdmVkT3ZlcmxheSIsImkiLCIkZWxlbWVudCIsIiRvdmVybGF5IiwiYWRkQ2xhc3MiLCJhcHBlbmQiLCJzaG93QWxlcnQiLCJzaG93IiwicmVtb3ZlQ2xhc3MiLCJjdXJyZW50VGFyZ2V0IiwicGFyZW50cyIsImNoZWNrVGFibGVTdGF0ZSIsImN1cnJlbnRUYWJsZVN0YXRlIiwic29tZSIsImNvdW50IiwidGFyZ2V0IiwiaWRDbXNCbG9jayIsImhpZGUiLCJjbXNTbG90QmxvY2tGb3JtSXRlbSIsInRvZ2dsZUVuYWJsZW1lbnRGcm9tQmxvY2tzVGFibGUiLCIkY21zU2xvdEJsb2NrIiwid2luZG93Iiwic3dlZXRBbGVydCIsInRpdGxlIiwic2hvd0Nsb3NlQnV0dG9uIiwiY3VzdG9tQ2xhc3MiLCJjb25maXJtQnV0dG9uQ29sb3IiLCJjb25maXJtQnV0dG9uVGV4dCIsInRvZ2dsZVRhYmxlUm93IiwiY2xvc2VzdCIsIlNsb3RCbG9ja3MiLCJTbG90QmxvY2tzRm9ybSIsInJlYWR5Iiwic2xvdEJsb2NrRm9ybUl0ZW1DbGFzcyIsInNsb3RCbG9ja0Zvcm1JdGVtSWRQcmVmaXgiLCJzbG90QmxvY2tGb3JtV3JhcHBlcklkIiwiYmxvY2tzQ2hvaWNlIiwic2xvdEJsb2NrcyIsInNsb3RTZWxlY3RvciIsInNsb3RUYWJsZVNlbGVjdG9yIiwiYmxvY2tDb250YWluZXJTZWxlY3RvciIsImNtc1Nsb3RCbG9ja0NvbnRlbnRQcm92aWRlclNlbGVjdG9yIiwiY29udGVudFByb3ZpZGVyQXR0cmlidXRlIiwiZ2xvYmFsIiwiQ21zU2xvdEd1aV9TbG90VGFibGUiLCJkYXRhVGFibGVJbml0Q2FsbGJhY2siLCIkZm9ybVdyYXBwZXIiLCJmb3JtIiwic2F2ZUJ1dHRvbiIsImZvcm1JdGVtc0NvdW50IiwiZm9ybVRlbXBsYXRlIiwiZm9ybUluaXRpYWxTdGF0ZSIsInBhcnNlSW50Iiwic2F2ZSIsInRvZ2dsZUVuYWJsZW1lbnRGcm9tUmFkaW9JbnB1dCIsImlzQ2hhbmdlZCIsImVtcHR5Iiwic2V0U3RhdGVDaGFuZ2VkIiwicHJldkNtc0Jsb2NrSWQiLCIkZm9ybUl0ZW0iLCJjcmVhdGVOZXdGb3JtRWxlbWVudCIsInByZXBlbmQiLCJpbnNlcnRBZnRlciIsIm5leHRBbGwiLCJpbml0Rm9ybUl0ZW1zIiwic2VyaWFsaXplIiwiZm9ybVNlcmlhbGl6ZSIsInBvc3QiLCJkb25lIiwicmVzcG9uc2UiLCJ0eXBlIiwiZmFpbCIsImFsd2F5cyIsImFjdGl2YXRlQnV0dG9uIiwicmVtb3ZlQXR0ciIsImZvcm1JdGVtIiwicmVwbGFjZSIsInBhcnNlSFRNTCIsInNlbGVjdDJJbml0T3B0aW9ucyIsInNlbGVjdEVsZW1lbnQiLCJtaW5pbXVtSW5wdXRMZW5ndGgiLCJ0b2dnbGVFbmFibGVtZW50IiwicmFkaW9JbnB1dCIsImlucHV0cyIsInZhbHVlIiwiJHNsb3RUYWJsZSIsImNtc1Nsb3RCbG9ja0NvbnRlbnRQcm92aWRlciIsInRyaW0iLCJzZWxlY3RGaXJzdFJvdyIsImNlbGxJbmRleCIsInVwZGF0ZVJvdyIsImlzU2xvdFRhYmxlRW5hYmxlZCIsImluZGV4ZXMiLCJ0ZW1wbGF0ZVRhYmxlQXBpIiwiaXNDbXNTbG90QmxvY2tDb250ZW50UHJvdmlkZXIiLCJwYXJhbSIsImdldCIsImdldERhdGFUYWJsZUFwaSIsIm5vZGVzIiwidG8kIiwiZ2V0TG9jYWxlIiwibG9jYWxlIiwiZG9jdW1lbnRFbGVtZW50IiwiZGF0YXNldCIsImFwcGxpY2F0aW9uTG9jYWxlIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2xhdGlvbk9iaiIsInNTZWFyY2giLCJzZWFyY2hQbGFjZWhvbGRlciIsInNjcm9sbFgiLCJkb20iLCJub1NlYXJjaENvbmZpZ3VyYXRpb24iLCJiRmlsdGVyIiwiYkluZm8iLCJzZXRUYWJsZUVycm9yTW9kZSIsImVycm9yTW9kZSIsImZuIiwiZXh0IiwiZXJyTW9kZSIsIm9uVGFiQ2hhbmdlIiwidGFiSWQiLCIkdGFiIiwiJGRhdGFUYWJsZXMiLCJvbkVycm9yIiwiZSIsInNldHRpbmdzIiwidGVjaE5vdGUiLCJtZXNzYWdlIiwiZGVidWdNZXNzYWdlIiwiREVWIl0sInNvdXJjZVJvb3QiOiIifQ==