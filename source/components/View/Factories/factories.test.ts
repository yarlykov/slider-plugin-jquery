/**
 * @jest-environment jsdom
 */

import { SliderFactory, SimpleSlider, RangeSlider } from './factories';

describe('Factories', () => {
  test('SliderFactory should be defined', () => {
    const factory = new SliderFactory();
    expect(factory).toBeInstanceOf(SliderFactory);
  });

  test('SimpleSlider must be created', () => {
    expect(SliderFactory.create('simple')).toBeInstanceOf(SimpleSlider);
    expect(SliderFactory.create('')).toBeInstanceOf(SimpleSlider);
  });

  test('RangeSlider must be created', () => {
    expect(SliderFactory.create('range')).toBeInstanceOf(RangeSlider);
  });

  test('createComponents should be defined', () => {
    const rangeSlider = new RangeSlider();
    const simpleSlider = new SimpleSlider();
    const root = document.createElement('div');

    expect(rangeSlider.createComponents({}, root)).toBeDefined();
    expect(simpleSlider.createComponents({}, root)).toBeDefined();
  });
});
