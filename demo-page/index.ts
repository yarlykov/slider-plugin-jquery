/* eslint-disable no-new */
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
new DemoBlock(slider);

/* ----------------------------------------- */

const vertical = $('#sliderSingleVertical');
vertical.sliderPlugin({
  max: 77,
  valueFrom: 42,
  step: 3,
  orientation: 'vertical',
});
new DemoBlock(vertical);

/* ================ RANGE ================= */

const range = $('#sliderRangeHorizontal');
range.sliderPlugin({
  valueFrom: 23,
  valueTo: 77,
  orientation: 'horizontal',
  range: true,
  color: 'green',
});
new DemoBlock(range);

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
new DemoBlock(rangeVertical);

/* ================ ANOTHER ================= */

const defaultSlider = $('#defaultSlider');
defaultSlider.sliderPlugin();
new DemoBlock(defaultSlider);

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
new DemoBlock(simpleSlider);
