"use strict";
(globalThis["webpackChunkspryker_b2c_demo_shop"] = globalThis["webpackChunkspryker_b2c_demo_shop"] || []).push([["spryker-zed-cms-block-category-connector-main"],{

/***/ "./vendor/spryker/cms-block-category-connector/assets/Zed/js/modules/main.js":
/*!***********************************************************************************!*\
  !*** ./vendor/spryker/cms-block-category-connector/assets/Zed/js/modules/main.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



$(document).ready(function () {
  var onCategoryTemplateSelectChange = function ($item) {
    var idCategoryTemplate = $item.val();
    if (!idCategoryTemplate) {
      $("select[id^='category_id_cms_blocks_']").each(function (key, selectCmsBlock) {
        $(selectCmsBlock).prev('label').hide();
        $(selectCmsBlock).next('.select2-container').hide();
      });
      return;
    }
    var nameCategoryTemplate = $item.find('option[value=' + idCategoryTemplate + ']').html();
    $("select[id^='category_id_cms_blocks_']").each(function (key, item) {
      var assignedCmsBlocks = $(item).data('assigned-cms-blocks');
      var template = $(item).data('template');
      if (nameCategoryTemplate === template) {
        $(item).prev('label').show();
        $(item).next('.select2-container').show();
      } else {
        $(item).prev('label').hide();
        $(item).next('.select2-container').hide();
      }
      if (assignedCmsBlocks) {
        $.each(assignedCmsBlocks, function (index, value) {
          const option = $(item).find('option[value=' + value + ']');
          $(item).append(option);
        });
      }
      $(item).trigger('change.select2');
      $(item).on('select2:select', function (e) {
        $(this).append($(e.params.data.element));
        $(this).trigger('change.select2');
      });
    });
  };
  var $categoryTemplateSelect = $('[name=category\\[fk_category_template\\]]');
  $categoryTemplateSelect.on('change', function () {
    onCategoryTemplateSelectChange($(this));
  });
  onCategoryTemplateSelectChange($categoryTemplateSelect);
});

/***/ }),

/***/ "./vendor/spryker/cms-block-category-connector/assets/Zed/js/spryker-zed-cms-block-category-connector-main.entry.js":
/*!**************************************************************************************************************************!*\
  !*** ./vendor/spryker/cms-block-category-connector/assets/Zed/js/spryker-zed-cms-block-category-connector-main.entry.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */



__webpack_require__(/*! ./modules/main */ "./vendor/spryker/cms-block-category-connector/assets/Zed/js/modules/main.js");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./vendor/spryker/cms-block-category-connector/assets/Zed/js/spryker-zed-cms-block-category-connector-main.entry.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9zcHJ5a2VyLXplZC1jbXMtYmxvY2stY2F0ZWdvcnktY29ubmVjdG9yLW1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViQSxDQUFDLENBQUNDLFFBQVEsQ0FBQyxDQUFDQyxLQUFLLENBQUMsWUFBWTtFQUMxQixJQUFJQyw4QkFBOEIsR0FBRyxTQUFBQSxDQUFVQyxLQUFLLEVBQUU7SUFDbEQsSUFBSUMsa0JBQWtCLEdBQUdELEtBQUssQ0FBQ0UsR0FBRyxDQUFDLENBQUM7SUFFcEMsSUFBSSxDQUFDRCxrQkFBa0IsRUFBRTtNQUNyQkwsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDLENBQUNPLElBQUksQ0FBQyxVQUFVQyxHQUFHLEVBQUVDLGNBQWMsRUFBRTtRQUMzRVQsQ0FBQyxDQUFDUyxjQUFjLENBQUMsQ0FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQztRQUN0Q1gsQ0FBQyxDQUFDUyxjQUFjLENBQUMsQ0FBQ0csSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUNELElBQUksQ0FBQyxDQUFDO01BQ3ZELENBQUMsQ0FBQztNQUVGO0lBQ0o7SUFFQSxJQUFJRSxvQkFBb0IsR0FBR1QsS0FBSyxDQUFDVSxJQUFJLENBQUMsZUFBZSxHQUFHVCxrQkFBa0IsR0FBRyxHQUFHLENBQUMsQ0FBQ1UsSUFBSSxDQUFDLENBQUM7SUFFeEZmLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDTyxJQUFJLENBQUMsVUFBVUMsR0FBRyxFQUFFUSxJQUFJLEVBQUU7TUFDakUsSUFBSUMsaUJBQWlCLEdBQUdqQixDQUFDLENBQUNnQixJQUFJLENBQUMsQ0FBQ0UsSUFBSSxDQUFDLHFCQUFxQixDQUFDO01BQzNELElBQUlDLFFBQVEsR0FBR25CLENBQUMsQ0FBQ2dCLElBQUksQ0FBQyxDQUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDO01BRXZDLElBQUlMLG9CQUFvQixLQUFLTSxRQUFRLEVBQUU7UUFDbkNuQixDQUFDLENBQUNnQixJQUFJLENBQUMsQ0FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDVSxJQUFJLENBQUMsQ0FBQztRQUM1QnBCLENBQUMsQ0FBQ2dCLElBQUksQ0FBQyxDQUFDSixJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQ1EsSUFBSSxDQUFDLENBQUM7TUFDN0MsQ0FBQyxNQUFNO1FBQ0hwQixDQUFDLENBQUNnQixJQUFJLENBQUMsQ0FBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDQyxJQUFJLENBQUMsQ0FBQztRQUM1QlgsQ0FBQyxDQUFDZ0IsSUFBSSxDQUFDLENBQUNKLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDRCxJQUFJLENBQUMsQ0FBQztNQUM3QztNQUVBLElBQUlNLGlCQUFpQixFQUFFO1FBQ25CakIsQ0FBQyxDQUFDTyxJQUFJLENBQUNVLGlCQUFpQixFQUFFLFVBQVVJLEtBQUssRUFBRUMsS0FBSyxFQUFFO1VBQzlDLE1BQU1DLE1BQU0sR0FBR3ZCLENBQUMsQ0FBQ2dCLElBQUksQ0FBQyxDQUFDRixJQUFJLENBQUMsZUFBZSxHQUFHUSxLQUFLLEdBQUcsR0FBRyxDQUFDO1VBQzFEdEIsQ0FBQyxDQUFDZ0IsSUFBSSxDQUFDLENBQUNRLE1BQU0sQ0FBQ0QsTUFBTSxDQUFDO1FBQzFCLENBQUMsQ0FBQztNQUNOO01BRUF2QixDQUFDLENBQUNnQixJQUFJLENBQUMsQ0FBQ1MsT0FBTyxDQUFDLGdCQUFnQixDQUFDO01BRWpDekIsQ0FBQyxDQUFDZ0IsSUFBSSxDQUFDLENBQUNVLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVQyxDQUFDLEVBQUU7UUFDdEMzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUN3QixNQUFNLENBQUN4QixDQUFDLENBQUMyQixDQUFDLENBQUNDLE1BQU0sQ0FBQ1YsSUFBSSxDQUFDVyxPQUFPLENBQUMsQ0FBQztRQUN4QzdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQ3lCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztNQUNyQyxDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDO0VBRUQsSUFBSUssdUJBQXVCLEdBQUc5QixDQUFDLENBQUMsMkNBQTJDLENBQUM7RUFFNUU4Qix1QkFBdUIsQ0FBQ0osRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZO0lBQzdDdkIsOEJBQThCLENBQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMzQyxDQUFDLENBQUM7RUFFRkcsOEJBQThCLENBQUMyQix1QkFBdUIsQ0FBQztBQUMzRCxDQUFDLENBQUM7Ozs7Ozs7Ozs7QUN6REY7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWJDLG1CQUFPLENBQUMsbUdBQWdCLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi92ZW5kb3Ivc3ByeWtlci9jbXMtYmxvY2stY2F0ZWdvcnktY29ubmVjdG9yL2Fzc2V0cy9aZWQvanMvbW9kdWxlcy9tYWluLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyL2Ntcy1ibG9jay1jYXRlZ29yeS1jb25uZWN0b3IvYXNzZXRzL1plZC9qcy9zcHJ5a2VyLXplZC1jbXMtYmxvY2stY2F0ZWdvcnktY29ubmVjdG9yLW1haW4uZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYtcHJlc2VudCBTcHJ5a2VyIFN5c3RlbXMgR21iSC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIFVzZSBvZiB0aGlzIHNvZnR3YXJlIHJlcXVpcmVzIGFjY2VwdGFuY2Ugb2YgdGhlIEV2YWx1YXRpb24gTGljZW5zZSBBZ3JlZW1lbnQuIFNlZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9uQ2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdENoYW5nZSA9IGZ1bmN0aW9uICgkaXRlbSkge1xuICAgICAgICB2YXIgaWRDYXRlZ29yeVRlbXBsYXRlID0gJGl0ZW0udmFsKCk7XG5cbiAgICAgICAgaWYgKCFpZENhdGVnb3J5VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICQoXCJzZWxlY3RbaWRePSdjYXRlZ29yeV9pZF9jbXNfYmxvY2tzXyddXCIpLmVhY2goZnVuY3Rpb24gKGtleSwgc2VsZWN0Q21zQmxvY2spIHtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdENtc0Jsb2NrKS5wcmV2KCdsYWJlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKHNlbGVjdENtc0Jsb2NrKS5uZXh0KCcuc2VsZWN0Mi1jb250YWluZXInKS5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5hbWVDYXRlZ29yeVRlbXBsYXRlID0gJGl0ZW0uZmluZCgnb3B0aW9uW3ZhbHVlPScgKyBpZENhdGVnb3J5VGVtcGxhdGUgKyAnXScpLmh0bWwoKTtcblxuICAgICAgICAkKFwic2VsZWN0W2lkXj0nY2F0ZWdvcnlfaWRfY21zX2Jsb2Nrc18nXVwiKS5lYWNoKGZ1bmN0aW9uIChrZXksIGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBhc3NpZ25lZENtc0Jsb2NrcyA9ICQoaXRlbSkuZGF0YSgnYXNzaWduZWQtY21zLWJsb2NrcycpO1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gJChpdGVtKS5kYXRhKCd0ZW1wbGF0ZScpO1xuXG4gICAgICAgICAgICBpZiAobmFtZUNhdGVnb3J5VGVtcGxhdGUgPT09IHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgJChpdGVtKS5wcmV2KCdsYWJlbCcpLnNob3coKTtcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLm5leHQoJy5zZWxlY3QyLWNvbnRhaW5lcicpLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChpdGVtKS5wcmV2KCdsYWJlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLm5leHQoJy5zZWxlY3QyLWNvbnRhaW5lcicpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFzc2lnbmVkQ21zQmxvY2tzKSB7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGFzc2lnbmVkQ21zQmxvY2tzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9ICQoaXRlbSkuZmluZCgnb3B0aW9uW3ZhbHVlPScgKyB2YWx1ZSArICddJyk7XG4gICAgICAgICAgICAgICAgICAgICQoaXRlbSkuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICQoaXRlbSkudHJpZ2dlcignY2hhbmdlLnNlbGVjdDInKTtcblxuICAgICAgICAgICAgJChpdGVtKS5vbignc2VsZWN0MjpzZWxlY3QnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYXBwZW5kKCQoZS5wYXJhbXMuZGF0YS5lbGVtZW50KSk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50cmlnZ2VyKCdjaGFuZ2Uuc2VsZWN0MicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB2YXIgJGNhdGVnb3J5VGVtcGxhdGVTZWxlY3QgPSAkKCdbbmFtZT1jYXRlZ29yeVxcXFxbZmtfY2F0ZWdvcnlfdGVtcGxhdGVcXFxcXV0nKTtcblxuICAgICRjYXRlZ29yeVRlbXBsYXRlU2VsZWN0Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9uQ2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdENoYW5nZSgkKHRoaXMpKTtcbiAgICB9KTtcblxuICAgIG9uQ2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdENoYW5nZSgkY2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdCk7XG59KTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE2LXByZXNlbnQgU3ByeWtlciBTeXN0ZW1zIEdtYkguIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBVc2Ugb2YgdGhpcyBzb2Z0d2FyZSByZXF1aXJlcyBhY2NlcHRhbmNlIG9mIHRoZSBFdmFsdWF0aW9uIExpY2Vuc2UgQWdyZWVtZW50LiBTZWUgTElDRU5TRSBmaWxlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxucmVxdWlyZSgnLi9tb2R1bGVzL21haW4nKTtcbiJdLCJuYW1lcyI6WyIkIiwiZG9jdW1lbnQiLCJyZWFkeSIsIm9uQ2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdENoYW5nZSIsIiRpdGVtIiwiaWRDYXRlZ29yeVRlbXBsYXRlIiwidmFsIiwiZWFjaCIsImtleSIsInNlbGVjdENtc0Jsb2NrIiwicHJldiIsImhpZGUiLCJuZXh0IiwibmFtZUNhdGVnb3J5VGVtcGxhdGUiLCJmaW5kIiwiaHRtbCIsIml0ZW0iLCJhc3NpZ25lZENtc0Jsb2NrcyIsImRhdGEiLCJ0ZW1wbGF0ZSIsInNob3ciLCJpbmRleCIsInZhbHVlIiwib3B0aW9uIiwiYXBwZW5kIiwidHJpZ2dlciIsIm9uIiwiZSIsInBhcmFtcyIsImVsZW1lbnQiLCIkY2F0ZWdvcnlUZW1wbGF0ZVNlbGVjdCIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9