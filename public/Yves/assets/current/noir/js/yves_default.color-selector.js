"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["color-selector"],{

/***/ "./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts":
/*!**************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/product-group-widget/src/SprykerShop/Yves/ProductGroupWidget/Theme/default/components/molecules/color-selector/color-selector.ts ***!
  \**************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorSelector)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class ColorSelector extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.triggers = void 0;
    this.currentSelection = void 0;
  }
  readyCallback() {}
  init() {
    this.triggers = Array.from(this.getElementsByClassName(this.jsName + "__item"));
    this.mapEvents();
  }
  mapEvents() {
    this.mapTriggerMouseenterEvent();
  }
  mapTriggerMouseenterEvent() {
    this.triggers.forEach(element => {
      element.addEventListener('mouseenter', event => this.onTriggerSelection(event));
    });
  }
  onTriggerSelection(event) {
    event.preventDefault();
    this.currentSelection = event.currentTarget;
    this.resetActiveItemSelections();
    this.setActiveItemSelection();
  }
  resetActiveItemSelections() {
    this.triggers.forEach(element => {
      element.classList.remove(this.activeItemClassName);
    });
  }
  setActiveItemSelection(selection) {
    (selection || this.currentSelection).classList.add(this.activeItemClassName);
  }
  get activeItemClassName() {
    return this.getAttribute('active-item-class-name');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY29sb3Itc2VsZWN0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsYUFBYSxTQUFTRCwrREFBUyxDQUFDO0VBQUFFLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDdkNDLFFBQVE7SUFBQSxLQUNSQyxnQkFBZ0I7RUFBQTtFQUVoQkMsYUFBYUEsQ0FBQSxFQUFTLENBQUM7RUFFdkJDLElBQUlBLENBQUEsRUFBUztJQUNuQixJQUFJLENBQUNILFFBQVEsR0FBa0JJLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQ0Msc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLFdBQVEsQ0FBQyxDQUFDO0lBRTlGLElBQUksQ0FBQ0MsU0FBUyxDQUFDLENBQUM7RUFDcEI7RUFFVUEsU0FBU0EsQ0FBQSxFQUFTO0lBQ3hCLElBQUksQ0FBQ0MseUJBQXlCLENBQUMsQ0FBQztFQUNwQztFQUVVQSx5QkFBeUJBLENBQUEsRUFBRztJQUNsQyxJQUFJLENBQUNULFFBQVEsQ0FBQ1UsT0FBTyxDQUFFQyxPQUFvQixJQUFLO01BQzVDQSxPQUFPLENBQUNDLGdCQUFnQixDQUFDLFlBQVksRUFBR0MsS0FBWSxJQUFLLElBQUksQ0FBQ0Msa0JBQWtCLENBQUNELEtBQUssQ0FBQyxDQUFDO0lBQzVGLENBQUMsQ0FBQztFQUNOO0VBRVVDLGtCQUFrQkEsQ0FBQ0QsS0FBWSxFQUFRO0lBQzdDQSxLQUFLLENBQUNFLGNBQWMsQ0FBQyxDQUFDO0lBQ3RCLElBQUksQ0FBQ2QsZ0JBQWdCLEdBQWdCWSxLQUFLLENBQUNHLGFBQWE7SUFDeEQsSUFBSSxDQUFDQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQ0Msc0JBQXNCLENBQUMsQ0FBQztFQUNqQztFQUVVRCx5QkFBeUJBLENBQUEsRUFBUztJQUN4QyxJQUFJLENBQUNqQixRQUFRLENBQUNVLE9BQU8sQ0FBRUMsT0FBb0IsSUFBSztNQUM1Q0EsT0FBTyxDQUFDUSxTQUFTLENBQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUNDLG1CQUFtQixDQUFDO0lBQ3RELENBQUMsQ0FBQztFQUNOO0VBRVVILHNCQUFzQkEsQ0FBQ0ksU0FBdUIsRUFBUTtJQUM1RCxDQUFDQSxTQUFTLElBQUksSUFBSSxDQUFDckIsZ0JBQWdCLEVBQUVrQixTQUFTLENBQUNJLEdBQUcsQ0FBQyxJQUFJLENBQUNGLG1CQUFtQixDQUFDO0VBQ2hGO0VBRUEsSUFBY0EsbUJBQW1CQSxDQUFBLEVBQVc7SUFDeEMsT0FBTyxJQUFJLENBQUNHLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQztFQUN0RDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9wcm9kdWN0LWdyb3VwLXdpZGdldC9zcmMvU3ByeWtlclNob3AvWXZlcy9Qcm9kdWN0R3JvdXBXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jb2xvci1zZWxlY3Rvci9jb2xvci1zZWxlY3Rvci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sb3JTZWxlY3RvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjdXJyZW50U2VsZWN0aW9uOiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pdGVtYCkpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyTW91c2VlbnRlckV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJNb3VzZWVudGVyRXZlbnQoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyU2VsZWN0aW9uKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJTZWxlY3Rpb24oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY3VycmVudFNlbGVjdGlvbiA9IDxIVE1MRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLnJlc2V0QWN0aXZlSXRlbVNlbGVjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVJdGVtU2VsZWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlc2V0QWN0aXZlSXRlbVNlbGVjdGlvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZUl0ZW1DbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0QWN0aXZlSXRlbVNlbGVjdGlvbihzZWxlY3Rpb24/OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICAoc2VsZWN0aW9uIHx8IHRoaXMuY3VycmVudFNlbGVjdGlvbikuY2xhc3NMaXN0LmFkZCh0aGlzLmFjdGl2ZUl0ZW1DbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlSXRlbUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2FjdGl2ZS1pdGVtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiQ29sb3JTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiYXJndW1lbnRzIiwidHJpZ2dlcnMiLCJjdXJyZW50U2VsZWN0aW9uIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwibWFwVHJpZ2dlck1vdXNlZW50ZXJFdmVudCIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25UcmlnZ2VyU2VsZWN0aW9uIiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwicmVzZXRBY3RpdmVJdGVtU2VsZWN0aW9ucyIsInNldEFjdGl2ZUl0ZW1TZWxlY3Rpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhY3RpdmVJdGVtQ2xhc3NOYW1lIiwic2VsZWN0aW9uIiwiYWRkIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==