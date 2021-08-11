/**
 * @jest-environment jsdom
 */

import { IOptions } from '../components/interfaces';
import {
  fromValueToPercent,
  getCoords,
  getPageCoords,
  getPosition,
  getValueWithStep,
} from './utils';

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
    const event = new Event('pointerdown', {
      bubbles: true,
      cancelable: true,
    }) as PointerEvent;
    expect(getPageCoords(event)).toBeDefined();
  });
});

describe('Utils: getPosition', () => {
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
    const sliderCoords = {};
    const pageCoords = {};
    expect(getPosition('horizontal', sliderCoords, pageCoords)).toBeDefined();
  });

  test('should return horizontal position', () => {
    expect(getPosition('horizontal', sliderCoords, pageCoords)).toEqual(25);
  });

  test('should return vertical position', () => {
    expect(getPosition('vertical', sliderCoords, pageCoords)).toEqual(25);
  });
});
