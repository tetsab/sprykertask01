"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["toggler-checkbox"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerCheckbox)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");


/**
 * @event toggle An event which is triggered when the trigger element is changed.
 */
class TogglerCheckbox extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Element triggering the toggle action.
   */

  /**
   * Elements targeted by the toggle action.
   */

  constructor() {
    super();
    this.trigger = void 0;
    this.targets = void 0;
    this.event = void 0;
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.targets = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelectorAll(this.targetSelector));
  }
  readyCallback() {}
  init() {
    this.toggle();
    this.fireToggleEvent();
    this.mapEvents();
  }
  mapEvents() {
    this.trigger.addEventListener('change', event => this.onTriggerClick(event));
  }
  onTriggerClick(event) {
    event.preventDefault();
    this.toggle();
    this.fireToggleEvent();
  }

  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value which checks if the trigger is checked.
   */
  toggle(addClass) {
    if (addClass === void 0) {
      addClass = this.addClass;
    }
    this.targets.forEach(element => element.classList.toggle(this.classToToggle, addClass));
  }

  /**
   *  Creates an instance of the custom toggle event and triggers it.
   */
  fireToggleEvent() {
    this.event = new CustomEvent('toggle');
    this.dispatchEvent(this.event);
  }

  /**
   * Gets if the trigger element is checked.
   */
  get addClass() {
    return this.addClassWhenChecked ? this.trigger.checked : !this.trigger.checked;
  }

  /**
   * Gets a querySelector of the target element.
   *
   * @deprecated Use targetClassName() instead.
   */
  get targetSelector() {
    return this.trigger.getAttribute('target-selector');
  }
  get targetClassName() {
    return this.trigger.getAttribute('target-class-name');
  }

  /**
   * Gets a class name for the toggle action.
   */
  get classToToggle() {
    return this.trigger.getAttribute('class-to-toggle');
  }

  /**
   * Gets if the element should add the class when checked.
   */
  get addClassWhenChecked() {
    return this.trigger.hasAttribute('add-class-when-checked');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNKO0FBQ0E7RUFDSSxJQUFJRixtQkFBbUJBLENBQUEsRUFBWTtJQUMvQixPQUFPLElBQUksQ0FBQzFCLE9BQU8sQ0FBQzZCLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQztFQUM5RDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3RvZ2dsZXItY2hlY2tib3gvdG9nZ2xlci1jaGVja2JveC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG4vKipcbiAqIEBldmVudCB0b2dnbGUgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIHRyaWdnZXIgZWxlbWVudCBpcyBjaGFuZ2VkLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVyQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEVsZW1lbnQgdHJpZ2dlcmluZyB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSB0cmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdGFyZ2V0ZWQgYnkgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgdGFyZ2V0czogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgZXZlbnQ6IEN1c3RvbUV2ZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RyaWdnZXJgKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0Q2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMudGFyZ2V0U2VsZWN0b3IpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB0aGlzLmZpcmVUb2dnbGVFdmVudCgpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlckNsaWNrKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgICAgICB0aGlzLmZpcmVUb2dnbGVFdmVudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsYXNzIG5hbWVzIGluIHRoZSB0YXJnZXQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIGFkZENsYXNzIEEgYm9vbGVhbiB2YWx1ZSB3aGljaCBjaGVja3MgaWYgdGhlIHRyaWdnZXIgaXMgY2hlY2tlZC5cbiAgICAgKi9cbiAgICB0b2dnbGUoYWRkQ2xhc3M6IGJvb2xlYW4gPSB0aGlzLmFkZENsYXNzKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gZWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgYWRkQ2xhc3MpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiB0aGUgY3VzdG9tIHRvZ2dsZSBldmVudCBhbmQgdHJpZ2dlcnMgaXQuXG4gICAgICovXG4gICAgZmlyZVRvZ2dsZUV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd0b2dnbGUnKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIHRyaWdnZXIgZWxlbWVudCBpcyBjaGVja2VkLlxuICAgICAqL1xuICAgIGdldCBhZGRDbGFzcygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkQ2xhc3NXaGVuQ2hlY2tlZCA/IHRoaXMudHJpZ2dlci5jaGVja2VkIDogIXRoaXMudHJpZ2dlci5jaGVja2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0YXJnZXRDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0YXJnZXRTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBjbGFzcyBuYW1lIGZvciB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgY2xhc3NUb1RvZ2dsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgZWxlbWVudCBzaG91bGQgYWRkIHRoZSBjbGFzcyB3aGVuIGNoZWNrZWQuXG4gICAgICovXG4gICAgZ2V0IGFkZENsYXNzV2hlbkNoZWNrZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyaWdnZXIuaGFzQXR0cmlidXRlKCdhZGQtY2xhc3Mtd2hlbi1jaGVja2VkJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIlRvZ2dsZXJDaGVja2JveCIsImNvbnN0cnVjdG9yIiwidHJpZ2dlciIsInRhcmdldHMiLCJldmVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJBcnJheSIsImZyb20iLCJ0YXJnZXRDbGFzc05hbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YXJnZXRTZWxlY3RvciIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidG9nZ2xlIiwiZmlyZVRvZ2dsZUV2ZW50IiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVHJpZ2dlckNsaWNrIiwicHJldmVudERlZmF1bHQiLCJhZGRDbGFzcyIsImZvckVhY2giLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwiY2xhc3NUb1RvZ2dsZSIsIkN1c3RvbUV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsImFkZENsYXNzV2hlbkNoZWNrZWQiLCJjaGVja2VkIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==