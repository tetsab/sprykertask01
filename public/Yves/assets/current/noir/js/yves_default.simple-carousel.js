"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["simple-carousel"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sQ0FBQyxJQUFJLENBQUNyQyxrQkFBa0IsQ0FBQztJQUUvRyxJQUFJLENBQUNKLElBQUksQ0FBQyxJQUFJLENBQUNFLGdCQUFnQixDQUFDLENBQUNzQyxTQUFTLENBQUNFLEdBQUcsQ0FBQyxJQUFJLENBQUN0QyxrQkFBa0IsQ0FBQztFQUMzRTs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJUSxZQUFZQSxDQUFBLEVBQVc7SUFDdkIsT0FBTytCLFFBQVEsQ0FBQyxJQUFJLENBQUNDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQztFQUMvRDs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJekIsY0FBY0EsQ0FBQSxFQUFXO0lBQ3pCLE9BQU93QixRQUFRLENBQUMsSUFBSSxDQUFDQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsSUFBSSxHQUFHLENBQUM7RUFDakU7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9zaW1wbGUtY2Fyb3VzZWwvc2ltcGxlLWNhcm91c2VsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbXBsZUNhcm91c2VsIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyBhIHNsaWRlIHRvIGEgcHJldmlvdXMgb25lLlxuICAgICAqL1xuICAgIHRyaWdnZXJQcmV2OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFN3aXRjaGVzIGEgc2xpZGUgdG8gYSBuZXh0IG9uZS5cbiAgICAgKi9cbiAgICB0cmlnZ2VyTmV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBzbGlkZXIuXG4gICAgICovXG4gICAgc2xpZGVyOiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBudW1iZXIgb2YgdGhlIHNsaWRlcy5cbiAgICAgKi9cbiAgICBzbGlkZXNDb3VudDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHNsaWRlciB3aWR0aC5cbiAgICAgKi9cbiAgICBzbGlkZVdpZHRoOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaHIgZG90LXN3aXRjaCBlbGVtZW50cyBiZWxvdyB0aGUgc2xpZGVzLlxuICAgICAqL1xuICAgIGRvdHM6IEhUTUxFbGVtZW50W107XG5cbiAgICAvKipcbiAgICAgKiBUaGUgbnVtYmVyIG9mIHZpZXdzLlxuICAgICAqL1xuICAgIHZpZXdzQ291bnQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpbmRleCBvZiB0aGUgYWN0aXZlIHNsaWRlLlxuICAgICAqL1xuICAgIHZpZXdDdXJyZW50SW5kZXggPSAwO1xuXG4gICAgLyoqXG4gICAgICogRG90IGVsZW1lbnQgc2VsZWN0b3IuXG4gICAgICovXG4gICAgcmVhZG9ubHkgZG90U2VsZWN0b3I6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIERvdCBlbGVtZW50IFwiaXMgY3VycmVudFwiIG1vZGlmaWVyLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRvdEN1cnJlbnRNb2RpZmllcjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBmdWxsU2xpZGVyV2lkdGggPSAxMDA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmRvdFNlbGVjdG9yID0gYCR7dGhpcy5qc05hbWV9X19kb3RgO1xuICAgICAgICB0aGlzLmRvdEN1cnJlbnRNb2RpZmllciA9IGAke3RoaXMubmFtZX1fX2RvdC0tY3VycmVudGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2xpZGVzQ291bnQgPSB0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zbGlkZWApLmxlbmd0aDtcblxuICAgICAgICBpZiAodGhpcy5zbGlkZXNDb3VudCA8PSAxKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJQcmV2ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3ByZXZgKVswXTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTmV4dCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19uZXh0YClbMF07XG4gICAgICAgIHRoaXMuc2xpZGVyID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NsaWRlcmApWzBdO1xuICAgICAgICB0aGlzLnNsaWRlV2lkdGggPSB0aGlzLmZ1bGxTbGlkZXJXaWR0aCAvIHRoaXMuc2xpZGVzVG9TaG93O1xuICAgICAgICB0aGlzLmRvdHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmRvdFNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMudmlld3NDb3VudCA9IHRoaXMuZ2V0Vmlld3NDb3VudCgpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIHNsaWRlcy5cbiAgICAgKi9cbiAgICBnZXRWaWV3c0NvdW50KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKHRoaXMuc2xpZGVzQ291bnQgLSB0aGlzLnNsaWRlc1RvU2hvdykgLyB0aGlzLnNsaWRlc1RvU2Nyb2xsKSArIDE7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25QcmV2Q2xpY2soZXZlbnQpKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25OZXh0Q2xpY2soZXZlbnQpKTtcbiAgICAgICAgdGhpcy5kb3RzLmZvckVhY2goKGRvdDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25Eb3RDbGljayhldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25QcmV2Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubG9hZFByZXZWaWV3SW5kZXgoKTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25OZXh0Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMubG9hZE5leHRWaWV3SW5kZXgoKTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Eb3RDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sb2FkVmlld0luZGV4RnJvbURvdCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgdGhpcy5zbGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnREb3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTd2l0Y2hlcyB0aGUgY3VycmVudCBzbGlkZSB0byB0aGUgcHJldmlvdXMgb25lLlxuICAgICAqL1xuICAgIGxvYWRQcmV2Vmlld0luZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdDdXJyZW50SW5kZXggLSAxO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdzQ291bnQgLSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgdGhlIGN1cnJlbnQgc2xpZGUgdG8gdGhlIG5leHQgb25lLlxuICAgICAqL1xuICAgIGxvYWROZXh0Vmlld0luZGV4KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSB0aGlzLnZpZXdDdXJyZW50SW5kZXggKyAxO1xuXG4gICAgICAgIGlmICh0aGlzLnZpZXdDdXJyZW50SW5kZXggPj0gdGhpcy52aWV3c0NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLnZpZXdDdXJyZW50SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3dpdGNoZXMgdG8gdGhlIHNsaWRlIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBkb3QgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZG90IEhUTUxFbGVtZW50IGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5ldyB0YXJnZXQgc2xpZGUgdGhhdCBoYXMgdG8gYmUgbG9hZGVkLlxuICAgICAqL1xuICAgIGxvYWRWaWV3SW5kZXhGcm9tRG90KGRvdDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoZG90KTtcblxuICAgICAgICBpZiAodGhpcy52aWV3Q3VycmVudEluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy52aWV3Q3VycmVudEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHNsaWRpbmcgb2Ygc2xpZGVyIGl0ZW1zLlxuICAgICAqL1xuICAgIHNsaWRlKCk6IHZvaWQge1xuICAgICAgICBsZXQgc2xpZGVzVG9TbGlkZSA9IHRoaXMuc2xpZGVzVG9TY3JvbGwgKiB0aGlzLnZpZXdDdXJyZW50SW5kZXg7XG5cbiAgICAgICAgaWYgKHRoaXMuc2xpZGVzVG9TY3JvbGwgKyBzbGlkZXNUb1NsaWRlID4gdGhpcy5zbGlkZXNDb3VudCkge1xuICAgICAgICAgICAgc2xpZGVzVG9TbGlkZSA9IHNsaWRlc1RvU2xpZGUgLSAodGhpcy5zbGlkZXNDb3VudCAtIHNsaWRlc1RvU2xpZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gLShzbGlkZXNUb1NsaWRlICogdGhpcy5zbGlkZVdpZHRoKTtcbiAgICAgICAgdGhpcy5zbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9JSlgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGFjdGl2ZSBjbGFzcyBhbmQgdGhlIG1vZGlmaWVyIG9uIHRoZSBjdXJyZW50IGRvdC5cbiAgICAgKi9cbiAgICB1cGRhdGVDdXJyZW50RG90KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kb3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmRvdFNlbGVjdG9yfS4ke3RoaXMuZG90Q3VycmVudE1vZGlmaWVyfWApLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5kb3RDdXJyZW50TW9kaWZpZXIpO1xuXG4gICAgICAgIHRoaXMuZG90c1t0aGlzLnZpZXdDdXJyZW50SW5kZXhdLmNsYXNzTGlzdC5hZGQodGhpcy5kb3RDdXJyZW50TW9kaWZpZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIG51bWJlciBvZiBzbGlkZXMgdG8gYmUgc2hvd24uXG4gICAgICovXG4gICAgZ2V0IHNsaWRlc1RvU2hvdygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3NsaWRlcy10by1zaG93JykgfHwgJzAnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBudW1iZXIgb2Ygc2xpZGVzIHRvIGJlIHNjcm9sbGVkIGJ5IGFuIGludGVyYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBzbGlkZXNUb1Njcm9sbCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ3NsaWRlcy10by1zY3JvbGwnKSB8fCAnMCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJTaW1wbGVDYXJvdXNlbCIsImNvbnN0cnVjdG9yIiwidHJpZ2dlclByZXYiLCJ0cmlnZ2VyTmV4dCIsInNsaWRlciIsInNsaWRlc0NvdW50Iiwic2xpZGVXaWR0aCIsImRvdHMiLCJ2aWV3c0NvdW50Iiwidmlld0N1cnJlbnRJbmRleCIsImRvdFNlbGVjdG9yIiwiZG90Q3VycmVudE1vZGlmaWVyIiwiZnVsbFNsaWRlcldpZHRoIiwianNOYW1lIiwibmFtZSIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImxlbmd0aCIsInNsaWRlc1RvU2hvdyIsIkFycmF5IiwiZnJvbSIsImdldFZpZXdzQ291bnQiLCJtYXBFdmVudHMiLCJNYXRoIiwiY2VpbCIsInNsaWRlc1RvU2Nyb2xsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25QcmV2Q2xpY2siLCJvbk5leHRDbGljayIsImZvckVhY2giLCJkb3QiLCJvbkRvdENsaWNrIiwicHJldmVudERlZmF1bHQiLCJsb2FkUHJldlZpZXdJbmRleCIsInNsaWRlIiwidXBkYXRlQ3VycmVudERvdCIsImxvYWROZXh0Vmlld0luZGV4IiwibG9hZFZpZXdJbmRleEZyb21Eb3QiLCJ0YXJnZXQiLCJpbmRleE9mIiwic2xpZGVzVG9TbGlkZSIsIm9mZnNldCIsInN0eWxlIiwidHJhbnNmb3JtIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInBhcnNlSW50IiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==