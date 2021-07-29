import Presenter from './components/Presenter/Presenter';
import { IOptions } from './components/interfaces';

type optionsValue = number & string & boolean;

const methods = {
  init(this: JQuery, options: IOptions = {}) {
    // eslint-disable-next-line func-names
    return this.each(function (this: HTMLElement): void {
      $(this).data().sliderPlugin = new Presenter(this);

      if (options) {
        const app = $(this).data('sliderPlugin');
        app.model.setState(options);
      }
    });
  },

  getState(this: JQuery): IOptions {
    const sliderPlugin = $(this).data('sliderPlugin');
    const state = sliderPlugin.model.getState();
    return state;
  },

  setValue(this: JQuery, name: string, value: optionsValue): void {
    const sliderPlugin = $(this).data('sliderPlugin');
    sliderPlugin.model.setValue(`${name}`, value);
  },

  onChange(this: JQuery, func: EventListener) {
    // eslint-disable-next-line fsd/no-function-declaration-in-event-listener
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

// eslint-disable-next-line func-names
$.fn.sliderPlugin = function (method, ...args) {
  if (methods[method as string]) {
    return methods[method as string].apply(this, args);
  }
  if (typeof method === 'object' || !method) {
    const options = method || {};
    return methods.init.call(this, options);
  }
  $.error(`Метод с именем ${method} не существует`);
};
