/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./Emitter/Emitter.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    _defineProperty(this, "observers", void 0);

    this.observers = {};
  }

  _createClass(Emitter, [{
    key: "emit",
    value: function emit(event, data) {
      if (!Array.isArray(this.observers[event])) {
        return false;
      }

      this.observers[event].forEach(function (observer) {
        observer(data);
      });
      return true;
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, fn) {
      this.observers[event] = this.observers[event] || [];
      this.observers[event].push(fn);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(event, fn) {
      this.observers[event] = this.observers[event].filter(function (observer) {
        return observer !== fn;
      });
      return this.observers;
    }
  }]);

  return Emitter;
}();

/* harmony default export */ var Emitter_Emitter = (Emitter);
;// CONCATENATED MODULE: ./defaultState.ts
var defaultState = {
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
  valueTo: 42,
  orientation: 'horizontal',
  range: false,
  fill: true,
  labels: true,
  tooltips: true,
  color: 'orange'
};
/* harmony default export */ var defaultState_0 = (defaultState);
;// CONCATENATED MODULE: ./utils/utils.ts
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createElement(tag, className) {
  var _element$classList;

  var element = document.createElement(tag);
  if (className) (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(className));
  return element; // remove function??
}

function fromValueToPercent(state, value) {
  var _state$min = state.min,
      min = _state$min === void 0 ? 0 : _state$min,
      _state$max = state.max,
      max = _state$max === void 0 ? 0 : _state$max,
      _state$step = state.step,
      step = _state$step === void 0 ? 1 : _state$step;
  var stepCount = (max - min) / step;
  var stepPercent = 100 / stepCount;
  var percent = (value - min) / step * stepPercent;
  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;
  return percent;
}

function getValueWithStep() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var valueInPercent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var stepCount = (max - min) / step;
  var stepPercent = 100 / stepCount;
  var stepPosition = Math.round(valueInPercent / stepPercent) * step;
  var valueWithStep = stepPosition + min;
  return valueWithStep;
}

function getCoords(elem) {
  var boxLeft = elem.getBoundingClientRect().left;
  var boxTop = elem.getBoundingClientRect().top;
  var boxRight = elem.getBoundingClientRect().right;
  var boxBottom = elem.getBoundingClientRect().bottom;
  var offsetX = window.pageXOffset;
  var offsetY = window.pageYOffset;
  return {
    left: boxLeft + offsetX,
    bottom: boxBottom + offsetY,
    width: boxRight - boxLeft,
    height: boxBottom - boxTop
  };
}

function getPageCoords(event) {
  var pageX = event.pageX;
  var pageY = event.pageY;
  return {
    pageX: pageX,
    pageY: pageY
  };
}

function getPosition(orientation, sliderCoords, pageCoords) {
  var horizontal = orientation === 'horizontal';
  var position = 0;
  var _pageCoords$pageX = pageCoords.pageX,
      pageX = _pageCoords$pageX === void 0 ? 0 : _pageCoords$pageX,
      _pageCoords$pageY = pageCoords.pageY,
      pageY = _pageCoords$pageY === void 0 ? 0 : _pageCoords$pageY;
  var _sliderCoords$left = sliderCoords.left,
      left = _sliderCoords$left === void 0 ? 0 : _sliderCoords$left,
      _sliderCoords$bottom = sliderCoords.bottom,
      bottom = _sliderCoords$bottom === void 0 ? 0 : _sliderCoords$bottom,
      _sliderCoords$width = sliderCoords.width,
      width = _sliderCoords$width === void 0 ? 0 : _sliderCoords$width,
      _sliderCoords$height = sliderCoords.height,
      height = _sliderCoords$height === void 0 ? 0 : _sliderCoords$height;

  if (horizontal) {
    position = (pageX - left) / width * 100;
  } else {
    position = (bottom - pageY) / height * 100;
  }

  return position;
}


;// CONCATENATED MODULE: ./components/Model/Validation.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Validation_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Validation_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Validation_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Validation_createClass(Constructor, protoProps, staticProps) { if (protoProps) Validation_defineProperties(Constructor.prototype, protoProps); if (staticProps) Validation_defineProperties(Constructor, staticProps); return Constructor; }

function Validation_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable no-param-reassign */


var Validation = /*#__PURE__*/function () {
  function Validation() {
    Validation_classCallCheck(this, Validation);

    Validation_defineProperty(this, "min", void 0);

    Validation_defineProperty(this, "max", void 0);

    Validation_defineProperty(this, "step", void 0);

    Validation_defineProperty(this, "valueFrom", void 0);

    Validation_defineProperty(this, "valueTo", void 0);
  }

  Validation_createClass(Validation, [{
    key: "checkState",
    value: function checkState(state) {
      this.min = state.min || 0;
      this.max = state.max || 0;
      this.step = state.step || 1;
      this.valueFrom = state.valueFrom || 0;
      this.valueTo = state.valueTo || 0;
      this.checkMinMax(this.min, this.max);
      this.step = this.checkStep(this.max, this.step);

      if (state.range) {
        this.checkMinRange(this.valueFrom);
        this.checkMaxRange(this.valueTo);
        this.checkRangeMinMax(this.valueFrom, this.valueTo);
      }

      var result = _objectSpread(_objectSpread({}, state), {}, {
        min: this.min,
        max: this.max,
        step: this.step,
        valueFrom: this.checkValue(this.valueFrom),
        valueTo: this.valueTo
      });

      return result;
    }
  }, {
    key: "checkValue",
    value: function checkValue(value) {
      var valueInPercent = fromValueToPercent({
        min: this.min,
        max: this.max,
        step: this.step
      }, value);
      var correctValue = getValueWithStep(this.min, this.max, this.step, valueInPercent);

      if (valueInPercent >= 100 && correctValue !== this.max) {
        correctValue = this.max;
      }

      if (correctValue > this.max) correctValue = this.max;
      return correctValue;
    }
  }, {
    key: "checkMinRange",
    value: function checkMinRange(value) {
      if (value >= this.valueTo) value = this.valueTo;
      return this.checkValue(value);
    }
  }, {
    key: "checkMaxRange",
    value: function checkMaxRange(value) {
      if (value <= this.valueFrom) value = this.valueFrom;
      return this.checkValue(value);
    }
  }, {
    key: "checkStep",
    value: function checkStep(max, step) {
      var correctStep = step;
      if (step <= 0) correctStep = 1;
      if (step > max) correctStep = max;
      return correctStep;
    }
  }, {
    key: "checkMinMax",
    value: function checkMinMax(min, max) {
      var swap = 0;

      if (min >= max) {
        swap = min;
        min = max;
        max = swap;
      }

      this.min = min;
      this.max = max;
    }
  }, {
    key: "checkRangeMinMax",
    value: function checkRangeMinMax(valueFrom, valueTo) {
      var swap = 0;

      if (valueFrom >= valueTo) {
        swap = valueFrom;
        valueFrom = valueTo;
        valueTo = swap;
      }

      if (valueFrom <= this.min) valueFrom = this.min;
      if (valueTo >= this.max) valueTo = this.max;
      this.valueFrom = this.checkValue(valueFrom);
      this.valueTo = this.checkValue(valueTo);
    }
  }]);

  return Validation;
}();

/* harmony default export */ var Model_Validation = (Validation);
;// CONCATENATED MODULE: ./components/Model/Model.ts
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Model_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Model_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Model_ownKeys(Object(source), true).forEach(function (key) { Model_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Model_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Model_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Model_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Model_createClass(Constructor, protoProps, staticProps) { if (protoProps) Model_defineProperties(Constructor.prototype, protoProps); if (staticProps) Model_defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function Model_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Model = /*#__PURE__*/function (_Emitter) {
  _inherits(Model, _Emitter);

  var _super = _createSuper(Model);

  function Model() {
    var _this;

    Model_classCallCheck(this, Model);

    _this = _super.call(this);

    Model_defineProperty(_assertThisInitialized(_this), "state", defaultState_0);

    Model_defineProperty(_assertThisInitialized(_this), "validation", void 0);

    _this.validation = new Model_Validation();
    return _this;
  }

  Model_createClass(Model, [{
    key: "setState",
    value: function setState(state) {
      var newState = Model_objectSpread(Model_objectSpread({}, this.state), state);

      this.state = this.validation.checkState(newState);
      this.emit('stateChanged', this.state);
    }
  }, {
    key: "getState",
    value: function getState() {
      return this.state;
    }
  }, {
    key: "getValue",
    value: function getValue(keyState) {
      return this.state[keyState];
    }
  }, {
    key: "setValue",
    value: function setValue(keyState, valueState) {
      this.checkStateValue(keyState, valueState);
      this.state = this.validation.checkState(this.state);

      if (this.isValue(keyState)) {
        this.emit('valueChanged', this.state);
      } else {
        this.emit('stateChanged', this.state);
      }
    }
  }, {
    key: "checkStateValue",
    value: function checkStateValue(keyState, valueState) {
      var value;
      var range = this.state.range;
      var isRangeValueFrom = keyState === 'valueFrom' && range;
      var isValueFrom = keyState === 'valueFrom';
      var isValueTo = keyState === 'valueTo';

      if (isRangeValueFrom) {
        value = this.validation.checkMinRange(valueState);
      } else if (isValueFrom) {
        value = this.validation.checkValue(valueState);
      } else if (isValueTo) {
        value = this.validation.checkMaxRange(valueState);
      } else {
        value = valueState;
      }

      this.state[keyState] = value;
    }
  }, {
    key: "isValue",
    value: function isValue(keyState) {
      return keyState === 'valueFrom' || keyState === 'valueTo';
    }
  }]);

  return Model;
}(Emitter_Emitter);

/* harmony default export */ var Model_Model = (Model);
;// CONCATENATED MODULE: ./components/View/subViews/SliderComponent.ts
function SliderComponent_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SliderComponent_typeof = function _typeof(obj) { return typeof obj; }; } else { SliderComponent_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SliderComponent_typeof(obj); }

function SliderComponent_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function SliderComponent_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { SliderComponent_ownKeys(Object(source), true).forEach(function (key) { SliderComponent_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { SliderComponent_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SliderComponent_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SliderComponent_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SliderComponent_createClass(Constructor, protoProps, staticProps) { if (protoProps) SliderComponent_defineProperties(Constructor.prototype, protoProps); if (staticProps) SliderComponent_defineProperties(Constructor, staticProps); return Constructor; }

function SliderComponent_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SliderComponent_setPrototypeOf(subClass, superClass); }

function SliderComponent_setPrototypeOf(o, p) { SliderComponent_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SliderComponent_setPrototypeOf(o, p); }

function SliderComponent_createSuper(Derived) { var hasNativeReflectConstruct = SliderComponent_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = SliderComponent_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = SliderComponent_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return SliderComponent_possibleConstructorReturn(this, result); }; }

function SliderComponent_possibleConstructorReturn(self, call) { if (call && (SliderComponent_typeof(call) === "object" || typeof call === "function")) { return call; } return SliderComponent_assertThisInitialized(self); }

function SliderComponent_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SliderComponent_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function SliderComponent_getPrototypeOf(o) { SliderComponent_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SliderComponent_getPrototypeOf(o); }

function SliderComponent_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var SliderComponent = /*#__PURE__*/function (_Emitter) {
  SliderComponent_inherits(SliderComponent, _Emitter);

  var _super = SliderComponent_createSuper(SliderComponent);

  function SliderComponent(options, root) {
    var _this;

    SliderComponent_classCallCheck(this, SliderComponent);

    _this = _super.call(this);

    SliderComponent_defineProperty(SliderComponent_assertThisInitialized(_this), "state", void 0);

    SliderComponent_defineProperty(SliderComponent_assertThisInitialized(_this), "root", void 0);

    if ((this instanceof SliderComponent ? this.constructor : void 0) === SliderComponent) {
      throw new Error('Can`t instantiate SliderComponent, only concrete one');
    }

    _this.root = root;
    _this.state = options || {};
    return _this;
  }

  SliderComponent_createClass(SliderComponent, [{
    key: "update",
    value: function update(state) {
      this.state = SliderComponent_objectSpread({}, state);
    }
  }]);

  return SliderComponent;
}(Emitter_Emitter);

/* harmony default export */ var subViews_SliderComponent = (SliderComponent);
;// CONCATENATED MODULE: ./components/View/subViews/Scale/Scale.ts
function Scale_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Scale_typeof = function _typeof(obj) { return typeof obj; }; } else { Scale_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Scale_typeof(obj); }

function Scale_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Scale_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Scale_createClass(Constructor, protoProps, staticProps) { if (protoProps) Scale_defineProperties(Constructor.prototype, protoProps); if (staticProps) Scale_defineProperties(Constructor, staticProps); return Constructor; }

function Scale_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Scale_setPrototypeOf(subClass, superClass); }

function Scale_setPrototypeOf(o, p) { Scale_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Scale_setPrototypeOf(o, p); }

function Scale_createSuper(Derived) { var hasNativeReflectConstruct = Scale_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Scale_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Scale_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Scale_possibleConstructorReturn(this, result); }; }

function Scale_possibleConstructorReturn(self, call) { if (call && (Scale_typeof(call) === "object" || typeof call === "function")) { return call; } return Scale_assertThisInitialized(self); }

function Scale_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Scale_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Scale_getPrototypeOf(o) { Scale_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Scale_getPrototypeOf(o); }

function Scale_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Scale = /*#__PURE__*/function (_SliderComponent) {
  Scale_inherits(Scale, _SliderComponent);

  var _super = Scale_createSuper(Scale);

  function Scale() {
    var _this;

    Scale_classCallCheck(this, Scale);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Scale_defineProperty(Scale_assertThisInitialized(_this), "scaleNode", void 0);

    return _this;
  }

  Scale_createClass(Scale, [{
    key: "display",
    value: function display() {
      this.root.innerHTML = '';
      this.root.insertAdjacentHTML('afterbegin', this.getTemplate());
      this.scaleNode = this.root.querySelector('[data-id="scale"]');
      this.onMouseDown = this.onMouseDown.bind(this);
      this.scaleNode.addEventListener('mousedown', this.onMouseDown);
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (this.isTarget(event)) {
        var _this$state = this.state,
            _this$state$min = _this$state.min,
            min = _this$state$min === void 0 ? 0 : _this$state$min,
            _this$state$max = _this$state.max,
            max = _this$state$max === void 0 ? 100 : _this$state$max,
            _this$state$valueFrom = _this$state.valueFrom,
            valueFrom = _this$state$valueFrom === void 0 ? 0 : _this$state$valueFrom,
            _this$state$valueTo = _this$state.valueTo,
            valueTo = _this$state$valueTo === void 0 ? 0 : _this$state$valueTo,
            _this$state$step = _this$state.step,
            step = _this$state$step === void 0 ? 1 : _this$state$step,
            _this$state$orientati = _this$state.orientation,
            orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati,
            _this$state$range = _this$state.range,
            range = _this$state$range === void 0 ? false : _this$state$range;
        var scaleCoords = getCoords(this.scaleNode);
        var pageCoords = getPageCoords(event);
        var position = getPosition(orientation, scaleCoords, pageCoords);
        var correctValue = getValueWithStep(min, max, step, position);

        if (range) {
          var delta = (valueTo - valueFrom) / 2;
          var leftHalfOfScale = valueFrom + delta;

          if (correctValue >= leftHalfOfScale) {
            this.emit('scale:valueTo', correctValue.toFixed());
            this.emit('scale:targetMax', event);
          } else {
            this.emit('scale:valueFrom', correctValue.toFixed());
            this.emit('scale:target', event);
          }
        } else {
          this.emit('scale:valueFrom', correctValue.toFixed());
          this.emit('scale:target', event);
        }
      }
    }
  }, {
    key: "isTarget",
    value: function isTarget(event) {
      if (event.target instanceof HTMLElement) {
        var target = event.target.dataset.id === 'scale' || event.target.dataset.id === 'fill';
        return target;
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state$orientati2 = this.state.orientation,
          orientation = _this$state$orientati2 === void 0 ? 'horizontal' : _this$state$orientati2;
      return "\n      <div class=\"slider slider_".concat(orientation, "\">\n        <div class=\"slider__scale slider__scale_").concat(orientation, "\" data-id=\"scale\"></div>\n      </div>\n    ");
    }
  }]);

  return Scale;
}(subViews_SliderComponent);

/* harmony default export */ var Scale_Scale = (Scale);
;// CONCATENATED MODULE: ./components/View/subViews/Fill/Fill.ts
function Fill_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Fill_typeof = function _typeof(obj) { return typeof obj; }; } else { Fill_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Fill_typeof(obj); }

function Fill_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Fill_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Fill_createClass(Constructor, protoProps, staticProps) { if (protoProps) Fill_defineProperties(Constructor.prototype, protoProps); if (staticProps) Fill_defineProperties(Constructor, staticProps); return Constructor; }

function Fill_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Fill_setPrototypeOf(subClass, superClass); }

function Fill_setPrototypeOf(o, p) { Fill_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Fill_setPrototypeOf(o, p); }

function Fill_createSuper(Derived) { var hasNativeReflectConstruct = Fill_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Fill_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Fill_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Fill_possibleConstructorReturn(this, result); }; }

function Fill_possibleConstructorReturn(self, call) { if (call && (Fill_typeof(call) === "object" || typeof call === "function")) { return call; } return Fill_assertThisInitialized(self); }

function Fill_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Fill_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Fill_getPrototypeOf(o) { Fill_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Fill_getPrototypeOf(o); }





var Fill = /*#__PURE__*/function (_SliderComponent) {
  Fill_inherits(Fill, _SliderComponent);

  var _super = Fill_createSuper(Fill);

  function Fill() {
    Fill_classCallCheck(this, Fill);

    return _super.apply(this, arguments);
  }

  Fill_createClass(Fill, [{
    key: "display",
    value: function display() {
      var scale = this.root.querySelector('[data-id="scale"]');
      if (!scale) throw new Error('Scale element is not found');
      if (this.state.fill) return scale.insertAdjacentHTML('afterbegin', this.getTemplate());
    }
  }, {
    key: "update",
    value: function update(state) {
      var fill = this.root.querySelector('[data-id="fill"]');
      var _state$orientation = state.orientation,
          orientation = _state$orientation === void 0 ? 'horizontal' : _state$orientation,
          _state$range = state.range,
          range = _state$range === void 0 ? false : _state$range;
      var _state$valueTo = state.valueTo,
          valueTo = _state$valueTo === void 0 ? 100 : _state$valueTo,
          _state$valueFrom = state.valueFrom,
          valueFrom = _state$valueFrom === void 0 ? 0 : _state$valueFrom;
      var isHorizontal = orientation === 'horizontal';
      var wayOfFilling = isHorizontal ? 'width' : 'height';
      var wayOfMove = isHorizontal ? 'left' : 'bottom';
      valueFrom = fromValueToPercent(state, valueFrom);

      if (fill && range) {
        valueTo = fromValueToPercent(state, valueTo);
        fill.style[wayOfFilling] = "".concat(valueTo - valueFrom, "%");
        fill.style[wayOfMove] = "".concat(valueFrom, "%");
      } else if (fill) {
        fill.style[wayOfFilling] = "".concat(valueFrom, "%");
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state = this.state,
          _this$state$color = _this$state.color,
          color = _this$state$color === void 0 ? 'orange' : _this$state$color,
          _this$state$orientati = _this$state.orientation,
          orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati;
      return "\n      <div class=\"slider__fill slider__fill_".concat(orientation, " slider__fill_").concat(color, " \"data-id=\"fill\"></div>\n    ");
    }
  }]);

  return Fill;
}(subViews_SliderComponent);

/* harmony default export */ var Fill_Fill = (Fill);
;// CONCATENATED MODULE: ./components/View/subViews/Knobs/Knob.ts
function Knob_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Knob_typeof = function _typeof(obj) { return typeof obj; }; } else { Knob_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Knob_typeof(obj); }

function Knob_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Knob_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Knob_ownKeys(Object(source), true).forEach(function (key) { Knob_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Knob_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Knob_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Knob_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Knob_createClass(Constructor, protoProps, staticProps) { if (protoProps) Knob_defineProperties(Constructor.prototype, protoProps); if (staticProps) Knob_defineProperties(Constructor, staticProps); return Constructor; }

function Knob_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Knob_setPrototypeOf(subClass, superClass); }

function Knob_setPrototypeOf(o, p) { Knob_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Knob_setPrototypeOf(o, p); }

function Knob_createSuper(Derived) { var hasNativeReflectConstruct = Knob_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Knob_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Knob_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Knob_possibleConstructorReturn(this, result); }; }

function Knob_possibleConstructorReturn(self, call) { if (call && (Knob_typeof(call) === "object" || typeof call === "function")) { return call; } return Knob_assertThisInitialized(self); }

function Knob_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Knob_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Knob_getPrototypeOf(o) { Knob_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Knob_getPrototypeOf(o); }

function Knob_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Knob = /*#__PURE__*/function (_SliderComponent) {
  Knob_inherits(Knob, _SliderComponent);

  var _super = Knob_createSuper(Knob);

  function Knob() {
    var _this;

    Knob_classCallCheck(this, Knob);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    Knob_defineProperty(Knob_assertThisInitialized(_this), "scale", void 0);

    Knob_defineProperty(Knob_assertThisInitialized(_this), "knob", void 0);

    return _this;
  }

  Knob_createClass(Knob, [{
    key: "display",
    value: function display() {
      this.scale = this.root.querySelector('[data-id="scale"]');
      if (!this.scale) throw new Error('Scale element is not found');
      this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
      this.knob = this.root.querySelector('[data-id="knob"]');
      this.addEventListeners();
    }
  }, {
    key: "update",
    value: function update(state) {
      this.state = Knob_objectSpread({}, state);
      var orientation = this.state.orientation;

      if (this.knob) {
        var directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
        var _state$valueFrom = state.valueFrom,
            valueFrom = _state$valueFrom === void 0 ? 0 : _state$valueFrom;
        this.knob.style[directionOfMove] = "".concat(fromValueToPercent(state, valueFrom), "%");
      }
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "onMouseDown",
    value: function onMouseDown(_mouseEvent) {
      var _this2 = this;

      var _this$state = this.state,
          _this$state$min = _this$state.min,
          min = _this$state$min === void 0 ? 0 : _this$state$min,
          _this$state$max = _this$state.max,
          max = _this$state$max === void 0 ? 100 : _this$state$max,
          _this$state$step = _this$state.step,
          step = _this$state$step === void 0 ? 1 : _this$state$step,
          _this$state$orientati = _this$state.orientation,
          orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati;

      document.onmousemove = function (mouseEvent) {
        mouseEvent.preventDefault();
        var scaleCoords = getCoords(_this2.scale);
        var pageCoords = getPageCoords(mouseEvent);
        var position = getPosition(orientation, scaleCoords, pageCoords);
        var correctValue = getValueWithStep(min, max, step, position);

        _this2.emit('changeValue', correctValue.toFixed());
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.knob.addEventListener('mousedown', this.onMouseDown);
      this.knob.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state2 = this.state,
          _this$state2$orientat = _this$state2.orientation,
          orientation = _this$state2$orientat === void 0 ? 'horizontal' : _this$state2$orientat,
          _this$state2$color = _this$state2.color,
          color = _this$state2$color === void 0 ? 'orange' : _this$state2$color;
      return "\n      <div class=\"slider__knob slider__knob_".concat(orientation, " slider__knob_").concat(color, "\" \n        data-id=\"knob\" role=\"slider\" tabindex=\"0\"></div>\n    ");
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$state3 = this.state,
          _this$state3$valueFro = _this$state3.valueFrom,
          valueFrom = _this$state3$valueFro === void 0 ? 0 : _this$state3$valueFro,
          _this$state3$step = _this$state3.step,
          step = _this$state3$step === void 0 ? 1 : _this$state3$step;
      var code = event.code;
      var newValue = 0;

      if (code === 'ArrowRight' || code === 'ArrowUp') {
        newValue = valueFrom + step;
        this.emit('changeValue', newValue);
      }

      if (code === 'ArrowLeft' || code === 'ArrowDown') {
        newValue = valueFrom - step;
        this.emit('changeValue', newValue);
      }
    }
  }]);

  return Knob;
}(subViews_SliderComponent);

/* harmony default export */ var Knobs_Knob = (Knob);
;// CONCATENATED MODULE: ./components/View/subViews/Knobs/SecondKnob.ts
function SecondKnob_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { SecondKnob_typeof = function _typeof(obj) { return typeof obj; }; } else { SecondKnob_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return SecondKnob_typeof(obj); }

function SecondKnob_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function SecondKnob_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { SecondKnob_ownKeys(Object(source), true).forEach(function (key) { SecondKnob_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { SecondKnob_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SecondKnob_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SecondKnob_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function SecondKnob_createClass(Constructor, protoProps, staticProps) { if (protoProps) SecondKnob_defineProperties(Constructor.prototype, protoProps); if (staticProps) SecondKnob_defineProperties(Constructor, staticProps); return Constructor; }

function SecondKnob_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) SecondKnob_setPrototypeOf(subClass, superClass); }

function SecondKnob_setPrototypeOf(o, p) { SecondKnob_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return SecondKnob_setPrototypeOf(o, p); }

function SecondKnob_createSuper(Derived) { var hasNativeReflectConstruct = SecondKnob_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = SecondKnob_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = SecondKnob_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return SecondKnob_possibleConstructorReturn(this, result); }; }

function SecondKnob_possibleConstructorReturn(self, call) { if (call && (SecondKnob_typeof(call) === "object" || typeof call === "function")) { return call; } return SecondKnob_assertThisInitialized(self); }

function SecondKnob_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function SecondKnob_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function SecondKnob_getPrototypeOf(o) { SecondKnob_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return SecondKnob_getPrototypeOf(o); }

function SecondKnob_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var SecondKnob = /*#__PURE__*/function (_SliderComponent) {
  SecondKnob_inherits(SecondKnob, _SliderComponent);

  var _super = SecondKnob_createSuper(SecondKnob);

  function SecondKnob() {
    var _this;

    SecondKnob_classCallCheck(this, SecondKnob);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    SecondKnob_defineProperty(SecondKnob_assertThisInitialized(_this), "scale", void 0);

    SecondKnob_defineProperty(SecondKnob_assertThisInitialized(_this), "secondKnob", void 0);

    return _this;
  }

  SecondKnob_createClass(SecondKnob, [{
    key: "display",
    value: function display() {
      this.scale = this.root.querySelector('[data-id="scale"]');
      if (!this.scale) throw new Error('Scale element is not found');
      this.scale.insertAdjacentHTML('beforeend', this.getTemplate());
      this.secondKnob = this.root.querySelector('[data-knob="second"]');
      this.addEventListeners();
    }
  }, {
    key: "update",
    value: function update(state) {
      this.state = SecondKnob_objectSpread({}, state);
      var _this$state$orientati = this.state.orientation,
          orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati;

      if (this.secondKnob) {
        var directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
        var _state$valueTo = state.valueTo,
            valueTo = _state$valueTo === void 0 ? 0 : _state$valueTo;
        this.secondKnob.style[directionOfMove] = "".concat(fromValueToPercent(state, valueTo), "%");
      }
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "onMouseDown",
    value: function onMouseDown(_mouseEvent) {
      var _this2 = this;

      var _this$state = this.state,
          _this$state$min = _this$state.min,
          min = _this$state$min === void 0 ? 0 : _this$state$min,
          _this$state$max = _this$state.max,
          max = _this$state$max === void 0 ? 100 : _this$state$max,
          _this$state$step = _this$state.step,
          step = _this$state$step === void 0 ? 1 : _this$state$step,
          _this$state$orientati2 = _this$state.orientation,
          orientation = _this$state$orientati2 === void 0 ? 'horizontal' : _this$state$orientati2;

      document.onmousemove = function (mouseEvent) {
        mouseEvent.preventDefault();
        var scaleCoords = getCoords(_this2.scale);
        var pageCoords = getPageCoords(mouseEvent);
        var position = getPosition(orientation, scaleCoords, pageCoords);
        var correctValue = getValueWithStep(min, max, step, position);

        _this2.emit('changeValue', correctValue.toFixed());
      };

      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      this.onMouseDown = this.onMouseDown.bind(this);
      this.onKeyDown = this.onKeyDown.bind(this);
      this.secondKnob.addEventListener('mousedown', this.onMouseDown);
      this.secondKnob.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state2 = this.state,
          _this$state2$orientat = _this$state2.orientation,
          orientation = _this$state2$orientat === void 0 ? 'horizontal' : _this$state2$orientat,
          _this$state2$color = _this$state2.color,
          color = _this$state2$color === void 0 ? 'orange' : _this$state2$color;
      return "\n      <div class=\"slider__knob slider__knob_".concat(orientation, " slider__knob_").concat(color, "\" \n      data-knob=\"second\" role=\"slider\" tabindex=\"0\"></div>\n    ");
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      var _this$state3 = this.state,
          _this$state3$valueTo = _this$state3.valueTo,
          valueTo = _this$state3$valueTo === void 0 ? 0 : _this$state3$valueTo,
          _this$state3$step = _this$state3.step,
          step = _this$state3$step === void 0 ? 1 : _this$state3$step;
      var code = event.code;
      var newValue = 0;

      if (code === 'ArrowRight' || code === 'ArrowUp') {
        newValue = valueTo + step;
        this.emit('changeValue', newValue);
      }

      if (code === 'ArrowLeft' || code === 'ArrowDown') {
        newValue = valueTo - step;
        this.emit('changeValue', newValue);
      }
    }
  }]);

  return SecondKnob;
}(subViews_SliderComponent);

/* harmony default export */ var Knobs_SecondKnob = (SecondKnob);
;// CONCATENATED MODULE: ./components/View/subViews/Tooltips/Tooltips.ts
function Tooltips_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Tooltips_typeof = function _typeof(obj) { return typeof obj; }; } else { Tooltips_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Tooltips_typeof(obj); }

function Tooltips_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Tooltips_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Tooltips_createClass(Constructor, protoProps, staticProps) { if (protoProps) Tooltips_defineProperties(Constructor.prototype, protoProps); if (staticProps) Tooltips_defineProperties(Constructor, staticProps); return Constructor; }

function Tooltips_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Tooltips_setPrototypeOf(subClass, superClass); }

function Tooltips_setPrototypeOf(o, p) { Tooltips_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Tooltips_setPrototypeOf(o, p); }

function Tooltips_createSuper(Derived) { var hasNativeReflectConstruct = Tooltips_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Tooltips_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Tooltips_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Tooltips_possibleConstructorReturn(this, result); }; }

function Tooltips_possibleConstructorReturn(self, call) { if (call && (Tooltips_typeof(call) === "object" || typeof call === "function")) { return call; } return Tooltips_assertThisInitialized(self); }

function Tooltips_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Tooltips_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Tooltips_getPrototypeOf(o) { Tooltips_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Tooltips_getPrototypeOf(o); }




var Tooltip = /*#__PURE__*/function (_SliderComponent) {
  Tooltips_inherits(Tooltip, _SliderComponent);

  var _super = Tooltips_createSuper(Tooltip);

  function Tooltip() {
    Tooltips_classCallCheck(this, Tooltip);

    return _super.apply(this, arguments);
  }

  Tooltips_createClass(Tooltip, [{
    key: "display",
    value: function display() {
      var _this$state$tooltips = this.state.tooltips,
          tooltips = _this$state$tooltips === void 0 ? false : _this$state$tooltips;

      if (tooltips) {
        var knob = this.root.querySelector('[data-id="knob"]');
        if (!knob) throw new Error('Knob element is not found');
        knob.insertAdjacentHTML('afterbegin', this.getTemplate());
      }
    }
  }, {
    key: "update",
    value: function update(state) {
      var tooltip = this.root.querySelector('[data-id="tooltip-value"]');
      tooltip.innerText = "".concat(state.valueFrom);
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state = this.state,
          _this$state$orientati = _this$state.orientation,
          orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati,
          _this$state$color = _this$state.color,
          color = _this$state$color === void 0 ? 'orange' : _this$state$color;
      var verticalTooltipClass = orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';
      return "\n      <div class=\"slider__tooltip slider__tooltip_".concat(orientation, " slider__tooltip_").concat(color, "\">\n        <span class=\"tooltip__value\" data-id=\"tooltip-value\"></span>\n        <div class=\"slider__tooltip_arrow ").concat(verticalTooltipClass, "\"></div>\n      </div>\n    ");
    }
  }]);

  return Tooltip;
}(subViews_SliderComponent);

var SecondTooltip = /*#__PURE__*/function (_SliderComponent2) {
  Tooltips_inherits(SecondTooltip, _SliderComponent2);

  var _super2 = Tooltips_createSuper(SecondTooltip);

  function SecondTooltip() {
    Tooltips_classCallCheck(this, SecondTooltip);

    return _super2.apply(this, arguments);
  }

  Tooltips_createClass(SecondTooltip, [{
    key: "display",
    value: function display() {
      var _this$state$tooltips2 = this.state.tooltips,
          tooltips = _this$state$tooltips2 === void 0 ? false : _this$state$tooltips2;

      if (tooltips) {
        var secondKnob = this.root.querySelector('[data-knob="second"]');
        if (!secondKnob) throw new Error('Second knob element is not found');
        secondKnob.insertAdjacentHTML('afterbegin', this.getTemplate());
      }
    }
  }, {
    key: "update",
    value: function update(state) {
      var tooltipSecond = this.root.querySelector('[data-id="tooltip-value-second"]');
      tooltipSecond.innerText = "".concat(state.valueTo);
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state2 = this.state,
          _this$state2$orientat = _this$state2.orientation,
          orientation = _this$state2$orientat === void 0 ? 'horizontal' : _this$state2$orientat,
          _this$state2$color = _this$state2.color,
          color = _this$state2$color === void 0 ? 'orange' : _this$state2$color;
      var verticalTooltipClass = orientation === 'vertical' ? 'slider__tooltip_arrow_vertical' : '';
      return "\n      <div class=\"slider__tooltip slider__tooltip_".concat(orientation, " slider__tooltip_").concat(color, "\" data-tooltip=\"second\">\n        <span class=\"tooltip__value\" data-id=\"tooltip-value-second\"></span>\n        <div class=\"slider__tooltip_arrow ").concat(verticalTooltipClass, "\"></div>\n      </div>\n    ");
    }
  }]);

  return SecondTooltip;
}(subViews_SliderComponent);


;// CONCATENATED MODULE: ./components/View/subViews/Labels/Labels.ts
function Labels_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Labels_typeof = function _typeof(obj) { return typeof obj; }; } else { Labels_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Labels_typeof(obj); }

function Labels_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Labels_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Labels_createClass(Constructor, protoProps, staticProps) { if (protoProps) Labels_defineProperties(Constructor.prototype, protoProps); if (staticProps) Labels_defineProperties(Constructor, staticProps); return Constructor; }

function Labels_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Labels_setPrototypeOf(subClass, superClass); }

function Labels_setPrototypeOf(o, p) { Labels_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Labels_setPrototypeOf(o, p); }

function Labels_createSuper(Derived) { var hasNativeReflectConstruct = Labels_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Labels_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Labels_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Labels_possibleConstructorReturn(this, result); }; }

function Labels_possibleConstructorReturn(self, call) { if (call && (Labels_typeof(call) === "object" || typeof call === "function")) { return call; } return Labels_assertThisInitialized(self); }

function Labels_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Labels_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function Labels_getPrototypeOf(o) { Labels_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Labels_getPrototypeOf(o); }





var Labels = /*#__PURE__*/function (_SliderComponent) {
  Labels_inherits(Labels, _SliderComponent);

  var _super = Labels_createSuper(Labels);

  function Labels() {
    Labels_classCallCheck(this, Labels);

    return _super.apply(this, arguments);
  }

  Labels_createClass(Labels, [{
    key: "display",
    value: function display() {
      var scale = this.root.querySelector('[data-id="scale"]');
      if (!scale) throw new Error('Scale element is not found');

      if (this.state.labels) {
        scale.insertAdjacentHTML('beforeend', this.getTemplate());
        var labels = this.root.querySelector('[data-id="labels"]');
        this.onMouseDown = this.onMouseDown.bind(this);
        labels.addEventListener('mousedown', this.onMouseDown);
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var _this$state$orientati = this.state.orientation,
          orientation = _this$state$orientati === void 0 ? 'horizontal' : _this$state$orientati;
      return "\n      <div class=\"slider__labels slider__labels_".concat(orientation, "\" data-id=\"labels\">\n        ").concat(this.getLabels(), "\n      </div>\n    ");
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this = this;

      var _this$state = this.state,
          _this$state$min = _this$state.min,
          min = _this$state$min === void 0 ? 0 : _this$state$min,
          _this$state$max = _this$state.max,
          max = _this$state$max === void 0 ? 0 : _this$state$max,
          _this$state$step = _this$state.step,
          step = _this$state$step === void 0 ? 1 : _this$state$step;
      var itemLabels = [];
      var labelValues = [20, 40, 60, 80];
      labelValues = labelValues.map(function (value) {
        return getValueWithStep(min, max, step, value);
      }).concat(min, max).sort(function (a, b) {
        return a - b;
      });
      labelValues.forEach(function (value) {
        itemLabels.push(_this.createLabel(value));
      });
      return itemLabels.join('');
    }
  }, {
    key: "createLabel",
    value: function createLabel() {
      var labelPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var orientation = this.state.orientation;
      var directionOfMove = orientation === 'horizontal' ? 'left' : 'bottom';
      var labelPosWithPercent = fromValueToPercent(this.state, labelPosition).toFixed(2);
      var label = "\n      <div class=\"slider__labels-item\" \n      style=\"".concat(directionOfMove, ": ").concat(labelPosWithPercent, "%;\"\n      data-value=").concat(labelPosWithPercent, ">\n        ").concat(labelPosition, "\n      </div>\n    ");
      return label;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      if (event.target instanceof HTMLElement) {
        var _this$state2 = this.state,
            min = _this$state2.min,
            _this$state2$max = _this$state2.max,
            max = _this$state2$max === void 0 ? 0 : _this$state2$max,
            _this$state2$step = _this$state2.step,
            step = _this$state2$step === void 0 ? 1 : _this$state2$step,
            _this$state2$valueFro = _this$state2.valueFrom,
            valueFrom = _this$state2$valueFro === void 0 ? 0 : _this$state2$valueFro,
            _this$state2$valueTo = _this$state2.valueTo,
            valueTo = _this$state2$valueTo === void 0 ? 0 : _this$state2$valueTo,
            _this$state2$range = _this$state2.range,
            range = _this$state2$range === void 0 ? false : _this$state2$range;
        var targetValue = Number(event.target.dataset.value);
        var correctValue = getValueWithStep(min, max, step, targetValue);
        if (targetValue === 100) correctValue = max;

        if (range) {
          var delta = (valueTo - valueFrom) / 2;
          var leftHalfOfScale = valueFrom + delta;

          if (correctValue >= leftHalfOfScale) {
            this.emit('labels:valueTo', correctValue);
          } else {
            this.emit('labels:valueFrom', correctValue);
          }
        } else {
          this.emit('labels:valueFrom', correctValue);
        }
      }
    }
  }]);

  return Labels;
}(subViews_SliderComponent);

/* harmony default export */ var Labels_Labels = (Labels);
;// CONCATENATED MODULE: ./components/View/Factories/factories.ts
function factories_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function factories_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function factories_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function factories_createClass(Constructor, protoProps, staticProps) { if (protoProps) factories_defineProperties(Constructor.prototype, protoProps); if (staticProps) factories_defineProperties(Constructor, staticProps); return Constructor; }

/* eslint max-classes-per-file: "off" */







var SimpleSlider = /*#__PURE__*/function () {
  function SimpleSlider() {
    factories_classCallCheck(this, SimpleSlider);
  }

  factories_createClass(SimpleSlider, [{
    key: "createComponents",
    value: function createComponents(options, root) {
      var elements = [Scale_Scale, Fill_Fill, Knobs_Knob, Labels_Labels, Tooltip];
      var components = [];
      elements.forEach(function (Element) {
        var element = new Element(options, root);
        components.push(element);
      });
      return components;
    }
  }]);

  return SimpleSlider;
}();

var RangeSlider = /*#__PURE__*/function () {
  function RangeSlider() {
    factories_classCallCheck(this, RangeSlider);
  }

  factories_createClass(RangeSlider, [{
    key: "createComponents",
    value: function createComponents(options, root) {
      var elements = [Scale_Scale, Fill_Fill, Knobs_Knob, Knobs_SecondKnob, Tooltip, SecondTooltip, Labels_Labels];
      var components = [];
      elements.forEach(function (Element) {
        var element = new Element(options, root);
        components.push(element);
      });
      return components;
    }
  }]);

  return RangeSlider;
}();

var SliderFactory = /*#__PURE__*/function () {
  function SliderFactory() {
    factories_classCallCheck(this, SliderFactory);
  }

  factories_createClass(SliderFactory, [{
    key: "create",
    value: function create(type) {
      var sliderType = type === 'range' ? 'range' : 'simple';
      var Slider = SliderFactory.list[sliderType];
      var slider = new Slider();
      return slider;
    }
  }]);

  return SliderFactory;
}();

factories_defineProperty(SliderFactory, "list", {
  simple: SimpleSlider,
  range: RangeSlider
});


;// CONCATENATED MODULE: ./components/View/View.ts
function View_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { View_typeof = function _typeof(obj) { return typeof obj; }; } else { View_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return View_typeof(obj); }

function View_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function View_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function View_createClass(Constructor, protoProps, staticProps) { if (protoProps) View_defineProperties(Constructor.prototype, protoProps); if (staticProps) View_defineProperties(Constructor, staticProps); return Constructor; }

function View_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) View_setPrototypeOf(subClass, superClass); }

function View_setPrototypeOf(o, p) { View_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return View_setPrototypeOf(o, p); }

function View_createSuper(Derived) { var hasNativeReflectConstruct = View_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = View_getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = View_getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return View_possibleConstructorReturn(this, result); }; }

function View_possibleConstructorReturn(self, call) { if (call && (View_typeof(call) === "object" || typeof call === "function")) { return call; } return View_assertThisInitialized(self); }

function View_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function View_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function View_getPrototypeOf(o) { View_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return View_getPrototypeOf(o); }

function View_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var View = /*#__PURE__*/function (_Emitter) {
  View_inherits(View, _Emitter);

  var _super = View_createSuper(View);

  function View(root) {
    var _this;

    View_classCallCheck(this, View);

    _this = _super.call(this);

    View_defineProperty(View_assertThisInitialized(_this), "root", void 0);

    View_defineProperty(View_assertThisInitialized(_this), "type", void 0);

    View_defineProperty(View_assertThisInitialized(_this), "componentList", void 0);

    View_defineProperty(View_assertThisInitialized(_this), "components", void 0);

    _this.root = root;
    return _this;
  }

  View_createClass(View, [{
    key: "init",
    value: function init(options) {
      if (!options) throw new Error('options were not passed');
      this.components = [];
      this.type = options.range ? 'range' : 'simple';
      var sliderFactory = new SliderFactory();
      var slider = sliderFactory.create(this.type);
      this.components = slider.createComponents(options, this.root);
      this.displaySlider();
      this.createComponentList();
      this.bindEvents();
    }
  }, {
    key: "update",
    value: function update(state) {
      this.components.forEach(function (component) {
        if (component) component.update(state);
      });
    }
  }, {
    key: "displaySlider",
    value: function displaySlider() {
      this.components.forEach(function (element) {
        if (element) element.display();
      });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      this.bindScaleEvents();
      this.bindKnobsEvents();
      this.bindLabelsEvents();
    }
  }, {
    key: "createComponentList",
    value: function createComponentList() {
      var _this2 = this;

      this.componentList = {};
      this.components.forEach(function (element) {
        if (element) _this2.componentList[element.constructor.name] = element;
      });
    }
    /* istanbul ignore next */

  }, {
    key: "bindScaleEvents",
    value: function bindScaleEvents() {
      var _this3 = this;

      if (this.componentList.Scale) {
        this.componentList.Scale.subscribe('scale:valueFrom', function (valueFrom) {
          return _this3.emit('slider:mousemove', valueFrom);
        });
        this.componentList.Scale.subscribe('scale:valueTo', function (valueTo) {
          return _this3.emit('secondKnob:mousemove', valueTo);
        });
        this.componentList.Scale.subscribe('scale:target', function (event) {
          if (_this3.componentList.Knob) _this3.componentList.Knob.onMouseDown(event);
        });
        this.componentList.Scale.subscribe('scale:targetMax', function (event) {
          if (_this3.componentList.SecondKnob) _this3.componentList.SecondKnob.onMouseDown(event);
        });
      }
    }
    /* istanbul ignore next */

  }, {
    key: "bindKnobsEvents",
    value: function bindKnobsEvents() {
      var _this4 = this;

      if (this.componentList.Knob) {
        this.componentList.Knob.subscribe('changeValue', function (valueFrom) {
          return _this4.emit('slider:mousemove', valueFrom);
        });
      }

      if (this.type === 'range' && this.componentList.SecondKnob) {
        this.componentList.SecondKnob.subscribe('changeValue', function (valueFrom) {
          return _this4.emit('secondKnob:mousemove', valueFrom);
        });
      }
    }
    /* istanbul ignore next */

  }, {
    key: "bindLabelsEvents",
    value: function bindLabelsEvents() {
      var _this5 = this;

      if (this.componentList.Labels) {
        this.componentList.Labels.subscribe('labels:valueFrom', function (valueFrom) {
          return _this5.emit('slider:mousemove', valueFrom);
        });
        this.componentList.Labels.subscribe('labels:valueTo', function (valueTo) {
          return _this5.emit('secondKnob:mousemove', valueTo);
        });
      }
    }
  }]);

  return View;
}(Emitter_Emitter);

/* harmony default export */ var View_View = (View);
;// CONCATENATED MODULE: ./components/Presenter/Presenter.ts
function Presenter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Presenter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Presenter_createClass(Constructor, protoProps, staticProps) { if (protoProps) Presenter_defineProperties(Constructor.prototype, protoProps); if (staticProps) Presenter_defineProperties(Constructor, staticProps); return Constructor; }

function Presenter_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var Presenter = /*#__PURE__*/function () {
  function Presenter(root) {
    Presenter_classCallCheck(this, Presenter);

    Presenter_defineProperty(this, "model", void 0);

    Presenter_defineProperty(this, "view", void 0);

    Presenter_defineProperty(this, "root", void 0);

    this.root = root;
    this.model = new Model_Model();
    this.view = new View_View(root);
    this.init();
  }

  Presenter_createClass(Presenter, [{
    key: "init",
    value: function init() {
      this.view.init(this.model.state);
      this.view.update(this.model.state);
      this.bindModelEvents();
      this.bindViewEvents();
    }
  }, {
    key: "bindModelEvents",
    value: function bindModelEvents() {
      var _this = this;

      this.model.subscribe('stateChanged', function (state) {
        if (state instanceof Object) {
          _this.view.init(state);

          _this.view.update(state);
        }

        _this.customEvent();
      });
      this.model.subscribe('valueChanged', function (state) {
        if (state instanceof Object) _this.view.update(state);

        _this.customEvent();
      });
    }
  }, {
    key: "bindViewEvents",
    value: function bindViewEvents() {
      var _this2 = this;

      this.view.subscribe('slider:mousemove', function (valueFrom) {
        _this2.model.setValue('valueFrom', Number(valueFrom));
      });
      this.view.subscribe('secondKnob:mousemove', function (valueTo) {
        _this2.model.setValue('valueTo', Number(valueTo));
      });
    }
  }, {
    key: "customEvent",
    value: function customEvent() {
      this.root.dispatchEvent(new CustomEvent('onChange', {
        detail: this.model.state
      }));
    }
  }]);

  return Presenter;
}();

/* harmony default export */ var Presenter_Presenter = (Presenter);
;// CONCATENATED MODULE: ./app.ts
function app_typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { app_typeof = function _typeof(obj) { return typeof obj; }; } else { app_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return app_typeof(obj); }


var methods = {
  init: function init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var index = this[0].id;
    /* для разработки - удалить */
    // eslint-disable-next-line func-names

    return this.each(function () {
      $(this).data().sliderPlugin = new Presenter_Presenter(this);

      if (options) {
        var app = $(this).data('sliderPlugin');
        app.model.setState(options);
        window[index] = app;
        /* для разработки - удалить */
      }
    });
  },
  getState: function getState() {
    var sliderPlugin = $(this).data('sliderPlugin');
    var state = sliderPlugin.model.getState();
    return state;
  },
  setValue: function setValue(name, value) {
    var sliderPlugin = $(this).data('sliderPlugin');
    sliderPlugin.model.setValue("".concat(name), value);
  },
  onChange: function onChange(func) {
    // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
    $(this).on('onChange', function (args) {
      return func(args);
    });
  }
};

// eslint-disable-next-line func-names
$.fn.sliderPlugin = function (method) {
  if (methods[method]) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return methods[method].apply(this, args);
  }

  if (app_typeof(method) === 'object') {
    var _options = method || {};

    return methods.init.call(this, _options);
  }

  $.error("\u041C\u0435\u0442\u043E\u0434 \u0441 \u0438\u043C\u0435\u043D\u0435\u043C ".concat(method, " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442"));
};
/******/ })()
;