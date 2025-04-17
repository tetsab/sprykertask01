"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["toggler-accordion"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerAccordion)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class TogglerAccordion extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
  }
  readyCallback() {}
  init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  }
  mapEvents() {
    this.triggers.forEach(trigger => trigger.addEventListener('click', this.triggerHandler.bind(this, trigger)));
  }
  triggerHandler(trigger) {
    var togglerContent = document.getElementsByClassName(trigger.getAttribute('data-toggle-target-class-name'))[0];
    trigger.classList.toggle(this.activeClass);
    togglerContent.classList.toggle(this.toggleClass);
  }
  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }
  get toggleClass() {
    return this.getAttribute('class-to-toggle');
  }
  get activeClass() {
    return this.getAttribute('active-class');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQudG9nZ2xlci1hY2NvcmRpb24uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsZ0JBQWdCLFNBQVNELCtEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUMxQ0MsUUFBUTtFQUFBO0VBRVJDLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBRXZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDRixRQUFRLEdBQWtCRyxLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUNDLGdCQUFnQixDQUFDLENBQUM7SUFDakcsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDUixRQUFRLENBQUNTLE9BQU8sQ0FBRUMsT0FBTyxJQUFLQSxPQUFPLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUNDLGNBQWMsQ0FBQ0MsSUFBSSxDQUFDLElBQUksRUFBRUgsT0FBTyxDQUFDLENBQUMsQ0FBQztFQUNsSDtFQUVVRSxjQUFjQSxDQUFDRixPQUFvQixFQUFRO0lBQ2pELElBQU1JLGNBQWMsR0FBR1QsUUFBUSxDQUFDQyxzQkFBc0IsQ0FDbERJLE9BQU8sQ0FBQ0ssWUFBWSxDQUFDLCtCQUErQixDQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0pMLE9BQU8sQ0FBQ00sU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxXQUFXLENBQUM7SUFDMUNKLGNBQWMsQ0FBQ0UsU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDRSxXQUFXLENBQUM7RUFDckQ7RUFFQSxJQUFjWixnQkFBZ0JBLENBQUEsRUFBVztJQUNyQyxPQUFPLElBQUksQ0FBQ1EsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0VBQ2xEO0VBRUEsSUFBY0ksV0FBV0EsQ0FBQSxFQUFXO0lBQ2hDLE9BQU8sSUFBSSxDQUFDSixZQUFZLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7RUFFQSxJQUFjRyxXQUFXQSxDQUFBLEVBQVc7SUFDaEMsT0FBTyxJQUFJLENBQUNILFlBQVksQ0FBQyxjQUFjLENBQUM7RUFDNUM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy90b2dnbGVyLWFjY29yZGlvbi90b2dnbGVyLWFjY29yZGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlckFjY29yZGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKSk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy50cmlnZ2VySGFuZGxlci5iaW5kKHRoaXMsIHRyaWdnZXIpKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJIYW5kbGVyKHRyaWdnZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRvZ2dsZXJDb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgIHRyaWdnZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXRvZ2dsZS10YXJnZXQtY2xhc3MtbmFtZScpLFxuICAgICAgICApWzBdO1xuICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC50b2dnbGUodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgICAgIHRvZ2dsZXJDb250ZW50LmNsYXNzTGlzdC50b2dnbGUodGhpcy50b2dnbGVDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0b2dnbGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtY2xhc3MnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiVG9nZ2xlckFjY29yZGlvbiIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwidHJpZ2dlcnMiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRyaWdnZXJDbGFzc05hbWUiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwidHJpZ2dlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0cmlnZ2VySGFuZGxlciIsImJpbmQiLCJ0b2dnbGVyQ29udGVudCIsImdldEF0dHJpYnV0ZSIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImFjdGl2ZUNsYXNzIiwidG9nZ2xlQ2xhc3MiXSwic291cmNlUm9vdCI6IiJ9