/**
 * @jest-environment jsdom
 */

import defaultState from 'Root/source/defaultState';
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
      isRange: false,
      hasFill: true,
      hasLabels: true,
      hasTooltips: true,
      color: 'orange',
    });
  });

  afterEach(() => {
    root.innerHTML = '';
  });

  test('should return class instance', () => {
    expect(view).toBeInstanceOf(View);
  });

  test('should render the range slider', () => {
    view.init({ ...defaultState, isRange: true });
    const rangeSliders = root.querySelectorAll('.js-slider__second-knob');
    expect(rangeSliders.length).toBe(1);
  });

  test('should render the single slider', () => {
    view.init({ ...defaultState, isRange: false });
    const rangeSliders = root.querySelectorAll('.js-slider__second-knob');
    expect(rangeSliders.length).toBe(0);
  });

  test('should render the vertical slider', () => {
    view.init({ ...defaultState, orientation: 'vertical' });
    const verticalSliders = root.querySelectorAll('.slider__scale_vertical');
    expect(verticalSliders.length).toBe(1);
  });

  test('should update slider', () => {
    view.update({ ...defaultState, valueFrom: 20});
    const sliderValueFrom = view.components.knob?.state.valueFrom;
    
    expect(sliderValueFrom).toBe(20);
  });
});
