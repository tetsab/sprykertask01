"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-content-clear"],{

/***/ "./vendor/spryker/content-gui/assets/Zed/js/modules/form-clear.js":
/*!************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/modules/form-clear.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  $('.clear-fields').click(function (e) {
    var subform = $($(this).data('tab'));
    var elements = subform.find('input, textarea, select');
    for (var i = 0; i < elements.length; i++) {
      var fieldType = elements[i].type.toLowerCase();
      switch (fieldType) {
        case 'text':
        case 'password':
        case 'email':
        case 'tel':
        case 'textarea':
          elements[i].value = '';
          break;
        case 'radio':
        case 'checkbox':
          if (elements[i].checked) {
            elements[i].checked = false;
          }
          break;
        case 'select-one':
        case 'select-multi':
          elements[i].selectedIndex = -1;
          $('#select2-' + elements[i].id + '-container')[0].innerText = elements[i][0].innerText;
          break;
        default:
          break;
      }
    }
  });
});

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-clear.entry.js":
/*!*************************************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-clear.entry.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



if (!window.ContentGui) {
  __webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/content-gui/assets/Zed/sass/main.scss");
  __webpack_require__(/*! ./modules/form-clear */ "./vendor/spryker/content-gui/assets/Zed/js/modules/form-clear.js");
  window.ContentGui = true;
}

/***/ }),

/***/ "./vendor/spryker/content-gui/assets/Zed/sass/main.scss":
/*!**************************************************************!*\
  !*** ./vendor/spryker/content-gui/assets/Zed/sass/main.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/content-gui/assets/Zed/js/spryker-zed-content-clear.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jb250ZW50LWNsZWFyLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYkEsQ0FBQyxDQUFDQyxRQUFRLENBQUMsQ0FBQ0MsS0FBSyxDQUFDLFlBQVk7RUFDMUJGLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQ0csS0FBSyxDQUFDLFVBQVVDLENBQUMsRUFBRTtJQUNsQyxJQUFJQyxPQUFPLEdBQUdMLENBQUMsQ0FBQ0EsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDTSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsSUFBSUMsUUFBUSxHQUFHRixPQUFPLENBQUNHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUV0RCxLQUFLLElBQUlDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR0YsUUFBUSxDQUFDRyxNQUFNLEVBQUVELENBQUMsRUFBRSxFQUFFO01BQ3RDLElBQUlFLFNBQVMsR0FBR0osUUFBUSxDQUFDRSxDQUFDLENBQUMsQ0FBQ0csSUFBSSxDQUFDQyxXQUFXLENBQUMsQ0FBQztNQUU5QyxRQUFRRixTQUFTO1FBQ2IsS0FBSyxNQUFNO1FBQ1gsS0FBSyxVQUFVO1FBQ2YsS0FBSyxPQUFPO1FBQ1osS0FBSyxLQUFLO1FBQ1YsS0FBSyxVQUFVO1VBQ1hKLFFBQVEsQ0FBQ0UsQ0FBQyxDQUFDLENBQUNLLEtBQUssR0FBRyxFQUFFO1VBQ3RCO1FBRUosS0FBSyxPQUFPO1FBQ1osS0FBSyxVQUFVO1VBQ1gsSUFBSVAsUUFBUSxDQUFDRSxDQUFDLENBQUMsQ0FBQ00sT0FBTyxFQUFFO1lBQ3JCUixRQUFRLENBQUNFLENBQUMsQ0FBQyxDQUFDTSxPQUFPLEdBQUcsS0FBSztVQUMvQjtVQUNBO1FBRUosS0FBSyxZQUFZO1FBQ2pCLEtBQUssY0FBYztVQUNmUixRQUFRLENBQUNFLENBQUMsQ0FBQyxDQUFDTyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1VBQzlCaEIsQ0FBQyxDQUFDLFdBQVcsR0FBR08sUUFBUSxDQUFDRSxDQUFDLENBQUMsQ0FBQ1EsRUFBRSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEdBQUdYLFFBQVEsQ0FBQ0UsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNTLFNBQVM7VUFDdEY7UUFFSjtVQUNJO01BQ1I7SUFDSjtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQzFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixJQUFJLENBQUNDLE1BQU0sQ0FBQ0MsVUFBVSxFQUFFO0VBQ3BCQyxtQkFBTyxDQUFDLGlGQUFtQixDQUFDO0VBQzVCQSxtQkFBTyxDQUFDLDhGQUFzQixDQUFDO0VBQy9CRixNQUFNLENBQUNDLFVBQVUsR0FBRyxJQUFJO0FBQzVCOzs7Ozs7Ozs7OztBQ1hBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29udGVudC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL2Zvcm0tY2xlYXIuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvY29udGVudC1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jb250ZW50LWNsZWFyLmVudHJ5LmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2NvbnRlbnQtZ3VpL2Fzc2V0cy9aZWQvc2Fzcy9tYWluLnNjc3M/Yjc4ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNi1wcmVzZW50IFNwcnlrZXIgU3lzdGVtcyBHbWJILiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogVXNlIG9mIHRoaXMgc29mdHdhcmUgcmVxdWlyZXMgYWNjZXB0YW5jZSBvZiB0aGUgRXZhbHVhdGlvbiBMaWNlbnNlIEFncmVlbWVudC4gU2VlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuY2xlYXItZmllbGRzJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIHN1YmZvcm0gPSAkKCQodGhpcykuZGF0YSgndGFiJykpO1xuICAgICAgICB2YXIgZWxlbWVudHMgPSBzdWJmb3JtLmZpbmQoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0Jyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGZpZWxkVHlwZSA9IGVsZW1lbnRzW2ldLnR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgc3dpdGNoIChmaWVsZFR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0ZXh0JzpcbiAgICAgICAgICAgICAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZW1haWwnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ3RlbCc6XG4gICAgICAgICAgICAgICAgY2FzZSAndGV4dGFyZWEnOlxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50c1tpXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3Qtb25lJzpcbiAgICAgICAgICAgICAgICBjYXNlICdzZWxlY3QtbXVsdGknOlxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICQoJyNzZWxlY3QyLScgKyBlbGVtZW50c1tpXS5pZCArICctY29udGFpbmVyJylbMF0uaW5uZXJUZXh0ID0gZWxlbWVudHNbaV1bMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKCF3aW5kb3cuQ29udGVudEd1aSkge1xuICAgIHJlcXVpcmUoJy4uL3Nhc3MvbWFpbi5zY3NzJyk7XG4gICAgcmVxdWlyZSgnLi9tb2R1bGVzL2Zvcm0tY2xlYXInKTtcbiAgICB3aW5kb3cuQ29udGVudEd1aSA9IHRydWU7XG59XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJjbGljayIsImUiLCJzdWJmb3JtIiwiZGF0YSIsImVsZW1lbnRzIiwiZmluZCIsImkiLCJsZW5ndGgiLCJmaWVsZFR5cGUiLCJ0eXBlIiwidG9Mb3dlckNhc2UiLCJ2YWx1ZSIsImNoZWNrZWQiLCJzZWxlY3RlZEluZGV4IiwiaWQiLCJpbm5lclRleHQiLCJ3aW5kb3ciLCJDb250ZW50R3VpIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=