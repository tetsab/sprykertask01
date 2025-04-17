"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["form-input-default-value-disabler"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormInputDefaultValueDisabler)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class FormInputDefaultValueDisabler extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.forms = void 0;
  }
  /**
   * Collection of the forms.
   */
  readyCallback() {
    this.forms = Array.from(document.querySelectorAll(this.formSelector));
    this.mapEvents();
  }
  mapEvents() {
    this.forms.forEach(form => {
      form.addEventListener('submit', event => this.onFormSubmit(event));
    });
  }
  onFormSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    this.disableInputsWithDefaultValues(form);
  }

  /**
   * Toggles the disabled attribute and submits the form.
   * @param form HTMLFormElement is the element for submit event.
   */
  disableInputsWithDefaultValues(form) {
    var inputs = Array.from(form.querySelectorAll(this.inputSelector));
    inputs.forEach(input => {
      var defaultValue = input.getAttribute(this.defaultValueAttribute);
      if (defaultValue === input.value) {
        input.setAttribute('disabled', 'disabled');
        return;
      }
      input.removeAttribute('disabled');
    });
    form.submit();
  }

  /**
   * Gets a querySelector name of the form element.
   */
  get formSelector() {
    return this.getAttribute('form-selector');
  }

  /**
   * Gets a querySelector name of the input element.
   */
  get inputSelector() {
    return this.getAttribute('input-selector');
  }

  /**
   * Gets a name of the default value attribute.
   */
  get defaultValueAttribute() {
    return this.getAttribute('default-value-attribute');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuZm9ybS1pbnB1dC1kZWZhdWx0LXZhbHVlLWRpc2FibGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWtEO0FBRW5DLE1BQU1DLDZCQUE2QixTQUFTRCx5REFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FJakVDLEtBQUs7RUFBQTtFQUhMO0FBQ0o7QUFDQTtFQUdjQyxhQUFhQSxDQUFBLEVBQVM7SUFDNUIsSUFBSSxDQUFDRCxLQUFLLEdBQXNCRSxLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDO0lBQ3hGLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ1AsS0FBSyxDQUFDUSxPQUFPLENBQUVDLElBQWlCLElBQUs7TUFDdENBLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUMsUUFBUSxFQUFHQyxLQUFZLElBQUssSUFBSSxDQUFDQyxZQUFZLENBQUNELEtBQUssQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQztFQUNOO0VBRVVDLFlBQVlBLENBQUNELEtBQVksRUFBUTtJQUN2Q0EsS0FBSyxDQUFDRSxjQUFjLENBQUMsQ0FBQztJQUN0QixJQUFNSixJQUFJLEdBQW9CRSxLQUFLLENBQUNHLGFBQWE7SUFDakQsSUFBSSxDQUFDQyw4QkFBOEIsQ0FBQ04sSUFBSSxDQUFDO0VBQzdDOztFQUVBO0FBQ0o7QUFDQTtBQUNBO0VBQ0lNLDhCQUE4QkEsQ0FBQ04sSUFBcUIsRUFBRTtJQUNsRCxJQUFNTyxNQUFNLEdBQXVCZCxLQUFLLENBQUNDLElBQUksQ0FBQ00sSUFBSSxDQUFDSixnQkFBZ0IsQ0FBQyxJQUFJLENBQUNZLGFBQWEsQ0FBQyxDQUFDO0lBRXhGRCxNQUFNLENBQUNSLE9BQU8sQ0FBRVUsS0FBdUIsSUFBSztNQUN4QyxJQUFNQyxZQUFZLEdBQUdELEtBQUssQ0FBQ0UsWUFBWSxDQUFDLElBQUksQ0FBQ0MscUJBQXFCLENBQUM7TUFFbkUsSUFBSUYsWUFBWSxLQUFLRCxLQUFLLENBQUNJLEtBQUssRUFBRTtRQUM5QkosS0FBSyxDQUFDSyxZQUFZLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztRQUUxQztNQUNKO01BRUFMLEtBQUssQ0FBQ00sZUFBZSxDQUFDLFVBQVUsQ0FBQztJQUNyQyxDQUFDLENBQUM7SUFFRmYsSUFBSSxDQUFDZ0IsTUFBTSxDQUFDLENBQUM7RUFDakI7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBSW5CLFlBQVlBLENBQUEsRUFBVztJQUN2QixPQUFPLElBQUksQ0FBQ2MsWUFBWSxDQUFDLGVBQWUsQ0FBQztFQUM3Qzs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJSCxhQUFhQSxDQUFBLEVBQVc7SUFDeEIsT0FBTyxJQUFJLENBQUNHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQztFQUM5Qzs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJQyxxQkFBcUJBLENBQUEsRUFBVztJQUNoQyxPQUFPLElBQUksQ0FBQ0QsWUFBWSxDQUFDLHlCQUF5QixDQUFDO0VBQ3ZEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1pbnB1dC1kZWZhdWx0LXZhbHVlLWRpc2FibGVyL2Zvcm0taW5wdXQtZGVmYXVsdC12YWx1ZS1kaXNhYmxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXREZWZhdWx0VmFsdWVEaXNhYmxlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgZm9ybXMuXG4gICAgICovXG4gICAgZm9ybXM6IEhUTUxGb3JtRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybXMgPSA8SFRNTEZvcm1FbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZm9ybVNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3Jtcy5mb3JFYWNoKChmb3JtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uRm9ybVN1Ym1pdChldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gPEhUTUxGb3JtRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmRpc2FibGVJbnB1dHNXaXRoRGVmYXVsdFZhbHVlcyhmb3JtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgYW5kIHN1Ym1pdHMgdGhlIGZvcm0uXG4gICAgICogQHBhcmFtIGZvcm0gSFRNTEZvcm1FbGVtZW50IGlzIHRoZSBlbGVtZW50IGZvciBzdWJtaXQgZXZlbnQuXG4gICAgICovXG4gICAgZGlzYWJsZUlucHV0c1dpdGhEZWZhdWx0VmFsdWVzKGZvcm06IEhUTUxGb3JtRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbnB1dHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20oZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXRTZWxlY3RvcikpO1xuXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gaW5wdXQuZ2V0QXR0cmlidXRlKHRoaXMuZGVmYXVsdFZhbHVlQXR0cmlidXRlKTtcblxuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGZvcm1TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zvcm0tc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBpbnB1dFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaW5wdXQtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbmFtZSBvZiB0aGUgZGVmYXVsdCB2YWx1ZSBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRWYWx1ZUF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RlZmF1bHQtdmFsdWUtYXR0cmlidXRlJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkZvcm1JbnB1dERlZmF1bHRWYWx1ZURpc2FibGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJmb3JtcyIsInJlYWR5Q2FsbGJhY2siLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JtU2VsZWN0b3IiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwiZm9ybSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uRm9ybVN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudFRhcmdldCIsImRpc2FibGVJbnB1dHNXaXRoRGVmYXVsdFZhbHVlcyIsImlucHV0cyIsImlucHV0U2VsZWN0b3IiLCJpbnB1dCIsImRlZmF1bHRWYWx1ZSIsImdldEF0dHJpYnV0ZSIsImRlZmF1bHRWYWx1ZUF0dHJpYnV0ZSIsInZhbHVlIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwic3VibWl0Il0sInNvdXJjZVJvb3QiOiIifQ==