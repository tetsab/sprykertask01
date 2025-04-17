"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["comparison-product-toggler"],{

/***/ "./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COMPARISON_STORAGE_KEY: () => (/* binding */ COMPARISON_STORAGE_KEY),
/* harmony export */   "default": () => (/* binding */ ComparisonLink)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

var COMPARISON_STORAGE_KEY = 'comparison-skus';
class ComparisonLink extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  readyCallback() {}
  init() {
    this.querySelector("." + this.jsName + "__link").addEventListener('click', event => this.redirect(event));
  }
  redirect(event) {
    var _JSON$parse;
    event.preventDefault();
    var skus = (_JSON$parse = JSON.parse(localStorage.getItem(COMPARISON_STORAGE_KEY))) != null ? _JSON$parse : [];
    window.location.href = skus.length ? this.url + "?&skus=" + skus.join(',') : this.url;
  }
  get url() {
    return this.getAttribute('url');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-product-toggler/comparison-product-toggler.ts":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-product-toggler/comparison-product-toggler.ts ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ComparisonProductToggler)
/* harmony export */ });
/* harmony import */ var ShopUi_components_organisms_dynamic_notification_area_dynamic_notification_area__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/organisms/dynamic-notification-area/dynamic-notification-area */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/organisms/dynamic-notification-area/dynamic-notification-area.ts");
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../comparison-link/comparison-link */ "./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts");



class ComparisonProductToggler extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);
    this.skus = [];
    this.buttonPlaceholder = void 0;
    this.button = void 0;
    this.addTemplate = void 0;
    this.removeTemplate = void 0;
  }
  readyCallback() {}
  init() {
    var _this$querySelector, _this$querySelector2;
    this.buttonPlaceholder = this.querySelector("." + this.jsName + "__button-placeholder");
    this.button = this.querySelector("." + this.jsName + "__button");
    this.addTemplate = (_this$querySelector = this.querySelector("." + this.jsName + "__add-template")) == null ? void 0 : _this$querySelector.innerHTML;
    this.removeTemplate = (_this$querySelector2 = this.querySelector("." + this.jsName + "__remove-template")) == null ? void 0 : _this$querySelector2.innerHTML;
    this.updateStaleState();
    this.button.addEventListener('click', event => this.toggle(event));
    window.addEventListener('storage', event => {
      if (event.key === _comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_2__.COMPARISON_STORAGE_KEY) {
        this.updateStaleState();
      }
    });
  }
  toggle(event) {
    var _this$querySelector3;
    event.preventDefault();
    var hasSku = this.skus.includes(this.sku);
    var messagesKey = this.skus.length >= this.maxItems && !hasSku ? 'max' : hasSku ? 'remove' : 'success';
    document.dispatchEvent(new CustomEvent(ShopUi_components_organisms_dynamic_notification_area_dynamic_notification_area__WEBPACK_IMPORTED_MODULE_0__.EVENT_UPDATE_DYNAMIC_MESSAGES, {
      detail: (_this$querySelector3 = this.querySelector("." + this.jsName + "__" + messagesKey + "-message-template")) == null ? void 0 : _this$querySelector3.innerHTML
    }));
    if (this.skus.length >= this.maxItems && !hasSku) {
      return;
    }
    this.skus = hasSku ? this.skus.filter(item => item !== this.sku) : [...this.skus, this.sku];
    localStorage.setItem(_comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_2__.COMPARISON_STORAGE_KEY, JSON.stringify(this.skus));
    this.redirect(hasSku);
    this.updateButtonTemplate();
  }
  updateStaleState() {
    var _JSON$parse;
    this.skus = (_JSON$parse = JSON.parse(localStorage.getItem(_comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_2__.COMPARISON_STORAGE_KEY))) != null ? _JSON$parse : [];
    this.updateButtonTemplate();
  }
  redirect(hasSku) {
    var url = this.url + "?&skus=" + this.skus.join(',');
    var updateOnAdd = !hasSku && this.skus.length >= this.redirectLength;
    var updateOnRemove = hasSku && this.updateUrlOnRemove;
    if (updateOnAdd || updateOnRemove) {
      window.location.href = url;
      this.button.disabled = true;
    }
  }
  updateButtonTemplate() {
    if (!this.buttonPlaceholder || !this.removeTemplate.length || !this.addTemplate.length) {
      return;
    }
    this.buttonPlaceholder.innerHTML = this.skus.includes(this.sku) ? this.removeTemplate : this.addTemplate;
  }
  get maxItems() {
    return Number(this.getAttribute('maxItems'));
  }
  get url() {
    return this.getAttribute('url');
  }
  get sku() {
    return this.getAttribute('sku');
  }
  get redirectLength() {
    return Number(this.getAttribute('redirectLength'));
  }
  get updateUrlOnRemove() {
    return this.hasAttribute('updateUrlOnRemove');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/organisms/dynamic-notification-area/dynamic-notification-area.ts":
/*!***********************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/organisms/dynamic-notification-area/dynamic-notification-area.ts ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_UPDATE_DYNAMIC_MESSAGES: () => (/* binding */ EVENT_UPDATE_DYNAMIC_MESSAGES),
/* harmony export */   "default": () => (/* binding */ DynamicNotificationArea)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");



/**
 * @event updateDynamicMessages An event emitted when need to update messages.
 */
var EVENT_UPDATE_DYNAMIC_MESSAGES = 'updateDynamicMessages';
class DynamicNotificationArea extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.target = void 0;
  }
  readyCallback() {}
  init() {
    this.target = document.getElementsByClassName(this.targetClassName)[0];
    this.mapEvents();
  }
  mapEvents() {
    this.mapTriggerCustomUpdateMessagesEvent();
  }
  mapTriggerCustomUpdateMessagesEvent() {
    document.addEventListener(EVENT_UPDATE_DYNAMIC_MESSAGES, event => this.updateMessages(event.detail));
  }
  updateMessages(responseHtml) {
    if (!responseHtml) {
      return;
    }
    var notificationArea = this.target || this;
    notificationArea.insertAdjacentHTML('beforeend', responseHtml);
    (0,ShopUi_app__WEBPACK_IMPORTED_MODULE_1__.mount)();
  }
  get targetClassName() {
    return this.getAttribute('target-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY29tcGFyaXNvbi1wcm9kdWN0LXRvZ2dsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBRXpDLElBQU1DLHNCQUFzQixHQUFHLGlCQUFpQjtBQUV4QyxNQUFNQyxjQUFjLFNBQVNGLCtEQUFTLENBQUM7RUFDeENHLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBRXZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDQyxhQUFhLE9BQXdCLElBQUksQ0FBQ0MsTUFBTSxXQUFRLENBQUMsQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFHQyxLQUFZLElBQ2xHLElBQUksQ0FBQ0MsUUFBUSxDQUFDRCxLQUFLLENBQ3ZCLENBQUM7RUFDTDtFQUVVQyxRQUFRQSxDQUFDRCxLQUFZLEVBQVE7SUFBQSxJQUFBRSxXQUFBO0lBQ25DRixLQUFLLENBQUNHLGNBQWMsQ0FBQyxDQUFDO0lBRXRCLElBQU1DLElBQUksSUFBQUYsV0FBQSxHQUFHRyxJQUFJLENBQUNDLEtBQUssQ0FBQ0MsWUFBWSxDQUFDQyxPQUFPLENBQUNmLHNCQUFzQixDQUFDLENBQUMsWUFBQVMsV0FBQSxHQUFJLEVBQUU7SUFFM0VPLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEdBQUdQLElBQUksQ0FBQ1EsTUFBTSxHQUFNLElBQUksQ0FBQ0MsR0FBRyxlQUFVVCxJQUFJLENBQUNVLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBSyxJQUFJLENBQUNELEdBQUc7RUFDekY7RUFFQSxJQUFJQSxHQUFHQSxDQUFBLEVBQVc7SUFDZCxPQUFPLElBQUksQ0FBQ0UsWUFBWSxDQUFDLEtBQUssQ0FBQztFQUNuQztBQUNKOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCZ0k7QUFDaEY7QUFDNEI7QUFFN0QsTUFBTUUsd0JBQXdCLFNBQVN6QiwrREFBUyxDQUFDO0VBQUEwQixZQUFBO0lBQUEsU0FBQUMsU0FBQTtJQUFBLEtBQ2xEZixJQUFJLEdBQWEsRUFBRTtJQUFB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QUNwQyxDQUFDO0VBQ0w7RUFFVW9CLGNBQWNBLENBQUNDLFlBQW9CLEVBQVE7SUFDakQsSUFBSSxDQUFDQSxZQUFZLEVBQUU7TUFDZjtJQUNKO0lBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDUCxNQUFNLElBQUksSUFBSTtJQUM1Q08sZ0JBQWdCLENBQUNDLGtCQUFrQixDQUFDLFdBQVcsRUFBRUYsWUFBWSxDQUFDO0lBQzlEUixpREFBSyxDQUFDLENBQUM7RUFDWDtFQUVBLElBQWNJLGVBQWVBLENBQUEsRUFBVztJQUNwQyxPQUFPLElBQUksQ0FBQ3pDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztFQUNqRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LWNvbXBhcmlzb24tcGFnZS9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0Q29tcGFyaXNvblBhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jb21wYXJpc29uLWxpbmsvY29tcGFyaXNvbi1saW5rLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1jb21wYXJpc29uLXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvUHJvZHVjdENvbXBhcmlzb25QYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29tcGFyaXNvbi1wcm9kdWN0LXRvZ2dsZXIvY29tcGFyaXNvbi1wcm9kdWN0LXRvZ2dsZXIudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvb3JnYW5pc21zL2R5bmFtaWMtbm90aWZpY2F0aW9uLWFyZWEvZHluYW1pYy1ub3RpZmljYXRpb24tYXJlYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGNvbnN0IENPTVBBUklTT05fU1RPUkFHRV9LRVkgPSAnY29tcGFyaXNvbi1za3VzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGFyaXNvbkxpbmsgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fX2xpbmtgKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0KGV2ZW50KSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVkaXJlY3QoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3Qgc2t1cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oQ09NUEFSSVNPTl9TVE9SQUdFX0tFWSkpID8/IFtdO1xuXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2t1cy5sZW5ndGggPyBgJHt0aGlzLnVybH0/JnNrdXM9JHtza3VzLmpvaW4oJywnKX1gIDogdGhpcy51cmw7XG4gICAgfVxuXG4gICAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VybCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvb3JnYW5pc21zL2R5bmFtaWMtbm90aWZpY2F0aW9uLWFyZWEvZHluYW1pYy1ub3RpZmljYXRpb24tYXJlYSc7XG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IENPTVBBUklTT05fU1RPUkFHRV9LRVkgfSBmcm9tICcuLi9jb21wYXJpc29uLWxpbmsvY29tcGFyaXNvbi1saW5rJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGFyaXNvblByb2R1Y3RUb2dnbGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgc2t1czogc3RyaW5nW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgYnV0dG9uUGxhY2Vob2xkZXI/OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYnV0dG9uPzogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGFkZFRlbXBsYXRlOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIHJlbW92ZVRlbXBsYXRlOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uUGxhY2Vob2xkZXIgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fX2J1dHRvbi1wbGFjZWhvbGRlcmApO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oYC4ke3RoaXMuanNOYW1lfV9fYnV0dG9uYCk7XG4gICAgICAgIHRoaXMuYWRkVGVtcGxhdGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fX2FkZC10ZW1wbGF0ZWApPy5pbm5lckhUTUw7XG4gICAgICAgIHRoaXMucmVtb3ZlVGVtcGxhdGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fX3JlbW92ZS10ZW1wbGF0ZWApPy5pbm5lckhUTUw7XG5cbiAgICAgICAgdGhpcy51cGRhdGVTdGFsZVN0YXRlKCk7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZShldmVudCkpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzdG9yYWdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBDT01QQVJJU09OX1NUT1JBR0VfS0VZKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdGFsZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgaGFzU2t1ID0gdGhpcy5za3VzLmluY2x1ZGVzKHRoaXMuc2t1KTtcbiAgICAgICAgY29uc3QgbWVzc2FnZXNLZXkgPSB0aGlzLnNrdXMubGVuZ3RoID49IHRoaXMubWF4SXRlbXMgJiYgIWhhc1NrdSA/ICdtYXgnIDogaGFzU2t1ID8gJ3JlbW92ZScgOiAnc3VjY2Vzcyc7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgICAgIG5ldyBDdXN0b21FdmVudChFVkVOVF9VUERBVEVfRFlOQU1JQ19NRVNTQUdFUywge1xuICAgICAgICAgICAgICAgIGRldGFpbDogdGhpcy5xdWVyeVNlbGVjdG9yPEhUTUxUZW1wbGF0ZUVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fXyR7bWVzc2FnZXNLZXl9LW1lc3NhZ2UtdGVtcGxhdGVgKVxuICAgICAgICAgICAgICAgICAgICA/LmlubmVySFRNTCxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLnNrdXMubGVuZ3RoID49IHRoaXMubWF4SXRlbXMgJiYgIWhhc1NrdSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5za3VzID0gaGFzU2t1ID8gdGhpcy5za3VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdGhpcy5za3UpIDogWy4uLnRoaXMuc2t1cywgdGhpcy5za3VdO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShDT01QQVJJU09OX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNrdXMpKTtcbiAgICAgICAgdGhpcy5yZWRpcmVjdChoYXNTa3UpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblRlbXBsYXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVN0YWxlU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2t1cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oQ09NUEFSSVNPTl9TVE9SQUdFX0tFWSkpID8/IFtdO1xuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblRlbXBsYXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlZGlyZWN0KGhhc1NrdTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBjb25zdCB1cmwgPSBgJHt0aGlzLnVybH0/JnNrdXM9JHt0aGlzLnNrdXMuam9pbignLCcpfWA7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU9uQWRkID0gIWhhc1NrdSAmJiB0aGlzLnNrdXMubGVuZ3RoID49IHRoaXMucmVkaXJlY3RMZW5ndGg7XG4gICAgICAgIGNvbnN0IHVwZGF0ZU9uUmVtb3ZlID0gaGFzU2t1ICYmIHRoaXMudXBkYXRlVXJsT25SZW1vdmU7XG5cbiAgICAgICAgaWYgKHVwZGF0ZU9uQWRkIHx8IHVwZGF0ZU9uUmVtb3ZlKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgIHRoaXMuYnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVCdXR0b25UZW1wbGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmJ1dHRvblBsYWNlaG9sZGVyIHx8ICF0aGlzLnJlbW92ZVRlbXBsYXRlLmxlbmd0aCB8fCAhdGhpcy5hZGRUZW1wbGF0ZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYnV0dG9uUGxhY2Vob2xkZXIuaW5uZXJIVE1MID0gdGhpcy5za3VzLmluY2x1ZGVzKHRoaXMuc2t1KSA/IHRoaXMucmVtb3ZlVGVtcGxhdGUgOiB0aGlzLmFkZFRlbXBsYXRlO1xuICAgIH1cblxuICAgIGdldCBtYXhJdGVtcygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdtYXhJdGVtcycpKTtcbiAgICB9XG5cbiAgICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndXJsJyk7XG4gICAgfVxuXG4gICAgZ2V0IHNrdSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NrdScpO1xuICAgIH1cblxuICAgIGdldCByZWRpcmVjdExlbmd0aCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdyZWRpcmVjdExlbmd0aCcpKTtcbiAgICB9XG5cbiAgICBnZXQgdXBkYXRlVXJsT25SZW1vdmUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgndXBkYXRlVXJsT25SZW1vdmUnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdTaG9wVWkvYXBwJztcblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlRHluYW1pY01lc3NhZ2VzIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiBuZWVkIHRvIHVwZGF0ZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTID0gJ3VwZGF0ZUR5bmFtaWNNZXNzYWdlcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIER5bmFtaWNOb3RpZmljYXRpb25BcmVhIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJDdXN0b21VcGRhdGVNZXNzYWdlc0V2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJDdXN0b21VcGRhdGVNZXNzYWdlc0V2ZW50KCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PlxuICAgICAgICAgICAgdGhpcy51cGRhdGVNZXNzYWdlcyhldmVudC5kZXRhaWwpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVNZXNzYWdlcyhyZXNwb25zZUh0bWw6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAoIXJlc3BvbnNlSHRtbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvbkFyZWEgPSB0aGlzLnRhcmdldCB8fCB0aGlzO1xuICAgICAgICBub3RpZmljYXRpb25BcmVhLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgcmVzcG9uc2VIdG1sKTtcbiAgICAgICAgbW91bnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkNPTVBBUklTT05fU1RPUkFHRV9LRVkiLCJDb21wYXJpc29uTGluayIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXVlcnlTZWxlY3RvciIsImpzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInJlZGlyZWN0IiwiX0pTT04kcGFyc2UiLCJwcmV2ZW50RGVmYXVsdCIsInNrdXMiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwibGVuZ3RoIiwidXJsIiwiam9pbiIsImdldEF0dHJpYnV0ZSIsIkVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTIiwiQ29tcGFyaXNvblByb2R1Y3RUb2dnbGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJidXR0b25QbGFjZWhvbGRlciIsImJ1dHRvbiIsImFkZFRlbXBsYXRlIiwicmVtb3ZlVGVtcGxhdGUiLCJfdGhpcyRxdWVyeVNlbGVjdG9yIiwiX3RoaXMkcXVlcnlTZWxlY3RvcjIiLCJpbm5lckhUTUwiLCJ1cGRhdGVTdGFsZVN0YXRlIiwidG9nZ2xlIiwia2V5IiwiX3RoaXMkcXVlcnlTZWxlY3RvcjMiLCJoYXNTa3UiLCJpbmNsdWRlcyIsInNrdSIsIm1lc3NhZ2VzS2V5IiwibWF4SXRlbXMiLCJkb2N1bWVudCIsImRpc3BhdGNoRXZlbnQiLCJDdXN0b21FdmVudCIsImRldGFpbCIsImZpbHRlciIsIml0ZW0iLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwidXBkYXRlQnV0dG9uVGVtcGxhdGUiLCJ1cGRhdGVPbkFkZCIsInJlZGlyZWN0TGVuZ3RoIiwidXBkYXRlT25SZW1vdmUiLCJ1cGRhdGVVcmxPblJlbW92ZSIsImRpc2FibGVkIiwiTnVtYmVyIiwiaGFzQXR0cmlidXRlIiwibW91bnQiLCJEeW5hbWljTm90aWZpY2F0aW9uQXJlYSIsInRhcmdldCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0YXJnZXRDbGFzc05hbWUiLCJtYXBFdmVudHMiLCJtYXBUcmlnZ2VyQ3VzdG9tVXBkYXRlTWVzc2FnZXNFdmVudCIsInVwZGF0ZU1lc3NhZ2VzIiwicmVzcG9uc2VIdG1sIiwibm90aWZpY2F0aW9uQXJlYSIsImluc2VydEFkamFjZW50SFRNTCJdLCJzb3VyY2VSb290IjoiIn0=