"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["language-switcher"],{

/***/ "./src/Pyz/Yves/LanguageSwitcherWidget/Theme/default/components/molecules/language-switcher/language-switcher.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/LanguageSwitcherWidget/Theme/default/components/molecules/language-switcher/language-switcher.ts ***!
  \***********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LanguageSwitcher)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class LanguageSwitcher extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.select = void 0;
  }
  readyCallback() {}
  init() {
    this.select = this.getElementsByClassName(this.jsName + "__select")[0];
    this.mapEvents();
  }
  mapEvents() {
    this.select.addEventListener('change', event => this.onTriggerChange(event));
  }
  onTriggerChange(event) {
    var selectTarget = event.currentTarget;
    if (this.hasUrl(selectTarget)) {
      window.location.assign(this.currentSelectValue(selectTarget));
    }
  }
  currentSelectValue(select) {
    return select.options[select.selectedIndex].value;
  }
  hasUrl(select) {
    return !!select.value;
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQubGFuZ3VhZ2Utc3dpdGNoZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsZ0JBQWdCLFNBQVNELCtEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUMxQ0MsTUFBTTtFQUFBO0VBRU5DLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBRXZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDRixNQUFNLEdBQXNCLElBQUksQ0FBQ0csc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGFBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCO0VBRVVBLFNBQVNBLENBQUEsRUFBUztJQUN4QixJQUFJLENBQUNMLE1BQU0sQ0FBQ00sZ0JBQWdCLENBQUMsUUFBUSxFQUFHQyxLQUFZLElBQUssSUFBSSxDQUFDQyxlQUFlLENBQUNELEtBQUssQ0FBQyxDQUFDO0VBQ3pGO0VBRVVDLGVBQWVBLENBQUNELEtBQVksRUFBUTtJQUMxQyxJQUFNRSxZQUFZLEdBQXNCRixLQUFLLENBQUNHLGFBQWE7SUFFM0QsSUFBSSxJQUFJLENBQUNDLE1BQU0sQ0FBQ0YsWUFBWSxDQUFDLEVBQUU7TUFDM0JHLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxrQkFBa0IsQ0FBQ04sWUFBWSxDQUFDLENBQUM7SUFDakU7RUFDSjtFQUVVTSxrQkFBa0JBLENBQUNmLE1BQXlCLEVBQVU7SUFDNUQsT0FBT0EsTUFBTSxDQUFDZ0IsT0FBTyxDQUFDaEIsTUFBTSxDQUFDaUIsYUFBYSxDQUFDLENBQUNDLEtBQUs7RUFDckQ7RUFFVVAsTUFBTUEsQ0FBQ1gsTUFBeUIsRUFBVztJQUNqRCxPQUFPLENBQUMsQ0FBQ0EsTUFBTSxDQUFDa0IsS0FBSztFQUN6QjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vc3JjL1B5ei9ZdmVzL0xhbmd1YWdlU3dpdGNoZXJXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9sYW5ndWFnZS1zd2l0Y2hlci9sYW5ndWFnZS1zd2l0Y2hlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGFuZ3VhZ2VTd2l0Y2hlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3QgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2VsZWN0YClbMF07XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJDaGFuZ2UoZXZlbnQpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzZWxlY3RUYXJnZXQgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcblxuICAgICAgICBpZiAodGhpcy5oYXNVcmwoc2VsZWN0VGFyZ2V0KSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmFzc2lnbih0aGlzLmN1cnJlbnRTZWxlY3RWYWx1ZShzZWxlY3RUYXJnZXQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjdXJyZW50U2VsZWN0VmFsdWUoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0udmFsdWU7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGhhc1VybChzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXNlbGVjdC52YWx1ZTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiTGFuZ3VhZ2VTd2l0Y2hlciIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwic2VsZWN0IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25UcmlnZ2VyQ2hhbmdlIiwic2VsZWN0VGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImhhc1VybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiYXNzaWduIiwiY3VycmVudFNlbGVjdFZhbHVlIiwib3B0aW9ucyIsInNlbGVjdGVkSW5kZXgiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=