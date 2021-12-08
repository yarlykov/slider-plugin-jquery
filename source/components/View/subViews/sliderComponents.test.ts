/**
 * @jest-environment jsdom
 */

import defaultState from 'Source/defaultState';
import { defaultPageCoords, defaultScaleCoords } from './Scale/defaultCoords';
import SliderComponent from './SliderComponent';

describe('SliderComponent:', () => {
  let sliderComponent: SliderComponent;
  let elem: HTMLDivElement;
  const scaleCoords = {
    bottom: 355,
    height: 296,
    left: 325,
    width: 296,
  };
  const pageCoords = {
    pageX: 399,
    pageY: 281,
  };

  beforeEach(() => {
    elem = document.createElement('div');
    sliderComponent = new SliderComponent(defaultState, elem);
  });

  test('getCoords method should be defined', () => {
    expect(sliderComponent.getCoords(elem)).toBeDefined();
  });

  test('getCoords method should be return element coords', () => {
    expect(sliderComponent.getCoords(elem)).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      width: 0,
    });
  });

  test('getPageCoords method should be defined', () => {
    const event = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    }) as PointerEvent;
    expect(sliderComponent.getPageCoords(event)).toBeDefined();
  });

  test('getPosition method should be defined', () => {
    const scaleCoords = defaultScaleCoords;
    const pageCoords = defaultPageCoords;
    expect(
      sliderComponent.getPosition('horizontal', scaleCoords, pageCoords),
    ).toBeDefined();
  });

  test('getPosition method should return horizontal position', () => {
    expect(
      sliderComponent.getPosition('horizontal', scaleCoords, pageCoords),
    ).toEqual(25);
  });

  test('getPosition method should return vertical position', () => {
    expect(
      sliderComponent.getPosition('vertical', scaleCoords, pageCoords),
    ).toEqual(25);
  });
});
