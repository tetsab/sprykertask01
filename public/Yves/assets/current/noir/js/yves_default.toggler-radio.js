"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["toggler-radio"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-radio/toggler-radio-extended.ts":
/*!********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-radio/toggler-radio-extended.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerRadioExtended)
/* harmony export */ });
/* harmony import */ var ShopUi_components_molecules_toggler_radio_toggler_radio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/toggler-radio/toggler-radio */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-radio/toggler-radio.ts");

class TogglerRadioExtended extends ShopUi_components_molecules_toggler_radio_toggler_radio__WEBPACK_IMPORTED_MODULE_0__["default"] {
  toggle(addClass) {
    if (addClass === void 0) {
      addClass = this.addClass;
    }
    this.targets.forEach(element => {
      if (!addClass) {
        element.classList.remove(this.classToToggle);
        return;
      }
      element.classList.add(this.classToToggle);
    });
  }
}

/***/ }),

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

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-radio/toggler-radio.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-radio/toggler-radio.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TogglerRadio)
/* harmony export */ });
/* harmony import */ var _toggler_checkbox_toggler_checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toggler-checkbox/toggler-checkbox */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts");

class TogglerRadio extends _toggler_checkbox_toggler_checkbox__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.togglers = void 0;
  }
  /**
   * Collection of the toggle triggers.
   */
  // eslint-disable-next-line no-use-before-define
  readyCallback() {}
  init() {
    this.togglers = Array.from(document.querySelectorAll(this.name + "[group-name=\"" + this.groupName + "\"]"));
    super.init();
  }
  onTriggerClick(event) {
    event.preventDefault();
    this.toggleAll();
  }

  /**
   * Toggles all the toggler elements.
   */
  toggleAll() {
    this.togglers.forEach(toggler => {
      toggler.toggle(toggler.addClass);
    });
  }

  /**
   * Gets a group name.
   */
  get groupName() {
    return this.getAttribute('group-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1csU0FBUyxDQUFDLENBQUM7RUFDcEI7O0VBRUE7QUFDSjtBQUNBO0VBQ0lBLFNBQVNBLENBQUEsRUFBUztJQUNkLElBQUksQ0FBQ0gsUUFBUSxDQUFDakMsT0FBTyxDQUFFcUMsT0FBcUIsSUFBSztNQUM3Q0EsT0FBTyxDQUFDeEMsTUFBTSxDQUFDd0MsT0FBTyxDQUFDdkMsUUFBUSxDQUFDO0lBQ3BDLENBQUMsQ0FBQztFQUNOOztFQUVBO0FBQ0o7QUFDQTtFQUNJLElBQUlxQyxTQUFTQSxDQUFBLEVBQVc7SUFDcEIsT0FBTyxJQUFJLENBQUNMLFlBQVksQ0FBQyxZQUFZLENBQUM7RUFDMUM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3NyYy9QeXovWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy90b2dnbGVyLXJhZGlvL3RvZ2dsZXItcmFkaW8tZXh0ZW5kZWQudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3RvZ2dsZXItY2hlY2tib3gvdG9nZ2xlci1jaGVja2JveC50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1yYWRpby90b2dnbGVyLXJhZGlvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUb2dnbGVyUmFkaW8gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3RvZ2dsZXItcmFkaW8vdG9nZ2xlci1yYWRpbyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZXJSYWRpb0V4dGVuZGVkIGV4dGVuZHMgVG9nZ2xlclJhZGlvIHtcbiAgICB0b2dnbGUoYWRkQ2xhc3M6IGJvb2xlYW4gPSB0aGlzLmFkZENsYXNzKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFyZ2V0cy5mb3JFYWNoKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFhZGRDbGFzcykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jbGFzc1RvVG9nZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgdG9nZ2xlIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgY2hhbmdlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlckNoZWNrYm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50IHRyaWdnZXJpbmcgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgdHJpZ2dlcjogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEVsZW1lbnRzIHRhcmdldGVkIGJ5IHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHRhcmdldHM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGV2ZW50OiBDdXN0b21FdmVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190cmlnZ2VyYClbMF07XG4gICAgICAgIHRoaXMudGFyZ2V0cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oXG4gICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICA6IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJDbGljayhldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbGFzcyBuYW1lcyBpbiB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBhZGRDbGFzcyBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggY2hlY2tzIGlmIHRoZSB0cmlnZ2VyIGlzIGNoZWNrZWQuXG4gICAgICovXG4gICAgdG9nZ2xlKGFkZENsYXNzOiBib29sZWFuID0gdGhpcy5hZGRDbGFzcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzVG9Ub2dnbGUsIGFkZENsYXNzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGN1c3RvbSB0b2dnbGUgZXZlbnQgYW5kIHRyaWdnZXJzIGl0LlxuICAgICAqL1xuICAgIGZpcmVUb2dnbGVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IG5ldyBDdXN0b21FdmVudCgndG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgY2hlY2tlZC5cbiAgICAgKi9cbiAgICBnZXQgYWRkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENsYXNzV2hlbkNoZWNrZWQgPyB0aGlzLnRyaWdnZXIuY2hlY2tlZCA6ICF0aGlzLnRyaWdnZXIuY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0Q2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGFkZCB0aGUgY2xhc3Mgd2hlbiBjaGVja2VkLlxuICAgICAqL1xuICAgIGdldCBhZGRDbGFzc1doZW5DaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmhhc0F0dHJpYnV0ZSgnYWRkLWNsYXNzLXdoZW4tY2hlY2tlZCcpO1xuICAgIH1cbn1cbiIsImltcG9ydCBUb2dnbGVyQ2hlY2tib3ggZnJvbSAnLi4vdG9nZ2xlci1jaGVja2JveC90b2dnbGVyLWNoZWNrYm94JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9nZ2xlclJhZGlvIGV4dGVuZHMgVG9nZ2xlckNoZWNrYm94IHtcbiAgICAvKipcbiAgICAgKiBDb2xsZWN0aW9uIG9mIHRoZSB0b2dnbGUgdHJpZ2dlcnMuXG4gICAgICovXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgdG9nZ2xlcnM6IFRvZ2dsZXJSYWRpb1tdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudG9nZ2xlcnMgPSA8VG9nZ2xlclJhZGlvW10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAke3RoaXMubmFtZX1bZ3JvdXAtbmFtZT1cIiR7dGhpcy5ncm91cE5hbWV9XCJdYCkpXG4gICAgICAgICk7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudG9nZ2xlQWxsKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlcyBhbGwgdGhlIHRvZ2dsZXIgZWxlbWVudHMuXG4gICAgICovXG4gICAgdG9nZ2xlQWxsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZXJzLmZvckVhY2goKHRvZ2dsZXI6IFRvZ2dsZXJSYWRpbykgPT4ge1xuICAgICAgICAgICAgdG9nZ2xlci50b2dnbGUodG9nZ2xlci5hZGRDbGFzcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBncm91cCBuYW1lLlxuICAgICAqL1xuICAgIGdldCBncm91cE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdncm91cC1uYW1lJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIlRvZ2dsZXJSYWRpbyIsIlRvZ2dsZXJSYWRpb0V4dGVuZGVkIiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJ0YXJnZXRzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJjbGFzc1RvVG9nZ2xlIiwiYWRkIiwiQ29tcG9uZW50IiwiVG9nZ2xlckNoZWNrYm94IiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VyIiwiZXZlbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0Q2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFyZ2V0U2VsZWN0b3IiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImZpcmVUb2dnbGVFdmVudCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblRyaWdnZXJDbGljayIsInByZXZlbnREZWZhdWx0IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiYWRkQ2xhc3NXaGVuQ2hlY2tlZCIsImNoZWNrZWQiLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiLCJhcmd1bWVudHMiLCJ0b2dnbGVycyIsIm5hbWUiLCJncm91cE5hbWUiLCJ0b2dnbGVBbGwiLCJ0b2dnbGVyIl0sInNvdXJjZVJvb3QiOiIifQ==