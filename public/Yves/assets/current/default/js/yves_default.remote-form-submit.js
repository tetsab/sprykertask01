"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["remote-form-submit"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts":
/*!*********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RemoteFormSubmit)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class RemoteFormSubmit extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.formHolder = void 0;
    this.fieldsContainer = void 0;
    this.submitButton = void 0;
  }
  readyCallback() {}
  init() {
    this.fieldsContainer = this.getElementsByClassName(this.jsName + "__container")[0];
    this.submitButton = this.getElementsByClassName(this.jsName + "__submit")[0];
    this.getFormHolder();
    this.createForm();
    this.removeFieldsContainer();
    this.mapEvents();
  }
  mapEvents() {
    this.mapSubmitButtonClickEvent();
  }
  mapSubmitButtonClickEvent() {
    this.submitButton.addEventListener('click', () => this.submitTargetForm());
  }
  submitTargetForm() {
    var form = document.getElementById(this.formName);
    if (this.submitButton.dataset.formAction) {
      form.action = this.submitButton.dataset.formAction;
    }
    form.submit();
  }
  getFormHolder() {
    if (this.formHolderClassName) {
      this.formHolder = document.getElementsByClassName(this.formHolderClassName)[0];
      return;
    }
    this.formHolder = document.body;
  }
  createForm() {
    var _document$getElementB;
    if (((_document$getElementB = document.getElementById(this.formName)) == null ? void 0 : _document$getElementB.tagName) === 'form') {
      return;
    }
    var formTemplate = "\n            <form id=\"" + this.formName + "\" class=\"is-hidden\" name=\"" + this.formName + "\" method=\"post\" action=\"" + this.formAction + "\">\n                " + this.fieldsContainer.innerHTML + "\n            </form>\n        ";
    this.formHolder.insertAdjacentHTML('beforeend', formTemplate);
  }
  removeFieldsContainer() {
    this.fieldsContainer.remove();
  }
  get formHolderClassName() {
    return this.getAttribute('form-holder-class-name');
  }
  get formName() {
    return this.getAttribute('form-name');
  }
  get formAction() {
    return this.getAttribute('form-action');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucmVtb3RlLWZvcm0tc3VibWl0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBRWpDLE1BQU1DLGdCQUFnQixTQUFTRCwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDMUNDLFVBQVU7SUFBQSxLQUNWQyxlQUFlO0lBQUEsS0FDZkMsWUFBWTtFQUFBO0VBRVpDLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBRXZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDSCxlQUFlLEdBQWdCLElBQUksQ0FBQ0ksc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGdCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0YsSUFBSSxDQUFDSixZQUFZLEdBQXNCLElBQUksQ0FBQ0csc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGFBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRixJQUFJLENBQUNDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQ0MsVUFBVSxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0MseUJBQXlCLENBQUMsQ0FBQztFQUNwQztFQUVVQSx5QkFBeUJBLENBQUEsRUFBUztJQUN4QyxJQUFJLENBQUNULFlBQVksQ0FBQ1UsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7RUFDOUU7RUFFVUEsZ0JBQWdCQSxDQUFBLEVBQVM7SUFDL0IsSUFBTUMsSUFBSSxHQUFvQkMsUUFBUSxDQUFDQyxjQUFjLENBQUMsSUFBSSxDQUFDQyxRQUFRLENBQUM7SUFFcEUsSUFBSSxJQUFJLENBQUNmLFlBQVksQ0FBQ2dCLE9BQU8sQ0FBQ0MsVUFBVSxFQUFFO01BQ3RDTCxJQUFJLENBQUNNLE1BQU0sR0FBRyxJQUFJLENBQUNsQixZQUFZLENBQUNnQixPQUFPLENBQUNDLFVBQVU7SUFDdEQ7SUFFQUwsSUFBSSxDQUFDTyxNQUFNLENBQUMsQ0FBQztFQUNqQjtFQUVVZCxhQUFhQSxDQUFBLEVBQVM7SUFDNUIsSUFBSSxJQUFJLENBQUNlLG1CQUFtQixFQUFFO01BQzFCLElBQUksQ0FBQ3RCLFVBQVUsR0FBZ0JlLFFBQVEsQ0FBQ1Ysc0JBQXNCLENBQUMsSUFBSSxDQUFDaUIsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFFM0Y7SUFDSjtJQUVBLElBQUksQ0FBQ3RCLFVBQVUsR0FBR2UsUUFBUSxDQUFDUSxJQUFJO0VBQ25DO0VBRVVmLFVBQVVBLENBQUEsRUFBUztJQUFBLElBQUFnQixxQkFBQTtJQUN6QixJQUFJLEVBQUFBLHFCQUFBLEdBQUFULFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLHFCQUF0Q08scUJBQUEsQ0FBd0NDLE9BQU8sTUFBSyxNQUFNLEVBQUU7TUFDNUQ7SUFDSjtJQUVBLElBQU1DLFlBQVksaUNBQ0YsSUFBSSxDQUFDVCxRQUFRLHNDQUE2QixJQUFJLENBQUNBLFFBQVEsb0NBQTJCLElBQUksQ0FBQ0UsVUFBVSw2QkFDdkcsSUFBSSxDQUFDbEIsZUFBZSxDQUFDMEIsU0FBUyxvQ0FFdkM7SUFDRCxJQUFJLENBQUMzQixVQUFVLENBQUM0QixrQkFBa0IsQ0FBQyxXQUFXLEVBQUVGLFlBQVksQ0FBQztFQUNqRTtFQUVVakIscUJBQXFCQSxDQUFBLEVBQVM7SUFDcEMsSUFBSSxDQUFDUixlQUFlLENBQUM0QixNQUFNLENBQUMsQ0FBQztFQUNqQztFQUVBLElBQWNQLG1CQUFtQkEsQ0FBQSxFQUFXO0lBQ3hDLE9BQU8sSUFBSSxDQUFDUSxZQUFZLENBQUMsd0JBQXdCLENBQUM7RUFDdEQ7RUFFQSxJQUFjYixRQUFRQSxDQUFBLEVBQVc7SUFDN0IsT0FBTyxJQUFJLENBQUNhLFlBQVksQ0FBQyxXQUFXLENBQUM7RUFDekM7RUFFQSxJQUFjWCxVQUFVQSxDQUFBLEVBQVc7SUFDL0IsT0FBTyxJQUFJLENBQUNXLFlBQVksQ0FBQyxhQUFhLENBQUM7RUFDM0M7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9yZW1vdGUtZm9ybS1zdWJtaXQvcmVtb3RlLWZvcm0tc3VibWl0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW1vdGVGb3JtU3VibWl0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgZm9ybUhvbGRlcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGZpZWxkc0NvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZHNDb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fY29udGFpbmVyYClbMF07XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3N1Ym1pdGApWzBdO1xuXG4gICAgICAgIHRoaXMuZ2V0Rm9ybUhvbGRlcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZUZvcm0oKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGaWVsZHNDb250YWluZXIoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFN1Ym1pdEJ1dHRvbkNsaWNrRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwU3VibWl0QnV0dG9uQ2xpY2tFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnN1Ym1pdFRhcmdldEZvcm0oKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN1Ym1pdFRhcmdldEZvcm0oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZm9ybU5hbWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnN1Ym1pdEJ1dHRvbi5kYXRhc2V0LmZvcm1BY3Rpb24pIHtcbiAgICAgICAgICAgIGZvcm0uYWN0aW9uID0gdGhpcy5zdWJtaXRCdXR0b24uZGF0YXNldC5mb3JtQWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0Rm9ybUhvbGRlcigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZm9ybUhvbGRlckNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5mb3JtSG9sZGVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5mb3JtSG9sZGVyQ2xhc3NOYW1lKVswXTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb3JtSG9sZGVyID0gZG9jdW1lbnQuYm9keTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlRm9ybSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZm9ybU5hbWUpPy50YWdOYW1lID09PSAnZm9ybScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgIDxmb3JtIGlkPVwiJHt0aGlzLmZvcm1OYW1lfVwiIGNsYXNzPVwiaXMtaGlkZGVuXCIgbmFtZT1cIiR7dGhpcy5mb3JtTmFtZX1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiJHt0aGlzLmZvcm1BY3Rpb259XCI+XG4gICAgICAgICAgICAgICAgJHt0aGlzLmZpZWxkc0NvbnRhaW5lci5pbm5lckhUTUx9XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIGA7XG4gICAgICAgIHRoaXMuZm9ybUhvbGRlci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGZvcm1UZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUZpZWxkc0NvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZHNDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmb3JtSG9sZGVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1ob2xkZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZm9ybU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1BY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWFjdGlvbicpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJSZW1vdGVGb3JtU3VibWl0IiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJmb3JtSG9sZGVyIiwiZmllbGRzQ29udGFpbmVyIiwic3VibWl0QnV0dG9uIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwiZ2V0Rm9ybUhvbGRlciIsImNyZWF0ZUZvcm0iLCJyZW1vdmVGaWVsZHNDb250YWluZXIiLCJtYXBFdmVudHMiLCJtYXBTdWJtaXRCdXR0b25DbGlja0V2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Ym1pdFRhcmdldEZvcm0iLCJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZvcm1OYW1lIiwiZGF0YXNldCIsImZvcm1BY3Rpb24iLCJhY3Rpb24iLCJzdWJtaXQiLCJmb3JtSG9sZGVyQ2xhc3NOYW1lIiwiYm9keSIsIl9kb2N1bWVudCRnZXRFbGVtZW50QiIsInRhZ05hbWUiLCJmb3JtVGVtcGxhdGUiLCJpbm5lckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9