"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["accept-terms-checkbox"],{

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/accept-terms-checkbox/accept-terms-checkbox.ts":
/*!***************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/accept-terms-checkbox/accept-terms-checkbox.ts ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AcceptTermsCheckbox)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class AcceptTermsCheckbox extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.trigger = void 0;
    this.target = void 0;
  }
  readyCallback() {}
  init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.target = document.getElementsByClassName(this.targetClassName)[0];
    this.toggleTargetDisabling();
    this.mapEvents();
  }
  mapEvents() {
    this.mapTriggerChangeEvent();
  }
  mapTriggerChangeEvent() {
    this.trigger.addEventListener('change', () => this.onTriggerChange());
  }
  onTriggerChange() {
    this.toggleTargetDisabling();
  }
  toggleTargetDisabling() {
    if (!this.target) {
      return;
    }
    if (!this.trigger.checked) {
      this.target.disabled = true;
      return;
    }
    this.target.disabled = false;
  }
  get targetClassName() {
    return this.getAttribute('target-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuYWNjZXB0LXRlcm1zLWNoZWNrYm94LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBRWpDLE1BQU1DLG1CQUFtQixTQUFTRCwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDN0NDLE9BQU87SUFBQSxLQUNQQyxNQUFNO0VBQUE7RUFFTkMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNILE9BQU8sR0FBcUIsSUFBSSxDQUFDSSxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sY0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFGLElBQUksQ0FBQ0osTUFBTSxHQUFzQkssUUFBUSxDQUFDRixzQkFBc0IsQ0FBQyxJQUFJLENBQUNHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RixJQUFJLENBQUNDLHFCQUFxQixDQUFDLENBQUM7SUFDNUIsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0VBQ2hDO0VBRVVBLHFCQUFxQkEsQ0FBQSxFQUFTO0lBQ3BDLElBQUksQ0FBQ1YsT0FBTyxDQUFDVyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUNDLGVBQWUsQ0FBQyxDQUFDLENBQUM7RUFDekU7RUFFVUEsZUFBZUEsQ0FBQSxFQUFTO0lBQzlCLElBQUksQ0FBQ0oscUJBQXFCLENBQUMsQ0FBQztFQUNoQztFQUVVQSxxQkFBcUJBLENBQUEsRUFBUztJQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDUCxNQUFNLEVBQUU7TUFDZDtJQUNKO0lBRUEsSUFBSSxDQUFDLElBQUksQ0FBQ0QsT0FBTyxDQUFDYSxPQUFPLEVBQUU7TUFDdkIsSUFBSSxDQUFDWixNQUFNLENBQUNhLFFBQVEsR0FBRyxJQUFJO01BRTNCO0lBQ0o7SUFFQSxJQUFJLENBQUNiLE1BQU0sQ0FBQ2EsUUFBUSxHQUFHLEtBQUs7RUFDaEM7RUFFQSxJQUFjUCxlQUFlQSxDQUFBLEVBQVc7SUFDcEMsT0FBTyxJQUFJLENBQUNRLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztFQUNqRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9jaGVja291dC1wYWdlL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0NoZWNrb3V0UGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2FjY2VwdC10ZXJtcy1jaGVja2JveC9hY2NlcHQtdGVybXMtY2hlY2tib3gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY2VwdFRlcm1zQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCB0YXJnZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RyaWdnZXJgKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlbMF07XG5cbiAgICAgICAgdGhpcy50b2dnbGVUYXJnZXREaXNhYmxpbmcoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyQ2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZVRhcmdldERpc2FibGluZygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVUYXJnZXREaXNhYmxpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50cmlnZ2VyLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkFjY2VwdFRlcm1zQ2hlY2tib3giLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInRyaWdnZXIiLCJ0YXJnZXQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJkb2N1bWVudCIsInRhcmdldENsYXNzTmFtZSIsInRvZ2dsZVRhcmdldERpc2FibGluZyIsIm1hcEV2ZW50cyIsIm1hcFRyaWdnZXJDaGFuZ2VFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblRyaWdnZXJDaGFuZ2UiLCJjaGVja2VkIiwiZGlzYWJsZWQiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9