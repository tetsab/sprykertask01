"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["order-buttons-disable-toggler"],{

/***/ "./vendor/spryker-shop/sales-return-page/src/SprykerShop/Yves/SalesReturnPage/Theme/default/components/molecules/order-buttons-disable-toggler/order-buttons-disable-toggler.ts":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/sales-return-page/src/SprykerShop/Yves/SalesReturnPage/Theme/default/components/molecules/order-buttons-disable-toggler/order-buttons-disable-toggler.ts ***!
  \**************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OrderButtonsDisableToggler)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class OrderButtonsDisableToggler extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
    this.targets = void 0;
  }
  readyCallback() {}
  init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.targets = Array.from(document.getElementsByClassName(this.targetClassName));
    this.toggleButtonState();
    this.mapEvents();
  }
  mapEvents() {
    this.mapTriggerChangeEvent();
    this.mapTargetClickEvent();
  }
  mapTriggerChangeEvent() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('change', () => this.onTriggerChange());
    });
  }
  mapTargetClickEvent() {
    this.targets.forEach(target => {
      target.addEventListener('click', event => this.onTargetClick(event, target));
    });
  }
  onTriggerChange() {
    this.toggleButtonState();
  }
  toggleButtonState() {
    var checkedTriggers = this.triggers.filter(checkbox => checkbox.checked);
    this.toggleTargets(checkedTriggers);
  }
  toggleTargets(checkedTriggers) {
    if (Boolean(checkedTriggers.length) === this.isDisabledWhenChecked) {
      this.enableTargets();
      return;
    }
    this.disableTargets();
  }
  onTargetClick(event, target) {
    if (target.classList.contains(this.disabledClassName)) {
      event.preventDefault();
    }
  }
  disableTargets() {
    this.targets.forEach(target => {
      if (target.tagName === 'A') {
        target.classList.add(this.disabledClassName);
        return;
      }
      if (target.tagName === 'BUTTON') {
        target.setAttribute('disabled', 'disabled');
      }
    });
  }
  enableTargets() {
    this.targets.forEach(target => {
      if (target.tagName === 'BUTTON') {
        target.removeAttribute('disabled');
        return;
      }
      target.classList.remove(this.disabledClassName);
    });
  }
  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }
  get targetClassName() {
    return this.getAttribute('target-class-name');
  }
  get isDisabledWhenChecked() {
    var attributeValue = this.getAttribute('is-disabled-when-checked');
    return attributeValue === 'true';
  }
  get disabledClassName() {
    return this.getAttribute('disabled-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQub3JkZXItYnV0dG9ucy1kaXNhYmxlLXRvZ2dsZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsMEJBQTBCLFNBQVNELCtEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUNwREMsUUFBUTtJQUFBLEtBQ1JDLE9BQU87RUFBQTtFQUVQQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksQ0FBQ0gsUUFBUSxHQUF1QkksS0FBSyxDQUFDQyxJQUFJLENBQUNDLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RHLElBQUksQ0FBQ1AsT0FBTyxHQUFrQkcsS0FBSyxDQUFDQyxJQUFJLENBQUNDLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsSUFBSSxDQUFDRSxlQUFlLENBQUMsQ0FBQztJQUUvRixJQUFJLENBQUNDLGlCQUFpQixDQUFDLENBQUM7SUFDeEIsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsQ0FBQztFQUM5QjtFQUVVRCxxQkFBcUJBLENBQUEsRUFBUztJQUNwQyxJQUFJLENBQUNaLFFBQVEsQ0FBQ2MsT0FBTyxDQUFFQyxPQUF5QixJQUFLO01BQ2pEQSxPQUFPLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQ0MsZUFBZSxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUM7RUFDTjtFQUVVSixtQkFBbUJBLENBQUEsRUFBUztJQUNsQyxJQUFJLENBQUNaLE9BQU8sQ0FBQ2EsT0FBTyxDQUFFSSxNQUFtQixJQUFLO01BQzFDQSxNQUFNLENBQUNGLGdCQUFnQixDQUFDLE9BQU8sRUFBR0csS0FBWSxJQUFLLElBQUksQ0FBQ0MsYUFBYSxDQUFDRCxLQUFLLEVBQUVELE1BQU0sQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQztFQUNOO0VBRVVELGVBQWVBLENBQUEsRUFBUztJQUM5QixJQUFJLENBQUNQLGlCQUFpQixDQUFDLENBQUM7RUFDNUI7RUFFVUEsaUJBQWlCQSxDQUFBLEVBQVM7SUFDaEMsSUFBTVcsZUFBZSxHQUF1QixJQUFJLENBQUNyQixRQUFRLENBQUNzQixNQUFNLENBQUVDLFFBQVEsSUFBS0EsUUFBUSxDQUFDQyxPQUFPLENBQUM7SUFFaEcsSUFBSSxDQUFDQyxhQUFhLENBQUNKLGVBQWUsQ0FBQztFQUN2QztFQUVVSSxhQUFhQSxDQUFDSixlQUFtQyxFQUFRO0lBQy9ELElBQUlLLE9BQU8sQ0FBQ0wsZUFBZSxDQUFDTSxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUNDLHFCQUFxQixFQUFFO01BQ2hFLElBQUksQ0FBQ0MsYUFBYSxDQUFDLENBQUM7TUFFcEI7SUFDSjtJQUVBLElBQUksQ0FBQ0MsY0FBYyxDQUFDLENBQUM7RUFDekI7RUFFVVYsYUFBYUEsQ0FBQ0QsS0FBWSxFQUFFRCxNQUFtQixFQUFRO0lBQzdELElBQUlBLE1BQU0sQ0FBQ2EsU0FBUyxDQUFDQyxRQUFRLENBQUMsSUFBSSxDQUFDQyxpQkFBaUIsQ0FBQyxFQUFFO01BQ25EZCxLQUFLLENBQUNlLGNBQWMsQ0FBQyxDQUFDO0lBQzFCO0VBQ0o7RUFFVUosY0FBY0EsQ0FBQSxFQUFTO0lBQzdCLElBQUksQ0FBQzdCLE9BQU8sQ0FBQ2EsT0FBTyxDQUFFSSxNQUFtQixJQUFLO01BQzFDLElBQUlBLE1BQU0sQ0FBQ2lCLE9BQU8sS0FBSyxHQUFHLEVBQUU7UUFDeEJqQixNQUFNLENBQUNhLFNBQVMsQ0FBQ0ssR0FBRyxDQUFDLElBQUksQ0FBQ0gsaUJBQWlCLENBQUM7UUFFNUM7TUFDSjtNQUVBLElBQUlmLE1BQU0sQ0FBQ2lCLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDN0JqQixNQUFNLENBQUNtQixZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztNQUMvQztJQUNKLENBQUMsQ0FBQztFQUNOO0VBRVVSLGFBQWFBLENBQUEsRUFBUztJQUM1QixJQUFJLENBQUM1QixPQUFPLENBQUNhLE9BQU8sQ0FBRUksTUFBbUIsSUFBSztNQUMxQyxJQUFJQSxNQUFNLENBQUNpQixPQUFPLEtBQUssUUFBUSxFQUFFO1FBQzdCakIsTUFBTSxDQUFDb0IsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUVsQztNQUNKO01BRUFwQixNQUFNLENBQUNhLFNBQVMsQ0FBQ1EsTUFBTSxDQUFDLElBQUksQ0FBQ04saUJBQWlCLENBQUM7SUFDbkQsQ0FBQyxDQUFDO0VBQ047RUFFQSxJQUFjekIsZ0JBQWdCQSxDQUFBLEVBQVc7SUFDckMsT0FBTyxJQUFJLENBQUNnQyxZQUFZLENBQUMsb0JBQW9CLENBQUM7RUFDbEQ7RUFFQSxJQUFjL0IsZUFBZUEsQ0FBQSxFQUFXO0lBQ3BDLE9BQU8sSUFBSSxDQUFDK0IsWUFBWSxDQUFDLG1CQUFtQixDQUFDO0VBQ2pEO0VBRUEsSUFBY1oscUJBQXFCQSxDQUFBLEVBQVk7SUFDM0MsSUFBTWEsY0FBYyxHQUFHLElBQUksQ0FBQ0QsWUFBWSxDQUFDLDBCQUEwQixDQUFDO0lBRXBFLE9BQU9DLGNBQWMsS0FBSyxNQUFNO0VBQ3BDO0VBRUEsSUFBY1IsaUJBQWlCQSxDQUFBLEVBQVc7SUFDdEMsT0FBTyxJQUFJLENBQUNPLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztFQUNuRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zYWxlcy1yZXR1cm4tcGFnZS9zcmMvU3ByeWtlclNob3AvWXZlcy9TYWxlc1JldHVyblBhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9vcmRlci1idXR0b25zLWRpc2FibGUtdG9nZ2xlci9vcmRlci1idXR0b25zLWRpc2FibGUtdG9nZ2xlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3JkZXJCdXR0b25zRGlzYWJsZVRvZ2dsZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTElucHV0RWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpKTtcbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKSk7XG5cbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25TdGF0ZSgpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlckNoYW5nZUV2ZW50KCk7XG4gICAgICAgIHRoaXMubWFwVGFyZ2V0Q2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyQ2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcjogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZSgpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRhcmdldENsaWNrRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVGFyZ2V0Q2xpY2soZXZlbnQsIHRhcmdldCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvblN0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZUJ1dHRvblN0YXRlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjaGVja2VkVHJpZ2dlcnMgPSA8SFRNTElucHV0RWxlbWVudFtdPnRoaXMudHJpZ2dlcnMuZmlsdGVyKChjaGVja2JveCkgPT4gY2hlY2tib3guY2hlY2tlZCk7XG5cbiAgICAgICAgdGhpcy50b2dnbGVUYXJnZXRzKGNoZWNrZWRUcmlnZ2Vycyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZVRhcmdldHMoY2hlY2tlZFRyaWdnZXJzOiBIVE1MSW5wdXRFbGVtZW50W10pOiB2b2lkIHtcbiAgICAgICAgaWYgKEJvb2xlYW4oY2hlY2tlZFRyaWdnZXJzLmxlbmd0aCkgPT09IHRoaXMuaXNEaXNhYmxlZFdoZW5DaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVRhcmdldHMoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlVGFyZ2V0cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRhcmdldENsaWNrKGV2ZW50OiBFdmVudCwgdGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmRpc2FibGVkQ2xhc3NOYW1lKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlVGFyZ2V0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQodGhpcy5kaXNhYmxlZENsYXNzTmFtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5hYmxlVGFyZ2V0cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmRpc2FibGVkQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXNEaXNhYmxlZFdoZW5DaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVWYWx1ZSA9IHRoaXMuZ2V0QXR0cmlidXRlKCdpcy1kaXNhYmxlZC13aGVuLWNoZWNrZWQnKTtcblxuICAgICAgICByZXR1cm4gYXR0cmlidXRlVmFsdWUgPT09ICd0cnVlJztcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRpc2FibGVkQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQtY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJPcmRlckJ1dHRvbnNEaXNhYmxlVG9nZ2xlciIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwidHJpZ2dlcnMiLCJ0YXJnZXRzIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwidGFyZ2V0Q2xhc3NOYW1lIiwidG9nZ2xlQnV0dG9uU3RhdGUiLCJtYXBFdmVudHMiLCJtYXBUcmlnZ2VyQ2hhbmdlRXZlbnQiLCJtYXBUYXJnZXRDbGlja0V2ZW50IiwiZm9yRWFjaCIsInRyaWdnZXIiLCJhZGRFdmVudExpc3RlbmVyIiwib25UcmlnZ2VyQ2hhbmdlIiwidGFyZ2V0IiwiZXZlbnQiLCJvblRhcmdldENsaWNrIiwiY2hlY2tlZFRyaWdnZXJzIiwiZmlsdGVyIiwiY2hlY2tib3giLCJjaGVja2VkIiwidG9nZ2xlVGFyZ2V0cyIsIkJvb2xlYW4iLCJsZW5ndGgiLCJpc0Rpc2FibGVkV2hlbkNoZWNrZWQiLCJlbmFibGVUYXJnZXRzIiwiZGlzYWJsZVRhcmdldHMiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImRpc2FibGVkQ2xhc3NOYW1lIiwicHJldmVudERlZmF1bHQiLCJ0YWdOYW1lIiwiYWRkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwicmVtb3ZlIiwiZ2V0QXR0cmlidXRlIiwiYXR0cmlidXRlVmFsdWUiXSwic291cmNlUm9vdCI6IiJ9