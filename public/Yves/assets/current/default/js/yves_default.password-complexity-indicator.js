(globalThis["webpackJsonp_yves_default"] = globalThis["webpackJsonp_yves_default"] || []).push([["password-complexity-indicator"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-complexity-indicator/password-complexity-indicator.ts":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-complexity-indicator/password-complexity-indicator.ts ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PasswordComplexityIndicator)
/* harmony export */ });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! password-validator */ "./node_modules/password-validator/src/index.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(password_validator__WEBPACK_IMPORTED_MODULE_1__);



var ComplexityWeight;
(function (ComplexityWeight) {
  ComplexityWeight[ComplexityWeight["lowercase"] = 10] = "lowercase";
  ComplexityWeight[ComplexityWeight["digits"] = 15] = "digits";
  ComplexityWeight[ComplexityWeight["uppercase"] = 20] = "uppercase";
  ComplexityWeight[ComplexityWeight["symbols"] = 30] = "symbols";
  ComplexityWeight[ComplexityWeight["min"] = 25] = "min";
})(ComplexityWeight || (ComplexityWeight = {}));
class PasswordComplexityIndicator extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);
    this.availableProperties = ['min', 'lowercase', 'uppercase', 'digits', 'symbols'];
    this.complexityGradation = new Map([['weak', 0], ['medium', 25], ['strong', 50], ['very-strong', 75]]);
    this.currentComplexity = '';
    this.maxPasswordComplexity = 0;
    this.factor = 100;
    this.inputElement = void 0;
    this.notificationElement = void 0;
    this.indicatorListElement = void 0;
    this.schema = void 0;
  }
  /* eslint-disable @typescript-eslint/no-magic-numbers */
  /* eslint-enable */
  readyCallback() {}
  init() {
    this.inputElement = document.getElementsByClassName(this.inputClassName)[0];
    this.indicatorListElement = this.getElementsByClassName(this.indicatorListClassName)[0];
    this.notificationElement = this.getElementsByClassName(this.additionalMessageClassName)[0];
    this.schema = new (password_validator__WEBPACK_IMPORTED_MODULE_1___default())();
    this.initValidator();
    this.mapEvents();
  }
  mapEvents() {
    this.mapInputElementKeyUpEvent();
  }
  mapInputElementKeyUpEvent() {
    this.inputElement.addEventListener('keyup', (0,lodash_es_debounce__WEBPACK_IMPORTED_MODULE_2__["default"])(() => this.onInputKeyUp(), this.debounceDelay));
  }
  initValidator() {
    this.availableProperties.forEach(property => {
      this.setValidation(property);
      this.increaseMaxPasswordComplexity(property);
    });
  }
  increaseMaxPasswordComplexity(property) {
    this.maxPasswordComplexity += ComplexityWeight[property];
  }
  setValidation(property) {
    var propertyValue = this[property];
    if (property === 'min') {
      this.setIsValidationType(property, propertyValue);
      return;
    }
    this.setHasValidationType(property, propertyValue);
  }
  setHasValidationType(property, value) {
    this.schema.has()[property](value);
  }
  setIsValidationType(property, value) {
    this.schema.is()[property](value);
  }
  onInputKeyUp() {
    var inputValue = this.inputElement.value;
    var failsList = this.schema.validate(inputValue, {
      list: true
    });
    var passwordValidatorMark = this.maxPasswordComplexity;
    failsList.forEach(property => {
      passwordValidatorMark -= ComplexityWeight[property];
    });
    this.validatePassword(passwordValidatorMark);
  }
  validatePassword(passwordValidatorMark) {
    var passwordComplexity = passwordValidatorMark / this.maxPasswordComplexity * this.factor;
    this.complexityGradation.forEach((value, key) => {
      if (passwordComplexity >= value) {
        this.updateValidation(key);
      }
    });
  }
  updateValidation(complexityModifier) {
    this.updateModifier(this.indicatorListElement, this.indicatorListClassName, complexityModifier);
    this.updateModifier(this.notificationElement, this.additionalMessageClassName, complexityModifier);
    this.currentComplexity = complexityModifier;
  }
  updateModifier(element, className, complexityModifier) {
    var classList = element.classList;
    classList.remove(className + "--" + this.currentComplexity);
    classList.add(className + "--" + complexityModifier);
  }
  get inputClassName() {
    return this.getAttribute('input-class-name');
  }
  get indicatorListClassName() {
    return this.name + "__indicator-list";
  }
  get additionalMessageClassName() {
    return this.name + "__additional-message";
  }
  get debounceDelay() {
    return Number(this.getAttribute('debounce-delay'));
  }
  get min() {
    return Number(this.getAttribute('min'));
  }
  get lowercase() {
    return Number(this.getAttribute('lowercase'));
  }
  get uppercase() {
    return Number(this.getAttribute('uppercase'));
  }
  get digits() {
    return Number(this.getAttribute('digits'));
  }
  get symbols() {
    return Number(this.getAttribute('symbols'));
  }
}

/***/ }),

/***/ "./node_modules/password-validator/src/constants.js":
/*!**********************************************************!*\
  !*** ./node_modules/password-validator/src/constants.js ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string',
    invalidPlugin: 'Plugin should be a valid function',
  },
  regex: {
    digits: '(\\d.*)',
    letters: '([a-zA-Z].*)',
    symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)',
    spaces: '([\\s].*)'
  }
};


/***/ }),

/***/ "./node_modules/password-validator/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/password-validator/src/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable no-unused-vars */
var lib = __webpack_require__(/*! ./lib */ "./node_modules/password-validator/src/lib.js");
var error = (__webpack_require__(/*! ./constants */ "./node_modules/password-validator/src/constants.js").error);
var getValidationMessage = __webpack_require__(/*! ./validationMessages */ "./node_modules/password-validator/src/validationMessages.js");

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(error.length);
  }
}

/**
 * Tests a validation and return the result
 *
 * @private
 * @param {string} property - Property to validate
 * @returns {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(property) {
  return lib[property.method].apply(this, property.arguments);
}

/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} method - Property name
 * @param {array} arguments - arguments for the func property
 * @returns {PasswordValidator}
 */
function _register(method, args, description) {
  // Add property to the schema
  this.properties.push({ method, arguments: args, description });
  return this;
}

class PasswordValidator {
  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor() {
    this.properties = [];
  }

  /**
   * Method to validate the password against schema
   *
   * @param {string} pwd - password to validate
   * @param {object} [options] - optional options to configure validation
   * @param {boolean} [options.list] - asks for a list of validation
   *           failures instead of just true/false
   * @param {boolean} [options.details] - asks for more details about
   *           failed validations including arguments, and error messages
   * @returns {boolean|array} Boolean value indicting the validity
   *           of the password as per schema, if 'options.list' or
   *           'options.details' is not set. Otherwise, it returns an
   *           array of property names which failed validations
   */
  validate(pwd, options) {
    this.list = Boolean(options && options.list);
    this.details = Boolean(options && options.details);
    this.password = String(pwd);

    this.positive = true;

    if (this.list || this.details) {
      return this.properties.reduce((errorList, property) => {
        // Applies all validations defined in lib one by one
        if (!_isPasswordValidFor.call(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          var detail = property.method;
          // If the details option was provided,
          // return a rich object including validation message
          if (this.details) {
            detail = { validation: property.method };
            if (property.arguments && property.arguments[0]) {
              detail.arguments = property.arguments[0];
            }

            if (!this.positive && property.method !== 'not') {
              detail.inverted = true;
            }
            var description = property.arguments && property.arguments[1];
            var validationMessage = description || getValidationMessage(property.method, detail.arguments, detail.inverted);
            detail.message = validationMessage;
          }

          return errorList.concat(detail);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }

  /**
   * Rule to mandate the presence of letters in the password
   *
   * @param {number} [count] - minimum number of letters required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  letters(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'letters', arguments);
  }

  /**
   * Rule to mandate the presence of digits in the password
   *
   * @param {number} [count] - minimum number of digits required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  digits(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'digits', arguments);
  }

  /**
   * Rule to mandate the presence of symbols in the password
   *
   * @param {number} [count] - minimum number of symbols required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  symbols(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'symbols', arguments);
  }

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  min(num, description) {
    _validateLength(num);
    return _register.call(this, 'min', arguments);
  }

  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  max(num, description) {
    _validateLength(num);
    return _register.call(this, 'max', arguments);
  }

  /**
   * Rule to mandate the presence of lowercase letters in the password
   *
   * @param {number} [count] - minimum number of lowercase letters required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  lowercase(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'lowercase', arguments);
  }

  /**
   * Rule to mandate the presence of uppercase letters in the password
   *
   * @param {number} [count] - minimum number of uppercase letters required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  uppercase(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'uppercase', arguments);
  }

  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   *
   * @param {number} [count] - minimum number of spaces required
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  spaces(count, description) {
    count && _validateLength(count);
    return _register.call(this, 'spaces', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   *
   * @param {string|RegExp} [pattern] - pattern to match
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  has(pattern, description) {
    return _register.call(this, 'has', arguments);
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   *
   * @param {string|RegExp} [pattern] - pattern to not match
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  not(pattern, description) {
    return _register.call(this, 'not', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   *
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  is() {
    return _register.call(this, 'is', arguments);
  }

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  oneOf(list, description) {
    return _register.call(this, 'oneOf', arguments);
  }

  /**
   * Insert a plugin function into the validation chain
   *
   * @param {Plugin} fn  - A plugin function
   * @param {string} [description] - description of the validation
   * @returns {PasswordValidator} instance of PasswordValidator schema
   */
  usingPlugin(fn, description) {
    if (typeof fn !== 'function') {
      throw new Error(error.invalidPlugin);
    }
    return _register.call(this, 'usingPlugin', arguments);
  }
}

module.exports = PasswordValidator;

/**
 * @callback Plugin
 * @param password Password injected by the library
 */


/***/ }),

/***/ "./node_modules/password-validator/src/lib.js":
/*!****************************************************!*\
  !*** ./node_modules/password-validator/src/lib.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
var regex = (__webpack_require__(/*! ./constants */ "./node_modules/password-validator/src/constants.js").regex);

function _process(regexp, repeat) {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat, 10);
    return new RegExp(regexp + '{' + parsedRepeat + ',}').test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}

module.exports = {

  /**
   * Method to invert the next validations
   *
   * @param {RegExp} [symbol] - custom Regex which should not be present
   */
  not: function not(symbol) {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} [symbol] - custom Regex which should be present
   */
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not() and
   * to make the api readable and chainable
   *
   */
  is: function is() {
    this.positive = true;
    return true;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  min: function min(num) {
    return this.password.length >= num;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  max: function max(num) {
    return this.password.length <= num;
  },

  /**
   * Method to validate the presence of digits
   *
   * @param {number} repeat - count of required digits
   */
  digits: function digits(repeat) {
    return _process.call(this, regex.digits, repeat);
  },

  /**
   * Method to validate the presence of letters
   *
   * @param {number} repeat - count of required letters
   */
  letters: function letters(repeat) {
    return _process.call(this, regex.letters, repeat);
  },

  /**
   * Method to validate the presence of uppercase letters
   *
   * @param {number} repeat - count of required uppercase letters
   */
  uppercase: function uppercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let upperCaseLetters = 0;

      while ((upperCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toLowerCase()) {
          upperCaseLetters++;
        }
        characterIndex++;
      }

      return (upperCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toLowerCase()) === this.positive;
  },

  /**
   * Method to validate the presence of lowercase letters
   *
   * @param {number} repeat - count of required lowercase letters
   */
  lowercase: function lowercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let lowerCaseLetters = 0;

      while ((lowerCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toUpperCase()) {
          lowerCaseLetters++;
        }
        characterIndex++;
      }

      return (lowerCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toUpperCase()) === this.positive;
  },

  /**
   * Method to validate the presence of symbols
   *
   * @param {number} repeat - count of required symbols
   */
  symbols: function symbols(repeat) {
    return _process.call(this, regex.symbols, repeat);
  },

  /**
   * Method to validate the presence of space
   *
   * @param {number} repeat - count of required spaces
   */
  spaces: function spaces(repeat) {
    return _process.call(this, regex.spaces, repeat);
  },

  /**
   * Method to provide pre-defined values for password
   *
   * @param {array} list - list of values allowed
   */
  oneOf: function oneOf(list) {
    return list.indexOf(this.password) >= 0 === this.positive;
  },

  /**
   * Method to run a plugin function for password
   *
   * @param {function} plugin - A plugin function
   */
  usingPlugin: function usingPlugin(fn) {
    try {
      const result = fn.call({}, this.password);
      return Boolean(result) === this.positive;
    } catch (err) {
      return false;
    }
  }
};



/***/ }),

/***/ "./node_modules/password-validator/src/validationMessages.js":
/*!*******************************************************************!*\
  !*** ./node_modules/password-validator/src/validationMessages.js ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = function (method, arg, inverted) {
  const msgList = inverted ? negativeMessages : positiveMessages;
  return msgList[method] && msgList[method](arg);
};

const positiveMessages = {
  min: (num) => `The string should have a minimum length of ${num} character${pluralify(num)}`,
  max: (num) => `The string should have a maximum length of ${num} character${pluralify(num)}`,
  letters: (num = 1) => `The string should have a minimum of ${num} letter${pluralify(num)}`,
  digits: (num = 1) => `The string should have a minimum of ${num} digit${pluralify(num)}`,
  uppercase: (num = 1) => `The string should have a minimum of ${num} uppercase letter${pluralify(num)}`,
  lowercase: (num = 1) => `The string should have a minimum of ${num} lowercase letter${pluralify(num)}`,
  symbols: (num = 1) => `The string should have a minimum of ${num} symbol${pluralify(num)}`,
  spaces: (num = 1) => `The string should have a minimum of ${num} space${pluralify(num)}`,
  oneOf: (list) => `The string should be ${list.length > 1 ? `one of ${list.slice(0, -1).join(', ')} and ` : ''}${list[list.length - 1]}`,
  has: (pattern) => `The string should have pattern '${pattern}'`,
  not: (pattern) => `The string should not have pattern '${pattern}'`,
  usingPlugin: (fn) => `The string should not violate ${fn.name || 'plugin'}`,
};

const negativeMessages = {
  min: (num) => `The string should have a maximum length of ${num} character${pluralify(num)}`,
  max: (num) => `The string should have a minimum length of ${num} character${pluralify(num)}`,
  letters: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} letter${pluralify(num)}`,
  digits: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} digit${pluralify(num)}`,
  uppercase: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} uppercase letter${pluralify(num)}`,
  lowercase: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} lowercase letter${pluralify(num)}`,
  symbols: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} symbol${pluralify(num)}`,
  spaces: (num = 0) => `The string should ${num === 0 ? 'not have' : `have a maximum of ${num}`} space${pluralify(num)}`,
  oneOf: (list) => `The string should not be ${list.length > 1 ? `one of ${list.slice(0, -1).join(', ')} and ` : ''}${list[list.length - 1]}`,
  has: (pattern) => `The string should not have pattern '${pattern}'`,
  not: (pattern) => `The string should have pattern '${pattern}'`,
  usingPlugin: (fn) => `The string should violate ${fn.name || 'plugin'}`,
};

function pluralify(num) {
  return num === 1 ? '' : 's';
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucGFzc3dvcmQtY29tcGxleGl0eS1pbmRpY2F0b3IuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDTjtBQUNTO0FBQUEsSUFFOUNHLGdCQUFnQjtBQUFBLFdBQWhCQSxnQkFBZ0I7RUFBaEJBLGdCQUFnQixDQUFoQkEsZ0JBQWdCO0VBQWhCQSxnQkFBZ0IsQ0FBaEJBLGdCQUFnQjtFQUFoQkEsZ0JBQWdCLENBQWhCQSxnQkFBZ0I7RUFBaEJBLGdCQUFnQixDQUFoQkEsZ0JBQWdCO0VBQWhCQSxnQkFBZ0IsQ0FBaEJBLGdCQUFnQjtBQUFBLEdBQWhCQSxnQkFBZ0IsS0FBaEJBLGdCQUFnQjtBQVFOLE1BQU1DLDJCQUEyQixTQUFTSiwrREFBUyxDQUFDO0VBQUFLLFlBQUE7SUFBQSxTQUFBQyxTQUFBO0lBQUEsS0FDckRDLG1CQUFtQixHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztJQUFBLEtBRTVFQyxtQkFBbUIsR0FBRyxJQUFJQyxHQUFHLENBQUMsQ0FDcEMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQ1gsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQ2QsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQ2QsQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFBQSxLQUVRQyxpQkFBaUIsR0FBRyxFQUFFO0lBQUEsS0FDdEJDLHFCQUFxQixHQUFHLENBQUM7SUFBQSxLQUN6QkMsTUFBTSxHQUFHLEdBQUc7SUFBQSxLQUNaQyxZQUFZO0lBQUEsS0FDWkMsbUJBQW1CO0lBQUEsS0FDbkJDLG9CQUFvQjtJQUFBLEtBQ3BCQyxNQUFNO0VBQUE7RUFkaEI7RUFPQTtFQVNVQyxhQUFhQSxDQUFBLEVBQVMsQ0FBQztFQUV2QkMsSUFBSUEsQ0FBQSxFQUFTO0lBQ25CLElBQUksQ0FBQ0wsWUFBWSxHQUFxQk0sUUFBUSxDQUFD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QUVBO0FBQ0EsOERBQThELEtBQUssV0FBVyxlQUFlO0FBQzdGLDhEQUE4RCxLQUFLLFdBQVcsZUFBZTtBQUM3RiwrREFBK0QsS0FBSyxRQUFRLGVBQWU7QUFDM0YsOERBQThELEtBQUssT0FBTyxlQUFlO0FBQ3pGLGlFQUFpRSxLQUFLLGtCQUFrQixlQUFlO0FBQ3ZHLGlFQUFpRSxLQUFLLGtCQUFrQixlQUFlO0FBQ3ZHLCtEQUErRCxLQUFLLFFBQVEsZUFBZTtBQUMzRiw4REFBOEQsS0FBSyxPQUFPLGVBQWU7QUFDekYsMkNBQTJDLDRCQUE0Qiw4QkFBOEIsV0FBVyxFQUFFLHNCQUFzQjtBQUN4SSx1REFBdUQsUUFBUTtBQUMvRCwyREFBMkQsUUFBUTtBQUNuRSx3REFBd0Qsb0JBQW9CO0FBQzVFOztBQUVBO0FBQ0EsOERBQThELEtBQUssV0FBVyxlQUFlO0FBQzdGLDhEQUE4RCxLQUFLLFdBQVcsZUFBZTtBQUM3Riw2Q0FBNkMsOENBQThDLElBQUksR0FBRyxRQUFRLGVBQWU7QUFDekgsNENBQTRDLDhDQUE4QyxJQUFJLEdBQUcsT0FBTyxlQUFlO0FBQ3ZILCtDQUErQyw4Q0FBOEMsSUFBSSxHQUFHLGtCQUFrQixlQUFlO0FBQ3JJLCtDQUErQyw4Q0FBOEMsSUFBSSxHQUFHLGtCQUFrQixlQUFlO0FBQ3JJLDZDQUE2Qyw4Q0FBOEMsSUFBSSxHQUFHLFFBQVEsZUFBZTtBQUN6SCw0Q0FBNEMsOENBQThDLElBQUksR0FBRyxPQUFPLGVBQWU7QUFDdkgsK0NBQStDLDRCQUE0Qiw4QkFBOEIsV0FBVyxFQUFFLHNCQUFzQjtBQUM1SSwyREFBMkQsUUFBUTtBQUNuRSx1REFBdUQsUUFBUTtBQUMvRCxvREFBb0Qsb0JBQW9CO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci50cyIsIndlYnBhY2s6Ly9zcHJ5a2VyLWIyYy1kZW1vLXNob3AvLi9ub2RlX21vZHVsZXMvcGFzc3dvcmQtdmFsaWRhdG9yL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vc3ByeWtlci1iMmMtZGVtby1zaG9wLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliLmpzIiwid2VicGFjazovL3NwcnlrZXItYjJjLWRlbW8tc2hvcC8uL25vZGVfbW9kdWxlcy9wYXNzd29yZC12YWxpZGF0b3Ivc3JjL3ZhbGlkYXRpb25NZXNzYWdlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gtZXMvZGVib3VuY2UnO1xuaW1wb3J0IFBhc3N3b3JkVmFsaWRhdG9yIGZyb20gJ3Bhc3N3b3JkLXZhbGlkYXRvcic7XG5cbmVudW0gQ29tcGxleGl0eVdlaWdodCB7XG4gICAgbG93ZXJjYXNlID0gMTAsXG4gICAgZGlnaXRzID0gMTUsXG4gICAgdXBwZXJjYXNlID0gMjAsXG4gICAgc3ltYm9scyA9IDMwLFxuICAgIG1pbiA9IDI1LFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXNzd29yZENvbXBsZXhpdHlJbmRpY2F0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBhdmFpbGFibGVQcm9wZXJ0aWVzID0gWydtaW4nLCAnbG93ZXJjYXNlJywgJ3VwcGVyY2FzZScsICdkaWdpdHMnLCAnc3ltYm9scyddO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1tYWdpYy1udW1iZXJzICovXG4gICAgcHJvdGVjdGVkIGNvbXBsZXhpdHlHcmFkYXRpb24gPSBuZXcgTWFwKFtcbiAgICAgICAgWyd3ZWFrJywgMF0sXG4gICAgICAgIFsnbWVkaXVtJywgMjVdLFxuICAgICAgICBbJ3N0cm9uZycsIDUwXSxcbiAgICAgICAgWyd2ZXJ5LXN0cm9uZycsIDc1XSxcbiAgICBdKTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRDb21wbGV4aXR5ID0gJyc7XG4gICAgcHJvdGVjdGVkIG1heFBhc3N3b3JkQ29tcGxleGl0eSA9IDA7XG4gICAgcHJvdGVjdGVkIGZhY3RvciA9IDEwMDtcbiAgICBwcm90ZWN0ZWQgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25FbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaW5kaWNhdG9yTGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBzY2hlbWE6IFBhc3N3b3JkVmFsaWRhdG9yO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmlucHV0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JMaXN0RWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5pbmRpY2F0b3JMaXN0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZGl0aW9uYWxNZXNzYWdlQ2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBuZXcgUGFzc3dvcmRWYWxpZGF0b3IoKTtcblxuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3IoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcElucHV0RWxlbWVudEtleVVwRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwSW5wdXRFbGVtZW50S2V5VXBFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdrZXl1cCcsXG4gICAgICAgICAgICBkZWJvdW5jZSgoKSA9PiB0aGlzLm9uSW5wdXRLZXlVcCgpLCB0aGlzLmRlYm91bmNlRGVsYXkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0VmFsaWRhdG9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWxpZGF0aW9uKHByb3BlcnR5KTtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VNYXhQYXNzd29yZENvbXBsZXhpdHkocHJvcGVydHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5jcmVhc2VNYXhQYXNzd29yZENvbXBsZXhpdHkocHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1heFBhc3N3b3JkQ29tcGxleGl0eSArPSBDb21wbGV4aXR5V2VpZ2h0W3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0VmFsaWRhdGlvbihwcm9wZXJ0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSB0aGlzW3Byb3BlcnR5XTtcblxuICAgICAgICBpZiAocHJvcGVydHkgPT09ICdtaW4nKSB7XG4gICAgICAgICAgICB0aGlzLnNldElzVmFsaWRhdGlvblR5cGUocHJvcGVydHksIHByb3BlcnR5VmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhhc1ZhbGlkYXRpb25UeXBlKHByb3BlcnR5LCBwcm9wZXJ0eVZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0SGFzVmFsaWRhdGlvblR5cGUocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjaGVtYS5oYXMoKVtwcm9wZXJ0eV0odmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRJc1ZhbGlkYXRpb25UeXBlKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2hlbWEuaXMoKVtwcm9wZXJ0eV0odmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklucHV0S2V5VXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgY29uc3QgZmFpbHNMaXN0ID0gdGhpcy5zY2hlbWEudmFsaWRhdGUoaW5wdXRWYWx1ZSwgeyBsaXN0OiB0cnVlIH0pO1xuICAgICAgICBsZXQgcGFzc3dvcmRWYWxpZGF0b3JNYXJrID0gdGhpcy5tYXhQYXNzd29yZENvbXBsZXhpdHk7XG5cbiAgICAgICAgZmFpbHNMaXN0LmZvckVhY2goKHByb3BlcnR5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHBhc3N3b3JkVmFsaWRhdG9yTWFyayAtPSBDb21wbGV4aXR5V2VpZ2h0W3Byb3BlcnR5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkVmFsaWRhdG9yTWFyayk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmRWYWxpZGF0b3JNYXJrOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRDb21wbGV4aXR5ID0gKHBhc3N3b3JkVmFsaWRhdG9yTWFyayAvIHRoaXMubWF4UGFzc3dvcmRDb21wbGV4aXR5KSAqIHRoaXMuZmFjdG9yO1xuXG4gICAgICAgIHRoaXMuY29tcGxleGl0eUdyYWRhdGlvbi5mb3JFYWNoKCh2YWx1ZTogbnVtYmVyLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHBhc3N3b3JkQ29tcGxleGl0eSA+PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbihrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsaWRhdGlvbihjb21wbGV4aXR5TW9kaWZpZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGlmaWVyKHRoaXMuaW5kaWNhdG9yTGlzdEVsZW1lbnQsIHRoaXMuaW5kaWNhdG9yTGlzdENsYXNzTmFtZSwgY29tcGxleGl0eU1vZGlmaWVyKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RpZmllcih0aGlzLm5vdGlmaWNhdGlvbkVsZW1lbnQsIHRoaXMuYWRkaXRpb25hbE1lc3NhZ2VDbGFzc05hbWUsIGNvbXBsZXhpdHlNb2RpZmllcik7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50Q29tcGxleGl0eSA9IGNvbXBsZXhpdHlNb2RpZmllcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTW9kaWZpZXIoZWxlbWVudDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGNvbXBsZXhpdHlNb2RpZmllcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoYCR7Y2xhc3NOYW1lfS0tJHt0aGlzLmN1cnJlbnRDb21wbGV4aXR5fWApO1xuICAgICAgICBjbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX0tLSR7Y29tcGxleGl0eU1vZGlmaWVyfWApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaW5wdXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpbnB1dC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbmRpY2F0b3JMaXN0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9X19pbmRpY2F0b3ItbGlzdGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRpdGlvbmFsTWVzc2FnZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfV9fYWRkaXRpb25hbC1tZXNzYWdlYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRlYm91bmNlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnZGVib3VuY2UtZGVsYXknKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnbWluJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbG93ZXJjYXNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ2xvd2VyY2FzZScpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHVwcGVyY2FzZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCd1cHBlcmNhc2UnKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBkaWdpdHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnZGlnaXRzJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgc3ltYm9scygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdzeW1ib2xzJykpO1xuICAgIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBlcnJvcjoge1xuICAgIGxlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgYSB2YWxpZCBwb3NpdGl2ZSBudW1iZXInLFxuICAgIHBhc3N3b3JkOiAnUGFzc3dvcmQgc2hvdWxkIGJlIGEgdmFsaWQgc3RyaW5nJyxcbiAgICBpbnZhbGlkUGx1Z2luOiAnUGx1Z2luIHNob3VsZCBiZSBhIHZhbGlkIGZ1bmN0aW9uJyxcbiAgfSxcbiAgcmVnZXg6IHtcbiAgICBkaWdpdHM6ICcoXFxcXGQuKiknLFxuICAgIGxldHRlcnM6ICcoW2EtekEtWl0uKiknLFxuICAgIHN5bWJvbHM6ICcoW2B+XFxcXCFAI1xcXFwkJVxcXFxeXFxcXCZcXFxcKlxcXFwoXFxcXClcXFxcLV9cXFxcPVxcXFwrXFxcXFtcXFxcXFx7XFxcXH1cXFxcXVxcXFxcXFxcXFx8OzpcXFxcXFwnXCIsPC4+XFxcXC9cXFxcP+KCrMKjwqXigrnCp8KxXS4qKScsXG4gICAgc3BhY2VzOiAnKFtcXFxcc10uKiknXG4gIH1cbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGxpYiA9IHJlcXVpcmUoJy4vbGliJyk7XG52YXIgZXJyb3IgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLmVycm9yO1xudmFyIGdldFZhbGlkYXRpb25NZXNzYWdlID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uTWVzc2FnZXMnKTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCBhIG51bWJlciBpcyBhIHZhbGlkIGxlbmd0aCAocG9zaXRpdmUgbnVtYmVyKVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gTnVtYmVyIHRvIHZhbGlkYXRlXG4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUxlbmd0aChudW0pIHtcbiAgY29uc3QgbGVuID0gTnVtYmVyKG51bSk7XG4gIGlmIChpc05hTihsZW4pIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGxlbikgfHwgbGVuIDwgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5sZW5ndGgpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdHMgYSB2YWxpZGF0aW9uIGFuZCByZXR1cm4gdGhlIHJlc3VsdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSBQcm9wZXJ0eSB0byB2YWxpZGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IEJvb2xlYW4gdmFsdWUgaW5kaWN0aW5nIHRoZSB2YWxpZGl0eVxuICogICAgICAgICAgIG9mIHRoZSBwYXNzd29yZCBhZ2FpbnN0IHRoZSBwcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBfaXNQYXNzd29yZFZhbGlkRm9yKHByb3BlcnR5KSB7XG4gIHJldHVybiBsaWJbcHJvcGVydHkubWV0aG9kXS5hcHBseSh0aGlzLCBwcm9wZXJ0eS5hcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyB0aGUgcHJvcGVydGllcyBvZiBhIHBhc3N3b3JkLXZhbGlkYXRpb24gc2NoZW1hIG9iamVjdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kIC0gUHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHthcnJheX0gYXJndW1lbnRzIC0gYXJndW1lbnRzIGZvciB0aGUgZnVuYyBwcm9wZXJ0eVxuICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfVxuICovXG5mdW5jdGlvbiBfcmVnaXN0ZXIobWV0aG9kLCBhcmdzLCBkZXNjcmlwdGlvbikge1xuICAvLyBBZGQgcHJvcGVydHkgdG8gdGhlIHNjaGVtYVxuICB0aGlzLnByb3BlcnRpZXMucHVzaCh7IG1ldGhvZCwgYXJndW1lbnRzOiBhcmdzLCBkZXNjcmlwdGlvbiB9KTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmNsYXNzIFBhc3N3b3JkVmFsaWRhdG9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwYXNzd29yZC12YWxpZGF0b3Igc2NoZW1hXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwYXNzd29yZCBhZ2FpbnN0IHNjaGVtYVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHdkIC0gcGFzc3dvcmQgdG8gdmFsaWRhdGVcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRpb25zXSAtIG9wdGlvbmFsIG9wdGlvbnMgdG8gY29uZmlndXJlIHZhbGlkYXRpb25cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5saXN0XSAtIGFza3MgZm9yIGEgbGlzdCBvZiB2YWxpZGF0aW9uXG4gICAqICAgICAgICAgICBmYWlsdXJlcyBpbnN0ZWFkIG9mIGp1c3QgdHJ1ZS9mYWxzZVxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRldGFpbHNdIC0gYXNrcyBmb3IgbW9yZSBkZXRhaWxzIGFib3V0XG4gICAqICAgICAgICAgICBmYWlsZWQgdmFsaWRhdGlvbnMgaW5jbHVkaW5nIGFyZ3VtZW50cywgYW5kIGVycm9yIG1lc3NhZ2VzXG4gICAqIEByZXR1cm5zIHtib29sZWFufGFycmF5fSBCb29sZWFuIHZhbHVlIGluZGljdGluZyB0aGUgdmFsaWRpdHlcbiAgICogICAgICAgICAgIG9mIHRoZSBwYXNzd29yZCBhcyBwZXIgc2NoZW1hLCBpZiAnb3B0aW9ucy5saXN0JyBvclxuICAgKiAgICAgICAgICAgJ29wdGlvbnMuZGV0YWlscycgaXMgbm90IHNldC4gT3RoZXJ3aXNlLCBpdCByZXR1cm5zIGFuXG4gICAqICAgICAgICAgICBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyB3aGljaCBmYWlsZWQgdmFsaWRhdGlvbnNcbiAgICovXG4gIHZhbGlkYXRlKHB3ZCwgb3B0aW9ucykge1xuICAgIHRoaXMubGlzdCA9IEJvb2xlYW4ob3B0aW9ucyAmJiBvcHRpb25zLmxpc3QpO1xuICAgIHRoaXMuZGV0YWlscyA9IEJvb2xlYW4ob3B0aW9ucyAmJiBvcHRpb25zLmRldGFpbHMpO1xuICAgIHRoaXMucGFzc3dvcmQgPSBTdHJpbmcocHdkKTtcblxuICAgIHRoaXMucG9zaXRpdmUgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMubGlzdCB8fCB0aGlzLmRldGFpbHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXMucmVkdWNlKChlcnJvckxpc3QsIHByb3BlcnR5KSA9PiB7XG4gICAgICAgIC8vIEFwcGxpZXMgYWxsIHZhbGlkYXRpb25zIGRlZmluZWQgaW4gbGliIG9uZSBieSBvbmVcbiAgICAgICAgaWYgKCFfaXNQYXNzd29yZFZhbGlkRm9yLmNhbGwodGhpcywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHZhbGlkYXRpb24gZm9yIGEgcHJvcGVydHkgZmFpbHMsXG4gICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBlcnJvciBsaXN0XG4gICAgICAgICAgdmFyIGRldGFpbCA9IHByb3BlcnR5Lm1ldGhvZDtcbiAgICAgICAgICAvLyBJZiB0aGUgZGV0YWlscyBvcHRpb24gd2FzIHByb3ZpZGVkLFxuICAgICAgICAgIC8vIHJldHVybiBhIHJpY2ggb2JqZWN0IGluY2x1ZGluZyB2YWxpZGF0aW9uIG1lc3NhZ2VcbiAgICAgICAgICBpZiAodGhpcy5kZXRhaWxzKSB7XG4gICAgICAgICAgICBkZXRhaWwgPSB7IHZhbGlkYXRpb246IHByb3BlcnR5Lm1ldGhvZCB9O1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5LmFyZ3VtZW50cyAmJiBwcm9wZXJ0eS5hcmd1bWVudHNbMF0pIHtcbiAgICAgICAgICAgICAgZGV0YWlsLmFyZ3VtZW50cyA9IHByb3BlcnR5LmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLnBvc2l0aXZlICYmIHByb3BlcnR5Lm1ldGhvZCAhPT0gJ25vdCcpIHtcbiAgICAgICAgICAgICAgZGV0YWlsLmludmVydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IHByb3BlcnR5LmFyZ3VtZW50cyAmJiBwcm9wZXJ0eS5hcmd1bWVudHNbMV07XG4gICAgICAgICAgICB2YXIgdmFsaWRhdGlvbk1lc3NhZ2UgPSBkZXNjcmlwdGlvbiB8fCBnZXRWYWxpZGF0aW9uTWVzc2FnZShwcm9wZXJ0eS5tZXRob2QsIGRldGFpbC5hcmd1bWVudHMsIGRldGFpbC5pbnZlcnRlZCk7XG4gICAgICAgICAgICBkZXRhaWwubWVzc2FnZSA9IHZhbGlkYXRpb25NZXNzYWdlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBlcnJvckxpc3QuY29uY2F0KGRldGFpbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yTGlzdDtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5ldmVyeShfaXNQYXNzd29yZFZhbGlkRm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgbGV0dGVycyBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiBsZXR0ZXJzIHJlcXVpcmVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dIC0gZGVzY3JpcHRpb24gb2YgdGhlIHZhbGlkYXRpb25cbiAgICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfSBpbnN0YW5jZSBvZiBQYXNzd29yZFZhbGlkYXRvciBzY2hlbWFcbiAgICovXG4gIGxldHRlcnMoY291bnQsIGRlc2NyaXB0aW9uKSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2xldHRlcnMnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgZGlnaXRzIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyByZXF1aXJlZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uXSAtIGRlc2NyaXB0aW9uIG9mIHRoZSB2YWxpZGF0aW9uXG4gICAqIEByZXR1cm5zIHtQYXNzd29yZFZhbGlkYXRvcn0gaW5zdGFuY2Ugb2YgUGFzc3dvcmRWYWxpZGF0b3Igc2NoZW1hXG4gICAqL1xuICBkaWdpdHMoY291bnQsIGRlc2NyaXB0aW9uKSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2RpZ2l0cycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBzeW1ib2xzIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIHN5bWJvbHMgcmVxdWlyZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbl0gLSBkZXNjcmlwdGlvbiBvZiB0aGUgdmFsaWRhdGlvblxuICAgKiBAcmV0dXJucyB7UGFzc3dvcmRWYWxpZGF0b3J9IGluc3RhbmNlIG9mIFBhc3N3b3JkVmFsaWRhdG9yIHNjaGVtYVxuICAgKi9cbiAgc3ltYm9scyhjb3VudCwgZGVzY3JpcHRpb24pIHtcbiAgICBjb3VudCAmJiBfdmFsaWRhdGVMZW5ndGgoY291bnQpO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnc3ltYm9scycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBzcGVjaWZ5IGEgbWluaW11bSBsZW5ndGggb2YgdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBtaW5pbXVtIGxlbmd0aFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uXSAtIGRlc2NyaXB0aW9uIG9mIHRoZSB2YWxpZGF0aW9uXG4gICAqIEByZXR1cm5zIHtQYXNzd29yZFZhbGlkYXRvcn0gaW5zdGFuY2Ugb2YgUGFzc3dvcmRWYWxpZGF0b3Igc2NoZW1hXG4gICAqL1xuICBtaW4obnVtLCBkZXNjcmlwdGlvbikge1xuICAgIF92YWxpZGF0ZUxlbmd0aChudW0pO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnbWluJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIHNwZWNpZnkgYSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIG1heGltdW0gbGVuZ3RoXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dIC0gZGVzY3JpcHRpb24gb2YgdGhlIHZhbGlkYXRpb25cbiAgICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfSBpbnN0YW5jZSBvZiBQYXNzd29yZFZhbGlkYXRvciBzY2hlbWFcbiAgICovXG4gIG1heChudW0sIGRlc2NyaXB0aW9uKSB7XG4gICAgX3ZhbGlkYXRlTGVuZ3RoKG51bSk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdtYXgnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgbG93ZXJjYXNlIGxldHRlcnMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2YgbG93ZXJjYXNlIGxldHRlcnMgcmVxdWlyZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbl0gLSBkZXNjcmlwdGlvbiBvZiB0aGUgdmFsaWRhdGlvblxuICAgKiBAcmV0dXJucyB7UGFzc3dvcmRWYWxpZGF0b3J9IGluc3RhbmNlIG9mIFBhc3N3b3JkVmFsaWRhdG9yIHNjaGVtYVxuICAgKi9cbiAgbG93ZXJjYXNlKGNvdW50LCBkZXNjcmlwdGlvbikge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdsb3dlcmNhc2UnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgdXBwZXJjYXNlIGxldHRlcnMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2YgdXBwZXJjYXNlIGxldHRlcnMgcmVxdWlyZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbl0gLSBkZXNjcmlwdGlvbiBvZiB0aGUgdmFsaWRhdGlvblxuICAgKiBAcmV0dXJucyB7UGFzc3dvcmRWYWxpZGF0b3J9IGluc3RhbmNlIG9mIFBhc3N3b3JkVmFsaWRhdG9yIHNjaGVtYVxuICAgKi9cbiAgdXBwZXJjYXNlKGNvdW50LCBkZXNjcmlwdGlvbikge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICd1cHBlcmNhc2UnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2Ygc3BhY2UgaW4gdGhlIHBhc3N3b3JkXG4gICAqIEl0IGNhbiBiZSB1c2VkIGFsb25nIHdpdGggJ25vdCcgdG8gbm90IGFsbG93IHNwYWNlc1xuICAgKiBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiBzcGFjZXMgcmVxdWlyZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtkZXNjcmlwdGlvbl0gLSBkZXNjcmlwdGlvbiBvZiB0aGUgdmFsaWRhdGlvblxuICAgKiBAcmV0dXJucyB7UGFzc3dvcmRWYWxpZGF0b3J9IGluc3RhbmNlIG9mIFBhc3N3b3JkVmFsaWRhdG9yIHNjaGVtYVxuICAgKi9cbiAgc3BhY2VzKGNvdW50LCBkZXNjcmlwdGlvbikge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdzcGFjZXMnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gaW52ZXJ0IHRoZSBlZmZlY3RzIG9mICdub3QnXG4gICAqIEFwYXJ0IGZyb20gdGhhdCwgJ2hhcycgaXMgYWxzbyB1c2VkXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cH0gW3BhdHRlcm5dIC0gcGF0dGVybiB0byBtYXRjaFxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2Rlc2NyaXB0aW9uXSAtIGRlc2NyaXB0aW9uIG9mIHRoZSB2YWxpZGF0aW9uXG4gICAqIEByZXR1cm5zIHtQYXNzd29yZFZhbGlkYXRvcn0gaW5zdGFuY2Ugb2YgUGFzc3dvcmRWYWxpZGF0b3Igc2NoZW1hXG4gICAqL1xuICBoYXMocGF0dGVybiwgZGVzY3JpcHRpb24pIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2hhcycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBpbnZlcnQgdGhlIG5leHQgYXBwbGllZCBydWxlcy5cbiAgICogQWxsIHRoZSBydWxlcyBhcHBsaWVkIGFmdGVyICdub3QnIHdpbGwgaGF2ZSBvcHBvc2l0ZSBlZmZlY3QsXG4gICAqIHVudGlsICdoYXMnIHJ1bGUgaXMgYXBwbGllZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB9IFtwYXR0ZXJuXSAtIHBhdHRlcm4gdG8gbm90IG1hdGNoXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dIC0gZGVzY3JpcHRpb24gb2YgdGhlIHZhbGlkYXRpb25cbiAgICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfSBpbnN0YW5jZSBvZiBQYXNzd29yZFZhbGlkYXRvciBzY2hlbWFcbiAgICovXG4gIG5vdChwYXR0ZXJuLCBkZXNjcmlwdGlvbikge1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnbm90JywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIGludmVydCB0aGUgZWZmZWN0cyBvZiAnbm90J1xuICAgKiBBcGFydCBmcm9tIHRoYXQsICdpcycgaXMgYWxzbyB1c2VkXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqXG4gICAqIEByZXR1cm5zIHtQYXNzd29yZFZhbGlkYXRvcn0gaW5zdGFuY2Ugb2YgUGFzc3dvcmRWYWxpZGF0b3Igc2NoZW1hXG4gICAqL1xuICBpcygpIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2lzJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIHdoaXRlbGlzdCB3b3JkcyB0byBiZSB1c2VkIGFzIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSBsaXN0IG9mIHZhbHVlcyBhbGxvd2VkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dIC0gZGVzY3JpcHRpb24gb2YgdGhlIHZhbGlkYXRpb25cbiAgICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfSBpbnN0YW5jZSBvZiBQYXNzd29yZFZhbGlkYXRvciBzY2hlbWFcbiAgICovXG4gIG9uZU9mKGxpc3QsIGRlc2NyaXB0aW9uKSB7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdvbmVPZicsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGEgcGx1Z2luIGZ1bmN0aW9uIGludG8gdGhlIHZhbGlkYXRpb24gY2hhaW5cbiAgICpcbiAgICogQHBhcmFtIHtQbHVnaW59IGZuICAtIEEgcGx1Z2luIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVzY3JpcHRpb25dIC0gZGVzY3JpcHRpb24gb2YgdGhlIHZhbGlkYXRpb25cbiAgICogQHJldHVybnMge1Bhc3N3b3JkVmFsaWRhdG9yfSBpbnN0YW5jZSBvZiBQYXNzd29yZFZhbGlkYXRvciBzY2hlbWFcbiAgICovXG4gIHVzaW5nUGx1Z2luKGZuLCBkZXNjcmlwdGlvbikge1xuICAgIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5pbnZhbGlkUGx1Z2luKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICd1c2luZ1BsdWdpbicsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXNzd29yZFZhbGlkYXRvcjtcblxuLyoqXG4gKiBAY2FsbGJhY2sgUGx1Z2luXG4gKiBAcGFyYW0gcGFzc3dvcmQgUGFzc3dvcmQgaW5qZWN0ZWQgYnkgdGhlIGxpYnJhcnlcbiAqL1xuIiwiLyoqXG4gKiBHZW5lcmljIG1ldGhvZCB0byB0ZXN0IHJlZ2V4XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdleCAtIHJlZ2V4IHRvIHRlc3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBwYXNzd29yZFxuICovXG52YXIgcmVnZXggPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLnJlZ2V4O1xuXG5mdW5jdGlvbiBfcHJvY2VzcyhyZWdleHAsIHJlcGVhdCkge1xuICBpZiAocmVwZWF0ICYmIHJlcGVhdCA+IDEpIHtcbiAgICBjb25zdCBwYXJzZWRSZXBlYXQgPSBwYXJzZUludChyZXBlYXQsIDEwKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHAgKyAneycgKyBwYXJzZWRSZXBlYXQgKyAnLH0nKS50ZXN0KHRoaXMucGFzc3dvcmQpID09PSB0aGlzLnBvc2l0aXZlO1xuICB9XG4gIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4cCkudGVzdCh0aGlzLnBhc3N3b3JkKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBpbnZlcnQgdGhlIG5leHQgdmFsaWRhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHtSZWdFeHB9IFtzeW1ib2xdIC0gY3VzdG9tIFJlZ2V4IHdoaWNoIHNob3VsZCBub3QgYmUgcHJlc2VudFxuICAgKi9cbiAgbm90OiBmdW5jdGlvbiBub3Qoc3ltYm9sKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChzeW1ib2wpIHtcbiAgICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaW52ZXJ0IHRoZSBlZmZlY3RzIG9mIG5vdCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBbc3ltYm9sXSAtIGN1c3RvbSBSZWdleCB3aGljaCBzaG91bGQgYmUgcHJlc2VudFxuICAgKi9cbiAgaGFzOiBmdW5jdGlvbiBoYXMoc3ltYm9sKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IHRydWU7XG4gICAgaWYgKHN5bWJvbCkge1xuICAgICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgc3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBpbnZlcnQgdGhlIGVmZmVjdHMgb2Ygbm90KCkgYW5kXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqXG4gICAqL1xuICBpczogZnVuY3Rpb24gaXMoKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzcGVjaWZ5IGEgbWluaW11bSBsZW5ndGhcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIG1pbmltdW0gbGVuZ3RoXG4gICAqL1xuICBtaW46IGZ1bmN0aW9uIG1pbihudW0pIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZC5sZW5ndGggPj0gbnVtO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gc3BlY2lmeSBhIG1heGltdW0gbGVuZ3RoXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBtYXhpbXVtIGxlbmd0aFxuICAgKi9cbiAgbWF4OiBmdW5jdGlvbiBtYXgobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmQubGVuZ3RoIDw9IG51bTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBkaWdpdHNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIGRpZ2l0c1xuICAgKi9cbiAgZGlnaXRzOiBmdW5jdGlvbiBkaWdpdHMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXguZGlnaXRzLCByZXBlYXQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gdmFsaWRhdGUgdGhlIHByZXNlbmNlIG9mIGxldHRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIGxldHRlcnNcbiAgICovXG4gIGxldHRlcnM6IGZ1bmN0aW9uIGxldHRlcnMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXgubGV0dGVycywgcmVwZWF0KTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiB1cHBlcmNhc2UgbGV0dGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwZWF0IC0gY291bnQgb2YgcmVxdWlyZWQgdXBwZXJjYXNlIGxldHRlcnNcbiAgICovXG4gIHVwcGVyY2FzZTogZnVuY3Rpb24gdXBwZXJjYXNlKHJlcGVhdCkge1xuICAgIGlmIChyZXBlYXQgJiYgcmVwZWF0ID4gMSkge1xuICAgICAgbGV0IGNoYXJhY3RlckluZGV4ID0gMDtcbiAgICAgIGxldCB1cHBlckNhc2VMZXR0ZXJzID0gMDtcblxuICAgICAgd2hpbGUgKCh1cHBlckNhc2VMZXR0ZXJzIDwgcmVwZWF0KSAmJiAoY2hhcmFjdGVySW5kZXggPCB0aGlzLnBhc3N3b3JkLmxlbmd0aCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExldHRlciA9IHRoaXMucGFzc3dvcmQuY2hhckF0KGNoYXJhY3RlckluZGV4KTtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgIT09IGN1cnJlbnRMZXR0ZXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHVwcGVyQ2FzZUxldHRlcnMrKztcbiAgICAgICAgfVxuICAgICAgICBjaGFyYWN0ZXJJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKHVwcGVyQ2FzZUxldHRlcnMgPT09IHJlcGVhdCkgPT09IHRoaXMucG9zaXRpdmU7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZC50b0xvd2VyQ2FzZSgpKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBsb3dlcmNhc2UgbGV0dGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwZWF0IC0gY291bnQgb2YgcmVxdWlyZWQgbG93ZXJjYXNlIGxldHRlcnNcbiAgICovXG4gIGxvd2VyY2FzZTogZnVuY3Rpb24gbG93ZXJjYXNlKHJlcGVhdCkge1xuICAgIGlmIChyZXBlYXQgJiYgcmVwZWF0ID4gMSkge1xuICAgICAgbGV0IGNoYXJhY3RlckluZGV4ID0gMDtcbiAgICAgIGxldCBsb3dlckNhc2VMZXR0ZXJzID0gMDtcblxuICAgICAgd2hpbGUgKChsb3dlckNhc2VMZXR0ZXJzIDwgcmVwZWF0KSAmJiAoY2hhcmFjdGVySW5kZXggPCB0aGlzLnBhc3N3b3JkLmxlbmd0aCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExldHRlciA9IHRoaXMucGFzc3dvcmQuY2hhckF0KGNoYXJhY3RlckluZGV4KTtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgIT09IGN1cnJlbnRMZXR0ZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIGxvd2VyQ2FzZUxldHRlcnMrKztcbiAgICAgICAgfVxuICAgICAgICBjaGFyYWN0ZXJJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGxvd2VyQ2FzZUxldHRlcnMgPT09IHJlcGVhdCkgPT09IHRoaXMucG9zaXRpdmU7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZC50b1VwcGVyQ2FzZSgpKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBzeW1ib2xzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXBlYXQgLSBjb3VudCBvZiByZXF1aXJlZCBzeW1ib2xzXG4gICAqL1xuICBzeW1ib2xzOiBmdW5jdGlvbiBzeW1ib2xzKHJlcGVhdCkge1xuICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHJlZ2V4LnN5bWJvbHMsIHJlcGVhdCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2Ygc3BhY2VcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIHNwYWNlc1xuICAgKi9cbiAgc3BhY2VzOiBmdW5jdGlvbiBzcGFjZXMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXguc3BhY2VzLCByZXBlYXQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcHJvdmlkZSBwcmUtZGVmaW5lZCB2YWx1ZXMgZm9yIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSBsaXN0IG9mIHZhbHVlcyBhbGxvd2VkXG4gICAqL1xuICBvbmVPZjogZnVuY3Rpb24gb25lT2YobGlzdCkge1xuICAgIHJldHVybiBsaXN0LmluZGV4T2YodGhpcy5wYXNzd29yZCkgPj0gMCA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHJ1biBhIHBsdWdpbiBmdW5jdGlvbiBmb3IgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcGx1Z2luIC0gQSBwbHVnaW4gZnVuY3Rpb25cbiAgICovXG4gIHVzaW5nUGx1Z2luOiBmdW5jdGlvbiB1c2luZ1BsdWdpbihmbikge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBmbi5jYWxsKHt9LCB0aGlzLnBhc3N3b3JkKTtcbiAgICAgIHJldHVybiBCb29sZWFuKHJlc3VsdCkgPT09IHRoaXMucG9zaXRpdmU7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChtZXRob2QsIGFyZywgaW52ZXJ0ZWQpIHtcbiAgY29uc3QgbXNnTGlzdCA9IGludmVydGVkID8gbmVnYXRpdmVNZXNzYWdlcyA6IHBvc2l0aXZlTWVzc2FnZXM7XG4gIHJldHVybiBtc2dMaXN0W21ldGhvZF0gJiYgbXNnTGlzdFttZXRob2RdKGFyZyk7XG59O1xuXG5jb25zdCBwb3NpdGl2ZU1lc3NhZ2VzID0ge1xuICBtaW46IChudW0pID0+IGBUaGUgc3RyaW5nIHNob3VsZCBoYXZlIGEgbWluaW11bSBsZW5ndGggb2YgJHtudW19IGNoYXJhY3RlciR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgbWF4OiAobnVtKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBhIG1heGltdW0gbGVuZ3RoIG9mICR7bnVtfSBjaGFyYWN0ZXIke3BsdXJhbGlmeShudW0pfWAsXG4gIGxldHRlcnM6IChudW0gPSAxKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBhIG1pbmltdW0gb2YgJHtudW19IGxldHRlciR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgZGlnaXRzOiAobnVtID0gMSkgPT4gYFRoZSBzdHJpbmcgc2hvdWxkIGhhdmUgYSBtaW5pbXVtIG9mICR7bnVtfSBkaWdpdCR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgdXBwZXJjYXNlOiAobnVtID0gMSkgPT4gYFRoZSBzdHJpbmcgc2hvdWxkIGhhdmUgYSBtaW5pbXVtIG9mICR7bnVtfSB1cHBlcmNhc2UgbGV0dGVyJHtwbHVyYWxpZnkobnVtKX1gLFxuICBsb3dlcmNhc2U6IChudW0gPSAxKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBhIG1pbmltdW0gb2YgJHtudW19IGxvd2VyY2FzZSBsZXR0ZXIke3BsdXJhbGlmeShudW0pfWAsXG4gIHN5bWJvbHM6IChudW0gPSAxKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBhIG1pbmltdW0gb2YgJHtudW19IHN5bWJvbCR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgc3BhY2VzOiAobnVtID0gMSkgPT4gYFRoZSBzdHJpbmcgc2hvdWxkIGhhdmUgYSBtaW5pbXVtIG9mICR7bnVtfSBzcGFjZSR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgb25lT2Y6IChsaXN0KSA9PiBgVGhlIHN0cmluZyBzaG91bGQgYmUgJHtsaXN0Lmxlbmd0aCA+IDEgPyBgb25lIG9mICR7bGlzdC5zbGljZSgwLCAtMSkuam9pbignLCAnKX0gYW5kIGAgOiAnJ30ke2xpc3RbbGlzdC5sZW5ndGggLSAxXX1gLFxuICBoYXM6IChwYXR0ZXJuKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBwYXR0ZXJuICcke3BhdHRlcm59J2AsXG4gIG5vdDogKHBhdHRlcm4pID0+IGBUaGUgc3RyaW5nIHNob3VsZCBub3QgaGF2ZSBwYXR0ZXJuICcke3BhdHRlcm59J2AsXG4gIHVzaW5nUGx1Z2luOiAoZm4pID0+IGBUaGUgc3RyaW5nIHNob3VsZCBub3QgdmlvbGF0ZSAke2ZuLm5hbWUgfHwgJ3BsdWdpbid9YCxcbn07XG5cbmNvbnN0IG5lZ2F0aXZlTWVzc2FnZXMgPSB7XG4gIG1pbjogKG51bSkgPT4gYFRoZSBzdHJpbmcgc2hvdWxkIGhhdmUgYSBtYXhpbXVtIGxlbmd0aCBvZiAke251bX0gY2hhcmFjdGVyJHtwbHVyYWxpZnkobnVtKX1gLFxuICBtYXg6IChudW0pID0+IGBUaGUgc3RyaW5nIHNob3VsZCBoYXZlIGEgbWluaW11bSBsZW5ndGggb2YgJHtudW19IGNoYXJhY3RlciR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgbGV0dGVyczogKG51bSA9IDApID0+IGBUaGUgc3RyaW5nIHNob3VsZCAke251bSA9PT0gMCA/ICdub3QgaGF2ZScgOiBgaGF2ZSBhIG1heGltdW0gb2YgJHtudW19YH0gbGV0dGVyJHtwbHVyYWxpZnkobnVtKX1gLFxuICBkaWdpdHM6IChudW0gPSAwKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgJHtudW0gPT09IDAgPyAnbm90IGhhdmUnIDogYGhhdmUgYSBtYXhpbXVtIG9mICR7bnVtfWB9IGRpZ2l0JHtwbHVyYWxpZnkobnVtKX1gLFxuICB1cHBlcmNhc2U6IChudW0gPSAwKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgJHtudW0gPT09IDAgPyAnbm90IGhhdmUnIDogYGhhdmUgYSBtYXhpbXVtIG9mICR7bnVtfWB9IHVwcGVyY2FzZSBsZXR0ZXIke3BsdXJhbGlmeShudW0pfWAsXG4gIGxvd2VyY2FzZTogKG51bSA9IDApID0+IGBUaGUgc3RyaW5nIHNob3VsZCAke251bSA9PT0gMCA/ICdub3QgaGF2ZScgOiBgaGF2ZSBhIG1heGltdW0gb2YgJHtudW19YH0gbG93ZXJjYXNlIGxldHRlciR7cGx1cmFsaWZ5KG51bSl9YCxcbiAgc3ltYm9sczogKG51bSA9IDApID0+IGBUaGUgc3RyaW5nIHNob3VsZCAke251bSA9PT0gMCA/ICdub3QgaGF2ZScgOiBgaGF2ZSBhIG1heGltdW0gb2YgJHtudW19YH0gc3ltYm9sJHtwbHVyYWxpZnkobnVtKX1gLFxuICBzcGFjZXM6IChudW0gPSAwKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgJHtudW0gPT09IDAgPyAnbm90IGhhdmUnIDogYGhhdmUgYSBtYXhpbXVtIG9mICR7bnVtfWB9IHNwYWNlJHtwbHVyYWxpZnkobnVtKX1gLFxuICBvbmVPZjogKGxpc3QpID0+IGBUaGUgc3RyaW5nIHNob3VsZCBub3QgYmUgJHtsaXN0Lmxlbmd0aCA+IDEgPyBgb25lIG9mICR7bGlzdC5zbGljZSgwLCAtMSkuam9pbignLCAnKX0gYW5kIGAgOiAnJ30ke2xpc3RbbGlzdC5sZW5ndGggLSAxXX1gLFxuICBoYXM6IChwYXR0ZXJuKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgbm90IGhhdmUgcGF0dGVybiAnJHtwYXR0ZXJufSdgLFxuICBub3Q6IChwYXR0ZXJuKSA9PiBgVGhlIHN0cmluZyBzaG91bGQgaGF2ZSBwYXR0ZXJuICcke3BhdHRlcm59J2AsXG4gIHVzaW5nUGx1Z2luOiAoZm4pID0+IGBUaGUgc3RyaW5nIHNob3VsZCB2aW9sYXRlICR7Zm4ubmFtZSB8fCAncGx1Z2luJ31gLFxufTtcblxuZnVuY3Rpb24gcGx1cmFsaWZ5KG51bSkge1xuICByZXR1cm4gbnVtID09PSAxID8gJycgOiAncyc7XG59XG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiZGVib3VuY2UiLCJQYXNzd29yZFZhbGlkYXRvciIsIkNvbXBsZXhpdHlXZWlnaHQiLCJQYXNzd29yZENvbXBsZXhpdHlJbmRpY2F0b3IiLCJjb25zdHJ1Y3RvciIsImFyZ3VtZW50cyIsImF2YWlsYWJsZVByb3BlcnRpZXMiLCJjb21wbGV4aXR5R3JhZGF0aW9uIiwiTWFwIiwiY3VycmVudENvbXBsZXhpdHkiLCJtYXhQYXNzd29yZENvbXBsZXhpdHkiLCJmYWN0b3IiLCJpbnB1dEVsZW1lbnQiLCJub3RpZmljYXRpb25FbGVtZW50IiwiaW5kaWNhdG9yTGlzdEVsZW1lbnQiLCJzY2hlbWEiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImlucHV0Q2xhc3NOYW1lIiwiaW5kaWNhdG9yTGlzdENsYXNzTmFtZSIsImFkZGl0aW9uYWxNZXNzYWdlQ2xhc3NOYW1lIiwiaW5pdFZhbGlkYXRvciIsIm1hcEV2ZW50cyIsIm1hcElucHV0RWxlbWVudEtleVVwRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwib25JbnB1dEtleVVwIiwiZGVib3VuY2VEZWxheSIsImZvckVhY2giLCJwcm9wZXJ0eSIsInNldFZhbGlkYXRpb24iLCJpbmNyZWFzZU1heFBhc3N3b3JkQ29tcGxleGl0eSIsInByb3BlcnR5VmFsdWUiLCJzZXRJc1ZhbGlkYXRpb25UeXBlIiwic2V0SGFzVmFsaWRhdGlvblR5cGUiLCJ2YWx1ZSIsImhhcyIsImlzIiwiaW5wdXRWYWx1ZSIsImZhaWxzTGlzdCIsInZhbGlkYXRlIiwibGlzdCIsInBhc3N3b3JkVmFsaWRhdG9yTWFyayIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZENvbXBsZXhpdHkiLCJrZXkiLCJ1cGRhdGVWYWxpZGF0aW9uIiwiY29tcGxleGl0eU1vZGlmaWVyIiwidXBkYXRlTW9kaWZpZXIiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsIk51bWJlciIsIm1pbiIsImxvd2VyY2FzZSIsInVwcGVyY2FzZSIsImRpZ2l0cyIsInN5bWJvbHMiXSwic291cmNlUm9vdCI6IiJ9