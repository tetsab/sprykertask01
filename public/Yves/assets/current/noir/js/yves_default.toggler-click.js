"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["toggler-click"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-click/toggler-click.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-click/toggler-click.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerClick)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class TogglerClick extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
    this.triggersList = void 0;
    this.targets = void 0;
    this.targetsList = void 0;
  }
  /**
   * Elements triggering the toggle action.
   *
   * @deprecated Use triggersList instead.
   */
  /**
   * Elements targeted by the toggle action.
   *
   * @deprecated Use targetsList instead.
   */
  readyCallback() {}
  init() {
    this.triggersList = Array.from(this.triggerClassName ? document.getElementsByClassName(this.triggerClassName) :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelectorAll(this.triggerSelector));
    this.targetsList = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelectorAll(this.targetSelector));
    // eslint-disable-next-line deprecation/deprecation
    [this.triggers, this.targets] = [this.triggersList, this.targetsList];
    this.mapEvents();
  }
  mapEvents() {
    this.triggersList.forEach(trigger => {
      trigger.addEventListener('click', event => this.onTriggerClick(event));
    });
  }
  onTriggerClick(event) {
    event.preventDefault();
    this.toggle();
  }

  /**
   * Toggles the class names in the target elements.
   */
  toggle() {
    this.targetsList.forEach(target => {
      var addClass = !target.classList.contains(this.classToToggle);
      target.classList.toggle(this.classToToggle, addClass);
    });
  }

  /**
   * Gets a querySelector of the trigger element.
   *
   * @deprecated Use triggerClassName() instead.
   */
  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
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
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3RvZ2dsZXItY2xpY2svdG9nZ2xlci1jbGljay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVyQ2xpY2sgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEVsZW1lbnRzIHRyaWdnZXJpbmcgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdHJpZ2dlcnNMaXN0IGluc3RlYWQuXG4gICAgICovXG4gICAgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzTGlzdDogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnRzIHRhcmdldGVkIGJ5IHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldHNMaXN0IGluc3RlYWQuXG4gICAgICovXG4gICAgdGFyZ2V0czogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0c0xpc3Q6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vyc0xpc3QgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQ2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlckNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRyaWdnZXJTZWxlY3RvciksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGFyZ2V0c0xpc3QgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy50YXJnZXRDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50YXJnZXRTZWxlY3RvciksXG4gICAgICAgICk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICBbdGhpcy50cmlnZ2VycywgdGhpcy50YXJnZXRzXSA9IFt0aGlzLnRyaWdnZXJzTGlzdCwgdGhpcy50YXJnZXRzTGlzdF07XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzTGlzdC5mb3JFYWNoKCh0cmlnZ2VyOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyQ2xpY2soZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnRvZ2dsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsYXNzIG5hbWVzIGluIHRoZSB0YXJnZXQgZWxlbWVudHMuXG4gICAgICovXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHNMaXN0LmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZENsYXNzID0gIXRhcmdldC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc1RvVG9nZ2xlKTtcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgYWRkQ2xhc3MpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdHJpZ2dlciBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRyaWdnZXJDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0cmlnZ2VyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0YXJnZXRDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0YXJnZXRTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNsYXNzIG5hbWUgZm9yIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBjbGFzc1RvVG9nZ2xlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIlRvZ2dsZXJDbGljayIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwidHJpZ2dlcnMiLCJ0cmlnZ2Vyc0xpc3QiLCJ0YXJnZXRzIiwidGFyZ2V0c0xpc3QiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIkFycmF5IiwiZnJvbSIsInRyaWdnZXJDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwidHJpZ2dlclNlbGVjdG9yIiwidGFyZ2V0Q2xhc3NOYW1lIiwidGFyZ2V0U2VsZWN0b3IiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwidHJpZ2dlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uVHJpZ2dlckNsaWNrIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGUiLCJ0YXJnZXQiLCJhZGRDbGFzcyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NUb1RvZ2dsZSIsImdldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=