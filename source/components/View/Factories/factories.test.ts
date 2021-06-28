/**
 * @jest-environment jsdom
 */

import { SliderFactory, SimpleSlider, RangeSlider } from './factories';

describe('Factories', () => {
  let factory: SliderFactory;

  beforeEach(() => {
    factory = new SliderFactory();
  });

  test('SliderFactory should be defined', () => {
    expect(factory).toBeInstanceOf(SliderFactory);
  });

  test('SimpleSlider must be created', () => {
    expect(factory.create('simple')).toBeInstanceOf(SimpleSlider);
    expect(factory.create('')).toBeInstanceOf(SimpleSlider);
  });

  test('RangeSlider must be created', () => {
    expect(factory.create('range')).toBeInstanceOf(RangeSlider);
  });

  test('createComponents should be defined', () => {
    const rangeSlider = new RangeSlider();
    const simpleSlider = new SimpleSlider();
    const root = document.createElement('div');

    expect(rangeSlider.createComponents({}, root)).toBeDefined();
    expect(simpleSlider.createComponents({}, root)).toBeDefined();
  });
});
