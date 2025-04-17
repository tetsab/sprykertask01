"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["script-loader"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScriptLoader)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _app_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/logger */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/logger.ts");


var EVENT_SCRIPT_LOAD = 'scriptload';
var defaultIgnoredAttributes = ['class', 'data-qa'];

/**
 * @event scriptload An event which is triggered when a script is loaded.
 */
class ScriptLoader extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.head = void 0;
    this.script = void 0;
  }
  /**
   * The <head> tag on the page.
   */
  /**
   * The <script> tag o the page.
   */
  readyCallback() {
    this.script = document.querySelector("script[src=\"" + this.src + "\"]");
    if (!!this.script) {
      this.mapEvents();
      (0,_app_logger__WEBPACK_IMPORTED_MODULE_1__.debug)(this.name + ": \"" + this.src + "\" is already in the DOM");
      return;
    }
    this.head = document.getElementsByTagName('head')[0];
    this.script = document.createElement('script');
    this.mapEvents();
    this.setScriptAttributes();
    this.appendScriptTag();
  }
  mapEvents() {
    this.script.addEventListener('load', () => this.onScriptLoad(), {
      once: true
    });
  }
  onScriptLoad() {
    this.dispatchCustomEvent(EVENT_SCRIPT_LOAD);
  }
  setScriptAttributes() {
    Array.prototype.forEach.call(this.attributes, attribute => {
      if (!this.isAttributeIgnored(attribute.name)) {
        this.script.setAttribute(attribute.name, attribute.value);
      }
    });
  }
  appendScriptTag() {
    this.head.appendChild(this.script);
    (0,_app_logger__WEBPACK_IMPORTED_MODULE_1__.debug)(this.name + ": \"" + this.src + "\" added to the DOM");
  }
  isAttributeIgnored(attributeName) {
    return this.ignoredAttributes.indexOf(attributeName) !== -1;
  }

  /**
   * Gets the array of ignored attributes that are not copied from the current component
   * to the script tag when created.
   */
  get ignoredAttributes() {
    return [...defaultIgnoredAttributes];
  }

  /**
   * Gets if the script already exists in DOM.
   */
  get isScriptAlreadyInDOM() {
    return !!document.querySelector("script[src=\"" + this.src + "\"]");
  }

  /**
   * Gets the url endpoint used to load the script.
   */
  get src() {
    return this.getAttribute('src');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtFQUNJLElBQUlBLEdBQUdBLENBQUEsRUFBVztJQUNkLE9BQU8sSUFBSSxDQUFDeUIsWUFBWSxDQUFDLEtBQUssQ0FBQztFQUNuQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NjcmlwdC1sb2FkZXIvc2NyaXB0LWxvYWRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IHsgZGVidWcgfSBmcm9tICcuLi8uLi8uLi9hcHAvbG9nZ2VyJztcblxuY29uc3QgRVZFTlRfU0NSSVBUX0xPQUQgPSAnc2NyaXB0bG9hZCc7XG5jb25zdCBkZWZhdWx0SWdub3JlZEF0dHJpYnV0ZXMgPSBbJ2NsYXNzJywgJ2RhdGEtcWEnXTtcblxuLyoqXG4gKiBAZXZlbnQgc2NyaXB0bG9hZCBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiBhIHNjcmlwdCBpcyBsb2FkZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcmlwdExvYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIDxoZWFkPiB0YWcgb24gdGhlIHBhZ2UuXG4gICAgICovXG4gICAgaGVhZDogSFRNTEhlYWRFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogVGhlIDxzY3JpcHQ+IHRhZyBvIHRoZSBwYWdlLlxuICAgICAqL1xuICAgIHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7dGhpcy5zcmN9XCJdYCk7XG5cbiAgICAgICAgaWYgKCEhdGhpcy5zY3JpcHQpIHtcbiAgICAgICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgICAgICBkZWJ1ZyhgJHt0aGlzLm5hbWV9OiBcIiR7dGhpcy5zcmN9XCIgaXMgYWxyZWFkeSBpbiB0aGUgRE9NYCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVhZCA9IDxIVE1MSGVhZEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICAgICAgdGhpcy5zY3JpcHQgPSA8SFRNTFNjcmlwdEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgdGhpcy5zZXRTY3JpcHRBdHRyaWJ1dGVzKCk7XG4gICAgICAgIHRoaXMuYXBwZW5kU2NyaXB0VGFnKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMub25TY3JpcHRMb2FkKCksIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TY3JpcHRMb2FkKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfU0NSSVBUX0xPQUQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRTY3JpcHRBdHRyaWJ1dGVzKCk6IHZvaWQge1xuICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMuYXR0cmlidXRlcywgKGF0dHJpYnV0ZTogQXR0cikgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzQXR0cmlidXRlSWdub3JlZChhdHRyaWJ1dGUubmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUsIGF0dHJpYnV0ZS52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhcHBlbmRTY3JpcHRUYWcoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGVhZC5hcHBlbmRDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgICAgIGRlYnVnKGAke3RoaXMubmFtZX06IFwiJHt0aGlzLnNyY31cIiBhZGRlZCB0byB0aGUgRE9NYCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzQXR0cmlidXRlSWdub3JlZChhdHRyaWJ1dGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWdub3JlZEF0dHJpYnV0ZXMuaW5kZXhPZihhdHRyaWJ1dGVOYW1lKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgYXJyYXkgb2YgaWdub3JlZCBhdHRyaWJ1dGVzIHRoYXQgYXJlIG5vdCBjb3BpZWQgZnJvbSB0aGUgY3VycmVudCBjb21wb25lbnRcbiAgICAgKiB0byB0aGUgc2NyaXB0IHRhZyB3aGVuIGNyZWF0ZWQuXG4gICAgICovXG4gICAgZ2V0IGlnbm9yZWRBdHRyaWJ1dGVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIFsuLi5kZWZhdWx0SWdub3JlZEF0dHJpYnV0ZXNdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIHNjcmlwdCBhbHJlYWR5IGV4aXN0cyBpbiBET00uXG4gICAgICovXG4gICAgZ2V0IGlzU2NyaXB0QWxyZWFkeUluRE9NKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjPVwiJHt0aGlzLnNyY31cIl1gKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB1cmwgZW5kcG9pbnQgdXNlZCB0byBsb2FkIHRoZSBzY3JpcHQuXG4gICAgICovXG4gICAgZ2V0IHNyYygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJkZWJ1ZyIsIkVWRU5UX1NDUklQVF9MT0FEIiwiZGVmYXVsdElnbm9yZWRBdHRyaWJ1dGVzIiwiU2NyaXB0TG9hZGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJoZWFkIiwic2NyaXB0IiwicmVhZHlDYWxsYmFjayIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNyYyIsIm1hcEV2ZW50cyIsIm5hbWUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRTY3JpcHRBdHRyaWJ1dGVzIiwiYXBwZW5kU2NyaXB0VGFnIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU2NyaXB0TG9hZCIsIm9uY2UiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsImF0dHJpYnV0ZXMiLCJhdHRyaWJ1dGUiLCJpc0F0dHJpYnV0ZUlnbm9yZWQiLCJzZXRBdHRyaWJ1dGUiLCJ2YWx1ZSIsImFwcGVuZENoaWxkIiwiYXR0cmlidXRlTmFtZSIsImlnbm9yZWRBdHRyaWJ1dGVzIiwiaW5kZXhPZiIsImlzU2NyaXB0QWxyZWFkeUluRE9NIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==