/**
 * @jest-environment jsdom
 */

import Scale from 'Components/View/subViews/Scale/Scale';
import { TargetType } from 'Components/View/Slider/Slider';
import defaultState from 'Root/source/defaultState';
import { IOptions } from 'Components/interfaces';
import Fill from './Fill';

const initialState: IOptions = {
  ...defaultState,
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
  valueTo: 84,
  hasFill: true,
};
const root = document.createElement('div');
let fill: Fill;
let scale: Scale;
let sliderNode: string;
let fillNode: HTMLElement;

describe('Fill:', () => {
  beforeEach(() => {
    sliderNode = `<div class="slider slider_horizontal">
        <div class="slider__scale
          js-slider__scale
          slider__scale_horizontal"
          data-id="scale"
        ></div>
      </div>`;
    root.innerHTML = sliderNode;

    scale = new Scale(initialState, root, TargetType.simple);
    scale.init();
    fill = new Fill(initialState, root, TargetType.simple);
    fill.init();
    fillNode = root.querySelector('.js-slider__fill') as HTMLElement;
  });

  test('should return Fill instance', () => {
    expect(fill).toBeInstanceOf(Fill);
  });

  test('should render default template', () => {
    root.innerHTML = sliderNode;
    scale = new Scale(initialState, root, TargetType.simple);
    scale.init();

    expect(root.querySelectorAll('.slider__fill_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__fill_orange').length).toBe(1);
  });

  test('should update fill in range slider', () => {
    const newState = Object.assign({}, initialState, {
      isRange: true,
      valueTo: 90,
    });
    fill.update(newState);
    expect(fillNode.style.width).toBe('48%');
  });

  test('should update fill in vertical slider', () => {
    const newState = Object.assign({}, initialState, {
      orientation: 'vertical',
      isRange: false,
    });
    fill.update(newState);
    expect(fillNode.style.height).toBe('42%');
  });

  test('if not fill should not update width or height value', () => {
    root.innerHTML = '';
    fill.init();
    fill.update(defaultState);
    expect(fillNode.style.width).toBe('');
    expect(fillNode.style.height).toBe('');
  });
});
