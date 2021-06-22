import { IOptions } from '../interfaces';
import Validation from './Validation';

describe('Validation:', () => {
  let validation: Validation;
  const state: IOptions = {
    min: 0,
    max: 100,
    step: 25,
    valueFrom: 25,
    valueTo: 70,
  };

  beforeEach(() => {
    validation = new Validation();
    validation.checkState(state);
  });

  test('should return a class instance', () => {
    expect(new Validation()).toBeInstanceOf(Validation);
  });

  test('checkState should return a correct state', () => {
    const incorrectState = {
      min: 100,
      max: 0,
      step: 25,
      valueFrom: 20,
      valueTo: 70,
    };
    const incorrectStateTwo = {
      min: 100,
      max: 0,
      step: 0,
      valueFrom: 20,
      valueTo: 70,
    };
    expect(validation.checkState(incorrectState)).toEqual(state);
    expect(validation.checkState(incorrectStateTwo)).toEqual({
      min: 0,
      max: 100,
      step: 1,
      valueFrom: 20,
      valueTo: 70,
    });
    expect(
      validation.checkState({
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 115,
      }),
    ).toEqual({
      min: 0,
      max: 120,
      step: 25,
      valueFrom: 120,
      valueTo: 0,
    });
    expect(
      validation.checkState({
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 125,
      }),
    ).toEqual({
      min: 0,
      max: 120,
      step: 25,
      valueFrom: 120,
      valueTo: 0,
    });
  });

  test('checkValue should return a correct value', () => {
    expect(validation.checkValue(-10)).toBe(0);
    expect(validation.checkValue(20)).toBe(25);
    expect(validation.checkValue(150)).toBe(100);
  });

  test('checkMinRange should return a correct value', () => {
    expect(validation.checkMinRange(-10)).toBe(0);
    expect(validation.checkMinRange(70)).toBe(75);
    expect(validation.checkMinRange(150)).toBe(75);
  });

  test('checkMaxRange should return a correct value', () => {
    expect(validation.checkMaxRange(150)).toBe(100);
    expect(validation.checkMaxRange(10)).toBe(25);
    expect(validation.checkMaxRange(-10)).toBe(25);
  });

  test('checkRangeMinMax should return a correct value', () => {
    expect(
      validation.checkState({
        min: 0,
        max: 100,
        step: 0,
        valueFrom: 42,
        valueTo: 150,
        range: true,
      }),
    ).toEqual({
      min: 0,
      max: 100,
      step: 1,
      valueFrom: 42,
      valueTo: 100,
      range: true,
    });
  });

  test('checkStep should return a correct value', () => {
    expect(
      validation.checkState({
        min: 0,
        max: 100,
        step: 120,
        valueFrom: 1,
      }),
    ).toEqual({
      min: 0,
      max: 100,
      step: 100,
      valueFrom: 0,
      valueTo: 0,
    });
    expect(
      validation.checkState({
        min: 0,
        max: 100,
        step: -10,
        valueFrom: 1,
      }),
    ).toEqual({
      min: 0,
      max: 100,
      step: 1,
      valueFrom: 1,
      valueTo: 0,
    });
  });
});
