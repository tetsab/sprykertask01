"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["clipboard-copy"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClipboardCopy)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

var EVENT_COPY = 'copyToClipboard';

/**
 * @event copyToClipboard An event emitted when the component performs a copy.
 */
class ClipboardCopy extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.target = void 0;
    this.trigger = void 0;
    this.successCopyMessage = void 0;
    this.errorCopyMessage = void 0;
    this.durationTimeoutId = void 0;
    this.defaultDuration = 5000;
  }
  /**
   * Default message show duration.
   */
  readyCallback() {
    this.trigger = this.triggerClassName ? document.getElementsByClassName(this.triggerClassName)[0] :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelector(this.triggerSelector);
    this.target = this.targetClassName ? document.getElementsByClassName(this.targetClassName)[0] :
    // eslint-disable-next-line deprecation/deprecation
    document.querySelector(this.targetSelector);
    this.successCopyMessage = this.getElementsByClassName(this.jsName + "__success-message")[0];
    this.errorCopyMessage = this.getElementsByClassName(this.jsName + "__error-message")[0];
    this.mapEvents();
  }
  mapEvents() {
    this.trigger.addEventListener('click', () => this.onClick());
  }
  onClick() {
    this.copyToClipboard();
  }

  /**
   * Performs the copy to the clipboard and tells the component to show the message.
   */
  copyToClipboard() {
    if (!this.isCopyCommandSupported) {
      this.showMessage(this.errorCopyMessage, this.defaultDuration);
      return;
    }
    navigator.clipboard.writeText(this.target.value).then(() => {
      this.showMessage(this.successCopyMessage, this.defaultDuration);
      this.dispatchCustomEvent(EVENT_COPY);
    });
  }

  /**
   * Shows the message during the time set.
   * @param message A HTMLElement which contains the text message.
   * @param duration A number value which defines the period of time for which the message is shown.
   */
  showMessage(message, duration) {
    message.classList.remove(this.hideClassName);
    this.durationTimeoutId = window.setTimeout(() => this.hideMessage(message), duration);
  }

  /**
   * Hides the message.
   * @param message A HTMLElement which contains the text message.
   */
  hideMessage(message) {
    clearTimeout(this.durationTimeoutId);
    message.classList.add(this.hideClassName);
  }

  /**
   * Gets a css query selector to address the html element that will trigger the copy to clipboard.
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
   * Gets a css query selector to address the html element containing the text to copy.
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
   * Gets if a browser supports the automatically copy to clipboard feature.
   */
  get isCopyCommandSupported() {
    var _navigator, _navigator$clipboard;
    return Boolean((_navigator = navigator) == null ? void 0 : (_navigator$clipboard = _navigator.clipboard) == null ? void 0 : _navigator$clipboard.writeText);
  }

  /**
   * Gets a css class name for toggling an element.
   */
  get hideClassName() {
    return this.getAttribute('class-to-toggle');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBaUIsQ0FBQztJQUNwQ3VCLE9BQU8sQ0FBQ0UsU0FBUyxDQUFDTyxHQUFHLENBQUMsSUFBSSxDQUFDTCxhQUFhLENBQUM7RUFDN0M7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJLElBQUlwQixlQUFlQSxDQUFBLEVBQVc7SUFDMUIsT0FBTyxJQUFJLENBQUMwQixZQUFZLENBQUMsa0JBQWtCLENBQUM7RUFDaEQ7RUFDQSxJQUFjOUIsZ0JBQWdCQSxDQUFBLEVBQVc7SUFDckMsT0FBTyxJQUFJLENBQUM4QixZQUFZLENBQUMsb0JBQW9CLENBQUM7RUFDbEQ7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7QUFDQTtFQUNJLElBQUl4QixjQUFjQSxDQUFBLEVBQVc7SUFDekIsT0FBTyxJQUFJLENBQUN3QixZQUFZLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7RUFDQSxJQUFjekIsZUFBZUEsQ0FBQSxFQUFXO0lBQ3BDLE9BQU8sSUFBSSxDQUFDeUIsWUFBWSxDQUFDLG1CQUFtQixDQUFDO0VBQ2pEOztFQUVBO0FBQ0o7QUFDQTtFQUNJLElBQUlsQixzQkFBc0JBLENBQUEsRUFBWTtJQUFBLElBQUFtQixVQUFBLEVBQUFDLG9CQUFBO0lBQ2xDLE9BQU9DLE9BQU8sRUFBQUYsVUFBQSxHQUFDakIsU0FBUyxzQkFBQWtCLG9CQUFBLEdBQVRELFVBQUEsQ0FBV2hCLFNBQVMscUJBQXBCaUIsb0JBQUEsQ0FBc0JoQixTQUFTLENBQUM7RUFDbkQ7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBSVEsYUFBYUEsQ0FBQSxFQUFXO0lBQ3hCLE9BQU8sSUFBSSxDQUFDTSxZQUFZLENBQUMsaUJBQWlCLENBQUM7RUFDL0M7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jbGlwYm9hcmQtY29weS9jbGlwYm9hcmQtY29weS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgRVZFTlRfQ09QWSA9ICdjb3B5VG9DbGlwYm9hcmQnO1xuXG4vKipcbiAqIEBldmVudCBjb3B5VG9DbGlwYm9hcmQgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgcGVyZm9ybXMgYSBjb3B5LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDbGlwYm9hcmRDb3B5IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHN1Y2Nlc3NDb3B5TWVzc2FnZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGVycm9yQ29weU1lc3NhZ2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBkdXJhdGlvblRpbWVvdXRJZDogbnVtYmVyO1xuXG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBtZXNzYWdlIHNob3cgZHVyYXRpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgZGVmYXVsdER1cmF0aW9uOiBudW1iZXIgPSA1MDAwO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MQnV0dG9uRWxlbWVudD4odGhpcy50cmlnZ2VyQ2xhc3NOYW1lXG4gICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgOiAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZGVwcmVjYXRpb24vZGVwcmVjYXRpb25cbiAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRyaWdnZXJTZWxlY3RvcikpO1xuICAgICAgICB0aGlzLnRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudD4odGhpcy50YXJnZXRDbGFzc05hbWVcbiAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlbMF1cbiAgICAgICAgICAgIDogLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGRlcHJlY2F0aW9uL2RlcHJlY2F0aW9uXG4gICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3RvcikpO1xuICAgICAgICB0aGlzLnN1Y2Nlc3NDb3B5TWVzc2FnZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWNjZXNzLW1lc3NhZ2VgKVswXTtcbiAgICAgICAgdGhpcy5lcnJvckNvcHlNZXNzYWdlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2Vycm9yLW1lc3NhZ2VgKVswXTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLm9uQ2xpY2soKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29weVRvQ2xpcGJvYXJkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgdGhlIGNvcHkgdG8gdGhlIGNsaXBib2FyZCBhbmQgdGVsbHMgdGhlIGNvbXBvbmVudCB0byBzaG93IHRoZSBtZXNzYWdlLlxuICAgICAqL1xuICAgIGNvcHlUb0NsaXBib2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ29weUNvbW1hbmRTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UodGhpcy5lcnJvckNvcHlNZXNzYWdlLCB0aGlzLmRlZmF1bHREdXJhdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRoaXMudGFyZ2V0LnZhbHVlKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UodGhpcy5zdWNjZXNzQ29weU1lc3NhZ2UsIHRoaXMuZGVmYXVsdER1cmF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9DT1BZKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIG1lc3NhZ2UgZHVyaW5nIHRoZSB0aW1lIHNldC5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBBIEhUTUxFbGVtZW50IHdoaWNoIGNvbnRhaW5zIHRoZSB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIEEgbnVtYmVyIHZhbHVlIHdoaWNoIGRlZmluZXMgdGhlIHBlcmlvZCBvZiB0aW1lIGZvciB3aGljaCB0aGUgbWVzc2FnZSBpcyBzaG93bi5cbiAgICAgKi9cbiAgICBzaG93TWVzc2FnZShtZXNzYWdlOiBIVE1MRWxlbWVudCwgZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5oaWRlQ2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvblRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZU1lc3NhZ2UobWVzc2FnZSksIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBBIEhUTUxFbGVtZW50IHdoaWNoIGNvbnRhaW5zIHRoZSB0ZXh0IG1lc3NhZ2UuXG4gICAgICovXG4gICAgaGlkZU1lc3NhZ2UobWVzc2FnZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZHVyYXRpb25UaW1lb3V0SWQpO1xuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQodGhpcy5oaWRlQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY3NzIHF1ZXJ5IHNlbGVjdG9yIHRvIGFkZHJlc3MgdGhlIGh0bWwgZWxlbWVudCB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgY29weSB0byBjbGlwYm9hcmQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdHJpZ2dlckNsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNzcyBxdWVyeSBzZWxlY3RvciB0byBhZGRyZXNzIHRoZSBodG1sIGVsZW1lbnQgY29udGFpbmluZyB0aGUgdGV4dCB0byBjb3B5LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldENsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIGEgYnJvd3NlciBzdXBwb3J0cyB0aGUgYXV0b21hdGljYWxseSBjb3B5IHRvIGNsaXBib2FyZCBmZWF0dXJlLlxuICAgICAqL1xuICAgIGdldCBpc0NvcHlDb21tYW5kU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gQm9vbGVhbihuYXZpZ2F0b3I/LmNsaXBib2FyZD8ud3JpdGVUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY3NzIGNsYXNzIG5hbWUgZm9yIHRvZ2dsaW5nIGFuIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGhpZGVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiRVZFTlRfQ09QWSIsIkNsaXBib2FyZENvcHkiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsInRhcmdldCIsInRyaWdnZXIiLCJzdWNjZXNzQ29weU1lc3NhZ2UiLCJlcnJvckNvcHlNZXNzYWdlIiwiZHVyYXRpb25UaW1lb3V0SWQiLCJkZWZhdWx0RHVyYXRpb24iLCJyZWFkeUNhbGxiYWNrIiwidHJpZ2dlckNsYXNzTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3IiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJ0YXJnZXRDbGFzc05hbWUiLCJ0YXJnZXRTZWxlY3RvciIsImpzTmFtZSIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkNsaWNrIiwiY29weVRvQ2xpcGJvYXJkIiwiaXNDb3B5Q29tbWFuZFN1cHBvcnRlZCIsInNob3dNZXNzYWdlIiwibmF2aWdhdG9yIiwiY2xpcGJvYXJkIiwid3JpdGVUZXh0IiwidmFsdWUiLCJ0aGVuIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIm1lc3NhZ2UiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVDbGFzc05hbWUiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0IiwiaGlkZU1lc3NhZ2UiLCJjbGVhclRpbWVvdXQiLCJhZGQiLCJnZXRBdHRyaWJ1dGUiLCJfbmF2aWdhdG9yIiwiX25hdmlnYXRvciRjbGlwYm9hcmQiLCJCb29sZWFuIl0sInNvdXJjZVJvb3QiOiIifQ==