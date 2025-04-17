"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["image-carousel"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/image-carousel/image-carousel.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/image-carousel/image-carousel.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImageCarousel)
/* harmony export */ });
/* harmony import */ var _simple_carousel_simple_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../simple-carousel/simple-carousel */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts");

class ImageCarousel extends _simple_carousel_simple_carousel__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.defaultImageUrl = void 0;
    this.currentSlideImage = void 0;
  }
  readyCallback() {}
  init() {
    this.getCurrentSlideImage();
    this.setDefaultImageUrl();
    super.init();
  }

  /**
   * Performs sliding of slider items.
   */
  slide() {
    super.slide();
    this.getCurrentSlideImage();
    this.setDefaultImageUrl();
  }

  /**
   * Sets the new slide image with a new URL.
   * @param url An image URL.
   */
  set slideImageUrl(url) {
    this.currentSlideImage.src = url;
  }

  /**
   * Sets the slide image with a default URL.
   */
  restoreDefaultImageUrl() {
    this.currentSlideImage.src = this.defaultImageUrl;
  }
  getCurrentSlideImage() {
    var currentSlide = this.getElementsByClassName(this.jsName + "__slide")[this.viewCurrentIndex];
    this.currentSlideImage = currentSlide.getElementsByTagName('img')[0];
  }
  setDefaultImageUrl() {
    this.defaultImageUrl = this.currentSlideImage.dataset.src || this.currentSlideImage.src;
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/simple-carousel/simple-carousel.ts ***!
  \***************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SimpleCarousel)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class SimpleCarousel extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Switches a slide to a previous one.
   */

  /**
   * Switches a slide to a next one.
   */

  /**
   * The current slider.
   */

  /**
   * The number of the slides.
   */

  /**
   * The slider width.
   */

  /**
   * Thr dot-switch elements below the slides.
   */

  /**
   * The number of views.
   */

  /**
   * The index of the active slide.
   */

  /**
   * Dot element selector.
   */

  /**
   * Dot element "is current" modifier.
   */

  constructor() {
    super();
    this.triggerPrev = void 0;
    this.triggerNext = void 0;
    this.slider = void 0;
    this.slidesCount = void 0;
    this.slideWidth = void 0;
    this.dots = void 0;
    this.viewsCount = void 0;
    this.viewCurrentIndex = 0;
    this.dotSelector = void 0;
    this.dotCurrentModifier = void 0;
    this.fullSliderWidth = 100;
    this.dotSelector = this.jsName + "__dot";
    this.dotCurrentModifier = this.name + "__dot--current";
  }
  readyCallback() {}
  init() {
    this.slidesCount = this.getElementsByClassName(this.jsName + "__slide").length;
    if (this.slidesCount <= 1) {
      return;
    }
    this.triggerPrev = this.getElementsByClassName(this.jsName + "__prev")[0];
    this.triggerNext = this.getElementsByClassName(this.jsName + "__next")[0];
    this.slider = this.getElementsByClassName(this.jsName + "__slider")[0];
    this.slideWidth = this.fullSliderWidth / this.slidesToShow;
    this.dots = Array.from(this.getElementsByClassName(this.dotSelector));
    this.viewsCount = this.getViewsCount();
    this.mapEvents();
  }

  /**
   * Gets the number of slides.
   */
  getViewsCount() {
    return Math.ceil((this.slidesCount - this.slidesToShow) / this.slidesToScroll) + 1;
  }
  mapEvents() {
    this.triggerPrev.addEventListener('click', event => this.onPrevClick(event));
    this.triggerNext.addEventListener('click', event => this.onNextClick(event));
    this.dots.forEach(dot => {
      dot.addEventListener('click', event => this.onDotClick(event));
    });
  }
  onPrevClick(event) {
    event.preventDefault();
    this.loadPrevViewIndex();
    this.slide();
    this.updateCurrentDot();
  }
  onNextClick(event) {
    event.preventDefault();
    this.loadNextViewIndex();
    this.slide();
    this.updateCurrentDot();
  }
  onDotClick(event) {
    event.preventDefault();
    this.loadViewIndexFromDot(event.target);
    this.slide();
    this.updateCurrentDot();
  }

  /**
   * Switches the current slide to the previous one.
   */
  loadPrevViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex - 1;
    if (this.viewCurrentIndex < 0) {
      this.viewCurrentIndex = this.viewsCount - 1;
    }
  }

  /**
   * Switches the current slide to the next one.
   */
  loadNextViewIndex() {
    this.viewCurrentIndex = this.viewCurrentIndex + 1;
    if (this.viewCurrentIndex >= this.viewsCount) {
      this.viewCurrentIndex = 0;
    }
  }

  /**
   * Switches to the slide based on the provided dot element.
   * @param dot HTMLElement corresponding to the new target slide that has to be loaded.
   */
  loadViewIndexFromDot(dot) {
    this.viewCurrentIndex = this.dots.indexOf(dot);
    if (this.viewCurrentIndex === -1) {
      this.viewCurrentIndex = 0;
    }
  }

  /**
   * Performs sliding of slider items.
   */
  slide() {
    var slidesToSlide = this.slidesToScroll * this.viewCurrentIndex;
    if (this.slidesToScroll + slidesToSlide > this.slidesCount) {
      slidesToSlide = slidesToSlide - (this.slidesCount - slidesToSlide);
    }
    var offset = -(slidesToSlide * this.slideWidth);
    this.slider.style.transform = "translateX(" + offset + "%)";
  }

  /**
   * Toggles the active class and the modifier on the current dot.
   */
  updateCurrentDot() {
    if (this.dots.length === 0) {
      return;
    }
    this.querySelector("." + this.dotSelector + "." + this.dotCurrentModifier).classList.remove(this.dotCurrentModifier);
    this.dots[this.viewCurrentIndex].classList.add(this.dotCurrentModifier);
  }

  /**
   * Gets the number of slides to be shown.
   */
  get slidesToShow() {
    return parseInt(this.getAttribute('slides-to-show') || '0');
  }

  /**
   * Gets the number of slides to be scrolled by an interaction.
   */
  get slidesToScroll() {
    return parseInt(this.getAttribute('slides-to-scroll') || '0');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzJCLGFBQWEsT0FBSyxJQUFJLENBQUMvQixXQUFXLFNBQUksSUFBSSxDQUFDQyxrQkFBb0IsQ0FBQyxDQUFDK0IsU0FBUyxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDaEMsa0JBQWtCLENBQUM7SUFFL0csSUFBSSxDQUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDVCxnQkFBZ0IsQ0FBQyxDQUFDMkMsU0FBUyxDQUFDRSxHQUFHLENBQUMsSUFBSSxDQUFDakMsa0JBQWtCLENBQUM7RUFDM0U7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBSUksWUFBWUEsQ0FBQSxFQUFXO0lBQ3ZCLE9BQU84QixRQUFRLENBQUMsSUFBSSxDQUFDQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLENBQUM7RUFDL0Q7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBSXhCLGNBQWNBLENBQUEsRUFBVztJQUN6QixPQUFPdUIsUUFBUSxDQUFDLElBQUksQ0FBQ0MsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksR0FBRyxDQUFDO0VBQ2pFO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvaW1hZ2UtY2Fyb3VzZWwvaW1hZ2UtY2Fyb3VzZWwudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NpbXBsZS1jYXJvdXNlbC9zaW1wbGUtY2Fyb3VzZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNpbXBsZUNhcm91c2VsIGZyb20gJy4uL3NpbXBsZS1jYXJvdXNlbC9zaW1wbGUtY2Fyb3VzZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUNhcm91c2VsIGV4dGVuZHMgU2ltcGxlQ2Fyb3VzZWwge1xuICAgIHByb3RlY3RlZCBkZWZhdWx0SW1hZ2VVcmw6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgY3VycmVudFNsaWRlSW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5nZXRDdXJyZW50U2xpZGVJbWFnZSgpO1xuICAgICAgICB0aGlzLnNldERlZmF1bHRJbWFnZVVybCgpO1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgc2xpZGluZyBvZiBzbGlkZXIgaXRlbXMuXG4gICAgICovXG4gICAgc2xpZGUoKTogdm9pZCB7XG4gICAgICAgIHN1cGVyLnNsaWRlKCk7XG4gICAgICAgIHRoaXMuZ2V0Q3VycmVudFNsaWRlSW1hZ2UoKTtcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0SW1hZ2VVcmwoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBuZXcgc2xpZGUgaW1hZ2Ugd2l0aCBhIG5ldyBVUkwuXG4gICAgICogQHBhcmFtIHVybCBBbiBpbWFnZSBVUkwuXG4gICAgICovXG4gICAgc2V0IHNsaWRlSW1hZ2VVcmwodXJsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2xpZGVJbWFnZS5zcmMgPSB1cmw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2xpZGUgaW1hZ2Ugd2l0aCBhIGRlZmF1bHQgVVJMLlxuICAgICAqL1xuICAgIHJlc3RvcmVEZWZhdWx0SW1hZ2VVcmwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlSW1hZ2Uuc3JjID0gdGhpcy5kZWZhdWx0SW1hZ2VVcmw7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldEN1cnJlbnRTbGlkZUltYWdlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2xpZGVgKVt0aGlzLnZpZXdDdXJyZW50SW5kZXhdO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFNsaWRlSW1hZ2UgPSBjdXJyZW50U2xpZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXREZWZhdWx0SW1hZ2VVcmwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGVmYXVsdEltYWdlVXJsID0gdGhpcy5jdXJyZW50U2xpZGVJbWFnZS5kYXRhc2V0LnNyYyB8fCB0aGlzLmN1cnJlbnRTbGlkZUltYWdlLnNyYztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaW1wbGVDYXJvdXNlbCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgYSBzbGlkZSB0byBhIHByZXZpb3VzIG9uZS5cbiAgICAgKi9cbiAgICB0cmlnZ2VyUHJldjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyBhIHNsaWRlIHRvIGEgbmV4dCBvbmUuXG4gICAgICovXG4gICAgdHJpZ2dlck5leHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgc2xpZGVyLlxuICAgICAqL1xuICAgIHNsaWRlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHRoZSBzbGlkZXMuXG4gICAgICovXG4gICAgc2xpZGVzQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBzbGlkZXIgd2lkdGguXG4gICAgICovXG4gICAgc2xpZGVXaWR0aDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhyIGRvdC1zd2l0Y2ggZWxlbWVudHMgYmVsb3cgdGhlIHNsaWRlcy5cbiAgICAgKi9cbiAgICBkb3RzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG51bWJlciBvZiB2aWV3cy5cbiAgICAgKi9cbiAgICB2aWV3c0NvdW50OiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaW5kZXggb2YgdGhlIGFjdGl2ZSBzbGlkZS5cbiAgICAgKi9cbiAgICB2aWV3Q3VycmVudEluZGV4ID0gMDtcblxuICAgIC8qKlxuICAgICAqIERvdCBlbGVtZW50IHNlbGVjdG9yLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRvdFNlbGVjdG9yOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEb3QgZWxlbWVudCBcImlzIGN1cnJlbnRcIiBtb2RpZmllci5cbiAgICAgKi9cbiAgICByZWFkb25seSBkb3RDdXJyZW50TW9kaWZpZXI6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgZnVsbFNsaWRlcldpZHRoID0gMTAwO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5kb3RTZWxlY3RvciA9IGAke3RoaXMuanNOYW1lfV9fZG90YDtcbiAgICAgICAgdGhpcy5kb3RDdXJyZW50TW9kaWZpZXIgPSBgJHt0aGlzLm5hbWV9X19kb3QtLWN1cnJlbnRgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNsaWRlc0NvdW50ID0gdGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2xpZGVgKS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzQ291bnQgPD0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyUHJldiA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19wcmV2YClbMF07XG4gICAgICAgIHRoaXMudHJpZ2dlck5leHQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fbmV4dGApWzBdO1xuICAgICAgICB0aGlzLnNsaWRlciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zbGlkZXJgKVswXTtcbiAgICAgICAgdGhpcy5zbGlkZVdpZHRoID0gdGhpcy5mdWxsU2xpZGVyV2lkdGggLyB0aGlzLnNsaWRlc1RvU2hvdztcbiAgICAgICAgdGhpcy5kb3RzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5kb3RTZWxlY3RvcikpO1xuICAgICAgICB0aGlzLnZpZXdzQ291bnQgPSB0aGlzLmdldFZpZXdzQ291bnQoKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBzbGlkZXMuXG4gICAgICovXG4gICAgZ2V0Vmlld3NDb3VudCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKCh0aGlzLnNsaWRlc0NvdW50IC0gdGhpcy5zbGlkZXNUb1Nob3cpIC8gdGhpcy5zbGlkZXNUb1Njcm9sbCkgKyAxO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlclByZXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uUHJldkNsaWNrKGV2ZW50KSk7XG4gICAgICAgIHRoaXMudHJpZ2dlck5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uTmV4dENsaWNrKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuZG90cy5mb3JFYWNoKChkb3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uRG90Q2xpY2soZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uUHJldkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmxvYWRQcmV2Vmlld0luZGV4KCk7XG4gICAgICAgIHRoaXMuc2xpZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50RG90KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uTmV4dENsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmxvYWROZXh0Vmlld0luZGV4KCk7XG4gICAgICAgIHRoaXMuc2xpZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50RG90KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRG90Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubG9hZFZpZXdJbmRleEZyb21Eb3QoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCk7XG4gICAgICAgIHRoaXMuc2xpZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDdXJyZW50RG90KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgdGhlIGN1cnJlbnQgc2xpZGUgdG8gdGhlIHByZXZpb3VzIG9uZS5cbiAgICAgKi9cbiAgICBsb2FkUHJldlZpZXdJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gdGhpcy52aWV3Q3VycmVudEluZGV4IC0gMTtcblxuICAgICAgICBpZiAodGhpcy52aWV3Q3VycmVudEluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gdGhpcy52aWV3c0NvdW50IC0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIHRoZSBjdXJyZW50IHNsaWRlIHRvIHRoZSBuZXh0IG9uZS5cbiAgICAgKi9cbiAgICBsb2FkTmV4dFZpZXdJbmRleCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gdGhpcy52aWV3Q3VycmVudEluZGV4ICsgMTtcblxuICAgICAgICBpZiAodGhpcy52aWV3Q3VycmVudEluZGV4ID49IHRoaXMudmlld3NDb3VudCkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIHRvIHRoZSBzbGlkZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgZG90IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGRvdCBIVE1MRWxlbWVudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBuZXcgdGFyZ2V0IHNsaWRlIHRoYXQgaGFzIHRvIGJlIGxvYWRlZC5cbiAgICAgKi9cbiAgICBsb2FkVmlld0luZGV4RnJvbURvdChkb3Q6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IHRoaXMuZG90cy5pbmRleE9mKGRvdCk7XG5cbiAgICAgICAgaWYgKHRoaXMudmlld0N1cnJlbnRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0N1cnJlbnRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyBzbGlkaW5nIG9mIHNsaWRlciBpdGVtcy5cbiAgICAgKi9cbiAgICBzbGlkZSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHNsaWRlc1RvU2xpZGUgPSB0aGlzLnNsaWRlc1RvU2Nyb2xsICogdGhpcy52aWV3Q3VycmVudEluZGV4O1xuXG4gICAgICAgIGlmICh0aGlzLnNsaWRlc1RvU2Nyb2xsICsgc2xpZGVzVG9TbGlkZSA+IHRoaXMuc2xpZGVzQ291bnQpIHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2xpZGUgPSBzbGlkZXNUb1NsaWRlIC0gKHRoaXMuc2xpZGVzQ291bnQgLSBzbGlkZXNUb1NsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IC0oc2xpZGVzVG9TbGlkZSAqIHRoaXMuc2xpZGVXaWR0aCk7XG4gICAgICAgIHRoaXMuc2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fSUpYDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBhY3RpdmUgY2xhc3MgYW5kIHRoZSBtb2RpZmllciBvbiB0aGUgY3VycmVudCBkb3QuXG4gICAgICovXG4gICAgdXBkYXRlQ3VycmVudERvdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZG90cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5kb3RTZWxlY3Rvcn0uJHt0aGlzLmRvdEN1cnJlbnRNb2RpZmllcn1gKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZG90Q3VycmVudE1vZGlmaWVyKTtcblxuICAgICAgICB0aGlzLmRvdHNbdGhpcy52aWV3Q3VycmVudEluZGV4XS5jbGFzc0xpc3QuYWRkKHRoaXMuZG90Q3VycmVudE1vZGlmaWVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2Ygc2xpZGVzIHRvIGJlIHNob3duLlxuICAgICAqL1xuICAgIGdldCBzbGlkZXNUb1Nob3coKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdzbGlkZXMtdG8tc2hvdycpIHx8ICcwJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHNsaWRlcyB0byBiZSBzY3JvbGxlZCBieSBhbiBpbnRlcmFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgc2xpZGVzVG9TY3JvbGwoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdzbGlkZXMtdG8tc2Nyb2xsJykgfHwgJzAnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiU2ltcGxlQ2Fyb3VzZWwiLCJJbWFnZUNhcm91c2VsIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJkZWZhdWx0SW1hZ2VVcmwiLCJjdXJyZW50U2xpZGVJbWFnZSIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiZ2V0Q3VycmVudFNsaWRlSW1hZ2UiLCJzZXREZWZhdWx0SW1hZ2VVcmwiLCJzbGlkZSIsInNsaWRlSW1hZ2VVcmwiLCJ1cmwiLCJzcmMiLCJyZXN0b3JlRGVmYXVsdEltYWdlVXJsIiwiY3VycmVudFNsaWRlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInZpZXdDdXJyZW50SW5kZXgiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImRhdGFzZXQiLCJDb21wb25lbnQiLCJ0cmlnZ2VyUHJldiIsInRyaWdnZXJOZXh0Iiwic2xpZGVyIiwic2xpZGVzQ291bnQiLCJzbGlkZVdpZHRoIiwiZG90cyIsInZpZXdzQ291bnQiLCJkb3RTZWxlY3RvciIsImRvdEN1cnJlbnRNb2RpZmllciIsImZ1bGxTbGlkZXJXaWR0aCIsIm5hbWUiLCJsZW5ndGgiLCJzbGlkZXNUb1Nob3ciLCJBcnJheSIsImZyb20iLCJnZXRWaWV3c0NvdW50IiwibWFwRXZlbnRzIiwiTWF0aCIsImNlaWwiLCJzbGlkZXNUb1Njcm9sbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uUHJldkNsaWNrIiwib25OZXh0Q2xpY2siLCJmb3JFYWNoIiwiZG90Iiwib25Eb3RDbGljayIsInByZXZlbnREZWZhdWx0IiwibG9hZFByZXZWaWV3SW5kZXgiLCJ1cGRhdGVDdXJyZW50RG90IiwibG9hZE5leHRWaWV3SW5kZXgiLCJsb2FkVmlld0luZGV4RnJvbURvdCIsInRhcmdldCIsImluZGV4T2YiLCJzbGlkZXNUb1NsaWRlIiwib2Zmc2V0Iiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJxdWVyeVNlbGVjdG9yIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicGFyc2VJbnQiLCJnZXRBdHRyaWJ1dGUiXSwic291cmNlUm9vdCI6IiJ9