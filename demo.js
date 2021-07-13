/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./demo-page/DemoBlock.ts
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable */
var DemoBlock = /*#__PURE__*/function () {
  function DemoBlock(root) {
    _classCallCheck(this, DemoBlock);

    _defineProperty(this, "root", void 0);

    _defineProperty(this, "state", {});

    _defineProperty(this, "panel", void 0);

    _defineProperty(this, "min", void 0);

    _defineProperty(this, "max", void 0);

    _defineProperty(this, "valueFrom", void 0);

    _defineProperty(this, "step", void 0);

    _defineProperty(this, "valueTo", void 0);

    _defineProperty(this, "orientation", void 0);

    _defineProperty(this, "fill", void 0);

    _defineProperty(this, "range", void 0);

    _defineProperty(this, "labels", void 0);

    _defineProperty(this, "tooltips", void 0);

    this.root = root;
  }

  _createClass(DemoBlock, [{
    key: "init",
    value: function init() {
      var _this$root$get$parent,
          _this = this;

      this.panel = (_this$root$get$parent = this.root.get(0).parentElement) === null || _this$root$get$parent === void 0 ? void 0 : _this$root$get$parent.querySelector('[data-id="control-panel"]');
      this.min = this.panel.querySelector('[data-title="min"]');
      this.max = this.panel.querySelector('[data-title="max"]');
      this.valueFrom = this.panel.querySelector('[data-title="from"]');
      this.step = this.panel.querySelector('[data-title="step"]');
      this.valueTo = this.panel.querySelector('[data-title="to"]');
      this.orientation = this.panel.querySelector('[data-title="orientation"]');
      this.fill = this.panel.querySelector('[data-title="fill"]');
      this.range = this.panel.querySelector('[data-title="range"]');
      this.labels = this.panel.querySelector('[data-title="labels"]');
      this.tooltips = this.panel.querySelector('[data-title="tooltips"]');
      this.state = this.root.sliderPlugin('getState');
      this.min.value = "".concat(this.state.min);
      this.max.value = "".concat(this.state.max);
      this.valueFrom.value = "".concat(this.state.valueFrom);
      this.step.value = "".concat(this.state.step);

      if (this.state.range) {
        this.valueTo.disabled = false;
        this.valueTo.value = "".concat(this.state.valueTo);
      }

      this.orientation.value = "".concat(this.state.orientation);
      this.fill.checked = this.state.fill;
      this.range.checked = this.state.range;
      this.labels.checked = this.state.labels;
      this.tooltips.checked = this.state.tooltips;
      this.root.sliderPlugin('onChange', function (event) {
        _this.state = event.detail;

        if (_this.state.range) {
          _this.valueTo.disabled = false;
          _this.valueTo.value = event.detail.valueTo;
        } else {
          _this.valueTo.disabled = true;
        }

        _this.valueFrom.value = event.detail.valueFrom;
        _this.step.value = event.detail.step;
        _this.min.value = event.detail.min;
        _this.max.value = event.detail.max;
        _this.orientation.value = event.detail.orientation;
        _this.fill.checked = event.detail.fill;
        _this.range.checked = event.detail.range;
        _this.labels.checked = event.detail.labels;
        _this.tooltips.checked = event.detail.tooltips;
      });
      this.addEventListeners();
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this2 = this;

      this.valueFrom.addEventListener('change', function () {
        var value = 0;
        value = Number(_this2.valueFrom.value);

        _this2.root.sliderPlugin('setValue', 'valueFrom', value);
      });
      this.valueFrom.addEventListener('keydown', function (event) {
        var _this2$state = _this2.state,
            _this2$state$valueFro = _this2$state.valueFrom,
            valueFrom = _this2$state$valueFro === void 0 ? 0 : _this2$state$valueFro,
            _this2$state$step = _this2$state.step,
            step = _this2$state$step === void 0 ? 0 : _this2$state$step;
        var code = event.code;
        var newValue = 0;

        if (code === 'ArrowUp' || code === 'ArrowRight') {
          newValue = valueFrom + step;

          _this2.root.sliderPlugin('setValue', 'valueFrom', newValue);
        }

        if (code === 'ArrowDown' || code === 'ArrowLeft') {
          newValue = valueFrom - step;

          _this2.root.sliderPlugin('setValue', 'valueFrom', newValue);
        }
      });
      this.valueTo.addEventListener('keydown', function (event) {
        var _this2$state2 = _this2.state,
            _this2$state2$valueTo = _this2$state2.valueTo,
            valueTo = _this2$state2$valueTo === void 0 ? 0 : _this2$state2$valueTo,
            _this2$state2$step = _this2$state2.step,
            step = _this2$state2$step === void 0 ? 0 : _this2$state2$step;
        var code = event.code;
        var newValue = 0;

        if (code === 'ArrowUp' || code === 'ArrowRight') {
          newValue = valueTo + step;

          _this2.root.sliderPlugin('setValue', 'valueTo', newValue);
        }

        if (code === 'ArrowDown' || code === 'ArrowLeft') {
          newValue = valueTo - step;

          _this2.root.sliderPlugin('setValue', 'valueTo', newValue);
        }
      });
      this.step.addEventListener('change', function () {
        var value = Number(_this2.step.value);

        _this2.root.sliderPlugin('setValue', 'step', value);
      });
      this.min.addEventListener('change', function () {
        var value = Number(_this2.min.value);

        _this2.root.sliderPlugin('setValue', 'min', value);
      });
      this.max.addEventListener('change', function () {
        var value = Number(_this2.max.value);

        _this2.root.sliderPlugin('setValue', 'max', value);
      });
      this.valueTo.addEventListener('change', function () {
        var value = Number(_this2.valueTo.value);

        _this2.root.sliderPlugin('setValue', 'valueTo', value);
      });
      this.orientation.addEventListener('change', function () {
        var value = _this2.orientation.value;

        _this2.root.sliderPlugin('setValue', 'orientation', value);
      });
      this.fill.addEventListener('change', function () {
        var value = _this2.fill.checked;

        _this2.root.sliderPlugin('setValue', 'fill', value);
      });
      this.range.addEventListener('change', function () {
        var value = _this2.range.checked;

        _this2.root.sliderPlugin('setValue', 'range', value);
      });
      this.labels.addEventListener('change', function () {
        var value = _this2.labels.checked;

        _this2.root.sliderPlugin('setValue', 'labels', value);
      });
      this.tooltips.addEventListener('change', function () {
        var value = _this2.tooltips.checked;

        _this2.root.sliderPlugin('setValue', 'tooltips', value);
      });
    }
  }]);

  return DemoBlock;
}();

/* harmony default export */ var demo_page_DemoBlock = (DemoBlock);
;// CONCATENATED MODULE: ./demo-page/index.ts


var slider = $('#sliderSingleHorizontal');
slider.sliderPlugin({
  valueFrom: 50,
  min: -10,
  max: 300,
  step: 25
});
var sliderSingleHorizontal = new demo_page_DemoBlock(slider);
sliderSingleHorizontal.init();
var vertical = $('#sliderSingleVertical');
vertical.sliderPlugin({
  max: 110,
  orientation: 'vertical',
  color: 'green'
});
var sliderSingleVertical = new demo_page_DemoBlock(vertical);
sliderSingleVertical.init();
/* ++++++++++++++++ RANGE +++++++++++++++++ */

var range = $('#sliderRangeHorizontal');
range.sliderPlugin({
  valueTo: 34,
  orientation: 'horizontal',
  range: true,
  color: 'green'
});
var sliderRangeHorizontal = new demo_page_DemoBlock(range);
sliderRangeHorizontal.init();
var rangeVertical = $('#sliderRangeVertical');
rangeVertical.sliderPlugin({
  range: true,
  valueTo: 62,
  orientation: 'vertical',
  color: 'green'
});
var sliderRangeVertical = new demo_page_DemoBlock(rangeVertical);
sliderRangeVertical.init();
/******/ })()
;