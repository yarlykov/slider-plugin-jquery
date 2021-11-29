/**
 * @jest-environment jsdom
 */

import View from './View';

describe('View:', () => {
  let view: View;
  let root: HTMLElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'sliderPlugin';
    view = new View(root, {
      min: 0,
      max: 100,
      step: 25,
      valueFrom: 42,
      valueTo: 42,
      orientation: 'horizontal',
      range: false,
      fill: true,
      labels: true,
      tooltips: true,
      color: 'orange',
    });
  });

  afterEach(() => {
    root.innerHTML = '';
  });

  test('should return class instance', () => {
    expect(view).toBeInstanceOf(View);
  });

  test('init should return an error if no options are passed', () => {
    expect(view.init).toThrowError('options were not passed');
  });

  test('should render the range slider', () => {
    view.init({ range: true });
    const rangeSliders = root.querySelectorAll('.js-slider__second-knob');
    expect(rangeSliders.length).toBe(1);
  });

  test('should render the single slider', () => {
    view.init({ range: false });
    const rangeSliders = root.querySelectorAll('.js-slider__second-knob');
    expect(rangeSliders.length).toBe(0);
  });

  test('should render the vertical slider', () => {
    view.init({ orientation: 'vertical' });
    const verticalSliders = root.querySelectorAll('.slider__scale_vertical');
    expect(verticalSliders.length).toBe(1);
  });

  test('should update slider', () => {
    view.update({ valueFrom: 20});
    const sliderValueFrom = view.components.knob?.state.valueFrom;
    
    expect(sliderValueFrom).toBe(20);
  });
});
