"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["customer-reorder"],{

/***/ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts":
/*!*********************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomerReorder)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class CustomerReorder extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Elements enabling/disabling the trigger.
   */

  /**
   * Element enabled/disabled by selections changes.
   */

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
   * Sets or removes the disabled attribute from the trigger element.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY3VzdG9tZXItcmVvcmRlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUVqQyxNQUFNQyxlQUFlLFNBQVNELCtEQUFTLENBQUM7RUFDbkQ7QUFDSjtBQUNBOztFQUdJO0FBQ0o7QUFDQTs7RUFHSUUsV0FBV0EsQ0FBQSxFQUFHO0lBQ1YsS0FBSyxDQUFDLENBQUM7SUFBQyxLQVJIQyxVQUFVO0lBQUEsS0FLVkMsT0FBTztJQUlaLElBQUksQ0FBQ0QsVUFBVSxHQUF1QkUsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sZ0JBQWEsQ0FBQyxDQUFDO0lBQzFHLElBQUksQ0FBQ0osT0FBTyxHQUFnQixJQUFJLENBQUNHLHNCQUFzQixDQUFJLElBQUksQ0FBQ0MsTUFBTSxjQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDekY7RUFFVUMsYUFBYUEsQ0FBQSxFQUFTO0lBQzVCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ1AsVUFBVSxDQUFDUSxPQUFPLENBQUVDLFNBQTJCLElBQ2hEQSxTQUFTLENBQUNDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxNQUFNLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQyxDQUN2RSxDQUFDO0VBQ0w7RUFFVUEsaUJBQWlCQSxDQUFBLEVBQVM7SUFDaEMsSUFBTUMsU0FBUyxHQUFHLElBQUksQ0FBQ1osVUFBVSxDQUFDYSxJQUFJLENBQUVKLFNBQTJCLElBQUtBLFNBQVMsQ0FBQ0ssT0FBTyxDQUFDO0lBQzFGLElBQUksQ0FBQ0MsYUFBYSxDQUFDSCxTQUFTLENBQUM7RUFDakM7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7RUFDSUcsYUFBYUEsQ0FBQ0gsU0FBa0IsRUFBUTtJQUNwQyxJQUFJQSxTQUFTLEVBQUU7TUFDWCxJQUFJLENBQUNYLE9BQU8sQ0FBQ2UsZUFBZSxDQUFDLFVBQVUsQ0FBQztNQUV4QztJQUNKO0lBRUEsSUFBSSxDQUFDZixPQUFPLENBQUNnQixZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztFQUNyRDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9jdXN0b21lci1yZW9yZGVyLXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9DdXN0b21lclJlb3JkZXJXaWRnZXQvVGhlbWUvZGVmYXVsdC92aWV3cy9jdXN0b21lci1yZW9yZGVyL2N1c3RvbWVyLXJlb3JkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1c3RvbWVyUmVvcmRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgZW5hYmxpbmcvZGlzYWJsaW5nIHRoZSB0cmlnZ2VyLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHNlbGVjdGlvbnM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgZW5hYmxlZC9kaXNhYmxlZCBieSBzZWxlY3Rpb25zIGNoYW5nZXMuXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zID0gPEhUTUxJbnB1dEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NlbGVjdGlvbmApKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RyaWdnZXJgKVswXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbnMuZm9yRWFjaCgoc2VsZWN0aW9uOiBIVE1MSW5wdXRFbGVtZW50KSA9PlxuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLnNlbGVjdGlvbnMuc29tZSgoc2VsZWN0aW9uOiBIVE1MSW5wdXRFbGVtZW50KSA9PiBzZWxlY3Rpb24uY2hlY2tlZCk7XG4gICAgICAgIHRoaXMuZW5hYmxlVHJpZ2dlcihpc0VuYWJsZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgb3IgcmVtb3ZlcyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIGZyb20gdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZW5hYmxlIEEgYm9vbGVhbiB2YWx1ZSBmb3IgY2hlY2tpbmcgaWYgdGhlIHRyaWdnZXIgaXMgYXZhaWxhYmxlIGZvciBjaGFuZ2luZy5cbiAgICAgKi9cbiAgICBlbmFibGVUcmlnZ2VyKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJDdXN0b21lclJlb3JkZXIiLCJjb25zdHJ1Y3RvciIsInNlbGVjdGlvbnMiLCJ0cmlnZ2VyIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInJlYWR5Q2FsbGJhY2siLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwic2VsZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaXNFbmFibGVkIiwic29tZSIsImNoZWNrZWQiLCJlbmFibGVUcmlnZ2VyIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==