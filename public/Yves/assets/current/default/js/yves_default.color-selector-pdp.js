"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["color-selector-pdp"],{

/***/ "./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector-pdp/color-selector-pdp.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector-pdp/color-selector-pdp.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorSelectorPdp)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class ColorSelectorPdp extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.container = void 0;
    this.colors = void 0;
    this.image = void 0;
  }
  readyCallback() {}
  init() {
    this.colors = Array.from(this.getElementsByClassName(this.jsName + "__color"));
    this.container = document.getElementsByClassName(this.jsName + "__image-container")[0];
    this.image = this.container.getElementsByTagName('img')[0];
    this.mapEvents();
  }
  mapEvents() {
    this.colors.forEach((color, index) => {
      if (index !== 0) {
        color.addEventListener('mouseenter', event => this.onColorSelection(event));
        color.addEventListener('mouseout', event => this.onColorUnselection(event));
      }
    });
  }
  onColorSelection(event) {
    event.preventDefault();
    var color = event.currentTarget;
    var imageSrc = color.getAttribute('data-image-src');
    this.changeActiveColor(color);
    this.setActiveImage(imageSrc);
  }
  onColorUnselection(event) {
    event.preventDefault();
    this.changeActiveColor(this.colors[0]);
    this.resetActiveImage();
  }
  changeActiveColor(newColor) {
    this.colors.forEach(color => {
      color.classList.remove(this.name + "__color--active");
    });
    newColor.classList.add(this.name + "__color--active");
  }
  setActiveImage(newImageSrc) {
    if (this.image.src === newImageSrc) {
      return;
    }
    this.image.src = newImageSrc;
    this.container.classList.add(this.container.classList[0] + "--active");
  }
  resetActiveImage() {
    this.container.classList.remove(this.container.classList[0] + "--active");
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUM7RUFDMUU7RUFFQUYsZ0JBQWdCQSxDQUFBLEVBQVM7SUFDckIsSUFBSSxDQUFDekIsU0FBUyxDQUFDMkIsU0FBUyxDQUFDQyxNQUFNLENBQUksSUFBSSxDQUFDNUIsU0FBUyxDQUFDMkIsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFVLENBQUM7RUFDN0U7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9Qcm9kdWN0R3JvdXBXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jb2xvci1zZWxlY3Rvci1wZHAvY29sb3Itc2VsZWN0b3ItcGRwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclNlbGVjdG9yUGRwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgY29sb3JzOiBIVE1MQW5jaG9yRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBpbWFnZTogSFRNTEltYWdlRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbG9ycyA9IDxIVE1MQW5jaG9yRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fY29sb3JgKSk7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gPEhUTUxJbWFnZUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2ltYWdlLWNvbnRhaW5lcmApWzBdO1xuICAgICAgICB0aGlzLmltYWdlID0gPEhUTUxJbWFnZUVsZW1lbnQ+dGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb2xvcnMuZm9yRWFjaCgoY29sb3I6IEhUTUxBbmNob3JFbGVtZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb2xvci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkNvbG9yU2VsZWN0aW9uKGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgY29sb3IuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uQ29sb3JVbnNlbGVjdGlvbihldmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Db2xvclNlbGVjdGlvbihldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgY29sb3IgPSA8SFRNTEFuY2hvckVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgaW1hZ2VTcmMgPSBjb2xvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW1hZ2Utc3JjJyk7XG4gICAgICAgIHRoaXMuY2hhbmdlQWN0aXZlQ29sb3IoY29sb3IpO1xuICAgICAgICB0aGlzLnNldEFjdGl2ZUltYWdlKGltYWdlU3JjKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Db2xvclVuc2VsZWN0aW9uKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNoYW5nZUFjdGl2ZUNvbG9yKHRoaXMuY29sb3JzWzBdKTtcbiAgICAgICAgdGhpcy5yZXNldEFjdGl2ZUltYWdlKCk7XG4gICAgfVxuXG4gICAgY2hhbmdlQWN0aXZlQ29sb3IobmV3Q29sb3I6IEhUTUxBbmNob3JFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sb3JzLmZvckVhY2goKGNvbG9yOiBIVE1MQW5jaG9yRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29sb3IuY2xhc3NMaXN0LnJlbW92ZShgJHt0aGlzLm5hbWV9X19jb2xvci0tYWN0aXZlYCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG5ld0NvbG9yLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5uYW1lfV9fY29sb3ItLWFjdGl2ZWApO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZUltYWdlKG5ld0ltYWdlU3JjOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaW1hZ2Uuc3JjID09PSBuZXdJbWFnZVNyYykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBuZXdJbWFnZVNyYztcbiAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3RbMF19LS1hY3RpdmVgKTtcbiAgICB9XG5cbiAgICByZXNldEFjdGl2ZUltYWdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuY29udGFpbmVyLmNsYXNzTGlzdFswXX0tLWFjdGl2ZWApO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJDb2xvclNlbGVjdG9yUGRwIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJjb250YWluZXIiLCJjb2xvcnMiLCJpbWFnZSIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwiY29sb3IiLCJpbmRleCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uQ29sb3JTZWxlY3Rpb24iLCJvbkNvbG9yVW5zZWxlY3Rpb24iLCJwcmV2ZW50RGVmYXVsdCIsImN1cnJlbnRUYXJnZXQiLCJpbWFnZVNyYyIsImdldEF0dHJpYnV0ZSIsImNoYW5nZUFjdGl2ZUNvbG9yIiwic2V0QWN0aXZlSW1hZ2UiLCJyZXNldEFjdGl2ZUltYWdlIiwibmV3Q29sb3IiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJuYW1lIiwiYWRkIiwibmV3SW1hZ2VTcmMiLCJzcmMiXSwic291cmNlUm9vdCI6IiJ9