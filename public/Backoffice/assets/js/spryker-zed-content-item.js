(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-content-item"],{

/***/ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-dialog.js":
/*!****************************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-dialog.js ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var dataTable = __webpack_require__(/*! ZedGuiModules/libs/data-table */ "./vendor/spryker/gui/assets/Zed/js/modules/libs/data-table.js");
var ContentItemDialog = function (dialogTitle, dialogContentUrl, insertButtonTitle, widgetHtmlTemplate, maxWidgetNumber) {
  $.extend($.summernote.plugins, {
    contentItemDialog: function (context) {
      this.context = context;
      this.$body = $(document.body);
      this.editor = context.layoutInfo.editor;
      this.editable = context.layoutInfo.editable;
      this.options = context.options;
      this.$ui = $.summernote.ui;
      this.$range = $.summernote.range;
      this.history = context.modules.editor.history;
      this.contentCache = {};
      this.initialize = function () {
        var $container = this.options.dialogsInBody ? this.$body : this.editor;
        var loaderTemplate = '<div class="content-item-loader text-center">' + '<img src="/assets/img/cms-loader.gif" />' + '</div>';
        var bodyTemplate = '<div class="content-item-body">' + loaderTemplate + '<div class="content-ajax"></div>' + '</div>';
        var footerTemplate = '<div class="content-item-footer">' + '<button class="btn btn-primary note-btn note-btn-primary add-content-item">' + insertButtonTitle + '</button>' + '</div>';
        this.$dialog = this.$ui.dialog({
          title: dialogTitle,
          fade: this.options.dialogsFade,
          body: bodyTemplate,
          footer: footerTemplate
        }).render().appendTo($container);
        this.mapEvents();
      };
      this.mapEvents = function () {
        var self = this;
        this.$dialog.find('.add-content-item').on('click', function (event) {
          event.preventDefault();
          self.addContent();
        });
      };
      this.showError = function (errorSelector, container) {
        errorSelector.insertAfter(container);
      };
      this.addContent = function () {
        var $titleHeader = this.$dialog.find('.ibox-title h5');
        var $templateHeader = this.$dialog.find('.template-title');
        var checkedContentItem = this.$dialog.find('table input:checked');
        var chosenType = this.$dialog.find('input[name=type]').val();
        var chosenDisplayType = this.$dialog.find('input[name=displayType]').val();
        var chosenName = checkedContentItem.data('content-item-name');
        var chosenId = this.$dialog.find('table input:checked').data('id');
        var chosenKey = this.$dialog.find('table input:checked').val();
        var $choseIdErrorSelector = this.$dialog.find('.content-errors .item');
        var isTemplateListExists = this.$dialog.find('.template-list').length;
        var chosenTemplate = this.$dialog.find('.template-list input:checked').data('template');
        var chosenTemplateIdentifier = this.$dialog.find('.template-list input:checked').val();
        var $chooseTemplateErrorSelector = this.$dialog.find('.content-errors .template');
        var twigTemplate = this.$dialog.find('input[name=twigFunctionTemplate]').val();
        var readyToInsert = chosenKey !== undefined && (!isTemplateListExists || isTemplateListExists && chosenTemplate);
        if (readyToInsert) {
          if ($('span[data-twig-expression*="{{ content_"]').length > maxWidgetNumber) {
            alert('Limit exceeded, maximum number of widgets ' + maxWidgetNumber);
            return;
          }
          this.context.invoke('editor.restoreRange');
          this.$ui.hideDialog(this.$dialog);
          var elementForInsert = this.getNewDomElement(twigTemplate, chosenId, chosenKey, chosenType, chosenDisplayType, chosenName, chosenTemplate, chosenTemplateIdentifier, widgetHtmlTemplate);
          this.addItemInEditor(elementForInsert);
        }
        if (!chosenKey) {
          this.showError($choseIdErrorSelector, $titleHeader);
        }
        if (isTemplateListExists && !chosenTemplate) {
          this.showError($chooseTemplateErrorSelector, $templateHeader);
        }
      };
      this.updateElementForInsert = function ($clickedNode, elementForInsert) {
        if (this.isNodeEmpty($clickedNode)) {
          this.clearNode($clickedNode);
          return elementForInsert;
        }
        return '<p>' + elementForInsert + '</p>';
      };
      this.addItemInEditor = function (elementForInsert) {
        var $clickedNode = this.context.invoke('contentItemPopover.getClickedNode');
        if ($clickedNode.length) {
          this.clearNode($clickedNode);
        }
        if (!$clickedNode.length) {
          $clickedNode = $(this.context.invoke('editor.createRange').sc);
          elementForInsert = this.updateElementForInsert($clickedNode, elementForInsert);
        }
        this.context.invoke('pasteHTML', elementForInsert);
        this.removeUnecessaryLines($clickedNode);
        this.removeEmptyContentItems();
      };
      this.isNodeEmpty = function ($clickedNode) {
        var $nodeInnerItems = $clickedNode.children();
        return $nodeInnerItems.length <= 1 && $nodeInnerItems.eq(0).is('br'); // Empty node in summernote consider <br> tag
      };
      this.isWidgetEmpty = function ($clickedNode) {
        var $nodeInnerItems = $clickedNode.children();
        if (!$nodeInnerItems.eq(0).is('.js-content-item-editor')) {
          return false;
        }
        return $nodeInnerItems.length <= 2 && $nodeInnerItems.eq(1).is('br') && $nodeInnerItems.children().length <= 1;
      };
      this.isContentItemEmpty = function ($nodeItem) {
        var $nodeInnerItems = $nodeItem.children();
        var isContentItem = $nodeInnerItems.eq(0).is('.js-content-item-editor');
        var isContentItemEmpty = !$nodeInnerItems.children().text().length;
        return isContentItem && isContentItemEmpty;
      };
      this.removeEmptyContentItems = function () {
        var $self = this;
        this.editable.children().each(function (index, item) {
          var $nodeItem = $(item);
          if (!$self.isContentItemEmpty($nodeItem)) {
            return;
          }
          $nodeItem.closest('p').remove();
        });
      };
      this.removeItemFromEditor = function () {
        var $clickedNode = this.context.invoke('contentItemPopover.getClickedNode');
        this.clearNode($clickedNode);
        this.context.invoke('contentItemPopover.hidePopover');
        this.context.invoke('pasteHTML', ' ');
      };
      this.removeUnecessaryLines = function ($clickedNode) {
        $clickedNode = $clickedNode.is('p') ? $clickedNode : $clickedNode.parents('p');
        var self = this;
        var $insertedNode = $clickedNode.next();
        var $nextNode = $insertedNode.next();
        if (this.isWidgetEmpty($nextNode) || this.isNodeEmpty($nextNode)) {
          $insertedNode.removeAttr('style');
          $nextNode.remove();
          self.history.stackOffset--;
          self.history.stack.splice(-1, 1);
          self.history.recordUndo();
        }
      };
      this.clearNode = function ($clickedNode) {
        $clickedNode = $clickedNode.is('p') ? $clickedNode : $clickedNode.parents('p');
        $clickedNode.empty();
      };
      this.getNewDomElement = function (twigTemplate, id, key, type, displayType, contentName, templateName, templateIdentifier, widgetHtmlTemplate) {
        var twigExpression = twigTemplate.replace(/%\w+%/g, function (param) {
          return {
            '%KEY%': key,
            '%TEMPLATE%': templateIdentifier
          }[param];
        });
        var builtTemplate = widgetHtmlTemplate.replace(/%\w+%/g, function (param) {
          return {
            '%TYPE%': type,
            '%DISPLAY_TYPE%': displayType,
            '%KEY%': key,
            '%ID%': id,
            '%NAME%': contentName,
            '%TEMPLATE_DISPLAY_NAME%': templateName,
            '%TEMPLATE%': templateIdentifier,
            '%TWIG_EXPRESSION%': twigExpression
          }[param];
        });
        return builtTemplate;
      };
      this.getDialogContent = function (url) {
        var self = this;
        if (!this.contentCache[url]) {
          $.ajax({
            type: 'GET',
            url: url,
            dataType: 'html',
            context: this,
            success: function (data) {
              self.contentCache[url] = data;
              self.initContentHtml(data);
            }
          });
        } else {
          this.initContentHtml(this.contentCache[url]);
        }
      };
      this.initContentHtml = function (data) {
        var dataAjaxUrl = $(data).find('table').data('ajax');
        this.$dialog.find('.content-item-loader').hide();
        this.$dialog.find('.content-item-body .content-ajax').append(data);
        this.$dialog.find('table').DataTable({
          ajax: dataAjaxUrl,
          lengthChange: false,
          language: dataTable.defaultConfiguration.language
        });
      };
      this.clearContent = function () {
        this.$dialog.find('.content-item-body .content-ajax').empty();
        this.$dialog.find('.content-item-loader').show();
      };
      this.show = function (value, target) {
        var dataset = target[0].dataset;
        this.isCreateNew = dataset.hasOwnProperty('new');
        if (!dataset.hasOwnProperty('type')) {
          return;
        }
        var urlParams = {
          type: dataset.type
        };
        if (dataset.hasOwnProperty('key')) {
          urlParams.contentKey = dataset.key;
        }
        if (dataset.hasOwnProperty('template')) {
          urlParams.template = dataset.template;
        }
        var url = dialogContentUrl + '?' + $.param(urlParams);
        this.context.invoke('editor.saveRange');
        this.clearContent();
        this.getDialogContent(url);
        this.$ui.showDialog(this.$dialog);
      };
    }
  });
};
module.exports = ContentItemDialog;

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-popover.js":
/*!*****************************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-popover.js ***!
  \*****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
var ContentItemEditorPopover = function () {
  $.extend($.summernote.plugins, {
    contentItemPopover: function (context) {
      this.context = context;
      this.ui = $.summernote.ui;
      this.note = context.layoutInfo.note;
      this.$range = $.summernote.range;
      this.contentItemEditorSelector = '.js-content-item-editor';
      this.$clickedNode = [];
      this.isPopoverVisible = false;
      this.events = {
        'summernote.keyup summernote.mouseup summernote.change': function () {
          this.$clickedNode = $(this.context.invoke('editor.createRange').sc).parents('.js-content-item-editor');
          this.showPopover();
        }.bind(this),
        'summernote.disable summernote.dialog.shown summernote.codeview.toggled': function () {
          this.hidePopover();
        }.bind(this),
        'summernote.scroll': function (event) {
          if (this.isPopoverVisible) {
            this.scrollHandler(event);
          }
        }.bind(this)
      };
      this.initialize = function () {
        this.$contentItemPopover = this.ui.popover({
          className: 'note-link-popover'
        }).render().appendTo(context.options.container);
        var $content = this.$contentItemPopover.find('.popover-content,.note-popover-content');
        this.context.invoke('buttons.build', $content, this.context.options.popover.editContentItem);
      };
      this.showPopover = function () {
        this.hidePopover();
        var clickedContentItemEditor = this.getClickedContentItemEditor(this.$clickedNode);
        if (!clickedContentItemEditor) {
          return;
        }
        this.isPopoverVisible = true;
        this.updatePopoverButtons(clickedContentItemEditor);
        this.putCarretInTheBegining(clickedContentItemEditor);
        var itemPosition = this.getPopoverPosition(clickedContentItemEditor);
        this.$contentItemPopover.css({
          display: 'block',
          left: itemPosition.left,
          top: itemPosition.top
        });
      };
      this.hidePopover = function () {
        this.$contentItemPopover.hide();
        this.isPopoverVisible = false;
      };
      this.scrollHandler = function (event) {
        this.showPopover();
        var $editor = $(event.currentTarget.nextSibling).find('.note-editing-area');
        var editorPositionTop = $editor.offset().top;
        var editorPositionBottom = editorPositionTop + $editor.height();
        var popoverPositionTop = this.$contentItemPopover.offset().top;
        var popoverPositionBottom = popoverPositionTop + this.$contentItemPopover.height();
        if (popoverPositionBottom > editorPositionBottom || popoverPositionTop < editorPositionTop) {
          this.hidePopover();
        }
      };
      this.putCarretInTheBegining = function (clickedContentItemEditor) {
        var itemParentNode = this.$range.createFromNode(clickedContentItemEditor.parentNode);
        itemParentNode.collapse(true);
        itemParentNode.select();
      };
      this.getPopoverPosition = function (placeholder) {
        var $placeholder = $(placeholder);
        var position = $placeholder.offset();
        var height = $placeholder.outerHeight(true);
        return {
          left: position.left,
          top: position.top + height
        };
      };
      this.getClickedContentItemEditor = function ($clickedNode) {
        if ($clickedNode.is(this.contentItemEditorSelector)) {
          return $clickedNode[0];
        }
        var $parentContentItemEditor = $clickedNode.parents(this.contentItemEditorSelector);
        if ($parentContentItemEditor.length) {
          return $parentContentItemEditor[0];
        }
        return false;
      };
      this.updatePopoverButtons = function (clickedContentItemEditor) {
        var itemType = clickedContentItemEditor.dataset.type;
        var itemId = clickedContentItemEditor.dataset.id;
        var itemKey = clickedContentItemEditor.dataset.key;
        var itemTemplate = clickedContentItemEditor.dataset.template;
        var $popoverButtons = this.$contentItemPopover.find('button');
        $popoverButtons.each(function () {
          var button = $(this);
          button.attr('data-type', itemType);
          button.attr('data-key', itemKey);
          button.attr('data-id', itemId);
          button.attr('data-template', itemTemplate);
        });
      };
      this.getClickedNode = function () {
        return this.$clickedNode;
      };
    }
  });
};
module.exports = ContentItemEditorPopover;

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor.js ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var editorConfig = __webpack_require__(/*! ZedGuiEditorConfiguration */ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js");
var editorButtons = __webpack_require__(/*! ./editorComponents/buttons */ "./vendor/spryker/content-gui/assets/Zed/js/modules/editorComponents/buttons.js");
var ContentItemDialog = __webpack_require__(/*! ./content-item-editor-dialog */ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-dialog.js");
var ContentItemPopover = __webpack_require__(/*! ./content-item-editor-popover */ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor-popover.js");
var ContentItemEditor = function (options) {
  var self = this;
  this.dropDownItems = [];
  this.buttonTitle = 'Insert Content';
  this.title = 'Content';
  this.insertButtonTitle = 'Insert';
  this.dialogContentUrl = '';
  this.popoverButtons = {};
  this.editorContentWidgetTemplate = '';
  $.extend(this, options);
  this.initialization = function () {
    new ContentItemDialog(this.title, this.dialogContentUrl, this.insertButtonTitle, this.editorContentWidgetTemplate, this.maxWidgetNumber);
    new ContentItemPopover();
  };
  this.getEditorConfig = function () {
    let baseConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var self = this;
    baseConfig = editorConfig.getGlobalConfig(baseConfig);
    if (!baseConfig) {
      baseConfig = editorConfig.getConfig();
    }
    var contentGuiConfig = {
      toolbar: [['insert', ['dropdownContentItem']]],
      buttons: {
        dropdownContentItem: this.createDropdownButton(),
        editWidget: this.createEditWidgetButton(),
        editContentItem: this.createEditContentItemButton(),
        removeContentItem: this.createRemoveContentItemButton()
      },
      popover: {
        editContentItem: ['editWidget', 'editContentItem', 'removeContentItem']
      },
      callbacks: {
        onKeydown: this.onKeydownHandler,
        onChange: function () {
          self.onChangeHandler($(this), self);
        }
      },
      dialogsInBody: true,
      styleWithCSS: true,
      codemirror: {
        lineWrapping: true
      }
    };
    return editorConfig.mergeConfigs(baseConfig, contentGuiConfig);
  };
  this.createDropdownButton = function () {
    return editorButtons.ContentItemDropdownButton(this.buttonTitle, this.generateDropdownList(), this.showDialogHandler);
  };
  this.createEditWidgetButton = function () {
    return editorButtons.PopoverButton(this.popoverButtons.editWidget, this.showDialogHandler);
  };
  this.createEditContentItemButton = function () {
    return editorButtons.PopoverButton(this.popoverButtons.editContentItem, this.editContentItemHandler);
  };
  this.createRemoveContentItemButton = function () {
    return editorButtons.PopoverButton(this.popoverButtons.removeContentItem, this.removeContentItemHandler);
  };
  this.showDialogHandler = function (context) {
    return context.createInvokeHandler('contentItemDialog.show');
  };
  this.editContentItemHandler = function () {
    return function (event) {
      var contentItemId = event.currentTarget.dataset.id;
      var originLink = window.location.origin;
      window.open(originLink + self.contentItemUrl + '?id-content=' + contentItemId, '_blank');
    };
  };
  this.removeContentItemHandler = function (context) {
    return function () {
      context.invoke('contentItemDialog.removeItemFromEditor');
    };
  };
  this.onKeydownHandler = function (event) {
    var pressedKey = event.originalEvent.key;
    if (pressedKey !== 'Enter') {
      return;
    }
    var $editor = $(this);
    var $editorRange = $editor.summernote('editor.createRange');
    var widgetClassName = 'js-content-item-editor';
    var isWidgetWrapper = $($editorRange.sc).find('.' + widgetClassName).length;
    var isWidget = $($editorRange.sc).hasClass(widgetClassName);
    var addNewLineAfterWidget = function (target) {
      event.preventDefault();
      $('<p><br></p>').insertAfter($(target));
      var range = document.createRange();
      range.selectNode(target.nextElementSibling.childNodes[0]);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.collapse(false);
    };
    if (isWidgetWrapper) {
      addNewLineAfterWidget($editorRange.sc);
    }
    if (isWidget) {
      addNewLineAfterWidget($editorRange.sc.parentNode);
    }
  };
  this.onChangeHandler = function ($editor, self) {
    var curlyBracesRegExp = /\{\{\s*((?!\}\}).)*\s*\}\}/;
    var $editorRange = $editor.summernote('createRange');
    var $editorNode = $($editorRange.sc);
    var nodeContent = $editorNode.text();
    var hasCurlyBraces = curlyBracesRegExp.test(nodeContent);
    if (!hasCurlyBraces) {
      return;
    }
    var $editorParentNode = $editorNode.parents('p');
    self.changeEditorNode($editorParentNode);
  };
  this.changeEditorNode = function ($editorParentNode) {
    if (!$editorParentNode.is('p')) {
      return;
    }
    var $elementForInsert = $('<div>' + $editorParentNode.html() + '</div>');
    $editorParentNode.replaceWith($elementForInsert);
    this.putCaretAtTheLineEnd($elementForInsert);
  };
  this.putCaretAtTheLineEnd = function ($insertedElement) {
    var range = document.createRange();
    range.selectNode($insertedElement[0].childNodes[0]);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    range.collapse(false);
  };
  this.generateDropdownList = function () {
    return this.dropDownItems.reduce(function (currentList, dropItem) {
      var dropItemTemplate = '<li role="listitem">' + '<a href="#" data-type="' + dropItem.type + '" data-new="true">' + dropItem.name + '</a>' + '</li>';
      return currentList + dropItemTemplate;
    }, '');
  };
  this.initialization();
};
module.exports = ContentItemEditor;

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/js/modules/editorComponents/buttons.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/modules/editorComponents/buttons.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var ContentItemDropdownButton = function (buttonTitle, dropdownList, dropdownCallback) {
  return function (context) {
    var ui = $.summernote.ui;
    var button = ui.buttonGroup([ui.button({
      contents: buttonTitle + ' <i class="fa fa-caret-down" aria-hidden="true"></i>',
      data: {
        toggle: 'dropdown'
      }
    }), ui.dropdown({
      contents: dropdownList,
      click: dropdownCallback(context)
    })]);
    return button.render();
  };
};
var PopoverButton = function (buttonContent, buttonCallback) {
  return function (context) {
    var ui = $.summernote.ui;
    var button = ui.button({
      contents: buttonContent.icon + ' ' + buttonContent.title,
      tooltip: buttonContent.title,
      click: buttonCallback(context)
    });
    return button.render();
  };
};
module.exports = {
  ContentItemDropdownButton: ContentItemDropdownButton,
  PopoverButton: PopoverButton
};

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-item.entry.js":
/*!************************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-item.entry.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/content-gui/assets/Zed/sass/main.scss");
var ContentItemEditor = __webpack_require__(/*! ./modules/content-item-editor */ "./vendor/spryker/content-gui/assets/Zed/js/modules/content-item-editor.js");
var editor = new ContentItemEditor(window.editorConfiguration.contentGuiConfigData);
window.editorConfiguration.cms = editor.getEditorConfig('cms');

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/editor.js":
/*!************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/editor.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
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

/***/ "./vendor/spryker/content-gui/assets/Zed/sass/main.scss":
/*!**************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/sass/main.scss ***!
  \**************************************************************/
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
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-item.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29udGVudC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2NvbnRlbnQtaXRlbS1lZGl0b3ItZGlhbG9nLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NvbnRlbnQtZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9jb250ZW50LWl0ZW0tZWRpdG9yLXBvcG92ZXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29udGVudC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2NvbnRlbnQtaXRlbS1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29udGVudC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2VkaXRvckNvbXBvbmVudHMvYnV0dG9ucy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb250ZW50LWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWNvbnRlbnQtaXRlbS5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2VkaXRvci5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvZGF0YS10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jb250ZW50LWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzP2I3OGUiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vIHN5bmMgXlxcLlxcLy4qXFwuanNvbiQiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGF0YVRhYmxlID0gcmVxdWlyZSgnWmVkR3VpTW9kdWxlcy9saWJzL2RhdGEtdGFibGUnKTtcblxudmFyIENvbnRlbnRJdGVtRGlhbG9nID0gZnVuY3Rpb24gKFxuICAgIGRpYWxvZ1RpdGxlLFxuICAgIGRpYWxvZ0NvbnRlbnRVcmwsXG4gICAgaW5zZXJ0QnV0dG9uVGl0bGUsXG4gICAgd2lkZ2V0SHRtbFRlbXBsYXRlLFxuICAgIG1heFdpZGdldE51bWJlcixcbikge1xuICAgICQuZXh0ZW5kKCQuc3VtbWVybm90ZS5wbHVnaW5zLCB7XG4gICAgICAgIGNvbnRlbnRJdGVtRGlhbG9nOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgICAgIHRoaXMuJGJvZHkgPSAkKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IgPSBjb250ZXh0LmxheW91dEluZm8uZWRpdG9yO1xuICAgICAgICAgICAgdGhpcy5lZGl0YWJsZSA9IGNvbnRleHQubGF5b3V0SW5mby5lZGl0YWJsZTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucyA9IGNvbnRleHQub3B0aW9ucztcbiAgICAgICAgICAgIHRoaXMuJHVpID0gJC5zdW1tZXJub3RlLnVpO1xuICAgICAgICAgICAgdGhpcy4kcmFuZ2UgPSAkLnN1bW1lcm5vdGUucmFuZ2U7XG4gICAgICAgICAgICB0aGlzLmhpc3RvcnkgPSBjb250ZXh0Lm1vZHVsZXMuZWRpdG9yLmhpc3Rvcnk7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnRDYWNoZSA9IHt9O1xuXG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyICRjb250YWluZXIgPSB0aGlzLm9wdGlvbnMuZGlhbG9nc0luQm9keSA/IHRoaXMuJGJvZHkgOiB0aGlzLmVkaXRvcjtcbiAgICAgICAgICAgICAgICB2YXIgbG9hZGVyVGVtcGxhdGUgPVxuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImNvbnRlbnQtaXRlbS1sb2FkZXIgdGV4dC1jZW50ZXJcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxpbWcgc3JjPVwiL2Fzc2V0cy9pbWcvY21zLWxvYWRlci5naWZcIiAvPicgK1xuICAgICAgICAgICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICB2YXIgYm9keVRlbXBsYXRlID1cbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb250ZW50LWl0ZW0tYm9keVwiPicgKyBsb2FkZXJUZW1wbGF0ZSArICc8ZGl2IGNsYXNzPVwiY29udGVudC1hamF4XCI+PC9kaXY+JyArICc8L2Rpdj4nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZvb3RlclRlbXBsYXRlID1cbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJjb250ZW50LWl0ZW0tZm9vdGVyXCI+JyArXG4gICAgICAgICAgICAgICAgICAgICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG5vdGUtYnRuIG5vdGUtYnRuLXByaW1hcnkgYWRkLWNvbnRlbnQtaXRlbVwiPicgK1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRCdXR0b25UaXRsZSArXG4gICAgICAgICAgICAgICAgICAgICc8L2J1dHRvbj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzwvZGl2Pic7XG5cbiAgICAgICAgICAgICAgICB0aGlzLiRkaWFsb2cgPSB0aGlzLiR1aVxuICAgICAgICAgICAgICAgICAgICAuZGlhbG9nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBkaWFsb2dUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhZGU6IHRoaXMub3B0aW9ucy5kaWFsb2dzRmFkZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlUZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvb3RlcjogZm9vdGVyVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5yZW5kZXIoKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kVG8oJGNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5tYXBFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5maW5kKCcuYWRkLWNvbnRlbnQtaXRlbScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmFkZENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yID0gZnVuY3Rpb24gKGVycm9yU2VsZWN0b3IsIGNvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIGVycm9yU2VsZWN0b3IuaW5zZXJ0QWZ0ZXIoY29udGFpbmVyKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuYWRkQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRpdGxlSGVhZGVyID0gdGhpcy4kZGlhbG9nLmZpbmQoJy5pYm94LXRpdGxlIGg1Jyk7XG4gICAgICAgICAgICAgICAgdmFyICR0ZW1wbGF0ZUhlYWRlciA9IHRoaXMuJGRpYWxvZy5maW5kKCcudGVtcGxhdGUtdGl0bGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tlZENvbnRlbnRJdGVtID0gdGhpcy4kZGlhbG9nLmZpbmQoJ3RhYmxlIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICB2YXIgY2hvc2VuVHlwZSA9IHRoaXMuJGRpYWxvZy5maW5kKCdpbnB1dFtuYW1lPXR5cGVdJykudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNob3NlbkRpc3BsYXlUeXBlID0gdGhpcy4kZGlhbG9nLmZpbmQoJ2lucHV0W25hbWU9ZGlzcGxheVR5cGVdJykudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNob3Nlbk5hbWUgPSBjaGVja2VkQ29udGVudEl0ZW0uZGF0YSgnY29udGVudC1pdGVtLW5hbWUnKTtcbiAgICAgICAgICAgICAgICB2YXIgY2hvc2VuSWQgPSB0aGlzLiRkaWFsb2cuZmluZCgndGFibGUgaW5wdXQ6Y2hlY2tlZCcpLmRhdGEoJ2lkJyk7XG4gICAgICAgICAgICAgICAgdmFyIGNob3NlbktleSA9IHRoaXMuJGRpYWxvZy5maW5kKCd0YWJsZSBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyICRjaG9zZUlkRXJyb3JTZWxlY3RvciA9IHRoaXMuJGRpYWxvZy5maW5kKCcuY29udGVudC1lcnJvcnMgLml0ZW0nKTtcbiAgICAgICAgICAgICAgICB2YXIgaXNUZW1wbGF0ZUxpc3RFeGlzdHMgPSB0aGlzLiRkaWFsb2cuZmluZCgnLnRlbXBsYXRlLWxpc3QnKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIGNob3NlblRlbXBsYXRlID0gdGhpcy4kZGlhbG9nLmZpbmQoJy50ZW1wbGF0ZS1saXN0IGlucHV0OmNoZWNrZWQnKS5kYXRhKCd0ZW1wbGF0ZScpO1xuICAgICAgICAgICAgICAgIHZhciBjaG9zZW5UZW1wbGF0ZUlkZW50aWZpZXIgPSB0aGlzLiRkaWFsb2cuZmluZCgnLnRlbXBsYXRlLWxpc3QgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciAkY2hvb3NlVGVtcGxhdGVFcnJvclNlbGVjdG9yID0gdGhpcy4kZGlhbG9nLmZpbmQoJy5jb250ZW50LWVycm9ycyAudGVtcGxhdGUnKTtcbiAgICAgICAgICAgICAgICB2YXIgdHdpZ1RlbXBsYXRlID0gdGhpcy4kZGlhbG9nLmZpbmQoJ2lucHV0W25hbWU9dHdpZ0Z1bmN0aW9uVGVtcGxhdGVdJykudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIHJlYWR5VG9JbnNlcnQgPVxuICAgICAgICAgICAgICAgICAgICBjaG9zZW5LZXkgIT09IHVuZGVmaW5lZCAmJiAoIWlzVGVtcGxhdGVMaXN0RXhpc3RzIHx8IChpc1RlbXBsYXRlTGlzdEV4aXN0cyAmJiBjaG9zZW5UZW1wbGF0ZSkpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlYWR5VG9JbnNlcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoJ3NwYW5bZGF0YS10d2lnLWV4cHJlc3Npb24qPVwie3sgY29udGVudF9cIl0nKS5sZW5ndGggPiBtYXhXaWRnZXROdW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdMaW1pdCBleGNlZWRlZCwgbWF4aW11bSBudW1iZXIgb2Ygd2lkZ2V0cyAnICsgbWF4V2lkZ2V0TnVtYmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5pbnZva2UoJ2VkaXRvci5yZXN0b3JlUmFuZ2UnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kdWkuaGlkZURpYWxvZyh0aGlzLiRkaWFsb2cpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50Rm9ySW5zZXJ0ID0gdGhpcy5nZXROZXdEb21FbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgdHdpZ1RlbXBsYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5LZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5UeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuRGlzcGxheVR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5OYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW5UZW1wbGF0ZUlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWRnZXRIdG1sVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbUluRWRpdG9yKGVsZW1lbnRGb3JJbnNlcnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghY2hvc2VuS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKCRjaG9zZUlkRXJyb3JTZWxlY3RvciwgJHRpdGxlSGVhZGVyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNUZW1wbGF0ZUxpc3RFeGlzdHMgJiYgIWNob3NlblRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKCRjaG9vc2VUZW1wbGF0ZUVycm9yU2VsZWN0b3IsICR0ZW1wbGF0ZUhlYWRlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVFbGVtZW50Rm9ySW5zZXJ0ID0gZnVuY3Rpb24gKCRjbGlja2VkTm9kZSwgZWxlbWVudEZvckluc2VydCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzTm9kZUVtcHR5KCRjbGlja2VkTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhck5vZGUoJGNsaWNrZWROb2RlKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudEZvckluc2VydDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gJzxwPicgKyBlbGVtZW50Rm9ySW5zZXJ0ICsgJzwvcD4nO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hZGRJdGVtSW5FZGl0b3IgPSBmdW5jdGlvbiAoZWxlbWVudEZvckluc2VydCkge1xuICAgICAgICAgICAgICAgIHZhciAkY2xpY2tlZE5vZGUgPSB0aGlzLmNvbnRleHQuaW52b2tlKCdjb250ZW50SXRlbVBvcG92ZXIuZ2V0Q2xpY2tlZE5vZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICgkY2xpY2tlZE5vZGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJOb2RlKCRjbGlja2VkTm9kZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCEkY2xpY2tlZE5vZGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICRjbGlja2VkTm9kZSA9ICQodGhpcy5jb250ZXh0Lmludm9rZSgnZWRpdG9yLmNyZWF0ZVJhbmdlJykuc2MpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50Rm9ySW5zZXJ0ID0gdGhpcy51cGRhdGVFbGVtZW50Rm9ySW5zZXJ0KCRjbGlja2VkTm9kZSwgZWxlbWVudEZvckluc2VydCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Lmludm9rZSgncGFzdGVIVE1MJywgZWxlbWVudEZvckluc2VydCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVVbmVjZXNzYXJ5TGluZXMoJGNsaWNrZWROb2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUVtcHR5Q29udGVudEl0ZW1zKCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmlzTm9kZUVtcHR5ID0gZnVuY3Rpb24gKCRjbGlja2VkTm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciAkbm9kZUlubmVySXRlbXMgPSAkY2xpY2tlZE5vZGUuY2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAkbm9kZUlubmVySXRlbXMubGVuZ3RoIDw9IDEgJiYgJG5vZGVJbm5lckl0ZW1zLmVxKDApLmlzKCdicicpOyAvLyBFbXB0eSBub2RlIGluIHN1bW1lcm5vdGUgY29uc2lkZXIgPGJyPiB0YWdcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuaXNXaWRnZXRFbXB0eSA9IGZ1bmN0aW9uICgkY2xpY2tlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJG5vZGVJbm5lckl0ZW1zID0gJGNsaWNrZWROb2RlLmNoaWxkcmVuKCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISRub2RlSW5uZXJJdGVtcy5lcSgwKS5pcygnLmpzLWNvbnRlbnQtaXRlbS1lZGl0b3InKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgJG5vZGVJbm5lckl0ZW1zLmxlbmd0aCA8PSAyICYmXG4gICAgICAgICAgICAgICAgICAgICRub2RlSW5uZXJJdGVtcy5lcSgxKS5pcygnYnInKSAmJlxuICAgICAgICAgICAgICAgICAgICAkbm9kZUlubmVySXRlbXMuY2hpbGRyZW4oKS5sZW5ndGggPD0gMVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmlzQ29udGVudEl0ZW1FbXB0eSA9IGZ1bmN0aW9uICgkbm9kZUl0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgJG5vZGVJbm5lckl0ZW1zID0gJG5vZGVJdGVtLmNoaWxkcmVuKCk7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ29udGVudEl0ZW0gPSAkbm9kZUlubmVySXRlbXMuZXEoMCkuaXMoJy5qcy1jb250ZW50LWl0ZW0tZWRpdG9yJyk7XG4gICAgICAgICAgICAgICAgdmFyIGlzQ29udGVudEl0ZW1FbXB0eSA9ICEkbm9kZUlubmVySXRlbXMuY2hpbGRyZW4oKS50ZXh0KCkubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQ29udGVudEl0ZW0gJiYgaXNDb250ZW50SXRlbUVtcHR5O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5yZW1vdmVFbXB0eUNvbnRlbnRJdGVtcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0YWJsZS5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkbm9kZUl0ZW0gPSAkKGl0ZW0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghJHNlbGYuaXNDb250ZW50SXRlbUVtcHR5KCRub2RlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICRub2RlSXRlbS5jbG9zZXN0KCdwJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1Gcm9tRWRpdG9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkY2xpY2tlZE5vZGUgPSB0aGlzLmNvbnRleHQuaW52b2tlKCdjb250ZW50SXRlbVBvcG92ZXIuZ2V0Q2xpY2tlZE5vZGUnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJOb2RlKCRjbGlja2VkTm9kZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Lmludm9rZSgnY29udGVudEl0ZW1Qb3BvdmVyLmhpZGVQb3BvdmVyJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Lmludm9rZSgncGFzdGVIVE1MJywgJyAnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVW5lY2Vzc2FyeUxpbmVzID0gZnVuY3Rpb24gKCRjbGlja2VkTm9kZSkge1xuICAgICAgICAgICAgICAgICRjbGlja2VkTm9kZSA9ICRjbGlja2VkTm9kZS5pcygncCcpID8gJGNsaWNrZWROb2RlIDogJGNsaWNrZWROb2RlLnBhcmVudHMoJ3AnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyICRpbnNlcnRlZE5vZGUgPSAkY2xpY2tlZE5vZGUubmV4dCgpO1xuICAgICAgICAgICAgICAgIHZhciAkbmV4dE5vZGUgPSAkaW5zZXJ0ZWROb2RlLm5leHQoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzV2lkZ2V0RW1wdHkoJG5leHROb2RlKSB8fCB0aGlzLmlzTm9kZUVtcHR5KCRuZXh0Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgJGluc2VydGVkTm9kZS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICAkbmV4dE5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuaGlzdG9yeS5zdGFja09mZnNldC0tO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmhpc3Rvcnkuc3RhY2suc3BsaWNlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5oaXN0b3J5LnJlY29yZFVuZG8oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyTm9kZSA9IGZ1bmN0aW9uICgkY2xpY2tlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICAkY2xpY2tlZE5vZGUgPSAkY2xpY2tlZE5vZGUuaXMoJ3AnKSA/ICRjbGlja2VkTm9kZSA6ICRjbGlja2VkTm9kZS5wYXJlbnRzKCdwJyk7XG5cbiAgICAgICAgICAgICAgICAkY2xpY2tlZE5vZGUuZW1wdHkoKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0TmV3RG9tRWxlbWVudCA9IGZ1bmN0aW9uIChcbiAgICAgICAgICAgICAgICB0d2lnVGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgZGlzcGxheVR5cGUsXG4gICAgICAgICAgICAgICAgY29udGVudE5hbWUsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVOYW1lLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlSWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICB3aWRnZXRIdG1sVGVtcGxhdGUsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB2YXIgdHdpZ0V4cHJlc3Npb24gPSB0d2lnVGVtcGxhdGUucmVwbGFjZSgvJVxcdyslL2csIGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyVLRVklJzoga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgJyVURU1QTEFURSUnOiB0ZW1wbGF0ZUlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIH1bcGFyYW1dO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJ1aWx0VGVtcGxhdGUgPSB3aWRnZXRIdG1sVGVtcGxhdGUucmVwbGFjZSgvJVxcdyslL2csIGZ1bmN0aW9uIChwYXJhbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJyVUWVBFJSc6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJURJU1BMQVlfVFlQRSUnOiBkaXNwbGF5VHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICclS0VZJSc6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICclSUQlJzogaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJU5BTUUlJzogY29udGVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJVRFTVBMQVRFX0RJU1BMQVlfTkFNRSUnOiB0ZW1wbGF0ZU5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJVRFTVBMQVRFJSc6IHRlbXBsYXRlSWRlbnRpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICclVFdJR19FWFBSRVNTSU9OJSc6IHR3aWdFeHByZXNzaW9uLFxuICAgICAgICAgICAgICAgICAgICB9W3BhcmFtXTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBidWlsdFRlbXBsYXRlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dDb250ZW50ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29udGVudENhY2hlW3VybF0pIHtcbiAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2h0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jb250ZW50Q2FjaGVbdXJsXSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5pbml0Q29udGVudEh0bWwoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXRDb250ZW50SHRtbCh0aGlzLmNvbnRlbnRDYWNoZVt1cmxdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmluaXRDb250ZW50SHRtbCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFBamF4VXJsID0gJChkYXRhKS5maW5kKCd0YWJsZScpLmRhdGEoJ2FqYXgnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5maW5kKCcuY29udGVudC1pdGVtLWxvYWRlcicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRkaWFsb2cuZmluZCgnLmNvbnRlbnQtaXRlbS1ib2R5IC5jb250ZW50LWFqYXgnKS5hcHBlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZGlhbG9nLmZpbmQoJ3RhYmxlJykuRGF0YVRhYmxlKHtcbiAgICAgICAgICAgICAgICAgICAgYWpheDogZGF0YUFqYXhVcmwsXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aENoYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGxhbmd1YWdlOiBkYXRhVGFibGUuZGVmYXVsdENvbmZpZ3VyYXRpb24ubGFuZ3VhZ2UsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmNsZWFyQ29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRkaWFsb2cuZmluZCgnLmNvbnRlbnQtaXRlbS1ib2R5IC5jb250ZW50LWFqYXgnKS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGRpYWxvZy5maW5kKCcuY29udGVudC1pdGVtLWxvYWRlcicpLnNob3coKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICh2YWx1ZSwgdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGFzZXQgPSB0YXJnZXRbMF0uZGF0YXNldDtcbiAgICAgICAgICAgICAgICB0aGlzLmlzQ3JlYXRlTmV3ID0gZGF0YXNldC5oYXNPd25Qcm9wZXJ0eSgnbmV3Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGFzZXQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHVybFBhcmFtcyA9IHsgdHlwZTogZGF0YXNldC50eXBlIH07XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldC5oYXNPd25Qcm9wZXJ0eSgna2V5JykpIHtcbiAgICAgICAgICAgICAgICAgICAgdXJsUGFyYW1zLmNvbnRlbnRLZXkgPSBkYXRhc2V0LmtleTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YXNldC5oYXNPd25Qcm9wZXJ0eSgndGVtcGxhdGUnKSkge1xuICAgICAgICAgICAgICAgICAgICB1cmxQYXJhbXMudGVtcGxhdGUgPSBkYXRhc2V0LnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBkaWFsb2dDb250ZW50VXJsICsgJz8nICsgJC5wYXJhbSh1cmxQYXJhbXMpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Lmludm9rZSgnZWRpdG9yLnNhdmVSYW5nZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDb250ZW50KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXREaWFsb2dDb250ZW50KHVybCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kdWkuc2hvd0RpYWxvZyh0aGlzLiRkaWFsb2cpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGVudEl0ZW1EaWFsb2c7XG4iLCJ2YXIgQ29udGVudEl0ZW1FZGl0b3JQb3BvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICQuZXh0ZW5kKCQuc3VtbWVybm90ZS5wbHVnaW5zLCB7XG4gICAgICAgIGNvbnRlbnRJdGVtUG9wb3ZlcjogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICB0aGlzLnVpID0gJC5zdW1tZXJub3RlLnVpO1xuICAgICAgICAgICAgdGhpcy5ub3RlID0gY29udGV4dC5sYXlvdXRJbmZvLm5vdGU7XG4gICAgICAgICAgICB0aGlzLiRyYW5nZSA9ICQuc3VtbWVybm90ZS5yYW5nZTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudEl0ZW1FZGl0b3JTZWxlY3RvciA9ICcuanMtY29udGVudC1pdGVtLWVkaXRvcic7XG4gICAgICAgICAgICB0aGlzLiRjbGlja2VkTm9kZSA9IFtdO1xuICAgICAgICAgICAgdGhpcy5pc1BvcG92ZXJWaXNpYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzID0ge1xuICAgICAgICAgICAgICAgICdzdW1tZXJub3RlLmtleXVwIHN1bW1lcm5vdGUubW91c2V1cCBzdW1tZXJub3RlLmNoYW5nZSc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kY2xpY2tlZE5vZGUgPSAkKHRoaXMuY29udGV4dC5pbnZva2UoJ2VkaXRvci5jcmVhdGVSYW5nZScpLnNjKS5wYXJlbnRzKFxuICAgICAgICAgICAgICAgICAgICAgICAgJy5qcy1jb250ZW50LWl0ZW0tZWRpdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UG9wb3ZlcigpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAnc3VtbWVybm90ZS5kaXNhYmxlIHN1bW1lcm5vdGUuZGlhbG9nLnNob3duIHN1bW1lcm5vdGUuY29kZXZpZXcudG9nZ2xlZCc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlUG9wb3ZlcigpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICAnc3VtbWVybm90ZS5zY3JvbGwnOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNQb3BvdmVyVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb250ZW50SXRlbVBvcG92ZXIgPSB0aGlzLnVpXG4gICAgICAgICAgICAgICAgICAgIC5wb3BvdmVyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ25vdGUtbGluay1wb3BvdmVyJyxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnJlbmRlcigpXG4gICAgICAgICAgICAgICAgICAgIC5hcHBlbmRUbyhjb250ZXh0Lm9wdGlvbnMuY29udGFpbmVyKTtcblxuICAgICAgICAgICAgICAgIHZhciAkY29udGVudCA9IHRoaXMuJGNvbnRlbnRJdGVtUG9wb3Zlci5maW5kKCcucG9wb3Zlci1jb250ZW50LC5ub3RlLXBvcG92ZXItY29udGVudCcpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Lmludm9rZSgnYnV0dG9ucy5idWlsZCcsICRjb250ZW50LCB0aGlzLmNvbnRleHQub3B0aW9ucy5wb3BvdmVyLmVkaXRDb250ZW50SXRlbSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNob3dQb3BvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVBvcG92ZXIoKTtcblxuICAgICAgICAgICAgICAgIHZhciBjbGlja2VkQ29udGVudEl0ZW1FZGl0b3IgPSB0aGlzLmdldENsaWNrZWRDb250ZW50SXRlbUVkaXRvcih0aGlzLiRjbGlja2VkTm9kZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWNsaWNrZWRDb250ZW50SXRlbUVkaXRvcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5pc1BvcG92ZXJWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvcG92ZXJCdXR0b25zKGNsaWNrZWRDb250ZW50SXRlbUVkaXRvcik7XG4gICAgICAgICAgICAgICAgdGhpcy5wdXRDYXJyZXRJblRoZUJlZ2luaW5nKGNsaWNrZWRDb250ZW50SXRlbUVkaXRvcik7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXRlbVBvc2l0aW9uID0gdGhpcy5nZXRQb3BvdmVyUG9zaXRpb24oY2xpY2tlZENvbnRlbnRJdGVtRWRpdG9yKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRlbnRJdGVtUG9wb3Zlci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBpdGVtUG9zaXRpb24ubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBpdGVtUG9zaXRpb24udG9wLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5oaWRlUG9wb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb250ZW50SXRlbVBvcG92ZXIuaGlkZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNQb3BvdmVyVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UG9wb3ZlcigpO1xuXG4gICAgICAgICAgICAgICAgdmFyICRlZGl0b3IgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQubmV4dFNpYmxpbmcpLmZpbmQoJy5ub3RlLWVkaXRpbmctYXJlYScpO1xuICAgICAgICAgICAgICAgIHZhciBlZGl0b3JQb3NpdGlvblRvcCA9ICRlZGl0b3Iub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAgIHZhciBlZGl0b3JQb3NpdGlvbkJvdHRvbSA9IGVkaXRvclBvc2l0aW9uVG9wICsgJGVkaXRvci5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgcG9wb3ZlclBvc2l0aW9uVG9wID0gdGhpcy4kY29udGVudEl0ZW1Qb3BvdmVyLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICB2YXIgcG9wb3ZlclBvc2l0aW9uQm90dG9tID0gcG9wb3ZlclBvc2l0aW9uVG9wICsgdGhpcy4kY29udGVudEl0ZW1Qb3BvdmVyLmhlaWdodCgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBvcG92ZXJQb3NpdGlvbkJvdHRvbSA+IGVkaXRvclBvc2l0aW9uQm90dG9tIHx8IHBvcG92ZXJQb3NpdGlvblRvcCA8IGVkaXRvclBvc2l0aW9uVG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZVBvcG92ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnB1dENhcnJldEluVGhlQmVnaW5pbmcgPSBmdW5jdGlvbiAoY2xpY2tlZENvbnRlbnRJdGVtRWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1QYXJlbnROb2RlID0gdGhpcy4kcmFuZ2UuY3JlYXRlRnJvbU5vZGUoY2xpY2tlZENvbnRlbnRJdGVtRWRpdG9yLnBhcmVudE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgaXRlbVBhcmVudE5vZGUuY29sbGFwc2UodHJ1ZSk7XG4gICAgICAgICAgICAgICAgaXRlbVBhcmVudE5vZGUuc2VsZWN0KCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdldFBvcG92ZXJQb3NpdGlvbiA9IGZ1bmN0aW9uIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgIHZhciAkcGxhY2Vob2xkZXIgPSAkKHBsYWNlaG9sZGVyKTtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAkcGxhY2Vob2xkZXIub2Zmc2V0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9ICRwbGFjZWhvbGRlci5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHBvc2l0aW9uLmxlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcG9zaXRpb24udG9wICsgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmdldENsaWNrZWRDb250ZW50SXRlbUVkaXRvciA9IGZ1bmN0aW9uICgkY2xpY2tlZE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoJGNsaWNrZWROb2RlLmlzKHRoaXMuY29udGVudEl0ZW1FZGl0b3JTZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRjbGlja2VkTm9kZVswXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgJHBhcmVudENvbnRlbnRJdGVtRWRpdG9yID0gJGNsaWNrZWROb2RlLnBhcmVudHModGhpcy5jb250ZW50SXRlbUVkaXRvclNlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIGlmICgkcGFyZW50Q29udGVudEl0ZW1FZGl0b3IubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcGFyZW50Q29udGVudEl0ZW1FZGl0b3JbMF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3BvdmVyQnV0dG9ucyA9IGZ1bmN0aW9uIChjbGlja2VkQ29udGVudEl0ZW1FZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVR5cGUgPSBjbGlja2VkQ29udGVudEl0ZW1FZGl0b3IuZGF0YXNldC50eXBlO1xuICAgICAgICAgICAgICAgIHZhciBpdGVtSWQgPSBjbGlja2VkQ29udGVudEl0ZW1FZGl0b3IuZGF0YXNldC5pZDtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbUtleSA9IGNsaWNrZWRDb250ZW50SXRlbUVkaXRvci5kYXRhc2V0LmtleTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVRlbXBsYXRlID0gY2xpY2tlZENvbnRlbnRJdGVtRWRpdG9yLmRhdGFzZXQudGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgdmFyICRwb3BvdmVyQnV0dG9ucyA9IHRoaXMuJGNvbnRlbnRJdGVtUG9wb3Zlci5maW5kKCdidXR0b24nKTtcblxuICAgICAgICAgICAgICAgICRwb3BvdmVyQnV0dG9ucy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyKCdkYXRhLXR5cGUnLCBpdGVtVHlwZSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyKCdkYXRhLWtleScsIGl0ZW1LZXkpO1xuICAgICAgICAgICAgICAgICAgICBidXR0b24uYXR0cignZGF0YS1pZCcsIGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hdHRyKCdkYXRhLXRlbXBsYXRlJywgaXRlbVRlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xpY2tlZE5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNsaWNrZWROb2RlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ29udGVudEl0ZW1FZGl0b3JQb3BvdmVyO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWRpdG9yQ29uZmlnID0gcmVxdWlyZSgnWmVkR3VpRWRpdG9yQ29uZmlndXJhdGlvbicpO1xudmFyIGVkaXRvckJ1dHRvbnMgPSByZXF1aXJlKCcuL2VkaXRvckNvbXBvbmVudHMvYnV0dG9ucycpO1xudmFyIENvbnRlbnRJdGVtRGlhbG9nID0gcmVxdWlyZSgnLi9jb250ZW50LWl0ZW0tZWRpdG9yLWRpYWxvZycpO1xudmFyIENvbnRlbnRJdGVtUG9wb3ZlciA9IHJlcXVpcmUoJy4vY29udGVudC1pdGVtLWVkaXRvci1wb3BvdmVyJyk7XG5cbnZhciBDb250ZW50SXRlbUVkaXRvciA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZHJvcERvd25JdGVtcyA9IFtdO1xuICAgIHRoaXMuYnV0dG9uVGl0bGUgPSAnSW5zZXJ0IENvbnRlbnQnO1xuICAgIHRoaXMudGl0bGUgPSAnQ29udGVudCc7XG4gICAgdGhpcy5pbnNlcnRCdXR0b25UaXRsZSA9ICdJbnNlcnQnO1xuICAgIHRoaXMuZGlhbG9nQ29udGVudFVybCA9ICcnO1xuICAgIHRoaXMucG9wb3ZlckJ1dHRvbnMgPSB7fTtcbiAgICB0aGlzLmVkaXRvckNvbnRlbnRXaWRnZXRUZW1wbGF0ZSA9ICcnO1xuXG4gICAgJC5leHRlbmQodGhpcywgb3B0aW9ucyk7XG5cbiAgICB0aGlzLmluaXRpYWxpemF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBuZXcgQ29udGVudEl0ZW1EaWFsb2coXG4gICAgICAgICAgICB0aGlzLnRpdGxlLFxuICAgICAgICAgICAgdGhpcy5kaWFsb2dDb250ZW50VXJsLFxuICAgICAgICAgICAgdGhpcy5pbnNlcnRCdXR0b25UaXRsZSxcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQ29udGVudFdpZGdldFRlbXBsYXRlLFxuICAgICAgICAgICAgdGhpcy5tYXhXaWRnZXROdW1iZXIsXG4gICAgICAgICk7XG4gICAgICAgIG5ldyBDb250ZW50SXRlbVBvcG92ZXIoKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRFZGl0b3JDb25maWcgPSBmdW5jdGlvbiAoYmFzZUNvbmZpZyA9ICcnKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgYmFzZUNvbmZpZyA9IGVkaXRvckNvbmZpZy5nZXRHbG9iYWxDb25maWcoYmFzZUNvbmZpZyk7XG5cbiAgICAgICAgaWYgKCFiYXNlQ29uZmlnKSB7XG4gICAgICAgICAgICBiYXNlQ29uZmlnID0gZWRpdG9yQ29uZmlnLmdldENvbmZpZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbnRlbnRHdWlDb25maWcgPSB7XG4gICAgICAgICAgICB0b29sYmFyOiBbWydpbnNlcnQnLCBbJ2Ryb3Bkb3duQ29udGVudEl0ZW0nXV1dLFxuICAgICAgICAgICAgYnV0dG9uczoge1xuICAgICAgICAgICAgICAgIGRyb3Bkb3duQ29udGVudEl0ZW06IHRoaXMuY3JlYXRlRHJvcGRvd25CdXR0b24oKSxcbiAgICAgICAgICAgICAgICBlZGl0V2lkZ2V0OiB0aGlzLmNyZWF0ZUVkaXRXaWRnZXRCdXR0b24oKSxcbiAgICAgICAgICAgICAgICBlZGl0Q29udGVudEl0ZW06IHRoaXMuY3JlYXRlRWRpdENvbnRlbnRJdGVtQnV0dG9uKCksXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ29udGVudEl0ZW06IHRoaXMuY3JlYXRlUmVtb3ZlQ29udGVudEl0ZW1CdXR0b24oKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3BvdmVyOiB7XG4gICAgICAgICAgICAgICAgZWRpdENvbnRlbnRJdGVtOiBbJ2VkaXRXaWRnZXQnLCAnZWRpdENvbnRlbnRJdGVtJywgJ3JlbW92ZUNvbnRlbnRJdGVtJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2FsbGJhY2tzOiB7XG4gICAgICAgICAgICAgICAgb25LZXlkb3duOiB0aGlzLm9uS2V5ZG93bkhhbmRsZXIsXG4gICAgICAgICAgICAgICAgb25DaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkNoYW5nZUhhbmRsZXIoJCh0aGlzKSwgc2VsZik7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaWFsb2dzSW5Cb2R5OiB0cnVlLFxuICAgICAgICAgICAgc3R5bGVXaXRoQ1NTOiB0cnVlLFxuICAgICAgICAgICAgY29kZW1pcnJvcjoge1xuICAgICAgICAgICAgICAgIGxpbmVXcmFwcGluZzogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIGVkaXRvckNvbmZpZy5tZXJnZUNvbmZpZ3MoYmFzZUNvbmZpZywgY29udGVudEd1aUNvbmZpZyk7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRHJvcGRvd25CdXR0b24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3JCdXR0b25zLkNvbnRlbnRJdGVtRHJvcGRvd25CdXR0b24oXG4gICAgICAgICAgICB0aGlzLmJ1dHRvblRpdGxlLFxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZURyb3Bkb3duTGlzdCgpLFxuICAgICAgICAgICAgdGhpcy5zaG93RGlhbG9nSGFuZGxlcixcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVFZGl0V2lkZ2V0QnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWRpdG9yQnV0dG9ucy5Qb3BvdmVyQnV0dG9uKHRoaXMucG9wb3ZlckJ1dHRvbnMuZWRpdFdpZGdldCwgdGhpcy5zaG93RGlhbG9nSGFuZGxlcik7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlRWRpdENvbnRlbnRJdGVtQnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWRpdG9yQnV0dG9ucy5Qb3BvdmVyQnV0dG9uKHRoaXMucG9wb3ZlckJ1dHRvbnMuZWRpdENvbnRlbnRJdGVtLCB0aGlzLmVkaXRDb250ZW50SXRlbUhhbmRsZXIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVJlbW92ZUNvbnRlbnRJdGVtQnV0dG9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZWRpdG9yQnV0dG9ucy5Qb3BvdmVyQnV0dG9uKHRoaXMucG9wb3ZlckJ1dHRvbnMucmVtb3ZlQ29udGVudEl0ZW0sIHRoaXMucmVtb3ZlQ29udGVudEl0ZW1IYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zaG93RGlhbG9nSGFuZGxlciA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBjb250ZXh0LmNyZWF0ZUludm9rZUhhbmRsZXIoJ2NvbnRlbnRJdGVtRGlhbG9nLnNob3cnKTtcbiAgICB9O1xuXG4gICAgdGhpcy5lZGl0Q29udGVudEl0ZW1IYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgY29udGVudEl0ZW1JZCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZDtcbiAgICAgICAgICAgIHZhciBvcmlnaW5MaW5rID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbjtcblxuICAgICAgICAgICAgd2luZG93Lm9wZW4ob3JpZ2luTGluayArIHNlbGYuY29udGVudEl0ZW1VcmwgKyAnP2lkLWNvbnRlbnQ9JyArIGNvbnRlbnRJdGVtSWQsICdfYmxhbmsnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZW1vdmVDb250ZW50SXRlbUhhbmRsZXIgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29udGV4dC5pbnZva2UoJ2NvbnRlbnRJdGVtRGlhbG9nLnJlbW92ZUl0ZW1Gcm9tRWRpdG9yJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRoaXMub25LZXlkb3duSGFuZGxlciA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgcHJlc3NlZEtleSA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQua2V5O1xuXG4gICAgICAgIGlmIChwcmVzc2VkS2V5ICE9PSAnRW50ZXInKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgJGVkaXRvciA9ICQodGhpcyk7XG4gICAgICAgIHZhciAkZWRpdG9yUmFuZ2UgPSAkZWRpdG9yLnN1bW1lcm5vdGUoJ2VkaXRvci5jcmVhdGVSYW5nZScpO1xuICAgICAgICB2YXIgd2lkZ2V0Q2xhc3NOYW1lID0gJ2pzLWNvbnRlbnQtaXRlbS1lZGl0b3InO1xuICAgICAgICB2YXIgaXNXaWRnZXRXcmFwcGVyID0gJCgkZWRpdG9yUmFuZ2Uuc2MpLmZpbmQoJy4nICsgd2lkZ2V0Q2xhc3NOYW1lKS5sZW5ndGg7XG4gICAgICAgIHZhciBpc1dpZGdldCA9ICQoJGVkaXRvclJhbmdlLnNjKS5oYXNDbGFzcyh3aWRnZXRDbGFzc05hbWUpO1xuXG4gICAgICAgIHZhciBhZGROZXdMaW5lQWZ0ZXJXaWRnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgJCgnPHA+PGJyPjwvcD4nKS5pbnNlcnRBZnRlcigkKHRhcmdldCkpO1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGUodGFyZ2V0Lm5leHRFbGVtZW50U2libGluZy5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChpc1dpZGdldFdyYXBwZXIpIHtcbiAgICAgICAgICAgIGFkZE5ld0xpbmVBZnRlcldpZGdldCgkZWRpdG9yUmFuZ2Uuc2MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzV2lkZ2V0KSB7XG4gICAgICAgICAgICBhZGROZXdMaW5lQWZ0ZXJXaWRnZXQoJGVkaXRvclJhbmdlLnNjLnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub25DaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24gKCRlZGl0b3IsIHNlbGYpIHtcbiAgICAgICAgdmFyIGN1cmx5QnJhY2VzUmVnRXhwID0gL1xce1xce1xccyooKD8hXFx9XFx9KS4pKlxccypcXH1cXH0vO1xuICAgICAgICB2YXIgJGVkaXRvclJhbmdlID0gJGVkaXRvci5zdW1tZXJub3RlKCdjcmVhdGVSYW5nZScpO1xuICAgICAgICB2YXIgJGVkaXRvck5vZGUgPSAkKCRlZGl0b3JSYW5nZS5zYyk7XG4gICAgICAgIHZhciBub2RlQ29udGVudCA9ICRlZGl0b3JOb2RlLnRleHQoKTtcbiAgICAgICAgdmFyIGhhc0N1cmx5QnJhY2VzID0gY3VybHlCcmFjZXNSZWdFeHAudGVzdChub2RlQ29udGVudCk7XG5cbiAgICAgICAgaWYgKCFoYXNDdXJseUJyYWNlcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyICRlZGl0b3JQYXJlbnROb2RlID0gJGVkaXRvck5vZGUucGFyZW50cygncCcpO1xuXG4gICAgICAgIHNlbGYuY2hhbmdlRWRpdG9yTm9kZSgkZWRpdG9yUGFyZW50Tm9kZSk7XG4gICAgfTtcblxuICAgIHRoaXMuY2hhbmdlRWRpdG9yTm9kZSA9IGZ1bmN0aW9uICgkZWRpdG9yUGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoISRlZGl0b3JQYXJlbnROb2RlLmlzKCdwJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciAkZWxlbWVudEZvckluc2VydCA9ICQoJzxkaXY+JyArICRlZGl0b3JQYXJlbnROb2RlLmh0bWwoKSArICc8L2Rpdj4nKTtcblxuICAgICAgICAkZWRpdG9yUGFyZW50Tm9kZS5yZXBsYWNlV2l0aCgkZWxlbWVudEZvckluc2VydCk7XG4gICAgICAgIHRoaXMucHV0Q2FyZXRBdFRoZUxpbmVFbmQoJGVsZW1lbnRGb3JJbnNlcnQpO1xuICAgIH07XG5cbiAgICB0aGlzLnB1dENhcmV0QXRUaGVMaW5lRW5kID0gZnVuY3Rpb24gKCRpbnNlcnRlZEVsZW1lbnQpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZSgkaW5zZXJ0ZWRFbGVtZW50WzBdLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG4gICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZW5lcmF0ZURyb3Bkb3duTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcERvd25JdGVtcy5yZWR1Y2UoZnVuY3Rpb24gKGN1cnJlbnRMaXN0LCBkcm9wSXRlbSkge1xuICAgICAgICAgICAgdmFyIGRyb3BJdGVtVGVtcGxhdGUgPVxuICAgICAgICAgICAgICAgICc8bGkgcm9sZT1cImxpc3RpdGVtXCI+JyArXG4gICAgICAgICAgICAgICAgJzxhIGhyZWY9XCIjXCIgZGF0YS10eXBlPVwiJyArXG4gICAgICAgICAgICAgICAgZHJvcEl0ZW0udHlwZSArXG4gICAgICAgICAgICAgICAgJ1wiIGRhdGEtbmV3PVwidHJ1ZVwiPicgK1xuICAgICAgICAgICAgICAgIGRyb3BJdGVtLm5hbWUgK1xuICAgICAgICAgICAgICAgICc8L2E+JyArXG4gICAgICAgICAgICAgICAgJzwvbGk+JztcblxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRMaXN0ICsgZHJvcEl0ZW1UZW1wbGF0ZTtcbiAgICAgICAgfSwgJycpO1xuICAgIH07XG5cbiAgICB0aGlzLmluaXRpYWxpemF0aW9uKCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRlbnRJdGVtRWRpdG9yO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29udGVudEl0ZW1Ecm9wZG93bkJ1dHRvbiA9IGZ1bmN0aW9uIChidXR0b25UaXRsZSwgZHJvcGRvd25MaXN0LCBkcm9wZG93bkNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciB1aSA9ICQuc3VtbWVybm90ZS51aTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gdWkuYnV0dG9uR3JvdXAoW1xuICAgICAgICAgICAgdWkuYnV0dG9uKHtcbiAgICAgICAgICAgICAgICBjb250ZW50czogYnV0dG9uVGl0bGUgKyAnIDxpIGNsYXNzPVwiZmEgZmEtY2FyZXQtZG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlOiAnZHJvcGRvd24nLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHVpLmRyb3Bkb3duKHtcbiAgICAgICAgICAgICAgICBjb250ZW50czogZHJvcGRvd25MaXN0LFxuICAgICAgICAgICAgICAgIGNsaWNrOiBkcm9wZG93bkNhbGxiYWNrKGNvbnRleHQpLFxuICAgICAgICAgICAgfSksXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHJldHVybiBidXR0b24ucmVuZGVyKCk7XG4gICAgfTtcbn07XG5cbnZhciBQb3BvdmVyQnV0dG9uID0gZnVuY3Rpb24gKGJ1dHRvbkNvbnRlbnQsIGJ1dHRvbkNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIHZhciB1aSA9ICQuc3VtbWVybm90ZS51aTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gdWkuYnV0dG9uKHtcbiAgICAgICAgICAgIGNvbnRlbnRzOiBidXR0b25Db250ZW50Lmljb24gKyAnICcgKyBidXR0b25Db250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdG9vbHRpcDogYnV0dG9uQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIGNsaWNrOiBidXR0b25DYWxsYmFjayhjb250ZXh0KSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJ1dHRvbi5yZW5kZXIoKTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgQ29udGVudEl0ZW1Ecm9wZG93bkJ1dHRvbjogQ29udGVudEl0ZW1Ecm9wZG93bkJ1dHRvbixcbiAgICBQb3BvdmVyQnV0dG9uOiBQb3BvdmVyQnV0dG9uLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vc2Fzcy9tYWluLnNjc3MnKTtcbnZhciBDb250ZW50SXRlbUVkaXRvciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9jb250ZW50LWl0ZW0tZWRpdG9yJyk7XG52YXIgZWRpdG9yID0gbmV3IENvbnRlbnRJdGVtRWRpdG9yKHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uLmNvbnRlbnRHdWlDb25maWdEYXRhKTtcbndpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uLmNtcyA9IGVkaXRvci5nZXRFZGl0b3JDb25maWcoJ2NtcycpO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRHbG9iYWxDb25maWc6IGZ1bmN0aW9uIChjb25maWdOYW1lKSB7XG4gICAgICAgIHJldHVybiBCb29sZWFuKGNvbmZpZ05hbWUgJiYgd2luZG93LmVkaXRvckNvbmZpZ3VyYXRpb24gJiYgd2luZG93LmVkaXRvckNvbmZpZ3VyYXRpb25bY29uZmlnTmFtZV0pXG4gICAgICAgICAgICA/IHdpbmRvdy5lZGl0b3JDb25maWd1cmF0aW9uW2NvbmZpZ05hbWVdXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfSxcbiAgICBtZXJnZUNvbmZpZ3M6IGZ1bmN0aW9uIChiYXNlQ29uZmlnLCBuZXdDb25maWcpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcGVydHkgaW4gbmV3Q29uZmlnKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9vbGJhcic6XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRvb2xiYXJPcHRpb25zKGJhc2VDb25maWcsIG5ld0NvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2J1dHRvbnMnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoYmFzZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnYnV0dG9ucycpICYmIG5ld0NvbmZpZy5oYXNPd25Qcm9wZXJ0eSgnYnV0dG9ucycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmV4dGVuZChiYXNlQ29uZmlnLmJ1dHRvbnMsIG5ld0NvbmZpZy5idXR0b25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJhc2VDb25maWcuaGFzT3duUHJvcGVydHkoJ2J1dHRvbnMnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFzZUNvbmZpZy5idXR0b25zID0gbmV3Q29uZmlnLmJ1dHRvbnM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncG9wb3Zlcic6XG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZhdWx0UG9wb3Zlck9wdGlvbnMgPSAkLnN1bW1lcm5vdGUub3B0aW9ucy5wb3BvdmVyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXh0ZW5kZWRPcHRpb25zID0gJC5leHRlbmQoZGVmYXVsdFBvcG92ZXJPcHRpb25zLCBuZXdDb25maWcucG9wb3Zlcik7XG5cbiAgICAgICAgICAgICAgICAgICAgYmFzZUNvbmZpZy5wb3BvdmVyID0gZXh0ZW5kZWRPcHRpb25zO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBiYXNlQ29uZmlnW3Byb3BlcnR5XSA9IG5ld0NvbmZpZ1twcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYmFzZUNvbmZpZztcbiAgICB9LFxuICAgIGdldENvbmZpZzogZnVuY3Rpb24gKGNvbnRlbnQpIHtcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQgfHwgJyc7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICAgICAgbWF4SGVpZ2h0OiA2MDAsXG4gICAgICAgICAgICBpbnB1dFRleHQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBmb2N1czogdHJ1ZSxcbiAgICAgICAgICAgIHRvb2xiYXI6IFtcbiAgICAgICAgICAgICAgICBbJ3N0eWxlJywgWydib2xkJywgJ2l0YWxpYycsICd1bmRlcmxpbmUnLCAnY2xlYXInXV0sXG4gICAgICAgICAgICAgICAgWydmb250JywgWydzdHJpa2V0aHJvdWdoJywgJ3N1cGVyc2NyaXB0JywgJ3N1YnNjcmlwdCddXSxcbiAgICAgICAgICAgICAgICBbJ2ZvbnRzaXplJywgWydmb250c2l6ZSddXSxcbiAgICAgICAgICAgICAgICBbJ2NvbG9yJywgWydjb2xvciddXSxcbiAgICAgICAgICAgICAgICBbJ3BhcmEnLCBbJ3VsJywgJ29sJywgJ3BhcmFncmFwaCddXSxcbiAgICAgICAgICAgICAgICBbJ2luc2VydCcsIFsncGljdHVyZScsICdsaW5rJywgJ3ZpZGVvJywgJ3RhYmxlJywgJ2hyJ11dLFxuICAgICAgICAgICAgICAgIFsnbWlzYycsIFsndW5kbycsICdyZWRvJywgJ2NvZGV2aWV3J11dLFxuICAgICAgICAgICAgICAgIFsnY3VzdG9tJywgW11dLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgfTtcbiAgICB9LFxufTtcblxuaWYgKCFBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCA9IGZ1bmN0aW9uIChwcmVkaWNhdGUpIHtcbiAgICAgICAgaWYgKHRoaXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kSW5kZXggY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ByZWRpY2F0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IGxpc3QubGVuZ3RoID4+PiAwO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUuY2FsbCh0aGlzQXJnLCB2YWx1ZSwgaSwgbGlzdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcbn1cblxudmFyIHVwZGF0ZVRvb2xiYXJPcHRpb25zID0gZnVuY3Rpb24gKGJhc2VDb25maWcsIG5ld0NvbmZpZykge1xuICAgIG5ld0NvbmZpZy50b29sYmFyLmZvckVhY2goZnVuY3Rpb24gKG5ld1Rvb2xiYXJPcHRpb24pIHtcbiAgICAgICAgdmFyIGV4aXN0aW5nT3B0aW9uSW5kZXggPSBiYXNlQ29uZmlnLnRvb2xiYXIuZmluZEluZGV4KGZ1bmN0aW9uIChkZWZhdWx0VG9vbGJhck9wdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIG5ld1Rvb2xiYXJPcHRpb25bMF0gPT09IGRlZmF1bHRUb29sYmFyT3B0aW9uWzBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZXhpc3RpbmdPcHRpb25JbmRleCkge1xuICAgICAgICAgICAgdmFyIG5ld1Rvb2xiYXJPcHRpb25zQXJyYXkgPSBuZXdUb29sYmFyT3B0aW9uWzFdLnNsaWNlKDApO1xuICAgICAgICAgICAgdmFyIHRvb2xiYXJPcHRpb25Hcm91cCA9IGJhc2VDb25maWcudG9vbGJhcltleGlzdGluZ09wdGlvbkluZGV4XTtcbiAgICAgICAgICAgIHZhciB0b29sYmFyT3B0aW9uc0FycmF5ID0gdG9vbGJhck9wdGlvbkdyb3VwWzFdO1xuXG4gICAgICAgICAgICB0b29sYmFyT3B0aW9uc0FycmF5LnB1c2gobmV3VG9vbGJhck9wdGlvbnNBcnJheSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBiYXNlQ29uZmlnLnRvb2xiYXIucHVzaChuZXdUb29sYmFyT3B0aW9uKTtcbiAgICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGdldExvY2FsZSgpIHtcbiAgICB2YXIgbG9jYWxlID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmRhdGFzZXQuYXBwbGljYXRpb25Mb2NhbGU7XG4gICAgaWYgKHR5cGVvZiBsb2NhbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBsb2NhbGUuc3BsaXQoJ18nKVswXS5zcGxpdCgnLScpWzBdO1xuICAgIH1cbiAgICByZXR1cm4gJ2VuJztcbn1cblxuZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24obG9jYWxlKSB7XG4gICAgcmV0dXJuIHJlcXVpcmUoJy4vaTE4bi8nICsgbG9jYWxlICsgJy5qc29uJyk7XG59XG5cbnZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKTtcblxudmFyIHRyYW5zbGF0aW9uT2JqID0gZ2V0VHJhbnNsYXRpb24obG9jYWxlKTtcblxuaWYgKHRyYW5zbGF0aW9uT2JqLnNTZWFyY2gpIHtcbiAgICB0cmFuc2xhdGlvbk9iai5zZWFyY2hQbGFjZWhvbGRlciA9IHRyYW5zbGF0aW9uT2JqLnNTZWFyY2gucmVwbGFjZSgvXFwmbmJzcDt8Oi9naSwgJycpO1xufVxuXG52YXIgZGVmYXVsdENvbmZpZ3VyYXRpb24gPSB7XG4gICAgc2Nyb2xsWDogJ2F1dG8nLFxuICAgIGxhbmd1YWdlOiB0cmFuc2xhdGlvbk9iaixcbiAgICBkb206XG4gICAgICAgIFwiPCdyb3cnPCdjb2wtc20tMTIgY29sLW1kLTYnaT48J2NvbC1zbS0xMiBjb2wtbWQtNidmPj5cIiArXG4gICAgICAgIFwiPCdyb3cnPCdjb2wtc20tMTIndHI+PlwiICtcbiAgICAgICAgXCI8J2FsdC1yb3cnPCdhbHQtcm93X19sZWZ0J2w+PCdhbHQtcm93X19jZW50ZXIncD4+XCIsXG59O1xuXG52YXIgbm9TZWFyY2hDb25maWd1cmF0aW9uID0ge1xuICAgIGJGaWx0ZXI6IGZhbHNlLFxuICAgIGJJbmZvOiBmYWxzZSxcbiAgICBzY3JvbGxYOiAnYXV0bycsXG59O1xuXG5mdW5jdGlvbiBzZXRUYWJsZUVycm9yTW9kZShlcnJvck1vZGUpIHtcbiAgICAkLmZuLmRhdGFUYWJsZS5leHQuZXJyTW9kZSA9IGVycm9yTW9kZSB8fCAnbm9uZSc7XG59XG5cbmZ1bmN0aW9uIG9uVGFiQ2hhbmdlKHRhYklkKSB7XG4gICAgdmFyICR0YWIgPSAkKHRhYklkKTtcbiAgICB2YXIgJGRhdGFUYWJsZXMgPSAkdGFiLmZpbmQoJy5ndWktdGFibGUtZGF0YSwgLmd1aS10YWJsZS1kYXRhLW5vLXNlYXJjaCcpO1xuXG4gICAgaWYgKCEkZGF0YVRhYmxlcy5kYXRhKCdpbml0aWFsaXplZCcpKSB7XG4gICAgICAgICRkYXRhVGFibGVzLmRhdGEoJ2luaXRpYWxpemVkJywgdHJ1ZSkuRGF0YVRhYmxlKCkuZHJhdygpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gb25FcnJvcihlLCBzZXR0aW5ncywgdGVjaE5vdGUsIG1lc3NhZ2UpIHtcbiAgICB2YXIgZGVidWdNZXNzYWdlID0gJyc7XG5cbiAgICBpZiAoREVWKSB7XG4gICAgICAgIGRlYnVnTWVzc2FnZSA9ICc8YnIvPjxici8+PHNtYWxsPjx1PkRlYnVnIG1lc3NhZ2U6PC91Pjxici8+ICcgKyBtZXNzYWdlICsgJzwvc21hbGw+JztcbiAgICB9XG5cbiAgICB3aW5kb3cuc3dlZXRBbGVydCh7XG4gICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICB0ZXh0OlxuICAgICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgPGEgaHJlZj1cImphdmFzY3JpcHQ6d2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXCI+cmVmcmVzaDwvYT4gdGhlIHBhZ2Ugb3IgdHJ5IGFnYWluIGxhdGVyLicgK1xuICAgICAgICAgICAgZGVidWdNZXNzYWdlLFxuICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkZWZhdWx0Q29uZmlndXJhdGlvbjogZGVmYXVsdENvbmZpZ3VyYXRpb24sXG4gICAgbm9TZWFyY2hDb25maWd1cmF0aW9uOiBub1NlYXJjaENvbmZpZ3VyYXRpb24sXG4gICAgc2V0VGFibGVFcnJvck1vZGU6IHNldFRhYmxlRXJyb3JNb2RlLFxuICAgIG9uVGFiQ2hhbmdlOiBvblRhYkNoYW5nZSxcbiAgICBvbkVycm9yOiBvbkVycm9yLFxufTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsInZhciBtYXAgPSB7XG5cdFwiLi9hZi5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9hZi5qc29uXCIsXG5cdFwiLi9hbS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9hbS5qc29uXCIsXG5cdFwiLi9hci5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9hci5qc29uXCIsXG5cdFwiLi9iZS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9iZS5qc29uXCIsXG5cdFwiLi9iZy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9iZy5qc29uXCIsXG5cdFwiLi9jYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9jYS5qc29uXCIsXG5cdFwiLi9jcy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9jcy5qc29uXCIsXG5cdFwiLi9jeS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9jeS5qc29uXCIsXG5cdFwiLi9kYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9kYS5qc29uXCIsXG5cdFwiLi9kZS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9kZS5qc29uXCIsXG5cdFwiLi9lbC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9lbC5qc29uXCIsXG5cdFwiLi9lbi5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9lbi5qc29uXCIsXG5cdFwiLi9lby5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9lby5qc29uXCIsXG5cdFwiLi9lcy5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9lcy5qc29uXCIsXG5cdFwiLi9ldC5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ldC5qc29uXCIsXG5cdFwiLi9ldS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9ldS5qc29uXCIsXG5cdFwiLi9mYS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9mYS5qc29uXCIsXG5cdFwiLi9maS5qc29uXCI6IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4bi9maS5qc29uXCIsXG5cdFwiLi9maWwuanNvblwiOiBcIi4vdmVuZG9yL3NwcnlrZXIvZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9saWJzL2kxOG4vZmlsLmpzb25cIixcblx0XCIuL2ZyLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2ZyLmpzb25cIixcblx0XCIuL2dhLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2dhLmpzb25cIixcblx0XCIuL2dsLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2dsLmpzb25cIixcblx0XCIuL2d1Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2d1Lmpzb25cIixcblx0XCIuL2hpLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2hpLmpzb25cIixcblx0XCIuL2hyLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2hyLmpzb25cIixcblx0XCIuL2h1Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2h1Lmpzb25cIixcblx0XCIuL2h5Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2h5Lmpzb25cIixcblx0XCIuL2lkLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2lkLmpzb25cIixcblx0XCIuL2lzLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2lzLmpzb25cIixcblx0XCIuL2l0Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2l0Lmpzb25cIixcblx0XCIuL2l3Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2l3Lmpzb25cIixcblx0XCIuL2phLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2phLmpzb25cIixcblx0XCIuL2thLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2thLmpzb25cIixcblx0XCIuL2trLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2trLmpzb25cIixcblx0XCIuL2ttLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2ttLmpzb25cIixcblx0XCIuL2tvLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2tvLmpzb25cIixcblx0XCIuL2x0Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2x0Lmpzb25cIixcblx0XCIuL2x2Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL2x2Lmpzb25cIixcblx0XCIuL21rLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL21rLmpzb25cIixcblx0XCIuL21uLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL21uLmpzb25cIixcblx0XCIuL21zLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL21zLmpzb25cIixcblx0XCIuL25lLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL25lLmpzb25cIixcblx0XCIuL25sLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL25sLmpzb25cIixcblx0XCIuL3BsLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3BsLmpzb25cIixcblx0XCIuL3BzLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3BzLmpzb25cIixcblx0XCIuL3B0Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3B0Lmpzb25cIixcblx0XCIuL3JvLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3JvLmpzb25cIixcblx0XCIuL3J1Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3J1Lmpzb25cIixcblx0XCIuL3NpLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3NpLmpzb25cIixcblx0XCIuL3NrLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3NrLmpzb25cIixcblx0XCIuL3NsLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3NsLmpzb25cIixcblx0XCIuL3NxLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3NxLmpzb25cIixcblx0XCIuL3NyLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3NyLmpzb25cIixcblx0XCIuL3N2Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3N2Lmpzb25cIixcblx0XCIuL3N3Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3N3Lmpzb25cIixcblx0XCIuL3RhLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3RhLmpzb25cIixcblx0XCIuL3RoLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3RoLmpzb25cIixcblx0XCIuL3RyLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3RyLmpzb25cIixcblx0XCIuL3VrLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3VrLmpzb25cIixcblx0XCIuL3VyLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3VyLmpzb25cIixcblx0XCIuL3V6Lmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3V6Lmpzb25cIixcblx0XCIuL3ZpLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3ZpLmpzb25cIixcblx0XCIuL3poLmpzb25cIjogXCIuL3ZlbmRvci9zcHJ5a2VyL2d1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGlicy9pMThuL3poLmpzb25cIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xpYnMvaTE4biBzeW5jIHJlY3Vyc2l2ZSBeXFxcXC5cXFxcLy4qXFxcXC5qc29uJFwiOyJdLCJuYW1lcyI6WyJkYXRhVGFibGUiLCJyZXF1aXJlIiwiQ29udGVudEl0ZW1EaWFsb2ciLCJkaWFsb2dUaXRsZSIsImRpYWxvZ0NvbnRlbnRVcmwiLCJpbnNlcnRCdXR0b25UaXRsZSIsIndpZGdldEh0bWxUZW1wbGF0ZSIsIm1heFdpZGdldE51bWJlciIsIiQiLCJleHRlbmQiLCJzdW1tZXJub3RlIiwicGx1Z2lucyIsImNvbnRlbnRJdGVtRGlhbG9nIiwiY29udGV4dCIsIiRib2R5IiwiZG9jdW1lbnQiLCJib2R5IiwiZWRpdG9yIiwibGF5b3V0SW5mbyIsImVkaXRhYmxlIiwib3B0aW9ucyIsIiR1aSIsInVpIiwiJHJhbmdlIiwicmFuZ2UiLCJoaXN0b3J5IiwibW9kdWxlcyIsImNvbnRlbnRDYWNoZSIsImluaXRpYWxpemUiLCIkY29udGFpbmVyIiwiZGlhbG9nc0luQm9keSIsImxvYWRlclRlbXBsYXRlIiwiYm9keVRlbXBsYXRlIiwiZm9vdGVyVGVtcGxhdGUiLCIkZGlhbG9nIiwiZGlhbG9nIiwidGl0bGUiLCJmYWRlIiwiZGlhbG9nc0ZhZGUiLCJmb290ZXIiLCJyZW5kZXIiLCJhcHBlbmRUbyIsIm1hcEV2ZW50cyIsInNlbGYiLCJmaW5kIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYWRkQ29udGVudCIsInNob3dFcnJvciIsImVycm9yU2VsZWN0b3IiLCJjb250YWluZXIiLCJpbnNlcnRBZnRlciIsIiR0aXRsZUhlYWRlciIsIiR0ZW1wbGF0ZUhlYWRlciIsImNoZWNrZWRDb250ZW50SXRlbSIsImNob3NlblR5cGUiLCJ2YWwiLCJjaG9zZW5EaXNwbGF5VHlwZSIsImNob3Nlbk5hbWUiLCJkYXRhIiwiY2hvc2VuSWQiLCJjaG9zZW5LZXkiLCIkY2hvc2VJZEVycm9yU2VsZWN0b3IiLCJpc1RlbXBsYXRlTGlzdEV4aXN0cyIsImxlbmd0aCIsImNob3NlblRlbXBsYXRlIiwiY2hvc2VuVGVtcGxhdGVJZGVudGlmaWVyIiwiJGNob29zZVRlbXBsYXRlRXJyb3JTZWxlY3RvciIsInR3aWdUZW1wbGF0ZSIsInJlYWR5VG9JbnNlcnQiLCJ1bmRlZmluZWQiLCJhbGVydCIsImludm9rZSIsImhpZGVEaWFsb2ciLCJlbGVtZW50Rm9ySW5zZXJ0IiwiZ2V0TmV3RG9tRWxlbWVudCIsImFkZEl0ZW1JbkVkaXRvciIsInVwZGF0ZUVsZW1lbnRGb3JJbnNlcnQiLCIkY2xpY2tlZE5vZGUiLCJpc05vZGVFbXB0eSIsImNsZWFyTm9kZSIsInNjIiwicmVtb3ZlVW5lY2Vzc2FyeUxpbmVzIiwicmVtb3ZlRW1wdHlDb250ZW50SXRlbXMiLCIkbm9kZUlubmVySXRlbXMiLCJjaGlsZHJlbiIsImVxIiwiaXMiLCJpc1dpZGdldEVtcHR5IiwiaXNDb250ZW50SXRlbUVtcHR5IiwiJG5vZGVJdGVtIiwiaXNDb250ZW50SXRlbSIsInRleHQiLCIkc2VsZiIsImVhY2giLCJpbmRleCIsIml0ZW0iLCJjbG9zZXN0IiwicmVtb3ZlIiwicmVtb3ZlSXRlbUZyb21FZGl0b3IiLCJwYXJlbnRzIiwiJGluc2VydGVkTm9kZSIsIm5leHQiLCIkbmV4dE5vZGUiLCJyZW1vdmVBdHRyIiwic3RhY2tPZmZzZXQiLCJzdGFjayIsInNwbGljZSIsInJlY29yZFVuZG8iLCJlbXB0eSIsImlkIiwia2V5IiwidHlwZSIsImRpc3BsYXlUeXBlIiwiY29udGVudE5hbWUiLCJ0ZW1wbGF0ZU5hbWUiLCJ0ZW1wbGF0ZUlkZW50aWZpZXIiLCJ0d2lnRXhwcmVzc2lvbiIsInJlcGxhY2UiLCJwYXJhbSIsImJ1aWx0VGVtcGxhdGUiLCJnZXREaWFsb2dDb250ZW50IiwidXJsIiwiYWpheCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImluaXRDb250ZW50SHRtbCIsImRhdGFBamF4VXJsIiwiaGlkZSIsImFwcGVuZCIsIkRhdGFUYWJsZSIsImxlbmd0aENoYW5nZSIsImxhbmd1YWdlIiwiZGVmYXVsdENvbmZpZ3VyYXRpb24iLCJjbGVhckNvbnRlbnQiLCJzaG93IiwidmFsdWUiLCJ0YXJnZXQiLCJkYXRhc2V0IiwiaXNDcmVhdGVOZXciLCJoYXNPd25Qcm9wZXJ0eSIsInVybFBhcmFtcyIsImNvbnRlbnRLZXkiLCJ0ZW1wbGF0ZSIsInNob3dEaWFsb2ciLCJtb2R1bGUiLCJleHBvcnRzIiwiQ29udGVudEl0ZW1FZGl0b3JQb3BvdmVyIiwiY29udGVudEl0ZW1Qb3BvdmVyIiwibm90ZSIsImNvbnRlbnRJdGVtRWRpdG9yU2VsZWN0b3IiLCJpc1BvcG92ZXJWaXNpYmxlIiwiZXZlbnRzIiwic2hvd1BvcG92ZXIiLCJiaW5kIiwiaGlkZVBvcG92ZXIiLCJzY3JvbGxIYW5kbGVyIiwiJGNvbnRlbnRJdGVtUG9wb3ZlciIsInBvcG92ZXIiLCJjbGFzc05hbWUiLCIkY29udGVudCIsImVkaXRDb250ZW50SXRlbSIsImNsaWNrZWRDb250ZW50SXRlbUVkaXRvciIsImdldENsaWNrZWRDb250ZW50SXRlbUVkaXRvciIsInVwZGF0ZVBvcG92ZXJCdXR0b25zIiwicHV0Q2FycmV0SW5UaGVCZWdpbmluZyIsIml0ZW1Qb3NpdGlvbiIsImdldFBvcG92ZXJQb3NpdGlvbiIsImNzcyIsImRpc3BsYXkiLCJsZWZ0IiwidG9wIiwiJGVkaXRvciIsImN1cnJlbnRUYXJnZXQiLCJuZXh0U2libGluZyIsImVkaXRvclBvc2l0aW9uVG9wIiwib2Zmc2V0IiwiZWRpdG9yUG9zaXRpb25Cb3R0b20iLCJoZWlnaHQiLCJwb3BvdmVyUG9zaXRpb25Ub3AiLCJwb3BvdmVyUG9zaXRpb25Cb3R0b20iLCJpdGVtUGFyZW50Tm9kZSIsImNyZWF0ZUZyb21Ob2RlIiwicGFyZW50Tm9kZSIsImNvbGxhcHNlIiwic2VsZWN0IiwicGxhY2Vob2xkZXIiLCIkcGxhY2Vob2xkZXIiLCJwb3NpdGlvbiIsIm91dGVySGVpZ2h0IiwiJHBhcmVudENvbnRlbnRJdGVtRWRpdG9yIiwiaXRlbVR5cGUiLCJpdGVtSWQiLCJpdGVtS2V5IiwiaXRlbVRlbXBsYXRlIiwiJHBvcG92ZXJCdXR0b25zIiwiYnV0dG9uIiwiYXR0ciIsImdldENsaWNrZWROb2RlIiwiZWRpdG9yQ29uZmlnIiwiZWRpdG9yQnV0dG9ucyIsIkNvbnRlbnRJdGVtUG9wb3ZlciIsIkNvbnRlbnRJdGVtRWRpdG9yIiwiZHJvcERvd25JdGVtcyIsImJ1dHRvblRpdGxlIiwicG9wb3ZlckJ1dHRvbnMiLCJlZGl0b3JDb250ZW50V2lkZ2V0VGVtcGxhdGUiLCJpbml0aWFsaXphdGlvbiIsImdldEVkaXRvckNvbmZpZyIsImJhc2VDb25maWciLCJhcmd1bWVudHMiLCJnZXRHbG9iYWxDb25maWciLCJnZXRDb25maWciLCJjb250ZW50R3VpQ29uZmlnIiwidG9vbGJhciIsImJ1dHRvbnMiLCJkcm9wZG93bkNvbnRlbnRJdGVtIiwiY3JlYXRlRHJvcGRvd25CdXR0b24iLCJlZGl0V2lkZ2V0IiwiY3JlYXRlRWRpdFdpZGdldEJ1dHRvbiIsImNyZWF0ZUVkaXRDb250ZW50SXRlbUJ1dHRvbiIsInJlbW92ZUNvbnRlbnRJdGVtIiwiY3JlYXRlUmVtb3ZlQ29udGVudEl0ZW1CdXR0b24iLCJjYWxsYmFja3MiLCJvbktleWRvd24iLCJvbktleWRvd25IYW5kbGVyIiwib25DaGFuZ2UiLCJvbkNoYW5nZUhhbmRsZXIiLCJzdHlsZVdpdGhDU1MiLCJjb2RlbWlycm9yIiwibGluZVdyYXBwaW5nIiwibWVyZ2VDb25maWdzIiwiQ29udGVudEl0ZW1Ecm9wZG93bkJ1dHRvbiIsImdlbmVyYXRlRHJvcGRvd25MaXN0Iiwic2hvd0RpYWxvZ0hhbmRsZXIiLCJQb3BvdmVyQnV0dG9uIiwiZWRpdENvbnRlbnRJdGVtSGFuZGxlciIsInJlbW92ZUNvbnRlbnRJdGVtSGFuZGxlciIsImNyZWF0ZUludm9rZUhhbmRsZXIiLCJjb250ZW50SXRlbUlkIiwib3JpZ2luTGluayIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwib3BlbiIsImNvbnRlbnRJdGVtVXJsIiwicHJlc3NlZEtleSIsIm9yaWdpbmFsRXZlbnQiLCIkZWRpdG9yUmFuZ2UiLCJ3aWRnZXRDbGFzc05hbWUiLCJpc1dpZGdldFdyYXBwZXIiLCJpc1dpZGdldCIsImhhc0NsYXNzIiwiYWRkTmV3TGluZUFmdGVyV2lkZ2V0IiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwiY2hpbGROb2RlcyIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsImFkZFJhbmdlIiwiY3VybHlCcmFjZXNSZWdFeHAiLCIkZWRpdG9yTm9kZSIsIm5vZGVDb250ZW50IiwiaGFzQ3VybHlCcmFjZXMiLCJ0ZXN0IiwiJGVkaXRvclBhcmVudE5vZGUiLCJjaGFuZ2VFZGl0b3JOb2RlIiwiJGVsZW1lbnRGb3JJbnNlcnQiLCJodG1sIiwicmVwbGFjZVdpdGgiLCJwdXRDYXJldEF0VGhlTGluZUVuZCIsIiRpbnNlcnRlZEVsZW1lbnQiLCJyZWR1Y2UiLCJjdXJyZW50TGlzdCIsImRyb3BJdGVtIiwiZHJvcEl0ZW1UZW1wbGF0ZSIsIm5hbWUiLCJkcm9wZG93bkxpc3QiLCJkcm9wZG93bkNhbGxiYWNrIiwiYnV0dG9uR3JvdXAiLCJjb250ZW50cyIsInRvZ2dsZSIsImRyb3Bkb3duIiwiY2xpY2siLCJidXR0b25Db250ZW50IiwiYnV0dG9uQ2FsbGJhY2siLCJpY29uIiwidG9vbHRpcCIsImVkaXRvckNvbmZpZ3VyYXRpb24iLCJjb250ZW50R3VpQ29uZmlnRGF0YSIsImNtcyIsImNvbmZpZ05hbWUiLCJCb29sZWFuIiwibmV3Q29uZmlnIiwicHJvcGVydHkiLCJ1cGRhdGVUb29sYmFyT3B0aW9ucyIsImRlZmF1bHRQb3BvdmVyT3B0aW9ucyIsImV4dGVuZGVkT3B0aW9ucyIsImNvbnRlbnQiLCJtYXhIZWlnaHQiLCJpbnB1dFRleHQiLCJmb2N1cyIsIkFycmF5IiwicHJvdG90eXBlIiwiZmluZEluZGV4IiwicHJlZGljYXRlIiwiVHlwZUVycm9yIiwibGlzdCIsIk9iamVjdCIsInRoaXNBcmciLCJpIiwiY2FsbCIsImZvckVhY2giLCJuZXdUb29sYmFyT3B0aW9uIiwiZXhpc3RpbmdPcHRpb25JbmRleCIsImRlZmF1bHRUb29sYmFyT3B0aW9uIiwibmV3VG9vbGJhck9wdGlvbnNBcnJheSIsInNsaWNlIiwidG9vbGJhck9wdGlvbkdyb3VwIiwidG9vbGJhck9wdGlvbnNBcnJheSIsInB1c2giLCJnZXRMb2NhbGUiLCJsb2NhbGUiLCJkb2N1bWVudEVsZW1lbnQiLCJhcHBsaWNhdGlvbkxvY2FsZSIsInNwbGl0IiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2xhdGlvbk9iaiIsInNTZWFyY2giLCJzZWFyY2hQbGFjZWhvbGRlciIsInNjcm9sbFgiLCJkb20iLCJub1NlYXJjaENvbmZpZ3VyYXRpb24iLCJiRmlsdGVyIiwiYkluZm8iLCJzZXRUYWJsZUVycm9yTW9kZSIsImVycm9yTW9kZSIsImZuIiwiZXh0IiwiZXJyTW9kZSIsIm9uVGFiQ2hhbmdlIiwidGFiSWQiLCIkdGFiIiwiJGRhdGFUYWJsZXMiLCJkcmF3Iiwib25FcnJvciIsImUiLCJzZXR0aW5ncyIsInRlY2hOb3RlIiwibWVzc2FnZSIsImRlYnVnTWVzc2FnZSIsIkRFViIsInN3ZWV0QWxlcnQiXSwic291cmNlUm9vdCI6IiJ9