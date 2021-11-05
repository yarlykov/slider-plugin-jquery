import DemoBlock from './DemoBlock';
import './page/demo-page.scss';

/* ================ SINGLE ================= */

const slider = $('#sliderSingleHorizontal');
slider.sliderPlugin({
  valueFrom: 0,
  min: -100,
  max: 100,
  step: 50,
});
const sliderSingleHorizontal = new DemoBlock(slider);
sliderSingleHorizontal.init();

/* ----------------------------------------- */

const vertical = $('#sliderSingleVertical');
vertical.sliderPlugin({
  max: 77,
  valueFrom: 42,
  step: 3,
  orientation: 'vertical',
});
const sliderSingleVertical = new DemoBlock(vertical);
sliderSingleVertical.init();

/* ================ RANGE ================= */

const range = $('#sliderRangeHorizontal');
range.sliderPlugin({
  valueFrom: 23,
  valueTo: 77,
  orientation: 'horizontal',
  range: true,
  color: 'green',
});
const sliderRangeHorizontal = new DemoBlock(range);
sliderRangeHorizontal.init();

/* ----------------------------------------- */

const rangeVertical = $('#sliderRangeVertical');
rangeVertical.sliderPlugin({
  min: -200000,
  max: 200000,
  range: true,
  valueTo: 120000,
  valueFrom: -120000,
  step: 1,
  orientation: 'vertical',
  color: 'green',
});
const sliderRangeVertical = new DemoBlock(rangeVertical);
sliderRangeVertical.init();

/* ================ ANOTHER ================= */

const defaultSlider = $('#defaultSlider');
defaultSlider.sliderPlugin();
const defaultSliderHorizontal = new DemoBlock(defaultSlider);
defaultSliderHorizontal.init();

/* ----------------------------------------- */

const simpleSlider = $('#simpleSlider');
simpleSlider.sliderPlugin({
  step: 1,
  valueFrom: 70,
  orientation: 'vertical',
  labels: false,
  tooltips: false,
  color: 'green',
});
const simpleSliderHorizontal = new DemoBlock(simpleSlider);
simpleSliderHorizontal.init();
