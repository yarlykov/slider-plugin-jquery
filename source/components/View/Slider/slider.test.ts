/**
 * @jest-environment jsdom
 */

import defaultState from 'Root/source/defaultState';
import { Slider, TargetType } from './Slider';

let slider: Slider;
let root: HTMLElement;

describe('Slider', () => {
    beforeEach(() => {
      slider = new Slider();
      root = document.createElement('div');
  });

  test('Slider should be defined', () => {
    expect(slider).toBeInstanceOf(Slider);
  });

  test('createComponents should be defined', () => {
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toBeDefined();
    expect(slider.createComponents(defaultState, root, TargetType.range)).toBeDefined();
  });

  test('createComponents should be create simple slider', () => {
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toHaveProperty('scale');
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toHaveProperty('fill');
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toHaveProperty('knob');
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toHaveProperty('labels');
    expect(slider.createComponents(defaultState, root, TargetType.simple)).toHaveProperty('tooltip');
  });

  test('createComponents should be create range slider', () => {
    expect(slider.createComponents(defaultState, root, TargetType.range)).toHaveProperty('secondKnob');
    expect(slider.createComponents(defaultState, root, TargetType.range)).toHaveProperty('secondTooltip');
  });
});
