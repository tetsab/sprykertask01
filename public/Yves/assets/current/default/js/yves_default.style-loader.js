"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["style-loader"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/style-loader/style-loader.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/style-loader/style-loader.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StyleLoader)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/app/logger */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/logger.ts");


class StyleLoader extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  readyCallback() {}
  init() {
    this.mapEvents();
  }
  mapEvents() {
    this.mapLoadEvent();
  }
  mapLoadEvent() {
    window.addEventListener('load', () => this.addCss());
  }
  addCss() {
    var linkTemplate = "<link rel=\"stylesheet\" href=\"" + this.pathToCSS + "\">";
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', linkTemplate);
    (0,ShopUi_app_logger__WEBPACK_IMPORTED_MODULE_1__.debug)("Style file " + this.pathToCSS + " has been loaded");
  }
  get pathToCSS() {
    return this.getAttribute('path-to-css');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuc3R5bGUtbG9hZGVyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFnRDtBQUNOO0FBRTNCLE1BQU1FLFdBQVcsU0FBU0YsK0RBQVMsQ0FBQztFQUNyQ0csYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCO0VBRVVBLFNBQVNBLENBQUEsRUFBUztJQUN4QixJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDO0VBQ3ZCO0VBRVVBLFlBQVlBLENBQUEsRUFBUztJQUMzQkMsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUNDLE1BQU0sQ0FBQyxDQUFDLENBQUM7RUFDeEQ7RUFFVUEsTUFBTUEsQ0FBQSxFQUFTO0lBQ3JCLElBQU1DLFlBQVksd0NBQW1DLElBQUksQ0FBQ0MsU0FBUyxRQUFJO0lBQ3ZFQyxRQUFRLENBQUNDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUVKLFlBQVksQ0FBQztJQUV0RlQsd0RBQUssaUJBQWUsSUFBSSxDQUFDVSxTQUFTLHFCQUFrQixDQUFDO0VBQ3pEO0VBRUEsSUFBY0EsU0FBU0EsQ0FBQSxFQUFXO0lBQzlCLE9BQU8sSUFBSSxDQUFDSSxZQUFZLENBQUMsYUFBYSxDQUFDO0VBQzNDO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc3R5bGUtbG9hZGVyL3N0eWxlLWxvYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IGRlYnVnIH0gZnJvbSAnU2hvcFVpL2FwcC9sb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZUxvYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBMb2FkRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwTG9hZEV2ZW50KCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMuYWRkQ3NzKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRDc3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpbmtUZW1wbGF0ZSA9IGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIiR7dGhpcy5wYXRoVG9DU1N9XCI+YDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGxpbmtUZW1wbGF0ZSk7XG5cbiAgICAgICAgZGVidWcoYFN0eWxlIGZpbGUgJHt0aGlzLnBhdGhUb0NTU30gaGFzIGJlZW4gbG9hZGVkYCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwYXRoVG9DU1MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwYXRoLXRvLWNzcycpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJkZWJ1ZyIsIlN0eWxlTG9hZGVyIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJtYXBFdmVudHMiLCJtYXBMb2FkRXZlbnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiYWRkQ3NzIiwibGlua1RlbXBsYXRlIiwicGF0aFRvQ1NTIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluc2VydEFkamFjZW50SFRNTCIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=