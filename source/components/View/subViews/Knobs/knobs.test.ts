/**
 * @jest-environment jsdom
 */

import Knob from './Knob';
import SecondKnob from './SecondKnob';
import { IOptions } from '../../../interfaces';

const initialState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
};
const root = document.createElement('div');
let knobNode: HTMLElement;

describe('Knob:', () => {
  let knob: Knob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    knob = new Knob({}, root);
    knob.display();
    knobNode = root.querySelector('[data-id="knob"]') as HTMLElement;
  });

  test('should return Knob instance', () => {
    expect(knob).toBeInstanceOf(Knob);
  });

  test('should return error if Scale is not found', () => {
    root.innerHTML = '';
    expect(() => knob.display()).toThrow('Scale element is not found');
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('[data-id="knob"]').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_orange').length).toBe(1);
  });

  test('should update valueFrom', () => {
    const newState = Object.assign({}, initialState, { valueFrom: 20 });
    knob.update(newState);

    expect(knobNode.style.bottom).toBe('20%');
  });

  test('if not knob should not update left or bottom value', () => {
    root.innerHTML = '';
    knob.update({});
    expect(knobNode.style.left).toBe('');
    expect(knobNode.style.bottom).toBe('0%');
  });

  test('event "keydown" ArrowRight should emit changeValue 1', () => {
    const spy = jest.spyOn(knob, 'emit');
    const arrowRight = new KeyboardEvent('keydown', {
      code: 'ArrowRight',
    });

    knobNode.dispatchEvent(arrowRight);
    expect(spy).toBeCalledWith('changeValue', 1);
  });

  test('event "keydown" ArrowLeft should emit changeValue -1', () => {
    const spy = jest.spyOn(knob, 'emit');
    const arrowLeft = new KeyboardEvent('keydown', {
      code: 'ArrowLeft',
    });
    knobNode.dispatchEvent(arrowLeft);
    expect(spy).toBeCalledWith('changeValue', -1);
  });
});

describe('SecondKnob:', () => {
  let secondKnob: SecondKnob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    secondKnob = new SecondKnob({}, root);
    secondKnob.display();
    knobNode = root.querySelector('[data-knob="second"]') as HTMLElement;
  });

  test('should return SecondKnob instance', () => {
    expect(secondKnob).toBeInstanceOf(SecondKnob);
  });

  test('should return error if Scale is not found', () => {
    root.innerHTML = '';
    expect(() => secondKnob.display()).toThrow('Scale element is not found');
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('[data-knob="second"]').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_orange').length).toBe(1);
  });

  test('should update valueFrom', () => {
    const newState = Object.assign({}, initialState, { valueTo: 50 });
    secondKnob.update(newState);

    expect(knobNode.style.left).toBe('50%');
  });

  test('if not knob should not update left or bottom value', () => {
    root.innerHTML = '';
    secondKnob.update({});
    expect(knobNode.style.left).toBe('0%');
    expect(knobNode.style.bottom).toBe('');
  });

  test('event "keydown" ArrowRight should emit changeValue 1', () => {
    const spy = jest.spyOn(secondKnob, 'emit');
    const arrowRight = new KeyboardEvent('keydown', {
      code: 'ArrowRight',
    });

    knobNode.dispatchEvent(arrowRight);
    expect(spy).toBeCalledWith('changeValue', 1);
  });

  test('event "keydown" ArrowLeft should emit changeValue -1', () => {
    const spy = jest.spyOn(secondKnob, 'emit');
    const arrowLeft = new KeyboardEvent('keydown', {
      code: 'ArrowLeft',
    });
    knobNode.dispatchEvent(arrowLeft);
    expect(spy).toBeCalledWith('changeValue', -1);
  });
});
