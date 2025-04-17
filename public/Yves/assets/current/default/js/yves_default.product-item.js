"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["product-item"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts":
/*!*********************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_UPDATE_REVIEW_COUNT: () => (/* binding */ EVENT_UPDATE_REVIEW_COUNT),
/* harmony export */   "default": () => (/* binding */ ProductItem)
/* harmony export */ });
/* harmony import */ var ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/product-item/product-item */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");

var EVENT_UPDATE_REVIEW_COUNT = 'updateReviewCount';
class ProductItem extends ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productReviewCount = void 0;
  }
  init() {
    this.productReviewCount = this.getElementsByClassName(this.jsName + "__review-count")[0];
    super.init();
  }
  updateProductItemData(data) {
    super.updateProductItemData(data);
    this.reviewCount = data.reviewCount;
  }
  set reviewCount(reviewCount) {
    this.dispatchCustomEvent(EVENT_UPDATE_REVIEW_COUNT, {
      reviewCount
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQVc7SUFDOUIsSUFBSSxJQUFJLENBQUNwQixvQkFBb0IsRUFBRTtNQUMzQixPQUFPLElBQUksQ0FBQ0Esb0JBQW9CLENBQUNzQyxNQUFNO0lBQzNDO0lBRUEsSUFBSSxJQUFJLENBQUNyQyxzQkFBc0IsRUFBRTtNQUM3QixPQUFPLElBQUksQ0FBQ0Esc0JBQXNCLENBQUNtQyxPQUFPLENBQUNHLFVBQVU7SUFDekQ7RUFDSjs7RUFFQTtBQUNKO0FBQ0E7QUFDQTtFQUNJLElBQUluQixtQkFBbUJBLENBQUNBLG1CQUF3QixFQUFFO0lBQzlDLElBQUksSUFBSSxDQUFDcEIsb0JBQW9CLEVBQUU7TUFDM0IsSUFBSSxDQUFDQSxvQkFBb0IsQ0FBQ3NDLE1BQU0sR0FBR2xCLG1CQUFtQjtJQUMxRDtJQUVBLElBQUksSUFBSSxDQUFDbkIsc0JBQXNCLEVBQUU7TUFDN0IsSUFBSSxDQUFDQSxzQkFBc0IsQ0FBQ21DLE9BQU8sQ0FBQ0csVUFBVSxHQUFHbkIsbUJBQW1CO0lBQ3hFO0lBRUEsSUFBSSxDQUFDcEMsbUJBQW1CLENBQUNNLG9DQUFvQyxFQUFFO01BQzNEeUIsR0FBRyxFQUFFLElBQUksQ0FBQ00sYUFBYSxDQUFDRCxtQkFBbUI7SUFDL0MsQ0FBQyxDQUFDO0VBQ047QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9kdWN0SXRlbUNvcmUsIHtcbiAgICBQcm9kdWN0SXRlbURhdGEgYXMgUHJvZHVjdEl0ZW1EYXRhQ29yZSxcbn0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX1JFVklFV19DT1VOVCA9ICd1cGRhdGVSZXZpZXdDb3VudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEl0ZW1EYXRhIGV4dGVuZHMgUHJvZHVjdEl0ZW1EYXRhQ29yZSB7XG4gICAgcmV2aWV3Q291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdEl0ZW0gZXh0ZW5kcyBQcm9kdWN0SXRlbUNvcmUge1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UmV2aWV3Q291bnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdFJldmlld0NvdW50ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3Jldmlldy1jb3VudGApWzBdO1xuXG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVQcm9kdWN0SXRlbURhdGEoZGF0YTogUHJvZHVjdEl0ZW1EYXRhKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RJdGVtRGF0YShkYXRhKTtcbiAgICAgICAgdGhpcy5yZXZpZXdDb3VudCA9IGRhdGEucmV2aWV3Q291bnQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldCByZXZpZXdDb3VudChyZXZpZXdDb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfUkVWSUVXX0NPVU5ULCB7IHJldmlld0NvdW50IH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbi8qKlxuICogQGV2ZW50IHVwZGF0ZVJhdGluZyBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgcmF0aW5nIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlTGFiZWxzIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCBsYWJlbHMgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBZGRUb0NhcnRVcmwgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0ICdhZGQgdG8gY2FydCcgVVJMIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWpheEFkZFRvQ2FydFVybCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTCBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFkZFRvQ2FydEZvcm1BY3Rpb24gQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0ICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9SQVRJTkcgPSAndXBkYXRlUmF0aW5nJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfTEFCRUxTID0gJ3VwZGF0ZUxhYmVscyc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCA9ICd1cGRhdGVBZGRUb0NhcnRVcmwnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BSkFYX0FERF9UT19DQVJUX1VSTCA9ICd1cGRhdGVBamF4QWRkVG9DYXJ0VXJsJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04gPSAndXBkYXRlQWRkVG9DYXJ0Rm9ybUFjdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEl0ZW1MYWJlbHNEYXRhIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJdGVtRGF0YSB7XG4gICAgaW1hZ2VVcmw6IHN0cmluZztcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xuICAgIGxhYmVsczogUHJvZHVjdEl0ZW1MYWJlbHNEYXRhW107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJhdGluZ1ZhbHVlOiBudW1iZXI7XG4gICAgZGVmYXVsdFByaWNlOiBzdHJpbmc7XG4gICAgc2t1Pzogc3RyaW5nO1xuICAgIG9yaWdpbmFsUHJpY2U6IHN0cmluZztcbiAgICBkZXRhaWxQYWdlVXJsOiBzdHJpbmc7XG4gICAgYWRkVG9DYXJ0VXJsOiBzdHJpbmc7XG4gICAgYWpheEFkZFRvQ2FydFVybD86IHN0cmluZztcbiAgICBhZGRUb0NhcnRGb3JtQWN0aW9uPzogc3RyaW5nO1xufVxuXG50eXBlIFVybCA9IHN0cmluZyB8IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TmFtZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RSYXRpbmc6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3REZWZhdWx0UHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0U2t1OiBIVE1MTWV0YUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RPcmlnaW5hbFByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdExpbmtEZXRhaWxQYWdlOiBIVE1MQW5jaG9yRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlua0FkZFRvQ2FydDogSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEZvcm1BZGRUb0NhcnQ6IEhUTUxGb3JtRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEJ1dHRvbkFkZFRvQ2FydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbWFnZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3ROYW1lID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX25hbWVgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0UmF0aW5nID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcmF0aW5nYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19kZWZhdWx0LXByaWNlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdFNrdSA9IDxIVE1MTWV0YUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2t1YClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fb3JpZ2luYWwtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UgPSA8SFRNTEFuY2hvckVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpbmstZGV0YWlsLXBhZ2VgKSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCA9IDxIVE1MQW5jaG9yRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19saW5rLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCA9IDxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19hamF4LWJ1dHRvbi1hZGQtdG8tY2FydGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQgPSA8SFRNTEZvcm1FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2Zvcm0tYWRkLXRvLWNhcnRgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0ID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2J1dHRvbi1hZGQtdG8tY2FydGApWzBdXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRhIEEgZGF0YSBvYmplY3QgZm9yIHNldHRpbmcgdGhlIHByb2R1Y3QgY2FyZCBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0SXRlbURhdGEoZGF0YTogUHJvZHVjdEl0ZW1EYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBkYXRhLmltYWdlVXJsO1xuICAgICAgICB0aGlzLmltYWdlQWx0ID0gZGF0YS5pbWFnZUFsdDtcbiAgICAgICAgdGhpcy5sYWJlbHMgPSBkYXRhLmxhYmVscztcbiAgICAgICAgdGhpcy5wcm9kdWN0SXRlbU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMucmF0aW5nVmFsdWUgPSBkYXRhLnJhdGluZ1ZhbHVlO1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmljZSA9IGRhdGEuZGVmYXVsdFByaWNlO1xuICAgICAgICB0aGlzLnNrdSA9IGRhdGEuc2t1ID8/IG51bGw7XG4gICAgICAgIHRoaXMub3JpZ2luYWxQcmljZSA9IGRhdGEub3JpZ2luYWxQcmljZTtcbiAgICAgICAgdGhpcy5kZXRhaWxQYWdlVXJsID0gZGF0YS5kZXRhaWxQYWdlVXJsO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydFVybCA9IGRhdGEuYWRkVG9DYXJ0VXJsO1xuICAgICAgICB0aGlzLmFqYXhBZGRUb0NhcnRVcmwgPSBkYXRhLmFqYXhBZGRUb0NhcnRVcmwgPz8gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRGb3JtQWN0aW9uID0gZGF0YS5hZGRUb0NhcnRGb3JtQWN0aW9uID8/IG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFNrdUZyb21VcmwodXJsOiBVcmwpOiBVcmwge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0UGFydE9mVXJsID0gbmV3IFJlZ0V4cChgKFteXFxcXC9dKSskYCwgJ2cnKTtcbiAgICAgICAgY29uc3Qgc2t1ID0gdXJsLm1hdGNoKGxhc3RQYXJ0T2ZVcmwpO1xuXG4gICAgICAgIHJldHVybiBza3VbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGltYWdlIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0SW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGltYWdlIFVSTC5cbiAgICAgKiBAcGFyYW0gaW1hZ2VVcmwgQSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIHNldCBpbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RJbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2Uuc3JjID0gaW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgYWx0LlxuICAgICAqIEBwYXJhbSBpbWFnZUFsdCBBIHByb2R1Y3QgY2FyZCBpbWFnZSBhbHQuXG4gICAgICovXG4gICAgc2V0IGltYWdlQWx0KGltYWdlQWx0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZS5hbHQgPSBpbWFnZUFsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBsYWJlbHMuXG4gICAgICogQHBhcmFtIGxhYmVscyBBbiBhcnJheSBvZiBwcm9kdWN0IGNhcmQgbGFiZWxzLlxuICAgICAqL1xuICAgIHNldCBsYWJlbHMobGFiZWxzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0xBQkVMUywgeyBsYWJlbHMgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIG5hbWUuXG4gICAgICovXG4gICAgZ2V0IHByb2R1Y3RJdGVtTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdE5hbWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIG5hbWUuXG4gICAgICogQHBhcmFtIG5hbWUgQSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKi9cbiAgICBzZXQgcHJvZHVjdEl0ZW1OYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TmFtZS5pbm5lclRleHQgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKi9cbiAgICBnZXQgcmF0aW5nVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFJhdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLnByb2R1Y3RSYXRpbmcudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKiBAcGFyYW0gcmF0aW5nIEEgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKi9cbiAgICBzZXQgcmF0aW5nVmFsdWUocmF0aW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9SQVRJTkcsIHsgcmF0aW5nIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0UHJpY2UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKiBAcGFyYW0gZGVmYXVsdFByaWNlIEEgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICovXG4gICAgc2V0IGRlZmF1bHRQcmljZShkZWZhdWx0UHJpY2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UuaW5uZXJUZXh0ID0gZGVmYXVsdFByaWNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIHNrdS5cbiAgICAgKi9cbiAgICBnZXQgc2t1KCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RTa3UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RTa3UuY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBza3UuXG4gICAgICogQHBhcmFtIHByb2R1Y3RTa3UgQSBwcm9kdWN0IGNhcmQgc2t1LlxuICAgICAqL1xuICAgIHNldCBza3UocHJvZHVjdFNrdTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RTa3UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFNrdS5jb250ZW50ID0gcHJvZHVjdFNrdTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKi9cbiAgICBnZXQgb3JpZ2luYWxQcmljZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqIEBwYXJhbSBvcmlnaW5hbFByaWNlIEEgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqL1xuICAgIHNldCBvcmlnaW5hbFByaWNlKG9yaWdpbmFsUHJpY2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZS5pbm5lclRleHQgPSBvcmlnaW5hbFByaWNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgZGV0YWlsUGFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZVswXS5ocmVmO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKiBAcGFyYW0gZGV0YWlsUGFnZVVybCBBIHByb2R1Y3QgY2FyZCBkZXRhaWwgcGFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IGRldGFpbFBhZ2VVcmwoZGV0YWlsUGFnZVVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UuZm9yRWFjaCgoZWxlbWVudDogSFRNTEFuY2hvckVsZW1lbnQpID0+IChlbGVtZW50LmhyZWYgPSBkZXRhaWxQYWdlVXJsKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgZ2V0IGFkZFRvQ2FydFVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQuaHJlZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKiBAcGFyYW0gYWRkVG9DYXJ0VXJsIEEgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIHNldCBhZGRUb0NhcnRVcmwoYWRkVG9DYXJ0VXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQuaHJlZiA9IGFkZFRvQ2FydFVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMLCB7IHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFkZFRvQ2FydFVybCkgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgZ2V0IGFqYXhBZGRUb0NhcnRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQudXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICogQHBhcmFtIGFqYXhBZGRUb0NhcnRVcmwgQSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgYWpheEFkZFRvQ2FydFVybChhamF4QWRkVG9DYXJ0VXJsOiBVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGlzYWJsZWQgPSAhYWpheEFkZFRvQ2FydFVybDtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGF0YXNldC51cmwgPSBhamF4QWRkVG9DYXJ0VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BSkFYX0FERF9UT19DQVJUX1VSTCwgeyBza3U6IHRoaXMuZ2V0U2t1RnJvbVVybChhamF4QWRkVG9DYXJ0VXJsKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgYWRkVG9DYXJ0Rm9ybUFjdGlvbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQuYWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LmZvcm1BY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0gYWRkVG9DYXJ0Rm9ybUFjdGlvbiBBIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIHNldCBhZGRUb0NhcnRGb3JtQWN0aW9uKGFkZFRvQ2FydEZvcm1BY3Rpb246IFVybCkge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydC5hY3Rpb24gPSBhZGRUb0NhcnRGb3JtQWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQuZm9ybUFjdGlvbiA9IGFkZFRvQ2FydEZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OLCB7XG4gICAgICAgICAgICBza3U6IHRoaXMuZ2V0U2t1RnJvbVVybChhZGRUb0NhcnRGb3JtQWN0aW9uKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlByb2R1Y3RJdGVtQ29yZSIsIkVWRU5UX1VQREFURV9SRVZJRVdfQ09VTlQiLCJQcm9kdWN0SXRlbSIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwicHJvZHVjdFJldmlld0NvdW50IiwiaW5pdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJ1cGRhdGVQcm9kdWN0SXRlbURhdGEiLCJkYXRhIiwicmV2aWV3Q291bnQiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwiQ29tcG9uZW50IiwiRVZFTlRfVVBEQVRFX1JBVElORyIsIkVWRU5UX1VQREFURV9MQUJFTFMiLCJFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OIiwicHJvZHVjdEltYWdlIiwicHJvZHVjdE5hbWUiLCJwcm9kdWN0UmF0aW5nIiwicHJvZHVjdERlZmF1bHRQcmljZSIsInByb2R1Y3RTa3UiLCJwcm9kdWN0T3JpZ2luYWxQcmljZSIsInByb2R1Y3RMaW5rRGV0YWlsUGFnZSIsInByb2R1Y3RMaW5rQWRkVG9DYXJ0IiwicHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQiLCJwcm9kdWN0Rm9ybUFkZFRvQ2FydCIsInByb2R1Y3RCdXR0b25BZGRUb0NhcnQiLCJyZWFkeUNhbGxiYWNrIiwiQXJyYXkiLCJmcm9tIiwiX2RhdGEkc2t1IiwiX2RhdGEkYWpheEFkZFRvQ2FydFVyIiwiX2RhdGEkYWRkVG9DYXJ0Rm9ybUFjIiwiaW1hZ2VVcmwiLCJpbWFnZUFsdCIsImxhYmVscyIsInByb2R1Y3RJdGVtTmFtZSIsIm5hbWUiLCJyYXRpbmdWYWx1ZSIsImRlZmF1bHRQcmljZSIsInNrdSIsIm9yaWdpbmFsUHJpY2UiLCJkZXRhaWxQYWdlVXJsIiwiYWRkVG9DYXJ0VXJsIiwiYWpheEFkZFRvQ2FydFVybCIsImFkZFRvQ2FydEZvcm1BY3Rpb24iLCJnZXRTa3VGcm9tVXJsIiwidXJsIiwibGFzdFBhcnRPZlVybCIsIlJlZ0V4cCIsIm1hdGNoIiwic3JjIiwiYWx0IiwiaW5uZXJUZXh0IiwiTnVtYmVyIiwidmFsdWUiLCJyYXRpbmciLCJjb250ZW50IiwiaHJlZiIsImZvckVhY2giLCJlbGVtZW50IiwiZGF0YXNldCIsImRpc2FibGVkIiwiYWN0aW9uIiwiZm9ybUFjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=