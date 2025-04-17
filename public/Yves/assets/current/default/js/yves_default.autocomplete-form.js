"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["autocomplete-form"],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AutocompleteForm)
/* harmony export */ });
/* harmony import */ var ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/autocomplete-form/autocomplete-form */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts");

class AutocompleteForm extends ShopUi_components_molecules_autocomplete_form_autocomplete_form__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.parentWrap = void 0;
  }
  init() {
    if (this.parentWrapClassName) {
      this.parentWrap = document.getElementsByClassName("" + this.parentWrapClassName)[0];
    }
    this.textInput = this.getElementsByClassName(this.jsName + "__input")[0];
    if (this.textInput) {
      this.ajaxProvider = this.getElementsByClassName(this.jsName + "__provider")[0];
      this.valueInput = this.getElementsByClassName(this.jsName + "__input-hidden")[0];
      this.suggestionsContainer = this.getElementsByClassName(this.jsName + "__suggestions")[0];
      this.cleanButton = this.getElementsByClassName(this.jsName + "__clean-button")[0];
      this.mapEvents();
    }
    if (!this.textInput) {
      super.readyCallback();
    }
  }
  onBlur() {
    super.onBlur();
    if (this.parentWrapClassName) {
      this.hideOverlay();
    }
  }
  onFocus() {
    if (this.parentWrapClassName) {
      this.showOverlay();
    }
    super.onFocus();
  }
  showOverlay() {
    this.parentWrap.classList.add('active');
  }
  hideOverlay() {
    this.parentWrap.classList.remove('active');
  }
  get parentWrapClassName() {
    return this.getAttribute('parent-wrap-class-name');
  }
}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/autocomplete-form/autocomplete-form.ts ***!
  \*******************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Events: () => (/* binding */ Events),
/* harmony export */   "default": () => (/* binding */ AutocompleteForm)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");

/* eslint-disable max-lines */


var Events;

/**
 * @event fetching An event which is triggered when an ajax request is sent to the server.
 * @event fetched An event which is triggered when an ajax request is closed.
 * @event change An event which is triggered when the search field is changed.
 * @event set An event which is triggered when the element of an autocomplete suggestion is selected.
 * @event unset An event which is triggered when the element of an autocomplete suggestion is removed.
 */
(function (Events) {
  Events["FETCHING"] = "fetching";
  Events["FETCHED"] = "fetched";
  Events["CHANGE"] = "change";
  Events["SET"] = "set";
  Events["UNSET"] = "unset";
})(Events || (Events = {}));
class AutocompleteForm extends _models_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super(...arguments);
    this.ajaxProvider = void 0;
    this.textInput = void 0;
    this.valueInput = void 0;
    this.suggestionsContainer = void 0;
    this.suggestionItems = void 0;
    this.cleanButton = void 0;
    this.lastSelectedItem = void 0;
    this.injectorsExtraQueryValueList = void 0;
    this.extraQueryValues = new Map();
  }
  /**
   * Performs the Ajax operations.
   */
  /**
   * The text input element.
   */
  /**
   * The value input element.
   */
  /**
   * The contains of the suggestions.
   */
  /**
   * Collection of the suggestions items.
   */
  /**
   * The trigger of the form clearing.
   */
  /**
   * The last selected saggestion item.
   */
  readyCallback() {
    this.ajaxProvider = this.getElementsByClassName(this.jsName + "__provider")[0];
    this.textInput = this.getElementsByClassName(this.jsName + "__text-input")[0];
    this.valueInput = this.getElementsByClassName(this.jsName + "__value-input")[0];
    this.suggestionsContainer = this.getElementsByClassName(this.jsName + "__suggestions")[0];
    this.cleanButton = this.getElementsByClassName(this.jsName + "__clean-button")[0];
    if (this.injectorsExtraQueryValueClassName) {
      this.injectorsExtraQueryValueList = Array.from(document.getElementsByClassName(this.injectorsExtraQueryValueClassName));
    }
    if (this.autoInitEnabled) {
      this.autoLoadInit();
    }
    this.mapEvents();
  }
  mapEvents() {
    this.textInput.addEventListener('input', (0,lodash_es_debounce__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.onInput(), this.debounceDelay));
    this.textInput.addEventListener('blur', (0,lodash_es_debounce__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.onBlur(), this.debounceDelay));
    this.textInput.addEventListener('focus', () => this.onFocus());
    this.textInput.addEventListener('keydown', event => this.onKeyDown(event));
    if (this.cleanButton) {
      this.cleanButton.addEventListener('click', () => this.onCleanButtonClick());
    }
  }
  autoLoadInit() {
    this.textInput.focus();
    this.loadSuggestions();
  }
  onCleanButtonClick() {
    this.clean();
    this.dispatchCustomEvent(Events.UNSET);
  }
  onBlur() {
    this.hideSuggestions();
  }
  onFocus() {
    if (this.inputText.length < this.minLetters) {
      return;
    }
    this.showSuggestions();
  }
  onInput() {
    this.dispatchCustomEvent(Events.CHANGE);
    if (this.inputText.length >= this.minLetters) {
      this.loadSuggestions();
      return;
    }
    this.hideSuggestions();
    if (!!this.inputValue) {
      this.inputValue = '';
      this.dispatchCustomEvent(Events.UNSET);
    }
  }
  showSuggestions() {
    this.suggestionsContainer.classList.remove('is-hidden');
  }
  hideSuggestions() {
    this.suggestionsContainer.classList.add('is-hidden');
  }
  setQueryParams() {
    this.extraQueryValues.clear();
    this.ajaxProvider.queryParams.clear();
    this.ajaxProvider.queryParams.set(this.queryString, this.inputText);
    if (!this.injectorsExtraQueryValueList || !this.injectorsExtraQueryValueList.length) {
      return;
    }
    this.injectorsExtraQueryValueList.forEach(item => {
      if (!item.name || !item.value) {
        return;
      }
      this.ajaxProvider.queryParams.set(item.name, item.value);
      this.extraQueryValues.set(item.name, item.value);
    });
  }

  /**
   * Sends a request to the server and triggers the custom fetching and fetched events.
   */
  loadSuggestions() {
    var _this = this;
    return (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.dispatchCustomEvent(Events.FETCHING);
      _this.showSuggestions();
      _this.setQueryParams();
      yield _this.ajaxProvider.fetch();
      _this.suggestionItems = Array.from(_this.suggestionsContainer.getElementsByClassName(_this.suggestedItemClassName) ||
      // eslint-disable-next-line deprecation/deprecation
      _this.suggestionsContainer.querySelectorAll(_this.suggestedItemSelector));
      _this.lastSelectedItem = _this.suggestionItems[0];
      _this.mapSuggestionItemsEvents();
      _this.dispatchCustomEvent(Events.FETCHED);
    })();
  }
  mapSuggestionItemsEvents() {
    this.suggestionItems.forEach(item => {
      item.addEventListener('click', () => this.onItemClick(item));
      item.addEventListener('mouseover', () => this.onItemSelected(item));
    });
  }
  onItemClick(item) {
    this.inputText = item.textContent.trim();
    this.inputValue = item.getAttribute(this.valueAttributeName);
    this.dispatchCustomEvent(Events.SET, {
      text: this.inputText,
      value: this.inputValue,
      extraValues: this.extraQueryValues
    });
  }
  onItemSelected(item) {
    this.changeSelectedItem(item);
  }
  changeSelectedItem(item) {
    this.lastSelectedItem.classList.remove(this.selectedInputClass);
    item.classList.add(this.selectedInputClass);
    this.lastSelectedItem = item;
  }
  onKeyDown(event) {
    if (!this.suggestionItems && this.inputText.length < this.minLetters) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        this.onKeyDownArrowUp();
        break;
      case 'ArrowDown':
        this.onKeyDownArrowDown();
        break;
      case 'Enter':
        this.onKeyDownEnter(event);
        break;
    }
  }
  onKeyDownArrowUp() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex - 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex < 0 ? lastSuggestionItemIndex : elementIndex];
    this.changeSelectedItem(item);
  }
  onKeyDownArrowDown() {
    var lastSelectedItemIndex = this.suggestionItems.indexOf(this.lastSelectedItem);
    var elementIndex = lastSelectedItemIndex + 1;
    var lastSuggestionItemIndex = this.suggestionItems.length - 1;
    var item = this.suggestionItems[elementIndex > lastSuggestionItemIndex ? 0 : elementIndex];
    this.changeSelectedItem(item);
  }
  onKeyDownEnter(event) {
    event.preventDefault();
    this.lastSelectedItem.click();
  }

  /**
   * Clears the input value and the typed text.
   */
  clean() {
    this.inputText = '';
    this.inputValue = '';
  }

  /**
   * Gets the css query selector of the selected suggestion items.
   */
  get selectedInputClass() {
    // eslint-disable-next-line deprecation/deprecation
    return this.suggestedItemClassName + "--selected" || 0;
  }

  /**
   * Gets the typed text from the form field.
   */
  get inputText() {
    return this.textInput.value.trim();
  }

  /**
   * Sets an input text.
   * @param value A typed text in the input field.
   */
  set inputText(value) {
    this.textInput.value = value;
  }

  /**
   * Gets the value attribute from the input form field.
   */
  get inputValue() {
    return this.valueInput.value;
  }

  /**
   * Sets the input value.
   */
  set inputValue(value) {
    this.valueInput.value = value;
  }

  /**
   * Gets the css query selector for the ajaxProvider configuration.
   */
  get queryString() {
    return this.getAttribute('query-string');
  }

  /**
   * Gets the value attribute name for the input element configuration.
   */
  get valueAttributeName() {
    return this.getAttribute('value-attribute-name');
  }

  /**
   * Gets the css query selector of the suggestion items.
   *
   * @deprecated Use suggestedItemClassName() instead.
   */
  get suggestedItemSelector() {
    return this.getAttribute('suggested-item-selector');
  }
  get suggestedItemClassName() {
    return this.getAttribute('suggested-item-class-name');
  }
  get injectorsExtraQueryValueClassName() {
    return this.getAttribute('injectors-extra-query-value-class-name');
  }

  /**
   * Gets a time delay for the blur and input events.
   */
  get debounceDelay() {
    return Number(this.getAttribute('debounce-delay'));
  }

  /**
   * Gets the number of letters which, upon entering in form field, is sufficient to show, hide or load the
   * suggestions.
   */
  get minLetters() {
    return Number(this.getAttribute('min-letters'));
  }

  /**
   * Gets if the auto load of suggestions is enabled.
   */
  get autoInitEnabled() {
    return this.hasAttribute('auto-init');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYXV0b2NvbXBsZXRlLWZvcm0vYXV0b2NvbXBsZXRlLWZvcm0udHMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2F1dG9jb21wbGV0ZS1mb3JtL2F1dG9jb21wbGV0ZS1mb3JtLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXRvY29tcGxldGVGb3JtQ29yZSBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvYXV0b2NvbXBsZXRlLWZvcm0vYXV0b2NvbXBsZXRlLWZvcm0nO1xuaW1wb3J0IEFqYXhQcm92aWRlciBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1wcm92aWRlci9hamF4LXByb3ZpZGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b2NvbXBsZXRlRm9ybSBleHRlbmRzIEF1dG9jb21wbGV0ZUZvcm1Db3JlIHtcbiAgICBwcm90ZWN0ZWQgcGFyZW50V3JhcDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50V3JhcENsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRXcmFwID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5wYXJlbnRXcmFwQ2xhc3NOYW1lfWApWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50ZXh0SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbnB1dGApWzBdO1xuXG4gICAgICAgIGlmICh0aGlzLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5hamF4UHJvdmlkZXIgPSA8QWpheFByb3ZpZGVyPnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3Byb3ZpZGVyYClbMF07XG4gICAgICAgICAgICB0aGlzLnZhbHVlSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbnB1dC1oaWRkZW5gKVswXTtcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc3VnZ2VzdGlvbnNgKVswXTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW5CdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fY2xlYW4tYnV0dG9uYClbMF07XG4gICAgICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLnRleHRJbnB1dCkge1xuICAgICAgICAgICAgc3VwZXIucmVhZHlDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQmx1cigpOiB2b2lkIHtcbiAgICAgICAgc3VwZXIub25CbHVyKCk7XG4gICAgICAgIGlmICh0aGlzLnBhcmVudFdyYXBDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5wYXJlbnRXcmFwQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIub25Gb2N1cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzaG93T3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoaWRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYXJlbnRXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50V3JhcENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC13cmFwLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBtYXgtbGluZXMgKi9cbmltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgQWpheFByb3ZpZGVyIGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvbW9sZWN1bGVzL2FqYXgtcHJvdmlkZXIvYWpheC1wcm92aWRlcic7XG5pbXBvcnQgZGVib3VuY2UgZnJvbSAnbG9kYXNoLWVzL2RlYm91bmNlJztcblxuZXhwb3J0IGVudW0gRXZlbnRzIHtcbiAgICBGRVRDSElORyA9ICdmZXRjaGluZycsXG4gICAgRkVUQ0hFRCA9ICdmZXRjaGVkJyxcbiAgICBDSEFOR0UgPSAnY2hhbmdlJyxcbiAgICBTRVQgPSAnc2V0JyxcbiAgICBVTlNFVCA9ICd1bnNldCcsXG59XG5cbi8qKlxuICogQGV2ZW50IGZldGNoaW5nIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIGFuIGFqYXggcmVxdWVzdCBpcyBzZW50IHRvIHRoZSBzZXJ2ZXIuXG4gKiBAZXZlbnQgZmV0Y2hlZCBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiBhbiBhamF4IHJlcXVlc3QgaXMgY2xvc2VkLlxuICogQGV2ZW50IGNoYW5nZSBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgc2VhcmNoIGZpZWxkIGlzIGNoYW5nZWQuXG4gKiBAZXZlbnQgc2V0IEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBlbGVtZW50IG9mIGFuIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIGlzIHNlbGVjdGVkLlxuICogQGV2ZW50IHVuc2V0IEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIHRoZSBlbGVtZW50IG9mIGFuIGF1dG9jb21wbGV0ZSBzdWdnZXN0aW9uIGlzIHJlbW92ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEF1dG9jb21wbGV0ZUZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBBamF4IG9wZXJhdGlvbnMuXG4gICAgICovXG4gICAgYWpheFByb3ZpZGVyOiBBamF4UHJvdmlkZXI7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGV4dCBpbnB1dCBlbGVtZW50LlxuICAgICAqL1xuICAgIHRleHRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSB2YWx1ZSBpbnB1dCBlbGVtZW50LlxuICAgICAqL1xuICAgIHZhbHVlSW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGFpbnMgb2YgdGhlIHN1Z2dlc3Rpb25zLlxuICAgICAqL1xuICAgIHN1Z2dlc3Rpb25zQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdGhlIHN1Z2dlc3Rpb25zIGl0ZW1zLlxuICAgICAqL1xuICAgIHN1Z2dlc3Rpb25JdGVtczogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSB0cmlnZ2VyIG9mIHRoZSBmb3JtIGNsZWFyaW5nLlxuICAgICAqL1xuICAgIGNsZWFuQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsYXN0IHNlbGVjdGVkIHNhZ2dlc3Rpb24gaXRlbS5cbiAgICAgKi9cbiAgICBsYXN0U2VsZWN0ZWRJdGVtOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaW5qZWN0b3JzRXh0cmFRdWVyeVZhbHVlTGlzdDogSFRNTFNlbGVjdEVsZW1lbnRbXSB8IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgZXh0cmFRdWVyeVZhbHVlcyA9IG5ldyBNYXAoKTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFqYXhQcm92aWRlciA9IDxBamF4UHJvdmlkZXI+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcHJvdmlkZXJgKVswXTtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190ZXh0LWlucHV0YClbMF07XG4gICAgICAgIHRoaXMudmFsdWVJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3ZhbHVlLWlucHV0YClbMF07XG4gICAgICAgIHRoaXMuc3VnZ2VzdGlvbnNDb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc3VnZ2VzdGlvbnNgKVswXTtcbiAgICAgICAgdGhpcy5jbGVhbkJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jbGVhbi1idXR0b25gKVswXTtcblxuICAgICAgICBpZiAodGhpcy5pbmplY3RvcnNFeHRyYVF1ZXJ5VmFsdWVDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuaW5qZWN0b3JzRXh0cmFRdWVyeVZhbHVlTGlzdCA9IDxIVE1MU2VsZWN0RWxlbWVudFtdIHwgSFRNTElucHV0RWxlbWVudFtdPihcbiAgICAgICAgICAgICAgICBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5pbmplY3RvcnNFeHRyYVF1ZXJ5VmFsdWVDbGFzc05hbWUpKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmF1dG9Jbml0RW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5hdXRvTG9hZEluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdpbnB1dCcsXG4gICAgICAgICAgICBkZWJvdW5jZSgoKSA9PiB0aGlzLm9uSW5wdXQoKSwgdGhpcy5kZWJvdW5jZURlbGF5KSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdibHVyJyxcbiAgICAgICAgICAgIGRlYm91bmNlKCgpID0+IHRoaXMub25CbHVyKCksIHRoaXMuZGVib3VuY2VEZWxheSksXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGV4dElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5vbkZvY3VzKCkpO1xuICAgICAgICB0aGlzLnRleHRJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB0aGlzLm9uS2V5RG93bihldmVudCkpO1xuICAgICAgICBpZiAodGhpcy5jbGVhbkJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5jbGVhbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25DbGVhbkJ1dHRvbkNsaWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGF1dG9Mb2FkSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5sb2FkU3VnZ2VzdGlvbnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGVhbkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsZWFuKCk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkJsdXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaGlkZVN1Z2dlc3Rpb25zKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPCB0aGlzLm1pbkxldHRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklucHV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRXZlbnRzLkNIQU5HRSk7XG4gICAgICAgIGlmICh0aGlzLmlucHV0VGV4dC5sZW5ndGggPj0gdGhpcy5taW5MZXR0ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdWdnZXN0aW9ucygpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWRlU3VnZ2VzdGlvbnMoKTtcbiAgICAgICAgaWYgKCEhdGhpcy5pbnB1dFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsdWUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuVU5TRVQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNob3dTdWdnZXN0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZVN1Z2dlc3Rpb25zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRRdWVyeVBhcmFtcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5leHRyYVF1ZXJ5VmFsdWVzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYWpheFByb3ZpZGVyLnF1ZXJ5UGFyYW1zLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuYWpheFByb3ZpZGVyLnF1ZXJ5UGFyYW1zLnNldCh0aGlzLnF1ZXJ5U3RyaW5nLCB0aGlzLmlucHV0VGV4dCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmluamVjdG9yc0V4dHJhUXVlcnlWYWx1ZUxpc3QgfHwgIXRoaXMuaW5qZWN0b3JzRXh0cmFRdWVyeVZhbHVlTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaW5qZWN0b3JzRXh0cmFRdWVyeVZhbHVlTGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0ubmFtZSB8fCAhaXRlbS52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5hamF4UHJvdmlkZXIucXVlcnlQYXJhbXMuc2V0KGl0ZW0ubmFtZSwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmV4dHJhUXVlcnlWYWx1ZXMuc2V0KGl0ZW0ubmFtZSwgaXRlbS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIGFuZCB0cmlnZ2VycyB0aGUgY3VzdG9tIGZldGNoaW5nIGFuZCBmZXRjaGVkIGV2ZW50cy5cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkU3VnZ2VzdGlvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFdmVudHMuRkVUQ0hJTkcpO1xuICAgICAgICB0aGlzLnNob3dTdWdnZXN0aW9ucygpO1xuICAgICAgICB0aGlzLnNldFF1ZXJ5UGFyYW1zKCk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5hamF4UHJvdmlkZXIuZmV0Y2goKTtcbiAgICAgICAgdGhpcy5zdWdnZXN0aW9uSXRlbXMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKFxuICAgICAgICAgICAgdGhpcy5zdWdnZXN0aW9uc0NvbnRhaW5lci5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuc3VnZ2VzdGVkSXRlbUNsYXNzTmFtZSkgfHxcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLnN1Z2dlc3Rpb25zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5zdWdnZXN0ZWRJdGVtU2VsZWN0b3IpLFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmxhc3RTZWxlY3RlZEl0ZW0gPSB0aGlzLnN1Z2dlc3Rpb25JdGVtc1swXTtcbiAgICAgICAgdGhpcy5tYXBTdWdnZXN0aW9uSXRlbXNFdmVudHMoKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEV2ZW50cy5GRVRDSEVEKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwU3VnZ2VzdGlvbkl0ZW1zRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5mb3JFYWNoKChpdGVtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25JdGVtQ2xpY2soaXRlbSkpO1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB0aGlzLm9uSXRlbVNlbGVjdGVkKGl0ZW0pKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSXRlbUNsaWNrKGl0ZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gaXRlbS50ZXh0Q29udGVudC50cmltKCk7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9IGl0ZW0uZ2V0QXR0cmlidXRlKHRoaXMudmFsdWVBdHRyaWJ1dGVOYW1lKTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEV2ZW50cy5TRVQsIHtcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuaW5wdXRUZXh0LFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRWYWx1ZSxcbiAgICAgICAgICAgIGV4dHJhVmFsdWVzOiB0aGlzLmV4dHJhUXVlcnlWYWx1ZXMsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkl0ZW1TZWxlY3RlZChpdGVtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSXRlbShpdGVtKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2hhbmdlU2VsZWN0ZWRJdGVtKGl0ZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMubGFzdFNlbGVjdGVkSXRlbS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuc2VsZWN0ZWRJbnB1dENsYXNzKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKHRoaXMuc2VsZWN0ZWRJbnB1dENsYXNzKTtcbiAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5zdWdnZXN0aW9uSXRlbXMgJiYgdGhpcy5pbnB1dFRleHQubGVuZ3RoIDwgdGhpcy5taW5MZXR0ZXJzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIHRoaXMub25LZXlEb3duQXJyb3dVcCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uS2V5RG93bkFycm93RG93bigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICAgICAgICAgIHRoaXMub25LZXlEb3duRW50ZXIoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bkFycm93VXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxhc3RTZWxlY3RlZEl0ZW1JbmRleCA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmluZGV4T2YodGhpcy5sYXN0U2VsZWN0ZWRJdGVtKTtcbiAgICAgICAgY29uc3QgZWxlbWVudEluZGV4ID0gbGFzdFNlbGVjdGVkSXRlbUluZGV4IC0gMTtcbiAgICAgICAgY29uc3QgbGFzdFN1Z2dlc3Rpb25JdGVtSW5kZXggPSB0aGlzLnN1Z2dlc3Rpb25JdGVtcy5sZW5ndGggLSAxO1xuICAgICAgICBjb25zdCBpdGVtID0gdGhpcy5zdWdnZXN0aW9uSXRlbXNbZWxlbWVudEluZGV4IDwgMCA/IGxhc3RTdWdnZXN0aW9uSXRlbUluZGV4IDogZWxlbWVudEluZGV4XTtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3RlZEl0ZW0oaXRlbSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uS2V5RG93bkFycm93RG93bigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbGFzdFNlbGVjdGVkSXRlbUluZGV4ID0gdGhpcy5zdWdnZXN0aW9uSXRlbXMuaW5kZXhPZih0aGlzLmxhc3RTZWxlY3RlZEl0ZW0pO1xuICAgICAgICBjb25zdCBlbGVtZW50SW5kZXggPSBsYXN0U2VsZWN0ZWRJdGVtSW5kZXggKyAxO1xuICAgICAgICBjb25zdCBsYXN0U3VnZ2VzdGlvbkl0ZW1JbmRleCA9IHRoaXMuc3VnZ2VzdGlvbkl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnN1Z2dlc3Rpb25JdGVtc1tlbGVtZW50SW5kZXggPiBsYXN0U3VnZ2VzdGlvbkl0ZW1JbmRleCA/IDAgOiBlbGVtZW50SW5kZXhdO1xuICAgICAgICB0aGlzLmNoYW5nZVNlbGVjdGVkSXRlbShpdGVtKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25LZXlEb3duRW50ZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5sYXN0U2VsZWN0ZWRJdGVtLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBpbnB1dCB2YWx1ZSBhbmQgdGhlIHR5cGVkIHRleHQuXG4gICAgICovXG4gICAgY2xlYW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRUZXh0ID0gJyc7XG4gICAgICAgIHRoaXMuaW5wdXRWYWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGNzcyBxdWVyeSBzZWxlY3RvciBvZiB0aGUgc2VsZWN0ZWQgc3VnZ2VzdGlvbiBpdGVtcy5cbiAgICAgKi9cbiAgICBnZXQgc2VsZWN0ZWRJbnB1dENsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBkZXByZWNhdGlvbi9kZXByZWNhdGlvblxuICAgICAgICByZXR1cm4gYCR7dGhpcy5zdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lfS0tc2VsZWN0ZWRgIHx8IGAke3RoaXMuc3VnZ2VzdGVkSXRlbVNlbGVjdG9yfS0tc2VsZWN0ZWRgLnN1YnN0cigxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0eXBlZCB0ZXh0IGZyb20gdGhlIGZvcm0gZmllbGQuXG4gICAgICovXG4gICAgZ2V0IGlucHV0VGV4dCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0SW5wdXQudmFsdWUudHJpbSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgYW4gaW5wdXQgdGV4dC5cbiAgICAgKiBAcGFyYW0gdmFsdWUgQSB0eXBlZCB0ZXh0IGluIHRoZSBpbnB1dCBmaWVsZC5cbiAgICAgKi9cbiAgICBzZXQgaW5wdXRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50ZXh0SW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgZnJvbSB0aGUgaW5wdXQgZm9ybSBmaWVsZC5cbiAgICAgKi9cbiAgICBnZXQgaW5wdXRWYWx1ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUlucHV0LnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGlucHV0IHZhbHVlLlxuICAgICAqL1xuICAgIHNldCBpbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy52YWx1ZUlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3NzIHF1ZXJ5IHNlbGVjdG9yIGZvciB0aGUgYWpheFByb3ZpZGVyIGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgZ2V0IHF1ZXJ5U3RyaW5nKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncXVlcnktc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdmFsdWUgYXR0cmlidXRlIG5hbWUgZm9yIHRoZSBpbnB1dCBlbGVtZW50IGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgZ2V0IHZhbHVlQXR0cmlidXRlTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3ZhbHVlLWF0dHJpYnV0ZS1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgY3NzIHF1ZXJ5IHNlbGVjdG9yIG9mIHRoZSBzdWdnZXN0aW9uIGl0ZW1zLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHN1Z2dlc3RlZEl0ZW1DbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBzdWdnZXN0ZWRJdGVtU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzdWdnZXN0ZWQtaXRlbS1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgc3VnZ2VzdGVkSXRlbUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N1Z2dlc3RlZC1pdGVtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGluamVjdG9yc0V4dHJhUXVlcnlWYWx1ZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2luamVjdG9ycy1leHRyYS1xdWVyeS12YWx1ZS1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHRpbWUgZGVsYXkgZm9yIHRoZSBibHVyIGFuZCBpbnB1dCBldmVudHMuXG4gICAgICovXG4gICAgZ2V0IGRlYm91bmNlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnZGVib3VuY2UtZGVsYXknKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgbnVtYmVyIG9mIGxldHRlcnMgd2hpY2gsIHVwb24gZW50ZXJpbmcgaW4gZm9ybSBmaWVsZCwgaXMgc3VmZmljaWVudCB0byBzaG93LCBoaWRlIG9yIGxvYWQgdGhlXG4gICAgICogc3VnZ2VzdGlvbnMuXG4gICAgICovXG4gICAgZ2V0IG1pbkxldHRlcnMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnbWluLWxldHRlcnMnKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgYXV0byBsb2FkIG9mIHN1Z2dlc3Rpb25zIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgZ2V0IGF1dG9Jbml0RW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdhdXRvLWluaXQnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQXV0b2NvbXBsZXRlRm9ybUNvcmUiLCJBdXRvY29tcGxldGVGb3JtIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJwYXJlbnRXcmFwIiwiaW5pdCIsInBhcmVudFdyYXBDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0ZXh0SW5wdXQiLCJqc05hbWUiLCJhamF4UHJvdmlkZXIiLCJ2YWx1ZUlucHV0Iiwic3VnZ2VzdGlvbnNDb250YWluZXIiLCJjbGVhbkJ1dHRvbiIsIm1hcEV2ZW50cyIsInJlYWR5Q2FsbGJhY2siLCJvbkJsdXIiLCJoaWRlT3ZlcmxheSIsIm9uRm9jdXMiLCJzaG93T3ZlcmxheSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCIsImRlYm91bmNlIiwiRXZlbnRzIiwic3VnZ2VzdGlvbkl0ZW1zIiwibGFzdFNlbGVjdGVkSXRlbSIsImluamVjdG9yc0V4dHJhUXVlcnlWYWx1ZUxpc3QiLCJleHRyYVF1ZXJ5VmFsdWVzIiwiTWFwIiwiaW5qZWN0b3JzRXh0cmFRdWVyeVZhbHVlQ2xhc3NOYW1lIiwiQXJyYXkiLCJmcm9tIiwiYXV0b0luaXRFbmFibGVkIiwiYXV0b0xvYWRJbml0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uSW5wdXQiLCJkZWJvdW5jZURlbGF5IiwiZXZlbnQiLCJvbktleURvd24iLCJvbkNsZWFuQnV0dG9uQ2xpY2siLCJmb2N1cyIsImxvYWRTdWdnZXN0aW9ucyIsImNsZWFuIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIlVOU0VUIiwiaGlkZVN1Z2dlc3Rpb25zIiwiaW5wdXRUZXh0IiwibGVuZ3RoIiwibWluTGV0dGVycyIsInNob3dTdWdnZXN0aW9ucyIsIkNIQU5HRSIsImlucHV0VmFsdWUiLCJzZXRRdWVyeVBhcmFtcyIsImNsZWFyIiwicXVlcnlQYXJhbXMiLCJzZXQiLCJxdWVyeVN0cmluZyIsImZvckVhY2giLCJpdGVtIiwibmFtZSIsInZhbHVlIiwiX3RoaXMiLCJfYXN5bmNUb0dlbmVyYXRvciIsIkZFVENISU5HIiwiZmV0Y2giLCJzdWdnZXN0ZWRJdGVtQ2xhc3NOYW1lIiwicXVlcnlTZWxlY3RvckFsbCIsInN1Z2dlc3RlZEl0ZW1TZWxlY3RvciIsIm1hcFN1Z2dlc3Rpb25JdGVtc0V2ZW50cyIsIkZFVENIRUQiLCJvbkl0ZW1DbGljayIsIm9uSXRlbVNlbGVjdGVkIiwidGV4dENvbnRlbnQiLCJ0cmltIiwidmFsdWVBdHRyaWJ1dGVOYW1lIiwiU0VUIiwidGV4dCIsImV4dHJhVmFsdWVzIiwiY2hhbmdlU2VsZWN0ZWRJdGVtIiwic2VsZWN0ZWRJbnB1dENsYXNzIiwia2V5Iiwib25LZXlEb3duQXJyb3dVcCIsIm9uS2V5RG93bkFycm93RG93biIsIm9uS2V5RG93bkVudGVyIiwibGFzdFNlbGVjdGVkSXRlbUluZGV4IiwiaW5kZXhPZiIsImVsZW1lbnRJbmRleCIsImxhc3RTdWdnZXN0aW9uSXRlbUluZGV4IiwicHJldmVudERlZmF1bHQiLCJjbGljayIsInN1YnN0ciIsIk51bWJlciIsImhhc0F0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=