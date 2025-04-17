"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["label-group"],{

/***/ "./vendor/spryker-shop/product-label-widget/src/SprykerShop/Yves/ProductLabelWidget/Theme/default/components/molecules/label-group/label-group.ts":
/*!********************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-label-widget/src/SprykerShop/Yves/ProductLabelWidget/Theme/default/components/molecules/label-group/label-group.ts ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LabelGroup)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/components/molecules/product-item/product-item */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/product-item/product-item.ts");


class LabelGroup extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.productLabelFlags = void 0;
    this.productLabelTag = void 0;
    this.productItem = void 0;
  }
  readyCallback() {}
  init() {
    this.productLabelFlags = Array.from(this.getElementsByClassName(this.jsName + "__label-flag"));
    this.productLabelTag = this.getElementsByClassName(this.jsName + "__label-tag")[0];
    if (this.productItemClassName) {
      this.productItem = this.closest("." + this.productItemClassName);
    }
    this.mapEvents();
  }
  mapEvents() {
    if (!this.productItem) {
      return;
    }
    this.mapProductItemUpdateLabelsCustomEvent();
  }
  mapProductItemUpdateLabelsCustomEvent() {
    this.productItem.addEventListener(ShopUi_components_molecules_product_item_product_item__WEBPACK_IMPORTED_MODULE_1__.EVENT_UPDATE_LABELS, event => {
      this.setProductLabels(event.detail.labels);
    });
  }

  /**
   * Hides the product labels if data is empty.
   * Splits the labels object to labelFlags and labelTag accordingly.
   * Calls the method for updating product labels.
   * @param labels An array of product labels.
   */
  setProductLabels(labels) {
    if (!labels.length) {
      this.productLabelFlags.forEach(element => element.classList.add(this.classToToggle));
      this.productLabelTag.classList.add(this.classToToggle);
      return;
    }
    var labelTagType = this.productLabelTag.getAttribute('data-label-tag-type');
    var labelFlags = labels.filter(element => element.type !== labelTagType);
    var labelTag = labels.filter(element => element.type === labelTagType);
    if (!labelTag.length) {
      this.productLabelTag.classList.add(this.classToToggle);
    }
    if (!labelFlags.length) {
      this.productLabelFlags.forEach(element => element.classList.add(this.classToToggle));
    }
    this.updateProductLabels(labelFlags, labelTag[0]);
  }
  updateProductLabelTag(element) {
    var labelTagTextContent = this.productLabelTag.getElementsByClassName(this.jsName + "__label-tag-text")[0];
    this.productLabelTag.classList.remove(this.classToToggle);
    labelTagTextContent.innerText = element.text;
  }
  createProductLabelFlagClones() {
    var cloneLabelFlag = this.productLabelFlags[0].cloneNode(true);
    this.productLabelFlags[0].parentNode.insertBefore(cloneLabelFlag, this.productLabelFlags[0].nextSibling);
    this.productLabelFlags = Array.from(this.getElementsByClassName(this.jsName + "__label-flag"));
  }
  deleteProductLabelFlagClones(labelFlags) {
    while (this.productLabelFlags.length > labelFlags.length) {
      this.productLabelFlags[this.productLabelFlags.length - 1].remove();
      this.productLabelFlags = Array.from(this.getElementsByClassName(this.jsName + "__label-flag"));
    }
  }
  deleteProductLabelFlagModifiers(index) {
    this.productLabelFlags[index].classList.forEach(element => {
      if (element.includes('--')) {
        this.productLabelFlags[index].classList.remove(element);
      }
    });
  }
  updateProductLabelFlags(element, index) {
    var labelFlagClassName = this.productLabelFlags[index].getAttribute('data-config-name');
    var labelFlagTextContent = this.productLabelFlags[index].getElementsByClassName(this.jsName + "__label-flag-text")[0];
    if (element.type) {
      this.productLabelFlags[index].classList.add(labelFlagClassName + "--" + element.type);
    }
    this.productLabelFlags[index].classList.remove(this.classToToggle);
    labelFlagTextContent.innerText = element.text;
  }
  updateProductLabels(labelFlags, labelTag) {
    if (labelTag) {
      this.updateProductLabelTag(labelTag);
    }
    if (labelFlags.length) {
      labelFlags.forEach((element, index) => {
        if (index >= 1) {
          this.createProductLabelFlagClones();
        }
        this.deleteProductLabelFlagClones(labelFlags);
        this.deleteProductLabelFlagModifiers(index);
        this.updateProductLabelFlags(element, index);
      });
    }
  }
  get classToToggle() {
    return this.getAttribute('class-to-toggle');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU07SUFDM0M7SUFFQSxJQUFJLElBQUksQ0FBQ2pDLHNCQUFzQixFQUFFO01BQzdCLE9BQU8sSUFBSSxDQUFDQSxzQkFBc0IsQ0FBQytCLE9BQU8sQ0FBQ0csVUFBVTtJQUN6RDtFQUNKOztFQUVBO0FBQ0o7QUFDQTtBQUNBO0VBQ0ksSUFBSWpCLG1CQUFtQkEsQ0FBQ0EsbUJBQXdCLEVBQUU7SUFDOUMsSUFBSSxJQUFJLENBQUNsQixvQkFBb0IsRUFBRTtNQUMzQixJQUFJLENBQUNBLG9CQUFvQixDQUFDa0MsTUFBTSxHQUFHaEIsbUJBQW1CO0lBQzFEO0lBRUEsSUFBSSxJQUFJLENBQUNqQixzQkFBc0IsRUFBRTtNQUM3QixJQUFJLENBQUNBLHNCQUFzQixDQUFDK0IsT0FBTyxDQUFDRyxVQUFVLEdBQUdqQixtQkFBbUI7SUFDeEU7SUFFQSxJQUFJLENBQUNRLG1CQUFtQixDQUFDckMsb0NBQW9DLEVBQUU7TUFDM0R3QixHQUFHLEVBQUUsSUFBSSxDQUFDTSxhQUFhLENBQUNELG1CQUFtQjtJQUMvQyxDQUFDLENBQUM7RUFDTjtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LWxhYmVsLXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0TGFiZWxXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9sYWJlbC1ncm91cC9sYWJlbC1ncm91cC50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcHJvZHVjdC1pdGVtL3Byb2R1Y3QtaXRlbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBQcm9kdWN0SXRlbSwge1xuICAgIEVWRU5UX1VQREFURV9MQUJFTFMsXG4gICAgUHJvZHVjdEl0ZW1MYWJlbHNEYXRhLFxufSBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvcHJvZHVjdC1pdGVtL3Byb2R1Y3QtaXRlbSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhYmVsR3JvdXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGFiZWxGbGFnczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdExhYmVsVGFnOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEl0ZW06IFByb2R1Y3RJdGVtO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdExhYmVsRmxhZ3MgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xhYmVsLWZsYWdgKSk7XG4gICAgICAgIHRoaXMucHJvZHVjdExhYmVsVGFnID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xhYmVsLXRhZ2ApWzBdO1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0SXRlbUNsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0SXRlbSA9IDxQcm9kdWN0SXRlbT50aGlzLmNsb3Nlc3QoYC4ke3RoaXMucHJvZHVjdEl0ZW1DbGFzc05hbWV9YCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5wcm9kdWN0SXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tYXBQcm9kdWN0SXRlbVVwZGF0ZUxhYmVsc0N1c3RvbUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFByb2R1Y3RJdGVtVXBkYXRlTGFiZWxzQ3VzdG9tRXZlbnQoKSB7XG4gICAgICAgIHRoaXMucHJvZHVjdEl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9VUERBVEVfTEFCRUxTLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFByb2R1Y3RMYWJlbHMoKDxDdXN0b21FdmVudD5ldmVudCkuZGV0YWlsLmxhYmVscyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBwcm9kdWN0IGxhYmVscyBpZiBkYXRhIGlzIGVtcHR5LlxuICAgICAqIFNwbGl0cyB0aGUgbGFiZWxzIG9iamVjdCB0byBsYWJlbEZsYWdzIGFuZCBsYWJlbFRhZyBhY2NvcmRpbmdseS5cbiAgICAgKiBDYWxscyB0aGUgbWV0aG9kIGZvciB1cGRhdGluZyBwcm9kdWN0IGxhYmVscy5cbiAgICAgKiBAcGFyYW0gbGFiZWxzIEFuIGFycmF5IG9mIHByb2R1Y3QgbGFiZWxzLlxuICAgICAqL1xuICAgIHNldFByb2R1Y3RMYWJlbHMobGFiZWxzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXSkge1xuICAgICAgICBpZiAoIWxhYmVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsRmxhZ3MuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzVG9Ub2dnbGUpKTtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsVGFnLmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc1RvVG9nZ2xlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGFiZWxUYWdUeXBlID0gdGhpcy5wcm9kdWN0TGFiZWxUYWcuZ2V0QXR0cmlidXRlKCdkYXRhLWxhYmVsLXRhZy10eXBlJyk7XG4gICAgICAgIGNvbnN0IGxhYmVsRmxhZ3MgPSBsYWJlbHMuZmlsdGVyKChlbGVtZW50OiBQcm9kdWN0SXRlbUxhYmVsc0RhdGEpID0+IGVsZW1lbnQudHlwZSAhPT0gbGFiZWxUYWdUeXBlKTtcbiAgICAgICAgY29uc3QgbGFiZWxUYWcgPSBsYWJlbHMuZmlsdGVyKChlbGVtZW50OiBQcm9kdWN0SXRlbUxhYmVsc0RhdGEpID0+IGVsZW1lbnQudHlwZSA9PT0gbGFiZWxUYWdUeXBlKTtcblxuICAgICAgICBpZiAoIWxhYmVsVGFnLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxUYWcuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFsYWJlbEZsYWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFncy5mb3JFYWNoKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NUb1RvZ2dsZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0TGFiZWxzKGxhYmVsRmxhZ3MsIGxhYmVsVGFnWzBdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlUHJvZHVjdExhYmVsVGFnKGVsZW1lbnQ6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YSk6IHZvaWQge1xuICAgICAgICBjb25zdCBsYWJlbFRhZ1RleHRDb250ZW50ID0gPEhUTUxFbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExhYmVsVGFnLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19sYWJlbC10YWctdGV4dGApWzBdXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxUYWcuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICBsYWJlbFRhZ1RleHRDb250ZW50LmlubmVyVGV4dCA9IGVsZW1lbnQudGV4dDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlUHJvZHVjdExhYmVsRmxhZ0Nsb25lcygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2xvbmVMYWJlbEZsYWcgPSB0aGlzLnByb2R1Y3RMYWJlbEZsYWdzWzBdLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgICB0aGlzLnByb2R1Y3RMYWJlbEZsYWdzWzBdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lTGFiZWxGbGFnLCB0aGlzLnByb2R1Y3RMYWJlbEZsYWdzWzBdLm5leHRTaWJsaW5nKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFncyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGFiZWwtZmxhZ2ApKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGVsZXRlUHJvZHVjdExhYmVsRmxhZ0Nsb25lcyhsYWJlbEZsYWdzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXSk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5wcm9kdWN0TGFiZWxGbGFncy5sZW5ndGggPiBsYWJlbEZsYWdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFnc1t0aGlzLnByb2R1Y3RMYWJlbEZsYWdzLmxlbmd0aCAtIDFdLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFncyA9IDxIVE1MRWxlbWVudFtdPihcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xhYmVsLWZsYWdgKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGVsZXRlUHJvZHVjdExhYmVsRmxhZ01vZGlmaWVycyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMucHJvZHVjdExhYmVsRmxhZ3NbaW5kZXhdLmNsYXNzTGlzdC5mb3JFYWNoKChlbGVtZW50OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmluY2x1ZGVzKCctLScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFnc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZShlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVByb2R1Y3RMYWJlbEZsYWdzKGVsZW1lbnQ6IFByb2R1Y3RJdGVtTGFiZWxzRGF0YSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBsYWJlbEZsYWdDbGFzc05hbWU6IHN0cmluZyA9IHRoaXMucHJvZHVjdExhYmVsRmxhZ3NbaW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1jb25maWctbmFtZScpO1xuICAgICAgICBjb25zdCBsYWJlbEZsYWdUZXh0Q29udGVudCA9IDxIVE1MRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMYWJlbEZsYWdzW2luZGV4XS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbGFiZWwtZmxhZy10ZXh0YClbMF1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoZWxlbWVudC50eXBlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RMYWJlbEZsYWdzW2luZGV4XS5jbGFzc0xpc3QuYWRkKGAke2xhYmVsRmxhZ0NsYXNzTmFtZX0tLSR7ZWxlbWVudC50eXBlfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wcm9kdWN0TGFiZWxGbGFnc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICBsYWJlbEZsYWdUZXh0Q29udGVudC5pbm5lclRleHQgPSBlbGVtZW50LnRleHQ7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVByb2R1Y3RMYWJlbHMobGFiZWxGbGFnczogUHJvZHVjdEl0ZW1MYWJlbHNEYXRhW10sIGxhYmVsVGFnOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGEpOiB2b2lkIHtcbiAgICAgICAgaWYgKGxhYmVsVGFnKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2R1Y3RMYWJlbFRhZyhsYWJlbFRhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGFiZWxGbGFncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxhYmVsRmxhZ3MuZm9yRWFjaCgoZWxlbWVudDogUHJvZHVjdEl0ZW1MYWJlbHNEYXRhLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9kdWN0TGFiZWxGbGFnQ2xvbmVzKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcm9kdWN0TGFiZWxGbGFnQ2xvbmVzKGxhYmVsRmxhZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlUHJvZHVjdExhYmVsRmxhZ01vZGlmaWVycyhpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0TGFiZWxGbGFncyhlbGVtZW50LCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2xhc3NUb1RvZ2dsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcHJvZHVjdEl0ZW1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwcm9kdWN0LWl0ZW0tY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbi8qKlxuICogQGV2ZW50IHVwZGF0ZVJhdGluZyBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgcmF0aW5nIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlTGFiZWxzIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgcHJvZHVjdCBsYWJlbHMgaGFzIGJlZW4gdXBkYXRlZC5cbiAqIEBldmVudCB1cGRhdGVBZGRUb0NhcnRVcmwgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0ICdhZGQgdG8gY2FydCcgVVJMIGhhcyBiZWVuIHVwZGF0ZWQuXG4gKiBAZXZlbnQgdXBkYXRlQWpheEFkZFRvQ2FydFVybCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIHByb2R1Y3QgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTCBoYXMgYmVlbiB1cGRhdGVkLlxuICogQGV2ZW50IHVwZGF0ZUFkZFRvQ2FydEZvcm1BY3Rpb24gQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBwcm9kdWN0ICdhZGQgdG8gY2FydCcgZm9ybSBhY3Rpb24gaGFzIGJlZW4gdXBkYXRlZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9SQVRJTkcgPSAndXBkYXRlUmF0aW5nJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfTEFCRUxTID0gJ3VwZGF0ZUxhYmVscyc7XG5leHBvcnQgY29uc3QgRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX1VSTCA9ICd1cGRhdGVBZGRUb0NhcnRVcmwnO1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9BSkFYX0FERF9UT19DQVJUX1VSTCA9ICd1cGRhdGVBamF4QWRkVG9DYXJ0VXJsJztcbmV4cG9ydCBjb25zdCBFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfRk9STV9BQ1RJT04gPSAndXBkYXRlQWRkVG9DYXJ0Rm9ybUFjdGlvbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEl0ZW1MYWJlbHNEYXRhIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJdGVtRGF0YSB7XG4gICAgaW1hZ2VVcmw6IHN0cmluZztcbiAgICBpbWFnZUFsdDogc3RyaW5nO1xuICAgIGxhYmVsczogUHJvZHVjdEl0ZW1MYWJlbHNEYXRhW107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJhdGluZ1ZhbHVlOiBudW1iZXI7XG4gICAgZGVmYXVsdFByaWNlOiBzdHJpbmc7XG4gICAgc2t1Pzogc3RyaW5nO1xuICAgIG9yaWdpbmFsUHJpY2U6IHN0cmluZztcbiAgICBkZXRhaWxQYWdlVXJsOiBzdHJpbmc7XG4gICAgYWRkVG9DYXJ0VXJsOiBzdHJpbmc7XG4gICAgYWpheEFkZFRvQ2FydFVybD86IHN0cmluZztcbiAgICBhZGRUb0NhcnRGb3JtQWN0aW9uPzogc3RyaW5nO1xufVxuXG50eXBlIFVybCA9IHN0cmluZyB8IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RJdGVtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TmFtZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RSYXRpbmc6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3REZWZhdWx0UHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwcm9kdWN0U2t1OiBIVE1MTWV0YUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RPcmlnaW5hbFByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdExpbmtEZXRhaWxQYWdlOiBIVE1MQW5jaG9yRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBwcm9kdWN0TGlua0FkZFRvQ2FydDogSFRNTEFuY2hvckVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEZvcm1BZGRUb0NhcnQ6IEhUTUxGb3JtRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcHJvZHVjdEJ1dHRvbkFkZFRvQ2FydDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2UgPSA8SFRNTEltYWdlRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbWFnZWApWzBdO1xuICAgICAgICB0aGlzLnByb2R1Y3ROYW1lID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX25hbWVgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0UmF0aW5nID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcmF0aW5nYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19kZWZhdWx0LXByaWNlYClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdFNrdSA9IDxIVE1MTWV0YUVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2t1YClbMF07XG4gICAgICAgIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fb3JpZ2luYWwtcHJpY2VgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UgPSA8SFRNTEFuY2hvckVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpbmstZGV0YWlsLXBhZ2VgKSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCA9IDxIVE1MQW5jaG9yRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19saW5rLWFkZC10by1jYXJ0YClbMF1cbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCA9IDxIVE1MQnV0dG9uRWxlbWVudD4oXG4gICAgICAgICAgICB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19hamF4LWJ1dHRvbi1hZGQtdG8tY2FydGApWzBdXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQgPSA8SFRNTEZvcm1FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2Zvcm0tYWRkLXRvLWNhcnRgKVswXTtcbiAgICAgICAgdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0ID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2J1dHRvbi1hZGQtdG8tY2FydGApWzBdXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGluZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSBkYXRhIEEgZGF0YSBvYmplY3QgZm9yIHNldHRpbmcgdGhlIHByb2R1Y3QgY2FyZCBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICB1cGRhdGVQcm9kdWN0SXRlbURhdGEoZGF0YTogUHJvZHVjdEl0ZW1EYXRhKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW1hZ2VVcmwgPSBkYXRhLmltYWdlVXJsO1xuICAgICAgICB0aGlzLmltYWdlQWx0ID0gZGF0YS5pbWFnZUFsdDtcbiAgICAgICAgdGhpcy5sYWJlbHMgPSBkYXRhLmxhYmVscztcbiAgICAgICAgdGhpcy5wcm9kdWN0SXRlbU5hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIHRoaXMucmF0aW5nVmFsdWUgPSBkYXRhLnJhdGluZ1ZhbHVlO1xuICAgICAgICB0aGlzLmRlZmF1bHRQcmljZSA9IGRhdGEuZGVmYXVsdFByaWNlO1xuICAgICAgICB0aGlzLnNrdSA9IGRhdGEuc2t1ID8/IG51bGw7XG4gICAgICAgIHRoaXMub3JpZ2luYWxQcmljZSA9IGRhdGEub3JpZ2luYWxQcmljZTtcbiAgICAgICAgdGhpcy5kZXRhaWxQYWdlVXJsID0gZGF0YS5kZXRhaWxQYWdlVXJsO1xuICAgICAgICB0aGlzLmFkZFRvQ2FydFVybCA9IGRhdGEuYWRkVG9DYXJ0VXJsO1xuICAgICAgICB0aGlzLmFqYXhBZGRUb0NhcnRVcmwgPSBkYXRhLmFqYXhBZGRUb0NhcnRVcmwgPz8gbnVsbDtcbiAgICAgICAgdGhpcy5hZGRUb0NhcnRGb3JtQWN0aW9uID0gZGF0YS5hZGRUb0NhcnRGb3JtQWN0aW9uID8/IG51bGw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFNrdUZyb21VcmwodXJsOiBVcmwpOiBVcmwge1xuICAgICAgICBpZiAoIXVybCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsYXN0UGFydE9mVXJsID0gbmV3IFJlZ0V4cChgKFteXFxcXC9dKSskYCwgJ2cnKTtcbiAgICAgICAgY29uc3Qgc2t1ID0gdXJsLm1hdGNoKGxhc3RQYXJ0T2ZVcmwpO1xuXG4gICAgICAgIHJldHVybiBza3VbMF07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGltYWdlIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgaW1hZ2VVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9kdWN0SW1hZ2Uuc3JjO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGltYWdlIFVSTC5cbiAgICAgKiBAcGFyYW0gaW1hZ2VVcmwgQSBwcm9kdWN0IGNhcmQgaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIHNldCBpbWFnZVVybChpbWFnZVVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RJbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0SW1hZ2Uuc3JjID0gaW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgaW1hZ2UgYWx0LlxuICAgICAqIEBwYXJhbSBpbWFnZUFsdCBBIHByb2R1Y3QgY2FyZCBpbWFnZSBhbHQuXG4gICAgICovXG4gICAgc2V0IGltYWdlQWx0KGltYWdlQWx0OiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEltYWdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3RJbWFnZS5hbHQgPSBpbWFnZUFsdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBsYWJlbHMuXG4gICAgICogQHBhcmFtIGxhYmVscyBBbiBhcnJheSBvZiBwcm9kdWN0IGNhcmQgbGFiZWxzLlxuICAgICAqL1xuICAgIHNldCBsYWJlbHMobGFiZWxzOiBQcm9kdWN0SXRlbUxhYmVsc0RhdGFbXSkge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0xBQkVMUywgeyBsYWJlbHMgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIG5hbWUuXG4gICAgICovXG4gICAgZ2V0IHByb2R1Y3RJdGVtTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdE5hbWUuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIG5hbWUuXG4gICAgICogQHBhcmFtIG5hbWUgQSBwcm9kdWN0IGNhcmQgbmFtZS5cbiAgICAgKi9cbiAgICBzZXQgcHJvZHVjdEl0ZW1OYW1lKG5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TmFtZS5pbm5lclRleHQgPSBuYW1lO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKi9cbiAgICBnZXQgcmF0aW5nVmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdFJhdGluZykge1xuICAgICAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLnByb2R1Y3RSYXRpbmcudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKiBAcGFyYW0gcmF0aW5nIEEgcHJvZHVjdCBjYXJkIHJhdGluZy5cbiAgICAgKi9cbiAgICBzZXQgcmF0aW5nVmFsdWUocmF0aW5nOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9SQVRJTkcsIHsgcmF0aW5nIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBkZWZhdWx0IHByaWNlLlxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0UHJpY2UoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdERlZmF1bHRQcmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdERlZmF1bHRQcmljZS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgZGVmYXVsdCBwcmljZS5cbiAgICAgKiBAcGFyYW0gZGVmYXVsdFByaWNlIEEgcHJvZHVjdCBjYXJkIGRlZmF1bHQgcHJpY2UuXG4gICAgICovXG4gICAgc2V0IGRlZmF1bHRQcmljZShkZWZhdWx0UHJpY2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0RGVmYXVsdFByaWNlKSB7XG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZWZhdWx0UHJpY2UuaW5uZXJUZXh0ID0gZGVmYXVsdFByaWNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIHNrdS5cbiAgICAgKi9cbiAgICBnZXQgc2t1KCk6IHN0cmluZyB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RTa3UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RTa3UuY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCBza3UuXG4gICAgICogQHBhcmFtIHByb2R1Y3RTa3UgQSBwcm9kdWN0IGNhcmQgc2t1LlxuICAgICAqL1xuICAgIHNldCBza3UocHJvZHVjdFNrdTogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RTa3UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdFNrdS5jb250ZW50ID0gcHJvZHVjdFNrdTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHByb2R1Y3QgY2FyZCBvcmlnaW5hbCBwcmljZS5cbiAgICAgKi9cbiAgICBnZXQgb3JpZ2luYWxQcmljZSgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdE9yaWdpbmFsUHJpY2UuaW5uZXJUZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqIEBwYXJhbSBvcmlnaW5hbFByaWNlIEEgcHJvZHVjdCBjYXJkIG9yaWdpbmFsIHByaWNlLlxuICAgICAqL1xuICAgIHNldCBvcmlnaW5hbFByaWNlKG9yaWdpbmFsUHJpY2U6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0T3JpZ2luYWxQcmljZS5pbm5lclRleHQgPSBvcmlnaW5hbFByaWNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKi9cbiAgICBnZXQgZGV0YWlsUGFnZVVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZVswXS5ocmVmO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIGRldGFpbCBwYWdlIFVSTC5cbiAgICAgKiBAcGFyYW0gZGV0YWlsUGFnZVVybCBBIHByb2R1Y3QgY2FyZCBkZXRhaWwgcGFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IGRldGFpbFBhZ2VVcmwoZGV0YWlsUGFnZVVybDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLnByb2R1Y3RMaW5rRGV0YWlsUGFnZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0TGlua0RldGFpbFBhZ2UuZm9yRWFjaCgoZWxlbWVudDogSFRNTEFuY2hvckVsZW1lbnQpID0+IChlbGVtZW50LmhyZWYgPSBkZXRhaWxQYWdlVXJsKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgZ2V0IGFkZFRvQ2FydFVybCgpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0TGlua0FkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQuaHJlZjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKiBAcGFyYW0gYWRkVG9DYXJ0VXJsIEEgcHJvZHVjdCBjYXJkICdhZGQgdG8gY2FydCcgVVJMLlxuICAgICAqL1xuICAgIHNldCBhZGRUb0NhcnRVcmwoYWRkVG9DYXJ0VXJsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdExpbmtBZGRUb0NhcnQuaHJlZiA9IGFkZFRvQ2FydFVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMLCB7IHNrdTogdGhpcy5nZXRTa3VGcm9tVXJsKGFkZFRvQ2FydFVybCkgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgcHJvZHVjdCBjYXJkIEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICovXG4gICAgZ2V0IGFqYXhBZGRUb0NhcnRVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RBamF4QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQudXJsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcHJvZHVjdCBjYXJkIEFKQVggJ2FkZCB0byBjYXJ0JyBVUkwuXG4gICAgICogQHBhcmFtIGFqYXhBZGRUb0NhcnRVcmwgQSBwcm9kdWN0IGNhcmQgQUpBWCAnYWRkIHRvIGNhcnQnIFVSTC5cbiAgICAgKi9cbiAgICBzZXQgYWpheEFkZFRvQ2FydFVybChhamF4QWRkVG9DYXJ0VXJsOiBVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGlzYWJsZWQgPSAhYWpheEFkZFRvQ2FydFVybDtcbiAgICAgICAgICAgIHRoaXMucHJvZHVjdEFqYXhCdXR0b25BZGRUb0NhcnQuZGF0YXNldC51cmwgPSBhamF4QWRkVG9DYXJ0VXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1VQREFURV9BSkFYX0FERF9UT19DQVJUX1VSTCwgeyBza3U6IHRoaXMuZ2V0U2t1RnJvbVVybChhamF4QWRkVG9DYXJ0VXJsKSB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgYWRkVG9DYXJ0Rm9ybUFjdGlvbigpOiBzdHJpbmcge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEZvcm1BZGRUb0NhcnQuYWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydC5kYXRhc2V0LmZvcm1BY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwcm9kdWN0IGNhcmQgJ2FkZCB0byBjYXJ0JyBmb3JtIGFjdGlvbi5cbiAgICAgKiBAcGFyYW0gYWRkVG9DYXJ0Rm9ybUFjdGlvbiBBIHByb2R1Y3QgY2FyZCAnYWRkIHRvIGNhcnQnIGZvcm0gYWN0aW9uLlxuICAgICAqL1xuICAgIHNldCBhZGRUb0NhcnRGb3JtQWN0aW9uKGFkZFRvQ2FydEZvcm1BY3Rpb246IFVybCkge1xuICAgICAgICBpZiAodGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0Rm9ybUFkZFRvQ2FydC5hY3Rpb24gPSBhZGRUb0NhcnRGb3JtQWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCkge1xuICAgICAgICAgICAgdGhpcy5wcm9kdWN0QnV0dG9uQWRkVG9DYXJ0LmRhdGFzZXQuZm9ybUFjdGlvbiA9IGFkZFRvQ2FydEZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OLCB7XG4gICAgICAgICAgICBza3U6IHRoaXMuZ2V0U2t1RnJvbVVybChhZGRUb0NhcnRGb3JtQWN0aW9uKSxcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkVWRU5UX1VQREFURV9MQUJFTFMiLCJMYWJlbEdyb3VwIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJwcm9kdWN0TGFiZWxGbGFncyIsInByb2R1Y3RMYWJlbFRhZyIsInByb2R1Y3RJdGVtIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwicHJvZHVjdEl0ZW1DbGFzc05hbWUiLCJjbG9zZXN0IiwibWFwRXZlbnRzIiwibWFwUHJvZHVjdEl0ZW1VcGRhdGVMYWJlbHNDdXN0b21FdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInNldFByb2R1Y3RMYWJlbHMiLCJkZXRhaWwiLCJsYWJlbHMiLCJsZW5ndGgiLCJmb3JFYWNoIiwiZWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImNsYXNzVG9Ub2dnbGUiLCJsYWJlbFRhZ1R5cGUiLCJnZXRBdHRyaWJ1dGUiLCJsYWJlbEZsYWdzIiwiZmlsdGVyIiwidHlwZSIsImxhYmVsVGFnIiwidXBkYXRlUHJvZHVjdExhYmVscyIsInVwZGF0ZVByb2R1Y3RMYWJlbFRhZyIsImxhYmVsVGFnVGV4dENvbnRlbnQiLCJyZW1vdmUiLCJpbm5lclRleHQiLCJ0ZXh0IiwiY3JlYXRlUHJvZHVjdExhYmVsRmxhZ0Nsb25lcyIsImNsb25lTGFiZWxGbGFnIiwiY2xvbmVOb2RlIiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiZGVsZXRlUHJvZHVjdExhYmVsRmxhZ0Nsb25lcyIsImRlbGV0ZVByb2R1Y3RMYWJlbEZsYWdNb2RpZmllcnMiLCJpbmRleCIsImluY2x1ZGVzIiwidXBkYXRlUHJvZHVjdExhYmVsRmxhZ3MiLCJsYWJlbEZsYWdDbGFzc05hbWUiLCJsYWJlbEZsYWdUZXh0Q29udGVudCIsIkVWRU5UX1VQREFURV9SQVRJTkciLCJFVkVOVF9VUERBVEVfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FKQVhfQUREX1RPX0NBUlRfVVJMIiwiRVZFTlRfVVBEQVRFX0FERF9UT19DQVJUX0ZPUk1fQUNUSU9OIiwiUHJvZHVjdEl0ZW0iLCJwcm9kdWN0SW1hZ2UiLCJwcm9kdWN0TmFtZSIsInByb2R1Y3RSYXRpbmciLCJwcm9kdWN0RGVmYXVsdFByaWNlIiwicHJvZHVjdFNrdSIsInByb2R1Y3RPcmlnaW5hbFByaWNlIiwicHJvZHVjdExpbmtEZXRhaWxQYWdlIiwicHJvZHVjdExpbmtBZGRUb0NhcnQiLCJwcm9kdWN0QWpheEJ1dHRvbkFkZFRvQ2FydCIsInByb2R1Y3RGb3JtQWRkVG9DYXJ0IiwicHJvZHVjdEJ1dHRvbkFkZFRvQ2FydCIsInVwZGF0ZVByb2R1Y3RJdGVtRGF0YSIsImRhdGEiLCJfZGF0YSRza3UiLCJfZGF0YSRhamF4QWRkVG9DYXJ0VXIiLCJfZGF0YSRhZGRUb0NhcnRGb3JtQWMiLCJpbWFnZVVybCIsImltYWdlQWx0IiwicHJvZHVjdEl0ZW1OYW1lIiwibmFtZSIsInJhdGluZ1ZhbHVlIiwiZGVmYXVsdFByaWNlIiwic2t1Iiwib3JpZ2luYWxQcmljZSIsImRldGFpbFBhZ2VVcmwiLCJhZGRUb0NhcnRVcmwiLCJhamF4QWRkVG9DYXJ0VXJsIiwiYWRkVG9DYXJ0Rm9ybUFjdGlvbiIsImdldFNrdUZyb21VcmwiLCJ1cmwiLCJsYXN0UGFydE9mVXJsIiwiUmVnRXhwIiwibWF0Y2giLCJzcmMiLCJhbHQiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwiTnVtYmVyIiwidmFsdWUiLCJyYXRpbmciLCJjb250ZW50IiwiaHJlZiIsImRhdGFzZXQiLCJkaXNhYmxlZCIsImFjdGlvbiIsImZvcm1BY3Rpb24iXSwic291cmNlUm9vdCI6IiJ9