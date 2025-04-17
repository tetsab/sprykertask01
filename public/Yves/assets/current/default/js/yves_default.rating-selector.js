"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["rating-selector"],{

/***/ "./src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RatingSelector)
/* harmony export */ });
/* harmony import */ var ProductReviewWidget_components_molecules_rating_selector_rating_selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ProductReviewWidget/components/molecules/rating-selector/rating-selector */ "./vendor/spryker-shop/product-review-widget/src/SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.ts");
/* harmony import */ var ShopUiProject_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUiProject/components/molecules/product-item/product-item */ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");


class RatingSelector extends ProductReviewWidget_components_molecules_rating_selector_rating_selector__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.reviewCount = void 0;
  }
  connectedCallback() {
    this.init();
  }
  init() {
    this.reviewCount = this.getElementsByClassName(this.jsName + "__review-count")[0];
    super.init();
  }
  mapUpdateRatingEvents() {
    super.mapUpdateRatingEvents();
    this.mapProductItemUpdateReviewCountCustomEvent();
  }
  mapProductItemUpdateReviewCountCustomEvent() {
    if (!this.productItem) {
      return;
    }
    this.productItem.addEventListener(ShopUiProject_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__.EVENT_UPDATE_REVIEW_COUNT, event => {
      this.updateReviewCount(event.detail.reviewCount);
    });
  }
  updateReviewCount(value) {
    if (!this.reviewCount) {
      return;
    }
    this.reviewCount.innerText = "" + value;
  }
}

/***/ }),

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

/***/ "./vendor/spryker-shop/product-review-widget/src/SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.ts":
/*!******************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-review-widget/src/SprykerShop/Yves/ProductReviewWidget/Theme/default/components/molecules/rating-selector/rating-selector.ts ***!
  \******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RatingSelector)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/components/molecules/product-item/product-item */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");


class RatingSelector extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.input = void 0;
    this.steps = void 0;
    this.productItem = void 0;
  }
  /**
   * The input element.
   */
  /**
   * Collection of the elements which toggle the steps of the product review.
   */
  readyCallback() {
    this.input = this.getElementsByClassName(this.jsName + "__input")[0];
    this.steps = Array.from(this.getElementsByClassName(this.jsName + "__step"));
    if (this.productItemClassName) {
      this.productItem = this.closest("." + this.productItemClassName);
    }
    if (!this.readOnly) {
      this.checkInput(this.value);
      this.mapEvents();
    }
    this.mapUpdateRatingEvents();
  }
  mapEvents() {
    this.mapStepClickEvent();
  }
  mapStepClickEvent() {
    this.steps.forEach(step => {
      step.addEventListener('click', event => this.onStepClick(event));
    });
  }
  mapUpdateRatingEvents() {
    if (!this.productItem) {
      return;
    }
    this.mapProductItemUpdateRatingCustomEvent();
  }
  mapProductItemUpdateRatingCustomEvent() {
    this.productItem.addEventListener(ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__.EVENT_UPDATE_RATING, event => {
      this.updateRating(event.detail.rating);
    });
  }
  onStepClick(event) {
    var step = event.currentTarget;
    var newValue = parseFloat(step.getAttribute('data-step-value'));
    this.checkInput(newValue);
    this.updateRating(newValue);
  }

  /**
   * Toggles the disabled attribute of the input element.
   * @param value A number for checking if the attribute is to be set or removed from the input element.
   */
  checkInput(value) {
    if (!this.disableIfEmptyValue) {
      return;
    }
    if (!value) {
      this.input.setAttribute('disabled', 'disabled');
      return;
    }
    this.input.removeAttribute('disabled');
  }

  /**
   * Sets the value attribute and toggles the special class name.
   * @param value A number for setting the attribute.
   */
  updateRating(value) {
    this.input.setAttribute('value', "" + value);
    this.steps.forEach(step => {
      var stepValue = parseFloat(step.getAttribute('data-step-value'));
      if (value >= stepValue) {
        step.classList.add(this.name + "__step--active");
        return;
      }
      step.classList.remove(this.name + "__step--active");
    });
  }

  /**
   * Gets an input value.
   */
  get value() {
    return parseFloat(this.input.value);
  }

  /**
   * Gets if the element is read-only.
   */
  get readOnly() {
    return this.hasAttribute('readonly');
  }

  /**
   * Gets if the element has an empty value.
   */
  get disableIfEmptyValue() {
    return this.hasAttribute('disable-if-empty-value');
  }
  get productItemClassName() {
    return this.getAttribute('product-item-class-name');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Esb0JBQW9CLENBQUM4QixNQUFNLEdBQUdkLG1CQUFtQjtJQUMxRDtJQUVBLElBQUksSUFBSSxDQUFDZixzQkFBc0IsRUFBRTtNQUM3QixJQUFJLENBQUNBLHNCQUFzQixDQUFDMkIsT0FBTyxDQUFDRyxVQUFVLEdBQUdmLG1CQUFtQjtJQUN4RTtJQUVBLElBQUksQ0FBQzlELG1CQUFtQixDQUFDb0Msb0NBQW9DLEVBQUU7TUFDM0RxQixHQUFHLEVBQUUsSUFBSSxDQUFDTSxhQUFhLENBQUNELG1CQUFtQjtJQUMvQyxDQUFDLENBQUM7RUFDTjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vc3JjL1B5ei9ZdmVzL1Byb2R1Y3RSZXZpZXdXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9yYXRpbmctc2VsZWN0b3IvcmF0aW5nLXNlbGVjdG9yLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3AvcHJvZHVjdC1yZXZpZXctd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Byb2R1Y3RSZXZpZXdXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9yYXRpbmctc2VsZWN0b3IvcmF0aW5nLXNlbGVjdG9yLnRzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSYXRpbmdTZWxlY3RvckNvcmUgZnJvbSAnUHJvZHVjdFJldmlld1dpZGdldC9jb21wb25lbnRzL21vbGVjdWxlcy9yYXRpbmctc2VsZWN0b3IvcmF0aW5nLXNlbGVjdG9yJztcbmltcG9ydCB7IEVWRU5UX1VQREFURV9SRVZJRVdfQ09VTlQgfSBmcm9tICdTaG9wVWlQcm9qZWN0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRpbmdTZWxlY3RvciBleHRlbmRzIFJhdGluZ1NlbGVjdG9yQ29yZSB7XG4gICAgcHJvdGVjdGVkIHJldmlld0NvdW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZXZpZXdDb3VudCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19yZXZpZXctY291bnRgKVswXTtcblxuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFVwZGF0ZVJhdGluZ0V2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIubWFwVXBkYXRlUmF0aW5nRXZlbnRzKCk7XG4gICAgICAgIHRoaXMubWFwUHJvZHVjdEl0ZW1VcGRhdGVSZXZpZXdDb3VudEN1c3RvbUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFByb2R1Y3RJdGVtVXBkYXRlUmV2aWV3Q291bnRDdXN0b21FdmVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb2R1Y3RJdGVtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb2R1Y3RJdGVtLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfVVBEQVRFX1JFVklFV19DT1VOVCwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSZXZpZXdDb3VudCgoPEN1c3RvbUV2ZW50PmV2ZW50KS5kZXRhaWwucmV2aWV3Q291bnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUmV2aWV3Q291bnQodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucmV2aWV3Q291bnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmV2aWV3Q291bnQuaW5uZXJUZXh0ID0gYCR7dmFsdWV9YDtcbiAgICB9XG59XG4iLCJpbXBvcnQgUHJvZHVjdEl0ZW1Db3JlLCB7XG4gICAgUHJvZHVjdEl0ZW1EYXRhIGFzIFByb2R1Y3RJdGVtRGF0YUNvcmUsXG59IGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9wcm9kdWN0LWl0ZW0vcHJvZHVjdC1pdGVtJztcblxuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9SRVZJRVdfQ09VTlQgPSAndXBkYXRlUmV2aWV3Q291bnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJdGVtRGF0YSBleHRlbmRzIFByb2R1Y3RJdGVtRGF0YUNvcmUge1xuICAgIHJldmlld0NvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RJdGVtIGV4dGVuZHMgUHJvZHVjdEl0ZW1Db3JlIHtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFJldmlld0NvdW50OiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb2R1Y3RSZXZpZXdDb3VudCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19yZXZpZXctY291bnRgKVswXTtcblxuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUHJvZHVjdEl0ZW1EYXRhKGRhdGE6IFByb2R1Y3RJdGVtRGF0YSk6IHZvaWQge1xuICAgICAgICBzdXBlci51cGRhdGVQcm9kdWN0SXRlbURhdGEoZGF0YSk7XG4gICAgICAgIHRoaXMucmV2aWV3Q291bnQgPSBkYXRhLnJldmlld0NvdW50O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXQgcmV2aWV3Q291bnQocmV2aWV3Q291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX1JFVklFV19DT1VOVCwgeyByZXZpZXdDb3VudCB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBQcm9kdWN0SXRlbSwgeyBFVkVOVF9VUERBVEVfUkFUSU5HIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3Byb2R1Y3QtaXRlbS9wcm9kdWN0LWl0ZW0nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYXRpbmdTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0aW9uIG9mIHRoZSBlbGVtZW50cyB3aGljaCB0b2dnbGUgdGhlIHN0ZXBzIG9mIHRoZSBwcm9kdWN0IHJldmlldy5cbiAgICAgKi9cbiAgICBzdGVwczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEl0ZW06IFByb2R1Y3RJdGVtO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbnB1dGApWzBdO1xuICAgICAgICB0aGlzLnN0ZXBzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdGVwYCkpO1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SXRlbUNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0SXRlbSA9IDxQcm9kdWN0SXRlbT50aGlzLmNsb3Nlc3QoYC4ke3RoaXMucHJvZHVjdEl0ZW1DbGFzc05hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJbnB1dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcFVwZGF0ZVJhdGluZ0V2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwU3RlcENsaWNrRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwU3RlcENsaWNrRXZlbnQoKSB7XG4gICAgICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgoc3RlcDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHN0ZXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU3RlcENsaWNrKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBVcGRhdGVSYXRpbmdFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wcm9kdWN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBQcm9kdWN0SXRlbVVwZGF0ZVJhdGluZ0N1c3RvbUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFByb2R1Y3RJdGVtVXBkYXRlUmF0aW5nQ3VzdG9tRXZlbnQoKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9VUERBVEVfUkFUSU5HLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJhdGluZygoPEN1c3RvbUV2ZW50PmV2ZW50KS5kZXRhaWwucmF0aW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU3RlcENsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzdGVwID0gPEhUTUxFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gcGFyc2VGbG9hdChzdGVwLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGVwLXZhbHVlJykpO1xuXG4gICAgICAgIHRoaXMuY2hlY2tJbnB1dChuZXdWYWx1ZSk7XG4gICAgICAgIHRoaXMudXBkYXRlUmF0aW5nKG5ld1ZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHZhbHVlIEEgbnVtYmVyIGZvciBjaGVja2luZyBpZiB0aGUgYXR0cmlidXRlIGlzIHRvIGJlIHNldCBvciByZW1vdmVkIGZyb20gdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgY2hlY2tJbnB1dCh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlSWZFbXB0eVZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgdmFsdWUgYXR0cmlidXRlIGFuZCB0b2dnbGVzIHRoZSBzcGVjaWFsIGNsYXNzIG5hbWUuXG4gICAgICogQHBhcmFtIHZhbHVlIEEgbnVtYmVyIGZvciBzZXR0aW5nIHRoZSBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgdXBkYXRlUmF0aW5nKHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgYCR7dmFsdWV9YCk7XG5cbiAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKChzdGVwOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3RlcFZhbHVlID0gcGFyc2VGbG9hdChzdGVwLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGVwLXZhbHVlJykpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPj0gc3RlcFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc3RlcC5jbGFzc0xpc3QuYWRkKGAke3RoaXMubmFtZX1fX3N0ZXAtLWFjdGl2ZWApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdGVwLmNsYXNzTGlzdC5yZW1vdmUoYCR7dGhpcy5uYW1lfV9fc3RlcC0tYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYW4gaW5wdXQgdmFsdWUuXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuaW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGVsZW1lbnQgaXMgcmVhZC1vbmx5LlxuICAgICAqL1xuICAgIGdldCByZWFkT25seSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdyZWFkb25seScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGVsZW1lbnQgaGFzIGFuIGVtcHR5IHZhbHVlLlxuICAgICAqL1xuICAgIGdldCBkaXNhYmxlSWZFbXB0eVZhbHVlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGUtaWYtZW1wdHktdmFsdWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb2R1Y3RJdGVtQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHJvZHVjdC1pdGVtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG4vKipcbiAqIEBldmVudCB1cGRhdGVSYXRpbmcgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0IHJhdGluZyBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUxhYmVscyBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgbGFiZWxzIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWRkVG9DYXJ0VXJsIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCAnYWRkIHRvIGNhcnQnIFVSTCBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFqYXhBZGRUb0NhcnRVcmwgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0IEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBZGRUb0NhcnRGb3JtQWN0aW9uIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfUkFUSU5HID0gJ3VwZGF0ZVJhdGluZyc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0xBQkVMUyA9ICd1cGRhdGVMYWJlbHMnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwgPSAndXBkYXRlQWRkVG9DYXJ0VXJsJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUpBWF9BRERfVE9fQ0FSVF9VUkwgPSAndXBkYXRlQWpheEFkZFRvQ2FydFVybCc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OID0gJ3VwZGF0ZUFkZFRvQ2FydEZvcm1BY3Rpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJdGVtTGFiZWxzRGF0YSB7XG4gICAgdGV4dDogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0SXRlbURhdGEge1xuICAgIGltYWdlVXJsOiBzdHJpbmc7XG4gICAgaW1hZ2VBbHQ6IHN0cmluZztcbiAgICBsYWJlbHM6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YVtdO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICByYXRpbmdWYWx1ZTogbnVtYmVyO1xuICAgIGRlZmF1bHRQcmljZTogc3RyaW5nO1xuICAgIHNrdT86IHN0cmluZztcbiAgICBvcmlnaW5hbFByaWNlOiBzdHJpbmc7XG4gICAgZGV0YWlsUGFnZVVybDogc3RyaW5nO1xuICAgIGFkZFRvQ2FydFVybDogc3RyaW5nO1xuICAgIGFqYXhBZGRUb0NhcnRVcmw/OiBzdHJpbmc7XG4gICAgYWRkVG9DYXJ0Rm9ybUFjdGlvbj86IHN0cmluZztcbn1cblxudHlwZSBVcmwgPSBzdHJpbmcgfCBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0SXRlbSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RJbWFnZTogSFRNTEltYWdlRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdE5hbWU6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0UmF0aW5nOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0RGVmYXVsdFByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdFNrdTogSFRNTE1ldGFFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0T3JpZ2luYWxQcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RMaW5rRGV0YWlsUGFnZTogSFRNTEFuY2hvckVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdExpbmtBZGRUb0NhcnQ6IEhUTUxBbmNob3JFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RGb3JtQWRkVG9DYXJ0OiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RCdXR0b25BZGRUb0NhcnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdEltYWdlID0gPEhUTUxJbWFnZUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faW1hZ2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TmFtZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19uYW1lYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdFJhdGluZyA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3JhdGluZ2ApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZGVmYXVsdC1wcmljZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RTa3UgPSA8SFRNTE1ldGFFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NrdWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX29yaWdpbmFsLXByaWNlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlID0gPEhUTUxBbmNob3JFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19saW5rLWRldGFpbC1wYWdlYCkpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQgPSA8SFRNTEFuY2hvckVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGluay1hZGQtdG8tY2FydGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+KFxuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fYWpheC1idXR0b24tYWRkLXRvLWNhcnRgKVswXVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0ID0gPEhUTUxGb3JtRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19mb3JtLWFkZC10by1jYXJ0YClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCA9IDxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19idXR0b24tYWRkLXRvLWNhcnRgKVswXVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBpbmZvcm1hdGlvbi5cbiAgICAgKiBAcGFyYW0gZGF0YSBBIGRhdGEgb2JqZWN0IGZvciBzZXR0aW5nIHRoZSBwcm9kdWN0IGNhcmQgaW5mb3JtYXRpb24uXG4gICAgICovXG4gICAgdXBkYXRlUHJvZHVjdEl0ZW1EYXRhKGRhdGE6IFByb2R1Y3RJdGVtRGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLmltYWdlVXJsID0gZGF0YS5pbWFnZVVybDtcbiAgICAgICAgdGhpcy5pbWFnZUFsdCA9IGRhdGEuaW1hZ2VBbHQ7XG4gICAgICAgIHRoaXMubGFiZWxzID0gZGF0YS5sYWJlbHM7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW1OYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICB0aGlzLnJhdGluZ1ZhbHVlID0gZGF0YS5yYXRpbmdWYWx1ZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0UHJpY2UgPSBkYXRhLmRlZmF1bHRQcmljZTtcbiAgICAgICAgdGhpcy5za3UgPSBkYXRhLnNrdSA/PyBudWxsO1xuICAgICAgICB0aGlzLm9yaWdpbmFsUHJpY2UgPSBkYXRhLm9yaWdpbmFsUHJpY2U7XG4gICAgICAgIHRoaXMuZGV0YWlsUGFnZVVybCA9IGRhdGEuZGV0YWlsUGFnZVVybDtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRVcmwgPSBkYXRhLmFkZFRvQ2FydFVybDtcbiAgICAgICAgdGhpcy5hamF4QWRkVG9DYXJ0VXJsID0gZGF0YS5hamF4QWRkVG9DYXJ0VXJsID8/IG51bGw7XG4gICAgICAgIHRoaXMuYWRkVG9DYXJ0Rm9ybUFjdGlvbiA9IGRhdGEuYWRkVG9DYXJ0Rm9ybUFjdGlvbiA/PyBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRTa3VGcm9tVXJsKHVybDogVXJsKTogVXJsIHtcbiAgICAgICAgaWYgKCF1cmwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGFzdFBhcnRPZlVybCA9IG5ldyBSZWdFeHAoYChbXlxcXFwvXSkrJGAsICdnJyk7XG4gICAgICAgIGNvbnN0IHNrdSA9IHVybC5tYXRjaChsYXN0UGFydE9mVXJsKTtcblxuICAgICAgICByZXR1cm4gc2t1WzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgZ2V0IGltYWdlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RJbWFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEltYWdlLnNyYztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBpbWFnZSBVUkwuXG4gICAgICogQHBhcmFtIGltYWdlVXJsIEEgcHJvZHVjdCBjYXJkIGltYWdlIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgaW1hZ2VVcmwoaW1hZ2VVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SW1hZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEltYWdlLnNyYyA9IGltYWdlVXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGltYWdlIGFsdC5cbiAgICAgKiBAcGFyYW0gaW1hZ2VBbHQgQSBwcm9kdWN0IGNhcmQgaW1hZ2UgYWx0LlxuICAgICAqL1xuICAgIHNldCBpbWFnZUFsdChpbWFnZUFsdDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RJbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2UuYWx0ID0gaW1hZ2VBbHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgbGFiZWxzLlxuICAgICAqIEBwYXJhbSBsYWJlbHMgQW4gYXJyYXkgb2YgcHJvZHVjdCBjYXJkIGxhYmVscy5cbiAgICAgKi9cbiAgICBzZXQgbGFiZWxzKGxhYmVsczogUHJvZHVjdEl0ZW1MYWJlbHNEYXRhW10pIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9MQUJFTFMsIHsgbGFiZWxzIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBuYW1lLlxuICAgICAqL1xuICAgIGdldCBwcm9kdWN0SXRlbU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3ROYW1lLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBuYW1lLlxuICAgICAqIEBwYXJhbSBuYW1lIEEgcHJvZHVjdCBjYXJkIG5hbWUuXG4gICAgICovXG4gICAgc2V0IHByb2R1Y3RJdGVtTmFtZShuYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE5hbWUuaW5uZXJUZXh0ID0gbmFtZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCByYXRpbmcuXG4gICAgICovXG4gICAgZ2V0IHJhdGluZ1ZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RSYXRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5wcm9kdWN0UmF0aW5nLnZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCByYXRpbmcuXG4gICAgICogQHBhcmFtIHJhdGluZyBBIHByb2R1Y3QgY2FyZCByYXRpbmcuXG4gICAgICovXG4gICAgc2V0IHJhdGluZ1ZhbHVlKHJhdGluZzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfUkFUSU5HLCB7IHJhdGluZyB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFByaWNlKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICogQHBhcmFtIGRlZmF1bHRQcmljZSBBIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqL1xuICAgIHNldCBkZWZhdWx0UHJpY2UoZGVmYXVsdFByaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlLmlubmVyVGV4dCA9IGRlZmF1bHRQcmljZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBza3UuXG4gICAgICovXG4gICAgZ2V0IHNrdSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0U2t1KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0U2t1LmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgc2t1LlxuICAgICAqIEBwYXJhbSBwcm9kdWN0U2t1IEEgcHJvZHVjdCBjYXJkIHNrdS5cbiAgICAgKi9cbiAgICBzZXQgc2t1KHByb2R1Y3RTa3U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0U2t1KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RTa3UuY29udGVudCA9IHByb2R1Y3RTa3U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgb3JpZ2luYWwgcHJpY2UuXG4gICAgICovXG4gICAgZ2V0IG9yaWdpbmFsUHJpY2UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RPcmlnaW5hbFByaWNlLmlubmVyVGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKiBAcGFyYW0gb3JpZ2luYWxQcmljZSBBIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKi9cbiAgICBzZXQgb3JpZ2luYWxQcmljZShvcmlnaW5hbFByaWNlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UuaW5uZXJUZXh0ID0gb3JpZ2luYWxQcmljZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBkZXRhaWwgcGFnZSBVUkwuXG4gICAgICovXG4gICAgZ2V0IGRldGFpbFBhZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2VbMF0uaHJlZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBkZXRhaWwgcGFnZSBVUkwuXG4gICAgICogQHBhcmFtIGRldGFpbFBhZ2VVcmwgQSBwcm9kdWN0IGNhcmQgZGV0YWlsIHBhZ2UgVVJMLlxuICAgICAqL1xuICAgIHNldCBkZXRhaWxQYWdlVXJsKGRldGFpbFBhZ2VVcmw6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpbmtEZXRhaWxQYWdlLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxBbmNob3JFbGVtZW50KSA9PiAoZWxlbWVudC5ocmVmID0gZGV0YWlsUGFnZVVybCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIGdldCBhZGRUb0NhcnRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0LmhyZWY7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICogQHBhcmFtIGFkZFRvQ2FydFVybCBBIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgYWRkVG9DYXJ0VXJsKGFkZFRvQ2FydFVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMaW5rQWRkVG9DYXJ0LmhyZWYgPSBhZGRUb0NhcnRVcmw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCwgeyBza3U6IHRoaXMuZ2V0U2t1RnJvbVVybChhZGRUb0NhcnRVcmwpIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIGdldCBhamF4QWRkVG9DYXJ0VXJsKCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LnVybDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBBSkFYICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqIEBwYXJhbSBhamF4QWRkVG9DYXJ0VXJsIEEgcHJvZHVjdCBjYXJkIEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgc2V0IGFqYXhBZGRUb0NhcnRVcmwoYWpheEFkZFRvQ2FydFVybDogVXJsKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0LmRpc2FibGVkID0gIWFqYXhBZGRUb0NhcnRVcmw7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQudXJsID0gYWpheEFkZFRvQ2FydFVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUpBWF9BRERfVE9fQ0FSVF9VUkwsIHsgc2t1OiB0aGlzLmdldFNrdUZyb21VcmwoYWpheEFkZFRvQ2FydFVybCkgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGFkZFRvQ2FydEZvcm1BY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RGb3JtQWRkVG9DYXJ0LmFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQuZGF0YXNldC5mb3JtQWN0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24uXG4gICAgICogQHBhcmFtIGFkZFRvQ2FydEZvcm1BY3Rpb24gQSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbi5cbiAgICAgKi9cbiAgICBzZXQgYWRkVG9DYXJ0Rm9ybUFjdGlvbihhZGRUb0NhcnRGb3JtQWN0aW9uOiBVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQuYWN0aW9uID0gYWRkVG9DYXJ0Rm9ybUFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LmZvcm1BY3Rpb24gPSBhZGRUb0NhcnRGb3JtQWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9GT1JNX0FDVElPTiwge1xuICAgICAgICAgICAgc2t1OiB0aGlzLmdldFNrdUZyb21VcmwoYWRkVG9DYXJ0Rm9ybUFjdGlvbiksXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJSYXRpbmdTZWxlY3RvckNvcmUiLCJFVkVOVF9VUERBVEVfUkVWSUVXX0NPVU5UIiwiUmF0aW5nU2VsZWN0b3IiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInJldmlld0NvdW50IiwiY29ubmVjdGVkQ2FsbGJhY2siLCJpbml0IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsIm1hcFVwZGF0ZVJhdGluZ0V2ZW50cyIsIm1hcFByb2R1Y3RJdGVtVXBkYXRlUmV2aWV3Q291bnRDdXN0b21FdmVudCIsInByb2R1Y3RJdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidXBkYXRlUmV2aWV3Q291bnQiLCJkZXRhaWwiLCJ2YWx1ZSIsImlubmVyVGV4dCIsIlByb2R1Y3RJdGVtQ29yZSIsIlByb2R1Y3RJdGVtIiwicHJvZHVjdFJldmlld0NvdW50IiwidXBkYXRlUHJvZHVjdEl0ZW1EYXRhIiwiZGF0YSIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJDb21wb25lbnQiLCJFVkVOVF9VUERBVEVfUkFUSU5HIiwiaW5wdXQiLCJzdGVwcyIsInJlYWR5Q2FsbGJhY2siLCJBcnJheSIsImZyb20iLCJwcm9kdWN0SXRlbUNsYXNzTmFtZSIsImNsb3Nlc3QiLCJyZWFkT25seSIsImNoZWNrSW5wdXQiLCJtYXBFdmVudHMiLCJtYXBTdGVwQ2xpY2tFdmVudCIsImZvckVhY2giLCJzdGVwIiwib25TdGVwQ2xpY2siLCJtYXBQcm9kdWN0SXRlbVVwZGF0ZVJhdGluZ0N1c3RvbUV2ZW50IiwidXBkYXRlUmF0aW5nIiwicmF0aW5nIiwiY3VycmVudFRhcmdldCIsIm5ld1ZhbHVlIiwicGFyc2VGbG9hdCIsImdldEF0dHJpYnV0ZSIsImRpc2FibGVJZkVtcHR5VmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzdGVwVmFsdWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJuYW1lIiwicmVtb3ZlIiwiaGFzQXR0cmlidXRlIiwiRVZFTlRfVVBEQVRFX0xBQkVMUyIsIkVWRU5UX1VQREFURV9BRERfVE9fQ0FSVF9VUkwiLCJFVkVOVF9VUERBVEVfQUpBWF9BRERfVE9fQ0FSVF9VUkwiLCJFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04iLCJwcm9kdWN0SW1hZ2UiLCJwcm9kdWN0TmFtZSIsInByb2R1Y3RSYXRpbmciLCJwcm9kdWN0RGVmYXVsdFByaWNlIiwicHJvZHVjdFNrdSIsInByb2R1Y3RPcmlnaW5hbFByaWNlIiwicHJvZHVjdExpbmtEZXRhaWxQYWdlIiwicHJvZHVjdExpbmtBZGRUb0NhcnQiLCJwcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCIsInByb2R1Y3RGb3JtQWRkVG9DYXJ0IiwicHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCIsIl9kYXRhJHNrdSIsIl9kYXRhJGFqYXhBZGRUb0NhcnRVciIsIl9kYXRhJGFkZFRvQ2FydEZvcm1BYyIsImltYWdlVXJsIiwiaW1hZ2VBbHQiLCJsYWJlbHMiLCJwcm9kdWN0SXRlbU5hbWUiLCJyYXRpbmdWYWx1ZSIsImRlZmF1bHRQcmljZSIsInNrdSIsIm9yaWdpbmFsUHJpY2UiLCJkZXRhaWxQYWdlVXJsIiwiYWRkVG9DYXJ0VXJsIiwiYWpheEFkZFRvQ2FydFVybCIsImFkZFRvQ2FydEZvcm1BY3Rpb24iLCJnZXRTa3VGcm9tVXJsIiwidXJsIiwibGFzdFBhcnRPZlVybCIsIlJlZ0V4cCIsIm1hdGNoIiwic3JjIiwiYWx0IiwiTnVtYmVyIiwiY29udGVudCIsImhyZWYiLCJlbGVtZW50IiwiZGF0YXNldCIsImRpc2FibGVkIiwiYWN0aW9uIiwiZm9ybUFjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=