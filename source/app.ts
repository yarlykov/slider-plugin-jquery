import Presenter from './components/Presenter/Presenter';
import { IOptions } from './components/interfaces';

type optionsValue = number & string & boolean;

const methods = {
  init(this: JQuery, options: IOptions = {}) {
    const index: string = this[0].id; /* для разработки - удалить */

    return this.each(function () {
      $(this).data().sliderPlugin = new Presenter(this);

      if (options) {
        const app = $(this).data('sliderPlugin');

        app.model.setState(options);
        window[index] = app; /* для разработки - удалить */
      }
    });
  },

  getState(this: JQuery): Object {
    const sliderPlugin = $(this).data('sliderPlugin');

    const state = sliderPlugin.model.getState();
    return state;
  },

  setValue(this: JQuery, name: string, value: optionsValue) {
    const sliderPlugin = $(this).data('sliderPlugin');

    sliderPlugin.model.setValue(`${name}`, value);
  },

  onChange(this: JQuery, func: Function) {
    $(this).on('onChange', (args) => func(args));
  },
};

declare global {
  interface JQuery {
    sliderPlugin: (
      options?: keyof typeof methods | IOptions,
      name?: string,
      value?: optionsValue,
    ) => IOptions;
  }
}

$.fn.sliderPlugin = function (method) {
  if (methods[method as string]) {
    return methods[method as string].apply(
      this,
      Array.prototype.slice.call(arguments, 1),
    );
  }
  if (typeof method === 'object' || !method) {
    return methods.init.apply(this, arguments as optionsValue);
  }
  $.error(`Метод с именем ${method} не существует`);
};
