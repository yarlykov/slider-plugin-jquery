/**
 * @jest-environment jsdom
 */

import defaultState from 'Source/defaultState';
import { changeFirstLetterToLower, fromValueToPercent, getValueWithStep } from './utils';

describe('Utils: fromValueToPercent', () => {
  const state = {
    min: 0,
    max: 100,
    step: 25,
  };

  test('should be defined', () => {
    expect(fromValueToPercent(defaultState, 25)).toBeDefined();
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

describe('Utils: changeFirstLetterToLower', () => {
  test('should be defined', () => {
    expect(changeFirstLetterToLower('test')).toBeDefined();
  });

  test('should be return string with lower first letter', () => {
    expect(changeFirstLetterToLower('SecondKnob')).toBe('secondKnob');
  });
});
