"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["form-clear"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormClear)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");


/**
 * @event formFieldsClearAfter An event which is triggered after the form fields are cleared.
 */
class FormClear extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.form = void 0;
    this.triggers = void 0;
    this.targets = void 0;
    this.ignoreElements = void 0;
    this.filterElements = void 0;
    this.formFieldsClearAfter = void 0;
  }
  /**
   * The current form.
   */
  /**
   * Collection of the triggers elements.
   */
  /**
   * Collection of the form elemenets.
   */
  /**
   * Collection of the targets elements which should be ignored while collection the filters.
   */
  /**
   * Collection of the filter elements.
   */
  /**
   * The custom event.
   */
  readyCallback() {
    this.triggers = Array.from(this.triggerClassName ? document.getElementsByClassName(this.triggerClassName) :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelectorAll(this.triggerSelector));
    this.form = this.formClassName ? document.getElementsByClassName(this.formClassName)[0] :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelector(this.formSelector);
    this.ignoreElements = Array.from(this.ignoreClassName ? this.form.getElementsByClassName(this.ignoreClassName) :
    // eslint-disable-next-line deprecation/deprecation
    this.form.querySelectorAll(this.ignoreSelector));
    var formInputs = Array.from(this.form.getElementsByTagName('input'));
    var formSelects = Array.from(this.form.getElementsByTagName('select'));
    this.targets = [...formInputs, ...formSelects];
    this.filterElements = this.targets.filter(element => !this.ignoreElements.includes(element));
    this.mapEvents();
  }
  mapEvents() {
    this.createCustomEvents();
    this.triggers.forEach(input => {
      input.addEventListener('change', () => this.onChange(input));
    });
  }
  onChange(input) {
    var isChecked = input.checked;
    if (isChecked) {
      this.clearFormValues();
    }
  }

  /**
   * Clears an array of the form elements and triggers the custom event formFieldsClearAfter.
   * @param element HTMLFormElement is the element for clear action.
   */
  clearFormValues() {
    this.filterElements.forEach(element => {
      this.clearFormField(element);
    });
    this.dispatchEvent(this.formFieldsClearAfter);
  }

  /**
   * Clears current form field.
   * @param element HTMLFormElement is the element for clear action.
   */
  clearFormField(element) {
    var tagName = this.getTagName(element);
    if (tagName === 'INPUT') {
      var inputType = element.type;
      if (inputType === 'text' || inputType === 'hidden') {
        element.value = '';
      }
      if (inputType === 'checkbox' || inputType === 'radio') {
        element.checked = false;
      }
    }
    if (tagName === 'SELECT') {
      element.selectedIndex = 0;
    }
  }

  /**
   * Gets a tag name of the current element.
   */
  getTagName(element) {
    return element.tagName.toUpperCase();
  }
  createCustomEvents() {
    this.formFieldsClearAfter = new CustomEvent('form-fields-clear-after');
  }

  /**
   * Gets a querySelector name of the form.
   *
   * @deprecated Use formClassName() instead.
   */
  get formSelector() {
    return this.getAttribute('form-selector');
  }
  get formClassName() {
    return this.getAttribute('form-class-name');
  }

  /**
   * Gets a querySelector name of the trigger element.
   *
   * @deprecated Use triggerClassName() instead.
   */
  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }

  /**
   * Gets a querySelector name of the ignore element.
   *
   * @deprecated Use ignoreClassName() instead.
   */
  get ignoreSelector() {
    return this.getAttribute('ignore-selector');
  }
  get ignoreClassName() {
    return this.getAttribute('ignore-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztFQUMvQzs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSS9CLGVBQWVBLENBQUEsRUFBVztJQUMxQixPQUFPLElBQUksQ0FBQytCLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztFQUNoRDtFQUNBLElBQWNuQyxnQkFBZ0JBLENBQUEsRUFBVztJQUNyQyxPQUFPLElBQUksQ0FBQ21DLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztFQUNsRDs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0VBQ0ksSUFBSTFCLGNBQWNBLENBQUEsRUFBVztJQUN6QixPQUFPLElBQUksQ0FBQzBCLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQztFQUNBLElBQWMzQixlQUFlQSxDQUFBLEVBQVc7SUFDcEMsT0FBTyxJQUFJLENBQUMyQixZQUFZLENBQUMsbUJBQW1CLENBQUM7RUFDakQ7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mb3JtLWNsZWFyL2Zvcm0tY2xlYXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgZm9ybUZpZWxkc0NsZWFyQWZ0ZXIgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIGFmdGVyIHRoZSBmb3JtIGZpZWxkcyBhcmUgY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNsZWFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBmb3JtLlxuICAgICAqL1xuICAgIGZvcm06IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgdHJpZ2dlcnMgZWxlbWVudHMuXG4gICAgICovXG4gICAgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0aW9uIG9mIHRoZSBmb3JtIGVsZW1lbmV0cy5cbiAgICAgKi9cbiAgICB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgdGFyZ2V0cyBlbGVtZW50cyB3aGljaCBzaG91bGQgYmUgaWdub3JlZCB3aGlsZSBjb2xsZWN0aW9uIHRoZSBmaWx0ZXJzLlxuICAgICAqL1xuICAgIGlnbm9yZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgZmlsdGVyIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIGZpbHRlckVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1c3RvbSBldmVudC5cbiAgICAgKi9cbiAgICBmb3JtRmllbGRzQ2xlYXJBZnRlcjogQ3VzdG9tRXZlbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMudHJpZ2dlclNlbGVjdG9yKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxFbGVtZW50Pih0aGlzLmZvcm1DbGFzc05hbWVcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZvcm1DbGFzc05hbWUpWzBdXG4gICAgICAgICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZm9ybVNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMuaWdub3JlRWxlbWVudHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy5pZ25vcmVDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IHRoaXMuZm9ybS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuaWdub3JlQ2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgICB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlnbm9yZVNlbGVjdG9yKSxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZm9ybUlucHV0cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKTtcbiAgICAgICAgY29uc3QgZm9ybVNlbGVjdHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JykpO1xuICAgICAgICB0aGlzLnRhcmdldHMgPSBbLi4uZm9ybUlucHV0cywgLi4uZm9ybVNlbGVjdHNdO1xuICAgICAgICB0aGlzLmZpbHRlckVsZW1lbnRzID0gdGhpcy50YXJnZXRzLmZpbHRlcigoZWxlbWVudCkgPT4gIXRoaXMuaWdub3JlRWxlbWVudHMuaW5jbHVkZXMoZWxlbWVudCkpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDdXN0b21FdmVudHMoKTtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkNoYW5nZShpbnB1dCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UoaW5wdXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuY2hlY2tlZDtcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckZvcm1WYWx1ZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbiBhcnJheSBvZiB0aGUgZm9ybSBlbGVtZW50cyBhbmQgdHJpZ2dlcnMgdGhlIGN1c3RvbSBldmVudCBmb3JtRmllbGRzQ2xlYXJBZnRlci5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBIVE1MRm9ybUVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgZm9yIGNsZWFyIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGVhckZvcm1WYWx1ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVyRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyRm9ybUZpZWxkKGVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5mb3JtRmllbGRzQ2xlYXJBZnRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGN1cnJlbnQgZm9ybSBmaWVsZC5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBIVE1MRm9ybUVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgZm9yIGNsZWFyIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGVhckZvcm1GaWVsZChlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRoaXMuZ2V0VGFnTmFtZShlbGVtZW50KTtcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VHlwZSA9IGVsZW1lbnQudHlwZTtcblxuICAgICAgICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ3RleHQnIHx8IGlucHV0VHlwZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXRUeXBlID09PSAnY2hlY2tib3gnIHx8IGlucHV0VHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHRhZyBuYW1lIG9mIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0VGFnTmFtZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ3VzdG9tRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1GaWVsZHNDbGVhckFmdGVyID0gPEN1c3RvbUV2ZW50Pm5ldyBDdXN0b21FdmVudCgnZm9ybS1maWVsZHMtY2xlYXItYWZ0ZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBmb3JtLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGZvcm1DbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBmb3JtU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgZm9ybUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zvcm0tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0cmlnZ2VyQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBpZ25vcmUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBpZ25vcmVDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBpZ25vcmVTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lnbm9yZS1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IGlnbm9yZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lnbm9yZS1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkZvcm1DbGVhciIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwiZm9ybSIsInRyaWdnZXJzIiwidGFyZ2V0cyIsImlnbm9yZUVsZW1lbnRzIiwiZmlsdGVyRWxlbWVudHMiLCJmb3JtRmllbGRzQ2xlYXJBZnRlciIsInJlYWR5Q2FsbGJhY2siLCJBcnJheSIsImZyb20iLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXVlcnlTZWxlY3RvckFsbCIsInRyaWdnZXJTZWxlY3RvciIsImZvcm1DbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiaWdub3JlQ2xhc3NOYW1lIiwiaWdub3JlU2VsZWN0b3IiLCJmb3JtSW5wdXRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJmb3JtU2VsZWN0cyIsImZpbHRlciIsImVsZW1lbnQiLCJpbmNsdWRlcyIsIm1hcEV2ZW50cyIsImNyZWF0ZUN1c3RvbUV2ZW50cyIsImZvckVhY2giLCJpbnB1dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkNoYW5nZSIsImlzQ2hlY2tlZCIsImNoZWNrZWQiLCJjbGVhckZvcm1WYWx1ZXMiLCJjbGVhckZvcm1GaWVsZCIsImRpc3BhdGNoRXZlbnQiLCJ0YWdOYW1lIiwiZ2V0VGFnTmFtZSIsImlucHV0VHlwZSIsInR5cGUiLCJ2YWx1ZSIsInNlbGVjdGVkSW5kZXgiLCJ0b1VwcGVyQ2FzZSIsIkN1c3RvbUV2ZW50IiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==