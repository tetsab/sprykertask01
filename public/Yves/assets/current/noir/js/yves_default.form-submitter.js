"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["form-submitter"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts":
/*!*************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitter)
/* harmony export */ });
/* harmony import */ var ShopUi_components_molecules_form_submitter_form_submitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/form-submitter/form-submitter */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts");

var TAG_NAME = 'form';
class FormSubmitter extends ShopUi_components_molecules_form_submitter_form_submitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  onEvent(event) {
    var trigger = event.currentTarget;
    var form = trigger.closest(TAG_NAME);
    if (!form) {
      return;
    }
    var submit = form.querySelector('[type="submit"]') || form.querySelector('button:not([type="button"])');
    if (submit) {
      submit.click();
    }
    form.submit();
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormSubmitter)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

var TAG_NAME = 'form';
class FormSubmitter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
  }
  readyCallback() {}
  init() {
    this.triggers = Array.from(document.querySelectorAll(this.triggerSelector));
    this.mapEvents();
  }
  mapEvents() {
    this.triggers.forEach(trigger => trigger.addEventListener(this.eventName, event => this.onEvent(event)));
  }
  onEvent(event) {
    var trigger = event.currentTarget;
    var form = trigger.closest(TAG_NAME);
    if (!form) {
      return;
    }
    var submit = form.querySelector('[type="submit"]') || form.querySelector('button');
    if (submit) {
      submit.click();
    }
    form.submit();
  }
  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  get eventName() {
    return this.getAttribute('event');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuZm9ybS1zdWJtaXR0ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMEY7QUFFMUYsSUFBTUMsUUFBUSxHQUFHLE1BQU07QUFFUixNQUFNQyxhQUFhLFNBQVNGLGlHQUFpQixDQUFDO0VBQy9DRyxPQUFPQSxDQUFDQyxLQUFZLEVBQVE7SUFDbEMsSUFBTUMsT0FBTyxHQUFvQkQsS0FBSyxDQUFDRSxhQUFhO0lBQ3BELElBQU1DLElBQUksR0FBb0JGLE9BQU8sQ0FBQ0csT0FBTyxDQUFDUCxRQUFRLENBQUM7SUFFdkQsSUFBSSxDQUFDTSxJQUFJLEVBQUU7TUFDUDtJQUNKO0lBRUEsSUFBTUUsTUFBTSxHQUM4QkYsSUFBSSxDQUFDRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsSUFDeERILElBQUksQ0FBQ0csYUFBYSxDQUFDLDZCQUE2QixDQUFDO0lBRXhFLElBQUlELE1BQU0sRUFBRTtNQUNSQSxNQUFNLENBQUNFLEtBQUssQ0FBQyxDQUFDO0lBQ2xCO0lBRUFKLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUM7RUFDakI7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDdkJnRDtBQUVoRCxJQUFNUixRQUFRLEdBQUcsTUFBTTtBQUVSLE1BQU1DLGFBQWEsU0FBU1UsK0RBQVMsQ0FBQztFQUFBQyxZQUFBO0lBQUEsU0FBQUMsU0FBQTtJQUFBLEtBQ3ZDQyxRQUFRO0VBQUE7RUFFUkMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNGLFFBQVEsR0FBa0JHLEtBQUssQ0FBQ0MsSUFBSSxDQUFDQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLElBQUksQ0FBQ0MsZUFBZSxDQUFDLENBQUM7SUFDMUYsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDUixRQUFRLENBQUNTLE9BQU8sQ0FBRW5CLE9BQU8sSUFDMUJBLE9BQU8sQ0FBQ29CLGdCQUFnQixDQUFDLElBQUksQ0FBQ0MsU0FBUyxFQUFHdEIsS0FBWSxJQUFLLElBQUksQ0FBQ0QsT0FBTyxDQUFDQyxLQUFLLENBQUMsQ0FDbEYsQ0FBQztFQUNMO0VBRVVELE9BQU9BLENBQUNDLEtBQVksRUFBUTtJQUNsQyxJQUFNQyxPQUFPLEdBQW9CRCxLQUFLLENBQUNFLGFBQWE7SUFDcEQsSUFBTUMsSUFBSSxHQUFvQkYsT0FBTyxDQUFDRyxPQUFPLENBQUNQLFFBQVEsQ0FBQztJQUV2RCxJQUFJLENBQUNNLElBQUksRUFBRTtNQUNQO0lBQ0o7SUFFQSxJQUFNRSxNQUFNLEdBQzhCRixJQUFJLENBQUNHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUN4REgsSUFBSSxDQUFDRyxhQUFhLENBQUMsUUFBUSxDQUFDO0lBRW5ELElBQUlELE1BQU0sRUFBRTtNQUNSQSxNQUFNLENBQUNFLEtBQUssQ0FBQyxDQUFDO0lBQ2xCO0lBRUFKLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUM7RUFDakI7RUFFQSxJQUFjYSxlQUFlQSxDQUFBLEVBQVc7SUFDcEMsT0FBTyxJQUFJLENBQUNLLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztFQUNoRDtFQUVBLElBQWNELFNBQVNBLENBQUEsRUFBVztJQUM5QixPQUFPLElBQUksQ0FBQ0MsWUFBWSxDQUFDLE9BQU8sQ0FBQztFQUNyQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vc3JjL1B5ei9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2Zvcm0tc3VibWl0dGVyL2Zvcm0tc3VibWl0dGVyLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mb3JtLXN1Ym1pdHRlci9mb3JtLXN1Ym1pdHRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRm9ybVN1Ym1pdHRlckNvcmUgZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL2Zvcm0tc3VibWl0dGVyL2Zvcm0tc3VibWl0dGVyJztcblxuY29uc3QgVEFHX05BTUUgPSAnZm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TdWJtaXR0ZXIgZXh0ZW5kcyBGb3JtU3VibWl0dGVyQ29yZSB7XG4gICAgcHJvdGVjdGVkIG9uRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSA8SFRNTEZvcm1FbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PnRyaWdnZXIuY2xvc2VzdChUQUdfTkFNRSk7XG5cbiAgICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdWJtaXQgPVxuICAgICAgICAgICAgPEhUTUxCdXR0b25FbGVtZW50IHwgSFRNTElucHV0RWxlbWVudD5mb3JtLnF1ZXJ5U2VsZWN0b3IoJ1t0eXBlPVwic3VibWl0XCJdJykgfHxcbiAgICAgICAgICAgIDxIVE1MQnV0dG9uRWxlbWVudD5mb3JtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbjpub3QoW3R5cGU9XCJidXR0b25cIl0pJyk7XG5cbiAgICAgICAgaWYgKHN1Ym1pdCkge1xuICAgICAgICAgICAgc3VibWl0LmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBUQUdfTkFNRSA9ICdmb3JtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVN1Ym1pdHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50cmlnZ2VyU2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIpID0+XG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5ldmVudE5hbWUsIChldmVudDogRXZlbnQpID0+IHRoaXMub25FdmVudChldmVudCkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkV2ZW50KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0gPEhUTUxGb3JtRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBmb3JtID0gPEhUTUxGb3JtRWxlbWVudD50cmlnZ2VyLmNsb3Nlc3QoVEFHX05BTUUpO1xuXG4gICAgICAgIGlmICghZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3VibWl0ID1cbiAgICAgICAgICAgIDxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQ+Zm9ybS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cInN1Ym1pdFwiXScpIHx8XG4gICAgICAgICAgICA8SFRNTEJ1dHRvbkVsZW1lbnQ+Zm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcblxuICAgICAgICBpZiAoc3VibWl0KSB7XG4gICAgICAgICAgICBzdWJtaXQuY2xpY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcm0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBldmVudE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdldmVudCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJGb3JtU3VibWl0dGVyQ29yZSIsIlRBR19OQU1FIiwiRm9ybVN1Ym1pdHRlciIsIm9uRXZlbnQiLCJldmVudCIsInRyaWdnZXIiLCJjdXJyZW50VGFyZ2V0IiwiZm9ybSIsImNsb3Nlc3QiLCJzdWJtaXQiLCJxdWVyeVNlbGVjdG9yIiwiY2xpY2siLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInRyaWdnZXJzIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=