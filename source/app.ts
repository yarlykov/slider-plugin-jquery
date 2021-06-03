import Presenter from './components/Presenter/Presenter';
import { IOptions } from './components/interfaces';

type optionsValue = number & string & boolean;

declare global {
  interface JQuery {
    sliderPlugin: (
      options?: keyof typeof methods | IOptions,
      name?: string,
      value?: optionsValue,
    ) => IOptions;
  }
}

const methods = {
  init: function (this: JQuery, options: IOptions = {}) {
    const index: string = this[0].id; /*для разработки - удалить*/

    return this.each(function () {
      $(this).data().sliderPlugin = new Presenter(this);

      if (options) {
        const app = $(this).data('sliderPlugin');

        app.model.setState(options);
        window[index] = app; /*для разработки - удалить*/
      }
    });
  },

  getState: function(this: JQuery): Object {
    const sliderPlugin = $(this).data('sliderPlugin');

    const state = sliderPlugin.model.getState();
    return state;
  },

  setValue: function (this: JQuery, name: string, value: optionsValue) {
    const sliderPlugin = $(this).data('sliderPlugin');

    sliderPlugin.model.setValue(`${name}`, value);
  },

  onChange(this: JQuery, func: Function) {
    $(this).on('onChange', (args) => func(args));
  },
};

$.fn.sliderPlugin = function (method) {
  if (methods[method as string]) {
    return methods[method as string].apply(
      this,
      Array.prototype.slice.call(arguments, 1),
    );
  } else if (typeof method === 'object' || !method) {
    return methods.init.apply(this, arguments as optionsValue);
  } else {
    $.error(`Метод с именем ${method} не существует`);
  }
};
