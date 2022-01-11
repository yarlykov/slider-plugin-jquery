/**
 * @jest-environment jsdom
 */

import { IOptions } from 'Components/interfaces';
import Scale from 'Components/View/subViews/Scale/Scale';
import { TargetType } from 'Components/View/Slider/Slider';
import defaultState from 'Root/source/defaultState';
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
let scale: Scale;

describe('Knob:', () => {
  let knob: Knob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    scale = new Scale(initialState, root, TargetType.simple);
    scale.init();
    knob = new Knob(defaultState, root, TargetType.simple);
    knob.init();
    knobNode = root.querySelector('[data-id="knob"]') as HTMLElement;
  });

  test('should return Knob instance', () => {
    expect(knob).toBeInstanceOf(Knob);
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('[data-id="knob"]').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__knob_orange').length).toBe(1);
  });
});

describe('SecondKnob:', () => {
  let secondKnob: Knob;
  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    const state = { ...initialState, isRange: true }
    scale = new Scale(state, root, TargetType.range);
    scale.init();
    secondKnob = new Knob(defaultState, root, TargetType.range);
    secondKnob.init();
    knobNode = root.querySelector('[data-id="second-knob"]') as HTMLElement;
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
