/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/ban-types */
import Presenter from 'Components/Presenter/Presenter';
import { IOptions, OptionValue } from 'Components/interfaces';
import defaultState from './defaultState';

const methods = {
  init(this: JQuery, options: unknown) {
    return this.each(function (this: HTMLElement): void {
      if (typeof options === 'object') {
        const sliderOptions = { ...defaultState, ...options }
        $(this).data().sliderPlugin = new Presenter(this, sliderOptions);
      }
    });
  },

  getState(this: JQuery): IOptions {
    const sliderPlugin = $(this).data('sliderPlugin');
    const state = sliderPlugin.model.getState();
    return state;
  },

  setValue(this: JQuery, name: string, value: OptionValue): void {
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
      options?: keyof typeof methods | unknown,
      args?: string | Function,
      value?: OptionValue,
    ) => IOptions;
  }
}

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
