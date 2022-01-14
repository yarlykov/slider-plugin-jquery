/**
 * @jest-environment jsdom
 */

import defaultState from 'Root/source/defaultState';
import { Slider, TargetType } from './Slider';

let slider: Slider;
let root: HTMLElement;

describe('Slider', () => {
    beforeEach(() => {
      root = document.createElement('div');
      slider = new Slider(defaultState, root, TargetType.simple);
  });

  test('Slider should be defined', () => {
    expect(slider).toBeInstanceOf(Slider);
  });

  test('createComponents should be create simple slider', () => {
    const components = slider.getComponents();
    expect(components).toHaveProperty('scale');
    expect(components).toHaveProperty('fill');
    expect(components).toHaveProperty('knob');
    expect(components).toHaveProperty('labels');
    expect(components).toHaveProperty('tooltip');
  });

  test('createComponents should be create range slider', () => {
    const rangeSlider = new Slider(defaultState, root, TargetType.range);
    const components = rangeSlider.getComponents();
    expect(components).toHaveProperty('secondKnob');
    expect(components).toHaveProperty('secondTooltip');
  });
});
