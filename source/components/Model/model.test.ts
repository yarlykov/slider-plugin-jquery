import { IOptions } from '../interfaces';
import Model from './Model';

describe('Model:', () => {
  let model: Model;
  const initialState: IOptions = {
    min: 0,
    max: 1,
    step: 1,
    valueFrom: 0,
    valueTo: 0,
    orientation: 'horizontal',
    range: false,
    fill: false,
    labels: false,
    tooltips: false,
    color: 'orange',
  };

  beforeEach(() => {
    model = new Model();
    model.setState(initialState);
  });

  test('should return a class instance', () => {
    expect(new Model()).toBeInstanceOf(Model);
  });

  test('getState should be defined', () => {
    expect(model.getState()).toBeDefined();
  });

  test('should write state using setState and return from getState', () => {
    expect(model.getState()).toEqual(initialState);
  });

  test('getValue should return value', () => {
    expect(model.getValue('min')).toBe(0);
    expect(model.getValue('orientation')).toBe('horizontal');
    expect(model.getValue('range')).toBe(false);
  });

  test('should write value type "number" using setValue and return from getValue', () => {
    model.setValue('valueFrom', 1);
    expect(model.getValue('valueFrom')).toBe(1);
  });

  test('should write value type "string" using setValue and return from getValue', () => {
    model.setValue('orientation', 'vertical');
    expect(model.getValue('orientation')).toBe('vertical');
  });

  test('should write value type "boolean" using setValue and return from getValue', () => {
    model.setValue('range', true);
    expect(model.getValue('range')).toBe(true);
  });
});
