import defaultState from 'Root/source/defaultState';
import Model from './Model';

describe('Model:', () => {
  let model: Model;

  beforeEach(() => {
    model = new Model(defaultState);
  });

  test('should return a class instance', () => {
    expect(model).toBeInstanceOf(Model);
  });

  test('getState should be defined', () => {
    expect(model.getState()).toBeDefined();
  });

  test('should write state using setState and return from getState', () => {
    expect(model.getState()).toEqual(defaultState);
  });

  test('getValue should return value', () => {
    expect(model.getValue('min')).toBe(0);
    expect(model.getValue('orientation')).toBe('horizontal');
    expect(model.getValue('isRange')).toBe(false);
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
    model.setValue('isRange', true);
    expect(model.getValue('isRange')).toBe(true);
  });

  test('should return correct "valueFrom" and "valueTo"', () => {
    model.setValue('isRange', true);
    model.setValue('max', 0);
    model.setValue('max', 100);
    model.setValue('step', 25);
    model.setValue('valueTo', 20);
    model.setValue('valueFrom', 80);

    expect(model.getValue('valueTo')).toBe(25);
    expect(model.getValue('valueFrom')).toBe(25);
  });

  test('processPercentValue should return correct value', () => {
    model.processPercentValue('valueFrom', 20);
    expect(model.getState().valueFrom).toBe(20);
  });

  test('processNearValue should return correct valueName: valueFrom', () => {
    expect(model.processNearValue(20)).toBe('valueFrom');
  });

  test('processNearValue should return correct valueName: valueTo', () => {
    model.setState({ ...defaultState, isRange: true });
    expect(model.processNearValue(80)).toBe('valueTo');
  });

  test('increment should increase the value by the step value', () => {
    model.increment('valueFrom');
    expect(model.getState().valueFrom).toBe(51);    
  });

  test('decrement should decrease the value by the step value', () => {
    model.decrement('valueFrom');
    expect(model.getState().valueFrom).toBe(49);    
  });
});
