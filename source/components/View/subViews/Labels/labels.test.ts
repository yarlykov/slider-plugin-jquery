/**
 * @jest-environment jsdom
 */

import defaultState from 'Source/defaultState';
import Scale from 'Components/View/subViews/Scale/Scale';
import { TargetType } from 'Components/View/Slider/Slider';
import Labels from './Labels';

const root: HTMLElement = document.createElement('div');

describe('Labels:', () => {
  let labels: Labels;
  let scale: Scale;

  const slider = `
    <div class="slider slider_horizontal">
      <div class="slider__scale js-slider__scale slider__scale_horizontal" data-id="scale"></div>
    </div>`;

  beforeEach(() => {
    root.innerHTML = slider;
    scale = new Scale(defaultState, root, TargetType.simple);
    scale.init();
    labels = new Labels({ ...defaultState, hasLabels: true }, root, TargetType.simple);
    labels.init();
  });

  test('should return Labels instance', () => {
    expect(labels).toBeInstanceOf(Labels);
  });

  test('should render default template', () => {
    expect(root.querySelectorAll('.js-slider__labels').length).toBe(1);
    expect(root.querySelectorAll('.slider__labels_horizontal').length).toBe(1);
  });

  test('should be 6 label items', () => {
    root.innerHTML = slider;
    const state = { ...defaultState, hasLabels: true }
    scale = new Scale(state, root, TargetType.simple);
    scale.init();
    const labelsNode = root.querySelectorAll('.slider__labels-item');
    expect(labelsNode.length).toBe(6);
  });
});
