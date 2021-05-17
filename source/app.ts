import $ from 'jquery';
import './demo-page/styles/main.scss';;
import Presenter from './components/Presenter/Presenter';
import { IOptions } from './components/interfaces';

declare global {
  interface JQuery {
    sliderPlugin: (options?: IOptions) => void;
  }
}

$.fn.sliderPlugin = function (options) {
  const index: string = this[0].id; /*для разработки - удалить*/

  return this.each(function () {
    const app = new Presenter(this);
    if (options) {
      app.model.setState(options);
    }

    window[index] = app; /*для разработки - удалить*/
  });
};

$('#sliderSingleHorizontal').sliderPlugin({
  currentValue: 36,
  orientation: 'horizontal',
  fill: true,
  labels: true,
  tooltips: true,
  color: 'orange',
});

$('#sliderSingleVertical').sliderPlugin({
  step: 25,
  currentValue: 57,
  orientation: 'vertical',
  fill: true,
  labels: true,
  tooltips: true,
  color: 'orange',
});

/* ++++++++++++++++ RANGE +++++++++++++++++ */

$('#sliderRangeHorizontal').sliderPlugin({
  rangeMin: 35,
  rangeMax: 72,
  orientation: 'horizontal',
  range: true,
  fill: true,
  labels: true,
  tooltips: true,
  color: 'green',
});

$('#sliderRangeVertical').sliderPlugin({
  range: true,
  rangeMin: 13,
  rangeMax: 62,
  orientation: 'vertical',
  fill: true,
  tooltips: true,
  labels: true,
  color: 'green',
});
