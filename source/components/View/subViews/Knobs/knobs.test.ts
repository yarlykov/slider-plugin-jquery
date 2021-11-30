/**
 * @jest-environment jsdom
 */

import { KnobEvents } from '../../../../Observer/events';
import { IOptions } from '../../../interfaces';
import Scale from '../Scale/Scale';
import Knob from './Knob';
import SecondKnob from './SecondKnob';

const initialState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
};
const root = document.createElement('div');
let knobNode: HTMLElement;
let scale: Scale;

describe('Knob:', () => {
  let knob: Knob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    scale = new Scale(initialState, root);
    scale.init();
    knob = new Knob({}, root);
    knob.init();
    knobNode = root.querySelector('.js-slider__knob') as HTMLElement;
  });

  test('should return Knob instance', () => {
    expect(knob).toBeInstanceOf(Knob);
  });

  test('should return error if Scale is not found', () => {
    root.innerHTML = '';
    expect(() => knob.init()).toThrow('Scale element is not found');
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('.js-slider__knob').length).toBe(1);
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
    expect(spy).toBeCalledWith(KnobEvents.VALUE_CHANGED, 1);
  });

  test('event "keydown" ArrowLeft should emit changeValue -1', () => {
    const spy = jest.spyOn(knob, 'emit');
    const arrowLeft = new KeyboardEvent('keydown', {
      code: 'ArrowLeft',
    });
    knobNode.dispatchEvent(arrowLeft);
    expect(spy).toBeCalledWith(KnobEvents.VALUE_CHANGED, -1);
  });
});

describe('SecondKnob:', () => {
  let secondKnob: SecondKnob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    const state = { ...initialState, range: true }
    scale = new Scale(state, root);
    scale.init();
    secondKnob = new SecondKnob({}, root);
    secondKnob.init();
    knobNode = root.querySelector('.js-slider__second-knob') as HTMLElement;
  });

  test('should return SecondKnob instance', () => {
    expect(secondKnob).toBeInstanceOf(SecondKnob);
  });

  test('should return error if Scale is not found', () => {
    root.innerHTML = '';
    expect(() => secondKnob.init()).toThrow('Scale element is not found');
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
    expect(spy).toBeCalledWith(KnobEvents.VALUE_CHANGED, 1);
  });

  test('event "keydown" ArrowLeft should emit changeValue -1', () => {
    const spy = jest.spyOn(secondKnob, 'emit');
    const arrowLeft = new KeyboardEvent('keydown', {
      code: 'ArrowLeft',
    });
    knobNode.dispatchEvent(arrowLeft);
    expect(spy).toBeCalledWith(KnobEvents.VALUE_CHANGED, -1);
  });
});
