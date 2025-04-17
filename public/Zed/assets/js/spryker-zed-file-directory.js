(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-file-directory"],{

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/file-directory-tree.js":
/*!*****************************************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/file-directory-tree.js ***!
  \*****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.js");
var $treeContainer = $('#file-directory-tree-container');
var $treeContent = $('#file-directory-tree-content');
var $treeSearchField = $('#file-directory-tree-search-field');
var $treeProgressBar = $('#file-directory-tree-loader');
var $formProgressBar = $('#file-directory-node-form-loader');
var $treeUpdateProgressBar = $('#file-directory-tree-update-loader');
var $treeOrderSaveBtn = $('#file-directory-tree-save-btn');
var ajaxRequest;
var treeSearchTimeout = false;
var config = {
  fileDirectoryTreeUrl: '/file-manager-gui/directories-tree/load',
  fileDirectoryNodeFormUrlPrefix: '/file-manager-gui/node/',
  fileDirectoryTreeHierarchyUpdateUrl: '/file-manager-gui/directories-tree/update-hierarchy',
  fileDirectoryTreeNodeTypes: {
    default: {
      icon: 'fa fa-folder'
    }
  }
};

/**
 * @return {void}
 */
function initialize() {
  $treeOrderSaveBtn.on('click', onTreeSaveOrderClick);
  $treeSearchField.on('keyup', onTreeSearchKeyup);
  initJsTree();

  // Enable save order button on tree change
  $(document).on('dnd_stop.vakata', function () {
    $treeOrderSaveBtn.removeAttr('disabled');
  });
}

/**
 * @return {void}
 */
function initJsTree() {
  $('#file-directory-files-list').load('/file-manager-gui/files');
  $('#file-directory-tree').jstree({
    core: {
      check_callback: function (op, node, par, pos, more) {
        // disable drop on root level
        if (more && more.dnd && (op === 'move_node' || op === 'copy_node')) {
          return !!more.ref.data.idFileDirectoryNode;
        }
        return true;
      }
    },
    plugins: ['wholerow', 'dnd', 'search'],
    types: config.fileDirectoryTreeNodeTypes,
    dnd: {
      is_draggable: function (items) {
        var idFileDirectoryNode = items[0].data.idFileDirectoryNode;
        return !!idFileDirectoryNode;
      }
    }
  }).on('changed.jstree', function (e, data) {
    var $filesList = $('#file-directory-files-list'),
      $filesTable = $filesList.find('table').first(),
      $deleteDirectoryButton = $('#delete-directory-link'),
      $deleteDirectoryConfirmationButton = $('#delete-directory-confirmation-button');
    $('#add-file-link').attr('href', '/file-manager-gui/add-file?file-directory-id=' + data.node.data.idFileDirectoryNode);
    if (typeof data.node.data.idFileDirectoryNode === 'undefined') {
      $deleteDirectoryButton.removeAttr('href');
      $deleteDirectoryButton.removeAttr('data-id-parent');
      $deleteDirectoryButton.attr('disabled', true);
      $filesList.hide();
      return;
    }
    $filesList.show();
    $filesTable.DataTable().ajax.url('/file-manager-gui/files/table?file-directory-id=' + data.node.data.idFileDirectoryNode).load();
    $deleteDirectoryButton.removeAttr('disabled');
    $deleteDirectoryConfirmationButton.closest('form').attr('action', '/file-manager-gui/delete-directory?id-directory=' + data.node.data.idFileDirectoryNode);
    $deleteDirectoryButton.attr('href', '/file-manager-gui/delete-directory?id-directory=' + data.node.data.idFileDirectoryNode);
    $deleteDirectoryButton.attr('data-id-parent', data.node.data.idParentFileDirectoryNode);
  });
  $treeProgressBar.removeClass('hidden');
}
$('#delete-directory-link').on('click', function (event) {
  if (!$(this).attr('data-id-parent')) {
    event.preventDefault();
    $('#directory-deleting-confirmation-modal').modal('show');
  }
});

/**
 * @return {void}
 */
function onTreeSearchKeyup() {
  if (treeSearchTimeout) {
    clearTimeout(treeSearchTimeout);
  }
  treeSearchTimeout = setTimeout(function () {
    $('#file-directory-tree').jstree(true).search($treeSearchField.val());
  }, 250);
}

/**
 * @return {void}
 */
function onTreeSaveOrderClick() {
  $treeUpdateProgressBar.removeClass('hidden');
  var jstreeData = $('#file-directory-tree').jstree(true).get_json();
  var params = {
    'file-directory-tree': {
      'file-directory': {
        id_file_directory: jstreeData[0].data.idFileDirectory
      },
      nodes: getFileDirectoryNodesRecursively(jstreeData[0])
    }
  };
  $.post(config.fileDirectoryTreeHierarchyUpdateUrl, params, function (response) {
    if (response.success) {
      reinitializeTree();
    }
    window.sweetAlert({
      title: response.success ? 'Success' : 'Error',
      text: response.message,
      type: response.success ? 'success' : 'error'
    });
    $treeOrderSaveBtn.attr('disabled', 'disabled');
  }).always(function () {
    $treeUpdateProgressBar.addClass('hidden');
  });
}
function reinitializeTree($tree) {
  var $tree = $('#file-directory-tree');
  $tree.jstree('destroy').empty();
  $tree.each(function () {
    for (var i = this.attributes.length - 1; i >= 0; i--) {
      if (this.attributes[i].name !== 'id') {
        $(this).removeAttr(this.attributes[i].name);
      }
    }
  });
  $.ajax({
    url: '/file-manager-gui/directories-tree/tree',
    type: 'GET',
    success: function (response) {
      $tree.html(response);
      initJsTree();
    },
    error: function (jqXHR, textStatus, errorThrown) {}
  });
}

/**
 * @param {Object} jstreeNode
 *
 * @returns {Array}
 */
function getFileDirectoryNodesRecursively(jstreeNode) {
  var nodes = [];
  $.each(jstreeNode.children, function (i, childNode) {
    var fileDirectoryNode = {
      file_directory: {
        id_file_directory: childNode.data.idFileDirectoryNode,
        position: i + 1
      },
      children: getFileDirectoryNodesRecursively(childNode)
    };
    nodes.push(fileDirectoryNode);
  });
  return nodes;
}

/**
 * Open public methods
 */
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/main.js":
/*!**************************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/main.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var fileDirectoryTree = __webpack_require__(/*! ./file-directory-tree */ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/file-directory-tree.js");
$(document).ready(function () {
  fileDirectoryTree.initialize();
});

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-file-directory.entry.js":
/*!*******************************************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-file-directory.entry.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/file-directory/main */ "./vendor/spryker/file-manager-gui/assets/Zed/js/modules/file-directory/main.js");
__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss");

/***/ }),

/***/ "./node_modules/jstree/dist/jstree.js":
/*!********************************************!*\
  !*** ./node_modules/jstree/dist/jstree.js ***!
  \********************************************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*globals jQuery, define, module, exports, require, window, document, postMessage */
(function (factory) {
	"use strict";
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else {}
}(function ($, undefined) {
	"use strict";
/*!
 * jsTree 3.3.12
 * http://jstree.com/
 *
 * Copyright (c) 2014 Ivan Bozhanov (http://vakata.com)
 *
 * Licensed same as jquery - under the terms of the MIT License
 *   http://www.opensource.org/licenses/mit-license.php
 */
/*!
 * if using jslint please allow for the jQuery global and use following options:
 * jslint: loopfunc: true, browser: true, ass: true, bitwise: true, continue: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, white: true
 */
/*jshint -W083 */

	// prevent another load? maybe there is a better way?
	if($.jstree) {
		return;
	}

	/**
	 * ### jsTree core functionality
	 */

	// internal variables
	var instance_counter = 0,
		ccp_node = false,
		ccp_mode = false,
		ccp_inst = false,
		themes_loaded = [],
		src = $('script:last').attr('src'),
		document = window.document; // local variable is always faster to access then a global

	var setImmediate = window.setImmediate;
	var Promise = window.Promise;
	if (!setImmediate && Promise) {
		// Good enough approximation of setImmediate
		setImmediate = function (cb, arg) {
			Promise.resolve(arg).then(cb);
		};
	}

	/**
	 * holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
	 * @name $.jstree
	 */
	$.jstree = {
		/**
		 * specifies the jstree version in use
		 * @name $.jstree.version
		 */
		version : '3.3.12',
		/**
		 * holds all the default options used when creating new instances
		 * @name $.jstree.defaults
		 */
		defaults : {
			/**
			 * configure which plugins will be active on an instance. Should be an array of strings, where each element is a plugin name. The default is `[]`
			 * @name $.jstree.defaults.plugins
			 */
			plugins : []
		},
		/**
		 * stores all loaded jstree plugins (used internally)
		 * @name $.jstree.plugins
		 */
		plugins : {},
		path : src && src.indexOf('/') !== -1 ? src.replace(/\/[^\/]+$/,'') : '',
		idregex : /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
		root : '#'
	};
	
	/**
	 * creates a jstree instance
	 * @name $.jstree.create(el [, options])
	 * @param {DOMElement|jQuery|String} el the element to create the instance on, can be jQuery extended or a selector
	 * @param {Object} options options for this instance (extends `$.jstree.defaults`)
	 * @return {jsTree} the new instance
	 */
	$.jstree.create = function (el, options) {
		var tmp = new $.jstree.core(++instance_counter),
			opt = options;
		options = $.extend(true, {}, $.jstree.defaults, options);
		if(opt && opt.plugins) {
			options.plugins = opt.plugins;
		}
		$.each(options.plugins, function (i, k) {
			if(i !== 'core') {
				tmp = tmp.plugin(k, options[k]);
			}
		});
		$(el).data('jstree', tmp);
		tmp.init(el, options);
		return tmp;
	};
	/**
	 * remove all traces of jstree from the DOM and destroy all instances
	 * @name $.jstree.destroy()
	 */
	$.jstree.destroy = function () {
		$('.jstree:jstree').jstree('destroy');
		$(document).off('.jstree');
	};
	/**
	 * the jstree class constructor, used only internally
	 * @private
	 * @name $.jstree.core(id)
	 * @param {Number} id this instance's index
	 */
	$.jstree.core = function (id) {
		this._id = id;
		this._cnt = 0;
		this._wrk = null;
		this._data = {
			core : {
				themes : {
					name : false,
					dots : false,
					icons : false,
					ellipsis : false
				},
				selected : [],
				last_error : {},
				working : false,
				worker_queue : [],
				focused : null
			}
		};
	};
	/**
	 * get a reference to an existing instance
	 *
	 * __Examples__
	 *
	 *	// provided a container with an ID of "tree", and a nested node with an ID of "branch"
	 *	// all of there will return the same instance
	 *	$.jstree.reference('tree');
	 *	$.jstree.reference('#tree');
	 *	$.jstree.reference($('#tree'));
	 *	$.jstree.reference(document.getElementByID('tree'));
	 *	$.jstree.reference('branch');
	 *	$.jstree.reference('#branch');
	 *	$.jstree.reference($('#branch'));
	 *	$.jstree.reference(document.getElementByID('branch'));
	 *
	 * @name $.jstree.reference(needle)
	 * @param {DOMElement|jQuery|String} needle
	 * @return {jsTree|null} the instance or `null` if not found
	 */
	$.jstree.reference = function (needle) {
		var tmp = null,
			obj = null;
		if(needle && needle.id && (!needle.tagName || !needle.nodeType)) { needle = needle.id; }

		if(!obj || !obj.length) {
			try { obj = $(needle); } catch (ignore) { }
		}
		if(!obj || !obj.length) {
			try { obj = $('#' + needle.replace($.jstree.idregex,'\\$&')); } catch (ignore) { }
		}
		if(obj && obj.length && (obj = obj.closest('.jstree')).length && (obj = obj.data('jstree'))) {
			tmp = obj;
		}
		else {
			$('.jstree').each(function () {
				var inst = $(this).data('jstree');
				if(inst && inst._model.data[needle]) {
					tmp = inst;
					return false;
				}
			});
		}
		return tmp;
	};
	/**
	 * Create an instance, get an instance or invoke a command on a instance.
	 *
	 * If there is no instance associated with the current node a new one is created and `arg` is used to extend `$.jstree.defaults` for this new instance. There would be no return value (chaining is not broken).
	 *
	 * If there is an existing instance and `arg` is a string the command specified by `arg` is executed on the instance, with any additional arguments passed to the function. If the function returns a value it will be returned (chaining could break depending on function).
	 *
	 * If there is an existing instance and `arg` is not a string the instance itself is returned (similar to `$.jstree.reference`).
	 *
	 * In any other case - nothing is returned and chaining is not broken.
	 *
	 * __Examples__
	 *
	 *	$('#tree1').jstree(); // creates an instance
	 *	$('#tree2').jstree({ plugins : [] }); // create an instance with some options
	 *	$('#tree1').jstree('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
	 *	$('#tree2').jstree(); // get an existing instance (or create an instance)
	 *	$('#tree2').jstree(true); // get an existing instance (will not create new instance)
	 *	$('#branch_1').jstree().select_node('#branch_1'); // get an instance (using a nested element and call a method)
	 *
	 * @name $().jstree([arg])
	 * @param {String|Object} arg
	 * @return {Mixed}
	 */
	$.fn.jstree = function (arg) {
		// check for string argument
		var is_method	= (typeof arg === 'string'),
			args		= Array.prototype.slice.call(arguments, 1),
			result		= null;
		if(arg === true && !this.length) { return false; }
		this.each(function () {
			// get the instance (if there is one) and method (if it exists)
			var instance = $.jstree.reference(this),
				method = is_method && instance ? instance[arg] : null;
			// if calling a method, and method is available - execute on the instance
			result = is_method && method ?
				method.apply(instance, args) :
				null;
			// if there is no instance and no method is being called - create one
			if(!instance && !is_method && (arg === undefined || $.isPlainObject(arg))) {
				$.jstree.create(this, arg);
			}
			// if there is an instance and no method is called - return the instance
			if( (instance && !is_method) || arg === true ) {
				result = instance || false;
			}
			// if there was a method call which returned a result - break and return the value
			if(result !== null && result !== undefined) {
				return false;
			}
		});
		// if there was a method call with a valid return value - return that, otherwise continue the chain
		return result !== null && result !== undefined ?
			result : this;
	};
	/**
	 * used to find elements containing an instance
	 *
	 * __Examples__
	 *
	 *	$('div:jstree').each(function () {
	 *		$(this).jstree('destroy');
	 *	});
	 *
	 * @name $(':jstree')
	 * @return {jQuery}
	 */
	$.expr.pseudos.jstree = $.expr.createPseudo(function(search) {
		return function(a) {
			return $(a).hasClass('jstree') &&
				$(a).data('jstree') !== undefined;
		};
	});

	/**
	 * stores all defaults for the core
	 * @name $.jstree.defaults.core
	 */
	$.jstree.defaults.core = {
		/**
		 * data configuration
		 *
		 * If left as `false` the HTML inside the jstree container element is used to populate the tree (that should be an unordered list with list items).
		 *
		 * You can also pass in a HTML string or a JSON array here.
		 *
		 * It is possible to pass in a standard jQuery-like AJAX config and jstree will automatically determine if the response is JSON or HTML and use that to populate the tree.
		 * In addition to the standard jQuery ajax options here you can supply functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node is being loaded, the return value of those functions will be used.
		 *
		 * The last option is to specify a function, that function will receive the node being loaded as argument and a second param which is a function which should be called with the result.
		 *
		 * __Examples__
		 *
		 *	// AJAX
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : {
		 *				'url' : '/get/children/',
		 *				'data' : function (node) {
		 *					return { 'id' : node.id };
		 *				}
		 *			}
		 *		});
		 *
		 *	// direct data
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : [
		 *				'Simple root node',
		 *				{
		 *					'id' : 'node_2',
		 *					'text' : 'Root node with options',
		 *					'state' : { 'opened' : true, 'selected' : true },
		 *					'children' : [ { 'text' : 'Child 1' }, 'Child 2']
		 *				}
		 *			]
		 *		}
		 *	});
		 *
		 *	// function
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : function (obj, callback) {
		 *				callback.call(this, ['Root 1', 'Root 2']);
		 *			}
		 *		});
		 *
		 * @name $.jstree.defaults.core.data
		 */
		data			: false,
		/**
		 * configure the various strings used throughout the tree
		 *
		 * You can use an object where the key is the string you need to replace and the value is your replacement.
		 * Another option is to specify a function which will be called with an argument of the needed string and should return the replacement.
		 * If left as `false` no replacement is made.
		 *
		 * __Examples__
		 *
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'strings' : {
		 *				'Loading ...' : 'Please wait ...'
		 *			}
		 *		}
		 *	});
		 *
		 * @name $.jstree.defaults.core.strings
		 */
		strings			: false,
		/**
		 * determines what happens when a user tries to modify the structure of the tree
		 * If left as `false` all operations like create, rename, delete, move or copy are prevented.
		 * You can set this to `true` to allow all interactions or use a function to have better control.
		 *
		 * __Examples__
		 *
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'check_callback' : function (operation, node, node_parent, node_position, more) {
		 *				// operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
		 *				// in case of 'rename_node' node_position is filled with the new node name
		 *				return operation === 'rename_node' ? true : false;
		 *			}
		 *		}
		 *	});
		 *
		 * @name $.jstree.defaults.core.check_callback
		 */
		check_callback	: false,
		/**
		 * a callback called with a single object parameter in the instance's scope when something goes wrong (operation prevented, ajax failed, etc)
		 * @name $.jstree.defaults.core.error
		 */
		error			: $.noop,
		/**
		 * the open / close animation duration in milliseconds - set this to `false` to disable the animation (default is `200`)
		 * @name $.jstree.defaults.core.animation
		 */
		animation		: 200,
		/**
		 * a boolean indicating if multiple nodes can be selected
		 * @name $.jstree.defaults.core.multiple
		 */
		multiple		: true,
		/**
		 * theme configuration object
		 * @name $.jstree.defaults.core.themes
		 */
		themes			: {
			/**
			 * the name of the theme to use (if left as `false` the default theme is used)
			 * @name $.jstree.defaults.core.themes.name
			 */
			name			: false,
			/**
			 * the URL of the theme's CSS file, leave this as `false` if you have manually included the theme CSS (recommended). You can set this to `true` too which will try to autoload the theme.
			 * @name $.jstree.defaults.core.themes.url
			 */
			url				: false,
			/**
			 * the location of all jstree themes - only used if `url` is set to `true`
			 * @name $.jstree.defaults.core.themes.dir
			 */
			dir				: false,
			/**
			 * a boolean indicating if connecting dots are shown
			 * @name $.jstree.defaults.core.themes.dots
			 */
			dots			: true,
			/**
			 * a boolean indicating if node icons are shown
			 * @name $.jstree.defaults.core.themes.icons
			 */
			icons			: true,
			/**
			 * a boolean indicating if node ellipsis should be shown - this only works with a fixed with on the container
			 * @name $.jstree.defaults.core.themes.ellipsis
			 */
			ellipsis		: false,
			/**
			 * a boolean indicating if the tree background is striped
			 * @name $.jstree.defaults.core.themes.stripes
			 */
			stripes			: false,
			/**
			 * a string (or boolean `false`) specifying the theme variant to use (if the theme supports variants)
			 * @name $.jstree.defaults.core.themes.variant
			 */
			variant			: false,
			/**
			 * a boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it). Defaults to `false`.
			 * @name $.jstree.defaults.core.themes.responsive
			 */
			responsive		: false
		},
		/**
		 * if left as `true` all parents of all selected nodes will be opened once the tree loads (so that all selected nodes are visible to the user)
		 * @name $.jstree.defaults.core.expand_selected_onload
		 */
		expand_selected_onload : true,
		/**
		 * if left as `true` web workers will be used to parse incoming JSON data where possible, so that the UI will not be blocked by large requests. Workers are however about 30% slower. Defaults to `true`
		 * @name $.jstree.defaults.core.worker
		 */
		worker : true,
		/**
		 * Force node text to plain text (and escape HTML). Defaults to `false`
		 * @name $.jstree.defaults.core.force_text
		 */
		force_text : false,
		/**
		 * Should the node be toggled if the text is double clicked. Defaults to `true`
		 * @name $.jstree.defaults.core.dblclick_toggle
		 */
		dblclick_toggle : true,
		/**
		 * Should the loaded nodes be part of the state. Defaults to `false`
		 * @name $.jstree.defaults.core.loaded_state
		 */
		loaded_state : false,
		/**
		 * Should the last active node be focused when the tree container is blurred and the focused again. This helps working with screen readers. Defaults to `true`
		 * @name $.jstree.defaults.core.restore_focus
		 */
		restore_focus : true,
		/**
		 * Force to compute and set "aria-setsize" and "aria-posinset" explicitly for each treeitem. 
		 * Some browsers may compute incorrect elements position and produce wrong announcements for screen readers. Defaults to `false`
		 * @name $.jstree.defaults.core.compute_elements_positions
		 */
		compute_elements_positions : false,
		/**
		 * Default keyboard shortcuts (an object where each key is the button name or combo - like 'enter', 'ctrl-space', 'p', etc and the value is the function to execute in the instance's scope)
		 * @name $.jstree.defaults.core.keyboard
		 */
		keyboard : {
			'ctrl-space': function (e) {
				// aria defines space only with Ctrl
				e.type = "click";
				$(e.currentTarget).trigger(e);
			},
			'enter': function (e) {
				// enter
				e.type = "click";
				$(e.currentTarget).trigger(e);
			},
			'left': function (e) {
				// left
				e.preventDefault();
				if(this.is_open(e.currentTarget)) {
					this.close_node(e.currentTarget);
				}
				else {
					var o = this.get_parent(e.currentTarget);
					if(o && o.id !== $.jstree.root) { this.get_node(o, true).children('.jstree-anchor').trigger('focus'); }
				}
			},
			'up': function (e) {
				// up
				e.preventDefault();
				var o = this.get_prev_dom(e.currentTarget);
				if(o && o.length) { o.children('.jstree-anchor').trigger('focus'); }
			},
			'right': function (e) {
				// right
				e.preventDefault();
				if(this.is_closed(e.currentTarget)) {
					this.open_node(e.currentTarget, function (o) { this.get_node(o, true).children('.jstree-anchor').trigger('focus'); });
				}
				else if (this.is_open(e.currentTarget)) {
					var o = this.get_node(e.currentTarget, true).children('.jstree-children')[0];
					if(o) { $(this._firstChild(o)).children('.jstree-anchor').trigger('focus'); }
				}
			},
			'down': function (e) {
				// down
				e.preventDefault();
				var o = this.get_next_dom(e.currentTarget);
				if(o && o.length) { o.children('.jstree-anchor').trigger('focus'); }
			},
			'*': function (e) {
				// aria defines * on numpad as open_all - not very common
				this.open_all();
			},
			'home': function (e) {
				// home
				e.preventDefault();
				var o = this._firstChild(this.get_container_ul()[0]);
				if(o) { $(o).children('.jstree-anchor').filter(':visible').trigger('focus'); }
			},
			'end': function (e) {
				// end
				e.preventDefault();
				this.element.find('.jstree-anchor').filter(':visible').last().trigger('focus');
			},
			'f2': function (e) {
				// f2 - safe to include - if check_callback is false it will fail
				e.preventDefault();
				this.edit(e.currentTarget);
			}
		}
	};
	$.jstree.core.prototype = {
		/**
		 * used to decorate an instance with a plugin. Used internally.
		 * @private
		 * @name plugin(deco [, opts])
		 * @param  {String} deco the plugin to decorate with
		 * @param  {Object} opts options for the plugin
		 * @return {jsTree}
		 */
		plugin : function (deco, opts) {
			var Child = $.jstree.plugins[deco];
			if(Child) {
				this._data[deco] = {};
				Child.prototype = this;
				return new Child(opts, this);
			}
			return this;
		},
		/**
		 * initialize the instance. Used internally.
		 * @private
		 * @name init(el, optons)
		 * @param {DOMElement|jQuery|String} el the element we are transforming
		 * @param {Object} options options for this instance
		 * @trigger init.jstree, loading.jstree, loaded.jstree, ready.jstree, changed.jstree
		 */
		init : function (el, options) {
			this._model = {
				data : {},
				changed : [],
				force_full_redraw : false,
				redraw_timeout : false,
				default_state : {
					loaded : true,
					opened : false,
					selected : false,
					disabled : false
				}
			};
			this._model.data[$.jstree.root] = {
				id : $.jstree.root,
				parent : null,
				parents : [],
				children : [],
				children_d : [],
				state : { loaded : false }
			};

			this.element = $(el).addClass('jstree jstree-' + this._id);
			this.settings = options;

			this._data.core.ready = false;
			this._data.core.loaded = false;
			this._data.core.rtl = (this.element.css("direction") === "rtl");
			this.element[this._data.core.rtl ? 'addClass' : 'removeClass']("jstree-rtl");
			this.element.attr('role','tree');
			if(this.settings.core.multiple) {
				this.element.attr('aria-multiselectable', true);
			}
			if(!this.element.attr('tabindex')) {
				this.element.attr('tabindex','0');
			}

			this.bind();
			/**
			 * triggered after all events are bound
			 * @event
			 * @name init.jstree
			 */
			this.trigger("init");

			this._data.core.original_container_html = this.element.find(" > ul > li").clone(true);
			this._data.core.original_container_html
				.find("li").addBack()
				.contents().filter(function() {
					return this.nodeType === 3 && (!this.nodeValue || /^\s+$/.test(this.nodeValue));
				})
				.remove();
			this.element.html("<"+"ul class='jstree-container-ul jstree-children' role='group'><"+"li id='j"+this._id+"_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='none'><i class='jstree-icon jstree-ocl'></i><"+"a class='jstree-anchor' role='treeitem' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
			this.element.attr('aria-activedescendant','j' + this._id + '_loading');
			this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24;
			this._data.core.node = this._create_prototype_node();
			/**
			 * triggered after the loading text is shown and before loading starts
			 * @event
			 * @name loading.jstree
			 */
			this.trigger("loading");
			this.load_node($.jstree.root);
		},
		/**
		 * destroy an instance
		 * @name destroy()
		 * @param  {Boolean} keep_html if not set to `true` the container will be emptied, otherwise the current DOM elements will be kept intact
		 */
		destroy : function (keep_html) {
			/**
			 * triggered before the tree is destroyed
			 * @event
			 * @name destroy.jstree
			 */
			this.trigger("destroy");
			if(this._wrk) {
				try {
					window.URL.revokeObjectURL(this._wrk);
					this._wrk = null;
				}
				catch (ignore) { }
			}
			if(!keep_html) { this.element.empty(); }
			this.teardown();
		},
		/**
		 * Create a prototype node
		 * @name _create_prototype_node()
		 * @return {DOMElement}
		 */
		_create_prototype_node : function () {
			var _node = document.createElement('LI'), _temp1, _temp2;
			_node.setAttribute('role', 'none');
			_temp1 = document.createElement('I');
			_temp1.className = 'jstree-icon jstree-ocl';
			_temp1.setAttribute('role', 'presentation');
			_node.appendChild(_temp1);
			_temp1 = document.createElement('A');
			_temp1.className = 'jstree-anchor';
			_temp1.setAttribute('href','#');
			_temp1.setAttribute('tabindex','-1');
			_temp1.setAttribute('role', 'treeitem');
			_temp2 = document.createElement('I');
			_temp2.className = 'jstree-icon jstree-themeicon';
			_temp2.setAttribute('role', 'presentation');
			_temp1.appendChild(_temp2);
			_node.appendChild(_temp1);
			_temp1 = _temp2 = null;

			return _node;
		},
		_kbevent_to_func : function (e) {
			var keys = {
				8: "Backspace", 9: "Tab", 13: "Enter", 19: "Pause", 27: "Esc",
				32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home",
				37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "Print", 45: "Insert",
				46: "Delete", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99 : "Numpad3",
				100: "Numpad4", 101: "Numpad5", 102: "Numpad6", 103: "Numpad7",
				104: "Numpad8", 105: "Numpad9", '-13': "NumpadEnter", 112: "F1",
				113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7",
				119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock",
				145: "Scrolllock", 16: 'Shift', 17: 'Ctrl', 18: 'Alt',
				48: '0',  49: '1',  50: '2',  51: '3',  52: '4', 53:  '5',
				54: '6',  55: '7',  56: '8',  57: '9',  59: ';',  61: '=', 65:  'a',
				66: 'b',  67: 'c',  68: 'd',  69: 'e',  70: 'f',  71: 'g', 72:  'h',
				73: 'i',  74: 'j',  75: 'k',  76: 'l',  77: 'm',  78: 'n', 79:  'o',
				80: 'p',  81: 'q',  82: 'r',  83: 's',  84: 't',  85: 'u', 86:  'v',
				87: 'w',  88: 'x',  89: 'y',  90: 'z', 107: '+', 109: '-', 110: '.',
				186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`',
				219: '[', 220: '\\',221: ']', 222: "'", 111: '/', 106: '*', 173: '-'
			};
			var parts = [];
			if (e.ctrlKey) { parts.push('ctrl'); }
			if (e.altKey) { parts.push('alt'); }
            if (e.shiftKey) { parts.push('shift'); }
			parts.push(keys[e.which] || e.which);
            parts = parts.sort().join('-').toLowerCase();
            if (parts === 'shift-shift' || parts === 'ctrl-ctrl' || parts === 'alt-alt') {
                return null;
            }

			var kb = this.settings.core.keyboard, i, tmp;
			for (i in kb) {
				if (kb.hasOwnProperty(i)) {
					tmp = i;
					if (tmp !== '-' && tmp !== '+') {
						tmp = tmp.replace('--', '-MINUS').replace('+-', '-MINUS').replace('++', '-PLUS').replace('-+', '-PLUS');
						tmp = tmp.split(/-|\+/).sort().join('-').replace('MINUS', '-').replace('PLUS', '+').toLowerCase();
					}
					if (tmp === parts) {
						return kb[i];
					}
				}
			}
			return null;
		},
		/**
		 * part of the destroying of an instance. Used internally.
		 * @private
		 * @name teardown()
		 */
		teardown : function () {
			this.unbind();
			this.element
				.removeClass('jstree')
				.removeData('jstree')
				.find("[class^='jstree']")
					.addBack()
					.attr("class", function () { return this.className.replace(/jstree[^ ]*|$/ig,''); });
			this.element = null;
		},
		/**
		 * bind all events. Used internally.
		 * @private
		 * @name bind()
		 */
		bind : function () {
			var word = '',
				tout = null,
				was_click = 0;
			this.element
				.on("dblclick.jstree", function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(document.selection && document.selection.empty) {
							document.selection.empty();
						}
						else {
							if(window.getSelection) {
								var sel = window.getSelection();
								try {
									sel.removeAllRanges();
									sel.collapse();
								} catch (ignore) { }
							}
						}
					})
				.on("mousedown.jstree", function (e) {
						if(e.target === this.element[0]) {
							e.preventDefault(); // prevent losing focus when clicking scroll arrows (FF, Chrome)
							was_click = +(new Date()); // ie does not allow to prevent losing focus
						}
					}.bind(this))
				.on("mousedown.jstree", ".jstree-ocl", function (e) {
						e.preventDefault(); // prevent any node inside from losing focus when clicking the open/close icon
					})
				.on("click.jstree", ".jstree-ocl", function (e) {
						this.toggle_node(e.target);
					}.bind(this))
				.on("dblclick.jstree", ".jstree-anchor", function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(this.settings.core.dblclick_toggle) {
							this.toggle_node(e.target);
						}
					}.bind(this))
				.on("click.jstree", ".jstree-anchor", function (e) {
						e.preventDefault();
						if(e.currentTarget !== document.activeElement) { $(e.currentTarget).trigger('focus'); }
						this.activate_node(e.currentTarget, e);
					}.bind(this))
				.on('keydown.jstree', '.jstree-anchor', function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(this._data.core.rtl) {
							if(e.which === 37) { e.which = 39; }
							else if(e.which === 39) { e.which = 37; }
						}
						var f = this._kbevent_to_func(e);
						if (f) {
							var r = f.call(this, e);
							if (r === false || r === true) {
								return r;
							}
						}
					}.bind(this))
				.on("load_node.jstree", function (e, data) {
						if(data.status) {
							if(data.node.id === $.jstree.root && !this._data.core.loaded) {
								this._data.core.loaded = true;
								if(this._firstChild(this.get_container_ul()[0])) {
									this.element.attr('aria-activedescendant',this._firstChild(this.get_container_ul()[0]).id);
								}
								/**
								 * triggered after the root node is loaded for the first time
								 * @event
								 * @name loaded.jstree
								 */
								this.trigger("loaded");
							}
							if(!this._data.core.ready) {
								setTimeout(function() {
									if(this.element && !this.get_container_ul().find('.jstree-loading').length) {
										this._data.core.ready = true;
										if(this._data.core.selected.length) {
											if(this.settings.core.expand_selected_onload) {
												var tmp = [], i, j;
												for(i = 0, j = this._data.core.selected.length; i < j; i++) {
													tmp = tmp.concat(this._model.data[this._data.core.selected[i]].parents);
												}
												tmp = $.vakata.array_unique(tmp);
												for(i = 0, j = tmp.length; i < j; i++) {
													this.open_node(tmp[i], false, 0);
												}
											}
											this.trigger('changed', { 'action' : 'ready', 'selected' : this._data.core.selected });
										}
										/**
										 * triggered after all nodes are finished loading
										 * @event
										 * @name ready.jstree
										 */
										this.trigger("ready");
									}
								}.bind(this), 0);
							}
						}
					}.bind(this))
				// quick searching when the tree is focused
				.on('keypress.jstree', function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(tout) { clearTimeout(tout); }
						tout = setTimeout(function () {
							word = '';
						}, 500);

						var chr = String.fromCharCode(e.which).toLowerCase(),
							col = this.element.find('.jstree-anchor').filter(':visible'),
							ind = col.index(document.activeElement) || 0,
							end = false;
						word += chr;

						// match for whole word from current node down (including the current node)
						if(word.length > 1) {
							col.slice(ind).each(function (i, v) {
								if($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).trigger('focus');
									end = true;
									return false;
								}
							}.bind(this));
							if(end) { return; }

							// match for whole word from the beginning of the tree
							col.slice(0, ind).each(function (i, v) {
								if($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).trigger('focus');
									end = true;
									return false;
								}
							}.bind(this));
							if(end) { return; }
						}
						// list nodes that start with that letter (only if word consists of a single char)
						if(new RegExp('^' + chr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '+$').test(word)) {
							// search for the next node starting with that letter
							col.slice(ind + 1).each(function (i, v) {
								if($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).trigger('focus');
									end = true;
									return false;
								}
							}.bind(this));
							if(end) { return; }

							// search from the beginning
							col.slice(0, ind + 1).each(function (i, v) {
								if($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).trigger('focus');
									end = true;
									return false;
								}
							}.bind(this));
							if(end) { return; }
						}
					}.bind(this))
				// THEME RELATED
				.on("init.jstree", function () {
						var s = this.settings.core.themes;
						this._data.core.themes.dots			= s.dots;
						this._data.core.themes.stripes		= s.stripes;
						this._data.core.themes.icons		= s.icons;
						this._data.core.themes.ellipsis		= s.ellipsis;
						this.set_theme(s.name || "default", s.url);
						this.set_theme_variant(s.variant);
					}.bind(this))
				.on("loading.jstree", function () {
						this[ this._data.core.themes.dots ? "show_dots" : "hide_dots" ]();
						this[ this._data.core.themes.icons ? "show_icons" : "hide_icons" ]();
						this[ this._data.core.themes.stripes ? "show_stripes" : "hide_stripes" ]();
						this[ this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis" ]();
					}.bind(this))
				.on('blur.jstree', '.jstree-anchor', function (e) {
						this._data.core.focused = null;
						$(e.currentTarget).filter('.jstree-hovered').trigger('mouseleave');
						this.element.attr('tabindex', '0');
					}.bind(this))
				.on('focus.jstree', '.jstree-anchor', function (e) {
						var tmp = this.get_node(e.currentTarget);
						if(tmp && tmp.id) {
							this._data.core.focused = tmp.id;
						}
						this.element.find('.jstree-hovered').not(e.currentTarget).trigger('mouseleave');
						$(e.currentTarget).trigger('mouseenter');
						this.element.attr('tabindex', '-1');
					}.bind(this))
				.on('focus.jstree', function () {
						if(+(new Date()) - was_click > 500 && !this._data.core.focused && this.settings.core.restore_focus) {
							was_click = 0;
							var act = this.get_node(this.element.attr('aria-activedescendant'), true);
							if(act) {
								act.find('> .jstree-anchor').trigger('focus');
							}
						}
					}.bind(this))
				.on('mouseenter.jstree', '.jstree-anchor', function (e) {
						this.hover_node(e.currentTarget);
					}.bind(this))
				.on('mouseleave.jstree', '.jstree-anchor', function (e) {
						this.dehover_node(e.currentTarget);
					}.bind(this));
		},
		/**
		 * part of the destroying of an instance. Used internally.
		 * @private
		 * @name unbind()
		 */
		unbind : function () {
			this.element.off('.jstree');
			$(document).off('.jstree-' + this._id);
		},
		/**
		 * trigger an event. Used internally.
		 * @private
		 * @name trigger(ev [, data])
		 * @param  {String} ev the name of the event to trigger
		 * @param  {Object} data additional data to pass with the event
		 */
		trigger : function (ev, data) {
			if(!data) {
				data = {};
			}
			data.instance = this;
			this.element.triggerHandler(ev.replace('.jstree','') + '.jstree', data);
		},
		/**
		 * returns the jQuery extended instance container
		 * @name get_container()
		 * @return {jQuery}
		 */
		get_container : function () {
			return this.element;
		},
		/**
		 * returns the jQuery extended main UL node inside the instance container. Used internally.
		 * @private
		 * @name get_container_ul()
		 * @return {jQuery}
		 */
		get_container_ul : function () {
			return this.element.children(".jstree-children").first();
		},
		/**
		 * gets string replacements (localization). Used internally.
		 * @private
		 * @name get_string(key)
		 * @param  {String} key
		 * @return {String}
		 */
		get_string : function (key) {
			var a = this.settings.core.strings;
			if($.vakata.is_function(a)) { return a.call(this, key); }
			if(a && a[key]) { return a[key]; }
			return key;
		},
		/**
		 * gets the first child of a DOM node. Used internally.
		 * @private
		 * @name _firstChild(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_firstChild : function (dom) {
			dom = dom ? dom.firstChild : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
		 * gets the next sibling of a DOM node. Used internally.
		 * @private
		 * @name _nextSibling(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_nextSibling : function (dom) {
			dom = dom ? dom.nextSibling : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
		 * gets the previous sibling of a DOM node. Used internally.
		 * @private
		 * @name _previousSibling(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_previousSibling : function (dom) {
			dom = dom ? dom.previousSibling : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.previousSibling;
			}
			return dom;
		},
		/**
		 * get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc)
		 * @name get_node(obj [, as_dom])
		 * @param  {mixed} obj
		 * @param  {Boolean} as_dom
		 * @return {Object|jQuery}
		 */
		get_node : function (obj, as_dom) {
			if(obj && obj.id) {
				obj = obj.id;
			}
			if (obj instanceof $ && obj.length && obj[0].id) {
				obj = obj[0].id;
			}
			var dom;
			try {
				if(this._model.data[obj]) {
					obj = this._model.data[obj];
				}
				else if(typeof obj === "string" && this._model.data[obj.replace(/^#/, '')]) {
					obj = this._model.data[obj.replace(/^#/, '')];
				}
				else if(typeof obj === "string" && (dom = $('#' + obj.replace($.jstree.idregex,'\\$&'), this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				}
				else if((dom = this.element.find(obj)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				}
				else if((dom = this.element.find(obj)).length && dom.hasClass('jstree')) {
					obj = this._model.data[$.jstree.root];
				}
				else {
					return false;
				}

				if(as_dom) {
					obj = obj.id === $.jstree.root ? this.element : $('#' + obj.id.replace($.jstree.idregex,'\\$&'), this.element);
				}
				return obj;
			} catch (ex) { return false; }
		},
		/**
		 * get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array)
		 * @name get_path(obj [, glue, ids])
		 * @param  {mixed} obj the node
		 * @param  {String} glue if you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned
		 * @param  {Boolean} ids if set to true build the path using ID, otherwise node text is used
		 * @return {mixed}
		 */
		get_path : function (obj, glue, ids) {
			obj = obj.parents ? obj : this.get_node(obj);
			if(!obj || obj.id === $.jstree.root || !obj.parents) {
				return false;
			}
			var i, j, p = [];
			p.push(ids ? obj.id : obj.text);
			for(i = 0, j = obj.parents.length; i < j; i++) {
				p.push(ids ? obj.parents[i] : this.get_text(obj.parents[i]));
			}
			p = p.reverse().slice(1);
			return glue ? p.join(glue) : p;
		},
		/**
		 * get the next visible node that is below the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
		 * @name get_next_dom(obj [, strict])
		 * @param  {mixed} obj
		 * @param  {Boolean} strict
		 * @return {jQuery}
		 */
		get_next_dom : function (obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				tmp = this._firstChild(this.get_container_ul()[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if(!obj || !obj.length) {
				return false;
			}
			if(strict) {
				tmp = obj[0];
				do {
					tmp = this._nextSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			if(obj.hasClass("jstree-open")) {
				tmp = this._firstChild(obj.children('.jstree-children')[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				if(tmp !== null) {
					return $(tmp);
				}
			}
			tmp = obj[0];
			do {
				tmp = this._nextSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if(tmp !== null) {
				return $(tmp);
			}
			return obj.parentsUntil(".jstree",".jstree-node").nextAll(".jstree-node:visible").first();
		},
		/**
		 * get the previous visible node that is above the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
		 * @name get_prev_dom(obj [, strict])
		 * @param  {mixed} obj
		 * @param  {Boolean} strict
		 * @return {jQuery}
		 */
		get_prev_dom : function (obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				tmp = this.get_container_ul()[0].lastChild;
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._previousSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if(!obj || !obj.length) {
				return false;
			}
			if(strict) {
				tmp = obj[0];
				do {
					tmp = this._previousSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			tmp = obj[0];
			do {
				tmp = this._previousSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if(tmp !== null) {
				obj = $(tmp);
				while(obj.hasClass("jstree-open")) {
					obj = obj.children(".jstree-children").first().children(".jstree-node:visible:last");
				}
				return obj;
			}
			tmp = obj[0].parentNode.parentNode;
			return tmp && tmp.className && tmp.className.indexOf('jstree-node') !== -1 ? $(tmp) : false;
		},
		/**
		 * get the parent ID of a node
		 * @name get_parent(obj)
		 * @param  {mixed} obj
		 * @return {String}
		 */
		get_parent : function (obj) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.parent;
		},
		/**
		 * get a jQuery collection of all the children of a node (node must be rendered), returns false on error
		 * @name get_children_dom(obj)
		 * @param  {mixed} obj
		 * @return {jQuery}
		 */
		get_children_dom : function (obj) {
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				return this.get_container_ul().children(".jstree-node");
			}
			if(!obj || !obj.length) {
				return false;
			}
			return obj.children(".jstree-children").children(".jstree-node");
		},
		/**
		 * checks if a node has children
		 * @name is_parent(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_parent : function (obj) {
			obj = this.get_node(obj);
			return obj && (obj.state.loaded === false || obj.children.length > 0);
		},
		/**
		 * checks if a node is loaded (its children are available)
		 * @name is_loaded(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_loaded : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state.loaded;
		},
		/**
		 * check if a node is currently loading (fetching children)
		 * @name is_loading(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_loading : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state && obj.state.loading;
		},
		/**
		 * check if a node is opened
		 * @name is_open(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_open : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state.opened;
		},
		/**
		 * check if a node is in a closed state
		 * @name is_closed(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_closed : function (obj) {
			obj = this.get_node(obj);
			return obj && this.is_parent(obj) && !obj.state.opened;
		},
		/**
		 * check if a node has no children
		 * @name is_leaf(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_leaf : function (obj) {
			return !this.is_parent(obj);
		},
		/**
		 * loads a node (fetches its children using the `core.data` setting). Multiple nodes can be passed to by using an array.
		 * @name load_node(obj [, callback])
		 * @param  {mixed} obj
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives two arguments - the node and a boolean status
		 * @return {Boolean}
		 * @trigger load_node.jstree
		 */
		load_node : function (obj, callback) {
			var k, l, i, j, c;
			if($.vakata.is_array(obj)) {
				this._load_nodes(obj.slice(), callback);
				return true;
			}
			obj = this.get_node(obj);
			if(!obj) {
				if(callback) { callback.call(this, obj, false); }
				return false;
			}
			// if(obj.state.loading) { } // the node is already loading - just wait for it to load and invoke callback? but if called implicitly it should be loaded again?
			if(obj.state.loaded) {
				obj.state.loaded = false;
				for(i = 0, j = obj.parents.length; i < j; i++) {
					this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				for(k = 0, l = obj.children_d.length; k < l; k++) {
					if(this._model.data[obj.children_d[k]].state.selected) {
						c = true;
					}
					delete this._model.data[obj.children_d[k]];
				}
				if (c) {
					this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				obj.children = [];
				obj.children_d = [];
				if(c) {
					this.trigger('changed', { 'action' : 'load_node', 'node' : obj, 'selected' : this._data.core.selected });
				}
			}
			obj.state.failed = false;
			obj.state.loading = true;
			this.get_node(obj, true).addClass("jstree-loading").attr('aria-busy',true);
			this._load_node(obj, function (status) {
				obj = this._model.data[obj.id];
				obj.state.loading = false;
				obj.state.loaded = status;
				obj.state.failed = !obj.state.loaded;
				var dom = this.get_node(obj, true), i = 0, j = 0, m = this._model.data, has_children = false;
				for(i = 0, j = obj.children.length; i < j; i++) {
					if(m[obj.children[i]] && !m[obj.children[i]].state.hidden) {
						has_children = true;
						break;
					}
				}
				if(obj.state.loaded && dom && dom.length) {
					dom.removeClass('jstree-closed jstree-open jstree-leaf');
					if (!has_children) {
						dom.addClass('jstree-leaf');
					}
					else {
						if (obj.id !== '#') {
							dom.addClass(obj.state.opened ? 'jstree-open' : 'jstree-closed');
						}
					}
				}
				dom.removeClass("jstree-loading").attr('aria-busy',false);
				/**
				 * triggered after a node is loaded
				 * @event
				 * @name load_node.jstree
				 * @param {Object} node the node that was loading
				 * @param {Boolean} status was the node loaded successfully
				 */
				this.trigger('load_node', { "node" : obj, "status" : status });
				if(callback) {
					callback.call(this, obj, status);
				}
			}.bind(this));
			return true;
		},
		/**
		 * load an array of nodes (will also load unavailable nodes as soon as they appear in the structure). Used internally.
		 * @private
		 * @name _load_nodes(nodes [, callback])
		 * @param  {array} nodes
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - the array passed to _load_nodes
		 */
		_load_nodes : function (nodes, callback, is_callback, force_reload) {
			var r = true,
				c = function () { this._load_nodes(nodes, callback, true); },
				m = this._model.data, i, j, tmp = [];
			for(i = 0, j = nodes.length; i < j; i++) {
				if(m[nodes[i]] && ( (!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || (!is_callback && force_reload) )) {
					if(!this.is_loading(nodes[i])) {
						this.load_node(nodes[i], c);
					}
					r = false;
				}
			}
			if(r) {
				for(i = 0, j = nodes.length; i < j; i++) {
					if(m[nodes[i]] && m[nodes[i]].state.loaded) {
						tmp.push(nodes[i]);
					}
				}
				if(callback && !callback.done) {
					callback.call(this, tmp);
					callback.done = true;
				}
			}
		},
		/**
		 * loads all unloaded nodes
		 * @name load_all([obj, callback])
		 * @param {mixed} obj the node to load recursively, omit to load all nodes in the tree
		 * @param {function} callback a function to be executed once loading all the nodes is complete,
		 * @trigger load_all.jstree
		 */
		load_all : function (obj, callback) {
			if(!obj) { obj = $.jstree.root; }
			obj = this.get_node(obj);
			if(!obj) { return false; }
			var to_load = [],
				m = this._model.data,
				c = m[obj.id].children_d,
				i, j;
			if(obj.state && !obj.state.loaded) {
				to_load.push(obj.id);
			}
			for(i = 0, j = c.length; i < j; i++) {
				if(m[c[i]] && m[c[i]].state && !m[c[i]].state.loaded) {
					to_load.push(c[i]);
				}
			}
			if(to_load.length) {
				this._load_nodes(to_load, function () {
					this.load_all(obj, callback);
				});
			}
			else {
				/**
				 * triggered after a load_all call completes
				 * @event
				 * @name load_all.jstree
				 * @param {Object} node the recursively loaded node
				 */
				if(callback) { callback.call(this, obj); }
				this.trigger('load_all', { "node" : obj });
			}
		},
		/**
		 * handles the actual loading of a node. Used only internally.
		 * @private
		 * @name _load_node(obj [, callback])
		 * @param  {mixed} obj
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - a boolean status
		 * @return {Boolean}
		 */
		_load_node : function (obj, callback) {
			var s = this.settings.core.data, t;
			var notTextOrCommentNode = function notTextOrCommentNode () {
				return this.nodeType !== 3 && this.nodeType !== 8;
			};
			// use original HTML
			if(!s) {
				if(obj.id === $.jstree.root) {
					return this._append_html_data(obj, this._data.core.original_container_html.clone(true), function (status) {
						callback.call(this, status);
					});
				}
				else {
					return callback.call(this, false);
				}
				// return callback.call(this, obj.id === $.jstree.root ? this._append_html_data(obj, this._data.core.original_container_html.clone(true)) : false);
			}
			if($.vakata.is_function(s)) {
				return s.call(this, obj, function (d) {
					if(d === false) {
						callback.call(this, false);
					}
					else {
						this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $($.parseHTML(d)).filter(notTextOrCommentNode) : d, function (status) {
							callback.call(this, status);
						});
					}
					// return d === false ? callback.call(this, false) : callback.call(this, this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $(d) : d));
				}.bind(this));
			}
			if(typeof s === 'object') {
				if(s.url) {
					s = $.extend(true, {}, s);
					if($.vakata.is_function(s.url)) {
						s.url = s.url.call(this, obj);
					}
					if($.vakata.is_function(s.data)) {
						s.data = s.data.call(this, obj);
					}
					return $.ajax(s)
						.done(function (d,t,x) {
								var type = x.getResponseHeader('Content-Type');
								if((type && type.indexOf('json') !== -1) || typeof d === "object") {
									return this._append_json_data(obj, d, function (status) { callback.call(this, status); });
									//return callback.call(this, this._append_json_data(obj, d));
								}
								if((type && type.indexOf('html') !== -1) || typeof d === "string") {
									return this._append_html_data(obj, $($.parseHTML(d)).filter(notTextOrCommentNode), function (status) { callback.call(this, status); });
									// return callback.call(this, this._append_html_data(obj, $(d)));
								}
								this._data.core.last_error = { 'error' : 'ajax', 'plugin' : 'core', 'id' : 'core_04', 'reason' : 'Could not load node', 'data' : JSON.stringify({ 'id' : obj.id, 'xhr' : x }) };
								this.settings.core.error.call(this, this._data.core.last_error);
								return callback.call(this, false);
							}.bind(this))
						.fail(function (f) {
								this._data.core.last_error = { 'error' : 'ajax', 'plugin' : 'core', 'id' : 'core_04', 'reason' : 'Could not load node', 'data' : JSON.stringify({ 'id' : obj.id, 'xhr' : f }) };
								callback.call(this, false);
								this.settings.core.error.call(this, this._data.core.last_error);
							}.bind(this));
				}
				if ($.vakata.is_array(s)) {
					t = $.extend(true, [], s);
				} else if ($.isPlainObject(s)) {
					t = $.extend(true, {}, s);
				} else {
					t = s;
				}
				if(obj.id === $.jstree.root) {
					return this._append_json_data(obj, t, function (status) {
						callback.call(this, status);
					});
				}
				else {
					this._data.core.last_error = { 'error' : 'nodata', 'plugin' : 'core', 'id' : 'core_05', 'reason' : 'Could not load node', 'data' : JSON.stringify({ 'id' : obj.id }) };
					this.settings.core.error.call(this, this._data.core.last_error);
					return callback.call(this, false);
				}
				//return callback.call(this, (obj.id === $.jstree.root ? this._append_json_data(obj, t) : false) );
			}
			if(typeof s === 'string') {
				if(obj.id === $.jstree.root) {
					return this._append_html_data(obj, $($.parseHTML(s)).filter(notTextOrCommentNode), function (status) {
						callback.call(this, status);
					});
				}
				else {
					this._data.core.last_error = { 'error' : 'nodata', 'plugin' : 'core', 'id' : 'core_06', 'reason' : 'Could not load node', 'data' : JSON.stringify({ 'id' : obj.id }) };
					this.settings.core.error.call(this, this._data.core.last_error);
					return callback.call(this, false);
				}
				//return callback.call(this, (obj.id === $.jstree.root ? this._append_html_data(obj, $(s)) : false) );
			}
			return callback.call(this, false);
		},
		/**
		 * adds a node to the list of nodes to redraw. Used only internally.
		 * @private
		 * @name _node_changed(obj [, callback])
		 * @param  {mixed} obj
		 */
		_node_changed : function (obj) {
			obj = this.get_node(obj);
      if (obj && $.inArray(obj.id, this._model.changed) === -1) {
				this._model.changed.push(obj.id);
			}
		},
		/**
		 * appends HTML content to the tree. Used internally.
		 * @private
		 * @name _append_html_data(obj, data)
		 * @param  {mixed} obj the node to append to
		 * @param  {String} data the HTML string to parse and append
		 * @trigger model.jstree, changed.jstree
		 */
		_append_html_data : function (dom, data, cb) {
			dom = this.get_node(dom);
			dom.children = [];
			dom.children_d = [];
			var dat = data.is('ul') ? data.children() : data,
				par = dom.id,
				chd = [],
				dpc = [],
				m = this._model.data,
				p = m[par],
				s = this._data.core.selected.length,
				tmp, i, j;
			dat.each(function (i, v) {
				tmp = this._parse_model_from_html($(v), par, p.parents.concat());
				if(tmp) {
					chd.push(tmp);
					dpc.push(tmp);
					if(m[tmp].children_d.length) {
						dpc = dpc.concat(m[tmp].children_d);
					}
				}
			}.bind(this));
			p.children = chd;
			p.children_d = dpc;
			for(i = 0, j = p.parents.length; i < j; i++) {
				m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
			}
			/**
			 * triggered when new data is inserted to the tree model
			 * @event
			 * @name model.jstree
			 * @param {Array} nodes an array of node IDs
			 * @param {String} parent the parent ID of the nodes
			 */
			this.trigger('model', { "nodes" : dpc, 'parent' : par });
			if(par !== $.jstree.root) {
				this._node_changed(par);
				this.redraw();
			}
			else {
				this.get_container_ul().children('.jstree-initial-node').remove();
				this.redraw(true);
			}
			if(this._data.core.selected.length !== s) {
				this.trigger('changed', { 'action' : 'model', 'selected' : this._data.core.selected });
			}
			cb.call(this, true);
		},
		/**
		 * appends JSON content to the tree. Used internally.
		 * @private
		 * @name _append_json_data(obj, data)
		 * @param  {mixed} obj the node to append to
		 * @param  {String} data the JSON object to parse and append
		 * @param  {Boolean} force_processing internal param - do not set
		 * @trigger model.jstree, changed.jstree
		 */
		_append_json_data : function (dom, data, cb, force_processing) {
			if(this.element === null) { return; }
			dom = this.get_node(dom);
			dom.children = [];
			dom.children_d = [];
			// *%$@!!!
			if(data.d) {
				data = data.d;
				if(typeof data === "string") {
					data = JSON.parse(data);
				}
			}
			if(!$.vakata.is_array(data)) { data = [data]; }
			var w = null,
				args = {
					'df'	: this._model.default_state,
					'dat'	: data,
					'par'	: dom.id,
					'm'		: this._model.data,
					't_id'	: this._id,
					't_cnt'	: this._cnt,
					'sel'	: this._data.core.selected
				},
				inst = this,
				func = function (data, undefined) {
					if(data.data) { data = data.data; }
					var dat = data.dat,
						par = data.par,
						chd = [],
						dpc = [],
						add = [],
						df = data.df,
						t_id = data.t_id,
						t_cnt = data.t_cnt,
						m = data.m,
						p = m[par],
						sel = data.sel,
						tmp, i, j, rslt,
						parse_flat = function (d, p, ps) {
							if(!ps) { ps = []; }
							else { ps = ps.concat(); }
							if(p) { ps.unshift(p); }
							var tid = d.id.toString(),
								i, j, c, e,
								tmp = {
									id			: tid,
									text		: d.text || '',
									icon		: d.icon !== undefined ? d.icon : true,
									parent		: p,
									parents		: ps,
									children	: d.children || [],
									children_d	: d.children_d || [],
									data		: d.data,
									state		: { },
									li_attr		: { id : false },
									a_attr		: { href : '#' },
									original	: false
								};
							for(i in df) {
								if(df.hasOwnProperty(i)) {
									tmp.state[i] = df[i];
								}
							}
							if(d && d.data && d.data.jstree && d.data.jstree.icon) {
								tmp.icon = d.data.jstree.icon;
							}
							if(tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
								tmp.icon = true;
							}
							if(d && d.data) {
								tmp.data = d.data;
								if(d.data.jstree) {
									for(i in d.data.jstree) {
										if(d.data.jstree.hasOwnProperty(i)) {
											tmp.state[i] = d.data.jstree[i];
										}
									}
								}
							}
							if(d && typeof d.state === 'object') {
								for (i in d.state) {
									if(d.state.hasOwnProperty(i)) {
										tmp.state[i] = d.state[i];
									}
								}
							}
							if(d && typeof d.li_attr === 'object') {
								for (i in d.li_attr) {
									if(d.li_attr.hasOwnProperty(i)) {
										tmp.li_attr[i] = d.li_attr[i];
									}
								}
							}
							if(!tmp.li_attr.id) {
								tmp.li_attr.id = tid;
							}
							if(d && typeof d.a_attr === 'object') {
								for (i in d.a_attr) {
									if(d.a_attr.hasOwnProperty(i)) {
										tmp.a_attr[i] = d.a_attr[i];
									}
								}
							}
							if(d && d.children && d.children === true) {
								tmp.state.loaded = false;
								tmp.children = [];
								tmp.children_d = [];
							}
							m[tmp.id] = tmp;
							for(i = 0, j = tmp.children.length; i < j; i++) {
								c = parse_flat(m[tmp.children[i]], tmp.id, ps);
								e = m[c];
								tmp.children_d.push(c);
								if(e.children_d.length) {
									tmp.children_d = tmp.children_d.concat(e.children_d);
								}
							}
							delete d.data;
							delete d.children;
							m[tmp.id].original = d;
							if(tmp.state.selected) {
								add.push(tmp.id);
							}
							return tmp.id;
						},
						parse_nest = function (d, p, ps) {
							if(!ps) { ps = []; }
							else { ps = ps.concat(); }
							if(p) { ps.unshift(p); }
							var tid = false, i, j, c, e, tmp;
							do {
								tid = 'j' + t_id + '_' + (++t_cnt);
							} while(m[tid]);

							tmp = {
								id			: false,
								text		: typeof d === 'string' ? d : '',
								icon		: typeof d === 'object' && d.icon !== undefined ? d.icon : true,
								parent		: p,
								parents		: ps,
								children	: [],
								children_d	: [],
								data		: null,
								state		: { },
								li_attr		: { id : false },
								a_attr		: { href : '#' },
								original	: false
							};
							for(i in df) {
								if(df.hasOwnProperty(i)) {
									tmp.state[i] = df[i];
								}
							}
							if(d && d.id) { tmp.id = d.id.toString(); }
							if(d && d.text) { tmp.text = d.text; }
							if(d && d.data && d.data.jstree && d.data.jstree.icon) {
								tmp.icon = d.data.jstree.icon;
							}
							if(tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
								tmp.icon = true;
							}
							if(d && d.data) {
								tmp.data = d.data;
								if(d.data.jstree) {
									for(i in d.data.jstree) {
										if(d.data.jstree.hasOwnProperty(i)) {
											tmp.state[i] = d.data.jstree[i];
										}
									}
								}
							}
							if(d && typeof d.state === 'object') {
								for (i in d.state) {
									if(d.state.hasOwnProperty(i)) {
										tmp.state[i] = d.state[i];
									}
								}
							}
							if(d && typeof d.li_attr === 'object') {
								for (i in d.li_attr) {
									if(d.li_attr.hasOwnProperty(i)) {
										tmp.li_attr[i] = d.li_attr[i];
									}
								}
							}
							if(tmp.li_attr.id && !tmp.id) {
								tmp.id = tmp.li_attr.id.toString();
							}
							if(!tmp.id) {
								tmp.id = tid;
							}
							if(!tmp.li_attr.id) {
								tmp.li_attr.id = tmp.id;
							}
							if(d && typeof d.a_attr === 'object') {
								for (i in d.a_attr) {
									if(d.a_attr.hasOwnProperty(i)) {
										tmp.a_attr[i] = d.a_attr[i];
									}
								}
							}
							if(d && d.children && d.children.length) {
								for(i = 0, j = d.children.length; i < j; i++) {
									c = parse_nest(d.children[i], tmp.id, ps);
									e = m[c];
									tmp.children.push(c);
									if(e.children_d.length) {
										tmp.children_d = tmp.children_d.concat(e.children_d);
									}
								}
								tmp.children_d = tmp.children_d.concat(tmp.children);
							}
							if(d && d.children && d.children === true) {
								tmp.state.loaded = false;
								tmp.children = [];
								tmp.children_d = [];
							}
							delete d.data;
							delete d.children;
							tmp.original = d;
							m[tmp.id] = tmp;
							if(tmp.state.selected) {
								add.push(tmp.id);
							}
							return tmp.id;
						};

					if(dat.length && dat[0].id !== undefined && dat[0].parent !== undefined) {
						// Flat JSON support (for easy import from DB):
						// 1) convert to object (foreach)
						for(i = 0, j = dat.length; i < j; i++) {
							if(!dat[i].children) {
								dat[i].children = [];
							}
							if(!dat[i].state) {
								dat[i].state = {};
							}
							m[dat[i].id.toString()] = dat[i];
						}
						// 2) populate children (foreach)
						for(i = 0, j = dat.length; i < j; i++) {
							if (!m[dat[i].parent.toString()]) {
								if (typeof inst !== "undefined") {
									inst._data.core.last_error = { 'error' : 'parse', 'plugin' : 'core', 'id' : 'core_07', 'reason' : 'Node with invalid parent', 'data' : JSON.stringify({ 'id' : dat[i].id.toString(), 'parent' : dat[i].parent.toString() }) };
									inst.settings.core.error.call(inst, inst._data.core.last_error);
								}
								continue;
							}

							m[dat[i].parent.toString()].children.push(dat[i].id.toString());
							// populate parent.children_d
							p.children_d.push(dat[i].id.toString());
						}
						// 3) normalize && populate parents and children_d with recursion
						for(i = 0, j = p.children.length; i < j; i++) {
							tmp = parse_flat(m[p.children[i]], par, p.parents.concat());
							dpc.push(tmp);
							if(m[tmp].children_d.length) {
								dpc = dpc.concat(m[tmp].children_d);
							}
						}
						for(i = 0, j = p.parents.length; i < j; i++) {
							m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
						}
						// ?) three_state selection - p.state.selected && t - (if three_state foreach(dat => ch) -> foreach(parents) if(parent.selected) child.selected = true;
						rslt = {
							'cnt' : t_cnt,
							'mod' : m,
							'sel' : sel,
							'par' : par,
							'dpc' : dpc,
							'add' : add
						};
					}
					else {
						for(i = 0, j = dat.length; i < j; i++) {
							tmp = parse_nest(dat[i], par, p.parents.concat());
							if(tmp) {
								chd.push(tmp);
								dpc.push(tmp);
								if(m[tmp].children_d.length) {
									dpc = dpc.concat(m[tmp].children_d);
								}
							}
						}
						p.children = chd;
						p.children_d = dpc;
						for(i = 0, j = p.parents.length; i < j; i++) {
							m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
						}
						rslt = {
							'cnt' : t_cnt,
							'mod' : m,
							'sel' : sel,
							'par' : par,
							'dpc' : dpc,
							'add' : add
						};
					}
					if(typeof window === 'undefined' || typeof window.document === 'undefined') {
						postMessage(rslt);
					}
					else {
						return rslt;
					}
				},
				rslt = function (rslt, worker) {
					if(this.element === null) { return; }
					this._cnt = rslt.cnt;
					var i, m = this._model.data;
					for (i in m) {
						if (m.hasOwnProperty(i) && m[i].state && m[i].state.loading && rslt.mod[i]) {
							rslt.mod[i].state.loading = true;
						}
					}
					this._model.data = rslt.mod; // breaks the reference in load_node - careful

					if(worker) {
						var j, a = rslt.add, r = rslt.sel, s = this._data.core.selected.slice();
						m = this._model.data;
						// if selection was changed while calculating in worker
						if(r.length !== s.length || $.vakata.array_unique(r.concat(s)).length !== r.length) {
							// deselect nodes that are no longer selected
							for(i = 0, j = r.length; i < j; i++) {
								if($.inArray(r[i], a) === -1 && $.inArray(r[i], s) === -1) {
									m[r[i]].state.selected = false;
								}
							}
							// select nodes that were selected in the mean time
							for(i = 0, j = s.length; i < j; i++) {
								if($.inArray(s[i], r) === -1) {
									m[s[i]].state.selected = true;
								}
							}
						}
					}
					if(rslt.add.length) {
						this._data.core.selected = this._data.core.selected.concat(rslt.add);
					}

					this.trigger('model', { "nodes" : rslt.dpc, 'parent' : rslt.par });

					if(rslt.par !== $.jstree.root) {
						this._node_changed(rslt.par);
						this.redraw();
					}
					else {
						// this.get_container_ul().children('.jstree-initial-node').remove();
						this.redraw(true);
					}
					if(rslt.add.length) {
						this.trigger('changed', { 'action' : 'model', 'selected' : this._data.core.selected });
					}

					// If no worker, try to mimic worker behavioour, by invoking cb asynchronously
					if (!worker && setImmediate) {
						setImmediate(function(){
							cb.call(inst, true);
						});
					}
					else {
						cb.call(inst, true);
					}
				};
			if(this.settings.core.worker && window.Blob && window.URL && window.Worker) {
				try {
					if(this._wrk === null) {
						this._wrk = window.URL.createObjectURL(
							new window.Blob(
								['self.onmessage = ' + func.toString()],
								{type:"text/javascript"}
							)
						);
					}
					if(!this._data.core.working || force_processing) {
						this._data.core.working = true;
						w = new window.Worker(this._wrk);
						w.onmessage = function (e) {
							rslt.call(this, e.data, true);
							try { w.terminate(); w = null; } catch(ignore) { }
							if(this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							}
							else {
								this._data.core.working = false;
							}
						}.bind(this);
						if(!args.par) {
							if(this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							}
							else {
								this._data.core.working = false;
							}
						}
						else {
							w.postMessage(args);
						}
					}
					else {
						this._data.core.worker_queue.push([dom, data, cb, true]);
					}
				}
				catch(e) {
					rslt.call(this, func(args), false);
					if(this._data.core.worker_queue.length) {
						this._append_json_data.apply(this, this._data.core.worker_queue.shift());
					}
					else {
						this._data.core.working = false;
					}
				}
			}
			else {
				rslt.call(this, func(args), false);
			}
		},
		/**
		 * parses a node from a jQuery object and appends them to the in memory tree model. Used internally.
		 * @private
		 * @name _parse_model_from_html(d [, p, ps])
		 * @param  {jQuery} d the jQuery object to parse
		 * @param  {String} p the parent ID
		 * @param  {Array} ps list of all parents
		 * @return {String} the ID of the object added to the model
		 */
		_parse_model_from_html : function (d, p, ps) {
			if(!ps) { ps = []; }
			else { ps = [].concat(ps); }
			if(p) { ps.unshift(p); }
			var c, e, m = this._model.data,
				data = {
					id			: false,
					text		: false,
					icon		: true,
					parent		: p,
					parents		: ps,
					children	: [],
					children_d	: [],
					data		: null,
					state		: { },
					li_attr		: { id : false },
					a_attr		: { href : '#' },
					original	: false
				}, i, tmp, tid;
			for(i in this._model.default_state) {
				if(this._model.default_state.hasOwnProperty(i)) {
					data.state[i] = this._model.default_state[i];
				}
			}
			tmp = $.vakata.attributes(d, true);
			$.each(tmp, function (i, v) {
				v = $.vakata.trim(v);
				if(!v.length) { return true; }
				data.li_attr[i] = v;
				if(i === 'id') {
					data.id = v.toString();
				}
			});
			tmp = d.children('a').first();
			if(tmp.length) {
				tmp = $.vakata.attributes(tmp, true);
				$.each(tmp, function (i, v) {
					v = $.vakata.trim(v);
					if(v.length) {
						data.a_attr[i] = v;
					}
				});
			}
			tmp = d.children("a").first().length ? d.children("a").first().clone() : d.clone();
			tmp.children("ins, i, ul").remove();
			tmp = tmp.html();
			tmp = $('<div></div>').html(tmp);
			data.text = this.settings.core.force_text ? tmp.text() : tmp.html();
			tmp = d.data();
			data.data = tmp ? $.extend(true, {}, tmp) : null;
			data.state.opened = d.hasClass('jstree-open');
			data.state.selected = d.children('a').hasClass('jstree-clicked');
			data.state.disabled = d.children('a').hasClass('jstree-disabled');
			if(data.data && data.data.jstree) {
				for(i in data.data.jstree) {
					if(data.data.jstree.hasOwnProperty(i)) {
						data.state[i] = data.data.jstree[i];
					}
				}
			}
			tmp = d.children("a").children(".jstree-themeicon");
			if(tmp.length) {
				data.icon = tmp.hasClass('jstree-themeicon-hidden') ? false : tmp.attr('rel');
			}
			if(data.state.icon !== undefined) {
				data.icon = data.state.icon;
			}
			if(data.icon === undefined || data.icon === null || data.icon === "") {
				data.icon = true;
			}
			tmp = d.children("ul").children("li");
			do {
				tid = 'j' + this._id + '_' + (++this._cnt);
			} while(m[tid]);
			data.id = data.li_attr.id ? data.li_attr.id.toString() : tid;
			if(tmp.length) {
				tmp.each(function (i, v) {
					c = this._parse_model_from_html($(v), data.id, ps);
					e = this._model.data[c];
					data.children.push(c);
					if(e.children_d.length) {
						data.children_d = data.children_d.concat(e.children_d);
					}
				}.bind(this));
				data.children_d = data.children_d.concat(data.children);
			}
			else {
				if(d.hasClass('jstree-closed')) {
					data.state.loaded = false;
				}
			}
			if(data.li_attr['class']) {
				data.li_attr['class'] = data.li_attr['class'].replace('jstree-closed','').replace('jstree-open','');
			}
			if(data.a_attr['class']) {
				data.a_attr['class'] = data.a_attr['class'].replace('jstree-clicked','').replace('jstree-disabled','');
			}
			m[data.id] = data;
			if(data.state.selected) {
				this._data.core.selected.push(data.id);
			}
			return data.id;
		},
		/**
		 * parses a node from a JSON object (used when dealing with flat data, which has no nesting of children, but has id and parent properties) and appends it to the in memory tree model. Used internally.
		 * @private
		 * @name _parse_model_from_flat_json(d [, p, ps])
		 * @param  {Object} d the JSON object to parse
		 * @param  {String} p the parent ID
		 * @param  {Array} ps list of all parents
		 * @return {String} the ID of the object added to the model
		 */
		_parse_model_from_flat_json : function (d, p, ps) {
			if(!ps) { ps = []; }
			else { ps = ps.concat(); }
			if(p) { ps.unshift(p); }
			var tid = d.id.toString(),
				m = this._model.data,
				df = this._model.default_state,
				i, j, c, e,
				tmp = {
					id			: tid,
					text		: d.text || '',
					icon		: d.icon !== undefined ? d.icon : true,
					parent		: p,
					parents		: ps,
					children	: d.children || [],
					children_d	: d.children_d || [],
					data		: d.data,
					state		: { },
					li_attr		: { id : false },
					a_attr		: { href : '#' },
					original	: false
				};
			for(i in df) {
				if(df.hasOwnProperty(i)) {
					tmp.state[i] = df[i];
				}
			}
			if(d && d.data && d.data.jstree && d.data.jstree.icon) {
				tmp.icon = d.data.jstree.icon;
			}
			if(tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
				tmp.icon = true;
			}
			if(d && d.data) {
				tmp.data = d.data;
				if(d.data.jstree) {
					for(i in d.data.jstree) {
						if(d.data.jstree.hasOwnProperty(i)) {
							tmp.state[i] = d.data.jstree[i];
						}
					}
				}
			}
			if(d && typeof d.state === 'object') {
				for (i in d.state) {
					if(d.state.hasOwnProperty(i)) {
						tmp.state[i] = d.state[i];
					}
				}
			}
			if(d && typeof d.li_attr === 'object') {
				for (i in d.li_attr) {
					if(d.li_attr.hasOwnProperty(i)) {
						tmp.li_attr[i] = d.li_attr[i];
					}
				}
			}
			if(!tmp.li_attr.id) {
				tmp.li_attr.id = tid;
			}
			if(d && typeof d.a_attr === 'object') {
				for (i in d.a_attr) {
					if(d.a_attr.hasOwnProperty(i)) {
						tmp.a_attr[i] = d.a_attr[i];
					}
				}
			}
			if(d && d.children && d.children === true) {
				tmp.state.loaded = false;
				tmp.children = [];
				tmp.children_d = [];
			}
			m[tmp.id] = tmp;
			for(i = 0, j = tmp.children.length; i < j; i++) {
				c = this._parse_model_from_flat_json(m[tmp.children[i]], tmp.id, ps);
				e = m[c];
				tmp.children_d.push(c);
				if(e.children_d.length) {
					tmp.children_d = tmp.children_d.concat(e.children_d);
				}
			}
			delete d.data;
			delete d.children;
			m[tmp.id].original = d;
			if(tmp.state.selected) {
				this._data.core.selected.push(tmp.id);
			}
			return tmp.id;
		},
		/**
		 * parses a node from a JSON object and appends it to the in memory tree model. Used internally.
		 * @private
		 * @name _parse_model_from_json(d [, p, ps])
		 * @param  {Object} d the JSON object to parse
		 * @param  {String} p the parent ID
		 * @param  {Array} ps list of all parents
		 * @return {String} the ID of the object added to the model
		 */
		_parse_model_from_json : function (d, p, ps) {
			if(!ps) { ps = []; }
			else { ps = ps.concat(); }
			if(p) { ps.unshift(p); }
			var tid = false, i, j, c, e, m = this._model.data, df = this._model.default_state, tmp;
			do {
				tid = 'j' + this._id + '_' + (++this._cnt);
			} while(m[tid]);

			tmp = {
				id			: false,
				text		: typeof d === 'string' ? d : '',
				icon		: typeof d === 'object' && d.icon !== undefined ? d.icon : true,
				parent		: p,
				parents		: ps,
				children	: [],
				children_d	: [],
				data		: null,
				state		: { },
				li_attr		: { id : false },
				a_attr		: { href : '#' },
				original	: false
			};
			for(i in df) {
				if(df.hasOwnProperty(i)) {
					tmp.state[i] = df[i];
				}
			}
			if(d && d.id) { tmp.id = d.id.toString(); }
			if(d && d.text) { tmp.text = d.text; }
			if(d && d.data && d.data.jstree && d.data.jstree.icon) {
				tmp.icon = d.data.jstree.icon;
			}
			if(tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
				tmp.icon = true;
			}
			if(d && d.data) {
				tmp.data = d.data;
				if(d.data.jstree) {
					for(i in d.data.jstree) {
						if(d.data.jstree.hasOwnProperty(i)) {
							tmp.state[i] = d.data.jstree[i];
						}
					}
				}
			}
			if(d && typeof d.state === 'object') {
				for (i in d.state) {
					if(d.state.hasOwnProperty(i)) {
						tmp.state[i] = d.state[i];
					}
				}
			}
			if(d && typeof d.li_attr === 'object') {
				for (i in d.li_attr) {
					if(d.li_attr.hasOwnProperty(i)) {
						tmp.li_attr[i] = d.li_attr[i];
					}
				}
			}
			if(tmp.li_attr.id && !tmp.id) {
				tmp.id = tmp.li_attr.id.toString();
			}
			if(!tmp.id) {
				tmp.id = tid;
			}
			if(!tmp.li_attr.id) {
				tmp.li_attr.id = tmp.id;
			}
			if(d && typeof d.a_attr === 'object') {
				for (i in d.a_attr) {
					if(d.a_attr.hasOwnProperty(i)) {
						tmp.a_attr[i] = d.a_attr[i];
					}
				}
			}
			if(d && d.children && d.children.length) {
				for(i = 0, j = d.children.length; i < j; i++) {
					c = this._parse_model_from_json(d.children[i], tmp.id, ps);
					e = m[c];
					tmp.children.push(c);
					if(e.children_d.length) {
						tmp.children_d = tmp.children_d.concat(e.children_d);
					}
				}
				tmp.children_d = tmp.children.concat(tmp.children_d);
			}
			if(d && d.children && d.children === true) {
				tmp.state.loaded = false;
				tmp.children = [];
				tmp.children_d = [];
			}
			delete d.data;
			delete d.children;
			tmp.original = d;
			m[tmp.id] = tmp;
			if(tmp.state.selected) {
				this._data.core.selected.push(tmp.id);
			}
			return tmp.id;
		},
		/**
		 * redraws all nodes that need to be redrawn. Used internally.
		 * @private
		 * @name _redraw()
		 * @trigger redraw.jstree
		 */
		_redraw : function () {
			var nodes = this._model.force_full_redraw ? this._model.data[$.jstree.root].children.concat([]) : this._model.changed.concat([]),
				f = document.createElement('UL'), tmp, i, j, fe = this._data.core.focused;
			for(i = 0, j = nodes.length; i < j; i++) {
				tmp = this.redraw_node(nodes[i], true, this._model.force_full_redraw);
				if(tmp && this._model.force_full_redraw) {
					f.appendChild(tmp);
				}
			}
			if(this._model.force_full_redraw) {
				f.className = this.get_container_ul()[0].className;
				f.setAttribute('role','group');
				this.element.empty().append(f);
				//this.get_container_ul()[0].appendChild(f);
			}
			if(fe !== null && this.settings.core.restore_focus) {
				tmp = this.get_node(fe, true);
				if(tmp && tmp.length && tmp.children('.jstree-anchor')[0] !== document.activeElement) {
					tmp.children('.jstree-anchor').trigger('focus');
				}
				else {
					this._data.core.focused = null;
				}
			}
			this._model.force_full_redraw = false;
			this._model.changed = [];
			/**
			 * triggered after nodes are redrawn
			 * @event
			 * @name redraw.jstree
			 * @param {array} nodes the redrawn nodes
			 */
			this.trigger('redraw', { "nodes" : nodes });
		},
		/**
		 * redraws all nodes that need to be redrawn or optionally - the whole tree
		 * @name redraw([full])
		 * @param {Boolean} full if set to `true` all nodes are redrawn.
		 */
		redraw : function (full) {
			if(full) {
				this._model.force_full_redraw = true;
			}
			//if(this._model.redraw_timeout) {
			//	clearTimeout(this._model.redraw_timeout);
			//}
			//this._model.redraw_timeout = setTimeout($.proxy(this._redraw, this),0);
			this._redraw();
		},
		/**
		 * redraws a single node's children. Used internally.
		 * @private
		 * @name draw_children(node)
		 * @param {mixed} node the node whose children will be redrawn
		 */
		draw_children : function (node) {
			var obj = this.get_node(node),
				i = false,
				j = false,
				k = false,
				d = document;
			if(!obj) { return false; }
			if(obj.id === $.jstree.root) { return this.redraw(true); }
			node = this.get_node(node, true);
			if(!node || !node.length) { return false; } // TODO: quick toggle

			node.children('.jstree-children').remove();
			node = node[0];
			if(obj.children.length && obj.state.loaded) {
				k = d.createElement('UL');
				k.setAttribute('role', 'group');
				k.className = 'jstree-children';
				for(i = 0, j = obj.children.length; i < j; i++) {
					k.appendChild(this.redraw_node(obj.children[i], true, true));
				}
				node.appendChild(k);
			}
		},
		/**
		 * redraws a single node. Used internally.
		 * @private
		 * @name redraw_node(node, deep, is_callback, force_render)
		 * @param {mixed} node the node to redraw
		 * @param {Boolean} deep should child nodes be redrawn too
		 * @param {Boolean} is_callback is this a recursion call
		 * @param {Boolean} force_render should children of closed parents be drawn anyway
		 */
		redraw_node : function (node, deep, is_callback, force_render) {
			var obj = this.get_node(node),
				par = false,
				ind = false,
				old = false,
				i = false,
				j = false,
				k = false,
				c = '',
				d = document,
				m = this._model.data,
				f = false,
				s = false,
				tmp = null,
				t = 0,
				l = 0,
				has_children = false,
				last_sibling = false;
			if(!obj) { return false; }
			if(obj.id === $.jstree.root) {  return this.redraw(true); }
			deep = deep || obj.children.length === 0;
			node = !document.querySelector ? document.getElementById(obj.id) : this.element[0].querySelector('#' + ("0123456789".indexOf(obj.id[0]) !== -1 ? '\\3' + obj.id[0] + ' ' + obj.id.substr(1).replace($.jstree.idregex,'\\$&') : obj.id.replace($.jstree.idregex,'\\$&')) ); //, this.element);
			if(!node) {
				deep = true;
				//node = d.createElement('LI');
				if(!is_callback) {
					par = obj.parent !== $.jstree.root ? $('#' + obj.parent.replace($.jstree.idregex,'\\$&'), this.element)[0] : null;
					if(par !== null && (!par || !m[obj.parent].state.opened)) {
						return false;
					}
					ind = $.inArray(obj.id, par === null ? m[$.jstree.root].children : m[obj.parent].children);
				}
			}
			else {
				node = $(node);
				if(!is_callback) {
					par = node.parent().parent()[0];
					if(par === this.element[0]) {
						par = null;
					}
					ind = node.index();
				}
				// m[obj.id].data = node.data(); // use only node's data, no need to touch jquery storage
				if(!deep && obj.children.length && !node.children('.jstree-children').length) {
					deep = true;
				}
				if(!deep) {
					old = node.children('.jstree-children')[0];
				}
				f = node.children('.jstree-anchor')[0] === document.activeElement;
				node.remove();
				//node = d.createElement('LI');
				//node = node[0];
			}
			node = this._data.core.node.cloneNode(true);
			// node is DOM, deep is boolean

			c = 'jstree-node ';
			for(i in obj.li_attr) {
				if(obj.li_attr.hasOwnProperty(i)) {
					if(i === 'id') { continue; }
					if(i !== 'class') {
						node.setAttribute(i, obj.li_attr[i]);
					}
					else {
						c += obj.li_attr[i];
					}
				}
			}
			if(!obj.a_attr.id) {
				obj.a_attr.id = obj.id + '_anchor';
			}
			node.childNodes[1].setAttribute('aria-selected', !!obj.state.selected);
			node.childNodes[1].setAttribute('aria-level', obj.parents.length);
			if(this.settings.core.compute_elements_positions) {
				node.childNodes[1].setAttribute('aria-setsize', m[obj.parent].children.length);
				node.childNodes[1].setAttribute('aria-posinset', m[obj.parent].children.indexOf(obj.id) + 1);
			}
			if(obj.state.disabled) {
				node.childNodes[1].setAttribute('aria-disabled', true);
			}

			for(i = 0, j = obj.children.length; i < j; i++) {
				if(!m[obj.children[i]].state.hidden) {
					has_children = true;
					break;
				}
			}
			if(obj.parent !== null && m[obj.parent] && !obj.state.hidden) {
				i = $.inArray(obj.id, m[obj.parent].children);
				last_sibling = obj.id;
				if(i !== -1) {
					i++;
					for(j = m[obj.parent].children.length; i < j; i++) {
						if(!m[m[obj.parent].children[i]].state.hidden) {
							last_sibling = m[obj.parent].children[i];
						}
						if(last_sibling !== obj.id) {
							break;
						}
					}
				}
			}

			if(obj.state.hidden) {
				c += ' jstree-hidden';
			}
			if (obj.state.loading) {
				c += ' jstree-loading';
			}
			if(obj.state.loaded && !has_children) {
				c += ' jstree-leaf';
			}
			else {
				c += obj.state.opened && obj.state.loaded ? ' jstree-open' : ' jstree-closed';
				node.childNodes[1].setAttribute('aria-expanded', (obj.state.opened && obj.state.loaded) );
			}
			if(last_sibling === obj.id) {
				c += ' jstree-last';
			}
			node.id = obj.id;
			node.className = c;
			c = ( obj.state.selected ? ' jstree-clicked' : '') + ( obj.state.disabled ? ' jstree-disabled' : '');
			for(j in obj.a_attr) {
				if(obj.a_attr.hasOwnProperty(j)) {
					if(j === 'href' && obj.a_attr[j] === '#') { continue; }
					if(j !== 'class') {
						node.childNodes[1].setAttribute(j, obj.a_attr[j]);
					}
					else {
						c += ' ' + obj.a_attr[j];
					}
				}
			}
			if(c.length) {
				node.childNodes[1].className = 'jstree-anchor ' + c;
			}
			if((obj.icon && obj.icon !== true) || obj.icon === false) {
				if(obj.icon === false) {
					node.childNodes[1].childNodes[0].className += ' jstree-themeicon-hidden';
				}
				else if(obj.icon.indexOf('/') === -1 && obj.icon.indexOf('.') === -1) {
					node.childNodes[1].childNodes[0].className += ' ' + obj.icon + ' jstree-themeicon-custom';
				}
				else {
					node.childNodes[1].childNodes[0].style.backgroundImage = 'url("'+obj.icon+'")';
					node.childNodes[1].childNodes[0].style.backgroundPosition = 'center center';
					node.childNodes[1].childNodes[0].style.backgroundSize = 'auto';
					node.childNodes[1].childNodes[0].className += ' jstree-themeicon-custom';
				}
			}

			if(this.settings.core.force_text) {
				node.childNodes[1].appendChild(d.createTextNode(obj.text));
			}
			else {
				node.childNodes[1].innerHTML += obj.text;
			}


			if(deep && obj.children.length && (obj.state.opened || force_render) && obj.state.loaded) {
				k = d.createElement('UL');
				k.setAttribute('role', 'group');
				k.className = 'jstree-children';
				for(i = 0, j = obj.children.length; i < j; i++) {
					k.appendChild(this.redraw_node(obj.children[i], deep, true));
				}
				node.appendChild(k);
			}
			if(old) {
				node.appendChild(old);
			}
			if(!is_callback) {
				// append back using par / ind
				if(!par) {
					par = this.element[0];
				}
				for(i = 0, j = par.childNodes.length; i < j; i++) {
					if(par.childNodes[i] && par.childNodes[i].className && par.childNodes[i].className.indexOf('jstree-children') !== -1) {
						tmp = par.childNodes[i];
						break;
					}
				}
				if(!tmp) {
					tmp = d.createElement('UL');
					tmp.setAttribute('role', 'group');
					tmp.className = 'jstree-children';
					par.appendChild(tmp);
				}
				par = tmp;

				if(ind < par.childNodes.length) {
					par.insertBefore(node, par.childNodes[ind]);
				}
				else {
					par.appendChild(node);
				}
				if(f) {
					t = this.element[0].scrollTop;
					l = this.element[0].scrollLeft;
					node.childNodes[1].focus();
					this.element[0].scrollTop = t;
					this.element[0].scrollLeft = l;
				}
			}
			if(obj.state.opened && !obj.state.loaded) {
				obj.state.opened = false;
				setTimeout(function () {
					this.open_node(obj.id, false, 0);
				}.bind(this), 0);
			}
			return node;
		},
		/**
		 * opens a node, revealing its children. If the node is not loaded it will be loaded and opened once ready.
		 * @name open_node(obj [, callback, animation])
		 * @param {mixed} obj the node to open
		 * @param {Function} callback a function to execute once the node is opened
		 * @param {Number} animation the animation duration in milliseconds when opening the node (overrides the `core.animation` setting). Use `false` for no animation.
		 * @trigger open_node.jstree, after_open.jstree, before_open.jstree
		 */
		open_node : function (obj, callback, animation) {
			var t1, t2, d, t;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.open_node(obj[t1], callback, animation);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			animation = animation === undefined ? this.settings.core.animation : animation;
			if(!this.is_closed(obj)) {
				if(callback) {
					callback.call(this, obj, false);
				}
				return false;
			}
			if(!this.is_loaded(obj)) {
				if(this.is_loading(obj)) {
					return setTimeout(function () {
						this.open_node(obj, callback, animation);
					}.bind(this), 500);
				}
				this.load_node(obj, function (o, ok) {
					return ok ? this.open_node(o, callback, animation) : (callback ? callback.call(this, o, false) : false);
				});
			}
			else {
				d = this.get_node(obj, true);
				t = this;
				if(d.length) {
					if(animation && d.children(".jstree-children").length) {
						d.children(".jstree-children").stop(true, true);
					}
					if(obj.children.length && !this._firstChild(d.children('.jstree-children')[0])) {
						this.draw_children(obj);
						//d = this.get_node(obj, true);
					}
					if(!animation) {
						this.trigger('before_open', { "node" : obj });
						d[0].className = d[0].className.replace('jstree-closed', 'jstree-open');
						d[0].childNodes[1].setAttribute("aria-expanded", true);
					}
					else {
						this.trigger('before_open', { "node" : obj });
						d
							.children(".jstree-children").css("display","none").end()
							.removeClass("jstree-closed").addClass("jstree-open")
								.children('.jstree-anchor').attr("aria-expanded", true).end()
							.children(".jstree-children").stop(true, true)
								.slideDown(animation, function () {
									this.style.display = "";
									if (t.element) {
										t.trigger("after_open", { "node" : obj });
									}
								});
					}
				}
				obj.state.opened = true;
				if(callback) {
					callback.call(this, obj, true);
				}
				if(!d.length) {
					/**
					 * triggered when a node is about to be opened (if the node is supposed to be in the DOM, it will be, but it won't be visible yet)
					 * @event
					 * @name before_open.jstree
					 * @param {Object} node the opened node
					 */
					this.trigger('before_open', { "node" : obj });
				}
				/**
				 * triggered when a node is opened (if there is an animation it will not be completed yet)
				 * @event
				 * @name open_node.jstree
				 * @param {Object} node the opened node
				 */
				this.trigger('open_node', { "node" : obj });
				if(!animation || !d.length) {
					/**
					 * triggered when a node is opened and the animation is complete
					 * @event
					 * @name after_open.jstree
					 * @param {Object} node the opened node
					 */
					this.trigger("after_open", { "node" : obj });
				}
				return true;
			}
		},
		/**
		 * opens every parent of a node (node should be loaded)
		 * @name _open_to(obj)
		 * @param {mixed} obj the node to reveal
		 * @private
		 */
		_open_to : function (obj) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			var i, j, p = obj.parents;
			for(i = 0, j = p.length; i < j; i+=1) {
				if(i !== $.jstree.root) {
					this.open_node(p[i], false, 0);
				}
			}
			return $('#' + obj.id.replace($.jstree.idregex,'\\$&'), this.element);
		},
		/**
		 * closes a node, hiding its children
		 * @name close_node(obj [, animation])
		 * @param {mixed} obj the node to close
		 * @param {Number} animation the animation duration in milliseconds when closing the node (overrides the `core.animation` setting). Use `false` for no animation.
		 * @trigger close_node.jstree, after_close.jstree
		 */
		close_node : function (obj, animation) {
			var t1, t2, t, d;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.close_node(obj[t1], animation);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			if(this.is_closed(obj)) {
				return false;
			}
			animation = animation === undefined ? this.settings.core.animation : animation;
			t = this;
			d = this.get_node(obj, true);

			obj.state.opened = false;
			/**
			 * triggered when a node is closed (if there is an animation it will not be complete yet)
			 * @event
			 * @name close_node.jstree
			 * @param {Object} node the closed node
			 */
			this.trigger('close_node',{ "node" : obj });
			if(!d.length) {
				/**
				 * triggered when a node is closed and the animation is complete
				 * @event
				 * @name after_close.jstree
				 * @param {Object} node the closed node
				 */
				this.trigger("after_close", { "node" : obj });
			}
			else {
				if(!animation) {
					d[0].className = d[0].className.replace('jstree-open', 'jstree-closed');
					d.children('.jstree-anchor').attr("aria-expanded", false);
					d.children('.jstree-children').remove();
					this.trigger("after_close", { "node" : obj });
				}
				else {
					d
						.children(".jstree-children").attr("style","display:block !important").end()
						.removeClass("jstree-open").addClass("jstree-closed")
							.children('.jstree-anchor').attr("aria-expanded", false).end()
						.children(".jstree-children").stop(true, true).slideUp(animation, function () {
							this.style.display = "";
							d.children('.jstree-children').remove();
							if (t.element) {
								t.trigger("after_close", { "node" : obj });
							}
						});
				}
			}
		},
		/**
		 * toggles a node - closing it if it is open, opening it if it is closed
		 * @name toggle_node(obj)
		 * @param {mixed} obj the node to toggle
		 */
		toggle_node : function (obj) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.toggle_node(obj[t1]);
				}
				return true;
			}
			if(this.is_closed(obj)) {
				return this.open_node(obj);
			}
			if(this.is_open(obj)) {
				return this.close_node(obj);
			}
		},
		/**
		 * opens all nodes within a node (or the tree), revealing their children. If the node is not loaded it will be loaded and opened once ready.
		 * @name open_all([obj, animation, original_obj])
		 * @param {mixed} obj the node to open recursively, omit to open all nodes in the tree
		 * @param {Number} animation the animation duration in milliseconds when opening the nodes, the default is no animation
		 * @param {jQuery} reference to the node that started the process (internal use)
		 * @trigger open_all.jstree
		 */
		open_all : function (obj, animation, original_obj) {
			if(!obj) { obj = $.jstree.root; }
			obj = this.get_node(obj);
			if(!obj) { return false; }
			var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true), i, j, _this;
			if(!dom.length) {
				for(i = 0, j = obj.children_d.length; i < j; i++) {
					if(this.is_closed(this._model.data[obj.children_d[i]])) {
						this._model.data[obj.children_d[i]].state.opened = true;
					}
				}
				return this.trigger('open_all', { "node" : obj });
			}
			original_obj = original_obj || dom;
			_this = this;
			dom = this.is_closed(obj) ? dom.find('.jstree-closed').addBack() : dom.find('.jstree-closed');
			dom.each(function () {
				_this.open_node(
					this,
					function(node, status) { if(status && this.is_parent(node)) { this.open_all(node, animation, original_obj); } },
					animation || 0
				);
			});
			if(original_obj.find('.jstree-closed').length === 0) {
				/**
				 * triggered when an `open_all` call completes
				 * @event
				 * @name open_all.jstree
				 * @param {Object} node the opened node
				 */
				this.trigger('open_all', { "node" : this.get_node(original_obj) });
			}
		},
		/**
		 * closes all nodes within a node (or the tree), revealing their children
		 * @name close_all([obj, animation])
		 * @param {mixed} obj the node to close recursively, omit to close all nodes in the tree
		 * @param {Number} animation the animation duration in milliseconds when closing the nodes, the default is no animation
		 * @trigger close_all.jstree
		 */
		close_all : function (obj, animation) {
			if(!obj) { obj = $.jstree.root; }
			obj = this.get_node(obj);
			if(!obj) { return false; }
			var dom = obj.id === $.jstree.root ? this.get_container_ul() : this.get_node(obj, true),
				_this = this, i, j;
			if(dom.length) {
				dom = this.is_open(obj) ? dom.find('.jstree-open').addBack() : dom.find('.jstree-open');
				$(dom.get().reverse()).each(function () { _this.close_node(this, animation || 0); });
			}
			for(i = 0, j = obj.children_d.length; i < j; i++) {
				this._model.data[obj.children_d[i]].state.opened = false;
			}
			/**
			 * triggered when an `close_all` call completes
			 * @event
			 * @name close_all.jstree
			 * @param {Object} node the closed node
			 */
			this.trigger('close_all', { "node" : obj });
		},
		/**
		 * checks if a node is disabled (not selectable)
		 * @name is_disabled(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_disabled : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state && obj.state.disabled;
		},
		/**
		 * enables a node - so that it can be selected
		 * @name enable_node(obj)
		 * @param {mixed} obj the node to enable
		 * @trigger enable_node.jstree
		 */
		enable_node : function (obj) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.enable_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			obj.state.disabled = false;
			this.get_node(obj,true).children('.jstree-anchor').removeClass('jstree-disabled').attr('aria-disabled', false);
			/**
			 * triggered when an node is enabled
			 * @event
			 * @name enable_node.jstree
			 * @param {Object} node the enabled node
			 */
			this.trigger('enable_node', { 'node' : obj });
		},
		/**
		 * disables a node - so that it can not be selected
		 * @name disable_node(obj)
		 * @param {mixed} obj the node to disable
		 * @trigger disable_node.jstree
		 */
		disable_node : function (obj) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.disable_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			obj.state.disabled = true;
			this.get_node(obj,true).children('.jstree-anchor').addClass('jstree-disabled').attr('aria-disabled', true);
			/**
			 * triggered when an node is disabled
			 * @event
			 * @name disable_node.jstree
			 * @param {Object} node the disabled node
			 */
			this.trigger('disable_node', { 'node' : obj });
		},
		/**
		 * determines if a node is hidden
		 * @name is_hidden(obj)
		 * @param {mixed} obj the node
		 */
		is_hidden : function (obj) {
			obj = this.get_node(obj);
			return obj.state.hidden === true;
		},
		/**
		 * hides a node - it is still in the structure but will not be visible
		 * @name hide_node(obj)
		 * @param {mixed} obj the node to hide
		 * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
		 * @trigger hide_node.jstree
		 */
		hide_node : function (obj, skip_redraw) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.hide_node(obj[t1], true);
				}
				if (!skip_redraw) {
					this.redraw();
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			if(!obj.state.hidden) {
				obj.state.hidden = true;
				this._node_changed(obj.parent);
				if(!skip_redraw) {
					this.redraw();
				}
				/**
				 * triggered when an node is hidden
				 * @event
				 * @name hide_node.jstree
				 * @param {Object} node the hidden node
				 */
				this.trigger('hide_node', { 'node' : obj });
			}
		},
		/**
		 * shows a node
		 * @name show_node(obj)
		 * @param {mixed} obj the node to show
		 * @param {Boolean} skip_redraw internal parameter controlling if redraw is called
		 * @trigger show_node.jstree
		 */
		show_node : function (obj, skip_redraw) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.show_node(obj[t1], true);
				}
				if (!skip_redraw) {
					this.redraw();
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			if(obj.state.hidden) {
				obj.state.hidden = false;
				this._node_changed(obj.parent);
				if(!skip_redraw) {
					this.redraw();
				}
				/**
				 * triggered when an node is shown
				 * @event
				 * @name show_node.jstree
				 * @param {Object} node the shown node
				 */
				this.trigger('show_node', { 'node' : obj });
			}
		},
		/**
		 * hides all nodes
		 * @name hide_all()
		 * @trigger hide_all.jstree
		 */
		hide_all : function (skip_redraw) {
			var i, m = this._model.data, ids = [];
			for(i in m) {
				if(m.hasOwnProperty(i) && i !== $.jstree.root && !m[i].state.hidden) {
					m[i].state.hidden = true;
					ids.push(i);
				}
			}
			this._model.force_full_redraw = true;
			if(!skip_redraw) {
				this.redraw();
			}
			/**
			 * triggered when all nodes are hidden
			 * @event
			 * @name hide_all.jstree
			 * @param {Array} nodes the IDs of all hidden nodes
			 */
			this.trigger('hide_all', { 'nodes' : ids });
			return ids;
		},
		/**
		 * shows all nodes
		 * @name show_all()
		 * @trigger show_all.jstree
		 */
		show_all : function (skip_redraw) {
			var i, m = this._model.data, ids = [];
			for(i in m) {
				if(m.hasOwnProperty(i) && i !== $.jstree.root && m[i].state.hidden) {
					m[i].state.hidden = false;
					ids.push(i);
				}
			}
			this._model.force_full_redraw = true;
			if(!skip_redraw) {
				this.redraw();
			}
			/**
			 * triggered when all nodes are shown
			 * @event
			 * @name show_all.jstree
			 * @param {Array} nodes the IDs of all shown nodes
			 */
			this.trigger('show_all', { 'nodes' : ids });
			return ids;
		},
		/**
		 * called when a node is selected by the user. Used internally.
		 * @private
		 * @name activate_node(obj, e)
		 * @param {mixed} obj the node
		 * @param {Object} e the related event
		 * @trigger activate_node.jstree, changed.jstree
		 */
		activate_node : function (obj, e) {
			if(this.is_disabled(obj)) {
				return false;
			}
			if(!e || typeof e !== 'object') {
				e = {};
			}

			// ensure last_clicked is still in the DOM, make it fresh (maybe it was moved?) and make sure it is still selected, if not - make last_clicked the last selected node
			this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== undefined ? this.get_node(this._data.core.last_clicked.id) : null;
			if(this._data.core.last_clicked && !this._data.core.last_clicked.state.selected) { this._data.core.last_clicked = null; }
			if(!this._data.core.last_clicked && this._data.core.selected.length) { this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1]); }

			if(!this.settings.core.multiple || (!e.metaKey && !e.ctrlKey && !e.shiftKey) || (e.shiftKey && (!this._data.core.last_clicked || !this.get_parent(obj) || this.get_parent(obj) !== this._data.core.last_clicked.parent ) )) {
				if(!this.settings.core.multiple && (e.metaKey || e.ctrlKey || e.shiftKey) && this.is_selected(obj)) {
					this.deselect_node(obj, false, e);
				}
				else {
					this.deselect_all(true);
					this.select_node(obj, false, false, e);
					this._data.core.last_clicked = this.get_node(obj);
				}
			}
			else {
				if(e.shiftKey) {
					var o = this.get_node(obj).id,
						l = this._data.core.last_clicked.id,
						p = this.get_node(this._data.core.last_clicked.parent).children,
						c = false,
						i, j;
					for(i = 0, j = p.length; i < j; i += 1) {
						// separate IFs work whem o and l are the same
						if(p[i] === o) {
							c = !c;
						}
						if(p[i] === l) {
							c = !c;
						}
						if(!this.is_disabled(p[i]) && (c || p[i] === o || p[i] === l)) {
							if (!this.is_hidden(p[i])) {
								this.select_node(p[i], true, false, e);
							}
						}
						else {
							this.deselect_node(p[i], true, e);
						}
					}
					this.trigger('changed', { 'action' : 'select_node', 'node' : this.get_node(obj), 'selected' : this._data.core.selected, 'event' : e });
				}
				else {
					if(!this.is_selected(obj)) {
						this.select_node(obj, false, false, e);
					}
					else {
						this.deselect_node(obj, false, e);
					}
				}
			}
			/**
			 * triggered when an node is clicked or intercated with by the user
			 * @event
			 * @name activate_node.jstree
			 * @param {Object} node
			 * @param {Object} event the ooriginal event (if any) which triggered the call (may be an empty object)
			 */
			this.trigger('activate_node', { 'node' : this.get_node(obj), 'event' : e });
		},
		/**
		 * applies the hover state on a node, called when a node is hovered by the user. Used internally.
		 * @private
		 * @name hover_node(obj)
		 * @param {mixed} obj
		 * @trigger hover_node.jstree
		 */
		hover_node : function (obj) {
			obj = this.get_node(obj, true);
			if(!obj || !obj.length || obj.children('.jstree-hovered').length) {
				return false;
			}
			var o = this.element.find('.jstree-hovered'), t = this.element;
			if(o && o.length) { this.dehover_node(o); }

			obj.children('.jstree-anchor').addClass('jstree-hovered');
			/**
			 * triggered when an node is hovered
			 * @event
			 * @name hover_node.jstree
			 * @param {Object} node
			 */
			this.trigger('hover_node', { 'node' : this.get_node(obj) });
			setTimeout(function () { t.attr('aria-activedescendant', obj[0].id); }, 0);
		},
		/**
		 * removes the hover state from a nodecalled when a node is no longer hovered by the user. Used internally.
		 * @private
		 * @name dehover_node(obj)
		 * @param {mixed} obj
		 * @trigger dehover_node.jstree
		 */
		dehover_node : function (obj) {
			obj = this.get_node(obj, true);
			if(!obj || !obj.length || !obj.children('.jstree-hovered').length) {
				return false;
			}
			obj.children('.jstree-anchor').removeClass('jstree-hovered');
			/**
			 * triggered when an node is no longer hovered
			 * @event
			 * @name dehover_node.jstree
			 * @param {Object} node
			 */
			this.trigger('dehover_node', { 'node' : this.get_node(obj) });
		},
		/**
		 * select a node
		 * @name select_node(obj [, supress_event, prevent_open])
		 * @param {mixed} obj an array can be used to select multiple nodes
		 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
		 * @param {Boolean} prevent_open if set to `true` parents of the selected node won't be opened
		 * @trigger select_node.jstree, changed.jstree
		 */
		select_node : function (obj, supress_event, prevent_open, e) {
			var dom, t1, t2, th;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.select_node(obj[t1], supress_event, prevent_open, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(!obj.state.selected) {
				obj.state.selected = true;
				this._data.core.selected.push(obj.id);
				if(!prevent_open) {
					dom = this._open_to(obj);
				}
				if(dom && dom.length) {
					dom.children('.jstree-anchor').addClass('jstree-clicked').attr('aria-selected', true);
				}
				/**
				 * triggered when an node is selected
				 * @event
				 * @name select_node.jstree
				 * @param {Object} node
				 * @param {Array} selected the current selection
				 * @param {Object} event the event (if any) that triggered this select_node
				 */
				this.trigger('select_node', { 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				if(!supress_event) {
					/**
					 * triggered when selection changes
					 * @event
					 * @name changed.jstree
					 * @param {Object} node
					 * @param {Object} action the action that caused the selection to change
					 * @param {Array} selected the current selection
					 * @param {Object} event the event (if any) that triggered this changed event
					 */
					this.trigger('changed', { 'action' : 'select_node', 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				}
			}
		},
		/**
		 * deselect a node
		 * @name deselect_node(obj [, supress_event])
		 * @param {mixed} obj an array can be used to deselect multiple nodes
		 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
		 * @trigger deselect_node.jstree, changed.jstree
		 */
		deselect_node : function (obj, supress_event, e) {
			var t1, t2, dom;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.deselect_node(obj[t1], supress_event, e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(obj.state.selected) {
				obj.state.selected = false;
				this._data.core.selected = $.vakata.array_remove_item(this._data.core.selected, obj.id);
				if(dom.length) {
					dom.children('.jstree-anchor').removeClass('jstree-clicked').attr('aria-selected', false);
				}
				/**
				 * triggered when an node is deselected
				 * @event
				 * @name deselect_node.jstree
				 * @param {Object} node
				 * @param {Array} selected the current selection
				 * @param {Object} event the event (if any) that triggered this deselect_node
				 */
				this.trigger('deselect_node', { 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				if(!supress_event) {
					this.trigger('changed', { 'action' : 'deselect_node', 'node' : obj, 'selected' : this._data.core.selected, 'event' : e });
				}
			}
		},
		/**
		 * select all nodes in the tree
		 * @name select_all([supress_event])
		 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
		 * @trigger select_all.jstree, changed.jstree
		 */
		select_all : function (supress_event) {
			var tmp = this._data.core.selected.concat([]), i, j;
			this._data.core.selected = this._model.data[$.jstree.root].children_d.concat();
			for(i = 0, j = this._data.core.selected.length; i < j; i++) {
				if(this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = true;
				}
			}
			this.redraw(true);
			/**
			 * triggered when all nodes are selected
			 * @event
			 * @name select_all.jstree
			 * @param {Array} selected the current selection
			 */
			this.trigger('select_all', { 'selected' : this._data.core.selected });
			if(!supress_event) {
				this.trigger('changed', { 'action' : 'select_all', 'selected' : this._data.core.selected, 'old_selection' : tmp });
			}
		},
		/**
		 * deselect all selected nodes
		 * @name deselect_all([supress_event])
		 * @param {Boolean} supress_event if set to `true` the `changed.jstree` event won't be triggered
		 * @trigger deselect_all.jstree, changed.jstree
		 */
		deselect_all : function (supress_event) {
			var tmp = this._data.core.selected.concat([]), i, j;
			for(i = 0, j = this._data.core.selected.length; i < j; i++) {
				if(this._model.data[this._data.core.selected[i]]) {
					this._model.data[this._data.core.selected[i]].state.selected = false;
				}
			}
			this._data.core.selected = [];
			this.element.find('.jstree-clicked').removeClass('jstree-clicked').attr('aria-selected', false);
			/**
			 * triggered when all nodes are deselected
			 * @event
			 * @name deselect_all.jstree
			 * @param {Object} node the previous selection
			 * @param {Array} selected the current selection
			 */
			this.trigger('deselect_all', { 'selected' : this._data.core.selected, 'node' : tmp });
			if(!supress_event) {
				this.trigger('changed', { 'action' : 'deselect_all', 'selected' : this._data.core.selected, 'old_selection' : tmp });
			}
		},
		/**
		 * checks if a node is selected
		 * @name is_selected(obj)
		 * @param  {mixed}  obj
		 * @return {Boolean}
		 */
		is_selected : function (obj) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.state.selected;
		},
		/**
		 * get an array of all selected nodes
		 * @name get_selected([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 */
		get_selected : function (full) {
			return full ? $.map(this._data.core.selected, function (i) { return this.get_node(i); }.bind(this)) : this._data.core.selected.slice();
		},
		/**
		 * get an array of all top level selected nodes (ignoring children of selected nodes)
		 * @name get_top_selected([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 */
		get_top_selected : function (full) {
			var tmp = this.get_selected(true),
				obj = {}, i, j, k, l;
			for(i = 0, j = tmp.length; i < j; i++) {
				obj[tmp[i].id] = tmp[i];
			}
			for(i = 0, j = tmp.length; i < j; i++) {
				for(k = 0, l = tmp[i].children_d.length; k < l; k++) {
					if(obj[tmp[i].children_d[k]]) {
						delete obj[tmp[i].children_d[k]];
					}
				}
			}
			tmp = [];
			for(i in obj) {
				if(obj.hasOwnProperty(i)) {
					tmp.push(i);
				}
			}
			return full ? $.map(tmp, function (i) { return this.get_node(i); }.bind(this)) : tmp;
		},
		/**
		 * get an array of all bottom level selected nodes (ignoring selected parents)
		 * @name get_bottom_selected([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 */
		get_bottom_selected : function (full) {
			var tmp = this.get_selected(true),
				obj = [], i, j;
			for(i = 0, j = tmp.length; i < j; i++) {
				if(!tmp[i].children.length) {
					obj.push(tmp[i].id);
				}
			}
			return full ? $.map(obj, function (i) { return this.get_node(i); }.bind(this)) : obj;
		},
		/**
		 * gets the current state of the tree so that it can be restored later with `set_state(state)`. Used internally.
		 * @name get_state()
		 * @private
		 * @return {Object}
		 */
		get_state : function () {
			var state	= {
				'core' : {
					'open' : [],
					'loaded' : [],
					'scroll' : {
						'left' : this.element.scrollLeft(),
						'top' : this.element.scrollTop()
					},
					/*!
					'themes' : {
						'name' : this.get_theme(),
						'icons' : this._data.core.themes.icons,
						'dots' : this._data.core.themes.dots
					},
					*/
					'selected' : []
				}
			}, i;
			for(i in this._model.data) {
				if(this._model.data.hasOwnProperty(i)) {
					if(i !== $.jstree.root) {
						if(this._model.data[i].state.loaded && this.settings.core.loaded_state) {
							state.core.loaded.push(i);
						}
						if(this._model.data[i].state.opened) {
							state.core.open.push(i);
						}
						if(this._model.data[i].state.selected) {
							state.core.selected.push(i);
						}
					}
				}
			}
			return state;
		},
		/**
		 * sets the state of the tree. Used internally.
		 * @name set_state(state [, callback])
		 * @private
		 * @param {Object} state the state to restore. Keep in mind this object is passed by reference and jstree will modify it.
		 * @param {Function} callback an optional function to execute once the state is restored.
		 * @trigger set_state.jstree
		 */
		set_state : function (state, callback) {
			if(state) {
				if(state.core && state.core.selected && state.core.initial_selection === undefined) {
					state.core.initial_selection = this._data.core.selected.concat([]).sort().join(',');
				}
				if(state.core) {
					var res, n, t, _this, i;
					if(state.core.loaded) {
						if(!this.settings.core.loaded_state || !$.vakata.is_array(state.core.loaded) || !state.core.loaded.length) {
							delete state.core.loaded;
							this.set_state(state, callback);
						}
						else {
							this._load_nodes(state.core.loaded, function (nodes) {
								delete state.core.loaded;
								this.set_state(state, callback);
							});
						}
						return false;
					}
					if(state.core.open) {
						if(!$.vakata.is_array(state.core.open) || !state.core.open.length) {
							delete state.core.open;
							this.set_state(state, callback);
						}
						else {
							this._load_nodes(state.core.open, function (nodes) {
								this.open_node(nodes, false, 0);
								delete state.core.open;
								this.set_state(state, callback);
							});
						}
						return false;
					}
					if(state.core.scroll) {
						if(state.core.scroll && state.core.scroll.left !== undefined) {
							this.element.scrollLeft(state.core.scroll.left);
						}
						if(state.core.scroll && state.core.scroll.top !== undefined) {
							this.element.scrollTop(state.core.scroll.top);
						}
						delete state.core.scroll;
						this.set_state(state, callback);
						return false;
					}
					if(state.core.selected) {
						_this = this;
						if (state.core.initial_selection === undefined ||
							state.core.initial_selection === this._data.core.selected.concat([]).sort().join(',')
						) {
							this.deselect_all();
							$.each(state.core.selected, function (i, v) {
								_this.select_node(v, false, true);
							});
						}
						delete state.core.initial_selection;
						delete state.core.selected;
						this.set_state(state, callback);
						return false;
					}
					for(i in state) {
						if(state.hasOwnProperty(i) && i !== "core" && $.inArray(i, this.settings.plugins) === -1) {
							delete state[i];
						}
					}
					if($.isEmptyObject(state.core)) {
						delete state.core;
						this.set_state(state, callback);
						return false;
					}
				}
				if($.isEmptyObject(state)) {
					state = null;
					if(callback) { callback.call(this); }
					/**
					 * triggered when a `set_state` call completes
					 * @event
					 * @name set_state.jstree
					 */
					this.trigger('set_state');
					return false;
				}
				return true;
			}
			return false;
		},
		/**
		 * refreshes the tree - all nodes are reloaded with calls to `load_node`.
		 * @name refresh()
		 * @param {Boolean} skip_loading an option to skip showing the loading indicator
		 * @param {Mixed} forget_state if set to `true` state will not be reapplied, if set to a function (receiving the current state as argument) the result of that function will be used as state
		 * @trigger refresh.jstree
		 */
		refresh : function (skip_loading, forget_state) {
			this._data.core.state = forget_state === true ? {} : this.get_state();
			if(forget_state && $.vakata.is_function(forget_state)) { this._data.core.state = forget_state.call(this, this._data.core.state); }
			this._cnt = 0;
			this._model.data = {};
			this._model.data[$.jstree.root] = {
				id : $.jstree.root,
				parent : null,
				parents : [],
				children : [],
				children_d : [],
				state : { loaded : false }
			};
			this._data.core.selected = [];
			this._data.core.last_clicked = null;
			this._data.core.focused = null;

			var c = this.get_container_ul()[0].className;
			if(!skip_loading) {
				this.element.html("<"+"ul class='"+c+"' role='group'><"+"li class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='none' id='j"+this._id+"_loading'><i class='jstree-icon jstree-ocl'></i><"+"a class='jstree-anchor' role='treeitem' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
				this.element.attr('aria-activedescendant','j'+this._id+'_loading');
			}
			this.load_node($.jstree.root, function (o, s) {
				if(s) {
					this.get_container_ul()[0].className = c;
					if(this._firstChild(this.get_container_ul()[0])) {
						this.element.attr('aria-activedescendant',this._firstChild(this.get_container_ul()[0]).id);
					}
					this.set_state($.extend(true, {}, this._data.core.state), function () {
						/**
						 * triggered when a `refresh` call completes
						 * @event
						 * @name refresh.jstree
						 */
						this.trigger('refresh');
					});
				}
				this._data.core.state = null;
			});
		},
		/**
		 * refreshes a node in the tree (reload its children) all opened nodes inside that node are reloaded with calls to `load_node`.
		 * @name refresh_node(obj)
		 * @param  {mixed} obj the node
		 * @trigger refresh_node.jstree
		 */
		refresh_node : function (obj) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			var opened = [], to_load = [], s = this._data.core.selected.concat([]);
			to_load.push(obj.id);
			if(obj.state.opened === true) { opened.push(obj.id); }
			this.get_node(obj, true).find('.jstree-open').each(function() { to_load.push(this.id); opened.push(this.id); });
			this._load_nodes(to_load, function (nodes) {
				this.open_node(opened, false, 0);
				this.select_node(s);
				/**
				 * triggered when a node is refreshed
				 * @event
				 * @name refresh_node.jstree
				 * @param {Object} node - the refreshed node
				 * @param {Array} nodes - an array of the IDs of the nodes that were reloaded
				 */
				this.trigger('refresh_node', { 'node' : obj, 'nodes' : nodes });
			}.bind(this), false, true);
		},
		/**
		 * set (change) the ID of a node
		 * @name set_id(obj, id)
		 * @param  {mixed} obj the node
		 * @param  {String} id the new ID
		 * @return {Boolean}
		 * @trigger set_id.jstree
		 */
		set_id : function (obj, id) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			var i, j, m = this._model.data, old = obj.id;
			id = id.toString();
			// update parents (replace current ID with new one in children and children_d)
			m[obj.parent].children[$.inArray(obj.id, m[obj.parent].children)] = id;
			for(i = 0, j = obj.parents.length; i < j; i++) {
				m[obj.parents[i]].children_d[$.inArray(obj.id, m[obj.parents[i]].children_d)] = id;
			}
			// update children (replace current ID with new one in parent and parents)
			for(i = 0, j = obj.children.length; i < j; i++) {
				m[obj.children[i]].parent = id;
			}
			for(i = 0, j = obj.children_d.length; i < j; i++) {
				m[obj.children_d[i]].parents[$.inArray(obj.id, m[obj.children_d[i]].parents)] = id;
			}
			i = $.inArray(obj.id, this._data.core.selected);
			if(i !== -1) { this._data.core.selected[i] = id; }
			// update model and obj itself (obj.id, this._model.data[KEY])
			i = this.get_node(obj.id, true);
			if(i) {
				i.attr('id', id); //.children('.jstree-anchor').attr('id', id + '_anchor').end().attr('aria-labelledby', id + '_anchor');
				if(this.element.attr('aria-activedescendant') === obj.id) {
					this.element.attr('aria-activedescendant', id);
				}
			}
			delete m[obj.id];
			obj.id = id;
			obj.li_attr.id = id;
			m[id] = obj;
			/**
			 * triggered when a node id value is changed
			 * @event
			 * @name set_id.jstree
			 * @param {Object} node
			 * @param {String} old the old id
			 */
			this.trigger('set_id',{ "node" : obj, "new" : obj.id, "old" : old });
			return true;
		},
		/**
		 * get the text value of a node
		 * @name get_text(obj)
		 * @param  {mixed} obj the node
		 * @return {String}
		 */
		get_text : function (obj) {
			obj = this.get_node(obj);
			return (!obj || obj.id === $.jstree.root) ? false : obj.text;
		},
		/**
		 * set the text value of a node. Used internally, please use `rename_node(obj, val)`.
		 * @private
		 * @name set_text(obj, val)
		 * @param  {mixed} obj the node, you can pass an array to set the text on multiple nodes
		 * @param  {String} val the new text value
		 * @return {Boolean}
		 * @trigger set_text.jstree
		 */
		set_text : function (obj, val) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_text(obj[t1], val);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			obj.text = val;
			if(this.get_node(obj, true).length) {
				this.redraw_node(obj.id);
			}
			/**
			 * triggered when a node text value is changed
			 * @event
			 * @name set_text.jstree
			 * @param {Object} obj
			 * @param {String} text the new value
			 */
			this.trigger('set_text',{ "obj" : obj, "text" : val });
			return true;
		},
		/**
		 * gets a JSON representation of a node (or the whole tree)
		 * @name get_json([obj, options])
		 * @param  {mixed} obj
		 * @param  {Object} options
		 * @param  {Boolean} options.no_state do not return state information
		 * @param  {Boolean} options.no_id do not return ID
		 * @param  {Boolean} options.no_children do not include children
		 * @param  {Boolean} options.no_data do not include node data
		 * @param  {Boolean} options.no_li_attr do not include LI attributes
		 * @param  {Boolean} options.no_a_attr do not include A attributes
		 * @param  {Boolean} options.flat return flat JSON instead of nested
		 * @return {Object}
		 */
		get_json : function (obj, options, flat) {
			obj = this.get_node(obj || $.jstree.root);
			if(!obj) { return false; }
			if(options && options.flat && !flat) { flat = []; }
			var tmp = {
				'id' : obj.id,
				'text' : obj.text,
				'icon' : this.get_icon(obj),
				'li_attr' : $.extend(true, {}, obj.li_attr),
				'a_attr' : $.extend(true, {}, obj.a_attr),
				'state' : {},
				'data' : options && options.no_data ? false : $.extend(true, $.vakata.is_array(obj.data)?[]:{}, obj.data)
				//( this.get_node(obj, true).length ? this.get_node(obj, true).data() : obj.data ),
			}, i, j;
			if(options && options.flat) {
				tmp.parent = obj.parent;
			}
			else {
				tmp.children = [];
			}
			if(!options || !options.no_state) {
				for(i in obj.state) {
					if(obj.state.hasOwnProperty(i)) {
						tmp.state[i] = obj.state[i];
					}
				}
			} else {
				delete tmp.state;
			}
			if(options && options.no_li_attr) {
				delete tmp.li_attr;
			}
			if(options && options.no_a_attr) {
				delete tmp.a_attr;
			}
			if(options && options.no_id) {
				delete tmp.id;
				if(tmp.li_attr && tmp.li_attr.id) {
					delete tmp.li_attr.id;
				}
				if(tmp.a_attr && tmp.a_attr.id) {
					delete tmp.a_attr.id;
				}
			}
			if(options && options.flat && obj.id !== $.jstree.root) {
				flat.push(tmp);
			}
			if(!options || !options.no_children) {
				for(i = 0, j = obj.children.length; i < j; i++) {
					if(options && options.flat) {
						this.get_json(obj.children[i], options, flat);
					}
					else {
						tmp.children.push(this.get_json(obj.children[i], options));
					}
				}
			}
			return options && options.flat ? flat : (obj.id === $.jstree.root ? tmp.children : tmp);
		},
		/**
		 * create a new node (do not confuse with load_node)
		 * @name create_node([par, node, pos, callback, is_loaded])
		 * @param  {mixed}   par       the parent node (to create a root node use either "#" (string) or `null`)
		 * @param  {mixed}   node      the data for the new node (a valid JSON object, or a simple string with the name)
		 * @param  {mixed}   pos       the index at which to insert the node, "first" and "last" are also supported, default is "last"
		 * @param  {Function} callback a function to be called once the node is created
		 * @param  {Boolean} is_loaded internal argument indicating if the parent node was succesfully loaded
		 * @return {String}            the ID of the newly create node
		 * @trigger model.jstree, create_node.jstree
		 */
		create_node : function (par, node, pos, callback, is_loaded) {
			if(par === null) { par = $.jstree.root; }
			par = this.get_node(par);
			if(!par) { return false; }
			pos = pos === undefined ? "last" : pos;
			if(!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () { this.create_node(par, node, pos, callback, true); });
			}
			if(!node) { node = { "text" : this.get_string('New node') }; }
			if(typeof node === "string") {
				node = { "text" : node };
			} else {
				node = $.extend(true, {}, node);
			}
			if(node.text === undefined) { node.text = this.get_string('New node'); }
			var tmp, dpc, i, j;

			if(par.id === $.jstree.root) {
				if(pos === "before") { pos = "first"; }
				if(pos === "after") { pos = "last"; }
			}
			switch(pos) {
				case "before":
					tmp = this.get_node(par.parent);
					pos = $.inArray(par.id, tmp.children);
					par = tmp;
					break;
				case "after" :
					tmp = this.get_node(par.parent);
					pos = $.inArray(par.id, tmp.children) + 1;
					par = tmp;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = par.children.length;
					break;
				default:
					if(!pos) { pos = 0; }
					break;
			}
			if(pos > par.children.length) { pos = par.children.length; }
			if(!node.id) { node.id = true; }
			if(!this.check("create_node", node, par, pos)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if(node.id === true) { delete node.id; }
			node = this._parse_model_from_json(node, par.id, par.parents.concat());
			if(!node) { return false; }
			tmp = this.get_node(node);
			dpc = [];
			dpc.push(node);
			dpc = dpc.concat(tmp.children_d);
			this.trigger('model', { "nodes" : dpc, "parent" : par.id });

			par.children_d = par.children_d.concat(dpc);
			for(i = 0, j = par.parents.length; i < j; i++) {
				this._model.data[par.parents[i]].children_d = this._model.data[par.parents[i]].children_d.concat(dpc);
			}
			node = tmp;
			tmp = [];
			for(i = 0, j = par.children.length; i < j; i++) {
				tmp[i >= pos ? i+1 : i] = par.children[i];
			}
			tmp[pos] = node.id;
			par.children = tmp;

			this.redraw_node(par, true);
			/**
			 * triggered when a node is created
			 * @event
			 * @name create_node.jstree
			 * @param {Object} node
			 * @param {String} parent the parent's ID
			 * @param {Number} position the position of the new node among the parent's children
			 */
			this.trigger('create_node', { "node" : this.get_node(node), "parent" : par.id, "position" : pos });
			if(callback) { callback.call(this, this.get_node(node)); }
			return node.id;
		},
		/**
		 * set the text value of a node
		 * @name rename_node(obj, val)
		 * @param  {mixed} obj the node, you can pass an array to rename multiple nodes to the same name
		 * @param  {String} val the new text value
		 * @return {Boolean}
		 * @trigger rename_node.jstree
		 */
		rename_node : function (obj, val) {
			var t1, t2, old;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.rename_node(obj[t1], val);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			old = obj.text;
			if(!this.check("rename_node", obj, this.get_parent(obj), val)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			this.set_text(obj, val); // .apply(this, Array.prototype.slice.call(arguments))
			/**
			 * triggered when a node is renamed
			 * @event
			 * @name rename_node.jstree
			 * @param {Object} node
			 * @param {String} text the new value
			 * @param {String} old the old value
			 */
			this.trigger('rename_node', { "node" : obj, "text" : val, "old" : old });
			return true;
		},
		/**
		 * remove a node
		 * @name delete_node(obj)
		 * @param  {mixed} obj the node, you can pass an array to delete multiple nodes
		 * @return {Boolean}
		 * @trigger delete_node.jstree, changed.jstree
		 */
		delete_node : function (obj) {
			var t1, t2, par, pos, tmp, i, j, k, l, c, top, lft;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.delete_node(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			par = this.get_node(obj.parent);
			pos = $.inArray(obj.id, par.children);
			c = false;
			if(!this.check("delete_node", obj, par, pos)) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if(pos !== -1) {
				par.children = $.vakata.array_remove(par.children, pos);
			}
			tmp = obj.children_d.concat([]);
			tmp.push(obj.id);
			for(i = 0, j = obj.parents.length; i < j; i++) {
				this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
					return $.inArray(v, tmp) === -1;
				});
			}
			for(k = 0, l = tmp.length; k < l; k++) {
				if(this._model.data[tmp[k]].state.selected) {
					c = true;
					break;
				}
			}
			if (c) {
				this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
					return $.inArray(v, tmp) === -1;
				});
			}
			/**
			 * triggered when a node is deleted
			 * @event
			 * @name delete_node.jstree
			 * @param {Object} node
			 * @param {String} parent the parent's ID
			 */
			this.trigger('delete_node', { "node" : obj, "parent" : par.id });
			if(c) {
				this.trigger('changed', { 'action' : 'delete_node', 'node' : obj, 'selected' : this._data.core.selected, 'parent' : par.id });
			}
			for(k = 0, l = tmp.length; k < l; k++) {
				delete this._model.data[tmp[k]];
			}
			if($.inArray(this._data.core.focused, tmp) !== -1) {
				this._data.core.focused = null;
				top = this.element[0].scrollTop;
				lft = this.element[0].scrollLeft;
				if(par.id === $.jstree.root) {
					if (this._model.data[$.jstree.root].children[0]) {
						this.get_node(this._model.data[$.jstree.root].children[0], true).children('.jstree-anchor').triger('focus');
					}
				}
				else {
					this.get_node(par, true).children('.jstree-anchor').trigger('focus');
				}
				this.element[0].scrollTop  = top;
				this.element[0].scrollLeft = lft;
			}
			this.redraw_node(par, true);
			return true;
		},
		/**
		 * check if an operation is premitted on the tree. Used internally.
		 * @private
		 * @name check(chk, obj, par, pos)
		 * @param  {String} chk the operation to check, can be "create_node", "rename_node", "delete_node", "copy_node" or "move_node"
		 * @param  {mixed} obj the node
		 * @param  {mixed} par the parent
		 * @param  {mixed} pos the position to insert at, or if "rename_node" - the new name
		 * @param  {mixed} more some various additional information, for example if a "move_node" operations is triggered by DND this will be the hovered node
		 * @return {Boolean}
		 */
		check : function (chk, obj, par, pos, more) {
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			var tmp = chk.match(/^move_node|copy_node|create_node$/i) ? par : obj,
				chc = this.settings.core.check_callback;
			if(chk === "move_node" || chk === "copy_node") {
				if((!more || !more.is_multi) && (chk === "move_node" && $.inArray(obj.id, par.children) === pos)) {
					this._data.core.last_error = { 'error' : 'check', 'plugin' : 'core', 'id' : 'core_08', 'reason' : 'Moving node to its current position', 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					return false;
				}
				if((!more || !more.is_multi) && (obj.id === par.id || (chk === "move_node" && $.inArray(obj.id, par.children) === pos) || $.inArray(par.id, obj.children_d) !== -1)) {
					this._data.core.last_error = { 'error' : 'check', 'plugin' : 'core', 'id' : 'core_01', 'reason' : 'Moving parent inside child', 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					return false;
				}
			}
			if(tmp && tmp.data) { tmp = tmp.data; }
			if(tmp && tmp.functions && (tmp.functions[chk] === false || tmp.functions[chk] === true)) {
				if(tmp.functions[chk] === false) {
					this._data.core.last_error = { 'error' : 'check', 'plugin' : 'core', 'id' : 'core_02', 'reason' : 'Node data prevents function: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
				}
				return tmp.functions[chk];
			}
			if(chc === false || ($.vakata.is_function(chc) && chc.call(this, chk, obj, par, pos, more) === false) || (chc && chc[chk] === false)) {
				this._data.core.last_error = { 'error' : 'check', 'plugin' : 'core', 'id' : 'core_03', 'reason' : 'User config for core.check_callback prevents function: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
				return false;
			}
			return true;
		},
		/**
		 * get the last error
		 * @name last_error()
		 * @return {Object}
		 */
		last_error : function () {
			return this._data.core.last_error;
		},
		/**
		 * move a node to a new parent
		 * @name move_node(obj, par [, pos, callback, is_loaded])
		 * @param  {mixed} obj the node to move, pass an array to move multiple nodes
		 * @param  {mixed} par the new parent
		 * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
		 * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
		 * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
		 * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
		 * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
		 * @trigger move_node.jstree
		 */
		move_node : function (obj, par, pos, callback, is_loaded, skip_redraw, origin) {
			var t1, t2, old_par, old_pos, new_par, old_ins, is_multi, dpc, tmp, i, j, k, l, p;

			par = this.get_node(par);
			pos = pos === undefined ? 0 : pos;
			if(!par) { return false; }
			if(!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () { this.move_node(obj, par, pos, callback, true, false, origin); });
			}

			if($.vakata.is_array(obj)) {
				if(obj.length === 1) {
					obj = obj[0];
				}
				else {
					//obj = obj.slice();
					for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						if((tmp = this.move_node(obj[t1], par, pos, callback, is_loaded, false, origin))) {
							par = tmp;
							pos = "after";
						}
					}
					this.redraw();
					return true;
				}
			}
			obj = obj && obj.id ? obj : this.get_node(obj);

			if(!obj || obj.id === $.jstree.root) { return false; }

			old_par = (obj.parent || $.jstree.root).toString();
			new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
			old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
			is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);
			old_pos = old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1;
			if(old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if(is_multi) {
				if((tmp = this.copy_node(obj, par, pos, callback, is_loaded, false, origin))) {
					if(old_ins) { old_ins.delete_node(obj); }
					return tmp;
				}
				return false;
			}
			//var m = this._model.data;
			if(par.id === $.jstree.root) {
				if(pos === "before") { pos = "first"; }
				if(pos === "after") { pos = "last"; }
			}
			switch(pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after" :
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if(!pos) { pos = 0; }
					break;
			}
			if(pos > new_par.children.length) { pos = new_par.children.length; }
			if(!this.check("move_node", obj, new_par, pos, { 'core' : true, 'origin' : origin, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id) })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if(obj.parent === new_par.id) {
				dpc = new_par.children.concat();
				tmp = $.inArray(obj.id, dpc);
				if(tmp !== -1) {
					dpc = $.vakata.array_remove(dpc, tmp);
					if(pos > tmp) { pos--; }
				}
				tmp = [];
				for(i = 0, j = dpc.length; i < j; i++) {
					tmp[i >= pos ? i+1 : i] = dpc[i];
				}
				tmp[pos] = obj.id;
				new_par.children = tmp;
				this._node_changed(new_par.id);
				this.redraw(new_par.id === $.jstree.root);
			}
			else {
				// clean old parent and up
				tmp = obj.children_d.concat();
				tmp.push(obj.id);
				for(i = 0, j = obj.parents.length; i < j; i++) {
					dpc = [];
					p = old_ins._model.data[obj.parents[i]].children_d;
					for(k = 0, l = p.length; k < l; k++) {
						if($.inArray(p[k], tmp) === -1) {
							dpc.push(p[k]);
						}
					}
					old_ins._model.data[obj.parents[i]].children_d = dpc;
				}
				old_ins._model.data[old_par].children = $.vakata.array_remove_item(old_ins._model.data[old_par].children, obj.id);

				// insert into new parent and up
				for(i = 0, j = new_par.parents.length; i < j; i++) {
					this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(tmp);
				}
				dpc = [];
				for(i = 0, j = new_par.children.length; i < j; i++) {
					dpc[i >= pos ? i+1 : i] = new_par.children[i];
				}
				dpc[pos] = obj.id;
				new_par.children = dpc;
				new_par.children_d.push(obj.id);
				new_par.children_d = new_par.children_d.concat(obj.children_d);

				// update object
				obj.parent = new_par.id;
				tmp = new_par.parents.concat();
				tmp.unshift(new_par.id);
				p = obj.parents.length;
				obj.parents = tmp;

				// update object children
				tmp = tmp.concat();
				for(i = 0, j = obj.children_d.length; i < j; i++) {
					this._model.data[obj.children_d[i]].parents = this._model.data[obj.children_d[i]].parents.slice(0,p*-1);
					Array.prototype.push.apply(this._model.data[obj.children_d[i]].parents, tmp);
				}

				if(old_par === $.jstree.root || new_par.id === $.jstree.root) {
					this._model.force_full_redraw = true;
				}
				if(!this._model.force_full_redraw) {
					this._node_changed(old_par);
					this._node_changed(new_par.id);
				}
				if(!skip_redraw) {
					this.redraw();
				}
			}
			if(callback) { callback.call(this, obj, new_par, pos); }
			/**
			 * triggered when a node is moved
			 * @event
			 * @name move_node.jstree
			 * @param {Object} node
			 * @param {String} parent the parent's ID
			 * @param {Number} position the position of the node among the parent's children
			 * @param {String} old_parent the old parent of the node
			 * @param {Number} old_position the old position of the node
			 * @param {Boolean} is_multi do the node and new parent belong to different instances
			 * @param {jsTree} old_instance the instance the node came from
			 * @param {jsTree} new_instance the instance of the new parent
			 */
			this.trigger('move_node', { "node" : obj, "parent" : new_par.id, "position" : pos, "old_parent" : old_par, "old_position" : old_pos, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id), 'old_instance' : old_ins, 'new_instance' : this });
			return obj.id;
		},
		/**
		 * copy a node to a new parent
		 * @name copy_node(obj, par [, pos, callback, is_loaded])
		 * @param  {mixed} obj the node to copy, pass an array to copy multiple nodes
		 * @param  {mixed} par the new parent
		 * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
		 * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
		 * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
		 * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
		 * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
		 * @trigger model.jstree copy_node.jstree
		 */
		copy_node : function (obj, par, pos, callback, is_loaded, skip_redraw, origin) {
			var t1, t2, dpc, tmp, i, j, node, old_par, new_par, old_ins, is_multi;

			par = this.get_node(par);
			pos = pos === undefined ? 0 : pos;
			if(!par) { return false; }
			if(!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () { this.copy_node(obj, par, pos, callback, true, false, origin); });
			}

			if($.vakata.is_array(obj)) {
				if(obj.length === 1) {
					obj = obj[0];
				}
				else {
					//obj = obj.slice();
					for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						if((tmp = this.copy_node(obj[t1], par, pos, callback, is_loaded, true, origin))) {
							par = tmp;
							pos = "after";
						}
					}
					this.redraw();
					return true;
				}
			}
			obj = obj && obj.id ? obj : this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }

			old_par = (obj.parent || $.jstree.root).toString();
			new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
			old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
			is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);

			if(old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if(par.id === $.jstree.root) {
				if(pos === "before") { pos = "first"; }
				if(pos === "after") { pos = "last"; }
			}
			switch(pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after" :
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if(!pos) { pos = 0; }
					break;
			}
			if(pos > new_par.children.length) { pos = new_par.children.length; }
			if(!this.check("copy_node", obj, new_par, pos, { 'core' : true, 'origin' : origin, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id) })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			node = old_ins ? old_ins.get_json(obj, { no_id : true, no_data : true, no_state : true }) : obj;
			if(!node) { return false; }
			if(node.id === true) { delete node.id; }
			node = this._parse_model_from_json(node, new_par.id, new_par.parents.concat());
			if(!node) { return false; }
			tmp = this.get_node(node);
			if(obj && obj.state && obj.state.loaded === false) { tmp.state.loaded = false; }
			dpc = [];
			dpc.push(node);
			dpc = dpc.concat(tmp.children_d);
			this.trigger('model', { "nodes" : dpc, "parent" : new_par.id });

			// insert into new parent and up
			for(i = 0, j = new_par.parents.length; i < j; i++) {
				this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(dpc);
			}
			dpc = [];
			for(i = 0, j = new_par.children.length; i < j; i++) {
				dpc[i >= pos ? i+1 : i] = new_par.children[i];
			}
			dpc[pos] = tmp.id;
			new_par.children = dpc;
			new_par.children_d.push(tmp.id);
			new_par.children_d = new_par.children_d.concat(tmp.children_d);

			if(new_par.id === $.jstree.root) {
				this._model.force_full_redraw = true;
			}
			if(!this._model.force_full_redraw) {
				this._node_changed(new_par.id);
			}
			if(!skip_redraw) {
				this.redraw(new_par.id === $.jstree.root);
			}
			if(callback) { callback.call(this, tmp, new_par, pos); }
			/**
			 * triggered when a node is copied
			 * @event
			 * @name copy_node.jstree
			 * @param {Object} node the copied node
			 * @param {Object} original the original node
			 * @param {String} parent the parent's ID
			 * @param {Number} position the position of the node among the parent's children
			 * @param {String} old_parent the old parent of the node
			 * @param {Number} old_position the position of the original node
			 * @param {Boolean} is_multi do the node and new parent belong to different instances
			 * @param {jsTree} old_instance the instance the node came from
			 * @param {jsTree} new_instance the instance of the new parent
			 */
			this.trigger('copy_node', { "node" : tmp, "original" : obj, "parent" : new_par.id, "position" : pos, "old_parent" : old_par, "old_position" : old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1,'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id), 'old_instance' : old_ins, 'new_instance' : this });
			return tmp.id;
		},
		/**
		 * cut a node (a later call to `paste(obj)` would move the node)
		 * @name cut(obj)
		 * @param  {mixed} obj multiple objects can be passed using an array
		 * @trigger cut.jstree
		 */
		cut : function (obj) {
			if(!obj) { obj = this._data.core.selected.concat(); }
			if(!$.vakata.is_array(obj)) { obj = [obj]; }
			if(!obj.length) { return false; }
			var tmp = [], o, t1, t2;
			for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
				o = this.get_node(obj[t1]);
				if(o && o.id && o.id !== $.jstree.root) { tmp.push(o); }
			}
			if(!tmp.length) { return false; }
			ccp_node = tmp;
			ccp_inst = this;
			ccp_mode = 'move_node';
			/**
			 * triggered when nodes are added to the buffer for moving
			 * @event
			 * @name cut.jstree
			 * @param {Array} node
			 */
			this.trigger('cut', { "node" : obj });
		},
		/**
		 * copy a node (a later call to `paste(obj)` would copy the node)
		 * @name copy(obj)
		 * @param  {mixed} obj multiple objects can be passed using an array
		 * @trigger copy.jstree
		 */
		copy : function (obj) {
			if(!obj) { obj = this._data.core.selected.concat(); }
			if(!$.vakata.is_array(obj)) { obj = [obj]; }
			if(!obj.length) { return false; }
			var tmp = [], o, t1, t2;
			for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
				o = this.get_node(obj[t1]);
				if(o && o.id && o.id !== $.jstree.root) { tmp.push(o); }
			}
			if(!tmp.length) { return false; }
			ccp_node = tmp;
			ccp_inst = this;
			ccp_mode = 'copy_node';
			/**
			 * triggered when nodes are added to the buffer for copying
			 * @event
			 * @name copy.jstree
			 * @param {Array} node
			 */
			this.trigger('copy', { "node" : obj });
		},
		/**
		 * get the current buffer (any nodes that are waiting for a paste operation)
		 * @name get_buffer()
		 * @return {Object} an object consisting of `mode` ("copy_node" or "move_node"), `node` (an array of objects) and `inst` (the instance)
		 */
		get_buffer : function () {
			return { 'mode' : ccp_mode, 'node' : ccp_node, 'inst' : ccp_inst };
		},
		/**
		 * check if there is something in the buffer to paste
		 * @name can_paste()
		 * @return {Boolean}
		 */
		can_paste : function () {
			return ccp_mode !== false && ccp_node !== false; // && ccp_inst._model.data[ccp_node];
		},
		/**
		 * copy or move the previously cut or copied nodes to a new parent
		 * @name paste(obj [, pos])
		 * @param  {mixed} obj the new parent
		 * @param  {mixed} pos the position to insert at (besides integer, "first" and "last" are supported), defaults to integer `0`
		 * @trigger paste.jstree
		 */
		paste : function (obj, pos) {
			obj = this.get_node(obj);
			if(!obj || !ccp_mode || !ccp_mode.match(/^(copy_node|move_node)$/) || !ccp_node) { return false; }
			if(this[ccp_mode](ccp_node, obj, pos, false, false, false, ccp_inst)) {
				/**
				 * triggered when paste is invoked
				 * @event
				 * @name paste.jstree
				 * @param {String} parent the ID of the receiving node
				 * @param {Array} node the nodes in the buffer
				 * @param {String} mode the performed operation - "copy_node" or "move_node"
				 */
				this.trigger('paste', { "parent" : obj.id, "node" : ccp_node, "mode" : ccp_mode });
			}
			ccp_node = false;
			ccp_mode = false;
			ccp_inst = false;
		},
		/**
		 * clear the buffer of previously copied or cut nodes
		 * @name clear_buffer()
		 * @trigger clear_buffer.jstree
		 */
		clear_buffer : function () {
			ccp_node = false;
			ccp_mode = false;
			ccp_inst = false;
			/**
			 * triggered when the copy / cut buffer is cleared
			 * @event
			 * @name clear_buffer.jstree
			 */
			this.trigger('clear_buffer');
		},
		/**
		 * put a node in edit mode (input field to rename the node)
		 * @name edit(obj [, default_text, callback])
		 * @param  {mixed} obj
		 * @param  {String} default_text the text to populate the input with (if omitted or set to a non-string value the node's text value is used)
		 * @param  {Function} callback a function to be called once the text box is blurred, it is called in the instance's scope and receives the node, a status parameter (true if the rename is successful, false otherwise), a boolean indicating if the user cancelled the edit and the original unescaped value provided by the user. You can also access the node's title using .text
		 */
		edit : function (obj, default_text, callback) {
			var rtl, w, a, s, t, h1, h2, fn, tmp, cancel = false;
			obj = this.get_node(obj);
			if(!obj) { return false; }
			if(!this.check("edit", obj, this.get_parent(obj))) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			tmp = obj;
			default_text = typeof default_text === 'string' ? default_text : obj.text;
			this.set_text(obj, "");
			obj = this._open_to(obj);
			tmp.text = default_text;

			rtl = this._data.core.rtl;
			w  = this.element.width();
			this._data.core.focused = tmp.id;
			a  = obj.children('.jstree-anchor').trigger('focus');
			s  = $('<span></span>');
			/*!
			oi = obj.children("i:visible"),
			ai = a.children("i:visible"),
			w1 = oi.width() * oi.length,
			w2 = ai.width() * ai.length,
			*/
			t  = default_text;
			h1 = $("<"+"div></div>", { css : { "position" : "absolute", "top" : "-200px", "left" : (rtl ? "0px" : "-1000px"), "visibility" : "hidden" } }).appendTo(document.body);
			h2 = $("<"+"input />", {
						"value" : t,
						"class" : "jstree-rename-input",
						// "size" : t.length,
						"css" : {
							"padding" : "0",
							"border" : "1px solid silver",
							"box-sizing" : "border-box",
							"display" : "inline-block",
							"height" : (this._data.core.li_height) + "px",
							"lineHeight" : (this._data.core.li_height) + "px",
							"width" : "150px" // will be set a bit further down
						},
						"blur" : function (e) {
							e.stopImmediatePropagation();
							e.preventDefault();
							var i = s.children(".jstree-rename-input"),
								v = i.val(),
								f = this.settings.core.force_text,
								nv;
							if(v === "") { v = t; }
							h1.remove();
							s.replaceWith(a);
							s.remove();
							t = f ? t : $('<div></div>').append($.parseHTML(t)).html();
							obj = this.get_node(obj);
							this.set_text(obj, t);
							nv = !!this.rename_node(obj, f ? $('<div></div>').text(v).text() : $('<div></div>').append($.parseHTML(v)).html());
							if(!nv) {
								this.set_text(obj, t); // move this up? and fix #483
							}
							this._data.core.focused = tmp.id;
							setTimeout(function () {
								var node = this.get_node(tmp.id, true);
								if(node.length) {
									this._data.core.focused = tmp.id;
									node.children('.jstree-anchor').trigger('focus');
								}
							}.bind(this), 0);
							if(callback) {
								callback.call(this, tmp, nv, cancel, v);
							}
							h2 = null;
						}.bind(this),
						"keydown" : function (e) {
							var key = e.which;
							if(key === 27) {
								cancel = true;
								this.value = t;
							}
							if(key === 27 || key === 13 || key === 37 || key === 38 || key === 39 || key === 40 || key === 32) {
								e.stopImmediatePropagation();
							}
							if(key === 27 || key === 13) {
								e.preventDefault();
								this.blur();
							}
						},
						"click" : function (e) { e.stopImmediatePropagation(); },
						"mousedown" : function (e) { e.stopImmediatePropagation(); },
						"keyup" : function (e) {
							h2.width(Math.min(h1.text("pW" + this.value).width(),w));
						},
						"keypress" : function(e) {
							if(e.which === 13) { return false; }
						}
					});
				fn = {
						fontFamily		: a.css('fontFamily')		|| '',
						fontSize		: a.css('fontSize')			|| '',
						fontWeight		: a.css('fontWeight')		|| '',
						fontStyle		: a.css('fontStyle')		|| '',
						fontStretch		: a.css('fontStretch')		|| '',
						fontVariant		: a.css('fontVariant')		|| '',
						letterSpacing	: a.css('letterSpacing')	|| '',
						wordSpacing		: a.css('wordSpacing')		|| ''
				};
			s.attr('class', a.attr('class')).append(a.contents().clone()).append(h2);
			a.replaceWith(s);
			h1.css(fn);
			h2.css(fn).width(Math.min(h1.text("pW" + h2[0].value).width(),w))[0].select();
			$(document).one('mousedown.jstree touchstart.jstree dnd_start.vakata', function (e) {
				if (h2 && e.target !== h2) {
					$(h2).trigger('blur');
				}
			});
		},


		/**
		 * changes the theme
		 * @name set_theme(theme_name [, theme_url])
		 * @param {String} theme_name the name of the new theme to apply
		 * @param {mixed} theme_url  the location of the CSS file for this theme. Omit or set to `false` if you manually included the file. Set to `true` to autoload from the `core.themes.dir` directory.
		 * @trigger set_theme.jstree
		 */
		set_theme : function (theme_name, theme_url) {
			if(!theme_name) { return false; }
			if(theme_url === true) {
				var dir = this.settings.core.themes.dir;
				if(!dir) { dir = $.jstree.path + '/themes'; }
				theme_url = dir + '/' + theme_name + '/style.css';
			}
			if(theme_url && $.inArray(theme_url, themes_loaded) === -1) {
				$('head').append('<'+'link rel="stylesheet" href="' + theme_url + '" type="text/css" />');
				themes_loaded.push(theme_url);
			}
			if(this._data.core.themes.name) {
				this.element.removeClass('jstree-' + this._data.core.themes.name);
			}
			this._data.core.themes.name = theme_name;
			this.element.addClass('jstree-' + theme_name);
			this.element[this.settings.core.themes.responsive ? 'addClass' : 'removeClass' ]('jstree-' + theme_name + '-responsive');
			/**
			 * triggered when a theme is set
			 * @event
			 * @name set_theme.jstree
			 * @param {String} theme the new theme
			 */
			this.trigger('set_theme', { 'theme' : theme_name });
		},
		/**
		 * gets the name of the currently applied theme name
		 * @name get_theme()
		 * @return {String}
		 */
		get_theme : function () { return this._data.core.themes.name; },
		/**
		 * changes the theme variant (if the theme has variants)
		 * @name set_theme_variant(variant_name)
		 * @param {String|Boolean} variant_name the variant to apply (if `false` is used the current variant is removed)
		 */
		set_theme_variant : function (variant_name) {
			if(this._data.core.themes.variant) {
				this.element.removeClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
			this._data.core.themes.variant = variant_name;
			if(variant_name) {
				this.element.addClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
		},
		/**
		 * gets the name of the currently applied theme variant
		 * @name get_theme()
		 * @return {String}
		 */
		get_theme_variant : function () { return this._data.core.themes.variant; },
		/**
		 * shows a striped background on the container (if the theme supports it)
		 * @name show_stripes()
		 */
		show_stripes : function () {
			this._data.core.themes.stripes = true;
			this.get_container_ul().addClass("jstree-striped");
			/**
			 * triggered when stripes are shown
			 * @event
			 * @name show_stripes.jstree
			 */
			this.trigger('show_stripes');
		},
		/**
		 * hides the striped background on the container
		 * @name hide_stripes()
		 */
		hide_stripes : function () {
			this._data.core.themes.stripes = false;
			this.get_container_ul().removeClass("jstree-striped");
			/**
			 * triggered when stripes are hidden
			 * @event
			 * @name hide_stripes.jstree
			 */
			this.trigger('hide_stripes');
		},
		/**
		 * toggles the striped background on the container
		 * @name toggle_stripes()
		 */
		toggle_stripes : function () { if(this._data.core.themes.stripes) { this.hide_stripes(); } else { this.show_stripes(); } },
		/**
		 * shows the connecting dots (if the theme supports it)
		 * @name show_dots()
		 */
		show_dots : function () {
			this._data.core.themes.dots = true;
			this.get_container_ul().removeClass("jstree-no-dots");
			/**
			 * triggered when dots are shown
			 * @event
			 * @name show_dots.jstree
			 */
			this.trigger('show_dots');
		},
		/**
		 * hides the connecting dots
		 * @name hide_dots()
		 */
		hide_dots : function () {
			this._data.core.themes.dots = false;
			this.get_container_ul().addClass("jstree-no-dots");
			/**
			 * triggered when dots are hidden
			 * @event
			 * @name hide_dots.jstree
			 */
			this.trigger('hide_dots');
		},
		/**
		 * toggles the connecting dots
		 * @name toggle_dots()
		 */
		toggle_dots : function () { if(this._data.core.themes.dots) { this.hide_dots(); } else { this.show_dots(); } },
		/**
		 * show the node icons
		 * @name show_icons()
		 */
		show_icons : function () {
			this._data.core.themes.icons = true;
			this.get_container_ul().removeClass("jstree-no-icons");
			/**
			 * triggered when icons are shown
			 * @event
			 * @name show_icons.jstree
			 */
			this.trigger('show_icons');
		},
		/**
		 * hide the node icons
		 * @name hide_icons()
		 */
		hide_icons : function () {
			this._data.core.themes.icons = false;
			this.get_container_ul().addClass("jstree-no-icons");
			/**
			 * triggered when icons are hidden
			 * @event
			 * @name hide_icons.jstree
			 */
			this.trigger('hide_icons');
		},
		/**
		 * toggle the node icons
		 * @name toggle_icons()
		 */
		toggle_icons : function () { if(this._data.core.themes.icons) { this.hide_icons(); } else { this.show_icons(); } },
		/**
		 * show the node ellipsis
		 * @name show_icons()
		 */
		show_ellipsis : function () {
			this._data.core.themes.ellipsis = true;
			this.get_container_ul().addClass("jstree-ellipsis");
			/**
			 * triggered when ellisis is shown
			 * @event
			 * @name show_ellipsis.jstree
			 */
			this.trigger('show_ellipsis');
		},
		/**
		 * hide the node ellipsis
		 * @name hide_ellipsis()
		 */
		hide_ellipsis : function () {
			this._data.core.themes.ellipsis = false;
			this.get_container_ul().removeClass("jstree-ellipsis");
			/**
			 * triggered when ellisis is hidden
			 * @event
			 * @name hide_ellipsis.jstree
			 */
			this.trigger('hide_ellipsis');
		},
		/**
		 * toggle the node ellipsis
		 * @name toggle_icons()
		 */
		toggle_ellipsis : function () { if(this._data.core.themes.ellipsis) { this.hide_ellipsis(); } else { this.show_ellipsis(); } },
		/**
		 * set the node icon for a node
		 * @name set_icon(obj, icon)
		 * @param {mixed} obj
		 * @param {String} icon the new icon - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
		 */
		set_icon : function (obj, icon) {
			var t1, t2, dom, old;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_icon(obj[t1], icon);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			old = obj.icon;
			obj.icon = icon === true || icon === null || icon === undefined || icon === '' ? true : icon;
			dom = this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon");
			if(icon === false) {
				dom.removeClass('jstree-themeicon-custom ' + old).css("background","").removeAttr("rel");
				this.hide_icon(obj);
			}
			else if(icon === true || icon === null || icon === undefined || icon === '') {
				dom.removeClass('jstree-themeicon-custom ' + old).css("background","").removeAttr("rel");
				if(old === false) { this.show_icon(obj); }
			}
			else if(icon.indexOf("/") === -1 && icon.indexOf(".") === -1) {
				dom.removeClass(old).css("background","");
				dom.addClass(icon + ' jstree-themeicon-custom').attr("rel",icon);
				if(old === false) { this.show_icon(obj); }
			}
			else {
				dom.removeClass(old).css("background","");
				dom.addClass('jstree-themeicon-custom').css("background", "url('" + icon + "') center center no-repeat").attr("rel",icon);
				if(old === false) { this.show_icon(obj); }
			}
			return true;
		},
		/**
		 * get the node icon for a node
		 * @name get_icon(obj)
		 * @param {mixed} obj
		 * @return {String}
		 */
		get_icon : function (obj) {
			obj = this.get_node(obj);
			return (!obj || obj.id === $.jstree.root) ? false : obj.icon;
		},
		/**
		 * hide the icon on an individual node
		 * @name hide_icon(obj)
		 * @param {mixed} obj
		 */
		hide_icon : function (obj) {
			var t1, t2;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.hide_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj === $.jstree.root) { return false; }
			obj.icon = false;
			this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon").addClass('jstree-themeicon-hidden');
			return true;
		},
		/**
		 * show the icon on an individual node
		 * @name show_icon(obj)
		 * @param {mixed} obj
		 */
		show_icon : function (obj) {
			var t1, t2, dom;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.show_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj === $.jstree.root) { return false; }
			dom = this.get_node(obj, true);
			obj.icon = dom.length ? dom.children(".jstree-anchor").children(".jstree-themeicon").attr('rel') : true;
			if(!obj.icon) { obj.icon = true; }
			dom.children(".jstree-anchor").children(".jstree-themeicon").removeClass('jstree-themeicon-hidden');
			return true;
		}
	};

	// helpers
	$.vakata = {};
	// collect attributes
	$.vakata.attributes = function(node, with_values) {
		node = $(node)[0];
		var attr = with_values ? {} : [];
		if(node && node.attributes) {
			$.each(node.attributes, function (i, v) {
				if($.inArray(v.name.toLowerCase(),['style','contenteditable','hasfocus','tabindex']) !== -1) { return; }
				if(v.value !== null && $.vakata.trim(v.value) !== '') {
					if(with_values) { attr[v.name] = v.value; }
					else { attr.push(v.name); }
				}
			});
		}
		return attr;
	};
	$.vakata.array_unique = function(array) {
		var a = [], i, j, l, o = {};
		for(i = 0, l = array.length; i < l; i++) {
			if(o[array[i]] === undefined) {
				a.push(array[i]);
				o[array[i]] = true;
			}
		}
		return a;
	};
	// remove item from array
	$.vakata.array_remove = function(array, from) {
		array.splice(from, 1);
		return array;
		//var rest = array.slice((to || from) + 1 || array.length);
		//array.length = from < 0 ? array.length + from : from;
		//array.push.apply(array, rest);
		//return array;
	};
	// remove item from array
	$.vakata.array_remove_item = function(array, item) {
		var tmp = $.inArray(item, array);
		return tmp !== -1 ? $.vakata.array_remove(array, tmp) : array;
	};
	$.vakata.array_filter = function(c,a,b,d,e) {
		if (c.filter) {
			return c.filter(a, b);
		}
		d=[];
		for (e in c) {
			if (~~e+''===e+'' && e>=0 && a.call(b,c[e],+e,c)) {
				d.push(c[e]);
			}
		}
		return d;
	};
	$.vakata.trim = function (text) {
		return String.prototype.trim ? 
			String.prototype.trim.call(text.toString()) :
			text.toString().replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
	$.vakata.is_function = function(obj) {
		return typeof obj === "function" && typeof obj.nodeType !== "number";
	};
	$.vakata.is_array = Array.isArray || function (obj) {
		return Object.prototype.toString.call(obj) === "[object Array]";
	};

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind#polyfill
	if (!Function.prototype.bind) {
		Function.prototype.bind = function () {
			var thatFunc = this, thatArg = arguments[0];
			var args = Array.prototype.slice.call(arguments, 1);
			if (typeof thatFunc !== 'function') {
				// closest thing possible to the ECMAScript 5
				// internal IsCallable function
				throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
			}
			return function(){
				var funcArgs = args.concat(Array.prototype.slice.call(arguments));
				return thatFunc.apply(thatArg, funcArgs);
			};
		};
	}


/**
 * ### Changed plugin
 *
 * This plugin adds more information to the `changed.jstree` event. The new data is contained in the `changed` event data property, and contains a lists of `selected` and `deselected` nodes.
 */

	$.jstree.plugins.changed = function (options, parent) {
		var last = [];
		this.trigger = function (ev, data) {
			var i, j;
			if(!data) {
				data = {};
			}
			if(ev.replace('.jstree','') === 'changed') {
				data.changed = { selected : [], deselected : [] };
				var tmp = {};
				for(i = 0, j = last.length; i < j; i++) {
					tmp[last[i]] = 1;
				}
				for(i = 0, j = data.selected.length; i < j; i++) {
					if(!tmp[data.selected[i]]) {
						data.changed.selected.push(data.selected[i]);
					}
					else {
						tmp[data.selected[i]] = 2;
					}
				}
				for(i = 0, j = last.length; i < j; i++) {
					if(tmp[last[i]] === 1) {
						data.changed.deselected.push(last[i]);
					}
				}
				last = data.selected.slice();
			}
			/**
			 * triggered when selection changes (the "changed" plugin enhances the original event with more data)
			 * @event
			 * @name changed.jstree
			 * @param {Object} node
			 * @param {Object} action the action that caused the selection to change
			 * @param {Array} selected the current selection
			 * @param {Object} changed an object containing two properties `selected` and `deselected` - both arrays of node IDs, which were selected or deselected since the last changed event
			 * @param {Object} event the event (if any) that triggered this changed event
			 * @plugin changed
			 */
			parent.trigger.call(this, ev, data);
		};
		this.refresh = function (skip_loading, forget_state) {
			last = [];
			return parent.refresh.apply(this, arguments);
		};
	};

/**
 * ### Checkbox plugin
 *
 * This plugin renders checkbox icons in front of each node, making multiple selection much easier.
 * It also supports tri-state behavior, meaning that if a node has a few of its children checked it will be rendered as undetermined, and state will be propagated up.
 */

	var _i = document.createElement('I');
	_i.className = 'jstree-icon jstree-checkbox';
	_i.setAttribute('role', 'presentation');
	/**
	 * stores all defaults for the checkbox plugin
	 * @name $.jstree.defaults.checkbox
	 * @plugin checkbox
	 */
	$.jstree.defaults.checkbox = {
		/**
		 * a boolean indicating if checkboxes should be visible (can be changed at a later time using `show_checkboxes()` and `hide_checkboxes`). Defaults to `true`.
		 * @name $.jstree.defaults.checkbox.visible
		 * @plugin checkbox
		 */
		visible				: true,
		/**
		 * a boolean indicating if checkboxes should cascade down and have an undetermined state. Defaults to `true`.
		 * @name $.jstree.defaults.checkbox.three_state
		 * @plugin checkbox
		 */
		three_state			: true,
		/**
		 * a boolean indicating if clicking anywhere on the node should act as clicking on the checkbox. Defaults to `true`.
		 * @name $.jstree.defaults.checkbox.whole_node
		 * @plugin checkbox
		 */
		whole_node			: true,
		/**
		 * a boolean indicating if the selected style of a node should be kept, or removed. Defaults to `true`.
		 * @name $.jstree.defaults.checkbox.keep_selected_style
		 * @plugin checkbox
		 */
		keep_selected_style	: true,
		/**
		 * This setting controls how cascading and undetermined nodes are applied.
		 * If 'up' is in the string - cascading up is enabled, if 'down' is in the string - cascading down is enabled, if 'undetermined' is in the string - undetermined nodes will be used.
		 * If `three_state` is set to `true` this setting is automatically set to 'up+down+undetermined'. Defaults to ''.
		 * @name $.jstree.defaults.checkbox.cascade
		 * @plugin checkbox
		 */
		cascade				: '',
		/**
		 * This setting controls if checkbox are bound to the general tree selection or to an internal array maintained by the checkbox plugin. Defaults to `true`, only set to `false` if you know exactly what you are doing.
		 * @name $.jstree.defaults.checkbox.tie_selection
		 * @plugin checkbox
		 */
		tie_selection		: true,

		/**
		 * This setting controls if cascading down affects disabled checkboxes
		 * @name $.jstree.defaults.checkbox.cascade_to_disabled
		 * @plugin checkbox
		 */
		cascade_to_disabled : true,

		/**
		 * This setting controls if cascading down affects hidden checkboxes
		 * @name $.jstree.defaults.checkbox.cascade_to_hidden
		 * @plugin checkbox
		 */
		cascade_to_hidden : true
	};
	$.jstree.plugins.checkbox = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this._data.checkbox.uto = false;
			this._data.checkbox.selected = [];
			if(this.settings.checkbox.three_state) {
				this.settings.checkbox.cascade = 'up+down+undetermined';
			}
			this.element
				.on("init.jstree", function () {
						this._data.checkbox.visible = this.settings.checkbox.visible;
						if(!this.settings.checkbox.keep_selected_style) {
							this.element.addClass('jstree-checkbox-no-clicked');
						}
						if(this.settings.checkbox.tie_selection) {
							this.element.addClass('jstree-checkbox-selection');
						}
					}.bind(this))
				.on("loading.jstree", function () {
						this[ this._data.checkbox.visible ? 'show_checkboxes' : 'hide_checkboxes' ]();
					}.bind(this));
			if(this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				this.element
					.on('changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree', function () {
							// only if undetermined is in setting
							if(this._data.checkbox.uto) { clearTimeout(this._data.checkbox.uto); }
							this._data.checkbox.uto = setTimeout(this._undetermined.bind(this), 50);
						}.bind(this));
			}
			if(!this.settings.checkbox.tie_selection) {
				this.element
					.on('model.jstree', function (e, data) {
						var m = this._model.data,
							p = m[data.parent],
							dpc = data.nodes,
							i, j;
						for(i = 0, j = dpc.length; i < j; i++) {
							m[dpc[i]].state.checked = m[dpc[i]].state.checked || (m[dpc[i]].original && m[dpc[i]].original.state && m[dpc[i]].original.state.checked);
							if(m[dpc[i]].state.checked) {
								this._data.checkbox.selected.push(dpc[i]);
							}
						}
					}.bind(this));
			}
			if(this.settings.checkbox.cascade.indexOf('up') !== -1 || this.settings.checkbox.cascade.indexOf('down') !== -1) {
				this.element
					.on('model.jstree', function (e, data) {
							var m = this._model.data,
								p = m[data.parent],
								dpc = data.nodes,
								chd = [],
								c, i, j, k, l, tmp, s = this.settings.checkbox.cascade, t = this.settings.checkbox.tie_selection;

							if(s.indexOf('down') !== -1) {
								// apply down
								if(p.state[ t ? 'selected' : 'checked' ]) {
									for(i = 0, j = dpc.length; i < j; i++) {
										m[dpc[i]].state[ t ? 'selected' : 'checked' ] = true;
									}

									this._data[ t ? 'core' : 'checkbox' ].selected = this._data[ t ? 'core' : 'checkbox' ].selected.concat(dpc);
								}
								else {
									for(i = 0, j = dpc.length; i < j; i++) {
										if(m[dpc[i]].state[ t ? 'selected' : 'checked' ]) {
											for(k = 0, l = m[dpc[i]].children_d.length; k < l; k++) {
												m[m[dpc[i]].children_d[k]].state[ t ? 'selected' : 'checked' ] = true;
											}
											this._data[ t ? 'core' : 'checkbox' ].selected = this._data[ t ? 'core' : 'checkbox' ].selected.concat(m[dpc[i]].children_d);
										}
									}
								}
							}

							if(s.indexOf('up') !== -1) {
								// apply up
								for(i = 0, j = p.children_d.length; i < j; i++) {
									if(!m[p.children_d[i]].children.length) {
										chd.push(m[p.children_d[i]].parent);
									}
								}
								chd = $.vakata.array_unique(chd);
								for(k = 0, l = chd.length; k < l; k++) {
									p = m[chd[k]];
									while(p && p.id !== $.jstree.root) {
										c = 0;
										for(i = 0, j = p.children.length; i < j; i++) {
											c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
										}
										if(c === j) {
											p.state[ t ? 'selected' : 'checked' ] = true;
											this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
											tmp = this.get_node(p, true);
											if(tmp && tmp.length) {
												tmp.attr('aria-selected', true).children('.jstree-anchor').addClass( t ? 'jstree-clicked' : 'jstree-checked');
											}
										}
										else {
											break;
										}
										p = this.get_node(p.parent);
									}
								}
							}

							this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_unique(this._data[ t ? 'core' : 'checkbox' ].selected);
						}.bind(this))
					.on(this.settings.checkbox.tie_selection ? 'select_node.jstree' : 'check_node.jstree', function (e, data) {
							var self = this,
								obj = data.node,
								m = this._model.data,
								par = this.get_node(obj.parent),
								i, j, c, tmp, s = this.settings.checkbox.cascade, t = this.settings.checkbox.tie_selection,
								sel = {}, cur = this._data[ t ? 'core' : 'checkbox' ].selected;

							for (i = 0, j = cur.length; i < j; i++) {
								sel[cur[i]] = true;
							}

							// apply down
							if(s.indexOf('down') !== -1) {
								//this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_unique(this._data[ t ? 'core' : 'checkbox' ].selected.concat(obj.children_d));
								var selectedIds = this._cascade_new_checked_state(obj.id, true);
								var temp = obj.children_d.concat(obj.id);
								for (i = 0, j = temp.length; i < j; i++) {
									if (selectedIds.indexOf(temp[i]) > -1) {
										sel[temp[i]] = true;
									}
									else {
										delete sel[temp[i]];
									}
								}
							}

							// apply up
							if(s.indexOf('up') !== -1) {
								while(par && par.id !== $.jstree.root) {
									c = 0;
									for(i = 0, j = par.children.length; i < j; i++) {
										c += m[par.children[i]].state[ t ? 'selected' : 'checked' ];
									}
									if(c === j) {
										par.state[ t ? 'selected' : 'checked' ] = true;
										sel[par.id] = true;
										//this._data[ t ? 'core' : 'checkbox' ].selected.push(par.id);
										tmp = this.get_node(par, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
									else {
										break;
									}
									par = this.get_node(par.parent);
								}
							}

							cur = [];
							for (i in sel) {
								if (sel.hasOwnProperty(i)) {
									cur.push(i);
								}
							}
							this._data[ t ? 'core' : 'checkbox' ].selected = cur;
						}.bind(this))
					.on(this.settings.checkbox.tie_selection ? 'deselect_all.jstree' : 'uncheck_all.jstree', function (e, data) {
							var obj = this.get_node($.jstree.root),
								m = this._model.data,
								i, j, tmp;
							for(i = 0, j = obj.children_d.length; i < j; i++) {
								tmp = m[obj.children_d[i]];
								if(tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
									tmp.original.state.undetermined = false;
								}
							}
						}.bind(this))
					.on(this.settings.checkbox.tie_selection ? 'deselect_node.jstree' : 'uncheck_node.jstree', function (e, data) {
							var self = this,
								obj = data.node,
								dom = this.get_node(obj, true),
								i, j, tmp, s = this.settings.checkbox.cascade, t = this.settings.checkbox.tie_selection,
								cur = this._data[ t ? 'core' : 'checkbox' ].selected, sel = {},
								stillSelectedIds = [],
								allIds = obj.children_d.concat(obj.id);

							// apply down
							if(s.indexOf('down') !== -1) {
								var selectedIds = this._cascade_new_checked_state(obj.id, false);

								cur = $.vakata.array_filter(cur, function(id) {
									return allIds.indexOf(id) === -1 || selectedIds.indexOf(id) > -1;
								});
							}

							// only apply up if cascade up is enabled and if this node is not selected
							// (if all child nodes are disabled and cascade_to_disabled === false then this node will till be selected).
							if(s.indexOf('up') !== -1 && cur.indexOf(obj.id) === -1) {
								for(i = 0, j = obj.parents.length; i < j; i++) {
									tmp = this._model.data[obj.parents[i]];
									tmp.state[ t ? 'selected' : 'checked' ] = false;
									if(tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
										tmp.original.state.undetermined = false;
									}
									tmp = this.get_node(obj.parents[i], true);
									if(tmp && tmp.length) {
										tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								}

								cur = $.vakata.array_filter(cur, function(id) {
									return obj.parents.indexOf(id) === -1;
								});
							}

							this._data[ t ? 'core' : 'checkbox' ].selected = cur;
						}.bind(this));
			}
			if(this.settings.checkbox.cascade.indexOf('up') !== -1) {
				this.element
					.on('delete_node.jstree', function (e, data) {
							// apply up (whole handler)
							var p = this.get_node(data.parent),
								m = this._model.data,
								i, j, c, tmp, t = this.settings.checkbox.tie_selection;
							while(p && p.id !== $.jstree.root && !p.state[ t ? 'selected' : 'checked' ]) {
								c = 0;
								for(i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
								}
								if(j > 0 && c === j) {
									p.state[ t ? 'selected' : 'checked' ] = true;
									this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
									tmp = this.get_node(p, true);
									if(tmp && tmp.length) {
										tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								}
								else {
									break;
								}
								p = this.get_node(p.parent);
							}
						}.bind(this))
					.on('move_node.jstree', function (e, data) {
							// apply up (whole handler)
							var is_multi = data.is_multi,
								old_par = data.old_parent,
								new_par = this.get_node(data.parent),
								m = this._model.data,
								p, c, i, j, tmp, t = this.settings.checkbox.tie_selection;
							if(!is_multi) {
								p = this.get_node(old_par);
								while(p && p.id !== $.jstree.root && !p.state[ t ? 'selected' : 'checked' ]) {
									c = 0;
									for(i = 0, j = p.children.length; i < j; i++) {
										c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
									}
									if(j > 0 && c === j) {
										p.state[ t ? 'selected' : 'checked' ] = true;
										this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
									else {
										break;
									}
									p = this.get_node(p.parent);
								}
							}
							p = new_par;
							while(p && p.id !== $.jstree.root) {
								c = 0;
								for(i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
								}
								if(c === j) {
									if(!p.state[ t ? 'selected' : 'checked' ]) {
										p.state[ t ? 'selected' : 'checked' ] = true;
										this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
								}
								else {
									if(p.state[ t ? 'selected' : 'checked' ]) {
										p.state[ t ? 'selected' : 'checked' ] = false;
										this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_remove_item(this._data[ t ? 'core' : 'checkbox' ].selected, p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
									else {
										break;
									}
								}
								p = this.get_node(p.parent);
							}
						}.bind(this));
			}
		};
		/**
		 * get an array of all nodes whose state is "undetermined"
		 * @name get_undetermined([full])
		 * @param  {boolean} full: if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 * @plugin checkbox
		 */
		this.get_undetermined = function (full) {
			if (this.settings.checkbox.cascade.indexOf('undetermined') === -1) {
				return [];
			}
			var i, j, k, l, o = {}, m = this._model.data, t = this.settings.checkbox.tie_selection, s = this._data[ t ? 'core' : 'checkbox' ].selected, p = [], tt = this, r = [];
			for(i = 0, j = s.length; i < j; i++) {
				if(m[s[i]] && m[s[i]].parents) {
					for(k = 0, l = m[s[i]].parents.length; k < l; k++) {
						if(o[m[s[i]].parents[k]] !== undefined) {
							break;
						}
						if(m[s[i]].parents[k] !== $.jstree.root) {
							o[m[s[i]].parents[k]] = true;
							p.push(m[s[i]].parents[k]);
						}
					}
				}
			}
			// attempt for server side undetermined state
			this.element.find('.jstree-closed').not(':has(.jstree-children)')
				.each(function () {
					var tmp = tt.get_node(this), tmp2;
					
					if(!tmp) { return; }
					
					if(!tmp.state.loaded) {
						if(tmp.original && tmp.original.state && tmp.original.state.undetermined && tmp.original.state.undetermined === true) {
							if(o[tmp.id] === undefined && tmp.id !== $.jstree.root) {
								o[tmp.id] = true;
								p.push(tmp.id);
							}
							for(k = 0, l = tmp.parents.length; k < l; k++) {
								if(o[tmp.parents[k]] === undefined && tmp.parents[k] !== $.jstree.root) {
									o[tmp.parents[k]] = true;
									p.push(tmp.parents[k]);
								}
							}
						}
					}
					else {
						for(i = 0, j = tmp.children_d.length; i < j; i++) {
							tmp2 = m[tmp.children_d[i]];
							if(!tmp2.state.loaded && tmp2.original && tmp2.original.state && tmp2.original.state.undetermined && tmp2.original.state.undetermined === true) {
								if(o[tmp2.id] === undefined && tmp2.id !== $.jstree.root) {
									o[tmp2.id] = true;
									p.push(tmp2.id);
								}
								for(k = 0, l = tmp2.parents.length; k < l; k++) {
									if(o[tmp2.parents[k]] === undefined && tmp2.parents[k] !== $.jstree.root) {
										o[tmp2.parents[k]] = true;
										p.push(tmp2.parents[k]);
									}
								}
							}
						}
					}
				});
			for (i = 0, j = p.length; i < j; i++) {
				if(!m[p[i]].state[ t ? 'selected' : 'checked' ]) {
					r.push(full ? m[p[i]] : p[i]);
				}
			}
			return r;
		};
		/**
		 * set the undetermined state where and if necessary. Used internally.
		 * @private
		 * @name _undetermined()
		 * @plugin checkbox
		 */
		this._undetermined = function () {
			if(this.element === null) { return; }
			var p = this.get_undetermined(false), i, j, s;

			this.element.find('.jstree-undetermined').removeClass('jstree-undetermined');
			for (i = 0, j = p.length; i < j; i++) {
				s = this.get_node(p[i], true);
				if(s && s.length) {
					s.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-undetermined');
				}
			}
		};
		this.redraw_node = function(obj, deep, is_callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if(obj) {
				var i, j, tmp = null, icon = null;
				for(i = 0, j = obj.childNodes.length; i < j; i++) {
					if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
						tmp = obj.childNodes[i];
						break;
					}
				}
				if(tmp) {
					if(!this.settings.checkbox.tie_selection && this._model.data[obj.id].state.checked) { tmp.className += ' jstree-checked'; }
					icon = _i.cloneNode(false);
					if(this._model.data[obj.id].state.checkbox_disabled) { icon.className += ' jstree-checkbox-disabled'; }
					tmp.insertBefore(icon, tmp.childNodes[0]);
				}
			}
			if(!is_callback && this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				if(this._data.checkbox.uto) { clearTimeout(this._data.checkbox.uto); }
				this._data.checkbox.uto = setTimeout(this._undetermined.bind(this), 50);
			}
			return obj;
		};
		/**
		 * show the node checkbox icons
		 * @name show_checkboxes()
		 * @plugin checkbox
		 */
		this.show_checkboxes = function () { this._data.core.themes.checkboxes = true; this.get_container_ul().removeClass("jstree-no-checkboxes"); };
		/**
		 * hide the node checkbox icons
		 * @name hide_checkboxes()
		 * @plugin checkbox
		 */
		this.hide_checkboxes = function () { this._data.core.themes.checkboxes = false; this.get_container_ul().addClass("jstree-no-checkboxes"); };
		/**
		 * toggle the node icons
		 * @name toggle_checkboxes()
		 * @plugin checkbox
		 */
		this.toggle_checkboxes = function () { if(this._data.core.themes.checkboxes) { this.hide_checkboxes(); } else { this.show_checkboxes(); } };
		/**
		 * checks if a node is in an undetermined state
		 * @name is_undetermined(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		this.is_undetermined = function (obj) {
			obj = this.get_node(obj);
			var s = this.settings.checkbox.cascade, i, j, t = this.settings.checkbox.tie_selection, d = this._data[ t ? 'core' : 'checkbox' ].selected, m = this._model.data;
			if(!obj || obj.state[ t ? 'selected' : 'checked' ] === true || s.indexOf('undetermined') === -1 || (s.indexOf('down') === -1 && s.indexOf('up') === -1)) {
				return false;
			}
			if(!obj.state.loaded && obj.original.state.undetermined === true) {
				return true;
			}
			for(i = 0, j = obj.children_d.length; i < j; i++) {
				if($.inArray(obj.children_d[i], d) !== -1 || (!m[obj.children_d[i]].state.loaded && m[obj.children_d[i]].original.state.undetermined)) {
					return true;
				}
			}
			return false;
		};
		/**
		 * disable a node's checkbox
		 * @name disable_checkbox(obj)
		 * @param {mixed} obj an array can be used too
		 * @trigger disable_checkbox.jstree
		 * @plugin checkbox
		 */
		this.disable_checkbox = function (obj) {
			var t1, t2, dom;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.disable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(!obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = true;
				if(dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-checkbox-disabled');
				}
				/**
				 * triggered when an node's checkbox is disabled
				 * @event
				 * @name disable_checkbox.jstree
				 * @param {Object} node
				 * @plugin checkbox
				 */
				this.trigger('disable_checkbox', { 'node' : obj });
			}
		};
		/**
		 * enable a node's checkbox
		 * @name enable_checkbox(obj)
		 * @param {mixed} obj an array can be used too
		 * @trigger enable_checkbox.jstree
		 * @plugin checkbox
		 */
		this.enable_checkbox = function (obj) {
			var t1, t2, dom;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.enable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = false;
				if(dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').removeClass('jstree-checkbox-disabled');
				}
				/**
				 * triggered when an node's checkbox is enabled
				 * @event
				 * @name enable_checkbox.jstree
				 * @param {Object} node
				 * @plugin checkbox
				 */
				this.trigger('enable_checkbox', { 'node' : obj });
			}
		};

		this.activate_node = function (obj, e) {
			if($(e.target).hasClass('jstree-checkbox-disabled')) {
				return false;
			}
			if(this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || $(e.target).hasClass('jstree-checkbox'))) {
				e.ctrlKey = true;
			}
			if(this.settings.checkbox.tie_selection || (!this.settings.checkbox.whole_node && !$(e.target).hasClass('jstree-checkbox'))) {
				return parent.activate_node.call(this, obj, e);
			}
			if(this.is_disabled(obj)) {
				return false;
			}
			if(this.is_checked(obj)) {
				this.uncheck_node(obj, e);
			}
			else {
				this.check_node(obj, e);
			}
			this.trigger('activate_node', { 'node' : this.get_node(obj) });
		};

		/**
		 * Cascades checked state to a node and all its descendants. This function does NOT affect hidden and disabled nodes (or their descendants).
		 * However if these unaffected nodes are already selected their ids will be included in the returned array.
		 * @private
		 * @name _cascade_new_checked_state(id, checkedState)
		 * @param {string} id the node ID
		 * @param {bool} checkedState should the nodes be checked or not
		 * @returns {Array} Array of all node id's (in this tree branch) that are checked.
		 */
		this._cascade_new_checked_state = function (id, checkedState) {
			var self = this;
			var t = this.settings.checkbox.tie_selection;
			var node = this._model.data[id];
			var selectedNodeIds = [];
			var selectedChildrenIds = [], i, j, selectedChildIds;

			if (
				(this.settings.checkbox.cascade_to_disabled || !node.state.disabled) &&
				(this.settings.checkbox.cascade_to_hidden || !node.state.hidden)
			) {
				//First try and check/uncheck the children
				if (node.children) {
					for (i = 0, j = node.children.length; i < j; i++) {
						var childId = node.children[i];
						selectedChildIds = self._cascade_new_checked_state(childId, checkedState);
						selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
						if (selectedChildIds.indexOf(childId) > -1) {
							selectedChildrenIds.push(childId);
						}
					}
				}

				var dom = self.get_node(node, true);

				//A node's state is undetermined if some but not all of it's children are checked/selected .
				var undetermined = selectedChildrenIds.length > 0 && selectedChildrenIds.length < node.children.length;

				if(node.original && node.original.state && node.original.state.undetermined) {
					node.original.state.undetermined = undetermined;
				}

				//If a node is undetermined then remove selected class
				if (undetermined) {
					node.state[ t ? 'selected' : 'checked' ] = false;
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
				//Otherwise, if the checkedState === true (i.e. the node is being checked now) and all of the node's children are checked (if it has any children),
				//check the node and style it correctly.
				else if (checkedState && selectedChildrenIds.length === node.children.length) {
					node.state[ t ? 'selected' : 'checked' ] = checkedState;
					selectedNodeIds.push(node.id);

					dom.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
				else {
					node.state[ t ? 'selected' : 'checked' ] = false;
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
			}
			else {
				selectedChildIds = this.get_checked_descendants(id);

				if (node.state[ t ? 'selected' : 'checked' ]) {
					selectedChildIds.push(node.id);
				}

				selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
			}

			return selectedNodeIds;
		};

		/**
		 * Gets ids of nodes selected in branch (of tree) specified by id (does not include the node specified by id)
		 * @name get_checked_descendants(obj)
		 * @param {string} id the node ID
		 * @return {Array} array of IDs
		 * @plugin checkbox
		 */
		this.get_checked_descendants = function (id) {
			var self = this;
			var t = self.settings.checkbox.tie_selection;
			var node = self._model.data[id];

			return $.vakata.array_filter(node.children_d, function(_id) {
				return self._model.data[_id].state[ t ? 'selected' : 'checked' ];
			});
		};

		/**
		 * check a node (only if tie_selection in checkbox settings is false, otherwise select_node will be called internally)
		 * @name check_node(obj)
		 * @param {mixed} obj an array can be used to check multiple nodes
		 * @trigger check_node.jstree
		 * @plugin checkbox
		 */
		this.check_node = function (obj, e) {
			if(this.settings.checkbox.tie_selection) { return this.select_node(obj, false, true, e); }
			var dom, t1, t2, th;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.check_node(obj[t1], e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(!obj.state.checked) {
				obj.state.checked = true;
				this._data.checkbox.selected.push(obj.id);
				if(dom && dom.length) {
					dom.children('.jstree-anchor').addClass('jstree-checked');
				}
				/**
				 * triggered when an node is checked (only if tie_selection in checkbox settings is false)
				 * @event
				 * @name check_node.jstree
				 * @param {Object} node
				 * @param {Array} selected the current selection
				 * @param {Object} event the event (if any) that triggered this check_node
				 * @plugin checkbox
				 */
				this.trigger('check_node', { 'node' : obj, 'selected' : this._data.checkbox.selected, 'event' : e });
			}
		};
		/**
		 * uncheck a node (only if tie_selection in checkbox settings is false, otherwise deselect_node will be called internally)
		 * @name uncheck_node(obj)
		 * @param {mixed} obj an array can be used to uncheck multiple nodes
		 * @trigger uncheck_node.jstree
		 * @plugin checkbox
		 */
		this.uncheck_node = function (obj, e) {
			if(this.settings.checkbox.tie_selection) { return this.deselect_node(obj, false, e); }
			var t1, t2, dom;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.uncheck_node(obj[t1], e);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(obj.state.checked) {
				obj.state.checked = false;
				this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, obj.id);
				if(dom.length) {
					dom.children('.jstree-anchor').removeClass('jstree-checked');
				}
				/**
				 * triggered when an node is unchecked (only if tie_selection in checkbox settings is false)
				 * @event
				 * @name uncheck_node.jstree
				 * @param {Object} node
				 * @param {Array} selected the current selection
				 * @param {Object} event the event (if any) that triggered this uncheck_node
				 * @plugin checkbox
				 */
				this.trigger('uncheck_node', { 'node' : obj, 'selected' : this._data.checkbox.selected, 'event' : e });
			}
		};
		
		/**
		 * checks all nodes in the tree (only if tie_selection in checkbox settings is false, otherwise select_all will be called internally)
		 * @name check_all()
		 * @trigger check_all.jstree, changed.jstree
		 * @plugin checkbox
		 */
		this.check_all = function () {
			if(this.settings.checkbox.tie_selection) { return this.select_all(); }
			var tmp = this._data.checkbox.selected.concat([]), i, j;
			this._data.checkbox.selected = this._model.data[$.jstree.root].children_d.concat();
			for(i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
				if(this._model.data[this._data.checkbox.selected[i]]) {
					this._model.data[this._data.checkbox.selected[i]].state.checked = true;
				}
			}
			this.redraw(true);
			/**
			 * triggered when all nodes are checked (only if tie_selection in checkbox settings is false)
			 * @event
			 * @name check_all.jstree
			 * @param {Array} selected the current selection
			 * @plugin checkbox
			 */
			this.trigger('check_all', { 'selected' : this._data.checkbox.selected });
		};
		/**
		 * uncheck all checked nodes (only if tie_selection in checkbox settings is false, otherwise deselect_all will be called internally)
		 * @name uncheck_all()
		 * @trigger uncheck_all.jstree
		 * @plugin checkbox
		 */
		this.uncheck_all = function () {
			if(this.settings.checkbox.tie_selection) { return this.deselect_all(); }
			var tmp = this._data.checkbox.selected.concat([]), i, j;
			for(i = 0, j = this._data.checkbox.selected.length; i < j; i++) {
				if(this._model.data[this._data.checkbox.selected[i]]) {
					this._model.data[this._data.checkbox.selected[i]].state.checked = false;
				}
			}
			this._data.checkbox.selected = [];
			this.element.find('.jstree-checked').removeClass('jstree-checked');
			/**
			 * triggered when all nodes are unchecked (only if tie_selection in checkbox settings is false)
			 * @event
			 * @name uncheck_all.jstree
			 * @param {Object} node the previous selection
			 * @param {Array} selected the current selection
			 * @plugin checkbox
			 */
			this.trigger('uncheck_all', { 'selected' : this._data.checkbox.selected, 'node' : tmp });
		};
		/**
		 * checks if a node is checked (if tie_selection is on in the settings this function will return the same as is_selected)
		 * @name is_checked(obj)
		 * @param  {mixed}  obj
		 * @return {Boolean}
		 * @plugin checkbox
		 */
		this.is_checked = function (obj) {
			if(this.settings.checkbox.tie_selection) { return this.is_selected(obj); }
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			return obj.state.checked;
		};
		/**
		 * get an array of all checked nodes (if tie_selection is on in the settings this function will return the same as get_selected)
		 * @name get_checked([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 * @plugin checkbox
		 */
		this.get_checked = function (full) {
			if(this.settings.checkbox.tie_selection) { return this.get_selected(full); }
			return full ? $.map(this._data.checkbox.selected, function (i) { return this.get_node(i); }.bind(this)) : this._data.checkbox.selected.slice();
		};
		/**
		 * get an array of all top level checked nodes (ignoring children of checked nodes) (if tie_selection is on in the settings this function will return the same as get_top_selected)
		 * @name get_top_checked([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 * @plugin checkbox
		 */
		this.get_top_checked = function (full) {
			if(this.settings.checkbox.tie_selection) { return this.get_top_selected(full); }
			var tmp = this.get_checked(true),
				obj = {}, i, j, k, l;
			for(i = 0, j = tmp.length; i < j; i++) {
				obj[tmp[i].id] = tmp[i];
			}
			for(i = 0, j = tmp.length; i < j; i++) {
				for(k = 0, l = tmp[i].children_d.length; k < l; k++) {
					if(obj[tmp[i].children_d[k]]) {
						delete obj[tmp[i].children_d[k]];
					}
				}
			}
			tmp = [];
			for(i in obj) {
				if(obj.hasOwnProperty(i)) {
					tmp.push(i);
				}
			}
			return full ? $.map(tmp, function (i) { return this.get_node(i); }.bind(this)) : tmp;
		};
		/**
		 * get an array of all bottom level checked nodes (ignoring selected parents) (if tie_selection is on in the settings this function will return the same as get_bottom_selected)
		 * @name get_bottom_checked([full])
		 * @param  {mixed}  full if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 * @plugin checkbox
		 */
		this.get_bottom_checked = function (full) {
			if(this.settings.checkbox.tie_selection) { return this.get_bottom_selected(full); }
			var tmp = this.get_checked(true),
				obj = [], i, j;
			for(i = 0, j = tmp.length; i < j; i++) {
				if(!tmp[i].children.length) {
					obj.push(tmp[i].id);
				}
			}
			return full ? $.map(obj, function (i) { return this.get_node(i); }.bind(this)) : obj;
		};
		this.load_node = function (obj, callback) {
			var k, l, i, j, c, tmp;
			if(!$.vakata.is_array(obj) && !this.settings.checkbox.tie_selection) {
				tmp = this.get_node(obj);
				if(tmp && tmp.state.loaded) {
					for(k = 0, l = tmp.children_d.length; k < l; k++) {
						if(this._model.data[tmp.children_d[k]].state.checked) {
							c = true;
							this._data.checkbox.selected = $.vakata.array_remove_item(this._data.checkbox.selected, tmp.children_d[k]);
						}
					}
				}
			}
			return parent.load_node.apply(this, arguments);
		};
		this.get_state = function () {
			var state = parent.get_state.apply(this, arguments);
			if(this.settings.checkbox.tie_selection) { return state; }
			state.checkbox = this._data.checkbox.selected.slice();
			return state;
		};
		this.set_state = function (state, callback) {
			var res = parent.set_state.apply(this, arguments);
			if(res && state.checkbox) {
				if(!this.settings.checkbox.tie_selection) {
					this.uncheck_all();
					var _this = this;
					$.each(state.checkbox, function (i, v) {
						_this.check_node(v);
					});
				}
				delete state.checkbox;
				this.set_state(state, callback);
				return false;
			}
			return res;
		};
		this.refresh = function (skip_loading, forget_state) {
			if(this.settings.checkbox.tie_selection) {
				this._data.checkbox.selected = [];
			}
			return parent.refresh.apply(this, arguments);
		};
	};

	// include the checkbox plugin by default
	// $.jstree.defaults.plugins.push("checkbox");


/**
 * ### Conditionalselect plugin
 *
 * This plugin allows defining a callback to allow or deny node selection by user input (activate node method).
 */

	/**
	 * a callback (function) which is invoked in the instance's scope and receives two arguments - the node and the event that triggered the `activate_node` call. Returning false prevents working with the node, returning true allows invoking activate_node. Defaults to returning `true`.
	 * @name $.jstree.defaults.checkbox.visible
	 * @plugin checkbox
	 */
	$.jstree.defaults.conditionalselect = function () { return true; };
	$.jstree.plugins.conditionalselect = function (options, parent) {
		// own function
		this.activate_node = function (obj, e) {
			if(this.settings.conditionalselect.call(this, this.get_node(obj), e)) {
				return parent.activate_node.call(this, obj, e);
			}
		};
	};


/**
 * ### Contextmenu plugin
 *
 * Shows a context menu when a node is right-clicked.
 */

	/**
	 * stores all defaults for the contextmenu plugin
	 * @name $.jstree.defaults.contextmenu
	 * @plugin contextmenu
	 */
	$.jstree.defaults.contextmenu = {
		/**
		 * a boolean indicating if the node should be selected when the context menu is invoked on it. Defaults to `true`.
		 * @name $.jstree.defaults.contextmenu.select_node
		 * @plugin contextmenu
		 */
		select_node : true,
		/**
		 * a boolean indicating if the menu should be shown aligned with the node. Defaults to `true`, otherwise the mouse coordinates are used.
		 * @name $.jstree.defaults.contextmenu.show_at_node
		 * @plugin contextmenu
		 */
		show_at_node : true,
		/**
		 * an object of actions, or a function that accepts a node and a callback function and calls the callback function with an object of actions available for that node (you can also return the items too).
		 *
		 * Each action consists of a key (a unique name) and a value which is an object with the following properties (only label and action are required). Once a menu item is activated the `action` function will be invoked with an object containing the following keys: item - the contextmenu item definition as seen below, reference - the DOM node that was used (the tree node), element - the contextmenu DOM element, position - an object with x/y properties indicating the position of the menu.
		 *
		 * * `separator_before` - a boolean indicating if there should be a separator before this item
		 * * `separator_after` - a boolean indicating if there should be a separator after this item
		 * * `_disabled` - a boolean indicating if this action should be disabled
		 * * `label` - a string - the name of the action (could be a function returning a string)
		 * * `title` - a string - an optional tooltip for the item
		 * * `action` - a function to be executed if this item is chosen, the function will receive 
		 * * `icon` - a string, can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
		 * * `shortcut` - keyCode which will trigger the action if the menu is open (for example `113` for rename, which equals F2)
		 * * `shortcut_label` - shortcut label (like for example `F2` for rename)
		 * * `submenu` - an object with the same structure as $.jstree.defaults.contextmenu.items which can be used to create a submenu - each key will be rendered as a separate option in a submenu that will appear once the current item is hovered
		 *
		 * @name $.jstree.defaults.contextmenu.items
		 * @plugin contextmenu
		 */
		items : function (o, cb) { // Could be an object directly
			return {
				"create" : {
					"separator_before"	: false,
					"separator_after"	: true,
					"_disabled"			: false, //(this.check("create_node", data.reference, {}, "last")),
					"label"				: "Create",
					"action"			: function (data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
						inst.create_node(obj, {}, "last", function (new_node) {
							try {
								inst.edit(new_node);
							} catch (ex) {
								setTimeout(function () { inst.edit(new_node); },0);
							}
						});
					}
				},
				"rename" : {
					"separator_before"	: false,
					"separator_after"	: false,
					"_disabled"			: false, //(this.check("rename_node", data.reference, this.get_parent(data.reference), "")),
					"label"				: "Rename",
					/*!
					"shortcut"			: 113,
					"shortcut_label"	: 'F2',
					"icon"				: "glyphicon glyphicon-leaf",
					*/
					"action"			: function (data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
						inst.edit(obj);
					}
				},
				"remove" : {
					"separator_before"	: false,
					"icon"				: false,
					"separator_after"	: false,
					"_disabled"			: false, //(this.check("delete_node", data.reference, this.get_parent(data.reference), "")),
					"label"				: "Delete",
					"action"			: function (data) {
						var inst = $.jstree.reference(data.reference),
							obj = inst.get_node(data.reference);
						if(inst.is_selected(obj)) {
							inst.delete_node(inst.get_selected());
						}
						else {
							inst.delete_node(obj);
						}
					}
				},
				"ccp" : {
					"separator_before"	: true,
					"icon"				: false,
					"separator_after"	: false,
					"label"				: "Edit",
					"action"			: false,
					"submenu" : {
						"cut" : {
							"separator_before"	: false,
							"separator_after"	: false,
							"label"				: "Cut",
							"action"			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								if(inst.is_selected(obj)) {
									inst.cut(inst.get_top_selected());
								}
								else {
									inst.cut(obj);
								}
							}
						},
						"copy" : {
							"separator_before"	: false,
							"icon"				: false,
							"separator_after"	: false,
							"label"				: "Copy",
							"action"			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								if(inst.is_selected(obj)) {
									inst.copy(inst.get_top_selected());
								}
								else {
									inst.copy(obj);
								}
							}
						},
						"paste" : {
							"separator_before"	: false,
							"icon"				: false,
							"_disabled"			: function (data) {
								return !$.jstree.reference(data.reference).can_paste();
							},
							"separator_after"	: false,
							"label"				: "Paste",
							"action"			: function (data) {
								var inst = $.jstree.reference(data.reference),
									obj = inst.get_node(data.reference);
								inst.paste(obj);
							}
						}
					}
				}
			};
		}
	};

	$.jstree.plugins.contextmenu = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			var last_ts = 0, cto = null, ex, ey;
			this.element
				.on("init.jstree loading.jstree ready.jstree", function () {
						this.get_container_ul().addClass('jstree-contextmenu');
					}.bind(this))
				.on("contextmenu.jstree", ".jstree-anchor", function (e, data) {
						if (e.target.tagName.toLowerCase() === 'input') {
							return;
						}
						e.preventDefault();
						last_ts = e.ctrlKey ? +new Date() : 0;
						if(data || cto) {
							last_ts = (+new Date()) + 10000;
						}
						if(cto) {
							clearTimeout(cto);
						}
						if(!this.is_loading(e.currentTarget)) {
							this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e);
						}
					}.bind(this))
				.on("click.jstree", ".jstree-anchor", function (e) {
						if(this._data.contextmenu.visible && (!last_ts || (+new Date()) - last_ts > 250)) { // work around safari & macOS ctrl+click
							$.vakata.context.hide();
						}
						last_ts = 0;
					}.bind(this))
				.on("touchstart.jstree", ".jstree-anchor", function (e) {
						if(!e.originalEvent || !e.originalEvent.changedTouches || !e.originalEvent.changedTouches[0]) {
							return;
						}
						ex = e.originalEvent.changedTouches[0].clientX;
						ey = e.originalEvent.changedTouches[0].clientY;
						cto = setTimeout(function () {
							$(e.currentTarget).trigger('contextmenu', true);
						}, 750);
					})
				.on('touchmove.vakata.jstree', function (e) {
						if(cto && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0] && (Math.abs(ex - e.originalEvent.changedTouches[0].clientX) > 10 || Math.abs(ey - e.originalEvent.changedTouches[0].clientY) > 10)) {
							clearTimeout(cto);
							$.vakata.context.hide();
						}
					})
				.on('touchend.vakata.jstree', function (e) {
						if(cto) {
							clearTimeout(cto);
						}
					});

			/*!
			if(!('oncontextmenu' in document.body) && ('ontouchstart' in document.body)) {
				var el = null, tm = null;
				this.element
					.on("touchstart", ".jstree-anchor", function (e) {
						el = e.currentTarget;
						tm = +new Date();
						$(document).one("touchend", function (e) {
							e.target = document.elementFromPoint(e.originalEvent.targetTouches[0].pageX - window.pageXOffset, e.originalEvent.targetTouches[0].pageY - window.pageYOffset);
							e.currentTarget = e.target;
							tm = ((+(new Date())) - tm);
							if(e.target === el && tm > 600 && tm < 1000) {
								e.preventDefault();
								$(el).trigger('contextmenu', e);
							}
							el = null;
							tm = null;
						});
					});
			}
			*/
			$(document).on("context_hide.vakata.jstree", function (e, data) {
				this._data.contextmenu.visible = false;
				$(data.reference).removeClass('jstree-context');
			}.bind(this));
		};
		this.teardown = function () {
			if(this._data.contextmenu.visible) {
				$.vakata.context.hide();
			}
			$(document).off("context_hide.vakata.jstree");
			parent.teardown.call(this);
		};

		/**
		 * prepare and show the context menu for a node
		 * @name show_contextmenu(obj [, x, y])
		 * @param {mixed} obj the node
		 * @param {Number} x the x-coordinate relative to the document to show the menu at
		 * @param {Number} y the y-coordinate relative to the document to show the menu at
		 * @param {Object} e the event if available that triggered the contextmenu
		 * @plugin contextmenu
		 * @trigger show_contextmenu.jstree
		 */
		this.show_contextmenu = function (obj, x, y, e) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			var s = this.settings.contextmenu,
				d = this.get_node(obj, true),
				a = d.children(".jstree-anchor"),
				o = false,
				i = false;
			if(s.show_at_node || x === undefined || y === undefined) {
				o = a.offset();
				x = o.left;
				y = o.top + this._data.core.li_height;
			}
			if(this.settings.contextmenu.select_node && !this.is_selected(obj)) {
				this.activate_node(obj, e);
			}

			i = s.items;
			if($.vakata.is_function(i)) {
				i = i.call(this, obj, function (i) {
					this._show_contextmenu(obj, x, y, i);
				}.bind(this));
			}
			if($.isPlainObject(i)) {
				this._show_contextmenu(obj, x, y, i);
			}
		};
		/**
		 * show the prepared context menu for a node
		 * @name _show_contextmenu(obj, x, y, i)
		 * @param {mixed} obj the node
		 * @param {Number} x the x-coordinate relative to the document to show the menu at
		 * @param {Number} y the y-coordinate relative to the document to show the menu at
		 * @param {Number} i the object of items to show
		 * @plugin contextmenu
		 * @trigger show_contextmenu.jstree
		 * @private
		 */
		this._show_contextmenu = function (obj, x, y, i) {
			var d = this.get_node(obj, true),
				a = d.children(".jstree-anchor");
			$(document).one("context_show.vakata.jstree", function (e, data) {
				var cls = 'jstree-contextmenu jstree-' + this.get_theme() + '-contextmenu';
				$(data.element).addClass(cls);
				a.addClass('jstree-context');
			}.bind(this));
			this._data.contextmenu.visible = true;
			$.vakata.context.show(a, { 'x' : x, 'y' : y }, i);
			/**
			 * triggered when the contextmenu is shown for a node
			 * @event
			 * @name show_contextmenu.jstree
			 * @param {Object} node the node
			 * @param {Number} x the x-coordinate of the menu relative to the document
			 * @param {Number} y the y-coordinate of the menu relative to the document
			 * @plugin contextmenu
			 */
			this.trigger('show_contextmenu', { "node" : obj, "x" : x, "y" : y });
		};
	};

	// contextmenu helper
	(function ($) {
		var right_to_left = false,
			vakata_context = {
				element		: false,
				reference	: false,
				position_x	: 0,
				position_y	: 0,
				items		: [],
				html		: "",
				is_visible	: false
			};

		$.vakata.context = {
			settings : {
				hide_onmouseleave	: 0,
				icons				: true
			},
			_trigger : function (event_name) {
				$(document).triggerHandler("context_" + event_name + ".vakata", {
					"reference"	: vakata_context.reference,
					"element"	: vakata_context.element,
					"position"	: {
						"x" : vakata_context.position_x,
						"y" : vakata_context.position_y
					}
				});
			},
			_execute : function (i) {
				i = vakata_context.items[i];
				return i && (!i._disabled || ($.vakata.is_function(i._disabled) && !i._disabled({ "item" : i, "reference" : vakata_context.reference, "element" : vakata_context.element }))) && i.action ? i.action.call(null, {
							"item"		: i,
							"reference"	: vakata_context.reference,
							"element"	: vakata_context.element,
							"position"	: {
								"x" : vakata_context.position_x,
								"y" : vakata_context.position_y
							}
						}) : false;
			},
			_parse : function (o, is_callback) {
				if(!o) { return false; }
				if(!is_callback) {
					vakata_context.html		= "";
					vakata_context.items	= [];
				}
				var str = "",
					sep = false,
					tmp;

				if(is_callback) { str += "<"+"ul>"; }
				$.each(o, function (i, val) {
					if(!val) { return true; }
					vakata_context.items.push(val);
					if(!sep && val.separator_before) {
						str += "<"+"li class='vakata-context-separator'><"+"a href='#' " + ($.vakata.context.settings.icons ? '' : 'class="vakata-context-no-icons"') + ">&#160;<"+"/a><"+"/li>";
					}
					sep = false;
					str += "<"+"li class='" + (val._class || "") + (val._disabled === true || ($.vakata.is_function(val._disabled) && val._disabled({ "item" : val, "reference" : vakata_context.reference, "element" : vakata_context.element })) ? " vakata-contextmenu-disabled " : "") + "' "+(val.shortcut?" data-shortcut='"+val.shortcut+"' ":'')+">";
					str += "<"+"a href='#' rel='" + (vakata_context.items.length - 1) + "' " + (val.title ? "title='" + val.title + "'" : "") + ">";
					if($.vakata.context.settings.icons) {
						str += "<"+"i ";
						if(val.icon) {
							if(val.icon.indexOf("/") !== -1 || val.icon.indexOf(".") !== -1) { str += " style='background:url(\"" + val.icon + "\") center center no-repeat' "; }
							else { str += " class='" + val.icon + "' "; }
						}
						str += "><"+"/i><"+"span class='vakata-contextmenu-sep'>&#160;<"+"/span>";
					}
					str += ($.vakata.is_function(val.label) ? val.label({ "item" : i, "reference" : vakata_context.reference, "element" : vakata_context.element }) : val.label) + (val.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+val.shortcut+'">'+ (val.shortcut_label || '') +'</span>':'') + "<"+"/a>";
					if(val.submenu) {
						tmp = $.vakata.context._parse(val.submenu, true);
						if(tmp) { str += tmp; }
					}
					str += "<"+"/li>";
					if(val.separator_after) {
						str += "<"+"li class='vakata-context-separator'><"+"a href='#' " + ($.vakata.context.settings.icons ? '' : 'class="vakata-context-no-icons"') + ">&#160;<"+"/a><"+"/li>";
						sep = true;
					}
				});
				str  = str.replace(/<li class\='vakata-context-separator'\><\/li\>$/,"");
				if(is_callback) { str += "</ul>"; }
				/**
				 * triggered on the document when the contextmenu is parsed (HTML is built)
				 * @event
				 * @plugin contextmenu
				 * @name context_parse.vakata
				 * @param {jQuery} reference the element that was right clicked
				 * @param {jQuery} element the DOM element of the menu itself
				 * @param {Object} position the x & y coordinates of the menu
				 */
				if(!is_callback) { vakata_context.html = str; $.vakata.context._trigger("parse"); }
				return str.length > 10 ? str : false;
			},
			_show_submenu : function (o) {
				o = $(o);
				if(!o.length || !o.children("ul").length) { return; }
				var e = o.children("ul"),
					xl = o.offset().left,
					x = xl + o.outerWidth(),
					y = o.offset().top,
					w = e.width(),
					h = e.height(),
					dw = $(window).width() + $(window).scrollLeft(),
					dh = $(window).height() + $(window).scrollTop();
				// може да се спести е една проверка - дали няма някой от класовете вече нагоре
				if(right_to_left) {
					o[x - (w + 10 + o.outerWidth()) < 0 ? "addClass" : "removeClass"]("vakata-context-left");
				}
				else {
					o[x + w > dw  && xl > dw - x ? "addClass" : "removeClass"]("vakata-context-right");
				}
				if(y + h + 10 > dh) {
					e.css("bottom","-1px");
				}

				//if does not fit - stick it to the side
				if (o.hasClass('vakata-context-right')) {
					if (xl < w) {
						e.css("margin-right", xl - w);
					}
				} else {
					if (dw - x < w) {
						e.css("margin-left", dw - x - w);
					}
				}

				e.show();
			},
			show : function (reference, position, data) {
				var o, e, x, y, w, h, dw, dh, cond = true;
				if(vakata_context.element && vakata_context.element.length) {
					vakata_context.element.width('');
				}
				switch(cond) {
					case (!position && !reference):
						return false;
					case (!!position && !!reference):
						vakata_context.reference	= reference;
						vakata_context.position_x	= position.x;
						vakata_context.position_y	= position.y;
						break;
					case (!position && !!reference):
						vakata_context.reference	= reference;
						o = reference.offset();
						vakata_context.position_x	= o.left + reference.outerHeight();
						vakata_context.position_y	= o.top;
						break;
					case (!!position && !reference):
						vakata_context.position_x	= position.x;
						vakata_context.position_y	= position.y;
						break;
				}
				if(!!reference && !data && $(reference).data('vakata_contextmenu')) {
					data = $(reference).data('vakata_contextmenu');
				}
				if($.vakata.context._parse(data)) {
					vakata_context.element.html(vakata_context.html);
				}
				if(vakata_context.items.length) {
					vakata_context.element.appendTo(document.body);
					e = vakata_context.element;
					x = vakata_context.position_x;
					y = vakata_context.position_y;
					w = e.width();
					h = e.height();
					dw = $(window).width() + $(window).scrollLeft();
					dh = $(window).height() + $(window).scrollTop();
					if(right_to_left) {
						x -= (e.outerWidth() - $(reference).outerWidth());
						if(x < $(window).scrollLeft() + 20) {
							x = $(window).scrollLeft() + 20;
						}
					}
					if(x + w + 20 > dw) {
						x = dw - (w + 20);
					}
					if(y + h + 20 > dh) {
						y = dh - (h + 20);
					}

					vakata_context.element
						.css({ "left" : x, "top" : y })
						.show()
						.find('a').first().trigger('focus').parent().addClass("vakata-context-hover");
					vakata_context.is_visible = true;
					/**
					 * triggered on the document when the contextmenu is shown
					 * @event
					 * @plugin contextmenu
					 * @name context_show.vakata
					 * @param {jQuery} reference the element that was right clicked
					 * @param {jQuery} element the DOM element of the menu itself
					 * @param {Object} position the x & y coordinates of the menu
					 */
					$.vakata.context._trigger("show");
				}
			},
			hide : function () {
				if(vakata_context.is_visible) {
					vakata_context.element.hide().find("ul").hide().end().find(':focus').trigger('blur').end().detach();
					vakata_context.is_visible = false;
					/**
					 * triggered on the document when the contextmenu is hidden
					 * @event
					 * @plugin contextmenu
					 * @name context_hide.vakata
					 * @param {jQuery} reference the element that was right clicked
					 * @param {jQuery} element the DOM element of the menu itself
					 * @param {Object} position the x & y coordinates of the menu
					 */
					$.vakata.context._trigger("hide");
				}
			}
		};
		$(function () {
			right_to_left = $(document.body).css("direction") === "rtl";
			var to = false;

			vakata_context.element = $("<ul class='vakata-context'></ul>");
			vakata_context.element
				.on("mouseenter", "li", function (e) {
					e.stopImmediatePropagation();

					if($.contains(this, e.relatedTarget)) {
						// премахнато заради delegate mouseleave по-долу
						// $(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
						return;
					}

					if(to) { clearTimeout(to); }
					vakata_context.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();

					$(this)
						.siblings().find("ul").hide().end().end()
						.parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
					$.vakata.context._show_submenu(this);
				})
				// тестово - дали не натоварва?
				.on("mouseleave", "li", function (e) {
					if($.contains(this, e.relatedTarget)) { return; }
					$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
				})
				.on("mouseleave", function (e) {
					$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
					if($.vakata.context.settings.hide_onmouseleave) {
						to = setTimeout(
							(function (t) {
								return function () { $.vakata.context.hide(); };
							}(this)), $.vakata.context.settings.hide_onmouseleave);
					}
				})
				.on("click", "a", function (e) {
					e.preventDefault();
				//})
				//.on("mouseup", "a", function (e) {
					if(!$(this).trigger('blur').parent().hasClass("vakata-context-disabled") && $.vakata.context._execute($(this).attr("rel")) !== false) {
						$.vakata.context.hide();
					}
				})
				.on('keydown', 'a', function (e) {
						var o = null;
						switch(e.which) {
							case 13:
							case 32:
								e.type = "click";
								e.preventDefault();
								$(e.currentTarget).trigger(e);
								break;
							case 37:
								if(vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children('a').trigger('focus');
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 38:
								if(vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
									if(!o.length) { o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last(); }
									o.addClass("vakata-context-hover").children('a').trigger('focus');
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 39:
								if(vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children('a').trigger('focus');
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 40:
								if(vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
									if(!o.length) { o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first(); }
									o.addClass("vakata-context-hover").children('a').trigger('focus');
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 27:
								$.vakata.context.hide();
								e.preventDefault();
								break;
							default:
								//console.log(e.which);
								break;
						}
					})
				.on('keydown', function (e) {
					e.preventDefault();
					var a = vakata_context.element.find('.vakata-contextmenu-shortcut-' + e.which).parent();
					if(a.parent().not('.vakata-context-disabled')) {
						a.trigger('click');
					}
				});

			$(document)
				.on("mousedown.vakata.jstree", function (e) {
					if(vakata_context.is_visible && vakata_context.element[0] !== e.target  && !$.contains(vakata_context.element[0], e.target)) {
						$.vakata.context.hide();
					}
				})
				.on("context_show.vakata.jstree", function (e, data) {
					vakata_context.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
					if(right_to_left) {
						vakata_context.element.addClass("vakata-context-rtl").css("direction", "rtl");
					}
					// also apply a RTL class?
					vakata_context.element.find("ul").hide().end();
				});
		});
	}($));
	// $.jstree.defaults.plugins.push("contextmenu");


/**
 * ### Drag'n'drop plugin
 *
 * Enables dragging and dropping of nodes in the tree, resulting in a move or copy operations.
 */

	/**
	 * stores all defaults for the drag'n'drop plugin
	 * @name $.jstree.defaults.dnd
	 * @plugin dnd
	 */
	$.jstree.defaults.dnd = {
		/**
		 * a boolean indicating if a copy should be possible while dragging (by pressint the meta key or Ctrl). Defaults to `true`.
		 * @name $.jstree.defaults.dnd.copy
		 * @plugin dnd
		 */
		copy : true,
		/**
		 * a number indicating how long a node should remain hovered while dragging to be opened. Defaults to `500`.
		 * @name $.jstree.defaults.dnd.open_timeout
		 * @plugin dnd
		 */
		open_timeout : 500,
		/**
		 * a function invoked each time a node is about to be dragged, invoked in the tree's scope and receives the nodes about to be dragged as an argument (array) and the event that started the drag - return `false` to prevent dragging
		 * @name $.jstree.defaults.dnd.is_draggable
		 * @plugin dnd
		 */
		is_draggable : true,
		/**
		 * a boolean indicating if checks should constantly be made while the user is dragging the node (as opposed to checking only on drop), default is `true`
		 * @name $.jstree.defaults.dnd.check_while_dragging
		 * @plugin dnd
		 */
		check_while_dragging : true,
		/**
		 * a boolean indicating if nodes from this tree should only be copied with dnd (as opposed to moved), default is `false`
		 * @name $.jstree.defaults.dnd.always_copy
		 * @plugin dnd
		 */
		always_copy : false,
		/**
		 * when dropping a node "inside", this setting indicates the position the node should go to - it can be an integer or a string: "first" (same as 0) or "last", default is `0`
		 * @name $.jstree.defaults.dnd.inside_pos
		 * @plugin dnd
		 */
		inside_pos : 0,
		/**
		 * when starting the drag on a node that is selected this setting controls if all selected nodes are dragged or only the single node, default is `true`, which means all selected nodes are dragged when the drag is started on a selected node
		 * @name $.jstree.defaults.dnd.drag_selection
		 * @plugin dnd
		 */
		drag_selection : true,
		/**
		 * controls whether dnd works on touch devices. If left as boolean true dnd will work the same as in desktop browsers, which in some cases may impair scrolling. If set to boolean false dnd will not work on touch devices. There is a special third option - string "selected" which means only selected nodes can be dragged on touch devices.
		 * @name $.jstree.defaults.dnd.touch
		 * @plugin dnd
		 */
		touch : true,
		/**
		 * controls whether items can be dropped anywhere on the node, not just on the anchor, by default only the node anchor is a valid drop target. Works best with the wholerow plugin. If enabled on mobile depending on the interface it might be hard for the user to cancel the drop, since the whole tree container will be a valid drop target.
		 * @name $.jstree.defaults.dnd.large_drop_target
		 * @plugin dnd
		 */
		large_drop_target : false,
		/**
		 * controls whether a drag can be initiated from any part of the node and not just the text/icon part, works best with the wholerow plugin. Keep in mind it can cause problems with tree scrolling on mobile depending on the interface - in that case set the touch option to "selected".
		 * @name $.jstree.defaults.dnd.large_drag_target
		 * @plugin dnd
		 */
		large_drag_target : false,
		/**
		 * controls whether use HTML5 dnd api instead of classical. That will allow better integration of dnd events with other HTML5 controls.
		 * @reference http://caniuse.com/#feat=dragndrop
		 * @name $.jstree.defaults.dnd.use_html5
		 * @plugin dnd
		 */
		use_html5: false
	};
	var drg, elm;
	// TODO: now check works by checking for each node individually, how about max_children, unique, etc?
	$.jstree.plugins.dnd = function (options, parent) {
		this.init = function (el, options) {
			parent.init.call(this, el, options);
			this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && ('draggable' in document.createElement('span'));
		};
		this.bind = function () {
			parent.bind.call(this);

			this.element
				.on(this.settings.dnd.use_html5 ? 'dragstart.jstree' : 'mousedown.jstree touchstart.jstree', this.settings.dnd.large_drag_target ? '.jstree-node' : '.jstree-anchor', function (e) {
						if(this.settings.dnd.large_drag_target && $(e.target).closest('.jstree-node')[0] !== e.currentTarget) {
							return true;
						}
						if(e.type === "touchstart" && (!this.settings.dnd.touch || (this.settings.dnd.touch === 'selected' && !$(e.currentTarget).closest('.jstree-node').children('.jstree-anchor').hasClass('jstree-clicked')))) {
							return true;
						}
						var obj = this.get_node(e.target),
							mlt = this.is_selected(obj) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1,
							txt = (mlt > 1 ? mlt + ' ' + this.get_string('nodes') : this.get_text(e.currentTarget));
						if(this.settings.core.force_text) {
							txt = $.vakata.html.escape(txt);
						}
						if(obj && obj.id && obj.id !== $.jstree.root && (e.which === 1 || e.type === "touchstart" || e.type === "dragstart") &&
							(this.settings.dnd.is_draggable === true || ($.vakata.is_function(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, (mlt > 1 ? this.get_top_selected(true) : [obj]), e)))
						) {
							drg = { 'jstree' : true, 'origin' : this, 'obj' : this.get_node(obj,true), 'nodes' : mlt > 1 ? this.get_top_selected() : [obj.id] };
							elm = e.currentTarget;
							if (this.settings.dnd.use_html5) {
								$.vakata.dnd._trigger('start', e, { 'helper': $(), 'element': elm, 'data': drg });
							} else {
								this.element.trigger('mousedown.jstree');
								return $.vakata.dnd.start(e, drg, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + ' jstree-' + this.get_theme() + '-' + this.get_theme_variant() + ' ' + ( this.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ) + '"><i class="jstree-icon jstree-er"></i>' + txt + '<ins class="jstree-copy">+</ins></div>');
							}
						}
					}.bind(this));
			if (this.settings.dnd.use_html5) {
				this.element
					.on('dragover.jstree', function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
							return false;
						})
					//.on('dragenter.jstree', this.settings.dnd.large_drop_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
					//		e.preventDefault();
					//		$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
					//		return false;
					//	}, this))
					.on('drop.jstree', function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('stop', e, { 'helper': $(), 'element': elm, 'data': drg });
							return false;
						}.bind(this));
			}
		};
		this.redraw_node = function(obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj && this.settings.dnd.use_html5) {
				if (this.settings.dnd.large_drag_target) {
					obj.setAttribute('draggable', true);
				} else {
					var i, j, tmp = null;
					for(i = 0, j = obj.childNodes.length; i < j; i++) {
						if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if(tmp) {
						tmp.setAttribute('draggable', true);
					}
				}
			}
			return obj;
		};
	};

	$(function() {
		// bind only once for all instances
		var lastmv = false,
			laster = false,
			lastev = false,
			opento = false,
			marker = $('<div id="jstree-marker">&#160;</div>').hide(); //.appendTo('body');

		$(document)
			.on('dragover.vakata.jstree', function (e) {
				if (elm) {
					$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
				}
			})
			.on('drop.vakata.jstree', function (e) {
				if (elm) {
					$.vakata.dnd._trigger('stop', e, { 'helper': $(), 'element': elm, 'data': drg });
					elm = null;
					drg = null;
				}
			})
			.on('dnd_start.vakata.jstree', function (e, data) {
				lastmv = false;
				lastev = false;
				if(!data || !data.data || !data.data.jstree) { return; }
				marker.appendTo(document.body); //.show();
			})
			.on('dnd_move.vakata.jstree', function (e, data) {
				var isDifferentNode = data.event.target !== lastev.target;
				if(opento) {
					if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
						clearTimeout(opento);
					}
				}
				if(!data || !data.data || !data.data.jstree) { return; }

				// if we are hovering the marker image do nothing (can happen on "inside" drags)
				if(data.event.target.id && data.event.target.id === 'jstree-marker') {
					return;
				}
				lastev = data.event;

				var ins = $.jstree.reference(data.event.target),
					ref = false,
					off = false,
					rel = false,
					tmp, l, t, h, p, i, o, ok, t1, t2, op, ps, pr, ip, tm, is_copy, pn, c;
				// if we are over an instance
				if(ins && ins._data && ins._data.dnd) {
					marker.attr('class', 'jstree-' + ins.get_theme() + ( ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ));
					is_copy = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)));
					data.helper
						.children().attr('class', 'jstree-' + ins.get_theme() + ' jstree-' + ins.get_theme() + '-' + ins.get_theme_variant() + ' ' + ( ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ))
						.find('.jstree-copy').first()[ is_copy ? 'show' : 'hide' ]();

					// if are hovering the container itself add a new root node
					//console.log(data.event);
					if( (data.event.target === ins.element[0] || data.event.target === ins.get_container_ul()[0]) && ins.get_container_ul().children().length === 0) {
						ok = true;
						for(t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
							ok = ok && ins.check( (data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)) ) ? "copy_node" : "move_node"), (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), $.jstree.root, 'last', { 'dnd' : true, 'ref' : ins.get_node($.jstree.root), 'pos' : 'i', 'origin' : data.data.origin, 'is_multi' : (data.data.origin && data.data.origin !== ins), 'is_foreign' : (!data.data.origin) });
							if(!ok) { break; }
						}
						if(ok) {
							lastmv = { 'ins' : ins, 'par' : $.jstree.root, 'pos' : 'last' };
							marker.hide();
							data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
							if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
								data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
							}
							return;
						}
					}
					else {
						// if we are hovering a tree node
						ref = ins.settings.dnd.large_drop_target ? $(data.event.target).closest('.jstree-node').children('.jstree-anchor') : $(data.event.target).closest('.jstree-anchor');
						if(ref && ref.length && ref.parent().is('.jstree-closed, .jstree-open, .jstree-leaf')) {
							off = ref.offset();
							rel = (data.event.pageY !== undefined ? data.event.pageY : data.event.originalEvent.pageY) - off.top;
							h = ref.outerHeight();
							if(rel < h / 3) {
								o = ['b', 'i', 'a'];
							}
							else if(rel > h - h / 3) {
								o = ['a', 'i', 'b'];
							}
							else {
								o = rel > h / 2 ? ['i', 'a', 'b'] : ['i', 'b', 'a'];
							}
							$.each(o, function (j, v) {
								switch(v) {
									case 'b':
										l = off.left - 6;
										t = off.top;
										p = ins.get_parent(ref);
										i = ref.parent().index();
										c = 'jstree-below';
										break;
									case 'i':
										ip = ins.settings.dnd.inside_pos;
										tm = ins.get_node(ref.parent());
										l = off.left - 2;
										t = off.top + h / 2 + 1;
										p = tm.id;
										i = ip === 'first' ? 0 : (ip === 'last' ? tm.children.length : Math.min(ip, tm.children.length));
										c = 'jstree-inside';
										break;
									case 'a':
										l = off.left - 6;
										t = off.top + h;
										p = ins.get_parent(ref);
										i = ref.parent().index() + 1;
										c = 'jstree-above';
										break;
								}
								ok = true;
								for(t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
									op = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? "copy_node" : "move_node";
									ps = i;
									if(op === "move_node" && v === 'a' && (data.data.origin && data.data.origin === ins) && p === ins.get_parent(data.data.nodes[t1])) {
										pr = ins.get_node(p);
										if(ps > $.inArray(data.data.nodes[t1], pr.children)) {
											ps -= 1;
										}
									}
									ok = ok && ( (ins && ins.settings && ins.settings.dnd && ins.settings.dnd.check_while_dragging === false) || ins.check(op, (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), p, ps, { 'dnd' : true, 'ref' : ins.get_node(ref.parent()), 'pos' : v, 'origin' : data.data.origin, 'is_multi' : (data.data.origin && data.data.origin !== ins), 'is_foreign' : (!data.data.origin) }) );
									if(!ok) {
										if(ins && ins.last_error) { laster = ins.last_error(); }
										break;
									}
								}
								if(v === 'i' && ref.parent().is('.jstree-closed') && ins.settings.dnd.open_timeout) {
									if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
										if (opento) { clearTimeout(opento); }
										opento = setTimeout((function (x, z) { return function () { x.open_node(z); }; }(ins, ref)), ins.settings.dnd.open_timeout);
									}
								}
								if(ok) {
									pn = ins.get_node(p, true);
									if (!pn.hasClass('.jstree-dnd-parent')) {
										$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
										pn.addClass('jstree-dnd-parent');
									}
									lastmv = { 'ins' : ins, 'par' : p, 'pos' : v === 'i' && ip === 'last' && i === 0 && !ins.is_loaded(tm) ? 'last' : i };
									marker.css({ 'left' : l + 'px', 'top' : t + 'px' }).show();
									marker.removeClass('jstree-above jstree-inside jstree-below').addClass(c);
									data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
									if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
										data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
									}
									laster = {};
									o = true;
									return false;
								}
							});
							if(o === true) { return; }
						}
					}
				}
				$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
				lastmv = false;
				data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
				if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
					//data.event.originalEvent.dataTransfer.dropEffect = 'none';
				}
				marker.hide();
			})
			.on('dnd_scroll.vakata.jstree', function (e, data) {
				if(!data || !data.data || !data.data.jstree) { return; }
				marker.hide();
				lastmv = false;
				lastev = false;
				data.helper.find('.jstree-icon').first().removeClass('jstree-ok').addClass('jstree-er');
			})
			.on('dnd_stop.vakata.jstree', function (e, data) {
				$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
				if(opento) { clearTimeout(opento); }
				if(!data || !data.data || !data.data.jstree) { return; }
				marker.hide().detach();
				var i, j, nodes = [];
				if(lastmv) {
					for(i = 0, j = data.data.nodes.length; i < j; i++) {
						nodes[i] = data.data.origin ? data.data.origin.get_node(data.data.nodes[i]) : data.data.nodes[i];
					}
					lastmv.ins[ data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? 'copy_node' : 'move_node' ](nodes, lastmv.par, lastmv.pos, false, false, false, data.data.origin);
				}
				else {
					i = $(data.event.target).closest('.jstree');
					if(i.length && laster && laster.error && laster.error === 'check') {
						i = i.jstree(true);
						if(i) {
							i.settings.core.error.call(this, laster);
						}
					}
				}
				lastev = false;
				lastmv = false;
			})
			.on('keyup.jstree keydown.jstree', function (e, data) {
				data = $.vakata.dnd._get();
				if(data && data.data && data.data.jstree) {
					if (e.type === "keyup" && e.which === 27) {
						if (opento) { clearTimeout(opento); }
						lastmv = false;
						laster = false;
						lastev = false;
						opento = false;
						marker.hide().detach();
						$.vakata.dnd._clean();
					} else {
						data.helper.find('.jstree-copy').first()[ data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (e.metaKey || e.ctrlKey))) ? 'show' : 'hide' ]();
						if(lastev) {
							lastev.metaKey = e.metaKey;
							lastev.ctrlKey = e.ctrlKey;
							$.vakata.dnd._trigger('move', lastev);
						}
					}
				}
			});
	});

	// helpers
	(function ($) {
		$.vakata.html = {
			div : $('<div></div>'),
			escape : function (str) {
				return $.vakata.html.div.text(str).html();
			},
			strip : function (str) {
				return $.vakata.html.div.empty().append($.parseHTML(str)).text();
			}
		};
		// private variable
		var vakata_dnd = {
			element	: false,
			target	: false,
			is_down	: false,
			is_drag	: false,
			helper	: false,
			helper_w: 0,
			data	: false,
			init_x	: 0,
			init_y	: 0,
			scroll_l: 0,
			scroll_t: 0,
			scroll_e: false,
			scroll_i: false,
			is_touch: false
		};
		$.vakata.dnd = {
			settings : {
				scroll_speed		: 10,
				scroll_proximity	: 20,
				helper_left			: 5,
				helper_top			: 10,
				threshold			: 5,
				threshold_touch		: 10
			},
			_trigger : function (event_name, e, data) {
				if (data === undefined) {
					data = $.vakata.dnd._get();
				}
				data.event = e;
				$(document).triggerHandler("dnd_" + event_name + ".vakata", data);
			},
			_get : function () {
				return {
					"data"		: vakata_dnd.data,
					"element"	: vakata_dnd.element,
					"helper"	: vakata_dnd.helper
				};
			},
			_clean : function () {
				if(vakata_dnd.helper) { vakata_dnd.helper.remove(); }
				if(vakata_dnd.scroll_i) { clearInterval(vakata_dnd.scroll_i); vakata_dnd.scroll_i = false; }
				vakata_dnd = {
					element	: false,
					target	: false,
					is_down	: false,
					is_drag	: false,
					helper	: false,
					helper_w: 0,
					data	: false,
					init_x	: 0,
					init_y	: 0,
					scroll_l: 0,
					scroll_t: 0,
					scroll_e: false,
					scroll_i: false,
					is_touch: false
				};
				elm = null;
				$(document).off("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
				$(document).off("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
			},
			_scroll : function (init_only) {
				if(!vakata_dnd.scroll_e || (!vakata_dnd.scroll_l && !vakata_dnd.scroll_t)) {
					if(vakata_dnd.scroll_i) { clearInterval(vakata_dnd.scroll_i); vakata_dnd.scroll_i = false; }
					return false;
				}
				if(!vakata_dnd.scroll_i) {
					vakata_dnd.scroll_i = setInterval($.vakata.dnd._scroll, 100);
					return false;
				}
				if(init_only === true) { return false; }

				var i = vakata_dnd.scroll_e.scrollTop(),
					j = vakata_dnd.scroll_e.scrollLeft();
				vakata_dnd.scroll_e.scrollTop(i + vakata_dnd.scroll_t * $.vakata.dnd.settings.scroll_speed);
				vakata_dnd.scroll_e.scrollLeft(j + vakata_dnd.scroll_l * $.vakata.dnd.settings.scroll_speed);
				if(i !== vakata_dnd.scroll_e.scrollTop() || j !== vakata_dnd.scroll_e.scrollLeft()) {
					/**
					 * triggered on the document when a drag causes an element to scroll
					 * @event
					 * @plugin dnd
					 * @name dnd_scroll.vakata
					 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
					 * @param {DOM} element the DOM element being dragged
					 * @param {jQuery} helper the helper shown next to the mouse
					 * @param {jQuery} event the element that is scrolling
					 */
					$.vakata.dnd._trigger("scroll", vakata_dnd.scroll_e);
				}
			},
			start : function (e, data, html) {
				if(e.type === "touchstart" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if(vakata_dnd.is_drag) { $.vakata.dnd.stop({}); }
				try {
					e.currentTarget.unselectable = "on";
					e.currentTarget.onselectstart = function() { return false; };
					if(e.currentTarget.style) {
						e.currentTarget.style.touchAction = "none";
						e.currentTarget.style.msTouchAction = "none";
						e.currentTarget.style.MozUserSelect = "none";
					}
				} catch(ignore) { }
				vakata_dnd.init_x	= e.pageX;
				vakata_dnd.init_y	= e.pageY;
				vakata_dnd.data		= data;
				vakata_dnd.is_down	= true;
				vakata_dnd.element	= e.currentTarget;
				vakata_dnd.target	= e.target;
				vakata_dnd.is_touch	= e.type === "touchstart";
				if(html !== false) {
					vakata_dnd.helper = $("<div id='vakata-dnd'></div>").html(html).css({
						"display"		: "block",
						"margin"		: "0",
						"padding"		: "0",
						"position"		: "absolute",
						"top"			: "-2000px",
						"lineHeight"	: "16px",
						"zIndex"		: "10000"
					});
				}
				$(document).on("mousemove.vakata.jstree touchmove.vakata.jstree", $.vakata.dnd.drag);
				$(document).on("mouseup.vakata.jstree touchend.vakata.jstree", $.vakata.dnd.stop);
				return false;
			},
			drag : function (e) {
				if(e.type === "touchmove" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if(!vakata_dnd.is_down) { return; }
				if(!vakata_dnd.is_drag) {
					if(
						Math.abs(e.pageX - vakata_dnd.init_x) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold) ||
						Math.abs(e.pageY - vakata_dnd.init_y) > (vakata_dnd.is_touch ? $.vakata.dnd.settings.threshold_touch : $.vakata.dnd.settings.threshold)
					) {
						if(vakata_dnd.helper) {
							vakata_dnd.helper.appendTo(document.body);
							vakata_dnd.helper_w = vakata_dnd.helper.outerWidth();
						}
						vakata_dnd.is_drag = true;
						$(vakata_dnd.target).one('click.vakata', false);
						/**
						 * triggered on the document when a drag starts
						 * @event
						 * @plugin dnd
						 * @name dnd_start.vakata
						 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
						 * @param {DOM} element the DOM element being dragged
						 * @param {jQuery} helper the helper shown next to the mouse
						 * @param {Object} event the event that caused the start (probably mousemove)
						 */
						$.vakata.dnd._trigger("start", e);
					}
					else { return; }
				}

				var d  = false, w  = false,
					dh = false, wh = false,
					dw = false, ww = false,
					dt = false, dl = false,
					ht = false, hl = false;

				vakata_dnd.scroll_t = 0;
				vakata_dnd.scroll_l = 0;
				vakata_dnd.scroll_e = false;
				$($(e.target).parentsUntil("body").addBack().get().reverse())
					.filter(function () {
						return	(/^auto|scroll$/).test($(this).css("overflow")) &&
								(this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth);
					})
					.each(function () {
						var t = $(this), o = t.offset();
						if(this.scrollHeight > this.offsetHeight) {
							if(o.top + t.height() - e.pageY < $.vakata.dnd.settings.scroll_proximity)	{ vakata_dnd.scroll_t = 1; }
							if(e.pageY - o.top < $.vakata.dnd.settings.scroll_proximity)				{ vakata_dnd.scroll_t = -1; }
						}
						if(this.scrollWidth > this.offsetWidth) {
							if(o.left + t.width() - e.pageX < $.vakata.dnd.settings.scroll_proximity)	{ vakata_dnd.scroll_l = 1; }
							if(e.pageX - o.left < $.vakata.dnd.settings.scroll_proximity)				{ vakata_dnd.scroll_l = -1; }
						}
						if(vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
							vakata_dnd.scroll_e = $(this);
							return false;
						}
					});

				if(!vakata_dnd.scroll_e) {
					d  = $(document); w = $(window);
					dh = d.height(); wh = w.height();
					dw = d.width(); ww = w.width();
					dt = d.scrollTop(); dl = d.scrollLeft();
					if(dh > wh && e.pageY - dt < $.vakata.dnd.settings.scroll_proximity)		{ vakata_dnd.scroll_t = -1;  }
					if(dh > wh && wh - (e.pageY - dt) < $.vakata.dnd.settings.scroll_proximity)	{ vakata_dnd.scroll_t = 1; }
					if(dw > ww && e.pageX - dl < $.vakata.dnd.settings.scroll_proximity)		{ vakata_dnd.scroll_l = -1; }
					if(dw > ww && ww - (e.pageX - dl) < $.vakata.dnd.settings.scroll_proximity)	{ vakata_dnd.scroll_l = 1; }
					if(vakata_dnd.scroll_t || vakata_dnd.scroll_l) {
						vakata_dnd.scroll_e = d;
					}
				}
				if(vakata_dnd.scroll_e) { $.vakata.dnd._scroll(true); }

				if(vakata_dnd.helper) {
					ht = parseInt(e.pageY + $.vakata.dnd.settings.helper_top, 10);
					hl = parseInt(e.pageX + $.vakata.dnd.settings.helper_left, 10);
					if(dh && ht + 25 > dh) { ht = dh - 50; }
					if(dw && hl + vakata_dnd.helper_w > dw) { hl = dw - (vakata_dnd.helper_w + 2); }
					vakata_dnd.helper.css({
						left	: hl + "px",
						top		: ht + "px"
					});
				}
				/**
				 * triggered on the document when a drag is in progress
				 * @event
				 * @plugin dnd
				 * @name dnd_move.vakata
				 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
				 * @param {DOM} element the DOM element being dragged
				 * @param {jQuery} helper the helper shown next to the mouse
				 * @param {Object} event the event that caused this to trigger (most likely mousemove)
				 */
				$.vakata.dnd._trigger("move", e);
				return false;
			},
			stop : function (e) {
				if(e.type === "touchend" && e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches[0]) {
					e.pageX = e.originalEvent.changedTouches[0].pageX;
					e.pageY = e.originalEvent.changedTouches[0].pageY;
					e.target = document.elementFromPoint(e.originalEvent.changedTouches[0].pageX - window.pageXOffset, e.originalEvent.changedTouches[0].pageY - window.pageYOffset);
				}
				if(vakata_dnd.is_drag) {
					/**
					 * triggered on the document when a drag stops (the dragged element is dropped)
					 * @event
					 * @plugin dnd
					 * @name dnd_stop.vakata
					 * @param {Mixed} data any data supplied with the call to $.vakata.dnd.start
					 * @param {DOM} element the DOM element being dragged
					 * @param {jQuery} helper the helper shown next to the mouse
					 * @param {Object} event the event that caused the stop
					 */
					if (e.target !== vakata_dnd.target) {
						$(vakata_dnd.target).off('click.vakata');
					}
					$.vakata.dnd._trigger("stop", e);
				}
				else {
					if(e.type === "touchend" && e.target === vakata_dnd.target) {
						var to = setTimeout(function () { $(e.target).trigger('click'); }, 100);
						$(e.target).one('click', function() { if(to) { clearTimeout(to); } });
					}
				}
				$.vakata.dnd._clean();
				return false;
			}
		};
	}($));

	// include the dnd plugin by default
	// $.jstree.defaults.plugins.push("dnd");


/**
 * ### Massload plugin
 *
 * Adds massload functionality to jsTree, so that multiple nodes can be loaded in a single request (only useful with lazy loading).
 */

	/**
	 * massload configuration
	 *
	 * It is possible to set this to a standard jQuery-like AJAX config.
	 * In addition to the standard jQuery ajax options here you can supply functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node IDs need to be loaded, the return value of those functions will be used.
	 *
	 * You can also set this to a function, that function will receive the node IDs being loaded as argument and a second param which is a function (callback) which should be called with the result.
	 *
	 * Both the AJAX and the function approach rely on the same return value - an object where the keys are the node IDs, and the value is the children of that node as an array.
	 *
	 *	{
	 *		"id1" : [{ "text" : "Child of ID1", "id" : "c1" }, { "text" : "Another child of ID1", "id" : "c2" }],
	 *		"id2" : [{ "text" : "Child of ID2", "id" : "c3" }]
	 *	}
	 * 
	 * @name $.jstree.defaults.massload
	 * @plugin massload
	 */
	$.jstree.defaults.massload = null;
	$.jstree.plugins.massload = function (options, parent) {
		this.init = function (el, options) {
			this._data.massload = {};
			parent.init.call(this, el, options);
		};
		this._load_nodes = function (nodes, callback, is_callback, force_reload) {
			var s = this.settings.massload,				
				toLoad = [],
				m = this._model.data,
				i, j, dom;
			if (!is_callback) {
				for(i = 0, j = nodes.length; i < j; i++) {
					if(!m[nodes[i]] || ( (!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || force_reload) ) {
						toLoad.push(nodes[i]);
						dom = this.get_node(nodes[i], true);
						if (dom && dom.length) {
							dom.addClass("jstree-loading").attr('aria-busy',true);
						}
					}
				}
				this._data.massload = {};
				if (toLoad.length) {
					if($.vakata.is_function(s)) {
						return s.call(this, toLoad, function (data) {
							var i, j;
							if(data) {
								for(i in data) {
									if(data.hasOwnProperty(i)) {
										this._data.massload[i] = data[i];
									}
								}
							}
							for(i = 0, j = nodes.length; i < j; i++) {
								dom = this.get_node(nodes[i], true);
								if (dom && dom.length) {
									dom.removeClass("jstree-loading").attr('aria-busy',false);
								}
							}
							parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
						}.bind(this));
					}
					if(typeof s === 'object' && s && s.url) {
						s = $.extend(true, {}, s);
						if($.vakata.is_function(s.url)) {
							s.url = s.url.call(this, toLoad);
						}
						if($.vakata.is_function(s.data)) {
							s.data = s.data.call(this, toLoad);
						}
						return $.ajax(s)
							.done(function (data,t,x) {
									var i, j;
									if(data) {
										for(i in data) {
											if(data.hasOwnProperty(i)) {
												this._data.massload[i] = data[i];
											}
										}
									}
									for(i = 0, j = nodes.length; i < j; i++) {
										dom = this.get_node(nodes[i], true);
										if (dom && dom.length) {
											dom.removeClass("jstree-loading").attr('aria-busy',false);
										}
									}
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}.bind(this))
							.fail(function (f) {
									parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
								}.bind(this));
					}
				}
			}
			return parent._load_nodes.call(this, nodes, callback, is_callback, force_reload);
		};
		this._load_node = function (obj, callback) {
			var data = this._data.massload[obj.id],
				rslt = null, dom;
			if(data) {
				rslt = this[typeof data === 'string' ? '_append_html_data' : '_append_json_data'](
					obj,
					typeof data === 'string' ? $($.parseHTML(data)).filter(function () { return this.nodeType !== 3; }) : data,
					function (status) { callback.call(this, status); }
				);
				dom = this.get_node(obj.id, true);
				if (dom && dom.length) {
					dom.removeClass("jstree-loading").attr('aria-busy',false);
				}
				delete this._data.massload[obj.id];
				return rslt;
			}
			return parent._load_node.call(this, obj, callback);
		};
	};


/**
 * ### Search plugin
 *
 * Adds search functionality to jsTree.
 */

	/**
	 * stores all defaults for the search plugin
	 * @name $.jstree.defaults.search
	 * @plugin search
	 */
	$.jstree.defaults.search = {
		/**
		 * a jQuery-like AJAX config, which jstree uses if a server should be queried for results.
		 *
		 * A `str` (which is the search string) parameter will be added with the request, an optional `inside` parameter will be added if the search is limited to a node id. The expected result is a JSON array with nodes that need to be opened so that matching nodes will be revealed.
		 * Leave this setting as `false` to not query the server. You can also set this to a function, which will be invoked in the instance's scope and receive 3 parameters - the search string, the callback to call with the array of nodes to load, and the optional node ID to limit the search to
		 * @name $.jstree.defaults.search.ajax
		 * @plugin search
		 */
		ajax : false,
		/**
		 * Indicates if the search should be fuzzy or not (should `chnd3` match `child node 3`). Default is `false`.
		 * @name $.jstree.defaults.search.fuzzy
		 * @plugin search
		 */
		fuzzy : false,
		/**
		 * Indicates if the search should be case sensitive. Default is `false`.
		 * @name $.jstree.defaults.search.case_sensitive
		 * @plugin search
		 */
		case_sensitive : false,
		/**
		 * Indicates if the tree should be filtered (by default) to show only matching nodes (keep in mind this can be a heavy on large trees in old browsers).
		 * This setting can be changed at runtime when calling the search method. Default is `false`.
		 * @name $.jstree.defaults.search.show_only_matches
		 * @plugin search
		 */
		show_only_matches : false,
		/**
		 * Indicates if the children of matched element are shown (when show_only_matches is true)
		 * This setting can be changed at runtime when calling the search method. Default is `false`.
		 * @name $.jstree.defaults.search.show_only_matches_children
		 * @plugin search
		 */
		show_only_matches_children : false,
		/**
		 * Indicates if all nodes opened to reveal the search result, should be closed when the search is cleared or a new search is performed. Default is `true`.
		 * @name $.jstree.defaults.search.close_opened_onclear
		 * @plugin search
		 */
		close_opened_onclear : true,
		/**
		 * Indicates if only leaf nodes should be included in search results. Default is `false`.
		 * @name $.jstree.defaults.search.search_leaves_only
		 * @plugin search
		 */
		search_leaves_only : false,
		/**
		 * If set to a function it wil be called in the instance's scope with two arguments - search string and node (where node will be every node in the structure, so use with caution).
		 * If the function returns a truthy value the node will be considered a match (it might not be displayed if search_only_leaves is set to true and the node is not a leaf). Default is `false`.
		 * @name $.jstree.defaults.search.search_callback
		 * @plugin search
		 */
		search_callback : false
	};

	$.jstree.plugins.search = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			this._data.search.str = "";
			this._data.search.dom = $();
			this._data.search.res = [];
			this._data.search.opn = [];
			this._data.search.som = false;
			this._data.search.smc = false;
			this._data.search.hdn = [];

			this.element
				.on("search.jstree", function (e, data) {
						if(this._data.search.som && data.res.length) {
							var m = this._model.data, i, j, p = [], k, l;
							for(i = 0, j = data.res.length; i < j; i++) {
								if(m[data.res[i]] && !m[data.res[i]].state.hidden) {
									p.push(data.res[i]);
									p = p.concat(m[data.res[i]].parents);
									if(this._data.search.smc) {
										for (k = 0, l = m[data.res[i]].children_d.length; k < l; k++) {
											if (m[m[data.res[i]].children_d[k]] && !m[m[data.res[i]].children_d[k]].state.hidden) {
												p.push(m[data.res[i]].children_d[k]);
											}
										}
									}
								}
							}
							p = $.vakata.array_remove_item($.vakata.array_unique(p), $.jstree.root);
							this._data.search.hdn = this.hide_all(true);
							this.show_node(p, true);
							this.redraw(true);
						}
					}.bind(this))
				.on("clear_search.jstree", function (e, data) {
						if(this._data.search.som && data.res.length) {
							this.show_node(this._data.search.hdn, true);
							this.redraw(true);
						}
					}.bind(this));
		};
		/**
		 * used to search the tree nodes for a given string
		 * @name search(str [, skip_async])
		 * @param {String} str the search string
		 * @param {Boolean} skip_async if set to true server will not be queried even if configured
		 * @param {Boolean} show_only_matches if set to true only matching nodes will be shown (keep in mind this can be very slow on large trees or old browsers)
		 * @param {mixed} inside an optional node to whose children to limit the search
		 * @param {Boolean} append if set to true the results of this search are appended to the previous search
		 * @plugin search
		 * @trigger search.jstree
		 */
		this.search = function (str, skip_async, show_only_matches, inside, append, show_only_matches_children) {
			if(str === false || $.vakata.trim(str.toString()) === "") {
				return this.clear_search();
			}
			inside = this.get_node(inside);
			inside = inside && inside.id ? inside.id : null;
			str = str.toString();
			var s = this.settings.search,
				a = s.ajax ? s.ajax : false,
				m = this._model.data,
				f = null,
				r = [],
				p = [], i, j;
			if(this._data.search.res.length && !append) {
				this.clear_search();
			}
			if(show_only_matches === undefined) {
				show_only_matches = s.show_only_matches;
			}
			if(show_only_matches_children === undefined) {
				show_only_matches_children = s.show_only_matches_children;
			}
			if(!skip_async && a !== false) {
				if($.vakata.is_function(a)) {
					return a.call(this, str, function (d) {
							if(d && d.d) { d = d.d; }
							this._load_nodes(!$.vakata.is_array(d) ? [] : $.vakata.array_unique(d), function () {
								this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
							});
						}.bind(this), inside);
				}
				else {
					a = $.extend({}, a);
					if(!a.data) { a.data = {}; }
					a.data.str = str;
					if(inside) {
						a.data.inside = inside;
					}
					if (this._data.search.lastRequest) {
						this._data.search.lastRequest.abort();
					}
					this._data.search.lastRequest = $.ajax(a)
						.fail(function () {
							this._data.core.last_error = { 'error' : 'ajax', 'plugin' : 'search', 'id' : 'search_01', 'reason' : 'Could not load search parents', 'data' : JSON.stringify(a) };
							this.settings.core.error.call(this, this._data.core.last_error);
						}.bind(this))
						.done(function (d) {
							if(d && d.d) { d = d.d; }
							this._load_nodes(!$.vakata.is_array(d) ? [] : $.vakata.array_unique(d), function () {
								this.search(str, true, show_only_matches, inside, append, show_only_matches_children);
							});
						}.bind(this));
					return this._data.search.lastRequest;
				}
			}
			if(!append) {
				this._data.search.str = str;
				this._data.search.dom = $();
				this._data.search.res = [];
				this._data.search.opn = [];
				this._data.search.som = show_only_matches;
				this._data.search.smc = show_only_matches_children;
			}

			f = new $.vakata.search(str, true, { caseSensitive : s.case_sensitive, fuzzy : s.fuzzy });
			$.each(m[inside ? inside : $.jstree.root].children_d, function (ii, i) {
				var v = m[i];
				if(v.text && !v.state.hidden && (!s.search_leaves_only || (v.state.loaded && v.children.length === 0)) && ( (s.search_callback && s.search_callback.call(this, str, v)) || (!s.search_callback && f.search(v.text).isMatch) ) ) {
					r.push(i);
					p = p.concat(v.parents);
				}
			});
			if(r.length) {
				p = $.vakata.array_unique(p);
				for(i = 0, j = p.length; i < j; i++) {
					if(p[i] !== $.jstree.root && m[p[i]] && this.open_node(p[i], null, 0) === true) {
						this._data.search.opn.push(p[i]);
					}
				}
				if(!append) {
					this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(r, function (v) { return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex,'\\$&') : v.replace($.jstree.idregex,'\\$&'); }).join(', #')));
					this._data.search.res = r;
				}
				else {
					this._data.search.dom = this._data.search.dom.add($(this.element[0].querySelectorAll('#' + $.map(r, function (v) { return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex,'\\$&') : v.replace($.jstree.idregex,'\\$&'); }).join(', #'))));
					this._data.search.res = $.vakata.array_unique(this._data.search.res.concat(r));
				}
				this._data.search.dom.children(".jstree-anchor").addClass('jstree-search');
			}
			/**
			 * triggered after search is complete
			 * @event
			 * @name search.jstree
			 * @param {jQuery} nodes a jQuery collection of matching nodes
			 * @param {String} str the search string
			 * @param {Array} res a collection of objects represeing the matching nodes
			 * @plugin search
			 */
			this.trigger('search', { nodes : this._data.search.dom, str : str, res : this._data.search.res, show_only_matches : show_only_matches });
		};
		/**
		 * used to clear the last search (removes classes and shows all nodes if filtering is on)
		 * @name clear_search()
		 * @plugin search
		 * @trigger clear_search.jstree
		 */
		this.clear_search = function () {
			if(this.settings.search.close_opened_onclear) {
				this.close_node(this._data.search.opn, 0);
			}
			/**
			 * triggered after search is complete
			 * @event
			 * @name clear_search.jstree
			 * @param {jQuery} nodes a jQuery collection of matching nodes (the result from the last search)
			 * @param {String} str the search string (the last search string)
			 * @param {Array} res a collection of objects represeing the matching nodes (the result from the last search)
			 * @plugin search
			 */
			this.trigger('clear_search', { 'nodes' : this._data.search.dom, str : this._data.search.str, res : this._data.search.res });
			if(this._data.search.res.length) {
				this._data.search.dom = $(this.element[0].querySelectorAll('#' + $.map(this._data.search.res, function (v) {
					return "0123456789".indexOf(v[0]) !== -1 ? '\\3' + v[0] + ' ' + v.substr(1).replace($.jstree.idregex,'\\$&') : v.replace($.jstree.idregex,'\\$&');
				}).join(', #')));
				this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search");
			}
			this._data.search.str = "";
			this._data.search.res = [];
			this._data.search.opn = [];
			this._data.search.dom = $();
		};

		this.redraw_node = function(obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if(obj) {
				if($.inArray(obj.id, this._data.search.res) !== -1) {
					var i, j, tmp = null;
					for(i = 0, j = obj.childNodes.length; i < j; i++) {
						if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if(tmp) {
						tmp.className += ' jstree-search';
					}
				}
			}
			return obj;
		};
	};

	// helpers
	(function ($) {
		// from http://kiro.me/projects/fuse.html
		$.vakata.search = function(pattern, txt, options) {
			options = options || {};
			options = $.extend({}, $.vakata.search.defaults, options);
			if(options.fuzzy !== false) {
				options.fuzzy = true;
			}
			pattern = options.caseSensitive ? pattern : pattern.toLowerCase();
			var MATCH_LOCATION	= options.location,
				MATCH_DISTANCE	= options.distance,
				MATCH_THRESHOLD	= options.threshold,
				patternLen = pattern.length,
				matchmask, pattern_alphabet, match_bitapScore, search;
			if(patternLen > 32) {
				options.fuzzy = false;
			}
			if(options.fuzzy) {
				matchmask = 1 << (patternLen - 1);
				pattern_alphabet = (function () {
					var mask = {},
						i = 0;
					for (i = 0; i < patternLen; i++) {
						mask[pattern.charAt(i)] = 0;
					}
					for (i = 0; i < patternLen; i++) {
						mask[pattern.charAt(i)] |= 1 << (patternLen - i - 1);
					}
					return mask;
				}());
				match_bitapScore = function (e, x) {
					var accuracy = e / patternLen,
						proximity = Math.abs(MATCH_LOCATION - x);
					if(!MATCH_DISTANCE) {
						return proximity ? 1.0 : accuracy;
					}
					return accuracy + (proximity / MATCH_DISTANCE);
				};
			}
			search = function (text) {
				text = options.caseSensitive ? text : text.toLowerCase();
				if(pattern === text || text.indexOf(pattern) !== -1) {
					return {
						isMatch: true,
						score: 0
					};
				}
				if(!options.fuzzy) {
					return {
						isMatch: false,
						score: 1
					};
				}
				var i, j,
					textLen = text.length,
					scoreThreshold = MATCH_THRESHOLD,
					bestLoc = text.indexOf(pattern, MATCH_LOCATION),
					binMin, binMid,
					binMax = patternLen + textLen,
					lastRd, start, finish, rd, charMatch,
					score = 1,
					locations = [];
				if (bestLoc !== -1) {
					scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
					bestLoc = text.lastIndexOf(pattern, MATCH_LOCATION + patternLen);
					if (bestLoc !== -1) {
						scoreThreshold = Math.min(match_bitapScore(0, bestLoc), scoreThreshold);
					}
				}
				bestLoc = -1;
				for (i = 0; i < patternLen; i++) {
					binMin = 0;
					binMid = binMax;
					while (binMin < binMid) {
						if (match_bitapScore(i, MATCH_LOCATION + binMid) <= scoreThreshold) {
							binMin = binMid;
						} else {
							binMax = binMid;
						}
						binMid = Math.floor((binMax - binMin) / 2 + binMin);
					}
					binMax = binMid;
					start = Math.max(1, MATCH_LOCATION - binMid + 1);
					finish = Math.min(MATCH_LOCATION + binMid, textLen) + patternLen;
					rd = new Array(finish + 2);
					rd[finish + 1] = (1 << i) - 1;
					for (j = finish; j >= start; j--) {
						charMatch = pattern_alphabet[text.charAt(j - 1)];
						if (i === 0) {
							rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
						} else {
							rd[j] = ((rd[j + 1] << 1) | 1) & charMatch | (((lastRd[j + 1] | lastRd[j]) << 1) | 1) | lastRd[j + 1];
						}
						if (rd[j] & matchmask) {
							score = match_bitapScore(i, j - 1);
							if (score <= scoreThreshold) {
								scoreThreshold = score;
								bestLoc = j - 1;
								locations.push(bestLoc);
								if (bestLoc > MATCH_LOCATION) {
									start = Math.max(1, 2 * MATCH_LOCATION - bestLoc);
								} else {
									break;
								}
							}
						}
					}
					if (match_bitapScore(i + 1, MATCH_LOCATION) > scoreThreshold) {
						break;
					}
					lastRd = rd;
				}
				return {
					isMatch: bestLoc >= 0,
					score: score
				};
			};
			return txt === true ? { 'search' : search } : search(txt);
		};
		$.vakata.search.defaults = {
			location : 0,
			distance : 100,
			threshold : 0.6,
			fuzzy : false,
			caseSensitive : false
		};
	}($));

	// include the search plugin by default
	// $.jstree.defaults.plugins.push("search");


/**
 * ### Sort plugin
 *
 * Automatically sorts all siblings in the tree according to a sorting function.
 */

	/**
	 * the settings function used to sort the nodes.
	 * It is executed in the tree's context, accepts two nodes as arguments and should return `1` or `-1`.
	 * @name $.jstree.defaults.sort
	 * @plugin sort
	 */
	$.jstree.defaults.sort = function (a, b) {
		//return this.get_type(a) === this.get_type(b) ? (this.get_text(a) > this.get_text(b) ? 1 : -1) : this.get_type(a) >= this.get_type(b);
		return this.get_text(a) > this.get_text(b) ? 1 : -1;
	};
	$.jstree.plugins.sort = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this.element
				.on("model.jstree", function (e, data) {
						this.sort(data.parent, true);
					}.bind(this))
				.on("rename_node.jstree create_node.jstree", function (e, data) {
						this.sort(data.parent || data.node.parent, false);
						this.redraw_node(data.parent || data.node.parent, true);
					}.bind(this))
				.on("move_node.jstree copy_node.jstree", function (e, data) {
						this.sort(data.parent, false);
						this.redraw_node(data.parent, true);
					}.bind(this));
		};
		/**
		 * used to sort a node's children
		 * @private
		 * @name sort(obj [, deep])
		 * @param  {mixed} obj the node
		 * @param {Boolean} deep if set to `true` nodes are sorted recursively.
		 * @plugin sort
		 * @trigger search.jstree
		 */
		this.sort = function (obj, deep) {
			var i, j;
			obj = this.get_node(obj);
			if(obj && obj.children && obj.children.length) {
				obj.children.sort(this.settings.sort.bind(this));
				if(deep) {
					for(i = 0, j = obj.children_d.length; i < j; i++) {
						this.sort(obj.children_d[i], false);
					}
				}
			}
		};
	};

	// include the sort plugin by default
	// $.jstree.defaults.plugins.push("sort");

/**
 * ### State plugin
 *
 * Saves the state of the tree (selected nodes, opened nodes) on the user's computer using available options (localStorage, cookies, etc)
 */

	var to = false;
	/**
	 * stores all defaults for the state plugin
	 * @name $.jstree.defaults.state
	 * @plugin state
	 */
	$.jstree.defaults.state = {
		/**
		 * A string for the key to use when saving the current tree (change if using multiple trees in your project). Defaults to `jstree`.
		 * @name $.jstree.defaults.state.key
		 * @plugin state
		 */
		key		: 'jstree',
		/**
		 * A space separated list of events that trigger a state save. Defaults to `changed.jstree open_node.jstree close_node.jstree`.
		 * @name $.jstree.defaults.state.events
		 * @plugin state
		 */
		events	: 'changed.jstree open_node.jstree close_node.jstree check_node.jstree uncheck_node.jstree',
		/**
		 * Time in milliseconds after which the state will expire. Defaults to 'false' meaning - no expire.
		 * @name $.jstree.defaults.state.ttl
		 * @plugin state
		 */
		ttl		: false,
		/**
		 * A function that will be executed prior to restoring state with one argument - the state object. Can be used to clear unwanted parts of the state.
		 * @name $.jstree.defaults.state.filter
		 * @plugin state
		 */
		filter	: false,
		/**
		 * Should loaded nodes be restored (setting this to true means that it is possible that the whole tree will be loaded for some users - use with caution). Defaults to `false`
		 * @name $.jstree.defaults.state.preserve_loaded
		 * @plugin state
		 */
		preserve_loaded : false
	};
	$.jstree.plugins.state = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			var bind = function () {
				this.element.on(this.settings.state.events, function () {
					if(to) { clearTimeout(to); }
					to = setTimeout(function () { this.save_state(); }.bind(this), 100);
				}.bind(this));
				/**
				 * triggered when the state plugin is finished restoring the state (and immediately after ready if there is no state to restore).
				 * @event
				 * @name state_ready.jstree
				 * @plugin state
				 */
				this.trigger('state_ready');
			}.bind(this);
			this.element
				.on("ready.jstree", function (e, data) {
						this.element.one("restore_state.jstree", bind);
						if(!this.restore_state()) { bind(); }
					}.bind(this));
		};
		/**
		 * save the state
		 * @name save_state()
		 * @plugin state
		 */
		this.save_state = function () {
			var tm = this.get_state();
			if (!this.settings.state.preserve_loaded) {
				delete tm.core.loaded;
			}
			var st = { 'state' : tm, 'ttl' : this.settings.state.ttl, 'sec' : +(new Date()) };
			$.vakata.storage.set(this.settings.state.key, JSON.stringify(st));
		};
		/**
		 * restore the state from the user's computer
		 * @name restore_state()
		 * @plugin state
		 */
		this.restore_state = function () {
			var k = $.vakata.storage.get(this.settings.state.key);
			if(!!k) { try { k = JSON.parse(k); } catch(ex) { return false; } }
			if(!!k && k.ttl && k.sec && +(new Date()) - k.sec > k.ttl) { return false; }
			if(!!k && k.state) { k = k.state; }
			if(!!k && $.vakata.is_function(this.settings.state.filter)) { k = this.settings.state.filter.call(this, k); }
			if(!!k) {
				if (!this.settings.state.preserve_loaded) {
					delete k.core.loaded;
				}
				this.element.one("set_state.jstree", function (e, data) { data.instance.trigger('restore_state', { 'state' : $.extend(true, {}, k) }); });
				this.set_state(k);
				return true;
			}
			return false;
		};
		/**
		 * clear the state on the user's computer
		 * @name clear_state()
		 * @plugin state
		 */
		this.clear_state = function () {
			return $.vakata.storage.del(this.settings.state.key);
		};
	};

	(function ($, undefined) {
		$.vakata.storage = {
			// simply specifying the functions in FF throws an error
			set : function (key, val) { return window.localStorage.setItem(key, val); },
			get : function (key) { return window.localStorage.getItem(key); },
			del : function (key) { return window.localStorage.removeItem(key); }
		};
	}($));

	// include the state plugin by default
	// $.jstree.defaults.plugins.push("state");

/**
 * ### Types plugin
 *
 * Makes it possible to add predefined types for groups of nodes, which make it possible to easily control nesting rules and icon for each group.
 */

	/**
	 * An object storing all types as key value pairs, where the key is the type name and the value is an object that could contain following keys (all optional).
	 *
	 * * `max_children` the maximum number of immediate children this node type can have. Do not specify or set to `-1` for unlimited.
	 * * `max_depth` the maximum number of nesting this node type can have. A value of `1` would mean that the node can have children, but no grandchildren. Do not specify or set to `-1` for unlimited.
	 * * `valid_children` an array of node type strings, that nodes of this type can have as children. Do not specify or set to `-1` for no limits.
	 * * `icon` a string - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class. Omit to use the default icon from your theme.
	 * * `li_attr` an object of values which will be used to add HTML attributes on the resulting LI DOM node (merged with the node's own data)
	 * * `a_attr` an object of values which will be used to add HTML attributes on the resulting A DOM node (merged with the node's own data)
	 *
	 * There are two predefined types:
	 *
	 * * `#` represents the root of the tree, for example `max_children` would control the maximum number of root nodes.
	 * * `default` represents the default node - any settings here will be applied to all nodes that do not have a type specified.
	 *
	 * @name $.jstree.defaults.types
	 * @plugin types
	 */
	$.jstree.defaults.types = {
		'default' : {}
	};
	$.jstree.defaults.types[$.jstree.root] = {};

	$.jstree.plugins.types = function (options, parent) {
		this.init = function (el, options) {
			var i, j;
			if(options && options.types && options.types['default']) {
				for(i in options.types) {
					if(i !== "default" && i !== $.jstree.root && options.types.hasOwnProperty(i)) {
						for(j in options.types['default']) {
							if(options.types['default'].hasOwnProperty(j) && options.types[i][j] === undefined) {
								options.types[i][j] = options.types['default'][j];
							}
						}
					}
				}
			}
			parent.init.call(this, el, options);
			this._model.data[$.jstree.root].type = $.jstree.root;
		};
		this.refresh = function (skip_loading, forget_state) {
			parent.refresh.call(this, skip_loading, forget_state);
			this._model.data[$.jstree.root].type = $.jstree.root;
		};
		this.bind = function () {
			this.element
				.on('model.jstree', function (e, data) {
						var m = this._model.data,
							dpc = data.nodes,
							t = this.settings.types,
							i, j, c = 'default', k;
						for(i = 0, j = dpc.length; i < j; i++) {
							c = 'default';
							if(m[dpc[i]].original && m[dpc[i]].original.type && t[m[dpc[i]].original.type]) {
								c = m[dpc[i]].original.type;
							}
							if(m[dpc[i]].data && m[dpc[i]].data.jstree && m[dpc[i]].data.jstree.type && t[m[dpc[i]].data.jstree.type]) {
								c = m[dpc[i]].data.jstree.type;
							}
							m[dpc[i]].type = c;
							if(m[dpc[i]].icon === true && t[c].icon !== undefined) {
								m[dpc[i]].icon = t[c].icon;
							}
							if(t[c].li_attr !== undefined && typeof t[c].li_attr === 'object') {
								for (k in t[c].li_attr) {
									if (t[c].li_attr.hasOwnProperty(k)) {
										if (k === 'id') {
											continue;
										}
										else if (m[dpc[i]].li_attr[k] === undefined) {
											m[dpc[i]].li_attr[k] = t[c].li_attr[k];
										}
										else if (k === 'class') {
											m[dpc[i]].li_attr['class'] = t[c].li_attr['class'] + ' ' + m[dpc[i]].li_attr['class'];
										}
									}
								}
							}
							if(t[c].a_attr !== undefined && typeof t[c].a_attr === 'object') {
								for (k in t[c].a_attr) {
									if (t[c].a_attr.hasOwnProperty(k)) {
										if (k === 'id') {
											continue;
										}
										else if (m[dpc[i]].a_attr[k] === undefined) {
											m[dpc[i]].a_attr[k] = t[c].a_attr[k];
										}
										else if (k === 'href' && m[dpc[i]].a_attr[k] === '#') {
											m[dpc[i]].a_attr['href'] = t[c].a_attr['href'];
										}
										else if (k === 'class') {
											m[dpc[i]].a_attr['class'] = t[c].a_attr['class'] + ' ' + m[dpc[i]].a_attr['class'];
										}
									}
								}
							}
						}
						m[$.jstree.root].type = $.jstree.root;
					}.bind(this));
			parent.bind.call(this);
		};
		this.get_json = function (obj, options, flat) {
			var i, j,
				m = this._model.data,
				opt = options ? $.extend(true, {}, options, {no_id:false}) : {},
				tmp = parent.get_json.call(this, obj, opt, flat);
			if(tmp === false) { return false; }
			if($.vakata.is_array(tmp)) {
				for(i = 0, j = tmp.length; i < j; i++) {
					tmp[i].type = tmp[i].id && m[tmp[i].id] && m[tmp[i].id].type ? m[tmp[i].id].type : "default";
					if(options && options.no_id) {
						delete tmp[i].id;
						if(tmp[i].li_attr && tmp[i].li_attr.id) {
							delete tmp[i].li_attr.id;
						}
						if(tmp[i].a_attr && tmp[i].a_attr.id) {
							delete tmp[i].a_attr.id;
						}
					}
				}
			}
			else {
				tmp.type = tmp.id && m[tmp.id] && m[tmp.id].type ? m[tmp.id].type : "default";
				if(options && options.no_id) {
					tmp = this._delete_ids(tmp);
				}
			}
			return tmp;
		};
		this._delete_ids = function (tmp) {
			if($.vakata.is_array(tmp)) {
				for(var i = 0, j = tmp.length; i < j; i++) {
					tmp[i] = this._delete_ids(tmp[i]);
				}
				return tmp;
			}
			delete tmp.id;
			if(tmp.li_attr && tmp.li_attr.id) {
				delete tmp.li_attr.id;
			}
			if(tmp.a_attr && tmp.a_attr.id) {
				delete tmp.a_attr.id;
			}
			if(tmp.children && $.vakata.is_array(tmp.children)) {
				tmp.children = this._delete_ids(tmp.children);
			}
			return tmp;
		};
		this.check = function (chk, obj, par, pos, more) {
			if(parent.check.call(this, chk, obj, par, pos, more) === false) { return false; }
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			var m = obj && obj.id ? (more && more.origin ? more.origin : $.jstree.reference(obj.id)) : null, tmp, d, i, j;
			m = m && m._model && m._model.data ? m._model.data : null;
			switch(chk) {
				case "create_node":
				case "move_node":
				case "copy_node":
					if(chk !== 'move_node' || $.inArray(obj.id, par.children) === -1) {
						tmp = this.get_rules(par);
						if(tmp.max_children !== undefined && tmp.max_children !== -1 && tmp.max_children === par.children.length) {
							this._data.core.last_error = { 'error' : 'check', 'plugin' : 'types', 'id' : 'types_01', 'reason' : 'max_children prevents function: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
							return false;
						}
						if(tmp.valid_children !== undefined && tmp.valid_children !== -1 && $.inArray((obj.type || 'default'), tmp.valid_children) === -1) {
							this._data.core.last_error = { 'error' : 'check', 'plugin' : 'types', 'id' : 'types_02', 'reason' : 'valid_children prevents function: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
							return false;
						}
						if(m && obj.children_d && obj.parents) {
							d = 0;
							for(i = 0, j = obj.children_d.length; i < j; i++) {
								d = Math.max(d, m[obj.children_d[i]].parents.length);
							}
							d = d - obj.parents.length + 1;
						}
						if(d <= 0 || d === undefined) { d = 1; }
						do {
							if(tmp.max_depth !== undefined && tmp.max_depth !== -1 && tmp.max_depth < d) {
								this._data.core.last_error = { 'error' : 'check', 'plugin' : 'types', 'id' : 'types_03', 'reason' : 'max_depth prevents function: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
								return false;
							}
							par = this.get_node(par.parent);
							tmp = this.get_rules(par);
							d++;
						} while(par);
					}
					break;
			}
			return true;
		};
		/**
		 * used to retrieve the type settings object for a node
		 * @name get_rules(obj)
		 * @param {mixed} obj the node to find the rules for
		 * @return {Object}
		 * @plugin types
		 */
		this.get_rules = function (obj) {
			obj = this.get_node(obj);
			if(!obj) { return false; }
			var tmp = this.get_type(obj, true);
			if(tmp.max_depth === undefined) { tmp.max_depth = -1; }
			if(tmp.max_children === undefined) { tmp.max_children = -1; }
			if(tmp.valid_children === undefined) { tmp.valid_children = -1; }
			return tmp;
		};
		/**
		 * used to retrieve the type string or settings object for a node
		 * @name get_type(obj [, rules])
		 * @param {mixed} obj the node to find the rules for
		 * @param {Boolean} rules if set to `true` instead of a string the settings object will be returned
		 * @return {String|Object}
		 * @plugin types
		 */
		this.get_type = function (obj, rules) {
			obj = this.get_node(obj);
			return (!obj) ? false : ( rules ? $.extend({ 'type' : obj.type }, this.settings.types[obj.type]) : obj.type);
		};
		/**
		 * used to change a node's type
		 * @name set_type(obj, type)
		 * @param {mixed} obj the node to change
		 * @param {String} type the new type
		 * @plugin types
		 */
		this.set_type = function (obj, type) {
			var m = this._model.data, t, t1, t2, old_type, old_icon, k, d, a;
			if($.vakata.is_array(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_type(obj[t1], type);
				}
				return true;
			}
			t = this.settings.types;
			obj = this.get_node(obj);
			if(!t[type] || !obj) { return false; }
			d = this.get_node(obj, true);
			if (d && d.length) {
				a = d.children('.jstree-anchor');
			}
			old_type = obj.type;
			old_icon = this.get_icon(obj);
			obj.type = type;
			if(old_icon === true || !t[old_type] || (t[old_type].icon !== undefined && old_icon === t[old_type].icon)) {
				this.set_icon(obj, t[type].icon !== undefined ? t[type].icon : true);
			}

			// remove old type props
			if(t[old_type] && t[old_type].li_attr !== undefined && typeof t[old_type].li_attr === 'object') {
				for (k in t[old_type].li_attr) {
					if (t[old_type].li_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						}
						else if (k === 'class') {
							m[obj.id].li_attr['class'] = (m[obj.id].li_attr['class'] || '').replace(t[old_type].li_attr[k], '');
							if (d) { d.removeClass(t[old_type].li_attr[k]); }
						}
						else if (m[obj.id].li_attr[k] === t[old_type].li_attr[k]) {
							m[obj.id].li_attr[k] = null;
							if (d) { d.removeAttr(k); }
						}
					}
				}
			}
			if(t[old_type] && t[old_type].a_attr !== undefined && typeof t[old_type].a_attr === 'object') {
				for (k in t[old_type].a_attr) {
					if (t[old_type].a_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						}
						else if (k === 'class') {
							m[obj.id].a_attr['class'] = (m[obj.id].a_attr['class'] || '').replace(t[old_type].a_attr[k], '');
							if (a) { a.removeClass(t[old_type].a_attr[k]); }
						}
						else if (m[obj.id].a_attr[k] === t[old_type].a_attr[k]) {
							if (k === 'href') {
								m[obj.id].a_attr[k] = '#';
								if (a) { a.attr('href', '#'); }
							}
							else {
								delete m[obj.id].a_attr[k];
								if (a) { a.removeAttr(k); }
							}
						}
					}
				}
			}

			// add new props
			if(t[type].li_attr !== undefined && typeof t[type].li_attr === 'object') {
				for (k in t[type].li_attr) {
					if (t[type].li_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						}
						else if (m[obj.id].li_attr[k] === undefined) {
							m[obj.id].li_attr[k] = t[type].li_attr[k];
							if (d) {
								if (k === 'class') {
									d.addClass(t[type].li_attr[k]);
								}
								else {
									d.attr(k, t[type].li_attr[k]);
								}
							}
						}
						else if (k === 'class') {
							m[obj.id].li_attr['class'] = t[type].li_attr[k] + ' ' + m[obj.id].li_attr['class'];
							if (d) { d.addClass(t[type].li_attr[k]); }
						}
					}
				}
			}
			if(t[type].a_attr !== undefined && typeof t[type].a_attr === 'object') {
				for (k in t[type].a_attr) {
					if (t[type].a_attr.hasOwnProperty(k)) {
						if (k === 'id') {
							continue;
						}
						else if (m[obj.id].a_attr[k] === undefined) {
							m[obj.id].a_attr[k] = t[type].a_attr[k];
							if (a) {
								if (k === 'class') {
									a.addClass(t[type].a_attr[k]);
								}
								else {
									a.attr(k, t[type].a_attr[k]);
								}
							}
						}
						else if (k === 'href' && m[obj.id].a_attr[k] === '#') {
							m[obj.id].a_attr['href'] = t[type].a_attr['href'];
							if (a) { a.attr('href', t[type].a_attr['href']); }
						}
						else if (k === 'class') {
							m[obj.id].a_attr['class'] = t[type].a_attr['class'] + ' ' + m[obj.id].a_attr['class'];
							if (a) { a.addClass(t[type].a_attr[k]); }
						}
					}
				}
			}

			return true;
		};
	};
	// include the types plugin by default
	// $.jstree.defaults.plugins.push("types");


/**
 * ### Unique plugin
 *
 * Enforces that no nodes with the same name can coexist as siblings.
 */

	/**
	 * stores all defaults for the unique plugin
	 * @name $.jstree.defaults.unique
	 * @plugin unique
	 */
	$.jstree.defaults.unique = {
		/**
		 * Indicates if the comparison should be case sensitive. Default is `false`.
		 * @name $.jstree.defaults.unique.case_sensitive
		 * @plugin unique
		 */
		case_sensitive : false,
		/**
		 * Indicates if white space should be trimmed before the comparison. Default is `false`.
		 * @name $.jstree.defaults.unique.trim_whitespace
		 * @plugin unique
		 */
		trim_whitespace : false,
		/**
		 * A callback executed in the instance's scope when a new node is created and the name is already taken, the two arguments are the conflicting name and the counter. The default will produce results like `New node (2)`.
		 * @name $.jstree.defaults.unique.duplicate
		 * @plugin unique
		 */
		duplicate : function (name, counter) {
			return name + ' (' + counter + ')';
		}
	};

	$.jstree.plugins.unique = function (options, parent) {
		this.check = function (chk, obj, par, pos, more) {
			if(parent.check.call(this, chk, obj, par, pos, more) === false) { return false; }
			obj = obj && obj.id ? obj : this.get_node(obj);
			par = par && par.id ? par : this.get_node(par);
			if(!par || !par.children) { return true; }
			var n = chk === "rename_node" ? pos : obj.text,
				c = [],
				s = this.settings.unique.case_sensitive,
				w = this.settings.unique.trim_whitespace,
				m = this._model.data, i, j, t;
			for(i = 0, j = par.children.length; i < j; i++) {
				t = m[par.children[i]].text;
				if (!s) {
					t = t.toLowerCase();
				}
				if (w) {
					t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
				}
				c.push(t);
			}
			if(!s) { n = n.toLowerCase(); }
			if (w) { n = n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); }
			switch(chk) {
				case "delete_node":
					return true;
				case "rename_node":
					t = obj.text || '';
					if (!s) {
						t = t.toLowerCase();
					}
					if (w) {
						t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
					}
					i = ($.inArray(n, c) === -1 || (obj.text && t === n));
					if(!i) {
						this._data.core.last_error = { 'error' : 'check', 'plugin' : 'unique', 'id' : 'unique_01', 'reason' : 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					}
					return i;
				case "create_node":
					i = ($.inArray(n, c) === -1);
					if(!i) {
						this._data.core.last_error = { 'error' : 'check', 'plugin' : 'unique', 'id' : 'unique_04', 'reason' : 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					}
					return i;
				case "copy_node":
					i = ($.inArray(n, c) === -1);
					if(!i) {
						this._data.core.last_error = { 'error' : 'check', 'plugin' : 'unique', 'id' : 'unique_02', 'reason' : 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					}
					return i;
				case "move_node":
					i = ( (obj.parent === par.id && (!more || !more.is_multi)) || $.inArray(n, c) === -1);
					if(!i) {
						this._data.core.last_error = { 'error' : 'check', 'plugin' : 'unique', 'id' : 'unique_03', 'reason' : 'Child with name ' + n + ' already exists. Preventing: ' + chk, 'data' : JSON.stringify({ 'chk' : chk, 'pos' : pos, 'obj' : obj && obj.id ? obj.id : false, 'par' : par && par.id ? par.id : false }) };
					}
					return i;
			}
			return true;
		};
		this.create_node = function (par, node, pos, callback, is_loaded) {
			if(!node || node.text === undefined) {
				if(par === null) {
					par = $.jstree.root;
				}
				par = this.get_node(par);
				if(!par) {
					return parent.create_node.call(this, par, node, pos, callback, is_loaded);
				}
				pos = pos === undefined ? "last" : pos;
				if(!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
					return parent.create_node.call(this, par, node, pos, callback, is_loaded);
				}
				if(!node) { node = {}; }
				var tmp, n, dpc, i, j, m = this._model.data, s = this.settings.unique.case_sensitive, w = this.settings.unique.trim_whitespace, cb = this.settings.unique.duplicate, t;
				n = tmp = this.get_string('New node');
				dpc = [];
				for(i = 0, j = par.children.length; i < j; i++) {
					t = m[par.children[i]].text;
					if (!s) {
						t = t.toLowerCase();
					}
					if (w) {
						t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
					}
					dpc.push(t);
				}
				i = 1;
				t = n;
				if (!s) {
					t = t.toLowerCase();
				}
				if (w) {
					t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
				}
				while($.inArray(t, dpc) !== -1) {
					n = cb.call(this, tmp, (++i)).toString();
					t = n;
					if (!s) {
						t = t.toLowerCase();
					}
					if (w) {
						t = t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
					}
				}
				node.text = n;
			}
			return parent.create_node.call(this, par, node, pos, callback, is_loaded);
		};
	};

	// include the unique plugin by default
	// $.jstree.defaults.plugins.push("unique");


/**
 * ### Wholerow plugin
 *
 * Makes each node appear block level. Making selection easier. May cause slow down for large trees in old browsers.
 */

	var div = document.createElement('DIV');
	div.setAttribute('unselectable','on');
	div.setAttribute('role','presentation');
	div.className = 'jstree-wholerow';
	div.innerHTML = '&#160;';
	$.jstree.plugins.wholerow = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);

			this.element
				.on('ready.jstree set_state.jstree', function () {
						this.hide_dots();
					}.bind(this))
				.on("init.jstree loading.jstree ready.jstree", function () {
						//div.style.height = this._data.core.li_height + 'px';
						this.get_container_ul().addClass('jstree-wholerow-ul');
					}.bind(this))
				.on("deselect_all.jstree", function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
					}.bind(this))
				.on("changed.jstree", function (e, data) {
						this.element.find('.jstree-wholerow-clicked').removeClass('jstree-wholerow-clicked');
						var tmp = false, i, j;
						for(i = 0, j = data.selected.length; i < j; i++) {
							tmp = this.get_node(data.selected[i], true);
							if(tmp && tmp.length) {
								tmp.children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
							}
						}
					}.bind(this))
				.on("open_node.jstree", function (e, data) {
						this.get_node(data.node, true).find('.jstree-clicked').parent().children('.jstree-wholerow').addClass('jstree-wholerow-clicked');
					}.bind(this))
				.on("hover_node.jstree dehover_node.jstree", function (e, data) {
						if(e.type === "hover_node" && this.is_disabled(data.node)) { return; }
						this.get_node(data.node, true).children('.jstree-wholerow')[e.type === "hover_node"?"addClass":"removeClass"]('jstree-wholerow-hovered');
					}.bind(this))
				.on("contextmenu.jstree", ".jstree-wholerow", function (e) {
						if (this._data.contextmenu) {
							e.preventDefault();
							var tmp = $.Event('contextmenu', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey, pageX : e.pageX, pageY : e.pageY });
							$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp);
						}
					}.bind(this))
				/*!
				.on("mousedown.jstree touchstart.jstree", ".jstree-wholerow", function (e) {
						if(e.target === e.currentTarget) {
							var a = $(e.currentTarget).closest(".jstree-node").children(".jstree-anchor");
							e.target = a[0];
							a.trigger(e);
						}
					})
				*/
				.on("click.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					})
				.on("dblclick.jstree", ".jstree-wholerow", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('dblclick', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					})
				.on("click.jstree", ".jstree-leaf > .jstree-ocl", function (e) {
						e.stopImmediatePropagation();
						var tmp = $.Event('click', { metaKey : e.metaKey, ctrlKey : e.ctrlKey, altKey : e.altKey, shiftKey : e.shiftKey });
						$(e.currentTarget).closest(".jstree-node").children(".jstree-anchor").first().trigger(tmp).trigger('focus');
					}.bind(this))
				.on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", function (e) {
						e.stopImmediatePropagation();
						if(!this.is_disabled(e.currentTarget)) {
							this.hover_node(e.currentTarget);
						}
						return false;
					}.bind(this))
				.on("mouseleave.jstree", ".jstree-node", function (e) {
						this.dehover_node(e.currentTarget);
					}.bind(this));
		};
		this.teardown = function () {
			if(this.settings.wholerow) {
				this.element.find(".jstree-wholerow").remove();
			}
			parent.teardown.call(this);
		};
		this.redraw_node = function(obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if(obj) {
				var tmp = div.cloneNode(true);
				//tmp.style.height = this._data.core.li_height + 'px';
				if($.inArray(obj.id, this._data.core.selected) !== -1) { tmp.className += ' jstree-wholerow-clicked'; }
				if(this._data.core.focused && this._data.core.focused === obj.id) { tmp.className += ' jstree-wholerow-hovered'; }
				obj.insertBefore(tmp, obj.childNodes[0]);
			}
			return obj;
		};
	};
	// include the wholerow plugin by default
	// $.jstree.defaults.plugins.push("wholerow");
	if(window.customElements && Object && Object.create) {
		var proto = Object.create(HTMLElement.prototype);
		proto.createdCallback = function () {
			var c = { core : {}, plugins : [] }, i;
			for(i in $.jstree.plugins) {
				if($.jstree.plugins.hasOwnProperty(i) && this.attributes[i]) {
					c.plugins.push(i);
					if(this.getAttribute(i) && JSON.parse(this.getAttribute(i))) {
						c[i] = JSON.parse(this.getAttribute(i));
					}
				}
			}
			for(i in $.jstree.defaults.core) {
				if($.jstree.defaults.core.hasOwnProperty(i) && this.attributes[i]) {
					c.core[i] = JSON.parse(this.getAttribute(i)) || this.getAttribute(i);
				}
			}
			$(this).jstree(c);
		};
		// proto.attributeChangedCallback = function (name, previous, value) { };
		try {
			window.customElements.define("vakata-jstree", function() {}, { prototype: proto });
		} catch (ignore) { }
	}

}));

/***/ }),

/***/ "./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss":
/*!*******************************************************************!*\
  !*** ./vendor/spryker/file-manager-gui/assets/Zed/sass/main.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/file-manager-gui/assets/Zed/js/spryker-zed-file-directory.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsNENBQTRDLDRDQUE0QztBQUN4RixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsNENBQTRDO0FBQ3RGO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSw0Q0FBNEMsNENBQTRDO0FBQ3hGO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQ0FBMEMsNENB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Q0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxzSEFBc0g7QUFDaEs7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsb0ZBQW9GO0FBQ3ZIO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxzQ0FBc0Msb0ZBQW9GO0FBQzFIO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxtQ0FBbUMsb0ZBQW9GO0FBQ3ZIO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RDtBQUM3RCx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFNBQVMsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsSUFBSSxrQkFBa0I7QUFDcEYsSUFBSTtBQUNKOztBQUVBLENBQUM7Ozs7Ozs7Ozs7OztBQ3grUUQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9maWxlLW1hbmFnZXItZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9maWxlLWRpcmVjdG9yeS9maWxlLWRpcmVjdG9yeS10cmVlLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2ZpbGUtbWFuYWdlci1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2ZpbGUtZGlyZWN0b3J5L21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZmlsZS1tYW5hZ2VyLWd1aS9hc3NldHMvWmVkL2pzL3NwcnlrZXItemVkLWZpbGUtZGlyZWN0b3J5LmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9qc3RyZWUvZGlzdC9qc3RyZWUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvZmlsZS1tYW5hZ2VyLWd1aS9hc3NldHMvWmVkL3Nhc3MvbWFpbi5zY3NzP2FkMTMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5yZXF1aXJlKCdqc3RyZWUnKTtcblxudmFyICR0cmVlQ29udGFpbmVyID0gJCgnI2ZpbGUtZGlyZWN0b3J5LXRyZWUtY29udGFpbmVyJyk7XG52YXIgJHRyZWVDb250ZW50ID0gJCgnI2ZpbGUtZGlyZWN0b3J5LXRyZWUtY29udGVudCcpO1xudmFyICR0cmVlU2VhcmNoRmllbGQgPSAkKCcjZmlsZS1kaXJlY3RvcnktdHJlZS1zZWFyY2gtZmllbGQnKTtcbnZhciAkdHJlZVByb2dyZXNzQmFyID0gJCgnI2ZpbGUtZGlyZWN0b3J5LXRyZWUtbG9hZGVyJyk7XG52YXIgJGZvcm1Qcm9ncmVzc0JhciA9ICQoJyNmaWxlLWRpcmVjdG9yeS1ub2RlLWZvcm0tbG9hZGVyJyk7XG52YXIgJHRyZWVVcGRhdGVQcm9ncmVzc0JhciA9ICQoJyNmaWxlLWRpcmVjdG9yeS10cmVlLXVwZGF0ZS1sb2FkZXInKTtcbnZhciAkdHJlZU9yZGVyU2F2ZUJ0biA9ICQoJyNmaWxlLWRpcmVjdG9yeS10cmVlLXNhdmUtYnRuJyk7XG5cbnZhciBhamF4UmVxdWVzdDtcbnZhciB0cmVlU2VhcmNoVGltZW91dCA9IGZhbHNlO1xuXG52YXIgY29uZmlnID0ge1xuICAgIGZpbGVEaXJlY3RvcnlUcmVlVXJsOiAnL2ZpbGUtbWFuYWdlci1ndWkvZGlyZWN0b3JpZXMtdHJlZS9sb2FkJyxcbiAgICBmaWxlRGlyZWN0b3J5Tm9kZUZvcm1VcmxQcmVmaXg6ICcvZmlsZS1tYW5hZ2VyLWd1aS9ub2RlLycsXG4gICAgZmlsZURpcmVjdG9yeVRyZWVIaWVyYXJjaHlVcGRhdGVVcmw6ICcvZmlsZS1tYW5hZ2VyLWd1aS9kaXJlY3Rvcmllcy10cmVlL3VwZGF0ZS1oaWVyYXJjaHknLFxuICAgIGZpbGVEaXJlY3RvcnlUcmVlTm9kZVR5cGVzOiB7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGljb246ICdmYSBmYS1mb2xkZXInLFxuICAgICAgICB9LFxuICAgIH0sXG59O1xuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgJHRyZWVPcmRlclNhdmVCdG4ub24oJ2NsaWNrJywgb25UcmVlU2F2ZU9yZGVyQ2xpY2spO1xuICAgICR0cmVlU2VhcmNoRmllbGQub24oJ2tleXVwJywgb25UcmVlU2VhcmNoS2V5dXApO1xuXG4gICAgaW5pdEpzVHJlZSgpO1xuXG4gICAgLy8gRW5hYmxlIHNhdmUgb3JkZXIgYnV0dG9uIG9uIHRyZWUgY2hhbmdlXG4gICAgJChkb2N1bWVudCkub24oJ2RuZF9zdG9wLnZha2F0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRyZWVPcmRlclNhdmVCdG4ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0SnNUcmVlKCkge1xuICAgICQoJyNmaWxlLWRpcmVjdG9yeS1maWxlcy1saXN0JykubG9hZCgnL2ZpbGUtbWFuYWdlci1ndWkvZmlsZXMnKTtcblxuICAgICQoJyNmaWxlLWRpcmVjdG9yeS10cmVlJylcbiAgICAgICAgLmpzdHJlZSh7XG4gICAgICAgICAgICBjb3JlOiB7XG4gICAgICAgICAgICAgICAgY2hlY2tfY2FsbGJhY2s6IGZ1bmN0aW9uIChvcCwgbm9kZSwgcGFyLCBwb3MsIG1vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBkcm9wIG9uIHJvb3QgbGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vcmUgJiYgbW9yZS5kbmQgJiYgKG9wID09PSAnbW92ZV9ub2RlJyB8fCBvcCA9PT0gJ2NvcHlfbm9kZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFtb3JlLnJlZi5kYXRhLmlkRmlsZURpcmVjdG9yeU5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsdWdpbnM6IFsnd2hvbGVyb3cnLCAnZG5kJywgJ3NlYXJjaCddLFxuICAgICAgICAgICAgdHlwZXM6IGNvbmZpZy5maWxlRGlyZWN0b3J5VHJlZU5vZGVUeXBlcyxcbiAgICAgICAgICAgIGRuZDoge1xuICAgICAgICAgICAgICAgIGlzX2RyYWdnYWJsZTogZnVuY3Rpb24gKGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZEZpbGVEaXJlY3RvcnlOb2RlID0gaXRlbXNbMF0uZGF0YS5pZEZpbGVEaXJlY3RvcnlOb2RlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFpZEZpbGVEaXJlY3RvcnlOb2RlO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAub24oJ2NoYW5nZWQuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcbiAgICAgICAgICAgIHZhciAkZmlsZXNMaXN0ID0gJCgnI2ZpbGUtZGlyZWN0b3J5LWZpbGVzLWxpc3QnKSxcbiAgICAgICAgICAgICAgICAkZmlsZXNUYWJsZSA9ICRmaWxlc0xpc3QuZmluZCgndGFibGUnKS5maXJzdCgpLFxuICAgICAgICAgICAgICAgICRkZWxldGVEaXJlY3RvcnlCdXR0b24gPSAkKCcjZGVsZXRlLWRpcmVjdG9yeS1saW5rJyksXG4gICAgICAgICAgICAgICAgJGRlbGV0ZURpcmVjdG9yeUNvbmZpcm1hdGlvbkJ1dHRvbiA9ICQoJyNkZWxldGUtZGlyZWN0b3J5LWNvbmZpcm1hdGlvbi1idXR0b24nKTtcblxuICAgICAgICAgICAgJCgnI2FkZC1maWxlLWxpbmsnKS5hdHRyKFxuICAgICAgICAgICAgICAgICdocmVmJyxcbiAgICAgICAgICAgICAgICAnL2ZpbGUtbWFuYWdlci1ndWkvYWRkLWZpbGU/ZmlsZS1kaXJlY3RvcnktaWQ9JyArIGRhdGEubm9kZS5kYXRhLmlkRmlsZURpcmVjdG9yeU5vZGUsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEubm9kZS5kYXRhLmlkRmlsZURpcmVjdG9yeU5vZGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgJGRlbGV0ZURpcmVjdG9yeUJ1dHRvbi5yZW1vdmVBdHRyKCdocmVmJyk7XG4gICAgICAgICAgICAgICAgJGRlbGV0ZURpcmVjdG9yeUJ1dHRvbi5yZW1vdmVBdHRyKCdkYXRhLWlkLXBhcmVudCcpO1xuICAgICAgICAgICAgICAgICRkZWxldGVEaXJlY3RvcnlCdXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAkZmlsZXNMaXN0LmhpZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICRmaWxlc0xpc3Quc2hvdygpO1xuICAgICAgICAgICAgJGZpbGVzVGFibGVcbiAgICAgICAgICAgICAgICAuRGF0YVRhYmxlKClcbiAgICAgICAgICAgICAgICAuYWpheC51cmwoJy9maWxlLW1hbmFnZXItZ3VpL2ZpbGVzL3RhYmxlP2ZpbGUtZGlyZWN0b3J5LWlkPScgKyBkYXRhLm5vZGUuZGF0YS5pZEZpbGVEaXJlY3RvcnlOb2RlKVxuICAgICAgICAgICAgICAgIC5sb2FkKCk7XG4gICAgICAgICAgICAkZGVsZXRlRGlyZWN0b3J5QnV0dG9uLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkZGVsZXRlRGlyZWN0b3J5Q29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoJ2Zvcm0nKVxuICAgICAgICAgICAgICAgIC5hdHRyKFxuICAgICAgICAgICAgICAgICAgICAnYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgJy9maWxlLW1hbmFnZXItZ3VpL2RlbGV0ZS1kaXJlY3Rvcnk/aWQtZGlyZWN0b3J5PScgKyBkYXRhLm5vZGUuZGF0YS5pZEZpbGVEaXJlY3RvcnlOb2RlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAkZGVsZXRlRGlyZWN0b3J5QnV0dG9uLmF0dHIoXG4gICAgICAgICAgICAgICAgJ2hyZWYnLFxuICAgICAgICAgICAgICAgICcvZmlsZS1tYW5hZ2VyLWd1aS9kZWxldGUtZGlyZWN0b3J5P2lkLWRpcmVjdG9yeT0nICsgZGF0YS5ub2RlLmRhdGEuaWRGaWxlRGlyZWN0b3J5Tm9kZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICAkZGVsZXRlRGlyZWN0b3J5QnV0dG9uLmF0dHIoJ2RhdGEtaWQtcGFyZW50JywgZGF0YS5ub2RlLmRhdGEuaWRQYXJlbnRGaWxlRGlyZWN0b3J5Tm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgJHRyZWVQcm9ncmVzc0Jhci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG59XG5cbiQoJyNkZWxldGUtZGlyZWN0b3J5LWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBpZiAoISQodGhpcykuYXR0cignZGF0YS1pZC1wYXJlbnQnKSkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcjZGlyZWN0b3J5LWRlbGV0aW5nLWNvbmZpcm1hdGlvbi1tb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gb25UcmVlU2VhcmNoS2V5dXAoKSB7XG4gICAgaWYgKHRyZWVTZWFyY2hUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0cmVlU2VhcmNoVGltZW91dCk7XG4gICAgfVxuICAgIHRyZWVTZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNmaWxlLWRpcmVjdG9yeS10cmVlJykuanN0cmVlKHRydWUpLnNlYXJjaCgkdHJlZVNlYXJjaEZpZWxkLnZhbCgpKTtcbiAgICB9LCAyNTApO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIG9uVHJlZVNhdmVPcmRlckNsaWNrKCkge1xuICAgICR0cmVlVXBkYXRlUHJvZ3Jlc3NCYXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgdmFyIGpzdHJlZURhdGEgPSAkKCcjZmlsZS1kaXJlY3RvcnktdHJlZScpLmpzdHJlZSh0cnVlKS5nZXRfanNvbigpO1xuICAgIHZhciBwYXJhbXMgPSB7XG4gICAgICAgICdmaWxlLWRpcmVjdG9yeS10cmVlJzoge1xuICAgICAgICAgICAgJ2ZpbGUtZGlyZWN0b3J5Jzoge1xuICAgICAgICAgICAgICAgIGlkX2ZpbGVfZGlyZWN0b3J5OiBqc3RyZWVEYXRhWzBdLmRhdGEuaWRGaWxlRGlyZWN0b3J5LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vZGVzOiBnZXRGaWxlRGlyZWN0b3J5Tm9kZXNSZWN1cnNpdmVseShqc3RyZWVEYXRhWzBdKSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgJC5wb3N0KGNvbmZpZy5maWxlRGlyZWN0b3J5VHJlZUhpZXJhcmNoeVVwZGF0ZVVybCwgcGFyYW1zLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJlaW5pdGlhbGl6ZVRyZWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5zd2VldEFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiByZXNwb25zZS5zdWNjZXNzID8gJ1N1Y2Nlc3MnIDogJ0Vycm9yJyxcbiAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLm1lc3NhZ2UsXG4gICAgICAgICAgICB0eXBlOiByZXNwb25zZS5zdWNjZXNzID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJHRyZWVPcmRlclNhdmVCdG4uYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9KS5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAkdHJlZVVwZGF0ZVByb2dyZXNzQmFyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gcmVpbml0aWFsaXplVHJlZSgkdHJlZSkge1xuICAgIHZhciAkdHJlZSA9ICQoJyNmaWxlLWRpcmVjdG9yeS10cmVlJyk7XG5cbiAgICAkdHJlZS5qc3RyZWUoJ2Rlc3Ryb3knKS5lbXB0eSgpO1xuXG4gICAgJHRyZWUuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLmF0dHJpYnV0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmF0dHJpYnV0ZXNbaV0ubmFtZSAhPT0gJ2lkJykge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cih0aGlzLmF0dHJpYnV0ZXNbaV0ubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogJy9maWxlLW1hbmFnZXItZ3VpL2RpcmVjdG9yaWVzLXRyZWUvdHJlZScsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICR0cmVlLmh0bWwocmVzcG9uc2UpO1xuICAgICAgICAgICAgaW5pdEpzVHJlZSgpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge30sXG4gICAgfSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R9IGpzdHJlZU5vZGVcbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGdldEZpbGVEaXJlY3RvcnlOb2Rlc1JlY3Vyc2l2ZWx5KGpzdHJlZU5vZGUpIHtcbiAgICB2YXIgbm9kZXMgPSBbXTtcblxuICAgICQuZWFjaChqc3RyZWVOb2RlLmNoaWxkcmVuLCBmdW5jdGlvbiAoaSwgY2hpbGROb2RlKSB7XG4gICAgICAgIHZhciBmaWxlRGlyZWN0b3J5Tm9kZSA9IHtcbiAgICAgICAgICAgIGZpbGVfZGlyZWN0b3J5OiB7XG4gICAgICAgICAgICAgICAgaWRfZmlsZV9kaXJlY3Rvcnk6IGNoaWxkTm9kZS5kYXRhLmlkRmlsZURpcmVjdG9yeU5vZGUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGkgKyAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBnZXRGaWxlRGlyZWN0b3J5Tm9kZXNSZWN1cnNpdmVseShjaGlsZE5vZGUpLFxuICAgICAgICB9O1xuXG4gICAgICAgIG5vZGVzLnB1c2goZmlsZURpcmVjdG9yeU5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG4vKipcbiAqIE9wZW4gcHVibGljIG1ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBmaWxlRGlyZWN0b3J5VHJlZSA9IHJlcXVpcmUoJy4vZmlsZS1kaXJlY3RvcnktdHJlZScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgZmlsZURpcmVjdG9yeVRyZWUuaW5pdGlhbGl6ZSgpO1xufSk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9maWxlLWRpcmVjdG9yeS9tYWluJyk7XG5yZXF1aXJlKCcuLi9zYXNzL21haW4uc2NzcycpO1xuIiwiLypnbG9iYWxzIGpRdWVyeSwgZGVmaW5lLCBtb2R1bGUsIGV4cG9ydHMsIHJlcXVpcmUsIHdpbmRvdywgZG9jdW1lbnQsIHBvc3RNZXNzYWdlICovXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG5cdH1cblx0ZWxzZSBpZih0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0ZmFjdG9yeShqUXVlcnkpO1xuXHR9XG59KGZ1bmN0aW9uICgkLCB1bmRlZmluZWQpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG4vKiFcbiAqIGpzVHJlZSAzLjMuMTJcbiAqIGh0dHA6Ly9qc3RyZWUuY29tL1xuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNCBJdmFuIEJvemhhbm92IChodHRwOi8vdmFrYXRhLmNvbSlcbiAqXG4gKiBMaWNlbnNlZCBzYW1lIGFzIGpxdWVyeSAtIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgTUlUIExpY2Vuc2VcbiAqICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuLyohXG4gKiBpZiB1c2luZyBqc2xpbnQgcGxlYXNlIGFsbG93IGZvciB0aGUgalF1ZXJ5IGdsb2JhbCBhbmQgdXNlIGZvbGxvd2luZyBvcHRpb25zOlxuICoganNsaW50OiBsb29wZnVuYzogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgYXNzOiB0cnVlLCBiaXR3aXNlOiB0cnVlLCBjb250aW51ZTogdHJ1ZSwgbm9tZW46IHRydWUsIHBsdXNwbHVzOiB0cnVlLCByZWdleHA6IHRydWUsIHVucGFyYW06IHRydWUsIHRvZG86IHRydWUsIHdoaXRlOiB0cnVlXG4gKi9cbi8qanNoaW50IC1XMDgzICovXG5cblx0Ly8gcHJldmVudCBhbm90aGVyIGxvYWQ/IG1heWJlIHRoZXJlIGlzIGEgYmV0dGVyIHdheT9cblx0aWYoJC5qc3RyZWUpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvKipcblx0ICogIyMjIGpzVHJlZSBjb3JlIGZ1bmN0aW9uYWxpdHlcblx0ICovXG5cblx0Ly8gaW50ZXJuYWwgdmFyaWFibGVzXG5cdHZhciBpbnN0YW5jZV9jb3VudGVyID0gMCxcblx0XHRjY3Bfbm9kZSA9IGZhbHNlLFxuXHRcdGNjcF9tb2RlID0gZmFsc2UsXG5cdFx0Y2NwX2luc3QgPSBmYWxzZSxcblx0XHR0aGVtZXNfbG9hZGVkID0gW10sXG5cdFx0c3JjID0gJCgnc2NyaXB0Omxhc3QnKS5hdHRyKCdzcmMnKSxcblx0XHRkb2N1bWVudCA9IHdpbmRvdy5kb2N1bWVudDsgLy8gbG9jYWwgdmFyaWFibGUgaXMgYWx3YXlzIGZhc3RlciB0byBhY2Nlc3MgdGhlbiBhIGdsb2JhbFxuXG5cdHZhciBzZXRJbW1lZGlhdGUgPSB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuXHR2YXIgUHJvbWlzZSA9IHdpbmRvdy5Qcm9taXNlO1xuXHRpZiAoIXNldEltbWVkaWF0ZSAmJiBQcm9taXNlKSB7XG5cdFx0Ly8gR29vZCBlbm91Z2ggYXBwcm94aW1hdGlvbiBvZiBzZXRJbW1lZGlhdGVcblx0XHRzZXRJbW1lZGlhdGUgPSBmdW5jdGlvbiAoY2IsIGFyZykge1xuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKGFyZykudGhlbihjYik7XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBob2xkcyBhbGwganN0cmVlIHJlbGF0ZWQgZnVuY3Rpb25zIGFuZCB2YXJpYWJsZXMsIGluY2x1ZGluZyB0aGUgYWN0dWFsIGNsYXNzIGFuZCBtZXRob2RzIHRvIGNyZWF0ZSwgYWNjZXNzIGFuZCBtYW5pcHVsYXRlIGluc3RhbmNlcy5cblx0ICogQG5hbWUgJC5qc3RyZWVcblx0ICovXG5cdCQuanN0cmVlID0ge1xuXHRcdC8qKlxuXHRcdCAqIHNwZWNpZmllcyB0aGUganN0cmVlIHZlcnNpb24gaW4gdXNlXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUudmVyc2lvblxuXHRcdCAqL1xuXHRcdHZlcnNpb24gOiAnMy4zLjEyJyxcblx0XHQvKipcblx0XHQgKiBob2xkcyBhbGwgdGhlIGRlZmF1bHQgb3B0aW9ucyB1c2VkIHdoZW4gY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzXG5cdFx0ICovXG5cdFx0ZGVmYXVsdHMgOiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIGNvbmZpZ3VyZSB3aGljaCBwbHVnaW5zIHdpbGwgYmUgYWN0aXZlIG9uIGFuIGluc3RhbmNlLiBTaG91bGQgYmUgYW4gYXJyYXkgb2Ygc3RyaW5ncywgd2hlcmUgZWFjaCBlbGVtZW50IGlzIGEgcGx1Z2luIG5hbWUuIFRoZSBkZWZhdWx0IGlzIGBbXWBcblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnNcblx0XHRcdCAqL1xuXHRcdFx0cGx1Z2lucyA6IFtdXG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzdG9yZXMgYWxsIGxvYWRlZCBqc3RyZWUgcGx1Z2lucyAodXNlZCBpbnRlcm5hbGx5KVxuXHRcdCAqIEBuYW1lICQuanN0cmVlLnBsdWdpbnNcblx0XHQgKi9cblx0XHRwbHVnaW5zIDoge30sXG5cdFx0cGF0aCA6IHNyYyAmJiBzcmMuaW5kZXhPZignLycpICE9PSAtMSA/IHNyYy5yZXBsYWNlKC9cXC9bXlxcL10rJC8sJycpIDogJycsXG5cdFx0aWRyZWdleCA6IC9bXFxcXDomIV58KClcXFtcXF08PkAqJyt+I1wiOy4sPVxcLSBcXC8ke30lP2BdL2csXG5cdFx0cm9vdCA6ICcjJ1xuXHR9O1xuXHRcblx0LyoqXG5cdCAqIGNyZWF0ZXMgYSBqc3RyZWUgaW5zdGFuY2Vcblx0ICogQG5hbWUgJC5qc3RyZWUuY3JlYXRlKGVsIFssIG9wdGlvbnNdKVxuXHQgKiBAcGFyYW0ge0RPTUVsZW1lbnR8alF1ZXJ5fFN0cmluZ30gZWwgdGhlIGVsZW1lbnQgdG8gY3JlYXRlIHRoZSBpbnN0YW5jZSBvbiwgY2FuIGJlIGpRdWVyeSBleHRlbmRlZCBvciBhIHNlbGVjdG9yXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMgZm9yIHRoaXMgaW5zdGFuY2UgKGV4dGVuZHMgYCQuanN0cmVlLmRlZmF1bHRzYClcblx0ICogQHJldHVybiB7anNUcmVlfSB0aGUgbmV3IGluc3RhbmNlXG5cdCAqL1xuXHQkLmpzdHJlZS5jcmVhdGUgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHR2YXIgdG1wID0gbmV3ICQuanN0cmVlLmNvcmUoKytpbnN0YW5jZV9jb3VudGVyKSxcblx0XHRcdG9wdCA9IG9wdGlvbnM7XG5cdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCAkLmpzdHJlZS5kZWZhdWx0cywgb3B0aW9ucyk7XG5cdFx0aWYob3B0ICYmIG9wdC5wbHVnaW5zKSB7XG5cdFx0XHRvcHRpb25zLnBsdWdpbnMgPSBvcHQucGx1Z2lucztcblx0XHR9XG5cdFx0JC5lYWNoKG9wdGlvbnMucGx1Z2lucywgZnVuY3Rpb24gKGksIGspIHtcblx0XHRcdGlmKGkgIT09ICdjb3JlJykge1xuXHRcdFx0XHR0bXAgPSB0bXAucGx1Z2luKGssIG9wdGlvbnNba10pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdCQoZWwpLmRhdGEoJ2pzdHJlZScsIHRtcCk7XG5cdFx0dG1wLmluaXQoZWwsIG9wdGlvbnMpO1xuXHRcdHJldHVybiB0bXA7XG5cdH07XG5cdC8qKlxuXHQgKiByZW1vdmUgYWxsIHRyYWNlcyBvZiBqc3RyZWUgZnJvbSB0aGUgRE9NIGFuZCBkZXN0cm95IGFsbCBpbnN0YW5jZXNcblx0ICogQG5hbWUgJC5qc3RyZWUuZGVzdHJveSgpXG5cdCAqL1xuXHQkLmpzdHJlZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXHRcdCQoJy5qc3RyZWU6anN0cmVlJykuanN0cmVlKCdkZXN0cm95Jyk7XG5cdFx0JChkb2N1bWVudCkub2ZmKCcuanN0cmVlJyk7XG5cdH07XG5cdC8qKlxuXHQgKiB0aGUganN0cmVlIGNsYXNzIGNvbnN0cnVjdG9yLCB1c2VkIG9ubHkgaW50ZXJuYWxseVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAbmFtZSAkLmpzdHJlZS5jb3JlKGlkKVxuXHQgKiBAcGFyYW0ge051bWJlcn0gaWQgdGhpcyBpbnN0YW5jZSdzIGluZGV4XG5cdCAqL1xuXHQkLmpzdHJlZS5jb3JlID0gZnVuY3Rpb24gKGlkKSB7XG5cdFx0dGhpcy5faWQgPSBpZDtcblx0XHR0aGlzLl9jbnQgPSAwO1xuXHRcdHRoaXMuX3dyayA9IG51bGw7XG5cdFx0dGhpcy5fZGF0YSA9IHtcblx0XHRcdGNvcmUgOiB7XG5cdFx0XHRcdHRoZW1lcyA6IHtcblx0XHRcdFx0XHRuYW1lIDogZmFsc2UsXG5cdFx0XHRcdFx0ZG90cyA6IGZhbHNlLFxuXHRcdFx0XHRcdGljb25zIDogZmFsc2UsXG5cdFx0XHRcdFx0ZWxsaXBzaXMgOiBmYWxzZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzZWxlY3RlZCA6IFtdLFxuXHRcdFx0XHRsYXN0X2Vycm9yIDoge30sXG5cdFx0XHRcdHdvcmtpbmcgOiBmYWxzZSxcblx0XHRcdFx0d29ya2VyX3F1ZXVlIDogW10sXG5cdFx0XHRcdGZvY3VzZWQgOiBudWxsXG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblx0LyoqXG5cdCAqIGdldCBhIHJlZmVyZW5jZSB0byBhbiBleGlzdGluZyBpbnN0YW5jZVxuXHQgKlxuXHQgKiBfX0V4YW1wbGVzX19cblx0ICpcblx0ICpcdC8vIHByb3ZpZGVkIGEgY29udGFpbmVyIHdpdGggYW4gSUQgb2YgXCJ0cmVlXCIsIGFuZCBhIG5lc3RlZCBub2RlIHdpdGggYW4gSUQgb2YgXCJicmFuY2hcIlxuXHQgKlx0Ly8gYWxsIG9mIHRoZXJlIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGluc3RhbmNlXG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJ3RyZWUnKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZSgnI3RyZWUnKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZSgkKCcjdHJlZScpKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZShkb2N1bWVudC5nZXRFbGVtZW50QnlJRCgndHJlZScpKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZSgnYnJhbmNoJyk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJyNicmFuY2gnKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZSgkKCcjYnJhbmNoJykpO1xuXHQgKlx0JC5qc3RyZWUucmVmZXJlbmNlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlEKCdicmFuY2gnKSk7XG5cdCAqXG5cdCAqIEBuYW1lICQuanN0cmVlLnJlZmVyZW5jZShuZWVkbGUpXG5cdCAqIEBwYXJhbSB7RE9NRWxlbWVudHxqUXVlcnl8U3RyaW5nfSBuZWVkbGVcblx0ICogQHJldHVybiB7anNUcmVlfG51bGx9IHRoZSBpbnN0YW5jZSBvciBgbnVsbGAgaWYgbm90IGZvdW5kXG5cdCAqL1xuXHQkLmpzdHJlZS5yZWZlcmVuY2UgPSBmdW5jdGlvbiAobmVlZGxlKSB7XG5cdFx0dmFyIHRtcCA9IG51bGwsXG5cdFx0XHRvYmogPSBudWxsO1xuXHRcdGlmKG5lZWRsZSAmJiBuZWVkbGUuaWQgJiYgKCFuZWVkbGUudGFnTmFtZSB8fCAhbmVlZGxlLm5vZGVUeXBlKSkgeyBuZWVkbGUgPSBuZWVkbGUuaWQ7IH1cblxuXHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGgpIHtcblx0XHRcdHRyeSB7IG9iaiA9ICQobmVlZGxlKTsgfSBjYXRjaCAoaWdub3JlKSB7IH1cblx0XHR9XG5cdFx0aWYoIW9iaiB8fCAhb2JqLmxlbmd0aCkge1xuXHRcdFx0dHJ5IHsgb2JqID0gJCgnIycgKyBuZWVkbGUucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSk7IH0gY2F0Y2ggKGlnbm9yZSkgeyB9XG5cdFx0fVxuXHRcdGlmKG9iaiAmJiBvYmoubGVuZ3RoICYmIChvYmogPSBvYmouY2xvc2VzdCgnLmpzdHJlZScpKS5sZW5ndGggJiYgKG9iaiA9IG9iai5kYXRhKCdqc3RyZWUnKSkpIHtcblx0XHRcdHRtcCA9IG9iajtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHQkKCcuanN0cmVlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBpbnN0ID0gJCh0aGlzKS5kYXRhKCdqc3RyZWUnKTtcblx0XHRcdFx0aWYoaW5zdCAmJiBpbnN0Ll9tb2RlbC5kYXRhW25lZWRsZV0pIHtcblx0XHRcdFx0XHR0bXAgPSBpbnN0O1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiB0bXA7XG5cdH07XG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gaW5zdGFuY2UsIGdldCBhbiBpbnN0YW5jZSBvciBpbnZva2UgYSBjb21tYW5kIG9uIGEgaW5zdGFuY2UuXG5cdCAqXG5cdCAqIElmIHRoZXJlIGlzIG5vIGluc3RhbmNlIGFzc29jaWF0ZWQgd2l0aCB0aGUgY3VycmVudCBub2RlIGEgbmV3IG9uZSBpcyBjcmVhdGVkIGFuZCBgYXJnYCBpcyB1c2VkIHRvIGV4dGVuZCBgJC5qc3RyZWUuZGVmYXVsdHNgIGZvciB0aGlzIG5ldyBpbnN0YW5jZS4gVGhlcmUgd291bGQgYmUgbm8gcmV0dXJuIHZhbHVlIChjaGFpbmluZyBpcyBub3QgYnJva2VuKS5cblx0ICpcblx0ICogSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaW5zdGFuY2UgYW5kIGBhcmdgIGlzIGEgc3RyaW5nIHRoZSBjb21tYW5kIHNwZWNpZmllZCBieSBgYXJnYCBpcyBleGVjdXRlZCBvbiB0aGUgaW5zdGFuY2UsIHdpdGggYW55IGFkZGl0aW9uYWwgYXJndW1lbnRzIHBhc3NlZCB0byB0aGUgZnVuY3Rpb24uIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIGEgdmFsdWUgaXQgd2lsbCBiZSByZXR1cm5lZCAoY2hhaW5pbmcgY291bGQgYnJlYWsgZGVwZW5kaW5nIG9uIGZ1bmN0aW9uKS5cblx0ICpcblx0ICogSWYgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaW5zdGFuY2UgYW5kIGBhcmdgIGlzIG5vdCBhIHN0cmluZyB0aGUgaW5zdGFuY2UgaXRzZWxmIGlzIHJldHVybmVkIChzaW1pbGFyIHRvIGAkLmpzdHJlZS5yZWZlcmVuY2VgKS5cblx0ICpcblx0ICogSW4gYW55IG90aGVyIGNhc2UgLSBub3RoaW5nIGlzIHJldHVybmVkIGFuZCBjaGFpbmluZyBpcyBub3QgYnJva2VuLlxuXHQgKlxuXHQgKiBfX0V4YW1wbGVzX19cblx0ICpcblx0ICpcdCQoJyN0cmVlMScpLmpzdHJlZSgpOyAvLyBjcmVhdGVzIGFuIGluc3RhbmNlXG5cdCAqXHQkKCcjdHJlZTInKS5qc3RyZWUoeyBwbHVnaW5zIDogW10gfSk7IC8vIGNyZWF0ZSBhbiBpbnN0YW5jZSB3aXRoIHNvbWUgb3B0aW9uc1xuXHQgKlx0JCgnI3RyZWUxJykuanN0cmVlKCdvcGVuX25vZGUnLCAnI2JyYW5jaF8xJyk7IC8vIGNhbGwgYSBtZXRob2Qgb24gYW4gZXhpc3RpbmcgaW5zdGFuY2UsIHBhc3NpbmcgYWRkaXRpb25hbCBhcmd1bWVudHNcblx0ICpcdCQoJyN0cmVlMicpLmpzdHJlZSgpOyAvLyBnZXQgYW4gZXhpc3RpbmcgaW5zdGFuY2UgKG9yIGNyZWF0ZSBhbiBpbnN0YW5jZSlcblx0ICpcdCQoJyN0cmVlMicpLmpzdHJlZSh0cnVlKTsgLy8gZ2V0IGFuIGV4aXN0aW5nIGluc3RhbmNlICh3aWxsIG5vdCBjcmVhdGUgbmV3IGluc3RhbmNlKVxuXHQgKlx0JCgnI2JyYW5jaF8xJykuanN0cmVlKCkuc2VsZWN0X25vZGUoJyNicmFuY2hfMScpOyAvLyBnZXQgYW4gaW5zdGFuY2UgKHVzaW5nIGEgbmVzdGVkIGVsZW1lbnQgYW5kIGNhbGwgYSBtZXRob2QpXG5cdCAqXG5cdCAqIEBuYW1lICQoKS5qc3RyZWUoW2FyZ10pXG5cdCAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gYXJnXG5cdCAqIEByZXR1cm4ge01peGVkfVxuXHQgKi9cblx0JC5mbi5qc3RyZWUgPSBmdW5jdGlvbiAoYXJnKSB7XG5cdFx0Ly8gY2hlY2sgZm9yIHN0cmluZyBhcmd1bWVudFxuXHRcdHZhciBpc19tZXRob2RcdD0gKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnKSxcblx0XHRcdGFyZ3NcdFx0PSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuXHRcdFx0cmVzdWx0XHRcdD0gbnVsbDtcblx0XHRpZihhcmcgPT09IHRydWUgJiYgIXRoaXMubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHQvLyBnZXQgdGhlIGluc3RhbmNlIChpZiB0aGVyZSBpcyBvbmUpIGFuZCBtZXRob2QgKGlmIGl0IGV4aXN0cylcblx0XHRcdHZhciBpbnN0YW5jZSA9ICQuanN0cmVlLnJlZmVyZW5jZSh0aGlzKSxcblx0XHRcdFx0bWV0aG9kID0gaXNfbWV0aG9kICYmIGluc3RhbmNlID8gaW5zdGFuY2VbYXJnXSA6IG51bGw7XG5cdFx0XHQvLyBpZiBjYWxsaW5nIGEgbWV0aG9kLCBhbmQgbWV0aG9kIGlzIGF2YWlsYWJsZSAtIGV4ZWN1dGUgb24gdGhlIGluc3RhbmNlXG5cdFx0XHRyZXN1bHQgPSBpc19tZXRob2QgJiYgbWV0aG9kID9cblx0XHRcdFx0bWV0aG9kLmFwcGx5KGluc3RhbmNlLCBhcmdzKSA6XG5cdFx0XHRcdG51bGw7XG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBubyBpbnN0YW5jZSBhbmQgbm8gbWV0aG9kIGlzIGJlaW5nIGNhbGxlZCAtIGNyZWF0ZSBvbmVcblx0XHRcdGlmKCFpbnN0YW5jZSAmJiAhaXNfbWV0aG9kICYmIChhcmcgPT09IHVuZGVmaW5lZCB8fCAkLmlzUGxhaW5PYmplY3QoYXJnKSkpIHtcblx0XHRcdFx0JC5qc3RyZWUuY3JlYXRlKHRoaXMsIGFyZyk7XG5cdFx0XHR9XG5cdFx0XHQvLyBpZiB0aGVyZSBpcyBhbiBpbnN0YW5jZSBhbmQgbm8gbWV0aG9kIGlzIGNhbGxlZCAtIHJldHVybiB0aGUgaW5zdGFuY2Vcblx0XHRcdGlmKCAoaW5zdGFuY2UgJiYgIWlzX21ldGhvZCkgfHwgYXJnID09PSB0cnVlICkge1xuXHRcdFx0XHRyZXN1bHQgPSBpbnN0YW5jZSB8fCBmYWxzZTtcblx0XHRcdH1cblx0XHRcdC8vIGlmIHRoZXJlIHdhcyBhIG1ldGhvZCBjYWxsIHdoaWNoIHJldHVybmVkIGEgcmVzdWx0IC0gYnJlYWsgYW5kIHJldHVybiB0aGUgdmFsdWVcblx0XHRcdGlmKHJlc3VsdCAhPT0gbnVsbCAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ly8gaWYgdGhlcmUgd2FzIGEgbWV0aG9kIGNhbGwgd2l0aCBhIHZhbGlkIHJldHVybiB2YWx1ZSAtIHJldHVybiB0aGF0LCBvdGhlcndpc2UgY29udGludWUgdGhlIGNoYWluXG5cdFx0cmV0dXJuIHJlc3VsdCAhPT0gbnVsbCAmJiByZXN1bHQgIT09IHVuZGVmaW5lZCA/XG5cdFx0XHRyZXN1bHQgOiB0aGlzO1xuXHR9O1xuXHQvKipcblx0ICogdXNlZCB0byBmaW5kIGVsZW1lbnRzIGNvbnRhaW5pbmcgYW4gaW5zdGFuY2Vcblx0ICpcblx0ICogX19FeGFtcGxlc19fXG5cdCAqXG5cdCAqXHQkKCdkaXY6anN0cmVlJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cdCAqXHRcdCQodGhpcykuanN0cmVlKCdkZXN0cm95Jyk7XG5cdCAqXHR9KTtcblx0ICpcblx0ICogQG5hbWUgJCgnOmpzdHJlZScpXG5cdCAqIEByZXR1cm4ge2pRdWVyeX1cblx0ICovXG5cdCQuZXhwci5wc2V1ZG9zLmpzdHJlZSA9ICQuZXhwci5jcmVhdGVQc2V1ZG8oZnVuY3Rpb24oc2VhcmNoKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKGEpIHtcblx0XHRcdHJldHVybiAkKGEpLmhhc0NsYXNzKCdqc3RyZWUnKSAmJlxuXHRcdFx0XHQkKGEpLmRhdGEoJ2pzdHJlZScpICE9PSB1bmRlZmluZWQ7XG5cdFx0fTtcblx0fSk7XG5cblx0LyoqXG5cdCAqIHN0b3JlcyBhbGwgZGVmYXVsdHMgZm9yIHRoZSBjb3JlXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmVcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLmNvcmUgPSB7XG5cdFx0LyoqXG5cdFx0ICogZGF0YSBjb25maWd1cmF0aW9uXG5cdFx0ICpcblx0XHQgKiBJZiBsZWZ0IGFzIGBmYWxzZWAgdGhlIEhUTUwgaW5zaWRlIHRoZSBqc3RyZWUgY29udGFpbmVyIGVsZW1lbnQgaXMgdXNlZCB0byBwb3B1bGF0ZSB0aGUgdHJlZSAodGhhdCBzaG91bGQgYmUgYW4gdW5vcmRlcmVkIGxpc3Qgd2l0aCBsaXN0IGl0ZW1zKS5cblx0XHQgKlxuXHRcdCAqIFlvdSBjYW4gYWxzbyBwYXNzIGluIGEgSFRNTCBzdHJpbmcgb3IgYSBKU09OIGFycmF5IGhlcmUuXG5cdFx0ICpcblx0XHQgKiBJdCBpcyBwb3NzaWJsZSB0byBwYXNzIGluIGEgc3RhbmRhcmQgalF1ZXJ5LWxpa2UgQUpBWCBjb25maWcgYW5kIGpzdHJlZSB3aWxsIGF1dG9tYXRpY2FsbHkgZGV0ZXJtaW5lIGlmIHRoZSByZXNwb25zZSBpcyBKU09OIG9yIEhUTUwgYW5kIHVzZSB0aGF0IHRvIHBvcHVsYXRlIHRoZSB0cmVlLlxuXHRcdCAqIEluIGFkZGl0aW9uIHRvIHRoZSBzdGFuZGFyZCBqUXVlcnkgYWpheCBvcHRpb25zIGhlcmUgeW91IGNhbiBzdXBwbHkgZnVuY3Rpb25zIGZvciBgZGF0YWAgYW5kIGB1cmxgLCB0aGUgZnVuY3Rpb25zIHdpbGwgYmUgcnVuIGluIHRoZSBjdXJyZW50IGluc3RhbmNlJ3Mgc2NvcGUgYW5kIGEgcGFyYW0gd2lsbCBiZSBwYXNzZWQgaW5kaWNhdGluZyB3aGljaCBub2RlIGlzIGJlaW5nIGxvYWRlZCwgdGhlIHJldHVybiB2YWx1ZSBvZiB0aG9zZSBmdW5jdGlvbnMgd2lsbCBiZSB1c2VkLlxuXHRcdCAqXG5cdFx0ICogVGhlIGxhc3Qgb3B0aW9uIGlzIHRvIHNwZWNpZnkgYSBmdW5jdGlvbiwgdGhhdCBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgdGhlIG5vZGUgYmVpbmcgbG9hZGVkIGFzIGFyZ3VtZW50IGFuZCBhIHNlY29uZCBwYXJhbSB3aGljaCBpcyBhIGZ1bmN0aW9uIHdoaWNoIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgcmVzdWx0LlxuXHRcdCAqXG5cdFx0ICogX19FeGFtcGxlc19fXG5cdFx0ICpcblx0XHQgKlx0Ly8gQUpBWFxuXHRcdCAqXHQkKCcjdHJlZScpLmpzdHJlZSh7XG5cdFx0ICpcdFx0J2NvcmUnIDoge1xuXHRcdCAqXHRcdFx0J2RhdGEnIDoge1xuXHRcdCAqXHRcdFx0XHQndXJsJyA6ICcvZ2V0L2NoaWxkcmVuLycsXG5cdFx0ICpcdFx0XHRcdCdkYXRhJyA6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0ICpcdFx0XHRcdFx0cmV0dXJuIHsgJ2lkJyA6IG5vZGUuaWQgfTtcblx0XHQgKlx0XHRcdFx0fVxuXHRcdCAqXHRcdFx0fVxuXHRcdCAqXHRcdH0pO1xuXHRcdCAqXG5cdFx0ICpcdC8vIGRpcmVjdCBkYXRhXG5cdFx0ICpcdCQoJyN0cmVlJykuanN0cmVlKHtcblx0XHQgKlx0XHQnY29yZScgOiB7XG5cdFx0ICpcdFx0XHQnZGF0YScgOiBbXG5cdFx0ICpcdFx0XHRcdCdTaW1wbGUgcm9vdCBub2RlJyxcblx0XHQgKlx0XHRcdFx0e1xuXHRcdCAqXHRcdFx0XHRcdCdpZCcgOiAnbm9kZV8yJyxcblx0XHQgKlx0XHRcdFx0XHQndGV4dCcgOiAnUm9vdCBub2RlIHdpdGggb3B0aW9ucycsXG5cdFx0ICpcdFx0XHRcdFx0J3N0YXRlJyA6IHsgJ29wZW5lZCcgOiB0cnVlLCAnc2VsZWN0ZWQnIDogdHJ1ZSB9LFxuXHRcdCAqXHRcdFx0XHRcdCdjaGlsZHJlbicgOiBbIHsgJ3RleHQnIDogJ0NoaWxkIDEnIH0sICdDaGlsZCAyJ11cblx0XHQgKlx0XHRcdFx0fVxuXHRcdCAqXHRcdFx0XVxuXHRcdCAqXHRcdH1cblx0XHQgKlx0fSk7XG5cdFx0ICpcblx0XHQgKlx0Ly8gZnVuY3Rpb25cblx0XHQgKlx0JCgnI3RyZWUnKS5qc3RyZWUoe1xuXHRcdCAqXHRcdCdjb3JlJyA6IHtcblx0XHQgKlx0XHRcdCdkYXRhJyA6IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrKSB7XG5cdFx0ICpcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgWydSb290IDEnLCAnUm9vdCAyJ10pO1xuXHRcdCAqXHRcdFx0fVxuXHRcdCAqXHRcdH0pO1xuXHRcdCAqXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5kYXRhXG5cdFx0ICovXG5cdFx0ZGF0YVx0XHRcdDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogY29uZmlndXJlIHRoZSB2YXJpb3VzIHN0cmluZ3MgdXNlZCB0aHJvdWdob3V0IHRoZSB0cmVlXG5cdFx0ICpcblx0XHQgKiBZb3UgY2FuIHVzZSBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleSBpcyB0aGUgc3RyaW5nIHlvdSBuZWVkIHRvIHJlcGxhY2UgYW5kIHRoZSB2YWx1ZSBpcyB5b3VyIHJlcGxhY2VtZW50LlxuXHRcdCAqIEFub3RoZXIgb3B0aW9uIGlzIHRvIHNwZWNpZnkgYSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGFyZ3VtZW50IG9mIHRoZSBuZWVkZWQgc3RyaW5nIGFuZCBzaG91bGQgcmV0dXJuIHRoZSByZXBsYWNlbWVudC5cblx0XHQgKiBJZiBsZWZ0IGFzIGBmYWxzZWAgbm8gcmVwbGFjZW1lbnQgaXMgbWFkZS5cblx0XHQgKlxuXHRcdCAqIF9fRXhhbXBsZXNfX1xuXHRcdCAqXG5cdFx0ICpcdCQoJyN0cmVlJykuanN0cmVlKHtcblx0XHQgKlx0XHQnY29yZScgOiB7XG5cdFx0ICpcdFx0XHQnc3RyaW5ncycgOiB7XG5cdFx0ICpcdFx0XHRcdCdMb2FkaW5nIC4uLicgOiAnUGxlYXNlIHdhaXQgLi4uJ1xuXHRcdCAqXHRcdFx0fVxuXHRcdCAqXHRcdH1cblx0XHQgKlx0fSk7XG5cdFx0ICpcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnN0cmluZ3Ncblx0XHQgKi9cblx0XHRzdHJpbmdzXHRcdFx0OiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBkZXRlcm1pbmVzIHdoYXQgaGFwcGVucyB3aGVuIGEgdXNlciB0cmllcyB0byBtb2RpZnkgdGhlIHN0cnVjdHVyZSBvZiB0aGUgdHJlZVxuXHRcdCAqIElmIGxlZnQgYXMgYGZhbHNlYCBhbGwgb3BlcmF0aW9ucyBsaWtlIGNyZWF0ZSwgcmVuYW1lLCBkZWxldGUsIG1vdmUgb3IgY29weSBhcmUgcHJldmVudGVkLlxuXHRcdCAqIFlvdSBjYW4gc2V0IHRoaXMgdG8gYHRydWVgIHRvIGFsbG93IGFsbCBpbnRlcmFjdGlvbnMgb3IgdXNlIGEgZnVuY3Rpb24gdG8gaGF2ZSBiZXR0ZXIgY29udHJvbC5cblx0XHQgKlxuXHRcdCAqIF9fRXhhbXBsZXNfX1xuXHRcdCAqXG5cdFx0ICpcdCQoJyN0cmVlJykuanN0cmVlKHtcblx0XHQgKlx0XHQnY29yZScgOiB7XG5cdFx0ICpcdFx0XHQnY2hlY2tfY2FsbGJhY2snIDogZnVuY3Rpb24gKG9wZXJhdGlvbiwgbm9kZSwgbm9kZV9wYXJlbnQsIG5vZGVfcG9zaXRpb24sIG1vcmUpIHtcblx0XHQgKlx0XHRcdFx0Ly8gb3BlcmF0aW9uIGNhbiBiZSAnY3JlYXRlX25vZGUnLCAncmVuYW1lX25vZGUnLCAnZGVsZXRlX25vZGUnLCAnbW92ZV9ub2RlJywgJ2NvcHlfbm9kZScgb3IgJ2VkaXQnXG5cdFx0ICpcdFx0XHRcdC8vIGluIGNhc2Ugb2YgJ3JlbmFtZV9ub2RlJyBub2RlX3Bvc2l0aW9uIGlzIGZpbGxlZCB3aXRoIHRoZSBuZXcgbm9kZSBuYW1lXG5cdFx0ICpcdFx0XHRcdHJldHVybiBvcGVyYXRpb24gPT09ICdyZW5hbWVfbm9kZScgPyB0cnVlIDogZmFsc2U7XG5cdFx0ICpcdFx0XHR9XG5cdFx0ICpcdFx0fVxuXHRcdCAqXHR9KTtcblx0XHQgKlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUuY2hlY2tfY2FsbGJhY2tcblx0XHQgKi9cblx0XHRjaGVja19jYWxsYmFja1x0OiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBhIGNhbGxiYWNrIGNhbGxlZCB3aXRoIGEgc2luZ2xlIG9iamVjdCBwYXJhbWV0ZXIgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgd2hlbiBzb21ldGhpbmcgZ29lcyB3cm9uZyAob3BlcmF0aW9uIHByZXZlbnRlZCwgYWpheCBmYWlsZWQsIGV0Yylcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmVycm9yXG5cdFx0ICovXG5cdFx0ZXJyb3JcdFx0XHQ6ICQubm9vcCxcblx0XHQvKipcblx0XHQgKiB0aGUgb3BlbiAvIGNsb3NlIGFuaW1hdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgLSBzZXQgdGhpcyB0byBgZmFsc2VgIHRvIGRpc2FibGUgdGhlIGFuaW1hdGlvbiAoZGVmYXVsdCBpcyBgMjAwYClcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmFuaW1hdGlvblxuXHRcdCAqL1xuXHRcdGFuaW1hdGlvblx0XHQ6IDIwMCxcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBtdWx0aXBsZSBub2RlcyBjYW4gYmUgc2VsZWN0ZWRcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLm11bHRpcGxlXG5cdFx0ICovXG5cdFx0bXVsdGlwbGVcdFx0OiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIHRoZW1lIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXNcblx0XHQgKi9cblx0XHR0aGVtZXNcdFx0XHQ6IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogdGhlIG5hbWUgb2YgdGhlIHRoZW1lIHRvIHVzZSAoaWYgbGVmdCBhcyBgZmFsc2VgIHRoZSBkZWZhdWx0IHRoZW1lIGlzIHVzZWQpXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5uYW1lXG5cdFx0XHQgKi9cblx0XHRcdG5hbWVcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0aGUgVVJMIG9mIHRoZSB0aGVtZSdzIENTUyBmaWxlLCBsZWF2ZSB0aGlzIGFzIGBmYWxzZWAgaWYgeW91IGhhdmUgbWFudWFsbHkgaW5jbHVkZWQgdGhlIHRoZW1lIENTUyAocmVjb21tZW5kZWQpLiBZb3UgY2FuIHNldCB0aGlzIHRvIGB0cnVlYCB0b28gd2hpY2ggd2lsbCB0cnkgdG8gYXV0b2xvYWQgdGhlIHRoZW1lLlxuXHRcdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXMudXJsXG5cdFx0XHQgKi9cblx0XHRcdHVybFx0XHRcdFx0OiBmYWxzZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogdGhlIGxvY2F0aW9uIG9mIGFsbCBqc3RyZWUgdGhlbWVzIC0gb25seSB1c2VkIGlmIGB1cmxgIGlzIHNldCB0byBgdHJ1ZWBcblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzLmRpclxuXHRcdFx0ICovXG5cdFx0XHRkaXJcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHQvKipcblx0XHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGNvbm5lY3RpbmcgZG90cyBhcmUgc2hvd25cblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzLmRvdHNcblx0XHRcdCAqL1xuXHRcdFx0ZG90c1x0XHRcdDogdHJ1ZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgbm9kZSBpY29ucyBhcmUgc2hvd25cblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzLmljb25zXG5cdFx0XHQgKi9cblx0XHRcdGljb25zXHRcdFx0OiB0cnVlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBub2RlIGVsbGlwc2lzIHNob3VsZCBiZSBzaG93biAtIHRoaXMgb25seSB3b3JrcyB3aXRoIGEgZml4ZWQgd2l0aCBvbiB0aGUgY29udGFpbmVyXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5lbGxpcHNpc1xuXHRcdFx0ICovXG5cdFx0XHRlbGxpcHNpc1x0XHQ6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdHJlZSBiYWNrZ3JvdW5kIGlzIHN0cmlwZWRcblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzLnN0cmlwZXNcblx0XHRcdCAqL1xuXHRcdFx0c3RyaXBlc1x0XHRcdDogZmFsc2UsXG5cdFx0XHQvKipcblx0XHRcdCAqIGEgc3RyaW5nIChvciBib29sZWFuIGBmYWxzZWApIHNwZWNpZnlpbmcgdGhlIHRoZW1lIHZhcmlhbnQgdG8gdXNlIChpZiB0aGUgdGhlbWUgc3VwcG9ydHMgdmFyaWFudHMpXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy52YXJpYW50XG5cdFx0XHQgKi9cblx0XHRcdHZhcmlhbnRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBhIGJvb2xlYW4gc3BlY2lmeWluZyBpZiBhIHJlcG9uc2l2ZSB2ZXJzaW9uIG9mIHRoZSB0aGVtZSBzaG91bGQga2ljayBpbiBvbiBzbWFsbGVyIHNjcmVlbnMgKGlmIHRoZSB0aGVtZSBzdXBwb3J0cyBpdCkuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5yZXNwb25zaXZlXG5cdFx0XHQgKi9cblx0XHRcdHJlc3BvbnNpdmVcdFx0OiBmYWxzZVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaWYgbGVmdCBhcyBgdHJ1ZWAgYWxsIHBhcmVudHMgb2YgYWxsIHNlbGVjdGVkIG5vZGVzIHdpbGwgYmUgb3BlbmVkIG9uY2UgdGhlIHRyZWUgbG9hZHMgKHNvIHRoYXQgYWxsIHNlbGVjdGVkIG5vZGVzIGFyZSB2aXNpYmxlIHRvIHRoZSB1c2VyKVxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUuZXhwYW5kX3NlbGVjdGVkX29ubG9hZFxuXHRcdCAqL1xuXHRcdGV4cGFuZF9zZWxlY3RlZF9vbmxvYWQgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIGlmIGxlZnQgYXMgYHRydWVgIHdlYiB3b3JrZXJzIHdpbGwgYmUgdXNlZCB0byBwYXJzZSBpbmNvbWluZyBKU09OIGRhdGEgd2hlcmUgcG9zc2libGUsIHNvIHRoYXQgdGhlIFVJIHdpbGwgbm90IGJlIGJsb2NrZWQgYnkgbGFyZ2UgcmVxdWVzdHMuIFdvcmtlcnMgYXJlIGhvd2V2ZXIgYWJvdXQgMzAlIHNsb3dlci4gRGVmYXVsdHMgdG8gYHRydWVgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS53b3JrZXJcblx0XHQgKi9cblx0XHR3b3JrZXIgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIEZvcmNlIG5vZGUgdGV4dCB0byBwbGFpbiB0ZXh0IChhbmQgZXNjYXBlIEhUTUwpLiBEZWZhdWx0cyB0byBgZmFsc2VgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5mb3JjZV90ZXh0XG5cdFx0ICovXG5cdFx0Zm9yY2VfdGV4dCA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIFNob3VsZCB0aGUgbm9kZSBiZSB0b2dnbGVkIGlmIHRoZSB0ZXh0IGlzIGRvdWJsZSBjbGlja2VkLiBEZWZhdWx0cyB0byBgdHJ1ZWBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmRibGNsaWNrX3RvZ2dsZVxuXHRcdCAqL1xuXHRcdGRibGNsaWNrX3RvZ2dsZSA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogU2hvdWxkIHRoZSBsb2FkZWQgbm9kZXMgYmUgcGFydCBvZiB0aGUgc3RhdGUuIERlZmF1bHRzIHRvIGBmYWxzZWBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmxvYWRlZF9zdGF0ZVxuXHRcdCAqL1xuXHRcdGxvYWRlZF9zdGF0ZSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIFNob3VsZCB0aGUgbGFzdCBhY3RpdmUgbm9kZSBiZSBmb2N1c2VkIHdoZW4gdGhlIHRyZWUgY29udGFpbmVyIGlzIGJsdXJyZWQgYW5kIHRoZSBmb2N1c2VkIGFnYWluLiBUaGlzIGhlbHBzIHdvcmtpbmcgd2l0aCBzY3JlZW4gcmVhZGVycy4gRGVmYXVsdHMgdG8gYHRydWVgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5yZXN0b3JlX2ZvY3VzXG5cdFx0ICovXG5cdFx0cmVzdG9yZV9mb2N1cyA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogRm9yY2UgdG8gY29tcHV0ZSBhbmQgc2V0IFwiYXJpYS1zZXRzaXplXCIgYW5kIFwiYXJpYS1wb3NpbnNldFwiIGV4cGxpY2l0bHkgZm9yIGVhY2ggdHJlZWl0ZW0uIFxuXHRcdCAqIFNvbWUgYnJvd3NlcnMgbWF5IGNvbXB1dGUgaW5jb3JyZWN0IGVsZW1lbnRzIHBvc2l0aW9uIGFuZCBwcm9kdWNlIHdyb25nIGFubm91bmNlbWVudHMgZm9yIHNjcmVlbiByZWFkZXJzLiBEZWZhdWx0cyB0byBgZmFsc2VgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5jb21wdXRlX2VsZW1lbnRzX3Bvc2l0aW9uc1xuXHRcdCAqL1xuXHRcdGNvbXB1dGVfZWxlbWVudHNfcG9zaXRpb25zIDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogRGVmYXVsdCBrZXlib2FyZCBzaG9ydGN1dHMgKGFuIG9iamVjdCB3aGVyZSBlYWNoIGtleSBpcyB0aGUgYnV0dG9uIG5hbWUgb3IgY29tYm8gLSBsaWtlICdlbnRlcicsICdjdHJsLXNwYWNlJywgJ3AnLCBldGMgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgZnVuY3Rpb24gdG8gZXhlY3V0ZSBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSlcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmtleWJvYXJkXG5cdFx0ICovXG5cdFx0a2V5Ym9hcmQgOiB7XG5cdFx0XHQnY3RybC1zcGFjZSc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIGFyaWEgZGVmaW5lcyBzcGFjZSBvbmx5IHdpdGggQ3RybFxuXHRcdFx0XHRlLnR5cGUgPSBcImNsaWNrXCI7XG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKGUpO1xuXHRcdFx0fSxcblx0XHRcdCdlbnRlcic6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIGVudGVyXG5cdFx0XHRcdGUudHlwZSA9IFwiY2xpY2tcIjtcblx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnRyaWdnZXIoZSk7XG5cdFx0XHR9LFxuXHRcdFx0J2xlZnQnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBsZWZ0XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0aWYodGhpcy5pc19vcGVuKGUuY3VycmVudFRhcmdldCkpIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlX25vZGUoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR2YXIgbyA9IHRoaXMuZ2V0X3BhcmVudChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdGlmKG8gJiYgby5pZCAhPT0gJC5qc3RyZWUucm9vdCkgeyB0aGlzLmdldF9ub2RlKG8sIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7IH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCd1cCc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIHVwXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dmFyIG8gPSB0aGlzLmdldF9wcmV2X2RvbShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRpZihvICYmIG8ubGVuZ3RoKSB7IG8uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTsgfVxuXHRcdFx0fSxcblx0XHRcdCdyaWdodCc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIHJpZ2h0XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0aWYodGhpcy5pc19jbG9zZWQoZS5jdXJyZW50VGFyZ2V0KSkge1xuXHRcdFx0XHRcdHRoaXMub3Blbl9ub2RlKGUuY3VycmVudFRhcmdldCwgZnVuY3Rpb24gKG8pIHsgdGhpcy5nZXRfbm9kZShvLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpOyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmICh0aGlzLmlzX29wZW4oZS5jdXJyZW50VGFyZ2V0KSkge1xuXHRcdFx0XHRcdHZhciBvID0gdGhpcy5nZXRfbm9kZShlLmN1cnJlbnRUYXJnZXQsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWNoaWxkcmVuJylbMF07XG5cdFx0XHRcdFx0aWYobykgeyAkKHRoaXMuX2ZpcnN0Q2hpbGQobykpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7IH1cblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCdkb3duJzogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gZG93blxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHZhciBvID0gdGhpcy5nZXRfbmV4dF9kb20oZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0aWYobyAmJiBvLmxlbmd0aCkgeyBvLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7IH1cblx0XHRcdH0sXG5cdFx0XHQnKic6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIGFyaWEgZGVmaW5lcyAqIG9uIG51bXBhZCBhcyBvcGVuX2FsbCAtIG5vdCB2ZXJ5IGNvbW1vblxuXHRcdFx0XHR0aGlzLm9wZW5fYWxsKCk7XG5cdFx0XHR9LFxuXHRcdFx0J2hvbWUnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBob21lXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dmFyIG8gPSB0aGlzLl9maXJzdENoaWxkKHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKTtcblx0XHRcdFx0aWYobykgeyAkKG8pLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmZpbHRlcignOnZpc2libGUnKS50cmlnZ2VyKCdmb2N1cycpOyB9XG5cdFx0XHR9LFxuXHRcdFx0J2VuZCc6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIGVuZFxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLWFuY2hvcicpLmZpbHRlcignOnZpc2libGUnKS5sYXN0KCkudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdH0sXG5cdFx0XHQnZjInOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBmMiAtIHNhZmUgdG8gaW5jbHVkZSAtIGlmIGNoZWNrX2NhbGxiYWNrIGlzIGZhbHNlIGl0IHdpbGwgZmFpbFxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMuZWRpdChlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0JC5qc3RyZWUuY29yZS5wcm90b3R5cGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogdXNlZCB0byBkZWNvcmF0ZSBhbiBpbnN0YW5jZSB3aXRoIGEgcGx1Z2luLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBwbHVnaW4oZGVjbyBbLCBvcHRzXSlcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGRlY28gdGhlIHBsdWdpbiB0byBkZWNvcmF0ZSB3aXRoXG5cdFx0ICogQHBhcmFtICB7T2JqZWN0fSBvcHRzIG9wdGlvbnMgZm9yIHRoZSBwbHVnaW5cblx0XHQgKiBAcmV0dXJuIHtqc1RyZWV9XG5cdFx0ICovXG5cdFx0cGx1Z2luIDogZnVuY3Rpb24gKGRlY28sIG9wdHMpIHtcblx0XHRcdHZhciBDaGlsZCA9ICQuanN0cmVlLnBsdWdpbnNbZGVjb107XG5cdFx0XHRpZihDaGlsZCkge1xuXHRcdFx0XHR0aGlzLl9kYXRhW2RlY29dID0ge307XG5cdFx0XHRcdENoaWxkLnByb3RvdHlwZSA9IHRoaXM7XG5cdFx0XHRcdHJldHVybiBuZXcgQ2hpbGQob3B0cywgdGhpcyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGluaXRpYWxpemUgdGhlIGluc3RhbmNlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBpbml0KGVsLCBvcHRvbnMpXG5cdFx0ICogQHBhcmFtIHtET01FbGVtZW50fGpRdWVyeXxTdHJpbmd9IGVsIHRoZSBlbGVtZW50IHdlIGFyZSB0cmFuc2Zvcm1pbmdcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlXG5cdFx0ICogQHRyaWdnZXIgaW5pdC5qc3RyZWUsIGxvYWRpbmcuanN0cmVlLCBsb2FkZWQuanN0cmVlLCByZWFkeS5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0aW5pdCA6IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5fbW9kZWwgPSB7XG5cdFx0XHRcdGRhdGEgOiB7fSxcblx0XHRcdFx0Y2hhbmdlZCA6IFtdLFxuXHRcdFx0XHRmb3JjZV9mdWxsX3JlZHJhdyA6IGZhbHNlLFxuXHRcdFx0XHRyZWRyYXdfdGltZW91dCA6IGZhbHNlLFxuXHRcdFx0XHRkZWZhdWx0X3N0YXRlIDoge1xuXHRcdFx0XHRcdGxvYWRlZCA6IHRydWUsXG5cdFx0XHRcdFx0b3BlbmVkIDogZmFsc2UsXG5cdFx0XHRcdFx0c2VsZWN0ZWQgOiBmYWxzZSxcblx0XHRcdFx0XHRkaXNhYmxlZCA6IGZhbHNlXG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdID0ge1xuXHRcdFx0XHRpZCA6ICQuanN0cmVlLnJvb3QsXG5cdFx0XHRcdHBhcmVudCA6IG51bGwsXG5cdFx0XHRcdHBhcmVudHMgOiBbXSxcblx0XHRcdFx0Y2hpbGRyZW4gOiBbXSxcblx0XHRcdFx0Y2hpbGRyZW5fZCA6IFtdLFxuXHRcdFx0XHRzdGF0ZSA6IHsgbG9hZGVkIDogZmFsc2UgfVxuXHRcdFx0fTtcblxuXHRcdFx0dGhpcy5lbGVtZW50ID0gJChlbCkuYWRkQ2xhc3MoJ2pzdHJlZSBqc3RyZWUtJyArIHRoaXMuX2lkKTtcblx0XHRcdHRoaXMuc2V0dGluZ3MgPSBvcHRpb25zO1xuXG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUucmVhZHkgPSBmYWxzZTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5ydGwgPSAodGhpcy5lbGVtZW50LmNzcyhcImRpcmVjdGlvblwiKSA9PT0gXCJydGxcIik7XG5cdFx0XHR0aGlzLmVsZW1lbnRbdGhpcy5fZGF0YS5jb3JlLnJ0bCA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXShcImpzdHJlZS1ydGxcIik7XG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cigncm9sZScsJ3RyZWUnKTtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29yZS5tdWx0aXBsZSkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1tdWx0aXNlbGVjdGFibGUnLCB0cnVlKTtcblx0XHRcdH1cblx0XHRcdGlmKCF0aGlzLmVsZW1lbnQuYXR0cigndGFiaW5kZXgnKSkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCcwJyk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYmluZCgpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgYWxsIGV2ZW50cyBhcmUgYm91bmRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgaW5pdC5qc3RyZWVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKFwiaW5pdFwiKTtcblxuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLm9yaWdpbmFsX2NvbnRhaW5lcl9odG1sID0gdGhpcy5lbGVtZW50LmZpbmQoXCIgPiB1bCA+IGxpXCIpLmNsb25lKHRydWUpO1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLm9yaWdpbmFsX2NvbnRhaW5lcl9odG1sXG5cdFx0XHRcdC5maW5kKFwibGlcIikuYWRkQmFjaygpXG5cdFx0XHRcdC5jb250ZW50cygpLmZpbHRlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5ub2RlVHlwZSA9PT0gMyAmJiAoIXRoaXMubm9kZVZhbHVlIHx8IC9eXFxzKyQvLnRlc3QodGhpcy5ub2RlVmFsdWUpKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LnJlbW92ZSgpO1xuXHRcdFx0dGhpcy5lbGVtZW50Lmh0bWwoXCI8XCIrXCJ1bCBjbGFzcz0nanN0cmVlLWNvbnRhaW5lci11bCBqc3RyZWUtY2hpbGRyZW4nIHJvbGU9J2dyb3VwJz48XCIrXCJsaSBpZD0nalwiK3RoaXMuX2lkK1wiX2xvYWRpbmcnIGNsYXNzPSdqc3RyZWUtaW5pdGlhbC1ub2RlIGpzdHJlZS1sb2FkaW5nIGpzdHJlZS1sZWFmIGpzdHJlZS1sYXN0JyByb2xlPSdub25lJz48aSBjbGFzcz0nanN0cmVlLWljb24ganN0cmVlLW9jbCc+PC9pPjxcIitcImEgY2xhc3M9J2pzdHJlZS1hbmNob3InIHJvbGU9J3RyZWVpdGVtJyBocmVmPScjJz48aSBjbGFzcz0nanN0cmVlLWljb24ganN0cmVlLXRoZW1laWNvbi1oaWRkZW4nPjwvaT5cIiArIHRoaXMuZ2V0X3N0cmluZyhcIkxvYWRpbmcgLi4uXCIpICsgXCI8L2E+PC9saT48L3VsPlwiKTtcblx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCdqJyArIHRoaXMuX2lkICsgJ19sb2FkaW5nJyk7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0ID0gdGhpcy5nZXRfY29udGFpbmVyX3VsKCkuY2hpbGRyZW4oXCJsaVwiKS5maXJzdCgpLm91dGVySGVpZ2h0KCkgfHwgMjQ7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUubm9kZSA9IHRoaXMuX2NyZWF0ZV9wcm90b3R5cGVfbm9kZSgpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIGxvYWRpbmcgdGV4dCBpcyBzaG93biBhbmQgYmVmb3JlIGxvYWRpbmcgc3RhcnRzXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGxvYWRpbmcuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcihcImxvYWRpbmdcIik7XG5cdFx0XHR0aGlzLmxvYWRfbm9kZSgkLmpzdHJlZS5yb290KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGRlc3Ryb3kgYW4gaW5zdGFuY2Vcblx0XHQgKiBAbmFtZSBkZXN0cm95KClcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBrZWVwX2h0bWwgaWYgbm90IHNldCB0byBgdHJ1ZWAgdGhlIGNvbnRhaW5lciB3aWxsIGJlIGVtcHRpZWQsIG90aGVyd2lzZSB0aGUgY3VycmVudCBET00gZWxlbWVudHMgd2lsbCBiZSBrZXB0IGludGFjdFxuXHRcdCAqL1xuXHRcdGRlc3Ryb3kgOiBmdW5jdGlvbiAoa2VlcF9odG1sKSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCBiZWZvcmUgdGhlIHRyZWUgaXMgZGVzdHJveWVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGRlc3Ryb3kuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcihcImRlc3Ryb3lcIik7XG5cdFx0XHRpZih0aGlzLl93cmspIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLl93cmspO1xuXHRcdFx0XHRcdHRoaXMuX3dyayA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2ggKGlnbm9yZSkgeyB9XG5cdFx0XHR9XG5cdFx0XHRpZigha2VlcF9odG1sKSB7IHRoaXMuZWxlbWVudC5lbXB0eSgpOyB9XG5cdFx0XHR0aGlzLnRlYXJkb3duKCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBDcmVhdGUgYSBwcm90b3R5cGUgbm9kZVxuXHRcdCAqIEBuYW1lIF9jcmVhdGVfcHJvdG90eXBlX25vZGUoKVxuXHRcdCAqIEByZXR1cm4ge0RPTUVsZW1lbnR9XG5cdFx0ICovXG5cdFx0X2NyZWF0ZV9wcm90b3R5cGVfbm9kZSA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBfbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0xJJyksIF90ZW1wMSwgX3RlbXAyO1xuXHRcdFx0X25vZGUuc2V0QXR0cmlidXRlKCdyb2xlJywgJ25vbmUnKTtcblx0XHRcdF90ZW1wMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcblx0XHRcdF90ZW1wMS5jbGFzc05hbWUgPSAnanN0cmVlLWljb24ganN0cmVlLW9jbCc7XG5cdFx0XHRfdGVtcDEuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuXHRcdFx0X25vZGUuYXBwZW5kQ2hpbGQoX3RlbXAxKTtcblx0XHRcdF90ZW1wMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0EnKTtcblx0XHRcdF90ZW1wMS5jbGFzc05hbWUgPSAnanN0cmVlLWFuY2hvcic7XG5cdFx0XHRfdGVtcDEuc2V0QXR0cmlidXRlKCdocmVmJywnIycpO1xuXHRcdFx0X3RlbXAxLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCctMScpO1xuXHRcdFx0X3RlbXAxLnNldEF0dHJpYnV0ZSgncm9sZScsICd0cmVlaXRlbScpO1xuXHRcdFx0X3RlbXAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuXHRcdFx0X3RlbXAyLmNsYXNzTmFtZSA9ICdqc3RyZWUtaWNvbiBqc3RyZWUtdGhlbWVpY29uJztcblx0XHRcdF90ZW1wMi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cdFx0XHRfdGVtcDEuYXBwZW5kQ2hpbGQoX3RlbXAyKTtcblx0XHRcdF9ub2RlLmFwcGVuZENoaWxkKF90ZW1wMSk7XG5cdFx0XHRfdGVtcDEgPSBfdGVtcDIgPSBudWxsO1xuXG5cdFx0XHRyZXR1cm4gX25vZGU7XG5cdFx0fSxcblx0XHRfa2JldmVudF90b19mdW5jIDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdHZhciBrZXlzID0ge1xuXHRcdFx0XHQ4OiBcIkJhY2tzcGFjZVwiLCA5OiBcIlRhYlwiLCAxMzogXCJFbnRlclwiLCAxOTogXCJQYXVzZVwiLCAyNzogXCJFc2NcIixcblx0XHRcdFx0MzI6IFwiU3BhY2VcIiwgMzM6IFwiUGFnZVVwXCIsIDM0OiBcIlBhZ2VEb3duXCIsIDM1OiBcIkVuZFwiLCAzNjogXCJIb21lXCIsXG5cdFx0XHRcdDM3OiBcIkxlZnRcIiwgMzg6IFwiVXBcIiwgMzk6IFwiUmlnaHRcIiwgNDA6IFwiRG93blwiLCA0NDogXCJQcmludFwiLCA0NTogXCJJbnNlcnRcIixcblx0XHRcdFx0NDY6IFwiRGVsZXRlXCIsIDk2OiBcIk51bXBhZDBcIiwgOTc6IFwiTnVtcGFkMVwiLCA5ODogXCJOdW1wYWQyXCIsIDk5IDogXCJOdW1wYWQzXCIsXG5cdFx0XHRcdDEwMDogXCJOdW1wYWQ0XCIsIDEwMTogXCJOdW1wYWQ1XCIsIDEwMjogXCJOdW1wYWQ2XCIsIDEwMzogXCJOdW1wYWQ3XCIsXG5cdFx0XHRcdDEwNDogXCJOdW1wYWQ4XCIsIDEwNTogXCJOdW1wYWQ5XCIsICctMTMnOiBcIk51bXBhZEVudGVyXCIsIDExMjogXCJGMVwiLFxuXHRcdFx0XHQxMTM6IFwiRjJcIiwgMTE0OiBcIkYzXCIsIDExNTogXCJGNFwiLCAxMTY6IFwiRjVcIiwgMTE3OiBcIkY2XCIsIDExODogXCJGN1wiLFxuXHRcdFx0XHQxMTk6IFwiRjhcIiwgMTIwOiBcIkY5XCIsIDEyMTogXCJGMTBcIiwgMTIyOiBcIkYxMVwiLCAxMjM6IFwiRjEyXCIsIDE0NDogXCJOdW1sb2NrXCIsXG5cdFx0XHRcdDE0NTogXCJTY3JvbGxsb2NrXCIsIDE2OiAnU2hpZnQnLCAxNzogJ0N0cmwnLCAxODogJ0FsdCcsXG5cdFx0XHRcdDQ4OiAnMCcsICA0OTogJzEnLCAgNTA6ICcyJywgIDUxOiAnMycsICA1MjogJzQnLCA1MzogICc1Jyxcblx0XHRcdFx0NTQ6ICc2JywgIDU1OiAnNycsICA1NjogJzgnLCAgNTc6ICc5JywgIDU5OiAnOycsICA2MTogJz0nLCA2NTogICdhJyxcblx0XHRcdFx0NjY6ICdiJywgIDY3OiAnYycsICA2ODogJ2QnLCAgNjk6ICdlJywgIDcwOiAnZicsICA3MTogJ2cnLCA3MjogICdoJyxcblx0XHRcdFx0NzM6ICdpJywgIDc0OiAnaicsICA3NTogJ2snLCAgNzY6ICdsJywgIDc3OiAnbScsICA3ODogJ24nLCA3OTogICdvJyxcblx0XHRcdFx0ODA6ICdwJywgIDgxOiAncScsICA4MjogJ3InLCAgODM6ICdzJywgIDg0OiAndCcsICA4NTogJ3UnLCA4NjogICd2Jyxcblx0XHRcdFx0ODc6ICd3JywgIDg4OiAneCcsICA4OTogJ3knLCAgOTA6ICd6JywgMTA3OiAnKycsIDEwOTogJy0nLCAxMTA6ICcuJyxcblx0XHRcdFx0MTg2OiAnOycsIDE4NzogJz0nLCAxODg6ICcsJywgMTg5OiAnLScsIDE5MDogJy4nLCAxOTE6ICcvJywgMTkyOiAnYCcsXG5cdFx0XHRcdDIxOTogJ1snLCAyMjA6ICdcXFxcJywyMjE6ICddJywgMjIyOiBcIidcIiwgMTExOiAnLycsIDEwNjogJyonLCAxNzM6ICctJ1xuXHRcdFx0fTtcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xuXHRcdFx0aWYgKGUuY3RybEtleSkgeyBwYXJ0cy5wdXNoKCdjdHJsJyk7IH1cblx0XHRcdGlmIChlLmFsdEtleSkgeyBwYXJ0cy5wdXNoKCdhbHQnKTsgfVxuICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHsgcGFydHMucHVzaCgnc2hpZnQnKTsgfVxuXHRcdFx0cGFydHMucHVzaChrZXlzW2Uud2hpY2hdIHx8IGUud2hpY2gpO1xuICAgICAgICAgICAgcGFydHMgPSBwYXJ0cy5zb3J0KCkuam9pbignLScpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGFydHMgPT09ICdzaGlmdC1zaGlmdCcgfHwgcGFydHMgPT09ICdjdHJsLWN0cmwnIHx8IHBhcnRzID09PSAnYWx0LWFsdCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0dmFyIGtiID0gdGhpcy5zZXR0aW5ncy5jb3JlLmtleWJvYXJkLCBpLCB0bXA7XG5cdFx0XHRmb3IgKGkgaW4ga2IpIHtcblx0XHRcdFx0aWYgKGtiLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0dG1wID0gaTtcblx0XHRcdFx0XHRpZiAodG1wICE9PSAnLScgJiYgdG1wICE9PSAnKycpIHtcblx0XHRcdFx0XHRcdHRtcCA9IHRtcC5yZXBsYWNlKCctLScsICctTUlOVVMnKS5yZXBsYWNlKCcrLScsICctTUlOVVMnKS5yZXBsYWNlKCcrKycsICctUExVUycpLnJlcGxhY2UoJy0rJywgJy1QTFVTJyk7XG5cdFx0XHRcdFx0XHR0bXAgPSB0bXAuc3BsaXQoLy18XFwrLykuc29ydCgpLmpvaW4oJy0nKS5yZXBsYWNlKCdNSU5VUycsICctJykucmVwbGFjZSgnUExVUycsICcrJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRtcCA9PT0gcGFydHMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBrYltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcGFydCBvZiB0aGUgZGVzdHJveWluZyBvZiBhbiBpbnN0YW5jZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgdGVhcmRvd24oKVxuXHRcdCAqL1xuXHRcdHRlYXJkb3duIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy51bmJpbmQoKTtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ2pzdHJlZScpXG5cdFx0XHRcdC5yZW1vdmVEYXRhKCdqc3RyZWUnKVxuXHRcdFx0XHQuZmluZChcIltjbGFzc149J2pzdHJlZSddXCIpXG5cdFx0XHRcdFx0LmFkZEJhY2soKVxuXHRcdFx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5jbGFzc05hbWUucmVwbGFjZSgvanN0cmVlW14gXSp8JC9pZywnJyk7IH0pO1xuXHRcdFx0dGhpcy5lbGVtZW50ID0gbnVsbDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGJpbmQgYWxsIGV2ZW50cy4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgYmluZCgpXG5cdFx0ICovXG5cdFx0YmluZCA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB3b3JkID0gJycsXG5cdFx0XHRcdHRvdXQgPSBudWxsLFxuXHRcdFx0XHR3YXNfY2xpY2sgPSAwO1xuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdC5vbihcImRibGNsaWNrLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoZS50YXJnZXQudGFnTmFtZSAmJiBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIikgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdFx0XHRcdFx0aWYoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5lbXB0eSkge1xuXHRcdFx0XHRcdFx0XHRkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0c2VsLmNvbGxhcHNlKCk7XG5cdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoaWdub3JlKSB7IH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5vbihcIm1vdXNlZG93bi5qc3RyZWVcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0ID09PSB0aGlzLmVsZW1lbnRbMF0pIHtcblx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IGxvc2luZyBmb2N1cyB3aGVuIGNsaWNraW5nIHNjcm9sbCBhcnJvd3MgKEZGLCBDaHJvbWUpXG5cdFx0XHRcdFx0XHRcdHdhc19jbGljayA9ICsobmV3IERhdGUoKSk7IC8vIGllIGRvZXMgbm90IGFsbG93IHRvIHByZXZlbnQgbG9zaW5nIGZvY3VzXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJtb3VzZWRvd24uanN0cmVlXCIsIFwiLmpzdHJlZS1vY2xcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBhbnkgbm9kZSBpbnNpZGUgZnJvbSBsb3NpbmcgZm9jdXMgd2hlbiBjbGlja2luZyB0aGUgb3Blbi9jbG9zZSBpY29uXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKFwiY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS1vY2xcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRoaXMudG9nZ2xlX25vZGUoZS50YXJnZXQpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwiZGJsY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0LnRhZ05hbWUgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29yZS5kYmxjbGlja190b2dnbGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy50b2dnbGVfbm9kZShlLnRhcmdldCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJjbGljay5qc3RyZWVcIiwgXCIuanN0cmVlLWFuY2hvclwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0aWYoZS5jdXJyZW50VGFyZ2V0ICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7ICQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKCdmb2N1cycpOyB9XG5cdFx0XHRcdFx0XHR0aGlzLmFjdGl2YXRlX25vZGUoZS5jdXJyZW50VGFyZ2V0LCBlKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbigna2V5ZG93bi5qc3RyZWUnLCAnLmpzdHJlZS1hbmNob3InLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoZS50YXJnZXQudGFnTmFtZSAmJiBlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIikgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLnJ0bCkge1xuXHRcdFx0XHRcdFx0XHRpZihlLndoaWNoID09PSAzNykgeyBlLndoaWNoID0gMzk7IH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZihlLndoaWNoID09PSAzOSkgeyBlLndoaWNoID0gMzc7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBmID0gdGhpcy5fa2JldmVudF90b19mdW5jKGUpO1xuXHRcdFx0XHRcdFx0aWYgKGYpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHIgPSBmLmNhbGwodGhpcywgZSk7XG5cdFx0XHRcdFx0XHRcdGlmIChyID09PSBmYWxzZSB8fCByID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHI7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImxvYWRfbm9kZS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdGlmKGRhdGEuc3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRcdGlmKGRhdGEubm9kZS5pZCA9PT0gJC5qc3RyZWUucm9vdCAmJiAhdGhpcy5fZGF0YS5jb3JlLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2ZpcnN0Q2hpbGQodGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyx0aGlzLl9maXJzdENoaWxkKHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKS5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciB0aGUgcm9vdCBub2RlIGlzIGxvYWRlZCBmb3IgdGhlIGZpcnN0IHRpbWVcblx0XHRcdFx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHRcdFx0XHQgKiBAbmFtZSBsb2FkZWQuanN0cmVlXG5cdFx0XHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKFwibG9hZGVkXCIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKCF0aGlzLl9kYXRhLmNvcmUucmVhZHkpIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5lbGVtZW50ICYmICF0aGlzLmdldF9jb250YWluZXJfdWwoKS5maW5kKCcuanN0cmVlLWxvYWRpbmcnKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnJlYWR5ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29yZS5leHBhbmRfc2VsZWN0ZWRfb25sb2FkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2YXIgdG1wID0gW10sIGksIGo7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRtcC5jb25jYXQodGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV1dLnBhcmVudHMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gJC52YWthdGEuYXJyYXlfdW5pcXVlKHRtcCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMub3Blbl9ub2RlKHRtcFtpXSwgZmFsc2UsIDApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ3JlYWR5JywgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIGFsbCBub2RlcyBhcmUgZmluaXNoZWQgbG9hZGluZ1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogQG5hbWUgcmVhZHkuanN0cmVlXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoXCJyZWFkeVwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksIDApO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQvLyBxdWljayBzZWFyY2hpbmcgd2hlbiB0aGUgdHJlZSBpcyBmb2N1c2VkXG5cdFx0XHRcdC5vbigna2V5cHJlc3MuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0LnRhZ05hbWUgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0XHRcdGlmKHRvdXQpIHsgY2xlYXJUaW1lb3V0KHRvdXQpOyB9XG5cdFx0XHRcdFx0XHR0b3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHdvcmQgPSAnJztcblx0XHRcdFx0XHRcdH0sIDUwMCk7XG5cblx0XHRcdFx0XHRcdHZhciBjaHIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdGNvbCA9IHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLWFuY2hvcicpLmZpbHRlcignOnZpc2libGUnKSxcblx0XHRcdFx0XHRcdFx0aW5kID0gY29sLmluZGV4KGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHx8IDAsXG5cdFx0XHRcdFx0XHRcdGVuZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0d29yZCArPSBjaHI7XG5cblx0XHRcdFx0XHRcdC8vIG1hdGNoIGZvciB3aG9sZSB3b3JkIGZyb20gY3VycmVudCBub2RlIGRvd24gKGluY2x1ZGluZyB0aGUgY3VycmVudCBub2RlKVxuXHRcdFx0XHRcdFx0aWYod29yZC5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0XHRcdGNvbC5zbGljZShpbmQpLmVhY2goZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0XHRcdFx0XHRpZigkKHYpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yod29yZCkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodikudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGVuZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHRpZihlbmQpIHsgcmV0dXJuOyB9XG5cblx0XHRcdFx0XHRcdFx0Ly8gbWF0Y2ggZm9yIHdob2xlIHdvcmQgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSB0cmVlXG5cdFx0XHRcdFx0XHRcdGNvbC5zbGljZSgwLCBpbmQpLmVhY2goZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0XHRcdFx0XHRpZigkKHYpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yod29yZCkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0XHRcdCQodikudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGVuZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHRpZihlbmQpIHsgcmV0dXJuOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyBsaXN0IG5vZGVzIHRoYXQgc3RhcnQgd2l0aCB0aGF0IGxldHRlciAob25seSBpZiB3b3JkIGNvbnNpc3RzIG9mIGEgc2luZ2xlIGNoYXIpXG5cdFx0XHRcdFx0XHRpZihuZXcgUmVnRXhwKCdeJyArIGNoci5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKSArICcrJCcpLnRlc3Qod29yZCkpIHtcblx0XHRcdFx0XHRcdFx0Ly8gc2VhcmNoIGZvciB0aGUgbmV4dCBub2RlIHN0YXJ0aW5nIHdpdGggdGhhdCBsZXR0ZXJcblx0XHRcdFx0XHRcdFx0Y29sLnNsaWNlKGluZCArIDEpLmVhY2goZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0XHRcdFx0XHRpZigkKHYpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gY2hyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHYpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0aWYoZW5kKSB7IHJldHVybjsgfVxuXG5cdFx0XHRcdFx0XHRcdC8vIHNlYXJjaCBmcm9tIHRoZSBiZWdpbm5pbmdcblx0XHRcdFx0XHRcdFx0Y29sLnNsaWNlKDAsIGluZCArIDEpLmVhY2goZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0XHRcdFx0XHRpZigkKHYpLnRleHQoKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gY2hyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHYpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0aWYoZW5kKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Ly8gVEhFTUUgUkVMQVRFRFxuXHRcdFx0XHQub24oXCJpbml0LmpzdHJlZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR2YXIgcyA9IHRoaXMuc2V0dGluZ3MuY29yZS50aGVtZXM7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHNcdFx0XHQ9IHMuZG90cztcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuc3RyaXBlc1x0XHQ9IHMuc3RyaXBlcztcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuaWNvbnNcdFx0PSBzLmljb25zO1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5lbGxpcHNpc1x0XHQ9IHMuZWxsaXBzaXM7XG5cdFx0XHRcdFx0XHR0aGlzLnNldF90aGVtZShzLm5hbWUgfHwgXCJkZWZhdWx0XCIsIHMudXJsKTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0X3RoZW1lX3ZhcmlhbnQocy52YXJpYW50KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImxvYWRpbmcuanN0cmVlXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXNbIHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZG90cyA/IFwic2hvd19kb3RzXCIgOiBcImhpZGVfZG90c1wiIF0oKTtcblx0XHRcdFx0XHRcdHRoaXNbIHRoaXMuX2RhdGEuY29yZS50aGVtZXMuaWNvbnMgPyBcInNob3dfaWNvbnNcIiA6IFwiaGlkZV9pY29uc1wiIF0oKTtcblx0XHRcdFx0XHRcdHRoaXNbIHRoaXMuX2RhdGEuY29yZS50aGVtZXMuc3RyaXBlcyA/IFwic2hvd19zdHJpcGVzXCIgOiBcImhpZGVfc3RyaXBlc1wiIF0oKTtcblx0XHRcdFx0XHRcdHRoaXNbIHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZWxsaXBzaXMgPyBcInNob3dfZWxsaXBzaXNcIiA6IFwiaGlkZV9lbGxpcHNpc1wiIF0oKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbignYmx1ci5qc3RyZWUnLCAnLmpzdHJlZS1hbmNob3InLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgPSBudWxsO1xuXHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmZpbHRlcignLmpzdHJlZS1ob3ZlcmVkJykudHJpZ2dlcignbW91c2VsZWF2ZScpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ3RhYmluZGV4JywgJzAnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbignZm9jdXMuanN0cmVlJywgJy5qc3RyZWUtYW5jaG9yJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLmdldF9ub2RlKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmlkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID0gdG1wLmlkO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtaG92ZXJlZCcpLm5vdChlLmN1cnJlbnRUYXJnZXQpLnRyaWdnZXIoJ21vdXNlbGVhdmUnKTtcblx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKCdtb3VzZWVudGVyJyk7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cigndGFiaW5kZXgnLCAnLTEnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbignZm9jdXMuanN0cmVlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYoKyhuZXcgRGF0ZSgpKSAtIHdhc19jbGljayA+IDUwMCAmJiAhdGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgJiYgdGhpcy5zZXR0aW5ncy5jb3JlLnJlc3RvcmVfZm9jdXMpIHtcblx0XHRcdFx0XHRcdFx0d2FzX2NsaWNrID0gMDtcblx0XHRcdFx0XHRcdFx0dmFyIGFjdCA9IHRoaXMuZ2V0X25vZGUodGhpcy5lbGVtZW50LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0aWYoYWN0KSB7XG5cdFx0XHRcdFx0XHRcdFx0YWN0LmZpbmQoJz4gLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oJ21vdXNlZW50ZXIuanN0cmVlJywgJy5qc3RyZWUtYW5jaG9yJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuaG92ZXJfbm9kZShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKCdtb3VzZWxlYXZlLmpzdHJlZScsICcuanN0cmVlLWFuY2hvcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlaG92ZXJfbm9kZShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBwYXJ0IG9mIHRoZSBkZXN0cm95aW5nIG9mIGFuIGluc3RhbmNlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSB1bmJpbmQoKVxuXHRcdCAqL1xuXHRcdHVuYmluZCA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZWxlbWVudC5vZmYoJy5qc3RyZWUnKTtcblx0XHRcdCQoZG9jdW1lbnQpLm9mZignLmpzdHJlZS0nICsgdGhpcy5faWQpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogdHJpZ2dlciBhbiBldmVudC4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgdHJpZ2dlcihldiBbLCBkYXRhXSlcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGV2IHRoZSBuYW1lIG9mIHRoZSBldmVudCB0byB0cmlnZ2VyXG5cdFx0ICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIGFkZGl0aW9uYWwgZGF0YSB0byBwYXNzIHdpdGggdGhlIGV2ZW50XG5cdFx0ICovXG5cdFx0dHJpZ2dlciA6IGZ1bmN0aW9uIChldiwgZGF0YSkge1xuXHRcdFx0aWYoIWRhdGEpIHtcblx0XHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0ZGF0YS5pbnN0YW5jZSA9IHRoaXM7XG5cdFx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlckhhbmRsZXIoZXYucmVwbGFjZSgnLmpzdHJlZScsJycpICsgJy5qc3RyZWUnLCBkYXRhKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJldHVybnMgdGhlIGpRdWVyeSBleHRlbmRlZCBpbnN0YW5jZSBjb250YWluZXJcblx0XHQgKiBAbmFtZSBnZXRfY29udGFpbmVyKClcblx0XHQgKiBAcmV0dXJuIHtqUXVlcnl9XG5cdFx0ICovXG5cdFx0Z2V0X2NvbnRhaW5lciA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZXR1cm5zIHRoZSBqUXVlcnkgZXh0ZW5kZWQgbWFpbiBVTCBub2RlIGluc2lkZSB0aGUgaW5zdGFuY2UgY29udGFpbmVyLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBnZXRfY29udGFpbmVyX3VsKClcblx0XHQgKiBAcmV0dXJuIHtqUXVlcnl9XG5cdFx0ICovXG5cdFx0Z2V0X2NvbnRhaW5lcl91bCA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLmVsZW1lbnQuY2hpbGRyZW4oXCIuanN0cmVlLWNoaWxkcmVuXCIpLmZpcnN0KCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIHN0cmluZyByZXBsYWNlbWVudHMgKGxvY2FsaXphdGlvbikuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGdldF9zdHJpbmcoa2V5KVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30ga2V5XG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdCAqL1xuXHRcdGdldF9zdHJpbmcgOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YXIgYSA9IHRoaXMuc2V0dGluZ3MuY29yZS5zdHJpbmdzO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfZnVuY3Rpb24oYSkpIHsgcmV0dXJuIGEuY2FsbCh0aGlzLCBrZXkpOyB9XG5cdFx0XHRpZihhICYmIGFba2V5XSkgeyByZXR1cm4gYVtrZXldOyB9XG5cdFx0XHRyZXR1cm4ga2V5O1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0cyB0aGUgZmlyc3QgY2hpbGQgb2YgYSBET00gbm9kZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX2ZpcnN0Q2hpbGQoZG9tKVxuXHRcdCAqIEBwYXJhbSAge0RPTUVsZW1lbnR9IGRvbVxuXHRcdCAqIEByZXR1cm4ge0RPTUVsZW1lbnR9XG5cdFx0ICovXG5cdFx0X2ZpcnN0Q2hpbGQgOiBmdW5jdGlvbiAoZG9tKSB7XG5cdFx0XHRkb20gPSBkb20gPyBkb20uZmlyc3RDaGlsZCA6IG51bGw7XG5cdFx0XHR3aGlsZShkb20gIT09IG51bGwgJiYgZG9tLm5vZGVUeXBlICE9PSAxKSB7XG5cdFx0XHRcdGRvbSA9IGRvbS5uZXh0U2libGluZztcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb207XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIHRoZSBuZXh0IHNpYmxpbmcgb2YgYSBET00gbm9kZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX25leHRTaWJsaW5nKGRvbSlcblx0XHQgKiBAcGFyYW0gIHtET01FbGVtZW50fSBkb21cblx0XHQgKiBAcmV0dXJuIHtET01FbGVtZW50fVxuXHRcdCAqL1xuXHRcdF9uZXh0U2libGluZyA6IGZ1bmN0aW9uIChkb20pIHtcblx0XHRcdGRvbSA9IGRvbSA/IGRvbS5uZXh0U2libGluZyA6IG51bGw7XG5cdFx0XHR3aGlsZShkb20gIT09IG51bGwgJiYgZG9tLm5vZGVUeXBlICE9PSAxKSB7XG5cdFx0XHRcdGRvbSA9IGRvbS5uZXh0U2libGluZztcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb207XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIHRoZSBwcmV2aW91cyBzaWJsaW5nIG9mIGEgRE9NIG5vZGUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9wcmV2aW91c1NpYmxpbmcoZG9tKVxuXHRcdCAqIEBwYXJhbSAge0RPTUVsZW1lbnR9IGRvbVxuXHRcdCAqIEByZXR1cm4ge0RPTUVsZW1lbnR9XG5cdFx0ICovXG5cdFx0X3ByZXZpb3VzU2libGluZyA6IGZ1bmN0aW9uIChkb20pIHtcblx0XHRcdGRvbSA9IGRvbSA/IGRvbS5wcmV2aW91c1NpYmxpbmcgOiBudWxsO1xuXHRcdFx0d2hpbGUoZG9tICE9PSBudWxsICYmIGRvbS5ub2RlVHlwZSAhPT0gMSkge1xuXHRcdFx0XHRkb20gPSBkb20ucHJldmlvdXNTaWJsaW5nO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGRvbTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIG5vZGUgKG9yIHRoZSBhY3R1YWwgalF1ZXJ5IGV4dGVuZGVkIERPTSBub2RlKSBieSB1c2luZyBhbnkgaW5wdXQgKGNoaWxkIERPTSBlbGVtZW50LCBJRCBzdHJpbmcsIHNlbGVjdG9yLCBldGMpXG5cdFx0ICogQG5hbWUgZ2V0X25vZGUob2JqIFssIGFzX2RvbV0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IGFzX2RvbVxuXHRcdCAqIEByZXR1cm4ge09iamVjdHxqUXVlcnl9XG5cdFx0ICovXG5cdFx0Z2V0X25vZGUgOiBmdW5jdGlvbiAob2JqLCBhc19kb20pIHtcblx0XHRcdGlmKG9iaiAmJiBvYmouaWQpIHtcblx0XHRcdFx0b2JqID0gb2JqLmlkO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG9iaiBpbnN0YW5jZW9mICQgJiYgb2JqLmxlbmd0aCAmJiBvYmpbMF0uaWQpIHtcblx0XHRcdFx0b2JqID0gb2JqWzBdLmlkO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGRvbTtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbb2JqXSkge1xuXHRcdFx0XHRcdG9iaiA9IHRoaXMuX21vZGVsLmRhdGFbb2JqXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgJiYgdGhpcy5fbW9kZWwuZGF0YVtvYmoucmVwbGFjZSgvXiMvLCAnJyldKSB7XG5cdFx0XHRcdFx0b2JqID0gdGhpcy5fbW9kZWwuZGF0YVtvYmoucmVwbGFjZSgvXiMvLCAnJyldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIiAmJiAoZG9tID0gJCgnIycgKyBvYmoucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSwgdGhpcy5lbGVtZW50KSkubGVuZ3RoICYmIHRoaXMuX21vZGVsLmRhdGFbZG9tLmNsb3Nlc3QoJy5qc3RyZWUtbm9kZScpLmF0dHIoJ2lkJyldKSB7XG5cdFx0XHRcdFx0b2JqID0gdGhpcy5fbW9kZWwuZGF0YVtkb20uY2xvc2VzdCgnLmpzdHJlZS1ub2RlJykuYXR0cignaWQnKV07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigoZG9tID0gdGhpcy5lbGVtZW50LmZpbmQob2JqKSkubGVuZ3RoICYmIHRoaXMuX21vZGVsLmRhdGFbZG9tLmNsb3Nlc3QoJy5qc3RyZWUtbm9kZScpLmF0dHIoJ2lkJyldKSB7XG5cdFx0XHRcdFx0b2JqID0gdGhpcy5fbW9kZWwuZGF0YVtkb20uY2xvc2VzdCgnLmpzdHJlZS1ub2RlJykuYXR0cignaWQnKV07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZigoZG9tID0gdGhpcy5lbGVtZW50LmZpbmQob2JqKSkubGVuZ3RoICYmIGRvbS5oYXNDbGFzcygnanN0cmVlJykpIHtcblx0XHRcdFx0XHRvYmogPSB0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGFzX2RvbSkge1xuXHRcdFx0XHRcdG9iaiA9IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuZWxlbWVudCA6ICQoJyMnICsgb2JqLmlkLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyksIHRoaXMuZWxlbWVudCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdH0gY2F0Y2ggKGV4KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBwYXRoIHRvIGEgbm9kZSwgZWl0aGVyIGNvbnNpc3Rpbmcgb2Ygbm9kZSB0ZXh0cywgb3Igb2Ygbm9kZSBJRHMsIG9wdGlvbmFsbHkgZ2x1ZWQgdG9nZXRoZXIgKG90aGVyd2lzZSBhbiBhcnJheSlcblx0XHQgKiBAbmFtZSBnZXRfcGF0aChvYmogWywgZ2x1ZSwgaWRzXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBnbHVlIGlmIHlvdSB3YW50IHRoZSBwYXRoIGFzIGEgc3RyaW5nIC0gcGFzcyB0aGUgZ2x1ZSBoZXJlIChmb3IgZXhhbXBsZSAnLycpLCBpZiBhIGZhbHN5IHZhbHVlIGlzIHN1cHBsaWVkIGhlcmUsIGFuIGFycmF5IGlzIHJldHVybmVkXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gaWRzIGlmIHNldCB0byB0cnVlIGJ1aWxkIHRoZSBwYXRoIHVzaW5nIElELCBvdGhlcndpc2Ugbm9kZSB0ZXh0IGlzIHVzZWRcblx0XHQgKiBAcmV0dXJuIHttaXhlZH1cblx0XHQgKi9cblx0XHRnZXRfcGF0aCA6IGZ1bmN0aW9uIChvYmosIGdsdWUsIGlkcykge1xuXHRcdFx0b2JqID0gb2JqLnBhcmVudHMgPyBvYmogOiB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCB8fCAhb2JqLnBhcmVudHMpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGksIGosIHAgPSBbXTtcblx0XHRcdHAucHVzaChpZHMgPyBvYmouaWQgOiBvYmoudGV4dCk7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmoucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0cC5wdXNoKGlkcyA/IG9iai5wYXJlbnRzW2ldIDogdGhpcy5nZXRfdGV4dChvYmoucGFyZW50c1tpXSkpO1xuXHRcdFx0fVxuXHRcdFx0cCA9IHAucmV2ZXJzZSgpLnNsaWNlKDEpO1xuXHRcdFx0cmV0dXJuIGdsdWUgPyBwLmpvaW4oZ2x1ZSkgOiBwO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBuZXh0IHZpc2libGUgbm9kZSB0aGF0IGlzIGJlbG93IHRoZSBgb2JqYCBub2RlLiBJZiBgc3RyaWN0YCBpcyBzZXQgdG8gYHRydWVgIG9ubHkgc2libGluZyBub2RlcyBhcmUgcmV0dXJuZWQuXG5cdFx0ICogQG5hbWUgZ2V0X25leHRfZG9tKG9iaiBbLCBzdHJpY3RdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBzdHJpY3Rcblx0XHQgKiBAcmV0dXJuIHtqUXVlcnl9XG5cdFx0ICovXG5cdFx0Z2V0X25leHRfZG9tIDogZnVuY3Rpb24gKG9iaiwgc3RyaWN0KSB7XG5cdFx0XHR2YXIgdG1wO1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0aWYob2JqWzBdID09PSB0aGlzLmVsZW1lbnRbMF0pIHtcblx0XHRcdFx0dG1wID0gdGhpcy5fZmlyc3RDaGlsZCh0aGlzLmdldF9jb250YWluZXJfdWwoKVswXSk7XG5cdFx0XHRcdHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHRcdHRtcCA9IHRoaXMuX25leHRTaWJsaW5nKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRtcCA/ICQodG1wKSA6IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9iaiB8fCAhb2JqLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihzdHJpY3QpIHtcblx0XHRcdFx0dG1wID0gb2JqWzBdO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5fbmV4dFNpYmxpbmcodG1wKTtcblx0XHRcdFx0fSB3aGlsZSAodG1wICYmIHRtcC5vZmZzZXRIZWlnaHQgPT09IDApO1xuXHRcdFx0XHRyZXR1cm4gdG1wID8gJCh0bXApIDogZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihvYmouaGFzQ2xhc3MoXCJqc3RyZWUtb3BlblwiKSkge1xuXHRcdFx0XHR0bXAgPSB0aGlzLl9maXJzdENoaWxkKG9iai5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpWzBdKTtcblx0XHRcdFx0d2hpbGUgKHRtcCAmJiB0bXAub2Zmc2V0SGVpZ2h0ID09PSAwKSB7XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5fbmV4dFNpYmxpbmcodG1wKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0bXAgIT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gJCh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBvYmpbMF07XG5cdFx0XHRkbyB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuX25leHRTaWJsaW5nKHRtcCk7XG5cdFx0XHR9IHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCk7XG5cdFx0XHRpZih0bXAgIT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuICQodG1wKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmoucGFyZW50c1VudGlsKFwiLmpzdHJlZVwiLFwiLmpzdHJlZS1ub2RlXCIpLm5leHRBbGwoXCIuanN0cmVlLW5vZGU6dmlzaWJsZVwiKS5maXJzdCgpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBwcmV2aW91cyB2aXNpYmxlIG5vZGUgdGhhdCBpcyBhYm92ZSB0aGUgYG9iamAgbm9kZS4gSWYgYHN0cmljdGAgaXMgc2V0IHRvIGB0cnVlYCBvbmx5IHNpYmxpbmcgbm9kZXMgYXJlIHJldHVybmVkLlxuXHRcdCAqIEBuYW1lIGdldF9wcmV2X2RvbShvYmogWywgc3RyaWN0XSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gc3RyaWN0XG5cdFx0ICogQHJldHVybiB7alF1ZXJ5fVxuXHRcdCAqL1xuXHRcdGdldF9wcmV2X2RvbSA6IGZ1bmN0aW9uIChvYmosIHN0cmljdCkge1xuXHRcdFx0dmFyIHRtcDtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKG9ialswXSA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdLmxhc3RDaGlsZDtcblx0XHRcdFx0d2hpbGUgKHRtcCAmJiB0bXAub2Zmc2V0SGVpZ2h0ID09PSAwKSB7XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5fcHJldmlvdXNTaWJsaW5nKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRtcCA/ICQodG1wKSA6IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9iaiB8fCAhb2JqLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihzdHJpY3QpIHtcblx0XHRcdFx0dG1wID0gb2JqWzBdO1xuXHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5fcHJldmlvdXNTaWJsaW5nKHRtcCk7XG5cdFx0XHRcdH0gd2hpbGUgKHRtcCAmJiB0bXAub2Zmc2V0SGVpZ2h0ID09PSAwKTtcblx0XHRcdFx0cmV0dXJuIHRtcCA/ICQodG1wKSA6IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dG1wID0gb2JqWzBdO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR0bXAgPSB0aGlzLl9wcmV2aW91c1NpYmxpbmcodG1wKTtcblx0XHRcdH0gd2hpbGUgKHRtcCAmJiB0bXAub2Zmc2V0SGVpZ2h0ID09PSAwKTtcblx0XHRcdGlmKHRtcCAhPT0gbnVsbCkge1xuXHRcdFx0XHRvYmogPSAkKHRtcCk7XG5cdFx0XHRcdHdoaWxlKG9iai5oYXNDbGFzcyhcImpzdHJlZS1vcGVuXCIpKSB7XG5cdFx0XHRcdFx0b2JqID0gb2JqLmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5maXJzdCgpLmNoaWxkcmVuKFwiLmpzdHJlZS1ub2RlOnZpc2libGU6bGFzdFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gb2JqO1xuXHRcdFx0fVxuXHRcdFx0dG1wID0gb2JqWzBdLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcblx0XHRcdHJldHVybiB0bXAgJiYgdG1wLmNsYXNzTmFtZSAmJiB0bXAuY2xhc3NOYW1lLmluZGV4T2YoJ2pzdHJlZS1ub2RlJykgIT09IC0xID8gJCh0bXApIDogZmFsc2U7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgdGhlIHBhcmVudCBJRCBvZiBhIG5vZGVcblx0XHQgKiBAbmFtZSBnZXRfcGFyZW50KG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdCAqL1xuXHRcdGdldF9wYXJlbnQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqLnBhcmVudDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCBhIGpRdWVyeSBjb2xsZWN0aW9uIG9mIGFsbCB0aGUgY2hpbGRyZW4gb2YgYSBub2RlIChub2RlIG11c3QgYmUgcmVuZGVyZWQpLCByZXR1cm5zIGZhbHNlIG9uIGVycm9yXG5cdFx0ICogQG5hbWUgZ2V0X2NoaWxkcmVuX2RvbShvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge2pRdWVyeX1cblx0XHQgKi9cblx0XHRnZXRfY2hpbGRyZW5fZG9tIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0aWYob2JqWzBdID09PSB0aGlzLmVsZW1lbnRbMF0pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmNoaWxkcmVuKFwiLmpzdHJlZS1ub2RlXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9iaiB8fCAhb2JqLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqLmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5jaGlsZHJlbihcIi5qc3RyZWUtbm9kZVwiKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrcyBpZiBhIG5vZGUgaGFzIGNoaWxkcmVuXG5cdFx0ICogQG5hbWUgaXNfcGFyZW50KG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19wYXJlbnQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqICYmIChvYmouc3RhdGUubG9hZGVkID09PSBmYWxzZSB8fCBvYmouY2hpbGRyZW4ubGVuZ3RoID4gMCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVja3MgaWYgYSBub2RlIGlzIGxvYWRlZCAoaXRzIGNoaWxkcmVuIGFyZSBhdmFpbGFibGUpXG5cdFx0ICogQG5hbWUgaXNfbG9hZGVkKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19sb2FkZWQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqICYmIG9iai5zdGF0ZS5sb2FkZWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVjayBpZiBhIG5vZGUgaXMgY3VycmVudGx5IGxvYWRpbmcgKGZldGNoaW5nIGNoaWxkcmVuKVxuXHRcdCAqIEBuYW1lIGlzX2xvYWRpbmcob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGlzX2xvYWRpbmcgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqICYmIG9iai5zdGF0ZSAmJiBvYmouc3RhdGUubG9hZGluZztcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrIGlmIGEgbm9kZSBpcyBvcGVuZWRcblx0XHQgKiBAbmFtZSBpc19vcGVuKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19vcGVuIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiBvYmouc3RhdGUub3BlbmVkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2sgaWYgYSBub2RlIGlzIGluIGEgY2xvc2VkIHN0YXRlXG5cdFx0ICogQG5hbWUgaXNfY2xvc2VkKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19jbG9zZWQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqICYmIHRoaXMuaXNfcGFyZW50KG9iaikgJiYgIW9iai5zdGF0ZS5vcGVuZWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVjayBpZiBhIG5vZGUgaGFzIG5vIGNoaWxkcmVuXG5cdFx0ICogQG5hbWUgaXNfbGVhZihvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfbGVhZiA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHJldHVybiAhdGhpcy5pc19wYXJlbnQob2JqKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGxvYWRzIGEgbm9kZSAoZmV0Y2hlcyBpdHMgY2hpbGRyZW4gdXNpbmcgdGhlIGBjb3JlLmRhdGFgIHNldHRpbmcpLiBNdWx0aXBsZSBub2RlcyBjYW4gYmUgcGFzc2VkIHRvIGJ5IHVzaW5nIGFuIGFycmF5LlxuXHRcdCAqIEBuYW1lIGxvYWRfbm9kZShvYmogWywgY2FsbGJhY2tdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUsIHRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSBhbmQgcmVjZWl2ZXMgdHdvIGFyZ3VtZW50cyAtIHRoZSBub2RlIGFuZCBhIGJvb2xlYW4gc3RhdHVzXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKiBAdHJpZ2dlciBsb2FkX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0bG9hZF9ub2RlIDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBrLCBsLCBpLCBqLCBjO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHR0aGlzLl9sb2FkX25vZGVzKG9iai5zbGljZSgpLCBjYWxsYmFjayk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaikge1xuXHRcdFx0XHRpZihjYWxsYmFjaykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIG9iaiwgZmFsc2UpOyB9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdC8vIGlmKG9iai5zdGF0ZS5sb2FkaW5nKSB7IH0gLy8gdGhlIG5vZGUgaXMgYWxyZWFkeSBsb2FkaW5nIC0ganVzdCB3YWl0IGZvciBpdCB0byBsb2FkIGFuZCBpbnZva2UgY2FsbGJhY2s/IGJ1dCBpZiBjYWxsZWQgaW1wbGljaXRseSBpdCBzaG91bGQgYmUgbG9hZGVkIGFnYWluP1xuXHRcdFx0aWYob2JqLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUubG9hZGVkID0gZmFsc2U7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSAkLnZha2F0YS5hcnJheV9maWx0ZXIodGhpcy5fbW9kZWwuZGF0YVtvYmoucGFyZW50c1tpXV0uY2hpbGRyZW5fZCwgZnVuY3Rpb24gKHYpIHtcblx0XHRcdFx0XHRcdHJldHVybiAkLmluQXJyYXkodiwgb2JqLmNoaWxkcmVuX2QpID09PSAtMTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IoayA9IDAsIGwgPSBvYmouY2hpbGRyZW5fZC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW29iai5jaGlsZHJlbl9kW2tdXS5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0YyA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9tb2RlbC5kYXRhW29iai5jaGlsZHJlbl9kW2tdXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoYykge1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X2ZpbHRlcih0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsIGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KHYsIG9iai5jaGlsZHJlbl9kKSA9PT0gLTE7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0b2JqLmNoaWxkcmVuID0gW107XG5cdFx0XHRcdG9iai5jaGlsZHJlbl9kID0gW107XG5cdFx0XHRcdGlmKGMpIHtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ2xvYWRfbm9kZScsICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b2JqLnN0YXRlLmZhaWxlZCA9IGZhbHNlO1xuXHRcdFx0b2JqLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0dGhpcy5nZXRfbm9kZShvYmosIHRydWUpLmFkZENsYXNzKFwianN0cmVlLWxvYWRpbmdcIikuYXR0cignYXJpYS1idXN5Jyx0cnVlKTtcblx0XHRcdHRoaXMuX2xvYWRfbm9kZShvYmosIGZ1bmN0aW9uIChzdGF0dXMpIHtcblx0XHRcdFx0b2JqID0gdGhpcy5fbW9kZWwuZGF0YVtvYmouaWRdO1xuXHRcdFx0XHRvYmouc3RhdGUubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRvYmouc3RhdGUubG9hZGVkID0gc3RhdHVzO1xuXHRcdFx0XHRvYmouc3RhdGUuZmFpbGVkID0gIW9iai5zdGF0ZS5sb2FkZWQ7XG5cdFx0XHRcdHZhciBkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSksIGkgPSAwLCBqID0gMCwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIGhhc19jaGlsZHJlbiA9IGZhbHNlO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYobVtvYmouY2hpbGRyZW5baV1dICYmICFtW29iai5jaGlsZHJlbltpXV0uc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdFx0XHRoYXNfY2hpbGRyZW4gPSB0cnVlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKG9iai5zdGF0ZS5sb2FkZWQgJiYgZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1jbG9zZWQganN0cmVlLW9wZW4ganN0cmVlLWxlYWYnKTtcblx0XHRcdFx0XHRpZiAoIWhhc19jaGlsZHJlbikge1xuXHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKCdqc3RyZWUtbGVhZicpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGlmIChvYmouaWQgIT09ICcjJykge1xuXHRcdFx0XHRcdFx0XHRkb20uYWRkQ2xhc3Mob2JqLnN0YXRlLm9wZW5lZCA/ICdqc3RyZWUtb3BlbicgOiAnanN0cmVlLWNsb3NlZCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtbG9hZGluZ1wiKS5hdHRyKCdhcmlhLWJ1c3knLGZhbHNlKTtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciBhIG5vZGUgaXMgbG9hZGVkXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBsb2FkX25vZGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBub2RlIHRoYXQgd2FzIGxvYWRpbmdcblx0XHRcdFx0ICogQHBhcmFtIHtCb29sZWFufSBzdGF0dXMgd2FzIHRoZSBub2RlIGxvYWRlZCBzdWNjZXNzZnVsbHlcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignbG9hZF9ub2RlJywgeyBcIm5vZGVcIiA6IG9iaiwgXCJzdGF0dXNcIiA6IHN0YXR1cyB9KTtcblx0XHRcdFx0aWYoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIG9iaiwgc3RhdHVzKTtcblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogbG9hZCBhbiBhcnJheSBvZiBub2RlcyAod2lsbCBhbHNvIGxvYWQgdW5hdmFpbGFibGUgbm9kZXMgYXMgc29vbiBhcyB0aGV5IGFwcGVhciBpbiB0aGUgc3RydWN0dXJlKS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX2xvYWRfbm9kZXMobm9kZXMgWywgY2FsbGJhY2tdKVxuXHRcdCAqIEBwYXJhbSAge2FycmF5fSBub2Rlc1xuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uY2UgbG9hZGluZyBpcyBjb21wbGV0ZSwgdGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBpbnN0YW5jZSdzIHNjb3BlIGFuZCByZWNlaXZlcyBvbmUgYXJndW1lbnQgLSB0aGUgYXJyYXkgcGFzc2VkIHRvIF9sb2FkX25vZGVzXG5cdFx0ICovXG5cdFx0X2xvYWRfbm9kZXMgOiBmdW5jdGlvbiAobm9kZXMsIGNhbGxiYWNrLCBpc19jYWxsYmFjaywgZm9yY2VfcmVsb2FkKSB7XG5cdFx0XHR2YXIgciA9IHRydWUsXG5cdFx0XHRcdGMgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX2xvYWRfbm9kZXMobm9kZXMsIGNhbGxiYWNrLCB0cnVlKTsgfSxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsIGksIGosIHRtcCA9IFtdO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gbm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKG1bbm9kZXNbaV1dICYmICggKCFtW25vZGVzW2ldXS5zdGF0ZS5sb2FkZWQgJiYgIW1bbm9kZXNbaV1dLnN0YXRlLmZhaWxlZCkgfHwgKCFpc19jYWxsYmFjayAmJiBmb3JjZV9yZWxvYWQpICkpIHtcblx0XHRcdFx0XHRpZighdGhpcy5pc19sb2FkaW5nKG5vZGVzW2ldKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5sb2FkX25vZGUobm9kZXNbaV0sIGMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKHIpIHtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gbm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYobVtub2Rlc1tpXV0gJiYgbVtub2Rlc1tpXV0uc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdFx0XHR0bXAucHVzaChub2Rlc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGNhbGxiYWNrICYmICFjYWxsYmFjay5kb25lKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCB0bXApO1xuXHRcdFx0XHRcdGNhbGxiYWNrLmRvbmUgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBsb2FkcyBhbGwgdW5sb2FkZWQgbm9kZXNcblx0XHQgKiBAbmFtZSBsb2FkX2FsbChbb2JqLCBjYWxsYmFja10pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGxvYWQgcmVjdXJzaXZlbHksIG9taXQgdG8gbG9hZCBhbGwgbm9kZXMgaW4gdGhlIHRyZWVcblx0XHQgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uY2UgbG9hZGluZyBhbGwgdGhlIG5vZGVzIGlzIGNvbXBsZXRlLFxuXHRcdCAqIEB0cmlnZ2VyIGxvYWRfYWxsLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGxvYWRfYWxsIDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcblx0XHRcdGlmKCFvYmopIHsgb2JqID0gJC5qc3RyZWUucm9vdDsgfVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciB0b19sb2FkID0gW10sXG5cdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRjID0gbVtvYmouaWRdLmNoaWxkcmVuX2QsXG5cdFx0XHRcdGksIGo7XG5cdFx0XHRpZihvYmouc3RhdGUgJiYgIW9iai5zdGF0ZS5sb2FkZWQpIHtcblx0XHRcdFx0dG9fbG9hZC5wdXNoKG9iai5pZCk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBjLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZihtW2NbaV1dICYmIG1bY1tpXV0uc3RhdGUgJiYgIW1bY1tpXV0uc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdFx0dG9fbG9hZC5wdXNoKGNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZih0b19sb2FkLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLl9sb2FkX25vZGVzKHRvX2xvYWQsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLmxvYWRfYWxsKG9iaiwgY2FsbGJhY2spO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIGEgbG9hZF9hbGwgY2FsbCBjb21wbGV0ZXNcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIGxvYWRfYWxsLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgcmVjdXJzaXZlbHkgbG9hZGVkIG5vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgb2JqKTsgfVxuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRfYWxsJywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGhhbmRsZXMgdGhlIGFjdHVhbCBsb2FkaW5nIG9mIGEgbm9kZS4gVXNlZCBvbmx5IGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfbG9hZF9ub2RlKG9iaiBbLCBjYWxsYmFja10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIG9uY2UgbG9hZGluZyBpcyBjb21wbGV0ZSwgdGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGluIHRoZSBpbnN0YW5jZSdzIHNjb3BlIGFuZCByZWNlaXZlcyBvbmUgYXJndW1lbnQgLSBhIGJvb2xlYW4gc3RhdHVzXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRfbG9hZF9ub2RlIDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBzID0gdGhpcy5zZXR0aW5ncy5jb3JlLmRhdGEsIHQ7XG5cdFx0XHR2YXIgbm90VGV4dE9yQ29tbWVudE5vZGUgPSBmdW5jdGlvbiBub3RUZXh0T3JDb21tZW50Tm9kZSAoKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm5vZGVUeXBlICE9PSAzICYmIHRoaXMubm9kZVR5cGUgIT09IDg7XG5cdFx0XHR9O1xuXHRcdFx0Ly8gdXNlIG9yaWdpbmFsIEhUTUxcblx0XHRcdGlmKCFzKSB7XG5cdFx0XHRcdGlmKG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgdGhpcy5fZGF0YS5jb3JlLm9yaWdpbmFsX2NvbnRhaW5lcl9odG1sLmNsb25lKHRydWUpLCBmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuX2FwcGVuZF9odG1sX2RhdGEob2JqLCB0aGlzLl9kYXRhLmNvcmUub3JpZ2luYWxfY29udGFpbmVyX2h0bWwuY2xvbmUodHJ1ZSkpIDogZmFsc2UpO1xuXHRcdFx0fVxuXHRcdFx0aWYoJC52YWthdGEuaXNfZnVuY3Rpb24ocykpIHtcblx0XHRcdFx0cmV0dXJuIHMuY2FsbCh0aGlzLCBvYmosIGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0aWYoZCA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXNbdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gJ19hcHBlbmRfaHRtbF9kYXRhJyA6ICdfYXBwZW5kX2pzb25fZGF0YSddKG9iaiwgdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gJCgkLnBhcnNlSFRNTChkKSkuZmlsdGVyKG5vdFRleHRPckNvbW1lbnROb2RlKSA6IGQsIGZ1bmN0aW9uIChzdGF0dXMpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBzdGF0dXMpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHJldHVybiBkID09PSBmYWxzZSA/IGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpIDogY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzW3R5cGVvZiBkID09PSAnc3RyaW5nJyA/ICdfYXBwZW5kX2h0bWxfZGF0YScgOiAnX2FwcGVuZF9qc29uX2RhdGEnXShvYmosIHR5cGVvZiBkID09PSAnc3RyaW5nJyA/ICQoZCkgOiBkKSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0XHRpZih0eXBlb2YgcyA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0aWYocy51cmwpIHtcblx0XHRcdFx0XHRzID0gJC5leHRlbmQodHJ1ZSwge30sIHMpO1xuXHRcdFx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHMudXJsKSkge1xuXHRcdFx0XHRcdFx0cy51cmwgPSBzLnVybC5jYWxsKHRoaXMsIG9iaik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHMuZGF0YSkpIHtcblx0XHRcdFx0XHRcdHMuZGF0YSA9IHMuZGF0YS5jYWxsKHRoaXMsIG9iaik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiAkLmFqYXgocylcblx0XHRcdFx0XHRcdC5kb25lKGZ1bmN0aW9uIChkLHQseCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciB0eXBlID0geC5nZXRSZXNwb25zZUhlYWRlcignQ29udGVudC1UeXBlJyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYoKHR5cGUgJiYgdHlwZS5pbmRleE9mKCdqc29uJykgIT09IC0xKSB8fCB0eXBlb2YgZCA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FwcGVuZF9qc29uX2RhdGEob2JqLCBkLCBmdW5jdGlvbiAoc3RhdHVzKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgc3RhdHVzKTsgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3JldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuX2FwcGVuZF9qc29uX2RhdGEob2JqLCBkKSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKCh0eXBlICYmIHR5cGUuaW5kZXhPZignaHRtbCcpICE9PSAtMSkgfHwgdHlwZW9mIGQgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgJCgkLnBhcnNlSFRNTChkKSkuZmlsdGVyKG5vdFRleHRPckNvbW1lbnROb2RlKSwgZnVuY3Rpb24gKHN0YXR1cykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7IH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly8gcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5fYXBwZW5kX2h0bWxfZGF0YShvYmosICQoZCkpKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnYWpheCcsICdwbHVnaW4nIDogJ2NvcmUnLCAnaWQnIDogJ2NvcmVfMDQnLCAncmVhc29uJyA6ICdDb3VsZCBub3QgbG9hZCBub2RlJywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnaWQnIDogb2JqLmlkLCAneGhyJyA6IHggfSkgfTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0XHQuZmFpbChmdW5jdGlvbiAoZikge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2FqYXgnLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzA0JywgJ3JlYXNvbicgOiAnQ291bGQgbm90IGxvYWQgbm9kZScsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2lkJyA6IG9iai5pZCwgJ3hocicgOiBmIH0pIH07XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICgkLnZha2F0YS5pc19hcnJheShzKSkge1xuXHRcdFx0XHRcdHQgPSAkLmV4dGVuZCh0cnVlLCBbXSwgcyk7XG5cdFx0XHRcdH0gZWxzZSBpZiAoJC5pc1BsYWluT2JqZWN0KHMpKSB7XG5cdFx0XHRcdFx0dCA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0ID0gcztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYXBwZW5kX2pzb25fZGF0YShvYmosIHQsIGZ1bmN0aW9uIChzdGF0dXMpIHtcblx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgc3RhdHVzKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdub2RhdGEnLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzA1JywgJ3JlYXNvbicgOiAnQ291bGQgbm90IGxvYWQgbm9kZScsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2lkJyA6IG9iai5pZCB9KSB9O1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0XHRyZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9yZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCAob2JqLmlkID09PSAkLmpzdHJlZS5yb290ID8gdGhpcy5fYXBwZW5kX2pzb25fZGF0YShvYmosIHQpIDogZmFsc2UpICk7XG5cdFx0XHR9XG5cdFx0XHRpZih0eXBlb2YgcyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0aWYob2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FwcGVuZF9odG1sX2RhdGEob2JqLCAkKCQucGFyc2VIVE1MKHMpKS5maWx0ZXIobm90VGV4dE9yQ29tbWVudE5vZGUpLCBmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnbm9kYXRhJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wNicsICdyZWFzb24nIDogJ0NvdWxkIG5vdCBsb2FkIG5vZGUnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdpZCcgOiBvYmouaWQgfSkgfTtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgKG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuX2FwcGVuZF9odG1sX2RhdGEob2JqLCAkKHMpKSA6IGZhbHNlKSApO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogYWRkcyBhIG5vZGUgdG8gdGhlIGxpc3Qgb2Ygbm9kZXMgdG8gcmVkcmF3LiBVc2VkIG9ubHkgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9ub2RlX2NoYW5nZWQob2JqIFssIGNhbGxiYWNrXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICovXG5cdFx0X25vZGVfY2hhbmdlZCA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcbiAgICAgIGlmIChvYmogJiYgJC5pbkFycmF5KG9iai5pZCwgdGhpcy5fbW9kZWwuY2hhbmdlZCkgPT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmNoYW5nZWQucHVzaChvYmouaWQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogYXBwZW5kcyBIVE1MIGNvbnRlbnQgdG8gdGhlIHRyZWUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgZGF0YSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGFwcGVuZCB0b1xuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gZGF0YSB0aGUgSFRNTCBzdHJpbmcgdG8gcGFyc2UgYW5kIGFwcGVuZFxuXHRcdCAqIEB0cmlnZ2VyIG1vZGVsLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRfYXBwZW5kX2h0bWxfZGF0YSA6IGZ1bmN0aW9uIChkb20sIGRhdGEsIGNiKSB7XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKGRvbSk7XG5cdFx0XHRkb20uY2hpbGRyZW4gPSBbXTtcblx0XHRcdGRvbS5jaGlsZHJlbl9kID0gW107XG5cdFx0XHR2YXIgZGF0ID0gZGF0YS5pcygndWwnKSA/IGRhdGEuY2hpbGRyZW4oKSA6IGRhdGEsXG5cdFx0XHRcdHBhciA9IGRvbS5pZCxcblx0XHRcdFx0Y2hkID0gW10sXG5cdFx0XHRcdGRwYyA9IFtdLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0cCA9IG1bcGFyXSxcblx0XHRcdFx0cyA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGgsXG5cdFx0XHRcdHRtcCwgaSwgajtcblx0XHRcdGRhdC5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuX3BhcnNlX21vZGVsX2Zyb21faHRtbCgkKHYpLCBwYXIsIHAucGFyZW50cy5jb25jYXQoKSk7XG5cdFx0XHRcdGlmKHRtcCkge1xuXHRcdFx0XHRcdGNoZC5wdXNoKHRtcCk7XG5cdFx0XHRcdFx0ZHBjLnB1c2godG1wKTtcblx0XHRcdFx0XHRpZihtW3RtcF0uY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGRwYyA9IGRwYy5jb25jYXQobVt0bXBdLmNoaWxkcmVuX2QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdHAuY2hpbGRyZW4gPSBjaGQ7XG5cdFx0XHRwLmNoaWxkcmVuX2QgPSBkcGM7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBwLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdG1bcC5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gbVtwLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QuY29uY2F0KGRwYyk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIG5ldyBkYXRhIGlzIGluc2VydGVkIHRvIHRoZSB0cmVlIG1vZGVsXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIG1vZGVsLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbm9kZXMgYW4gYXJyYXkgb2Ygbm9kZSBJRHNcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJlbnQgdGhlIHBhcmVudCBJRCBvZiB0aGUgbm9kZXNcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdtb2RlbCcsIHsgXCJub2Rlc1wiIDogZHBjLCAncGFyZW50JyA6IHBhciB9KTtcblx0XHRcdGlmKHBhciAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQocGFyKTtcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5jaGlsZHJlbignLmpzdHJlZS1pbml0aWFsLW5vZGUnKS5yZW1vdmUoKTtcblx0XHRcdFx0dGhpcy5yZWRyYXcodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQubGVuZ3RoICE9PSBzKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlZCcsIHsgJ2FjdGlvbicgOiAnbW9kZWwnLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkIH0pO1xuXHRcdFx0fVxuXHRcdFx0Y2IuY2FsbCh0aGlzLCB0cnVlKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGFwcGVuZHMgSlNPTiBjb250ZW50IHRvIHRoZSB0cmVlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfYXBwZW5kX2pzb25fZGF0YShvYmosIGRhdGEpXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBhcHBlbmQgdG9cblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGRhdGEgdGhlIEpTT04gb2JqZWN0IHRvIHBhcnNlIGFuZCBhcHBlbmRcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBmb3JjZV9wcm9jZXNzaW5nIGludGVybmFsIHBhcmFtIC0gZG8gbm90IHNldFxuXHRcdCAqIEB0cmlnZ2VyIG1vZGVsLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRfYXBwZW5kX2pzb25fZGF0YSA6IGZ1bmN0aW9uIChkb20sIGRhdGEsIGNiLCBmb3JjZV9wcm9jZXNzaW5nKSB7XG5cdFx0XHRpZih0aGlzLmVsZW1lbnQgPT09IG51bGwpIHsgcmV0dXJuOyB9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKGRvbSk7XG5cdFx0XHRkb20uY2hpbGRyZW4gPSBbXTtcblx0XHRcdGRvbS5jaGlsZHJlbl9kID0gW107XG5cdFx0XHQvLyAqJSRAISEhXG5cdFx0XHRpZihkYXRhLmQpIHtcblx0XHRcdFx0ZGF0YSA9IGRhdGEuZDtcblx0XHRcdFx0aWYodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0XHRkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoISQudmFrYXRhLmlzX2FycmF5KGRhdGEpKSB7IGRhdGEgPSBbZGF0YV07IH1cblx0XHRcdHZhciB3ID0gbnVsbCxcblx0XHRcdFx0YXJncyA9IHtcblx0XHRcdFx0XHQnZGYnXHQ6IHRoaXMuX21vZGVsLmRlZmF1bHRfc3RhdGUsXG5cdFx0XHRcdFx0J2RhdCdcdDogZGF0YSxcblx0XHRcdFx0XHQncGFyJ1x0OiBkb20uaWQsXG5cdFx0XHRcdFx0J20nXHRcdDogdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0XHQndF9pZCdcdDogdGhpcy5faWQsXG5cdFx0XHRcdFx0J3RfY250J1x0OiB0aGlzLl9jbnQsXG5cdFx0XHRcdFx0J3NlbCdcdDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGluc3QgPSB0aGlzLFxuXHRcdFx0XHRmdW5jID0gZnVuY3Rpb24gKGRhdGEsIHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGlmKGRhdGEuZGF0YSkgeyBkYXRhID0gZGF0YS5kYXRhOyB9XG5cdFx0XHRcdFx0dmFyIGRhdCA9IGRhdGEuZGF0LFxuXHRcdFx0XHRcdFx0cGFyID0gZGF0YS5wYXIsXG5cdFx0XHRcdFx0XHRjaGQgPSBbXSxcblx0XHRcdFx0XHRcdGRwYyA9IFtdLFxuXHRcdFx0XHRcdFx0YWRkID0gW10sXG5cdFx0XHRcdFx0XHRkZiA9IGRhdGEuZGYsXG5cdFx0XHRcdFx0XHR0X2lkID0gZGF0YS50X2lkLFxuXHRcdFx0XHRcdFx0dF9jbnQgPSBkYXRhLnRfY250LFxuXHRcdFx0XHRcdFx0bSA9IGRhdGEubSxcblx0XHRcdFx0XHRcdHAgPSBtW3Bhcl0sXG5cdFx0XHRcdFx0XHRzZWwgPSBkYXRhLnNlbCxcblx0XHRcdFx0XHRcdHRtcCwgaSwgaiwgcnNsdCxcblx0XHRcdFx0XHRcdHBhcnNlX2ZsYXQgPSBmdW5jdGlvbiAoZCwgcCwgcHMpIHtcblx0XHRcdFx0XHRcdFx0aWYoIXBzKSB7IHBzID0gW107IH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7IHBzID0gcHMuY29uY2F0KCk7IH1cblx0XHRcdFx0XHRcdFx0aWYocCkgeyBwcy51bnNoaWZ0KHApOyB9XG5cdFx0XHRcdFx0XHRcdHZhciB0aWQgPSBkLmlkLnRvU3RyaW5nKCksXG5cdFx0XHRcdFx0XHRcdFx0aSwgaiwgYywgZSxcblx0XHRcdFx0XHRcdFx0XHR0bXAgPSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZFx0XHRcdDogdGlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dFx0XHQ6IGQudGV4dCB8fCAnJyxcblx0XHRcdFx0XHRcdFx0XHRcdGljb25cdFx0OiBkLmljb24gIT09IHVuZGVmaW5lZCA/IGQuaWNvbiA6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJlbnRcdFx0OiBwLFxuXHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50c1x0XHQ6IHBzLFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2hpbGRyZW5cdDogZC5jaGlsZHJlbiB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuX2RcdDogZC5jaGlsZHJlbl9kIHx8IFtdLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZGF0YVx0XHQ6IGQuZGF0YSxcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXRlXHRcdDogeyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0bGlfYXR0clx0XHQ6IHsgaWQgOiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0YV9hdHRyXHRcdDogeyBocmVmIDogJyMnIH0sXG5cdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbFx0OiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGZvcihpIGluIGRmKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoZGYuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGRmW2ldO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuZGF0YSAmJiBkLmRhdGEuanN0cmVlICYmIGQuZGF0YS5qc3RyZWUuaWNvbikge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5pY29uID0gZC5kYXRhLmpzdHJlZS5pY29uO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRtcC5pY29uID09PSB1bmRlZmluZWQgfHwgdG1wLmljb24gPT09IG51bGwgfHwgdG1wLmljb24gPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuaWNvbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuZGF0YSA9IGQuZGF0YTtcblx0XHRcdFx0XHRcdFx0XHRpZihkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGQuZGF0YS5qc3RyZWUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLmRhdGEuanN0cmVlW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuc3RhdGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIGQuc3RhdGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGQuc3RhdGUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZC5zdGF0ZVtpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5saV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBkLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGQubGlfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAubGlfYXR0cltpXSA9IGQubGlfYXR0cltpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoIXRtcC5saV9hdHRyLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmxpX2F0dHIuaWQgPSB0aWQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5hX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIGQuYV9hdHRyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihkLmFfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYV9hdHRyW2ldID0gZC5hX2F0dHJbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC5jaGlsZHJlbiAmJiBkLmNoaWxkcmVuID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gW107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bVt0bXAuaWRdID0gdG1wO1xuXHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0YyA9IHBhcnNlX2ZsYXQobVt0bXAuY2hpbGRyZW5baV1dLCB0bXAuaWQsIHBzKTtcblx0XHRcdFx0XHRcdFx0XHRlID0gbVtjXTtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZC5wdXNoKGMpO1xuXHRcdFx0XHRcdFx0XHRcdGlmKGUuY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gdG1wLmNoaWxkcmVuX2QuY29uY2F0KGUuY2hpbGRyZW5fZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBkLmRhdGE7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBkLmNoaWxkcmVuO1xuXHRcdFx0XHRcdFx0XHRtW3RtcC5pZF0ub3JpZ2luYWwgPSBkO1xuXHRcdFx0XHRcdFx0XHRpZih0bXAuc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRhZGQucHVzaCh0bXAuaWQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0bXAuaWQ7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0cGFyc2VfbmVzdCA9IGZ1bmN0aW9uIChkLCBwLCBwcykge1xuXHRcdFx0XHRcdFx0XHRpZighcHMpIHsgcHMgPSBbXTsgfVxuXHRcdFx0XHRcdFx0XHRlbHNlIHsgcHMgPSBwcy5jb25jYXQoKTsgfVxuXHRcdFx0XHRcdFx0XHRpZihwKSB7IHBzLnVuc2hpZnQocCk7IH1cblx0XHRcdFx0XHRcdFx0dmFyIHRpZCA9IGZhbHNlLCBpLCBqLCBjLCBlLCB0bXA7XG5cdFx0XHRcdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRcdFx0XHR0aWQgPSAnaicgKyB0X2lkICsgJ18nICsgKCsrdF9jbnQpO1xuXHRcdFx0XHRcdFx0XHR9IHdoaWxlKG1bdGlkXSk7XG5cblx0XHRcdFx0XHRcdFx0dG1wID0ge1xuXHRcdFx0XHRcdFx0XHRcdGlkXHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XHR0ZXh0XHRcdDogdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gZCA6ICcnLFxuXHRcdFx0XHRcdFx0XHRcdGljb25cdFx0OiB0eXBlb2YgZCA9PT0gJ29iamVjdCcgJiYgZC5pY29uICE9PSB1bmRlZmluZWQgPyBkLmljb24gOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudFx0XHQ6IHAsXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50c1x0XHQ6IHBzLFxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuXHQ6IFtdLFxuXHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuX2RcdDogW10sXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YVx0XHQ6IG51bGwsXG5cdFx0XHRcdFx0XHRcdFx0c3RhdGVcdFx0OiB7IH0sXG5cdFx0XHRcdFx0XHRcdFx0bGlfYXR0clx0XHQ6IHsgaWQgOiBmYWxzZSB9LFxuXHRcdFx0XHRcdFx0XHRcdGFfYXR0clx0XHQ6IHsgaHJlZiA6ICcjJyB9LFxuXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsXHQ6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRcdGZvcihpIGluIGRmKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoZGYuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGRmW2ldO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuaWQpIHsgdG1wLmlkID0gZC5pZC50b1N0cmluZygpOyB9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC50ZXh0KSB7IHRtcC50ZXh0ID0gZC50ZXh0OyB9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC5kYXRhICYmIGQuZGF0YS5qc3RyZWUgJiYgZC5kYXRhLmpzdHJlZS5pY29uKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmljb24gPSBkLmRhdGEuanN0cmVlLmljb247XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodG1wLmljb24gPT09IHVuZGVmaW5lZCB8fCB0bXAuaWNvbiA9PT0gbnVsbCB8fCB0bXAuaWNvbiA9PT0gXCJcIikge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5pY29uID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5kYXRhID0gZC5kYXRhO1xuXHRcdFx0XHRcdFx0XHRcdGlmKGQuZGF0YS5qc3RyZWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvcihpIGluIGQuZGF0YS5qc3RyZWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoZC5kYXRhLmpzdHJlZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGQuZGF0YS5qc3RyZWVbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5zdGF0ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgaW4gZC5zdGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZC5zdGF0ZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLnN0YXRlW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIHR5cGVvZiBkLmxpX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIGQubGlfYXR0cikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZC5saV9hdHRyLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5saV9hdHRyW2ldID0gZC5saV9hdHRyW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0bXAubGlfYXR0ci5pZCAmJiAhdG1wLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmlkID0gdG1wLmxpX2F0dHIuaWQudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZighdG1wLmlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmlkID0gdGlkO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKCF0bXAubGlfYXR0ci5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5saV9hdHRyLmlkID0gdG1wLmlkO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBkLmFfYXR0cikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZC5hX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmFfYXR0cltpXSA9IGQuYV9hdHRyW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuY2hpbGRyZW4gJiYgZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0YyA9IHBhcnNlX25lc3QoZC5jaGlsZHJlbltpXSwgdG1wLmlkLCBwcyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlID0gbVtjXTtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbi5wdXNoKGMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZS5jaGlsZHJlbl9kLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IHRtcC5jaGlsZHJlbl9kLmNvbmNhdChlLmNoaWxkcmVuX2QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IHRtcC5jaGlsZHJlbl9kLmNvbmNhdCh0bXAuY2hpbGRyZW4pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC5jaGlsZHJlbiAmJiBkLmNoaWxkcmVuID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gW107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGQuZGF0YTtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIGQuY2hpbGRyZW47XG5cdFx0XHRcdFx0XHRcdHRtcC5vcmlnaW5hbCA9IGQ7XG5cdFx0XHRcdFx0XHRcdG1bdG1wLmlkXSA9IHRtcDtcblx0XHRcdFx0XHRcdFx0aWYodG1wLnN0YXRlLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0YWRkLnB1c2godG1wLmlkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdG1wLmlkO1xuXHRcdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdGlmKGRhdC5sZW5ndGggJiYgZGF0WzBdLmlkICE9PSB1bmRlZmluZWQgJiYgZGF0WzBdLnBhcmVudCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBGbGF0IEpTT04gc3VwcG9ydCAoZm9yIGVhc3kgaW1wb3J0IGZyb20gREIpOlxuXHRcdFx0XHRcdFx0Ly8gMSkgY29udmVydCB0byBvYmplY3QgKGZvcmVhY2gpXG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmKCFkYXRbaV0uY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRbaV0uY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZighZGF0W2ldLnN0YXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0W2ldLnN0YXRlID0ge307XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0bVtkYXRbaV0uaWQudG9TdHJpbmcoKV0gPSBkYXRbaV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvLyAyKSBwb3B1bGF0ZSBjaGlsZHJlbiAoZm9yZWFjaClcblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IGRhdC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0aWYgKCFtW2RhdFtpXS5wYXJlbnQudG9TdHJpbmcoKV0pIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGluc3QgIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluc3QuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ3BhcnNlJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wNycsICdyZWFzb24nIDogJ05vZGUgd2l0aCBpbnZhbGlkIHBhcmVudCcsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2lkJyA6IGRhdFtpXS5pZC50b1N0cmluZygpLCAncGFyZW50JyA6IGRhdFtpXS5wYXJlbnQudG9TdHJpbmcoKSB9KSB9O1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5zdC5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwoaW5zdCwgaW5zdC5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdG1bZGF0W2ldLnBhcmVudC50b1N0cmluZygpXS5jaGlsZHJlbi5wdXNoKGRhdFtpXS5pZC50b1N0cmluZygpKTtcblx0XHRcdFx0XHRcdFx0Ly8gcG9wdWxhdGUgcGFyZW50LmNoaWxkcmVuX2Rcblx0XHRcdFx0XHRcdFx0cC5jaGlsZHJlbl9kLnB1c2goZGF0W2ldLmlkLnRvU3RyaW5nKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gMykgbm9ybWFsaXplICYmIHBvcHVsYXRlIHBhcmVudHMgYW5kIGNoaWxkcmVuX2Qgd2l0aCByZWN1cnNpb25cblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHRtcCA9IHBhcnNlX2ZsYXQobVtwLmNoaWxkcmVuW2ldXSwgcGFyLCBwLnBhcmVudHMuY29uY2F0KCkpO1xuXHRcdFx0XHRcdFx0XHRkcGMucHVzaCh0bXApO1xuXHRcdFx0XHRcdFx0XHRpZihtW3RtcF0uY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRkcGMgPSBkcGMuY29uY2F0KG1bdG1wXS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtW3AucGFyZW50c1tpXV0uY2hpbGRyZW5fZCA9IG1bcC5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kLmNvbmNhdChkcGMpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gPykgdGhyZWVfc3RhdGUgc2VsZWN0aW9uIC0gcC5zdGF0ZS5zZWxlY3RlZCAmJiB0IC0gKGlmIHRocmVlX3N0YXRlIGZvcmVhY2goZGF0ID0+IGNoKSAtPiBmb3JlYWNoKHBhcmVudHMpIGlmKHBhcmVudC5zZWxlY3RlZCkgY2hpbGQuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0cnNsdCA9IHtcblx0XHRcdFx0XHRcdFx0J2NudCcgOiB0X2NudCxcblx0XHRcdFx0XHRcdFx0J21vZCcgOiBtLFxuXHRcdFx0XHRcdFx0XHQnc2VsJyA6IHNlbCxcblx0XHRcdFx0XHRcdFx0J3BhcicgOiBwYXIsXG5cdFx0XHRcdFx0XHRcdCdkcGMnIDogZHBjLFxuXHRcdFx0XHRcdFx0XHQnYWRkJyA6IGFkZFxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHRtcCA9IHBhcnNlX25lc3QoZGF0W2ldLCBwYXIsIHAucGFyZW50cy5jb25jYXQoKSk7XG5cdFx0XHRcdFx0XHRcdGlmKHRtcCkge1xuXHRcdFx0XHRcdFx0XHRcdGNoZC5wdXNoKHRtcCk7XG5cdFx0XHRcdFx0XHRcdFx0ZHBjLnB1c2godG1wKTtcblx0XHRcdFx0XHRcdFx0XHRpZihtW3RtcF0uY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRwYyA9IGRwYy5jb25jYXQobVt0bXBdLmNoaWxkcmVuX2QpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cC5jaGlsZHJlbiA9IGNoZDtcblx0XHRcdFx0XHRcdHAuY2hpbGRyZW5fZCA9IGRwYztcblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bVtwLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSBtW3AucGFyZW50c1tpXV0uY2hpbGRyZW5fZC5jb25jYXQoZHBjKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJzbHQgPSB7XG5cdFx0XHRcdFx0XHRcdCdjbnQnIDogdF9jbnQsXG5cdFx0XHRcdFx0XHRcdCdtb2QnIDogbSxcblx0XHRcdFx0XHRcdFx0J3NlbCcgOiBzZWwsXG5cdFx0XHRcdFx0XHRcdCdwYXInIDogcGFyLFxuXHRcdFx0XHRcdFx0XHQnZHBjJyA6IGRwYyxcblx0XHRcdFx0XHRcdFx0J2FkZCcgOiBhZGRcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRwb3N0TWVzc2FnZShyc2x0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcnNsdDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHJzbHQgPSBmdW5jdGlvbiAocnNsdCwgd29ya2VyKSB7XG5cdFx0XHRcdFx0aWYodGhpcy5lbGVtZW50ID09PSBudWxsKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdHRoaXMuX2NudCA9IHJzbHQuY250O1xuXHRcdFx0XHRcdHZhciBpLCBtID0gdGhpcy5fbW9kZWwuZGF0YTtcblx0XHRcdFx0XHRmb3IgKGkgaW4gbSkge1xuXHRcdFx0XHRcdFx0aWYgKG0uaGFzT3duUHJvcGVydHkoaSkgJiYgbVtpXS5zdGF0ZSAmJiBtW2ldLnN0YXRlLmxvYWRpbmcgJiYgcnNsdC5tb2RbaV0pIHtcblx0XHRcdFx0XHRcdFx0cnNsdC5tb2RbaV0uc3RhdGUubG9hZGluZyA9IHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmRhdGEgPSByc2x0Lm1vZDsgLy8gYnJlYWtzIHRoZSByZWZlcmVuY2UgaW4gbG9hZF9ub2RlIC0gY2FyZWZ1bFxuXG5cdFx0XHRcdFx0aWYod29ya2VyKSB7XG5cdFx0XHRcdFx0XHR2YXIgaiwgYSA9IHJzbHQuYWRkLCByID0gcnNsdC5zZWwsIHMgPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuc2xpY2UoKTtcblx0XHRcdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhO1xuXHRcdFx0XHRcdFx0Ly8gaWYgc2VsZWN0aW9uIHdhcyBjaGFuZ2VkIHdoaWxlIGNhbGN1bGF0aW5nIGluIHdvcmtlclxuXHRcdFx0XHRcdFx0aWYoci5sZW5ndGggIT09IHMubGVuZ3RoIHx8ICQudmFrYXRhLmFycmF5X3VuaXF1ZShyLmNvbmNhdChzKSkubGVuZ3RoICE9PSByLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHQvLyBkZXNlbGVjdCBub2RlcyB0aGF0IGFyZSBubyBsb25nZXIgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gci5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZigkLmluQXJyYXkocltpXSwgYSkgPT09IC0xICYmICQuaW5BcnJheShyW2ldLCBzKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1bcltpXV0uc3RhdGUuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Ly8gc2VsZWN0IG5vZGVzIHRoYXQgd2VyZSBzZWxlY3RlZCBpbiB0aGUgbWVhbiB0aW1lXG5cdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJC5pbkFycmF5KHNbaV0sIHIpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0bVtzW2ldXS5zdGF0ZS5zZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHJzbHQuYWRkLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmNvbmNhdChyc2x0LmFkZCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdtb2RlbCcsIHsgXCJub2Rlc1wiIDogcnNsdC5kcGMsICdwYXJlbnQnIDogcnNsdC5wYXIgfSk7XG5cblx0XHRcdFx0XHRpZihyc2x0LnBhciAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbm9kZV9jaGFuZ2VkKHJzbHQucGFyKTtcblx0XHRcdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gdGhpcy5nZXRfY29udGFpbmVyX3VsKCkuY2hpbGRyZW4oJy5qc3RyZWUtaW5pdGlhbC1ub2RlJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlZHJhdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYocnNsdC5hZGQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ21vZGVsJywgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCB9KTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBJZiBubyB3b3JrZXIsIHRyeSB0byBtaW1pYyB3b3JrZXIgYmVoYXZpb291ciwgYnkgaW52b2tpbmcgY2IgYXN5bmNocm9ub3VzbHlcblx0XHRcdFx0XHRpZiAoIXdvcmtlciAmJiBzZXRJbW1lZGlhdGUpIHtcblx0XHRcdFx0XHRcdHNldEltbWVkaWF0ZShmdW5jdGlvbigpe1xuXHRcdFx0XHRcdFx0XHRjYi5jYWxsKGluc3QsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2IuY2FsbChpbnN0LCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUud29ya2VyICYmIHdpbmRvdy5CbG9iICYmIHdpbmRvdy5VUkwgJiYgd2luZG93Lldvcmtlcikge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGlmKHRoaXMuX3dyayA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fd3JrID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoXG5cdFx0XHRcdFx0XHRcdG5ldyB3aW5kb3cuQmxvYihcblx0XHRcdFx0XHRcdFx0XHRbJ3NlbGYub25tZXNzYWdlID0gJyArIGZ1bmMudG9TdHJpbmcoKV0sXG5cdFx0XHRcdFx0XHRcdFx0e3R5cGU6XCJ0ZXh0L2phdmFzY3JpcHRcIn1cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoIXRoaXMuX2RhdGEuY29yZS53b3JraW5nIHx8IGZvcmNlX3Byb2Nlc3NpbmcpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS53b3JraW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHcgPSBuZXcgd2luZG93Lldvcmtlcih0aGlzLl93cmspO1xuXHRcdFx0XHRcdFx0dy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRyc2x0LmNhbGwodGhpcywgZS5kYXRhLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0dHJ5IHsgdy50ZXJtaW5hdGUoKTsgdyA9IG51bGw7IH0gY2F0Y2goaWdub3JlKSB7IH1cblx0XHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLndvcmtlcl9xdWV1ZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9hcHBlbmRfanNvbl9kYXRhLmFwcGx5KHRoaXMsIHRoaXMuX2RhdGEuY29yZS53b3JrZXJfcXVldWUuc2hpZnQoKSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLndvcmtpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdFx0XHRcdFx0aWYoIWFyZ3MucGFyKSB7XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS53b3JrZXJfcXVldWUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fYXBwZW5kX2pzb25fZGF0YS5hcHBseSh0aGlzLCB0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLnNoaWZ0KCkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS53b3JraW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR3LnBvc3RNZXNzYWdlKGFyZ3MpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS53b3JrZXJfcXVldWUucHVzaChbZG9tLCBkYXRhLCBjYiwgdHJ1ZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChlKSB7XG5cdFx0XHRcdFx0cnNsdC5jYWxsKHRoaXMsIGZ1bmMoYXJncyksIGZhbHNlKTtcblx0XHRcdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fYXBwZW5kX2pzb25fZGF0YS5hcHBseSh0aGlzLCB0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLnNoaWZ0KCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS53b3JraW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0cnNsdC5jYWxsKHRoaXMsIGZ1bmMoYXJncyksIGZhbHNlKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHBhcnNlcyBhIG5vZGUgZnJvbSBhIGpRdWVyeSBvYmplY3QgYW5kIGFwcGVuZHMgdGhlbSB0byB0aGUgaW4gbWVtb3J5IHRyZWUgbW9kZWwuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9wYXJzZV9tb2RlbF9mcm9tX2h0bWwoZCBbLCBwLCBwc10pXG5cdFx0ICogQHBhcmFtICB7alF1ZXJ5fSBkIHRoZSBqUXVlcnkgb2JqZWN0IHRvIHBhcnNlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBwIHRoZSBwYXJlbnQgSURcblx0XHQgKiBAcGFyYW0gIHtBcnJheX0gcHMgbGlzdCBvZiBhbGwgcGFyZW50c1xuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gdGhlIElEIG9mIHRoZSBvYmplY3QgYWRkZWQgdG8gdGhlIG1vZGVsXG5cdFx0ICovXG5cdFx0X3BhcnNlX21vZGVsX2Zyb21faHRtbCA6IGZ1bmN0aW9uIChkLCBwLCBwcykge1xuXHRcdFx0aWYoIXBzKSB7IHBzID0gW107IH1cblx0XHRcdGVsc2UgeyBwcyA9IFtdLmNvbmNhdChwcyk7IH1cblx0XHRcdGlmKHApIHsgcHMudW5zaGlmdChwKTsgfVxuXHRcdFx0dmFyIGMsIGUsIG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRkYXRhID0ge1xuXHRcdFx0XHRcdGlkXHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHR0ZXh0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0aWNvblx0XHQ6IHRydWUsXG5cdFx0XHRcdFx0cGFyZW50XHRcdDogcCxcblx0XHRcdFx0XHRwYXJlbnRzXHRcdDogcHMsXG5cdFx0XHRcdFx0Y2hpbGRyZW5cdDogW10sXG5cdFx0XHRcdFx0Y2hpbGRyZW5fZFx0OiBbXSxcblx0XHRcdFx0XHRkYXRhXHRcdDogbnVsbCxcblx0XHRcdFx0XHRzdGF0ZVx0XHQ6IHsgfSxcblx0XHRcdFx0XHRsaV9hdHRyXHRcdDogeyBpZCA6IGZhbHNlIH0sXG5cdFx0XHRcdFx0YV9hdHRyXHRcdDogeyBocmVmIDogJyMnIH0sXG5cdFx0XHRcdFx0b3JpZ2luYWxcdDogZmFsc2Vcblx0XHRcdFx0fSwgaSwgdG1wLCB0aWQ7XG5cdFx0XHRmb3IoaSBpbiB0aGlzLl9tb2RlbC5kZWZhdWx0X3N0YXRlKSB7XG5cdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRlZmF1bHRfc3RhdGUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRkYXRhLnN0YXRlW2ldID0gdGhpcy5fbW9kZWwuZGVmYXVsdF9zdGF0ZVtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gJC52YWthdGEuYXR0cmlidXRlcyhkLCB0cnVlKTtcblx0XHRcdCQuZWFjaCh0bXAsIGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdHYgPSAkLnZha2F0YS50cmltKHYpO1xuXHRcdFx0XHRpZighdi5sZW5ndGgpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0ZGF0YS5saV9hdHRyW2ldID0gdjtcblx0XHRcdFx0aWYoaSA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdGRhdGEuaWQgPSB2LnRvU3RyaW5nKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0dG1wID0gZC5jaGlsZHJlbignYScpLmZpcnN0KCk7XG5cdFx0XHRpZih0bXAubGVuZ3RoKSB7XG5cdFx0XHRcdHRtcCA9ICQudmFrYXRhLmF0dHJpYnV0ZXModG1wLCB0cnVlKTtcblx0XHRcdFx0JC5lYWNoKHRtcCwgZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0XHR2ID0gJC52YWthdGEudHJpbSh2KTtcblx0XHRcdFx0XHRpZih2Lmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0ZGF0YS5hX2F0dHJbaV0gPSB2O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBkLmNoaWxkcmVuKFwiYVwiKS5maXJzdCgpLmxlbmd0aCA/IGQuY2hpbGRyZW4oXCJhXCIpLmZpcnN0KCkuY2xvbmUoKSA6IGQuY2xvbmUoKTtcblx0XHRcdHRtcC5jaGlsZHJlbihcImlucywgaSwgdWxcIikucmVtb3ZlKCk7XG5cdFx0XHR0bXAgPSB0bXAuaHRtbCgpO1xuXHRcdFx0dG1wID0gJCgnPGRpdj48L2Rpdj4nKS5odG1sKHRtcCk7XG5cdFx0XHRkYXRhLnRleHQgPSB0aGlzLnNldHRpbmdzLmNvcmUuZm9yY2VfdGV4dCA/IHRtcC50ZXh0KCkgOiB0bXAuaHRtbCgpO1xuXHRcdFx0dG1wID0gZC5kYXRhKCk7XG5cdFx0XHRkYXRhLmRhdGEgPSB0bXAgPyAkLmV4dGVuZCh0cnVlLCB7fSwgdG1wKSA6IG51bGw7XG5cdFx0XHRkYXRhLnN0YXRlLm9wZW5lZCA9IGQuaGFzQ2xhc3MoJ2pzdHJlZS1vcGVuJyk7XG5cdFx0XHRkYXRhLnN0YXRlLnNlbGVjdGVkID0gZC5jaGlsZHJlbignYScpLmhhc0NsYXNzKCdqc3RyZWUtY2xpY2tlZCcpO1xuXHRcdFx0ZGF0YS5zdGF0ZS5kaXNhYmxlZCA9IGQuY2hpbGRyZW4oJ2EnKS5oYXNDbGFzcygnanN0cmVlLWRpc2FibGVkJyk7XG5cdFx0XHRpZihkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRmb3IoaSBpbiBkYXRhLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0aWYoZGF0YS5kYXRhLmpzdHJlZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0ZGF0YS5zdGF0ZVtpXSA9IGRhdGEuZGF0YS5qc3RyZWVbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBkLmNoaWxkcmVuKFwiYVwiKS5jaGlsZHJlbihcIi5qc3RyZWUtdGhlbWVpY29uXCIpO1xuXHRcdFx0aWYodG1wLmxlbmd0aCkge1xuXHRcdFx0XHRkYXRhLmljb24gPSB0bXAuaGFzQ2xhc3MoJ2pzdHJlZS10aGVtZWljb24taGlkZGVuJykgPyBmYWxzZSA6IHRtcC5hdHRyKCdyZWwnKTtcblx0XHRcdH1cblx0XHRcdGlmKGRhdGEuc3RhdGUuaWNvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGRhdGEuaWNvbiA9IGRhdGEuc3RhdGUuaWNvbjtcblx0XHRcdH1cblx0XHRcdGlmKGRhdGEuaWNvbiA9PT0gdW5kZWZpbmVkIHx8IGRhdGEuaWNvbiA9PT0gbnVsbCB8fCBkYXRhLmljb24gPT09IFwiXCIpIHtcblx0XHRcdFx0ZGF0YS5pY29uID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHRtcCA9IGQuY2hpbGRyZW4oXCJ1bFwiKS5jaGlsZHJlbihcImxpXCIpO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR0aWQgPSAnaicgKyB0aGlzLl9pZCArICdfJyArICgrK3RoaXMuX2NudCk7XG5cdFx0XHR9IHdoaWxlKG1bdGlkXSk7XG5cdFx0XHRkYXRhLmlkID0gZGF0YS5saV9hdHRyLmlkID8gZGF0YS5saV9hdHRyLmlkLnRvU3RyaW5nKCkgOiB0aWQ7XG5cdFx0XHRpZih0bXAubGVuZ3RoKSB7XG5cdFx0XHRcdHRtcC5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0YyA9IHRoaXMuX3BhcnNlX21vZGVsX2Zyb21faHRtbCgkKHYpLCBkYXRhLmlkLCBwcyk7XG5cdFx0XHRcdFx0ZSA9IHRoaXMuX21vZGVsLmRhdGFbY107XG5cdFx0XHRcdFx0ZGF0YS5jaGlsZHJlbi5wdXNoKGMpO1xuXHRcdFx0XHRcdGlmKGUuY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGRhdGEuY2hpbGRyZW5fZCA9IGRhdGEuY2hpbGRyZW5fZC5jb25jYXQoZS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdGRhdGEuY2hpbGRyZW5fZCA9IGRhdGEuY2hpbGRyZW5fZC5jb25jYXQoZGF0YS5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYoZC5oYXNDbGFzcygnanN0cmVlLWNsb3NlZCcpKSB7XG5cdFx0XHRcdFx0ZGF0YS5zdGF0ZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZGF0YS5saV9hdHRyWydjbGFzcyddKSB7XG5cdFx0XHRcdGRhdGEubGlfYXR0clsnY2xhc3MnXSA9IGRhdGEubGlfYXR0clsnY2xhc3MnXS5yZXBsYWNlKCdqc3RyZWUtY2xvc2VkJywnJykucmVwbGFjZSgnanN0cmVlLW9wZW4nLCcnKTtcblx0XHRcdH1cblx0XHRcdGlmKGRhdGEuYV9hdHRyWydjbGFzcyddKSB7XG5cdFx0XHRcdGRhdGEuYV9hdHRyWydjbGFzcyddID0gZGF0YS5hX2F0dHJbJ2NsYXNzJ10ucmVwbGFjZSgnanN0cmVlLWNsaWNrZWQnLCcnKS5yZXBsYWNlKCdqc3RyZWUtZGlzYWJsZWQnLCcnKTtcblx0XHRcdH1cblx0XHRcdG1bZGF0YS5pZF0gPSBkYXRhO1xuXHRcdFx0aWYoZGF0YS5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQucHVzaChkYXRhLmlkKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkYXRhLmlkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcGFyc2VzIGEgbm9kZSBmcm9tIGEgSlNPTiBvYmplY3QgKHVzZWQgd2hlbiBkZWFsaW5nIHdpdGggZmxhdCBkYXRhLCB3aGljaCBoYXMgbm8gbmVzdGluZyBvZiBjaGlsZHJlbiwgYnV0IGhhcyBpZCBhbmQgcGFyZW50IHByb3BlcnRpZXMpIGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBpbiBtZW1vcnkgdHJlZSBtb2RlbC4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX3BhcnNlX21vZGVsX2Zyb21fZmxhdF9qc29uKGQgWywgcCwgcHNdKVxuXHRcdCAqIEBwYXJhbSAge09iamVjdH0gZCB0aGUgSlNPTiBvYmplY3QgdG8gcGFyc2Vcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IHAgdGhlIHBhcmVudCBJRFxuXHRcdCAqIEBwYXJhbSAge0FycmF5fSBwcyBsaXN0IG9mIGFsbCBwYXJlbnRzXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSB0aGUgSUQgb2YgdGhlIG9iamVjdCBhZGRlZCB0byB0aGUgbW9kZWxcblx0XHQgKi9cblx0XHRfcGFyc2VfbW9kZWxfZnJvbV9mbGF0X2pzb24gOiBmdW5jdGlvbiAoZCwgcCwgcHMpIHtcblx0XHRcdGlmKCFwcykgeyBwcyA9IFtdOyB9XG5cdFx0XHRlbHNlIHsgcHMgPSBwcy5jb25jYXQoKTsgfVxuXHRcdFx0aWYocCkgeyBwcy51bnNoaWZ0KHApOyB9XG5cdFx0XHR2YXIgdGlkID0gZC5pZC50b1N0cmluZygpLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0ZGYgPSB0aGlzLl9tb2RlbC5kZWZhdWx0X3N0YXRlLFxuXHRcdFx0XHRpLCBqLCBjLCBlLFxuXHRcdFx0XHR0bXAgPSB7XG5cdFx0XHRcdFx0aWRcdFx0XHQ6IHRpZCxcblx0XHRcdFx0XHR0ZXh0XHRcdDogZC50ZXh0IHx8ICcnLFxuXHRcdFx0XHRcdGljb25cdFx0OiBkLmljb24gIT09IHVuZGVmaW5lZCA/IGQuaWNvbiA6IHRydWUsXG5cdFx0XHRcdFx0cGFyZW50XHRcdDogcCxcblx0XHRcdFx0XHRwYXJlbnRzXHRcdDogcHMsXG5cdFx0XHRcdFx0Y2hpbGRyZW5cdDogZC5jaGlsZHJlbiB8fCBbXSxcblx0XHRcdFx0XHRjaGlsZHJlbl9kXHQ6IGQuY2hpbGRyZW5fZCB8fCBbXSxcblx0XHRcdFx0XHRkYXRhXHRcdDogZC5kYXRhLFxuXHRcdFx0XHRcdHN0YXRlXHRcdDogeyB9LFxuXHRcdFx0XHRcdGxpX2F0dHJcdFx0OiB7IGlkIDogZmFsc2UgfSxcblx0XHRcdFx0XHRhX2F0dHJcdFx0OiB7IGhyZWYgOiAnIycgfSxcblx0XHRcdFx0XHRvcmlnaW5hbFx0OiBmYWxzZVxuXHRcdFx0XHR9O1xuXHRcdFx0Zm9yKGkgaW4gZGYpIHtcblx0XHRcdFx0aWYoZGYuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkZltpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiBkLmRhdGEgJiYgZC5kYXRhLmpzdHJlZSAmJiBkLmRhdGEuanN0cmVlLmljb24pIHtcblx0XHRcdFx0dG1wLmljb24gPSBkLmRhdGEuanN0cmVlLmljb247XG5cdFx0XHR9XG5cdFx0XHRpZih0bXAuaWNvbiA9PT0gdW5kZWZpbmVkIHx8IHRtcC5pY29uID09PSBudWxsIHx8IHRtcC5pY29uID09PSBcIlwiKSB7XG5cdFx0XHRcdHRtcC5pY29uID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5kYXRhKSB7XG5cdFx0XHRcdHRtcC5kYXRhID0gZC5kYXRhO1xuXHRcdFx0XHRpZihkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0Zm9yKGkgaW4gZC5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdFx0aWYoZC5kYXRhLmpzdHJlZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLmRhdGEuanN0cmVlW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5zdGF0ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChpIGluIGQuc3RhdGUpIHtcblx0XHRcdFx0XHRpZihkLnN0YXRlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLnN0YXRlW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5saV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGkgaW4gZC5saV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYoZC5saV9hdHRyLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAubGlfYXR0cltpXSA9IGQubGlfYXR0cltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCF0bXAubGlfYXR0ci5pZCkge1xuXHRcdFx0XHR0bXAubGlfYXR0ci5pZCA9IHRpZDtcblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGkgaW4gZC5hX2F0dHIpIHtcblx0XHRcdFx0XHRpZihkLmFfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0dG1wLmFfYXR0cltpXSA9IGQuYV9hdHRyW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiBkLmNoaWxkcmVuICYmIGQuY2hpbGRyZW4gPT09IHRydWUpIHtcblx0XHRcdFx0dG1wLnN0YXRlLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0XHR0bXAuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSBbXTtcblx0XHRcdH1cblx0XHRcdG1bdG1wLmlkXSA9IHRtcDtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0YyA9IHRoaXMuX3BhcnNlX21vZGVsX2Zyb21fZmxhdF9qc29uKG1bdG1wLmNoaWxkcmVuW2ldXSwgdG1wLmlkLCBwcyk7XG5cdFx0XHRcdGUgPSBtW2NdO1xuXHRcdFx0XHR0bXAuY2hpbGRyZW5fZC5wdXNoKGMpO1xuXHRcdFx0XHRpZihlLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSB0bXAuY2hpbGRyZW5fZC5jb25jYXQoZS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIGQuZGF0YTtcblx0XHRcdGRlbGV0ZSBkLmNoaWxkcmVuO1xuXHRcdFx0bVt0bXAuaWRdLm9yaWdpbmFsID0gZDtcblx0XHRcdGlmKHRtcC5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQucHVzaCh0bXAuaWQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRtcC5pZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHBhcnNlcyBhIG5vZGUgZnJvbSBhIEpTT04gb2JqZWN0IGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBpbiBtZW1vcnkgdHJlZSBtb2RlbC4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX3BhcnNlX21vZGVsX2Zyb21fanNvbihkIFssIHAsIHBzXSlcblx0XHQgKiBAcGFyYW0gIHtPYmplY3R9IGQgdGhlIEpTT04gb2JqZWN0IHRvIHBhcnNlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBwIHRoZSBwYXJlbnQgSURcblx0XHQgKiBAcGFyYW0gIHtBcnJheX0gcHMgbGlzdCBvZiBhbGwgcGFyZW50c1xuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gdGhlIElEIG9mIHRoZSBvYmplY3QgYWRkZWQgdG8gdGhlIG1vZGVsXG5cdFx0ICovXG5cdFx0X3BhcnNlX21vZGVsX2Zyb21fanNvbiA6IGZ1bmN0aW9uIChkLCBwLCBwcykge1xuXHRcdFx0aWYoIXBzKSB7IHBzID0gW107IH1cblx0XHRcdGVsc2UgeyBwcyA9IHBzLmNvbmNhdCgpOyB9XG5cdFx0XHRpZihwKSB7IHBzLnVuc2hpZnQocCk7IH1cblx0XHRcdHZhciB0aWQgPSBmYWxzZSwgaSwgaiwgYywgZSwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIGRmID0gdGhpcy5fbW9kZWwuZGVmYXVsdF9zdGF0ZSwgdG1wO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR0aWQgPSAnaicgKyB0aGlzLl9pZCArICdfJyArICgrK3RoaXMuX2NudCk7XG5cdFx0XHR9IHdoaWxlKG1bdGlkXSk7XG5cblx0XHRcdHRtcCA9IHtcblx0XHRcdFx0aWRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHR0ZXh0XHRcdDogdHlwZW9mIGQgPT09ICdzdHJpbmcnID8gZCA6ICcnLFxuXHRcdFx0XHRpY29uXHRcdDogdHlwZW9mIGQgPT09ICdvYmplY3QnICYmIGQuaWNvbiAhPT0gdW5kZWZpbmVkID8gZC5pY29uIDogdHJ1ZSxcblx0XHRcdFx0cGFyZW50XHRcdDogcCxcblx0XHRcdFx0cGFyZW50c1x0XHQ6IHBzLFxuXHRcdFx0XHRjaGlsZHJlblx0OiBbXSxcblx0XHRcdFx0Y2hpbGRyZW5fZFx0OiBbXSxcblx0XHRcdFx0ZGF0YVx0XHQ6IG51bGwsXG5cdFx0XHRcdHN0YXRlXHRcdDogeyB9LFxuXHRcdFx0XHRsaV9hdHRyXHRcdDogeyBpZCA6IGZhbHNlIH0sXG5cdFx0XHRcdGFfYXR0clx0XHQ6IHsgaHJlZiA6ICcjJyB9LFxuXHRcdFx0XHRvcmlnaW5hbFx0OiBmYWxzZVxuXHRcdFx0fTtcblx0XHRcdGZvcihpIGluIGRmKSB7XG5cdFx0XHRcdGlmKGRmLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZGZbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5pZCkgeyB0bXAuaWQgPSBkLmlkLnRvU3RyaW5nKCk7IH1cblx0XHRcdGlmKGQgJiYgZC50ZXh0KSB7IHRtcC50ZXh0ID0gZC50ZXh0OyB9XG5cdFx0XHRpZihkICYmIGQuZGF0YSAmJiBkLmRhdGEuanN0cmVlICYmIGQuZGF0YS5qc3RyZWUuaWNvbikge1xuXHRcdFx0XHR0bXAuaWNvbiA9IGQuZGF0YS5qc3RyZWUuaWNvbjtcblx0XHRcdH1cblx0XHRcdGlmKHRtcC5pY29uID09PSB1bmRlZmluZWQgfHwgdG1wLmljb24gPT09IG51bGwgfHwgdG1wLmljb24gPT09IFwiXCIpIHtcblx0XHRcdFx0dG1wLmljb24gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiBkLmRhdGEpIHtcblx0XHRcdFx0dG1wLmRhdGEgPSBkLmRhdGE7XG5cdFx0XHRcdGlmKGQuZGF0YS5qc3RyZWUpIHtcblx0XHRcdFx0XHRmb3IoaSBpbiBkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0XHRpZihkLmRhdGEuanN0cmVlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGQuZGF0YS5qc3RyZWVbaV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIHR5cGVvZiBkLnN0YXRlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGkgaW4gZC5zdGF0ZSkge1xuXHRcdFx0XHRcdGlmKGQuc3RhdGUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGQuc3RhdGVbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIHR5cGVvZiBkLmxpX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBkLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRpZihkLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdHRtcC5saV9hdHRyW2ldID0gZC5saV9hdHRyW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYodG1wLmxpX2F0dHIuaWQgJiYgIXRtcC5pZCkge1xuXHRcdFx0XHR0bXAuaWQgPSB0bXAubGlfYXR0ci5pZC50b1N0cmluZygpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXRtcC5pZCkge1xuXHRcdFx0XHR0bXAuaWQgPSB0aWQ7XG5cdFx0XHR9XG5cdFx0XHRpZighdG1wLmxpX2F0dHIuaWQpIHtcblx0XHRcdFx0dG1wLmxpX2F0dHIuaWQgPSB0bXAuaWQ7XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIHR5cGVvZiBkLmFfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChpIGluIGQuYV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYoZC5hX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdHRtcC5hX2F0dHJbaV0gPSBkLmFfYXR0cltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5jaGlsZHJlbiAmJiBkLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGMgPSB0aGlzLl9wYXJzZV9tb2RlbF9mcm9tX2pzb24oZC5jaGlsZHJlbltpXSwgdG1wLmlkLCBwcyk7XG5cdFx0XHRcdFx0ZSA9IG1bY107XG5cdFx0XHRcdFx0dG1wLmNoaWxkcmVuLnB1c2goYyk7XG5cdFx0XHRcdFx0aWYoZS5jaGlsZHJlbl9kLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSB0bXAuY2hpbGRyZW5fZC5jb25jYXQoZS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSB0bXAuY2hpbGRyZW4uY29uY2F0KHRtcC5jaGlsZHJlbl9kKTtcblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5jaGlsZHJlbiAmJiBkLmNoaWxkcmVuID09PSB0cnVlKSB7XG5cdFx0XHRcdHRtcC5zdGF0ZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0dG1wLmNoaWxkcmVuID0gW107XG5cdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gW107XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgZC5kYXRhO1xuXHRcdFx0ZGVsZXRlIGQuY2hpbGRyZW47XG5cdFx0XHR0bXAub3JpZ2luYWwgPSBkO1xuXHRcdFx0bVt0bXAuaWRdID0gdG1wO1xuXHRcdFx0aWYodG1wLnN0YXRlLnNlbGVjdGVkKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5wdXNoKHRtcC5pZCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG1wLmlkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVkcmF3cyBhbGwgbm9kZXMgdGhhdCBuZWVkIHRvIGJlIHJlZHJhd24uIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9yZWRyYXcoKVxuXHRcdCAqIEB0cmlnZ2VyIHJlZHJhdy5qc3RyZWVcblx0XHQgKi9cblx0XHRfcmVkcmF3IDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIG5vZGVzID0gdGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcgPyB0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdLmNoaWxkcmVuLmNvbmNhdChbXSkgOiB0aGlzLl9tb2RlbC5jaGFuZ2VkLmNvbmNhdChbXSksXG5cdFx0XHRcdGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdVTCcpLCB0bXAsIGksIGosIGZlID0gdGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQ7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBub2Rlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0dG1wID0gdGhpcy5yZWRyYXdfbm9kZShub2Rlc1tpXSwgdHJ1ZSwgdGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcpO1xuXHRcdFx0XHRpZih0bXAgJiYgdGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcpIHtcblx0XHRcdFx0XHRmLmFwcGVuZENoaWxkKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3KSB7XG5cdFx0XHRcdGYuY2xhc3NOYW1lID0gdGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0uY2xhc3NOYW1lO1xuXHRcdFx0XHRmLnNldEF0dHJpYnV0ZSgncm9sZScsJ2dyb3VwJyk7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5lbXB0eSgpLmFwcGVuZChmKTtcblx0XHRcdFx0Ly90aGlzLmdldF9jb250YWluZXJfdWwoKVswXS5hcHBlbmRDaGlsZChmKTtcblx0XHRcdH1cblx0XHRcdGlmKGZlICE9PSBudWxsICYmIHRoaXMuc2V0dGluZ3MuY29yZS5yZXN0b3JlX2ZvY3VzKSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUoZmUsIHRydWUpO1xuXHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCAmJiB0bXAuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJylbMF0gIT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHRcdFx0XHR0bXAuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3ID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9tb2RlbC5jaGFuZ2VkID0gW107XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciBub2RlcyBhcmUgcmVkcmF3blxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSByZWRyYXcuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge2FycmF5fSBub2RlcyB0aGUgcmVkcmF3biBub2Rlc1xuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlZHJhdycsIHsgXCJub2Rlc1wiIDogbm9kZXMgfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZWRyYXdzIGFsbCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgcmVkcmF3biBvciBvcHRpb25hbGx5IC0gdGhlIHdob2xlIHRyZWVcblx0XHQgKiBAbmFtZSByZWRyYXcoW2Z1bGxdKVxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZnVsbCBpZiBzZXQgdG8gYHRydWVgIGFsbCBub2RlcyBhcmUgcmVkcmF3bi5cblx0XHQgKi9cblx0XHRyZWRyYXcgOiBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0aWYoZnVsbCkge1xuXHRcdFx0XHR0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHQvL2lmKHRoaXMuX21vZGVsLnJlZHJhd190aW1lb3V0KSB7XG5cdFx0XHQvL1x0Y2xlYXJUaW1lb3V0KHRoaXMuX21vZGVsLnJlZHJhd190aW1lb3V0KTtcblx0XHRcdC8vfVxuXHRcdFx0Ly90aGlzLl9tb2RlbC5yZWRyYXdfdGltZW91dCA9IHNldFRpbWVvdXQoJC5wcm94eSh0aGlzLl9yZWRyYXcsIHRoaXMpLDApO1xuXHRcdFx0dGhpcy5fcmVkcmF3KCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZWRyYXdzIGEgc2luZ2xlIG5vZGUncyBjaGlsZHJlbi4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgZHJhd19jaGlsZHJlbihub2RlKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG5vZGUgdGhlIG5vZGUgd2hvc2UgY2hpbGRyZW4gd2lsbCBiZSByZWRyYXduXG5cdFx0ICovXG5cdFx0ZHJhd19jaGlsZHJlbiA6IGZ1bmN0aW9uIChub2RlKSB7XG5cdFx0XHR2YXIgb2JqID0gdGhpcy5nZXRfbm9kZShub2RlKSxcblx0XHRcdFx0aSA9IGZhbHNlLFxuXHRcdFx0XHRqID0gZmFsc2UsXG5cdFx0XHRcdGsgPSBmYWxzZSxcblx0XHRcdFx0ZCA9IGRvY3VtZW50O1xuXHRcdFx0aWYoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gdGhpcy5yZWRyYXcodHJ1ZSk7IH1cblx0XHRcdG5vZGUgPSB0aGlzLmdldF9ub2RlKG5vZGUsIHRydWUpO1xuXHRcdFx0aWYoIW5vZGUgfHwgIW5vZGUubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfSAvLyBUT0RPOiBxdWljayB0b2dnbGVcblxuXHRcdFx0bm9kZS5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpLnJlbW92ZSgpO1xuXHRcdFx0bm9kZSA9IG5vZGVbMF07XG5cdFx0XHRpZihvYmouY2hpbGRyZW4ubGVuZ3RoICYmIG9iai5zdGF0ZS5sb2FkZWQpIHtcblx0XHRcdFx0ayA9IGQuY3JlYXRlRWxlbWVudCgnVUwnKTtcblx0XHRcdFx0ay5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZ3JvdXAnKTtcblx0XHRcdFx0ay5jbGFzc05hbWUgPSAnanN0cmVlLWNoaWxkcmVuJztcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGsuYXBwZW5kQ2hpbGQodGhpcy5yZWRyYXdfbm9kZShvYmouY2hpbGRyZW5baV0sIHRydWUsIHRydWUpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRub2RlLmFwcGVuZENoaWxkKGspO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVkcmF3cyBhIHNpbmdsZSBub2RlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSByZWRyYXdfbm9kZShub2RlLCBkZWVwLCBpc19jYWxsYmFjaywgZm9yY2VfcmVuZGVyKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG5vZGUgdGhlIG5vZGUgdG8gcmVkcmF3XG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBkZWVwIHNob3VsZCBjaGlsZCBub2RlcyBiZSByZWRyYXduIHRvb1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNfY2FsbGJhY2sgaXMgdGhpcyBhIHJlY3Vyc2lvbiBjYWxsXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBmb3JjZV9yZW5kZXIgc2hvdWxkIGNoaWxkcmVuIG9mIGNsb3NlZCBwYXJlbnRzIGJlIGRyYXduIGFueXdheVxuXHRcdCAqL1xuXHRcdHJlZHJhd19ub2RlIDogZnVuY3Rpb24gKG5vZGUsIGRlZXAsIGlzX2NhbGxiYWNrLCBmb3JjZV9yZW5kZXIpIHtcblx0XHRcdHZhciBvYmogPSB0aGlzLmdldF9ub2RlKG5vZGUpLFxuXHRcdFx0XHRwYXIgPSBmYWxzZSxcblx0XHRcdFx0aW5kID0gZmFsc2UsXG5cdFx0XHRcdG9sZCA9IGZhbHNlLFxuXHRcdFx0XHRpID0gZmFsc2UsXG5cdFx0XHRcdGogPSBmYWxzZSxcblx0XHRcdFx0ayA9IGZhbHNlLFxuXHRcdFx0XHRjID0gJycsXG5cdFx0XHRcdGQgPSBkb2N1bWVudCxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdGYgPSBmYWxzZSxcblx0XHRcdFx0cyA9IGZhbHNlLFxuXHRcdFx0XHR0bXAgPSBudWxsLFxuXHRcdFx0XHR0ID0gMCxcblx0XHRcdFx0bCA9IDAsXG5cdFx0XHRcdGhhc19jaGlsZHJlbiA9IGZhbHNlLFxuXHRcdFx0XHRsYXN0X3NpYmxpbmcgPSBmYWxzZTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZihvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgIHJldHVybiB0aGlzLnJlZHJhdyh0cnVlKTsgfVxuXHRcdFx0ZGVlcCA9IGRlZXAgfHwgb2JqLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcblx0XHRcdG5vZGUgPSAhZG9jdW1lbnQucXVlcnlTZWxlY3RvciA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9iai5pZCkgOiB0aGlzLmVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvcignIycgKyAoXCIwMTIzNDU2Nzg5XCIuaW5kZXhPZihvYmouaWRbMF0pICE9PSAtMSA/ICdcXFxcMycgKyBvYmouaWRbMF0gKyAnICcgKyBvYmouaWQuc3Vic3RyKDEpLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykgOiBvYmouaWQucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSkgKTsgLy8sIHRoaXMuZWxlbWVudCk7XG5cdFx0XHRpZighbm9kZSkge1xuXHRcdFx0XHRkZWVwID0gdHJ1ZTtcblx0XHRcdFx0Ly9ub2RlID0gZC5jcmVhdGVFbGVtZW50KCdMSScpO1xuXHRcdFx0XHRpZighaXNfY2FsbGJhY2spIHtcblx0XHRcdFx0XHRwYXIgPSBvYmoucGFyZW50ICE9PSAkLmpzdHJlZS5yb290ID8gJCgnIycgKyBvYmoucGFyZW50LnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyksIHRoaXMuZWxlbWVudClbMF0gOiBudWxsO1xuXHRcdFx0XHRcdGlmKHBhciAhPT0gbnVsbCAmJiAoIXBhciB8fCAhbVtvYmoucGFyZW50XS5zdGF0ZS5vcGVuZWQpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGluZCA9ICQuaW5BcnJheShvYmouaWQsIHBhciA9PT0gbnVsbCA/IG1bJC5qc3RyZWUucm9vdF0uY2hpbGRyZW4gOiBtW29iai5wYXJlbnRdLmNoaWxkcmVuKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG5vZGUgPSAkKG5vZGUpO1xuXHRcdFx0XHRpZighaXNfY2FsbGJhY2spIHtcblx0XHRcdFx0XHRwYXIgPSBub2RlLnBhcmVudCgpLnBhcmVudCgpWzBdO1xuXHRcdFx0XHRcdGlmKHBhciA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG5cdFx0XHRcdFx0XHRwYXIgPSBudWxsO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbmQgPSBub2RlLmluZGV4KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gbVtvYmouaWRdLmRhdGEgPSBub2RlLmRhdGEoKTsgLy8gdXNlIG9ubHkgbm9kZSdzIGRhdGEsIG5vIG5lZWQgdG8gdG91Y2gganF1ZXJ5IHN0b3JhZ2Vcblx0XHRcdFx0aWYoIWRlZXAgJiYgb2JqLmNoaWxkcmVuLmxlbmd0aCAmJiAhbm9kZS5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRlZXAgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFkZWVwKSB7XG5cdFx0XHRcdFx0b2xkID0gbm9kZS5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGYgPSBub2RlLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpWzBdID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXHRcdFx0XHRub2RlLnJlbW92ZSgpO1xuXHRcdFx0XHQvL25vZGUgPSBkLmNyZWF0ZUVsZW1lbnQoJ0xJJyk7XG5cdFx0XHRcdC8vbm9kZSA9IG5vZGVbMF07XG5cdFx0XHR9XG5cdFx0XHRub2RlID0gdGhpcy5fZGF0YS5jb3JlLm5vZGUuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFx0Ly8gbm9kZSBpcyBET00sIGRlZXAgaXMgYm9vbGVhblxuXG5cdFx0XHRjID0gJ2pzdHJlZS1ub2RlICc7XG5cdFx0XHRmb3IoaSBpbiBvYmoubGlfYXR0cikge1xuXHRcdFx0XHRpZihvYmoubGlfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGlmKGkgPT09ICdpZCcpIHsgY29udGludWU7IH1cblx0XHRcdFx0XHRpZihpICE9PSAnY2xhc3MnKSB7XG5cdFx0XHRcdFx0XHRub2RlLnNldEF0dHJpYnV0ZShpLCBvYmoubGlfYXR0cltpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YyArPSBvYmoubGlfYXR0cltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCFvYmouYV9hdHRyLmlkKSB7XG5cdFx0XHRcdG9iai5hX2F0dHIuaWQgPSBvYmouaWQgKyAnX2FuY2hvcic7XG5cdFx0XHR9XG5cdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgISFvYmouc3RhdGUuc2VsZWN0ZWQpO1xuXHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1sZXZlbCcsIG9iai5wYXJlbnRzLmxlbmd0aCk7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUuY29tcHV0ZV9lbGVtZW50c19wb3NpdGlvbnMpIHtcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1zZXRzaXplJywgbVtvYmoucGFyZW50XS5jaGlsZHJlbi5sZW5ndGgpO1xuXHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uc2V0QXR0cmlidXRlKCdhcmlhLXBvc2luc2V0JywgbVtvYmoucGFyZW50XS5jaGlsZHJlbi5pbmRleE9mKG9iai5pZCkgKyAxKTtcblx0XHRcdH1cblx0XHRcdGlmKG9iai5zdGF0ZS5kaXNhYmxlZCkge1xuXHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uc2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYoIW1bb2JqLmNoaWxkcmVuW2ldXS5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0XHRoYXNfY2hpbGRyZW4gPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihvYmoucGFyZW50ICE9PSBudWxsICYmIG1bb2JqLnBhcmVudF0gJiYgIW9iai5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0aSA9ICQuaW5BcnJheShvYmouaWQsIG1bb2JqLnBhcmVudF0uY2hpbGRyZW4pO1xuXHRcdFx0XHRsYXN0X3NpYmxpbmcgPSBvYmouaWQ7XG5cdFx0XHRcdGlmKGkgIT09IC0xKSB7XG5cdFx0XHRcdFx0aSsrO1xuXHRcdFx0XHRcdGZvcihqID0gbVtvYmoucGFyZW50XS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmKCFtW21bb2JqLnBhcmVudF0uY2hpbGRyZW5baV1dLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRcdFx0XHRsYXN0X3NpYmxpbmcgPSBtW29iai5wYXJlbnRdLmNoaWxkcmVuW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYobGFzdF9zaWJsaW5nICE9PSBvYmouaWQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKG9iai5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0YyArPSAnIGpzdHJlZS1oaWRkZW4nO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG9iai5zdGF0ZS5sb2FkaW5nKSB7XG5cdFx0XHRcdGMgKz0gJyBqc3RyZWUtbG9hZGluZyc7XG5cdFx0XHR9XG5cdFx0XHRpZihvYmouc3RhdGUubG9hZGVkICYmICFoYXNfY2hpbGRyZW4pIHtcblx0XHRcdFx0YyArPSAnIGpzdHJlZS1sZWFmJztcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjICs9IG9iai5zdGF0ZS5vcGVuZWQgJiYgb2JqLnN0YXRlLmxvYWRlZCA/ICcganN0cmVlLW9wZW4nIDogJyBqc3RyZWUtY2xvc2VkJztcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIChvYmouc3RhdGUub3BlbmVkICYmIG9iai5zdGF0ZS5sb2FkZWQpICk7XG5cdFx0XHR9XG5cdFx0XHRpZihsYXN0X3NpYmxpbmcgPT09IG9iai5pZCkge1xuXHRcdFx0XHRjICs9ICcganN0cmVlLWxhc3QnO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5pZCA9IG9iai5pZDtcblx0XHRcdG5vZGUuY2xhc3NOYW1lID0gYztcblx0XHRcdGMgPSAoIG9iai5zdGF0ZS5zZWxlY3RlZCA/ICcganN0cmVlLWNsaWNrZWQnIDogJycpICsgKCBvYmouc3RhdGUuZGlzYWJsZWQgPyAnIGpzdHJlZS1kaXNhYmxlZCcgOiAnJyk7XG5cdFx0XHRmb3IoaiBpbiBvYmouYV9hdHRyKSB7XG5cdFx0XHRcdGlmKG9iai5hX2F0dHIuaGFzT3duUHJvcGVydHkoaikpIHtcblx0XHRcdFx0XHRpZihqID09PSAnaHJlZicgJiYgb2JqLmFfYXR0cltqXSA9PT0gJyMnKSB7IGNvbnRpbnVlOyB9XG5cdFx0XHRcdFx0aWYoaiAhPT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZShqLCBvYmouYV9hdHRyW2pdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRjICs9ICcgJyArIG9iai5hX2F0dHJbal07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihjLmxlbmd0aCkge1xuXHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uY2xhc3NOYW1lID0gJ2pzdHJlZS1hbmNob3IgJyArIGM7XG5cdFx0XHR9XG5cdFx0XHRpZigob2JqLmljb24gJiYgb2JqLmljb24gIT09IHRydWUpIHx8IG9iai5pY29uID09PSBmYWxzZSkge1xuXHRcdFx0XHRpZihvYmouaWNvbiA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1swXS5jbGFzc05hbWUgKz0gJyBqc3RyZWUtdGhlbWVpY29uLWhpZGRlbic7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZihvYmouaWNvbi5pbmRleE9mKCcvJykgPT09IC0xICYmIG9iai5pY29uLmluZGV4T2YoJy4nKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1swXS5jbGFzc05hbWUgKz0gJyAnICsgb2JqLmljb24gKyAnIGpzdHJlZS10aGVtZWljb24tY3VzdG9tJztcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1swXS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiJytvYmouaWNvbisnXCIpJztcblx0XHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uY2hpbGROb2Rlc1swXS5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSAnY2VudGVyIGNlbnRlcic7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnYXV0byc7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uY2xhc3NOYW1lICs9ICcganN0cmVlLXRoZW1laWNvbi1jdXN0b20nO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29yZS5mb3JjZV90ZXh0KSB7XG5cdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5hcHBlbmRDaGlsZChkLmNyZWF0ZVRleHROb2RlKG9iai50ZXh0KSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmlubmVySFRNTCArPSBvYmoudGV4dDtcblx0XHRcdH1cblxuXG5cdFx0XHRpZihkZWVwICYmIG9iai5jaGlsZHJlbi5sZW5ndGggJiYgKG9iai5zdGF0ZS5vcGVuZWQgfHwgZm9yY2VfcmVuZGVyKSAmJiBvYmouc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdGsgPSBkLmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG5cdFx0XHRcdGsuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyb3VwJyk7XG5cdFx0XHRcdGsuY2xhc3NOYW1lID0gJ2pzdHJlZS1jaGlsZHJlbic7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRrLmFwcGVuZENoaWxkKHRoaXMucmVkcmF3X25vZGUob2JqLmNoaWxkcmVuW2ldLCBkZWVwLCB0cnVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bm9kZS5hcHBlbmRDaGlsZChrKTtcblx0XHRcdH1cblx0XHRcdGlmKG9sZCkge1xuXHRcdFx0XHRub2RlLmFwcGVuZENoaWxkKG9sZCk7XG5cdFx0XHR9XG5cdFx0XHRpZighaXNfY2FsbGJhY2spIHtcblx0XHRcdFx0Ly8gYXBwZW5kIGJhY2sgdXNpbmcgcGFyIC8gaW5kXG5cdFx0XHRcdGlmKCFwYXIpIHtcblx0XHRcdFx0XHRwYXIgPSB0aGlzLmVsZW1lbnRbMF07XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcGFyLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYocGFyLmNoaWxkTm9kZXNbaV0gJiYgcGFyLmNoaWxkTm9kZXNbaV0uY2xhc3NOYW1lICYmIHBhci5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZS5pbmRleE9mKCdqc3RyZWUtY2hpbGRyZW4nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHRtcCA9IHBhci5jaGlsZE5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCF0bXApIHtcblx0XHRcdFx0XHR0bXAgPSBkLmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG5cdFx0XHRcdFx0dG1wLnNldEF0dHJpYnV0ZSgncm9sZScsICdncm91cCcpO1xuXHRcdFx0XHRcdHRtcC5jbGFzc05hbWUgPSAnanN0cmVlLWNoaWxkcmVuJztcblx0XHRcdFx0XHRwYXIuYXBwZW5kQ2hpbGQodG1wKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwYXIgPSB0bXA7XG5cblx0XHRcdFx0aWYoaW5kIDwgcGFyLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cGFyLmluc2VydEJlZm9yZShub2RlLCBwYXIuY2hpbGROb2Rlc1tpbmRdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRwYXIuYXBwZW5kQ2hpbGQobm9kZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoZikge1xuXHRcdFx0XHRcdHQgPSB0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsVG9wO1xuXHRcdFx0XHRcdGwgPSB0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsTGVmdDtcblx0XHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uZm9jdXMoKTtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsVG9wID0gdDtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsTGVmdCA9IGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKG9iai5zdGF0ZS5vcGVuZWQgJiYgIW9iai5zdGF0ZS5sb2FkZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLm9wZW5lZCA9IGZhbHNlO1xuXHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aGlzLm9wZW5fbm9kZShvYmouaWQsIGZhbHNlLCAwKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpLCAwKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBub2RlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogb3BlbnMgYSBub2RlLCByZXZlYWxpbmcgaXRzIGNoaWxkcmVuLiBJZiB0aGUgbm9kZSBpcyBub3QgbG9hZGVkIGl0IHdpbGwgYmUgbG9hZGVkIGFuZCBvcGVuZWQgb25jZSByZWFkeS5cblx0XHQgKiBAbmFtZSBvcGVuX25vZGUob2JqIFssIGNhbGxiYWNrLCBhbmltYXRpb25dKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBvcGVuXG5cdFx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBleGVjdXRlIG9uY2UgdGhlIG5vZGUgaXMgb3BlbmVkXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IGFuaW1hdGlvbiB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyB3aGVuIG9wZW5pbmcgdGhlIG5vZGUgKG92ZXJyaWRlcyB0aGUgYGNvcmUuYW5pbWF0aW9uYCBzZXR0aW5nKS4gVXNlIGBmYWxzZWAgZm9yIG5vIGFuaW1hdGlvbi5cblx0XHQgKiBAdHJpZ2dlciBvcGVuX25vZGUuanN0cmVlLCBhZnRlcl9vcGVuLmpzdHJlZSwgYmVmb3JlX29wZW4uanN0cmVlXG5cdFx0ICovXG5cdFx0b3Blbl9ub2RlIDogZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2ssIGFuaW1hdGlvbikge1xuXHRcdFx0dmFyIHQxLCB0MiwgZCwgdDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMub3Blbl9ub2RlKG9ialt0MV0sIGNhbGxiYWNrLCBhbmltYXRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0YW5pbWF0aW9uID0gYW5pbWF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLnNldHRpbmdzLmNvcmUuYW5pbWF0aW9uIDogYW5pbWF0aW9uO1xuXHRcdFx0aWYoIXRoaXMuaXNfY2xvc2VkKG9iaikpIHtcblx0XHRcdFx0aWYoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIG9iaiwgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKCF0aGlzLmlzX2xvYWRlZChvYmopKSB7XG5cdFx0XHRcdGlmKHRoaXMuaXNfbG9hZGluZyhvYmopKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dGhpcy5vcGVuX25vZGUob2JqLCBjYWxsYmFjaywgYW5pbWF0aW9uKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcyksIDUwMCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5sb2FkX25vZGUob2JqLCBmdW5jdGlvbiAobywgb2spIHtcblx0XHRcdFx0XHRyZXR1cm4gb2sgPyB0aGlzLm9wZW5fbm9kZShvLCBjYWxsYmFjaywgYW5pbWF0aW9uKSA6IChjYWxsYmFjayA/IGNhbGxiYWNrLmNhbGwodGhpcywgbywgZmFsc2UpIDogZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0XHR0ID0gdGhpcztcblx0XHRcdFx0aWYoZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRpZihhbmltYXRpb24gJiYgZC5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRkLmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5zdG9wKHRydWUsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihvYmouY2hpbGRyZW4ubGVuZ3RoICYmICF0aGlzLl9maXJzdENoaWxkKGQuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKVswXSkpIHtcblx0XHRcdFx0XHRcdHRoaXMuZHJhd19jaGlsZHJlbihvYmopO1xuXHRcdFx0XHRcdFx0Ly9kID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZighYW5pbWF0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2JlZm9yZV9vcGVuJywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0XHRcdGRbMF0uY2xhc3NOYW1lID0gZFswXS5jbGFzc05hbWUucmVwbGFjZSgnanN0cmVlLWNsb3NlZCcsICdqc3RyZWUtb3BlbicpO1xuXHRcdFx0XHRcdFx0ZFswXS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZShcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVfb3BlbicsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdFx0XHRkXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuY3NzKFwiZGlzcGxheVwiLFwibm9uZVwiKS5lbmQoKVxuXHRcdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtY2xvc2VkXCIpLmFkZENsYXNzKFwianN0cmVlLW9wZW5cIilcblx0XHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgdHJ1ZSkuZW5kKClcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5zdG9wKHRydWUsIHRydWUpXG5cdFx0XHRcdFx0XHRcdFx0LnNsaWRlRG93bihhbmltYXRpb24sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodC5lbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHQudHJpZ2dlcihcImFmdGVyX29wZW5cIiwgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0b2JqLnN0YXRlLm9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBvYmosIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFkLmxlbmd0aCkge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBhYm91dCB0byBiZSBvcGVuZWQgKGlmIHRoZSBub2RlIGlzIHN1cHBvc2VkIHRvIGJlIGluIHRoZSBET00sIGl0IHdpbGwgYmUsIGJ1dCBpdCB3b24ndCBiZSB2aXNpYmxlIHlldClcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAbmFtZSBiZWZvcmVfb3Blbi5qc3RyZWVcblx0XHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgb3BlbmVkIG5vZGVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2JlZm9yZV9vcGVuJywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIG9wZW5lZCAoaWYgdGhlcmUgaXMgYW4gYW5pbWF0aW9uIGl0IHdpbGwgbm90IGJlIGNvbXBsZXRlZCB5ZXQpXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBvcGVuX25vZGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBvcGVuZWQgbm9kZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdvcGVuX25vZGUnLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0XHRpZighYW5pbWF0aW9uIHx8ICFkLmxlbmd0aCkge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBvcGVuZWQgYW5kIHRoZSBhbmltYXRpb24gaXMgY29tcGxldGVcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAbmFtZSBhZnRlcl9vcGVuLmpzdHJlZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBvcGVuZWQgbm9kZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcihcImFmdGVyX29wZW5cIiwgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIG9wZW5zIGV2ZXJ5IHBhcmVudCBvZiBhIG5vZGUgKG5vZGUgc2hvdWxkIGJlIGxvYWRlZClcblx0XHQgKiBAbmFtZSBfb3Blbl90byhvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIHJldmVhbFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0X29wZW5fdG8gOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgaSwgaiwgcCA9IG9iai5wYXJlbnRzO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5sZW5ndGg7IGkgPCBqOyBpKz0xKSB7XG5cdFx0XHRcdGlmKGkgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHR0aGlzLm9wZW5fbm9kZShwW2ldLCBmYWxzZSwgMCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAkKCcjJyArIG9iai5pZC5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpLCB0aGlzLmVsZW1lbnQpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2xvc2VzIGEgbm9kZSwgaGlkaW5nIGl0cyBjaGlsZHJlblxuXHRcdCAqIEBuYW1lIGNsb3NlX25vZGUob2JqIFssIGFuaW1hdGlvbl0pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGNsb3NlXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IGFuaW1hdGlvbiB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyB3aGVuIGNsb3NpbmcgdGhlIG5vZGUgKG92ZXJyaWRlcyB0aGUgYGNvcmUuYW5pbWF0aW9uYCBzZXR0aW5nKS4gVXNlIGBmYWxzZWAgZm9yIG5vIGFuaW1hdGlvbi5cblx0XHQgKiBAdHJpZ2dlciBjbG9zZV9ub2RlLmpzdHJlZSwgYWZ0ZXJfY2xvc2UuanN0cmVlXG5cdFx0ICovXG5cdFx0Y2xvc2Vfbm9kZSA6IGZ1bmN0aW9uIChvYmosIGFuaW1hdGlvbikge1xuXHRcdFx0dmFyIHQxLCB0MiwgdCwgZDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuY2xvc2Vfbm9kZShvYmpbdDFdLCBhbmltYXRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5pc19jbG9zZWQob2JqKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRhbmltYXRpb24gPSBhbmltYXRpb24gPT09IHVuZGVmaW5lZCA/IHRoaXMuc2V0dGluZ3MuY29yZS5hbmltYXRpb24gOiBhbmltYXRpb247XG5cdFx0XHR0ID0gdGhpcztcblx0XHRcdGQgPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cblx0XHRcdG9iai5zdGF0ZS5vcGVuZWQgPSBmYWxzZTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIGNsb3NlZCAoaWYgdGhlcmUgaXMgYW4gYW5pbWF0aW9uIGl0IHdpbGwgbm90IGJlIGNvbXBsZXRlIHlldClcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgY2xvc2Vfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBjbG9zZWQgbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2Nsb3NlX25vZGUnLHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRpZighZC5sZW5ndGgpIHtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBjbG9zZWQgYW5kIHRoZSBhbmltYXRpb24gaXMgY29tcGxldGVcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIGFmdGVyX2Nsb3NlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgY2xvc2VkIG5vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcihcImFmdGVyX2Nsb3NlXCIsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYoIWFuaW1hdGlvbikge1xuXHRcdFx0XHRcdGRbMF0uY2xhc3NOYW1lID0gZFswXS5jbGFzc05hbWUucmVwbGFjZSgnanN0cmVlLW9wZW4nLCAnanN0cmVlLWNsb3NlZCcpO1xuXHRcdFx0XHRcdGQuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpO1xuXHRcdFx0XHRcdGQuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKS5yZW1vdmUoKTtcblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoXCJhZnRlcl9jbG9zZVwiLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGRcblx0XHRcdFx0XHRcdC5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuYXR0cihcInN0eWxlXCIsXCJkaXNwbGF5OmJsb2NrICFpbXBvcnRhbnRcIikuZW5kKClcblx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcyhcImpzdHJlZS1vcGVuXCIpLmFkZENsYXNzKFwianN0cmVlLWNsb3NlZFwiKVxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYXR0cihcImFyaWEtZXhwYW5kZWRcIiwgZmFsc2UpLmVuZCgpXG5cdFx0XHRcdFx0XHQuY2hpbGRyZW4oXCIuanN0cmVlLWNoaWxkcmVuXCIpLnN0b3AodHJ1ZSwgdHJ1ZSkuc2xpZGVVcChhbmltYXRpb24sIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcblx0XHRcdFx0XHRcdFx0ZC5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRpZiAodC5lbGVtZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0dC50cmlnZ2VyKFwiYWZ0ZXJfY2xvc2VcIiwgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZXMgYSBub2RlIC0gY2xvc2luZyBpdCBpZiBpdCBpcyBvcGVuLCBvcGVuaW5nIGl0IGlmIGl0IGlzIGNsb3NlZFxuXHRcdCAqIEBuYW1lIHRvZ2dsZV9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gdG9nZ2xlXG5cdFx0ICovXG5cdFx0dG9nZ2xlX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy50b2dnbGVfbm9kZShvYmpbdDFdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuaXNfY2xvc2VkKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMub3Blbl9ub2RlKG9iaik7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLmlzX29wZW4ob2JqKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jbG9zZV9ub2RlKG9iaik7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBvcGVucyBhbGwgbm9kZXMgd2l0aGluIGEgbm9kZSAob3IgdGhlIHRyZWUpLCByZXZlYWxpbmcgdGhlaXIgY2hpbGRyZW4uIElmIHRoZSBub2RlIGlzIG5vdCBsb2FkZWQgaXQgd2lsbCBiZSBsb2FkZWQgYW5kIG9wZW5lZCBvbmNlIHJlYWR5LlxuXHRcdCAqIEBuYW1lIG9wZW5fYWxsKFtvYmosIGFuaW1hdGlvbiwgb3JpZ2luYWxfb2JqXSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gb3BlbiByZWN1cnNpdmVseSwgb21pdCB0byBvcGVuIGFsbCBub2RlcyBpbiB0aGUgdHJlZVxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBhbmltYXRpb24gdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgd2hlbiBvcGVuaW5nIHRoZSBub2RlcywgdGhlIGRlZmF1bHQgaXMgbm8gYW5pbWF0aW9uXG5cdFx0ICogQHBhcmFtIHtqUXVlcnl9IHJlZmVyZW5jZSB0byB0aGUgbm9kZSB0aGF0IHN0YXJ0ZWQgdGhlIHByb2Nlc3MgKGludGVybmFsIHVzZSlcblx0XHQgKiBAdHJpZ2dlciBvcGVuX2FsbC5qc3RyZWVcblx0XHQgKi9cblx0XHRvcGVuX2FsbCA6IGZ1bmN0aW9uIChvYmosIGFuaW1hdGlvbiwgb3JpZ2luYWxfb2JqKSB7XG5cdFx0XHRpZighb2JqKSB7IG9iaiA9ICQuanN0cmVlLnJvb3Q7IH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgZG9tID0gb2JqLmlkID09PSAkLmpzdHJlZS5yb290ID8gdGhpcy5nZXRfY29udGFpbmVyX3VsKCkgOiB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSksIGksIGosIF90aGlzO1xuXHRcdFx0aWYoIWRvbS5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYodGhpcy5pc19jbG9zZWQodGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtpXV0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW29iai5jaGlsZHJlbl9kW2ldXS5zdGF0ZS5vcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdGhpcy50cmlnZ2VyKCdvcGVuX2FsbCcsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0XHRvcmlnaW5hbF9vYmogPSBvcmlnaW5hbF9vYmogfHwgZG9tO1xuXHRcdFx0X3RoaXMgPSB0aGlzO1xuXHRcdFx0ZG9tID0gdGhpcy5pc19jbG9zZWQob2JqKSA/IGRvbS5maW5kKCcuanN0cmVlLWNsb3NlZCcpLmFkZEJhY2soKSA6IGRvbS5maW5kKCcuanN0cmVlLWNsb3NlZCcpO1xuXHRcdFx0ZG9tLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRfdGhpcy5vcGVuX25vZGUoXG5cdFx0XHRcdFx0dGhpcyxcblx0XHRcdFx0XHRmdW5jdGlvbihub2RlLCBzdGF0dXMpIHsgaWYoc3RhdHVzICYmIHRoaXMuaXNfcGFyZW50KG5vZGUpKSB7IHRoaXMub3Blbl9hbGwobm9kZSwgYW5pbWF0aW9uLCBvcmlnaW5hbF9vYmopOyB9IH0sXG5cdFx0XHRcdFx0YW5pbWF0aW9uIHx8IDBcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXHRcdFx0aWYob3JpZ2luYWxfb2JqLmZpbmQoJy5qc3RyZWUtY2xvc2VkJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBgb3Blbl9hbGxgIGNhbGwgY29tcGxldGVzXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBvcGVuX2FsbC5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIG9wZW5lZCBub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ29wZW5fYWxsJywgeyBcIm5vZGVcIiA6IHRoaXMuZ2V0X25vZGUob3JpZ2luYWxfb2JqKSB9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNsb3NlcyBhbGwgbm9kZXMgd2l0aGluIGEgbm9kZSAob3IgdGhlIHRyZWUpLCByZXZlYWxpbmcgdGhlaXIgY2hpbGRyZW5cblx0XHQgKiBAbmFtZSBjbG9zZV9hbGwoW29iaiwgYW5pbWF0aW9uXSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gY2xvc2UgcmVjdXJzaXZlbHksIG9taXQgdG8gY2xvc2UgYWxsIG5vZGVzIGluIHRoZSB0cmVlXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IGFuaW1hdGlvbiB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uIGluIG1pbGxpc2Vjb25kcyB3aGVuIGNsb3NpbmcgdGhlIG5vZGVzLCB0aGUgZGVmYXVsdCBpcyBubyBhbmltYXRpb25cblx0XHQgKiBAdHJpZ2dlciBjbG9zZV9hbGwuanN0cmVlXG5cdFx0ICovXG5cdFx0Y2xvc2VfYWxsIDogZnVuY3Rpb24gKG9iaiwgYW5pbWF0aW9uKSB7XG5cdFx0XHRpZighb2JqKSB7IG9iaiA9ICQuanN0cmVlLnJvb3Q7IH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgZG9tID0gb2JqLmlkID09PSAkLmpzdHJlZS5yb290ID8gdGhpcy5nZXRfY29udGFpbmVyX3VsKCkgOiB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSksXG5cdFx0XHRcdF90aGlzID0gdGhpcywgaSwgajtcblx0XHRcdGlmKGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0ZG9tID0gdGhpcy5pc19vcGVuKG9iaikgPyBkb20uZmluZCgnLmpzdHJlZS1vcGVuJykuYWRkQmFjaygpIDogZG9tLmZpbmQoJy5qc3RyZWUtb3BlbicpO1xuXHRcdFx0XHQkKGRvbS5nZXQoKS5yZXZlcnNlKCkpLmVhY2goZnVuY3Rpb24gKCkgeyBfdGhpcy5jbG9zZV9ub2RlKHRoaXMsIGFuaW1hdGlvbiB8fCAwKTsgfSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW5fZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtpXV0uc3RhdGUub3BlbmVkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIGBjbG9zZV9hbGxgIGNhbGwgY29tcGxldGVzXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNsb3NlX2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBjbG9zZWQgbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2Nsb3NlX2FsbCcsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVja3MgaWYgYSBub2RlIGlzIGRpc2FibGVkIChub3Qgc2VsZWN0YWJsZSlcblx0XHQgKiBAbmFtZSBpc19kaXNhYmxlZChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfZGlzYWJsZWQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqICYmIG9iai5zdGF0ZSAmJiBvYmouc3RhdGUuZGlzYWJsZWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBlbmFibGVzIGEgbm9kZSAtIHNvIHRoYXQgaXQgY2FuIGJlIHNlbGVjdGVkXG5cdFx0ICogQG5hbWUgZW5hYmxlX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBlbmFibGVcblx0XHQgKiBAdHJpZ2dlciBlbmFibGVfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRlbmFibGVfbm9kZSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciB0MSwgdDI7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmVuYWJsZV9ub2RlKG9ialt0MV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0b2JqLnN0YXRlLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldF9ub2RlKG9iaix0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcygnanN0cmVlLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsIGZhbHNlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBlbmFibGVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGVuYWJsZV9ub2RlLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIGVuYWJsZWQgbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2VuYWJsZV9ub2RlJywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBkaXNhYmxlcyBhIG5vZGUgLSBzbyB0aGF0IGl0IGNhbiBub3QgYmUgc2VsZWN0ZWRcblx0XHQgKiBAbmFtZSBkaXNhYmxlX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBkaXNhYmxlXG5cdFx0ICogQHRyaWdnZXIgZGlzYWJsZV9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGRpc2FibGVfbm9kZSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciB0MSwgdDI7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmRpc2FibGVfbm9kZShvYmpbdDFdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdG9iai5zdGF0ZS5kaXNhYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLmdldF9ub2RlKG9iaix0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcygnanN0cmVlLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBub2RlIGlzIGRpc2FibGVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGRpc2FibGVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBkaXNhYmxlZCBub2RlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignZGlzYWJsZV9ub2RlJywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBkZXRlcm1pbmVzIGlmIGEgbm9kZSBpcyBoaWRkZW5cblx0XHQgKiBAbmFtZSBpc19oaWRkZW4ob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqL1xuXHRcdGlzX2hpZGRlbiA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHJldHVybiBvYmouc3RhdGUuaGlkZGVuID09PSB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaGlkZXMgYSBub2RlIC0gaXQgaXMgc3RpbGwgaW4gdGhlIHN0cnVjdHVyZSBidXQgd2lsbCBub3QgYmUgdmlzaWJsZVxuXHRcdCAqIEBuYW1lIGhpZGVfbm9kZShvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGhpZGVcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHNraXBfcmVkcmF3IGludGVybmFsIHBhcmFtZXRlciBjb250cm9sbGluZyBpZiByZWRyYXcgaXMgY2FsbGVkXG5cdFx0ICogQHRyaWdnZXIgaGlkZV9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGhpZGVfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHNraXBfcmVkcmF3KSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5oaWRlX25vZGUob2JqW3QxXSwgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFza2lwX3JlZHJhdykge1xuXHRcdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZighb2JqLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRvYmouc3RhdGUuaGlkZGVuID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fbm9kZV9jaGFuZ2VkKG9iai5wYXJlbnQpO1xuXHRcdFx0XHRpZighc2tpcF9yZWRyYXcpIHtcblx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBub2RlIGlzIGhpZGRlblxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgaGlkZV9ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgaGlkZGVuIG5vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9ub2RlJywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzaG93cyBhIG5vZGVcblx0XHQgKiBAbmFtZSBzaG93X25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBzaG93XG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBza2lwX3JlZHJhdyBpbnRlcm5hbCBwYXJhbWV0ZXIgY29udHJvbGxpbmcgaWYgcmVkcmF3IGlzIGNhbGxlZFxuXHRcdCAqIEB0cmlnZ2VyIHNob3dfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRzaG93X25vZGUgOiBmdW5jdGlvbiAob2JqLCBza2lwX3JlZHJhdykge1xuXHRcdFx0dmFyIHQxLCB0Mjtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuc2hvd19ub2RlKG9ialt0MV0sIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghc2tpcF9yZWRyYXcpIHtcblx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYob2JqLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRvYmouc3RhdGUuaGlkZGVuID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuX25vZGVfY2hhbmdlZChvYmoucGFyZW50KTtcblx0XHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBzaG93blxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgc2hvd19ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgc2hvd24gbm9kZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdzaG93X25vZGUnLCB7ICdub2RlJyA6IG9iaiB9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGhpZGVzIGFsbCBub2Rlc1xuXHRcdCAqIEBuYW1lIGhpZGVfYWxsKClcblx0XHQgKiBAdHJpZ2dlciBoaWRlX2FsbC5qc3RyZWVcblx0XHQgKi9cblx0XHRoaWRlX2FsbCA6IGZ1bmN0aW9uIChza2lwX3JlZHJhdykge1xuXHRcdFx0dmFyIGksIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBpZHMgPSBbXTtcblx0XHRcdGZvcihpIGluIG0pIHtcblx0XHRcdFx0aWYobS5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAkLmpzdHJlZS5yb290ICYmICFtW2ldLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRcdG1baV0uc3RhdGUuaGlkZGVuID0gdHJ1ZTtcblx0XHRcdFx0XHRpZHMucHVzaChpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcgPSB0cnVlO1xuXHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgaGlkZGVuXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGhpZGVfYWxsLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbm9kZXMgdGhlIElEcyBvZiBhbGwgaGlkZGVuIG5vZGVzXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9hbGwnLCB7ICdub2RlcycgOiBpZHMgfSk7XG5cdFx0XHRyZXR1cm4gaWRzO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2hvd3MgYWxsIG5vZGVzXG5cdFx0ICogQG5hbWUgc2hvd19hbGwoKVxuXHRcdCAqIEB0cmlnZ2VyIHNob3dfYWxsLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNob3dfYWxsIDogZnVuY3Rpb24gKHNraXBfcmVkcmF3KSB7XG5cdFx0XHR2YXIgaSwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIGlkcyA9IFtdO1xuXHRcdFx0Zm9yKGkgaW4gbSkge1xuXHRcdFx0XHRpZihtLmhhc093blByb3BlcnR5KGkpICYmIGkgIT09ICQuanN0cmVlLnJvb3QgJiYgbVtpXS5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0XHRtW2ldLnN0YXRlLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdGlkcy5wdXNoKGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdyA9IHRydWU7XG5cdFx0XHRpZighc2tpcF9yZWRyYXcpIHtcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYWxsIG5vZGVzIGFyZSBzaG93blxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzaG93X2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IG5vZGVzIHRoZSBJRHMgb2YgYWxsIHNob3duIG5vZGVzXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19hbGwnLCB7ICdub2RlcycgOiBpZHMgfSk7XG5cdFx0XHRyZXR1cm4gaWRzO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2FsbGVkIHdoZW4gYSBub2RlIGlzIHNlbGVjdGVkIGJ5IHRoZSB1c2VyLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBhY3RpdmF0ZV9ub2RlKG9iaiwgZSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gZSB0aGUgcmVsYXRlZCBldmVudFxuXHRcdCAqIEB0cmlnZ2VyIGFjdGl2YXRlX25vZGUuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGFjdGl2YXRlX25vZGUgOiBmdW5jdGlvbiAob2JqLCBlKSB7XG5cdFx0XHRpZih0aGlzLmlzX2Rpc2FibGVkKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoIWUgfHwgdHlwZW9mIGUgIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGUgPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gZW5zdXJlIGxhc3RfY2xpY2tlZCBpcyBzdGlsbCBpbiB0aGUgRE9NLCBtYWtlIGl0IGZyZXNoIChtYXliZSBpdCB3YXMgbW92ZWQ/KSBhbmQgbWFrZSBzdXJlIGl0IGlzIHN0aWxsIHNlbGVjdGVkLCBpZiBub3QgLSBtYWtlIGxhc3RfY2xpY2tlZCB0aGUgbGFzdCBzZWxlY3RlZCBub2RlXG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkID0gdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCAmJiB0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkLmlkICE9PSB1bmRlZmluZWQgPyB0aGlzLmdldF9ub2RlKHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQuaWQpIDogbnVsbDtcblx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgJiYgIXRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQuc3RhdGUuc2VsZWN0ZWQpIHsgdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCA9IG51bGw7IH1cblx0XHRcdGlmKCF0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkICYmIHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGgpIHsgdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCA9IHRoaXMuZ2V0X25vZGUodGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkW3RoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGggLSAxXSk7IH1cblxuXHRcdFx0aWYoIXRoaXMuc2V0dGluZ3MuY29yZS5tdWx0aXBsZSB8fCAoIWUubWV0YUtleSAmJiAhZS5jdHJsS2V5ICYmICFlLnNoaWZ0S2V5KSB8fCAoZS5zaGlmdEtleSAmJiAoIXRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgfHwgIXRoaXMuZ2V0X3BhcmVudChvYmopIHx8IHRoaXMuZ2V0X3BhcmVudChvYmopICE9PSB0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkLnBhcmVudCApICkpIHtcblx0XHRcdFx0aWYoIXRoaXMuc2V0dGluZ3MuY29yZS5tdWx0aXBsZSAmJiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSAmJiB0aGlzLmlzX3NlbGVjdGVkKG9iaikpIHtcblx0XHRcdFx0XHR0aGlzLmRlc2VsZWN0X25vZGUob2JqLCBmYWxzZSwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5kZXNlbGVjdF9hbGwodHJ1ZSk7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3Rfbm9kZShvYmosIGZhbHNlLCBmYWxzZSwgZSk7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmKGUuc2hpZnRLZXkpIHtcblx0XHRcdFx0XHR2YXIgbyA9IHRoaXMuZ2V0X25vZGUob2JqKS5pZCxcblx0XHRcdFx0XHRcdGwgPSB0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkLmlkLFxuXHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUodGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZC5wYXJlbnQpLmNoaWxkcmVuLFxuXHRcdFx0XHRcdFx0YyA9IGZhbHNlLFxuXHRcdFx0XHRcdFx0aSwgajtcblx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLmxlbmd0aDsgaSA8IGo7IGkgKz0gMSkge1xuXHRcdFx0XHRcdFx0Ly8gc2VwYXJhdGUgSUZzIHdvcmsgd2hlbSBvIGFuZCBsIGFyZSB0aGUgc2FtZVxuXHRcdFx0XHRcdFx0aWYocFtpXSA9PT0gbykge1xuXHRcdFx0XHRcdFx0XHRjID0gIWM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihwW2ldID09PSBsKSB7XG5cdFx0XHRcdFx0XHRcdGMgPSAhYztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKCF0aGlzLmlzX2Rpc2FibGVkKHBbaV0pICYmIChjIHx8IHBbaV0gPT09IG8gfHwgcFtpXSA9PT0gbCkpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLmlzX2hpZGRlbihwW2ldKSkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0X25vZGUocFtpXSwgdHJ1ZSwgZmFsc2UsIGUpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5kZXNlbGVjdF9ub2RlKHBbaV0sIHRydWUsIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ3NlbGVjdF9ub2RlJywgJ25vZGUnIDogdGhpcy5nZXRfbm9kZShvYmopLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAnZXZlbnQnIDogZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpZighdGhpcy5pc19zZWxlY3RlZChvYmopKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNlbGVjdF9ub2RlKG9iaiwgZmFsc2UsIGZhbHNlLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlc2VsZWN0X25vZGUob2JqLCBmYWxzZSwgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgY2xpY2tlZCBvciBpbnRlcmNhdGVkIHdpdGggYnkgdGhlIHVzZXJcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgYWN0aXZhdGVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIG9vcmlnaW5hbCBldmVudCAoaWYgYW55KSB3aGljaCB0cmlnZ2VyZWQgdGhlIGNhbGwgKG1heSBiZSBhbiBlbXB0eSBvYmplY3QpXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignYWN0aXZhdGVfbm9kZScsIHsgJ25vZGUnIDogdGhpcy5nZXRfbm9kZShvYmopLCAnZXZlbnQnIDogZSB9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGFwcGxpZXMgdGhlIGhvdmVyIHN0YXRlIG9uIGEgbm9kZSwgY2FsbGVkIHdoZW4gYSBub2RlIGlzIGhvdmVyZWQgYnkgdGhlIHVzZXIuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGhvdmVyX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9ialxuXHRcdCAqIEB0cmlnZ2VyIGhvdmVyX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0aG92ZXJfbm9kZSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGggfHwgb2JqLmNoaWxkcmVuKCcuanN0cmVlLWhvdmVyZWQnKS5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG8gPSB0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS1ob3ZlcmVkJyksIHQgPSB0aGlzLmVsZW1lbnQ7XG5cdFx0XHRpZihvICYmIG8ubGVuZ3RoKSB7IHRoaXMuZGVob3Zlcl9ub2RlKG8pOyB9XG5cblx0XHRcdG9iai5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcygnanN0cmVlLWhvdmVyZWQnKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBob3ZlcmVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGhvdmVyX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2hvdmVyX25vZGUnLCB7ICdub2RlJyA6IHRoaXMuZ2V0X25vZGUob2JqKSB9KTtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsIG9ialswXS5pZCk7IH0sIDApO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVtb3ZlcyB0aGUgaG92ZXIgc3RhdGUgZnJvbSBhIG5vZGVjYWxsZWQgd2hlbiBhIG5vZGUgaXMgbm8gbG9uZ2VyIGhvdmVyZWQgYnkgdGhlIHVzZXIuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGRlaG92ZXJfbm9kZShvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqXG5cdFx0ICogQHRyaWdnZXIgZGVob3Zlcl9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGRlaG92ZXJfbm9kZSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGggfHwgIW9iai5jaGlsZHJlbignLmpzdHJlZS1ob3ZlcmVkJykubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdG9iai5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcygnanN0cmVlLWhvdmVyZWQnKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBubyBsb25nZXIgaG92ZXJlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBkZWhvdmVyX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2RlaG92ZXJfbm9kZScsIHsgJ25vZGUnIDogdGhpcy5nZXRfbm9kZShvYmopIH0pO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2VsZWN0IGEgbm9kZVxuXHRcdCAqIEBuYW1lIHNlbGVjdF9ub2RlKG9iaiBbLCBzdXByZXNzX2V2ZW50LCBwcmV2ZW50X29wZW5dKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiBhbiBhcnJheSBjYW4gYmUgdXNlZCB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXNcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHN1cHJlc3NfZXZlbnQgaWYgc2V0IHRvIGB0cnVlYCB0aGUgYGNoYW5nZWQuanN0cmVlYCBldmVudCB3b24ndCBiZSB0cmlnZ2VyZWRcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHByZXZlbnRfb3BlbiBpZiBzZXQgdG8gYHRydWVgIHBhcmVudHMgb2YgdGhlIHNlbGVjdGVkIG5vZGUgd29uJ3QgYmUgb3BlbmVkXG5cdFx0ICogQHRyaWdnZXIgc2VsZWN0X25vZGUuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNlbGVjdF9ub2RlIDogZnVuY3Rpb24gKG9iaiwgc3VwcmVzc19ldmVudCwgcHJldmVudF9vcGVuLCBlKSB7XG5cdFx0XHR2YXIgZG9tLCB0MSwgdDIsIHRoO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5zZWxlY3Rfbm9kZShvYmpbdDFdLCBzdXByZXNzX2V2ZW50LCBwcmV2ZW50X29wZW4sIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0aWYoIW9iai5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQucHVzaChvYmouaWQpO1xuXHRcdFx0XHRpZighcHJldmVudF9vcGVuKSB7XG5cdFx0XHRcdFx0ZG9tID0gdGhpcy5fb3Blbl90byhvYmopO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZG9tLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKCdqc3RyZWUtY2xpY2tlZCcpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBzZWxlY3RlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgc2VsZWN0X25vZGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGV2ZW50IChpZiBhbnkpIHRoYXQgdHJpZ2dlcmVkIHRoaXMgc2VsZWN0X25vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignc2VsZWN0X25vZGUnLCB7ICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHRcdGlmKCFzdXByZXNzX2V2ZW50KSB7XG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gc2VsZWN0aW9uIGNoYW5nZXNcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAbmFtZSBjaGFuZ2VkLmpzdHJlZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiB0aGUgYWN0aW9uIHRoYXQgY2F1c2VkIHRoZSBzZWxlY3Rpb24gdG8gY2hhbmdlXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBldmVudCAoaWYgYW55KSB0aGF0IHRyaWdnZXJlZCB0aGlzIGNoYW5nZWQgZXZlbnRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ3NlbGVjdF9ub2RlJywgJ25vZGUnIDogb2JqLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAnZXZlbnQnIDogZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZGVzZWxlY3QgYSBub2RlXG5cdFx0ICogQG5hbWUgZGVzZWxlY3Rfbm9kZShvYmogWywgc3VwcmVzc19ldmVudF0pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIGFuIGFycmF5IGNhbiBiZSB1c2VkIHRvIGRlc2VsZWN0IG11bHRpcGxlIG5vZGVzXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBzdXByZXNzX2V2ZW50IGlmIHNldCB0byBgdHJ1ZWAgdGhlIGBjaGFuZ2VkLmpzdHJlZWAgZXZlbnQgd29uJ3QgYmUgdHJpZ2dlcmVkXG5cdFx0ICogQHRyaWdnZXIgZGVzZWxlY3Rfbm9kZS5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0ZGVzZWxlY3Rfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHN1cHJlc3NfZXZlbnQsIGUpIHtcblx0XHRcdHZhciB0MSwgdDIsIGRvbTtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuZGVzZWxlY3Rfbm9kZShvYmpbdDFdLCBzdXByZXNzX2V2ZW50LCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKG9iai5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkID0gJC52YWthdGEuYXJyYXlfcmVtb3ZlX2l0ZW0odGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCBvYmouaWQpO1xuXHRcdFx0XHRpZihkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZG9tLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnJlbW92ZUNsYXNzKCdqc3RyZWUtY2xpY2tlZCcpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgZGVzZWxlY3RlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgZGVzZWxlY3Rfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgKGlmIGFueSkgdGhhdCB0cmlnZ2VyZWQgdGhpcyBkZXNlbGVjdF9ub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2Rlc2VsZWN0X25vZGUnLCB7ICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHRcdGlmKCFzdXByZXNzX2V2ZW50KSB7XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdkZXNlbGVjdF9ub2RlJywgJ25vZGUnIDogb2JqLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAnZXZlbnQnIDogZSB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2VsZWN0IGFsbCBub2RlcyBpbiB0aGUgdHJlZVxuXHRcdCAqIEBuYW1lIHNlbGVjdF9hbGwoW3N1cHJlc3NfZXZlbnRdKVxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VwcmVzc19ldmVudCBpZiBzZXQgdG8gYHRydWVgIHRoZSBgY2hhbmdlZC5qc3RyZWVgIGV2ZW50IHdvbid0IGJlIHRyaWdnZXJlZFxuXHRcdCAqIEB0cmlnZ2VyIHNlbGVjdF9hbGwuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNlbGVjdF9hbGwgOiBmdW5jdGlvbiAoc3VwcmVzc19ldmVudCkge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQoW10pLCBpLCBqO1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkID0gdGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XS5jaGlsZHJlbl9kLmNvbmNhdCgpO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFtpXV0pIHtcblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFtpXV0uc3RhdGUuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlZHJhdyh0cnVlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYWxsIG5vZGVzIGFyZSBzZWxlY3RlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzZWxlY3RfYWxsLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2VsZWN0X2FsbCcsIHsgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCB9KTtcblx0XHRcdGlmKCFzdXByZXNzX2V2ZW50KSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlZCcsIHsgJ2FjdGlvbicgOiAnc2VsZWN0X2FsbCcsICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsICdvbGRfc2VsZWN0aW9uJyA6IHRtcCB9KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGRlc2VsZWN0IGFsbCBzZWxlY3RlZCBub2Rlc1xuXHRcdCAqIEBuYW1lIGRlc2VsZWN0X2FsbChbc3VwcmVzc19ldmVudF0pXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBzdXByZXNzX2V2ZW50IGlmIHNldCB0byBgdHJ1ZWAgdGhlIGBjaGFuZ2VkLmpzdHJlZWAgZXZlbnQgd29uJ3QgYmUgdHJpZ2dlcmVkXG5cdFx0ICogQHRyaWdnZXIgZGVzZWxlY3RfYWxsLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRkZXNlbGVjdF9hbGwgOiBmdW5jdGlvbiAoc3VwcmVzc19ldmVudCkge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQoW10pLCBpLCBqO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFtpXV0pIHtcblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFtpXV0uc3RhdGUuc2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkID0gW107XG5cdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS1jbGlja2VkJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1jbGlja2VkJykuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYWxsIG5vZGVzIGFyZSBkZXNlbGVjdGVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGRlc2VsZWN0X2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBwcmV2aW91cyBzZWxlY3Rpb25cblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2Rlc2VsZWN0X2FsbCcsIHsgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ25vZGUnIDogdG1wIH0pO1xuXHRcdFx0aWYoIXN1cHJlc3NfZXZlbnQpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdkZXNlbGVjdF9hbGwnLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAnb2xkX3NlbGVjdGlvbicgOiB0bXAgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVja3MgaWYgYSBub2RlIGlzIHNlbGVjdGVkXG5cdFx0ICogQG5hbWUgaXNfc2VsZWN0ZWQob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19zZWxlY3RlZCA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmouc3RhdGUuc2VsZWN0ZWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgYW4gYXJyYXkgb2YgYWxsIHNlbGVjdGVkIG5vZGVzXG5cdFx0ICogQG5hbWUgZ2V0X3NlbGVjdGVkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqL1xuXHRcdGdldF9zZWxlY3RlZCA6IGZ1bmN0aW9uIChmdWxsKSB7XG5cdFx0XHRyZXR1cm4gZnVsbCA/ICQubWFwKHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHRoaXMuZ2V0X25vZGUoaSk7IH0uYmluZCh0aGlzKSkgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuc2xpY2UoKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgdG9wIGxldmVsIHNlbGVjdGVkIG5vZGVzIChpZ25vcmluZyBjaGlsZHJlbiBvZiBzZWxlY3RlZCBub2Rlcylcblx0XHQgKiBAbmFtZSBnZXRfdG9wX3NlbGVjdGVkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqL1xuXHRcdGdldF90b3Bfc2VsZWN0ZWQgOiBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXMuZ2V0X3NlbGVjdGVkKHRydWUpLFxuXHRcdFx0XHRvYmogPSB7fSwgaSwgaiwgaywgbDtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0b2JqW3RtcFtpXS5pZF0gPSB0bXBbaV07XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGZvcihrID0gMCwgbCA9IHRtcFtpXS5jaGlsZHJlbl9kLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdGlmKG9ialt0bXBbaV0uY2hpbGRyZW5fZFtrXV0pIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSBvYmpbdG1wW2ldLmNoaWxkcmVuX2Rba11dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gW107XG5cdFx0XHRmb3IoaSBpbiBvYmopIHtcblx0XHRcdFx0aWYob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0dG1wLnB1c2goaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmdWxsID8gJC5tYXAodG1wLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gdGhpcy5nZXRfbm9kZShpKTsgfS5iaW5kKHRoaXMpKSA6IHRtcDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgYm90dG9tIGxldmVsIHNlbGVjdGVkIG5vZGVzIChpZ25vcmluZyBzZWxlY3RlZCBwYXJlbnRzKVxuXHRcdCAqIEBuYW1lIGdldF9ib3R0b21fc2VsZWN0ZWQoW2Z1bGxdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgZnVsbCBpZiBzZXQgdG8gYHRydWVgIHRoZSByZXR1cm5lZCBhcnJheSB3aWxsIGNvbnNpc3Qgb2YgdGhlIGZ1bGwgbm9kZSBvYmplY3RzLCBvdGhlcndpc2UgLSBvbmx5IElEcyB3aWxsIGJlIHJldHVybmVkXG5cdFx0ICogQHJldHVybiB7QXJyYXl9XG5cdFx0ICovXG5cdFx0Z2V0X2JvdHRvbV9zZWxlY3RlZCA6IGZ1bmN0aW9uIChmdWxsKSB7XG5cdFx0XHR2YXIgdG1wID0gdGhpcy5nZXRfc2VsZWN0ZWQodHJ1ZSksXG5cdFx0XHRcdG9iaiA9IFtdLCBpLCBqO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZighdG1wW2ldLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9iai5wdXNoKHRtcFtpXS5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmdWxsID8gJC5tYXAob2JqLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gdGhpcy5nZXRfbm9kZShpKTsgfS5iaW5kKHRoaXMpKSA6IG9iajtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldHMgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIHRyZWUgc28gdGhhdCBpdCBjYW4gYmUgcmVzdG9yZWQgbGF0ZXIgd2l0aCBgc2V0X3N0YXRlKHN0YXRlKWAuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAbmFtZSBnZXRfc3RhdGUoKVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdGdldF9zdGF0ZSA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzdGF0ZVx0PSB7XG5cdFx0XHRcdCdjb3JlJyA6IHtcblx0XHRcdFx0XHQnb3BlbicgOiBbXSxcblx0XHRcdFx0XHQnbG9hZGVkJyA6IFtdLFxuXHRcdFx0XHRcdCdzY3JvbGwnIDoge1xuXHRcdFx0XHRcdFx0J2xlZnQnIDogdGhpcy5lbGVtZW50LnNjcm9sbExlZnQoKSxcblx0XHRcdFx0XHRcdCd0b3AnIDogdGhpcy5lbGVtZW50LnNjcm9sbFRvcCgpXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHQvKiFcblx0XHRcdFx0XHQndGhlbWVzJyA6IHtcblx0XHRcdFx0XHRcdCduYW1lJyA6IHRoaXMuZ2V0X3RoZW1lKCksXG5cdFx0XHRcdFx0XHQnaWNvbnMnIDogdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5pY29ucyxcblx0XHRcdFx0XHRcdCdkb3RzJyA6IHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZG90c1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHQnc2VsZWN0ZWQnIDogW11cblx0XHRcdFx0fVxuXHRcdFx0fSwgaTtcblx0XHRcdGZvcihpIGluIHRoaXMuX21vZGVsLmRhdGEpIHtcblx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdGlmKGkgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbaV0uc3RhdGUubG9hZGVkICYmIHRoaXMuc2V0dGluZ3MuY29yZS5sb2FkZWRfc3RhdGUpIHtcblx0XHRcdFx0XHRcdFx0c3RhdGUuY29yZS5sb2FkZWQucHVzaChpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbaV0uc3RhdGUub3BlbmVkKSB7XG5cdFx0XHRcdFx0XHRcdHN0YXRlLmNvcmUub3Blbi5wdXNoKGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVtpXS5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0XHRzdGF0ZS5jb3JlLnNlbGVjdGVkLnB1c2goaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzZXRzIHRoZSBzdGF0ZSBvZiB0aGUgdHJlZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBuYW1lIHNldF9zdGF0ZShzdGF0ZSBbLCBjYWxsYmFja10pXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge09iamVjdH0gc3RhdGUgdGhlIHN0YXRlIHRvIHJlc3RvcmUuIEtlZXAgaW4gbWluZCB0aGlzIG9iamVjdCBpcyBwYXNzZWQgYnkgcmVmZXJlbmNlIGFuZCBqc3RyZWUgd2lsbCBtb2RpZnkgaXQuXG5cdFx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgYW4gb3B0aW9uYWwgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbmNlIHRoZSBzdGF0ZSBpcyByZXN0b3JlZC5cblx0XHQgKiBAdHJpZ2dlciBzZXRfc3RhdGUuanN0cmVlXG5cdFx0ICovXG5cdFx0c2V0X3N0YXRlIDogZnVuY3Rpb24gKHN0YXRlLCBjYWxsYmFjaykge1xuXHRcdFx0aWYoc3RhdGUpIHtcblx0XHRcdFx0aWYoc3RhdGUuY29yZSAmJiBzdGF0ZS5jb3JlLnNlbGVjdGVkICYmIHN0YXRlLmNvcmUuaW5pdGlhbF9zZWxlY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHN0YXRlLmNvcmUuaW5pdGlhbF9zZWxlY3Rpb24gPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KFtdKS5zb3J0KCkuam9pbignLCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHN0YXRlLmNvcmUpIHtcblx0XHRcdFx0XHR2YXIgcmVzLCBuLCB0LCBfdGhpcywgaTtcblx0XHRcdFx0XHRpZihzdGF0ZS5jb3JlLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuc2V0dGluZ3MuY29yZS5sb2FkZWRfc3RhdGUgfHwgISQudmFrYXRhLmlzX2FycmF5KHN0YXRlLmNvcmUubG9hZGVkKSB8fCAhc3RhdGUuY29yZS5sb2FkZWQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jb3JlLmxvYWRlZDtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2FkX25vZGVzKHN0YXRlLmNvcmUubG9hZGVkLCBmdW5jdGlvbiAobm9kZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgc3RhdGUuY29yZS5sb2FkZWQ7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHN0YXRlLmNvcmUub3Blbikge1xuXHRcdFx0XHRcdFx0aWYoISQudmFrYXRhLmlzX2FycmF5KHN0YXRlLmNvcmUub3BlbikgfHwgIXN0YXRlLmNvcmUub3Blbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmUub3Blbjtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2FkX25vZGVzKHN0YXRlLmNvcmUub3BlbiwgZnVuY3Rpb24gKG5vZGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5vcGVuX25vZGUobm9kZXMsIGZhbHNlLCAwKTtcblx0XHRcdFx0XHRcdFx0XHRkZWxldGUgc3RhdGUuY29yZS5vcGVuO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihzdGF0ZS5jb3JlLnNjcm9sbCkge1xuXHRcdFx0XHRcdFx0aWYoc3RhdGUuY29yZS5zY3JvbGwgJiYgc3RhdGUuY29yZS5zY3JvbGwubGVmdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0KHN0YXRlLmNvcmUuc2Nyb2xsLmxlZnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoc3RhdGUuY29yZS5zY3JvbGwgJiYgc3RhdGUuY29yZS5zY3JvbGwudG9wICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LnNjcm9sbFRvcChzdGF0ZS5jb3JlLnNjcm9sbC50b3ApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmUuc2Nyb2xsO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoc3RhdGUuY29yZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0X3RoaXMgPSB0aGlzO1xuXHRcdFx0XHRcdFx0aWYgKHN0YXRlLmNvcmUuaW5pdGlhbF9zZWxlY3Rpb24gPT09IHVuZGVmaW5lZCB8fFxuXHRcdFx0XHRcdFx0XHRzdGF0ZS5jb3JlLmluaXRpYWxfc2VsZWN0aW9uID09PSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KFtdKS5zb3J0KCkuam9pbignLCcpXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5kZXNlbGVjdF9hbGwoKTtcblx0XHRcdFx0XHRcdFx0JC5lYWNoKHN0YXRlLmNvcmUuc2VsZWN0ZWQsIGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0X3RoaXMuc2VsZWN0X25vZGUodiwgZmFsc2UsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jb3JlLmluaXRpYWxfc2VsZWN0aW9uO1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmUuc2VsZWN0ZWQ7XG5cdFx0XHRcdFx0XHR0aGlzLnNldF9zdGF0ZShzdGF0ZSwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IoaSBpbiBzdGF0ZSkge1xuXHRcdFx0XHRcdFx0aWYoc3RhdGUuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gXCJjb3JlXCIgJiYgJC5pbkFycmF5KGksIHRoaXMuc2V0dGluZ3MucGx1Z2lucykgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZVtpXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoJC5pc0VtcHR5T2JqZWN0KHN0YXRlLmNvcmUpKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgc3RhdGUuY29yZTtcblx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCQuaXNFbXB0eU9iamVjdChzdGF0ZSkpIHtcblx0XHRcdFx0XHRzdGF0ZSA9IG51bGw7XG5cdFx0XHRcdFx0aWYoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzKTsgfVxuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgYHNldF9zdGF0ZWAgY2FsbCBjb21wbGV0ZXNcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAbmFtZSBzZXRfc3RhdGUuanN0cmVlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdzZXRfc3RhdGUnKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZWZyZXNoZXMgdGhlIHRyZWUgLSBhbGwgbm9kZXMgYXJlIHJlbG9hZGVkIHdpdGggY2FsbHMgdG8gYGxvYWRfbm9kZWAuXG5cdFx0ICogQG5hbWUgcmVmcmVzaCgpXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBza2lwX2xvYWRpbmcgYW4gb3B0aW9uIHRvIHNraXAgc2hvd2luZyB0aGUgbG9hZGluZyBpbmRpY2F0b3Jcblx0XHQgKiBAcGFyYW0ge01peGVkfSBmb3JnZXRfc3RhdGUgaWYgc2V0IHRvIGB0cnVlYCBzdGF0ZSB3aWxsIG5vdCBiZSByZWFwcGxpZWQsIGlmIHNldCB0byBhIGZ1bmN0aW9uIChyZWNlaXZpbmcgdGhlIGN1cnJlbnQgc3RhdGUgYXMgYXJndW1lbnQpIHRoZSByZXN1bHQgb2YgdGhhdCBmdW5jdGlvbiB3aWxsIGJlIHVzZWQgYXMgc3RhdGVcblx0XHQgKiBAdHJpZ2dlciByZWZyZXNoLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHJlZnJlc2ggOiBmdW5jdGlvbiAoc2tpcF9sb2FkaW5nLCBmb3JnZXRfc3RhdGUpIHtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5zdGF0ZSA9IGZvcmdldF9zdGF0ZSA9PT0gdHJ1ZSA/IHt9IDogdGhpcy5nZXRfc3RhdGUoKTtcblx0XHRcdGlmKGZvcmdldF9zdGF0ZSAmJiAkLnZha2F0YS5pc19mdW5jdGlvbihmb3JnZXRfc3RhdGUpKSB7IHRoaXMuX2RhdGEuY29yZS5zdGF0ZSA9IGZvcmdldF9zdGF0ZS5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5zdGF0ZSk7IH1cblx0XHRcdHRoaXMuX2NudCA9IDA7XG5cdFx0XHR0aGlzLl9tb2RlbC5kYXRhID0ge307XG5cdFx0XHR0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdID0ge1xuXHRcdFx0XHRpZCA6ICQuanN0cmVlLnJvb3QsXG5cdFx0XHRcdHBhcmVudCA6IG51bGwsXG5cdFx0XHRcdHBhcmVudHMgOiBbXSxcblx0XHRcdFx0Y2hpbGRyZW4gOiBbXSxcblx0XHRcdFx0Y2hpbGRyZW5fZCA6IFtdLFxuXHRcdFx0XHRzdGF0ZSA6IHsgbG9hZGVkIDogZmFsc2UgfVxuXHRcdFx0fTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9IFtdO1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCA9IG51bGw7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IG51bGw7XG5cblx0XHRcdHZhciBjID0gdGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0uY2xhc3NOYW1lO1xuXHRcdFx0aWYoIXNraXBfbG9hZGluZykge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuaHRtbChcIjxcIitcInVsIGNsYXNzPSdcIitjK1wiJyByb2xlPSdncm91cCc+PFwiK1wibGkgY2xhc3M9J2pzdHJlZS1pbml0aWFsLW5vZGUganN0cmVlLWxvYWRpbmcganN0cmVlLWxlYWYganN0cmVlLWxhc3QnIHJvbGU9J25vbmUnIGlkPSdqXCIrdGhpcy5faWQrXCJfbG9hZGluZyc+PGkgY2xhc3M9J2pzdHJlZS1pY29uIGpzdHJlZS1vY2wnPjwvaT48XCIrXCJhIGNsYXNzPSdqc3RyZWUtYW5jaG9yJyByb2xlPSd0cmVlaXRlbScgaHJlZj0nIyc+PGkgY2xhc3M9J2pzdHJlZS1pY29uIGpzdHJlZS10aGVtZWljb24taGlkZGVuJz48L2k+XCIgKyB0aGlzLmdldF9zdHJpbmcoXCJMb2FkaW5nIC4uLlwiKSArIFwiPC9hPjwvbGk+PC91bD5cIik7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCdqJyt0aGlzLl9pZCsnX2xvYWRpbmcnKTtcblx0XHRcdH1cblx0XHRcdHRoaXMubG9hZF9ub2RlKCQuanN0cmVlLnJvb3QsIGZ1bmN0aW9uIChvLCBzKSB7XG5cdFx0XHRcdGlmKHMpIHtcblx0XHRcdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKVswXS5jbGFzc05hbWUgPSBjO1xuXHRcdFx0XHRcdGlmKHRoaXMuX2ZpcnN0Q2hpbGQodGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50Jyx0aGlzLl9maXJzdENoaWxkKHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKS5pZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKCQuZXh0ZW5kKHRydWUsIHt9LCB0aGlzLl9kYXRhLmNvcmUuc3RhdGUpLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgYHJlZnJlc2hgIGNhbGwgY29tcGxldGVzXG5cdFx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHRcdCAqIEBuYW1lIHJlZnJlc2guanN0cmVlXG5cdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcigncmVmcmVzaCcpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zdGF0ZSA9IG51bGw7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJlZnJlc2hlcyBhIG5vZGUgaW4gdGhlIHRyZWUgKHJlbG9hZCBpdHMgY2hpbGRyZW4pIGFsbCBvcGVuZWQgbm9kZXMgaW5zaWRlIHRoYXQgbm9kZSBhcmUgcmVsb2FkZWQgd2l0aCBjYWxscyB0byBgbG9hZF9ub2RlYC5cblx0XHQgKiBAbmFtZSByZWZyZXNoX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAdHJpZ2dlciByZWZyZXNoX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0cmVmcmVzaF9ub2RlIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgb3BlbmVkID0gW10sIHRvX2xvYWQgPSBbXSwgcyA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQoW10pO1xuXHRcdFx0dG9fbG9hZC5wdXNoKG9iai5pZCk7XG5cdFx0XHRpZihvYmouc3RhdGUub3BlbmVkID09PSB0cnVlKSB7IG9wZW5lZC5wdXNoKG9iai5pZCk7IH1cblx0XHRcdHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKS5maW5kKCcuanN0cmVlLW9wZW4nKS5lYWNoKGZ1bmN0aW9uKCkgeyB0b19sb2FkLnB1c2godGhpcy5pZCk7IG9wZW5lZC5wdXNoKHRoaXMuaWQpOyB9KTtcblx0XHRcdHRoaXMuX2xvYWRfbm9kZXModG9fbG9hZCwgZnVuY3Rpb24gKG5vZGVzKSB7XG5cdFx0XHRcdHRoaXMub3Blbl9ub2RlKG9wZW5lZCwgZmFsc2UsIDApO1xuXHRcdFx0XHR0aGlzLnNlbGVjdF9ub2RlKHMpO1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIHJlZnJlc2hlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgcmVmcmVzaF9ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSAtIHRoZSByZWZyZXNoZWQgbm9kZVxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBub2RlcyAtIGFuIGFycmF5IG9mIHRoZSBJRHMgb2YgdGhlIG5vZGVzIHRoYXQgd2VyZSByZWxvYWRlZFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdyZWZyZXNoX25vZGUnLCB7ICdub2RlJyA6IG9iaiwgJ25vZGVzJyA6IG5vZGVzIH0pO1xuXHRcdFx0fS5iaW5kKHRoaXMpLCBmYWxzZSwgdHJ1ZSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzZXQgKGNoYW5nZSkgdGhlIElEIG9mIGEgbm9kZVxuXHRcdCAqIEBuYW1lIHNldF9pZChvYmosIGlkKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGlkIHRoZSBuZXcgSURcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqIEB0cmlnZ2VyIHNldF9pZC5qc3RyZWVcblx0XHQgKi9cblx0XHRzZXRfaWQgOiBmdW5jdGlvbiAob2JqLCBpZCkge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgaSwgaiwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIG9sZCA9IG9iai5pZDtcblx0XHRcdGlkID0gaWQudG9TdHJpbmcoKTtcblx0XHRcdC8vIHVwZGF0ZSBwYXJlbnRzIChyZXBsYWNlIGN1cnJlbnQgSUQgd2l0aCBuZXcgb25lIGluIGNoaWxkcmVuIGFuZCBjaGlsZHJlbl9kKVxuXHRcdFx0bVtvYmoucGFyZW50XS5jaGlsZHJlblskLmluQXJyYXkob2JqLmlkLCBtW29iai5wYXJlbnRdLmNoaWxkcmVuKV0gPSBpZDtcblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRtW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kWyQuaW5BcnJheShvYmouaWQsIG1bb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QpXSA9IGlkO1xuXHRcdFx0fVxuXHRcdFx0Ly8gdXBkYXRlIGNoaWxkcmVuIChyZXBsYWNlIGN1cnJlbnQgSUQgd2l0aCBuZXcgb25lIGluIHBhcmVudCBhbmQgcGFyZW50cylcblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0bVtvYmouY2hpbGRyZW5baV1dLnBhcmVudCA9IGlkO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdG1bb2JqLmNoaWxkcmVuX2RbaV1dLnBhcmVudHNbJC5pbkFycmF5KG9iai5pZCwgbVtvYmouY2hpbGRyZW5fZFtpXV0ucGFyZW50cyldID0gaWQ7XG5cdFx0XHR9XG5cdFx0XHRpID0gJC5pbkFycmF5KG9iai5pZCwgdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkKTtcblx0XHRcdGlmKGkgIT09IC0xKSB7IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFtpXSA9IGlkOyB9XG5cdFx0XHQvLyB1cGRhdGUgbW9kZWwgYW5kIG9iaiBpdHNlbGYgKG9iai5pZCwgdGhpcy5fbW9kZWwuZGF0YVtLRVldKVxuXHRcdFx0aSA9IHRoaXMuZ2V0X25vZGUob2JqLmlkLCB0cnVlKTtcblx0XHRcdGlmKGkpIHtcblx0XHRcdFx0aS5hdHRyKCdpZCcsIGlkKTsgLy8uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYXR0cignaWQnLCBpZCArICdfYW5jaG9yJykuZW5kKCkuYXR0cignYXJpYS1sYWJlbGxlZGJ5JywgaWQgKyAnX2FuY2hvcicpO1xuXHRcdFx0XHRpZih0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JykgPT09IG9iai5pZCkge1xuXHRcdFx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBpZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGRlbGV0ZSBtW29iai5pZF07XG5cdFx0XHRvYmouaWQgPSBpZDtcblx0XHRcdG9iai5saV9hdHRyLmlkID0gaWQ7XG5cdFx0XHRtW2lkXSA9IG9iajtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlkIHZhbHVlIGlzIGNoYW5nZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2V0X2lkLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBvbGQgdGhlIG9sZCBpZFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NldF9pZCcseyBcIm5vZGVcIiA6IG9iaiwgXCJuZXdcIiA6IG9iai5pZCwgXCJvbGRcIiA6IG9sZCB9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSB0ZXh0IHZhbHVlIG9mIGEgbm9kZVxuXHRcdCAqIEBuYW1lIGdldF90ZXh0KG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdCAqL1xuXHRcdGdldF90ZXh0IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuICghb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgPyBmYWxzZSA6IG9iai50ZXh0O1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2V0IHRoZSB0ZXh0IHZhbHVlIG9mIGEgbm9kZS4gVXNlZCBpbnRlcm5hbGx5LCBwbGVhc2UgdXNlIGByZW5hbWVfbm9kZShvYmosIHZhbClgLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgc2V0X3RleHQob2JqLCB2YWwpXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZSwgeW91IGNhbiBwYXNzIGFuIGFycmF5IHRvIHNldCB0aGUgdGV4dCBvbiBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gdmFsIHRoZSBuZXcgdGV4dCB2YWx1ZVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICogQHRyaWdnZXIgc2V0X3RleHQuanN0cmVlXG5cdFx0ICovXG5cdFx0c2V0X3RleHQgOiBmdW5jdGlvbiAob2JqLCB2YWwpIHtcblx0XHRcdHZhciB0MSwgdDI7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLnNldF90ZXh0KG9ialt0MV0sIHZhbCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdG9iai50ZXh0ID0gdmFsO1xuXHRcdFx0aWYodGhpcy5nZXRfbm9kZShvYmosIHRydWUpLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLnJlZHJhd19ub2RlKG9iai5pZCk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSB0ZXh0IHZhbHVlIGlzIGNoYW5nZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2V0X3RleHQuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gb2JqXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdGV4dCB0aGUgbmV3IHZhbHVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2V0X3RleHQnLHsgXCJvYmpcIiA6IG9iaiwgXCJ0ZXh0XCIgOiB2YWwgfSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldHMgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgbm9kZSAob3IgdGhlIHdob2xlIHRyZWUpXG5cdFx0ICogQG5hbWUgZ2V0X2pzb24oW29iaiwgb3B0aW9uc10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9uc1xuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IG9wdGlvbnMubm9fc3RhdGUgZG8gbm90IHJldHVybiBzdGF0ZSBpbmZvcm1hdGlvblxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IG9wdGlvbnMubm9faWQgZG8gbm90IHJldHVybiBJRFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IG9wdGlvbnMubm9fY2hpbGRyZW4gZG8gbm90IGluY2x1ZGUgY2hpbGRyZW5cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLm5vX2RhdGEgZG8gbm90IGluY2x1ZGUgbm9kZSBkYXRhXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gb3B0aW9ucy5ub19saV9hdHRyIGRvIG5vdCBpbmNsdWRlIExJIGF0dHJpYnV0ZXNcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLm5vX2FfYXR0ciBkbyBub3QgaW5jbHVkZSBBIGF0dHJpYnV0ZXNcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLmZsYXQgcmV0dXJuIGZsYXQgSlNPTiBpbnN0ZWFkIG9mIG5lc3RlZFxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRnZXRfanNvbiA6IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMsIGZsYXQpIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqIHx8ICQuanN0cmVlLnJvb3QpO1xuXHRcdFx0aWYoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5mbGF0ICYmICFmbGF0KSB7IGZsYXQgPSBbXTsgfVxuXHRcdFx0dmFyIHRtcCA9IHtcblx0XHRcdFx0J2lkJyA6IG9iai5pZCxcblx0XHRcdFx0J3RleHQnIDogb2JqLnRleHQsXG5cdFx0XHRcdCdpY29uJyA6IHRoaXMuZ2V0X2ljb24ob2JqKSxcblx0XHRcdFx0J2xpX2F0dHInIDogJC5leHRlbmQodHJ1ZSwge30sIG9iai5saV9hdHRyKSxcblx0XHRcdFx0J2FfYXR0cicgOiAkLmV4dGVuZCh0cnVlLCB7fSwgb2JqLmFfYXR0ciksXG5cdFx0XHRcdCdzdGF0ZScgOiB7fSxcblx0XHRcdFx0J2RhdGEnIDogb3B0aW9ucyAmJiBvcHRpb25zLm5vX2RhdGEgPyBmYWxzZSA6ICQuZXh0ZW5kKHRydWUsICQudmFrYXRhLmlzX2FycmF5KG9iai5kYXRhKT9bXTp7fSwgb2JqLmRhdGEpXG5cdFx0XHRcdC8vKCB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSkubGVuZ3RoID8gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLmRhdGEoKSA6IG9iai5kYXRhICksXG5cdFx0XHR9LCBpLCBqO1xuXHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLmZsYXQpIHtcblx0XHRcdFx0dG1wLnBhcmVudCA9IG9iai5wYXJlbnQ7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dG1wLmNoaWxkcmVuID0gW107XG5cdFx0XHR9XG5cdFx0XHRpZighb3B0aW9ucyB8fCAhb3B0aW9ucy5ub19zdGF0ZSkge1xuXHRcdFx0XHRmb3IoaSBpbiBvYmouc3RhdGUpIHtcblx0XHRcdFx0XHRpZihvYmouc3RhdGUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IG9iai5zdGF0ZVtpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGRlbGV0ZSB0bXAuc3RhdGU7XG5cdFx0XHR9XG5cdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMubm9fbGlfYXR0cikge1xuXHRcdFx0XHRkZWxldGUgdG1wLmxpX2F0dHI7XG5cdFx0XHR9XG5cdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMubm9fYV9hdHRyKSB7XG5cdFx0XHRcdGRlbGV0ZSB0bXAuYV9hdHRyO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLm5vX2lkKSB7XG5cdFx0XHRcdGRlbGV0ZSB0bXAuaWQ7XG5cdFx0XHRcdGlmKHRtcC5saV9hdHRyICYmIHRtcC5saV9hdHRyLmlkKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRtcC5saV9hdHRyLmlkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRtcC5hX2F0dHIgJiYgdG1wLmFfYXR0ci5pZCkge1xuXHRcdFx0XHRcdGRlbGV0ZSB0bXAuYV9hdHRyLmlkO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMuZmxhdCAmJiBvYmouaWQgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0ZmxhdC5wdXNoKHRtcCk7XG5cdFx0XHR9XG5cdFx0XHRpZighb3B0aW9ucyB8fCAhb3B0aW9ucy5ub19jaGlsZHJlbikge1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLmZsYXQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0X2pzb24ob2JqLmNoaWxkcmVuW2ldLCBvcHRpb25zLCBmbGF0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW4ucHVzaCh0aGlzLmdldF9qc29uKG9iai5jaGlsZHJlbltpXSwgb3B0aW9ucykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5mbGF0ID8gZmxhdCA6IChvYmouaWQgPT09ICQuanN0cmVlLnJvb3QgPyB0bXAuY2hpbGRyZW4gOiB0bXApO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY3JlYXRlIGEgbmV3IG5vZGUgKGRvIG5vdCBjb25mdXNlIHdpdGggbG9hZF9ub2RlKVxuXHRcdCAqIEBuYW1lIGNyZWF0ZV9ub2RlKFtwYXIsIG5vZGUsIHBvcywgY2FsbGJhY2ssIGlzX2xvYWRlZF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICAgcGFyICAgICAgIHRoZSBwYXJlbnQgbm9kZSAodG8gY3JlYXRlIGEgcm9vdCBub2RlIHVzZSBlaXRoZXIgXCIjXCIgKHN0cmluZykgb3IgYG51bGxgKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgIG5vZGUgICAgICB0aGUgZGF0YSBmb3IgdGhlIG5ldyBub2RlIChhIHZhbGlkIEpTT04gb2JqZWN0LCBvciBhIHNpbXBsZSBzdHJpbmcgd2l0aCB0aGUgbmFtZSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gICBwb3MgICAgICAgdGhlIGluZGV4IGF0IHdoaWNoIHRvIGluc2VydCB0aGUgbm9kZSwgXCJmaXJzdFwiIGFuZCBcImxhc3RcIiBhcmUgYWxzbyBzdXBwb3J0ZWQsIGRlZmF1bHQgaXMgXCJsYXN0XCJcblx0XHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb25jZSB0aGUgbm9kZSBpcyBjcmVhdGVkXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gaXNfbG9hZGVkIGludGVybmFsIGFyZ3VtZW50IGluZGljYXRpbmcgaWYgdGhlIHBhcmVudCBub2RlIHdhcyBzdWNjZXNmdWxseSBsb2FkZWRcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgdGhlIElEIG9mIHRoZSBuZXdseSBjcmVhdGUgbm9kZVxuXHRcdCAqIEB0cmlnZ2VyIG1vZGVsLmpzdHJlZSwgY3JlYXRlX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0Y3JlYXRlX25vZGUgOiBmdW5jdGlvbiAocGFyLCBub2RlLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQpIHtcblx0XHRcdGlmKHBhciA9PT0gbnVsbCkgeyBwYXIgPSAkLmpzdHJlZS5yb290OyB9XG5cdFx0XHRwYXIgPSB0aGlzLmdldF9ub2RlKHBhcik7XG5cdFx0XHRpZighcGFyKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0cG9zID0gcG9zID09PSB1bmRlZmluZWQgPyBcImxhc3RcIiA6IHBvcztcblx0XHRcdGlmKCFwb3MudG9TdHJpbmcoKS5tYXRjaCgvXihiZWZvcmV8YWZ0ZXIpJC8pICYmICFpc19sb2FkZWQgJiYgIXRoaXMuaXNfbG9hZGVkKHBhcikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubG9hZF9ub2RlKHBhciwgZnVuY3Rpb24gKCkgeyB0aGlzLmNyZWF0ZV9ub2RlKHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgdHJ1ZSk7IH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW5vZGUpIHsgbm9kZSA9IHsgXCJ0ZXh0XCIgOiB0aGlzLmdldF9zdHJpbmcoJ05ldyBub2RlJykgfTsgfVxuXHRcdFx0aWYodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdFx0bm9kZSA9IHsgXCJ0ZXh0XCIgOiBub2RlIH07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2RlID0gJC5leHRlbmQodHJ1ZSwge30sIG5vZGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYobm9kZS50ZXh0ID09PSB1bmRlZmluZWQpIHsgbm9kZS50ZXh0ID0gdGhpcy5nZXRfc3RyaW5nKCdOZXcgbm9kZScpOyB9XG5cdFx0XHR2YXIgdG1wLCBkcGMsIGksIGo7XG5cblx0XHRcdGlmKHBhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRpZihwb3MgPT09IFwiYmVmb3JlXCIpIHsgcG9zID0gXCJmaXJzdFwiOyB9XG5cdFx0XHRcdGlmKHBvcyA9PT0gXCJhZnRlclwiKSB7IHBvcyA9IFwibGFzdFwiOyB9XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2gocG9zKSB7XG5cdFx0XHRcdGNhc2UgXCJiZWZvcmVcIjpcblx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKHBhci5wYXJlbnQpO1xuXHRcdFx0XHRcdHBvcyA9ICQuaW5BcnJheShwYXIuaWQsIHRtcC5jaGlsZHJlbik7XG5cdFx0XHRcdFx0cGFyID0gdG1wO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWZ0ZXJcIiA6XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwYXIucGFyZW50KTtcblx0XHRcdFx0XHRwb3MgPSAkLmluQXJyYXkocGFyLmlkLCB0bXAuY2hpbGRyZW4pICsgMTtcblx0XHRcdFx0XHRwYXIgPSB0bXA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJpbnNpZGVcIjpcblx0XHRcdFx0Y2FzZSBcImZpcnN0XCI6XG5cdFx0XHRcdFx0cG9zID0gMDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImxhc3RcIjpcblx0XHRcdFx0XHRwb3MgPSBwYXIuY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGlmKCFwb3MpIHsgcG9zID0gMDsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYocG9zID4gcGFyLmNoaWxkcmVuLmxlbmd0aCkgeyBwb3MgPSBwYXIuY2hpbGRyZW4ubGVuZ3RoOyB9XG5cdFx0XHRpZighbm9kZS5pZCkgeyBub2RlLmlkID0gdHJ1ZTsgfVxuXHRcdFx0aWYoIXRoaXMuY2hlY2soXCJjcmVhdGVfbm9kZVwiLCBub2RlLCBwYXIsIHBvcykpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihub2RlLmlkID09PSB0cnVlKSB7IGRlbGV0ZSBub2RlLmlkOyB9XG5cdFx0XHRub2RlID0gdGhpcy5fcGFyc2VfbW9kZWxfZnJvbV9qc29uKG5vZGUsIHBhci5pZCwgcGFyLnBhcmVudHMuY29uY2F0KCkpO1xuXHRcdFx0aWYoIW5vZGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKG5vZGUpO1xuXHRcdFx0ZHBjID0gW107XG5cdFx0XHRkcGMucHVzaChub2RlKTtcblx0XHRcdGRwYyA9IGRwYy5jb25jYXQodG1wLmNoaWxkcmVuX2QpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdtb2RlbCcsIHsgXCJub2Rlc1wiIDogZHBjLCBcInBhcmVudFwiIDogcGFyLmlkIH0pO1xuXG5cdFx0XHRwYXIuY2hpbGRyZW5fZCA9IHBhci5jaGlsZHJlbl9kLmNvbmNhdChkcGMpO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gcGFyLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbcGFyLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSB0aGlzLl9tb2RlbC5kYXRhW3Bhci5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kLmNvbmNhdChkcGMpO1xuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IHRtcDtcblx0XHRcdHRtcCA9IFtdO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gcGFyLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHR0bXBbaSA+PSBwb3MgPyBpKzEgOiBpXSA9IHBhci5jaGlsZHJlbltpXTtcblx0XHRcdH1cblx0XHRcdHRtcFtwb3NdID0gbm9kZS5pZDtcblx0XHRcdHBhci5jaGlsZHJlbiA9IHRtcDtcblxuXHRcdFx0dGhpcy5yZWRyYXdfbm9kZShwYXIsIHRydWUpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgY3JlYXRlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjcmVhdGVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBwYXJlbnQncyBJRFxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBvc2l0aW9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgbmV3IG5vZGUgYW1vbmcgdGhlIHBhcmVudCdzIGNoaWxkcmVuXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignY3JlYXRlX25vZGUnLCB7IFwibm9kZVwiIDogdGhpcy5nZXRfbm9kZShub2RlKSwgXCJwYXJlbnRcIiA6IHBhci5pZCwgXCJwb3NpdGlvblwiIDogcG9zIH0pO1xuXHRcdFx0aWYoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLmdldF9ub2RlKG5vZGUpKTsgfVxuXHRcdFx0cmV0dXJuIG5vZGUuaWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzZXQgdGhlIHRleHQgdmFsdWUgb2YgYSBub2RlXG5cdFx0ICogQG5hbWUgcmVuYW1lX25vZGUob2JqLCB2YWwpXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZSwgeW91IGNhbiBwYXNzIGFuIGFycmF5IHRvIHJlbmFtZSBtdWx0aXBsZSBub2RlcyB0byB0aGUgc2FtZSBuYW1lXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSB2YWwgdGhlIG5ldyB0ZXh0IHZhbHVlXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKiBAdHJpZ2dlciByZW5hbWVfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRyZW5hbWVfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHZhbCkge1xuXHRcdFx0dmFyIHQxLCB0Miwgb2xkO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5yZW5hbWVfbm9kZShvYmpbdDFdLCB2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRvbGQgPSBvYmoudGV4dDtcblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwicmVuYW1lX25vZGVcIiwgb2JqLCB0aGlzLmdldF9wYXJlbnQob2JqKSwgdmFsKSkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRoaXMuc2V0X3RleHQob2JqLCB2YWwpOyAvLyAuYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSlcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIHJlbmFtZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgcmVuYW1lX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHRleHQgdGhlIG5ldyB2YWx1ZVxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IG9sZCB0aGUgb2xkIHZhbHVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcigncmVuYW1lX25vZGUnLCB7IFwibm9kZVwiIDogb2JqLCBcInRleHRcIiA6IHZhbCwgXCJvbGRcIiA6IG9sZCB9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVtb3ZlIGEgbm9kZVxuXHRcdCAqIEBuYW1lIGRlbGV0ZV9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlLCB5b3UgY2FuIHBhc3MgYW4gYXJyYXkgdG8gZGVsZXRlIG11bHRpcGxlIG5vZGVzXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKiBAdHJpZ2dlciBkZWxldGVfbm9kZS5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0ZGVsZXRlX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBwYXIsIHBvcywgdG1wLCBpLCBqLCBrLCBsLCBjLCB0b3AsIGxmdDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuZGVsZXRlX25vZGUob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUob2JqLnBhcmVudCk7XG5cdFx0XHRwb3MgPSAkLmluQXJyYXkob2JqLmlkLCBwYXIuY2hpbGRyZW4pO1xuXHRcdFx0YyA9IGZhbHNlO1xuXHRcdFx0aWYoIXRoaXMuY2hlY2soXCJkZWxldGVfbm9kZVwiLCBvYmosIHBhciwgcG9zKSkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKHBvcyAhPT0gLTEpIHtcblx0XHRcdFx0cGFyLmNoaWxkcmVuID0gJC52YWthdGEuYXJyYXlfcmVtb3ZlKHBhci5jaGlsZHJlbiwgcG9zKTtcblx0XHRcdH1cblx0XHRcdHRtcCA9IG9iai5jaGlsZHJlbl9kLmNvbmNhdChbXSk7XG5cdFx0XHR0bXAucHVzaChvYmouaWQpO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSAkLnZha2F0YS5hcnJheV9maWx0ZXIodGhpcy5fbW9kZWwuZGF0YVtvYmoucGFyZW50c1tpXV0uY2hpbGRyZW5fZCwgZnVuY3Rpb24gKHYpIHtcblx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KHYsIHRtcCkgPT09IC0xO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGZvcihrID0gMCwgbCA9IHRtcC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVt0bXBba11dLnN0YXRlLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0YyA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmIChjKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X2ZpbHRlcih0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsIGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRcdFx0cmV0dXJuICQuaW5BcnJheSh2LCB0bXApID09PSAtMTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBkZWxldGVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGRlbGV0ZV9ub2RlLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJlbnQgdGhlIHBhcmVudCdzIElEXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignZGVsZXRlX25vZGUnLCB7IFwibm9kZVwiIDogb2JqLCBcInBhcmVudFwiIDogcGFyLmlkIH0pO1xuXHRcdFx0aWYoYykge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ2RlbGV0ZV9ub2RlJywgJ25vZGUnIDogb2JqLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAncGFyZW50JyA6IHBhci5pZCB9KTtcblx0XHRcdH1cblx0XHRcdGZvcihrID0gMCwgbCA9IHRtcC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX21vZGVsLmRhdGFbdG1wW2tdXTtcblx0XHRcdH1cblx0XHRcdGlmKCQuaW5BcnJheSh0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCwgdG1wKSAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgPSBudWxsO1xuXHRcdFx0XHR0b3AgPSB0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsVG9wO1xuXHRcdFx0XHRsZnQgPSB0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsTGVmdDtcblx0XHRcdFx0aWYocGFyLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0uY2hpbGRyZW5bMF0pIHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0X25vZGUodGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XS5jaGlsZHJlblswXSwgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmdldF9ub2RlKHBhciwgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmVsZW1lbnRbMF0uc2Nyb2xsVG9wICA9IHRvcDtcblx0XHRcdFx0dGhpcy5lbGVtZW50WzBdLnNjcm9sbExlZnQgPSBsZnQ7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlZHJhd19ub2RlKHBhciwgdHJ1ZSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrIGlmIGFuIG9wZXJhdGlvbiBpcyBwcmVtaXR0ZWQgb24gdGhlIHRyZWUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGNoZWNrKGNoaywgb2JqLCBwYXIsIHBvcylcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNoayB0aGUgb3BlcmF0aW9uIHRvIGNoZWNrLCBjYW4gYmUgXCJjcmVhdGVfbm9kZVwiLCBcInJlbmFtZV9ub2RlXCIsIFwiZGVsZXRlX25vZGVcIiwgXCJjb3B5X25vZGVcIiBvciBcIm1vdmVfbm9kZVwiXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwYXIgdGhlIHBhcmVudFxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwb3MgdGhlIHBvc2l0aW9uIHRvIGluc2VydCBhdCwgb3IgaWYgXCJyZW5hbWVfbm9kZVwiIC0gdGhlIG5ldyBuYW1lXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG1vcmUgc29tZSB2YXJpb3VzIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24sIGZvciBleGFtcGxlIGlmIGEgXCJtb3ZlX25vZGVcIiBvcGVyYXRpb25zIGlzIHRyaWdnZXJlZCBieSBETkQgdGhpcyB3aWxsIGJlIHRoZSBob3ZlcmVkIG5vZGVcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGNoZWNrIDogZnVuY3Rpb24gKGNoaywgb2JqLCBwYXIsIHBvcywgbW9yZSkge1xuXHRcdFx0b2JqID0gb2JqICYmIG9iai5pZCA/IG9iaiA6IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHBhciA9IHBhciAmJiBwYXIuaWQgPyBwYXIgOiB0aGlzLmdldF9ub2RlKHBhcik7XG5cdFx0XHR2YXIgdG1wID0gY2hrLm1hdGNoKC9ebW92ZV9ub2RlfGNvcHlfbm9kZXxjcmVhdGVfbm9kZSQvaSkgPyBwYXIgOiBvYmosXG5cdFx0XHRcdGNoYyA9IHRoaXMuc2V0dGluZ3MuY29yZS5jaGVja19jYWxsYmFjaztcblx0XHRcdGlmKGNoayA9PT0gXCJtb3ZlX25vZGVcIiB8fCBjaGsgPT09IFwiY29weV9ub2RlXCIpIHtcblx0XHRcdFx0aWYoKCFtb3JlIHx8ICFtb3JlLmlzX211bHRpKSAmJiAoY2hrID09PSBcIm1vdmVfbm9kZVwiICYmICQuaW5BcnJheShvYmouaWQsIHBhci5jaGlsZHJlbikgPT09IHBvcykpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ2NvcmUnLCAnaWQnIDogJ2NvcmVfMDgnLCAncmVhc29uJyA6ICdNb3Zpbmcgbm9kZSB0byBpdHMgY3VycmVudCBwb3NpdGlvbicsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoKCFtb3JlIHx8ICFtb3JlLmlzX211bHRpKSAmJiAob2JqLmlkID09PSBwYXIuaWQgfHwgKGNoayA9PT0gXCJtb3ZlX25vZGVcIiAmJiAkLmluQXJyYXkob2JqLmlkLCBwYXIuY2hpbGRyZW4pID09PSBwb3MpIHx8ICQuaW5BcnJheShwYXIuaWQsIG9iai5jaGlsZHJlbl9kKSAhPT0gLTEpKSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzAxJywgJ3JlYXNvbicgOiAnTW92aW5nIHBhcmVudCBpbnNpZGUgY2hpbGQnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZih0bXAgJiYgdG1wLmRhdGEpIHsgdG1wID0gdG1wLmRhdGE7IH1cblx0XHRcdGlmKHRtcCAmJiB0bXAuZnVuY3Rpb25zICYmICh0bXAuZnVuY3Rpb25zW2Noa10gPT09IGZhbHNlIHx8IHRtcC5mdW5jdGlvbnNbY2hrXSA9PT0gdHJ1ZSkpIHtcblx0XHRcdFx0aWYodG1wLmZ1bmN0aW9uc1tjaGtdID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wMicsICdyZWFzb24nIDogJ05vZGUgZGF0YSBwcmV2ZW50cyBmdW5jdGlvbjogJyArIGNoaywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0bXAuZnVuY3Rpb25zW2Noa107XG5cdFx0XHR9XG5cdFx0XHRpZihjaGMgPT09IGZhbHNlIHx8ICgkLnZha2F0YS5pc19mdW5jdGlvbihjaGMpICYmIGNoYy5jYWxsKHRoaXMsIGNoaywgb2JqLCBwYXIsIHBvcywgbW9yZSkgPT09IGZhbHNlKSB8fCAoY2hjICYmIGNoY1tjaGtdID09PSBmYWxzZSkpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzAzJywgJ3JlYXNvbicgOiAnVXNlciBjb25maWcgZm9yIGNvcmUuY2hlY2tfY2FsbGJhY2sgcHJldmVudHMgZnVuY3Rpb246ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgdGhlIGxhc3QgZXJyb3Jcblx0XHQgKiBAbmFtZSBsYXN0X2Vycm9yKClcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0bGFzdF9lcnJvciA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcjtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIG1vdmUgYSBub2RlIHRvIGEgbmV3IHBhcmVudFxuXHRcdCAqIEBuYW1lIG1vdmVfbm9kZShvYmosIHBhciBbLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWRdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGUgdG8gbW92ZSwgcGFzcyBhbiBhcnJheSB0byBtb3ZlIG11bHRpcGxlIG5vZGVzXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IHBhciB0aGUgbmV3IHBhcmVudFxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwb3MgdGhlIHBvc2l0aW9uIHRvIGluc2VydCBhdCAoYmVzaWRlcyBpbnRlZ2VyIHZhbHVlcywgXCJmaXJzdFwiIGFuZCBcImxhc3RcIiBhcmUgc3VwcG9ydGVkLCBhcyB3ZWxsIGFzIFwiYmVmb3JlXCIgYW5kIFwiYWZ0ZXJcIiksIGRlZmF1bHRzIHRvIGludGVnZXIgYDBgXG5cdFx0ICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gY2FsbCBvbmNlIHRoZSBtb3ZlIGlzIGNvbXBsZXRlZCwgcmVjZWl2ZXMgMyBhcmd1bWVudHMgLSB0aGUgbm9kZSwgdGhlIG5ldyBwYXJlbnQgYW5kIHRoZSBwb3NpdGlvblxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IGlzX2xvYWRlZCBpbnRlcm5hbCBwYXJhbWV0ZXIgaW5kaWNhdGluZyBpZiB0aGUgcGFyZW50IG5vZGUgaGFzIGJlZW4gbG9hZGVkXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcF9yZWRyYXcgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIHRyZWUgc2hvdWxkIGJlIHJlZHJhd25cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBpbnN0YW5jZSBpbnRlcm5hbCBwYXJhbWV0ZXIgaW5kaWNhdGluZyBpZiB0aGUgbm9kZSBjb21lcyBmcm9tIGFub3RoZXIgaW5zdGFuY2Vcblx0XHQgKiBAdHJpZ2dlciBtb3ZlX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0bW92ZV9ub2RlIDogZnVuY3Rpb24gKG9iaiwgcGFyLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQsIHNraXBfcmVkcmF3LCBvcmlnaW4pIHtcblx0XHRcdHZhciB0MSwgdDIsIG9sZF9wYXIsIG9sZF9wb3MsIG5ld19wYXIsIG9sZF9pbnMsIGlzX211bHRpLCBkcGMsIHRtcCwgaSwgaiwgaywgbCwgcDtcblxuXHRcdFx0cGFyID0gdGhpcy5nZXRfbm9kZShwYXIpO1xuXHRcdFx0cG9zID0gcG9zID09PSB1bmRlZmluZWQgPyAwIDogcG9zO1xuXHRcdFx0aWYoIXBhcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKCFwb3MudG9TdHJpbmcoKS5tYXRjaCgvXihiZWZvcmV8YWZ0ZXIpJC8pICYmICFpc19sb2FkZWQgJiYgIXRoaXMuaXNfbG9hZGVkKHBhcikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMubG9hZF9ub2RlKHBhciwgZnVuY3Rpb24gKCkgeyB0aGlzLm1vdmVfbm9kZShvYmosIHBhciwgcG9zLCBjYWxsYmFjaywgdHJ1ZSwgZmFsc2UsIG9yaWdpbik7IH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdGlmKG9iai5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0XHRvYmogPSBvYmpbMF07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Ly9vYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHRcdGlmKCh0bXAgPSB0aGlzLm1vdmVfbm9kZShvYmpbdDFdLCBwYXIsIHBvcywgY2FsbGJhY2ssIGlzX2xvYWRlZCwgZmFsc2UsIG9yaWdpbikpKSB7XG5cdFx0XHRcdFx0XHRcdHBhciA9IHRtcDtcblx0XHRcdFx0XHRcdFx0cG9zID0gXCJhZnRlclwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvYmogPSBvYmogJiYgb2JqLmlkID8gb2JqIDogdGhpcy5nZXRfbm9kZShvYmopO1xuXG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0b2xkX3BhciA9IChvYmoucGFyZW50IHx8ICQuanN0cmVlLnJvb3QpLnRvU3RyaW5nKCk7XG5cdFx0XHRuZXdfcGFyID0gKCFwb3MudG9TdHJpbmcoKS5tYXRjaCgvXihiZWZvcmV8YWZ0ZXIpJC8pIHx8IHBhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkgPyBwYXIgOiB0aGlzLmdldF9ub2RlKHBhci5wYXJlbnQpO1xuXHRcdFx0b2xkX2lucyA9IG9yaWdpbiA/IG9yaWdpbiA6ICh0aGlzLl9tb2RlbC5kYXRhW29iai5pZF0gPyB0aGlzIDogJC5qc3RyZWUucmVmZXJlbmNlKG9iai5pZCkpO1xuXHRcdFx0aXNfbXVsdGkgPSAhb2xkX2lucyB8fCAhb2xkX2lucy5faWQgfHwgKHRoaXMuX2lkICE9PSBvbGRfaW5zLl9pZCk7XG5cdFx0XHRvbGRfcG9zID0gb2xkX2lucyAmJiBvbGRfaW5zLl9pZCAmJiBvbGRfcGFyICYmIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0gJiYgb2xkX2lucy5fbW9kZWwuZGF0YVtvbGRfcGFyXS5jaGlsZHJlbiA/ICQuaW5BcnJheShvYmouaWQsIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4pIDogLTE7XG5cdFx0XHRpZihvbGRfaW5zICYmIG9sZF9pbnMuX2lkKSB7XG5cdFx0XHRcdG9iaiA9IG9sZF9pbnMuX21vZGVsLmRhdGFbb2JqLmlkXTtcblx0XHRcdH1cblxuXHRcdFx0aWYoaXNfbXVsdGkpIHtcblx0XHRcdFx0aWYoKHRtcCA9IHRoaXMuY29weV9ub2RlKG9iaiwgcGFyLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQsIGZhbHNlLCBvcmlnaW4pKSkge1xuXHRcdFx0XHRcdGlmKG9sZF9pbnMpIHsgb2xkX2lucy5kZWxldGVfbm9kZShvYmopOyB9XG5cdFx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHQvL3ZhciBtID0gdGhpcy5fbW9kZWwuZGF0YTtcblx0XHRcdGlmKHBhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRpZihwb3MgPT09IFwiYmVmb3JlXCIpIHsgcG9zID0gXCJmaXJzdFwiOyB9XG5cdFx0XHRcdGlmKHBvcyA9PT0gXCJhZnRlclwiKSB7IHBvcyA9IFwibGFzdFwiOyB9XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2gocG9zKSB7XG5cdFx0XHRcdGNhc2UgXCJiZWZvcmVcIjpcblx0XHRcdFx0XHRwb3MgPSAkLmluQXJyYXkocGFyLmlkLCBuZXdfcGFyLmNoaWxkcmVuKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFmdGVyXCIgOlxuXHRcdFx0XHRcdHBvcyA9ICQuaW5BcnJheShwYXIuaWQsIG5ld19wYXIuY2hpbGRyZW4pICsgMTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImluc2lkZVwiOlxuXHRcdFx0XHRjYXNlIFwiZmlyc3RcIjpcblx0XHRcdFx0XHRwb3MgPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibGFzdFwiOlxuXHRcdFx0XHRcdHBvcyA9IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGlmKCFwb3MpIHsgcG9zID0gMDsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYocG9zID4gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGgpIHsgcG9zID0gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGg7IH1cblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwibW92ZV9ub2RlXCIsIG9iaiwgbmV3X3BhciwgcG9zLCB7ICdjb3JlJyA6IHRydWUsICdvcmlnaW4nIDogb3JpZ2luLCAnaXNfbXVsdGknIDogKG9sZF9pbnMgJiYgb2xkX2lucy5faWQgJiYgb2xkX2lucy5faWQgIT09IHRoaXMuX2lkKSwgJ2lzX2ZvcmVpZ24nIDogKCFvbGRfaW5zIHx8ICFvbGRfaW5zLl9pZCkgfSkpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihvYmoucGFyZW50ID09PSBuZXdfcGFyLmlkKSB7XG5cdFx0XHRcdGRwYyA9IG5ld19wYXIuY2hpbGRyZW4uY29uY2F0KCk7XG5cdFx0XHRcdHRtcCA9ICQuaW5BcnJheShvYmouaWQsIGRwYyk7XG5cdFx0XHRcdGlmKHRtcCAhPT0gLTEpIHtcblx0XHRcdFx0XHRkcGMgPSAkLnZha2F0YS5hcnJheV9yZW1vdmUoZHBjLCB0bXApO1xuXHRcdFx0XHRcdGlmKHBvcyA+IHRtcCkgeyBwb3MtLTsgfVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRtcCA9IFtdO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkcGMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0dG1wW2kgPj0gcG9zID8gaSsxIDogaV0gPSBkcGNbaV07XG5cdFx0XHRcdH1cblx0XHRcdFx0dG1wW3Bvc10gPSBvYmouaWQ7XG5cdFx0XHRcdG5ld19wYXIuY2hpbGRyZW4gPSB0bXA7XG5cdFx0XHRcdHRoaXMuX25vZGVfY2hhbmdlZChuZXdfcGFyLmlkKTtcblx0XHRcdFx0dGhpcy5yZWRyYXcobmV3X3Bhci5pZCA9PT0gJC5qc3RyZWUucm9vdCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly8gY2xlYW4gb2xkIHBhcmVudCBhbmQgdXBcblx0XHRcdFx0dG1wID0gb2JqLmNoaWxkcmVuX2QuY29uY2F0KCk7XG5cdFx0XHRcdHRtcC5wdXNoKG9iai5pZCk7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0XHRcdHAgPSBvbGRfaW5zLl9tb2RlbC5kYXRhW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kO1xuXHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IHAubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0XHRpZigkLmluQXJyYXkocFtrXSwgdG1wKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0ZHBjLnB1c2gocFtrXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9sZF9pbnMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSBkcGM7XG5cdFx0XHRcdH1cblx0XHRcdFx0b2xkX2lucy5fbW9kZWwuZGF0YVtvbGRfcGFyXS5jaGlsZHJlbiA9ICQudmFrYXRhLmFycmF5X3JlbW92ZV9pdGVtKG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4sIG9iai5pZCk7XG5cblx0XHRcdFx0Ly8gaW5zZXJ0IGludG8gbmV3IHBhcmVudCBhbmQgdXBcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gbmV3X3Bhci5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbbmV3X3Bhci5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gdGhpcy5fbW9kZWwuZGF0YVtuZXdfcGFyLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QuY29uY2F0KHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZHBjID0gW107XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0ZHBjW2kgPj0gcG9zID8gaSsxIDogaV0gPSBuZXdfcGFyLmNoaWxkcmVuW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRwY1twb3NdID0gb2JqLmlkO1xuXHRcdFx0XHRuZXdfcGFyLmNoaWxkcmVuID0gZHBjO1xuXHRcdFx0XHRuZXdfcGFyLmNoaWxkcmVuX2QucHVzaChvYmouaWQpO1xuXHRcdFx0XHRuZXdfcGFyLmNoaWxkcmVuX2QgPSBuZXdfcGFyLmNoaWxkcmVuX2QuY29uY2F0KG9iai5jaGlsZHJlbl9kKTtcblxuXHRcdFx0XHQvLyB1cGRhdGUgb2JqZWN0XG5cdFx0XHRcdG9iai5wYXJlbnQgPSBuZXdfcGFyLmlkO1xuXHRcdFx0XHR0bXAgPSBuZXdfcGFyLnBhcmVudHMuY29uY2F0KCk7XG5cdFx0XHRcdHRtcC51bnNoaWZ0KG5ld19wYXIuaWQpO1xuXHRcdFx0XHRwID0gb2JqLnBhcmVudHMubGVuZ3RoO1xuXHRcdFx0XHRvYmoucGFyZW50cyA9IHRtcDtcblxuXHRcdFx0XHQvLyB1cGRhdGUgb2JqZWN0IGNoaWxkcmVuXG5cdFx0XHRcdHRtcCA9IHRtcC5jb25jYXQoKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtpXV0ucGFyZW50cyA9IHRoaXMuX21vZGVsLmRhdGFbb2JqLmNoaWxkcmVuX2RbaV1dLnBhcmVudHMuc2xpY2UoMCxwKi0xKTtcblx0XHRcdFx0XHRBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseSh0aGlzLl9tb2RlbC5kYXRhW29iai5jaGlsZHJlbl9kW2ldXS5wYXJlbnRzLCB0bXApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYob2xkX3BhciA9PT0gJC5qc3RyZWUucm9vdCB8fCBuZXdfcGFyLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCF0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdykge1xuXHRcdFx0XHRcdHRoaXMuX25vZGVfY2hhbmdlZChvbGRfcGFyKTtcblx0XHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQobmV3X3Bhci5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBvYmosIG5ld19wYXIsIHBvcyk7IH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIG1vdmVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIG1vdmVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBwYXJlbnQncyBJRFxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBvc2l0aW9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgbm9kZSBhbW9uZyB0aGUgcGFyZW50J3MgY2hpbGRyZW5cblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBvbGRfcGFyZW50IHRoZSBvbGQgcGFyZW50IG9mIHRoZSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gb2xkX3Bvc2l0aW9uIHRoZSBvbGQgcG9zaXRpb24gb2YgdGhlIG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNfbXVsdGkgZG8gdGhlIG5vZGUgYW5kIG5ldyBwYXJlbnQgYmVsb25nIHRvIGRpZmZlcmVudCBpbnN0YW5jZXNcblx0XHRcdCAqIEBwYXJhbSB7anNUcmVlfSBvbGRfaW5zdGFuY2UgdGhlIGluc3RhbmNlIHRoZSBub2RlIGNhbWUgZnJvbVxuXHRcdFx0ICogQHBhcmFtIHtqc1RyZWV9IG5ld19pbnN0YW5jZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIG5ldyBwYXJlbnRcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdtb3ZlX25vZGUnLCB7IFwibm9kZVwiIDogb2JqLCBcInBhcmVudFwiIDogbmV3X3Bhci5pZCwgXCJwb3NpdGlvblwiIDogcG9zLCBcIm9sZF9wYXJlbnRcIiA6IG9sZF9wYXIsIFwib2xkX3Bvc2l0aW9uXCIgOiBvbGRfcG9zLCAnaXNfbXVsdGknIDogKG9sZF9pbnMgJiYgb2xkX2lucy5faWQgJiYgb2xkX2lucy5faWQgIT09IHRoaXMuX2lkKSwgJ2lzX2ZvcmVpZ24nIDogKCFvbGRfaW5zIHx8ICFvbGRfaW5zLl9pZCksICdvbGRfaW5zdGFuY2UnIDogb2xkX2lucywgJ25ld19pbnN0YW5jZScgOiB0aGlzIH0pO1xuXHRcdFx0cmV0dXJuIG9iai5pZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNvcHkgYSBub2RlIHRvIGEgbmV3IHBhcmVudFxuXHRcdCAqIEBuYW1lIGNvcHlfbm9kZShvYmosIHBhciBbLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWRdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGUgdG8gY29weSwgcGFzcyBhbiBhcnJheSB0byBjb3B5IG11bHRpcGxlIG5vZGVzXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IHBhciB0aGUgbmV3IHBhcmVudFxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwb3MgdGhlIHBvc2l0aW9uIHRvIGluc2VydCBhdCAoYmVzaWRlcyBpbnRlZ2VyIHZhbHVlcywgXCJmaXJzdFwiIGFuZCBcImxhc3RcIiBhcmUgc3VwcG9ydGVkLCBhcyB3ZWxsIGFzIFwiYmVmb3JlXCIgYW5kIFwiYWZ0ZXJcIiksIGRlZmF1bHRzIHRvIGludGVnZXIgYDBgXG5cdFx0ICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gY2FsbCBvbmNlIHRoZSBtb3ZlIGlzIGNvbXBsZXRlZCwgcmVjZWl2ZXMgMyBhcmd1bWVudHMgLSB0aGUgbm9kZSwgdGhlIG5ldyBwYXJlbnQgYW5kIHRoZSBwb3NpdGlvblxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IGlzX2xvYWRlZCBpbnRlcm5hbCBwYXJhbWV0ZXIgaW5kaWNhdGluZyBpZiB0aGUgcGFyZW50IG5vZGUgaGFzIGJlZW4gbG9hZGVkXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcF9yZWRyYXcgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIHRyZWUgc2hvdWxkIGJlIHJlZHJhd25cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBpbnN0YW5jZSBpbnRlcm5hbCBwYXJhbWV0ZXIgaW5kaWNhdGluZyBpZiB0aGUgbm9kZSBjb21lcyBmcm9tIGFub3RoZXIgaW5zdGFuY2Vcblx0XHQgKiBAdHJpZ2dlciBtb2RlbC5qc3RyZWUgY29weV9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGNvcHlfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHBhciwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkLCBza2lwX3JlZHJhdywgb3JpZ2luKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBkcGMsIHRtcCwgaSwgaiwgbm9kZSwgb2xkX3BhciwgbmV3X3Bhciwgb2xkX2lucywgaXNfbXVsdGk7XG5cblx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUocGFyKTtcblx0XHRcdHBvcyA9IHBvcyA9PT0gdW5kZWZpbmVkID8gMCA6IHBvcztcblx0XHRcdGlmKCFwYXIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZighcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSAmJiAhaXNfbG9hZGVkICYmICF0aGlzLmlzX2xvYWRlZChwYXIpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmxvYWRfbm9kZShwYXIsIGZ1bmN0aW9uICgpIHsgdGhpcy5jb3B5X25vZGUob2JqLCBwYXIsIHBvcywgY2FsbGJhY2ssIHRydWUsIGZhbHNlLCBvcmlnaW4pOyB9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRpZihvYmoubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0b2JqID0gb2JqWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vb2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0XHRpZigodG1wID0gdGhpcy5jb3B5X25vZGUob2JqW3QxXSwgcGFyLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQsIHRydWUsIG9yaWdpbikpKSB7XG5cdFx0XHRcdFx0XHRcdHBhciA9IHRtcDtcblx0XHRcdFx0XHRcdFx0cG9zID0gXCJhZnRlclwiO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRvYmogPSBvYmogJiYgb2JqLmlkID8gb2JqIDogdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdG9sZF9wYXIgPSAob2JqLnBhcmVudCB8fCAkLmpzdHJlZS5yb290KS50b1N0cmluZygpO1xuXHRcdFx0bmV3X3BhciA9ICghcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSB8fCBwYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpID8gcGFyIDogdGhpcy5nZXRfbm9kZShwYXIucGFyZW50KTtcblx0XHRcdG9sZF9pbnMgPSBvcmlnaW4gPyBvcmlnaW4gOiAodGhpcy5fbW9kZWwuZGF0YVtvYmouaWRdID8gdGhpcyA6ICQuanN0cmVlLnJlZmVyZW5jZShvYmouaWQpKTtcblx0XHRcdGlzX211bHRpID0gIW9sZF9pbnMgfHwgIW9sZF9pbnMuX2lkIHx8ICh0aGlzLl9pZCAhPT0gb2xkX2lucy5faWQpO1xuXG5cdFx0XHRpZihvbGRfaW5zICYmIG9sZF9pbnMuX2lkKSB7XG5cdFx0XHRcdG9iaiA9IG9sZF9pbnMuX21vZGVsLmRhdGFbb2JqLmlkXTtcblx0XHRcdH1cblxuXHRcdFx0aWYocGFyLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdGlmKHBvcyA9PT0gXCJiZWZvcmVcIikgeyBwb3MgPSBcImZpcnN0XCI7IH1cblx0XHRcdFx0aWYocG9zID09PSBcImFmdGVyXCIpIHsgcG9zID0gXCJsYXN0XCI7IH1cblx0XHRcdH1cblx0XHRcdHN3aXRjaChwb3MpIHtcblx0XHRcdFx0Y2FzZSBcImJlZm9yZVwiOlxuXHRcdFx0XHRcdHBvcyA9ICQuaW5BcnJheShwYXIuaWQsIG5ld19wYXIuY2hpbGRyZW4pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWZ0ZXJcIiA6XG5cdFx0XHRcdFx0cG9zID0gJC5pbkFycmF5KHBhci5pZCwgbmV3X3Bhci5jaGlsZHJlbikgKyAxO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiaW5zaWRlXCI6XG5cdFx0XHRcdGNhc2UgXCJmaXJzdFwiOlxuXHRcdFx0XHRcdHBvcyA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJsYXN0XCI6XG5cdFx0XHRcdFx0cG9zID0gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGg7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aWYoIXBvcykgeyBwb3MgPSAwOyB9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZihwb3MgPiBuZXdfcGFyLmNoaWxkcmVuLmxlbmd0aCkgeyBwb3MgPSBuZXdfcGFyLmNoaWxkcmVuLmxlbmd0aDsgfVxuXHRcdFx0aWYoIXRoaXMuY2hlY2soXCJjb3B5X25vZGVcIiwgb2JqLCBuZXdfcGFyLCBwb3MsIHsgJ2NvcmUnIDogdHJ1ZSwgJ29yaWdpbicgOiBvcmlnaW4sICdpc19tdWx0aScgOiAob2xkX2lucyAmJiBvbGRfaW5zLl9pZCAmJiBvbGRfaW5zLl9pZCAhPT0gdGhpcy5faWQpLCAnaXNfZm9yZWlnbicgOiAoIW9sZF9pbnMgfHwgIW9sZF9pbnMuX2lkKSB9KSkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdG5vZGUgPSBvbGRfaW5zID8gb2xkX2lucy5nZXRfanNvbihvYmosIHsgbm9faWQgOiB0cnVlLCBub19kYXRhIDogdHJ1ZSwgbm9fc3RhdGUgOiB0cnVlIH0pIDogb2JqO1xuXHRcdFx0aWYoIW5vZGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZihub2RlLmlkID09PSB0cnVlKSB7IGRlbGV0ZSBub2RlLmlkOyB9XG5cdFx0XHRub2RlID0gdGhpcy5fcGFyc2VfbW9kZWxfZnJvbV9qc29uKG5vZGUsIG5ld19wYXIuaWQsIG5ld19wYXIucGFyZW50cy5jb25jYXQoKSk7XG5cdFx0XHRpZighbm9kZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUobm9kZSk7XG5cdFx0XHRpZihvYmogJiYgb2JqLnN0YXRlICYmIG9iai5zdGF0ZS5sb2FkZWQgPT09IGZhbHNlKSB7IHRtcC5zdGF0ZS5sb2FkZWQgPSBmYWxzZTsgfVxuXHRcdFx0ZHBjID0gW107XG5cdFx0XHRkcGMucHVzaChub2RlKTtcblx0XHRcdGRwYyA9IGRwYy5jb25jYXQodG1wLmNoaWxkcmVuX2QpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdtb2RlbCcsIHsgXCJub2Rlc1wiIDogZHBjLCBcInBhcmVudFwiIDogbmV3X3Bhci5pZCB9KTtcblxuXHRcdFx0Ly8gaW5zZXJ0IGludG8gbmV3IHBhcmVudCBhbmQgdXBcblx0XHRcdGZvcihpID0gMCwgaiA9IG5ld19wYXIucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVtuZXdfcGFyLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSB0aGlzLl9tb2RlbC5kYXRhW25ld19wYXIucGFyZW50c1tpXV0uY2hpbGRyZW5fZC5jb25jYXQoZHBjKTtcblx0XHRcdH1cblx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0ZHBjW2kgPj0gcG9zID8gaSsxIDogaV0gPSBuZXdfcGFyLmNoaWxkcmVuW2ldO1xuXHRcdFx0fVxuXHRcdFx0ZHBjW3Bvc10gPSB0bXAuaWQ7XG5cdFx0XHRuZXdfcGFyLmNoaWxkcmVuID0gZHBjO1xuXHRcdFx0bmV3X3Bhci5jaGlsZHJlbl9kLnB1c2godG1wLmlkKTtcblx0XHRcdG5ld19wYXIuY2hpbGRyZW5fZCA9IG5ld19wYXIuY2hpbGRyZW5fZC5jb25jYXQodG1wLmNoaWxkcmVuX2QpO1xuXG5cdFx0XHRpZihuZXdfcGFyLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmKCF0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdykge1xuXHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQobmV3X3Bhci5pZCk7XG5cdFx0XHR9XG5cdFx0XHRpZighc2tpcF9yZWRyYXcpIHtcblx0XHRcdFx0dGhpcy5yZWRyYXcobmV3X3Bhci5pZCA9PT0gJC5qc3RyZWUucm9vdCk7XG5cdFx0XHR9XG5cdFx0XHRpZihjYWxsYmFjaykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIHRtcCwgbmV3X3BhciwgcG9zKTsgfVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgY29waWVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNvcHlfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBjb3BpZWQgbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsIHRoZSBvcmlnaW5hbCBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBwYXJlbnQncyBJRFxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHBvc2l0aW9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgbm9kZSBhbW9uZyB0aGUgcGFyZW50J3MgY2hpbGRyZW5cblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBvbGRfcGFyZW50IHRoZSBvbGQgcGFyZW50IG9mIHRoZSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0gb2xkX3Bvc2l0aW9uIHRoZSBwb3NpdGlvbiBvZiB0aGUgb3JpZ2luYWwgbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtCb29sZWFufSBpc19tdWx0aSBkbyB0aGUgbm9kZSBhbmQgbmV3IHBhcmVudCBiZWxvbmcgdG8gZGlmZmVyZW50IGluc3RhbmNlc1xuXHRcdFx0ICogQHBhcmFtIHtqc1RyZWV9IG9sZF9pbnN0YW5jZSB0aGUgaW5zdGFuY2UgdGhlIG5vZGUgY2FtZSBmcm9tXG5cdFx0XHQgKiBAcGFyYW0ge2pzVHJlZX0gbmV3X2luc3RhbmNlIHRoZSBpbnN0YW5jZSBvZiB0aGUgbmV3IHBhcmVudFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2NvcHlfbm9kZScsIHsgXCJub2RlXCIgOiB0bXAsIFwib3JpZ2luYWxcIiA6IG9iaiwgXCJwYXJlbnRcIiA6IG5ld19wYXIuaWQsIFwicG9zaXRpb25cIiA6IHBvcywgXCJvbGRfcGFyZW50XCIgOiBvbGRfcGFyLCBcIm9sZF9wb3NpdGlvblwiIDogb2xkX2lucyAmJiBvbGRfaW5zLl9pZCAmJiBvbGRfcGFyICYmIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0gJiYgb2xkX2lucy5fbW9kZWwuZGF0YVtvbGRfcGFyXS5jaGlsZHJlbiA/ICQuaW5BcnJheShvYmouaWQsIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4pIDogLTEsJ2lzX211bHRpJyA6IChvbGRfaW5zICYmIG9sZF9pbnMuX2lkICYmIG9sZF9pbnMuX2lkICE9PSB0aGlzLl9pZCksICdpc19mb3JlaWduJyA6ICghb2xkX2lucyB8fCAhb2xkX2lucy5faWQpLCAnb2xkX2luc3RhbmNlJyA6IG9sZF9pbnMsICduZXdfaW5zdGFuY2UnIDogdGhpcyB9KTtcblx0XHRcdHJldHVybiB0bXAuaWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjdXQgYSBub2RlIChhIGxhdGVyIGNhbGwgdG8gYHBhc3RlKG9iailgIHdvdWxkIG1vdmUgdGhlIG5vZGUpXG5cdFx0ICogQG5hbWUgY3V0KG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIG11bHRpcGxlIG9iamVjdHMgY2FuIGJlIHBhc3NlZCB1c2luZyBhbiBhcnJheVxuXHRcdCAqIEB0cmlnZ2VyIGN1dC5qc3RyZWVcblx0XHQgKi9cblx0XHRjdXQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRpZighb2JqKSB7IG9iaiA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQoKTsgfVxuXHRcdFx0aWYoISQudmFrYXRhLmlzX2FycmF5KG9iaikpIHsgb2JqID0gW29ial07IH1cblx0XHRcdGlmKCFvYmoubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIHRtcCA9IFtdLCBvLCB0MSwgdDI7XG5cdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0byA9IHRoaXMuZ2V0X25vZGUob2JqW3QxXSk7XG5cdFx0XHRcdGlmKG8gJiYgby5pZCAmJiBvLmlkICE9PSAkLmpzdHJlZS5yb290KSB7IHRtcC5wdXNoKG8pOyB9XG5cdFx0XHR9XG5cdFx0XHRpZighdG1wLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGNjcF9ub2RlID0gdG1wO1xuXHRcdFx0Y2NwX2luc3QgPSB0aGlzO1xuXHRcdFx0Y2NwX21vZGUgPSAnbW92ZV9ub2RlJztcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gbm9kZXMgYXJlIGFkZGVkIHRvIHRoZSBidWZmZXIgZm9yIG1vdmluZ1xuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjdXQuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBub2RlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignY3V0JywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNvcHkgYSBub2RlIChhIGxhdGVyIGNhbGwgdG8gYHBhc3RlKG9iailgIHdvdWxkIGNvcHkgdGhlIG5vZGUpXG5cdFx0ICogQG5hbWUgY29weShvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiBtdWx0aXBsZSBvYmplY3RzIGNhbiBiZSBwYXNzZWQgdXNpbmcgYW4gYXJyYXlcblx0XHQgKiBAdHJpZ2dlciBjb3B5LmpzdHJlZVxuXHRcdCAqL1xuXHRcdGNvcHkgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRpZighb2JqKSB7IG9iaiA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQoKTsgfVxuXHRcdFx0aWYoISQudmFrYXRhLmlzX2FycmF5KG9iaikpIHsgb2JqID0gW29ial07IH1cblx0XHRcdGlmKCFvYmoubGVuZ3RoKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIHRtcCA9IFtdLCBvLCB0MSwgdDI7XG5cdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0byA9IHRoaXMuZ2V0X25vZGUob2JqW3QxXSk7XG5cdFx0XHRcdGlmKG8gJiYgby5pZCAmJiBvLmlkICE9PSAkLmpzdHJlZS5yb290KSB7IHRtcC5wdXNoKG8pOyB9XG5cdFx0XHR9XG5cdFx0XHRpZighdG1wLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGNjcF9ub2RlID0gdG1wO1xuXHRcdFx0Y2NwX2luc3QgPSB0aGlzO1xuXHRcdFx0Y2NwX21vZGUgPSAnY29weV9ub2RlJztcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gbm9kZXMgYXJlIGFkZGVkIHRvIHRoZSBidWZmZXIgZm9yIGNvcHlpbmdcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgY29weS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjb3B5JywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgY3VycmVudCBidWZmZXIgKGFueSBub2RlcyB0aGF0IGFyZSB3YWl0aW5nIGZvciBhIHBhc3RlIG9wZXJhdGlvbilcblx0XHQgKiBAbmFtZSBnZXRfYnVmZmVyKClcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9IGFuIG9iamVjdCBjb25zaXN0aW5nIG9mIGBtb2RlYCAoXCJjb3B5X25vZGVcIiBvciBcIm1vdmVfbm9kZVwiKSwgYG5vZGVgIChhbiBhcnJheSBvZiBvYmplY3RzKSBhbmQgYGluc3RgICh0aGUgaW5zdGFuY2UpXG5cdFx0ICovXG5cdFx0Z2V0X2J1ZmZlciA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB7ICdtb2RlJyA6IGNjcF9tb2RlLCAnbm9kZScgOiBjY3Bfbm9kZSwgJ2luc3QnIDogY2NwX2luc3QgfTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrIGlmIHRoZXJlIGlzIHNvbWV0aGluZyBpbiB0aGUgYnVmZmVyIHRvIHBhc3RlXG5cdFx0ICogQG5hbWUgY2FuX3Bhc3RlKClcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGNhbl9wYXN0ZSA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjY3BfbW9kZSAhPT0gZmFsc2UgJiYgY2NwX25vZGUgIT09IGZhbHNlOyAvLyAmJiBjY3BfaW5zdC5fbW9kZWwuZGF0YVtjY3Bfbm9kZV07XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjb3B5IG9yIG1vdmUgdGhlIHByZXZpb3VzbHkgY3V0IG9yIGNvcGllZCBub2RlcyB0byBhIG5ldyBwYXJlbnRcblx0XHQgKiBAbmFtZSBwYXN0ZShvYmogWywgcG9zXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBuZXcgcGFyZW50XG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IHBvcyB0aGUgcG9zaXRpb24gdG8gaW5zZXJ0IGF0IChiZXNpZGVzIGludGVnZXIsIFwiZmlyc3RcIiBhbmQgXCJsYXN0XCIgYXJlIHN1cHBvcnRlZCksIGRlZmF1bHRzIHRvIGludGVnZXIgYDBgXG5cdFx0ICogQHRyaWdnZXIgcGFzdGUuanN0cmVlXG5cdFx0ICovXG5cdFx0cGFzdGUgOiBmdW5jdGlvbiAob2JqLCBwb3MpIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgIWNjcF9tb2RlIHx8ICFjY3BfbW9kZS5tYXRjaCgvXihjb3B5X25vZGV8bW92ZV9ub2RlKSQvKSB8fCAhY2NwX25vZGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZih0aGlzW2NjcF9tb2RlXShjY3Bfbm9kZSwgb2JqLCBwb3MsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGNjcF9pbnN0KSkge1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gcGFzdGUgaXMgaW52b2tlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgcGFzdGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBwYXJlbnQgdGhlIElEIG9mIHRoZSByZWNlaXZpbmcgbm9kZVxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBub2RlIHRoZSBub2RlcyBpbiB0aGUgYnVmZmVyXG5cdFx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBtb2RlIHRoZSBwZXJmb3JtZWQgb3BlcmF0aW9uIC0gXCJjb3B5X25vZGVcIiBvciBcIm1vdmVfbm9kZVwiXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3Bhc3RlJywgeyBcInBhcmVudFwiIDogb2JqLmlkLCBcIm5vZGVcIiA6IGNjcF9ub2RlLCBcIm1vZGVcIiA6IGNjcF9tb2RlIH0pO1xuXHRcdFx0fVxuXHRcdFx0Y2NwX25vZGUgPSBmYWxzZTtcblx0XHRcdGNjcF9tb2RlID0gZmFsc2U7XG5cdFx0XHRjY3BfaW5zdCA9IGZhbHNlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2xlYXIgdGhlIGJ1ZmZlciBvZiBwcmV2aW91c2x5IGNvcGllZCBvciBjdXQgbm9kZXNcblx0XHQgKiBAbmFtZSBjbGVhcl9idWZmZXIoKVxuXHRcdCAqIEB0cmlnZ2VyIGNsZWFyX2J1ZmZlci5qc3RyZWVcblx0XHQgKi9cblx0XHRjbGVhcl9idWZmZXIgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjY3Bfbm9kZSA9IGZhbHNlO1xuXHRcdFx0Y2NwX21vZGUgPSBmYWxzZTtcblx0XHRcdGNjcF9pbnN0ID0gZmFsc2U7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIHRoZSBjb3B5IC8gY3V0IGJ1ZmZlciBpcyBjbGVhcmVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNsZWFyX2J1ZmZlci5qc3RyZWVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjbGVhcl9idWZmZXInKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHB1dCBhIG5vZGUgaW4gZWRpdCBtb2RlIChpbnB1dCBmaWVsZCB0byByZW5hbWUgdGhlIG5vZGUpXG5cdFx0ICogQG5hbWUgZWRpdChvYmogWywgZGVmYXVsdF90ZXh0LCBjYWxsYmFja10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gZGVmYXVsdF90ZXh0IHRoZSB0ZXh0IHRvIHBvcHVsYXRlIHRoZSBpbnB1dCB3aXRoIChpZiBvbWl0dGVkIG9yIHNldCB0byBhIG5vbi1zdHJpbmcgdmFsdWUgdGhlIG5vZGUncyB0ZXh0IHZhbHVlIGlzIHVzZWQpXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uY2UgdGhlIHRleHQgYm94IGlzIGJsdXJyZWQsIGl0IGlzIGNhbGxlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSBhbmQgcmVjZWl2ZXMgdGhlIG5vZGUsIGEgc3RhdHVzIHBhcmFtZXRlciAodHJ1ZSBpZiB0aGUgcmVuYW1lIGlzIHN1Y2Nlc3NmdWwsIGZhbHNlIG90aGVyd2lzZSksIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGNhbmNlbGxlZCB0aGUgZWRpdCBhbmQgdGhlIG9yaWdpbmFsIHVuZXNjYXBlZCB2YWx1ZSBwcm92aWRlZCBieSB0aGUgdXNlci4gWW91IGNhbiBhbHNvIGFjY2VzcyB0aGUgbm9kZSdzIHRpdGxlIHVzaW5nIC50ZXh0XG5cdFx0ICovXG5cdFx0ZWRpdCA6IGZ1bmN0aW9uIChvYmosIGRlZmF1bHRfdGV4dCwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBydGwsIHcsIGEsIHMsIHQsIGgxLCBoMiwgZm4sIHRtcCwgY2FuY2VsID0gZmFsc2U7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYoIXRoaXMuY2hlY2soXCJlZGl0XCIsIG9iaiwgdGhpcy5nZXRfcGFyZW50KG9iaikpKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dG1wID0gb2JqO1xuXHRcdFx0ZGVmYXVsdF90ZXh0ID0gdHlwZW9mIGRlZmF1bHRfdGV4dCA9PT0gJ3N0cmluZycgPyBkZWZhdWx0X3RleHQgOiBvYmoudGV4dDtcblx0XHRcdHRoaXMuc2V0X3RleHQob2JqLCBcIlwiKTtcblx0XHRcdG9iaiA9IHRoaXMuX29wZW5fdG8ob2JqKTtcblx0XHRcdHRtcC50ZXh0ID0gZGVmYXVsdF90ZXh0O1xuXG5cdFx0XHRydGwgPSB0aGlzLl9kYXRhLmNvcmUucnRsO1xuXHRcdFx0dyAgPSB0aGlzLmVsZW1lbnQud2lkdGgoKTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID0gdG1wLmlkO1xuXHRcdFx0YSAgPSBvYmouY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdHMgID0gJCgnPHNwYW4+PC9zcGFuPicpO1xuXHRcdFx0LyohXG5cdFx0XHRvaSA9IG9iai5jaGlsZHJlbihcImk6dmlzaWJsZVwiKSxcblx0XHRcdGFpID0gYS5jaGlsZHJlbihcImk6dmlzaWJsZVwiKSxcblx0XHRcdHcxID0gb2kud2lkdGgoKSAqIG9pLmxlbmd0aCxcblx0XHRcdHcyID0gYWkud2lkdGgoKSAqIGFpLmxlbmd0aCxcblx0XHRcdCovXG5cdFx0XHR0ICA9IGRlZmF1bHRfdGV4dDtcblx0XHRcdGgxID0gJChcIjxcIitcImRpdj48L2Rpdj5cIiwgeyBjc3MgOiB7IFwicG9zaXRpb25cIiA6IFwiYWJzb2x1dGVcIiwgXCJ0b3BcIiA6IFwiLTIwMHB4XCIsIFwibGVmdFwiIDogKHJ0bCA/IFwiMHB4XCIgOiBcIi0xMDAwcHhcIiksIFwidmlzaWJpbGl0eVwiIDogXCJoaWRkZW5cIiB9IH0pLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuXHRcdFx0aDIgPSAkKFwiPFwiK1wiaW5wdXQgLz5cIiwge1xuXHRcdFx0XHRcdFx0XCJ2YWx1ZVwiIDogdCxcblx0XHRcdFx0XHRcdFwiY2xhc3NcIiA6IFwianN0cmVlLXJlbmFtZS1pbnB1dFwiLFxuXHRcdFx0XHRcdFx0Ly8gXCJzaXplXCIgOiB0Lmxlbmd0aCxcblx0XHRcdFx0XHRcdFwiY3NzXCIgOiB7XG5cdFx0XHRcdFx0XHRcdFwicGFkZGluZ1wiIDogXCIwXCIsXG5cdFx0XHRcdFx0XHRcdFwiYm9yZGVyXCIgOiBcIjFweCBzb2xpZCBzaWx2ZXJcIixcblx0XHRcdFx0XHRcdFx0XCJib3gtc2l6aW5nXCIgOiBcImJvcmRlci1ib3hcIixcblx0XHRcdFx0XHRcdFx0XCJkaXNwbGF5XCIgOiBcImlubGluZS1ibG9ja1wiLFxuXHRcdFx0XHRcdFx0XHRcImhlaWdodFwiIDogKHRoaXMuX2RhdGEuY29yZS5saV9oZWlnaHQpICsgXCJweFwiLFxuXHRcdFx0XHRcdFx0XHRcImxpbmVIZWlnaHRcIiA6ICh0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0KSArIFwicHhcIixcblx0XHRcdFx0XHRcdFx0XCJ3aWR0aFwiIDogXCIxNTBweFwiIC8vIHdpbGwgYmUgc2V0IGEgYml0IGZ1cnRoZXIgZG93blxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiYmx1clwiIDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHR2YXIgaSA9IHMuY2hpbGRyZW4oXCIuanN0cmVlLXJlbmFtZS1pbnB1dFwiKSxcblx0XHRcdFx0XHRcdFx0XHR2ID0gaS52YWwoKSxcblx0XHRcdFx0XHRcdFx0XHRmID0gdGhpcy5zZXR0aW5ncy5jb3JlLmZvcmNlX3RleHQsXG5cdFx0XHRcdFx0XHRcdFx0bnY7XG5cdFx0XHRcdFx0XHRcdGlmKHYgPT09IFwiXCIpIHsgdiA9IHQ7IH1cblx0XHRcdFx0XHRcdFx0aDEucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdHMucmVwbGFjZVdpdGgoYSk7XG5cdFx0XHRcdFx0XHRcdHMucmVtb3ZlKCk7XG5cdFx0XHRcdFx0XHRcdHQgPSBmID8gdCA6ICQoJzxkaXY+PC9kaXY+JykuYXBwZW5kKCQucGFyc2VIVE1MKHQpKS5odG1sKCk7XG5cdFx0XHRcdFx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5zZXRfdGV4dChvYmosIHQpO1xuXHRcdFx0XHRcdFx0XHRudiA9ICEhdGhpcy5yZW5hbWVfbm9kZShvYmosIGYgPyAkKCc8ZGl2PjwvZGl2PicpLnRleHQodikudGV4dCgpIDogJCgnPGRpdj48L2Rpdj4nKS5hcHBlbmQoJC5wYXJzZUhUTUwodikpLmh0bWwoKSk7XG5cdFx0XHRcdFx0XHRcdGlmKCFudikge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3RleHQob2JqLCB0KTsgLy8gbW92ZSB0aGlzIHVwPyBhbmQgZml4ICM0ODNcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IHRtcC5pZDtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG5vZGUgPSB0aGlzLmdldF9ub2RlKHRtcC5pZCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYobm9kZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID0gdG1wLmlkO1xuXHRcdFx0XHRcdFx0XHRcdFx0bm9kZS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLCAwKTtcblx0XHRcdFx0XHRcdFx0aWYoY2FsbGJhY2spIHtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIHRtcCwgbnYsIGNhbmNlbCwgdik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aDIgPSBudWxsO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRcdFx0XCJrZXlkb3duXCIgOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHR2YXIga2V5ID0gZS53aGljaDtcblx0XHRcdFx0XHRcdFx0aWYoa2V5ID09PSAyNykge1xuXHRcdFx0XHRcdFx0XHRcdGNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy52YWx1ZSA9IHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoa2V5ID09PSAyNyB8fCBrZXkgPT09IDEzIHx8IGtleSA9PT0gMzcgfHwga2V5ID09PSAzOCB8fCBrZXkgPT09IDM5IHx8IGtleSA9PT0gNDAgfHwga2V5ID09PSAzMikge1xuXHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoa2V5ID09PSAyNyB8fCBrZXkgPT09IDEzKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuYmx1cigpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJjbGlja1wiIDogZnVuY3Rpb24gKGUpIHsgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgfSxcblx0XHRcdFx0XHRcdFwibW91c2Vkb3duXCIgOiBmdW5jdGlvbiAoZSkgeyBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpOyB9LFxuXHRcdFx0XHRcdFx0XCJrZXl1cFwiIDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0aDIud2lkdGgoTWF0aC5taW4oaDEudGV4dChcInBXXCIgKyB0aGlzLnZhbHVlKS53aWR0aCgpLHcpKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImtleXByZXNzXCIgOiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0XHRcdGlmKGUud2hpY2ggPT09IDEzKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRmbiA9IHtcblx0XHRcdFx0XHRcdGZvbnRGYW1pbHlcdFx0OiBhLmNzcygnZm9udEZhbWlseScpXHRcdHx8ICcnLFxuXHRcdFx0XHRcdFx0Zm9udFNpemVcdFx0OiBhLmNzcygnZm9udFNpemUnKVx0XHRcdHx8ICcnLFxuXHRcdFx0XHRcdFx0Zm9udFdlaWdodFx0XHQ6IGEuY3NzKCdmb250V2VpZ2h0JylcdFx0fHwgJycsXG5cdFx0XHRcdFx0XHRmb250U3R5bGVcdFx0OiBhLmNzcygnZm9udFN0eWxlJylcdFx0fHwgJycsXG5cdFx0XHRcdFx0XHRmb250U3RyZXRjaFx0XHQ6IGEuY3NzKCdmb250U3RyZXRjaCcpXHRcdHx8ICcnLFxuXHRcdFx0XHRcdFx0Zm9udFZhcmlhbnRcdFx0OiBhLmNzcygnZm9udFZhcmlhbnQnKVx0XHR8fCAnJyxcblx0XHRcdFx0XHRcdGxldHRlclNwYWNpbmdcdDogYS5jc3MoJ2xldHRlclNwYWNpbmcnKVx0fHwgJycsXG5cdFx0XHRcdFx0XHR3b3JkU3BhY2luZ1x0XHQ6IGEuY3NzKCd3b3JkU3BhY2luZycpXHRcdHx8ICcnXG5cdFx0XHRcdH07XG5cdFx0XHRzLmF0dHIoJ2NsYXNzJywgYS5hdHRyKCdjbGFzcycpKS5hcHBlbmQoYS5jb250ZW50cygpLmNsb25lKCkpLmFwcGVuZChoMik7XG5cdFx0XHRhLnJlcGxhY2VXaXRoKHMpO1xuXHRcdFx0aDEuY3NzKGZuKTtcblx0XHRcdGgyLmNzcyhmbikud2lkdGgoTWF0aC5taW4oaDEudGV4dChcInBXXCIgKyBoMlswXS52YWx1ZSkud2lkdGgoKSx3KSlbMF0uc2VsZWN0KCk7XG5cdFx0XHQkKGRvY3VtZW50KS5vbmUoJ21vdXNlZG93bi5qc3RyZWUgdG91Y2hzdGFydC5qc3RyZWUgZG5kX3N0YXJ0LnZha2F0YScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmIChoMiAmJiBlLnRhcmdldCAhPT0gaDIpIHtcblx0XHRcdFx0XHQkKGgyKS50cmlnZ2VyKCdibHVyJyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIGNoYW5nZXMgdGhlIHRoZW1lXG5cdFx0ICogQG5hbWUgc2V0X3RoZW1lKHRoZW1lX25hbWUgWywgdGhlbWVfdXJsXSlcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWVfbmFtZSB0aGUgbmFtZSBvZiB0aGUgbmV3IHRoZW1lIHRvIGFwcGx5XG5cdFx0ICogQHBhcmFtIHttaXhlZH0gdGhlbWVfdXJsICB0aGUgbG9jYXRpb24gb2YgdGhlIENTUyBmaWxlIGZvciB0aGlzIHRoZW1lLiBPbWl0IG9yIHNldCB0byBgZmFsc2VgIGlmIHlvdSBtYW51YWxseSBpbmNsdWRlZCB0aGUgZmlsZS4gU2V0IHRvIGB0cnVlYCB0byBhdXRvbG9hZCBmcm9tIHRoZSBgY29yZS50aGVtZXMuZGlyYCBkaXJlY3RvcnkuXG5cdFx0ICogQHRyaWdnZXIgc2V0X3RoZW1lLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNldF90aGVtZSA6IGZ1bmN0aW9uICh0aGVtZV9uYW1lLCB0aGVtZV91cmwpIHtcblx0XHRcdGlmKCF0aGVtZV9uYW1lKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYodGhlbWVfdXJsID09PSB0cnVlKSB7XG5cdFx0XHRcdHZhciBkaXIgPSB0aGlzLnNldHRpbmdzLmNvcmUudGhlbWVzLmRpcjtcblx0XHRcdFx0aWYoIWRpcikgeyBkaXIgPSAkLmpzdHJlZS5wYXRoICsgJy90aGVtZXMnOyB9XG5cdFx0XHRcdHRoZW1lX3VybCA9IGRpciArICcvJyArIHRoZW1lX25hbWUgKyAnL3N0eWxlLmNzcyc7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGVtZV91cmwgJiYgJC5pbkFycmF5KHRoZW1lX3VybCwgdGhlbWVzX2xvYWRlZCkgPT09IC0xKSB7XG5cdFx0XHRcdCQoJ2hlYWQnKS5hcHBlbmQoJzwnKydsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPVwiJyArIHRoZW1lX3VybCArICdcIiB0eXBlPVwidGV4dC9jc3NcIiAvPicpO1xuXHRcdFx0XHR0aGVtZXNfbG9hZGVkLnB1c2godGhlbWVfdXJsKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMubmFtZSkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2pzdHJlZS0nICsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5uYW1lKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMubmFtZSA9IHRoZW1lX25hbWU7XG5cdFx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2pzdHJlZS0nICsgdGhlbWVfbmFtZSk7XG5cdFx0XHR0aGlzLmVsZW1lbnRbdGhpcy5zZXR0aW5ncy5jb3JlLnRoZW1lcy5yZXNwb25zaXZlID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcycgXSgnanN0cmVlLScgKyB0aGVtZV9uYW1lICsgJy1yZXNwb25zaXZlJyk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgdGhlbWUgaXMgc2V0XG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNldF90aGVtZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSB0aGUgbmV3IHRoZW1lXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2V0X3RoZW1lJywgeyAndGhlbWUnIDogdGhlbWVfbmFtZSB9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBhcHBsaWVkIHRoZW1lIG5hbWVcblx0XHQgKiBAbmFtZSBnZXRfdGhlbWUoKVxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfdGhlbWUgOiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLm5hbWU7IH0sXG5cdFx0LyoqXG5cdFx0ICogY2hhbmdlcyB0aGUgdGhlbWUgdmFyaWFudCAoaWYgdGhlIHRoZW1lIGhhcyB2YXJpYW50cylcblx0XHQgKiBAbmFtZSBzZXRfdGhlbWVfdmFyaWFudCh2YXJpYW50X25hbWUpXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd8Qm9vbGVhbn0gdmFyaWFudF9uYW1lIHRoZSB2YXJpYW50IHRvIGFwcGx5IChpZiBgZmFsc2VgIGlzIHVzZWQgdGhlIGN1cnJlbnQgdmFyaWFudCBpcyByZW1vdmVkKVxuXHRcdCAqL1xuXHRcdHNldF90aGVtZV92YXJpYW50IDogZnVuY3Rpb24gKHZhcmlhbnRfbmFtZSkge1xuXHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLnRoZW1lcy52YXJpYW50KSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5yZW1vdmVDbGFzcygnanN0cmVlLScgKyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLm5hbWUgKyAnLScgKyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnZhcmlhbnQpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy52YXJpYW50ID0gdmFyaWFudF9uYW1lO1xuXHRcdFx0aWYodmFyaWFudF9uYW1lKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcygnanN0cmVlLScgKyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLm5hbWUgKyAnLScgKyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnZhcmlhbnQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0cyB0aGUgbmFtZSBvZiB0aGUgY3VycmVudGx5IGFwcGxpZWQgdGhlbWUgdmFyaWFudFxuXHRcdCAqIEBuYW1lIGdldF90aGVtZSgpXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxuXHRcdCAqL1xuXHRcdGdldF90aGVtZV92YXJpYW50IDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy52YXJpYW50OyB9LFxuXHRcdC8qKlxuXHRcdCAqIHNob3dzIGEgc3RyaXBlZCBiYWNrZ3JvdW5kIG9uIHRoZSBjb250YWluZXIgKGlmIHRoZSB0aGVtZSBzdXBwb3J0cyBpdClcblx0XHQgKiBAbmFtZSBzaG93X3N0cmlwZXMoKVxuXHRcdCAqL1xuXHRcdHNob3dfc3RyaXBlcyA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuc3RyaXBlcyA9IHRydWU7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5hZGRDbGFzcyhcImpzdHJlZS1zdHJpcGVkXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBzdHJpcGVzIGFyZSBzaG93blxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzaG93X3N0cmlwZXMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19zdHJpcGVzJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoaWRlcyB0aGUgc3RyaXBlZCBiYWNrZ3JvdW5kIG9uIHRoZSBjb250YWluZXJcblx0XHQgKiBAbmFtZSBoaWRlX3N0cmlwZXMoKVxuXHRcdCAqL1xuXHRcdGhpZGVfc3RyaXBlcyA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuc3RyaXBlcyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtc3RyaXBlZFwiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gc3RyaXBlcyBhcmUgaGlkZGVuXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGhpZGVfc3RyaXBlcy5qc3RyZWVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdoaWRlX3N0cmlwZXMnKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZXMgdGhlIHN0cmlwZWQgYmFja2dyb3VuZCBvbiB0aGUgY29udGFpbmVyXG5cdFx0ICogQG5hbWUgdG9nZ2xlX3N0cmlwZXMoKVxuXHRcdCAqL1xuXHRcdHRvZ2dsZV9zdHJpcGVzIDogZnVuY3Rpb24gKCkgeyBpZih0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnN0cmlwZXMpIHsgdGhpcy5oaWRlX3N0cmlwZXMoKTsgfSBlbHNlIHsgdGhpcy5zaG93X3N0cmlwZXMoKTsgfSB9LFxuXHRcdC8qKlxuXHRcdCAqIHNob3dzIHRoZSBjb25uZWN0aW5nIGRvdHMgKGlmIHRoZSB0aGVtZSBzdXBwb3J0cyBpdClcblx0XHQgKiBAbmFtZSBzaG93X2RvdHMoKVxuXHRcdCAqL1xuXHRcdHNob3dfZG90cyA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZG90cyA9IHRydWU7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5yZW1vdmVDbGFzcyhcImpzdHJlZS1uby1kb3RzXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBkb3RzIGFyZSBzaG93blxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzaG93X2RvdHMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19kb3RzJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoaWRlcyB0aGUgY29ubmVjdGluZyBkb3RzXG5cdFx0ICogQG5hbWUgaGlkZV9kb3RzKClcblx0XHQgKi9cblx0XHRoaWRlX2RvdHMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKFwianN0cmVlLW5vLWRvdHNcIik7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGRvdHMgYXJlIGhpZGRlblxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBoaWRlX2RvdHMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9kb3RzJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiB0b2dnbGVzIHRoZSBjb25uZWN0aW5nIGRvdHNcblx0XHQgKiBAbmFtZSB0b2dnbGVfZG90cygpXG5cdFx0ICovXG5cdFx0dG9nZ2xlX2RvdHMgOiBmdW5jdGlvbiAoKSB7IGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZG90cykgeyB0aGlzLmhpZGVfZG90cygpOyB9IGVsc2UgeyB0aGlzLnNob3dfZG90cygpOyB9IH0sXG5cdFx0LyoqXG5cdFx0ICogc2hvdyB0aGUgbm9kZSBpY29uc1xuXHRcdCAqIEBuYW1lIHNob3dfaWNvbnMoKVxuXHRcdCAqL1xuXHRcdHNob3dfaWNvbnMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmljb25zID0gdHJ1ZTtcblx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLnJlbW92ZUNsYXNzKFwianN0cmVlLW5vLWljb25zXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBpY29ucyBhcmUgc2hvd25cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2hvd19pY29ucy5qc3RyZWVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdzaG93X2ljb25zJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoaWRlIHRoZSBub2RlIGljb25zXG5cdFx0ICogQG5hbWUgaGlkZV9pY29ucygpXG5cdFx0ICovXG5cdFx0aGlkZV9pY29ucyA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuaWNvbnMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKFwianN0cmVlLW5vLWljb25zXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBpY29ucyBhcmUgaGlkZGVuXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGhpZGVfaWNvbnMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9pY29ucycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlIHRoZSBub2RlIGljb25zXG5cdFx0ICogQG5hbWUgdG9nZ2xlX2ljb25zKClcblx0XHQgKi9cblx0XHR0b2dnbGVfaWNvbnMgOiBmdW5jdGlvbiAoKSB7IGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMuaWNvbnMpIHsgdGhpcy5oaWRlX2ljb25zKCk7IH0gZWxzZSB7IHRoaXMuc2hvd19pY29ucygpOyB9IH0sXG5cdFx0LyoqXG5cdFx0ICogc2hvdyB0aGUgbm9kZSBlbGxpcHNpc1xuXHRcdCAqIEBuYW1lIHNob3dfaWNvbnMoKVxuXHRcdCAqL1xuXHRcdHNob3dfZWxsaXBzaXMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmVsbGlwc2lzID0gdHJ1ZTtcblx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKFwianN0cmVlLWVsbGlwc2lzXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBlbGxpc2lzIGlzIHNob3duXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNob3dfZWxsaXBzaXMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19lbGxpcHNpcycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaGlkZSB0aGUgbm9kZSBlbGxpcHNpc1xuXHRcdCAqIEBuYW1lIGhpZGVfZWxsaXBzaXMoKVxuXHRcdCAqL1xuXHRcdGhpZGVfZWxsaXBzaXMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmVsbGlwc2lzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5yZW1vdmVDbGFzcyhcImpzdHJlZS1lbGxpcHNpc1wiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gZWxsaXNpcyBpcyBoaWRkZW5cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgaGlkZV9lbGxpcHNpcy5qc3RyZWVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdoaWRlX2VsbGlwc2lzJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiB0b2dnbGUgdGhlIG5vZGUgZWxsaXBzaXNcblx0XHQgKiBAbmFtZSB0b2dnbGVfaWNvbnMoKVxuXHRcdCAqL1xuXHRcdHRvZ2dsZV9lbGxpcHNpcyA6IGZ1bmN0aW9uICgpIHsgaWYodGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5lbGxpcHNpcykgeyB0aGlzLmhpZGVfZWxsaXBzaXMoKTsgfSBlbHNlIHsgdGhpcy5zaG93X2VsbGlwc2lzKCk7IH0gfSxcblx0XHQvKipcblx0XHQgKiBzZXQgdGhlIG5vZGUgaWNvbiBmb3IgYSBub2RlXG5cdFx0ICogQG5hbWUgc2V0X2ljb24ob2JqLCBpY29uKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBpY29uIHRoZSBuZXcgaWNvbiAtIGNhbiBiZSBhIHBhdGggdG8gYW4gaWNvbiBvciBhIGNsYXNzTmFtZSwgaWYgdXNpbmcgYW4gaW1hZ2UgdGhhdCBpcyBpbiB0aGUgY3VycmVudCBkaXJlY3RvcnkgdXNlIGEgYC4vYCBwcmVmaXgsIG90aGVyd2lzZSBpdCB3aWxsIGJlIGRldGVjdGVkIGFzIGEgY2xhc3Ncblx0XHQgKi9cblx0XHRzZXRfaWNvbiA6IGZ1bmN0aW9uIChvYmosIGljb24pIHtcblx0XHRcdHZhciB0MSwgdDIsIGRvbSwgb2xkO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRfaWNvbihvYmpbdDFdLCBpY29uKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0b2xkID0gb2JqLmljb247XG5cdFx0XHRvYmouaWNvbiA9IGljb24gPT09IHRydWUgfHwgaWNvbiA9PT0gbnVsbCB8fCBpY29uID09PSB1bmRlZmluZWQgfHwgaWNvbiA9PT0gJycgPyB0cnVlIDogaWNvbjtcblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS10aGVtZWljb25cIik7XG5cdFx0XHRpZihpY29uID09PSBmYWxzZSkge1xuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoJ2pzdHJlZS10aGVtZWljb24tY3VzdG9tICcgKyBvbGQpLmNzcyhcImJhY2tncm91bmRcIixcIlwiKS5yZW1vdmVBdHRyKFwicmVsXCIpO1xuXHRcdFx0XHR0aGlzLmhpZGVfaWNvbihvYmopO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihpY29uID09PSB0cnVlIHx8IGljb24gPT09IG51bGwgfHwgaWNvbiA9PT0gdW5kZWZpbmVkIHx8IGljb24gPT09ICcnKSB7XG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcygnanN0cmVlLXRoZW1laWNvbi1jdXN0b20gJyArIG9sZCkuY3NzKFwiYmFja2dyb3VuZFwiLFwiXCIpLnJlbW92ZUF0dHIoXCJyZWxcIik7XG5cdFx0XHRcdGlmKG9sZCA9PT0gZmFsc2UpIHsgdGhpcy5zaG93X2ljb24ob2JqKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZihpY29uLmluZGV4T2YoXCIvXCIpID09PSAtMSAmJiBpY29uLmluZGV4T2YoXCIuXCIpID09PSAtMSkge1xuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3Mob2xkKS5jc3MoXCJiYWNrZ3JvdW5kXCIsXCJcIik7XG5cdFx0XHRcdGRvbS5hZGRDbGFzcyhpY29uICsgJyBqc3RyZWUtdGhlbWVpY29uLWN1c3RvbScpLmF0dHIoXCJyZWxcIixpY29uKTtcblx0XHRcdFx0aWYob2xkID09PSBmYWxzZSkgeyB0aGlzLnNob3dfaWNvbihvYmopOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG9sZCkuY3NzKFwiYmFja2dyb3VuZFwiLFwiXCIpO1xuXHRcdFx0XHRkb20uYWRkQ2xhc3MoJ2pzdHJlZS10aGVtZWljb24tY3VzdG9tJykuY3NzKFwiYmFja2dyb3VuZFwiLCBcInVybCgnXCIgKyBpY29uICsgXCInKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdFwiKS5hdHRyKFwicmVsXCIsaWNvbik7XG5cdFx0XHRcdGlmKG9sZCA9PT0gZmFsc2UpIHsgdGhpcy5zaG93X2ljb24ob2JqKTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgdGhlIG5vZGUgaWNvbiBmb3IgYSBub2RlXG5cdFx0ICogQG5hbWUgZ2V0X2ljb24ob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfaWNvbiA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHJldHVybiAoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpID8gZmFsc2UgOiBvYmouaWNvbjtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGhpZGUgdGhlIGljb24gb24gYW4gaW5kaXZpZHVhbCBub2RlXG5cdFx0ICogQG5hbWUgaGlkZV9pY29uKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmpcblx0XHQgKi9cblx0XHRoaWRlX2ljb24gOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5oaWRlX2ljb24ob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iaiA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdG9iai5pY29uID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSkuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5jaGlsZHJlbihcIi5qc3RyZWUtdGhlbWVpY29uXCIpLmFkZENsYXNzKCdqc3RyZWUtdGhlbWVpY29uLWhpZGRlbicpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBzaG93IHRoZSBpY29uIG9uIGFuIGluZGl2aWR1YWwgbm9kZVxuXHRcdCAqIEBuYW1lIHNob3dfaWNvbihvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqXG5cdFx0ICovXG5cdFx0c2hvd19pY29uIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0MiwgZG9tO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5zaG93X2ljb24ob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iaiA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdG9iai5pY29uID0gZG9tLmxlbmd0aCA/IGRvbS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS10aGVtZWljb25cIikuYXR0cigncmVsJykgOiB0cnVlO1xuXHRcdFx0aWYoIW9iai5pY29uKSB7IG9iai5pY29uID0gdHJ1ZTsgfVxuXHRcdFx0ZG9tLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuY2hpbGRyZW4oXCIuanN0cmVlLXRoZW1laWNvblwiKS5yZW1vdmVDbGFzcygnanN0cmVlLXRoZW1laWNvbi1oaWRkZW4nKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fTtcblxuXHQvLyBoZWxwZXJzXG5cdCQudmFrYXRhID0ge307XG5cdC8vIGNvbGxlY3QgYXR0cmlidXRlc1xuXHQkLnZha2F0YS5hdHRyaWJ1dGVzID0gZnVuY3Rpb24obm9kZSwgd2l0aF92YWx1ZXMpIHtcblx0XHRub2RlID0gJChub2RlKVswXTtcblx0XHR2YXIgYXR0ciA9IHdpdGhfdmFsdWVzID8ge30gOiBbXTtcblx0XHRpZihub2RlICYmIG5vZGUuYXR0cmlidXRlcykge1xuXHRcdFx0JC5lYWNoKG5vZGUuYXR0cmlidXRlcywgZnVuY3Rpb24gKGksIHYpIHtcblx0XHRcdFx0aWYoJC5pbkFycmF5KHYubmFtZS50b0xvd2VyQ2FzZSgpLFsnc3R5bGUnLCdjb250ZW50ZWRpdGFibGUnLCdoYXNmb2N1cycsJ3RhYmluZGV4J10pICE9PSAtMSkgeyByZXR1cm47IH1cblx0XHRcdFx0aWYodi52YWx1ZSAhPT0gbnVsbCAmJiAkLnZha2F0YS50cmltKHYudmFsdWUpICE9PSAnJykge1xuXHRcdFx0XHRcdGlmKHdpdGhfdmFsdWVzKSB7IGF0dHJbdi5uYW1lXSA9IHYudmFsdWU7IH1cblx0XHRcdFx0XHRlbHNlIHsgYXR0ci5wdXNoKHYubmFtZSk7IH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiBhdHRyO1xuXHR9O1xuXHQkLnZha2F0YS5hcnJheV91bmlxdWUgPSBmdW5jdGlvbihhcnJheSkge1xuXHRcdHZhciBhID0gW10sIGksIGosIGwsIG8gPSB7fTtcblx0XHRmb3IoaSA9IDAsIGwgPSBhcnJheS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGlmKG9bYXJyYXlbaV1dID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0YS5wdXNoKGFycmF5W2ldKTtcblx0XHRcdFx0b1thcnJheVtpXV0gPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYTtcblx0fTtcblx0Ly8gcmVtb3ZlIGl0ZW0gZnJvbSBhcnJheVxuXHQkLnZha2F0YS5hcnJheV9yZW1vdmUgPSBmdW5jdGlvbihhcnJheSwgZnJvbSkge1xuXHRcdGFycmF5LnNwbGljZShmcm9tLCAxKTtcblx0XHRyZXR1cm4gYXJyYXk7XG5cdFx0Ly92YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcblx0XHQvL2FycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG5cdFx0Ly9hcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcblx0XHQvL3JldHVybiBhcnJheTtcblx0fTtcblx0Ly8gcmVtb3ZlIGl0ZW0gZnJvbSBhcnJheVxuXHQkLnZha2F0YS5hcnJheV9yZW1vdmVfaXRlbSA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtKSB7XG5cdFx0dmFyIHRtcCA9ICQuaW5BcnJheShpdGVtLCBhcnJheSk7XG5cdFx0cmV0dXJuIHRtcCAhPT0gLTEgPyAkLnZha2F0YS5hcnJheV9yZW1vdmUoYXJyYXksIHRtcCkgOiBhcnJheTtcblx0fTtcblx0JC52YWthdGEuYXJyYXlfZmlsdGVyID0gZnVuY3Rpb24oYyxhLGIsZCxlKSB7XG5cdFx0aWYgKGMuZmlsdGVyKSB7XG5cdFx0XHRyZXR1cm4gYy5maWx0ZXIoYSwgYik7XG5cdFx0fVxuXHRcdGQ9W107XG5cdFx0Zm9yIChlIGluIGMpIHtcblx0XHRcdGlmICh+fmUrJyc9PT1lKycnICYmIGU+PTAgJiYgYS5jYWxsKGIsY1tlXSwrZSxjKSkge1xuXHRcdFx0XHRkLnB1c2goY1tlXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkO1xuXHR9O1xuXHQkLnZha2F0YS50cmltID0gZnVuY3Rpb24gKHRleHQpIHtcblx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltID8gXG5cdFx0XHRTdHJpbmcucHJvdG90eXBlLnRyaW0uY2FsbCh0ZXh0LnRvU3RyaW5nKCkpIDpcblx0XHRcdHRleHQudG9TdHJpbmcoKS5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXHR9O1xuXHQkLnZha2F0YS5pc19mdW5jdGlvbiA9IGZ1bmN0aW9uKG9iaikge1xuXHRcdHJldHVybiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIG9iai5ub2RlVHlwZSAhPT0gXCJudW1iZXJcIjtcblx0fTtcblx0JC52YWthdGEuaXNfYXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcblx0XHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBBcnJheV1cIjtcblx0fTtcblxuXHQvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfb2JqZWN0cy9GdW5jdGlvbi9iaW5kI3BvbHlmaWxsXG5cdGlmICghRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQpIHtcblx0XHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB0aGF0RnVuYyA9IHRoaXMsIHRoYXRBcmcgPSBhcmd1bWVudHNbMF07XG5cdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cdFx0XHRpZiAodHlwZW9mIHRoYXRGdW5jICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdC8vIGNsb3Nlc3QgdGhpbmcgcG9zc2libGUgdG8gdGhlIEVDTUFTY3JpcHQgNVxuXHRcdFx0XHQvLyBpbnRlcm5hbCBJc0NhbGxhYmxlIGZ1bmN0aW9uXG5cdFx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGZ1bmNBcmdzID0gYXJncy5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG5cdFx0XHRcdHJldHVybiB0aGF0RnVuYy5hcHBseSh0aGF0QXJnLCBmdW5jQXJncyk7XG5cdFx0XHR9O1xuXHRcdH07XG5cdH1cblxuXG4vKipcbiAqICMjIyBDaGFuZ2VkIHBsdWdpblxuICpcbiAqIFRoaXMgcGx1Z2luIGFkZHMgbW9yZSBpbmZvcm1hdGlvbiB0byB0aGUgYGNoYW5nZWQuanN0cmVlYCBldmVudC4gVGhlIG5ldyBkYXRhIGlzIGNvbnRhaW5lZCBpbiB0aGUgYGNoYW5nZWRgIGV2ZW50IGRhdGEgcHJvcGVydHksIGFuZCBjb250YWlucyBhIGxpc3RzIG9mIGBzZWxlY3RlZGAgYW5kIGBkZXNlbGVjdGVkYCBub2Rlcy5cbiAqL1xuXG5cdCQuanN0cmVlLnBsdWdpbnMuY2hhbmdlZCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR2YXIgbGFzdCA9IFtdO1xuXHRcdHRoaXMudHJpZ2dlciA9IGZ1bmN0aW9uIChldiwgZGF0YSkge1xuXHRcdFx0dmFyIGksIGo7XG5cdFx0XHRpZighZGF0YSkge1xuXHRcdFx0XHRkYXRhID0ge307XG5cdFx0XHR9XG5cdFx0XHRpZihldi5yZXBsYWNlKCcuanN0cmVlJywnJykgPT09ICdjaGFuZ2VkJykge1xuXHRcdFx0XHRkYXRhLmNoYW5nZWQgPSB7IHNlbGVjdGVkIDogW10sIGRlc2VsZWN0ZWQgOiBbXSB9O1xuXHRcdFx0XHR2YXIgdG1wID0ge307XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IGxhc3QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0dG1wW2xhc3RbaV1dID0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXRhLnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKCF0bXBbZGF0YS5zZWxlY3RlZFtpXV0pIHtcblx0XHRcdFx0XHRcdGRhdGEuY2hhbmdlZC5zZWxlY3RlZC5wdXNoKGRhdGEuc2VsZWN0ZWRbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRtcFtkYXRhLnNlbGVjdGVkW2ldXSA9IDI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IGxhc3QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYodG1wW2xhc3RbaV1dID09PSAxKSB7XG5cdFx0XHRcdFx0XHRkYXRhLmNoYW5nZWQuZGVzZWxlY3RlZC5wdXNoKGxhc3RbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0ID0gZGF0YS5zZWxlY3RlZC5zbGljZSgpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBzZWxlY3Rpb24gY2hhbmdlcyAodGhlIFwiY2hhbmdlZFwiIHBsdWdpbiBlbmhhbmNlcyB0aGUgb3JpZ2luYWwgZXZlbnQgd2l0aCBtb3JlIGRhdGEpXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNoYW5nZWQuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiB0aGUgYWN0aW9uIHRoYXQgY2F1c2VkIHRoZSBzZWxlY3Rpb24gdG8gY2hhbmdlXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBjaGFuZ2VkIGFuIG9iamVjdCBjb250YWluaW5nIHR3byBwcm9wZXJ0aWVzIGBzZWxlY3RlZGAgYW5kIGBkZXNlbGVjdGVkYCAtIGJvdGggYXJyYXlzIG9mIG5vZGUgSURzLCB3aGljaCB3ZXJlIHNlbGVjdGVkIG9yIGRlc2VsZWN0ZWQgc2luY2UgdGhlIGxhc3QgY2hhbmdlZCBldmVudFxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBldmVudCAoaWYgYW55KSB0aGF0IHRyaWdnZXJlZCB0aGlzIGNoYW5nZWQgZXZlbnRcblx0XHRcdCAqIEBwbHVnaW4gY2hhbmdlZFxuXHRcdFx0ICovXG5cdFx0XHRwYXJlbnQudHJpZ2dlci5jYWxsKHRoaXMsIGV2LCBkYXRhKTtcblx0XHR9O1xuXHRcdHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uIChza2lwX2xvYWRpbmcsIGZvcmdldF9zdGF0ZSkge1xuXHRcdFx0bGFzdCA9IFtdO1xuXHRcdFx0cmV0dXJuIHBhcmVudC5yZWZyZXNoLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0fTtcblxuLyoqXG4gKiAjIyMgQ2hlY2tib3ggcGx1Z2luXG4gKlxuICogVGhpcyBwbHVnaW4gcmVuZGVycyBjaGVja2JveCBpY29ucyBpbiBmcm9udCBvZiBlYWNoIG5vZGUsIG1ha2luZyBtdWx0aXBsZSBzZWxlY3Rpb24gbXVjaCBlYXNpZXIuXG4gKiBJdCBhbHNvIHN1cHBvcnRzIHRyaS1zdGF0ZSBiZWhhdmlvciwgbWVhbmluZyB0aGF0IGlmIGEgbm9kZSBoYXMgYSBmZXcgb2YgaXRzIGNoaWxkcmVuIGNoZWNrZWQgaXQgd2lsbCBiZSByZW5kZXJlZCBhcyB1bmRldGVybWluZWQsIGFuZCBzdGF0ZSB3aWxsIGJlIHByb3BhZ2F0ZWQgdXAuXG4gKi9cblxuXHR2YXIgX2kgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG5cdF9pLmNsYXNzTmFtZSA9ICdqc3RyZWUtaWNvbiBqc3RyZWUtY2hlY2tib3gnO1xuXHRfaS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cdC8qKlxuXHQgKiBzdG9yZXMgYWxsIGRlZmF1bHRzIGZvciB0aGUgY2hlY2tib3ggcGx1Z2luXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94XG5cdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94ID0ge1xuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGNoZWNrYm94ZXMgc2hvdWxkIGJlIHZpc2libGUgKGNhbiBiZSBjaGFuZ2VkIGF0IGEgbGF0ZXIgdGltZSB1c2luZyBgc2hvd19jaGVja2JveGVzKClgIGFuZCBgaGlkZV9jaGVja2JveGVzYCkuIERlZmF1bHRzIHRvIGB0cnVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC52aXNpYmxlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHZpc2libGVcdFx0XHRcdDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBjaGVja2JveGVzIHNob3VsZCBjYXNjYWRlIGRvd24gYW5kIGhhdmUgYW4gdW5kZXRlcm1pbmVkIHN0YXRlLiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY2hlY2tib3gudGhyZWVfc3RhdGVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhyZWVfc3RhdGVcdFx0XHQ6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgY2xpY2tpbmcgYW55d2hlcmUgb24gdGhlIG5vZGUgc2hvdWxkIGFjdCBhcyBjbGlja2luZyBvbiB0aGUgY2hlY2tib3guIERlZmF1bHRzIHRvIGB0cnVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC53aG9sZV9ub2RlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHdob2xlX25vZGVcdFx0XHQ6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHNlbGVjdGVkIHN0eWxlIG9mIGEgbm9kZSBzaG91bGQgYmUga2VwdCwgb3IgcmVtb3ZlZC4gRGVmYXVsdHMgdG8gYHRydWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94LmtlZXBfc2VsZWN0ZWRfc3R5bGVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0a2VlcF9zZWxlY3RlZF9zdHlsZVx0OiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgc2V0dGluZyBjb250cm9scyBob3cgY2FzY2FkaW5nIGFuZCB1bmRldGVybWluZWQgbm9kZXMgYXJlIGFwcGxpZWQuXG5cdFx0ICogSWYgJ3VwJyBpcyBpbiB0aGUgc3RyaW5nIC0gY2FzY2FkaW5nIHVwIGlzIGVuYWJsZWQsIGlmICdkb3duJyBpcyBpbiB0aGUgc3RyaW5nIC0gY2FzY2FkaW5nIGRvd24gaXMgZW5hYmxlZCwgaWYgJ3VuZGV0ZXJtaW5lZCcgaXMgaW4gdGhlIHN0cmluZyAtIHVuZGV0ZXJtaW5lZCBub2RlcyB3aWxsIGJlIHVzZWQuXG5cdFx0ICogSWYgYHRocmVlX3N0YXRlYCBpcyBzZXQgdG8gYHRydWVgIHRoaXMgc2V0dGluZyBpcyBhdXRvbWF0aWNhbGx5IHNldCB0byAndXArZG93bit1bmRldGVybWluZWQnLiBEZWZhdWx0cyB0byAnJy5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC5jYXNjYWRlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdGNhc2NhZGVcdFx0XHRcdDogJycsXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGlmIGNoZWNrYm94IGFyZSBib3VuZCB0byB0aGUgZ2VuZXJhbCB0cmVlIHNlbGVjdGlvbiBvciB0byBhbiBpbnRlcm5hbCBhcnJheSBtYWludGFpbmVkIGJ5IHRoZSBjaGVja2JveCBwbHVnaW4uIERlZmF1bHRzIHRvIGB0cnVlYCwgb25seSBzZXQgdG8gYGZhbHNlYCBpZiB5b3Uga25vdyBleGFjdGx5IHdoYXQgeW91IGFyZSBkb2luZy5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC50aWVfc2VsZWN0aW9uXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRpZV9zZWxlY3Rpb25cdFx0OiB0cnVlLFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGlmIGNhc2NhZGluZyBkb3duIGFmZmVjdHMgZGlzYWJsZWQgY2hlY2tib3hlc1xuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94LmNhc2NhZGVfdG9fZGlzYWJsZWRcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0Y2FzY2FkZV90b19kaXNhYmxlZCA6IHRydWUsXG5cblx0XHQvKipcblx0XHQgKiBUaGlzIHNldHRpbmcgY29udHJvbHMgaWYgY2FzY2FkaW5nIGRvd24gYWZmZWN0cyBoaWRkZW4gY2hlY2tib3hlc1xuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94LmNhc2NhZGVfdG9faGlkZGVuXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdGNhc2NhZGVfdG9faGlkZGVuIDogdHJ1ZVxuXHR9O1xuXHQkLmpzdHJlZS5wbHVnaW5zLmNoZWNrYm94ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHBhcmVudC5iaW5kLmNhbGwodGhpcyk7XG5cdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnV0byA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCA9IFtdO1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aHJlZV9zdGF0ZSkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUgPSAndXArZG93bit1bmRldGVybWluZWQnO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdC5vbihcImluaXQuanN0cmVlXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3gudmlzaWJsZSA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudmlzaWJsZTtcblx0XHRcdFx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNoZWNrYm94LmtlZXBfc2VsZWN0ZWRfc3R5bGUpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKCdqc3RyZWUtY2hlY2tib3gtbm8tY2xpY2tlZCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcygnanN0cmVlLWNoZWNrYm94LXNlbGVjdGlvbicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwibG9hZGluZy5qc3RyZWVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dGhpc1sgdGhpcy5fZGF0YS5jaGVja2JveC52aXNpYmxlID8gJ3Nob3dfY2hlY2tib3hlcycgOiAnaGlkZV9jaGVja2JveGVzJyBdKCk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZS5pbmRleE9mKCd1bmRldGVybWluZWQnKSAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0Lm9uKCdjaGFuZ2VkLmpzdHJlZSB1bmNoZWNrX25vZGUuanN0cmVlIGNoZWNrX25vZGUuanN0cmVlIHVuY2hlY2tfYWxsLmpzdHJlZSBjaGVja19hbGwuanN0cmVlIG1vdmVfbm9kZS5qc3RyZWUgY29weV9ub2RlLmpzdHJlZSByZWRyYXcuanN0cmVlIG9wZW5fbm9kZS5qc3RyZWUnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdC8vIG9ubHkgaWYgdW5kZXRlcm1pbmVkIGlzIGluIHNldHRpbmdcblx0XHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jaGVja2JveC51dG8pIHsgY2xlYXJUaW1lb3V0KHRoaXMuX2RhdGEuY2hlY2tib3gudXRvKTsgfVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnV0byA9IHNldFRpbWVvdXQodGhpcy5fdW5kZXRlcm1pbmVkLmJpbmQodGhpcyksIDUwKTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0XHRpZighdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdC5vbignbW9kZWwuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdHZhciBtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0XHRcdFx0cCA9IG1bZGF0YS5wYXJlbnRdLFxuXHRcdFx0XHRcdFx0XHRkcGMgPSBkYXRhLm5vZGVzLFxuXHRcdFx0XHRcdFx0XHRpLCBqO1xuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZHBjLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uc3RhdGUuY2hlY2tlZCA9IG1bZHBjW2ldXS5zdGF0ZS5jaGVja2VkIHx8IChtW2RwY1tpXV0ub3JpZ2luYWwgJiYgbVtkcGNbaV1dLm9yaWdpbmFsLnN0YXRlICYmIG1bZHBjW2ldXS5vcmlnaW5hbC5zdGF0ZS5jaGVja2VkKTtcblx0XHRcdFx0XHRcdFx0aWYobVtkcGNbaV1dLnN0YXRlLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLnB1c2goZHBjW2ldKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUuaW5kZXhPZigndXAnKSAhPT0gLTEgfHwgdGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLmluZGV4T2YoJ2Rvd24nKSAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0Lm9uKCdtb2RlbC5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgbSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdFx0cCA9IG1bZGF0YS5wYXJlbnRdLFxuXHRcdFx0XHRcdFx0XHRcdGRwYyA9IGRhdGEubm9kZXMsXG5cdFx0XHRcdFx0XHRcdFx0Y2hkID0gW10sXG5cdFx0XHRcdFx0XHRcdFx0YywgaSwgaiwgaywgbCwgdG1wLCBzID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uO1xuXG5cdFx0XHRcdFx0XHRcdGlmKHMuaW5kZXhPZignZG93bicpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGFwcGx5IGRvd25cblx0XHRcdFx0XHRcdFx0XHRpZihwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkcGMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLmNvbmNhdChkcGMpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IGRwYy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYobVtkcGNbaV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gbVtkcGNbaV1dLmNoaWxkcmVuX2QubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtW21bZHBjW2ldXS5jaGlsZHJlbl9kW2tdXS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLmNvbmNhdChtW2RwY1tpXV0uY2hpbGRyZW5fZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZihzLmluZGV4T2YoJ3VwJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gYXBwbHkgdXBcblx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZighbVtwLmNoaWxkcmVuX2RbaV1dLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjaGQucHVzaChtW3AuY2hpbGRyZW5fZFtpXV0ucGFyZW50KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Y2hkID0gJC52YWthdGEuYXJyYXlfdW5pcXVlKGNoZCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gY2hkLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cCA9IG1bY2hkW2tdXTtcblx0XHRcdFx0XHRcdFx0XHRcdHdoaWxlKHAgJiYgcC5pZCAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjICs9IG1bcC5jaGlsZHJlbltpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoYyA9PT0gaikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQucHVzaChwLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKHAsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHRtcCAmJiB0bXAubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKCB0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRwID0gdGhpcy5nZXRfbm9kZShwLnBhcmVudCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X3VuaXF1ZSh0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHQub24odGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uID8gJ3NlbGVjdF9ub2RlLmpzdHJlZScgOiAnY2hlY2tfbm9kZS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0b2JqID0gZGF0YS5ub2RlLFxuXHRcdFx0XHRcdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRcdFx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUob2JqLnBhcmVudCksXG5cdFx0XHRcdFx0XHRcdFx0aSwgaiwgYywgdG1wLCBzID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uLFxuXHRcdFx0XHRcdFx0XHRcdHNlbCA9IHt9LCBjdXIgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkO1xuXG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IDAsIGogPSBjdXIubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2VsW2N1cltpXV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gYXBwbHkgZG93blxuXHRcdFx0XHRcdFx0XHRpZihzLmluZGV4T2YoJ2Rvd24nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHQvL3RoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV91bmlxdWUodGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5jb25jYXQob2JqLmNoaWxkcmVuX2QpKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRJZHMgPSB0aGlzLl9jYXNjYWRlX25ld19jaGVja2VkX3N0YXRlKG9iai5pZCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHRlbXAgPSBvYmouY2hpbGRyZW5fZC5jb25jYXQob2JqLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwLCBqID0gdGVtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzZWxlY3RlZElkcy5pbmRleE9mKHRlbXBbaV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsW3RlbXBbaV1dID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgc2VsW3RlbXBbaV1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIGFwcGx5IHVwXG5cdFx0XHRcdFx0XHRcdGlmKHMuaW5kZXhPZigndXAnKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZShwYXIgJiYgcGFyLmlkICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyArPSBtW3Bhci5jaGlsZHJlbltpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihjID09PSBqKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBhci5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbFtwYXIuaWRdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Ly90aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLnB1c2gocGFyLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwYXIsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3ModCA/ICdqc3RyZWUtY2xpY2tlZCcgOiAnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0cGFyID0gdGhpcy5nZXRfbm9kZShwYXIucGFyZW50KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRjdXIgPSBbXTtcblx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIHNlbCkge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChzZWwuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGN1ci5wdXNoKGkpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkID0gY3VyO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5vbih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24gPyAnZGVzZWxlY3RfYWxsLmpzdHJlZScgOiAndW5jaGVja19hbGwuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG9iaiA9IHRoaXMuZ2V0X25vZGUoJC5qc3RyZWUucm9vdCksXG5cdFx0XHRcdFx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdFx0aSwgaiwgdG1wO1xuXHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW5fZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAgPSBtW29iai5jaGlsZHJlbl9kW2ldXTtcblx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLm9yaWdpbmFsICYmIHRtcC5vcmlnaW5hbC5zdGF0ZSAmJiB0bXAub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0Lm9uKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbiA/ICdkZXNlbGVjdF9ub2RlLmpzdHJlZScgOiAndW5jaGVja19ub2RlLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcyxcblx0XHRcdFx0XHRcdFx0XHRvYmogPSBkYXRhLm5vZGUsXG5cdFx0XHRcdFx0XHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLFxuXHRcdFx0XHRcdFx0XHRcdGksIGosIHRtcCwgcyA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZSwgdCA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbixcblx0XHRcdFx0XHRcdFx0XHRjdXIgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLCBzZWwgPSB7fSxcblx0XHRcdFx0XHRcdFx0XHRzdGlsbFNlbGVjdGVkSWRzID0gW10sXG5cdFx0XHRcdFx0XHRcdFx0YWxsSWRzID0gb2JqLmNoaWxkcmVuX2QuY29uY2F0KG9iai5pZCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gYXBwbHkgZG93blxuXHRcdFx0XHRcdFx0XHRpZihzLmluZGV4T2YoJ2Rvd24nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgc2VsZWN0ZWRJZHMgPSB0aGlzLl9jYXNjYWRlX25ld19jaGVja2VkX3N0YXRlKG9iai5pZCwgZmFsc2UpO1xuXG5cdFx0XHRcdFx0XHRcdFx0Y3VyID0gJC52YWthdGEuYXJyYXlfZmlsdGVyKGN1ciwgZnVuY3Rpb24oaWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBhbGxJZHMuaW5kZXhPZihpZCkgPT09IC0xIHx8IHNlbGVjdGVkSWRzLmluZGV4T2YoaWQpID4gLTE7XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBvbmx5IGFwcGx5IHVwIGlmIGNhc2NhZGUgdXAgaXMgZW5hYmxlZCBhbmQgaWYgdGhpcyBub2RlIGlzIG5vdCBzZWxlY3RlZFxuXHRcdFx0XHRcdFx0XHQvLyAoaWYgYWxsIGNoaWxkIG5vZGVzIGFyZSBkaXNhYmxlZCBhbmQgY2FzY2FkZV90b19kaXNhYmxlZCA9PT0gZmFsc2UgdGhlbiB0aGlzIG5vZGUgd2lsbCB0aWxsIGJlIHNlbGVjdGVkKS5cblx0XHRcdFx0XHRcdFx0aWYocy5pbmRleE9mKCd1cCcpICE9PSAtMSAmJiBjdXIuaW5kZXhPZihvYmouaWQpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5fbW9kZWwuZGF0YVtvYmoucGFyZW50c1tpXV07XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKHRtcCAmJiB0bXAub3JpZ2luYWwgJiYgdG1wLm9yaWdpbmFsLnN0YXRlICYmIHRtcC5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShvYmoucGFyZW50c1tpXSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRcdGN1ciA9ICQudmFrYXRhLmFycmF5X2ZpbHRlcihjdXIsIGZ1bmN0aW9uKGlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb2JqLnBhcmVudHMuaW5kZXhPZihpZCkgPT09IC0xO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCA9IGN1cjtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUuaW5kZXhPZigndXAnKSAhPT0gLTEpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0Lm9uKCdkZWxldGVfbm9kZS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0XHQvLyBhcHBseSB1cCAod2hvbGUgaGFuZGxlcilcblx0XHRcdFx0XHRcdFx0dmFyIHAgPSB0aGlzLmdldF9ub2RlKGRhdGEucGFyZW50KSxcblx0XHRcdFx0XHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0XHRcdFx0XHRpLCBqLCBjLCB0bXAsIHQgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb247XG5cdFx0XHRcdFx0XHRcdHdoaWxlKHAgJiYgcC5pZCAhPT0gJC5qc3RyZWUucm9vdCAmJiAhcC5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSkge1xuXHRcdFx0XHRcdFx0XHRcdGMgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjICs9IG1bcC5jaGlsZHJlbltpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKGogPiAwICYmIGMgPT09IGopIHtcblx0XHRcdFx0XHRcdFx0XHRcdHAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5wdXNoKHAuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKHRtcCAmJiB0bXAubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3ModCA/ICdqc3RyZWUtY2xpY2tlZCcgOiAnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUocC5wYXJlbnQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0Lm9uKCdtb3ZlX25vZGUuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gYXBwbHkgdXAgKHdob2xlIGhhbmRsZXIpXG5cdFx0XHRcdFx0XHRcdHZhciBpc19tdWx0aSA9IGRhdGEuaXNfbXVsdGksXG5cdFx0XHRcdFx0XHRcdFx0b2xkX3BhciA9IGRhdGEub2xkX3BhcmVudCxcblx0XHRcdFx0XHRcdFx0XHRuZXdfcGFyID0gdGhpcy5nZXRfbm9kZShkYXRhLnBhcmVudCksXG5cdFx0XHRcdFx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdFx0cCwgYywgaSwgaiwgdG1wLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uO1xuXHRcdFx0XHRcdFx0XHRpZighaXNfbXVsdGkpIHtcblx0XHRcdFx0XHRcdFx0XHRwID0gdGhpcy5nZXRfbm9kZShvbGRfcGFyKTtcblx0XHRcdFx0XHRcdFx0XHR3aGlsZShwICYmIHAuaWQgIT09ICQuanN0cmVlLnJvb3QgJiYgIXAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0pIHtcblx0XHRcdFx0XHRcdFx0XHRcdGMgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyArPSBtW3AuY2hpbGRyZW5baV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoaiA+IDAgJiYgYyA9PT0gaikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5wdXNoKHAuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKHAsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3ModCA/ICdqc3RyZWUtY2xpY2tlZCcgOiAnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUocC5wYXJlbnQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwID0gbmV3X3Bhcjtcblx0XHRcdFx0XHRcdFx0d2hpbGUocCAmJiBwLmlkICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0YyA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGMgKz0gbVtwLmNoaWxkcmVuW2ldXS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoYyA9PT0gaikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIXAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cC5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQucHVzaChwLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X3JlbW92ZV9pdGVtKHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQsIHAuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKHAsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnJlbW92ZUNsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUocC5wYXJlbnQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogZ2V0IGFuIGFycmF5IG9mIGFsbCBub2RlcyB3aG9zZSBzdGF0ZSBpcyBcInVuZGV0ZXJtaW5lZFwiXG5cdFx0ICogQG5hbWUgZ2V0X3VuZGV0ZXJtaW5lZChbZnVsbF0pXG5cdFx0ICogQHBhcmFtICB7Ym9vbGVhbn0gZnVsbDogaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmdldF91bmRldGVybWluZWQgPSBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZS5pbmRleE9mKCd1bmRldGVybWluZWQnKSA9PT0gLTEpIHtcblx0XHRcdFx0cmV0dXJuIFtdO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGksIGosIGssIGwsIG8gPSB7fSwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIHQgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24sIHMgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLCBwID0gW10sIHR0ID0gdGhpcywgciA9IFtdO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYobVtzW2ldXSAmJiBtW3NbaV1dLnBhcmVudHMpIHtcblx0XHRcdFx0XHRmb3IoayA9IDAsIGwgPSBtW3NbaV1dLnBhcmVudHMubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0XHRpZihvW21bc1tpXV0ucGFyZW50c1trXV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKG1bc1tpXV0ucGFyZW50c1trXSAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRvW21bc1tpXV0ucGFyZW50c1trXV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRwLnB1c2gobVtzW2ldXS5wYXJlbnRzW2tdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIGF0dGVtcHQgZm9yIHNlcnZlciBzaWRlIHVuZGV0ZXJtaW5lZCBzdGF0ZVxuXHRcdFx0dGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtY2xvc2VkJykubm90KCc6aGFzKC5qc3RyZWUtY2hpbGRyZW4pJylcblx0XHRcdFx0LmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciB0bXAgPSB0dC5nZXRfbm9kZSh0aGlzKSwgdG1wMjtcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZighdG1wKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdGlmKCF0bXAuc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdFx0XHRpZih0bXAub3JpZ2luYWwgJiYgdG1wLm9yaWdpbmFsLnN0YXRlICYmIHRtcC5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgJiYgdG1wLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRpZihvW3RtcC5pZF0gPT09IHVuZGVmaW5lZCAmJiB0bXAuaWQgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdFx0XHRvW3RtcC5pZF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdHAucHVzaCh0bXAuaWQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IHRtcC5wYXJlbnRzLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmKG9bdG1wLnBhcmVudHNba11dID09PSB1bmRlZmluZWQgJiYgdG1wLnBhcmVudHNba10gIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9bdG1wLnBhcmVudHNba11dID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHAucHVzaCh0bXAucGFyZW50c1trXSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdHRtcDIgPSBtW3RtcC5jaGlsZHJlbl9kW2ldXTtcblx0XHRcdFx0XHRcdFx0aWYoIXRtcDIuc3RhdGUubG9hZGVkICYmIHRtcDIub3JpZ2luYWwgJiYgdG1wMi5vcmlnaW5hbC5zdGF0ZSAmJiB0bXAyLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCAmJiB0bXAyLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGlmKG9bdG1wMi5pZF0gPT09IHVuZGVmaW5lZCAmJiB0bXAyLmlkICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvW3RtcDIuaWRdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHAucHVzaCh0bXAyLmlkKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gdG1wMi5wYXJlbnRzLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYob1t0bXAyLnBhcmVudHNba11dID09PSB1bmRlZmluZWQgJiYgdG1wMi5wYXJlbnRzW2tdICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9bdG1wMi5wYXJlbnRzW2tdXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHAucHVzaCh0bXAyLnBhcmVudHNba10pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRmb3IgKGkgPSAwLCBqID0gcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYoIW1bcFtpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0pIHtcblx0XHRcdFx0XHRyLnB1c2goZnVsbCA/IG1bcFtpXV0gOiBwW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBzZXQgdGhlIHVuZGV0ZXJtaW5lZCBzdGF0ZSB3aGVyZSBhbmQgaWYgbmVjZXNzYXJ5LiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfdW5kZXRlcm1pbmVkKClcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5fdW5kZXRlcm1pbmVkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5lbGVtZW50ID09PSBudWxsKSB7IHJldHVybjsgfVxuXHRcdFx0dmFyIHAgPSB0aGlzLmdldF91bmRldGVybWluZWQoZmFsc2UpLCBpLCBqLCBzO1xuXG5cdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS11bmRldGVybWluZWQnKS5yZW1vdmVDbGFzcygnanN0cmVlLXVuZGV0ZXJtaW5lZCcpO1xuXHRcdFx0Zm9yIChpID0gMCwgaiA9IHAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHMgPSB0aGlzLmdldF9ub2RlKHBbaV0sIHRydWUpO1xuXHRcdFx0XHRpZihzICYmIHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0cy5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5jaGlsZHJlbignLmpzdHJlZS1jaGVja2JveCcpLmFkZENsYXNzKCdqc3RyZWUtdW5kZXRlcm1pbmVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMucmVkcmF3X25vZGUgPSBmdW5jdGlvbihvYmosIGRlZXAsIGlzX2NhbGxiYWNrLCBmb3JjZV9yZW5kZXIpIHtcblx0XHRcdG9iaiA9IHBhcmVudC5yZWRyYXdfbm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYob2JqKSB7XG5cdFx0XHRcdHZhciBpLCBqLCB0bXAgPSBudWxsLCBpY29uID0gbnVsbDtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYob2JqLmNoaWxkTm9kZXNbaV0gJiYgb2JqLmNoaWxkTm9kZXNbaV0uY2xhc3NOYW1lICYmIG9iai5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZS5pbmRleE9mKFwianN0cmVlLWFuY2hvclwiKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHRtcCA9IG9iai5jaGlsZE5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHRtcCkge1xuXHRcdFx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24gJiYgdGhpcy5fbW9kZWwuZGF0YVtvYmouaWRdLnN0YXRlLmNoZWNrZWQpIHsgdG1wLmNsYXNzTmFtZSArPSAnIGpzdHJlZS1jaGVja2VkJzsgfVxuXHRcdFx0XHRcdGljb24gPSBfaS5jbG9uZU5vZGUoZmFsc2UpO1xuXHRcdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbb2JqLmlkXS5zdGF0ZS5jaGVja2JveF9kaXNhYmxlZCkgeyBpY29uLmNsYXNzTmFtZSArPSAnIGpzdHJlZS1jaGVja2JveC1kaXNhYmxlZCc7IH1cblx0XHRcdFx0XHR0bXAuaW5zZXJ0QmVmb3JlKGljb24sIHRtcC5jaGlsZE5vZGVzWzBdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoIWlzX2NhbGxiYWNrICYmIHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZS5pbmRleE9mKCd1bmRldGVybWluZWQnKSAhPT0gLTEpIHtcblx0XHRcdFx0aWYodGhpcy5fZGF0YS5jaGVja2JveC51dG8pIHsgY2xlYXJUaW1lb3V0KHRoaXMuX2RhdGEuY2hlY2tib3gudXRvKTsgfVxuXHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnV0byA9IHNldFRpbWVvdXQodGhpcy5fdW5kZXRlcm1pbmVkLmJpbmQodGhpcyksIDUwKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBzaG93IHRoZSBub2RlIGNoZWNrYm94IGljb25zXG5cdFx0ICogQG5hbWUgc2hvd19jaGVja2JveGVzKClcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5zaG93X2NoZWNrYm94ZXMgPSBmdW5jdGlvbiAoKSB7IHRoaXMuX2RhdGEuY29yZS50aGVtZXMuY2hlY2tib3hlcyA9IHRydWU7IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLnJlbW92ZUNsYXNzKFwianN0cmVlLW5vLWNoZWNrYm94ZXNcIik7IH07XG5cdFx0LyoqXG5cdFx0ICogaGlkZSB0aGUgbm9kZSBjaGVja2JveCBpY29uc1xuXHRcdCAqIEBuYW1lIGhpZGVfY2hlY2tib3hlcygpXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuaGlkZV9jaGVja2JveGVzID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmNoZWNrYm94ZXMgPSBmYWxzZTsgdGhpcy5nZXRfY29udGFpbmVyX3VsKCkuYWRkQ2xhc3MoXCJqc3RyZWUtbm8tY2hlY2tib3hlc1wiKTsgfTtcblx0XHQvKipcblx0XHQgKiB0b2dnbGUgdGhlIG5vZGUgaWNvbnNcblx0XHQgKiBAbmFtZSB0b2dnbGVfY2hlY2tib3hlcygpXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMudG9nZ2xlX2NoZWNrYm94ZXMgPSBmdW5jdGlvbiAoKSB7IGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMuY2hlY2tib3hlcykgeyB0aGlzLmhpZGVfY2hlY2tib3hlcygpOyB9IGVsc2UgeyB0aGlzLnNob3dfY2hlY2tib3hlcygpOyB9IH07XG5cdFx0LyoqXG5cdFx0ICogY2hlY2tzIGlmIGEgbm9kZSBpcyBpbiBhbiB1bmRldGVybWluZWQgc3RhdGVcblx0XHQgKiBAbmFtZSBpc191bmRldGVybWluZWQob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRoaXMuaXNfdW5kZXRlcm1pbmVkID0gZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0dmFyIHMgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUsIGksIGosIHQgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24sIGQgPSB0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLCBtID0gdGhpcy5fbW9kZWwuZGF0YTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID09PSB0cnVlIHx8IHMuaW5kZXhPZigndW5kZXRlcm1pbmVkJykgPT09IC0xIHx8IChzLmluZGV4T2YoJ2Rvd24nKSA9PT0gLTEgJiYgcy5pbmRleE9mKCd1cCcpID09PSAtMSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9iai5zdGF0ZS5sb2FkZWQgJiYgb2JqLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZigkLmluQXJyYXkob2JqLmNoaWxkcmVuX2RbaV0sIGQpICE9PSAtMSB8fCAoIW1bb2JqLmNoaWxkcmVuX2RbaV1dLnN0YXRlLmxvYWRlZCAmJiBtW29iai5jaGlsZHJlbl9kW2ldXS5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGRpc2FibGUgYSBub2RlJ3MgY2hlY2tib3hcblx0XHQgKiBAbmFtZSBkaXNhYmxlX2NoZWNrYm94KG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogYW4gYXJyYXkgY2FuIGJlIHVzZWQgdG9vXG5cdFx0ICogQHRyaWdnZXIgZGlzYWJsZV9jaGVja2JveC5qc3RyZWVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5kaXNhYmxlX2NoZWNrYm94ID0gZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0MiwgZG9tO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXNhYmxlX2NoZWNrYm94KG9ialt0MV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0aWYoIW9iai5zdGF0ZS5jaGVja2JveF9kaXNhYmxlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuY2hlY2tib3hfZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0XHRpZihkb20gJiYgZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5jaGlsZHJlbignLmpzdHJlZS1jaGVja2JveCcpLmFkZENsYXNzKCdqc3RyZWUtY2hlY2tib3gtZGlzYWJsZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSdzIGNoZWNrYm94IGlzIGRpc2FibGVkXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBkaXNhYmxlX2NoZWNrYm94LmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2Rpc2FibGVfY2hlY2tib3gnLCB7ICdub2RlJyA6IG9iaiB9KTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGVuYWJsZSBhIG5vZGUncyBjaGVja2JveFxuXHRcdCAqIEBuYW1lIGVuYWJsZV9jaGVja2JveChvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIGFuIGFycmF5IGNhbiBiZSB1c2VkIHRvb1xuXHRcdCAqIEB0cmlnZ2VyIGVuYWJsZV9jaGVja2JveC5qc3RyZWVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5lbmFibGVfY2hlY2tib3ggPSBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBkb207XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmVuYWJsZV9jaGVja2JveChvYmpbdDFdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKG9iai5zdGF0ZS5jaGVja2JveF9kaXNhYmxlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuY2hlY2tib3hfZGlzYWJsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuY2hpbGRyZW4oJy5qc3RyZWUtY2hlY2tib3gnKS5yZW1vdmVDbGFzcygnanN0cmVlLWNoZWNrYm94LWRpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUncyBjaGVja2JveCBpcyBlbmFibGVkXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBlbmFibGVfY2hlY2tib3guanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignZW5hYmxlX2NoZWNrYm94JywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuYWN0aXZhdGVfbm9kZSA9IGZ1bmN0aW9uIChvYmosIGUpIHtcblx0XHRcdGlmKCQoZS50YXJnZXQpLmhhc0NsYXNzKCdqc3RyZWUtY2hlY2tib3gtZGlzYWJsZWQnKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24gJiYgKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gud2hvbGVfbm9kZSB8fCAkKGUudGFyZ2V0KS5oYXNDbGFzcygnanN0cmVlLWNoZWNrYm94JykpKSB7XG5cdFx0XHRcdGUuY3RybEtleSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24gfHwgKCF0aGlzLnNldHRpbmdzLmNoZWNrYm94Lndob2xlX25vZGUgJiYgISQoZS50YXJnZXQpLmhhc0NsYXNzKCdqc3RyZWUtY2hlY2tib3gnKSkpIHtcblx0XHRcdFx0cmV0dXJuIHBhcmVudC5hY3RpdmF0ZV9ub2RlLmNhbGwodGhpcywgb2JqLCBlKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuaXNfZGlzYWJsZWQob2JqKSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLmlzX2NoZWNrZWQob2JqKSkge1xuXHRcdFx0XHR0aGlzLnVuY2hlY2tfbm9kZShvYmosIGUpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRoaXMuY2hlY2tfbm9kZShvYmosIGUpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy50cmlnZ2VyKCdhY3RpdmF0ZV9ub2RlJywgeyAnbm9kZScgOiB0aGlzLmdldF9ub2RlKG9iaikgfSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIENhc2NhZGVzIGNoZWNrZWQgc3RhdGUgdG8gYSBub2RlIGFuZCBhbGwgaXRzIGRlc2NlbmRhbnRzLiBUaGlzIGZ1bmN0aW9uIGRvZXMgTk9UIGFmZmVjdCBoaWRkZW4gYW5kIGRpc2FibGVkIG5vZGVzIChvciB0aGVpciBkZXNjZW5kYW50cykuXG5cdFx0ICogSG93ZXZlciBpZiB0aGVzZSB1bmFmZmVjdGVkIG5vZGVzIGFyZSBhbHJlYWR5IHNlbGVjdGVkIHRoZWlyIGlkcyB3aWxsIGJlIGluY2x1ZGVkIGluIHRoZSByZXR1cm5lZCBhcnJheS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9jYXNjYWRlX25ld19jaGVja2VkX3N0YXRlKGlkLCBjaGVja2VkU3RhdGUpXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGlkIHRoZSBub2RlIElEXG5cdFx0ICogQHBhcmFtIHtib29sfSBjaGVja2VkU3RhdGUgc2hvdWxkIHRoZSBub2RlcyBiZSBjaGVja2VkIG9yIG5vdFxuXHRcdCAqIEByZXR1cm5zIHtBcnJheX0gQXJyYXkgb2YgYWxsIG5vZGUgaWQncyAoaW4gdGhpcyB0cmVlIGJyYW5jaCkgdGhhdCBhcmUgY2hlY2tlZC5cblx0XHQgKi9cblx0XHR0aGlzLl9jYXNjYWRlX25ld19jaGVja2VkX3N0YXRlID0gZnVuY3Rpb24gKGlkLCBjaGVja2VkU3RhdGUpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHZhciB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uO1xuXHRcdFx0dmFyIG5vZGUgPSB0aGlzLl9tb2RlbC5kYXRhW2lkXTtcblx0XHRcdHZhciBzZWxlY3RlZE5vZGVJZHMgPSBbXTtcblx0XHRcdHZhciBzZWxlY3RlZENoaWxkcmVuSWRzID0gW10sIGksIGosIHNlbGVjdGVkQ2hpbGRJZHM7XG5cblx0XHRcdGlmIChcblx0XHRcdFx0KHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZV90b19kaXNhYmxlZCB8fCAhbm9kZS5zdGF0ZS5kaXNhYmxlZCkgJiZcblx0XHRcdFx0KHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZV90b19oaWRkZW4gfHwgIW5vZGUuc3RhdGUuaGlkZGVuKVxuXHRcdFx0KSB7XG5cdFx0XHRcdC8vRmlyc3QgdHJ5IGFuZCBjaGVjay91bmNoZWNrIHRoZSBjaGlsZHJlblxuXHRcdFx0XHRpZiAobm9kZS5jaGlsZHJlbikge1xuXHRcdFx0XHRcdGZvciAoaSA9IDAsIGogPSBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0dmFyIGNoaWxkSWQgPSBub2RlLmNoaWxkcmVuW2ldO1xuXHRcdFx0XHRcdFx0c2VsZWN0ZWRDaGlsZElkcyA9IHNlbGYuX2Nhc2NhZGVfbmV3X2NoZWNrZWRfc3RhdGUoY2hpbGRJZCwgY2hlY2tlZFN0YXRlKTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkTm9kZUlkcyA9IHNlbGVjdGVkTm9kZUlkcy5jb25jYXQoc2VsZWN0ZWRDaGlsZElkcyk7XG5cdFx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRDaGlsZElkcy5pbmRleE9mKGNoaWxkSWQpID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0ZWRDaGlsZHJlbklkcy5wdXNoKGNoaWxkSWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBkb20gPSBzZWxmLmdldF9ub2RlKG5vZGUsIHRydWUpO1xuXG5cdFx0XHRcdC8vQSBub2RlJ3Mgc3RhdGUgaXMgdW5kZXRlcm1pbmVkIGlmIHNvbWUgYnV0IG5vdCBhbGwgb2YgaXQncyBjaGlsZHJlbiBhcmUgY2hlY2tlZC9zZWxlY3RlZCAuXG5cdFx0XHRcdHZhciB1bmRldGVybWluZWQgPSBzZWxlY3RlZENoaWxkcmVuSWRzLmxlbmd0aCA+IDAgJiYgc2VsZWN0ZWRDaGlsZHJlbklkcy5sZW5ndGggPCBub2RlLmNoaWxkcmVuLmxlbmd0aDtcblxuXHRcdFx0XHRpZihub2RlLm9yaWdpbmFsICYmIG5vZGUub3JpZ2luYWwuc3RhdGUgJiYgbm9kZS5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQpIHtcblx0XHRcdFx0XHRub2RlLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9IHVuZGV0ZXJtaW5lZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vSWYgYSBub2RlIGlzIHVuZGV0ZXJtaW5lZCB0aGVuIHJlbW92ZSBzZWxlY3RlZCBjbGFzc1xuXHRcdFx0XHRpZiAodW5kZXRlcm1pbmVkKSB7XG5cdFx0XHRcdFx0bm9kZS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IGZhbHNlO1xuXHRcdFx0XHRcdGRvbS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnJlbW92ZUNsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly9PdGhlcndpc2UsIGlmIHRoZSBjaGVja2VkU3RhdGUgPT09IHRydWUgKGkuZS4gdGhlIG5vZGUgaXMgYmVpbmcgY2hlY2tlZCBub3cpIGFuZCBhbGwgb2YgdGhlIG5vZGUncyBjaGlsZHJlbiBhcmUgY2hlY2tlZCAoaWYgaXQgaGFzIGFueSBjaGlsZHJlbiksXG5cdFx0XHRcdC8vY2hlY2sgdGhlIG5vZGUgYW5kIHN0eWxlIGl0IGNvcnJlY3RseS5cblx0XHRcdFx0ZWxzZSBpZiAoY2hlY2tlZFN0YXRlICYmIHNlbGVjdGVkQ2hpbGRyZW5JZHMubGVuZ3RoID09PSBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdG5vZGUuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSBjaGVja2VkU3RhdGU7XG5cdFx0XHRcdFx0c2VsZWN0ZWROb2RlSWRzLnB1c2gobm9kZS5pZCk7XG5cblx0XHRcdFx0XHRkb20uYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bm9kZS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IGZhbHNlO1xuXHRcdFx0XHRcdGRvbS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnJlbW92ZUNsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRzZWxlY3RlZENoaWxkSWRzID0gdGhpcy5nZXRfY2hlY2tlZF9kZXNjZW5kYW50cyhpZCk7XG5cblx0XHRcdFx0aWYgKG5vZGUuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0pIHtcblx0XHRcdFx0XHRzZWxlY3RlZENoaWxkSWRzLnB1c2gobm9kZS5pZCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRzZWxlY3RlZE5vZGVJZHMgPSBzZWxlY3RlZE5vZGVJZHMuY29uY2F0KHNlbGVjdGVkQ2hpbGRJZHMpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2VsZWN0ZWROb2RlSWRzO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBHZXRzIGlkcyBvZiBub2RlcyBzZWxlY3RlZCBpbiBicmFuY2ggKG9mIHRyZWUpIHNwZWNpZmllZCBieSBpZCAoZG9lcyBub3QgaW5jbHVkZSB0aGUgbm9kZSBzcGVjaWZpZWQgYnkgaWQpXG5cdFx0ICogQG5hbWUgZ2V0X2NoZWNrZWRfZGVzY2VuZGFudHMob2JqKVxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgbm9kZSBJRFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fSBhcnJheSBvZiBJRHNcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5nZXRfY2hlY2tlZF9kZXNjZW5kYW50cyA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xuXHRcdFx0dmFyIHQgPSBzZWxmLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb247XG5cdFx0XHR2YXIgbm9kZSA9IHNlbGYuX21vZGVsLmRhdGFbaWRdO1xuXG5cdFx0XHRyZXR1cm4gJC52YWthdGEuYXJyYXlfZmlsdGVyKG5vZGUuY2hpbGRyZW5fZCwgZnVuY3Rpb24oX2lkKSB7XG5cdFx0XHRcdHJldHVybiBzZWxmLl9tb2RlbC5kYXRhW19pZF0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF07XG5cdFx0XHR9KTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogY2hlY2sgYSBub2RlIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UsIG90aGVyd2lzZSBzZWxlY3Rfbm9kZSB3aWxsIGJlIGNhbGxlZCBpbnRlcm5hbGx5KVxuXHRcdCAqIEBuYW1lIGNoZWNrX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiBhbiBhcnJheSBjYW4gYmUgdXNlZCB0byBjaGVjayBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEB0cmlnZ2VyIGNoZWNrX25vZGUuanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuY2hlY2tfbm9kZSA9IGZ1bmN0aW9uIChvYmosIGUpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikgeyByZXR1cm4gdGhpcy5zZWxlY3Rfbm9kZShvYmosIGZhbHNlLCB0cnVlLCBlKTsgfVxuXHRcdFx0dmFyIGRvbSwgdDEsIHQyLCB0aDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuY2hlY2tfbm9kZShvYmpbdDFdLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKCFvYmouc3RhdGUuY2hlY2tlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQucHVzaChvYmouaWQpO1xuXHRcdFx0XHRpZihkb20gJiYgZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcygnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBjaGVja2VkIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UpXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBjaGVja19ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBldmVudCAoaWYgYW55KSB0aGF0IHRyaWdnZXJlZCB0aGlzIGNoZWNrX25vZGVcblx0XHRcdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGVja19ub2RlJywgeyAnbm9kZScgOiBvYmosICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLCAnZXZlbnQnIDogZSB9KTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIHVuY2hlY2sgYSBub2RlIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UsIG90aGVyd2lzZSBkZXNlbGVjdF9ub2RlIHdpbGwgYmUgY2FsbGVkIGludGVybmFsbHkpXG5cdFx0ICogQG5hbWUgdW5jaGVja19ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogYW4gYXJyYXkgY2FuIGJlIHVzZWQgdG8gdW5jaGVjayBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEB0cmlnZ2VyIHVuY2hlY2tfbm9kZS5qc3RyZWVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy51bmNoZWNrX25vZGUgPSBmdW5jdGlvbiAob2JqLCBlKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuZGVzZWxlY3Rfbm9kZShvYmosIGZhbHNlLCBlKTsgfVxuXHRcdFx0dmFyIHQxLCB0MiwgZG9tO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy51bmNoZWNrX25vZGUob2JqW3QxXSwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZihvYmouc3RhdGUuY2hlY2tlZCkge1xuXHRcdFx0XHRvYmouc3RhdGUuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkID0gJC52YWthdGEuYXJyYXlfcmVtb3ZlX2l0ZW0odGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCwgb2JqLmlkKTtcblx0XHRcdFx0aWYoZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcygnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyB1bmNoZWNrZWQgKG9ubHkgaWYgdGllX3NlbGVjdGlvbiBpbiBjaGVja2JveCBzZXR0aW5ncyBpcyBmYWxzZSlcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIHVuY2hlY2tfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgKGlmIGFueSkgdGhhdCB0cmlnZ2VyZWQgdGhpcyB1bmNoZWNrX25vZGVcblx0XHRcdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCd1bmNoZWNrX25vZGUnLCB7ICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQsICdldmVudCcgOiBlIH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0XG5cdFx0LyoqXG5cdFx0ICogY2hlY2tzIGFsbCBub2RlcyBpbiB0aGUgdHJlZSAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlLCBvdGhlcndpc2Ugc2VsZWN0X2FsbCB3aWxsIGJlIGNhbGxlZCBpbnRlcm5hbGx5KVxuXHRcdCAqIEBuYW1lIGNoZWNrX2FsbCgpXG5cdFx0ICogQHRyaWdnZXIgY2hlY2tfYWxsLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5jaGVja19hbGwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuc2VsZWN0X2FsbCgpOyB9XG5cdFx0XHR2YXIgdG1wID0gdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZC5jb25jYXQoW10pLCBpLCBqO1xuXHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCA9IHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0uY2hpbGRyZW5fZC5jb25jYXQoKTtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZFtpXV0pIHtcblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWRbaV1dLnN0YXRlLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlZHJhdyh0cnVlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYWxsIG5vZGVzIGFyZSBjaGVja2VkIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UpXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNoZWNrX2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2NoZWNrX2FsbCcsIHsgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgfSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1bmNoZWNrIGFsbCBjaGVja2VkIG5vZGVzIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UsIG90aGVyd2lzZSBkZXNlbGVjdF9hbGwgd2lsbCBiZSBjYWxsZWQgaW50ZXJuYWxseSlcblx0XHQgKiBAbmFtZSB1bmNoZWNrX2FsbCgpXG5cdFx0ICogQHRyaWdnZXIgdW5jaGVja19hbGwuanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMudW5jaGVja19hbGwgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuZGVzZWxlY3RfYWxsKCk7IH1cblx0XHRcdHZhciB0bXAgPSB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLmNvbmNhdChbXSksIGksIGo7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWRbaV1dKSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkW2ldXS5zdGF0ZS5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgPSBbXTtcblx0XHRcdHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLWNoZWNrZWQnKS5yZW1vdmVDbGFzcygnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYWxsIG5vZGVzIGFyZSB1bmNoZWNrZWQgKG9ubHkgaWYgdGllX3NlbGVjdGlvbiBpbiBjaGVja2JveCBzZXR0aW5ncyBpcyBmYWxzZSlcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgdW5jaGVja19hbGwuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCd1bmNoZWNrX2FsbCcsIHsgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQsICdub2RlJyA6IHRtcCB9KTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGNoZWNrcyBpZiBhIG5vZGUgaXMgY2hlY2tlZCAoaWYgdGllX3NlbGVjdGlvbiBpcyBvbiBpbiB0aGUgc2V0dGluZ3MgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgc2FtZSBhcyBpc19zZWxlY3RlZClcblx0XHQgKiBAbmFtZSBpc19jaGVja2VkKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuaXNfY2hlY2tlZCA9IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikgeyByZXR1cm4gdGhpcy5pc19zZWxlY3RlZChvYmopOyB9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHJldHVybiBvYmouc3RhdGUuY2hlY2tlZDtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgY2hlY2tlZCBub2RlcyAoaWYgdGllX3NlbGVjdGlvbiBpcyBvbiBpbiB0aGUgc2V0dGluZ3MgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgc2FtZSBhcyBnZXRfc2VsZWN0ZWQpXG5cdFx0ICogQG5hbWUgZ2V0X2NoZWNrZWQoW2Z1bGxdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgZnVsbCBpZiBzZXQgdG8gYHRydWVgIHRoZSByZXR1cm5lZCBhcnJheSB3aWxsIGNvbnNpc3Qgb2YgdGhlIGZ1bGwgbm9kZSBvYmplY3RzLCBvdGhlcndpc2UgLSBvbmx5IElEcyB3aWxsIGJlIHJldHVybmVkXG5cdFx0ICogQHJldHVybiB7QXJyYXl9XG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0X2NoZWNrZWQgPSBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLmdldF9zZWxlY3RlZChmdWxsKTsgfVxuXHRcdFx0cmV0dXJuIGZ1bGwgPyAkLm1hcCh0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gdGhpcy5nZXRfbm9kZShpKTsgfS5iaW5kKHRoaXMpKSA6IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQuc2xpY2UoKTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgdG9wIGxldmVsIGNoZWNrZWQgbm9kZXMgKGlnbm9yaW5nIGNoaWxkcmVuIG9mIGNoZWNrZWQgbm9kZXMpIChpZiB0aWVfc2VsZWN0aW9uIGlzIG9uIGluIHRoZSBzZXR0aW5ncyB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGFzIGdldF90b3Bfc2VsZWN0ZWQpXG5cdFx0ICogQG5hbWUgZ2V0X3RvcF9jaGVja2VkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmdldF90b3BfY2hlY2tlZCA9IGZ1bmN0aW9uIChmdWxsKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuZ2V0X3RvcF9zZWxlY3RlZChmdWxsKTsgfVxuXHRcdFx0dmFyIHRtcCA9IHRoaXMuZ2V0X2NoZWNrZWQodHJ1ZSksXG5cdFx0XHRcdG9iaiA9IHt9LCBpLCBqLCBrLCBsO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRvYmpbdG1wW2ldLmlkXSA9IHRtcFtpXTtcblx0XHRcdH1cblx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gdG1wW2ldLmNoaWxkcmVuX2QubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0aWYob2JqW3RtcFtpXS5jaGlsZHJlbl9kW2tdXSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIG9ialt0bXBbaV0uY2hpbGRyZW5fZFtrXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBbXTtcblx0XHRcdGZvcihpIGluIG9iaikge1xuXHRcdFx0XHRpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHR0bXAucHVzaChpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bGwgPyAkLm1hcCh0bXAsIGZ1bmN0aW9uIChpKSB7IHJldHVybiB0aGlzLmdldF9ub2RlKGkpOyB9LmJpbmQodGhpcykpIDogdG1wO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogZ2V0IGFuIGFycmF5IG9mIGFsbCBib3R0b20gbGV2ZWwgY2hlY2tlZCBub2RlcyAoaWdub3Jpbmcgc2VsZWN0ZWQgcGFyZW50cykgKGlmIHRpZV9zZWxlY3Rpb24gaXMgb24gaW4gdGhlIHNldHRpbmdzIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHNhbWUgYXMgZ2V0X2JvdHRvbV9zZWxlY3RlZClcblx0XHQgKiBAbmFtZSBnZXRfYm90dG9tX2NoZWNrZWQoW2Z1bGxdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgZnVsbCBpZiBzZXQgdG8gYHRydWVgIHRoZSByZXR1cm5lZCBhcnJheSB3aWxsIGNvbnNpc3Qgb2YgdGhlIGZ1bGwgbm9kZSBvYmplY3RzLCBvdGhlcndpc2UgLSBvbmx5IElEcyB3aWxsIGJlIHJldHVybmVkXG5cdFx0ICogQHJldHVybiB7QXJyYXl9XG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0X2JvdHRvbV9jaGVja2VkID0gZnVuY3Rpb24gKGZ1bGwpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikgeyByZXR1cm4gdGhpcy5nZXRfYm90dG9tX3NlbGVjdGVkKGZ1bGwpOyB9XG5cdFx0XHR2YXIgdG1wID0gdGhpcy5nZXRfY2hlY2tlZCh0cnVlKSxcblx0XHRcdFx0b2JqID0gW10sIGksIGo7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKCF0bXBbaV0uY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0b2JqLnB1c2godG1wW2ldLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bGwgPyAkLm1hcChvYmosIGZ1bmN0aW9uIChpKSB7IHJldHVybiB0aGlzLmdldF9ub2RlKGkpOyB9LmJpbmQodGhpcykpIDogb2JqO1xuXHRcdH07XG5cdFx0dGhpcy5sb2FkX25vZGUgPSBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGssIGwsIGksIGosIGMsIHRtcDtcblx0XHRcdGlmKCEkLnZha2F0YS5pc19hcnJheShvYmopICYmICF0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHtcblx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0XHRpZih0bXAgJiYgdG1wLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IHRtcC5jaGlsZHJlbl9kLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVt0bXAuY2hpbGRyZW5fZFtrXV0uc3RhdGUuY2hlY2tlZCkge1xuXHRcdFx0XHRcdFx0XHRjID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X3JlbW92ZV9pdGVtKHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQsIHRtcC5jaGlsZHJlbl9kW2tdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXJlbnQubG9hZF9ub2RlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0fTtcblx0XHR0aGlzLmdldF9zdGF0ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBzdGF0ZSA9IHBhcmVudC5nZXRfc3RhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikgeyByZXR1cm4gc3RhdGU7IH1cblx0XHRcdHN0YXRlLmNoZWNrYm94ID0gdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZC5zbGljZSgpO1xuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH07XG5cdFx0dGhpcy5zZXRfc3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgcmVzID0gcGFyZW50LnNldF9zdGF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYocmVzICYmIHN0YXRlLmNoZWNrYm94KSB7XG5cdFx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHtcblx0XHRcdFx0XHR0aGlzLnVuY2hlY2tfYWxsKCk7XG5cdFx0XHRcdFx0dmFyIF90aGlzID0gdGhpcztcblx0XHRcdFx0XHQkLmVhY2goc3RhdGUuY2hlY2tib3gsIGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5jaGVja19ub2RlKHYpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jaGVja2JveDtcblx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9O1xuXHRcdHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uIChza2lwX2xvYWRpbmcsIGZvcmdldF9zdGF0ZSkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgPSBbXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXJlbnQucmVmcmVzaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gaW5jbHVkZSB0aGUgY2hlY2tib3ggcGx1Z2luIGJ5IGRlZmF1bHRcblx0Ly8gJC5qc3RyZWUuZGVmYXVsdHMucGx1Z2lucy5wdXNoKFwiY2hlY2tib3hcIik7XG5cblxuLyoqXG4gKiAjIyMgQ29uZGl0aW9uYWxzZWxlY3QgcGx1Z2luXG4gKlxuICogVGhpcyBwbHVnaW4gYWxsb3dzIGRlZmluaW5nIGEgY2FsbGJhY2sgdG8gYWxsb3cgb3IgZGVueSBub2RlIHNlbGVjdGlvbiBieSB1c2VyIGlucHV0IChhY3RpdmF0ZSBub2RlIG1ldGhvZCkuXG4gKi9cblxuXHQvKipcblx0ICogYSBjYWxsYmFjayAoZnVuY3Rpb24pIHdoaWNoIGlzIGludm9rZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgYW5kIHJlY2VpdmVzIHR3byBhcmd1bWVudHMgLSB0aGUgbm9kZSBhbmQgdGhlIGV2ZW50IHRoYXQgdHJpZ2dlcmVkIHRoZSBgYWN0aXZhdGVfbm9kZWAgY2FsbC4gUmV0dXJuaW5nIGZhbHNlIHByZXZlbnRzIHdvcmtpbmcgd2l0aCB0aGUgbm9kZSwgcmV0dXJuaW5nIHRydWUgYWxsb3dzIGludm9raW5nIGFjdGl2YXRlX25vZGUuIERlZmF1bHRzIHRvIHJldHVybmluZyBgdHJ1ZWAuXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94LnZpc2libGVcblx0ICogQHBsdWdpbiBjaGVja2JveFxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuY29uZGl0aW9uYWxzZWxlY3QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9O1xuXHQkLmpzdHJlZS5wbHVnaW5zLmNvbmRpdGlvbmFsc2VsZWN0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdC8vIG93biBmdW5jdGlvblxuXHRcdHRoaXMuYWN0aXZhdGVfbm9kZSA9IGZ1bmN0aW9uIChvYmosIGUpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29uZGl0aW9uYWxzZWxlY3QuY2FsbCh0aGlzLCB0aGlzLmdldF9ub2RlKG9iaiksIGUpKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYWN0aXZhdGVfbm9kZS5jYWxsKHRoaXMsIG9iaiwgZSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXG4vKipcbiAqICMjIyBDb250ZXh0bWVudSBwbHVnaW5cbiAqXG4gKiBTaG93cyBhIGNvbnRleHQgbWVudSB3aGVuIGEgbm9kZSBpcyByaWdodC1jbGlja2VkLlxuICovXG5cblx0LyoqXG5cdCAqIHN0b3JlcyBhbGwgZGVmYXVsdHMgZm9yIHRoZSBjb250ZXh0bWVudSBwbHVnaW5cblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29udGV4dG1lbnVcblx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuY29udGV4dG1lbnUgPSB7XG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIG5vZGUgc2hvdWxkIGJlIHNlbGVjdGVkIHdoZW4gdGhlIGNvbnRleHQgbWVudSBpcyBpbnZva2VkIG9uIGl0LiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29udGV4dG1lbnUuc2VsZWN0X25vZGVcblx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0ICovXG5cdFx0c2VsZWN0X25vZGUgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSBtZW51IHNob3VsZCBiZSBzaG93biBhbGlnbmVkIHdpdGggdGhlIG5vZGUuIERlZmF1bHRzIHRvIGB0cnVlYCwgb3RoZXJ3aXNlIHRoZSBtb3VzZSBjb29yZGluYXRlcyBhcmUgdXNlZC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb250ZXh0bWVudS5zaG93X2F0X25vZGVcblx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0ICovXG5cdFx0c2hvd19hdF9ub2RlIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBhbiBvYmplY3Qgb2YgYWN0aW9ucywgb3IgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBub2RlIGFuZCBhIGNhbGxiYWNrIGZ1bmN0aW9uIGFuZCBjYWxscyB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gd2l0aCBhbiBvYmplY3Qgb2YgYWN0aW9ucyBhdmFpbGFibGUgZm9yIHRoYXQgbm9kZSAoeW91IGNhbiBhbHNvIHJldHVybiB0aGUgaXRlbXMgdG9vKS5cblx0XHQgKlxuXHRcdCAqIEVhY2ggYWN0aW9uIGNvbnNpc3RzIG9mIGEga2V5IChhIHVuaXF1ZSBuYW1lKSBhbmQgYSB2YWx1ZSB3aGljaCBpcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMgKG9ubHkgbGFiZWwgYW5kIGFjdGlvbiBhcmUgcmVxdWlyZWQpLiBPbmNlIGEgbWVudSBpdGVtIGlzIGFjdGl2YXRlZCB0aGUgYGFjdGlvbmAgZnVuY3Rpb24gd2lsbCBiZSBpbnZva2VkIHdpdGggYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyBrZXlzOiBpdGVtIC0gdGhlIGNvbnRleHRtZW51IGl0ZW0gZGVmaW5pdGlvbiBhcyBzZWVuIGJlbG93LCByZWZlcmVuY2UgLSB0aGUgRE9NIG5vZGUgdGhhdCB3YXMgdXNlZCAodGhlIHRyZWUgbm9kZSksIGVsZW1lbnQgLSB0aGUgY29udGV4dG1lbnUgRE9NIGVsZW1lbnQsIHBvc2l0aW9uIC0gYW4gb2JqZWN0IHdpdGggeC95IHByb3BlcnRpZXMgaW5kaWNhdGluZyB0aGUgcG9zaXRpb24gb2YgdGhlIG1lbnUuXG5cdFx0ICpcblx0XHQgKiAqIGBzZXBhcmF0b3JfYmVmb3JlYCAtIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZXJlIHNob3VsZCBiZSBhIHNlcGFyYXRvciBiZWZvcmUgdGhpcyBpdGVtXG5cdFx0ICogKiBgc2VwYXJhdG9yX2FmdGVyYCAtIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZXJlIHNob3VsZCBiZSBhIHNlcGFyYXRvciBhZnRlciB0aGlzIGl0ZW1cblx0XHQgKiAqIGBfZGlzYWJsZWRgIC0gYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhpcyBhY3Rpb24gc2hvdWxkIGJlIGRpc2FibGVkXG5cdFx0ICogKiBgbGFiZWxgIC0gYSBzdHJpbmcgLSB0aGUgbmFtZSBvZiB0aGUgYWN0aW9uIChjb3VsZCBiZSBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHN0cmluZylcblx0XHQgKiAqIGB0aXRsZWAgLSBhIHN0cmluZyAtIGFuIG9wdGlvbmFsIHRvb2x0aXAgZm9yIHRoZSBpdGVtXG5cdFx0ICogKiBgYWN0aW9uYCAtIGEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgaWYgdGhpcyBpdGVtIGlzIGNob3NlbiwgdGhlIGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSBcblx0XHQgKiAqIGBpY29uYCAtIGEgc3RyaW5nLCBjYW4gYmUgYSBwYXRoIHRvIGFuIGljb24gb3IgYSBjbGFzc05hbWUsIGlmIHVzaW5nIGFuIGltYWdlIHRoYXQgaXMgaW4gdGhlIGN1cnJlbnQgZGlyZWN0b3J5IHVzZSBhIGAuL2AgcHJlZml4LCBvdGhlcndpc2UgaXQgd2lsbCBiZSBkZXRlY3RlZCBhcyBhIGNsYXNzXG5cdFx0ICogKiBgc2hvcnRjdXRgIC0ga2V5Q29kZSB3aGljaCB3aWxsIHRyaWdnZXIgdGhlIGFjdGlvbiBpZiB0aGUgbWVudSBpcyBvcGVuIChmb3IgZXhhbXBsZSBgMTEzYCBmb3IgcmVuYW1lLCB3aGljaCBlcXVhbHMgRjIpXG5cdFx0ICogKiBgc2hvcnRjdXRfbGFiZWxgIC0gc2hvcnRjdXQgbGFiZWwgKGxpa2UgZm9yIGV4YW1wbGUgYEYyYCBmb3IgcmVuYW1lKVxuXHRcdCAqICogYHN1Ym1lbnVgIC0gYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc3RydWN0dXJlIGFzICQuanN0cmVlLmRlZmF1bHRzLmNvbnRleHRtZW51Lml0ZW1zIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGNyZWF0ZSBhIHN1Ym1lbnUgLSBlYWNoIGtleSB3aWxsIGJlIHJlbmRlcmVkIGFzIGEgc2VwYXJhdGUgb3B0aW9uIGluIGEgc3VibWVudSB0aGF0IHdpbGwgYXBwZWFyIG9uY2UgdGhlIGN1cnJlbnQgaXRlbSBpcyBob3ZlcmVkXG5cdFx0ICpcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb250ZXh0bWVudS5pdGVtc1xuXHRcdCAqIEBwbHVnaW4gY29udGV4dG1lbnVcblx0XHQgKi9cblx0XHRpdGVtcyA6IGZ1bmN0aW9uIChvLCBjYikgeyAvLyBDb3VsZCBiZSBhbiBvYmplY3QgZGlyZWN0bHlcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFwiY3JlYXRlXCIgOiB7XG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYmVmb3JlXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYWZ0ZXJcIlx0OiB0cnVlLFxuXHRcdFx0XHRcdFwiX2Rpc2FibGVkXCJcdFx0XHQ6IGZhbHNlLCAvLyh0aGlzLmNoZWNrKFwiY3JlYXRlX25vZGVcIiwgZGF0YS5yZWZlcmVuY2UsIHt9LCBcImxhc3RcIikpLFxuXHRcdFx0XHRcdFwibGFiZWxcIlx0XHRcdFx0OiBcIkNyZWF0ZVwiLFxuXHRcdFx0XHRcdFwiYWN0aW9uXCJcdFx0XHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgaW5zdCA9ICQuanN0cmVlLnJlZmVyZW5jZShkYXRhLnJlZmVyZW5jZSksXG5cdFx0XHRcdFx0XHRcdG9iaiA9IGluc3QuZ2V0X25vZGUoZGF0YS5yZWZlcmVuY2UpO1xuXHRcdFx0XHRcdFx0aW5zdC5jcmVhdGVfbm9kZShvYmosIHt9LCBcImxhc3RcIiwgZnVuY3Rpb24gKG5ld19ub2RlKSB7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0aW5zdC5lZGl0KG5ld19ub2RlKTtcblx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgaW5zdC5lZGl0KG5ld19ub2RlKTsgfSwwKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcInJlbmFtZVwiIDoge1xuXHRcdFx0XHRcdFwic2VwYXJhdG9yX2JlZm9yZVwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFwic2VwYXJhdG9yX2FmdGVyXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJfZGlzYWJsZWRcIlx0XHRcdDogZmFsc2UsIC8vKHRoaXMuY2hlY2soXCJyZW5hbWVfbm9kZVwiLCBkYXRhLnJlZmVyZW5jZSwgdGhpcy5nZXRfcGFyZW50KGRhdGEucmVmZXJlbmNlKSwgXCJcIikpLFxuXHRcdFx0XHRcdFwibGFiZWxcIlx0XHRcdFx0OiBcIlJlbmFtZVwiLFxuXHRcdFx0XHRcdC8qIVxuXHRcdFx0XHRcdFwic2hvcnRjdXRcIlx0XHRcdDogMTEzLFxuXHRcdFx0XHRcdFwic2hvcnRjdXRfbGFiZWxcIlx0OiAnRjInLFxuXHRcdFx0XHRcdFwiaWNvblwiXHRcdFx0XHQ6IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1sZWFmXCIsXG5cdFx0XHRcdFx0Ki9cblx0XHRcdFx0XHRcImFjdGlvblwiXHRcdFx0OiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0dmFyIGluc3QgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLFxuXHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdGluc3QuZWRpdChvYmopO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJyZW1vdmVcIiA6IHtcblx0XHRcdFx0XHRcInNlcGFyYXRvcl9iZWZvcmVcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcImljb25cIlx0XHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFwiX2Rpc2FibGVkXCJcdFx0XHQ6IGZhbHNlLCAvLyh0aGlzLmNoZWNrKFwiZGVsZXRlX25vZGVcIiwgZGF0YS5yZWZlcmVuY2UsIHRoaXMuZ2V0X3BhcmVudChkYXRhLnJlZmVyZW5jZSksIFwiXCIpKSxcblx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJEZWxldGVcIixcblx0XHRcdFx0XHRcImFjdGlvblwiXHRcdFx0OiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0dmFyIGluc3QgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLFxuXHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdGlmKGluc3QuaXNfc2VsZWN0ZWQob2JqKSkge1xuXHRcdFx0XHRcdFx0XHRpbnN0LmRlbGV0ZV9ub2RlKGluc3QuZ2V0X3NlbGVjdGVkKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGluc3QuZGVsZXRlX25vZGUob2JqKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwiY2NwXCIgOiB7XG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYmVmb3JlXCJcdDogdHJ1ZSxcblx0XHRcdFx0XHRcImljb25cIlx0XHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFwibGFiZWxcIlx0XHRcdFx0OiBcIkVkaXRcIixcblx0XHRcdFx0XHRcImFjdGlvblwiXHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0XHRcInN1Ym1lbnVcIiA6IHtcblx0XHRcdFx0XHRcdFwiY3V0XCIgOiB7XG5cdFx0XHRcdFx0XHRcdFwic2VwYXJhdG9yX2JlZm9yZVwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJDdXRcIixcblx0XHRcdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaW5zdCA9ICQuanN0cmVlLnJlZmVyZW5jZShkYXRhLnJlZmVyZW5jZSksXG5cdFx0XHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdFx0XHRpZihpbnN0LmlzX3NlbGVjdGVkKG9iaikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluc3QuY3V0KGluc3QuZ2V0X3RvcF9zZWxlY3RlZCgpKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0LmN1dChvYmopO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY29weVwiIDoge1xuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9iZWZvcmVcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XCJpY29uXCJcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFwic2VwYXJhdG9yX2FmdGVyXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFwibGFiZWxcIlx0XHRcdFx0OiBcIkNvcHlcIixcblx0XHRcdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaW5zdCA9ICQuanN0cmVlLnJlZmVyZW5jZShkYXRhLnJlZmVyZW5jZSksXG5cdFx0XHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdFx0XHRpZihpbnN0LmlzX3NlbGVjdGVkKG9iaikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluc3QuY29weShpbnN0LmdldF90b3Bfc2VsZWN0ZWQoKSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5zdC5jb3B5KG9iaik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJwYXN0ZVwiIDoge1xuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9iZWZvcmVcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XCJpY29uXCJcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFwiX2Rpc2FibGVkXCJcdFx0XHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICEkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLmNhbl9wYXN0ZSgpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJQYXN0ZVwiLFxuXHRcdFx0XHRcdFx0XHRcImFjdGlvblwiXHRcdFx0OiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBpbnN0ID0gJC5qc3RyZWUucmVmZXJlbmNlKGRhdGEucmVmZXJlbmNlKSxcblx0XHRcdFx0XHRcdFx0XHRcdG9iaiA9IGluc3QuZ2V0X25vZGUoZGF0YS5yZWZlcmVuY2UpO1xuXHRcdFx0XHRcdFx0XHRcdGluc3QucGFzdGUob2JqKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cdH07XG5cblx0JC5qc3RyZWUucGx1Z2lucy5jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXG5cdFx0XHR2YXIgbGFzdF90cyA9IDAsIGN0byA9IG51bGwsIGV4LCBleTtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJpbml0LmpzdHJlZSBsb2FkaW5nLmpzdHJlZSByZWFkeS5qc3RyZWVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkuYWRkQ2xhc3MoJ2pzdHJlZS1jb250ZXh0bWVudScpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwiY29udGV4dG1lbnUuanN0cmVlXCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0bGFzdF90cyA9IGUuY3RybEtleSA/ICtuZXcgRGF0ZSgpIDogMDtcblx0XHRcdFx0XHRcdGlmKGRhdGEgfHwgY3RvKSB7XG5cdFx0XHRcdFx0XHRcdGxhc3RfdHMgPSAoK25ldyBEYXRlKCkpICsgMTAwMDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihjdG8pIHtcblx0XHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KGN0byk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZighdGhpcy5pc19sb2FkaW5nKGUuY3VycmVudFRhcmdldCkpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5zaG93X2NvbnRleHRtZW51KGUuY3VycmVudFRhcmdldCwgZS5wYWdlWCwgZS5wYWdlWSwgZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJjbGljay5qc3RyZWVcIiwgXCIuanN0cmVlLWFuY2hvclwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jb250ZXh0bWVudS52aXNpYmxlICYmICghbGFzdF90cyB8fCAoK25ldyBEYXRlKCkpIC0gbGFzdF90cyA+IDI1MCkpIHsgLy8gd29yayBhcm91bmQgc2FmYXJpICYgbWFjT1MgY3RybCtjbGlja1xuXHRcdFx0XHRcdFx0XHQkLnZha2F0YS5jb250ZXh0LmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGxhc3RfdHMgPSAwO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwidG91Y2hzdGFydC5qc3RyZWVcIiwgXCIuanN0cmVlLWFuY2hvclwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoIWUub3JpZ2luYWxFdmVudCB8fCAhZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzIHx8ICFlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0pIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZXggPSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WDtcblx0XHRcdFx0XHRcdGV5ID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XG5cdFx0XHRcdFx0XHRjdG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnRyaWdnZXIoJ2NvbnRleHRtZW51JywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9LCA3NTApO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigndG91Y2htb3ZlLnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoY3RvICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdICYmIChNYXRoLmFicyhleCAtIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYKSA+IDEwIHx8IE1hdGguYWJzKGV5IC0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkpID4gMTApKSB7XG5cdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChjdG8pO1xuXHRcdFx0XHRcdFx0XHQkLnZha2F0YS5jb250ZXh0LmhpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ3RvdWNoZW5kLnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoY3RvKSB7XG5cdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChjdG8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHQvKiFcblx0XHRcdGlmKCEoJ29uY29udGV4dG1lbnUnIGluIGRvY3VtZW50LmJvZHkpICYmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5ib2R5KSkge1xuXHRcdFx0XHR2YXIgZWwgPSBudWxsLCB0bSA9IG51bGw7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdC5vbihcInRvdWNoc3RhcnRcIiwgXCIuanN0cmVlLWFuY2hvclwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZWwgPSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdFx0XHR0bSA9ICtuZXcgRGF0ZSgpO1xuXHRcdFx0XHRcdFx0JChkb2N1bWVudCkub25lKFwidG91Y2hlbmRcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0ZS50YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUub3JpZ2luYWxFdmVudC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0LCBlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XG5cdFx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldCA9IGUudGFyZ2V0O1xuXHRcdFx0XHRcdFx0XHR0bSA9ICgoKyhuZXcgRGF0ZSgpKSkgLSB0bSk7XG5cdFx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0ID09PSBlbCAmJiB0bSA+IDYwMCAmJiB0bSA8IDEwMDApIHtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0JChlbCkudHJpZ2dlcignY29udGV4dG1lbnUnLCBlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbCA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdHRtID0gbnVsbDtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0Ki9cblx0XHRcdCQoZG9jdW1lbnQpLm9uKFwiY29udGV4dF9oaWRlLnZha2F0YS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb250ZXh0bWVudS52aXNpYmxlID0gZmFsc2U7XG5cdFx0XHRcdCQoZGF0YS5yZWZlcmVuY2UpLnJlbW92ZUNsYXNzKCdqc3RyZWUtY29udGV4dCcpO1xuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9O1xuXHRcdHRoaXMudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZih0aGlzLl9kYXRhLmNvbnRleHRtZW51LnZpc2libGUpIHtcblx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHQkKGRvY3VtZW50KS5vZmYoXCJjb250ZXh0X2hpZGUudmFrYXRhLmpzdHJlZVwiKTtcblx0XHRcdHBhcmVudC50ZWFyZG93bi5jYWxsKHRoaXMpO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBwcmVwYXJlIGFuZCBzaG93IHRoZSBjb250ZXh0IG1lbnUgZm9yIGEgbm9kZVxuXHRcdCAqIEBuYW1lIHNob3dfY29udGV4dG1lbnUob2JqIFssIHgsIHldKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSB4IHRoZSB4LWNvb3JkaW5hdGUgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50IHRvIHNob3cgdGhlIG1lbnUgYXRcblx0XHQgKiBAcGFyYW0ge051bWJlcn0geSB0aGUgeS1jb29yZGluYXRlIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudCB0byBzaG93IHRoZSBtZW51IGF0XG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGUgdGhlIGV2ZW50IGlmIGF2YWlsYWJsZSB0aGF0IHRyaWdnZXJlZCB0aGUgY29udGV4dG1lbnVcblx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0ICogQHRyaWdnZXIgc2hvd19jb250ZXh0bWVudS5qc3RyZWVcblx0XHQgKi9cblx0XHR0aGlzLnNob3dfY29udGV4dG1lbnUgPSBmdW5jdGlvbiAob2JqLCB4LCB5LCBlKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciBzID0gdGhpcy5zZXR0aW5ncy5jb250ZXh0bWVudSxcblx0XHRcdFx0ZCA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKSxcblx0XHRcdFx0YSA9IGQuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKSxcblx0XHRcdFx0byA9IGZhbHNlLFxuXHRcdFx0XHRpID0gZmFsc2U7XG5cdFx0XHRpZihzLnNob3dfYXRfbm9kZSB8fCB4ID09PSB1bmRlZmluZWQgfHwgeSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdG8gPSBhLm9mZnNldCgpO1xuXHRcdFx0XHR4ID0gby5sZWZ0O1xuXHRcdFx0XHR5ID0gby50b3AgKyB0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0O1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jb250ZXh0bWVudS5zZWxlY3Rfbm9kZSAmJiAhdGhpcy5pc19zZWxlY3RlZChvYmopKSB7XG5cdFx0XHRcdHRoaXMuYWN0aXZhdGVfbm9kZShvYmosIGUpO1xuXHRcdFx0fVxuXG5cdFx0XHRpID0gcy5pdGVtcztcblx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKGkpKSB7XG5cdFx0XHRcdGkgPSBpLmNhbGwodGhpcywgb2JqLCBmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRcdHRoaXMuX3Nob3dfY29udGV4dG1lbnUob2JqLCB4LCB5LCBpKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHRcdGlmKCQuaXNQbGFpbk9iamVjdChpKSkge1xuXHRcdFx0XHR0aGlzLl9zaG93X2NvbnRleHRtZW51KG9iaiwgeCwgeSwgaSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBzaG93IHRoZSBwcmVwYXJlZCBjb250ZXh0IG1lbnUgZm9yIGEgbm9kZVxuXHRcdCAqIEBuYW1lIF9zaG93X2NvbnRleHRtZW51KG9iaiwgeCwgeSwgaSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAcGFyYW0ge051bWJlcn0geCB0aGUgeC1jb29yZGluYXRlIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudCB0byBzaG93IHRoZSBtZW51IGF0XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgdGhlIHktY29vcmRpbmF0ZSByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQgdG8gc2hvdyB0aGUgbWVudSBhdFxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBpIHRoZSBvYmplY3Qgb2YgaXRlbXMgdG8gc2hvd1xuXHRcdCAqIEBwbHVnaW4gY29udGV4dG1lbnVcblx0XHQgKiBAdHJpZ2dlciBzaG93X2NvbnRleHRtZW51LmpzdHJlZVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0dGhpcy5fc2hvd19jb250ZXh0bWVudSA9IGZ1bmN0aW9uIChvYmosIHgsIHksIGkpIHtcblx0XHRcdHZhciBkID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLFxuXHRcdFx0XHRhID0gZC5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpO1xuXHRcdFx0JChkb2N1bWVudCkub25lKFwiY29udGV4dF9zaG93LnZha2F0YS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0dmFyIGNscyA9ICdqc3RyZWUtY29udGV4dG1lbnUganN0cmVlLScgKyB0aGlzLmdldF90aGVtZSgpICsgJy1jb250ZXh0bWVudSc7XG5cdFx0XHRcdCQoZGF0YS5lbGVtZW50KS5hZGRDbGFzcyhjbHMpO1xuXHRcdFx0XHRhLmFkZENsYXNzKCdqc3RyZWUtY29udGV4dCcpO1xuXHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMuX2RhdGEuY29udGV4dG1lbnUudmlzaWJsZSA9IHRydWU7XG5cdFx0XHQkLnZha2F0YS5jb250ZXh0LnNob3coYSwgeyAneCcgOiB4LCAneScgOiB5IH0sIGkpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiB0aGUgY29udGV4dG1lbnUgaXMgc2hvd24gZm9yIGEgbm9kZVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzaG93X2NvbnRleHRtZW51LmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSB4IHRoZSB4LWNvb3JkaW5hdGUgb2YgdGhlIG1lbnUgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50XG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0geSB0aGUgeS1jb29yZGluYXRlIG9mIHRoZSBtZW51IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuXHRcdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nob3dfY29udGV4dG1lbnUnLCB7IFwibm9kZVwiIDogb2JqLCBcInhcIiA6IHgsIFwieVwiIDogeSB9KTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIGNvbnRleHRtZW51IGhlbHBlclxuXHQoZnVuY3Rpb24gKCQpIHtcblx0XHR2YXIgcmlnaHRfdG9fbGVmdCA9IGZhbHNlLFxuXHRcdFx0dmFrYXRhX2NvbnRleHQgPSB7XG5cdFx0XHRcdGVsZW1lbnRcdFx0OiBmYWxzZSxcblx0XHRcdFx0cmVmZXJlbmNlXHQ6IGZhbHNlLFxuXHRcdFx0XHRwb3NpdGlvbl94XHQ6IDAsXG5cdFx0XHRcdHBvc2l0aW9uX3lcdDogMCxcblx0XHRcdFx0aXRlbXNcdFx0OiBbXSxcblx0XHRcdFx0aHRtbFx0XHQ6IFwiXCIsXG5cdFx0XHRcdGlzX3Zpc2libGVcdDogZmFsc2Vcblx0XHRcdH07XG5cblx0XHQkLnZha2F0YS5jb250ZXh0ID0ge1xuXHRcdFx0c2V0dGluZ3MgOiB7XG5cdFx0XHRcdGhpZGVfb25tb3VzZWxlYXZlXHQ6IDAsXG5cdFx0XHRcdGljb25zXHRcdFx0XHQ6IHRydWVcblx0XHRcdH0sXG5cdFx0XHRfdHJpZ2dlciA6IGZ1bmN0aW9uIChldmVudF9uYW1lKSB7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXJIYW5kbGVyKFwiY29udGV4dF9cIiArIGV2ZW50X25hbWUgKyBcIi52YWthdGFcIiwge1xuXHRcdFx0XHRcdFwicmVmZXJlbmNlXCJcdDogdmFrYXRhX2NvbnRleHQucmVmZXJlbmNlLFxuXHRcdFx0XHRcdFwiZWxlbWVudFwiXHQ6IHZha2F0YV9jb250ZXh0LmVsZW1lbnQsXG5cdFx0XHRcdFx0XCJwb3NpdGlvblwiXHQ6IHtcblx0XHRcdFx0XHRcdFwieFwiIDogdmFrYXRhX2NvbnRleHQucG9zaXRpb25feCxcblx0XHRcdFx0XHRcdFwieVwiIDogdmFrYXRhX2NvbnRleHQucG9zaXRpb25feVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9LFxuXHRcdFx0X2V4ZWN1dGUgOiBmdW5jdGlvbiAoaSkge1xuXHRcdFx0XHRpID0gdmFrYXRhX2NvbnRleHQuaXRlbXNbaV07XG5cdFx0XHRcdHJldHVybiBpICYmICghaS5fZGlzYWJsZWQgfHwgKCQudmFrYXRhLmlzX2Z1bmN0aW9uKGkuX2Rpc2FibGVkKSAmJiAhaS5fZGlzYWJsZWQoeyBcIml0ZW1cIiA6IGksIFwicmVmZXJlbmNlXCIgOiB2YWthdGFfY29udGV4dC5yZWZlcmVuY2UsIFwiZWxlbWVudFwiIDogdmFrYXRhX2NvbnRleHQuZWxlbWVudCB9KSkpICYmIGkuYWN0aW9uID8gaS5hY3Rpb24uY2FsbChudWxsLCB7XG5cdFx0XHRcdFx0XHRcdFwiaXRlbVwiXHRcdDogaSxcblx0XHRcdFx0XHRcdFx0XCJyZWZlcmVuY2VcIlx0OiB2YWthdGFfY29udGV4dC5yZWZlcmVuY2UsXG5cdFx0XHRcdFx0XHRcdFwiZWxlbWVudFwiXHQ6IHZha2F0YV9jb250ZXh0LmVsZW1lbnQsXG5cdFx0XHRcdFx0XHRcdFwicG9zaXRpb25cIlx0OiB7XG5cdFx0XHRcdFx0XHRcdFx0XCJ4XCIgOiB2YWthdGFfY29udGV4dC5wb3NpdGlvbl94LFxuXHRcdFx0XHRcdFx0XHRcdFwieVwiIDogdmFrYXRhX2NvbnRleHQucG9zaXRpb25feVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KSA6IGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdF9wYXJzZSA6IGZ1bmN0aW9uIChvLCBpc19jYWxsYmFjaykge1xuXHRcdFx0XHRpZighbykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0aWYoIWlzX2NhbGxiYWNrKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuaHRtbFx0XHQ9IFwiXCI7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuaXRlbXNcdD0gW107XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIHN0ciA9IFwiXCIsXG5cdFx0XHRcdFx0c2VwID0gZmFsc2UsXG5cdFx0XHRcdFx0dG1wO1xuXG5cdFx0XHRcdGlmKGlzX2NhbGxiYWNrKSB7IHN0ciArPSBcIjxcIitcInVsPlwiOyB9XG5cdFx0XHRcdCQuZWFjaChvLCBmdW5jdGlvbiAoaSwgdmFsKSB7XG5cdFx0XHRcdFx0aWYoIXZhbCkgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0Lml0ZW1zLnB1c2godmFsKTtcblx0XHRcdFx0XHRpZighc2VwICYmIHZhbC5zZXBhcmF0b3JfYmVmb3JlKSB7XG5cdFx0XHRcdFx0XHRzdHIgKz0gXCI8XCIrXCJsaSBjbGFzcz0ndmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yJz48XCIrXCJhIGhyZWY9JyMnIFwiICsgKCQudmFrYXRhLmNvbnRleHQuc2V0dGluZ3MuaWNvbnMgPyAnJyA6ICdjbGFzcz1cInZha2F0YS1jb250ZXh0LW5vLWljb25zXCInKSArIFwiPiYjMTYwOzxcIitcIi9hPjxcIitcIi9saT5cIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2VwID0gZmFsc2U7XG5cdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wibGkgY2xhc3M9J1wiICsgKHZhbC5fY2xhc3MgfHwgXCJcIikgKyAodmFsLl9kaXNhYmxlZCA9PT0gdHJ1ZSB8fCAoJC52YWthdGEuaXNfZnVuY3Rpb24odmFsLl9kaXNhYmxlZCkgJiYgdmFsLl9kaXNhYmxlZCh7IFwiaXRlbVwiIDogdmFsLCBcInJlZmVyZW5jZVwiIDogdmFrYXRhX2NvbnRleHQucmVmZXJlbmNlLCBcImVsZW1lbnRcIiA6IHZha2F0YV9jb250ZXh0LmVsZW1lbnQgfSkpID8gXCIgdmFrYXRhLWNvbnRleHRtZW51LWRpc2FibGVkIFwiIDogXCJcIikgKyBcIicgXCIrKHZhbC5zaG9ydGN1dD9cIiBkYXRhLXNob3J0Y3V0PSdcIit2YWwuc2hvcnRjdXQrXCInIFwiOicnKStcIj5cIjtcblx0XHRcdFx0XHRzdHIgKz0gXCI8XCIrXCJhIGhyZWY9JyMnIHJlbD0nXCIgKyAodmFrYXRhX2NvbnRleHQuaXRlbXMubGVuZ3RoIC0gMSkgKyBcIicgXCIgKyAodmFsLnRpdGxlID8gXCJ0aXRsZT0nXCIgKyB2YWwudGl0bGUgKyBcIidcIiA6IFwiXCIpICsgXCI+XCI7XG5cdFx0XHRcdFx0aWYoJC52YWthdGEuY29udGV4dC5zZXR0aW5ncy5pY29ucykge1xuXHRcdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wiaSBcIjtcblx0XHRcdFx0XHRcdGlmKHZhbC5pY29uKSB7XG5cdFx0XHRcdFx0XHRcdGlmKHZhbC5pY29uLmluZGV4T2YoXCIvXCIpICE9PSAtMSB8fCB2YWwuaWNvbi5pbmRleE9mKFwiLlwiKSAhPT0gLTEpIHsgc3RyICs9IFwiIHN0eWxlPSdiYWNrZ3JvdW5kOnVybChcXFwiXCIgKyB2YWwuaWNvbiArIFwiXFxcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQnIFwiOyB9XG5cdFx0XHRcdFx0XHRcdGVsc2UgeyBzdHIgKz0gXCIgY2xhc3M9J1wiICsgdmFsLmljb24gKyBcIicgXCI7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHN0ciArPSBcIj48XCIrXCIvaT48XCIrXCJzcGFuIGNsYXNzPSd2YWthdGEtY29udGV4dG1lbnUtc2VwJz4mIzE2MDs8XCIrXCIvc3Bhbj5cIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RyICs9ICgkLnZha2F0YS5pc19mdW5jdGlvbih2YWwubGFiZWwpID8gdmFsLmxhYmVsKHsgXCJpdGVtXCIgOiBpLCBcInJlZmVyZW5jZVwiIDogdmFrYXRhX2NvbnRleHQucmVmZXJlbmNlLCBcImVsZW1lbnRcIiA6IHZha2F0YV9jb250ZXh0LmVsZW1lbnQgfSkgOiB2YWwubGFiZWwpICsgKHZhbC5zaG9ydGN1dD8nIDxzcGFuIGNsYXNzPVwidmFrYXRhLWNvbnRleHRtZW51LXNob3J0Y3V0IHZha2F0YS1jb250ZXh0bWVudS1zaG9ydGN1dC0nK3ZhbC5zaG9ydGN1dCsnXCI+JysgKHZhbC5zaG9ydGN1dF9sYWJlbCB8fCAnJykgKyc8L3NwYW4+JzonJykgKyBcIjxcIitcIi9hPlwiO1xuXHRcdFx0XHRcdGlmKHZhbC5zdWJtZW51KSB7XG5cdFx0XHRcdFx0XHR0bXAgPSAkLnZha2F0YS5jb250ZXh0Ll9wYXJzZSh2YWwuc3VibWVudSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRpZih0bXApIHsgc3RyICs9IHRtcDsgfVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzdHIgKz0gXCI8XCIrXCIvbGk+XCI7XG5cdFx0XHRcdFx0aWYodmFsLnNlcGFyYXRvcl9hZnRlcikge1xuXHRcdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wibGkgY2xhc3M9J3Zha2F0YS1jb250ZXh0LXNlcGFyYXRvcic+PFwiK1wiYSBocmVmPScjJyBcIiArICgkLnZha2F0YS5jb250ZXh0LnNldHRpbmdzLmljb25zID8gJycgOiAnY2xhc3M9XCJ2YWthdGEtY29udGV4dC1uby1pY29uc1wiJykgKyBcIj4mIzE2MDs8XCIrXCIvYT48XCIrXCIvbGk+XCI7XG5cdFx0XHRcdFx0XHRzZXAgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHRcdHN0ciAgPSBzdHIucmVwbGFjZSgvPGxpIGNsYXNzXFw9J3Zha2F0YS1jb250ZXh0LXNlcGFyYXRvcidcXD48XFwvbGlcXD4kLyxcIlwiKTtcblx0XHRcdFx0aWYoaXNfY2FsbGJhY2spIHsgc3RyICs9IFwiPC91bD5cIjsgfVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIG9uIHRoZSBkb2N1bWVudCB3aGVuIHRoZSBjb250ZXh0bWVudSBpcyBwYXJzZWQgKEhUTUwgaXMgYnVpbHQpXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0XHRcdCAqIEBuYW1lIGNvbnRleHRfcGFyc2UudmFrYXRhXG5cdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSByZWZlcmVuY2UgdGhlIGVsZW1lbnQgdGhhdCB3YXMgcmlnaHQgY2xpY2tlZFxuXHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgb2YgdGhlIG1lbnUgaXRzZWxmXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwb3NpdGlvbiB0aGUgeCAmIHkgY29vcmRpbmF0ZXMgb2YgdGhlIG1lbnVcblx0XHRcdFx0ICovXG5cdFx0XHRcdGlmKCFpc19jYWxsYmFjaykgeyB2YWthdGFfY29udGV4dC5odG1sID0gc3RyOyAkLnZha2F0YS5jb250ZXh0Ll90cmlnZ2VyKFwicGFyc2VcIik7IH1cblx0XHRcdFx0cmV0dXJuIHN0ci5sZW5ndGggPiAxMCA/IHN0ciA6IGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdF9zaG93X3N1Ym1lbnUgOiBmdW5jdGlvbiAobykge1xuXHRcdFx0XHRvID0gJChvKTtcblx0XHRcdFx0aWYoIW8ubGVuZ3RoIHx8ICFvLmNoaWxkcmVuKFwidWxcIikubGVuZ3RoKSB7IHJldHVybjsgfVxuXHRcdFx0XHR2YXIgZSA9IG8uY2hpbGRyZW4oXCJ1bFwiKSxcblx0XHRcdFx0XHR4bCA9IG8ub2Zmc2V0KCkubGVmdCxcblx0XHRcdFx0XHR4ID0geGwgKyBvLm91dGVyV2lkdGgoKSxcblx0XHRcdFx0XHR5ID0gby5vZmZzZXQoKS50b3AsXG5cdFx0XHRcdFx0dyA9IGUud2lkdGgoKSxcblx0XHRcdFx0XHRoID0gZS5oZWlnaHQoKSxcblx0XHRcdFx0XHRkdyA9ICQod2luZG93KS53aWR0aCgpICsgJCh3aW5kb3cpLnNjcm9sbExlZnQoKSxcblx0XHRcdFx0XHRkaCA9ICQod2luZG93KS5oZWlnaHQoKSArICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHRcdFx0Ly8g0LzQvtC20LUg0LTQsCDRgdC1INGB0L/QtdGB0YLQuCDQtSDQtdC00L3QsCDQv9GA0L7QstC10YDQutCwIC0g0LTQsNC70Lgg0L3Rj9C80LAg0L3Rj9C60L7QuSDQvtGCINC60LvQsNGB0L7QstC10YLQtSDQstC10YfQtSDQvdCw0LPQvtGA0LVcblx0XHRcdFx0aWYocmlnaHRfdG9fbGVmdCkge1xuXHRcdFx0XHRcdG9beCAtICh3ICsgMTAgKyBvLm91dGVyV2lkdGgoKSkgPCAwID8gXCJhZGRDbGFzc1wiIDogXCJyZW1vdmVDbGFzc1wiXShcInZha2F0YS1jb250ZXh0LWxlZnRcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0b1t4ICsgdyA+IGR3ICAmJiB4bCA+IGR3IC0geCA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oXCJ2YWthdGEtY29udGV4dC1yaWdodFwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih5ICsgaCArIDEwID4gZGgpIHtcblx0XHRcdFx0XHRlLmNzcyhcImJvdHRvbVwiLFwiLTFweFwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vaWYgZG9lcyBub3QgZml0IC0gc3RpY2sgaXQgdG8gdGhlIHNpZGVcblx0XHRcdFx0aWYgKG8uaGFzQ2xhc3MoJ3Zha2F0YS1jb250ZXh0LXJpZ2h0JykpIHtcblx0XHRcdFx0XHRpZiAoeGwgPCB3KSB7XG5cdFx0XHRcdFx0XHRlLmNzcyhcIm1hcmdpbi1yaWdodFwiLCB4bCAtIHcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAoZHcgLSB4IDwgdykge1xuXHRcdFx0XHRcdFx0ZS5jc3MoXCJtYXJnaW4tbGVmdFwiLCBkdyAtIHggLSB3KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlLnNob3coKTtcblx0XHRcdH0sXG5cdFx0XHRzaG93IDogZnVuY3Rpb24gKHJlZmVyZW5jZSwgcG9zaXRpb24sIGRhdGEpIHtcblx0XHRcdFx0dmFyIG8sIGUsIHgsIHksIHcsIGgsIGR3LCBkaCwgY29uZCA9IHRydWU7XG5cdFx0XHRcdGlmKHZha2F0YV9jb250ZXh0LmVsZW1lbnQgJiYgdmFrYXRhX2NvbnRleHQuZWxlbWVudC5sZW5ndGgpIHtcblx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50LndpZHRoKCcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzd2l0Y2goY29uZCkge1xuXHRcdFx0XHRcdGNhc2UgKCFwb3NpdGlvbiAmJiAhcmVmZXJlbmNlKTpcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRjYXNlICghIXBvc2l0aW9uICYmICEhcmVmZXJlbmNlKTpcblx0XHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LnJlZmVyZW5jZVx0PSByZWZlcmVuY2U7XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5wb3NpdGlvbl94XHQ9IHBvc2l0aW9uLng7XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5wb3NpdGlvbl95XHQ9IHBvc2l0aW9uLnk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICghcG9zaXRpb24gJiYgISFyZWZlcmVuY2UpOlxuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucmVmZXJlbmNlXHQ9IHJlZmVyZW5jZTtcblx0XHRcdFx0XHRcdG8gPSByZWZlcmVuY2Uub2Zmc2V0KCk7XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5wb3NpdGlvbl94XHQ9IG8ubGVmdCArIHJlZmVyZW5jZS5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feVx0PSBvLnRvcDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgKCEhcG9zaXRpb24gJiYgIXJlZmVyZW5jZSk6XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5wb3NpdGlvbl94XHQ9IHBvc2l0aW9uLng7XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5wb3NpdGlvbl95XHQ9IHBvc2l0aW9uLnk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighIXJlZmVyZW5jZSAmJiAhZGF0YSAmJiAkKHJlZmVyZW5jZSkuZGF0YSgndmFrYXRhX2NvbnRleHRtZW51JykpIHtcblx0XHRcdFx0XHRkYXRhID0gJChyZWZlcmVuY2UpLmRhdGEoJ3Zha2F0YV9jb250ZXh0bWVudScpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCQudmFrYXRhLmNvbnRleHQuX3BhcnNlKGRhdGEpKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5odG1sKHZha2F0YV9jb250ZXh0Lmh0bWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHZha2F0YV9jb250ZXh0Lml0ZW1zLmxlbmd0aCkge1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG5cdFx0XHRcdFx0ZSA9IHZha2F0YV9jb250ZXh0LmVsZW1lbnQ7XG5cdFx0XHRcdFx0eCA9IHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3g7XG5cdFx0XHRcdFx0eSA9IHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3k7XG5cdFx0XHRcdFx0dyA9IGUud2lkdGgoKTtcblx0XHRcdFx0XHRoID0gZS5oZWlnaHQoKTtcblx0XHRcdFx0XHRkdyA9ICQod2luZG93KS53aWR0aCgpICsgJCh3aW5kb3cpLnNjcm9sbExlZnQoKTtcblx0XHRcdFx0XHRkaCA9ICQod2luZG93KS5oZWlnaHQoKSArICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0XHRcdFx0XHRpZihyaWdodF90b19sZWZ0KSB7XG5cdFx0XHRcdFx0XHR4IC09IChlLm91dGVyV2lkdGgoKSAtICQocmVmZXJlbmNlKS5vdXRlcldpZHRoKCkpO1xuXHRcdFx0XHRcdFx0aWYoeCA8ICQod2luZG93KS5zY3JvbGxMZWZ0KCkgKyAyMCkge1xuXHRcdFx0XHRcdFx0XHR4ID0gJCh3aW5kb3cpLnNjcm9sbExlZnQoKSArIDIwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZih4ICsgdyArIDIwID4gZHcpIHtcblx0XHRcdFx0XHRcdHggPSBkdyAtICh3ICsgMjApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZih5ICsgaCArIDIwID4gZGgpIHtcblx0XHRcdFx0XHRcdHkgPSBkaCAtIChoICsgMjApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0XHRcdC5jc3MoeyBcImxlZnRcIiA6IHgsIFwidG9wXCIgOiB5IH0pXG5cdFx0XHRcdFx0XHQuc2hvdygpXG5cdFx0XHRcdFx0XHQuZmluZCgnYScpLmZpcnN0KCkudHJpZ2dlcignZm9jdXMnKS5wYXJlbnQoKS5hZGRDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpO1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmlzX3Zpc2libGUgPSB0cnVlO1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiB0aGUgY29udGV4dG1lbnUgaXMgc2hvd25cblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0XHRcdFx0ICogQG5hbWUgY29udGV4dF9zaG93LnZha2F0YVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSByZWZlcmVuY2UgdGhlIGVsZW1lbnQgdGhhdCB3YXMgcmlnaHQgY2xpY2tlZFxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBlbGVtZW50IHRoZSBET00gZWxlbWVudCBvZiB0aGUgbWVudSBpdHNlbGZcblx0XHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gdGhlIHggJiB5IGNvb3JkaW5hdGVzIG9mIHRoZSBtZW51XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5fdHJpZ2dlcihcInNob3dcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRoaWRlIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pc192aXNpYmxlKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5oaWRlKCkuZmluZChcInVsXCIpLmhpZGUoKS5lbmQoKS5maW5kKCc6Zm9jdXMnKS50cmlnZ2VyKCdibHVyJykuZW5kKCkuZGV0YWNoKCk7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuaXNfdmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiB0aGUgY29udGV4dG1lbnUgaXMgaGlkZGVuXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdFx0XHRcdCAqIEBuYW1lIGNvbnRleHRfaGlkZS52YWthdGFcblx0XHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gcmVmZXJlbmNlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHJpZ2h0IGNsaWNrZWRcblx0XHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgb2YgdGhlIG1lbnUgaXRzZWxmXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBvc2l0aW9uIHRoZSB4ICYgeSBjb29yZGluYXRlcyBvZiB0aGUgbWVudVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdCQudmFrYXRhLmNvbnRleHQuX3RyaWdnZXIoXCJoaWRlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQkKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJpZ2h0X3RvX2xlZnQgPSAkKGRvY3VtZW50LmJvZHkpLmNzcyhcImRpcmVjdGlvblwiKSA9PT0gXCJydGxcIjtcblx0XHRcdHZhciB0byA9IGZhbHNlO1xuXG5cdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50ID0gJChcIjx1bCBjbGFzcz0ndmFrYXRhLWNvbnRleHQnPjwvdWw+XCIpO1xuXHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudFxuXHRcdFx0XHQub24oXCJtb3VzZWVudGVyXCIsIFwibGlcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXG5cdFx0XHRcdFx0aWYoJC5jb250YWlucyh0aGlzLCBlLnJlbGF0ZWRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHQvLyDQv9GA0LXQvNCw0YXQvdCw0YLQviDQt9Cw0YDQsNC00LggZGVsZWdhdGUgbW91c2VsZWF2ZSDQv9C+LdC00L7Qu9GDXG5cdFx0XHRcdFx0XHQvLyAkKHRoaXMpLmZpbmQoXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikucmVtb3ZlQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZih0bykgeyBjbGVhclRpbWVvdXQodG8pOyB9XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikuZW5kKCk7XG5cblx0XHRcdFx0XHQkKHRoaXMpXG5cdFx0XHRcdFx0XHQuc2libGluZ3MoKS5maW5kKFwidWxcIikuaGlkZSgpLmVuZCgpLmVuZCgpXG5cdFx0XHRcdFx0XHQucGFyZW50c1VudGlsKFwiLnZha2F0YS1jb250ZXh0XCIsIFwibGlcIikuYWRkQmFjaygpLmFkZENsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIik7XG5cdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5fc2hvd19zdWJtZW51KHRoaXMpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQvLyDRgtC10YHRgtC+0LLQviAtINC00LDQu9C4INC90LUg0L3QsNGC0L7QstCw0YDQstCwP1xuXHRcdFx0XHQub24oXCJtb3VzZWxlYXZlXCIsIFwibGlcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZigkLmNvbnRhaW5zKHRoaXMsIGUucmVsYXRlZFRhcmdldCkpIHsgcmV0dXJuOyB9XG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmFkZEJhY2soKS5yZW1vdmVDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIik7XG5cdFx0XHRcdFx0aWYoJC52YWthdGEuY29udGV4dC5zZXR0aW5ncy5oaWRlX29ubW91c2VsZWF2ZSkge1xuXHRcdFx0XHRcdFx0dG8gPSBzZXRUaW1lb3V0KFxuXHRcdFx0XHRcdFx0XHQoZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKCkgeyAkLnZha2F0YS5jb250ZXh0LmhpZGUoKTsgfTtcblx0XHRcdFx0XHRcdFx0fSh0aGlzKSksICQudmFrYXRhLmNvbnRleHQuc2V0dGluZ3MuaGlkZV9vbm1vdXNlbGVhdmUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKFwiY2xpY2tcIiwgXCJhXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHQvL30pXG5cdFx0XHRcdC8vLm9uKFwibW91c2V1cFwiLCBcImFcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRpZighJCh0aGlzKS50cmlnZ2VyKCdibHVyJykucGFyZW50KCkuaGFzQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1kaXNhYmxlZFwiKSAmJiAkLnZha2F0YS5jb250ZXh0Ll9leGVjdXRlKCQodGhpcykuYXR0cihcInJlbFwiKSkgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHQkLnZha2F0YS5jb250ZXh0LmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigna2V5ZG93bicsICdhJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHZhciBvID0gbnVsbDtcblx0XHRcdFx0XHRcdHN3aXRjaChlLndoaWNoKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMTM6XG5cdFx0XHRcdFx0XHRcdGNhc2UgMzI6XG5cdFx0XHRcdFx0XHRcdFx0ZS50eXBlID0gXCJjbGlja1wiO1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkudHJpZ2dlcihlKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pc192aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikubGFzdCgpLmNsb3Nlc3QoXCJsaVwiKS5maXJzdCgpLmZpbmQoXCJ1bFwiKS5oaWRlKCkuZmluZChcIi52YWthdGEtY29udGV4dC1ob3ZlclwiKS5yZW1vdmVDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmVuZCgpLmVuZCgpLmNoaWxkcmVuKCdhJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIDM4OlxuXHRcdFx0XHRcdFx0XHRcdGlmKHZha2F0YV9jb250ZXh0LmlzX3Zpc2libGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG8gPSB2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCJ1bDp2aXNpYmxlXCIpLmFkZEJhY2soKS5sYXN0KCkuY2hpbGRyZW4oXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikucmVtb3ZlQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKS5wcmV2QWxsKFwibGk6bm90KC52YWthdGEtY29udGV4dC1zZXBhcmF0b3IpXCIpLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZighby5sZW5ndGgpIHsgbyA9IHZha2F0YV9jb250ZXh0LmVsZW1lbnQuZmluZChcInVsOnZpc2libGVcIikuYWRkQmFjaygpLmxhc3QoKS5jaGlsZHJlbihcImxpOm5vdCgudmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yKVwiKS5sYXN0KCk7IH1cblx0XHRcdFx0XHRcdFx0XHRcdG8uYWRkQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKS5jaGlsZHJlbignYScpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pc192aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikubGFzdCgpLmNoaWxkcmVuKFwidWxcIikuc2hvdygpLmNoaWxkcmVuKFwibGk6bm90KC52YWthdGEtY29udGV4dC1zZXBhcmF0b3IpXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikuZmlyc3QoKS5hZGRDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmNoaWxkcmVuKCdhJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIDQwOlxuXHRcdFx0XHRcdFx0XHRcdGlmKHZha2F0YV9jb250ZXh0LmlzX3Zpc2libGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG8gPSB2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCJ1bDp2aXNpYmxlXCIpLmFkZEJhY2soKS5sYXN0KCkuY2hpbGRyZW4oXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikucmVtb3ZlQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKS5uZXh0QWxsKFwibGk6bm90KC52YWthdGEtY29udGV4dC1zZXBhcmF0b3IpXCIpLmZpcnN0KCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZighby5sZW5ndGgpIHsgbyA9IHZha2F0YV9jb250ZXh0LmVsZW1lbnQuZmluZChcInVsOnZpc2libGVcIikuYWRkQmFjaygpLmxhc3QoKS5jaGlsZHJlbihcImxpOm5vdCgudmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yKVwiKS5maXJzdCgpOyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRvLmFkZENsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikuY2hpbGRyZW4oJ2EnKS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMjc6XG5cdFx0XHRcdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2coZS53aGljaCk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdrZXlkb3duJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dmFyIGEgPSB2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoJy52YWthdGEtY29udGV4dG1lbnUtc2hvcnRjdXQtJyArIGUud2hpY2gpLnBhcmVudCgpO1xuXHRcdFx0XHRcdGlmKGEucGFyZW50KCkubm90KCcudmFrYXRhLWNvbnRleHQtZGlzYWJsZWQnKSkge1xuXHRcdFx0XHRcdFx0YS50cmlnZ2VyKCdjbGljaycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdCQoZG9jdW1lbnQpXG5cdFx0XHRcdC5vbihcIm1vdXNlZG93bi52YWthdGEuanN0cmVlXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYodmFrYXRhX2NvbnRleHQuaXNfdmlzaWJsZSAmJiB2YWthdGFfY29udGV4dC5lbGVtZW50WzBdICE9PSBlLnRhcmdldCAgJiYgISQuY29udGFpbnModmFrYXRhX2NvbnRleHQuZWxlbWVudFswXSwgZS50YXJnZXQpKSB7XG5cdFx0XHRcdFx0XHQkLnZha2F0YS5jb250ZXh0LmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbihcImNvbnRleHRfc2hvdy52YWthdGEuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwibGk6aGFzKHVsKVwiKS5jaGlsZHJlbihcImFcIikuYWRkQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1wYXJlbnRcIik7XG5cdFx0XHRcdFx0aWYocmlnaHRfdG9fbGVmdCkge1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5hZGRDbGFzcyhcInZha2F0YS1jb250ZXh0LXJ0bFwiKS5jc3MoXCJkaXJlY3Rpb25cIiwgXCJydGxcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIGFsc28gYXBwbHkgYSBSVEwgY2xhc3M/XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwidWxcIikuaGlkZSgpLmVuZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9KTtcblx0fSgkKSk7XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcImNvbnRleHRtZW51XCIpO1xuXG5cbi8qKlxuICogIyMjIERyYWcnbidkcm9wIHBsdWdpblxuICpcbiAqIEVuYWJsZXMgZHJhZ2dpbmcgYW5kIGRyb3BwaW5nIG9mIG5vZGVzIGluIHRoZSB0cmVlLCByZXN1bHRpbmcgaW4gYSBtb3ZlIG9yIGNvcHkgb3BlcmF0aW9ucy5cbiAqL1xuXG5cdC8qKlxuXHQgKiBzdG9yZXMgYWxsIGRlZmF1bHRzIGZvciB0aGUgZHJhZyduJ2Ryb3AgcGx1Z2luXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZFxuXHQgKiBAcGx1Z2luIGRuZFxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuZG5kID0ge1xuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGEgY29weSBzaG91bGQgYmUgcG9zc2libGUgd2hpbGUgZHJhZ2dpbmcgKGJ5IHByZXNzaW50IHRoZSBtZXRhIGtleSBvciBDdHJsKS4gRGVmYXVsdHMgdG8gYHRydWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZC5jb3B5XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRjb3B5IDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBhIG51bWJlciBpbmRpY2F0aW5nIGhvdyBsb25nIGEgbm9kZSBzaG91bGQgcmVtYWluIGhvdmVyZWQgd2hpbGUgZHJhZ2dpbmcgdG8gYmUgb3BlbmVkLiBEZWZhdWx0cyB0byBgNTAwYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQub3Blbl90aW1lb3V0XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRvcGVuX3RpbWVvdXQgOiA1MDAsXG5cdFx0LyoqXG5cdFx0ICogYSBmdW5jdGlvbiBpbnZva2VkIGVhY2ggdGltZSBhIG5vZGUgaXMgYWJvdXQgdG8gYmUgZHJhZ2dlZCwgaW52b2tlZCBpbiB0aGUgdHJlZSdzIHNjb3BlIGFuZCByZWNlaXZlcyB0aGUgbm9kZXMgYWJvdXQgdG8gYmUgZHJhZ2dlZCBhcyBhbiBhcmd1bWVudCAoYXJyYXkpIGFuZCB0aGUgZXZlbnQgdGhhdCBzdGFydGVkIHRoZSBkcmFnIC0gcmV0dXJuIGBmYWxzZWAgdG8gcHJldmVudCBkcmFnZ2luZ1xuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZC5pc19kcmFnZ2FibGVcblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdGlzX2RyYWdnYWJsZSA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgY2hlY2tzIHNob3VsZCBjb25zdGFudGx5IGJlIG1hZGUgd2hpbGUgdGhlIHVzZXIgaXMgZHJhZ2dpbmcgdGhlIG5vZGUgKGFzIG9wcG9zZWQgdG8gY2hlY2tpbmcgb25seSBvbiBkcm9wKSwgZGVmYXVsdCBpcyBgdHJ1ZWBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuY2hlY2tfd2hpbGVfZHJhZ2dpbmdcblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdGNoZWNrX3doaWxlX2RyYWdnaW5nIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBub2RlcyBmcm9tIHRoaXMgdHJlZSBzaG91bGQgb25seSBiZSBjb3BpZWQgd2l0aCBkbmQgKGFzIG9wcG9zZWQgdG8gbW92ZWQpLCBkZWZhdWx0IGlzIGBmYWxzZWBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuYWx3YXlzX2NvcHlcblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdGFsd2F5c19jb3B5IDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogd2hlbiBkcm9wcGluZyBhIG5vZGUgXCJpbnNpZGVcIiwgdGhpcyBzZXR0aW5nIGluZGljYXRlcyB0aGUgcG9zaXRpb24gdGhlIG5vZGUgc2hvdWxkIGdvIHRvIC0gaXQgY2FuIGJlIGFuIGludGVnZXIgb3IgYSBzdHJpbmc6IFwiZmlyc3RcIiAoc2FtZSBhcyAwKSBvciBcImxhc3RcIiwgZGVmYXVsdCBpcyBgMGBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuaW5zaWRlX3Bvc1xuXHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0ICovXG5cdFx0aW5zaWRlX3BvcyA6IDAsXG5cdFx0LyoqXG5cdFx0ICogd2hlbiBzdGFydGluZyB0aGUgZHJhZyBvbiBhIG5vZGUgdGhhdCBpcyBzZWxlY3RlZCB0aGlzIHNldHRpbmcgY29udHJvbHMgaWYgYWxsIHNlbGVjdGVkIG5vZGVzIGFyZSBkcmFnZ2VkIG9yIG9ubHkgdGhlIHNpbmdsZSBub2RlLCBkZWZhdWx0IGlzIGB0cnVlYCwgd2hpY2ggbWVhbnMgYWxsIHNlbGVjdGVkIG5vZGVzIGFyZSBkcmFnZ2VkIHdoZW4gdGhlIGRyYWcgaXMgc3RhcnRlZCBvbiBhIHNlbGVjdGVkIG5vZGVcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuZHJhZ19zZWxlY3Rpb25cblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdGRyYWdfc2VsZWN0aW9uIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBjb250cm9scyB3aGV0aGVyIGRuZCB3b3JrcyBvbiB0b3VjaCBkZXZpY2VzLiBJZiBsZWZ0IGFzIGJvb2xlYW4gdHJ1ZSBkbmQgd2lsbCB3b3JrIHRoZSBzYW1lIGFzIGluIGRlc2t0b3AgYnJvd3NlcnMsIHdoaWNoIGluIHNvbWUgY2FzZXMgbWF5IGltcGFpciBzY3JvbGxpbmcuIElmIHNldCB0byBib29sZWFuIGZhbHNlIGRuZCB3aWxsIG5vdCB3b3JrIG9uIHRvdWNoIGRldmljZXMuIFRoZXJlIGlzIGEgc3BlY2lhbCB0aGlyZCBvcHRpb24gLSBzdHJpbmcgXCJzZWxlY3RlZFwiIHdoaWNoIG1lYW5zIG9ubHkgc2VsZWN0ZWQgbm9kZXMgY2FuIGJlIGRyYWdnZWQgb24gdG91Y2ggZGV2aWNlcy5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQudG91Y2hcblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdHRvdWNoIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBjb250cm9scyB3aGV0aGVyIGl0ZW1zIGNhbiBiZSBkcm9wcGVkIGFueXdoZXJlIG9uIHRoZSBub2RlLCBub3QganVzdCBvbiB0aGUgYW5jaG9yLCBieSBkZWZhdWx0IG9ubHkgdGhlIG5vZGUgYW5jaG9yIGlzIGEgdmFsaWQgZHJvcCB0YXJnZXQuIFdvcmtzIGJlc3Qgd2l0aCB0aGUgd2hvbGVyb3cgcGx1Z2luLiBJZiBlbmFibGVkIG9uIG1vYmlsZSBkZXBlbmRpbmcgb24gdGhlIGludGVyZmFjZSBpdCBtaWdodCBiZSBoYXJkIGZvciB0aGUgdXNlciB0byBjYW5jZWwgdGhlIGRyb3AsIHNpbmNlIHRoZSB3aG9sZSB0cmVlIGNvbnRhaW5lciB3aWxsIGJlIGEgdmFsaWQgZHJvcCB0YXJnZXQuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmxhcmdlX2Ryb3BfdGFyZ2V0XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRsYXJnZV9kcm9wX3RhcmdldCA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIGNvbnRyb2xzIHdoZXRoZXIgYSBkcmFnIGNhbiBiZSBpbml0aWF0ZWQgZnJvbSBhbnkgcGFydCBvZiB0aGUgbm9kZSBhbmQgbm90IGp1c3QgdGhlIHRleHQvaWNvbiBwYXJ0LCB3b3JrcyBiZXN0IHdpdGggdGhlIHdob2xlcm93IHBsdWdpbi4gS2VlcCBpbiBtaW5kIGl0IGNhbiBjYXVzZSBwcm9ibGVtcyB3aXRoIHRyZWUgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXBlbmRpbmcgb24gdGhlIGludGVyZmFjZSAtIGluIHRoYXQgY2FzZSBzZXQgdGhlIHRvdWNoIG9wdGlvbiB0byBcInNlbGVjdGVkXCIuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmxhcmdlX2RyYWdfdGFyZ2V0XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRsYXJnZV9kcmFnX3RhcmdldCA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIGNvbnRyb2xzIHdoZXRoZXIgdXNlIEhUTUw1IGRuZCBhcGkgaW5zdGVhZCBvZiBjbGFzc2ljYWwuIFRoYXQgd2lsbCBhbGxvdyBiZXR0ZXIgaW50ZWdyYXRpb24gb2YgZG5kIGV2ZW50cyB3aXRoIG90aGVyIEhUTUw1IGNvbnRyb2xzLlxuXHRcdCAqIEByZWZlcmVuY2UgaHR0cDovL2Nhbml1c2UuY29tLyNmZWF0PWRyYWduZHJvcFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZC51c2VfaHRtbDVcblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdHVzZV9odG1sNTogZmFsc2Vcblx0fTtcblx0dmFyIGRyZywgZWxtO1xuXHQvLyBUT0RPOiBub3cgY2hlY2sgd29ya3MgYnkgY2hlY2tpbmcgZm9yIGVhY2ggbm9kZSBpbmRpdmlkdWFsbHksIGhvdyBhYm91dCBtYXhfY2hpbGRyZW4sIHVuaXF1ZSwgZXRjP1xuXHQkLmpzdHJlZS5wbHVnaW5zLmRuZCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRcdHBhcmVudC5pbml0LmNhbGwodGhpcywgZWwsIG9wdGlvbnMpO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5kbmQudXNlX2h0bWw1ID0gdGhpcy5zZXR0aW5ncy5kbmQudXNlX2h0bWw1ICYmICgnZHJhZ2dhYmxlJyBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJykpO1xuXHRcdH07XG5cdFx0dGhpcy5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFyZW50LmJpbmQuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdC5vbih0aGlzLnNldHRpbmdzLmRuZC51c2VfaHRtbDUgPyAnZHJhZ3N0YXJ0LmpzdHJlZScgOiAnbW91c2Vkb3duLmpzdHJlZSB0b3VjaHN0YXJ0LmpzdHJlZScsIHRoaXMuc2V0dGluZ3MuZG5kLmxhcmdlX2RyYWdfdGFyZ2V0ID8gJy5qc3RyZWUtbm9kZScgOiAnLmpzdHJlZS1hbmNob3InLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5kbmQubGFyZ2VfZHJhZ190YXJnZXQgJiYgJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzdHJlZS1ub2RlJylbMF0gIT09IGUuY3VycmVudFRhcmdldCkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKGUudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIgJiYgKCF0aGlzLnNldHRpbmdzLmRuZC50b3VjaCB8fCAodGhpcy5zZXR0aW5ncy5kbmQudG91Y2ggPT09ICdzZWxlY3RlZCcgJiYgISQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KCcuanN0cmVlLW5vZGUnKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5oYXNDbGFzcygnanN0cmVlLWNsaWNrZWQnKSkpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dmFyIG9iaiA9IHRoaXMuZ2V0X25vZGUoZS50YXJnZXQpLFxuXHRcdFx0XHRcdFx0XHRtbHQgPSB0aGlzLmlzX3NlbGVjdGVkKG9iaikgJiYgdGhpcy5zZXR0aW5ncy5kbmQuZHJhZ19zZWxlY3Rpb24gPyB0aGlzLmdldF90b3Bfc2VsZWN0ZWQoKS5sZW5ndGggOiAxLFxuXHRcdFx0XHRcdFx0XHR0eHQgPSAobWx0ID4gMSA/IG1sdCArICcgJyArIHRoaXMuZ2V0X3N0cmluZygnbm9kZXMnKSA6IHRoaXMuZ2V0X3RleHQoZS5jdXJyZW50VGFyZ2V0KSk7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUuZm9yY2VfdGV4dCkge1xuXHRcdFx0XHRcdFx0XHR0eHQgPSAkLnZha2F0YS5odG1sLmVzY2FwZSh0eHQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYob2JqICYmIG9iai5pZCAmJiBvYmouaWQgIT09ICQuanN0cmVlLnJvb3QgJiYgKGUud2hpY2ggPT09IDEgfHwgZS50eXBlID09PSBcInRvdWNoc3RhcnRcIiB8fCBlLnR5cGUgPT09IFwiZHJhZ3N0YXJ0XCIpICYmXG5cdFx0XHRcdFx0XHRcdCh0aGlzLnNldHRpbmdzLmRuZC5pc19kcmFnZ2FibGUgPT09IHRydWUgfHwgKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHRoaXMuc2V0dGluZ3MuZG5kLmlzX2RyYWdnYWJsZSkgJiYgdGhpcy5zZXR0aW5ncy5kbmQuaXNfZHJhZ2dhYmxlLmNhbGwodGhpcywgKG1sdCA+IDEgPyB0aGlzLmdldF90b3Bfc2VsZWN0ZWQodHJ1ZSkgOiBbb2JqXSksIGUpKSlcblx0XHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0XHRkcmcgPSB7ICdqc3RyZWUnIDogdHJ1ZSwgJ29yaWdpbicgOiB0aGlzLCAnb2JqJyA6IHRoaXMuZ2V0X25vZGUob2JqLHRydWUpLCAnbm9kZXMnIDogbWx0ID4gMSA/IHRoaXMuZ2V0X3RvcF9zZWxlY3RlZCgpIDogW29iai5pZF0gfTtcblx0XHRcdFx0XHRcdFx0ZWxtID0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdFx0XHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5kbmQudXNlX2h0bWw1KSB7XG5cdFx0XHRcdFx0XHRcdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKCdzdGFydCcsIGUsIHsgJ2hlbHBlcic6ICQoKSwgJ2VsZW1lbnQnOiBlbG0sICdkYXRhJzogZHJnIH0pO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC50cmlnZ2VyKCdtb3VzZWRvd24uanN0cmVlJyk7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuICQudmFrYXRhLmRuZC5zdGFydChlLCBkcmcsICc8ZGl2IGlkPVwianN0cmVlLWRuZFwiIGNsYXNzPVwianN0cmVlLScgKyB0aGlzLmdldF90aGVtZSgpICsgJyBqc3RyZWUtJyArIHRoaXMuZ2V0X3RoZW1lKCkgKyAnLScgKyB0aGlzLmdldF90aGVtZV92YXJpYW50KCkgKyAnICcgKyAoIHRoaXMuc2V0dGluZ3MuY29yZS50aGVtZXMucmVzcG9uc2l2ZSA/ICcganN0cmVlLWRuZC1yZXNwb25zaXZlJyA6ICcnICkgKyAnXCI+PGkgY2xhc3M9XCJqc3RyZWUtaWNvbiBqc3RyZWUtZXJcIj48L2k+JyArIHR4dCArICc8aW5zIGNsYXNzPVwianN0cmVlLWNvcHlcIj4rPC9pbnM+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZG5kLnVzZV9odG1sNSkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0XHQub24oJ2RyYWdvdmVyLmpzdHJlZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKCdtb3ZlJywgZSwgeyAnaGVscGVyJzogJCgpLCAnZWxlbWVudCc6IGVsbSwgJ2RhdGEnOiBkcmcgfSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Ly8ub24oJ2RyYWdlbnRlci5qc3RyZWUnLCB0aGlzLnNldHRpbmdzLmRuZC5sYXJnZV9kcm9wX3RhcmdldCA/ICcuanN0cmVlLW5vZGUnIDogJy5qc3RyZWUtYW5jaG9yJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdC8vXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHQvL1x0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoJ21vdmUnLCBlLCB7ICdoZWxwZXInOiAkKCksICdlbGVtZW50JzogZWxtLCAnZGF0YSc6IGRyZyB9KTtcblx0XHRcdFx0XHQvL1x0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0Ly9cdH0sIHRoaXMpKVxuXHRcdFx0XHRcdC5vbignZHJvcC5qc3RyZWUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignc3RvcCcsIGUsIHsgJ2hlbHBlcic6ICQoKSwgJ2VsZW1lbnQnOiBlbG0sICdkYXRhJzogZHJnIH0pO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0dGhpcy5yZWRyYXdfbm9kZSA9IGZ1bmN0aW9uKG9iaiwgZGVlcCwgY2FsbGJhY2ssIGZvcmNlX3JlbmRlcikge1xuXHRcdFx0b2JqID0gcGFyZW50LnJlZHJhd19ub2RlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRpZiAob2JqICYmIHRoaXMuc2V0dGluZ3MuZG5kLnVzZV9odG1sNSkge1xuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5kbmQubGFyZ2VfZHJhZ190YXJnZXQpIHtcblx0XHRcdFx0XHRvYmouc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR2YXIgaSwgaiwgdG1wID0gbnVsbDtcblx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGROb2Rlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdGlmKG9iai5jaGlsZE5vZGVzW2ldICYmIG9iai5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZSAmJiBvYmouY2hpbGROb2Rlc1tpXS5jbGFzc05hbWUuaW5kZXhPZihcImpzdHJlZS1hbmNob3JcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHRtcCA9IG9iai5jaGlsZE5vZGVzW2ldO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYodG1wKSB7XG5cdFx0XHRcdFx0XHR0bXAuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fTtcblx0fTtcblxuXHQkKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGJpbmQgb25seSBvbmNlIGZvciBhbGwgaW5zdGFuY2VzXG5cdFx0dmFyIGxhc3RtdiA9IGZhbHNlLFxuXHRcdFx0bGFzdGVyID0gZmFsc2UsXG5cdFx0XHRsYXN0ZXYgPSBmYWxzZSxcblx0XHRcdG9wZW50byA9IGZhbHNlLFxuXHRcdFx0bWFya2VyID0gJCgnPGRpdiBpZD1cImpzdHJlZS1tYXJrZXJcIj4mIzE2MDs8L2Rpdj4nKS5oaWRlKCk7IC8vLmFwcGVuZFRvKCdib2R5Jyk7XG5cblx0XHQkKGRvY3VtZW50KVxuXHRcdFx0Lm9uKCdkcmFnb3Zlci52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKGVsbSkge1xuXHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignbW92ZScsIGUsIHsgJ2hlbHBlcic6ICQoKSwgJ2VsZW1lbnQnOiBlbG0sICdkYXRhJzogZHJnIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdkcm9wLnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoZWxtKSB7XG5cdFx0XHRcdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKCdzdG9wJywgZSwgeyAnaGVscGVyJzogJCgpLCAnZWxlbWVudCc6IGVsbSwgJ2RhdGEnOiBkcmcgfSk7XG5cdFx0XHRcdFx0ZWxtID0gbnVsbDtcblx0XHRcdFx0XHRkcmcgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdkbmRfc3RhcnQudmFrYXRhLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdGxhc3RtdiA9IGZhbHNlO1xuXHRcdFx0XHRsYXN0ZXYgPSBmYWxzZTtcblx0XHRcdFx0aWYoIWRhdGEgfHwgIWRhdGEuZGF0YSB8fCAhZGF0YS5kYXRhLmpzdHJlZSkgeyByZXR1cm47IH1cblx0XHRcdFx0bWFya2VyLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpOyAvLy5zaG93KCk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdkbmRfbW92ZS52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0dmFyIGlzRGlmZmVyZW50Tm9kZSA9IGRhdGEuZXZlbnQudGFyZ2V0ICE9PSBsYXN0ZXYudGFyZ2V0O1xuXHRcdFx0XHRpZihvcGVudG8pIHtcblx0XHRcdFx0XHRpZiAoIWRhdGEuZXZlbnQgfHwgZGF0YS5ldmVudC50eXBlICE9PSAnZHJhZ292ZXInIHx8IGlzRGlmZmVyZW50Tm9kZSkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KG9wZW50byk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFkYXRhIHx8ICFkYXRhLmRhdGEgfHwgIWRhdGEuZGF0YS5qc3RyZWUpIHsgcmV0dXJuOyB9XG5cblx0XHRcdFx0Ly8gaWYgd2UgYXJlIGhvdmVyaW5nIHRoZSBtYXJrZXIgaW1hZ2UgZG8gbm90aGluZyAoY2FuIGhhcHBlbiBvbiBcImluc2lkZVwiIGRyYWdzKVxuXHRcdFx0XHRpZihkYXRhLmV2ZW50LnRhcmdldC5pZCAmJiBkYXRhLmV2ZW50LnRhcmdldC5pZCA9PT0gJ2pzdHJlZS1tYXJrZXInKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxhc3RldiA9IGRhdGEuZXZlbnQ7XG5cblx0XHRcdFx0dmFyIGlucyA9ICQuanN0cmVlLnJlZmVyZW5jZShkYXRhLmV2ZW50LnRhcmdldCksXG5cdFx0XHRcdFx0cmVmID0gZmFsc2UsXG5cdFx0XHRcdFx0b2ZmID0gZmFsc2UsXG5cdFx0XHRcdFx0cmVsID0gZmFsc2UsXG5cdFx0XHRcdFx0dG1wLCBsLCB0LCBoLCBwLCBpLCBvLCBvaywgdDEsIHQyLCBvcCwgcHMsIHByLCBpcCwgdG0sIGlzX2NvcHksIHBuLCBjO1xuXHRcdFx0XHQvLyBpZiB3ZSBhcmUgb3ZlciBhbiBpbnN0YW5jZVxuXHRcdFx0XHRpZihpbnMgJiYgaW5zLl9kYXRhICYmIGlucy5fZGF0YS5kbmQpIHtcblx0XHRcdFx0XHRtYXJrZXIuYXR0cignY2xhc3MnLCAnanN0cmVlLScgKyBpbnMuZ2V0X3RoZW1lKCkgKyAoIGlucy5zZXR0aW5ncy5jb3JlLnRoZW1lcy5yZXNwb25zaXZlID8gJyBqc3RyZWUtZG5kLXJlc3BvbnNpdmUnIDogJycgKSk7XG5cdFx0XHRcdFx0aXNfY29weSA9IGRhdGEuZGF0YS5vcmlnaW4gJiYgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmFsd2F5c19jb3B5IHx8IChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5jb3B5ICYmIChkYXRhLmV2ZW50Lm1ldGFLZXkgfHwgZGF0YS5ldmVudC5jdHJsS2V5KSkpO1xuXHRcdFx0XHRcdGRhdGEuaGVscGVyXG5cdFx0XHRcdFx0XHQuY2hpbGRyZW4oKS5hdHRyKCdjbGFzcycsICdqc3RyZWUtJyArIGlucy5nZXRfdGhlbWUoKSArICcganN0cmVlLScgKyBpbnMuZ2V0X3RoZW1lKCkgKyAnLScgKyBpbnMuZ2V0X3RoZW1lX3ZhcmlhbnQoKSArICcgJyArICggaW5zLnNldHRpbmdzLmNvcmUudGhlbWVzLnJlc3BvbnNpdmUgPyAnIGpzdHJlZS1kbmQtcmVzcG9uc2l2ZScgOiAnJyApKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy5qc3RyZWUtY29weScpLmZpcnN0KClbIGlzX2NvcHkgPyAnc2hvdycgOiAnaGlkZScgXSgpO1xuXG5cdFx0XHRcdFx0Ly8gaWYgYXJlIGhvdmVyaW5nIHRoZSBjb250YWluZXIgaXRzZWxmIGFkZCBhIG5ldyByb290IG5vZGVcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGRhdGEuZXZlbnQpO1xuXHRcdFx0XHRcdGlmKCAoZGF0YS5ldmVudC50YXJnZXQgPT09IGlucy5lbGVtZW50WzBdIHx8IGRhdGEuZXZlbnQudGFyZ2V0ID09PSBpbnMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKSAmJiBpbnMuZ2V0X2NvbnRhaW5lcl91bCgpLmNoaWxkcmVuKCkubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IGRhdGEuZGF0YS5ub2Rlcy5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHRcdFx0b2sgPSBvayAmJiBpbnMuY2hlY2soIChkYXRhLmRhdGEub3JpZ2luICYmIChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5hbHdheXNfY29weSB8fCAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuY29weSAmJiAoZGF0YS5ldmVudC5tZXRhS2V5IHx8IGRhdGEuZXZlbnQuY3RybEtleSkpICkgPyBcImNvcHlfbm9kZVwiIDogXCJtb3ZlX25vZGVcIiksIChkYXRhLmRhdGEub3JpZ2luICYmIGRhdGEuZGF0YS5vcmlnaW4gIT09IGlucyA/IGRhdGEuZGF0YS5vcmlnaW4uZ2V0X25vZGUoZGF0YS5kYXRhLm5vZGVzW3QxXSkgOiBkYXRhLmRhdGEubm9kZXNbdDFdKSwgJC5qc3RyZWUucm9vdCwgJ2xhc3QnLCB7ICdkbmQnIDogdHJ1ZSwgJ3JlZicgOiBpbnMuZ2V0X25vZGUoJC5qc3RyZWUucm9vdCksICdwb3MnIDogJ2knLCAnb3JpZ2luJyA6IGRhdGEuZGF0YS5vcmlnaW4sICdpc19tdWx0aScgOiAoZGF0YS5kYXRhLm9yaWdpbiAmJiBkYXRhLmRhdGEub3JpZ2luICE9PSBpbnMpLCAnaXNfZm9yZWlnbicgOiAoIWRhdGEuZGF0YS5vcmlnaW4pIH0pO1xuXHRcdFx0XHRcdFx0XHRpZighb2spIHsgYnJlYWs7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKG9rKSB7XG5cdFx0XHRcdFx0XHRcdGxhc3RtdiA9IHsgJ2lucycgOiBpbnMsICdwYXInIDogJC5qc3RyZWUucm9vdCwgJ3BvcycgOiAnbGFzdCcgfTtcblx0XHRcdFx0XHRcdFx0bWFya2VyLmhpZGUoKTtcblx0XHRcdFx0XHRcdFx0ZGF0YS5oZWxwZXIuZmluZCgnLmpzdHJlZS1pY29uJykuZmlyc3QoKS5yZW1vdmVDbGFzcygnanN0cmVlLWVyJykuYWRkQ2xhc3MoJ2pzdHJlZS1vaycpO1xuXHRcdFx0XHRcdFx0XHRpZiAoZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50ICYmIGRhdGEuZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBpc19jb3B5ID8gJ2NvcHknIDogJ21vdmUnO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBpZiB3ZSBhcmUgaG92ZXJpbmcgYSB0cmVlIG5vZGVcblx0XHRcdFx0XHRcdHJlZiA9IGlucy5zZXR0aW5ncy5kbmQubGFyZ2VfZHJvcF90YXJnZXQgPyAkKGRhdGEuZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanN0cmVlLW5vZGUnKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKSA6ICQoZGF0YS5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qc3RyZWUtYW5jaG9yJyk7XG5cdFx0XHRcdFx0XHRpZihyZWYgJiYgcmVmLmxlbmd0aCAmJiByZWYucGFyZW50KCkuaXMoJy5qc3RyZWUtY2xvc2VkLCAuanN0cmVlLW9wZW4sIC5qc3RyZWUtbGVhZicpKSB7XG5cdFx0XHRcdFx0XHRcdG9mZiA9IHJlZi5vZmZzZXQoKTtcblx0XHRcdFx0XHRcdFx0cmVsID0gKGRhdGEuZXZlbnQucGFnZVkgIT09IHVuZGVmaW5lZCA/IGRhdGEuZXZlbnQucGFnZVkgOiBkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQucGFnZVkpIC0gb2ZmLnRvcDtcblx0XHRcdFx0XHRcdFx0aCA9IHJlZi5vdXRlckhlaWdodCgpO1xuXHRcdFx0XHRcdFx0XHRpZihyZWwgPCBoIC8gMykge1xuXHRcdFx0XHRcdFx0XHRcdG8gPSBbJ2InLCAnaScsICdhJ107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSBpZihyZWwgPiBoIC0gaCAvIDMpIHtcblx0XHRcdFx0XHRcdFx0XHRvID0gWydhJywgJ2knLCAnYiddO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdG8gPSByZWwgPiBoIC8gMiA/IFsnaScsICdhJywgJ2InXSA6IFsnaScsICdiJywgJ2EnXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkLmVhY2gobywgZnVuY3Rpb24gKGosIHYpIHtcblx0XHRcdFx0XHRcdFx0XHRzd2l0Y2godikge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnYic6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGwgPSBvZmYubGVmdCAtIDY7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHQgPSBvZmYudG9wO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwID0gaW5zLmdldF9wYXJlbnQocmVmKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aSA9IHJlZi5wYXJlbnQoKS5pbmRleCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjID0gJ2pzdHJlZS1iZWxvdyc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnaSc6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlwID0gaW5zLnNldHRpbmdzLmRuZC5pbnNpZGVfcG9zO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bSA9IGlucy5nZXRfbm9kZShyZWYucGFyZW50KCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRsID0gb2ZmLmxlZnQgLSAyO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ID0gb2ZmLnRvcCArIGggLyAyICsgMTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cCA9IHRtLmlkO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpID0gaXAgPT09ICdmaXJzdCcgPyAwIDogKGlwID09PSAnbGFzdCcgPyB0bS5jaGlsZHJlbi5sZW5ndGggOiBNYXRoLm1pbihpcCwgdG0uY2hpbGRyZW4ubGVuZ3RoKSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGMgPSAnanN0cmVlLWluc2lkZSc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2FzZSAnYSc6XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGwgPSBvZmYubGVmdCAtIDY7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHQgPSBvZmYudG9wICsgaDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cCA9IGlucy5nZXRfcGFyZW50KHJlZik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkgPSByZWYucGFyZW50KCkuaW5kZXgoKSArIDE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGMgPSAnanN0cmVlLWFib3ZlJztcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdG9rID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IGRhdGEuZGF0YS5ub2Rlcy5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9wID0gZGF0YS5kYXRhLm9yaWdpbiAmJiAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuYWx3YXlzX2NvcHkgfHwgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmNvcHkgJiYgKGRhdGEuZXZlbnQubWV0YUtleSB8fCBkYXRhLmV2ZW50LmN0cmxLZXkpKSkgPyBcImNvcHlfbm9kZVwiIDogXCJtb3ZlX25vZGVcIjtcblx0XHRcdFx0XHRcdFx0XHRcdHBzID0gaTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKG9wID09PSBcIm1vdmVfbm9kZVwiICYmIHYgPT09ICdhJyAmJiAoZGF0YS5kYXRhLm9yaWdpbiAmJiBkYXRhLmRhdGEub3JpZ2luID09PSBpbnMpICYmIHAgPT09IGlucy5nZXRfcGFyZW50KGRhdGEuZGF0YS5ub2Rlc1t0MV0pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHByID0gaW5zLmdldF9ub2RlKHApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihwcyA+ICQuaW5BcnJheShkYXRhLmRhdGEubm9kZXNbdDFdLCBwci5jaGlsZHJlbikpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwcyAtPSAxO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRvayA9IG9rICYmICggKGlucyAmJiBpbnMuc2V0dGluZ3MgJiYgaW5zLnNldHRpbmdzLmRuZCAmJiBpbnMuc2V0dGluZ3MuZG5kLmNoZWNrX3doaWxlX2RyYWdnaW5nID09PSBmYWxzZSkgfHwgaW5zLmNoZWNrKG9wLCAoZGF0YS5kYXRhLm9yaWdpbiAmJiBkYXRhLmRhdGEub3JpZ2luICE9PSBpbnMgPyBkYXRhLmRhdGEub3JpZ2luLmdldF9ub2RlKGRhdGEuZGF0YS5ub2Rlc1t0MV0pIDogZGF0YS5kYXRhLm5vZGVzW3QxXSksIHAsIHBzLCB7ICdkbmQnIDogdHJ1ZSwgJ3JlZicgOiBpbnMuZ2V0X25vZGUocmVmLnBhcmVudCgpKSwgJ3BvcycgOiB2LCAnb3JpZ2luJyA6IGRhdGEuZGF0YS5vcmlnaW4sICdpc19tdWx0aScgOiAoZGF0YS5kYXRhLm9yaWdpbiAmJiBkYXRhLmRhdGEub3JpZ2luICE9PSBpbnMpLCAnaXNfZm9yZWlnbicgOiAoIWRhdGEuZGF0YS5vcmlnaW4pIH0pICk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZighb2spIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoaW5zICYmIGlucy5sYXN0X2Vycm9yKSB7IGxhc3RlciA9IGlucy5sYXN0X2Vycm9yKCk7IH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKHYgPT09ICdpJyAmJiByZWYucGFyZW50KCkuaXMoJy5qc3RyZWUtY2xvc2VkJykgJiYgaW5zLnNldHRpbmdzLmRuZC5vcGVuX3RpbWVvdXQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghZGF0YS5ldmVudCB8fCBkYXRhLmV2ZW50LnR5cGUgIT09ICdkcmFnb3ZlcicgfHwgaXNEaWZmZXJlbnROb2RlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChvcGVudG8pIHsgY2xlYXJUaW1lb3V0KG9wZW50byk7IH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0b3BlbnRvID0gc2V0VGltZW91dCgoZnVuY3Rpb24gKHgsIHopIHsgcmV0dXJuIGZ1bmN0aW9uICgpIHsgeC5vcGVuX25vZGUoeik7IH07IH0oaW5zLCByZWYpKSwgaW5zLnNldHRpbmdzLmRuZC5vcGVuX3RpbWVvdXQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihvaykge1xuXHRcdFx0XHRcdFx0XHRcdFx0cG4gPSBpbnMuZ2V0X25vZGUocCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIXBuLmhhc0NsYXNzKCcuanN0cmVlLWRuZC1wYXJlbnQnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKCcuanN0cmVlLWRuZC1wYXJlbnQnKS5yZW1vdmVDbGFzcygnanN0cmVlLWRuZC1wYXJlbnQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cG4uYWRkQ2xhc3MoJ2pzdHJlZS1kbmQtcGFyZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRsYXN0bXYgPSB7ICdpbnMnIDogaW5zLCAncGFyJyA6IHAsICdwb3MnIDogdiA9PT0gJ2knICYmIGlwID09PSAnbGFzdCcgJiYgaSA9PT0gMCAmJiAhaW5zLmlzX2xvYWRlZCh0bSkgPyAnbGFzdCcgOiBpIH07XG5cdFx0XHRcdFx0XHRcdFx0XHRtYXJrZXIuY3NzKHsgJ2xlZnQnIDogbCArICdweCcsICd0b3AnIDogdCArICdweCcgfSkuc2hvdygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLnJlbW92ZUNsYXNzKCdqc3RyZWUtYWJvdmUganN0cmVlLWluc2lkZSBqc3RyZWUtYmVsb3cnKS5hZGRDbGFzcyhjKTtcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGEuaGVscGVyLmZpbmQoJy5qc3RyZWUtaWNvbicpLmZpcnN0KCkucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1lcicpLmFkZENsYXNzKCdqc3RyZWUtb2snKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBpc19jb3B5ID8gJ2NvcHknIDogJ21vdmUnO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0bGFzdGVyID0ge307XG5cdFx0XHRcdFx0XHRcdFx0XHRvID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRpZihvID09PSB0cnVlKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHQkKCcuanN0cmVlLWRuZC1wYXJlbnQnKS5yZW1vdmVDbGFzcygnanN0cmVlLWRuZC1wYXJlbnQnKTtcblx0XHRcdFx0bGFzdG12ID0gZmFsc2U7XG5cdFx0XHRcdGRhdGEuaGVscGVyLmZpbmQoJy5qc3RyZWUtaWNvbicpLnJlbW92ZUNsYXNzKCdqc3RyZWUtb2snKS5hZGRDbGFzcygnanN0cmVlLWVyJyk7XG5cdFx0XHRcdGlmIChkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQgJiYgZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlcikge1xuXHRcdFx0XHRcdC8vZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ25vbmUnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG1hcmtlci5oaWRlKCk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdkbmRfc2Nyb2xsLnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRpZighZGF0YSB8fCAhZGF0YS5kYXRhIHx8ICFkYXRhLmRhdGEuanN0cmVlKSB7IHJldHVybjsgfVxuXHRcdFx0XHRtYXJrZXIuaGlkZSgpO1xuXHRcdFx0XHRsYXN0bXYgPSBmYWxzZTtcblx0XHRcdFx0bGFzdGV2ID0gZmFsc2U7XG5cdFx0XHRcdGRhdGEuaGVscGVyLmZpbmQoJy5qc3RyZWUtaWNvbicpLmZpcnN0KCkucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1vaycpLmFkZENsYXNzKCdqc3RyZWUtZXInKTtcblx0XHRcdH0pXG5cdFx0XHQub24oJ2RuZF9zdG9wLnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHQkKCcuanN0cmVlLWRuZC1wYXJlbnQnKS5yZW1vdmVDbGFzcygnanN0cmVlLWRuZC1wYXJlbnQnKTtcblx0XHRcdFx0aWYob3BlbnRvKSB7IGNsZWFyVGltZW91dChvcGVudG8pOyB9XG5cdFx0XHRcdGlmKCFkYXRhIHx8ICFkYXRhLmRhdGEgfHwgIWRhdGEuZGF0YS5qc3RyZWUpIHsgcmV0dXJuOyB9XG5cdFx0XHRcdG1hcmtlci5oaWRlKCkuZGV0YWNoKCk7XG5cdFx0XHRcdHZhciBpLCBqLCBub2RlcyA9IFtdO1xuXHRcdFx0XHRpZihsYXN0bXYpIHtcblx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXRhLmRhdGEubm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRub2Rlc1tpXSA9IGRhdGEuZGF0YS5vcmlnaW4gPyBkYXRhLmRhdGEub3JpZ2luLmdldF9ub2RlKGRhdGEuZGF0YS5ub2Rlc1tpXSkgOiBkYXRhLmRhdGEubm9kZXNbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxhc3Rtdi5pbnNbIGRhdGEuZGF0YS5vcmlnaW4gJiYgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmFsd2F5c19jb3B5IHx8IChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5jb3B5ICYmIChkYXRhLmV2ZW50Lm1ldGFLZXkgfHwgZGF0YS5ldmVudC5jdHJsS2V5KSkpID8gJ2NvcHlfbm9kZScgOiAnbW92ZV9ub2RlJyBdKG5vZGVzLCBsYXN0bXYucGFyLCBsYXN0bXYucG9zLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBkYXRhLmRhdGEub3JpZ2luKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRpID0gJChkYXRhLmV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzdHJlZScpO1xuXHRcdFx0XHRcdGlmKGkubGVuZ3RoICYmIGxhc3RlciAmJiBsYXN0ZXIuZXJyb3IgJiYgbGFzdGVyLmVycm9yID09PSAnY2hlY2snKSB7XG5cdFx0XHRcdFx0XHRpID0gaS5qc3RyZWUodHJ1ZSk7XG5cdFx0XHRcdFx0XHRpZihpKSB7XG5cdFx0XHRcdFx0XHRcdGkuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIGxhc3Rlcik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGxhc3RldiA9IGZhbHNlO1xuXHRcdFx0XHRsYXN0bXYgPSBmYWxzZTtcblx0XHRcdH0pXG5cdFx0XHQub24oJ2tleXVwLmpzdHJlZSBrZXlkb3duLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdGRhdGEgPSAkLnZha2F0YS5kbmQuX2dldCgpO1xuXHRcdFx0XHRpZihkYXRhICYmIGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0aWYgKGUudHlwZSA9PT0gXCJrZXl1cFwiICYmIGUud2hpY2ggPT09IDI3KSB7XG5cdFx0XHRcdFx0XHRpZiAob3BlbnRvKSB7IGNsZWFyVGltZW91dChvcGVudG8pOyB9XG5cdFx0XHRcdFx0XHRsYXN0bXYgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGxhc3RlciA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0bGFzdGV2ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRvcGVudG8gPSBmYWxzZTtcblx0XHRcdFx0XHRcdG1hcmtlci5oaWRlKCkuZGV0YWNoKCk7XG5cdFx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX2NsZWFuKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRhdGEuaGVscGVyLmZpbmQoJy5qc3RyZWUtY29weScpLmZpcnN0KClbIGRhdGEuZGF0YS5vcmlnaW4gJiYgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmFsd2F5c19jb3B5IHx8IChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5jb3B5ICYmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSkpID8gJ3Nob3cnIDogJ2hpZGUnIF0oKTtcblx0XHRcdFx0XHRcdGlmKGxhc3Rldikge1xuXHRcdFx0XHRcdFx0XHRsYXN0ZXYubWV0YUtleSA9IGUubWV0YUtleTtcblx0XHRcdFx0XHRcdFx0bGFzdGV2LmN0cmxLZXkgPSBlLmN0cmxLZXk7XG5cdFx0XHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignbW92ZScsIGxhc3Rldik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0fSk7XG5cblx0Ly8gaGVscGVyc1xuXHQoZnVuY3Rpb24gKCQpIHtcblx0XHQkLnZha2F0YS5odG1sID0ge1xuXHRcdFx0ZGl2IDogJCgnPGRpdj48L2Rpdj4nKSxcblx0XHRcdGVzY2FwZSA6IGZ1bmN0aW9uIChzdHIpIHtcblx0XHRcdFx0cmV0dXJuICQudmFrYXRhLmh0bWwuZGl2LnRleHQoc3RyKS5odG1sKCk7XG5cdFx0XHR9LFxuXHRcdFx0c3RyaXAgOiBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRcdHJldHVybiAkLnZha2F0YS5odG1sLmRpdi5lbXB0eSgpLmFwcGVuZCgkLnBhcnNlSFRNTChzdHIpKS50ZXh0KCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvLyBwcml2YXRlIHZhcmlhYmxlXG5cdFx0dmFyIHZha2F0YV9kbmQgPSB7XG5cdFx0XHRlbGVtZW50XHQ6IGZhbHNlLFxuXHRcdFx0dGFyZ2V0XHQ6IGZhbHNlLFxuXHRcdFx0aXNfZG93blx0OiBmYWxzZSxcblx0XHRcdGlzX2RyYWdcdDogZmFsc2UsXG5cdFx0XHRoZWxwZXJcdDogZmFsc2UsXG5cdFx0XHRoZWxwZXJfdzogMCxcblx0XHRcdGRhdGFcdDogZmFsc2UsXG5cdFx0XHRpbml0X3hcdDogMCxcblx0XHRcdGluaXRfeVx0OiAwLFxuXHRcdFx0c2Nyb2xsX2w6IDAsXG5cdFx0XHRzY3JvbGxfdDogMCxcblx0XHRcdHNjcm9sbF9lOiBmYWxzZSxcblx0XHRcdHNjcm9sbF9pOiBmYWxzZSxcblx0XHRcdGlzX3RvdWNoOiBmYWxzZVxuXHRcdH07XG5cdFx0JC52YWthdGEuZG5kID0ge1xuXHRcdFx0c2V0dGluZ3MgOiB7XG5cdFx0XHRcdHNjcm9sbF9zcGVlZFx0XHQ6IDEwLFxuXHRcdFx0XHRzY3JvbGxfcHJveGltaXR5XHQ6IDIwLFxuXHRcdFx0XHRoZWxwZXJfbGVmdFx0XHRcdDogNSxcblx0XHRcdFx0aGVscGVyX3RvcFx0XHRcdDogMTAsXG5cdFx0XHRcdHRocmVzaG9sZFx0XHRcdDogNSxcblx0XHRcdFx0dGhyZXNob2xkX3RvdWNoXHRcdDogMTBcblx0XHRcdH0sXG5cdFx0XHRfdHJpZ2dlciA6IGZ1bmN0aW9uIChldmVudF9uYW1lLCBlLCBkYXRhKSB7XG5cdFx0XHRcdGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRkYXRhID0gJC52YWthdGEuZG5kLl9nZXQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkYXRhLmV2ZW50ID0gZTtcblx0XHRcdFx0JChkb2N1bWVudCkudHJpZ2dlckhhbmRsZXIoXCJkbmRfXCIgKyBldmVudF9uYW1lICsgXCIudmFrYXRhXCIsIGRhdGEpO1xuXHRcdFx0fSxcblx0XHRcdF9nZXQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XCJkYXRhXCJcdFx0OiB2YWthdGFfZG5kLmRhdGEsXG5cdFx0XHRcdFx0XCJlbGVtZW50XCJcdDogdmFrYXRhX2RuZC5lbGVtZW50LFxuXHRcdFx0XHRcdFwiaGVscGVyXCJcdDogdmFrYXRhX2RuZC5oZWxwZXJcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0XHRfY2xlYW4gOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmKHZha2F0YV9kbmQuaGVscGVyKSB7IHZha2F0YV9kbmQuaGVscGVyLnJlbW92ZSgpOyB9XG5cdFx0XHRcdGlmKHZha2F0YV9kbmQuc2Nyb2xsX2kpIHsgY2xlYXJJbnRlcnZhbCh2YWthdGFfZG5kLnNjcm9sbF9pKTsgdmFrYXRhX2RuZC5zY3JvbGxfaSA9IGZhbHNlOyB9XG5cdFx0XHRcdHZha2F0YV9kbmQgPSB7XG5cdFx0XHRcdFx0ZWxlbWVudFx0OiBmYWxzZSxcblx0XHRcdFx0XHR0YXJnZXRcdDogZmFsc2UsXG5cdFx0XHRcdFx0aXNfZG93blx0OiBmYWxzZSxcblx0XHRcdFx0XHRpc19kcmFnXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdGhlbHBlclx0OiBmYWxzZSxcblx0XHRcdFx0XHRoZWxwZXJfdzogMCxcblx0XHRcdFx0XHRkYXRhXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdGluaXRfeFx0OiAwLFxuXHRcdFx0XHRcdGluaXRfeVx0OiAwLFxuXHRcdFx0XHRcdHNjcm9sbF9sOiAwLFxuXHRcdFx0XHRcdHNjcm9sbF90OiAwLFxuXHRcdFx0XHRcdHNjcm9sbF9lOiBmYWxzZSxcblx0XHRcdFx0XHRzY3JvbGxfaTogZmFsc2UsXG5cdFx0XHRcdFx0aXNfdG91Y2g6IGZhbHNlXG5cdFx0XHRcdH07XG5cdFx0XHRcdGVsbSA9IG51bGw7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9mZihcIm1vdXNlbW92ZS52YWthdGEuanN0cmVlIHRvdWNobW92ZS52YWthdGEuanN0cmVlXCIsICQudmFrYXRhLmRuZC5kcmFnKTtcblx0XHRcdFx0JChkb2N1bWVudCkub2ZmKFwibW91c2V1cC52YWthdGEuanN0cmVlIHRvdWNoZW5kLnZha2F0YS5qc3RyZWVcIiwgJC52YWthdGEuZG5kLnN0b3ApO1xuXHRcdFx0fSxcblx0XHRcdF9zY3JvbGwgOiBmdW5jdGlvbiAoaW5pdF9vbmx5KSB7XG5cdFx0XHRcdGlmKCF2YWthdGFfZG5kLnNjcm9sbF9lIHx8ICghdmFrYXRhX2RuZC5zY3JvbGxfbCAmJiAhdmFrYXRhX2RuZC5zY3JvbGxfdCkpIHtcblx0XHRcdFx0XHRpZih2YWthdGFfZG5kLnNjcm9sbF9pKSB7IGNsZWFySW50ZXJ2YWwodmFrYXRhX2RuZC5zY3JvbGxfaSk7IHZha2F0YV9kbmQuc2Nyb2xsX2kgPSBmYWxzZTsgfVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdmFrYXRhX2RuZC5zY3JvbGxfaSkge1xuXHRcdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2kgPSBzZXRJbnRlcnZhbCgkLnZha2F0YS5kbmQuX3Njcm9sbCwgMTAwKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoaW5pdF9vbmx5ID09PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHRcdHZhciBpID0gdmFrYXRhX2RuZC5zY3JvbGxfZS5zY3JvbGxUb3AoKSxcblx0XHRcdFx0XHRqID0gdmFrYXRhX2RuZC5zY3JvbGxfZS5zY3JvbGxMZWZ0KCk7XG5cdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2Uuc2Nyb2xsVG9wKGkgKyB2YWthdGFfZG5kLnNjcm9sbF90ICogJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9zcGVlZCk7XG5cdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2Uuc2Nyb2xsTGVmdChqICsgdmFrYXRhX2RuZC5zY3JvbGxfbCAqICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfc3BlZWQpO1xuXHRcdFx0XHRpZihpICE9PSB2YWthdGFfZG5kLnNjcm9sbF9lLnNjcm9sbFRvcCgpIHx8IGogIT09IHZha2F0YV9kbmQuc2Nyb2xsX2Uuc2Nyb2xsTGVmdCgpKSB7XG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogdHJpZ2dlcmVkIG9uIHRoZSBkb2N1bWVudCB3aGVuIGEgZHJhZyBjYXVzZXMgYW4gZWxlbWVudCB0byBzY3JvbGxcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdFx0XHRcdCAqIEBuYW1lIGRuZF9zY3JvbGwudmFrYXRhXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtNaXhlZH0gZGF0YSBhbnkgZGF0YSBzdXBwbGllZCB3aXRoIHRoZSBjYWxsIHRvICQudmFrYXRhLmRuZC5zdGFydFxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7RE9NfSBlbGVtZW50IHRoZSBET00gZWxlbWVudCBiZWluZyBkcmFnZ2VkXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGhlbHBlciB0aGUgaGVscGVyIHNob3duIG5leHQgdG8gdGhlIG1vdXNlXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGV2ZW50IHRoZSBlbGVtZW50IHRoYXQgaXMgc2Nyb2xsaW5nXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKFwic2Nyb2xsXCIsIHZha2F0YV9kbmQuc2Nyb2xsX2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0c3RhcnQgOiBmdW5jdGlvbiAoZSwgZGF0YSwgaHRtbCkge1xuXHRcdFx0XHRpZihlLnR5cGUgPT09IFwidG91Y2hzdGFydFwiICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKSB7XG5cdFx0XHRcdFx0ZS5wYWdlWCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcblx0XHRcdFx0XHRlLnBhZ2VZID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuXHRcdFx0XHRcdGUudGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodmFrYXRhX2RuZC5pc19kcmFnKSB7ICQudmFrYXRhLmRuZC5zdG9wKHt9KTsgfVxuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC51bnNlbGVjdGFibGUgPSBcIm9uXCI7XG5cdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlOyB9O1xuXHRcdFx0XHRcdGlmKGUuY3VycmVudFRhcmdldC5zdHlsZSkge1xuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LnN0eWxlLnRvdWNoQWN0aW9uID0gXCJub25lXCI7XG5cdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQuc3R5bGUubXNUb3VjaEFjdGlvbiA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LnN0eWxlLk1velVzZXJTZWxlY3QgPSBcIm5vbmVcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2goaWdub3JlKSB7IH1cblx0XHRcdFx0dmFrYXRhX2RuZC5pbml0X3hcdD0gZS5wYWdlWDtcblx0XHRcdFx0dmFrYXRhX2RuZC5pbml0X3lcdD0gZS5wYWdlWTtcblx0XHRcdFx0dmFrYXRhX2RuZC5kYXRhXHRcdD0gZGF0YTtcblx0XHRcdFx0dmFrYXRhX2RuZC5pc19kb3duXHQ9IHRydWU7XG5cdFx0XHRcdHZha2F0YV9kbmQuZWxlbWVudFx0PSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdHZha2F0YV9kbmQudGFyZ2V0XHQ9IGUudGFyZ2V0O1xuXHRcdFx0XHR2YWthdGFfZG5kLmlzX3RvdWNoXHQ9IGUudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCI7XG5cdFx0XHRcdGlmKGh0bWwgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2RuZC5oZWxwZXIgPSAkKFwiPGRpdiBpZD0ndmFrYXRhLWRuZCc+PC9kaXY+XCIpLmh0bWwoaHRtbCkuY3NzKHtcblx0XHRcdFx0XHRcdFwiZGlzcGxheVwiXHRcdDogXCJibG9ja1wiLFxuXHRcdFx0XHRcdFx0XCJtYXJnaW5cIlx0XHQ6IFwiMFwiLFxuXHRcdFx0XHRcdFx0XCJwYWRkaW5nXCJcdFx0OiBcIjBcIixcblx0XHRcdFx0XHRcdFwicG9zaXRpb25cIlx0XHQ6IFwiYWJzb2x1dGVcIixcblx0XHRcdFx0XHRcdFwidG9wXCJcdFx0XHQ6IFwiLTIwMDBweFwiLFxuXHRcdFx0XHRcdFx0XCJsaW5lSGVpZ2h0XCJcdDogXCIxNnB4XCIsXG5cdFx0XHRcdFx0XHRcInpJbmRleFwiXHRcdDogXCIxMDAwMFwiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JChkb2N1bWVudCkub24oXCJtb3VzZW1vdmUudmFrYXRhLmpzdHJlZSB0b3VjaG1vdmUudmFrYXRhLmpzdHJlZVwiLCAkLnZha2F0YS5kbmQuZHJhZyk7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9uKFwibW91c2V1cC52YWthdGEuanN0cmVlIHRvdWNoZW5kLnZha2F0YS5qc3RyZWVcIiwgJC52YWthdGEuZG5kLnN0b3ApO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0ZHJhZyA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmKGUudHlwZSA9PT0gXCJ0b3VjaG1vdmVcIiAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSkge1xuXHRcdFx0XHRcdGUucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG5cdFx0XHRcdFx0ZS5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcblx0XHRcdFx0XHRlLnRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0LCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCF2YWthdGFfZG5kLmlzX2Rvd24pIHsgcmV0dXJuOyB9XG5cdFx0XHRcdGlmKCF2YWthdGFfZG5kLmlzX2RyYWcpIHtcblx0XHRcdFx0XHRpZihcblx0XHRcdFx0XHRcdE1hdGguYWJzKGUucGFnZVggLSB2YWthdGFfZG5kLmluaXRfeCkgPiAodmFrYXRhX2RuZC5pc190b3VjaCA/ICQudmFrYXRhLmRuZC5zZXR0aW5ncy50aHJlc2hvbGRfdG91Y2ggOiAkLnZha2F0YS5kbmQuc2V0dGluZ3MudGhyZXNob2xkKSB8fFxuXHRcdFx0XHRcdFx0TWF0aC5hYnMoZS5wYWdlWSAtIHZha2F0YV9kbmQuaW5pdF95KSA+ICh2YWthdGFfZG5kLmlzX3RvdWNoID8gJC52YWthdGEuZG5kLnNldHRpbmdzLnRocmVzaG9sZF90b3VjaCA6ICQudmFrYXRhLmRuZC5zZXR0aW5ncy50aHJlc2hvbGQpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRpZih2YWthdGFfZG5kLmhlbHBlcikge1xuXHRcdFx0XHRcdFx0XHR2YWthdGFfZG5kLmhlbHBlci5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcblx0XHRcdFx0XHRcdFx0dmFrYXRhX2RuZC5oZWxwZXJfdyA9IHZha2F0YV9kbmQuaGVscGVyLm91dGVyV2lkdGgoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZha2F0YV9kbmQuaXNfZHJhZyA9IHRydWU7XG5cdFx0XHRcdFx0XHQkKHZha2F0YV9kbmQudGFyZ2V0KS5vbmUoJ2NsaWNrLnZha2F0YScsIGZhbHNlKTtcblx0XHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdFx0ICogdHJpZ2dlcmVkIG9uIHRoZSBkb2N1bWVudCB3aGVuIGEgZHJhZyBzdGFydHNcblx0XHRcdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHRcdFx0ICogQHBsdWdpbiBkbmRcblx0XHRcdFx0XHRcdCAqIEBuYW1lIGRuZF9zdGFydC52YWthdGFcblx0XHRcdFx0XHRcdCAqIEBwYXJhbSB7TWl4ZWR9IGRhdGEgYW55IGRhdGEgc3VwcGxpZWQgd2l0aCB0aGUgY2FsbCB0byAkLnZha2F0YS5kbmQuc3RhcnRcblx0XHRcdFx0XHRcdCAqIEBwYXJhbSB7RE9NfSBlbGVtZW50IHRoZSBET00gZWxlbWVudCBiZWluZyBkcmFnZ2VkXG5cdFx0XHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gaGVscGVyIHRoZSBoZWxwZXIgc2hvd24gbmV4dCB0byB0aGUgbW91c2Vcblx0XHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhlIHN0YXJ0IChwcm9iYWJseSBtb3VzZW1vdmUpXG5cdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcihcInN0YXJ0XCIsIGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHsgcmV0dXJuOyB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZCAgPSBmYWxzZSwgdyAgPSBmYWxzZSxcblx0XHRcdFx0XHRkaCA9IGZhbHNlLCB3aCA9IGZhbHNlLFxuXHRcdFx0XHRcdGR3ID0gZmFsc2UsIHd3ID0gZmFsc2UsXG5cdFx0XHRcdFx0ZHQgPSBmYWxzZSwgZGwgPSBmYWxzZSxcblx0XHRcdFx0XHRodCA9IGZhbHNlLCBobCA9IGZhbHNlO1xuXG5cdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX3QgPSAwO1xuXHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9sID0gMDtcblx0XHRcdFx0dmFrYXRhX2RuZC5zY3JvbGxfZSA9IGZhbHNlO1xuXHRcdFx0XHQkKCQoZS50YXJnZXQpLnBhcmVudHNVbnRpbChcImJvZHlcIikuYWRkQmFjaygpLmdldCgpLnJldmVyc2UoKSlcblx0XHRcdFx0XHQuZmlsdGVyKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHJldHVyblx0KC9eYXV0b3xzY3JvbGwkLykudGVzdCgkKHRoaXMpLmNzcyhcIm92ZXJmbG93XCIpKSAmJlxuXHRcdFx0XHRcdFx0XHRcdCh0aGlzLnNjcm9sbEhlaWdodCA+IHRoaXMub2Zmc2V0SGVpZ2h0IHx8IHRoaXMuc2Nyb2xsV2lkdGggPiB0aGlzLm9mZnNldFdpZHRoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHZhciB0ID0gJCh0aGlzKSwgbyA9IHQub2Zmc2V0KCk7XG5cdFx0XHRcdFx0XHRpZih0aGlzLnNjcm9sbEhlaWdodCA+IHRoaXMub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdGlmKG8udG9wICsgdC5oZWlnaHQoKSAtIGUucGFnZVkgPCAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3Byb3hpbWl0eSlcdHsgdmFrYXRhX2RuZC5zY3JvbGxfdCA9IDE7IH1cblx0XHRcdFx0XHRcdFx0aWYoZS5wYWdlWSAtIG8udG9wIDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHRcdFx0XHR7IHZha2F0YV9kbmQuc2Nyb2xsX3QgPSAtMTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYodGhpcy5zY3JvbGxXaWR0aCA+IHRoaXMub2Zmc2V0V2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0aWYoby5sZWZ0ICsgdC53aWR0aCgpIC0gZS5wYWdlWCA8ICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfcHJveGltaXR5KVx0eyB2YWthdGFfZG5kLnNjcm9sbF9sID0gMTsgfVxuXHRcdFx0XHRcdFx0XHRpZihlLnBhZ2VYIC0gby5sZWZ0IDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHRcdFx0XHR7IHZha2F0YV9kbmQuc2Nyb2xsX2wgPSAtMTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYodmFrYXRhX2RuZC5zY3JvbGxfdCB8fCB2YWthdGFfZG5kLnNjcm9sbF9sKSB7XG5cdFx0XHRcdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2UgPSAkKHRoaXMpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYoIXZha2F0YV9kbmQuc2Nyb2xsX2UpIHtcblx0XHRcdFx0XHRkICA9ICQoZG9jdW1lbnQpOyB3ID0gJCh3aW5kb3cpO1xuXHRcdFx0XHRcdGRoID0gZC5oZWlnaHQoKTsgd2ggPSB3LmhlaWdodCgpO1xuXHRcdFx0XHRcdGR3ID0gZC53aWR0aCgpOyB3dyA9IHcud2lkdGgoKTtcblx0XHRcdFx0XHRkdCA9IGQuc2Nyb2xsVG9wKCk7IGRsID0gZC5zY3JvbGxMZWZ0KCk7XG5cdFx0XHRcdFx0aWYoZGggPiB3aCAmJiBlLnBhZ2VZIC0gZHQgPCAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3Byb3hpbWl0eSlcdFx0eyB2YWthdGFfZG5kLnNjcm9sbF90ID0gLTE7ICB9XG5cdFx0XHRcdFx0aWYoZGggPiB3aCAmJiB3aCAtIChlLnBhZ2VZIC0gZHQpIDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHR7IHZha2F0YV9kbmQuc2Nyb2xsX3QgPSAxOyB9XG5cdFx0XHRcdFx0aWYoZHcgPiB3dyAmJiBlLnBhZ2VYIC0gZGwgPCAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3Byb3hpbWl0eSlcdFx0eyB2YWthdGFfZG5kLnNjcm9sbF9sID0gLTE7IH1cblx0XHRcdFx0XHRpZihkdyA+IHd3ICYmIHd3IC0gKGUucGFnZVggLSBkbCkgPCAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3Byb3hpbWl0eSlcdHsgdmFrYXRhX2RuZC5zY3JvbGxfbCA9IDE7IH1cblx0XHRcdFx0XHRpZih2YWthdGFfZG5kLnNjcm9sbF90IHx8IHZha2F0YV9kbmQuc2Nyb2xsX2wpIHtcblx0XHRcdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2UgPSBkO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZih2YWthdGFfZG5kLnNjcm9sbF9lKSB7ICQudmFrYXRhLmRuZC5fc2Nyb2xsKHRydWUpOyB9XG5cblx0XHRcdFx0aWYodmFrYXRhX2RuZC5oZWxwZXIpIHtcblx0XHRcdFx0XHRodCA9IHBhcnNlSW50KGUucGFnZVkgKyAkLnZha2F0YS5kbmQuc2V0dGluZ3MuaGVscGVyX3RvcCwgMTApO1xuXHRcdFx0XHRcdGhsID0gcGFyc2VJbnQoZS5wYWdlWCArICQudmFrYXRhLmRuZC5zZXR0aW5ncy5oZWxwZXJfbGVmdCwgMTApO1xuXHRcdFx0XHRcdGlmKGRoICYmIGh0ICsgMjUgPiBkaCkgeyBodCA9IGRoIC0gNTA7IH1cblx0XHRcdFx0XHRpZihkdyAmJiBobCArIHZha2F0YV9kbmQuaGVscGVyX3cgPiBkdykgeyBobCA9IGR3IC0gKHZha2F0YV9kbmQuaGVscGVyX3cgKyAyKTsgfVxuXHRcdFx0XHRcdHZha2F0YV9kbmQuaGVscGVyLmNzcyh7XG5cdFx0XHRcdFx0XHRsZWZ0XHQ6IGhsICsgXCJweFwiLFxuXHRcdFx0XHRcdFx0dG9wXHRcdDogaHQgKyBcInB4XCJcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIG9uIHRoZSBkb2N1bWVudCB3aGVuIGEgZHJhZyBpcyBpbiBwcm9ncmVzc1xuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQHBsdWdpbiBkbmRcblx0XHRcdFx0ICogQG5hbWUgZG5kX21vdmUudmFrYXRhXG5cdFx0XHRcdCAqIEBwYXJhbSB7TWl4ZWR9IGRhdGEgYW55IGRhdGEgc3VwcGxpZWQgd2l0aCB0aGUgY2FsbCB0byAkLnZha2F0YS5kbmQuc3RhcnRcblx0XHRcdFx0ICogQHBhcmFtIHtET019IGVsZW1lbnQgdGhlIERPTSBlbGVtZW50IGJlaW5nIGRyYWdnZWRcblx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGhlbHBlciB0aGUgaGVscGVyIHNob3duIG5leHQgdG8gdGhlIG1vdXNlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyB0byB0cmlnZ2VyIChtb3N0IGxpa2VseSBtb3VzZW1vdmUpXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoXCJtb3ZlXCIsIGUpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0c3RvcCA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmKGUudHlwZSA9PT0gXCJ0b3VjaGVuZFwiICYmIGUub3JpZ2luYWxFdmVudCAmJiBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXMgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKSB7XG5cdFx0XHRcdFx0ZS5wYWdlWCA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcblx0XHRcdFx0XHRlLnBhZ2VZID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuXHRcdFx0XHRcdGUudGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSAtIHdpbmRvdy5wYWdlWU9mZnNldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodmFrYXRhX2RuZC5pc19kcmFnKSB7XG5cdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0ICogdHJpZ2dlcmVkIG9uIHRoZSBkb2N1bWVudCB3aGVuIGEgZHJhZyBzdG9wcyAodGhlIGRyYWdnZWQgZWxlbWVudCBpcyBkcm9wcGVkKVxuXHRcdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0XHRcdFx0ICogQG5hbWUgZG5kX3N0b3AudmFrYXRhXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtNaXhlZH0gZGF0YSBhbnkgZGF0YSBzdXBwbGllZCB3aXRoIHRoZSBjYWxsIHRvICQudmFrYXRhLmRuZC5zdGFydFxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7RE9NfSBlbGVtZW50IHRoZSBET00gZWxlbWVudCBiZWluZyBkcmFnZ2VkXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGhlbHBlciB0aGUgaGVscGVyIHNob3duIG5leHQgdG8gdGhlIG1vdXNlXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGUgc3RvcFxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdGlmIChlLnRhcmdldCAhPT0gdmFrYXRhX2RuZC50YXJnZXQpIHtcblx0XHRcdFx0XHRcdCQodmFrYXRhX2RuZC50YXJnZXQpLm9mZignY2xpY2sudmFrYXRhJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcihcInN0b3BcIiwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYoZS50eXBlID09PSBcInRvdWNoZW5kXCIgJiYgZS50YXJnZXQgPT09IHZha2F0YV9kbmQudGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHR2YXIgdG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgJChlLnRhcmdldCkudHJpZ2dlcignY2xpY2snKTsgfSwgMTAwKTtcblx0XHRcdFx0XHRcdCQoZS50YXJnZXQpLm9uZSgnY2xpY2snLCBmdW5jdGlvbigpIHsgaWYodG8pIHsgY2xlYXJUaW1lb3V0KHRvKTsgfSB9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JC52YWthdGEuZG5kLl9jbGVhbigpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fTtcblx0fSgkKSk7XG5cblx0Ly8gaW5jbHVkZSB0aGUgZG5kIHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcImRuZFwiKTtcblxuXG4vKipcbiAqICMjIyBNYXNzbG9hZCBwbHVnaW5cbiAqXG4gKiBBZGRzIG1hc3Nsb2FkIGZ1bmN0aW9uYWxpdHkgdG8ganNUcmVlLCBzbyB0aGF0IG11bHRpcGxlIG5vZGVzIGNhbiBiZSBsb2FkZWQgaW4gYSBzaW5nbGUgcmVxdWVzdCAob25seSB1c2VmdWwgd2l0aCBsYXp5IGxvYWRpbmcpLlxuICovXG5cblx0LyoqXG5cdCAqIG1hc3Nsb2FkIGNvbmZpZ3VyYXRpb25cblx0ICpcblx0ICogSXQgaXMgcG9zc2libGUgdG8gc2V0IHRoaXMgdG8gYSBzdGFuZGFyZCBqUXVlcnktbGlrZSBBSkFYIGNvbmZpZy5cblx0ICogSW4gYWRkaXRpb24gdG8gdGhlIHN0YW5kYXJkIGpRdWVyeSBhamF4IG9wdGlvbnMgaGVyZSB5b3UgY2FuIHN1cHBseSBmdW5jdGlvbnMgZm9yIGBkYXRhYCBhbmQgYHVybGAsIHRoZSBmdW5jdGlvbnMgd2lsbCBiZSBydW4gaW4gdGhlIGN1cnJlbnQgaW5zdGFuY2UncyBzY29wZSBhbmQgYSBwYXJhbSB3aWxsIGJlIHBhc3NlZCBpbmRpY2F0aW5nIHdoaWNoIG5vZGUgSURzIG5lZWQgdG8gYmUgbG9hZGVkLCB0aGUgcmV0dXJuIHZhbHVlIG9mIHRob3NlIGZ1bmN0aW9ucyB3aWxsIGJlIHVzZWQuXG5cdCAqXG5cdCAqIFlvdSBjYW4gYWxzbyBzZXQgdGhpcyB0byBhIGZ1bmN0aW9uLCB0aGF0IGZ1bmN0aW9uIHdpbGwgcmVjZWl2ZSB0aGUgbm9kZSBJRHMgYmVpbmcgbG9hZGVkIGFzIGFyZ3VtZW50IGFuZCBhIHNlY29uZCBwYXJhbSB3aGljaCBpcyBhIGZ1bmN0aW9uIChjYWxsYmFjaykgd2hpY2ggc2hvdWxkIGJlIGNhbGxlZCB3aXRoIHRoZSByZXN1bHQuXG5cdCAqXG5cdCAqIEJvdGggdGhlIEFKQVggYW5kIHRoZSBmdW5jdGlvbiBhcHByb2FjaCByZWx5IG9uIHRoZSBzYW1lIHJldHVybiB2YWx1ZSAtIGFuIG9iamVjdCB3aGVyZSB0aGUga2V5cyBhcmUgdGhlIG5vZGUgSURzLCBhbmQgdGhlIHZhbHVlIGlzIHRoZSBjaGlsZHJlbiBvZiB0aGF0IG5vZGUgYXMgYW4gYXJyYXkuXG5cdCAqXG5cdCAqXHR7XG5cdCAqXHRcdFwiaWQxXCIgOiBbeyBcInRleHRcIiA6IFwiQ2hpbGQgb2YgSUQxXCIsIFwiaWRcIiA6IFwiYzFcIiB9LCB7IFwidGV4dFwiIDogXCJBbm90aGVyIGNoaWxkIG9mIElEMVwiLCBcImlkXCIgOiBcImMyXCIgfV0sXG5cdCAqXHRcdFwiaWQyXCIgOiBbeyBcInRleHRcIiA6IFwiQ2hpbGQgb2YgSUQyXCIsIFwiaWRcIiA6IFwiYzNcIiB9XVxuXHQgKlx0fVxuXHQgKiBcblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMubWFzc2xvYWRcblx0ICogQHBsdWdpbiBtYXNzbG9hZFxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMubWFzc2xvYWQgPSBudWxsO1xuXHQkLmpzdHJlZS5wbHVnaW5zLm1hc3Nsb2FkID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0dGhpcy5fZGF0YS5tYXNzbG9hZCA9IHt9O1xuXHRcdFx0cGFyZW50LmluaXQuY2FsbCh0aGlzLCBlbCwgb3B0aW9ucyk7XG5cdFx0fTtcblx0XHR0aGlzLl9sb2FkX25vZGVzID0gZnVuY3Rpb24gKG5vZGVzLCBjYWxsYmFjaywgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbG9hZCkge1xuXHRcdFx0dmFyIHMgPSB0aGlzLnNldHRpbmdzLm1hc3Nsb2FkLFx0XHRcdFx0XG5cdFx0XHRcdHRvTG9hZCA9IFtdLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0aSwgaiwgZG9tO1xuXHRcdFx0aWYgKCFpc19jYWxsYmFjaykge1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBub2Rlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRpZighbVtub2Rlc1tpXV0gfHwgKCAoIW1bbm9kZXNbaV1dLnN0YXRlLmxvYWRlZCAmJiAhbVtub2Rlc1tpXV0uc3RhdGUuZmFpbGVkKSB8fCBmb3JjZV9yZWxvYWQpICkge1xuXHRcdFx0XHRcdFx0dG9Mb2FkLnB1c2gobm9kZXNbaV0pO1xuXHRcdFx0XHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShub2Rlc1tpXSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRpZiAoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKFwianN0cmVlLWxvYWRpbmdcIikuYXR0cignYXJpYS1idXN5Jyx0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fZGF0YS5tYXNzbG9hZCA9IHt9O1xuXHRcdFx0XHRpZiAodG9Mb2FkLmxlbmd0aCkge1xuXHRcdFx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHMpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcy5jYWxsKHRoaXMsIHRvTG9hZCwgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGksIGo7XG5cdFx0XHRcdFx0XHRcdGlmKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihkYXRhLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEubWFzc2xvYWRbaV0gPSBkYXRhW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBub2Rlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG5vZGVzW2ldLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhcImpzdHJlZS1sb2FkaW5nXCIpLmF0dHIoJ2FyaWEtYnVzeScsZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwYXJlbnQuX2xvYWRfbm9kZXMuY2FsbCh0aGlzLCBub2RlcywgY2FsbGJhY2ssIGlzX2NhbGxiYWNrLCBmb3JjZV9yZWxvYWQpO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYodHlwZW9mIHMgPT09ICdvYmplY3QnICYmIHMgJiYgcy51cmwpIHtcblx0XHRcdFx0XHRcdHMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcyk7XG5cdFx0XHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihzLnVybCkpIHtcblx0XHRcdFx0XHRcdFx0cy51cmwgPSBzLnVybC5jYWxsKHRoaXMsIHRvTG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihzLmRhdGEpKSB7XG5cdFx0XHRcdFx0XHRcdHMuZGF0YSA9IHMuZGF0YS5jYWxsKHRoaXMsIHRvTG9hZCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5hamF4KHMpXG5cdFx0XHRcdFx0XHRcdC5kb25lKGZ1bmN0aW9uIChkYXRhLHQseCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIGksIGo7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvcihpIGluIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZihkYXRhLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLm1hc3Nsb2FkW2ldID0gZGF0YVtpXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IG5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG5vZGVzW2ldLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKFwianN0cmVlLWxvYWRpbmdcIikuYXR0cignYXJpYS1idXN5JyxmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHBhcmVudC5fbG9hZF9ub2Rlcy5jYWxsKHRoaXMsIG5vZGVzLCBjYWxsYmFjaywgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbG9hZCk7XG5cdFx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdFx0XHQuZmFpbChmdW5jdGlvbiAoZikge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50Ll9sb2FkX25vZGVzLmNhbGwodGhpcywgbm9kZXMsIGNhbGxiYWNrLCBpc19jYWxsYmFjaywgZm9yY2VfcmVsb2FkKTtcblx0XHRcdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhcmVudC5fbG9hZF9ub2Rlcy5jYWxsKHRoaXMsIG5vZGVzLCBjYWxsYmFjaywgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbG9hZCk7XG5cdFx0fTtcblx0XHR0aGlzLl9sb2FkX25vZGUgPSBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGRhdGEgPSB0aGlzLl9kYXRhLm1hc3Nsb2FkW29iai5pZF0sXG5cdFx0XHRcdHJzbHQgPSBudWxsLCBkb207XG5cdFx0XHRpZihkYXRhKSB7XG5cdFx0XHRcdHJzbHQgPSB0aGlzW3R5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/ICdfYXBwZW5kX2h0bWxfZGF0YScgOiAnX2FwcGVuZF9qc29uX2RhdGEnXShcblx0XHRcdFx0XHRvYmosXG5cdFx0XHRcdFx0dHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnID8gJCgkLnBhcnNlSFRNTChkYXRhKSkuZmlsdGVyKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMubm9kZVR5cGUgIT09IDM7IH0pIDogZGF0YSxcblx0XHRcdFx0XHRmdW5jdGlvbiAoc3RhdHVzKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgc3RhdHVzKTsgfVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iai5pZCwgdHJ1ZSk7XG5cdFx0XHRcdGlmIChkb20gJiYgZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhcImpzdHJlZS1sb2FkaW5nXCIpLmF0dHIoJ2FyaWEtYnVzeScsZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9kYXRhLm1hc3Nsb2FkW29iai5pZF07XG5cdFx0XHRcdHJldHVybiByc2x0O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhcmVudC5fbG9hZF9ub2RlLmNhbGwodGhpcywgb2JqLCBjYWxsYmFjayk7XG5cdFx0fTtcblx0fTtcblxuXG4vKipcbiAqICMjIyBTZWFyY2ggcGx1Z2luXG4gKlxuICogQWRkcyBzZWFyY2ggZnVuY3Rpb25hbGl0eSB0byBqc1RyZWUuXG4gKi9cblxuXHQvKipcblx0ICogc3RvcmVzIGFsbCBkZWZhdWx0cyBmb3IgdGhlIHNlYXJjaCBwbHVnaW5cblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoXG5cdCAqIEBwbHVnaW4gc2VhcmNoXG5cdCAqL1xuXHQkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2ggPSB7XG5cdFx0LyoqXG5cdFx0ICogYSBqUXVlcnktbGlrZSBBSkFYIGNvbmZpZywgd2hpY2gganN0cmVlIHVzZXMgaWYgYSBzZXJ2ZXIgc2hvdWxkIGJlIHF1ZXJpZWQgZm9yIHJlc3VsdHMuXG5cdFx0ICpcblx0XHQgKiBBIGBzdHJgICh3aGljaCBpcyB0aGUgc2VhcmNoIHN0cmluZykgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgd2l0aCB0aGUgcmVxdWVzdCwgYW4gb3B0aW9uYWwgYGluc2lkZWAgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgaWYgdGhlIHNlYXJjaCBpcyBsaW1pdGVkIHRvIGEgbm9kZSBpZC4gVGhlIGV4cGVjdGVkIHJlc3VsdCBpcyBhIEpTT04gYXJyYXkgd2l0aCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgb3BlbmVkIHNvIHRoYXQgbWF0Y2hpbmcgbm9kZXMgd2lsbCBiZSByZXZlYWxlZC5cblx0XHQgKiBMZWF2ZSB0aGlzIHNldHRpbmcgYXMgYGZhbHNlYCB0byBub3QgcXVlcnkgdGhlIHNlcnZlci4gWW91IGNhbiBhbHNvIHNldCB0aGlzIHRvIGEgZnVuY3Rpb24sIHdoaWNoIHdpbGwgYmUgaW52b2tlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSBhbmQgcmVjZWl2ZSAzIHBhcmFtZXRlcnMgLSB0aGUgc2VhcmNoIHN0cmluZywgdGhlIGNhbGxiYWNrIHRvIGNhbGwgd2l0aCB0aGUgYXJyYXkgb2Ygbm9kZXMgdG8gbG9hZCwgYW5kIHRoZSBvcHRpb25hbCBub2RlIElEIHRvIGxpbWl0IHRoZSBzZWFyY2ggdG9cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guYWpheFxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0YWpheCA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiB0aGUgc2VhcmNoIHNob3VsZCBiZSBmdXp6eSBvciBub3QgKHNob3VsZCBgY2huZDNgIG1hdGNoIGBjaGlsZCBub2RlIDNgKS4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaC5mdXp6eVxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0ZnV6enkgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHNlYXJjaCBzaG91bGQgYmUgY2FzZSBzZW5zaXRpdmUuIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guY2FzZV9zZW5zaXRpdmVcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdGNhc2Vfc2Vuc2l0aXZlIDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIHRoZSB0cmVlIHNob3VsZCBiZSBmaWx0ZXJlZCAoYnkgZGVmYXVsdCkgdG8gc2hvdyBvbmx5IG1hdGNoaW5nIG5vZGVzIChrZWVwIGluIG1pbmQgdGhpcyBjYW4gYmUgYSBoZWF2eSBvbiBsYXJnZSB0cmVlcyBpbiBvbGQgYnJvd3NlcnMpLlxuXHRcdCAqIFRoaXMgc2V0dGluZyBjYW4gYmUgY2hhbmdlZCBhdCBydW50aW1lIHdoZW4gY2FsbGluZyB0aGUgc2VhcmNoIG1ldGhvZC4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaC5zaG93X29ubHlfbWF0Y2hlc1xuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0c2hvd19vbmx5X21hdGNoZXMgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGNoaWxkcmVuIG9mIG1hdGNoZWQgZWxlbWVudCBhcmUgc2hvd24gKHdoZW4gc2hvd19vbmx5X21hdGNoZXMgaXMgdHJ1ZSlcblx0XHQgKiBUaGlzIHNldHRpbmcgY2FuIGJlIGNoYW5nZWQgYXQgcnVudGltZSB3aGVuIGNhbGxpbmcgdGhlIHNlYXJjaCBtZXRob2QuIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW5cblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdHNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuIDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIGFsbCBub2RlcyBvcGVuZWQgdG8gcmV2ZWFsIHRoZSBzZWFyY2ggcmVzdWx0LCBzaG91bGQgYmUgY2xvc2VkIHdoZW4gdGhlIHNlYXJjaCBpcyBjbGVhcmVkIG9yIGEgbmV3IHNlYXJjaCBpcyBwZXJmb3JtZWQuIERlZmF1bHQgaXMgYHRydWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaC5jbG9zZV9vcGVuZWRfb25jbGVhclxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0Y2xvc2Vfb3BlbmVkX29uY2xlYXIgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiBvbmx5IGxlYWYgbm9kZXMgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHNlYXJjaCByZXN1bHRzLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoLnNlYXJjaF9sZWF2ZXNfb25seVxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0c2VhcmNoX2xlYXZlc19vbmx5IDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSWYgc2V0IHRvIGEgZnVuY3Rpb24gaXQgd2lsIGJlIGNhbGxlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSB3aXRoIHR3byBhcmd1bWVudHMgLSBzZWFyY2ggc3RyaW5nIGFuZCBub2RlICh3aGVyZSBub2RlIHdpbGwgYmUgZXZlcnkgbm9kZSBpbiB0aGUgc3RydWN0dXJlLCBzbyB1c2Ugd2l0aCBjYXV0aW9uKS5cblx0XHQgKiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHRydXRoeSB2YWx1ZSB0aGUgbm9kZSB3aWxsIGJlIGNvbnNpZGVyZWQgYSBtYXRjaCAoaXQgbWlnaHQgbm90IGJlIGRpc3BsYXllZCBpZiBzZWFyY2hfb25seV9sZWF2ZXMgaXMgc2V0IHRvIHRydWUgYW5kIHRoZSBub2RlIGlzIG5vdCBhIGxlYWYpLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoLnNlYXJjaF9jYWxsYmFja1xuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICovXG5cdFx0c2VhcmNoX2NhbGxiYWNrIDogZmFsc2Vcblx0fTtcblxuXHQkLmpzdHJlZS5wbHVnaW5zLnNlYXJjaCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5zdHIgPSBcIlwiO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tID0gJCgpO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gucmVzID0gW107XG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5vcG4gPSBbXTtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnNvbSA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guc21jID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5oZG4gPSBbXTtcblxuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdC5vbihcInNlYXJjaC5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuc2VhcmNoLnNvbSAmJiBkYXRhLnJlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBpLCBqLCBwID0gW10sIGssIGw7XG5cdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IGRhdGEucmVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmKG1bZGF0YS5yZXNbaV1dICYmICFtW2RhdGEucmVzW2ldXS5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0XHRcdFx0XHRcdHAucHVzaChkYXRhLnJlc1tpXSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRwID0gcC5jb25jYXQobVtkYXRhLnJlc1tpXV0ucGFyZW50cyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLl9kYXRhLnNlYXJjaC5zbWMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yIChrID0gMCwgbCA9IG1bZGF0YS5yZXNbaV1dLmNoaWxkcmVuX2QubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG1bbVtkYXRhLnJlc1tpXV0uY2hpbGRyZW5fZFtrXV0gJiYgIW1bbVtkYXRhLnJlc1tpXV0uY2hpbGRyZW5fZFtrXV0uc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwLnB1c2gobVtkYXRhLnJlc1tpXV0uY2hpbGRyZW5fZFtrXSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHAgPSAkLnZha2F0YS5hcnJheV9yZW1vdmVfaXRlbSgkLnZha2F0YS5hcnJheV91bmlxdWUocCksICQuanN0cmVlLnJvb3QpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5oZG4gPSB0aGlzLmhpZGVfYWxsKHRydWUpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNob3dfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5yZWRyYXcodHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJjbGVhcl9zZWFyY2guanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZih0aGlzLl9kYXRhLnNlYXJjaC5zb20gJiYgZGF0YS5yZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2hvd19ub2RlKHRoaXMuX2RhdGEuc2VhcmNoLmhkbiwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVkcmF3KHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1c2VkIHRvIHNlYXJjaCB0aGUgdHJlZSBub2RlcyBmb3IgYSBnaXZlbiBzdHJpbmdcblx0XHQgKiBAbmFtZSBzZWFyY2goc3RyIFssIHNraXBfYXN5bmNdKVxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgdGhlIHNlYXJjaCBzdHJpbmdcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHNraXBfYXN5bmMgaWYgc2V0IHRvIHRydWUgc2VydmVyIHdpbGwgbm90IGJlIHF1ZXJpZWQgZXZlbiBpZiBjb25maWd1cmVkXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBzaG93X29ubHlfbWF0Y2hlcyBpZiBzZXQgdG8gdHJ1ZSBvbmx5IG1hdGNoaW5nIG5vZGVzIHdpbGwgYmUgc2hvd24gKGtlZXAgaW4gbWluZCB0aGlzIGNhbiBiZSB2ZXJ5IHNsb3cgb24gbGFyZ2UgdHJlZXMgb3Igb2xkIGJyb3dzZXJzKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IGluc2lkZSBhbiBvcHRpb25hbCBub2RlIHRvIHdob3NlIGNoaWxkcmVuIHRvIGxpbWl0IHRoZSBzZWFyY2hcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IGFwcGVuZCBpZiBzZXQgdG8gdHJ1ZSB0aGUgcmVzdWx0cyBvZiB0aGlzIHNlYXJjaCBhcmUgYXBwZW5kZWQgdG8gdGhlIHByZXZpb3VzIHNlYXJjaFxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICogQHRyaWdnZXIgc2VhcmNoLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHRoaXMuc2VhcmNoID0gZnVuY3Rpb24gKHN0ciwgc2tpcF9hc3luYywgc2hvd19vbmx5X21hdGNoZXMsIGluc2lkZSwgYXBwZW5kLCBzaG93X29ubHlfbWF0Y2hlc19jaGlsZHJlbikge1xuXHRcdFx0aWYoc3RyID09PSBmYWxzZSB8fCAkLnZha2F0YS50cmltKHN0ci50b1N0cmluZygpKSA9PT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jbGVhcl9zZWFyY2goKTtcblx0XHRcdH1cblx0XHRcdGluc2lkZSA9IHRoaXMuZ2V0X25vZGUoaW5zaWRlKTtcblx0XHRcdGluc2lkZSA9IGluc2lkZSAmJiBpbnNpZGUuaWQgPyBpbnNpZGUuaWQgOiBudWxsO1xuXHRcdFx0c3RyID0gc3RyLnRvU3RyaW5nKCk7XG5cdFx0XHR2YXIgcyA9IHRoaXMuc2V0dGluZ3Muc2VhcmNoLFxuXHRcdFx0XHRhID0gcy5hamF4ID8gcy5hamF4IDogZmFsc2UsXG5cdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRmID0gbnVsbCxcblx0XHRcdFx0ciA9IFtdLFxuXHRcdFx0XHRwID0gW10sIGksIGo7XG5cdFx0XHRpZih0aGlzLl9kYXRhLnNlYXJjaC5yZXMubGVuZ3RoICYmICFhcHBlbmQpIHtcblx0XHRcdFx0dGhpcy5jbGVhcl9zZWFyY2goKTtcblx0XHRcdH1cblx0XHRcdGlmKHNob3dfb25seV9tYXRjaGVzID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0c2hvd19vbmx5X21hdGNoZXMgPSBzLnNob3dfb25seV9tYXRjaGVzO1xuXHRcdFx0fVxuXHRcdFx0aWYoc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRzaG93X29ubHlfbWF0Y2hlc19jaGlsZHJlbiA9IHMuc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW47XG5cdFx0XHR9XG5cdFx0XHRpZighc2tpcF9hc3luYyAmJiBhICE9PSBmYWxzZSkge1xuXHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihhKSkge1xuXHRcdFx0XHRcdHJldHVybiBhLmNhbGwodGhpcywgc3RyLCBmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuZCkgeyBkID0gZC5kOyB9XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvYWRfbm9kZXMoISQudmFrYXRhLmlzX2FycmF5KGQpID8gW10gOiAkLnZha2F0YS5hcnJheV91bmlxdWUoZCksIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNlYXJjaChzdHIsIHRydWUsIHNob3dfb25seV9tYXRjaGVzLCBpbnNpZGUsIGFwcGVuZCwgc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW4pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSwgaW5zaWRlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRhID0gJC5leHRlbmQoe30sIGEpO1xuXHRcdFx0XHRcdGlmKCFhLmRhdGEpIHsgYS5kYXRhID0ge307IH1cblx0XHRcdFx0XHRhLmRhdGEuc3RyID0gc3RyO1xuXHRcdFx0XHRcdGlmKGluc2lkZSkge1xuXHRcdFx0XHRcdFx0YS5kYXRhLmluc2lkZSA9IGluc2lkZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2RhdGEuc2VhcmNoLmxhc3RSZXF1ZXN0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5sYXN0UmVxdWVzdC5hYm9ydCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5sYXN0UmVxdWVzdCA9ICQuYWpheChhKVxuXHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdhamF4JywgJ3BsdWdpbicgOiAnc2VhcmNoJywgJ2lkJyA6ICdzZWFyY2hfMDEnLCAncmVhc29uJyA6ICdDb3VsZCBub3QgbG9hZCBzZWFyY2ggcGFyZW50cycsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KGEpIH07XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHRcdC5kb25lKGZ1bmN0aW9uIChkKSB7XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC5kKSB7IGQgPSBkLmQ7IH1cblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9hZF9ub2RlcyghJC52YWthdGEuaXNfYXJyYXkoZCkgPyBbXSA6ICQudmFrYXRhLmFycmF5X3VuaXF1ZShkKSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2VhcmNoKHN0ciwgdHJ1ZSwgc2hvd19vbmx5X21hdGNoZXMsIGluc2lkZSwgYXBwZW5kLCBzaG93X29ubHlfbWF0Y2hlc19jaGlsZHJlbik7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fZGF0YS5zZWFyY2gubGFzdFJlcXVlc3Q7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCFhcHBlbmQpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guc3RyID0gc3RyO1xuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20gPSAkKCk7XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnJlcyA9IFtdO1xuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5vcG4gPSBbXTtcblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guc29tID0gc2hvd19vbmx5X21hdGNoZXM7XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnNtYyA9IHNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuO1xuXHRcdFx0fVxuXG5cdFx0XHRmID0gbmV3ICQudmFrYXRhLnNlYXJjaChzdHIsIHRydWUsIHsgY2FzZVNlbnNpdGl2ZSA6IHMuY2FzZV9zZW5zaXRpdmUsIGZ1enp5IDogcy5mdXp6eSB9KTtcblx0XHRcdCQuZWFjaChtW2luc2lkZSA/IGluc2lkZSA6ICQuanN0cmVlLnJvb3RdLmNoaWxkcmVuX2QsIGZ1bmN0aW9uIChpaSwgaSkge1xuXHRcdFx0XHR2YXIgdiA9IG1baV07XG5cdFx0XHRcdGlmKHYudGV4dCAmJiAhdi5zdGF0ZS5oaWRkZW4gJiYgKCFzLnNlYXJjaF9sZWF2ZXNfb25seSB8fCAodi5zdGF0ZS5sb2FkZWQgJiYgdi5jaGlsZHJlbi5sZW5ndGggPT09IDApKSAmJiAoIChzLnNlYXJjaF9jYWxsYmFjayAmJiBzLnNlYXJjaF9jYWxsYmFjay5jYWxsKHRoaXMsIHN0ciwgdikpIHx8ICghcy5zZWFyY2hfY2FsbGJhY2sgJiYgZi5zZWFyY2godi50ZXh0KS5pc01hdGNoKSApICkge1xuXHRcdFx0XHRcdHIucHVzaChpKTtcblx0XHRcdFx0XHRwID0gcC5jb25jYXQodi5wYXJlbnRzKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZihyLmxlbmd0aCkge1xuXHRcdFx0XHRwID0gJC52YWthdGEuYXJyYXlfdW5pcXVlKHApO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKHBbaV0gIT09ICQuanN0cmVlLnJvb3QgJiYgbVtwW2ldXSAmJiB0aGlzLm9wZW5fbm9kZShwW2ldLCBudWxsLCAwKSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gub3BuLnB1c2gocFtpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFhcHBlbmQpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20gPSAkKHRoaXMuZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcjJyArICQubWFwKHIsIGZ1bmN0aW9uICh2KSB7IHJldHVybiBcIjAxMjM0NTY3ODlcIi5pbmRleE9mKHZbMF0pICE9PSAtMSA/ICdcXFxcMycgKyB2WzBdICsgJyAnICsgdi5zdWJzdHIoMSkucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSA6IHYucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKTsgfSkuam9pbignLCAjJykpKTtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5yZXMgPSByO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLmRvbSA9IHRoaXMuX2RhdGEuc2VhcmNoLmRvbS5hZGQoJCh0aGlzLmVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnIycgKyAkLm1hcChyLCBmdW5jdGlvbiAodikgeyByZXR1cm4gXCIwMTIzNDU2Nzg5XCIuaW5kZXhPZih2WzBdKSAhPT0gLTEgPyAnXFxcXDMnICsgdlswXSArICcgJyArIHYuc3Vic3RyKDEpLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykgOiB2LnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyk7IH0pLmpvaW4oJywgIycpKSkpO1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnJlcyA9ICQudmFrYXRhLmFycmF5X3VuaXF1ZSh0aGlzLl9kYXRhLnNlYXJjaC5yZXMuY29uY2F0KHIpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20uY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5hZGRDbGFzcygnanN0cmVlLXNlYXJjaCcpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgc2VhcmNoIGlzIGNvbXBsZXRlXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNlYXJjaC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBub2RlcyBhIGpRdWVyeSBjb2xsZWN0aW9uIG9mIG1hdGNoaW5nIG5vZGVzXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyIHRoZSBzZWFyY2ggc3RyaW5nXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSByZXMgYSBjb2xsZWN0aW9uIG9mIG9iamVjdHMgcmVwcmVzZWluZyB0aGUgbWF0Y2hpbmcgbm9kZXNcblx0XHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2VhcmNoJywgeyBub2RlcyA6IHRoaXMuX2RhdGEuc2VhcmNoLmRvbSwgc3RyIDogc3RyLCByZXMgOiB0aGlzLl9kYXRhLnNlYXJjaC5yZXMsIHNob3dfb25seV9tYXRjaGVzIDogc2hvd19vbmx5X21hdGNoZXMgfSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1c2VkIHRvIGNsZWFyIHRoZSBsYXN0IHNlYXJjaCAocmVtb3ZlcyBjbGFzc2VzIGFuZCBzaG93cyBhbGwgbm9kZXMgaWYgZmlsdGVyaW5nIGlzIG9uKVxuXHRcdCAqIEBuYW1lIGNsZWFyX3NlYXJjaCgpXG5cdFx0ICogQHBsdWdpbiBzZWFyY2hcblx0XHQgKiBAdHJpZ2dlciBjbGVhcl9zZWFyY2guanN0cmVlXG5cdFx0ICovXG5cdFx0dGhpcy5jbGVhcl9zZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLnNlYXJjaC5jbG9zZV9vcGVuZWRfb25jbGVhcikge1xuXHRcdFx0XHR0aGlzLmNsb3NlX25vZGUodGhpcy5fZGF0YS5zZWFyY2gub3BuLCAwKTtcblx0XHRcdH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIHNlYXJjaCBpcyBjb21wbGV0ZVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjbGVhcl9zZWFyY2guanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gbm9kZXMgYSBqUXVlcnkgY29sbGVjdGlvbiBvZiBtYXRjaGluZyBub2RlcyAodGhlIHJlc3VsdCBmcm9tIHRoZSBsYXN0IHNlYXJjaClcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgdGhlIHNlYXJjaCBzdHJpbmcgKHRoZSBsYXN0IHNlYXJjaCBzdHJpbmcpXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSByZXMgYSBjb2xsZWN0aW9uIG9mIG9iamVjdHMgcmVwcmVzZWluZyB0aGUgbWF0Y2hpbmcgbm9kZXMgKHRoZSByZXN1bHQgZnJvbSB0aGUgbGFzdCBzZWFyY2gpXG5cdFx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2NsZWFyX3NlYXJjaCcsIHsgJ25vZGVzJyA6IHRoaXMuX2RhdGEuc2VhcmNoLmRvbSwgc3RyIDogdGhpcy5fZGF0YS5zZWFyY2guc3RyLCByZXMgOiB0aGlzLl9kYXRhLnNlYXJjaC5yZXMgfSk7XG5cdFx0XHRpZih0aGlzLl9kYXRhLnNlYXJjaC5yZXMubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLmRvbSA9ICQodGhpcy5lbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJyMnICsgJC5tYXAodGhpcy5fZGF0YS5zZWFyY2gucmVzLCBmdW5jdGlvbiAodikge1xuXHRcdFx0XHRcdHJldHVybiBcIjAxMjM0NTY3ODlcIi5pbmRleE9mKHZbMF0pICE9PSAtMSA/ICdcXFxcMycgKyB2WzBdICsgJyAnICsgdi5zdWJzdHIoMSkucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSA6IHYucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKTtcblx0XHRcdFx0fSkuam9pbignLCAjJykpKTtcblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtc2VhcmNoXCIpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guc3RyID0gXCJcIjtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnJlcyA9IFtdO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gub3BuID0gW107XG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20gPSAkKCk7XG5cdFx0fTtcblxuXHRcdHRoaXMucmVkcmF3X25vZGUgPSBmdW5jdGlvbihvYmosIGRlZXAsIGNhbGxiYWNrLCBmb3JjZV9yZW5kZXIpIHtcblx0XHRcdG9iaiA9IHBhcmVudC5yZWRyYXdfbm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYob2JqKSB7XG5cdFx0XHRcdGlmKCQuaW5BcnJheShvYmouaWQsIHRoaXMuX2RhdGEuc2VhcmNoLnJlcykgIT09IC0xKSB7XG5cdFx0XHRcdFx0dmFyIGksIGosIHRtcCA9IG51bGw7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZihvYmouY2hpbGROb2Rlc1tpXSAmJiBvYmouY2hpbGROb2Rlc1tpXS5jbGFzc05hbWUgJiYgb2JqLmNoaWxkTm9kZXNbaV0uY2xhc3NOYW1lLmluZGV4T2YoXCJqc3RyZWUtYW5jaG9yXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSBvYmouY2hpbGROb2Rlc1tpXTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRtcCkge1xuXHRcdFx0XHRcdFx0dG1wLmNsYXNzTmFtZSArPSAnIGpzdHJlZS1zZWFyY2gnO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIGhlbHBlcnNcblx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0Ly8gZnJvbSBodHRwOi8va2lyby5tZS9wcm9qZWN0cy9mdXNlLmh0bWxcblx0XHQkLnZha2F0YS5zZWFyY2ggPSBmdW5jdGlvbihwYXR0ZXJuLCB0eHQsIG9wdGlvbnMpIHtcblx0XHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkLnZha2F0YS5zZWFyY2guZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHRcdFx0aWYob3B0aW9ucy5mdXp6eSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0b3B0aW9ucy5mdXp6eSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRwYXR0ZXJuID0gb3B0aW9ucy5jYXNlU2Vuc2l0aXZlID8gcGF0dGVybiA6IHBhdHRlcm4udG9Mb3dlckNhc2UoKTtcblx0XHRcdHZhciBNQVRDSF9MT0NBVElPTlx0PSBvcHRpb25zLmxvY2F0aW9uLFxuXHRcdFx0XHRNQVRDSF9ESVNUQU5DRVx0PSBvcHRpb25zLmRpc3RhbmNlLFxuXHRcdFx0XHRNQVRDSF9USFJFU0hPTERcdD0gb3B0aW9ucy50aHJlc2hvbGQsXG5cdFx0XHRcdHBhdHRlcm5MZW4gPSBwYXR0ZXJuLmxlbmd0aCxcblx0XHRcdFx0bWF0Y2htYXNrLCBwYXR0ZXJuX2FscGhhYmV0LCBtYXRjaF9iaXRhcFNjb3JlLCBzZWFyY2g7XG5cdFx0XHRpZihwYXR0ZXJuTGVuID4gMzIpIHtcblx0XHRcdFx0b3B0aW9ucy5mdXp6eSA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucy5mdXp6eSkge1xuXHRcdFx0XHRtYXRjaG1hc2sgPSAxIDw8IChwYXR0ZXJuTGVuIC0gMSk7XG5cdFx0XHRcdHBhdHRlcm5fYWxwaGFiZXQgPSAoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciBtYXNrID0ge30sXG5cdFx0XHRcdFx0XHRpID0gMDtcblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgcGF0dGVybkxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0XHRtYXNrW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuTGVuOyBpKyspIHtcblx0XHRcdFx0XHRcdG1hc2tbcGF0dGVybi5jaGFyQXQoaSldIHw9IDEgPDwgKHBhdHRlcm5MZW4gLSBpIC0gMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBtYXNrO1xuXHRcdFx0XHR9KCkpO1xuXHRcdFx0XHRtYXRjaF9iaXRhcFNjb3JlID0gZnVuY3Rpb24gKGUsIHgpIHtcblx0XHRcdFx0XHR2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybkxlbixcblx0XHRcdFx0XHRcdHByb3hpbWl0eSA9IE1hdGguYWJzKE1BVENIX0xPQ0FUSU9OIC0geCk7XG5cdFx0XHRcdFx0aWYoIU1BVENIX0RJU1RBTkNFKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBhY2N1cmFjeSArIChwcm94aW1pdHkgLyBNQVRDSF9ESVNUQU5DRSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRzZWFyY2ggPSBmdW5jdGlvbiAodGV4dCkge1xuXHRcdFx0XHR0ZXh0ID0gb3B0aW9ucy5jYXNlU2Vuc2l0aXZlID8gdGV4dCA6IHRleHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0aWYocGF0dGVybiA9PT0gdGV4dCB8fCB0ZXh0LmluZGV4T2YocGF0dGVybikgIT09IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGlzTWF0Y2g6IHRydWUsXG5cdFx0XHRcdFx0XHRzY29yZTogMFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIW9wdGlvbnMuZnV6enkpIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0aXNNYXRjaDogZmFsc2UsXG5cdFx0XHRcdFx0XHRzY29yZTogMVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGksIGosXG5cdFx0XHRcdFx0dGV4dExlbiA9IHRleHQubGVuZ3RoLFxuXHRcdFx0XHRcdHNjb3JlVGhyZXNob2xkID0gTUFUQ0hfVEhSRVNIT0xELFxuXHRcdFx0XHRcdGJlc3RMb2MgPSB0ZXh0LmluZGV4T2YocGF0dGVybiwgTUFUQ0hfTE9DQVRJT04pLFxuXHRcdFx0XHRcdGJpbk1pbiwgYmluTWlkLFxuXHRcdFx0XHRcdGJpbk1heCA9IHBhdHRlcm5MZW4gKyB0ZXh0TGVuLFxuXHRcdFx0XHRcdGxhc3RSZCwgc3RhcnQsIGZpbmlzaCwgcmQsIGNoYXJNYXRjaCxcblx0XHRcdFx0XHRzY29yZSA9IDEsXG5cdFx0XHRcdFx0bG9jYXRpb25zID0gW107XG5cdFx0XHRcdGlmIChiZXN0TG9jICE9PSAtMSkge1xuXHRcdFx0XHRcdHNjb3JlVGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZSgwLCBiZXN0TG9jKSwgc2NvcmVUaHJlc2hvbGQpO1xuXHRcdFx0XHRcdGJlc3RMb2MgPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4sIE1BVENIX0xPQ0FUSU9OICsgcGF0dGVybkxlbik7XG5cdFx0XHRcdFx0aWYgKGJlc3RMb2MgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRzY29yZVRocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmUoMCwgYmVzdExvYyksIHNjb3JlVGhyZXNob2xkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0YmVzdExvYyA9IC0xO1xuXHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgcGF0dGVybkxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0YmluTWluID0gMDtcblx0XHRcdFx0XHRiaW5NaWQgPSBiaW5NYXg7XG5cdFx0XHRcdFx0d2hpbGUgKGJpbk1pbiA8IGJpbk1pZCkge1xuXHRcdFx0XHRcdFx0aWYgKG1hdGNoX2JpdGFwU2NvcmUoaSwgTUFUQ0hfTE9DQVRJT04gKyBiaW5NaWQpIDw9IHNjb3JlVGhyZXNob2xkKSB7XG5cdFx0XHRcdFx0XHRcdGJpbk1pbiA9IGJpbk1pZDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGJpbk1heCA9IGJpbk1pZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJpbk1pZCA9IE1hdGguZmxvb3IoKGJpbk1heCAtIGJpbk1pbikgLyAyICsgYmluTWluKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YmluTWF4ID0gYmluTWlkO1xuXHRcdFx0XHRcdHN0YXJ0ID0gTWF0aC5tYXgoMSwgTUFUQ0hfTE9DQVRJT04gLSBiaW5NaWQgKyAxKTtcblx0XHRcdFx0XHRmaW5pc2ggPSBNYXRoLm1pbihNQVRDSF9MT0NBVElPTiArIGJpbk1pZCwgdGV4dExlbikgKyBwYXR0ZXJuTGVuO1xuXHRcdFx0XHRcdHJkID0gbmV3IEFycmF5KGZpbmlzaCArIDIpO1xuXHRcdFx0XHRcdHJkW2ZpbmlzaCArIDFdID0gKDEgPDwgaSkgLSAxO1xuXHRcdFx0XHRcdGZvciAoaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG5cdFx0XHRcdFx0XHRjaGFyTWF0Y2ggPSBwYXR0ZXJuX2FscGhhYmV0W3RleHQuY2hhckF0KGogLSAxKV07XG5cdFx0XHRcdFx0XHRpZiAoaSA9PT0gMCkge1xuXHRcdFx0XHRcdFx0XHRyZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRyZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2ggfCAoKChsYXN0UmRbaiArIDFdIHwgbGFzdFJkW2pdKSA8PCAxKSB8IDEpIHwgbGFzdFJkW2ogKyAxXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuXHRcdFx0XHRcdFx0XHRzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmUoaSwgaiAtIDEpO1xuXHRcdFx0XHRcdFx0XHRpZiAoc2NvcmUgPD0gc2NvcmVUaHJlc2hvbGQpIHtcblx0XHRcdFx0XHRcdFx0XHRzY29yZVRocmVzaG9sZCA9IHNjb3JlO1xuXHRcdFx0XHRcdFx0XHRcdGJlc3RMb2MgPSBqIC0gMTtcblx0XHRcdFx0XHRcdFx0XHRsb2NhdGlvbnMucHVzaChiZXN0TG9jKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAoYmVzdExvYyA+IE1BVENIX0xPQ0FUSU9OKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBNQVRDSF9MT0NBVElPTiAtIGJlc3RMb2MpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG1hdGNoX2JpdGFwU2NvcmUoaSArIDEsIE1BVENIX0xPQ0FUSU9OKSA+IHNjb3JlVGhyZXNob2xkKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGFzdFJkID0gcmQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRpc01hdGNoOiBiZXN0TG9jID49IDAsXG5cdFx0XHRcdFx0c2NvcmU6IHNjb3JlXG5cdFx0XHRcdH07XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHR4dCA9PT0gdHJ1ZSA/IHsgJ3NlYXJjaCcgOiBzZWFyY2ggfSA6IHNlYXJjaCh0eHQpO1xuXHRcdH07XG5cdFx0JC52YWthdGEuc2VhcmNoLmRlZmF1bHRzID0ge1xuXHRcdFx0bG9jYXRpb24gOiAwLFxuXHRcdFx0ZGlzdGFuY2UgOiAxMDAsXG5cdFx0XHR0aHJlc2hvbGQgOiAwLjYsXG5cdFx0XHRmdXp6eSA6IGZhbHNlLFxuXHRcdFx0Y2FzZVNlbnNpdGl2ZSA6IGZhbHNlXG5cdFx0fTtcblx0fSgkKSk7XG5cblx0Ly8gaW5jbHVkZSB0aGUgc2VhcmNoIHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcInNlYXJjaFwiKTtcblxuXG4vKipcbiAqICMjIyBTb3J0IHBsdWdpblxuICpcbiAqIEF1dG9tYXRpY2FsbHkgc29ydHMgYWxsIHNpYmxpbmdzIGluIHRoZSB0cmVlIGFjY29yZGluZyB0byBhIHNvcnRpbmcgZnVuY3Rpb24uXG4gKi9cblxuXHQvKipcblx0ICogdGhlIHNldHRpbmdzIGZ1bmN0aW9uIHVzZWQgdG8gc29ydCB0aGUgbm9kZXMuXG5cdCAqIEl0IGlzIGV4ZWN1dGVkIGluIHRoZSB0cmVlJ3MgY29udGV4dCwgYWNjZXB0cyB0d28gbm9kZXMgYXMgYXJndW1lbnRzIGFuZCBzaG91bGQgcmV0dXJuIGAxYCBvciBgLTFgLlxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zb3J0XG5cdCAqIEBwbHVnaW4gc29ydFxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuc29ydCA9IGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0Ly9yZXR1cm4gdGhpcy5nZXRfdHlwZShhKSA9PT0gdGhpcy5nZXRfdHlwZShiKSA/ICh0aGlzLmdldF90ZXh0KGEpID4gdGhpcy5nZXRfdGV4dChiKSA/IDEgOiAtMSkgOiB0aGlzLmdldF90eXBlKGEpID49IHRoaXMuZ2V0X3R5cGUoYik7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0X3RleHQoYSkgPiB0aGlzLmdldF90ZXh0KGIpID8gMSA6IC0xO1xuXHR9O1xuXHQkLmpzdHJlZS5wbHVnaW5zLnNvcnQgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFyZW50LmJpbmQuY2FsbCh0aGlzKTtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJtb2RlbC5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdHRoaXMuc29ydChkYXRhLnBhcmVudCwgdHJ1ZSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJyZW5hbWVfbm9kZS5qc3RyZWUgY3JlYXRlX25vZGUuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNvcnQoZGF0YS5wYXJlbnQgfHwgZGF0YS5ub2RlLnBhcmVudCwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZWRyYXdfbm9kZShkYXRhLnBhcmVudCB8fCBkYXRhLm5vZGUucGFyZW50LCB0cnVlKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcIm1vdmVfbm9kZS5qc3RyZWUgY29weV9ub2RlLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zb3J0KGRhdGEucGFyZW50LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHR0aGlzLnJlZHJhd19ub2RlKGRhdGEucGFyZW50LCB0cnVlKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogdXNlZCB0byBzb3J0IGEgbm9kZSdzIGNoaWxkcmVuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBzb3J0KG9iaiBbLCBkZWVwXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBkZWVwIGlmIHNldCB0byBgdHJ1ZWAgbm9kZXMgYXJlIHNvcnRlZCByZWN1cnNpdmVseS5cblx0XHQgKiBAcGx1Z2luIHNvcnRcblx0XHQgKiBAdHJpZ2dlciBzZWFyY2guanN0cmVlXG5cdFx0ICovXG5cdFx0dGhpcy5zb3J0ID0gZnVuY3Rpb24gKG9iaiwgZGVlcCkge1xuXHRcdFx0dmFyIGksIGo7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZihvYmogJiYgb2JqLmNoaWxkcmVuICYmIG9iai5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0b2JqLmNoaWxkcmVuLnNvcnQodGhpcy5zZXR0aW5ncy5zb3J0LmJpbmQodGhpcykpO1xuXHRcdFx0XHRpZihkZWVwKSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNvcnQob2JqLmNoaWxkcmVuX2RbaV0sIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdC8vIGluY2x1ZGUgdGhlIHNvcnQgcGx1Z2luIGJ5IGRlZmF1bHRcblx0Ly8gJC5qc3RyZWUuZGVmYXVsdHMucGx1Z2lucy5wdXNoKFwic29ydFwiKTtcblxuLyoqXG4gKiAjIyMgU3RhdGUgcGx1Z2luXG4gKlxuICogU2F2ZXMgdGhlIHN0YXRlIG9mIHRoZSB0cmVlIChzZWxlY3RlZCBub2Rlcywgb3BlbmVkIG5vZGVzKSBvbiB0aGUgdXNlcidzIGNvbXB1dGVyIHVzaW5nIGF2YWlsYWJsZSBvcHRpb25zIChsb2NhbFN0b3JhZ2UsIGNvb2tpZXMsIGV0YylcbiAqL1xuXG5cdHZhciB0byA9IGZhbHNlO1xuXHQvKipcblx0ICogc3RvcmVzIGFsbCBkZWZhdWx0cyBmb3IgdGhlIHN0YXRlIHBsdWdpblxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZVxuXHQgKiBAcGx1Z2luIHN0YXRlXG5cdCAqL1xuXHQkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyBmb3IgdGhlIGtleSB0byB1c2Ugd2hlbiBzYXZpbmcgdGhlIGN1cnJlbnQgdHJlZSAoY2hhbmdlIGlmIHVzaW5nIG11bHRpcGxlIHRyZWVzIGluIHlvdXIgcHJvamVjdCkuIERlZmF1bHRzIHRvIGBqc3RyZWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnN0YXRlLmtleVxuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHRrZXlcdFx0OiAnanN0cmVlJyxcblx0XHQvKipcblx0XHQgKiBBIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mIGV2ZW50cyB0aGF0IHRyaWdnZXIgYSBzdGF0ZSBzYXZlLiBEZWZhdWx0cyB0byBgY2hhbmdlZC5qc3RyZWUgb3Blbl9ub2RlLmpzdHJlZSBjbG9zZV9ub2RlLmpzdHJlZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc3RhdGUuZXZlbnRzXG5cdFx0ICogQHBsdWdpbiBzdGF0ZVxuXHRcdCAqL1xuXHRcdGV2ZW50c1x0OiAnY2hhbmdlZC5qc3RyZWUgb3Blbl9ub2RlLmpzdHJlZSBjbG9zZV9ub2RlLmpzdHJlZSBjaGVja19ub2RlLmpzdHJlZSB1bmNoZWNrX25vZGUuanN0cmVlJyxcblx0XHQvKipcblx0XHQgKiBUaW1lIGluIG1pbGxpc2Vjb25kcyBhZnRlciB3aGljaCB0aGUgc3RhdGUgd2lsbCBleHBpcmUuIERlZmF1bHRzIHRvICdmYWxzZScgbWVhbmluZyAtIG5vIGV4cGlyZS5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZS50dGxcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0dHRsXHRcdDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgcHJpb3IgdG8gcmVzdG9yaW5nIHN0YXRlIHdpdGggb25lIGFyZ3VtZW50IC0gdGhlIHN0YXRlIG9iamVjdC4gQ2FuIGJlIHVzZWQgdG8gY2xlYXIgdW53YW50ZWQgcGFydHMgb2YgdGhlIHN0YXRlLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnN0YXRlLmZpbHRlclxuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHRmaWx0ZXJcdDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogU2hvdWxkIGxvYWRlZCBub2RlcyBiZSByZXN0b3JlZCAoc2V0dGluZyB0aGlzIHRvIHRydWUgbWVhbnMgdGhhdCBpdCBpcyBwb3NzaWJsZSB0aGF0IHRoZSB3aG9sZSB0cmVlIHdpbGwgYmUgbG9hZGVkIGZvciBzb21lIHVzZXJzIC0gdXNlIHdpdGggY2F1dGlvbikuIERlZmF1bHRzIHRvIGBmYWxzZWBcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZS5wcmVzZXJ2ZV9sb2FkZWRcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0cHJlc2VydmVfbG9hZGVkIDogZmFsc2Vcblx0fTtcblx0JC5qc3RyZWUucGx1Z2lucy5zdGF0ZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXHRcdFx0dmFyIGJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5vbih0aGlzLnNldHRpbmdzLnN0YXRlLmV2ZW50cywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmKHRvKSB7IGNsZWFyVGltZW91dCh0byk7IH1cblx0XHRcdFx0XHR0byA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyB0aGlzLnNhdmVfc3RhdGUoKTsgfS5iaW5kKHRoaXMpLCAxMDApO1xuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gdGhlIHN0YXRlIHBsdWdpbiBpcyBmaW5pc2hlZCByZXN0b3JpbmcgdGhlIHN0YXRlIChhbmQgaW1tZWRpYXRlbHkgYWZ0ZXIgcmVhZHkgaWYgdGhlcmUgaXMgbm8gc3RhdGUgdG8gcmVzdG9yZSkuXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBzdGF0ZV9yZWFkeS5qc3RyZWVcblx0XHRcdFx0ICogQHBsdWdpbiBzdGF0ZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdzdGF0ZV9yZWFkeScpO1xuXHRcdFx0fS5iaW5kKHRoaXMpO1xuXHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdC5vbihcInJlYWR5LmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50Lm9uZShcInJlc3RvcmVfc3RhdGUuanN0cmVlXCIsIGJpbmQpO1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMucmVzdG9yZV9zdGF0ZSgpKSB7IGJpbmQoKTsgfVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBzYXZlIHRoZSBzdGF0ZVxuXHRcdCAqIEBuYW1lIHNhdmVfc3RhdGUoKVxuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHR0aGlzLnNhdmVfc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgdG0gPSB0aGlzLmdldF9zdGF0ZSgpO1xuXHRcdFx0aWYgKCF0aGlzLnNldHRpbmdzLnN0YXRlLnByZXNlcnZlX2xvYWRlZCkge1xuXHRcdFx0XHRkZWxldGUgdG0uY29yZS5sb2FkZWQ7XG5cdFx0XHR9XG5cdFx0XHR2YXIgc3QgPSB7ICdzdGF0ZScgOiB0bSwgJ3R0bCcgOiB0aGlzLnNldHRpbmdzLnN0YXRlLnR0bCwgJ3NlYycgOiArKG5ldyBEYXRlKCkpIH07XG5cdFx0XHQkLnZha2F0YS5zdG9yYWdlLnNldCh0aGlzLnNldHRpbmdzLnN0YXRlLmtleSwgSlNPTi5zdHJpbmdpZnkoc3QpKTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIHJlc3RvcmUgdGhlIHN0YXRlIGZyb20gdGhlIHVzZXIncyBjb21wdXRlclxuXHRcdCAqIEBuYW1lIHJlc3RvcmVfc3RhdGUoKVxuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHR0aGlzLnJlc3RvcmVfc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgayA9ICQudmFrYXRhLnN0b3JhZ2UuZ2V0KHRoaXMuc2V0dGluZ3Muc3RhdGUua2V5KTtcblx0XHRcdGlmKCEhaykgeyB0cnkgeyBrID0gSlNPTi5wYXJzZShrKTsgfSBjYXRjaChleCkgeyByZXR1cm4gZmFsc2U7IH0gfVxuXHRcdFx0aWYoISFrICYmIGsudHRsICYmIGsuc2VjICYmICsobmV3IERhdGUoKSkgLSBrLnNlYyA+IGsudHRsKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYoISFrICYmIGsuc3RhdGUpIHsgayA9IGsuc3RhdGU7IH1cblx0XHRcdGlmKCEhayAmJiAkLnZha2F0YS5pc19mdW5jdGlvbih0aGlzLnNldHRpbmdzLnN0YXRlLmZpbHRlcikpIHsgayA9IHRoaXMuc2V0dGluZ3Muc3RhdGUuZmlsdGVyLmNhbGwodGhpcywgayk7IH1cblx0XHRcdGlmKCEhaykge1xuXHRcdFx0XHRpZiAoIXRoaXMuc2V0dGluZ3Muc3RhdGUucHJlc2VydmVfbG9hZGVkKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGsuY29yZS5sb2FkZWQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5lbGVtZW50Lm9uZShcInNldF9zdGF0ZS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHsgZGF0YS5pbnN0YW5jZS50cmlnZ2VyKCdyZXN0b3JlX3N0YXRlJywgeyAnc3RhdGUnIDogJC5leHRlbmQodHJ1ZSwge30sIGspIH0pOyB9KTtcblx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoayk7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogY2xlYXIgdGhlIHN0YXRlIG9uIHRoZSB1c2VyJ3MgY29tcHV0ZXJcblx0XHQgKiBAbmFtZSBjbGVhcl9zdGF0ZSgpXG5cdFx0ICogQHBsdWdpbiBzdGF0ZVxuXHRcdCAqL1xuXHRcdHRoaXMuY2xlYXJfc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gJC52YWthdGEuc3RvcmFnZS5kZWwodGhpcy5zZXR0aW5ncy5zdGF0ZS5rZXkpO1xuXHRcdH07XG5cdH07XG5cblx0KGZ1bmN0aW9uICgkLCB1bmRlZmluZWQpIHtcblx0XHQkLnZha2F0YS5zdG9yYWdlID0ge1xuXHRcdFx0Ly8gc2ltcGx5IHNwZWNpZnlpbmcgdGhlIGZ1bmN0aW9ucyBpbiBGRiB0aHJvd3MgYW4gZXJyb3Jcblx0XHRcdHNldCA6IGZ1bmN0aW9uIChrZXksIHZhbCkgeyByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgdmFsKTsgfSxcblx0XHRcdGdldCA6IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpOyB9LFxuXHRcdFx0ZGVsIDogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7IH1cblx0XHR9O1xuXHR9KCQpKTtcblxuXHQvLyBpbmNsdWRlIHRoZSBzdGF0ZSBwbHVnaW4gYnkgZGVmYXVsdFxuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJzdGF0ZVwiKTtcblxuLyoqXG4gKiAjIyMgVHlwZXMgcGx1Z2luXG4gKlxuICogTWFrZXMgaXQgcG9zc2libGUgdG8gYWRkIHByZWRlZmluZWQgdHlwZXMgZm9yIGdyb3VwcyBvZiBub2Rlcywgd2hpY2ggbWFrZSBpdCBwb3NzaWJsZSB0byBlYXNpbHkgY29udHJvbCBuZXN0aW5nIHJ1bGVzIGFuZCBpY29uIGZvciBlYWNoIGdyb3VwLlxuICovXG5cblx0LyoqXG5cdCAqIEFuIG9iamVjdCBzdG9yaW5nIGFsbCB0eXBlcyBhcyBrZXkgdmFsdWUgcGFpcnMsIHdoZXJlIHRoZSBrZXkgaXMgdGhlIHR5cGUgbmFtZSBhbmQgdGhlIHZhbHVlIGlzIGFuIG9iamVjdCB0aGF0IGNvdWxkIGNvbnRhaW4gZm9sbG93aW5nIGtleXMgKGFsbCBvcHRpb25hbCkuXG5cdCAqXG5cdCAqICogYG1heF9jaGlsZHJlbmAgdGhlIG1heGltdW0gbnVtYmVyIG9mIGltbWVkaWF0ZSBjaGlsZHJlbiB0aGlzIG5vZGUgdHlwZSBjYW4gaGF2ZS4gRG8gbm90IHNwZWNpZnkgb3Igc2V0IHRvIGAtMWAgZm9yIHVubGltaXRlZC5cblx0ICogKiBgbWF4X2RlcHRoYCB0aGUgbWF4aW11bSBudW1iZXIgb2YgbmVzdGluZyB0aGlzIG5vZGUgdHlwZSBjYW4gaGF2ZS4gQSB2YWx1ZSBvZiBgMWAgd291bGQgbWVhbiB0aGF0IHRoZSBub2RlIGNhbiBoYXZlIGNoaWxkcmVuLCBidXQgbm8gZ3JhbmRjaGlsZHJlbi4gRG8gbm90IHNwZWNpZnkgb3Igc2V0IHRvIGAtMWAgZm9yIHVubGltaXRlZC5cblx0ICogKiBgdmFsaWRfY2hpbGRyZW5gIGFuIGFycmF5IG9mIG5vZGUgdHlwZSBzdHJpbmdzLCB0aGF0IG5vZGVzIG9mIHRoaXMgdHlwZSBjYW4gaGF2ZSBhcyBjaGlsZHJlbi4gRG8gbm90IHNwZWNpZnkgb3Igc2V0IHRvIGAtMWAgZm9yIG5vIGxpbWl0cy5cblx0ICogKiBgaWNvbmAgYSBzdHJpbmcgLSBjYW4gYmUgYSBwYXRoIHRvIGFuIGljb24gb3IgYSBjbGFzc05hbWUsIGlmIHVzaW5nIGFuIGltYWdlIHRoYXQgaXMgaW4gdGhlIGN1cnJlbnQgZGlyZWN0b3J5IHVzZSBhIGAuL2AgcHJlZml4LCBvdGhlcndpc2UgaXQgd2lsbCBiZSBkZXRlY3RlZCBhcyBhIGNsYXNzLiBPbWl0IHRvIHVzZSB0aGUgZGVmYXVsdCBpY29uIGZyb20geW91ciB0aGVtZS5cblx0ICogKiBgbGlfYXR0cmAgYW4gb2JqZWN0IG9mIHZhbHVlcyB3aGljaCB3aWxsIGJlIHVzZWQgdG8gYWRkIEhUTUwgYXR0cmlidXRlcyBvbiB0aGUgcmVzdWx0aW5nIExJIERPTSBub2RlIChtZXJnZWQgd2l0aCB0aGUgbm9kZSdzIG93biBkYXRhKVxuXHQgKiAqIGBhX2F0dHJgIGFuIG9iamVjdCBvZiB2YWx1ZXMgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGFkZCBIVE1MIGF0dHJpYnV0ZXMgb24gdGhlIHJlc3VsdGluZyBBIERPTSBub2RlIChtZXJnZWQgd2l0aCB0aGUgbm9kZSdzIG93biBkYXRhKVxuXHQgKlxuXHQgKiBUaGVyZSBhcmUgdHdvIHByZWRlZmluZWQgdHlwZXM6XG5cdCAqXG5cdCAqICogYCNgIHJlcHJlc2VudHMgdGhlIHJvb3Qgb2YgdGhlIHRyZWUsIGZvciBleGFtcGxlIGBtYXhfY2hpbGRyZW5gIHdvdWxkIGNvbnRyb2wgdGhlIG1heGltdW0gbnVtYmVyIG9mIHJvb3Qgbm9kZXMuXG5cdCAqICogYGRlZmF1bHRgIHJlcHJlc2VudHMgdGhlIGRlZmF1bHQgbm9kZSAtIGFueSBzZXR0aW5ncyBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byBhbGwgbm9kZXMgdGhhdCBkbyBub3QgaGF2ZSBhIHR5cGUgc3BlY2lmaWVkLlxuXHQgKlxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy50eXBlc1xuXHQgKiBAcGx1Z2luIHR5cGVzXG5cdCAqL1xuXHQkLmpzdHJlZS5kZWZhdWx0cy50eXBlcyA9IHtcblx0XHQnZGVmYXVsdCcgOiB7fVxuXHR9O1xuXHQkLmpzdHJlZS5kZWZhdWx0cy50eXBlc1skLmpzdHJlZS5yb290XSA9IHt9O1xuXG5cdCQuanN0cmVlLnBsdWdpbnMudHlwZXMgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0XHR2YXIgaSwgajtcblx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy50eXBlcyAmJiBvcHRpb25zLnR5cGVzWydkZWZhdWx0J10pIHtcblx0XHRcdFx0Zm9yKGkgaW4gb3B0aW9ucy50eXBlcykge1xuXHRcdFx0XHRcdGlmKGkgIT09IFwiZGVmYXVsdFwiICYmIGkgIT09ICQuanN0cmVlLnJvb3QgJiYgb3B0aW9ucy50eXBlcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0Zm9yKGogaW4gb3B0aW9ucy50eXBlc1snZGVmYXVsdCddKSB7XG5cdFx0XHRcdFx0XHRcdGlmKG9wdGlvbnMudHlwZXNbJ2RlZmF1bHQnXS5oYXNPd25Qcm9wZXJ0eShqKSAmJiBvcHRpb25zLnR5cGVzW2ldW2pdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLnR5cGVzW2ldW2pdID0gb3B0aW9ucy50eXBlc1snZGVmYXVsdCddW2pdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwYXJlbnQuaW5pdC5jYWxsKHRoaXMsIGVsLCBvcHRpb25zKTtcblx0XHRcdHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0udHlwZSA9ICQuanN0cmVlLnJvb3Q7XG5cdFx0fTtcblx0XHR0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoc2tpcF9sb2FkaW5nLCBmb3JnZXRfc3RhdGUpIHtcblx0XHRcdHBhcmVudC5yZWZyZXNoLmNhbGwodGhpcywgc2tpcF9sb2FkaW5nLCBmb3JnZXRfc3RhdGUpO1xuXHRcdFx0dGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XS50eXBlID0gJC5qc3RyZWUucm9vdDtcblx0XHR9O1xuXHRcdHRoaXMuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oJ21vZGVsLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgbSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdGRwYyA9IGRhdGEubm9kZXMsXG5cdFx0XHRcdFx0XHRcdHQgPSB0aGlzLnNldHRpbmdzLnR5cGVzLFxuXHRcdFx0XHRcdFx0XHRpLCBqLCBjID0gJ2RlZmF1bHQnLCBrO1xuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZHBjLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRjID0gJ2RlZmF1bHQnO1xuXHRcdFx0XHRcdFx0XHRpZihtW2RwY1tpXV0ub3JpZ2luYWwgJiYgbVtkcGNbaV1dLm9yaWdpbmFsLnR5cGUgJiYgdFttW2RwY1tpXV0ub3JpZ2luYWwudHlwZV0pIHtcblx0XHRcdFx0XHRcdFx0XHRjID0gbVtkcGNbaV1dLm9yaWdpbmFsLnR5cGU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYobVtkcGNbaV1dLmRhdGEgJiYgbVtkcGNbaV1dLmRhdGEuanN0cmVlICYmIG1bZHBjW2ldXS5kYXRhLmpzdHJlZS50eXBlICYmIHRbbVtkcGNbaV1dLmRhdGEuanN0cmVlLnR5cGVdKSB7XG5cdFx0XHRcdFx0XHRcdFx0YyA9IG1bZHBjW2ldXS5kYXRhLmpzdHJlZS50eXBlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS50eXBlID0gYztcblx0XHRcdFx0XHRcdFx0aWYobVtkcGNbaV1dLmljb24gPT09IHRydWUgJiYgdFtjXS5pY29uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uaWNvbiA9IHRbY10uaWNvbjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0W2NdLmxpX2F0dHIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdFtjXS5saV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoayBpbiB0W2NdLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh0W2NdLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGsgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChtW2RwY1tpXV0ubGlfYXR0cltrXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bVtkcGNbaV1dLmxpX2F0dHJba10gPSB0W2NdLmxpX2F0dHJba107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS5saV9hdHRyWydjbGFzcyddID0gdFtjXS5saV9hdHRyWydjbGFzcyddICsgJyAnICsgbVtkcGNbaV1dLmxpX2F0dHJbJ2NsYXNzJ107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodFtjXS5hX2F0dHIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdFtjXS5hX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChrIGluIHRbY10uYV9hdHRyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodFtjXS5hX2F0dHIuaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKGsgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlbHNlIGlmIChtW2RwY1tpXV0uYV9hdHRyW2tdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uYV9hdHRyW2tdID0gdFtjXS5hX2F0dHJba107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoayA9PT0gJ2hyZWYnICYmIG1bZHBjW2ldXS5hX2F0dHJba10gPT09ICcjJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS5hX2F0dHJbJ2hyZWYnXSA9IHRbY10uYV9hdHRyWydocmVmJ107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS5hX2F0dHJbJ2NsYXNzJ10gPSB0W2NdLmFfYXR0clsnY2xhc3MnXSArICcgJyArIG1bZHBjW2ldXS5hX2F0dHJbJ2NsYXNzJ107XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1bJC5qc3RyZWUucm9vdF0udHlwZSA9ICQuanN0cmVlLnJvb3Q7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdHBhcmVudC5iaW5kLmNhbGwodGhpcyk7XG5cdFx0fTtcblx0XHR0aGlzLmdldF9qc29uID0gZnVuY3Rpb24gKG9iaiwgb3B0aW9ucywgZmxhdCkge1xuXHRcdFx0dmFyIGksIGosXG5cdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRvcHQgPSBvcHRpb25zID8gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMsIHtub19pZDpmYWxzZX0pIDoge30sXG5cdFx0XHRcdHRtcCA9IHBhcmVudC5nZXRfanNvbi5jYWxsKHRoaXMsIG9iaiwgb3B0LCBmbGF0KTtcblx0XHRcdGlmKHRtcCA9PT0gZmFsc2UpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheSh0bXApKSB7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHR0bXBbaV0udHlwZSA9IHRtcFtpXS5pZCAmJiBtW3RtcFtpXS5pZF0gJiYgbVt0bXBbaV0uaWRdLnR5cGUgPyBtW3RtcFtpXS5pZF0udHlwZSA6IFwiZGVmYXVsdFwiO1xuXHRcdFx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5ub19pZCkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRtcFtpXS5pZDtcblx0XHRcdFx0XHRcdGlmKHRtcFtpXS5saV9hdHRyICYmIHRtcFtpXS5saV9hdHRyLmlkKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSB0bXBbaV0ubGlfYXR0ci5pZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRtcFtpXS5hX2F0dHIgJiYgdG1wW2ldLmFfYXR0ci5pZCkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgdG1wW2ldLmFfYXR0ci5pZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0bXAudHlwZSA9IHRtcC5pZCAmJiBtW3RtcC5pZF0gJiYgbVt0bXAuaWRdLnR5cGUgPyBtW3RtcC5pZF0udHlwZSA6IFwiZGVmYXVsdFwiO1xuXHRcdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMubm9faWQpIHtcblx0XHRcdFx0XHR0bXAgPSB0aGlzLl9kZWxldGVfaWRzKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0bXA7XG5cdFx0fTtcblx0XHR0aGlzLl9kZWxldGVfaWRzID0gZnVuY3Rpb24gKHRtcCkge1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkodG1wKSkge1xuXHRcdFx0XHRmb3IodmFyIGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRtcFtpXSA9IHRoaXMuX2RlbGV0ZV9pZHModG1wW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG1wO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIHRtcC5pZDtcblx0XHRcdGlmKHRtcC5saV9hdHRyICYmIHRtcC5saV9hdHRyLmlkKSB7XG5cdFx0XHRcdGRlbGV0ZSB0bXAubGlfYXR0ci5pZDtcblx0XHRcdH1cblx0XHRcdGlmKHRtcC5hX2F0dHIgJiYgdG1wLmFfYXR0ci5pZCkge1xuXHRcdFx0XHRkZWxldGUgdG1wLmFfYXR0ci5pZDtcblx0XHRcdH1cblx0XHRcdGlmKHRtcC5jaGlsZHJlbiAmJiAkLnZha2F0YS5pc19hcnJheSh0bXAuY2hpbGRyZW4pKSB7XG5cdFx0XHRcdHRtcC5jaGlsZHJlbiA9IHRoaXMuX2RlbGV0ZV9pZHModG1wLmNoaWxkcmVuKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0bXA7XG5cdFx0fTtcblx0XHR0aGlzLmNoZWNrID0gZnVuY3Rpb24gKGNoaywgb2JqLCBwYXIsIHBvcywgbW9yZSkge1xuXHRcdFx0aWYocGFyZW50LmNoZWNrLmNhbGwodGhpcywgY2hrLCBvYmosIHBhciwgcG9zLCBtb3JlKSA9PT0gZmFsc2UpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRvYmogPSBvYmogJiYgb2JqLmlkID8gb2JqIDogdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cGFyID0gcGFyICYmIHBhci5pZCA/IHBhciA6IHRoaXMuZ2V0X25vZGUocGFyKTtcblx0XHRcdHZhciBtID0gb2JqICYmIG9iai5pZCA/IChtb3JlICYmIG1vcmUub3JpZ2luID8gbW9yZS5vcmlnaW4gOiAkLmpzdHJlZS5yZWZlcmVuY2Uob2JqLmlkKSkgOiBudWxsLCB0bXAsIGQsIGksIGo7XG5cdFx0XHRtID0gbSAmJiBtLl9tb2RlbCAmJiBtLl9tb2RlbC5kYXRhID8gbS5fbW9kZWwuZGF0YSA6IG51bGw7XG5cdFx0XHRzd2l0Y2goY2hrKSB7XG5cdFx0XHRcdGNhc2UgXCJjcmVhdGVfbm9kZVwiOlxuXHRcdFx0XHRjYXNlIFwibW92ZV9ub2RlXCI6XG5cdFx0XHRcdGNhc2UgXCJjb3B5X25vZGVcIjpcblx0XHRcdFx0XHRpZihjaGsgIT09ICdtb3ZlX25vZGUnIHx8ICQuaW5BcnJheShvYmouaWQsIHBhci5jaGlsZHJlbikgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ydWxlcyhwYXIpO1xuXHRcdFx0XHRcdFx0aWYodG1wLm1heF9jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRtcC5tYXhfY2hpbGRyZW4gIT09IC0xICYmIHRtcC5tYXhfY2hpbGRyZW4gPT09IHBhci5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICd0eXBlcycsICdpZCcgOiAndHlwZXNfMDEnLCAncmVhc29uJyA6ICdtYXhfY2hpbGRyZW4gcHJldmVudHMgZnVuY3Rpb246ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYodG1wLnZhbGlkX2NoaWxkcmVuICE9PSB1bmRlZmluZWQgJiYgdG1wLnZhbGlkX2NoaWxkcmVuICE9PSAtMSAmJiAkLmluQXJyYXkoKG9iai50eXBlIHx8ICdkZWZhdWx0JyksIHRtcC52YWxpZF9jaGlsZHJlbikgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndHlwZXMnLCAnaWQnIDogJ3R5cGVzXzAyJywgJ3JlYXNvbicgOiAndmFsaWRfY2hpbGRyZW4gcHJldmVudHMgZnVuY3Rpb246ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYobSAmJiBvYmouY2hpbGRyZW5fZCAmJiBvYmoucGFyZW50cykge1xuXHRcdFx0XHRcdFx0XHRkID0gMDtcblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZCA9IE1hdGgubWF4KGQsIG1bb2JqLmNoaWxkcmVuX2RbaV1dLnBhcmVudHMubGVuZ3RoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkID0gZCAtIG9iai5wYXJlbnRzLmxlbmd0aCArIDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihkIDw9IDAgfHwgZCA9PT0gdW5kZWZpbmVkKSB7IGQgPSAxOyB9XG5cdFx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRcdGlmKHRtcC5tYXhfZGVwdGggIT09IHVuZGVmaW5lZCAmJiB0bXAubWF4X2RlcHRoICE9PSAtMSAmJiB0bXAubWF4X2RlcHRoIDwgZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndHlwZXMnLCAnaWQnIDogJ3R5cGVzXzAzJywgJ3JlYXNvbicgOiAnbWF4X2RlcHRoIHByZXZlbnRzIGZ1bmN0aW9uOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUocGFyLnBhcmVudCk7XG5cdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X3J1bGVzKHBhcik7XG5cdFx0XHRcdFx0XHRcdGQrKztcblx0XHRcdFx0XHRcdH0gd2hpbGUocGFyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIHVzZWQgdG8gcmV0cmlldmUgdGhlIHR5cGUgc2V0dGluZ3Mgb2JqZWN0IGZvciBhIG5vZGVcblx0XHQgKiBAbmFtZSBnZXRfcnVsZXMob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBmaW5kIHRoZSBydWxlcyBmb3Jcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICogQHBsdWdpbiB0eXBlc1xuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0X3J1bGVzID0gZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciB0bXAgPSB0aGlzLmdldF90eXBlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZih0bXAubWF4X2RlcHRoID09PSB1bmRlZmluZWQpIHsgdG1wLm1heF9kZXB0aCA9IC0xOyB9XG5cdFx0XHRpZih0bXAubWF4X2NoaWxkcmVuID09PSB1bmRlZmluZWQpIHsgdG1wLm1heF9jaGlsZHJlbiA9IC0xOyB9XG5cdFx0XHRpZih0bXAudmFsaWRfY2hpbGRyZW4gPT09IHVuZGVmaW5lZCkgeyB0bXAudmFsaWRfY2hpbGRyZW4gPSAtMTsgfVxuXHRcdFx0cmV0dXJuIHRtcDtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIHVzZWQgdG8gcmV0cmlldmUgdGhlIHR5cGUgc3RyaW5nIG9yIHNldHRpbmdzIG9iamVjdCBmb3IgYSBub2RlXG5cdFx0ICogQG5hbWUgZ2V0X3R5cGUob2JqIFssIHJ1bGVzXSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gZmluZCB0aGUgcnVsZXMgZm9yXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBydWxlcyBpZiBzZXQgdG8gYHRydWVgIGluc3RlYWQgb2YgYSBzdHJpbmcgdGhlIHNldHRpbmdzIG9iamVjdCB3aWxsIGJlIHJldHVybmVkXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfE9iamVjdH1cblx0XHQgKiBAcGx1Z2luIHR5cGVzXG5cdFx0ICovXG5cdFx0dGhpcy5nZXRfdHlwZSA9IGZ1bmN0aW9uIChvYmosIHJ1bGVzKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gKCFvYmopID8gZmFsc2UgOiAoIHJ1bGVzID8gJC5leHRlbmQoeyAndHlwZScgOiBvYmoudHlwZSB9LCB0aGlzLnNldHRpbmdzLnR5cGVzW29iai50eXBlXSkgOiBvYmoudHlwZSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1c2VkIHRvIGNoYW5nZSBhIG5vZGUncyB0eXBlXG5cdFx0ICogQG5hbWUgc2V0X3R5cGUob2JqLCB0eXBlKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBjaGFuZ2Vcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSB0aGUgbmV3IHR5cGVcblx0XHQgKiBAcGx1Z2luIHR5cGVzXG5cdFx0ICovXG5cdFx0dGhpcy5zZXRfdHlwZSA9IGZ1bmN0aW9uIChvYmosIHR5cGUpIHtcblx0XHRcdHZhciBtID0gdGhpcy5fbW9kZWwuZGF0YSwgdCwgdDEsIHQyLCBvbGRfdHlwZSwgb2xkX2ljb24sIGssIGQsIGE7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLnNldF90eXBlKG9ialt0MV0sIHR5cGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0dCA9IHRoaXMuc2V0dGluZ3MudHlwZXM7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighdFt0eXBlXSB8fCAhb2JqKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0ZCA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmIChkICYmIGQubGVuZ3RoKSB7XG5cdFx0XHRcdGEgPSBkLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpO1xuXHRcdFx0fVxuXHRcdFx0b2xkX3R5cGUgPSBvYmoudHlwZTtcblx0XHRcdG9sZF9pY29uID0gdGhpcy5nZXRfaWNvbihvYmopO1xuXHRcdFx0b2JqLnR5cGUgPSB0eXBlO1xuXHRcdFx0aWYob2xkX2ljb24gPT09IHRydWUgfHwgIXRbb2xkX3R5cGVdIHx8ICh0W29sZF90eXBlXS5pY29uICE9PSB1bmRlZmluZWQgJiYgb2xkX2ljb24gPT09IHRbb2xkX3R5cGVdLmljb24pKSB7XG5cdFx0XHRcdHRoaXMuc2V0X2ljb24ob2JqLCB0W3R5cGVdLmljb24gIT09IHVuZGVmaW5lZCA/IHRbdHlwZV0uaWNvbiA6IHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb2xkIHR5cGUgcHJvcHNcblx0XHRcdGlmKHRbb2xkX3R5cGVdICYmIHRbb2xkX3R5cGVdLmxpX2F0dHIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdFtvbGRfdHlwZV0ubGlfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChrIGluIHRbb2xkX3R5cGVdLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRpZiAodFtvbGRfdHlwZV0ubGlfYXR0ci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdFx0XHRcdFx0aWYgKGsgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChrID09PSAnY2xhc3MnKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5saV9hdHRyWydjbGFzcyddID0gKG1bb2JqLmlkXS5saV9hdHRyWydjbGFzcyddIHx8ICcnKS5yZXBsYWNlKHRbb2xkX3R5cGVdLmxpX2F0dHJba10sICcnKTtcblx0XHRcdFx0XHRcdFx0aWYgKGQpIHsgZC5yZW1vdmVDbGFzcyh0W29sZF90eXBlXS5saV9hdHRyW2tdKTsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAobVtvYmouaWRdLmxpX2F0dHJba10gPT09IHRbb2xkX3R5cGVdLmxpX2F0dHJba10pIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmxpX2F0dHJba10gPSBudWxsO1xuXHRcdFx0XHRcdFx0XHRpZiAoZCkgeyBkLnJlbW92ZUF0dHIoayk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKHRbb2xkX3R5cGVdICYmIHRbb2xkX3R5cGVdLmFfYXR0ciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0W29sZF90eXBlXS5hX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoayBpbiB0W29sZF90eXBlXS5hX2F0dHIpIHtcblx0XHRcdFx0XHRpZiAodFtvbGRfdHlwZV0uYV9hdHRyLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmFfYXR0clsnY2xhc3MnXSA9IChtW29iai5pZF0uYV9hdHRyWydjbGFzcyddIHx8ICcnKS5yZXBsYWNlKHRbb2xkX3R5cGVdLmFfYXR0cltrXSwgJycpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYSkgeyBhLnJlbW92ZUNsYXNzKHRbb2xkX3R5cGVdLmFfYXR0cltrXSk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG1bb2JqLmlkXS5hX2F0dHJba10gPT09IHRbb2xkX3R5cGVdLmFfYXR0cltrXSkge1xuXHRcdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2hyZWYnKSB7XG5cdFx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmFfYXR0cltrXSA9ICcjJztcblx0XHRcdFx0XHRcdFx0XHRpZiAoYSkgeyBhLmF0dHIoJ2hyZWYnLCAnIycpOyB9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIG1bb2JqLmlkXS5hX2F0dHJba107XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGEpIHsgYS5yZW1vdmVBdHRyKGspOyB9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gYWRkIG5ldyBwcm9wc1xuXHRcdFx0aWYodFt0eXBlXS5saV9hdHRyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRbdHlwZV0ubGlfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChrIGluIHRbdHlwZV0ubGlfYXR0cikge1xuXHRcdFx0XHRcdGlmICh0W3R5cGVdLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRcdGlmIChrID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAobVtvYmouaWRdLmxpX2F0dHJba10gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRtW29iai5pZF0ubGlfYXR0cltrXSA9IHRbdHlwZV0ubGlfYXR0cltrXTtcblx0XHRcdFx0XHRcdFx0aWYgKGQpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0ZC5hZGRDbGFzcyh0W3R5cGVdLmxpX2F0dHJba10pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGQuYXR0cihrLCB0W3R5cGVdLmxpX2F0dHJba10pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRtW29iai5pZF0ubGlfYXR0clsnY2xhc3MnXSA9IHRbdHlwZV0ubGlfYXR0cltrXSArICcgJyArIG1bb2JqLmlkXS5saV9hdHRyWydjbGFzcyddO1xuXHRcdFx0XHRcdFx0XHRpZiAoZCkgeyBkLmFkZENsYXNzKHRbdHlwZV0ubGlfYXR0cltrXSk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKHRbdHlwZV0uYV9hdHRyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRbdHlwZV0uYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGsgaW4gdFt0eXBlXS5hX2F0dHIpIHtcblx0XHRcdFx0XHRpZiAodFt0eXBlXS5hX2F0dHIuaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRcdGlmIChrID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAobVtvYmouaWRdLmFfYXR0cltrXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5hX2F0dHJba10gPSB0W3R5cGVdLmFfYXR0cltrXTtcblx0XHRcdFx0XHRcdFx0aWYgKGEpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0YS5hZGRDbGFzcyh0W3R5cGVdLmFfYXR0cltrXSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0YS5hdHRyKGssIHRbdHlwZV0uYV9hdHRyW2tdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdocmVmJyAmJiBtW29iai5pZF0uYV9hdHRyW2tdID09PSAnIycpIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmFfYXR0clsnaHJlZiddID0gdFt0eXBlXS5hX2F0dHJbJ2hyZWYnXTtcblx0XHRcdFx0XHRcdFx0aWYgKGEpIHsgYS5hdHRyKCdocmVmJywgdFt0eXBlXS5hX2F0dHJbJ2hyZWYnXSk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmFfYXR0clsnY2xhc3MnXSA9IHRbdHlwZV0uYV9hdHRyWydjbGFzcyddICsgJyAnICsgbVtvYmouaWRdLmFfYXR0clsnY2xhc3MnXTtcblx0XHRcdFx0XHRcdFx0aWYgKGEpIHsgYS5hZGRDbGFzcyh0W3R5cGVdLmFfYXR0cltrXSk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0fTtcblx0Ly8gaW5jbHVkZSB0aGUgdHlwZXMgcGx1Z2luIGJ5IGRlZmF1bHRcblx0Ly8gJC5qc3RyZWUuZGVmYXVsdHMucGx1Z2lucy5wdXNoKFwidHlwZXNcIik7XG5cblxuLyoqXG4gKiAjIyMgVW5pcXVlIHBsdWdpblxuICpcbiAqIEVuZm9yY2VzIHRoYXQgbm8gbm9kZXMgd2l0aCB0aGUgc2FtZSBuYW1lIGNhbiBjb2V4aXN0IGFzIHNpYmxpbmdzLlxuICovXG5cblx0LyoqXG5cdCAqIHN0b3JlcyBhbGwgZGVmYXVsdHMgZm9yIHRoZSB1bmlxdWUgcGx1Z2luXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnVuaXF1ZVxuXHQgKiBAcGx1Z2luIHVuaXF1ZVxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMudW5pcXVlID0ge1xuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiB0aGUgY29tcGFyaXNvbiBzaG91bGQgYmUgY2FzZSBzZW5zaXRpdmUuIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy51bmlxdWUuY2FzZV9zZW5zaXRpdmVcblx0XHQgKiBAcGx1Z2luIHVuaXF1ZVxuXHRcdCAqL1xuXHRcdGNhc2Vfc2Vuc2l0aXZlIDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIHdoaXRlIHNwYWNlIHNob3VsZCBiZSB0cmltbWVkIGJlZm9yZSB0aGUgY29tcGFyaXNvbi4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnVuaXF1ZS50cmltX3doaXRlc3BhY2Vcblx0XHQgKiBAcGx1Z2luIHVuaXF1ZVxuXHRcdCAqL1xuXHRcdHRyaW1fd2hpdGVzcGFjZSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEEgY2FsbGJhY2sgZXhlY3V0ZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgd2hlbiBhIG5ldyBub2RlIGlzIGNyZWF0ZWQgYW5kIHRoZSBuYW1lIGlzIGFscmVhZHkgdGFrZW4sIHRoZSB0d28gYXJndW1lbnRzIGFyZSB0aGUgY29uZmxpY3RpbmcgbmFtZSBhbmQgdGhlIGNvdW50ZXIuIFRoZSBkZWZhdWx0IHdpbGwgcHJvZHVjZSByZXN1bHRzIGxpa2UgYE5ldyBub2RlICgyKWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMudW5pcXVlLmR1cGxpY2F0ZVxuXHRcdCAqIEBwbHVnaW4gdW5pcXVlXG5cdFx0ICovXG5cdFx0ZHVwbGljYXRlIDogZnVuY3Rpb24gKG5hbWUsIGNvdW50ZXIpIHtcblx0XHRcdHJldHVybiBuYW1lICsgJyAoJyArIGNvdW50ZXIgKyAnKSc7XG5cdFx0fVxuXHR9O1xuXG5cdCQuanN0cmVlLnBsdWdpbnMudW5pcXVlID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuY2hlY2sgPSBmdW5jdGlvbiAoY2hrLCBvYmosIHBhciwgcG9zLCBtb3JlKSB7XG5cdFx0XHRpZihwYXJlbnQuY2hlY2suY2FsbCh0aGlzLCBjaGssIG9iaiwgcGFyLCBwb3MsIG1vcmUpID09PSBmYWxzZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdG9iaiA9IG9iaiAmJiBvYmouaWQgPyBvYmogOiB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRwYXIgPSBwYXIgJiYgcGFyLmlkID8gcGFyIDogdGhpcy5nZXRfbm9kZShwYXIpO1xuXHRcdFx0aWYoIXBhciB8fCAhcGFyLmNoaWxkcmVuKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0XHR2YXIgbiA9IGNoayA9PT0gXCJyZW5hbWVfbm9kZVwiID8gcG9zIDogb2JqLnRleHQsXG5cdFx0XHRcdGMgPSBbXSxcblx0XHRcdFx0cyA9IHRoaXMuc2V0dGluZ3MudW5pcXVlLmNhc2Vfc2Vuc2l0aXZlLFxuXHRcdFx0XHR3ID0gdGhpcy5zZXR0aW5ncy51bmlxdWUudHJpbV93aGl0ZXNwYWNlLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSwgaSwgaiwgdDtcblx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0dCA9IG1bcGFyLmNoaWxkcmVuW2ldXS50ZXh0O1xuXHRcdFx0XHRpZiAoIXMpIHtcblx0XHRcdFx0XHR0ID0gdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh3KSB7XG5cdFx0XHRcdFx0dCA9IHQucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjLnB1c2godCk7XG5cdFx0XHR9XG5cdFx0XHRpZighcykgeyBuID0gbi50b0xvd2VyQ2FzZSgpOyB9XG5cdFx0XHRpZiAodykgeyBuID0gbi5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpOyB9XG5cdFx0XHRzd2l0Y2goY2hrKSB7XG5cdFx0XHRcdGNhc2UgXCJkZWxldGVfbm9kZVwiOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRjYXNlIFwicmVuYW1lX25vZGVcIjpcblx0XHRcdFx0XHR0ID0gb2JqLnRleHQgfHwgJyc7XG5cdFx0XHRcdFx0aWYgKCFzKSB7XG5cdFx0XHRcdFx0XHR0ID0gdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodykge1xuXHRcdFx0XHRcdFx0dCA9IHQucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aSA9ICgkLmluQXJyYXkobiwgYykgPT09IC0xIHx8IChvYmoudGV4dCAmJiB0ID09PSBuKSk7XG5cdFx0XHRcdFx0aWYoIWkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndW5pcXVlJywgJ2lkJyA6ICd1bmlxdWVfMDEnLCAncmVhc29uJyA6ICdDaGlsZCB3aXRoIG5hbWUgJyArIG4gKyAnIGFscmVhZHkgZXhpc3RzLiBQcmV2ZW50aW5nOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHRjYXNlIFwiY3JlYXRlX25vZGVcIjpcblx0XHRcdFx0XHRpID0gKCQuaW5BcnJheShuLCBjKSA9PT0gLTEpO1xuXHRcdFx0XHRcdGlmKCFpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ3VuaXF1ZScsICdpZCcgOiAndW5pcXVlXzA0JywgJ3JlYXNvbicgOiAnQ2hpbGQgd2l0aCBuYW1lICcgKyBuICsgJyBhbHJlYWR5IGV4aXN0cy4gUHJldmVudGluZzogJyArIGNoaywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0Y2FzZSBcImNvcHlfbm9kZVwiOlxuXHRcdFx0XHRcdGkgPSAoJC5pbkFycmF5KG4sIGMpID09PSAtMSk7XG5cdFx0XHRcdFx0aWYoIWkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndW5pcXVlJywgJ2lkJyA6ICd1bmlxdWVfMDInLCAncmVhc29uJyA6ICdDaGlsZCB3aXRoIG5hbWUgJyArIG4gKyAnIGFscmVhZHkgZXhpc3RzLiBQcmV2ZW50aW5nOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0XHRjYXNlIFwibW92ZV9ub2RlXCI6XG5cdFx0XHRcdFx0aSA9ICggKG9iai5wYXJlbnQgPT09IHBhci5pZCAmJiAoIW1vcmUgfHwgIW1vcmUuaXNfbXVsdGkpKSB8fCAkLmluQXJyYXkobiwgYykgPT09IC0xKTtcblx0XHRcdFx0XHRpZighaSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICd1bmlxdWUnLCAnaWQnIDogJ3VuaXF1ZV8wMycsICdyZWFzb24nIDogJ0NoaWxkIHdpdGggbmFtZSAnICsgbiArICcgYWxyZWFkeSBleGlzdHMuIFByZXZlbnRpbmc6ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9O1xuXHRcdHRoaXMuY3JlYXRlX25vZGUgPSBmdW5jdGlvbiAocGFyLCBub2RlLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQpIHtcblx0XHRcdGlmKCFub2RlIHx8IG5vZGUudGV4dCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmKHBhciA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdHBhciA9ICQuanN0cmVlLnJvb3Q7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyID0gdGhpcy5nZXRfbm9kZShwYXIpO1xuXHRcdFx0XHRpZighcGFyKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcmVudC5jcmVhdGVfbm9kZS5jYWxsKHRoaXMsIHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRwb3MgPSBwb3MgPT09IHVuZGVmaW5lZCA/IFwibGFzdFwiIDogcG9zO1xuXHRcdFx0XHRpZighcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSAmJiAhaXNfbG9hZGVkICYmICF0aGlzLmlzX2xvYWRlZChwYXIpKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHBhcmVudC5jcmVhdGVfbm9kZS5jYWxsKHRoaXMsIHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighbm9kZSkgeyBub2RlID0ge307IH1cblx0XHRcdFx0dmFyIHRtcCwgbiwgZHBjLCBpLCBqLCBtID0gdGhpcy5fbW9kZWwuZGF0YSwgcyA9IHRoaXMuc2V0dGluZ3MudW5pcXVlLmNhc2Vfc2Vuc2l0aXZlLCB3ID0gdGhpcy5zZXR0aW5ncy51bmlxdWUudHJpbV93aGl0ZXNwYWNlLCBjYiA9IHRoaXMuc2V0dGluZ3MudW5pcXVlLmR1cGxpY2F0ZSwgdDtcblx0XHRcdFx0biA9IHRtcCA9IHRoaXMuZ2V0X3N0cmluZygnTmV3IG5vZGUnKTtcblx0XHRcdFx0ZHBjID0gW107XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHR0ID0gbVtwYXIuY2hpbGRyZW5baV1dLnRleHQ7XG5cdFx0XHRcdFx0aWYgKCFzKSB7XG5cdFx0XHRcdFx0XHR0ID0gdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodykge1xuXHRcdFx0XHRcdFx0dCA9IHQucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZHBjLnB1c2godCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aSA9IDE7XG5cdFx0XHRcdHQgPSBuO1xuXHRcdFx0XHRpZiAoIXMpIHtcblx0XHRcdFx0XHR0ID0gdC50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh3KSB7XG5cdFx0XHRcdFx0dCA9IHQucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR3aGlsZSgkLmluQXJyYXkodCwgZHBjKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRuID0gY2IuY2FsbCh0aGlzLCB0bXAsICgrK2kpKS50b1N0cmluZygpO1xuXHRcdFx0XHRcdHQgPSBuO1xuXHRcdFx0XHRcdGlmICghcykge1xuXHRcdFx0XHRcdFx0dCA9IHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHcpIHtcblx0XHRcdFx0XHRcdHQgPSB0LnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdG5vZGUudGV4dCA9IG47XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFyZW50LmNyZWF0ZV9ub2RlLmNhbGwodGhpcywgcGFyLCBub2RlLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQpO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gaW5jbHVkZSB0aGUgdW5pcXVlIHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcInVuaXF1ZVwiKTtcblxuXG4vKipcbiAqICMjIyBXaG9sZXJvdyBwbHVnaW5cbiAqXG4gKiBNYWtlcyBlYWNoIG5vZGUgYXBwZWFyIGJsb2NrIGxldmVsLiBNYWtpbmcgc2VsZWN0aW9uIGVhc2llci4gTWF5IGNhdXNlIHNsb3cgZG93biBmb3IgbGFyZ2UgdHJlZXMgaW4gb2xkIGJyb3dzZXJzLlxuICovXG5cblx0dmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXHRkaXYuc2V0QXR0cmlidXRlKCd1bnNlbGVjdGFibGUnLCdvbicpO1xuXHRkaXYuc2V0QXR0cmlidXRlKCdyb2xlJywncHJlc2VudGF0aW9uJyk7XG5cdGRpdi5jbGFzc05hbWUgPSAnanN0cmVlLXdob2xlcm93Jztcblx0ZGl2LmlubmVySFRNTCA9ICcmIzE2MDsnO1xuXHQkLmpzdHJlZS5wbHVnaW5zLndob2xlcm93ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHBhcmVudC5iaW5kLmNhbGwodGhpcyk7XG5cblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oJ3JlYWR5LmpzdHJlZSBzZXRfc3RhdGUuanN0cmVlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dGhpcy5oaWRlX2RvdHMoKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImluaXQuanN0cmVlIGxvYWRpbmcuanN0cmVlIHJlYWR5LmpzdHJlZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHQvL2Rpdi5zdHlsZS5oZWlnaHQgPSB0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0ICsgJ3B4Jztcblx0XHRcdFx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKCdqc3RyZWUtd2hvbGVyb3ctdWwnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImRlc2VsZWN0X2FsbC5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLXdob2xlcm93LWNsaWNrZWQnKS5yZW1vdmVDbGFzcygnanN0cmVlLXdob2xlcm93LWNsaWNrZWQnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImNoYW5nZWQuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS13aG9sZXJvdy1jbGlja2VkJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS13aG9sZXJvdy1jbGlja2VkJyk7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gZmFsc2UsIGksIGo7XG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXRhLnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKGRhdGEuc2VsZWN0ZWRbaV0sIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbignLmpzdHJlZS13aG9sZXJvdycpLmFkZENsYXNzKCdqc3RyZWUtd2hvbGVyb3ctY2xpY2tlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJvcGVuX25vZGUuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdldF9ub2RlKGRhdGEubm9kZSwgdHJ1ZSkuZmluZCgnLmpzdHJlZS1jbGlja2VkJykucGFyZW50KCkuY2hpbGRyZW4oJy5qc3RyZWUtd2hvbGVyb3cnKS5hZGRDbGFzcygnanN0cmVlLXdob2xlcm93LWNsaWNrZWQnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImhvdmVyX25vZGUuanN0cmVlIGRlaG92ZXJfbm9kZS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdGlmKGUudHlwZSA9PT0gXCJob3Zlcl9ub2RlXCIgJiYgdGhpcy5pc19kaXNhYmxlZChkYXRhLm5vZGUpKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdFx0dGhpcy5nZXRfbm9kZShkYXRhLm5vZGUsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLXdob2xlcm93JylbZS50eXBlID09PSBcImhvdmVyX25vZGVcIj9cImFkZENsYXNzXCI6XCJyZW1vdmVDbGFzc1wiXSgnanN0cmVlLXdob2xlcm93LWhvdmVyZWQnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImNvbnRleHRtZW51LmpzdHJlZVwiLCBcIi5qc3RyZWUtd2hvbGVyb3dcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9kYXRhLmNvbnRleHRtZW51KSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0dmFyIHRtcCA9ICQuRXZlbnQoJ2NvbnRleHRtZW51JywgeyBtZXRhS2V5IDogZS5tZXRhS2V5LCBjdHJsS2V5IDogZS5jdHJsS2V5LCBhbHRLZXkgOiBlLmFsdEtleSwgc2hpZnRLZXkgOiBlLnNoaWZ0S2V5LCBwYWdlWCA6IGUucGFnZVgsIHBhZ2VZIDogZS5wYWdlWSB9KTtcblx0XHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoXCIuanN0cmVlLW5vZGVcIikuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5maXJzdCgpLnRyaWdnZXIodG1wKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC8qIVxuXHRcdFx0XHQub24oXCJtb3VzZWRvd24uanN0cmVlIHRvdWNoc3RhcnQuanN0cmVlXCIsIFwiLmpzdHJlZS13aG9sZXJvd1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0aWYoZS50YXJnZXQgPT09IGUuY3VycmVudFRhcmdldCkge1xuXHRcdFx0XHRcdFx0XHR2YXIgYSA9ICQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KFwiLmpzdHJlZS1ub2RlXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIik7XG5cdFx0XHRcdFx0XHRcdGUudGFyZ2V0ID0gYVswXTtcblx0XHRcdFx0XHRcdFx0YS50cmlnZ2VyKGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdCovXG5cdFx0XHRcdC5vbihcImNsaWNrLmpzdHJlZVwiLCBcIi5qc3RyZWUtd2hvbGVyb3dcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gJC5FdmVudCgnY2xpY2snLCB7IG1ldGFLZXkgOiBlLm1ldGFLZXksIGN0cmxLZXkgOiBlLmN0cmxLZXksIGFsdEtleSA6IGUuYWx0S2V5LCBzaGlmdEtleSA6IGUuc2hpZnRLZXkgfSk7XG5cdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChcIi5qc3RyZWUtbm9kZVwiKS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmZpcnN0KCkudHJpZ2dlcih0bXApLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKFwiZGJsY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS13aG9sZXJvd1wiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSAkLkV2ZW50KCdkYmxjbGljaycsIHsgbWV0YUtleSA6IGUubWV0YUtleSwgY3RybEtleSA6IGUuY3RybEtleSwgYWx0S2V5IDogZS5hbHRLZXksIHNoaWZ0S2V5IDogZS5zaGlmdEtleSB9KTtcblx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KFwiLmpzdHJlZS1ub2RlXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuZmlyc3QoKS50cmlnZ2VyKHRtcCkudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQub24oXCJjbGljay5qc3RyZWVcIiwgXCIuanN0cmVlLWxlYWYgPiAuanN0cmVlLW9jbFwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSAkLkV2ZW50KCdjbGljaycsIHsgbWV0YUtleSA6IGUubWV0YUtleSwgY3RybEtleSA6IGUuY3RybEtleSwgYWx0S2V5IDogZS5hbHRLZXksIHNoaWZ0S2V5IDogZS5zaGlmdEtleSB9KTtcblx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KFwiLmpzdHJlZS1ub2RlXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuZmlyc3QoKS50cmlnZ2VyKHRtcCkudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcIm1vdXNlb3Zlci5qc3RyZWVcIiwgXCIuanN0cmVlLXdob2xlcm93LCAuanN0cmVlLWljb25cIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRpZighdGhpcy5pc19kaXNhYmxlZChlLmN1cnJlbnRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuaG92ZXJfbm9kZShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwibW91c2VsZWF2ZS5qc3RyZWVcIiwgXCIuanN0cmVlLW5vZGVcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGVob3Zlcl9ub2RlKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9O1xuXHRcdHRoaXMudGVhcmRvd24gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLndob2xlcm93KSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKFwiLmpzdHJlZS13aG9sZXJvd1wiKS5yZW1vdmUoKTtcblx0XHRcdH1cblx0XHRcdHBhcmVudC50ZWFyZG93bi5jYWxsKHRoaXMpO1xuXHRcdH07XG5cdFx0dGhpcy5yZWRyYXdfbm9kZSA9IGZ1bmN0aW9uKG9iaiwgZGVlcCwgY2FsbGJhY2ssIGZvcmNlX3JlbmRlcikge1xuXHRcdFx0b2JqID0gcGFyZW50LnJlZHJhd19ub2RlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRpZihvYmopIHtcblx0XHRcdFx0dmFyIHRtcCA9IGRpdi5jbG9uZU5vZGUodHJ1ZSk7XG5cdFx0XHRcdC8vdG1wLnN0eWxlLmhlaWdodCA9IHRoaXMuX2RhdGEuY29yZS5saV9oZWlnaHQgKyAncHgnO1xuXHRcdFx0XHRpZigkLmluQXJyYXkob2JqLmlkLCB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQpICE9PSAtMSkgeyB0bXAuY2xhc3NOYW1lICs9ICcganN0cmVlLXdob2xlcm93LWNsaWNrZWQnOyB9XG5cdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkICYmIHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID09PSBvYmouaWQpIHsgdG1wLmNsYXNzTmFtZSArPSAnIGpzdHJlZS13aG9sZXJvdy1ob3ZlcmVkJzsgfVxuXHRcdFx0XHRvYmouaW5zZXJ0QmVmb3JlKHRtcCwgb2JqLmNoaWxkTm9kZXNbMF0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iajtcblx0XHR9O1xuXHR9O1xuXHQvLyBpbmNsdWRlIHRoZSB3aG9sZXJvdyBwbHVnaW4gYnkgZGVmYXVsdFxuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJ3aG9sZXJvd1wiKTtcblx0aWYod2luZG93LmN1c3RvbUVsZW1lbnRzICYmIE9iamVjdCAmJiBPYmplY3QuY3JlYXRlKSB7XG5cdFx0dmFyIHByb3RvID0gT2JqZWN0LmNyZWF0ZShIVE1MRWxlbWVudC5wcm90b3R5cGUpO1xuXHRcdHByb3RvLmNyZWF0ZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBjID0geyBjb3JlIDoge30sIHBsdWdpbnMgOiBbXSB9LCBpO1xuXHRcdFx0Zm9yKGkgaW4gJC5qc3RyZWUucGx1Z2lucykge1xuXHRcdFx0XHRpZigkLmpzdHJlZS5wbHVnaW5zLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMuYXR0cmlidXRlc1tpXSkge1xuXHRcdFx0XHRcdGMucGx1Z2lucy5wdXNoKGkpO1xuXHRcdFx0XHRcdGlmKHRoaXMuZ2V0QXR0cmlidXRlKGkpICYmIEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoaSkpKSB7XG5cdFx0XHRcdFx0XHRjW2ldID0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZShpKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSBpbiAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlKSB7XG5cdFx0XHRcdGlmKCQuanN0cmVlLmRlZmF1bHRzLmNvcmUuaGFzT3duUHJvcGVydHkoaSkgJiYgdGhpcy5hdHRyaWJ1dGVzW2ldKSB7XG5cdFx0XHRcdFx0Yy5jb3JlW2ldID0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZShpKSkgfHwgdGhpcy5nZXRBdHRyaWJ1dGUoaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdCQodGhpcykuanN0cmVlKGMpO1xuXHRcdH07XG5cdFx0Ly8gcHJvdG8uYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKG5hbWUsIHByZXZpb3VzLCB2YWx1ZSkgeyB9O1xuXHRcdHRyeSB7XG5cdFx0XHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKFwidmFrYXRhLWpzdHJlZVwiLCBmdW5jdGlvbigpIHt9LCB7IHByb3RvdHlwZTogcHJvdG8gfSk7XG5cdFx0fSBjYXRjaCAoaWdub3JlKSB7IH1cblx0fVxuXG59KSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbInJlcXVpcmUiLCIkdHJlZUNvbnRhaW5lciIsIiQiLCIkdHJlZUNvbnRlbnQiLCIkdHJlZVNlYXJjaEZpZWxkIiwiJHRyZWVQcm9ncmVzc0JhciIsIiRmb3JtUHJvZ3Jlc3NCYXIiLCIkdHJlZVVwZGF0ZVByb2dyZXNzQmFyIiwiJHRyZWVPcmRlclNhdmVCdG4iLCJhamF4UmVxdWVzdCIsInRyZWVTZWFyY2hUaW1lb3V0IiwiY29uZmlnIiwiZmlsZURpcmVjdG9yeVRyZWVVcmwiLCJmaWxlRGlyZWN0b3J5Tm9kZUZvcm1VcmxQcmVmaXgiLCJmaWxlRGlyZWN0b3J5VHJlZUhpZXJhcmNoeVVwZGF0ZVVybCIsImZpbGVEaXJlY3RvcnlUcmVlTm9kZVR5cGVzIiwiZGVmYXVsdCIsImljb24iLCJpbml0aWFsaXplIiwib24iLCJvblRyZWVTYXZlT3JkZXJDbGljayIsIm9uVHJlZVNlYXJjaEtleXVwIiwiaW5pdEpzVHJlZSIsImRvY3VtZW50IiwicmVtb3ZlQXR0ciIsImxvYWQiLCJqc3RyZWUiLCJjb3JlIiwiY2hlY2tfY2FsbGJhY2siLCJvcCIsIm5vZGUiLCJwYXIiLCJwb3MiLCJtb3JlIiwiZG5kIiwicmVmIiwiZGF0YSIsImlkRmlsZURpcmVjdG9yeU5vZGUiLCJwbHVnaW5zIiwidHlwZXMiLCJpc19kcmFnZ2FibGUiLCJpdGVtcyIsImUiLCIkZmlsZXNMaXN0IiwiJGZpbGVzVGFibGUiLCJmaW5kIiwiZmlyc3QiLCIkZGVsZXRlRGlyZWN0b3J5QnV0dG9uIiwiJGRlbGV0ZURpcmVjdG9yeUNvbmZpcm1hdGlvbkJ1dHRvbiIsImF0dHIiLCJoaWRlIiwic2hvdyIsIkRhdGFUYWJsZSIsImFqYXgiLCJ1cmwiLCJjbG9zZXN0IiwiaWRQYXJlbnRGaWxlRGlyZWN0b3J5Tm9kZSIsInJlbW92ZUNsYXNzIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsIm1vZGFsIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsInNlYXJjaCIsInZhbCIsImpzdHJlZURhdGEiLCJnZXRfanNvbiIsInBhcmFtcyIsImlkX2ZpbGVfZGlyZWN0b3J5IiwiaWRGaWxlRGlyZWN0b3J5Iiwibm9kZXMiLCJnZXRGaWxlRGlyZWN0b3J5Tm9kZXNSZWN1cnNpdmVseSIsInBvc3QiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJyZWluaXRpYWxpemVUcmVlIiwid2luZG93Iiwic3dlZXRBbGVydCIsInRpdGxlIiwidGV4dCIsIm1lc3NhZ2UiLCJ0eXBlIiwiYWx3YXlzIiwiYWRkQ2xhc3MiLCIkdHJlZSIsImVtcHR5IiwiZWFjaCIsImkiLCJhdHRyaWJ1dGVzIiwibGVuZ3RoIiwibmFtZSIsImh0bWwiLCJlcnJvciIsImpxWEhSIiwidGV4dFN0YXR1cyIsImVycm9yVGhyb3duIiwianN0cmVlTm9kZSIsImNoaWxkcmVuIiwiY2hpbGROb2RlIiwiZmlsZURpcmVjdG9yeU5vZGUiLCJmaWxlX2RpcmVjdG9yeSIsInBvc2l0aW9uIiwicHVzaCIsIm1vZHVsZSIsImV4cG9ydHMiLCJmaWxlRGlyZWN0b3J5VHJlZSIsInJlYWR5Il0sInNvdXJjZVJvb3QiOiIifQ==