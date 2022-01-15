/**
 * @jest-environment jsdom
 */

import defaultState from 'Root/source/defaultState';
import { Slider, SliderType, TargetType } from './Slider';

let slider: Slider;
let root: HTMLElement;
let components: SliderType;

describe('Slider', () => {
    beforeEach(() => {
      root = document.createElement('div');
      slider = new Slider(defaultState, root, TargetType.simple);
      components = slider.getComponents();
  });

  test('Slider should be defined', () => {
    expect(slider).toBeInstanceOf(Slider);
  });

  test('createComponents should be create simple slider', () => {
    expect(components).toHaveProperty('scale');
    expect(components).toHaveProperty('fill');
    expect(components).toHaveProperty('knob');
    expect(components).toHaveProperty('labels');
    expect(components).toHaveProperty('tooltip');
  });

  test('createComponents should be create range slider', () => {
    const rangeSlider = new Slider(defaultState, root, TargetType.range);
    components = rangeSlider.getComponents();
    expect(components).toHaveProperty('secondKnob');
    expect(components).toHaveProperty('secondTooltip');
  });

  test('slider should embeds the desired components', () => {
    const rangeSlider = new Slider({
        ...defaultState,
        hasFill: true,
        hasTooltips: true,
        hasLabels: true
      },
      root,
      TargetType.simple
    );
    components = rangeSlider.getComponents();
    expect(root.querySelectorAll('.slider__fill').length).toBe(1);
    expect(root.querySelectorAll('.slider__tooltip').length).toBe(1);
    expect(root.querySelectorAll('.slider__labels').length).toBe(1);
  });
});
