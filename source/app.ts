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

      window[index] = app;
    });
  };
})(jQuery);

$('#sliderSingleHorizontal').sliderPlugin();
$('#sliderSingleVertical').sliderPlugin();
