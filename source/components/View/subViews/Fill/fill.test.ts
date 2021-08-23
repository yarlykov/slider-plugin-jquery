/**
 * @jest-environment jsdom
 */

import Fill from './Fill';
import { IOptions } from '../../../interfaces';

const initialState: IOptions = {
  min: 0,
  max: 100,
  step: 25,
  valueFrom: 42,
  valueTo: 84,
  fill: true,
};
const root = document.createElement('div');
let fill: Fill;
let scale: string;
let fillNode: HTMLElement;

describe('Fill:', () => {
  beforeEach(() => {
    scale = `<div class="slider slider_horizontal">
        <div class="slider__scale slider__scale_horizontal" data-id="scale"></div>
      </div>`;
    root.innerHTML = scale;

    fill = new Fill(initialState, root);
    fill.display();
    fillNode = root.querySelector('[data-id="fill"]') as HTMLElement;
  });

  test('should return Fill instance', () => {
    expect(fill).toBeInstanceOf(Fill);
  });

  test('should return error if the Scale is not found', () => {
    root.innerHTML = '';
    expect(() => fill.display()).toThrow('Scale element is not found');
  });

  test('should render default template', () => {
    root.innerHTML = scale;

    fill = new Fill({ fill: true }, root);
    fill.display();
    fill.update({});

    expect(root.querySelectorAll('.slider__fill_horizontal').length).toBe(1);
    expect(root.querySelectorAll('.slider__fill_orange').length).toBe(1);
  });

  test('should update fill in range slider', () => {
    const newState = Object.assign({}, initialState, {
      range: true,
      valueTo: 90,
    });
    fill.update(newState);
    expect(fillNode.style.width).toBe('48%');
  });

  test('should update fill in vertical slider', () => {
    const newState = Object.assign({}, initialState, {
      orientation: 'vertical',
      range: false,
    });
    fill.update(newState);
    expect(fillNode.style.height).toBe('42%');
  });

  test('if not fill should not update width or height value', () => {
    root.innerHTML = '';
    fill.update({});
    expect(fillNode.style.width).toBe('');
    expect(fillNode.style.height).toBe('');
  });
});
