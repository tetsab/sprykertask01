"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["page-load-state"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/page-load-state/page-load-state.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/page-load-state/page-load-state.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PageLoadState)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");



class PageLoadState extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);
    this.body = void 0;
  }
  readyCallback() {}
  init() {
    var _this = this;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.body = document.body;
      yield (0,ShopUi_app__WEBPACK_IMPORTED_MODULE_2__.mount)();
      _this.onLoad();
    })();
  }
  onLoad() {
    this.body.classList.remove(this.loadingClassName);
  }
  get loadingClassName() {
    return this.getAttribute('body-loading-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucGFnZS1sb2FkLXN0YXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBQ2I7QUFFcEIsTUFBTUUsYUFBYSxTQUFTRiwrREFBUyxDQUFDO0VBQUFHLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDdkNDLElBQUk7RUFBQTtFQUNKQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUVqQkMsSUFBSUEsQ0FBQSxFQUFrQjtJQUFBLElBQUFDLEtBQUE7SUFBQSxPQUFBQyxtRkFBQTtNQUNsQ0QsS0FBSSxDQUFDSCxJQUFJLEdBQW9CSyxRQUFRLENBQUNMLElBQUk7TUFFMUMsTUFBTUosaURBQUssQ0FBQyxDQUFDO01BQ2JPLEtBQUksQ0FBQ0csTUFBTSxDQUFDLENBQUM7SUFBQztFQUNsQjtFQUVVQSxNQUFNQSxDQUFBLEVBQVM7SUFDckIsSUFBSSxDQUFDTixJQUFJLENBQUNPLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUM7RUFDckQ7RUFFQSxJQUFjQSxnQkFBZ0JBLENBQUEsRUFBVztJQUNyQyxPQUFPLElBQUksQ0FBQ0MsWUFBWSxDQUFDLHlCQUF5QixDQUFDO0VBQ3ZEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFnZS1sb2FkLXN0YXRlL3BhZ2UtbG9hZC1zdGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnU2hvcFVpL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VMb2FkU3RhdGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBib2R5OiBIVE1MQm9keUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuYm9keSA9IDxIVE1MQm9keUVsZW1lbnQ+ZG9jdW1lbnQuYm9keTtcblxuICAgICAgICBhd2FpdCBtb3VudCgpO1xuICAgICAgICB0aGlzLm9uTG9hZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkxvYWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMubG9hZGluZ0NsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBsb2FkaW5nQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYm9keS1sb2FkaW5nLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwibW91bnQiLCJQYWdlTG9hZFN0YXRlIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJib2R5IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJfdGhpcyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZG9jdW1lbnQiLCJvbkxvYWQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJsb2FkaW5nQ2xhc3NOYW1lIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==