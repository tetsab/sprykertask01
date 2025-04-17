"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["cart-configured-bundle-item-note"],{

/***/ "./src/Pyz/Yves/ConfigurableBundleNoteWidget/Theme/default/components/molecules/cart-configured-bundle-item-note/cart-configured-bundle-item-note.ts":
/*!***********************************************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ConfigurableBundleNoteWidget/Theme/default/components/molecules/cart-configured-bundle-item-note/cart-configured-bundle-item-note.ts ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartConfiguredBundleItemNote)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class CartConfiguredBundleItemNote extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.editButton = void 0;
    this.removeButton = void 0;
    this.formTarget = void 0;
    this.textTarget = void 0;
  }
  readyCallback() {}
  init() {
    this.editButton = this.getElementsByClassName(this.jsName + "__edit")[0];
    this.removeButton = this.getElementsByClassName(this.jsName + "__remove")[0];
    this.formTarget = this.getElementsByClassName(this.jsName + "__form")[0];
    this.textTarget = this.getElementsByClassName(this.jsName + "__text-wrap")[0];
    this.mapEvents();
  }
  mapEvents() {
    if (this.editButton) {
      this.editButton.addEventListener('click', () => this.onEditButtonClick());
    }
    if (this.removeButton) {
      this.removeButton.addEventListener('click', () => this.onRemoveButtonClick());
    }
  }
  onEditButtonClick() {
    this.classToggle(this.formTarget);
    this.classToggle(this.textTarget);
  }
  onRemoveButtonClick() {
    var form = this.formTarget.getElementsByTagName('form')[0];
    var textarea = form.getElementsByTagName('textarea')[0];
    textarea.value = '';
    form.submit();
  }
  classToggle(activeTrigger) {
    var isTriggerActive = activeTrigger.classList.contains(this.classToToggle);
    activeTrigger.classList.toggle(this.classToToggle, !isTriggerActive);
  }
  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY2FydC1jb25maWd1cmVkLWJ1bmRsZS1pdGVtLW5vdGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFFakMsTUFBTUMsNEJBQTRCLFNBQVNELCtEQUFTLENBQUM7RUFBQUUsWUFBQTtJQUFBLFNBQUFDLFNBQUE7SUFBQSxLQUN0REMsVUFBVTtJQUFBLEtBQ1ZDLFlBQVk7SUFBQSxLQUNaQyxVQUFVO0lBQUEsS0FDVkMsVUFBVTtFQUFBO0VBRVZDLGFBQWFBLENBQUEsRUFBUyxDQUFDO0VBRXZCQyxJQUFJQSxDQUFBLEVBQVM7SUFDbkIsSUFBSSxDQUFDTCxVQUFVLEdBQXNCLElBQUksQ0FBQ00sc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLFdBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzRixJQUFJLENBQUNOLFlBQVksR0FBc0IsSUFBSSxDQUFDSyxzQkFBc0IsQ0FBSSxJQUFJLENBQUNDLE1BQU0sYUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9GLElBQUksQ0FBQ0wsVUFBVSxHQUFnQixJQUFJLENBQUNJLHNCQUFzQixDQUFJLElBQUksQ0FBQ0MsTUFBTSxXQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckYsSUFBSSxDQUFDSixVQUFVLEdBQWdCLElBQUksQ0FBQ0csc0JBQXNCLENBQUksSUFBSSxDQUFDQyxNQUFNLGdCQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUYsSUFBSSxDQUFDQyxTQUFTLENBQUMsQ0FBQztFQUNwQjtFQUVVQSxTQUFTQSxDQUFBLEVBQVM7SUFDeEIsSUFBSSxJQUFJLENBQUNSLFVBQVUsRUFBRTtNQUNqQixJQUFJLENBQUNBLFVBQVUsQ0FBQ1MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDN0U7SUFFQSxJQUFJLElBQUksQ0FBQ1QsWUFBWSxFQUFFO01BQ25CLElBQUksQ0FBQ0EsWUFBWSxDQUFDUSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxJQUFJLENBQUNFLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUNqRjtFQUNKO0VBRVVELGlCQUFpQkEsQ0FBQSxFQUFTO0lBQ2hDLElBQUksQ0FBQ0UsV0FBVyxDQUFDLElBQUksQ0FBQ1YsVUFBVSxDQUFDO0lBQ2pDLElBQUksQ0FBQ1UsV0FBVyxDQUFDLElBQUksQ0FBQ1QsVUFBVSxDQUFDO0VBQ3JDO0VBRVVRLG1CQUFtQkEsQ0FBQSxFQUFTO0lBQ2xDLElBQU1FLElBQUksR0FBb0IsSUFBSSxDQUFDWCxVQUFVLENBQUNZLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxJQUFNQyxRQUFRLEdBQXdCRixJQUFJLENBQUNDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RUMsUUFBUSxDQUFDQyxLQUFLLEdBQUcsRUFBRTtJQUNuQkgsSUFBSSxDQUFDSSxNQUFNLENBQUMsQ0FBQztFQUNqQjtFQUVVTCxXQUFXQSxDQUFDTSxhQUEwQixFQUFRO0lBQ3BELElBQU1DLGVBQWUsR0FBR0QsYUFBYSxDQUFDRSxTQUFTLENBQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUNDLGFBQWEsQ0FBQztJQUM1RUosYUFBYSxDQUFDRSxTQUFTLENBQUNHLE1BQU0sQ0FBQyxJQUFJLENBQUNELGFBQWEsRUFBRSxDQUFDSCxlQUFlLENBQUM7RUFDeEU7RUFFQSxJQUFjRyxhQUFhQSxDQUFBLEVBQVc7SUFDbEMsT0FBTyxJQUFJLENBQUNFLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztFQUMvQztBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vc3JjL1B5ei9ZdmVzL0NvbmZpZ3VyYWJsZUJ1bmRsZU5vdGVXaWRnZXQvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9jYXJ0LWNvbmZpZ3VyZWQtYnVuZGxlLWl0ZW0tbm90ZS9jYXJ0LWNvbmZpZ3VyZWQtYnVuZGxlLWl0ZW0tbm90ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydENvbmZpZ3VyZWRCdW5kbGVJdGVtTm90ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGVkaXRCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCByZW1vdmVCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBmb3JtVGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdGV4dFRhcmdldDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5lZGl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2VkaXRgKVswXTtcbiAgICAgICAgdGhpcy5yZW1vdmVCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcmVtb3ZlYClbMF07XG4gICAgICAgIHRoaXMuZm9ybVRhcmdldCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19mb3JtYClbMF07XG4gICAgICAgIHRoaXMudGV4dFRhcmdldCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190ZXh0LXdyYXBgKVswXTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25FZGl0QnV0dG9uQ2xpY2soKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZW1vdmVCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vblJlbW92ZUJ1dHRvbkNsaWNrKCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRWRpdEJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNsYXNzVG9nZ2xlKHRoaXMuZm9ybVRhcmdldCk7XG4gICAgICAgIHRoaXMuY2xhc3NUb2dnbGUodGhpcy50ZXh0VGFyZ2V0KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZW1vdmVCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+dGhpcy5mb3JtVGFyZ2V0LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJylbMF07XG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gPEhUTUxUZXh0QXJlYUVsZW1lbnQ+Zm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndGV4dGFyZWEnKVswXTtcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSAnJztcbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xhc3NUb2dnbGUoYWN0aXZlVHJpZ2dlcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNUcmlnZ2VyQWN0aXZlID0gYWN0aXZlVHJpZ2dlci5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc1RvVG9nZ2xlKTtcbiAgICAgICAgYWN0aXZlVHJpZ2dlci5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgIWlzVHJpZ2dlckFjdGl2ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjbGFzc1RvVG9nZ2xlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIkNhcnRDb25maWd1cmVkQnVuZGxlSXRlbU5vdGUiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsImVkaXRCdXR0b24iLCJyZW1vdmVCdXR0b24iLCJmb3JtVGFyZ2V0IiwidGV4dFRhcmdldCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkVkaXRCdXR0b25DbGljayIsIm9uUmVtb3ZlQnV0dG9uQ2xpY2siLCJjbGFzc1RvZ2dsZSIsImZvcm0iLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInRleHRhcmVhIiwidmFsdWUiLCJzdWJtaXQiLCJhY3RpdmVUcmlnZ2VyIiwiaXNUcmlnZ2VyQWN0aXZlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGFzc1RvVG9nZ2xlIiwidG9nZ2xlIiwiZ2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==