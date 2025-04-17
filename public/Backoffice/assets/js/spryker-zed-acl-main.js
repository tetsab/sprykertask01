"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-acl-main"],{

/***/ "./vendor/spryker/acl/assets/Zed/js/modules/legacy/helpers.js":
/*!********************************************************************!*\
  !*** ./vendor/spryker/acl/assets/Zed/js/modules/legacy/helpers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var SprykerAlert = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAlert */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAlert.js");
/* provided dependency */ var SprykerAjax = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjax */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js");
/* provided dependency */ var SprykerAjaxCallbacks = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjaxCallbacks.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



function spinnerCreate(elementId) {
  var container = $('<div/>', {
    class: 'sk-spinner sk-spinner-circle'
  });
  for (var I = 1; I <= 12; I++) {
    var circle = $('<div>', {
      class: 'sk-circle sk-circle' + I
    }).appendTo(container);
  }
  $(elementId).html(container);
}
function spinnerClear() {
  $('.group-spinner-container').html('');
}
function GroupModalMemoization() {
  var self = this;
  var cached = {};
  self.hasMember = function (memberId) {
    return !!cached[memberId];
  };
  self.saveMember = function (memberId, data) {
    cached[memberId] = data;
  };
  self.getMember = function (memberId) {
    return cached[memberId];
  };
}
function GroupModal(elementId) {
  var self = this;
  self.content = null;
  self.init = function () {
    self.content = $('<ul/>', {
      id: 'group-body-list'
    });
  };
  self.addGroupRoleElement = function (role) {
    $('<li/>', {
      class: 'role-item',
      text: role.Name
    }).appendTo(self.content);
  };
  self.showModal = function () {
    SprykerAlert.custom(self.content, 'Roles in Group');
  };
  self.init();
}
var memoize = new GroupModalMemoization();
SprykerAjax.getRolesForGroup = function (idGroup) {
  var options = {
    'id-group': idGroup
  };
  if (memoize.hasMember(idGroup)) {
    SprykerAjaxCallbacks.displayGroupRoles(memoize.getMember(idGroup));
  } else {
    spinnerCreate('#group-spinner-' + idGroup);
    this.setUrl('/acl/group/roles').ajaxSubmit(options, 'displayGroupRoles');
  }
};
SprykerAjax.removeUserFromGroup = function (options) {
  var ajaxOptions = {
    'id-group': parseInt(options.idGroup),
    'id-user': parseInt(options.idUser)
  };
  if (!confirm('Are you sure you want to detele this user from this group ?')) {
    return false;
  }
  if (ajaxOptions.idGroup < 1 || ajaxOptions.idUser < 1) {
    SprykerAlert.error('User Id and Group Id cannot be null');
    return false;
  }
  this.setUrl('/acl/group/remove-user-from-group').ajaxSubmit(ajaxOptions, 'removeUserRowFromGroupTable');
};
SprykerAjaxCallbacks.displayGroupRoles = function (ajaxResponse) {
  if (ajaxResponse.code == this.codeSuccess) {
    if (ajaxResponse.data.length > 0) {
      var groupModal = new GroupModal('#modal-body');
      if (!memoize.hasMember(ajaxResponse.idGroup)) {
        memoize.saveMember(ajaxResponse.idGroup, ajaxResponse);
      }
      ajaxResponse.data.forEach(function (role) {
        groupModal.addGroupRoleElement(role);
      });
      groupModal.showModal();
    }
  }
  spinnerClear();
};
SprykerAjaxCallbacks.removeUserRowFromGroupTable = function (ajaxResponse) {
  if (ajaxResponse.code == this.codeSuccess) {
    var tableRow = $('#row-' + ajaxResponse['id-user'] + '-' + ajaxResponse['id-group']).closest('tr');
    tableRow.addClass('removed-group-user');
    tableRow.fadeOut('slow', function () {
      tableRow.remove();
    });
    return false;
  }
  SprykerAlert.error(ajaxResponse.message);
};

/***/ }),

/***/ "./vendor/spryker/acl/assets/Zed/js/modules/legacy/logic.js":
/*!******************************************************************!*\
  !*** ./vendor/spryker/acl/assets/Zed/js/modules/legacy/logic.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* provided dependency */ var SprykerAjax = __webpack_require__(/*! gui/assets/Zed/js/modules/legacy/SprykerAjax */ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAjax.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./helpers.js */ "./vendor/spryker/acl/assets/Zed/js/modules/legacy/helpers.js");
$(document).ready(function () {
  $('#group-table').on('click', 'a.display-roles', function (event) {
    event.preventDefault();
    var idGroup = $(this).attr('id').replace('group-', '');
    SprykerAjax.getRolesForGroup(idGroup);
  });
  $('#users-in-group').on('click', 'a', function (event) {
    event.preventDefault();
    var options = $(this).data('options');
    SprykerAjax.removeUserFromGroup(options);
  });
});

/***/ }),

/***/ "./vendor/spryker/acl/assets/Zed/js/modules/main.js":
/*!**********************************************************!*\
  !*** ./vendor/spryker/acl/assets/Zed/js/modules/main.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./legacy/logic */ "./vendor/spryker/acl/assets/Zed/js/modules/legacy/logic.js");
__webpack_require__(/*! ../../sass/main.scss */ "./vendor/spryker/acl/assets/Zed/sass/main.scss");

/***/ }),

/***/ "./vendor/spryker/acl/assets/Zed/js/spryker-zed-acl-main.entry.js":
/*!************************************************************************!*\
  !*** ./vendor/spryker/acl/assets/Zed/js/spryker-zed-acl-main.entry.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/acl/assets/Zed/js/modules/main.js");

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

/***/ }),

/***/ "./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAlert.js":
/*!*************************************************************************!*\
  !*** ./vendor/spryker/gui/assets/Zed/js/modules/legacy/SprykerAlert.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



module.exports = new function () {
  var self = this;
  self.init = function () {
    self.clean();
  };
  self.success = function (message) {
    var data = {
      message: message,
      title: 'Success'
    };
    self.clangeClass('alert-success');
    self.displayAlert(data);
  };
  self.error = function (message) {
    var data = {
      message: message,
      title: 'Error'
    };
    self.clangeClass('alert-danger');
    self.displayAlert(data);
  };
  self.info = function (message) {
    return self.custom(message);
  };
  self.custom = function (message, title) {
    var data = {
      message: message,
      title: title || 'Info'
    };
    self.clangeClass('alert-info');
    self.displayAlert(data);
  };
  self.clean = function () {
    $('#modal-content').removeClass(['alert-success', 'alert-danger', 'alert-info', 'alert-warning']);
    $('#modal-title').html('');
    $('#modal-body').html('');
  };
  self.clangeClass = function (className) {
    self.clean();
    $('#modal-content').addClass(className);
  };
  self.displayAlert = function (options) {
    $('#modal-title').html(options.title);
    $('#modal-body').html(options.message);
    self.show();
  };
  self.show = function () {
    $('#modal-alert').modal('show');
  };
  self.init();
}();

/***/ }),

/***/ "./vendor/spryker/acl/assets/Zed/sass/main.scss":
/*!******************************************************!*\
  !*** ./vendor/spryker/acl/assets/Zed/sass/main.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/acl/assets/Zed/js/spryker-zed-acl-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDMEUsS0FBSyxDQUFDLENBQUM7SUFDWmxGLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDa0QsUUFBUSxDQUFDdUMsU0FBUyxDQUFDO0VBQzNDLENBQUM7RUFDRGpGLElBQUksQ0FBQzhFLFlBQVksR0FBRyxVQUFVeEQsT0FBTyxFQUFFO0lBQ25DOUIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDSyxJQUFJLENBQUN5QixPQUFPLENBQUNzRCxLQUFLLENBQUM7SUFDckNwRixDQUFDLENBQUMsYUFBYSxDQUFDLENBQUNLLElBQUksQ0FBQ3lCLE9BQU8sQ0FBQ3VCLE9BQU8sQ0FBQztJQUN0QzdDLElBQUksQ0FBQ2tGLElBQUksQ0FBQyxDQUFDO0VBQ2YsQ0FBQztFQUNEbEYsSUFBSSxDQUFDa0YsSUFBSSxHQUFHLFlBQVk7SUFDcEIxRixDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMyRixLQUFLLENBQUMsTUFBTSxDQUFDO0VBQ25DLENBQUM7RUFDRG5GLElBQUksQ0FBQ1MsSUFBSSxDQUFDLENBQUM7QUFDZixDQUFDLENBQUUsQ0FBQzs7Ozs7Ozs7Ozs7QUN6REoiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9hY2wvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xlZ2FjeS9oZWxwZXJzLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2FjbC9hc3NldHMvWmVkL2pzL21vZHVsZXMvbGVnYWN5L2xvZ2ljLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2FjbC9hc3NldHMvWmVkL2pzL21vZHVsZXMvbWFpbi5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9hY2wvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1hY2wtbWFpbi5lbnRyeS5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xlZ2FjeS9TcHJ5a2VyQWpheC5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xlZ2FjeS9TcHJ5a2VyQWpheENhbGxiYWNrcy5qcyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2xlZ2FjeS9TcHJ5a2VyQWxlcnQuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvYWNsL2Fzc2V0cy9aZWQvc2Fzcy9tYWluLnNjc3M/MTNiOSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHNwaW5uZXJDcmVhdGUoZWxlbWVudElkKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9ICQoJzxkaXYvPicsIHtcbiAgICAgICAgY2xhc3M6ICdzay1zcGlubmVyIHNrLXNwaW5uZXItY2lyY2xlJyxcbiAgICB9KTtcbiAgICBmb3IgKHZhciBJID0gMTsgSSA8PSAxMjsgSSsrKSB7XG4gICAgICAgIHZhciBjaXJjbGUgPSAkKCc8ZGl2PicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnc2stY2lyY2xlIHNrLWNpcmNsZScgKyBJLFxuICAgICAgICB9KS5hcHBlbmRUbyhjb250YWluZXIpO1xuICAgIH1cbiAgICAkKGVsZW1lbnRJZCkuaHRtbChjb250YWluZXIpO1xufVxuXG5mdW5jdGlvbiBzcGlubmVyQ2xlYXIoKSB7XG4gICAgJCgnLmdyb3VwLXNwaW5uZXItY29udGFpbmVyJykuaHRtbCgnJyk7XG59XG5cbmZ1bmN0aW9uIEdyb3VwTW9kYWxNZW1vaXphdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB2YXIgY2FjaGVkID0ge307XG5cbiAgICBzZWxmLmhhc01lbWJlciA9IGZ1bmN0aW9uIChtZW1iZXJJZCkge1xuICAgICAgICByZXR1cm4gISFjYWNoZWRbbWVtYmVySWRdO1xuICAgIH07XG5cbiAgICBzZWxmLnNhdmVNZW1iZXIgPSBmdW5jdGlvbiAobWVtYmVySWQsIGRhdGEpIHtcbiAgICAgICAgY2FjaGVkW21lbWJlcklkXSA9IGRhdGE7XG4gICAgfTtcblxuICAgIHNlbGYuZ2V0TWVtYmVyID0gZnVuY3Rpb24gKG1lbWJlcklkKSB7XG4gICAgICAgIHJldHVybiBjYWNoZWRbbWVtYmVySWRdO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIEdyb3VwTW9kYWwoZWxlbWVudElkKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuY29udGVudCA9IG51bGw7XG5cbiAgICBzZWxmLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuY29udGVudCA9ICQoJzx1bC8+Jywge1xuICAgICAgICAgICAgaWQ6ICdncm91cC1ib2R5LWxpc3QnLFxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi5hZGRHcm91cFJvbGVFbGVtZW50ID0gZnVuY3Rpb24gKHJvbGUpIHtcbiAgICAgICAgJCgnPGxpLz4nLCB7XG4gICAgICAgICAgICBjbGFzczogJ3JvbGUtaXRlbScsXG4gICAgICAgICAgICB0ZXh0OiByb2xlLk5hbWUsXG4gICAgICAgIH0pLmFwcGVuZFRvKHNlbGYuY29udGVudCk7XG4gICAgfTtcblxuICAgIHNlbGYuc2hvd01vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBTcHJ5a2VyQWxlcnQuY3VzdG9tKHNlbGYuY29udGVudCwgJ1JvbGVzIGluIEdyb3VwJyk7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdCgpO1xufVxuXG52YXIgbWVtb2l6ZSA9IG5ldyBHcm91cE1vZGFsTWVtb2l6YXRpb24oKTtcblxuU3ByeWtlckFqYXguZ2V0Um9sZXNGb3JHcm91cCA9IGZ1bmN0aW9uIChpZEdyb3VwKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICdpZC1ncm91cCc6IGlkR3JvdXAsXG4gICAgfTtcbiAgICBpZiAobWVtb2l6ZS5oYXNNZW1iZXIoaWRHcm91cCkpIHtcbiAgICAgICAgU3ByeWtlckFqYXhDYWxsYmFja3MuZGlzcGxheUdyb3VwUm9sZXMobWVtb2l6ZS5nZXRNZW1iZXIoaWRHcm91cCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNwaW5uZXJDcmVhdGUoJyNncm91cC1zcGlubmVyLScgKyBpZEdyb3VwKTtcbiAgICAgICAgdGhpcy5zZXRVcmwoJy9hY2wvZ3JvdXAvcm9sZXMnKS5hamF4U3VibWl0KG9wdGlvbnMsICdkaXNwbGF5R3JvdXBSb2xlcycpO1xuICAgIH1cbn07XG5cblNwcnlrZXJBamF4LnJlbW92ZVVzZXJGcm9tR3JvdXAgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIHZhciBhamF4T3B0aW9ucyA9IHtcbiAgICAgICAgJ2lkLWdyb3VwJzogcGFyc2VJbnQob3B0aW9ucy5pZEdyb3VwKSxcbiAgICAgICAgJ2lkLXVzZXInOiBwYXJzZUludChvcHRpb25zLmlkVXNlciksXG4gICAgfTtcbiAgICBpZiAoIWNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZXRlbGUgdGhpcyB1c2VyIGZyb20gdGhpcyBncm91cCA/JykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYWpheE9wdGlvbnMuaWRHcm91cCA8IDEgfHwgYWpheE9wdGlvbnMuaWRVc2VyIDwgMSkge1xuICAgICAgICBTcHJ5a2VyQWxlcnQuZXJyb3IoJ1VzZXIgSWQgYW5kIEdyb3VwIElkIGNhbm5vdCBiZSBudWxsJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zZXRVcmwoJy9hY2wvZ3JvdXAvcmVtb3ZlLXVzZXItZnJvbS1ncm91cCcpLmFqYXhTdWJtaXQoYWpheE9wdGlvbnMsICdyZW1vdmVVc2VyUm93RnJvbUdyb3VwVGFibGUnKTtcbn07XG5cblNwcnlrZXJBamF4Q2FsbGJhY2tzLmRpc3BsYXlHcm91cFJvbGVzID0gZnVuY3Rpb24gKGFqYXhSZXNwb25zZSkge1xuICAgIGlmIChhamF4UmVzcG9uc2UuY29kZSA9PSB0aGlzLmNvZGVTdWNjZXNzKSB7XG4gICAgICAgIGlmIChhamF4UmVzcG9uc2UuZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgZ3JvdXBNb2RhbCA9IG5ldyBHcm91cE1vZGFsKCcjbW9kYWwtYm9keScpO1xuICAgICAgICAgICAgaWYgKCFtZW1vaXplLmhhc01lbWJlcihhamF4UmVzcG9uc2UuaWRHcm91cCkpIHtcbiAgICAgICAgICAgICAgICBtZW1vaXplLnNhdmVNZW1iZXIoYWpheFJlc3BvbnNlLmlkR3JvdXAsIGFqYXhSZXNwb25zZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhamF4UmVzcG9uc2UuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChyb2xlKSB7XG4gICAgICAgICAgICAgICAgZ3JvdXBNb2RhbC5hZGRHcm91cFJvbGVFbGVtZW50KHJvbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBncm91cE1vZGFsLnNob3dNb2RhbCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNwaW5uZXJDbGVhcigpO1xufTtcblxuU3ByeWtlckFqYXhDYWxsYmFja3MucmVtb3ZlVXNlclJvd0Zyb21Hcm91cFRhYmxlID0gZnVuY3Rpb24gKGFqYXhSZXNwb25zZSkge1xuICAgIGlmIChhamF4UmVzcG9uc2UuY29kZSA9PSB0aGlzLmNvZGVTdWNjZXNzKSB7XG4gICAgICAgIHZhciB0YWJsZVJvdyA9ICQoJyNyb3ctJyArIGFqYXhSZXNwb25zZVsnaWQtdXNlciddICsgJy0nICsgYWpheFJlc3BvbnNlWydpZC1ncm91cCddKS5jbG9zZXN0KCd0cicpO1xuICAgICAgICB0YWJsZVJvdy5hZGRDbGFzcygncmVtb3ZlZC1ncm91cC11c2VyJyk7XG4gICAgICAgIHRhYmxlUm93LmZhZGVPdXQoJ3Nsb3cnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0YWJsZVJvdy5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBTcHJ5a2VyQWxlcnQuZXJyb3IoYWpheFJlc3BvbnNlLm1lc3NhZ2UpO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9oZWxwZXJzLmpzJyk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKCcjZ3JvdXAtdGFibGUnKS5vbignY2xpY2snLCAnYS5kaXNwbGF5LXJvbGVzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBpZEdyb3VwID0gJCh0aGlzKS5hdHRyKCdpZCcpLnJlcGxhY2UoJ2dyb3VwLScsICcnKTtcbiAgICAgICAgU3ByeWtlckFqYXguZ2V0Um9sZXNGb3JHcm91cChpZEdyb3VwKTtcbiAgICB9KTtcblxuICAgICQoJyN1c2Vycy1pbi1ncm91cCcpLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBvcHRpb25zID0gJCh0aGlzKS5kYXRhKCdvcHRpb25zJyk7XG4gICAgICAgIFNwcnlrZXJBamF4LnJlbW92ZVVzZXJGcm9tR3JvdXAob3B0aW9ucyk7XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9sZWdhY3kvbG9naWMnKTtcbnJlcXVpcmUoJy4uLy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnJlcXVpcmUoJy4vbW9kdWxlcy9tYWluJyk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBTcHJ5a2VyQWpheENhbGxiYWNrcyA9IHJlcXVpcmUoJy4vU3ByeWtlckFqYXhDYWxsYmFja3MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiogaWYgYWpheCB1cmwgaXMgbnVsbCwgdGhlIGFjdGlvbiB3aWxsIGJlIGluIHRoZSBzYW1lIHBhZ2UgKi9cbiAgICBzZWxmLnVybCA9IG51bGw7XG5cbiAgICBzZWxmLmRhdGFUeXBlID0gJ2pzb24nO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5ld1VybFxuICAgICAqIEByZXR1cm5zIHtTcHJ5a2VyQWpheH1cbiAgICAgKi9cbiAgICBzZWxmLnNldFVybCA9IGZ1bmN0aW9uIChuZXdVcmwpIHtcbiAgICAgICAgc2VsZi51cmwgPSBuZXdVcmw7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmV3RGF0YVR5cGVcbiAgICAgKiBAcmV0dXJucyB7U3ByeWtlckFqYXh9XG4gICAgICovXG4gICAgc2VsZi5zZXREYXRhVHlwZSA9IGZ1bmN0aW9uIChuZXdEYXRhVHlwZSkge1xuICAgICAgICBzZWxmLmRhdGFUeXBlID0gbmV3RGF0YVR5cGU7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFqYXhTdWJtaXQgPSBmdW5jdGlvbiAob3B0aW9ucywgY2FsbGJhY2tGdW5jdGlvbiwgcGFyYW1ldGVycywgaXNHZXQpIHtcbiAgICAgICAgdmFyIGNhbGxUeXBlID0gISFpc0dldCA/ICdnZXQnIDogJ3Bvc3QnO1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogdGhpcy51cmwsXG4gICAgICAgICAgICB0eXBlOiBjYWxsVHlwZSxcbiAgICAgICAgICAgIGRhdGFUeXBlOiB0aGlzLmRhdGFUeXBlLFxuICAgICAgICAgICAgZGF0YTogb3B0aW9ucyxcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2tGdW5jdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFja0Z1bmN0aW9uKHJlc3BvbnNlLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhbGxiYWNrRnVuY3Rpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFNwcnlrZXJBamF4Q2FsbGJhY2tzW2NhbGxiYWNrRnVuY3Rpb25dKHJlc3BvbnNlLCBwYXJhbWV0ZXJzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyogY2hhbmdlIGFjdGl2ZSAgKi9cbiAgICBzZWxmLmNoYW5nZUFjdGl2ZVN0YXR1cyA9IGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBpZDogZWxlbWVudElkLFxuICAgICAgICB9O1xuICAgICAgICBzZWxmLmFqYXhTdWJtaXQob3B0aW9ucywgJ2NoYW5nZVN0YXR1c01hcmtJbkdyaWQnKTtcbiAgICB9O1xufSkoKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiBIVE1MIHN1Y2Nlc3MgY29kZSAqL1xuICAgIHNlbGYuY29kZVN1Y2Nlc3MgPSAyMDA7XG5cbiAgICAvKipcbiAgICAgKiBSZXNwb25zZTpcbiAgICAgKiA8Y29kZT5cbiAgICAgKiAge1xuICAgICAqICAgICAgXCJjb2RlXCI6IDIwMCxcbiAgICAgKiAgICAgIFwibmV3U3RhdHVzXCI6IHRydWV8ZmFsc2UsXG4gICAgICogICAgICBcImlkXCI6IDEsXG4gICAgICogICAgICBcIm1lc3NhZ2VcIjogXCJtZXNzYWdlIGlmIHNvbWV0aGluZyB3ZW50IHdyb25nXCJcbiAgICAgKiAgfVxuICAgICAqIDwvY29kZT5cbiAgICAgKiBAcGFyYW0gYWpheFJlc3BvbnNlXG4gICAgICovXG4gICAgc2VsZi5jaGFuZ2VTdGF0dXNNYXJrSW5HcmlkID0gZnVuY3Rpb24gKGFqYXhSZXNwb25zZSkge1xuICAgICAgICBpZiAoYWpheFJlc3BvbnNlLmNvZGUgPT0gc2VsZi5jb2RlU3VjY2Vzcykge1xuICAgICAgICAgICAgJCgnI2FjdGl2ZS0nICsgYWpheFJlc3BvbnNlLmlkKS5wcm9wKCdjaGVja2VkJywgYWpheFJlc3BvbnNlLm5ld1N0YXR1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmFsZXJ0ZXIuZXJyb3IoYWpheFJlc3BvbnNlLm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5jbGVhbigpO1xuICAgIH07XG4gICAgc2VsZi5zdWNjZXNzID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5jbGFuZ2VDbGFzcygnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICBzZWxmLmRpc3BsYXlBbGVydChkYXRhKTtcbiAgICB9O1xuICAgIHNlbGYuZXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICB0aXRsZTogJ0Vycm9yJyxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5jbGFuZ2VDbGFzcygnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIHNlbGYuZGlzcGxheUFsZXJ0KGRhdGEpO1xuICAgIH07XG4gICAgc2VsZi5pbmZvID0gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuY3VzdG9tKG1lc3NhZ2UpO1xuICAgIH07XG4gICAgc2VsZi5jdXN0b20gPSBmdW5jdGlvbiAobWVzc2FnZSwgdGl0bGUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlIHx8ICdJbmZvJyxcbiAgICAgICAgfTtcbiAgICAgICAgc2VsZi5jbGFuZ2VDbGFzcygnYWxlcnQtaW5mbycpO1xuICAgICAgICBzZWxmLmRpc3BsYXlBbGVydChkYXRhKTtcbiAgICB9O1xuICAgIHNlbGYuY2xlYW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJyNtb2RhbC1jb250ZW50JykucmVtb3ZlQ2xhc3MoWydhbGVydC1zdWNjZXNzJywgJ2FsZXJ0LWRhbmdlcicsICdhbGVydC1pbmZvJywgJ2FsZXJ0LXdhcm5pbmcnXSk7XG4gICAgICAgICQoJyNtb2RhbC10aXRsZScpLmh0bWwoJycpO1xuICAgICAgICAkKCcjbW9kYWwtYm9keScpLmh0bWwoJycpO1xuICAgIH07XG4gICAgc2VsZi5jbGFuZ2VDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgc2VsZi5jbGVhbigpO1xuICAgICAgICAkKCcjbW9kYWwtY29udGVudCcpLmFkZENsYXNzKGNsYXNzTmFtZSk7XG4gICAgfTtcbiAgICBzZWxmLmRpc3BsYXlBbGVydCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICQoJyNtb2RhbC10aXRsZScpLmh0bWwob3B0aW9ucy50aXRsZSk7XG4gICAgICAgICQoJyNtb2RhbC1ib2R5JykuaHRtbChvcHRpb25zLm1lc3NhZ2UpO1xuICAgICAgICBzZWxmLnNob3coKTtcbiAgICB9O1xuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnI21vZGFsLWFsZXJ0JykubW9kYWwoJ3Nob3cnKTtcbiAgICB9O1xuICAgIHNlbGYuaW5pdCgpO1xufSkoKTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJzcGlubmVyQ3JlYXRlIiwiZWxlbWVudElkIiwiY29udGFpbmVyIiwiJCIsImNsYXNzIiwiSSIsImNpcmNsZSIsImFwcGVuZFRvIiwiaHRtbCIsInNwaW5uZXJDbGVhciIsIkdyb3VwTW9kYWxNZW1vaXphdGlvbiIsInNlbGYiLCJjYWNoZWQiLCJoYXNNZW1iZXIiLCJtZW1iZXJJZCIsInNhdmVNZW1iZXIiLCJkYXRhIiwiZ2V0TWVtYmVyIiwiR3JvdXBNb2RhbCIsImNvbnRlbnQiLCJpbml0IiwiaWQiLCJhZGRHcm91cFJvbGVFbGVtZW50Iiwicm9sZSIsInRleHQiLCJOYW1lIiwic2hvd01vZGFsIiwiU3ByeWtlckFsZXJ0IiwiY3VzdG9tIiwibWVtb2l6ZSIsIlNwcnlrZXJBamF4IiwiZ2V0Um9sZXNGb3JHcm91cCIsImlkR3JvdXAiLCJvcHRpb25zIiwiU3ByeWtlckFqYXhDYWxsYmFja3MiLCJkaXNwbGF5R3JvdXBSb2xlcyIsInNldFVybCIsImFqYXhTdWJtaXQiLCJyZW1vdmVVc2VyRnJvbUdyb3VwIiwiYWpheE9wdGlvbnMiLCJwYXJzZUludCIsImlkVXNlciIsImNvbmZpcm0iLCJlcnJvciIsImFqYXhSZXNwb25zZSIsImNvZGUiLCJjb2RlU3VjY2VzcyIsImxlbmd0aCIsImdyb3VwTW9kYWwiLCJmb3JFYWNoIiwicmVtb3ZlVXNlclJvd0Zyb21Hcm91cFRhYmxlIiwidGFibGVSb3ciLCJjbG9zZXN0IiwiYWRkQ2xhc3MiLCJmYWRlT3V0IiwicmVtb3ZlIiwibWVzc2FnZSIsInJlcXVpcmUiLCJkb2N1bWVudCIsInJlYWR5Iiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXR0ciIsInJlcGxhY2UiLCJtb2R1bGUiLCJleHBvcnRzIiwidXJsIiwiZGF0YVR5cGUiLCJuZXdVcmwiLCJzZXREYXRhVHlwZSIsIm5ld0RhdGFUeXBlIiwiY2FsbGJhY2tGdW5jdGlvbiIsInBhcmFtZXRlcnMiLCJpc0dldCIsImNhbGxUeXBlIiwiYWpheCIsInR5cGUiLCJkb25lIiwicmVzcG9uc2UiLCJjaGFuZ2VBY3RpdmVTdGF0dXMiLCJjaGFuZ2VTdGF0dXNNYXJrSW5HcmlkIiwicHJvcCIsIm5ld1N0YXR1cyIsImFsZXJ0ZXIiLCJjbGVhbiIsInN1Y2Nlc3MiLCJ0aXRsZSIsImNsYW5nZUNsYXNzIiwiZGlzcGxheUFsZXJ0IiwiaW5mbyIsInJlbW92ZUNsYXNzIiwiY2xhc3NOYW1lIiwic2hvdyIsIm1vZGFsIl0sInNvdXJjZVJvb3QiOiIifQ==