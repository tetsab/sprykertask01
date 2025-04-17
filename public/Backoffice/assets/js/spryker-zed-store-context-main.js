"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-store-context-main"],{

/***/ "./vendor/spryker/store-context-gui/assets/Zed/js/modules/store-context.js":
/*!*********************************************************************************!*\
  !*** ./vendor/spryker/store-context-gui/assets/Zed/js/modules/store-context.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  const storeContextItemSelector = '.store-context-item';
  const dataItemIndex = 'item-index';
  function indexContexts() {
    $(storeContextItemSelector).each(function (i, item) {
      $(item).data(dataItemIndex, i);
    });
  }
  function disableSelectedApplication() {
    const $selectedContexts = $(storeContextItemSelector).find('.select-application').map(function () {
      return $(this).val();
    }).get();
    $(storeContextItemSelector).find('select').each(function () {
      const $select = $(this);
      $select.find('option').each(function () {
        const $option = $(this);
        if ($selectedContexts.includes($option.val())) {
          $option.prop('disabled', true);
        } else {
          $option.prop('disabled', false);
        }
      });
    });
  }

  /**
   * @param event {Event}
   */
  function addStoreContextItem(event) {
    event.preventDefault();
    let maxIndex = 0;
    $(storeContextItemSelector).each(function (i, item) {
      const index = $(item).data(dataItemIndex);
      if (index > maxIndex) {
        maxIndex = index;
      }
    });
    const newContextItemIndex = maxIndex + 1;
    const prototypeTemplate = $(event.target).closest('[data-context-collection-prototype]');
    const newOptionFormHTML = prototypeTemplate.data('contextCollectionPrototype').replace(/__store_context__/g, newContextItemIndex).trim();
    $('.wrapper-context-items').append($(newOptionFormHTML));
    indexContexts();
  }

  /**
   * @param event {Event}
   */
  function deleteStoreContextItem(event) {
    event.preventDefault();
    $(event.target).closest('.store-context-item').remove();
  }

  /**
   * Register global event listeners
   */
  $('body').on('click', '.add-store-context', addStoreContextItem).on('click', '.remove-store-context', deleteStoreContextItem);

  /**
   * Initialize
   */
  indexContexts();
});

/***/ }),

/***/ "./vendor/spryker/store-context-gui/assets/Zed/js/spryker-zed-store-context-main.entry.js":
/*!************************************************************************************************!*\
  !*** ./vendor/spryker/store-context-gui/assets/Zed/js/spryker-zed-store-context-main.entry.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ../sass/main.scss */ "./vendor/spryker/store-context-gui/assets/Zed/sass/main.scss");
__webpack_require__(/*! ./modules/store-context */ "./vendor/spryker/store-context-gui/assets/Zed/js/modules/store-context.js");

/***/ }),

/***/ "./vendor/spryker/store-context-gui/assets/Zed/sass/main.scss":
/*!********************************************************************!*\
  !*** ./vendor/spryker/store-context-gui/assets/Zed/sass/main.scss ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/store-context-gui/assets/Zed/js/spryker-zed-store-context-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1zdG9yZS1jb250ZXh0LW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixNQUFNQyx3QkFBd0IsR0FBRyxxQkFBcUI7RUFDdEQsTUFBTUMsYUFBYSxHQUFHLFlBQVk7RUFFbEMsU0FBU0MsYUFBYUEsQ0FBQSxFQUFHO0lBQ3JCTCxDQUFDLENBQUNHLHdCQUF3QixDQUFDLENBQUNHLElBQUksQ0FBQyxVQUFVQyxDQUFDLEVBQUVDLElBQUksRUFBRTtNQUNoRFIsQ0FBQyxDQUFDUSxJQUFJLENBQUMsQ0FBQ0MsSUFBSSxDQUFDTCxhQUFhLEVBQUVHLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNHLDBCQUEwQkEsQ0FBQSxFQUFHO0lBQ2xDLE1BQU1DLGlCQUFpQixHQUFHWCxDQUFDLENBQUNHLHdCQUF3QixDQUFDLENBQ2hEUyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FDM0JDLEdBQUcsQ0FBQyxZQUFZO01BQ2IsT0FBT2IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDYyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FDREMsR0FBRyxDQUFDLENBQUM7SUFFVmYsQ0FBQyxDQUFDRyx3QkFBd0IsQ0FBQyxDQUN0QlMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUNkTixJQUFJLENBQUMsWUFBWTtNQUNkLE1BQU1VLE9BQU8sR0FBR2hCLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDdkJnQixPQUFPLENBQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQ04sSUFBSSxDQUFDLFlBQVk7UUFDcEMsTUFBTVcsT0FBTyxHQUFHakIsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJVyxpQkFBaUIsQ0FBQ08sUUFBUSxDQUFDRCxPQUFPLENBQUNILEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUMzQ0csT0FBTyxDQUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztRQUNsQyxDQUFDLE1BQU07VUFDSEYsT0FBTyxDQUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUNuQztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNWOztFQUVBO0FBQ0o7QUFDQTtFQUNJLFNBQVNDLG1CQUFtQkEsQ0FBQ0MsS0FBSyxFQUFFO0lBQ2hDQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBRXRCLElBQUlDLFFBQVEsR0FBRyxDQUFDO0lBRWhCdkIsQ0FBQyxDQUFDRyx3QkFBd0IsQ0FBQyxDQUFDRyxJQUFJLENBQUMsVUFBVUMsQ0FBQyxFQUFFQyxJQUFJLEVBQUU7TUFDaEQsTUFBTWdCLEtBQUssR0FBR3hCLENBQUMsQ0FBQ1EsSUFBSSxDQUFDLENBQUNDLElBQUksQ0FBQ0wsYUFBYSxDQUFDO01BQ3pDLElBQUlvQixLQUFLLEdBQUdELFFBQVEsRUFBRTtRQUNsQkEsUUFBUSxHQUFHQyxLQUFLO01BQ3BCO0lBQ0osQ0FBQyxDQUFDO0lBRUYsTUFBTUMsbUJBQW1CLEdBQUdGLFFBQVEsR0FBRyxDQUFDO0lBRXhDLE1BQU1HLGlCQUFpQixHQUFHMUIsQ0FBQyxDQUFDcUIsS0FBSyxDQUFDTSxNQUFNLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLHFDQUFxQyxDQUFDO0lBQ3hGLE1BQU1DLGlCQUFpQixHQUFHSCxpQkFBaUIsQ0FDdENqQixJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FDbENxQixPQUFPLENBQUMsb0JBQW9CLEVBQUVMLG1CQUFtQixDQUFDLENBQ2xETSxJQUFJLENBQUMsQ0FBQztJQUVYL0IsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLENBQUNnQyxNQUFNLENBQUNoQyxDQUFDLENBQUM2QixpQkFBaUIsQ0FBQyxDQUFDO0lBRXhEeEIsYUFBYSxDQUFDLENBQUM7RUFDbkI7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksU0FBUzRCLHNCQUFzQkEsQ0FBQ1osS0FBSyxFQUFFO0lBQ25DQSxLQUFLLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ3RCdEIsQ0FBQyxDQUFDcUIsS0FBSyxDQUFDTSxNQUFNLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUNNLE1BQU0sQ0FBQyxDQUFDO0VBQzNEOztFQUVBO0FBQ0o7QUFDQTtFQUNJbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUNKbUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRWYsbUJBQW1CLENBQUMsQ0FDdERlLEVBQUUsQ0FBQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUVGLHNCQUFzQixDQUFDOztFQUVqRTtBQUNKO0FBQ0E7RUFDSTVCLGFBQWEsQ0FBQyxDQUFDO0FBQ25CLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQ3ZGRjtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYitCLG1CQUFPLENBQUMsdUZBQW1CLENBQUM7QUFDNUJBLG1CQUFPLENBQUMsMEdBQXlCLENBQUM7Ozs7Ozs7Ozs7O0FDUmxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc3RvcmUtY29udGV4dC1ndWkvYXNzZXRzL1plZC9qcy9tb2R1bGVzL3N0b3JlLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc3RvcmUtY29udGV4dC1ndWkvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1zdG9yZS1jb250ZXh0LW1haW4uZW50cnkuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vdmVuZG9yL3NwcnlrZXIvc3RvcmUtY29udGV4dC1ndWkvYXNzZXRzL1plZC9zYXNzL21haW4uc2Nzcz85MDc0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHN0b3JlQ29udGV4dEl0ZW1TZWxlY3RvciA9ICcuc3RvcmUtY29udGV4dC1pdGVtJztcbiAgICBjb25zdCBkYXRhSXRlbUluZGV4ID0gJ2l0ZW0taW5kZXgnO1xuXG4gICAgZnVuY3Rpb24gaW5kZXhDb250ZXh0cygpIHtcbiAgICAgICAgJChzdG9yZUNvbnRleHRJdGVtU2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGksIGl0ZW0pIHtcbiAgICAgICAgICAgICQoaXRlbSkuZGF0YShkYXRhSXRlbUluZGV4LCBpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGlzYWJsZVNlbGVjdGVkQXBwbGljYXRpb24oKSB7XG4gICAgICAgIGNvbnN0ICRzZWxlY3RlZENvbnRleHRzID0gJChzdG9yZUNvbnRleHRJdGVtU2VsZWN0b3IpXG4gICAgICAgICAgICAuZmluZCgnLnNlbGVjdC1hcHBsaWNhdGlvbicpXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZ2V0KCk7XG5cbiAgICAgICAgJChzdG9yZUNvbnRleHRJdGVtU2VsZWN0b3IpXG4gICAgICAgICAgICAuZmluZCgnc2VsZWN0JylcbiAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAkc2VsZWN0LmZpbmQoJ29wdGlvbicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkb3B0aW9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCRzZWxlY3RlZENvbnRleHRzLmluY2x1ZGVzKCRvcHRpb24udmFsKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkb3B0aW9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkb3B0aW9uLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQge0V2ZW50fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFkZFN0b3JlQ29udGV4dEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBsZXQgbWF4SW5kZXggPSAwO1xuXG4gICAgICAgICQoc3RvcmVDb250ZXh0SXRlbVNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChpLCBpdGVtKSB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICQoaXRlbSkuZGF0YShkYXRhSXRlbUluZGV4KTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IG1heEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbWF4SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgbmV3Q29udGV4dEl0ZW1JbmRleCA9IG1heEluZGV4ICsgMTtcblxuICAgICAgICBjb25zdCBwcm90b3R5cGVUZW1wbGF0ZSA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCdbZGF0YS1jb250ZXh0LWNvbGxlY3Rpb24tcHJvdG90eXBlXScpO1xuICAgICAgICBjb25zdCBuZXdPcHRpb25Gb3JtSFRNTCA9IHByb3RvdHlwZVRlbXBsYXRlXG4gICAgICAgICAgICAuZGF0YSgnY29udGV4dENvbGxlY3Rpb25Qcm90b3R5cGUnKVxuICAgICAgICAgICAgLnJlcGxhY2UoL19fc3RvcmVfY29udGV4dF9fL2csIG5ld0NvbnRleHRJdGVtSW5kZXgpXG4gICAgICAgICAgICAudHJpbSgpO1xuXG4gICAgICAgICQoJy53cmFwcGVyLWNvbnRleHQtaXRlbXMnKS5hcHBlbmQoJChuZXdPcHRpb25Gb3JtSFRNTCkpO1xuXG4gICAgICAgIGluZGV4Q29udGV4dHMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZXZlbnQge0V2ZW50fVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRlbGV0ZVN0b3JlQ29udGV4dEl0ZW0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJy5zdG9yZS1jb250ZXh0LWl0ZW0nKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBnbG9iYWwgZXZlbnQgbGlzdGVuZXJzXG4gICAgICovXG4gICAgJCgnYm9keScpXG4gICAgICAgIC5vbignY2xpY2snLCAnLmFkZC1zdG9yZS1jb250ZXh0JywgYWRkU3RvcmVDb250ZXh0SXRlbSlcbiAgICAgICAgLm9uKCdjbGljaycsICcucmVtb3ZlLXN0b3JlLWNvbnRleHQnLCBkZWxldGVTdG9yZUNvbnRleHRJdGVtKTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVcbiAgICAgKi9cbiAgICBpbmRleENvbnRleHRzKCk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi4vc2Fzcy9tYWluLnNjc3MnKTtcbnJlcXVpcmUoJy4vbW9kdWxlcy9zdG9yZS1jb250ZXh0Jyk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiJCIsImRvY3VtZW50IiwicmVhZHkiLCJzdG9yZUNvbnRleHRJdGVtU2VsZWN0b3IiLCJkYXRhSXRlbUluZGV4IiwiaW5kZXhDb250ZXh0cyIsImVhY2giLCJpIiwiaXRlbSIsImRhdGEiLCJkaXNhYmxlU2VsZWN0ZWRBcHBsaWNhdGlvbiIsIiRzZWxlY3RlZENvbnRleHRzIiwiZmluZCIsIm1hcCIsInZhbCIsImdldCIsIiRzZWxlY3QiLCIkb3B0aW9uIiwiaW5jbHVkZXMiLCJwcm9wIiwiYWRkU3RvcmVDb250ZXh0SXRlbSIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJtYXhJbmRleCIsImluZGV4IiwibmV3Q29udGV4dEl0ZW1JbmRleCIsInByb3RvdHlwZVRlbXBsYXRlIiwidGFyZ2V0IiwiY2xvc2VzdCIsIm5ld09wdGlvbkZvcm1IVE1MIiwicmVwbGFjZSIsInRyaW0iLCJhcHBlbmQiLCJkZWxldGVTdG9yZUNvbnRleHRJdGVtIiwicmVtb3ZlIiwib24iLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==