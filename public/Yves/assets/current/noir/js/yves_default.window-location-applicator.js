"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["window-location-applicator"],{

/***/ "./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WindowLocationApplicator)
/* harmony export */ });
/* harmony import */ var CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CatalogPage/components/molecules/window-location-applicator/window-location-applicator */ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts");

class WindowLocationApplicator extends CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.sortTriggers = void 0;
  }
  init() {
    this.sortTriggers = Array.from(document.getElementsByClassName(this.sortTriggerClassName));
    super.init();
  }
  mapEvents() {
    this.sortTriggers.forEach(element => {
      element.addEventListener('change', event => this.onTriggerEvent(event));
    });
    super.mapEvents();
  }
  get sortTriggerClassName() {
    return this.getAttribute('sort-trigger-class-name');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WindowLocationApplicator)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class WindowLocationApplicator extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.form = void 0;
    this.triggers = void 0;
  }
  readyCallback() {}
  init() {
    this.form = document.getElementsByClassName(this.formClassName)[0];
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  }
  mapEvents() {
    this.triggers.forEach(element => {
      element.addEventListener('click', event => this.onTriggerEvent(event));
    });
  }
  onTriggerEvent(event) {
    var categoryUrl = event.currentTarget.getAttribute('data-url');
    var isFormData = typeof FormData !== 'undefined' && typeof FormData.prototype.get !== 'undefined';
    var isURLSearchParams = typeof URLSearchParams !== 'undefined' && typeof URLSearchParams.prototype.get !== 'undefined';
    if (isFormData && isURLSearchParams) {
      this.getQueryString(categoryUrl ? categoryUrl : '');
      return;
    }
    this.getQueryStringAlternative(categoryUrl ? categoryUrl : '');
  }
  getQueryString(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }
    var formData = new FormData(this.form);
    var data = new URLSearchParams(formData);
    formData.forEach((value, key) => {
      if (value.length) {
        return;
      }
      data.delete(key);
    });
    this.setWindowLocation(categoryUrl, data.toString());
  }
  getQueryStringAlternative(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }
    var inputFields = Array.from(this.form.getElementsByTagName('input'));
    var selectFields = Array.from(this.form.getElementsByTagName('select'));
    var filteredInputFields = inputFields.filter(input => {
      return (input.checked || input.type === 'number' || input.type === 'hidden') && !input.disabled;
    });
    var formFields = [...filteredInputFields, ...selectFields];
    var data = formFields.reduce((accumulator, field) => {
      if (field.name && field.value) {
        accumulator += "&" + field.name + "=" + field.value;
      }
      return accumulator;
    }, '').slice(1);
    this.setWindowLocation(categoryUrl, encodeURI(data));
  }
  setWindowLocation(categoryUrl, data) {
    window.location.href = categoryUrl + "?" + data;
  }
  get formClassName() {
    return this.getAttribute('form-class-name');
  }
  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQud2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0k7QUFFbkgsTUFBTUMsd0JBQXdCLFNBQVNELDhIQUE0QixDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDckVDLFlBQVk7RUFBQTtFQUVaQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDRCxZQUFZLEdBQXdCRSxLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUNDLG9CQUFvQixDQUFDLENBQUM7SUFFL0csS0FBSyxDQUFDTCxJQUFJLENBQUMsQ0FBQztFQUNoQjtFQUVVTSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDUCxZQUFZLENBQUNRLE9BQU8sQ0FBRUMsT0FBMEIsSUFBSztNQUN0REEsT0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUdDLEtBQVksSUFBSyxJQUFJLENBQUNDLGNBQWMsQ0FBQ0QsS0FBSyxDQUFDLENBQUM7SUFDcEYsQ0FBQyxDQUFDO0lBRUYsS0FBSyxDQUFDSixTQUFTLENBQUMsQ0FBQztFQUNyQjtFQUVBLElBQWNELG9CQUFvQkEsQ0FBQSxFQUFXO0lBQ3pDLE9BQU8sSUFBSSxDQUFDTyxZQUFZLENBQUMseUJBQXlCLENBQUM7RUFDdkQ7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDdEJnRDtBQUVqQyxNQUFNaEIsd0JBQXdCLFNBQVNpQiwrREFBUyxDQUFDO0VBQUFoQixZQUFBO0lBQUEsU0FBQUMsU0FBQTtJQUFBLEtBQ2xEZ0IsSUFBSTtJQUFBLEtBQ0pDLFFBQVE7RUFBQTtFQUVSQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QmhCLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNjLElBQUksR0FBb0JYLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsSUFBSSxDQUFDYSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsSUFBSSxDQUFDRixRQUFRLEdBQXdCZCxLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUNjLGdCQUFnQixDQUFDLENBQUM7SUFFdkcsSUFBSSxDQUFDWixTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDUyxRQUFRLENBQUNSLE9BQU8sQ0FBRUMsT0FBMEIsSUFBSztNQUNsREEsT0FBTyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLEtBQVksSUFBSyxJQUFJLENBQUNDLGNBQWMsQ0FBQ0QsS0FBSyxDQUFDLENBQUM7SUFDbkYsQ0FBQyxDQUFDO0VBQ047RUFFVUMsY0FBY0EsQ0FBQ0QsS0FBWSxFQUFRO0lBQ3pDLElBQU1TLFdBQVcsR0FBdUJULEtBQUssQ0FBQ1UsYUFBYSxDQUFFUixZQUFZLENBQUMsVUFBVSxDQUFDO0lBQ3JGLElBQU1TLFVBQVUsR0FBRyxPQUFPQyxRQUFRLEtBQUssV0FBVyxJQUFJLE9BQU9BLFFBQVEsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLEtBQUssV0FBVztJQUNuRyxJQUFNQyxpQkFBaUIsR0FDbkIsT0FBT0MsZUFBZSxLQUFLLFdBQVcsSUFBSSxPQUFPQSxlQUFlLENBQUNILFNBQVMsQ0FBQ0MsR0FBRyxLQUFLLFdBQVc7SUFFbEcsSUFBSUgsVUFBVSxJQUFJSSxpQkFBaUIsRUFBRTtNQUNqQyxJQUFJLENBQUNFLGNBQWMsQ0FBQ1IsV0FBVyxHQUFHQSxXQUFXLEdBQUcsRUFBRSxDQUFDO01BRW5EO0lBQ0o7SUFFQSxJQUFJLENBQUNTLHlCQUF5QixDQUFDVCxXQUFXLEdBQUdBLFdBQVcsR0FBRyxFQUFFLENBQUM7RUFDbEU7RUFFVVEsY0FBY0EsQ0FBQ1IsV0FBbUIsRUFBbUM7SUFBQSxJQUF0REEsV0FBbUI7TUFBbkJBLFdBQW1CLEdBQUdVLE1BQU0sQ0FBQ0MsUUFBUSxDQUFDQyxRQUFRO0lBQUE7SUFDbkUsSUFBTUMsUUFBUSxHQUFHLElBQUlWLFFBQVEsQ0FBQyxJQUFJLENBQUNSLElBQUksQ0FBQztJQUN4QyxJQUFNbUIsSUFBSSxHQUFHLElBQUlQLGVBQWUsQ0FBa0JNLFFBQVEsQ0FBQztJQUUzREEsUUFBUSxDQUFDekIsT0FBTyxDQUFDLENBQUMyQixLQUFhLEVBQUVDLEdBQVcsS0FBSztNQUM3QyxJQUFJRCxLQUFLLENBQUNFLE1BQU0sRUFBRTtRQUNkO01BQ0o7TUFFQUgsSUFBSSxDQUFDSSxNQUFNLENBQUNGLEdBQUcsQ0FBQztJQUNwQixDQUFDLENBQUM7SUFFRixJQUFJLENBQUNHLGlCQUFpQixDQUFDbkIsV0FBVyxFQUFFYyxJQUFJLENBQUNNLFFBQVEsQ0FBQyxDQUFDLENBQUM7RUFDeEQ7RUFFVVgseUJBQXlCQSxDQUFDVCxXQUFtQixFQUFtQztJQUFBLElBQXREQSxXQUFtQjtNQUFuQkEsV0FBbUIsR0FBR1UsTUFBTSxDQUFDQyxRQUFRLENBQUNDLFFBQVE7SUFBQTtJQUM5RSxJQUFNUyxXQUFXLEdBQXVCdkMsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDWSxJQUFJLENBQUMyQixvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRixJQUFNQyxZQUFZLEdBQXdCekMsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDWSxJQUFJLENBQUMyQixvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUU5RixJQUFNRSxtQkFBbUIsR0FBR0gsV0FBVyxDQUFDSSxNQUFNLENBQUVDLEtBQXVCLElBQUs7TUFDeEUsT0FBTyxDQUFDQSxLQUFLLENBQUNDLE9BQU8sSUFBSUQsS0FBSyxDQUFDRSxJQUFJLEtBQUssUUFBUSxJQUFJRixLQUFLLENBQUNFLElBQUksS0FBSyxRQUFRLEtBQUssQ0FBQ0YsS0FBSyxDQUFDRyxRQUFRO0lBQ25HLENBQUMsQ0FBQztJQUNGLElBQU1DLFVBQVUsR0FBRyxDQUFDLEdBQUdOLG1CQUFtQixFQUFFLEdBQUdELFlBQVksQ0FBQztJQUM1RCxJQUFNVCxJQUFZLEdBQUdnQixVQUFVLENBQzFCQyxNQUFNLENBQUMsQ0FBQ0MsV0FBbUIsRUFBRUMsS0FBMkMsS0FBSztNQUMxRSxJQUFJQSxLQUFLLENBQUNDLElBQUksSUFBSUQsS0FBSyxDQUFDbEIsS0FBSyxFQUFFO1FBQzNCaUIsV0FBVyxVQUFRQyxLQUFLLENBQUNDLElBQUksU0FBSUQsS0FBSyxDQUFDbEIsS0FBTztNQUNsRDtNQUVBLE9BQU9pQixXQUFXO0lBQ3RCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FDTEcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUViLElBQUksQ0FBQ2hCLGlCQUFpQixDQUFDbkIsV0FBVyxFQUFFb0MsU0FBUyxDQUFDdEIsSUFBSSxDQUFDLENBQUM7RUFDeEQ7RUFFVUssaUJBQWlCQSxDQUFDbkIsV0FBbUIsRUFBRWMsSUFBWSxFQUFRO0lBQ2pFSixNQUFNLENBQUNDLFFBQVEsQ0FBQzBCLElBQUksR0FBTXJDLFdBQVcsU0FBSWMsSUFBTTtFQUNuRDtFQUVBLElBQWNoQixhQUFhQSxDQUFBLEVBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUNMLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQztFQUVBLElBQWNNLGdCQUFnQkEsQ0FBQSxFQUFXO0lBQ3JDLE9BQU8sSUFBSSxDQUFDTixZQUFZLENBQUMsb0JBQW9CLENBQUM7RUFDbEQ7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9DYXRhbG9nUGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvY2F0YWxvZy1wYWdlL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0NhdGFsb2dQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3Ivd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdpbmRvd0xvY2F0aW9uQXBwbGljYXRvckNvcmUgZnJvbSAnQ2F0YWxvZ1BhZ2UvY29tcG9uZW50cy9tb2xlY3VsZXMvd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3Ivd2luZG93LWxvY2F0aW9uLWFwcGxpY2F0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3IgZXh0ZW5kcyBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3JDb3JlIHtcbiAgICBwcm90ZWN0ZWQgc29ydFRyaWdnZXJzOiBIVE1MU2VsZWN0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc29ydFRyaWdnZXJzID0gPEhUTUxTZWxlY3RFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc29ydFRyaWdnZXJDbGFzc05hbWUpKTtcblxuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zb3J0VHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJFdmVudChldmVudCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBzdXBlci5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHNvcnRUcmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc29ydC10cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93TG9jYXRpb25BcHBsaWNhdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEJ1dHRvbkVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5mb3JtQ2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MQnV0dG9uRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlckV2ZW50KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJFdmVudChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlVcmwgPSAoPEhUTUxCdXR0b25FbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQpLmdldEF0dHJpYnV0ZSgnZGF0YS11cmwnKTtcbiAgICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEZvcm1EYXRhLnByb3RvdHlwZS5nZXQgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICBjb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9XG4gICAgICAgICAgICB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXQgIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICAgIGlmIChpc0Zvcm1EYXRhICYmIGlzVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLmdldFF1ZXJ5U3RyaW5nKGNhdGVnb3J5VXJsID8gY2F0ZWdvcnlVcmwgOiAnJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UXVlcnlTdHJpbmdBbHRlcm5hdGl2ZShjYXRlZ29yeVVybCA/IGNhdGVnb3J5VXJsIDogJycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRRdWVyeVN0cmluZyhjYXRlZ29yeVVybDogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKDxVUkxTZWFyY2hQYXJhbXM+Zm9ybURhdGEpO1xuXG4gICAgICAgIGZvcm1EYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFdpbmRvd0xvY2F0aW9uKGNhdGVnb3J5VXJsLCBkYXRhLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRRdWVyeVN0cmluZ0FsdGVybmF0aXZlKGNhdGVnb3J5VXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0RmllbGRzID0gPEhUTUxTZWxlY3RFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZElucHV0RmllbGRzID0gaW5wdXRGaWVsZHMuZmlsdGVyKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChpbnB1dC5jaGVja2VkIHx8IGlucHV0LnR5cGUgPT09ICdudW1iZXInIHx8IGlucHV0LnR5cGUgPT09ICdoaWRkZW4nKSAmJiAhaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmb3JtRmllbGRzID0gWy4uLmZpbHRlcmVkSW5wdXRGaWVsZHMsIC4uLnNlbGVjdEZpZWxkc107XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGZvcm1GaWVsZHNcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjY3VtdWxhdG9yOiBzdHJpbmcsIGZpZWxkOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQubmFtZSAmJiBmaWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciArPSBgJiR7ZmllbGQubmFtZX09JHtmaWVsZC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgICAgICAgIH0sICcnKVxuICAgICAgICAgICAgLnNsaWNlKDEpO1xuXG4gICAgICAgIHRoaXMuc2V0V2luZG93TG9jYXRpb24oY2F0ZWdvcnlVcmwsIGVuY29kZVVSSShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFdpbmRvd0xvY2F0aW9uKGNhdGVnb3J5VXJsOiBzdHJpbmcsIGRhdGE6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke2NhdGVnb3J5VXJsfT8ke2RhdGF9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiV2luZG93TG9jYXRpb25BcHBsaWNhdG9yQ29yZSIsIldpbmRvd0xvY2F0aW9uQXBwbGljYXRvciIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwic29ydFRyaWdnZXJzIiwiaW5pdCIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNvcnRUcmlnZ2VyQ2xhc3NOYW1lIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblRyaWdnZXJFdmVudCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCIsImZvcm0iLCJ0cmlnZ2VycyIsInJlYWR5Q2FsbGJhY2siLCJmb3JtQ2xhc3NOYW1lIiwidHJpZ2dlckNsYXNzTmFtZSIsImNhdGVnb3J5VXJsIiwiY3VycmVudFRhcmdldCIsImlzRm9ybURhdGEiLCJGb3JtRGF0YSIsInByb3RvdHlwZSIsImdldCIsImlzVVJMU2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZ2V0UXVlcnlTdHJpbmciLCJnZXRRdWVyeVN0cmluZ0FsdGVybmF0aXZlIiwid2luZG93IiwibG9jYXRpb24iLCJwYXRobmFtZSIsImZvcm1EYXRhIiwiZGF0YSIsInZhbHVlIiwia2V5IiwibGVuZ3RoIiwiZGVsZXRlIiwic2V0V2luZG93TG9jYXRpb24iLCJ0b1N0cmluZyIsImlucHV0RmllbGRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzZWxlY3RGaWVsZHMiLCJmaWx0ZXJlZElucHV0RmllbGRzIiwiZmlsdGVyIiwiaW5wdXQiLCJjaGVja2VkIiwidHlwZSIsImRpc2FibGVkIiwiZm9ybUZpZWxkcyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiZmllbGQiLCJuYW1lIiwic2xpY2UiLCJlbmNvZGVVUkkiLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==