"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["password-field"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-field/password-field.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-field/password-field.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasswordField)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class PasswordField extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.isPasswordShown = false;
    this.button = void 0;
    this.input = void 0;
  }
  readyCallback() {}
  init() {
    this.button = this.getElementsByClassName(this.buttonClassName)[0];
    this.input = this.getElementsByClassName(this.jsName + "__input")[0];
    this.mapEvents();
  }
  mapEvents() {
    this.mapButtonClickEvent();
  }
  mapButtonClickEvent() {
    this.button.addEventListener('click', () => this.onClick());
  }
  onClick() {
    this.isPasswordShown = !this.isPasswordShown;
    this.toggleInputType();
    this.toggleButtonClass();
  }
  toggleInputType() {
    this.input.setAttribute('type', this.isPasswordShown ? 'text' : 'password');
  }
  toggleButtonClass() {
    this.button.classList.toggle(this.buttonToggleClassName, this.isPasswordShown);
  }
  get buttonClassName() {
    return this.getAttribute('button-class-name');
  }
  get buttonToggleClassName() {
    return this.getAttribute('button-toggle-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucGFzc3dvcmQtZmllbGQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsYUFBYSxTQUFTRCwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDdkNDLGVBQWUsR0FBRyxLQUFLO0lBQUEsS0FDdkJDLE1BQU07SUFBQSxLQUNOQyxLQUFLO0VBQUE7RUFFTEMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNILE1BQU0sR0FBZ0IsSUFBSSxDQUFDSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUNDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxJQUFJLENBQUNKLEtBQUssR0FBcUIsSUFBSSxDQUFDRyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNFLE1BQU0sWUFBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRGLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsQ0FBQztFQUM5QjtFQUVVQSxtQkFBbUJBLENBQUEsRUFBUztJQUNsQyxJQUFJLENBQUNSLE1BQU0sQ0FBQ1MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0VBQy9EO0VBRVVBLE9BQU9BLENBQUEsRUFBUztJQUN0QixJQUFJLENBQUNYLGVBQWUsR0FBRyxDQUFDLElBQUksQ0FBQ0EsZUFBZTtJQUU1QyxJQUFJLENBQUNZLGVBQWUsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQztFQUM1QjtFQUVVRCxlQUFlQSxDQUFBLEVBQVM7SUFDOUIsSUFBSSxDQUFDVixLQUFLLENBQUNZLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDZCxlQUFlLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQztFQUMvRTtFQUVVYSxpQkFBaUJBLENBQUEsRUFBUztJQUNoQyxJQUFJLENBQUNaLE1BQU0sQ0FBQ2MsU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxxQkFBcUIsRUFBRSxJQUFJLENBQUNqQixlQUFlLENBQUM7RUFDbEY7RUFFQSxJQUFjTSxlQUFlQSxDQUFBLEVBQVc7SUFDcEMsT0FBTyxJQUFJLENBQUNZLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQztFQUNqRDtFQUVBLElBQWNELHFCQUFxQkEsQ0FBQSxFQUFXO0lBQzFDLE9BQU8sSUFBSSxDQUFDQyxZQUFZLENBQUMsMEJBQTBCLENBQUM7RUFDeEQ7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXNzd29yZC1maWVsZC9wYXNzd29yZC1maWVsZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFzc3dvcmRGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGlzUGFzc3dvcmRTaG93biA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBidXR0b246IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5idXR0b25DbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLmlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faW5wdXRgKVswXTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwQnV0dG9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBCdXR0b25DbGlja0V2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25DbGljaygpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1Bhc3N3b3JkU2hvd24gPSAhdGhpcy5pc1Bhc3N3b3JkU2hvd247XG5cbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFR5cGUoKTtcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25DbGFzcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVJbnB1dFR5cGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdGhpcy5pc1Bhc3N3b3JkU2hvd24gPyAndGV4dCcgOiAncGFzc3dvcmQnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlQnV0dG9uQ2xhc3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUodGhpcy5idXR0b25Ub2dnbGVDbGFzc05hbWUsIHRoaXMuaXNQYXNzd29yZFNob3duKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGJ1dHRvbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2J1dHRvbi1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBidXR0b25Ub2dnbGVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdidXR0b24tdG9nZ2xlLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiUGFzc3dvcmRGaWVsZCIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwiaXNQYXNzd29yZFNob3duIiwiYnV0dG9uIiwiaW5wdXQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJidXR0b25DbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBCdXR0b25DbGlja0V2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2siLCJ0b2dnbGVJbnB1dFR5cGUiLCJ0b2dnbGVCdXR0b25DbGFzcyIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImJ1dHRvblRvZ2dsZUNsYXNzTmFtZSIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=