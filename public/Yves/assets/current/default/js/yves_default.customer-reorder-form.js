"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["customer-reorder-form"],{

/***/ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts ***!
  \**********************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerReorderForm)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class CustomerReorderForm extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.selections = void 0;
    this.trigger = void 0;
    this.selections = Array.from(this.getElementsByClassName(this.jsName + "__selection"));
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
  }
  readyCallback() {
    this.mapEvents();
  }
  mapEvents() {
    this.selections.forEach(selection => selection.addEventListener('change', () => this.onSelectionChange()));
  }
  onSelectionChange() {
    var isEnabled = this.selections.some(selection => selection.checked);
    this.enableTrigger(isEnabled);
  }

  /**
   * Sets/removes the disabled attribute from the trigger button element, which if not disabled, on click can
   * reorder selected orders.
   * @param enable A boolean value for checking if the trigger is available for changing.
   */
  enableTrigger(isEnabled) {
    if (isEnabled) {
      this.trigger.removeAttribute('disabled');
      return;
    }
    this.trigger.setAttribute('disabled', 'disabled');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY3VzdG9tZXItcmVvcmRlci1mb3JtLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBRWpDLE1BQU1DLG1CQUFtQixTQUFTRCwrREFBUyxDQUFDO0VBSXZERSxXQUFXQSxDQUFBLEVBQUc7SUFDVixLQUFLLENBQUMsQ0FBQztJQUFDLEtBSk9DLFVBQVU7SUFBQSxLQUNWQyxPQUFPO0lBSXRCLElBQUksQ0FBQ0QsVUFBVSxHQUF1QkUsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sZ0JBQWEsQ0FBQyxDQUFDO0lBQzFHLElBQUksQ0FBQ0osT0FBTyxHQUFnQixJQUFJLENBQUNHLHNCQUFzQixDQUFJLElBQUksQ0FBQ0MsTUFBTSxjQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekY7RUFFVUMsYUFBYUEsQ0FBQSxFQUFTO0lBQzVCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ1AsVUFBVSxDQUFDUSxPQUFPLENBQUVDLFNBQTJCLElBQ2hEQSxTQUFTLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQyxDQUN2RSxDQUFDO0VBQ0w7RUFFVUEsaUJBQWlCQSxDQUFBLEVBQVM7SUFDaEMsSUFBTUMsU0FBUyxHQUFHLElBQUksQ0FBQ1osVUFBVSxDQUFDYSxJQUFJLENBQUVKLFNBQTJCLElBQUtBLFNBQVMsQ0FBQ0ssT0FBTyxDQUFDO0lBQzFGLElBQUksQ0FBQ0MsYUFBYSxDQUFDSCxTQUFTLENBQUM7RUFDakM7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJRyxhQUFhQSxDQUFDSCxTQUFrQixFQUFRO0lBQ3BDLElBQUlBLFNBQVMsRUFBRTtNQUNYLElBQUksQ0FBQ1gsT0FBTyxDQUFDZSxlQUFlLENBQUMsVUFBVSxDQUFDO01BRXhDO0lBQ0o7SUFFQSxJQUFJLENBQUNmLE9BQU8sQ0FBQ2dCLFlBQVksQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO0VBQ3JEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXJlb3JkZXItd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0N1c3RvbWVyUmVvcmRlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2N1c3RvbWVyLXJlb3JkZXItZm9ybS9jdXN0b21lci1yZW9yZGVyLWZvcm0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVyUmVvcmRlckZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCByZWFkb25seSBzZWxlY3Rpb25zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHRyaWdnZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9ucyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3Rpb25gKSk7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190cmlnZ2VyYClbMF07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zLmZvckVhY2goKHNlbGVjdGlvbjogSFRNTElucHV0RWxlbWVudCkgPT5cbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKCkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5zZWxlY3Rpb25zLnNvbWUoKHNlbGVjdGlvbjogSFRNTElucHV0RWxlbWVudCkgPT4gc2VsZWN0aW9uLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLmVuYWJsZVRyaWdnZXIoaXNFbmFibGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzL3JlbW92ZXMgdGhlIGRpc2FibGVkIGF0dHJpYnV0ZSBmcm9tIHRoZSB0cmlnZ2VyIGJ1dHRvbiBlbGVtZW50LCB3aGljaCBpZiBub3QgZGlzYWJsZWQsIG9uIGNsaWNrIGNhblxuICAgICAqIHJlb3JkZXIgc2VsZWN0ZWQgb3JkZXJzLlxuICAgICAqIEBwYXJhbSBlbmFibGUgQSBib29sZWFuIHZhbHVlIGZvciBjaGVja2luZyBpZiB0aGUgdHJpZ2dlciBpcyBhdmFpbGFibGUgZm9yIGNoYW5naW5nLlxuICAgICAqL1xuICAgIGVuYWJsZVRyaWdnZXIoaXNFbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChpc0VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlci5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlci5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkN1c3RvbWVyUmVvcmRlckZvcm0iLCJjb25zdHJ1Y3RvciIsInNlbGVjdGlvbnMiLCJ0cmlnZ2VyIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInJlYWR5Q2FsbGJhY2siLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwic2VsZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaXNFbmFibGVkIiwic29tZSIsImNoZWNrZWQiLCJlbmFibGVUcmlnZ2VyIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==