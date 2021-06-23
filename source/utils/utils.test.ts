/**
 * @jest-environment jsdom
 */

import { IOptions } from '../components/interfaces';
import {
  createElement,
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from './utils';

describe('Utils: createElement', () => {
  test('should be defined', () => {
    expect(createElement('div')).toBeDefined();
  });

  test('should be create <div></div> element', () => {
    const tag = createElement('div');
    expect(tag).toBeInstanceOf(HTMLDivElement);
  });

  test('should be create <div></div> element with class "slider"', () => {
    const tag = createElement('div', ['slider']);
    expect(tag.outerHTML).toEqual('<div class="slider"></div>');
  });

  test('should be create <div></div> element with some classes', () => {
    const tag = createElement('div', ['slider', 'slider__wrapper']);
    expect(tag.outerHTML).toEqual('<div class="slider slider__wrapper"></div>');
  });
});

describe('Utils: fromValueToPercent', () => {
  const state: IOptions = {
    min: 0,
    max: 100,
    step: 25,
  };

  test('should be defined', () => {
    expect(fromValueToPercent({}, 25)).toBeDefined();
  });

  test('should be return correct value in percent', () => {
    expect(fromValueToPercent(state, 25)).toBe(25);
  });

  test('should be return correct value in percent if value more than 100 percents', () => {
    expect(fromValueToPercent(state, 150)).toBe(100);
  });

  test('should be return correct value in percent if value less than 100 percents', () => {
    expect(fromValueToPercent(state, -100)).toBe(0);
  });
});

describe('Utils: getValueWithStep', () => {
  test('should be defined', () => {
    expect(getValueWithStep()).toBeDefined();
  });

  test('should be return correct value with step', () => {
    expect(getValueWithStep(0, 100, 1, 25)).toBe(25);
  });
});

describe('Utils: getCoords', () => {
  test('should be defined', () => {
    const elem = document.createElement('div');
    expect(getCoords(elem)).toBeDefined();
  });

  test('should be return element coords', () => {
    const elem = document.createElement('div');
    expect(getCoords(elem)).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      width: 0,
    });
  });
});

describe('Utils: getPageCoords', () => {
  test('should be defined', () => {
    const event: MouseEvent = {
      pageX: 0,
      pageY: 0,
    };
    expect(getPageCoords(event)).toBeDefined();
  });
});

describe('Utils: getPosition', () => {
  const orientation = 'horizontal';
  const sliderCoords = {
    bottom: 355,
    height: 296,
    left: 325,
    width: 296,
  };
  const pageCoords = {
    pageX: 399,
    pageY: 281,
  };

  test('should be defined', () => {
    const orientation = '';
    const sliderCoords = {};
    const pageCoords = {};
    expect(getPosition(orientation, sliderCoords, pageCoords)).toBeDefined();
  });

  test('should return horizontal position', () => {
    expect(getPosition('horizontal', sliderCoords, pageCoords)).toEqual(25);
  });

  test('should return vertical position', () => {
    expect(getPosition('vertical', sliderCoords, pageCoords)).toEqual(25);
  });
});
