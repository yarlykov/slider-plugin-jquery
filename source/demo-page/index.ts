import './page/demo-page.scss';
import DemoBlock from './DemoBlock';

const slider = $('#sliderSingleHorizontal');
slider.sliderPlugin({
  valueFrom: 50,
  min: -10,
  max: 300,
  step: 25,
});
const sliderSingleHorizontal = new DemoBlock(slider);
sliderSingleHorizontal.init();

const vertical = $('#sliderSingleVertical');
vertical.sliderPlugin({
  max: 110,
  orientation: 'vertical',
  color: 'green',
});
const sliderSingleVertical = new DemoBlock(vertical);
sliderSingleVertical.init();
/* ++++++++++++++++ RANGE +++++++++++++++++ */

const range = $('#sliderRangeHorizontal');
range.sliderPlugin({
  valueTo: 34,
  orientation: 'horizontal',
  range: true,
  color: 'green',
});
const sliderRangeHorizontal = new DemoBlock(range);
sliderRangeHorizontal.init();

const rangeVertical = $('#sliderRangeVertical');
rangeVertical.sliderPlugin({
  range: true,
  valueTo: 62,
  orientation: 'vertical',
  color: 'green',
});

const sliderRangeVertical = new DemoBlock(rangeVertical);
sliderRangeVertical.init();
