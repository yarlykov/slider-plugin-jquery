import './page/demo-page.scss';
import '../app';
import DemoBlock from './DemoBlock';

const slider = $('#sliderSingleHorizontal');
slider.sliderPlugin({
  valueFrom: 50,
  min: -10,
  max: 300,
  step: 25,
});
new DemoBlock(slider);

const vertical = $('#sliderSingleVertical');
vertical.sliderPlugin({
  max: 110,
  orientation: 'vertical',
  color: 'green',
});
new DemoBlock(vertical);
/* ++++++++++++++++ RANGE +++++++++++++++++ */

const range = $('#sliderRangeHorizontal');
range.sliderPlugin({
  valueTo: 34,
  orientation: 'horizontal',
  range: true,
  color: 'green',
});
new DemoBlock(range);

const rangeVertical = $('#sliderRangeVertical');
rangeVertical.sliderPlugin({
  range: true,
  valueTo: 62,
  orientation: 'vertical',
  color: 'green',
});

new DemoBlock(rangeVertical);
