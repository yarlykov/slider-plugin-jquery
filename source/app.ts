/* eslint-disable fsd/no-function-declaration-in-event-listener */
/* eslint-disable func-names */

import Presenter from 'Components/Presenter/Presenter';
import {
  IOptions,
  OptionsNumberValues,
  OptionsBooleanValues,
  Color,
  Orientation,
  OptionValue,
} from 'Components/interfaces';
import defaultState from './defaultState';

const methods = {
  init(this: JQuery, options: Partial<IOptions>) {
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

  onChange(this: JQuery, func: (event: CustomEventInit) => void) {
    $(this).on('onChange', (event) => func(event));
  },
};

declare global {
  interface JQuery {
    sliderPlugin(): void;
    sliderPlugin(options: Partial<IOptions>): void;
    sliderPlugin(method: 'getState'): IOptions;
    sliderPlugin(method: 'setValue', key: OptionsNumberValues, value: number): void;
    sliderPlugin(method: 'setValue', key: OptionsBooleanValues, value: boolean): void;
    sliderPlugin(method: 'setValue', key: 'orientation', value: Orientation): void;
    sliderPlugin(method: 'setValue', key: 'color', value: Color): void;
    sliderPlugin(method: 'onChange', func: (event: CustomEvent) => void): void;
  }
}
 
$.fn.sliderPlugin = function<T>(...args: T[]) {
  const method = args[0];
  const params = args.slice(1);
  
  const isMethod = typeof method === 'string';
  const isOptionsOrNoOptions = typeof method === 'object' || !method;

  if (isMethod) {
    return methods[method as string].apply(this, params);
  }

  if (isOptionsOrNoOptions) {
    const options = method || {};    
    return methods.init.call(this, options);
  }

  $.error(`Метод с именем ${method} не существует`);
};
