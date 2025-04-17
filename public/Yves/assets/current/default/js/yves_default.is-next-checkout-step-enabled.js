"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["is-next-checkout-step-enabled"],{

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/is-next-checkout-step-enabled/is-next-checkout-step-enabled.ts":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/is-next-checkout-step-enabled/is-next-checkout-step-enabled.ts ***!
  \*******************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IsNextCheckoutStepEnabled)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _validate_next_checkout_step_validate_next_checkout_step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validate-next-checkout-step/validate-next-checkout-step */ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts");


class IsNextCheckoutStepEnabled extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.trigger = void 0;
    this.extraTriggers = void 0;
    this.target = void 0;
    this.extraTarget = void 0;
  }
  readyCallback() {}
  init() {
    if (this.triggerSelector) {
      this.trigger = document.querySelector(this.triggerSelector);
    }
    if (this.extraTriggersClassName) {
      this.extraTriggers = Array.from(document.getElementsByClassName(this.extraTriggersClassName));
    }
    this.target = document.querySelector(this.targetSelector);
    if (this.extraTargetSelector) {
      this.extraTarget = document.querySelector(this.extraTargetSelector);
    }
    if (this.trigger) {
      this.mapEvents();
    }
  }
  mapEvents() {
    this.mapTriggerChangeEvent();
    this.mapExtraTriggersToggleEvent();
    this.mapTargetInitEvent();
  }
  mapTriggerChangeEvent() {
    this.trigger.addEventListener('change', () => this.onTriggerChange());
  }
  mapExtraTriggersToggleEvent() {
    if (!this.extraTriggers) {
      return;
    }
    this.extraTriggers.forEach(extraTrigger => {
      extraTrigger.addEventListener('toggle', () => this.onTriggerChange());
    });
  }
  mapTargetInitEvent() {
    var target = this.extraTarget ? this.extraTarget : this.target;
    target.addEventListener(_validate_next_checkout_step_validate_next_checkout_step__WEBPACK_IMPORTED_MODULE_1__.EVENT_INIT, () => this.initTriggerState());
  }
  initTriggerState() {
    this.onTriggerChange();
  }
  onTriggerChange() {
    var currentValue = this.trigger.options[this.trigger.selectedIndex].value;
    if (currentValue === this.toggleOptionValue && this.target) {
      this.resetTargetEvents(this.extraTarget);
      this.target.initTriggerState();
      return;
    }
    if (currentValue !== this.toggleOptionValue && this.extraTarget) {
      this.resetTargetEvents(this.target);
      this.extraTarget.initTriggerState();
      return;
    }
    this.target.disableNextStepButton(false);
  }
  resetTargetEvents(target) {
    if (!target) {
      return;
    }
    target.resetEvents();
  }

  /**
   * Gets a querySelector name of the trigger element.
   */
  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  get extraTriggersClassName() {
    return this.getAttribute('extra-triggers-class-name');
  }

  /**
   * Gets a querySelector name of the target element.
   */
  get targetSelector() {
    return this.getAttribute('target-selector');
  }
  get extraTargetSelector() {
    return this.getAttribute('extra-target-selector');
  }

  /**
   * Gets an option value for comparison with chosen value from dropdown to enable 'validate-next-checkout-step'
   * component.
   */
  get toggleOptionValue() {
    return this.getAttribute('toggle-option-value');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENT_INIT: () => (/* binding */ EVENT_INIT),
/* harmony export */   "default": () => (/* binding */ ValidateNextCheckoutStep)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");



/**
 * @event afterInit An event emitted when the component has been initialized.
 */
var EVENT_INIT = 'afterInit';
class ValidateNextCheckoutStep extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);
    this.containers = void 0;
    this.triggers = void 0;
    this.extraTriggers = void 0;
    this.target = void 0;
    this.dropdownTriggers = void 0;
    this.parentTarget = void 0;
    this.requiredFormFieldSelectors = 'select[required], input[required]';
    this.dropdownTriggersChangeHandler = void 0;
    this.parentTargetToggleFormHandler = void 0;
    this.extraTriggerChangeHandler = void 0;
    this.triggerInputHandler = void 0;
  }
  readyCallback() {}
  init() {
    this.target = document.querySelector(this.targetSelector);
    if (this.parentTargetClassName) {
      this.parentTarget = document.getElementsByClassName(this.parentTargetClassName)[0];
    }
    if (this.isTriggerEnabled) {
      this.initTriggerState();
    }
    this.dispatchCustomEvent(EVENT_INIT);
  }
  mapEvents() {
    this.mapTriggerEvents();
    this.dropdownTriggersChangeHandler = () => this.onDropdownTriggerChange();
    this.dropdownTriggers.forEach(element => {
      element.addEventListener('change', this.dropdownTriggersChangeHandler);
    });
    if (this.parentTarget) {
      this.parentTargetToggleFormHandler = () => this.onDropdownTriggerChange();
      this.parentTarget.addEventListener('toggleForm', this.parentTargetToggleFormHandler);
    }
    if (this.extraTriggers) {
      this.extraTriggerChangeHandler = () => this.onExtraTriggerChange();
      this.extraTriggers.forEach(extraTrigger => {
        extraTrigger.addEventListener('change', this.extraTriggerChangeHandler);
      });
    }
  }

  /**
   * Resets events that were subscribed in the `mapEvents` method.
   */
  resetEvents() {
    if (this.triggers) {
      this.triggers.forEach(element => {
        element.removeEventListener('input', this.triggerInputHandler);
      });
    }
    if (this.dropdownTriggers) {
      this.dropdownTriggers.forEach(element => {
        element.removeEventListener('change', this.dropdownTriggersChangeHandler);
      });
    }
    if (this.parentTarget) {
      this.parentTarget.removeEventListener('toggleForm', this.parentTargetToggleFormHandler);
    }
    if (this.extraTriggers) {
      this.extraTriggers.forEach(extraTrigger => {
        extraTrigger.removeEventListener('change', this.extraTriggerChangeHandler);
      });
    }
  }
  mapTriggerEvents() {
    if (this.triggers) {
      this.triggerInputHandler = () => this.onTriggerInput();
      this.triggers.forEach(element => {
        element.addEventListener('input', this.triggerInputHandler);
      });
    }
  }

  /**
   * Init the methods, which fill the collection of form fields and toggle disabling of button.
   */
  initTriggerState() {
    var _this = this;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.fillExtraTriggersCollection();
      _this.containers = Array.from(document.querySelectorAll(_this.containerSelector));
      _this.fillDropdownTriggersCollection();
      _this.fillFormFieldsCollection();
      _this.toggleDisablingNextStepButton();
      _this.resetEvents();
      _this.mapEvents();
    })();
  }
  fillDropdownTriggersCollection() {
    this.dropdownTriggers = Array.from(document.querySelectorAll(this.dropdownTriggerSelector));
  }
  fillFormFieldsCollection() {
    var _this2 = this;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.triggers = [];
      if (!_this2.containers) {
        return;
      }
      _this2.triggers = _this2.containers.reduce((collection, element) => {
        var extraContainer = _this2.extraContainerSelector ? element.closest(_this2.extraContainerSelector) : null;
        if (!element.classList.contains(_this2.classToToggle) && !(extraContainer != null && extraContainer.classList.contains(_this2.classToToggle))) {
          collection.push(...Array.from(element.querySelectorAll(_this2.requiredFormFieldSelectors)));
        }
        return collection;
      }, []);
    })();
  }
  fillExtraTriggersCollection() {
    if (!this.extraTriggersClassName) {
      return;
    }
    this.extraTriggers = Array.from(document.getElementsByClassName(this.extraTriggersClassName));
  }
  onTriggerInput() {
    this.fillFormFieldsCollection();
    this.toggleDisablingNextStepButton();
  }
  onDropdownTriggerChange() {
    this.onTriggerInput();
    this.mapTriggerEvents();
  }
  onExtraTriggerChange() {
    this.initTriggerState();
  }
  toggleDisablingNextStepButton() {
    if (!this.target) {
      return;
    }
    var isFormInvalid = this.isFormFieldsEmpty || this.isDropdownTriggerPreSelected || this.isExtraTriggersUnchecked;
    this.disableNextStepButton(isFormInvalid);
  }

  /**
   * Removes/Sets the disabled attribute for target element.
   */
  disableNextStepButton(isDisabled) {
    if (this.target) {
      this.target.disabled = isDisabled;
    }
  }
  get isDropdownTriggerPreSelected() {
    if (!this.dropdownTriggers) {
      return false;
    }
    return this.dropdownTriggers.some(element => !element.value);
  }
  get isExtraTriggersUnchecked() {
    if (!this.extraTriggers) {
      return false;
    }
    var groupExtraTriggers = {};
    var checkedGroup = [];
    this.extraTriggers.forEach(extraTrigger => {
      var triggerName = extraTrigger.name;
      if (groupExtraTriggers[triggerName] !== extraTrigger.checked) {
        groupExtraTriggers[triggerName] = extraTrigger.checked;
      }
      if (groupExtraTriggers[triggerName]) {
        checkedGroup.push(triggerName);
        groupExtraTriggers[triggerName] = false;
      }
    });
    return Object.keys(groupExtraTriggers).length !== checkedGroup.length;
  }

  /**
   * Checks if the form fields are empty.
   */
  get isFormFieldsEmpty() {
    return this.triggers.some(element => !element.value);
  }

  /**
   * Gets a querySelector name of the target element.
   */
  get targetSelector() {
    return this.getAttribute('target-selector');
  }

  /**
   * Gets a querySelector name of the form element.
   */
  get containerSelector() {
    return this.getAttribute('container-selector');
  }
  get extraContainerSelector() {
    return this.getAttribute('extra-container-selector');
  }

  /**
   * Gets a querySelector name of the dropdown trigger element.
   */
  get dropdownTriggerSelector() {
    return this.getAttribute('dropdown-trigger-selector');
  }

  /**
   * Checks if the trigger element is enabled.
   */
  get isTriggerEnabled() {
    return this.hasAttribute('is-enable');
  }

  /**
   * Gets a class name for the toggle action.
   */
  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }
  get parentTargetClassName() {
    return this.getAttribute('parent-target-class-name');
  }
  get extraTriggersClassName() {
    return this.getAttribute('extra-triggers-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuaXMtbmV4dC1jaGVja291dC1zdGVwLWVuYWJsZWQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWdEO0FBQ2tFO0FBRW5HLE1BQU1FLHlCQUF5QixTQUFTRiwrREFBUyxDQUFDO0VBQUFHLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDbkRDLE9BQU87SUFBQSxLQUNQQyxhQUFhO0lBQUEsS0FDYkMsTUFBTTtJQUFBLEtBQ05DLFdBQVc7RUFBQTtFQUVYQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksSUFBSSxDQUFDQyxlQUFlLEVBQUU7TUFDdEIsSUFBSSxDQUFDTixPQUFPLEdBQXNCTyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUNGLGVBQWUsQ0FBQztJQUNsRjtJQUVBLElBQUksSUFBSSxDQUFDRyxzQkFBc0IsRUFBRTtNQUM3QixJQUFJLENBQUNSLGFBQWEsR0FDZFMsS0FBSyxDQUFDQyxJQUFJLENBQUNKLFFBQVEsQ0FBQ0ssc0JBQXNCLENBQUMsSUFBSSxDQUFDSCxzQkFBc0IsQ0FBQyxDQUMxRTtJQUNMO0lBRUEsSUFBSSxDQUFDUCxNQUFNLEdBQTZCSyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUNLLGNBQWMsQ0FBQztJQUVuRixJQUFJLElBQUksQ0FBQ0MsbUJBQW1CLEVBQUU7TUFDMUIsSUFBSSxDQUFDWCxXQUFXLEdBQTZCSSxRQUFRLENBQUNDLGFBQWEsQ0FBQyxJQUFJLENBQUNNLG1CQUFtQixDQUFDO0lBQ2pHO0lBRUEsSUFBSSxJQUFJLENBQUNkLE9BQU8sRUFBRTtNQUNkLElBQUksQ0FBQ2UsU0FBUyxDQUFDLENBQUM7SUFDcEI7RUFDSjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVCLElBQUksQ0FBQ0MsMkJBQTJCLENBQUMsQ0FBQztJQUNsQyxJQUFJ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MEIsQ0FBQztFQUN4RDs7RUFFQTtBQUNKO0FBQ0E7RUFDSSxJQUFJNEIsdUJBQXVCQSxDQUFBLEVBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUM1QixZQUFZLENBQUMsMkJBQTJCLENBQUM7RUFDekQ7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBSVksZ0JBQWdCQSxDQUFBLEVBQVk7SUFDNUIsT0FBTyxJQUFJLENBQUMwQyxZQUFZLENBQUMsV0FBVyxDQUFDO0VBQ3pDOztFQUVBO0FBQ0o7QUFDQTtFQUNJLElBQUlqQixhQUFhQSxDQUFBLEVBQVc7SUFDeEIsT0FBTyxJQUFJLENBQUNyQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7RUFFQSxJQUFjVyxxQkFBcUJBLENBQUEsRUFBVztJQUMxQyxPQUFPLElBQUksQ0FBQ1gsWUFBWSxDQUFDLDBCQUEwQixDQUFDO0VBQ3hEO0VBRUEsSUFBY3ZCLHNCQUFzQkEsQ0FBQSxFQUFXO0lBQzNDLE9BQU8sSUFBSSxDQUFDdUIsWUFBWSxDQUFDLDJCQUEyQixDQUFDO0VBQ3pEO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvaXMtbmV4dC1jaGVja291dC1zdGVwLWVuYWJsZWQvaXMtbmV4dC1jaGVja291dC1zdGVwLWVuYWJsZWQudHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9jaGVja291dC1wYWdlL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0NoZWNrb3V0UGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcC92YWxpZGF0ZS1uZXh0LWNoZWNrb3V0LXN0ZXAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwLCB7IEVWRU5UX0lOSVQgfSBmcm9tICcuLi92YWxpZGF0ZS1uZXh0LWNoZWNrb3V0LXN0ZXAvdmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXNOZXh0Q2hlY2tvdXRTdGVwRW5hYmxlZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXI6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHByb3RlY3RlZCBleHRyYVRyaWdnZXJzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRhcmdldDogVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwO1xuICAgIHByb3RlY3RlZCBleHRyYVRhcmdldDogVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50cmlnZ2VyU2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZXh0cmFUcmlnZ2Vyc0NsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5leHRyYVRyaWdnZXJzID0gPEhUTUxJbnB1dEVsZW1lbnRbXT4oXG4gICAgICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZXh0cmFUcmlnZ2Vyc0NsYXNzTmFtZSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSA8VmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwPmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHRoaXMuZXh0cmFUYXJnZXRTZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5leHRyYVRhcmdldCA9IDxWYWxpZGF0ZU5leHRDaGVja291dFN0ZXA+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmV4dHJhVGFyZ2V0U2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlckNoYW5nZUV2ZW50KCk7XG4gICAgICAgIHRoaXMubWFwRXh0cmFUcmlnZ2Vyc1RvZ2dsZUV2ZW50KCk7XG4gICAgICAgIHRoaXMubWFwVGFyZ2V0SW5pdEV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJDaGFuZ2VFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMub25UcmlnZ2VyQ2hhbmdlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFeHRyYVRyaWdnZXJzVG9nZ2xlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5leHRyYVRyaWdnZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dHJhVHJpZ2dlcnMuZm9yRWFjaCgoZXh0cmFUcmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBleHRyYVRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcigndG9nZ2xlJywgKCkgPT4gdGhpcy5vblRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUYXJnZXRJbml0RXZlbnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZXh0cmFUYXJnZXQgPyB0aGlzLmV4dHJhVGFyZ2V0IDogdGhpcy50YXJnZXQ7XG5cbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfSU5JVCwgKCkgPT4gdGhpcy5pbml0VHJpZ2dlclN0YXRlKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0VHJpZ2dlclN0YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVHJpZ2dlckNoYW5nZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHRoaXMudHJpZ2dlci5vcHRpb25zW3RoaXMudHJpZ2dlci5zZWxlY3RlZEluZGV4XS52YWx1ZTtcblxuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB0aGlzLnRvZ2dsZU9wdGlvblZhbHVlICYmIHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0VGFyZ2V0RXZlbnRzKHRoaXMuZXh0cmFUYXJnZXQpO1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuaW5pdFRyaWdnZXJTdGF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VycmVudFZhbHVlICE9PSB0aGlzLnRvZ2dsZU9wdGlvblZhbHVlICYmIHRoaXMuZXh0cmFUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRUYXJnZXRFdmVudHModGhpcy50YXJnZXQpO1xuICAgICAgICAgICAgdGhpcy5leHRyYVRhcmdldC5pbml0VHJpZ2dlclN0YXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVOZXh0U3RlcEJ1dHRvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0VGFyZ2V0RXZlbnRzKHRhcmdldDogVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwKTogdm9pZCB7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXQucmVzZXRFdmVudHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGV4dHJhVHJpZ2dlcnNDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdleHRyYS10cmlnZ2Vycy1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBleHRyYVRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZXh0cmEtdGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhbiBvcHRpb24gdmFsdWUgZm9yIGNvbXBhcmlzb24gd2l0aCBjaG9zZW4gdmFsdWUgZnJvbSBkcm9wZG93biB0byBlbmFibGUgJ3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcCdcbiAgICAgKiBjb21wb25lbnQuXG4gICAgICovXG4gICAgZ2V0IHRvZ2dsZU9wdGlvblZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndG9nZ2xlLW9wdGlvbi12YWx1ZScpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG4vKipcbiAqIEBldmVudCBhZnRlckluaXQgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUID0gJ2FmdGVySW5pdCc7XG5cbnR5cGUgRm9ybUZpZWxkRWxlbWVudCA9IEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlTmV4dENoZWNrb3V0U3RlcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBGb3JtRmllbGRFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGV4dHJhVHJpZ2dlcnM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZHJvcGRvd25UcmlnZ2VyczogSFRNTFNlbGVjdEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcGFyZW50VGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVxdWlyZWRGb3JtRmllbGRTZWxlY3RvcnM6IHN0cmluZyA9ICdzZWxlY3RbcmVxdWlyZWRdLCBpbnB1dFtyZXF1aXJlZF0nO1xuICAgIHByb3RlY3RlZCBkcm9wZG93blRyaWdnZXJzQ2hhbmdlSGFuZGxlcjogKCkgPT4gdm9pZDtcbiAgICBwcm90ZWN0ZWQgcGFyZW50VGFyZ2V0VG9nZ2xlRm9ybUhhbmRsZXI6ICgpID0+IHZvaWQ7XG4gICAgcHJvdGVjdGVkIGV4dHJhVHJpZ2dlckNoYW5nZUhhbmRsZXI6ICgpID0+IHZvaWQ7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJJbnB1dEhhbmRsZXI6ICgpID0+IHZvaWQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldFNlbGVjdG9yKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmlnZ2VyRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VHJpZ2dlclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfSU5JVCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5kcm9wZG93blRyaWdnZXJzQ2hhbmdlSGFuZGxlciA9ICgpID0+IHRoaXMub25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5kcm9wZG93blRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuZHJvcGRvd25UcmlnZ2Vyc0NoYW5nZUhhbmRsZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0VG9nZ2xlRm9ybUhhbmRsZXIgPSAoKSA9PiB0aGlzLm9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b2dnbGVGb3JtJywgdGhpcy5wYXJlbnRUYXJnZXRUb2dnbGVGb3JtSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5leHRyYVRyaWdnZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmV4dHJhVHJpZ2dlckNoYW5nZUhhbmRsZXIgPSAoKSA9PiB0aGlzLm9uRXh0cmFUcmlnZ2VyQ2hhbmdlKCk7XG4gICAgICAgICAgICB0aGlzLmV4dHJhVHJpZ2dlcnMuZm9yRWFjaCgoZXh0cmFUcmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXh0cmFUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuZXh0cmFUcmlnZ2VyQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0cyBldmVudHMgdGhhdCB3ZXJlIHN1YnNjcmliZWQgaW4gdGhlIGBtYXBFdmVudHNgIG1ldGhvZC5cbiAgICAgKi9cbiAgICByZXNldEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogRm9ybUZpZWxkRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLnRyaWdnZXJJbnB1dEhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kcm9wZG93blRyaWdnZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMuZHJvcGRvd25UcmlnZ2Vyc0NoYW5nZUhhbmRsZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvZ2dsZUZvcm0nLCB0aGlzLnBhcmVudFRhcmdldFRvZ2dsZUZvcm1IYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmV4dHJhVHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuZXh0cmFUcmlnZ2Vycy5mb3JFYWNoKChleHRyYVRyaWdnZXI6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBleHRyYVRyaWdnZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5leHRyYVRyaWdnZXJDaGFuZ2VIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXJzKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJJbnB1dEhhbmRsZXIgPSAoKSA9PiB0aGlzLm9uVHJpZ2dlcklucHV0KCk7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEZvcm1GaWVsZEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy50cmlnZ2VySW5wdXRIYW5kbGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgbWV0aG9kcywgd2hpY2ggZmlsbCB0aGUgY29sbGVjdGlvbiBvZiBmb3JtIGZpZWxkcyBhbmQgdG9nZ2xlIGRpc2FibGluZyBvZiBidXR0b24uXG4gICAgICovXG4gICAgYXN5bmMgaW5pdFRyaWdnZXJTdGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgYXdhaXQgdGhpcy5maWxsRXh0cmFUcmlnZ2Vyc0NvbGxlY3Rpb24oKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lcnMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5jb250YWluZXJTZWxlY3RvcikpO1xuICAgICAgICB0aGlzLmZpbGxEcm9wZG93blRyaWdnZXJzQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLmZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uKCk7XG4gICAgICAgIHRoaXMucmVzZXRFdmVudHMoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmlsbERyb3Bkb3duVHJpZ2dlcnNDb2xsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlcnMgPSA8SFRNTFNlbGVjdEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5kcm9wZG93blRyaWdnZXJTZWxlY3RvcikpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGFzeW5jIGZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IFtdO1xuXG4gICAgICAgIGlmICghdGhpcy5jb250YWluZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEZvcm1GaWVsZEVsZW1lbnRbXT50aGlzLmNvbnRhaW5lcnMucmVkdWNlKFxuICAgICAgICAgICAgKGNvbGxlY3Rpb246IEhUTUxFbGVtZW50W10sIGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXh0cmFDb250YWluZXIgPSB0aGlzLmV4dHJhQ29udGFpbmVyU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgPyBlbGVtZW50LmNsb3Nlc3QodGhpcy5leHRyYUNvbnRhaW5lclNlbGVjdG9yKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzVG9Ub2dnbGUpICYmXG4gICAgICAgICAgICAgICAgICAgICFleHRyYUNvbnRhaW5lcj8uY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3NUb1RvZ2dsZSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKDxGb3JtRmllbGRFbGVtZW50W10+QXJyYXkuZnJvbShlbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5yZXF1aXJlZEZvcm1GaWVsZFNlbGVjdG9ycykpKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmlsbEV4dHJhVHJpZ2dlcnNDb2xsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZXh0cmFUcmlnZ2Vyc0NsYXNzTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRyYVRyaWdnZXJzID0gPEhUTUxJbnB1dEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5leHRyYVRyaWdnZXJzQ2xhc3NOYW1lKSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VySW5wdXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRGlzYWJsaW5nTmV4dFN0ZXBCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UcmlnZ2VySW5wdXQoKTtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXh0cmFUcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmluaXRUcmlnZ2VyU3RhdGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlRGlzYWJsaW5nTmV4dFN0ZXBCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzRm9ybUludmFsaWQgPVxuICAgICAgICAgICAgdGhpcy5pc0Zvcm1GaWVsZHNFbXB0eSB8fCB0aGlzLmlzRHJvcGRvd25UcmlnZ2VyUHJlU2VsZWN0ZWQgfHwgdGhpcy5pc0V4dHJhVHJpZ2dlcnNVbmNoZWNrZWQ7XG4gICAgICAgIHRoaXMuZGlzYWJsZU5leHRTdGVwQnV0dG9uKGlzRm9ybUludmFsaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMvU2V0cyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIGZvciB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBkaXNhYmxlTmV4dFN0ZXBCdXR0b24oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmRyb3Bkb3duVHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmRyb3Bkb3duVHJpZ2dlcnMuc29tZSgoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpID0+ICFlbGVtZW50LnZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGlzRXh0cmFUcmlnZ2Vyc1VuY2hlY2tlZCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKCF0aGlzLmV4dHJhVHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwRXh0cmFUcmlnZ2VycyA9IHt9O1xuICAgICAgICBjb25zdCBjaGVja2VkR3JvdXAgPSBbXTtcblxuICAgICAgICB0aGlzLmV4dHJhVHJpZ2dlcnMuZm9yRWFjaCgoZXh0cmFUcmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmlnZ2VyTmFtZSA9IGV4dHJhVHJpZ2dlci5uYW1lO1xuXG4gICAgICAgICAgICBpZiAoZ3JvdXBFeHRyYVRyaWdnZXJzW3RyaWdnZXJOYW1lXSAhPT0gZXh0cmFUcmlnZ2VyLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICBncm91cEV4dHJhVHJpZ2dlcnNbdHJpZ2dlck5hbWVdID0gZXh0cmFUcmlnZ2VyLmNoZWNrZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChncm91cEV4dHJhVHJpZ2dlcnNbdHJpZ2dlck5hbWVdKSB7XG4gICAgICAgICAgICAgICAgY2hlY2tlZEdyb3VwLnB1c2godHJpZ2dlck5hbWUpO1xuICAgICAgICAgICAgICAgIGdyb3VwRXh0cmFUcmlnZ2Vyc1t0cmlnZ2VyTmFtZV0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwRXh0cmFUcmlnZ2VycykubGVuZ3RoICE9PSBjaGVja2VkR3JvdXAubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZm9ybSBmaWVsZHMgYXJlIGVtcHR5LlxuICAgICAqL1xuICAgIGdldCBpc0Zvcm1GaWVsZHNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcnMuc29tZSgoZWxlbWVudDogRm9ybUZpZWxkRWxlbWVudCkgPT4gIWVsZW1lbnQudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCB0YXJnZXRTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIGZvcm0gZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgY29udGFpbmVyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb250YWluZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGV4dHJhQ29udGFpbmVyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdleHRyYS1jb250YWluZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBkcm9wZG93biB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGRyb3Bkb3duVHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZHJvcGRvd24tdHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgdHJpZ2dlciBlbGVtZW50IGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgZ2V0IGlzVHJpZ2dlckVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnaXMtZW5hYmxlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNsYXNzIG5hbWUgZm9yIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBjbGFzc1RvVG9nZ2xlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwYXJlbnRUYXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwYXJlbnQtdGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGV4dHJhVHJpZ2dlcnNDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdleHRyYS10cmlnZ2Vycy1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkVWRU5UX0lOSVQiLCJJc05leHRDaGVja291dFN0ZXBFbmFibGVkIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJ0cmlnZ2VyIiwiZXh0cmFUcmlnZ2VycyIsInRhcmdldCIsImV4dHJhVGFyZ2V0IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJleHRyYVRyaWdnZXJzQ2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRhcmdldFNlbGVjdG9yIiwiZXh0cmFUYXJnZXRTZWxlY3RvciIsIm1hcEV2ZW50cyIsIm1hcFRyaWdnZXJDaGFuZ2VFdmVudCIsIm1hcEV4dHJhVHJpZ2dlcnNUb2dnbGVFdmVudCIsIm1hcFRhcmdldEluaXRFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvblRyaWdnZXJDaGFuZ2UiLCJmb3JFYWNoIiwiZXh0cmFUcmlnZ2VyIiwiaW5pdFRyaWdnZXJTdGF0ZSIsImN1cnJlbnRWYWx1ZSIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwidmFsdWUiLCJ0b2dnbGVPcHRpb25WYWx1ZSIsInJlc2V0VGFyZ2V0RXZlbnRzIiwiZGlzYWJsZU5leHRTdGVwQnV0dG9uIiwicmVzZXRFdmVudHMiLCJnZXRBdHRyaWJ1dGUiLCJWYWxpZGF0ZU5leHRDaGVja291dFN0ZXAiLCJjb250YWluZXJzIiwidHJpZ2dlcnMiLCJkcm9wZG93blRyaWdnZXJzIiwicGFyZW50VGFyZ2V0IiwicmVxdWlyZWRGb3JtRmllbGRTZWxlY3RvcnMiLCJkcm9wZG93blRyaWdnZXJzQ2hhbmdlSGFuZGxlciIsInBhcmVudFRhcmdldFRvZ2dsZUZvcm1IYW5kbGVyIiwiZXh0cmFUcmlnZ2VyQ2hhbmdlSGFuZGxlciIsInRyaWdnZXJJbnB1dEhhbmRsZXIiLCJwYXJlbnRUYXJnZXRDbGFzc05hbWUiLCJpc1RyaWdnZXJFbmFibGVkIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIm1hcFRyaWdnZXJFdmVudHMiLCJvbkRyb3Bkb3duVHJpZ2dlckNoYW5nZSIsImVsZW1lbnQiLCJvbkV4dHJhVHJpZ2dlckNoYW5nZSIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJvblRyaWdnZXJJbnB1dCIsIl90aGlzIiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJmaWxsRXh0cmFUcmlnZ2Vyc0NvbGxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGFpbmVyU2VsZWN0b3IiLCJmaWxsRHJvcGRvd25UcmlnZ2Vyc0NvbGxlY3Rpb24iLCJmaWxsRm9ybUZpZWxkc0NvbGxlY3Rpb24iLCJ0b2dnbGVEaXNhYmxpbmdOZXh0U3RlcEJ1dHRvbiIsImRyb3Bkb3duVHJpZ2dlclNlbGVjdG9yIiwiX3RoaXMyIiwicmVkdWNlIiwiY29sbGVjdGlvbiIsImV4dHJhQ29udGFpbmVyIiwiZXh0cmFDb250YWluZXJTZWxlY3RvciIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNsYXNzVG9Ub2dnbGUiLCJwdXNoIiwiaXNGb3JtSW52YWxpZCIsImlzRm9ybUZpZWxkc0VtcHR5IiwiaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCIsImlzRXh0cmFUcmlnZ2Vyc1VuY2hlY2tlZCIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInNvbWUiLCJncm91cEV4dHJhVHJpZ2dlcnMiLCJjaGVja2VkR3JvdXAiLCJ0cmlnZ2VyTmFtZSIsIm5hbWUiLCJjaGVja2VkIiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImhhc0F0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=