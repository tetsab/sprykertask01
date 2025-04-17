"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["product-item-color-selector"],{

/***/ "./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/product-item-color-selector/product-item-color-selector.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/product-item-color-selector/product-item-color-selector.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductItemColorSelector)
/* harmony export */ });
/* harmony import */ var ProductGroupWidget_components_molecules_product_item_color_selector_product_item_color_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ProductGroupWidget/components/molecules/product-item-color-selector/product-item-color-selector */ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-item-color-selector/product-item-color-selector.ts");

class ProductItemColorSelector extends ProductGroupWidget_components_molecules_product_item_color_selector_product_item_color_selector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productItemData = void 0;
    this.productItem = void 0;
  }
  getProductItemData() {
    super.getProductItemData();
    this.productItemData.reviewCount = this.reviewCount;
    this.productItemData.formAddToCartAction = this.formAddToCartAction;
  }
  get reviewCount() {
    return Number(this.currentSelection.getAttribute('data-product-review-count'));
  }
  get formAddToCartAction() {
    return this.currentSelection.getAttribute('data-product-add-to-cart-url');
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

/***/ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-item-color-selector/product-item-color-selector.ts":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/product-item-color-selector/product-item-color-selector.ts ***!
  \****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductItemColorSelector)
/* harmony export */ });
/* harmony import */ var _color_selector_color_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../color-selector/color-selector */ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts");

class ProductItemColorSelector extends _color_selector_color_selector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productItemData = void 0;
    this.productItem = void 0;
  }
  init() {
    if (this.productItemClassName) {
      this.productItem = this.closest("." + this.productItemClassName);
    }
    super.init();
  }
  onTriggerSelection(event) {
    super.onTriggerSelection(event);
    this.getProductItemData();
    this.productItem.updateProductItemData(this.productItemData);
  }
  getProductItemData() {
    this.productItemData = {
      imageUrl: this.imageUrl,
      imageAlt: this.productImageAlt,
      labels: this.labels ? JSON.parse(this.labels) : [],
      name: this.productItemName,
      ratingValue: this.ratingValue,
      defaultPrice: this.defaultPrice,
      originalPrice: this.originalPrice,
      detailPageUrl: this.detailPageUrl,
      addToCartUrl: this.addToCartUrl,
      ajaxAddToCartUrl: this.ajaxAddToCartUrl,
      addToCartFormAction: this.addToCartFormAction,
      sku: this.sku
    };
  }
  get imageUrl() {
    return this.currentSelection.getAttribute('data-product-image-src');
  }
  get labels() {
    return this.currentSelection.getAttribute('data-product-labels');
  }
  get productItemName() {
    return this.currentSelection.getAttribute('data-product-name');
  }
  get ratingValue() {
    return Number(this.currentSelection.getAttribute('data-product-rating'));
  }
  get defaultPrice() {
    return this.currentSelection.getAttribute('data-product-default-price');
  }
  get originalPrice() {
    return this.currentSelection.getAttribute('data-product-original-price');
  }
  get detailPageUrl() {
    return this.currentSelection.getAttribute('data-product-detail-page-url');
  }
  get addToCartUrl() {
    return this.currentSelection.getAttribute('data-product-add-to-cart-url');
  }
  get ajaxAddToCartUrl() {
    return this.currentSelection.getAttribute('data-product-ajax-add-to-cart-url');
  }
  get addToCartFormAction() {
    return this.currentSelection.getAttribute('data-product-add-to-cart-form-action');
  }
  get sku() {
    return this.currentSelection.getAttribute('data-product-sku');
  }
  get productItemClassName() {
    return this.getAttribute('product-item-class-name');
  }
  get productImageAlt() {
    return this.currentSelection.getAttribute('data-product-image-alt');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucHJvZHVjdC1pdGVtLWNvbG9yLXNlbGVjdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTJJO0FBRzVILE1BQU1DLHdCQUF3QixTQUFTRCx1SUFBNEIsQ0FBQztFQUFBRSxZQUFBO0lBQUEsU0FBQUMsU0FBQTtJQUFBLEtBQ3JFQyxlQUFlO0lBQUEsS0FDZkMsV0FBVztFQUFBO0VBRVhDLGtCQUFrQkEsQ0FBQSxFQUFTO0lBQ2pDLEtBQUssQ0FBQ0Esa0JBQWtCLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUNGLGVBQWUsQ0FBQ0csV0FBVyxHQUFHLElBQUksQ0FBQ0EsV0FBVztJQUNuRCxJQUFJLENBQUNILGVBQWUsQ0FBQ0ksbUJBQW1CLEdBQUcsSUFBSSxDQUFDQSxtQkFBbUI7RUFDdkU7RUFFQSxJQUFjRCxXQUFXQSxDQUFBLEVBQVc7SUFDaEMsT0FBT0UsTUFBTSxDQUFDLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUNDLFlBQVksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0VBQ2xGO0VBRUEsSUFBY0gsbUJBQW1CQSxDQUFBLEVBQVc7SUFDeEMsT0FBTyxJQUFJLENBQUNFLGdCQUFnQixDQUFDQyxZQUFZLENBQUMsOEJBQThCLENBQUM7RUFDN0U7QUFDSjs7Ozs7Ozs7Ozs7Ozs7O0FDcEJnRDtBQUVqQyxNQUFNRSxhQUFhLFNBQVNELCtEQUFTLENBQUM7RUFBQVYsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUN2Q1csUUFBUTtJQUFBLEtBQ1JKLGdCQUFnQjtFQUFBO0VBRWhCSyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksQ0FBQ0YsUUFBUSxHQUFrQkcsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sV0FBUSxDQUFDLENBQUM7SUFFOUYsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtF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QWdCLENBQUNDLFlBQVksQ0FBQyxzQ0FBc0MsQ0FBQztFQUNyRjtFQUVBLElBQWM0QyxHQUFHQSxDQUFBLEVBQVc7SUFDeEIsT0FBTyxJQUFJLENBQUM3QyxnQkFBZ0IsQ0FBQ0MsWUFBWSxDQUFDLGtCQUFrQixDQUFDO0VBQ2pFO0VBRUEsSUFBYzBCLG9CQUFvQkEsQ0FBQSxFQUFXO0lBQ3pDLE9BQU8sSUFBSSxDQUFDMUIsWUFBWSxDQUFDLHlCQUF5QixDQUFDO0VBQ3ZEO0VBRUEsSUFBYytCLGVBQWVBLENBQUEsRUFBVztJQUNwQyxPQUFPLElBQUksQ0FBQ2hDLGdCQUFnQixDQUFDQyxZQUFZLENBQUMsd0JBQXdCLENBQUM7RUFDdkU7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9Qcm9kdWN0R3JvdXBXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0tY29sb3Itc2VsZWN0b3IvcHJvZHVjdC1pdGVtLWNvbG9yLXNlbGVjdG9yLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1ncm91cC13aWRnZXQvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvUHJvZHVjdEdyb3VwV2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29sb3Itc2VsZWN0b3IvY29sb3Itc2VsZWN0b3IudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LWdyb3VwLXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0R3JvdXBXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0tY29sb3Itc2VsZWN0b3IvcHJvZHVjdC1pdGVtLWNvbG9yLXNlbGVjdG9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9kdWN0SXRlbUNvbG9yU2VsZWN0b3JDb3JlIGZyb20gJ1Byb2R1Y3RHcm91cFdpZGdldC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0tY29sb3Itc2VsZWN0b3IvcHJvZHVjdC1pdGVtLWNvbG9yLXNlbGVjdG9yJztcbmltcG9ydCBQcm9kdWN0SXRlbSwgeyBQcm9kdWN0SXRlbURhdGEgfSBmcm9tICdTaG9wVWlQcm9qZWN0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0SXRlbUNvbG9yU2VsZWN0b3IgZXh0ZW5kcyBQcm9kdWN0SXRlbUNvbG9yU2VsZWN0b3JDb3JlIHtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEl0ZW1EYXRhOiBQcm9kdWN0SXRlbURhdGE7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJdGVtOiBQcm9kdWN0SXRlbTtcblxuICAgIHByb3RlY3RlZCBnZXRQcm9kdWN0SXRlbURhdGEoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLmdldFByb2R1Y3RJdGVtRGF0YSgpO1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtRGF0YS5yZXZpZXdDb3VudCA9IHRoaXMucmV2aWV3Q291bnQ7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1EYXRhLmZvcm1BZGRUb0NhcnRBY3Rpb24gPSB0aGlzLmZvcm1BZGRUb0NhcnRBY3Rpb247XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCByZXZpZXdDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuY3VycmVudFNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1yZXZpZXctY291bnQnKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmb3JtQWRkVG9DYXJ0QWN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtYWRkLXRvLWNhcnQtdXJsJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbG9yU2VsZWN0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNlbGVjdGlvbjogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faXRlbWApKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlck1vdXNlZW50ZXJFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyTW91c2VlbnRlckV2ZW50KCkge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlclNlbGVjdGlvbihldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyU2VsZWN0aW9uKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTZWxlY3Rpb24gPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUl0ZW1TZWxlY3Rpb25zKCk7XG4gICAgICAgIHRoaXMuc2V0QWN0aXZlSXRlbVNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZXNldEFjdGl2ZUl0ZW1TZWxlY3Rpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hY3RpdmVJdGVtQ2xhc3NOYW1lKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldEFjdGl2ZUl0ZW1TZWxlY3Rpb24oc2VsZWN0aW9uPzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgKHNlbGVjdGlvbiB8fCB0aGlzLmN1cnJlbnRTZWxlY3Rpb24pLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVJdGVtQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFjdGl2ZUl0ZW1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtaXRlbS1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFByb2R1Y3RJdGVtLCB7IFByb2R1Y3RJdGVtRGF0YSB9IGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtJztcbmltcG9ydCBDb2xvclNlbGVjdG9yIGZyb20gJy4uL2NvbG9yLXNlbGVjdG9yL2NvbG9yLXNlbGVjdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdEl0ZW1Db2xvclNlbGVjdG9yIGV4dGVuZHMgQ29sb3JTZWxlY3RvciB7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJdGVtRGF0YTogUHJvZHVjdEl0ZW1EYXRhO1xuICAgIHByb3RlY3RlZCBwcm9kdWN0SXRlbTogUHJvZHVjdEl0ZW07XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEl0ZW1DbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEl0ZW0gPSA8UHJvZHVjdEl0ZW0+dGhpcy5jbG9zZXN0KGAuJHt0aGlzLnByb2R1Y3RJdGVtQ2xhc3NOYW1lfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJTZWxlY3Rpb24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uVHJpZ2dlclNlbGVjdGlvbihldmVudCk7XG4gICAgICAgIHRoaXMuZ2V0UHJvZHVjdEl0ZW1EYXRhKCk7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW0udXBkYXRlUHJvZHVjdEl0ZW1EYXRhKHRoaXMucHJvZHVjdEl0ZW1EYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0UHJvZHVjdEl0ZW1EYXRhKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtRGF0YSA9IHtcbiAgICAgICAgICAgIGltYWdlVXJsOiB0aGlzLmltYWdlVXJsLFxuICAgICAgICAgICAgaW1hZ2VBbHQ6IHRoaXMucHJvZHVjdEltYWdlQWx0LFxuICAgICAgICAgICAgbGFiZWxzOiB0aGlzLmxhYmVscyA/IEpTT04ucGFyc2UodGhpcy5sYWJlbHMpIDogW10sXG4gICAgICAgICAgICBuYW1lOiB0aGlzLnByb2R1Y3RJdGVtTmFtZSxcbiAgICAgICAgICAgIHJhdGluZ1ZhbHVlOiB0aGlzLnJhdGluZ1ZhbHVlLFxuICAgICAgICAgICAgZGVmYXVsdFByaWNlOiB0aGlzLmRlZmF1bHRQcmljZSxcbiAgICAgICAgICAgIG9yaWdpbmFsUHJpY2U6IHRoaXMub3JpZ2luYWxQcmljZSxcbiAgICAgICAgICAgIGRldGFpbFBhZ2VVcmw6IHRoaXMuZGV0YWlsUGFnZVVybCxcbiAgICAgICAgICAgIGFkZFRvQ2FydFVybDogdGhpcy5hZGRUb0NhcnRVcmwsXG4gICAgICAgICAgICBhamF4QWRkVG9DYXJ0VXJsOiB0aGlzLmFqYXhBZGRUb0NhcnRVcmwsXG4gICAgICAgICAgICBhZGRUb0NhcnRGb3JtQWN0aW9uOiB0aGlzLmFkZFRvQ2FydEZvcm1BY3Rpb24sXG4gICAgICAgICAgICBza3U6IHRoaXMuc2t1LFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1pbWFnZS1zcmMnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGxhYmVscygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWxhYmVscycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcHJvZHVjdEl0ZW1OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcmF0aW5nVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmN1cnJlbnRTZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtcmF0aW5nJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZGVmYXVsdFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtZGVmYXVsdC1wcmljZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgb3JpZ2luYWxQcmljZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LW9yaWdpbmFsLXByaWNlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBkZXRhaWxQYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWxlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLXByb2R1Y3QtZGV0YWlsLXBhZ2UtdXJsJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRUb0NhcnRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hZGQtdG8tY2FydC11cmwnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFqYXhBZGRUb0NhcnRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hamF4LWFkZC10by1jYXJ0LXVybCcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWRkVG9DYXJ0Rm9ybUFjdGlvbigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWFkZC10by1jYXJ0LWZvcm0tYWN0aW9uJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBza3UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFNlbGVjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1za3UnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb2R1Y3RJdGVtQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHJvZHVjdC1pdGVtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb2R1Y3RJbWFnZUFsdCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VsZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWltYWdlLWFsdCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJQcm9kdWN0SXRlbUNvbG9yU2VsZWN0b3JDb3JlIiwiUHJvZHVjdEl0ZW1Db2xvclNlbGVjdG9yIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJwcm9kdWN0SXRlbURhdGEiLCJwcm9kdWN0SXRlbSIsImdldFByb2R1Y3RJdGVtRGF0YSIsInJldmlld0NvdW50IiwiZm9ybUFkZFRvQ2FydEFjdGlvbiIsIk51bWJlciIsImN1cnJlbnRTZWxlY3Rpb24iLCJnZXRBdHRyaWJ1dGUiLCJDb21wb25lbnQiLCJDb2xvclNlbGVjdG9yIiwidHJpZ2dlcnMiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBUcmlnZ2VyTW91c2VlbnRlckV2ZW50IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblRyaWdnZXJTZWxlY3Rpb24iLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnRUYXJnZXQiLCJyZXNldEFjdGl2ZUl0ZW1TZWxlY3Rpb25zIiwic2V0QWN0aXZlSXRlbVNlbGVjdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFjdGl2ZUl0ZW1DbGFzc05hbWUiLCJzZWxlY3Rpb24iLCJhZGQiLCJwcm9kdWN0SXRlbUNsYXNzTmFtZSIsImNsb3Nlc3QiLCJ1cGRhdGVQcm9kdWN0SXRlbURhdGEiLCJpbWFnZVVybCIsImltYWdlQWx0IiwicHJvZHVjdEltYWdlQWx0IiwibGFiZWxzIiwiSlNPTiIsInBhcnNlIiwibmFtZSIsInByb2R1Y3RJdGVtTmFtZSIsInJhdGluZ1ZhbHVlIiwiZGVmYXVsdFByaWNlIiwib3JpZ2luYWxQcmljZSIsImRldGFpbFBhZ2VVcmwiLCJhZGRUb0NhcnRVcmwiLCJhamF4QWRkVG9DYXJ0VXJsIiwiYWRkVG9DYXJ0Rm9ybUFjdGlvbiIsInNrdSJdLCJzb3VyY2VSb290IjoiIn0=