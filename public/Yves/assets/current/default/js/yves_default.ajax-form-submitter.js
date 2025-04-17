"use strict";
(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["ajax-form-submitter"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-form-submitter/ajax-form-submitter.ts":
/*!***********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-form-submitter/ajax-form-submitter.ts ***!
  \***********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AjaxFormSubmitter)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

var TAG_NAME = 'form';

/**
 * When data-form-data-url-builder attribute is assigned to the form while submitting to the url will be added query parameters as key value pairs from form fields.
 *
 * @example
 *
 * <form action="url-path" data-form-data-url-builder>
 *   <input name="a" value="A">
 *   <input name="b" value="B">
 *
 * url will be "url-path?a=A&b=B"
 */
var AJAX_FORM_DATA_URL_BUILDER = 'data-form-data-url-builder';

/**
 * It's possible to skip some field from the form data url builder by adding data-form-data-url-builder-skip-field attribute to the submit element with field name.
 *
 * @example
 *
 * <form action="url-path" data-form-data-url-builder>
 *   <input name="a" value="A">
 *   <input name="b" value="B">
 *   <input name="c" value="C">
 *
 *   <button data-form-data-url-builder-skip-field="c">Submit</button>
 *
 * url will be "url-path?b=B&c=C"
 */
var AJAX_FORM_DATA_URL_BUILDER_SKIP_FIELD = 'data-form-data-url-builder-skip-field';
class AjaxFormSubmitter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.provider = void 0;
  }
  readyCallback() {}
  init() {
    this.provider = document.querySelector("." + this.providerClassName);
    this.mapEvents();
  }
  mapEvents() {
    for (var event of this.eventName.split(':')) {
      var _this$parentElement;
      (_this$parentElement = this.parentElement) == null ? void 0 : _this$parentElement.addEventListener(event, _event => this.onEvent(_event));
    }
  }
  onEvent(event) {
    var trigger = event.target.closest("[" + this.triggerAttribute + "]");
    var eventFromTrigger = trigger == null ? void 0 : trigger.getAttribute(this.triggerAttribute);
    var isProperEvent = eventFromTrigger ? eventFromTrigger === event.type : true;
    if (!trigger || trigger && !isProperEvent) {
      return;
    }
    event.preventDefault();
    var form = trigger.closest(TAG_NAME);
    if (!form) {
      return;
    }
    this.onAjaxSubmit({
      form,
      trigger
    });
  }
  onAjaxSubmit(_ref) {
    var _trigger$getAttribute;
    var {
      form,
      trigger
    } = _ref;
    var formData = new FormData(form);
    var url = (_trigger$getAttribute = trigger.getAttribute('formaction')) != null ? _trigger$getAttribute : form.action;
    var parts = '';
    if (form.hasAttribute(AJAX_FORM_DATA_URL_BUILDER)) {
      var _trigger$getAttribute2;
      var _url = new URL(window.location.href);
      var searchParams = new URLSearchParams();
      var skipFields = (_trigger$getAttribute2 = trigger.getAttribute(AJAX_FORM_DATA_URL_BUILDER_SKIP_FIELD)) != null ? _trigger$getAttribute2 : '';
      for (var data of [...formData.entries()]) {
        if (data[0] === skipFields) {
          continue;
        }
        parts += data[0] + "=" + data[1] + "&";
        searchParams.set(data[0], data[1]);
      }
      _url.search = searchParams.toString();
      window.history.replaceState({}, '', _url.href);
    }
    var query = parts ? "?" + parts : '';
    this.provider.setAttribute('url', "" + url + query);
    if (form.method) {
      this.provider.setAttribute('method', form.method);
    }
    this.provider.fetch(formData);
  }
  get triggerAttribute() {
    return this.getAttribute('trigger-attribute');
  }
  get providerClassName() {
    return this.getAttribute('provider-class-name');
  }
  get eventName() {
    return this.getAttribute('event');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQkEsQ0FBQSxFQUFXO0lBQ3RDLE9BQU8sSUFBSSxDQUFDZSxZQUFZLENBQUMscUJBQXFCLENBQUM7RUFDbkQ7RUFFQSxJQUFjWixTQUFTQSxDQUFBLEVBQVc7SUFDOUIsT0FBTyxJQUFJLENBQUNZLFlBQVksQ0FBQyxPQUFPLENBQUM7RUFDckM7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LWZvcm0tc3VibWl0dGVyL2FqYXgtZm9ybS1zdWJtaXR0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgQWpheFByb3ZpZGVyIGZyb20gJy4uL2FqYXgtcHJvdmlkZXIvYWpheC1wcm92aWRlcic7XG5cbmNvbnN0IFRBR19OQU1FID0gJ2Zvcm0nO1xuXG4vKipcbiAqIFdoZW4gZGF0YS1mb3JtLWRhdGEtdXJsLWJ1aWxkZXIgYXR0cmlidXRlIGlzIGFzc2lnbmVkIHRvIHRoZSBmb3JtIHdoaWxlIHN1Ym1pdHRpbmcgdG8gdGhlIHVybCB3aWxsIGJlIGFkZGVkIHF1ZXJ5IHBhcmFtZXRlcnMgYXMga2V5IHZhbHVlIHBhaXJzIGZyb20gZm9ybSBmaWVsZHMuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiA8Zm9ybSBhY3Rpb249XCJ1cmwtcGF0aFwiIGRhdGEtZm9ybS1kYXRhLXVybC1idWlsZGVyPlxuICogICA8aW5wdXQgbmFtZT1cImFcIiB2YWx1ZT1cIkFcIj5cbiAqICAgPGlucHV0IG5hbWU9XCJiXCIgdmFsdWU9XCJCXCI+XG4gKlxuICogdXJsIHdpbGwgYmUgXCJ1cmwtcGF0aD9hPUEmYj1CXCJcbiAqL1xuY29uc3QgQUpBWF9GT1JNX0RBVEFfVVJMX0JVSUxERVIgPSAnZGF0YS1mb3JtLWRhdGEtdXJsLWJ1aWxkZXInO1xuXG4vKipcbiAqIEl0J3MgcG9zc2libGUgdG8gc2tpcCBzb21lIGZpZWxkIGZyb20gdGhlIGZvcm0gZGF0YSB1cmwgYnVpbGRlciBieSBhZGRpbmcgZGF0YS1mb3JtLWRhdGEtdXJsLWJ1aWxkZXItc2tpcC1maWVsZCBhdHRyaWJ1dGUgdG8gdGhlIHN1Ym1pdCBlbGVtZW50IHdpdGggZmllbGQgbmFtZS5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqIDxmb3JtIGFjdGlvbj1cInVybC1wYXRoXCIgZGF0YS1mb3JtLWRhdGEtdXJsLWJ1aWxkZXI+XG4gKiAgIDxpbnB1dCBuYW1lPVwiYVwiIHZhbHVlPVwiQVwiPlxuICogICA8aW5wdXQgbmFtZT1cImJcIiB2YWx1ZT1cIkJcIj5cbiAqICAgPGlucHV0IG5hbWU9XCJjXCIgdmFsdWU9XCJDXCI+XG4gKlxuICogICA8YnV0dG9uIGRhdGEtZm9ybS1kYXRhLXVybC1idWlsZGVyLXNraXAtZmllbGQ9XCJjXCI+U3VibWl0PC9idXR0b24+XG4gKlxuICogdXJsIHdpbGwgYmUgXCJ1cmwtcGF0aD9iPUImYz1DXCJcbiAqL1xuY29uc3QgQUpBWF9GT1JNX0RBVEFfVVJMX0JVSUxERVJfU0tJUF9GSUVMRCA9ICdkYXRhLWZvcm0tZGF0YS11cmwtYnVpbGRlci1za2lwLWZpZWxkJztcblxuaW50ZXJmYWNlIFN1Ym1pdFByb3BzIHtcbiAgICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgdHJpZ2dlcjogSFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4Rm9ybVN1Ym1pdHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHByb3ZpZGVyOiBBamF4UHJvdmlkZXI7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm92aWRlciA9IDxBamF4UHJvdmlkZXI+ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5wcm92aWRlckNsYXNzTmFtZX1gKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgZXZlbnQgb2YgdGhpcy5ldmVudE5hbWUuc3BsaXQoJzonKSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50Py5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCAoX2V2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkV2ZW50KF9ldmVudCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRXZlbnQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRyaWdnZXIgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jbG9zZXN0KGBbJHt0aGlzLnRyaWdnZXJBdHRyaWJ1dGV9XWApIGFzXG4gICAgICAgICAgICB8IEhUTUxCdXR0b25FbGVtZW50XG4gICAgICAgICAgICB8IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGV2ZW50RnJvbVRyaWdnZXIgPSB0cmlnZ2VyPy5nZXRBdHRyaWJ1dGUodGhpcy50cmlnZ2VyQXR0cmlidXRlKTtcbiAgICAgICAgY29uc3QgaXNQcm9wZXJFdmVudCA9IGV2ZW50RnJvbVRyaWdnZXIgPyBldmVudEZyb21UcmlnZ2VyID09PSBldmVudC50eXBlIDogdHJ1ZTtcblxuICAgICAgICBpZiAoIXRyaWdnZXIgfHwgKHRyaWdnZXIgJiYgIWlzUHJvcGVyRXZlbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PnRyaWdnZXIuY2xvc2VzdChUQUdfTkFNRSk7XG5cbiAgICAgICAgaWYgKCFmb3JtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uQWpheFN1Ym1pdCh7IGZvcm0sIHRyaWdnZXIgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWpheFN1Ym1pdCh7IGZvcm0sIHRyaWdnZXIgfTogU3VibWl0UHJvcHMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSk7XG4gICAgICAgIGNvbnN0IHVybCA9IHRyaWdnZXIuZ2V0QXR0cmlidXRlKCdmb3JtYWN0aW9uJykgPz8gZm9ybS5hY3Rpb247XG4gICAgICAgIGxldCBwYXJ0cyA9ICcnO1xuXG4gICAgICAgIGlmIChmb3JtLmhhc0F0dHJpYnV0ZShBSkFYX0ZPUk1fREFUQV9VUkxfQlVJTERFUikpIHtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICAgICAgICAgICAgY29uc3Qgc2tpcEZpZWxkcyA9IHRyaWdnZXIuZ2V0QXR0cmlidXRlKEFKQVhfRk9STV9EQVRBX1VSTF9CVUlMREVSX1NLSVBfRklFTEQpID8/ICcnO1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRhdGEgb2YgWy4uLihmb3JtRGF0YSBhcyB1bmtub3duIGFzIHsgZW50cmllczogKCkgPT4gW3N0cmluZywgc3RyaW5nXSB9KS5lbnRyaWVzKCldKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFbMF0gPT09IHNraXBGaWVsZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGFydHMgKz0gYCR7ZGF0YVswXX09JHtkYXRhWzFdfSZgO1xuICAgICAgICAgICAgICAgIHNlYXJjaFBhcmFtcy5zZXQoZGF0YVswXSwgZGF0YVsxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVybC5zZWFyY2ggPSBzZWFyY2hQYXJhbXMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgJycsIHVybC5ocmVmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gcGFydHMgPyBgPyR7cGFydHN9YCA6ICcnO1xuXG4gICAgICAgIHRoaXMucHJvdmlkZXIuc2V0QXR0cmlidXRlKCd1cmwnLCBgJHt1cmx9JHtxdWVyeX1gKTtcblxuICAgICAgICBpZiAoZm9ybS5tZXRob2QpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdmlkZXIuc2V0QXR0cmlidXRlKCdtZXRob2QnLCBmb3JtLm1ldGhvZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3ZpZGVyLmZldGNoKGZvcm1EYXRhKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJBdHRyaWJ1dGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWF0dHJpYnV0ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcHJvdmlkZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwcm92aWRlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBldmVudE5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdldmVudCcpO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJUQUdfTkFNRSIsIkFKQVhfRk9STV9EQVRBX1VSTF9CVUlMREVSIiwiQUpBWF9GT1JNX0RBVEFfVVJMX0JVSUxERVJfU0tJUF9GSUVMRCIsIkFqYXhGb3JtU3VibWl0dGVyIiwiY29uc3RydWN0b3IiLCJhcmd1bWVudHMiLCJwcm92aWRlciIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwicHJvdmlkZXJDbGFzc05hbWUiLCJtYXBFdmVudHMiLCJldmVudCIsImV2ZW50TmFtZSIsInNwbGl0IiwiX3RoaXMkcGFyZW50RWxlbWVudCIsInBhcmVudEVsZW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiX2V2ZW50Iiwib25FdmVudCIsInRyaWdnZXIiLCJ0YXJnZXQiLCJjbG9zZXN0IiwidHJpZ2dlckF0dHJpYnV0ZSIsImV2ZW50RnJvbVRyaWdnZXIiLCJnZXRBdHRyaWJ1dGUiLCJpc1Byb3BlckV2ZW50IiwidHlwZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybSIsIm9uQWpheFN1Ym1pdCIsIl9yZWYiLCJfdHJpZ2dlciRnZXRBdHRyaWJ1dGUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwidXJsIiwiYWN0aW9uIiwicGFydHMiLCJoYXNBdHRyaWJ1dGUiLCJfdHJpZ2dlciRnZXRBdHRyaWJ1dGUyIiwiVVJMIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwic2VhcmNoUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic2tpcEZpZWxkcyIsImRhdGEiLCJlbnRyaWVzIiwic2V0Iiwic2VhcmNoIiwidG9TdHJpbmciLCJoaXN0b3J5IiwicmVwbGFjZVN0YXRlIiwicXVlcnkiLCJzZXRBdHRyaWJ1dGUiLCJtZXRob2QiLCJmZXRjaCJdLCJzb3VyY2VSb290IjoiIn0=