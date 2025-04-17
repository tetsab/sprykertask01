"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["payone-direct-debit"],{

/***/ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-direct-debit/payone-direct-debit.ts":
/*!********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-direct-debit/payone-direct-debit.ts ***!
  \********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PayoneDirectDebit)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

var BANK_ACCOUNT_MODE_BBAN = 'BBAN';
class PayoneDirectDebit extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.form = void 0;
    this.bankAccountModeInputs = void 0;
    this.bankAccountInput = void 0;
    this.bankCodeInput = void 0;
    this.ibanInput = void 0;
    this.bicInput = void 0;
  }
  readyCallback() {
    this.bankAccountModeInputs = Array.from(this.querySelectorAll(this.bankAccountModeSelector));
    this.bankAccountInput = this.querySelector(this.bankAccountSelector);
    this.bankCodeInput = this.querySelector(this.bankCodeSelector);
    this.ibanInput = this.querySelector(this.ibanSelector);
    this.bicInput = this.querySelector(this.bicSelector);
    this.mapEvents();
    this.toggleInputsStatus();
  }
  mapEvents() {
    this.bankAccountModeInputs.forEach(input => {
      input.addEventListener('change', event => this.onModeChange(event));
    });
  }
  onModeChange(event) {
    this.toggleInputsStatus();
  }
  toggleInputStatus(input, enable) {
    if (enable) {
      input.removeAttribute('disabled');
      return;
    }
    input.setAttribute('disabled', 'disabled');
  }
  toggleInputsStatus() {
    if (!this.bankAccountMode) {
      return;
    }
    this.toggleInputStatus(this.bankAccountInput, this.isBBANBankAccountMode);
    this.toggleInputStatus(this.bankCodeInput, this.isBBANBankAccountMode);
    this.toggleInputStatus(this.ibanInput, !this.isBBANBankAccountMode);
    this.toggleInputStatus(this.bicInput, !this.isBBANBankAccountMode);
  }
  get isBBANBankAccountMode() {
    return this.bankAccountMode === BANK_ACCOUNT_MODE_BBAN;
  }
  get bankAccountMode() {
    var selectedInput = this.bankAccountModeInputs.find(input => input.checked);
    return !!selectedInput ? selectedInput.value : '';
  }
  get bankAccountModeSelector() {
    return this.getAttribute('bank-account-mode-selector');
  }
  get bankAccountSelector() {
    return this.getAttribute('bank-account-selector');
  }
  get bankCodeSelector() {
    return this.getAttribute('bank-code-selector');
  }
  get ibanSelector() {
    return this.getAttribute('iban-selector');
  }
  get bicSelector() {
    return this.getAttribute('bic-selector');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0YsYUFBYSxHQUFHQSxhQUFhLENBQUNHLEtBQUssR0FBRyxFQUFFO0VBQ3JEO0VBRUEsSUFBSXRCLHVCQUF1QkEsQ0FBQSxFQUFXO0lBQ2xDLE9BQU8sSUFBSSxDQUFDdUIsWUFBWSxDQUFDLDRCQUE0QixDQUFDO0VBQzFEO0VBRUEsSUFBSXJCLG1CQUFtQkEsQ0FBQSxFQUFXO0lBQzlCLE9BQU8sSUFBSSxDQUFDcUIsWUFBWSxDQUFDLHVCQUF1QixDQUFDO0VBQ3JEO0VBRUEsSUFBSXBCLGdCQUFnQkEsQ0FBQSxFQUFXO0lBQzNCLE9BQU8sSUFBSSxDQUFDb0IsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0VBQ2xEO0VBRUEsSUFBSW5CLFlBQVlBLENBQUEsRUFBVztJQUN2QixPQUFPLElBQUksQ0FBQ21CLFlBQVksQ0FBQyxlQUFlLENBQUM7RUFDN0M7RUFFQSxJQUFJbEIsV0FBV0EsQ0FBQSxFQUFXO0lBQ3RCLE9BQU8sSUFBSSxDQUFDa0IsWUFBWSxDQUFDLGNBQWMsQ0FBQztFQUM1QztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItZWNvL3BheW9uZS9zcmMvU3ByeWtlckVjby9ZdmVzL1BheW9uZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3BheW9uZS1kaXJlY3QtZGViaXQvcGF5b25lLWRpcmVjdC1kZWJpdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgQkFOS19BQ0NPVU5UX01PREVfQkJBTiA9ICdCQkFOJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5b25lRGlyZWN0RGViaXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGZvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgICBiYW5rQWNjb3VudE1vZGVJbnB1dHM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBiYW5rQWNjb3VudElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGJhbmtDb2RlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgaWJhbklucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGJpY0lucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFua0FjY291bnRNb2RlSW5wdXRzID0gPEhUTUxJbnB1dEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuYmFua0FjY291bnRNb2RlU2VsZWN0b3IpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYmFua0FjY291bnRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmJhbmtBY2NvdW50U2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmJhbmtDb2RlSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5iYW5rQ29kZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5pYmFuSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5pYmFuU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmJpY0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuYmljU2VsZWN0b3IpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlSW5wdXRzU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5iYW5rQWNjb3VudE1vZGVJbnB1dHMuZm9yRWFjaCgoaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25Nb2RlQ2hhbmdlKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbk1vZGVDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlSW5wdXRzU3RhdHVzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZUlucHV0U3RhdHVzKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50LCBlbmFibGU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGVuYWJsZSkge1xuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgdG9nZ2xlSW5wdXRzU3RhdHVzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuYmFua0FjY291bnRNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0U3RhdHVzKHRoaXMuYmFua0FjY291bnRJbnB1dCwgdGhpcy5pc0JCQU5CYW5rQWNjb3VudE1vZGUpO1xuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0U3RhdHVzKHRoaXMuYmFua0NvZGVJbnB1dCwgdGhpcy5pc0JCQU5CYW5rQWNjb3VudE1vZGUpO1xuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0U3RhdHVzKHRoaXMuaWJhbklucHV0LCAhdGhpcy5pc0JCQU5CYW5rQWNjb3VudE1vZGUpO1xuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0U3RhdHVzKHRoaXMuYmljSW5wdXQsICF0aGlzLmlzQkJBTkJhbmtBY2NvdW50TW9kZSk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQkJBTkJhbmtBY2NvdW50TW9kZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFua0FjY291bnRNb2RlID09PSBCQU5LX0FDQ09VTlRfTU9ERV9CQkFOO1xuICAgIH1cblxuICAgIGdldCBiYW5rQWNjb3VudE1vZGUoKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbnB1dCA9IHRoaXMuYmFua0FjY291bnRNb2RlSW5wdXRzLmZpbmQoKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiBpbnB1dC5jaGVja2VkKTtcblxuICAgICAgICByZXR1cm4gISFzZWxlY3RlZElucHV0ID8gc2VsZWN0ZWRJbnB1dC52YWx1ZSA6ICcnO1xuICAgIH1cblxuICAgIGdldCBiYW5rQWNjb3VudE1vZGVTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2JhbmstYWNjb3VudC1tb2RlLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGJhbmtBY2NvdW50U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdiYW5rLWFjY291bnQtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgYmFua0NvZGVTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2JhbmstY29kZS1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIGdldCBpYmFuU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpYmFuLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGJpY1NlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYmljLXNlbGVjdG9yJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkJBTktfQUNDT1VOVF9NT0RFX0JCQU4iLCJQYXlvbmVEaXJlY3REZWJpdCIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwiZm9ybSIsImJhbmtBY2NvdW50TW9kZUlucHV0cyIsImJhbmtBY2NvdW50SW5wdXQiLCJiYW5rQ29kZUlucHV0IiwiaWJhbklucHV0IiwiYmljSW5wdXQiLCJyZWFkeUNhbGxiYWNrIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImJhbmtBY2NvdW50TW9kZVNlbGVjdG9yIiwicXVlcnlTZWxlY3RvciIsImJhbmtBY2NvdW50U2VsZWN0b3IiLCJiYW5rQ29kZVNlbGVjdG9yIiwiaWJhblNlbGVjdG9yIiwiYmljU2VsZWN0b3IiLCJtYXBFdmVudHMiLCJ0b2dnbGVJbnB1dHNTdGF0dXMiLCJmb3JFYWNoIiwiaW5wdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbk1vZGVDaGFuZ2UiLCJ0b2dnbGVJbnB1dFN0YXR1cyIsImVuYWJsZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImJhbmtBY2NvdW50TW9kZSIsImlzQkJBTkJhbmtBY2NvdW50TW9kZSIsInNlbGVjdGVkSW5wdXQiLCJmaW5kIiwiY2hlY2tlZCIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==