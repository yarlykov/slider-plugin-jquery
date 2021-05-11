import $ from 'jquery';
import './demo-page/styles/main.scss';
import View from './components/View/View';
import Model from './components/Model/Model';
import Presenter from './components/Presenter/Presenter';
import { IOptions } from './components/interfaces';

declare global {
  interface JQuery {
    sliderPlugin: (options?: IOptions) => void;
  }
}

(function ($) {
  $.fn.sliderPlugin = function (options) {
    const index: string = this[0].id; /*для разработки - удалить*/

    return this.each(function () {
      const app = new Presenter(new Model(), new View(this));
      if (options) {
        app.view.init(options);
      }

      window[index] = app; /*для разработки - удалить*/
    });
  };
})(jQuery);

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
