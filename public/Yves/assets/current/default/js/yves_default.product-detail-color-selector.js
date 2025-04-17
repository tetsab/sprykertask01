"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["product-detail-color-selector"],{

/***/ "./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.ts ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductDetailColorSelector)
/* harmony export */ });
/* harmony import */ var ProductGroupWidget_components_molecules_product_detail_color_selector_product_detail_color_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ProductGroupWidget/components/molecules/product-detail-color-selector/product-detail-color-selector */ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.ts");

class ProductDetailColorSelector extends ProductGroupWidget_components_molecules_product_detail_color_selector_product_detail_color_selector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.imageGallery = void 0;
  }
  init() {
    super.init();
    this.imageGallery = document.getElementsByClassName(this.imageCarouselClassName)[0];
  }
  onTriggerSelection(event) {
    event.preventDefault();
    this.currentSelection = event.currentTarget;
    this.resetActiveItemSelections();
    this.setActiveItemSelection();
    this.imageGallery.slideImageUrl = this.imageUrl;
  }
  onTriggerUnselection() {
    var firstTriggerElement = this.triggers[0];
    this.resetActiveItemSelections();
    this.setActiveItemSelection(firstTriggerElement);
    this.imageGallery.restoreDefaultImageUrl();
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts":
/*!**************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts ***!
  \**************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorSelector)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class ColorSelector extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
    this.currentSelection = void 0;
  }
  readyCallback() {}
  init() {
    this.triggers = Array.from(this.getElementsByClassName(this.jsName + "__item"));
    this.mapEvents();
  }
  mapEvents() {
    this.mapTriggerMouseenterEvent();
  }
  mapTriggerMouseenterEvent() {
    this.triggers.forEach(element => {
      element.addEventListener('mouseenter', event => this.onTriggerSelection(event));
    });
  }
  onTriggerSelection(event) {
    event.preventDefault();
    this.currentSelection = event.currentTarget;
    this.resetActiveItemSelections();
    this.setActiveItemSelection();
  }
  resetActiveItemSelections() {
    this.triggers.forEach(element => {
      element.classList.remove(this.activeItemClassName);
    });
  }
  setActiveItemSelection(selection) {
    (selection || this.currentSelection).classList.add(this.activeItemClassName);
  }
  get activeItemClassName() {
    return this.getAttribute('active-item-class-name');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.ts":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-detail-color-selector/product-detail-color-selector.ts ***!
  \********************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductDetailColorSelector)
/* harmony export */ });
/* harmony import */ var _color_selector_color_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color-selector/color-selector */ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts");

class ProductDetailColorSelector extends _color_selector_color_selector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.imageCarousel = void 0;
  }
  init() {
    super.init();
    this.imageCarousel = document.getElementsByClassName(this.imageCarouselClassName)[0];
  }
  mapEvents() {
    super.mapEvents();
    this.mapTriggerMouseleaveEvent();
  }
  mapTriggerMouseleaveEvent() {
    this.triggers.forEach(element => {
      element.addEventListener('mouseleave', () => this.onTriggerUnselection());
    });
  }
  onTriggerSelection(event) {
    super.onTriggerSelection(event);
    this.imageCarousel.slideImageUrl = this.imageUrl;
  }
  onTriggerUnselection() {
    var firstTriggerElement = this.triggers[0];
    this.resetActiveItemSelections();
    this.setActiveItemSelection(firstTriggerElement);
    this.imageCarousel.restoreDefaultImageUrl();
  }
  get imageUrl() {
    return this.currentSelection.getAttribute('data-product-image-src');
  }
  get imageCarouselClassName() {
    return this.getAttribute('image-carousel-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucHJvZHVjdC1kZXRhaWwtY29sb3Itc2VsZWN0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBaUo7QUFHbEksTUFBTUMsMEJBQTBCLFNBQVNELDJJQUE4QixDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDekVDLFlBQVk7RUFBQTtFQUVaQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsS0FBSyxDQUFDQSxJQUFJLENBQUMsQ0FBQztJQUVaLElBQUksQ0FBQ0QsWUFBWSxHQUFpQkUsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUNDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JHO0VBRVVDLGtCQUFrQkEsQ0FBQ0MsS0FBWSxFQUFRO0lBQzdDQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ0MsZ0JBQWdCLEdBQWdCRixLQUFLLENBQUNHLGFBQWE7SUFDeEQsSUFBSSxDQUFDQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQ0Msc0JBQXNCLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUNYLFlBQVksQ0FBQ1ksYUFBYSxHQUFHLElBQUksQ0FBQ0MsUUFBUTtFQUNuRDtFQUVVQyxvQkFBb0JBLENBQUEsRUFBUztJQUNuQyxJQUFNQyxtQkFBbUIsR0FBZ0IsSUFBSSxDQUFDQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3pELElBQUksQ0FBQ04seUJBQXlCLENBQUMsQ0FBQztJQUNoQyxJQUFJLENBQUNDLHNCQUFzQixDQUFDSSxtQkFBbUIsQ0FBQztJQUNoRCxJQUFJLENBQUNmLFlBQVksQ0FBQ2lCLHNCQUFzQixDQUFDLENBQUM7RUFDOUM7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDMUJnRDtBQUVqQyxNQUFNRSxhQUFhLFNBQVNELCtEQUFTLENBQUM7RUFBQXBCLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDdkNpQixRQUFRO0lBQUEsS0FD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QUksQ0FBQ0Msc0JBQXNCLENBQUNJLG1CQUFtQixDQUFDO0lBQ2hELElBQUksQ0FBQ29CLGFBQWEsQ0FBQ2xCLHNCQUFzQixDQUFDLENBQUM7RUFDL0M7RUFFQSxJQUFjSixRQUFRQSxDQUFBLEVBQVc7SUFDN0IsT0FBTyxJQUFJLENBQUNMLGdCQUFnQixDQUFDMEIsWUFBWSxDQUFDLHdCQUF3QixDQUFDO0VBQ3ZFO0VBRUEsSUFBYzlCLHNCQUFzQkEsQ0FBQSxFQUFXO0lBQzNDLE9BQU8sSUFBSSxDQUFDOEIsWUFBWSxDQUFDLDJCQUEyQixDQUFDO0VBQ3pEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9zcmMvUHl6L1l2ZXMvUHJvZHVjdEdyb3VwV2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcHJvZHVjdC1kZXRhaWwtY29sb3Itc2VsZWN0b3IvcHJvZHVjdC1kZXRhaWwtY29sb3Itc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LWdyb3VwLXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0R3JvdXBXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jb2xvci1zZWxlY3Rvci9jb2xvci1zZWxlY3Rvci50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Byb2R1Y3QtZ3JvdXAtd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Byb2R1Y3RHcm91cFdpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtZGV0YWlsLWNvbG9yLXNlbGVjdG9yL3Byb2R1Y3QtZGV0YWlsLWNvbG9yLXNlbGVjdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9kdWN0RGV0YWlsQ29sb3JTZWxlY3RvckNvcmUgZnJvbSAnUHJvZHVjdEdyb3VwV2lkZ2V0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtZGV0YWlsLWNvbG9yLXNlbGVjdG9yL3Byb2R1Y3QtZGV0YWlsLWNvbG9yLXNlbGVjdG9yJztcbmltcG9ydCBJbWFnZUdhbGxlcnkgZnJvbSAnUHJvZHVjdEltYWdlV2lkZ2V0UHJvamVjdC9jb21wb25lbnRzL21vbGVjdWxlcy9pbWFnZS1nYWxsZXJ5L2ltYWdlLWdhbGxlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0RGV0YWlsQ29sb3JTZWxlY3RvciBleHRlbmRzIFByb2R1Y3REZXRhaWxDb2xvclNlbGVjdG9yQ29yZSB7XG4gICAgcHJvdGVjdGVkIGltYWdlR2FsbGVyeTogSW1hZ2VHYWxsZXJ5O1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcblxuICAgICAgICB0aGlzLmltYWdlR2FsbGVyeSA9IDxJbWFnZUdhbGxlcnk+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmltYWdlQ2Fyb3VzZWxDbGFzc05hbWUpWzBdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJTZWxlY3Rpb24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGlvbiA9IDxIVE1MRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbVNlbGVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtU2VsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMuaW1hZ2VHYWxsZXJ5LnNsaWRlSW1hZ2VVcmwgPSB0aGlzLmltYWdlVXJsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJVbnNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlyc3RUcmlnZ2VyRWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLnRyaWdnZXJzWzBdO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbVNlbGVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtU2VsZWN0aW9uKGZpcnN0VHJpZ2dlckVsZW1lbnQpO1xuICAgICAgICB0aGlzLmltYWdlR2FsbGVyeS5yZXN0b3JlRGVmYXVsdEltYWdlVXJsKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNlbGVjdGlvbjogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faXRlbWApKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlck1vdXNlZW50ZXJFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyTW91c2VlbnRlckV2ZW50KCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlclNlbGVjdGlvbihldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyU2VsZWN0aW9uKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW1TZWxlY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbVNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXNldEFjdGl2ZUl0ZW1TZWxlY3Rpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hY3RpdmVJdGVtQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEFjdGl2ZUl0ZW1TZWxlY3Rpb24oc2VsZWN0aW9uPzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgKHNlbGVjdGlvbiB8fCB0aGlzLmN1cnJlbnRTZWxlY3Rpb24pLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVJdGVtQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFjdGl2ZUl0ZW1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtaXRlbS1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbG9yU2VsZWN0b3IgZnJvbSAnLi4vY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3InO1xuaW1wb3J0IEltYWdlQ2Fyb3VzZWwgZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL2ltYWdlLWNhcm91c2VsL2ltYWdlLWNhcm91c2VsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdERldGFpbENvbG9yU2VsZWN0b3IgZXh0ZW5kcyBDb2xvclNlbGVjdG9yIHtcbiAgICBwcm90ZWN0ZWQgaW1hZ2VDYXJvdXNlbDogSW1hZ2VDYXJvdXNlbDtcblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICBzdXBlci5pbml0KCk7XG5cbiAgICAgICAgdGhpcy5pbWFnZUNhcm91c2VsID0gPEltYWdlQ2Fyb3VzZWw+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmltYWdlQ2Fyb3VzZWxDbGFzc05hbWUpWzBdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm1hcEV2ZW50cygpO1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJNb3VzZWxlYXZlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwVHJpZ2dlck1vdXNlbGVhdmVFdmVudCgpIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5vblRyaWdnZXJVbnNlbGVjdGlvbigpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlclNlbGVjdGlvbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25UcmlnZ2VyU2VsZWN0aW9uKGV2ZW50KTtcbiAgICAgICAgdGhpcy5pbWFnZUNhcm91c2VsLnNsaWRlSW1hZ2VVcmwgPSB0aGlzLmltYWdlVXJsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJVbnNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmlyc3RUcmlnZ2VyRWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLnRyaWdnZXJzWzBdO1xuXG4gICAgICAgIHRoaXMucmVzZXRBY3RpdmVJdGVtU2VsZWN0aW9ucygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUl0ZW1TZWxlY3Rpb24oZmlyc3RUcmlnZ2VyRWxlbWVudCk7XG4gICAgICAgIHRoaXMuaW1hZ2VDYXJvdXNlbC5yZXN0b3JlRGVmYXVsdEltYWdlVXJsKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWltYWdlLXNyYycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaW1hZ2VDYXJvdXNlbENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ltYWdlLWNhcm91c2VsLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiUHJvZHVjdERldGFpbENvbG9yU2VsZWN0b3JDb3JlIiwiUHJvZHVjdERldGFpbENvbG9yU2VsZWN0b3IiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsImltYWdlR2FsbGVyeSIsImluaXQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbWFnZUNhcm91c2VsQ2xhc3NOYW1lIiwib25UcmlnZ2VyU2VsZWN0aW9uIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnRTZWxlY3Rpb24iLCJjdXJyZW50VGFyZ2V0IiwicmVzZXRBY3RpdmVJdGVtU2VsZWN0aW9ucyIsInNldEFjdGl2ZUl0ZW1TZWxlY3Rpb24iLCJzbGlkZUltYWdlVXJsIiwiaW1hZ2VVcmwiLCJvblRyaWdnZXJVbnNlbGVjdGlvbiIsImZpcnN0VHJpZ2dlckVsZW1lbnQiLCJ0cmlnZ2VycyIsInJlc3RvcmVEZWZhdWx0SW1hZ2VVcmwiLCJDb21wb25lbnQiLCJDb2xvclNlbGVjdG9yIiwicmVhZHlDYWxsYmFjayIsIkFycmF5IiwiZnJvbSIsImpzTmFtZSIsIm1hcEV2ZW50cyIsIm1hcFRyaWdnZXJNb3VzZWVudGVyRXZlbnQiLCJmb3JFYWNoIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhY3RpdmVJdGVtQ2xhc3NOYW1lIiwic2VsZWN0aW9uIiwiYWRkIiwiZ2V0QXR0cmlidXRlIiwiaW1hZ2VDYXJvdXNlbCIsIm1hcFRyaWdnZXJNb3VzZWxlYXZlRXZlbnQiXSwic291cmNlUm9vdCI6IiJ9