"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["flash-message"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/flash-message/flash-message.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/flash-message/flash-message.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FlashMessage)
/* harmony export */ });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class FlashMessage extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.defaultDuration = 5000;
    this.durationTimeoutId = void 0;
  }
  /**
   * Default flash message show duration.
   */
  /**
   * The id of flash message timeout.
   */
  readyCallback() {
    this.mapEvents();
    window.setTimeout(() => this.showFor(this.defaultDuration));
  }
  mapEvents() {
    this.addEventListener('click', event => this.onClick(event));
  }
  onClick(event) {
    event.preventDefault();
    this.hide();
  }

  /**
   * Shows the flash message during the time set.
   * @param duration A number value which defines the period of time for which the flash message is shown.
   */
  showFor(duration) {
    this.classList.add(this.name + "--show");
    this.durationTimeoutId = window.setTimeout(() => this.hide(), duration);
  }

  /**
   * Hides the flash message.
   */
  hide() {
    clearTimeout(this.durationTimeoutId);
    this.classList.remove(this.name + "--show");
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuZmxhc2gtbWVzc2FnZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFrRDtBQUVuQyxNQUFNQyxZQUFZLFNBQVNELHlEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUl2Q0MsZUFBZSxHQUFXLElBQUk7SUFBQSxLQUt2Q0MsaUJBQWlCO0VBQUE7RUFSakI7QUFDSjtBQUNBO0VBR0k7QUFDSjtBQUNBO0VBR2NDLGFBQWFBLENBQUEsRUFBUztJQUM1QixJQUFJLENBQUNDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hCQyxNQUFNLENBQUNDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQ0MsT0FBTyxDQUFDLElBQUksQ0FBQ04sZUFBZSxDQUFDLENBQUM7RUFDL0Q7RUFFVUcsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0ksZ0JBQWdCLENBQUMsT0FBTyxFQUFHQyxLQUFZLElBQUssSUFBSSxDQUFDQyxPQUFPLENBQUNELEtBQUssQ0FBQyxDQUFDO0VBQ3pFO0VBRVVDLE9BQU9BLENBQUNELEtBQVksRUFBUTtJQUNsQ0EsS0FBSyxDQUFDRSxjQUFjLENBQUMsQ0FBQztJQUN0QixJQUFJLENBQUNDLElBQUksQ0FBQyxDQUFDO0VBQ2Y7O0VBRUE7QUFDSjtBQUNBO0FBQ0E7RUFDSUwsT0FBT0EsQ0FBQ00sUUFBZ0IsRUFBRTtJQUN0QixJQUFJLENBQUNDLFNBQVMsQ0FBQ0MsR0FBRyxDQUFJLElBQUksQ0FBQ0MsSUFBSSxXQUFRLENBQUM7SUFDeEMsSUFBSSxDQUFDZCxpQkFBaUIsR0FBR0csTUFBTSxDQUFDQyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUNNLElBQUksQ0FBQyxDQUFDLEVBQUVDLFFBQVEsQ0FBQztFQUMzRTs7RUFFQTtBQUNKO0FBQ0E7RUFDSUQsSUFBSUEsQ0FBQSxFQUFHO0lBQ0hLLFlBQVksQ0FBQyxJQUFJLENBQUNmLGlCQUFpQixDQUFDO0lBQ3BDLElBQUksQ0FBQ1ksU0FBUyxDQUFDSSxNQUFNLENBQUksSUFBSSxDQUFDRixJQUFJLFdBQVEsQ0FBQztFQUMvQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2ZsYXNoLW1lc3NhZ2UvZmxhc2gtbWVzc2FnZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGbGFzaE1lc3NhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIERlZmF1bHQgZmxhc2ggbWVzc2FnZSBzaG93IGR1cmF0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRlZmF1bHREdXJhdGlvbjogbnVtYmVyID0gNTAwMDtcblxuICAgIC8qKlxuICAgICAqIFRoZSBpZCBvZiBmbGFzaCBtZXNzYWdlIHRpbWVvdXQuXG4gICAgICovXG4gICAgZHVyYXRpb25UaW1lb3V0SWQ6IG51bWJlcjtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dGb3IodGhpcy5kZWZhdWx0RHVyYXRpb24pKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkNsaWNrKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBmbGFzaCBtZXNzYWdlIGR1cmluZyB0aGUgdGltZSBzZXQuXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIEEgbnVtYmVyIHZhbHVlIHdoaWNoIGRlZmluZXMgdGhlIHBlcmlvZCBvZiB0aW1lIGZvciB3aGljaCB0aGUgZmxhc2ggbWVzc2FnZSBpcyBzaG93bi5cbiAgICAgKi9cbiAgICBzaG93Rm9yKGR1cmF0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvblRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZSgpLCBkdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGZsYXNoIG1lc3NhZ2UuXG4gICAgICovXG4gICAgaGlkZSgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZHVyYXRpb25UaW1lb3V0SWQpO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoYCR7dGhpcy5uYW1lfS0tc2hvd2ApO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJGbGFzaE1lc3NhZ2UiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsImRlZmF1bHREdXJhdGlvbiIsImR1cmF0aW9uVGltZW91dElkIiwicmVhZHlDYWxsYmFjayIsIm1hcEV2ZW50cyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzaG93Rm9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25DbGljayIsInByZXZlbnREZWZhdWx0IiwiaGlkZSIsImR1cmF0aW9uIiwiY2xhc3NMaXN0IiwiYWRkIiwibmFtZSIsImNsZWFyVGltZW91dCIsInJlbW92ZSJdLCJzb3VyY2VSb290IjoiIn0=