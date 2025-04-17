"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["comparison-link"],{

/***/ "./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/clear-comparison/clear-comparison.ts":
/*!************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/clear-comparison/clear-comparison.ts ***!
  \************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClearComparison)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../comparison-link/comparison-link */ "./vendor/spryker-shop/product-comparison-page/src/SprykerShop/Yves/ProductComparisonPage/Theme/default/components/molecules/comparison-link/comparison-link.ts");


class ClearComparison extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.button = void 0;
  }
  readyCallback() {}
  init() {
    this.button = this.querySelector("." + this.jsName + "__button");
    this.button.addEventListener('click', event => this.clear(event));
  }
  clear(event) {
    event.preventDefault();
    localStorage.removeItem(_comparison_link_comparison_link__WEBPACK_IMPORTED_MODULE_1__.COMPARISON_STORAGE_KEY);
    this.button.disabled = true;
    window.location.href = this.url;
  }
  get url() {
    return this.getAttribute('url');
  }
}

/***/ }),

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

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY29tcGFyaXNvbi1saW5rLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUM0QjtBQUU3RCxNQUFNRSxlQUFlLFNBQVNGLCtEQUFTLENBQUM7RUFBQUcsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUN6Q0MsTUFBTTtFQUFBO0VBRU5DLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBQ3ZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDRixNQUFNLEdBQUcsSUFBSSxDQUFDRyxhQUFhLE9BQXdCLElBQUksQ0FBQ0MsTUFBTSxhQUFVLENBQUM7SUFFOUUsSUFBSSxDQUFDSixNQUFNLENBQUNLLGdCQUFnQixDQUFDLE9BQU8sRUFBR0MsS0FBSyxJQUFLLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxLQUFLLENBQUMsQ0FBQztFQUN2RTtFQUVVQyxLQUFLQSxDQUFDRCxLQUFZLEVBQVE7SUFDaENBLEtBQUssQ0FBQ0UsY0FBYyxDQUFDLENBQUM7SUFFdEJDLFlBQVksQ0FBQ0MsVUFBVSxDQUFDZCxvRkFBc0IsQ0FBQztJQUMvQyxJQUFJLENBQUNJLE1BQU0sQ0FBQ1csUUFBUSxHQUFHLElBQUk7SUFDM0JDLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxJQUFJLEdBQUcsSUFBSSxDQUFDQyxHQUFHO0VBQ25DO0VBRUEsSUFBSUEsR0FBR0EsQ0FBQSxFQUFXO0lBQ2QsT0FBTyxJQUFJLENBQUNDLFlBQVksQ0FBQyxLQUFLLENBQUM7RUFDbkM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCZ0Q7QUFFekMsSUFBTXBCLHNCQUFzQixHQUFHLGlCQUFpQjtBQUV4QyxNQUFNcUIsY0FBYyxTQUFTdEIsK0RBQVMsQ0FBQztFQUN4Q00sYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNDLGFBQWEsT0FBd0IsSUFBSSxDQUFDQyxNQUFNLFdBQVEsQ0FBQyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLEtBQVksSUFDbEcsSUFBSSxDQUFDWSxRQUFRLENBQUNaLEtBQUssQ0FDdkIsQ0FBQztFQUNMO0VBRVVZLFFBQVFBLENBQUNaLEtBQVksRUFBUTtJQUFBLElBQUFhLFdBQUE7SUFDbkNiLEtBQUssQ0FBQ0UsY0FBYyxDQUFDLENBQUM7SUFFdEIsSUFBTVksSUFBSSxJQUFBRCxXQUFBLEdBQUdFLElBQUksQ0FBQ0MsS0FBSyxDQUFDYixZQUFZLENBQUNjLE9BQU8sQ0FBQzNCLHNCQUFzQixDQUFDLENBQUMsWUFBQXVCLFdBQUEsR0FBSSxFQUFFO0lBRTNFUCxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsSUFBSSxHQUFHTSxJQUFJLENBQUNJLE1BQU0sR0FBTSxJQUFJLENBQUNULEdBQUcsZUFBVUssSUFBSSxDQUFDSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUssSUFBSSxDQUFDVixHQUFHO0VBQ3pGO0VBRUEsSUFBSUEsR0FBR0EsQ0FBQSxFQUFXO0lBQ2QsT0FBTyxJQUFJLENBQUNDLFlBQVksQ0FBQyxLQUFLLENBQUM7RUFDbkM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1jb21wYXJpc29uLXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvUHJvZHVjdENvbXBhcmlzb25QYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY2xlYXItY29tcGFyaXNvbi9jbGVhci1jb21wYXJpc29uLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1jb21wYXJpc29uLXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvUHJvZHVjdENvbXBhcmlzb25QYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29tcGFyaXNvbi1saW5rL2NvbXBhcmlzb24tbGluay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IENPTVBBUklTT05fU1RPUkFHRV9LRVkgfSBmcm9tICcuLi9jb21wYXJpc29uLWxpbmsvY29tcGFyaXNvbi1saW5rJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xlYXJDb21wYXJpc29uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgYnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5idXR0b24gPSB0aGlzLnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQ+KGAuJHt0aGlzLmpzTmFtZX1fX2J1dHRvbmApO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsZWFyKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsZWFyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENPTVBBUklTT05fU1RPUkFHRV9LRVkpO1xuICAgICAgICB0aGlzLmJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdGhpcy51cmw7XG4gICAgfVxuXG4gICAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3VybCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgQ09NUEFSSVNPTl9TVE9SQUdFX0tFWSA9ICdjb21wYXJpc29uLXNrdXMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wYXJpc29uTGluayBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oYC4ke3RoaXMuanNOYW1lfV9fbGlua2ApLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT5cbiAgICAgICAgICAgIHRoaXMucmVkaXJlY3QoZXZlbnQpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWRpcmVjdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBjb25zdCBza3VzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShDT01QQVJJU09OX1NUT1JBR0VfS0VZKSkgPz8gW107XG5cbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBza3VzLmxlbmd0aCA/IGAke3RoaXMudXJsfT8mc2t1cz0ke3NrdXMuam9pbignLCcpfWAgOiB0aGlzLnVybDtcbiAgICB9XG5cbiAgICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndXJsJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkNPTVBBUklTT05fU1RPUkFHRV9LRVkiLCJDbGVhckNvbXBhcmlzb24iLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsImJ1dHRvbiIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXVlcnlTZWxlY3RvciIsImpzTmFtZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsZWFyIiwicHJldmVudERlZmF1bHQiLCJsb2NhbFN0b3JhZ2UiLCJyZW1vdmVJdGVtIiwiZGlzYWJsZWQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ1cmwiLCJnZXRBdHRyaWJ1dGUiLCJDb21wYXJpc29uTGluayIsInJlZGlyZWN0IiwiX0pTT04kcGFyc2UiLCJza3VzIiwiSlNPTiIsInBhcnNlIiwiZ2V0SXRlbSIsImxlbmd0aCIsImpvaW4iXSwic291cmNlUm9vdCI6IiJ9