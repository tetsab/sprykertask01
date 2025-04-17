"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["toggler-hash"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerHash)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class TogglerHash extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Elements targeted by the toggle action.
   */

  constructor() {
    super();
    this.targets = void 0;
    this.targets = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelectorAll(this.targetSelector));
  }
  readyCallback() {
    this.checkHash();
    this.mapEvents();
  }
  mapEvents() {
    window.addEventListener('hashchange', () => this.onHashChange());
  }
  onHashChange() {
    this.checkHash();
  }

  /**
   * Checks the hash and triggers the flexible toggle action.
   */
  checkHash() {
    if (this.triggerHash === this.hash) {
      this.toggle(this.addClassWhenHashInUrl);
      return;
    }
    this.toggle(!this.addClassWhenHashInUrl);
  }

  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value for a more flexible toggling action.
   */
  toggle(addClass) {
    this.targets.forEach(target => target.classList.toggle(this.classToToggle, addClass));
  }

  /**
   * Gets the current page url.
   */
  get hash() {
    return window.location.hash;
  }

  /**
   * Gets the trigger hash.
   */
  get triggerHash() {
    return this.getAttribute('trigger-hash');
  }

  /**
   * Gets a querySelector of the target element.
   *
   * @deprecated Use targetClassName() instead.
   */
  get targetSelector() {
    return this.getAttribute('target-selector');
  }
  get targetClassName() {
    return this.getAttribute('target-class-name');
  }

  /**
   * Gets a class name for the toggle action.
   */
  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }

  /**
   * Gets if the element should add the class when in blur.
   */
  get addClassWhenHashInUrl() {
    return this.hasAttribute('add-class-when-hash-in-url');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQudG9nZ2xlci1oYXNoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQWtEO0FBRW5DLE1BQU1DLFdBQVcsU0FBU0QseURBQVMsQ0FBQztFQUMvQztBQUNKO0FBQ0E7O0VBR0lFLFdBQVdBLENBQUEsRUFBRztJQUNWLEtBQUssQ0FBQyxDQUFDO0lBQUMsS0FISEMsT0FBTztJQUlaLElBQUksQ0FBQ0EsT0FBTyxHQUFrQkMsS0FBSyxDQUFDQyxJQUFJLENBQ3BDLElBQUksQ0FBQ0MsZUFBZSxHQUNkQyxRQUFRLENBQUNDLHNCQUFzQixDQUFDLElBQUksQ0FBQ0YsZUFBZSxDQUFDO0lBQ3JEO0lBQ0FDLFFBQVEsQ0FBQ0UsZ0JBQWdCLENBQUMsSUFBSSxDQUFDQyxjQUFjLENBQ3ZELENBQUM7RUFDTDtFQUVVQyxhQUFhQSxDQUFBLEVBQVM7SUFDNUIsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0VBQ3BCO0VBRVVBLFNBQVNBLENBQUEsRUFBUztJQUN4QkMsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsTUFBTSxJQUFJLENBQUNDLFlBQVksQ0FBQyxDQUFDLENBQUM7RUFDcEU7RUFFVUEsWUFBWUEsQ0FBQSxFQUFTO0lBQzNCLElBQUksQ0FBQ0osU0FBUyxDQUFDLENBQUM7RUFDcEI7O0VBRUE7QUFDSjtBQUNBO0VBQ0lBLFNBQVNBLENBQUEsRUFBUztJQUNkLElBQUksSUFBSSxDQUFDSyxXQUFXLEtBQUssSUFBSSxDQUFDQyxJQUFJLEVBQUU7TUFDaEMsSUFBSSxDQUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQztNQUV2QztJQUNKO0lBRUEsSUFBSSxDQUFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUNDLHFCQUFxQixDQUFDO0VBQzVDOztFQUVBO0FBQ0o7QUFDQTtBQUNBO0VBQ0lELE1BQU1BLENBQUNFLFFBQWlCLEVBQVE7SUFDNUIsSUFBSSxDQUFDbEIsT0FBTyxDQUFDbUIsT0FBTyxDQUFFQyxNQUFtQixJQUFLQSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQ00sYUFBYSxFQUFFSixRQUFRLENBQUMsQ0FBQztFQUN4Rzs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJSCxJQUFJQSxDQUFBLEVBQVc7SUFDZixPQUFPSixNQUFNLENBQUNZLFFBQVEsQ0FBQ1IsSUFBSTtFQUMvQjs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJRCxXQUFXQSxDQUFBLEVBQVc7SUFDdEIsT0FBTyxJQUFJLENBQUNVLFlBQVksQ0FBQyxjQUFjLENBQUM7RUFDNUM7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJLElBQUlqQixjQUFjQSxDQUFBLEVBQVc7SUFDekIsT0FBTyxJQUFJLENBQUNpQixZQUFZLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7RUFDQSxJQUFjckIsZUFBZUEsQ0FBQSxFQUFXO0lBQ3BDLE9BQU8sSUFBSSxDQUFDcUIsWUFBWSxDQUFDLG1CQUFtQixDQUFDO0VBQ2pEOztFQUVBO0FBQ0o7QUFDQTtFQUNJLElBQUlGLGFBQWFBLENBQUEsRUFBVztJQUN4QixPQUFPLElBQUksQ0FBQ0UsWUFBWSxDQUFDLGlCQUFpQixDQUFDO0VBQy9DOztFQUVBO0FBQ0o7QUFDQTtFQUNJLElBQUlQLHFCQUFxQkEsQ0FBQSxFQUFZO0lBQ2pDLE9BQU8sSUFBSSxDQUFDUSxZQUFZLENBQUMsNEJBQTRCLENBQUM7RUFDMUQ7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy90b2dnbGVyLWhhc2gvdG9nZ2xlci1oYXNoLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZXJIYXNoIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50cyB0YXJnZXRlZCBieSB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudGFyZ2V0cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oXG4gICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja0hhc2goKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsICgpID0+IHRoaXMub25IYXNoQ2hhbmdlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkhhc2hDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tIYXNoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHRoZSBoYXNoIGFuZCB0cmlnZ2VycyB0aGUgZmxleGlibGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjaGVja0hhc2goKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJIYXNoID09PSB0aGlzLmhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKHRoaXMuYWRkQ2xhc3NXaGVuSGFzaEluVXJsKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGUoIXRoaXMuYWRkQ2xhc3NXaGVuSGFzaEluVXJsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbGFzcyBuYW1lcyBpbiB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBhZGRDbGFzcyBBIGJvb2xlYW4gdmFsdWUgZm9yIGEgbW9yZSBmbGV4aWJsZSB0b2dnbGluZyBhY3Rpb24uXG4gICAgICovXG4gICAgdG9nZ2xlKGFkZENsYXNzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKCh0YXJnZXQ6IEhUTUxFbGVtZW50KSA9PiB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzVG9Ub2dnbGUsIGFkZENsYXNzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3VycmVudCBwYWdlIHVybC5cbiAgICAgKi9cbiAgICBnZXQgaGFzaCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdHJpZ2dlciBoYXNoLlxuICAgICAqL1xuICAgIGdldCB0cmlnZ2VySGFzaCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItaGFzaCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0YXJnZXRDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0YXJnZXRTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNsYXNzIG5hbWUgZm9yIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBjbGFzc1RvVG9nZ2xlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgZWxlbWVudCBzaG91bGQgYWRkIHRoZSBjbGFzcyB3aGVuIGluIGJsdXIuXG4gICAgICovXG4gICAgZ2V0IGFkZENsYXNzV2hlbkhhc2hJblVybCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdhZGQtY2xhc3Mtd2hlbi1oYXNoLWluLXVybCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJUb2dnbGVySGFzaCIsImNvbnN0cnVjdG9yIiwidGFyZ2V0cyIsIkFycmF5IiwiZnJvbSIsInRhcmdldENsYXNzTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YXJnZXRTZWxlY3RvciIsInJlYWR5Q2FsbGJhY2siLCJjaGVja0hhc2giLCJtYXBFdmVudHMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwib25IYXNoQ2hhbmdlIiwidHJpZ2dlckhhc2giLCJoYXNoIiwidG9nZ2xlIiwiYWRkQ2xhc3NXaGVuSGFzaEluVXJsIiwiYWRkQ2xhc3MiLCJmb3JFYWNoIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY2xhc3NUb1RvZ2dsZSIsImxvY2F0aW9uIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==