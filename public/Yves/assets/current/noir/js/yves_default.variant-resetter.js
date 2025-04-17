"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["variant-resetter"],{

/***/ "./src/Pyz/Yves/ProductDetailPageDE/Theme/default/components/molecules/variant-resetter/variant-resetter.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductDetailPageDE/Theme/default/components/molecules/variant-resetter/variant-resetter.ts ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VariantResetter)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class VariantResetter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.trigger = void 0;
    this.target = void 0;
  }
  readyCallback() {}
  init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.target = this.getElementsByClassName(this.jsName + "__target")[0];
    this.mapEvents();
  }
  mapEvents() {
    this.trigger.addEventListener('click', event => this.onClick(event));
  }
  onClick(event) {
    if (this.isAjaxMode) {
      return;
    }
    event.preventDefault();
    this.target.value = '';
    this.target.closest('form').submit();
  }
  get isAjaxMode() {
    return !!this.getAttribute('ajax-mode');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQudmFyaWFudC1yZXNldHRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUVqQyxNQUFNQyxlQUFlLFNBQVNELCtEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUN6Q0MsT0FBTztJQUFBLEtBQ1BDLE1BQU07RUFBQTtFQUVOQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksQ0FBQ0gsT0FBTyxHQUFnQixJQUFJLENBQUNJLHNCQUFzQixDQUFJLElBQUksQ0FBQ0MsTUFBTSxjQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsSUFBSSxDQUFDSixNQUFNLEdBQXFCLElBQUksQ0FBQ0csc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGFBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4RixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCO0VBRVVBLFNBQVNBLENBQUEsRUFBUztJQUN4QixJQUFJLENBQUNOLE9BQU8sQ0FBQ08sZ0JBQWdCLENBQUMsT0FBTyxFQUFHQyxLQUFZLElBQUssSUFBSSxDQUFDQyxPQUFPLENBQUNELEtBQUssQ0FBQyxDQUFDO0VBQ2pGO0VBRVVDLE9BQU9BLENBQUNELEtBQVksRUFBUTtJQUNsQyxJQUFJLElBQUksQ0FBQ0UsVUFBVSxFQUFFO01BQ2pCO0lBQ0o7SUFFQUYsS0FBSyxDQUFDRyxjQUFjLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUNWLE1BQU0sQ0FBQ1csS0FBSyxHQUFHLEVBQUU7SUFDdEIsSUFBSSxDQUFDWCxNQUFNLENBQUNZLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7RUFDeEM7RUFFQSxJQUFjSixVQUFVQSxDQUFBLEVBQVk7SUFDaEMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDSyxZQUFZLENBQUMsV0FBVyxDQUFDO0VBQzNDO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9zcmMvUHl6L1l2ZXMvUHJvZHVjdERldGFpbFBhZ2VERS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3ZhcmlhbnQtcmVzZXR0ZXIvdmFyaWFudC1yZXNldHRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudFJlc2V0dGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHRhcmdldDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuICAgICAgICB0aGlzLnRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RhcmdldGApWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkNsaWNrKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzQWpheE1vZGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGlzQWpheE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0QXR0cmlidXRlKCdhamF4LW1vZGUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiVmFyaWFudFJlc2V0dGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJ0cmlnZ2VyIiwidGFyZ2V0IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25DbGljayIsImlzQWpheE1vZGUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY2xvc2VzdCIsInN1Ym1pdCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=