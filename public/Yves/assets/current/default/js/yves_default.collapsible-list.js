"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["collapsible-list"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/collapsible-list/collapsible-list.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/collapsible-list/collapsible-list.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CollapsibleList)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class CollapsibleList extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggerButton = void 0;
    this.targetList = void 0;
  }
  readyCallback() {}
  init() {
    this.triggerButton = this.getElementsByClassName(this.jsName + "__button")[0];
    this.targetList = this.getElementsByClassName(this.jsName + "__list")[0];
    this.mapEvents();
  }
  mapEvents() {
    this.mapClickEvent();
  }
  mapClickEvent() {
    if (!this.triggerButton) {
      return;
    }
    this.triggerButton.addEventListener('click', () => this.onClick());
  }
  onClick() {
    this.targetList.classList.toggle(this.listTriggerClass);
    this.triggerButton.classList.toggle(this.buttonTriggerClass);
  }
  get listTriggerClass() {
    return this.getAttribute('list-trigger-class');
  }
  get buttonTriggerClass() {
    return this.getAttribute('button-trigger-class');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY29sbGFwc2libGUtbGlzdC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFrRDtBQUVuQyxNQUFNQyxlQUFlLFNBQVNELHlEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUN6Q0MsYUFBYTtJQUFBLEtBQ2JDLFVBQVU7RUFBQTtFQUVWQyxhQUFhQSxDQUFBLEVBQUcsQ0FBQztFQUVqQkMsSUFBSUEsQ0FBQSxFQUFHO0lBQ2IsSUFBSSxDQUFDSCxhQUFhLEdBQXNCLElBQUksQ0FBQ0ksc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGFBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRyxJQUFJLENBQUNKLFVBQVUsR0FBZ0IsSUFBSSxDQUFDRyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sV0FBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJGLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0MsYUFBYSxDQUFDLENBQUM7RUFDeEI7RUFFVUEsYUFBYUEsQ0FBQSxFQUFTO0lBQzVCLElBQUksQ0FBQyxJQUFJLENBQUNQLGFBQWEsRUFBRTtNQUNyQjtJQUNKO0lBRUEsSUFBSSxDQUFDQSxhQUFhLENBQUNRLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUN0RTtFQUVVQSxPQUFPQSxDQUFBLEVBQVM7SUFDdEIsSUFBSSxDQUFDUixVQUFVLENBQUNTLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUM7SUFDdkQsSUFBSSxDQUFDWixhQUFhLENBQUNVLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ0Usa0JBQWtCLENBQUM7RUFDaEU7RUFFQSxJQUFjRCxnQkFBZ0JBLENBQUEsRUFBVztJQUNyQyxPQUFPLElBQUksQ0FBQ0UsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0VBQ2xEO0VBRUEsSUFBY0Qsa0JBQWtCQSxDQUFBLEVBQVc7SUFDdkMsT0FBTyxJQUFJLENBQUNDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQztFQUNwRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2NvbGxhcHNpYmxlLWxpc3QvY29sbGFwc2libGUtbGlzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsYXBzaWJsZUxpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0TGlzdDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyQnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2J1dHRvbmApWzBdO1xuICAgICAgICB0aGlzLnRhcmdldExpc3QgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGlzdGApWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBDbGlja0V2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcENsaWNrRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50cmlnZ2VyQnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLm9uQ2xpY2soKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFyZ2V0TGlzdC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMubGlzdFRyaWdnZXJDbGFzcyk7XG4gICAgICAgIHRoaXMudHJpZ2dlckJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuYnV0dG9uVHJpZ2dlckNsYXNzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGxpc3RUcmlnZ2VyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsaXN0LXRyaWdnZXItY2xhc3MnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGJ1dHRvblRyaWdnZXJDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2J1dHRvbi10cmlnZ2VyLWNsYXNzJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkNvbGxhcHNpYmxlTGlzdCIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwidHJpZ2dlckJ1dHRvbiIsInRhcmdldExpc3QiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBDbGlja0V2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2xpY2siLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJsaXN0VHJpZ2dlckNsYXNzIiwiYnV0dG9uVHJpZ2dlckNsYXNzIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==