(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-navigation"],{

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/main.js":
/*!********************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/main.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var navigationTable = __webpack_require__(/*! ./navigation-table */ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-table.js");
$(document).ready(function () {
  navigationTable.initialize('#navigation-table');
});

/***/ }),

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-table.js":
/*!********************************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-table.js ***!
  \********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



var navigationTree = __webpack_require__(/*! ./navigation-tree */ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-tree.js");
var navigationTable;

/**
 * @param {string} selector
 */
function initialize(selector) {
  navigationTable = $(selector).DataTable();
  navigationTree.initialize();
  $(selector).find('tbody').on('click', 'tr', tableRowSelect);
  navigationTable.on('draw', selectFirstRow);
  navigationTable.on('select', loadNavigationTree);
  navigationTable.on('deselect', resetNavigationTree);
}

/**
 * @param {Event} e
 *
 * @return {void}
 */
function tableRowSelect(e) {
  if (!$(e.target).is('td')) {
    return;
  }
  navigationTable.rows().deselect();
  navigationTable.row($(this).index()).select();
}

/**
 * @return {void}
 */
function selectFirstRow(e, settings) {
  getDataTableApi(settings).row(0).select();
}

/**
 * @return {void}
 */
function loadNavigationTree(e, api, type, indexes) {
  var rowData = api.row(indexes[0]).data();
  navigationTree.load(rowData[0]);
}

/**
 * @return {void}
 */
function resetNavigationTree(e, api) {
  navigationTree.reset();
}

/**
 * @param {object} settings
 *
 * @returns {DataTable.Api}
 */
function getDataTableApi(settings) {
  return new $.fn.dataTable.Api(settings);
}

/**
 * Open public methods
 */
module.exports = {
  initialize: initialize
};

/***/ }),

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-tree.js":
/*!*******************************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/navigation-tree.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.js");
var $treeContainer = $('#navigation-tree-container');
var $treeContent = $('#navigation-tree-content');
var $treeSearchField = $('#navigation-tree-search-field');
var $treeProgressBar = $('#navigation-tree-loader');
var $formProgressBar = $('#navigation-node-form-loader');
var $treeUpdateProgressBar = $('#navigation-tree-update-loader');
var $treeOrderSaveBtn = $('#navigation-tree-save-btn');
var $iframe = $('#navigation-node-form-iframe');
var ajaxRequest;
var treeSearchTimeout = false;
var config = {
  navigationTreeUrl: '/navigation-gui/tree',
  navigationNodeFormUrlPrefix: '/navigation-gui/node/',
  navigationTreeHierarchyUpdateUrl: '/navigation-gui/tree/update-hierarchy',
  navigationTreeNodeTypes: {
    default: {
      icon: 'fa fa-folder'
    },
    navigation: {
      icon: 'fa fa-list'
    },
    cms_page: {
      icon: 'fa fa-file-o'
    },
    category: {
      icon: 'fa fa-sitemap'
    },
    link: {
      icon: 'fa fa-link'
    },
    external_url: {
      icon: 'fa fa-external-link'
    }
  }
};

/**
 * @return {void}
 */
function initialize() {
  $treeOrderSaveBtn.on('click', onTreeSaveOrderClick);
  $treeSearchField.keyup(onTreeSearchKeyup);

  // Enable save order button on tree change
  $(document).bind('dnd_stop.vakata', function () {
    $treeOrderSaveBtn.removeAttr('disabled');
  });
}

/**
 * @param {int} idNavigation
 * @param {int|null} selected
 * @param {boolean} skipFormLoad
 *
 * @return {void}
 */
function loadTree(idNavigation, selected, skipFormLoad) {
  $treeProgressBar.removeClass('hidden');
  $treeContainer.addClass('hidden');
  if (ajaxRequest) {
    ajaxRequest.abort();
  }
  ajaxRequest = $.get(config.navigationTreeUrl, {
    'id-navigation': idNavigation
  }, createTreeLoadHandler(idNavigation, selected, skipFormLoad)).always(function () {
    $treeProgressBar.addClass('hidden');
  });
}

/**
 * @return {void}
 */
function resetTree() {
  if (ajaxRequest) {
    ajaxRequest.abort();
  }
  $treeContent.html('');
  resetForm();
}

/**
 * @param {int} idNavigation
 * @param {int|null} selected
 * @param {boolean} skipFormLoad
 *
 * @returns {Function}
 */
function createTreeLoadHandler(idNavigation, selected, skipFormLoad) {
  return function (response) {
    $treeContent.html(response);
    initJsTree();
    $treeContainer.removeClass('hidden');
    if (skipFormLoad) {
      selectNode(selected);
      setNodeSelectListener(idNavigation);
    } else {
      setNodeSelectListener(idNavigation);
      selectNode(selected);
    }
  };
}

/**
 * @return {void}
 */
function initJsTree() {
  $('#navigation-tree').jstree({
    core: {
      check_callback: function (op, node, par, pos, more) {
        // disable drop on root level
        if (more && more.dnd && (op === 'move_node' || op === 'copy_node')) {
          return !!more.ref.data.idNavigationNode;
        }
        return true;
      }
    },
    plugins: ['types', 'wholerow', 'dnd', 'search'],
    types: config.navigationTreeNodeTypes,
    dnd: {
      is_draggable: function (items) {
        var idNavigationNode = items[0].data.idNavigationNode;
        return !!idNavigationNode;
      }
    }
  });
}

/**
 * @param {int} idNavigationNode
 *
 * @return {void}
 */
function selectNode(idNavigationNode) {
  var nodeToSelect = 'navigation-node-' + (idNavigationNode ? idNavigationNode : 0);
  $('#navigation-tree').jstree(true).select_node(nodeToSelect);
}

/**
 * @param {int} idNavigation
 *
 * @return {void}
 */
function setNodeSelectListener(idNavigation) {
  $('#navigation-tree').on('select_node.jstree', function (e, data) {
    var idNavigationNode = data.node.data.idNavigationNode;
    loadForm(idNavigation, idNavigationNode);
  });
}

/**
 * @param {int} idNavigation
 * @param {int} idNavigationNode
 *
 * @return {void}
 */
function loadForm(idNavigation, idNavigationNode) {
  var data = {
    'id-navigation': idNavigation,
    'id-navigation-node': idNavigationNode
  };
  var uri = config.navigationNodeFormUrlPrefix;
  if (idNavigationNode) {
    uri += 'update';
  } else {
    uri += 'create';
  }
  var url = uri + '?' + $.param(data);
  $iframe.addClass('hidden');
  $formProgressBar.removeClass('hidden');
  $iframe.off('load').on('load', onIframeLoad);
  $iframe[0].contentWindow.location.replace(url);
}

/**
 * @return {void}
 */
function resetForm() {
  $iframe.addClass('hidden');
}

/**
 * @return {void}
 */
function onIframeLoad() {
  changeIframeHeight();
  $formProgressBar.addClass('hidden');
  $iframe.removeClass('hidden');
  $($iframe[0].contentWindow).on('resize', changeIframeHeight);

  // tree reloading
  var treeReloader = $iframe.contents().find('#navigation-tree-reloader');
  if (treeReloader.length) {
    loadTree($(treeReloader[0]).data('idNavigation'), $(treeReloader[0]).data('idSelectedTreeNode'), true);
  }
}

/**
 * @return {void}
 */
function changeIframeHeight() {
  var iframeContentHeight = $iframe[0].contentWindow.document.body.scrollHeight;
  $iframe.height(iframeContentHeight);
}

/**
 * @return {void}
 */
function onTreeSearchKeyup() {
  if (treeSearchTimeout) {
    clearTimeout(treeSearchTimeout);
  }
  treeSearchTimeout = setTimeout(function () {
    $('#navigation-tree').jstree(true).search($treeSearchField.val());
  }, 250);
}

/**
 * @return {void}
 */
function onTreeSaveOrderClick() {
  $treeUpdateProgressBar.removeClass('hidden');
  var jstreeData = $('#navigation-tree').jstree(true).get_json();
  var params = {
    'navigation-tree': {
      navigation: {
        id_navigation: jstreeData[0].data.idNavigation
      },
      nodes: getNavigationNodesRecursively(jstreeData[0])
    }
  };
  $.post(config.navigationTreeHierarchyUpdateUrl, params, function (response) {
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

/**
 * @param {Object} jstreeNode
 *
 * @returns {Array}
 */
function getNavigationNodesRecursively(jstreeNode) {
  var nodes = [];
  $.each(jstreeNode.children, function (i, childNode) {
    var navigationNode = {
      navigation_node: {
        id_navigation_node: childNode.data.idNavigationNode,
        position: i + 1
      },
      children: getNavigationNodesRecursively(childNode)
    };
    nodes.push(navigationNode);
  });
  return nodes;
}

/**
 * Open public methods
 */
module.exports = {
  initialize: initialize,
  load: loadTree,
  reset: resetTree
};

/***/ }),

/***/ "./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation.entry.js":
/*!*************************************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation.entry.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/navigation/main */ "./vendor/spryker/navigation-gui/assets/Zed/js/modules/navigation/main.js");
__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/navigation-gui/assets/Zed/sass/main.scss");

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

/***/ "./vendor/spryker/navigation-gui/assets/Zed/sass/main.scss":
/*!*****************************************************************!*\
  !*** ./vendor/spryker/navigation-gui/assets/Zed/sass/main.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/navigation-gui/assets/Zed/js/spryker-zed-navigation.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvQ0FBb0M7QUFDekQsMEJBQTBCLG9CQUFvQjtBQUM5QztBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtB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QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSwwRkFBMEY7QUFDMUY7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNB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QUNBLG1DQUFtQyxvRkFBb0Y7QUFDdkg7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLHNDQUFzQyxvRkFBb0Y7QUFDMUg7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLG1DQUFtQyxvRkFBb0Y7QUFDdkg7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZEO0FBQzdELHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsU0FBUyxnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RCxJQUFJLGtCQUFrQjtBQUNwRixJQUFJO0FBQ0o7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDeCtRRCIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL25hdmlnYXRpb24tZ3VpL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9uYXZpZ2F0aW9uL21haW4uanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvbmF2aWdhdGlvbi1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL25hdmlnYXRpb24vbmF2aWdhdGlvbi10YWJsZS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9uYXZpZ2F0aW9uLWd1aS9hc3NldHMvWmVkL2pzL21vZHVsZXMvbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXRyZWUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvbmF2aWdhdGlvbi1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1uYXZpZ2F0aW9uLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9qc3RyZWUvZGlzdC9qc3RyZWUuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvbmF2aWdhdGlvbi1ndWkvYXNzZXRzL1plZC9zYXNzL21haW4uc2Nzcz9kZTJhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG5hdmlnYXRpb25UYWJsZSA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi10YWJsZScpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgbmF2aWdhdGlvblRhYmxlLmluaXRpYWxpemUoJyNuYXZpZ2F0aW9uLXRhYmxlJyk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG5hdmlnYXRpb25UcmVlID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uLXRyZWUnKTtcbnZhciBuYXZpZ2F0aW9uVGFibGU7XG5cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yXG4gKi9cbmZ1bmN0aW9uIGluaXRpYWxpemUoc2VsZWN0b3IpIHtcbiAgICBuYXZpZ2F0aW9uVGFibGUgPSAkKHNlbGVjdG9yKS5EYXRhVGFibGUoKTtcblxuICAgIG5hdmlnYXRpb25UcmVlLmluaXRpYWxpemUoKTtcblxuICAgICQoc2VsZWN0b3IpLmZpbmQoJ3Rib2R5Jykub24oJ2NsaWNrJywgJ3RyJywgdGFibGVSb3dTZWxlY3QpO1xuICAgIG5hdmlnYXRpb25UYWJsZS5vbignZHJhdycsIHNlbGVjdEZpcnN0Um93KTtcbiAgICBuYXZpZ2F0aW9uVGFibGUub24oJ3NlbGVjdCcsIGxvYWROYXZpZ2F0aW9uVHJlZSk7XG4gICAgbmF2aWdhdGlvblRhYmxlLm9uKCdkZXNlbGVjdCcsIHJlc2V0TmF2aWdhdGlvblRyZWUpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RXZlbnR9IGVcbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiB0YWJsZVJvd1NlbGVjdChlKSB7XG4gICAgaWYgKCEkKGUudGFyZ2V0KS5pcygndGQnKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGlvblRhYmxlLnJvd3MoKS5kZXNlbGVjdCgpO1xuICAgIG5hdmlnYXRpb25UYWJsZS5yb3coJCh0aGlzKS5pbmRleCgpKS5zZWxlY3QoKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBzZWxlY3RGaXJzdFJvdyhlLCBzZXR0aW5ncykge1xuICAgIGdldERhdGFUYWJsZUFwaShzZXR0aW5ncykucm93KDApLnNlbGVjdCgpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGxvYWROYXZpZ2F0aW9uVHJlZShlLCBhcGksIHR5cGUsIGluZGV4ZXMpIHtcbiAgICB2YXIgcm93RGF0YSA9IGFwaS5yb3coaW5kZXhlc1swXSkuZGF0YSgpO1xuICAgIG5hdmlnYXRpb25UcmVlLmxvYWQocm93RGF0YVswXSk7XG59XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gcmVzZXROYXZpZ2F0aW9uVHJlZShlLCBhcGkpIHtcbiAgICBuYXZpZ2F0aW9uVHJlZS5yZXNldCgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBzZXR0aW5nc1xuICpcbiAqIEByZXR1cm5zIHtEYXRhVGFibGUuQXBpfVxuICovXG5mdW5jdGlvbiBnZXREYXRhVGFibGVBcGkoc2V0dGluZ3MpIHtcbiAgICByZXR1cm4gbmV3ICQuZm4uZGF0YVRhYmxlLkFwaShzZXR0aW5ncyk7XG59XG5cbi8qKlxuICogT3BlbiBwdWJsaWMgbWV0aG9kc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpbml0aWFsaXplOiBpbml0aWFsaXplLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnanN0cmVlJyk7XG5cbnZhciAkdHJlZUNvbnRhaW5lciA9ICQoJyNuYXZpZ2F0aW9uLXRyZWUtY29udGFpbmVyJyk7XG52YXIgJHRyZWVDb250ZW50ID0gJCgnI25hdmlnYXRpb24tdHJlZS1jb250ZW50Jyk7XG52YXIgJHRyZWVTZWFyY2hGaWVsZCA9ICQoJyNuYXZpZ2F0aW9uLXRyZWUtc2VhcmNoLWZpZWxkJyk7XG52YXIgJHRyZWVQcm9ncmVzc0JhciA9ICQoJyNuYXZpZ2F0aW9uLXRyZWUtbG9hZGVyJyk7XG52YXIgJGZvcm1Qcm9ncmVzc0JhciA9ICQoJyNuYXZpZ2F0aW9uLW5vZGUtZm9ybS1sb2FkZXInKTtcbnZhciAkdHJlZVVwZGF0ZVByb2dyZXNzQmFyID0gJCgnI25hdmlnYXRpb24tdHJlZS11cGRhdGUtbG9hZGVyJyk7XG52YXIgJHRyZWVPcmRlclNhdmVCdG4gPSAkKCcjbmF2aWdhdGlvbi10cmVlLXNhdmUtYnRuJyk7XG52YXIgJGlmcmFtZSA9ICQoJyNuYXZpZ2F0aW9uLW5vZGUtZm9ybS1pZnJhbWUnKTtcblxudmFyIGFqYXhSZXF1ZXN0O1xudmFyIHRyZWVTZWFyY2hUaW1lb3V0ID0gZmFsc2U7XG5cbnZhciBjb25maWcgPSB7XG4gICAgbmF2aWdhdGlvblRyZWVVcmw6ICcvbmF2aWdhdGlvbi1ndWkvdHJlZScsXG4gICAgbmF2aWdhdGlvbk5vZGVGb3JtVXJsUHJlZml4OiAnL25hdmlnYXRpb24tZ3VpL25vZGUvJyxcbiAgICBuYXZpZ2F0aW9uVHJlZUhpZXJhcmNoeVVwZGF0ZVVybDogJy9uYXZpZ2F0aW9uLWd1aS90cmVlL3VwZGF0ZS1oaWVyYXJjaHknLFxuICAgIG5hdmlnYXRpb25UcmVlTm9kZVR5cGVzOiB7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgIGljb246ICdmYSBmYS1mb2xkZXInLFxuICAgICAgICB9LFxuICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtbGlzdCcsXG4gICAgICAgIH0sXG4gICAgICAgIGNtc19wYWdlOiB7XG4gICAgICAgICAgICBpY29uOiAnZmEgZmEtZmlsZS1vJyxcbiAgICAgICAgfSxcbiAgICAgICAgY2F0ZWdvcnk6IHtcbiAgICAgICAgICAgIGljb246ICdmYSBmYS1zaXRlbWFwJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGluazoge1xuICAgICAgICAgICAgaWNvbjogJ2ZhIGZhLWxpbmsnLFxuICAgICAgICB9LFxuICAgICAgICBleHRlcm5hbF91cmw6IHtcbiAgICAgICAgICAgIGljb246ICdmYSBmYS1leHRlcm5hbC1saW5rJyxcbiAgICAgICAgfSxcbiAgICB9LFxufTtcblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgICR0cmVlT3JkZXJTYXZlQnRuLm9uKCdjbGljaycsIG9uVHJlZVNhdmVPcmRlckNsaWNrKTtcbiAgICAkdHJlZVNlYXJjaEZpZWxkLmtleXVwKG9uVHJlZVNlYXJjaEtleXVwKTtcblxuICAgIC8vIEVuYWJsZSBzYXZlIG9yZGVyIGJ1dHRvbiBvbiB0cmVlIGNoYW5nZVxuICAgICQoZG9jdW1lbnQpLmJpbmQoJ2RuZF9zdG9wLnZha2F0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRyZWVPcmRlclNhdmVCdG4ucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ludH0gaWROYXZpZ2F0aW9uXG4gKiBAcGFyYW0ge2ludHxudWxsfSBzZWxlY3RlZFxuICogQHBhcmFtIHtib29sZWFufSBza2lwRm9ybUxvYWRcbiAqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBsb2FkVHJlZShpZE5hdmlnYXRpb24sIHNlbGVjdGVkLCBza2lwRm9ybUxvYWQpIHtcbiAgICAkdHJlZVByb2dyZXNzQmFyLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcbiAgICAkdHJlZUNvbnRhaW5lci5hZGRDbGFzcygnaGlkZGVuJyk7XG5cbiAgICBpZiAoYWpheFJlcXVlc3QpIHtcbiAgICAgICAgYWpheFJlcXVlc3QuYWJvcnQoKTtcbiAgICB9XG5cbiAgICBhamF4UmVxdWVzdCA9ICQuZ2V0KFxuICAgICAgICBjb25maWcubmF2aWdhdGlvblRyZWVVcmwsXG4gICAgICAgIHsgJ2lkLW5hdmlnYXRpb24nOiBpZE5hdmlnYXRpb24gfSxcbiAgICAgICAgY3JlYXRlVHJlZUxvYWRIYW5kbGVyKGlkTmF2aWdhdGlvbiwgc2VsZWN0ZWQsIHNraXBGb3JtTG9hZCksXG4gICAgKS5hbHdheXMoZnVuY3Rpb24gKCkge1xuICAgICAgICAkdHJlZVByb2dyZXNzQmFyLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiByZXNldFRyZWUoKSB7XG4gICAgaWYgKGFqYXhSZXF1ZXN0KSB7XG4gICAgICAgIGFqYXhSZXF1ZXN0LmFib3J0KCk7XG4gICAgfVxuXG4gICAgJHRyZWVDb250ZW50Lmh0bWwoJycpO1xuICAgIHJlc2V0Rm9ybSgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW50fSBpZE5hdmlnYXRpb25cbiAqIEBwYXJhbSB7aW50fG51bGx9IHNlbGVjdGVkXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNraXBGb3JtTG9hZFxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlVHJlZUxvYWRIYW5kbGVyKGlkTmF2aWdhdGlvbiwgc2VsZWN0ZWQsIHNraXBGb3JtTG9hZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgJHRyZWVDb250ZW50Lmh0bWwocmVzcG9uc2UpO1xuXG4gICAgICAgIGluaXRKc1RyZWUoKTtcblxuICAgICAgICAkdHJlZUNvbnRhaW5lci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAgICAgaWYgKHNraXBGb3JtTG9hZCkge1xuICAgICAgICAgICAgc2VsZWN0Tm9kZShzZWxlY3RlZCk7XG4gICAgICAgICAgICBzZXROb2RlU2VsZWN0TGlzdGVuZXIoaWROYXZpZ2F0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldE5vZGVTZWxlY3RMaXN0ZW5lcihpZE5hdmlnYXRpb24pO1xuICAgICAgICAgICAgc2VsZWN0Tm9kZShzZWxlY3RlZCk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIGluaXRKc1RyZWUoKSB7XG4gICAgJCgnI25hdmlnYXRpb24tdHJlZScpLmpzdHJlZSh7XG4gICAgICAgIGNvcmU6IHtcbiAgICAgICAgICAgIGNoZWNrX2NhbGxiYWNrOiBmdW5jdGlvbiAob3AsIG5vZGUsIHBhciwgcG9zLCBtb3JlKSB7XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBkcm9wIG9uIHJvb3QgbGV2ZWxcbiAgICAgICAgICAgICAgICBpZiAobW9yZSAmJiBtb3JlLmRuZCAmJiAob3AgPT09ICdtb3ZlX25vZGUnIHx8IG9wID09PSAnY29weV9ub2RlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhbW9yZS5yZWYuZGF0YS5pZE5hdmlnYXRpb25Ob2RlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogWyd0eXBlcycsICd3aG9sZXJvdycsICdkbmQnLCAnc2VhcmNoJ10sXG4gICAgICAgIHR5cGVzOiBjb25maWcubmF2aWdhdGlvblRyZWVOb2RlVHlwZXMsXG4gICAgICAgIGRuZDoge1xuICAgICAgICAgICAgaXNfZHJhZ2dhYmxlOiBmdW5jdGlvbiAoaXRlbXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWROYXZpZ2F0aW9uTm9kZSA9IGl0ZW1zWzBdLmRhdGEuaWROYXZpZ2F0aW9uTm9kZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFpZE5hdmlnYXRpb25Ob2RlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ludH0gaWROYXZpZ2F0aW9uTm9kZVxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHNlbGVjdE5vZGUoaWROYXZpZ2F0aW9uTm9kZSkge1xuICAgIHZhciBub2RlVG9TZWxlY3QgPSAnbmF2aWdhdGlvbi1ub2RlLScgKyAoaWROYXZpZ2F0aW9uTm9kZSA/IGlkTmF2aWdhdGlvbk5vZGUgOiAwKTtcbiAgICAkKCcjbmF2aWdhdGlvbi10cmVlJykuanN0cmVlKHRydWUpLnNlbGVjdF9ub2RlKG5vZGVUb1NlbGVjdCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbnR9IGlkTmF2aWdhdGlvblxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHNldE5vZGVTZWxlY3RMaXN0ZW5lcihpZE5hdmlnYXRpb24pIHtcbiAgICAkKCcjbmF2aWdhdGlvbi10cmVlJykub24oJ3NlbGVjdF9ub2RlLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG4gICAgICAgIHZhciBpZE5hdmlnYXRpb25Ob2RlID0gZGF0YS5ub2RlLmRhdGEuaWROYXZpZ2F0aW9uTm9kZTtcblxuICAgICAgICBsb2FkRm9ybShpZE5hdmlnYXRpb24sIGlkTmF2aWdhdGlvbk5vZGUpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW50fSBpZE5hdmlnYXRpb25cbiAqIEBwYXJhbSB7aW50fSBpZE5hdmlnYXRpb25Ob2RlXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gbG9hZEZvcm0oaWROYXZpZ2F0aW9uLCBpZE5hdmlnYXRpb25Ob2RlKSB7XG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICdpZC1uYXZpZ2F0aW9uJzogaWROYXZpZ2F0aW9uLFxuICAgICAgICAnaWQtbmF2aWdhdGlvbi1ub2RlJzogaWROYXZpZ2F0aW9uTm9kZSxcbiAgICB9O1xuICAgIHZhciB1cmkgPSBjb25maWcubmF2aWdhdGlvbk5vZGVGb3JtVXJsUHJlZml4O1xuICAgIGlmIChpZE5hdmlnYXRpb25Ob2RlKSB7XG4gICAgICAgIHVyaSArPSAndXBkYXRlJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgKz0gJ2NyZWF0ZSc7XG4gICAgfVxuICAgIHZhciB1cmwgPSB1cmkgKyAnPycgKyAkLnBhcmFtKGRhdGEpO1xuXG4gICAgJGlmcmFtZS5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgJGZvcm1Qcm9ncmVzc0Jhci5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAkaWZyYW1lLm9mZignbG9hZCcpLm9uKCdsb2FkJywgb25JZnJhbWVMb2FkKTtcbiAgICAkaWZyYW1lWzBdLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVwbGFjZSh1cmwpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcbiAgICAkaWZyYW1lLmFkZENsYXNzKCdoaWRkZW4nKTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHt2b2lkfVxuICovXG5mdW5jdGlvbiBvbklmcmFtZUxvYWQoKSB7XG4gICAgY2hhbmdlSWZyYW1lSGVpZ2h0KCk7XG4gICAgJGZvcm1Qcm9ncmVzc0Jhci5hZGRDbGFzcygnaGlkZGVuJyk7XG4gICAgJGlmcmFtZS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG5cbiAgICAkKCRpZnJhbWVbMF0uY29udGVudFdpbmRvdykub24oJ3Jlc2l6ZScsIGNoYW5nZUlmcmFtZUhlaWdodCk7XG5cbiAgICAvLyB0cmVlIHJlbG9hZGluZ1xuICAgIHZhciB0cmVlUmVsb2FkZXIgPSAkaWZyYW1lLmNvbnRlbnRzKCkuZmluZCgnI25hdmlnYXRpb24tdHJlZS1yZWxvYWRlcicpO1xuICAgIGlmICh0cmVlUmVsb2FkZXIubGVuZ3RoKSB7XG4gICAgICAgIGxvYWRUcmVlKCQodHJlZVJlbG9hZGVyWzBdKS5kYXRhKCdpZE5hdmlnYXRpb24nKSwgJCh0cmVlUmVsb2FkZXJbMF0pLmRhdGEoJ2lkU2VsZWN0ZWRUcmVlTm9kZScpLCB0cnVlKTtcbiAgICB9XG59XG5cbi8qKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuZnVuY3Rpb24gY2hhbmdlSWZyYW1lSGVpZ2h0KCkge1xuICAgIHZhciBpZnJhbWVDb250ZW50SGVpZ2h0ID0gJGlmcmFtZVswXS5jb250ZW50V2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICRpZnJhbWUuaGVpZ2h0KGlmcmFtZUNvbnRlbnRIZWlnaHQpO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIG9uVHJlZVNlYXJjaEtleXVwKCkge1xuICAgIGlmICh0cmVlU2VhcmNoVGltZW91dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodHJlZVNlYXJjaFRpbWVvdXQpO1xuICAgIH1cbiAgICB0cmVlU2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcjbmF2aWdhdGlvbi10cmVlJykuanN0cmVlKHRydWUpLnNlYXJjaCgkdHJlZVNlYXJjaEZpZWxkLnZhbCgpKTtcbiAgICB9LCAyNTApO1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIG9uVHJlZVNhdmVPcmRlckNsaWNrKCkge1xuICAgICR0cmVlVXBkYXRlUHJvZ3Jlc3NCYXIucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuXG4gICAgdmFyIGpzdHJlZURhdGEgPSAkKCcjbmF2aWdhdGlvbi10cmVlJykuanN0cmVlKHRydWUpLmdldF9qc29uKCk7XG4gICAgdmFyIHBhcmFtcyA9IHtcbiAgICAgICAgJ25hdmlnYXRpb24tdHJlZSc6IHtcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBpZF9uYXZpZ2F0aW9uOiBqc3RyZWVEYXRhWzBdLmRhdGEuaWROYXZpZ2F0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5vZGVzOiBnZXROYXZpZ2F0aW9uTm9kZXNSZWN1cnNpdmVseShqc3RyZWVEYXRhWzBdKSxcbiAgICAgICAgfSxcbiAgICB9O1xuXG4gICAgJC5wb3N0KGNvbmZpZy5uYXZpZ2F0aW9uVHJlZUhpZXJhcmNoeVVwZGF0ZVVybCwgcGFyYW1zLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgd2luZG93LnN3ZWV0QWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IHJlc3BvbnNlLnN1Y2Nlc3MgPyAnU3VjY2VzcycgOiAnRXJyb3InLFxuICAgICAgICAgICAgdGV4dDogcmVzcG9uc2UubWVzc2FnZSxcbiAgICAgICAgICAgIHR5cGU6IHJlc3BvbnNlLnN1Y2Nlc3MgPyAnc3VjY2VzcycgOiAnZXJyb3InLFxuICAgICAgICB9KTtcblxuICAgICAgICAkdHJlZU9yZGVyU2F2ZUJ0bi5hdHRyKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH0pLmFsd2F5cyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0cmVlVXBkYXRlUHJvZ3Jlc3NCYXIuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBqc3RyZWVOb2RlXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBnZXROYXZpZ2F0aW9uTm9kZXNSZWN1cnNpdmVseShqc3RyZWVOb2RlKSB7XG4gICAgdmFyIG5vZGVzID0gW107XG5cbiAgICAkLmVhY2goanN0cmVlTm9kZS5jaGlsZHJlbiwgZnVuY3Rpb24gKGksIGNoaWxkTm9kZSkge1xuICAgICAgICB2YXIgbmF2aWdhdGlvbk5vZGUgPSB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uX25vZGU6IHtcbiAgICAgICAgICAgICAgICBpZF9uYXZpZ2F0aW9uX25vZGU6IGNoaWxkTm9kZS5kYXRhLmlkTmF2aWdhdGlvbk5vZGUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGkgKyAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBnZXROYXZpZ2F0aW9uTm9kZXNSZWN1cnNpdmVseShjaGlsZE5vZGUpLFxuICAgICAgICB9O1xuXG4gICAgICAgIG5vZGVzLnB1c2gobmF2aWdhdGlvbk5vZGUpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vZGVzO1xufVxuXG4vKipcbiAqIE9wZW4gcHVibGljIG1ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbiAgICBsb2FkOiBsb2FkVHJlZSxcbiAgICByZXNldDogcmVzZXRUcmVlLFxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL25hdmlnYXRpb24vbWFpbicpO1xucmVxdWlyZSgnLi4vc2Fzcy9tYWluLnNjc3MnKTtcbiIsIi8qZ2xvYmFscyBqUXVlcnksIGRlZmluZSwgbW9kdWxlLCBleHBvcnRzLCByZXF1aXJlLCB3aW5kb3csIGRvY3VtZW50LCBwb3N0TWVzc2FnZSAqL1xuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0ZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuXHR9XG5cdGVsc2UgaWYodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShmdW5jdGlvbiAoJCwgdW5kZWZpbmVkKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuLyohXG4gKiBqc1RyZWUgMy4zLjEyXG4gKiBodHRwOi8vanN0cmVlLmNvbS9cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQgSXZhbiBCb3poYW5vdiAoaHR0cDovL3Zha2F0YS5jb20pXG4gKlxuICogTGljZW5zZWQgc2FtZSBhcyBqcXVlcnkgLSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBMaWNlbnNlXG4gKiAgIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cbi8qIVxuICogaWYgdXNpbmcganNsaW50IHBsZWFzZSBhbGxvdyBmb3IgdGhlIGpRdWVyeSBnbG9iYWwgYW5kIHVzZSBmb2xsb3dpbmcgb3B0aW9uczpcbiAqIGpzbGludDogbG9vcGZ1bmM6IHRydWUsIGJyb3dzZXI6IHRydWUsIGFzczogdHJ1ZSwgYml0d2lzZTogdHJ1ZSwgY29udGludWU6IHRydWUsIG5vbWVuOiB0cnVlLCBwbHVzcGx1czogdHJ1ZSwgcmVnZXhwOiB0cnVlLCB1bnBhcmFtOiB0cnVlLCB0b2RvOiB0cnVlLCB3aGl0ZTogdHJ1ZVxuICovXG4vKmpzaGludCAtVzA4MyAqL1xuXG5cdC8vIHByZXZlbnQgYW5vdGhlciBsb2FkPyBtYXliZSB0aGVyZSBpcyBhIGJldHRlciB3YXk/XG5cdGlmKCQuanN0cmVlKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0LyoqXG5cdCAqICMjIyBqc1RyZWUgY29yZSBmdW5jdGlvbmFsaXR5XG5cdCAqL1xuXG5cdC8vIGludGVybmFsIHZhcmlhYmxlc1xuXHR2YXIgaW5zdGFuY2VfY291bnRlciA9IDAsXG5cdFx0Y2NwX25vZGUgPSBmYWxzZSxcblx0XHRjY3BfbW9kZSA9IGZhbHNlLFxuXHRcdGNjcF9pbnN0ID0gZmFsc2UsXG5cdFx0dGhlbWVzX2xvYWRlZCA9IFtdLFxuXHRcdHNyYyA9ICQoJ3NjcmlwdDpsYXN0JykuYXR0cignc3JjJyksXG5cdFx0ZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7IC8vIGxvY2FsIHZhcmlhYmxlIGlzIGFsd2F5cyBmYXN0ZXIgdG8gYWNjZXNzIHRoZW4gYSBnbG9iYWxcblxuXHR2YXIgc2V0SW1tZWRpYXRlID0gd2luZG93LnNldEltbWVkaWF0ZTtcblx0dmFyIFByb21pc2UgPSB3aW5kb3cuUHJvbWlzZTtcblx0aWYgKCFzZXRJbW1lZGlhdGUgJiYgUHJvbWlzZSkge1xuXHRcdC8vIEdvb2QgZW5vdWdoIGFwcHJveGltYXRpb24gb2Ygc2V0SW1tZWRpYXRlXG5cdFx0c2V0SW1tZWRpYXRlID0gZnVuY3Rpb24gKGNiLCBhcmcpIHtcblx0XHRcdFByb21pc2UucmVzb2x2ZShhcmcpLnRoZW4oY2IpO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogaG9sZHMgYWxsIGpzdHJlZSByZWxhdGVkIGZ1bmN0aW9ucyBhbmQgdmFyaWFibGVzLCBpbmNsdWRpbmcgdGhlIGFjdHVhbCBjbGFzcyBhbmQgbWV0aG9kcyB0byBjcmVhdGUsIGFjY2VzcyBhbmQgbWFuaXB1bGF0ZSBpbnN0YW5jZXMuXG5cdCAqIEBuYW1lICQuanN0cmVlXG5cdCAqL1xuXHQkLmpzdHJlZSA9IHtcblx0XHQvKipcblx0XHQgKiBzcGVjaWZpZXMgdGhlIGpzdHJlZSB2ZXJzaW9uIGluIHVzZVxuXHRcdCAqIEBuYW1lICQuanN0cmVlLnZlcnNpb25cblx0XHQgKi9cblx0XHR2ZXJzaW9uIDogJzMuMy4xMicsXG5cdFx0LyoqXG5cdFx0ICogaG9sZHMgYWxsIHRoZSBkZWZhdWx0IG9wdGlvbnMgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0c1xuXHRcdCAqL1xuXHRcdGRlZmF1bHRzIDoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBjb25maWd1cmUgd2hpY2ggcGx1Z2lucyB3aWxsIGJlIGFjdGl2ZSBvbiBhbiBpbnN0YW5jZS4gU2hvdWxkIGJlIGFuIGFycmF5IG9mIHN0cmluZ3MsIHdoZXJlIGVhY2ggZWxlbWVudCBpcyBhIHBsdWdpbiBuYW1lLiBUaGUgZGVmYXVsdCBpcyBgW11gXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zXG5cdFx0XHQgKi9cblx0XHRcdHBsdWdpbnMgOiBbXVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc3RvcmVzIGFsbCBsb2FkZWQganN0cmVlIHBsdWdpbnMgKHVzZWQgaW50ZXJuYWxseSlcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5wbHVnaW5zXG5cdFx0ICovXG5cdFx0cGx1Z2lucyA6IHt9LFxuXHRcdHBhdGggOiBzcmMgJiYgc3JjLmluZGV4T2YoJy8nKSAhPT0gLTEgPyBzcmMucmVwbGFjZSgvXFwvW15cXC9dKyQvLCcnKSA6ICcnLFxuXHRcdGlkcmVnZXggOiAvW1xcXFw6JiFefCgpXFxbXFxdPD5AKicrfiNcIjsuLD1cXC0gXFwvJHt9JT9gXS9nLFxuXHRcdHJvb3QgOiAnIydcblx0fTtcblx0XG5cdC8qKlxuXHQgKiBjcmVhdGVzIGEganN0cmVlIGluc3RhbmNlXG5cdCAqIEBuYW1lICQuanN0cmVlLmNyZWF0ZShlbCBbLCBvcHRpb25zXSlcblx0ICogQHBhcmFtIHtET01FbGVtZW50fGpRdWVyeXxTdHJpbmd9IGVsIHRoZSBlbGVtZW50IHRvIGNyZWF0ZSB0aGUgaW5zdGFuY2Ugb24sIGNhbiBiZSBqUXVlcnkgZXh0ZW5kZWQgb3IgYSBzZWxlY3RvclxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zIGZvciB0aGlzIGluc3RhbmNlIChleHRlbmRzIGAkLmpzdHJlZS5kZWZhdWx0c2ApXG5cdCAqIEByZXR1cm4ge2pzVHJlZX0gdGhlIG5ldyBpbnN0YW5jZVxuXHQgKi9cblx0JC5qc3RyZWUuY3JlYXRlID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0dmFyIHRtcCA9IG5ldyAkLmpzdHJlZS5jb3JlKCsraW5zdGFuY2VfY291bnRlciksXG5cdFx0XHRvcHQgPSBvcHRpb25zO1xuXHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh0cnVlLCB7fSwgJC5qc3RyZWUuZGVmYXVsdHMsIG9wdGlvbnMpO1xuXHRcdGlmKG9wdCAmJiBvcHQucGx1Z2lucykge1xuXHRcdFx0b3B0aW9ucy5wbHVnaW5zID0gb3B0LnBsdWdpbnM7XG5cdFx0fVxuXHRcdCQuZWFjaChvcHRpb25zLnBsdWdpbnMsIGZ1bmN0aW9uIChpLCBrKSB7XG5cdFx0XHRpZihpICE9PSAnY29yZScpIHtcblx0XHRcdFx0dG1wID0gdG1wLnBsdWdpbihrLCBvcHRpb25zW2tdKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQkKGVsKS5kYXRhKCdqc3RyZWUnLCB0bXApO1xuXHRcdHRtcC5pbml0KGVsLCBvcHRpb25zKTtcblx0XHRyZXR1cm4gdG1wO1xuXHR9O1xuXHQvKipcblx0ICogcmVtb3ZlIGFsbCB0cmFjZXMgb2YganN0cmVlIGZyb20gdGhlIERPTSBhbmQgZGVzdHJveSBhbGwgaW5zdGFuY2VzXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlc3Ryb3koKVxuXHQgKi9cblx0JC5qc3RyZWUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblx0XHQkKCcuanN0cmVlOmpzdHJlZScpLmpzdHJlZSgnZGVzdHJveScpO1xuXHRcdCQoZG9jdW1lbnQpLm9mZignLmpzdHJlZScpO1xuXHR9O1xuXHQvKipcblx0ICogdGhlIGpzdHJlZSBjbGFzcyBjb25zdHJ1Y3RvciwgdXNlZCBvbmx5IGludGVybmFsbHlcblx0ICogQHByaXZhdGVcblx0ICogQG5hbWUgJC5qc3RyZWUuY29yZShpZClcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGlkIHRoaXMgaW5zdGFuY2UncyBpbmRleFxuXHQgKi9cblx0JC5qc3RyZWUuY29yZSA9IGZ1bmN0aW9uIChpZCkge1xuXHRcdHRoaXMuX2lkID0gaWQ7XG5cdFx0dGhpcy5fY250ID0gMDtcblx0XHR0aGlzLl93cmsgPSBudWxsO1xuXHRcdHRoaXMuX2RhdGEgPSB7XG5cdFx0XHRjb3JlIDoge1xuXHRcdFx0XHR0aGVtZXMgOiB7XG5cdFx0XHRcdFx0bmFtZSA6IGZhbHNlLFxuXHRcdFx0XHRcdGRvdHMgOiBmYWxzZSxcblx0XHRcdFx0XHRpY29ucyA6IGZhbHNlLFxuXHRcdFx0XHRcdGVsbGlwc2lzIDogZmFsc2Vcblx0XHRcdFx0fSxcblx0XHRcdFx0c2VsZWN0ZWQgOiBbXSxcblx0XHRcdFx0bGFzdF9lcnJvciA6IHt9LFxuXHRcdFx0XHR3b3JraW5nIDogZmFsc2UsXG5cdFx0XHRcdHdvcmtlcl9xdWV1ZSA6IFtdLFxuXHRcdFx0XHRmb2N1c2VkIDogbnVsbFxuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cdC8qKlxuXHQgKiBnZXQgYSByZWZlcmVuY2UgdG8gYW4gZXhpc3RpbmcgaW5zdGFuY2Vcblx0ICpcblx0ICogX19FeGFtcGxlc19fXG5cdCAqXG5cdCAqXHQvLyBwcm92aWRlZCBhIGNvbnRhaW5lciB3aXRoIGFuIElEIG9mIFwidHJlZVwiLCBhbmQgYSBuZXN0ZWQgbm9kZSB3aXRoIGFuIElEIG9mIFwiYnJhbmNoXCJcblx0ICpcdC8vIGFsbCBvZiB0aGVyZSB3aWxsIHJldHVybiB0aGUgc2FtZSBpbnN0YW5jZVxuXHQgKlx0JC5qc3RyZWUucmVmZXJlbmNlKCd0cmVlJyk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJyN0cmVlJyk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJCgnI3RyZWUnKSk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SUQoJ3RyZWUnKSk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJ2JyYW5jaCcpO1xuXHQgKlx0JC5qc3RyZWUucmVmZXJlbmNlKCcjYnJhbmNoJyk7XG5cdCAqXHQkLmpzdHJlZS5yZWZlcmVuY2UoJCgnI2JyYW5jaCcpKTtcblx0ICpcdCQuanN0cmVlLnJlZmVyZW5jZShkb2N1bWVudC5nZXRFbGVtZW50QnlJRCgnYnJhbmNoJykpO1xuXHQgKlxuXHQgKiBAbmFtZSAkLmpzdHJlZS5yZWZlcmVuY2UobmVlZGxlKVxuXHQgKiBAcGFyYW0ge0RPTUVsZW1lbnR8alF1ZXJ5fFN0cmluZ30gbmVlZGxlXG5cdCAqIEByZXR1cm4ge2pzVHJlZXxudWxsfSB0aGUgaW5zdGFuY2Ugb3IgYG51bGxgIGlmIG5vdCBmb3VuZFxuXHQgKi9cblx0JC5qc3RyZWUucmVmZXJlbmNlID0gZnVuY3Rpb24gKG5lZWRsZSkge1xuXHRcdHZhciB0bXAgPSBudWxsLFxuXHRcdFx0b2JqID0gbnVsbDtcblx0XHRpZihuZWVkbGUgJiYgbmVlZGxlLmlkICYmICghbmVlZGxlLnRhZ05hbWUgfHwgIW5lZWRsZS5ub2RlVHlwZSkpIHsgbmVlZGxlID0gbmVlZGxlLmlkOyB9XG5cblx0XHRpZighb2JqIHx8ICFvYmoubGVuZ3RoKSB7XG5cdFx0XHR0cnkgeyBvYmogPSAkKG5lZWRsZSk7IH0gY2F0Y2ggKGlnbm9yZSkgeyB9XG5cdFx0fVxuXHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGgpIHtcblx0XHRcdHRyeSB7IG9iaiA9ICQoJyMnICsgbmVlZGxlLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykpOyB9IGNhdGNoIChpZ25vcmUpIHsgfVxuXHRcdH1cblx0XHRpZihvYmogJiYgb2JqLmxlbmd0aCAmJiAob2JqID0gb2JqLmNsb3Nlc3QoJy5qc3RyZWUnKSkubGVuZ3RoICYmIChvYmogPSBvYmouZGF0YSgnanN0cmVlJykpKSB7XG5cdFx0XHR0bXAgPSBvYmo7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0JCgnLmpzdHJlZScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgaW5zdCA9ICQodGhpcykuZGF0YSgnanN0cmVlJyk7XG5cdFx0XHRcdGlmKGluc3QgJiYgaW5zdC5fbW9kZWwuZGF0YVtuZWVkbGVdKSB7XG5cdFx0XHRcdFx0dG1wID0gaW5zdDtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdG1wO1xuXHR9O1xuXHQvKipcblx0ICogQ3JlYXRlIGFuIGluc3RhbmNlLCBnZXQgYW4gaW5zdGFuY2Ugb3IgaW52b2tlIGEgY29tbWFuZCBvbiBhIGluc3RhbmNlLlxuXHQgKlxuXHQgKiBJZiB0aGVyZSBpcyBubyBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIGN1cnJlbnQgbm9kZSBhIG5ldyBvbmUgaXMgY3JlYXRlZCBhbmQgYGFyZ2AgaXMgdXNlZCB0byBleHRlbmQgYCQuanN0cmVlLmRlZmF1bHRzYCBmb3IgdGhpcyBuZXcgaW5zdGFuY2UuIFRoZXJlIHdvdWxkIGJlIG5vIHJldHVybiB2YWx1ZSAoY2hhaW5pbmcgaXMgbm90IGJyb2tlbikuXG5cdCAqXG5cdCAqIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlIGFuZCBgYXJnYCBpcyBhIHN0cmluZyB0aGUgY29tbWFuZCBzcGVjaWZpZWQgYnkgYGFyZ2AgaXMgZXhlY3V0ZWQgb24gdGhlIGluc3RhbmNlLCB3aXRoIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyBwYXNzZWQgdG8gdGhlIGZ1bmN0aW9uLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyBhIHZhbHVlIGl0IHdpbGwgYmUgcmV0dXJuZWQgKGNoYWluaW5nIGNvdWxkIGJyZWFrIGRlcGVuZGluZyBvbiBmdW5jdGlvbikuXG5cdCAqXG5cdCAqIElmIHRoZXJlIGlzIGFuIGV4aXN0aW5nIGluc3RhbmNlIGFuZCBgYXJnYCBpcyBub3QgYSBzdHJpbmcgdGhlIGluc3RhbmNlIGl0c2VsZiBpcyByZXR1cm5lZCAoc2ltaWxhciB0byBgJC5qc3RyZWUucmVmZXJlbmNlYCkuXG5cdCAqXG5cdCAqIEluIGFueSBvdGhlciBjYXNlIC0gbm90aGluZyBpcyByZXR1cm5lZCBhbmQgY2hhaW5pbmcgaXMgbm90IGJyb2tlbi5cblx0ICpcblx0ICogX19FeGFtcGxlc19fXG5cdCAqXG5cdCAqXHQkKCcjdHJlZTEnKS5qc3RyZWUoKTsgLy8gY3JlYXRlcyBhbiBpbnN0YW5jZVxuXHQgKlx0JCgnI3RyZWUyJykuanN0cmVlKHsgcGx1Z2lucyA6IFtdIH0pOyAvLyBjcmVhdGUgYW4gaW5zdGFuY2Ugd2l0aCBzb21lIG9wdGlvbnNcblx0ICpcdCQoJyN0cmVlMScpLmpzdHJlZSgnb3Blbl9ub2RlJywgJyNicmFuY2hfMScpOyAvLyBjYWxsIGEgbWV0aG9kIG9uIGFuIGV4aXN0aW5nIGluc3RhbmNlLCBwYXNzaW5nIGFkZGl0aW9uYWwgYXJndW1lbnRzXG5cdCAqXHQkKCcjdHJlZTInKS5qc3RyZWUoKTsgLy8gZ2V0IGFuIGV4aXN0aW5nIGluc3RhbmNlIChvciBjcmVhdGUgYW4gaW5zdGFuY2UpXG5cdCAqXHQkKCcjdHJlZTInKS5qc3RyZWUodHJ1ZSk7IC8vIGdldCBhbiBleGlzdGluZyBpbnN0YW5jZSAod2lsbCBub3QgY3JlYXRlIG5ldyBpbnN0YW5jZSlcblx0ICpcdCQoJyNicmFuY2hfMScpLmpzdHJlZSgpLnNlbGVjdF9ub2RlKCcjYnJhbmNoXzEnKTsgLy8gZ2V0IGFuIGluc3RhbmNlICh1c2luZyBhIG5lc3RlZCBlbGVtZW50IGFuZCBjYWxsIGEgbWV0aG9kKVxuXHQgKlxuXHQgKiBAbmFtZSAkKCkuanN0cmVlKFthcmddKVxuXHQgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGFyZ1xuXHQgKiBAcmV0dXJuIHtNaXhlZH1cblx0ICovXG5cdCQuZm4uanN0cmVlID0gZnVuY3Rpb24gKGFyZykge1xuXHRcdC8vIGNoZWNrIGZvciBzdHJpbmcgYXJndW1lbnRcblx0XHR2YXIgaXNfbWV0aG9kXHQ9ICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyksXG5cdFx0XHRhcmdzXHRcdD0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcblx0XHRcdHJlc3VsdFx0XHQ9IG51bGw7XG5cdFx0aWYoYXJnID09PSB0cnVlICYmICF0aGlzLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gZ2V0IHRoZSBpbnN0YW5jZSAoaWYgdGhlcmUgaXMgb25lKSBhbmQgbWV0aG9kIChpZiBpdCBleGlzdHMpXG5cdFx0XHR2YXIgaW5zdGFuY2UgPSAkLmpzdHJlZS5yZWZlcmVuY2UodGhpcyksXG5cdFx0XHRcdG1ldGhvZCA9IGlzX21ldGhvZCAmJiBpbnN0YW5jZSA/IGluc3RhbmNlW2FyZ10gOiBudWxsO1xuXHRcdFx0Ly8gaWYgY2FsbGluZyBhIG1ldGhvZCwgYW5kIG1ldGhvZCBpcyBhdmFpbGFibGUgLSBleGVjdXRlIG9uIHRoZSBpbnN0YW5jZVxuXHRcdFx0cmVzdWx0ID0gaXNfbWV0aG9kICYmIG1ldGhvZCA/XG5cdFx0XHRcdG1ldGhvZC5hcHBseShpbnN0YW5jZSwgYXJncykgOlxuXHRcdFx0XHRudWxsO1xuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgbm8gaW5zdGFuY2UgYW5kIG5vIG1ldGhvZCBpcyBiZWluZyBjYWxsZWQgLSBjcmVhdGUgb25lXG5cdFx0XHRpZighaW5zdGFuY2UgJiYgIWlzX21ldGhvZCAmJiAoYXJnID09PSB1bmRlZmluZWQgfHwgJC5pc1BsYWluT2JqZWN0KGFyZykpKSB7XG5cdFx0XHRcdCQuanN0cmVlLmNyZWF0ZSh0aGlzLCBhcmcpO1xuXHRcdFx0fVxuXHRcdFx0Ly8gaWYgdGhlcmUgaXMgYW4gaW5zdGFuY2UgYW5kIG5vIG1ldGhvZCBpcyBjYWxsZWQgLSByZXR1cm4gdGhlIGluc3RhbmNlXG5cdFx0XHRpZiggKGluc3RhbmNlICYmICFpc19tZXRob2QpIHx8IGFyZyA9PT0gdHJ1ZSApIHtcblx0XHRcdFx0cmVzdWx0ID0gaW5zdGFuY2UgfHwgZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHQvLyBpZiB0aGVyZSB3YXMgYSBtZXRob2QgY2FsbCB3aGljaCByZXR1cm5lZCBhIHJlc3VsdCAtIGJyZWFrIGFuZCByZXR1cm4gdGhlIHZhbHVlXG5cdFx0XHRpZihyZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8vIGlmIHRoZXJlIHdhcyBhIG1ldGhvZCBjYWxsIHdpdGggYSB2YWxpZCByZXR1cm4gdmFsdWUgLSByZXR1cm4gdGhhdCwgb3RoZXJ3aXNlIGNvbnRpbnVlIHRoZSBjaGFpblxuXHRcdHJldHVybiByZXN1bHQgIT09IG51bGwgJiYgcmVzdWx0ICE9PSB1bmRlZmluZWQgP1xuXHRcdFx0cmVzdWx0IDogdGhpcztcblx0fTtcblx0LyoqXG5cdCAqIHVzZWQgdG8gZmluZCBlbGVtZW50cyBjb250YWluaW5nIGFuIGluc3RhbmNlXG5cdCAqXG5cdCAqIF9fRXhhbXBsZXNfX1xuXHQgKlxuXHQgKlx0JCgnZGl2OmpzdHJlZScpLmVhY2goZnVuY3Rpb24gKCkge1xuXHQgKlx0XHQkKHRoaXMpLmpzdHJlZSgnZGVzdHJveScpO1xuXHQgKlx0fSk7XG5cdCAqXG5cdCAqIEBuYW1lICQoJzpqc3RyZWUnKVxuXHQgKiBAcmV0dXJuIHtqUXVlcnl9XG5cdCAqL1xuXHQkLmV4cHIucHNldWRvcy5qc3RyZWUgPSAkLmV4cHIuY3JlYXRlUHNldWRvKGZ1bmN0aW9uKHNlYXJjaCkge1xuXHRcdHJldHVybiBmdW5jdGlvbihhKSB7XG5cdFx0XHRyZXR1cm4gJChhKS5oYXNDbGFzcygnanN0cmVlJykgJiZcblx0XHRcdFx0JChhKS5kYXRhKCdqc3RyZWUnKSAhPT0gdW5kZWZpbmVkO1xuXHRcdH07XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBzdG9yZXMgYWxsIGRlZmF1bHRzIGZvciB0aGUgY29yZVxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlXG5cdCAqL1xuXHQkLmpzdHJlZS5kZWZhdWx0cy5jb3JlID0ge1xuXHRcdC8qKlxuXHRcdCAqIGRhdGEgY29uZmlndXJhdGlvblxuXHRcdCAqXG5cdFx0ICogSWYgbGVmdCBhcyBgZmFsc2VgIHRoZSBIVE1MIGluc2lkZSB0aGUganN0cmVlIGNvbnRhaW5lciBlbGVtZW50IGlzIHVzZWQgdG8gcG9wdWxhdGUgdGhlIHRyZWUgKHRoYXQgc2hvdWxkIGJlIGFuIHVub3JkZXJlZCBsaXN0IHdpdGggbGlzdCBpdGVtcykuXG5cdFx0ICpcblx0XHQgKiBZb3UgY2FuIGFsc28gcGFzcyBpbiBhIEhUTUwgc3RyaW5nIG9yIGEgSlNPTiBhcnJheSBoZXJlLlxuXHRcdCAqXG5cdFx0ICogSXQgaXMgcG9zc2libGUgdG8gcGFzcyBpbiBhIHN0YW5kYXJkIGpRdWVyeS1saWtlIEFKQVggY29uZmlnIGFuZCBqc3RyZWUgd2lsbCBhdXRvbWF0aWNhbGx5IGRldGVybWluZSBpZiB0aGUgcmVzcG9uc2UgaXMgSlNPTiBvciBIVE1MIGFuZCB1c2UgdGhhdCB0byBwb3B1bGF0ZSB0aGUgdHJlZS5cblx0XHQgKiBJbiBhZGRpdGlvbiB0byB0aGUgc3RhbmRhcmQgalF1ZXJ5IGFqYXggb3B0aW9ucyBoZXJlIHlvdSBjYW4gc3VwcGx5IGZ1bmN0aW9ucyBmb3IgYGRhdGFgIGFuZCBgdXJsYCwgdGhlIGZ1bmN0aW9ucyB3aWxsIGJlIHJ1biBpbiB0aGUgY3VycmVudCBpbnN0YW5jZSdzIHNjb3BlIGFuZCBhIHBhcmFtIHdpbGwgYmUgcGFzc2VkIGluZGljYXRpbmcgd2hpY2ggbm9kZSBpcyBiZWluZyBsb2FkZWQsIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhvc2UgZnVuY3Rpb25zIHdpbGwgYmUgdXNlZC5cblx0XHQgKlxuXHRcdCAqIFRoZSBsYXN0IG9wdGlvbiBpcyB0byBzcGVjaWZ5IGEgZnVuY3Rpb24sIHRoYXQgZnVuY3Rpb24gd2lsbCByZWNlaXZlIHRoZSBub2RlIGJlaW5nIGxvYWRlZCBhcyBhcmd1bWVudCBhbmQgYSBzZWNvbmQgcGFyYW0gd2hpY2ggaXMgYSBmdW5jdGlvbiB3aGljaCBzaG91bGQgYmUgY2FsbGVkIHdpdGggdGhlIHJlc3VsdC5cblx0XHQgKlxuXHRcdCAqIF9fRXhhbXBsZXNfX1xuXHRcdCAqXG5cdFx0ICpcdC8vIEFKQVhcblx0XHQgKlx0JCgnI3RyZWUnKS5qc3RyZWUoe1xuXHRcdCAqXHRcdCdjb3JlJyA6IHtcblx0XHQgKlx0XHRcdCdkYXRhJyA6IHtcblx0XHQgKlx0XHRcdFx0J3VybCcgOiAnL2dldC9jaGlsZHJlbi8nLFxuXHRcdCAqXHRcdFx0XHQnZGF0YScgOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdCAqXHRcdFx0XHRcdHJldHVybiB7ICdpZCcgOiBub2RlLmlkIH07XG5cdFx0ICpcdFx0XHRcdH1cblx0XHQgKlx0XHRcdH1cblx0XHQgKlx0XHR9KTtcblx0XHQgKlxuXHRcdCAqXHQvLyBkaXJlY3QgZGF0YVxuXHRcdCAqXHQkKCcjdHJlZScpLmpzdHJlZSh7XG5cdFx0ICpcdFx0J2NvcmUnIDoge1xuXHRcdCAqXHRcdFx0J2RhdGEnIDogW1xuXHRcdCAqXHRcdFx0XHQnU2ltcGxlIHJvb3Qgbm9kZScsXG5cdFx0ICpcdFx0XHRcdHtcblx0XHQgKlx0XHRcdFx0XHQnaWQnIDogJ25vZGVfMicsXG5cdFx0ICpcdFx0XHRcdFx0J3RleHQnIDogJ1Jvb3Qgbm9kZSB3aXRoIG9wdGlvbnMnLFxuXHRcdCAqXHRcdFx0XHRcdCdzdGF0ZScgOiB7ICdvcGVuZWQnIDogdHJ1ZSwgJ3NlbGVjdGVkJyA6IHRydWUgfSxcblx0XHQgKlx0XHRcdFx0XHQnY2hpbGRyZW4nIDogWyB7ICd0ZXh0JyA6ICdDaGlsZCAxJyB9LCAnQ2hpbGQgMiddXG5cdFx0ICpcdFx0XHRcdH1cblx0XHQgKlx0XHRcdF1cblx0XHQgKlx0XHR9XG5cdFx0ICpcdH0pO1xuXHRcdCAqXG5cdFx0ICpcdC8vIGZ1bmN0aW9uXG5cdFx0ICpcdCQoJyN0cmVlJykuanN0cmVlKHtcblx0XHQgKlx0XHQnY29yZScgOiB7XG5cdFx0ICpcdFx0XHQnZGF0YScgOiBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaykge1xuXHRcdCAqXHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIFsnUm9vdCAxJywgJ1Jvb3QgMiddKTtcblx0XHQgKlx0XHRcdH1cblx0XHQgKlx0XHR9KTtcblx0XHQgKlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUuZGF0YVxuXHRcdCAqL1xuXHRcdGRhdGFcdFx0XHQ6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIGNvbmZpZ3VyZSB0aGUgdmFyaW91cyBzdHJpbmdzIHVzZWQgdGhyb3VnaG91dCB0aGUgdHJlZVxuXHRcdCAqXG5cdFx0ICogWW91IGNhbiB1c2UgYW4gb2JqZWN0IHdoZXJlIHRoZSBrZXkgaXMgdGhlIHN0cmluZyB5b3UgbmVlZCB0byByZXBsYWNlIGFuZCB0aGUgdmFsdWUgaXMgeW91ciByZXBsYWNlbWVudC5cblx0XHQgKiBBbm90aGVyIG9wdGlvbiBpcyB0byBzcGVjaWZ5IGEgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBhcmd1bWVudCBvZiB0aGUgbmVlZGVkIHN0cmluZyBhbmQgc2hvdWxkIHJldHVybiB0aGUgcmVwbGFjZW1lbnQuXG5cdFx0ICogSWYgbGVmdCBhcyBgZmFsc2VgIG5vIHJlcGxhY2VtZW50IGlzIG1hZGUuXG5cdFx0ICpcblx0XHQgKiBfX0V4YW1wbGVzX19cblx0XHQgKlxuXHRcdCAqXHQkKCcjdHJlZScpLmpzdHJlZSh7XG5cdFx0ICpcdFx0J2NvcmUnIDoge1xuXHRcdCAqXHRcdFx0J3N0cmluZ3MnIDoge1xuXHRcdCAqXHRcdFx0XHQnTG9hZGluZyAuLi4nIDogJ1BsZWFzZSB3YWl0IC4uLidcblx0XHQgKlx0XHRcdH1cblx0XHQgKlx0XHR9XG5cdFx0ICpcdH0pO1xuXHRcdCAqXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5zdHJpbmdzXG5cdFx0ICovXG5cdFx0c3RyaW5nc1x0XHRcdDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogZGV0ZXJtaW5lcyB3aGF0IGhhcHBlbnMgd2hlbiBhIHVzZXIgdHJpZXMgdG8gbW9kaWZ5IHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIHRyZWVcblx0XHQgKiBJZiBsZWZ0IGFzIGBmYWxzZWAgYWxsIG9wZXJhdGlvbnMgbGlrZSBjcmVhdGUsIHJlbmFtZSwgZGVsZXRlLCBtb3ZlIG9yIGNvcHkgYXJlIHByZXZlbnRlZC5cblx0XHQgKiBZb3UgY2FuIHNldCB0aGlzIHRvIGB0cnVlYCB0byBhbGxvdyBhbGwgaW50ZXJhY3Rpb25zIG9yIHVzZSBhIGZ1bmN0aW9uIHRvIGhhdmUgYmV0dGVyIGNvbnRyb2wuXG5cdFx0ICpcblx0XHQgKiBfX0V4YW1wbGVzX19cblx0XHQgKlxuXHRcdCAqXHQkKCcjdHJlZScpLmpzdHJlZSh7XG5cdFx0ICpcdFx0J2NvcmUnIDoge1xuXHRcdCAqXHRcdFx0J2NoZWNrX2NhbGxiYWNrJyA6IGZ1bmN0aW9uIChvcGVyYXRpb24sIG5vZGUsIG5vZGVfcGFyZW50LCBub2RlX3Bvc2l0aW9uLCBtb3JlKSB7XG5cdFx0ICpcdFx0XHRcdC8vIG9wZXJhdGlvbiBjYW4gYmUgJ2NyZWF0ZV9ub2RlJywgJ3JlbmFtZV9ub2RlJywgJ2RlbGV0ZV9ub2RlJywgJ21vdmVfbm9kZScsICdjb3B5X25vZGUnIG9yICdlZGl0J1xuXHRcdCAqXHRcdFx0XHQvLyBpbiBjYXNlIG9mICdyZW5hbWVfbm9kZScgbm9kZV9wb3NpdGlvbiBpcyBmaWxsZWQgd2l0aCB0aGUgbmV3IG5vZGUgbmFtZVxuXHRcdCAqXHRcdFx0XHRyZXR1cm4gb3BlcmF0aW9uID09PSAncmVuYW1lX25vZGUnID8gdHJ1ZSA6IGZhbHNlO1xuXHRcdCAqXHRcdFx0fVxuXHRcdCAqXHRcdH1cblx0XHQgKlx0fSk7XG5cdFx0ICpcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmNoZWNrX2NhbGxiYWNrXG5cdFx0ICovXG5cdFx0Y2hlY2tfY2FsbGJhY2tcdDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogYSBjYWxsYmFjayBjYWxsZWQgd2l0aCBhIHNpbmdsZSBvYmplY3QgcGFyYW1ldGVyIGluIHRoZSBpbnN0YW5jZSdzIHNjb3BlIHdoZW4gc29tZXRoaW5nIGdvZXMgd3JvbmcgKG9wZXJhdGlvbiBwcmV2ZW50ZWQsIGFqYXggZmFpbGVkLCBldGMpXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5lcnJvclxuXHRcdCAqL1xuXHRcdGVycm9yXHRcdFx0OiAkLm5vb3AsXG5cdFx0LyoqXG5cdFx0ICogdGhlIG9wZW4gLyBjbG9zZSBhbmltYXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIC0gc2V0IHRoaXMgdG8gYGZhbHNlYCB0byBkaXNhYmxlIHRoZSBhbmltYXRpb24gKGRlZmF1bHQgaXMgYDIwMGApXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5hbmltYXRpb25cblx0XHQgKi9cblx0XHRhbmltYXRpb25cdFx0OiAyMDAsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgbXVsdGlwbGUgbm9kZXMgY2FuIGJlIHNlbGVjdGVkXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5tdWx0aXBsZVxuXHRcdCAqL1xuXHRcdG11bHRpcGxlXHRcdDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiB0aGVtZSBjb25maWd1cmF0aW9uIG9iamVjdFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzXG5cdFx0ICovXG5cdFx0dGhlbWVzXHRcdFx0OiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRoZSBuYW1lIG9mIHRoZSB0aGVtZSB0byB1c2UgKGlmIGxlZnQgYXMgYGZhbHNlYCB0aGUgZGVmYXVsdCB0aGVtZSBpcyB1c2VkKVxuXHRcdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXMubmFtZVxuXHRcdFx0ICovXG5cdFx0XHRuYW1lXHRcdFx0OiBmYWxzZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogdGhlIFVSTCBvZiB0aGUgdGhlbWUncyBDU1MgZmlsZSwgbGVhdmUgdGhpcyBhcyBgZmFsc2VgIGlmIHlvdSBoYXZlIG1hbnVhbGx5IGluY2x1ZGVkIHRoZSB0aGVtZSBDU1MgKHJlY29tbWVuZGVkKS4gWW91IGNhbiBzZXQgdGhpcyB0byBgdHJ1ZWAgdG9vIHdoaWNoIHdpbGwgdHJ5IHRvIGF1dG9sb2FkIHRoZSB0aGVtZS5cblx0XHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUudGhlbWVzLnVybFxuXHRcdFx0ICovXG5cdFx0XHR1cmxcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHQvKipcblx0XHRcdCAqIHRoZSBsb2NhdGlvbiBvZiBhbGwganN0cmVlIHRoZW1lcyAtIG9ubHkgdXNlZCBpZiBgdXJsYCBpcyBzZXQgdG8gYHRydWVgXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5kaXJcblx0XHRcdCAqL1xuXHRcdFx0ZGlyXHRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBjb25uZWN0aW5nIGRvdHMgYXJlIHNob3duXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5kb3RzXG5cdFx0XHQgKi9cblx0XHRcdGRvdHNcdFx0XHQ6IHRydWUsXG5cdFx0XHQvKipcblx0XHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIG5vZGUgaWNvbnMgYXJlIHNob3duXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5pY29uc1xuXHRcdFx0ICovXG5cdFx0XHRpY29uc1x0XHRcdDogdHJ1ZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgbm9kZSBlbGxpcHNpcyBzaG91bGQgYmUgc2hvd24gLSB0aGlzIG9ubHkgd29ya3Mgd2l0aCBhIGZpeGVkIHdpdGggb24gdGhlIGNvbnRhaW5lclxuXHRcdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXMuZWxsaXBzaXNcblx0XHRcdCAqL1xuXHRcdFx0ZWxsaXBzaXNcdFx0OiBmYWxzZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgdGhlIHRyZWUgYmFja2dyb3VuZCBpcyBzdHJpcGVkXG5cdFx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLnRoZW1lcy5zdHJpcGVzXG5cdFx0XHQgKi9cblx0XHRcdHN0cmlwZXNcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBhIHN0cmluZyAob3IgYm9vbGVhbiBgZmFsc2VgKSBzcGVjaWZ5aW5nIHRoZSB0aGVtZSB2YXJpYW50IHRvIHVzZSAoaWYgdGhlIHRoZW1lIHN1cHBvcnRzIHZhcmlhbnRzKVxuXHRcdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXMudmFyaWFudFxuXHRcdFx0ICovXG5cdFx0XHR2YXJpYW50XHRcdFx0OiBmYWxzZSxcblx0XHRcdC8qKlxuXHRcdFx0ICogYSBib29sZWFuIHNwZWNpZnlpbmcgaWYgYSByZXBvbnNpdmUgdmVyc2lvbiBvZiB0aGUgdGhlbWUgc2hvdWxkIGtpY2sgaW4gb24gc21hbGxlciBzY3JlZW5zIChpZiB0aGUgdGhlbWUgc3VwcG9ydHMgaXQpLiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuXHRcdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS50aGVtZXMucmVzcG9uc2l2ZVxuXHRcdFx0ICovXG5cdFx0XHRyZXNwb25zaXZlXHRcdDogZmFsc2Vcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGlmIGxlZnQgYXMgYHRydWVgIGFsbCBwYXJlbnRzIG9mIGFsbCBzZWxlY3RlZCBub2RlcyB3aWxsIGJlIG9wZW5lZCBvbmNlIHRoZSB0cmVlIGxvYWRzIChzbyB0aGF0IGFsbCBzZWxlY3RlZCBub2RlcyBhcmUgdmlzaWJsZSB0byB0aGUgdXNlcilcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmV4cGFuZF9zZWxlY3RlZF9vbmxvYWRcblx0XHQgKi9cblx0XHRleHBhbmRfc2VsZWN0ZWRfb25sb2FkIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBpZiBsZWZ0IGFzIGB0cnVlYCB3ZWIgd29ya2VycyB3aWxsIGJlIHVzZWQgdG8gcGFyc2UgaW5jb21pbmcgSlNPTiBkYXRhIHdoZXJlIHBvc3NpYmxlLCBzbyB0aGF0IHRoZSBVSSB3aWxsIG5vdCBiZSBibG9ja2VkIGJ5IGxhcmdlIHJlcXVlc3RzLiBXb3JrZXJzIGFyZSBob3dldmVyIGFib3V0IDMwJSBzbG93ZXIuIERlZmF1bHRzIHRvIGB0cnVlYFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUud29ya2VyXG5cdFx0ICovXG5cdFx0d29ya2VyIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBGb3JjZSBub2RlIHRleHQgdG8gcGxhaW4gdGV4dCAoYW5kIGVzY2FwZSBIVE1MKS4gRGVmYXVsdHMgdG8gYGZhbHNlYFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUuZm9yY2VfdGV4dFxuXHRcdCAqL1xuXHRcdGZvcmNlX3RleHQgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBTaG91bGQgdGhlIG5vZGUgYmUgdG9nZ2xlZCBpZiB0aGUgdGV4dCBpcyBkb3VibGUgY2xpY2tlZC4gRGVmYXVsdHMgdG8gYHRydWVgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5kYmxjbGlja190b2dnbGVcblx0XHQgKi9cblx0XHRkYmxjbGlja190b2dnbGUgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIFNob3VsZCB0aGUgbG9hZGVkIG5vZGVzIGJlIHBhcnQgb2YgdGhlIHN0YXRlLiBEZWZhdWx0cyB0byBgZmFsc2VgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5sb2FkZWRfc3RhdGVcblx0XHQgKi9cblx0XHRsb2FkZWRfc3RhdGUgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBTaG91bGQgdGhlIGxhc3QgYWN0aXZlIG5vZGUgYmUgZm9jdXNlZCB3aGVuIHRoZSB0cmVlIGNvbnRhaW5lciBpcyBibHVycmVkIGFuZCB0aGUgZm9jdXNlZCBhZ2Fpbi4gVGhpcyBoZWxwcyB3b3JraW5nIHdpdGggc2NyZWVuIHJlYWRlcnMuIERlZmF1bHRzIHRvIGB0cnVlYFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUucmVzdG9yZV9mb2N1c1xuXHRcdCAqL1xuXHRcdHJlc3RvcmVfZm9jdXMgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIEZvcmNlIHRvIGNvbXB1dGUgYW5kIHNldCBcImFyaWEtc2V0c2l6ZVwiIGFuZCBcImFyaWEtcG9zaW5zZXRcIiBleHBsaWNpdGx5IGZvciBlYWNoIHRyZWVpdGVtLiBcblx0XHQgKiBTb21lIGJyb3dzZXJzIG1heSBjb21wdXRlIGluY29ycmVjdCBlbGVtZW50cyBwb3NpdGlvbiBhbmQgcHJvZHVjZSB3cm9uZyBhbm5vdW5jZW1lbnRzIGZvciBzY3JlZW4gcmVhZGVycy4gRGVmYXVsdHMgdG8gYGZhbHNlYFxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvcmUuY29tcHV0ZV9lbGVtZW50c19wb3NpdGlvbnNcblx0XHQgKi9cblx0XHRjb21wdXRlX2VsZW1lbnRzX3Bvc2l0aW9ucyA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIERlZmF1bHQga2V5Ym9hcmQgc2hvcnRjdXRzIChhbiBvYmplY3Qgd2hlcmUgZWFjaCBrZXkgaXMgdGhlIGJ1dHRvbiBuYW1lIG9yIGNvbWJvIC0gbGlrZSAnZW50ZXInLCAnY3RybC1zcGFjZScsICdwJywgZXRjIGFuZCB0aGUgdmFsdWUgaXMgdGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUpXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29yZS5rZXlib2FyZFxuXHRcdCAqL1xuXHRcdGtleWJvYXJkIDoge1xuXHRcdFx0J2N0cmwtc3BhY2UnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBhcmlhIGRlZmluZXMgc3BhY2Ugb25seSB3aXRoIEN0cmxcblx0XHRcdFx0ZS50eXBlID0gXCJjbGlja1wiO1xuXHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkudHJpZ2dlcihlKTtcblx0XHRcdH0sXG5cdFx0XHQnZW50ZXInOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBlbnRlclxuXHRcdFx0XHRlLnR5cGUgPSBcImNsaWNrXCI7XG5cdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKGUpO1xuXHRcdFx0fSxcblx0XHRcdCdsZWZ0JzogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gbGVmdFxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGlmKHRoaXMuaXNfb3BlbihlLmN1cnJlbnRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5jbG9zZV9ub2RlKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dmFyIG8gPSB0aGlzLmdldF9wYXJlbnQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0XHRpZihvICYmIG8uaWQgIT09ICQuanN0cmVlLnJvb3QpIHsgdGhpcy5nZXRfbm9kZShvLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQndXAnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyB1cFxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHZhciBvID0gdGhpcy5nZXRfcHJldl9kb20oZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0aWYobyAmJiBvLmxlbmd0aCkgeyBvLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7IH1cblx0XHRcdH0sXG5cdFx0XHQncmlnaHQnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyByaWdodFxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdGlmKHRoaXMuaXNfY2xvc2VkKGUuY3VycmVudFRhcmdldCkpIHtcblx0XHRcdFx0XHR0aGlzLm9wZW5fbm9kZShlLmN1cnJlbnRUYXJnZXQsIGZ1bmN0aW9uIChvKSB7IHRoaXMuZ2V0X25vZGUobywgdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTsgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZiAodGhpcy5pc19vcGVuKGUuY3VycmVudFRhcmdldCkpIHtcblx0XHRcdFx0XHR2YXIgbyA9IHRoaXMuZ2V0X25vZGUoZS5jdXJyZW50VGFyZ2V0LCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1jaGlsZHJlbicpWzBdO1xuXHRcdFx0XHRcdGlmKG8pIHsgJCh0aGlzLl9maXJzdENoaWxkKG8pKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQnZG93bic6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdC8vIGRvd25cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR2YXIgbyA9IHRoaXMuZ2V0X25leHRfZG9tKGUuY3VycmVudFRhcmdldCk7XG5cdFx0XHRcdGlmKG8gJiYgby5sZW5ndGgpIHsgby5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS50cmlnZ2VyKCdmb2N1cycpOyB9XG5cdFx0XHR9LFxuXHRcdFx0JyonOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBhcmlhIGRlZmluZXMgKiBvbiBudW1wYWQgYXMgb3Blbl9hbGwgLSBub3QgdmVyeSBjb21tb25cblx0XHRcdFx0dGhpcy5vcGVuX2FsbCgpO1xuXHRcdFx0fSxcblx0XHRcdCdob21lJzogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gaG9tZVxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHZhciBvID0gdGhpcy5fZmlyc3RDaGlsZCh0aGlzLmdldF9jb250YWluZXJfdWwoKVswXSk7XG5cdFx0XHRcdGlmKG8pIHsgJChvKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5maWx0ZXIoJzp2aXNpYmxlJykudHJpZ2dlcignZm9jdXMnKTsgfVxuXHRcdFx0fSxcblx0XHRcdCdlbmQnOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHQvLyBlbmRcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS1hbmNob3InKS5maWx0ZXIoJzp2aXNpYmxlJykubGFzdCgpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHR9LFxuXHRcdFx0J2YyJzogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Ly8gZjIgLSBzYWZlIHRvIGluY2x1ZGUgLSBpZiBjaGVja19jYWxsYmFjayBpcyBmYWxzZSBpdCB3aWxsIGZhaWxcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLmVkaXQoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdCQuanN0cmVlLmNvcmUucHJvdG90eXBlID0ge1xuXHRcdC8qKlxuXHRcdCAqIHVzZWQgdG8gZGVjb3JhdGUgYW4gaW5zdGFuY2Ugd2l0aCBhIHBsdWdpbi4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgcGx1Z2luKGRlY28gWywgb3B0c10pXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBkZWNvIHRoZSBwbHVnaW4gdG8gZGVjb3JhdGUgd2l0aFxuXHRcdCAqIEBwYXJhbSAge09iamVjdH0gb3B0cyBvcHRpb25zIGZvciB0aGUgcGx1Z2luXG5cdFx0ICogQHJldHVybiB7anNUcmVlfVxuXHRcdCAqL1xuXHRcdHBsdWdpbiA6IGZ1bmN0aW9uIChkZWNvLCBvcHRzKSB7XG5cdFx0XHR2YXIgQ2hpbGQgPSAkLmpzdHJlZS5wbHVnaW5zW2RlY29dO1xuXHRcdFx0aWYoQ2hpbGQpIHtcblx0XHRcdFx0dGhpcy5fZGF0YVtkZWNvXSA9IHt9O1xuXHRcdFx0XHRDaGlsZC5wcm90b3R5cGUgPSB0aGlzO1xuXHRcdFx0XHRyZXR1cm4gbmV3IENoaWxkKG9wdHMsIHRoaXMpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBpbml0aWFsaXplIHRoZSBpbnN0YW5jZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgaW5pdChlbCwgb3B0b25zKVxuXHRcdCAqIEBwYXJhbSB7RE9NRWxlbWVudHxqUXVlcnl8U3RyaW5nfSBlbCB0aGUgZWxlbWVudCB3ZSBhcmUgdHJhbnNmb3JtaW5nXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucyBmb3IgdGhpcyBpbnN0YW5jZVxuXHRcdCAqIEB0cmlnZ2VyIGluaXQuanN0cmVlLCBsb2FkaW5nLmpzdHJlZSwgbG9hZGVkLmpzdHJlZSwgcmVhZHkuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGluaXQgOiBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuX21vZGVsID0ge1xuXHRcdFx0XHRkYXRhIDoge30sXG5cdFx0XHRcdGNoYW5nZWQgOiBbXSxcblx0XHRcdFx0Zm9yY2VfZnVsbF9yZWRyYXcgOiBmYWxzZSxcblx0XHRcdFx0cmVkcmF3X3RpbWVvdXQgOiBmYWxzZSxcblx0XHRcdFx0ZGVmYXVsdF9zdGF0ZSA6IHtcblx0XHRcdFx0XHRsb2FkZWQgOiB0cnVlLFxuXHRcdFx0XHRcdG9wZW5lZCA6IGZhbHNlLFxuXHRcdFx0XHRcdHNlbGVjdGVkIDogZmFsc2UsXG5cdFx0XHRcdFx0ZGlzYWJsZWQgOiBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XSA9IHtcblx0XHRcdFx0aWQgOiAkLmpzdHJlZS5yb290LFxuXHRcdFx0XHRwYXJlbnQgOiBudWxsLFxuXHRcdFx0XHRwYXJlbnRzIDogW10sXG5cdFx0XHRcdGNoaWxkcmVuIDogW10sXG5cdFx0XHRcdGNoaWxkcmVuX2QgOiBbXSxcblx0XHRcdFx0c3RhdGUgOiB7IGxvYWRlZCA6IGZhbHNlIH1cblx0XHRcdH07XG5cblx0XHRcdHRoaXMuZWxlbWVudCA9ICQoZWwpLmFkZENsYXNzKCdqc3RyZWUganN0cmVlLScgKyB0aGlzLl9pZCk7XG5cdFx0XHR0aGlzLnNldHRpbmdzID0gb3B0aW9ucztcblxuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnJlYWR5ID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUubG9hZGVkID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUucnRsID0gKHRoaXMuZWxlbWVudC5jc3MoXCJkaXJlY3Rpb25cIikgPT09IFwicnRsXCIpO1xuXHRcdFx0dGhpcy5lbGVtZW50W3RoaXMuX2RhdGEuY29yZS5ydGwgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oXCJqc3RyZWUtcnRsXCIpO1xuXHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ3JvbGUnLCd0cmVlJyk7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUubXVsdGlwbGUpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0XHRpZighdGhpcy5lbGVtZW50LmF0dHIoJ3RhYmluZGV4JykpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ3RhYmluZGV4JywnMCcpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmJpbmQoKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIGFsbCBldmVudHMgYXJlIGJvdW5kXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGluaXQuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcihcImluaXRcIik7XG5cblx0XHRcdHRoaXMuX2RhdGEuY29yZS5vcmlnaW5hbF9jb250YWluZXJfaHRtbCA9IHRoaXMuZWxlbWVudC5maW5kKFwiID4gdWwgPiBsaVwiKS5jbG9uZSh0cnVlKTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5vcmlnaW5hbF9jb250YWluZXJfaHRtbFxuXHRcdFx0XHQuZmluZChcImxpXCIpLmFkZEJhY2soKVxuXHRcdFx0XHQuY29udGVudHMoKS5maWx0ZXIoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMubm9kZVR5cGUgPT09IDMgJiYgKCF0aGlzLm5vZGVWYWx1ZSB8fCAvXlxccyskLy50ZXN0KHRoaXMubm9kZVZhbHVlKSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5yZW1vdmUoKTtcblx0XHRcdHRoaXMuZWxlbWVudC5odG1sKFwiPFwiK1widWwgY2xhc3M9J2pzdHJlZS1jb250YWluZXItdWwganN0cmVlLWNoaWxkcmVuJyByb2xlPSdncm91cCc+PFwiK1wibGkgaWQ9J2pcIit0aGlzLl9pZCtcIl9sb2FkaW5nJyBjbGFzcz0nanN0cmVlLWluaXRpYWwtbm9kZSBqc3RyZWUtbG9hZGluZyBqc3RyZWUtbGVhZiBqc3RyZWUtbGFzdCcgcm9sZT0nbm9uZSc+PGkgY2xhc3M9J2pzdHJlZS1pY29uIGpzdHJlZS1vY2wnPjwvaT48XCIrXCJhIGNsYXNzPSdqc3RyZWUtYW5jaG9yJyByb2xlPSd0cmVlaXRlbScgaHJlZj0nIyc+PGkgY2xhc3M9J2pzdHJlZS1pY29uIGpzdHJlZS10aGVtZWljb24taGlkZGVuJz48L2k+XCIgKyB0aGlzLmdldF9zdHJpbmcoXCJMb2FkaW5nIC4uLlwiKSArIFwiPC9hPjwvbGk+PC91bD5cIik7XG5cdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywnaicgKyB0aGlzLl9pZCArICdfbG9hZGluZycpO1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxpX2hlaWdodCA9IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmNoaWxkcmVuKFwibGlcIikuZmlyc3QoKS5vdXRlckhlaWdodCgpIHx8IDI0O1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLm5vZGUgPSB0aGlzLl9jcmVhdGVfcHJvdG90eXBlX25vZGUoKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIHRoZSBsb2FkaW5nIHRleHQgaXMgc2hvd24gYW5kIGJlZm9yZSBsb2FkaW5nIHN0YXJ0c1xuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBsb2FkaW5nLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJsb2FkaW5nXCIpO1xuXHRcdFx0dGhpcy5sb2FkX25vZGUoJC5qc3RyZWUucm9vdCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBkZXN0cm95IGFuIGluc3RhbmNlXG5cdFx0ICogQG5hbWUgZGVzdHJveSgpXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0ga2VlcF9odG1sIGlmIG5vdCBzZXQgdG8gYHRydWVgIHRoZSBjb250YWluZXIgd2lsbCBiZSBlbXB0aWVkLCBvdGhlcndpc2UgdGhlIGN1cnJlbnQgRE9NIGVsZW1lbnRzIHdpbGwgYmUga2VwdCBpbnRhY3Rcblx0XHQgKi9cblx0XHRkZXN0cm95IDogZnVuY3Rpb24gKGtlZXBfaHRtbCkge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgYmVmb3JlIHRoZSB0cmVlIGlzIGRlc3Ryb3llZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBkZXN0cm95LmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoXCJkZXN0cm95XCIpO1xuXHRcdFx0aWYodGhpcy5fd3JrKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0d2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5fd3JrKTtcblx0XHRcdFx0XHR0aGlzLl93cmsgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhdGNoIChpZ25vcmUpIHsgfVxuXHRcdFx0fVxuXHRcdFx0aWYoIWtlZXBfaHRtbCkgeyB0aGlzLmVsZW1lbnQuZW1wdHkoKTsgfVxuXHRcdFx0dGhpcy50ZWFyZG93bigpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlIGEgcHJvdG90eXBlIG5vZGVcblx0XHQgKiBAbmFtZSBfY3JlYXRlX3Byb3RvdHlwZV9ub2RlKClcblx0XHQgKiBAcmV0dXJuIHtET01FbGVtZW50fVxuXHRcdCAqL1xuXHRcdF9jcmVhdGVfcHJvdG90eXBlX25vZGUgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgX25vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdMSScpLCBfdGVtcDEsIF90ZW1wMjtcblx0XHRcdF9ub2RlLnNldEF0dHJpYnV0ZSgncm9sZScsICdub25lJyk7XG5cdFx0XHRfdGVtcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdJJyk7XG5cdFx0XHRfdGVtcDEuY2xhc3NOYW1lID0gJ2pzdHJlZS1pY29uIGpzdHJlZS1vY2wnO1xuXHRcdFx0X3RlbXAxLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcmVzZW50YXRpb24nKTtcblx0XHRcdF9ub2RlLmFwcGVuZENoaWxkKF90ZW1wMSk7XG5cdFx0XHRfdGVtcDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdBJyk7XG5cdFx0XHRfdGVtcDEuY2xhc3NOYW1lID0gJ2pzdHJlZS1hbmNob3InO1xuXHRcdFx0X3RlbXAxLnNldEF0dHJpYnV0ZSgnaHJlZicsJyMnKTtcblx0XHRcdF90ZW1wMS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywnLTEnKTtcblx0XHRcdF90ZW1wMS5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAndHJlZWl0ZW0nKTtcblx0XHRcdF90ZW1wMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0knKTtcblx0XHRcdF90ZW1wMi5jbGFzc05hbWUgPSAnanN0cmVlLWljb24ganN0cmVlLXRoZW1laWNvbic7XG5cdFx0XHRfdGVtcDIuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuXHRcdFx0X3RlbXAxLmFwcGVuZENoaWxkKF90ZW1wMik7XG5cdFx0XHRfbm9kZS5hcHBlbmRDaGlsZChfdGVtcDEpO1xuXHRcdFx0X3RlbXAxID0gX3RlbXAyID0gbnVsbDtcblxuXHRcdFx0cmV0dXJuIF9ub2RlO1xuXHRcdH0sXG5cdFx0X2tiZXZlbnRfdG9fZnVuYyA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHR2YXIga2V5cyA9IHtcblx0XHRcdFx0ODogXCJCYWNrc3BhY2VcIiwgOTogXCJUYWJcIiwgMTM6IFwiRW50ZXJcIiwgMTk6IFwiUGF1c2VcIiwgMjc6IFwiRXNjXCIsXG5cdFx0XHRcdDMyOiBcIlNwYWNlXCIsIDMzOiBcIlBhZ2VVcFwiLCAzNDogXCJQYWdlRG93blwiLCAzNTogXCJFbmRcIiwgMzY6IFwiSG9tZVwiLFxuXHRcdFx0XHQzNzogXCJMZWZ0XCIsIDM4OiBcIlVwXCIsIDM5OiBcIlJpZ2h0XCIsIDQwOiBcIkRvd25cIiwgNDQ6IFwiUHJpbnRcIiwgNDU6IFwiSW5zZXJ0XCIsXG5cdFx0XHRcdDQ2OiBcIkRlbGV0ZVwiLCA5NjogXCJOdW1wYWQwXCIsIDk3OiBcIk51bXBhZDFcIiwgOTg6IFwiTnVtcGFkMlwiLCA5OSA6IFwiTnVtcGFkM1wiLFxuXHRcdFx0XHQxMDA6IFwiTnVtcGFkNFwiLCAxMDE6IFwiTnVtcGFkNVwiLCAxMDI6IFwiTnVtcGFkNlwiLCAxMDM6IFwiTnVtcGFkN1wiLFxuXHRcdFx0XHQxMDQ6IFwiTnVtcGFkOFwiLCAxMDU6IFwiTnVtcGFkOVwiLCAnLTEzJzogXCJOdW1wYWRFbnRlclwiLCAxMTI6IFwiRjFcIixcblx0XHRcdFx0MTEzOiBcIkYyXCIsIDExNDogXCJGM1wiLCAxMTU6IFwiRjRcIiwgMTE2OiBcIkY1XCIsIDExNzogXCJGNlwiLCAxMTg6IFwiRjdcIixcblx0XHRcdFx0MTE5OiBcIkY4XCIsIDEyMDogXCJGOVwiLCAxMjE6IFwiRjEwXCIsIDEyMjogXCJGMTFcIiwgMTIzOiBcIkYxMlwiLCAxNDQ6IFwiTnVtbG9ja1wiLFxuXHRcdFx0XHQxNDU6IFwiU2Nyb2xsbG9ja1wiLCAxNjogJ1NoaWZ0JywgMTc6ICdDdHJsJywgMTg6ICdBbHQnLFxuXHRcdFx0XHQ0ODogJzAnLCAgNDk6ICcxJywgIDUwOiAnMicsICA1MTogJzMnLCAgNTI6ICc0JywgNTM6ICAnNScsXG5cdFx0XHRcdDU0OiAnNicsICA1NTogJzcnLCAgNTY6ICc4JywgIDU3OiAnOScsICA1OTogJzsnLCAgNjE6ICc9JywgNjU6ICAnYScsXG5cdFx0XHRcdDY2OiAnYicsICA2NzogJ2MnLCAgNjg6ICdkJywgIDY5OiAnZScsICA3MDogJ2YnLCAgNzE6ICdnJywgNzI6ICAnaCcsXG5cdFx0XHRcdDczOiAnaScsICA3NDogJ2onLCAgNzU6ICdrJywgIDc2OiAnbCcsICA3NzogJ20nLCAgNzg6ICduJywgNzk6ICAnbycsXG5cdFx0XHRcdDgwOiAncCcsICA4MTogJ3EnLCAgODI6ICdyJywgIDgzOiAncycsICA4NDogJ3QnLCAgODU6ICd1JywgODY6ICAndicsXG5cdFx0XHRcdDg3OiAndycsICA4ODogJ3gnLCAgODk6ICd5JywgIDkwOiAneicsIDEwNzogJysnLCAxMDk6ICctJywgMTEwOiAnLicsXG5cdFx0XHRcdDE4NjogJzsnLCAxODc6ICc9JywgMTg4OiAnLCcsIDE4OTogJy0nLCAxOTA6ICcuJywgMTkxOiAnLycsIDE5MjogJ2AnLFxuXHRcdFx0XHQyMTk6ICdbJywgMjIwOiAnXFxcXCcsMjIxOiAnXScsIDIyMjogXCInXCIsIDExMTogJy8nLCAxMDY6ICcqJywgMTczOiAnLSdcblx0XHRcdH07XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblx0XHRcdGlmIChlLmN0cmxLZXkpIHsgcGFydHMucHVzaCgnY3RybCcpOyB9XG5cdFx0XHRpZiAoZS5hbHRLZXkpIHsgcGFydHMucHVzaCgnYWx0Jyk7IH1cbiAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7IHBhcnRzLnB1c2goJ3NoaWZ0Jyk7IH1cblx0XHRcdHBhcnRzLnB1c2goa2V5c1tlLndoaWNoXSB8fCBlLndoaWNoKTtcbiAgICAgICAgICAgIHBhcnRzID0gcGFydHMuc29ydCgpLmpvaW4oJy0nKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHBhcnRzID09PSAnc2hpZnQtc2hpZnQnIHx8IHBhcnRzID09PSAnY3RybC1jdHJsJyB8fCBwYXJ0cyA9PT0gJ2FsdC1hbHQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cblx0XHRcdHZhciBrYiA9IHRoaXMuc2V0dGluZ3MuY29yZS5rZXlib2FyZCwgaSwgdG1wO1xuXHRcdFx0Zm9yIChpIGluIGtiKSB7XG5cdFx0XHRcdGlmIChrYi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdHRtcCA9IGk7XG5cdFx0XHRcdFx0aWYgKHRtcCAhPT0gJy0nICYmIHRtcCAhPT0gJysnKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSB0bXAucmVwbGFjZSgnLS0nLCAnLU1JTlVTJykucmVwbGFjZSgnKy0nLCAnLU1JTlVTJykucmVwbGFjZSgnKysnLCAnLVBMVVMnKS5yZXBsYWNlKCctKycsICctUExVUycpO1xuXHRcdFx0XHRcdFx0dG1wID0gdG1wLnNwbGl0KC8tfFxcKy8pLnNvcnQoKS5qb2luKCctJykucmVwbGFjZSgnTUlOVVMnLCAnLScpLnJlcGxhY2UoJ1BMVVMnLCAnKycpLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0bXAgPT09IHBhcnRzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ga2JbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHBhcnQgb2YgdGhlIGRlc3Ryb3lpbmcgb2YgYW4gaW5zdGFuY2UuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIHRlYXJkb3duKClcblx0XHQgKi9cblx0XHR0ZWFyZG93biA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMudW5iaW5kKCk7XG5cdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0LnJlbW92ZUNsYXNzKCdqc3RyZWUnKVxuXHRcdFx0XHQucmVtb3ZlRGF0YSgnanN0cmVlJylcblx0XHRcdFx0LmZpbmQoXCJbY2xhc3NePSdqc3RyZWUnXVwiKVxuXHRcdFx0XHRcdC5hZGRCYWNrKClcblx0XHRcdFx0XHQuYXR0cihcImNsYXNzXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuY2xhc3NOYW1lLnJlcGxhY2UoL2pzdHJlZVteIF0qfCQvaWcsJycpOyB9KTtcblx0XHRcdHRoaXMuZWxlbWVudCA9IG51bGw7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBiaW5kIGFsbCBldmVudHMuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGJpbmQoKVxuXHRcdCAqL1xuXHRcdGJpbmQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgd29yZCA9ICcnLFxuXHRcdFx0XHR0b3V0ID0gbnVsbCxcblx0XHRcdFx0d2FzX2NsaWNrID0gMDtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJkYmxjbGljay5qc3RyZWVcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0LnRhZ05hbWUgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0XHRcdGlmKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkpIHtcblx0XHRcdFx0XHRcdFx0ZG9jdW1lbnQuc2VsZWN0aW9uLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0aWYod2luZG93LmdldFNlbGVjdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcblx0XHRcdFx0XHRcdFx0XHRcdHNlbC5jb2xsYXBzZSgpO1xuXHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGlnbm9yZSkgeyB9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQub24oXCJtb3VzZWRvd24uanN0cmVlXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRpZihlLnRhcmdldCA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTsgLy8gcHJldmVudCBsb3NpbmcgZm9jdXMgd2hlbiBjbGlja2luZyBzY3JvbGwgYXJyb3dzIChGRiwgQ2hyb21lKVxuXHRcdFx0XHRcdFx0XHR3YXNfY2xpY2sgPSArKG5ldyBEYXRlKCkpOyAvLyBpZSBkb2VzIG5vdCBhbGxvdyB0byBwcmV2ZW50IGxvc2luZyBmb2N1c1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwibW91c2Vkb3duLmpzdHJlZVwiLCBcIi5qc3RyZWUtb2NsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7IC8vIHByZXZlbnQgYW55IG5vZGUgaW5zaWRlIGZyb20gbG9zaW5nIGZvY3VzIHdoZW4gY2xpY2tpbmcgdGhlIG9wZW4vY2xvc2UgaWNvblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5vbihcImNsaWNrLmpzdHJlZVwiLCBcIi5qc3RyZWUtb2NsXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRvZ2dsZV9ub2RlKGUudGFyZ2V0KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImRibGNsaWNrLmpzdHJlZVwiLCBcIi5qc3RyZWUtYW5jaG9yXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRpZihlLnRhcmdldC50YWdOYW1lICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0XHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUuZGJsY2xpY2tfdG9nZ2xlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMudG9nZ2xlX25vZGUoZS50YXJnZXQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwiY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdGlmKGUuY3VycmVudFRhcmdldCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkgeyAkKGUuY3VycmVudFRhcmdldCkudHJpZ2dlcignZm9jdXMnKTsgfVxuXHRcdFx0XHRcdFx0dGhpcy5hY3RpdmF0ZV9ub2RlKGUuY3VycmVudFRhcmdldCwgZSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oJ2tleWRvd24uanN0cmVlJywgJy5qc3RyZWUtYW5jaG9yJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0LnRhZ05hbWUgJiYgZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcImlucHV0XCIpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS5ydGwpIHtcblx0XHRcdFx0XHRcdFx0aWYoZS53aGljaCA9PT0gMzcpIHsgZS53aGljaCA9IDM5OyB9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYoZS53aGljaCA9PT0gMzkpIHsgZS53aGljaCA9IDM3OyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgZiA9IHRoaXMuX2tiZXZlbnRfdG9fZnVuYyhlKTtcblx0XHRcdFx0XHRcdGlmIChmKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByID0gZi5jYWxsKHRoaXMsIGUpO1xuXHRcdFx0XHRcdFx0XHRpZiAociA9PT0gZmFsc2UgfHwgciA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJsb2FkX25vZGUuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZihkYXRhLnN0YXR1cykge1xuXHRcdFx0XHRcdFx0XHRpZihkYXRhLm5vZGUuaWQgPT09ICQuanN0cmVlLnJvb3QgJiYgIXRoaXMuX2RhdGEuY29yZS5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLl9maXJzdENoaWxkKHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsdGhpcy5fZmlyc3RDaGlsZCh0aGlzLmdldF9jb250YWluZXJfdWwoKVswXSkuaWQpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgdGhlIHJvb3Qgbm9kZSBpcyBsb2FkZWQgZm9yIHRoZSBmaXJzdCB0aW1lXG5cdFx0XHRcdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0XHRcdFx0ICogQG5hbWUgbG9hZGVkLmpzdHJlZVxuXHRcdFx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcihcImxvYWRlZFwiKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZighdGhpcy5fZGF0YS5jb3JlLnJlYWR5KSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuZWxlbWVudCAmJiAhdGhpcy5nZXRfY29udGFpbmVyX3VsKCkuZmluZCgnLmpzdHJlZS1sb2FkaW5nJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5yZWFkeSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUuZXhwYW5kX3NlbGVjdGVkX29ubG9hZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyIHRtcCA9IFtdLCBpLCBqO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAgPSB0bXAuY29uY2F0KHRoaXMuX21vZGVsLmRhdGFbdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkW2ldXS5wYXJlbnRzKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9ICQudmFrYXRhLmFycmF5X3VuaXF1ZSh0bXApO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLm9wZW5fbm9kZSh0bXBbaV0sIGZhbHNlLCAwKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdyZWFkeScsICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciBhbGwgbm9kZXMgYXJlIGZpbmlzaGVkIGxvYWRpbmdcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCAqIEBuYW1lIHJlYWR5LmpzdHJlZVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpLCAwKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Ly8gcXVpY2sgc2VhcmNoaW5nIHdoZW4gdGhlIHRyZWUgaXMgZm9jdXNlZFxuXHRcdFx0XHQub24oJ2tleXByZXNzLmpzdHJlZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRpZihlLnRhcmdldC50YWdOYW1lICYmIGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJpbnB1dFwiKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0XHRcdFx0XHRpZih0b3V0KSB7IGNsZWFyVGltZW91dCh0b3V0KTsgfVxuXHRcdFx0XHRcdFx0dG91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHR3b3JkID0gJyc7XG5cdFx0XHRcdFx0XHR9LCA1MDApO1xuXG5cdFx0XHRcdFx0XHR2YXIgY2hyID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRcdFx0XHRjb2wgPSB0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS1hbmNob3InKS5maWx0ZXIoJzp2aXNpYmxlJyksXG5cdFx0XHRcdFx0XHRcdGluZCA9IGNvbC5pbmRleChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB8fCAwLFxuXHRcdFx0XHRcdFx0XHRlbmQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdHdvcmQgKz0gY2hyO1xuXG5cdFx0XHRcdFx0XHQvLyBtYXRjaCBmb3Igd2hvbGUgd29yZCBmcm9tIGN1cnJlbnQgbm9kZSBkb3duIChpbmNsdWRpbmcgdGhlIGN1cnJlbnQgbm9kZSlcblx0XHRcdFx0XHRcdGlmKHdvcmQubGVuZ3RoID4gMSkge1xuXHRcdFx0XHRcdFx0XHRjb2wuc2xpY2UoaW5kKS5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJCh2KS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdvcmQpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHYpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0aWYoZW5kKSB7IHJldHVybjsgfVxuXG5cdFx0XHRcdFx0XHRcdC8vIG1hdGNoIGZvciB3aG9sZSB3b3JkIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgdHJlZVxuXHRcdFx0XHRcdFx0XHRjb2wuc2xpY2UoMCwgaW5kKS5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJCh2KS50ZXh0KCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHdvcmQpID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQkKHYpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlbmQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0aWYoZW5kKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gbGlzdCBub2RlcyB0aGF0IHN0YXJ0IHdpdGggdGhhdCBsZXR0ZXIgKG9ubHkgaWYgd29yZCBjb25zaXN0cyBvZiBhIHNpbmdsZSBjaGFyKVxuXHRcdFx0XHRcdFx0aWYobmV3IFJlZ0V4cCgnXicgKyBjaHIucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJykgKyAnKyQnKS50ZXN0KHdvcmQpKSB7XG5cdFx0XHRcdFx0XHRcdC8vIHNlYXJjaCBmb3IgdGhlIG5leHQgbm9kZSBzdGFydGluZyB3aXRoIHRoYXQgbGV0dGVyXG5cdFx0XHRcdFx0XHRcdGNvbC5zbGljZShpbmQgKyAxKS5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJCh2KS50ZXh0KCkudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09IGNocikge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCh2KS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0XHRcdGlmKGVuZCkgeyByZXR1cm47IH1cblxuXHRcdFx0XHRcdFx0XHQvLyBzZWFyY2ggZnJvbSB0aGUgYmVnaW5uaW5nXG5cdFx0XHRcdFx0XHRcdGNvbC5zbGljZSgwLCBpbmQgKyAxKS5lYWNoKGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJCh2KS50ZXh0KCkudG9Mb3dlckNhc2UoKS5jaGFyQXQoMCkgPT09IGNocikge1xuXHRcdFx0XHRcdFx0XHRcdFx0JCh2KS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZW5kID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0XHRcdGlmKGVuZCkgeyByZXR1cm47IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC8vIFRIRU1FIFJFTEFURURcblx0XHRcdFx0Lm9uKFwiaW5pdC5qc3RyZWVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dmFyIHMgPSB0aGlzLnNldHRpbmdzLmNvcmUudGhlbWVzO1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5kb3RzXHRcdFx0PSBzLmRvdHM7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnN0cmlwZXNcdFx0PSBzLnN0cmlwZXM7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmljb25zXHRcdD0gcy5pY29ucztcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZWxsaXBzaXNcdFx0PSBzLmVsbGlwc2lzO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRfdGhlbWUocy5uYW1lIHx8IFwiZGVmYXVsdFwiLCBzLnVybCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldF90aGVtZV92YXJpYW50KHMudmFyaWFudCk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJsb2FkaW5nLmpzdHJlZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0aGlzWyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHMgPyBcInNob3dfZG90c1wiIDogXCJoaWRlX2RvdHNcIiBdKCk7XG5cdFx0XHRcdFx0XHR0aGlzWyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmljb25zID8gXCJzaG93X2ljb25zXCIgOiBcImhpZGVfaWNvbnNcIiBdKCk7XG5cdFx0XHRcdFx0XHR0aGlzWyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnN0cmlwZXMgPyBcInNob3dfc3RyaXBlc1wiIDogXCJoaWRlX3N0cmlwZXNcIiBdKCk7XG5cdFx0XHRcdFx0XHR0aGlzWyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmVsbGlwc2lzID8gXCJzaG93X2VsbGlwc2lzXCIgOiBcImhpZGVfZWxsaXBzaXNcIiBdKCk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oJ2JsdXIuanN0cmVlJywgJy5qc3RyZWUtYW5jaG9yJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID0gbnVsbDtcblx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5maWx0ZXIoJy5qc3RyZWUtaG92ZXJlZCcpLnRyaWdnZXIoJ21vdXNlbGVhdmUnKTtcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5hdHRyKCd0YWJpbmRleCcsICcwJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oJ2ZvY3VzLmpzdHJlZScsICcuanN0cmVlLWFuY2hvcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gdGhpcy5nZXRfbm9kZShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5pZCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IHRtcC5pZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLWhvdmVyZWQnKS5ub3QoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKCdtb3VzZWxlYXZlJyk7XG5cdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkudHJpZ2dlcignbW91c2VlbnRlcicpO1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ3RhYmluZGV4JywgJy0xJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oJ2ZvY3VzLmpzdHJlZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmKCsobmV3IERhdGUoKSkgLSB3YXNfY2xpY2sgPiA1MDAgJiYgIXRoaXMuX2RhdGEuY29yZS5mb2N1c2VkICYmIHRoaXMuc2V0dGluZ3MuY29yZS5yZXN0b3JlX2ZvY3VzKSB7XG5cdFx0XHRcdFx0XHRcdHdhc19jbGljayA9IDA7XG5cdFx0XHRcdFx0XHRcdHZhciBhY3QgPSB0aGlzLmdldF9ub2RlKHRoaXMuZWxlbWVudC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnKSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdGlmKGFjdCkge1xuXHRcdFx0XHRcdFx0XHRcdGFjdC5maW5kKCc+IC5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKCdtb3VzZWVudGVyLmpzdHJlZScsICcuanN0cmVlLWFuY2hvcicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmhvdmVyX25vZGUoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbignbW91c2VsZWF2ZS5qc3RyZWUnLCAnLmpzdHJlZS1hbmNob3InLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5kZWhvdmVyX25vZGUoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcGFydCBvZiB0aGUgZGVzdHJveWluZyBvZiBhbiBpbnN0YW5jZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgdW5iaW5kKClcblx0XHQgKi9cblx0XHR1bmJpbmQgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnQub2ZmKCcuanN0cmVlJyk7XG5cdFx0XHQkKGRvY3VtZW50KS5vZmYoJy5qc3RyZWUtJyArIHRoaXMuX2lkKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHRyaWdnZXIgYW4gZXZlbnQuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIHRyaWdnZXIoZXYgWywgZGF0YV0pXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBldiB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgdG8gdHJpZ2dlclxuXHRcdCAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBhZGRpdGlvbmFsIGRhdGEgdG8gcGFzcyB3aXRoIHRoZSBldmVudFxuXHRcdCAqL1xuXHRcdHRyaWdnZXIgOiBmdW5jdGlvbiAoZXYsIGRhdGEpIHtcblx0XHRcdGlmKCFkYXRhKSB7XG5cdFx0XHRcdGRhdGEgPSB7fTtcblx0XHRcdH1cblx0XHRcdGRhdGEuaW5zdGFuY2UgPSB0aGlzO1xuXHRcdFx0dGhpcy5lbGVtZW50LnRyaWdnZXJIYW5kbGVyKGV2LnJlcGxhY2UoJy5qc3RyZWUnLCcnKSArICcuanN0cmVlJywgZGF0YSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZXR1cm5zIHRoZSBqUXVlcnkgZXh0ZW5kZWQgaW5zdGFuY2UgY29udGFpbmVyXG5cdFx0ICogQG5hbWUgZ2V0X2NvbnRhaW5lcigpXG5cdFx0ICogQHJldHVybiB7alF1ZXJ5fVxuXHRcdCAqL1xuXHRcdGdldF9jb250YWluZXIgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50O1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmV0dXJucyB0aGUgalF1ZXJ5IGV4dGVuZGVkIG1haW4gVUwgbm9kZSBpbnNpZGUgdGhlIGluc3RhbmNlIGNvbnRhaW5lci4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgZ2V0X2NvbnRhaW5lcl91bCgpXG5cdFx0ICogQHJldHVybiB7alF1ZXJ5fVxuXHRcdCAqL1xuXHRcdGdldF9jb250YWluZXJfdWwgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5lbGVtZW50LmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5maXJzdCgpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0cyBzdHJpbmcgcmVwbGFjZW1lbnRzIChsb2NhbGl6YXRpb24pLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBnZXRfc3RyaW5nKGtleSlcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGtleVxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfc3RyaW5nIDogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0dmFyIGEgPSB0aGlzLnNldHRpbmdzLmNvcmUuc3RyaW5ncztcblx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKGEpKSB7IHJldHVybiBhLmNhbGwodGhpcywga2V5KTsgfVxuXHRcdFx0aWYoYSAmJiBhW2tleV0pIHsgcmV0dXJuIGFba2V5XTsgfVxuXHRcdFx0cmV0dXJuIGtleTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldHMgdGhlIGZpcnN0IGNoaWxkIG9mIGEgRE9NIG5vZGUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9maXJzdENoaWxkKGRvbSlcblx0XHQgKiBAcGFyYW0gIHtET01FbGVtZW50fSBkb21cblx0XHQgKiBAcmV0dXJuIHtET01FbGVtZW50fVxuXHRcdCAqL1xuXHRcdF9maXJzdENoaWxkIDogZnVuY3Rpb24gKGRvbSkge1xuXHRcdFx0ZG9tID0gZG9tID8gZG9tLmZpcnN0Q2hpbGQgOiBudWxsO1xuXHRcdFx0d2hpbGUoZG9tICE9PSBudWxsICYmIGRvbS5ub2RlVHlwZSAhPT0gMSkge1xuXHRcdFx0XHRkb20gPSBkb20ubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZG9tO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0cyB0aGUgbmV4dCBzaWJsaW5nIG9mIGEgRE9NIG5vZGUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9uZXh0U2libGluZyhkb20pXG5cdFx0ICogQHBhcmFtICB7RE9NRWxlbWVudH0gZG9tXG5cdFx0ICogQHJldHVybiB7RE9NRWxlbWVudH1cblx0XHQgKi9cblx0XHRfbmV4dFNpYmxpbmcgOiBmdW5jdGlvbiAoZG9tKSB7XG5cdFx0XHRkb20gPSBkb20gPyBkb20ubmV4dFNpYmxpbmcgOiBudWxsO1xuXHRcdFx0d2hpbGUoZG9tICE9PSBudWxsICYmIGRvbS5ub2RlVHlwZSAhPT0gMSkge1xuXHRcdFx0XHRkb20gPSBkb20ubmV4dFNpYmxpbmc7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZG9tO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0cyB0aGUgcHJldmlvdXMgc2libGluZyBvZiBhIERPTSBub2RlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfcHJldmlvdXNTaWJsaW5nKGRvbSlcblx0XHQgKiBAcGFyYW0gIHtET01FbGVtZW50fSBkb21cblx0XHQgKiBAcmV0dXJuIHtET01FbGVtZW50fVxuXHRcdCAqL1xuXHRcdF9wcmV2aW91c1NpYmxpbmcgOiBmdW5jdGlvbiAoZG9tKSB7XG5cdFx0XHRkb20gPSBkb20gPyBkb20ucHJldmlvdXNTaWJsaW5nIDogbnVsbDtcblx0XHRcdHdoaWxlKGRvbSAhPT0gbnVsbCAmJiBkb20ubm9kZVR5cGUgIT09IDEpIHtcblx0XHRcdFx0ZG9tID0gZG9tLnByZXZpb3VzU2libGluZztcblx0XHRcdH1cblx0XHRcdHJldHVybiBkb207XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgdGhlIEpTT04gcmVwcmVzZW50YXRpb24gb2YgYSBub2RlIChvciB0aGUgYWN0dWFsIGpRdWVyeSBleHRlbmRlZCBET00gbm9kZSkgYnkgdXNpbmcgYW55IGlucHV0IChjaGlsZCBET00gZWxlbWVudCwgSUQgc3RyaW5nLCBzZWxlY3RvciwgZXRjKVxuXHRcdCAqIEBuYW1lIGdldF9ub2RlKG9iaiBbLCBhc19kb21dKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBhc19kb21cblx0XHQgKiBAcmV0dXJuIHtPYmplY3R8alF1ZXJ5fVxuXHRcdCAqL1xuXHRcdGdldF9ub2RlIDogZnVuY3Rpb24gKG9iaiwgYXNfZG9tKSB7XG5cdFx0XHRpZihvYmogJiYgb2JqLmlkKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5pZDtcblx0XHRcdH1cblx0XHRcdGlmIChvYmogaW5zdGFuY2VvZiAkICYmIG9iai5sZW5ndGggJiYgb2JqWzBdLmlkKSB7XG5cdFx0XHRcdG9iaiA9IG9ialswXS5pZDtcblx0XHRcdH1cblx0XHRcdHZhciBkb207XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW29ial0pIHtcblx0XHRcdFx0XHRvYmogPSB0aGlzLl9tb2RlbC5kYXRhW29ial07XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSBpZih0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiICYmIHRoaXMuX21vZGVsLmRhdGFbb2JqLnJlcGxhY2UoL14jLywgJycpXSkge1xuXHRcdFx0XHRcdG9iaiA9IHRoaXMuX21vZGVsLmRhdGFbb2JqLnJlcGxhY2UoL14jLywgJycpXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIgJiYgKGRvbSA9ICQoJyMnICsgb2JqLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyksIHRoaXMuZWxlbWVudCkpLmxlbmd0aCAmJiB0aGlzLl9tb2RlbC5kYXRhW2RvbS5jbG9zZXN0KCcuanN0cmVlLW5vZGUnKS5hdHRyKCdpZCcpXSkge1xuXHRcdFx0XHRcdG9iaiA9IHRoaXMuX21vZGVsLmRhdGFbZG9tLmNsb3Nlc3QoJy5qc3RyZWUtbm9kZScpLmF0dHIoJ2lkJyldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKGRvbSA9IHRoaXMuZWxlbWVudC5maW5kKG9iaikpLmxlbmd0aCAmJiB0aGlzLl9tb2RlbC5kYXRhW2RvbS5jbG9zZXN0KCcuanN0cmVlLW5vZGUnKS5hdHRyKCdpZCcpXSkge1xuXHRcdFx0XHRcdG9iaiA9IHRoaXMuX21vZGVsLmRhdGFbZG9tLmNsb3Nlc3QoJy5qc3RyZWUtbm9kZScpLmF0dHIoJ2lkJyldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYoKGRvbSA9IHRoaXMuZWxlbWVudC5maW5kKG9iaikpLmxlbmd0aCAmJiBkb20uaGFzQ2xhc3MoJ2pzdHJlZScpKSB7XG5cdFx0XHRcdFx0b2JqID0gdGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihhc19kb20pIHtcblx0XHRcdFx0XHRvYmogPSBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QgPyB0aGlzLmVsZW1lbnQgOiAkKCcjJyArIG9iai5pZC5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpLCB0aGlzLmVsZW1lbnQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBvYmo7XG5cdFx0XHR9IGNhdGNoIChleCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgcGF0aCB0byBhIG5vZGUsIGVpdGhlciBjb25zaXN0aW5nIG9mIG5vZGUgdGV4dHMsIG9yIG9mIG5vZGUgSURzLCBvcHRpb25hbGx5IGdsdWVkIHRvZ2V0aGVyIChvdGhlcndpc2UgYW4gYXJyYXkpXG5cdFx0ICogQG5hbWUgZ2V0X3BhdGgob2JqIFssIGdsdWUsIGlkc10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gZ2x1ZSBpZiB5b3Ugd2FudCB0aGUgcGF0aCBhcyBhIHN0cmluZyAtIHBhc3MgdGhlIGdsdWUgaGVyZSAoZm9yIGV4YW1wbGUgJy8nKSwgaWYgYSBmYWxzeSB2YWx1ZSBpcyBzdXBwbGllZCBoZXJlLCBhbiBhcnJheSBpcyByZXR1cm5lZFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IGlkcyBpZiBzZXQgdG8gdHJ1ZSBidWlsZCB0aGUgcGF0aCB1c2luZyBJRCwgb3RoZXJ3aXNlIG5vZGUgdGV4dCBpcyB1c2VkXG5cdFx0ICogQHJldHVybiB7bWl4ZWR9XG5cdFx0ICovXG5cdFx0Z2V0X3BhdGggOiBmdW5jdGlvbiAob2JqLCBnbHVlLCBpZHMpIHtcblx0XHRcdG9iaiA9IG9iai5wYXJlbnRzID8gb2JqIDogdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QgfHwgIW9iai5wYXJlbnRzKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBpLCBqLCBwID0gW107XG5cdFx0XHRwLnB1c2goaWRzID8gb2JqLmlkIDogb2JqLnRleHQpO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHAucHVzaChpZHMgPyBvYmoucGFyZW50c1tpXSA6IHRoaXMuZ2V0X3RleHQob2JqLnBhcmVudHNbaV0pKTtcblx0XHRcdH1cblx0XHRcdHAgPSBwLnJldmVyc2UoKS5zbGljZSgxKTtcblx0XHRcdHJldHVybiBnbHVlID8gcC5qb2luKGdsdWUpIDogcDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgbmV4dCB2aXNpYmxlIG5vZGUgdGhhdCBpcyBiZWxvdyB0aGUgYG9iamAgbm9kZS4gSWYgYHN0cmljdGAgaXMgc2V0IHRvIGB0cnVlYCBvbmx5IHNpYmxpbmcgbm9kZXMgYXJlIHJldHVybmVkLlxuXHRcdCAqIEBuYW1lIGdldF9uZXh0X2RvbShvYmogWywgc3RyaWN0XSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gc3RyaWN0XG5cdFx0ICogQHJldHVybiB7alF1ZXJ5fVxuXHRcdCAqL1xuXHRcdGdldF9uZXh0X2RvbSA6IGZ1bmN0aW9uIChvYmosIHN0cmljdCkge1xuXHRcdFx0dmFyIHRtcDtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKG9ialswXSA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuX2ZpcnN0Q2hpbGQodGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0pO1xuXHRcdFx0XHR3aGlsZSAodG1wICYmIHRtcC5vZmZzZXRIZWlnaHQgPT09IDApIHtcblx0XHRcdFx0XHR0bXAgPSB0aGlzLl9uZXh0U2libGluZyh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0bXAgPyAkKHRtcCkgOiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoc3RyaWN0KSB7XG5cdFx0XHRcdHRtcCA9IG9ialswXTtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHRtcCA9IHRoaXMuX25leHRTaWJsaW5nKHRtcCk7XG5cdFx0XHRcdH0gd2hpbGUgKHRtcCAmJiB0bXAub2Zmc2V0SGVpZ2h0ID09PSAwKTtcblx0XHRcdFx0cmV0dXJuIHRtcCA/ICQodG1wKSA6IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYob2JqLmhhc0NsYXNzKFwianN0cmVlLW9wZW5cIikpIHtcblx0XHRcdFx0dG1wID0gdGhpcy5fZmlyc3RDaGlsZChvYmouY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKVswXSk7XG5cdFx0XHRcdHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHRcdHRtcCA9IHRoaXMuX25leHRTaWJsaW5nKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodG1wICE9PSBudWxsKSB7XG5cdFx0XHRcdFx0cmV0dXJuICQodG1wKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gb2JqWzBdO1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHR0bXAgPSB0aGlzLl9uZXh0U2libGluZyh0bXApO1xuXHRcdFx0fSB3aGlsZSAodG1wICYmIHRtcC5vZmZzZXRIZWlnaHQgPT09IDApO1xuXHRcdFx0aWYodG1wICE9PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiAkKHRtcCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqLnBhcmVudHNVbnRpbChcIi5qc3RyZWVcIixcIi5qc3RyZWUtbm9kZVwiKS5uZXh0QWxsKFwiLmpzdHJlZS1ub2RlOnZpc2libGVcIikuZmlyc3QoKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgcHJldmlvdXMgdmlzaWJsZSBub2RlIHRoYXQgaXMgYWJvdmUgdGhlIGBvYmpgIG5vZGUuIElmIGBzdHJpY3RgIGlzIHNldCB0byBgdHJ1ZWAgb25seSBzaWJsaW5nIG5vZGVzIGFyZSByZXR1cm5lZC5cblx0XHQgKiBAbmFtZSBnZXRfcHJldl9kb20ob2JqIFssIHN0cmljdF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IHN0cmljdFxuXHRcdCAqIEByZXR1cm4ge2pRdWVyeX1cblx0XHQgKi9cblx0XHRnZXRfcHJldl9kb20gOiBmdW5jdGlvbiAob2JqLCBzdHJpY3QpIHtcblx0XHRcdHZhciB0bXA7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZihvYmpbMF0gPT09IHRoaXMuZWxlbWVudFswXSkge1xuXHRcdFx0XHR0bXAgPSB0aGlzLmdldF9jb250YWluZXJfdWwoKVswXS5sYXN0Q2hpbGQ7XG5cdFx0XHRcdHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCkge1xuXHRcdFx0XHRcdHRtcCA9IHRoaXMuX3ByZXZpb3VzU2libGluZyh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0bXAgPyAkKHRtcCkgOiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoc3RyaWN0KSB7XG5cdFx0XHRcdHRtcCA9IG9ialswXTtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdHRtcCA9IHRoaXMuX3ByZXZpb3VzU2libGluZyh0bXApO1xuXHRcdFx0XHR9IHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCk7XG5cdFx0XHRcdHJldHVybiB0bXAgPyAkKHRtcCkgOiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRtcCA9IG9ialswXTtcblx0XHRcdGRvIHtcblx0XHRcdFx0dG1wID0gdGhpcy5fcHJldmlvdXNTaWJsaW5nKHRtcCk7XG5cdFx0XHR9IHdoaWxlICh0bXAgJiYgdG1wLm9mZnNldEhlaWdodCA9PT0gMCk7XG5cdFx0XHRpZih0bXAgIT09IG51bGwpIHtcblx0XHRcdFx0b2JqID0gJCh0bXApO1xuXHRcdFx0XHR3aGlsZShvYmouaGFzQ2xhc3MoXCJqc3RyZWUtb3BlblwiKSkge1xuXHRcdFx0XHRcdG9iaiA9IG9iai5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuZmlyc3QoKS5jaGlsZHJlbihcIi5qc3RyZWUtbm9kZTp2aXNpYmxlOmxhc3RcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdH1cblx0XHRcdHRtcCA9IG9ialswXS5wYXJlbnROb2RlLnBhcmVudE5vZGU7XG5cdFx0XHRyZXR1cm4gdG1wICYmIHRtcC5jbGFzc05hbWUgJiYgdG1wLmNsYXNzTmFtZS5pbmRleE9mKCdqc3RyZWUtbm9kZScpICE9PSAtMSA/ICQodG1wKSA6IGZhbHNlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBwYXJlbnQgSUQgb2YgYSBub2RlXG5cdFx0ICogQG5hbWUgZ2V0X3BhcmVudChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfcGFyZW50IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iai5wYXJlbnQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgYSBqUXVlcnkgY29sbGVjdGlvbiBvZiBhbGwgdGhlIGNoaWxkcmVuIG9mIGEgbm9kZSAobm9kZSBtdXN0IGJlIHJlbmRlcmVkKSwgcmV0dXJucyBmYWxzZSBvbiBlcnJvclxuXHRcdCAqIEBuYW1lIGdldF9jaGlsZHJlbl9kb20ob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtqUXVlcnl9XG5cdFx0ICovXG5cdFx0Z2V0X2NoaWxkcmVuX2RvbSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKG9ialswXSA9PT0gdGhpcy5lbGVtZW50WzBdKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmdldF9jb250YWluZXJfdWwoKS5jaGlsZHJlbihcIi5qc3RyZWUtbm9kZVwiKTtcblx0XHRcdH1cblx0XHRcdGlmKCFvYmogfHwgIW9iai5sZW5ndGgpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG9iai5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuY2hpbGRyZW4oXCIuanN0cmVlLW5vZGVcIik7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVja3MgaWYgYSBub2RlIGhhcyBjaGlsZHJlblxuXHRcdCAqIEBuYW1lIGlzX3BhcmVudChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfcGFyZW50IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiAob2JqLnN0YXRlLmxvYWRlZCA9PT0gZmFsc2UgfHwgb2JqLmNoaWxkcmVuLmxlbmd0aCA+IDApO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2tzIGlmIGEgbm9kZSBpcyBsb2FkZWQgKGl0cyBjaGlsZHJlbiBhcmUgYXZhaWxhYmxlKVxuXHRcdCAqIEBuYW1lIGlzX2xvYWRlZChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfbG9hZGVkIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiBvYmouc3RhdGUubG9hZGVkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2sgaWYgYSBub2RlIGlzIGN1cnJlbnRseSBsb2FkaW5nIChmZXRjaGluZyBjaGlsZHJlbilcblx0XHQgKiBAbmFtZSBpc19sb2FkaW5nKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRpc19sb2FkaW5nIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiBvYmouc3RhdGUgJiYgb2JqLnN0YXRlLmxvYWRpbmc7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVjayBpZiBhIG5vZGUgaXMgb3BlbmVkXG5cdFx0ICogQG5hbWUgaXNfb3BlbihvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfb3BlbiA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHJldHVybiBvYmogJiYgb2JqLnN0YXRlLm9wZW5lZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrIGlmIGEgbm9kZSBpcyBpbiBhIGNsb3NlZCBzdGF0ZVxuXHRcdCAqIEBuYW1lIGlzX2Nsb3NlZChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfY2xvc2VkIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiB0aGlzLmlzX3BhcmVudChvYmopICYmICFvYmouc3RhdGUub3BlbmVkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2sgaWYgYSBub2RlIGhhcyBubyBjaGlsZHJlblxuXHRcdCAqIEBuYW1lIGlzX2xlYWYob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGlzX2xlYWYgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRyZXR1cm4gIXRoaXMuaXNfcGFyZW50KG9iaik7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBsb2FkcyBhIG5vZGUgKGZldGNoZXMgaXRzIGNoaWxkcmVuIHVzaW5nIHRoZSBgY29yZS5kYXRhYCBzZXR0aW5nKS4gTXVsdGlwbGUgbm9kZXMgY2FuIGJlIHBhc3NlZCB0byBieSB1c2luZyBhbiBhcnJheS5cblx0XHQgKiBAbmFtZSBsb2FkX25vZGUob2JqIFssIGNhbGxiYWNrXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHBhcmFtICB7ZnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gYmUgZXhlY3V0ZWQgb25jZSBsb2FkaW5nIGlzIGNvbXBsZXRlLCB0aGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgYW5kIHJlY2VpdmVzIHR3byBhcmd1bWVudHMgLSB0aGUgbm9kZSBhbmQgYSBib29sZWFuIHN0YXR1c1xuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICogQHRyaWdnZXIgbG9hZF9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGxvYWRfbm9kZSA6IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaywgbCwgaSwgaiwgYztcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0dGhpcy5fbG9hZF9ub2RlcyhvYmouc2xpY2UoKSwgY2FsbGJhY2spO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmopIHtcblx0XHRcdFx0aWYoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBvYmosIGZhbHNlKTsgfVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHQvLyBpZihvYmouc3RhdGUubG9hZGluZykgeyB9IC8vIHRoZSBub2RlIGlzIGFscmVhZHkgbG9hZGluZyAtIGp1c3Qgd2FpdCBmb3IgaXQgdG8gbG9hZCBhbmQgaW52b2tlIGNhbGxiYWNrPyBidXQgaWYgY2FsbGVkIGltcGxpY2l0bHkgaXQgc2hvdWxkIGJlIGxvYWRlZCBhZ2Fpbj9cblx0XHRcdGlmKG9iai5zdGF0ZS5sb2FkZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLmxvYWRlZCA9IGZhbHNlO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmoucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gJC52YWthdGEuYXJyYXlfZmlsdGVyKHRoaXMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QsIGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gJC5pbkFycmF5KHYsIG9iai5jaGlsZHJlbl9kKSA9PT0gLTE7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtrXV0uc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdGMgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtrXV07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGMpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV9maWx0ZXIodGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCBmdW5jdGlvbiAodikge1xuXHRcdFx0XHRcdFx0cmV0dXJuICQuaW5BcnJheSh2LCBvYmouY2hpbGRyZW5fZCkgPT09IC0xO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9iai5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0XHRvYmouY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0XHRpZihjKSB7XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdsb2FkX25vZGUnLCAnbm9kZScgOiBvYmosICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG9iai5zdGF0ZS5mYWlsZWQgPSBmYWxzZTtcblx0XHRcdG9iai5zdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKS5hZGRDbGFzcyhcImpzdHJlZS1sb2FkaW5nXCIpLmF0dHIoJ2FyaWEtYnVzeScsdHJ1ZSk7XG5cdFx0XHR0aGlzLl9sb2FkX25vZGUob2JqLCBmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRcdG9iaiA9IHRoaXMuX21vZGVsLmRhdGFbb2JqLmlkXTtcblx0XHRcdFx0b2JqLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0b2JqLnN0YXRlLmxvYWRlZCA9IHN0YXR1cztcblx0XHRcdFx0b2JqLnN0YXRlLmZhaWxlZCA9ICFvYmouc3RhdGUubG9hZGVkO1xuXHRcdFx0XHR2YXIgZG9tID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLCBpID0gMCwgaiA9IDAsIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBoYXNfY2hpbGRyZW4gPSBmYWxzZTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKG1bb2JqLmNoaWxkcmVuW2ldXSAmJiAhbVtvYmouY2hpbGRyZW5baV1dLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRcdFx0aGFzX2NoaWxkcmVuID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihvYmouc3RhdGUubG9hZGVkICYmIGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKCdqc3RyZWUtY2xvc2VkIGpzdHJlZS1vcGVuIGpzdHJlZS1sZWFmJyk7XG5cdFx0XHRcdFx0aWYgKCFoYXNfY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRcdGRvbS5hZGRDbGFzcygnanN0cmVlLWxlYWYnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAob2JqLmlkICE9PSAnIycpIHtcblx0XHRcdFx0XHRcdFx0ZG9tLmFkZENsYXNzKG9iai5zdGF0ZS5vcGVuZWQgPyAnanN0cmVlLW9wZW4nIDogJ2pzdHJlZS1jbG9zZWQnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKFwianN0cmVlLWxvYWRpbmdcIikuYXR0cignYXJpYS1idXN5JyxmYWxzZSk7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgYSBub2RlIGlzIGxvYWRlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgbG9hZF9ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgbm9kZSB0aGF0IHdhcyBsb2FkaW5nXG5cdFx0XHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3RhdHVzIHdhcyB0aGUgbm9kZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2xvYWRfbm9kZScsIHsgXCJub2RlXCIgOiBvYmosIFwic3RhdHVzXCIgOiBzdGF0dXMgfSk7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBvYmosIHN0YXR1cyk7XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGxvYWQgYW4gYXJyYXkgb2Ygbm9kZXMgKHdpbGwgYWxzbyBsb2FkIHVuYXZhaWxhYmxlIG5vZGVzIGFzIHNvb24gYXMgdGhleSBhcHBlYXIgaW4gdGhlIHN0cnVjdHVyZSkuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9sb2FkX25vZGVzKG5vZGVzIFssIGNhbGxiYWNrXSlcblx0XHQgKiBAcGFyYW0gIHthcnJheX0gbm9kZXNcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUsIHRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSBhbmQgcmVjZWl2ZXMgb25lIGFyZ3VtZW50IC0gdGhlIGFycmF5IHBhc3NlZCB0byBfbG9hZF9ub2Rlc1xuXHRcdCAqL1xuXHRcdF9sb2FkX25vZGVzIDogZnVuY3Rpb24gKG5vZGVzLCBjYWxsYmFjaywgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbG9hZCkge1xuXHRcdFx0dmFyIHIgPSB0cnVlLFxuXHRcdFx0XHRjID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9sb2FkX25vZGVzKG5vZGVzLCBjYWxsYmFjaywgdHJ1ZSk7IH0sXG5cdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBpLCBqLCB0bXAgPSBbXTtcblx0XHRcdGZvcihpID0gMCwgaiA9IG5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZihtW25vZGVzW2ldXSAmJiAoICghbVtub2Rlc1tpXV0uc3RhdGUubG9hZGVkICYmICFtW25vZGVzW2ldXS5zdGF0ZS5mYWlsZWQpIHx8ICghaXNfY2FsbGJhY2sgJiYgZm9yY2VfcmVsb2FkKSApKSB7XG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNfbG9hZGluZyhub2Rlc1tpXSkpIHtcblx0XHRcdFx0XHRcdHRoaXMubG9hZF9ub2RlKG5vZGVzW2ldLCBjKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ciA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihyKSB7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKG1bbm9kZXNbaV1dICYmIG1bbm9kZXNbaV1dLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0dG1wLnB1c2gobm9kZXNbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZihjYWxsYmFjayAmJiAhY2FsbGJhY2suZG9uZSkge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgdG1wKTtcblx0XHRcdFx0XHRjYWxsYmFjay5kb25lID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogbG9hZHMgYWxsIHVubG9hZGVkIG5vZGVzXG5cdFx0ICogQG5hbWUgbG9hZF9hbGwoW29iaiwgY2FsbGJhY2tdKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBsb2FkIHJlY3Vyc2l2ZWx5LCBvbWl0IHRvIGxvYWQgYWxsIG5vZGVzIGluIHRoZSB0cmVlXG5cdFx0ICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbmNlIGxvYWRpbmcgYWxsIHRoZSBub2RlcyBpcyBjb21wbGV0ZSxcblx0XHQgKiBAdHJpZ2dlciBsb2FkX2FsbC5qc3RyZWVcblx0XHQgKi9cblx0XHRsb2FkX2FsbCA6IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrKSB7XG5cdFx0XHRpZighb2JqKSB7IG9iaiA9ICQuanN0cmVlLnJvb3Q7IH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgdG9fbG9hZCA9IFtdLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0YyA9IG1bb2JqLmlkXS5jaGlsZHJlbl9kLFxuXHRcdFx0XHRpLCBqO1xuXHRcdFx0aWYob2JqLnN0YXRlICYmICFvYmouc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdHRvX2xvYWQucHVzaChvYmouaWQpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKGkgPSAwLCBqID0gYy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYobVtjW2ldXSAmJiBtW2NbaV1dLnN0YXRlICYmICFtW2NbaV1dLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRcdHRvX2xvYWQucHVzaChjW2ldKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYodG9fbG9hZC5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5fbG9hZF9ub2Rlcyh0b19sb2FkLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy5sb2FkX2FsbChvYmosIGNhbGxiYWNrKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciBhIGxvYWRfYWxsIGNhbGwgY29tcGxldGVzXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBsb2FkX2FsbC5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIHJlY3Vyc2l2ZWx5IGxvYWRlZCBub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRpZihjYWxsYmFjaykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIG9iaik7IH1cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdsb2FkX2FsbCcsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoYW5kbGVzIHRoZSBhY3R1YWwgbG9hZGluZyBvZiBhIG5vZGUuIFVzZWQgb25seSBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX2xvYWRfbm9kZShvYmogWywgY2FsbGJhY2tdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gY2FsbGJhY2sgYSBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBvbmNlIGxvYWRpbmcgaXMgY29tcGxldGUsIHRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBpbiB0aGUgaW5zdGFuY2UncyBzY29wZSBhbmQgcmVjZWl2ZXMgb25lIGFyZ3VtZW50IC0gYSBib29sZWFuIHN0YXR1c1xuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0X2xvYWRfbm9kZSA6IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgcyA9IHRoaXMuc2V0dGluZ3MuY29yZS5kYXRhLCB0O1xuXHRcdFx0dmFyIG5vdFRleHRPckNvbW1lbnROb2RlID0gZnVuY3Rpb24gbm90VGV4dE9yQ29tbWVudE5vZGUgKCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5ub2RlVHlwZSAhPT0gMyAmJiB0aGlzLm5vZGVUeXBlICE9PSA4O1xuXHRcdFx0fTtcblx0XHRcdC8vIHVzZSBvcmlnaW5hbCBIVE1MXG5cdFx0XHRpZighcykge1xuXHRcdFx0XHRpZihvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYXBwZW5kX2h0bWxfZGF0YShvYmosIHRoaXMuX2RhdGEuY29yZS5vcmlnaW5hbF9jb250YWluZXJfaHRtbC5jbG9uZSh0cnVlKSwgZnVuY3Rpb24gKHN0YXR1cykge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBzdGF0dXMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyByZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QgPyB0aGlzLl9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgdGhpcy5fZGF0YS5jb3JlLm9yaWdpbmFsX2NvbnRhaW5lcl9odG1sLmNsb25lKHRydWUpKSA6IGZhbHNlKTtcblx0XHRcdH1cblx0XHRcdGlmKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHMpKSB7XG5cdFx0XHRcdHJldHVybiBzLmNhbGwodGhpcywgb2JqLCBmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdGlmKGQgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzW3R5cGVvZiBkID09PSAnc3RyaW5nJyA/ICdfYXBwZW5kX2h0bWxfZGF0YScgOiAnX2FwcGVuZF9qc29uX2RhdGEnXShvYmosIHR5cGVvZiBkID09PSAnc3RyaW5nJyA/ICQoJC5wYXJzZUhUTUwoZCkpLmZpbHRlcihub3RUZXh0T3JDb21tZW50Tm9kZSkgOiBkLCBmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgc3RhdHVzKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyByZXR1cm4gZCA9PT0gZmFsc2UgPyBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKSA6IGNhbGxiYWNrLmNhbGwodGhpcywgdGhpc1t0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyAnX2FwcGVuZF9odG1sX2RhdGEnIDogJ19hcHBlbmRfanNvbl9kYXRhJ10ob2JqLCB0eXBlb2YgZCA9PT0gJ3N0cmluZycgPyAkKGQpIDogZCkpO1xuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdFx0aWYodHlwZW9mIHMgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGlmKHMudXJsKSB7XG5cdFx0XHRcdFx0cyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBzKTtcblx0XHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihzLnVybCkpIHtcblx0XHRcdFx0XHRcdHMudXJsID0gcy51cmwuY2FsbCh0aGlzLCBvYmopO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihzLmRhdGEpKSB7XG5cdFx0XHRcdFx0XHRzLmRhdGEgPSBzLmRhdGEuY2FsbCh0aGlzLCBvYmopO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gJC5hamF4KHMpXG5cdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZCx0LHgpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgdHlwZSA9IHguZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuXHRcdFx0XHRcdFx0XHRcdGlmKCh0eXBlICYmIHR5cGUuaW5kZXhPZignanNvbicpICE9PSAtMSkgfHwgdHlwZW9mIGQgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLl9hcHBlbmRfanNvbl9kYXRhKG9iaiwgZCwgZnVuY3Rpb24gKHN0YXR1cykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7IH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9yZXR1cm4gY2FsbGJhY2suY2FsbCh0aGlzLCB0aGlzLl9hcHBlbmRfanNvbl9kYXRhKG9iaiwgZCkpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZigodHlwZSAmJiB0eXBlLmluZGV4T2YoJ2h0bWwnKSAhPT0gLTEpIHx8IHR5cGVvZiBkID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5fYXBwZW5kX2h0bWxfZGF0YShvYmosICQoJC5wYXJzZUhUTUwoZCkpLmZpbHRlcihub3RUZXh0T3JDb21tZW50Tm9kZSksIGZ1bmN0aW9uIChzdGF0dXMpIHsgY2FsbGJhY2suY2FsbCh0aGlzLCBzdGF0dXMpOyB9KTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIHRoaXMuX2FwcGVuZF9odG1sX2RhdGEob2JqLCAkKGQpKSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2FqYXgnLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzA0JywgJ3JlYXNvbicgOiAnQ291bGQgbm90IGxvYWQgbm9kZScsICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2lkJyA6IG9iai5pZCwgJ3hocicgOiB4IH0pIH07XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24gKGYpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdhamF4JywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wNCcsICdyZWFzb24nIDogJ0NvdWxkIG5vdCBsb2FkIG5vZGUnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdpZCcgOiBvYmouaWQsICd4aHInIDogZiB9KSB9O1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoJC52YWthdGEuaXNfYXJyYXkocykpIHtcblx0XHRcdFx0XHR0ID0gJC5leHRlbmQodHJ1ZSwgW10sIHMpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCQuaXNQbGFpbk9iamVjdChzKSkge1xuXHRcdFx0XHRcdHQgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dCA9IHM7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYob2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2FwcGVuZF9qc29uX2RhdGEob2JqLCB0LCBmdW5jdGlvbiAoc3RhdHVzKSB7XG5cdFx0XHRcdFx0XHRjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnbm9kYXRhJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wNScsICdyZWFzb24nIDogJ0NvdWxkIG5vdCBsb2FkIG5vZGUnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdpZCcgOiBvYmouaWQgfSkgfTtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdFx0cmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vcmV0dXJuIGNhbGxiYWNrLmNhbGwodGhpcywgKG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuX2FwcGVuZF9qc29uX2RhdGEob2JqLCB0KSA6IGZhbHNlKSApO1xuXHRcdFx0fVxuXHRcdFx0aWYodHlwZW9mIHMgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGlmKG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLl9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgJCgkLnBhcnNlSFRNTChzKSkuZmlsdGVyKG5vdFRleHRPckNvbW1lbnROb2RlKSwgZnVuY3Rpb24gKHN0YXR1cykge1xuXHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBzdGF0dXMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ25vZGF0YScsICdwbHVnaW4nIDogJ2NvcmUnLCAnaWQnIDogJ2NvcmVfMDYnLCAncmVhc29uJyA6ICdDb3VsZCBub3QgbG9hZCBub2RlJywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnaWQnIDogb2JqLmlkIH0pIH07XG5cdFx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvL3JldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIChvYmouaWQgPT09ICQuanN0cmVlLnJvb3QgPyB0aGlzLl9hcHBlbmRfaHRtbF9kYXRhKG9iaiwgJChzKSkgOiBmYWxzZSkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXMsIGZhbHNlKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGFkZHMgYSBub2RlIHRvIHRoZSBsaXN0IG9mIG5vZGVzIHRvIHJlZHJhdy4gVXNlZCBvbmx5IGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfbm9kZV9jaGFuZ2VkKG9iaiBbLCBjYWxsYmFja10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9ialxuXHRcdCAqL1xuXHRcdF9ub2RlX2NoYW5nZWQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG4gICAgICBpZiAob2JqICYmICQuaW5BcnJheShvYmouaWQsIHRoaXMuX21vZGVsLmNoYW5nZWQpID09PSAtMSkge1xuXHRcdFx0XHR0aGlzLl9tb2RlbC5jaGFuZ2VkLnB1c2gob2JqLmlkKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGFwcGVuZHMgSFRNTCBjb250ZW50IHRvIHRoZSB0cmVlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfYXBwZW5kX2h0bWxfZGF0YShvYmosIGRhdGEpXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBhcHBlbmQgdG9cblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGRhdGEgdGhlIEhUTUwgc3RyaW5nIHRvIHBhcnNlIGFuZCBhcHBlbmRcblx0XHQgKiBAdHJpZ2dlciBtb2RlbC5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0X2FwcGVuZF9odG1sX2RhdGEgOiBmdW5jdGlvbiAoZG9tLCBkYXRhLCBjYikge1xuXHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShkb20pO1xuXHRcdFx0ZG9tLmNoaWxkcmVuID0gW107XG5cdFx0XHRkb20uY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0dmFyIGRhdCA9IGRhdGEuaXMoJ3VsJykgPyBkYXRhLmNoaWxkcmVuKCkgOiBkYXRhLFxuXHRcdFx0XHRwYXIgPSBkb20uaWQsXG5cdFx0XHRcdGNoZCA9IFtdLFxuXHRcdFx0XHRkcGMgPSBbXSxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdHAgPSBtW3Bhcl0sXG5cdFx0XHRcdHMgPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQubGVuZ3RoLFxuXHRcdFx0XHR0bXAsIGksIGo7XG5cdFx0XHRkYXQuZWFjaChmdW5jdGlvbiAoaSwgdikge1xuXHRcdFx0XHR0bXAgPSB0aGlzLl9wYXJzZV9tb2RlbF9mcm9tX2h0bWwoJCh2KSwgcGFyLCBwLnBhcmVudHMuY29uY2F0KCkpO1xuXHRcdFx0XHRpZih0bXApIHtcblx0XHRcdFx0XHRjaGQucHVzaCh0bXApO1xuXHRcdFx0XHRcdGRwYy5wdXNoKHRtcCk7XG5cdFx0XHRcdFx0aWYobVt0bXBdLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRkcGMgPSBkcGMuY29uY2F0KG1bdG1wXS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRwLmNoaWxkcmVuID0gY2hkO1xuXHRcdFx0cC5jaGlsZHJlbl9kID0gZHBjO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRtW3AucGFyZW50c1tpXV0uY2hpbGRyZW5fZCA9IG1bcC5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kLmNvbmNhdChkcGMpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBuZXcgZGF0YSBpcyBpbnNlcnRlZCB0byB0aGUgdHJlZSBtb2RlbFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBtb2RlbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IG5vZGVzIGFuIGFycmF5IG9mIG5vZGUgSURzXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBwYXJlbnQgSUQgb2YgdGhlIG5vZGVzXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignbW9kZWwnLCB7IFwibm9kZXNcIiA6IGRwYywgJ3BhcmVudCcgOiBwYXIgfSk7XG5cdFx0XHRpZihwYXIgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0dGhpcy5fbm9kZV9jaGFuZ2VkKHBhcik7XG5cdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkuY2hpbGRyZW4oJy5qc3RyZWUtaW5pdGlhbC1ub2RlJykucmVtb3ZlKCk7XG5cdFx0XHRcdHRoaXMucmVkcmF3KHRydWUpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmxlbmd0aCAhPT0gcykge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ21vZGVsJywgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCB9KTtcblx0XHRcdH1cblx0XHRcdGNiLmNhbGwodGhpcywgdHJ1ZSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBhcHBlbmRzIEpTT04gY29udGVudCB0byB0aGUgdHJlZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX2FwcGVuZF9qc29uX2RhdGEob2JqLCBkYXRhKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGUgdG8gYXBwZW5kIHRvXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBkYXRhIHRoZSBKU09OIG9iamVjdCB0byBwYXJzZSBhbmQgYXBwZW5kXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gZm9yY2VfcHJvY2Vzc2luZyBpbnRlcm5hbCBwYXJhbSAtIGRvIG5vdCBzZXRcblx0XHQgKiBAdHJpZ2dlciBtb2RlbC5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0X2FwcGVuZF9qc29uX2RhdGEgOiBmdW5jdGlvbiAoZG9tLCBkYXRhLCBjYiwgZm9yY2VfcHJvY2Vzc2luZykge1xuXHRcdFx0aWYodGhpcy5lbGVtZW50ID09PSBudWxsKSB7IHJldHVybjsgfVxuXHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShkb20pO1xuXHRcdFx0ZG9tLmNoaWxkcmVuID0gW107XG5cdFx0XHRkb20uY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0Ly8gKiUkQCEhIVxuXHRcdFx0aWYoZGF0YS5kKSB7XG5cdFx0XHRcdGRhdGEgPSBkYXRhLmQ7XG5cdFx0XHRcdGlmKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdFx0ZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCEkLnZha2F0YS5pc19hcnJheShkYXRhKSkgeyBkYXRhID0gW2RhdGFdOyB9XG5cdFx0XHR2YXIgdyA9IG51bGwsXG5cdFx0XHRcdGFyZ3MgPSB7XG5cdFx0XHRcdFx0J2RmJ1x0OiB0aGlzLl9tb2RlbC5kZWZhdWx0X3N0YXRlLFxuXHRcdFx0XHRcdCdkYXQnXHQ6IGRhdGEsXG5cdFx0XHRcdFx0J3BhcidcdDogZG9tLmlkLFxuXHRcdFx0XHRcdCdtJ1x0XHQ6IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0J3RfaWQnXHQ6IHRoaXMuX2lkLFxuXHRcdFx0XHRcdCd0X2NudCdcdDogdGhpcy5fY250LFxuXHRcdFx0XHRcdCdzZWwnXHQ6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRpbnN0ID0gdGhpcyxcblx0XHRcdFx0ZnVuYyA9IGZ1bmN0aW9uIChkYXRhLCB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRpZihkYXRhLmRhdGEpIHsgZGF0YSA9IGRhdGEuZGF0YTsgfVxuXHRcdFx0XHRcdHZhciBkYXQgPSBkYXRhLmRhdCxcblx0XHRcdFx0XHRcdHBhciA9IGRhdGEucGFyLFxuXHRcdFx0XHRcdFx0Y2hkID0gW10sXG5cdFx0XHRcdFx0XHRkcGMgPSBbXSxcblx0XHRcdFx0XHRcdGFkZCA9IFtdLFxuXHRcdFx0XHRcdFx0ZGYgPSBkYXRhLmRmLFxuXHRcdFx0XHRcdFx0dF9pZCA9IGRhdGEudF9pZCxcblx0XHRcdFx0XHRcdHRfY250ID0gZGF0YS50X2NudCxcblx0XHRcdFx0XHRcdG0gPSBkYXRhLm0sXG5cdFx0XHRcdFx0XHRwID0gbVtwYXJdLFxuXHRcdFx0XHRcdFx0c2VsID0gZGF0YS5zZWwsXG5cdFx0XHRcdFx0XHR0bXAsIGksIGosIHJzbHQsXG5cdFx0XHRcdFx0XHRwYXJzZV9mbGF0ID0gZnVuY3Rpb24gKGQsIHAsIHBzKSB7XG5cdFx0XHRcdFx0XHRcdGlmKCFwcykgeyBwcyA9IFtdOyB9XG5cdFx0XHRcdFx0XHRcdGVsc2UgeyBwcyA9IHBzLmNvbmNhdCgpOyB9XG5cdFx0XHRcdFx0XHRcdGlmKHApIHsgcHMudW5zaGlmdChwKTsgfVxuXHRcdFx0XHRcdFx0XHR2YXIgdGlkID0gZC5pZC50b1N0cmluZygpLFxuXHRcdFx0XHRcdFx0XHRcdGksIGosIGMsIGUsXG5cdFx0XHRcdFx0XHRcdFx0dG1wID0ge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWRcdFx0XHQ6IHRpZCxcblx0XHRcdFx0XHRcdFx0XHRcdHRleHRcdFx0OiBkLnRleHQgfHwgJycsXG5cdFx0XHRcdFx0XHRcdFx0XHRpY29uXHRcdDogZC5pY29uICE9PSB1bmRlZmluZWQgPyBkLmljb24gOiB0cnVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0cGFyZW50XHRcdDogcCxcblx0XHRcdFx0XHRcdFx0XHRcdHBhcmVudHNcdFx0OiBwcyxcblx0XHRcdFx0XHRcdFx0XHRcdGNoaWxkcmVuXHQ6IGQuY2hpbGRyZW4gfHwgW10sXG5cdFx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlbl9kXHQ6IGQuY2hpbGRyZW5fZCB8fCBbXSxcblx0XHRcdFx0XHRcdFx0XHRcdGRhdGFcdFx0OiBkLmRhdGEsXG5cdFx0XHRcdFx0XHRcdFx0XHRzdGF0ZVx0XHQ6IHsgfSxcblx0XHRcdFx0XHRcdFx0XHRcdGxpX2F0dHJcdFx0OiB7IGlkIDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRcdGFfYXR0clx0XHQ6IHsgaHJlZiA6ICcjJyB9LFxuXHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxcdDogZmFsc2Vcblx0XHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkZikge1xuXHRcdFx0XHRcdFx0XHRcdGlmKGRmLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkZltpXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmRhdGEgJiYgZC5kYXRhLmpzdHJlZSAmJiBkLmRhdGEuanN0cmVlLmljb24pIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuaWNvbiA9IGQuZGF0YS5qc3RyZWUuaWNvbjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0bXAuaWNvbiA9PT0gdW5kZWZpbmVkIHx8IHRtcC5pY29uID09PSBudWxsIHx8IHRtcC5pY29uID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmljb24gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgZC5kYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmRhdGEgPSBkLmRhdGE7XG5cdFx0XHRcdFx0XHRcdFx0aWYoZC5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgaW4gZC5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZihkLmRhdGEuanN0cmVlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZC5kYXRhLmpzdHJlZVtpXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIHR5cGVvZiBkLnN0YXRlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBkLnN0YXRlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihkLnN0YXRlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGQuc3RhdGVbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgdHlwZW9mIGQubGlfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgaW4gZC5saV9hdHRyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihkLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmxpX2F0dHJbaV0gPSBkLmxpX2F0dHJbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKCF0bXAubGlfYXR0ci5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5saV9hdHRyLmlkID0gdGlkO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBkLmFfYXR0cikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZC5hX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmFfYXR0cltpXSA9IGQuYV9hdHRyW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuY2hpbGRyZW4gJiYgZC5jaGlsZHJlbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdG1bdG1wLmlkXSA9IHRtcDtcblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGMgPSBwYXJzZV9mbGF0KG1bdG1wLmNoaWxkcmVuW2ldXSwgdG1wLmlkLCBwcyk7XG5cdFx0XHRcdFx0XHRcdFx0ZSA9IG1bY107XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmNoaWxkcmVuX2QucHVzaChjKTtcblx0XHRcdFx0XHRcdFx0XHRpZihlLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IHRtcC5jaGlsZHJlbl9kLmNvbmNhdChlLmNoaWxkcmVuX2QpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkZWxldGUgZC5kYXRhO1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZC5jaGlsZHJlbjtcblx0XHRcdFx0XHRcdFx0bVt0bXAuaWRdLm9yaWdpbmFsID0gZDtcblx0XHRcdFx0XHRcdFx0aWYodG1wLnN0YXRlLnNlbGVjdGVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0YWRkLnB1c2godG1wLmlkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdG1wLmlkO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHBhcnNlX25lc3QgPSBmdW5jdGlvbiAoZCwgcCwgcHMpIHtcblx0XHRcdFx0XHRcdFx0aWYoIXBzKSB7IHBzID0gW107IH1cblx0XHRcdFx0XHRcdFx0ZWxzZSB7IHBzID0gcHMuY29uY2F0KCk7IH1cblx0XHRcdFx0XHRcdFx0aWYocCkgeyBwcy51bnNoaWZ0KHApOyB9XG5cdFx0XHRcdFx0XHRcdHZhciB0aWQgPSBmYWxzZSwgaSwgaiwgYywgZSwgdG1wO1xuXHRcdFx0XHRcdFx0XHRkbyB7XG5cdFx0XHRcdFx0XHRcdFx0dGlkID0gJ2onICsgdF9pZCArICdfJyArICgrK3RfY250KTtcblx0XHRcdFx0XHRcdFx0fSB3aGlsZShtW3RpZF0pO1xuXG5cdFx0XHRcdFx0XHRcdHRtcCA9IHtcblx0XHRcdFx0XHRcdFx0XHRpZFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0dGV4dFx0XHQ6IHR5cGVvZiBkID09PSAnc3RyaW5nJyA/IGQgOiAnJyxcblx0XHRcdFx0XHRcdFx0XHRpY29uXHRcdDogdHlwZW9mIGQgPT09ICdvYmplY3QnICYmIGQuaWNvbiAhPT0gdW5kZWZpbmVkID8gZC5pY29uIDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRwYXJlbnRcdFx0OiBwLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudHNcdFx0OiBwcyxcblx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlblx0OiBbXSxcblx0XHRcdFx0XHRcdFx0XHRjaGlsZHJlbl9kXHQ6IFtdLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGFcdFx0OiBudWxsLFxuXHRcdFx0XHRcdFx0XHRcdHN0YXRlXHRcdDogeyB9LFxuXHRcdFx0XHRcdFx0XHRcdGxpX2F0dHJcdFx0OiB7IGlkIDogZmFsc2UgfSxcblx0XHRcdFx0XHRcdFx0XHRhX2F0dHJcdFx0OiB7IGhyZWYgOiAnIycgfSxcblx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbFx0OiBmYWxzZVxuXHRcdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkZikge1xuXHRcdFx0XHRcdFx0XHRcdGlmKGRmLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkZltpXTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmlkKSB7IHRtcC5pZCA9IGQuaWQudG9TdHJpbmcoKTsgfVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQudGV4dCkgeyB0bXAudGV4dCA9IGQudGV4dDsgfVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuZGF0YSAmJiBkLmRhdGEuanN0cmVlICYmIGQuZGF0YS5qc3RyZWUuaWNvbikge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5pY29uID0gZC5kYXRhLmpzdHJlZS5pY29uO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRtcC5pY29uID09PSB1bmRlZmluZWQgfHwgdG1wLmljb24gPT09IG51bGwgfHwgdG1wLmljb24gPT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuaWNvbiA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuZGF0YSA9IGQuZGF0YTtcblx0XHRcdFx0XHRcdFx0XHRpZihkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGQuZGF0YS5qc3RyZWUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLmRhdGEuanN0cmVlW2ldO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuc3RhdGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpIGluIGQuc3RhdGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGQuc3RhdGUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZC5zdGF0ZVtpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5saV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBkLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGQubGlfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAubGlfYXR0cltpXSA9IGQubGlfYXR0cltpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodG1wLmxpX2F0dHIuaWQgJiYgIXRtcC5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5pZCA9IHRtcC5saV9hdHRyLmlkLnRvU3RyaW5nKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoIXRtcC5pZCkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5pZCA9IHRpZDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZighdG1wLmxpX2F0dHIuaWQpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAubGlfYXR0ci5pZCA9IHRtcC5pZDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIHR5cGVvZiBkLmFfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGkgaW4gZC5hX2F0dHIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGQuYV9hdHRyLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5hX2F0dHJbaV0gPSBkLmFfYXR0cltpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmNoaWxkcmVuICYmIGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGMgPSBwYXJzZV9uZXN0KGQuY2hpbGRyZW5baV0sIHRtcC5pZCwgcHMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZSA9IG1bY107XG5cdFx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW4ucHVzaChjKTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKGUuY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSB0bXAuY2hpbGRyZW5fZC5jb25jYXQoZS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0dG1wLmNoaWxkcmVuX2QgPSB0bXAuY2hpbGRyZW5fZC5jb25jYXQodG1wLmNoaWxkcmVuKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuY2hpbGRyZW4gJiYgZC5jaGlsZHJlbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdFx0XHRcdHRtcC5zdGF0ZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW4gPSBbXTtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBkLmRhdGE7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBkLmNoaWxkcmVuO1xuXHRcdFx0XHRcdFx0XHR0bXAub3JpZ2luYWwgPSBkO1xuXHRcdFx0XHRcdFx0XHRtW3RtcC5pZF0gPSB0bXA7XG5cdFx0XHRcdFx0XHRcdGlmKHRtcC5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdFx0XHRcdGFkZC5wdXNoKHRtcC5pZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRtcC5pZDtcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRpZihkYXQubGVuZ3RoICYmIGRhdFswXS5pZCAhPT0gdW5kZWZpbmVkICYmIGRhdFswXS5wYXJlbnQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Ly8gRmxhdCBKU09OIHN1cHBvcnQgKGZvciBlYXN5IGltcG9ydCBmcm9tIERCKTpcblx0XHRcdFx0XHRcdC8vIDEpIGNvbnZlcnQgdG8gb2JqZWN0IChmb3JlYWNoKVxuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZGF0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRpZighZGF0W2ldLmNoaWxkcmVuKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0W2ldLmNoaWxkcmVuID0gW107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYoIWRhdFtpXS5zdGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdGRhdFtpXS5zdGF0ZSA9IHt9O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdG1bZGF0W2ldLmlkLnRvU3RyaW5nKCldID0gZGF0W2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gMikgcG9wdWxhdGUgY2hpbGRyZW4gKGZvcmVhY2gpXG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXQubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghbVtkYXRbaV0ucGFyZW50LnRvU3RyaW5nKCldKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHR5cGVvZiBpbnN0ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0Ll9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdwYXJzZScsICdwbHVnaW4nIDogJ2NvcmUnLCAnaWQnIDogJ2NvcmVfMDcnLCAncmVhc29uJyA6ICdOb2RlIHdpdGggaW52YWxpZCBwYXJlbnQnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdpZCcgOiBkYXRbaV0uaWQudG9TdHJpbmcoKSwgJ3BhcmVudCcgOiBkYXRbaV0ucGFyZW50LnRvU3RyaW5nKCkgfSkgfTtcblx0XHRcdFx0XHRcdFx0XHRcdGluc3Quc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKGluc3QsIGluc3QuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRtW2RhdFtpXS5wYXJlbnQudG9TdHJpbmcoKV0uY2hpbGRyZW4ucHVzaChkYXRbaV0uaWQudG9TdHJpbmcoKSk7XG5cdFx0XHRcdFx0XHRcdC8vIHBvcHVsYXRlIHBhcmVudC5jaGlsZHJlbl9kXG5cdFx0XHRcdFx0XHRcdHAuY2hpbGRyZW5fZC5wdXNoKGRhdFtpXS5pZC50b1N0cmluZygpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vIDMpIG5vcm1hbGl6ZSAmJiBwb3B1bGF0ZSBwYXJlbnRzIGFuZCBjaGlsZHJlbl9kIHdpdGggcmVjdXJzaW9uXG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSBwYXJzZV9mbGF0KG1bcC5jaGlsZHJlbltpXV0sIHBhciwgcC5wYXJlbnRzLmNvbmNhdCgpKTtcblx0XHRcdFx0XHRcdFx0ZHBjLnB1c2godG1wKTtcblx0XHRcdFx0XHRcdFx0aWYobVt0bXBdLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZHBjID0gZHBjLmNvbmNhdChtW3RtcF0uY2hpbGRyZW5fZCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bVtwLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QgPSBtW3AucGFyZW50c1tpXV0uY2hpbGRyZW5fZC5jb25jYXQoZHBjKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdC8vID8pIHRocmVlX3N0YXRlIHNlbGVjdGlvbiAtIHAuc3RhdGUuc2VsZWN0ZWQgJiYgdCAtIChpZiB0aHJlZV9zdGF0ZSBmb3JlYWNoKGRhdCA9PiBjaCkgLT4gZm9yZWFjaChwYXJlbnRzKSBpZihwYXJlbnQuc2VsZWN0ZWQpIGNoaWxkLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHJzbHQgPSB7XG5cdFx0XHRcdFx0XHRcdCdjbnQnIDogdF9jbnQsXG5cdFx0XHRcdFx0XHRcdCdtb2QnIDogbSxcblx0XHRcdFx0XHRcdFx0J3NlbCcgOiBzZWwsXG5cdFx0XHRcdFx0XHRcdCdwYXInIDogcGFyLFxuXHRcdFx0XHRcdFx0XHQnZHBjJyA6IGRwYyxcblx0XHRcdFx0XHRcdFx0J2FkZCcgOiBhZGRcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZGF0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSBwYXJzZV9uZXN0KGRhdFtpXSwgcGFyLCBwLnBhcmVudHMuY29uY2F0KCkpO1xuXHRcdFx0XHRcdFx0XHRpZih0bXApIHtcblx0XHRcdFx0XHRcdFx0XHRjaGQucHVzaCh0bXApO1xuXHRcdFx0XHRcdFx0XHRcdGRwYy5wdXNoKHRtcCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYobVt0bXBdLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkcGMgPSBkcGMuY29uY2F0KG1bdG1wXS5jaGlsZHJlbl9kKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHAuY2hpbGRyZW4gPSBjaGQ7XG5cdFx0XHRcdFx0XHRwLmNoaWxkcmVuX2QgPSBkcGM7XG5cdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdG1bcC5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gbVtwLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QuY29uY2F0KGRwYyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyc2x0ID0ge1xuXHRcdFx0XHRcdFx0XHQnY250JyA6IHRfY250LFxuXHRcdFx0XHRcdFx0XHQnbW9kJyA6IG0sXG5cdFx0XHRcdFx0XHRcdCdzZWwnIDogc2VsLFxuXHRcdFx0XHRcdFx0XHQncGFyJyA6IHBhcixcblx0XHRcdFx0XHRcdFx0J2RwYycgOiBkcGMsXG5cdFx0XHRcdFx0XHRcdCdhZGQnIDogYWRkXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZih0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2Ygd2luZG93LmRvY3VtZW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0cG9zdE1lc3NhZ2UocnNsdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJzbHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRyc2x0ID0gZnVuY3Rpb24gKHJzbHQsIHdvcmtlcikge1xuXHRcdFx0XHRcdGlmKHRoaXMuZWxlbWVudCA9PT0gbnVsbCkgeyByZXR1cm47IH1cblx0XHRcdFx0XHR0aGlzLl9jbnQgPSByc2x0LmNudDtcblx0XHRcdFx0XHR2YXIgaSwgbSA9IHRoaXMuX21vZGVsLmRhdGE7XG5cdFx0XHRcdFx0Zm9yIChpIGluIG0pIHtcblx0XHRcdFx0XHRcdGlmIChtLmhhc093blByb3BlcnR5KGkpICYmIG1baV0uc3RhdGUgJiYgbVtpXS5zdGF0ZS5sb2FkaW5nICYmIHJzbHQubW9kW2ldKSB7XG5cdFx0XHRcdFx0XHRcdHJzbHQubW9kW2ldLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhID0gcnNsdC5tb2Q7IC8vIGJyZWFrcyB0aGUgcmVmZXJlbmNlIGluIGxvYWRfbm9kZSAtIGNhcmVmdWxcblxuXHRcdFx0XHRcdGlmKHdvcmtlcikge1xuXHRcdFx0XHRcdFx0dmFyIGosIGEgPSByc2x0LmFkZCwgciA9IHJzbHQuc2VsLCBzID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLnNsaWNlKCk7XG5cdFx0XHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YTtcblx0XHRcdFx0XHRcdC8vIGlmIHNlbGVjdGlvbiB3YXMgY2hhbmdlZCB3aGlsZSBjYWxjdWxhdGluZyBpbiB3b3JrZXJcblx0XHRcdFx0XHRcdGlmKHIubGVuZ3RoICE9PSBzLmxlbmd0aCB8fCAkLnZha2F0YS5hcnJheV91bmlxdWUoci5jb25jYXQocykpLmxlbmd0aCAhPT0gci5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0Ly8gZGVzZWxlY3Qgbm9kZXMgdGhhdCBhcmUgbm8gbG9uZ2VyIHNlbGVjdGVkXG5cdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHIubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYoJC5pbkFycmF5KHJbaV0sIGEpID09PSAtMSAmJiAkLmluQXJyYXkocltpXSwgcykgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRtW3JbaV1dLnN0YXRlLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdC8vIHNlbGVjdCBub2RlcyB0aGF0IHdlcmUgc2VsZWN0ZWQgaW4gdGhlIG1lYW4gdGltZVxuXHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGlmKCQuaW5BcnJheShzW2ldLCByKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1bc1tpXV0uc3RhdGUuc2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihyc2x0LmFkZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5jb25jYXQocnNsdC5hZGQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignbW9kZWwnLCB7IFwibm9kZXNcIiA6IHJzbHQuZHBjLCAncGFyZW50JyA6IHJzbHQucGFyIH0pO1xuXG5cdFx0XHRcdFx0aWYocnNsdC5wYXIgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdHRoaXMuX25vZGVfY2hhbmdlZChyc2x0LnBhcik7XG5cdFx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdC8vIHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmNoaWxkcmVuKCcuanN0cmVlLWluaXRpYWwtbm9kZScpLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZWRyYXcodHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHJzbHQuYWRkLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdtb2RlbCcsICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgfSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gSWYgbm8gd29ya2VyLCB0cnkgdG8gbWltaWMgd29ya2VyIGJlaGF2aW9vdXIsIGJ5IGludm9raW5nIGNiIGFzeW5jaHJvbm91c2x5XG5cdFx0XHRcdFx0aWYgKCF3b3JrZXIgJiYgc2V0SW1tZWRpYXRlKSB7XG5cdFx0XHRcdFx0XHRzZXRJbW1lZGlhdGUoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdFx0Y2IuY2FsbChpbnN0LCB0cnVlKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGNiLmNhbGwoaW5zdCwgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jb3JlLndvcmtlciAmJiB3aW5kb3cuQmxvYiAmJiB3aW5kb3cuVVJMICYmIHdpbmRvdy5Xb3JrZXIpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRpZih0aGlzLl93cmsgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3dyayA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKFxuXHRcdFx0XHRcdFx0XHRuZXcgd2luZG93LkJsb2IoXG5cdFx0XHRcdFx0XHRcdFx0WydzZWxmLm9ubWVzc2FnZSA9ICcgKyBmdW5jLnRvU3RyaW5nKCldLFxuXHRcdFx0XHRcdFx0XHRcdHt0eXBlOlwidGV4dC9qYXZhc2NyaXB0XCJ9XG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKCF0aGlzLl9kYXRhLmNvcmUud29ya2luZyB8fCBmb3JjZV9wcm9jZXNzaW5nKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUud29ya2luZyA9IHRydWU7XG5cdFx0XHRcdFx0XHR3ID0gbmV3IHdpbmRvdy5Xb3JrZXIodGhpcy5fd3JrKTtcblx0XHRcdFx0XHRcdHcub25tZXNzYWdlID0gZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0cnNsdC5jYWxsKHRoaXMsIGUuZGF0YSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHRyeSB7IHcudGVybWluYXRlKCk7IHcgPSBudWxsOyB9IGNhdGNoKGlnbm9yZSkgeyB9XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS53b3JrZXJfcXVldWUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fYXBwZW5kX2pzb25fZGF0YS5hcHBseSh0aGlzLCB0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLnNoaWZ0KCkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS53b3JraW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHRcdFx0XHRcdGlmKCFhcmdzLnBhcikge1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2FwcGVuZF9qc29uX2RhdGEuYXBwbHkodGhpcywgdGhpcy5fZGF0YS5jb3JlLndvcmtlcl9xdWV1ZS5zaGlmdCgpKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUud29ya2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dy5wb3N0TWVzc2FnZShhcmdzKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUud29ya2VyX3F1ZXVlLnB1c2goW2RvbSwgZGF0YSwgY2IsIHRydWVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZSkge1xuXHRcdFx0XHRcdHJzbHQuY2FsbCh0aGlzLCBmdW5jKGFyZ3MpLCBmYWxzZSk7XG5cdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5jb3JlLndvcmtlcl9xdWV1ZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2FwcGVuZF9qc29uX2RhdGEuYXBwbHkodGhpcywgdGhpcy5fZGF0YS5jb3JlLndvcmtlcl9xdWV1ZS5zaGlmdCgpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUud29ya2luZyA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHJzbHQuY2FsbCh0aGlzLCBmdW5jKGFyZ3MpLCBmYWxzZSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBwYXJzZXMgYSBub2RlIGZyb20gYSBqUXVlcnkgb2JqZWN0IGFuZCBhcHBlbmRzIHRoZW0gdG8gdGhlIGluIG1lbW9yeSB0cmVlIG1vZGVsLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfcGFyc2VfbW9kZWxfZnJvbV9odG1sKGQgWywgcCwgcHNdKVxuXHRcdCAqIEBwYXJhbSAge2pRdWVyeX0gZCB0aGUgalF1ZXJ5IG9iamVjdCB0byBwYXJzZVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gcCB0aGUgcGFyZW50IElEXG5cdFx0ICogQHBhcmFtICB7QXJyYXl9IHBzIGxpc3Qgb2YgYWxsIHBhcmVudHNcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBJRCBvZiB0aGUgb2JqZWN0IGFkZGVkIHRvIHRoZSBtb2RlbFxuXHRcdCAqL1xuXHRcdF9wYXJzZV9tb2RlbF9mcm9tX2h0bWwgOiBmdW5jdGlvbiAoZCwgcCwgcHMpIHtcblx0XHRcdGlmKCFwcykgeyBwcyA9IFtdOyB9XG5cdFx0XHRlbHNlIHsgcHMgPSBbXS5jb25jYXQocHMpOyB9XG5cdFx0XHRpZihwKSB7IHBzLnVuc2hpZnQocCk7IH1cblx0XHRcdHZhciBjLCBlLCBtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0ZGF0YSA9IHtcblx0XHRcdFx0XHRpZFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0dGV4dFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHRcdGljb25cdFx0OiB0cnVlLFxuXHRcdFx0XHRcdHBhcmVudFx0XHQ6IHAsXG5cdFx0XHRcdFx0cGFyZW50c1x0XHQ6IHBzLFxuXHRcdFx0XHRcdGNoaWxkcmVuXHQ6IFtdLFxuXHRcdFx0XHRcdGNoaWxkcmVuX2RcdDogW10sXG5cdFx0XHRcdFx0ZGF0YVx0XHQ6IG51bGwsXG5cdFx0XHRcdFx0c3RhdGVcdFx0OiB7IH0sXG5cdFx0XHRcdFx0bGlfYXR0clx0XHQ6IHsgaWQgOiBmYWxzZSB9LFxuXHRcdFx0XHRcdGFfYXR0clx0XHQ6IHsgaHJlZiA6ICcjJyB9LFxuXHRcdFx0XHRcdG9yaWdpbmFsXHQ6IGZhbHNlXG5cdFx0XHRcdH0sIGksIHRtcCwgdGlkO1xuXHRcdFx0Zm9yKGkgaW4gdGhpcy5fbW9kZWwuZGVmYXVsdF9zdGF0ZSkge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kZWZhdWx0X3N0YXRlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0ZGF0YS5zdGF0ZVtpXSA9IHRoaXMuX21vZGVsLmRlZmF1bHRfc3RhdGVbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRtcCA9ICQudmFrYXRhLmF0dHJpYnV0ZXMoZCwgdHJ1ZSk7XG5cdFx0XHQkLmVhY2godG1wLCBmdW5jdGlvbiAoaSwgdikge1xuXHRcdFx0XHR2ID0gJC52YWthdGEudHJpbSh2KTtcblx0XHRcdFx0aWYoIXYubGVuZ3RoKSB7IHJldHVybiB0cnVlOyB9XG5cdFx0XHRcdGRhdGEubGlfYXR0cltpXSA9IHY7XG5cdFx0XHRcdGlmKGkgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRkYXRhLmlkID0gdi50b1N0cmluZygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHRtcCA9IGQuY2hpbGRyZW4oJ2EnKS5maXJzdCgpO1xuXHRcdFx0aWYodG1wLmxlbmd0aCkge1xuXHRcdFx0XHR0bXAgPSAkLnZha2F0YS5hdHRyaWJ1dGVzKHRtcCwgdHJ1ZSk7XG5cdFx0XHRcdCQuZWFjaCh0bXAsIGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdFx0diA9ICQudmFrYXRhLnRyaW0odik7XG5cdFx0XHRcdFx0aWYodi5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGRhdGEuYV9hdHRyW2ldID0gdjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0dG1wID0gZC5jaGlsZHJlbihcImFcIikuZmlyc3QoKS5sZW5ndGggPyBkLmNoaWxkcmVuKFwiYVwiKS5maXJzdCgpLmNsb25lKCkgOiBkLmNsb25lKCk7XG5cdFx0XHR0bXAuY2hpbGRyZW4oXCJpbnMsIGksIHVsXCIpLnJlbW92ZSgpO1xuXHRcdFx0dG1wID0gdG1wLmh0bWwoKTtcblx0XHRcdHRtcCA9ICQoJzxkaXY+PC9kaXY+JykuaHRtbCh0bXApO1xuXHRcdFx0ZGF0YS50ZXh0ID0gdGhpcy5zZXR0aW5ncy5jb3JlLmZvcmNlX3RleHQgPyB0bXAudGV4dCgpIDogdG1wLmh0bWwoKTtcblx0XHRcdHRtcCA9IGQuZGF0YSgpO1xuXHRcdFx0ZGF0YS5kYXRhID0gdG1wID8gJC5leHRlbmQodHJ1ZSwge30sIHRtcCkgOiBudWxsO1xuXHRcdFx0ZGF0YS5zdGF0ZS5vcGVuZWQgPSBkLmhhc0NsYXNzKCdqc3RyZWUtb3BlbicpO1xuXHRcdFx0ZGF0YS5zdGF0ZS5zZWxlY3RlZCA9IGQuY2hpbGRyZW4oJ2EnKS5oYXNDbGFzcygnanN0cmVlLWNsaWNrZWQnKTtcblx0XHRcdGRhdGEuc3RhdGUuZGlzYWJsZWQgPSBkLmNoaWxkcmVuKCdhJykuaGFzQ2xhc3MoJ2pzdHJlZS1kaXNhYmxlZCcpO1xuXHRcdFx0aWYoZGF0YS5kYXRhICYmIGRhdGEuZGF0YS5qc3RyZWUpIHtcblx0XHRcdFx0Zm9yKGkgaW4gZGF0YS5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdGlmKGRhdGEuZGF0YS5qc3RyZWUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGRhdGEuc3RhdGVbaV0gPSBkYXRhLmRhdGEuanN0cmVlW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gZC5jaGlsZHJlbihcImFcIikuY2hpbGRyZW4oXCIuanN0cmVlLXRoZW1laWNvblwiKTtcblx0XHRcdGlmKHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0ZGF0YS5pY29uID0gdG1wLmhhc0NsYXNzKCdqc3RyZWUtdGhlbWVpY29uLWhpZGRlbicpID8gZmFsc2UgOiB0bXAuYXR0cigncmVsJyk7XG5cdFx0XHR9XG5cdFx0XHRpZihkYXRhLnN0YXRlLmljb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRkYXRhLmljb24gPSBkYXRhLnN0YXRlLmljb247XG5cdFx0XHR9XG5cdFx0XHRpZihkYXRhLmljb24gPT09IHVuZGVmaW5lZCB8fCBkYXRhLmljb24gPT09IG51bGwgfHwgZGF0YS5pY29uID09PSBcIlwiKSB7XG5cdFx0XHRcdGRhdGEuaWNvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBkLmNoaWxkcmVuKFwidWxcIikuY2hpbGRyZW4oXCJsaVwiKTtcblx0XHRcdGRvIHtcblx0XHRcdFx0dGlkID0gJ2onICsgdGhpcy5faWQgKyAnXycgKyAoKyt0aGlzLl9jbnQpO1xuXHRcdFx0fSB3aGlsZShtW3RpZF0pO1xuXHRcdFx0ZGF0YS5pZCA9IGRhdGEubGlfYXR0ci5pZCA/IGRhdGEubGlfYXR0ci5pZC50b1N0cmluZygpIDogdGlkO1xuXHRcdFx0aWYodG1wLmxlbmd0aCkge1xuXHRcdFx0XHR0bXAuZWFjaChmdW5jdGlvbiAoaSwgdikge1xuXHRcdFx0XHRcdGMgPSB0aGlzLl9wYXJzZV9tb2RlbF9mcm9tX2h0bWwoJCh2KSwgZGF0YS5pZCwgcHMpO1xuXHRcdFx0XHRcdGUgPSB0aGlzLl9tb2RlbC5kYXRhW2NdO1xuXHRcdFx0XHRcdGRhdGEuY2hpbGRyZW4ucHVzaChjKTtcblx0XHRcdFx0XHRpZihlLmNoaWxkcmVuX2QubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRkYXRhLmNoaWxkcmVuX2QgPSBkYXRhLmNoaWxkcmVuX2QuY29uY2F0KGUuY2hpbGRyZW5fZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0XHRkYXRhLmNoaWxkcmVuX2QgPSBkYXRhLmNoaWxkcmVuX2QuY29uY2F0KGRhdGEuY2hpbGRyZW4pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmKGQuaGFzQ2xhc3MoJ2pzdHJlZS1jbG9zZWQnKSkge1xuXHRcdFx0XHRcdGRhdGEuc3RhdGUubG9hZGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGRhdGEubGlfYXR0clsnY2xhc3MnXSkge1xuXHRcdFx0XHRkYXRhLmxpX2F0dHJbJ2NsYXNzJ10gPSBkYXRhLmxpX2F0dHJbJ2NsYXNzJ10ucmVwbGFjZSgnanN0cmVlLWNsb3NlZCcsJycpLnJlcGxhY2UoJ2pzdHJlZS1vcGVuJywnJyk7XG5cdFx0XHR9XG5cdFx0XHRpZihkYXRhLmFfYXR0clsnY2xhc3MnXSkge1xuXHRcdFx0XHRkYXRhLmFfYXR0clsnY2xhc3MnXSA9IGRhdGEuYV9hdHRyWydjbGFzcyddLnJlcGxhY2UoJ2pzdHJlZS1jbGlja2VkJywnJykucmVwbGFjZSgnanN0cmVlLWRpc2FibGVkJywnJyk7XG5cdFx0XHR9XG5cdFx0XHRtW2RhdGEuaWRdID0gZGF0YTtcblx0XHRcdGlmKGRhdGEuc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLnB1c2goZGF0YS5pZCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZGF0YS5pZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHBhcnNlcyBhIG5vZGUgZnJvbSBhIEpTT04gb2JqZWN0ICh1c2VkIHdoZW4gZGVhbGluZyB3aXRoIGZsYXQgZGF0YSwgd2hpY2ggaGFzIG5vIG5lc3Rpbmcgb2YgY2hpbGRyZW4sIGJ1dCBoYXMgaWQgYW5kIHBhcmVudCBwcm9wZXJ0aWVzKSBhbmQgYXBwZW5kcyBpdCB0byB0aGUgaW4gbWVtb3J5IHRyZWUgbW9kZWwuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9wYXJzZV9tb2RlbF9mcm9tX2ZsYXRfanNvbihkIFssIHAsIHBzXSlcblx0XHQgKiBAcGFyYW0gIHtPYmplY3R9IGQgdGhlIEpTT04gb2JqZWN0IHRvIHBhcnNlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBwIHRoZSBwYXJlbnQgSURcblx0XHQgKiBAcGFyYW0gIHtBcnJheX0gcHMgbGlzdCBvZiBhbGwgcGFyZW50c1xuXHRcdCAqIEByZXR1cm4ge1N0cmluZ30gdGhlIElEIG9mIHRoZSBvYmplY3QgYWRkZWQgdG8gdGhlIG1vZGVsXG5cdFx0ICovXG5cdFx0X3BhcnNlX21vZGVsX2Zyb21fZmxhdF9qc29uIDogZnVuY3Rpb24gKGQsIHAsIHBzKSB7XG5cdFx0XHRpZighcHMpIHsgcHMgPSBbXTsgfVxuXHRcdFx0ZWxzZSB7IHBzID0gcHMuY29uY2F0KCk7IH1cblx0XHRcdGlmKHApIHsgcHMudW5zaGlmdChwKTsgfVxuXHRcdFx0dmFyIHRpZCA9IGQuaWQudG9TdHJpbmcoKSxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdGRmID0gdGhpcy5fbW9kZWwuZGVmYXVsdF9zdGF0ZSxcblx0XHRcdFx0aSwgaiwgYywgZSxcblx0XHRcdFx0dG1wID0ge1xuXHRcdFx0XHRcdGlkXHRcdFx0OiB0aWQsXG5cdFx0XHRcdFx0dGV4dFx0XHQ6IGQudGV4dCB8fCAnJyxcblx0XHRcdFx0XHRpY29uXHRcdDogZC5pY29uICE9PSB1bmRlZmluZWQgPyBkLmljb24gOiB0cnVlLFxuXHRcdFx0XHRcdHBhcmVudFx0XHQ6IHAsXG5cdFx0XHRcdFx0cGFyZW50c1x0XHQ6IHBzLFxuXHRcdFx0XHRcdGNoaWxkcmVuXHQ6IGQuY2hpbGRyZW4gfHwgW10sXG5cdFx0XHRcdFx0Y2hpbGRyZW5fZFx0OiBkLmNoaWxkcmVuX2QgfHwgW10sXG5cdFx0XHRcdFx0ZGF0YVx0XHQ6IGQuZGF0YSxcblx0XHRcdFx0XHRzdGF0ZVx0XHQ6IHsgfSxcblx0XHRcdFx0XHRsaV9hdHRyXHRcdDogeyBpZCA6IGZhbHNlIH0sXG5cdFx0XHRcdFx0YV9hdHRyXHRcdDogeyBocmVmIDogJyMnIH0sXG5cdFx0XHRcdFx0b3JpZ2luYWxcdDogZmFsc2Vcblx0XHRcdFx0fTtcblx0XHRcdGZvcihpIGluIGRmKSB7XG5cdFx0XHRcdGlmKGRmLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZGZbaV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5kYXRhICYmIGQuZGF0YS5qc3RyZWUgJiYgZC5kYXRhLmpzdHJlZS5pY29uKSB7XG5cdFx0XHRcdHRtcC5pY29uID0gZC5kYXRhLmpzdHJlZS5pY29uO1xuXHRcdFx0fVxuXHRcdFx0aWYodG1wLmljb24gPT09IHVuZGVmaW5lZCB8fCB0bXAuaWNvbiA9PT0gbnVsbCB8fCB0bXAuaWNvbiA9PT0gXCJcIikge1xuXHRcdFx0XHR0bXAuaWNvbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIGQuZGF0YSkge1xuXHRcdFx0XHR0bXAuZGF0YSA9IGQuZGF0YTtcblx0XHRcdFx0aWYoZC5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdGZvcihpIGluIGQuZGF0YS5qc3RyZWUpIHtcblx0XHRcdFx0XHRcdGlmKGQuZGF0YS5qc3RyZWUuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZC5kYXRhLmpzdHJlZVtpXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgdHlwZW9mIGQuc3RhdGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBkLnN0YXRlKSB7XG5cdFx0XHRcdFx0aWYoZC5zdGF0ZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0dG1wLnN0YXRlW2ldID0gZC5zdGF0ZVtpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgdHlwZW9mIGQubGlfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChpIGluIGQubGlfYXR0cikge1xuXHRcdFx0XHRcdGlmKGQubGlfYXR0ci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0dG1wLmxpX2F0dHJbaV0gPSBkLmxpX2F0dHJbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZighdG1wLmxpX2F0dHIuaWQpIHtcblx0XHRcdFx0dG1wLmxpX2F0dHIuaWQgPSB0aWQ7XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIHR5cGVvZiBkLmFfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChpIGluIGQuYV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYoZC5hX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdHRtcC5hX2F0dHJbaV0gPSBkLmFfYXR0cltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5jaGlsZHJlbiAmJiBkLmNoaWxkcmVuID09PSB0cnVlKSB7XG5cdFx0XHRcdHRtcC5zdGF0ZS5sb2FkZWQgPSBmYWxzZTtcblx0XHRcdFx0dG1wLmNoaWxkcmVuID0gW107XG5cdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gW107XG5cdFx0XHR9XG5cdFx0XHRtW3RtcC5pZF0gPSB0bXA7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGMgPSB0aGlzLl9wYXJzZV9tb2RlbF9mcm9tX2ZsYXRfanNvbihtW3RtcC5jaGlsZHJlbltpXV0sIHRtcC5pZCwgcHMpO1xuXHRcdFx0XHRlID0gbVtjXTtcblx0XHRcdFx0dG1wLmNoaWxkcmVuX2QucHVzaChjKTtcblx0XHRcdFx0aWYoZS5jaGlsZHJlbl9kLmxlbmd0aCkge1xuXHRcdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gdG1wLmNoaWxkcmVuX2QuY29uY2F0KGUuY2hpbGRyZW5fZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGRlbGV0ZSBkLmRhdGE7XG5cdFx0XHRkZWxldGUgZC5jaGlsZHJlbjtcblx0XHRcdG1bdG1wLmlkXS5vcmlnaW5hbCA9IGQ7XG5cdFx0XHRpZih0bXAuc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLnB1c2godG1wLmlkKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0bXAuaWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBwYXJzZXMgYSBub2RlIGZyb20gYSBKU09OIG9iamVjdCBhbmQgYXBwZW5kcyBpdCB0byB0aGUgaW4gbWVtb3J5IHRyZWUgbW9kZWwuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIF9wYXJzZV9tb2RlbF9mcm9tX2pzb24oZCBbLCBwLCBwc10pXG5cdFx0ICogQHBhcmFtICB7T2JqZWN0fSBkIHRoZSBKU09OIG9iamVjdCB0byBwYXJzZVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gcCB0aGUgcGFyZW50IElEXG5cdFx0ICogQHBhcmFtICB7QXJyYXl9IHBzIGxpc3Qgb2YgYWxsIHBhcmVudHNcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9IHRoZSBJRCBvZiB0aGUgb2JqZWN0IGFkZGVkIHRvIHRoZSBtb2RlbFxuXHRcdCAqL1xuXHRcdF9wYXJzZV9tb2RlbF9mcm9tX2pzb24gOiBmdW5jdGlvbiAoZCwgcCwgcHMpIHtcblx0XHRcdGlmKCFwcykgeyBwcyA9IFtdOyB9XG5cdFx0XHRlbHNlIHsgcHMgPSBwcy5jb25jYXQoKTsgfVxuXHRcdFx0aWYocCkgeyBwcy51bnNoaWZ0KHApOyB9XG5cdFx0XHR2YXIgdGlkID0gZmFsc2UsIGksIGosIGMsIGUsIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBkZiA9IHRoaXMuX21vZGVsLmRlZmF1bHRfc3RhdGUsIHRtcDtcblx0XHRcdGRvIHtcblx0XHRcdFx0dGlkID0gJ2onICsgdGhpcy5faWQgKyAnXycgKyAoKyt0aGlzLl9jbnQpO1xuXHRcdFx0fSB3aGlsZShtW3RpZF0pO1xuXG5cdFx0XHR0bXAgPSB7XG5cdFx0XHRcdGlkXHRcdFx0OiBmYWxzZSxcblx0XHRcdFx0dGV4dFx0XHQ6IHR5cGVvZiBkID09PSAnc3RyaW5nJyA/IGQgOiAnJyxcblx0XHRcdFx0aWNvblx0XHQ6IHR5cGVvZiBkID09PSAnb2JqZWN0JyAmJiBkLmljb24gIT09IHVuZGVmaW5lZCA/IGQuaWNvbiA6IHRydWUsXG5cdFx0XHRcdHBhcmVudFx0XHQ6IHAsXG5cdFx0XHRcdHBhcmVudHNcdFx0OiBwcyxcblx0XHRcdFx0Y2hpbGRyZW5cdDogW10sXG5cdFx0XHRcdGNoaWxkcmVuX2RcdDogW10sXG5cdFx0XHRcdGRhdGFcdFx0OiBudWxsLFxuXHRcdFx0XHRzdGF0ZVx0XHQ6IHsgfSxcblx0XHRcdFx0bGlfYXR0clx0XHQ6IHsgaWQgOiBmYWxzZSB9LFxuXHRcdFx0XHRhX2F0dHJcdFx0OiB7IGhyZWYgOiAnIycgfSxcblx0XHRcdFx0b3JpZ2luYWxcdDogZmFsc2Vcblx0XHRcdH07XG5cdFx0XHRmb3IoaSBpbiBkZikge1xuXHRcdFx0XHRpZihkZi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdHRtcC5zdGF0ZVtpXSA9IGRmW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIGQuaWQpIHsgdG1wLmlkID0gZC5pZC50b1N0cmluZygpOyB9XG5cdFx0XHRpZihkICYmIGQudGV4dCkgeyB0bXAudGV4dCA9IGQudGV4dDsgfVxuXHRcdFx0aWYoZCAmJiBkLmRhdGEgJiYgZC5kYXRhLmpzdHJlZSAmJiBkLmRhdGEuanN0cmVlLmljb24pIHtcblx0XHRcdFx0dG1wLmljb24gPSBkLmRhdGEuanN0cmVlLmljb247XG5cdFx0XHR9XG5cdFx0XHRpZih0bXAuaWNvbiA9PT0gdW5kZWZpbmVkIHx8IHRtcC5pY29uID09PSBudWxsIHx8IHRtcC5pY29uID09PSBcIlwiKSB7XG5cdFx0XHRcdHRtcC5pY29uID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmKGQgJiYgZC5kYXRhKSB7XG5cdFx0XHRcdHRtcC5kYXRhID0gZC5kYXRhO1xuXHRcdFx0XHRpZihkLmRhdGEuanN0cmVlKSB7XG5cdFx0XHRcdFx0Zm9yKGkgaW4gZC5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdFx0aWYoZC5kYXRhLmpzdHJlZS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLmRhdGEuanN0cmVlW2ldO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5zdGF0ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChpIGluIGQuc3RhdGUpIHtcblx0XHRcdFx0XHRpZihkLnN0YXRlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBkLnN0YXRlW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5saV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGkgaW4gZC5saV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYoZC5saV9hdHRyLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAubGlfYXR0cltpXSA9IGQubGlfYXR0cltpXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKHRtcC5saV9hdHRyLmlkICYmICF0bXAuaWQpIHtcblx0XHRcdFx0dG1wLmlkID0gdG1wLmxpX2F0dHIuaWQudG9TdHJpbmcoKTtcblx0XHRcdH1cblx0XHRcdGlmKCF0bXAuaWQpIHtcblx0XHRcdFx0dG1wLmlkID0gdGlkO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXRtcC5saV9hdHRyLmlkKSB7XG5cdFx0XHRcdHRtcC5saV9hdHRyLmlkID0gdG1wLmlkO1xuXHRcdFx0fVxuXHRcdFx0aWYoZCAmJiB0eXBlb2YgZC5hX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoaSBpbiBkLmFfYXR0cikge1xuXHRcdFx0XHRcdGlmKGQuYV9hdHRyLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAuYV9hdHRyW2ldID0gZC5hX2F0dHJbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIGQuY2hpbGRyZW4gJiYgZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRjID0gdGhpcy5fcGFyc2VfbW9kZWxfZnJvbV9qc29uKGQuY2hpbGRyZW5baV0sIHRtcC5pZCwgcHMpO1xuXHRcdFx0XHRcdGUgPSBtW2NdO1xuXHRcdFx0XHRcdHRtcC5jaGlsZHJlbi5wdXNoKGMpO1xuXHRcdFx0XHRcdGlmKGUuY2hpbGRyZW5fZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gdG1wLmNoaWxkcmVuX2QuY29uY2F0KGUuY2hpbGRyZW5fZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRtcC5jaGlsZHJlbl9kID0gdG1wLmNoaWxkcmVuLmNvbmNhdCh0bXAuY2hpbGRyZW5fZCk7XG5cdFx0XHR9XG5cdFx0XHRpZihkICYmIGQuY2hpbGRyZW4gJiYgZC5jaGlsZHJlbiA9PT0gdHJ1ZSkge1xuXHRcdFx0XHR0bXAuc3RhdGUubG9hZGVkID0gZmFsc2U7XG5cdFx0XHRcdHRtcC5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0XHR0bXAuY2hpbGRyZW5fZCA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0ZGVsZXRlIGQuZGF0YTtcblx0XHRcdGRlbGV0ZSBkLmNoaWxkcmVuO1xuXHRcdFx0dG1wLm9yaWdpbmFsID0gZDtcblx0XHRcdG1bdG1wLmlkXSA9IHRtcDtcblx0XHRcdGlmKHRtcC5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQucHVzaCh0bXAuaWQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRtcC5pZDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJlZHJhd3MgYWxsIG5vZGVzIHRoYXQgbmVlZCB0byBiZSByZWRyYXduLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfcmVkcmF3KClcblx0XHQgKiBAdHJpZ2dlciByZWRyYXcuanN0cmVlXG5cdFx0ICovXG5cdFx0X3JlZHJhdyA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBub2RlcyA9IHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3ID8gdGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XS5jaGlsZHJlbi5jb25jYXQoW10pIDogdGhpcy5fbW9kZWwuY2hhbmdlZC5jb25jYXQoW10pLFxuXHRcdFx0XHRmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVUwnKSwgdG1wLCBpLCBqLCBmZSA9IHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gbm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMucmVkcmF3X25vZGUobm9kZXNbaV0sIHRydWUsIHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3KTtcblx0XHRcdFx0aWYodG1wICYmIHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3KSB7XG5cdFx0XHRcdFx0Zi5hcHBlbmRDaGlsZCh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdykge1xuXHRcdFx0XHRmLmNsYXNzTmFtZSA9IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdLmNsYXNzTmFtZTtcblx0XHRcdFx0Zi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCdncm91cCcpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuZW1wdHkoKS5hcHBlbmQoZik7XG5cdFx0XHRcdC8vdGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0uYXBwZW5kQ2hpbGQoZik7XG5cdFx0XHR9XG5cdFx0XHRpZihmZSAhPT0gbnVsbCAmJiB0aGlzLnNldHRpbmdzLmNvcmUucmVzdG9yZV9mb2N1cykge1xuXHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKGZlLCB0cnVlKTtcblx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGggJiYgdG1wLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpWzBdICE9PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG5cdFx0XHRcdFx0dG1wLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fbW9kZWwuY2hhbmdlZCA9IFtdO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgYWZ0ZXIgbm9kZXMgYXJlIHJlZHJhd25cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgcmVkcmF3LmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHthcnJheX0gbm9kZXMgdGhlIHJlZHJhd24gbm9kZXNcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWRyYXcnLCB7IFwibm9kZXNcIiA6IG5vZGVzIH0pO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVkcmF3cyBhbGwgbm9kZXMgdGhhdCBuZWVkIHRvIGJlIHJlZHJhd24gb3Igb3B0aW9uYWxseSAtIHRoZSB3aG9sZSB0cmVlXG5cdFx0ICogQG5hbWUgcmVkcmF3KFtmdWxsXSlcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCBhbGwgbm9kZXMgYXJlIHJlZHJhd24uXG5cdFx0ICovXG5cdFx0cmVkcmF3IDogZnVuY3Rpb24gKGZ1bGwpIHtcblx0XHRcdGlmKGZ1bGwpIHtcblx0XHRcdFx0dGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0Ly9pZih0aGlzLl9tb2RlbC5yZWRyYXdfdGltZW91dCkge1xuXHRcdFx0Ly9cdGNsZWFyVGltZW91dCh0aGlzLl9tb2RlbC5yZWRyYXdfdGltZW91dCk7XG5cdFx0XHQvL31cblx0XHRcdC8vdGhpcy5fbW9kZWwucmVkcmF3X3RpbWVvdXQgPSBzZXRUaW1lb3V0KCQucHJveHkodGhpcy5fcmVkcmF3LCB0aGlzKSwwKTtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVkcmF3cyBhIHNpbmdsZSBub2RlJ3MgY2hpbGRyZW4uIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIGRyYXdfY2hpbGRyZW4obm9kZSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBub2RlIHRoZSBub2RlIHdob3NlIGNoaWxkcmVuIHdpbGwgYmUgcmVkcmF3blxuXHRcdCAqL1xuXHRcdGRyYXdfY2hpbGRyZW4gOiBmdW5jdGlvbiAobm9kZSkge1xuXHRcdFx0dmFyIG9iaiA9IHRoaXMuZ2V0X25vZGUobm9kZSksXG5cdFx0XHRcdGkgPSBmYWxzZSxcblx0XHRcdFx0aiA9IGZhbHNlLFxuXHRcdFx0XHRrID0gZmFsc2UsXG5cdFx0XHRcdGQgPSBkb2N1bWVudDtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZihvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIHRoaXMucmVkcmF3KHRydWUpOyB9XG5cdFx0XHRub2RlID0gdGhpcy5nZXRfbm9kZShub2RlLCB0cnVlKTtcblx0XHRcdGlmKCFub2RlIHx8ICFub2RlLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH0gLy8gVE9ETzogcXVpY2sgdG9nZ2xlXG5cblx0XHRcdG5vZGUuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKS5yZW1vdmUoKTtcblx0XHRcdG5vZGUgPSBub2RlWzBdO1xuXHRcdFx0aWYob2JqLmNoaWxkcmVuLmxlbmd0aCAmJiBvYmouc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdGsgPSBkLmNyZWF0ZUVsZW1lbnQoJ1VMJyk7XG5cdFx0XHRcdGsuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2dyb3VwJyk7XG5cdFx0XHRcdGsuY2xhc3NOYW1lID0gJ2pzdHJlZS1jaGlsZHJlbic7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRrLmFwcGVuZENoaWxkKHRoaXMucmVkcmF3X25vZGUob2JqLmNoaWxkcmVuW2ldLCB0cnVlLCB0cnVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bm9kZS5hcHBlbmRDaGlsZChrKTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJlZHJhd3MgYSBzaW5nbGUgbm9kZS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgcmVkcmF3X25vZGUobm9kZSwgZGVlcCwgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbmRlcilcblx0XHQgKiBAcGFyYW0ge21peGVkfSBub2RlIHRoZSBub2RlIHRvIHJlZHJhd1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVlcCBzaG91bGQgY2hpbGQgbm9kZXMgYmUgcmVkcmF3biB0b29cblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzX2NhbGxiYWNrIGlzIHRoaXMgYSByZWN1cnNpb24gY2FsbFxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2VfcmVuZGVyIHNob3VsZCBjaGlsZHJlbiBvZiBjbG9zZWQgcGFyZW50cyBiZSBkcmF3biBhbnl3YXlcblx0XHQgKi9cblx0XHRyZWRyYXdfbm9kZSA6IGZ1bmN0aW9uIChub2RlLCBkZWVwLCBpc19jYWxsYmFjaywgZm9yY2VfcmVuZGVyKSB7XG5cdFx0XHR2YXIgb2JqID0gdGhpcy5nZXRfbm9kZShub2RlKSxcblx0XHRcdFx0cGFyID0gZmFsc2UsXG5cdFx0XHRcdGluZCA9IGZhbHNlLFxuXHRcdFx0XHRvbGQgPSBmYWxzZSxcblx0XHRcdFx0aSA9IGZhbHNlLFxuXHRcdFx0XHRqID0gZmFsc2UsXG5cdFx0XHRcdGsgPSBmYWxzZSxcblx0XHRcdFx0YyA9ICcnLFxuXHRcdFx0XHRkID0gZG9jdW1lbnQsXG5cdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRmID0gZmFsc2UsXG5cdFx0XHRcdHMgPSBmYWxzZSxcblx0XHRcdFx0dG1wID0gbnVsbCxcblx0XHRcdFx0dCA9IDAsXG5cdFx0XHRcdGwgPSAwLFxuXHRcdFx0XHRoYXNfY2hpbGRyZW4gPSBmYWxzZSxcblx0XHRcdFx0bGFzdF9zaWJsaW5nID0gZmFsc2U7XG5cdFx0XHRpZighb2JqKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYob2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7ICByZXR1cm4gdGhpcy5yZWRyYXcodHJ1ZSk7IH1cblx0XHRcdGRlZXAgPSBkZWVwIHx8IG9iai5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG5cdFx0XHRub2RlID0gIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvYmouaWQpIDogdGhpcy5lbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJyMnICsgKFwiMDEyMzQ1Njc4OVwiLmluZGV4T2Yob2JqLmlkWzBdKSAhPT0gLTEgPyAnXFxcXDMnICsgb2JqLmlkWzBdICsgJyAnICsgb2JqLmlkLnN1YnN0cigxKS5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpIDogb2JqLmlkLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykpICk7IC8vLCB0aGlzLmVsZW1lbnQpO1xuXHRcdFx0aWYoIW5vZGUpIHtcblx0XHRcdFx0ZGVlcCA9IHRydWU7XG5cdFx0XHRcdC8vbm9kZSA9IGQuY3JlYXRlRWxlbWVudCgnTEknKTtcblx0XHRcdFx0aWYoIWlzX2NhbGxiYWNrKSB7XG5cdFx0XHRcdFx0cGFyID0gb2JqLnBhcmVudCAhPT0gJC5qc3RyZWUucm9vdCA/ICQoJyMnICsgb2JqLnBhcmVudC5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpLCB0aGlzLmVsZW1lbnQpWzBdIDogbnVsbDtcblx0XHRcdFx0XHRpZihwYXIgIT09IG51bGwgJiYgKCFwYXIgfHwgIW1bb2JqLnBhcmVudF0uc3RhdGUub3BlbmVkKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpbmQgPSAkLmluQXJyYXkob2JqLmlkLCBwYXIgPT09IG51bGwgPyBtWyQuanN0cmVlLnJvb3RdLmNoaWxkcmVuIDogbVtvYmoucGFyZW50XS5jaGlsZHJlbik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRub2RlID0gJChub2RlKTtcblx0XHRcdFx0aWYoIWlzX2NhbGxiYWNrKSB7XG5cdFx0XHRcdFx0cGFyID0gbm9kZS5wYXJlbnQoKS5wYXJlbnQoKVswXTtcblx0XHRcdFx0XHRpZihwYXIgPT09IHRoaXMuZWxlbWVudFswXSkge1xuXHRcdFx0XHRcdFx0cGFyID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aW5kID0gbm9kZS5pbmRleCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIG1bb2JqLmlkXS5kYXRhID0gbm9kZS5kYXRhKCk7IC8vIHVzZSBvbmx5IG5vZGUncyBkYXRhLCBubyBuZWVkIHRvIHRvdWNoIGpxdWVyeSBzdG9yYWdlXG5cdFx0XHRcdGlmKCFkZWVwICYmIG9iai5jaGlsZHJlbi5sZW5ndGggJiYgIW5vZGUuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkZWVwID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighZGVlcCkge1xuXHRcdFx0XHRcdG9sZCA9IG5vZGUuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKVswXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRmID0gbm9kZS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKVswXSA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHRcdFx0bm9kZS5yZW1vdmUoKTtcblx0XHRcdFx0Ly9ub2RlID0gZC5jcmVhdGVFbGVtZW50KCdMSScpO1xuXHRcdFx0XHQvL25vZGUgPSBub2RlWzBdO1xuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IHRoaXMuX2RhdGEuY29yZS5ub2RlLmNsb25lTm9kZSh0cnVlKTtcblx0XHRcdC8vIG5vZGUgaXMgRE9NLCBkZWVwIGlzIGJvb2xlYW5cblxuXHRcdFx0YyA9ICdqc3RyZWUtbm9kZSAnO1xuXHRcdFx0Zm9yKGkgaW4gb2JqLmxpX2F0dHIpIHtcblx0XHRcdFx0aWYob2JqLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRpZihpID09PSAnaWQnKSB7IGNvbnRpbnVlOyB9XG5cdFx0XHRcdFx0aWYoaSAhPT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0bm9kZS5zZXRBdHRyaWJ1dGUoaSwgb2JqLmxpX2F0dHJbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGMgKz0gb2JqLmxpX2F0dHJbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZighb2JqLmFfYXR0ci5pZCkge1xuXHRcdFx0XHRvYmouYV9hdHRyLmlkID0gb2JqLmlkICsgJ19hbmNob3InO1xuXHRcdFx0fVxuXHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsICEhb2JqLnN0YXRlLnNlbGVjdGVkKTtcblx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGV2ZWwnLCBvYmoucGFyZW50cy5sZW5ndGgpO1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jb3JlLmNvbXB1dGVfZWxlbWVudHNfcG9zaXRpb25zKSB7XG5cdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2V0c2l6ZScsIG1bb2JqLnBhcmVudF0uY2hpbGRyZW4ubGVuZ3RoKTtcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1wb3NpbnNldCcsIG1bb2JqLnBhcmVudF0uY2hpbGRyZW4uaW5kZXhPZihvYmouaWQpICsgMSk7XG5cdFx0XHR9XG5cdFx0XHRpZihvYmouc3RhdGUuZGlzYWJsZWQpIHtcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLnNldEF0dHJpYnV0ZSgnYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKCFtW29iai5jaGlsZHJlbltpXV0uc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdFx0aGFzX2NoaWxkcmVuID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYob2JqLnBhcmVudCAhPT0gbnVsbCAmJiBtW29iai5wYXJlbnRdICYmICFvYmouc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdGkgPSAkLmluQXJyYXkob2JqLmlkLCBtW29iai5wYXJlbnRdLmNoaWxkcmVuKTtcblx0XHRcdFx0bGFzdF9zaWJsaW5nID0gb2JqLmlkO1xuXHRcdFx0XHRpZihpICE9PSAtMSkge1xuXHRcdFx0XHRcdGkrKztcblx0XHRcdFx0XHRmb3IoaiA9IG1bb2JqLnBhcmVudF0uY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZighbVttW29iai5wYXJlbnRdLmNoaWxkcmVuW2ldXS5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0XHRcdFx0bGFzdF9zaWJsaW5nID0gbVtvYmoucGFyZW50XS5jaGlsZHJlbltpXTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKGxhc3Rfc2libGluZyAhPT0gb2JqLmlkKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZihvYmouc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdGMgKz0gJyBqc3RyZWUtaGlkZGVuJztcblx0XHRcdH1cblx0XHRcdGlmIChvYmouc3RhdGUubG9hZGluZykge1xuXHRcdFx0XHRjICs9ICcganN0cmVlLWxvYWRpbmcnO1xuXHRcdFx0fVxuXHRcdFx0aWYob2JqLnN0YXRlLmxvYWRlZCAmJiAhaGFzX2NoaWxkcmVuKSB7XG5cdFx0XHRcdGMgKz0gJyBqc3RyZWUtbGVhZic7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0YyArPSBvYmouc3RhdGUub3BlbmVkICYmIG9iai5zdGF0ZS5sb2FkZWQgPyAnIGpzdHJlZS1vcGVuJyA6ICcganN0cmVlLWNsb3NlZCc7XG5cdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAob2JqLnN0YXRlLm9wZW5lZCAmJiBvYmouc3RhdGUubG9hZGVkKSApO1xuXHRcdFx0fVxuXHRcdFx0aWYobGFzdF9zaWJsaW5nID09PSBvYmouaWQpIHtcblx0XHRcdFx0YyArPSAnIGpzdHJlZS1sYXN0Jztcblx0XHRcdH1cblx0XHRcdG5vZGUuaWQgPSBvYmouaWQ7XG5cdFx0XHRub2RlLmNsYXNzTmFtZSA9IGM7XG5cdFx0XHRjID0gKCBvYmouc3RhdGUuc2VsZWN0ZWQgPyAnIGpzdHJlZS1jbGlja2VkJyA6ICcnKSArICggb2JqLnN0YXRlLmRpc2FibGVkID8gJyBqc3RyZWUtZGlzYWJsZWQnIDogJycpO1xuXHRcdFx0Zm9yKGogaW4gb2JqLmFfYXR0cikge1xuXHRcdFx0XHRpZihvYmouYV9hdHRyLmhhc093blByb3BlcnR5KGopKSB7XG5cdFx0XHRcdFx0aWYoaiA9PT0gJ2hyZWYnICYmIG9iai5hX2F0dHJbal0gPT09ICcjJykgeyBjb250aW51ZTsgfVxuXHRcdFx0XHRcdGlmKGogIT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5zZXRBdHRyaWJ1dGUoaiwgb2JqLmFfYXR0cltqXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0YyArPSAnICcgKyBvYmouYV9hdHRyW2pdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYoYy5sZW5ndGgpIHtcblx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNsYXNzTmFtZSA9ICdqc3RyZWUtYW5jaG9yICcgKyBjO1xuXHRcdFx0fVxuXHRcdFx0aWYoKG9iai5pY29uICYmIG9iai5pY29uICE9PSB0cnVlKSB8fCBvYmouaWNvbiA9PT0gZmFsc2UpIHtcblx0XHRcdFx0aWYob2JqLmljb24gPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uY2xhc3NOYW1lICs9ICcganN0cmVlLXRoZW1laWNvbi1oaWRkZW4nO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2UgaWYob2JqLmljb24uaW5kZXhPZignLycpID09PSAtMSAmJiBvYmouaWNvbi5pbmRleE9mKCcuJykgPT09IC0xKSB7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uY2xhc3NOYW1lICs9ICcgJyArIG9iai5pY29uICsgJyBqc3RyZWUtdGhlbWVpY29uLWN1c3RvbSc7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicrb2JqLmljb24rJ1wiKSc7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0uc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gJ2NlbnRlciBjZW50ZXInO1xuXHRcdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzBdLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2F1dG8nO1xuXHRcdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzBdLmNsYXNzTmFtZSArPSAnIGpzdHJlZS10aGVtZWljb24tY3VzdG9tJztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvcmUuZm9yY2VfdGV4dCkge1xuXHRcdFx0XHRub2RlLmNoaWxkTm9kZXNbMV0uYXBwZW5kQ2hpbGQoZC5jcmVhdGVUZXh0Tm9kZShvYmoudGV4dCkpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdG5vZGUuY2hpbGROb2Rlc1sxXS5pbm5lckhUTUwgKz0gb2JqLnRleHQ7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoZGVlcCAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoICYmIChvYmouc3RhdGUub3BlbmVkIHx8IGZvcmNlX3JlbmRlcikgJiYgb2JqLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRrID0gZC5jcmVhdGVFbGVtZW50KCdVTCcpO1xuXHRcdFx0XHRrLnNldEF0dHJpYnV0ZSgncm9sZScsICdncm91cCcpO1xuXHRcdFx0XHRrLmNsYXNzTmFtZSA9ICdqc3RyZWUtY2hpbGRyZW4nO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0ay5hcHBlbmRDaGlsZCh0aGlzLnJlZHJhd19ub2RlKG9iai5jaGlsZHJlbltpXSwgZGVlcCwgdHJ1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5vZGUuYXBwZW5kQ2hpbGQoayk7XG5cdFx0XHR9XG5cdFx0XHRpZihvbGQpIHtcblx0XHRcdFx0bm9kZS5hcHBlbmRDaGlsZChvbGQpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIWlzX2NhbGxiYWNrKSB7XG5cdFx0XHRcdC8vIGFwcGVuZCBiYWNrIHVzaW5nIHBhciAvIGluZFxuXHRcdFx0XHRpZighcGFyKSB7XG5cdFx0XHRcdFx0cGFyID0gdGhpcy5lbGVtZW50WzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKHBhci5jaGlsZE5vZGVzW2ldICYmIHBhci5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZSAmJiBwYXIuY2hpbGROb2Rlc1tpXS5jbGFzc05hbWUuaW5kZXhPZignanN0cmVlLWNoaWxkcmVuJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSBwYXIuY2hpbGROb2Rlc1tpXTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdG1wKSB7XG5cdFx0XHRcdFx0dG1wID0gZC5jcmVhdGVFbGVtZW50KCdVTCcpO1xuXHRcdFx0XHRcdHRtcC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZ3JvdXAnKTtcblx0XHRcdFx0XHR0bXAuY2xhc3NOYW1lID0gJ2pzdHJlZS1jaGlsZHJlbic7XG5cdFx0XHRcdFx0cGFyLmFwcGVuZENoaWxkKHRtcCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cGFyID0gdG1wO1xuXG5cdFx0XHRcdGlmKGluZCA8IHBhci5jaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHBhci5pbnNlcnRCZWZvcmUobm9kZSwgcGFyLmNoaWxkTm9kZXNbaW5kXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0cGFyLmFwcGVuZENoaWxkKG5vZGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGYpIHtcblx0XHRcdFx0XHR0ID0gdGhpcy5lbGVtZW50WzBdLnNjcm9sbFRvcDtcblx0XHRcdFx0XHRsID0gdGhpcy5lbGVtZW50WzBdLnNjcm9sbExlZnQ7XG5cdFx0XHRcdFx0bm9kZS5jaGlsZE5vZGVzWzFdLmZvY3VzKCk7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50WzBdLnNjcm9sbFRvcCA9IHQ7XG5cdFx0XHRcdFx0dGhpcy5lbGVtZW50WzBdLnNjcm9sbExlZnQgPSBsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZihvYmouc3RhdGUub3BlbmVkICYmICFvYmouc3RhdGUubG9hZGVkKSB7XG5cdFx0XHRcdG9iai5zdGF0ZS5vcGVuZWQgPSBmYWxzZTtcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhpcy5vcGVuX25vZGUob2JqLmlkLCBmYWxzZSwgMCk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSwgMCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbm9kZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIG9wZW5zIGEgbm9kZSwgcmV2ZWFsaW5nIGl0cyBjaGlsZHJlbi4gSWYgdGhlIG5vZGUgaXMgbm90IGxvYWRlZCBpdCB3aWxsIGJlIGxvYWRlZCBhbmQgb3BlbmVkIG9uY2UgcmVhZHkuXG5cdFx0ICogQG5hbWUgb3Blbl9ub2RlKG9iaiBbLCBjYWxsYmFjaywgYW5pbWF0aW9uXSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gb3BlblxuXHRcdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gZXhlY3V0ZSBvbmNlIHRoZSBub2RlIGlzIG9wZW5lZFxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBhbmltYXRpb24gdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgd2hlbiBvcGVuaW5nIHRoZSBub2RlIChvdmVycmlkZXMgdGhlIGBjb3JlLmFuaW1hdGlvbmAgc2V0dGluZykuIFVzZSBgZmFsc2VgIGZvciBubyBhbmltYXRpb24uXG5cdFx0ICogQHRyaWdnZXIgb3Blbl9ub2RlLmpzdHJlZSwgYWZ0ZXJfb3Blbi5qc3RyZWUsIGJlZm9yZV9vcGVuLmpzdHJlZVxuXHRcdCAqL1xuXHRcdG9wZW5fbm9kZSA6IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrLCBhbmltYXRpb24pIHtcblx0XHRcdHZhciB0MSwgdDIsIGQsIHQ7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLm9wZW5fbm9kZShvYmpbdDFdLCBjYWxsYmFjaywgYW5pbWF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGFuaW1hdGlvbiA9IGFuaW1hdGlvbiA9PT0gdW5kZWZpbmVkID8gdGhpcy5zZXR0aW5ncy5jb3JlLmFuaW1hdGlvbiA6IGFuaW1hdGlvbjtcblx0XHRcdGlmKCF0aGlzLmlzX2Nsb3NlZChvYmopKSB7XG5cdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCBvYmosIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZighdGhpcy5pc19sb2FkZWQob2JqKSkge1xuXHRcdFx0XHRpZih0aGlzLmlzX2xvYWRpbmcob2JqKSkge1xuXHRcdFx0XHRcdHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXMub3Blbl9ub2RlKG9iaiwgY2FsbGJhY2ssIGFuaW1hdGlvbik7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpLCA1MDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMubG9hZF9ub2RlKG9iaiwgZnVuY3Rpb24gKG8sIG9rKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9rID8gdGhpcy5vcGVuX25vZGUobywgY2FsbGJhY2ssIGFuaW1hdGlvbikgOiAoY2FsbGJhY2sgPyBjYWxsYmFjay5jYWxsKHRoaXMsIG8sIGZhbHNlKSA6IGZhbHNlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZCA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdFx0dCA9IHRoaXM7XG5cdFx0XHRcdGlmKGQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0aWYoYW5pbWF0aW9uICYmIGQuY2hpbGRyZW4oXCIuanN0cmVlLWNoaWxkcmVuXCIpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0ZC5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuc3RvcCh0cnVlLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYob2JqLmNoaWxkcmVuLmxlbmd0aCAmJiAhdGhpcy5fZmlyc3RDaGlsZChkLmNoaWxkcmVuKCcuanN0cmVlLWNoaWxkcmVuJylbMF0pKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRyYXdfY2hpbGRyZW4ob2JqKTtcblx0XHRcdFx0XHRcdC8vZCA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoIWFuaW1hdGlvbikge1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVfb3BlbicsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdFx0XHRkWzBdLmNsYXNzTmFtZSA9IGRbMF0uY2xhc3NOYW1lLnJlcGxhY2UoJ2pzdHJlZS1jbG9zZWQnLCAnanN0cmVlLW9wZW4nKTtcblx0XHRcdFx0XHRcdGRbMF0uY2hpbGROb2Rlc1sxXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlcignYmVmb3JlX29wZW4nLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0XHRcdFx0ZFxuXHRcdFx0XHRcdFx0XHQuY2hpbGRyZW4oXCIuanN0cmVlLWNoaWxkcmVuXCIpLmNzcyhcImRpc3BsYXlcIixcIm5vbmVcIikuZW5kKClcblx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKFwianN0cmVlLWNsb3NlZFwiKS5hZGRDbGFzcyhcImpzdHJlZS1vcGVuXCIpXG5cdFx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIHRydWUpLmVuZCgpXG5cdFx0XHRcdFx0XHRcdC5jaGlsZHJlbihcIi5qc3RyZWUtY2hpbGRyZW5cIikuc3RvcCh0cnVlLCB0cnVlKVxuXHRcdFx0XHRcdFx0XHRcdC5zbGlkZURvd24oYW5pbWF0aW9uLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHQuZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0LnRyaWdnZXIoXCJhZnRlcl9vcGVuXCIsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdG9iai5zdGF0ZS5vcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRpZihjYWxsYmFjaykge1xuXHRcdFx0XHRcdGNhbGxiYWNrLmNhbGwodGhpcywgb2JqLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighZC5sZW5ndGgpIHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgYWJvdXQgdG8gYmUgb3BlbmVkIChpZiB0aGUgbm9kZSBpcyBzdXBwb3NlZCB0byBiZSBpbiB0aGUgRE9NLCBpdCB3aWxsIGJlLCBidXQgaXQgd29uJ3QgYmUgdmlzaWJsZSB5ZXQpXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQG5hbWUgYmVmb3JlX29wZW4uanN0cmVlXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIG9wZW5lZCBub2RlXG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdiZWZvcmVfb3BlbicsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBvcGVuZWQgKGlmIHRoZXJlIGlzIGFuIGFuaW1hdGlvbiBpdCB3aWxsIG5vdCBiZSBjb21wbGV0ZWQgeWV0KVxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgb3Blbl9ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgb3BlbmVkIG5vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignb3Blbl9ub2RlJywgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0aWYoIWFuaW1hdGlvbiB8fCAhZC5sZW5ndGgpIHtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgb3BlbmVkIGFuZCB0aGUgYW5pbWF0aW9uIGlzIGNvbXBsZXRlXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQG5hbWUgYWZ0ZXJfb3Blbi5qc3RyZWVcblx0XHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgb3BlbmVkIG5vZGVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoXCJhZnRlcl9vcGVuXCIsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBvcGVucyBldmVyeSBwYXJlbnQgb2YgYSBub2RlIChub2RlIHNob3VsZCBiZSBsb2FkZWQpXG5cdFx0ICogQG5hbWUgX29wZW5fdG8ob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byByZXZlYWxcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdF9vcGVuX3RvIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIGksIGosIHAgPSBvYmoucGFyZW50cztcblx0XHRcdGZvcihpID0gMCwgaiA9IHAubGVuZ3RoOyBpIDwgajsgaSs9MSkge1xuXHRcdFx0XHRpZihpICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0dGhpcy5vcGVuX25vZGUocFtpXSwgZmFsc2UsIDApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gJCgnIycgKyBvYmouaWQucmVwbGFjZSgkLmpzdHJlZS5pZHJlZ2V4LCdcXFxcJCYnKSwgdGhpcy5lbGVtZW50KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNsb3NlcyBhIG5vZGUsIGhpZGluZyBpdHMgY2hpbGRyZW5cblx0XHQgKiBAbmFtZSBjbG9zZV9ub2RlKG9iaiBbLCBhbmltYXRpb25dKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBjbG9zZVxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBhbmltYXRpb24gdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgd2hlbiBjbG9zaW5nIHRoZSBub2RlIChvdmVycmlkZXMgdGhlIGBjb3JlLmFuaW1hdGlvbmAgc2V0dGluZykuIFVzZSBgZmFsc2VgIGZvciBubyBhbmltYXRpb24uXG5cdFx0ICogQHRyaWdnZXIgY2xvc2Vfbm9kZS5qc3RyZWUsIGFmdGVyX2Nsb3NlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGNsb3NlX25vZGUgOiBmdW5jdGlvbiAob2JqLCBhbmltYXRpb24pIHtcblx0XHRcdHZhciB0MSwgdDIsIHQsIGQ7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmNsb3NlX25vZGUob2JqW3QxXSwgYW5pbWF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuaXNfY2xvc2VkKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0YW5pbWF0aW9uID0gYW5pbWF0aW9uID09PSB1bmRlZmluZWQgPyB0aGlzLnNldHRpbmdzLmNvcmUuYW5pbWF0aW9uIDogYW5pbWF0aW9uO1xuXHRcdFx0dCA9IHRoaXM7XG5cdFx0XHRkID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXG5cdFx0XHRvYmouc3RhdGUub3BlbmVkID0gZmFsc2U7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBjbG9zZWQgKGlmIHRoZXJlIGlzIGFuIGFuaW1hdGlvbiBpdCB3aWxsIG5vdCBiZSBjb21wbGV0ZSB5ZXQpXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNsb3NlX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgY2xvc2VkIG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjbG9zZV9ub2RlJyx7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0aWYoIWQubGVuZ3RoKSB7XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgY2xvc2VkIGFuZCB0aGUgYW5pbWF0aW9uIGlzIGNvbXBsZXRlXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSBhZnRlcl9jbG9zZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIGNsb3NlZCBub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoXCJhZnRlcl9jbG9zZVwiLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmKCFhbmltYXRpb24pIHtcblx0XHRcdFx0XHRkWzBdLmNsYXNzTmFtZSA9IGRbMF0uY2xhc3NOYW1lLnJlcGxhY2UoJ2pzdHJlZS1vcGVuJywgJ2pzdHJlZS1jbG9zZWQnKTtcblx0XHRcdFx0XHRkLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKTtcblx0XHRcdFx0XHRkLmNoaWxkcmVuKCcuanN0cmVlLWNoaWxkcmVuJykucmVtb3ZlKCk7XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKFwiYWZ0ZXJfY2xvc2VcIiwgeyBcIm5vZGVcIiA6IG9iaiB9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRkXG5cdFx0XHRcdFx0XHQuY2hpbGRyZW4oXCIuanN0cmVlLWNoaWxkcmVuXCIpLmF0dHIoXCJzdHlsZVwiLFwiZGlzcGxheTpibG9jayAhaW1wb3J0YW50XCIpLmVuZCgpXG5cdFx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtb3BlblwiKS5hZGRDbGFzcyhcImpzdHJlZS1jbG9zZWRcIilcblx0XHRcdFx0XHRcdFx0LmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmF0dHIoXCJhcmlhLWV4cGFuZGVkXCIsIGZhbHNlKS5lbmQoKVxuXHRcdFx0XHRcdFx0LmNoaWxkcmVuKFwiLmpzdHJlZS1jaGlsZHJlblwiKS5zdG9wKHRydWUsIHRydWUpLnNsaWRlVXAoYW5pbWF0aW9uLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdGQuY2hpbGRyZW4oJy5qc3RyZWUtY2hpbGRyZW4nKS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0aWYgKHQuZWxlbWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdHQudHJpZ2dlcihcImFmdGVyX2Nsb3NlXCIsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiB0b2dnbGVzIGEgbm9kZSAtIGNsb3NpbmcgaXQgaWYgaXQgaXMgb3Blbiwgb3BlbmluZyBpdCBpZiBpdCBpcyBjbG9zZWRcblx0XHQgKiBAbmFtZSB0b2dnbGVfbm9kZShvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIHRvZ2dsZVxuXHRcdCAqL1xuXHRcdHRvZ2dsZV9ub2RlIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0Mjtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMudG9nZ2xlX25vZGUob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLmlzX2Nsb3NlZChvYmopKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm9wZW5fbm9kZShvYmopO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5pc19vcGVuKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2xvc2Vfbm9kZShvYmopO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogb3BlbnMgYWxsIG5vZGVzIHdpdGhpbiBhIG5vZGUgKG9yIHRoZSB0cmVlKSwgcmV2ZWFsaW5nIHRoZWlyIGNoaWxkcmVuLiBJZiB0aGUgbm9kZSBpcyBub3QgbG9hZGVkIGl0IHdpbGwgYmUgbG9hZGVkIGFuZCBvcGVuZWQgb25jZSByZWFkeS5cblx0XHQgKiBAbmFtZSBvcGVuX2FsbChbb2JqLCBhbmltYXRpb24sIG9yaWdpbmFsX29ial0pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIG9wZW4gcmVjdXJzaXZlbHksIG9taXQgdG8gb3BlbiBhbGwgbm9kZXMgaW4gdGhlIHRyZWVcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gYW5pbWF0aW9uIHRoZSBhbmltYXRpb24gZHVyYXRpb24gaW4gbWlsbGlzZWNvbmRzIHdoZW4gb3BlbmluZyB0aGUgbm9kZXMsIHRoZSBkZWZhdWx0IGlzIG5vIGFuaW1hdGlvblxuXHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSByZWZlcmVuY2UgdG8gdGhlIG5vZGUgdGhhdCBzdGFydGVkIHRoZSBwcm9jZXNzIChpbnRlcm5hbCB1c2UpXG5cdFx0ICogQHRyaWdnZXIgb3Blbl9hbGwuanN0cmVlXG5cdFx0ICovXG5cdFx0b3Blbl9hbGwgOiBmdW5jdGlvbiAob2JqLCBhbmltYXRpb24sIG9yaWdpbmFsX29iaikge1xuXHRcdFx0aWYoIW9iaikgeyBvYmogPSAkLmpzdHJlZS5yb290OyB9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIGRvbSA9IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpIDogdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLCBpLCBqLCBfdGhpcztcblx0XHRcdGlmKCFkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKHRoaXMuaXNfY2xvc2VkKHRoaXMuX21vZGVsLmRhdGFbb2JqLmNoaWxkcmVuX2RbaV1dKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtpXV0uc3RhdGUub3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRoaXMudHJpZ2dlcignb3Blbl9hbGwnLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdFx0fVxuXHRcdFx0b3JpZ2luYWxfb2JqID0gb3JpZ2luYWxfb2JqIHx8IGRvbTtcblx0XHRcdF90aGlzID0gdGhpcztcblx0XHRcdGRvbSA9IHRoaXMuaXNfY2xvc2VkKG9iaikgPyBkb20uZmluZCgnLmpzdHJlZS1jbG9zZWQnKS5hZGRCYWNrKCkgOiBkb20uZmluZCgnLmpzdHJlZS1jbG9zZWQnKTtcblx0XHRcdGRvbS5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0X3RoaXMub3Blbl9ub2RlKFxuXHRcdFx0XHRcdHRoaXMsXG5cdFx0XHRcdFx0ZnVuY3Rpb24obm9kZSwgc3RhdHVzKSB7IGlmKHN0YXR1cyAmJiB0aGlzLmlzX3BhcmVudChub2RlKSkgeyB0aGlzLm9wZW5fYWxsKG5vZGUsIGFuaW1hdGlvbiwgb3JpZ2luYWxfb2JqKTsgfSB9LFxuXHRcdFx0XHRcdGFuaW1hdGlvbiB8fCAwXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHRcdGlmKG9yaWdpbmFsX29iai5maW5kKCcuanN0cmVlLWNsb3NlZCcpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gYG9wZW5fYWxsYCBjYWxsIGNvbXBsZXRlc1xuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgb3Blbl9hbGwuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBvcGVuZWQgbm9kZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdvcGVuX2FsbCcsIHsgXCJub2RlXCIgOiB0aGlzLmdldF9ub2RlKG9yaWdpbmFsX29iaikgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjbG9zZXMgYWxsIG5vZGVzIHdpdGhpbiBhIG5vZGUgKG9yIHRoZSB0cmVlKSwgcmV2ZWFsaW5nIHRoZWlyIGNoaWxkcmVuXG5cdFx0ICogQG5hbWUgY2xvc2VfYWxsKFtvYmosIGFuaW1hdGlvbl0pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGNsb3NlIHJlY3Vyc2l2ZWx5LCBvbWl0IHRvIGNsb3NlIGFsbCBub2RlcyBpbiB0aGUgdHJlZVxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBhbmltYXRpb24gdGhlIGFuaW1hdGlvbiBkdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgd2hlbiBjbG9zaW5nIHRoZSBub2RlcywgdGhlIGRlZmF1bHQgaXMgbm8gYW5pbWF0aW9uXG5cdFx0ICogQHRyaWdnZXIgY2xvc2VfYWxsLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGNsb3NlX2FsbCA6IGZ1bmN0aW9uIChvYmosIGFuaW1hdGlvbikge1xuXHRcdFx0aWYoIW9iaikgeyBvYmogPSAkLmpzdHJlZS5yb290OyB9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIGRvbSA9IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCA/IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpIDogdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLFxuXHRcdFx0XHRfdGhpcyA9IHRoaXMsIGksIGo7XG5cdFx0XHRpZihkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdGRvbSA9IHRoaXMuaXNfb3BlbihvYmopID8gZG9tLmZpbmQoJy5qc3RyZWUtb3BlbicpLmFkZEJhY2soKSA6IGRvbS5maW5kKCcuanN0cmVlLW9wZW4nKTtcblx0XHRcdFx0JChkb20uZ2V0KCkucmV2ZXJzZSgpKS5lYWNoKGZ1bmN0aW9uICgpIHsgX3RoaXMuY2xvc2Vfbm9kZSh0aGlzLCBhbmltYXRpb24gfHwgMCk7IH0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbb2JqLmNoaWxkcmVuX2RbaV1dLnN0YXRlLm9wZW5lZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBgY2xvc2VfYWxsYCBjYWxsIGNvbXBsZXRlc1xuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjbG9zZV9hbGwuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgY2xvc2VkIG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjbG9zZV9hbGwnLCB7IFwibm9kZVwiIDogb2JqIH0pO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2tzIGlmIGEgbm9kZSBpcyBkaXNhYmxlZCAobm90IHNlbGVjdGFibGUpXG5cdFx0ICogQG5hbWUgaXNfZGlzYWJsZWQob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdGlzX2Rpc2FibGVkIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuIG9iaiAmJiBvYmouc3RhdGUgJiYgb2JqLnN0YXRlLmRpc2FibGVkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZW5hYmxlcyBhIG5vZGUgLSBzbyB0aGF0IGl0IGNhbiBiZSBzZWxlY3RlZFxuXHRcdCAqIEBuYW1lIGVuYWJsZV9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gZW5hYmxlXG5cdFx0ICogQHRyaWdnZXIgZW5hYmxlX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0ZW5hYmxlX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5lbmFibGVfbm9kZShvYmpbdDFdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdG9iai5zdGF0ZS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5nZXRfbm9kZShvYmosdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCBmYWxzZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgZW5hYmxlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBlbmFibGVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBlbmFibGVkIG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdlbmFibGVfbm9kZScsIHsgJ25vZGUnIDogb2JqIH0pO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZGlzYWJsZXMgYSBub2RlIC0gc28gdGhhdCBpdCBjYW4gbm90IGJlIHNlbGVjdGVkXG5cdFx0ICogQG5hbWUgZGlzYWJsZV9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gZGlzYWJsZVxuXHRcdCAqIEB0cmlnZ2VyIGRpc2FibGVfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRkaXNhYmxlX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5kaXNhYmxlX25vZGUob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRvYmouc3RhdGUuZGlzYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5nZXRfbm9kZShvYmosdHJ1ZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3MoJ2pzdHJlZS1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBkaXNhYmxlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBkaXNhYmxlX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgZGlzYWJsZWQgbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2Rpc2FibGVfbm9kZScsIHsgJ25vZGUnIDogb2JqIH0pO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZGV0ZXJtaW5lcyBpZiBhIG5vZGUgaXMgaGlkZGVuXG5cdFx0ICogQG5hbWUgaXNfaGlkZGVuKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKi9cblx0XHRpc19oaWRkZW4gOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gb2JqLnN0YXRlLmhpZGRlbiA9PT0gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGhpZGVzIGEgbm9kZSAtIGl0IGlzIHN0aWxsIGluIHRoZSBzdHJ1Y3R1cmUgYnV0IHdpbGwgbm90IGJlIHZpc2libGVcblx0XHQgKiBAbmFtZSBoaWRlX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiB0aGUgbm9kZSB0byBoaWRlXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBza2lwX3JlZHJhdyBpbnRlcm5hbCBwYXJhbWV0ZXIgY29udHJvbGxpbmcgaWYgcmVkcmF3IGlzIGNhbGxlZFxuXHRcdCAqIEB0cmlnZ2VyIGhpZGVfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRoaWRlX25vZGUgOiBmdW5jdGlvbiAob2JqLCBza2lwX3JlZHJhdykge1xuXHRcdFx0dmFyIHQxLCB0Mjtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuaGlkZV9ub2RlKG9ialt0MV0sIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghc2tpcF9yZWRyYXcpIHtcblx0XHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9iai5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0b2JqLnN0YXRlLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdHRoaXMuX25vZGVfY2hhbmdlZChvYmoucGFyZW50KTtcblx0XHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvKipcblx0XHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYW4gbm9kZSBpcyBoaWRkZW5cblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIGhpZGVfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIGhpZGRlbiBub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2hpZGVfbm9kZScsIHsgJ25vZGUnIDogb2JqIH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2hvd3MgYSBub2RlXG5cdFx0ICogQG5hbWUgc2hvd19ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gc2hvd1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc2tpcF9yZWRyYXcgaW50ZXJuYWwgcGFyYW1ldGVyIGNvbnRyb2xsaW5nIGlmIHJlZHJhdyBpcyBjYWxsZWRcblx0XHQgKiBAdHJpZ2dlciBzaG93X25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0c2hvd19ub2RlIDogZnVuY3Rpb24gKG9iaiwgc2tpcF9yZWRyYXcpIHtcblx0XHRcdHZhciB0MSwgdDI7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLnNob3dfbm9kZShvYmpbdDFdLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKG9iai5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0b2JqLnN0YXRlLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQob2JqLnBhcmVudCk7XG5cdFx0XHRcdGlmKCFza2lwX3JlZHJhdykge1xuXHRcdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgc2hvd25cblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIHNob3dfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIHNob3duIG5vZGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19ub2RlJywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoaWRlcyBhbGwgbm9kZXNcblx0XHQgKiBAbmFtZSBoaWRlX2FsbCgpXG5cdFx0ICogQHRyaWdnZXIgaGlkZV9hbGwuanN0cmVlXG5cdFx0ICovXG5cdFx0aGlkZV9hbGwgOiBmdW5jdGlvbiAoc2tpcF9yZWRyYXcpIHtcblx0XHRcdHZhciBpLCBtID0gdGhpcy5fbW9kZWwuZGF0YSwgaWRzID0gW107XG5cdFx0XHRmb3IoaSBpbiBtKSB7XG5cdFx0XHRcdGlmKG0uaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJC5qc3RyZWUucm9vdCAmJiAhbVtpXS5zdGF0ZS5oaWRkZW4pIHtcblx0XHRcdFx0XHRtW2ldLnN0YXRlLmhpZGRlbiA9IHRydWU7XG5cdFx0XHRcdFx0aWRzLnB1c2goaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3ID0gdHJ1ZTtcblx0XHRcdGlmKCFza2lwX3JlZHJhdykge1xuXHRcdFx0XHR0aGlzLnJlZHJhdygpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbGwgbm9kZXMgYXJlIGhpZGRlblxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBoaWRlX2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IG5vZGVzIHRoZSBJRHMgb2YgYWxsIGhpZGRlbiBub2Rlc1xuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2hpZGVfYWxsJywgeyAnbm9kZXMnIDogaWRzIH0pO1xuXHRcdFx0cmV0dXJuIGlkcztcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHNob3dzIGFsbCBub2Rlc1xuXHRcdCAqIEBuYW1lIHNob3dfYWxsKClcblx0XHQgKiBAdHJpZ2dlciBzaG93X2FsbC5qc3RyZWVcblx0XHQgKi9cblx0XHRzaG93X2FsbCA6IGZ1bmN0aW9uIChza2lwX3JlZHJhdykge1xuXHRcdFx0dmFyIGksIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBpZHMgPSBbXTtcblx0XHRcdGZvcihpIGluIG0pIHtcblx0XHRcdFx0aWYobS5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAkLmpzdHJlZS5yb290ICYmIG1baV0uc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdFx0bVtpXS5zdGF0ZS5oaWRkZW4gPSBmYWxzZTtcblx0XHRcdFx0XHRpZHMucHVzaChpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcgPSB0cnVlO1xuXHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgc2hvd25cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2hvd19hbGwuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBub2RlcyB0aGUgSURzIG9mIGFsbCBzaG93biBub2Rlc1xuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nob3dfYWxsJywgeyAnbm9kZXMnIDogaWRzIH0pO1xuXHRcdFx0cmV0dXJuIGlkcztcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNhbGxlZCB3aGVuIGEgbm9kZSBpcyBzZWxlY3RlZCBieSB0aGUgdXNlci4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgYWN0aXZhdGVfbm9kZShvYmosIGUpXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IGUgdGhlIHJlbGF0ZWQgZXZlbnRcblx0XHQgKiBAdHJpZ2dlciBhY3RpdmF0ZV9ub2RlLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRhY3RpdmF0ZV9ub2RlIDogZnVuY3Rpb24gKG9iaiwgZSkge1xuXHRcdFx0aWYodGhpcy5pc19kaXNhYmxlZChvYmopKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKCFlIHx8IHR5cGVvZiBlICE9PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRlID0ge307XG5cdFx0XHR9XG5cblx0XHRcdC8vIGVuc3VyZSBsYXN0X2NsaWNrZWQgaXMgc3RpbGwgaW4gdGhlIERPTSwgbWFrZSBpdCBmcmVzaCAobWF5YmUgaXQgd2FzIG1vdmVkPykgYW5kIG1ha2Ugc3VyZSBpdCBpcyBzdGlsbCBzZWxlY3RlZCwgaWYgbm90IC0gbWFrZSBsYXN0X2NsaWNrZWQgdGhlIGxhc3Qgc2VsZWN0ZWQgbm9kZVxuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCA9IHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgJiYgdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZC5pZCAhPT0gdW5kZWZpbmVkID8gdGhpcy5nZXRfbm9kZSh0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkLmlkKSA6IG51bGw7XG5cdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkICYmICF0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkLnN0YXRlLnNlbGVjdGVkKSB7IHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgPSBudWxsOyB9XG5cdFx0XHRpZighdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZCAmJiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQubGVuZ3RoKSB7IHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgPSB0aGlzLmdldF9ub2RlKHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZFt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQubGVuZ3RoIC0gMV0pOyB9XG5cblx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNvcmUubXVsdGlwbGUgfHwgKCFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSAmJiAhZS5zaGlmdEtleSkgfHwgKGUuc2hpZnRLZXkgJiYgKCF0aGlzLl9kYXRhLmNvcmUubGFzdF9jbGlja2VkIHx8ICF0aGlzLmdldF9wYXJlbnQob2JqKSB8fCB0aGlzLmdldF9wYXJlbnQob2JqKSAhPT0gdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZC5wYXJlbnQgKSApKSB7XG5cdFx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNvcmUubXVsdGlwbGUgJiYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSkgJiYgdGhpcy5pc19zZWxlY3RlZChvYmopKSB7XG5cdFx0XHRcdFx0dGhpcy5kZXNlbGVjdF9ub2RlKG9iaiwgZmFsc2UsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuZGVzZWxlY3RfYWxsKHRydWUpO1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0X25vZGUob2JqLCBmYWxzZSwgZmFsc2UsIGUpO1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZihlLnNoaWZ0S2V5KSB7XG5cdFx0XHRcdFx0dmFyIG8gPSB0aGlzLmdldF9ub2RlKG9iaikuaWQsXG5cdFx0XHRcdFx0XHRsID0gdGhpcy5fZGF0YS5jb3JlLmxhc3RfY2xpY2tlZC5pZCxcblx0XHRcdFx0XHRcdHAgPSB0aGlzLmdldF9ub2RlKHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQucGFyZW50KS5jaGlsZHJlbixcblx0XHRcdFx0XHRcdGMgPSBmYWxzZSxcblx0XHRcdFx0XHRcdGksIGo7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5sZW5ndGg7IGkgPCBqOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdC8vIHNlcGFyYXRlIElGcyB3b3JrIHdoZW0gbyBhbmQgbCBhcmUgdGhlIHNhbWVcblx0XHRcdFx0XHRcdGlmKHBbaV0gPT09IG8pIHtcblx0XHRcdFx0XHRcdFx0YyA9ICFjO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYocFtpXSA9PT0gbCkge1xuXHRcdFx0XHRcdFx0XHRjID0gIWM7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZighdGhpcy5pc19kaXNhYmxlZChwW2ldKSAmJiAoYyB8fCBwW2ldID09PSBvIHx8IHBbaV0gPT09IGwpKSB7XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5pc19oaWRkZW4ocFtpXSkpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNlbGVjdF9ub2RlKHBbaV0sIHRydWUsIGZhbHNlLCBlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZGVzZWxlY3Rfbm9kZShwW2ldLCB0cnVlLCBlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdzZWxlY3Rfbm9kZScsICdub2RlJyA6IHRoaXMuZ2V0X25vZGUob2JqKSwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aWYoIXRoaXMuaXNfc2VsZWN0ZWQob2JqKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3Rfbm9kZShvYmosIGZhbHNlLCBmYWxzZSwgZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5kZXNlbGVjdF9ub2RlKG9iaiwgZmFsc2UsIGUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBub2RlIGlzIGNsaWNrZWQgb3IgaW50ZXJjYXRlZCB3aXRoIGJ5IHRoZSB1c2VyXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGFjdGl2YXRlX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBvb3JpZ2luYWwgZXZlbnQgKGlmIGFueSkgd2hpY2ggdHJpZ2dlcmVkIHRoZSBjYWxsIChtYXkgYmUgYW4gZW1wdHkgb2JqZWN0KVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2FjdGl2YXRlX25vZGUnLCB7ICdub2RlJyA6IHRoaXMuZ2V0X25vZGUob2JqKSwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBhcHBsaWVzIHRoZSBob3ZlciBzdGF0ZSBvbiBhIG5vZGUsIGNhbGxlZCB3aGVuIGEgbm9kZSBpcyBob3ZlcmVkIGJ5IHRoZSB1c2VyLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBob3Zlcl9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmpcblx0XHQgKiBAdHJpZ2dlciBob3Zlcl9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGhvdmVyX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZighb2JqIHx8ICFvYmoubGVuZ3RoIHx8IG9iai5jaGlsZHJlbignLmpzdHJlZS1ob3ZlcmVkJykubGVuZ3RoKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBvID0gdGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtaG92ZXJlZCcpLCB0ID0gdGhpcy5lbGVtZW50O1xuXHRcdFx0aWYobyAmJiBvLmxlbmd0aCkgeyB0aGlzLmRlaG92ZXJfbm9kZShvKTsgfVxuXG5cdFx0XHRvYmouY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3MoJ2pzdHJlZS1ob3ZlcmVkJyk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgaG92ZXJlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBob3Zlcl9ub2RlLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdob3Zlcl9ub2RlJywgeyAnbm9kZScgOiB0aGlzLmdldF9ub2RlKG9iaikgfSk7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdC5hdHRyKCdhcmlhLWFjdGl2ZWRlc2NlbmRhbnQnLCBvYmpbMF0uaWQpOyB9LCAwKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJlbW92ZXMgdGhlIGhvdmVyIHN0YXRlIGZyb20gYSBub2RlY2FsbGVkIHdoZW4gYSBub2RlIGlzIG5vIGxvbmdlciBob3ZlcmVkIGJ5IHRoZSB1c2VyLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBkZWhvdmVyX25vZGUob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9ialxuXHRcdCAqIEB0cmlnZ2VyIGRlaG92ZXJfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRkZWhvdmVyX25vZGUgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZighb2JqIHx8ICFvYmoubGVuZ3RoIHx8ICFvYmouY2hpbGRyZW4oJy5qc3RyZWUtaG92ZXJlZCcpLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRvYmouY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1ob3ZlcmVkJyk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgbm8gbG9uZ2VyIGhvdmVyZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgZGVob3Zlcl9ub2RlLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZWhvdmVyX25vZGUnLCB7ICdub2RlJyA6IHRoaXMuZ2V0X25vZGUob2JqKSB9KTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHNlbGVjdCBhIG5vZGVcblx0XHQgKiBAbmFtZSBzZWxlY3Rfbm9kZShvYmogWywgc3VwcmVzc19ldmVudCwgcHJldmVudF9vcGVuXSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogYW4gYXJyYXkgY2FuIGJlIHVzZWQgdG8gc2VsZWN0IG11bHRpcGxlIG5vZGVzXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBzdXByZXNzX2V2ZW50IGlmIHNldCB0byBgdHJ1ZWAgdGhlIGBjaGFuZ2VkLmpzdHJlZWAgZXZlbnQgd29uJ3QgYmUgdHJpZ2dlcmVkXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBwcmV2ZW50X29wZW4gaWYgc2V0IHRvIGB0cnVlYCBwYXJlbnRzIG9mIHRoZSBzZWxlY3RlZCBub2RlIHdvbid0IGJlIG9wZW5lZFxuXHRcdCAqIEB0cmlnZ2VyIHNlbGVjdF9ub2RlLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRzZWxlY3Rfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHN1cHJlc3NfZXZlbnQsIHByZXZlbnRfb3BlbiwgZSkge1xuXHRcdFx0dmFyIGRvbSwgdDEsIHQyLCB0aDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuc2VsZWN0X25vZGUob2JqW3QxXSwgc3VwcmVzc19ldmVudCwgcHJldmVudF9vcGVuLCBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKCFvYmouc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLnB1c2gob2JqLmlkKTtcblx0XHRcdFx0aWYoIXByZXZlbnRfb3Blbikge1xuXHRcdFx0XHRcdGRvbSA9IHRoaXMuX29wZW5fdG8ob2JqKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihkb20gJiYgZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcygnanN0cmVlLWNsaWNrZWQnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgc2VsZWN0ZWRcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIHNlbGVjdF9ub2RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IGV2ZW50IHRoZSBldmVudCAoaWYgYW55KSB0aGF0IHRyaWdnZXJlZCB0aGlzIHNlbGVjdF9ub2RlXG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3NlbGVjdF9ub2RlJywgeyAnbm9kZScgOiBvYmosICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsICdldmVudCcgOiBlIH0pO1xuXHRcdFx0XHRpZighc3VwcmVzc19ldmVudCkge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIHNlbGVjdGlvbiBjaGFuZ2VzXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQG5hbWUgY2hhbmdlZC5qc3RyZWVcblx0XHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gdGhlIGFjdGlvbiB0aGF0IGNhdXNlZCB0aGUgc2VsZWN0aW9uIHRvIGNoYW5nZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgKGlmIGFueSkgdGhhdCB0cmlnZ2VyZWQgdGhpcyBjaGFuZ2VkIGV2ZW50XG5cdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdzZWxlY3Rfbm9kZScsICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGRlc2VsZWN0IGEgbm9kZVxuXHRcdCAqIEBuYW1lIGRlc2VsZWN0X25vZGUob2JqIFssIHN1cHJlc3NfZXZlbnRdKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiBhbiBhcnJheSBjYW4gYmUgdXNlZCB0byBkZXNlbGVjdCBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VwcmVzc19ldmVudCBpZiBzZXQgdG8gYHRydWVgIHRoZSBgY2hhbmdlZC5qc3RyZWVgIGV2ZW50IHdvbid0IGJlIHRyaWdnZXJlZFxuXHRcdCAqIEB0cmlnZ2VyIGRlc2VsZWN0X25vZGUuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGRlc2VsZWN0X25vZGUgOiBmdW5jdGlvbiAob2JqLCBzdXByZXNzX2V2ZW50LCBlKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBkb207XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmRlc2VsZWN0X25vZGUob2JqW3QxXSwgc3VwcmVzc19ldmVudCwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZihvYmouc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X3JlbW92ZV9pdGVtKHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgb2JqLmlkKTtcblx0XHRcdFx0aWYoZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRvbS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcygnanN0cmVlLWNsaWNrZWQnKS5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBub2RlIGlzIGRlc2VsZWN0ZWRcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIGRlc2VsZWN0X25vZGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGV2ZW50IChpZiBhbnkpIHRoYXQgdHJpZ2dlcmVkIHRoaXMgZGVzZWxlY3Rfbm9kZVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdkZXNlbGVjdF9ub2RlJywgeyAnbm9kZScgOiBvYmosICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsICdldmVudCcgOiBlIH0pO1xuXHRcdFx0XHRpZighc3VwcmVzc19ldmVudCkge1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlZCcsIHsgJ2FjdGlvbicgOiAnZGVzZWxlY3Rfbm9kZScsICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHNlbGVjdCBhbGwgbm9kZXMgaW4gdGhlIHRyZWVcblx0XHQgKiBAbmFtZSBzZWxlY3RfYWxsKFtzdXByZXNzX2V2ZW50XSlcblx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IHN1cHJlc3NfZXZlbnQgaWYgc2V0IHRvIGB0cnVlYCB0aGUgYGNoYW5nZWQuanN0cmVlYCBldmVudCB3b24ndCBiZSB0cmlnZ2VyZWRcblx0XHQgKiBAdHJpZ2dlciBzZWxlY3RfYWxsLmpzdHJlZSwgY2hhbmdlZC5qc3RyZWVcblx0XHQgKi9cblx0XHRzZWxlY3RfYWxsIDogZnVuY3Rpb24gKHN1cHJlc3NfZXZlbnQpIHtcblx0XHRcdHZhciB0bXAgPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KFtdKSwgaSwgajtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9IHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0uY2hpbGRyZW5fZC5jb25jYXQoKTtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV1dKSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV1dLnN0YXRlLnNlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZWRyYXcodHJ1ZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgc2VsZWN0ZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2VsZWN0X2FsbC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NlbGVjdF9hbGwnLCB7ICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgfSk7XG5cdFx0XHRpZighc3VwcmVzc19ldmVudCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZWQnLCB7ICdhY3Rpb24nIDogJ3NlbGVjdF9hbGwnLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCAnb2xkX3NlbGVjdGlvbicgOiB0bXAgfSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBkZXNlbGVjdCBhbGwgc2VsZWN0ZWQgbm9kZXNcblx0XHQgKiBAbmFtZSBkZXNlbGVjdF9hbGwoW3N1cHJlc3NfZXZlbnRdKVxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VwcmVzc19ldmVudCBpZiBzZXQgdG8gYHRydWVgIHRoZSBgY2hhbmdlZC5qc3RyZWVgIGV2ZW50IHdvbid0IGJlIHRyaWdnZXJlZFxuXHRcdCAqIEB0cmlnZ2VyIGRlc2VsZWN0X2FsbC5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICovXG5cdFx0ZGVzZWxlY3RfYWxsIDogZnVuY3Rpb24gKHN1cHJlc3NfZXZlbnQpIHtcblx0XHRcdHZhciB0bXAgPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KFtdKSwgaSwgajtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV1dKSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV1dLnN0YXRlLnNlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCA9IFtdO1xuXHRcdFx0dGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtY2xpY2tlZCcpLnJlbW92ZUNsYXNzKCdqc3RyZWUtY2xpY2tlZCcpLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgZGVzZWxlY3RlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBkZXNlbGVjdF9hbGwuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgcHJldmlvdXMgc2VsZWN0aW9uXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdkZXNlbGVjdF9hbGwnLCB7ICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsICdub2RlJyA6IHRtcCB9KTtcblx0XHRcdGlmKCFzdXByZXNzX2V2ZW50KSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hhbmdlZCcsIHsgJ2FjdGlvbicgOiAnZGVzZWxlY3RfYWxsJywgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ29sZF9zZWxlY3Rpb24nIDogdG1wIH0pO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY2hlY2tzIGlmIGEgbm9kZSBpcyBzZWxlY3RlZFxuXHRcdCAqIEBuYW1lIGlzX3NlbGVjdGVkKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIG9ialxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNfc2VsZWN0ZWQgOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqLnN0YXRlLnNlbGVjdGVkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IGFuIGFycmF5IG9mIGFsbCBzZWxlY3RlZCBub2Rlc1xuXHRcdCAqIEBuYW1lIGdldF9zZWxlY3RlZChbZnVsbF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICBmdWxsIGlmIHNldCB0byBgdHJ1ZWAgdGhlIHJldHVybmVkIGFycmF5IHdpbGwgY29uc2lzdCBvZiB0aGUgZnVsbCBub2RlIG9iamVjdHMsIG90aGVyd2lzZSAtIG9ubHkgSURzIHdpbGwgYmUgcmV0dXJuZWRcblx0XHQgKiBAcmV0dXJuIHtBcnJheX1cblx0XHQgKi9cblx0XHRnZXRfc2VsZWN0ZWQgOiBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0cmV0dXJuIGZ1bGwgPyAkLm1hcCh0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQsIGZ1bmN0aW9uIChpKSB7IHJldHVybiB0aGlzLmdldF9ub2RlKGkpOyB9LmJpbmQodGhpcykpIDogdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLnNsaWNlKCk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgYW4gYXJyYXkgb2YgYWxsIHRvcCBsZXZlbCBzZWxlY3RlZCBub2RlcyAoaWdub3JpbmcgY2hpbGRyZW4gb2Ygc2VsZWN0ZWQgbm9kZXMpXG5cdFx0ICogQG5hbWUgZ2V0X3RvcF9zZWxlY3RlZChbZnVsbF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICBmdWxsIGlmIHNldCB0byBgdHJ1ZWAgdGhlIHJldHVybmVkIGFycmF5IHdpbGwgY29uc2lzdCBvZiB0aGUgZnVsbCBub2RlIG9iamVjdHMsIG90aGVyd2lzZSAtIG9ubHkgSURzIHdpbGwgYmUgcmV0dXJuZWRcblx0XHQgKiBAcmV0dXJuIHtBcnJheX1cblx0XHQgKi9cblx0XHRnZXRfdG9wX3NlbGVjdGVkIDogZnVuY3Rpb24gKGZ1bGwpIHtcblx0XHRcdHZhciB0bXAgPSB0aGlzLmdldF9zZWxlY3RlZCh0cnVlKSxcblx0XHRcdFx0b2JqID0ge30sIGksIGosIGssIGw7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdG9ialt0bXBbaV0uaWRdID0gdG1wW2ldO1xuXHRcdFx0fVxuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRmb3IoayA9IDAsIGwgPSB0bXBbaV0uY2hpbGRyZW5fZC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRpZihvYmpbdG1wW2ldLmNoaWxkcmVuX2Rba11dKSB7XG5cdFx0XHRcdFx0XHRkZWxldGUgb2JqW3RtcFtpXS5jaGlsZHJlbl9kW2tdXTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRtcCA9IFtdO1xuXHRcdFx0Zm9yKGkgaW4gb2JqKSB7XG5cdFx0XHRcdGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdHRtcC5wdXNoKGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZnVsbCA/ICQubWFwKHRtcCwgZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHRoaXMuZ2V0X25vZGUoaSk7IH0uYmluZCh0aGlzKSkgOiB0bXA7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgYW4gYXJyYXkgb2YgYWxsIGJvdHRvbSBsZXZlbCBzZWxlY3RlZCBub2RlcyAoaWdub3Jpbmcgc2VsZWN0ZWQgcGFyZW50cylcblx0XHQgKiBAbmFtZSBnZXRfYm90dG9tX3NlbGVjdGVkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqL1xuXHRcdGdldF9ib3R0b21fc2VsZWN0ZWQgOiBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0dmFyIHRtcCA9IHRoaXMuZ2V0X3NlbGVjdGVkKHRydWUpLFxuXHRcdFx0XHRvYmogPSBbXSwgaSwgajtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYoIXRtcFtpXS5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRvYmoucHVzaCh0bXBbaV0uaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZnVsbCA/ICQubWFwKG9iaiwgZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHRoaXMuZ2V0X25vZGUoaSk7IH0uYmluZCh0aGlzKSkgOiBvYmo7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSB0cmVlIHNvIHRoYXQgaXQgY2FuIGJlIHJlc3RvcmVkIGxhdGVyIHdpdGggYHNldF9zdGF0ZShzdGF0ZSlgLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQG5hbWUgZ2V0X3N0YXRlKClcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEByZXR1cm4ge09iamVjdH1cblx0XHQgKi9cblx0XHRnZXRfc3RhdGUgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgc3RhdGVcdD0ge1xuXHRcdFx0XHQnY29yZScgOiB7XG5cdFx0XHRcdFx0J29wZW4nIDogW10sXG5cdFx0XHRcdFx0J2xvYWRlZCcgOiBbXSxcblx0XHRcdFx0XHQnc2Nyb2xsJyA6IHtcblx0XHRcdFx0XHRcdCdsZWZ0JyA6IHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0KCksXG5cdFx0XHRcdFx0XHQndG9wJyA6IHRoaXMuZWxlbWVudC5zY3JvbGxUb3AoKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0LyohXG5cdFx0XHRcdFx0J3RoZW1lcycgOiB7XG5cdFx0XHRcdFx0XHQnbmFtZScgOiB0aGlzLmdldF90aGVtZSgpLFxuXHRcdFx0XHRcdFx0J2ljb25zJyA6IHRoaXMuX2RhdGEuY29yZS50aGVtZXMuaWNvbnMsXG5cdFx0XHRcdFx0XHQnZG90cycgOiB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHNcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0J3NlbGVjdGVkJyA6IFtdXG5cdFx0XHRcdH1cblx0XHRcdH0sIGk7XG5cdFx0XHRmb3IoaSBpbiB0aGlzLl9tb2RlbC5kYXRhKSB7XG5cdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGEuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRpZihpICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW2ldLnN0YXRlLmxvYWRlZCAmJiB0aGlzLnNldHRpbmdzLmNvcmUubG9hZGVkX3N0YXRlKSB7XG5cdFx0XHRcdFx0XHRcdHN0YXRlLmNvcmUubG9hZGVkLnB1c2goaSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW2ldLnN0YXRlLm9wZW5lZCkge1xuXHRcdFx0XHRcdFx0XHRzdGF0ZS5jb3JlLm9wZW4ucHVzaChpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbaV0uc3RhdGUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdFx0c3RhdGUuY29yZS5zZWxlY3RlZC5wdXNoKGkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2V0cyB0aGUgc3RhdGUgb2YgdGhlIHRyZWUuIFVzZWQgaW50ZXJuYWxseS5cblx0XHQgKiBAbmFtZSBzZXRfc3RhdGUoc3RhdGUgWywgY2FsbGJhY2tdKVxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHBhcmFtIHtPYmplY3R9IHN0YXRlIHRoZSBzdGF0ZSB0byByZXN0b3JlLiBLZWVwIGluIG1pbmQgdGhpcyBvYmplY3QgaXMgcGFzc2VkIGJ5IHJlZmVyZW5jZSBhbmQganN0cmVlIHdpbGwgbW9kaWZ5IGl0LlxuXHRcdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgb25jZSB0aGUgc3RhdGUgaXMgcmVzdG9yZWQuXG5cdFx0ICogQHRyaWdnZXIgc2V0X3N0YXRlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNldF9zdGF0ZSA6IGZ1bmN0aW9uIChzdGF0ZSwgY2FsbGJhY2spIHtcblx0XHRcdGlmKHN0YXRlKSB7XG5cdFx0XHRcdGlmKHN0YXRlLmNvcmUgJiYgc3RhdGUuY29yZS5zZWxlY3RlZCAmJiBzdGF0ZS5jb3JlLmluaXRpYWxfc2VsZWN0aW9uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRzdGF0ZS5jb3JlLmluaXRpYWxfc2VsZWN0aW9uID0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmNvbmNhdChbXSkuc29ydCgpLmpvaW4oJywnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZihzdGF0ZS5jb3JlKSB7XG5cdFx0XHRcdFx0dmFyIHJlcywgbiwgdCwgX3RoaXMsIGk7XG5cdFx0XHRcdFx0aWYoc3RhdGUuY29yZS5sb2FkZWQpIHtcblx0XHRcdFx0XHRcdGlmKCF0aGlzLnNldHRpbmdzLmNvcmUubG9hZGVkX3N0YXRlIHx8ICEkLnZha2F0YS5pc19hcnJheShzdGF0ZS5jb3JlLmxvYWRlZCkgfHwgIXN0YXRlLmNvcmUubG9hZGVkLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgc3RhdGUuY29yZS5sb2FkZWQ7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9hZF9ub2RlcyhzdGF0ZS5jb3JlLmxvYWRlZCwgZnVuY3Rpb24gKG5vZGVzKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmUubG9hZGVkO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZihzdGF0ZS5jb3JlLm9wZW4pIHtcblx0XHRcdFx0XHRcdGlmKCEkLnZha2F0YS5pc19hcnJheShzdGF0ZS5jb3JlLm9wZW4pIHx8ICFzdGF0ZS5jb3JlLm9wZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jb3JlLm9wZW47XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9hZF9ub2RlcyhzdGF0ZS5jb3JlLm9wZW4sIGZ1bmN0aW9uIChub2Rlcykge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMub3Blbl9ub2RlKG5vZGVzLCBmYWxzZSwgMCk7XG5cdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmUub3Blbjtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldF9zdGF0ZShzdGF0ZSwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoc3RhdGUuY29yZS5zY3JvbGwpIHtcblx0XHRcdFx0XHRcdGlmKHN0YXRlLmNvcmUuc2Nyb2xsICYmIHN0YXRlLmNvcmUuc2Nyb2xsLmxlZnQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdChzdGF0ZS5jb3JlLnNjcm9sbC5sZWZ0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHN0YXRlLmNvcmUuc2Nyb2xsICYmIHN0YXRlLmNvcmUuc2Nyb2xsLnRvcCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5zY3JvbGxUb3Aoc3RhdGUuY29yZS5zY3JvbGwudG9wKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jb3JlLnNjcm9sbDtcblx0XHRcdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHN0YXRlLmNvcmUuc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRcdF90aGlzID0gdGhpcztcblx0XHRcdFx0XHRcdGlmIChzdGF0ZS5jb3JlLmluaXRpYWxfc2VsZWN0aW9uID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHRcdFx0c3RhdGUuY29yZS5pbml0aWFsX3NlbGVjdGlvbiA9PT0gdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLmNvbmNhdChbXSkuc29ydCgpLmpvaW4oJywnKVxuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZGVzZWxlY3RfYWxsKCk7XG5cdFx0XHRcdFx0XHRcdCQuZWFjaChzdGF0ZS5jb3JlLnNlbGVjdGVkLCBmdW5jdGlvbiAoaSwgdikge1xuXHRcdFx0XHRcdFx0XHRcdF90aGlzLnNlbGVjdF9ub2RlKHYsIGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkZWxldGUgc3RhdGUuY29yZS5pbml0aWFsX3NlbGVjdGlvbjtcblx0XHRcdFx0XHRcdGRlbGV0ZSBzdGF0ZS5jb3JlLnNlbGVjdGVkO1xuXHRcdFx0XHRcdFx0dGhpcy5zZXRfc3RhdGUoc3RhdGUsIGNhbGxiYWNrKTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGkgaW4gc3RhdGUpIHtcblx0XHRcdFx0XHRcdGlmKHN0YXRlLmhhc093blByb3BlcnR5KGkpICYmIGkgIT09IFwiY29yZVwiICYmICQuaW5BcnJheShpLCB0aGlzLnNldHRpbmdzLnBsdWdpbnMpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgc3RhdGVbaV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKCQuaXNFbXB0eU9iamVjdChzdGF0ZS5jb3JlKSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHN0YXRlLmNvcmU7XG5cdFx0XHRcdFx0XHR0aGlzLnNldF9zdGF0ZShzdGF0ZSwgY2FsbGJhY2spO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZigkLmlzRW1wdHlPYmplY3Qoc3RhdGUpKSB7XG5cdFx0XHRcdFx0c3RhdGUgPSBudWxsO1xuXHRcdFx0XHRcdGlmKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcyk7IH1cblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIGBzZXRfc3RhdGVgIGNhbGwgY29tcGxldGVzXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQG5hbWUgc2V0X3N0YXRlLmpzdHJlZVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdHRoaXMudHJpZ2dlcignc2V0X3N0YXRlJyk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogcmVmcmVzaGVzIHRoZSB0cmVlIC0gYWxsIG5vZGVzIGFyZSByZWxvYWRlZCB3aXRoIGNhbGxzIHRvIGBsb2FkX25vZGVgLlxuXHRcdCAqIEBuYW1lIHJlZnJlc2goKVxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc2tpcF9sb2FkaW5nIGFuIG9wdGlvbiB0byBza2lwIHNob3dpbmcgdGhlIGxvYWRpbmcgaW5kaWNhdG9yXG5cdFx0ICogQHBhcmFtIHtNaXhlZH0gZm9yZ2V0X3N0YXRlIGlmIHNldCB0byBgdHJ1ZWAgc3RhdGUgd2lsbCBub3QgYmUgcmVhcHBsaWVkLCBpZiBzZXQgdG8gYSBmdW5jdGlvbiAocmVjZWl2aW5nIHRoZSBjdXJyZW50IHN0YXRlIGFzIGFyZ3VtZW50KSB0aGUgcmVzdWx0IG9mIHRoYXQgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIGFzIHN0YXRlXG5cdFx0ICogQHRyaWdnZXIgcmVmcmVzaC5qc3RyZWVcblx0XHQgKi9cblx0XHRyZWZyZXNoIDogZnVuY3Rpb24gKHNraXBfbG9hZGluZywgZm9yZ2V0X3N0YXRlKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUuc3RhdGUgPSBmb3JnZXRfc3RhdGUgPT09IHRydWUgPyB7fSA6IHRoaXMuZ2V0X3N0YXRlKCk7XG5cdFx0XHRpZihmb3JnZXRfc3RhdGUgJiYgJC52YWthdGEuaXNfZnVuY3Rpb24oZm9yZ2V0X3N0YXRlKSkgeyB0aGlzLl9kYXRhLmNvcmUuc3RhdGUgPSBmb3JnZXRfc3RhdGUuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUuc3RhdGUpOyB9XG5cdFx0XHR0aGlzLl9jbnQgPSAwO1xuXHRcdFx0dGhpcy5fbW9kZWwuZGF0YSA9IHt9O1xuXHRcdFx0dGhpcy5fbW9kZWwuZGF0YVskLmpzdHJlZS5yb290XSA9IHtcblx0XHRcdFx0aWQgOiAkLmpzdHJlZS5yb290LFxuXHRcdFx0XHRwYXJlbnQgOiBudWxsLFxuXHRcdFx0XHRwYXJlbnRzIDogW10sXG5cdFx0XHRcdGNoaWxkcmVuIDogW10sXG5cdFx0XHRcdGNoaWxkcmVuX2QgOiBbXSxcblx0XHRcdFx0c3RhdGUgOiB7IGxvYWRlZCA6IGZhbHNlIH1cblx0XHRcdH07XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgPSBbXTtcblx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2NsaWNrZWQgPSBudWxsO1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgPSBudWxsO1xuXG5cdFx0XHR2YXIgYyA9IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdLmNsYXNzTmFtZTtcblx0XHRcdGlmKCFza2lwX2xvYWRpbmcpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50Lmh0bWwoXCI8XCIrXCJ1bCBjbGFzcz0nXCIrYytcIicgcm9sZT0nZ3JvdXAnPjxcIitcImxpIGNsYXNzPSdqc3RyZWUtaW5pdGlhbC1ub2RlIGpzdHJlZS1sb2FkaW5nIGpzdHJlZS1sZWFmIGpzdHJlZS1sYXN0JyByb2xlPSdub25lJyBpZD0nalwiK3RoaXMuX2lkK1wiX2xvYWRpbmcnPjxpIGNsYXNzPSdqc3RyZWUtaWNvbiBqc3RyZWUtb2NsJz48L2k+PFwiK1wiYSBjbGFzcz0nanN0cmVlLWFuY2hvcicgcm9sZT0ndHJlZWl0ZW0nIGhyZWY9JyMnPjxpIGNsYXNzPSdqc3RyZWUtaWNvbiBqc3RyZWUtdGhlbWVpY29uLWhpZGRlbic+PC9pPlwiICsgdGhpcy5nZXRfc3RyaW5nKFwiTG9hZGluZyAuLi5cIikgKyBcIjwvYT48L2xpPjwvdWw+XCIpO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywnaicrdGhpcy5faWQrJ19sb2FkaW5nJyk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmxvYWRfbm9kZSgkLmpzdHJlZS5yb290LCBmdW5jdGlvbiAobywgcykge1xuXHRcdFx0XHRpZihzKSB7XG5cdFx0XHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKClbMF0uY2xhc3NOYW1lID0gYztcblx0XHRcdFx0XHRpZih0aGlzLl9maXJzdENoaWxkKHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpWzBdKSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcsdGhpcy5fZmlyc3RDaGlsZCh0aGlzLmdldF9jb250YWluZXJfdWwoKVswXSkuaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnNldF9zdGF0ZSgkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5fZGF0YS5jb3JlLnN0YXRlKSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIGByZWZyZXNoYCBjYWxsIGNvbXBsZXRlc1xuXHRcdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0XHQgKiBAbmFtZSByZWZyZXNoLmpzdHJlZVxuXHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHR0aGlzLnRyaWdnZXIoJ3JlZnJlc2gnKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc3RhdGUgPSBudWxsO1xuXHRcdFx0fSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiByZWZyZXNoZXMgYSBub2RlIGluIHRoZSB0cmVlIChyZWxvYWQgaXRzIGNoaWxkcmVuKSBhbGwgb3BlbmVkIG5vZGVzIGluc2lkZSB0aGF0IG5vZGUgYXJlIHJlbG9hZGVkIHdpdGggY2FsbHMgdG8gYGxvYWRfbm9kZWAuXG5cdFx0ICogQG5hbWUgcmVmcmVzaF9ub2RlKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHRyaWdnZXIgcmVmcmVzaF9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHJlZnJlc2hfbm9kZSA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIG9wZW5lZCA9IFtdLCB0b19sb2FkID0gW10sIHMgPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KFtdKTtcblx0XHRcdHRvX2xvYWQucHVzaChvYmouaWQpO1xuXHRcdFx0aWYob2JqLnN0YXRlLm9wZW5lZCA9PT0gdHJ1ZSkgeyBvcGVuZWQucHVzaChvYmouaWQpOyB9XG5cdFx0XHR0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSkuZmluZCgnLmpzdHJlZS1vcGVuJykuZWFjaChmdW5jdGlvbigpIHsgdG9fbG9hZC5wdXNoKHRoaXMuaWQpOyBvcGVuZWQucHVzaCh0aGlzLmlkKTsgfSk7XG5cdFx0XHR0aGlzLl9sb2FkX25vZGVzKHRvX2xvYWQsIGZ1bmN0aW9uIChub2Rlcykge1xuXHRcdFx0XHR0aGlzLm9wZW5fbm9kZShvcGVuZWQsIGZhbHNlLCAwKTtcblx0XHRcdFx0dGhpcy5zZWxlY3Rfbm9kZShzKTtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyByZWZyZXNoZWRcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIHJlZnJlc2hfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgLSB0aGUgcmVmcmVzaGVkIG5vZGVcblx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbm9kZXMgLSBhbiBhcnJheSBvZiB0aGUgSURzIG9mIHRoZSBub2RlcyB0aGF0IHdlcmUgcmVsb2FkZWRcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcigncmVmcmVzaF9ub2RlJywgeyAnbm9kZScgOiBvYmosICdub2RlcycgOiBub2RlcyB9KTtcblx0XHRcdH0uYmluZCh0aGlzKSwgZmFsc2UsIHRydWUpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2V0IChjaGFuZ2UpIHRoZSBJRCBvZiBhIG5vZGVcblx0XHQgKiBAbmFtZSBzZXRfaWQob2JqLCBpZClcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBpZCB0aGUgbmV3IElEXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKiBAdHJpZ2dlciBzZXRfaWQuanN0cmVlXG5cdFx0ICovXG5cdFx0c2V0X2lkIDogZnVuY3Rpb24gKG9iaiwgaWQpIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dmFyIGksIGosIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCBvbGQgPSBvYmouaWQ7XG5cdFx0XHRpZCA9IGlkLnRvU3RyaW5nKCk7XG5cdFx0XHQvLyB1cGRhdGUgcGFyZW50cyAocmVwbGFjZSBjdXJyZW50IElEIHdpdGggbmV3IG9uZSBpbiBjaGlsZHJlbiBhbmQgY2hpbGRyZW5fZClcblx0XHRcdG1bb2JqLnBhcmVudF0uY2hpbGRyZW5bJC5pbkFycmF5KG9iai5pZCwgbVtvYmoucGFyZW50XS5jaGlsZHJlbildID0gaWQ7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmoucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0bVtvYmoucGFyZW50c1tpXV0uY2hpbGRyZW5fZFskLmluQXJyYXkob2JqLmlkLCBtW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kKV0gPSBpZDtcblx0XHRcdH1cblx0XHRcdC8vIHVwZGF0ZSBjaGlsZHJlbiAocmVwbGFjZSBjdXJyZW50IElEIHdpdGggbmV3IG9uZSBpbiBwYXJlbnQgYW5kIHBhcmVudHMpXG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdG1bb2JqLmNoaWxkcmVuW2ldXS5wYXJlbnQgPSBpZDtcblx0XHRcdH1cblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRtW29iai5jaGlsZHJlbl9kW2ldXS5wYXJlbnRzWyQuaW5BcnJheShvYmouaWQsIG1bb2JqLmNoaWxkcmVuX2RbaV1dLnBhcmVudHMpXSA9IGlkO1xuXHRcdFx0fVxuXHRcdFx0aSA9ICQuaW5BcnJheShvYmouaWQsIHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCk7XG5cdFx0XHRpZihpICE9PSAtMSkgeyB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWRbaV0gPSBpZDsgfVxuXHRcdFx0Ly8gdXBkYXRlIG1vZGVsIGFuZCBvYmogaXRzZWxmIChvYmouaWQsIHRoaXMuX21vZGVsLmRhdGFbS0VZXSlcblx0XHRcdGkgPSB0aGlzLmdldF9ub2RlKG9iai5pZCwgdHJ1ZSk7XG5cdFx0XHRpZihpKSB7XG5cdFx0XHRcdGkuYXR0cignaWQnLCBpZCk7IC8vLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmF0dHIoJ2lkJywgaWQgKyAnX2FuY2hvcicpLmVuZCgpLmF0dHIoJ2FyaWEtbGFiZWxsZWRieScsIGlkICsgJ19hbmNob3InKTtcblx0XHRcdFx0aWYodGhpcy5lbGVtZW50LmF0dHIoJ2FyaWEtYWN0aXZlZGVzY2VuZGFudCcpID09PSBvYmouaWQpIHtcblx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYXR0cignYXJpYS1hY3RpdmVkZXNjZW5kYW50JywgaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRkZWxldGUgbVtvYmouaWRdO1xuXHRcdFx0b2JqLmlkID0gaWQ7XG5cdFx0XHRvYmoubGlfYXR0ci5pZCA9IGlkO1xuXHRcdFx0bVtpZF0gPSBvYmo7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpZCB2YWx1ZSBpcyBjaGFuZ2VkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNldF9pZC5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gb2xkIHRoZSBvbGQgaWRcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdzZXRfaWQnLHsgXCJub2RlXCIgOiBvYmosIFwibmV3XCIgOiBvYmouaWQsIFwib2xkXCIgOiBvbGQgfSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldCB0aGUgdGV4dCB2YWx1ZSBvZiBhIG5vZGVcblx0XHQgKiBAbmFtZSBnZXRfdGV4dChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfdGV4dCA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHJldHVybiAoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpID8gZmFsc2UgOiBvYmoudGV4dDtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHNldCB0aGUgdGV4dCB2YWx1ZSBvZiBhIG5vZGUuIFVzZWQgaW50ZXJuYWxseSwgcGxlYXNlIHVzZSBgcmVuYW1lX25vZGUob2JqLCB2YWwpYC5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqIEBuYW1lIHNldF90ZXh0KG9iaiwgdmFsKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGUsIHlvdSBjYW4gcGFzcyBhbiBhcnJheSB0byBzZXQgdGhlIHRleHQgb24gbXVsdGlwbGUgbm9kZXNcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IHZhbCB0aGUgbmV3IHRleHQgdmFsdWVcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqIEB0cmlnZ2VyIHNldF90ZXh0LmpzdHJlZVxuXHRcdCAqL1xuXHRcdHNldF90ZXh0IDogZnVuY3Rpb24gKG9iaiwgdmFsKSB7XG5cdFx0XHR2YXIgdDEsIHQyO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRfdGV4dChvYmpbdDFdLCB2YWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRvYmoudGV4dCA9IHZhbDtcblx0XHRcdGlmKHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKS5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5yZWRyYXdfbm9kZShvYmouaWQpO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgdGV4dCB2YWx1ZSBpcyBjaGFuZ2VkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNldF90ZXh0LmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG9ialxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHRleHQgdGhlIG5ldyB2YWx1ZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NldF90ZXh0Jyx7IFwib2JqXCIgOiBvYmosIFwidGV4dFwiIDogdmFsIH0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIGEgSlNPTiByZXByZXNlbnRhdGlvbiBvZiBhIG5vZGUgKG9yIHRoZSB3aG9sZSB0cmVlKVxuXHRcdCAqIEBuYW1lIGdldF9qc29uKFtvYmosIG9wdGlvbnNdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLm5vX3N0YXRlIGRvIG5vdCByZXR1cm4gc3RhdGUgaW5mb3JtYXRpb25cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLm5vX2lkIGRvIG5vdCByZXR1cm4gSURcblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBvcHRpb25zLm5vX2NoaWxkcmVuIGRvIG5vdCBpbmNsdWRlIGNoaWxkcmVuXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gb3B0aW9ucy5ub19kYXRhIGRvIG5vdCBpbmNsdWRlIG5vZGUgZGF0YVxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IG9wdGlvbnMubm9fbGlfYXR0ciBkbyBub3QgaW5jbHVkZSBMSSBhdHRyaWJ1dGVzXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gb3B0aW9ucy5ub19hX2F0dHIgZG8gbm90IGluY2x1ZGUgQSBhdHRyaWJ1dGVzXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gb3B0aW9ucy5mbGF0IHJldHVybiBmbGF0IEpTT04gaW5zdGVhZCBvZiBuZXN0ZWRcblx0XHQgKiBAcmV0dXJuIHtPYmplY3R9XG5cdFx0ICovXG5cdFx0Z2V0X2pzb24gOiBmdW5jdGlvbiAob2JqLCBvcHRpb25zLCBmbGF0KSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaiB8fCAkLmpzdHJlZS5yb290KTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMuZmxhdCAmJiAhZmxhdCkgeyBmbGF0ID0gW107IH1cblx0XHRcdHZhciB0bXAgPSB7XG5cdFx0XHRcdCdpZCcgOiBvYmouaWQsXG5cdFx0XHRcdCd0ZXh0JyA6IG9iai50ZXh0LFxuXHRcdFx0XHQnaWNvbicgOiB0aGlzLmdldF9pY29uKG9iaiksXG5cdFx0XHRcdCdsaV9hdHRyJyA6ICQuZXh0ZW5kKHRydWUsIHt9LCBvYmoubGlfYXR0ciksXG5cdFx0XHRcdCdhX2F0dHInIDogJC5leHRlbmQodHJ1ZSwge30sIG9iai5hX2F0dHIpLFxuXHRcdFx0XHQnc3RhdGUnIDoge30sXG5cdFx0XHRcdCdkYXRhJyA6IG9wdGlvbnMgJiYgb3B0aW9ucy5ub19kYXRhID8gZmFsc2UgOiAkLmV4dGVuZCh0cnVlLCAkLnZha2F0YS5pc19hcnJheShvYmouZGF0YSk/W106e30sIG9iai5kYXRhKVxuXHRcdFx0XHQvLyggdGhpcy5nZXRfbm9kZShvYmosIHRydWUpLmxlbmd0aCA/IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKS5kYXRhKCkgOiBvYmouZGF0YSApLFxuXHRcdFx0fSwgaSwgajtcblx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5mbGF0KSB7XG5cdFx0XHRcdHRtcC5wYXJlbnQgPSBvYmoucGFyZW50O1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdHRtcC5jaGlsZHJlbiA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9fc3RhdGUpIHtcblx0XHRcdFx0Zm9yKGkgaW4gb2JqLnN0YXRlKSB7XG5cdFx0XHRcdFx0aWYob2JqLnN0YXRlLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHR0bXAuc3RhdGVbaV0gPSBvYmouc3RhdGVbaV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRkZWxldGUgdG1wLnN0YXRlO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLm5vX2xpX2F0dHIpIHtcblx0XHRcdFx0ZGVsZXRlIHRtcC5saV9hdHRyO1xuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLm5vX2FfYXR0cikge1xuXHRcdFx0XHRkZWxldGUgdG1wLmFfYXR0cjtcblx0XHRcdH1cblx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5ub19pZCkge1xuXHRcdFx0XHRkZWxldGUgdG1wLmlkO1xuXHRcdFx0XHRpZih0bXAubGlfYXR0ciAmJiB0bXAubGlfYXR0ci5pZCkge1xuXHRcdFx0XHRcdGRlbGV0ZSB0bXAubGlfYXR0ci5pZDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0bXAuYV9hdHRyICYmIHRtcC5hX2F0dHIuaWQpIHtcblx0XHRcdFx0XHRkZWxldGUgdG1wLmFfYXR0ci5pZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLmZsYXQgJiYgb2JqLmlkICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdGZsYXQucHVzaCh0bXApO1xuXHRcdFx0fVxuXHRcdFx0aWYoIW9wdGlvbnMgfHwgIW9wdGlvbnMubm9fY2hpbGRyZW4pIHtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5mbGF0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdldF9qc29uKG9iai5jaGlsZHJlbltpXSwgb3B0aW9ucywgZmxhdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0dG1wLmNoaWxkcmVuLnB1c2godGhpcy5nZXRfanNvbihvYmouY2hpbGRyZW5baV0sIG9wdGlvbnMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvcHRpb25zICYmIG9wdGlvbnMuZmxhdCA/IGZsYXQgOiAob2JqLmlkID09PSAkLmpzdHJlZS5yb290ID8gdG1wLmNoaWxkcmVuIDogdG1wKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNyZWF0ZSBhIG5ldyBub2RlIChkbyBub3QgY29uZnVzZSB3aXRoIGxvYWRfbm9kZSlcblx0XHQgKiBAbmFtZSBjcmVhdGVfbm9kZShbcGFyLCBub2RlLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWRdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSAgIHBhciAgICAgICB0aGUgcGFyZW50IG5vZGUgKHRvIGNyZWF0ZSBhIHJvb3Qgbm9kZSB1c2UgZWl0aGVyIFwiI1wiIChzdHJpbmcpIG9yIGBudWxsYClcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gICBub2RlICAgICAgdGhlIGRhdGEgZm9yIHRoZSBuZXcgbm9kZSAoYSB2YWxpZCBKU09OIG9iamVjdCwgb3IgYSBzaW1wbGUgc3RyaW5nIHdpdGggdGhlIG5hbWUpXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICAgcG9zICAgICAgIHRoZSBpbmRleCBhdCB3aGljaCB0byBpbnNlcnQgdGhlIG5vZGUsIFwiZmlyc3RcIiBhbmQgXCJsYXN0XCIgYXJlIGFsc28gc3VwcG9ydGVkLCBkZWZhdWx0IGlzIFwibGFzdFwiXG5cdFx0ICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIGEgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uY2UgdGhlIG5vZGUgaXMgY3JlYXRlZFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IGlzX2xvYWRlZCBpbnRlcm5hbCBhcmd1bWVudCBpbmRpY2F0aW5nIGlmIHRoZSBwYXJlbnQgbm9kZSB3YXMgc3VjY2VzZnVsbHkgbG9hZGVkXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgIHRoZSBJRCBvZiB0aGUgbmV3bHkgY3JlYXRlIG5vZGVcblx0XHQgKiBAdHJpZ2dlciBtb2RlbC5qc3RyZWUsIGNyZWF0ZV9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGNyZWF0ZV9ub2RlIDogZnVuY3Rpb24gKHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkKSB7XG5cdFx0XHRpZihwYXIgPT09IG51bGwpIHsgcGFyID0gJC5qc3RyZWUucm9vdDsgfVxuXHRcdFx0cGFyID0gdGhpcy5nZXRfbm9kZShwYXIpO1xuXHRcdFx0aWYoIXBhcikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHBvcyA9IHBvcyA9PT0gdW5kZWZpbmVkID8gXCJsYXN0XCIgOiBwb3M7XG5cdFx0XHRpZighcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSAmJiAhaXNfbG9hZGVkICYmICF0aGlzLmlzX2xvYWRlZChwYXIpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmxvYWRfbm9kZShwYXIsIGZ1bmN0aW9uICgpIHsgdGhpcy5jcmVhdGVfbm9kZShwYXIsIG5vZGUsIHBvcywgY2FsbGJhY2ssIHRydWUpOyB9KTtcblx0XHRcdH1cblx0XHRcdGlmKCFub2RlKSB7IG5vZGUgPSB7IFwidGV4dFwiIDogdGhpcy5nZXRfc3RyaW5nKCdOZXcgbm9kZScpIH07IH1cblx0XHRcdGlmKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRcdG5vZGUgPSB7IFwidGV4dFwiIDogbm9kZSB9O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bm9kZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBub2RlKTtcblx0XHRcdH1cblx0XHRcdGlmKG5vZGUudGV4dCA9PT0gdW5kZWZpbmVkKSB7IG5vZGUudGV4dCA9IHRoaXMuZ2V0X3N0cmluZygnTmV3IG5vZGUnKTsgfVxuXHRcdFx0dmFyIHRtcCwgZHBjLCBpLCBqO1xuXG5cdFx0XHRpZihwYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0aWYocG9zID09PSBcImJlZm9yZVwiKSB7IHBvcyA9IFwiZmlyc3RcIjsgfVxuXHRcdFx0XHRpZihwb3MgPT09IFwiYWZ0ZXJcIikgeyBwb3MgPSBcImxhc3RcIjsgfVxuXHRcdFx0fVxuXHRcdFx0c3dpdGNoKHBvcykge1xuXHRcdFx0XHRjYXNlIFwiYmVmb3JlXCI6XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwYXIucGFyZW50KTtcblx0XHRcdFx0XHRwb3MgPSAkLmluQXJyYXkocGFyLmlkLCB0bXAuY2hpbGRyZW4pO1xuXHRcdFx0XHRcdHBhciA9IHRtcDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFmdGVyXCIgOlxuXHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUocGFyLnBhcmVudCk7XG5cdFx0XHRcdFx0cG9zID0gJC5pbkFycmF5KHBhci5pZCwgdG1wLmNoaWxkcmVuKSArIDE7XG5cdFx0XHRcdFx0cGFyID0gdG1wO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiaW5zaWRlXCI6XG5cdFx0XHRcdGNhc2UgXCJmaXJzdFwiOlxuXHRcdFx0XHRcdHBvcyA9IDA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJsYXN0XCI6XG5cdFx0XHRcdFx0cG9zID0gcGFyLmNoaWxkcmVuLmxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpZighcG9zKSB7IHBvcyA9IDA7IH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmKHBvcyA+IHBhci5jaGlsZHJlbi5sZW5ndGgpIHsgcG9zID0gcGFyLmNoaWxkcmVuLmxlbmd0aDsgfVxuXHRcdFx0aWYoIW5vZGUuaWQpIHsgbm9kZS5pZCA9IHRydWU7IH1cblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwiY3JlYXRlX25vZGVcIiwgbm9kZSwgcGFyLCBwb3MpKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYobm9kZS5pZCA9PT0gdHJ1ZSkgeyBkZWxldGUgbm9kZS5pZDsgfVxuXHRcdFx0bm9kZSA9IHRoaXMuX3BhcnNlX21vZGVsX2Zyb21fanNvbihub2RlLCBwYXIuaWQsIHBhci5wYXJlbnRzLmNvbmNhdCgpKTtcblx0XHRcdGlmKCFub2RlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShub2RlKTtcblx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0ZHBjLnB1c2gobm9kZSk7XG5cdFx0XHRkcGMgPSBkcGMuY29uY2F0KHRtcC5jaGlsZHJlbl9kKTtcblx0XHRcdHRoaXMudHJpZ2dlcignbW9kZWwnLCB7IFwibm9kZXNcIiA6IGRwYywgXCJwYXJlbnRcIiA6IHBhci5pZCB9KTtcblxuXHRcdFx0cGFyLmNoaWxkcmVuX2QgPSBwYXIuY2hpbGRyZW5fZC5jb25jYXQoZHBjKTtcblx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW3Bhci5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gdGhpcy5fbW9kZWwuZGF0YVtwYXIucGFyZW50c1tpXV0uY2hpbGRyZW5fZC5jb25jYXQoZHBjKTtcblx0XHRcdH1cblx0XHRcdG5vZGUgPSB0bXA7XG5cdFx0XHR0bXAgPSBbXTtcblx0XHRcdGZvcihpID0gMCwgaiA9IHBhci5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0dG1wW2kgPj0gcG9zID8gaSsxIDogaV0gPSBwYXIuY2hpbGRyZW5baV07XG5cdFx0XHR9XG5cdFx0XHR0bXBbcG9zXSA9IG5vZGUuaWQ7XG5cdFx0XHRwYXIuY2hpbGRyZW4gPSB0bXA7XG5cblx0XHRcdHRoaXMucmVkcmF3X25vZGUocGFyLCB0cnVlKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIGNyZWF0ZWRcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgY3JlYXRlX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudCB0aGUgcGFyZW50J3MgSURcblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwb3NpdGlvbiB0aGUgcG9zaXRpb24gb2YgdGhlIG5ldyBub2RlIGFtb25nIHRoZSBwYXJlbnQncyBjaGlsZHJlblxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2NyZWF0ZV9ub2RlJywgeyBcIm5vZGVcIiA6IHRoaXMuZ2V0X25vZGUobm9kZSksIFwicGFyZW50XCIgOiBwYXIuaWQsIFwicG9zaXRpb25cIiA6IHBvcyB9KTtcblx0XHRcdGlmKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgdGhpcy5nZXRfbm9kZShub2RlKSk7IH1cblx0XHRcdHJldHVybiBub2RlLmlkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2V0IHRoZSB0ZXh0IHZhbHVlIG9mIGEgbm9kZVxuXHRcdCAqIEBuYW1lIHJlbmFtZV9ub2RlKG9iaiwgdmFsKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGUsIHlvdSBjYW4gcGFzcyBhbiBhcnJheSB0byByZW5hbWUgbXVsdGlwbGUgbm9kZXMgdG8gdGhlIHNhbWUgbmFtZVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ30gdmFsIHRoZSBuZXcgdGV4dCB2YWx1ZVxuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICogQHRyaWdnZXIgcmVuYW1lX25vZGUuanN0cmVlXG5cdFx0ICovXG5cdFx0cmVuYW1lX25vZGUgOiBmdW5jdGlvbiAob2JqLCB2YWwpIHtcblx0XHRcdHZhciB0MSwgdDIsIG9sZDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMucmVuYW1lX25vZGUob2JqW3QxXSwgdmFsKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0b2xkID0gb2JqLnRleHQ7XG5cdFx0XHRpZighdGhpcy5jaGVjayhcInJlbmFtZV9ub2RlXCIsIG9iaiwgdGhpcy5nZXRfcGFyZW50KG9iaiksIHZhbCkpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnNldF90ZXh0KG9iaiwgdmFsKTsgLy8gLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpXG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyByZW5hbWVkXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHJlbmFtZV9ub2RlLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0IHRoZSBuZXcgdmFsdWVcblx0XHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBvbGQgdGhlIG9sZCB2YWx1ZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3JlbmFtZV9ub2RlJywgeyBcIm5vZGVcIiA6IG9iaiwgXCJ0ZXh0XCIgOiB2YWwsIFwib2xkXCIgOiBvbGQgfSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHJlbW92ZSBhIG5vZGVcblx0XHQgKiBAbmFtZSBkZWxldGVfbm9kZShvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZSwgeW91IGNhbiBwYXNzIGFuIGFycmF5IHRvIGRlbGV0ZSBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEByZXR1cm4ge0Jvb2xlYW59XG5cdFx0ICogQHRyaWdnZXIgZGVsZXRlX25vZGUuanN0cmVlLCBjaGFuZ2VkLmpzdHJlZVxuXHRcdCAqL1xuXHRcdGRlbGV0ZV9ub2RlIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0MiwgcGFyLCBwb3MsIHRtcCwgaSwgaiwgaywgbCwgYywgdG9wLCBsZnQ7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmRlbGV0ZV9ub2RlKG9ialt0MV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRwYXIgPSB0aGlzLmdldF9ub2RlKG9iai5wYXJlbnQpO1xuXHRcdFx0cG9zID0gJC5pbkFycmF5KG9iai5pZCwgcGFyLmNoaWxkcmVuKTtcblx0XHRcdGMgPSBmYWxzZTtcblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwiZGVsZXRlX25vZGVcIiwgb2JqLCBwYXIsIHBvcykpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihwb3MgIT09IC0xKSB7XG5cdFx0XHRcdHBhci5jaGlsZHJlbiA9ICQudmFrYXRhLmFycmF5X3JlbW92ZShwYXIuY2hpbGRyZW4sIHBvcyk7XG5cdFx0XHR9XG5cdFx0XHR0bXAgPSBvYmouY2hpbGRyZW5fZC5jb25jYXQoW10pO1xuXHRcdFx0dG1wLnB1c2gob2JqLmlkKTtcblx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5wYXJlbnRzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gJC52YWthdGEuYXJyYXlfZmlsdGVyKHRoaXMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QsIGZ1bmN0aW9uICh2KSB7XG5cdFx0XHRcdFx0cmV0dXJuICQuaW5BcnJheSh2LCB0bXApID09PSAtMTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoayA9IDAsIGwgPSB0bXAubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbdG1wW2tdXS5zdGF0ZS5zZWxlY3RlZCkge1xuXHRcdFx0XHRcdGMgPSB0cnVlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoYykge1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV9maWx0ZXIodGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkLCBmdW5jdGlvbiAodikge1xuXHRcdFx0XHRcdHJldHVybiAkLmluQXJyYXkodiwgdG1wKSA9PT0gLTE7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIG5vZGUgaXMgZGVsZXRlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBkZWxldGVfbm9kZS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBwYXJlbnQncyBJRFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2RlbGV0ZV9ub2RlJywgeyBcIm5vZGVcIiA6IG9iaiwgXCJwYXJlbnRcIiA6IHBhci5pZCB9KTtcblx0XHRcdGlmKGMpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2VkJywgeyAnYWN0aW9uJyA6ICdkZWxldGVfbm9kZScsICdub2RlJyA6IG9iaiwgJ3NlbGVjdGVkJyA6IHRoaXMuX2RhdGEuY29yZS5zZWxlY3RlZCwgJ3BhcmVudCcgOiBwYXIuaWQgfSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IoayA9IDAsIGwgPSB0bXAubGVuZ3RoOyBrIDwgbDsgaysrKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9tb2RlbC5kYXRhW3RtcFtrXV07XG5cdFx0XHR9XG5cdFx0XHRpZigkLmluQXJyYXkodGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQsIHRtcCkgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5mb2N1c2VkID0gbnVsbDtcblx0XHRcdFx0dG9wID0gdGhpcy5lbGVtZW50WzBdLnNjcm9sbFRvcDtcblx0XHRcdFx0bGZ0ID0gdGhpcy5lbGVtZW50WzBdLnNjcm9sbExlZnQ7XG5cdFx0XHRcdGlmKHBhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdLmNoaWxkcmVuWzBdKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmdldF9ub2RlKHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0uY2hpbGRyZW5bMF0sIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdlcignZm9jdXMnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5nZXRfbm9kZShwYXIsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5lbGVtZW50WzBdLnNjcm9sbFRvcCAgPSB0b3A7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFswXS5zY3JvbGxMZWZ0ID0gbGZ0O1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZWRyYXdfbm9kZShwYXIsIHRydWUpO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVjayBpZiBhbiBvcGVyYXRpb24gaXMgcHJlbWl0dGVkIG9uIHRoZSB0cmVlLiBVc2VkIGludGVybmFsbHkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBjaGVjayhjaGssIG9iaiwgcGFyLCBwb3MpXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfSBjaGsgdGhlIG9wZXJhdGlvbiB0byBjaGVjaywgY2FuIGJlIFwiY3JlYXRlX25vZGVcIiwgXCJyZW5hbWVfbm9kZVwiLCBcImRlbGV0ZV9ub2RlXCIsIFwiY29weV9ub2RlXCIgb3IgXCJtb3ZlX25vZGVcIlxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gcGFyIHRoZSBwYXJlbnRcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gcG9zIHRoZSBwb3NpdGlvbiB0byBpbnNlcnQgYXQsIG9yIGlmIFwicmVuYW1lX25vZGVcIiAtIHRoZSBuZXcgbmFtZVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBtb3JlIHNvbWUgdmFyaW91cyBhZGRpdGlvbmFsIGluZm9ybWF0aW9uLCBmb3IgZXhhbXBsZSBpZiBhIFwibW92ZV9ub2RlXCIgb3BlcmF0aW9ucyBpcyB0cmlnZ2VyZWQgYnkgRE5EIHRoaXMgd2lsbCBiZSB0aGUgaG92ZXJlZCBub2RlXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRjaGVjayA6IGZ1bmN0aW9uIChjaGssIG9iaiwgcGFyLCBwb3MsIG1vcmUpIHtcblx0XHRcdG9iaiA9IG9iaiAmJiBvYmouaWQgPyBvYmogOiB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRwYXIgPSBwYXIgJiYgcGFyLmlkID8gcGFyIDogdGhpcy5nZXRfbm9kZShwYXIpO1xuXHRcdFx0dmFyIHRtcCA9IGNoay5tYXRjaCgvXm1vdmVfbm9kZXxjb3B5X25vZGV8Y3JlYXRlX25vZGUkL2kpID8gcGFyIDogb2JqLFxuXHRcdFx0XHRjaGMgPSB0aGlzLnNldHRpbmdzLmNvcmUuY2hlY2tfY2FsbGJhY2s7XG5cdFx0XHRpZihjaGsgPT09IFwibW92ZV9ub2RlXCIgfHwgY2hrID09PSBcImNvcHlfbm9kZVwiKSB7XG5cdFx0XHRcdGlmKCghbW9yZSB8fCAhbW9yZS5pc19tdWx0aSkgJiYgKGNoayA9PT0gXCJtb3ZlX25vZGVcIiAmJiAkLmluQXJyYXkob2JqLmlkLCBwYXIuY2hpbGRyZW4pID09PSBwb3MpKSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICdjb3JlJywgJ2lkJyA6ICdjb3JlXzA4JywgJ3JlYXNvbicgOiAnTW92aW5nIG5vZGUgdG8gaXRzIGN1cnJlbnQgcG9zaXRpb24nLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCghbW9yZSB8fCAhbW9yZS5pc19tdWx0aSkgJiYgKG9iai5pZCA9PT0gcGFyLmlkIHx8IChjaGsgPT09IFwibW92ZV9ub2RlXCIgJiYgJC5pbkFycmF5KG9iai5pZCwgcGFyLmNoaWxkcmVuKSA9PT0gcG9zKSB8fCAkLmluQXJyYXkocGFyLmlkLCBvYmouY2hpbGRyZW5fZCkgIT09IC0xKSkge1xuXHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wMScsICdyZWFzb24nIDogJ01vdmluZyBwYXJlbnQgaW5zaWRlIGNoaWxkJywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYodG1wICYmIHRtcC5kYXRhKSB7IHRtcCA9IHRtcC5kYXRhOyB9XG5cdFx0XHRpZih0bXAgJiYgdG1wLmZ1bmN0aW9ucyAmJiAodG1wLmZ1bmN0aW9uc1tjaGtdID09PSBmYWxzZSB8fCB0bXAuZnVuY3Rpb25zW2Noa10gPT09IHRydWUpKSB7XG5cdFx0XHRcdGlmKHRtcC5mdW5jdGlvbnNbY2hrXSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ2NvcmUnLCAnaWQnIDogJ2NvcmVfMDInLCAncmVhc29uJyA6ICdOb2RlIGRhdGEgcHJldmVudHMgZnVuY3Rpb246ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdG1wLmZ1bmN0aW9uc1tjaGtdO1xuXHRcdFx0fVxuXHRcdFx0aWYoY2hjID09PSBmYWxzZSB8fCAoJC52YWthdGEuaXNfZnVuY3Rpb24oY2hjKSAmJiBjaGMuY2FsbCh0aGlzLCBjaGssIG9iaiwgcGFyLCBwb3MsIG1vcmUpID09PSBmYWxzZSkgfHwgKGNoYyAmJiBjaGNbY2hrXSA9PT0gZmFsc2UpKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAnY29yZScsICdpZCcgOiAnY29yZV8wMycsICdyZWFzb24nIDogJ1VzZXIgY29uZmlnIGZvciBjb3JlLmNoZWNrX2NhbGxiYWNrIHByZXZlbnRzIGZ1bmN0aW9uOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBsYXN0IGVycm9yXG5cdFx0ICogQG5hbWUgbGFzdF9lcnJvcigpXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqL1xuXHRcdGxhc3RfZXJyb3IgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3I7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBtb3ZlIGEgbm9kZSB0byBhIG5ldyBwYXJlbnRcblx0XHQgKiBAbmFtZSBtb3ZlX25vZGUob2JqLCBwYXIgWywgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIG1vdmUsIHBhc3MgYW4gYXJyYXkgdG8gbW92ZSBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwYXIgdGhlIG5ldyBwYXJlbnRcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gcG9zIHRoZSBwb3NpdGlvbiB0byBpbnNlcnQgYXQgKGJlc2lkZXMgaW50ZWdlciB2YWx1ZXMsIFwiZmlyc3RcIiBhbmQgXCJsYXN0XCIgYXJlIHN1cHBvcnRlZCwgYXMgd2VsbCBhcyBcImJlZm9yZVwiIGFuZCBcImFmdGVyXCIpLCBkZWZhdWx0cyB0byBpbnRlZ2VyIGAwYFxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGNhbGwgb25jZSB0aGUgbW92ZSBpcyBjb21wbGV0ZWQsIHJlY2VpdmVzIDMgYXJndW1lbnRzIC0gdGhlIG5vZGUsIHRoZSBuZXcgcGFyZW50IGFuZCB0aGUgcG9zaXRpb25cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBpc19sb2FkZWQgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIHBhcmVudCBub2RlIGhhcyBiZWVuIGxvYWRlZFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBfcmVkcmF3IGludGVybmFsIHBhcmFtZXRlciBpbmRpY2F0aW5nIGlmIHRoZSB0cmVlIHNob3VsZCBiZSByZWRyYXduXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gaW5zdGFuY2UgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIG5vZGUgY29tZXMgZnJvbSBhbm90aGVyIGluc3RhbmNlXG5cdFx0ICogQHRyaWdnZXIgbW92ZV9ub2RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdG1vdmVfbm9kZSA6IGZ1bmN0aW9uIChvYmosIHBhciwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkLCBza2lwX3JlZHJhdywgb3JpZ2luKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBvbGRfcGFyLCBvbGRfcG9zLCBuZXdfcGFyLCBvbGRfaW5zLCBpc19tdWx0aSwgZHBjLCB0bXAsIGksIGosIGssIGwsIHA7XG5cblx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUocGFyKTtcblx0XHRcdHBvcyA9IHBvcyA9PT0gdW5kZWZpbmVkID8gMCA6IHBvcztcblx0XHRcdGlmKCFwYXIpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRpZighcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSAmJiAhaXNfbG9hZGVkICYmICF0aGlzLmlzX2xvYWRlZChwYXIpKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLmxvYWRfbm9kZShwYXIsIGZ1bmN0aW9uICgpIHsgdGhpcy5tb3ZlX25vZGUob2JqLCBwYXIsIHBvcywgY2FsbGJhY2ssIHRydWUsIGZhbHNlLCBvcmlnaW4pOyB9KTtcblx0XHRcdH1cblxuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRpZihvYmoubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0b2JqID0gb2JqWzBdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdC8vb2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0XHRpZigodG1wID0gdGhpcy5tb3ZlX25vZGUob2JqW3QxXSwgcGFyLCBwb3MsIGNhbGxiYWNrLCBpc19sb2FkZWQsIGZhbHNlLCBvcmlnaW4pKSkge1xuXHRcdFx0XHRcdFx0XHRwYXIgPSB0bXA7XG5cdFx0XHRcdFx0XHRcdHBvcyA9IFwiYWZ0ZXJcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b2JqID0gb2JqICYmIG9iai5pZCA/IG9iaiA6IHRoaXMuZ2V0X25vZGUob2JqKTtcblxuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0XHRcdG9sZF9wYXIgPSAob2JqLnBhcmVudCB8fCAkLmpzdHJlZS5yb290KS50b1N0cmluZygpO1xuXHRcdFx0bmV3X3BhciA9ICghcG9zLnRvU3RyaW5nKCkubWF0Y2goL14oYmVmb3JlfGFmdGVyKSQvKSB8fCBwYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpID8gcGFyIDogdGhpcy5nZXRfbm9kZShwYXIucGFyZW50KTtcblx0XHRcdG9sZF9pbnMgPSBvcmlnaW4gPyBvcmlnaW4gOiAodGhpcy5fbW9kZWwuZGF0YVtvYmouaWRdID8gdGhpcyA6ICQuanN0cmVlLnJlZmVyZW5jZShvYmouaWQpKTtcblx0XHRcdGlzX211bHRpID0gIW9sZF9pbnMgfHwgIW9sZF9pbnMuX2lkIHx8ICh0aGlzLl9pZCAhPT0gb2xkX2lucy5faWQpO1xuXHRcdFx0b2xkX3BvcyA9IG9sZF9pbnMgJiYgb2xkX2lucy5faWQgJiYgb2xkX3BhciAmJiBvbGRfaW5zLl9tb2RlbC5kYXRhW29sZF9wYXJdICYmIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4gPyAkLmluQXJyYXkob2JqLmlkLCBvbGRfaW5zLl9tb2RlbC5kYXRhW29sZF9wYXJdLmNoaWxkcmVuKSA6IC0xO1xuXHRcdFx0aWYob2xkX2lucyAmJiBvbGRfaW5zLl9pZCkge1xuXHRcdFx0XHRvYmogPSBvbGRfaW5zLl9tb2RlbC5kYXRhW29iai5pZF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKGlzX211bHRpKSB7XG5cdFx0XHRcdGlmKCh0bXAgPSB0aGlzLmNvcHlfbm9kZShvYmosIHBhciwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkLCBmYWxzZSwgb3JpZ2luKSkpIHtcblx0XHRcdFx0XHRpZihvbGRfaW5zKSB7IG9sZF9pbnMuZGVsZXRlX25vZGUob2JqKTsgfVxuXHRcdFx0XHRcdHJldHVybiB0bXA7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0Ly92YXIgbSA9IHRoaXMuX21vZGVsLmRhdGE7XG5cdFx0XHRpZihwYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0aWYocG9zID09PSBcImJlZm9yZVwiKSB7IHBvcyA9IFwiZmlyc3RcIjsgfVxuXHRcdFx0XHRpZihwb3MgPT09IFwiYWZ0ZXJcIikgeyBwb3MgPSBcImxhc3RcIjsgfVxuXHRcdFx0fVxuXHRcdFx0c3dpdGNoKHBvcykge1xuXHRcdFx0XHRjYXNlIFwiYmVmb3JlXCI6XG5cdFx0XHRcdFx0cG9zID0gJC5pbkFycmF5KHBhci5pZCwgbmV3X3Bhci5jaGlsZHJlbik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJhZnRlclwiIDpcblx0XHRcdFx0XHRwb3MgPSAkLmluQXJyYXkocGFyLmlkLCBuZXdfcGFyLmNoaWxkcmVuKSArIDE7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJpbnNpZGVcIjpcblx0XHRcdFx0Y2FzZSBcImZpcnN0XCI6XG5cdFx0XHRcdFx0cG9zID0gMDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImxhc3RcIjpcblx0XHRcdFx0XHRwb3MgPSBuZXdfcGFyLmNoaWxkcmVuLmxlbmd0aDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpZighcG9zKSB7IHBvcyA9IDA7IH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGlmKHBvcyA+IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoKSB7IHBvcyA9IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoOyB9XG5cdFx0XHRpZighdGhpcy5jaGVjayhcIm1vdmVfbm9kZVwiLCBvYmosIG5ld19wYXIsIHBvcywgeyAnY29yZScgOiB0cnVlLCAnb3JpZ2luJyA6IG9yaWdpbiwgJ2lzX211bHRpJyA6IChvbGRfaW5zICYmIG9sZF9pbnMuX2lkICYmIG9sZF9pbnMuX2lkICE9PSB0aGlzLl9pZCksICdpc19mb3JlaWduJyA6ICghb2xkX2lucyB8fCAhb2xkX2lucy5faWQpIH0pKSB7XG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MuY29yZS5lcnJvci5jYWxsKHRoaXMsIHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYob2JqLnBhcmVudCA9PT0gbmV3X3Bhci5pZCkge1xuXHRcdFx0XHRkcGMgPSBuZXdfcGFyLmNoaWxkcmVuLmNvbmNhdCgpO1xuXHRcdFx0XHR0bXAgPSAkLmluQXJyYXkob2JqLmlkLCBkcGMpO1xuXHRcdFx0XHRpZih0bXAgIT09IC0xKSB7XG5cdFx0XHRcdFx0ZHBjID0gJC52YWthdGEuYXJyYXlfcmVtb3ZlKGRwYywgdG1wKTtcblx0XHRcdFx0XHRpZihwb3MgPiB0bXApIHsgcG9zLS07IH1cblx0XHRcdFx0fVxuXHRcdFx0XHR0bXAgPSBbXTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZHBjLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRtcFtpID49IHBvcyA/IGkrMSA6IGldID0gZHBjW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRtcFtwb3NdID0gb2JqLmlkO1xuXHRcdFx0XHRuZXdfcGFyLmNoaWxkcmVuID0gdG1wO1xuXHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQobmV3X3Bhci5pZCk7XG5cdFx0XHRcdHRoaXMucmVkcmF3KG5ld19wYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIGNsZWFuIG9sZCBwYXJlbnQgYW5kIHVwXG5cdFx0XHRcdHRtcCA9IG9iai5jaGlsZHJlbl9kLmNvbmNhdCgpO1xuXHRcdFx0XHR0bXAucHVzaChvYmouaWQpO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmoucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRkcGMgPSBbXTtcblx0XHRcdFx0XHRwID0gb2xkX2lucy5fbW9kZWwuZGF0YVtvYmoucGFyZW50c1tpXV0uY2hpbGRyZW5fZDtcblx0XHRcdFx0XHRmb3IoayA9IDAsIGwgPSBwLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0aWYoJC5pbkFycmF5KHBba10sIHRtcCkgPT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdGRwYy5wdXNoKHBba10pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRvbGRfaW5zLl9tb2RlbC5kYXRhW29iai5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gZHBjO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4gPSAkLnZha2F0YS5hcnJheV9yZW1vdmVfaXRlbShvbGRfaW5zLl9tb2RlbC5kYXRhW29sZF9wYXJdLmNoaWxkcmVuLCBvYmouaWQpO1xuXG5cdFx0XHRcdC8vIGluc2VydCBpbnRvIG5ldyBwYXJlbnQgYW5kIHVwXG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG5ld19wYXIucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHR0aGlzLl9tb2RlbC5kYXRhW25ld19wYXIucGFyZW50c1tpXV0uY2hpbGRyZW5fZCA9IHRoaXMuX21vZGVsLmRhdGFbbmV3X3Bhci5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kLmNvbmNhdCh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBuZXdfcGFyLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGRwY1tpID49IHBvcyA/IGkrMSA6IGldID0gbmV3X3Bhci5jaGlsZHJlbltpXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkcGNbcG9zXSA9IG9iai5pZDtcblx0XHRcdFx0bmV3X3Bhci5jaGlsZHJlbiA9IGRwYztcblx0XHRcdFx0bmV3X3Bhci5jaGlsZHJlbl9kLnB1c2gob2JqLmlkKTtcblx0XHRcdFx0bmV3X3Bhci5jaGlsZHJlbl9kID0gbmV3X3Bhci5jaGlsZHJlbl9kLmNvbmNhdChvYmouY2hpbGRyZW5fZCk7XG5cblx0XHRcdFx0Ly8gdXBkYXRlIG9iamVjdFxuXHRcdFx0XHRvYmoucGFyZW50ID0gbmV3X3Bhci5pZDtcblx0XHRcdFx0dG1wID0gbmV3X3Bhci5wYXJlbnRzLmNvbmNhdCgpO1xuXHRcdFx0XHR0bXAudW5zaGlmdChuZXdfcGFyLmlkKTtcblx0XHRcdFx0cCA9IG9iai5wYXJlbnRzLmxlbmd0aDtcblx0XHRcdFx0b2JqLnBhcmVudHMgPSB0bXA7XG5cblx0XHRcdFx0Ly8gdXBkYXRlIG9iamVjdCBjaGlsZHJlblxuXHRcdFx0XHR0bXAgPSB0bXAuY29uY2F0KCk7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbb2JqLmNoaWxkcmVuX2RbaV1dLnBhcmVudHMgPSB0aGlzLl9tb2RlbC5kYXRhW29iai5jaGlsZHJlbl9kW2ldXS5wYXJlbnRzLnNsaWNlKDAscCotMSk7XG5cdFx0XHRcdFx0QXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkodGhpcy5fbW9kZWwuZGF0YVtvYmouY2hpbGRyZW5fZFtpXV0ucGFyZW50cywgdG1wKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKG9sZF9wYXIgPT09ICQuanN0cmVlLnJvb3QgfHwgbmV3X3Bhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmZvcmNlX2Z1bGxfcmVkcmF3ID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcpIHtcblx0XHRcdFx0XHR0aGlzLl9ub2RlX2NoYW5nZWQob2xkX3Bhcik7XG5cdFx0XHRcdFx0dGhpcy5fbm9kZV9jaGFuZ2VkKG5ld19wYXIuaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFza2lwX3JlZHJhdykge1xuXHRcdFx0XHRcdHRoaXMucmVkcmF3KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKGNhbGxiYWNrKSB7IGNhbGxiYWNrLmNhbGwodGhpcywgb2JqLCBuZXdfcGFyLCBwb3MpOyB9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGEgbm9kZSBpcyBtb3ZlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBtb3ZlX25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudCB0aGUgcGFyZW50J3MgSURcblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwb3NpdGlvbiB0aGUgcG9zaXRpb24gb2YgdGhlIG5vZGUgYW1vbmcgdGhlIHBhcmVudCdzIGNoaWxkcmVuXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gb2xkX3BhcmVudCB0aGUgb2xkIHBhcmVudCBvZiB0aGUgbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IG9sZF9wb3NpdGlvbiB0aGUgb2xkIHBvc2l0aW9uIG9mIHRoZSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge0Jvb2xlYW59IGlzX211bHRpIGRvIHRoZSBub2RlIGFuZCBuZXcgcGFyZW50IGJlbG9uZyB0byBkaWZmZXJlbnQgaW5zdGFuY2VzXG5cdFx0XHQgKiBAcGFyYW0ge2pzVHJlZX0gb2xkX2luc3RhbmNlIHRoZSBpbnN0YW5jZSB0aGUgbm9kZSBjYW1lIGZyb21cblx0XHRcdCAqIEBwYXJhbSB7anNUcmVlfSBuZXdfaW5zdGFuY2UgdGhlIGluc3RhbmNlIG9mIHRoZSBuZXcgcGFyZW50XG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignbW92ZV9ub2RlJywgeyBcIm5vZGVcIiA6IG9iaiwgXCJwYXJlbnRcIiA6IG5ld19wYXIuaWQsIFwicG9zaXRpb25cIiA6IHBvcywgXCJvbGRfcGFyZW50XCIgOiBvbGRfcGFyLCBcIm9sZF9wb3NpdGlvblwiIDogb2xkX3BvcywgJ2lzX211bHRpJyA6IChvbGRfaW5zICYmIG9sZF9pbnMuX2lkICYmIG9sZF9pbnMuX2lkICE9PSB0aGlzLl9pZCksICdpc19mb3JlaWduJyA6ICghb2xkX2lucyB8fCAhb2xkX2lucy5faWQpLCAnb2xkX2luc3RhbmNlJyA6IG9sZF9pbnMsICduZXdfaW5zdGFuY2UnIDogdGhpcyB9KTtcblx0XHRcdHJldHVybiBvYmouaWQ7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjb3B5IGEgbm9kZSB0byBhIG5ldyBwYXJlbnRcblx0XHQgKiBAbmFtZSBjb3B5X25vZGUob2JqLCBwYXIgWywgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGNvcHksIHBhc3MgYW4gYXJyYXkgdG8gY29weSBtdWx0aXBsZSBub2Rlc1xuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwYXIgdGhlIG5ldyBwYXJlbnRcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gcG9zIHRoZSBwb3NpdGlvbiB0byBpbnNlcnQgYXQgKGJlc2lkZXMgaW50ZWdlciB2YWx1ZXMsIFwiZmlyc3RcIiBhbmQgXCJsYXN0XCIgYXJlIHN1cHBvcnRlZCwgYXMgd2VsbCBhcyBcImJlZm9yZVwiIGFuZCBcImFmdGVyXCIpLCBkZWZhdWx0cyB0byBpbnRlZ2VyIGAwYFxuXHRcdCAqIEBwYXJhbSAge2Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGNhbGwgb25jZSB0aGUgbW92ZSBpcyBjb21wbGV0ZWQsIHJlY2VpdmVzIDMgYXJndW1lbnRzIC0gdGhlIG5vZGUsIHRoZSBuZXcgcGFyZW50IGFuZCB0aGUgcG9zaXRpb25cblx0XHQgKiBAcGFyYW0gIHtCb29sZWFufSBpc19sb2FkZWQgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIHBhcmVudCBub2RlIGhhcyBiZWVuIGxvYWRlZFxuXHRcdCAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBfcmVkcmF3IGludGVybmFsIHBhcmFtZXRlciBpbmRpY2F0aW5nIGlmIHRoZSB0cmVlIHNob3VsZCBiZSByZWRyYXduXG5cdFx0ICogQHBhcmFtICB7Qm9vbGVhbn0gaW5zdGFuY2UgaW50ZXJuYWwgcGFyYW1ldGVyIGluZGljYXRpbmcgaWYgdGhlIG5vZGUgY29tZXMgZnJvbSBhbm90aGVyIGluc3RhbmNlXG5cdFx0ICogQHRyaWdnZXIgbW9kZWwuanN0cmVlIGNvcHlfbm9kZS5qc3RyZWVcblx0XHQgKi9cblx0XHRjb3B5X25vZGUgOiBmdW5jdGlvbiAob2JqLCBwYXIsIHBvcywgY2FsbGJhY2ssIGlzX2xvYWRlZCwgc2tpcF9yZWRyYXcsIG9yaWdpbikge1xuXHRcdFx0dmFyIHQxLCB0MiwgZHBjLCB0bXAsIGksIGosIG5vZGUsIG9sZF9wYXIsIG5ld19wYXIsIG9sZF9pbnMsIGlzX211bHRpO1xuXG5cdFx0XHRwYXIgPSB0aGlzLmdldF9ub2RlKHBhcik7XG5cdFx0XHRwb3MgPSBwb3MgPT09IHVuZGVmaW5lZCA/IDAgOiBwb3M7XG5cdFx0XHRpZighcGFyKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYoIXBvcy50b1N0cmluZygpLm1hdGNoKC9eKGJlZm9yZXxhZnRlcikkLykgJiYgIWlzX2xvYWRlZCAmJiAhdGhpcy5pc19sb2FkZWQocGFyKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5sb2FkX25vZGUocGFyLCBmdW5jdGlvbiAoKSB7IHRoaXMuY29weV9ub2RlKG9iaiwgcGFyLCBwb3MsIGNhbGxiYWNrLCB0cnVlLCBmYWxzZSwgb3JpZ2luKTsgfSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0aWYob2JqLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRcdG9iaiA9IG9ialswXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHQvL29iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdFx0aWYoKHRtcCA9IHRoaXMuY29weV9ub2RlKG9ialt0MV0sIHBhciwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkLCB0cnVlLCBvcmlnaW4pKSkge1xuXHRcdFx0XHRcdFx0XHRwYXIgPSB0bXA7XG5cdFx0XHRcdFx0XHRcdHBvcyA9IFwiYWZ0ZXJcIjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0b2JqID0gb2JqICYmIG9iai5pZCA/IG9iaiA6IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdFx0XHRvbGRfcGFyID0gKG9iai5wYXJlbnQgfHwgJC5qc3RyZWUucm9vdCkudG9TdHJpbmcoKTtcblx0XHRcdG5ld19wYXIgPSAoIXBvcy50b1N0cmluZygpLm1hdGNoKC9eKGJlZm9yZXxhZnRlcikkLykgfHwgcGFyLmlkID09PSAkLmpzdHJlZS5yb290KSA/IHBhciA6IHRoaXMuZ2V0X25vZGUocGFyLnBhcmVudCk7XG5cdFx0XHRvbGRfaW5zID0gb3JpZ2luID8gb3JpZ2luIDogKHRoaXMuX21vZGVsLmRhdGFbb2JqLmlkXSA/IHRoaXMgOiAkLmpzdHJlZS5yZWZlcmVuY2Uob2JqLmlkKSk7XG5cdFx0XHRpc19tdWx0aSA9ICFvbGRfaW5zIHx8ICFvbGRfaW5zLl9pZCB8fCAodGhpcy5faWQgIT09IG9sZF9pbnMuX2lkKTtcblxuXHRcdFx0aWYob2xkX2lucyAmJiBvbGRfaW5zLl9pZCkge1xuXHRcdFx0XHRvYmogPSBvbGRfaW5zLl9tb2RlbC5kYXRhW29iai5pZF07XG5cdFx0XHR9XG5cblx0XHRcdGlmKHBhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRpZihwb3MgPT09IFwiYmVmb3JlXCIpIHsgcG9zID0gXCJmaXJzdFwiOyB9XG5cdFx0XHRcdGlmKHBvcyA9PT0gXCJhZnRlclwiKSB7IHBvcyA9IFwibGFzdFwiOyB9XG5cdFx0XHR9XG5cdFx0XHRzd2l0Y2gocG9zKSB7XG5cdFx0XHRcdGNhc2UgXCJiZWZvcmVcIjpcblx0XHRcdFx0XHRwb3MgPSAkLmluQXJyYXkocGFyLmlkLCBuZXdfcGFyLmNoaWxkcmVuKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFmdGVyXCIgOlxuXHRcdFx0XHRcdHBvcyA9ICQuaW5BcnJheShwYXIuaWQsIG5ld19wYXIuY2hpbGRyZW4pICsgMTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImluc2lkZVwiOlxuXHRcdFx0XHRjYXNlIFwiZmlyc3RcIjpcblx0XHRcdFx0XHRwb3MgPSAwO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwibGFzdFwiOlxuXHRcdFx0XHRcdHBvcyA9IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGlmKCFwb3MpIHsgcG9zID0gMDsgfVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0aWYocG9zID4gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGgpIHsgcG9zID0gbmV3X3Bhci5jaGlsZHJlbi5sZW5ndGg7IH1cblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwiY29weV9ub2RlXCIsIG9iaiwgbmV3X3BhciwgcG9zLCB7ICdjb3JlJyA6IHRydWUsICdvcmlnaW4nIDogb3JpZ2luLCAnaXNfbXVsdGknIDogKG9sZF9pbnMgJiYgb2xkX2lucy5faWQgJiYgb2xkX2lucy5faWQgIT09IHRoaXMuX2lkKSwgJ2lzX2ZvcmVpZ24nIDogKCFvbGRfaW5zIHx8ICFvbGRfaW5zLl9pZCkgfSkpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jb3JlLmVycm9yLmNhbGwodGhpcywgdGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRub2RlID0gb2xkX2lucyA/IG9sZF9pbnMuZ2V0X2pzb24ob2JqLCB7IG5vX2lkIDogdHJ1ZSwgbm9fZGF0YSA6IHRydWUsIG5vX3N0YXRlIDogdHJ1ZSB9KSA6IG9iajtcblx0XHRcdGlmKCFub2RlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYobm9kZS5pZCA9PT0gdHJ1ZSkgeyBkZWxldGUgbm9kZS5pZDsgfVxuXHRcdFx0bm9kZSA9IHRoaXMuX3BhcnNlX21vZGVsX2Zyb21fanNvbihub2RlLCBuZXdfcGFyLmlkLCBuZXdfcGFyLnBhcmVudHMuY29uY2F0KCkpO1xuXHRcdFx0aWYoIW5vZGUpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR0bXAgPSB0aGlzLmdldF9ub2RlKG5vZGUpO1xuXHRcdFx0aWYob2JqICYmIG9iai5zdGF0ZSAmJiBvYmouc3RhdGUubG9hZGVkID09PSBmYWxzZSkgeyB0bXAuc3RhdGUubG9hZGVkID0gZmFsc2U7IH1cblx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0ZHBjLnB1c2gobm9kZSk7XG5cdFx0XHRkcGMgPSBkcGMuY29uY2F0KHRtcC5jaGlsZHJlbl9kKTtcblx0XHRcdHRoaXMudHJpZ2dlcignbW9kZWwnLCB7IFwibm9kZXNcIiA6IGRwYywgXCJwYXJlbnRcIiA6IG5ld19wYXIuaWQgfSk7XG5cblx0XHRcdC8vIGluc2VydCBpbnRvIG5ldyBwYXJlbnQgYW5kIHVwXG5cdFx0XHRmb3IoaSA9IDAsIGogPSBuZXdfcGFyLnBhcmVudHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbbmV3X3Bhci5wYXJlbnRzW2ldXS5jaGlsZHJlbl9kID0gdGhpcy5fbW9kZWwuZGF0YVtuZXdfcGFyLnBhcmVudHNbaV1dLmNoaWxkcmVuX2QuY29uY2F0KGRwYyk7XG5cdFx0XHR9XG5cdFx0XHRkcGMgPSBbXTtcblx0XHRcdGZvcihpID0gMCwgaiA9IG5ld19wYXIuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGRwY1tpID49IHBvcyA/IGkrMSA6IGldID0gbmV3X3Bhci5jaGlsZHJlbltpXTtcblx0XHRcdH1cblx0XHRcdGRwY1twb3NdID0gdG1wLmlkO1xuXHRcdFx0bmV3X3Bhci5jaGlsZHJlbiA9IGRwYztcblx0XHRcdG5ld19wYXIuY2hpbGRyZW5fZC5wdXNoKHRtcC5pZCk7XG5cdFx0XHRuZXdfcGFyLmNoaWxkcmVuX2QgPSBuZXdfcGFyLmNoaWxkcmVuX2QuY29uY2F0KHRtcC5jaGlsZHJlbl9kKTtcblxuXHRcdFx0aWYobmV3X3Bhci5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHR0aGlzLl9tb2RlbC5mb3JjZV9mdWxsX3JlZHJhdyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRpZighdGhpcy5fbW9kZWwuZm9yY2VfZnVsbF9yZWRyYXcpIHtcblx0XHRcdFx0dGhpcy5fbm9kZV9jaGFuZ2VkKG5ld19wYXIuaWQpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXNraXBfcmVkcmF3KSB7XG5cdFx0XHRcdHRoaXMucmVkcmF3KG5ld19wYXIuaWQgPT09ICQuanN0cmVlLnJvb3QpO1xuXHRcdFx0fVxuXHRcdFx0aWYoY2FsbGJhY2spIHsgY2FsbGJhY2suY2FsbCh0aGlzLCB0bXAsIG5ld19wYXIsIHBvcyk7IH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gYSBub2RlIGlzIGNvcGllZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjb3B5X25vZGUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZSB0aGUgY29waWVkIG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbCB0aGUgb3JpZ2luYWwgbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudCB0aGUgcGFyZW50J3MgSURcblx0XHRcdCAqIEBwYXJhbSB7TnVtYmVyfSBwb3NpdGlvbiB0aGUgcG9zaXRpb24gb2YgdGhlIG5vZGUgYW1vbmcgdGhlIHBhcmVudCdzIGNoaWxkcmVuXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gb2xkX3BhcmVudCB0aGUgb2xkIHBhcmVudCBvZiB0aGUgbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IG9sZF9wb3NpdGlvbiB0aGUgcG9zaXRpb24gb2YgdGhlIG9yaWdpbmFsIG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNfbXVsdGkgZG8gdGhlIG5vZGUgYW5kIG5ldyBwYXJlbnQgYmVsb25nIHRvIGRpZmZlcmVudCBpbnN0YW5jZXNcblx0XHRcdCAqIEBwYXJhbSB7anNUcmVlfSBvbGRfaW5zdGFuY2UgdGhlIGluc3RhbmNlIHRoZSBub2RlIGNhbWUgZnJvbVxuXHRcdFx0ICogQHBhcmFtIHtqc1RyZWV9IG5ld19pbnN0YW5jZSB0aGUgaW5zdGFuY2Ugb2YgdGhlIG5ldyBwYXJlbnRcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjb3B5X25vZGUnLCB7IFwibm9kZVwiIDogdG1wLCBcIm9yaWdpbmFsXCIgOiBvYmosIFwicGFyZW50XCIgOiBuZXdfcGFyLmlkLCBcInBvc2l0aW9uXCIgOiBwb3MsIFwib2xkX3BhcmVudFwiIDogb2xkX3BhciwgXCJvbGRfcG9zaXRpb25cIiA6IG9sZF9pbnMgJiYgb2xkX2lucy5faWQgJiYgb2xkX3BhciAmJiBvbGRfaW5zLl9tb2RlbC5kYXRhW29sZF9wYXJdICYmIG9sZF9pbnMuX21vZGVsLmRhdGFbb2xkX3Bhcl0uY2hpbGRyZW4gPyAkLmluQXJyYXkob2JqLmlkLCBvbGRfaW5zLl9tb2RlbC5kYXRhW29sZF9wYXJdLmNoaWxkcmVuKSA6IC0xLCdpc19tdWx0aScgOiAob2xkX2lucyAmJiBvbGRfaW5zLl9pZCAmJiBvbGRfaW5zLl9pZCAhPT0gdGhpcy5faWQpLCAnaXNfZm9yZWlnbicgOiAoIW9sZF9pbnMgfHwgIW9sZF9pbnMuX2lkKSwgJ29sZF9pbnN0YW5jZScgOiBvbGRfaW5zLCAnbmV3X2luc3RhbmNlJyA6IHRoaXMgfSk7XG5cdFx0XHRyZXR1cm4gdG1wLmlkO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY3V0IGEgbm9kZSAoYSBsYXRlciBjYWxsIHRvIGBwYXN0ZShvYmopYCB3b3VsZCBtb3ZlIHRoZSBub2RlKVxuXHRcdCAqIEBuYW1lIGN1dChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiBtdWx0aXBsZSBvYmplY3RzIGNhbiBiZSBwYXNzZWQgdXNpbmcgYW4gYXJyYXlcblx0XHQgKiBAdHJpZ2dlciBjdXQuanN0cmVlXG5cdFx0ICovXG5cdFx0Y3V0IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0aWYoIW9iaikgeyBvYmogPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KCk7IH1cblx0XHRcdGlmKCEkLnZha2F0YS5pc19hcnJheShvYmopKSB7IG9iaiA9IFtvYmpdOyB9XG5cdFx0XHRpZighb2JqLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciB0bXAgPSBbXSwgbywgdDEsIHQyO1xuXHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdG8gPSB0aGlzLmdldF9ub2RlKG9ialt0MV0pO1xuXHRcdFx0XHRpZihvICYmIG8uaWQgJiYgby5pZCAhPT0gJC5qc3RyZWUucm9vdCkgeyB0bXAucHVzaChvKTsgfVxuXHRcdFx0fVxuXHRcdFx0aWYoIXRtcC5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRjY3Bfbm9kZSA9IHRtcDtcblx0XHRcdGNjcF9pbnN0ID0gdGhpcztcblx0XHRcdGNjcF9tb2RlID0gJ21vdmVfbm9kZSc7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIG5vZGVzIGFyZSBhZGRlZCB0byB0aGUgYnVmZmVyIGZvciBtb3Zpbmdcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgY3V0LmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbm9kZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2N1dCcsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjb3B5IGEgbm9kZSAoYSBsYXRlciBjYWxsIHRvIGBwYXN0ZShvYmopYCB3b3VsZCBjb3B5IHRoZSBub2RlKVxuXHRcdCAqIEBuYW1lIGNvcHkob2JqKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmogbXVsdGlwbGUgb2JqZWN0cyBjYW4gYmUgcGFzc2VkIHVzaW5nIGFuIGFycmF5XG5cdFx0ICogQHRyaWdnZXIgY29weS5qc3RyZWVcblx0XHQgKi9cblx0XHRjb3B5IDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0aWYoIW9iaikgeyBvYmogPSB0aGlzLl9kYXRhLmNvcmUuc2VsZWN0ZWQuY29uY2F0KCk7IH1cblx0XHRcdGlmKCEkLnZha2F0YS5pc19hcnJheShvYmopKSB7IG9iaiA9IFtvYmpdOyB9XG5cdFx0XHRpZighb2JqLmxlbmd0aCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdHZhciB0bXAgPSBbXSwgbywgdDEsIHQyO1xuXHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdG8gPSB0aGlzLmdldF9ub2RlKG9ialt0MV0pO1xuXHRcdFx0XHRpZihvICYmIG8uaWQgJiYgby5pZCAhPT0gJC5qc3RyZWUucm9vdCkgeyB0bXAucHVzaChvKTsgfVxuXHRcdFx0fVxuXHRcdFx0aWYoIXRtcC5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRjY3Bfbm9kZSA9IHRtcDtcblx0XHRcdGNjcF9pbnN0ID0gdGhpcztcblx0XHRcdGNjcF9tb2RlID0gJ2NvcHlfbm9kZSc7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIG5vZGVzIGFyZSBhZGRlZCB0byB0aGUgYnVmZmVyIGZvciBjb3B5aW5nXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGNvcHkuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBub2RlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignY29weScsIHsgXCJub2RlXCIgOiBvYmogfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXQgdGhlIGN1cnJlbnQgYnVmZmVyIChhbnkgbm9kZXMgdGhhdCBhcmUgd2FpdGluZyBmb3IgYSBwYXN0ZSBvcGVyYXRpb24pXG5cdFx0ICogQG5hbWUgZ2V0X2J1ZmZlcigpXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fSBhbiBvYmplY3QgY29uc2lzdGluZyBvZiBgbW9kZWAgKFwiY29weV9ub2RlXCIgb3IgXCJtb3ZlX25vZGVcIiksIGBub2RlYCAoYW4gYXJyYXkgb2Ygb2JqZWN0cykgYW5kIGBpbnN0YCAodGhlIGluc3RhbmNlKVxuXHRcdCAqL1xuXHRcdGdldF9idWZmZXIgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4geyAnbW9kZScgOiBjY3BfbW9kZSwgJ25vZGUnIDogY2NwX25vZGUsICdpbnN0JyA6IGNjcF9pbnN0IH07XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBjaGVjayBpZiB0aGVyZSBpcyBzb21ldGhpbmcgaW4gdGhlIGJ1ZmZlciB0byBwYXN0ZVxuXHRcdCAqIEBuYW1lIGNhbl9wYXN0ZSgpXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHRjYW5fcGFzdGUgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2NwX21vZGUgIT09IGZhbHNlICYmIGNjcF9ub2RlICE9PSBmYWxzZTsgLy8gJiYgY2NwX2luc3QuX21vZGVsLmRhdGFbY2NwX25vZGVdO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogY29weSBvciBtb3ZlIHRoZSBwcmV2aW91c2x5IGN1dCBvciBjb3BpZWQgbm9kZXMgdG8gYSBuZXcgcGFyZW50XG5cdFx0ICogQG5hbWUgcGFzdGUob2JqIFssIHBvc10pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbmV3IHBhcmVudFxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBwb3MgdGhlIHBvc2l0aW9uIHRvIGluc2VydCBhdCAoYmVzaWRlcyBpbnRlZ2VyLCBcImZpcnN0XCIgYW5kIFwibGFzdFwiIGFyZSBzdXBwb3J0ZWQpLCBkZWZhdWx0cyB0byBpbnRlZ2VyIGAwYFxuXHRcdCAqIEB0cmlnZ2VyIHBhc3RlLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHBhc3RlIDogZnVuY3Rpb24gKG9iaiwgcG9zKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8ICFjY3BfbW9kZSB8fCAhY2NwX21vZGUubWF0Y2goL14oY29weV9ub2RlfG1vdmVfbm9kZSkkLykgfHwgIWNjcF9ub2RlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYodGhpc1tjY3BfbW9kZV0oY2NwX25vZGUsIG9iaiwgcG9zLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBjY3BfaW5zdCkpIHtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIHBhc3RlIGlzIGludm9rZWRcblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBuYW1lIHBhc3RlLmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gcGFyZW50IHRoZSBJRCBvZiB0aGUgcmVjZWl2aW5nIG5vZGVcblx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gbm9kZSB0aGUgbm9kZXMgaW4gdGhlIGJ1ZmZlclxuXHRcdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gbW9kZSB0aGUgcGVyZm9ybWVkIG9wZXJhdGlvbiAtIFwiY29weV9ub2RlXCIgb3IgXCJtb3ZlX25vZGVcIlxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdwYXN0ZScsIHsgXCJwYXJlbnRcIiA6IG9iai5pZCwgXCJub2RlXCIgOiBjY3Bfbm9kZSwgXCJtb2RlXCIgOiBjY3BfbW9kZSB9KTtcblx0XHRcdH1cblx0XHRcdGNjcF9ub2RlID0gZmFsc2U7XG5cdFx0XHRjY3BfbW9kZSA9IGZhbHNlO1xuXHRcdFx0Y2NwX2luc3QgPSBmYWxzZTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGNsZWFyIHRoZSBidWZmZXIgb2YgcHJldmlvdXNseSBjb3BpZWQgb3IgY3V0IG5vZGVzXG5cdFx0ICogQG5hbWUgY2xlYXJfYnVmZmVyKClcblx0XHQgKiBAdHJpZ2dlciBjbGVhcl9idWZmZXIuanN0cmVlXG5cdFx0ICovXG5cdFx0Y2xlYXJfYnVmZmVyIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2NwX25vZGUgPSBmYWxzZTtcblx0XHRcdGNjcF9tb2RlID0gZmFsc2U7XG5cdFx0XHRjY3BfaW5zdCA9IGZhbHNlO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiB0aGUgY29weSAvIGN1dCBidWZmZXIgaXMgY2xlYXJlZFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjbGVhcl9idWZmZXIuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignY2xlYXJfYnVmZmVyJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBwdXQgYSBub2RlIGluIGVkaXQgbW9kZSAoaW5wdXQgZmllbGQgdG8gcmVuYW1lIHRoZSBub2RlKVxuXHRcdCAqIEBuYW1lIGVkaXQob2JqIFssIGRlZmF1bHRfdGV4dCwgY2FsbGJhY2tdKVxuXHRcdCAqIEBwYXJhbSAge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd9IGRlZmF1bHRfdGV4dCB0aGUgdGV4dCB0byBwb3B1bGF0ZSB0aGUgaW5wdXQgd2l0aCAoaWYgb21pdHRlZCBvciBzZXQgdG8gYSBub24tc3RyaW5nIHZhbHVlIHRoZSBub2RlJ3MgdGV4dCB2YWx1ZSBpcyB1c2VkKVxuXHRcdCAqIEBwYXJhbSAge0Z1bmN0aW9ufSBjYWxsYmFjayBhIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbmNlIHRoZSB0ZXh0IGJveCBpcyBibHVycmVkLCBpdCBpcyBjYWxsZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgYW5kIHJlY2VpdmVzIHRoZSBub2RlLCBhIHN0YXR1cyBwYXJhbWV0ZXIgKHRydWUgaWYgdGhlIHJlbmFtZSBpcyBzdWNjZXNzZnVsLCBmYWxzZSBvdGhlcndpc2UpLCBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgdXNlciBjYW5jZWxsZWQgdGhlIGVkaXQgYW5kIHRoZSBvcmlnaW5hbCB1bmVzY2FwZWQgdmFsdWUgcHJvdmlkZWQgYnkgdGhlIHVzZXIuIFlvdSBjYW4gYWxzbyBhY2Nlc3MgdGhlIG5vZGUncyB0aXRsZSB1c2luZyAudGV4dFxuXHRcdCAqL1xuXHRcdGVkaXQgOiBmdW5jdGlvbiAob2JqLCBkZWZhdWx0X3RleHQsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgcnRsLCB3LCBhLCBzLCB0LCBoMSwgaDIsIGZuLCB0bXAsIGNhbmNlbCA9IGZhbHNlO1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKCF0aGlzLmNoZWNrKFwiZWRpdFwiLCBvYmosIHRoaXMuZ2V0X3BhcmVudChvYmopKSkge1xuXHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHRtcCA9IG9iajtcblx0XHRcdGRlZmF1bHRfdGV4dCA9IHR5cGVvZiBkZWZhdWx0X3RleHQgPT09ICdzdHJpbmcnID8gZGVmYXVsdF90ZXh0IDogb2JqLnRleHQ7XG5cdFx0XHR0aGlzLnNldF90ZXh0KG9iaiwgXCJcIik7XG5cdFx0XHRvYmogPSB0aGlzLl9vcGVuX3RvKG9iaik7XG5cdFx0XHR0bXAudGV4dCA9IGRlZmF1bHRfdGV4dDtcblxuXHRcdFx0cnRsID0gdGhpcy5fZGF0YS5jb3JlLnJ0bDtcblx0XHRcdHcgID0gdGhpcy5lbGVtZW50LndpZHRoKCk7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IHRtcC5pZDtcblx0XHRcdGEgID0gb2JqLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRzICA9ICQoJzxzcGFuPjwvc3Bhbj4nKTtcblx0XHRcdC8qIVxuXHRcdFx0b2kgPSBvYmouY2hpbGRyZW4oXCJpOnZpc2libGVcIiksXG5cdFx0XHRhaSA9IGEuY2hpbGRyZW4oXCJpOnZpc2libGVcIiksXG5cdFx0XHR3MSA9IG9pLndpZHRoKCkgKiBvaS5sZW5ndGgsXG5cdFx0XHR3MiA9IGFpLndpZHRoKCkgKiBhaS5sZW5ndGgsXG5cdFx0XHQqL1xuXHRcdFx0dCAgPSBkZWZhdWx0X3RleHQ7XG5cdFx0XHRoMSA9ICQoXCI8XCIrXCJkaXY+PC9kaXY+XCIsIHsgY3NzIDogeyBcInBvc2l0aW9uXCIgOiBcImFic29sdXRlXCIsIFwidG9wXCIgOiBcIi0yMDBweFwiLCBcImxlZnRcIiA6IChydGwgPyBcIjBweFwiIDogXCItMTAwMHB4XCIpLCBcInZpc2liaWxpdHlcIiA6IFwiaGlkZGVuXCIgfSB9KS5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTtcblx0XHRcdGgyID0gJChcIjxcIitcImlucHV0IC8+XCIsIHtcblx0XHRcdFx0XHRcdFwidmFsdWVcIiA6IHQsXG5cdFx0XHRcdFx0XHRcImNsYXNzXCIgOiBcImpzdHJlZS1yZW5hbWUtaW5wdXRcIixcblx0XHRcdFx0XHRcdC8vIFwic2l6ZVwiIDogdC5sZW5ndGgsXG5cdFx0XHRcdFx0XHRcImNzc1wiIDoge1xuXHRcdFx0XHRcdFx0XHRcInBhZGRpbmdcIiA6IFwiMFwiLFxuXHRcdFx0XHRcdFx0XHRcImJvcmRlclwiIDogXCIxcHggc29saWQgc2lsdmVyXCIsXG5cdFx0XHRcdFx0XHRcdFwiYm94LXNpemluZ1wiIDogXCJib3JkZXItYm94XCIsXG5cdFx0XHRcdFx0XHRcdFwiZGlzcGxheVwiIDogXCJpbmxpbmUtYmxvY2tcIixcblx0XHRcdFx0XHRcdFx0XCJoZWlnaHRcIiA6ICh0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0KSArIFwicHhcIixcblx0XHRcdFx0XHRcdFx0XCJsaW5lSGVpZ2h0XCIgOiAodGhpcy5fZGF0YS5jb3JlLmxpX2hlaWdodCkgKyBcInB4XCIsXG5cdFx0XHRcdFx0XHRcdFwid2lkdGhcIiA6IFwiMTUwcHhcIiAvLyB3aWxsIGJlIHNldCBhIGJpdCBmdXJ0aGVyIGRvd25cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImJsdXJcIiA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0dmFyIGkgPSBzLmNoaWxkcmVuKFwiLmpzdHJlZS1yZW5hbWUtaW5wdXRcIiksXG5cdFx0XHRcdFx0XHRcdFx0diA9IGkudmFsKCksXG5cdFx0XHRcdFx0XHRcdFx0ZiA9IHRoaXMuc2V0dGluZ3MuY29yZS5mb3JjZV90ZXh0LFxuXHRcdFx0XHRcdFx0XHRcdG52O1xuXHRcdFx0XHRcdFx0XHRpZih2ID09PSBcIlwiKSB7IHYgPSB0OyB9XG5cdFx0XHRcdFx0XHRcdGgxLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRzLnJlcGxhY2VXaXRoKGEpO1xuXHRcdFx0XHRcdFx0XHRzLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHR0ID0gZiA/IHQgOiAkKCc8ZGl2PjwvZGl2PicpLmFwcGVuZCgkLnBhcnNlSFRNTCh0KSkuaHRtbCgpO1xuXHRcdFx0XHRcdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0X3RleHQob2JqLCB0KTtcblx0XHRcdFx0XHRcdFx0bnYgPSAhIXRoaXMucmVuYW1lX25vZGUob2JqLCBmID8gJCgnPGRpdj48L2Rpdj4nKS50ZXh0KHYpLnRleHQoKSA6ICQoJzxkaXY+PC9kaXY+JykuYXBwZW5kKCQucGFyc2VIVE1MKHYpKS5odG1sKCkpO1xuXHRcdFx0XHRcdFx0XHRpZighbnYpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldF90ZXh0KG9iaiwgdCk7IC8vIG1vdmUgdGhpcyB1cD8gYW5kIGZpeCAjNDgzXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmZvY3VzZWQgPSB0bXAuaWQ7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBub2RlID0gdGhpcy5nZXRfbm9kZSh0bXAuaWQsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdGlmKG5vZGUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9IHRtcC5pZDtcblx0XHRcdFx0XHRcdFx0XHRcdG5vZGUuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSwgMCk7XG5cdFx0XHRcdFx0XHRcdGlmKGNhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2suY2FsbCh0aGlzLCB0bXAsIG52LCBjYW5jZWwsIHYpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGgyID0gbnVsbDtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSxcblx0XHRcdFx0XHRcdFwia2V5ZG93blwiIDogZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGtleSA9IGUud2hpY2g7XG5cdFx0XHRcdFx0XHRcdGlmKGtleSA9PT0gMjcpIHtcblx0XHRcdFx0XHRcdFx0XHRjYW5jZWwgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMudmFsdWUgPSB0O1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGtleSA9PT0gMjcgfHwga2V5ID09PSAxMyB8fCBrZXkgPT09IDM3IHx8IGtleSA9PT0gMzggfHwga2V5ID09PSAzOSB8fCBrZXkgPT09IDQwIHx8IGtleSA9PT0gMzIpIHtcblx0XHRcdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKGtleSA9PT0gMjcgfHwga2V5ID09PSAxMykge1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmJsdXIoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwiY2xpY2tcIiA6IGZ1bmN0aW9uIChlKSB7IGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7IH0sXG5cdFx0XHRcdFx0XHRcIm1vdXNlZG93blwiIDogZnVuY3Rpb24gKGUpIHsgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTsgfSxcblx0XHRcdFx0XHRcdFwia2V5dXBcIiA6IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGgyLndpZHRoKE1hdGgubWluKGgxLnRleHQoXCJwV1wiICsgdGhpcy52YWx1ZSkud2lkdGgoKSx3KSk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XCJrZXlwcmVzc1wiIDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdFx0XHRpZihlLndoaWNoID09PSAxMykgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0Zm4gPSB7XG5cdFx0XHRcdFx0XHRmb250RmFtaWx5XHRcdDogYS5jc3MoJ2ZvbnRGYW1pbHknKVx0XHR8fCAnJyxcblx0XHRcdFx0XHRcdGZvbnRTaXplXHRcdDogYS5jc3MoJ2ZvbnRTaXplJylcdFx0XHR8fCAnJyxcblx0XHRcdFx0XHRcdGZvbnRXZWlnaHRcdFx0OiBhLmNzcygnZm9udFdlaWdodCcpXHRcdHx8ICcnLFxuXHRcdFx0XHRcdFx0Zm9udFN0eWxlXHRcdDogYS5jc3MoJ2ZvbnRTdHlsZScpXHRcdHx8ICcnLFxuXHRcdFx0XHRcdFx0Zm9udFN0cmV0Y2hcdFx0OiBhLmNzcygnZm9udFN0cmV0Y2gnKVx0XHR8fCAnJyxcblx0XHRcdFx0XHRcdGZvbnRWYXJpYW50XHRcdDogYS5jc3MoJ2ZvbnRWYXJpYW50JylcdFx0fHwgJycsXG5cdFx0XHRcdFx0XHRsZXR0ZXJTcGFjaW5nXHQ6IGEuY3NzKCdsZXR0ZXJTcGFjaW5nJylcdHx8ICcnLFxuXHRcdFx0XHRcdFx0d29yZFNwYWNpbmdcdFx0OiBhLmNzcygnd29yZFNwYWNpbmcnKVx0XHR8fCAnJ1xuXHRcdFx0XHR9O1xuXHRcdFx0cy5hdHRyKCdjbGFzcycsIGEuYXR0cignY2xhc3MnKSkuYXBwZW5kKGEuY29udGVudHMoKS5jbG9uZSgpKS5hcHBlbmQoaDIpO1xuXHRcdFx0YS5yZXBsYWNlV2l0aChzKTtcblx0XHRcdGgxLmNzcyhmbik7XG5cdFx0XHRoMi5jc3MoZm4pLndpZHRoKE1hdGgubWluKGgxLnRleHQoXCJwV1wiICsgaDJbMF0udmFsdWUpLndpZHRoKCksdykpWzBdLnNlbGVjdCgpO1xuXHRcdFx0JChkb2N1bWVudCkub25lKCdtb3VzZWRvd24uanN0cmVlIHRvdWNoc3RhcnQuanN0cmVlIGRuZF9zdGFydC52YWthdGEnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoaDIgJiYgZS50YXJnZXQgIT09IGgyKSB7XG5cdFx0XHRcdFx0JChoMikudHJpZ2dlcignYmx1cicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cblx0XHQvKipcblx0XHQgKiBjaGFuZ2VzIHRoZSB0aGVtZVxuXHRcdCAqIEBuYW1lIHNldF90aGVtZSh0aGVtZV9uYW1lIFssIHRoZW1lX3VybF0pXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lX25hbWUgdGhlIG5hbWUgb2YgdGhlIG5ldyB0aGVtZSB0byBhcHBseVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IHRoZW1lX3VybCAgdGhlIGxvY2F0aW9uIG9mIHRoZSBDU1MgZmlsZSBmb3IgdGhpcyB0aGVtZS4gT21pdCBvciBzZXQgdG8gYGZhbHNlYCBpZiB5b3UgbWFudWFsbHkgaW5jbHVkZWQgdGhlIGZpbGUuIFNldCB0byBgdHJ1ZWAgdG8gYXV0b2xvYWQgZnJvbSB0aGUgYGNvcmUudGhlbWVzLmRpcmAgZGlyZWN0b3J5LlxuXHRcdCAqIEB0cmlnZ2VyIHNldF90aGVtZS5qc3RyZWVcblx0XHQgKi9cblx0XHRzZXRfdGhlbWUgOiBmdW5jdGlvbiAodGhlbWVfbmFtZSwgdGhlbWVfdXJsKSB7XG5cdFx0XHRpZighdGhlbWVfbmFtZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKHRoZW1lX3VybCA9PT0gdHJ1ZSkge1xuXHRcdFx0XHR2YXIgZGlyID0gdGhpcy5zZXR0aW5ncy5jb3JlLnRoZW1lcy5kaXI7XG5cdFx0XHRcdGlmKCFkaXIpIHsgZGlyID0gJC5qc3RyZWUucGF0aCArICcvdGhlbWVzJzsgfVxuXHRcdFx0XHR0aGVtZV91cmwgPSBkaXIgKyAnLycgKyB0aGVtZV9uYW1lICsgJy9zdHlsZS5jc3MnO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhlbWVfdXJsICYmICQuaW5BcnJheSh0aGVtZV91cmwsIHRoZW1lc19sb2FkZWQpID09PSAtMSkge1xuXHRcdFx0XHQkKCdoZWFkJykuYXBwZW5kKCc8JysnbGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIicgKyB0aGVtZV91cmwgKyAnXCIgdHlwZT1cInRleHQvY3NzXCIgLz4nKTtcblx0XHRcdFx0dGhlbWVzX2xvYWRlZC5wdXNoKHRoZW1lX3VybCk7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUudGhlbWVzLm5hbWUpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50LnJlbW92ZUNsYXNzKCdqc3RyZWUtJyArIHRoaXMuX2RhdGEuY29yZS50aGVtZXMubmFtZSk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLm5hbWUgPSB0aGVtZV9uYW1lO1xuXHRcdFx0dGhpcy5lbGVtZW50LmFkZENsYXNzKCdqc3RyZWUtJyArIHRoZW1lX25hbWUpO1xuXHRcdFx0dGhpcy5lbGVtZW50W3RoaXMuc2V0dGluZ3MuY29yZS50aGVtZXMucmVzcG9uc2l2ZSA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnIF0oJ2pzdHJlZS0nICsgdGhlbWVfbmFtZSArICctcmVzcG9uc2l2ZScpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhIHRoZW1lIGlzIHNldFxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzZXRfdGhlbWUuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgdGhlIG5ldyB0aGVtZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NldF90aGVtZScsIHsgJ3RoZW1lJyA6IHRoZW1lX25hbWUgfSk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBnZXRzIHRoZSBuYW1lIG9mIHRoZSBjdXJyZW50bHkgYXBwbGllZCB0aGVtZSBuYW1lXG5cdFx0ICogQG5hbWUgZ2V0X3RoZW1lKClcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdFx0ICovXG5cdFx0Z2V0X3RoZW1lIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5uYW1lOyB9LFxuXHRcdC8qKlxuXHRcdCAqIGNoYW5nZXMgdGhlIHRoZW1lIHZhcmlhbnQgKGlmIHRoZSB0aGVtZSBoYXMgdmFyaWFudHMpXG5cdFx0ICogQG5hbWUgc2V0X3RoZW1lX3ZhcmlhbnQodmFyaWFudF9uYW1lKVxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfEJvb2xlYW59IHZhcmlhbnRfbmFtZSB0aGUgdmFyaWFudCB0byBhcHBseSAoaWYgYGZhbHNlYCBpcyB1c2VkIHRoZSBjdXJyZW50IHZhcmlhbnQgaXMgcmVtb3ZlZClcblx0XHQgKi9cblx0XHRzZXRfdGhlbWVfdmFyaWFudCA6IGZ1bmN0aW9uICh2YXJpYW50X25hbWUpIHtcblx0XHRcdGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMudmFyaWFudCkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2pzdHJlZS0nICsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5uYW1lICsgJy0nICsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy52YXJpYW50KTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2RhdGEuY29yZS50aGVtZXMudmFyaWFudCA9IHZhcmlhbnRfbmFtZTtcblx0XHRcdGlmKHZhcmlhbnRfbmFtZSkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2pzdHJlZS0nICsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5uYW1lICsgJy0nICsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy52YXJpYW50KTtcblx0XHRcdH1cblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGdldHMgdGhlIG5hbWUgb2YgdGhlIGN1cnJlbnRseSBhcHBsaWVkIHRoZW1lIHZhcmlhbnRcblx0XHQgKiBAbmFtZSBnZXRfdGhlbWUoKVxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cblx0XHQgKi9cblx0XHRnZXRfdGhlbWVfdmFyaWFudCA6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2RhdGEuY29yZS50aGVtZXMudmFyaWFudDsgfSxcblx0XHQvKipcblx0XHQgKiBzaG93cyBhIHN0cmlwZWQgYmFja2dyb3VuZCBvbiB0aGUgY29udGFpbmVyIChpZiB0aGUgdGhlbWUgc3VwcG9ydHMgaXQpXG5cdFx0ICogQG5hbWUgc2hvd19zdHJpcGVzKClcblx0XHQgKi9cblx0XHRzaG93X3N0cmlwZXMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnN0cmlwZXMgPSB0cnVlO1xuXHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkuYWRkQ2xhc3MoXCJqc3RyZWUtc3RyaXBlZFwiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gc3RyaXBlcyBhcmUgc2hvd25cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2hvd19zdHJpcGVzLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nob3dfc3RyaXBlcycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaGlkZXMgdGhlIHN0cmlwZWQgYmFja2dyb3VuZCBvbiB0aGUgY29udGFpbmVyXG5cdFx0ICogQG5hbWUgaGlkZV9zdHJpcGVzKClcblx0XHQgKi9cblx0XHRoaWRlX3N0cmlwZXMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLnN0cmlwZXMgPSBmYWxzZTtcblx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLnJlbW92ZUNsYXNzKFwianN0cmVlLXN0cmlwZWRcIik7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIHN0cmlwZXMgYXJlIGhpZGRlblxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBoaWRlX3N0cmlwZXMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9zdHJpcGVzJyk7XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiB0b2dnbGVzIHRoZSBzdHJpcGVkIGJhY2tncm91bmQgb24gdGhlIGNvbnRhaW5lclxuXHRcdCAqIEBuYW1lIHRvZ2dsZV9zdHJpcGVzKClcblx0XHQgKi9cblx0XHR0b2dnbGVfc3RyaXBlcyA6IGZ1bmN0aW9uICgpIHsgaWYodGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5zdHJpcGVzKSB7IHRoaXMuaGlkZV9zdHJpcGVzKCk7IH0gZWxzZSB7IHRoaXMuc2hvd19zdHJpcGVzKCk7IH0gfSxcblx0XHQvKipcblx0XHQgKiBzaG93cyB0aGUgY29ubmVjdGluZyBkb3RzIChpZiB0aGUgdGhlbWUgc3VwcG9ydHMgaXQpXG5cdFx0ICogQG5hbWUgc2hvd19kb3RzKClcblx0XHQgKi9cblx0XHRzaG93X2RvdHMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHMgPSB0cnVlO1xuXHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtbm8tZG90c1wiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gZG90cyBhcmUgc2hvd25cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2hvd19kb3RzLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nob3dfZG90cycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaGlkZXMgdGhlIGNvbm5lY3RpbmcgZG90c1xuXHRcdCAqIEBuYW1lIGhpZGVfZG90cygpXG5cdFx0ICovXG5cdFx0aGlkZV9kb3RzIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5kb3RzID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5hZGRDbGFzcyhcImpzdHJlZS1uby1kb3RzXCIpO1xuXHRcdFx0LyoqXG5cdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBkb3RzIGFyZSBoaWRkZW5cblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgaGlkZV9kb3RzLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2hpZGVfZG90cycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlcyB0aGUgY29ubmVjdGluZyBkb3RzXG5cdFx0ICogQG5hbWUgdG9nZ2xlX2RvdHMoKVxuXHRcdCAqL1xuXHRcdHRvZ2dsZV9kb3RzIDogZnVuY3Rpb24gKCkgeyBpZih0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmRvdHMpIHsgdGhpcy5oaWRlX2RvdHMoKTsgfSBlbHNlIHsgdGhpcy5zaG93X2RvdHMoKTsgfSB9LFxuXHRcdC8qKlxuXHRcdCAqIHNob3cgdGhlIG5vZGUgaWNvbnNcblx0XHQgKiBAbmFtZSBzaG93X2ljb25zKClcblx0XHQgKi9cblx0XHRzaG93X2ljb25zIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5pY29ucyA9IHRydWU7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5yZW1vdmVDbGFzcyhcImpzdHJlZS1uby1pY29uc1wiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gaWNvbnMgYXJlIHNob3duXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHNob3dfaWNvbnMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignc2hvd19pY29ucycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogaGlkZSB0aGUgbm9kZSBpY29uc1xuXHRcdCAqIEBuYW1lIGhpZGVfaWNvbnMoKVxuXHRcdCAqL1xuXHRcdGhpZGVfaWNvbnMgOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmljb25zID0gZmFsc2U7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5hZGRDbGFzcyhcImpzdHJlZS1uby1pY29uc1wiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gaWNvbnMgYXJlIGhpZGRlblxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBoaWRlX2ljb25zLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ2hpZGVfaWNvbnMnKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIHRvZ2dsZSB0aGUgbm9kZSBpY29uc1xuXHRcdCAqIEBuYW1lIHRvZ2dsZV9pY29ucygpXG5cdFx0ICovXG5cdFx0dG9nZ2xlX2ljb25zIDogZnVuY3Rpb24gKCkgeyBpZih0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmljb25zKSB7IHRoaXMuaGlkZV9pY29ucygpOyB9IGVsc2UgeyB0aGlzLnNob3dfaWNvbnMoKTsgfSB9LFxuXHRcdC8qKlxuXHRcdCAqIHNob3cgdGhlIG5vZGUgZWxsaXBzaXNcblx0XHQgKiBAbmFtZSBzaG93X2ljb25zKClcblx0XHQgKi9cblx0XHRzaG93X2VsbGlwc2lzIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5lbGxpcHNpcyA9IHRydWU7XG5cdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5hZGRDbGFzcyhcImpzdHJlZS1lbGxpcHNpc1wiKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gZWxsaXNpcyBpcyBzaG93blxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzaG93X2VsbGlwc2lzLmpzdHJlZVxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3Nob3dfZWxsaXBzaXMnKTtcblx0XHR9LFxuXHRcdC8qKlxuXHRcdCAqIGhpZGUgdGhlIG5vZGUgZWxsaXBzaXNcblx0XHQgKiBAbmFtZSBoaWRlX2VsbGlwc2lzKClcblx0XHQgKi9cblx0XHRoaWRlX2VsbGlwc2lzIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5lbGxpcHNpcyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5nZXRfY29udGFpbmVyX3VsKCkucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtZWxsaXBzaXNcIik7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGVsbGlzaXMgaXMgaGlkZGVuXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIGhpZGVfZWxsaXBzaXMuanN0cmVlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcignaGlkZV9lbGxpcHNpcycpO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlIHRoZSBub2RlIGVsbGlwc2lzXG5cdFx0ICogQG5hbWUgdG9nZ2xlX2ljb25zKClcblx0XHQgKi9cblx0XHR0b2dnbGVfZWxsaXBzaXMgOiBmdW5jdGlvbiAoKSB7IGlmKHRoaXMuX2RhdGEuY29yZS50aGVtZXMuZWxsaXBzaXMpIHsgdGhpcy5oaWRlX2VsbGlwc2lzKCk7IH0gZWxzZSB7IHRoaXMuc2hvd19lbGxpcHNpcygpOyB9IH0sXG5cdFx0LyoqXG5cdFx0ICogc2V0IHRoZSBub2RlIGljb24gZm9yIGEgbm9kZVxuXHRcdCAqIEBuYW1lIHNldF9pY29uKG9iaiwgaWNvbilcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmpcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gaWNvbiB0aGUgbmV3IGljb24gLSBjYW4gYmUgYSBwYXRoIHRvIGFuIGljb24gb3IgYSBjbGFzc05hbWUsIGlmIHVzaW5nIGFuIGltYWdlIHRoYXQgaXMgaW4gdGhlIGN1cnJlbnQgZGlyZWN0b3J5IHVzZSBhIGAuL2AgcHJlZml4LCBvdGhlcndpc2UgaXQgd2lsbCBiZSBkZXRlY3RlZCBhcyBhIGNsYXNzXG5cdFx0ICovXG5cdFx0c2V0X2ljb24gOiBmdW5jdGlvbiAob2JqLCBpY29uKSB7XG5cdFx0XHR2YXIgdDEsIHQyLCBkb20sIG9sZDtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuc2V0X2ljb24ob2JqW3QxXSwgaWNvbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdG9sZCA9IG9iai5pY29uO1xuXHRcdFx0b2JqLmljb24gPSBpY29uID09PSB0cnVlIHx8IGljb24gPT09IG51bGwgfHwgaWNvbiA9PT0gdW5kZWZpbmVkIHx8IGljb24gPT09ICcnID8gdHJ1ZSA6IGljb247XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSkuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5jaGlsZHJlbihcIi5qc3RyZWUtdGhlbWVpY29uXCIpO1xuXHRcdFx0aWYoaWNvbiA9PT0gZmFsc2UpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKCdqc3RyZWUtdGhlbWVpY29uLWN1c3RvbSAnICsgb2xkKS5jc3MoXCJiYWNrZ3JvdW5kXCIsXCJcIikucmVtb3ZlQXR0cihcInJlbFwiKTtcblx0XHRcdFx0dGhpcy5oaWRlX2ljb24ob2JqKTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoaWNvbiA9PT0gdHJ1ZSB8fCBpY29uID09PSBudWxsIHx8IGljb24gPT09IHVuZGVmaW5lZCB8fCBpY29uID09PSAnJykge1xuXHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoJ2pzdHJlZS10aGVtZWljb24tY3VzdG9tICcgKyBvbGQpLmNzcyhcImJhY2tncm91bmRcIixcIlwiKS5yZW1vdmVBdHRyKFwicmVsXCIpO1xuXHRcdFx0XHRpZihvbGQgPT09IGZhbHNlKSB7IHRoaXMuc2hvd19pY29uKG9iaik7IH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYoaWNvbi5pbmRleE9mKFwiL1wiKSA9PT0gLTEgJiYgaWNvbi5pbmRleE9mKFwiLlwiKSA9PT0gLTEpIHtcblx0XHRcdFx0ZG9tLnJlbW92ZUNsYXNzKG9sZCkuY3NzKFwiYmFja2dyb3VuZFwiLFwiXCIpO1xuXHRcdFx0XHRkb20uYWRkQ2xhc3MoaWNvbiArICcganN0cmVlLXRoZW1laWNvbi1jdXN0b20nKS5hdHRyKFwicmVsXCIsaWNvbik7XG5cdFx0XHRcdGlmKG9sZCA9PT0gZmFsc2UpIHsgdGhpcy5zaG93X2ljb24ob2JqKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhvbGQpLmNzcyhcImJhY2tncm91bmRcIixcIlwiKTtcblx0XHRcdFx0ZG9tLmFkZENsYXNzKCdqc3RyZWUtdGhlbWVpY29uLWN1c3RvbScpLmNzcyhcImJhY2tncm91bmRcIiwgXCJ1cmwoJ1wiICsgaWNvbiArIFwiJykgY2VudGVyIGNlbnRlciBuby1yZXBlYXRcIikuYXR0cihcInJlbFwiLGljb24pO1xuXHRcdFx0XHRpZihvbGQgPT09IGZhbHNlKSB7IHRoaXMuc2hvd19pY29uKG9iaik7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogZ2V0IHRoZSBub2RlIGljb24gZm9yIGEgbm9kZVxuXHRcdCAqIEBuYW1lIGdldF9pY29uKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmpcblx0XHQgKiBAcmV0dXJuIHtTdHJpbmd9XG5cdFx0ICovXG5cdFx0Z2V0X2ljb24gOiBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRyZXR1cm4gKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSA/IGZhbHNlIDogb2JqLmljb247XG5cdFx0fSxcblx0XHQvKipcblx0XHQgKiBoaWRlIHRoZSBpY29uIG9uIGFuIGluZGl2aWR1YWwgbm9kZVxuXHRcdCAqIEBuYW1lIGhpZGVfaWNvbihvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqXG5cdFx0ICovXG5cdFx0aGlkZV9pY29uIDogZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0Mjtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuaGlkZV9pY29uKG9ialt0MV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmogPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRvYmouaWNvbiA9IGZhbHNlO1xuXHRcdFx0dGhpcy5nZXRfbm9kZShvYmosIHRydWUpLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuY2hpbGRyZW4oXCIuanN0cmVlLXRoZW1laWNvblwiKS5hZGRDbGFzcygnanN0cmVlLXRoZW1laWNvbi1oaWRkZW4nKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cdFx0LyoqXG5cdFx0ICogc2hvdyB0aGUgaWNvbiBvbiBhbiBpbmRpdmlkdWFsIG5vZGVcblx0XHQgKiBAbmFtZSBzaG93X2ljb24ob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9ialxuXHRcdCAqL1xuXHRcdHNob3dfaWNvbiA6IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciB0MSwgdDIsIGRvbTtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuc2hvd19pY29uKG9ialt0MV0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmogPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRvYmouaWNvbiA9IGRvbS5sZW5ndGggPyBkb20uY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5jaGlsZHJlbihcIi5qc3RyZWUtdGhlbWVpY29uXCIpLmF0dHIoJ3JlbCcpIDogdHJ1ZTtcblx0XHRcdGlmKCFvYmouaWNvbikgeyBvYmouaWNvbiA9IHRydWU7IH1cblx0XHRcdGRvbS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS10aGVtZWljb25cIikucmVtb3ZlQ2xhc3MoJ2pzdHJlZS10aGVtZWljb24taGlkZGVuJyk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH07XG5cblx0Ly8gaGVscGVyc1xuXHQkLnZha2F0YSA9IHt9O1xuXHQvLyBjb2xsZWN0IGF0dHJpYnV0ZXNcblx0JC52YWthdGEuYXR0cmlidXRlcyA9IGZ1bmN0aW9uKG5vZGUsIHdpdGhfdmFsdWVzKSB7XG5cdFx0bm9kZSA9ICQobm9kZSlbMF07XG5cdFx0dmFyIGF0dHIgPSB3aXRoX3ZhbHVlcyA/IHt9IDogW107XG5cdFx0aWYobm9kZSAmJiBub2RlLmF0dHJpYnV0ZXMpIHtcblx0XHRcdCQuZWFjaChub2RlLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCB2KSB7XG5cdFx0XHRcdGlmKCQuaW5BcnJheSh2Lm5hbWUudG9Mb3dlckNhc2UoKSxbJ3N0eWxlJywnY29udGVudGVkaXRhYmxlJywnaGFzZm9jdXMnLCd0YWJpbmRleCddKSAhPT0gLTEpIHsgcmV0dXJuOyB9XG5cdFx0XHRcdGlmKHYudmFsdWUgIT09IG51bGwgJiYgJC52YWthdGEudHJpbSh2LnZhbHVlKSAhPT0gJycpIHtcblx0XHRcdFx0XHRpZih3aXRoX3ZhbHVlcykgeyBhdHRyW3YubmFtZV0gPSB2LnZhbHVlOyB9XG5cdFx0XHRcdFx0ZWxzZSB7IGF0dHIucHVzaCh2Lm5hbWUpOyB9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gYXR0cjtcblx0fTtcblx0JC52YWthdGEuYXJyYXlfdW5pcXVlID0gZnVuY3Rpb24oYXJyYXkpIHtcblx0XHR2YXIgYSA9IFtdLCBpLCBqLCBsLCBvID0ge307XG5cdFx0Zm9yKGkgPSAwLCBsID0gYXJyYXkubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRpZihvW2FycmF5W2ldXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGEucHVzaChhcnJheVtpXSk7XG5cdFx0XHRcdG9bYXJyYXlbaV1dID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGE7XG5cdH07XG5cdC8vIHJlbW92ZSBpdGVtIGZyb20gYXJyYXlcblx0JC52YWthdGEuYXJyYXlfcmVtb3ZlID0gZnVuY3Rpb24oYXJyYXksIGZyb20pIHtcblx0XHRhcnJheS5zcGxpY2UoZnJvbSwgMSk7XG5cdFx0cmV0dXJuIGFycmF5O1xuXHRcdC8vdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG5cdFx0Ly9hcnJheS5sZW5ndGggPSBmcm9tIDwgMCA/IGFycmF5Lmxlbmd0aCArIGZyb20gOiBmcm9tO1xuXHRcdC8vYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG5cdFx0Ly9yZXR1cm4gYXJyYXk7XG5cdH07XG5cdC8vIHJlbW92ZSBpdGVtIGZyb20gYXJyYXlcblx0JC52YWthdGEuYXJyYXlfcmVtb3ZlX2l0ZW0gPSBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuXHRcdHZhciB0bXAgPSAkLmluQXJyYXkoaXRlbSwgYXJyYXkpO1xuXHRcdHJldHVybiB0bXAgIT09IC0xID8gJC52YWthdGEuYXJyYXlfcmVtb3ZlKGFycmF5LCB0bXApIDogYXJyYXk7XG5cdH07XG5cdCQudmFrYXRhLmFycmF5X2ZpbHRlciA9IGZ1bmN0aW9uKGMsYSxiLGQsZSkge1xuXHRcdGlmIChjLmZpbHRlcikge1xuXHRcdFx0cmV0dXJuIGMuZmlsdGVyKGEsIGIpO1xuXHRcdH1cblx0XHRkPVtdO1xuXHRcdGZvciAoZSBpbiBjKSB7XG5cdFx0XHRpZiAofn5lKycnPT09ZSsnJyAmJiBlPj0wICYmIGEuY2FsbChiLGNbZV0sK2UsYykpIHtcblx0XHRcdFx0ZC5wdXNoKGNbZV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZDtcblx0fTtcblx0JC52YWthdGEudHJpbSA9IGZ1bmN0aW9uICh0ZXh0KSB7XG5cdFx0cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbSA/IFxuXHRcdFx0U3RyaW5nLnByb3RvdHlwZS50cmltLmNhbGwodGV4dC50b1N0cmluZygpKSA6XG5cdFx0XHR0ZXh0LnRvU3RyaW5nKCkucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcblx0fTtcblx0JC52YWthdGEuaXNfZnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBvYmoubm9kZVR5cGUgIT09IFwibnVtYmVyXCI7XG5cdH07XG5cdCQudmFrYXRhLmlzX2FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG5cdFx0cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgQXJyYXldXCI7XG5cdH07XG5cblx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX29iamVjdHMvRnVuY3Rpb24vYmluZCNwb2x5ZmlsbFxuXHRpZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG5cdFx0RnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgdGhhdEZ1bmMgPSB0aGlzLCB0aGF0QXJnID0gYXJndW1lbnRzWzBdO1xuXHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXHRcdFx0aWYgKHR5cGVvZiB0aGF0RnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHQvLyBjbG9zZXN0IHRoaW5nIHBvc3NpYmxlIHRvIHRoZSBFQ01BU2NyaXB0IDVcblx0XHRcdFx0Ly8gaW50ZXJuYWwgSXNDYWxsYWJsZSBmdW5jdGlvblxuXHRcdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCAtIHdoYXQgaXMgdHJ5aW5nIHRvIGJlIGJvdW5kIGlzIG5vdCBjYWxsYWJsZScpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHZhciBmdW5jQXJncyA9IGFyZ3MuY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuXHRcdFx0XHRyZXR1cm4gdGhhdEZ1bmMuYXBwbHkodGhhdEFyZywgZnVuY0FyZ3MpO1xuXHRcdFx0fTtcblx0XHR9O1xuXHR9XG5cblxuLyoqXG4gKiAjIyMgQ2hhbmdlZCBwbHVnaW5cbiAqXG4gKiBUaGlzIHBsdWdpbiBhZGRzIG1vcmUgaW5mb3JtYXRpb24gdG8gdGhlIGBjaGFuZ2VkLmpzdHJlZWAgZXZlbnQuIFRoZSBuZXcgZGF0YSBpcyBjb250YWluZWQgaW4gdGhlIGBjaGFuZ2VkYCBldmVudCBkYXRhIHByb3BlcnR5LCBhbmQgY29udGFpbnMgYSBsaXN0cyBvZiBgc2VsZWN0ZWRgIGFuZCBgZGVzZWxlY3RlZGAgbm9kZXMuXG4gKi9cblxuXHQkLmpzdHJlZS5wbHVnaW5zLmNoYW5nZWQgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dmFyIGxhc3QgPSBbXTtcblx0XHR0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXYsIGRhdGEpIHtcblx0XHRcdHZhciBpLCBqO1xuXHRcdFx0aWYoIWRhdGEpIHtcblx0XHRcdFx0ZGF0YSA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0aWYoZXYucmVwbGFjZSgnLmpzdHJlZScsJycpID09PSAnY2hhbmdlZCcpIHtcblx0XHRcdFx0ZGF0YS5jaGFuZ2VkID0geyBzZWxlY3RlZCA6IFtdLCBkZXNlbGVjdGVkIDogW10gfTtcblx0XHRcdFx0dmFyIHRtcCA9IHt9O1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBsYXN0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdHRtcFtsYXN0W2ldXSA9IDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZGF0YS5zZWxlY3RlZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRpZighdG1wW2RhdGEuc2VsZWN0ZWRbaV1dKSB7XG5cdFx0XHRcdFx0XHRkYXRhLmNoYW5nZWQuc2VsZWN0ZWQucHVzaChkYXRhLnNlbGVjdGVkW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHR0bXBbZGF0YS5zZWxlY3RlZFtpXV0gPSAyO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBsYXN0Lmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKHRtcFtsYXN0W2ldXSA9PT0gMSkge1xuXHRcdFx0XHRcdFx0ZGF0YS5jaGFuZ2VkLmRlc2VsZWN0ZWQucHVzaChsYXN0W2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0bGFzdCA9IGRhdGEuc2VsZWN0ZWQuc2xpY2UoKTtcblx0XHRcdH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gc2VsZWN0aW9uIGNoYW5nZXMgKHRoZSBcImNoYW5nZWRcIiBwbHVnaW4gZW5oYW5jZXMgdGhlIG9yaWdpbmFsIGV2ZW50IHdpdGggbW9yZSBkYXRhKVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjaGFuZ2VkLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBhY3Rpb24gdGhlIGFjdGlvbiB0aGF0IGNhdXNlZCB0aGUgc2VsZWN0aW9uIHRvIGNoYW5nZVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gY2hhbmdlZCBhbiBvYmplY3QgY29udGFpbmluZyB0d28gcHJvcGVydGllcyBgc2VsZWN0ZWRgIGFuZCBgZGVzZWxlY3RlZGAgLSBib3RoIGFycmF5cyBvZiBub2RlIElEcywgd2hpY2ggd2VyZSBzZWxlY3RlZCBvciBkZXNlbGVjdGVkIHNpbmNlIHRoZSBsYXN0IGNoYW5nZWQgZXZlbnRcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgKGlmIGFueSkgdGhhdCB0cmlnZ2VyZWQgdGhpcyBjaGFuZ2VkIGV2ZW50XG5cdFx0XHQgKiBAcGx1Z2luIGNoYW5nZWRcblx0XHRcdCAqL1xuXHRcdFx0cGFyZW50LnRyaWdnZXIuY2FsbCh0aGlzLCBldiwgZGF0YSk7XG5cdFx0fTtcblx0XHR0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoc2tpcF9sb2FkaW5nLCBmb3JnZXRfc3RhdGUpIHtcblx0XHRcdGxhc3QgPSBbXTtcblx0XHRcdHJldHVybiBwYXJlbnQucmVmcmVzaC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH07XG5cbi8qKlxuICogIyMjIENoZWNrYm94IHBsdWdpblxuICpcbiAqIFRoaXMgcGx1Z2luIHJlbmRlcnMgY2hlY2tib3ggaWNvbnMgaW4gZnJvbnQgb2YgZWFjaCBub2RlLCBtYWtpbmcgbXVsdGlwbGUgc2VsZWN0aW9uIG11Y2ggZWFzaWVyLlxuICogSXQgYWxzbyBzdXBwb3J0cyB0cmktc3RhdGUgYmVoYXZpb3IsIG1lYW5pbmcgdGhhdCBpZiBhIG5vZGUgaGFzIGEgZmV3IG9mIGl0cyBjaGlsZHJlbiBjaGVja2VkIGl0IHdpbGwgYmUgcmVuZGVyZWQgYXMgdW5kZXRlcm1pbmVkLCBhbmQgc3RhdGUgd2lsbCBiZSBwcm9wYWdhdGVkIHVwLlxuICovXG5cblx0dmFyIF9pID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnSScpO1xuXHRfaS5jbGFzc05hbWUgPSAnanN0cmVlLWljb24ganN0cmVlLWNoZWNrYm94Jztcblx0X2kuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuXHQvKipcblx0ICogc3RvcmVzIGFsbCBkZWZhdWx0cyBmb3IgdGhlIGNoZWNrYm94IHBsdWdpblxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveFxuXHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdCAqL1xuXHQkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveCA9IHtcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBjaGVja2JveGVzIHNob3VsZCBiZSB2aXNpYmxlIChjYW4gYmUgY2hhbmdlZCBhdCBhIGxhdGVyIHRpbWUgdXNpbmcgYHNob3dfY2hlY2tib3hlcygpYCBhbmQgYGhpZGVfY2hlY2tib3hlc2ApLiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY2hlY2tib3gudmlzaWJsZVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR2aXNpYmxlXHRcdFx0XHQ6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgY2hlY2tib3hlcyBzaG91bGQgY2FzY2FkZSBkb3duIGFuZCBoYXZlIGFuIHVuZGV0ZXJtaW5lZCBzdGF0ZS4gRGVmYXVsdHMgdG8gYHRydWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNoZWNrYm94LnRocmVlX3N0YXRlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRocmVlX3N0YXRlXHRcdFx0OiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGNsaWNraW5nIGFueXdoZXJlIG9uIHRoZSBub2RlIHNob3VsZCBhY3QgYXMgY2xpY2tpbmcgb24gdGhlIGNoZWNrYm94LiBEZWZhdWx0cyB0byBgdHJ1ZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY2hlY2tib3gud2hvbGVfbm9kZVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR3aG9sZV9ub2RlXHRcdFx0OiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSBzZWxlY3RlZCBzdHlsZSBvZiBhIG5vZGUgc2hvdWxkIGJlIGtlcHQsIG9yIHJlbW92ZWQuIERlZmF1bHRzIHRvIGB0cnVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC5rZWVwX3NlbGVjdGVkX3N0eWxlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdGtlZXBfc2VsZWN0ZWRfc3R5bGVcdDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBUaGlzIHNldHRpbmcgY29udHJvbHMgaG93IGNhc2NhZGluZyBhbmQgdW5kZXRlcm1pbmVkIG5vZGVzIGFyZSBhcHBsaWVkLlxuXHRcdCAqIElmICd1cCcgaXMgaW4gdGhlIHN0cmluZyAtIGNhc2NhZGluZyB1cCBpcyBlbmFibGVkLCBpZiAnZG93bicgaXMgaW4gdGhlIHN0cmluZyAtIGNhc2NhZGluZyBkb3duIGlzIGVuYWJsZWQsIGlmICd1bmRldGVybWluZWQnIGlzIGluIHRoZSBzdHJpbmcgLSB1bmRldGVybWluZWQgbm9kZXMgd2lsbCBiZSB1c2VkLlxuXHRcdCAqIElmIGB0aHJlZV9zdGF0ZWAgaXMgc2V0IHRvIGB0cnVlYCB0aGlzIHNldHRpbmcgaXMgYXV0b21hdGljYWxseSBzZXQgdG8gJ3VwK2Rvd24rdW5kZXRlcm1pbmVkJy4gRGVmYXVsdHMgdG8gJycuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY2hlY2tib3guY2FzY2FkZVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHRjYXNjYWRlXHRcdFx0XHQ6ICcnLFxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgc2V0dGluZyBjb250cm9scyBpZiBjaGVja2JveCBhcmUgYm91bmQgdG8gdGhlIGdlbmVyYWwgdHJlZSBzZWxlY3Rpb24gb3IgdG8gYW4gaW50ZXJuYWwgYXJyYXkgbWFpbnRhaW5lZCBieSB0aGUgY2hlY2tib3ggcGx1Z2luLiBEZWZhdWx0cyB0byBgdHJ1ZWAsIG9ubHkgc2V0IHRvIGBmYWxzZWAgaWYgeW91IGtub3cgZXhhY3RseSB3aGF0IHlvdSBhcmUgZG9pbmcuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY2hlY2tib3gudGllX3NlbGVjdGlvblxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aWVfc2VsZWN0aW9uXHRcdDogdHJ1ZSxcblxuXHRcdC8qKlxuXHRcdCAqIFRoaXMgc2V0dGluZyBjb250cm9scyBpZiBjYXNjYWRpbmcgZG93biBhZmZlY3RzIGRpc2FibGVkIGNoZWNrYm94ZXNcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC5jYXNjYWRlX3RvX2Rpc2FibGVkXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdGNhc2NhZGVfdG9fZGlzYWJsZWQgOiB0cnVlLFxuXG5cdFx0LyoqXG5cdFx0ICogVGhpcyBzZXR0aW5nIGNvbnRyb2xzIGlmIGNhc2NhZGluZyBkb3duIGFmZmVjdHMgaGlkZGVuIGNoZWNrYm94ZXNcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC5jYXNjYWRlX3RvX2hpZGRlblxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHRjYXNjYWRlX3RvX2hpZGRlbiA6IHRydWVcblx0fTtcblx0JC5qc3RyZWUucGx1Z2lucy5jaGVja2JveCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC51dG8gPSBmYWxzZTtcblx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgPSBbXTtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGhyZWVfc3RhdGUpIHtcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlID0gJ3VwK2Rvd24rdW5kZXRlcm1pbmVkJztcblx0XHRcdH1cblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJpbml0LmpzdHJlZVwiLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnZpc2libGUgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LnZpc2libGU7XG5cdFx0XHRcdFx0XHRpZighdGhpcy5zZXR0aW5ncy5jaGVja2JveC5rZWVwX3NlbGVjdGVkX3N0eWxlKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5hZGRDbGFzcygnanN0cmVlLWNoZWNrYm94LW5vLWNsaWNrZWQnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuYWRkQ2xhc3MoJ2pzdHJlZS1jaGVja2JveC1zZWxlY3Rpb24nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImxvYWRpbmcuanN0cmVlXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXNbIHRoaXMuX2RhdGEuY2hlY2tib3gudmlzaWJsZSA/ICdzaG93X2NoZWNrYm94ZXMnIDogJ2hpZGVfY2hlY2tib3hlcycgXSgpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUuaW5kZXhPZigndW5kZXRlcm1pbmVkJykgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdC5vbignY2hhbmdlZC5qc3RyZWUgdW5jaGVja19ub2RlLmpzdHJlZSBjaGVja19ub2RlLmpzdHJlZSB1bmNoZWNrX2FsbC5qc3RyZWUgY2hlY2tfYWxsLmpzdHJlZSBtb3ZlX25vZGUuanN0cmVlIGNvcHlfbm9kZS5qc3RyZWUgcmVkcmF3LmpzdHJlZSBvcGVuX25vZGUuanN0cmVlJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQvLyBvbmx5IGlmIHVuZGV0ZXJtaW5lZCBpcyBpbiBzZXR0aW5nXG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY2hlY2tib3gudXRvKSB7IGNsZWFyVGltZW91dCh0aGlzLl9kYXRhLmNoZWNrYm94LnV0byk7IH1cblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC51dG8gPSBzZXRUaW1lb3V0KHRoaXMuX3VuZGV0ZXJtaW5lZC5iaW5kKHRoaXMpLCA1MCk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0XHQub24oJ21vZGVsLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR2YXIgbSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdHAgPSBtW2RhdGEucGFyZW50XSxcblx0XHRcdFx0XHRcdFx0ZHBjID0gZGF0YS5ub2Rlcyxcblx0XHRcdFx0XHRcdFx0aSwgajtcblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IGRwYy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0bVtkcGNbaV1dLnN0YXRlLmNoZWNrZWQgPSBtW2RwY1tpXV0uc3RhdGUuY2hlY2tlZCB8fCAobVtkcGNbaV1dLm9yaWdpbmFsICYmIG1bZHBjW2ldXS5vcmlnaW5hbC5zdGF0ZSAmJiBtW2RwY1tpXV0ub3JpZ2luYWwuc3RhdGUuY2hlY2tlZCk7XG5cdFx0XHRcdFx0XHRcdGlmKG1bZHBjW2ldXS5zdGF0ZS5jaGVja2VkKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZC5wdXNoKGRwY1tpXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLmluZGV4T2YoJ3VwJykgIT09IC0xIHx8IHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZS5pbmRleE9mKCdkb3duJykgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdC5vbignbW9kZWwuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRcdFx0XHRcdHAgPSBtW2RhdGEucGFyZW50XSxcblx0XHRcdFx0XHRcdFx0XHRkcGMgPSBkYXRhLm5vZGVzLFxuXHRcdFx0XHRcdFx0XHRcdGNoZCA9IFtdLFxuXHRcdFx0XHRcdFx0XHRcdGMsIGksIGosIGssIGwsIHRtcCwgcyA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZSwgdCA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbjtcblxuXHRcdFx0XHRcdFx0XHRpZihzLmluZGV4T2YoJ2Rvd24nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBhcHBseSBkb3duXG5cdFx0XHRcdFx0XHRcdFx0aWYocC5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZHBjLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5jb25jYXQoZHBjKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkcGMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKG1bZHBjW2ldXS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IG1bZHBjW2ldXS5jaGlsZHJlbl9kLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0bVttW2RwY1tpXV0uY2hpbGRyZW5fZFtrXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5jb25jYXQobVtkcGNbaV1dLmNoaWxkcmVuX2QpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYocy5pbmRleE9mKCd1cCcpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdC8vIGFwcGx5IHVwXG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIW1bcC5jaGlsZHJlbl9kW2ldXS5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y2hkLnB1c2gobVtwLmNoaWxkcmVuX2RbaV1dLnBhcmVudCk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGNoZCA9ICQudmFrYXRhLmFycmF5X3VuaXF1ZShjaGQpO1xuXHRcdFx0XHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IGNoZC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdHAgPSBtW2NoZFtrXV07XG5cdFx0XHRcdFx0XHRcdFx0XHR3aGlsZShwICYmIHAuaWQgIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YyArPSBtW3AuY2hpbGRyZW5baV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGMgPT09IGopIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLnB1c2gocC5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcyggdCA/ICdqc3RyZWUtY2xpY2tlZCcgOiAnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUocC5wYXJlbnQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV91bmlxdWUodGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0Lm9uKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbiA/ICdzZWxlY3Rfbm9kZS5qc3RyZWUnIDogJ2NoZWNrX25vZGUuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzLFxuXHRcdFx0XHRcdFx0XHRcdG9iaiA9IGRhdGEubm9kZSxcblx0XHRcdFx0XHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0XHRcdFx0XHRwYXIgPSB0aGlzLmdldF9ub2RlKG9iai5wYXJlbnQpLFxuXHRcdFx0XHRcdFx0XHRcdGksIGosIGMsIHRtcCwgcyA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3guY2FzY2FkZSwgdCA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbixcblx0XHRcdFx0XHRcdFx0XHRzZWwgPSB7fSwgY3VyID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZDtcblxuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwLCBqID0gY3VyLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdHNlbFtjdXJbaV1dID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdC8vIGFwcGx5IGRvd25cblx0XHRcdFx0XHRcdFx0aWYocy5pbmRleE9mKCdkb3duJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly90aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkID0gJC52YWthdGEuYXJyYXlfdW5pcXVlKHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQuY29uY2F0KG9iai5jaGlsZHJlbl9kKSk7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSWRzID0gdGhpcy5fY2FzY2FkZV9uZXdfY2hlY2tlZF9zdGF0ZShvYmouaWQsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdHZhciB0ZW1wID0gb2JqLmNoaWxkcmVuX2QuY29uY2F0KG9iai5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMCwgaiA9IHRlbXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsZWN0ZWRJZHMuaW5kZXhPZih0ZW1wW2ldKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNlbFt0ZW1wW2ldXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVsZXRlIHNlbFt0ZW1wW2ldXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHQvLyBhcHBseSB1cFxuXHRcdFx0XHRcdFx0XHRpZihzLmluZGV4T2YoJ3VwJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUocGFyICYmIHBhci5pZCAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0YyA9IDA7XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwYXIuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGMgKz0gbVtwYXIuY2hpbGRyZW5baV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYoYyA9PT0gaikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwYXIuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxbcGFyLmlkXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC8vdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZC5wdXNoKHBhci5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUocGFyLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUocGFyLnBhcmVudCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y3VyID0gW107XG5cdFx0XHRcdFx0XHRcdGZvciAoaSBpbiBzZWwpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAoc2VsLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjdXIucHVzaChpKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCA9IGN1cjtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHQub24odGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uID8gJ2Rlc2VsZWN0X2FsbC5qc3RyZWUnIDogJ3VuY2hlY2tfYWxsLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBvYmogPSB0aGlzLmdldF9ub2RlKCQuanN0cmVlLnJvb3QpLFxuXHRcdFx0XHRcdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRcdFx0XHRcdGksIGosIHRtcDtcblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkcmVuX2QubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG1wID0gbVtvYmouY2hpbGRyZW5fZFtpXV07XG5cdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5vcmlnaW5hbCAmJiB0bXAub3JpZ2luYWwuc3RhdGUgJiYgdG1wLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dG1wLm9yaWdpbmFsLnN0YXRlLnVuZGV0ZXJtaW5lZCA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5vbih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24gPyAnZGVzZWxlY3Rfbm9kZS5qc3RyZWUnIDogJ3VuY2hlY2tfbm9kZS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgc2VsZiA9IHRoaXMsXG5cdFx0XHRcdFx0XHRcdFx0b2JqID0gZGF0YS5ub2RlLFxuXHRcdFx0XHRcdFx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKSxcblx0XHRcdFx0XHRcdFx0XHRpLCBqLCB0bXAsIHMgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUsIHQgPSB0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24sXG5cdFx0XHRcdFx0XHRcdFx0Y3VyID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCwgc2VsID0ge30sXG5cdFx0XHRcdFx0XHRcdFx0c3RpbGxTZWxlY3RlZElkcyA9IFtdLFxuXHRcdFx0XHRcdFx0XHRcdGFsbElkcyA9IG9iai5jaGlsZHJlbl9kLmNvbmNhdChvYmouaWQpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIGFwcGx5IGRvd25cblx0XHRcdFx0XHRcdFx0aWYocy5pbmRleE9mKCdkb3duJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHNlbGVjdGVkSWRzID0gdGhpcy5fY2FzY2FkZV9uZXdfY2hlY2tlZF9zdGF0ZShvYmouaWQsIGZhbHNlKTtcblxuXHRcdFx0XHRcdFx0XHRcdGN1ciA9ICQudmFrYXRhLmFycmF5X2ZpbHRlcihjdXIsIGZ1bmN0aW9uKGlkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYWxsSWRzLmluZGV4T2YoaWQpID09PSAtMSB8fCBzZWxlY3RlZElkcy5pbmRleE9mKGlkKSA+IC0xO1xuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Ly8gb25seSBhcHBseSB1cCBpZiBjYXNjYWRlIHVwIGlzIGVuYWJsZWQgYW5kIGlmIHRoaXMgbm9kZSBpcyBub3Qgc2VsZWN0ZWRcblx0XHRcdFx0XHRcdFx0Ly8gKGlmIGFsbCBjaGlsZCBub2RlcyBhcmUgZGlzYWJsZWQgYW5kIGNhc2NhZGVfdG9fZGlzYWJsZWQgPT09IGZhbHNlIHRoZW4gdGhpcyBub2RlIHdpbGwgdGlsbCBiZSBzZWxlY3RlZCkuXG5cdFx0XHRcdFx0XHRcdGlmKHMuaW5kZXhPZigndXAnKSAhPT0gLTEgJiYgY3VyLmluZGV4T2Yob2JqLmlkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBvYmoucGFyZW50cy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuX21vZGVsLmRhdGFbb2JqLnBhcmVudHNbaV1dO1xuXHRcdFx0XHRcdFx0XHRcdFx0dG1wLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLm9yaWdpbmFsICYmIHRtcC5vcmlnaW5hbC5zdGF0ZSAmJiB0bXAub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcC5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUob2JqLnBhcmVudHNbaV0sIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSkuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykucmVtb3ZlQ2xhc3ModCA/ICdqc3RyZWUtY2xpY2tlZCcgOiAnanN0cmVlLWNoZWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRjdXIgPSAkLnZha2F0YS5hcnJheV9maWx0ZXIoY3VyLCBmdW5jdGlvbihpZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9iai5wYXJlbnRzLmluZGV4T2YoaWQpID09PSAtMTtcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSBjdXI7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLmluZGV4T2YoJ3VwJykgIT09IC0xKSB7XG5cdFx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHRcdC5vbignZGVsZXRlX25vZGUuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0Ly8gYXBwbHkgdXAgKHdob2xlIGhhbmRsZXIpXG5cdFx0XHRcdFx0XHRcdHZhciBwID0gdGhpcy5nZXRfbm9kZShkYXRhLnBhcmVudCksXG5cdFx0XHRcdFx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdFx0XHRcdFx0aSwgaiwgYywgdG1wLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uO1xuXHRcdFx0XHRcdFx0XHR3aGlsZShwICYmIHAuaWQgIT09ICQuanN0cmVlLnJvb3QgJiYgIXAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0pIHtcblx0XHRcdFx0XHRcdFx0XHRjID0gMDtcblx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0YyArPSBtW3AuY2hpbGRyZW5baV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihqID4gMCAmJiBjID09PSBqKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQucHVzaChwLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUocCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZih0bXAgJiYgdG1wLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHAgPSB0aGlzLmdldF9ub2RlKHAucGFyZW50KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHRcdC5vbignbW92ZV9ub2RlLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdC8vIGFwcGx5IHVwICh3aG9sZSBoYW5kbGVyKVxuXHRcdFx0XHRcdFx0XHR2YXIgaXNfbXVsdGkgPSBkYXRhLmlzX211bHRpLFxuXHRcdFx0XHRcdFx0XHRcdG9sZF9wYXIgPSBkYXRhLm9sZF9wYXJlbnQsXG5cdFx0XHRcdFx0XHRcdFx0bmV3X3BhciA9IHRoaXMuZ2V0X25vZGUoZGF0YS5wYXJlbnQpLFxuXHRcdFx0XHRcdFx0XHRcdG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRcdFx0XHRcdHAsIGMsIGksIGosIHRtcCwgdCA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbjtcblx0XHRcdFx0XHRcdFx0aWYoIWlzX211bHRpKSB7XG5cdFx0XHRcdFx0XHRcdFx0cCA9IHRoaXMuZ2V0X25vZGUob2xkX3Bhcik7XG5cdFx0XHRcdFx0XHRcdFx0d2hpbGUocCAmJiBwLmlkICE9PSAkLmpzdHJlZS5yb290ICYmICFwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjID0gMDtcblx0XHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGMgKz0gbVtwLmNoaWxkcmVuW2ldXS5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmKGogPiAwICYmIGMgPT09IGopIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cC5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQucHVzaChwLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmFkZENsYXNzKHQgPyAnanN0cmVlLWNsaWNrZWQnIDogJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdHAgPSB0aGlzLmdldF9ub2RlKHAucGFyZW50KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cCA9IG5ld19wYXI7XG5cdFx0XHRcdFx0XHRcdHdoaWxlKHAgJiYgcC5pZCAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRcdGMgPSAwO1xuXHRcdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHAuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRjICs9IG1bcC5jaGlsZHJlbltpXV0uc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF07XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmKGMgPT09IGopIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKCFwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHAuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLnB1c2gocC5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUocCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKHRtcCAmJiB0bXAubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYocC5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGFbIHQgPyAnY29yZScgOiAnY2hlY2tib3gnIF0uc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV9yZW1vdmVfaXRlbSh0aGlzLl9kYXRhWyB0ID8gJ2NvcmUnIDogJ2NoZWNrYm94JyBdLnNlbGVjdGVkLCBwLmlkKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShwLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0bXAuYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdHAgPSB0aGlzLmdldF9ub2RlKHAucGFyZW50KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgbm9kZXMgd2hvc2Ugc3RhdGUgaXMgXCJ1bmRldGVybWluZWRcIlxuXHRcdCAqIEBuYW1lIGdldF91bmRldGVybWluZWQoW2Z1bGxdKVxuXHRcdCAqIEBwYXJhbSAge2Jvb2xlYW59IGZ1bGw6IGlmIHNldCB0byBgdHJ1ZWAgdGhlIHJldHVybmVkIGFycmF5IHdpbGwgY29uc2lzdCBvZiB0aGUgZnVsbCBub2RlIG9iamVjdHMsIG90aGVyd2lzZSAtIG9ubHkgSURzIHdpbGwgYmUgcmV0dXJuZWRcblx0XHQgKiBAcmV0dXJuIHtBcnJheX1cblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5nZXRfdW5kZXRlcm1pbmVkID0gZnVuY3Rpb24gKGZ1bGwpIHtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUuaW5kZXhPZigndW5kZXRlcm1pbmVkJykgPT09IC0xKSB7XG5cdFx0XHRcdHJldHVybiBbXTtcblx0XHRcdH1cblx0XHRcdHZhciBpLCBqLCBrLCBsLCBvID0ge30sIG0gPSB0aGlzLl9tb2RlbC5kYXRhLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uLCBzID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCwgcCA9IFtdLCB0dCA9IHRoaXMsIHIgPSBbXTtcblx0XHRcdGZvcihpID0gMCwgaiA9IHMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKG1bc1tpXV0gJiYgbVtzW2ldXS5wYXJlbnRzKSB7XG5cdFx0XHRcdFx0Zm9yKGsgPSAwLCBsID0gbVtzW2ldXS5wYXJlbnRzLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0aWYob1ttW3NbaV1dLnBhcmVudHNba11dICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihtW3NbaV1dLnBhcmVudHNba10gIT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0XHRcdFx0b1ttW3NbaV1dLnBhcmVudHNba11dID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0cC5wdXNoKG1bc1tpXV0ucGFyZW50c1trXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQvLyBhdHRlbXB0IGZvciBzZXJ2ZXIgc2lkZSB1bmRldGVybWluZWQgc3RhdGVcblx0XHRcdHRoaXMuZWxlbWVudC5maW5kKCcuanN0cmVlLWNsb3NlZCcpLm5vdCgnOmhhcyguanN0cmVlLWNoaWxkcmVuKScpXG5cdFx0XHRcdC5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgdG1wID0gdHQuZ2V0X25vZGUodGhpcyksIHRtcDI7XG5cdFx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoIXRtcCkgeyByZXR1cm47IH1cblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZighdG1wLnN0YXRlLmxvYWRlZCkge1xuXHRcdFx0XHRcdFx0aWYodG1wLm9yaWdpbmFsICYmIHRtcC5vcmlnaW5hbC5zdGF0ZSAmJiB0bXAub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkICYmIHRtcC5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0aWYob1t0bXAuaWRdID09PSB1bmRlZmluZWQgJiYgdG1wLmlkICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0b1t0bXAuaWRdID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0XHRwLnB1c2godG1wLmlkKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRmb3IoayA9IDAsIGwgPSB0bXAucGFyZW50cy5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZihvW3RtcC5wYXJlbnRzW2tdXSA9PT0gdW5kZWZpbmVkICYmIHRtcC5wYXJlbnRzW2tdICE9PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvW3RtcC5wYXJlbnRzW2tdXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLnB1c2godG1wLnBhcmVudHNba10pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHR0bXAyID0gbVt0bXAuY2hpbGRyZW5fZFtpXV07XG5cdFx0XHRcdFx0XHRcdGlmKCF0bXAyLnN0YXRlLmxvYWRlZCAmJiB0bXAyLm9yaWdpbmFsICYmIHRtcDIub3JpZ2luYWwuc3RhdGUgJiYgdG1wMi5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgJiYgdG1wMi5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0XHRpZihvW3RtcDIuaWRdID09PSB1bmRlZmluZWQgJiYgdG1wMi5pZCAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0b1t0bXAyLmlkXSA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLnB1c2godG1wMi5pZCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGZvcihrID0gMCwgbCA9IHRtcDIucGFyZW50cy5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdGlmKG9bdG1wMi5wYXJlbnRzW2tdXSA9PT0gdW5kZWZpbmVkICYmIHRtcDIucGFyZW50c1trXSAhPT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRvW3RtcDIucGFyZW50c1trXV0gPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwLnB1c2godG1wMi5wYXJlbnRzW2tdKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0Zm9yIChpID0gMCwgaiA9IHAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGlmKCFtW3BbaV1dLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0ci5wdXNoKGZ1bGwgPyBtW3BbaV1dIDogcFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiByO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogc2V0IHRoZSB1bmRldGVybWluZWQgc3RhdGUgd2hlcmUgYW5kIGlmIG5lY2Vzc2FyeS4gVXNlZCBpbnRlcm5hbGx5LlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgX3VuZGV0ZXJtaW5lZCgpXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuX3VuZGV0ZXJtaW5lZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmKHRoaXMuZWxlbWVudCA9PT0gbnVsbCkgeyByZXR1cm47IH1cblx0XHRcdHZhciBwID0gdGhpcy5nZXRfdW5kZXRlcm1pbmVkKGZhbHNlKSwgaSwgaiwgcztcblxuXHRcdFx0dGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtdW5kZXRlcm1pbmVkJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS11bmRldGVybWluZWQnKTtcblx0XHRcdGZvciAoaSA9IDAsIGogPSBwLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRzID0gdGhpcy5nZXRfbm9kZShwW2ldLCB0cnVlKTtcblx0XHRcdFx0aWYocyAmJiBzLmxlbmd0aCkge1xuXHRcdFx0XHRcdHMuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuY2hpbGRyZW4oJy5qc3RyZWUtY2hlY2tib3gnKS5hZGRDbGFzcygnanN0cmVlLXVuZGV0ZXJtaW5lZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLnJlZHJhd19ub2RlID0gZnVuY3Rpb24ob2JqLCBkZWVwLCBpc19jYWxsYmFjaywgZm9yY2VfcmVuZGVyKSB7XG5cdFx0XHRvYmogPSBwYXJlbnQucmVkcmF3X25vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmKG9iaikge1xuXHRcdFx0XHR2YXIgaSwgaiwgdG1wID0gbnVsbCwgaWNvbiA9IG51bGw7XG5cdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdGlmKG9iai5jaGlsZE5vZGVzW2ldICYmIG9iai5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZSAmJiBvYmouY2hpbGROb2Rlc1tpXS5jbGFzc05hbWUuaW5kZXhPZihcImpzdHJlZS1hbmNob3JcIikgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHR0bXAgPSBvYmouY2hpbGROb2Rlc1tpXTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZih0bXApIHtcblx0XHRcdFx0XHRpZighdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uICYmIHRoaXMuX21vZGVsLmRhdGFbb2JqLmlkXS5zdGF0ZS5jaGVja2VkKSB7IHRtcC5jbGFzc05hbWUgKz0gJyBqc3RyZWUtY2hlY2tlZCc7IH1cblx0XHRcdFx0XHRpY29uID0gX2kuY2xvbmVOb2RlKGZhbHNlKTtcblx0XHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW29iai5pZF0uc3RhdGUuY2hlY2tib3hfZGlzYWJsZWQpIHsgaWNvbi5jbGFzc05hbWUgKz0gJyBqc3RyZWUtY2hlY2tib3gtZGlzYWJsZWQnOyB9XG5cdFx0XHRcdFx0dG1wLmluc2VydEJlZm9yZShpY29uLCB0bXAuY2hpbGROb2Rlc1swXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmKCFpc19jYWxsYmFjayAmJiB0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGUuaW5kZXhPZigndW5kZXRlcm1pbmVkJykgIT09IC0xKSB7XG5cdFx0XHRcdGlmKHRoaXMuX2RhdGEuY2hlY2tib3gudXRvKSB7IGNsZWFyVGltZW91dCh0aGlzLl9kYXRhLmNoZWNrYm94LnV0byk7IH1cblx0XHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC51dG8gPSBzZXRUaW1lb3V0KHRoaXMuX3VuZGV0ZXJtaW5lZC5iaW5kKHRoaXMpLCA1MCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogc2hvdyB0aGUgbm9kZSBjaGVja2JveCBpY29uc1xuXHRcdCAqIEBuYW1lIHNob3dfY2hlY2tib3hlcygpXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuc2hvd19jaGVja2JveGVzID0gZnVuY3Rpb24gKCkgeyB0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmNoZWNrYm94ZXMgPSB0cnVlOyB0aGlzLmdldF9jb250YWluZXJfdWwoKS5yZW1vdmVDbGFzcyhcImpzdHJlZS1uby1jaGVja2JveGVzXCIpOyB9O1xuXHRcdC8qKlxuXHRcdCAqIGhpZGUgdGhlIG5vZGUgY2hlY2tib3ggaWNvbnNcblx0XHQgKiBAbmFtZSBoaWRlX2NoZWNrYm94ZXMoKVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmhpZGVfY2hlY2tib3hlcyA9IGZ1bmN0aW9uICgpIHsgdGhpcy5fZGF0YS5jb3JlLnRoZW1lcy5jaGVja2JveGVzID0gZmFsc2U7IHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKFwianN0cmVlLW5vLWNoZWNrYm94ZXNcIik7IH07XG5cdFx0LyoqXG5cdFx0ICogdG9nZ2xlIHRoZSBub2RlIGljb25zXG5cdFx0ICogQG5hbWUgdG9nZ2xlX2NoZWNrYm94ZXMoKVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLnRvZ2dsZV9jaGVja2JveGVzID0gZnVuY3Rpb24gKCkgeyBpZih0aGlzLl9kYXRhLmNvcmUudGhlbWVzLmNoZWNrYm94ZXMpIHsgdGhpcy5oaWRlX2NoZWNrYm94ZXMoKTsgfSBlbHNlIHsgdGhpcy5zaG93X2NoZWNrYm94ZXMoKTsgfSB9O1xuXHRcdC8qKlxuXHRcdCAqIGNoZWNrcyBpZiBhIG5vZGUgaXMgaW4gYW4gdW5kZXRlcm1pbmVkIHN0YXRlXG5cdFx0ICogQG5hbWUgaXNfdW5kZXRlcm1pbmVkKG9iailcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gb2JqXG5cdFx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR0aGlzLmlzX3VuZGV0ZXJtaW5lZCA9IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHZhciBzID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC5jYXNjYWRlLCBpLCBqLCB0ID0gdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uLCBkID0gdGhpcy5fZGF0YVsgdCA/ICdjb3JlJyA6ICdjaGVja2JveCcgXS5zZWxlY3RlZCwgbSA9IHRoaXMuX21vZGVsLmRhdGE7XG5cdFx0XHRpZighb2JqIHx8IG9iai5zdGF0ZVsgdCA/ICdzZWxlY3RlZCcgOiAnY2hlY2tlZCcgXSA9PT0gdHJ1ZSB8fCBzLmluZGV4T2YoJ3VuZGV0ZXJtaW5lZCcpID09PSAtMSB8fCAocy5pbmRleE9mKCdkb3duJykgPT09IC0xICYmIHMuaW5kZXhPZigndXAnKSA9PT0gLTEpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKCFvYmouc3RhdGUubG9hZGVkICYmIG9iai5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgPT09IHRydWUpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBvYmouY2hpbGRyZW5fZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYoJC5pbkFycmF5KG9iai5jaGlsZHJlbl9kW2ldLCBkKSAhPT0gLTEgfHwgKCFtW29iai5jaGlsZHJlbl9kW2ldXS5zdGF0ZS5sb2FkZWQgJiYgbVtvYmouY2hpbGRyZW5fZFtpXV0ub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkKSkge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBkaXNhYmxlIGEgbm9kZSdzIGNoZWNrYm94XG5cdFx0ICogQG5hbWUgZGlzYWJsZV9jaGVja2JveChvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIGFuIGFycmF5IGNhbiBiZSB1c2VkIHRvb1xuXHRcdCAqIEB0cmlnZ2VyIGRpc2FibGVfY2hlY2tib3guanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuZGlzYWJsZV9jaGVja2JveCA9IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdHZhciB0MSwgdDIsIGRvbTtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMuZGlzYWJsZV9jaGVja2JveChvYmpbdDFdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmogfHwgb2JqLmlkID09PSAkLmpzdHJlZS5yb290KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKTtcblx0XHRcdGlmKCFvYmouc3RhdGUuY2hlY2tib3hfZGlzYWJsZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLmNoZWNrYm94X2Rpc2FibGVkID0gdHJ1ZTtcblx0XHRcdFx0aWYoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuY2hpbGRyZW4oJy5qc3RyZWUtY2hlY2tib3gnKS5hZGRDbGFzcygnanN0cmVlLWNoZWNrYm94LWRpc2FibGVkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUncyBjaGVja2JveCBpcyBkaXNhYmxlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgZGlzYWJsZV9jaGVja2JveC5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdFx0XHQgKi9cblx0XHRcdFx0dGhpcy50cmlnZ2VyKCdkaXNhYmxlX2NoZWNrYm94JywgeyAnbm9kZScgOiBvYmogfSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBlbmFibGUgYSBub2RlJ3MgY2hlY2tib3hcblx0XHQgKiBAbmFtZSBlbmFibGVfY2hlY2tib3gob2JqKVxuXHRcdCAqIEBwYXJhbSB7bWl4ZWR9IG9iaiBhbiBhcnJheSBjYW4gYmUgdXNlZCB0b29cblx0XHQgKiBAdHJpZ2dlciBlbmFibGVfY2hlY2tib3guanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuZW5hYmxlX2NoZWNrYm94ID0gZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0dmFyIHQxLCB0MiwgZG9tO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5lbmFibGVfY2hlY2tib3gob2JqW3QxXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZihvYmouc3RhdGUuY2hlY2tib3hfZGlzYWJsZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLmNoZWNrYm94X2Rpc2FibGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZG9tLmNoaWxkcmVuKCcuanN0cmVlLWFuY2hvcicpLmNoaWxkcmVuKCcuanN0cmVlLWNoZWNrYm94JykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1jaGVja2JveC1kaXNhYmxlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8qKlxuXHRcdFx0XHQgKiB0cmlnZ2VyZWQgd2hlbiBhbiBub2RlJ3MgY2hlY2tib3ggaXMgZW5hYmxlZFxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgZW5hYmxlX2NoZWNrYm94LmpzdHJlZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gbm9kZVxuXHRcdFx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2VuYWJsZV9jaGVja2JveCcsIHsgJ25vZGUnIDogb2JqIH0pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLmFjdGl2YXRlX25vZGUgPSBmdW5jdGlvbiAob2JqLCBlKSB7XG5cdFx0XHRpZigkKGUudGFyZ2V0KS5oYXNDbGFzcygnanN0cmVlLWNoZWNrYm94LWRpc2FibGVkJykpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uICYmICh0aGlzLnNldHRpbmdzLmNoZWNrYm94Lndob2xlX25vZGUgfHwgJChlLnRhcmdldCkuaGFzQ2xhc3MoJ2pzdHJlZS1jaGVja2JveCcpKSkge1xuXHRcdFx0XHRlLmN0cmxLZXkgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uIHx8ICghdGhpcy5zZXR0aW5ncy5jaGVja2JveC53aG9sZV9ub2RlICYmICEkKGUudGFyZ2V0KS5oYXNDbGFzcygnanN0cmVlLWNoZWNrYm94JykpKSB7XG5cdFx0XHRcdHJldHVybiBwYXJlbnQuYWN0aXZhdGVfbm9kZS5jYWxsKHRoaXMsIG9iaiwgZSk7XG5cdFx0XHR9XG5cdFx0XHRpZih0aGlzLmlzX2Rpc2FibGVkKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0aWYodGhpcy5pc19jaGVja2VkKG9iaikpIHtcblx0XHRcdFx0dGhpcy51bmNoZWNrX25vZGUob2JqLCBlKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNoZWNrX25vZGUob2JqLCBlKTtcblx0XHRcdH1cblx0XHRcdHRoaXMudHJpZ2dlcignYWN0aXZhdGVfbm9kZScsIHsgJ25vZGUnIDogdGhpcy5nZXRfbm9kZShvYmopIH0pO1xuXHRcdH07XG5cblx0XHQvKipcblx0XHQgKiBDYXNjYWRlcyBjaGVja2VkIHN0YXRlIHRvIGEgbm9kZSBhbmQgYWxsIGl0cyBkZXNjZW5kYW50cy4gVGhpcyBmdW5jdGlvbiBkb2VzIE5PVCBhZmZlY3QgaGlkZGVuIGFuZCBkaXNhYmxlZCBub2RlcyAob3IgdGhlaXIgZGVzY2VuZGFudHMpLlxuXHRcdCAqIEhvd2V2ZXIgaWYgdGhlc2UgdW5hZmZlY3RlZCBub2RlcyBhcmUgYWxyZWFkeSBzZWxlY3RlZCB0aGVpciBpZHMgd2lsbCBiZSBpbmNsdWRlZCBpbiB0aGUgcmV0dXJuZWQgYXJyYXkuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAbmFtZSBfY2FzY2FkZV9uZXdfY2hlY2tlZF9zdGF0ZShpZCwgY2hlY2tlZFN0YXRlKVxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSBpZCB0aGUgbm9kZSBJRFxuXHRcdCAqIEBwYXJhbSB7Ym9vbH0gY2hlY2tlZFN0YXRlIHNob3VsZCB0aGUgbm9kZXMgYmUgY2hlY2tlZCBvciBub3Rcblx0XHQgKiBAcmV0dXJucyB7QXJyYXl9IEFycmF5IG9mIGFsbCBub2RlIGlkJ3MgKGluIHRoaXMgdHJlZSBicmFuY2gpIHRoYXQgYXJlIGNoZWNrZWQuXG5cdFx0ICovXG5cdFx0dGhpcy5fY2FzY2FkZV9uZXdfY2hlY2tlZF9zdGF0ZSA9IGZ1bmN0aW9uIChpZCwgY2hlY2tlZFN0YXRlKSB7XG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0XHR2YXIgdCA9IHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbjtcblx0XHRcdHZhciBub2RlID0gdGhpcy5fbW9kZWwuZGF0YVtpZF07XG5cdFx0XHR2YXIgc2VsZWN0ZWROb2RlSWRzID0gW107XG5cdFx0XHR2YXIgc2VsZWN0ZWRDaGlsZHJlbklkcyA9IFtdLCBpLCBqLCBzZWxlY3RlZENoaWxkSWRzO1xuXG5cdFx0XHRpZiAoXG5cdFx0XHRcdCh0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGVfdG9fZGlzYWJsZWQgfHwgIW5vZGUuc3RhdGUuZGlzYWJsZWQpICYmXG5cdFx0XHRcdCh0aGlzLnNldHRpbmdzLmNoZWNrYm94LmNhc2NhZGVfdG9faGlkZGVuIHx8ICFub2RlLnN0YXRlLmhpZGRlbilcblx0XHRcdCkge1xuXHRcdFx0XHQvL0ZpcnN0IHRyeSBhbmQgY2hlY2svdW5jaGVjayB0aGUgY2hpbGRyZW5cblx0XHRcdFx0aWYgKG5vZGUuY2hpbGRyZW4pIHtcblx0XHRcdFx0XHRmb3IgKGkgPSAwLCBqID0gbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdHZhciBjaGlsZElkID0gbm9kZS5jaGlsZHJlbltpXTtcblx0XHRcdFx0XHRcdHNlbGVjdGVkQ2hpbGRJZHMgPSBzZWxmLl9jYXNjYWRlX25ld19jaGVja2VkX3N0YXRlKGNoaWxkSWQsIGNoZWNrZWRTdGF0ZSk7XG5cdFx0XHRcdFx0XHRzZWxlY3RlZE5vZGVJZHMgPSBzZWxlY3RlZE5vZGVJZHMuY29uY2F0KHNlbGVjdGVkQ2hpbGRJZHMpO1xuXHRcdFx0XHRcdFx0aWYgKHNlbGVjdGVkQ2hpbGRJZHMuaW5kZXhPZihjaGlsZElkKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGVkQ2hpbGRyZW5JZHMucHVzaChjaGlsZElkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXIgZG9tID0gc2VsZi5nZXRfbm9kZShub2RlLCB0cnVlKTtcblxuXHRcdFx0XHQvL0Egbm9kZSdzIHN0YXRlIGlzIHVuZGV0ZXJtaW5lZCBpZiBzb21lIGJ1dCBub3QgYWxsIG9mIGl0J3MgY2hpbGRyZW4gYXJlIGNoZWNrZWQvc2VsZWN0ZWQgLlxuXHRcdFx0XHR2YXIgdW5kZXRlcm1pbmVkID0gc2VsZWN0ZWRDaGlsZHJlbklkcy5sZW5ndGggPiAwICYmIHNlbGVjdGVkQ2hpbGRyZW5JZHMubGVuZ3RoIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7XG5cblx0XHRcdFx0aWYobm9kZS5vcmlnaW5hbCAmJiBub2RlLm9yaWdpbmFsLnN0YXRlICYmIG5vZGUub3JpZ2luYWwuc3RhdGUudW5kZXRlcm1pbmVkKSB7XG5cdFx0XHRcdFx0bm9kZS5vcmlnaW5hbC5zdGF0ZS51bmRldGVybWluZWQgPSB1bmRldGVybWluZWQ7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL0lmIGEgbm9kZSBpcyB1bmRldGVybWluZWQgdGhlbiByZW1vdmUgc2VsZWN0ZWQgY2xhc3Ncblx0XHRcdFx0aWYgKHVuZGV0ZXJtaW5lZCkge1xuXHRcdFx0XHRcdG5vZGUuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSBmYWxzZTtcblx0XHRcdFx0XHRkb20uYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vT3RoZXJ3aXNlLCBpZiB0aGUgY2hlY2tlZFN0YXRlID09PSB0cnVlIChpLmUuIHRoZSBub2RlIGlzIGJlaW5nIGNoZWNrZWQgbm93KSBhbmQgYWxsIG9mIHRoZSBub2RlJ3MgY2hpbGRyZW4gYXJlIGNoZWNrZWQgKGlmIGl0IGhhcyBhbnkgY2hpbGRyZW4pLFxuXHRcdFx0XHQvL2NoZWNrIHRoZSBub2RlIGFuZCBzdHlsZSBpdCBjb3JyZWN0bHkuXG5cdFx0XHRcdGVsc2UgaWYgKGNoZWNrZWRTdGF0ZSAmJiBzZWxlY3RlZENoaWxkcmVuSWRzLmxlbmd0aCA9PT0gbm9kZS5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0XHRub2RlLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdID0gY2hlY2tlZFN0YXRlO1xuXHRcdFx0XHRcdHNlbGVjdGVkTm9kZUlkcy5wdXNoKG5vZGUuaWQpO1xuXG5cdFx0XHRcdFx0ZG9tLmF0dHIoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5hZGRDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdG5vZGUuc3RhdGVbIHQgPyAnc2VsZWN0ZWQnIDogJ2NoZWNrZWQnIF0gPSBmYWxzZTtcblx0XHRcdFx0XHRkb20uYXR0cignYXJpYS1zZWxlY3RlZCcsIGZhbHNlKS5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKS5yZW1vdmVDbGFzcyh0ID8gJ2pzdHJlZS1jbGlja2VkJyA6ICdqc3RyZWUtY2hlY2tlZCcpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0c2VsZWN0ZWRDaGlsZElkcyA9IHRoaXMuZ2V0X2NoZWNrZWRfZGVzY2VuZGFudHMoaWQpO1xuXG5cdFx0XHRcdGlmIChub2RlLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRDaGlsZElkcy5wdXNoKG5vZGUuaWQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c2VsZWN0ZWROb2RlSWRzID0gc2VsZWN0ZWROb2RlSWRzLmNvbmNhdChzZWxlY3RlZENoaWxkSWRzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNlbGVjdGVkTm9kZUlkcztcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogR2V0cyBpZHMgb2Ygbm9kZXMgc2VsZWN0ZWQgaW4gYnJhbmNoIChvZiB0cmVlKSBzcGVjaWZpZWQgYnkgaWQgKGRvZXMgbm90IGluY2x1ZGUgdGhlIG5vZGUgc3BlY2lmaWVkIGJ5IGlkKVxuXHRcdCAqIEBuYW1lIGdldF9jaGVja2VkX2Rlc2NlbmRhbnRzKG9iailcblx0XHQgKiBAcGFyYW0ge3N0cmluZ30gaWQgdGhlIG5vZGUgSURcblx0XHQgKiBAcmV0dXJuIHtBcnJheX0gYXJyYXkgb2YgSURzXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0X2NoZWNrZWRfZGVzY2VuZGFudHMgPSBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRcdHZhciB0ID0gc2VsZi5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uO1xuXHRcdFx0dmFyIG5vZGUgPSBzZWxmLl9tb2RlbC5kYXRhW2lkXTtcblxuXHRcdFx0cmV0dXJuICQudmFrYXRhLmFycmF5X2ZpbHRlcihub2RlLmNoaWxkcmVuX2QsIGZ1bmN0aW9uKF9pZCkge1xuXHRcdFx0XHRyZXR1cm4gc2VsZi5fbW9kZWwuZGF0YVtfaWRdLnN0YXRlWyB0ID8gJ3NlbGVjdGVkJyA6ICdjaGVja2VkJyBdO1xuXHRcdFx0fSk7XG5cdFx0fTtcblxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrIGEgbm9kZSAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlLCBvdGhlcndpc2Ugc2VsZWN0X25vZGUgd2lsbCBiZSBjYWxsZWQgaW50ZXJuYWxseSlcblx0XHQgKiBAbmFtZSBjaGVja19ub2RlKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogYW4gYXJyYXkgY2FuIGJlIHVzZWQgdG8gY2hlY2sgbXVsdGlwbGUgbm9kZXNcblx0XHQgKiBAdHJpZ2dlciBjaGVja19ub2RlLmpzdHJlZVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmNoZWNrX25vZGUgPSBmdW5jdGlvbiAob2JqLCBlKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuc2VsZWN0X25vZGUob2JqLCBmYWxzZSwgdHJ1ZSwgZSk7IH1cblx0XHRcdHZhciBkb20sIHQxLCB0MiwgdGg7XG5cdFx0XHRpZigkLnZha2F0YS5pc19hcnJheShvYmopKSB7XG5cdFx0XHRcdG9iaiA9IG9iai5zbGljZSgpO1xuXHRcdFx0XHRmb3IodDEgPSAwLCB0MiA9IG9iai5sZW5ndGg7IHQxIDwgdDI7IHQxKyspIHtcblx0XHRcdFx0XHR0aGlzLmNoZWNrX25vZGUob2JqW3QxXSwgZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0XHRvYmogPSB0aGlzLmdldF9ub2RlKG9iaik7XG5cdFx0XHRpZighb2JqIHx8IG9iai5pZCA9PT0gJC5qc3RyZWUucm9vdCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRkb20gPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZighb2JqLnN0YXRlLmNoZWNrZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLnB1c2gob2JqLmlkKTtcblx0XHRcdFx0aWYoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuYWRkQ2xhc3MoJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgY2hlY2tlZCAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlKVxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgY2hlY2tfbm9kZS5qc3RyZWVcblx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGVcblx0XHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgKGlmIGFueSkgdGhhdCB0cmlnZ2VyZWQgdGhpcyBjaGVja19ub2RlXG5cdFx0XHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignY2hlY2tfbm9kZScsIHsgJ25vZGUnIDogb2JqLCAnc2VsZWN0ZWQnIDogdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCwgJ2V2ZW50JyA6IGUgfSk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1bmNoZWNrIGEgbm9kZSAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlLCBvdGhlcndpc2UgZGVzZWxlY3Rfbm9kZSB3aWxsIGJlIGNhbGxlZCBpbnRlcm5hbGx5KVxuXHRcdCAqIEBuYW1lIHVuY2hlY2tfbm9kZShvYmopXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIGFuIGFycmF5IGNhbiBiZSB1c2VkIHRvIHVuY2hlY2sgbXVsdGlwbGUgbm9kZXNcblx0XHQgKiBAdHJpZ2dlciB1bmNoZWNrX25vZGUuanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMudW5jaGVja19ub2RlID0gZnVuY3Rpb24gKG9iaiwgZSkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLmRlc2VsZWN0X25vZGUob2JqLCBmYWxzZSwgZSk7IH1cblx0XHRcdHZhciB0MSwgdDIsIGRvbTtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KG9iaikpIHtcblx0XHRcdFx0b2JqID0gb2JqLnNsaWNlKCk7XG5cdFx0XHRcdGZvcih0MSA9IDAsIHQyID0gb2JqLmxlbmd0aDsgdDEgPCB0MjsgdDErKykge1xuXHRcdFx0XHRcdHRoaXMudW5jaGVja19ub2RlKG9ialt0MV0sIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShvYmosIHRydWUpO1xuXHRcdFx0aWYob2JqLnN0YXRlLmNoZWNrZWQpIHtcblx0XHRcdFx0b2JqLnN0YXRlLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCA9ICQudmFrYXRhLmFycmF5X3JlbW92ZV9pdGVtKHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQsIG9iai5pZCk7XG5cdFx0XHRcdGlmKGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20uY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFuIG5vZGUgaXMgdW5jaGVja2VkIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UpXG5cdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHQgKiBAbmFtZSB1bmNoZWNrX25vZGUuanN0cmVlXG5cdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlXG5cdFx0XHRcdCAqIEBwYXJhbSB7QXJyYXl9IHNlbGVjdGVkIHRoZSBjdXJyZW50IHNlbGVjdGlvblxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGV2ZW50IChpZiBhbnkpIHRoYXQgdHJpZ2dlcmVkIHRoaXMgdW5jaGVja19ub2RlXG5cdFx0XHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcigndW5jaGVja19ub2RlJywgeyAnbm9kZScgOiBvYmosICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLCAnZXZlbnQnIDogZSB9KTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdFxuXHRcdC8qKlxuXHRcdCAqIGNoZWNrcyBhbGwgbm9kZXMgaW4gdGhlIHRyZWUgKG9ubHkgaWYgdGllX3NlbGVjdGlvbiBpbiBjaGVja2JveCBzZXR0aW5ncyBpcyBmYWxzZSwgb3RoZXJ3aXNlIHNlbGVjdF9hbGwgd2lsbCBiZSBjYWxsZWQgaW50ZXJuYWxseSlcblx0XHQgKiBAbmFtZSBjaGVja19hbGwoKVxuXHRcdCAqIEB0cmlnZ2VyIGNoZWNrX2FsbC5qc3RyZWUsIGNoYW5nZWQuanN0cmVlXG5cdFx0ICogQHBsdWdpbiBjaGVja2JveFxuXHRcdCAqL1xuXHRcdHRoaXMuY2hlY2tfYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLnNlbGVjdF9hbGwoKTsgfVxuXHRcdFx0dmFyIHRtcCA9IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQuY29uY2F0KFtdKSwgaSwgajtcblx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgPSB0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdLmNoaWxkcmVuX2QuY29uY2F0KCk7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZih0aGlzLl9tb2RlbC5kYXRhW3RoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWRbaV1dKSB7XG5cdFx0XHRcdFx0dGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkW2ldXS5zdGF0ZS5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5yZWRyYXcodHJ1ZSk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgY2hlY2tlZCAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlKVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBjaGVja19hbGwuanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge0FycmF5fSBzZWxlY3RlZCB0aGUgY3VycmVudCBzZWxlY3Rpb25cblx0XHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjaGVja19hbGwnLCB7ICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkIH0pO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogdW5jaGVjayBhbGwgY2hlY2tlZCBub2RlcyAob25seSBpZiB0aWVfc2VsZWN0aW9uIGluIGNoZWNrYm94IHNldHRpbmdzIGlzIGZhbHNlLCBvdGhlcndpc2UgZGVzZWxlY3RfYWxsIHdpbGwgYmUgY2FsbGVkIGludGVybmFsbHkpXG5cdFx0ICogQG5hbWUgdW5jaGVja19hbGwoKVxuXHRcdCAqIEB0cmlnZ2VyIHVuY2hlY2tfYWxsLmpzdHJlZVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLnVuY2hlY2tfYWxsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLmRlc2VsZWN0X2FsbCgpOyB9XG5cdFx0XHR2YXIgdG1wID0gdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZC5jb25jYXQoW10pLCBpLCBqO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0aWYodGhpcy5fbW9kZWwuZGF0YVt0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkW2ldXSkge1xuXHRcdFx0XHRcdHRoaXMuX21vZGVsLmRhdGFbdGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZFtpXV0uc3RhdGUuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkID0gW107XG5cdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS1jaGVja2VkJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1jaGVja2VkJyk7XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIGFsbCBub2RlcyBhcmUgdW5jaGVja2VkIChvbmx5IGlmIHRpZV9zZWxlY3Rpb24gaW4gY2hlY2tib3ggc2V0dGluZ3MgaXMgZmFsc2UpXG5cdFx0XHQgKiBAZXZlbnRcblx0XHRcdCAqIEBuYW1lIHVuY2hlY2tfYWxsLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IG5vZGUgdGhlIHByZXZpb3VzIHNlbGVjdGlvblxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gc2VsZWN0ZWQgdGhlIGN1cnJlbnQgc2VsZWN0aW9uXG5cdFx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0XHQgKi9cblx0XHRcdHRoaXMudHJpZ2dlcigndW5jaGVja19hbGwnLCB7ICdzZWxlY3RlZCcgOiB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLCAnbm9kZScgOiB0bXAgfSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBjaGVja3MgaWYgYSBub2RlIGlzIGNoZWNrZWQgKGlmIHRpZV9zZWxlY3Rpb24gaXMgb24gaW4gdGhlIHNldHRpbmdzIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHNhbWUgYXMgaXNfc2VsZWN0ZWQpXG5cdFx0ICogQG5hbWUgaXNfY2hlY2tlZChvYmopXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICBvYmpcblx0XHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmlzX2NoZWNrZWQgPSBmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuaXNfc2VsZWN0ZWQob2JqKTsgfVxuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRyZXR1cm4gb2JqLnN0YXRlLmNoZWNrZWQ7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBnZXQgYW4gYXJyYXkgb2YgYWxsIGNoZWNrZWQgbm9kZXMgKGlmIHRpZV9zZWxlY3Rpb24gaXMgb24gaW4gdGhlIHNldHRpbmdzIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm4gdGhlIHNhbWUgYXMgZ2V0X3NlbGVjdGVkKVxuXHRcdCAqIEBuYW1lIGdldF9jaGVja2VkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmdldF9jaGVja2VkID0gZnVuY3Rpb24gKGZ1bGwpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikgeyByZXR1cm4gdGhpcy5nZXRfc2VsZWN0ZWQoZnVsbCk7IH1cblx0XHRcdHJldHVybiBmdWxsID8gJC5tYXAodGhpcy5fZGF0YS5jaGVja2JveC5zZWxlY3RlZCwgZnVuY3Rpb24gKGkpIHsgcmV0dXJuIHRoaXMuZ2V0X25vZGUoaSk7IH0uYmluZCh0aGlzKSkgOiB0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLnNsaWNlKCk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiBnZXQgYW4gYXJyYXkgb2YgYWxsIHRvcCBsZXZlbCBjaGVja2VkIG5vZGVzIChpZ25vcmluZyBjaGlsZHJlbiBvZiBjaGVja2VkIG5vZGVzKSAoaWYgdGllX3NlbGVjdGlvbiBpcyBvbiBpbiB0aGUgc2V0dGluZ3MgdGhpcyBmdW5jdGlvbiB3aWxsIHJldHVybiB0aGUgc2FtZSBhcyBnZXRfdG9wX3NlbGVjdGVkKVxuXHRcdCAqIEBuYW1lIGdldF90b3BfY2hlY2tlZChbZnVsbF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9ICBmdWxsIGlmIHNldCB0byBgdHJ1ZWAgdGhlIHJldHVybmVkIGFycmF5IHdpbGwgY29uc2lzdCBvZiB0aGUgZnVsbCBub2RlIG9iamVjdHMsIG90aGVyd2lzZSAtIG9ubHkgSURzIHdpbGwgYmUgcmV0dXJuZWRcblx0XHQgKiBAcmV0dXJuIHtBcnJheX1cblx0XHQgKiBAcGx1Z2luIGNoZWNrYm94XG5cdFx0ICovXG5cdFx0dGhpcy5nZXRfdG9wX2NoZWNrZWQgPSBmdW5jdGlvbiAoZnVsbCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7IHJldHVybiB0aGlzLmdldF90b3Bfc2VsZWN0ZWQoZnVsbCk7IH1cblx0XHRcdHZhciB0bXAgPSB0aGlzLmdldF9jaGVja2VkKHRydWUpLFxuXHRcdFx0XHRvYmogPSB7fSwgaSwgaiwgaywgbDtcblx0XHRcdGZvcihpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0b2JqW3RtcFtpXS5pZF0gPSB0bXBbaV07XG5cdFx0XHR9XG5cdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdGZvcihrID0gMCwgbCA9IHRtcFtpXS5jaGlsZHJlbl9kLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdGlmKG9ialt0bXBbaV0uY2hpbGRyZW5fZFtrXV0pIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSBvYmpbdG1wW2ldLmNoaWxkcmVuX2Rba11dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dG1wID0gW107XG5cdFx0XHRmb3IoaSBpbiBvYmopIHtcblx0XHRcdFx0aWYob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG5cdFx0XHRcdFx0dG1wLnB1c2goaSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmdWxsID8gJC5tYXAodG1wLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gdGhpcy5nZXRfbm9kZShpKTsgfS5iaW5kKHRoaXMpKSA6IHRtcDtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGdldCBhbiBhcnJheSBvZiBhbGwgYm90dG9tIGxldmVsIGNoZWNrZWQgbm9kZXMgKGlnbm9yaW5nIHNlbGVjdGVkIHBhcmVudHMpIChpZiB0aWVfc2VsZWN0aW9uIGlzIG9uIGluIHRoZSBzZXR0aW5ncyB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSBzYW1lIGFzIGdldF9ib3R0b21fc2VsZWN0ZWQpXG5cdFx0ICogQG5hbWUgZ2V0X2JvdHRvbV9jaGVja2VkKFtmdWxsXSlcblx0XHQgKiBAcGFyYW0gIHttaXhlZH0gIGZ1bGwgaWYgc2V0IHRvIGB0cnVlYCB0aGUgcmV0dXJuZWQgYXJyYXkgd2lsbCBjb25zaXN0IG9mIHRoZSBmdWxsIG5vZGUgb2JqZWN0cywgb3RoZXJ3aXNlIC0gb25seSBJRHMgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge0FycmF5fVxuXHRcdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0XHQgKi9cblx0XHR0aGlzLmdldF9ib3R0b21fY2hlY2tlZCA9IGZ1bmN0aW9uIChmdWxsKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHRoaXMuZ2V0X2JvdHRvbV9zZWxlY3RlZChmdWxsKTsgfVxuXHRcdFx0dmFyIHRtcCA9IHRoaXMuZ2V0X2NoZWNrZWQodHJ1ZSksXG5cdFx0XHRcdG9iaiA9IFtdLCBpLCBqO1xuXHRcdFx0Zm9yKGkgPSAwLCBqID0gdG1wLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRpZighdG1wW2ldLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9iai5wdXNoKHRtcFtpXS5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmdWxsID8gJC5tYXAob2JqLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gdGhpcy5nZXRfbm9kZShpKTsgfS5iaW5kKHRoaXMpKSA6IG9iajtcblx0XHR9O1xuXHRcdHRoaXMubG9hZF9ub2RlID0gZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBrLCBsLCBpLCBqLCBjLCB0bXA7XG5cdFx0XHRpZighJC52YWthdGEuaXNfYXJyYXkob2JqKSAmJiAhdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7XG5cdFx0XHRcdHRtcCA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdFx0aWYodG1wICYmIHRtcC5zdGF0ZS5sb2FkZWQpIHtcblx0XHRcdFx0XHRmb3IoayA9IDAsIGwgPSB0bXAuY2hpbGRyZW5fZC5sZW5ndGg7IGsgPCBsOyBrKyspIHtcblx0XHRcdFx0XHRcdGlmKHRoaXMuX21vZGVsLmRhdGFbdG1wLmNoaWxkcmVuX2Rba11dLnN0YXRlLmNoZWNrZWQpIHtcblx0XHRcdFx0XHRcdFx0YyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQgPSAkLnZha2F0YS5hcnJheV9yZW1vdmVfaXRlbSh0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkLCB0bXAuY2hpbGRyZW5fZFtrXSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFyZW50LmxvYWRfbm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdFx0dGhpcy5nZXRfc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgc3RhdGUgPSBwYXJlbnQuZ2V0X3N0YXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNoZWNrYm94LnRpZV9zZWxlY3Rpb24pIHsgcmV0dXJuIHN0YXRlOyB9XG5cdFx0XHRzdGF0ZS5jaGVja2JveCA9IHRoaXMuX2RhdGEuY2hlY2tib3guc2VsZWN0ZWQuc2xpY2UoKTtcblx0XHRcdHJldHVybiBzdGF0ZTtcblx0XHR9O1xuXHRcdHRoaXMuc2V0X3N0YXRlID0gZnVuY3Rpb24gKHN0YXRlLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIHJlcyA9IHBhcmVudC5zZXRfc3RhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmKHJlcyAmJiBzdGF0ZS5jaGVja2JveCkge1xuXHRcdFx0XHRpZighdGhpcy5zZXR0aW5ncy5jaGVja2JveC50aWVfc2VsZWN0aW9uKSB7XG5cdFx0XHRcdFx0dGhpcy51bmNoZWNrX2FsbCgpO1xuXHRcdFx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0XHRcdFx0JC5lYWNoKHN0YXRlLmNoZWNrYm94LCBmdW5jdGlvbiAoaSwgdikge1xuXHRcdFx0XHRcdFx0X3RoaXMuY2hlY2tfbm9kZSh2KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgc3RhdGUuY2hlY2tib3g7XG5cdFx0XHRcdHRoaXMuc2V0X3N0YXRlKHN0YXRlLCBjYWxsYmFjayk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXM7XG5cdFx0fTtcblx0XHR0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbiAoc2tpcF9sb2FkaW5nLCBmb3JnZXRfc3RhdGUpIHtcblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY2hlY2tib3gudGllX3NlbGVjdGlvbikge1xuXHRcdFx0XHR0aGlzLl9kYXRhLmNoZWNrYm94LnNlbGVjdGVkID0gW107XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGFyZW50LnJlZnJlc2guYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIGluY2x1ZGUgdGhlIGNoZWNrYm94IHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcImNoZWNrYm94XCIpO1xuXG5cbi8qKlxuICogIyMjIENvbmRpdGlvbmFsc2VsZWN0IHBsdWdpblxuICpcbiAqIFRoaXMgcGx1Z2luIGFsbG93cyBkZWZpbmluZyBhIGNhbGxiYWNrIHRvIGFsbG93IG9yIGRlbnkgbm9kZSBzZWxlY3Rpb24gYnkgdXNlciBpbnB1dCAoYWN0aXZhdGUgbm9kZSBtZXRob2QpLlxuICovXG5cblx0LyoqXG5cdCAqIGEgY2FsbGJhY2sgKGZ1bmN0aW9uKSB3aGljaCBpcyBpbnZva2VkIGluIHRoZSBpbnN0YW5jZSdzIHNjb3BlIGFuZCByZWNlaXZlcyB0d28gYXJndW1lbnRzIC0gdGhlIG5vZGUgYW5kIHRoZSBldmVudCB0aGF0IHRyaWdnZXJlZCB0aGUgYGFjdGl2YXRlX25vZGVgIGNhbGwuIFJldHVybmluZyBmYWxzZSBwcmV2ZW50cyB3b3JraW5nIHdpdGggdGhlIG5vZGUsIHJldHVybmluZyB0cnVlIGFsbG93cyBpbnZva2luZyBhY3RpdmF0ZV9ub2RlLiBEZWZhdWx0cyB0byByZXR1cm5pbmcgYHRydWVgLlxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5jaGVja2JveC52aXNpYmxlXG5cdCAqIEBwbHVnaW4gY2hlY2tib3hcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLmNvbmRpdGlvbmFsc2VsZWN0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTtcblx0JC5qc3RyZWUucGx1Z2lucy5jb25kaXRpb25hbHNlbGVjdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHQvLyBvd24gZnVuY3Rpb25cblx0XHR0aGlzLmFjdGl2YXRlX25vZGUgPSBmdW5jdGlvbiAob2JqLCBlKSB7XG5cdFx0XHRpZih0aGlzLnNldHRpbmdzLmNvbmRpdGlvbmFsc2VsZWN0LmNhbGwodGhpcywgdGhpcy5nZXRfbm9kZShvYmopLCBlKSkge1xuXHRcdFx0XHRyZXR1cm4gcGFyZW50LmFjdGl2YXRlX25vZGUuY2FsbCh0aGlzLCBvYmosIGUpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblxuLyoqXG4gKiAjIyMgQ29udGV4dG1lbnUgcGx1Z2luXG4gKlxuICogU2hvd3MgYSBjb250ZXh0IG1lbnUgd2hlbiBhIG5vZGUgaXMgcmlnaHQtY2xpY2tlZC5cbiAqL1xuXG5cdC8qKlxuXHQgKiBzdG9yZXMgYWxsIGRlZmF1bHRzIGZvciB0aGUgY29udGV4dG1lbnUgcGx1Z2luXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvbnRleHRtZW51XG5cdCAqIEBwbHVnaW4gY29udGV4dG1lbnVcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLmNvbnRleHRtZW51ID0ge1xuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoZSBub2RlIHNob3VsZCBiZSBzZWxlY3RlZCB3aGVuIHRoZSBjb250ZXh0IG1lbnUgaXMgaW52b2tlZCBvbiBpdC4gRGVmYXVsdHMgdG8gYHRydWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmNvbnRleHRtZW51LnNlbGVjdF9ub2RlXG5cdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdCAqL1xuXHRcdHNlbGVjdF9ub2RlIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGUgbWVudSBzaG91bGQgYmUgc2hvd24gYWxpZ25lZCB3aXRoIHRoZSBub2RlLiBEZWZhdWx0cyB0byBgdHJ1ZWAsIG90aGVyd2lzZSB0aGUgbW91c2UgY29vcmRpbmF0ZXMgYXJlIHVzZWQuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29udGV4dG1lbnUuc2hvd19hdF9ub2RlXG5cdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdCAqL1xuXHRcdHNob3dfYXRfbm9kZSA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYW4gb2JqZWN0IG9mIGFjdGlvbnMsIG9yIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgbm9kZSBhbmQgYSBjYWxsYmFjayBmdW5jdGlvbiBhbmQgY2FsbHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggYW4gb2JqZWN0IG9mIGFjdGlvbnMgYXZhaWxhYmxlIGZvciB0aGF0IG5vZGUgKHlvdSBjYW4gYWxzbyByZXR1cm4gdGhlIGl0ZW1zIHRvbykuXG5cdFx0ICpcblx0XHQgKiBFYWNoIGFjdGlvbiBjb25zaXN0cyBvZiBhIGtleSAoYSB1bmlxdWUgbmFtZSkgYW5kIGEgdmFsdWUgd2hpY2ggaXMgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzIChvbmx5IGxhYmVsIGFuZCBhY3Rpb24gYXJlIHJlcXVpcmVkKS4gT25jZSBhIG1lbnUgaXRlbSBpcyBhY3RpdmF0ZWQgdGhlIGBhY3Rpb25gIGZ1bmN0aW9uIHdpbGwgYmUgaW52b2tlZCB3aXRoIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBmb2xsb3dpbmcga2V5czogaXRlbSAtIHRoZSBjb250ZXh0bWVudSBpdGVtIGRlZmluaXRpb24gYXMgc2VlbiBiZWxvdywgcmVmZXJlbmNlIC0gdGhlIERPTSBub2RlIHRoYXQgd2FzIHVzZWQgKHRoZSB0cmVlIG5vZGUpLCBlbGVtZW50IC0gdGhlIGNvbnRleHRtZW51IERPTSBlbGVtZW50LCBwb3NpdGlvbiAtIGFuIG9iamVjdCB3aXRoIHgveSBwcm9wZXJ0aWVzIGluZGljYXRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBtZW51LlxuXHRcdCAqXG5cdFx0ICogKiBgc2VwYXJhdG9yX2JlZm9yZWAgLSBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGVyZSBzaG91bGQgYmUgYSBzZXBhcmF0b3IgYmVmb3JlIHRoaXMgaXRlbVxuXHRcdCAqICogYHNlcGFyYXRvcl9hZnRlcmAgLSBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiB0aGVyZSBzaG91bGQgYmUgYSBzZXBhcmF0b3IgYWZ0ZXIgdGhpcyBpdGVtXG5cdFx0ICogKiBgX2Rpc2FibGVkYCAtIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIHRoaXMgYWN0aW9uIHNob3VsZCBiZSBkaXNhYmxlZFxuXHRcdCAqICogYGxhYmVsYCAtIGEgc3RyaW5nIC0gdGhlIG5hbWUgb2YgdGhlIGFjdGlvbiAoY291bGQgYmUgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBzdHJpbmcpXG5cdFx0ICogKiBgdGl0bGVgIC0gYSBzdHJpbmcgLSBhbiBvcHRpb25hbCB0b29sdGlwIGZvciB0aGUgaXRlbVxuXHRcdCAqICogYGFjdGlvbmAgLSBhIGZ1bmN0aW9uIHRvIGJlIGV4ZWN1dGVkIGlmIHRoaXMgaXRlbSBpcyBjaG9zZW4sIHRoZSBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgXG5cdFx0ICogKiBgaWNvbmAgLSBhIHN0cmluZywgY2FuIGJlIGEgcGF0aCB0byBhbiBpY29uIG9yIGEgY2xhc3NOYW1lLCBpZiB1c2luZyBhbiBpbWFnZSB0aGF0IGlzIGluIHRoZSBjdXJyZW50IGRpcmVjdG9yeSB1c2UgYSBgLi9gIHByZWZpeCwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgZGV0ZWN0ZWQgYXMgYSBjbGFzc1xuXHRcdCAqICogYHNob3J0Y3V0YCAtIGtleUNvZGUgd2hpY2ggd2lsbCB0cmlnZ2VyIHRoZSBhY3Rpb24gaWYgdGhlIG1lbnUgaXMgb3BlbiAoZm9yIGV4YW1wbGUgYDExM2AgZm9yIHJlbmFtZSwgd2hpY2ggZXF1YWxzIEYyKVxuXHRcdCAqICogYHNob3J0Y3V0X2xhYmVsYCAtIHNob3J0Y3V0IGxhYmVsIChsaWtlIGZvciBleGFtcGxlIGBGMmAgZm9yIHJlbmFtZSlcblx0XHQgKiAqIGBzdWJtZW51YCAtIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIHN0cnVjdHVyZSBhcyAkLmpzdHJlZS5kZWZhdWx0cy5jb250ZXh0bWVudS5pdGVtcyB3aGljaCBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBzdWJtZW51IC0gZWFjaCBrZXkgd2lsbCBiZSByZW5kZXJlZCBhcyBhIHNlcGFyYXRlIG9wdGlvbiBpbiBhIHN1Ym1lbnUgdGhhdCB3aWxsIGFwcGVhciBvbmNlIHRoZSBjdXJyZW50IGl0ZW0gaXMgaG92ZXJlZFxuXHRcdCAqXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuY29udGV4dG1lbnUuaXRlbXNcblx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0ICovXG5cdFx0aXRlbXMgOiBmdW5jdGlvbiAobywgY2IpIHsgLy8gQ291bGQgYmUgYW4gb2JqZWN0IGRpcmVjdGx5XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcImNyZWF0ZVwiIDoge1xuXHRcdFx0XHRcdFwic2VwYXJhdG9yX2JlZm9yZVwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFwic2VwYXJhdG9yX2FmdGVyXCJcdDogdHJ1ZSxcblx0XHRcdFx0XHRcIl9kaXNhYmxlZFwiXHRcdFx0OiBmYWxzZSwgLy8odGhpcy5jaGVjayhcImNyZWF0ZV9ub2RlXCIsIGRhdGEucmVmZXJlbmNlLCB7fSwgXCJsYXN0XCIpKSxcblx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJDcmVhdGVcIixcblx0XHRcdFx0XHRcImFjdGlvblwiXHRcdFx0OiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0dmFyIGluc3QgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLFxuXHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdGluc3QuY3JlYXRlX25vZGUob2JqLCB7fSwgXCJsYXN0XCIsIGZ1bmN0aW9uIChuZXdfbm9kZSkge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGluc3QuZWRpdChuZXdfbm9kZSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGV4KSB7XG5cdFx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7IGluc3QuZWRpdChuZXdfbm9kZSk7IH0sMCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0XCJyZW5hbWVcIiA6IHtcblx0XHRcdFx0XHRcInNlcGFyYXRvcl9iZWZvcmVcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFwiX2Rpc2FibGVkXCJcdFx0XHQ6IGZhbHNlLCAvLyh0aGlzLmNoZWNrKFwicmVuYW1lX25vZGVcIiwgZGF0YS5yZWZlcmVuY2UsIHRoaXMuZ2V0X3BhcmVudChkYXRhLnJlZmVyZW5jZSksIFwiXCIpKSxcblx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJSZW5hbWVcIixcblx0XHRcdFx0XHQvKiFcblx0XHRcdFx0XHRcInNob3J0Y3V0XCJcdFx0XHQ6IDExMyxcblx0XHRcdFx0XHRcInNob3J0Y3V0X2xhYmVsXCJcdDogJ0YyJyxcblx0XHRcdFx0XHRcImljb25cIlx0XHRcdFx0OiBcImdseXBoaWNvbiBnbHlwaGljb24tbGVhZlwiLFxuXHRcdFx0XHRcdCovXG5cdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdHZhciBpbnN0ID0gJC5qc3RyZWUucmVmZXJlbmNlKGRhdGEucmVmZXJlbmNlKSxcblx0XHRcdFx0XHRcdFx0b2JqID0gaW5zdC5nZXRfbm9kZShkYXRhLnJlZmVyZW5jZSk7XG5cdFx0XHRcdFx0XHRpbnN0LmVkaXQob2JqKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdFwicmVtb3ZlXCIgOiB7XG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYmVmb3JlXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJpY29uXCJcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYWZ0ZXJcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcIl9kaXNhYmxlZFwiXHRcdFx0OiBmYWxzZSwgLy8odGhpcy5jaGVjayhcImRlbGV0ZV9ub2RlXCIsIGRhdGEucmVmZXJlbmNlLCB0aGlzLmdldF9wYXJlbnQoZGF0YS5yZWZlcmVuY2UpLCBcIlwiKSksXG5cdFx0XHRcdFx0XCJsYWJlbFwiXHRcdFx0XHQ6IFwiRGVsZXRlXCIsXG5cdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdHZhciBpbnN0ID0gJC5qc3RyZWUucmVmZXJlbmNlKGRhdGEucmVmZXJlbmNlKSxcblx0XHRcdFx0XHRcdFx0b2JqID0gaW5zdC5nZXRfbm9kZShkYXRhLnJlZmVyZW5jZSk7XG5cdFx0XHRcdFx0XHRpZihpbnN0LmlzX3NlbGVjdGVkKG9iaikpIHtcblx0XHRcdFx0XHRcdFx0aW5zdC5kZWxldGVfbm9kZShpbnN0LmdldF9zZWxlY3RlZCgpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpbnN0LmRlbGV0ZV9ub2RlKG9iaik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcImNjcFwiIDoge1xuXHRcdFx0XHRcdFwic2VwYXJhdG9yX2JlZm9yZVwiXHQ6IHRydWUsXG5cdFx0XHRcdFx0XCJpY29uXCJcdFx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJzZXBhcmF0b3JfYWZ0ZXJcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJFZGl0XCIsXG5cdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZmFsc2UsXG5cdFx0XHRcdFx0XCJzdWJtZW51XCIgOiB7XG5cdFx0XHRcdFx0XHRcImN1dFwiIDoge1xuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9iZWZvcmVcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XCJzZXBhcmF0b3JfYWZ0ZXJcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XCJsYWJlbFwiXHRcdFx0XHQ6IFwiQ3V0XCIsXG5cdFx0XHRcdFx0XHRcdFwiYWN0aW9uXCJcdFx0XHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGluc3QgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLFxuXHRcdFx0XHRcdFx0XHRcdFx0b2JqID0gaW5zdC5nZXRfbm9kZShkYXRhLnJlZmVyZW5jZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYoaW5zdC5pc19zZWxlY3RlZChvYmopKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0LmN1dChpbnN0LmdldF90b3Bfc2VsZWN0ZWQoKSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aW5zdC5jdXQob2JqKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcImNvcHlcIiA6IHtcblx0XHRcdFx0XHRcdFx0XCJzZXBhcmF0b3JfYmVmb3JlXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFwiaWNvblwiXHRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcInNlcGFyYXRvcl9hZnRlclwiXHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcImxhYmVsXCJcdFx0XHRcdDogXCJDb3B5XCIsXG5cdFx0XHRcdFx0XHRcdFwiYWN0aW9uXCJcdFx0XHQ6IGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGluc3QgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5yZWZlcmVuY2UpLFxuXHRcdFx0XHRcdFx0XHRcdFx0b2JqID0gaW5zdC5nZXRfbm9kZShkYXRhLnJlZmVyZW5jZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYoaW5zdC5pc19zZWxlY3RlZChvYmopKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpbnN0LmNvcHkoaW5zdC5nZXRfdG9wX3NlbGVjdGVkKCkpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluc3QuY29weShvYmopO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFwicGFzdGVcIiA6IHtcblx0XHRcdFx0XHRcdFx0XCJzZXBhcmF0b3JfYmVmb3JlXCJcdDogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFwiaWNvblwiXHRcdFx0XHQ6IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRcIl9kaXNhYmxlZFwiXHRcdFx0OiBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAhJC5qc3RyZWUucmVmZXJlbmNlKGRhdGEucmVmZXJlbmNlKS5jYW5fcGFzdGUoKTtcblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0XCJzZXBhcmF0b3JfYWZ0ZXJcIlx0OiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0XCJsYWJlbFwiXHRcdFx0XHQ6IFwiUGFzdGVcIixcblx0XHRcdFx0XHRcdFx0XCJhY3Rpb25cIlx0XHRcdDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgaW5zdCA9ICQuanN0cmVlLnJlZmVyZW5jZShkYXRhLnJlZmVyZW5jZSksXG5cdFx0XHRcdFx0XHRcdFx0XHRvYmogPSBpbnN0LmdldF9ub2RlKGRhdGEucmVmZXJlbmNlKTtcblx0XHRcdFx0XHRcdFx0XHRpbnN0LnBhc3RlKG9iaik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXHR9O1xuXG5cdCQuanN0cmVlLnBsdWdpbnMuY29udGV4dG1lbnUgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFyZW50LmJpbmQuY2FsbCh0aGlzKTtcblxuXHRcdFx0dmFyIGxhc3RfdHMgPSAwLCBjdG8gPSBudWxsLCBleCwgZXk7XG5cdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0Lm9uKFwiaW5pdC5qc3RyZWUgbG9hZGluZy5qc3RyZWUgcmVhZHkuanN0cmVlXCIsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXMuZ2V0X2NvbnRhaW5lcl91bCgpLmFkZENsYXNzKCdqc3RyZWUtY29udGV4dG1lbnUnKTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcImNvbnRleHRtZW51LmpzdHJlZVwiLCBcIi5qc3RyZWUtYW5jaG9yXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdGxhc3RfdHMgPSBlLmN0cmxLZXkgPyArbmV3IERhdGUoKSA6IDA7XG5cdFx0XHRcdFx0XHRpZihkYXRhIHx8IGN0bykge1xuXHRcdFx0XHRcdFx0XHRsYXN0X3RzID0gKCtuZXcgRGF0ZSgpKSArIDEwMDAwO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoY3RvKSB7XG5cdFx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChjdG8pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoIXRoaXMuaXNfbG9hZGluZyhlLmN1cnJlbnRUYXJnZXQpKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2hvd19jb250ZXh0bWVudShlLmN1cnJlbnRUYXJnZXQsIGUucGFnZVgsIGUucGFnZVksIGUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwiY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGEuY29udGV4dG1lbnUudmlzaWJsZSAmJiAoIWxhc3RfdHMgfHwgKCtuZXcgRGF0ZSgpKSAtIGxhc3RfdHMgPiAyNTApKSB7IC8vIHdvcmsgYXJvdW5kIHNhZmFyaSAmIG1hY09TIGN0cmwrY2xpY2tcblx0XHRcdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRsYXN0X3RzID0gMDtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcInRvdWNoc3RhcnQuanN0cmVlXCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKCFlLm9yaWdpbmFsRXZlbnQgfHwgIWUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcyB8fCAhZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGV4ID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XG5cdFx0XHRcdFx0XHRleSA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xuXHRcdFx0XHRcdFx0Y3RvID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS50cmlnZ2VyKCdjb250ZXh0bWVudScsIHRydWUpO1xuXHRcdFx0XHRcdFx0fSwgNzUwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ3RvdWNobW92ZS52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGN0byAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSAmJiAoTWF0aC5hYnMoZXggLSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCkgPiAxMCB8fCBNYXRoLmFicyhleSAtIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKSA+IDEwKSkge1xuXHRcdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQoY3RvKTtcblx0XHRcdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZC52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGN0bykge1xuXHRcdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQoY3RvKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0LyohXG5cdFx0XHRpZighKCdvbmNvbnRleHRtZW51JyBpbiBkb2N1bWVudC5ib2R5KSAmJiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuYm9keSkpIHtcblx0XHRcdFx0dmFyIGVsID0gbnVsbCwgdG0gPSBudWxsO1xuXHRcdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0XHQub24oXCJ0b3VjaHN0YXJ0XCIsIFwiLmpzdHJlZS1hbmNob3JcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGVsID0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdFx0XHRcdFx0dG0gPSArbmV3IERhdGUoKTtcblx0XHRcdFx0XHRcdCQoZG9jdW1lbnQpLm9uZShcInRvdWNoZW5kXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRcdGUudGFyZ2V0ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLm9yaWdpbmFsRXZlbnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHdpbmRvdy5wYWdlWE9mZnNldCwgZS5vcmlnaW5hbEV2ZW50LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpO1xuXHRcdFx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdFx0XHRcdFx0dG0gPSAoKCsobmV3IERhdGUoKSkpIC0gdG0pO1xuXHRcdFx0XHRcdFx0XHRpZihlLnRhcmdldCA9PT0gZWwgJiYgdG0gPiA2MDAgJiYgdG0gPCAxMDAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdCQoZWwpLnRyaWdnZXIoJ2NvbnRleHRtZW51JywgZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZWwgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR0bSA9IG51bGw7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdCovXG5cdFx0XHQkKGRvY3VtZW50KS5vbihcImNvbnRleHRfaGlkZS52YWthdGEuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuY29udGV4dG1lbnUudmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHQkKGRhdGEucmVmZXJlbmNlKS5yZW1vdmVDbGFzcygnanN0cmVlLWNvbnRleHQnKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fTtcblx0XHR0aGlzLnRlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5fZGF0YS5jb250ZXh0bWVudS52aXNpYmxlKSB7XG5cdFx0XHRcdCQudmFrYXRhLmNvbnRleHQuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0JChkb2N1bWVudCkub2ZmKFwiY29udGV4dF9oaWRlLnZha2F0YS5qc3RyZWVcIik7XG5cdFx0XHRwYXJlbnQudGVhcmRvd24uY2FsbCh0aGlzKTtcblx0XHR9O1xuXG5cdFx0LyoqXG5cdFx0ICogcHJlcGFyZSBhbmQgc2hvdyB0aGUgY29udGV4dCBtZW51IGZvciBhIG5vZGVcblx0XHQgKiBAbmFtZSBzaG93X2NvbnRleHRtZW51KG9iaiBbLCB4LCB5XSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGVcblx0XHQgKiBAcGFyYW0ge051bWJlcn0geCB0aGUgeC1jb29yZGluYXRlIHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudCB0byBzaG93IHRoZSBtZW51IGF0XG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgdGhlIHktY29vcmRpbmF0ZSByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQgdG8gc2hvdyB0aGUgbWVudSBhdFxuXHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBlIHRoZSBldmVudCBpZiBhdmFpbGFibGUgdGhhdCB0cmlnZ2VyZWQgdGhlIGNvbnRleHRtZW51XG5cdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdCAqIEB0cmlnZ2VyIHNob3dfY29udGV4dG1lbnUuanN0cmVlXG5cdFx0ICovXG5cdFx0dGhpcy5zaG93X2NvbnRleHRtZW51ID0gZnVuY3Rpb24gKG9iaiwgeCwgeSwgZSkge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIW9iaiB8fCBvYmouaWQgPT09ICQuanN0cmVlLnJvb3QpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgcyA9IHRoaXMuc2V0dGluZ3MuY29udGV4dG1lbnUsXG5cdFx0XHRcdGQgPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSksXG5cdFx0XHRcdGEgPSBkLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIiksXG5cdFx0XHRcdG8gPSBmYWxzZSxcblx0XHRcdFx0aSA9IGZhbHNlO1xuXHRcdFx0aWYocy5zaG93X2F0X25vZGUgfHwgeCA9PT0gdW5kZWZpbmVkIHx8IHkgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRvID0gYS5vZmZzZXQoKTtcblx0XHRcdFx0eCA9IG8ubGVmdDtcblx0XHRcdFx0eSA9IG8udG9wICsgdGhpcy5fZGF0YS5jb3JlLmxpX2hlaWdodDtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY29udGV4dG1lbnUuc2VsZWN0X25vZGUgJiYgIXRoaXMuaXNfc2VsZWN0ZWQob2JqKSkge1xuXHRcdFx0XHR0aGlzLmFjdGl2YXRlX25vZGUob2JqLCBlKTtcblx0XHRcdH1cblxuXHRcdFx0aSA9IHMuaXRlbXM7XG5cdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihpKSkge1xuXHRcdFx0XHRpID0gaS5jYWxsKHRoaXMsIG9iaiwgZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0XHR0aGlzLl9zaG93X2NvbnRleHRtZW51KG9iaiwgeCwgeSwgaSk7XG5cdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR9XG5cdFx0XHRpZigkLmlzUGxhaW5PYmplY3QoaSkpIHtcblx0XHRcdFx0dGhpcy5fc2hvd19jb250ZXh0bWVudShvYmosIHgsIHksIGkpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogc2hvdyB0aGUgcHJlcGFyZWQgY29udGV4dCBtZW51IGZvciBhIG5vZGVcblx0XHQgKiBAbmFtZSBfc2hvd19jb250ZXh0bWVudShvYmosIHgsIHksIGkpXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHggdGhlIHgtY29vcmRpbmF0ZSByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnQgdG8gc2hvdyB0aGUgbWVudSBhdFxuXHRcdCAqIEBwYXJhbSB7TnVtYmVyfSB5IHRoZSB5LWNvb3JkaW5hdGUgcmVsYXRpdmUgdG8gdGhlIGRvY3VtZW50IHRvIHNob3cgdGhlIG1lbnUgYXRcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gaSB0aGUgb2JqZWN0IG9mIGl0ZW1zIHRvIHNob3dcblx0XHQgKiBAcGx1Z2luIGNvbnRleHRtZW51XG5cdFx0ICogQHRyaWdnZXIgc2hvd19jb250ZXh0bWVudS5qc3RyZWVcblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdHRoaXMuX3Nob3dfY29udGV4dG1lbnUgPSBmdW5jdGlvbiAob2JqLCB4LCB5LCBpKSB7XG5cdFx0XHR2YXIgZCA9IHRoaXMuZ2V0X25vZGUob2JqLCB0cnVlKSxcblx0XHRcdFx0YSA9IGQuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKTtcblx0XHRcdCQoZG9jdW1lbnQpLm9uZShcImNvbnRleHRfc2hvdy52YWthdGEuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdHZhciBjbHMgPSAnanN0cmVlLWNvbnRleHRtZW51IGpzdHJlZS0nICsgdGhpcy5nZXRfdGhlbWUoKSArICctY29udGV4dG1lbnUnO1xuXHRcdFx0XHQkKGRhdGEuZWxlbWVudCkuYWRkQ2xhc3MoY2xzKTtcblx0XHRcdFx0YS5hZGRDbGFzcygnanN0cmVlLWNvbnRleHQnKTtcblx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLl9kYXRhLmNvbnRleHRtZW51LnZpc2libGUgPSB0cnVlO1xuXHRcdFx0JC52YWthdGEuY29udGV4dC5zaG93KGEsIHsgJ3gnIDogeCwgJ3knIDogeSB9LCBpKTtcblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIHdoZW4gdGhlIGNvbnRleHRtZW51IGlzIHNob3duIGZvciBhIG5vZGVcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgc2hvd19jb250ZXh0bWVudS5qc3RyZWVcblx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIHRoZSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge051bWJlcn0geCB0aGUgeC1jb29yZGluYXRlIG9mIHRoZSBtZW51IHJlbGF0aXZlIHRvIHRoZSBkb2N1bWVudFxuXHRcdFx0ICogQHBhcmFtIHtOdW1iZXJ9IHkgdGhlIHktY29vcmRpbmF0ZSBvZiB0aGUgbWVudSByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcblx0XHRcdCAqIEBwbHVnaW4gY29udGV4dG1lbnVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdzaG93X2NvbnRleHRtZW51JywgeyBcIm5vZGVcIiA6IG9iaiwgXCJ4XCIgOiB4LCBcInlcIiA6IHkgfSk7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBjb250ZXh0bWVudSBoZWxwZXJcblx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0dmFyIHJpZ2h0X3RvX2xlZnQgPSBmYWxzZSxcblx0XHRcdHZha2F0YV9jb250ZXh0ID0ge1xuXHRcdFx0XHRlbGVtZW50XHRcdDogZmFsc2UsXG5cdFx0XHRcdHJlZmVyZW5jZVx0OiBmYWxzZSxcblx0XHRcdFx0cG9zaXRpb25feFx0OiAwLFxuXHRcdFx0XHRwb3NpdGlvbl95XHQ6IDAsXG5cdFx0XHRcdGl0ZW1zXHRcdDogW10sXG5cdFx0XHRcdGh0bWxcdFx0OiBcIlwiLFxuXHRcdFx0XHRpc192aXNpYmxlXHQ6IGZhbHNlXG5cdFx0XHR9O1xuXG5cdFx0JC52YWthdGEuY29udGV4dCA9IHtcblx0XHRcdHNldHRpbmdzIDoge1xuXHRcdFx0XHRoaWRlX29ubW91c2VsZWF2ZVx0OiAwLFxuXHRcdFx0XHRpY29uc1x0XHRcdFx0OiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0X3RyaWdnZXIgOiBmdW5jdGlvbiAoZXZlbnRfbmFtZSkge1xuXHRcdFx0XHQkKGRvY3VtZW50KS50cmlnZ2VySGFuZGxlcihcImNvbnRleHRfXCIgKyBldmVudF9uYW1lICsgXCIudmFrYXRhXCIsIHtcblx0XHRcdFx0XHRcInJlZmVyZW5jZVwiXHQ6IHZha2F0YV9jb250ZXh0LnJlZmVyZW5jZSxcblx0XHRcdFx0XHRcImVsZW1lbnRcIlx0OiB2YWthdGFfY29udGV4dC5lbGVtZW50LFxuXHRcdFx0XHRcdFwicG9zaXRpb25cIlx0OiB7XG5cdFx0XHRcdFx0XHRcInhcIiA6IHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3gsXG5cdFx0XHRcdFx0XHRcInlcIiA6IHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3lcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSxcblx0XHRcdF9leGVjdXRlIDogZnVuY3Rpb24gKGkpIHtcblx0XHRcdFx0aSA9IHZha2F0YV9jb250ZXh0Lml0ZW1zW2ldO1xuXHRcdFx0XHRyZXR1cm4gaSAmJiAoIWkuX2Rpc2FibGVkIHx8ICgkLnZha2F0YS5pc19mdW5jdGlvbihpLl9kaXNhYmxlZCkgJiYgIWkuX2Rpc2FibGVkKHsgXCJpdGVtXCIgOiBpLCBcInJlZmVyZW5jZVwiIDogdmFrYXRhX2NvbnRleHQucmVmZXJlbmNlLCBcImVsZW1lbnRcIiA6IHZha2F0YV9jb250ZXh0LmVsZW1lbnQgfSkpKSAmJiBpLmFjdGlvbiA/IGkuYWN0aW9uLmNhbGwobnVsbCwge1xuXHRcdFx0XHRcdFx0XHRcIml0ZW1cIlx0XHQ6IGksXG5cdFx0XHRcdFx0XHRcdFwicmVmZXJlbmNlXCJcdDogdmFrYXRhX2NvbnRleHQucmVmZXJlbmNlLFxuXHRcdFx0XHRcdFx0XHRcImVsZW1lbnRcIlx0OiB2YWthdGFfY29udGV4dC5lbGVtZW50LFxuXHRcdFx0XHRcdFx0XHRcInBvc2l0aW9uXCJcdDoge1xuXHRcdFx0XHRcdFx0XHRcdFwieFwiIDogdmFrYXRhX2NvbnRleHQucG9zaXRpb25feCxcblx0XHRcdFx0XHRcdFx0XHRcInlcIiA6IHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3lcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSkgOiBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRfcGFyc2UgOiBmdW5jdGlvbiAobywgaXNfY2FsbGJhY2spIHtcblx0XHRcdFx0aWYoIW8pIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRcdGlmKCFpc19jYWxsYmFjaykge1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0Lmh0bWxcdFx0PSBcIlwiO1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0Lml0ZW1zXHQ9IFtdO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBzdHIgPSBcIlwiLFxuXHRcdFx0XHRcdHNlcCA9IGZhbHNlLFxuXHRcdFx0XHRcdHRtcDtcblxuXHRcdFx0XHRpZihpc19jYWxsYmFjaykgeyBzdHIgKz0gXCI8XCIrXCJ1bD5cIjsgfVxuXHRcdFx0XHQkLmVhY2gobywgZnVuY3Rpb24gKGksIHZhbCkge1xuXHRcdFx0XHRcdGlmKCF2YWwpIHsgcmV0dXJuIHRydWU7IH1cblx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5pdGVtcy5wdXNoKHZhbCk7XG5cdFx0XHRcdFx0aWYoIXNlcCAmJiB2YWwuc2VwYXJhdG9yX2JlZm9yZSkge1xuXHRcdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wibGkgY2xhc3M9J3Zha2F0YS1jb250ZXh0LXNlcGFyYXRvcic+PFwiK1wiYSBocmVmPScjJyBcIiArICgkLnZha2F0YS5jb250ZXh0LnNldHRpbmdzLmljb25zID8gJycgOiAnY2xhc3M9XCJ2YWthdGEtY29udGV4dC1uby1pY29uc1wiJykgKyBcIj4mIzE2MDs8XCIrXCIvYT48XCIrXCIvbGk+XCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNlcCA9IGZhbHNlO1xuXHRcdFx0XHRcdHN0ciArPSBcIjxcIitcImxpIGNsYXNzPSdcIiArICh2YWwuX2NsYXNzIHx8IFwiXCIpICsgKHZhbC5fZGlzYWJsZWQgPT09IHRydWUgfHwgKCQudmFrYXRhLmlzX2Z1bmN0aW9uKHZhbC5fZGlzYWJsZWQpICYmIHZhbC5fZGlzYWJsZWQoeyBcIml0ZW1cIiA6IHZhbCwgXCJyZWZlcmVuY2VcIiA6IHZha2F0YV9jb250ZXh0LnJlZmVyZW5jZSwgXCJlbGVtZW50XCIgOiB2YWthdGFfY29udGV4dC5lbGVtZW50IH0pKSA/IFwiIHZha2F0YS1jb250ZXh0bWVudS1kaXNhYmxlZCBcIiA6IFwiXCIpICsgXCInIFwiKyh2YWwuc2hvcnRjdXQ/XCIgZGF0YS1zaG9ydGN1dD0nXCIrdmFsLnNob3J0Y3V0K1wiJyBcIjonJykrXCI+XCI7XG5cdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wiYSBocmVmPScjJyByZWw9J1wiICsgKHZha2F0YV9jb250ZXh0Lml0ZW1zLmxlbmd0aCAtIDEpICsgXCInIFwiICsgKHZhbC50aXRsZSA/IFwidGl0bGU9J1wiICsgdmFsLnRpdGxlICsgXCInXCIgOiBcIlwiKSArIFwiPlwiO1xuXHRcdFx0XHRcdGlmKCQudmFrYXRhLmNvbnRleHQuc2V0dGluZ3MuaWNvbnMpIHtcblx0XHRcdFx0XHRcdHN0ciArPSBcIjxcIitcImkgXCI7XG5cdFx0XHRcdFx0XHRpZih2YWwuaWNvbikge1xuXHRcdFx0XHRcdFx0XHRpZih2YWwuaWNvbi5pbmRleE9mKFwiL1wiKSAhPT0gLTEgfHwgdmFsLmljb24uaW5kZXhPZihcIi5cIikgIT09IC0xKSB7IHN0ciArPSBcIiBzdHlsZT0nYmFja2dyb3VuZDp1cmwoXFxcIlwiICsgdmFsLmljb24gKyBcIlxcXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0JyBcIjsgfVxuXHRcdFx0XHRcdFx0XHRlbHNlIHsgc3RyICs9IFwiIGNsYXNzPSdcIiArIHZhbC5pY29uICsgXCInIFwiOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzdHIgKz0gXCI+PFwiK1wiL2k+PFwiK1wic3BhbiBjbGFzcz0ndmFrYXRhLWNvbnRleHRtZW51LXNlcCc+JiMxNjA7PFwiK1wiL3NwYW4+XCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHN0ciArPSAoJC52YWthdGEuaXNfZnVuY3Rpb24odmFsLmxhYmVsKSA/IHZhbC5sYWJlbCh7IFwiaXRlbVwiIDogaSwgXCJyZWZlcmVuY2VcIiA6IHZha2F0YV9jb250ZXh0LnJlZmVyZW5jZSwgXCJlbGVtZW50XCIgOiB2YWthdGFfY29udGV4dC5lbGVtZW50IH0pIDogdmFsLmxhYmVsKSArICh2YWwuc2hvcnRjdXQ/JyA8c3BhbiBjbGFzcz1cInZha2F0YS1jb250ZXh0bWVudS1zaG9ydGN1dCB2YWthdGEtY29udGV4dG1lbnUtc2hvcnRjdXQtJyt2YWwuc2hvcnRjdXQrJ1wiPicrICh2YWwuc2hvcnRjdXRfbGFiZWwgfHwgJycpICsnPC9zcGFuPic6JycpICsgXCI8XCIrXCIvYT5cIjtcblx0XHRcdFx0XHRpZih2YWwuc3VibWVudSkge1xuXHRcdFx0XHRcdFx0dG1wID0gJC52YWthdGEuY29udGV4dC5fcGFyc2UodmFsLnN1Ym1lbnUsIHRydWUpO1xuXHRcdFx0XHRcdFx0aWYodG1wKSB7IHN0ciArPSB0bXA7IH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3RyICs9IFwiPFwiK1wiL2xpPlwiO1xuXHRcdFx0XHRcdGlmKHZhbC5zZXBhcmF0b3JfYWZ0ZXIpIHtcblx0XHRcdFx0XHRcdHN0ciArPSBcIjxcIitcImxpIGNsYXNzPSd2YWthdGEtY29udGV4dC1zZXBhcmF0b3InPjxcIitcImEgaHJlZj0nIycgXCIgKyAoJC52YWthdGEuY29udGV4dC5zZXR0aW5ncy5pY29ucyA/ICcnIDogJ2NsYXNzPVwidmFrYXRhLWNvbnRleHQtbm8taWNvbnNcIicpICsgXCI+JiMxNjA7PFwiK1wiL2E+PFwiK1wiL2xpPlwiO1xuXHRcdFx0XHRcdFx0c2VwID0gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzdHIgID0gc3RyLnJlcGxhY2UoLzxsaSBjbGFzc1xcPSd2YWthdGEtY29udGV4dC1zZXBhcmF0b3InXFw+PFxcL2xpXFw+JC8sXCJcIik7XG5cdFx0XHRcdGlmKGlzX2NhbGxiYWNrKSB7IHN0ciArPSBcIjwvdWw+XCI7IH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiB0aGUgY29udGV4dG1lbnUgaXMgcGFyc2VkIChIVE1MIGlzIGJ1aWx0KVxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdFx0XHQgKiBAbmFtZSBjb250ZXh0X3BhcnNlLnZha2F0YVxuXHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gcmVmZXJlbmNlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHJpZ2h0IGNsaWNrZWRcblx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgdGhlIERPTSBlbGVtZW50IG9mIHRoZSBtZW51IGl0c2VsZlxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gdGhlIHggJiB5IGNvb3JkaW5hdGVzIG9mIHRoZSBtZW51XG5cdFx0XHRcdCAqL1xuXHRcdFx0XHRpZighaXNfY2FsbGJhY2spIHsgdmFrYXRhX2NvbnRleHQuaHRtbCA9IHN0cjsgJC52YWthdGEuY29udGV4dC5fdHJpZ2dlcihcInBhcnNlXCIpOyB9XG5cdFx0XHRcdHJldHVybiBzdHIubGVuZ3RoID4gMTAgPyBzdHIgOiBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRfc2hvd19zdWJtZW51IDogZnVuY3Rpb24gKG8pIHtcblx0XHRcdFx0byA9ICQobyk7XG5cdFx0XHRcdGlmKCFvLmxlbmd0aCB8fCAhby5jaGlsZHJlbihcInVsXCIpLmxlbmd0aCkgeyByZXR1cm47IH1cblx0XHRcdFx0dmFyIGUgPSBvLmNoaWxkcmVuKFwidWxcIiksXG5cdFx0XHRcdFx0eGwgPSBvLm9mZnNldCgpLmxlZnQsXG5cdFx0XHRcdFx0eCA9IHhsICsgby5vdXRlcldpZHRoKCksXG5cdFx0XHRcdFx0eSA9IG8ub2Zmc2V0KCkudG9wLFxuXHRcdFx0XHRcdHcgPSBlLndpZHRoKCksXG5cdFx0XHRcdFx0aCA9IGUuaGVpZ2h0KCksXG5cdFx0XHRcdFx0ZHcgPSAkKHdpbmRvdykud2lkdGgoKSArICQod2luZG93KS5zY3JvbGxMZWZ0KCksXG5cdFx0XHRcdFx0ZGggPSAkKHdpbmRvdykuaGVpZ2h0KCkgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdC8vINC80L7QttC1INC00LAg0YHQtSDRgdC/0LXRgdGC0Lgg0LUg0LXQtNC90LAg0L/RgNC+0LLQtdGA0LrQsCAtINC00LDQu9C4INC90Y/QvNCwINC90Y/QutC+0Lkg0L7RgiDQutC70LDRgdC+0LLQtdGC0LUg0LLQtdGH0LUg0L3QsNCz0L7RgNC1XG5cdFx0XHRcdGlmKHJpZ2h0X3RvX2xlZnQpIHtcblx0XHRcdFx0XHRvW3ggLSAodyArIDEwICsgby5vdXRlcldpZHRoKCkpIDwgMCA/IFwiYWRkQ2xhc3NcIiA6IFwicmVtb3ZlQ2xhc3NcIl0oXCJ2YWthdGEtY29udGV4dC1sZWZ0XCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdG9beCArIHcgPiBkdyAgJiYgeGwgPiBkdyAtIHggPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKFwidmFrYXRhLWNvbnRleHQtcmlnaHRcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoeSArIGggKyAxMCA+IGRoKSB7XG5cdFx0XHRcdFx0ZS5jc3MoXCJib3R0b21cIixcIi0xcHhcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL2lmIGRvZXMgbm90IGZpdCAtIHN0aWNrIGl0IHRvIHRoZSBzaWRlXG5cdFx0XHRcdGlmIChvLmhhc0NsYXNzKCd2YWthdGEtY29udGV4dC1yaWdodCcpKSB7XG5cdFx0XHRcdFx0aWYgKHhsIDwgdykge1xuXHRcdFx0XHRcdFx0ZS5jc3MoXCJtYXJnaW4tcmlnaHRcIiwgeGwgLSB3KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGR3IC0geCA8IHcpIHtcblx0XHRcdFx0XHRcdGUuY3NzKFwibWFyZ2luLWxlZnRcIiwgZHcgLSB4IC0gdyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZS5zaG93KCk7XG5cdFx0XHR9LFxuXHRcdFx0c2hvdyA6IGZ1bmN0aW9uIChyZWZlcmVuY2UsIHBvc2l0aW9uLCBkYXRhKSB7XG5cdFx0XHRcdHZhciBvLCBlLCB4LCB5LCB3LCBoLCBkdywgZGgsIGNvbmQgPSB0cnVlO1xuXHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5lbGVtZW50ICYmIHZha2F0YV9jb250ZXh0LmVsZW1lbnQubGVuZ3RoKSB7XG5cdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC53aWR0aCgnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0c3dpdGNoKGNvbmQpIHtcblx0XHRcdFx0XHRjYXNlICghcG9zaXRpb24gJiYgIXJlZmVyZW5jZSk6XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0Y2FzZSAoISFwb3NpdGlvbiAmJiAhIXJlZmVyZW5jZSk6XG5cdFx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5yZWZlcmVuY2VcdD0gcmVmZXJlbmNlO1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feFx0PSBwb3NpdGlvbi54O1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feVx0PSBwb3NpdGlvbi55O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAoIXBvc2l0aW9uICYmICEhcmVmZXJlbmNlKTpcblx0XHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LnJlZmVyZW5jZVx0PSByZWZlcmVuY2U7XG5cdFx0XHRcdFx0XHRvID0gcmVmZXJlbmNlLm9mZnNldCgpO1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feFx0PSBvLmxlZnQgKyByZWZlcmVuY2Uub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LnBvc2l0aW9uX3lcdD0gby50b3A7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICghIXBvc2l0aW9uICYmICFyZWZlcmVuY2UpOlxuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feFx0PSBwb3NpdGlvbi54O1xuXHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQucG9zaXRpb25feVx0PSBwb3NpdGlvbi55O1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoISFyZWZlcmVuY2UgJiYgIWRhdGEgJiYgJChyZWZlcmVuY2UpLmRhdGEoJ3Zha2F0YV9jb250ZXh0bWVudScpKSB7XG5cdFx0XHRcdFx0ZGF0YSA9ICQocmVmZXJlbmNlKS5kYXRhKCd2YWthdGFfY29udGV4dG1lbnUnKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZigkLnZha2F0YS5jb250ZXh0Ll9wYXJzZShkYXRhKSkge1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuaHRtbCh2YWthdGFfY29udGV4dC5odG1sKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pdGVtcy5sZW5ndGgpIHtcblx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50LmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xuXHRcdFx0XHRcdGUgPSB2YWthdGFfY29udGV4dC5lbGVtZW50O1xuXHRcdFx0XHRcdHggPSB2YWthdGFfY29udGV4dC5wb3NpdGlvbl94O1xuXHRcdFx0XHRcdHkgPSB2YWthdGFfY29udGV4dC5wb3NpdGlvbl95O1xuXHRcdFx0XHRcdHcgPSBlLndpZHRoKCk7XG5cdFx0XHRcdFx0aCA9IGUuaGVpZ2h0KCk7XG5cdFx0XHRcdFx0ZHcgPSAkKHdpbmRvdykud2lkdGgoKSArICQod2luZG93KS5zY3JvbGxMZWZ0KCk7XG5cdFx0XHRcdFx0ZGggPSAkKHdpbmRvdykuaGVpZ2h0KCkgKyAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cdFx0XHRcdFx0aWYocmlnaHRfdG9fbGVmdCkge1xuXHRcdFx0XHRcdFx0eCAtPSAoZS5vdXRlcldpZHRoKCkgLSAkKHJlZmVyZW5jZSkub3V0ZXJXaWR0aCgpKTtcblx0XHRcdFx0XHRcdGlmKHggPCAkKHdpbmRvdykuc2Nyb2xsTGVmdCgpICsgMjApIHtcblx0XHRcdFx0XHRcdFx0eCA9ICQod2luZG93KS5zY3JvbGxMZWZ0KCkgKyAyMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoeCArIHcgKyAyMCA+IGR3KSB7XG5cdFx0XHRcdFx0XHR4ID0gZHcgLSAodyArIDIwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYoeSArIGggKyAyMCA+IGRoKSB7XG5cdFx0XHRcdFx0XHR5ID0gZGggLSAoaCArIDIwKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5lbGVtZW50XG5cdFx0XHRcdFx0XHQuY3NzKHsgXCJsZWZ0XCIgOiB4LCBcInRvcFwiIDogeSB9KVxuXHRcdFx0XHRcdFx0LnNob3coKVxuXHRcdFx0XHRcdFx0LmZpbmQoJ2EnKS5maXJzdCgpLnRyaWdnZXIoJ2ZvY3VzJykucGFyZW50KCkuYWRkQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKTtcblx0XHRcdFx0XHR2YWthdGFfY29udGV4dC5pc192aXNpYmxlID0gdHJ1ZTtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgb24gdGhlIGRvY3VtZW50IHdoZW4gdGhlIGNvbnRleHRtZW51IGlzIHNob3duXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQHBsdWdpbiBjb250ZXh0bWVudVxuXHRcdFx0XHRcdCAqIEBuYW1lIGNvbnRleHRfc2hvdy52YWthdGFcblx0XHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gcmVmZXJlbmNlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHJpZ2h0IGNsaWNrZWRcblx0XHRcdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgb2YgdGhlIG1lbnUgaXRzZWxmXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtPYmplY3R9IHBvc2l0aW9uIHRoZSB4ICYgeSBjb29yZGluYXRlcyBvZiB0aGUgbWVudVxuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdCQudmFrYXRhLmNvbnRleHQuX3RyaWdnZXIoXCJzaG93XCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0aGlkZSA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYodmFrYXRhX2NvbnRleHQuaXNfdmlzaWJsZSkge1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuaGlkZSgpLmZpbmQoXCJ1bFwiKS5oaWRlKCkuZW5kKCkuZmluZCgnOmZvY3VzJykudHJpZ2dlcignYmx1cicpLmVuZCgpLmRldGFjaCgpO1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmlzX3Zpc2libGUgPSBmYWxzZTtcblx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHQgKiB0cmlnZ2VyZWQgb24gdGhlIGRvY3VtZW50IHdoZW4gdGhlIGNvbnRleHRtZW51IGlzIGhpZGRlblxuXHRcdFx0XHRcdCAqIEBldmVudFxuXHRcdFx0XHRcdCAqIEBwbHVnaW4gY29udGV4dG1lbnVcblx0XHRcdFx0XHQgKiBAbmFtZSBjb250ZXh0X2hpZGUudmFrYXRhXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IHJlZmVyZW5jZSB0aGUgZWxlbWVudCB0aGF0IHdhcyByaWdodCBjbGlja2VkXG5cdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGVsZW1lbnQgdGhlIERPTSBlbGVtZW50IG9mIHRoZSBtZW51IGl0c2VsZlxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBwb3NpdGlvbiB0aGUgeCAmIHkgY29vcmRpbmF0ZXMgb2YgdGhlIG1lbnVcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHQkLnZha2F0YS5jb250ZXh0Ll90cmlnZ2VyKFwiaGlkZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0JChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyaWdodF90b19sZWZ0ID0gJChkb2N1bWVudC5ib2R5KS5jc3MoXCJkaXJlY3Rpb25cIikgPT09IFwicnRsXCI7XG5cdFx0XHR2YXIgdG8gPSBmYWxzZTtcblxuXHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudCA9ICQoXCI8dWwgY2xhc3M9J3Zha2F0YS1jb250ZXh0Jz48L3VsPlwiKTtcblx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnRcblx0XHRcdFx0Lm9uKFwibW91c2VlbnRlclwiLCBcImxpXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblxuXHRcdFx0XHRcdGlmKCQuY29udGFpbnModGhpcywgZS5yZWxhdGVkVGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0Ly8g0L/RgNC10LzQsNGF0L3QsNGC0L4g0LfQsNGA0LDQtNC4IGRlbGVnYXRlIG1vdXNlbGVhdmUg0L/Qvi3QtNC+0LvRg1xuXHRcdFx0XHRcdFx0Ly8gJCh0aGlzKS5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIik7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYodG8pIHsgY2xlYXJUaW1lb3V0KHRvKTsgfVxuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuZmluZChcIi52YWthdGEtY29udGV4dC1ob3ZlclwiKS5yZW1vdmVDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmVuZCgpO1xuXG5cdFx0XHRcdFx0JCh0aGlzKVxuXHRcdFx0XHRcdFx0LnNpYmxpbmdzKCkuZmluZChcInVsXCIpLmhpZGUoKS5lbmQoKS5lbmQoKVxuXHRcdFx0XHRcdFx0LnBhcmVudHNVbnRpbChcIi52YWthdGEtY29udGV4dFwiLCBcImxpXCIpLmFkZEJhY2soKS5hZGRDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpO1xuXHRcdFx0XHRcdCQudmFrYXRhLmNvbnRleHQuX3Nob3dfc3VibWVudSh0aGlzKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Ly8g0YLQtdGB0YLQvtCy0L4gLSDQtNCw0LvQuCDQvdC1INC90LDRgtC+0LLQsNGA0LLQsD9cblx0XHRcdFx0Lm9uKFwibW91c2VsZWF2ZVwiLCBcImxpXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYoJC5jb250YWlucyh0aGlzLCBlLnJlbGF0ZWRUYXJnZXQpKSB7IHJldHVybjsgfVxuXHRcdFx0XHRcdCQodGhpcykuZmluZChcIi52YWthdGEtY29udGV4dC1ob3ZlclwiKS5hZGRCYWNrKCkucmVtb3ZlQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdCQodGhpcykuZmluZChcIi52YWthdGEtY29udGV4dC1ob3ZlclwiKS5yZW1vdmVDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpO1xuXHRcdFx0XHRcdGlmKCQudmFrYXRhLmNvbnRleHQuc2V0dGluZ3MuaGlkZV9vbm1vdXNlbGVhdmUpIHtcblx0XHRcdFx0XHRcdHRvID0gc2V0VGltZW91dChcblx0XHRcdFx0XHRcdFx0KGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHsgJC52YWthdGEuY29udGV4dC5oaWRlKCk7IH07XG5cdFx0XHRcdFx0XHRcdH0odGhpcykpLCAkLnZha2F0YS5jb250ZXh0LnNldHRpbmdzLmhpZGVfb25tb3VzZWxlYXZlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbihcImNsaWNrXCIsIFwiYVwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Ly99KVxuXHRcdFx0XHQvLy5vbihcIm1vdXNldXBcIiwgXCJhXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYoISQodGhpcykudHJpZ2dlcignYmx1cicpLnBhcmVudCgpLmhhc0NsYXNzKFwidmFrYXRhLWNvbnRleHQtZGlzYWJsZWRcIikgJiYgJC52YWthdGEuY29udGV4dC5fZXhlY3V0ZSgkKHRoaXMpLmF0dHIoXCJyZWxcIikpICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ2tleWRvd24nLCAnYScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR2YXIgbyA9IG51bGw7XG5cdFx0XHRcdFx0XHRzd2l0Y2goZS53aGljaCkge1xuXHRcdFx0XHRcdFx0XHRjYXNlIDEzOlxuXHRcdFx0XHRcdFx0XHRjYXNlIDMyOlxuXHRcdFx0XHRcdFx0XHRcdGUudHlwZSA9IFwiY2xpY2tcIjtcblx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLnRyaWdnZXIoZSk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdFx0XHRcdFx0aWYodmFrYXRhX2NvbnRleHQuaXNfdmlzaWJsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmxhc3QoKS5jbG9zZXN0KFwibGlcIikuZmlyc3QoKS5maW5kKFwidWxcIikuaGlkZSgpLmZpbmQoXCIudmFrYXRhLWNvbnRleHQtaG92ZXJcIikucmVtb3ZlQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKS5lbmQoKS5lbmQoKS5jaGlsZHJlbignYScpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pc192aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvID0gdmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwidWw6dmlzaWJsZVwiKS5hZGRCYWNrKCkubGFzdCgpLmNoaWxkcmVuKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikucHJldkFsbChcImxpOm5vdCgudmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yKVwiKS5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIW8ubGVuZ3RoKSB7IG8gPSB2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCJ1bDp2aXNpYmxlXCIpLmFkZEJhY2soKS5sYXN0KCkuY2hpbGRyZW4oXCJsaTpub3QoLnZha2F0YS1jb250ZXh0LXNlcGFyYXRvcilcIikubGFzdCgpOyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRvLmFkZENsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikuY2hpbGRyZW4oJ2EnKS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdFx0XHRcdFx0aWYodmFrYXRhX2NvbnRleHQuaXNfdmlzaWJsZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmxhc3QoKS5jaGlsZHJlbihcInVsXCIpLnNob3coKS5jaGlsZHJlbihcImxpOm5vdCgudmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yKVwiKS5yZW1vdmVDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ob3ZlclwiKS5jaGlsZHJlbignYScpLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Y2FzZSA0MDpcblx0XHRcdFx0XHRcdFx0XHRpZih2YWthdGFfY29udGV4dC5pc192aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvID0gdmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKFwidWw6dmlzaWJsZVwiKS5hZGRCYWNrKCkubGFzdCgpLmNoaWxkcmVuKFwiLnZha2F0YS1jb250ZXh0LWhvdmVyXCIpLnJlbW92ZUNsYXNzKFwidmFrYXRhLWNvbnRleHQtaG92ZXJcIikubmV4dEFsbChcImxpOm5vdCgudmFrYXRhLWNvbnRleHQtc2VwYXJhdG9yKVwiKS5maXJzdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIW8ubGVuZ3RoKSB7IG8gPSB2YWthdGFfY29udGV4dC5lbGVtZW50LmZpbmQoXCJ1bDp2aXNpYmxlXCIpLmFkZEJhY2soKS5sYXN0KCkuY2hpbGRyZW4oXCJsaTpub3QoLnZha2F0YS1jb250ZXh0LXNlcGFyYXRvcilcIikuZmlyc3QoKTsgfVxuXHRcdFx0XHRcdFx0XHRcdFx0by5hZGRDbGFzcyhcInZha2F0YS1jb250ZXh0LWhvdmVyXCIpLmNoaWxkcmVuKCdhJykudHJpZ2dlcignZm9jdXMnKTtcblx0XHRcdFx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRjYXNlIDI3OlxuXHRcdFx0XHRcdFx0XHRcdCQudmFrYXRhLmNvbnRleHQuaGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGUud2hpY2gpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHZhciBhID0gdmFrYXRhX2NvbnRleHQuZWxlbWVudC5maW5kKCcudmFrYXRhLWNvbnRleHRtZW51LXNob3J0Y3V0LScgKyBlLndoaWNoKS5wYXJlbnQoKTtcblx0XHRcdFx0XHRpZihhLnBhcmVudCgpLm5vdCgnLnZha2F0YS1jb250ZXh0LWRpc2FibGVkJykpIHtcblx0XHRcdFx0XHRcdGEudHJpZ2dlcignY2xpY2snKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHQkKGRvY3VtZW50KVxuXHRcdFx0XHQub24oXCJtb3VzZWRvd24udmFrYXRhLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdGlmKHZha2F0YV9jb250ZXh0LmlzX3Zpc2libGUgJiYgdmFrYXRhX2NvbnRleHQuZWxlbWVudFswXSAhPT0gZS50YXJnZXQgICYmICEkLmNvbnRhaW5zKHZha2F0YV9jb250ZXh0LmVsZW1lbnRbMF0sIGUudGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0JC52YWthdGEuY29udGV4dC5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oXCJjb250ZXh0X3Nob3cudmFrYXRhLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuZmluZChcImxpOmhhcyh1bClcIikuY2hpbGRyZW4oXCJhXCIpLmFkZENsYXNzKFwidmFrYXRhLWNvbnRleHQtcGFyZW50XCIpO1xuXHRcdFx0XHRcdGlmKHJpZ2h0X3RvX2xlZnQpIHtcblx0XHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuYWRkQ2xhc3MoXCJ2YWthdGEtY29udGV4dC1ydGxcIikuY3NzKFwiZGlyZWN0aW9uXCIsIFwicnRsXCIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBhbHNvIGFwcGx5IGEgUlRMIGNsYXNzP1xuXHRcdFx0XHRcdHZha2F0YV9jb250ZXh0LmVsZW1lbnQuZmluZChcInVsXCIpLmhpZGUoKS5lbmQoKTtcblx0XHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0oJCkpO1xuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJjb250ZXh0bWVudVwiKTtcblxuXG4vKipcbiAqICMjIyBEcmFnJ24nZHJvcCBwbHVnaW5cbiAqXG4gKiBFbmFibGVzIGRyYWdnaW5nIGFuZCBkcm9wcGluZyBvZiBub2RlcyBpbiB0aGUgdHJlZSwgcmVzdWx0aW5nIGluIGEgbW92ZSBvciBjb3B5IG9wZXJhdGlvbnMuXG4gKi9cblxuXHQvKipcblx0ICogc3RvcmVzIGFsbCBkZWZhdWx0cyBmb3IgdGhlIGRyYWcnbidkcm9wIHBsdWdpblxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmRcblx0ICogQHBsdWdpbiBkbmRcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLmRuZCA9IHtcblx0XHQvKipcblx0XHQgKiBhIGJvb2xlYW4gaW5kaWNhdGluZyBpZiBhIGNvcHkgc2hvdWxkIGJlIHBvc3NpYmxlIHdoaWxlIGRyYWdnaW5nIChieSBwcmVzc2ludCB0aGUgbWV0YSBrZXkgb3IgQ3RybCkuIERlZmF1bHRzIHRvIGB0cnVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuY29weVxuXHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0ICovXG5cdFx0Y29weSA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBudW1iZXIgaW5kaWNhdGluZyBob3cgbG9uZyBhIG5vZGUgc2hvdWxkIHJlbWFpbiBob3ZlcmVkIHdoaWxlIGRyYWdnaW5nIHRvIGJlIG9wZW5lZC4gRGVmYXVsdHMgdG8gYDUwMGAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLm9wZW5fdGltZW91dFxuXHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0ICovXG5cdFx0b3Blbl90aW1lb3V0IDogNTAwLFxuXHRcdC8qKlxuXHRcdCAqIGEgZnVuY3Rpb24gaW52b2tlZCBlYWNoIHRpbWUgYSBub2RlIGlzIGFib3V0IHRvIGJlIGRyYWdnZWQsIGludm9rZWQgaW4gdGhlIHRyZWUncyBzY29wZSBhbmQgcmVjZWl2ZXMgdGhlIG5vZGVzIGFib3V0IHRvIGJlIGRyYWdnZWQgYXMgYW4gYXJndW1lbnQgKGFycmF5KSBhbmQgdGhlIGV2ZW50IHRoYXQgc3RhcnRlZCB0aGUgZHJhZyAtIHJldHVybiBgZmFsc2VgIHRvIHByZXZlbnQgZHJhZ2dpbmdcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQuaXNfZHJhZ2dhYmxlXG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRpc19kcmFnZ2FibGUgOiB0cnVlLFxuXHRcdC8qKlxuXHRcdCAqIGEgYm9vbGVhbiBpbmRpY2F0aW5nIGlmIGNoZWNrcyBzaG91bGQgY29uc3RhbnRseSBiZSBtYWRlIHdoaWxlIHRoZSB1c2VyIGlzIGRyYWdnaW5nIHRoZSBub2RlIChhcyBvcHBvc2VkIHRvIGNoZWNraW5nIG9ubHkgb24gZHJvcCksIGRlZmF1bHQgaXMgYHRydWVgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmNoZWNrX3doaWxlX2RyYWdnaW5nXG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRjaGVja193aGlsZV9kcmFnZ2luZyA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogYSBib29sZWFuIGluZGljYXRpbmcgaWYgbm9kZXMgZnJvbSB0aGlzIHRyZWUgc2hvdWxkIG9ubHkgYmUgY29waWVkIHdpdGggZG5kIChhcyBvcHBvc2VkIHRvIG1vdmVkKSwgZGVmYXVsdCBpcyBgZmFsc2VgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmFsd2F5c19jb3B5XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRhbHdheXNfY29weSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIHdoZW4gZHJvcHBpbmcgYSBub2RlIFwiaW5zaWRlXCIsIHRoaXMgc2V0dGluZyBpbmRpY2F0ZXMgdGhlIHBvc2l0aW9uIHRoZSBub2RlIHNob3VsZCBnbyB0byAtIGl0IGNhbiBiZSBhbiBpbnRlZ2VyIG9yIGEgc3RyaW5nOiBcImZpcnN0XCIgKHNhbWUgYXMgMCkgb3IgXCJsYXN0XCIsIGRlZmF1bHQgaXMgYDBgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmluc2lkZV9wb3Ncblx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdCAqL1xuXHRcdGluc2lkZV9wb3MgOiAwLFxuXHRcdC8qKlxuXHRcdCAqIHdoZW4gc3RhcnRpbmcgdGhlIGRyYWcgb24gYSBub2RlIHRoYXQgaXMgc2VsZWN0ZWQgdGhpcyBzZXR0aW5nIGNvbnRyb2xzIGlmIGFsbCBzZWxlY3RlZCBub2RlcyBhcmUgZHJhZ2dlZCBvciBvbmx5IHRoZSBzaW5nbGUgbm9kZSwgZGVmYXVsdCBpcyBgdHJ1ZWAsIHdoaWNoIG1lYW5zIGFsbCBzZWxlY3RlZCBub2RlcyBhcmUgZHJhZ2dlZCB3aGVuIHRoZSBkcmFnIGlzIHN0YXJ0ZWQgb24gYSBzZWxlY3RlZCBub2RlXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLmRyYWdfc2VsZWN0aW9uXG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHRkcmFnX3NlbGVjdGlvbiA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogY29udHJvbHMgd2hldGhlciBkbmQgd29ya3Mgb24gdG91Y2ggZGV2aWNlcy4gSWYgbGVmdCBhcyBib29sZWFuIHRydWUgZG5kIHdpbGwgd29yayB0aGUgc2FtZSBhcyBpbiBkZXNrdG9wIGJyb3dzZXJzLCB3aGljaCBpbiBzb21lIGNhc2VzIG1heSBpbXBhaXIgc2Nyb2xsaW5nLiBJZiBzZXQgdG8gYm9vbGVhbiBmYWxzZSBkbmQgd2lsbCBub3Qgd29yayBvbiB0b3VjaCBkZXZpY2VzLiBUaGVyZSBpcyBhIHNwZWNpYWwgdGhpcmQgb3B0aW9uIC0gc3RyaW5nIFwic2VsZWN0ZWRcIiB3aGljaCBtZWFucyBvbmx5IHNlbGVjdGVkIG5vZGVzIGNhbiBiZSBkcmFnZ2VkIG9uIHRvdWNoIGRldmljZXMuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuZG5kLnRvdWNoXG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHR0b3VjaCA6IHRydWUsXG5cdFx0LyoqXG5cdFx0ICogY29udHJvbHMgd2hldGhlciBpdGVtcyBjYW4gYmUgZHJvcHBlZCBhbnl3aGVyZSBvbiB0aGUgbm9kZSwgbm90IGp1c3Qgb24gdGhlIGFuY2hvciwgYnkgZGVmYXVsdCBvbmx5IHRoZSBub2RlIGFuY2hvciBpcyBhIHZhbGlkIGRyb3AgdGFyZ2V0LiBXb3JrcyBiZXN0IHdpdGggdGhlIHdob2xlcm93IHBsdWdpbi4gSWYgZW5hYmxlZCBvbiBtb2JpbGUgZGVwZW5kaW5nIG9uIHRoZSBpbnRlcmZhY2UgaXQgbWlnaHQgYmUgaGFyZCBmb3IgdGhlIHVzZXIgdG8gY2FuY2VsIHRoZSBkcm9wLCBzaW5jZSB0aGUgd2hvbGUgdHJlZSBjb250YWluZXIgd2lsbCBiZSBhIHZhbGlkIGRyb3AgdGFyZ2V0LlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZC5sYXJnZV9kcm9wX3RhcmdldFxuXHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0ICovXG5cdFx0bGFyZ2VfZHJvcF90YXJnZXQgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBjb250cm9scyB3aGV0aGVyIGEgZHJhZyBjYW4gYmUgaW5pdGlhdGVkIGZyb20gYW55IHBhcnQgb2YgdGhlIG5vZGUgYW5kIG5vdCBqdXN0IHRoZSB0ZXh0L2ljb24gcGFydCwgd29ya3MgYmVzdCB3aXRoIHRoZSB3aG9sZXJvdyBwbHVnaW4uIEtlZXAgaW4gbWluZCBpdCBjYW4gY2F1c2UgcHJvYmxlbXMgd2l0aCB0cmVlIHNjcm9sbGluZyBvbiBtb2JpbGUgZGVwZW5kaW5nIG9uIHRoZSBpbnRlcmZhY2UgLSBpbiB0aGF0IGNhc2Ugc2V0IHRoZSB0b3VjaCBvcHRpb24gdG8gXCJzZWxlY3RlZFwiLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLmRuZC5sYXJnZV9kcmFnX3RhcmdldFxuXHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0ICovXG5cdFx0bGFyZ2VfZHJhZ190YXJnZXQgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBjb250cm9scyB3aGV0aGVyIHVzZSBIVE1MNSBkbmQgYXBpIGluc3RlYWQgb2YgY2xhc3NpY2FsLiBUaGF0IHdpbGwgYWxsb3cgYmV0dGVyIGludGVncmF0aW9uIG9mIGRuZCBldmVudHMgd2l0aCBvdGhlciBIVE1MNSBjb250cm9scy5cblx0XHQgKiBAcmVmZXJlbmNlIGh0dHA6Ly9jYW5pdXNlLmNvbS8jZmVhdD1kcmFnbmRyb3Bcblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5kbmQudXNlX2h0bWw1XG5cdFx0ICogQHBsdWdpbiBkbmRcblx0XHQgKi9cblx0XHR1c2VfaHRtbDU6IGZhbHNlXG5cdH07XG5cdHZhciBkcmcsIGVsbTtcblx0Ly8gVE9ETzogbm93IGNoZWNrIHdvcmtzIGJ5IGNoZWNraW5nIGZvciBlYWNoIG5vZGUgaW5kaXZpZHVhbGx5LCBob3cgYWJvdXQgbWF4X2NoaWxkcmVuLCB1bmlxdWUsIGV0Yz9cblx0JC5qc3RyZWUucGx1Z2lucy5kbmQgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5pbml0ID0gZnVuY3Rpb24gKGVsLCBvcHRpb25zKSB7XG5cdFx0XHRwYXJlbnQuaW5pdC5jYWxsKHRoaXMsIGVsLCBvcHRpb25zKTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuZG5kLnVzZV9odG1sNSA9IHRoaXMuc2V0dGluZ3MuZG5kLnVzZV9odG1sNSAmJiAoJ2RyYWdnYWJsZScgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpKTtcblx0XHR9O1xuXHRcdHRoaXMuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHBhcmVudC5iaW5kLmNhbGwodGhpcyk7XG5cblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24odGhpcy5zZXR0aW5ncy5kbmQudXNlX2h0bWw1ID8gJ2RyYWdzdGFydC5qc3RyZWUnIDogJ21vdXNlZG93bi5qc3RyZWUgdG91Y2hzdGFydC5qc3RyZWUnLCB0aGlzLnNldHRpbmdzLmRuZC5sYXJnZV9kcmFnX3RhcmdldCA/ICcuanN0cmVlLW5vZGUnIDogJy5qc3RyZWUtYW5jaG9yJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuZG5kLmxhcmdlX2RyYWdfdGFyZ2V0ICYmICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qc3RyZWUtbm9kZScpWzBdICE9PSBlLmN1cnJlbnRUYXJnZXQpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihlLnR5cGUgPT09IFwidG91Y2hzdGFydFwiICYmICghdGhpcy5zZXR0aW5ncy5kbmQudG91Y2ggfHwgKHRoaXMuc2V0dGluZ3MuZG5kLnRvdWNoID09PSAnc2VsZWN0ZWQnICYmICEkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdCgnLmpzdHJlZS1ub2RlJykuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykuaGFzQ2xhc3MoJ2pzdHJlZS1jbGlja2VkJykpKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBvYmogPSB0aGlzLmdldF9ub2RlKGUudGFyZ2V0KSxcblx0XHRcdFx0XHRcdFx0bWx0ID0gdGhpcy5pc19zZWxlY3RlZChvYmopICYmIHRoaXMuc2V0dGluZ3MuZG5kLmRyYWdfc2VsZWN0aW9uID8gdGhpcy5nZXRfdG9wX3NlbGVjdGVkKCkubGVuZ3RoIDogMSxcblx0XHRcdFx0XHRcdFx0dHh0ID0gKG1sdCA+IDEgPyBtbHQgKyAnICcgKyB0aGlzLmdldF9zdHJpbmcoJ25vZGVzJykgOiB0aGlzLmdldF90ZXh0KGUuY3VycmVudFRhcmdldCkpO1xuXHRcdFx0XHRcdFx0aWYodGhpcy5zZXR0aW5ncy5jb3JlLmZvcmNlX3RleHQpIHtcblx0XHRcdFx0XHRcdFx0dHh0ID0gJC52YWthdGEuaHRtbC5lc2NhcGUodHh0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKG9iaiAmJiBvYmouaWQgJiYgb2JqLmlkICE9PSAkLmpzdHJlZS5yb290ICYmIChlLndoaWNoID09PSAxIHx8IGUudHlwZSA9PT0gXCJ0b3VjaHN0YXJ0XCIgfHwgZS50eXBlID09PSBcImRyYWdzdGFydFwiKSAmJlxuXHRcdFx0XHRcdFx0XHQodGhpcy5zZXR0aW5ncy5kbmQuaXNfZHJhZ2dhYmxlID09PSB0cnVlIHx8ICgkLnZha2F0YS5pc19mdW5jdGlvbih0aGlzLnNldHRpbmdzLmRuZC5pc19kcmFnZ2FibGUpICYmIHRoaXMuc2V0dGluZ3MuZG5kLmlzX2RyYWdnYWJsZS5jYWxsKHRoaXMsIChtbHQgPiAxID8gdGhpcy5nZXRfdG9wX3NlbGVjdGVkKHRydWUpIDogW29ial0pLCBlKSkpXG5cdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0ZHJnID0geyAnanN0cmVlJyA6IHRydWUsICdvcmlnaW4nIDogdGhpcywgJ29iaicgOiB0aGlzLmdldF9ub2RlKG9iaix0cnVlKSwgJ25vZGVzJyA6IG1sdCA+IDEgPyB0aGlzLmdldF90b3Bfc2VsZWN0ZWQoKSA6IFtvYmouaWRdIH07XG5cdFx0XHRcdFx0XHRcdGVsbSA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZG5kLnVzZV9odG1sNSkge1xuXHRcdFx0XHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignc3RhcnQnLCBlLCB7ICdoZWxwZXInOiAkKCksICdlbGVtZW50JzogZWxtLCAnZGF0YSc6IGRyZyB9KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQudHJpZ2dlcignbW91c2Vkb3duLmpzdHJlZScpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiAkLnZha2F0YS5kbmQuc3RhcnQoZSwgZHJnLCAnPGRpdiBpZD1cImpzdHJlZS1kbmRcIiBjbGFzcz1cImpzdHJlZS0nICsgdGhpcy5nZXRfdGhlbWUoKSArICcganN0cmVlLScgKyB0aGlzLmdldF90aGVtZSgpICsgJy0nICsgdGhpcy5nZXRfdGhlbWVfdmFyaWFudCgpICsgJyAnICsgKCB0aGlzLnNldHRpbmdzLmNvcmUudGhlbWVzLnJlc3BvbnNpdmUgPyAnIGpzdHJlZS1kbmQtcmVzcG9uc2l2ZScgOiAnJyApICsgJ1wiPjxpIGNsYXNzPVwianN0cmVlLWljb24ganN0cmVlLWVyXCI+PC9pPicgKyB0eHQgKyAnPGlucyBjbGFzcz1cImpzdHJlZS1jb3B5XCI+KzwvaW5zPjwvZGl2PicpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmRuZC51c2VfaHRtbDUpIHtcblx0XHRcdFx0dGhpcy5lbGVtZW50XG5cdFx0XHRcdFx0Lm9uKCdkcmFnb3Zlci5qc3RyZWUnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignbW92ZScsIGUsIHsgJ2hlbHBlcic6ICQoKSwgJ2VsZW1lbnQnOiBlbG0sICdkYXRhJzogZHJnIH0pO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC8vLm9uKCdkcmFnZW50ZXIuanN0cmVlJywgdGhpcy5zZXR0aW5ncy5kbmQubGFyZ2VfZHJvcF90YXJnZXQgPyAnLmpzdHJlZS1ub2RlJyA6ICcuanN0cmVlLWFuY2hvcicsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHQvL1x0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0Ly9cdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKCdtb3ZlJywgZSwgeyAnaGVscGVyJzogJCgpLCAnZWxlbWVudCc6IGVsbSwgJ2RhdGEnOiBkcmcgfSk7XG5cdFx0XHRcdFx0Ly9cdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdC8vXHR9LCB0aGlzKSlcblx0XHRcdFx0XHQub24oJ2Ryb3AuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoJ3N0b3AnLCBlLCB7ICdoZWxwZXInOiAkKCksICdlbGVtZW50JzogZWxtLCAnZGF0YSc6IGRyZyB9KTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMucmVkcmF3X25vZGUgPSBmdW5jdGlvbihvYmosIGRlZXAsIGNhbGxiYWNrLCBmb3JjZV9yZW5kZXIpIHtcblx0XHRcdG9iaiA9IHBhcmVudC5yZWRyYXdfbm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYgKG9iaiAmJiB0aGlzLnNldHRpbmdzLmRuZC51c2VfaHRtbDUpIHtcblx0XHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuZG5kLmxhcmdlX2RyYWdfdGFyZ2V0KSB7XG5cdFx0XHRcdFx0b2JqLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGksIGosIHRtcCA9IG51bGw7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gb2JqLmNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRpZihvYmouY2hpbGROb2Rlc1tpXSAmJiBvYmouY2hpbGROb2Rlc1tpXS5jbGFzc05hbWUgJiYgb2JqLmNoaWxkTm9kZXNbaV0uY2xhc3NOYW1lLmluZGV4T2YoXCJqc3RyZWUtYW5jaG9yXCIpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHR0bXAgPSBvYmouY2hpbGROb2Rlc1tpXTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHRtcCkge1xuXHRcdFx0XHRcdFx0dG1wLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgdHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH07XG5cdH07XG5cblx0JChmdW5jdGlvbigpIHtcblx0XHQvLyBiaW5kIG9ubHkgb25jZSBmb3IgYWxsIGluc3RhbmNlc1xuXHRcdHZhciBsYXN0bXYgPSBmYWxzZSxcblx0XHRcdGxhc3RlciA9IGZhbHNlLFxuXHRcdFx0bGFzdGV2ID0gZmFsc2UsXG5cdFx0XHRvcGVudG8gPSBmYWxzZSxcblx0XHRcdG1hcmtlciA9ICQoJzxkaXYgaWQ9XCJqc3RyZWUtbWFya2VyXCI+JiMxNjA7PC9kaXY+JykuaGlkZSgpOyAvLy5hcHBlbmRUbygnYm9keScpO1xuXG5cdFx0JChkb2N1bWVudClcblx0XHRcdC5vbignZHJhZ292ZXIudmFrYXRhLmpzdHJlZScsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGlmIChlbG0pIHtcblx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoJ21vdmUnLCBlLCB7ICdoZWxwZXInOiAkKCksICdlbGVtZW50JzogZWxtLCAnZGF0YSc6IGRyZyB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5vbignZHJvcC52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKGVsbSkge1xuXHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcignc3RvcCcsIGUsIHsgJ2hlbHBlcic6ICQoKSwgJ2VsZW1lbnQnOiBlbG0sICdkYXRhJzogZHJnIH0pO1xuXHRcdFx0XHRcdGVsbSA9IG51bGw7XG5cdFx0XHRcdFx0ZHJnID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5vbignZG5kX3N0YXJ0LnZha2F0YS5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRsYXN0bXYgPSBmYWxzZTtcblx0XHRcdFx0bGFzdGV2ID0gZmFsc2U7XG5cdFx0XHRcdGlmKCFkYXRhIHx8ICFkYXRhLmRhdGEgfHwgIWRhdGEuZGF0YS5qc3RyZWUpIHsgcmV0dXJuOyB9XG5cdFx0XHRcdG1hcmtlci5hcHBlbmRUbyhkb2N1bWVudC5ib2R5KTsgLy8uc2hvdygpO1xuXHRcdFx0fSlcblx0XHRcdC5vbignZG5kX21vdmUudmFrYXRhLmpzdHJlZScsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdHZhciBpc0RpZmZlcmVudE5vZGUgPSBkYXRhLmV2ZW50LnRhcmdldCAhPT0gbGFzdGV2LnRhcmdldDtcblx0XHRcdFx0aWYob3BlbnRvKSB7XG5cdFx0XHRcdFx0aWYgKCFkYXRhLmV2ZW50IHx8IGRhdGEuZXZlbnQudHlwZSAhPT0gJ2RyYWdvdmVyJyB8fCBpc0RpZmZlcmVudE5vZGUpIHtcblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChvcGVudG8pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZighZGF0YSB8fCAhZGF0YS5kYXRhIHx8ICFkYXRhLmRhdGEuanN0cmVlKSB7IHJldHVybjsgfVxuXG5cdFx0XHRcdC8vIGlmIHdlIGFyZSBob3ZlcmluZyB0aGUgbWFya2VyIGltYWdlIGRvIG5vdGhpbmcgKGNhbiBoYXBwZW4gb24gXCJpbnNpZGVcIiBkcmFncylcblx0XHRcdFx0aWYoZGF0YS5ldmVudC50YXJnZXQuaWQgJiYgZGF0YS5ldmVudC50YXJnZXQuaWQgPT09ICdqc3RyZWUtbWFya2VyJykge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0ZXYgPSBkYXRhLmV2ZW50O1xuXG5cdFx0XHRcdHZhciBpbnMgPSAkLmpzdHJlZS5yZWZlcmVuY2UoZGF0YS5ldmVudC50YXJnZXQpLFxuXHRcdFx0XHRcdHJlZiA9IGZhbHNlLFxuXHRcdFx0XHRcdG9mZiA9IGZhbHNlLFxuXHRcdFx0XHRcdHJlbCA9IGZhbHNlLFxuXHRcdFx0XHRcdHRtcCwgbCwgdCwgaCwgcCwgaSwgbywgb2ssIHQxLCB0Miwgb3AsIHBzLCBwciwgaXAsIHRtLCBpc19jb3B5LCBwbiwgYztcblx0XHRcdFx0Ly8gaWYgd2UgYXJlIG92ZXIgYW4gaW5zdGFuY2Vcblx0XHRcdFx0aWYoaW5zICYmIGlucy5fZGF0YSAmJiBpbnMuX2RhdGEuZG5kKSB7XG5cdFx0XHRcdFx0bWFya2VyLmF0dHIoJ2NsYXNzJywgJ2pzdHJlZS0nICsgaW5zLmdldF90aGVtZSgpICsgKCBpbnMuc2V0dGluZ3MuY29yZS50aGVtZXMucmVzcG9uc2l2ZSA/ICcganN0cmVlLWRuZC1yZXNwb25zaXZlJyA6ICcnICkpO1xuXHRcdFx0XHRcdGlzX2NvcHkgPSBkYXRhLmRhdGEub3JpZ2luICYmIChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5hbHdheXNfY29weSB8fCAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuY29weSAmJiAoZGF0YS5ldmVudC5tZXRhS2V5IHx8IGRhdGEuZXZlbnQuY3RybEtleSkpKTtcblx0XHRcdFx0XHRkYXRhLmhlbHBlclxuXHRcdFx0XHRcdFx0LmNoaWxkcmVuKCkuYXR0cignY2xhc3MnLCAnanN0cmVlLScgKyBpbnMuZ2V0X3RoZW1lKCkgKyAnIGpzdHJlZS0nICsgaW5zLmdldF90aGVtZSgpICsgJy0nICsgaW5zLmdldF90aGVtZV92YXJpYW50KCkgKyAnICcgKyAoIGlucy5zZXR0aW5ncy5jb3JlLnRoZW1lcy5yZXNwb25zaXZlID8gJyBqc3RyZWUtZG5kLXJlc3BvbnNpdmUnIDogJycgKSlcblx0XHRcdFx0XHRcdC5maW5kKCcuanN0cmVlLWNvcHknKS5maXJzdCgpWyBpc19jb3B5ID8gJ3Nob3cnIDogJ2hpZGUnIF0oKTtcblxuXHRcdFx0XHRcdC8vIGlmIGFyZSBob3ZlcmluZyB0aGUgY29udGFpbmVyIGl0c2VsZiBhZGQgYSBuZXcgcm9vdCBub2RlXG5cdFx0XHRcdFx0Ly9jb25zb2xlLmxvZyhkYXRhLmV2ZW50KTtcblx0XHRcdFx0XHRpZiggKGRhdGEuZXZlbnQudGFyZ2V0ID09PSBpbnMuZWxlbWVudFswXSB8fCBkYXRhLmV2ZW50LnRhcmdldCA9PT0gaW5zLmdldF9jb250YWluZXJfdWwoKVswXSkgJiYgaW5zLmdldF9jb250YWluZXJfdWwoKS5jaGlsZHJlbigpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBkYXRhLmRhdGEubm9kZXMubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0XHRcdG9rID0gb2sgJiYgaW5zLmNoZWNrKCAoZGF0YS5kYXRhLm9yaWdpbiAmJiAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuYWx3YXlzX2NvcHkgfHwgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmNvcHkgJiYgKGRhdGEuZXZlbnQubWV0YUtleSB8fCBkYXRhLmV2ZW50LmN0cmxLZXkpKSApID8gXCJjb3B5X25vZGVcIiA6IFwibW92ZV9ub2RlXCIpLCAoZGF0YS5kYXRhLm9yaWdpbiAmJiBkYXRhLmRhdGEub3JpZ2luICE9PSBpbnMgPyBkYXRhLmRhdGEub3JpZ2luLmdldF9ub2RlKGRhdGEuZGF0YS5ub2Rlc1t0MV0pIDogZGF0YS5kYXRhLm5vZGVzW3QxXSksICQuanN0cmVlLnJvb3QsICdsYXN0JywgeyAnZG5kJyA6IHRydWUsICdyZWYnIDogaW5zLmdldF9ub2RlKCQuanN0cmVlLnJvb3QpLCAncG9zJyA6ICdpJywgJ29yaWdpbicgOiBkYXRhLmRhdGEub3JpZ2luLCAnaXNfbXVsdGknIDogKGRhdGEuZGF0YS5vcmlnaW4gJiYgZGF0YS5kYXRhLm9yaWdpbiAhPT0gaW5zKSwgJ2lzX2ZvcmVpZ24nIDogKCFkYXRhLmRhdGEub3JpZ2luKSB9KTtcblx0XHRcdFx0XHRcdFx0aWYoIW9rKSB7IGJyZWFrOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZihvaykge1xuXHRcdFx0XHRcdFx0XHRsYXN0bXYgPSB7ICdpbnMnIDogaW5zLCAncGFyJyA6ICQuanN0cmVlLnJvb3QsICdwb3MnIDogJ2xhc3QnIH07XG5cdFx0XHRcdFx0XHRcdG1hcmtlci5oaWRlKCk7XG5cdFx0XHRcdFx0XHRcdGRhdGEuaGVscGVyLmZpbmQoJy5qc3RyZWUtaWNvbicpLmZpcnN0KCkucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1lcicpLmFkZENsYXNzKCdqc3RyZWUtb2snKTtcblx0XHRcdFx0XHRcdFx0aWYgKGRhdGEuZXZlbnQub3JpZ2luYWxFdmVudCAmJiBkYXRhLmV2ZW50Lm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gaXNfY29weSA/ICdjb3B5JyA6ICdtb3ZlJztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gaWYgd2UgYXJlIGhvdmVyaW5nIGEgdHJlZSBub2RlXG5cdFx0XHRcdFx0XHRyZWYgPSBpbnMuc2V0dGluZ3MuZG5kLmxhcmdlX2Ryb3BfdGFyZ2V0ID8gJChkYXRhLmV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmpzdHJlZS1ub2RlJykuY2hpbGRyZW4oJy5qc3RyZWUtYW5jaG9yJykgOiAkKGRhdGEuZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuanN0cmVlLWFuY2hvcicpO1xuXHRcdFx0XHRcdFx0aWYocmVmICYmIHJlZi5sZW5ndGggJiYgcmVmLnBhcmVudCgpLmlzKCcuanN0cmVlLWNsb3NlZCwgLmpzdHJlZS1vcGVuLCAuanN0cmVlLWxlYWYnKSkge1xuXHRcdFx0XHRcdFx0XHRvZmYgPSByZWYub2Zmc2V0KCk7XG5cdFx0XHRcdFx0XHRcdHJlbCA9IChkYXRhLmV2ZW50LnBhZ2VZICE9PSB1bmRlZmluZWQgPyBkYXRhLmV2ZW50LnBhZ2VZIDogZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LnBhZ2VZKSAtIG9mZi50b3A7XG5cdFx0XHRcdFx0XHRcdGggPSByZWYub3V0ZXJIZWlnaHQoKTtcblx0XHRcdFx0XHRcdFx0aWYocmVsIDwgaCAvIDMpIHtcblx0XHRcdFx0XHRcdFx0XHRvID0gWydiJywgJ2knLCAnYSddO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2UgaWYocmVsID4gaCAtIGggLyAzKSB7XG5cdFx0XHRcdFx0XHRcdFx0byA9IFsnYScsICdpJywgJ2InXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRvID0gcmVsID4gaCAvIDIgPyBbJ2knLCAnYScsICdiJ10gOiBbJ2knLCAnYicsICdhJ107XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0JC5lYWNoKG8sIGZ1bmN0aW9uIChqLCB2KSB7XG5cdFx0XHRcdFx0XHRcdFx0c3dpdGNoKHYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2InOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsID0gb2ZmLmxlZnQgLSA2O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ID0gb2ZmLnRvcDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cCA9IGlucy5nZXRfcGFyZW50KHJlZik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGkgPSByZWYucGFyZW50KCkuaW5kZXgoKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0YyA9ICdqc3RyZWUtYmVsb3cnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2knOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpcCA9IGlucy5zZXR0aW5ncy5kbmQuaW5zaWRlX3Bvcztcblx0XHRcdFx0XHRcdFx0XHRcdFx0dG0gPSBpbnMuZ2V0X25vZGUocmVmLnBhcmVudCgpKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bCA9IG9mZi5sZWZ0IC0gMjtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dCA9IG9mZi50b3AgKyBoIC8gMiArIDE7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHAgPSB0bS5pZDtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aSA9IGlwID09PSAnZmlyc3QnID8gMCA6IChpcCA9PT0gJ2xhc3QnID8gdG0uY2hpbGRyZW4ubGVuZ3RoIDogTWF0aC5taW4oaXAsIHRtLmNoaWxkcmVuLmxlbmd0aCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjID0gJ2pzdHJlZS1pbnNpZGUnO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRcdGNhc2UgJ2EnOlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRsID0gb2ZmLmxlZnQgLSA2O1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0ID0gb2ZmLnRvcCArIGg7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHAgPSBpbnMuZ2V0X3BhcmVudChyZWYpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpID0gcmVmLnBhcmVudCgpLmluZGV4KCkgKyAxO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRjID0gJ2pzdHJlZS1hYm92ZSc7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBkYXRhLmRhdGEubm9kZXMubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvcCA9IGRhdGEuZGF0YS5vcmlnaW4gJiYgKGRhdGEuZGF0YS5vcmlnaW4uc2V0dGluZ3MuZG5kLmFsd2F5c19jb3B5IHx8IChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5jb3B5ICYmIChkYXRhLmV2ZW50Lm1ldGFLZXkgfHwgZGF0YS5ldmVudC5jdHJsS2V5KSkpID8gXCJjb3B5X25vZGVcIiA6IFwibW92ZV9ub2RlXCI7XG5cdFx0XHRcdFx0XHRcdFx0XHRwcyA9IGk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZihvcCA9PT0gXCJtb3ZlX25vZGVcIiAmJiB2ID09PSAnYScgJiYgKGRhdGEuZGF0YS5vcmlnaW4gJiYgZGF0YS5kYXRhLm9yaWdpbiA9PT0gaW5zKSAmJiBwID09PSBpbnMuZ2V0X3BhcmVudChkYXRhLmRhdGEubm9kZXNbdDFdKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRwciA9IGlucy5nZXRfbm9kZShwKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYocHMgPiAkLmluQXJyYXkoZGF0YS5kYXRhLm5vZGVzW3QxXSwgcHIuY2hpbGRyZW4pKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cHMgLT0gMTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0b2sgPSBvayAmJiAoIChpbnMgJiYgaW5zLnNldHRpbmdzICYmIGlucy5zZXR0aW5ncy5kbmQgJiYgaW5zLnNldHRpbmdzLmRuZC5jaGVja193aGlsZV9kcmFnZ2luZyA9PT0gZmFsc2UpIHx8IGlucy5jaGVjayhvcCwgKGRhdGEuZGF0YS5vcmlnaW4gJiYgZGF0YS5kYXRhLm9yaWdpbiAhPT0gaW5zID8gZGF0YS5kYXRhLm9yaWdpbi5nZXRfbm9kZShkYXRhLmRhdGEubm9kZXNbdDFdKSA6IGRhdGEuZGF0YS5ub2Rlc1t0MV0pLCBwLCBwcywgeyAnZG5kJyA6IHRydWUsICdyZWYnIDogaW5zLmdldF9ub2RlKHJlZi5wYXJlbnQoKSksICdwb3MnIDogdiwgJ29yaWdpbicgOiBkYXRhLmRhdGEub3JpZ2luLCAnaXNfbXVsdGknIDogKGRhdGEuZGF0YS5vcmlnaW4gJiYgZGF0YS5kYXRhLm9yaWdpbiAhPT0gaW5zKSwgJ2lzX2ZvcmVpZ24nIDogKCFkYXRhLmRhdGEub3JpZ2luKSB9KSApO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoIW9rKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmKGlucyAmJiBpbnMubGFzdF9lcnJvcikgeyBsYXN0ZXIgPSBpbnMubGFzdF9lcnJvcigpOyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZih2ID09PSAnaScgJiYgcmVmLnBhcmVudCgpLmlzKCcuanN0cmVlLWNsb3NlZCcpICYmIGlucy5zZXR0aW5ncy5kbmQub3Blbl90aW1lb3V0KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIWRhdGEuZXZlbnQgfHwgZGF0YS5ldmVudC50eXBlICE9PSAnZHJhZ292ZXInIHx8IGlzRGlmZmVyZW50Tm9kZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3BlbnRvKSB7IGNsZWFyVGltZW91dChvcGVudG8pOyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wZW50byA9IHNldFRpbWVvdXQoKGZ1bmN0aW9uICh4LCB6KSB7IHJldHVybiBmdW5jdGlvbiAoKSB7IHgub3Blbl9ub2RlKHopOyB9OyB9KGlucywgcmVmKSksIGlucy5zZXR0aW5ncy5kbmQub3Blbl90aW1lb3V0KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYob2spIHtcblx0XHRcdFx0XHRcdFx0XHRcdHBuID0gaW5zLmdldF9ub2RlKHAsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFwbi5oYXNDbGFzcygnLmpzdHJlZS1kbmQtcGFyZW50JykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JCgnLmpzdHJlZS1kbmQtcGFyZW50JykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1kbmQtcGFyZW50Jyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHBuLmFkZENsYXNzKCdqc3RyZWUtZG5kLXBhcmVudCcpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0bGFzdG12ID0geyAnaW5zJyA6IGlucywgJ3BhcicgOiBwLCAncG9zJyA6IHYgPT09ICdpJyAmJiBpcCA9PT0gJ2xhc3QnICYmIGkgPT09IDAgJiYgIWlucy5pc19sb2FkZWQodG0pID8gJ2xhc3QnIDogaSB9O1xuXHRcdFx0XHRcdFx0XHRcdFx0bWFya2VyLmNzcyh7ICdsZWZ0JyA6IGwgKyAncHgnLCAndG9wJyA6IHQgKyAncHgnIH0pLnNob3coKTtcblx0XHRcdFx0XHRcdFx0XHRcdG1hcmtlci5yZW1vdmVDbGFzcygnanN0cmVlLWFib3ZlIGpzdHJlZS1pbnNpZGUganN0cmVlLWJlbG93JykuYWRkQ2xhc3MoYyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRkYXRhLmhlbHBlci5maW5kKCcuanN0cmVlLWljb24nKS5maXJzdCgpLnJlbW92ZUNsYXNzKCdqc3RyZWUtZXInKS5hZGRDbGFzcygnanN0cmVlLW9rJyk7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50ICYmIGRhdGEuZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gaXNfY29weSA/ICdjb3B5JyA6ICdtb3ZlJztcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGxhc3RlciA9IHt9O1xuXHRcdFx0XHRcdFx0XHRcdFx0byA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0aWYobyA9PT0gdHJ1ZSkgeyByZXR1cm47IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0JCgnLmpzdHJlZS1kbmQtcGFyZW50JykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1kbmQtcGFyZW50Jyk7XG5cdFx0XHRcdGxhc3RtdiA9IGZhbHNlO1xuXHRcdFx0XHRkYXRhLmhlbHBlci5maW5kKCcuanN0cmVlLWljb24nKS5yZW1vdmVDbGFzcygnanN0cmVlLW9rJykuYWRkQ2xhc3MoJ2pzdHJlZS1lcicpO1xuXHRcdFx0XHRpZiAoZGF0YS5ldmVudC5vcmlnaW5hbEV2ZW50ICYmIGRhdGEuZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIpIHtcblx0XHRcdFx0XHQvL2RhdGEuZXZlbnQub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcblx0XHRcdFx0fVxuXHRcdFx0XHRtYXJrZXIuaGlkZSgpO1xuXHRcdFx0fSlcblx0XHRcdC5vbignZG5kX3Njcm9sbC52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0aWYoIWRhdGEgfHwgIWRhdGEuZGF0YSB8fCAhZGF0YS5kYXRhLmpzdHJlZSkgeyByZXR1cm47IH1cblx0XHRcdFx0bWFya2VyLmhpZGUoKTtcblx0XHRcdFx0bGFzdG12ID0gZmFsc2U7XG5cdFx0XHRcdGxhc3RldiA9IGZhbHNlO1xuXHRcdFx0XHRkYXRhLmhlbHBlci5maW5kKCcuanN0cmVlLWljb24nKS5maXJzdCgpLnJlbW92ZUNsYXNzKCdqc3RyZWUtb2snKS5hZGRDbGFzcygnanN0cmVlLWVyJyk7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdkbmRfc3RvcC52YWthdGEuanN0cmVlJywgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0JCgnLmpzdHJlZS1kbmQtcGFyZW50JykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS1kbmQtcGFyZW50Jyk7XG5cdFx0XHRcdGlmKG9wZW50bykgeyBjbGVhclRpbWVvdXQob3BlbnRvKTsgfVxuXHRcdFx0XHRpZighZGF0YSB8fCAhZGF0YS5kYXRhIHx8ICFkYXRhLmRhdGEuanN0cmVlKSB7IHJldHVybjsgfVxuXHRcdFx0XHRtYXJrZXIuaGlkZSgpLmRldGFjaCgpO1xuXHRcdFx0XHR2YXIgaSwgaiwgbm9kZXMgPSBbXTtcblx0XHRcdFx0aWYobGFzdG12KSB7XG5cdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZGF0YS5kYXRhLm5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0bm9kZXNbaV0gPSBkYXRhLmRhdGEub3JpZ2luID8gZGF0YS5kYXRhLm9yaWdpbi5nZXRfbm9kZShkYXRhLmRhdGEubm9kZXNbaV0pIDogZGF0YS5kYXRhLm5vZGVzW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRsYXN0bXYuaW5zWyBkYXRhLmRhdGEub3JpZ2luICYmIChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5hbHdheXNfY29weSB8fCAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuY29weSAmJiAoZGF0YS5ldmVudC5tZXRhS2V5IHx8IGRhdGEuZXZlbnQuY3RybEtleSkpKSA/ICdjb3B5X25vZGUnIDogJ21vdmVfbm9kZScgXShub2RlcywgbGFzdG12LnBhciwgbGFzdG12LnBvcywgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZGF0YS5kYXRhLm9yaWdpbik7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0aSA9ICQoZGF0YS5ldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5qc3RyZWUnKTtcblx0XHRcdFx0XHRpZihpLmxlbmd0aCAmJiBsYXN0ZXIgJiYgbGFzdGVyLmVycm9yICYmIGxhc3Rlci5lcnJvciA9PT0gJ2NoZWNrJykge1xuXHRcdFx0XHRcdFx0aSA9IGkuanN0cmVlKHRydWUpO1xuXHRcdFx0XHRcdFx0aWYoaSkge1xuXHRcdFx0XHRcdFx0XHRpLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCBsYXN0ZXIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0ZXYgPSBmYWxzZTtcblx0XHRcdFx0bGFzdG12ID0gZmFsc2U7XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdrZXl1cC5qc3RyZWUga2V5ZG93bi5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRkYXRhID0gJC52YWthdGEuZG5kLl9nZXQoKTtcblx0XHRcdFx0aWYoZGF0YSAmJiBkYXRhLmRhdGEgJiYgZGF0YS5kYXRhLmpzdHJlZSkge1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09IFwia2V5dXBcIiAmJiBlLndoaWNoID09PSAyNykge1xuXHRcdFx0XHRcdFx0aWYgKG9wZW50bykgeyBjbGVhclRpbWVvdXQob3BlbnRvKTsgfVxuXHRcdFx0XHRcdFx0bGFzdG12ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRsYXN0ZXIgPSBmYWxzZTtcblx0XHRcdFx0XHRcdGxhc3RldiA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0b3BlbnRvID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRtYXJrZXIuaGlkZSgpLmRldGFjaCgpO1xuXHRcdFx0XHRcdFx0JC52YWthdGEuZG5kLl9jbGVhbigpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkYXRhLmhlbHBlci5maW5kKCcuanN0cmVlLWNvcHknKS5maXJzdCgpWyBkYXRhLmRhdGEub3JpZ2luICYmIChkYXRhLmRhdGEub3JpZ2luLnNldHRpbmdzLmRuZC5hbHdheXNfY29weSB8fCAoZGF0YS5kYXRhLm9yaWdpbi5zZXR0aW5ncy5kbmQuY29weSAmJiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkpKSA/ICdzaG93JyA6ICdoaWRlJyBdKCk7XG5cdFx0XHRcdFx0XHRpZihsYXN0ZXYpIHtcblx0XHRcdFx0XHRcdFx0bGFzdGV2Lm1ldGFLZXkgPSBlLm1ldGFLZXk7XG5cdFx0XHRcdFx0XHRcdGxhc3Rldi5jdHJsS2V5ID0gZS5jdHJsS2V5O1xuXHRcdFx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoJ21vdmUnLCBsYXN0ZXYpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdH0pO1xuXG5cdC8vIGhlbHBlcnNcblx0KGZ1bmN0aW9uICgkKSB7XG5cdFx0JC52YWthdGEuaHRtbCA9IHtcblx0XHRcdGRpdiA6ICQoJzxkaXY+PC9kaXY+JyksXG5cdFx0XHRlc2NhcGUgOiBmdW5jdGlvbiAoc3RyKSB7XG5cdFx0XHRcdHJldHVybiAkLnZha2F0YS5odG1sLmRpdi50ZXh0KHN0cikuaHRtbCgpO1xuXHRcdFx0fSxcblx0XHRcdHN0cmlwIDogZnVuY3Rpb24gKHN0cikge1xuXHRcdFx0XHRyZXR1cm4gJC52YWthdGEuaHRtbC5kaXYuZW1wdHkoKS5hcHBlbmQoJC5wYXJzZUhUTUwoc3RyKSkudGV4dCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0Ly8gcHJpdmF0ZSB2YXJpYWJsZVxuXHRcdHZhciB2YWthdGFfZG5kID0ge1xuXHRcdFx0ZWxlbWVudFx0OiBmYWxzZSxcblx0XHRcdHRhcmdldFx0OiBmYWxzZSxcblx0XHRcdGlzX2Rvd25cdDogZmFsc2UsXG5cdFx0XHRpc19kcmFnXHQ6IGZhbHNlLFxuXHRcdFx0aGVscGVyXHQ6IGZhbHNlLFxuXHRcdFx0aGVscGVyX3c6IDAsXG5cdFx0XHRkYXRhXHQ6IGZhbHNlLFxuXHRcdFx0aW5pdF94XHQ6IDAsXG5cdFx0XHRpbml0X3lcdDogMCxcblx0XHRcdHNjcm9sbF9sOiAwLFxuXHRcdFx0c2Nyb2xsX3Q6IDAsXG5cdFx0XHRzY3JvbGxfZTogZmFsc2UsXG5cdFx0XHRzY3JvbGxfaTogZmFsc2UsXG5cdFx0XHRpc190b3VjaDogZmFsc2Vcblx0XHR9O1xuXHRcdCQudmFrYXRhLmRuZCA9IHtcblx0XHRcdHNldHRpbmdzIDoge1xuXHRcdFx0XHRzY3JvbGxfc3BlZWRcdFx0OiAxMCxcblx0XHRcdFx0c2Nyb2xsX3Byb3hpbWl0eVx0OiAyMCxcblx0XHRcdFx0aGVscGVyX2xlZnRcdFx0XHQ6IDUsXG5cdFx0XHRcdGhlbHBlcl90b3BcdFx0XHQ6IDEwLFxuXHRcdFx0XHR0aHJlc2hvbGRcdFx0XHQ6IDUsXG5cdFx0XHRcdHRocmVzaG9sZF90b3VjaFx0XHQ6IDEwXG5cdFx0XHR9LFxuXHRcdFx0X3RyaWdnZXIgOiBmdW5jdGlvbiAoZXZlbnRfbmFtZSwgZSwgZGF0YSkge1xuXHRcdFx0XHRpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0ZGF0YSA9ICQudmFrYXRhLmRuZC5fZ2V0KCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YS5ldmVudCA9IGU7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLnRyaWdnZXJIYW5kbGVyKFwiZG5kX1wiICsgZXZlbnRfbmFtZSArIFwiLnZha2F0YVwiLCBkYXRhKTtcblx0XHRcdH0sXG5cdFx0XHRfZ2V0IDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFwiZGF0YVwiXHRcdDogdmFrYXRhX2RuZC5kYXRhLFxuXHRcdFx0XHRcdFwiZWxlbWVudFwiXHQ6IHZha2F0YV9kbmQuZWxlbWVudCxcblx0XHRcdFx0XHRcImhlbHBlclwiXHQ6IHZha2F0YV9kbmQuaGVscGVyXG5cdFx0XHRcdH07XG5cdFx0XHR9LFxuXHRcdFx0X2NsZWFuIDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRpZih2YWthdGFfZG5kLmhlbHBlcikgeyB2YWthdGFfZG5kLmhlbHBlci5yZW1vdmUoKTsgfVxuXHRcdFx0XHRpZih2YWthdGFfZG5kLnNjcm9sbF9pKSB7IGNsZWFySW50ZXJ2YWwodmFrYXRhX2RuZC5zY3JvbGxfaSk7IHZha2F0YV9kbmQuc2Nyb2xsX2kgPSBmYWxzZTsgfVxuXHRcdFx0XHR2YWthdGFfZG5kID0ge1xuXHRcdFx0XHRcdGVsZW1lbnRcdDogZmFsc2UsXG5cdFx0XHRcdFx0dGFyZ2V0XHQ6IGZhbHNlLFxuXHRcdFx0XHRcdGlzX2Rvd25cdDogZmFsc2UsXG5cdFx0XHRcdFx0aXNfZHJhZ1x0OiBmYWxzZSxcblx0XHRcdFx0XHRoZWxwZXJcdDogZmFsc2UsXG5cdFx0XHRcdFx0aGVscGVyX3c6IDAsXG5cdFx0XHRcdFx0ZGF0YVx0OiBmYWxzZSxcblx0XHRcdFx0XHRpbml0X3hcdDogMCxcblx0XHRcdFx0XHRpbml0X3lcdDogMCxcblx0XHRcdFx0XHRzY3JvbGxfbDogMCxcblx0XHRcdFx0XHRzY3JvbGxfdDogMCxcblx0XHRcdFx0XHRzY3JvbGxfZTogZmFsc2UsXG5cdFx0XHRcdFx0c2Nyb2xsX2k6IGZhbHNlLFxuXHRcdFx0XHRcdGlzX3RvdWNoOiBmYWxzZVxuXHRcdFx0XHR9O1xuXHRcdFx0XHRlbG0gPSBudWxsO1xuXHRcdFx0XHQkKGRvY3VtZW50KS5vZmYoXCJtb3VzZW1vdmUudmFrYXRhLmpzdHJlZSB0b3VjaG1vdmUudmFrYXRhLmpzdHJlZVwiLCAkLnZha2F0YS5kbmQuZHJhZyk7XG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9mZihcIm1vdXNldXAudmFrYXRhLmpzdHJlZSB0b3VjaGVuZC52YWthdGEuanN0cmVlXCIsICQudmFrYXRhLmRuZC5zdG9wKTtcblx0XHRcdH0sXG5cdFx0XHRfc2Nyb2xsIDogZnVuY3Rpb24gKGluaXRfb25seSkge1xuXHRcdFx0XHRpZighdmFrYXRhX2RuZC5zY3JvbGxfZSB8fCAoIXZha2F0YV9kbmQuc2Nyb2xsX2wgJiYgIXZha2F0YV9kbmQuc2Nyb2xsX3QpKSB7XG5cdFx0XHRcdFx0aWYodmFrYXRhX2RuZC5zY3JvbGxfaSkgeyBjbGVhckludGVydmFsKHZha2F0YV9kbmQuc2Nyb2xsX2kpOyB2YWthdGFfZG5kLnNjcm9sbF9pID0gZmFsc2U7IH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIXZha2F0YV9kbmQuc2Nyb2xsX2kpIHtcblx0XHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9pID0gc2V0SW50ZXJ2YWwoJC52YWthdGEuZG5kLl9zY3JvbGwsIDEwMCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKGluaXRfb25seSA9PT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRcdFx0XHR2YXIgaSA9IHZha2F0YV9kbmQuc2Nyb2xsX2Uuc2Nyb2xsVG9wKCksXG5cdFx0XHRcdFx0aiA9IHZha2F0YV9kbmQuc2Nyb2xsX2Uuc2Nyb2xsTGVmdCgpO1xuXHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9lLnNjcm9sbFRvcChpICsgdmFrYXRhX2RuZC5zY3JvbGxfdCAqICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfc3BlZWQpO1xuXHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9lLnNjcm9sbExlZnQoaiArIHZha2F0YV9kbmQuc2Nyb2xsX2wgKiAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3NwZWVkKTtcblx0XHRcdFx0aWYoaSAhPT0gdmFrYXRhX2RuZC5zY3JvbGxfZS5zY3JvbGxUb3AoKSB8fCBqICE9PSB2YWthdGFfZG5kLnNjcm9sbF9lLnNjcm9sbExlZnQoKSkge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiBhIGRyYWcgY2F1c2VzIGFuIGVsZW1lbnQgdG8gc2Nyb2xsXG5cdFx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdFx0ICogQHBsdWdpbiBkbmRcblx0XHRcdFx0XHQgKiBAbmFtZSBkbmRfc2Nyb2xsLnZha2F0YVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7TWl4ZWR9IGRhdGEgYW55IGRhdGEgc3VwcGxpZWQgd2l0aCB0aGUgY2FsbCB0byAkLnZha2F0YS5kbmQuc3RhcnRcblx0XHRcdFx0XHQgKiBAcGFyYW0ge0RPTX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBoZWxwZXIgdGhlIGhlbHBlciBzaG93biBuZXh0IHRvIHRoZSBtb3VzZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBldmVudCB0aGUgZWxlbWVudCB0aGF0IGlzIHNjcm9sbGluZ1xuXHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdCQudmFrYXRhLmRuZC5fdHJpZ2dlcihcInNjcm9sbFwiLCB2YWthdGFfZG5kLnNjcm9sbF9lKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHN0YXJ0IDogZnVuY3Rpb24gKGUsIGRhdGEsIGh0bWwpIHtcblx0XHRcdFx0aWYoZS50eXBlID09PSBcInRvdWNoc3RhcnRcIiAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSkge1xuXHRcdFx0XHRcdGUucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG5cdFx0XHRcdFx0ZS5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcblx0XHRcdFx0XHRlLnRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0LCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHZha2F0YV9kbmQuaXNfZHJhZykgeyAkLnZha2F0YS5kbmQuc3RvcCh7fSk7IH1cblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRlLmN1cnJlbnRUYXJnZXQudW5zZWxlY3RhYmxlID0gXCJvblwiO1xuXHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZTsgfTtcblx0XHRcdFx0XHRpZihlLmN1cnJlbnRUYXJnZXQuc3R5bGUpIHtcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5zdHlsZS50b3VjaEFjdGlvbiA9IFwibm9uZVwiO1xuXHRcdFx0XHRcdFx0ZS5jdXJyZW50VGFyZ2V0LnN0eWxlLm1zVG91Y2hBY3Rpb24gPSBcIm5vbmVcIjtcblx0XHRcdFx0XHRcdGUuY3VycmVudFRhcmdldC5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gXCJub25lXCI7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGNhdGNoKGlnbm9yZSkgeyB9XG5cdFx0XHRcdHZha2F0YV9kbmQuaW5pdF94XHQ9IGUucGFnZVg7XG5cdFx0XHRcdHZha2F0YV9kbmQuaW5pdF95XHQ9IGUucGFnZVk7XG5cdFx0XHRcdHZha2F0YV9kbmQuZGF0YVx0XHQ9IGRhdGE7XG5cdFx0XHRcdHZha2F0YV9kbmQuaXNfZG93blx0PSB0cnVlO1xuXHRcdFx0XHR2YWthdGFfZG5kLmVsZW1lbnRcdD0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdFx0XHR2YWthdGFfZG5kLnRhcmdldFx0PSBlLnRhcmdldDtcblx0XHRcdFx0dmFrYXRhX2RuZC5pc190b3VjaFx0PSBlLnR5cGUgPT09IFwidG91Y2hzdGFydFwiO1xuXHRcdFx0XHRpZihodG1sICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdHZha2F0YV9kbmQuaGVscGVyID0gJChcIjxkaXYgaWQ9J3Zha2F0YS1kbmQnPjwvZGl2PlwiKS5odG1sKGh0bWwpLmNzcyh7XG5cdFx0XHRcdFx0XHRcImRpc3BsYXlcIlx0XHQ6IFwiYmxvY2tcIixcblx0XHRcdFx0XHRcdFwibWFyZ2luXCJcdFx0OiBcIjBcIixcblx0XHRcdFx0XHRcdFwicGFkZGluZ1wiXHRcdDogXCIwXCIsXG5cdFx0XHRcdFx0XHRcInBvc2l0aW9uXCJcdFx0OiBcImFic29sdXRlXCIsXG5cdFx0XHRcdFx0XHRcInRvcFwiXHRcdFx0OiBcIi0yMDAwcHhcIixcblx0XHRcdFx0XHRcdFwibGluZUhlaWdodFwiXHQ6IFwiMTZweFwiLFxuXHRcdFx0XHRcdFx0XCJ6SW5kZXhcIlx0XHQ6IFwiMTAwMDBcIlxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoZG9jdW1lbnQpLm9uKFwibW91c2Vtb3ZlLnZha2F0YS5qc3RyZWUgdG91Y2htb3ZlLnZha2F0YS5qc3RyZWVcIiwgJC52YWthdGEuZG5kLmRyYWcpO1xuXHRcdFx0XHQkKGRvY3VtZW50KS5vbihcIm1vdXNldXAudmFrYXRhLmpzdHJlZSB0b3VjaGVuZC52YWthdGEuanN0cmVlXCIsICQudmFrYXRhLmRuZC5zdG9wKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdGRyYWcgOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZihlLnR5cGUgPT09IFwidG91Y2htb3ZlXCIgJiYgZS5vcmlnaW5hbEV2ZW50ICYmIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlcyAmJiBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0pIHtcblx0XHRcdFx0XHRlLnBhZ2VYID0gZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuXHRcdFx0XHRcdGUucGFnZVkgPSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XG5cdFx0XHRcdFx0ZS50YXJnZXQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCAtIHdpbmRvdy5wYWdlWE9mZnNldCwgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZighdmFrYXRhX2RuZC5pc19kb3duKSB7IHJldHVybjsgfVxuXHRcdFx0XHRpZighdmFrYXRhX2RuZC5pc19kcmFnKSB7XG5cdFx0XHRcdFx0aWYoXG5cdFx0XHRcdFx0XHRNYXRoLmFicyhlLnBhZ2VYIC0gdmFrYXRhX2RuZC5pbml0X3gpID4gKHZha2F0YV9kbmQuaXNfdG91Y2ggPyAkLnZha2F0YS5kbmQuc2V0dGluZ3MudGhyZXNob2xkX3RvdWNoIDogJC52YWthdGEuZG5kLnNldHRpbmdzLnRocmVzaG9sZCkgfHxcblx0XHRcdFx0XHRcdE1hdGguYWJzKGUucGFnZVkgLSB2YWthdGFfZG5kLmluaXRfeSkgPiAodmFrYXRhX2RuZC5pc190b3VjaCA/ICQudmFrYXRhLmRuZC5zZXR0aW5ncy50aHJlc2hvbGRfdG91Y2ggOiAkLnZha2F0YS5kbmQuc2V0dGluZ3MudGhyZXNob2xkKVxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0aWYodmFrYXRhX2RuZC5oZWxwZXIpIHtcblx0XHRcdFx0XHRcdFx0dmFrYXRhX2RuZC5oZWxwZXIuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XG5cdFx0XHRcdFx0XHRcdHZha2F0YV9kbmQuaGVscGVyX3cgPSB2YWthdGFfZG5kLmhlbHBlci5vdXRlcldpZHRoKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YWthdGFfZG5kLmlzX2RyYWcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JCh2YWthdGFfZG5kLnRhcmdldCkub25lKCdjbGljay52YWthdGEnLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiBhIGRyYWcgc3RhcnRzXG5cdFx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0XHRcdFx0XHQgKiBAbmFtZSBkbmRfc3RhcnQudmFrYXRhXG5cdFx0XHRcdFx0XHQgKiBAcGFyYW0ge01peGVkfSBkYXRhIGFueSBkYXRhIHN1cHBsaWVkIHdpdGggdGhlIGNhbGwgdG8gJC52YWthdGEuZG5kLnN0YXJ0XG5cdFx0XHRcdFx0XHQgKiBAcGFyYW0ge0RPTX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0XHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IGhlbHBlciB0aGUgaGVscGVyIHNob3duIG5leHQgdG8gdGhlIG1vdXNlXG5cdFx0XHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGV2ZW50IHRoYXQgY2F1c2VkIHRoZSBzdGFydCAocHJvYmFibHkgbW91c2Vtb3ZlKVxuXHRcdFx0XHRcdFx0ICovXG5cdFx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoXCJzdGFydFwiLCBlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7IHJldHVybjsgfVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGQgID0gZmFsc2UsIHcgID0gZmFsc2UsXG5cdFx0XHRcdFx0ZGggPSBmYWxzZSwgd2ggPSBmYWxzZSxcblx0XHRcdFx0XHRkdyA9IGZhbHNlLCB3dyA9IGZhbHNlLFxuXHRcdFx0XHRcdGR0ID0gZmFsc2UsIGRsID0gZmFsc2UsXG5cdFx0XHRcdFx0aHQgPSBmYWxzZSwgaGwgPSBmYWxzZTtcblxuXHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF90ID0gMDtcblx0XHRcdFx0dmFrYXRhX2RuZC5zY3JvbGxfbCA9IDA7XG5cdFx0XHRcdHZha2F0YV9kbmQuc2Nyb2xsX2UgPSBmYWxzZTtcblx0XHRcdFx0JCgkKGUudGFyZ2V0KS5wYXJlbnRzVW50aWwoXCJib2R5XCIpLmFkZEJhY2soKS5nZXQoKS5yZXZlcnNlKCkpXG5cdFx0XHRcdFx0LmZpbHRlcihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm5cdCgvXmF1dG98c2Nyb2xsJC8pLnRlc3QoJCh0aGlzKS5jc3MoXCJvdmVyZmxvd1wiKSkgJiZcblx0XHRcdFx0XHRcdFx0XHQodGhpcy5zY3JvbGxIZWlnaHQgPiB0aGlzLm9mZnNldEhlaWdodCB8fCB0aGlzLnNjcm9sbFdpZHRoID4gdGhpcy5vZmZzZXRXaWR0aCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR2YXIgdCA9ICQodGhpcyksIG8gPSB0Lm9mZnNldCgpO1xuXHRcdFx0XHRcdFx0aWYodGhpcy5zY3JvbGxIZWlnaHQgPiB0aGlzLm9mZnNldEhlaWdodCkge1xuXHRcdFx0XHRcdFx0XHRpZihvLnRvcCArIHQuaGVpZ2h0KCkgLSBlLnBhZ2VZIDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHR7IHZha2F0YV9kbmQuc2Nyb2xsX3QgPSAxOyB9XG5cdFx0XHRcdFx0XHRcdGlmKGUucGFnZVkgLSBvLnRvcCA8ICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfcHJveGltaXR5KVx0XHRcdFx0eyB2YWthdGFfZG5kLnNjcm9sbF90ID0gLTE7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRoaXMuc2Nyb2xsV2lkdGggPiB0aGlzLm9mZnNldFdpZHRoKSB7XG5cdFx0XHRcdFx0XHRcdGlmKG8ubGVmdCArIHQud2lkdGgoKSAtIGUucGFnZVggPCAkLnZha2F0YS5kbmQuc2V0dGluZ3Muc2Nyb2xsX3Byb3hpbWl0eSlcdHsgdmFrYXRhX2RuZC5zY3JvbGxfbCA9IDE7IH1cblx0XHRcdFx0XHRcdFx0aWYoZS5wYWdlWCAtIG8ubGVmdCA8ICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfcHJveGltaXR5KVx0XHRcdFx0eyB2YWthdGFfZG5kLnNjcm9sbF9sID0gLTE7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHZha2F0YV9kbmQuc2Nyb2xsX3QgfHwgdmFrYXRhX2RuZC5zY3JvbGxfbCkge1xuXHRcdFx0XHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9lID0gJCh0aGlzKTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKCF2YWthdGFfZG5kLnNjcm9sbF9lKSB7XG5cdFx0XHRcdFx0ZCAgPSAkKGRvY3VtZW50KTsgdyA9ICQod2luZG93KTtcblx0XHRcdFx0XHRkaCA9IGQuaGVpZ2h0KCk7IHdoID0gdy5oZWlnaHQoKTtcblx0XHRcdFx0XHRkdyA9IGQud2lkdGgoKTsgd3cgPSB3LndpZHRoKCk7XG5cdFx0XHRcdFx0ZHQgPSBkLnNjcm9sbFRvcCgpOyBkbCA9IGQuc2Nyb2xsTGVmdCgpO1xuXHRcdFx0XHRcdGlmKGRoID4gd2ggJiYgZS5wYWdlWSAtIGR0IDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHRcdHsgdmFrYXRhX2RuZC5zY3JvbGxfdCA9IC0xOyAgfVxuXHRcdFx0XHRcdGlmKGRoID4gd2ggJiYgd2ggLSAoZS5wYWdlWSAtIGR0KSA8ICQudmFrYXRhLmRuZC5zZXR0aW5ncy5zY3JvbGxfcHJveGltaXR5KVx0eyB2YWthdGFfZG5kLnNjcm9sbF90ID0gMTsgfVxuXHRcdFx0XHRcdGlmKGR3ID4gd3cgJiYgZS5wYWdlWCAtIGRsIDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHRcdHsgdmFrYXRhX2RuZC5zY3JvbGxfbCA9IC0xOyB9XG5cdFx0XHRcdFx0aWYoZHcgPiB3dyAmJiB3dyAtIChlLnBhZ2VYIC0gZGwpIDwgJC52YWthdGEuZG5kLnNldHRpbmdzLnNjcm9sbF9wcm94aW1pdHkpXHR7IHZha2F0YV9kbmQuc2Nyb2xsX2wgPSAxOyB9XG5cdFx0XHRcdFx0aWYodmFrYXRhX2RuZC5zY3JvbGxfdCB8fCB2YWthdGFfZG5kLnNjcm9sbF9sKSB7XG5cdFx0XHRcdFx0XHR2YWthdGFfZG5kLnNjcm9sbF9lID0gZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodmFrYXRhX2RuZC5zY3JvbGxfZSkgeyAkLnZha2F0YS5kbmQuX3Njcm9sbCh0cnVlKTsgfVxuXG5cdFx0XHRcdGlmKHZha2F0YV9kbmQuaGVscGVyKSB7XG5cdFx0XHRcdFx0aHQgPSBwYXJzZUludChlLnBhZ2VZICsgJC52YWthdGEuZG5kLnNldHRpbmdzLmhlbHBlcl90b3AsIDEwKTtcblx0XHRcdFx0XHRobCA9IHBhcnNlSW50KGUucGFnZVggKyAkLnZha2F0YS5kbmQuc2V0dGluZ3MuaGVscGVyX2xlZnQsIDEwKTtcblx0XHRcdFx0XHRpZihkaCAmJiBodCArIDI1ID4gZGgpIHsgaHQgPSBkaCAtIDUwOyB9XG5cdFx0XHRcdFx0aWYoZHcgJiYgaGwgKyB2YWthdGFfZG5kLmhlbHBlcl93ID4gZHcpIHsgaGwgPSBkdyAtICh2YWthdGFfZG5kLmhlbHBlcl93ICsgMik7IH1cblx0XHRcdFx0XHR2YWthdGFfZG5kLmhlbHBlci5jc3Moe1xuXHRcdFx0XHRcdFx0bGVmdFx0OiBobCArIFwicHhcIixcblx0XHRcdFx0XHRcdHRvcFx0XHQ6IGh0ICsgXCJweFwiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiBhIGRyYWcgaXMgaW4gcHJvZ3Jlc3Ncblx0XHRcdFx0ICogQGV2ZW50XG5cdFx0XHRcdCAqIEBwbHVnaW4gZG5kXG5cdFx0XHRcdCAqIEBuYW1lIGRuZF9tb3ZlLnZha2F0YVxuXHRcdFx0XHQgKiBAcGFyYW0ge01peGVkfSBkYXRhIGFueSBkYXRhIHN1cHBsaWVkIHdpdGggdGhlIGNhbGwgdG8gJC52YWthdGEuZG5kLnN0YXJ0XG5cdFx0XHRcdCAqIEBwYXJhbSB7RE9NfSBlbGVtZW50IHRoZSBET00gZWxlbWVudCBiZWluZyBkcmFnZ2VkXG5cdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBoZWxwZXIgdGhlIGhlbHBlciBzaG93biBuZXh0IHRvIHRoZSBtb3VzZVxuXHRcdFx0XHQgKiBAcGFyYW0ge09iamVjdH0gZXZlbnQgdGhlIGV2ZW50IHRoYXQgY2F1c2VkIHRoaXMgdG8gdHJpZ2dlciAobW9zdCBsaWtlbHkgbW91c2Vtb3ZlKVxuXHRcdFx0XHQgKi9cblx0XHRcdFx0JC52YWthdGEuZG5kLl90cmlnZ2VyKFwibW92ZVwiLCBlKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fSxcblx0XHRcdHN0b3AgOiBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZihlLnR5cGUgPT09IFwidG91Y2hlbmRcIiAmJiBlLm9yaWdpbmFsRXZlbnQgJiYgZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzICYmIGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXSkge1xuXHRcdFx0XHRcdGUucGFnZVggPSBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG5cdFx0XHRcdFx0ZS5wYWdlWSA9IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcblx0XHRcdFx0XHRlLnRhcmdldCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5vcmlnaW5hbEV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0LCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHZha2F0YV9kbmQuaXNfZHJhZykge1xuXHRcdFx0XHRcdC8qKlxuXHRcdFx0XHRcdCAqIHRyaWdnZXJlZCBvbiB0aGUgZG9jdW1lbnQgd2hlbiBhIGRyYWcgc3RvcHMgKHRoZSBkcmFnZ2VkIGVsZW1lbnQgaXMgZHJvcHBlZClcblx0XHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0XHQgKiBAcGx1Z2luIGRuZFxuXHRcdFx0XHRcdCAqIEBuYW1lIGRuZF9zdG9wLnZha2F0YVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7TWl4ZWR9IGRhdGEgYW55IGRhdGEgc3VwcGxpZWQgd2l0aCB0aGUgY2FsbCB0byAkLnZha2F0YS5kbmQuc3RhcnRcblx0XHRcdFx0XHQgKiBAcGFyYW0ge0RPTX0gZWxlbWVudCB0aGUgRE9NIGVsZW1lbnQgYmVpbmcgZHJhZ2dlZFxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7alF1ZXJ5fSBoZWxwZXIgdGhlIGhlbHBlciBzaG93biBuZXh0IHRvIHRoZSBtb3VzZVxuXHRcdFx0XHRcdCAqIEBwYXJhbSB7T2JqZWN0fSBldmVudCB0aGUgZXZlbnQgdGhhdCBjYXVzZWQgdGhlIHN0b3Bcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRpZiAoZS50YXJnZXQgIT09IHZha2F0YV9kbmQudGFyZ2V0KSB7XG5cdFx0XHRcdFx0XHQkKHZha2F0YV9kbmQudGFyZ2V0KS5vZmYoJ2NsaWNrLnZha2F0YScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQkLnZha2F0YS5kbmQuX3RyaWdnZXIoXCJzdG9wXCIsIGUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGlmKGUudHlwZSA9PT0gXCJ0b3VjaGVuZFwiICYmIGUudGFyZ2V0ID09PSB2YWthdGFfZG5kLnRhcmdldCkge1xuXHRcdFx0XHRcdFx0dmFyIHRvID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7ICQoZS50YXJnZXQpLnRyaWdnZXIoJ2NsaWNrJyk7IH0sIDEwMCk7XG5cdFx0XHRcdFx0XHQkKGUudGFyZ2V0KS5vbmUoJ2NsaWNrJywgZnVuY3Rpb24oKSB7IGlmKHRvKSB7IGNsZWFyVGltZW91dCh0byk7IH0gfSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdCQudmFrYXRhLmRuZC5fY2xlYW4oKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH07XG5cdH0oJCkpO1xuXG5cdC8vIGluY2x1ZGUgdGhlIGRuZCBwbHVnaW4gYnkgZGVmYXVsdFxuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJkbmRcIik7XG5cblxuLyoqXG4gKiAjIyMgTWFzc2xvYWQgcGx1Z2luXG4gKlxuICogQWRkcyBtYXNzbG9hZCBmdW5jdGlvbmFsaXR5IHRvIGpzVHJlZSwgc28gdGhhdCBtdWx0aXBsZSBub2RlcyBjYW4gYmUgbG9hZGVkIGluIGEgc2luZ2xlIHJlcXVlc3QgKG9ubHkgdXNlZnVsIHdpdGggbGF6eSBsb2FkaW5nKS5cbiAqL1xuXG5cdC8qKlxuXHQgKiBtYXNzbG9hZCBjb25maWd1cmF0aW9uXG5cdCAqXG5cdCAqIEl0IGlzIHBvc3NpYmxlIHRvIHNldCB0aGlzIHRvIGEgc3RhbmRhcmQgalF1ZXJ5LWxpa2UgQUpBWCBjb25maWcuXG5cdCAqIEluIGFkZGl0aW9uIHRvIHRoZSBzdGFuZGFyZCBqUXVlcnkgYWpheCBvcHRpb25zIGhlcmUgeW91IGNhbiBzdXBwbHkgZnVuY3Rpb25zIGZvciBgZGF0YWAgYW5kIGB1cmxgLCB0aGUgZnVuY3Rpb25zIHdpbGwgYmUgcnVuIGluIHRoZSBjdXJyZW50IGluc3RhbmNlJ3Mgc2NvcGUgYW5kIGEgcGFyYW0gd2lsbCBiZSBwYXNzZWQgaW5kaWNhdGluZyB3aGljaCBub2RlIElEcyBuZWVkIHRvIGJlIGxvYWRlZCwgdGhlIHJldHVybiB2YWx1ZSBvZiB0aG9zZSBmdW5jdGlvbnMgd2lsbCBiZSB1c2VkLlxuXHQgKlxuXHQgKiBZb3UgY2FuIGFsc28gc2V0IHRoaXMgdG8gYSBmdW5jdGlvbiwgdGhhdCBmdW5jdGlvbiB3aWxsIHJlY2VpdmUgdGhlIG5vZGUgSURzIGJlaW5nIGxvYWRlZCBhcyBhcmd1bWVudCBhbmQgYSBzZWNvbmQgcGFyYW0gd2hpY2ggaXMgYSBmdW5jdGlvbiAoY2FsbGJhY2spIHdoaWNoIHNob3VsZCBiZSBjYWxsZWQgd2l0aCB0aGUgcmVzdWx0LlxuXHQgKlxuXHQgKiBCb3RoIHRoZSBBSkFYIGFuZCB0aGUgZnVuY3Rpb24gYXBwcm9hY2ggcmVseSBvbiB0aGUgc2FtZSByZXR1cm4gdmFsdWUgLSBhbiBvYmplY3Qgd2hlcmUgdGhlIGtleXMgYXJlIHRoZSBub2RlIElEcywgYW5kIHRoZSB2YWx1ZSBpcyB0aGUgY2hpbGRyZW4gb2YgdGhhdCBub2RlIGFzIGFuIGFycmF5LlxuXHQgKlxuXHQgKlx0e1xuXHQgKlx0XHRcImlkMVwiIDogW3sgXCJ0ZXh0XCIgOiBcIkNoaWxkIG9mIElEMVwiLCBcImlkXCIgOiBcImMxXCIgfSwgeyBcInRleHRcIiA6IFwiQW5vdGhlciBjaGlsZCBvZiBJRDFcIiwgXCJpZFwiIDogXCJjMlwiIH1dLFxuXHQgKlx0XHRcImlkMlwiIDogW3sgXCJ0ZXh0XCIgOiBcIkNoaWxkIG9mIElEMlwiLCBcImlkXCIgOiBcImMzXCIgfV1cblx0ICpcdH1cblx0ICogXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLm1hc3Nsb2FkXG5cdCAqIEBwbHVnaW4gbWFzc2xvYWRcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLm1hc3Nsb2FkID0gbnVsbDtcblx0JC5qc3RyZWUucGx1Z2lucy5tYXNzbG9hZCA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmluaXQgPSBmdW5jdGlvbiAoZWwsIG9wdGlvbnMpIHtcblx0XHRcdHRoaXMuX2RhdGEubWFzc2xvYWQgPSB7fTtcblx0XHRcdHBhcmVudC5pbml0LmNhbGwodGhpcywgZWwsIG9wdGlvbnMpO1xuXHRcdH07XG5cdFx0dGhpcy5fbG9hZF9ub2RlcyA9IGZ1bmN0aW9uIChub2RlcywgY2FsbGJhY2ssIGlzX2NhbGxiYWNrLCBmb3JjZV9yZWxvYWQpIHtcblx0XHRcdHZhciBzID0gdGhpcy5zZXR0aW5ncy5tYXNzbG9hZCxcdFx0XHRcdFxuXHRcdFx0XHR0b0xvYWQgPSBbXSxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsXG5cdFx0XHRcdGksIGosIGRvbTtcblx0XHRcdGlmICghaXNfY2FsbGJhY2spIHtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gbm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0aWYoIW1bbm9kZXNbaV1dIHx8ICggKCFtW25vZGVzW2ldXS5zdGF0ZS5sb2FkZWQgJiYgIW1bbm9kZXNbaV1dLnN0YXRlLmZhaWxlZCkgfHwgZm9yY2VfcmVsb2FkKSApIHtcblx0XHRcdFx0XHRcdHRvTG9hZC5wdXNoKG5vZGVzW2ldKTtcblx0XHRcdFx0XHRcdGRvbSA9IHRoaXMuZ2V0X25vZGUobm9kZXNbaV0sIHRydWUpO1xuXHRcdFx0XHRcdFx0aWYgKGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGRvbS5hZGRDbGFzcyhcImpzdHJlZS1sb2FkaW5nXCIpLmF0dHIoJ2FyaWEtYnVzeScsdHJ1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2RhdGEubWFzc2xvYWQgPSB7fTtcblx0XHRcdFx0aWYgKHRvTG9hZC5sZW5ndGgpIHtcblx0XHRcdFx0XHRpZigkLnZha2F0YS5pc19mdW5jdGlvbihzKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHMuY2FsbCh0aGlzLCB0b0xvYWQsIGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpLCBqO1xuXHRcdFx0XHRcdFx0XHRpZihkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yKGkgaW4gZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZGF0YS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLm1hc3Nsb2FkW2ldID0gZGF0YVtpXTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gbm9kZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShub2Rlc1tpXSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGRvbSAmJiBkb20ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtbG9hZGluZ1wiKS5hdHRyKCdhcmlhLWJ1c3knLGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0cGFyZW50Ll9sb2FkX25vZGVzLmNhbGwodGhpcywgbm9kZXMsIGNhbGxiYWNrLCBpc19jYWxsYmFjaywgZm9yY2VfcmVsb2FkKTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmKHR5cGVvZiBzID09PSAnb2JqZWN0JyAmJiBzICYmIHMudXJsKSB7XG5cdFx0XHRcdFx0XHRzID0gJC5leHRlbmQodHJ1ZSwge30sIHMpO1xuXHRcdFx0XHRcdFx0aWYoJC52YWthdGEuaXNfZnVuY3Rpb24ocy51cmwpKSB7XG5cdFx0XHRcdFx0XHRcdHMudXJsID0gcy51cmwuY2FsbCh0aGlzLCB0b0xvYWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoJC52YWthdGEuaXNfZnVuY3Rpb24ocy5kYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRzLmRhdGEgPSBzLmRhdGEuY2FsbCh0aGlzLCB0b0xvYWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuICQuYWpheChzKVxuXHRcdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZGF0YSx0LHgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHZhciBpLCBqO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYoZGF0YSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSBpbiBkYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0aWYoZGF0YS5oYXNPd25Qcm9wZXJ0eShpKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5tYXNzbG9hZFtpXSA9IGRhdGFbaV07XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBub2Rlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShub2Rlc1tpXSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChkb20gJiYgZG9tLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRvbS5yZW1vdmVDbGFzcyhcImpzdHJlZS1sb2FkaW5nXCIpLmF0dHIoJ2FyaWEtYnVzeScsZmFsc2UpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRwYXJlbnQuX2xvYWRfbm9kZXMuY2FsbCh0aGlzLCBub2RlcywgY2FsbGJhY2ssIGlzX2NhbGxiYWNrLCBmb3JjZV9yZWxvYWQpO1xuXHRcdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0XHRcdFx0LmZhaWwoZnVuY3Rpb24gKGYpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHBhcmVudC5fbG9hZF9ub2Rlcy5jYWxsKHRoaXMsIG5vZGVzLCBjYWxsYmFjaywgaXNfY2FsbGJhY2ssIGZvcmNlX3JlbG9hZCk7XG5cdFx0XHRcdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXJlbnQuX2xvYWRfbm9kZXMuY2FsbCh0aGlzLCBub2RlcywgY2FsbGJhY2ssIGlzX2NhbGxiYWNrLCBmb3JjZV9yZWxvYWQpO1xuXHRcdH07XG5cdFx0dGhpcy5fbG9hZF9ub2RlID0gZnVuY3Rpb24gKG9iaiwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBkYXRhID0gdGhpcy5fZGF0YS5tYXNzbG9hZFtvYmouaWRdLFxuXHRcdFx0XHRyc2x0ID0gbnVsbCwgZG9tO1xuXHRcdFx0aWYoZGF0YSkge1xuXHRcdFx0XHRyc2x0ID0gdGhpc1t0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycgPyAnX2FwcGVuZF9odG1sX2RhdGEnIDogJ19hcHBlbmRfanNvbl9kYXRhJ10oXG5cdFx0XHRcdFx0b2JqLFxuXHRcdFx0XHRcdHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJyA/ICQoJC5wYXJzZUhUTUwoZGF0YSkpLmZpbHRlcihmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLm5vZGVUeXBlICE9PSAzOyB9KSA6IGRhdGEsXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKHN0YXR1cykgeyBjYWxsYmFjay5jYWxsKHRoaXMsIHN0YXR1cyk7IH1cblx0XHRcdFx0KTtcblx0XHRcdFx0ZG9tID0gdGhpcy5nZXRfbm9kZShvYmouaWQsIHRydWUpO1xuXHRcdFx0XHRpZiAoZG9tICYmIGRvbS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkb20ucmVtb3ZlQ2xhc3MoXCJqc3RyZWUtbG9hZGluZ1wiKS5hdHRyKCdhcmlhLWJ1c3knLGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgdGhpcy5fZGF0YS5tYXNzbG9hZFtvYmouaWRdO1xuXHRcdFx0XHRyZXR1cm4gcnNsdDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwYXJlbnQuX2xvYWRfbm9kZS5jYWxsKHRoaXMsIG9iaiwgY2FsbGJhY2spO1xuXHRcdH07XG5cdH07XG5cblxuLyoqXG4gKiAjIyMgU2VhcmNoIHBsdWdpblxuICpcbiAqIEFkZHMgc2VhcmNoIGZ1bmN0aW9uYWxpdHkgdG8ganNUcmVlLlxuICovXG5cblx0LyoqXG5cdCAqIHN0b3JlcyBhbGwgZGVmYXVsdHMgZm9yIHRoZSBzZWFyY2ggcGx1Z2luXG5cdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaFxuXHQgKiBAcGx1Z2luIHNlYXJjaFxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoID0ge1xuXHRcdC8qKlxuXHRcdCAqIGEgalF1ZXJ5LWxpa2UgQUpBWCBjb25maWcsIHdoaWNoIGpzdHJlZSB1c2VzIGlmIGEgc2VydmVyIHNob3VsZCBiZSBxdWVyaWVkIGZvciByZXN1bHRzLlxuXHRcdCAqXG5cdFx0ICogQSBgc3RyYCAod2hpY2ggaXMgdGhlIHNlYXJjaCBzdHJpbmcpIHBhcmFtZXRlciB3aWxsIGJlIGFkZGVkIHdpdGggdGhlIHJlcXVlc3QsIGFuIG9wdGlvbmFsIGBpbnNpZGVgIHBhcmFtZXRlciB3aWxsIGJlIGFkZGVkIGlmIHRoZSBzZWFyY2ggaXMgbGltaXRlZCB0byBhIG5vZGUgaWQuIFRoZSBleHBlY3RlZCByZXN1bHQgaXMgYSBKU09OIGFycmF5IHdpdGggbm9kZXMgdGhhdCBuZWVkIHRvIGJlIG9wZW5lZCBzbyB0aGF0IG1hdGNoaW5nIG5vZGVzIHdpbGwgYmUgcmV2ZWFsZWQuXG5cdFx0ICogTGVhdmUgdGhpcyBzZXR0aW5nIGFzIGBmYWxzZWAgdG8gbm90IHF1ZXJ5IHRoZSBzZXJ2ZXIuIFlvdSBjYW4gYWxzbyBzZXQgdGhpcyB0byBhIGZ1bmN0aW9uLCB3aGljaCB3aWxsIGJlIGludm9rZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgYW5kIHJlY2VpdmUgMyBwYXJhbWV0ZXJzIC0gdGhlIHNlYXJjaCBzdHJpbmcsIHRoZSBjYWxsYmFjayB0byBjYWxsIHdpdGggdGhlIGFycmF5IG9mIG5vZGVzIHRvIGxvYWQsIGFuZCB0aGUgb3B0aW9uYWwgbm9kZSBJRCB0byBsaW1pdCB0aGUgc2VhcmNoIHRvXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoLmFqYXhcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdGFqYXggOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgaWYgdGhlIHNlYXJjaCBzaG91bGQgYmUgZnV6enkgb3Igbm90IChzaG91bGQgYGNobmQzYCBtYXRjaCBgY2hpbGQgbm9kZSAzYCkuIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guZnV6enlcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdGZ1enp5IDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIHRoZSBzZWFyY2ggc2hvdWxkIGJlIGNhc2Ugc2Vuc2l0aXZlLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoLmNhc2Vfc2Vuc2l0aXZlXG5cdFx0ICogQHBsdWdpbiBzZWFyY2hcblx0XHQgKi9cblx0XHRjYXNlX3NlbnNpdGl2ZSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiB0aGUgdHJlZSBzaG91bGQgYmUgZmlsdGVyZWQgKGJ5IGRlZmF1bHQpIHRvIHNob3cgb25seSBtYXRjaGluZyBub2RlcyAoa2VlcCBpbiBtaW5kIHRoaXMgY2FuIGJlIGEgaGVhdnkgb24gbGFyZ2UgdHJlZXMgaW4gb2xkIGJyb3dzZXJzKS5cblx0XHQgKiBUaGlzIHNldHRpbmcgY2FuIGJlIGNoYW5nZWQgYXQgcnVudGltZSB3aGVuIGNhbGxpbmcgdGhlIHNlYXJjaCBtZXRob2QuIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guc2hvd19vbmx5X21hdGNoZXNcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdHNob3dfb25seV9tYXRjaGVzIDogZmFsc2UsXG5cdFx0LyoqXG5cdFx0ICogSW5kaWNhdGVzIGlmIHRoZSBjaGlsZHJlbiBvZiBtYXRjaGVkIGVsZW1lbnQgYXJlIHNob3duICh3aGVuIHNob3dfb25seV9tYXRjaGVzIGlzIHRydWUpXG5cdFx0ICogVGhpcyBzZXR0aW5nIGNhbiBiZSBjaGFuZ2VkIGF0IHJ1bnRpbWUgd2hlbiBjYWxsaW5nIHRoZSBzZWFyY2ggbWV0aG9kLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc2VhcmNoLnNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuXG5cdFx0ICogQHBsdWdpbiBzZWFyY2hcblx0XHQgKi9cblx0XHRzaG93X29ubHlfbWF0Y2hlc19jaGlsZHJlbiA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiBhbGwgbm9kZXMgb3BlbmVkIHRvIHJldmVhbCB0aGUgc2VhcmNoIHJlc3VsdCwgc2hvdWxkIGJlIGNsb3NlZCB3aGVuIHRoZSBzZWFyY2ggaXMgY2xlYXJlZCBvciBhIG5ldyBzZWFyY2ggaXMgcGVyZm9ybWVkLiBEZWZhdWx0IGlzIGB0cnVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zZWFyY2guY2xvc2Vfb3BlbmVkX29uY2xlYXJcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdGNsb3NlX29wZW5lZF9vbmNsZWFyIDogdHJ1ZSxcblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgaWYgb25seSBsZWFmIG5vZGVzIHNob3VsZCBiZSBpbmNsdWRlZCBpbiBzZWFyY2ggcmVzdWx0cy4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaC5zZWFyY2hfbGVhdmVzX29ubHlcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdHNlYXJjaF9sZWF2ZXNfb25seSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIElmIHNldCB0byBhIGZ1bmN0aW9uIGl0IHdpbCBiZSBjYWxsZWQgaW4gdGhlIGluc3RhbmNlJ3Mgc2NvcGUgd2l0aCB0d28gYXJndW1lbnRzIC0gc2VhcmNoIHN0cmluZyBhbmQgbm9kZSAod2hlcmUgbm9kZSB3aWxsIGJlIGV2ZXJ5IG5vZGUgaW4gdGhlIHN0cnVjdHVyZSwgc28gdXNlIHdpdGggY2F1dGlvbikuXG5cdFx0ICogSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYSB0cnV0aHkgdmFsdWUgdGhlIG5vZGUgd2lsbCBiZSBjb25zaWRlcmVkIGEgbWF0Y2ggKGl0IG1pZ2h0IG5vdCBiZSBkaXNwbGF5ZWQgaWYgc2VhcmNoX29ubHlfbGVhdmVzIGlzIHNldCB0byB0cnVlIGFuZCB0aGUgbm9kZSBpcyBub3QgYSBsZWFmKS4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnNlYXJjaC5zZWFyY2hfY2FsbGJhY2tcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqL1xuXHRcdHNlYXJjaF9jYWxsYmFjayA6IGZhbHNlXG5cdH07XG5cblx0JC5qc3RyZWUucGx1Z2lucy5zZWFyY2ggPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFyZW50LmJpbmQuY2FsbCh0aGlzKTtcblxuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guc3RyID0gXCJcIjtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLmRvbSA9ICQoKTtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnJlcyA9IFtdO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gub3BuID0gW107XG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5zb20gPSBmYWxzZTtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnNtYyA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guaGRuID0gW107XG5cblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJzZWFyY2guanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZih0aGlzLl9kYXRhLnNlYXJjaC5zb20gJiYgZGF0YS5yZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBtID0gdGhpcy5fbW9kZWwuZGF0YSwgaSwgaiwgcCA9IFtdLCBrLCBsO1xuXHRcdFx0XHRcdFx0XHRmb3IoaSA9IDAsIGogPSBkYXRhLnJlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0XHRpZihtW2RhdGEucmVzW2ldXSAmJiAhbVtkYXRhLnJlc1tpXV0uc3RhdGUuaGlkZGVuKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRwLnB1c2goZGF0YS5yZXNbaV0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0cCA9IHAuY29uY2F0KG1bZGF0YS5yZXNbaV1dLnBhcmVudHMpO1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5zZWFyY2guc21jKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvciAoayA9IDAsIGwgPSBtW2RhdGEucmVzW2ldXS5jaGlsZHJlbl9kLmxlbmd0aDsgayA8IGw7IGsrKykge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChtW21bZGF0YS5yZXNbaV1dLmNoaWxkcmVuX2Rba11dICYmICFtW21bZGF0YS5yZXNbaV1dLmNoaWxkcmVuX2Rba11dLnN0YXRlLmhpZGRlbikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cC5wdXNoKG1bZGF0YS5yZXNbaV1dLmNoaWxkcmVuX2Rba10pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwID0gJC52YWthdGEuYXJyYXlfcmVtb3ZlX2l0ZW0oJC52YWthdGEuYXJyYXlfdW5pcXVlKHApLCAkLmpzdHJlZS5yb290KTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guaGRuID0gdGhpcy5oaWRlX2FsbCh0cnVlKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5zaG93X25vZGUocCwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHRoaXMucmVkcmF3KHRydWUpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwiY2xlYXJfc2VhcmNoLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0aWYodGhpcy5fZGF0YS5zZWFyY2guc29tICYmIGRhdGEucmVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNob3dfbm9kZSh0aGlzLl9kYXRhLnNlYXJjaC5oZG4sIHRydWUpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLnJlZHJhdyh0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogdXNlZCB0byBzZWFyY2ggdGhlIHRyZWUgbm9kZXMgZm9yIGEgZ2l2ZW4gc3RyaW5nXG5cdFx0ICogQG5hbWUgc2VhcmNoKHN0ciBbLCBza2lwX2FzeW5jXSlcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyIHRoZSBzZWFyY2ggc3RyaW5nXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBza2lwX2FzeW5jIGlmIHNldCB0byB0cnVlIHNlcnZlciB3aWxsIG5vdCBiZSBxdWVyaWVkIGV2ZW4gaWYgY29uZmlndXJlZFxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvd19vbmx5X21hdGNoZXMgaWYgc2V0IHRvIHRydWUgb25seSBtYXRjaGluZyBub2RlcyB3aWxsIGJlIHNob3duIChrZWVwIGluIG1pbmQgdGhpcyBjYW4gYmUgdmVyeSBzbG93IG9uIGxhcmdlIHRyZWVzIG9yIG9sZCBicm93c2Vycylcblx0XHQgKiBAcGFyYW0ge21peGVkfSBpbnNpZGUgYW4gb3B0aW9uYWwgbm9kZSB0byB3aG9zZSBjaGlsZHJlbiB0byBsaW1pdCB0aGUgc2VhcmNoXG5cdFx0ICogQHBhcmFtIHtCb29sZWFufSBhcHBlbmQgaWYgc2V0IHRvIHRydWUgdGhlIHJlc3VsdHMgb2YgdGhpcyBzZWFyY2ggYXJlIGFwcGVuZGVkIHRvIHRoZSBwcmV2aW91cyBzZWFyY2hcblx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdCAqIEB0cmlnZ2VyIHNlYXJjaC5qc3RyZWVcblx0XHQgKi9cblx0XHR0aGlzLnNlYXJjaCA9IGZ1bmN0aW9uIChzdHIsIHNraXBfYXN5bmMsIHNob3dfb25seV9tYXRjaGVzLCBpbnNpZGUsIGFwcGVuZCwgc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW4pIHtcblx0XHRcdGlmKHN0ciA9PT0gZmFsc2UgfHwgJC52YWthdGEudHJpbShzdHIudG9TdHJpbmcoKSkgPT09IFwiXCIpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2xlYXJfc2VhcmNoKCk7XG5cdFx0XHR9XG5cdFx0XHRpbnNpZGUgPSB0aGlzLmdldF9ub2RlKGluc2lkZSk7XG5cdFx0XHRpbnNpZGUgPSBpbnNpZGUgJiYgaW5zaWRlLmlkID8gaW5zaWRlLmlkIDogbnVsbDtcblx0XHRcdHN0ciA9IHN0ci50b1N0cmluZygpO1xuXHRcdFx0dmFyIHMgPSB0aGlzLnNldHRpbmdzLnNlYXJjaCxcblx0XHRcdFx0YSA9IHMuYWpheCA/IHMuYWpheCA6IGZhbHNlLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0ZiA9IG51bGwsXG5cdFx0XHRcdHIgPSBbXSxcblx0XHRcdFx0cCA9IFtdLCBpLCBqO1xuXHRcdFx0aWYodGhpcy5fZGF0YS5zZWFyY2gucmVzLmxlbmd0aCAmJiAhYXBwZW5kKSB7XG5cdFx0XHRcdHRoaXMuY2xlYXJfc2VhcmNoKCk7XG5cdFx0XHR9XG5cdFx0XHRpZihzaG93X29ubHlfbWF0Y2hlcyA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHNob3dfb25seV9tYXRjaGVzID0gcy5zaG93X29ubHlfbWF0Y2hlcztcblx0XHRcdH1cblx0XHRcdGlmKHNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0c2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW4gPSBzLnNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXNraXBfYXN5bmMgJiYgYSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0aWYoJC52YWthdGEuaXNfZnVuY3Rpb24oYSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gYS5jYWxsKHRoaXMsIHN0ciwgZnVuY3Rpb24gKGQpIHtcblx0XHRcdFx0XHRcdFx0aWYoZCAmJiBkLmQpIHsgZCA9IGQuZDsgfVxuXHRcdFx0XHRcdFx0XHR0aGlzLl9sb2FkX25vZGVzKCEkLnZha2F0YS5pc19hcnJheShkKSA/IFtdIDogJC52YWthdGEuYXJyYXlfdW5pcXVlKGQpLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5zZWFyY2goc3RyLCB0cnVlLCBzaG93X29ubHlfbWF0Y2hlcywgaW5zaWRlLCBhcHBlbmQsIHNob3dfb25seV9tYXRjaGVzX2NoaWxkcmVuKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcyksIGluc2lkZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0YSA9ICQuZXh0ZW5kKHt9LCBhKTtcblx0XHRcdFx0XHRpZighYS5kYXRhKSB7IGEuZGF0YSA9IHt9OyB9XG5cdFx0XHRcdFx0YS5kYXRhLnN0ciA9IHN0cjtcblx0XHRcdFx0XHRpZihpbnNpZGUpIHtcblx0XHRcdFx0XHRcdGEuZGF0YS5pbnNpZGUgPSBpbnNpZGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh0aGlzLl9kYXRhLnNlYXJjaC5sYXN0UmVxdWVzdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gubGFzdFJlcXVlc3QuYWJvcnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gubGFzdFJlcXVlc3QgPSAkLmFqYXgoYSlcblx0XHRcdFx0XHRcdC5mYWlsKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnYWpheCcsICdwbHVnaW4nIDogJ3NlYXJjaCcsICdpZCcgOiAnc2VhcmNoXzAxJywgJ3JlYXNvbicgOiAnQ291bGQgbm90IGxvYWQgc2VhcmNoIHBhcmVudHMnLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeShhKSB9O1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmNvcmUuZXJyb3IuY2FsbCh0aGlzLCB0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvcik7XG5cdFx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdFx0XHQuZG9uZShmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdFx0XHRpZihkICYmIGQuZCkgeyBkID0gZC5kOyB9XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvYWRfbm9kZXMoISQudmFrYXRhLmlzX2FycmF5KGQpID8gW10gOiAkLnZha2F0YS5hcnJheV91bmlxdWUoZCksIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNlYXJjaChzdHIsIHRydWUsIHNob3dfb25seV9tYXRjaGVzLCBpbnNpZGUsIGFwcGVuZCwgc2hvd19vbmx5X21hdGNoZXNfY2hpbGRyZW4pO1xuXHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuX2RhdGEuc2VhcmNoLmxhc3RSZXF1ZXN0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZighYXBwZW5kKSB7XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnN0ciA9IHN0cjtcblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tID0gJCgpO1xuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5yZXMgPSBbXTtcblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gub3BuID0gW107XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnNvbSA9IHNob3dfb25seV9tYXRjaGVzO1xuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5zbWMgPSBzaG93X29ubHlfbWF0Y2hlc19jaGlsZHJlbjtcblx0XHRcdH1cblxuXHRcdFx0ZiA9IG5ldyAkLnZha2F0YS5zZWFyY2goc3RyLCB0cnVlLCB7IGNhc2VTZW5zaXRpdmUgOiBzLmNhc2Vfc2Vuc2l0aXZlLCBmdXp6eSA6IHMuZnV6enkgfSk7XG5cdFx0XHQkLmVhY2gobVtpbnNpZGUgPyBpbnNpZGUgOiAkLmpzdHJlZS5yb290XS5jaGlsZHJlbl9kLCBmdW5jdGlvbiAoaWksIGkpIHtcblx0XHRcdFx0dmFyIHYgPSBtW2ldO1xuXHRcdFx0XHRpZih2LnRleHQgJiYgIXYuc3RhdGUuaGlkZGVuICYmICghcy5zZWFyY2hfbGVhdmVzX29ubHkgfHwgKHYuc3RhdGUubG9hZGVkICYmIHYuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSkgJiYgKCAocy5zZWFyY2hfY2FsbGJhY2sgJiYgcy5zZWFyY2hfY2FsbGJhY2suY2FsbCh0aGlzLCBzdHIsIHYpKSB8fCAoIXMuc2VhcmNoX2NhbGxiYWNrICYmIGYuc2VhcmNoKHYudGV4dCkuaXNNYXRjaCkgKSApIHtcblx0XHRcdFx0XHRyLnB1c2goaSk7XG5cdFx0XHRcdFx0cCA9IHAuY29uY2F0KHYucGFyZW50cyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0aWYoci5sZW5ndGgpIHtcblx0XHRcdFx0cCA9ICQudmFrYXRhLmFycmF5X3VuaXF1ZShwKTtcblx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRpZihwW2ldICE9PSAkLmpzdHJlZS5yb290ICYmIG1bcFtpXV0gJiYgdGhpcy5vcGVuX25vZGUocFtpXSwgbnVsbCwgMCkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLm9wbi5wdXNoKHBbaV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZighYXBwZW5kKSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tID0gJCh0aGlzLmVsZW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnIycgKyAkLm1hcChyLCBmdW5jdGlvbiAodikgeyByZXR1cm4gXCIwMTIzNDU2Nzg5XCIuaW5kZXhPZih2WzBdKSAhPT0gLTEgPyAnXFxcXDMnICsgdlswXSArICcgJyArIHYuc3Vic3RyKDEpLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykgOiB2LnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyk7IH0pLmpvaW4oJywgIycpKSk7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2gucmVzID0gcjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20gPSB0aGlzLl9kYXRhLnNlYXJjaC5kb20uYWRkKCQodGhpcy5lbGVtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJyMnICsgJC5tYXAociwgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFwiMDEyMzQ1Njc4OVwiLmluZGV4T2YodlswXSkgIT09IC0xID8gJ1xcXFwzJyArIHZbMF0gKyAnICcgKyB2LnN1YnN0cigxKS5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpIDogdi5yZXBsYWNlKCQuanN0cmVlLmlkcmVnZXgsJ1xcXFwkJicpOyB9KS5qb2luKCcsICMnKSkpKTtcblx0XHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5yZXMgPSAkLnZha2F0YS5hcnJheV91bmlxdWUodGhpcy5fZGF0YS5zZWFyY2gucmVzLmNvbmNhdChyKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuYWRkQ2xhc3MoJ2pzdHJlZS1zZWFyY2gnKTtcblx0XHRcdH1cblx0XHRcdC8qKlxuXHRcdFx0ICogdHJpZ2dlcmVkIGFmdGVyIHNlYXJjaCBpcyBjb21wbGV0ZVxuXHRcdFx0ICogQGV2ZW50XG5cdFx0XHQgKiBAbmFtZSBzZWFyY2guanN0cmVlXG5cdFx0XHQgKiBAcGFyYW0ge2pRdWVyeX0gbm9kZXMgYSBqUXVlcnkgY29sbGVjdGlvbiBvZiBtYXRjaGluZyBub2Rlc1xuXHRcdFx0ICogQHBhcmFtIHtTdHJpbmd9IHN0ciB0aGUgc2VhcmNoIHN0cmluZ1xuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcmVzIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIHJlcHJlc2VpbmcgdGhlIG1hdGNoaW5nIG5vZGVzXG5cdFx0XHQgKiBAcGx1Z2luIHNlYXJjaFxuXHRcdFx0ICovXG5cdFx0XHR0aGlzLnRyaWdnZXIoJ3NlYXJjaCcsIHsgbm9kZXMgOiB0aGlzLl9kYXRhLnNlYXJjaC5kb20sIHN0ciA6IHN0ciwgcmVzIDogdGhpcy5fZGF0YS5zZWFyY2gucmVzLCBzaG93X29ubHlfbWF0Y2hlcyA6IHNob3dfb25seV9tYXRjaGVzIH0pO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogdXNlZCB0byBjbGVhciB0aGUgbGFzdCBzZWFyY2ggKHJlbW92ZXMgY2xhc3NlcyBhbmQgc2hvd3MgYWxsIG5vZGVzIGlmIGZpbHRlcmluZyBpcyBvbilcblx0XHQgKiBAbmFtZSBjbGVhcl9zZWFyY2goKVxuXHRcdCAqIEBwbHVnaW4gc2VhcmNoXG5cdFx0ICogQHRyaWdnZXIgY2xlYXJfc2VhcmNoLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHRoaXMuY2xlYXJfc2VhcmNoID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy5zZWFyY2guY2xvc2Vfb3BlbmVkX29uY2xlYXIpIHtcblx0XHRcdFx0dGhpcy5jbG9zZV9ub2RlKHRoaXMuX2RhdGEuc2VhcmNoLm9wbiwgMCk7XG5cdFx0XHR9XG5cdFx0XHQvKipcblx0XHRcdCAqIHRyaWdnZXJlZCBhZnRlciBzZWFyY2ggaXMgY29tcGxldGVcblx0XHRcdCAqIEBldmVudFxuXHRcdFx0ICogQG5hbWUgY2xlYXJfc2VhcmNoLmpzdHJlZVxuXHRcdFx0ICogQHBhcmFtIHtqUXVlcnl9IG5vZGVzIGEgalF1ZXJ5IGNvbGxlY3Rpb24gb2YgbWF0Y2hpbmcgbm9kZXMgKHRoZSByZXN1bHQgZnJvbSB0aGUgbGFzdCBzZWFyY2gpXG5cdFx0XHQgKiBAcGFyYW0ge1N0cmluZ30gc3RyIHRoZSBzZWFyY2ggc3RyaW5nICh0aGUgbGFzdCBzZWFyY2ggc3RyaW5nKVxuXHRcdFx0ICogQHBhcmFtIHtBcnJheX0gcmVzIGEgY29sbGVjdGlvbiBvZiBvYmplY3RzIHJlcHJlc2VpbmcgdGhlIG1hdGNoaW5nIG5vZGVzICh0aGUgcmVzdWx0IGZyb20gdGhlIGxhc3Qgc2VhcmNoKVxuXHRcdFx0ICogQHBsdWdpbiBzZWFyY2hcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdjbGVhcl9zZWFyY2gnLCB7ICdub2RlcycgOiB0aGlzLl9kYXRhLnNlYXJjaC5kb20sIHN0ciA6IHRoaXMuX2RhdGEuc2VhcmNoLnN0ciwgcmVzIDogdGhpcy5fZGF0YS5zZWFyY2gucmVzIH0pO1xuXHRcdFx0aWYodGhpcy5fZGF0YS5zZWFyY2gucmVzLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5kb20gPSAkKHRoaXMuZWxlbWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcjJyArICQubWFwKHRoaXMuX2RhdGEuc2VhcmNoLnJlcywgZnVuY3Rpb24gKHYpIHtcblx0XHRcdFx0XHRyZXR1cm4gXCIwMTIzNDU2Nzg5XCIuaW5kZXhPZih2WzBdKSAhPT0gLTEgPyAnXFxcXDMnICsgdlswXSArICcgJyArIHYuc3Vic3RyKDEpLnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJykgOiB2LnJlcGxhY2UoJC5qc3RyZWUuaWRyZWdleCwnXFxcXCQmJyk7XG5cdFx0XHRcdH0pLmpvaW4oJywgIycpKSk7XG5cdFx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLmRvbS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLnJlbW92ZUNsYXNzKFwianN0cmVlLXNlYXJjaFwiKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLnN0ciA9IFwiXCI7XG5cdFx0XHR0aGlzLl9kYXRhLnNlYXJjaC5yZXMgPSBbXTtcblx0XHRcdHRoaXMuX2RhdGEuc2VhcmNoLm9wbiA9IFtdO1xuXHRcdFx0dGhpcy5fZGF0YS5zZWFyY2guZG9tID0gJCgpO1xuXHRcdH07XG5cblx0XHR0aGlzLnJlZHJhd19ub2RlID0gZnVuY3Rpb24ob2JqLCBkZWVwLCBjYWxsYmFjaywgZm9yY2VfcmVuZGVyKSB7XG5cdFx0XHRvYmogPSBwYXJlbnQucmVkcmF3X25vZGUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdGlmKG9iaikge1xuXHRcdFx0XHRpZigkLmluQXJyYXkob2JqLmlkLCB0aGlzLl9kYXRhLnNlYXJjaC5yZXMpICE9PSAtMSkge1xuXHRcdFx0XHRcdHZhciBpLCBqLCB0bXAgPSBudWxsO1xuXHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZE5vZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0aWYob2JqLmNoaWxkTm9kZXNbaV0gJiYgb2JqLmNoaWxkTm9kZXNbaV0uY2xhc3NOYW1lICYmIG9iai5jaGlsZE5vZGVzW2ldLmNsYXNzTmFtZS5pbmRleE9mKFwianN0cmVlLWFuY2hvclwiKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0dG1wID0gb2JqLmNoaWxkTm9kZXNbaV07XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZih0bXApIHtcblx0XHRcdFx0XHRcdHRtcC5jbGFzc05hbWUgKz0gJyBqc3RyZWUtc2VhcmNoJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fTtcblx0fTtcblxuXHQvLyBoZWxwZXJzXG5cdChmdW5jdGlvbiAoJCkge1xuXHRcdC8vIGZyb20gaHR0cDovL2tpcm8ubWUvcHJvamVjdHMvZnVzZS5odG1sXG5cdFx0JC52YWthdGEuc2VhcmNoID0gZnVuY3Rpb24ocGF0dGVybiwgdHh0LCBvcHRpb25zKSB7XG5cdFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0XHRcdG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgJC52YWthdGEuc2VhcmNoLmRlZmF1bHRzLCBvcHRpb25zKTtcblx0XHRcdGlmKG9wdGlvbnMuZnV6enkgIT09IGZhbHNlKSB7XG5cdFx0XHRcdG9wdGlvbnMuZnV6enkgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cGF0dGVybiA9IG9wdGlvbnMuY2FzZVNlbnNpdGl2ZSA/IHBhdHRlcm4gOiBwYXR0ZXJuLnRvTG93ZXJDYXNlKCk7XG5cdFx0XHR2YXIgTUFUQ0hfTE9DQVRJT05cdD0gb3B0aW9ucy5sb2NhdGlvbixcblx0XHRcdFx0TUFUQ0hfRElTVEFOQ0VcdD0gb3B0aW9ucy5kaXN0YW5jZSxcblx0XHRcdFx0TUFUQ0hfVEhSRVNIT0xEXHQ9IG9wdGlvbnMudGhyZXNob2xkLFxuXHRcdFx0XHRwYXR0ZXJuTGVuID0gcGF0dGVybi5sZW5ndGgsXG5cdFx0XHRcdG1hdGNobWFzaywgcGF0dGVybl9hbHBoYWJldCwgbWF0Y2hfYml0YXBTY29yZSwgc2VhcmNoO1xuXHRcdFx0aWYocGF0dGVybkxlbiA+IDMyKSB7XG5cdFx0XHRcdG9wdGlvbnMuZnV6enkgPSBmYWxzZTtcblx0XHRcdH1cblx0XHRcdGlmKG9wdGlvbnMuZnV6enkpIHtcblx0XHRcdFx0bWF0Y2htYXNrID0gMSA8PCAocGF0dGVybkxlbiAtIDEpO1xuXHRcdFx0XHRwYXR0ZXJuX2FscGhhYmV0ID0gKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgbWFzayA9IHt9LFxuXHRcdFx0XHRcdFx0aSA9IDA7XG5cdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdHRlcm5MZW47IGkrKykge1xuXHRcdFx0XHRcdFx0bWFza1twYXR0ZXJuLmNoYXJBdChpKV0gPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgcGF0dGVybkxlbjsgaSsrKSB7XG5cdFx0XHRcdFx0XHRtYXNrW3BhdHRlcm4uY2hhckF0KGkpXSB8PSAxIDw8IChwYXR0ZXJuTGVuIC0gaSAtIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gbWFzaztcblx0XHRcdFx0fSgpKTtcblx0XHRcdFx0bWF0Y2hfYml0YXBTY29yZSA9IGZ1bmN0aW9uIChlLCB4KSB7XG5cdFx0XHRcdFx0dmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm5MZW4sXG5cdFx0XHRcdFx0XHRwcm94aW1pdHkgPSBNYXRoLmFicyhNQVRDSF9MT0NBVElPTiAtIHgpO1xuXHRcdFx0XHRcdGlmKCFNQVRDSF9ESVNUQU5DRSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb3hpbWl0eSA/IDEuMCA6IGFjY3VyYWN5O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYWNjdXJhY3kgKyAocHJveGltaXR5IC8gTUFUQ0hfRElTVEFOQ0UpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0c2VhcmNoID0gZnVuY3Rpb24gKHRleHQpIHtcblx0XHRcdFx0dGV4dCA9IG9wdGlvbnMuY2FzZVNlbnNpdGl2ZSA/IHRleHQgOiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdGlmKHBhdHRlcm4gPT09IHRleHQgfHwgdGV4dC5pbmRleE9mKHBhdHRlcm4pICE9PSAtMSkge1xuXHRcdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0XHRpc01hdGNoOiB0cnVlLFxuXHRcdFx0XHRcdFx0c2NvcmU6IDBcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKCFvcHRpb25zLmZ1enp5KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdGlzTWF0Y2g6IGZhbHNlLFxuXHRcdFx0XHRcdFx0c2NvcmU6IDFcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHZhciBpLCBqLFxuXHRcdFx0XHRcdHRleHRMZW4gPSB0ZXh0Lmxlbmd0aCxcblx0XHRcdFx0XHRzY29yZVRocmVzaG9sZCA9IE1BVENIX1RIUkVTSE9MRCxcblx0XHRcdFx0XHRiZXN0TG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIE1BVENIX0xPQ0FUSU9OKSxcblx0XHRcdFx0XHRiaW5NaW4sIGJpbk1pZCxcblx0XHRcdFx0XHRiaW5NYXggPSBwYXR0ZXJuTGVuICsgdGV4dExlbixcblx0XHRcdFx0XHRsYXN0UmQsIHN0YXJ0LCBmaW5pc2gsIHJkLCBjaGFyTWF0Y2gsXG5cdFx0XHRcdFx0c2NvcmUgPSAxLFxuXHRcdFx0XHRcdGxvY2F0aW9ucyA9IFtdO1xuXHRcdFx0XHRpZiAoYmVzdExvYyAhPT0gLTEpIHtcblx0XHRcdFx0XHRzY29yZVRocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmUoMCwgYmVzdExvYyksIHNjb3JlVGhyZXNob2xkKTtcblx0XHRcdFx0XHRiZXN0TG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBNQVRDSF9MT0NBVElPTiArIHBhdHRlcm5MZW4pO1xuXHRcdFx0XHRcdGlmIChiZXN0TG9jICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0c2NvcmVUaHJlc2hvbGQgPSBNYXRoLm1pbihtYXRjaF9iaXRhcFNjb3JlKDAsIGJlc3RMb2MpLCBzY29yZVRocmVzaG9sZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGJlc3RMb2MgPSAtMTtcblx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IHBhdHRlcm5MZW47IGkrKykge1xuXHRcdFx0XHRcdGJpbk1pbiA9IDA7XG5cdFx0XHRcdFx0YmluTWlkID0gYmluTWF4O1xuXHRcdFx0XHRcdHdoaWxlIChiaW5NaW4gPCBiaW5NaWQpIHtcblx0XHRcdFx0XHRcdGlmIChtYXRjaF9iaXRhcFNjb3JlKGksIE1BVENIX0xPQ0FUSU9OICsgYmluTWlkKSA8PSBzY29yZVRocmVzaG9sZCkge1xuXHRcdFx0XHRcdFx0XHRiaW5NaW4gPSBiaW5NaWQ7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRiaW5NYXggPSBiaW5NaWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRiaW5NaWQgPSBNYXRoLmZsb29yKChiaW5NYXggLSBiaW5NaW4pIC8gMiArIGJpbk1pbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJpbk1heCA9IGJpbk1pZDtcblx0XHRcdFx0XHRzdGFydCA9IE1hdGgubWF4KDEsIE1BVENIX0xPQ0FUSU9OIC0gYmluTWlkICsgMSk7XG5cdFx0XHRcdFx0ZmluaXNoID0gTWF0aC5taW4oTUFUQ0hfTE9DQVRJT04gKyBiaW5NaWQsIHRleHRMZW4pICsgcGF0dGVybkxlbjtcblx0XHRcdFx0XHRyZCA9IG5ldyBBcnJheShmaW5pc2ggKyAyKTtcblx0XHRcdFx0XHRyZFtmaW5pc2ggKyAxXSA9ICgxIDw8IGkpIC0gMTtcblx0XHRcdFx0XHRmb3IgKGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuXHRcdFx0XHRcdFx0Y2hhck1hdGNoID0gcGF0dGVybl9hbHBoYWJldFt0ZXh0LmNoYXJBdChqIC0gMSldO1xuXHRcdFx0XHRcdFx0aWYgKGkgPT09IDApIHtcblx0XHRcdFx0XHRcdFx0cmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoIHwgKCgobGFzdFJkW2ogKyAxXSB8IGxhc3RSZFtqXSkgPDwgMSkgfCAxKSB8IGxhc3RSZFtqICsgMV07XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAocmRbal0gJiBtYXRjaG1hc2spIHtcblx0XHRcdFx0XHRcdFx0c2NvcmUgPSBtYXRjaF9iaXRhcFNjb3JlKGksIGogLSAxKTtcblx0XHRcdFx0XHRcdFx0aWYgKHNjb3JlIDw9IHNjb3JlVGhyZXNob2xkKSB7XG5cdFx0XHRcdFx0XHRcdFx0c2NvcmVUaHJlc2hvbGQgPSBzY29yZTtcblx0XHRcdFx0XHRcdFx0XHRiZXN0TG9jID0gaiAtIDE7XG5cdFx0XHRcdFx0XHRcdFx0bG9jYXRpb25zLnB1c2goYmVzdExvYyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGJlc3RMb2MgPiBNQVRDSF9MT0NBVElPTikge1xuXHRcdFx0XHRcdFx0XHRcdFx0c3RhcnQgPSBNYXRoLm1heCgxLCAyICogTUFUQ0hfTE9DQVRJT04gLSBiZXN0TG9jKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChtYXRjaF9iaXRhcFNjb3JlKGkgKyAxLCBNQVRDSF9MT0NBVElPTikgPiBzY29yZVRocmVzaG9sZCkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxhc3RSZCA9IHJkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0aXNNYXRjaDogYmVzdExvYyA+PSAwLFxuXHRcdFx0XHRcdHNjb3JlOiBzY29yZVxuXHRcdFx0XHR9O1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB0eHQgPT09IHRydWUgPyB7ICdzZWFyY2gnIDogc2VhcmNoIH0gOiBzZWFyY2godHh0KTtcblx0XHR9O1xuXHRcdCQudmFrYXRhLnNlYXJjaC5kZWZhdWx0cyA9IHtcblx0XHRcdGxvY2F0aW9uIDogMCxcblx0XHRcdGRpc3RhbmNlIDogMTAwLFxuXHRcdFx0dGhyZXNob2xkIDogMC42LFxuXHRcdFx0ZnV6enkgOiBmYWxzZSxcblx0XHRcdGNhc2VTZW5zaXRpdmUgOiBmYWxzZVxuXHRcdH07XG5cdH0oJCkpO1xuXG5cdC8vIGluY2x1ZGUgdGhlIHNlYXJjaCBwbHVnaW4gYnkgZGVmYXVsdFxuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJzZWFyY2hcIik7XG5cblxuLyoqXG4gKiAjIyMgU29ydCBwbHVnaW5cbiAqXG4gKiBBdXRvbWF0aWNhbGx5IHNvcnRzIGFsbCBzaWJsaW5ncyBpbiB0aGUgdHJlZSBhY2NvcmRpbmcgdG8gYSBzb3J0aW5nIGZ1bmN0aW9uLlxuICovXG5cblx0LyoqXG5cdCAqIHRoZSBzZXR0aW5ncyBmdW5jdGlvbiB1c2VkIHRvIHNvcnQgdGhlIG5vZGVzLlxuXHQgKiBJdCBpcyBleGVjdXRlZCBpbiB0aGUgdHJlZSdzIGNvbnRleHQsIGFjY2VwdHMgdHdvIG5vZGVzIGFzIGFyZ3VtZW50cyBhbmQgc2hvdWxkIHJldHVybiBgMWAgb3IgYC0xYC5cblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc29ydFxuXHQgKiBAcGx1Z2luIHNvcnRcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLnNvcnQgPSBmdW5jdGlvbiAoYSwgYikge1xuXHRcdC8vcmV0dXJuIHRoaXMuZ2V0X3R5cGUoYSkgPT09IHRoaXMuZ2V0X3R5cGUoYikgPyAodGhpcy5nZXRfdGV4dChhKSA+IHRoaXMuZ2V0X3RleHQoYikgPyAxIDogLTEpIDogdGhpcy5nZXRfdHlwZShhKSA+PSB0aGlzLmdldF90eXBlKGIpO1xuXHRcdHJldHVybiB0aGlzLmdldF90ZXh0KGEpID4gdGhpcy5nZXRfdGV4dChiKSA/IDEgOiAtMTtcblx0fTtcblx0JC5qc3RyZWUucGx1Z2lucy5zb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuYmluZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHBhcmVudC5iaW5kLmNhbGwodGhpcyk7XG5cdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0Lm9uKFwibW9kZWwuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnNvcnQoZGF0YS5wYXJlbnQsIHRydWUpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwicmVuYW1lX25vZGUuanN0cmVlIGNyZWF0ZV9ub2RlLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dGhpcy5zb3J0KGRhdGEucGFyZW50IHx8IGRhdGEubm9kZS5wYXJlbnQsIGZhbHNlKTtcblx0XHRcdFx0XHRcdHRoaXMucmVkcmF3X25vZGUoZGF0YS5wYXJlbnQgfHwgZGF0YS5ub2RlLnBhcmVudCwgdHJ1ZSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJtb3ZlX25vZGUuanN0cmVlIGNvcHlfbm9kZS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdHRoaXMuc29ydChkYXRhLnBhcmVudCwgZmFsc2UpO1xuXHRcdFx0XHRcdFx0dGhpcy5yZWRyYXdfbm9kZShkYXRhLnBhcmVudCwgdHJ1ZSk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIHVzZWQgdG8gc29ydCBhIG5vZGUncyBjaGlsZHJlblxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQG5hbWUgc29ydChvYmogWywgZGVlcF0pXG5cdFx0ICogQHBhcmFtICB7bWl4ZWR9IG9iaiB0aGUgbm9kZVxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gZGVlcCBpZiBzZXQgdG8gYHRydWVgIG5vZGVzIGFyZSBzb3J0ZWQgcmVjdXJzaXZlbHkuXG5cdFx0ICogQHBsdWdpbiBzb3J0XG5cdFx0ICogQHRyaWdnZXIgc2VhcmNoLmpzdHJlZVxuXHRcdCAqL1xuXHRcdHRoaXMuc29ydCA9IGZ1bmN0aW9uIChvYmosIGRlZXApIHtcblx0XHRcdHZhciBpLCBqO1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYob2JqICYmIG9iai5jaGlsZHJlbiAmJiBvYmouY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdG9iai5jaGlsZHJlbi5zb3J0KHRoaXMuc2V0dGluZ3Muc29ydC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0aWYoZGVlcCkge1xuXHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0dGhpcy5zb3J0KG9iai5jaGlsZHJlbl9kW2ldLCBmYWxzZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblxuXHQvLyBpbmNsdWRlIHRoZSBzb3J0IHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcInNvcnRcIik7XG5cbi8qKlxuICogIyMjIFN0YXRlIHBsdWdpblxuICpcbiAqIFNhdmVzIHRoZSBzdGF0ZSBvZiB0aGUgdHJlZSAoc2VsZWN0ZWQgbm9kZXMsIG9wZW5lZCBub2Rlcykgb24gdGhlIHVzZXIncyBjb21wdXRlciB1c2luZyBhdmFpbGFibGUgb3B0aW9ucyAobG9jYWxTdG9yYWdlLCBjb29raWVzLCBldGMpXG4gKi9cblxuXHR2YXIgdG8gPSBmYWxzZTtcblx0LyoqXG5cdCAqIHN0b3JlcyBhbGwgZGVmYXVsdHMgZm9yIHRoZSBzdGF0ZSBwbHVnaW5cblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc3RhdGVcblx0ICogQHBsdWdpbiBzdGF0ZVxuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMuc3RhdGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgZm9yIHRoZSBrZXkgdG8gdXNlIHdoZW4gc2F2aW5nIHRoZSBjdXJyZW50IHRyZWUgKGNoYW5nZSBpZiB1c2luZyBtdWx0aXBsZSB0cmVlcyBpbiB5b3VyIHByb2plY3QpLiBEZWZhdWx0cyB0byBganN0cmVlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZS5rZXlcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0a2V5XHRcdDogJ2pzdHJlZScsXG5cdFx0LyoqXG5cdFx0ICogQSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZiBldmVudHMgdGhhdCB0cmlnZ2VyIGEgc3RhdGUgc2F2ZS4gRGVmYXVsdHMgdG8gYGNoYW5nZWQuanN0cmVlIG9wZW5fbm9kZS5qc3RyZWUgY2xvc2Vfbm9kZS5qc3RyZWVgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnN0YXRlLmV2ZW50c1xuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHRldmVudHNcdDogJ2NoYW5nZWQuanN0cmVlIG9wZW5fbm9kZS5qc3RyZWUgY2xvc2Vfbm9kZS5qc3RyZWUgY2hlY2tfbm9kZS5qc3RyZWUgdW5jaGVja19ub2RlLmpzdHJlZScsXG5cdFx0LyoqXG5cdFx0ICogVGltZSBpbiBtaWxsaXNlY29uZHMgYWZ0ZXIgd2hpY2ggdGhlIHN0YXRlIHdpbGwgZXhwaXJlLiBEZWZhdWx0cyB0byAnZmFsc2UnIG1lYW5pbmcgLSBubyBleHBpcmUuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc3RhdGUudHRsXG5cdFx0ICogQHBsdWdpbiBzdGF0ZVxuXHRcdCAqL1xuXHRcdHR0bFx0XHQ6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHByaW9yIHRvIHJlc3RvcmluZyBzdGF0ZSB3aXRoIG9uZSBhcmd1bWVudCAtIHRoZSBzdGF0ZSBvYmplY3QuIENhbiBiZSB1c2VkIHRvIGNsZWFyIHVud2FudGVkIHBhcnRzIG9mIHRoZSBzdGF0ZS5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy5zdGF0ZS5maWx0ZXJcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0ZmlsdGVyXHQ6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIFNob3VsZCBsb2FkZWQgbm9kZXMgYmUgcmVzdG9yZWQgKHNldHRpbmcgdGhpcyB0byB0cnVlIG1lYW5zIHRoYXQgaXQgaXMgcG9zc2libGUgdGhhdCB0aGUgd2hvbGUgdHJlZSB3aWxsIGJlIGxvYWRlZCBmb3Igc29tZSB1c2VycyAtIHVzZSB3aXRoIGNhdXRpb24pLiBEZWZhdWx0cyB0byBgZmFsc2VgXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMuc3RhdGUucHJlc2VydmVfbG9hZGVkXG5cdFx0ICogQHBsdWdpbiBzdGF0ZVxuXHRcdCAqL1xuXHRcdHByZXNlcnZlX2xvYWRlZCA6IGZhbHNlXG5cdH07XG5cdCQuanN0cmVlLnBsdWdpbnMuc3RhdGUgPSBmdW5jdGlvbiAob3B0aW9ucywgcGFyZW50KSB7XG5cdFx0dGhpcy5iaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cGFyZW50LmJpbmQuY2FsbCh0aGlzKTtcblx0XHRcdHZhciBiaW5kID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQub24odGhpcy5zZXR0aW5ncy5zdGF0ZS5ldmVudHMsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZih0bykgeyBjbGVhclRpbWVvdXQodG8pOyB9XG5cdFx0XHRcdFx0dG8gPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhpcy5zYXZlX3N0YXRlKCk7IH0uYmluZCh0aGlzKSwgMTAwKTtcblx0XHRcdFx0fS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0LyoqXG5cdFx0XHRcdCAqIHRyaWdnZXJlZCB3aGVuIHRoZSBzdGF0ZSBwbHVnaW4gaXMgZmluaXNoZWQgcmVzdG9yaW5nIHRoZSBzdGF0ZSAoYW5kIGltbWVkaWF0ZWx5IGFmdGVyIHJlYWR5IGlmIHRoZXJlIGlzIG5vIHN0YXRlIHRvIHJlc3RvcmUpLlxuXHRcdFx0XHQgKiBAZXZlbnRcblx0XHRcdFx0ICogQG5hbWUgc3RhdGVfcmVhZHkuanN0cmVlXG5cdFx0XHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHRcdFx0ICovXG5cdFx0XHRcdHRoaXMudHJpZ2dlcignc3RhdGVfcmVhZHknKTtcblx0XHRcdH0uYmluZCh0aGlzKTtcblx0XHRcdHRoaXMuZWxlbWVudFxuXHRcdFx0XHQub24oXCJyZWFkeS5qc3RyZWVcIiwgZnVuY3Rpb24gKGUsIGRhdGEpIHtcblx0XHRcdFx0XHRcdHRoaXMuZWxlbWVudC5vbmUoXCJyZXN0b3JlX3N0YXRlLmpzdHJlZVwiLCBiaW5kKTtcblx0XHRcdFx0XHRcdGlmKCF0aGlzLnJlc3RvcmVfc3RhdGUoKSkgeyBiaW5kKCk7IH1cblx0XHRcdFx0XHR9LmJpbmQodGhpcykpO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogc2F2ZSB0aGUgc3RhdGVcblx0XHQgKiBAbmFtZSBzYXZlX3N0YXRlKClcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0dGhpcy5zYXZlX3N0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIHRtID0gdGhpcy5nZXRfc3RhdGUoKTtcblx0XHRcdGlmICghdGhpcy5zZXR0aW5ncy5zdGF0ZS5wcmVzZXJ2ZV9sb2FkZWQpIHtcblx0XHRcdFx0ZGVsZXRlIHRtLmNvcmUubG9hZGVkO1xuXHRcdFx0fVxuXHRcdFx0dmFyIHN0ID0geyAnc3RhdGUnIDogdG0sICd0dGwnIDogdGhpcy5zZXR0aW5ncy5zdGF0ZS50dGwsICdzZWMnIDogKyhuZXcgRGF0ZSgpKSB9O1xuXHRcdFx0JC52YWthdGEuc3RvcmFnZS5zZXQodGhpcy5zZXR0aW5ncy5zdGF0ZS5rZXksIEpTT04uc3RyaW5naWZ5KHN0KSk7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiByZXN0b3JlIHRoZSBzdGF0ZSBmcm9tIHRoZSB1c2VyJ3MgY29tcHV0ZXJcblx0XHQgKiBAbmFtZSByZXN0b3JlX3N0YXRlKClcblx0XHQgKiBAcGx1Z2luIHN0YXRlXG5cdFx0ICovXG5cdFx0dGhpcy5yZXN0b3JlX3N0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGsgPSAkLnZha2F0YS5zdG9yYWdlLmdldCh0aGlzLnNldHRpbmdzLnN0YXRlLmtleSk7XG5cdFx0XHRpZighIWspIHsgdHJ5IHsgayA9IEpTT04ucGFyc2Uoayk7IH0gY2F0Y2goZXgpIHsgcmV0dXJuIGZhbHNlOyB9IH1cblx0XHRcdGlmKCEhayAmJiBrLnR0bCAmJiBrLnNlYyAmJiArKG5ldyBEYXRlKCkpIC0gay5zZWMgPiBrLnR0bCkgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGlmKCEhayAmJiBrLnN0YXRlKSB7IGsgPSBrLnN0YXRlOyB9XG5cdFx0XHRpZighIWsgJiYgJC52YWthdGEuaXNfZnVuY3Rpb24odGhpcy5zZXR0aW5ncy5zdGF0ZS5maWx0ZXIpKSB7IGsgPSB0aGlzLnNldHRpbmdzLnN0YXRlLmZpbHRlci5jYWxsKHRoaXMsIGspOyB9XG5cdFx0XHRpZighIWspIHtcblx0XHRcdFx0aWYgKCF0aGlzLnNldHRpbmdzLnN0YXRlLnByZXNlcnZlX2xvYWRlZCkge1xuXHRcdFx0XHRcdGRlbGV0ZSBrLmNvcmUubG9hZGVkO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZWxlbWVudC5vbmUoXCJzZXRfc3RhdGUuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7IGRhdGEuaW5zdGFuY2UudHJpZ2dlcigncmVzdG9yZV9zdGF0ZScsIHsgJ3N0YXRlJyA6ICQuZXh0ZW5kKHRydWUsIHt9LCBrKSB9KTsgfSk7XG5cdFx0XHRcdHRoaXMuc2V0X3N0YXRlKGspO1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9O1xuXHRcdC8qKlxuXHRcdCAqIGNsZWFyIHRoZSBzdGF0ZSBvbiB0aGUgdXNlcidzIGNvbXB1dGVyXG5cdFx0ICogQG5hbWUgY2xlYXJfc3RhdGUoKVxuXHRcdCAqIEBwbHVnaW4gc3RhdGVcblx0XHQgKi9cblx0XHR0aGlzLmNsZWFyX3N0YXRlID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICQudmFrYXRhLnN0b3JhZ2UuZGVsKHRoaXMuc2V0dGluZ3Muc3RhdGUua2V5KTtcblx0XHR9O1xuXHR9O1xuXG5cdChmdW5jdGlvbiAoJCwgdW5kZWZpbmVkKSB7XG5cdFx0JC52YWthdGEuc3RvcmFnZSA9IHtcblx0XHRcdC8vIHNpbXBseSBzcGVjaWZ5aW5nIHRoZSBmdW5jdGlvbnMgaW4gRkYgdGhyb3dzIGFuIGVycm9yXG5cdFx0XHRzZXQgOiBmdW5jdGlvbiAoa2V5LCB2YWwpIHsgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIHZhbCk7IH0sXG5cdFx0XHRnZXQgOiBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTsgfSxcblx0XHRcdGRlbCA6IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpOyB9XG5cdFx0fTtcblx0fSgkKSk7XG5cblx0Ly8gaW5jbHVkZSB0aGUgc3RhdGUgcGx1Z2luIGJ5IGRlZmF1bHRcblx0Ly8gJC5qc3RyZWUuZGVmYXVsdHMucGx1Z2lucy5wdXNoKFwic3RhdGVcIik7XG5cbi8qKlxuICogIyMjIFR5cGVzIHBsdWdpblxuICpcbiAqIE1ha2VzIGl0IHBvc3NpYmxlIHRvIGFkZCBwcmVkZWZpbmVkIHR5cGVzIGZvciBncm91cHMgb2Ygbm9kZXMsIHdoaWNoIG1ha2UgaXQgcG9zc2libGUgdG8gZWFzaWx5IGNvbnRyb2wgbmVzdGluZyBydWxlcyBhbmQgaWNvbiBmb3IgZWFjaCBncm91cC5cbiAqL1xuXG5cdC8qKlxuXHQgKiBBbiBvYmplY3Qgc3RvcmluZyBhbGwgdHlwZXMgYXMga2V5IHZhbHVlIHBhaXJzLCB3aGVyZSB0aGUga2V5IGlzIHRoZSB0eXBlIG5hbWUgYW5kIHRoZSB2YWx1ZSBpcyBhbiBvYmplY3QgdGhhdCBjb3VsZCBjb250YWluIGZvbGxvd2luZyBrZXlzIChhbGwgb3B0aW9uYWwpLlxuXHQgKlxuXHQgKiAqIGBtYXhfY2hpbGRyZW5gIHRoZSBtYXhpbXVtIG51bWJlciBvZiBpbW1lZGlhdGUgY2hpbGRyZW4gdGhpcyBub2RlIHR5cGUgY2FuIGhhdmUuIERvIG5vdCBzcGVjaWZ5IG9yIHNldCB0byBgLTFgIGZvciB1bmxpbWl0ZWQuXG5cdCAqICogYG1heF9kZXB0aGAgdGhlIG1heGltdW0gbnVtYmVyIG9mIG5lc3RpbmcgdGhpcyBub2RlIHR5cGUgY2FuIGhhdmUuIEEgdmFsdWUgb2YgYDFgIHdvdWxkIG1lYW4gdGhhdCB0aGUgbm9kZSBjYW4gaGF2ZSBjaGlsZHJlbiwgYnV0IG5vIGdyYW5kY2hpbGRyZW4uIERvIG5vdCBzcGVjaWZ5IG9yIHNldCB0byBgLTFgIGZvciB1bmxpbWl0ZWQuXG5cdCAqICogYHZhbGlkX2NoaWxkcmVuYCBhbiBhcnJheSBvZiBub2RlIHR5cGUgc3RyaW5ncywgdGhhdCBub2RlcyBvZiB0aGlzIHR5cGUgY2FuIGhhdmUgYXMgY2hpbGRyZW4uIERvIG5vdCBzcGVjaWZ5IG9yIHNldCB0byBgLTFgIGZvciBubyBsaW1pdHMuXG5cdCAqICogYGljb25gIGEgc3RyaW5nIC0gY2FuIGJlIGEgcGF0aCB0byBhbiBpY29uIG9yIGEgY2xhc3NOYW1lLCBpZiB1c2luZyBhbiBpbWFnZSB0aGF0IGlzIGluIHRoZSBjdXJyZW50IGRpcmVjdG9yeSB1c2UgYSBgLi9gIHByZWZpeCwgb3RoZXJ3aXNlIGl0IHdpbGwgYmUgZGV0ZWN0ZWQgYXMgYSBjbGFzcy4gT21pdCB0byB1c2UgdGhlIGRlZmF1bHQgaWNvbiBmcm9tIHlvdXIgdGhlbWUuXG5cdCAqICogYGxpX2F0dHJgIGFuIG9iamVjdCBvZiB2YWx1ZXMgd2hpY2ggd2lsbCBiZSB1c2VkIHRvIGFkZCBIVE1MIGF0dHJpYnV0ZXMgb24gdGhlIHJlc3VsdGluZyBMSSBET00gbm9kZSAobWVyZ2VkIHdpdGggdGhlIG5vZGUncyBvd24gZGF0YSlcblx0ICogKiBgYV9hdHRyYCBhbiBvYmplY3Qgb2YgdmFsdWVzIHdoaWNoIHdpbGwgYmUgdXNlZCB0byBhZGQgSFRNTCBhdHRyaWJ1dGVzIG9uIHRoZSByZXN1bHRpbmcgQSBET00gbm9kZSAobWVyZ2VkIHdpdGggdGhlIG5vZGUncyBvd24gZGF0YSlcblx0ICpcblx0ICogVGhlcmUgYXJlIHR3byBwcmVkZWZpbmVkIHR5cGVzOlxuXHQgKlxuXHQgKiAqIGAjYCByZXByZXNlbnRzIHRoZSByb290IG9mIHRoZSB0cmVlLCBmb3IgZXhhbXBsZSBgbWF4X2NoaWxkcmVuYCB3b3VsZCBjb250cm9sIHRoZSBtYXhpbXVtIG51bWJlciBvZiByb290IG5vZGVzLlxuXHQgKiAqIGBkZWZhdWx0YCByZXByZXNlbnRzIHRoZSBkZWZhdWx0IG5vZGUgLSBhbnkgc2V0dGluZ3MgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gYWxsIG5vZGVzIHRoYXQgZG8gbm90IGhhdmUgYSB0eXBlIHNwZWNpZmllZC5cblx0ICpcblx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMudHlwZXNcblx0ICogQHBsdWdpbiB0eXBlc1xuXHQgKi9cblx0JC5qc3RyZWUuZGVmYXVsdHMudHlwZXMgPSB7XG5cdFx0J2RlZmF1bHQnIDoge31cblx0fTtcblx0JC5qc3RyZWUuZGVmYXVsdHMudHlwZXNbJC5qc3RyZWUucm9vdF0gPSB7fTtcblxuXHQkLmpzdHJlZS5wbHVnaW5zLnR5cGVzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBhcmVudCkge1xuXHRcdHRoaXMuaW5pdCA9IGZ1bmN0aW9uIChlbCwgb3B0aW9ucykge1xuXHRcdFx0dmFyIGksIGo7XG5cdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMudHlwZXMgJiYgb3B0aW9ucy50eXBlc1snZGVmYXVsdCddKSB7XG5cdFx0XHRcdGZvcihpIGluIG9wdGlvbnMudHlwZXMpIHtcblx0XHRcdFx0XHRpZihpICE9PSBcImRlZmF1bHRcIiAmJiBpICE9PSAkLmpzdHJlZS5yb290ICYmIG9wdGlvbnMudHlwZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcblx0XHRcdFx0XHRcdGZvcihqIGluIG9wdGlvbnMudHlwZXNbJ2RlZmF1bHQnXSkge1xuXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLnR5cGVzWydkZWZhdWx0J10uaGFzT3duUHJvcGVydHkoaikgJiYgb3B0aW9ucy50eXBlc1tpXVtqXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy50eXBlc1tpXVtqXSA9IG9wdGlvbnMudHlwZXNbJ2RlZmF1bHQnXVtqXTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cGFyZW50LmluaXQuY2FsbCh0aGlzLCBlbCwgb3B0aW9ucyk7XG5cdFx0XHR0aGlzLl9tb2RlbC5kYXRhWyQuanN0cmVlLnJvb3RdLnR5cGUgPSAkLmpzdHJlZS5yb290O1xuXHRcdH07XG5cdFx0dGhpcy5yZWZyZXNoID0gZnVuY3Rpb24gKHNraXBfbG9hZGluZywgZm9yZ2V0X3N0YXRlKSB7XG5cdFx0XHRwYXJlbnQucmVmcmVzaC5jYWxsKHRoaXMsIHNraXBfbG9hZGluZywgZm9yZ2V0X3N0YXRlKTtcblx0XHRcdHRoaXMuX21vZGVsLmRhdGFbJC5qc3RyZWUucm9vdF0udHlwZSA9ICQuanN0cmVlLnJvb3Q7XG5cdFx0fTtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0Lm9uKCdtb2RlbC5qc3RyZWUnLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dmFyIG0gPSB0aGlzLl9tb2RlbC5kYXRhLFxuXHRcdFx0XHRcdFx0XHRkcGMgPSBkYXRhLm5vZGVzLFxuXHRcdFx0XHRcdFx0XHR0ID0gdGhpcy5zZXR0aW5ncy50eXBlcyxcblx0XHRcdFx0XHRcdFx0aSwgaiwgYyA9ICdkZWZhdWx0Jywgaztcblx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IGRwYy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0YyA9ICdkZWZhdWx0Jztcblx0XHRcdFx0XHRcdFx0aWYobVtkcGNbaV1dLm9yaWdpbmFsICYmIG1bZHBjW2ldXS5vcmlnaW5hbC50eXBlICYmIHRbbVtkcGNbaV1dLm9yaWdpbmFsLnR5cGVdKSB7XG5cdFx0XHRcdFx0XHRcdFx0YyA9IG1bZHBjW2ldXS5vcmlnaW5hbC50eXBlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKG1bZHBjW2ldXS5kYXRhICYmIG1bZHBjW2ldXS5kYXRhLmpzdHJlZSAmJiBtW2RwY1tpXV0uZGF0YS5qc3RyZWUudHlwZSAmJiB0W21bZHBjW2ldXS5kYXRhLmpzdHJlZS50eXBlXSkge1xuXHRcdFx0XHRcdFx0XHRcdGMgPSBtW2RwY1tpXV0uZGF0YS5qc3RyZWUudHlwZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0udHlwZSA9IGM7XG5cdFx0XHRcdFx0XHRcdGlmKG1bZHBjW2ldXS5pY29uID09PSB0cnVlICYmIHRbY10uaWNvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0bVtkcGNbaV1dLmljb24gPSB0W2NdLmljb247XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYodFtjXS5saV9hdHRyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRbY10ubGlfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRcdFx0XHRmb3IgKGsgaW4gdFtjXS5saV9hdHRyKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAodFtjXS5saV9hdHRyLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChrID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAobVtkcGNbaV1dLmxpX2F0dHJba10gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1bZHBjW2ldXS5saV9hdHRyW2tdID0gdFtjXS5saV9hdHRyW2tdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0ubGlfYXR0clsnY2xhc3MnXSA9IHRbY10ubGlfYXR0clsnY2xhc3MnXSArICcgJyArIG1bZHBjW2ldXS5saV9hdHRyWydjbGFzcyddO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmKHRbY10uYV9hdHRyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRbY10uYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoayBpbiB0W2NdLmFfYXR0cikge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKHRbY10uYV9hdHRyLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmIChrID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0ZWxzZSBpZiAobVtkcGNbaV1dLmFfYXR0cltrXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bVtkcGNbaV1dLmFfYXR0cltrXSA9IHRbY10uYV9hdHRyW2tdO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdocmVmJyAmJiBtW2RwY1tpXV0uYV9hdHRyW2tdID09PSAnIycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uYV9hdHRyWydocmVmJ10gPSB0W2NdLmFfYXR0clsnaHJlZiddO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtW2RwY1tpXV0uYV9hdHRyWydjbGFzcyddID0gdFtjXS5hX2F0dHJbJ2NsYXNzJ10gKyAnICcgKyBtW2RwY1tpXV0uYV9hdHRyWydjbGFzcyddO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtWyQuanN0cmVlLnJvb3RdLnR5cGUgPSAkLmpzdHJlZS5yb290O1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXHRcdH07XG5cdFx0dGhpcy5nZXRfanNvbiA9IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMsIGZsYXQpIHtcblx0XHRcdHZhciBpLCBqLFxuXHRcdFx0XHRtID0gdGhpcy5fbW9kZWwuZGF0YSxcblx0XHRcdFx0b3B0ID0gb3B0aW9ucyA/ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRpb25zLCB7bm9faWQ6ZmFsc2V9KSA6IHt9LFxuXHRcdFx0XHR0bXAgPSBwYXJlbnQuZ2V0X2pzb24uY2FsbCh0aGlzLCBvYmosIG9wdCwgZmxhdCk7XG5cdFx0XHRpZih0bXAgPT09IGZhbHNlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkodG1wKSkge1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSB0bXAubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0dG1wW2ldLnR5cGUgPSB0bXBbaV0uaWQgJiYgbVt0bXBbaV0uaWRdICYmIG1bdG1wW2ldLmlkXS50eXBlID8gbVt0bXBbaV0uaWRdLnR5cGUgOiBcImRlZmF1bHRcIjtcblx0XHRcdFx0XHRpZihvcHRpb25zICYmIG9wdGlvbnMubm9faWQpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0bXBbaV0uaWQ7XG5cdFx0XHRcdFx0XHRpZih0bXBbaV0ubGlfYXR0ciAmJiB0bXBbaV0ubGlfYXR0ci5pZCkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgdG1wW2ldLmxpX2F0dHIuaWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZih0bXBbaV0uYV9hdHRyICYmIHRtcFtpXS5hX2F0dHIuaWQpIHtcblx0XHRcdFx0XHRcdFx0ZGVsZXRlIHRtcFtpXS5hX2F0dHIuaWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dG1wLnR5cGUgPSB0bXAuaWQgJiYgbVt0bXAuaWRdICYmIG1bdG1wLmlkXS50eXBlID8gbVt0bXAuaWRdLnR5cGUgOiBcImRlZmF1bHRcIjtcblx0XHRcdFx0aWYob3B0aW9ucyAmJiBvcHRpb25zLm5vX2lkKSB7XG5cdFx0XHRcdFx0dG1wID0gdGhpcy5fZGVsZXRlX2lkcyh0bXApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG1wO1xuXHRcdH07XG5cdFx0dGhpcy5fZGVsZXRlX2lkcyA9IGZ1bmN0aW9uICh0bXApIHtcblx0XHRcdGlmKCQudmFrYXRhLmlzX2FycmF5KHRtcCkpIHtcblx0XHRcdFx0Zm9yKHZhciBpID0gMCwgaiA9IHRtcC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHR0bXBbaV0gPSB0aGlzLl9kZWxldGVfaWRzKHRtcFtpXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIHRtcDtcblx0XHRcdH1cblx0XHRcdGRlbGV0ZSB0bXAuaWQ7XG5cdFx0XHRpZih0bXAubGlfYXR0ciAmJiB0bXAubGlfYXR0ci5pZCkge1xuXHRcdFx0XHRkZWxldGUgdG1wLmxpX2F0dHIuaWQ7XG5cdFx0XHR9XG5cdFx0XHRpZih0bXAuYV9hdHRyICYmIHRtcC5hX2F0dHIuaWQpIHtcblx0XHRcdFx0ZGVsZXRlIHRtcC5hX2F0dHIuaWQ7XG5cdFx0XHR9XG5cdFx0XHRpZih0bXAuY2hpbGRyZW4gJiYgJC52YWthdGEuaXNfYXJyYXkodG1wLmNoaWxkcmVuKSkge1xuXHRcdFx0XHR0bXAuY2hpbGRyZW4gPSB0aGlzLl9kZWxldGVfaWRzKHRtcC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdG1wO1xuXHRcdH07XG5cdFx0dGhpcy5jaGVjayA9IGZ1bmN0aW9uIChjaGssIG9iaiwgcGFyLCBwb3MsIG1vcmUpIHtcblx0XHRcdGlmKHBhcmVudC5jaGVjay5jYWxsKHRoaXMsIGNoaywgb2JqLCBwYXIsIHBvcywgbW9yZSkgPT09IGZhbHNlKSB7IHJldHVybiBmYWxzZTsgfVxuXHRcdFx0b2JqID0gb2JqICYmIG9iai5pZCA/IG9iaiA6IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdHBhciA9IHBhciAmJiBwYXIuaWQgPyBwYXIgOiB0aGlzLmdldF9ub2RlKHBhcik7XG5cdFx0XHR2YXIgbSA9IG9iaiAmJiBvYmouaWQgPyAobW9yZSAmJiBtb3JlLm9yaWdpbiA/IG1vcmUub3JpZ2luIDogJC5qc3RyZWUucmVmZXJlbmNlKG9iai5pZCkpIDogbnVsbCwgdG1wLCBkLCBpLCBqO1xuXHRcdFx0bSA9IG0gJiYgbS5fbW9kZWwgJiYgbS5fbW9kZWwuZGF0YSA/IG0uX21vZGVsLmRhdGEgOiBudWxsO1xuXHRcdFx0c3dpdGNoKGNoaykge1xuXHRcdFx0XHRjYXNlIFwiY3JlYXRlX25vZGVcIjpcblx0XHRcdFx0Y2FzZSBcIm1vdmVfbm9kZVwiOlxuXHRcdFx0XHRjYXNlIFwiY29weV9ub2RlXCI6XG5cdFx0XHRcdFx0aWYoY2hrICE9PSAnbW92ZV9ub2RlJyB8fCAkLmluQXJyYXkob2JqLmlkLCBwYXIuY2hpbGRyZW4pID09PSAtMSkge1xuXHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfcnVsZXMocGFyKTtcblx0XHRcdFx0XHRcdGlmKHRtcC5tYXhfY2hpbGRyZW4gIT09IHVuZGVmaW5lZCAmJiB0bXAubWF4X2NoaWxkcmVuICE9PSAtMSAmJiB0bXAubWF4X2NoaWxkcmVuID09PSBwYXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndHlwZXMnLCAnaWQnIDogJ3R5cGVzXzAxJywgJ3JlYXNvbicgOiAnbWF4X2NoaWxkcmVuIHByZXZlbnRzIGZ1bmN0aW9uOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKHRtcC52YWxpZF9jaGlsZHJlbiAhPT0gdW5kZWZpbmVkICYmIHRtcC52YWxpZF9jaGlsZHJlbiAhPT0gLTEgJiYgJC5pbkFycmF5KChvYmoudHlwZSB8fCAnZGVmYXVsdCcpLCB0bXAudmFsaWRfY2hpbGRyZW4pID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ3R5cGVzJywgJ2lkJyA6ICd0eXBlc18wMicsICdyZWFzb24nIDogJ3ZhbGlkX2NoaWxkcmVuIHByZXZlbnRzIGZ1bmN0aW9uOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmKG0gJiYgb2JqLmNoaWxkcmVuX2QgJiYgb2JqLnBhcmVudHMpIHtcblx0XHRcdFx0XHRcdFx0ZCA9IDA7XG5cdFx0XHRcdFx0XHRcdGZvcihpID0gMCwgaiA9IG9iai5jaGlsZHJlbl9kLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuXHRcdFx0XHRcdFx0XHRcdGQgPSBNYXRoLm1heChkLCBtW29iai5jaGlsZHJlbl9kW2ldXS5wYXJlbnRzLmxlbmd0aCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZCA9IGQgLSBvYmoucGFyZW50cy5sZW5ndGggKyAxO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYoZCA8PSAwIHx8IGQgPT09IHVuZGVmaW5lZCkgeyBkID0gMTsgfVxuXHRcdFx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdFx0XHRpZih0bXAubWF4X2RlcHRoICE9PSB1bmRlZmluZWQgJiYgdG1wLm1heF9kZXB0aCAhPT0gLTEgJiYgdG1wLm1heF9kZXB0aCA8IGQpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ3R5cGVzJywgJ2lkJyA6ICd0eXBlc18wMycsICdyZWFzb24nIDogJ21heF9kZXB0aCBwcmV2ZW50cyBmdW5jdGlvbjogJyArIGNoaywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRwYXIgPSB0aGlzLmdldF9ub2RlKHBhci5wYXJlbnQpO1xuXHRcdFx0XHRcdFx0XHR0bXAgPSB0aGlzLmdldF9ydWxlcyhwYXIpO1xuXHRcdFx0XHRcdFx0XHRkKys7XG5cdFx0XHRcdFx0XHR9IHdoaWxlKHBhcik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1c2VkIHRvIHJldHJpZXZlIHRoZSB0eXBlIHNldHRpbmdzIG9iamVjdCBmb3IgYSBub2RlXG5cdFx0ICogQG5hbWUgZ2V0X3J1bGVzKG9iailcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gZmluZCB0aGUgcnVsZXMgZm9yXG5cdFx0ICogQHJldHVybiB7T2JqZWN0fVxuXHRcdCAqIEBwbHVnaW4gdHlwZXNcblx0XHQgKi9cblx0XHR0aGlzLmdldF9ydWxlcyA9IGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdG9iaiA9IHRoaXMuZ2V0X25vZGUob2JqKTtcblx0XHRcdGlmKCFvYmopIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHR2YXIgdG1wID0gdGhpcy5nZXRfdHlwZShvYmosIHRydWUpO1xuXHRcdFx0aWYodG1wLm1heF9kZXB0aCA9PT0gdW5kZWZpbmVkKSB7IHRtcC5tYXhfZGVwdGggPSAtMTsgfVxuXHRcdFx0aWYodG1wLm1heF9jaGlsZHJlbiA9PT0gdW5kZWZpbmVkKSB7IHRtcC5tYXhfY2hpbGRyZW4gPSAtMTsgfVxuXHRcdFx0aWYodG1wLnZhbGlkX2NoaWxkcmVuID09PSB1bmRlZmluZWQpIHsgdG1wLnZhbGlkX2NoaWxkcmVuID0gLTE7IH1cblx0XHRcdHJldHVybiB0bXA7XG5cdFx0fTtcblx0XHQvKipcblx0XHQgKiB1c2VkIHRvIHJldHJpZXZlIHRoZSB0eXBlIHN0cmluZyBvciBzZXR0aW5ncyBvYmplY3QgZm9yIGEgbm9kZVxuXHRcdCAqIEBuYW1lIGdldF90eXBlKG9iaiBbLCBydWxlc10pXG5cdFx0ICogQHBhcmFtIHttaXhlZH0gb2JqIHRoZSBub2RlIHRvIGZpbmQgdGhlIHJ1bGVzIGZvclxuXHRcdCAqIEBwYXJhbSB7Qm9vbGVhbn0gcnVsZXMgaWYgc2V0IHRvIGB0cnVlYCBpbnN0ZWFkIG9mIGEgc3RyaW5nIHRoZSBzZXR0aW5ncyBvYmplY3Qgd2lsbCBiZSByZXR1cm5lZFxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ3xPYmplY3R9XG5cdFx0ICogQHBsdWdpbiB0eXBlc1xuXHRcdCAqL1xuXHRcdHRoaXMuZ2V0X3R5cGUgPSBmdW5jdGlvbiAob2JqLCBydWxlcykge1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cmV0dXJuICghb2JqKSA/IGZhbHNlIDogKCBydWxlcyA/ICQuZXh0ZW5kKHsgJ3R5cGUnIDogb2JqLnR5cGUgfSwgdGhpcy5zZXR0aW5ncy50eXBlc1tvYmoudHlwZV0pIDogb2JqLnR5cGUpO1xuXHRcdH07XG5cdFx0LyoqXG5cdFx0ICogdXNlZCB0byBjaGFuZ2UgYSBub2RlJ3MgdHlwZVxuXHRcdCAqIEBuYW1lIHNldF90eXBlKG9iaiwgdHlwZSlcblx0XHQgKiBAcGFyYW0ge21peGVkfSBvYmogdGhlIG5vZGUgdG8gY2hhbmdlXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgdGhlIG5ldyB0eXBlXG5cdFx0ICogQHBsdWdpbiB0eXBlc1xuXHRcdCAqL1xuXHRcdHRoaXMuc2V0X3R5cGUgPSBmdW5jdGlvbiAob2JqLCB0eXBlKSB7XG5cdFx0XHR2YXIgbSA9IHRoaXMuX21vZGVsLmRhdGEsIHQsIHQxLCB0Miwgb2xkX3R5cGUsIG9sZF9pY29uLCBrLCBkLCBhO1xuXHRcdFx0aWYoJC52YWthdGEuaXNfYXJyYXkob2JqKSkge1xuXHRcdFx0XHRvYmogPSBvYmouc2xpY2UoKTtcblx0XHRcdFx0Zm9yKHQxID0gMCwgdDIgPSBvYmoubGVuZ3RoOyB0MSA8IHQyOyB0MSsrKSB7XG5cdFx0XHRcdFx0dGhpcy5zZXRfdHlwZShvYmpbdDFdLCB0eXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHQgPSB0aGlzLnNldHRpbmdzLnR5cGVzO1xuXHRcdFx0b2JqID0gdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0aWYoIXRbdHlwZV0gfHwgIW9iaikgeyByZXR1cm4gZmFsc2U7IH1cblx0XHRcdGQgPSB0aGlzLmdldF9ub2RlKG9iaiwgdHJ1ZSk7XG5cdFx0XHRpZiAoZCAmJiBkLmxlbmd0aCkge1xuXHRcdFx0XHRhID0gZC5jaGlsZHJlbignLmpzdHJlZS1hbmNob3InKTtcblx0XHRcdH1cblx0XHRcdG9sZF90eXBlID0gb2JqLnR5cGU7XG5cdFx0XHRvbGRfaWNvbiA9IHRoaXMuZ2V0X2ljb24ob2JqKTtcblx0XHRcdG9iai50eXBlID0gdHlwZTtcblx0XHRcdGlmKG9sZF9pY29uID09PSB0cnVlIHx8ICF0W29sZF90eXBlXSB8fCAodFtvbGRfdHlwZV0uaWNvbiAhPT0gdW5kZWZpbmVkICYmIG9sZF9pY29uID09PSB0W29sZF90eXBlXS5pY29uKSkge1xuXHRcdFx0XHR0aGlzLnNldF9pY29uKG9iaiwgdFt0eXBlXS5pY29uICE9PSB1bmRlZmluZWQgPyB0W3R5cGVdLmljb24gOiB0cnVlKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVtb3ZlIG9sZCB0eXBlIHByb3BzXG5cdFx0XHRpZih0W29sZF90eXBlXSAmJiB0W29sZF90eXBlXS5saV9hdHRyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHRbb2xkX3R5cGVdLmxpX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoayBpbiB0W29sZF90eXBlXS5saV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYgKHRbb2xkX3R5cGVdLmxpX2F0dHIuaGFzT3duUHJvcGVydHkoaykpIHtcblx0XHRcdFx0XHRcdGlmIChrID09PSAnaWQnKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSBpZiAoayA9PT0gJ2NsYXNzJykge1xuXHRcdFx0XHRcdFx0XHRtW29iai5pZF0ubGlfYXR0clsnY2xhc3MnXSA9IChtW29iai5pZF0ubGlfYXR0clsnY2xhc3MnXSB8fCAnJykucmVwbGFjZSh0W29sZF90eXBlXS5saV9hdHRyW2tdLCAnJyk7XG5cdFx0XHRcdFx0XHRcdGlmIChkKSB7IGQucmVtb3ZlQ2xhc3ModFtvbGRfdHlwZV0ubGlfYXR0cltrXSk7IH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG1bb2JqLmlkXS5saV9hdHRyW2tdID09PSB0W29sZF90eXBlXS5saV9hdHRyW2tdKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5saV9hdHRyW2tdID0gbnVsbDtcblx0XHRcdFx0XHRcdFx0aWYgKGQpIHsgZC5yZW1vdmVBdHRyKGspOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZih0W29sZF90eXBlXSAmJiB0W29sZF90eXBlXS5hX2F0dHIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdFtvbGRfdHlwZV0uYV9hdHRyID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKGsgaW4gdFtvbGRfdHlwZV0uYV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYgKHRbb2xkX3R5cGVdLmFfYXR0ci5oYXNPd25Qcm9wZXJ0eShrKSkge1xuXHRcdFx0XHRcdFx0aWYgKGsgPT09ICdpZCcpIHtcblx0XHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChrID09PSAnY2xhc3MnKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5hX2F0dHJbJ2NsYXNzJ10gPSAobVtvYmouaWRdLmFfYXR0clsnY2xhc3MnXSB8fCAnJykucmVwbGFjZSh0W29sZF90eXBlXS5hX2F0dHJba10sICcnKTtcblx0XHRcdFx0XHRcdFx0aWYgKGEpIHsgYS5yZW1vdmVDbGFzcyh0W29sZF90eXBlXS5hX2F0dHJba10pOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChtW29iai5pZF0uYV9hdHRyW2tdID09PSB0W29sZF90eXBlXS5hX2F0dHJba10pIHtcblx0XHRcdFx0XHRcdFx0aWYgKGsgPT09ICdocmVmJykge1xuXHRcdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5hX2F0dHJba10gPSAnIyc7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGEpIHsgYS5hdHRyKCdocmVmJywgJyMnKTsgfVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGRlbGV0ZSBtW29iai5pZF0uYV9hdHRyW2tdO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChhKSB7IGEucmVtb3ZlQXR0cihrKTsgfVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGFkZCBuZXcgcHJvcHNcblx0XHRcdGlmKHRbdHlwZV0ubGlfYXR0ciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0W3R5cGVdLmxpX2F0dHIgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAoayBpbiB0W3R5cGVdLmxpX2F0dHIpIHtcblx0XHRcdFx0XHRpZiAodFt0eXBlXS5saV9hdHRyLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG1bb2JqLmlkXS5saV9hdHRyW2tdID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmxpX2F0dHJba10gPSB0W3R5cGVdLmxpX2F0dHJba107XG5cdFx0XHRcdFx0XHRcdGlmIChkKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGQuYWRkQ2xhc3ModFt0eXBlXS5saV9hdHRyW2tdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRkLmF0dHIoaywgdFt0eXBlXS5saV9hdHRyW2tdKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0bVtvYmouaWRdLmxpX2F0dHJbJ2NsYXNzJ10gPSB0W3R5cGVdLmxpX2F0dHJba10gKyAnICcgKyBtW29iai5pZF0ubGlfYXR0clsnY2xhc3MnXTtcblx0XHRcdFx0XHRcdFx0aWYgKGQpIHsgZC5hZGRDbGFzcyh0W3R5cGVdLmxpX2F0dHJba10pOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZih0W3R5cGVdLmFfYXR0ciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiB0W3R5cGVdLmFfYXR0ciA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yIChrIGluIHRbdHlwZV0uYV9hdHRyKSB7XG5cdFx0XHRcdFx0aWYgKHRbdHlwZV0uYV9hdHRyLmhhc093blByb3BlcnR5KGspKSB7XG5cdFx0XHRcdFx0XHRpZiAoayA9PT0gJ2lkJykge1xuXHRcdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYgKG1bb2JqLmlkXS5hX2F0dHJba10gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRtW29iai5pZF0uYV9hdHRyW2tdID0gdFt0eXBlXS5hX2F0dHJba107XG5cdFx0XHRcdFx0XHRcdGlmIChhKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGsgPT09ICdjbGFzcycpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGEuYWRkQ2xhc3ModFt0eXBlXS5hX2F0dHJba10pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGEuYXR0cihrLCB0W3R5cGVdLmFfYXR0cltrXSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChrID09PSAnaHJlZicgJiYgbVtvYmouaWRdLmFfYXR0cltrXSA9PT0gJyMnKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5hX2F0dHJbJ2hyZWYnXSA9IHRbdHlwZV0uYV9hdHRyWydocmVmJ107XG5cdFx0XHRcdFx0XHRcdGlmIChhKSB7IGEuYXR0cignaHJlZicsIHRbdHlwZV0uYV9hdHRyWydocmVmJ10pOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmIChrID09PSAnY2xhc3MnKSB7XG5cdFx0XHRcdFx0XHRcdG1bb2JqLmlkXS5hX2F0dHJbJ2NsYXNzJ10gPSB0W3R5cGVdLmFfYXR0clsnY2xhc3MnXSArICcgJyArIG1bb2JqLmlkXS5hX2F0dHJbJ2NsYXNzJ107XG5cdFx0XHRcdFx0XHRcdGlmIChhKSB7IGEuYWRkQ2xhc3ModFt0eXBlXS5hX2F0dHJba10pOyB9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdH07XG5cdC8vIGluY2x1ZGUgdGhlIHR5cGVzIHBsdWdpbiBieSBkZWZhdWx0XG5cdC8vICQuanN0cmVlLmRlZmF1bHRzLnBsdWdpbnMucHVzaChcInR5cGVzXCIpO1xuXG5cbi8qKlxuICogIyMjIFVuaXF1ZSBwbHVnaW5cbiAqXG4gKiBFbmZvcmNlcyB0aGF0IG5vIG5vZGVzIHdpdGggdGhlIHNhbWUgbmFtZSBjYW4gY29leGlzdCBhcyBzaWJsaW5ncy5cbiAqL1xuXG5cdC8qKlxuXHQgKiBzdG9yZXMgYWxsIGRlZmF1bHRzIGZvciB0aGUgdW5pcXVlIHBsdWdpblxuXHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy51bmlxdWVcblx0ICogQHBsdWdpbiB1bmlxdWVcblx0ICovXG5cdCQuanN0cmVlLmRlZmF1bHRzLnVuaXF1ZSA9IHtcblx0XHQvKipcblx0XHQgKiBJbmRpY2F0ZXMgaWYgdGhlIGNvbXBhcmlzb24gc2hvdWxkIGJlIGNhc2Ugc2Vuc2l0aXZlLiBEZWZhdWx0IGlzIGBmYWxzZWAuXG5cdFx0ICogQG5hbWUgJC5qc3RyZWUuZGVmYXVsdHMudW5pcXVlLmNhc2Vfc2Vuc2l0aXZlXG5cdFx0ICogQHBsdWdpbiB1bmlxdWVcblx0XHQgKi9cblx0XHRjYXNlX3NlbnNpdGl2ZSA6IGZhbHNlLFxuXHRcdC8qKlxuXHRcdCAqIEluZGljYXRlcyBpZiB3aGl0ZSBzcGFjZSBzaG91bGQgYmUgdHJpbW1lZCBiZWZvcmUgdGhlIGNvbXBhcmlzb24uIERlZmF1bHQgaXMgYGZhbHNlYC5cblx0XHQgKiBAbmFtZSAkLmpzdHJlZS5kZWZhdWx0cy51bmlxdWUudHJpbV93aGl0ZXNwYWNlXG5cdFx0ICogQHBsdWdpbiB1bmlxdWVcblx0XHQgKi9cblx0XHR0cmltX3doaXRlc3BhY2UgOiBmYWxzZSxcblx0XHQvKipcblx0XHQgKiBBIGNhbGxiYWNrIGV4ZWN1dGVkIGluIHRoZSBpbnN0YW5jZSdzIHNjb3BlIHdoZW4gYSBuZXcgbm9kZSBpcyBjcmVhdGVkIGFuZCB0aGUgbmFtZSBpcyBhbHJlYWR5IHRha2VuLCB0aGUgdHdvIGFyZ3VtZW50cyBhcmUgdGhlIGNvbmZsaWN0aW5nIG5hbWUgYW5kIHRoZSBjb3VudGVyLiBUaGUgZGVmYXVsdCB3aWxsIHByb2R1Y2UgcmVzdWx0cyBsaWtlIGBOZXcgbm9kZSAoMilgLlxuXHRcdCAqIEBuYW1lICQuanN0cmVlLmRlZmF1bHRzLnVuaXF1ZS5kdXBsaWNhdGVcblx0XHQgKiBAcGx1Z2luIHVuaXF1ZVxuXHRcdCAqL1xuXHRcdGR1cGxpY2F0ZSA6IGZ1bmN0aW9uIChuYW1lLCBjb3VudGVyKSB7XG5cdFx0XHRyZXR1cm4gbmFtZSArICcgKCcgKyBjb3VudGVyICsgJyknO1xuXHRcdH1cblx0fTtcblxuXHQkLmpzdHJlZS5wbHVnaW5zLnVuaXF1ZSA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmNoZWNrID0gZnVuY3Rpb24gKGNoaywgb2JqLCBwYXIsIHBvcywgbW9yZSkge1xuXHRcdFx0aWYocGFyZW50LmNoZWNrLmNhbGwodGhpcywgY2hrLCBvYmosIHBhciwgcG9zLCBtb3JlKSA9PT0gZmFsc2UpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdFx0XHRvYmogPSBvYmogJiYgb2JqLmlkID8gb2JqIDogdGhpcy5nZXRfbm9kZShvYmopO1xuXHRcdFx0cGFyID0gcGFyICYmIHBhci5pZCA/IHBhciA6IHRoaXMuZ2V0X25vZGUocGFyKTtcblx0XHRcdGlmKCFwYXIgfHwgIXBhci5jaGlsZHJlbikgeyByZXR1cm4gdHJ1ZTsgfVxuXHRcdFx0dmFyIG4gPSBjaGsgPT09IFwicmVuYW1lX25vZGVcIiA/IHBvcyA6IG9iai50ZXh0LFxuXHRcdFx0XHRjID0gW10sXG5cdFx0XHRcdHMgPSB0aGlzLnNldHRpbmdzLnVuaXF1ZS5jYXNlX3NlbnNpdGl2ZSxcblx0XHRcdFx0dyA9IHRoaXMuc2V0dGluZ3MudW5pcXVlLnRyaW1fd2hpdGVzcGFjZSxcblx0XHRcdFx0bSA9IHRoaXMuX21vZGVsLmRhdGEsIGksIGosIHQ7XG5cdFx0XHRmb3IoaSA9IDAsIGogPSBwYXIuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdHQgPSBtW3Bhci5jaGlsZHJlbltpXV0udGV4dDtcblx0XHRcdFx0aWYgKCFzKSB7XG5cdFx0XHRcdFx0dCA9IHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodykge1xuXHRcdFx0XHRcdHQgPSB0LnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Yy5wdXNoKHQpO1xuXHRcdFx0fVxuXHRcdFx0aWYoIXMpIHsgbiA9IG4udG9Mb3dlckNhc2UoKTsgfVxuXHRcdFx0aWYgKHcpIHsgbiA9IG4ucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTsgfVxuXHRcdFx0c3dpdGNoKGNoaykge1xuXHRcdFx0XHRjYXNlIFwiZGVsZXRlX25vZGVcIjpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0Y2FzZSBcInJlbmFtZV9ub2RlXCI6XG5cdFx0XHRcdFx0dCA9IG9iai50ZXh0IHx8ICcnO1xuXHRcdFx0XHRcdGlmICghcykge1xuXHRcdFx0XHRcdFx0dCA9IHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHcpIHtcblx0XHRcdFx0XHRcdHQgPSB0LnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGkgPSAoJC5pbkFycmF5KG4sIGMpID09PSAtMSB8fCAob2JqLnRleHQgJiYgdCA9PT0gbikpO1xuXHRcdFx0XHRcdGlmKCFpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ3VuaXF1ZScsICdpZCcgOiAndW5pcXVlXzAxJywgJ3JlYXNvbicgOiAnQ2hpbGQgd2l0aCBuYW1lICcgKyBuICsgJyBhbHJlYWR5IGV4aXN0cy4gUHJldmVudGluZzogJyArIGNoaywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0Y2FzZSBcImNyZWF0ZV9ub2RlXCI6XG5cdFx0XHRcdFx0aSA9ICgkLmluQXJyYXkobiwgYykgPT09IC0xKTtcblx0XHRcdFx0XHRpZighaSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YS5jb3JlLmxhc3RfZXJyb3IgPSB7ICdlcnJvcicgOiAnY2hlY2snLCAncGx1Z2luJyA6ICd1bmlxdWUnLCAnaWQnIDogJ3VuaXF1ZV8wNCcsICdyZWFzb24nIDogJ0NoaWxkIHdpdGggbmFtZSAnICsgbiArICcgYWxyZWFkeSBleGlzdHMuIFByZXZlbnRpbmc6ICcgKyBjaGssICdkYXRhJyA6IEpTT04uc3RyaW5naWZ5KHsgJ2NoaycgOiBjaGssICdwb3MnIDogcG9zLCAnb2JqJyA6IG9iaiAmJiBvYmouaWQgPyBvYmouaWQgOiBmYWxzZSwgJ3BhcicgOiBwYXIgJiYgcGFyLmlkID8gcGFyLmlkIDogZmFsc2UgfSkgfTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGk7XG5cdFx0XHRcdGNhc2UgXCJjb3B5X25vZGVcIjpcblx0XHRcdFx0XHRpID0gKCQuaW5BcnJheShuLCBjKSA9PT0gLTEpO1xuXHRcdFx0XHRcdGlmKCFpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhLmNvcmUubGFzdF9lcnJvciA9IHsgJ2Vycm9yJyA6ICdjaGVjaycsICdwbHVnaW4nIDogJ3VuaXF1ZScsICdpZCcgOiAndW5pcXVlXzAyJywgJ3JlYXNvbicgOiAnQ2hpbGQgd2l0aCBuYW1lICcgKyBuICsgJyBhbHJlYWR5IGV4aXN0cy4gUHJldmVudGluZzogJyArIGNoaywgJ2RhdGEnIDogSlNPTi5zdHJpbmdpZnkoeyAnY2hrJyA6IGNoaywgJ3BvcycgOiBwb3MsICdvYmonIDogb2JqICYmIG9iai5pZCA/IG9iai5pZCA6IGZhbHNlLCAncGFyJyA6IHBhciAmJiBwYXIuaWQgPyBwYXIuaWQgOiBmYWxzZSB9KSB9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gaTtcblx0XHRcdFx0Y2FzZSBcIm1vdmVfbm9kZVwiOlxuXHRcdFx0XHRcdGkgPSAoIChvYmoucGFyZW50ID09PSBwYXIuaWQgJiYgKCFtb3JlIHx8ICFtb3JlLmlzX211bHRpKSkgfHwgJC5pbkFycmF5KG4sIGMpID09PSAtMSk7XG5cdFx0XHRcdFx0aWYoIWkpIHtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGEuY29yZS5sYXN0X2Vycm9yID0geyAnZXJyb3InIDogJ2NoZWNrJywgJ3BsdWdpbicgOiAndW5pcXVlJywgJ2lkJyA6ICd1bmlxdWVfMDMnLCAncmVhc29uJyA6ICdDaGlsZCB3aXRoIG5hbWUgJyArIG4gKyAnIGFscmVhZHkgZXhpc3RzLiBQcmV2ZW50aW5nOiAnICsgY2hrLCAnZGF0YScgOiBKU09OLnN0cmluZ2lmeSh7ICdjaGsnIDogY2hrLCAncG9zJyA6IHBvcywgJ29iaicgOiBvYmogJiYgb2JqLmlkID8gb2JqLmlkIDogZmFsc2UsICdwYXInIDogcGFyICYmIHBhci5pZCA/IHBhci5pZCA6IGZhbHNlIH0pIH07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fTtcblx0XHR0aGlzLmNyZWF0ZV9ub2RlID0gZnVuY3Rpb24gKHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkKSB7XG5cdFx0XHRpZighbm9kZSB8fCBub2RlLnRleHQgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRpZihwYXIgPT09IG51bGwpIHtcblx0XHRcdFx0XHRwYXIgPSAkLmpzdHJlZS5yb290O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHBhciA9IHRoaXMuZ2V0X25vZGUocGFyKTtcblx0XHRcdFx0aWYoIXBhcikge1xuXHRcdFx0XHRcdHJldHVybiBwYXJlbnQuY3JlYXRlX25vZGUuY2FsbCh0aGlzLCBwYXIsIG5vZGUsIHBvcywgY2FsbGJhY2ssIGlzX2xvYWRlZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cG9zID0gcG9zID09PSB1bmRlZmluZWQgPyBcImxhc3RcIiA6IHBvcztcblx0XHRcdFx0aWYoIXBvcy50b1N0cmluZygpLm1hdGNoKC9eKGJlZm9yZXxhZnRlcikkLykgJiYgIWlzX2xvYWRlZCAmJiAhdGhpcy5pc19sb2FkZWQocGFyKSkge1xuXHRcdFx0XHRcdHJldHVybiBwYXJlbnQuY3JlYXRlX25vZGUuY2FsbCh0aGlzLCBwYXIsIG5vZGUsIHBvcywgY2FsbGJhY2ssIGlzX2xvYWRlZCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoIW5vZGUpIHsgbm9kZSA9IHt9OyB9XG5cdFx0XHRcdHZhciB0bXAsIG4sIGRwYywgaSwgaiwgbSA9IHRoaXMuX21vZGVsLmRhdGEsIHMgPSB0aGlzLnNldHRpbmdzLnVuaXF1ZS5jYXNlX3NlbnNpdGl2ZSwgdyA9IHRoaXMuc2V0dGluZ3MudW5pcXVlLnRyaW1fd2hpdGVzcGFjZSwgY2IgPSB0aGlzLnNldHRpbmdzLnVuaXF1ZS5kdXBsaWNhdGUsIHQ7XG5cdFx0XHRcdG4gPSB0bXAgPSB0aGlzLmdldF9zdHJpbmcoJ05ldyBub2RlJyk7XG5cdFx0XHRcdGRwYyA9IFtdO1xuXHRcdFx0XHRmb3IoaSA9IDAsIGogPSBwYXIuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG5cdFx0XHRcdFx0dCA9IG1bcGFyLmNoaWxkcmVuW2ldXS50ZXh0O1xuXHRcdFx0XHRcdGlmICghcykge1xuXHRcdFx0XHRcdFx0dCA9IHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHcpIHtcblx0XHRcdFx0XHRcdHQgPSB0LnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGRwYy5wdXNoKHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGkgPSAxO1xuXHRcdFx0XHR0ID0gbjtcblx0XHRcdFx0aWYgKCFzKSB7XG5cdFx0XHRcdFx0dCA9IHQudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodykge1xuXHRcdFx0XHRcdHQgPSB0LnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0d2hpbGUoJC5pbkFycmF5KHQsIGRwYykgIT09IC0xKSB7XG5cdFx0XHRcdFx0biA9IGNiLmNhbGwodGhpcywgdG1wLCAoKytpKSkudG9TdHJpbmcoKTtcblx0XHRcdFx0XHR0ID0gbjtcblx0XHRcdFx0XHRpZiAoIXMpIHtcblx0XHRcdFx0XHRcdHQgPSB0LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICh3KSB7XG5cdFx0XHRcdFx0XHR0ID0gdC5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRub2RlLnRleHQgPSBuO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHBhcmVudC5jcmVhdGVfbm9kZS5jYWxsKHRoaXMsIHBhciwgbm9kZSwgcG9zLCBjYWxsYmFjaywgaXNfbG9hZGVkKTtcblx0XHR9O1xuXHR9O1xuXG5cdC8vIGluY2x1ZGUgdGhlIHVuaXF1ZSBwbHVnaW4gYnkgZGVmYXVsdFxuXHQvLyAkLmpzdHJlZS5kZWZhdWx0cy5wbHVnaW5zLnB1c2goXCJ1bmlxdWVcIik7XG5cblxuLyoqXG4gKiAjIyMgV2hvbGVyb3cgcGx1Z2luXG4gKlxuICogTWFrZXMgZWFjaCBub2RlIGFwcGVhciBibG9jayBsZXZlbC4gTWFraW5nIHNlbGVjdGlvbiBlYXNpZXIuIE1heSBjYXVzZSBzbG93IGRvd24gZm9yIGxhcmdlIHRyZWVzIGluIG9sZCBicm93c2Vycy5cbiAqL1xuXG5cdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0ZGl2LnNldEF0dHJpYnV0ZSgndW5zZWxlY3RhYmxlJywnb24nKTtcblx0ZGl2LnNldEF0dHJpYnV0ZSgncm9sZScsJ3ByZXNlbnRhdGlvbicpO1xuXHRkaXYuY2xhc3NOYW1lID0gJ2pzdHJlZS13aG9sZXJvdyc7XG5cdGRpdi5pbm5lckhUTUwgPSAnJiMxNjA7Jztcblx0JC5qc3RyZWUucGx1Z2lucy53aG9sZXJvdyA9IGZ1bmN0aW9uIChvcHRpb25zLCBwYXJlbnQpIHtcblx0XHR0aGlzLmJpbmQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRwYXJlbnQuYmluZC5jYWxsKHRoaXMpO1xuXG5cdFx0XHR0aGlzLmVsZW1lbnRcblx0XHRcdFx0Lm9uKCdyZWFkeS5qc3RyZWUgc2V0X3N0YXRlLmpzdHJlZScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRoaXMuaGlkZV9kb3RzKCk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJpbml0LmpzdHJlZSBsb2FkaW5nLmpzdHJlZSByZWFkeS5qc3RyZWVcIiwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0Ly9kaXYuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fZGF0YS5jb3JlLmxpX2hlaWdodCArICdweCc7XG5cdFx0XHRcdFx0XHR0aGlzLmdldF9jb250YWluZXJfdWwoKS5hZGRDbGFzcygnanN0cmVlLXdob2xlcm93LXVsJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJkZXNlbGVjdF9hbGwuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZCgnLmpzdHJlZS13aG9sZXJvdy1jbGlja2VkJykucmVtb3ZlQ2xhc3MoJ2pzdHJlZS13aG9sZXJvdy1jbGlja2VkJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJjaGFuZ2VkLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dGhpcy5lbGVtZW50LmZpbmQoJy5qc3RyZWUtd2hvbGVyb3ctY2xpY2tlZCcpLnJlbW92ZUNsYXNzKCdqc3RyZWUtd2hvbGVyb3ctY2xpY2tlZCcpO1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IGZhbHNlLCBpLCBqO1xuXHRcdFx0XHRcdFx0Zm9yKGkgPSAwLCBqID0gZGF0YS5zZWxlY3RlZC5sZW5ndGg7IGkgPCBqOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0dG1wID0gdGhpcy5nZXRfbm9kZShkYXRhLnNlbGVjdGVkW2ldLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0aWYodG1wICYmIHRtcC5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHR0bXAuY2hpbGRyZW4oJy5qc3RyZWUtd2hvbGVyb3cnKS5hZGRDbGFzcygnanN0cmVlLXdob2xlcm93LWNsaWNrZWQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSlcblx0XHRcdFx0Lm9uKFwib3Blbl9ub2RlLmpzdHJlZVwiLCBmdW5jdGlvbiAoZSwgZGF0YSkge1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRfbm9kZShkYXRhLm5vZGUsIHRydWUpLmZpbmQoJy5qc3RyZWUtY2xpY2tlZCcpLnBhcmVudCgpLmNoaWxkcmVuKCcuanN0cmVlLXdob2xlcm93JykuYWRkQ2xhc3MoJ2pzdHJlZS13aG9sZXJvdy1jbGlja2VkJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJob3Zlcl9ub2RlLmpzdHJlZSBkZWhvdmVyX25vZGUuanN0cmVlXCIsIGZ1bmN0aW9uIChlLCBkYXRhKSB7XG5cdFx0XHRcdFx0XHRpZihlLnR5cGUgPT09IFwiaG92ZXJfbm9kZVwiICYmIHRoaXMuaXNfZGlzYWJsZWQoZGF0YS5ub2RlKSkgeyByZXR1cm47IH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0X25vZGUoZGF0YS5ub2RlLCB0cnVlKS5jaGlsZHJlbignLmpzdHJlZS13aG9sZXJvdycpW2UudHlwZSA9PT0gXCJob3Zlcl9ub2RlXCI/XCJhZGRDbGFzc1wiOlwicmVtb3ZlQ2xhc3NcIl0oJ2pzdHJlZS13aG9sZXJvdy1ob3ZlcmVkJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJjb250ZXh0bWVudS5qc3RyZWVcIiwgXCIuanN0cmVlLXdob2xlcm93XCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fZGF0YS5jb250ZXh0bWVudSkge1xuXHRcdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdHZhciB0bXAgPSAkLkV2ZW50KCdjb250ZXh0bWVudScsIHsgbWV0YUtleSA6IGUubWV0YUtleSwgY3RybEtleSA6IGUuY3RybEtleSwgYWx0S2V5IDogZS5hbHRLZXksIHNoaWZ0S2V5IDogZS5zaGlmdEtleSwgcGFnZVggOiBlLnBhZ2VYLCBwYWdlWSA6IGUucGFnZVkgfSk7XG5cdFx0XHRcdFx0XHRcdCQoZS5jdXJyZW50VGFyZ2V0KS5jbG9zZXN0KFwiLmpzdHJlZS1ub2RlXCIpLmNoaWxkcmVuKFwiLmpzdHJlZS1hbmNob3JcIikuZmlyc3QoKS50cmlnZ2VyKHRtcCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQvKiFcblx0XHRcdFx0Lm9uKFwibW91c2Vkb3duLmpzdHJlZSB0b3VjaHN0YXJ0LmpzdHJlZVwiLCBcIi5qc3RyZWUtd2hvbGVyb3dcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGlmKGUudGFyZ2V0ID09PSBlLmN1cnJlbnRUYXJnZXQpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGEgPSAkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChcIi5qc3RyZWUtbm9kZVwiKS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpO1xuXHRcdFx0XHRcdFx0XHRlLnRhcmdldCA9IGFbMF07XG5cdFx0XHRcdFx0XHRcdGEudHJpZ2dlcihlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQqL1xuXHRcdFx0XHQub24oXCJjbGljay5qc3RyZWVcIiwgXCIuanN0cmVlLXdob2xlcm93XCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9ICQuRXZlbnQoJ2NsaWNrJywgeyBtZXRhS2V5IDogZS5tZXRhS2V5LCBjdHJsS2V5IDogZS5jdHJsS2V5LCBhbHRLZXkgOiBlLmFsdEtleSwgc2hpZnRLZXkgOiBlLnNoaWZ0S2V5IH0pO1xuXHRcdFx0XHRcdFx0JChlLmN1cnJlbnRUYXJnZXQpLmNsb3Nlc3QoXCIuanN0cmVlLW5vZGVcIikuY2hpbGRyZW4oXCIuanN0cmVlLWFuY2hvclwiKS5maXJzdCgpLnRyaWdnZXIodG1wKS50cmlnZ2VyKCdmb2N1cycpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdC5vbihcImRibGNsaWNrLmpzdHJlZVwiLCBcIi5qc3RyZWUtd2hvbGVyb3dcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gJC5FdmVudCgnZGJsY2xpY2snLCB7IG1ldGFLZXkgOiBlLm1ldGFLZXksIGN0cmxLZXkgOiBlLmN0cmxLZXksIGFsdEtleSA6IGUuYWx0S2V5LCBzaGlmdEtleSA6IGUuc2hpZnRLZXkgfSk7XG5cdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChcIi5qc3RyZWUtbm9kZVwiKS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmZpcnN0KCkudHJpZ2dlcih0bXApLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKFwiY2xpY2suanN0cmVlXCIsIFwiLmpzdHJlZS1sZWFmID4gLmpzdHJlZS1vY2xcIiwgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0XHRcdGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHR2YXIgdG1wID0gJC5FdmVudCgnY2xpY2snLCB7IG1ldGFLZXkgOiBlLm1ldGFLZXksIGN0cmxLZXkgOiBlLmN0cmxLZXksIGFsdEtleSA6IGUuYWx0S2V5LCBzaGlmdEtleSA6IGUuc2hpZnRLZXkgfSk7XG5cdFx0XHRcdFx0XHQkKGUuY3VycmVudFRhcmdldCkuY2xvc2VzdChcIi5qc3RyZWUtbm9kZVwiKS5jaGlsZHJlbihcIi5qc3RyZWUtYW5jaG9yXCIpLmZpcnN0KCkudHJpZ2dlcih0bXApLnRyaWdnZXIoJ2ZvY3VzJyk7XG5cdFx0XHRcdFx0fS5iaW5kKHRoaXMpKVxuXHRcdFx0XHQub24oXCJtb3VzZW92ZXIuanN0cmVlXCIsIFwiLmpzdHJlZS13aG9sZXJvdywgLmpzdHJlZS1pY29uXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHRlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuaXNfZGlzYWJsZWQoZS5jdXJyZW50VGFyZ2V0KSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmhvdmVyX25vZGUoZS5jdXJyZW50VGFyZ2V0KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9LmJpbmQodGhpcykpXG5cdFx0XHRcdC5vbihcIm1vdXNlbGVhdmUuanN0cmVlXCIsIFwiLmpzdHJlZS1ub2RlXCIsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRlaG92ZXJfbm9kZShlLmN1cnJlbnRUYXJnZXQpO1xuXHRcdFx0XHRcdH0uYmluZCh0aGlzKSk7XG5cdFx0fTtcblx0XHR0aGlzLnRlYXJkb3duID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYodGhpcy5zZXR0aW5ncy53aG9sZXJvdykge1xuXHRcdFx0XHR0aGlzLmVsZW1lbnQuZmluZChcIi5qc3RyZWUtd2hvbGVyb3dcIikucmVtb3ZlKCk7XG5cdFx0XHR9XG5cdFx0XHRwYXJlbnQudGVhcmRvd24uY2FsbCh0aGlzKTtcblx0XHR9O1xuXHRcdHRoaXMucmVkcmF3X25vZGUgPSBmdW5jdGlvbihvYmosIGRlZXAsIGNhbGxiYWNrLCBmb3JjZV9yZW5kZXIpIHtcblx0XHRcdG9iaiA9IHBhcmVudC5yZWRyYXdfbm9kZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0aWYob2JqKSB7XG5cdFx0XHRcdHZhciB0bXAgPSBkaXYuY2xvbmVOb2RlKHRydWUpO1xuXHRcdFx0XHQvL3RtcC5zdHlsZS5oZWlnaHQgPSB0aGlzLl9kYXRhLmNvcmUubGlfaGVpZ2h0ICsgJ3B4Jztcblx0XHRcdFx0aWYoJC5pbkFycmF5KG9iai5pZCwgdGhpcy5fZGF0YS5jb3JlLnNlbGVjdGVkKSAhPT0gLTEpIHsgdG1wLmNsYXNzTmFtZSArPSAnIGpzdHJlZS13aG9sZXJvdy1jbGlja2VkJzsgfVxuXHRcdFx0XHRpZih0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCAmJiB0aGlzLl9kYXRhLmNvcmUuZm9jdXNlZCA9PT0gb2JqLmlkKSB7IHRtcC5jbGFzc05hbWUgKz0gJyBqc3RyZWUtd2hvbGVyb3ctaG92ZXJlZCc7IH1cblx0XHRcdFx0b2JqLmluc2VydEJlZm9yZSh0bXAsIG9iai5jaGlsZE5vZGVzWzBdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmo7XG5cdFx0fTtcblx0fTtcblx0Ly8gaW5jbHVkZSB0aGUgd2hvbGVyb3cgcGx1Z2luIGJ5IGRlZmF1bHRcblx0Ly8gJC5qc3RyZWUuZGVmYXVsdHMucGx1Z2lucy5wdXNoKFwid2hvbGVyb3dcIik7XG5cdGlmKHdpbmRvdy5jdXN0b21FbGVtZW50cyAmJiBPYmplY3QgJiYgT2JqZWN0LmNyZWF0ZSkge1xuXHRcdHZhciBwcm90byA9IE9iamVjdC5jcmVhdGUoSFRNTEVsZW1lbnQucHJvdG90eXBlKTtcblx0XHRwcm90by5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgYyA9IHsgY29yZSA6IHt9LCBwbHVnaW5zIDogW10gfSwgaTtcblx0XHRcdGZvcihpIGluICQuanN0cmVlLnBsdWdpbnMpIHtcblx0XHRcdFx0aWYoJC5qc3RyZWUucGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiB0aGlzLmF0dHJpYnV0ZXNbaV0pIHtcblx0XHRcdFx0XHRjLnBsdWdpbnMucHVzaChpKTtcblx0XHRcdFx0XHRpZih0aGlzLmdldEF0dHJpYnV0ZShpKSAmJiBKU09OLnBhcnNlKHRoaXMuZ2V0QXR0cmlidXRlKGkpKSkge1xuXHRcdFx0XHRcdFx0Y1tpXSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoaSkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0Zm9yKGkgaW4gJC5qc3RyZWUuZGVmYXVsdHMuY29yZSkge1xuXHRcdFx0XHRpZigkLmpzdHJlZS5kZWZhdWx0cy5jb3JlLmhhc093blByb3BlcnR5KGkpICYmIHRoaXMuYXR0cmlidXRlc1tpXSkge1xuXHRcdFx0XHRcdGMuY29yZVtpXSA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoaSkpIHx8IHRoaXMuZ2V0QXR0cmlidXRlKGkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHQkKHRoaXMpLmpzdHJlZShjKTtcblx0XHR9O1xuXHRcdC8vIHByb3RvLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uIChuYW1lLCBwcmV2aW91cywgdmFsdWUpIHsgfTtcblx0XHR0cnkge1xuXHRcdFx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZShcInZha2F0YS1qc3RyZWVcIiwgZnVuY3Rpb24oKSB7fSwgeyBwcm90b3R5cGU6IHByb3RvIH0pO1xuXHRcdH0gY2F0Y2ggKGlnbm9yZSkgeyB9XG5cdH1cblxufSkpOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJuYXZpZ2F0aW9uVGFibGUiLCJyZXF1aXJlIiwiJCIsImRvY3VtZW50IiwicmVhZHkiLCJpbml0aWFsaXplIiwibmF2aWdhdGlvblRyZWUiLCJzZWxlY3RvciIsIkRhdGFUYWJsZSIsImZpbmQiLCJvbiIsInRhYmxlUm93U2VsZWN0Iiwic2VsZWN0Rmlyc3RSb3ciLCJsb2FkTmF2aWdhdGlvblRyZWUiLCJyZXNldE5hdmlnYXRpb25UcmVlIiwiZSIsInRhcmdldCIsImlzIiwicm93cyIsImRlc2VsZWN0Iiwicm93IiwiaW5kZXgiLCJzZWxlY3QiLCJzZXR0aW5ncyIsImdldERhdGFUYWJsZUFwaSIsImFwaSIsInR5cGUiLCJpbmRleGVzIiwicm93RGF0YSIsImRhdGEiLCJsb2FkIiwicmVzZXQiLCJmbiIsImRhdGFUYWJsZSIsIkFwaSIsIm1vZHVsZSIsImV4cG9ydHMiLCIkdHJlZUNvbnRhaW5lciIsIiR0cmVlQ29udGVudCIsIiR0cmVlU2VhcmNoRmllbGQiLCIkdHJlZVByb2dyZXNzQmFyIiwiJGZvcm1Qcm9ncmVzc0JhciIsIiR0cmVlVXBkYXRlUHJvZ3Jlc3NCYXIiLCIkdHJlZU9yZGVyU2F2ZUJ0biIsIiRpZnJhbWUiLCJhamF4UmVxdWVzdCIsInRyZWVTZWFyY2hUaW1lb3V0IiwiY29uZmlnIiwibmF2aWdhdGlvblRyZWVVcmwiLCJuYXZpZ2F0aW9uTm9kZUZvcm1VcmxQcmVmaXgiLCJuYXZpZ2F0aW9uVHJlZUhpZXJhcmNoeVVwZGF0ZVVybCIsIm5hdmlnYXRpb25UcmVlTm9kZVR5cGVzIiwiZGVmYXVsdCIsImljb24iLCJuYXZpZ2F0aW9uIiwiY21zX3BhZ2UiLCJjYXRlZ29yeSIsImxpbmsiLCJleHRlcm5hbF91cmwiLCJvblRyZWVTYXZlT3JkZXJDbGljayIsImtleXVwIiwib25UcmVlU2VhcmNoS2V5dXAiLCJiaW5kIiwicmVtb3ZlQXR0ciIsImxvYWRUcmVlIiwiaWROYXZpZ2F0aW9uIiwic2VsZWN0ZWQiLCJza2lwRm9ybUxvYWQiLCJyZW1vdmVDbGFzcyIsImFkZENsYXNzIiwiYWJvcnQiLCJnZXQiLCJjcmVhdGVUcmVlTG9hZEhhbmRsZXIiLCJhbHdheXMiLCJyZXNldFRyZWUiLCJodG1sIiwicmVzZXRGb3JtIiwicmVzcG9uc2UiLCJpbml0SnNUcmVlIiwic2VsZWN0Tm9kZSIsInNldE5vZGVTZWxlY3RMaXN0ZW5lciIsImpzdHJlZSIsImNvcmUiLCJjaGVja19jYWxsYmFjayIsIm9wIiwibm9kZSIsInBhciIsInBvcyIsIm1vcmUiLCJkbmQiLCJyZWYiLCJpZE5hdmlnYXRpb25Ob2RlIiwicGx1Z2lucyIsInR5cGVzIiwiaXNfZHJhZ2dhYmxlIiwiaXRlbXMiLCJub2RlVG9TZWxlY3QiLCJzZWxlY3Rfbm9kZSIsImxvYWRGb3JtIiwidXJpIiwidXJsIiwicGFyYW0iLCJvZmYiLCJvbklmcmFtZUxvYWQiLCJjb250ZW50V2luZG93IiwibG9jYXRpb24iLCJyZXBsYWNlIiwiY2hhbmdlSWZyYW1lSGVpZ2h0IiwidHJlZVJlbG9hZGVyIiwiY29udGVudHMiLCJsZW5ndGgiLCJpZnJhbWVDb250ZW50SGVpZ2h0IiwiYm9keSIsInNjcm9sbEhlaWdodCIsImhlaWdodCIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJzZWFyY2giLCJ2YWwiLCJqc3RyZWVEYXRhIiwiZ2V0X2pzb24iLCJwYXJhbXMiLCJpZF9uYXZpZ2F0aW9uIiwibm9kZXMiLCJnZXROYXZpZ2F0aW9uTm9kZXNSZWN1cnNpdmVseSIsInBvc3QiLCJ3aW5kb3ciLCJzd2VldEFsZXJ0IiwidGl0bGUiLCJzdWNjZXNzIiwidGV4dCIsIm1lc3NhZ2UiLCJhdHRyIiwianN0cmVlTm9kZSIsImVhY2giLCJjaGlsZHJlbiIsImkiLCJjaGlsZE5vZGUiLCJuYXZpZ2F0aW9uTm9kZSIsIm5hdmlnYXRpb25fbm9kZSIsImlkX25hdmlnYXRpb25fbm9kZSIsInBvc2l0aW9uIiwicHVzaCJdLCJzb3VyY2VSb290IjoiIn0=