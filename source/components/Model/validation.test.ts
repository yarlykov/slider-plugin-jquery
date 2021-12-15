import defaultState from 'Root/source/defaultState';
import Validation from './Validation';

describe('Validation:', () => {
  let validation: Validation;

  beforeEach(() => {
    validation = new Validation();
    validation.checkState({
      ...defaultState,
      min: 0,
      max: 100,
      step: 25,
      valueFrom: 25,
      valueTo: 70,
    });
  });

  test('should return a class instance', () => {
    expect(new Validation()).toBeInstanceOf(Validation);
  });

  test('checkState should return a correct state', () => {
    const invalidState = {
      one: {
        ...defaultState,
        min: 100,
        max: 0,
        step: 25,
        valueFrom: 20,
        valueTo: 70,
      },
      two: {
        ...defaultState,
        min: 200,
        max: 100,
        step: 0,
        valueFrom: 20,
        valueTo: 70,
      },
      three: {
        ...defaultState,
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 115,
      },
      four: {
        ...defaultState,
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 125,
      },
      five: {
        ...defaultState,
        min: 1,
        max: 1,
        step: 0,
        valueFrom: 1,
      },
    };

    const correctState = {
      one: {
        ...defaultState,
        min: 100,
        max: 101,
        step: 1,
        valueFrom: 100,
        valueTo: 70,
      },
      two: {
        ...defaultState,
        min: 100,
        max: 200,
        step: 1,
        valueFrom: 100,
        valueTo: 70,
      },
      three: {
        ...defaultState,
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 120,
      },
      four: {
        ...defaultState,
        min: 0,
        max: 120,
        step: 25,
        valueFrom: 120,
      },
      five: {
        ...defaultState,
        min: 1,
        max: 2,
        step: 1,
        valueFrom: 1,
      },
    };
    expect(validation.checkState(invalidState.one)).toEqual(correctState.one);
    expect(validation.checkState(invalidState.two)).toEqual(correctState.two);
    expect(validation.checkState(invalidState.three)).toEqual(
      correctState.three,
    );
    expect(validation.checkState(invalidState.four)).toEqual(correctState.four);
    expect(validation.checkState(invalidState.five)).toEqual(correctState.five);
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
    const state = { 
      ...defaultState,         
      min: 0,
      max: 100,
      step: 0,
      valueFrom: 42,
      valueTo: 150,
      isRange: true
    }
    expect(
      validation.checkState(state),
    ).toEqual({
      ...defaultState,
      min: 0,
      max: 100,
      step: 1,
      valueFrom: 42,
      valueTo: 100,
      isRange: true,
    });
  });

  test('checkStep should return a correct value', () => {
    expect(validation.checkStep(101, 100, 0)).toEqual(1);
    expect(validation.checkStep(100, 0, 100)).toEqual(1);
    expect(validation.checkStep(100, 101, 50)).toEqual(1);
    expect(validation.checkStep(0, 100, 150)).toEqual(100);
  });
});
