"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["product-set-details"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucHJvZHVjdC1zZXQtZGV0YWlscy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDa0U7QUFFbkcsTUFBTUUsaUJBQWlCLFNBQVNGLCtEQUFTLENBQUM7RUFBQUcsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUMzQ0MsWUFBWTtJQUFBLEtBQ1pDLE9BQU87RUFBQTtFQUVQQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksQ0FBQ0gsWUFBWSxHQUFrQkksS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sbUJBQWdCLENBQUMsQ0FBQztJQUMxRyxJQUFJLENBQUNOLE9BQU8sR0FDUkcsS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sK0JBQTRCLENBQUMsQ0FDckY7SUFFRCxJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCO0VBRVVBLFNBQVNBLENBQUEsRUFBUztJQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDUixZQUFZLEVBQUU7TUFDcEI7SUFDSjtJQUVBLElBQUksQ0FBQ1MsMkNBQTJDLENBQUMsQ0FBQztFQUN0RDtFQUVVQSwyQ0FBMkNBLENBQUEsRUFBRztJQUNwRCxJQUFJLENBQUNULFlBQVksQ0FBQ1UsT0FBTyxDQUFDLENBQUNDLE9BQW9CLEVBQUVDLEtBQWEsS0FBSztNQUMvREQsT0FBTyxDQUFDRSxnQkFBZ0IsQ0FBQ2pCLCtHQUE0QixFQUFHa0IsS0FBWSxJQUFLO1FBQ3JFLElBQUksQ0FBQ0MsbUJBQW1CLENBQWVELEtBQUssQ0FBRUUsTUFBTSxDQUFDQyxHQUFHLEVBQUVMLEtBQUssQ0FBQztNQUNwRSxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTjtFQUVVRyxtQkFBbUJBLENBQUNFLEdBQVcsRUFBRUwsS0FB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ckMsb0NBQW9DLEVBQUU7TUFDM0RMLEdBQUcsRUFBRSxJQUFJLENBQUNtQyxhQUFhLENBQUNELG1CQUFtQjtJQUMvQyxDQUFDLENBQUM7RUFDTjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LXNldC13aWRnZXQvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvUHJvZHVjdFNldFdpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvb3JnYW5pc21zL3Byb2R1Y3Qtc2V0LWRldGFpbHMvcHJvZHVjdC1zZXQtZGV0YWlscy50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcHJvZHVjdC1pdGVtL3Byb2R1Y3QtaXRlbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBQcm9kdWN0SXRlbSwgeyBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0U2V0RGV0YWlscyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJdGVtczogUHJvZHVjdEl0ZW1bXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0czogSFRNTElucHV0RWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1zID0gPFByb2R1Y3RJdGVtW10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LWl0ZW1gKSk7XG4gICAgICAgIHRoaXMudGFyZ2V0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcm9kdWN0LXNrdS1oaWRkZW4taW5wdXRgKSlcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wcm9kdWN0SXRlbXMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwUHJvZHVjdEl0ZW1VcGRhdGVBZGRUb0NhcnRVcmxDdXN0b21FdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBQcm9kdWN0SXRlbVVwZGF0ZUFkZFRvQ2FydFVybEN1c3RvbUV2ZW50KCkge1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtcy5mb3JFYWNoKChlbGVtZW50OiBQcm9kdWN0SXRlbSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFkZFRvQ2FydFVybHMoKDxDdXN0b21FdmVudD5ldmVudCkuZGV0YWlsLnNrdSwgaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVBZGRUb0NhcnRVcmxzKHNrdTogc3RyaW5nLCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldHNbaW5kZXhdKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldHNbaW5kZXhdLnZhbHVlID0gc2t1O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgdXBkYXRlUmF0aW5nIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCByYXRpbmcgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVMYWJlbHMgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0IGxhYmVscyBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFkZFRvQ2FydFVybCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBVUkwgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBamF4QWRkVG9DYXJ0VXJsIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCBBSkFYICdhZGQgdG8gY2FydCcgVVJMIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWRkVG9DYXJ0Rm9ybUFjdGlvbiBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICovXG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX1JBVElORyA9ICd1cGRhdGVSYXRpbmcnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9MQUJFTFMgPSAndXBkYXRlTGFiZWxzJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFkZFRvQ2FydFVybCc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMID0gJ3VwZGF0ZUFqYXhBZGRUb0NhcnRVcmwnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9GT1JNX0FDVElPTiA9ICd1cGRhdGVBZGRUb0NhcnRGb3JtQWN0aW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0SXRlbUxhYmVsc0RhdGEge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEl0ZW1EYXRhIHtcbiAgICBpbWFnZVVybDogc3RyaW5nO1xuICAgIGltYWdlQWx0OiBzdHJpbmc7XG4gICAgbGFiZWxzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXTtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcmF0aW5nVmFsdWU6IG51bWJlcjtcbiAgICBkZWZhdWx0UHJpY2U6IHN0cmluZztcbiAgICBza3U/OiBzdHJpbmc7XG4gICAgb3JpZ2luYWxQcmljZTogc3RyaW5nO1xuICAgIGRldGFpbFBhZ2VVcmw6IHN0cmluZztcbiAgICBhZGRUb0NhcnRVcmw6IHN0cmluZztcbiAgICBhamF4QWRkVG9DYXJ0VXJsPzogc3RyaW5nO1xuICAgIGFkZFRvQ2FydEZvcm1BY3Rpb24/OiBzdHJpbmc7XG59XG5cbnR5cGUgVXJsID0gc3RyaW5nIHwgbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdEl0ZW0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBwcm9kdWN0SW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3ROYW1lOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFJhdGluZzogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdERlZmF1bHRQcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RTa3U6IEhUTUxNZXRhRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdE9yaWdpbmFsUHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlua0RldGFpbFBhZ2U6IEhUTUxBbmNob3JFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaW5rQWRkVG9DYXJ0OiBIVE1MQW5jaG9yRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0Rm9ybUFkZFRvQ2FydDogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0QnV0dG9uQWRkVG9DYXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZSA9IDxIVE1MSW1hZ2VFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2ltYWdlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdE5hbWUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbmFtZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RSYXRpbmcgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19yYXRpbmdgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2RlZmF1bHQtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0U2t1ID0gPEhUTUxNZXRhRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19za3VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19vcmlnaW5hbC1wcmljZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSA9IDxIVE1MQW5jaG9yRWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGluay1kZXRhaWwtcGFnZWApKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0ID0gPEhUTUxBbmNob3JFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpbmstYWRkLXRvLWNhcnRgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0ID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2FqYXgtYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCA9IDxIVE1MRm9ybUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZm9ybS1hZGQtdG8tY2FydGApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYnV0dG9uLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW5mb3JtYXRpb24uXG4gICAgICogQHBhcmFtIGRhdGEgQSBkYXRhIG9iamVjdCBmb3Igc2V0dGluZyB0aGUgcHJvZHVjdCBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIHVwZGF0ZVByb2R1Y3RJdGVtRGF0YShkYXRhOiBQcm9kdWN0SXRlbURhdGEpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbWFnZVVybCA9IGRhdGEuaW1hZ2VVcmw7XG4gICAgICAgIHRoaXMuaW1hZ2VBbHQgPSBkYXRhLmltYWdlQWx0O1xuICAgICAgICB0aGlzLmxhYmVscyA9IGRhdGEubGFiZWxzO1xuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtTmFtZSA9IGRhdGEubmFtZTtcbiAgICAgICAgdGhpcy5yYXRpbmdWYWx1ZSA9IGRhdGEucmF0aW5nVmFsdWU7XG4gICAgICAgIHRoaXMuZGVmYXVsdFByaWNlID0gZGF0YS5kZWZhdWx0UHJpY2U7XG4gICAgICAgIHRoaXMuc2t1ID0gZGF0YS5za3UgPz8gbnVsbDtcbiAgICAgICAgdGhpcy5vcmlnaW5hbFByaWNlID0gZGF0YS5vcmlnaW5hbFByaWNlO1xuICAgICAgICB0aGlzLmRldGFpbFBhZ2VVcmwgPSBkYXRhLmRldGFpbFBhZ2VVcmw7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0VXJsID0gZGF0YS5hZGRUb0NhcnRVcmw7XG4gICAgICAgIHRoaXMuYWpheEFkZFRvQ2FydFVybCA9IGRhdGEuYWpheEFkZFRvQ2FydFVybCA/PyBudWxsO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydEZvcm1BY3Rpb24gPSBkYXRhLmFkZFRvQ2FydEZvcm1BY3Rpb24gPz8gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0U2t1RnJvbVVybCh1cmw6IFVybCk6IFVybCB7XG4gICAgICAgIGlmICghdXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxhc3RQYXJ0T2ZVcmwgPSBuZXcgUmVnRXhwKGAoW15cXFxcL10pKyRgLCAnZycpO1xuICAgICAgICBjb25zdCBza3UgPSB1cmwubWF0Y2gobGFzdFBhcnRPZlVybCk7XG5cbiAgICAgICAgcmV0dXJuIHNrdVswXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBpbWFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RJbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqIEBwYXJhbSBpbWFnZVVybCBBIHByb2R1Y3QgY2FyZCBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZS5zcmMgPSBpbWFnZVVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBpbWFnZSBhbHQuXG4gICAgICogQHBhcmFtIGltYWdlQWx0IEEgcHJvZHVjdCBjYXJkIGltYWdlIGFsdC5cbiAgICAgKi9cbiAgICBzZXQgaW1hZ2VBbHQoaW1hZ2VBbHQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEltYWdlLmFsdCA9IGltYWdlQWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGxhYmVscy5cbiAgICAgKiBAcGFyYW0gbGFiZWxzIEFuIGFycmF5IG9mIHByb2R1Y3QgY2FyZCBsYWJlbHMuXG4gICAgICovXG4gICAgc2V0IGxhYmVscyhsYWJlbHM6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YVtdKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfTEFCRUxTLCB7IGxhYmVscyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgcHJvZHVjdEl0ZW1OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TmFtZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKiBAcGFyYW0gbmFtZSBBIHByb2R1Y3QgY2FyZCBuYW1lLlxuICAgICAqL1xuICAgIHNldCBwcm9kdWN0SXRlbU5hbWUobmFtZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3ROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3ROYW1lLmlubmVyVGV4dCA9IG5hbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIGdldCByYXRpbmdWYWx1ZSgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0UmF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMucHJvZHVjdFJhdGluZy52YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqIEBwYXJhbSByYXRpbmcgQSBwcm9kdWN0IGNhcmQgcmF0aW5nLlxuICAgICAqL1xuICAgIHNldCByYXRpbmdWYWx1ZShyYXRpbmc6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX1JBVElORywgeyByYXRpbmcgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRQcmljZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqIEBwYXJhbSBkZWZhdWx0UHJpY2UgQSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKi9cbiAgICBzZXQgZGVmYXVsdFByaWNlKGRlZmF1bHRQcmljZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZS5pbm5lclRleHQgPSBkZWZhdWx0UHJpY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgc2t1LlxuICAgICAqL1xuICAgIGdldCBza3UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFNrdSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdFNrdS5jb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIHNrdS5cbiAgICAgKiBAcGFyYW0gcHJvZHVjdFNrdSBBIHByb2R1Y3QgY2FyZCBza3UuXG4gICAgICovXG4gICAgc2V0IHNrdShwcm9kdWN0U2t1OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFNrdSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0U2t1LmNvbnRlbnQgPSBwcm9kdWN0U2t1O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqL1xuICAgIGdldCBvcmlnaW5hbFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgb3JpZ2luYWwgcHJpY2UuXG4gICAgICogQHBhcmFtIG9yaWdpbmFsUHJpY2UgQSBwcm9kdWN0IGNhcmQgb3JpZ2luYWwgcHJpY2UuXG4gICAgICovXG4gICAgc2V0IG9yaWdpbmFsUHJpY2Uob3JpZ2luYWxQcmljZTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlLmlubmVyVGV4dCA9IG9yaWdpbmFsUHJpY2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqL1xuICAgIGdldCBkZXRhaWxQYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlWzBdLmhyZWY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqIEBwYXJhbSBkZXRhaWxQYWdlVXJsIEEgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgZGV0YWlsUGFnZVVybChkZXRhaWxQYWdlVXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZS5mb3JFYWNoKChlbGVtZW50OiBIVE1MQW5jaG9yRWxlbWVudCkgPT4gKGVsZW1lbnQuaHJlZiA9IGRldGFpbFBhZ2VVcmwpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgYWRkVG9DYXJ0VXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydC5ocmVmO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRVcmwgQSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydFVybChhZGRUb0NhcnRVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydC5ocmVmID0gYWRkVG9DYXJ0VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwsIHsgc2t1OiB0aGlzLmdldFNrdUZyb21VcmwoYWRkVG9DYXJ0VXJsKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgYWpheEFkZFRvQ2FydFVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGF0YXNldC51cmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKiBAcGFyYW0gYWpheEFkZFRvQ2FydFVybCBBIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIHNldCBhamF4QWRkVG9DYXJ0VXJsKGFqYXhBZGRUb0NhcnRVcmw6IFVybCkge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kaXNhYmxlZCA9ICFhamF4QWRkVG9DYXJ0VXJsO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LnVybCA9IGFqYXhBZGRUb0NhcnRVcmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMLCB7IHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFqYXhBZGRUb0NhcnRVcmwpIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBhZGRUb0NhcnRGb3JtQWN0aW9uKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydC5hY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQuZm9ybUFjdGlvbjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqIEBwYXJhbSBhZGRUb0NhcnRGb3JtQWN0aW9uIEEgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24uXG4gICAgICovXG4gICAgc2V0IGFkZFRvQ2FydEZvcm1BY3Rpb24oYWRkVG9DYXJ0Rm9ybUFjdGlvbjogVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0LmFjdGlvbiA9IGFkZFRvQ2FydEZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQuZGF0YXNldC5mb3JtQWN0aW9uID0gYWRkVG9DYXJ0Rm9ybUFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04sIHtcbiAgICAgICAgICAgIHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFkZFRvQ2FydEZvcm1BY3Rpb24pLFxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCIsIlByb2R1Y3RTZXREZXRhaWxzIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJwcm9kdWN0SXRlbXMiLCJ0YXJnZXRzIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwibWFwUHJvZHVjdEl0ZW1VcGRhdGVBZGRUb0NhcnRVcmxDdXN0b21FdmVudCIsImZvckVhY2giLCJlbGVtZW50IiwiaW5kZXgiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ1cGRhdGVBZGRUb0NhcnRVcmxzIiwiZGV0YWlsIiwic2t1IiwidmFsdWUiLCJFVkVOVF9VUERBVEVfUkFUSU5HIiwiRVZFTlRfVVBEQVRFX0xBQkVMUyIsIkVWRU5UX1VQREFURV9BSkFYX0FERF9UT19DQVJUX1VSTCIsIkVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9GT1JNX0FDVElPTiIsIlByb2R1Y3RJdGVtIiwicHJvZHVjdEltYWdlIiwicHJvZHVjdE5hbWUiLCJwcm9kdWN0UmF0aW5nIiwicHJvZHVjdERlZmF1bHRQcmljZSIsInByb2R1Y3RTa3UiLCJwcm9kdWN0T3JpZ2luYWxQcmljZSIsInByb2R1Y3RMaW5rRGV0YWlsUGFnZSIsInByb2R1Y3RMaW5rQWRkVG9DYXJ0IiwicHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQiLCJwcm9kdWN0Rm9ybUFkZFRvQ2FydCIsInByb2R1Y3RCdXR0b25BZGRUb0NhcnQiLCJ1cGRhdGVQcm9kdWN0SXRlbURhdGEiLCJkYXRhIiwiX2RhdGEkc2t1IiwiX2RhdGEkYWpheEFkZFRvQ2FydFVyIiwiX2RhdGEkYWRkVG9DYXJ0Rm9ybUFjIiwiaW1hZ2VVcmwiLCJpbWFnZUFsdCIsImxhYmVscyIsInByb2R1Y3RJdGVtTmFtZSIsIm5hbWUiLCJyYXRpbmdWYWx1ZSIsImRlZmF1bHRQcmljZSIsIm9yaWdpbmFsUHJpY2UiLCJkZXRhaWxQYWdlVXJsIiwiYWRkVG9DYXJ0VXJsIiwiYWpheEFkZFRvQ2FydFVybCIsImFkZFRvQ2FydEZvcm1BY3Rpb24iLCJnZXRTa3VGcm9tVXJsIiwidXJsIiwibGFzdFBhcnRPZlVybCIsIlJlZ0V4cCIsIm1hdGNoIiwic3JjIiwiYWx0IiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsImlubmVyVGV4dCIsIk51bWJlciIsInJhdGluZyIsImNvbnRlbnQiLCJocmVmIiwiZGF0YXNldCIsImRpc2FibGVkIiwiYWN0aW9uIiwiZm9ybUFjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=