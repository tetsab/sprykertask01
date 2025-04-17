"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["product-set-cms-content"],{

/***/ "./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-cms-content/product-set-cms-content.ts":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-cms-content/product-set-cms-content.ts ***!
  \****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductSetCmsContent)
/* harmony export */ });
/* harmony import */ var _product_set_details_product_set_details__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../product-set-details/product-set-details */ "./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-details/product-set-details.ts");

class ProductSetCmsContent extends _product_set_details_product_set_details__WEBPACK_IMPORTED_MODULE_0__["default"] {}

/***/ }),

/***/ "./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-details/product-set-details.ts":
/*!********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-set-widget/src/SprykerShop/Yves/ProductSetWidget/Theme/default/components/organisms/product-set-details/product-set-details.ts ***!
  \********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProductSetDetails)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/components/molecules/product-item/product-item */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");


class ProductSetDetails extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productItems = void 0;
    this.targets = void 0;
  }
  readyCallback() {}
  init() {
    this.productItems = Array.from(this.getElementsByClassName(this.jsName + "__product-item"));
    this.targets = Array.from(this.getElementsByClassName(this.jsName + "__product-sku-hidden-input"));
    this.mapEvents();
  }
  mapEvents() {
    if (!this.productItems) {
      return;
    }
    this.mapProductItemUpdateAddToCartUrlCustomEvent();
  }
  mapProductItemUpdateAddToCartUrlCustomEvent() {
    this.productItems.forEach((element, index) => {
      element.addEventListener(ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__.EVENT_UPDATE_ADD_TO_CART_URL, event => {
        this.updateAddToCartUrls(event.detail.sku, index);
      });
    });
  }
  updateAddToCartUrls(sku, index) {
    if (this.targets[index]) {
      this.targets[index].value = sku;
    }
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_UPDATE_ADD_TO_CART_FORM_ACTION: () => (/* binding */ EVENT_UPDATE_ADD_TO_CART_FORM_ACTION),
/* harmony export */   EVENT_UPDATE_ADD_TO_CART_URL: () => (/* binding */ EVENT_UPDATE_ADD_TO_CART_URL),
/* harmony export */   EVENT_UPDATE_AJAX_ADD_TO_CART_URL: () => (/* binding */ EVENT_UPDATE_AJAX_ADD_TO_CART_URL),
/* harmony export */   EVENT_UPDATE_LABELS: () => (/* binding */ EVENT_UPDATE_LABELS),
/* harmony export */   EVENT_UPDATE_RATING: () => (/* binding */ EVENT_UPDATE_RATING),
/* harmony export */   "default": () => (/* binding */ ProductItem)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");


/**
 * @event updateRating An event emitted when the product rating has been updated.
 * @event updateLabels An event emitted when the product labels has been updated.
 * @event updateAddToCartUrl An event emitted when the product 'add to cart' URL has been updated.
 * @event updateAjaxAddToCartUrl An event emitted when the product AJAX 'add to cart' URL has been updated.
 * @event updateAddToCartFormAction An event emitted when the product 'add to cart' form action has been updated.
 */
var EVENT_UPDATE_RATING = 'updateRating';
var EVENT_UPDATE_LABELS = 'updateLabels';
var EVENT_UPDATE_ADD_TO_CART_URL = 'updateAddToCartUrl';
var EVENT_UPDATE_AJAX_ADD_TO_CART_URL = 'updateAjaxAddToCartUrl';
var EVENT_UPDATE_ADD_TO_CART_FORM_ACTION = 'updateAddToCartFormAction';
class ProductItem extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productImage = void 0;
    this.productName = void 0;
    this.productRating = void 0;
    this.productDefaultPrice = void 0;
    this.productSku = void 0;
    this.productOriginalPrice = void 0;
    this.productLinkDetailPage = void 0;
    this.productLinkAddToCart = void 0;
    this.productAjaxButtonAddToCart = void 0;
    this.productFormAddToCart = void 0;
    this.productButtonAddToCart = void 0;
  }
  readyCallback() {}
  init() {
    this.productImage = this.getElementsByClassName(this.jsName + "__image")[0];
    this.productName = this.getElementsByClassName(this.jsName + "__name")[0];
    this.productRating = this.getElementsByClassName(this.jsName + "__rating")[0];
    this.productDefaultPrice = this.getElementsByClassName(this.jsName + "__default-price")[0];
    this.productSku = this.getElementsByClassName(this.jsName + "__sku")[0];
    this.productOriginalPrice = this.getElementsByClassName(this.jsName + "__original-price")[0];
    this.productLinkDetailPage = Array.from(this.getElementsByClassName(this.jsName + "__link-detail-page"));
    this.productLinkAddToCart = this.getElementsByClassName(this.jsName + "__link-add-to-cart")[0];
    this.productAjaxButtonAddToCart = this.getElementsByClassName(this.jsName + "__ajax-button-add-to-cart")[0];
    this.productFormAddToCart = this.getElementsByClassName(this.jsName + "__form-add-to-cart")[0];
    this.productButtonAddToCart = this.getElementsByClassName(this.jsName + "__button-add-to-cart")[0];
  }

  /**
   * Sets the product card information.
   * @param data A data object for setting the product card information.
   */
  updateProductItemData(data) {
    var _data$sku, _data$ajaxAddToCartUr, _data$addToCartFormAc;
    this.imageUrl = data.imageUrl;
    this.imageAlt = data.imageAlt;
    this.labels = data.labels;
    this.productItemName = data.name;
    this.ratingValue = data.ratingValue;
    this.defaultPrice = data.defaultPrice;
    this.sku = (_data$sku = data.sku) != null ? _data$sku : null;
    this.originalPrice = data.originalPrice;
    this.detailPageUrl = data.detailPageUrl;
    this.addToCartUrl = data.addToCartUrl;
    this.ajaxAddToCartUrl = (_data$ajaxAddToCartUr = data.ajaxAddToCartUrl) != null ? _data$ajaxAddToCartUr : null;
    this.addToCartFormAction = (_data$addToCartFormAc = data.addToCartFormAction) != null ? _data$addToCartFormAc : null;
  }
  getSkuFromUrl(url) {
    if (!url) {
      return null;
    }
    var lastPartOfUrl = new RegExp("([^\\/])+$", 'g');
    var sku = url.match(lastPartOfUrl);
    return sku[0];
  }

  /**
   * Gets the product card image URL.
   */
  get imageUrl() {
    if (this.productImage) {
      return this.productImage.src;
    }
  }

  /**
   * Sets the product card image URL.
   * @param imageUrl A product card image URL.
   */
  set imageUrl(imageUrl) {
    if (this.productImage) {
      this.productImage.src = imageUrl;
    }
  }

  /**
   * Sets the product card image alt.
   * @param imageAlt A product card image alt.
   */
  set imageAlt(imageAlt) {
    if (this.productImage) {
      this.productImage.alt = imageAlt;
    }
  }

  /**
   * Sets the product card labels.
   * @param labels An array of product card labels.
   */
  set labels(labels) {
    this.dispatchCustomEvent(EVENT_UPDATE_LABELS, {
      labels
    });
  }

  /**
   * Gets the product card name.
   */
  get productItemName() {
    if (this.productName) {
      return this.productName.innerText;
    }
  }

  /**
   * Sets the product card name.
   * @param name A product card name.
   */
  set productItemName(name) {
    if (this.productName) {
      this.productName.innerText = name;
    }
  }

  /**
   * Gets the product card rating.
   */
  get ratingValue() {
    if (this.productRating) {
      return Number(this.productRating.value);
    }
  }

  /**
   * Sets the product card rating.
   * @param rating A product card rating.
   */
  set ratingValue(rating) {
    this.dispatchCustomEvent(EVENT_UPDATE_RATING, {
      rating
    });
  }

  /**
   * Gets the product card default price.
   */
  get defaultPrice() {
    if (this.productDefaultPrice) {
      return this.productDefaultPrice.innerText;
    }
  }

  /**
   * Sets the product card default price.
   * @param defaultPrice A product card default price.
   */
  set defaultPrice(defaultPrice) {
    if (this.productDefaultPrice) {
      this.productDefaultPrice.innerText = defaultPrice;
    }
  }

  /**
   * Gets the product card sku.
   */
  get sku() {
    if (this.productSku) {
      return this.productSku.content;
    }
  }

  /**
   * Sets the product card sku.
   * @param productSku A product card sku.
   */
  set sku(productSku) {
    if (this.productSku) {
      this.productSku.content = productSku;
    }
  }

  /**
   * Gets the product card original price.
   */
  get originalPrice() {
    if (this.productOriginalPrice) {
      return this.productOriginalPrice.innerText;
    }
  }

  /**
   * Sets the product card original price.
   * @param originalPrice A product card original price.
   */
  set originalPrice(originalPrice) {
    if (this.productOriginalPrice) {
      this.productOriginalPrice.innerText = originalPrice;
    }
  }

  /**
   * Gets the product card detail page URL.
   */
  get detailPageUrl() {
    if (this.productLinkDetailPage) {
      return this.productLinkDetailPage[0].href;
    }
  }

  /**
   * Sets the product card detail page URL.
   * @param detailPageUrl A product card detail page URL.
   */
  set detailPageUrl(detailPageUrl) {
    if (this.productLinkDetailPage) {
      this.productLinkDetailPage.forEach(element => element.href = detailPageUrl);
    }
  }

  /**
   * Gets the product card 'add to cart' URL.
   */
  get addToCartUrl() {
    if (this.productLinkAddToCart) {
      return this.productLinkAddToCart.href;
    }
  }

  /**
   * Sets the product card 'add to cart' URL.
   * @param addToCartUrl A product card 'add to cart' URL.
   */
  set addToCartUrl(addToCartUrl) {
    if (this.productLinkAddToCart) {
      this.productLinkAddToCart.href = addToCartUrl;
    }
    this.dispatchCustomEvent(EVENT_UPDATE_ADD_TO_CART_URL, {
      sku: this.getSkuFromUrl(addToCartUrl)
    });
  }

  /**
   * Gets the product card AJAX 'add to cart' URL.
   */
  get ajaxAddToCartUrl() {
    if (this.productAjaxButtonAddToCart) {
      return this.productAjaxButtonAddToCart.dataset.url;
    }
  }

  /**
   * Sets the product card AJAX 'add to cart' URL.
   * @param ajaxAddToCartUrl A product card AJAX 'add to cart' URL.
   */
  set ajaxAddToCartUrl(ajaxAddToCartUrl) {
    if (this.productAjaxButtonAddToCart) {
      this.productAjaxButtonAddToCart.disabled = !ajaxAddToCartUrl;
      this.productAjaxButtonAddToCart.dataset.url = ajaxAddToCartUrl;
    }
    this.dispatchCustomEvent(EVENT_UPDATE_AJAX_ADD_TO_CART_URL, {
      sku: this.getSkuFromUrl(ajaxAddToCartUrl)
    });
  }

  /**
   * Gets the product card 'add to cart' form action.
   */
  get addToCartFormAction() {
    if (this.productFormAddToCart) {
      return this.productFormAddToCart.action;
    }
    if (this.productButtonAddToCart) {
      return this.productButtonAddToCart.dataset.formAction;
    }
  }

  /**
   * Sets the product card 'add to cart' form action.
   * @param addToCartFormAction A product card 'add to cart' form action.
   */
  set addToCartFormAction(addToCartFormAction) {
    if (this.productFormAddToCart) {
      this.productFormAddToCart.action = addToCartFormAction;
    }
    if (this.productButtonAddToCart) {
      this.productButtonAddToCart.dataset.formAction = addToCartFormAction;
    }
    this.dispatchCustomEvent(EVENT_UPDATE_ADD_TO_CART_FORM_ACTION, {
      sku: this.getSkuFromUrl(addToCartFormAction)
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucHJvZHVjdC1zZXQtY21zLWNvbnRlbnQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBMkU7QUFFNUQsTUFBTUMsb0JBQW9CLFNBQVNELGdGQUFpQixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDRnBCO0FBQ2tFO0FBRW5HLE1BQU1BLGlCQUFpQixTQUFTRSwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDM0NDLFlBQVk7SUFBQSxLQUNaQyxPQUFPO0VBQUE7RUFFUEMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNILFlBQVksR0FBa0JJLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ0Msc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLG1CQUFnQixDQUFDLENBQUM7SUFDMUcsSUFBSSxDQUFDTixPQUFPLEdBQ1JHLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ0Msc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLCtCQUE0QixDQUFDLENBQ3JGO0lBRUQsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQ1IsWUFBWSxFQUFFO01BQ3BCO0lBQ0o7SUFFQSxJQUFJLENBQUNTLDJDQUEyQyxDQUFDLENBQUM7RUFDdEQ7RUFFVUEsMkNBQTJDQSxDQUFBLEVBQUc7SUFDcEQsSUFBSSxDQUFDVCxZQUFZLENBQUNVLE9BQU8sQ0FBQyxDQUFDQyxPQUFvQixFQUFFQyxLQUFhLEtBQUs7TUFDL0RELE9BQU8sQ0FBQ0UsZ0JBQWdCLENBQUNoQiwrR0FBNEIsRUFBR2lCLEtBQVksSUFBSztRQUNyRSxJQUFJLENBQUNDLG1CQUFtQixDQUFlRCxLQUFLLENBQUVFLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFTCxLQUFLLENBQUM7TUFDcEUsQ0FB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QU8sQ0FBQ0csVUFBVSxHQUFHakIsbUJBQW1CO0lBQ3hFO0lBRUEsSUFBSSxDQUFDUSxtQkFBbUIsQ0FBQ3JDLG9DQUFvQyxFQUFFO01BQzNETCxHQUFHLEVBQUUsSUFBSSxDQUFDbUMsYUFBYSxDQUFDRCxtQkFBbUI7SUFDL0MsQ0FBQyxDQUFDO0VBQ047QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1zZXQtd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Byb2R1Y3RTZXRXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL29yZ2FuaXNtcy9wcm9kdWN0LXNldC1jbXMtY29udGVudC9wcm9kdWN0LXNldC1jbXMtY29udGVudC50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Byb2R1Y3Qtc2V0LXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0U2V0V2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9vcmdhbmlzbXMvcHJvZHVjdC1zZXQtZGV0YWlscy9wcm9kdWN0LXNldC1kZXRhaWxzLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9kdWN0U2V0RGV0YWlscyBmcm9tICcuLi9wcm9kdWN0LXNldC1kZXRhaWxzL3Byb2R1Y3Qtc2V0LWRldGFpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0U2V0Q21zQ29udGVudCBleHRlbmRzIFByb2R1Y3RTZXREZXRhaWxzIHt9XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBQcm9kdWN0SXRlbSwgeyBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0U2V0RGV0YWlscyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJdGVtczogUHJvZHVjdEl0ZW1bXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0czogSFRNTElucHV0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1zID0gPFByb2R1Y3RJdGVtW10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LWl0ZW1gKSk7XG4gICAgICAgIHRoaXMudGFyZ2V0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LXNrdS1oaWRkZW4taW5wdXRgKSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wcm9kdWN0SXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwUHJvZHVjdEl0ZW1VcGRhdGVBZGRUb0NhcnRVcmxDdXN0b21FdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBQcm9kdWN0SXRlbVVwZGF0ZUFkZFRvQ2FydFVybEN1c3RvbUV2ZW50KCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtcy5mb3JFYWNoKChlbGVtZW50OiBQcm9kdWN0SXRlbSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFkZFRvQ2FydFVybHMoKDxDdXN0b21FdmVudD5ldmVudCkuZGV0YWlsLnNrdSwgaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVBZGRUb0NhcnRVcmxzKHNrdTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldHNbaW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaW5kZXhdLnZhbHVlID0gc2t1O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlUmF0aW5nIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCByYXRpbmcgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVMYWJlbHMgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0IGxhYmVscyBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFkZFRvQ2FydFVybCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBVUkwgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBamF4QWRkVG9DYXJ0VXJsIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCBBSkFYICdhZGQgdG8gY2FydCcgVVJMIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWRkVG9DYXJ0Rm9ybUFjdGlvbiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICovXG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX1JBVElORyA9ICd1cGRhdGVSYXRpbmcnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9MQUJFTFMgPSAndXBkYXRlTGFiZWxzJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFkZFRvQ2FydFVybCc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFqYXhBZGRUb0NhcnRVcmwnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9GT1JNX0FDVElPTiA9ICd1cGRhdGVBZGRUb0NhcnRGb3JtQWN0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0SXRlbUxhYmVsc0RhdGEge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEl0ZW1EYXRhIHtcbiAgICBpbWFnZVVybDogc3RyaW5nO1xuICAgIGltYWdlQWx0OiBzdHJpbmc7XG4gICAgbGFiZWxzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmF0aW5nVmFsdWU6IG51bWJlcjtcbiAgICBkZWZhdWx0UHJpY2U6IHN0cmluZztcbiAgICBza3U/OiBzdHJpbmc7XG4gICAgb3JpZ2luYWxQcmljZTogc3RyaW5nO1xuICAgIGRldGFpbFBhZ2VVcmw6IHN0cmluZztcbiAgICBhZGRUb0NhcnRVcmw6IHN0cmluZztcbiAgICBhamF4QWRkVG9DYXJ0VXJsPzogc3RyaW5nO1xuICAgIGFkZFRvQ2FydEZvcm1BY3Rpb24/OiBzdHJpbmc7XG59XG5cbnR5cGUgVXJsID0gc3RyaW5nIHwgbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBwcm9kdWN0SW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3ROYW1lOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFJhdGluZzogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdERlZmF1bHRQcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTa3U6IEhUTUxNZXRhRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdE9yaWdpbmFsUHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlua0RldGFpbFBhZ2U6IEhUTUxBbmNob3JFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaW5rQWRkVG9DYXJ0OiBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0Rm9ybUFkZFRvQ2FydDogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0QnV0dG9uQWRkVG9DYXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2ltYWdlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdE5hbWUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbmFtZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RSYXRpbmcgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19yYXRpbmdgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2RlZmF1bHQtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0U2t1ID0gPEhUTUxNZXRhRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19za3VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19vcmlnaW5hbC1wcmljZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSA9IDxIVE1MQW5jaG9yRWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGluay1kZXRhaWwtcGFnZWApKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0ID0gPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpbmstYWRkLXRvLWNhcnRgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0ID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2FqYXgtYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCA9IDxIVE1MRm9ybUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZm9ybS1hZGQtdG8tY2FydGApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIGRhdGEgQSBkYXRhIG9iamVjdCBmb3Igc2V0dGluZyB0aGUgcHJvZHVjdCBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RJdGVtRGF0YShkYXRhOiBQcm9kdWN0SXRlbURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IGRhdGEuaW1hZ2VVcmw7XG4gICAgICAgIHRoaXMuaW1hZ2VBbHQgPSBkYXRhLmltYWdlQWx0O1xuICAgICAgICB0aGlzLmxhYmVscyA9IGRhdGEubGFiZWxzO1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtTmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5yYXRpbmdWYWx1ZSA9IGRhdGEucmF0aW5nVmFsdWU7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByaWNlID0gZGF0YS5kZWZhdWx0UHJpY2U7XG4gICAgICAgIHRoaXMuc2t1ID0gZGF0YS5za3UgPz8gbnVsbDtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFByaWNlID0gZGF0YS5vcmlnaW5hbFByaWNlO1xuICAgICAgICB0aGlzLmRldGFpbFBhZ2VVcmwgPSBkYXRhLmRldGFpbFBhZ2VVcmw7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0VXJsID0gZGF0YS5hZGRUb0NhcnRVcmw7XG4gICAgICAgIHRoaXMuYWpheEFkZFRvQ2FydFVybCA9IGRhdGEuYWpheEFkZFRvQ2FydFVybCA/PyBudWxsO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydEZvcm1BY3Rpb24gPSBkYXRhLmFkZFRvQ2FydEZvcm1BY3Rpb24gPz8gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U2t1RnJvbVVybCh1cmw6IFVybCk6IFVybCB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhc3RQYXJ0T2ZVcmwgPSBuZXcgUmVnRXhwKGAoW15cXFxcL10pKyRgLCAnZycpO1xuICAgICAgICBjb25zdCBza3UgPSB1cmwubWF0Y2gobGFzdFBhcnRPZlVybCk7XG5cbiAgICAgICAgcmV0dXJuIHNrdVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RJbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqIEBwYXJhbSBpbWFnZVVybCBBIHByb2R1Y3QgY2FyZCBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZS5zcmMgPSBpbWFnZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBpbWFnZSBhbHQuXG4gICAgICogQHBhcmFtIGltYWdlQWx0IEEgcHJvZHVjdCBjYXJkIGltYWdlIGFsdC5cbiAgICAgKi9cbiAgICBzZXQgaW1hZ2VBbHQoaW1hZ2VBbHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEltYWdlLmFsdCA9IGltYWdlQWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGxhYmVscy5cbiAgICAgKiBAcGFyYW0gbGFiZWxzIEFuIGFycmF5IG9mIHByb2R1Y3QgY2FyZCBsYWJlbHMuXG4gICAgICovXG4gICAgc2V0IGxhYmVscyhsYWJlbHM6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YVtdKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfTEFCRUxTLCB7IGxhYmVscyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgcHJvZHVjdEl0ZW1OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TmFtZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKiBAcGFyYW0gbmFtZSBBIHByb2R1Y3QgY2FyZCBuYW1lLlxuICAgICAqL1xuICAgIHNldCBwcm9kdWN0SXRlbU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3ROYW1lLmlubmVyVGV4dCA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIGdldCByYXRpbmdWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0UmF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMucHJvZHVjdFJhdGluZy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqIEBwYXJhbSByYXRpbmcgQSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIHNldCByYXRpbmdWYWx1ZShyYXRpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX1JBVElORywgeyByYXRpbmcgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRQcmljZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqIEBwYXJhbSBkZWZhdWx0UHJpY2UgQSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKi9cbiAgICBzZXQgZGVmYXVsdFByaWNlKGRlZmF1bHRQcmljZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZS5pbm5lclRleHQgPSBkZWZhdWx0UHJpY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgc2t1LlxuICAgICAqL1xuICAgIGdldCBza3UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFNrdSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFNrdS5jb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIHNrdS5cbiAgICAgKiBAcGFyYW0gcHJvZHVjdFNrdSBBIHByb2R1Y3QgY2FyZCBza3UuXG4gICAgICovXG4gICAgc2V0IHNrdShwcm9kdWN0U2t1OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFNrdSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0U2t1LmNvbnRlbnQgPSBwcm9kdWN0U2t1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqL1xuICAgIGdldCBvcmlnaW5hbFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgb3JpZ2luYWwgcHJpY2UuXG4gICAgICogQHBhcmFtIG9yaWdpbmFsUHJpY2UgQSBwcm9kdWN0IGNhcmQgb3JpZ2luYWwgcHJpY2UuXG4gICAgICovXG4gICAgc2V0IG9yaWdpbmFsUHJpY2Uob3JpZ2luYWxQcmljZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlLmlubmVyVGV4dCA9IG9yaWdpbmFsUHJpY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBkZXRhaWxQYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlWzBdLmhyZWY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqIEBwYXJhbSBkZXRhaWxQYWdlVXJsIEEgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgZGV0YWlsUGFnZVVybChkZXRhaWxQYWdlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZS5mb3JFYWNoKChlbGVtZW50OiBIVE1MQW5jaG9yRWxlbWVudCkgPT4gKGVsZW1lbnQuaHJlZiA9IGRldGFpbFBhZ2VVcmwpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgYWRkVG9DYXJ0VXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydC5ocmVmO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRVcmwgQSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydFVybChhZGRUb0NhcnRVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydC5ocmVmID0gYWRkVG9DYXJ0VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwsIHsgc2t1OiB0aGlzLmdldFNrdUZyb21VcmwoYWRkVG9DYXJ0VXJsKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgYWpheEFkZFRvQ2FydFVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGF0YXNldC51cmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKiBAcGFyYW0gYWpheEFkZFRvQ2FydFVybCBBIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIHNldCBhamF4QWRkVG9DYXJ0VXJsKGFqYXhBZGRUb0NhcnRVcmw6IFVybCkge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kaXNhYmxlZCA9ICFhamF4QWRkVG9DYXJ0VXJsO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LnVybCA9IGFqYXhBZGRUb0NhcnRVcmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMLCB7IHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFqYXhBZGRUb0NhcnRVcmwpIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBhZGRUb0NhcnRGb3JtQWN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydC5hY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQuZm9ybUFjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRGb3JtQWN0aW9uIEEgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24uXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydEZvcm1BY3Rpb24oYWRkVG9DYXJ0Rm9ybUFjdGlvbjogVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0LmFjdGlvbiA9IGFkZFRvQ2FydEZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQuZGF0YXNldC5mb3JtQWN0aW9uID0gYWRkVG9DYXJ0Rm9ybUFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04sIHtcbiAgICAgICAgICAgIHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFkZFRvQ2FydEZvcm1BY3Rpb24pLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiUHJvZHVjdFNldERldGFpbHMiLCJQcm9kdWN0U2V0Q21zQ29udGVudCIsIkNvbXBvbmVudCIsIkVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInByb2R1Y3RJdGVtcyIsInRhcmdldHMiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBQcm9kdWN0SXRlbVVwZGF0ZUFkZFRvQ2FydFVybEN1c3RvbUV2ZW50IiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpbmRleCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInVwZGF0ZUFkZFRvQ2FydFVybHMiLCJkZXRhaWwiLCJza3UiLCJ2YWx1ZSIsIkVWRU5UX1VQREFURV9SQVRJTkciLCJFVkVOVF9VUERBVEVfTEFCRUxTIiwiRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OIiwiUHJvZHVjdEl0ZW0iLCJwcm9kdWN0SW1hZ2UiLCJwcm9kdWN0TmFtZSIsInByb2R1Y3RSYXRpbmciLCJwcm9kdWN0RGVmYXVsdFByaWNlIiwicHJvZHVjdFNrdSIsInByb2R1Y3RPcmlnaW5hbFByaWNlIiwicHJvZHVjdExpbmtEZXRhaWxQYWdlIiwicHJvZHVjdExpbmtBZGRUb0NhcnQiLCJwcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCIsInByb2R1Y3RGb3JtQWRkVG9DYXJ0IiwicHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCIsInVwZGF0ZVByb2R1Y3RJdGVtRGF0YSIsImRhdGEiLCJfZGF0YSRza3UiLCJfZGF0YSRhamF4QWRkVG9DYXJ0VXIiLCJfZGF0YSRhZGRUb0NhcnRGb3JtQWMiLCJpbWFnZVVybCIsImltYWdlQWx0IiwibGFiZWxzIiwicHJvZHVjdEl0ZW1OYW1lIiwibmFtZSIsInJhdGluZ1ZhbHVlIiwiZGVmYXVsdFByaWNlIiwib3JpZ2luYWxQcmljZSIsImRldGFpbFBhZ2VVcmwiLCJhZGRUb0NhcnRVcmwiLCJhamF4QWRkVG9DYXJ0VXJsIiwiYWRkVG9DYXJ0Rm9ybUFjdGlvbiIsImdldFNrdUZyb21VcmwiLCJ1cmwiLCJsYXN0UGFydE9mVXJsIiwiUmVnRXhwIiwibWF0Y2giLCJzcmMiLCJhbHQiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwiaW5uZXJUZXh0IiwiTnVtYmVyIiwicmF0aW5nIiwiY29udGVudCIsImhyZWYiLCJkYXRhc2V0IiwiZGlzYWJsZWQiLCJhY3Rpb24iLCJmb3JtQWN0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==