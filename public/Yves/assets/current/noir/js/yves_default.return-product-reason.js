"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["return-product-reason"],{

/***/ "./vendor/spryker-shop/sales-return-page/src/SprykerShop/Yves/SalesReturnPage/Theme/default/components/molecules/return-product-reason/return-product-reason.ts":
/*!**********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/sales-return-page/src/SprykerShop/Yves/SalesReturnPage/Theme/default/components/molecules/return-product-reason/return-product-reason.ts ***!
  \**********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ReturnProductReason)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class ReturnProductReason extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.select = void 0;
    this.target = void 0;
  }
  readyCallback() {}
  init() {
    this.select = this.getElementsByClassName(this.jsName + "__select")[0];
    this.target = this.getElementsByClassName(this.jsName + "__target")[0];
    this.toggleTargetClass();
    this.mapEvents();
  }
  mapEvents() {
    this.mapSelectChange();
  }
  mapSelectChange() {
    this.select.addEventListener('change', () => this.onSelectChange());
  }
  onSelectChange() {
    this.toggleTargetClass();
  }
  toggleTargetClass() {
    var isToggleValueSelected = this.toggleValue === this.select.value;
    this.target.classList.toggle(this.classToToggle, !isToggleValueSelected);
  }
  get toggleValue() {
    return this.getAttribute('toggle-value');
  }
  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucmV0dXJuLXByb2R1Y3QtcmVhc29uLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBRWpDLE1BQU1DLG1CQUFtQixTQUFTRCwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDN0NDLE1BQU07SUFBQSxLQUNOQyxNQUFNO0VBQUE7RUFFTkMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNILE1BQU0sR0FBc0IsSUFBSSxDQUFDSSxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sYUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLElBQUksQ0FBQ0osTUFBTSxHQUFnQixJQUFJLENBQUNHLHNCQUFzQixDQUFJLElBQUksQ0FBQ0MsTUFBTSxhQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkYsSUFBSSxDQUFDQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0MsZUFBZSxDQUFDLENBQUM7RUFDMUI7RUFFVUEsZUFBZUEsQ0FBQSxFQUFTO0lBQzlCLElBQUksQ0FBQ1IsTUFBTSxDQUFDUyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUNDLGNBQWMsQ0FBQyxDQUFDLENBQUM7RUFDdkU7RUFFVUEsY0FBY0EsQ0FBQSxFQUFTO0lBQzdCLElBQUksQ0FBQ0osaUJBQWlCLENBQUMsQ0FBQztFQUM1QjtFQUVVQSxpQkFBaUJBLENBQUEsRUFBUztJQUNoQyxJQUFNSyxxQkFBcUIsR0FBRyxJQUFJLENBQUNDLFdBQVcsS0FBSyxJQUFJLENBQUNaLE1BQU0sQ0FBQ2EsS0FBSztJQUNwRSxJQUFJLENBQUNaLE1BQU0sQ0FBQ2EsU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxhQUFhLEVBQUUsQ0FBQ0wscUJBQXFCLENBQUM7RUFDNUU7RUFFQSxJQUFjQyxXQUFXQSxDQUFBLEVBQVc7SUFDaEMsT0FBTyxJQUFJLENBQUNLLFlBQVksQ0FBQyxjQUFjLENBQUM7RUFDNUM7RUFFQSxJQUFjRCxhQUFhQSxDQUFBLEVBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUNDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zYWxlcy1yZXR1cm4tcGFnZS9zcmMvU3ByeWtlclNob3AvWXZlcy9TYWxlc1JldHVyblBhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9yZXR1cm4tcHJvZHVjdC1yZWFzb24vcmV0dXJuLXByb2R1Y3QtcmVhc29uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXR1cm5Qcm9kdWN0UmVhc29uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3RgKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdGFyZ2V0YClbMF07XG5cbiAgICAgICAgdGhpcy50b2dnbGVUYXJnZXRDbGFzcygpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwU2VsZWN0Q2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFNlbGVjdENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vblNlbGVjdENoYW5nZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3RDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlVGFyZ2V0Q2xhc3MoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlVGFyZ2V0Q2xhc3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzVG9nZ2xlVmFsdWVTZWxlY3RlZCA9IHRoaXMudG9nZ2xlVmFsdWUgPT09IHRoaXMuc2VsZWN0LnZhbHVlO1xuICAgICAgICB0aGlzLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgIWlzVG9nZ2xlVmFsdWVTZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0b2dnbGVWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RvZ2dsZS12YWx1ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2xhc3NUb1RvZ2dsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJSZXR1cm5Qcm9kdWN0UmVhc29uIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJzZWxlY3QiLCJ0YXJnZXQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJ0b2dnbGVUYXJnZXRDbGFzcyIsIm1hcEV2ZW50cyIsIm1hcFNlbGVjdENoYW5nZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblNlbGVjdENoYW5nZSIsImlzVG9nZ2xlVmFsdWVTZWxlY3RlZCIsInRvZ2dsZVZhbHVlIiwidmFsdWUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjbGFzc1RvVG9nZ2xlIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==