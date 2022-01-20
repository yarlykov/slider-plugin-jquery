/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { IOptions } from 'Components/interfaces';
import { Slider, SliderType, TargetType } from 'Components/View/Slider/Slider';
import defaultState from 'Root/source/defaultState';
import { KnobEvents } from 'Root/source/Observer/events';
import Knob from './Knob';

const initialState: IOptions = {
  ...defaultState,
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
};
const root = document.createElement('div');
let knobNode: HTMLElement;
let slider: Slider;
let components: SliderType;
let event: KeyboardEvent;

describe('Knob:', () => {
  let knob: Knob;

  beforeEach(() => {
    slider = new Slider(defaultState, root, TargetType.simple);
    components = slider.getComponents();
    knob = components.knob;
    knobNode = components.knob.getKnobNode();
    event = new Event('keydown') as KeyboardEvent;
  });

  test('should return Knob instance', () => {
    expect(knob).toBeInstanceOf(Knob);
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('[data-id="knob"]').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_orange').length).toBe(1);
  });

  test(
    'when the right arrow is pressed, an event should emit KnobEvents.KNOB_INCREMENT with valueFrom',
  () => {
    // @ts-ignore: Unreachable code error
    event.code = 'ArrowRight'
    const spyEmit = jest.spyOn(knob, 'emit')
    knob.setKnobTarget(KnobEvents.KNOB_VALUE_FROM_CHANGED);
    knob.update(defaultState);
    knobNode.dispatchEvent(event);

    expect(spyEmit).toHaveBeenCalledWith(KnobEvents.KNOB_INCREMENT, 'valueFrom');
  });

  test(
    'when the up arrow is pressed, an event should emit KnobEvents.KNOB_INCREMENT with valueFrom',
  () => {
    // @ts-ignore: Unreachable code error
    event.code = 'ArrowUp'
    const spyEmit = jest.spyOn(knob, 'emit')
    knob.setKnobTarget(KnobEvents.KNOB_VALUE_FROM_CHANGED);
    knob.update(defaultState);
    knobNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledWith(KnobEvents.KNOB_INCREMENT, 'valueFrom');
  });

  test(
    'when the left arrow is pressed, an event should emit KnobEvents.KNOB_DECREMENT with valueFrom',
  () => {
    // @ts-ignore: Unreachable code error
    event.code = 'ArrowLeft'
    const spyEmit = jest.spyOn(knob, 'emit')
    knob.setKnobTarget(KnobEvents.KNOB_VALUE_FROM_CHANGED);
    knob.update(defaultState);
    knobNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledWith(KnobEvents.KNOB_DECREMENT, 'valueFrom');
  });
});

describe('SecondKnob:', () => {
  let secondKnob: Knob;

  beforeEach(() => {
    slider = new Slider(defaultState, root, TargetType.range);
    components = slider.getComponents();
    if ('secondKnob' in components) {
      secondKnob = components.secondKnob;
      
      knobNode = components.secondKnob.getKnobNode();
    }
  });

  test('should return SecondKnob instance', () => {
    expect(secondKnob).toBeInstanceOf(Knob);
  });

  test('should update valueFrom', () => {
    const newState = Object.assign({}, initialState, { valueTo: 50 });
    secondKnob.update(newState);

    expect(knobNode.style.left).toBe('50%');
  });
});
