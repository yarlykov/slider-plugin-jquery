import Model from './Model';
import { IOptions } from '../View/View';

describe('Model:', () => {
  let model: any;
  const initialState: IOptions = {
    min: 0,
    max: 0,
    step: 0,
    current: 0,
    rangeMin: 0,
    rangeMax: 0,
    orientation: 'horizontal',
    range: false,
    fill: false,
    units: '',
    color: '',
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
    expect(model.getValue('units')).toBe('');
  });

  test('should write value type "number" using setValue and return from getValue', () => {
    model.setValue('current', 42);
    expect(model.getValue('current')).toBe(42);
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
